import React, { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { useRouter } from "next/router";
interface IChildren {
  children: ReactNode;
}
const Layout = ({ children }: IChildren) => {
  const router = useRouter();

  const isMusician = router.pathname.includes("/musician");
  return (
    <div style={{ overflowY: "hidden" }}>
      {!isMusician && <Header />}
      {children}
    </div>
  );
};

export default Layout;
