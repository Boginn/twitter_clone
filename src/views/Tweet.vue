<template>
  <v-container class="pa-0" v-if="ready">
    <div class="border-bottom font-11">
      <v-container class="">
        <v-row>
          <v-col cols="1" class="pl-0 white--text">
            <router-link
              :to="`/${getUserById(tweet.userId).handle.substring(1)}`"
              class="text--text"
            >
              <v-avatar
                :color="getUserById(tweet.userId).color"
                :size="avatarSize"
                >{{ getUserById(tweet.userId).name.substring(0, 1) }}</v-avatar
              >
            </router-link>
          </v-col>
          <v-col>
            <router-link
              :to="`/${getUserById(tweet.userId).handle.substring(1)}`"
              class="text--text"
            >
              <v-row>
                <strong class="text--text">
                  {{ getUserById(tweet.userId).name }}
                </strong>
              </v-row>
              <v-row>
                <div class="grey--text text-subtitle-2">
                  {{ getUserById(tweet.userId).handle }}
                </div>
              </v-row>
            </router-link>
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

        <v-row class="text-h6 pb-3 pl-1 text--text">
          {{ tweet.content }}
          <span v-if="tweet.hashtag" class="blue--text">
            &#35;{{ tweet.hashtag }}
          </span></v-row
        >
        <v-row class="pb-3 pt-3 pl-1">
          <div class="grey--text">
            {{ formatDate(tweet.date) }}
            <span v-if="formatDate(tweet.date).length < 8">ago</span>
          </div>
        </v-row>
        <v-divider></v-divider>
        <v-row class="pb-3 pt-3 pl-1">
          <div class="grey--text">
            <span class="text--text">0</span> Retweet
            <span class="text--text ml-6">{{ tweet.tweetLikes.length }}</span>
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
    <Replies :tweet="tweet" />
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
    Replies: () => import('@/components/Replies.vue'),
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
    tweets() {},
  },

  computed: {
    //data
    options() {
      return data.options;
    },
    rules() {
      return data.rules;
    },

    //breakpoint
    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
    },

    //eval
    ready() {
      return this.tweet && this.users ? true : false;
    },
    validate() {
      return helpers.validateLength(this.post);
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

    //state
    user() {
      return this.$store.getters.user;
    },
    users() {
      return this.$store.getters.users;
    },
    tweets() {
      return this.$store.getters.tweets;
    },
  },

  methods: {
    getUserById(id) {
      return this.users.filter((user) => user.id == id)[0];
    },
    setUsers() {
      this.axios.get(`${data.api}/users`).then((ret) => {
        console.log(ret);
        this.$store.dispatch('setUsers', ret.data);
      });
    },
    setTweets() {
      this.axios.get(`${data.api}/tweets`).then((ret) => {
        console.log(ret);
        this.$store.dispatch('setTweets', ret.data);
      });
    },
    setTweetById(id) {
      this.axios.get(`${data.api}/tweets/${id}`).then((ret) => {
        console.log(ret);
        this.tweet = ret.data;
      });
    },

    more(p) {
      /* give options depending on if the tweet belongs to the user*/
      return p.userId == this.user.id ? data.more.ownedTweet : data.more.tweet;
    },
    selectOption(o) {
      this.selectedOption = o;
    },

    interact(tweet, option) {
      if (option == 'Like') {
        this.axios
          .put(`${data.api}/tweets/like/${tweet.id}`, {
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
          .delete(`${data.api}/tweets/delete/${tweet.id}`)
          .then((ret) => {
            console.log(ret);
            this.setTweets();
            this.$router.push('/');
          });
      }
      if (option == 'Follow') {
        this.axios
          .put(`${data.api}/users/follow/${tweet.userId}`, this.user)
          .then((ret) => {
            console.log(ret);
          });
      }
    },

    formatDate(date) {
      return helpers.formatDate(date);
    },
  },
};
</script>
