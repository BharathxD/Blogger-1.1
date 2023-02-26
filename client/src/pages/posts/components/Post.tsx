import { format } from "date-fns";
import classes from "./Post.module.css";
import { Link } from "react-router-dom";

interface Props {
  _id: string;
  content: string;
  cover: string;
  author: string;
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
  title,
  createdAt,
}) => {
  return (
    <div className={classes.entry}>
      <div className={classes.picture}>
        <img
          alt="image"
          src={"http://localhost:3000/" + cover.replace("src/", "")}
        />
      </div>
      <div className={classes.details}>
        <div className={classes["title-box"]}>
          <Link className={classes.cta} to={"/posts/" + _id}>
            <span className={classes["hover-underline-animation"]}>
            {title}
            </span>
          </Link>
          <h6>
            {author} at {format(new Date(createdAt), "MMM d, yyyy HH:mm")}
          </h6>
        </div>
        {/* <p dangerouslySetInnerHTML={{ __html: content }} /> */}
        <p>{summary.split(" ").splice(0, 50).join(" ")}</p>
      </div>
    </div>
  );
};

export default Post;
