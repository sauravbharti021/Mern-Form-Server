import React, { useState, useEffect} from 'react'
import { Container, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export default function About() {
  const [user, setUser ] = useState({})
  
  const navigate= useNavigate()
  
  async function callAboutPage(){
    try{
        const res= await fetch('/about',{
            method:'get',
            headers:{
              Accept: "application/json" ,
              "content-type" : "application/json"
            },
            credentials: 'include'
            
          })
          const data = await res.json();
          setUser(data)
          // console.log(data);
          if(res.status!==200 ){
            console.log('errr');
            throw new Error(res.error)
            
          }
          
        }catch(error){
          console.log(error)
          navigate('/login')
        }
        
      }

      useEffect(()=>{
          callAboutPage();
    
      },[])
      
      return (
      <>
        <Container  style={{maxWidth:'70vw'}}>
          <h2 className="text-center mb-2">About</h2>
          <Card className='bg-secondary'>
            <Card.Body>
              <ul>UserId : {user._id}</ul>
            </Card.Body>
          </Card>
          <Card className='bg-secondary'>
            <Card.Body>
              <ul>Name : {user.name}</ul>
            </Card.Body>
          </Card>
          <Card className='bg-secondary'>
            <Card.Body >
              <ul>Phone : {user.phone}</ul>
            </Card.Body>
          </Card>
          <Card className='bg-secondary'>
            <Card.Body>
              <ul>Address : {user.address}</ul>
            </Card.Body>
          </Card>
          <Card className='bg-secondary'>
            <Card.Body>
              <ul>Email : {user.email}</ul>
            </Card.Body>
          </Card>
          <Card className="bg-secondary">
            <Card.Body>
              <ul>Work : {user.work}</ul>
            </Card.Body>
          </Card>
        </Container>
      </>
  )
}
