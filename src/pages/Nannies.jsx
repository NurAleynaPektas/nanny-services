import { useMemo, useState } from "react";
import styles from "./Nannies.module.css";
import babysitters from "../data/babysitters.json";
import NannyCard from "../components/NannyCard";

export default function Nannies({ openAuth }) {
  const [filter, setFilter] = useState("all");

  const visibleNannies = useMemo(() => {
    let list = [...babysitters];

    switch (filter) {
      case "az":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "za":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "lt10":
        list = list.filter((n) => n.price_per_hour < 10);
        break;

      case "gt10":
        list = list.filter((n) => n.price_per_hour >= 10);
        break;

      case "popular":
        list = list.filter((n) => n.rating >= 4.5);
        break;

      case "notPopular":
        list = list.filter((n) => n.rating < 4.5);
        break;

      case "all":
      default:
        break;
    }

    return list.slice(0, 6);
  }, [filter]);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>Filters</p>

          <select
            className={styles.select}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Show all</option>
            <option value="az">Name: A → Z</option>
            <option value="za">Name: Z → A</option>
            <option value="popular">Popular (4.5+)</option>
            <option value="notPopular">Less popular</option>
            <option value="lt10">Price &lt; $10</option>
            <option value="gt10">Price ≥ $10</option>
          </select>
        </aside>

        <section className={styles.list}>
          {visibleNannies.map((nanny, idx) => (
            <NannyCard
              key={nanny.name ?? idx}
              nanny={nanny}
              openAuth={openAuth}
            />
          ))}
        </section>
      </div>

      <div className={styles.loadMoreWrapper}>
        <button className={styles.loadMoreBtn}>Load more</button>
      </div>
    </main>
  );
}
