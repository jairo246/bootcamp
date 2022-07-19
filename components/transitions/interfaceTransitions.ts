import {FoodList} from '../menu/interfaceMenu'

export interface Full{
    listFull: FoodList
    open: boolean
    setOpen(open:boolean): void
  }

  export interface Send{
    open: boolean
    setOpen(open:boolean): void
  }