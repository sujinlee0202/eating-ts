import { PlaceReview } from "./../../types/place";
// import gravatar from "gravatar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import { app } from ".";
import { User } from "firebase/auth";
import { generateUniqueId } from "../../utils/generateUniqueId";

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
  const uniqueId = generateUniqueId();
  const placeReviewWithId = { ...placeReview, id: uniqueId };

  await setDoc(doc(placeReviewRef, placeReviewWithId.title), placeReviewWithId);
};

// place review 불러오기
export const getPlace = async () => {
  const placeQuery = query(collection(db, "place"));
  const placeSnap = await getDocs(placeQuery);

  const postData: PlaceReview[] = [];
  placeSnap.forEach((doc) => {
    postData.push(doc.data() as PlaceReview);
  });

  return postData;
};
