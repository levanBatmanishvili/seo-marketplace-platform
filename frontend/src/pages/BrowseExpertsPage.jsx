import { useEffect, useState } from "react";
import { getExperts } from "../services/userService";
import "../styles/browse-experts.css";

export default function BrowseExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchExperts() {
      try {
        const data = await getExperts();
        setExperts(data.experts || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchExperts();
  }, []);

  return (
    <section className="browse-experts">
      <h1 className="browse-experts__title">Browse Experts</h1>

      {error && <p className="browse-experts__error">{error}</p>}

      <div className="browse-experts__list">
        {experts.length === 0 ? (
          <p className="browse-experts__empty">No experts found.</p>
        ) : (
          experts.map((expert) => (
            <article key={expert.id} className="browse-experts__card">
              <p><strong>Email:</strong> {expert.email}</p>
              <p><strong>ID:</strong> {expert.id}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}