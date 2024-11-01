import React from "react";
import Form from "../components/Form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";

const Login = () => {

  function LoginUser(event) {

    signInWithEmailAndPassword(auth, event.email, event.password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        console.log(user);           
        console.log(event.email);
        console.log(event.password);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <>
      <Form name={"Login User"} onSubmitFunc={LoginUser} />
    </>
  );
};

export default Login;
