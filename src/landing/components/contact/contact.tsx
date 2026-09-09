import GeneralEnquiriesForm from './GeneralEnquiriesForm';
import ExpertConsultationSection from './ExpertConsultationSection';

const ContactComponent = () => {
  return (
    <div id='contact' className='w-full py-2 sm:py-4'>
      <ExpertConsultationSection />

      <div className='max-w-3xl mx-auto my-6 sm:my-8 flex items-center gap-3 px-4'>
        <div className='h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent' />
        <span className='text-[11px] font-semibold uppercase tracking-widest text-slate-400 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800 shadow-sm'>
          Or Submit A General Enquiry
        </span>
        <div className='h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent' />
      </div>

      <GeneralEnquiriesForm />
    </div>
  );
};

export default ContactComponent;
