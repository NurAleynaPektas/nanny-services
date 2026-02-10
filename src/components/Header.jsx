import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import AuthModal from "./AuthModal";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"

  const headerRef = useRef(null);

  /* ------------------------
     AUTH HANDLERS
  ------------------------- */
  const handleLoginClick = () => {
    setAuthMode("login");
    setAuthOpen(true);
    setMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setAuthMode("register");
    setAuthOpen(true);
    setMenuOpen(false);
  };

  /* ------------------------
     MENU AUTO CLOSE ON ROUTE
  ------------------------- */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* ------------------------
     ESC + OUTSIDE CLICK
  ------------------------- */
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const onClickOutside = (e) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={isHome ? styles.headerHomeWrap : styles.headerDefaultWrap}
      >
        <div className={isHome ? styles.headerHome : styles.headerDefault}>
          {/* LOGO */}
          <div className={styles.logo} onClick={() => navigate("/")}>
            Nanny.Services
          </div>

          {/* DESKTOP NAV */}
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

          {/* ACTIONS */}
          <div className={styles.actions}>
            {/* MOBILE / TABLET BURGER */}
            <button
              className={styles.burger}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
            </button>

            {/* DESKTOP BUTTONS */}
            <div className={styles.desktopActions}>
              <button className={styles.loginBtn} onClick={handleLoginClick}>
                Log In
              </button>
              <button
                className={`${styles.loginBtn} ${styles.primaryBtn}`}
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </div>
          </div>
        </div>

        {/* DROPDOWN (MOBILE / TABLET) */}
        {menuOpen && (
          <div className={styles.dropdown}>
            <nav className={styles.dropdownNav}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.dropdownLink} ${styles.dropdownActive}`
                    : styles.dropdownLink
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/nannies"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.dropdownLink} ${styles.dropdownActive}`
                    : styles.dropdownLink
                }
              >
                Nannies
              </NavLink>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.dropdownLink} ${styles.dropdownActive}`
                    : styles.dropdownLink
                }
              >
                Favorites
              </NavLink>
            </nav>

            <div className={styles.dropdownActions}>
              <button
                className={styles.loginBtnLight}
                onClick={handleLoginClick}
              >
                Log In
              </button>
              <button
                className={`${styles.loginBtnLight} ${styles.primaryBtnLight}`}
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* AUTH MODAL */}
      {authOpen && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthOpen(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </>
  );
}
