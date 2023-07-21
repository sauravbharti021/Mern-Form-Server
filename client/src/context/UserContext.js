import React, {  useContext, useEffect, useState } from "react"

const UserContext = React.createContext()

export function UserAuth(){
    return useContext(UserContext);
}
let present= false

export function UserProvider ({children}){
    const [currentUser, setCurrentUser]=useState(false)


    async function isAuth(){
        try{

            const res= await fetch('/getData', {
                method:'get',
                headers:{
                    Accept: "application/json",
                    "content-type" : "application/json"
                },
                // credentials:"include"
              })
        
              const data= await res.json()
              if(res.status!=200){
                throw new Error(res.error);
              }else{
                setCurrentUser(true)
              }

        }catch(error){
            setCurrentUser(false)
        }
    }
    
    useEffect(()=>{
        isAuth()
    },[])
    
    
    function loginUser(){
        setCurrentUser(true)
    }
    function logoutUser(){
        setCurrentUser(false);
    }
    const value={
        currentUser,
        loginUser,
        logoutUser
    }

    return <UserContext.Provider value={value}>{ children}</UserContext.Provider>
}