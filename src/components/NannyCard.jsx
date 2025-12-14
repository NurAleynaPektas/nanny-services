import { useState } from "react";
import styles from "./NannyCard.module.css";

export default function NannyCard({ nanny }) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <article className={styles.card}>
      {/* ÜST KISIM */}
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
      </div>
      {/* ALT KISIM */}
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

                {Array.isArray(nanny.reviews) ? (
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
            </div>
          )}

          <p>
            <strong>Characters:</strong> {nanny.characters.join(", ")}
          </p>
        </div>
      )}
      <button
        className={styles.readMoreBtn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "Show less" : "Read more"}
      </button>
      {isOpen && (
        <button className={styles.appointmentBtn}>Make an appointment</button>
      )}
    </article>
  );
}
