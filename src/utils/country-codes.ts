export interface CountryItem {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
  currency?: string;
}

export const getFlagEmoji = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return '🌐';
  }
};

export const DEFAULT_COUNTRIES: CountryItem[] = [
  { name: 'India', code: 'IN', dial_code: '+91', flag: '🇮🇳', currency: 'INR' },
  {
    name: 'United States',
    code: 'US',
    dial_code: '+1',
    flag: '🇺🇸',
    currency: 'USD'
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    dial_code: '+44',
    flag: '🇬🇧',
    currency: 'GBP'
  },
  { name: 'Canada', code: 'CA', dial_code: '+1', flag: '🇨🇦', currency: 'CAD' },
  {
    name: 'Australia',
    code: 'AU',
    dial_code: '+61',
    flag: '🇦🇺',
    currency: 'AUD'
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    dial_code: '+971',
    flag: '🇦🇪',
    currency: 'AED'
  },
  {
    name: 'Singapore',
    code: 'SG',
    dial_code: '+65',
    flag: '🇸🇬',
    currency: 'SGD'
  },
  {
    name: 'Germany',
    code: 'DE',
    dial_code: '+49',
    flag: '🇩🇪',
    currency: 'EUR'
  },
  { name: 'France', code: 'FR', dial_code: '+33', flag: '🇫🇷', currency: 'EUR' },
  { name: 'Japan', code: 'JP', dial_code: '+81', flag: '🇯🇵', currency: 'JPY' },
  {
    name: 'Netherlands',
    code: 'NL',
    dial_code: '+31',
    flag: '🇳🇱',
    currency: 'EUR'
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    dial_code: '+966',
    flag: '🇸🇦',
    currency: 'SAR'
  },
  {
    name: 'South Africa',
    code: 'ZA',
    dial_code: '+27',
    flag: '🇿🇦',
    currency: 'ZAR'
  },
  { name: 'Brazil', code: 'BR', dial_code: '+55', flag: '🇧🇷', currency: 'BRL' },
  {
    name: 'Switzerland',
    code: 'CH',
    dial_code: '+41',
    flag: '🇨🇭',
    currency: 'CHF'
  },
  {
    name: 'Malaysia',
    code: 'MY',
    dial_code: '+60',
    flag: '🇲🇾',
    currency: 'MYR'
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    dial_code: '+64',
    flag: '🇳🇿',
    currency: 'NZD'
  },
  {
    name: 'Ireland',
    code: 'IE',
    dial_code: '+353',
    flag: '🇮🇪',
    currency: 'EUR'
  }
];

export const CURRENCY_OPTIONS = [
  { value: 'INR', label: 'INR (₹)' },
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'AED', label: 'AED (د.إ)' },
  { value: 'CAD', label: 'CAD ($)' },
  { value: 'AUD', label: 'AUD ($)' },
  { value: 'SGD', label: 'SGD ($)' },
  { value: 'SAR', label: 'SAR (﷼)' },
  { value: 'JPY', label: 'JPY (¥)' }
];

export const TIMELINE_OPTIONS = [
  { value: '< 1 Month', label: 'Less than 1 Month' },
  { value: '1 - 3 Months', label: '1 - 3 Months' },
  { value: '3 - 6 Months', label: '3 - 6 Months' },
  { value: '6+ Months', label: '6+ Months' },
  { value: 'Flexible', label: 'Flexible / To be discussed' }
];

let cachedCountries: CountryItem[] | null = null;

export const fetchCountryCodes = async (): Promise<CountryItem[]> => {
  if (cachedCountries && cachedCountries.length > 0) {
    return cachedCountries;
  }

  try {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries/codes'
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch country codes: ${response.statusText}`);
    }
    const result = await response.json();
    if (result && Array.isArray(result.data)) {
      const apiCountries: CountryItem[] = result.data
        .filter((c: any) => c.name && c.code && c.dial_code)
        .map((c: any) => ({
          name: c.name,
          code: c.code,
          dial_code: c.dial_code.startsWith('+')
            ? c.dial_code
            : `+${c.dial_code}`,
          flag: getFlagEmoji(c.code)
        }));

      const popularCodes = new Set([
        'IN',
        'US',
        'GB',
        'CA',
        'AU',
        'AE',
        'SG',
        'DE',
        'FR'
      ]);
      const priority = apiCountries.filter(c => popularCodes.has(c.code));
      const others = apiCountries
        .filter(c => !popularCodes.has(c.code))
        .sort((a, b) => a.name.localeCompare(b.name));

      cachedCountries = [...priority, ...others];
      return cachedCountries;
    }
  } catch (err) {
    console.warn('Using default fallback countries list:', err);
  }

  cachedCountries = DEFAULT_COUNTRIES;
  return cachedCountries;
};
