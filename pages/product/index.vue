<template>
  <div>
    <pop-up-confirmation
      v-model="isDeleting"
      title="Deletar produto?"
      @confirmClick="deleteProduct"
      color="red"
    >
    </pop-up-confirmation>

    <v-row class="mt-2">
      <h3 class="ml-4">Pesquisa de produtos</h3>
    </v-row>

    <v-row>
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
                :maxlength="50"
                placeholder="Digite aqui"
                outlined
                @input="searchProduct"
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
