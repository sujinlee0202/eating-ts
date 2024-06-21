import styles from "./PhotoTab.module.css";

import { PlaceReview } from "@type/place";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PhotoTab = () => {
  const location = useLocation();
  const { id }: PlaceReview = location.state;
  const { data: images } = useQuery<string[]>({
    queryKey: ["images", id],
  });

  return (
    <div className={styles.container}>
      {images?.map((url) => (
        <img src={url} className={styles.photo}></img>
      ))}
    </div>
  );
};

export default PhotoTab;
