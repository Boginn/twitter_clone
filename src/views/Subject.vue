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
          <div v-if="following">
            <router-link
              :to="`/${$route.params.handle}/followers`"
              class="grey--text"
            >
              <span class="text--text">{{ followers.length }}</span> Followers
            </router-link>

            <router-link
              :to="`/${$route.params.handle}/following`"
              class="grey--text"
            >
              <span class="text--text ml-6"> {{ following.length }}</span>
              Following
            </router-link>
          </div>
        </v-row>
      </v-container>
    </div>
    <v-tabs background-color="bgcolor" class="d-flex justify-center">
      <v-tab @click="tab = tweets">Tweets</v-tab>
      <v-tab @click="tab = tweetsReplies">Tweets & replies</v-tab>
      <v-tab>Media</v-tab>
      <v-tab>Likes</v-tab>
    </v-tabs>

    <Feed :tweets="tab.filter((t) => t.userId == this.subject.id)" />
  </v-container>
</template>
<script>
import data from '@/data/data.js';
import helpers from '@/services/helpers.js';
import breakpoints from '@/data/breakpoints.js';

export default {
  name: 'Subject',
  components: {
    Feed: () => import('@/components/Feed.vue'),
  },

  mounted() {
    this.setTweets();
    this.setSubject();
    this.setUsers();
    this.setFollows();
    this.setTab();
  },

  watch: {
    replies() {},
  },

  data: () => ({
    reply: ``,
    selectedOption: undefined,
    subject: undefined,
    tab: undefined,
  }),

  computed: {
    //data
    options() {
      return data.options;
    },
    rules() {
      return data.rules;
    },
    followers() {
      return this.follows.filter((f) => f.userId == this.subject.id);
    },
    following() {
      return this.follows.filter((f) => f.followerId == this.subject.id);
    },

    //breakpoint
    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
    },

    //eval
    hasFollowed() {
      console.log(this.followers);
      return this.followers.filter((entry) => entry.followerId == this.user.id)
        .length;
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
    replies() {
      return this.$store.getters.replies;
    },
    tweetsReplies() {
      let tweetsReplies = [];
      this.tweets
        .filter((t) => t.userId == this.subject.id)
        .forEach((t) => {
          tweetsReplies.push(t);
        });
      this.replies
        .filter((r) => r.userId == this.subject.id)
        .forEach((r) => {
          tweetsReplies.push(r);
        });

      return tweetsReplies;
    },
    follows() {
      return this.$store.getters.follows;
    },
  },

  methods: {
    getUserById(id) {
      return this.users.filter((u) => u.id == id)[0];
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
    setFollows() {
      this.axios.get(`${data.api}/follows`).then((ret) => {
        console.log(ret.data);
        this.$store.dispatch('setFollows', ret.data);
      });
    },
    setSubject() {
      this.axios
        .get(`${data.api}/users/${this.$route.params.handle}`)
        .then((ret) => {
          console.log(ret);
          this.subject = ret.data;
        });
    },
    setTab() {
      this.tab = this.tweets;
    },

    more(p) {
      /* give options depending on if the tweet belongs to the user*/
      return p.userId == this.user.id ? data.more.ownedTweet : data.more.tweet;
    },
    selectOption(o) {
      this.selectedOption = o;
    },

    follow() {
      this.axios
        .put(`${data.api}/users/follow/${this.subject.id}`, this.user)
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
