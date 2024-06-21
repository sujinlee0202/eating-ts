import styles from "./index.module.css";

import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import ImageCaruosel from "@components/ImageCarousel";
import { PlaceReview } from "@type/place";
import { useQuery } from "@tanstack/react-query";

const Detail = () => {
  const location = useLocation();
  const { title, id, category, description }: PlaceReview = location.state;
  const { data: images } = useQuery<string[]>({
    queryKey: ["images", id],
  });

  const detailRef = useRef<HTMLDivElement>(null);
  const currentTab = location.pathname.split("/").pop();

  const [showUI, setShowUI] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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
  }, []);

  return (
    <>
      {/** scroll 시 나타나는 상단 place name */}
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
      {/** Detail Page Component */}
      <div className={styles.container} ref={detailRef}>
        {/** place info */}
        <div className={styles.imageContainer}>
          {images && <ImageCaruosel imageUrl={images} />}
        </div>
        <div className={styles.placeWrapper}>
          <p className={styles.title}>{title}</p>
          <p className={styles.category}>{category}</p>
          <p className={styles.description}>{description}</p>
        </div>
        {/** tab */}
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
        {/** Tab 하위 페이지 */}
        <Outlet />
      </div>
    </>
  );
};

export default Detail;
