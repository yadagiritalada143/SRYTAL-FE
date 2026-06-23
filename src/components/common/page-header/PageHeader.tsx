import { Card, Group, Stack, Text, Title, Badge, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useAppTheme } from '@hooks/use-app-theme';

/** Convert a #rrggbb hex to an rgba() string with the given alpha. */
const hexToRgba = (hex: string, alpha: number): string => {
  if (!hex || !hex.startsWith('#')) return hex;
  let h = hex.slice(1);
  if (h.length === 3)
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  const num = parseInt(h, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
};

export interface PageHeaderProps {
  /** Main page title. */
  title: string;
  /** Optional supporting line beneath the title. */
  subtitle?: string;
  /** Optional leading icon, rendered in a tinted tile. */
  icon?: React.ReactNode;
  /** Optional count shown as a badge next to the title (e.g. number of rows). */
  count?: number | string;
  /** Right-aligned actions (buttons, etc.). Stacks below on mobile. */
  actions?: React.ReactNode;
}

/**
 * Consistent, theme-aware page header used across admin (and other) pages.
 * Replaces the bespoke per-page heading blocks so spacing, typography and
 * the title/actions layout stay uniform everywhere.
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  count,
  actions
}) => {
  const { themeConfig } = useAppTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { color, borderColor, mutedTextColor, accentColor, backgroundColor } =
    themeConfig;

  return (
    <Card
      radius='lg'
      p={isMobile ? 'md' : 'lg'}
      withBorder
      style={{ backgroundColor, borderColor, color }}
    >
      <Group
        justify='space-between'
        align={isMobile ? 'stretch' : 'center'}
        wrap={isMobile ? 'wrap' : 'nowrap'}
        gap='md'
      >
        <Group gap='md' wrap='nowrap' align='center' style={{ minWidth: 0 }}>
          {icon && (
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                flexShrink: 0,
                borderRadius: 12,
                color: accentColor,
                backgroundColor: hexToRgba(accentColor, 0.12)
              }}
            >
              {icon}
            </Box>
          )}
          <Stack gap={2} style={{ minWidth: 0 }}>
            <Group gap='xs' wrap='nowrap' align='center'>
              <Title order={isMobile ? 4 : 3} fw={700} lineClamp={1}>
                {title}
              </Title>
              {count !== undefined && (
                <Badge
                  variant='light'
                  color={accentColor}
                  size='lg'
                  radius='sm'
                >
                  {count}
                </Badge>
              )}
            </Group>
            {subtitle && (
              <Text size='sm' c={mutedTextColor} lineClamp={2}>
                {subtitle}
              </Text>
            )}
          </Stack>
        </Group>

        {actions && (
          <Group
            gap='sm'
            wrap='nowrap'
            justify={isMobile ? 'stretch' : 'flex-end'}
            style={{ flexShrink: 0, width: isMobile ? '100%' : 'auto' }}
          >
            {actions}
          </Group>
        )}
      </Group>
    </Card>
  );
};

export default PageHeader;
