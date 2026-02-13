import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Nannies from "./pages/Nannies";
import Favorites from "./pages/Favorites";
import Header from "./components/Header.jsx";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./auth/AuthProvider";

import "./App.css";

function RequireAuth({ children, booting, user, openAuth }) {
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    if (!booting && !user && !asked) {
      openAuth("login");
      setAsked(true);
    }
  }, [booting, user, asked, openAuth]);

  if (booting) return null; 
  if (!user) return <Navigate to="/" replace />;

  return children;
}

function App() {
  const { user, booting } = useAuth();

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const closeAuth = () => setAuthOpen(false);

  return (
    <div className="page">
      <Header openAuth={openAuth} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nannies" element={<Nannies openAuth={openAuth} />} />

        <Route
          path="/favorites"
          element={
            <RequireAuth booting={booting} user={user} openAuth={openAuth}>
              <Favorites openAuth={openAuth} />
            </RequireAuth>
          }
        />
      </Routes>

      {authOpen && (
        <AuthModal
          mode={authMode}
          onClose={closeAuth}
          onSwitchMode={(m) => setAuthMode(m)}
          onSuccess={() => {
            closeAuth();
          }}
        />
      )}
    </div>
  );
}

export default App;
