import { useSelector } from "react-redux";
import classes from "./UserAvatar.module.css";

const UserAvatar = () => {
  const { profile } = useSelector(
    (state: {
      Session: { isLoggedIn: boolean; username: string; profile: string };
    }) => ({
      profile: state.Session.profile,
    })
  );
  return (
    <img
      src={`http://localhost:3000/${profile.replace("src/", "")}`}
      className={classes["profile"]}
    />
  );
};

export default UserAvatar;
