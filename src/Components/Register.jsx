import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";

const url="localhost3010"
const registerUrl="/auth/register"
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZTFlZDYyOS0xYmY1LTRiMWEtYjVkMi05YTc4MWY4NGZiZTciLCJpYXQiOjE3MDgwODU0MjUsImV4cCI6MTcwODY5MDIyNX0.Oroj961bXSqaSqE0ooJpP5bwpikQkfTpBKrDBO9eAaM";

const Register=()=>{

    const [registerPayload,setRegisterPayload]= useState({
        nome:"",
        cognome:"",
        email:"",
        password:""
    })

    const register=()=>{
        fetch(url+registerUrl,
           {   
               authorization: "bearer "+token,
               method:"POST",
               body:JSON.stringify(registerPayload)
           })
           
            .then((response)=>{
                if(response.ok){
                   console.log(response.json())
                   const data=response.json()
                   console.log(data)
                }else throw new Error()
            })
            .catch((error)=>{
               alert("errore nella fetch di registrazione "+error)
            })
    }

    return(
        <>

            <Form id="registerForm" className="w-100 d-flex flex-column justify-content-center align-items-center" onSubmit={(e)=>{
                e.preventDefault()
                register()}}>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control className="border border-2 border-success" type="text" placeholder="nome" required 
                onChange={(e)=>{
                    setRegisterPayload({
                        ...registerPayload,
                        nome:e.target.value
                    })
                }} />
                </Form.Group>
                </div>
                <div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control className="border border-2 border-success" type="text" placeholder="cognome" required
                onChange={(e)=>{
                    setRegisterPayload({
                        ...registerPayload,
                        cognome:e.target.value
                    })
                }} />
                </Form.Group>
                </div>
                <div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control className="border border-2 border-success" type="email" placeholder="email" required
                onChange={(e)=>{
                    setRegisterPayload({
                        ...registerPayload,
                        email:e.target.value
                    })
                }} />
                </Form.Group>
                </div>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control className="border border-2 border-success" type="text" placeholder="password" required 
                onChange={(e)=>{
                    setRegisterPayload({
                        ...registerPayload,
                        password:e.target.value
                    })
                }} />
                </Form.Group>
                </div>
                <Button type="submit" className="primary">registrati</Button>
                <p>sei gia registrato? <Link className="text-primary" to={"/"}>login!</Link></p>


            </Form>
        </>
    )
}

export default Register