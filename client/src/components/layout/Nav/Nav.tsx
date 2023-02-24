import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import classes from "./Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, setUsername } from "../../../store";
import UserButton from "./User/UserButton";

const Nav = () => {
  const navigate = useNavigate();
  const {isLoggedIn, username} = useSelector(
    (state: { Session: { isLoggedIn: boolean, username: string } }) => {
      return state.Session;
    }
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const data = await response.json();
      dispatch(setUsername({username: data.name}))
      dispatch(login());
      setIsLoading(false);
    })();
  }, []);
  const logoutHandler = () => {
    try {
      fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      }).then(() => {
        navigate('/');
        dispatch(logout());
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.logo}>
        Blogger 2.0
      </Link>
      {isLoggedIn === true && (
        <ul className={classes.loggedin}>
          <li>
            <NavLink to="/login" className={classes.anchor}>
              New Post
            </NavLink>
          </li>
          <li>
            <a href="#" onClick={logoutHandler} className={classes.anchor}>
              Logout
            </a>
          </li>
          {!isLoading && <UserButton username={username} />}
        </ul>
      )}
      {isLoggedIn === false && (
        <ul>
          <li>
            <NavLink
              to="/login"
              className={(isActive) => (isActive ? classes.active : undefined)}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={(isActive) => (isActive ? classes.active : undefined)}
            >
              Register
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
