import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./pagine.css";
import ModifyPostModal from "../Posts/ModifyPostModal";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import Commenti from "../Commenti/Comment";

const ProfiloSingolaPagina = () => {
  const { id } = useParams();
  const url = "http://localhost:3010";
  const token = sessionStorage.getItem("token");
  const tipo = sessionStorage.getItem("tipo");
  const ID = sessionStorage.getItem("uuid");
  const likeUrl = "/posts/";
  const pagineUrl = "/pagine/";
  const postsUrl = "/posts/";

  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  let [like, setLike] = useState(0);
  let [modifyShow, setModifyShow] = useState("");
  let [postid, setPostid] = useState("");
  const setPostIdFunction = (par) => {
    setPostid(par);
  };
  let [createShow, setCreateShow] = useState("");
  const modifyShowFalse = (string) => {
    setModifyShow(string);
  };

  const getPagina = async () => {
    try {
      let response = await fetch(url + pagineUrl + id, {
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
      let response = await fetch(url + "/posts/pagine?id=" + id, {
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
          getPosts();
        } else throw new Error();
      })
      .catch((error) => {
        alert("errore nella cancellazione del post" + error);
        console.log(error);
      });
  };

  const likes = async (id1) => {
    try {
      let response = await fetch(url + likeUrl + "like/" + id1, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "bearer " + token,
        },
      });
      if (response.ok) {
        console.log("like messo");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("hai gia messo mi piace");
    }
  };
  const dislikes = async (id2) => {
    try {
      let response = await fetch(url + likeUrl + "dislike/" + id2, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "bearer " + token,
        },
      });
      if (response.ok) {
        console.log("like tolto");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("non hai ancora il mi piace");
    }
  };
  useEffect(() => {
    getPagina();
    getPosts();
  }, [like]);

  const getPostsFunc = () => {
    getPosts();
  };

  return (
    <>
      <Container fluid className="p-0 footerMargin ">
        <Row className="justify-content-center p-0 mx-0   ">
          <Col
            xs={12}
            xl={12}
            key={data.id}
            className="bg-white px-0 mb-4 rounded-3"
          >
            <div className="shadowBlack pb-5 d-flex flex-column align-items-start">
              <div className="w-100 d-flex justify-content-center w-100">
                <img
                  src={data.immagine_di_copertina}
                  // className="w-100"
                  height={300}
                  alt=""
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="p-4 ">
                  <img
                    src={data.immagine}
                    className="circle"
                    alt="immagine della scuola"
                  />
                </div>
                <h4 className="display-4 fw-bold text-black">{data.titolo}</h4>
              </div>
              <div className="ms-5">
                <p className="fs-5">{data.descrizione}</p>
                <a href={data.link_sito}>{data.link_sito}</a>
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
                      <Card className="border-2 mt-4 shadow border-primary bg-secondary rounded-2 w-100  ">
                        {posts.paginaPost && posts.paginaPost.id === ID && (
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
                              src={posts.paginaPost.immagine}
                              className="rounded-50 w-100 h-100"
                              alt=""
                            />
                          </div>
                          <div>
                            <h6 className="mb-0 ms-3 display-6 fw-bold">
                              {posts.paginaPost.titolo}
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
                          <div className="py-1 d-flex align-items-start justify-content-start ">
                            <Button className="transparent border-0 text-dark mb-0 ms-2 fs-5 d-flex align-items-center me-5">
                              {/* like button */}
                              <p className="mb-0 me-2">
                                {posts.likes_utente.length +
                                  posts.likes_pagina.length}
                              </p>
                              {tipo === "utente" &&
                                ((posts.utentePost &&
                                  posts.likes_utente.filter(
                                    (lambda) => lambda.utente_uuid === ID
                                  ).length === 0) ||
                                  (posts.paginaPost &&
                                    posts.likes_utente.filter(
                                      (lambda) => lambda.utente_uuid === ID
                                    ).length === 0)) && (
                                  <BiLike
                                    onClick={() => {
                                      likes(posts.uuid);
                                      setLike(like + 1);
                                    }}
                                  />
                                )}
                              {tipo === "pagina" &&
                                ((posts.utentePost &&
                                  posts.likes_pagina.filter(
                                    (lambda) => lambda.id === ID
                                  ).length === 0) ||
                                  (posts.paginaPost &&
                                    posts.likes_pagina.filter(
                                      (lambda) => lambda.id === ID
                                    ).length === 0)) && (
                                  <BiLike
                                    onClick={() => {
                                      likes(posts.uuid);
                                      setLike(like + 1);
                                    }}
                                  />
                                )}

                              {((posts.utentePost &&
                                posts.likes_utente.filter(
                                  (lambda) => lambda.utente_uuid === ID
                                ).length > 0) ||
                                (posts.utentePost &&
                                  posts.likes_pagina.filter(
                                    (lambda) => lambda.id === ID
                                  ).length > 0) ||
                                (posts.paginaPost &&
                                  posts.likes_utente.filter(
                                    (lambda) => lambda.utente_uuid === ID
                                  ).length > 0) ||
                                (posts.paginaPost &&
                                  posts.likes_pagina.filter(
                                    (lambda) => lambda.id === ID
                                  ).length > 0)) && (
                                <BiSolidLike
                                  onClick={() => {
                                    dislikes(posts.uuid);
                                    setLike(like + 1);
                                  }}
                                />
                              )}
                            </Button>

                            {/* <Button className="transparent border-0 text-dark mb-0">
                              commenta
                            </Button> */}

                            <div className="w-100">
                              <Commenti
                                uuidPost={posts.uuid}
                                postid={posts.uuid}
                                setPostIdFunction={setPostIdFunction}
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                      {modifyShow === posts.uuid && (
                        <div className="position-absolute positionModify w-90 bg-white p-5 z-index-50 border border-2 border-primary shadow  ">
                          <ModifyPostModal
                            modifyShowFalse={() => modifyShowFalse()}
                            post={posts}
                            getPostsFunc={getPostsFunc}
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

export default ProfiloSingolaPagina;
