import styles from "./index.module.css";

import { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";

import { PlaceReview } from "@type/place";
import { downloadFile } from "@api/firebase/storage";
import ImageCaruosel from "../ImageCarousel";

interface Props {
  place: PlaceReview;
  onClickDetail: (id: string) => void;
}

const StoreCard = ({ place, onClickDetail }: Props) => {
  const { data } = useQuery({
    queryKey: ["images", place.id],
    queryFn: () => downloadFile(place.title),
  });

  const [saved, setSaved] = useState(false);
  const { title, category, review } = place;

  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  const handleDetailClick = () => {
    onClickDetail(place.id);
  };

  return (
    <div className={styles.container} onClick={handleDetailClick}>
      <div className={styles.imageWrapper}>
        {data && <ImageCaruosel imageUrl={data} />}
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
