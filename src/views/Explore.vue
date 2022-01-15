<template>
  <v-container class="pa-0">
    <Feed :tweets="tweets" />
  </v-container>
</template>

<script>
export default {
  name: 'Explore',

  components: {
    Feed: () => import('@/components/Feed.vue'),
    // TimeAgo,
  },

  data: () => ({}),

  computed: {
    tweets() {
      return this.$store.getters.tweets;
    },
  },

  methods: {},
};
</script>

<style scoped></style>
