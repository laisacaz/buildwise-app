<template>
  <v-container>
    <v-row class="mb-6" justify="center">
      <h1>Seja bem-vindo ao BuildWise!</h1>
    </v-row>
    <v-divider></v-divider>

    <v-row align="center" class="mt-8" justify="center">
      <v-col cols="auto">
        <v-card class="mx-auto" style="width: 280px" outlined elevation="3">
          <v-card-item>
            <div>
              <div class="text-overline mb-1"></div>
              <div class="mt-8 ml-4 text-h6 mb-1">
                Produtos
                <v-icon>mdi-package-variant</v-icon>
              </div>
              <div class="ml-4 mr-5 mb-2 text-h7">
                Mantenha o seu estoque sempre atualizado!
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn color="primary" class="ml-2 mb-2" @click="product">
              Acessar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-card class="mx-auto" style="width: 280px" outlined elevation="3">
          <v-card-item>
            <div>
              <div class="text-overline mb-1"></div>
              <div class="mt-8 ml-4 text-h6 mb-1">
                Obras
                <v-icon>mdi-account-hard-hat-outline</v-icon>
              </div>
              <div class="ml-4 mr-5 mb-2 text-h7">
                Registre as obras para manter o controle!
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn color="primary" class="ml-2 mb-2" @click="construction">
              Acessar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-card class="mx-auto" style="width: 280px" outlined elevation="3">
          <v-card-item>
            <div>
              <div class="text-overline mb-1"></div>
              <div class="mt-8 ml-4 text-h6 mb-1">
                Caixa
                <v-icon>mdi-network-pos</v-icon>
              </div>
              <div class="ml-4 mr-5 mb-2 text-h7">
                Mantenha o controle do caixa em dia!
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn color="primary" class="ml-2 mb-2" @click="sale">
              Acessar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-card class="mx-auto" style="width: 280px" outlined elevation="3">
          <v-card-item>
            <div>
              <div class="text-overline mb-1"></div>
              <div class="mt-8 ml-4 text-h6 mb-1">
                Pessoas
                <v-icon>mdi-account-group</v-icon>
              </div>
              <div class="ml-4 mr-5 mb-2 text-h7">
                Cadastre os seus clientes e vendedores!
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn color="primary" class="ml-2 mb-2" @click="person">
              Acessar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-card class="mx-auto" style="width: 280px" outlined elevation="3">
          <v-card-item>
            <div>
              <div class="text-overline mb-1"></div>
              <div class="mt-8 ml-4 text-h6 mb-1">
                Serviços
                <v-icon>mdi-wrench</v-icon>
              </div>
              <div class="ml-4 mr-5 mb-2 text-h7">
                Cadastre os serviços realizados pela construtora!
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn color="primary" class="ml-2 mb-2" @click="service">
              Acessar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-card class="mx-auto" style="width: 280px" outlined elevation="3">
          <v-card-item>
            <div>
              <div class="text-overline mb-1"></div>
              <div class="mt-8 ml-4 text-h6 mb-1">
                Vendas
                <v-icon>mdi-cart</v-icon>
              </div>
              <div class="ml-4 mr-5 mb-2 text-h7">
                Cadastre as vendas dos seus produtos!
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn color="primary" class="ml-2 mb-2" @click="sale">
              Acessar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      variants: ["elevated", "flat", "tonal", "outlined"],
    };
  },
  methods: {
    product() {
      this.$router.push("/product");
    },
    sale() {
      this.$router.push("/sale");
    },
    construction() {
      this.$router.push("/construction");
    },
    person() {
      this.$router.push("/person");
    },
    service() {
      this.$router.push("/service-order");
    },
  },
});
</script>
