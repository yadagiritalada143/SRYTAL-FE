import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandX,
  IconBrandGithub,
  IconChevronRight
} from '@tabler/icons-react';

const SocialIcons = [
  {
    name: 'LinkedIn',
    icon: IconBrandLinkedin,
    link: 'https://www.linkedin.com/company/srytal-systems-india-pvt-ltd',
    hoverClass:
      'hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10'
  },
  {
    name: 'Facebook',
    icon: IconBrandFacebook,
    link: 'https://www.facebook.com',
    hoverClass:
      'hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10'
  },
  {
    name: 'X (Twitter)',
    icon: IconBrandX,
    link: 'https://twitter.com',
    hoverClass: 'hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10'
  },
  {
    name: 'GitHub',
    icon: IconBrandGithub,
    link: 'https://github.com',
    hoverClass:
      'hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10'
  }
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full text-white relative overflow-hidden'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' />

      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14'>
        <div className='flex flex-col lg:flex-row justify-between gap-10 lg:gap-14'>
          <div className='max-w-md space-y-3.5'>
            <a
              href='/'
              className='inline-block cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105'
            >
              <img
                src='/logo.jpg'
                alt='SRYTAL Systems Logo'
                className='h-16 sm:h-20 w-auto max-w-[300px] rounded-xl shadow-md border border-slate-800/80'
              />
            </a>
            <p className='text-sm text-gray-400 font-medium'>
              Empowering Business with Technology
            </p>

            <div className='flex items-center gap-3 pt-2'>
              {SocialIcons.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={index}
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={item.name}
                    className={`w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-gray-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-200 shadow-sm ${item.hoverClass}`}
                  >
                    <IconComponent size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12'>
            <div className='space-y-3'>
              <h3 className='text-xs font-bold uppercase tracking-wider text-gray-200 border-b border-slate-800/80 pb-2'>
                Company
              </h3>
              <ul className='space-y-2.5 text-xs sm:text-sm text-gray-400'>
                <li>
                  <Link
                    to='#header'
                    smooth={true}
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='#about'
                    smooth={true}
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Careers</span>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Press</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h3 className='text-xs font-bold uppercase tracking-wider text-gray-200 border-b border-slate-800/80 pb-2'>
                Product
              </h3>
              <ul className='space-y-2.5 text-xs sm:text-sm text-gray-400'>
                <li>
                  <a
                    href='#'
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Features</span>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Integrations</span>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Pricing</span>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Demo</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h3 className='text-xs font-bold uppercase tracking-wider text-gray-200 border-b border-slate-800/80 pb-2'>
                Resources
              </h3>
              <ul className='space-y-2.5 text-xs sm:text-sm text-gray-400'>
                <li>
                  <a
                    href='#'
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Privacy Policy</span>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Terms of Service</span>
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Help Center</span>
                  </a>
                </li>
                <li>
                  <Link
                    to='#contact'
                    smooth={true}
                    className='hover:text-white hover:translate-x-1.5 transition-all duration-200 inline-flex items-center gap-1.5 group'
                  >
                    <IconChevronRight
                      size={12}
                      className='text-slate-600 group-hover:text-blue-400 transition-colors'
                    />
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400'>
          <p>
            &copy; SRYTAL Systems India Pvt Ltd 2024 - {currentYear} | All
            Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
