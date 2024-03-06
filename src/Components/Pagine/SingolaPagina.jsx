import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingolaPAgina = ({ pagine }) => {
  return (
    <>
      <Row className="w-10s0 px-0 mx-0 justify-content-center">
        {pagine.map((elem, i) => {
          return (
            <div key={i} className="d-flex justify-content-center">
              {i % 2 === 0 && (
                <Col
                  className=" bg-secondary px-5 w-100"
                  xs={8}
                  md={8}
                  lg={8}
                  key={elem.id}
                >
                  <Row className="  d-flex align-items-center justify-content-around  ">
                    <Col xs={6} md={3}>
                      <div className="cirlce2 py-1 ">
                        <img
                          src={elem.immagine}
                          className="circle2"
                          alt="immagine della scuola"
                        />
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <Link
                        className="text-decoration-none text-black ms-5 d-flex justify-content-start"
                        pagine={elem}
                        to={"/singolaPagina/" + elem.id}
                      >
                        <h4 className="fs-5 mb-0  ">{elem.titolo}</h4>
                      </Link>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="d-flex justify-content-start">
                        <p className="mb-0 mx-2">{elem.provincia}</p>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="d-flex justify-content-start">
                        <p className="mb-0">
                          <a href={elem.link_sito}>{elem.link_sito}</a>
                        </p>
                      </div>
                    </Col>

                    {/* <p>{elem.descrizione}</p> */}
                  </Row>
                </Col>
              )}
              {i % 2 !== 0 && (
                <Col
                  className="bg-third px-5 w-100"
                  xs={8}
                  md={8}
                  lg={8}
                  key={elem.id}
                >
                  <Row className="  d-flex align-items-center justify-content-around  ">
                    <Col xs={6} md={3}>
                      <div className="cirlce2 py-1 ">
                        <img
                          src={elem.immagine}
                          className="circle2"
                          alt="immagine della scuola"
                        />
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <Link
                        className="text-decoration-none text-black ms-5 d-flex justify-content-start"
                        pagine={elem}
                        to={"/singolaPagina/" + elem.id}
                      >
                        <h4 className="fs-5 mb-0  ">{elem.titolo}</h4>
                      </Link>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="d-flex justify-content-start">
                        <p className="mb-0 mx-2">{elem.provincia}</p>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="d-flex justify-content-start">
                        <p className="mb-0">
                          <a href={elem.link_sito}>{elem.link_sito}</a>
                        </p>
                      </div>
                    </Col>

                    {/* <p>{elem.descrizione}</p> */}
                  </Row>
                </Col>
              )}
            </div>
          );
        })}
      </Row>
    </>
  );
};

export default SingolaPAgina;
