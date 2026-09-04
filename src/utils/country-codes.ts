export interface CountryItem {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
  currency?: string;
}

export interface CurrencyOption {
  value: string;
  label: string;
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

export const getCurrencySymbol = (currencyCode: string): string => {
  try {
    const parts = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).formatToParts(0);
    const symbolPart = parts.find(p => p.type === 'currency');
    return symbolPart ? symbolPart.value : currencyCode;
  } catch {
    return currencyCode;
  }
};

export const TIMELINE_OPTIONS = [
  { value: '< 1 Month', label: 'Less than 1 Month' },
  { value: '1 - 3 Months', label: '1 - 3 Months' },
  { value: '3 - 6 Months', label: '3 - 6 Months' },
  { value: '6+ Months', label: '6+ Months' },
  { value: 'Flexible', label: 'Flexible / To be discussed' }
];

let cachedCountries: CountryItem[] | null = null;
let cachedCurrencies: CurrencyOption[] | null = null;

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

export const fetchCurrencies = async (): Promise<CurrencyOption[]> => {
  if (cachedCurrencies && cachedCurrencies.length > 0) {
    return cachedCurrencies;
  }

  try {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries/currency'
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch currencies: ${response.statusText}`);
    }
    const result = await response.json();
    if (result && Array.isArray(result.data)) {
      const uniqueCurrencies = new Map<string, string>();

      result.data.forEach((item: any) => {
        if (item.currency && typeof item.currency === 'string') {
          const code = item.currency.trim().toUpperCase();
          if (/^[A-Z]{3}$/.test(code) && !uniqueCurrencies.has(code)) {
            let label = code;
            try {
              const symbol = getCurrencySymbol(code);
              label = symbol && symbol !== code ? `${code} (${symbol})` : code;
            } catch {
              label = code;
            }
            uniqueCurrencies.set(code, label);
          }
        }
      });

      const priorityCodes = [
        'INR',
        'USD',
        'EUR',
        'GBP',
        'AED',
        'CAD',
        'AUD',
        'SGD',
        'SAR',
        'JPY'
      ];

      const currencyList: CurrencyOption[] = Array.from(
        uniqueCurrencies.entries()
      ).map(([value, label]) => ({
        value,
        label
      }));

      const prioritized = currencyList
        .filter(c => priorityCodes.includes(c.value))
        .sort(
          (a, b) =>
            priorityCodes.indexOf(a.value) - priorityCodes.indexOf(b.value)
        );

      const rest = currencyList
        .filter(c => !priorityCodes.includes(c.value))
        .sort((a, b) => a.value.localeCompare(b.value));

      cachedCurrencies = [...prioritized, ...rest];
      return cachedCurrencies;
    }
  } catch (err) {
    console.error('Error fetching currencies from API:', err);
  }

  return [];
};
