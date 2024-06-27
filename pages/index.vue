<template>
  <div>
    <v-row justify="center">
      <v-col cols="auto">
        <v-img
          :src="require('~/assets/eaa743a9-ced5-48cc-8b1b-8764b1ad3d88.jpeg')"
          contain
          max-height="150"
          max-width="300"
          width="100%"
          height="100%"
          style=""
        ></v-img>
      </v-col>
    </v-row>
    <v-card outlined>
      <v-row no-gutters class="mt-5 mr-4 ml-4">
        <v-col cols="12">
          <v-text-field
            v-model="signinObject.email"
            outlined
            placeholder="Digite o email"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="mr-4 ml-4">
        <v-col cols="12">
          <v-text-field
            v-model="signinObject.password"
            placeholder="Digite a senha"
            outlined
            type="password"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="mr-4 ml-4 mb-5">
        <v-col cols="12">
          <v-btn class="fill-space" color="primary" @click="login">
            Entrar
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mr-4 ml-4 mb-5">
        <v-col cols="12">
          <v-btn class="fill-space" outlined color="primary" @click="signup">
            Cadastrar-se
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
  layout: "auth",
  data() {
    return {
      signinObject: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signup() {
      this.$router.push("/signup");
    },
    login() {
      if (this.signinObject.email === "") {
        this.$globalFunctions.attentionAlert("Email é obrigatório");
      } else if (this.signinObject.password === "") {
        this.$globalFunctions.attentionAlert("Senha é obrigatório");
      } else if (
        this.signinObject.email === "" &&
        this.signinObject.password === ""
      ) {
        this.$globalFunctions.attentionAlert("Email e senha são obrigatórios");
      } else {
        this.signin();
      }
    },
    async signin() {
      await this.$axios
        .post<IUser>("/user/signin", this.signinObject, {
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        })
        .then((response) => {
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
