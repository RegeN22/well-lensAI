import { Outlet } from "react-router-dom";
import Footer from "../features/product-scan/Footer/Footer";

function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
