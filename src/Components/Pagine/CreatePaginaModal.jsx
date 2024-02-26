import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";

const Url = "http://localhost:3010";
const posterl = "/pagine";
const token = sessionStorage.getItem("token");

const CreatePaginaModal = ({ setShowFunc }) => {
  const [PaginaPayload, setPostPayload] = useState({
    titolo: "",
    descrizione: "",
    link_sito: "",
    email: "",
    password: "",
  });

  const createPagina = () => {
    console.log(token);
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
          console.log(response.json());
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
      <div className="d-flex justify-content-between align-items-center mb-2 mx-1">
        <h3>crea</h3>
        <button
          onClick={() => {
            setShowFunc(false);
          }}
        >
          <BsXLg />
        </button>
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
            className="border border-2 border-success"
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
            className="border border-2 border-success"
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
            className="border border-2 border-success"
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
            className="border border-2 border-success"
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
            className="border border-2 border-success"
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
    </>
  );
};

export default CreatePaginaModal;
