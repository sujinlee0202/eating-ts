import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../../assets/eating_logo.png";
import styles from "./signup.module.css";
import { useRef } from "react";
import Input from "../../components/Input/Input";
import * as InputError from "../../errors/inputErrorMessage";
import Terms from "../../components/Terms/Terms";

interface InputText {
  email: string;
  id: string;
  password: string;
  passwordCheck: string;
}

interface InputCheckbox {
  allAgreements: string;
  eatingTerms: string;
  privacyPolicy: string;
  locationServiceTerms: string;
  eventBenefitsInfo: string;
}

export interface Inputs extends InputText, InputCheckbox {}

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // firebase에 data 전달
    console.log(data);
  };

  return (
    <div>
      <img src={logo} alt='eating-logo' className={styles.logo} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='이메일 : '
          type='text'
          placeholder='E-mail를 입력하세요'
          register={register("email", {
            required: InputError.ERROR_MSG_REQUIRED,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: InputError.ERROR_MSG_EMAIL_PATTERN,
            },
          })}
          error={errors.email}
        />

        <Input
          label='아이디 : '
          type='text'
          placeholder='ID를 입력하세요'
          register={register("id", {
            required: InputError.ERROR_MSG_REQUIRED,
            maxLength: {
              value: 20,
              message: InputError.ERROR_MSG_MAX_LENGTH_20,
            },
          })}
          error={errors.id}
        />

        <Input
          label='Password : '
          type='password'
          placeholder='영문, 숫자 포함 6자 이상'
          register={register("password", {
            required: InputError.ERROR_MSG_REQUIRED,
            minLength: {
              value: 6,
              message: InputError.ERROR_MSG_PASSWORD_PATTERN,
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
              message: InputError.ERROR_MSG_PASSWORD_PATTERN,
            },
          })}
          error={errors.password}
        />

        <Input
          label='Password 확인 : '
          type='password'
          placeholder='영문, 숫자 포함 6자 이상'
          register={register("passwordCheck", {
            required: InputError.ERROR_MSG_REQUIRED,
            minLength: {
              value: 6,
              message: InputError.ERROR_MSG_PASSWORD_PATTERN,
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
              message: InputError.ERROR_MSG_PASSWORD_PATTERN,
            },
            validate: (value) => {
              if (value === passwordRef.current) return true;
              else if (value !== passwordRef.current)
                return InputError.ERROR_MSG_VALIDATE;
            },
          })}
          error={errors.passwordCheck}
        />

        {/** 이용 약관 */}
        <Terms
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />

        <input type='submit' />
      </form>
    </div>
  );
};

export default Signup;
