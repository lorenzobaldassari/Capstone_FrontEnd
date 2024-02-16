import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';


const CustomNavbar=()=>{
  const location= useLocation()
  console.log(location)

    return (
        <>
           {location.pathname !=="/" && location.pathname !== "/register" &&
            <Navbar bg="primary" className='w-100' data-bs-theme="dark">
                  <Container fluid className=' w-100'>
                    <Nav className=" ms-5 me-5  w-100 d-flex align-items-center justify-content-between">
                      <Link className='text-decoration-none text-white' to={"/home"}>SocialeName</Link>
                      
                      <Link to={"/profile"}><img className='rounded-5' src='http://placekitten.com/50' width={50}/> </Link>
                    </Nav>
                  </Container>
            </Navbar>
        }
        </>
    )
  }

  export default CustomNavbar 