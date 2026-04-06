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
  const [relations, setRelations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRelations() {
      try {
        const data = await getMyRelations();
        setRelations(data.relations);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchRelations();
  }, []);

  async function handleAccept(relationId) {
    try {
      const data = await acceptRelation(relationId);

      setRelations((prev) =>
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

      setRelations((prev) =>
        prev.map((relation) =>
          relation.id === relationId ? data.relation : relation
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="relations">
      <h1 className="relations__title">My Relations</h1>

      {error && <p className="relations__error">{error}</p>}

      <div className="relations__list">
        {relations.length === 0 ? (
          <p className="relations__empty">No relations found.</p>
        ) : (
          relations.map((relation) => (
            <article key={relation.id} className="relations__card">
              <p>
                <strong>Relation ID:</strong> {relation.id}
              </p>
              <p>
                <strong>Need ID:</strong> {relation.needId}
              </p>
              <p>
                <strong>Status:</strong> {relation.status}
              </p>
              <p>
                <strong>Message:</strong> {relation.message}
              </p>

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
          ))
        )}
      </div>
    </section>
  );
}