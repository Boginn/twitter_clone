<template>
  <v-app-bar
    v-if="lgAndUp"
    app
    elevation="0"
    class="border-left abDark"
    height="50"
    v-bind:class="{
      abDark: $vuetify.theme.dark,
      abLight: !$vuetify.theme.dark,
    }"
  >
    <v-col
      cols="5"
      class="blur ma-0 pa-0"
      style="padding-right: 3px !important"
    >
      <div
        class="d-flex justify-start border-right align-center"
        style="padding-top: 25px"
      >
        <span v-if="$route.name != 'Home'"
          ><v-chip class="transparent"
            ><v-icon small @click="$router.push('/')"
              >mdi-arrow-left</v-icon
            ></v-chip
          ></span
        >
        {{ $route.name }}
      </div>
    </v-col>
    <v-col cols="4">
      <v-container class="min-width">
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
      </v-container>
    </v-col>
    <v-col cols="4"> </v-col>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  components: {},

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },

  data: () => ({
    searchString: '',
    isUpdating: false,

    abDark: {
      backgroundColor: '#FFFFFF81',
    },
  }),

  computed: {
    lgAndUp() {
      return this.$vuetify.breakpoint.lgAndUp;
    },
  },

  methods: {},
};
</script>

<style scoped>
.link {
  padding-top: 5px;
  padding-bottom: 5px;

  font-size: 13pt !important;
  font-weight: 400 !important;
}
.min-width {
  min-width: 445px !important;
}
</style>
