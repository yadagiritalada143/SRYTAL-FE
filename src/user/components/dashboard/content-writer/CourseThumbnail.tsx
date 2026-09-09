import { useState } from 'react';
import { Box, Image, Text } from '@mantine/core';

interface CourseThumbnailProps {
  /** Course/module name — drives the placeholder's initials and colour. */
  name: string;
  /**
   * Resolved image URL. Undefined (or a URL that fails to load) renders the
   * generated placeholder instead. Note this is NOT the raw `thumbnail` field
   * from the API: that holds an S3 object key, which is not loadable directly.
   */
  src?: string;
  size: number | string;
  height?: number | string;
  /** Mantine radius token, or a number/`0` for a square edge. */
  radius?: string | number;
}

// Distinct, readable gradients so adjacent courses don't look identical.
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #6366F1, #8B5CF6)',
  'linear-gradient(135deg, #EC4899, #F43F5E)',
  'linear-gradient(135deg, #0EA5E9, #6366F1)',
  'linear-gradient(135deg, #14B8A6, #0EA5E9)',
  'linear-gradient(135deg, #F59E0B, #EC4899)',
  'linear-gradient(135deg, #8B5CF6, #EC4899)'
];

/**
 * Stable index so a course keeps the same colour between renders. Uses FNV-1a:
 * a `hash * 31` variant distributes badly here because 31 ≡ 1 (mod 6), which
 * collapses the index to the sum of the char codes and clusters the colours.
 */
const gradientFor = (name: string) => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < name.length; i += 1) {
    hash ^= name.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return PLACEHOLDER_GRADIENTS[hash % PLACEHOLDER_GRADIENTS.length];
};

const initialsFor = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase() ?? '')
    .join('') || '?';

/**
 * Course/module thumbnail. Replaces the old stock `course-thumbnail.png`
 * placeholder — every course showing the same photo read as a broken image.
 */
const CourseThumbnail = ({
  name,
  src,
  size,
  height,
  radius = 'sm'
}: CourseThumbnailProps) => {
  const [failed, setFailed] = useState(false);
  const resolvedHeight = height ?? size;

  if (src && !failed) {
    return (
      <Image
        src={src}
        w={size}
        h={resolvedHeight}
        radius={radius}
        fit='cover'
        alt={name}
        onError={() => setFailed(true)}
        style={{ flexShrink: 0 }}
      />
    );
  }

  return (
    <Box
      w={size}
      h={resolvedHeight}
      style={{
        flexShrink: 0,
        background: gradientFor(name),
        borderRadius:
          typeof radius === 'number'
            ? radius
            : `var(--mantine-radius-${radius})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label={name}
    >
      <Text
        fw={700}
        c='white'
        size={typeof size === 'number' && size < 56 ? 'sm' : 'xl'}
      >
        {initialsFor(name)}
      </Text>
    </Box>
  );
};

export default CourseThumbnail;
