import { LoadingOverlay } from '@mantine/core';
import { useAppTheme } from '@hooks/use-app-theme';

type GlobalLoaderProps = {
  visible: boolean;
  blur?: number;
  opacity?: number;
};

const GlobalLoader = ({
  visible,
  blur = 6,
  opacity = 0.6
}: GlobalLoaderProps) => {
  const { themeConfig } = useAppTheme();

  return (
    <LoadingOverlay
      visible={visible}
      zIndex={9999}
      overlayProps={{
        blur,
        backgroundOpacity: opacity,
        color: themeConfig.backgroundColor
      }}
      loaderProps={{
        type: 'dots',
        size: 'xl'
      }}
      style={{
        position: 'fixed',
        inset: 0
      }}
    />
  );
};

export default GlobalLoader;
