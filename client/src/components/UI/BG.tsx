import React from "react";
import classes from "./BG.module.css";

interface BG {
  picture?: string;
}

const BG: React.FC<BG> = ({ picture }) => {
  const style = {
    backgroundImage: `url(${picture})`,
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    filter: "blur(8px)",
  };
  return (
    <div className={classes.bg}>
      <img alt={"bg"} className={classes.blur} style={style} />
    </div>
  );
};

export default BG;
