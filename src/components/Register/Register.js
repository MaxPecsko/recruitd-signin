import React, { useState } from "react";
import Input from "./Input";
import "./register.css";

const Register = () => {
  const [route, setRoute] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(false);
  let errorMsg;

  const onRegisterSubmit = () => {
    if (!!name && !!email && password === passwordConfirmation) {
      fetch("https://staging-api.recruitd.co.uk/professional_auth/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirmation
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response.status === "success") {
            setRoute("success");
            console.log(response);
          } else if (response.errors.email[0] === "has already been taken") {
            console.dir("Email has already been taken!");
            setError(true);
            return false;
          } else if (response.errors.username[0] === "has already been taken") {
            console.dir("Username has already been taken!");
            setError(true);
            return false;
          }
        });
    } else {
      setError(true);
      return false;
    }
  };

  if (error) {
    errorMsg = (
      <span className={"error"}>
        Oops, looks like we got an error! Plese, check the entered information
        and try again!
      </span>
    );
  }

  if (route === "register") {
    return (
      <div className="Register" id="register">
        <p className="have-acc">
          Already have an account?{" "}
          <a href="./#" className="signin-link">
            Sign in here
          </a>
          .
        </p>
        <Input
          type="text"
          name="name"
          content="Full name"
          handleInput={setName}
        />
        <Input
          type="email"
          name="email"
          content="Email"
          handleInput={setEmail}
        />
        <Input
          type="password"
          name="password"
          content="Password"
          handleInput={setPassword}
        />
        <Input
          type="password"
          name="password-confirmation"
          content="Password confirmaion"
          handleInput={setPasswordConfirmation}
        />
        <div>
          <input type="checkbox" id="policy" name="policy" />
          <p className="policy-par">
            Creating an account means you have read and accept our
            <a href="./#" className="policy-link">
              {" "}
              Privacy Policy{" "}
            </a>
            and
            <a href="./#" className="policy-link">
              {" "}
              Terms of Service{" "}
            </a>
            .
          </p>
        </div>
        {errorMsg}
        <button id="submit" onClick={onRegisterSubmit}>
          Create Account
        </button>
      </div>
    );
  } else if (route === "success") {
    return (
      <div className="Register" id="register">
        <h2>
          We've sent You a verification email, please confirm it to proceed.
        </h2>
      </div>
    );
  }
};

export default Register;
