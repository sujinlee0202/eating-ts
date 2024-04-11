import { useEffect, useState } from "react";
import styles from "./TextArea.module.css";

type InputFieldError = {
  type: string;
  message?: string;
};

interface Props {
  label: string;
  placeholder: string;
  register: {
    name: string;
  };
  error?: InputFieldError;
}

const TextArea = ({ label, placeholder, register, error }: Props) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error) setIsError(true);
    else setIsError(false);
  }, [error]);

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <textarea
        placeholder={placeholder}
        className={`${styles.textarea} ${isError ? styles.error : null}`}
        {...register}
      />
    </div>
  );
};

export default TextArea;
