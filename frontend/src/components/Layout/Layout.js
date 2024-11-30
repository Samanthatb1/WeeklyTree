import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./Navbar";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
