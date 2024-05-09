import  { EConstructionSearchType, EPersonSearchType, EProductSearchType, ESaleReceivementMethod, ESaleSearchType, EStatusConstruction, EStatusSale } from '../enumerators/enum'

//SEARCH
export interface defaultSearchResponse<reponseObjectType = any> {
    data: Array<reponseObjectType>
    pageNumber?: number
    pageSize?: number
    totalPages?: number
    totalRecords?: number
    firstPageUri?: string
    lastPageUri?: string
    nextPageUri?: string
    previousPageUri?: string
  }
  
export interface IProductSearchParams {
    search?: string
    searchType: EProductSearchType,
    pageNumber: number
    pageSize: number
}
export interface IProductSearchResponse {
    id: number,
    description: string,
    reference: string,
    stockQuantity: number,
    price: number
    selectedBtn?: boolean  
}
export interface IPersonSearchParams {
    searchType: EPersonSearchType 
    search?: string
    id?: number
    
}
export interface IPersonSearchResponse {
    id: number
    name: string,
    identityNumber?: string
}
export interface IConstructionSearchParams{
    id?: number
    status?: EStatusConstruction
    searchType: EConstructionSearchType
    search?: string
}
export interface IConstructionSearchResponse{
    id: number
    createdAt: string
    status: EStatusConstruction
    clientName: string
    selectedBtn?: boolean 
    statusDescription: string
}
export interface ISaleSearchParams{
    id?: number
    status?: EStatusSale
    searchType: ESaleSearchType
    search?: string
    total: number
}
export interface ISaleSearchResponse{
    id: number
    createdAt: string
    status: ESaleSearchType
    clientName: string
    total: number
    statusDescription: string
}

export interface IReportSaleByPeriodParams{
    startDate: string,
    endDate: string
}
//INSERT

export interface IProduct {
    id?: number
    description: string
    reference: string
    stockQuantity: number
    barCode?: string
    price: number
    cost?: number
}
export interface ISimpleProduct{
    productId: number
    stockQuantity: number
}
export interface IProductSale{
    productId: number
    stockQuantitySale: number
    reference: string
    description: string
    price: number
}
export interface IPerson {
    id?: number
    name: string
    identityNumber?: string
    socialSecurityNumber?: string
    cellphone?: string
    address: IAddress    
}
export interface ISimplePerson {
    id: number
    name: string    
    status: boolean
}
export interface IAddress {
    id?: number
    zipCode: string
    state: string
    city: string
    street?: string
    streetNumber: string
    district: string
}
export interface IConstruction {
    client: ISimplePerson
    id?: number
    clientId?: number
    observation?: string
    address: IAddress
    status: EStatusConstruction
}
export interface ISale {
    id?: number
    clientId: number
    sellerId: number
    constructionId?: number
    products: ISimpleProduct []
    receivementMethod?: ESaleReceivementMethod
    discount?: number
    increase?: number
    observation?: string
    statusDescription: string
    status: EStatusSale
    createdAt?: string
    finalizedAt?: string
    paidAmount?: number
    total?: number
    subtotal: number
}
export interface IFinishSale {
    receivementMethod?: ESaleReceivementMethod
    discount?: number
    increase?: number
    paidAmount?: number
    total?: number
    subtotal?: number
}

export interface ISaleById{
    sale: ISale
    client: ISimplePerson
    seller: ISimplePerson
    products: IProductSale []
    construction?: IConstruction
}