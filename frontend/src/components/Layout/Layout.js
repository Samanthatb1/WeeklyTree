import { Outlet } from "react-router-dom"
import NavBar from "./Navbar"
import Footer from "./Footer"

function Layout() {
  console.log("Layout component rendered");
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;