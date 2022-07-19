export interface Food {
    id: number,
    name: string,
    price: string,
    description: string,
    img: string,
    tags?: Array<string> 
}

export interface FoodList{
  list: Array<Food>
  name: string
}

export interface ShowFood extends FoodList{
  setOpen(open:boolean): void
  setListFull(listFull:FoodList): void
}

export interface MenuFood{
  entradas: Array<Food>
  ensaladas: Array<Food>
  sandwichs: Array<Food>
  fondo: Array<Food>
  agregados: Array<Food>
  postres: Array<Food>
  jugosBebidas: Array<Food>
}