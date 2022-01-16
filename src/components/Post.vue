<template>
  <v-container class="pa-0">
    <v-row class="border-bottom font-11">
      <v-col cols="1" class="pl-4 highlight">
        <router-link
          :to="`/${getUserById(this.user.id).handle.substring(1)}`"
          class="text--text"
        >
          <v-avatar class="ml-2 mt-4" :color="user.color" :size="avatarSize">{{
            user.name.substring(0, 1)
          }}</v-avatar>
        </router-link>
      </v-col>
      <v-col class="ml-4">
        <div class="grey--text mb-1">
          <v-text-field
            v-model="post"
            :rules="rules.post"
            placeholder="What's Happening?"
            hide-details="auto"
            @keydown.enter="submit"
            @keydown.esc="post = ``"
          ></v-text-field>
        </div>
        <div class="blue--text border-bottom pb-2 d-flex align-center">
          <Icon icon="fa-solid:globe-americas" class="mr-1" />Everyone can reply
        </div>
        <v-row>
          <v-col class="pl-0">
            <span class="mr-2" v-for="i in options.post.icons" :key="i.name">
              <v-chip class="transparent blue--text">
                <Icon :width="iconSize" :icon="i.icon" />
              </v-chip>
            </span>
          </v-col>
          <v-col cols="2">
            <v-btn
              @click="submit"
              :disabled="!validate"
              small
              rounded
              class="btn primary no-transform stretch pa-4"
              name="Tweet"
              >Tweet</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Icon } from '@iconify/vue2';
import data from '@/data/data.js';
import helpers from '@/services/helpers.js';
import breakpoints from '@/data/breakpoints.js';

export default {
  name: 'Post',
  components: {
    Icon,
  },

  props: {
    user: Object,
  },

  data: () => ({ post: `` }),

  computed: {
    //data
    options() {
      return data.options;
    },
    rules() {
      return data.rules;
    },

    //breakpoint
    avatarSize() {
      return breakpoints.avatarSize(this.$vuetify.breakpoint.name);
    },
    iconSize() {
      return breakpoints.iconSize(this.$vuetify.breakpoint.name);
    },

    //eval
    validate() {
      return helpers.validateLength(this.post);
    },

    //state
    users() {
      return this.$store.getters.users;
    },
  },

  methods: {
    getUserById(id) {
      return this.users.filter((u) => u.id == id)[0];
    },
    submit() {
      if (this.validate) {
        /* Extracts hashtags from a post, 
        assigns the first one to variable hashtag
        and concats it to the end of the post */

        let post,
          hashtag,
          hashtags = this.getHashTags(this.post);

        if (hashtags != null) {
          hashtag = hashtags[0];
          post = this.post.split(hashtag).join('');

          hashtag = hashtag.substring(2);
        } else {
          post = this.post;
          hashtag = '';
        }

        /**/

        this.axios
          .post('https://localhost:44343/api/tweets/create', {
            content: post,
            hashtag: hashtag,
            date: new Date(),
            userId: this.user.id,
          })
          .then((ret) => {
            this.$emit('change');
            this.$emit('done');
            console.log(ret);
          });
      }
    },

    getHashTags(inputText) {
      /* Extracts hashtags from a string */
      var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
      var matches = [];
      var match;

      while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
      }
      const res = regex.exec(inputText);
      if (res == null) {
        return null;
      } else {
        return res;
      }
    },
  },
};
</script>
