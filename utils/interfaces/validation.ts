export interface IValidationError {
    errorCode: string
    message: string
    propertyName: string
    attemptedValue: string
  }
  export enum MessageCode {
    ME0400 = 'ME0400',
  }
  export interface ValidationError {
    errorCode: string
    message: string
    parameters: any[]
    propertyName: string
    customState?: any
    attemptedValue?: any
  }
  
  export interface BuildWiseError {
    message: string
    messageCode: MessageCode
    parameters: any[]
    validationErrors?: ValidationError[]
  }
