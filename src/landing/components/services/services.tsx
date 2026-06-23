import {
  IconCode,
  IconCloud,
  IconDatabase,
  IconChartBar,
  IconDeviceLaptop,
  IconShieldCheck
} from '@tabler/icons-react';
import SectionHeading from '@landing/components/common/SectionHeading';
import Reveal from '@landing/components/common/Reveal';

const services = [
  {
    title: 'Custom Software Development',
    description:
      'Tailor-made software that aligns with your business needs, ensuring seamless operations and a competitive edge.',
    icon: IconCode
  },
  {
    title: 'Cloud Integration',
    description:
      'Transform your IT infrastructure with cloud integration services built for scalability, flexibility, and security.',
    icon: IconCloud
  },
  {
    title: 'Database Management',
    description:
      'Efficient and secure database solutions that streamline your data operations and enhance accessibility.',
    icon: IconDatabase
  },
  {
    title: 'Business Analytics',
    description:
      'Leverage advanced analytics to make data-driven decisions that boost productivity and profitability.',
    icon: IconChartBar
  },
  {
    title: 'IT Consultation',
    description:
      'Expert consultation to help you navigate the digital landscape and implement cutting-edge technology.',
    icon: IconDeviceLaptop
  },
  {
    title: 'Security Solutions',
    description:
      'Comprehensive cyber security strategies to protect your digital assets and ensure business continuity.',
    icon: IconShieldCheck
  }
];

const Services = () => {
  return (
    <section id='services' className='py-24'>
      <div className='container mx-auto px-4 md:px-8'>
        <SectionHeading
          eyebrow='What we do'
          title='Our Services'
          subtitle='End-to-end technology services that empower your business at every stage of growth.'
        />

        <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(index % 3) * 100}>
                <div className='glass-card group h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-500/40 hover:bg-white/[0.07]'>
                  <div className='mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 text-fuchsia-300 ring-1 ring-white/10 transition-colors duration-300 group-hover:from-indigo-500 group-hover:to-fuchsia-500 group-hover:text-white'>
                    <Icon size={28} />
                  </div>
                  <h3 className='text-lg font-semibold text-white'>
                    {service.title}
                  </h3>
                  <p className='mt-3 text-sm leading-relaxed text-slate-400'>
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
