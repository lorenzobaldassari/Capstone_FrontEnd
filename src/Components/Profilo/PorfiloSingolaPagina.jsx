import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const ProfiloSingolaPagina = () => {
  const { id } = useParams();
  const url = "http://localhost:3010";
  const postUrl = "/pagine/";
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState({

  });

  console.log(data)
  const getPagina = async () => {
    try {
        let response = await fetch(url + postUrl+id, {
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
    getPagina();
  }, []);

  return (<>
        <Container>
          <Row>
          <Col xs={12} key={data.id}>
              <div className="bg-success p-4">
                <div>
                  <img src={data.immagine} alt="immagine della scuola" />
                </div>
                <Link pagine={data} to={"/singolaPagina/"+data.id}>
                  <h4>{data.titolo}</h4>
                </Link>
                <p>{data.descrizione}</p>
                <p>{data.link_sito}</p>
              </div>
            </Col>
          </Row>
        </Container>
  </>)

}

export default ProfiloSingolaPagina;