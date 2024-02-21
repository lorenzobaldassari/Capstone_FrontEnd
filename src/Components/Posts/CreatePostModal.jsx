import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";

const Url = "http://localhost:3010";
const posterl = "/posts";
const token = sessionStorage.getItem("token");

const CreatPostModal = ({ createShowFalse, plus1RefreshaAction }) => {
  const [postPayload, setPostPayload] = useState({
    titolo: "",
    contenuto: "",
    immagine: "",
  });

  const createPost = () => {
    fetch(Url + posterl, {
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + token,
      },
      method: "POST",
      body: JSON.stringify(postPayload),
    })
      .then((response) => {
        console.log("oggetto inviato", response)
        if (response.ok) {
          console.log(response.json());
          alert("post creato!");
        } else throw new Error();
      })
      .catch((error) => {
        console.log("errore",error)
        alert("errore nella creazione del post" + error);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 mx-1">
        <h3>crea</h3>
        <button
          onClick={() => {
            createShowFalse(false);
          }}
        >
          <BsXLg />
        </button>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          createPost();
          createShowFalse(false);
          // plus1RefreshaAction();
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
                ...postPayload,
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
                ...postPayload,
                contenuto: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            className="border border-2 border-success"
            type="text"
            placeholder="immagine"
            onChange={(e) => {
              setPostPayload({
                ...postPayload,
                immagine: e.target.value,
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

export default CreatPostModal;
