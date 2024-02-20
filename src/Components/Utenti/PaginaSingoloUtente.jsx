import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const PaginaSingoloUtente = () => {
  const { id } = useParams();
  const url = "http://localhost:3010";
  const postUrl = "/utenti/";
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState({});
  console.log(data);

  console.log(data);
  const getUtente = async () => {
    try {
      let response = await fetch(url + postUrl + id, {
        headers: {
          authorization: "bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        let date = await response.json();
        setData(date);
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };

  useEffect(() => {
    getUtente();
  }, []);

  return (
    <>
      <Container fluid className="w-100">
        <Row className="w-100">
          <Col xs={12} key={data.id} className="d-flex justify-content-center w-100">
          <div className="bg-warning p-4">
            <div>
            <img src={data.immagine_di_profilo} alt="immagine dell'data" />
            </div>
            <Link pagine={data} to={"/singolodata/" + data.utente_uuid}>
            <h4>{data.nome}</h4>
            <h4>{data.cognome}</h4>
            </Link>
            <p>{data.email}</p>
        </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PaginaSingoloUtente;
