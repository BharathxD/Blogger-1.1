import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postsData } from "../Posts";
import { format } from "date-fns";
import classes from "./PostPage.module.css";

const PostPage: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<postsData | null>();
  const [fetchState, setFetchState] = useState<{
    error: boolean;
    isLoading: boolean;
  }>({
    error: false,
    isLoading: true,
  });
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setData(null);
        const response = await fetch(`http://localhost:3000/post/${id}`);
        const data = await response.json();
        setData(data);
        setFetchState({
          error: false,
          isLoading: false,
        });
      } catch (error: any) {
        setFetchState({
          error: true,
          isLoading: false,
        });
        console.log("error");
      }
    };
    fetchPost();
  }, []);
  if (fetchState.error && !fetchState.isLoading) {
    return (
      <main>
        <p>Something went wrong</p>
      </main>
    );
  }
  if (fetchState.isLoading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }
  return (
    <main>
      <div className={classes.picture}>
        <img
          alt="image"
          src={"http://localhost:3000/" + data?.cover.replace("src/", "")}
        />
      </div>
      <div className={classes.details}>
        <h2>{data!.title}</h2>
        <h6>
          {data!.author.name} at{" "}
          {format(new Date(data!.createdAt), "MMM d, yyyy HH:mm")}
        </h6>
        <p dangerouslySetInnerHTML={{ __html: data!.content }} />
      </div>
    </main>
  );
};

export default PostPage;
