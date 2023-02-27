import { format } from "date-fns";
import classes from "./Post.module.css";
import { Link } from "react-router-dom";
import UserAvatar from "../../../components/layout/Nav/User/UserAvatar";

interface Props {
  _id: string;
  content: string;
  cover: string;
  author: string;
  authorProfile: string;
  summary: string;
  title: string;
  createdAt: string;
}

const Post: React.FC<Props> = ({
  _id,
  content,
  cover,
  summary,
  author,
  authorProfile,
  title,
  createdAt,
}) => {
  return (
    <div className={classes.entry}>
      <div className={classes.picture}>
        <img
          src={`http://localhost:3000/${cover.replace("src/", "")}`}
          className={classes.image}
        />
      </div>
      <div className={classes.details}>
        <div className={classes["title-box"]}>
          <Link className={classes.cta} to={"/posts/" + _id}>
            <span className={classes["hover-underline-animation"]}>
              {title}
            </span>
          </Link>
          <div className={classes.timestamp}>
            <div>
              <span className={classes.author}>
                <UserAvatar url={authorProfile} />
              </span>
              <span>
                {author} at {format(new Date(createdAt), "MMM d, yyyy HH:mm")}
              </span>
            </div>
          </div>
        </div>
        <p>{summary.split(" ").splice(0, 60).join(" ")}</p>
      </div>
    </div>
  );
};

export default Post;
