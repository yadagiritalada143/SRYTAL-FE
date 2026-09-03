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

      const india = apiCountries.find(c => c.code === 'IN');
      const rest = apiCountries
        .filter(c => c.code !== 'IN')
        .sort((a, b) => a.name.localeCompare(b.name));

      cachedCountries = india ? [india, ...rest] : rest;
      return cachedCountries;
    }
  } catch (err) {
    console.error('Error fetching country codes from API:', err);
    throw err;
  }

  return [];
};
