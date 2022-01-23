<template>
  <v-container class="pa-0">
    <Post v-if="users" :user="user" @change="setTweets()" />
    <Feed v-if="tweets" :tweets="filteredTweets" />
  </v-container>
</template>

<script>
import data from '@/data/data.js';

export default {
  name: 'Home',
  components: {
    Post: () => import('@/components/Post.vue'),
    Feed: () => import('@/components/Feed.vue'),
  },

  computed: {
    //data
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
  },
};
</script>

<style scoped></style>
