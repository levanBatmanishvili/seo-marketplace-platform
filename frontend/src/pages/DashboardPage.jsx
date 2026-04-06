import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>

      <p className="dashboard__welcome">
        Welcome {user?.email}
      </p>

      <p className="dashboard__role">
        Role: {user?.role}
      </p>

      <div className="dashboard__grid">
      <Link to="/profile" className="dashboard__card">
        My Profile
        </Link>
      <Link to="/needs" className="dashboard__card">
        My Needs
        </Link>
      <Link to="/relations" className="dashboard__card">
        My Relations
        </Link>
      <Link to="/messages" className="dashboard__card">
        Messages
        </Link>
        <Link to="/browse-needs" className="dashboard__card">
         Browse Needs
        </Link>
      </div>
    </section>
  );
}