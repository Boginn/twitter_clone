<template>
  <v-card class="secondary br-15 mb-3">
    <v-card-title class="pb-1 pt-2 grey--text">Add User</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-0">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="handle"
          :rules="handleRules"
          label="Handle"
          required
        ></v-text-field>

        <v-select
          v-model="color"
          :items="colors"
          :rules="[(v) => !!v || 'Color is required']"
          label="Color"
          required
        ></v-select>
        <div class="d-flex justify-center">
          <v-btn
            outlined
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >Add</v-btn
          >

          <v-btn outlined color="primary" class="mr-4" @click="reset"
            >Reset</v-btn
          >
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AddUser',

  mounted() {
    // this.setUsers();
  },

  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 19) || 'Name must be less than 19 characters',
    ],
    handle: '',
    handleRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 11) || 'Name must be less than 11 characters',
    ],
    color: null,
    colors: ['blue', 'red', 'yellow', 'green'],
    checkbox: false,
  }),

  computed: {
    users() {
      return this.$store.getters.users;
    },
  },

  methods: {
    // setUser(id) {
    //   this.setUsers();
    //   this.$store.dispatch('setLoggedUserId', id);
    //   console.log(this.users);
    // },
    setUsers() {
      this.axios.get('https://localhost:44343/api/users').then((ret) => {
        console.log(ret);
        this.$store.dispatch('setUsers', ret.data);
      });
    },
    addUser() {
      this.axios
        .post('https://localhost:44343/api/users/create', {
          name: this.name,
          color: this.color,
          handle: this.handle,
        })
        .then((ret) => {
          console.log(ret);
          this.setUsers();
          // this.$store.dispatch('setUsers', ret.data);
        });
    },

    validate() {
      // this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.addUser();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
