import { useEffect, useState } from "react";
import { getMyProfile, createProfile } from "../services/profileService";
import "../styles/profile.css";

export default function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    avatarUrl: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getMyProfile();
        setProfile(data.profile);
      } catch (err) {
        setProfile(null);
      }
    }

    fetchProfile();
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
      const data = await createProfile(formData);
      setProfile(data.profile);
    } catch (err) {
      setError(err.message);
    }
  }

  if (profile) {
    return (
      <section className="profile">
        <h1>My Profile</h1>
        <p>Name: {profile.displayName}</p>
        <p>Bio: {profile.bio}</p>
        <p>Avatar: {profile.avatarUrl}</p>
      </section>
    );
  }

  return (
    <section className="profile">
      <h1>Create Profile</h1>

      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="displayName"
          placeholder="Display name"
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          onChange={handleChange}
        />

        <input
          type="text"
          name="avatarUrl"
          placeholder="Avatar URL"
          onChange={handleChange}
        />

        <button type="submit">Create Profile</button>
      </form>

      {error && <p>{error}</p>}
    </section>
  );
}