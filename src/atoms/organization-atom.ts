import { atom } from 'recoil';
import { OrganizationConfig } from '../interfaces/organization';
import { EmployeeInterface } from '../interfaces/employee';

export const organizationThemeAtom = atom<OrganizationConfig>({
  key: 'organizationTheme',
  default: {
    organization_name: 'default',
    organization_theme: {
      logo: '/data-store.png',
      organization: 'default',
      // Legacy theme structure for backward compatibility
      theme: {
        primaryColor: 'primary',
        colorScheme: 'dark',
        fontFamily: 'Arial, sans-serif',
        button: {
          color: '#343a40',
          textColor: '#ffffff'
        },
        colors: {
          primary: [
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
          ],
          secondary: [
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
          ]
        },
        color: '#ffffff',
        backgroundColor: '#1b1e21',
        borderColor: '#4a4e69',
        linkColor: '#ff4d77',
        headerBackgroundColor: '#23272b'
      },
      // New dual themes structure
      themes: {
        dark: {
          primaryColor: 'primary',
          colorScheme: 'dark',
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
            primary: [
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
            ],
            secondary: [
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
            ]
          },
          color: '#ffffff',
          backgroundColor: '#1b1e21',
          borderColor: '#4a4e69',
          linkColor: '#ff4d77',
          headerBackgroundColor: '#23272b'
        },
        light: {
          primaryColor: 'primary',
          colorScheme: 'light',
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
            primary: [
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
            ],
            secondary: [
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
            ]
          },
          color: '#212529',
          backgroundColor: '#ffffff',
          borderColor: '#dee2e6',
          linkColor: '#dc3545',
          headerBackgroundColor: '#f8f9fa'
        }
      }
    }
  }
});

export const organizationEmployeeAtom = atom<EmployeeInterface[]>({
  key: 'organizationEmployees',
  default: []
});
