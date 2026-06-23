import { useInView } from 'react-intersection-observer';

type RevealProps = {
  children: React.ReactNode;
  /** Delay in ms before the reveal animation starts */
  delay?: number;
  className?: string;
};

/**
 * Wraps content in a scroll-triggered fade-and-lift reveal.
 * Respects prefers-reduced-motion via the `.reveal` styles in index.css.
 */
const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
