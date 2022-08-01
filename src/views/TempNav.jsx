//Router
import { useNavigate } from "react-router-dom";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const TempNav = () => {
  let navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          navigate("/feed");
        }}
      >
        Feed
      </Button>
      <Button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          navigate("/post");
        }}
      >
        Upload
      </Button>
    </>
  );
};

export default TempNav;
