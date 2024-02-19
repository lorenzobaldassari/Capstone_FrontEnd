import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Wellcome = () => {
  const navigate = useNavigate();
  return (
    <div
      id="registerForm"
      className="d-flex align-items-center justify-content-center"
    >
      <Button
        className="fs-1"
        onClick={() => {
          navigate("/home");
        }}
      >
        Benvenuto!
      </Button>
    </div>
  );
};

export default Wellcome;
