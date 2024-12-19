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
        <v-col cols="12" md="6" class="align-center text-wrap text-center">
          <h1 class="responsive-title">
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
<style lang="scss">
.responsive-title {
  font-size: 1.5rem;
  margin-top: 5%;
  margin-left: 6%;
}

@media (min-width: 600px) {
  .responsive-title {
    font-size: 2rem;
  }
}

@media (min-width: 960px) {
  .responsive-title {
    font-size: 2.5rem;
    margin-top: 7%;
    margin-left: 36%;
  }
}

@media (min-height: 1000px) {
  .responsive-title {
    font-size: 2.5rem;
    margin-top: 7%;
    margin-left: 50%;
  }
}

.page-background {
  background-color: #f5f5f5;
}
</style>
