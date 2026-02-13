import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./AuthModal.module.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function toastFirebaseError(err) {
  const code = err?.code || "";

  if (code === "auth/invalid-credential")
    return "Email or password is incorrect.";
  if (code === "auth/user-not-found") return "No user found with this email.";
  if (code === "auth/wrong-password") return "Wrong password.";
  if (code === "auth/invalid-email") return "Invalid email address.";
  if (code === "auth/network-request-failed")
    return "Network error. Try again.";
  if (code === "auth/too-many-requests") return "Too many attempts. Try later.";

  return "Something went wrong. Please try again.";
}

export default function LoginForm({ onSuccess, onSwitch }) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      validateOnBlur
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const email = values.email.trim();
          const password = values.password;

          await signInWithEmailAndPassword(auth, email, password);

         
          iziToast.success({
            title: "Welcome!",
            message: "You are logged in successfully.",
            position: "topRight",
            timeout: 2000,
          });

          onSuccess?.();
        } catch (err) {
          iziToast.error({
            title: "Login failed",
            message: toastFirebaseError(err),
            position: "topRight",
            timeout: 2600,
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
        errors,
      }) => (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="name@mail.com"
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </label>

          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="******"
              autoComplete="current-password"
            />
            {touched.password && errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </label>

          <button
            className={styles.submitBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>

          <p className={styles.switchText}>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className={styles.switchBtn}
              onClick={onSwitch}
            >
              Register
            </button>
          </p>
        </form>
      )}
    </Formik>
  );
}
