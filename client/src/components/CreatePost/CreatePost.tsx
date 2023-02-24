import React, { useRef, useEffect } from "react";
import classes from "./CreatePost.module.css";
import Input from "../UI/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state: { Session: { isLoggedIn: boolean } }) => state.Session.isLoggedIn
  );
  useEffect(() => {
    if (isLoggedIn === false) navigate("/");
  }, []);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const summaryInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createPostSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <main className={classes["create-post"]}>
      <form
        className={classes["form-container"]}
        onSubmit={createPostSubmitHandler}
      >
        <div className={classes["input-container"]}>
          <Input
            input={{ type: "text", placeholder: "Title" }}
            ref={titleInputRef}
          />
        </div>
        <div className={classes["input-container"]}>
          <Input
            input={{ type: "text", placeholder: "Summary" }}
            ref={summaryInputRef}
          />
        </div>
        <div className={classes["input-container"]}>
          <Input
            input={{ type: "file", placeholder: "File" }}
            ref={fileInputRef}
          />
        </div>
        <div className={classes["input-container"]}>
          <ReactQuill className={classes.quill} />
        </div>
        <div className={classes["form-actions"]}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
};

export default CreatePost;
