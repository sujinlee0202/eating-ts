import googleLogin from "../../assets/google_login.png";
import styles from "./SNSLogin.module.css";

const SNSLogin = () => {
  const handleGoogleLogin = () => {
    console.log("SNS 회원가입");
  };

  return (
    <div className={styles.SNSLogin}>
      <p className={styles.SNSLoginText}>SNS 계정으로 회원가입 하기</p>
      <button className={styles.googleLoginButton} onClick={handleGoogleLogin}>
        <img
          src={googleLogin}
          alt='google 회원가입'
          className={styles.googleImage}
        ></img>
      </button>
    </div>
  );
};

export default SNSLogin;
