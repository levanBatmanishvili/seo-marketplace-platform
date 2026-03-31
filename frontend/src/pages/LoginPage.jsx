import { Link } from "react-router-dom";
import "../styles/login.css";

export default function LoginPage() {
  return (
    <section className="login-page">
      <h1 className="login-page__title">Login</h1>
      <p className="login-page__text">
        Access your account to manage your SEO projects and connections.
      </p>

      <form className="login-form">
        <div className="login-form__group">
          <label htmlFor="email" className="login-form__label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="login-form__input"
            placeholder="Enter your email"
          />
        </div>

        <div className="login-form__group">
          <label htmlFor="password" className="login-form__label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="login-form__input"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="login-form__button">
          Sign In
        </button>
      </form>

      <p className="login-page__footer">
        Don&apos;t have an account? <Link to="/register">Create one</Link>
      </p>
    </section>
  );
}