import { FormEvent, useEffect, useRef, useState } from "react";
import Input from "../../components/UI/Input";
import { IRegister } from "../../types/Register.types";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Register.module.css";
import { login } from "../../store";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/UI/FormCard";
import BG from "../../components/UI/BG";
import giyuu from "../../assets/giyuu.jpg";
import validEmail from "../../helpers/checkEmailIsValid";
import isEmpty from "../../helpers/checkInputIsEmpty";

type IData = IRegister | Omit<IRegister, "name" & "confirmPassword">;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector(
    (state: { Session: { isLoggedIn: boolean; username: string } }) => ({
      isLoggedIn: state.Session.isLoggedIn,
      username: state.Session.username,
    })
  );
  useEffect(() => {
    if (isLoggedIn === true) navigate("/posts");
  }, [isLoggedIn]);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const profileRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    email: true,
    profile: true,
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
    const profile = profileRef.current!.files;
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
      profile: profile ? true : false,
      emailIsValid: emailIsValid,
      password: passwordIsValid,
      confirmPassword: confirmPasswordIsValid,
    });
    if (!formIsValid) {
      return;
    }
    if (formIsValid) {
      setRegisterStatus(null);
      const form = new FormData();
      form.set("name", name);
      form.set("email", email);
      form.set("file", profile![0]);
      form.set("password", password);
      form.set("passwordConfirmation", confirmPassword);
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      setData(data);
      setRegisterStatus(() => {
        return response.status === 200;
      });
      dispatch(login());
      nameInputRef.current!.value = "";
      emailInputRef.current!.value = "";
      passwordRef.current!.value = "";
      confirmPasswordRef.current!.value = "";
      navigate("/posts");
    }
  };
  return (
    <main className={classes["register-page"]}>
      <BG picture={giyuu} />
      <FormCard>
        <form onSubmit={submitRegisterFormHandler}>
          {registerStatus === false && (
            <div className={classes["registration-error"]}>
              Registration Failed
            </div>
          )}
          <div className={classes["file-form-validation"]}>
            <label htmlFor="file" className={classes.profile}>
              <i className="bi bi-person-circle"></i>
              <span className={classes["upload-profile"]}>
                Upload Profile Picture
              </span>
            </label>
            <input
              ref={profileRef}
              id="file"
              type="file"
              placeholder="File"
              required={true}
            />
            {!formInputIsValid.profile && (
              <div className={classes["invalid-container"]}>
                <p>Profile can't be empty</p>
              </div>
            )}
          </div>
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
              className={
                !formInputIsValid.confirmPassword ? classes.invalid : ""
              }
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
      </FormCard>
    </main>
  );
};

export default Register;
