import styles from "./index.module.css";

import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "@assets/eating_logo.png";
import * as InputError from "@errors/inputErrorMessage";
import Input from "@components/Input";
import { signinWithEmailAndPassword } from "@api/firebase/auth";
import { loginContext } from "@context/loginContext";

interface InputText {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<InputText>({
    mode: "onChange",
  });

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const { setUser } = useContext(loginContext);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InputText> = (data) => {
    // firebase에 data 전달
    if (data) {
      signinWithEmailAndPassword({
        email: data.email,
        password: data.password,
      }).then((user) => {
        if (user) {
          sessionStorage.setItem("user", JSON.stringify({ ...user }));
          setUser(user);
          navigate("/");
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <Link to='/'>
        <img src={logo} alt='eating-logo' className={styles.logo} />
      </Link>
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

        <input
          type='submit'
          value='로그인 하기'
          className={`${styles.submit} ${isValid && styles.valid}`}
        />
      </form>

      <div className={styles.infoSignup}>
        <p>아직 회원이 아니신가요?</p>
        <Link to='/signup' className={styles.signupButton}>
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
