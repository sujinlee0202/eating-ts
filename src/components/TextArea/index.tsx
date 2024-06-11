import { useEffect, useState } from "react";
import styles from "./index.module.css";

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

  const textareaClassName = `
    ${styles.textarea}
    ${isError ? styles.error : null}
    ${register.name === "review" ? styles.largeTextarea : null}
    ${register.name === "menu" ? styles.smallTextarea : null}
    ${register.name === "time" ? styles.smallTextarea : null}
  `;

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <textarea
        placeholder={placeholder}
        className={textareaClassName}
        {...register}
      />
      {error?.type === "required" && (
        <p className={styles.errorMessage}>{error.message}</p>
      )}
    </div>
  );
};

export default TextArea;
