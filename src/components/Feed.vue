<template>
  <v-list class="ma-0 pa-0 transparent" v-if="ready">
    <div v-for="t in tweets" :key="t.id">
      <ReplyModal
        v-if="selectedTweet"
        :selectedPost="selectedTweet"
        :post="t"
        @done="selectedTweet = undefined"
      />
      <v-list-item
        link
        class="border-bottom font-11 white--text d-flex align-start"
      >
        <v-col cols="1" class="pl-2">
          <router-link
            :to="`/${getUserById(t.userId).handle.substring(1)}`"
            class="text--text"
          >
            <v-avatar :color="getUserById(t.userId).color" :size="avatarSize">{{
              getUserById(t.userId).name.toUpperCase().substring(0, 1)
            }}</v-avatar>
          </router-link>
        </v-col>
        <v-col>
          <div>
            <div>
              <router-link
                :to="`/${getUserById(t.userId).handle.substring(1)}`"
              >
                <b class="text--text">
                  {{ getUserById(t.userId).name }}
                </b>
                <span class="grey--text">
                  {{ getUserById(t.userId).handle }} -
                </span>
              </router-link>
              <span class="grey--text"> {{ formatDate(t.date) }} </span>
            </div>
            <div class="grey--text">
              <span v-if="t.recipient">
                replying to
                <span class="blue--text"> {{ t.recipient }}</span>
              </span>
            </div>
            <div class="text--text" @click="$router.push(`/tweet/${t.id}`)">
              {{ t.content }}
              <span v-if="t.hashtag" class="blue--text">
                &#35;{{ t.hashtag }}
              </span>
            </div>
          </div>
          <v-row>
            <v-col v-for="i in options.tweet.icons" :key="i.name">
              <v-chip
                class="transparent highlight"
                @click="interact(t, i.name)"
              >
                <span
                  v-if="i.name == 'Like'"
                  v-bind:class="{
                    'red--text': hasLiked(t),
                  }"
                >
                  <Icon
                    :width="iconSize"
                    :icon="i.iconAlternative"
                    v-if="hasLiked(t)"
                  />

                  <Icon :width="iconSize" :icon="i.icon" v-else />
                </span>

                <Icon :width="iconSize" :icon="i.icon" v-else />

                <span v-if="i.name == 'Like'" class="ml-1">
                  <span v-if="t.tweetLikes">
                    {{ t.tweetLikes.length }}
                  </span>
                  <span v-if="t.replyLikes">
                    {{ t.replyLikes.length }}
                  </span>
                </span>
                <span v-if="i.name == 'Reply'" class="ml-1">
                  <span v-if="t.replies">
                    {{ t.replies.length }}
                  </span>
                </span>
              </v-chip>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="1" class="mr-3">
          <Options
            :options="more(t)"
            :width="20"
            @option="selectOption"
            @interact="interact(t, selectedOption)"
          />
        </v-col>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import { Icon } from '@iconify/vue2';
import data from '@/data/data.js';
import helpers from '@/services/helpers.js';
import breakpoints from '@/data/breakpoints.js';

export default {
  name: 'Feed',
  components: {
    Icon,
    Options: () => import('@/components/Options.vue'),
    ReplyModal: () => import('@/components/ReplyModal.vue'),
  },

  props: {
    tweets: Array,
  },

  mounted() {
    this.setUsers();
    this.setTweets();
    this.setReplies();
  },

  watch: {
    tweets() {},
    users() {},
    replies() {},
  },

  data: () => ({
    selectedOption: undefined,
    selectedTweet: undefined,
    // modal: false,
  }),

  computed: {
    ready() {
      return this.tweets && this.users ? true : false;
    },
    options() {
      return data.options;
    },

    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
    },
    iconSize() {
      return breakpoints.iconSize(this.$vuetify.breakpoint.name);
    },

    //state
    user() {
      return this.$store.getters.user;
    },
    users() {
      return this.$store.getters.users;
    },
  },

  methods: {
    getUserById(id) {
      return this.users.filter((user) => user.id == id)[0];
    },
    setUsers() {
      this.axios.get(`${data.api}/users`).then((ret) => {
        console.log(ret);
        this.$store.dispatch('setUsers', ret.data);
      });
    },
    setTweets() {
      this.axios.get(`${data.api}/tweets`).then((ret) => {
        //  console.log(ret);
        this.$store.dispatch('setTweets', ret.data);
      });
    },
    setReplies() {
      this.axios.get(`${data.api}/replies`).then((ret) => {
        //  console.log(ret);
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

    hasLiked(post) {
      let likes = post.tweetLikes ? post.tweetLikes : post.replyLikes;

      likes.forEach((entry) => {
        return entry.userId == this.user.id ? true : false;
      });
    },

    interact(post, option) {
      /* check if tweet or reply*/
      const isTweet = post.tweetLikes ? true : false;

      if (option == 'Like') {
        if (isTweet) {
          this.axios
            .put(`${data.api}/tweets/like/${post.id}`, this.user)
            .then((ret) => {
              console.log(ret);
              this.setTweets();
            });
        } else {
          this.axios
            .put(`${data.api}/replies/like/${post.id}`, this.user)
            .then((ret) => {
              console.log(ret);
              this.setReplies();
            });
        }

        this.$emit('update');
      }
      if (option == 'Delete') {
        console.log(post);
        if (isTweet) {
          this.axios
            .delete(`${data.api}/tweets/delete/${post.id}`)
            .then((ret) => {
              console.log(ret);
              this.setTweets();
            });
        } else {
          this.axios
            .delete(`${data.api}/replies/delete/${post.id}`)
            .then((ret) => {
              console.log(ret);
              this.setReplies();
            });
        }
      }
      if (option == 'Reply') {
        this.selectedTweet = post;
      }
    },

    formatDate(date) {
      return helpers.formatDate(date);
    },
  },
};
</script>

<style scoped></style>
