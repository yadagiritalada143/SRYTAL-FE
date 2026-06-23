import Header from '@landing/components/header/header';
import Main from '@landing/components/main/main';
import Footer from '@landing/components/footer/footer';
import About from '@landing/components/about/about';
import Services from '@landing/components/services/services';
import PromoBanner from '@landing/components/promo/promo';
import WhyChooseUs from '@landing/components/choose/choose';
import ContactComponent from '@landing/components/contact/contact';
import Technologies from '@landing/components/technologies/technologies';
import VisitorCount from '@landing/components/count/count';
import { Suspense } from 'react';
import { LazySection } from '@hooks/lazy-loading';

const Landing = () => {
  return (
    <div className='relative w-full min-h-screen overflow-x-hidden bg-[#070b16] text-slate-100 antialiased'>
      {/* Ambient background glows — soft, fixed, non-distracting */}
      <div className='pointer-events-none fixed inset-0 -z-10'>
        <div className='glow-blob h-[32rem] w-[32rem] -left-32 -top-32 bg-indigo-600' />
        <div className='glow-blob h-[28rem] w-[28rem] right-[-8rem] top-1/3 bg-fuchsia-600' />
        <div className='glow-blob h-[30rem] w-[30rem] bottom-0 left-1/4 bg-blue-700' />
      </div>

      {/* Sticky header */}
      <Header />

      {/* Hero */}
      <Main />

      <main className='relative'>
        <About />
        <Technologies />
        <Services />
        <WhyChooseUs />
        <PromoBanner />

        <Suspense
          fallback={
            <div className='py-12 text-center text-slate-400'>Loading…</div>
          }
        >
          <LazySection>
            <VisitorCount />
          </LazySection>
        </Suspense>

        <ContactComponent />
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
