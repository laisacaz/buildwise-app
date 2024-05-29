<template>
  <v-app>
    <v-main class="page-background">
      <v-row justify="start">
        <v-col cols="auto">
          <v-img
            :src="require('~/assets/eaa743a9-ced5-48cc-8b1b-8764b1ad3d88.jpeg')"
            contain
            max-height="150"
            max-width="250"
            width="100%"
            height="100%"
            class="mb-0 mt-0"
            style="margin-left: 10%"
          ></v-img>
        </v-col>
        <v-col cols="6" class="align-center text-wrap text-center">
          <h1 style="margin-top: 7%; margin-left: 30%">
            Utilize a ferramenta adequada para a gestão da sua construtora
          </h1>
        </v-col>
      </v-row>
      <v-row
        style="overflow: hidden !important"
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
