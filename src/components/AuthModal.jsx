import { useEffect } from "react";
import styles from "./AuthModal.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ mode = "login", onClose, onSwitchMode }) {
  /* ESC + body scroll lock */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className={styles.top}>
          <h3 className={styles.title}>
            {mode === "login" ? "Log In" : "Create account"}
          </h3>

          <p className={styles.sub}>
            {mode === "login"
              ? "Welcome back. Please enter your details."
              : "Create your account to book a nanny."}
          </p>
        </div>

        {mode === "login" ? (
          <LoginForm
            onSuccess={onClose}
            onSwitch={() => onSwitchMode("register")}
          />
        ) : (
          <RegisterForm
            onSuccess={onClose}
            onSwitch={() => onSwitchMode("login")}
          />
        )}
      </div>
    </div>
  );
}
