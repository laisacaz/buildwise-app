<template>
  <div>
    <pop-up-confirmation
      v-model="isDeleting"
      title="Deletar produto?"
      @confirmClick="deleteProduct"
      color="red"
    >
    </pop-up-confirmation>

    <v-row class="mt-4">
      <h2 class="ml-4">Pesquisa de produtos</h2>
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
            :maxlength="50"
            placeholder="Digite aqui"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn
            density="comfortable"
            @click="searchProduct"
            style="height: 40px"
            color="primary"
          >
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
                class="grid-icon ml-10"
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
        <template #[`item.price`]="{ item }">{{
          currencyMask(item.price)
        }}</template>
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
        <template #[`item.stockQuantity`]="{ item }">
          {{ twoDecimalsMask(item.stockQuantity) }}
        </template>
        <template v-slot:no-data>
          <v-alert :value="true"> Nenhum produto encontrado </v-alert>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { currencyMask, twoDecimalsMask } from "~/utils/consts/const";
import { EProductSearchType } from "~/utils/enumerators/enum";
import {
  IProductSearchParams,
  IProductSearchResponse,
  defaultSearchResponse,
} from "~/utils/interfaces/crudObjects";

export default Vue.extend({
  data() {
    return {
      isRegistering: false,
      isDeleting: false,
      itemIdToDelete: 0,
      currencyMask,
      EProductSearchType,
      isLoading: false,
      twoDecimalsMask,
      searchTypeItems: [
        {
          text: "Descrição",
          value: EProductSearchType.Description,
        },
        {
          text: "Referência",
          value: EProductSearchType.Reference,
        },
      ],
      headers: [
        {
          text: "Referência",
          value: "reference",
          width: 180,
        },
        {
          text: "Descrição",
          value: "description",
          width: "45%",
        },
        {
          text: "Quantidade",
          value: "stockQuantity",
          width: 145,
          align: "center",
        },
        {
          text: "Preço",
          value: "price",
          width: 100,
          align: "end",
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
        searchType: EProductSearchType.Description,
        pageNumber: 1,
        pageSize: 10,
      } as IProductSearchParams,
      fields: {} as defaultSearchResponse<IProductSearchResponse>,
    };
  },
  created() {
    this.searchProduct();
  },
  methods: {
    async searchProduct() {
      this.isLoading = true;
      await this.$axios
        .get<defaultSearchResponse<IProductSearchResponse>>("/product/search", {
          params: {
            search: this.filters.search,
            searchType: this.filters.searchType,
            pageNumber: this.filters.pageNumber,
            pageSize: this.filters.pageSize,
          },
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        })
        .then((response) => {
          this.fields = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
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
    async deleteProduct() {
      await this.$axios
        .put("/product/delete/" + this.itemIdToDelete, {
          headers: { "content-type": "application/json" },
        })
        .then(() => {
          this.searchProduct();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    newRegister() {
      this.$router.push("/product/_id");
    },
  },
});
</script>
