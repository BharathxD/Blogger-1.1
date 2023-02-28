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
      const fetchedData = await response.json();
      console.log(fetchedData);
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
      console.log(loadedPosts[0].authorProfile);
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
          return <Post key={post._id} post={post} />;
        })}
      {!data && <p>Found no posts</p>}
    </main>
  );
};

export default Posts;
