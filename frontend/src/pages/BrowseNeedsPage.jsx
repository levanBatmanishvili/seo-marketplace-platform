import { useEffect, useState } from "react";
import { getOpenNeeds } from "../services/needService";
import { createRelation } from "../services/relationService";
import "../styles/browse-needs.css";

export default function BrowseNeedsPage() {
  const [needs, setNeeds] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredNeeds = needs.filter((need) => {
    const title = need.title?.toLowerCase() || "";
    const description = need.description?.toLowerCase() || "";
    const status = need.status?.toLowerCase() || "";
  
    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase());
  
    const matchesStatus =
      statusFilter === "all" || status === statusFilter;
  
    return matchesSearch && matchesStatus;
  });


  return (
    <section className="browse-needs">
      <h1 className="browse-needs__title">Browse Open Needs</h1>
      <div className="browse-needs__filters">
  {/* Search */}
  <input
    type="text"
    placeholder="Search needs (title, description...)"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="browse-needs__input"
  />

  {/* Status Filter */}
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="browse-needs__select"
  >
    <option value="all">All needs</option>
    <option value="open">Open</option>
    <option value="in-progress">In progress</option>
    <option value="closed">Closed</option>
  </select>
</div>

      {error && <p className="browse-needs__error">{error}</p>}
      {successMessage && <p className="browse-needs__success">{successMessage}</p>}

      <div className="browse-needs__list">
        {filteredNeeds.length === 0 ? (
          <p className="browse-needs__empty">No needs match your search or filters.</p>
        ) : (
          filteredNeeds.map((need) => (
            <article key={need.id} className="browse-needs__card">
              <h2 className="browse-needs__card-title">{need.title}</h2>
              <p className="browse-needs__card-description">{need.description}</p>
              <p className="browse-needs__card-status">
                <strong>Status:</strong> {need.status}
              </p>
              <p className="browse-needs__card-owner">
              <strong>Client:</strong> {need.user?.email || "Unknown client"}
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