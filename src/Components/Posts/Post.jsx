import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/action";
import { Col, Row } from "react-bootstrap";

const Post = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);
    console.log(posts);
    useEffect(() => {
      dispatch(getPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <Row className="my-4 g-3">
          {posts.map((elem) => {
            return (
              <Col key={elem.uuid} xs={12}>
                <Card className="border-0 bg-warning w-100">
                  <div className="d-flex align-items-center justify content-start">
                    <div>
                      <img
                        src="http://placekitten.com/50"
                        className="rounded-5"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="mb-0 ms-3">titolo</h6>
                      <p className="mb-0 ms-3">ora</p>
                    </div>
                  </div>
                  <Card.Img variant="top" src={elem.immagine} />
                  <Card.Body>
                    <Card.Title>{elem.titolo}</Card.Title>
                    <Card.Text>{elem.contenuto}</Card.Text>
                    <br id="customBr1" />
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="mb-0">Like</p>
                      <p className="mb-0">commenta</p>
                      <p className="mb-0">Condividi</p>
                      <p className="mb-0">invia</p>
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
