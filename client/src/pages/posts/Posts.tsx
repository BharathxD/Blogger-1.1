import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Posts.module.css";
import Post from "./components/Post";
import Loader from "../../components/UI/Loader";

interface Props {
  isLoggedIn: boolean;
}

export interface postsData {
  _id: string;
  content: string;
  author: { name: string; _id: string };
  cover: string;
  summary: string;
  title: string;
  createdAt: string;
}

const Posts: React.FC<Props> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<postsData[] | null>(null);
  useEffect(() => {
    if (isLoggedIn === false) navigate("/");
  }, [isLoggedIn]);
  useEffect(() => {
    const fetchPosts = async () => {
      setData(null);
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
      });
      const fetchedData = await response.json();
      let loadedPosts: postsData[] = Object.entries(fetchedData).map(
        ([
          id,
          { _id, title, summary, content, author, cover, createdAt },
        ]: any) => ({
          _id,
          title,
          author,
          summary,
          content,
          cover,
          createdAt,
        })
      );
      setData(loadedPosts);
    };
    fetchPosts();
  }, []);
  if (!data) {
    return (
      <main>
        <Loader />
      </main>
    );
  }
  return (
    <main className={classes.entries}>
      {data &&
        data.map((post: postsData) => {
          return (
            <Post
              key={post._id}
              _id={post._id}
              title={post.title}
              author={post.author.name}
              summary={post.summary}
              content={post.content}
              cover={post.cover}
              createdAt={post.createdAt}
            />
          );
        })}
    </main>
  );
};

export default Posts;
