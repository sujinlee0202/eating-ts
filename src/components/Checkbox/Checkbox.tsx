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
    <div>
      <input type='checkbox' {...register} />
      <label>{label}</label>
      <p>{error?.type === "required" && error.message}</p>
    </div>
  );
};

export default Checkbox;
