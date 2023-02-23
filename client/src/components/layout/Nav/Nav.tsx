import { NavLink } from "react-router-dom";
import classes from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={(isActive) => (isActive ? classes.active : undefined)}
          >
            Home
          </NavLink>
        </li>
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
