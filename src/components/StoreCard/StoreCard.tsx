import { useState } from "react";
import styles from "./StoreCard.module.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import store1 from "../../assets/store1_1.jpg";

const StoreCard = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={store1} className={styles.image} alt='가게명' />
      </div>
      <div className={styles.storeInfo}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>방콕상회</p>
          <p className={styles.category}>태국음식</p>
        </div>
        {saved ? (
          <AiFillStar onClick={handleSave} />
        ) : (
          <AiOutlineStar onClick={handleSave} />
        )}
      </div>
      <p className={`${styles.storeDesc} ${styles.ellipsis}`}>
        식당 소개글 식당 소개글 식당 소개글 식당 소개글 식당 소개글 식당 소개글
      </p>
    </div>
  );
};

export default StoreCard;
