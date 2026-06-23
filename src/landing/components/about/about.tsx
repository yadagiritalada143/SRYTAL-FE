import { IconCheck } from '@tabler/icons-react';
import Reveal from '@landing/components/common/Reveal';

const highlights = [
  'Custom software tailored to your business',
  'Scalable, secure cloud architecture',
  'Client-centric, long-term partnerships',
  'Latest technologies and best practices'
];

const About = () => {
  return (
    <section id='about' className='py-24'>
      <div className='container mx-auto grid items-center gap-12 px-4 md:px-8 lg:grid-cols-2'>
        {/* Text */}
        <Reveal>
          <span className='inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-300'>
            About us
          </span>
          <h2 className='mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl'>
            A forward-thinking software partner
          </h2>
          <p className='mt-5 text-base leading-relaxed text-slate-300'>
            We transform businesses through innovative technology. Our team of
            experienced developers, designers, and strategists works closely
            with clients to deliver customized software that drives growth and
            efficiency — cutting-edge applications, responsive websites, and
            robust cloud solutions that keep you ahead in a competitive market.
          </p>

          <ul className='mt-8 grid gap-3 sm:grid-cols-2'>
            {highlights.map(item => (
              <li key={item} className='flex items-start gap-3'>
                <span className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500'>
                  <IconCheck size={13} stroke={3} className='text-white' />
                </span>
                <span className='text-sm text-slate-300'>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Images */}
        <Reveal delay={150} className='relative'>
          <div className='relative grid grid-cols-2 gap-4'>
            <img
              src='/img-2.jpg'
              alt='Our team at work'
              className='col-span-2 h-56 w-full rounded-2xl border border-white/10 object-cover shadow-2xl'
            />
            <img
              src='/img-4.jpg'
              alt='Collaboration'
              className='h-40 w-full rounded-2xl border border-white/10 object-cover shadow-2xl'
            />
            <div className='flex h-40 w-full flex-col justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-6 shadow-2xl'>
              <span className='text-3xl font-extrabold text-white'>100%</span>
              <span className='mt-1 text-sm font-medium text-white/90'>
                Commitment to client success
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
