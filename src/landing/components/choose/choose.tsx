import React from 'react';
import {
  IconRocket,
  IconShieldCheck,
  IconBulb,
  IconUserCheck,
  IconSparkles,
  IconArrowRight
} from '@tabler/icons-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Innovative Solutions',
      description:
        'We deliver cutting-edge technology solutions and modern architectures tailored to your business needs.',
      icon: IconBulb,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/15',
      borderColor: 'border-amber-500/30',
      tag: 'Modern Engineering'
    },
    {
      title: 'Reliability & Security',
      description:
        'Your data and mission-critical projects are fortified with industry-leading security and compliance standards.',
      icon: IconShieldCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/15',
      borderColor: 'border-emerald-500/30',
      tag: 'Enterprise Protection'
    },
    {
      title: 'Client-Centric Approach',
      description:
        'We focus on building lasting technology partnerships with dedicated advisory and transparent communication.',
      icon: IconUserCheck,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/15',
      borderColor: 'border-blue-500/30',
      tag: 'Dedicated Specialists'
    },
    {
      title: 'Rapid Delivery',
      description:
        'We ensure predictable, on-time milestone delivery with agile sprints without ever compromising on quality.',
      icon: IconRocket,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/15',
      borderColor: 'border-indigo-500/30',
      tag: 'Accelerated Time-to-Market'
    }
  ];

  return (
    <section
      id='why-us'
      className='w-full max-w-6xl mx-auto px-4 py-8 sm:py-12'
      aria-label='Why Choose Us'
    >
      <div className='text-center mb-10 sm:mb-14'>
        <div className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm'>
          <IconSparkles size={14} className='text-blue-400' />
          <span>Proven Enterprise Excellence</span>
        </div>

        <h2 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'>
          Why Choose Us ?
        </h2>

        <p className='text-sm sm:text-base text-gray-300 mt-2.5 max-w-2xl mx-auto leading-relaxed'>
          Delivering transformative software engineering, robust cloud systems,
          and dedicated technical expertise to accelerate enterprise growth.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className='relative rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 p-6 sm:p-7 shadow-xl shadow-blue-950/20 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-default'
              aria-labelledby={`feature-title-${index}`}
              aria-describedby={`feature-desc-${index}`}
            >
              <div className='absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 blur-2xl pointer-events-none rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              <div className='relative z-10'>
                <div
                  className={`w-12 h-12 rounded-2xl ${feature.bgColor} border ${feature.borderColor} ${feature.color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={24} stroke={2.2} />
                </div>

                <h3
                  id={`feature-title-${index}`}
                  className='text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200'
                >
                  {feature.title}
                </h3>

                <p
                  id={`feature-desc-${index}`}
                  className='text-xs sm:text-sm text-gray-400 leading-relaxed'
                >
                  {feature.description}
                </p>
              </div>

              <div className='mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-gray-400 group-hover:text-blue-400 transition-colors duration-200 relative z-10'>
                <span>{feature.tag}</span>
                <IconArrowRight
                  size={14}
                  className='transform group-hover:translate-x-1 transition-transform duration-200 stroke-[2.2]'
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
