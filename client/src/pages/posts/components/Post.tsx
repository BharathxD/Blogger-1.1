import { format } from "date-fns";
import classes from "./Post.module.css";

interface Props {
  content: string;
  cover: string;
  author: string;
  summary: string;
  title: string;
  createdAt: string;
}

const Post: React.FC<Props> = ({
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
        <h2>{title}</h2>
        <h6>
          {author} at {format(new Date(createdAt), "MMM d, yyyy HH:mm")}
        </h6>
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default Post;
