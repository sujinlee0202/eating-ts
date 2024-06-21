import styles from "./index.module.css";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface Props {
  direction: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ArrowButton = ({ direction, onClick }: Props) => {
  return (
    <button className={styles.arrowButton} onClick={onClick}>
      {direction === "left" && <AiOutlineLeft className={styles.icon} />}
      {direction === "right" && <AiOutlineRight className={styles.icon} />}
    </button>
  );
};

export default ArrowButton;
