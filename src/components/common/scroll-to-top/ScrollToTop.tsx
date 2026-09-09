import React, { useState, useEffect, useCallback } from 'react';
import { IconArrowUp } from '@tabler/icons-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const checkScroll = useCallback(() => {
    const winY = window.pageYOffset || window.scrollY || 0;
    const docY =
      document.documentElement?.scrollTop || document.body?.scrollTop || 0;
    const rootEl = document.getElementById('landing-root');
    const rootY = rootEl ? rootEl.scrollTop : 0;
    const currentScroll = Math.max(winY, docY, rootY);

    if (currentScroll > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkScroll();

    window.addEventListener('scroll', checkScroll, {
      passive: true,
      capture: true
    });
    window.addEventListener('touchmove', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });
    document.addEventListener('scroll', checkScroll, {
      passive: true,
      capture: true
    });

    const rootEl = document.getElementById('landing-root');
    if (rootEl) {
      rootEl.addEventListener('scroll', checkScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', checkScroll, { capture: true });
      window.removeEventListener('touchmove', checkScroll);
      window.removeEventListener('resize', checkScroll);
      document.removeEventListener('scroll', checkScroll, { capture: true });
      if (rootEl) {
        rootEl.removeEventListener('scroll', checkScroll);
      }
    };
  }, [checkScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (document.documentElement) {
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    if (document.body) {
      document.body.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    const rootEl = document.getElementById('landing-root');
    if (rootEl) {
      rootEl.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
      }`}
    >
      <div className='relative group'>
        <div className='absolute bottom-full right-1/2 translate-x-1/2 mb-2.5 px-3 py-1.5 bg-slate-900/95 text-white text-xs font-semibold tracking-wide rounded-xl border border-slate-700/80 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap backdrop-blur-md'>
          Scroll to top
          <div className='absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-solid border-t-slate-900 border-t-4 border-x-transparent border-x-4 border-b-0' />
        </div>

        <button
          type='button'
          onClick={scrollToTop}
          aria-label='Scroll to top'
          className='w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-400 active:from-blue-700 active:to-indigo-700 shadow-xl shadow-blue-600/40 hover:shadow-2xl hover:shadow-blue-500/50 border border-white/25 ring-4 ring-blue-500/20 hover:ring-blue-500/40 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900'
        >
          <IconArrowUp
            size={24}
            className='stroke-[2.5] transform group-hover:-translate-y-1 transition-transform duration-200'
          />
        </button>
      </div>
    </div>
  );
};

export default ScrollToTop;
