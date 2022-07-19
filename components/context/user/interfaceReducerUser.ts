

export interface Provider {
    children: JSX.Element | JSX.Element[]
}

export interface Context {
    name: string
    role: string
    accessToken: string
    tokenType: string
    img: string
}

type UserAction = 
    | {type: 'token',payload: string}

export const UserReducer = (state:Context, action: UserAction) => {

    switch(action.type){
        case 'token':
            return{
                ...state,
                accessToken: action.payload                
            }
        default:
            return state;
    }
}