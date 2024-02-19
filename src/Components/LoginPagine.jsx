import { useEffect, useState } from "react";
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
      <h1>Login Pagina</h1>
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
                className="border border-2 border-success"
                type="Email"
                required
                placeholder="inserisci un'email"
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
                className="border border-2 border-success"
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
          <Button type="submit" className=" success">
            Login
          </Button>
          <p>
            non sei registrato?{" "}
            <Link className="text-primary" to={"/register"}>
              {" "}
              registrati!
            </Link>
          </p>
        </div>
      </Form>
    </>
  );
};

export default LoginPagina;
