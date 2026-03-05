import { MantineColorsTuple } from '@mantine/core';
import { OrganizationConfig } from '@interfaces/organization';

// Helper to ensure colors are valid MantineColorsTuple
const toMantineColors = (colors: string[]): MantineColorsTuple => {
  // Mantine requires exactly 10 colors in the tuple.
  // If the array is shorter or longer, it might still work at runtime but TS will complain.
  // We cast to unknown then to MantineColorsTuple to satisfy the type system.
  return colors as unknown as MantineColorsTuple;
};

// Default theme configs as fallback when API response doesn't include themes
const defaultDarkTheme = {
  primaryColor: 'primary',
  colorScheme: 'dark' as const,
  fontFamily: 'Arial, sans-serif',
  button: {
    color: '#343a40',
    textColor: '#ffffff',
    hoverColor: '#23272b'
  },
  iconColor: '#74c0fc',
  accentColor: '#4dabf7',
  successColor: '#69db7c',
  warningColor: '#ffd43b',
  dangerColor: '#ff8787',
  lightDangerColor: '#fa5252',
  mutedTextColor: '#adb5bd',
  cardBackground: '#23272b',
  colors: {
    primary: toMantineColors([
      '#343a40',
      '#2c3136',
      '#23272b',
      '#1d2124',
      '#16191c',
      '#0f1214',
      '#080a0b',
      '#030405',
      '#000000',
      '#000000'
    ]),
    secondary: toMantineColors([
      '#adb5bd',
      '#949aa0',
      '#7b8287',
      '#62696f',
      '#4a5157',
      '#32383e',
      '#1a1f24',
      '#080a0b',
      '#000000',
      '#000000'
    ])
  },
  color: '#ffffff',
  backgroundColor: '#1b1e21',
  borderColor: '#4a4e69',
  linkColor: '#ff4d77',
  headerBackgroundColor: '#23272b'
};

const defaultLightTheme = {
  primaryColor: 'primary',
  colorScheme: 'light' as const,
  fontFamily: 'Arial, sans-serif',
  button: {
    color: '#495057',
    textColor: '#ffffff',
    hoverColor: '#343a40'
  },
  iconColor: '#228be6',
  accentColor: '#1c7ed6',
  successColor: '#2f9e44',
  warningColor: '#f08c00',
  dangerColor: '#c92a2a',
  lightDangerColor: '#fa5252',
  mutedTextColor: '#6c757d',
  cardBackground: '#f8f9fa',
  colors: {
    primary: toMantineColors([
      '#495057',
      '#5a6268',
      '#6c757d',
      '#7e888f',
      '#909aa1',
      '#a2acb3',
      '#b4bec5',
      '#c6d0d7',
      '#d8e2e9',
      '#eaf4fb'
    ]),
    secondary: toMantineColors([
      '#6c757d',
      '#868e96',
      '#adb5bd',
      '#ced4da',
      '#dee2e6',
      '#e9ecef',
      '#f1f3f5',
      '#f8f9fa',
      '#ffffff',
      '#ffffff'
    ])
  },
  color: '#212529',
  backgroundColor: '#ffffff',
  borderColor: '#dee2e6',
  linkColor: '#dc3545',
  headerBackgroundColor: '#f8f9fa'
};

/**
 * Safely gets the current theme config from organization config.
 * Falls back to legacy theme structure or default theme if themes structure is missing from API response.
 */
export function getThemeConfig(
  organizationConfig: OrganizationConfig,
  isDarkTheme: boolean
): any {
  const orgTheme = organizationConfig?.organization_theme;
  const defaultTheme = isDarkTheme ? defaultDarkTheme : defaultLightTheme;

  // Check if new dual themes structure exists
  if (orgTheme?.themes?.dark && orgTheme?.themes?.light) {
    const rawTheme = isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
    return {
      ...defaultTheme,
      ...rawTheme,
      colors: {
        ...defaultTheme.colors,
        ...(rawTheme.colors
          ? {
              primary: rawTheme.colors.primary
                ? toMantineColors(rawTheme.colors.primary)
                : defaultTheme.colors.primary,
              secondary: rawTheme.colors.secondary
                ? toMantineColors(rawTheme.colors.secondary)
                : defaultTheme.colors.secondary
            }
          : {})
      }
    };
  }

  // Fallback to legacy theme structure if it exists
  if (orgTheme?.theme) {
    const rawTheme = orgTheme.theme;
    return {
      ...defaultTheme,
      ...rawTheme,
      button: {
        ...defaultTheme.button,
        ...rawTheme.button
      },
      colors: {
        ...defaultTheme.colors,
        ...(rawTheme.colors
          ? {
              primary: rawTheme.colors.primary
                ? toMantineColors(rawTheme.colors.primary)
                : defaultTheme.colors.primary,
              secondary: rawTheme.colors.secondary
                ? toMantineColors(rawTheme.colors.secondary)
                : defaultTheme.colors.secondary
            }
          : {})
      }
    };
  }

  // Fallback to default themes
  return defaultTheme;
}
