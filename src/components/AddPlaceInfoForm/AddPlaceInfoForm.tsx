import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import * as InputError from "../../errors/inputErrorMessage";
import styles from "./AddPlaceInfoForm.module.css";
import { uploadFile } from "../../api/firebase/storage";
import { useState } from "react";
import ImageCaruosel from "../ImageCarousel/ImageCaruosel";

interface Inputs {
  review: string;
  phone: string;
  time: string;
  menu: string;
  category: string;
}

const AddPlaceInfoForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const [uploadImage, setUploadImage] = useState<File[] | undefined>();
  const [imageUrl, setImageUrl] = useState<string[]>();

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray: File[] = Array.from(e.target.files);

    const imageUrlArray: string[] = [];

    for (let i = 0; i < filesArray.length; i++) {
      const reader = new FileReader();

      reader.onload = () => {
        imageUrlArray.push(reader.result as string);
        setImageUrl(imageUrlArray);
      };

      reader.readAsDataURL(filesArray[i]);
    }

    setUploadImage(filesArray);
  };

  const onSubmitAddPlace: SubmitHandler<Inputs> = (data) => {
    // place review, category, menu ...
    // TODO : 장소 추가 후 해당 장소로 이동
    console.log("submit", data);
    // TODO : 장소명 수정하기
    if (uploadImage) uploadFile("장소명", uploadImage);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitAddPlace)} className={styles.form}>
      <div className={styles.fileInputContainer}>
        <label className={styles.label}>사진 업로드</label>
        <input type='file' multiple onChange={handleUploadImage}></input>
      </div>

      {/** 이미지 미리보기 캐러셀 */}
      <div className={styles.photoContainer}>
        {imageUrl && <ImageCaruosel imageUrl={imageUrl} />}
        {!imageUrl && <p>사진이 표시될 영역입니다.</p>}
      </div>

      <TextArea
        label='리뷰'
        placeholder='리뷰를 입력하세요'
        register={register("review", {
          required: InputError.ERROR_MSG_REQUIRED,
        })}
        error={errors.review}
      />

      <Input
        type='text'
        label='카테고리'
        placeholder='카테고리를 입력하세요'
        register={register("category", {
          required: InputError.ERROR_MSG_REQUIRED,
        })}
        error={errors.category}
      />

      <TextArea
        label='메뉴'
        placeholder='메뉴를 입력하세요'
        register={register("menu")}
        error={errors.menu}
      />

      <TextArea
        label='영업 시간'
        placeholder='영업 시간을 입력하세요'
        register={register("time")}
        error={errors.time}
      />

      <Input
        type='text'
        label='전화번호'
        placeholder='전화번호를 입력하세요'
        register={register("phone")}
        error={errors.phone}
      />

      <input
        type='submit'
        value='추가'
        className={`${styles.submit} ${isValid && styles.valid}`}
      />
    </form>
  );
};

export default AddPlaceInfoForm;
