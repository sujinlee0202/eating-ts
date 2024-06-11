import styles from "./index.module.css";

interface Props {
  imageUrl: string[];
  selectedId: number;
}

const EllipsisButton = ({ imageUrl, selectedId }: Props) => {
  return (
    <div className={styles.container}>
      {imageUrl.map((_, index) => {
        return (
          <div
            key={index}
            className={`
            ${styles.button} 
            ${index === selectedId && styles.selected}
          `}
          ></div>
        );
      })}
    </div>
  );
};

export default EllipsisButton;
