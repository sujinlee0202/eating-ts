import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "./firebase";

type SignupUserInfo = {
  email: string;
  password: string;
};

const auth = getAuth(app);

export const signup = async (userInfo: SignupUserInfo) => {
  const { email, password } = userInfo;

  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        alert("이미 존재하는 이메일입니다.");
      }
    });
};
