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
      <Container fluid className="w-100 px-0 mx-0 footerMargin">
        <h1>TUTTI GLI UTENTI</h1>
        <SingoloUtente utente={data} />
      </Container>
    </>
  );
};

export default Utenti;
