import { format } from "date-fns";
import classes from "./Post.module.css";
import { Link } from "react-router-dom";
import UserAvatar from "../../../components/layout/Nav/User/UserAvatar";
import { postsData } from "../../../types/Post.types";

interface Props {
  post: postsData;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <div className={classes.entry}>
      <div className={classes.picture}>
        <img
          src={`http://localhost:3000/${post.cover.replace("src/", "")}`}
          className={classes.image}
        />
      </div>
      <div className={classes.details}>
        <div className={classes["title-box"]}>
          <Link className={classes.cta} to={"/posts/" + post._id}>
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
                {post.author.name} at{" "}
                {format(new Date(post.createdAt), "MMM d, yyyy HH:mm")}
              </span>
            </div>
          </div>
        </div>
        <p>{post.summary.split(" ").splice(0, 60).join(" ")}</p>
      </div>
    </div>
  );
};

export default Post;
