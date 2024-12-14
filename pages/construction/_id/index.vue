<template>
  <div>
    <pop-up-confirmation
      v-model="isFinishing"
      title="Deseja finalizar obra?"
      message="Ao concluir essa ação significa que a obra foi concluída e seus dados não poderão mais ser modificados"
      @confirmClick="finishConstruction"
    >
    </pop-up-confirmation>

    <v-row class="mt-4">
      <h1 class="ml-4">
        {{
          isEditing && !isConsulting
            ? "Edição de obra"
            : isConsulting === true
            ? "Consulta de obra"
            : "Cadastro de obra"
        }}
      </h1>
    </v-row>

    <v-card class="mt-6 mb-6" outlined>
      <v-row class="ml-2 mt-2">
        <v-col>
          <h3>Proprietário</h3>
        </v-col>
      </v-row>

      <v-row class="ml-2 mt-2 mr-0">
        <v-col cols="4">
          <v-autocomplete
            v-model="fields.clientId"
            :items="items"
            item-text="name"
            outlined
            dense
            :item-object="fields.client"
            :maxlength="20"
            :disabled="isConsulting"
            item-value="id"
            label="Buscar proprietário"
            @onblur="getClient"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-card>

    <v-card>
      <v-row
        class="ml-2 mt-2"
        style="cursor: pointer"
        @click="isAddressOpen = !isAddressOpen"
      >
        <v-icon size="30">{{
          isAddressOpen ? "mdi-menu-down" : "mdi-menu-right"
        }}</v-icon>

        <v-col>
          <h3>Endereço</h3>
        </v-col>
      </v-row>

      <v-expand-x-transition>
        <v-card-text v-show="isAddressOpen">
          <v-row class="ml-2 mt-2">
            <v-col cols="3">
              <v-text-field
                v-model="fields.address.street"
                clearable
                :disabled="isConsulting"
                dense
                :maxlength="20"
                label="Rua"
                placeholder="Rua"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="fields.address.streetNumber"
                clearable
                dense
                :disabled="isConsulting"
                :maxlength="10"
                label="Nº"
                placeholder="Nº"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-text-field
                v-model="fields.address.district"
                clearable
                dense
                :disabled="isConsulting"
                :maxlength="20"
                label="Bairro"
                placeholder="Bairro"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="fields.address.zipCode"
                clearable
                :disabled="isConsulting"
                dense
                :maxlength="10"
                label="CEP"
                placeholder="CEP"
                outlined
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="ml-2 mt-2">
            <v-col cols="auto">
              <v-text-field
                v-model="fields.address.city"
                clearable
                :disabled="isConsulting"
                dense
                :maxlength="25"
                label="Cidade"
                placeholder="Cidade"
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-text-field
                v-model="fields.address.state"
                clearable
                dense
                :disabled="isConsulting"
                :maxlength="25"
                label="Estado"
                placeholder="Estado"
                outlined
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-expand-x-transition>
    </v-card>

    <v-card>
      <v-row class="ml-2 mt-2">
        <v-col>
          <h3>Observação</h3>
        </v-col>
      </v-row>
      <v-row class="ml-2 mt-2">
        <v-col cols="8">
          <v-textarea
            v-model="fields.observation"
            label="Observação"
            placeholder="Observação"
            outlined
            :disabled="isConsulting"
            :maxlength="200"
            auto-grow
            dense
            rows="4"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row justify="end" class="ml-2 mt-2 mb-2">
        <v-col cols="auto" class="mr-4">
          <v-btn color="white black--text" @click="leave"> Voltar </v-btn>
        </v-col>
        <v-col v-if="!isConsulting" cols="auto" class="mr-2">
          <v-btn
            class="ml-4"
            outlined
            color="primary"
            @click="isFinishing = true"
          >
            Finalizar
          </v-btn>
        </v-col>
        <v-col v-if="isConsulting" cols="auto" class="mr-6"></v-col>
        <v-col v-if="!isConsulting" cols="auto" class="mr-6">
          <v-btn class="ml-6" color="primary" @click="save"> Salvar </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { EStatusConstruction } from "~/utils/enumerators/enum";
import {
  IAddress,
  IConstruction,
  ISimplePerson,
} from "~/utils/interfaces/crudObjects";

export default Vue.extend({
  data() {
    return {
      items: [] as ISimplePerson[],
      isEditing: false,
      isFinishing: false,
      isAddressOpen: false,
      isConsulting: false,
      constructionId: 0,
      fields: {
        clientId: 0,
        client: {},
        observation: "",
        address: {
          zipCode: "",
          state: "",
          city: "",
          street: "",
          streetNumber: "",
          district: "",
        } as IAddress,
      } as IConstruction,
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
        this.constructionId = id;
      } else {
        this.getActivesClient();
      }
    },
    leave() {
      this.$router.push("/construction");
    },
    async getData(constructionId: number) {
      this.isEditing = true;

      await this.$axios
        .get<IConstruction>("/construction/" + constructionId)
        .then((response) => {
          this.fields = response.data;

          if (this.fields.status == EStatusConstruction.Finalized) {
            this.isConsulting = true;
            this.getAllClient();
          } else {
            if (this.fields.client.status === false) {
              this.fields.clientId = 0;
            }
            this.getActivesClient();
          }
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
          .post<number>("/construction", this.fields)
          .then((response) => {
            this.constructionId = response.data;
            this.$globalFunctions.successAlert(
              "Construção salva com sucesso",
              5000
            );
            if (!this.isFinishing) {
              this.leave();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async edit(id: number) {
      await this.$axios
        .put("/construction/" + id, this.fields)
        .then(() => {
          this.$globalFunctions.successAlert(
            "Construção salva com sucesso",
            5000
          );
          if (!this.isFinishing) {
            this.leave();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async finishConstruction() {
      await this.save();

      await this.$axios
        .put("/construction/finish/" + this.constructionId)
        .then(() => {
          this.isFinishing = false;
          this.leave();
        })
        .catch(() => {});
    },
  },
});
</script>
