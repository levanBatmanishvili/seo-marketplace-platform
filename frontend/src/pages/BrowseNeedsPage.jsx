import { useEffect, useState } from "react";
import { getOpenNeeds } from "../services/needService";
import { createRelation } from "../services/relationService";
import "../styles/browse-needs.css";

export default function BrowseNeedsPage() {
  const [needs, setNeeds] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchNeeds() {
      try {
        const data = await getOpenNeeds();
        setNeeds(data.needs || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchNeeds();
  }, []);

  async function handleSendRequest(need) {
    setError("");
    setSuccessMessage("");

    try {
      await createRelation({
        receiverId: need.userId,
        needId: need.id,
        message: `Hello, I am interested in helping with: ${need.title}`,
      });

      setSuccessMessage("Relation request sent successfully.");
    } catch (err) {
      setError(err.message);
    }
  }


  return (
    <section className="browse-needs">
      <h1 className="browse-needs__title">Browse Open Needs</h1>

      {error && <p className="browse-needs__error">{error}</p>}
      {successMessage && <p className="browse-needs__success">{successMessage}</p>}

      <div className="browse-needs__list">
        {needs.length === 0 ? (
          <p className="browse-needs__empty">No open needs found.</p>
        ) : (
          needs.map((need) => (
            <article key={need.id} className="browse-needs__card">
              <h2 className="browse-needs__card-title">{need.title}</h2>
              <p className="browse-needs__card-description">{need.description}</p>
              <p className="browse-needs__card-status">
                <strong>Status:</strong> {need.status}
              </p>
              <p className="browse-needs__card-owner">
                <strong>User ID:</strong> {need.userId}
              </p>

              <button
                type="button"
                className="browse-needs__button"
                onClick={() => handleSendRequest(need)}
              >
                Send Request
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}