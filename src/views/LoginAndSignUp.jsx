//Module imports
import { useState } from "react";
import { isMobile } from "react-device-detect";

//Components
import SignUp from "../component/SignUp";
import Login from "../component/Login";

const LoginAndSignup = () => {
  const [signUpDisplay, setSignUpDisplay] = useState(false);
  return (
    <>
      <div id="logSignContainer">
        <h1>ExiBit</h1>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            textAlign: "center",
            borderRadius: 10,
            width: isMobile ? "90vw" : "40vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="LoginAndSignupBox" style={{ display: !signUpDisplay ? "flex" : "none" }}>
            <Login />
          </div>
          <div className="LoginAndSignupBox" style={{ display: signUpDisplay ? "flex" : "none" }}>
            <SignUp />
          </div>
          <p id="loginAndSignUpToggle" onClick={() => setSignUpDisplay(!signUpDisplay)}>
            {signUpDisplay ? "Have an account? Login" : "Create an account"}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginAndSignup;
