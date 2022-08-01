//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const SignUp = () => {
  return (
    <div id="signUpContainer">
      <h2>Sign Up</h2>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
      </div>
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="username" />
      <input type="password" placeholder="Password" />
      <Button variant="success" style={{ width: "inherit" }}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
