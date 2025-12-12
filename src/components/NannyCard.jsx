import styles from "./NannyCard.module.css";

export default function NannyCard({ nanny }) {
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

      <p className={styles.about}>{nanny.about.slice(0, 120)}...</p>

      <button className={styles.readMoreBtn}>Read more</button>
    </article>
  );
}
