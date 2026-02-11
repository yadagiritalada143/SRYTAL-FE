export interface OrganizationConfig {
  _id?: {
    $oid: string;
  };
  organization_name: string;
  organization_theme: {
    logo: string;
    organization: string;

    // Legacy theme structure for backward compatibility
    theme: {
      backgroundColor: string;
      headerBackgroundColor: string;
      colorScheme: 'light' | 'dark';
      primaryColor: string;
      fontFamily: string;
      button: {
        color: string;
        textColor: string;
      };
      colors: {
        primary: string[];
        secondary: string[];
        [key: string]: string[];
      };
      color: string;
      borderColor: string;
      linkColor: string;
    };

    // New dual themes structure
    themes: {
      light: {
        primaryColor: string;
        colorScheme: 'light';
        fontFamily: string;
        button: {
          color: string;
          textColor: string;
          hoverColor: string;
        };
        iconColor: string;
        accentColor: string;
        successColor: string;
        warningColor: string;
        dangerColor: string;
        lightDangerColor: string;
        mutedTextColor: string;
        cardBackground: string;
        colors: {
          primary: string[];
          secondary: string[];
          [key: string]: string[];
        };
        color: string;
        backgroundColor: string;
        borderColor: string;
        linkColor: string;
        headerBackgroundColor: string;
      };
      dark: {
        primaryColor: string;
        colorScheme: 'dark';
        fontFamily: string;
        button: {
          color: string;
          textColor: string;
          hoverColor: string;
        };
        iconColor: string;
        accentColor: string;
        successColor: string;
        warningColor: string;
        dangerColor: string;
        lightDangerColor: string;
        mutedTextColor: string;
        cardBackground: string;
        colors: {
          primary: string[];
          secondary: string[];
          [key: string]: string[];
        };
        color: string;
        backgroundColor: string;
        borderColor: string;
        linkColor: string;
        headerBackgroundColor: string;
      };
    };
  };
}
