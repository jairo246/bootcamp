import {Food} from '../menu/interfaceMenu'

export interface FoodRequest{
    product: number,
    quantity: number
  }
  
  export interface OrderRequest {
    id:number,
    created_at: number,
    waiter: number,
    table: number,
    order: Array<FoodRequest>
  }
  
  export interface FoodOrder extends Food{
    quantity: number
  }
  
  export interface Order {
    id:number,
    created_at: number,
    waiter: string,
    table: string,
    available: boolean,
    order: Array<FoodOrder>
  }
  
  export interface OrderList {
    list: Array<Order>
  }