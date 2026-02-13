import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { useAuth } from "../auth/AuthProvider";

export default function Header({ openAuth }) {
  const { user, logout, booting } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const handleLoginClick = () => {
    openAuth?.("login");
    setMenuOpen(false);
  };

  const handleRegisterClick = () => {
    openAuth?.("register");
    setMenuOpen(false);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      setMenuOpen(false);
      navigate("/");
    } catch {
      // istersen toast
    }
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onClickOutside = (e) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target)) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [menuOpen]);

  const displayName = user?.displayName || user?.email || "Account";

  return (
    <header
      ref={headerRef}
      className={isHome ? styles.headerHomeWrap : styles.headerDefaultWrap}
    >
      <div className={isHome ? styles.headerHome : styles.headerDefault}>
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

        <div className={styles.actions}>
          <button
            className={styles.burger}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>

          {/* ✅ Desktop actions */}
          <div className={styles.desktopActions}>
            {!booting && user ? (
              <>
                <button
                  className={styles.loginBtn}
                  onClick={() => navigate("/favorites")}
                >
                  {displayName}
                </button>
                <button
                  className={`${styles.loginBtn} ${styles.primaryBtn}`}
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className={styles.loginBtn} onClick={handleLoginClick}>
                  Log In
                </button>
                <button
                  className={`${styles.loginBtn} ${styles.primaryBtn}`}
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Mobile dropdown */}
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
            {!booting && user ? (
              <>
                <button
                  className={styles.loginBtnLight}
                  onClick={() => navigate("/favorites")}
                >
                  {displayName}
                </button>
                <button
                  className={`${styles.loginBtnLight} ${styles.primaryBtnLight}`}
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
