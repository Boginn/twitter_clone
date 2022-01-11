<template>
  <v-card class="secondary br-15">
    <v-list dense nav class="transparent pa-0" v-if="hashtags">
      <v-list-item-title class="text-h6 ml-2 mr-2 d-flex">
        <v-col> Trends for you </v-col>
        <v-col cols="1">
          <Icon class="highlight" width="20" icon="akar-icons:gear" />
        </v-col>
      </v-list-item-title>
      <v-divider></v-divider>

      <v-list-item v-for="item in hashtags" :key="item" link>
        <v-list-item-content>
          <v-col class="pb-0 pt-1">
            <v-list-item-subtitle class="grey--text opacity"
              >Trending</v-list-item-subtitle
            >
            <v-list-item-title class="body-1 mb-1 mt-1">
              {{ item.substring(0, 1).toUpperCase() }}{{ item.substring(1) }}
            </v-list-item-title>
            <v-list-item-subtitle class="grey--text opacity"
              >{{ tweetCount(item) }} Tweets</v-list-item-subtitle
            >
          </v-col>
          <v-col cols="1" class="mr-3">
            <Options :options="more" :width="20" />
          </v-col>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions class="primary--text">
      <v-col>
        <div class="body-2 highlight">Show more</div>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import data from '@/data/data.js';
import { Icon } from '@iconify/vue2';

export default {
  name: 'Trending',

  components: {
    Icon,
    Options: () => import('@/components/Options.vue'),
  },

  methods: {
    tweetCount(hashtag) {
      let count = 0;
      this.tweets.forEach((t) => {
        if (t.hashtag == hashtag) {
          count += 1;
        }
      });
      return count;
    },
  },
  computed: {
    hashtags() {
      let hashtags = [];
      if (this.tweets) {
        this.tweets.forEach((t) => {
          if (!hashtags.includes(t.hashtag) && t.hashtag != '') {
            hashtags.push(t.hashtag);
          }
        });
      }
      return hashtags.slice(0, 5);
    },
    tweets() {
      return this.$store.getters.tweets;
    },
    more() {
      return data.more.trending;
    },
  },
};
</script>
