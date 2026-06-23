import {
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandX
} from '@tabler/icons-react';
import { HashLink as Link } from 'react-router-hash-link';

const socials = [
  {
    label: 'LinkedIn',
    icon: IconBrandLinkedin,
    link: 'https://www.linkedin.com/company/srytal-systems-india-pvt-ltd'
  },
  { label: 'X', icon: IconBrandX, link: '#' },
  { label: 'Facebook', icon: IconBrandFacebook, link: '#' }
];

const linkGroups = [
  {
    title: 'Company',
    links: [
      { label: 'Home', to: '#header' },
      { label: 'About Us', to: '#about' },
      { label: 'Careers', to: '#' },
      { label: 'Press', to: '#' }
    ]
  },
  {
    title: 'Product',
    links: [
      { label: 'Services', to: '#services' },
      { label: 'Technologies', to: '#technologies' },
      { label: 'Why Us', to: '#' },
      { label: 'Demo', to: '#' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms of Service', to: '#' },
      { label: 'Help Center', to: '#' },
      { label: 'Contact Us', to: '#contact' }
    ]
  }
];

const Footer = () => {
  return (
    <footer className='border-t border-white/10 bg-[#070b16]'>
      <div className='container mx-auto px-4 py-14 md:px-8'>
        <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-5'>
          {/* Brand */}
          <div className='lg:col-span-2'>
            <h3 className='text-2xl font-bold text-gradient'>SRYTAL Systems</h3>
            <p className='mt-3 max-w-sm text-sm leading-relaxed text-slate-400'>
              Empowering business with technology. India Pvt Ltd — your trusted
              partner in digital transformation.
            </p>
            <div className='mt-6 flex gap-3'>
              {socials.map(({ icon: Icon, link, label }) => (
                <a
                  key={label}
                  href={link}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={label}
                  className='flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors duration-200 hover:border-fuchsia-500/40 hover:text-white'
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map(group => (
            <div key={group.title}>
              <h4 className='text-sm font-semibold uppercase tracking-wider text-white'>
                {group.title}
              </h4>
              <ul className='mt-4 space-y-3'>
                {group.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      smooth
                      className='text-sm text-slate-400 transition-colors duration-200 hover:text-fuchsia-300'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500'>
          &copy; 2024 - {new Date().getFullYear()} SRYTAL Systems India Pvt Ltd.
          All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
