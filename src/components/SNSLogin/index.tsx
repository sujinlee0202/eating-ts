import googleLogin from "../../assets/google_login.png";
import naverLogin from "../../assets/naver_login.png";
import styles from "./index.module.css";

const SNSLogin = () => {
  const handleGoogleLogin = () => {
    alert("업데이트 예정입니다.");
  };

  const handleNaverLogin = () => {
    alert("업데이트 예정입니다.");
  };

  return (
    <div className={styles.SNSLogin}>
      <p className={styles.SNSLoginText}>SNS 계정으로 회원가입 하기</p>
      <div className={styles.loginWrapper}>
        <button className={styles.loginButton} onClick={handleGoogleLogin}>
          <img
            src={googleLogin}
            alt='google 회원가입'
            className={styles.snsIcon}
          ></img>
        </button>
        <button className={styles.loginButton} onClick={handleNaverLogin}>
          <img
            src={naverLogin}
            alt='naver 회원가입'
            className={styles.snsIcon}
          ></img>
        </button>
      </div>
    </div>
  );
};

export default SNSLogin;
