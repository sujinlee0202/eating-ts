import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

export const uploadFile = async (
  placename: string,
  images: File[] | undefined
) => {
  if (!images) return;

  const uploadedFiles = Array.from(images).map(async (item) => {
    return await uploadBytes(
      ref(storage, `images/${placename}/${item.name}`),
      item
    );
  });

  // 모든 파일 업로드가 완료될 때까지 기다린 후 파일 반환
  return Promise.all(uploadedFiles);
};
