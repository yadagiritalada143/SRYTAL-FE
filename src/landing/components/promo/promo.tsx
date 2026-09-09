import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {
  IconRocket,
  IconArrowRight,
  IconShieldCheck,
  IconClock,
  IconCheck,
  IconNetwork
} from '@tabler/icons-react';

const PromoBanner: React.FC = () => {
  return (
    <section
      aria-label='Enterprise Strategy Promotion'
      className='w-full max-w-5xl mx-auto px-4 py-2 sm:py-2'
    >
      <div className='relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-950/95 border border-slate-700/60 p-8 sm:p-12 lg:p-14 shadow-2xl shadow-blue-950/30 overflow-hidden text-center transition-all duration-300 hover:border-slate-600/80 group'>
        <div className='absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl pointer-events-none rounded-full' />
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent pointer-events-none' />
        <div className='absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none' />

        <div className='relative z-10'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md'>
            <IconNetwork size={14} className='text-blue-400' />
            <span>Enterprise Digital Transformation</span>
          </div>

          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto'>
            Ready to Elevate Your Business Strategy?
          </h2>

          <p className='mt-3.5 text-xs sm:text-sm lg:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed'>
            Discover innovative technology solutions that modernize legacy
            architectures, streamline workflows, and unlock exponential growth
            with SRYTAL senior specialists.
          </p>

          <div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5'>
            <Link
              to='#expert-consultation'
              smooth={true}
              className='w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-400 shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group/btn'
            >
              <IconRocket
                size={17}
                className='transform group-hover/btn:scale-110 group-hover/btn:-rotate-12 transition-transform duration-200 stroke-[2.2]'
              />
              <span>Book Expert Consultation</span>
              <IconArrowRight
                size={15}
                className='transform group-hover/btn:translate-x-1 transition-transform duration-200 stroke-[2.2]'
              />
            </Link>

            <Link
              to='#contact'
              smooth={true}
              className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-gray-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-sm'
            >
              <span>General Enquiries</span>
            </Link>
          </div>

          <div className='mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-gray-400'>
            <div className='inline-flex items-center gap-1.5'>
              <IconShieldCheck size={15} className='text-emerald-400' />
              <span>Confidential & NDA Protected</span>
            </div>
            <div className='inline-flex items-center gap-1.5'>
              <IconClock size={15} className='text-blue-400' />
              <span>Rapid 24-Hour Response</span>
            </div>
            <div className='inline-flex items-center gap-1.5'>
              <IconCheck size={15} className='text-indigo-400' />
              <span>Proven Enterprise Track Record</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
