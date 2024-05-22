<template>
    <div>
    <v-row justify="center">
        <v-col cols="auto">
          <v-img
            :src="require('~/assets/eaa743a9-ced5-48cc-8b1b-8764b1ad3d88.jpeg')"
            contain
            max-height="150"
            max-width="300"
            width="100%"
            height="100%"
            style=""
          ></v-img>
        </v-col>
    </v-row>
 <v-card outlined>    
    <v-row no-gutters class="mt-5 mr-4 ml-4">
        <v-col cols="12">
            <v-text-field
            v-model="email"
            outlined
            placeholder="Digite o email">

            </v-text-field>
        </v-col>
    </v-row>
    <v-row no-gutters class="mr-4 ml-4">
        <v-col cols="12">
            <v-text-field
            v-model="password"
            placeholder="Digite a senha"
            outlined
            >                
            </v-text-field>
        </v-col>
    </v-row>
    <v-row no-gutters  class="mr-4 ml-4 mb-5">
        <v-col cols="12">
            <v-btn class="fill-space"
            color="primary"
            @click="login">
                Entrar
            </v-btn>
        </v-col>
    </v-row>
       <v-row no-gutters  class="mr-4 ml-4 mb-5">
        <v-col cols="12">
            <v-btn class="fill-space"
            outlined
            color="primary"
            @click="login">
                Cadastrar-se
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
    login(){
      if(this.email === ''){
        this.$globalFunctions.attentionAlert('Email é obrigatório')
      }else if(this.password === ''){
        this.$globalFunctions.attentionAlert('Senha é obrigatório')
      }else if(this.email === '' && this.password === ''){
        this.$globalFunctions.attentionAlert('Email e senha são obrigatórios')
      }else{
      this.$router.push('/')
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