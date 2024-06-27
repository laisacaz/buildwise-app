<template>
  <div class="mt-4">
    <v-form v-if="showOpenCashierConfirmDialog" style="max-width: 280px">
      <v-dialog
        v-model="showOpenCashierConfirmDialog"
        persistent
        max-width="280px"
      >
        <v-card class="no-scroll" style="max-width: 280px">
          <v-row no-gutters>
            <v-col cols="auto">
              <v-card-title> Insira o valor de abertura </v-card-title>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="11">
              <v-currency-field
                v-model="initialValue"
                outlined
                type="number"
                class="ml-4"
              ></v-currency-field>
            </v-col>
          </v-row>
          <v-row class="mt-4" no-gutters>
            <v-col cols="auto">
              <v-btn class="ml-4 mb-4" text color="black" @click="leave">
                <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
                Voltar
              </v-btn>
            </v-col>
            <v-col cols="auto" class="mr-10" @click="openCashier">
              <v-btn class="ml-5 mb-4" color="primary"> Abrir </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>
    <v-form v-if="showPopupEntry" style="max-width: 280px">
      <v-dialog v-model="showPopupEntry" persistent max-width="280px">
        <v-card class="no-scroll" style="max-width: 280px">
          <v-row no-gutters>
            <v-col cols="auto">
              <v-card-title> Insira o valor de entrada </v-card-title>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="11">
              <v-currency-field
                v-model="objectEntryAndOut.amount"
                outlined
                type="number"
                class="ml-4"
              ></v-currency-field>
            </v-col>
          </v-row>
          <v-row class="mt-4" no-gutters>
            <v-col cols="auto">
              <v-btn class="ml-4 mb-4" text color="black" @click="leave">
                <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
                Voltar
              </v-btn>
            </v-col>
            <v-col cols="auto" class="mr-2" @click="saveEntry">
              <v-btn class="ml-5 mb-4" color="primary"> Salvar </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>
    <v-form v-if="showPopupOut" style="max-width: 280px">
      <v-dialog v-model="showPopupOut" persistent max-width="280px">
        <v-card class="no-scroll" style="max-width: 280px">
          <v-row no-gutters>
            <v-col cols="auto">
              <v-card-title> Insira o valor de saída </v-card-title>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="11">
              <v-currency-field
                v-model="objectEntryAndOut.amount"
                outlined
                type="number"
                class="ml-4"
              ></v-currency-field>
            </v-col>
          </v-row>
          <v-row class="mt-4" no-gutters>
            <v-col cols="auto">
              <v-btn class="ml-4 mb-4" text color="black" @click="leave">
                <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
                Voltar
              </v-btn>
            </v-col>
            <v-col cols="auto" class="mr-2" @click="saveOut">
              <v-btn class="ml-5 mb-4" color="primary"> Salvar </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>
    <PDF-Viewer
      v-model="showPdf"
      title="PDF"
      :pdf-file.sync="thePDFFileBlobRoute"
    ></PDF-Viewer>
    <pop-up-confirmation
      v-model="showOpenCashierDialog"
      message="Deseja abrir um novo caixa?"
      confirm-message="Abrir"
      cancel-message="Voltar"
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
              <v-icon @click="print">mdi-printer</v-icon>
            </v-col>
            <v-col cols="auto">
              <v-btn class="mr-2" color="primary" @click="closeCashier"
                >Fechar caixa</v-btn
              >
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
              Cartão de crédito =
              {{ currencyMask(cashier.values.creditCard ?? 0) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto" class="ml-4">
              Cartão de débito =
              {{ currencyMask(cashier.values.debitCard ?? 0) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto" class="ml-4">
              Pix = {{ currencyMask(cashier.values.pix ?? 0) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto" class="ml-4">
              Dinheiro = {{ currencyMask(cashier.values.money ?? 0) }}
            </v-col>
          </v-row>
          <v-divider class="mb-2 mt-2"></v-divider>
          <v-row justify="end" class="mr-4">
            <v-col cols="auto">
              <h2>
                Saldo em caixa ={{
                  currencyMask(cashier.values.amountAvailable ?? 0)
                }}
              </h2>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn
                large
                rounded
                outlined
                color="green"
                @click="showPopupEntry = true"
                >Entrada</v-btn
              >
            </v-col>
            <v-col cols="auto" class="mr-4">
              <v-btn
                large
                rounded
                outlined
                color="red"
                style="width: 114px"
                @click="showPopupOut = true"
                >Saída</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { currencyMask } from "~/utils/consts/const";
import { ICashier, ICashierValues } from "~/utils/interfaces/crudObjects";
export default Vue.extend({
  data() {
    return {
      showOpenCashierDialog: false,
      showOpenCashierConfirmDialog: false,
      showPopupEntry: false,
      showPopupOut: false,
      showPdf: false,
      thePDFFileBlobRoute: undefined as string | undefined,
      isCashierOpened: false,
      objectEntryAndOut: {
        id: 0,
        amount: 0,
      },
      cashierId: 0,
      currencyMask,
      initialValue: 0,
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
    async closeCashier() {
      await this.$axios
        .put("/cashier/" + this.cashierId, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.$globalFunctions.successAlert("Caixa fechado com sucesso", 5000);
          this.leave();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async openCashier() {
      await this.$axios
        .post<number>(
          "/cashier",
          { initialValue: this.initialValue },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.$globalFunctions.successAlert("Caixa aberto com sucesso", 5000);
          this.cashierId = res.data;
          this.getValues();
          this.showOpenCashierConfirmDialog = false;
          this.isCashierOpened = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
    async print(id: number) {
      this.showPdf = true;
      const responseType = "blob";

      await this.$axios
        .get<Blob>("/cashier/report/" + this.cashierId, {
          responseType: responseType,
        })
        .then((res) => {
          this.thePDFFileBlobRoute = window.URL.createObjectURL(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async saveEntry() {
      await this.$axios
        .put("/cashier/entry/" + this.cashierId, this.objectEntryAndOut, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.$globalFunctions.successAlert("Entrada salva com sucesso", 5000);
          this.showPopupEntry = false;
          this.getValues();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async saveOut() {
      await this.$axios
        .put("/cashier/out/" + this.cashierId, this.objectEntryAndOut, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.$globalFunctions.successAlert("Saída salva com sucesso", 5000);
          this.showPopupOut = false;
          this.getValues();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
