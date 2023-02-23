import classes from "./Login.module.css";
import { FormEvent, useRef } from "react";
import Input from "../UI/Input";
import { useState } from "react";
import { IRegister } from "../types/Register.types";

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
  const [data, setData] =
    useState<Omit<IRegister, "name" | "confirmPassword">>();
  const submitLoginFormHandler = (e: FormEvent) => {
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
      setData({
        email: email,
        password: password,
      });
      console.log(data);
      emailInputRef.current!.value = "";
      passwordInputRef.current!.value = "";
    }
  };
  return (
    <main className={classes["login-page"]}>
      <form onSubmit={submitLoginFormHandler}>
        <div className={classes["form-validation"]}>
          <Input
            ref={emailInputRef}
            input={{ type: "text", placeholder: "Username" }}
          />
          {!formInputIsValid.email && (
            <div className={classes["invalid-container"]}>
              <p>Confirm Password can't be empty</p>
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
              <p>Confirm Password can't be empty</p>
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
