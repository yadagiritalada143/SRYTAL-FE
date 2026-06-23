import { IconArrowRight, IconSparkles } from '@tabler/icons-react';
import { HashLink as Link } from 'react-router-hash-link';

const stats = [
  { value: '50+', label: 'Projects delivered' },
  { value: '6+', label: 'Years of expertise' },
  { value: '24/7', label: 'Dedicated support' }
];

const Main = () => {
  return (
    <section className='relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden'>
      {/* Hero background image with gradient overlay for legibility */}
      <div
        className='absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-30'
        style={{ backgroundImage: 'url(/wal2.jpg)' }}
      />
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-[#070b16]/40 via-[#070b16]/70 to-[#070b16]' />

      <div className='container mx-auto px-4 py-20 text-center md:px-8'>
        {/* Eyebrow badge */}
        <div className='animate-slideInTop mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur'>
          <IconSparkles size={16} className='text-fuchsia-400' />
          Innovative software, built for growth
        </div>

        {/* Headline */}
        <h1 className='animate-slideInTop mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl'>
          Empowering business with{' '}
          <span className='text-gradient'>innovative technology</span> solutions
        </h1>

        {/* Subcopy — concise */}
        <p className='animate-slideInBottom mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg'>
          We build custom software, web and mobile apps, and cloud solutions
          that help startups and enterprises scale with confidence. Your trusted
          partner in digital transformation.
        </p>

        {/* CTAs */}
        <div className='animate-slideInBottom mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <Link
            to='#contact'
            smooth
            className='group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:shadow-indigo-500/50 hover:brightness-110'
          >
            Get started
            <IconArrowRight
              size={18}
              className='transition-transform duration-200 group-hover:translate-x-1'
            />
          </Link>
          <Link
            to='#services'
            smooth
            className='inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/10'
          >
            Explore services
          </Link>
        </div>

        {/* Trust stats */}
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8'>
          {stats.map(stat => (
            <div key={stat.label}>
              <div className='text-2xl font-bold text-white md:text-3xl'>
                {stat.value}
              </div>
              <div className='mt-1 text-xs text-slate-400 md:text-sm'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main;
