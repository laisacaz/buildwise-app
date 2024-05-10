<template>
  <div>
    <v-row class="mt-4">
      <h1 class="ml-4">
        {{ isEditing ? "Edição de serviço" : "Cadastro de serviço" }}
      </h1>
    </v-row>
    <v-card style="max-width: 800px" class="mt-6 mb-6" outlined>
      <v-row class="ml-2 mt-2 mr-0">
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
          <v-currency-field
            v-model.number="fields.price"
            style="max-width: 126px"
            dense
            class="required"
            type="number"
            label="Valor"
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

import { IServiceOrder } from "~/utils/interfaces/crudObjects";
export default Vue.extend({
  data() {
    return {
      serviceId: 0,
      isEditing: false,
      mensagemAlerta: false,
      fields: {
        description: "",
        price: 0,
      } as IServiceOrder,
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
        this.serviceId = id;
      }
    },
    leave() {
      this.$router.push("/service-order");
    },
    async getData(serviceId: number) {
      this.isEditing = true;
      await this.$axios
        .get<IServiceOrder>("/service-order/" + serviceId, {
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
          .post<number>("/service-order", this.fields)
          .then(() => {
            this.$globalFunctions.successAlert(
              "Serviço salvo com sucesso",
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
        .put("/service-order/" + id, this.fields)
        .then(() => {
          this.$globalFunctions.successAlert("Serviço salvo com sucesso", 5000);
          this.leave();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
