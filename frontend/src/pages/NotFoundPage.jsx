import { Link } from "react-router-dom";
import "../styles/not-found.css";

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <p className="not-found-page__code">404</p>
      <h1 className="not-found-page__title">Page not found</h1>
      <p className="not-found-page__text">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="not-found-page__link">
        Back to homepage
      </Link>
    </section>
  );
}