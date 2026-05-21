import React, { ReactNode } from "react";
import Header from "./header/Header";
import { useRouter } from "next/router";
interface IChildren {
  children: ReactNode;
}
const Layout = ({ children }: IChildren) => {
  const router = useRouter();
  const isStudioRoute = router.pathname.startsWith("/studio");
  const isMusician = router.pathname.includes("/musician");
  return (
    <div style={{ overflowY: "hidden" }}>
      {!isMusician && <Header />}
      {!isStudioRoute && <Header />}
      {children}
    </div>
  );
};

export default Layout;
