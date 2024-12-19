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
          <v-card-title> Relatório de vendas por período </v-card-title>

          <v-divider></v-divider>

          <v-card-subtitle class="mt-4" style="font-size: 18px"
            >Gera relatório de vendas de acordo com o período
            selecionado:</v-card-subtitle
          >

          <v-row>
            <v-col cols="auto" class="ml-6">
              <!-- <validation-provider v-slot="{ errors }" name="Data inicial" rules="required"> -->
              <v-text-field
                v-model="startDate"
                v-mask="mask"
                label="Data inicial"
                outlined
                persistent-placeholder
                placeholder="dd/mm/aaaa"
                clearable
                color="primary"
                class="required"
                @click:clear="filters.startDate = ''"
              >
                <template>
                  <v-icon color="primary"> mdi-calendar </v-icon>
                </template>
              </v-text-field>
              <!-- </validation-provider> -->
            </v-col>
            <v-col cols="auto">
              <!-- <validation-provider v-slot="{ errors }" name="Data inicial" rules="required"> -->
              <v-text-field
                v-model="endDate"
                v-mask="mask"
                label="Data final"
                outlined
                persistent-placeholder
                placeholder="dd/mm/aaaa"
                clearable
                color="primary"
                class="required"
                @click:clear="filters.startDate = ''"
              >
                <template>
                  <v-icon color="primary"> mdi-calendar </v-icon>
                </template>
              </v-text-field>
              <!-- </validation-provider> -->
            </v-col>
          </v-row>

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
import { IReportSaleByPeriodParams } from "~/utils/interfaces/crudObjects";
import { DATEMask, todayDate } from "~/utils/consts/const";

export default Vue.extend({
  data() {
    return {
      dateRange: [] as Array<any>,
      isReportOn: true,
      locale: "pt-BR",
      mask: DATEMask,
      startDate: "",
      endDate: "",
      showPdf: false,
      thePDFFileBlobRoute: undefined as string | undefined,
      filters: {} as IReportSaleByPeriodParams,
    };
  },
  watch: {
    dateRange(val) {
      if (!val[0] && !val[1]) {
        const startDateY = new Date();
        const endDate = new Date();
        const startDate = new Date(
          startDateY.getFullYear(),
          startDateY.getMonth(),
          1
        );
        endDate.setDate(endDate.getDate());
        this.dateRange = [startDate, endDate];
      }
      this.filters.startDate = val[0]
        ? val[0].toISOString()
        : todayDate.toISOString();
      this.filters.endDate = val[1]
        ? val[1].toISOString()
        : todayDate.toISOString();
    },
  },
  created() {
    const startDateY = new Date();
    const endDate = new Date();
    const startDate = new Date(
      startDateY.getFullYear(),
      startDateY.getMonth(),
      1
    );
    this.dateRange = [startDate, endDate];
  },
  methods: {
    leave() {
      this.$router.push("/menu");
    },
    async generatePdf() {
      const partesData = this.startDate.split("/");
      const dia = partesData[0];
      const mes = partesData[1];
      const ano = partesData[2];

      // Crie uma string no formato ISO 8601 (yyyy-mm-dd)
      const dataStart = `${ano}-${mes}-${dia}`;
      this.filters.startDate = dataStart;

      const partesData2 = this.endDate.split("/");
      const dia2 = partesData2[0];
      const mes2 = partesData2[1];
      const ano2 = partesData2[2];

      // Crie uma string no formato ISO 8601 (yyyy-mm-dd)
      const dataEnd = `${ano2}-${mes2}-${dia2}`;
      this.filters.endDate = dataEnd;

      this.showPdf = true;
      const responseType = "blob";

      await this.$axios
        .get<Blob>("/report/sale-by-period", {
          params: this.filters,
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
