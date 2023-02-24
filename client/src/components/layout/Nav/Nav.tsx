import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import classes from "./Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, setUsername } from "../../../store";
import UserButton from "./User/UserButton";

const Nav = () => {
  const { isLoggedIn, username } = useSelector(
    (state: { Session: { isLoggedIn: boolean; username: string } }) => {
      return state.Session;
    }
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const data = await response.json();
      dispatch(setUsername({ username: data.name }));
      dispatch(login());
    })();
  }, [dispatch]);
  const logoutHandler = () => {
    try {
      fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      }).then(() => {
        navigate("/");
        dispatch(logout());
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  let userButton;
  if (username) {
    userButton = <UserButton username={username} />;
  }
  return (
    <nav className={classes.nav}>
      <Link to={!isLoggedIn ? "/" : "/posts"} className={classes.logo}>
        Blogger 2.0
      </Link>
      {isLoggedIn === true && (
        <ul className={classes.loggedin}>
          <li>
            <NavLink to="/posts/create" className={classes.anchor}>
              New Post
            </NavLink>
          </li>
          <li>
            <a href="#" onClick={logoutHandler} className={classes.anchor}>
              Logout
            </a>
          </li>
          {userButton}
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
