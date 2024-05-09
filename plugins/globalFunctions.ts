import { Context, Plugin } from '@nuxt/types'

interface globalFunctions {
    errorAlert: (message: string, durationMs?: number) => void
    attentionAlert: (message: string, durationMs?: number) => void
    successAlert: (message: string, durationMs?: number) => void
  }

  declare module 'vue/types/vue' {
    interface Vue {
      $globalFunctions: globalFunctions
    }
  }

  const globalFunctionsPlugin: Plugin = (context: Context, inject) => {
    const allFunctions: globalFunctions = {
          
      errorAlert: (message: string, durationMs: number = 5000) => {
        context.$toast.error(message, {
          position: 'top-right',
          singleton: true,
          className: 'error-toast',
          duration: durationMs,
        })
      },
      successAlert: (message: string, durationMs: number = 5000) => {
        context.$toast.success(message, {
          position: 'top-right',
          singleton: true,
          className: 'success-toast',
          duration: durationMs,
        })
      },
      attentionAlert: (message: string, durationMs: number = 5000) => {
        context.$toast.show(message, {
          position: 'top-right',
          singleton: true,
          className: 'alert-toast',
          duration: durationMs,
        })
      },     
    }
    inject('globalFunctions', allFunctions)
  }
  
  export default globalFunctionsPlugin