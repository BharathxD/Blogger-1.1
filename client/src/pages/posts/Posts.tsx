import { useEffect, useState } from "react";
import classes from "./Posts.module.css";
import Post from "./components/Post";
import Loader from "../../components/UI/Loader";

export interface postsData {
  _id: string;
  content: string;
  author: { name: string; _id: string };
  authorProfile: string;
  cover: string;
  summary: string;
  title: string;
  createdAt: string;
}

const Posts: React.FC = () => {
  const [data, setData] = useState<postsData[] | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      setData(null);
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
      });
      const fetchedData = await response.json();
      console.log(fetchedData)
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
          return (
            <Post
              key={post._id}
              _id={post._id}
              title={post.title}
              author={post.author.name}
              authorProfile={post.authorProfile}
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
