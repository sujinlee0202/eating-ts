import styles from "./addplace.module.css";
import SearchPlaceForm from "../../components/SearchPlaceForm/SearchPlaceForm";
import AddPlaceInfoForm from "../../components/AddPlaceInfoForm/AddPlaceInfoForm";

const Addplace = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>장소 추가하기</h1>
      {/** 장소 검색 Form */}
      <SearchPlaceForm />

      {/** 정보 입력 Form */}
      <AddPlaceInfoForm />
    </div>
  );
};

export default Addplace;
