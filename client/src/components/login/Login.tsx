import classes from "./Login.module.css";
import { FormEvent, useRef } from "react";
import Input from "../UI/Input";
import { useState } from "react";
import { IRegister } from "../../types/Register.types";
import { Navigate } from "react-router-dom";

const isEmpty = (value: string) =>
  value.trim() === "" && value.trim().length === 0;

const Login = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [formInputIsValid, setFormInputIsValid] = useState({
    email: true,
    emailIsValid: true,
    password: true,
  });
  const [loginSuccessful, setLoginSuccessful] = useState<boolean | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);
  const submitLoginFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const emailIsValid = !isEmpty(email);
    const passwordIsValid = !isEmpty(password);
    const formIsValid = emailIsValid && passwordIsValid;
    setFormInputIsValid({
      email: emailIsValid,
      emailIsValid: emailIsValid,
      password: passwordIsValid,
    });
    if (formIsValid) {
      const formData = { email: email, password: password };
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        setLoginSuccessful(true);
        console.log(response);
        emailInputRef.current!.value = "";
        passwordInputRef.current!.value = "";
        setRedirect(true);
      } else {
        setLoginSuccessful(false);
      }
    }
  };
  if (redirect) {
    return <Navigate to={"/posts"} />;
  }
  return (
    <main className={classes["login-page"]}>
      <form onSubmit={submitLoginFormHandler}>
        {loginSuccessful === false && (
          <div className={classes["login-error"]}>
            Username or Password is incorrect
          </div>
        )}
        <div className={classes["form-validation"]}>
          <Input
            ref={emailInputRef}
            input={{ type: "text", placeholder: "Username" }}
          />
          {!formInputIsValid.email && (
            <div className={classes["invalid-container"]}>
              <p>Email can't be empty</p>
            </div>
          )}
        </div>
        <div className={classes["form-validation"]}>
          <Input
            ref={passwordInputRef}
            input={{ type: "password", placeholder: "Password" }}
          />
          {!formInputIsValid.password && (
            <div className={classes["invalid-container"]}>
              <p>Password can't be empty</p>
            </div>
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
};

export default Login;
