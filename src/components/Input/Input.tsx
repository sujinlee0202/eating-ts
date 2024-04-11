import { useEffect, useState } from "react";
import styles from "./Input.module.css";

type InputFieldError = {
  type: string;
  message?: string;
};

interface Props {
  label: string;
  type: string;
  placeholder?: string;
  register: {
    name: string;
  };
  error?: InputFieldError;
}

const Input = ({ label, type, placeholder, register, error }: Props) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error) setIsError(true);
    else setIsError(false);
  }, [error]);

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${isError ? styles.error : null}`}
        {...register}
      />
      {error?.type === "required" && (
        <p className={styles.errorMessage}>{error.message}</p>
      )}
      {error?.type === "pattern" && (
        <p className={styles.errorMessage}>{error.message}</p>
      )}
      {error?.type === "maxLength" && (
        <p className={styles.errorMessage}>{error.message}</p>
      )}
      {error?.type === "minLength" && (
        <p className={styles.errorMessage}>{error.message}</p>
      )}
      {error?.type === "validate" && (
        <p className={styles.errorMessage}>{error.message}</p>
      )}
    </div>
  );
};

export default Input;
