import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const CreatePaginaModal = () => {
  const Url = "http://localhost:3010";
  const posterl = "/pagine";
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("uuid");
  const [PaginaPayload, setPostPayload] = useState({
    titolo: "",
    descrizione: "",
    link_sito: "",
    email: "",
    password: "",
    provincia:"",
    indirizzo:"",
    citta:""
  });
  const navigate = useNavigate();

  const createPagina = () => {
    fetch(Url + posterl, {
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + token,
      },
      method: "POST",
      body: JSON.stringify(PaginaPayload),
    })
      .then((response) => {
        console.log("oggetto inviato", response);
        if (response.ok) {
          alert("pagina creata!");
          navigate("/home");
        } else throw new Error();
      })
      .catch((error) => {
        console.log("errore", error);
        alert("errore nella creazione del post" + error);
      });
  };

  return (
    <>
      <Container fluid className="h-80vh">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col xs={12} xl={8}>
            <div className="d-flex justify-content-between align-items-center mb-2 mx-1">
              <Link
                className="fs-5 border-0 bg-none"
                to={"/singoloUtente/" + id}
              >
                <BsXLg className="text-primary border-0 bg-none" />
              </Link>
            </div>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                createPagina();
              }}
            >
              <Form.Group className="mb-3">
                <Form.Control
                  className="border border-2 border-primary"
                  type="text"
                  placeholder="titolo"
                  required
                  onChange={(e) => {
                    setPostPayload({
                      ...PaginaPayload,
                      titolo: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  className="border border-2 border-primary"
                  type="text"
                  placeholder="descrizione"
                  required
                  onChange={(e) => {
                    setPostPayload({
                      ...PaginaPayload,
                      descrizione: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  className="border border-2 border-primary"
                  type="text"
                  placeholder="provincia"
                  onChange={(e) => {
                    setPostPayload({
                      ...PaginaPayload,
                      provincia: e.target.value,
                    });
                  }}
                />
              </Form.Group>    <Form.Group className="mb-3">
                <Form.Control
                  className="border border-2 border-primary"
                  type="text"
                  placeholder="citta"
                  onChange={(e) => {
                    setPostPayload({
                      ...PaginaPayload,
                      citta: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  className="border border-2 border-primary"
                  type="text"
                  placeholder="indirizzo"
                  onChange={(e) => {
                    setPostPayload({
                      ...PaginaPayload,
                      indirizzo: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  className="border border-2 border-primary"
                  type="text"
                  placeholder="link_sito"
                  onChange={(e) => {
                    setPostPayload({
                      ...PaginaPayload,
                      link_sito: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  className="border border-2 border-primary"
                  type="email"
                  placeholder="email"
                  onChange={(e) => {
                    setPostPayload({
                      ...PaginaPayload,
                      email: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  className="border border-2 border-primary"
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setPostPayload({
                      ...PaginaPayload,
                      password: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Button type="submit" className="primary">
                CREA
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreatePaginaModal;
