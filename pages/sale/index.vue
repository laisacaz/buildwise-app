  <template>    
    <div>  
      <PDF-Viewer
      v-model="showPdf"
      title="PDF"
      :pdf-file.sync="thePDFFileBlobRoute"></PDF-Viewer>    
      <pop-up-confirmation
        v-model="isDeleting"
        title="Deseja deletar venda?"
        color="red"
        @confirmClick="deleteSale">
    </pop-up-confirmation>    
      <v-row class="mt-4">
        <h1 class="ml-4">Pesquisa de vendas</h1>
      </v-row>
      <v-card
        class="mt-6 mb-6"
        outlined>
      <v-row class="ml-2 mt-2">
        <v-col cols="auto">
            <v-select
              style="max-width: 200px;"
              v-model="filters.searchType"
              label="Pesquisar por"
              :items="searchTypeItems"
              outlined
              dense
              hide-details        
            ></v-select>
        </v-col>
        <v-col cols="4">
            <v-text-field
              v-model="filters.search"
              clearable
              dense
              placeholder="Digite aqui"
              outlined
              @click:clear="clickClearSearch">
            </v-text-field>        
        </v-col>
        <v-col cols="auto">
          <v-btn
              @click="search"
              style="height: 40px"
              color="primary">
              <v-icon>
                mdi-magnify
              </v-icon>            
            </v-btn>
        </v-col>
        <v-col>
          <v-select
              style="max-width: 200px;"
              v-model="filters.status"
              label="Status"
              :items="statusItems"
              outlined
              dense
              clearable
              hide-details 
              @change="search"       
            ></v-select>
        </v-col>
        <v-col>
          <v-btn
              class="ml-8"
              @click="newRegister"
              color="primary">
              <v-icon color="black">
                mdi-plus
              </v-icon>
                Cadastrar 
            </v-btn>
        </v-col>
      </v-row>
    </v-card>
      <div>
          <v-data-table
          :headers="headers"
          :loading="isLoading"
          :items="fields.data"
          >
          <template  #[`item.edit`]="{ item }">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-icon
                  color="primary"
                  class="grid-icon"
                  v-bind="attrs"
                  v-on="on"
                  @click="editClick(item)"
                >
                  {{ item.status == EStatusSale.Open ? 'mdi-pencil' : 'mdi-magnify' }}
                </v-icon>
              </template>
              <span>{{  item.status == EStatusSale.Open ? 'Editar' : 'Consultar' }}</span>
            </v-tooltip>
        </template>
        <template  #[`item.printer`]="{ item }">
          <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                  <v-icon
                  v-if="item.status === EStatusSale.Finalized"
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="print(item.id)"                  
                  >
                  {{ 'mdi-printer' }}
                  </v-icon>
              </template>
          <span>{{ 'Imprimir'}}</span>
          </v-tooltip>
          </template>
          <template  #[`item.delete`]="{ item }">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-icon
                  color="red"
                  v-bind="attrs"
                  v-on="on"
                  @click="deleteClick(item)"
                >
                  {{ 'mdi-delete' }}
                </v-icon>
              </template>
              <span>{{ 'Deletar'}}</span>
            </v-tooltip>
          </template>   
          <template #[`item.createdAt`]="{ item }">
            <span>
              {{                       
                  $moment(item.createdAt, true).format('DD/MM/YYYY')
              }}
            </span>
          </template>    
          <template v-slot:no-data>
            <v-alert :value="true">
              Nenhuma venda encontrada
            </v-alert>
          </template>                     
          </v-data-table>
          </div>
      </div>
  </template>
  <script lang="ts">
  
  import Vue from 'vue'
  import { ESaleSearchType, EStatusSale } from '~/utils/enumerators/enum';
  import { ISaleSearchParams, ISaleSearchResponse, defaultSearchResponse } from '~/utils/interfaces/crudObjects';
  
  export default Vue.extend({
    data() {
      return {
          ESaleSearchType,
          EStatusSale,
          itemIdToDelete: 0,
          isLoading: false,
          showPdf: false,
          thePDFFileBlobRoute: undefined as string | undefined,
          isDeleting: false,
          searchTypeItems:[
          {
            text: "Código",
            value: ESaleSearchType.Id
          },
          {
            text: "Nome cliente",
            value: ESaleSearchType.ClientName
          }
          ],
          statusItems: [
          {
            text: "Em aberto",
            value: EStatusSale.Open
          },
          {
            text: "Finalizado",
            value: EStatusSale.Finalized
          },
          ],
          headers: [
              {
                  text: 'Código',
                  value: 'id',
                  width: 100
              },
              {
                  text: 'Nome',
                  value: 'clientName',
                  width: '40%'
              },
              {
                  text: 'Status',
                  value: 'statusDescription',
                  width: 145,
                  sortable: false,
              },
              {
                  text: 'Data cadastro',
                  value: 'createdAt',
                  width: 140
              },
              {
                  text: 'Total',
                  value: 'total',
                  align: 'end',
                  width: 100
              },
              { text: ' ', value: 'edit', sortable: false, width: 80, align: 'center' },
              { text: ' ', value: 'printer', sortable: false, width: 80, align: 'center' },
              { text: ' ', value: 'delete', sortable: false, width: 80, align: 'center'  }
          ],
          filters: {
              search: "",
              searchType: ESaleSearchType.ClientName
          } as ISaleSearchParams,
          fields: {} as defaultSearchResponse<ISaleSearchResponse>        
      }
  },
  created(){
  this.search()
  },
  methods: {
      async search(){
        if(this.filters.searchType == ESaleSearchType.Id){
        if(this.filters.search){
          this.filters.id = parseInt(this.filters.search)
        }else{
          this.filters.search = ""
          this.filters.id = 0      
        }
      }

      await this.$axios
        .get<defaultSearchResponse<ISaleSearchResponse>>('/sale/search', {
          params: {
            id: this.filters.id,
            search: this.filters.search,
            searchType: this.filters.searchType,
            status: this.filters.status
          }
        })
      .then((response) => {
        this.fields = response.data
        
      })
      .catch(function (error) {
        console.log(error);
      })
      },
      clickClearSearch(){
        this.filters.search = ""
        this.filters.id = 0
        this.search()
      },
      editClick(item: any) {
      this.$router.push({ path: `${this.$route.path}/${item.id}` })
    },
      deleteClick(item: any){      
        this.itemIdToDelete = item.id
        this.isDeleting = true
      },
      async deleteSale()
      {
        await this.$axios
          .put('/sale/delete/' + this.itemIdToDelete, {    
            headers: { 'content-type': 'application/json'}
          })
        .then(() => {
          this.$globalFunctions.successAlert('Venda deletada com sucesso', 5000)
          this.search()
        })
        .catch(function (error) {
          console.log(error);
        })
    },
      newRegister(){
        this.$router.push('/sale/_id')
      },
      async print(id: number){
        this.showPdf = true
        const responseType = 'blob'

        await this.$axios.get<Blob>('/sale/report/' + id, {
        responseType: responseType,
      })      
          .then((res) => {              
              this.thePDFFileBlobRoute = window.URL.createObjectURL(res.data)               
          })
          .catch((error) => {
              console.log(error);
          })
      }
      
  }
  })
  </script>
  <style>
  .table.v-table thead th {
        font-size: 20px !important;
  }
  </style>