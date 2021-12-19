<template>
  <v-container>
    <v-card class="secondary">
      <v-list class="transparent">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Application </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav class="transparent">
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <API />
    </v-card>
  </v-container>
</template>

<script>
// import { Icon } from '@iconify/vue2';
// import data from '@/data/data.js';
export default {
  name: 'Aside',

  components: {
    // Icon,
    API: () => import('@/components/API.vue'),
  },

  data: () => ({
    items: [
      { tweetId: 1, title: 'Dashboard' },
      { tweetId: 2, title: 'Photos' },
      { tweetId: 3, title: 'About' },
    ],
  }),

  computed: {},

  methods: {},
};
</script>

<style scoped></style>
