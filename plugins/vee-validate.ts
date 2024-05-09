/* eslint-disable camelcase */
import Vue from 'vue'
import {
  localize,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
  extend,
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { confirmed } from 'vee-validate/dist/rules'
import {
  abovezero
} from '~/utils/validations/validations'

// localize({
//   ptBR
// })

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  })
}
extend('confirmed', { ...confirmed, message: 'Valor de confirmação diferente do inserido' })

extend('abovezero', { ...abovezero, message: 'Precisa ser maior que 0' })



setInteractionMode('eager')

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

