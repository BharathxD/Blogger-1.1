import React, { useRef, useEffect, useState } from "react";
import classes from "./CreatePost.module.css";
import Input from "../../../components/UI/Input";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Quill from "../UI/Quill";

interface Props {
  isLoggedIn: boolean;
}

const CreatePost: React.FC<Props> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) navigate("/");
  }, []);
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const summaryInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<boolean>(false);
  const createPostSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const title = titleInputRef.current!.value;
    const summary = summaryInputRef.current!.value;
    const file = fileInputRef.current!.files;
    const form = new FormData();
    form.set("title", title);
    form.set("summary", summary);
    form.set("content", textAreaValue);
    form.set("file", file![0]);
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: form,
      credentials: "include",
    });
    if (response.ok) {
      navigate("/posts");
    } else {
      setError(true);
    }
  };
  return (
    <main className={classes["create-post"]}>
      <form
        className={classes["form-container"]}
        onSubmit={createPostSubmitHandler}
      >
        {error && (
          <div className={classes["invalid-container"]}>
            Something went wrong, try again later.
          </div>
        )}
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
          <Quill value={textAreaValue} onChange={setTextAreaValue} />
        </div>
        <div className={classes["form-actions"]}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
};

export default CreatePost;
