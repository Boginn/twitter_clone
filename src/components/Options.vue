<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark icon v-bind="attrs" v-on="on">
        <Icon :width="width" :icon="icon" />
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(item, i) in options" :key="i">
        <v-list-item-title
          class="highlight"
          @click="
            $emit('option', item.value);
            $emit('interact');
          "
          >{{ item.value }}</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import data from '@/data/data.js';
import { Icon } from '@iconify/vue2';
export default {
  name: 'Options',

  components: {
    Icon,
  },

  props: {
    options: Array,
    width: Number,
  },

  computed: {
    icon() {
      return data.options.generic.dots.icon;
    },
  },

  methods: {},
};
</script>
