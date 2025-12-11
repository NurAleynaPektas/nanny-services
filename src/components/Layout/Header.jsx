import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    console.log("openLogin");
  };

  const handleRegisterClick = () => {
    console.log("openRegister");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        Nanny.Services
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/nannies"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Nannies
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Favorites
        </NavLink>
      </nav>

      <div className={styles.acitons}>
        <button className={styles.loginBtn} onClick={handleLoginClick}>
          LogIn
        </button>
        <button
          className={`${styles.loginBtn} ${styles.primaryBtn}`}
          onClick={handleRegisterClick}
        >
          Register
        </button>
      </div>
    </header>
  );
}