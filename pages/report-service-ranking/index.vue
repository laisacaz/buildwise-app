<template>
  <div>
    <PDF-Viewer
      v-model="showPdf"
      title="PDF"
      :pdf-file.sync="thePDFFileBlobRoute"
      @afterClose="leave"
    ></PDF-Viewer>
    <v-form v-if="isReportOn">
      <v-dialog v-model="isReportOn" persistent max-width="600px">
        <v-card class="no-scroll" outlined elevation="3">
          <v-card-title> Relatório de Ranking de serviços </v-card-title>

          <v-divider></v-divider>

          <v-card-subtitle class="mt-4" style="font-size: 18px"
            >Gera relatório ordenado por serviços mais vendidos</v-card-subtitle
          >
          <v-row class="ml-2 mr-2 mb-2" justify="end">
            <v-col cols="auto">
              <v-btn text color="black" @click="leave">
                <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
                Voltar
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn color="primary" @click="generatePdf">
                <v-icon class="mr-2">mdi-finance</v-icon>
                Gerar relatório
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      isReportOn: true,
      showPdf: false,
      thePDFFileBlobRoute: undefined as string | undefined,
    };
  },
  methods: {
    leave() {
      this.$router.push("/menu");
    },
    async generatePdf() {
      this.showPdf = true;
      const responseType = "blob";

      await this.$axios
        .get<Blob>("/report/service-ranking", {
          responseType: responseType,
        })
        .then((res) => {
          this.thePDFFileBlobRoute = window.URL.createObjectURL(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style>
.no-scroll {
  overflow: hidden;
}
.v-btn {
  border: none;
  background-color: transparent;
}
</style>
