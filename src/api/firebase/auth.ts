import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { app } from "./firebase";
import { getUser } from "./firestore";

type useIdPassword = {
  email: string;
  password: string;
};

const auth = getAuth(app);

// ID/PW를 통한 회원가입
export const signup = async (userInfo: useIdPassword) => {
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

// ID/PW를 통한 로그인
export const signinWithEmailAndPassword = async (userInfo: useIdPassword) => {
  const { email, password } = userInfo;

  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode === "auth/invalid-credential") {
        alert("비밀번호가 일치하지 않습니다.");
      }
    });
};

// 유저 상태 변경 시 호출
export const onAuthStateChange = (callback: (user: User) => void) => {
  onAuthStateChanged(auth, async (user) => {
    user && callback(user);
  });
};

// 로그아웃
export const logout = async () => {
  return signOut(auth).then(() => {});
};

// admin 판별하기
export const adminUser = (email: string) => {};
