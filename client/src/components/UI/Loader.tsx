import React from "react";
import classes from "./Loader.module.css";

const Loader = React.memo(() => {
  return (
    <div className={classes["loading-container"]}>
      <div className={classes.loader}></div>
      <span className={classes["loading-text"]}>loading</span>
    </div>
  );
});

export default Loader;
