import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import {
  HomePage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  MyProfilePage,
  MyNeedsPage,
  RelationsPage,
  MessagesPage,
  NotFoundPage,
  BrowseNeedsPage,
  BrowseExpertsPage,
  ExpertProfilePage,
} from "./pages";

export default function App() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

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

        <Route
          path="/relations"
          element={
            <ProtectedRoute>
              <RelationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browse-needs"
          element={
            <ProtectedRoute>
              <BrowseNeedsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/browse-experts"
          element={
            <ProtectedRoute>
              <BrowseExpertsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/experts/:id"
          element={
            <ProtectedRoute>
              <ExpertProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
