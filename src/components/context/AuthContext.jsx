import { useState,  useContext, createContext } from "react";

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider(props) {
   const [authUser,setAuthuser] = useState(null)
   const [isLoggedIn,setIsLoggedIn] = useState(false)

   const value = {
    authUser,
    setAuthuser,
    isLoggedIn,
    setIsLoggedIn
   }

   return(
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
   )
}