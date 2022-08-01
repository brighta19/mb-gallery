import { useState } from "react";

//Components
import SignUp from "../component/SignUp";
import Login from "../component/Login";

const LoginAndSignup = () => {
  const [signUpDisplay, setSignUpDisplay] = useState(false);
  return (
    <>
      <div id="logSignContainer">
        <h1>ExiBit</h1>
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)", textAlign: "center", borderRadius: 10 }}>
          <div id="loginBox" style={{ display: !signUpDisplay ? "flex" : "none" }}>
            <Login />
          </div>
          <div id="signupBox" style={{ display: signUpDisplay ? "flex" : "none" }}>
            <SignUp />
          </div>
          <p onClick={() => setSignUpDisplay(!signUpDisplay)} style={{ color: "white", cursor: "pointer" }}>
            {signUpDisplay ? "Have an account? Login" : "Create an account"}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginAndSignup;
