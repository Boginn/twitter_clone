<template>
  <v-list class="ma-0 pa-0 transparent" v-if="subject">
    <v-tabs
      v-model="active_tab"
      background-color="bgcolor"
      class="d-flex justify-center"
    >
      <v-tab v-for="tab in tabs" :key="tab.name">
        <span @click="$router.push(tab.route)">
          {{ tab.name }}
        </span>
      </v-tab>
    </v-tabs>

    <div v-if="tab">
      <v-list-item
        v-for="f in following"
        :key="f.id"
        link
        class="border-bottom font-11 white--text d-flex align-start"
      >
        <v-col cols="1" class="pl-2">
          <router-link
            :to="`/${getUserById(f.userId).handle.substring(1)}`"
            class="text--text"
          >
            <v-avatar :color="getUserById(f.userId).color" :size="avatarSize">{{
              getUserById(f.userId).name.toUpperCase().substring(0, 1)
            }}</v-avatar>
          </router-link>
        </v-col>
        <v-col>
          <div>
            <div>
              <router-link
                :to="`/${getUserById(f.userId).handle.substring(1)}`"
              >
                <b class="text--text">
                  {{ getUserById(f.userId).name }}
                </b>
                <span class="grey--text">
                  {{ getUserById(f.userId).handle }}
                </span>
              </router-link>
            </div>
          </div>
        </v-col>
        <v-col cols="1" class="mr-3">
          <Options
            :options="more"
            :width="20"
            @option="selectOption"
            @interact="interact(f.userId, selectedOption)"
          />
        </v-col>
      </v-list-item>
    </div>

    <div v-else>
      <!-- <v-tabs background-color="bgcolor" class="d-flex justify-center">
        <v-tab :to="`/${$route.params.handle}/followers`">Followers</v-tab>
        <v-tab :to="`/${$route.params.handle}/following`">Following</v-tab>
      </v-tabs> -->
      <v-list-item
        v-for="f in followers"
        :key="f.id"
        link
        class="border-bottom font-11 white--text d-flex align-start"
      >
        <v-col cols="1" class="pl-2">
          <router-link
            :to="`/${getUserById(f.followerId).handle.substring(1)}`"
            class="text--text"
          >
            <v-avatar
              :color="getUserById(f.followerId).color"
              :size="avatarSize"
              >{{
                getUserById(f.followerId).name.toUpperCase().substring(0, 1)
              }}</v-avatar
            >
          </router-link>
        </v-col>
        <v-col>
          <div>
            <div>
              <router-link
                :to="`/${getUserById(f.followerId).handle.substring(1)}`"
              >
                <b class="text--text">
                  {{ getUserById(f.followerId).name }}
                </b>
                <span class="grey--text">
                  {{ getUserById(f.followerId).handle }}
                </span>
              </router-link>
            </div>
          </div>
        </v-col>
        <v-col cols="1" class="mr-3">
          <Options
            :options="more"
            :width="20"
            @option="selectOption"
            @interact="interact(f.followerId, selectedOption)"
          />
        </v-col>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import data from '@/data/data.js';

import breakpoints from '@/data/breakpoints.js';

export default {
  name: 'Follows',

  components: {
    Options: () => import('@/components/Options.vue'),
  },

  mounted() {
    this.setUsers();
    this.setSubject();
    this.active_tab = this.tab ? 1 : 2;
  },

  data: () => ({
    selectedOption: undefined,
    active_tab: undefined,
    subject: undefined,

    // tab: false,
  }),

  computed: {
    //data
    more() {
      return data.more.tweet;
    },
    options() {
      return data.options;
    },
    tabs() {
      return [
        { name: 'Followers', route: `/${this.$route.params.handle}/followers` },
        { name: 'Following', route: `/${this.$route.params.handle}/following` },
      ];
    },
    followers() {
      return this.follows.filter((f) => f.userId == this.subject.id);
    },
    following() {
      return this.follows.filter((f) => f.followerId == this.subject.id);
    },

    //breakpoint
    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
    },
    iconSize() {
      return breakpoints.iconSize(this.$vuetify.breakpoint.name);
    },

    //eval
    tab() {
      return this.$route.params.following == 'following' ? true : false;
    },

    //state
    user() {
      return this.$store.getters.user;
    },
    users() {
      return this.$store.getters.users;
    },
    follows() {
      return this.$store.getters.follows;
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
    setFollows() {
      this.axios.get('https://localhost:44343/api/follows').then((ret) => {
        console.log(ret.data);
        this.$store.dispatch('setFollows', ret.data);
      });
    },
    setSubject() {
      this.axios
        .get(`https://localhost:44343/api/users/${this.$route.params.handle}`)
        .then((ret) => {
          console.log(ret);
          this.subject = ret.data;
        });
    },

    selectOption(o) {
      this.selectedOption = o;
    },

    interact(id, option) {
      if (option == 'Follow') {
        this.axios
          .put(`https://localhost:44343/api/users/follow/${id}`, this.user)
          .then((ret) => {
            console.log(ret);
          });
      }
    },
  },
};
</script>
