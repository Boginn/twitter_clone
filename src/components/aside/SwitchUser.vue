<template>
  <v-card class="secondary br-15 mb-3">
    <v-card-text class="pb-0 pt-2">
      <v-row>
        <v-col cols="10">
          <v-select
            :items="users"
            :item-text="'name'"
            :item-value="'id'"
            label="Switch User"
            v-on:change="setUser"
          ></v-select>
        </v-col>
        <v-col class="text--text">
          <span class="text--text">
            {{ currentTheme }}
          </span>
          <v-switch color="primary" v-model="$vuetify.theme.dark"></v-switch>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SwitchUser',

  mounted() {
    this.setUsers();
  },

  computed: {
    currentTheme() {
      return this.$vuetify.theme.dark ? 'Dark' : 'Light';
    },
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    setUser(id) {
      this.setUsers();
      this.$store.dispatch('setLoggedUserId', id);
      console.log(this.users);
    },
    setUsers() {
      this.axios.get('https://localhost:44343/api/users').then((ret) => {
        console.log(ret);
        this.$store.dispatch('setUsers', ret.data);
      });
    },
  },
};
</script>
