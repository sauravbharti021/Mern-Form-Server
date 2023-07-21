import React from 'react'
import { Container, Card, Form, Alert, Button } from 'react-bootstrap'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Contact() {
  const [user,setUser]= useState({
    email: "",
    phone: "",
    address: "",
    message: ""
  })
  const [owner, setOwner]= useState({})
  const navigate= useNavigate()

  function handleChange(e){
    e.preventDefault()
    const{name, value} = e.target
    setUser(user=>({
      ...user, [name] : value
    }))
  }

  async function handleSummit(e){
    e.preventDefault();
    const { email, phone, message, address}= user

    const res = await fetch('/contact', {
        method:'post',
        headers:{
          "Content-type" : "application/json"
        },
        body: JSON.stringify({
            phone, email, message, address
        })
    })
    const data= await res.json()

    if(!data){
      console.error("Data not sent.")
    }else{
      window.alert('Message sent')
      setUser({...user, email: "", phone:"", message:"", address:""})
    }


  }

  async function getData(){
    try{

      const res= await fetch('/getData', {
          method:'get',
          headers:{
              Accept: "application/json",
              "content-type" : "application/json"
          },
          credentials:"include"
        })
  
        const data= await res.json()
        setOwner(data);
        if(res.status!=200){
          throw new Error(res.error);
        }

    }catch(error){
        console.log(error)
        navigate('/login')

    }
  }
  useEffect(()=>{
    getData()
  },[])



  return (
    <>
      <Container className= "d-flex justify-content-around mt-5">
        <div className='phone' style={{border:"2px solid black", minHeight:"15vh", minWidth:"33%"}} >
          <div>Phone</div>
          <div className='overflow-auto pt-3'>{owner.phone}</div>
        </div>

        <div className='email' style={{border:"2px solid black", minHeight:"15vh", minWidth:"33%"}} >
          <div>Email</div>
          <div className='overflow-auto pt-3'>{owner.email}</div>
        </div>
        <div className='address' style={{border:"2px solid black", minHeight:"15vh" ,minWidth:"33%"}} >
          <div>Address</div>
          <div className='overflow-auto pb-3 pt-3'  >
            {owner.address}
          </div>
        </div>
      </Container>



      <Container>
      <Card>
            <Card.Body>
                <h2 className="text-center mb-2"> Message Me</h2>
                

                <Form onSubmit={handleSummit}>
                    <Form.Group id='phone'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control name="phone" type="number"  value={user.phone} required  onChange={handleChange} placeholder="Write your phone." />
                    </Form.Group>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" value={user.email}  required  onChange={handleChange} placeholder="Write your email."  />
                    </Form.Group>
                    <Form.Group id='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address" type="text" value={user.address} required onChange={handleChange} placeholder="Write your address." />
                    </Form.Group>
                    <Form.Group id='message' >
                        <Form.Label >Message</Form.Label>
                        <Form.Control as="textarea" name="message" value={user.message} required onChange={handleChange}  placeholder="Write your Message." rows={3}/>
                    </Form.Group>

                    <Button className="w-100 mt-2" type="submit" >Send</Button>
                </Form>

            </Card.Body>
        </Card>

      </Container>
    </>
  )
}
