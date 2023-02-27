import classes from "./UserButton.module.css";

const UserButton: React.FC<{
  username: string | undefined;
  profile: string;
}> = ({ username, profile }) => {
  return (
    <li className={classes.username}>
      <span>{username}&nbsp;</span>
      <img
        src={`http://localhost:3000/${profile.replace("src/", "")}`}
        className={classes["profile"]}
      />
    </li>
  );
};

export default UserButton;
