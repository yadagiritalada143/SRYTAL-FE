import { useState, useEffect, useRef } from 'react';
import { getVisitorCount } from '../../../services/common-services';
import {
  IconEye,
  IconWorld,
  IconBolt,
  IconShieldCheck
} from '@tabler/icons-react';

const VisitorCount = () => {
  const [count, setCount] = useState<number>(0);
  const [displayedCount, setDisplayedCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getVisitorCount()
      .then(visitorCount => {
        if (typeof visitorCount === 'number' && !isNaN(visitorCount)) {
          setCount(visitorCount);
        }
      })
      .catch(err => {
        console.warn('Could not fetch visitor count:', err);
      });
  }, []);

  const animateCount = (target: number) => {
    if (target <= 0) return;
    const duration = 1600; // 1.6s smooth easing
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(target * ease);
      setDisplayedCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayedCount(target);
      }
    };

    requestAnimationFrame(update);
  };

  useEffect(() => {
    if (count <= 0 || hasAnimated) return;

    const currentRef = countRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          animateCount(count);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [count, hasAnimated]);

  return (
    <div ref={countRef} className='w-full max-w-2xl mx-auto px-4'>
      <div className='relative rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 p-6 sm:p-9 shadow-2xl shadow-blue-950/25 text-center overflow-hidden transition-all duration-300 hover:border-slate-600/80 group'>
        <div className='absolute -top-16 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl pointer-events-none rounded-full' />

        <div className='absolute inset-0 bg-radial-gradient from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />

        <div className='relative z-10'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/70 text-xs font-semibold text-gray-200 tracking-wide mb-4 shadow-sm backdrop-blur-md'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
            <IconEye size={15} className='text-blue-400' />
            <span>Live Platform Engagement</span>
          </div>

          <div className='mt-2 flex items-baseline justify-center gap-1 font-extrabold tracking-tight'>
            <span className='text-5xl sm:text-6xl text-white drop-shadow-sm font-sans'>
              {displayedCount > 0 ? displayedCount.toLocaleString() : '---'}
            </span>
            {displayedCount > 0 && (
              <span className='text-3xl sm:text-4xl text-blue-400 font-bold'>
                +
              </span>
            )}
          </div>

          <h4 className='text-sm sm:text-base font-semibold text-gray-200 mt-2 tracking-wide'>
            Global Platform Visitors
          </h4>
          <p className='text-xs sm:text-sm text-gray-400 mt-1 max-w-md mx-auto leading-relaxed'>
            Monitor live engagement from enterprises and professionals accessing
            our digital solutions, advisory, and learning resources worldwide.
          </p>

          <div className='mt-6 pt-5 border-t border-slate-800/90 grid grid-cols-3 gap-2 text-center'>
            <div className='flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800/40 border border-slate-800/80'>
              <IconWorld size={16} className='text-blue-400 mb-1' />
              <span className='text-[11px] sm:text-xs font-semibold text-gray-200'>
                Worldwide Reach
              </span>
              <span className='text-[10px] text-gray-400'>Global Scale</span>
            </div>

            <div className='flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800/40 border border-slate-800/80'>
              <IconBolt size={16} className='text-amber-400 mb-1' />
              <span className='text-[11px] sm:text-xs font-semibold text-gray-200'>
                99.9% Uptime
              </span>
              <span className='text-[10px] text-gray-400'>
                Platform Availability
              </span>
            </div>

            <div className='flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800/40 border border-slate-800/80'>
              <IconShieldCheck size={16} className='text-emerald-400 mb-1' />
              <span className='text-[11px] sm:text-xs font-semibold text-gray-200'>
                Live Visitors
              </span>
              <span className='text-[10px] text-gray-400'>
                Real-Time Metric
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCount;
