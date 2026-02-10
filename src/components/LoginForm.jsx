import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./AuthModal.module.css";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginForm({ onSuccess, onSwitch }) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      validateOnBlur
      validateOnChange={false}
      onSubmit={(values, { setSubmitting }) => {
        try {
       
          localStorage.setItem(
            "nanny-auth",
            JSON.stringify({
              email: values.email.trim(),
            }),
          );

          onSuccess();
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
          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* SUBMIT */}
          <button
            className={styles.submitBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>

          {/* SWITCH */}
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
