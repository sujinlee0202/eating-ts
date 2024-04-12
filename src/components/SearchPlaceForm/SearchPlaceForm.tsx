import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./SearchPlaceForm.module.css";
import * as InputError from "../../errors/inputErrorMessage";
import { useEffect, useState } from "react";

interface Inputs {
  place: string;
}

const SearchPlaceForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (errors.place) setIsError(true);
    else setIsError(false);
  }, [errors.place]);

  const onSubmitSearchPlace: SubmitHandler<Inputs> = (data) => {
    // data : place name
    console.log(data);
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
        <li className={styles.searchedListContent}>
          <p className={styles.searchedPlaceName}>장소명</p>
          <p className={styles.searchedPlaceAddress}>
            주소가 많이 많이 긴 상태일 때 말줄임표 사용하기 말줄임표 말줄임표
            말줄임표
          </p>
        </li>
      </ul>

      {/** 지도 표시 영역 */}
      <div className={styles.mapContainer}>지도가 표시될 영역입니다.</div>
    </>
  );
};

export default SearchPlaceForm;
