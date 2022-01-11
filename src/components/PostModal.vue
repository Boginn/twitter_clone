<template>
  <v-dialog v-model="modal" max-width="520">
    <v-card class="black br-15">
      <Post :user="user" @done="$emit('done')" />
    </v-card>
  </v-dialog>
</template>

<script>
import breakpoints from '@/data/breakpoints.js';

export default {
  name: 'PostModal',

  components: {
    Post: () => import('@/components/Post.vue'),
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

  data: () => ({ modal: true }),

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
  },
};
</script>
