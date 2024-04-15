import { PlaceReview } from "./../../types/place";
// import gravatar from "gravatar";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { app } from ".";
import { User } from "firebase/auth";

const db = getFirestore(app);

// 회원가입한 유저 firestore에 저장
export const setUser = async (user: User) => {
  const email: string | null = user.email;
  const userRef = collection(db, "user");
  const userObject = {
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    admin: false,
  };

  if (email) {
    await setDoc(doc(userRef, email), userObject);
  }
};

// firestore에서 User 불러오기
export const getUser = async (email: string) => {
  const userRef = doc(db, "user", email);
  const userDocSnap = await getDoc(userRef);

  if (userDocSnap.exists()) return userDocSnap.data();
  else return undefined;
};

// place review 저장
export const setPlace = async (placeReview: PlaceReview) => {
  const placeReviewRef = collection(db, "place");
  await setDoc(doc(placeReviewRef, placeReview.title), placeReview);
};

// place review 불러오기
export const getPlace = async () => {
  const PlaceReviewRef = doc(db, "place");
  const placeReviewDocSnap = await getDoc(PlaceReviewRef);

  if (placeReviewDocSnap.exists()) return placeReviewDocSnap.data();
  else return undefined;
};
