import { useEffect, useState } from "react";
import styles from "./StoreCard.module.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { PlaceReview } from "../../types/place";
import { downloadFile } from "../../api/firebase/storage";
import ImageCaruosel from "../ImageCarousel/ImageCaruosel";

interface Props {
  place: PlaceReview;
}

const StoreCard = ({ place }: Props) => {
  const [saved, setSaved] = useState(false);
  const [images, setImages] = useState<string[]>();

  const { title, category, review } = place;

  useEffect(() => {
    downloadFile(title).then((data) => setImages(data));
  }, [title]);

  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {images && <ImageCaruosel imageUrl={images} />}
      </div>
      <div className={styles.storeInfo}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{title}</p>
          <p className={styles.category}>{category}</p>
        </div>
        {saved ? (
          <AiFillStar onClick={handleSave} />
        ) : (
          <AiOutlineStar onClick={handleSave} />
        )}
      </div>
      <div className={styles.reviewContainer}>
        <div className={styles.reviewArrow}></div>
        <p className={`${styles.ellipsis}`}>{review}</p>
      </div>
    </div>
  );
};

export default StoreCard;
