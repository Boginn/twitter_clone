<template>
  <v-main class="bgcolor">
    <v-row class="mt-0">
      <v-col class="border-left border-right pa-0 ma-0">
        <router-view />
      </v-col>
      <v-col cols="4" v-if="lgAndUp">
        <Aside />
      </v-col>
      <v-col cols="3" v-if="lgAndUp"> </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  name: 'Main',
  components: {
    Aside: () => import('@/components/aside/Aside.vue'),
  },

  computed: {
    lgAndUp() {
      return this.$vuetify.breakpoint.lgAndUp;
    },
  },
};
</script>
