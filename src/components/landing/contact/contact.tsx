import { useForm } from 'react-hook-form';
import { TextInput, Textarea, Button } from '@mantine/core';
import { ContactForm, contactForm } from '../../../forms/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendContactUsMail } from '../../../services/common-services';
import { useState } from 'react';

const ContactComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactForm) });
  const [submit, setSubmit] = useState({ message: '', status: false });

  const onSubmit = (data: ContactForm) => {
    sendContactUsMail(data)
      .then(() => {
        setSubmit({
          message:
            'Thank you for reaching out! Your message has been successfully sent. We will get back to you as soon as possible',
          status: true,
        });
        setTimeout(() => {
          setSubmit({ message: '', status: false });
        }, 5000);
      })
      .catch(() => {
        setTimeout(() => {
          setSubmit({ message: '', status: false });
        }, 5000);
        setSubmit({
          message:
            'Oops! Something went wrong while sending your message. Please try again later or contact us directly.',
          status: true,
        });
      });
  };

  return (
    <div
      id="contact"
      className="flex bg-transparent justify-center items-center"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" px-8 py-4 w-full md:w-1/2  rounded-lg shadow-lg "
      >
        <h1 className="text-center text-xl font-semibold">Contact Us</h1>
        <TextInput
          label="Company Name"
          placeholder="Your company name"
          {...register('companyName', { required: 'Company name is required' })}
          error={errors.companyName?.message}
        />

        <TextInput
          label="Email"
          placeholder="Your email"
          {...register('customerEmail', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Please enter valid email !',
            },
          })}
          error={errors.customerEmail?.message}
          mt="md"
        />

        <TextInput
          label="Subject"
          placeholder="Message subject"
          {...register('subject', { required: 'Please enter the Subject !' })}
          error={errors.subject?.message}
          mt="md"
        />

        <Textarea
          label="Message"
          placeholder="Your message"
          autosize
          maxRows={5}
          minRows={3}
          {...register('message', { required: 'Please enter the Message !' })}
          error={errors.message?.message}
          mt="md"
        />

        {submit.status && <p className="my-8 ">{submit.message}</p>}

        <div className="mt-2 text-right">
          <Button type="submit" className="bg-blue-500 mt-4 hover:bg-blue-600">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactComponent;
