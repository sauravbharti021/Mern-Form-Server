import React from 'react'
import { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from '../context/UserContext'


export default function Login() {

  const [user, setUser]= useState({
    email:"",
    password:""
  })

  const emailRef= useRef()
  const  passwordRef = useRef()
  const [error, setError] = useState('')
  const navigate= useNavigate()

  const {loginUser} = UserAuth()

  async function changeHandler(e){
    e.preventDefault()

    const {name, value}= e.target
    setUser(user =>({
      ... user,
      [name]: value
    })
    )
  }

  async function handleSummit(e){
    e.preventDefault();
    const {email, password} = user;

    try{

      const res=  await fetch('/login', {
          method:"post",
          headers:{
            "content-type": "application/json",
  
          },
          body: JSON.stringify({
            email: email, password: password
          })
      })
  
      const data = await res.json();

      if(res.status===400 || !data){
        throw new Error(res.error)
      }else if(res.status===422){
        throw new Error(res.error);
      }else{
        window.alert('Success')
        loginUser()
        navigate('/')
      }
    }catch(error){
        window.alert("Invalid credentials")
        console.log(error)
    }
  }

  return (
    <>  
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "70vh"}}>

        <Card className="w-100 bg-info" style={{maxWidth: "400px"}}>
            <Card.Body>
                <h2 className="text-center mb-2"> Log In</h2>
                
                {error && <Alert variant='danger'>{error}</Alert>}

                <Form onSubmit={handleSummit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={user.email} type="email" onChange={changeHandler}  ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" vaue={user.password} type="password" onChange={changeHandler} ref={passwordRef} required />
                    </Form.Group>
                    <Button className="w-100"  type="submit" >Log In</Button>
                </Form>
                <div className='w-100 text-center mt-2'>
                    Need an account? <Link to="/register">Register </Link>
                </div>
                
            </Card.Body>
        </Card>
      </Container>
    </>
  )
}
