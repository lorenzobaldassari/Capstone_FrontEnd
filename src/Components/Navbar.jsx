import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

const CustomNavbar = () => {
  const location = useLocation();
  console.log(location);

  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/paginaLogin" && (
          <Navbar bg="primary" className="w-100" data-bs-theme="dark">
            <Container fluid className=" w-100">
              <Nav className=" ms-5 me-5  w-100 d-flex align-items-center justify-content-between">
                <Link className="text-decoration-none text-white" to={"/home"}>
                  SocialeName
                </Link>
                <Link className="text-decoration-none text-white" to={"/pagine"}>
                  Scuole
                </Link>
                <Link to={"/profile"}>
                  <img
                    className="rounded-5"
                    src="https://img.freepik.com/free-photo/closeup-shot-adorable-kitten-sitting-couch_181624-46615.jpg?w=826&t=st=1661376842~exp=1661377442~hmac=ddbc90a80a7179ac4ac0b6017327562157a57933c95d475b80c7e24b869c114a"
                    width={50}
                    alt=""
                  />
                </Link>
              </Nav>
            </Container>
          </Navbar>
        )}
    </>
  );
};

export default CustomNavbar;
