import "../styles/home.css";

export default function HomePage() {
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

      <a href="/register" className="home-hero__button">
        Get Started
      </a>
    </section>

<section className="home-how">
<h2 className="home-how__title">How it works</h2>

<div className="home-how__steps">
  <div className="home-how__step">
    <h3 className="home-how__step-title">1. Create an account</h3>
    <p className="home-how__step-text">
      Sign up as a website owner or SEO expert.
    </p>
  </div>

  <div className="home-how__step">
    <h3 className="home-how__step-title">2. Post your SEO need</h3>
    <p className="home-how__step-text">
      Describe your project and what you need help with.
    </p>
  </div>

  <div className="home-how__step">
    <h3 className="home-how__step-title">3. Connect and collaborate</h3>
    <p className="home-how__step-text">
      Chat and start working together.
    </p>
  </div>
</div>
</section>
</>
  );
}