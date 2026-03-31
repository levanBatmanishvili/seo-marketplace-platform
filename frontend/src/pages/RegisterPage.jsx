import { Link } from "react-router-dom";
import "../styles/register.css";

export default function RegisterPage() {
  return (
    <section className="register-page">
      <h1 className="register-page__title">Create your account</h1>
      <p className="register-page__text">
        Join the platform as a website owner or SEO expert.
      </p>

      <form className="register-form">
        <div className="register-form__row">
          <div className="register-form__group">
            <label htmlFor="firstName" className="register-form__label">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              className="register-form__input"
              placeholder="Enter your first name"
            />
          </div>

          <div className="register-form__group">
            <label htmlFor="lastName" className="register-form__label">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              className="register-form__input"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="register-form__group">
          <label htmlFor="email" className="register-form__label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="register-form__input"
            placeholder="Enter your email"
          />
        </div>

        <div className="register-form__group">
          <label htmlFor="password" className="register-form__label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="register-form__input"
            placeholder="Create a password"
          />
        </div>

        <div className="register-form__group">
          <label htmlFor="role" className="register-form__label">
            Account type
          </label>
          <select
            id="role"
            name="role"
            className="register-form__select"
            defaultValue=""
          >
            <option value="" disabled>
              Select your account type
            </option>
            <option value="client">Website owner</option>
            <option value="expert">SEO expert</option>
          </select>
        </div>

        <div className="register-form__group">
          <label htmlFor="bio" className="register-form__label">
            Short description
          </label>
          <textarea
            id="bio"
            name="bio"
            className="register-form__textarea"
            placeholder="Tell us a little about your needs or expertise"
          />
        </div>

        <button type="submit" className="register-form__button">
          Create Account
        </button>
      </form>

      <p className="register-page__footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </section>
  );
}