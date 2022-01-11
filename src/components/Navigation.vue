<template>
  <v-container class="max-width">
    <v-list-item>
      <router-link
        class="white--text black ml-1"
        :to="$router.currentRoute.path"
      >
        <v-chip
          class="transparent pa-0"
          v-bind:class="{ 'blue--text': isDeveloper }"
          @click="$store.dispatch('toggleIsDeveloper')"
        >
          <Icon width="30" icon="akar-icons:twitter-fill" />
        </v-chip>
      </router-link>
    </v-list-item>

    <v-list dense nav class="br-15 black">
      <v-list-item
        link
        class="br-15 link"
        v-for="route in routes"
        :key="route.name"
      >
        <div class="d-flex align-center" @click="pushRoute(route.path)">
          <v-list-item-icon>
            <Icon width="25" :icon="route.icon" />
          </v-list-item-icon>

          <v-list-item-title class="pl-3 link" v-if="mdAndUp">
            {{ route.name }}</v-list-item-title
          >
        </div>
      </v-list-item>
    </v-list>
    <v-col class="">
      <v-btn
        v-if="mdAndUp"
        x-large
        rounded
        class="btn primary no-transform stretch pa-1"
        @click="modal = true"
        >Tweet</v-btn
      >
      <v-btn v-else small class="btn br-100 primary no-transform pa-5">+</v-btn>
      <PostModal v-if="modal" @done="modal = false" />
    </v-col>
  </v-container>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
  name: 'Navigation',
  components: {
    Icon,
    PostModal: () => import('@/components/PostModal.vue'),
  },

  props: {
    routes: Array,
  },

  data: () => ({ modal: false }),

  computed: {
    mdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
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
.max-width {
  max-width: 230px !important;
}
.link {
  padding-top: 5px;
  padding-bottom: 5px;

  font-size: 13pt !important;
  font-weight: 400 !important;
}
</style>
