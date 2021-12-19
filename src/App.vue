<template>
  <v-app>
    <v-app-bar
      v-if="lgAndUp"
      app
      dark
      class="border-left"
      style="background-color: #00000081"
      height="50"
    >
      <v-col
        cols="5"
        class="overlay ma-0 pa-0"
        style="padding-right: 3px !important"
      >
        <div
          class="d-flex justify-start border-right"
          style="padding-top: 25px"
        >
          Home
        </div>
      </v-col>
      <v-col cols="4">
        <v-form>
          <v-autocomplete
            v-model="searchString"
            :disabled="isUpdating"
            solo
            chips
            color="white"
            label="Search..."
            clearable
            append-icon="mdi-magnify"
            :open-on-click="false"
            style="padding-top: 25px"
            class="br-25"
          >
          </v-autocomplete>
        </v-form>
      </v-col>
      <v-col cols="4"> </v-col>
    </v-app-bar>

    <v-navigation-drawer
      app
      dark
      floating
      permanent
      :width="navbarWidth"
      class="black"
    >
      <Navigation :routes="routes" />
    </v-navigation-drawer>

    <v-main class="black">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import data from '@/data/data.js';

export default {
  name: 'App',

  components: {
    Navigation: () => import('@/components/Navigation.vue'),
  },

  data: () => ({
    searchString: '',
    isUpdating: false,
  }),

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },

  computed: {
    routes() {
      return data.routes.home;
    },
    lgAndUp() {
      return this.$vuetify.breakpoint.lgAndUp;
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
  },
};
</script>

<style>
.overlay {
  backdrop-filter: blur(6px);
}
/* helpers */
.stretch {
  width: 100% !important;
}
.no-transform {
  text-transform: none !important;
}
/* .code {
  font-family: 'Courier New', Courier, monospace;
}
.font-shadow {
  text-shadow: black 1px 1px;
}
.font-shadow-narrow {
  text-shadow: black 0.3px 0.3px;
} */
.border-bottom {
  border-bottom: 1px solid rgb(39, 39, 39) !important;
}
.border-left {
  border-left: 1px solid rgb(39, 39, 39) !important;
}
.border-right {
  border-right: 1px solid rgb(39, 39, 39) !important;
}
.br-15 {
  border-radius: 15px !important;
}
.br-25 {
  border-radius: 25px !important;
}
.br-100 {
  border-radius: 100% !important;
}
.font-11 {
  font-size: 11pt !important;
  color: #00000081;
}
.btn:hover {
  background-color: #1b88cce5 !important;
}

/* config */

* {
  margin: 0px !important;
}
body {
  background-color: black;
}

a {
  text-decoration: none !important;
}

.parent-class >>> .v-toolbar__content {
  padding: 0px !important;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 2px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(245, 245, 220, 0.253);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 245, 220, 0.692);
}
::-webkit-scrollbar-corner {
  opacity: 0;
}

.v-application {
  font-family: 'Roboto', Tahoma, Geneva, Verdana, sans-serif !important;
}
</style>
