<template>
  <v-row class="pl-1">
    <v-col cols="1" class="pl-2 text--text">
      <v-avatar :color="user.color" :size="avatarSize">{{
        user.name.substring(0, 1)
      }}</v-avatar>
    </v-col>
    <v-col>
      <span class="grey--text" v-if="getUserById(post.userId)">
        Replying to
        <span class="blue--text"> {{ getUserById(post.userId).handle }}</span>
      </span>
      <div>
        <v-text-field
          class="pb-4"
          v-model="reply"
          :rules="rules.reply"
          placeholder="Tweet your reply"
          hide-details="auto"
          @keydown.enter="submit"
          @keydown.esc="reply = ``"
        ></v-text-field>
      </div>

      <v-row>
        <v-col class="pl-0">
          <span class="mr-2" v-for="i in options.post.icons" :key="i.name">
            <v-chip class="transparent blue--text">
              <Icon :width="iconSize" :icon="i.icon" />
            </v-chip>
          </span>
        </v-col>
        <v-col cols="2">
          <v-btn
            @click="submit"
            :disabled="!validate"
            small
            rounded
            class="btn primary no-transform stretch pa-3"
            >Reply</v-btn
          >
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { Icon } from '@iconify/vue2';
import data from '@/data/data.js';
import helpers from '@/services/helpers.js';
import breakpoints from '@/data/breakpoints.js';

export default {
  name: 'Reply',
  components: {
    Icon,
  },

  props: {
    user: Object,
    post: Object,
  },

  data: () => ({ reply: `` }),

  computed: {
    //data
    options() {
      return data.options;
    },
    rules() {
      return data.rules;
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
      return helpers.validateLength(this.reply);
    },

    //state
    users() {
      return this.$store.getters.users;
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
    setTweets() {
      this.axios.get(`${data.api}/tweets`).then((ret) => {
        console.log(ret);
        this.$store.dispatch('setTweets', ret.data);
      });
    },

    submit() {
      /* check if replying to a Tweet or a Reply (this.post),
      assign id accordingly */
      let tweetId = this.post.tweetId ? this.post.tweetId : this.post.id;

      this.axios
        .post(`${data.api}/replies/create`, {
          content: this.reply,
          date: new Date(),
          userId: this.user.id,
          tweetId: tweetId,
          recipient: this.getUserById(this.post.userId).handle,
        })
        .then((ret) => {
          console.log(ret);
          this.setReplies();
          this.setTweets();
          this.$emit('done');
        });
    },
  },
};
</script>
