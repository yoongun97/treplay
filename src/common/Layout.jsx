import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
function Layout() {
  return (
    <div style={{ maxWidth: "1920px", width: "100%", margin: "0 auto 0 auto" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
