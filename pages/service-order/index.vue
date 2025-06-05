<template>
  <div>
    <pop-up-confirmation
      v-model="isDeleting"
      title="Deletar serviço?"
      @confirmClick="deleteService"
      color="red"
    >
    </pop-up-confirmation>

    <v-row class="mt-2">
      <h3 class="ml-4">Pesquisa de serviços</h3>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-row class="ml-2 mt-2">
            <v-col cols="9" sm="10" md="10" lg="10" xl="11">
              <v-text-field
                v-model="filters.search"
                clearable
                dense
                :maxlength="50"
                placeholder="Pesquisar pela descrição"
                outlined
                @input="searchService"
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
import { currencyMask } from "~/utils/consts/const";
import {
  IServiceOrderSearchParams,
  IServiceOrderSearchResponse,
  defaultSearchResponse,
} from "~/utils/interfaces/crudObjects";

export default Vue.extend({
  data() {
    return {
      isRegistering: false,
      isDeleting: false,
      itemIdToDelete: 0,
      currencyMask,
      isLoading: false,
      headers: [
        {
          text: "Descrição",
          value: "description",
          width: "60%",
        },
        {
          text: "Valor",
          value: "price",
          width: 200,
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
        pageNumber: 1,
        pageSize: 10,
      } as IServiceOrderSearchParams,
      fields: {} as defaultSearchResponse<IServiceOrderSearchResponse>,
    };
  },
  created() {
    this.searchService();
  },
  methods: {
    async searchService() {
      this.isLoading = true;
      await this.$axios
        .get<defaultSearchResponse<IServiceOrderSearchResponse>>(
          "/service-order/search",
          {
            params: {
              search: this.filters.search,
              pageNumber: this.filters.pageNumber,
              pageSize: this.filters.pageSize,
            },
            headers: {
              "content-type": "application/json",
              accept: "application/json",
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
    async deleteService() {
      await this.$axios
        .put("/service-order/delete/" + this.itemIdToDelete, {
          headers: { "content-type": "application/json" },
        })
        .then(() => {
          this.searchService();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    newRegister() {
      this.$router.push("/service-order/_id");
    },
  },
});
</script>
