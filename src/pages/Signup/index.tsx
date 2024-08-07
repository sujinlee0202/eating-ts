import styles from "./index.module.css";

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import gravatar from "gravatar";

import logo from "@/assets/eating_logo.png";
import * as InputError from "@/errors/inputErrorMessage";
import { signup } from "@/api/firebase/auth";
import { setUser } from "@/api/firebase/firestore";
import Input from "@/components/Input";
import Terms from "@/components/Terms";
import SNSLogin from "@/components/SNSLogin";

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
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password, id } = data;
    // firebase email, password를 통한 회원가입
    signup({ email: email, password: password }).then((user) => {
      // 회원가입한 유저를 firestore에 저장
      if (user) {
        setUser({
          ...user,
          displayName: id,
          photoURL: gravatar.url(email, {
            s: "28px",
            d: "retro",
          }),
        });
        navigate("/login");
      }
    });
  };

  return (
    <div className={styles.container}>
      <Link to='/'>
        <img src={logo} alt='eating-logo' className={styles.logo} />
      </Link>
      <div className={styles.infoLogin}>
        <p>이미 회원이신가요?</p>
        <Link to='/login' className={styles.loginButton}>
          로그인
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label='이메일'
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
          label='아이디'
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
          label='비밀번호'
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
          label='비밀번호 확인'
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

        <input
          type='submit'
          value='회원가입 하기'
          className={`${styles.submit} ${isValid && styles.valid}`}
        />
      </form>

      {/** SNS Login */}
      <SNSLogin />
    </div>
  );
};

export default Signup;
