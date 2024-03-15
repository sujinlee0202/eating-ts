type InputFieldError = {
  type: string;
  message?: string;
};

interface Props {
  label: string;
  type: string;
  placeholder: string;
  register: {
    name: string;
  };
  error?: InputFieldError;
}

const Input = ({ label, type, placeholder, register, error }: Props) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} {...register} />
      <p>{error?.type === "required" && error.message}</p>
      <p>{error?.type === "pattern" && error.message}</p>
      <p>{error?.type === "maxLength" && error.message}</p>
      <p>{error?.type === "minLength" && error.message}</p>
      <p>{error?.type === "validate" && error.message}</p>
    </div>
  );
};

export default Input;
