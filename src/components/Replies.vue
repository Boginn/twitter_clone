<template>
  <v-container class="pa-0">
    <v-list class="ma-0 pa-0 transparent">
      <div v-for="r in replies.slice().reverse()" :key="r.id">
        <ReplyModal
          v-if="selectedTweet"
          :selectedPost="selectedTweet"
          :post="r"
          @done="selectedTweet = undefined"
        />
        <v-list-item link class="border-bottom">
          <v-col cols="1" class="pl-2">
            <router-link :to="`/${getUserById(r.userId).handle.substring(1)}`">
              <v-avatar
                :color="getUserById(r.userId).color"
                :size="avatarSize"
                >{{
                  getUserById(r.userId).name.toUpperCase().substring(0, 1)
                }}</v-avatar
              >
            </router-link>
          </v-col>
          <v-col>
            <div>
              <div>
                <router-link
                  :to="`/${getUserById(r.userId).handle.substring(1)}`"
                >
                  <b class="text--text">
                    {{ getUserById(r.userId).name }}
                  </b>
                  <span class="grey--text">
                    {{ getUserById(r.userId).handle }} -
                  </span>
                </router-link>
                <span class="grey--text">
                  {{ formatDate(r.date) }}
                </span>
              </div>
              <div class="grey--text">
                <span v-if="getUserById(tweet.userId)">
                  replying to
                  <span class="blue--text" v-if="r.recipient">
                    {{ r.recipient }}
                  </span>
                  <span class="blue--text" v-else>
                    {{ getUserById(tweet.userId).handle }}</span
                  >
                </span>
              </div>
              <div class="text--text">
                {{ r.content }}
              </div>
            </div>
            <v-row>
              <v-col v-for="i in options.tweet.icons" :key="i.name">
                <v-chip
                  class="transparent highlight"
                  @click="interact(r, i.name)"
                >
                  <span
                    v-if="i.name == 'Like'"
                    v-bind:class="{
                      'red--text': hasLiked(r),
                    }"
                  >
                    <Icon
                      :width="iconSize"
                      :icon="i.iconAlternative"
                      v-if="hasLiked(r)"
                    />

                    <Icon :width="iconSize" :icon="i.icon" v-else />
                  </span>
                  <Icon :width="iconSize" :icon="i.icon" v-else />
                  <span v-if="i.name == 'Like'" class="ml-1">
                    {{ r.replyLikes.length }}
                  </span>
                </v-chip>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1" class="mr-3">
            <Options
              :options="more(r)"
              :width="20"
              @option="selectOption"
              @interact="interact(r, selectedOption)"
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

export default {
  name: 'Replies',
  components: {
    Icon,
    Options: () => import('@/components/Options.vue'),
    ReplyModal: () => import('@/components/ReplyModal.vue'),
  },

  props: {
    tweet: Object,
  },

  data: () => ({ selectedTweet: undefined, selectedOption: undefined }),

  watch: {
    replies() {
      this.setReplies();
    },
  },

  computed: {
    //data
    options() {
      return data.options;
    },

    //breakpoint
    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
    },
    iconSize() {
      return breakpoints.iconSize(this.$vuetify.breakpoint.name);
    },

    //eval
    validate() {
      return helpers.validateLength(this.post);
    },

    //state
    user() {
      return this.$store.getters.user;
    },
    users() {
      return this.$store.getters.users;
    },
    replies() {
      return this.$store.getters.replies.filter(
        (x) => x.tweetId == this.tweet.id
      );
    },
  },

  methods: {
    getUserById(id) {
      return this.users.filter((user) => user.id == id)[0];
    },
    setReplies() {
      this.axios.get(`${data.api}/replies`).then((ret) => {
        console.log(ret);
        this.$store.dispatch('setReplies', ret.data);
      });
    },

    more(p) {
      /* give options depending on if the tweet belongs to the user*/
      return p.userId == this.user.id ? data.more.ownedTweet : data.more.tweet;
    },
    selectOption(o) {
      this.selectedOption = o;
    },

    hasLiked(reply) {
      let res = false;
      reply.replyLikes.forEach((entry) => {
        console.log(entry.userId);
        console.log(this.user.id);
        if (entry.userId == this.user.id) {
          res = true;
        }
      });
      return res;
    },

    interact(reply, option) {
      if (option == 'Like') {
        this.axios
          .put(`${data.api}/replies/like/${reply.id}`, this.user)
          .then((ret) => {
            console.log(ret);
            this.setReplies();
          });
      }
      if (option == 'Delete') {
        this.axios
          .delete(`${data.api}/replies/delete/${reply.id}`)
          .then((ret) => {
            console.log(ret);
            this.setReplies();
          });
      }
      if (option == 'Reply') {
        this.selectedTweet = reply;
      }
    },

    formatDate(date) {
      return helpers.formatDate(date);
    },
  },
};
</script>

<style scoped></style>
