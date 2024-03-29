import { useEffect, useState } from "react";
import classes from "./Posts.module.css";
import Post from "./components/Post";
import Loader from "../../components/UI/Loader";
import { postsData } from "../../types/Post.types";

const Posts: React.FC = () => {
  const [data, setData] = useState<postsData[] | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      setData(null);
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
      });
      if (!response) {
        return;
      }
      const fetchedData = await response.json();
      let loadedPosts: postsData[] = Object.entries(fetchedData).map(
        ([
          id,
          {
            _id,
            title,
            summary,
            content,
            author,
            authorProfile,
            cover,
            createdAt,
          },
        ]: any) => ({
          _id,
          title,
          author,
          authorProfile,
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
  const posts = data?.map((post: postsData) => {
    return <Post key={post._id} post={post} />;
  });
  if (!data) {
    return (
      <main>
        <Loader />
      </main>
    );
  }
  return (
    <main className={classes.entries}>
      {data && posts}
      {data.length === 0 && <p>Found no posts</p>}
    </main>
  );
};

export default Posts;
