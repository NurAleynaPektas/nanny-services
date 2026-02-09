import { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorites";
import NannyCard from "../components/NannyCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "favorite-nannies") setFavorites(getFavorites());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <main style={{ paddingTop: 120 }}>
      {favorites.length === 0 ? (
        <p>No favorites yet ⭐</p>
      ) : (
        favorites.map((nanny, idx) => (
          <NannyCard key={nanny.name ?? idx} nanny={nanny} />
        ))
      )}
    </main>
  );
}
