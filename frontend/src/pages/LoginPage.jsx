import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import "../styles/login.css";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = await loginUser(formData);
      login(data.token, data.user);
      navigate("/dashboard");

      setSuccessMessage("Login successful.");
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <section className="login-page">
      <h1 className="login-page__title">Login</h1>
      <p className="login-page__text">
        Access your account to manage your SEO projects and connections.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="login-form__button">
          Sign In
        </button>
      </form>

      {successMessage && <p className="login-page__success">{successMessage}</p>}
      {errorMessage && <p className="login-page__error">{errorMessage}</p>}

      <p className="login-page__footer">
        Don&apos;t have an account? <Link to="/register">Create one</Link>
      </p>
    </section>
  );
}