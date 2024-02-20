import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingolaPAgina = ({ pagine }) => {
  return (
    <>
      <Row>
        {pagine.map((elem) => {
          return (
            <Col xs={12} md={6} lg={6} key={elem.id}>
              <div className="bg-success p-4">
                <div>
                  <img src={elem.immagine} alt="immagine della scuola" />
                </div>
                <Link pagine={elem} to={"/singolaPagina/"+elem.id}>
                  <h4>{elem.titolo}</h4>
                </Link>
                <p>{elem.descrizione}</p>
                <p>{elem.link_sito}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default SingolaPAgina;
