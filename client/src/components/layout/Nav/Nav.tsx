import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./Nav.module.css";

const Nav = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const data = await response.json();
      setIsLoggedIn(true);
      setUsername(data.name);
    })();
  }, []);
  const logoutHandler = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
      setIsLoggedIn(false);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.logo}>
        Blogger 2.0
      </Link>
      {isLoggedIn && (
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
          <li>
            <span className={classes.username}>
              {username}&nbsp;<i className="bi bi-person-circle"></i>
            </span>
          </li>
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
