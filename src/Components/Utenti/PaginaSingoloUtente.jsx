import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ModifyPostModal from "../Posts/ModifyPostModal";
import CreatePaginaModal from "../Pagine/CreatePaginaModal";

const PaginaSingoloUtente = () => {
  const { id } = useParams();
  const url = "http://localhost:3010";
  const ID = sessionStorage.getItem("uuid");
  const [showCreatePagina, setShowCreatePagina] = useState(false);
  const setShowFunc = (bool) => {
    setShowCreatePagina(bool);
  };
  const postUrl = "/utenti/";
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  let [modifyShow, setModifyShow] = useState("");
  let [createShow, setCreateShow] = useState("");

  const modifyShowFalse = (string) => {
    setModifyShow(string);
  };

  const getUtente = async () => {
    try {
      let response = await fetch(url + postUrl + id, {
        headers: {
          authorization: "bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        let date = await response.json();
        setData(date);
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };

  const getPosts = async () => {
    try {
      let response = await fetch(url + "/posts/utenti?uuid=" + id, {
        headers: {
          authorization: "bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        let date = await response.json();
        setPosts(date);
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };
  const deletePost = (uuid) => {
    fetch("http://localhost:3010/posts/" + uuid + "/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + token,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("post CANCELLATO!");
        } else throw new Error();
      })
      .catch((error) => {
        alert("errore nella cancellazione del post" + error);
        console.log(error);
      });
  };

  useEffect(() => {
    getUtente();
    getPosts();
  }, []);

  return (
    <>
      <Container fluid className="p-0  footerMargin ">
        <Row className="justify-content-center p-0 mx-0   ">
          <Col
            xs={12}
            xl={12}
            key={data.id}
            className="bg-white px-0 mb-4 rounded-3"
          >
            <div className="shadowBlack pb-5 d-flex flex-column align-items-start">
              <div className="w-100">
                <img
                  src="https://www.nanopress.it/wp-content/uploads/2018/02/Copertine-Facebook-gratis.jpg"
                  className="w-100"
                  height={300}
                  alt="immagine dell'utente"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between w-100 ">
                <div className="d-flex align-items-center">
                  <div className="p-4 ">
                    <img
                      src={data.immagine_di_profilo}
                      className="circle"
                      alt="immagine della scuola"
                    />
                  </div>
                  <h4 className="display-4 fw-bold text-black">
                    {data.nome} {data.cognome}
                  </h4>
                </div>
                {data.utente_uuid === ID && (
                  <div className="me-5">
                    <Link to={"/creazionePagina"}>
                    <Button onClick={() => setShowCreatePagina(true)}>
                      crea pagina
                    </Button>
                    </Link>
 
                  </div>
                )}
              </div>
              <div className="ms-5">
                <p className="fs-5">{data.bio}</p>
              </div>
            </div>
          </Col>
          <Col
            xs={10}
            xl={8}
            className="mb-3 bg-white px-0 shadowBlack rounded-3"
          >
            <Row className=" my-4 justify-content-center ">
              <Col xs={10} xl={10} className="">
                {posts.map((posts) => {
                  return (
                    <div key={posts.uuid} className="position-relative">
                      <Card className="border-2 mt-4 shadow border-primary bg-secondary rounded-2 w-100 position-relative  ">
                        {posts.utentePost &&
                          posts.utentePost.utente_uuid === ID && (
                            <div className="position-absolute top-0 end-0 ">
                              <Dropdown className="dots ">
                                <Dropdown.Toggle
                                  variant="primary"
                                  className="bg-white border-0 text-primary fs-4"
                                  id="dropdown-basic"
                                ></Dropdown.Toggle>

                                <Dropdown.Menu className="border-2 border-primary ">
                                  <Dropdown.Item href="#/action-2">
                                    <button
                                      className="border-0 bg-none"
                                      onClick={() => setModifyShow(posts.uuid)}
                                    >
                                      modifica
                                    </button>
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-1">
                                    {" "}
                                    <button
                                      className="border-0 bg-none"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Are you sure you wish to delete this item?"
                                          )
                                        ) {
                                          deletePost(posts.uuid);
                                        }
                                      }}
                                    >
                                      Elimina
                                    </button>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          )}
                        <div className=" d-flex align-items-center justify content-start p-4 pb-0">
                          <div className="circle1">
                            <img
                              src={posts.utentePost.immagine_di_profilo}
                              className="rounded-50 w-100 h-100"
                              alt=""
                            />
                          </div>
                          <div>
                            <h6 className="mb-0 ms-3 display-6 fw-bold">
                              {posts.utentePost.nome} &nbsp;
                              {posts.utentePost.cognome}
                            </h6>
                            <p className="mb-0 ms-3">
                              {posts.data.slice(11, 16)} del{" "}
                              {posts.data.slice(8, 10)}-{posts.data.slice(5, 7)}
                              -{posts.data.slice(2, 4)}
                            </p>
                          </div>
                        </div>
                        <Card.Img variant="top" src={posts.immagine} />
                        <Card.Body className="pb-0">
                          <Card.Title>{posts.titolo_post}</Card.Title>
                          <Card.Text>{posts.contenuto}</Card.Text>
                          <div id="customBr1" className="my-0"></div>
                          <div className="py-1 d-flex align-items-center justify-content-between ">
                            <Button className="transparent border-0 text-dark mb-0">
                              Like
                            </Button>
                            <Button className="transparent border-0 text-dark mb-0">
                              commenta
                            </Button>
                            <Button className="transparent border-0 text-dark mb-0">
                              Condividi
                            </Button>
                            <Button className="transparent border-0 text-dark mb-0">
                              invia
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                      {modifyShow === posts.uuid && (
                        <div className="position-absolute positionModify w-90 bg-white p-5 z-index-50 border border-2 border-primary shadow  ">
                          <ModifyPostModal
                            modifyShowFalse={() => modifyShowFalse()}
                            post={posts}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaginaSingoloUtente;
