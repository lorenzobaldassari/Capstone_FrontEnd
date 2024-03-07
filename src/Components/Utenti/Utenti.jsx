import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import SingoloUtente from "./SingoloUtente";
import { TbMathGreater } from "react-icons/tb";
import { TbMathLower } from "react-icons/tb";
import "./utente.css";

const Utenti = () => {
  const url = "http://localhost:3010";
  const postUrl = "/utenti";
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const [page, setPgae] = useState(0);
  const [nome, setNome] = useState("");
  const [size, setSize] = useState();
  const getUtenti = async () => {
    try {
      let response = await fetch(
        url + postUrl + "?page=" + page + "&nome=" + nome,
        {
          headers: {
            authorization: "bearer " + token,
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        let date = await response.json();
        setData(date.content);
        setSize(data.totalElements);
        console.log(date.totalElements);
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };

  useEffect(() => {
    getUtenti();
  }, [page, nome,data]);

  return (
    <>
      <Container
        fluid
        className="w-100 px-0 mx-0 footerMargin d-flex flex-column justify-content-between height-100"
      >
        <div className="d-flex flex-column justify-content-start">
          <div className="d-flex justify-content-center my-2">
            <Form className="w-25">
              <Form.Control
                className="borderSpecial border-2  border border-primary  my-1"
                onChange={(e) => {
                  setNome(e.target.value);
                  getUtenti();
                }}
                placeholder="Cerca"
              />
            </Form>
          </div>
          <SingoloUtente utente={data} />
        </div>
        <div className=" d-flex justify-content-center align-items-center">
          <TbMathLower
            className="text-primary"
            onClick={() => {
              if (page !== 0) {
                setPgae(page - 1);
              } else {
                console.log("page e gia 0");
              }
            }}
          />
          <p className="text-primary fs-4 mb-0 mx-4">
            {page}
            {/* {page1} */}
          </p>
          <TbMathGreater
            className="text-primary"
            onClick={() => {
              if (data.length > 11) {
                setPgae(page + 1);
              } else {
                console.log("page e gia al massimo");
              }
            }}
          />
        </div>
      </Container>
    </>
  );
};

export default Utenti;
