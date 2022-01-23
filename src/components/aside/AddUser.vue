<template>
  <v-card class="secondary br-15 mb-3 pa-3">
    <v-card-title class="text-body-1 pb-1 pt-2 grey--text"
      >Add User</v-card-title
    >
    <v-card-text class="pt-0">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col class="pa-0 pr-2">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            >
            </v-text-field>
          </v-col>
          <v-col class="pa-0 pl-2">
            <v-text-field
              v-model="handle"
              :rules="handleRules"
              label="@"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-select
            v-model="color"
            :items="colors"
            :rules="[(v) => !!v || 'Color is required']"
            label="Color"
            required
          ></v-select>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                :disabled="!valid"
                color="success"
                class="mr-4"
                v-bind="attrs"
                v-on="on"
                >Add</v-btn
              >

              <v-btn
                outlined
                color="primary"
                class="mr-4"
                @click="$refs.form.reset()"
                >Reset</v-btn
              >
            </template>

            <v-card v-if="!done">
              <v-card-title class="text-h5 lighten-2">
                Are you sure you want to add
                <span class="primary--text">&nbsp;{{ name }} </span>?
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text class="mt-2" v-if="name">
                <v-avatar :color="color" :size="avatarSize">{{
                  name.toUpperCase().substring(0, 1)
                }}</v-avatar>
                <span class="ml-2">@{{ handle }}</span>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn color="primary" text @click="validate"> Proceed </v-btn>
              </v-card-actions>
            </v-card>

            <v-card v-else>
              <v-card-title class="text-h5 lighten-2"> Success. </v-card-title>
              <v-divider></v-divider>

              <v-card-text class="mt-2"> User has been added. </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn color="primary" text @click="reset"> Ok </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import data from '@/data/data.js';
import breakpoints from '@/data/breakpoints.js';

export default {
  name: 'AddUser',

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
    checkbox: false,
    dialog: false,
    done: false,
  }),

  computed: {
    colors() {
      return data.colors;
    },
    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
    },
    users() {
      return this.$store.getters.users;
    },
  },

  methods: {
    setUsers() {
      this.axios.get(`${data.api}/users`).then((ret) => {
        console.log(ret);
        this.$store.dispatch('setUsers', ret.data);
      });
    },

    addUser() {
      this.axios
        .post(`${data.api}/users/create`, {
          name: this.name,
          color: this.color,
          handle: this.handle,
        })
        .then((ret) => {
          console.log(ret);

          this.done = true;
          this.setUsers();
          this.$refs.form.reset();
        });
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.addUser();
      }
    },
    reset() {
      this.dialog = false;
      this.done = false;
    },
  },
};
</script>
