<template>
  <v-row class="mt-0">
    <v-col class="border-left border-right pa-0 ma-0">
      <Feed />
    </v-col>
    <v-col cols="4" v-if="lgAndUp">
      <Aside />
    </v-col>
    <v-col cols="3" v-if="lgAndUp"> </v-col>
    <!-- <v-col cols="1" v-else> </v-col> -->
  </v-row>
</template>

<script>
export default {
  name: 'Home',

  components: {
    Aside: () => import('@/components/Aside.vue'),
    Feed: () => import('@/components/Feed.vue'),
  },

  computed: {
    lgAndUp() {
      return this.$vuetify.breakpoint.lgAndUp;
    },
  },
};
</script>
