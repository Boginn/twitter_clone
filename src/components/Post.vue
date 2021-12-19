<template>
  <v-container class="pa-0">
    <v-row class="border-bottom font-11">
      <v-col cols="1"> IMG </v-col>
      <v-col>
        <div class="grey--text mb-1">
          <v-text-field
            :rules="rules"
            placeholder="What's Happening?"
            hide-details="auto"
          ></v-text-field>
        </div>
        <div class="blue--text border-bottom pb-2 d-flex align-center">
          <Icon icon="fa-solid:globe-americas" class="mr-1" />Everyone can reply
        </div>
        <v-row class="">
          <v-col class="pl-0">
            <span class="mr-2" v-for="i in options.post.icons" :key="i.name">
              <v-chip class="transparent blue--text">
                <Icon :width="options.post.width" :icon="i.icon" />
              </v-chip>
            </span>
          </v-col>
          <v-col cols="2">
            <v-btn small rounded class="btn primary no-transform stretch pa-3"
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
export default {
  name: 'Post',

  components: {
    Icon,
  },

  data: () => ({}),

  computed: {
    options() {
      return data.options;
    },
  },

  methods: {},
};
</script>
