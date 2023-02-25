import { format, formatISO9075 } from "date-fns";
import classes from "./Post.module.css";

interface Props {
  content: string;
  cover: string;
  summary: string;
  title: string;
  createdAt: string;
}

const Post: React.FC<Props> = ({
  content,
  cover,
  summary,
  title,
  createdAt,
}) => {
  return (
    <div className={classes.entry}>
      <div className={classes.picture}>
        <img
          alt="image"
          src="https://techcrunch.com/wp-content/uploads/2022/10/CMC_3800.jpg?w=430&h=230&crop=1"
        />
      </div>
      <div className={classes.details}>
        <h2>{title}</h2>
        <h4>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</h4>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Post;
