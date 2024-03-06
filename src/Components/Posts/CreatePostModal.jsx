import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import "./posts.css";

const CreatPostModal = ({ createShowFalse, getPostsFunc, setAlert1Func }) => {
  const Url = "http://localhost:3010";
  const posterl = "/posts";
  const token = sessionStorage.getItem("token");
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
        console.log("oggetto inviato", response);
        if (response.ok) {
          // alert("post creato!");
          setAlert1Func(true);
          setTimeout(() => setAlert1Func(false), 2000);

          getPostsFunc();
        } else throw new Error();
      })
      .catch((error) => {
        console.log("errore", error);
        alert("errore nella creazione del post" + error);
      });
  };

  return (
    <>
      <div className="position-relative  ">
        <Form
          className="pt-5"
          onSubmit={(e) => {
            e.preventDefault();
            createPost();
            createShowFalse(false);
          }}
        >
          <Card.Body className="pb-0  ">
            <Card.Title>
              <Form.Group className="mb-3 ">
                <Form.Control
                  className=" input border border-2 border-white"
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
            </Card.Title>
            <Card.Text>
              {" "}
              <Form.Group className="mb-3 ">
                <Form.Control
                  className=" input border-2 border-white "
                  as="textarea"
                  rows={3}
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
            </Card.Text>
          </Card.Body>

          {/* <Form.Group className="mb-3">
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
        </Form.Group> */}
          <Button type="submit" className="fw-bold primary">
            PUBBLICA
          </Button>
        </Form>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2 mx-1 position-absolute top-0 end-0 ">
            <button
              className="bg-secondary border-0"
              onClick={() => {
                createShowFalse(false);
              }}
            >
              <BsXLg className="fs-5 text-primary bg-secondary" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatPostModal;
