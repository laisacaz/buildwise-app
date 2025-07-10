<template>
  <v-card :outlined="outlined">
    <v-card-title :style="collapsible ? 'cursor: pointer' : ''" @click="toggle">
      <v-icon v-if="collapsible" class="mr-2">{{
        isOpen ? "mdi-menu-down" : "mdi-menu-right"
      }}</v-icon>
      <span>{{ title }}</span>
    </v-card-title>
    <v-expand-transition>
      <v-card-text v-show="isOpen">
        <slot name="default"></slot>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    collapsible: {
      type: Boolean,
      default: false,
    },
    startOpen: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: this.startOpen,
    };
  },
  computed: {},
  watch: {},
  methods: {
    toggle() {
      if (this.collapsible) {
        this.isOpen = !this.isOpen;
      }
    },
  },
});
</script>
