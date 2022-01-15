<template>
  <v-container class="pa-0" v-if="ready">
    <Post v-if="user" :user="user" @change="setTweets()" />
    <v-list class="ma-0 pa-0 transparent">
      <div v-for="t in tweets.slice().reverse()" :key="t.id">
        <ReplyModal
          v-if="selectedTweet"
          :selectedPost="selectedTweet"
          :post="t"
          @done="selectedTweet = undefined"
        />
        <v-list-item
          link
          class="border-bottom font-11 white--text d-flex align-start"
        >
          <v-col cols="1" class="pl-2">
            <router-link :to="`/user/${t.userId}`" class="text--text">
              <v-avatar
                :color="getUserById(t.userId).color"
                :size="avatarSize"
                >{{
                  getUserById(t.userId).name.toUpperCase().substring(0, 1)
                }}</v-avatar
              >
            </router-link>
          </v-col>
          <v-col>
            <div>
              <div>
                <router-link :to="`/user/${t.userId}`">
                  <b class="text--text">
                    {{ getUserById(t.userId).name }}
                  </b>
                  <span class="grey--text">
                    {{ getUserById(t.userId).handle }} -
                  </span>
                </router-link>
                <span class="grey--text"> {{ formatDate(t.date) }} </span>
              </div>
              <div class="text--text" @click="$router.push(`/tweet/${t.id}`)">
                {{ t.content }}
                <span v-if="t.hashtag" class="blue--text">
                  &#35;{{ t.hashtag }}
                </span>
              </div>
            </div>
            <v-row>
              <v-col v-for="i in options.tweet.icons" :key="i.name">
                <v-chip
                  class="transparent highlight"
                  @click="interact(t, i.name)"
                >
                  <span
                    v-if="i.name == 'Like'"
                    v-bind:class="{
                      'red--text': hasLiked(t),
                    }"
                  >
                    <Icon
                      :width="iconSize"
                      :icon="i.iconAlternative"
                      v-if="hasLiked(t)"
                    />

                    <Icon :width="iconSize" :icon="i.icon" v-else />
                  </span>

                  <Icon :width="iconSize" :icon="i.icon" v-else />

                  <span v-if="i.name == 'Like'" class="ml-1">
                    {{ t.tweetLikes.length }}
                  </span>
                  <span v-if="i.name == 'Reply'" class="ml-1">
                    {{ t.replies.length }}
                  </span>
                </v-chip>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1" class="mr-3">
            <Options
              :options="more(t)"
              :width="20"
              @option="selectOption"
              @interact="interact(t, selectedOption)"
            />
          </v-col>
        </v-list-item>
      </div>
    </v-list>
  </v-container>
</template>

<script>
import { Icon } from '@iconify/vue2';
import data from '@/data/data.js';
import helpers from '@/services/helpers.js';

import breakpoints from '@/data/breakpoints.js';
// import { TimeAgo } from 'vue2-timeago';

export default {
  name: 'Home',

  components: {
    Icon,
    Post: () => import('@/components/Post.vue'),
    Options: () => import('@/components/Options.vue'),
    ReplyModal: () => import('@/components/ReplyModal.vue'),
    // TimeAgo,
  },

  mounted() {
    this.setFollows();
    this.setUsers();
    this.setTweets();
  },

  watch: {
    tweets() {
      // this.setTweets();
    },
    users() {
      // this.setUsers();
    },
  },

  data: () => ({
    selectedOption: undefined,
    selectedTweet: undefined,
    // modal: false,
  }),

  computed: {
    ready() {
      return this.tweets && this.users ? true : false;
    },
    options() {
      return data.options;
    },

    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
    },
    iconSize() {
      return breakpoints.iconSize(this.$vuetify.breakpoint.name);
    },

    //
    followers() {
      return this.follows.filter((f) => f.userId == this.user.id);
    },
    following() {
      return this.follows.filter((f) => f.followerId == this.user.id);
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
      const tweets = this.$store.getters.tweets;
      let result = [];

      tweets.forEach((tweet) => {
        this.following.forEach((entry) => {
          console.log(entry);
          if (entry.userId == tweet.userId) {
            result.push(tweet);
          }
        });
      });

      return result;
    },
    follows() {
      return this.$store.getters.follows;
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
        //  console.log(ret);
        this.$store.dispatch('setTweets', ret.data);
      });
    },
    setFollows() {
      this.axios.get('https://localhost:44343/api/follows').then((ret) => {
        console.log(ret.data);
        this.$store.dispatch('setFollows', ret.data);
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
          .put(`https://localhost:44343/api/tweets/like/${tweet.id}`, this.user)
          .then((ret) => {
            console.log(ret);
            this.setTweets();
          });
      }
      if (option == 'Delete') {
        console.log(tweet);
        this.axios
          .delete(`https://localhost:44343/api/tweets/delete/${tweet.id}`)
          .then((ret) => {
            console.log(ret);
            this.setTweets();
          });
      }
      if (option == 'Reply') {
        this.selectedTweet = tweet;
        // this.modal = true;
      }
    },

    hasLiked(tweet) {
      let res;

      tweet.tweetLikes.forEach((entry) => {
        // console.log(entry.userId, this.user.id);
        if (entry.userId == this.user.id) {
          // console.log('true');
          res = true;
        } else {
          res = false;
        }
      });
      return res;
    },

    formatDate(date) {
      return helpers.formatDate(date);
    },
  },
};
</script>

<style scoped></style>
