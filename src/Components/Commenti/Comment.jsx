import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const url = "http://localhost:3010";
const commentUrl = "/commenti/posts/";
const immagine = sessionStorage.getItem("immagine");
const token = sessionStorage.getItem("token");
const Commenti = ({
  uuidPost,
  postid,
  showCommenta,
  setPostIdFunction,
  setShowCommentafunction,
}) => {
  let [count, setCount] = useState(0);
  let setCountFunction = () => {
    setCount(count + 1);
  };
  const [data, setData] = useState([]);
  const [payload, setPayload] = useState({
    contenuto: "",
  });
  const getComments = async () => {
    try {
      let response = await fetch(url + commentUrl + uuidPost, {
        headers: {
          authorization: "bearer " + token,
        },
      });
      if (response.ok) {
        let date = await response.json();
        console.log(date);
        setData(date);
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };
  const postComment = async () => {
    try {
      let response = await fetch(url + "/commenti?uuid_post=" + postid, {
        headers: {
          authorization: "bearer " + token,
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("commento inviato");
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };

  useEffect(() => {
    getComments();
    console.log("refreshato");
  }, [count]);

  return (
    <Container className=" px-5 mt-3">
      <Row className=" g-2 justify-content-center mb-4 w-100">
        <span className="position-absolute commentNumber  w-2">
          {data.length}
        </span>

        <div className="d-flex align-items-start mb-4">
          <img
            src={immagine}
            alt="immagine di profilo"
            className="circleComment2 "
          />
          <form
            className="w-100"
            onSubmit={(e) => {
              e.preventDefault();
              postComment();
              setPostIdFunction("");
              setShowCommentafunction();
              setCountFunction();
              getComments();
            }}
          >
            <Button
              id="button1"
              className="  rounded-5 bg-white border-2 border-primary text-dark w-100"
            >
              <input
                onChange={(e) => {
                  setPayload({
                    ...payload,
                    contenuto: e.target.value,
                  });
                }}
                type="text"
                id="22"
                className="w-100 border-0 noBorder"
                placeholder="Commenta"
              />
            </Button>
            <Button type="submit" className="rounded-5 ms-1 mt-2 fs-8">
              pubblica
            </Button>
          </form>
        </div>

        {data.map((elem) => {
          return (
            <Col key={elem.uuid} className="position-relative w-100" xs={12}>
              {elem.utente && (
                // postid === elem.post.uuid &&
                <div className="d-flex align-items-start w-100">
                  <div className="me-3">
                    <img
                      src={elem.utente.immagine_di_profilo}
                      alt="immagine pagina"
                      className="circleComment"
                    />
                  </div>
                  <div className="rounded-4 p-3 bg-third w-100">
                    <Link
                      className="text-decoration-none text-black"
                      to={"/singoloUtente/" + elem.utente.utente_uuid}
                    >
                      <h6 className="mb-0">
                        {elem.utente.nome}
                        {elem.utente.cognome}
                      </h6>
                    </Link>

                    <p className="fs-8">{elem.contenuto}</p>
                  </div>
                </div>
              )}
              {elem.pagina && postid === elem.post.uuid && (
                <div className="d-flex align-items-start">
                  <div className="me-3">
                    <img
                      src={elem.pagina.immagine}
                      alt="immagine pagina"
                      className="circleComment"
                    />
                  </div>
                  <div className="rounded-4 p-3 bg-third w-100">
                    <Link
                      className="text-decoration-none text-black"
                      to={"/singolaPagina/" + elem.pagina.id}
                    >
                      <h6 className="mb-0">{elem.pagina.titolo}</h6>
                    </Link>
                    <p className="fs-8">{elem.contenuto}</p>
                  </div>
                </div>
              )}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Commenti;
