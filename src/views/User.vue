<template>
  <v-container class="pa-0" v-if="subject">
    <div class="border-bottom font-11">
      <v-container class="">
        <v-row>
          <v-col cols="1" class="pl-0 white--text">
            <v-avatar :color="subject.color" :size="avatarSize">{{
              subject.name.substring(0, 1)
            }}</v-avatar>
          </v-col>
          <v-col cols="8">
            <v-row>
              <strong class="text--text">
                {{ subject.name }}
              </strong>
            </v-row>
            <v-row>
              <div class="grey--text text-subtitle-2">
                {{ subject.handle }}
              </div>
            </v-row>
          </v-col>
          <v-col class="text-end">
            <v-btn
              @click="follow"
              :disabled="subject.id == user.id"
              name="Follow"
              class="no-transform br-15"
              v-bind:class="{
                'text secondary--text': !hasFollowed,
                'secondary text--text': hasFollowed,
              }"
              ><span v-if="!hasFollowed">Follow</span>
              <span v-else>Following</span></v-btn
            >
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-row class="pb-3 pt-3 pl-1">
          <div class="grey--text" v-if="following">
            <span class="text--text">{{ followers.length }}</span> Followers
            <span class="text--text ml-6"> {{ following.length }}</span>
            Following
          </div>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import data from '@/data/data.js';
import helpers from '@/services/helpers.js';
import breakpoints from '@/data/breakpoints.js';

export default {
  name: 'User',

  components: {},

  mounted() {
    this.setFollows();
    this.setSubject();
    this.setUsers();
    this.setTweets();
    // this.setUserById(this.$route.params.id);
  },

  watch: {
    tweets() {
      // this.setTweets();
      // this.setTweetById(this.$route.params.id);
    },
  },

  data: () => ({
    reply: ``,
    selectedOption: undefined,
    subject: undefined,
  }),

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

    //
    followers() {
      return this.follows.filter((f) => f.userId == this.subject.id);
    },
    following() {
      return this.follows.filter((f) => f.followerId == this.subject.id);
    },

    //eval
    hasFollowed() {
      let res = false;
      this.followers.forEach((entry) => {
        console.log(entry.followerId);
        if (entry.followerId == this.user.id) {
          res = true;
        }
      });
      return res;
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
        console.log(ret);
        this.$store.dispatch('setTweets', ret.data);
      });
    },
    setFollows() {
      this.axios.get('https://localhost:44343/api/follows').then((ret) => {
        console.log(ret.data);
        this.$store.dispatch('setFollows', ret.data);
      });
    },
    setSubject() {
      this.axios
        .get(`https://localhost:44343/api/users/${this.$route.params.id}`)
        .then((ret) => {
          console.log(ret);
          this.subject = ret.data;
        });
    },
    // setUserById(id) {
    //   this.axios.get(`https://localhost:44343/api/users/${id}`).then((ret) => {
    //     console.log(ret);
    //     this.user = ret.data;
    //   });
    // },

    getUserById(id) {
      return this.users.filter((u) => u.id == id)[0];
    },

    selectOption(o) {
      this.selectedOption = o;
    },

    follow() {
      this.axios
        .put(
          `https://localhost:44343/api/users/follow/${this.subject.id}`,
          this.user
        )
        .then((ret) => {
          console.log(ret);
          this.setFollows();
        });
    },

    formatDate(date) {
      return helpers.formatDate(date);
      // return new Date(date).toLocaleString();
    },
  },
};
</script>

<style scoped></style>
