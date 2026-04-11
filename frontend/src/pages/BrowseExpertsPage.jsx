import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createRelation, getMyRelations } from "../services/relationService";
import { getExperts } from "../services/userService";
import { getMyNeeds } from "../services/needService";
import "../styles/browse-experts.css";

export default function BrowseExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [myNeeds, setMyNeeds] = useState([]);
  const [selectedNeedId, setSelectedNeedId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sentRelations, setSentRelations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [needFilter, setNeedFilter] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const expertsData = await getExperts();
        setExperts(expertsData.experts || []);

        const needsData = await getMyNeeds();
        setMyNeeds(needsData.needs || []);

        const relationsData = await getMyRelations();
        setSentRelations(relationsData.sentRelations || []);
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
      const data = await createRelation({
        receiverId: expert.id,
        needId: Number(selectedNeedId),
        message: "Hello, I would like to work with you on this project.",
      });

      setSentRelations((prev) => [...prev, data.relation]);
      setSuccessMessage("Relation request sent successfully.");
    } catch (err) {
      setError(err.message);
    }
  }

  function hasExistingRelation(expertId) {
    if (!selectedNeedId) return false;

    return sentRelations.some(
      (relation) =>
        relation.receiverId === expertId &&
        relation.needId === Number(selectedNeedId)
    );
  }

  const filteredExperts = experts.filter((expert) => {
    const displayName = expert.profile?.displayName?.toLowerCase() || "";
    const email = expert.email?.toLowerCase() || "";
    const bio = expert.profile?.bio?.toLowerCase() || "";
    const specialties =
      expert.profile?.expertProfile?.specialties?.toLowerCase() || "";
    const experience =
      expert.profile?.expertProfile?.experienceLevel?.toLowerCase() || "";

    const matchesSearch =
      displayName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      bio.includes(searchTerm.toLowerCase()) ||
      specialties.includes(searchTerm.toLowerCase());

    const matchesExperience =
      experienceFilter === "all" || experience === experienceFilter;

    const matchesNeed =
      needFilter === "all" || specialties.includes(needFilter.toLowerCase());

    return matchesSearch && matchesExperience && matchesNeed;
  });

  return (
    <section className="browse-experts">
      <h1 className="browse-experts__title">Browse Experts</h1>

      <div className="browse-experts__filters">
        {/* Search */}
        <input
          type="text"
          placeholder="Search experts (name, email, specialty...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="browse-experts__input"
        />

        {/* Experience Filter */}
        <select
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
          className="browse-experts__select"
        >
          <option value="all">All experience</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>

        {/* Needs Filter (NEU / optional) */}
        <select
          value={needFilter}
          onChange={(e) => setNeedFilter(e.target.value)}
          className="browse-experts__select"
        >
          <option value="all">All needs</option>
          <option value="seo">SEO</option>
          <option value="technical">Technical SEO</option>
          <option value="performance">Performance</option>
        </select>
      </div>

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
        {filteredExperts.length === 0 ? (
          <p className="browse-experts__empty">
            No experts match your current search or filter.
          </p>
        ) : (
          filteredExperts.map((expert) => (
            <article key={expert.id} className="browse-experts__card">
              <h2 className="browse-experts__card-title">
                {expert.profile?.displayName || expert.email}
              </h2>

              <p className="browse-experts__card-email">
                <strong>Email:</strong> {expert.email}
              </p>

              <p className="browse-experts__card-description">
                {expert.profile?.bio || "No bio available."}
              </p>

              <p className="browse-experts__card-meta">
                <strong>Experience:</strong>{" "}
                {expert.profile?.expertProfile?.experienceLevel || "N/A"}
              </p>

              <p className="browse-experts__card-meta">
                <strong>Specialties:</strong>{" "}
                {expert.profile?.expertProfile?.specialties || "N/A"}
              </p>

              {expert.profile?.expertProfile?.portfolioUrl && (
                <p className="browse-experts__card-meta">
                  <strong>Portfolio:</strong>{" "}
                  <a
                    href={expert.profile.expertProfile.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="browse-experts__external-link"
                  >
                    View portfolio
                  </a>
                </p>
              )}

              <div className="browse-experts__actions">
                <Link
                  to={`/experts/${expert.id}`}
                  className="browse-experts__button browse-experts__button--secondary"
                >
                  View Profile
                </Link>

                <button
                  type="button"
                  className="browse-experts__button"
                  onClick={() => handleSendRequest(expert)}
                  disabled={hasExistingRelation(expert.id)}
                >
                  {hasExistingRelation(expert.id)
                    ? "Request Sent"
                    : "Send Request"}
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
