import { Link } from "react-router-dom";
import { LayoutEnum } from "../../constants/layout.constants";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <main className={classes.home}>
      <div className={classes["header-container"]}>
        <div className={classes.header}>
          <span>{LayoutEnum.PLATFORM_TITLE}</span>
        </div>
        <div className={classes["header-actions"]}>
            <Link to="/login" className={classes.button}>Login</Link>
            <Link to="/register" className={classes.button}>Register</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
