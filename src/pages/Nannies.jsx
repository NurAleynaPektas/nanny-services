import { useState } from "react";
import styles from "./Nannies.module.css";
import babysitters from "../data/babysitters.json";
import NannyCard from "../components/NannyCard";
export default function Nannies() {
  const [filter, setFilter] = useState("all");
  const visibleNannies = babysitters.slice(0, 3);
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        {/* SOL: Filters */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>Filters</p>

          <select
            className={styles.select}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
            <option value="lt10">Less than 10$</option>
            <option value="gt10">Greater than 10$</option>
            <option value="popular">Popular</option>
            <option value="notPopular">Not popular</option>
            <option value="all">Show all</option>
          </select>
        </aside>

        {/* SAĞ: Kartlar alanı */}
        <section className={styles.list}>
          {visibleNannies.map((nanny, idx) => (
            <NannyCard key={nanny.name ?? idx} nanny={nanny} />
          ))}
        </section>
      </div>

      {/* ALT: Load more */}
      <div className={styles.loadMoreWrapper}>
        <button className={styles.loadMoreBtn}>Load more</button>
      </div>
    </main>
  );
}
