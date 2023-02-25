import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Posts.module.css";
import Post from "./components/Post";

interface Props {
  isLoggedIn: boolean;
}

const Posts: React.FC<Props> = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) navigate("/");
  }, [isLoggedIn]);
  return (
    <main className={classes.entries}>
        <Post />
        <Post />
        <Post />
    </main>
  );
};

export default Posts;
