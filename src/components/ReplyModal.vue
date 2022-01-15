<template>
  <v-dialog v-if="post.id == selectedPost.id" v-model="modal" max-width="520">
    <v-card class="bgcolor br-15">
      <v-row>
        <v-col cols="1" class="pl-2">
          <v-avatar
            :color="getUserById(post.userId).color"
            :size="avatarSize"
            >{{
              getUserById(post.userId).name.toUpperCase().substring(0, 1)
            }}</v-avatar
          >
        </v-col>
        <v-col class="d-flex align-center">
          <div>
            <b>
              {{ getUserById(post.userId).name }}
            </b>
            <span class="grey--text">
              {{ getUserById(post.userId).handle }} -

              <span> {{ formatDate(post.date) }} </span>
            </span>
          </div>
        </v-col>
      </v-row>

      <v-row class="">
        <v-col cols="1"> </v-col>
        <div
          class="white border-left mr-4"
          style="margin-left: -15px !important"
        ></div>
        <v-col>
          {{ post.content }}
          <span class="blue--text"> &#35;{{ post.hashtag }} </span>
        </v-col>
      </v-row>

      <Reply :post="post" :user="user" @done="$emit('done')" />
    </v-card>
  </v-dialog>
</template>

<script>
import breakpoints from '@/data/breakpoints.js';
import helpers from '@/services/helpers.js';

export default {
  name: 'ReplyModal',

  props: {
    post: Object,
    selectedPost: Object,
  },

  components: {
    Reply: () => import('@/components/Reply.vue'),
  },

  mounted() {
    this.modal = this.post.id == this.selectedPost.id ? true : false;
  },

  beforeDestroy() {
    this.$emit('done');
  },

  watch: {
    modal() {
      if (!this.modal) {
        this.$emit('done');
      }
    },
  },

  data: () => ({ modal: false }),

  computed: {
    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
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
    formatDate(date) {
      return helpers.formatDate(date);
      // return new Date(date).toLocaleString();
    },
  },
};
</script>
