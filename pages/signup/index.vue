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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login() {
      if (this.user.email === "") {
        this.$globalFunctions.attentionAlert("Email é obrigatório");
      } else if (this.user.password === "") {
        this.$globalFunctions.attentionAlert("Senha é obrigatório");
      } else if (this.user.email === "" && this.user.password === "") {
        this.$globalFunctions.attentionAlert("Email e senha são obrigatórios");
      } else {
        this.$router.push("/menu");
      }
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
