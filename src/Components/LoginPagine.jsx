import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginPaginaAction } from "../redux/action";

const LoginPagina = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginPayload, SetLoginPayload] = useState({
    email: "",
    password: "",
  });

  const auth = useSelector((state) => state.login.auth);
  return (
    <>
      <Form
        className="d-flex flex-column align-items-center justify-content-center"
        id="loginForm"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(loginPaginaAction(loginPayload));
          navigate("/wellcome");
        }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                className="border border-2 border-primary"
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
                className="border border-2 border-primary"
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
