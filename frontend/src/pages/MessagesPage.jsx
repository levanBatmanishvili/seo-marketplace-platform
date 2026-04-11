import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMessagesByRelation, sendMessage } from "../services/messageService";
import "../styles/messages.css";

export default function MessagesPage() {
  const { user } = useAuth();

  const [searchParams] = useSearchParams();

  const [relationId, setRelationId] = useState(
    searchParams.get("relationId") || ""
  );
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [relation, setRelation] = useState(null);
  const otherUser =
    relation && user
      ? relation.requester?.id === user.id
        ? relation.receiver
        : relation.requester
      : null;

  useEffect(() => {
    async function fetchMessages() {
      if (!relationId) return;

      setError("");

      try {
        const data = await getMessagesByRelation(relationId);
        setMessages(data.messages || []);
        setRelation(data.relation || null);
      } catch (err) {
        setError(err.message);
        setMessages([]);
      }
    }

    fetchMessages();
  }, [relationId]);

  async function handleLoadMessages() {
    setError("");
    setSuccessMessage("");

    try {
      const data = await getMessagesByRelation(relationId);
      setMessages(data.messages || []);
    } catch (err) {
      setError(err.message);
      setMessages([]);
    }
  }

  async function handleSendMessage(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const data = await sendMessage({
        relationId: Number(relationId),
        content,
      });

      const refreshedData = await getMessagesByRelation(relationId);
    setMessages(refreshedData.messages || []);
    setRelation(refreshedData.relation || null);

    setContent("");
    setSuccessMessage("Message sent successfully.");
    
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="messages-page">
      <h1 className="messages-page__title">Messages</h1>

      <h2 className="messages-page__subtitle">
        {otherUser
          ? `Conversation with ${
              otherUser.profile?.displayName || otherUser.email
            }`
          : "Loading conversation..."}
      </h2>

      <div className="messages-page__controls">
        <input
          type="number"
          placeholder="Enter relation ID"
          value={relationId}
          onChange={(e) => setRelationId(e.target.value)}
          className="messages-page__input"
        />

        <button
          type="button"
          onClick={handleLoadMessages}
          className="messages-page__button"
        >
          Load Messages
        </button>
      </div>

      {error && <p className="messages-page__error">{error}</p>}
      {successMessage && (
        <p className="messages-page__success">{successMessage}</p>
      )}

      <div className="messages-page__list">
        {messages.length === 0 ? (
          <div className="messages-page__empty-state">
            <p className="messages-page__empty">
              {relationId
                ? "No messages yet. Start the conversation."
                : "No relation selected."}
            </p>

            {relationId && (
              <p className="messages-page__hint">
                Send the first message to begin the discussion.
              </p>
            )}
          </div>
        ) : (
          messages.map((message) => (
            <article key={message.id} className="messages-page__card">
              <p className="messages-page__meta">
                <strong>
                  {message.sender?.profile?.displayName ||
                    message.sender?.email ||
                    "Unknown user"}
                </strong>
              </p>
              <p className="messages-page__content">{message.content}</p>
            </article>
          ))
        )}
      </div>

      <form onSubmit={handleSendMessage} className="messages-page__form">
        <textarea
          placeholder="Write your message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="messages-page__textarea"
        />

        <button type="submit" className="messages-page__button">
          Send Message
        </button>
      </form>
    </section>
  );
}
