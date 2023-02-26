import React from "react";
import classes from "./BG.module.css";

interface BG {
  picture: string;
}

const BG: React.FC<BG> = ({ picture }) => {
  return (
    <div className={classes.bg}>
      <img src={picture} alt={"bg"} />
    </div>
  );
};

export default BG;