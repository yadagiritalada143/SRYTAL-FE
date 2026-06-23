import { IconArrowRight } from '@tabler/icons-react';
import { HashLink as Link } from 'react-router-hash-link';
import Reveal from '@landing/components/common/Reveal';

const PromoBanner = () => {
  return (
    <section className='py-12'>
      <div className='container mx-auto px-4 md:px-8'>
        <Reveal>
          <div className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-6 py-14 text-center shadow-2xl shadow-indigo-900/30 md:px-16'>
            {/* Decorative glow */}
            <div className='pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl' />
            <div className='pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-black/10 blur-3xl' />

            <div className='relative'>
              <h2 className='mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl'>
                Ready to elevate your business strategy?
              </h2>
              <p className='mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg'>
                Discover innovative solutions that streamline operations and
                drive growth. Join the leaders in your industry and unlock new
                potential with our expertise.
              </p>
              <Link
                to='#contact'
                smooth
                className='group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-indigo-700 shadow-lg transition-all duration-200 hover:bg-slate-100'
              >
                Contact our experts
                <IconArrowRight
                  size={18}
                  className='transition-transform duration-200 group-hover:translate-x-1'
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PromoBanner;
