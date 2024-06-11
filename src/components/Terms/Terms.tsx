import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Inputs } from "../../Pages/Signup/signup";
import { ERROR_MSG_TERMS } from "../../errors/inputErrorMessage";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./Terms.module.css";

interface Props {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  watch: UseFormWatch<Inputs>;
  setValue: UseFormSetValue<Inputs>;
}

const Terms = ({ register, errors, watch, setValue }: Props) => {
  const handleCheckedAll = () => {
    if (
      watch("eatingTerms") &&
      watch("locationServiceTerms") &&
      watch("privacyPolicy") &&
      watch("eventBenefitsInfo")
    ) {
      setValue("allAgreements", false as unknown as string);
      setValue("locationServiceTerms", false as unknown as string);
      setValue("eatingTerms", false as unknown as string);
      setValue("privacyPolicy", false as unknown as string);
      setValue("eventBenefitsInfo", false as unknown as string);
    } else {
      setValue("allAgreements", true as unknown as string);
      setValue("locationServiceTerms", true as unknown as string);
      setValue("eatingTerms", true as unknown as string);
      setValue("privacyPolicy", true as unknown as string);
      setValue("eventBenefitsInfo", true as unknown as string);
    }
  };

  const handleChecked = () => {
    setValue("allAgreements", false as unknown as string);
  };

  return (
    <div className={styles.container}>
      <Checkbox
        label='모두 동의'
        register={register("allAgreements", {
          onChange: handleCheckedAll,
        })}
      />

      <Checkbox
        label='(필수) eating 이용 약관'
        register={register("eatingTerms", {
          required: ERROR_MSG_TERMS,
          onChange: handleChecked,
        })}
        error={errors.eatingTerms}
      />

      <Checkbox
        label='(필수) 개인정보 수집 및 이용'
        register={register("privacyPolicy", {
          required: ERROR_MSG_TERMS,
          onChange: handleChecked,
        })}
        error={errors.privacyPolicy}
      />

      <Checkbox
        label='(선택) 위치기반서비스 이용 약관'
        register={register("locationServiceTerms", {
          onChange: handleChecked,
        })}
      />

      <Checkbox
        label='(선택) 이벤트 및 혜택 정보 수신'
        register={register("eventBenefitsInfo", {
          onChange: handleChecked,
        })}
      />
    </div>
  );
};

export default Terms;
