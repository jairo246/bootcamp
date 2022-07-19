import { createContext, useContext, ReactNode, useState, useEffect } from "react";
// @ts-ignore

type AuthContext = {
    name: string
    role: string
    accessToken: string
    tokenType: string
    img: string
    try: number
    breck: boolean
    wait: number
    start: number
}

type AuthContextType = {
    auth: AuthContext;
    getStorage: () => void;
    setAuth(auth: AuthContext): void;
    lessWait: () => void;
    rigth(token:string, name:string, img:string, role:string): void;
    err: () => void;
    reset: () => void;
    logOut: () => void;
};

const initialState:AuthContext = {
    
    name: "",
    role: "",
    accessToken: "",
    tokenType: "Bearer",
    img: "",
    try: 0,
    breck: false,
    wait: 900,
    start: 0
};

const authContextDefaultValues: AuthContextType = {
    auth: initialState,
    getStorage() {},
    setAuth(auth) {},
    lessWait: () => {},
    rigth(token, name, img, role) {},
    err: () => {},
    reset: () => {},
    logOut: () => {}
};

export const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {

    const [auth, setAuthPre] = useState<AuthContext>(initialState);

    const getStorage = () =>{

        // @ts-ignore
        const try_ = JSON.parse(localStorage.getItem('try') || 0);
        // @ts-ignore
        const breck_ = JSON.parse(localStorage.getItem('breck') || false);
        // @ts-ignore
        const wait_ = JSON.parse(localStorage.getItem('wait') || 900);

        // @ts-ignore
        const name_ = JSON.parse(localStorage.getItem('name') || 0);
        // @ts-ignore
        const role_ = JSON.parse(localStorage.getItem('role') || false);
        // @ts-ignore
        const img_ = JSON.parse(localStorage.getItem('img') || 0);
        // @ts-ignore
        const token_ = JSON.parse(localStorage.getItem('token') || false);
        
        setAuthPre({...auth,
        breck: breck_,
        try: try_,
        name: name_,
        role: role_,
        img: img_,
        accessToken: token_,
        wait: wait_,
        start: 1});
    }         
    const setAuth = (value:AuthContext) => {

        try {          
            setAuthPre(value);

            localStorage.setItem('try',JSON.stringify(value.try));
            localStorage.setItem('breck',JSON.stringify(value.breck));

            localStorage.setItem('name',JSON.stringify(value.name));
            localStorage.setItem('role',JSON.stringify(value.role));
            localStorage.setItem('img',JSON.stringify(value.img));
            localStorage.setItem('token',JSON.stringify(value.accessToken));

        } catch (error) {  console.error(error) }

    }
    const lessWait = () => {

        setAuthPre({...auth, wait: auth.wait - 1});
        localStorage.setItem('wait',JSON.stringify(auth.wait - 1));
    }
    const err = () => {

        if(auth.try == 2){

            setAuth({...auth, try: 3, breck: true, wait: 900});
        }
        else{
            setAuth({...auth, try: auth.try + 1});
        }
    }
    const rigth = (token:string, name:string, img:string, role:string) => {
        setAuth({...auth, 
                accessToken: token,
                name: name, 
                img: img,
                role: role,
                try: 0,
                breck: true});

    }
    const reset = () => {

        setAuth({...auth, try: 0, breck: false, wait: 900});
    }
    const logOut = () => {
        
        setAuth({...auth, 
            accessToken: "",
            name: "", 
            img: "",
            role: "",
            try: 0,
            breck: false});
    }
    const value = {
        auth,
        getStorage,
        setAuth,
        lessWait,
        err,
        rigth,
        reset,
        logOut
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}