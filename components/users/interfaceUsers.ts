export interface User{
    id: number,
    name: string,
    username: string,
    birthday: number,
    email: string,
    phone: string,
    roles: string,
    img: string
  }

export interface UsersList{
    list: Array<User>
    name: string
  }
  
export interface Users {
  admin: Array<User>
  waiter: Array<User>
  }