import { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorites";
import NannyCard from "../components/NannyCard";
import { useAuth } from "../auth/AuthProvider";

export default function Favorites({ openAuth }) {
  const { user, booting } = useAuth();
  const uid = user?.uid;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (booting) return;
    setFavorites(getFavorites(uid));
  }, [booting, uid]);

  useEffect(() => {
    if (!uid) return;

    const onStorage = (e) => {
      if (e.key === `favorite-nannies:${uid}`) {
        setFavorites(getFavorites(uid));
      }
    };

    const onSameTab = () => {
      setFavorites(getFavorites(uid));
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("favorites-changed", onSameTab);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("favorites-changed", onSameTab);
    };
  }, [uid]);

  if (booting) return <main style={{ paddingTop: 120 }} />;

  if (!user) {
    return (
      <main style={{ paddingTop: 120 }}>
        <p>Login required to view favorites.</p>
        <button onClick={() => openAuth?.("login")}>Log In</button>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 120 }}>
      {favorites.length === 0 ? (
        <p>No favorites yet ⭐</p>
      ) : (
        favorites.map((nanny, idx) => (
          <NannyCard
            key={nanny.name ?? idx}
            nanny={nanny}
            openAuth={openAuth}
          />
        ))
      )}
    </main>
  );
}
