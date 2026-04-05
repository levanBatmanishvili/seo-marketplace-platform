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
      <Link to="/profile" className="dashboard__card">My Profile</Link>
        <div className="dashboard__card">My Profile</div>
        <div className="dashboard__card">My Needs</div>
        <div className="dashboard__card">My Relations</div>
        <div className="dashboard__card">Messages</div>
      </div>
    </section>
  );
}