import { useLocation } from "react-router-dom";
import { PlaceReview } from "../../types/place";
import styles from "./ReviewTab.module.css";
import Comment from "../../components/Comment";

const ReviewTab = () => {
  const location = useLocation();
  const { review }: PlaceReview = location.state;

  return (
    <div className={styles.container}>
      <div className={styles.reviewContainer}>
        <p className={styles.title}>리뷰</p>
        <pre className={styles.review}>{review}</pre>
      </div>
      <div className={styles.commentContainer}>
        <div className={styles.commentTitleWrapper}>
          <p className={styles.title}>댓글</p>
          <button className={styles.createComment}>작성하기</button>
        </div>
        {/** 임시 댓글 기능 */}
        <Comment />
      </div>
    </div>
  );
};

export default ReviewTab;
