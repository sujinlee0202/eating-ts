import styles from "./index.module.css";

const Comment = () => {
  return (
    <div>
      <p>
        [임시 댓글] 저도 여기자주가요~ 맛있고 저렴해서 너무 좋아요!! 벌써 N번째
        방문했어요
      </p>
      <div className={styles.profileWrapper}>
        <div className={styles.profileImage}></div>
        <div>
          <p className={styles.id}>ididid</p>
          <p className={styles.date}>2024.5.31</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
