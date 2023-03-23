import { format } from "date-fns";
import classes from "./Post.module.css";
import { Link } from "react-router-dom";
import UserAvatar from "../../../components/layout/Nav/User/UserAvatar";
import { postsData } from "../../../types/Post.types";

const Post = ({ post }: { post: postsData }) => {
  const uri = `http://localhost:3000/${post.cover.replace("src/", "")}`;

  const summary = post.summary.split(" ").splice(0, 60).join(" ");

  const createdDate = format(new Date(post.createdAt), "MMM d, yyyy HH:mm");

  return (
    <div className={classes.entry}>
      <div className={classes.picture}>
        <img src={uri} className={classes.image} />
      </div>
      <div className={classes.details}>
        <div className={classes["title-box"]}>
          <Link className={classes.cta} to={`/posts/${post._id}`}>
            <span className={classes["hover-underline-animation"]}>
              {post.title}
            </span>
          </Link>
          <div className={classes.timestamp}>
            <div>
              <span className={classes.author}>
                <UserAvatar url={post.authorProfile} />
              </span>
              <span>
                {post.author.name} at {createdDate}
              </span>
            </div>
          </div>
        </div>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
