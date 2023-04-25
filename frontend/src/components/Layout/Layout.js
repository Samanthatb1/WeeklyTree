import { Outlet } from "react-router-dom"
import NavBar from "./Navbar"
import Footer from "./Footer"

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;