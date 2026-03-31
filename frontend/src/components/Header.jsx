import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <Link to="/" className="site-header__logo">
          SEO Marketplace
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          <Link to="/" className="site-header__link">
            Home
          </Link>
          <Link to="/login" className="site-header__link">
            Login
          </Link>
          <Link to="/register" className="site-header__link">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}