import { Col, Container, Row } from "react-bootstrap";
import Post from "./Posts/Post";

const Home = () => {
  return (
    <>
      <Container fluid className="">
        <Row className="">
          <Col lg={2} className="d-none d-lg-block">
            <div>
              <p>ciao</p>
            </div>
          </Col>
          <Col xs={12} lg={8} className="p-0  ">
            <Post />
          </Col>
          <Col lg={2} className="d-none  d-lg-block">
            <div>
              <p>ciao</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
