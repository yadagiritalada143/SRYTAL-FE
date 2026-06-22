import { CSSProperties, useEffect, useState } from 'react';
import { useAppTheme } from '@hooks/use-app-theme';

interface OrgLogoProps {
  /** Logo image URL (may be missing or broken). */
  logo?: string;
  /** Organization name, shown as the styled fallback. */
  name?: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders the organization logo. If the image is missing or fails to load,
 * it gracefully falls back to the organization name with clean styling instead
 * of a broken-image icon.
 */
const OrgLogo = ({
  logo,
  name,
  width,
  height,
  className,
  style
}: OrgLogoProps) => {
  const { themeConfig } = useAppTheme();
  const [errored, setErrored] = useState(false);

  // Reset the error state if the logo URL changes (e.g. org switch).
  useEffect(() => setErrored(false), [logo]);

  const showFallback = !logo || errored;
  const displayName = (name || 'Organization').trim();

  if (showFallback) {
    // Size the text to the available height, clamped to a readable range.
    const fontSize = Math.max(13, Math.min(20, Math.round(height * 0.42)));
    return (
      <div
        className={className}
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '0 10px',
          borderRadius: 10,
          background: `${themeConfig.color}0F`,
          overflow: 'hidden',
          ...style
        }}
        title={displayName}
        aria-label={displayName}
      >
        <span
          style={{
            fontSize,
            fontWeight: 700,
            letterSpacing: 0.3,
            lineHeight: 1.1,
            color: themeConfig.color,
            textTransform: 'capitalize',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {displayName}
        </span>
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={`${displayName} logo`}
      className={className}
      onError={() => setErrored(true)}
      style={{ width, height, ...style }}
    />
  );
};

export default OrgLogo;
