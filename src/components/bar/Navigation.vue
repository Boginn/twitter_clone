<template>
  <v-navigation-drawer
    app
    dark
    floating
    permanent
    :width="navbarWidth"
    class="bgcolor"
  >
    <v-container>
      <router-link class="white--text" :to="$router.currentRoute.path">
        <v-chip
          class="transparent pa-6 pl-4"
          v-bind:class="{
            'green--text': isDeveloper,
            'logo--text': !isDeveloper,
          }"
          @click="$store.dispatch('toggleIsDeveloper')"
        >
          <Icon width="30" icon="akar-icons:twitter-fill" />
        </v-chip>
      </router-link>

      <v-list dense nav class="br-15">
        <v-list-item
          link
          class="br-15 link"
          v-for="route in routes"
          :key="route.name"
          @click="pushRoute(route.path)"
        >
          <div class="d-flex align-center">
            <v-list-item-icon class="text--text">
              <Icon width="25" :icon="route.icon" />
            </v-list-item-icon>

            <v-list-item-title class="pl-3 link text--text" v-if="mdAndUp">
              {{ route.name }}</v-list-item-title
            >
          </div>
        </v-list-item>
      </v-list>

      <div class="transparent">
        <v-btn
          v-if="mdAndUp"
          x-large
          rounded
          class="btn primary no-transform stretch pa-1"
          @click="modal = true"
          >Tweet</v-btn
        >
        <v-btn v-else small class="btn br-100 primary no-transform pa-5"
          >+</v-btn
        >
        <PostModal v-if="modal" @done="modal = false" />
      </div>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { Icon } from '@iconify/vue2';
import data from '@/data/data.js';

export default {
  name: 'Navigation',
  components: {
    Icon,
    PostModal: () => import('@/components/PostModal.vue'),
  },

  data: () => ({ modal: false }),

  computed: {
    //data
    routes() {
      return data.routes.home;
    },

    //breakpoint
    mdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    navbarWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 90;
        case 'sm':
          return 90;
        case 'md':
          return 230;
        case 'lg':
          return 230;
        case 'xl':
          return 230;
      }
      return 100;
    },

    //state
    isDeveloper() {
      return this.$store.getters.isDeveloper;
    },
  },

  methods: {
    pushRoute(route) {
      if (this.$router.currentRoute.path != route) {
        this.$router.push(route);
      }
    },
  },
};
</script>

<style scoped>
.link {
  padding-top: 5px;
  padding-bottom: 5px;

  font-size: 13pt !important;
  font-weight: 400 !important;
}
</style>
