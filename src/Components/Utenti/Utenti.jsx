import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingoloUtente from "./SingoloUtente";

const Utenti = () => {
  const url = "http://localhost:3010";
  const postUrl = "/utenti";
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);

  console.log("data", data);

  const getUtenti = async () => {
    try {
      let response = await fetch(url + postUrl, {
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
    getUtenti();
  }, []);

  return (
    <>
      <h1>LISTA UTENTI</h1>
      <Container>
        <Row>
          {data.map((elem) => {
            return (
              <Col key={elem.utente_uuid}>
                <SingoloUtente utente={elem} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Utenti;
