import { useEffect, useState } from "react";
import SingolaPAgina from "./SingolaPagina";
import { Container, Form } from "react-bootstrap";
import { TbMathGreater } from "react-icons/tb";
import { TbMathLower } from "react-icons/tb";

const url = "http://localhost:3010";
const postUrl = "/pagine";

const Pagine = () => {
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const [page, setPgae] = useState(0);
  const [titolo, setTitolo] = useState("");


  const getPagine = async () => {
    try {
      let response = await fetch(url + postUrl + "?page=" + page+"&titolo="+titolo, {
        headers: {
          authorization: "bearer " + token,
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        let date = await response.json();
        setData(date.content);
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };

  useEffect(() => {
    getPagine();
  }, [page,titolo]);
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
                className="borderSpecial border-2  border border-primary  my-3"
                onChange={(e) => {
                  setTitolo(e.target.value);
                }}
                placeholder="Cerca"
              />
            </Form>
          </div>
          <SingolaPAgina pagine={data} />
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
              if (data.length > 14) {
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

export default Pagine;
