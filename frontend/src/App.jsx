import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProfilePage from "./pages/MyProfilePage";
import MyNeedsPage from "./pages/MyNeedsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute> <DashboardPage /> </ProtectedRoute> }/>
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <MyProfilePage />
    </ProtectedRoute>
  }
/>
<Route
  path="/needs"
  element={
    <ProtectedRoute>
      <MyNeedsPage />
    </ProtectedRoute>
  }
/>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
}