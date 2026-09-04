import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {
  IconArrowRight,
  IconChevronDown,
  IconCode,
  IconCloud,
  IconShieldCheck,
  IconRocket
} from '@tabler/icons-react';

const Main: React.FC = () => {
  const highlights = [
    {
      title: 'Full-Stack Apps',
      desc: 'React, Next.js & Mobile',
      icon: IconCode,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/15',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Cloud & DevOps',
      desc: 'AWS, Azure & Kubernetes',
      icon: IconCloud,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/15',
      borderColor: 'border-indigo-500/30'
    },
    {
      title: 'Zero Trust Security',
      desc: 'Audits & Encryption',
      icon: IconShieldCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/15',
      borderColor: 'border-emerald-500/30'
    },
    {
      title: 'Agile Delivery',
      desc: 'Speed & Reliability',
      icon: IconRocket,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/15',
      borderColor: 'border-purple-500/30'
    }
  ];

  return (
    <main
      id='main-hero'
      className='relative w-full flex-1 flex flex-col justify-center items-center text-center px-4 py-8 sm:py-12 max-w-6xl mx-auto'
      aria-label='Hero section'
    >
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 sm:h-96 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 blur-3xl pointer-events-none rounded-full' />

      <h1 className='relative z-10 text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mt-4 sm:mt-6 md:mt-12'>
        Empowering Businesses with{' '}
        <span className='bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent'>
          Innovative Technology Solutions
        </span>
      </h1>

      <p className='relative z-10 text-sm sm:text-base md:text-lg text-gray-200 mt-5 sm:mt-6 max-w-3xl mx-auto leading-relaxed'>
        At SRYTAL Systems, we architect tailor-made digital
        transformations—engineering high-performance web and mobile apps,
        resilient cloud systems, and enterprise-grade architectures designed to
        scale your competitive advantage.
      </p>

      <div className='relative z-10 mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4'>
        <Link
          to='#expert-consultation'
          smooth={true}
          className='inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 hover:scale-105 text-white font-medium text-xs sm:text-sm border border-blue-400/50 hover:border-blue-300 shadow-md shadow-blue-600/20 transition-all duration-200'
        >
          <span>Get Started</span>
          <IconArrowRight size={15} stroke={2} />
        </Link>

        <Link
          to='#about'
          smooth={true}
          className='inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-gray-200 hover:text-white font-medium text-xs sm:text-sm border border-slate-600/80 hover:border-slate-400 hover:scale-105 backdrop-blur-md shadow-sm transition-all duration-200'
        >
          <span>About SRYTAL</span>
        </Link>
      </div>

      <div className='relative z-10 mt-10 sm:mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto'>
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className='flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 hover:border-slate-500/70 hover:bg-slate-800/80 shadow-lg shadow-blue-950/20 transition-all duration-200 text-left group'
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${item.bgColor} border ${item.borderColor} ${item.color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon size={20} stroke={2.2} />
              </div>
              <div className='min-w-0'>
                <h2 className='text-xs sm:text-sm font-bold text-white truncate'>
                  {item.title}
                </h2>
                <p className='text-[10px] sm:text-[11px] text-gray-400 truncate'>
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className='relative z-10 mt-8 sm:mt-10'>
        <Link
          to='#about'
          smooth={true}
          className='inline-flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors duration-200 group'
          aria-label='Scroll to About section'
        >
          <span className='text-[10px] uppercase font-semibold tracking-widest text-gray-400 group-hover:text-blue-300'>
            Scroll Down
          </span>
          <IconChevronDown
            size={18}
            className='animate-bounce text-blue-400 stroke-[2.2]'
          />
        </Link>
      </div>
    </main>
  );
};

export default Main;
