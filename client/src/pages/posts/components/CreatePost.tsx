import React, { useRef, useEffect, useState } from "react";
import classes from "./CreatePost.module.css";
import Input from "../../../components/UI/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

const formats = [
  "header",
  "bolid",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }],
    [{ link: "image" }],
    ["clean"],
  ],
};

const CreatePost: React.FC<Props> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) navigate("/");
  }, []);
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const summaryInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createPostSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleInputRef.current!.value;
    const summary = summaryInputRef.current!.value;
    const file = fileInputRef.current!.files;
    const form = new FormData();
    form.set("title", title);
    form.set("summary", summary);
    form.set("content", textAreaValue);
    form.set("file", file![0]);
    await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: form,
      credentials: "include",
    });
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
          <ReactQuill
            value={textAreaValue}
            modules={modules}
            formats={formats}
            className={classes.quill}
            theme="snow"
          />
        </div>
        <div className={classes["form-actions"]}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
};

export default CreatePost;
