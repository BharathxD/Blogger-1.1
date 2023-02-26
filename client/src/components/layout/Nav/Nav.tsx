import { useEffect, useCallback, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import classes from "./Nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, setUsername } from "../../../store";
import UserButton from "./User/UserButton";

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector(
    (state: { Session: { isLoggedIn: boolean; username: string } }) => ({
      isLoggedIn: state.Session.isLoggedIn,
      username: state.Session.username,
    })
  );

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          credentials: "include",
        });
        const data = await response.json();
        if (data.name) {
          dispatch(login());
          dispatch(setUsername({ userId: data._id, username: data.name }));
        } else {
          dispatch(logout());
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    checkLoginStatus();
  }, [dispatch, username, isLoggedIn]);

  const logoutHandler = useCallback(() => {
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
  }, [dispatch, navigate]);

  return (
    <nav className={classes.nav}>
      <Link to={!isLoggedIn ? "/" : "/posts"} className={classes.logo}>
        Blogger 2.0
      </Link>
      {isLoggedIn && (
        <ul className={classes.loggedin}>
          <li>
            <NavLink
              to="/posts/create"
              className={classes.anchor + " " + classes.neumorphic}
            >
              New Post
            </NavLink>
          </li>
          <li>
            <a
              href="#"
              onClick={logoutHandler}
              className={classes.anchor + " " + classes.neumorphic}
            >
              <i className="bi bi-box-arrow-right"></i>
            </a>
          </li>
          <UserButton username={username} />
        </ul>
      )}
      {!isLoggedIn && (
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
