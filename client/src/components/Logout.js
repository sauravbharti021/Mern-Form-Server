import React, { useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { UserAuth } from '../context/UserContext'

export default function Logout() {
    const navigate= useNavigate()
    const {logoutUser} = UserAuth()

    useEffect(()=>{
        fetch('/logout',{
            method:"get",
            headers:{
                Accept: "application/json",
                "content-type" : "application/json"
            },
            credentials:'include'
        }).then((res)=>{
            if(res.status!==200) 
            {throw new Error(res.error);}
            logoutUser()
            navigate('/login')
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    return (
        <div>Logout</div>
    )
}
