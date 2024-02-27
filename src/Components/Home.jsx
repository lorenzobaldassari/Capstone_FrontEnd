import { Col, Container, Row } from "react-bootstrap";
import Post from "./Posts/Post";
import CreatPostModal from "./Posts/CreatePostModal";
import ModifyPostModal from "./Posts/ModifyPostModal";

const Home = () => {
  return (
    <>
      <Container fluid className="">
        <Row className="">
          {/* <Col lg={2} className="d-none d-lg-block">
            <div className="d-flex justify-content-center">
              <p>colonna 1</p>
            </div>
          </Col> */}
          <Col xs={12} lg={10} className="p-0 d-flex flex-column align-items-center ">
            <Post />
          </Col>
          <Col lg={2} className="d-none bg-success  d-lg-block">
            <div className="d-flex justify-content-center">
              <p>colonna 2</p>
            </div>
          </Col>
        </Row>
      </Container>
    
    </>
  );
};

export default Home;
