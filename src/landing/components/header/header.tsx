import React from 'react';
import { Burger, HoverCard } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandMeta,
  IconChevronDown,
  IconLogin
} from '@tabler/icons-react';
import { HashLink as Link } from 'react-router-hash-link';

const dropdownStyles: React.CSSProperties = {
  backgroundColor: 'rgba(15, 23, 42, 0.95)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(51, 65, 85, 0.7)',
  borderRadius: '14px',
  boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.6)',
  padding: '8px'
};

const serviceItems = [
  'Custom Software Development',
  'Cloud Integration & DevOps',
  'Database Architecture',
  'Business Analytics & Insights',
  'Enterprise Security Solutions'
];

const techItems = [
  'Frontend & Mobile',
  'Backend & APIs',
  'Cloud & DevOps',
  'Databases & Storage'
];

const Header: React.FC = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <header
      id='header'
      className='w-full bg-slate-950/70 backdrop-blur-xl border-b border-slate-800/80 text-white z-50 transition-all duration-300'
    >
      <div className='w-full px-6 sm:px-10 lg:px-16 py-4 sm:py-4 flex items-center justify-between'>
        <a
          href='/'
          className='flex items-center transition-transform duration-200 hover:scale-[1.02] focus:outline-none shrink-0'
          aria-label='SRYTAL Home'
        >
          <img
            src='/logo.jpg'
            alt='SRYTAL Logo'
            className='h-11 sm:h-12 md:h-14 w-auto max-w-[240px] sm:max-w-[290px] object-contain rounded-lg'
          />
        </a>

        <nav
          aria-label='Primary Navigation'
          className='hidden lg:flex items-center gap-2 lg:gap-6 xl:gap-8'
        >
          <Link
            to='#'
            smooth={true}
            className='text-slate-300 hover:text-violet-300 font-medium text-sm lg:text-[15px] tracking-wide px-3.5 py-2 rounded-lg hover:bg-slate-800/60 transition-colors'
          >
            Home
          </Link>

          <Link
            to='#about'
            smooth={true}
            className='text-slate-300 hover:text-violet-300 font-medium text-sm lg:text-[15px] tracking-wide px-3.5 py-2 rounded-lg hover:bg-slate-800/60 transition-colors'
          >
            About
          </Link>

          <HoverCard
            width={250}
            position='bottom'
            radius='md'
            openDelay={100}
            closeDelay={120}
            withinPortal={true}
          >
            <HoverCard.Target>
              <Link
                to='#services'
                smooth={true}
                className='text-slate-300 hover:text-violet-300 font-medium text-sm lg:text-[15px] tracking-wide px-3.5 py-2 rounded-lg hover:bg-slate-800/60 transition-colors inline-flex items-center gap-1.5 group'
              >
                <span>Services</span>
                <IconChevronDown
                  size={15}
                  className='text-slate-400 group-hover:text-violet-300 group-hover:rotate-180 transition-transform duration-200'
                />
              </Link>
            </HoverCard.Target>
            <HoverCard.Dropdown style={dropdownStyles}>
              <div className='flex flex-col space-y-1'>
                {serviceItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to='#services'
                    smooth={true}
                    className='px-3.5 py-2 text-xs lg:text-sm font-medium text-slate-300 hover:text-violet-300 hover:bg-slate-800/80 rounded-lg transition-colors'
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </HoverCard.Dropdown>
          </HoverCard>

          <HoverCard
            width={220}
            position='bottom'
            radius='md'
            openDelay={100}
            closeDelay={120}
            withinPortal={true}
          >
            <HoverCard.Target>
              <Link
                to='#technologies'
                smooth={true}
                className='text-slate-300 hover:text-violet-300 font-medium text-sm lg:text-[15px] tracking-wide px-3.5 py-2 rounded-lg hover:bg-slate-800/60 transition-colors inline-flex items-center gap-1.5 group'
              >
                <span>Technologies</span>
                <IconChevronDown
                  size={15}
                  className='text-slate-400 group-hover:text-violet-300 group-hover:rotate-180 transition-transform duration-200'
                />
              </Link>
            </HoverCard.Target>
            <HoverCard.Dropdown style={dropdownStyles}>
              <div className='flex flex-col space-y-1'>
                {techItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to='#technologies'
                    smooth={true}
                    className='px-3.5 py-2 text-xs lg:text-sm font-medium text-slate-300 hover:text-violet-300 hover:bg-slate-800/80 rounded-lg transition-colors'
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </HoverCard.Dropdown>
          </HoverCard>

          <Link
            to='#contact'
            smooth={true}
            className='text-slate-300 hover:text-violet-300 font-medium text-sm lg:text-[15px] tracking-wide px-3.5 py-2 rounded-lg hover:bg-slate-800/60 transition-colors'
          >
            Contact
          </Link>
        </nav>

        <div className='hidden lg:flex items-center gap-4 sm:gap-6'>
          <div className='flex items-center gap-1 border-r border-slate-800 pr-4 sm:pr-6'>
            <a
              href='https://www.linkedin.com/company/srytal-systems-india-pvt-ltd'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='SRYTAL on LinkedIn'
              className='p-2 rounded-lg text-slate-400 hover:text-violet-300 hover:bg-slate-800/60 transition-colors'
            >
              <IconBrandLinkedin size={20} />
            </a>
            <a
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='SRYTAL on Facebook'
              className='p-2 rounded-lg text-slate-400 hover:text-violet-300 hover:bg-slate-800/60 transition-colors'
            >
              <IconBrandFacebook size={20} />
            </a>
          </div>

          <a
            href='/srytal/employee/login'
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/50 hover:border-blue-300 shadow-md shadow-blue-900/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-200'
          >
            <IconLogin size={17} />
            <span>Login</span>
          </a>
        </div>

        <div className='lg:hidden flex items-center'>
          <Burger
            color='white'
            opened={opened}
            onClick={toggle}
            aria-label='Toggle navigation menu'
            size='md'
          />
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          opened
            ? 'max-h-[400px] opacity-100 px-6 sm:px-10 py-5 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl'
            : 'max-h-0 opacity-0 p-0 border-0'
        }`}
      >
        <nav
          aria-label='Mobile Navigation'
          className='flex flex-col space-y-1.5'
        >
          <Link
            to='#'
            smooth={true}
            onClick={close}
            className='px-4 py-2.5 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-slate-800/60 font-medium text-sm transition-colors'
          >
            Home
          </Link>
          <Link
            to='#about'
            smooth={true}
            onClick={close}
            className='px-4 py-2.5 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-slate-800/60 font-medium text-sm transition-colors'
          >
            About Us
          </Link>
          <Link
            to='#services'
            smooth={true}
            onClick={close}
            className='px-4 py-2.5 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-slate-800/60 font-medium text-sm transition-colors'
          >
            Services
          </Link>
          <Link
            to='#technologies'
            smooth={true}
            onClick={close}
            className='px-4 py-2.5 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-slate-800/60 font-medium text-sm transition-colors'
          >
            Technologies
          </Link>
          <Link
            to='#contact'
            smooth={true}
            onClick={close}
            className='px-4 py-2.5 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-slate-800/60 font-medium text-sm transition-colors'
          >
            Contact
          </Link>
        </nav>

        <div className='pt-4 mt-4 border-t border-slate-800/80 flex flex-col gap-4'>
          <div className='flex items-center justify-center space-x-4'>
            <a
              href='https://www.linkedin.com/company/srytal-systems-india-pvt-ltd'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='SRYTAL on LinkedIn'
              className='p-2.5 rounded-xl text-slate-400 hover:text-violet-300 hover:bg-slate-800 transition-colors'
            >
              <IconBrandLinkedin size={20} />
            </a>
            <a
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='SRYTAL on Meta'
              className='p-2.5 rounded-xl text-slate-400 hover:text-violet-300 hover:bg-slate-800 transition-colors'
            >
              <IconBrandMeta size={20} />
            </a>
            <a
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='SRYTAL on Facebook'
              className='p-2.5 rounded-xl text-slate-400 hover:text-violet-300 hover:bg-slate-800 transition-colors'
            >
              <IconBrandFacebook size={20} />
            </a>
          </div>

          <a
            href='/srytal/employee/login'
            onClick={close}
            className='w-full py-3 rounded-xl text-sm font-semibold text-center text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/50 flex items-center justify-center gap-2 shadow-md shadow-blue-900/20'
          >
            <IconLogin size={17} />
            <span>Login</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
