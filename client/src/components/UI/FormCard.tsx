import React, { ReactNode } from "react";
import classes from "./FormCard.module.css";

interface Props {
  children: ReactNode;
}

const FormCard: React.FC<Props> = ({ children }) => {
  return <div className={classes["form-card"]}>{children}</div>;
};

export default FormCard;
