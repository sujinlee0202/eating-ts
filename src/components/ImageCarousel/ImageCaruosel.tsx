import { useEffect, useState } from "react";
import styles from "./ImageCarousel.module.css";
import EllipsisButton from "../EllipsisButton/EllipsisButton";
import ArrowButton from "../ArrowButton/ArrowButton";

interface Props {
  imageUrl: string[];
}

const ImageCaruosel = ({ imageUrl }: Props) => {
  const PHOTO_LENGTH = imageUrl.length - 1;

  const [selectedId, setSelectedId] = useState(0); // 선택된 id , 초기값 : index 0
  const [prevId, setPrevId] = useState(PHOTO_LENGTH); // 이전 id, 초기값 : 마지막 index
  const [nextId, setNextId] = useState(1); // 다음 id, 초기값 : index 1

  // url이 변경되었을 때 (이미지 파일이 다시 선택됬을 때) 선택된 id를 0으로 초기화
  useEffect(() => {
    setSelectedId(0);
  }, [imageUrl]);

  const onClickLeftButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setSelectedId((prev) => prev - 1);
    setPrevId((prev) => {
      if (prev === 0) return PHOTO_LENGTH;
      else return prev - 1;
    });
    setNextId(selectedId);

    if (selectedId === 0) setSelectedId(PHOTO_LENGTH);

    e.preventDefault();
  };

  const onClickRightButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setSelectedId((prev) => prev + 1);
    setPrevId(selectedId);
    setNextId((prev) => {
      if (prev === PHOTO_LENGTH) return 0;
      else return prev + 1;
    });

    if (selectedId === PHOTO_LENGTH) setSelectedId(0);

    e.preventDefault();
  };

  return (
    <div className={styles.photoWrapper}>
      {/** arrow button */}
      {imageUrl.length !== 1 && (
        <>
          <div className={styles.arrowButtonConatiner}>
            <div className={styles.buttonWrapper}>
              <ArrowButton direction='left' onClick={onClickLeftButton} />
            </div>
            <div className={styles.buttonWrapper}>
              <ArrowButton direction='right' onClick={onClickRightButton} />
            </div>
          </div>

          {/** ellipsis button */}
          <EllipsisButton imageUrl={imageUrl} selectedId={selectedId} />
        </>
      )}

      {/** photos */}
      <div className={styles.photos}>
        {imageUrl.map((item: string, index: number) => (
          <div
            key={index}
            className={`
              ${styles.photo} 
              ${index === selectedId && styles.selected}
              ${index === prevId && styles.prev}
              ${index === nextId && styles.next}
            `}
          >
            <img src={item} className={styles.image}></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCaruosel;
