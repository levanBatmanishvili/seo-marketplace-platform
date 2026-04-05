import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/register.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "client",
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
      const data = await registerUser(formData);

      setSuccessMessage("Account created successfully. You can now log in.");
      setFormData({
        email: "",
        password: "",
        role: "client",
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <section className="register-page">
      <h1 className="register-page__title">Create an account</h1>
      <p className="register-page__text">
        Join the platform as a client or an SEO expert.
      </p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form__group">
          <label className="register-form__label">Email</label>
          <input
            type="email"
            name="email"
            className="register-form__input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="register-form__group">
          <label className="register-form__label">Password</label>
          <input
            type="password"
            name="password"
            className="register-form__input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="register-form__group">
          <label className="register-form__label">I am a:</label>
          <select
            name="role"
            className="register-form__input"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="client">Client</option>
            <option value="expert">SEO Expert</option>
          </select>
        </div>

        <button type="submit" className="register-form__button">
          Register
        </button>
      </form>

      {successMessage && <p className="register-page__success">{successMessage}</p>}
      {errorMessage && <p className="register-page__error">{errorMessage}</p>}

      <p className="register-page__footer">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}