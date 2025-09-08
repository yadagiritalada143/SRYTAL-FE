import styles from './button.module.css';

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'outline' | 'light' | 'subtle' | 'transparent';
}

export const CancelStyledButton = ({
  label,
  size = 'md',
  variant = 'filled',
  ...props
}: StyledButtonProps) => {
  const chars = label.split('');

  return (
    <button className={`${styles.button} ${styles[size]}`} {...props}>
      <span className={styles['span-mother']}>
        {chars.map((ch, i) => (
          <span key={`top-${i}`}>{ch}</span>
        ))}
      </span>
      <span className={styles['span-mother2']}>
        {chars.map((ch, i) => (
          <span key={`bottom-${i}`}>{ch}</span>
        ))}
      </span>
    </button>
  );
};
