import classes from "./UserButton.module.css";

const UserButton: React.FC<{ username: string | undefined }> = ({
  username,
}) => {
  return (
    <li>
      <span className={classes.username}>
        {username}&nbsp; <i className="bi bi-person-circle"></i>
      </span>
    </li>
  );
};

export default UserButton;
