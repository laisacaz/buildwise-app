<template>
  <div>
    <pop-up-confirmation
      v-model="isDeleting"
      title="Deletar pessoa?"
      color="red"
      @confirmClick="deletePerson"
    >
    </pop-up-confirmation>

    <v-row class="mt-4" dense>
      <h3 class="ml-4">Pesquisa de pessoas</h3>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-card outlined>
          <v-row class="ml-2 mt-2">
            <v-col cols="4" sm="3" md="3" lg="2" xl="1">
              <v-select
                v-model="filters.searchType"
                label="Pesquisar por"
                :items="searchTypeItems"
                outlined
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="5" sm="7" md="6" lg="8" xl="10">
              <v-text-field
                v-model="filters.search"
                clearable
                dense
                :maxlength="60"
                placeholder="Digite aqui"
                outlined
                @input="search"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3" sm="2" md="2" lg="2" xl="1">
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
      fields: {
        data: [],
      } as defaultSearchResponse<IPersonSearchResponse>,
    };
  },
  created() {
    this.search();
  },
  methods: {
    parseSearchId() {
      if (
        this.filters.searchType === EPersonSearchType.Id &&
        this.filters.search
      ) {
        const id = parseInt(this.filters.search);
        this.filters.id = isNaN(id) ? 0 : id;
        this.filters.search = this.filters.search || "";
      }
    },
    async search() {
      this.isLoading = true;
      this.parseSearchId();

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
