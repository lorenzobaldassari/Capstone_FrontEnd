import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const PaginaSingoloUtente = () => {
  const { id } = useParams();
  const url = "http://localhost:3010";
  const postUrl = "/utenti/";
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);

  console.log(data);

  console.log(data);
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
        console.log("posts", date);
        setPosts(date);
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };

  useEffect(() => {
    getUtente();
    getPosts();
  }, []);

  return (
    <>
      {/* <Container fluid className="w-100 position-relative">
        <Row className="w-100">
          <Col xs={12} className="d-flex justify-content-center w-100">
            <div className="bg-warning p-4">
              <div>
                <img src={data.immagine_di_profilo} alt="immagine dell'data" />
              </div>
              <Link pagine={data} to={"/singolodata/" + data.utente_uuid}>
                <h4>{data.nome}</h4>
                <h4>{data.cognome}</h4>
              </Link>
              <p>{data.email}</p>
            </div>
          </Col>
        </Row>
        
      </Container> */}
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
                  alt="immagine dell'utente"
                />
              </div>
              <div className="d-flex align-items-center ">
                <div className="p-4 ">
                  <img
                    src={data.immagine_di_profilo
                    }
                    className="circle"
                    alt="immagine della scuola"
                  />
                </div>
                <h4 className="display-4 fw-bold text-black">{data.nome} {data.cognome}</h4>
              </div>
              <div className="ms-5">
                <p className="fs-5">{data.bio}</p>
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

export default PaginaSingoloUtente;
