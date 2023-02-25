import { FormEvent, useEffect, useRef, useState } from "react";
import Input from "../../components/UI/Input";
import { IRegister } from "../../types/Register.types";
import classes from "./Register.module.css";

const validEmail = (value: string) => value.trim().includes("@");
const isEmpty = (value: string) =>
  value.trim() === "" && value.trim().length === 0;

type IData = IRegister | Omit<IRegister, "name" & "confirmPassword">;

const Register = () => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    email: true,
    emailIsValid: true,
    password: true,
    confirmPassword: true,
  });
  const [data, setData] = useState<IData>();
  const [registerStatus, setRegisterStatus] = useState<boolean | null>(null);

  const submitRegisterFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    const name = nameInputRef.current!.value;
    const email = emailInputRef.current!.value;
    const password = passwordRef.current!.value;
    const confirmPassword = confirmPasswordRef.current!.value;
    const nameIsValid = !isEmpty(name);
    const emailIsValid = validEmail(email);
    const passwordIsValid = !isEmpty(password);
    const confirmPasswordIsValid = !isEmpty(confirmPassword);
    const formIsValid =
      nameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid;
    setFormInputIsValid({
      name: nameIsValid,
      email: emailIsValid,
      emailIsValid: emailIsValid,
      password: passwordIsValid,
      confirmPassword: confirmPasswordIsValid,
    });
    if (!formIsValid) {
      return;
    }
    if (formIsValid) {
      const obtainedData = {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: confirmPassword,
      };
      setRegisterStatus(null);
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: JSON.stringify(obtainedData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      setData(data);
      setRegisterStatus(() => {
        return response.status === 200;
      });
      nameInputRef.current!.value = "";
      emailInputRef.current!.value = "";
      passwordRef.current!.value = "";
      confirmPasswordRef.current!.value = "";
    }
  };
  return (
    <main className={classes["register-page"]}>
      <form onSubmit={submitRegisterFormHandler}>
        {registerStatus === false && (
          <div className={classes["registration-error"]}>
            Registration Failed
          </div>
        )}
        <div className={classes["form-validation"]}>
          <Input
            ref={nameInputRef}
            input={{ type: "text", placeholder: "Name" }}
            className={!formInputIsValid.name ? classes.invalid : ""}
          />
          {!formInputIsValid.name && (
            <div className={classes["invalid-container"]}>
              <p>Name can't be empty</p>
            </div>
          )}
        </div>
        <div className={classes["form-validation"]}>
          <Input
            ref={emailInputRef}
            input={{ type: "text", placeholder: "Email" }}
            className={!formInputIsValid.email ? classes.invalid : ""}
          />
          {!formInputIsValid.email && (
            <div className={classes["invalid-container"]}>
              <p>
                {formInputIsValid.emailIsValid
                  ? "Email can't be empty"
                  : "Enter a valid email"}
              </p>
            </div>
          )}
        </div>
        <div className={classes["form-validation"]}>
          <Input
            ref={passwordRef}
            input={{ type: "password", placeholder: "Password" }}
            className={!formInputIsValid.password ? classes.invalid : ""}
          />
          {!formInputIsValid.password && (
            <div className={classes["invalid-container"]}>
              <p>Password can't be empty</p>
            </div>
          )}
        </div>
        <div className={classes["form-validation"]}>
          <Input
            ref={confirmPasswordRef}
            input={{ type: "password", placeholder: "Confirm Password" }}
            className={!formInputIsValid.confirmPassword ? classes.invalid : ""}
          />
          {!formInputIsValid.confirmPassword && (
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

export default Register;
