import React, { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
interface IChildren {
  children: ReactNode;
}
const Layout = ({ children }: IChildren) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
