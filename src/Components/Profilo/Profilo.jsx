import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PostProfile from "../Posts/PostProfilePagina";
import { useState, useEffect } from "react";
import PostProfileUtente from "../Posts/PostProfileUtente";

const url = "http://localhost:3010";
const postUrl = "/posts";

const Profilo = () => {
  const { id } = useParams();
  console.log(id);
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  console.log(data);
  const getPosts = () => {
    fetch(url + postUrl + "/utenti?uuid=" + id, {
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + token,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          const rep = response.json();
          return rep;
        } else throw new Error();
      })
      .then((date) => {
        setData(date);
        console.log(data);
      })

      .catch((error) => {
        alert("errore nella cancellazione del post" + error);
        console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Container>
        <PostProfileUtente post={data} id={id}></PostProfileUtente>
      </Container>
    </>
  );
};

export default Profilo;
