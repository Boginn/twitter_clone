<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn @click="pharc()">get </v-btn>
        <v-btn @click="pharcPost()">post </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'API',

  mounted() {},

  data: () => ({}),

  methods: {
    pharc() {
      this.axios.get('https://localhost:44343/api/tweets').then((ret) => {
        // ret.setHeader('Access-Control-Allow-Origin', '*');
        console.log(ret);
      });
    },
    pharcPost() {
      this.$store.getters.tweets.forEach((t) => {
        this.axios
          .post('https://localhost:44343/api/tweets/create', {
            content: t.content,
            userId: t.userId,
            likes: t.likes,
          })
          .then((ret) => {
            console.log(ret);
          });
      });
      this.$store.getters.users.forEach((u) => {
        this.axios
          .post('https://localhost:44343/api/users/create', {
            name: u.name,
            color: u.color,
            handle: u.handle,
            // tweets: u.tweets,
            // Replies: u.replies,
          })
          .then((ret) => {
            console.log(ret);
          });
      });
    },
  },
};
</script>
