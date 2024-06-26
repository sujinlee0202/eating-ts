import styles from "./index.module.css";

import { FieldError } from "react-hook-form";

interface Props {
  label: string;
  register: {
    name: string;
  };
  error?: FieldError | undefined;
}

const Checkbox = ({ label, register, error }: Props) => {
  return (
    <div className={styles.container}>
      <input type='checkbox' {...register} className={styles.checkbox} />
      <label>{label}</label>
      <p className={styles.errorMessage}>
        {error?.type === "required" && error.message}
      </p>
    </div>
  );
};

export default Checkbox;
