import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

const url = "http://localhost:3010";
const Register = () => {
  const [registerPayload, setRegisterPayload] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = async () => {
    console.log(url + "/auth/register");
    try {
      let response = await fetch(url + "/auth/register", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(registerPayload),
      });
      if (response.ok) {
        alert("registrazione effettuata inviato");
        navigate("");
      } else throw new Error();
    } catch (error) {
      alert("errore nella registrazione " + error);
    }
  };
  return (
    <>
      <Form
        id="registerForm"
        className="w-100 d-flex flex-column justify-content-center align-items-center"
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="border border-2 border-primary"
              type="text"
              placeholder="nome"
              required
              onChange={(e) => {
                setRegisterPayload({
                  ...registerPayload,
                  nome: e.target.value,
                });
              }}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="border border-2 border-primary"
              type="text"
              placeholder="cognome"
              required
              onChange={(e) => {
                setRegisterPayload({
                  ...registerPayload,
                  cognome: e.target.value,
                });
              }}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="border border-2 border-primary"
              type="email"
              placeholder="email"
              required
              onChange={(e) => {
                setRegisterPayload({
                  ...registerPayload,
                  email: e.target.value,
                });
              }}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="border border-2 border-primary"
              type="password"
              placeholder="password"
              required
              onChange={(e) => {
                setRegisterPayload({
                  ...registerPayload,
                  password: e.target.value,
                });
              }}
            />
          </Form.Group>
        </div>
        <Button type="submit" className="fw-bold primary mb-3">
          Registrati
        </Button>
        <p>
          sei gia registrato?{" "}
          <Link className="text-primary" to={"/"}>
            login!
          </Link>
        </p>
      </Form>
    </>
  );
};

export default Register;
