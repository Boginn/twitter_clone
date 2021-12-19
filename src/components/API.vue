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

  data: () => ({}),

  methods: {
    pharc() {
      this.axios.get('https://localhost:44343/api/tweets').then((ret) => {
        // ret.setHeader('Access-Control-Allow-Origin', '*');
        console.log(ret);
      });
    },
    pharcPost() {
      this.axios
        .post('https://localhost:44343/api/tweets', {
          Content: 'postasdasd',
          Likes: '10',
          UserId: '2',
        })
        .then((ret) => {
          console.log(ret);
        });
    },
  },
};
</script>
