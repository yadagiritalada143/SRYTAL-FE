import React, { useState } from 'react';
import { IconRocket, IconShieldCheck, IconUsers } from '@tabler/icons-react';

export const About: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const pillars = [
    {
      title: 'Client-Centric Innovation',
      description:
        'We align closely with your strategic objectives, tailoring architectures and sprints to solve your unique enterprise challenges.',
      icon: IconUsers,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/15',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Enterprise Security & Resilience',
      description:
        'Zero-trust protocols, automated vulnerability scanning, strict Jest testing, and high-availability database replication.',
      icon: IconShieldCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/15',
      borderColor: 'border-emerald-500/30'
    },
    {
      title: 'High-Performance Agility',
      description:
        'Rapid milestone deliveries, sub-second web vitals, and automated CI/CD multi-cloud pipelines without compromising quality.',
      icon: IconRocket,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/15',
      borderColor: 'border-indigo-500/30'
    }
  ];

  return (
    <section
      id='about'
      className='w-full max-w-7xl mx-auto px-4 py-5 sm:py-10 mb-0'
      aria-label='About Us'
    >
      <div className='text-center mb-12 sm:mb-16'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight'>
          About Us
        </h2>

        <p className='text-sm sm:text-base text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed'>
          Empowering enterprises through tailor-made digital transformation,
          scalable cloud platforms, and dedicated long-term technology
          partnership.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'>
        <div className='lg:col-span-7 flex flex-col justify-center space-y-6'>
          <div className='rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 p-6 sm:p-8 shadow-xl shadow-blue-950/20'>
            <h3 className='text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight'>
              Pioneering Enterprise Software & Digital Evolution
            </h3>

            <p className='text-xs sm:text-sm text-gray-300 leading-relaxed'>
              We are a forward-thinking digital engineering and technology
              consulting company committed to transforming modern businesses
              through innovative, scalable software architectures. Our
              multidisciplinary team of developers, cloud engineers, and
              strategists works closely with clients to understand their unique
              challenges and deliver customized solutions that accelerate
              growth, efficiency, and market leadership.
            </p>

            <p className='text-xs sm:text-sm text-gray-300 leading-relaxed mt-3'>
              With an unwavering focus on engineering excellence, we specialize
              in high-performance web applications, cross-platform mobile apps,
              and resilient multi-cloud platforms. By nurturing long-term
              collaborations, we provide continuous technical advisory and
              enhancements that keep our clients at the forefront of their
              industries.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-3.5'>
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className='flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 hover:bg-slate-850 transition-all duration-200 group'
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${pillar.bgColor} border ${pillar.borderColor} ${pillar.color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200`}
                  >
                    <Icon size={20} stroke={2.2} />
                  </div>
                  <div>
                    <h4 className='text-sm font-bold text-white group-hover:text-blue-300 transition-colors'>
                      {pillar.title}
                    </h4>
                    <p className='text-xs text-gray-400 mt-1 leading-relaxed'>
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='lg:col-span-5 flex flex-col items-center justify-center'>
          <div className='relative w-full max-w-md group'>
            <div className='absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />

            <div className='relative rounded-3xl border border-slate-700/70 p-3 bg-slate-900/60 backdrop-blur-xl shadow-2xl shadow-blue-950/40'>
              <div
                className={`w-full h-80 sm:h-96 rounded-2xl overflow-hidden relative cursor-pointer ${
                  isFlipped ? 'is-flipped' : ''
                }`}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                onClick={() => setIsFlipped(prev => !prev)}
                role='button'
                tabIndex={0}
                aria-label='Interactive About Us showcase image. Click or hover to flip.'
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsFlipped(prev => !prev);
                  }
                }}
              >
                <div className='flip-inner w-full h-full relative'>
                  <div
                    className='flip-front absolute w-full h-full backface-hidden'
                    style={{
                      transform: 'rotateY(0deg)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <img
                      className='w-full h-full object-cover rounded-2xl'
                      src='/img-2.jpg'
                      alt='SRYTAL Digital Transformation'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent rounded-2xl' />

                    <div className='absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-xs font-semibold text-white shadow-lg'>
                      <span className='w-2 h-2 rounded-full bg-blue-400 animate-pulse' />
                      <span>Innovation & Agility</span>
                    </div>

                    <div className='absolute bottom-3.5 inset-x-3.5 p-3.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-left'>
                      <p className='text-xs font-bold text-white'>
                        Next-Gen Software Architecture
                      </p>
                      <p className='text-[11px] text-gray-300 mt-0.5 leading-relaxed'>
                        Engineered for speed, user engagement, and measurable
                        business growth.
                      </p>
                    </div>
                  </div>

                  <div
                    className='flip-back absolute w-full h-full backface-hidden'
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <img
                      className='w-full h-full object-cover rounded-2xl'
                      src='/img-4.jpg'
                      alt='SRYTAL Collaborative Engineering'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent rounded-2xl' />

                    <div className='absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-xs font-semibold text-emerald-300 shadow-lg'>
                      <IconShieldCheck size={14} className='text-emerald-400' />
                      <span>Enterprise Partnership</span>
                    </div>

                    <div className='absolute bottom-3.5 inset-x-3.5 p-3.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-left'>
                      <p className='text-xs font-bold text-white'>
                        Enduring Strategic Collaboration
                      </p>
                      <p className='text-[11px] text-gray-300 mt-0.5 leading-relaxed'>
                        Long-term technical advisory, architecture reviews, and
                        dedicated talent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
