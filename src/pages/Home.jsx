import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import nannyHome from "../assets/nannyHome.png";
export default function Home() {
  const navigate = useNavigate();
  return (
    <section className={styles.hero}>
      {/*Sol taraf */}
      <div className={styles.left}>
        <h1 className={styles.title}>Make Life Easier for the Family:</h1>
        <p className={styles.subtitle}>
          Find Babysitters Online for All Occasions
        </p>
        <button
          className={styles.ctaButton}
          onClick={() => navigate("/nannies")}
        >
          Get started →
        </button>
      </div>

      {/*Sağ taraf*/}
      <div className={styles.right}>
        <img className={styles.heroImg} src={nannyHome} alt="baby" />

        <div className={styles.infoCard}>
          <div className={styles.iconWrapper}>
            <span className={styles.checkIcon}>✔</span>
          </div>

          <div className={styles.infoText}>
            <p className={styles.infoTitle}>Experienced nannies</p>
            <p className={styles.infoNumber}>15,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
