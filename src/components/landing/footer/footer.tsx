import { IconBrandLinkedin, IconBrandFacebook } from '@tabler/icons-react';
import TechIcon from '../../common/tech-icons/tech-icons';
import { HashLink as Link } from 'react-router-hash-link';

const SocialIcons = [
  {
    name: 'Follow us on LinkedIn',
    icon: IconBrandLinkedin,
    link: 'https://www.linkedin.com/company/srytal-systems-india-pvt-ltd '
  },
  { name: 'Follow us on Facebook', icon: IconBrandFacebook, link: '' }
  // {
  //   name: "Watch us on YouTube",
  //   icon: IconBrandYoutube,
  // },
];

const Footer = () => {
  return (
    <div className=" text-white py-10 px-4 border-t-2 border-gray-400">
      <div className=" px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl py-4 sm:text-4xl cursor-pointer font-bold  text-white hover:text-transparent bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text  transition-transform duration-300 ease-in-out hover:scale-110  ">
              SRYTAL Systems India Pvt Ltd
            </h1>
            <p className="text-sm mb-4">Empowering Business with Technology</p>
            <div className="flex gap-6 mb-4">
              {SocialIcons.map((icon, index) => {
                const IconComponent = icon.icon;
                return (
                  <a href={icon.link} key={index} target="_blank">
                    <TechIcon
                      icon={IconComponent}
                      name={icon.name}
                      color="text-white"
                      hoverColor="text-purple-400"
                      size={16}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-8">
            <div className="mb-6 md:mb-0">
              <h2 className=" text-xl font-bold mb-2">Company</h2>
              <ul className=" text-gray-400">
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <Link to="#header" smooth={true}>
                    Home
                  </Link>
                </li>
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <Link to="#about" smooth={true}>
                    About Us
                  </Link>
                </li>
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <a href="#">Careers</a>
                </li>
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <a href="#">Press</a>
                </li>
              </ul>
            </div>

            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Product</h2>
              <ul className="space-y-1  text-gray-400">
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <a href="#">Features</a>
                </li>
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <a href="#">Integrations</a>
                </li>
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <a href="#">Pricing</a>
                </li>
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <a href="#">Demo</a>
                </li>
              </ul>
            </div>

            <div className=" mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Resources</h2>
              <ul className="space-y-1  text-gray-400">
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <a href="#">Privacy Policy</a>
                </li>
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <a href="#">Terms of Service</a>
                </li>
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <a href="#">Help Center</a>
                </li>
                <li className="text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400">
                  <Link to="#contact" smooth={true}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400">
        &copy; SRYTAL Systems India Pvt Ltd 2024 - {new Date().getFullYear()} |
        All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
