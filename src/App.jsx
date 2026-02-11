import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Nannies from "./pages/Nannies";
import Favorites from "./pages/Favorites";
import Header from "./components/Header.jsx";
import AuthModal from "./components/AuthModal";

import "./App.css";

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"

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
        <Route path="/favorites" element={<Favorites openAuth={openAuth} />} />
      </Routes>

      {authOpen && (
        <AuthModal
          mode={authMode}
          onClose={closeAuth}
          onSwitchMode={(m) => setAuthMode(m)}
        />
      )}
    </div>
  );
}

export default App;
