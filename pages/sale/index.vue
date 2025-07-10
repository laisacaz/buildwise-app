<template>
  <div>
    <PDF-Viewer
      v-model="showPdf"
      title="PDF"
      :pdf-file.sync="thePDFFileBlobRoute"
    ></PDF-Viewer>
    <pop-up-confirmation
      v-model="isDeleting"
      title="Deseja deletar venda?"
      color="red"
      @confirmClick="deleteSale"
    >
    </pop-up-confirmation>

    <v-row class="mt-4">
      <h3 class="ml-4">Pesquisa de vendas</h3>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-row class="ml-2 mt-2">
            <v-col cols="12" sm="4" md="3" lg="2" xl="2">
              <v-select
                v-model="filters.searchType"
                label="Pesquisar por"
                :items="searchTypeItems"
                outlined
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="8" md="4" lg="6" xl="7">
              <v-text-field
                v-model="filters.search"
                clearable
                dense
                placeholder="Digite aqui"
                outlined
                @click:clear="clickClearSearch"
                @input="search"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3" lg="2" xl="2">
              <v-select
                v-model="filters.status"
                label="Status"
                :items="statusItems"
                outlined
                dense
                clearable
                hide-details
                @change="search"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3" md="2" lg="2" xl="1">
              <v-btn @click="newRegister" color="primary">
                <v-icon color="white"> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <generic-table
          :headers="headers"
          :loading="isLoading"
          :items="fields.data"
          movement-type="venda"
          @editClick="editClick"
          @printClick="print"
          @deleteClick="deleteClick"
        >
        </generic-table>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { currencyMask } from "~/utils/consts/const";
import { ESaleSearchType, EStatusSale } from "~/utils/enumerators/enum";
import {
  ISaleSearchParams,
  ISaleSearchResponse,
  defaultSearchResponse,
} from "~/utils/interfaces/crudObjects";

export default Vue.extend({
  data() {
    return {
      ESaleSearchType,
      EStatusSale,
      itemIdToDelete: 0,
      isLoading: false,
      showPdf: false,
      currencyMask,
      thePDFFileBlobRoute: undefined as string | undefined,
      isDeleting: false,
      searchTypeItems: [
        {
          text: "Código",
          value: ESaleSearchType.Id,
        },
        {
          text: "Nome cliente",
          value: ESaleSearchType.ClientName,
        },
      ],
      statusItems: [
        {
          text: "Em aberto",
          value: EStatusSale.Open,
        },
        {
          text: "Finalizado",
          value: EStatusSale.Finalized,
        },
      ],
      headers: [
        {
          text: "Código",
          value: "id",
          width: 100,
        },
        {
          text: "Nome",
          value: "clientName",
          width: "40%",
        },
        {
          text: "Status",
          value: "statusDescription",
          width: 145,
          sortable: false,
        },
        {
          text: "Data cadastro",
          value: "createdAt",
          width: 140,
        },
        {
          text: "Total",
          value: "total",
          align: "end",
          width: 100,
        },
        {
          text: " ",
          value: "edit",
          sortable: false,
          width: 80,
          align: "center",
        },
        {
          text: " ",
          value: "printer",
          sortable: false,
          width: 80,
          align: "center",
        },
        {
          text: " ",
          value: "delete",
          sortable: false,
          width: 80,
          align: "center",
        },
      ],
      filters: {
        search: "",
        searchType: ESaleSearchType.ClientName,
      } as ISaleSearchParams,
      fields: {} as defaultSearchResponse<ISaleSearchResponse>,
    };
  },
  created() {
    this.search();
  },
  methods: {
    parseSearchId() {
      if (
        this.filters.searchType == ESaleSearchType.Id &&
        this.filters.search
      ) {
        const id = parseInt(this.filters.search);
        this.filters.id = isNaN(id) ? 0 : id;
        this.filters.search = this.filters.search || "";
      }
    },
    async search() {
      this.parseSearchId();
      this.isLoading = true;

      await this.$axios
        .get<defaultSearchResponse<ISaleSearchResponse>>("/sale/search", {
          params: {
            id: this.filters.id,
            search: this.filters.search,
            searchType: this.filters.searchType,
            status: this.filters.status,
          },
        })
        .then((response) => {
          this.fields = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    clickClearSearch() {
      this.filters.search = "";
      this.filters.id = 0;
      this.search();
    },
    editClick(item: any) {
      this.$router.push({ path: `${this.$route.path}/${item.id}` });
    },
    deleteClick(item: any) {
      this.itemIdToDelete = item.id;
      this.isDeleting = true;
    },
    async deleteSale() {
      await this.$axios
        .put("/sale/delete/" + this.itemIdToDelete, {
          headers: { "content-type": "application/json" },
        })
        .then(() => {
          this.$globalFunctions.successAlert(
            "Venda deletada com sucesso",
            5000
          );
          this.search();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    newRegister() {
      this.$router.push("/sale/_id");
    },
    async print(item: any) {
      this.showPdf = true;
      const responseType = "blob";

      await this.$axios
        .get<Blob>("/sale/report/" + item.id, {
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
