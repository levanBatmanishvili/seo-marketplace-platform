import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/layout.css";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="site-main">
        <div className="site-main__container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}