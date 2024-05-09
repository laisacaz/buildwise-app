export const required = (propertyType: string, customErrorMessage?: string) => {
    return (v: string) =>
      (v && v.length > 0) || customErrorMessage || `${propertyType} é requerido`
  }
  const minLength = (propertyType: string, minLength: number) => {
    return (v: string) => {
      if (!v) {
        return true
      }
  
      return (
        v.length >= minLength ||
        `${propertyType} deve ter no minimo ${minLength} caracteres`
      )
    }
  }
  const maxLength = (propertyType: string, maxLength: number) => {
    return (v: string) =>
      (v && v.length <= maxLength) ||
      `${propertyType} deve ter no maximo ${maxLength} caracteres`
  }
  export const abovezero = {
    validate: (value: any) => {
      return value > 0
    },
  }

export default {
    required,
    minLength,
    maxLength,
    abovezero
  }