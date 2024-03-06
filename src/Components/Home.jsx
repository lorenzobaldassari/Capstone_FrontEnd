import { Col, Container, Row } from "react-bootstrap";
import Post from "./Posts/Post";
import CreatPostModal from "./Posts/CreatePostModal";
import ModifyPostModal from "./Posts/ModifyPostModal";

const Home = () => {
  return (
    <>
      <Container fluid className="footerMargin">
        <Row className=" justify-content-center">
          <Col
            xs={12}
            xxl={6}
            className="p-0 d-flex flex-column align-items-center "
          >
            <Post />
          </Col>
          {/* <Col className="d-none bg-success  d-xxl-block">
            <div className="d-flex justify-content-center">
              <p>colonna 2</p>
            </div>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Home;
