import { Col, Container, Row } from "react-bootstrap"
import Post from "./Posts/Post"


const Home=()=>{

    return(
        <> 
        <Container className="">
            <Row className=" gy-2">
                <Col className="d-xs-none d-lg-block" lg={2}>
                </Col >
                <Col xs={12} lg={8} className="p-0  " >
                    <Post/>
                </Col>
                <Col className="d-xs-none d-lg-block" lg={2}>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Home