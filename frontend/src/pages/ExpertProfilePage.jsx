import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExpertProfileByUserId } from "../services/expertProfileService";
import "../styles/expert-profile.css";

export default function ExpertProfilePage() {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [expertProfile, setExpertProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchExpertProfile() {
      try {
        const data = await getExpertProfileByUserId(id);
        setProfile(data.profile);
        setExpertProfile(data.expertProfile);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchExpertProfile();
  }, [id]);

  if (error) {
    return (
      <section className="expert-profile-page">
        <p className="expert-profile-page__error">{error}</p>
      </section>
    );
  }

  if (!profile || !expertProfile) {
    return (
      <section className="expert-profile-page">
        <p className="expert-profile-page__empty">Loading expert profile...</p>
      </section>
    );
  }

  return (
    <section className="expert-profile-page">
      <h1 className="expert-profile-page__title">Expert Profile</h1>

      <div className="expert-profile-page__card">
        <p>
          <strong>Name:</strong> {profile.displayName}
        </p>
        <p>
          <strong>Bio:</strong> {profile.bio}
        </p>
        <p>
          <strong>Portfolio:</strong>{" "}
          <a
            href={expertProfile.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="expert-profile-page__link"
          >
            {expertProfile.portfolioUrl}
          </a>
        </p>
        <p>
          <strong>Experience Level:</strong> {expertProfile.experienceLevel}
        </p>
        <p>
          <strong>Specialties:</strong> {expertProfile.specialties}
        </p>
      </div>
    </section>
  );
}