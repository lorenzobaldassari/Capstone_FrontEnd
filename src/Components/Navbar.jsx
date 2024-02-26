import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

const CustomNavbar = () => {
  const location = useLocation();
  console.log(location);
  const tipo = sessionStorage.getItem("tipo");

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
                <Link
                  className="text-decoration-none text-white"
                  to={"/utenti"}
                >
                  Utenti
                </Link>
                <Link
                  className="text-decoration-none text-white"
                  to={"/pagine"}
                >
                  Scuole
                </Link>
                {tipo === "pagina" && (
                  <Link to={"/pagina/me"}>
                    <img
                      className="rounded-5"
                      src="https://placekitten.com/50"
                      alt=""
                    />
                  </Link>
                )}
                {tipo === "utente" && (
                  <Link to={"/utente/me"}>
                    <img
                      className="rounded-5"
                      src="https://placedog.net/50"
                      alt=""
                    />
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        )}
    </>
  );
};

export default CustomNavbar;
