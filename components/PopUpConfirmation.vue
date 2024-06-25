<template>
  <v-dialog
    v-model="showDialog"
    persistent
    max-width="500"
    width="30%"
    @keydown.esc="dialogCancelClick"
    @keydown.enter="dialogConfirmClick"
  >
    <v-card>
      <v-toolbar
        dark
        class="text-h5 text-center"
        :color="color ? color : 'primary'"
        dense
        flat
      >
        <v-toolbar-title class="font-weight-bold">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-4">
        <div class="text-body-1 font-weight-medium text-center">
          {{ message }}
        </div>
        <div v-if="hintMessage" class="text-caption mt-1 grey--text">
          {{ hintMessage }}
        </div>
      </v-card-text>
      <v-card-actions>
        <slot name="buttons" v-bind="{ dialogCancelClick, dialogConfirmClick }">
          <v-btn
            color="grey"
            text
            class="font-weight-bold"
            @click.native="dialogCancelClick"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :color="color ? color : 'primary'"
            class="font-weight-bold"
            outlined
            @click.native="dialogConfirmClick"
          >
            {{ confirmMessage }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  model: {
    prop: "model",
    event: "input",
  },
  props: {
    model: { type: Boolean, required: true },
    title: { type: String, required: true },
    message: { type: String, required: false },
    color: { type: String, required: false },
    confirmMessage: { type: String, required: false, default: "Confirmar" },
    hintMessage: { type: String, required: false, default: undefined },
  },
  computed: {
    showDialog: {
      get(): boolean {
        return this.model;
      },
      set(val: boolean) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    dialogConfirmClick() {
      this.showDialog = false;
      this.$emit("confirmClick");
    },
    dialogCancelClick() {
      this.showDialog = false;
      this.$emit("cancelClick");
    },
  },
});
</script>
