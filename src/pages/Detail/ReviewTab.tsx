import { useLocation } from "react-router-dom";
import { PlaceReview } from "../../types/place";

const ReviewTab = () => {
  const location = useLocation();
  const { review }: PlaceReview = location.state;

  return <div>{review}</div>;
};

export default ReviewTab;
