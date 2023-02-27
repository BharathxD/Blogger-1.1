import { useSelector } from "react-redux";
import classes from "./UserAvatar.module.css";

interface Props {
  url: string;
}

const UserAvatar: React.FC<Props> = ({ url }) => {
  return (
    <img
      src={`http://localhost:3000/${url.replace("src/", "")}`}
      className={classes["profile"]}
    />
  );
};

export default UserAvatar;
