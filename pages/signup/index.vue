<template>
    <div>   
 <v-card outlined>    
    <v-row no-gutters class="mt-5 mr-4 ml-4">
        <v-col cols="12">
            <v-text-field
            v-model="email"
            outlined
            label="Nome completo"
            placeholder="Nome completo">

            </v-text-field>
        </v-col>
    </v-row>
    <v-row no-gutters class="mr-4 ml-4">
        <v-col cols="12">
            <v-text-field
            v-model="password"
            label="CNPJ"
            placeholder="00.000.000-00"
            outlined
            >                
            </v-text-field>
        </v-col>       
    </v-row>
     <v-row no-gutters class="mr-4 ml-4">
        <v-col cols="12">
            <v-text-field
            v-model="email"
            outlined
            label="Email"
            placeholder="Email">

            </v-text-field>
        </v-col>
    </v-row>   
       <v-row no-gutters  class="mr-4 ml-4 mb-5">
        <v-col cols="12">
            <v-btn class="fill-space"            
            color="primary"
            @click="signup">
                Enviar
            </v-btn>
        </v-col>
    </v-row>
 </v-card>
</div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  layout: "auth",
  data() {
    return {
      email: '',
      password:''
    }
  },
  methods: {
    signup(){
           this.$router.push('/signup')
    },
    login(){
      if(this.email === ''){
        this.$globalFunctions.attentionAlert('Email é obrigatório')
      }else if(this.password === ''){
        this.$globalFunctions.attentionAlert('Senha é obrigatório')
      }else if(this.email === '' && this.password === ''){
        this.$globalFunctions.attentionAlert('Email e senha são obrigatórios')
      }else{
      this.$router.push('/menu')
    }
    }
  }
})
</script>

<style>
.fill-space {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>