<template>
  <div>
    <v-row class="mt-4">
      <h2 class="ml-4">
        {{ isEditing ? "Edição de pessoa" : "Cadastro de pessoa" }}
      </h2>
    </v-row>

    <v-card class="mt-6 mb-6" outlined>
      <v-row class="ml-2 mt-2">
        <v-col>
          <h3>Dados</h3>
        </v-col>
      </v-row>

      <v-row class="ml-2 mt-2 mr-0">
        <v-col cols="4">
          <v-text-field
            v-model="fields.name"
            clearable
            dense
            :maxlength="50"
            label="Nome"
            class="required"
            placeholder="Nome"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="auto" class="mr-0">
          <v-text-field
            v-model="fields.identityNumber"
            clearable
            dense
            :maxlength="15"
            label="CPF"
            placeholder="CPF"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model="fields.socialSecurityNumber"
            clearable
            dense
            :maxlength="10"
            label="RG"
            placeholder="RG"
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-model="fields.cellphone"
            clearable
            dense
            :maxlength="11"
            label="Celular"
            placeholder="Celular"
            outlined
          >
          </v-text-field>
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
import { IAddress, IPerson } from "~/utils/interfaces/crudObjects";

export default Vue.extend({
  data() {
    return {
      isEditing: false,
      isAddressOpen: false,
      personId: 0,
      fields: {
        name: "",
        identityNumber: "",
        socialSecurityNumber: "",
        cellphone: "",
        address: {
          zipCode: "",
          state: "",
          city: "",
          street: "",
          streetNumber: "",
          district: "",
        } as IAddress,
      } as IPerson,
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
        this.personId = id;
      }
    },
    leave() {
      this.$router.push("/person");
    },
    async getData(personId: number) {
      this.isEditing = true;
      await this.$axios
        .get<IPerson>("/person/" + personId, {
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
        if (this.isEditing) {
          this.edit(parseInt(this.$route.params.id));
        }
      } else {
        await this.$axios
          .post<number>("/person", this.fields)
          .then((response) => {
            this.$globalFunctions.successAlert(
              "Pessoa salva com sucesso",
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
        .put("/person/" + id, this.fields)
        .then(() => {
          this.$globalFunctions.successAlert("Pessoa salva com sucesso", 5000);
          this.leave();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
