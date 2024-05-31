import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./detail.module.css";
import { useEffect, useRef, useState } from "react";
import { clickPlaceMap, geocoder } from "../../api/naver/map";
import ImageCaruosel from "../../components/ImageCarousel/ImageCaruosel";
import { downloadFile } from "../../api/firebase/storage";
import { PlaceReview } from "../../types/place";

const Detail = () => {
  const location = useLocation();
  const { title, mapx, mapy, id, category, description }: PlaceReview =
    location.state;
  const clickedGeocoder = geocoder(mapx, mapy);
  const [images, setImages] = useState<string[]>();
  const [showUI, setShowUI] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const currentTab = location.pathname.split("/").pop();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = detailRef.current?.scrollTop;
      if (scrollPosition && scrollPosition > 0) {
        setShowUI(true);
      } else {
        setShowUI(false);
      }

      if (scrollPosition && scrollPosition >= 260) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
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
    <>
      {showUI && (
        <div
          className={`
            ${styles.scrolledHeader} 
            ${showUI ? styles.show : ""} 
            ${!isSticky && styles.shadow}
          `}
        >
          <p className={styles.scrolledHeaderText}>{title}</p>
        </div>
      )}
      <div className={styles.container} ref={detailRef}>
        <div className={styles.imageContainer}>
          {images && <ImageCaruosel imageUrl={images} />}
        </div>
        <div className={styles.placeWrapper}>
          <p className={styles.title}>{title}</p>
          <p className={styles.category}>{category}</p>
          <p className={styles.description}>
            {description} 설명 한줄 설명 한줄 설명
          </p>
        </div>
        <div className={`${styles.detailTab} ${isSticky && styles.shadow}`}>
          <NavLink
            to={`/place/${id}/home`}
            className={`
            ${styles.homeTab} 
            ${(currentTab === "home" || currentTab === id) && styles.currentTab}
          `}
            state={location.state}
          >
            <p>홈</p>
            {(currentTab === "home" || currentTab === id) && (
              <div className={styles.currentBorder}></div>
            )}
          </NavLink>
          <NavLink
            to={`/place/${id}/review`}
            className={`
            ${styles.reviewTab} 
            ${currentTab === "review" && styles.currentTab}
          `}
            state={location.state}
          >
            <p>리뷰</p>
            {currentTab === "review" && (
              <div className={styles.currentBorder}></div>
            )}
          </NavLink>
          <NavLink
            to={`/place/${id}/photo`}
            className={`
            ${styles.photoTab} 
            ${currentTab === "photo" && styles.currentTab}
          `}
            state={location.state}
          >
            <p>사진</p>
            {currentTab === "photo" && (
              <div className={styles.currentBorder}></div>
            )}
          </NavLink>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Detail;
