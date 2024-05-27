import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./detail.module.css";
import { useEffect, useRef, useState } from "react";
import { clickPlaceMap, geocoder } from "../../api/naver/map";
import ImageCaruosel from "../../components/ImageCarousel/ImageCaruosel";
import { downloadFile } from "../../api/firebase/storage";
import { PlaceReview } from "../../types/place";

const Detail = () => {
  const location = useLocation();
  const { title, mapx, mapy, id }: PlaceReview = location.state;
  const clickedGeocoder = geocoder(mapx, mapy);
  const [images, setImages] = useState<string[]>();
  const [showUI, setShowUI] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = detailRef.current?.scrollTop;
      // 스크롤 위치가 특정 값 이상이면 UI를 보여줌
      if (scrollPosition) {
        setShowUI(true);
      } else {
        setShowUI(false);
      }
    };

    // Detail 컴포넌트의 스크롤 이벤트를 감지
    detailRef.current?.addEventListener("scroll", handleScroll);
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  useEffect(() => {
    clickPlaceMap(clickedGeocoder.x, clickedGeocoder.y);
  }, [clickedGeocoder]);

  useEffect(() => {
    downloadFile(title).then((data) => setImages(data));
  }, [title]);

  return (
    <div className={styles.container} ref={detailRef}>
      <div className={styles.imageContainer}>
        {images && <ImageCaruosel imageUrl={images} />}
      </div>
      <div className={styles.placeWrapper}>
        <p className={styles.title}>가게명</p>
        <p className={styles.category}>카테고리</p>
        <p className={styles.description}>한줄 설명 한줄 설명 한줄 설명</p>
      </div>
      <div className={styles.detailTab}>
        <NavLink
          to={`/place/${id}/home`}
          className={styles.homeTab}
          state={location.state}
        >
          홈
        </NavLink>
        <NavLink
          to={`/place/${id}/review`}
          className={styles.reviewTab}
          state={location.state}
        >
          리뷰
        </NavLink>
        <NavLink
          to={`/place/${id}/photo`}
          className={styles.photoTab}
          state={location.state}
        >
          사진
        </NavLink>
      </div>
      {showUI && <div>스크롤되었다!</div>}
      <Outlet />
    </div>
  );
};

export default Detail;
