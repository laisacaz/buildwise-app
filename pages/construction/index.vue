<template>
  <div>
    <pop-up-confirmation
      v-model="isDeleting"
      title="Deseja deletar obra?"
      color="red"
      @confirmClick="deleteConstruction"
    >
    </pop-up-confirmation>

    <v-row class="mt-2">
      <h3 class="ml-4">Pesquisa de obras</h3>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-row class="ml-2 mt-2">
            <v-col cols="6" sm="4" md="3" lg="2" xl="2">
              <v-select
                v-model="filters.searchType"
                label="Pesquisar por"
                :items="searchTypeItems"
                outlined
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="6" sm="5" md="4" lg="4" xl="7">
              <v-text-field
                v-model="filters.search"
                clearable
                dense
                :maxlength="50"
                placeholder="Digite aqui"
                outlined
                @input="search"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" sm="3" md="3" lg="3" xl="2">
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
            <v-col cols="6" sm="2" md="2" lg="3" xl="1">
              <v-btn @click="newRegister" color="primary">
                <v-icon color="white"> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="ml-2 mt-2 mb-2"> </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <generic-table
          :headers="headers"
          :loading="isLoading"
          :items="fields.data"
          @editClick="editClick"
          @deleteClick="deleteClick"
        >
        </generic-table>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {
  EConstructionSearchType,
  EStatusConstruction,
} from "~/utils/enumerators/enum";
import {
  IConstructionSearchParams,
  IConstructionSearchResponse,
  defaultSearchResponse,
} from "~/utils/interfaces/crudObjects";

export default Vue.extend({
  data() {
    return {
      itemIdToDelete: false,
      isDeleting: false,
      EConstructionSearchType,
      EStatusConstruction,
      isLoading: false,
      searchTypeItems: [
        {
          text: "Código",
          value: EConstructionSearchType.Id,
        },
        {
          text: "Nome proprietário",
          value: EConstructionSearchType.ClientName,
        },
      ],
      statusItems: [
        {
          text: "Aberto",
          value: EStatusConstruction.Open,
        },
        {
          text: "Finalizado",
          value: EStatusConstruction.Finalized,
        },
      ],
      headers: [
        {
          text: "Código",
          value: "id",
          width: 100,
        },
        {
          text: "Proprietário",
          value: "clientName",
          width: "45%",
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
          width: 150,
          sortable: false,
        },
        {
          text: " ",
          value: "edit",
          sortable: false,
          width: 65,
          align: "center",
        },
        {
          text: " ",
          value: "delete",
          sortable: false,
          width: 65,
          align: "center",
        },
      ],
      filters: {
        search: "",
        searchType: EConstructionSearchType.ClientName,
      } as IConstructionSearchParams,
      fields: {} as defaultSearchResponse<IConstructionSearchResponse>,
    };
  },
  created() {
    this.search();
  },
  methods: {
    parseSearchId() {
      if (
        this.filters.searchType === EConstructionSearchType.Id &&
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
        .get<defaultSearchResponse<IConstructionSearchResponse>>(
          "/construction/search",
          {
            params: {
              id: this.filters.id,
              search: this.filters.search,
              searchType: this.filters.searchType,
              status: this.filters.status,
            },
          }
        )
        .then((response) => {
          this.fields = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    editClick(item: any) {
      this.$router.push({ path: `${this.$route.path}/${item.id}` });
    },
    deleteClick(item: any) {
      this.itemIdToDelete = item.id;
      this.isDeleting = true;
    },
    async deleteConstruction() {
      await this.$axios
        .put("/construction/delete/" + this.itemIdToDelete, {
          headers: { "content-type": "application/json" },
        })
        .then(() => {
          this.$globalFunctions.successAlert("Construção deletada", 5000);
          this.search();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newRegister() {
      this.$router.push("/construction/_id");
    },
  },
});
</script>
<style>
.table.v-table thead th {
  font-size: 20px !important;
}
</style>
