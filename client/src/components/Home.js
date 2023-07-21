import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const[username, setUsername]= useState()
  const navigate= useNavigate()

  async function callUpdateHome(){
    try{
      const res= await fetch('/home', {
        method:'get',
        headers:{
          "content-type" : "application/json"
        }
      })

      const data= await res.json()
      setUsername(data.name);

      if(res.status!==200){
        throw new Error(res.error);
      }

    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    callUpdateHome()
  },[])

  return (
    <>  
      <div className='d-flex flex-column align-items-center text-center justify-content-center' style={{ height:"80vh", width:"100%"}}>

      {

        username? 
        <div>
          <p className="pt-5">Welcome</p>
          <h2 className='text-danger'>{username }</h2>
          <h1>We are the champions</h1>
        </div>
        :
        <div>
            <h1>No one is here to be welcomed</h1>
            <h2>Kindly login please.</h2>
        </div>
      }
        

      </div>
    
    </>
  )
}
