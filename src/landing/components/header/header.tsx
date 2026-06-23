import { Burger } from '@mantine/core';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX
} from '@tabler/icons-react';
import { HashLink as Link } from 'react-router-hash-link';

const navLinks = [
  { label: 'Home', to: '#header' },
  { label: 'About', to: '#about' },
  { label: 'Services', to: '#services' },
  { label: 'Technologies', to: '#technologies' },
  { label: 'Contact', to: '#contact' }
];

const socials = [
  {
    icon: IconBrandLinkedin,
    href: 'https://www.linkedin.com/company/srytal-systems-india-pvt-ltd',
    label: 'LinkedIn'
  },
  { icon: IconBrandX, href: '#', label: 'X' },
  { icon: IconBrandFacebook, href: '#', label: 'Facebook' }
];

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const scrolled = scroll.y > 24;

  return (
    <header
      id='header'
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#070b16]/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className='container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-8'>
        {/* Logo */}
        <a
          href='/'
          className='flex shrink-0 items-center transition-transform duration-300 hover:scale-105'
        >
          <img
            src='/logo.jpg'
            className='h-10 w-auto rounded md:h-12'
            alt='SRYTAL Systems'
          />
        </a>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-1 lg:flex'>
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              smooth
              className='rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className='flex items-center gap-2'>
          <div className='hidden items-center gap-1 sm:flex'>
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noreferrer'
                aria-label={label}
                className='flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-white/5 hover:text-white'
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <Link
            to='#contact'
            smooth
            className='hidden rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-indigo-500/40 hover:brightness-110 md:inline-block'
          >
            Get in touch
          </Link>

          <div className='lg:hidden'>
            <Burger color='white' opened={opened} onClick={toggle} size='sm' />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {opened && (
        <div className='border-t border-white/10 bg-[#070b16]/95 backdrop-blur-xl lg:hidden'>
          <nav className='container mx-auto flex flex-col gap-1 px-4 py-4'>
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                smooth
                onClick={close}
                className='rounded-lg px-4 py-3 text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white'
              >
                {link.label}
              </Link>
            ))}
            <Link
              to='#contact'
              smooth
              onClick={close}
              className='mt-2 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-center text-base font-semibold text-white'
            >
              Get in touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
