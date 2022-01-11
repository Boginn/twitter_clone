<template>
  <v-card class="secondary br-15 mb-3 pb-2">
    <v-card-text class="pb-0 pt-2">
      <v-select
        :items="users"
        :item-text="'name'"
        :item-value="'id'"
        label="Select User"
        v-on:change="selectUser"
      ></v-select
    ></v-card-text>
    <div class="d-flex justify-center">
      <v-btn
        outlined
        :disabled="!selectedUserId"
        color="error"
        class="mr-4"
        @click="deleteUser"
        >Delete</v-btn
      >
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'DeleteUser',

  data: () => ({
    selectedUserId: undefined,
  }),

  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    setUsers() {
      this.axios.get('https://localhost:44343/api/users').then((ret) => {
        console.log(ret);
        this.$store.dispatch('setUsers', ret.data);
      });
    },
    selectUser(id) {
      this.selectedUserId = id;
    },
    deleteUser() {
      this.axios
        .delete(
          `https://localhost:44343/api/users/delete/${this.selectedUserId}`
        )
        .then((ret) => {
          console.log(ret);
          this.setUsers();
        });
    },
  },
};
</script>
