import { useEffect, useState } from "react";
import { createRelation } from "../services/relationService";
import { getExperts } from "../services/userService";
import { getMyNeeds } from "../services/needService";
import "../styles/browse-experts.css";

export default function BrowseExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [myNeeds, setMyNeeds] = useState([]);
  const [selectedNeedId, setSelectedNeedId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const expertsData = await getExperts();
        setExperts(expertsData.experts || []);

        const needsData = await getMyNeeds();
        setMyNeeds(needsData.needs || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  async function handleSendRequest(expert) {
    setError("");
    setSuccessMessage("");

    if (!selectedNeedId) {
      setError("Please select a need first.");
      return;
    }

    try {
      await createRelation({
        receiverId: expert.id,
        needId: Number(selectedNeedId),
        message: "Hello, I would like to work with you on this project.",
      });

      setSuccessMessage("Relation request sent successfully.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="browse-experts">
      <h1 className="browse-experts__title">Browse Experts</h1>

      {error && <p className="browse-experts__error">{error}</p>}
      {successMessage && (
        <p className="browse-experts__success">{successMessage}</p>
      )}

      <div className="browse-experts__controls">
        <select
          value={selectedNeedId}
          onChange={(e) => setSelectedNeedId(e.target.value)}
          className="browse-experts__select"
        >
          <option value="">Select your need</option>
          {myNeeds.map((need) => (
            <option key={need.id} value={need.id}>
              {need.title}
            </option>
          ))}
        </select>
      </div>

      <div className="browse-experts__list">
        {experts.length === 0 ? (
          <p className="browse-experts__empty">No experts found.</p>
        ) : (
          experts.map((expert) => (
            <article key={expert.id} className="browse-experts__card">
              <p>
                <strong>Email:</strong> {expert.email}
              </p>
              <p>
                <strong>ID:</strong> {expert.id}
              </p>

              <button
                type="button"
                className="browse-experts__button"
                onClick={() => handleSendRequest(expert)}
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