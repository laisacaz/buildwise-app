<template>
  <div>
    <pop-up-confirmation
      v-model="isDeleting"
      title="Deletar pessoa?"
      color="red"
      @confirmClick="deletePerson"
    >
    </pop-up-confirmation>

    <v-row class="mt-4">
      <h2 class="ml-4">Pesquisa de pessoas</h2>
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
        <v-col cols="6">
          <v-text-field
            v-model="filters.search"
            clearable
            dense
            :maxlength="60"
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
          <v-btn class="ml-8" @click="newRegister" color="primary">
            <v-icon color="black"> mdi-plus </v-icon>
            Cadastrar
          </v-btn>
        </v-col>
      </v-row>
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
                {{ "mdi-pencil" }}
              </v-icon>
            </template>
            <span>{{ "Editar" }}</span>
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
        <template v-slot:no-data>
          <v-alert :value="true"> Nenhuma pessoa encontrado </v-alert>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { EPersonSearchType } from "~/utils/enumerators/enum";
import {
  IPersonSearchParams,
  IPersonSearchResponse,
  IProductSearchResponse,
  defaultSearchResponse,
} from "~/utils/interfaces/crudObjects";

export default Vue.extend({
  data() {
    return {
      EPersonSearchType,
      itemIdToDelete: 0,
      isLoading: false,
      isDeleting: false,
      searchTypeItems: [
        {
          text: "Código",
          value: EPersonSearchType.Id,
        },
        {
          text: "Nome",
          value: EPersonSearchType.Name,
        },
      ],
      headers: [
        {
          text: "Código",
          value: "id",
          width: 100,
        },
        {
          text: "Name",
          value: "name",
          width: "70%",
        },
        {
          text: "CPF",
          value: "identityNumber",
          width: 180,
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
        searchType: EPersonSearchType.Name,
      } as IPersonSearchParams,
      fields: {} as defaultSearchResponse<IPersonSearchResponse>,
    };
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      if (this.filters.searchType == EPersonSearchType.Id) {
        if (this.filters.search) {
          this.filters.id = parseInt(this.filters.search!);
        } else {
          this.filters.search = "";
          this.filters.id = 0;
        }
      }

      this.isLoading = true;

      await this.$axios
        .get<defaultSearchResponse<IPersonSearchResponse>>("/person/search", {
          params: {
            id: this.filters.id,
            search: this.filters.search,
            searchType: this.filters.searchType,
          },
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        })
        .then((response) => {
          this.isLoading = false;
          this.fields = response.data;
        })
        .catch((error) => {
          this.isLoading = false;
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
    async deletePerson() {
      await this.$axios
        .put("/person/delete/" + this.itemIdToDelete, {
          headers: { "content-type": "application/json" },
        })
        .then(() => {
          this.$globalFunctions.successAlert("Pessoa deletada", 5000);
          this.search();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    newRegister() {
      this.$router.push("/person/_id");
    },
  },
});
</script>
<style>
.table.v-table thead th {
  font-size: 20px !important;
}
</style>
