import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import CreatePaginaModal from "../Pagine/CreatePaginaModal";
import ModifyPostModal from "../Posts/ModifyPostModal";
import { Link } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import Commenti from "../Commenti/Comment";
import ImageSettngsModal from "./ImageSettingsModal";
import ImageCoverModal from "./ImageCoverModal";

const UtenteLoggato = () => {
  const id = sessionStorage.getItem("uuid");
  const url = "http://localhost:3010";
  const tipo = sessionStorage.getItem("tipo");
  const ID = sessionStorage.getItem("uuid");
  const likeUrl = "/posts/";

  const [alert2, setAlert2] = useState(false);
  const setAlert2Func = (bool) => {
    setAlert2(bool);
  };
  const [alert4, setAlert4] = useState(false);
  const setAlert4Func = (bool) => {
    setAlert4(bool);
  };
  const [alert5, setAlert5] = useState(false);
  const setAlert5Func = (bool) => {
    setAlert5(bool);
  };
  let [coverSetting, setCoverSetting] = useState(false);
  const setCoverSettingFunction = () => {
    setCoverSetting(false);
  };
  let [like, setLike] = useState(0);
  const postUrl = "/utenti/";
  const token = sessionStorage.getItem("token");

  const [data, setData] = useState({});
  const [showCreatePagina, setShowCreatePagina] = useState(false);
  const [posts, setPosts] = useState([]);
  let [modifyShow, setModifyShow] = useState("");
  let [postid, setPostid] = useState("");
  const setPostIdFunction = (par) => {
    setPostid(par);
  };
  const getPostsFunction = () => {
    getPosts();
    getUtente();
  };
  let [createShow, setCreateShow] = useState("");
  let [imageSetting, setimageSetting] = useState(false);
  const setImageSettingFunction = () => {
    setimageSetting(false);
  };

  const modifyShowFalse = (string) => {
    setModifyShow(string);
  };
  const setShowFunc = (bool) => {
    setShowCreatePagina(bool);
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
        sessionStorage.setItem("immagine", date.immagine_di_profilo);
        setData(date);
        console.log(date);
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
        setPosts(date.content);
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
        getPosts();
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
        getPosts();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("non hai ancora il mi piace");
    }
  };

  useEffect(() => {
    getUtente();
    getPosts();
  }, []);

  const getPostsFunc = () => {
    getPosts();
  };

  return (
    <>
      <Container fluid className="p-0 footerMargin position-relative  ">
        {imageSetting && (
          <div className="position-absolute imageCreatePosition z-index-1500">
            <ImageSettngsModal
              setImageSettingFunction={setImageSettingFunction}
              getPostsFunction={getPostsFunction}
            />
          </div>
        )}
        {coverSetting && (
          <div className="position-absolute imageCreatePosition2 z-index-1500">
            <ImageCoverModal
              setCoverSettingFunction={setCoverSettingFunction}
              getPostsFunction={getPostsFunction}
            />
          </div>
        )}
        <Row className="justify-content-center p-0 mx-0   ">
          <Col
            xs={12}
            xl={12}
            key={data.id}
            className="bg-white px-0 mb-4 rounded-3"
          >
            <div className="shadowBlack pb-5 d-flex flex-column align-items-center ">
              <div className="d-flex justify-content-center w-50 max-height">
                <img
                  className="w-100"
                  onClick={() => {
                    setCoverSetting(true);
                  }}
                  src={data.immagine_di_copertina}
                  // className="w-100"
                  // height={800}
                  alt="immagine di copertina"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between w-100 ">
                <div className="d-flex align-items-center">
                  <div className="p-4 ">
                    <button
                      className="border-0 bg-none"
                      onClick={() => {
                        setimageSetting(true);
                        console.log(imageSetting);
                      }}
                    >
                      <img
                        src={data.immagine_di_profilo}
                        className="circle"
                        alt="immagine della scuola"
                      />
                    </button>
                  </div>
                  <h4 className="display-4 fw-bold text-black">
                    {data.nome} {data.cognome}
                  </h4>
                </div>
                <div className="me-5">
                  <Link to={"/creazionePagina"}>
                    <Button>crea pagina</Button>
                  </Link>
                </div>
              </div>
              <div className="ms-5">
                <p className="fs-5">{data.bio}</p>
              </div>
            </div>
          </Col>
          <Col
            xs={10}
            xl={8}
            className="mb-4 bg-white px-0 shadowBlack rounded-3"
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
                                setAlert4Func={setAlert4Func}
                                setAlert5Func={setAlert5Func}
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
                            setAlert2Func={setAlert2Func}
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

export default UtenteLoggato;
