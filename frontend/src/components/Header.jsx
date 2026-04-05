import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/header.css";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
  }

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

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="site-header__link">
                Login
              </Link>
              <Link to="/register" className="site-header__link">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="site-header__user">
                {user?.email} ({user?.role})
              </span>

              <button
                type="button"
                className="site-header__button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}