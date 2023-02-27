import UserAvatar from "./UserAvatar";
import classes from "./UserButton.module.css";

const UserButton: React.FC<{
  username: string | undefined;
  profile: string;
}> = ({ username, profile }) => {
  return (
    <li className={classes.username}>
      <span>{username}</span>
      &nbsp;&nbsp;<UserAvatar />
    </li>
  );
};

export default UserButton;
