import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactForm, contactForm } from '@forms/contact';
import { sendContactUsMail } from '@services/common-services';
import {
  IconBuildingSkyscraper,
  IconMail,
  IconTag,
  IconMessageDots,
  IconSend,
  IconCheck,
  IconAlertCircle,
  IconSparkles
} from '@tabler/icons-react';

export const GeneralEnquiriesForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactForm>({
    resolver: zodResolver(contactForm),
    defaultValues: {
      companyName: '',
      customerEmail: '',
      subject: '',
      message: ''
    }
  });

  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const onSubmit = async (data: ContactForm) => {
    try {
      setNotification({ type: null, message: '' });
      await sendContactUsMail(data);
      setNotification({
        type: 'success',
        message:
          'Thank you for reaching out! Your message has been sent successfully. We will get back to you shortly.'
      });
      reset();
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 6000);
    } catch {
      setNotification({
        type: 'error',
        message:
          'Oops! Something went wrong while sending your message. Please try again or reach out to us directly.'
      });
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 6000);
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto px-4'>
      <div className='text-center mb-4 sm:mb-5'>
        <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-medium uppercase tracking-wider mb-2'>
          <IconSparkles size={12} className='text-purple-400' />
          <span>Direct Communication</span>
        </div>
        <h2 className='text-2xl sm:text-3xl font-bold text-white tracking-tight'>
          General Enquiries
        </h2>
        <p className='mt-1 text-xs sm:text-sm text-gray-300 max-w-md mx-auto'>
          Have questions or need assistance? Send us a message and our team will
          get back to you promptly.
        </p>
      </div>

      <div className='relative rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 p-5 sm:p-7 shadow-xl shadow-purple-950/20 transition-all hover:border-slate-600/80'>
        <div className='absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-pink-600/20 blur-3xl pointer-events-none rounded-full' />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='relative space-y-3.5'
        >
          <div>
            <label
              htmlFor='companyName'
              className='text-[11px] font-semibold text-gray-200 tracking-wide uppercase mb-1 flex items-center gap-1.5'
            >
              <IconBuildingSkyscraper size={13} className='text-purple-400' />
              Company Name <span className='text-red-400'>*</span>
            </label>
            <div className='relative'>
              <input
                id='companyName'
                type='text'
                placeholder='Your company or organization name'
                {...register('companyName')}
                className={`w-full h-10 px-3.5 rounded-xl bg-slate-800/80 border text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.companyName
                    ? 'border-red-500/80 focus:ring-red-500'
                    : 'border-slate-700 focus:ring-purple-500'
                }`}
              />
            </div>
            {errors.companyName && (
              <p className='mt-1 text-[11px] text-red-400 flex items-center gap-1'>
                <IconAlertCircle size={11} />
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='customerEmail'
              className='text-[11px] font-semibold text-gray-200 tracking-wide uppercase mb-1 flex items-center gap-1.5'
            >
              <IconMail size={13} className='text-blue-400' />
              Email Address <span className='text-red-400'>*</span>
            </label>
            <div className='relative'>
              <input
                id='customerEmail'
                type='email'
                placeholder='name@company.com'
                {...register('customerEmail')}
                className={`w-full h-10 px-3.5 rounded-xl bg-slate-800/80 border text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.customerEmail
                    ? 'border-red-500/80 focus:ring-red-500'
                    : 'border-slate-700 focus:ring-blue-500'
                }`}
              />
            </div>
            {errors.customerEmail && (
              <p className='mt-1 text-[11px] text-red-400 flex items-center gap-1'>
                <IconAlertCircle size={11} />
                {errors.customerEmail.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='subject'
              className='text-[11px] font-semibold text-gray-200 tracking-wide uppercase mb-1 flex items-center gap-1.5'
            >
              <IconTag size={13} className='text-indigo-400' />
              Subject <span className='text-red-400'>*</span>
            </label>
            <div className='relative'>
              <input
                id='subject'
                type='text'
                placeholder='What is your enquiry regarding?'
                {...register('subject')}
                className={`w-full h-10 px-3.5 rounded-xl bg-slate-800/80 border text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.subject
                    ? 'border-red-500/80 focus:ring-red-500'
                    : 'border-slate-700 focus:ring-indigo-500'
                }`}
              />
            </div>
            {errors.subject && (
              <p className='mt-1 text-[11px] text-red-400 flex items-center gap-1'>
                <IconAlertCircle size={11} />
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='message'
              className='text-[11px] font-semibold text-gray-200 tracking-wide uppercase mb-1 flex items-center gap-1.5'
            >
              <IconMessageDots size={13} className='text-pink-400' />
              Message <span className='text-red-400'>*</span>
            </label>
            <div className='relative'>
              <textarea
                id='message'
                rows={3}
                placeholder='Please describe your enquiry in detail...'
                {...register('message')}
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border text-white placeholder-gray-400 text-xs sm:text-sm resize-y focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.message
                    ? 'border-red-500/80 focus:ring-red-500'
                    : 'border-slate-700 focus:ring-purple-500'
                }`}
              />
            </div>
            {errors.message && (
              <p className='mt-1 text-[11px] text-red-400 flex items-center gap-1'>
                <IconAlertCircle size={11} />
                {errors.message.message}
              </p>
            )}
          </div>

          {notification.type === 'success' && (
            <div className='p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2 animate-fadeIn'>
              <IconCheck
                size={16}
                className='text-emerald-400 mt-0.5 shrink-0'
              />
              <p>{notification.message}</p>
            </div>
          )}
          {notification.type === 'error' && (
            <div className='p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2 animate-fadeIn'>
              <IconAlertCircle
                size={16}
                className='text-rose-400 mt-0.5 shrink-0'
              />
              <p>{notification.message}</p>
            </div>
          )}

          <div className='pt-1 flex justify-end'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 shadow-md shadow-indigo-500/25 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
            >
              {isSubmitting ? (
                <>
                  <svg
                    className='animate-spin h-3.5 w-3.5 text-white'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                      fill='none'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v8H4z'
                    />
                  </svg>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <IconSend size={14} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneralEnquiriesForm;
