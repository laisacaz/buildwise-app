<template>
  <v-data-table
    :page="page"
    :items-per-page="itemsPerPage"
    :group-by="groupBy"
    :group-desc="groupDesc"
    :sort-by="sortBy"
    :sort-desc="sortDesc"
    :headers="headers"
    :items="items"
    :loading="loading"
    :height="height"
    :dark="dark"
    :dense="dense"
    :multi-sort="multiSort"
    :must-sort="mustSort"
    :mobile-breakpoint="mobileBreakpoint"
  >
    <slot name="default"> </slot>
    <template #[`item.edit`]="{ item }">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-icon
            color="primary"
            class="grid-icon"
            v-bind="attrs"
            v-on="on"
            @click="editClick(item)"
          >
            {{ "mdi-pencil" }}
          </v-icon>
        </template>
        <span>{{ "Editar" }}</span>
      </v-tooltip>
    </template>
    <template #[`item.delete`]="{ item }">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-icon
            color="red"
            v-bind="attrs"
            v-on="on"
            @click="deleteClick(item)"
          >
            {{ "mdi-delete" }}
          </v-icon>
        </template>
        <span>{{ "Deletar" }}</span>
      </v-tooltip>
    </template>
    <template #no-data>
      <v-alert :value="true"> Nenhuma pessoa encontrado </v-alert>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  model: {
    prop: "model",
    event: "input",
  },
  props: {
    model: {
      type: Boolean,
      required: true,
    },
    calculateWidths: {
      type: Boolean,
      required: false,
      default: false,
    },
    caption: {
      type: String,
      required: false,
      default: undefined,
    },
    checkboxColor: {
      type: String,
      required: false,
      default: undefined,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    dense: {
      type: Boolean,
      required: false,
      default: false,
    },
    disableFiltering: {
      type: Boolean,
      required: false,
      default: false,
    },
    disablePagination: {
      type: Boolean,
      required: false,
      default: false,
    },
    disableSort: {
      type: Boolean,
      required: false,
      default: false,
    },
    expandIcon: {
      type: String,
      required: false,
      default: "$expand",
    },
    expanded: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    filterMode: {
      type: String,
      required: false,
      default: "intersection",
    },
    fixedHeader: {
      type: Boolean,
      required: false,
      default: false,
    },
    footerProps: {
      type: Object,
      required: false,
      default: undefined,
    },
    groupBy: {
      type: [String, Array],
      default: () => [],
    },
    groupDesc: {
      type: [Boolean, Array],
      default: () => [],
    },
    headerProps: {
      type: Object,
      default: () => ({}),
    },
    headers: {
      type: Array,
      default: () => [],
    },
    headersLength: {
      type: Number,
      default: undefined,
    },
    height: {
      type: [Number, String],
      default: undefined,
    },
    hideDefaultFooter: {
      type: Boolean,
      default: false,
    },
    hideDefaultHeader: {
      type: Boolean,
      default: false,
    },
    itemClass: {
      type: [String, Function],
      default: undefined,
    },
    itemKey: {
      type: String,
      default: "id",
    },
    itemStyle: {
      type: [String, Function],
      default: undefined,
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    light: {
      type: Boolean,
      default: false,
    },
    loaderHeight: {
      type: [Number, String],
      default: 4,
    },
    loading: {
      type: [Boolean, String],
      default: false,
    },
    loadingText: {
      type: String,
      default: "$vuetify.dataIterator.loadingText",
    },
    locale: {
      type: String,
      default: "en-US",
    },
    mobileBreakpoint: {
      type: [Number, String],
      default: 650,
    },
    multiSort: {
      type: Boolean,
      default: false,
    },
    mustSort: {
      type: Boolean,
      default: false,
    },
    noDataText: {
      type: String,
      default: "$vuetify.noDataText",
    },
    noResultsText: {
      type: String,
      default: "$vuetify.dataIterator.noResultsText",
    },
    options: {
      type: Object,
      default: () => ({
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false,
      }),
    },
    page: {
      type: Number,
      default: 1,
    },
    search: {
      type: String,
      default: "",
    },
    selectableKey: {
      type: String,
      default: "isSelectable",
    },
    serverItemsLength: {
      type: Number,
      default: -1,
    },
    showExpand: {
      type: Boolean,
      default: false,
    },
    showGroupBy: {
      type: Boolean,
      default: false,
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
    singleExpand: {
      type: Boolean,
      default: false,
    },
    singleSelect: {
      type: Boolean,
      default: false,
    },
    sortBy: {
      type: [String, Array],
      default: undefined,
    },
    sortDesc: {
      type: [Boolean, Array],
      default: undefined,
    },
    value: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    consultClick(item: any) {
      this.$emit("consultClick", item);
    },
    editClick(item: any) {
      this.$emit("editClick", item);
    },
    deleteClick(item: any) {
      this.$emit("deleteClick", item);
    },
  },
});
</script>
