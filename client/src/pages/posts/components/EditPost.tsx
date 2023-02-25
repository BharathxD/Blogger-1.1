import React, { useRef, useEffect, useState } from "react";
import classes from "./CreatePost.module.css";
import Input from "../../../components/UI/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Quill from "../UI/Quill";
import { id } from "date-fns/locale";
import { postsData } from "../Posts";

interface Props {
  isLoggedIn: boolean;
}

const EditPost: React.FC<Props> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) navigate("/");
  }, []);
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const summaryInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fetchState, setFetchState] = useState<{
    error: boolean;
    isLoading: boolean;
  }>({
    error: false,
    isLoading: true,
  });
  const [data, setData] = useState<postsData | null>();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setData(null);
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (!response.ok) throw new Error("Somethign went wrong");
        const data = await response.json();
        setData(data[0]);
        setFetchState({
          error: false,
          isLoading: false,
        });
      } catch (error: any) {
        setFetchState({
          error: true,
          isLoading: false,
        });
      }
    };
    fetchPost();
  }, []);
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
      method: "GET",
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
            value={data?.title ?? ""}
          />
        </div>
        <div className={classes["input-container"]}>
          <Input
            input={{ type: "text", placeholder: "Summary" }}
            ref={summaryInputRef}
            value={data?.summary ?? ""}
          />
        </div>
        <div className={classes["input-container"]}>
          <Input
            input={{ type: "file", placeholder: "File" }}
            ref={fileInputRef}
          />
        </div>
        <div className={classes["input-container"]}>
          <Quill
            textAreaValue={data?.content ?? ""}
            setTextAreaValue={setTextAreaValue}
          />
        </div>
        <div className={classes["form-actions"]}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
};

export default EditPost;
