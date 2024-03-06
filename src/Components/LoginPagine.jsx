import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginPaginaAction } from "../redux/action";
import { Alert } from "react-bootstrap";

const url = "http://localhost:3010";

const LoginPagina = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginPayload, SetLoginPayload] = useState({
    email: "",
    password: "",
  });
  const [alert1, setAlert1] = useState(false);
  const login = async () => {
    try {
      let response = await fetch(url + "/auth/login/pagine", {
        method: "POST",
        body: JSON.stringify(loginPayload),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        navigate("/wellcome");
        let data = await response.json();
        console.log("token " + data);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("uuid", data.uuid);
        sessionStorage.setItem("tipo", data.tipo);
        sessionStorage.setItem("nome", data.nome);
        sessionStorage.setItem("cognome", data.cognome);
        sessionStorage.setItem("immagine", data.immagine);
      } else {
        throw new Error();
      }
    } catch (error) {
      setAlert1(true);
    }
  };

  return (
    <>
      <Form
        className="d-flex flex-column align-items-center justify-content-center"
        id="loginForm"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        {alert1 && (
          <Alert className="bg-fourth border-0 text- fw-bold w-100 text-center">
            ! credenziali errate !
          </Alert>
        )}
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="borderSpecial border border-2 border-primary"
                type="Email"
                required
                placeholder="email della pagina"
                name="email"
                onChange={(e) => {
                  SetLoginPayload({
                    ...loginPayload,
                    email: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className=" borderSpecial border border-2 border-primary"
                type="text"
                required
                placeholder="password"
                name="email"
                onChange={(e) => {
                  SetLoginPayload({
                    ...loginPayload,
                    password: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </div>
          <Button type="submit" className="fw-bold bg-primary mb-3">
            Login
          </Button>
          <p>
            torna a{" "}
            <Link className="text-primary" to={"/"}>
              {" "}
              login utente!
            </Link>
          </p>
        </div>
      </Form>
    </>
  );
};

export default LoginPagina;
