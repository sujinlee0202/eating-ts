import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { app } from ".";

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

export const downloadFile = async (placename: string) => {
  const listRef = ref(storage, `images/${placename}`);
  const urls: string[] = [];

  try {
    const res = await listAll(listRef);
    await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        urls.push(url);
      })
    );
    return urls;
  } catch (error) {
    console.error("Error downloading files:", error);
    throw error;
  }
};
