import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";

const Commenti = ({
  uuidPost,
  postid,
  setPostIdFunction,
  setAlert4Func,
  setAlert5Func,
}) => {
  const url = "http://localhost:3010";
  const commentUrl = "/commenti/posts/";
  const immagine = sessionStorage.getItem("immagine");
  const token = sessionStorage.getItem("token");
  const ID = sessionStorage.getItem("uuid");
  let [count, setCount] = useState(0);
  let [numberOfComments, setNumberOfComments] = useState();

  let setCountFunction = () => {
    setCount(count + 1);
  };
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState([]);
  const [payload, setPayload] = useState({
    contenuto: "",
  });
  const [pageSize, setPageSize] = useState(3);

  const getComments = async () => {
    try {
      let response = await fetch(
        url + commentUrl + uuidPost + "?size=" + pageSize,
        {
          headers: {
            authorization: "bearer " + token,
          },
        }
      );
      if (response.ok) {
        let date = await response.json();
        setNumberOfComments(date.content.length);
        console.log(date.totalElements);
        setData(date.content);
        setPagina(date.totalElements);
      } else throw new Error();
    } catch (error) {
      // alert("errore nella fetch di commento qui " + error);
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
        // alert("commento inviato");
        setAlert4Func(true);
        setTimeout(() => {
          setAlert4Func(false);
        }, 2000);
        getComments();
        // setPayload({
        //   contenuto: "",
        // });
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };

  const deleteComment = async (idCommento) => {
    try {
      let response = await fetch(url + "/commenti/me/" + idCommento, {
        headers: {
          authorization: "bearer " + token,
          "Content-type": "application/json",
        },
        method: "DELETE",
      });
      if (response.ok) {
        console.log("ciao");
        // alert("commento cancellato");
        setAlert5Func(true);
        setTimeout(() => {
          setAlert5Func(false);
        }, 2000);
        getComments();
        console.log("ciao");
      } else throw new Error();
    } catch (error) {
      alert("errore nella delete " + error);
    }
  };

  useEffect(() => {
    getComments();
  }, [count, pageSize]);

  return (
    <div>
      <p className="mb-0 mt-2">{pagina} commenti</p>
      <Container className="  mt-3 w-100">
        <Row className=" g-2 justify-content-center mb-4 w-100">
          <div className="d-flex align-items-start mb-4 w-100">
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
                // setShowCommentafunction();
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
                  value={payload.contenuto}
                  type="text"
                  id="22"
                  className="w-100 border-0 noBorder"
                  placeholder="Commenta"
                />
              </Button>
              <Button
                type="submit"
                className=" fw-bold rounded-5 ms-1 mt-2 fs-8"
              >
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
                      <div className="d-flex justify-content-between">
                        <Link
                          className="text-decoration-none text-black"
                          to={"/singoloUtente/" + elem.utente.utente_uuid}
                        >
                          <h6 className="mb-0">
                            {elem.utente.nome}
                            {elem.utente.cognome}
                          </h6>
                        </Link>
                        {elem.utente.utente_uuid === ID && (
                          <div>
                            <TiDeleteOutline
                              onClick={() => {
                                deleteComment(elem.uuid);
                              }}
                            />
                          </div>
                        )}
                      </div>

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
                      <div className="d-flex justify-content-between">
                        <Link
                          className="text-decoration-none text-black"
                          to={"/singolaPagina/" + elem.pagina.id}
                        >
                          <h6 className="mb-0">{elem.pagina.titolo}</h6>
                        </Link>
                        {elem.pagina.id === ID && (
                          <div>
                            <TiDeleteOutline
                              onClick={() => {
                                deleteComment(elem.uuid);
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <p className="fs-8">{elem.contenuto}</p>
                    </div>
                  </div>
                )}
              </Col>
            );
          })}
          {pageSize < pagina && (
            <Button
              className="fw-bold bg-none border-0 text-primary"
              onClick={() => {
                setPageSize(pageSize + 3);
                getComments();
              }}
            >
              mostra altro
            </Button>
          )}
          {pageSize >= pagina && pageSize > 3 && (
            <Button
              className="fw-bold bg-none border-0 text-primary"
              onClick={() => {
                setPageSize(3);
                getComments();
              }}
            >
              mostra meno
            </Button>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Commenti;
