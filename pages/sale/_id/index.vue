<template>
  <div>
    <v-form v-if="isConsultingFinished">
      <v-dialog v-model="isConsultingFinished" persistent max-width="800px">
        <v-card class="no-scroll">
          <v-card-title> Consulta recebimento </v-card-title>
          <v-divider></v-divider>

          <v-row>
            <v-col cols="auto">
              <h4 class="ml-6 mt-4">Valor bruto:</h4>
            </v-col>
            <v-col cols="auto" class="mt-4">
              <span>{{ currencyMask(fields.subtotal) }}</span>
            </v-col>
          </v-row>

          <v-row no-gutters class="mt-4">
            <v-col cols="auto">
              <h4 class="ml-6 mt-2 mr-4">Desconto:</h4>
            </v-col>
            <v-col cols="auto" class="ml-2">
              <v-currency-field
                v-model="fields.discount"
                class="mb-2"
                style="max-width: 80px"
                dense
                disabled
                outlined
              ></v-currency-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="auto">
              <h4 class="ml-6 mt-2 mr-4">Acréscimo:</h4>
            </v-col>
            <v-col cols="auto">
              <v-currency-field
                v-model="fields.increase"
                outlined
                dense
                style="max-width: 80px"
                disabled
              ></v-currency-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="auto">
              <h4 class="ml-6 mb-4">Valor líquido:</h4>
            </v-col>
            <v-col cols="auto" class="ml-4">
              <span>{{ currencyMask(fields.total) }}</span>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row>
            <v-col>
              <h3 class="ml-6 mt-4">Forma de recebimento</h3>
            </v-col>
          </v-row>

          <v-row class="ml-2">
            <v-col cols="5">
              <v-select
                v-model="fields.receivementMethod"
                style="max-width: 300px"
                label="Selecione a forma de pagamento"
                :items="receivementMethods"
                outlined
                dense
                hide-details
                disabled
              ></v-select>
            </v-col>
            <v-col cols="auto">
              <h4 class="mt-2">Valor recebido</h4>
            </v-col>
            <v-col cols="4">
              <v-currency-field
                v-model="fields.paidAmount"
                outlined
                disabled
                dense
                style="max-width: 150px"
              ></v-currency-field>
            </v-col>
            <v-col cols="auto" v-if="moneyToReturn">
              <h4 class="mt-2">Troco</h4>
            </v-col>
            <v-col cols="auto">
              <v-chip
                v-if="moneyToReturn"
                label
                style="height: 40px"
                color="red white--text"
              >
                {{ currencyMask(moneyToReturn) }}</v-chip
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row justify="end" class="mt-4">
            <v-col cols="auto">
              <v-btn
                class="ml-8 mb-4 mr-4"
                text
                color="black"
                @click="isConsultingFinished = false"
              >
                <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
                Voltar
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>

    <v-form v-if="isFinishing">
      <v-dialog v-model="isFinishing" persistent max-width="800px">
        <v-card class="no-scroll">
          <v-card-title> Finalizar venda </v-card-title>
          <v-divider></v-divider>

          <v-row>
            <v-col cols="auto">
              <h4 class="ml-6 mt-4">Valor bruto:</h4>
            </v-col>
            <v-col cols="auto" class="mt-4">
              <span>{{ currencyMask(fields.subtotal) }}</span>
            </v-col>
          </v-row>

          <v-row no-gutters class="mt-4">
            <v-col cols="auto">
              <h4 class="ml-6 mt-2 mr-4">Desconto:</h4>
            </v-col>
            <v-col cols="auto" class="ml-2">
              <v-currency-field
                v-model="fields.discount"
                class="mb-2"
                style="max-width: 80px"
                dense
                outlined
                @change="checkIfHasMoneyToReturn"
                @input="calculateDiscountAndIncrease"
              ></v-currency-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="auto">
              <h4 class="ml-6 mt-2 mr-4">Acréscimo:</h4>
            </v-col>
            <v-col cols="auto">
              <v-currency-field
                v-model="fields.increase"
                outlined
                dense
                style="max-width: 80px"
                @change="checkIfHasMoneyToReturn"
                @input="calculateDiscountAndIncrease"
              ></v-currency-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="auto">
              <h4 class="ml-6 mb-4">Valor líquido:</h4>
            </v-col>
            <v-col cols="auto" class="ml-4">
              <span>{{ currencyMask(fields.total) }}</span>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row>
            <v-col>
              <h3 class="ml-6 mt-4">Recebimento</h3>
            </v-col>
          </v-row>

          <v-row class="ml-2">
            <v-col cols="5">
              <v-select
                v-model="fields.receivementMethod"
                style="max-width: 300px"
                label="Selecione a forma de pagamento"
                :items="receivementMethods"
                outlined
                dense
                hide-details
                @change="checkIfHasMoneyToReturn"
              ></v-select>
            </v-col>
            <v-col cols="auto">
              <h4 class="mt-2">Valor recebido</h4>
            </v-col>
            <v-col cols="4">
              <v-currency-field
                v-model="fields.paidAmount"
                outlined
                dense
                style="max-width: 150px"
                @change="checkIfHasMoneyToReturn"
              ></v-currency-field>
            </v-col>
            <v-col cols="auto" v-if="moneyToReturn">
              <h4 class="mt-2">Troco</h4>
            </v-col>
            <v-col cols="auto">
              <v-chip
                v-if="moneyToReturn"
                label
                style="height: 40px"
                color="red white--text"
              >
                {{ currencyMask(moneyToReturn) }}</v-chip
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row justify="end" class="mt-4">
            <v-col cols="auto">
              <v-btn
                class="ml-8 mb-4"
                text
                color="black"
                @click="goBackFinishingSale"
              >
                <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
                Voltar
              </v-btn>
            </v-col>
            <v-col cols="auto" class="mr-10">
              <v-btn class="ml-8 mb-4" color="primary" @click="save">
                Receber
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>
    <!-- popup de pesquisa de obras -->
    <v-form v-if="isSearchingConstruction">
      <v-dialog v-model="isSearchingConstruction" persistent max-width="800px">
        <v-card class="no-scroll">
          <v-card-title> Pesquisar obra </v-card-title>
          <v-row class="ml-2">
            <v-col cols="auto">
              <v-select
                style="max-width: 200px"
                v-model="filtersConstruction.searchType"
                label="Pesquisar por"
                :items="constructionSearchTypeItems"
                outlined
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="filtersConstruction.search"
                clearable
                dense
                placeholder="Pesquisar obra"
                outlined
                @click:clear="clickClearSearchConstruction"
              >
              </v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    style="height: 40px"
                    v-bind="attrs"
                    v-on="on"
                    color="primary"
                    @click="searchConstruction"
                  >
                    <v-icon> mdi-magnify </v-icon>
                  </v-btn>
                </template>
                {{ "Pesquisar" }}
              </v-tooltip>
            </v-col>
          </v-row>

          <v-data-table
            :items="fieldsConstruction.data"
            :headers="headersConstruction"
            hide-default-footer
          >
            <template #[`item.select`]="{ item }">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-model="item.selectedBtn"
                    color="green white--text"
                    v-bind="attrs"
                    v-on="on"
                    rounded
                    :outlined="!item.selectedBtn"
                    @click="selectConstructionItem(item)"
                  >
                    <v-icon>
                      {{ item.selectedBtn == true ? "mdi-check" : "mdi-plus" }}
                    </v-icon>
                    {{
                      item.selectedBtn == true ? "Selecionado" : "Selecionar"
                    }}
                  </v-btn>
                </template>
                <span>{{
                  item.selectedBtn == true ? "Selecionado" : "Selecionar"
                }}</span>
              </v-tooltip>
            </template>
            <template #[`item.createdAt`]="{ item }">
              <span>
                {{ $moment(item.createdAt, true).format("DD/MM/YYYY") }}
              </span>
            </template>
            <template v-slot:no-data>
              {{ "Nenhuma obra cadastrada " }}
            </template>
          </v-data-table>

          <v-divider></v-divider>

          <v-row justify="end" class="mt-4 mb-4">
            <v-col cols="auto">
              <v-btn
                class="ml-8"
                text
                color="black"
                @click="goBackConstruction"
              >
                <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
                Voltar
              </v-btn>
            </v-col>
            <v-col cols="auto" class="mr-10">
              <v-btn class="ml-8" color="primary" @click="addConstruction">
                Vincular obra
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>
    <!-- popup de pesquisa de produtos -->
    <v-form v-if="showPopupSearchProducts">
      <v-dialog v-model="showPopupSearchProducts" persistent max-width="900px">
        <v-card class="no-scroll">
          <v-card-title> Pesquisar produtos </v-card-title>
          <v-row class="ml-2">
            <v-col cols="auto">
              <v-select
                style="max-width: 200px"
                v-model="filtersProduct.searchType"
                label="Pesquisar por"
                :items="productSearchTypeItems"
                outlined
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="filtersProduct.search"
                clearable
                dense
                placeholder="Pesquisar produtos"
                outlined
                @click:clear="clickClearSearchProducts"
              >
              </v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    style="height: 40px"
                    v-bind="attrs"
                    v-on="on"
                    color="primary"
                    @click="searchProducts"
                  >
                    <v-icon> mdi-magnify </v-icon>
                  </v-btn>
                </template>
                {{ "Pesquisar" }}
              </v-tooltip>
            </v-col>
          </v-row>

          <v-data-table
            hide-default-footer
            :items="fieldsProducts.data"
            :headers="headersProducts"
          >
            <template #[`item.select`]="{ item }">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-model="item.selectedBtn"
                    color="green white--text"
                    v-bind="attrs"
                    v-on="on"
                    rounded
                    :outlined="!item.selectedBtn"
                    @click="selectProductItem(item)"
                  >
                    {{
                      item.selectedBtn == true ? "Selecionado" : "Selecionar"
                    }}
                    <v-icon>
                      {{ item.selectedBtn == true ? "mdi-check" : "mdi-plus" }}
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{
                  item.selectedBtn == true ? "Selecionado" : "Selecionar"
                }}</span>
              </v-tooltip>
            </template>
            <template #[`item.price`]="{ item }">
              {{ currencyMask(item.price) }}
            </template>
            <template #[`item.stockQuantitySale`]="{ item }">
              <v-col cols="auto" v-show="item.selectedBtn">
                <v-currency-field
                  style="max-width: 80px"
                  dense
                  class="ml-10"
                  v-model="productToBeInsertedInRegister.stockQuantitySale"
                >
                </v-currency-field>
              </v-col>
            </template>
            <template v-slot:no-data>
              {{ "Nenhuma produto encontrado " }}
            </template>
          </v-data-table>

          <v-divider></v-divider>

          <v-row justify="end" class="mt-4 mb-4">
            <v-col cols="auto">
              <v-btn class="ml-8" text color="black" @click="goBackProduct">
                <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
                Voltar
              </v-btn>
            </v-col>
            <v-col cols="auto" class="mr-10">
              <v-btn class="ml-8" color="primary" @click="addProduct">
                Adicionar produto
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>
    <!-- popup de pesquisa de serviços -->
    <v-form v-if="showPopupSearchServices">
      <v-dialog v-model="showPopupSearchServices" persistent max-width="800px">
        <v-card class="no-scroll">
          <v-card-title> Pesquisar serviços </v-card-title>
          <v-row class="ml-2">
            <v-col cols="10">
              <v-text-field
                v-model="filtersService.search"
                clearable
                dense
                placeholder="Pesquisar serviços"
                outlined
                @click:clear="clickClearSearchServices"
              >
              </v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    style="height: 40px"
                    v-bind="attrs"
                    v-on="on"
                    color="primary"
                    @click="searchServices"
                  >
                    <v-icon> mdi-magnify </v-icon>
                  </v-btn>
                </template>
                {{ "Pesquisar" }}
              </v-tooltip>
            </v-col>
          </v-row>

          <v-data-table
            hide-default-footer
            :items="fieldsServices.data"
            :headers="headerServices"
          >
            <template #[`item.select`]="{ item }">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-model="item.selectedBtn"
                    color="green white--text"
                    v-bind="attrs"
                    v-on="on"
                    rounded
                    :outlined="!item.selectedBtn"
                    @click="selectServiceItem(item)"
                  >
                    {{
                      item.selectedBtn == true ? "Selecionado" : "Selecionar"
                    }}
                    <v-icon>
                      {{ item.selectedBtn == true ? "mdi-check" : "mdi-plus" }}
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{
                  item.selectedBtn == true ? "Selecionado" : "Selecionar"
                }}</span>
              </v-tooltip>
            </template>

            <template #[`item.quantitySale`]="{ item }">
              <v-col cols="auto" v-show="item.selectedBtn">
                <v-currency-field
                  style="max-width: 80px"
                  dense
                  class="ml-10"
                  v-model="serviceToBeInsertedInRegister.stockQuantitySale"
                >
                </v-currency-field>
              </v-col>
            </template>
            <template #[`item.price`]="{ item }">
              {{ currencyMask(item.price) }}
            </template>
            <template v-slot:no-data>
              {{ "Nenhuma serviço encontrado " }}
            </template>
          </v-data-table>

          <v-divider></v-divider>

          <v-row justify="end" class="mt-4 mb-4">
            <v-col cols="auto">
              <v-btn
                class="mr-4"
                text
                color="black"
                @click="showPopupSearchServices = false"
              >
                <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
                Voltar
              </v-btn>
            </v-col>
            <v-col cols="auto" class="mr-10">
              <v-btn class="ml-8" color="primary" @click="addService">
                Adicionar serviço
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-form>

    <v-row class="mt-4">
      <h2 class="ml-4">
        {{
          isEditing && !isConsulting
            ? "Edição de venda"
            : isConsulting === true
            ? "Consulta de venda"
            : "Cadastro de venda"
        }}
      </h2>
    </v-row>
    <v-card elevated class="mt-6 mb-6">
      <v-row class="ml-2 mt-2">
        <v-col>
          <h3>Dados</h3>
        </v-col>
      </v-row>

      <v-row class="ml-2 mt-2 mr-0">
        <v-col cols="4">
          <v-autocomplete
            v-model="fields.clientId"
            :items="items"
            item-text="name"
            item-value="id"
            dense
            outlined
            :disabled="isConsulting"
            label="Cliente"
          ></v-autocomplete>
        </v-col>
        <v-col cols="4">
          <v-autocomplete
            v-model="fields.sellerId"
            :items="items"
            item-text="name"
            item-value="id"
            outlined
            dense
            :disabled="isConsulting"
            label="Vendedor"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-chip
                v-show="fields.statusDescription"
                v-bind="attrs"
                v-on="on"
                :color="
                  fields.status === EStatusSale.Open
                    ? 'green white--text'
                    : 'primary'
                "
                elevated
                style="height: 40px"
                label
              >
                {{ fields.statusDescription }}
              </v-chip>
            </template>
            {{ "Status" }}
          </v-tooltip>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row no-gutters>
        <v-col cols="4">
          <v-checkbox
            :disabled="isConsulting"
            v-model="hasConstruction"
            class="ml-5 mt-2"
            label="Possui obra"
            @click="hasConstructionClick"
          >
          </v-checkbox>
        </v-col>
        <v-col> </v-col>
      </v-row>
    </v-card>

    <v-expand-x-transition>
      <v-card v-show="hasConstruction" class="mt-6 mb-8" elevated>
        <v-row class="ml-2 mt-2">
          <v-col>
            <h3>Obra</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="auto" class="ml-4 mb-4">
            <v-chip elevated label>
              <h3>Nº {{ constructionItem.id }}</h3>
            </v-chip>
          </v-col>
          <v-col>
            <v-chip elevated label>
              <h3>Proprietário: {{ constructionItem.clientName }}</h3>
            </v-chip>
          </v-col>
        </v-row>
      </v-card>
    </v-expand-x-transition>
    <v-card elevated class="mb-6">
      <v-row class="ml-2 mt-2">
        <v-col cols="2">
          <h3>Produtos</h3>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="auto" class="mb-6 mr-10" v-if="!isConsulting">
          <v-btn color="primary" @click="searchProductsClick">
            <v-icon class="mr-2"> mdi-plus </v-icon>
            Adicionar
          </v-btn>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <!-- produtos inseridos na venda -->
      <v-data-table
        :items="productsToBeInsertedInRegister"
        :headers="headersProductsToInsert"
        hide-default-footer
      >
        <template #[`item.delete`]="{ item }">
          <v-tooltip bottom v-show="!isConsulting">
            <template #activator="{ on, attrs }">
              <v-icon
                v-show="!isConsulting"
                color="red"
                v-bind="attrs"
                v-on="on"
                @click="deleteProduct(item)"
              >
                {{ "mdi-delete" }}
              </v-icon>
            </template>
            <span>{{ "Deletar" }}</span>
          </v-tooltip>
        </template>
        <template #[`item.price`]="{ item }">
          {{ currencyMask(item.price) }}
        </template>
        <template #[`item.stockQuantitySale`]="{ item }">
          {{ twoDecimalsMask(item.stockQuantitySale) }}
        </template>
        <template v-slot:no-data> Nenhum produto adicionado </template>
      </v-data-table>
      <v-divider></v-divider>
    </v-card>
    <v-card elevated class="mb-6">
      <v-row class="ml-2 mt-2">
        <v-col cols="2">
          <h3>Serviços</h3>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="auto" class="mb-6 mr-10" v-if="!isConsulting">
          <v-btn color="primary" @click="searchServicesClick">
            <v-icon class="mr-2"> mdi-plus </v-icon>
            Adicionar
          </v-btn>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <!-- serviços inseridos na venda -->
      <v-data-table
        :items="servicesToBeInsertedInRegister"
        :headers="headersServicesToInsert"
        hide-default-footer
      >
        <template #[`item.delete`]="{ item }">
          <v-tooltip bottom v-show="!isConsulting">
            <template #activator="{ on, attrs }">
              <v-icon
                v-show="!isConsulting"
                color="red"
                v-bind="attrs"
                v-on="on"
                @click="deleteService(item)"
              >
                {{ "mdi-delete" }}
              </v-icon>
            </template>
            <span>{{ "Deletar" }}</span>
          </v-tooltip>
        </template>
        <template #[`item.price`]="{ item }">
          {{ currencyMask(item.price) }}
        </template>
        <template #[`item.stockQuantitySale`]="{ item }">
          {{ twoDecimalsMask(item.stockQuantitySale) }}
        </template>
        <template v-slot:no-data> Nenhum serviço adicionado </template>
      </v-data-table>
      <v-divider></v-divider>
      <v-row justify="end" class="mt-4 mr-8">
        <v-col cols="auto"> Total: {{ currencyMask(0) }} </v-col>
      </v-row>
      <v-row v-if="isConsulting" justify="end" class="mt-2 mr-2">
        <v-col cols="auto">
          <v-btn color="green white--text" @click="consultingFinished">
            <v-icon class="mr-2">mdi-magnify</v-icon>
            Recebimento
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="end" class="ml-2 mt-2 mb-2">
        <v-col cols="auto">
          <v-btn class="ml-8" text color="black" @click="leave">
            <v-icon class="mr-2">mdi-arrow-right-bottom</v-icon>
            Voltar
          </v-btn>
        </v-col>
        <v-col v-if="!isConsulting" cols="auto" class="mr-2">
          <v-btn
            class="ml-2"
            outlined
            color="primary"
            @click="isFinishing = true"
          >
            Finalizar
          </v-btn>
        </v-col>
        <v-col v-if="isConsulting" cols="auto" class="mr-6"></v-col>
        <v-col v-if="!isConsulting" cols="auto" class="mr-10">
          <v-btn class="ml-2" color="primary" @click="save">
            <v-icon>mdi-check</v-icon>
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { currencyMask, twoDecimalsMask } from "~/utils/consts/const";
import {
  EConstructionSearchType,
  EProductSearchType,
  ESaleReceivementMethod,
  EStatusSale,
} from "~/utils/enumerators/enum";
import {
  IConstructionSearchParams,
  IConstructionSearchResponse,
  IFinishSale,
  IProductSale,
  IProductSearchParams,
  IProductSearchResponse,
  ISale,
  ISaleById,
  IServiceOrderSearchParams,
  IServiceOrderSearchResponse,
  IServiceSale,
  ISimplePerson,
  ISimpleProduct,
  ISimpleServiceOrder,
  defaultSearchResponse,
} from "~/utils/interfaces/crudObjects";

export default Vue.extend({
  data() {
    return {
      EStatusSale,
      ESaleReceivementMethod,
      EProductSearchType,
      saleId: 0,
      isSearchingConstruction: false,
      isFinishing: false,
      constructionId: 0,
      isConsultingFinished: false,
      constructionItem: {} as IConstructionSearchResponse,
      showPopupSearchProducts: false,
      showPopupSearchServices: false,
      currencyMask,
      twoDecimalsMask,
      isBtnSelected: false,
      hasConstruction: false,
      isEditing: false,
      isConsulting: false,
      moneyToReturn: 0,
      items: [] as ISimplePerson[],
      filtersConstruction: {
        searchType: EConstructionSearchType.ClientName,
      } as IConstructionSearchParams,
      fieldsConstruction:
        {} as defaultSearchResponse<IConstructionSearchResponse>,
      headersConstruction: [
        {
          text: "Código",
          value: "id",
          width: 90,
        },
        {
          text: "Proprietário",
          value: "clientName",
          width: 145,
        },
        {
          text: "Status",
          value: "statusDescription",
          width: 120,
          sortable: false,
        },
        {
          text: "Data cadastro",
          value: "createdAt",
          width: 120,
        },
        {
          text: " ",
          value: "select",
          sortable: false,
          width: 80,
          align: "center",
        },
      ],
      filtersService: {
        search: "",
        pageNumber: 1,
        pageSize: 10,
      } as IServiceOrderSearchParams,
      filtersProduct: {
        search: "",
        searchType: EProductSearchType.Description,
        pageNumber: 1,
        pageSize: 10,
      } as IProductSearchParams,
      fieldsServices: {} as defaultSearchResponse<IServiceOrderSearchResponse>,
      fieldsProducts: {} as defaultSearchResponse<IProductSearchResponse>,
      headersProducts: [
        {
          text: "Referência",
          value: "reference",
          width: 180,
        },
        {
          text: "Descrição",
          value: "description",
          width: "45%",
        },
        {
          text: "Quantidade",
          value: "stockQuantitySale",
          width: 145,
          align: "end",
        },
        {
          text: "Preço",
          value: "price",
          width: 160,
          align: "end",
        },
        {
          text: " ",
          value: "select",
          sortable: false,
          width: 80,
          align: "center",
        },
      ],
      headerServices: [
        {
          text: "Descrição",
          value: "description",
          width: "70%",
        },
        {
          text: "Valor",
          value: "price",
          width: 145,
          align: "end",
        },
        {
          text: "Quantidade",
          value: "quantitySale",
          width: 145,
          align: "end",
        },
        {
          text: " ",
          value: "select",
          sortable: false,
          width: 80,
          align: "center",
        },
      ],
      headersProductsToInsert: [
        {
          text: "Referência",
          value: "reference",
          width: 180,
        },
        {
          text: "Descrição",
          value: "description",
          width: "45%",
        },
        {
          text: "Quantidade",
          value: "stockQuantitySale",
          width: 145,
          align: "end",
        },
        {
          text: "Preço",
          value: "price",
          width: 160,
          align: "end",
        },
        {
          text: " ",
          value: "delete",
          sortable: false,
          width: 80,
          align: "center",
        },
      ],
      headersServicesToInsert: [
        {
          text: "Descrição",
          value: "description",
          width: "63%",
        },
        {
          text: "Quantidade",
          value: "stockQuantitySale",
          width: 145,
          align: "end",
        },
        {
          text: "Preço",
          value: "price",
          width: 160,
          align: "end",
        },
        {
          text: " ",
          value: "delete",
          sortable: false,
          width: 80,
          align: "center",
        },
      ],
      productSearchTypeItems: [
        {
          text: "Descrição",
          value: EProductSearchType.Description,
        },
        {
          text: "Referência",
          value: EProductSearchType.Reference,
        },
      ],
      productsToBeInsertedInRegister: [] as IProductSale[],
      servicesToBeInsertedInRegister: [] as IServiceSale[],
      replaceProductsAlreadyAddedArray: [] as IProductSale[],
      replaceServicesAlreadyAddedArray: [] as IServiceSale[],
      productToBeInsertedInRegister: {
        stockQuantitySale: 0,
      } as IProductSale,
      serviceToBeInsertedInRegister: {
        stockQuantitySale: 0,
      } as IServiceSale,
      receivementMethods: [
        {
          text: "Pix",
          value: ESaleReceivementMethod.Pix,
        },
        {
          text: "Dinheiro",
          value: ESaleReceivementMethod.Money,
        },
        {
          text: "Cartão de débito",
          value: ESaleReceivementMethod.DebitCard,
        },
        {
          text: "Cartão de crédito",
          value: ESaleReceivementMethod.CreditCard,
        },
      ],
      constructionSearchTypeItems: [
        {
          text: "Código",
          value: EConstructionSearchType.Id,
        },
        {
          text: "Proprietário",
          value: EConstructionSearchType.ClientName,
        },
      ],
      fields: {
        clientId: 0,
        sellerId: 0,
        products: [] as ISimpleProduct[],
        services: [] as ISimpleServiceOrder[],
        discount: 0,
        subtotal: 0,
        total: 0,
        increase: 0,
        paidAmount: 0,
        observation: "",
      } as ISale,
      resultSale: {} as ISaleById,
    };
  },
  watch: {
    productsToBeInsertedInRegister: {
      handler(newval) {
        this.productsToBeInsertedInRegister = newval;
      },
    },
  },
  created() {
    this.startPage();
  },
  methods: {
    startPage() {
      const id = parseInt(this.$route.params.id);
      if (!isNaN(id)) {
        this.getData(id);
        this.saleId = id;
      } else {
        this.getActivesClient();
      }
    },
    leave() {
      this.$router.push("/sale");
    },
    async getData(saleId: number) {
      this.isEditing = true;

      await this.$axios
        .get<ISaleById>("/sale/" + saleId)
        .then((response) => {
          this.resultSale = response.data;
          this.prepareUpdateReponse();

          if (this.fields.status == EStatusSale.Finalized) {
            this.isConsulting = true;
          }
          this.getClient();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    prepareUpdateReponse() {
      this.fields = this.resultSale.sale;

      // mapeia o retorno do get by id para produtos que serão editados

      const editedProducts: ISimpleProduct[] = this.resultSale.products.map(
        (x) => ({
          productId: x.productId,
          stockQuantity: x.stockQuantitySale,
        })
      );
      const editedServices: ISimpleServiceOrder[] =
        this.resultSale.services.map((x) => ({
          serviceId: x.serviceId,
          stockQuantity: x.stockQuantitySale,
        }));
      this.fields.products = editedProducts;
      this.fields.services = editedServices;

      if (this.resultSale.construction) {
        if (this.resultSale.construction.id! > 0) {
          this.hasConstruction = true;
          this.constructionItem.id = this.resultSale.construction.id!;
          this.constructionItem.clientName =
            this.resultSale.construction.client.name;
        }
      }
      this.productsToBeInsertedInRegister = this.resultSale.products;
      this.servicesToBeInsertedInRegister = this.resultSale.services;
    },
    async getActivesClient() {
      await this.$axios
        .get<ISimplePerson[]>("/person/actives/simple")
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getClient() {
      if (!this.isConsulting) {
        this.getActivesClient();
      } else {
        this.getAllClient();
      }
    },
    async getAllClient() {
      await this.$axios
        .get<ISimplePerson[]>("/person/simple")
        .then((response) => {
          this.items = response.data;
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
          .post<number>("/sale", this.fields)
          .then((response) => {
            this.saleId = response.data;
            if (!this.isFinishing) {
              this.$globalFunctions.successAlert(
                "Venda foi salva com sucesso",
                5000
              );
              this.leave();
            } else {
              this.finishSale();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async edit(id: number) {
      await this.$axios
        .put("/sale/" + id, this.fields)
        .then(() => {
          if (!this.isFinishing) {
            this.$globalFunctions.successAlert(
              "Venda foi salva com sucesso",
              5000
            );
            this.leave();
          } else {
            this.finishSale();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async searchConstruction() {
      if (this.filtersConstruction.searchType == EConstructionSearchType.Id) {
        if (this.filtersConstruction.search) {
          this.filtersConstruction.id = parseInt(
            this.filtersConstruction.search
          );
        } else {
          this.filtersConstruction.search = "";
          this.filtersConstruction.id = 0;
        }
      } else {
        this.filtersConstruction.id = 0;
      }
      await this.$axios
        .get<defaultSearchResponse<IConstructionSearchResponse>>(
          "/construction/search",
          {
            params: {
              id: this.filtersConstruction.id,
              search: this.filtersConstruction.search,
              searchType: this.filtersConstruction.searchType,
              status: this.filtersConstruction.status,
            },
          }
        )
        .then((response) => {
          this.fieldsConstruction = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clickClearSearchConstruction() {
      this.filtersConstruction.id = 0;
      this.filtersConstruction.search = "";
      this.searchConstruction();
    },
    clickClearSearchProducts() {
      this.filtersProduct.search = "";
      this.searchProducts();
    },
    clickClearSearchServices() {
      this.filtersService.search = "";
      this.searchServices();
    },
    selectConstructionItem(item: any) {
      if (!item.selectedBtn) {
        // verifica se tem algum outro botao selecionado
        const selected = this.fieldsConstruction.data.find(
          (x) => x.selectedBtn === true
        );

        if (!selected) {
          item.selectedBtn = !item.selectedBtn;
          this.constructionId = item.id;
          this.constructionItem = item;
        }
      } else {
        item.selectedBtn = !item.selectedBtn;
        this.constructionId = 0;
      }
    },
    addConstruction() {
      if (this.constructionId <= 0) {
        this.$globalFunctions.attentionAlert("Obra não selecionada");
      } else {
        this.fields.constructionId = this.constructionId;
        this.isSearchingConstruction = false;
      }
    },
    hasConstructionClick() {
      if (!this.hasConstruction) {
        this.fields.constructionId = 0;
        this.constructionId = 0;
      } else {
        this.isSearchingConstruction = true;
        this.searchConstruction();
      }
    },
    goBackConstruction() {
      this.isSearchingConstruction = false;
      this.hasConstruction = false;
    },
    searchProductsClick() {
      this.searchProducts();
      this.showPopupSearchProducts = true;
    },
    searchServicesClick() {
      this.searchServices();
      this.showPopupSearchServices = true;
    },
    async searchServices() {
      await this.$axios
        .get<defaultSearchResponse<IServiceOrderSearchResponse>>(
          "/service-order/search",
          {
            params: {
              search: this.filtersService.search,
              pageNumber: this.filtersService.pageNumber,
              pageSize: this.filtersService.pageSize,
            },
            headers: {
              "content-type": "application/json",
              accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.fieldsServices = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async searchProducts() {
      await this.$axios
        .get<defaultSearchResponse<IProductSearchResponse>>("/product/search", {
          params: {
            search: this.filtersProduct.search,
            searchType: this.filtersProduct.searchType,
            pageNumber: this.filtersProduct.pageNumber,
            pageSize: this.filtersProduct.pageSize,
          },
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        })
        .then((response) => {
          this.fieldsProducts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectProductItem(item: any) {
      if (!item.selectedBtn) {
        // verifica se tem outro item selecionado a nao ser esse
        const selected = this.fieldsProducts.data.find(
          (x) => x.selectedBtn === true
        );

        if (!selected) {
          item.selectedBtn = !item.selectedBtn;
          this.productToBeInsertedInRegister = {
            description: item.description,
            reference: item.reference,
            productId: item.id,
            price: item.price,
            stockQuantitySale:
              this.productToBeInsertedInRegister.stockQuantitySale,
          };
        }
      } else {
        item.selectedBtn = !item.selectedBtn;
      }
      this.isBtnSelected = item.selectedBtn;
    },
    selectServiceItem(item: any) {
      if (!item.selectedBtn) {
        // verifica se tem outro item selecionado a nao ser esse
        const selected = this.fieldsServices.data.find(
          (x) => x.selectedBtn === true
        );
        // pega os dados do serviço pesquisado para deixar no data table do insert
        if (!selected) {
          item.selectedBtn = !item.selectedBtn;
          this.serviceToBeInsertedInRegister = {
            description: item.description,
            serviceId: item.id,
            price: item.price,
            stockQuantitySale:
              this.serviceToBeInsertedInRegister.stockQuantitySale,
          };
        }
      } else {
        item.selectedBtn = !item.selectedBtn;
      }
      this.isBtnSelected = item.selectedBtn;
    },
    addProduct() {
      const selected = this.fieldsProducts.data.find(
        (x) => x.selectedBtn === true
      );
      if (selected) {
        if (this.productToBeInsertedInRegister.stockQuantitySale <= 0) {
          this.$globalFunctions.attentionAlert(
            "Quantidade do produto deve ser maior que 0",
            5000
          );
        } else {
          //verifica se o item ja foi inserido no data table
          const productAlreadyInserted =
            this.productsToBeInsertedInRegister.find(
              (x) =>
                x.productId === this.productToBeInsertedInRegister.productId
            );

          // se ja foi inserido apenas adiciona quantidade e subtitui no array
          if (productAlreadyInserted) {
            //procura index
            const index = this.productsToBeInsertedInRegister.findIndex(
              (x) =>
                x.productId === this.productToBeInsertedInRegister.productId
            );
            //adiciona quantidade
            this.productsToBeInsertedInRegister[index].stockQuantitySale =
              productAlreadyInserted.stockQuantitySale +
              this.productToBeInsertedInRegister.stockQuantitySale;

            // substitui
            this.replaceProductsAlreadyAddedArray =
              this.productsToBeInsertedInRegister;
            this.productsToBeInsertedInRegister =
              this.replaceProductsAlreadyAddedArray;
          } else {
            this.productsToBeInsertedInRegister.push(
              this.productToBeInsertedInRegister
            );
          }
          const productsToInsert: ISimpleProduct[] =
            this.productsToBeInsertedInRegister.map((x) => ({
              productId: x.productId,
              stockQuantity: x.stockQuantitySale,
            }));
          // adiciona na venda
          this.fields.products = productsToInsert;
          //limpa objeto
          this.productToBeInsertedInRegister = {} as IProductSale;
          //calcula totais
          this.calculateTotalPriceProducts();

          this.$globalFunctions.successAlert(
            "Produto adicionado com sucesso",
            5000
          );
          this.showPopupSearchProducts = false;
        }
      } else {
        this.$globalFunctions.attentionAlert(
          "Nenhum produto selecionado",
          5000
        );
      }
    },
    addService() {
      const selected = this.fieldsServices.data.find(
        (x) => x.selectedBtn === true
      );
      if (selected) {
        if (this.serviceToBeInsertedInRegister.stockQuantitySale <= 0) {
          this.$globalFunctions.attentionAlert(
            "Quantidade do serviço deve ser maior que 0",
            5000
          );
        } else {
          //verifica se o item ja foi inserido no data table
          const serviceAlreadyInserted =
            this.servicesToBeInsertedInRegister.find(
              (x) =>
                x.serviceId === this.serviceToBeInsertedInRegister.serviceId
            );

          // se ja foi inserido apenas adiciona quantidade e subtitui no array
          if (serviceAlreadyInserted) {
            //procura index do item ja inserido no v data table
            const index = this.servicesToBeInsertedInRegister.findIndex(
              (x) =>
                x.serviceId === this.serviceToBeInsertedInRegister.serviceId
            );
            //adiciona quantidade
            this.servicesToBeInsertedInRegister[index].stockQuantitySale =
              serviceAlreadyInserted.stockQuantitySale +
              this.serviceToBeInsertedInRegister.stockQuantitySale;

            // substitui
            this.replaceServicesAlreadyAddedArray =
              this.servicesToBeInsertedInRegister;
            this.servicesToBeInsertedInRegister =
              this.replaceServicesAlreadyAddedArray;
          } else {
            this.servicesToBeInsertedInRegister.push(
              this.serviceToBeInsertedInRegister
            );
          }
          const servicesToInsert: ISimpleServiceOrder[] =
            this.servicesToBeInsertedInRegister.map((x) => ({
              serviceId: x.serviceId,
              stockQuantity: x.stockQuantitySale,
            }));
          // adiciona na venda
          this.fields.services = servicesToInsert;
          //limpa objeto
          this.serviceToBeInsertedInRegister = {} as IServiceSale;
          //calcula totais
          this.calculateTotalPriceProducts();

          this.$globalFunctions.successAlert(
            "Serviço adicionado com sucesso",
            5000
          );
          this.showPopupSearchServices = false;
        }
      } else {
        this.$globalFunctions.attentionAlert(
          "Nenhum serviço selecionado",
          5000
        );
      }
    },
    calculateTotalPriceProducts() {
      let totalPrice = 0;

      this.productsToBeInsertedInRegister.forEach((x) => {
        totalPrice += x.price * x.stockQuantitySale;
      });
      console.log(totalPrice);
      this.fields.subtotal += totalPrice;
      this.fields.total = this.fields.subtotal;
    },
    calculateTotalPriceServices() {
      let totalPrice = 0;

      this.servicesToBeInsertedInRegister.forEach((x) => {
        totalPrice += x.price * x.stockQuantitySale;
      });
      console.log(totalPrice);
      this.fields.subtotal += totalPrice;
      this.fields.total = this.fields.subtotal;
    },
    calculateDiscountAndIncrease() {
      const totalWithIncrease = this.fields.subtotal + this.fields.increase!;
      const totalWithDiscountAndIncrease =
        totalWithIncrease - this.fields.discount!;
      this.fields.total = totalWithDiscountAndIncrease;
    },
    goBackProduct() {
      this.showPopupSearchProducts = false;
      this.productToBeInsertedInRegister = {} as IProductSale;
    },
    deleteProduct(item: IProductSale) {
      const index = this.productsToBeInsertedInRegister.findIndex(
        (x) => x.productId === item.productId
      );

      if (index !== -1) {
        this.productsToBeInsertedInRegister.splice(index, 1);
      }
      const indexArrayTwo = this.fields.products.findIndex(
        (x) => x.productId === item.productId
      );

      if (index !== -1) {
        this.fields.products.splice(indexArrayTwo, 1);
        this.fields.subtotal =
          this.fields.subtotal - item.stockQuantitySale * item.price;
        this.fields.total = this.fields.subtotal;
      }
      this.calculateTotalPriceProducts();
    },
    deleteService(item: IServiceSale) {
      const index = this.servicesToBeInsertedInRegister.findIndex(
        (x) => x.serviceId === item.serviceId
      );

      if (index !== -1) {
        this.servicesToBeInsertedInRegister.splice(index, 1);
      }
      const indexArrayTwo = this.fields.services.findIndex(
        (x) => x.serviceId === item.serviceId
      );

      if (index !== -1) {
        this.fields.services.splice(indexArrayTwo, 1);
        this.fields.subtotal =
          this.fields.subtotal - item.stockQuantitySale * item.price;
        this.fields.total = this.fields.subtotal;
      }
      this.calculateTotalPriceServices();
    },
    goBackFinishingSale() {
      this.isFinishing = false;
      this.fields.paidAmount = 0;
      this.fields.discount = 0;
      this.fields.increase = 0;
      this.fields.receivementMethod = 0;
    },
    async finishSale() {
      const finishSaleData: IFinishSale = {
        receivementMethod: this.fields.receivementMethod,
        discount: this.fields.discount,
        increase: this.fields.increase,
        paidAmount: this.fields.paidAmount,
      };

      await this.$axios
        .put("/sale/finish/" + this.saleId, finishSaleData)
        .then(() => {
          this.isFinishing = false;
          this.$globalFunctions.successAlert(
            "Venda finalizada com sucesso",
            5000
          );
          this.leave();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkIfHasMoneyToReturn() {
      if (
        this.fields.receivementMethod == ESaleReceivementMethod.Money &&
        this.fields.paidAmount! > 0 &&
        this.fields.total! > 0
      ) {
        if (this.fields.paidAmount! > this.fields.total!) {
          this.moneyToReturn = this.fields.paidAmount! - this.fields.total!;
        } else {
          this.moneyToReturn = 0;
        }
      } else {
        this.moneyToReturn = 0;
      }
    },
    consultingFinished() {
      this.checkIfHasMoneyToReturn();
      this.isConsultingFinished = true;
    },
  },
});
</script>
<style>
.no-scroll {
  overflow: hidden;
}
</style>
