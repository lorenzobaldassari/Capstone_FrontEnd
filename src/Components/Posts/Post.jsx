import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Post=()=>{

    const [data,setData]=useState([])
    
    const getPosts=()=>{
        fetch(url+loginUrl,
           {   authorization: "bearer "+token
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

        <>{ data.map((element)=>{
            <Card key={element.id} className='border-0 bg-warning w-100'>
                <div className="d-flex align-items-center justify content-start">
                    <div><img src="http://placekitten.com/50" className="rounded-5" alt="" /></div>
                    <div>
                        <h6 className='mb-0 ms-3'>titolo</h6>
                        <p className='mb-0 ms-3'>ora</p>
                    </div>
                </div>
                <Card.Img variant="top" src="http://placekitten.com/500" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <br id='customBr1'  />
                    <div className='d-flex align-items-center justify-content-between'>
                        <p className='mb-0'>Like</p>
                        <p className='mb-0'>commenta</p>
                        <p className='mb-0'>Condividi</p>
                        <p className='mb-0'>invia</p>
                    </div>
                </Card.Body>
            </Card>
        })}
        </>
    )
}

export default Post