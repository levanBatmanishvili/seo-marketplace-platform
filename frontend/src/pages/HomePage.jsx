import "../styles/home.css";

export default function HomePage() {
  return (
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
  );
}