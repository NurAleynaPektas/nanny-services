import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./AuthModal.module.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"; 

const RegisterSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

function toastFirebaseError(err) {
  const code = err?.code || "";

  if (code === "auth/email-already-in-use")
    return "This email is already in use.";
  if (code === "auth/invalid-email") return "Invalid email address.";
  if (code === "auth/weak-password") return "Password is too weak (min 6).";
  if (code === "auth/network-request-failed")
    return "Network error. Try again.";

  return "Something went wrong. Please try again.";
}

export default function RegisterForm({ onSuccess, onSwitch }) {
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={RegisterSchema}
      validateOnBlur
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const name = values.name.trim();
          const email = values.email.trim();
          const password = values.password;
          const cred = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );

          if (name) {
            await updateProfile(cred.user, { displayName: name });
          }

          iziToast.success({
            title: "Account created!",
            message: "You registered successfully.",
            position: "topRight",
            timeout: 2200,
          });

          onSuccess?.();
        } catch (err) {
          iziToast.error({
            title: "Register failed",
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
            Name
            <input
              className={styles.input}
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nur"
              autoComplete="name"
            />
            {touched.name && errors.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </label>

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
              autoComplete="new-password"
            />
            {touched.password && errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </label>

          <label className={styles.label}>
            Confirm password
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="******"
              autoComplete="new-password"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </label>

          <button
            className={styles.submitBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>

          <p className={styles.switchText}>
            Already have an account?{" "}
            <button
              type="button"
              className={styles.switchBtn}
              onClick={onSwitch}
            >
              Log In
            </button>
          </p>
        </form>
      )}
    </Formik>
  );
}
