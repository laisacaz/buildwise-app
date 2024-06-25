<template>
  <div class="mt-4">
    <v-form v-if="showOpenCashierConfirmDialog">
      <v-dialog
        v-model="showOpenCashierConfirmDialog"
        persistent
        max-width="400px"
      >
        <v-card class="no-scroll">
          <v-row>
            <v-col cols="auto">
              <v-card-title> Insira o valor de abertura </v-card-title>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6">
              <v-currency-field outlined class="ml-4"></v-currency-field>
            </v-col>
          </v-row>
          <v-row justify="end" class="mt-4" no-gutters>
            <v-col cols="auto">
              <v-btn class="ml-8 mb-4" text color="black">
                <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
                Voltar
              </v-btn>
            </v-col>
            <v-col cols="auto" class="mr-10">
              <v-btn class="ml-8 mb-4" color="primary"> Abrir </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>
    <pop-up-confirmation
      v-model="showOpenCashierDialog"
      message="Deseja abrir um novo caixa?"
      confirm-message="Abrir"
      title="Caixa fechado!"
      @confirmClick="showOpenCashierConfirmDialog = true"
      @cancelClick="leave"
    >
    </pop-up-confirmation>
    <v-row>
      <v-col>
        <v-card v-if="isCashierOpened">
          <v-row justify="end">
            <v-col cols="auto">
              <v-icon>mdi-printer</v-icon>
            </v-col>
            <v-col cols="auto">
              <v-btn class="mr-2">Fechar caixa</v-btn>
            </v-col>
          </v-row>
          <v-card-title class="mt-n15"
            >Data de abertura:
            {{
              $moment(cashier.openingDate, true).format("DD/MM/YYYY")
            }}</v-card-title
          >
          <v-card-title>Total recebimentos</v-card-title>

          <v-row>
            <v-col cols="auto" class="ml-4">
              Cartão de crédito = R${{ cashier.values.creditCard ?? 0 }},00
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto" class="ml-4">
              Cartão de débito = R${{ cashier.values.debitCard ?? 0 }},00
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto" class="ml-4">
              Pix = R${{ cashier.values.pix ?? 0 }},00
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto" class="ml-4">
              Dinheiro = R${{ cashier.values.money ?? 0 }},00
            </v-col>
          </v-row>
          <v-divider class="mb-2 mt-2"></v-divider>
          <v-row justify="end" class="mr-4">
            <v-col cols="auto">
              <h2>
                Saldo em caixa = R${{ cashier.values.amountAvailable ?? 0 }},00
              </h2>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn large color="green">Entrada</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn large color="red">Saída</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { ICashier, ICashierValues } from "~/utils/interfaces/crudObjects";
export default Vue.extend({
  data() {
    return {
      showOpenCashierDialog: false,
      showOpenCashierConfirmDialog: false,
      isCashierOpened: false,
      cashierId: 0,
      cashier: {
        values: {
          amountAvailable: 0,
          creditCard: 0,
          debitCard: 0,
          entries: 0,
          money: 0,
          outs: 0,
          pix: 0,
        } as ICashierValues,
        openingDate: "",
      } as ICashier,
    };
  },
  created() {
    this.isLastCashierOpen();
  },
  methods: {
    async isLastCashierOpen() {
      await this.$axios
        .get<boolean>("/cashier/check-last-cashier", {
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        })
        .then((response: any) => {
          if (response.data && response.data.isOpen) {
            this.cashierId = response.data.id;
            this.getValues();
            this.isCashierOpened = true;
          } else {
            this.showOpenCashierDialog = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getValues() {
      await this.$axios
        .get<ICashier>("/cashier/" + this.cashierId, {
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        })
        .then((response) => {
          this.cashier = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    leave() {
      this.$router.push("/menu");
    },
  },
});
</script>
