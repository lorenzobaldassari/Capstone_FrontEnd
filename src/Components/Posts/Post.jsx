import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/action";
import { Button, Col, Row } from "react-bootstrap";

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  console.log(posts);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    dispatch(getPosts(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row className="my-4 g-3 mx-2">
        {posts.map((elem) => {
          return (
            <Col key={elem.uuid} xs={12} className="">
              <Card className="border-0 bg-warning w-100  ">
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
                      {elem.data.slice(11, 16)} del {elem.data.slice(8, 10)}-
                      {elem.data.slice(5, 7)}-{elem.data.slice(2, 4)}
                    </p>
                  </div>
                </div>
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
          );
        })}
      </Row>
    </>
  );
};

export default Post;
