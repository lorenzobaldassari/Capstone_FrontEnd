import { useState } from "react"
import { Button } from "react-bootstrap"
import { Form } from "react-router-dom"

const url="www.localhost3010"
const postUrl="/posts"
const token=localStorage.getItem("token")
const CreatPostModal=()=>{
    
    const [postPayload, setPostPayload]= useState({
        titolo:"",
        contenuto:"",
        immagine:""
    })
    const createPost=()=>{
        fetch(url+postUrl,
        {   
            authorization: "bearer "+token,
            method:"POST",
            body:JSON.stringify(postPayload)
        })
        
            .then((response)=>{
                if(response.ok){
                console.log(response.json())
                alert("post creato!")
                }else throw new Error()
            })
            .catch((error)=>{
            alert("errore nella creazione del post"+error)
            })
    }


    return(

        <>
        
        <Form  onSubmit={(e)=>{
            e.preventDefault();
            createPost()
        }}>
            <Form.Group className="mb-3" >
                    <Form.Control className="border border-2 border-success" type="text" placeholder="titolo" required 
                    onChange={(e)=>{
                        setPostPayload({
                            ...postPayload,
                            titolo:e.target.value
                        })
                    }} />
            </Form.Group>
            <Form.Group className="mb-3" >
                    <Form.Control className="border border-2 border-success" type="text" placeholder="descrizione" required 
                    onChange={(e)=>{
                        setPostPayload({
                            ...postPayload,
                            descrizione:e.target.value
                        })
                    }} />
            </Form.Group>
            <Form.Group className="mb-3" >
                    <Form.Control  className="border border-2 border-success" type="text" placeholder="immagine" nullable 
                    onChange={(e)=>{
                        setPostPayload({
                            ...postPayload,
                            immagine:e.target.value
                        })
                    }} />
            </Form.Group>
            <Button type="submit" className="primary">pubblica</Button>

        </Form>
        
        </>
    )
}

export default CreatPostModal