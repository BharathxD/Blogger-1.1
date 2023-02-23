import { FC, ReactNode } from "react";
import { Fragment } from "react";
import Footer from "./Footer/Footer";
import Nav from "./Nav/Nav";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Nav />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
