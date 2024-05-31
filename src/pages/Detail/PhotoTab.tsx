import { useLocation } from "react-router-dom";
import { PlaceReview } from "../../types/place";
import { useEffect, useState } from "react";
import { downloadFile } from "../../api/firebase/storage";
import styles from "./PhotoTab.module.css";

const PhotoTab = () => {
  const location = useLocation();
  const { title }: PlaceReview = location.state;
  const [images, setImages] = useState<string[]>();

  useEffect(() => {
    downloadFile(title).then((data) => setImages(data));
  }, [title]);

  return (
    <div className={styles.container}>
      {images?.map((url) => (
        <img src={url} className={styles.photo}></img>
      ))}
    </div>
  );
};

export default PhotoTab;
