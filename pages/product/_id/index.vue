<template>
  <div>
    <v-row class="mt-4">
      <h2 class="ml-4">
        {{ isEditing ? "Edição de produto" : "Cadastro de produto" }}
      </h2>
    </v-row>
    <v-card style="max-width: 800px" class="mt-6 mb-6" outlined>
      <v-row class="ml-2 mt-2 mr-0">
        <v-col cols="auto">
          <v-text-field
            v-model="fields.reference"
            clearable
            dense
            :maxlength="20"
            class="required"
            label="Referência"
            placeholder="Referência"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="8" class="mr-0">
          <v-text-field
            v-model="fields.description"
            clearable
            dense
            class="required"
            :maxlength="50"
            label="Descrição"
            placeholder="Descrição"
            outlined
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="ml-2 mt-2">
        <v-col cols="auto">
          <v-text-field
            v-model="fields.barCode"
            clearable
            dense
            :maxlength="13"
            label="Código de barras"
            placeholder="Código de barras"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-currency-field
            v-model.number="fields.stockQuantity"
            style="max-width: 126px"
            dense
            class="required"
            type="number"
            label="Quantidade"
            outlined
          >
          </v-currency-field>
        </v-col>
        <v-col cols="auto">
          <v-currency-field
            v-model.number="fields.cost"
            style="max-width: 126px"
            dense
            type="number"
            label="Custo"
            outlined
          >
          </v-currency-field>
        </v-col>
        <v-col cols="auto">
          <v-currency-field
            v-model.number="fields.price"
            style="max-width: 126px"
            dense
            class="required"
            type="number"
            label="Preço"
            outlined
          >
          </v-currency-field>
        </v-col>
      </v-row>
      <v-row justify="end" class="ml-2 mt-2 mb-2">
        <v-col cols="auto">
          <v-btn class="ml-8" color="white black--text" @click="leave">
            Voltar
          </v-btn>
        </v-col>
        <v-col cols="auto" class="mr-10">
          <v-btn class="ml-8" color="primary" @click="save"> Salvar </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { IProduct } from "~/utils/interfaces/crudObjects";
export default Vue.extend({
  data() {
    return {
      productId: 0,
      isEditing: false,
      mensagemAlerta: false,
      fields: {
        description: "",
        reference: "",
        barCode: "",
        stockQuantity: 0,
        price: 0,
        cost: 0,
      } as IProduct,
    };
  },
  created() {
    this.startPage();
  },
  methods: {
    startPage() {
      const id = parseInt(this.$route.params.id);
      if (!isNaN(id)) {
        this.getData(id);
        this.productId = id;
      }
    },
    leave() {
      this.$router.push("/product");
    },
    async getData(productId: number) {
      this.isEditing = true;
      await this.$axios
        .get<IProduct>("/product/" + productId, {
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
        });
    },
    async save() {
      if (this.isEditing) {
        this.edit(parseInt(this.$route.params.id));
      } else {
        await this.$axios
          .post<number>("/product", this.fields)
          .then(() => {
            this.$globalFunctions.successAlert(
              "Produto salvo com sucesso",
              5000
            );
            this.leave();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async edit(id: number) {
      await this.$axios
        .put("/product/" + id, this.fields)
        .then(() => {
          this.$globalFunctions.successAlert("Produto salvo com sucesso", 5000);
          this.leave();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
