import { Context } from "@nuxt/types"
import { BuildWiseError, MessageCode } from "~/utils/interfaces/validation"

export default function ({ $axios, $toast, redirect } : Context) {
    $axios.onRequest((config) => {
      console.log('Making request to ' + config.url)
    })
  
//     $axios.onError(error => {
//         if(error.response !== undefined){
// //        const code = (error.response && error.response.status)
//         if (error.response.status) {
//           redirect('/')
//         }
//     }
//       })
    $axios.onError((error) => {
    const errorCode = error.code || ''
    if (errorCode.at(0) === '5') {
      $toast.error(error.message, {
        singleton: true,
        className: 'error-toast',
        duration: 7000,
      })
    }
    return Promise.reject(error)
    })  
      $axios.onResponseError((error) => {
        const errorTyped = error.response?.data as BuildWiseError
        // add interface to error response
    
        // if (errorTyped.messageCode === MessageCode.ME0400) {
        //   const firstErrorCode = errorTyped.validationErrors![0].errorCode || '0'
        //   switch (firstErrorCode) {           
        //     case ErrorCode.ME0119:
         
        //     default:
        //       break
        //   }
        // }  
        
        if (errorTyped.message) {
          $toast.error(errorTyped.validationErrors![0].message, {
            position: 'top-right',
            singleton: true,
            className: 'error-toast',
            duration: 10000,
          })
        }     
        return Promise.reject(error)
      })    
  }