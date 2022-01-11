<template>
  <v-container class="max-width stay">
    <SwitchUser v-if="isDeveloper" />
    <AddUser v-if="isDeveloper" />
    <DeleteUser v-if="isDeveloper" />
    <Trending />
  </v-container>
</template>

<script>
// import { Icon } from '@iconify/vue2';
// import data from '@/data/data.js';
export default {
  name: 'Aside',

  components: {
    // Icon,
    SwitchUser: () => import('@/components/SwitchUser.vue'),
    AddUser: () => import('@/components/AddUser.vue'),
    DeleteUser: () => import('@/components/DeleteUser.vue'),
    Trending: () => import('@/components/Trending.vue'),
  },

  computed: {
    //state
    users() {
      return this.$store.getters.users;
    },
    isDeveloper() {
      return this.$store.getters.isDeveloper;
    },
  },
};
</script>

<style scoped>
.max-width {
  max-width: 450px !important;
}
</style>
