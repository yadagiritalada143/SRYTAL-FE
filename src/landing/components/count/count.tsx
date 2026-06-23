import { useState, useEffect, useRef } from 'react';
import { IconEye } from '@tabler/icons-react';
import { getVisitorCount } from '@services/common-services';

const VisitorCount = () => {
  const [count, setCount] = useState<number>(0);
  const [displayedCount, setDisplayedCount] = useState<number>(0);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getVisitorCount().then(visitorCount => setCount(visitorCount));
  }, []);

  useEffect(() => {
    const node = countRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCount();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.6 }
    );

    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [count]);

  const animateCount = () => {
    let start = 0;
    const end = count;
    const duration = 800;
    const steps = duration / 50;
    const increment = Math.max(1, Math.ceil(end / steps));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayedCount(start);
    }, 50);
  };

  return (
    <section className='py-12'>
      <div ref={countRef} className='container mx-auto px-4 md:px-8'>
        <div className='glass-card mx-auto flex max-w-md flex-col items-center rounded-2xl px-8 py-10 text-center'>
          <span className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white'>
            <IconEye size={24} />
          </span>
          <div className='mt-5 text-5xl font-extrabold text-gradient'>
            {displayedCount.toLocaleString()}
          </div>
          <p className='mt-2 text-sm text-slate-400'>
            People have visited this site
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisitorCount;
