<template>
  <v-app>
    <v-main class="page-background">
      <v-row
        style="height: 100vh; overflow: hidden !important"
        no-gutters
        class="ma-0 pa-0"
        align="center"
        justify="center"
      >
        <v-col sm="12" md="3" class="pa-0 ma-0">
          <Nuxt></Nuxt>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
});
</script>
<style lang="scss"></style>
