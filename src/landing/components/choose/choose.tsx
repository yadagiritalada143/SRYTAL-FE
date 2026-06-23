import {
  IconRocket,
  IconShieldCheck,
  IconBulb,
  IconUserCheck
} from '@tabler/icons-react';
import SectionHeading from '@landing/components/common/SectionHeading';
import Reveal from '@landing/components/common/Reveal';

const features = [
  {
    title: 'Innovative Solutions',
    description:
      'Cutting-edge technology solutions tailored precisely to your business needs.',
    icon: IconBulb
  },
  {
    title: 'Reliability & Security',
    description:
      'Your data and projects stay safe with our top-notch security measures.',
    icon: IconShieldCheck
  },
  {
    title: 'Client-Centric Approach',
    description:
      'We focus on building strong, lasting relationships with every client.',
    icon: IconUserCheck
  },
  {
    title: 'Rapid Delivery',
    description:
      'We ensure timely delivery without ever compromising on quality.',
    icon: IconRocket
  }
];

const WhyChooseUs = () => {
  return (
    <section className='py-24'>
      <div className='container mx-auto px-4 md:px-8'>
        <SectionHeading
          eyebrow='Why us'
          title='Why choose us'
          subtitle='Partner with a team that treats your goals as our own.'
        />

        <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={(index % 4) * 100}>
                <div className='glass-card h-full rounded-2xl p-7 text-center transition-transform duration-300 hover:-translate-y-2'>
                  <div className='mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20'>
                    <Icon size={28} />
                  </div>
                  <h3 className='text-lg font-semibold text-white'>
                    {feature.title}
                  </h3>
                  <p className='mt-3 text-sm leading-relaxed text-slate-400'>
                    {feature.description}
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

export default WhyChooseUs;
