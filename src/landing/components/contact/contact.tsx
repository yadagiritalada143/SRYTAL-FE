import { useForm } from 'react-hook-form';
import { TextInput, Textarea } from '@mantine/core';
import { ContactForm, contactForm } from '@forms/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendContactUsMail } from '@services/common-services';
import { useState } from 'react';
import {
  IconMail,
  IconMapPin,
  IconSend,
  IconBrandLinkedin
} from '@tabler/icons-react';
import { CommonButton } from '@components/common/button/CommonButton';
import Reveal from '@landing/components/common/Reveal';

const inputStyles = {
  label: { color: '#cbd5e1', marginBottom: 6, fontWeight: 500 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,255,255,0.12)',
    color: '#f1f5f9'
  }
};

const contactDetails = [
  {
    icon: IconMail,
    label: 'Email',
    value: 'info@srytal.com',
    href: 'mailto:info@srytal.com'
  },
  {
    icon: IconMapPin,
    label: 'Location',
    value: 'SRYTAL Systems India Pvt Ltd',
    href: undefined
  },
  {
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    value: 'Srytal Systems India Pvt Ltd',
    href: 'https://www.linkedin.com/company/srytal-systems-india-pvt-ltd'
  }
];

const ContactComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactForm>({ resolver: zodResolver(contactForm) });
  const [submit, setSubmit] = useState({ message: '', status: false });

  const onSubmit = (data: ContactForm) => {
    return sendContactUsMail(data)
      .then(() => {
        setSubmit({
          message:
            'Thank you for reaching out! Your message has been sent. We will get back to you as soon as possible.',
          status: true
        });
        reset();
        setTimeout(() => setSubmit({ message: '', status: false }), 6000);
      })
      .catch(() => {
        setSubmit({
          message:
            'Oops! Something went wrong while sending your message. Please try again later.',
          status: true
        });
        setTimeout(() => setSubmit({ message: '', status: false }), 6000);
      });
  };

  return (
    <section id='contact' className='py-24'>
      <div className='container mx-auto grid gap-12 px-4 md:px-8 lg:grid-cols-2'>
        {/* Left: info */}
        <Reveal>
          <span className='inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-300'>
            Get in touch
          </span>
          <h2 className='mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl'>
            Let’s build something great together
          </h2>
          <p className='mt-4 max-w-md text-base leading-relaxed text-slate-400'>
            Have a project in mind or a question about our services? Reach out
            and our team will respond shortly.
          </p>

          <div className='mt-10 space-y-5'>
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className='flex items-center gap-4'>
                <span className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-fuchsia-300 ring-1 ring-white/10'>
                  <Icon size={20} />
                </span>
                <div className='min-w-0'>
                  <div className='text-xs uppercase tracking-wider text-slate-500'>
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target='_blank'
                      rel='noreferrer'
                      className='break-words text-sm font-medium text-slate-200 transition-colors hover:text-fuchsia-300'
                    >
                      {value}
                    </a>
                  ) : (
                    <div className='break-words text-sm font-medium text-slate-200'>
                      {value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={150}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='glass-card rounded-2xl p-6 md:p-8'
          >
            <TextInput
              label='Company Name'
              placeholder='Your company name'
              styles={inputStyles}
              {...register('companyName', {
                required: 'Company name is required'
              })}
              error={errors.companyName?.message}
            />
            <TextInput
              label='Email'
              placeholder='you@company.com'
              styles={inputStyles}
              {...register('customerEmail', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email!'
                }
              })}
              error={errors.customerEmail?.message}
              mt='md'
            />
            <TextInput
              label='Subject'
              placeholder='Message subject'
              styles={inputStyles}
              {...register('subject', {
                required: 'Please enter the subject!'
              })}
              error={errors.subject?.message}
              mt='md'
            />
            <Textarea
              label='Message'
              placeholder='Tell us about your project…'
              autosize
              maxRows={6}
              minRows={4}
              styles={inputStyles}
              {...register('message', {
                required: 'Please enter the message!'
              })}
              error={errors.message?.message}
              mt='md'
            />

            {submit.status && (
              <p className='mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-slate-300'>
                {submit.message}
              </p>
            )}

            <CommonButton
              type='submit'
              fullWidth
              size='md'
              loading={isSubmitting}
              mt='lg'
              leftSection={<IconSend size={18} />}
              className='bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:brightness-110'
            >
              Send Message
            </CommonButton>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactComponent;
