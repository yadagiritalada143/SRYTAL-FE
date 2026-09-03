import {
  getFlagEmoji,
  DEFAULT_COUNTRIES,
  CURRENCY_OPTIONS,
  TIMELINE_OPTIONS
} from '../../../utils/country-codes';
import { consultationFormSchema } from '../../../forms/consultation';
import { contactForm } from '../../../forms/contact';

describe('Country Code & Currency Utilities', () => {
  it('correctly generates flag emojis from ISO codes', () => {
    expect(getFlagEmoji('IN')).toBe('🇮🇳');
    expect(getFlagEmoji('US')).toBe('🇺🇸');
    expect(getFlagEmoji('GB')).toBe('🇬🇧');
    expect(getFlagEmoji('DE')).toBe('🇩🇪');
  });

  it('contains essential default countries including India and US', () => {
    const codes = DEFAULT_COUNTRIES.map(c => c.code);
    expect(codes).toContain('IN');
    expect(codes).toContain('US');
    expect(codes).toContain('GB');
    expect(codes).toContain('AE');
  });

  it('contains expected currency and timeline options', () => {
    const currencies = CURRENCY_OPTIONS.map(c => c.value);
    expect(currencies).toContain('INR');
    expect(currencies).toContain('USD');
    expect(currencies).toContain('EUR');

    expect(TIMELINE_OPTIONS.length).toBeGreaterThanOrEqual(4);
  });
});

describe('Form Validation Schemas', () => {
  it('validates contactForm with mandatory companyName', () => {
    const validWithCompany = contactForm.safeParse({
      companyName: 'Acme Corp',
      customerEmail: 'test@example.com',
      subject: 'Inquiry',
      message: 'Hello'
    });
    expect(validWithCompany.success).toBe(true);

    const invalidWithoutCompany = contactForm.safeParse({
      customerEmail: 'test@example.com',
      subject: 'Inquiry',
      message: 'Hello'
    });
    expect(invalidWithoutCompany.success).toBe(false);
  });

  it('validates consultationFormSchema with required fields and optional company', () => {
    const validConsultation = consultationFormSchema.safeParse({
      fullName: 'John Doe',
      email: 'john@example.com',
      countryCode: '+91',
      countryIso: 'IN',
      phone: '9876543210',
      budget: '50,000',
      currency: 'INR',
      timeline: '1 - 3 Months',
      agreedToTerms: true
    });
    expect(validConsultation.success).toBe(true);

    const validWithOptionalCompany = consultationFormSchema.safeParse({
      fullName: 'John Doe',
      email: 'john@example.com',
      company: 'Tech Corp',
      countryCode: '+91',
      countryIso: 'IN',
      phone: '9876543210',
      budget: '50,000',
      currency: 'INR',
      timeline: '1 - 3 Months',
      agreedToTerms: true
    });
    expect(validWithOptionalCompany.success).toBe(true);

    const invalidWithoutTerms = consultationFormSchema.safeParse({
      fullName: 'John Doe',
      email: 'john@example.com',
      countryCode: '+91',
      countryIso: 'IN',
      phone: '9876543210',
      budget: '50,000',
      currency: 'INR',
      timeline: '1 - 3 Months',
      agreedToTerms: false
    });
    expect(invalidWithoutTerms.success).toBe(false);
  });
});
