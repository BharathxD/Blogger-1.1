import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Nav.module.css";

const Nav = () => {
  useEffect(() => {
    fetch("http://localhost:3000/api/profile", {
      credentials: "include",
    });
  }, []);
  return (
    <nav className={classes.nav}>
      <NavLink to="/" className={classes.logo}>
        Blogger 2.0
      </NavLink>
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
    </nav>
  );
};

export default Nav;
