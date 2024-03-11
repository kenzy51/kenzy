import React, { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
interface IChildren {
  children: ReactNode;
}
const Layout = ({ children }: IChildren) => {
  return (
    <div style={{ overflowY: "hidden" }}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
