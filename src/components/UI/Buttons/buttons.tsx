import styles from './button.module.css';
export const CancelStyledButton = ({ ...props }) => {
  return (
    <button className={styles.button} {...props}>
      <span className={styles['span-mother']}>
        <span>C</span>
        <span>a</span>
        <span>n</span>
        <span>c</span>
        <span>e</span>
        <span>l</span>
      </span>
      <span className={styles['span-mother2']}>
        <span>C</span>
        <span>a</span>
        <span>n</span>
        <span>c</span>
        <span>e</span>
        <span>l</span>
      </span>
    </button>
  );
};
