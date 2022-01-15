<template>
  <v-container class="pa-0">
    <Post v-if="users" :user="user" @change="setTweets()" />
    <Feed :tweets="filteredTweets" />
  </v-container>
</template>

<script>
export default {
  name: 'Home',

  components: {
    Post: () => import('@/components/Post.vue'),
    Feed: () => import('@/components/Feed.vue'),

    // TimeAgo,
  },

  mounted() {},

  data: () => ({}),

  computed: {
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
    following() {
      return this.$store.getters.follows.filter(
        (f) => f.followerId == this.user.id
      );
    },

    filteredTweets() {
      let result = [];

      this.tweets.forEach((tweet) => {
        this.following.forEach((entry) => {
          if (entry.userId == tweet.userId) {
            result.push(tweet);
          }
        });
      });
      return result;
    },
  },

  methods: {
    setTweets() {
      this.axios.get('https://localhost:44343/api/tweets').then((ret) => {
        console.log(ret);
        this.$store.dispatch('setTweets', ret.data);
      });
    },
  },
};
</script>

<style scoped></style>
