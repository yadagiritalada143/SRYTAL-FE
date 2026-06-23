import { Box, Group, Text } from '@mantine/core';
import { useAppTheme } from '@hooks/use-app-theme';

interface InfoFieldProps {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
}

/** Compact read-only label/value pair used to display employee data. */
const InfoField = ({ label, value, icon }: InfoFieldProps) => {
  const { themeConfig } = useAppTheme();

  return (
    <Group gap='sm' wrap='nowrap' align='flex-start'>
      {icon && (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            flexShrink: 0,
            borderRadius: 8,
            color: themeConfig.accentColor,
            backgroundColor: `${themeConfig.accentColor}1f`
          }}
        >
          {icon}
        </Box>
      )}
      <Box style={{ minWidth: 0 }}>
        <Text
          size='xs'
          c={themeConfig.mutedTextColor}
          fw={600}
          tt='uppercase'
          style={{ letterSpacing: 0.4 }}
        >
          {label}
        </Text>
        <Text size='sm' fw={600} c={themeConfig.color} lineClamp={1}>
          {value || '—'}
        </Text>
      </Box>
    </Group>
  );
};

export default InfoField;
