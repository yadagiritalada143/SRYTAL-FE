import { LoadingOverlay, Loader } from "@mantine/core";

type GlobalLoaderProps = {
  visible: boolean;
  blur?: number;
  opacity?: number;
};

const GlobalLoader = ({
  visible,
  blur = 6,
  opacity = 0.6,
}: GlobalLoaderProps) => {
  return (
    <LoadingOverlay
      visible={visible}
      zIndex={9999}
      overlayProps={{
        blur,
        backgroundOpacity: opacity,
      }}
      loaderProps={{
        type: "dots",
        size: "xl",
      }}
      style={{
        position: "fixed",
        inset: 0,
      }}
    />
  );
};

export default GlobalLoader;
