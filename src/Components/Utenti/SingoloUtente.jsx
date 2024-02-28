import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const SingoloUtente = ({ utente }) => {
  console.log(utente);
  const [showCreatePagina, setShowCreatePagina] = useState(false);
  const setShowFunc = (bool) => {
    setShowCreatePagina(bool);
  };
  const id = sessionStorage.getItem("uuid");

  return (
    <>
      <Row className="w-100 px-0 mx-0">
        {utente.map((elem, i) => {
          return (
            <>
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
                        src={elem.immagine_di_profilo}
                        className="circle2"
                        alt="immagine della scuola"
                      />
                    </div>
                    <Link
                      className="text-decoration-none text-black ms-5"
                      pagine={elem}
                      to={"/singoloUtente/" + elem.utente_uuid}
                    >
                      <div className="d-flex ">
                        <h4 className="me-2 fs-6 mb-0 ">{elem.nome}</h4>
                        <h4 className="fs-6 mb-0">{elem.cognome}</h4>
                      </div>
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
                        src={elem.immagine_di_profilo}
                        className="circle2"
                        alt="immagine della scuola"
                      />
                    </div>
                    <Link
                      className="text-decoration-none text-black ms-5"
                      pagine={elem}
                      to={"/singoloUtente/" + elem.utente_uuid}
                    >
                      <div className="d-flex">
                        <h4 className="me-2 fs-6 mb-0">{elem.nome}</h4>
                        <h4 className="fs-6 mb-0">{elem.cognome}</h4>
                      </div>
                    </Link>
                    {/* <p>{elem.descrizione}</p> */}
                    {/* <p>{elem.link_sito}</p> */}
                  </div>

                </Col>
              )}
            </>
          );
        })}
      </Row>
    </>
  );
};

export default SingoloUtente;
