<template>
  <v-container class="pa-0">
    <Post />
    <div v-for="t in tweets" :key="t.Id">
      <v-row class="border-bottom font-11 white--text">
        <v-col cols="1" class="pl-2">
          <v-avatar :color="users[t.UserId - 1].color" :size="avatarSize">{{
            users[t.UserId - 1].Name.substring(0, 1)
          }}</v-avatar>
        </v-col>
        <v-col>
          <div>
            <b>
              {{ users[t.UserId - 1].Name }}
            </b>
            <span class="grey--text">
              {{ users[t.UserId - 1].Handle }} - Date
            </span>
          </div>
          <div>
            {{ t.Content }}
          </div>
          <v-row>
            <v-col v-for="i in options.tweet.icons" :key="i.name">
              <v-chip class="transparent">
                <Icon :width="options.tweet.width" :icon="i.icon" />
              </v-chip>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="1" class="mr-3">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <Icon width="20" :icon="options.generic.dots.icon" />
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { Icon } from '@iconify/vue2';
import data from '@/data/data.js';

export default {
  name: 'Feed',

  components: {
    Icon,
    Post: () => import('@/components/Post.vue'),
  },

  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
    tweets: [
      { Id: 1, Content: 'A tweet', Likes: 2, UserId: 1 },
      { Id: 2, Content: 'Subtle', Likes: 20, UserId: 2 },
      { Id: 3, Content: 'I´m in.', Likes: 4, UserId: 2 },
      { Id: 4, Content: 'I know Kung-Fu!', Likes: 666, UserId: 1 },
      { Id: 5, Content: 'Ignorance is bliss', Likes: 65, UserId: 3 },
      { Id: 6, Content: 'Which pill, yo?', Likes: 1234, UserId: 1 },
      { Id: 7, Content: 'I´d love a good steak', Likes: 65, UserId: 3 },
      { Id: 8, Content: 'Flipsides', Likes: 33, UserId: 2 },
      { Id: 9, Content: 'Smith... Agent Constructor?', Likes: 20, UserId: 1 },
      { Id: 10, Content: 'idk', Likes: 1, UserId: 2 },
    ],
    users: [
      { Id: 1, color: 'blue', Handle: '@theOne', Name: 'Neo', Tweets: [1] },
      {
        Id: 2,
        color: 'red',
        Handle: '@falconhoof',
        Name: 'Trinity',
        Tweets: [2],
      },
      { Id: 3, color: 'green', Handle: '@bliss', Name: 'Cypher', Tweets: [5] },
    ],
  }),

  computed: {
    options() {
      return data.options;
    },
    avatarSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 30;
        case 'sm':
          return 35;
        case 'md':
          return 40;
        case 'lg':
          return 40;
        case 'xl':
          return 45;
      }
      return 100;
    },
  },

  methods: {},
};
</script>

<style scoped></style>
