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
      <div className='text-center mb-8'>
        <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium uppercase tracking-wider mb-3'>
          <IconSparkles size={14} className='text-purple-400' />
          <span>Direct Communication</span>
        </div>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'>
          General Enquiries
        </h2>
        <p className='mt-2 text-sm sm:text-base text-gray-300 max-w-lg mx-auto'>
          Have questions, partnership inquiries, or need assistance? Drop us a
          note below and our team will get back to you promptly.
        </p>
      </div>

      <div className='relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 p-6 sm:p-10 shadow-2xl shadow-purple-950/20 transition-all hover:border-slate-600/80'>
        <div className='absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-pink-600/20 blur-3xl pointer-events-none rounded-full' />

        <form onSubmit={handleSubmit(onSubmit)} className='relative space-y-5'>
          <div>
            <label
              htmlFor='companyName'
              className='text-xs font-semibold text-gray-200 tracking-wide uppercase mb-1.5 flex items-center gap-1.5'
            >
              <IconBuildingSkyscraper size={15} className='text-purple-400' />
              Company Name <span className='text-red-400'>*</span>
            </label>
            <div className='relative'>
              <input
                id='companyName'
                type='text'
                placeholder='Your company or organization name'
                {...register('companyName')}
                className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.companyName
                    ? 'border-red-500/80 focus:ring-red-500'
                    : 'border-slate-700 focus:ring-purple-500'
                }`}
              />
            </div>
            {errors.companyName && (
              <p className='mt-1.5 text-xs text-red-400 flex items-center gap-1'>
                <IconAlertCircle size={13} />
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='customerEmail'
              className='text-xs font-semibold text-gray-200 tracking-wide uppercase mb-1.5 flex items-center gap-1.5'
            >
              <IconMail size={15} className='text-blue-400' />
              Email Address <span className='text-red-400'>*</span>
            </label>
            <div className='relative'>
              <input
                id='customerEmail'
                type='email'
                placeholder='name@company.com'
                {...register('customerEmail')}
                className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.customerEmail
                    ? 'border-red-500/80 focus:ring-red-500'
                    : 'border-slate-700 focus:ring-blue-500'
                }`}
              />
            </div>
            {errors.customerEmail && (
              <p className='mt-1.5 text-xs text-red-400 flex items-center gap-1'>
                <IconAlertCircle size={13} />
                {errors.customerEmail.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='subject'
              className='text-xs font-semibold text-gray-200 tracking-wide uppercase mb-1.5 flex items-center gap-1.5'
            >
              <IconTag size={15} className='text-indigo-400' />
              Subject <span className='text-red-400'>*</span>
            </label>
            <div className='relative'>
              <input
                id='subject'
                type='text'
                placeholder='What is your enquiry regarding?'
                {...register('subject')}
                className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.subject
                    ? 'border-red-500/80 focus:ring-red-500'
                    : 'border-slate-700 focus:ring-indigo-500'
                }`}
              />
            </div>
            {errors.subject && (
              <p className='mt-1.5 text-xs text-red-400 flex items-center gap-1'>
                <IconAlertCircle size={13} />
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='message'
              className='text-xs font-semibold text-gray-200 tracking-wide uppercase mb-1.5 flex items-center gap-1.5'
            >
              <IconMessageDots size={15} className='text-pink-400' />
              Message <span className='text-red-400'>*</span>
            </label>
            <div className='relative'>
              <textarea
                id='message'
                rows={4}
                placeholder='Please describe your enquiry in detail...'
                {...register('message')}
                className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border text-white placeholder-gray-400 text-sm resize-y focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  errors.message
                    ? 'border-red-500/80 focus:ring-red-500'
                    : 'border-slate-700 focus:ring-purple-500'
                }`}
              />
            </div>
            {errors.message && (
              <p className='mt-1.5 text-xs text-red-400 flex items-center gap-1'>
                <IconAlertCircle size={13} />
                {errors.message.message}
              </p>
            )}
          </div>

          {notification.type === 'success' && (
            <div className='p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-sm flex items-start gap-2.5 animate-fadeIn'>
              <IconCheck
                size={18}
                className='text-emerald-400 mt-0.5 shrink-0'
              />
              <p>{notification.message}</p>
            </div>
          )}
          {notification.type === 'error' && (
            <div className='p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-sm flex items-start gap-2.5 animate-fadeIn'>
              <IconAlertCircle
                size={18}
                className='text-rose-400 mt-0.5 shrink-0'
              />
              <p>{notification.message}</p>
            </div>
          )}

          <div className='pt-2 flex justify-end'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 shadow-lg shadow-indigo-500/25 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
            >
              {isSubmitting ? (
                <>
                  <svg
                    className='animate-spin h-4 w-4 text-white'
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
                  <IconSend size={16} />
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
