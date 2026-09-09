import { MantineColorsTuple } from '@mantine/core';
import { OrganizationConfig } from '@interfaces/organization';

const toMantineColors = (colors: string[]): MantineColorsTuple => {
  return colors as unknown as MantineColorsTuple;
};

export interface AppColorPalette {
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  cardBackground: string;
  cardSurface: string;
  cardBorder: string;
  primaryIndigo: string;
  primaryIndigoLight: string;
  emeraldGreen: string;
  emeraldBg: string;
  amberOrange: string;
  amberBg: string;
  purpleViolet: string;
  purpleBg: string;
  codeBoxBg: string;
  buttonDefault: {
    backgroundColor: string;
    borderColor: string;
    color: string;
    hoverBg: string;
  };
  buttonPrimary: {
    background: string;
    color: string;
    boxShadow: string;
  };
  buttonSuccess: {
    background: string;
    color: string;
    boxShadow: string;
  };
}

export const appColorsDark: AppColorPalette = {
  primaryText: '#f8fafc',
  secondaryText: '#cbd5e1',
  mutedText: '#94a3b8',
  cardBackground: '#0f172a',
  cardSurface: '#1e293b',
  cardBorder: '#334155',
  primaryIndigo: '#4f46e5',
  primaryIndigoLight: '#818cf8',
  emeraldGreen: '#34d399',
  emeraldBg: 'rgba(16, 185, 129, 0.12)',
  amberOrange: '#fbbf24',
  amberBg: 'rgba(245, 158, 11, 0.12)',
  purpleViolet: '#c084fc',
  purpleBg: 'rgba(139, 92, 246, 0.12)',
  codeBoxBg: '#0f172a',
  buttonDefault: {
    backgroundColor: '#1e293b',
    borderColor: '#475569',
    color: '#f1f5f9',
    hoverBg: '#334155'
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    color: '#ffffff',
    boxShadow: '0 2px 8px rgba(79, 70, 229, 0.4)'
  },
  buttonSuccess: {
    background: 'linear-gradient(135deg, #059669, #10b981)',
    color: '#ffffff',
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
  }
};

export const appColorsLight: AppColorPalette = {
  primaryText: '#0f172a',
  secondaryText: '#334155',
  mutedText: '#64748b',
  cardBackground: '#ffffff',
  cardSurface: '#f8fafc',
  cardBorder: '#e2e8f0',
  primaryIndigo: '#4f46e5',
  primaryIndigoLight: '#4f46e5',
  emeraldGreen: '#059669',
  emeraldBg: 'rgba(236, 253, 245, 0.95)',
  amberOrange: '#d97706',
  amberBg: 'rgba(254, 243, 199, 0.95)',
  purpleViolet: '#7c3aed',
  purpleBg: 'rgba(245, 243, 255, 0.95)',
  codeBoxBg: '#0f172a',
  buttonDefault: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    color: '#1e293b',
    hoverBg: '#f1f5f9'
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    color: '#ffffff',
    boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)'
  },
  buttonSuccess: {
    background: 'linear-gradient(135deg, #059669, #10b981)',
    color: '#ffffff',
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
  }
};

export const getAppColors = (isDarkTheme: boolean): AppColorPalette => {
  return isDarkTheme ? appColorsDark : appColorsLight;
};

// Default theme configs as fallback when API response doesn't include themes
const defaultDarkTheme = {
  primaryColor: 'primary',
  colorScheme: 'dark' as const,
  fontFamily: 'Arial, sans-serif',
  appColors: appColorsDark,
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
  appColors: appColorsLight,
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
      appColors: getAppColors(isDarkTheme),
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
      appColors: getAppColors(isDarkTheme),
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
  return {
    ...defaultTheme,
    appColors: getAppColors(isDarkTheme)
  };
}
