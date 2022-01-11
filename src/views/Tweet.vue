<template>
  <v-container class="pa-0" v-if="ready">
    <div class="border-bottom font-11 white--text">
      <v-container class="">
        <v-row>
          <v-col cols="1" class="pl-0">
            <v-avatar
              :color="getUserById(tweet.userId).color"
              :size="avatarSize"
              >{{ getUserById(tweet.userId).name.substring(0, 1) }}</v-avatar
            >
          </v-col>
          <v-col>
            <v-row>
              <strong>
                {{ getUserById(tweet.userId).name }}
              </strong>
            </v-row>
            <v-row>
              <div class="grey--text text-subtitle-2">
                {{ getUserById(tweet.userId).handle }}
              </div>
            </v-row>
          </v-col>

          <v-col cols="1" class="mr-3">
            <Options
              :options="more(tweet)"
              :width="20"
              @option="selectOption"
              @interact="interact(tweet, selectedOption)"
            />
          </v-col>
        </v-row>

        <v-row class="text-h6 pb-3 pl-1">
          {{ tweet.content }}
          <span v-if="tweet.hashtag" class="blue--text">
            &#35;{{ tweet.hashtag }}
          </span></v-row
        >
        <v-row class="pb-3 pt-3 pl-1">
          <div class="grey--text">{{ formatDate(tweet.date) }}</div>
        </v-row>
        <v-divider></v-divider>
        <v-row class="pb-3 pt-3 pl-1">
          <div class="grey--text">
            <span class="white--text">1</span> Retweet
            <span class="white--text ml-6">{{ tweet.tweetLikes.length }}</span>
            Likes
          </div>
        </v-row>
        <v-divider></v-divider>

        <v-row>
          <v-col v-for="i in options.tweet.icons" :key="i.name">
            <v-chip class="transparent" @click="interact(tweet, i.name)">
              <span
                v-if="i.name == 'Like'"
                v-bind:class="{
                  'red--text': hasLiked,
                }"
              >
                <Icon
                  :width="options.tweet.width"
                  :icon="i.iconAlternative"
                  v-if="hasLiked"
                />
                <Icon :width="options.tweet.width" :icon="i.icon" v-else />
              </span>
              <Icon :width="options.tweet.width" :icon="i.icon" v-else />
            </v-chip>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-container>
      <!-- //PostReply -->
      <Reply :user="user" :post="tweet" />
    </div>
    <TweetReplies :tweet="tweet" />
  </v-container>
</template>

<script>
import { Icon } from '@iconify/vue2';
import data from '@/data/data.js';
import helpers from '@/services/helpers.js';
import breakpoints from '@/data/breakpoints.js';

export default {
  name: 'Tweet',

  components: {
    Icon,
    Options: () => import('@/components/Options.vue'),
    Reply: () => import('@/components/Reply.vue'),
    TweetReplies: () => import('@/components/TweetReplies.vue'),
  },

  data: () => ({
    reply: ``,
    tweet: undefined,
    selectedOption: undefined,
  }),

  mounted() {
    this.setUsers();
    this.setTweets();
    this.setTweetById(this.$route.params.id);
  },

  watch: {
    tweets() {
      // this.setTweets();
      // this.setTweetById(this.$route.params.id);
    },
  },

  computed: {
    options() {
      return data.options;
    },

    rules() {
      return data.rules;
    },
    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
    },

    //eval
    ready() {
      return this.tweet && this.users ? true : false;
    },
    hasLiked() {
      let res = false;
      this.tweet.tweetLikes.forEach((entry) => {
        if (entry.userId == this.user.id) {
          res = true;
        }
      });
      return res;
    },
    validate() {
      return helpers.validateLength(this.post);
    },

    //state
    user() {
      return this.users.filter(
        (user) => user.id == this.$store.getters.loggedUserId
      )[0];
    },
    users() {
      return this.$store.getters.users;
    },
    tweets() {
      return this.$store.getters.tweets;
    },
  },

  methods: {
    more(t) {
      if (t.userId == this.user.id) {
        return data.more.ownedTweet;
      } else {
        return data.more.tweet;
      }
    },
    setUsers() {
      this.axios.get('https://localhost:44343/api/users').then((ret) => {
        console.log(ret);
        this.$store.dispatch('setUsers', ret.data);
      });
    },
    setTweets() {
      this.axios.get('https://localhost:44343/api/tweets').then((ret) => {
        console.log(ret);
        this.$store.dispatch('setTweets', ret.data);
      });
    },
    setTweetById(id) {
      this.axios.get(`https://localhost:44343/api/tweets/${id}`).then((ret) => {
        console.log(ret);
        this.tweet = ret.data;
      });
    },

    getUserById(id) {
      return this.users.filter((user) => user.id == id)[0];
    },

    selectOption(o) {
      this.selectedOption = o;
    },

    interact(tweet, option) {
      if (option == 'Like') {
        this.axios
          .put(`https://localhost:44343/api/tweets/like/${tweet.id}`, {
            Id: this.user.id,
            Name: this.user.name,
          })
          .then((ret) => {
            console.log(ret);
            this.setTweetById(this.$route.params.id);
          });
      }
      if (option == 'Delete') {
        console.log(tweet);
        this.axios
          .delete(`https://localhost:44343/api/tweets/delete/${tweet.id}`)
          .then((ret) => {
            console.log(ret);
            this.setTweets();
            this.$router.push('/');
          });
      }
    },

    formatDate(date) {
      return helpers.formatDate(date);
      // return new Date(date).toLocaleString();
    },
  },
};
</script>

<style scoped></style>
