import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nannies from "./pages/Nannies";
import Favorites from "./pages/Favorites";
import Header from "./components/Header.jsx";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nannies" element={<Nannies />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
