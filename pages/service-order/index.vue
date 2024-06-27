<template>
  <div>
    <pop-up-confirmation
      v-model="isDeleting"
      title="Deletar serviço?"
      @confirmClick="deleteService"
      color="red"
    >
    </pop-up-confirmation>

    <v-row class="mt-4">
      <h1 class="ml-4">Pesquisa de serviços</h1>
    </v-row>

    <v-card class="mt-6 mb-6" outlined>
      <v-row class="ml-2 mt-2">
        <v-col cols="6">
          <v-text-field
            v-model="filters.search"
            clearable
            dense
            :maxlength="50"
            placeholder="Pesquisar pela descrição"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn
            density="comfortable"
            @click="searchService"
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
        <template #[`item.price`]="{ item }">{{
          currencyMask(item.price)
        }}</template>
        <template v-slot:no-data>
          <v-alert :value="true"> Nenhum serviço encontrado </v-alert>
        </template>
      </v-data-table>
    </div>
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
