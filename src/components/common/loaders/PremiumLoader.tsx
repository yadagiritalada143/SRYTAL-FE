import { Center, Stack, Text, Box } from '@mantine/core';
import { useAppTheme } from '@hooks/use-app-theme';
import styles from './PremiumLoader.module.css';

interface PremiumLoaderProps {
  label?: string;
  minHeight?: string | number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const PremiumLoader = ({
  label = 'Loading...',
  minHeight = '400px',
  size = 'md'
}: PremiumLoaderProps) => {
  const { themeConfig } = useAppTheme();

  return (
    <Center
      h={minHeight}
      w='100%'
      style={{ backgroundColor: themeConfig.backgroundColor }}
    >
      <Stack
        align='center'
        gap={size === 'xs' ? 0 : size === 'sm' ? 'sm' : 'xl'}
      >
        <div className={`${styles.loaderContainer} ${styles[size]}`}>
          <div
            className={styles.ripple}
            style={{ borderColor: themeConfig.button.color }}
          />
          <div
            className={styles.ripple}
            style={{
              borderColor: themeConfig.button.color,
              animationDelay: '-1s'
            }}
          />
          <Box className={styles.core} bg={themeConfig.button.color} />
        </div>
        {size !== 'xs' && (
          <Text
            fw={500}
            size={size === 'sm' ? 'sm' : 'lg'}
            className={styles.loadingText}
            style={{ color: themeConfig.color }}
          >
            {label}
          </Text>
        )}
      </Stack>
    </Center>
  );
};

export default PremiumLoader;
