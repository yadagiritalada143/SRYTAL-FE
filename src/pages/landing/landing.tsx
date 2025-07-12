import Header from '../../components/landing/header/header';
import Main from '../../components/landing/main/main';
import Footer from '../../components/landing/footer/footer';
import About from '../../components/landing/about/about';
import Services from '../../components/landing/services/services';
import PromoBanner from '../../components/landing/promo/promo';
import WhyChooseUs from '../../components/landing/choose/choose';
import ContactComponent from '../../components/landing/contact/contact';
import Technologies from '../../components/landing/technologies/technologies';
import VisitorCount from '../../components/landing/count/count';
import { useMediaQuery } from '@mantine/hooks';
import { Suspense } from 'react';
import { LazySection } from '../../hooks/lazy-loading';

const Landing = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  return (
    <div className="relative  w-full h-screen bg-gray-900 text-white overflow-x-hidden">
      <div className="fixed top-10 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-50 animate-move1"></div>
      <div className="fixed top-20 right-10 w-40 h-40 bg-pink-500 rounded-full opacity-50 animate-move2"></div>
      <div className="fixed bottom-10 left-20 w-48 h-48 bg-blue-500 rounded-full opacity-50 animate-move3"></div>

      <div
        className="flex flex-col justify-between"
        style={{
          backgroundImage: 'url(/public/wal2.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          height: isSmallScreen ? '140dvh' : '120dvh',
        }}
      >
        <Header />
        <Main />
      </div>

      <div className=" py-6 w-full ">
        <About />
      </div>
      <div className="py-6 w-full ">
        <Technologies />
      </div>
      <div className=" py-6 w-full mx-auto">
        <Services />
      </div>

      <div className=" py-6 w-full mx-auto">
        <PromoBanner />
      </div>

      <div className=" py-6 w-full max-w-5xl mx-auto">
        <WhyChooseUs />
      </div>
      <Suspense fallback={<div className="text-center">Loading About...</div>}>
        <LazySection>
          <div className=" py-6 w-full mx-auto">
            <VisitorCount />
          </div>
        </LazySection>
      </Suspense>

      <div className=" py-6 w-full mx-auto">
        <ContactComponent />
      </div>

      <div className=" py-6 w-full max-w-5xl mx-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
