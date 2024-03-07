import { Button, Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const location = useLocation();
  const tipo = sessionStorage.getItem("tipo");
  const immagine = sessionStorage.getItem("immagine");
  const navigate = useNavigate();
  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/paginaLogin" && (
          <Navbar
            bg="primary"
            className="w-100 fw-bold fs-3 position-sticky top-0 z-index-500"
            data-bs-theme="dark"
          >
            <Container fluid className=" w-100">
              <Nav className=" ms-5 me-5  w-100 d-flex align-items-center justify-content-between">
                <Link className="text-decoration-none text-white" to={"/home"}>
                  CLassNexus
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
                <div className="d-flex justify-content-end">
                  {tipo === "pagina" && (
                    <div className="position-relative">
                      {/* <Link to={"/utente/me"}> */}
                      <img className="circle1 me-5" src={immagine} alt="" />
                      {/* </Link> */}
                      <Dropdown className="text-third position-absolute top-50 ">
                        <Dropdown.Toggle
                          className="text-third bg-none border-0 w-custom bg-primary"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu className="bg-primary">
                          <Dropdown.Item href="#/action-1">
                            <Link
                              className="text-decoration-none text-white fw-bold"
                              to={"/pagina/me"}
                            >
                              Profilo
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="fw-bold"
                            href="#/action-2"
                            onClick={() => {
                              sessionStorage.clear();
                              navigate("/");
                            }}
                          >
                            LogOut
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-end">
                  {tipo === "utente" && (
                    <div className="position-relative">
                      {/* <Link to={"/utente/me"}> */}
                      <img className="circle1 me-5" src={immagine} alt="" />
                      {/* </Link> */}
                      <Dropdown className="text-third position-absolute top-50 ">
                        <Dropdown.Toggle
                          className="opacity-0 text-third bg-none border-0 w-custom bg-primary"
                          id="dropdown-basic"
                        >
                          dqfaefaef
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-primary">
                          <Dropdown.Item href="#/action-1">
                            <Link
                              className="text-decoration-none text-white fw-bold"
                              to={"/utente/me"}
                            >
                              Profilo
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="fw-bold"
                            href="#/action-2"
                            onClick={() => {
                              sessionStorage.clear();
                              navigate("/");
                            }}
                          >
                            LogOut
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              </Nav>
            </Container>
          </Navbar>
        )}
    </>
  );
};

export default CustomNavbar;
