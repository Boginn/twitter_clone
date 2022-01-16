<template>
  <v-card class="secondary br-15 mb-3 pa-3">
    <v-card-text class="pb-0 pt-2">
      <v-select
        :items="users"
        :item-text="'name'"
        :item-value="'id'"
        label="Delete User"
        v-on:change="selectUser"
      ></v-select
    ></v-card-text>
    <div class="d-flex justify-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            :disabled="!selectedUserId"
            color="error"
            class="mr-4"
            v-bind="attrs"
            v-on="on"
            >Delete</v-btn
          >
        </template>

        <v-card v-if="!done">
          <v-card-title class="text-h5 lighten-2" v-if="selectedUserId">
            Are you sure you want to delete
            <span class="primary--text"
              >&nbsp;{{ getUserById(selectedUserId).name }} </span
            >?
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text class="mt-2">
            Deleting the user will remove all replies, likes and tweets by the
            user along with any replies and likes by other users associated.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
            <v-btn color="primary" text @click="deleteUser"> Proceed </v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-else>
          <v-card-title class="text-h5 lighten-2"> Success. </v-card-title>
          <v-divider></v-divider>

          <v-card-text class="mt-2"> User has been deleted. </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="reset"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'DeleteUser',

  data: () => ({
    selectedUserId: undefined,
    dialog: false,
    done: false,
  }),

  computed: {
    users() {
      return this.$store.getters.users;
    },
  },

  methods: {
    getUserById(id) {
      return this.users.filter((user) => user.id == id)[0];
    },
    setUsers() {
      this.axios.get('https://localhost:44343/api/users').then((ret) => {
        console.log(ret);
        this.$store.dispatch('setUsers', ret.data);
      });
    },
    setTweets() {
      this.axios.get('https://localhost:44343/api/tweets').then((ret) => {
        console.log(ret);
        this.$store.dispatch('setTweets', ret.data);
      });
    },
    setReplies() {
      this.axios.get('https://localhost:44343/api/replies').then((ret) => {
        console.log(ret);
        this.$store.dispatch('setReplies', ret.data);
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
          this.done = true;
          this.selectedUserId = undefined;
          this.setUsers();
          this.setTweets();
          this.setReplies();
        });
    },

    reset() {
      this.done = false;
      this.dialog = false;
    },
  },
};
</script>
