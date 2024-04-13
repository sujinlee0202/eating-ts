import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./SearchPlaceForm.module.css";
import * as InputError from "../../errors/inputErrorMessage";
import { useEffect, useState } from "react";
import { search } from "../../api/naver/search";
import { geocoder, markerMap } from "../../api/naver/map";

interface Inputs {
  place: string;
}

interface Place {
  address: string;
  category: string;
  description: string;
  link: string;
  mapx: string;
  mapy: string;
  roadAddress: string;
  telephone: string;
  title: string;
}

const SearchPlaceForm = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const [isError, setIsError] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState<Place[]>([]);

  useEffect(() => {
    if (errors.place) setIsError(true);
    else setIsError(false);
  }, [errors.place]);

  const onSubmitSearchPlace: SubmitHandler<Inputs> = (data) => {
    search(data.place).then((res) => {
      // 검색 결과를 받아옴
      const searchedItems = res.data.items.map((item: Place) => {
        // HTML 엔터티를 디코딩하여 일반 텍스트로 변환
        const encodedText = item.title;
        const div = document.createElement("div");
        div.innerHTML = encodedText;
        const decodedText = div.textContent || div.innerText || "";

        // 변환된 title을 포함한 새로운 객체 반환
        return {
          ...item,
          title: decodedText,
        };
      });

      // 변환된 검색 결과를 상태에 저장
      setSearchedPlace(searchedItems);
    });
  };

  // 장소 선택
  const handleClickPlace = (place: Place) => {
    // input text 변경
    setValue("place", place.title);

    // tm128 좌표를 naver 좌표로 변경 후 지도 불러오기
    const x = geocoder(place.mapx, place.mapy).x;
    const y = geocoder(place.mapx, place.mapy).y;

    markerMap(x, y);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitSearchPlace)}
        className={styles.form}
      >
        <label className={styles.label}>
          장소명{" "}
          <span className={styles.labelDes}>(최대 5개까지 표시됩니다.)</span>
        </label>

        {/** 장소 입력 Input */}
        <div className={styles.container}>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              placeholder='장소 이름을 입력하세요'
              className={`${styles.input} ${isError ? styles.error : null}`}
              {...register("place", {
                required: InputError.ERROR_MSG_REQUIRED,
              })}
            />
            {errors.place?.type === "required" && (
              <p className={styles.errorMessage}>{errors.place.message}</p>
            )}
          </div>
          <input
            type='submit'
            value='검색'
            className={`${styles.submit} ${isValid && styles.valid}`}
          />
        </div>
      </form>

      {/** 검색 리스트 출력 */}
      <ul className={styles.searchedList}>
        {searchedPlace.map((place: Place, index: number) => {
          return (
            <button
              key={index}
              className={styles.listButton}
              onClick={() => handleClickPlace(place)}
            >
              <li className={styles.listContent}>
                <p className={styles.placeName}>{place.title}</p>
                <p className={styles.placeAddress}>{place.roadAddress}</p>
              </li>
            </button>
          );
        })}
      </ul>

      {/** 지도 표시 영역 */}
      <div id='markerMap' className={styles.mapContainer}>
        지도가 표시될 영역입니다.
      </div>
    </>
  );
};

export default SearchPlaceForm;
