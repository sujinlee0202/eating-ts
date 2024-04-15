import styles from "./addplace.module.css";
import SearchPlaceForm from "../../components/SearchPlaceForm/SearchPlaceForm";
import AddPlaceInfoForm from "../../components/AddPlaceInfoForm/AddPlaceInfoForm";
import { useState } from "react";
import { Place } from "../../types/place";

const Addplace = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handlePlaceSelection = (place: Place) => {
    setSelectedPlace(place);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>장소 추가하기</h1>
      {/** 장소 검색 Form */}
      <SearchPlaceForm onPlaceSelect={handlePlaceSelection} />

      {/** 정보 입력 Form */}
      <AddPlaceInfoForm selectedPlace={selectedPlace} />
    </div>
  );
};

export default Addplace;
