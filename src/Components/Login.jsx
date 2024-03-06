import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginAction } from "../redux/action";
import { Alert } from "react-bootstrap";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZTFlZDYyOS0xYmY1LTRiMWEtYjVkMi05YTc4MWY4NGZiZTciLCJpYXQiOjE3MDgwODU0MjUsImV4cCI6MTcwODY5MDIyNX0.Oroj961bXSqaSqE0ooJpP5bwpikQkfTpBKrDBO9eAaM";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "http://localhost:3010";
  const [loginPayload, SetLoginPayload] = useState({
    email: "",
    password: "",
  });
  const [alert1, setAlert1] = useState(false);

  const login = async () => {
    try {
      let response = await fetch(url + "/auth/login", {
        method: "POST",
        body: JSON.stringify(loginPayload),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        navigate("/wellcome");
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
          // dispatch(loginAction(loginPayload));
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
            <Form.Group className="mb-3" controlId="formBasicEmail1">
              <Form.Control
                className="borderSpecial border border-2 border-primary"
                type="Email"
                required
                placeholder="inserisci la tua email"
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
                className="borderSpecial border border-2 border-primary"
                type="password"
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
          <Button type="submit" className="fw-bold primary mb-3">
            Login
          </Button>
          <p>
            non sei registrato?{" "}
            <Link className="text-primary" to={"/register"}>
              {" "}
              registrati!
            </Link>
          </p>
          <p>
            hai una pagina?{" "}
            <Link className="text-primary" to={"/paginaLogin"}>
              {" "}
              logga!
            </Link>
          </p>
        </div>
      </Form>
    </>
  );
};

export default Login;
