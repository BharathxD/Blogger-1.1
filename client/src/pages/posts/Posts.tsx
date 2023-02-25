import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Posts.module.css";
import Post from "./components/Post";

interface Props {
  isLoggedIn: boolean;
}

interface postsData {
  id: string;
  content: string;
  author: { name: string };
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
        ([id, { title, summary, content, author, cover, createdAt }]: any) => ({
          id,
          title,
          author,
          summary,
          content,
          cover,
          createdAt,
        })
      );
      console.log(loadedPosts);
      setData(loadedPosts);
      console.log(fetchedData);
    };
    fetchPosts();
  }, []);
  return (
    <main className={classes.entries}>
      {data &&
        data.map((post: postsData) => {
          console.log(post.author.name)
          return (
            <Post
              key={post.id}
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
