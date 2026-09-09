import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConsultationForm, consultationFormSchema } from '@forms/consultation';
import { sendExpertConsultationMail } from '@services/common-services';
import { useAppTheme } from '@hooks/use-app-theme';
import {
  fetchCountryCodes,
  fetchCurrencies,
  CountryItem,
  CurrencyOption,
  TIMELINE_OPTIONS
} from '@utils/country-codes';
import {
  IconArrowRight,
  IconCheck,
  IconAlertCircle,
  IconStarFilled,
  IconShieldCheck,
  IconCpu,
  IconChevronDown,
  IconUser,
  IconMail,
  IconPhone,
  IconBuildingSkyscraper,
  IconCurrencyDollar,
  IconClock
} from '@tabler/icons-react';

export const ExpertConsultationSection = () => {
  const { organizationConfig } = useAppTheme();
  const orgName = organizationConfig?.organization_name || 'SRYTAL';

  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(
    null
  );
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('INR');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ConsultationForm>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      countryCode: '+91',
      countryIso: 'IN',
      phone: '',
      company: '',
      budget: '',
      currency: 'INR',
      timeline: ''
    }
  });

  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    let isMounted = true;
    fetchCountryCodes()
      .then(data => {
        if (isMounted && data.length > 0) {
          setCountries(data);
          const defaultSelected = data.find(c => c.code === 'IN') || data[0];
          if (defaultSelected) {
            setSelectedCountry(defaultSelected);
            setValue('countryCode', defaultSelected.dial_code);
            setValue('countryIso', defaultSelected.code);
          }
        }
      })
      .catch(err => {
        console.warn('Could not fetch country codes from API:', err);
      });

    fetchCurrencies()
      .then(data => {
        if (isMounted && data.length > 0) {
          setCurrencies(data);
        }
      })
      .catch(err => {
        console.warn('Could not fetch currencies from API:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [setValue]);

  const handleCountryChange = (isoCode: string) => {
    const found = countries.find(c => c.code === isoCode);
    if (found) {
      setSelectedCountry(found);
      setValue('countryCode', found.dial_code);
      setValue('countryIso', found.code);
      if (
        found.currency &&
        currencies.some(curr => curr.value === found.currency)
      ) {
        setSelectedCurrency(found.currency);
        setValue('currency', found.currency);
      }
    }
  };

  const handleCurrencyChange = (currencyVal: string) => {
    setSelectedCurrency(currencyVal);
    setValue('currency', currencyVal);
  };

  const onSubmit = async (data: ConsultationForm) => {
    try {
      setNotification({ type: null, message: '' });
      await sendExpertConsultationMail(data);
      setNotification({
        type: 'success',
        message:
          'Thank you! Your consultation request has been submitted successfully. Our technology specialists will connect with you within 24 hours.'
      });
      reset({
        fullName: '',
        email: '',
        countryCode: selectedCountry?.dial_code || '+91',
        countryIso: selectedCountry?.code || 'IN',
        phone: '',
        company: '',
        budget: '',
        currency: selectedCurrency,
        timeline: ''
      });
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 7000);
    } catch {
      setNotification({
        type: 'error',
        message:
          'Unable to submit your request at the moment. Please try again or contact our team directly.'
      });
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 7000);
    }
  };

  const supportHighlights = [
    {
      icon: <IconCpu size={16} />,
      title: 'Technical Feasibility & Architecture',
      desc: 'Get expert guidance, a technology roadmap, and project estimate within 24 hours.'
    },
    {
      icon: <IconShieldCheck size={16} />,
      title: 'Confidential & NDA Protected',
      desc: 'Your ideas and business information are handled with complete confidentiality.'
    }
  ];

  return (
    <section id='expert-consultation' className='w-full max-w-6xl mx-auto px-4'>
      <div className='relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-950'>
        <div className='absolute -top-24 -left-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none' />

        <div className='grid grid-cols-1 lg:grid-cols-12 relative z-10'>
          <div
            className='lg:col-span-5 p-7 sm:p-9 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden'
            style={{
              backgroundImage:
                'linear-gradient(145deg, rgba(8, 14, 30, 0.96) 0%, rgba(15, 23, 42, 0.93) 100%), url(/wal2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className='relative z-10'>
              <div className='inline-flex items-center gap-1.5 px-3.5 py-3 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-gray-200 tracking-wide mb-6 shadow-sm backdrop-blur-md'>
                <IconStarFilled size={12} className='text-amber-400' />
                <span>Customer Support</span>
              </div>

              <h3 className='text-2xl sm:text-3xl font-bold text-white leading-snug tracking-tight mb-4'>
                Let’s Find the Right Solution for Your Business
              </h3>

              <p className='text-gray-300 text-sm sm:text-base leading-relaxed mb-6'>
                At {orgName}, our specialists understand your requirements and
                help you choose the right technology approach for your business.
              </p>

              <div className='space-y-4 pt-1'>
                {supportHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className='flex items-start gap-3 text-xs sm:text-sm text-gray-300'
                  >
                    <div className='p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 shrink-0 mt-0.5'>
                      {item.icon}
                    </div>
                    <div>
                      <span className='font-semibold text-white'>
                        {item.title}:
                      </span>{' '}
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='pt-6 mt-8 border-t border-slate-800/80 flex items-center justify-end relative z-10'>
              <span className='inline-flex items-center gap-2 text-emerald-400 font-semibold text-xs sm:text-sm'>
                <span className='w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse' />
                Consultants Available Now
              </span>
            </div>
          </div>

          {/* Right Column: Expert Consultation Form */}
          <div className='lg:col-span-7 p-7 sm:p-9 lg:p-11 bg-slate-900/85 backdrop-blur-2xl flex flex-col justify-center'>
            {/* Header */}
            <div className='mb-6 text-center sm:text-left'>
              <h2 className='text-xl sm:text-2xl font-bold text-white tracking-tight'>
                Get Your Free Expert Consultation Today
              </h2>
              <p className='mt-1.5 text-xs sm:text-sm text-gray-300'>
                Share your requirements and our specialists will prepare a
                customized roadmap.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-6 sm:space-y-4.5'
            >
              {/* Row 1: Full Name * & Email * */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                <div>
                  <label
                    htmlFor='fullName'
                    className='text-xs sm:text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5'
                  >
                    <IconUser size={15} className='text-blue-400' />
                    <span>
                      Full Name <span className='text-red-400'>*</span>
                    </span>
                  </label>
                  <input
                    id='fullName'
                    type='text'
                    placeholder='Full name'
                    {...register('fullName')}
                    className={`w-full h-11 sm:h-12 px-4 rounded-xl bg-slate-800/80 border text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.fullName
                        ? 'border-red-500/80 focus:ring-red-500'
                        : 'border-slate-700/80 focus:ring-blue-500'
                    }`}
                  />
                  {errors.fullName && (
                    <p className='mt-1.5 text-xs text-red-400 flex items-center gap-1'>
                      <IconAlertCircle size={13} />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='text-xs sm:text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5'
                  >
                    <IconMail size={15} className='text-cyan-400' />
                    <span>
                      Email <span className='text-red-400'>*</span>
                    </span>
                  </label>
                  <input
                    id='email'
                    type='email'
                    placeholder='Email address'
                    {...register('email')}
                    className={`w-full h-11 sm:h-12 px-4 rounded-xl bg-slate-800/80 border text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.email
                        ? 'border-red-500/80 focus:ring-red-500'
                        : 'border-slate-700/80 focus:ring-blue-500'
                    }`}
                  />
                  {errors.email && (
                    <p className='mt-1.5 text-xs text-red-400 flex items-center gap-1'>
                      <IconAlertCircle size={13} />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                <div>
                  <label
                    htmlFor='phone'
                    className='text-xs sm:text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5'
                  >
                    <IconPhone size={15} className='text-indigo-400' />
                    <span>
                      Phone Number <span className='text-red-400'>*</span>
                    </span>
                  </label>
                  <div className='flex h-11 sm:h-12 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-800/80 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all'>
                    <div className='relative shrink-0 border-r border-slate-700/80 bg-slate-800 flex items-center'>
                      <select
                        value={selectedCountry?.code || 'IN'}
                        onChange={e => handleCountryChange(e.target.value)}
                        aria-label='Country Code'
                        className='h-full bg-transparent text-white text-xs sm:text-sm pl-3 pr-5 focus:outline-none cursor-pointer appearance-none font-medium'
                        style={{ minWidth: '95px' }}
                      >
                        {countries.map(c => (
                          <option
                            key={`${c.code}-${c.dial_code}`}
                            value={c.code}
                            className='bg-slate-900 text-white'
                          >
                            {c.code} ({c.dial_code})
                          </option>
                        ))}
                      </select>
                      <IconChevronDown
                        size={13}
                        className='pointer-events-none absolute right-1.5 text-gray-400'
                      />
                    </div>

                    <input
                      id='phone'
                      type='tel'
                      placeholder='Phone number'
                      {...register('phone')}
                      className='w-full h-full px-3.5 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none'
                    />
                  </div>
                  {errors.phone && (
                    <p className='mt-1.5 text-xs text-red-400 flex items-center gap-1'>
                      <IconAlertCircle size={13} />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className='flex items-center justify-between mb-1.5'>
                    <label
                      htmlFor='company'
                      className='text-xs sm:text-sm font-semibold text-gray-200 uppercase tracking-wider flex items-center gap-1.5'
                    >
                      <IconBuildingSkyscraper
                        size={15}
                        className='text-purple-400'
                      />
                      <span>Company</span>
                    </label>
                    <span className='text-xs text-gray-400 font-normal italic'>
                      Optional
                    </span>
                  </div>
                  <input
                    id='company'
                    type='text'
                    placeholder='Company name'
                    {...register('company')}
                    className='w-full h-11 sm:h-12 px-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                <div>
                  <label
                    htmlFor='budget'
                    className='text-xs sm:text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5'
                  >
                    <IconCurrencyDollar
                      size={15}
                      className='text-emerald-400'
                    />
                    <span>
                      Project Budget <span className='text-red-400'>*</span>
                    </span>
                  </label>
                  <div className='flex h-11 sm:h-12 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-800/80 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all'>
                    <div className='relative shrink-0 border-l border-slate-700/80 bg-slate-800 flex items-center w-28 sm:w-30'>
                      <select
                        value={selectedCurrency}
                        onChange={e => handleCurrencyChange(e.target.value)}
                        aria-label='Currency'
                        className='w-full h-full bg-transparent text-white text-xs sm:text-sm pl-3 pr-6 focus:outline-none cursor-pointer appearance-none font-medium'
                      >
                        {currencies.map(curr => (
                          <option
                            key={curr.value}
                            value={curr.value}
                            className='bg-slate-900 text-white'
                          >
                            {curr.label}
                          </option>
                        ))}
                      </select>
                      <IconChevronDown
                        size={13}
                        className='pointer-events-none absolute right-2 text-gray-400'
                      />
                    </div>

                    <input
                      id='budget'
                      type='text'
                      placeholder='e.g. 50,000'
                      {...register('budget')}
                      className='flex-1 min-w-0 w-full h-full px-3.5 bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none'
                    />
                  </div>
                  {errors.budget && (
                    <p className='mt-1.5 text-xs text-red-400 flex items-center gap-1'>
                      <IconAlertCircle size={13} />
                      {errors.budget.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='timeline'
                    className='text-xs sm:text-sm font-semibold text-gray-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5'
                  >
                    <IconClock size={15} className='text-amber-400' />
                    <span>
                      Timeline <span className='text-red-400'>*</span>
                    </span>
                  </label>
                  <div className='relative h-11 sm:h-12'>
                    <select
                      id='timeline'
                      {...register('timeline')}
                      defaultValue=''
                      className={`w-full h-full px-4 rounded-xl bg-slate-800/80 border text-white text-sm focus:outline-none focus:ring-2 focus:border-transparent appearance-none cursor-pointer transition-all ${
                        errors.timeline
                          ? 'border-red-500/80 focus:ring-red-500'
                          : 'border-slate-700/80 focus:ring-blue-500'
                      }`}
                    >
                      <option
                        value=''
                        disabled
                        className='bg-slate-900 text-gray-400'
                      >
                        Select Timeline
                      </option>
                      {TIMELINE_OPTIONS.map(opt => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className='bg-slate-900 text-white'
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <IconChevronDown
                      size={14}
                      className='pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400'
                    />
                  </div>
                  {errors.timeline && (
                    <p className='mt-1.5 text-xs text-red-400 flex items-center gap-1'>
                      <IconAlertCircle size={13} />
                      {errors.timeline.message}
                    </p>
                  )}
                </div>
              </div>

              {notification.type === 'success' && (
                <div className='p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-sm flex items-start gap-2.5 animate-fadeIn'>
                  <IconCheck
                    size={18}
                    className='text-emerald-400 mt-0.5 shrink-0'
                  />
                  <p>{notification.message}</p>
                </div>
              )}
              {notification.type === 'error' && (
                <div className='p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-sm flex items-start gap-2.5 animate-fadeIn'>
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
                  className='w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-4 pl-6 pr-2 py-2 rounded-2xl font-bold text-sm sm:text-base text-white bg-[#1d4ed8] hover:bg-[#1e40af] active:bg-[#1e3a8a] shadow-lg shadow-blue-700/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group'
                >
                  <span className='tracking-wide'>
                    {isSubmitting ? 'Submitting...' : 'Get Expert Guidance'}
                  </span>

                  <span className='w-7 h-7 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5 shrink-0'>
                    {isSubmitting ? (
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
                    ) : (
                      <IconArrowRight
                        size={16}
                        className='text-white stroke-[2.5]'
                      />
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertConsultationSection;
