import Reveal from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
};

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center'
}: SectionHeadingProps) => {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      <span className='inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-300'>
        {eyebrow}
      </span>
      <h2 className='mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl'>
        {title}
      </h2>
      {subtitle && (
        <p className='mt-4 text-base leading-relaxed text-slate-400'>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
};

export default SectionHeading;
