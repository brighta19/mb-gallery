//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Login = () => {
  return (
    <div className="loginAndSignupConainer">
      <h2>Login</h2>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="Password" />
      <Button variant="success" style={{ width: "inherit" }}>
        Login
      </Button>
    </div>
  );
};

export default Login;
