<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title> Vendas </v-card-title>
          <v-data-table> </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card outlined>
          <v-card-title> Serviços </v-card-title>
          <v-data-table> </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mt-4 mb-4"></v-divider>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Total recebimentos</v-card-title>
          <v-row>
            <v-col cols="auto" class="ml-4">
              Cartão de crédito = R$500,00
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto" class="ml-4">
              Cartão de débito = R$500,00
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto" class="ml-4"> Pix = R$500,00 </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto" class="ml-4">
              Cartão de crédito = R$500,00
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn large color="green">Entrada</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn large color="red">Saída</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
