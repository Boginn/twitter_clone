<template>
  <v-app>
    <AppBar />
    <Navigation />

    <Main />
  </v-app>
</template>

<script>
import data from '@/data/data.js';

export default {
  name: 'App',

  components: {
    Main: () => import('@/views/Main.vue'),
    AppBar: () => import('@/components/bar/AppBar.vue'),
    Navigation: () => import('@/components/bar/Navigation.vue'),
  },

  mounted() {
    this.setUsers();
    this.setTweets();
    this.setReplies();
    this.setFollows();
  },

  methods: {
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
    setReplies() {
      this.axios.get(`${data.api}/replies`).then((ret) => {
        console.log(ret);
        this.$store.dispatch('setReplies', ret.data);
      });
    },
    setFollows() {
      this.axios.get(`${data.api}/follows`).then((ret) => {
        console.log(ret.data);
        this.$store.dispatch('setFollows', ret.data);
      });
    },
  },
};
</script>

<style>
/* */
.abDark {
  background-color: #00000080 !important;
}
.abLight {
  background-color: #ffffff80 !important;
}
/* helpers */
.stay {
  position: fixed !important;
}
.stretch {
  width: 100% !important;
}
.no-transform {
  text-transform: none !important;
}
.blur {
  backdrop-filter: blur(6px) !important;
}
.highlight:hover {
  cursor: pointer !important;
}
.opacity {
  opacity: 0.7 !important;
}
/* .code {
  font-family: 'Courier New', Courier, monospace;
}
.font-shadow {
  text-shadow: black 1px 1px;
}
.font-shadow-narrow {
  text-shadow: black 0.3px 0.3px;
} */
.border-bottom {
  border-bottom: 1px solid rgb(39, 39, 39) !important;
}
.border-left {
  border-left: 1px solid rgb(39, 39, 39) !important;
}
.border-right {
  border-right: 1px solid rgb(39, 39, 39) !important;
}
.br-15 {
  border-radius: 15px !important;
}
.br-25 {
  border-radius: 25px !important;
}
.br-100 {
  border-radius: 100% !important;
}
.font-11 {
  font-size: 11pt !important;
  color: #00000081;
}
.btn:hover {
  background-color: #1b88cce5 !important;
}

/* config */

.v-application {
  font-family: 'Roboto', Tahoma, Geneva, Verdana, sans-serif !important;
}
* {
  margin: 0px !important;
}
body {
  background-color: black;
}

a {
  text-decoration: none !important;
}

.parent-class >>> .v-toolbar__content {
  padding: 0px !important;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 2px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(245, 245, 220, 0.253);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 245, 220, 0.692);
}
::-webkit-scrollbar-corner {
  opacity: 0;
}
</style>
