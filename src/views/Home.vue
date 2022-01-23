<template>
  <v-container class="pa-0" v-if="filteredTweets">
    <Post v-if="users" :user="user" @change="setTweets()" />
    <Feed v-if="tweets" :tweets="sortedTweets" />
  </v-container>
</template>

<script>
import data from '@/data/data.js';
import helpers from '@/services/helpers.js';

export default {
  name: 'Home',
  components: {
    Post: () => import('@/components/Post.vue'),
    Feed: () => import('@/components/Feed.vue'),
  },

  computed: {
    //data
    sortedTweets() {
      return this.sortByDate(this.filteredTweets);
    },
    filteredTweets() {
      let result = [];

      this.tweets.forEach((tweet) => {
        if (tweet.userId == this.user.id) {
          result.push(tweet);
        }
        this.following.forEach((entry) => {
          if (entry.userId == tweet.userId) {
            result.push(tweet);
          }
        });
      });
      return result;
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
    following() {
      return this.$store.getters.follows.filter(
        (f) => f.followerId == this.user.id
      );
    },
  },

  methods: {
    setTweets() {
      this.axios.get(`${data.api}/tweets`).then((ret) => {
        console.log(ret);
        this.$store.dispatch('setTweets', ret.data);
      });
    },
    sortByDate(date) {
      return helpers.sortByDate(date);
    },
  },
};
</script>

<style scoped></style>
