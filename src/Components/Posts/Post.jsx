import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/action";
import { Button, Col, Row } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import CreatPostModal from "./CreatePostModal";
import ModifyPostModal from "./ModifyPostModal";

const Post = () => {
  const dispatch = useDispatch();
  let [modifyShow, setModifyShow] = useState("");
  let [createShow, setCreateShow] = useState("");
  let [refresh, setRefresh] = useState(0);
  let [uuid, setUuid] = useState(sessionStorage.getItem("uuid"));
  const plus1Refresh = () => {
    setRefresh(refresh + 1);
    console.log(refresh + "refresh");
  };
  const createShowFalse = (string) => {
    setCreateShow(string);
  };

  const modifyShowFalse = (string) => {
    setModifyShow(string);
  };
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    setUuid(sessionStorage.getItem("uuid"));
    dispatch(getPosts(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

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
        alert("errore nella modifica del post" + error);
      });
  };
  let posts = useSelector((state) => state.post.posts);
  console.log(posts);
  return (
    <>
      {uuid && (
        <Row className="my-4 g-3 mx-2">
          {posts.map((elem) => {
            return (
              <div key={elem.uuid}>
                <Col xs={12} className="position-relative">
                  {elem.paginaPost && elem.paginaPost.id === uuid && (
                    <div clasname="position-absolute top-0 left-0 ">
                      <button
                        className="dots"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this item?"
                            )
                          ) {
                            plus1Refresh();
                            console.log("ciao");
                            deletePost(elem.uuid);
                          }
                        }}
                      >
                        <BsXLg />
                      </button>
                      <button
                        className="x"
                        onClick={() => setModifyShow(elem.uuid)}
                      >
                        <BsThreeDots />
                      </button>
                    </div>
                  )}
                  {elem.utentePost && elem.utentePost.utente_uuid === uuid && (
                    <div clasname="position-absolute top-0 left-0 ">
                      <button
                        className="dots"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this item?"
                            )
                          ) {
                            deletePost(elem.uuid);
                            plus1Refresh();
                          }
                        }}
                      >
                        <BsXLg />
                      </button>
                      <button
                        className="x"
                        onClick={() => setModifyShow(elem.uuid)}
                      >
                        <BsThreeDots />
                      </button>
                    </div>
                  )}
                  <Card className="border-0 bg-warning w-100  ">
                    {elem.utentePost && (
                      <div className="d-flex align-items-center justify content-start">
                        <div>
                          <img
                            src={elem.utentePost.immagine_di_profilo}
                            className="rounded-5"
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 ms-3">
                            {elem.utentePost.nome} {elem.utentePost.cognome}
                          </h6>
                          <p className="mb-0 ms-3">
                            {elem.data.slice(11, 16)} del{" "}
                            {elem.data.slice(8, 10)}-{elem.data.slice(5, 7)}-
                            {elem.data.slice(2, 4)}
                          </p>
                        </div>
                      </div>
                    )}
                    {elem.paginaPost && (
                      <div className="d-flex align-items-center justify content-start">
                        <div>
                          <img
                            src={elem.paginaPost.immagine}
                            className="rounded-5"
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 ms-3">
                            {elem.paginaPost.titolo}
                          </h6>
                          <p className="mb-0 ms-3">
                            {elem.data.slice(11, 16)} del{" "}
                            {elem.data.slice(8, 10)}-{elem.data.slice(5, 7)}-
                            {elem.data.slice(2, 4)}
                          </p>
                        </div>
                      </div>
                    )}
                    <Card.Img variant="top" src={elem.immagine} />
                    <Card.Body className="pb-0">
                      <Card.Title>{elem.titolo}</Card.Title>
                      <Card.Text>{elem.contenuto}</Card.Text>
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
                </Col>

                {createShow === elem.uuid && (
                  <div className="position-absolute top-50 bg-white p-5 z-index-50  ">
                    <CreatPostModal />
                  </div>
                )}
                {modifyShow === elem.uuid && (
                  <div className="position-absolute top-50 start-50 bg-white p-5  z-index-50">
                    <ModifyPostModal
                      plus1RefreshaAction={plus1Refresh}
                      post={elem}
                      modifyShowFalse={() => modifyShowFalse()}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default Post;
