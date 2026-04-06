import { useEffect, useState } from "react";
import { getMyNeeds, createNeed } from "../services/needService";
import "../styles/needs.css";

export default function MyNeedsPage() {
  const [needs, setNeeds] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNeeds() {
      try {
        const data = await getMyNeeds();
        setNeeds(data.needs);
      } catch (err) {
        setNeeds([]);
      }
    }

    fetchNeeds();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await createNeed(formData);
      setNeeds((prev) => [...prev, data.need]);

      setFormData({
        title: "",
        description: "",
      });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="needs">
      <h1>My Needs</h1>

      <form onSubmit={handleSubmit} className="needs-form">
        <input
          type="text"
          name="title"
          placeholder="Need title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Describe your SEO need"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Create Need</button>
      </form>

      {error && <p>{error}</p>}

      <div className="needs-list">
        {needs.map((need) => (
          <div key={need.id} className="need-card">
            <h3>{need.title}</h3>
            <p>{need.description}</p>
            <p>Status: {need.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
}