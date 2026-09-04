import {
  getFlagEmoji,
  fetchCountryCodes,
  fetchCurrencies,
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

  it('contains expected timeline options', () => {
    expect(TIMELINE_OPTIONS.length).toBeGreaterThanOrEqual(4);
  });

  it('fetches countries from API dynamically without hardcoded list', async () => {
    // Mock global.fetch to simulate API response
    const mockData = {
      data: [
        { name: 'India', code: 'IN', dial_code: '+91' },
        { name: 'United States', code: 'US', dial_code: '+1' }
      ]
    };
    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    }) as any;

    const countries = await fetchCountryCodes();
    expect(countries.length).toBeGreaterThan(0);
    expect(countries[0].code).toBe('IN');
    expect(countries[0].dial_code).toBe('+91');
    expect(countries[0].flag).toBe('🇮🇳');

    global.fetch = originalFetch;
  });

  it('fetches currencies from open source API dynamically', async () => {
    const mockCurrencyData = {
      data: [
        { name: 'India', currency: 'INR', iso2: 'IN' },
        { name: 'United States', currency: 'USD', iso2: 'US' },
        { name: 'Eurozone', currency: 'EUR', iso2: 'EU' }
      ]
    };
    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockCurrencyData
    }) as any;

    const currencies = await fetchCurrencies();
    expect(currencies.length).toBeGreaterThan(0);
    const inr = currencies.find(c => c.value === 'INR');
    expect(inr).toBeDefined();
    expect(inr?.label).toContain('INR');

    global.fetch = originalFetch;
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
