import { useState } from "react";
import { AuthContext } from "./userContext";

const UseLocalStorage = (key:string, initialValue:string | number) => {
    
    const [storedValue, setStoredValue] = useState(() => {
        try {
            
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue

        } catch (error) {

            return initialValue;
            
        }
    });
    
    const setValue = (value:string | number) => {

        try {
            
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));

        } catch (error) {

            console.error(error);
            
        }

    }


return[storedValue,setValue];

}
export default  UseLocalStorage;