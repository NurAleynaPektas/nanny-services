import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AppointmentForm.module.css";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});

export default function AppointmentForm({ nannyName, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const onSubmit = async (values) => {
    console.log("APPOINTMENT REQUEST:", { nannyName, ...values });
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.note}>
        You are booking an appointment with <strong>{nannyName}</strong>.
      </p>

      <div className={styles.field}>
        <input
          className={styles.input}
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <input
          className={styles.input}
          placeholder="Phone number"
          {...register("phone")}
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
      </div>

      <div className={styles.field}>
        <input
          className={styles.input}
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <textarea
          className={styles.textarea}
          placeholder="Message"
          rows={4}
          {...register("message")}
        />
        {errors.message && (
          <p className={styles.error}>{errors.message.message}</p>
        )}
      </div>

      <button className={styles.submit} disabled={isSubmitting} type="submit">
        Send request
      </button>
    </form>
  );
}
