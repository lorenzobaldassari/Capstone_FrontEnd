import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";

const ModifyPostModal = ({
  post,
  modifyShowFalse,
  getPostsFunc,
  setAlert2Func,
}) => {
  const url = "http://localhost:3010";
  const postUrl = "/posts/";
  const token = sessionStorage.getItem("token");
  const [postPayload, setPostPayload] = useState({
    titolo: post.titolo_post,
    contenuto: post.contenuto,
    immagine: post.immaginePost,
  });

  const modifyPost = () => {
    fetch(url + postUrl + post.uuid + "/me", {
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
          // alert("post MODIFICATO!");
          setAlert2Func(true);
          setTimeout(() => {
            setAlert2Func(false);
          }, 2000);
          getPostsFunc();
        } else throw new Error();
      })
      .catch((error) => {
        alert("errore nella modifica del post" + error);
      });
  };

  return (
    <>
      <div className="position-relative">
        <Form
          className="pt-5"
          onSubmit={(e) => {
            e.preventDefault();
            modifyPost();
            modifyShowFalse("");
          }}
        >
          <Card.Body className="pb-0 ">
            <Card.Title>
              {" "}
              <Form.Group className="mb-3 ">
                <Form.Control
                  className=" input border border-2 border-white"
                  type="text"
                  placeholder="titolo"
                  value={postPayload.titolo}
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
                  value={postPayload.contenuto}
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
              value={postPayload.immagine}
              onChange={(e) => {
                setPostPayload({
                  ...postPayload,
                  immagine: e.target.value,
                });
              }}
            />
          </Form.Group> */}
          <Button type="submit" className="primary">
            MODIFICA
          </Button>
        </Form>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2 mx-1 position-absolute top-0 end-0 ">
            <button
              className="bg-secondary border-0"
              onClick={() => {
                modifyShowFalse(false);
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

export default ModifyPostModal;
