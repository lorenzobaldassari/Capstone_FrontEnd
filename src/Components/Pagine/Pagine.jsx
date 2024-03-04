import { useEffect, useState } from "react";
import SingolaPAgina from "./SingolaPagina";
import { Container } from "react-bootstrap";

const url = "http://localhost:3010";
const postUrl = "/pagine";

const Pagine = () => {
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const getPagine = async () => {
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
    getPagine();
  }, []);
  return (
    <>
      <Container fluid className="mx-0 px-0 w-100 footerMargin">
        <SingolaPAgina pagine={data} />
      </Container>
    </>
  );
};

export default Pagine;
