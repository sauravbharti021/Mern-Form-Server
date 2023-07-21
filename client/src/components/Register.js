import React, { useState } from 'react'
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const emailRef= useRef()
  const passwordRef= useRef()
  const passwordConfirmRef= useRef()
  const [error, setError]= useState('')
  const navigate= useNavigate()

  const [user, setUser ] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    phone:"",
    work:"",
    address:""
  })

  function handleChange(e){
    e.preventDefault()
    const {name, value} = e.target
    setUser(user=>({
      ...user,
      [name]: value
    }))
    
  }
  
  async function handleSummit(e){
    e.preventDefault()

    const {name, email, password, confirmPassword, phone, work, address} = user;

    const res= await fetch("/register", {
        method:'post',
        headers:{
          "Content-type" : "application/json"
        },
        body: JSON.stringify({
          name, email, password, confirmPassword, phone, work, address
        })

    })

    const data = await res.json();
    if(data.status===400 || !data){
        window.alert("Invalid inputs")
        console.log("Invalid data")
    }else if(data.status===422){
        window.alert("Email already registered")
        console.log("Email already registered")
    }
    else{
      window.alert("Success")
      console.log("Success")
      navigate('/login')
    }
  }


  return (
    <>
    <Container className="d-flex align-items-center justify-content-center"
       >
      <Card className="w-100 bg-info" style={{maxWidth: "400px"}}>
            <Card.Body> 
                <h2 className="text-center mb-2"> Sign Up</h2>
                
                {error && <Alert variant='danger'>{error}</Alert>}

                <Form onSubmit={handleSummit} method='post' >
                    <Form.Group id='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" value={user.name} type="text"  onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={user.email} type="email" onChange={handleChange} ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" value={user.password} type="password" onChange={handleChange} ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id='password-confirm'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control name="confirmPassword" value={user.confirmPassword} type="password" onChange={handleChange} ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Form.Group id='phone'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control name="phone" value={user.phone} type="number" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group id='work'>
                        <Form.Label>Work</Form.Label>
                        <Form.Control name="work" value={user.work} type="text" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group id='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address" value={user.address} type="text" onChange={handleChange} required />
                    </Form.Group>

                    <Button  className="w-100 mt-3" type="submit" >Sign Up</Button>
                </Form>

            </Card.Body>
      </Card>
    </Container>
      <div className='w-100 text-center'>
          Already have an account? <Link to="/login">Log In </Link>
      </div>
    </>
  )
}
