import { CSSProperties, useEffect, useState } from 'react';
import { useAppTheme } from '@hooks/use-app-theme';

interface OrgLogoProps {
  logo?: string;
  name?: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
}

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

  useEffect(() => setErrored(false), [logo]);

  const showFallback = !logo || errored;
  const displayName = (name || 'Organization').trim();

  const words = displayName.split(/\s+/).filter(Boolean);
  const initial = words[0]?.[0]?.toUpperCase() ?? 'O';
  const isLandscape = width >= height * 1.4;

  if (showFallback) {
    const nameFontSize = Math.max(11, Math.min(15, Math.round(height * 0.28)));

    if (isLandscape) {
      return (
        <div
          className={className}
          title={displayName}
          aria-label={displayName}
          style={{
            width,
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `0 ${Math.round(height * 0.22)}px`,
            borderRadius: 14,
            background: `linear-gradient(135deg, ${themeConfig.color}18 0%, ${themeConfig.color}08 100%)`,
            border: `1.5px solid ${themeConfig.color}28`,
            boxShadow: `0 2px 10px ${themeConfig.color}18, inset 0 1px 0 rgba(255,255,255,0.12)`,
            overflow: 'hidden',
            flexShrink: 0,
            ...style
          }}
        >
          <span
            style={{
              fontSize: nameFontSize,
              fontWeight: 800,
              color: themeConfig.color,
              letterSpacing: 0.4,
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.2
            }}
          >
            {displayName}
          </span>
        </div>
      );
    }

    // Square/portrait — large monogram block
    const blockSize = Math.min(width, height);
    const blockFontSize = Math.round(blockSize * 0.42);
    const subFontSize = Math.max(7, Math.round(blockSize * 0.13));

    return (
      <div
        className={className}
        title={displayName}
        aria-label={displayName}
        style={{
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          borderRadius: 14,
          background: `linear-gradient(145deg, ${themeConfig.color} 0%, ${themeConfig.color}CC 100%)`,
          boxShadow: `0 4px 18px ${themeConfig.color}45, inset 0 1px 0 rgba(255,255,255,0.25)`,
          overflow: 'hidden',
          ...style
        }}
      >
        <span
          style={{
            fontSize: blockFontSize,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1,
            letterSpacing: -1,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 2px 6px rgba(0,0,0,0.25)'
          }}
        >
          {initial}
        </span>
        <span
          style={{
            fontSize: subFontSize,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '88%',
            fontFamily: 'system-ui, -apple-system, sans-serif'
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
      style={{
        width,
        height,
        objectFit: 'contain',
        display: 'block',
        ...style
      }}
    />
  );
};

export default OrgLogo;
