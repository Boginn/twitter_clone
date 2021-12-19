<template>
  <!-- <v-container class="black mt-0 pt-0">
    <v-list class="ma-0">
      <v-col class="pb-0">
        <router-link
          class="white--text black ml-1"
          :to="$router.currentRoute.path"
        >
          <v-chip class="transparent pa-0">
            <Icon width="30" icon="akar-icons:twitter-fill" />
          </v-chip>
        </router-link>
      </v-col>

      <v-col class="pa-0" cols="12" v-for="route in routes" :key="route.name">
        <v-card class="d-flex black" elevation="0">
          <router-link
            class="white--text black"
            :to="`/${route.name.toLowerCase()}/`"
          >
            <v-card-title class="link">
              <Icon width="25" :icon="route.icon" />
              <span v-if="mdAndUp" class="ml-3"> {{ route.name }} </span>
            </v-card-title>
          </router-link>
        </v-card>
      </v-col>
      <v-col class="pa-1" cols="12">
        <v-btn
          v-if="mdAndUp"
          x-large
          rounded
          class="btn primary no-transform stretch pa-6"
          >Tweet</v-btn
        >
        <v-btn v-else small class="btn br-100 primary no-transform pa-5"
          >+</v-btn
        >
      </v-col>
    </v-list>
  </v-container> -->

  <v-container>
    <v-list-item>
      <router-link
        class="white--text black ml-1"
        :to="$router.currentRoute.path"
      >
        <v-chip class="transparent pa-0">
          <Icon width="30" icon="akar-icons:twitter-fill" />
        </v-chip>
      </router-link>
    </v-list-item>

    <v-list dense nav class="br-15">
      <v-list-item class="br-15" v-for="route in routes" :key="route.name" link>
        <div class="d-flex align-center">
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
        >Tweet</v-btn
      >
      <v-btn v-else small class="btn br-100 primary no-transform pa-5">+</v-btn>
    </v-col>
  </v-container>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
  name: 'Navigation',
  components: {
    Icon,
  },

  props: {
    routes: Array,
  },

  computed: {
    mdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
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
