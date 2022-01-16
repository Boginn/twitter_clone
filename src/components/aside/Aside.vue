<template>
  <v-container class="max-width stay">
    <span v-if="isDeveloper">
      <SwitchUser />
      <AddUser />
      <DeleteUser />
    </span>
    <span v-else>
      <Trending />
    </span>
  </v-container>
</template>

<script>
export default {
  name: 'Aside',
  components: {
    SwitchUser: () => import('@/components/aside/SwitchUser.vue'),
    AddUser: () => import('@/components/aside/AddUser.vue'),
    DeleteUser: () => import('@/components/aside/DeleteUser.vue'),
    Trending: () => import('@/components/aside/Trending.vue'),
  },

  computed: {
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
