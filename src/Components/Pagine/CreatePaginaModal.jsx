import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const Url = "http://localhost:3010";
const posterl = "/pagine";
const token = sessionStorage.getItem("token");
const id = sessionStorage.getItem("uuid");

const CreatePaginaModal = ({ setShowFunc }) => {
  const [PaginaPayload, setPostPayload] = useState({
    titolo: "",
    descrizione: "",
    link_sito: "",
    email: "",
    password: "",
  });

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
                setShowFunc(false);
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
