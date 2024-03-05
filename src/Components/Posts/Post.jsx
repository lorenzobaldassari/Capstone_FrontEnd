import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/action";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import CreatPostModal from "./CreatePostModal";
import ModifyPostModal from "./ModifyPostModal";
import { Link } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import "./posts.css";
import Commenti from "../Commenti/Comment";

const Post = () => {
  const ID = sessionStorage.getItem("uuid");
  const immagine = sessionStorage.getItem("immagine");
  const tipo = sessionStorage.getItem("tipo");
  const postUrl = "/posts/";
  const url = "http://localhost:3010";
  const getPosts = async () => {
    try {
      let response = await fetch(url + "/posts", {
        headers: {
          authorization: "bearer " + token,
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

  let [modifyShow, setModifyShow] = useState("");
  let [createShow, setCreateShow] = useState("");
  let [count, setCount] = useState(0);
  let setCountFunction = () => {
    setCount(count + 1);
  };

  const token = sessionStorage.getItem("token");
  let [like, setLike] = useState(0);
  let [postid, setPostid] = useState("");
  const setPostIdFunction = (par) => {
    setPostid(par);
  };
  let [showCommenta, setShowCommenta] = useState("");
  const setShowCommentafunction = (par) => {
    setShowCommenta(par);
  };

  const uuid = sessionStorage.getItem("uuid");

  const createShowFalse = (string) => {
    setCreateShow(string);
  };
  const modifyShowFalse = (string) => {
    setModifyShow(string);
  };
  let [posts, setPosts] = useState([]);



  useEffect(() => {
    getPosts();
  }, []);

  const likes = async (id) => {
    try {
      let response = await fetch(url + postUrl + "like/" + id, {
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
  const dislikes = async (id) => {
    try {
      let response = await fetch(url + postUrl + "dislike/" + id, {
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
          getPosts()
        } else throw new Error();
      })
      .catch((error) => {
        alert("errore nella cancellazione del post" + error);
        console.log(error);
      });
  };

  const getPostsFunc=()=>{
    getPosts()
  }

  return (
    <>
      <Row className="my-4 g-3 mx-2 w-90 position-relative">
        <div className="d-flex justify-content-center w-100 align-items-center   ">
          <div className=" d-flex shadow mt-4 justify-content-between w-100 bg-white pt-1 px-2 rounded-2 pb-3 border border-2 border-primary align-items-center ">
            <div>
              <img
                src={immagine}
                width={50}
                alt="immagine di profilo"
                className=" me-3 rounded-5 circle2"
              />
            </div>
            <Button
              id="button1"
              className="w-70 rounded-5 bg-third text-dark w-100"
              onClick={() => {
                setCreateShow(true);
              }}
            >
              Crea un post
            </Button>
          </div>
        </div>
        {posts.map((elem) => {
          return (
            <div key={elem.uuid} className="position-relative">
              <Col xs={12} className="position-relative">
                {elem.paginaPost && elem.paginaPost.id === uuid && (
                  <div clasname="position-absolute top-0 left-0 ">
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
                            onClick={() => setModifyShow(elem.uuid)}
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
                                deletePost(elem.uuid);
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
                {elem.utentePost && elem.utentePost.utente_uuid === uuid && (
                  <div clasname="position-absolute top-0 left-0 ">
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
                            onClick={() => setModifyShow(elem.uuid)}
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
                                deletePost(elem.uuid);
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
                <Card className="border-2 shadow border-primary bg-secondary rounded-2 w-100  ">
                  {/*  POST UTENTI */}
                  {elem.utentePost && (
                    <div className="d-flex align-items-center justify content-start p-4  pb-0">
                      <div className="rounded-50  circle1 d-flex-align-items-center ">
                        <img
                          src={elem.utentePost.immagine_di_profilo}
                          className="circle1"
                          alt=""
                        />
                      </div>
                      <div>
                        <h6 className="mb-0 ms-3">
                          <Link
                            className="text-black text-decoration-none fw-bold display-6"
                            to={"/singoloUtente/" + elem.utentePost.utente_uuid}
                          >
                            {elem.utentePost.nome} {elem.utentePost.cognome}
                          </Link>
                        </h6>
                        <p className="mb-0 ms-3">
                          {elem.data.slice(11, 16)} del {elem.data.slice(8, 10)}
                          -{elem.data.slice(5, 7)}-{elem.data.slice(2, 4)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* POST PAGINA */}
                  {elem.paginaPost && (
                    <div className="d-flex align-items-center justify content-start p-4 pb-0">
                      <div className=" circle1 d-flex-align-items-center ">
                        <img
                          src={elem.paginaPost.immagine}
                          className=" circle1"
                          alt=""
                        />
                      </div>
                      <div>
                        <Link
                          className="text-decoration-none"
                          to={"/singolaPagina/" + elem.paginaPost.id}
                        >
                          <h6 className="display-6 fw-bold mb-0 ms-3 text-black">
                            {elem.paginaPost.titolo}
                          </h6>
                        </Link>
                        <p className="mb-0 ms-3">
                          {elem.data.slice(11, 16)} del {elem.data.slice(8, 10)}
                          -{elem.data.slice(5, 7)}-{elem.data.slice(2, 4)}
                        </p>
                      </div>
                    </div>
                  )}
                  <Card.Img variant="top" src={elem.immagine} />
                  <Card.Body className="pb-0">
                    <Card.Title>{elem.titolo_post}</Card.Title>
                    <Card.Text>{elem.contenuto}</Card.Text>
                    <div id="customBr1" className="my-0"></div>
                    <div className="py-1 d-flex align-items-start justify-content-start ">
                      <Button className="transparent border-0 text-dark mb-0 ms-2 fs-5 d-flex align-items-center me-5">
                        {/* like button */}
                        <p className="mb-0 me-2">
                          {elem.likes_utente.length + elem.likes_pagina.length}
                        </p>
                        {tipo === "utente" &&
                          ((elem.utentePost &&
                            elem.likes_utente.filter(
                              (lambda) => lambda.utente_uuid === ID
                            ).length === 0) ||
                            (elem.paginaPost &&
                              elem.likes_utente.filter(
                                (lambda) => lambda.utente_uuid === ID
                              ).length === 0)) && (
                            <BiLike
                              onClick={() => {
                                likes(elem.uuid);
                                setLike(like + 1);
                              }}
                            />
                          )}
                        {tipo === "pagina" &&
                          ((elem.utentePost &&
                            elem.likes_pagina.filter(
                              (lambda) => lambda.id === ID
                            ).length === 0) ||
                            (elem.paginaPost &&
                              elem.likes_pagina.filter(
                                (lambda) => lambda.id === ID
                              ).length === 0)) && (
                            <BiLike
                              onClick={() => {
                                likes(elem.uuid);
                                setLike(like + 1);
                              }}
                            />
                          )}

                        {((elem.utentePost &&
                          elem.likes_utente.filter(
                            (lambda) => lambda.utente_uuid === ID
                          ).length > 0) ||
                          (elem.utentePost &&
                            elem.likes_pagina.filter(
                              (lambda) => lambda.id === ID
                            ).length > 0) ||
                          (elem.paginaPost &&
                            elem.likes_utente.filter(
                              (lambda) => lambda.utente_uuid === ID
                            ).length > 0) ||
                          (elem.paginaPost &&
                            elem.likes_pagina.filter(
                              (lambda) => lambda.id === ID
                            ).length > 0)) && (
                          <BiSolidLike
                            onClick={() => {
                              dislikes(elem.uuid);
                              setLike(like + 1);
                            }}
                          />
                        )}
                      </Button>

                      <div className="w-100">
                        <Commenti
                          uuidPost={elem.uuid}
                          postid={elem.uuid}
                          showCommenta={showCommenta}
                          setPostIdFunction={setPostIdFunction}
                          setShowCommentafunction={setShowCommentafunction}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {modifyShow === elem.uuid && (
                <div className="position-absolute positionModify w-90 bg-white p-5 z-index-50 border border-2 border-black shadow  ">
                  <ModifyPostModal
                    modifyShowFalse={() => modifyShowFalse()}
                    post={elem}
                    getPostsFunc={getPostsFunc}
                  />
                </div>
              )}
            </div>
          );
        })}
        {createShow === true && (
          <div className="position-fixed w-90 bg-white p-5 z-index-50 border border-2 border-black shadow ">
            <CreatPostModal
              createShowFalse={createShowFalse}
              getPostsFunc={getPostsFunc}
            />
          </div>
        )}
      </Row>
    </>
  );
};

export default Post;
