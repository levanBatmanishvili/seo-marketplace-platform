import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMyRelations,
  acceptRelation,
  rejectRelation,
} from "../services/relationService";
import { useAuth } from "../hooks/useAuth";
import "../styles/relations.css";

export default function RelationsPage() {
  const { user } = useAuth();

  const [sentRelations, setSentRelations] = useState([]);
  const [receivedRelations, setReceivedRelations] = useState([]);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function fetchRelations() {
      try {
        const data = await getMyRelations();
        setSentRelations(data.sentRelations || []);
        setReceivedRelations(data.receivedRelations || []);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchRelations();
  }, []);

  async function handleAccept(relationId) {
    try {
      const data = await acceptRelation(relationId);

      setReceivedRelations((prev) =>
        prev.map((relation) =>
          relation.id === relationId ? data.relation : relation
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleReject(relationId) {
    try {
      const data = await rejectRelation(relationId);

      setReceivedRelations((prev) =>
        prev.map((relation) =>
          relation.id === relationId ? data.relation : relation
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  function filterRelations(relations) {
    if (statusFilter === "all") {
      return relations;
    }

    return relations.filter((relation) => relation.status === statusFilter);
  }

  const filteredSentRelations = filterRelations(sentRelations);
  const filteredReceivedRelations = filterRelations(receivedRelations);

  return (
    <section className="relations">
      <h1 className="relations__title">My Relations</h1>
      <div className="relations__filters">
        <button
          type="button"
          className={`relations__filter-button ${
            statusFilter === "all" ? "relations__filter-button--active" : ""
          }`}
          onClick={() => setStatusFilter("all")}
        >
          All
        </button>

        <button
          type="button"
          className={`relations__filter-button ${
            statusFilter === "pending" ? "relations__filter-button--active" : ""
          }`}
          onClick={() => setStatusFilter("pending")}
        >
          Pending
        </button>

        <button
          type="button"
          className={`relations__filter-button ${
            statusFilter === "accepted"
              ? "relations__filter-button--active"
              : ""
          }`}
          onClick={() => setStatusFilter("accepted")}
        >
          Accepted
        </button>

        <button
          type="button"
          className={`relations__filter-button ${
            statusFilter === "rejected"
              ? "relations__filter-button--active"
              : ""
          }`}
          onClick={() => setStatusFilter("rejected")}
        >
          Rejected
        </button>
      </div>

      {error && <p className="relations__error">{error}</p>}

      <div className="relations__section">
        <h2 className="relations__subtitle">Sent Relations</h2>

        {filteredSentRelations.length === 0 ? (
          <p className="relations__empty">No sent relations found.</p>
        ) : (
          <div className="relations__list">
            {filteredSentRelations.map((relation) => (
              <article key={relation.id} className="relations__card">
                <p>
                  <strong>Project:</strong>{" "}
                  {relation.need?.title || "Unknown project"}
                </p>

                <p>
                  <strong>
                    {user?.role === "expert" ? "Client" : "Expert"}:
                  </strong>{" "}
                  {relation.receiver?.email ||
                    relation.requester?.email ||
                    "Unknown user"}
                </p>
                <p className="relations__status">
                  <span
                    className={`relations__badge relations__badge--${relation.status}`}
                  >
                    {relation.status.charAt(0).toUpperCase() + relation.status.slice(1)}
                  </span>
                </p>
                <p>
                  <strong>Message:</strong> {relation.message}
                </p>

                {relation.status === "accepted" && (
                  <Link
                    to={`/messages?relationId=${relation.id}`}
                    className="relations__message-link"
                  >
                    Open Messages
                  </Link>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="relations__section">
        <h2 className="relations__subtitle">Received Relations</h2>

        {filteredReceivedRelations.length === 0 ? (
          <p className="relations__empty"> No sent relations yet.</p>
        ) : (
          <div className="relations__list">
            {filteredReceivedRelations.map((relation) => (
              <article key={relation.id} className="relations__card">
                <p>
                  <strong>Project:</strong>{" "}
                  {relation.need?.title || relation.Need?.title || "Unknown project"}
                </p>

                <p>
                  <strong>
                    {user?.role === "expert" ? "Client" : "Expert"}:
                  </strong>{" "}
                  {relation.requester?.email ||
                    relation.receiver?.email ||
                    "Unknown user"}
                </p>

                <p className="relations__status">
                  <span
                    className={`relations__badge relations__badge--${relation.status}`}
                  >
                    {relation.status.charAt(0).toUpperCase() +
                      relation.status.slice(1)}
                  </span>
                </p>

                <p>
                  <strong>Message:</strong> {relation.message}
                </p>

                {relation.status === "accepted" && (
                  <Link
                    to={`/messages?relationId=${relation.id}`}
                    className="relations__message-link"
                  >
                    Open Messages
                  </Link>
                )}

                {user?.role === "expert" && relation.status === "pending" && (
                  <div className="relations__actions">
                    <button
                      type="button"
                      className="relations__button relations__button--accept"
                      onClick={() => handleAccept(relation.id)}
                    >
                      Accept
                    </button>

                    <button
                      type="button"
                      className="relations__button relations__button--reject"
                      onClick={() => handleReject(relation.id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}