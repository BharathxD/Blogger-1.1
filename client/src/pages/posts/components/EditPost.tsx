import React, { useRef, useEffect, useState } from "react";
import classes from "./CreatePost.module.css";
import Input from "../../../components/UI/Input";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import Quill from "../UI/Quill";
import { postsData } from "../../../types/Post.types";
import FormCard from "../../../components/UI/FormCard";

const EditPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const summaryInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState<postsData | null>();
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setData(null);
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        setTextAreaValue(data[0].content);
        setData(data[0]);
      } catch (error: any) {
        setError(true);
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
    if (file?.[0]) {
      form.set("file", file?.[0]);
    }
    const response = await fetch(`http://localhost:3000/api/posts/edit/${id}`, {
      method: "PUT",
      body: form,
      credentials: "include",
    });
    if (response.ok) {
      navigate(`/posts/${id}`);
    }
  };
  return (
    <main className={classes["create-post"]}>
      <FormCard>
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
              required={true}
            />
          </div>
          <div className={classes["input-container"]}>
            <Quill value={textAreaValue} onChange={setTextAreaValue} />
          </div>
          <div className={classes["form-actions"]}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </FormCard>
    </main>
  );
};

export default EditPost;
