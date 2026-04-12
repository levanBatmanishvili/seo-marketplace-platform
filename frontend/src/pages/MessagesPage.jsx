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
  const [relation, setRelation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const otherUser =
    relation?.requester?.id === user?.id
      ? relation?.receiver
      : relation?.requester;

  useEffect(() => {
    if (!relationId) return;

    let intervalId;
    async function fetchMessages() {
      try {
        const data = await getMessagesByRelation(relationId);
        setMessages(data.messages || []);
        setRelation(data.relation || null);
        setError("");
      } catch (err) {
        setError(err.message);
        setMessages([]);
        setRelation(null);
      }
    }

    fetchMessages();
    intervalId = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [relationId]);

  async function handleSendMessage(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await sendMessage({
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

      <p className="messages-page__subtitle">
        {otherUser
          ? `Conversation with ${
              otherUser.profile?.displayName || otherUser.email
            }`
          : relationId
          ? "Loading conversation..."
          : "Select a relation to load messages."}
      </p>

      <div className="messages-page__controls">
        <input
          type="number"
          placeholder="Enter relation ID"
          value={relationId}
          onChange={(e) => setRelationId(e.target.value)}
          className="messages-page__input"
        />
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
            <article key={message.id}
            className={`messages-page__card ${
              message.senderId === user?.id
                ? "messages-page__card--own"
                : "messages-page__card--other"
            }`}>
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
