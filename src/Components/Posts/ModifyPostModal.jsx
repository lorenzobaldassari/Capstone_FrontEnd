import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";

const url = "www.localhost3010";
const postUrl = "/posts";
const token = sessionStorage.getItem("token");

const ModifyPostModal = ({ post, modifyShowFalse, plus1RefreshaAction }) => {
  const [postPayload, setPostPayload] = useState({
    titolo: post.titolo,
    contenuto: post.contenuto,
    immagine: post.immagine,
  });
  console.log(post);

  const modifyPost = () => {
    console.log(token);
    fetch("http://localhost:3010/posts/" + post.uuid + "/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + token,
      },
      method: "PUT",
      body: JSON.stringify(postPayload),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response.json());
          alert("post MODIFICATO!");
        } else throw new Error();
      })
      .catch((error) => {
        alert("errore nella modifica del post" + error);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 mx-1">
        <h3>modifica</h3>
        <button
          onClick={() => {
            modifyShowFalse("");
          }}
        >
          <BsXLg />
        </button>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          modifyPost();
          modifyShowFalse("");
          plus1RefreshaAction();
        }}
      >
        <Form.Group className="mb-3">
          <Form.Control
            className="border border-2 border-success"
            type="text"
            placeholder="titolo"
            required
            value={postPayload.titolo}
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
            value={postPayload.contenuto}
            onChange={(e) => {
              setPostPayload({
                ...postPayload,
                descrizione: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            className="border border-2 border-success"
            type="text"
            placeholder="immagine"
            value={postPayload.immagine}
            onChange={(e) => {
              setPostPayload({
                ...postPayload,
                immagine: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Button type="submit" className="primary">
          Modifica
        </Button>
      </Form>
    </>
  );
};

export default ModifyPostModal;
