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
        <v-list-item
          link
          class="border-bottom font-11 white--text d-flex align-start"
        >
          <v-col cols="1" class="pl-2">
            <v-avatar :color="getUserById(r.userId).color" :size="avatarSize">{{
              getUserById(r.userId).name.toUpperCase().substring(0, 1)
            }}</v-avatar>
          </v-col>
          <v-col>
            <div>
              <div>
                <b>
                  {{ getUserById(r.userId).name }}
                </b>
                <span class="grey--text">
                  {{ getUserById(r.userId).handle }} - {{ formatDate(r.date) }}
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
              <div>
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
  name: 'TweetReplies',

  components: {
    Icon,
    Options: () => import('@/components/Options.vue'),
    ReplyModal: () => import('@/components/ReplyModal.vue'),
  },

  mounted() {
    // this.setUsers();
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
    options() {
      return data.options;
    },

    //eval
    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
    },
    iconSize() {
      return breakpoints.iconSize(this.$vuetify.breakpoint.name);
    },

    validate() {
      return helpers.validateLength(this.post);
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
    replies() {
      return this.$store.getters.replies.filter(
        (x) => x.tweetId == this.tweet.id
      );
    },
  },

  methods: {
    more(r) {
      if (r.userId == this.user.id) {
        return data.more.ownedTweet;
      } else {
        return data.more.tweet;
      }
    },
    setReplies() {
      this.axios.get('https://localhost:44343/api/replies').then((ret) => {
        console.log(ret);
        this.$store.dispatch('setReplies', ret.data);
      });
    },
    getUserById(id) {
      return this.users.filter((user) => user.id == id)[0];
    },

    selectOption(o) {
      this.selectedOption = o;
    },

    interact(reply, option) {
      if (option == 'Like') {
        this.axios
          .put(
            `https://localhost:44343/api/replies/like/${reply.id}`,
            this.user
          )
          .then((ret) => {
            console.log(ret);
            this.setReplies();
          });
      }
      if (option == 'Delete') {
        this.axios
          .delete(`https://localhost:44343/api/replies/delete/${reply.id}`)
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

    hasLiked(reply) {
      let res;

      reply.replyLikes.forEach((entry) => {
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
  },
};
</script>

<style scoped></style>
