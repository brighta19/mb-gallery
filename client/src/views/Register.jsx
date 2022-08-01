import React, { useRef } from "react";
import { UseAuthContext } from "../contexts/AuthContext";

export default function Register() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { register } = UseAuthContext();

  function handleSubmit(e) {
    e.preventDefault();
    register(emailRef.current.value, passwordRef.current.value);
  }

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <input type='email' ref={emailRef} name='email' placeholder='Email' /><br/>
        <input type='password' ref={passwordRef} name='password' placeholder='Password' /><br/>
        <input type='confirm-password' ref={confirmPasswordRef} name='confirm-password' placeholder='Re-enter Password' /><br/>
        <button type='submit'>Register</button>
      </form>      
    </div>
  );
};