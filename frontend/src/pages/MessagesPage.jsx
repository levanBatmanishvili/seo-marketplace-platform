import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getMessagesByRelation,
  sendMessage,
} from "../services/messageService";
import "../styles/messages.css";

export default function MessagesPage() {
  const [searchParams] = useSearchParams();
  const [relationId, setRelationId] = useState(
    searchParams.get("relationId") || ""
  );
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  

  useEffect(() => {
    async function fetchMessages() {
      if (!relationId) return;
  
      try {
        const data = await getMessagesByRelation(relationId);
        setMessages(data.messages || []);
      } catch (err) {
        setError(err.message);
        setMessages([]);
      }
    }
  
    fetchMessages();
  }, [relationId]);

  async function handleLoadMessages() {
    setError("");

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

    try {
      const data = await sendMessage({
        relationId: Number(relationId),
        content,
      });

      setMessages((prev) => [...prev, data.messageData]);
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="messages-page">
      <h1 className="messages-page__title">Messages</h1>

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

      <div className="messages-page__list">
        {messages.length === 0 ? (
          <p className="messages-page__empty">No messages found.</p>
        ) : (
          messages.map((message) => (
            <article key={message.id} className="messages-page__card">
              <p>
                <strong>Sender ID:</strong> {message.senderId}
              </p>
              <p>{message.content}</p>
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