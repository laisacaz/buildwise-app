<template>
  <div>
    <pop-up-confirmation
      v-model="isDeleting"
      title="Deseja deletar obra?"
      color="red"
      @confirmClick="deleteConstruction"
    >
    </pop-up-confirmation>

    <v-row class="mt-4">
      <h1 class="ml-4">Pesquisa de obras</h1>
    </v-row>
    <v-card class="mt-6 mb-6" outlined>
      <v-row class="ml-2 mt-2">
        <v-col cols="auto">
          <v-select
            style="max-width: 200px"
            v-model="filters.searchType"
            label="Pesquisar por"
            :items="searchTypeItems"
            outlined
            dense
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="filters.search"
            clearable
            dense
            placeholder="Digite aqui"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="search" style="height: 40px" color="primary">
            <v-icon> mdi-magnify </v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-select
            style="max-width: 200px"
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
        <v-col>
          <v-btn class="ml-8" @click="newRegister" color="primary">
            <v-icon color="black"> mdi-plus </v-icon>
            Cadastrar
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="ml-2 mt-2 mb-2"> </v-row>
    </v-card>
    <div>
      <v-data-table
        :headers="headers"
        :loading="isLoading"
        :items="fields.data"
      >
        <template #[`item.edit`]="{ item }">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                color="primary"
                class="grid-icon"
                v-bind="attrs"
                v-on="on"
                @click="editClick(item)"
              >
                {{
                  item.status == EStatusConstruction.Open
                    ? "mdi-pencil"
                    : "mdi-magnify"
                }}
              </v-icon>
            </template>
            <span>{{
              item.status == EStatusConstruction.Open ? "Editar" : "Consultar"
            }}</span>
          </v-tooltip>
        </template>
        <template #[`item.delete`]="{ item }">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                color="red"
                v-bind="attrs"
                v-on="on"
                @click="deleteClick(item)"
              >
                {{ "mdi-delete" }}
              </v-icon>
            </template>
            <span>{{ "Deletar" }}</span>
          </v-tooltip>
        </template>
        <template #[`item.createdAt`]="{ item }">
          <span>
            {{ $moment(item.createdAt, true).format("DD/MM/YYYY") }}
          </span>
        </template>
        <template v-slot:no-data>
          <v-alert :value="true"> Nenhuma obra encontrada </v-alert>
        </template>
      </v-data-table>
    </div>
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
    async search() {
      if (this.filters.searchType == EConstructionSearchType.Id) {
        if (this.filters.search) {
          this.filters.id = parseInt(this.filters.search);
        } else {
          this.filters.search = "";
          this.filters.id = 0;
        }
      }
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
