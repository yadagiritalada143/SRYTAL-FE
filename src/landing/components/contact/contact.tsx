import GeneralEnquiriesForm from './GeneralEnquiriesForm';
import ExpertConsultationSection from './ExpertConsultationSection';

const ContactComponent = () => {
  return (
    <div id='contact' className='w-full py-10 sm:py-16'>
      <GeneralEnquiriesForm />

      <div className='max-w-4xl mx-auto my-14 sm:my-20 flex items-center gap-4 px-6'>
        <div className='h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent' />
        <span className='text-xs font-semibold uppercase tracking-widest text-slate-400 bg-slate-900/90 px-4 py-1.5 rounded-full border border-slate-800 shadow-sm'>
          Or Connect With Our Specialists
        </span>
        <div className='h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent' />
      </div>

      <ExpertConsultationSection />
    </div>
  );
};

export default ContactComponent;
