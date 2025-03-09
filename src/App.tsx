import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import RideSearchPage from "./pages/RideSearchPage";
import OfferRidePage from "./pages/OfferRidePage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import DriverVerificationPage from "./pages/DriverVerificationPage";
import VerificationPendingPage from "./pages/VerificationPendingPage";
import RideConfirmationPage from "./pages/RideConfirmationPage";
import CreateRidePage from "./pages/CreateRidePage";
import RideDetailsPage from "./pages/RideDetailsPage";
import RideCompletionPage from "./pages/RideCompletionPage";
import { AuthProvider } from "./context/AuthContext";
import PhoneContainer from "./components/layout/PhoneContainer";
import routes from "tempo-routes";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // For demo purposes, we'll skip the auth check
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }
    >
      <>
        <Routes>
          <Route
            path="/auth"
            element={
              <PhoneContainer>
                <AuthPage />
              </PhoneContainer>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Layout>
                  <SearchPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ride-search"
            element={
              <ProtectedRoute>
                <Layout>
                  <RideSearchPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/offer-ride"
            element={
              <ProtectedRoute>
                <Layout>
                  <OfferRidePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Layout>
                  <MessagesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages/:userId"
            element={
              <ProtectedRoute>
                <Layout>
                  <MessagesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Layout>
                  <NotificationsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver-verification"
            element={
              <PhoneContainer>
                <DriverVerificationPage />
              </PhoneContainer>
            }
          />
          <Route
            path="/verification-pending"
            element={
              <PhoneContainer>
                <VerificationPendingPage />
              </PhoneContainer>
            }
          />
          <Route
            path="/ride-confirmation"
            element={
              <PhoneContainer>
                <RideConfirmationPage />
              </PhoneContainer>
            }
          />
          <Route
            path="/create-ride"
            element={
              <Layout>
                <CreateRidePage />
              </Layout>
            }
          />
          <Route
            path="/ride/:rideId"
            element={
              <Layout>
                <RideDetailsPage />
              </Layout>
            }
          />
          <Route
            path="/ride-completion/:rideId"
            element={
              <PhoneContainer>
                <RideCompletionPage />
              </PhoneContainer>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
