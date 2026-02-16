import { useEffect, useState } from "react";
import styles from "./NannyCard.module.css";
import AppointmentForm from "./AppointmentForm";
import { isFavorite, toggleFavorite } from "../utils/favorites";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { useAuth } from "../auth/AuthProvider";

export default function NannyCard({ nanny, openAuth }) {
  const { user, booting } = useAuth();
  const uid = user?.uid;

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [favorite, setFavorite] = useState(() => isFavorite(uid, nanny?.name));

  useEffect(() => {
    setFavorite(isFavorite(uid, nanny?.name));
  }, [uid, nanny?.name]);

  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  const onToggleFavorite = () => {
    if (booting) return;

    if (!user) {
      iziToast.warning({
        title: "Login required",
        message: "Please log in to add favorites.",
        position: "topRight",
        timeout: 2200,
      });
      openAuth?.("login");
      return;
    }

    const nextFavorite = !favorite;

    toggleFavorite(uid, nanny);
    setFavorite(nextFavorite);

    if (nextFavorite) {
      iziToast.success({
        title: "Added",
        message: "Added to favorites.",
        position: "topRight",
        timeout: 1600,
      });
    } else {
      iziToast.info({
        title: "Removed",
        message: "Removed from favorites.",
        position: "topRight",
        timeout: 1600,
      });
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <img
          src={nanny.avatar_url}
          alt={nanny.name}
          className={styles.avatar}
        />

        <div className={styles.mainInfo}>
          <h3 className={styles.name}>{nanny.name}</h3>
          <p className={styles.location}>{nanny.location}</p>
        </div>

        <span className={styles.price}>${nanny.price_per_hour}/hr</span>

        <button
          type="button"
          className={`${styles.favBtn} ${favorite ? styles.favActive : ""}`}
          onClick={onToggleFavorite}
          disabled={booting}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          title={
            booting
              ? "Loading..."
              : user
                ? favorite
                  ? "Remove from favorites"
                  : "Add to favorites"
                : "Log in to add favorites"
          }
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>

      <div className={styles.meta}>
        <span>Experience: {nanny.experience} yrs</span>
        <span>Kids age: {nanny.kids_age}</span>
        <span>Rating: {nanny.rating}</span>
      </div>

      <p className={styles.about}>
        {isOpen ? nanny.about : `${nanny.about.slice(0, 120)}...`}
      </p>

      {isOpen && (
        <div className={styles.extra}>
          <p>
            <strong>Education:</strong> {nanny.education}
          </p>

          <p>
            <strong>Characters:</strong>{" "}
            {Array.isArray(nanny.characters)
              ? nanny.characters.join(", ")
              : nanny.characters}
          </p>

          <div className={styles.reviews}>
            <p className={styles.reviewsTitle}>
              <strong>Reviews:</strong>
            </p>

            {Array.isArray(nanny.reviews) && nanny.reviews.length > 0 ? (
              nanny.reviews.map((r, idx) => (
                <div
                  key={`${r.reviewer ?? "review"}-${idx}`}
                  className={styles.reviewItem}
                >
                  <p className={styles.reviewTop}>
                    <span>
                      <strong>{r.reviewer}</strong>
                    </span>
                    <span>⭐ {r.rating}</span>
                  </p>
                  <p className={styles.reviewComment}>{r.comment}</p>
                </div>
              ))
            ) : (
              <p className={styles.reviewComment}>No reviews</p>
            )}
          </div>

          <button
            className={styles.appointmentBtn}
            onClick={() => setIsModalOpen(true)}
          >
            Make an appointment
          </button>
        </div>
      )}

      <button
        className={styles.readMoreBtn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "Show less" : "Read more"}
      </button>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <h3 className={styles.modalTitle}>Make an appointment</h3>

            <AppointmentForm
              nannyName={nanny.name}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </article>
  );
}
