import { useLocation } from "react-router-dom";
import { PlaceReview } from "../../types/place";

const HomeTab = () => {
  const location = useLocation();
  const { address }: PlaceReview = location.state;

  return (
    <div>
      <div>
        <div>
          <div>icon</div>
          <p>{address}</p>
        </div>
        <div>
          <div>icon</div>
          <p>영업시간</p>
        </div>
        <div>
          <div>icon</div>
          <p>전화번호</p>
        </div>
      </div>
      <div>메뉴</div>
    </div>
  );
};

export default HomeTab;
