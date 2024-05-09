<template>
    <v-dialog
      v-model="showDialog"
      scrollable
      persistent
      no-click-animation
      max-width="80%"
      transition="dialog-transition"
      style="z-index: 99999"
    >
      <v-card flat min-height="550px" width="100%">
        <v-card-title
          primary-title
          class="pt-2 pb-1 pr-2 no-print"
          style="border-bottom: thin solid grey"
        >
          <v-row no-gutters align="center">
            <v-col cols="auto" style="max-width: 50% !important">
              <h3 class="headline mb-0">{{ title }}</h3>
              <div>{{ subtitle }}</div>
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="auto" class="ml-15">
              <v-icon large @click="closeDialog"> mdi-close </v-icon>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="ma-0 pa-0">
          <client-only>
            <!-- loading indicator, rendered on server-side -->
            <div v-if="pdfFile" class="embed-container">
              <embed :src="pdfFile" />
            </div>
            <v-row
              v-else
              class="fill-height"
              no-gutters
              align="center"
              justify="center"
            >
              <v-col>
                <v-row justify="center" class="pa-0 mx-5">
                  <v-col cols="auto">
                    <v-progress-circular
                      indeterminate
                      width="7"
                      size="100"
                      color="primary"
                    ></v-progress-circular>
                  </v-col>
                </v-row>
                <v-row justify="center" class="pa-0 mx-5">
                  <v-col cols="auto">
                    <div class="d-flex justify-center text-h4">
                      {{ 'Gerando pdf' }}
                    </div>
                    <div class="d-flex justify-center text-h5">
                        {{ 'Aguarde..' }}
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </client-only>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  <script lang="ts">
  import Vue from 'vue'
  
  export default Vue.extend({
    model: {
      prop: 'model',
      event: 'input',
    },
    props: {
      model: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        required: false,
        default: '',
      },
      subtitle: {
        type: String,
        required: false,
        default: '',
      },
      pdfFile: {
        type: String,
        // type: Object as PropType<Blob>,
        required: false,
        default: undefined,
      },
    },
    data() {
      return {
      }
    },
    computed: {
      showDialog: {
        get(): boolean {
          return this.model
        },
        set(val: boolean) {
          this.$emit('input', val)
        },
      },
      // pdfBlob(): Blob {
      //   return this.pdfFile
      // },
    },
    watch: {},
    methods: {
      closeDialog() {
        this.showDialog = false
        this.removeFile()
        this.$emit('afterClose')
      },
      removeFile() {
        this.$emit('update:pdfFile', undefined)
      },
    },
  })
  </script>
  <style lang="scss">
  // I dont know why this behaves like this
  // https://help.issuu.com/hc/en-us/articles/5772756733083-Resizing-Embeds-To-Be-Responsive
  .embed-container {
    position: relative;
    // height: ;
    padding-bottom: 48%; /* set the aspect ratio here as (height / width) * 100% */
  
    height: 90%;
  
    overflow: hidden;
  
    max-width: 100%;
  }
  
  .embed-container embed {
    position: absolute;
  
    top: 0;
  
    left: 0;
  
    width: 100%;
  
    height: 100%;
  }
  </style>
  