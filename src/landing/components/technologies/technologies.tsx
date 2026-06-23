import {
  IconBrandReact,
  IconBrandNodejs,
  IconBrandJavascript,
  IconBrandTailwind,
  IconBrandPython,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandMongodb
} from '@tabler/icons-react';
import SectionHeading from '@landing/components/common/SectionHeading';

const technologies = [
  { name: 'React', icon: IconBrandReact, color: 'text-sky-400' },
  { name: 'Node.js', icon: IconBrandNodejs, color: 'text-green-400' },
  { name: 'JavaScript', icon: IconBrandJavascript, color: 'text-yellow-400' },
  { name: 'Tailwind', icon: IconBrandTailwind, color: 'text-teal-400' },
  { name: 'Python', icon: IconBrandPython, color: 'text-blue-400' },
  { name: 'HTML5', icon: IconBrandHtml5, color: 'text-orange-400' },
  { name: 'CSS3', icon: IconBrandCss3, color: 'text-blue-500' },
  { name: 'MongoDB', icon: IconBrandMongodb, color: 'text-green-500' }
];

const Technologies = () => {
  return (
    <section id='technologies' className='py-24'>
      <div className='container mx-auto px-4 md:px-8'>
        <SectionHeading
          eyebrow='Our stack'
          title='Cutting-edge tools & technologies'
          subtitle='We work with a modern, battle-tested technology stack to build fast, reliable products.'
        />
      </div>

      {/* Infinite marquee with fade edges */}
      <div className='group relative mt-14 overflow-hidden'>
        <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#070b16] to-transparent' />
        <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#070b16] to-transparent' />

        <div className='animate-technologies flex w-max gap-4 group-hover:[animation-play-state:paused]'>
          {technologies.concat(technologies).map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className='glass-card flex items-center gap-3 rounded-xl px-6 py-4'
              >
                <Icon size={28} className={tech.color} />
                <span className='whitespace-nowrap text-sm font-medium text-slate-200'>
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
