import { useInView } from 'react-intersection-observer';

export const LazySection = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return <div ref={ref}>{inView ? children : null}</div>;
};
