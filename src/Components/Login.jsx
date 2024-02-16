import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const token="token here"
const Login=()=>{
const url="localhost3010"
const loginUrl="/auth/login"
const navigate = useNavigate()

const [loginPayload,SetLoginPayload]=useState({
    email:"",
    password:""
});
     const login=()=>{
         fetch(url+loginUrl,
            {   authorization: "bearer "+token,
                method:"POST",
                body:JSON.stringify(loginPayload)
            })
            
             .then((response)=>{
                 if(response.ok){
                    console.log(response.json())
                    const data=response.json()
                    console.log(data)
                 }else throw new Error()
             })
             .catch((error)=>{
                alert("errore nella fetch di login "+error)
             })
     }

    return(
        <>
            <Form className="d-flex flex-column align-items-center justify-content-center" id="loginForm" onSubmit={(e)=>{
                e.preventDefault()
                login()}}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex justify-content-center">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control className="border border-2 border-success" type="Email" required placeholder="inserisci un'email" name="email"
                        onChange={(e)=>{
                            SetLoginPayload({
                                ...loginPayload,
                                email:e.target.value
                            })
                        }} />
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-center">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control className="border border-2 border-success" type="text" required placeholder="password"  name="email"
                        onChange={(e)=>{
                            SetLoginPayload({
                                ...loginPayload,
                                password:e.target.value
                            })
                        }} />
                        </Form.Group>
                    </div>
                    <Button type="submit" className=" success">Login</Button>
                    <p>non sei registrato? <Link className="text-primary" to={"/register"}> registrati!</Link></p>
                </div>
            </Form>

        </>
    )
}

export default Login