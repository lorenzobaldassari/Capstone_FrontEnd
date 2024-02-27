import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./pagine.css";

const ProfiloSingolaPagina = () => {
  const { id } = useParams();
  const url = "http://localhost:3010";
  const pagineUrl = "/pagine/";
  const postsUrl = "/posts/";
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);

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
        console.log("posts", date);
        setPosts(date);
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };

  useEffect(() => {
    getPagina();
    getPosts();
  }, []);

  return (
    <>
      <Container fluid className="p-0 m-0 ">
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
          <Col xs={10} xl={8} className="bg-white px-0 shadowBlack rounded-3">
            <Row className=" my-4 justify-content-center ">
              <Col xs={10} xl={10} className="">
                {posts.map((posts) => {
                  return (
                    <Card className="border-2 mt-4 shadow border-primary bg-secondary rounded-2 w-100  ">
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
                            {posts.data.slice(8, 10)}-{posts.data.slice(5, 7)}-
                            {posts.data.slice(2, 4)}
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
