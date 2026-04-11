import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>

      <p className="dashboard__welcome">
        Welcome back, {user?.email}
      </p>

      <p className="dashboard__role">
        Signed in as <strong>{user?.role}</strong>
      </p>

      <p className="dashboard__intro">
        Manage your profile, relations, and conversations from one place.
      </p>

      <div className="dashboard__grid">
        <Link to="/profile" className="dashboard__card">
          <h2 className="dashboard__card-title">My Profile</h2>
          <p className="dashboard__card-text">
            View and update your personal information.
          </p>
        </Link>

        {user?.role === "client" && (
          <Link to="/needs" className="dashboard__card">
            <h2 className="dashboard__card-title">My Needs</h2>
            <p className="dashboard__card-text">
              Create and manage your SEO project requests.
            </p>
          </Link>
        )}

        {user?.role === "client" && (
          <Link to="/browse-experts" className="dashboard__card">
            <h2 className="dashboard__card-title">Browse Experts</h2>
            <p className="dashboard__card-text">
              Find SEO experts and send collaboration requests.
            </p>
          </Link>
        )}

        {user?.role === "expert" && (
          <Link to="/browse-needs" className="dashboard__card">
            <h2 className="dashboard__card-title">Browse Needs</h2>
            <p className="dashboard__card-text">
              Discover client requests and offer your expertise.
            </p>
          </Link>
        )}

        <Link to="/relations" className="dashboard__card">
          <h2 className="dashboard__card-title">My Relations</h2>
          <p className="dashboard__card-text">
            Track pending, accepted, and rejected requests.
          </p>
        </Link>

        <Link to="/messages" className="dashboard__card">
          <h2 className="dashboard__card-title">Messages</h2>
          <p className="dashboard__card-text">
            Open your accepted conversations and continue discussions.
          </p>
        </Link>
      </div>
    </section>
  );
}