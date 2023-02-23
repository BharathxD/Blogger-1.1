import classes from "./Footer.module.css";
import { LayoutEnum } from "../../../constants/layout.constants";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>{LayoutEnum.PLATFORM_TITLE + " " + LayoutEnum.COPYRIGHT_YEAR} &copy;</p>
    </footer>
  );
};

export default Footer;
