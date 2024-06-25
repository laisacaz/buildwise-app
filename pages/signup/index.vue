<template>
  <div>
    <v-card outlined>
      <v-row no-gutters class="mt-5 mr-4 ml-4">
        <v-col cols="12">
          <v-text-field
            v-model="user.name"
            outlined
            class="required"
            label="Nome completo"
            placeholder="Nome completo"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="mr-4 ml-4">
        <v-col cols="12">
          <v-text-field
            v-model="user.registeredNumber"
            label="CNPJ"
            class="required"
            placeholder="00.000.000-00"
            outlined
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="mr-4 ml-4">
        <v-col cols="12">
          <v-text-field
            v-model="user.email"
            outlined
            class="required"
            label="Email"
            placeholder="Email"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="mr-4 ml-4">
        <v-col cols="12">
          <v-text-field
            v-model="user.password"
            outlined
            class="required"
            type="password"
            label="Senha"
            placeholder="Senha"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="mr-4 ml-4 mb-5">
        <v-col cols="12">
          <v-btn class="fill-space" color="primary" @click="signup">
            Enviar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IUser } from "~/utils/interfaces/crudObjects";
export default Vue.extend({
  layout: "signup",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        registeredNumber: "",
      } as IUser,
    };
  },
  methods: {
    async signup() {
      await this.$axios
        .post<number>("/user", this.user)
        .then(() => {
          this.$globalFunctions.successAlert("Usuário salvo com sucesso", 5000);
          this.$router.push("/menu");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style>
.fill-space {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
