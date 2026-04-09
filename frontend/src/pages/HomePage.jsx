import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/home.css";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
    <section className="home-hero">
      <h1 className="home-hero__title">
        Find the right SEO expert for your website
      </h1>

      <p className="home-hero__text">
        SEO Marketplace connects website owners with SEO experts to improve
        visibility, performance and search rankings.
      </p>

      {isAuthenticated ? (
          <Link to="/dashboard" className="home-hero__button">
            Go to Dashboard
          </Link>
        ) : (
          <Link to="/register" className="home-hero__button">
            Get Started
          </Link>
        )}

    </section>

<section className="home-how">
<h2 className="home-how__title">How it works</h2>

<div className="home-how__steps">
<article className="home-how__step">
            <h3 className="home-how__step-title">1. Create your profile</h3>
            <p className="home-how__step-text">
              Join the platform as a client or SEO expert.
            </p>
          </article>

          <article className="home-how__step">
            <h3 className="home-how__step-title">2. Post or browse needs</h3>
            <p className="home-how__step-text">
              Clients create SEO needs and experts browse open opportunities.
            </p>
          </article>

          <article className="home-how__step">
            <h3 className="home-how__step-title">3. Start collaborating</h3>
            <p className="home-how__step-text">
              Send requests, accept relations, and start messaging.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}