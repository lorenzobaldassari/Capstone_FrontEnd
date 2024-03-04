import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingolaPAgina = ({ pagine }) => {
  return (
    <>
      <Row className="w-100 px-0 mx-0">
        {pagine.map((elem, i) => {
          return (
            <div key={i}>
              {i % 2 === 0 && (
                <Col
                  className="bg-secondary px-5 w-100"
                  xs={12}
                  md={12}
                  lg={12}
                  key={elem.id}
                >
                  <div className="  d-flex align-items-center  ">
                    <div className="cirlce2 py-1">
                      <img
                        src={elem.immagine}
                        className="circle2"
                        alt="immagine della scuola"
                      />
                    </div>
                    <Link
                      className="text-decoration-none text-black ms-5"
                      pagine={elem}
                      to={"/singolaPagina/" + elem.id}
                    >
                      <h4 className="fs-6 mb-0 ">{elem.titolo}</h4>
                    </Link>
                  </div>
                </Col>
              )}
              {i % 2 !== 0 && (
                <Col
                  className="bg-third px-5 w-100"
                  xs={12}
                  md={12}
                  lg={12}
                  key={elem.id}
                >
                  <div className="  d-flex align-items-center  ">
                    <div className="circle2 py-1">
                      <img
                        src={elem.immagine}
                        className="circle2"
                        alt="immagine della scuola"
                      />
                    </div>
                    <Link
                      className="text-decoration-none text-black ms-5"
                      pagine={elem}
                      to={"/singolaPagina/" + elem.id}
                    >
                      <h4 className="fs-6 mb-0 ">{elem.titolo}</h4>
                    </Link>
                    {/* <p>{elem.descrizione}</p> */}
                    {/* <p>{elem.link_sito}</p> */}
                  </div>
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
