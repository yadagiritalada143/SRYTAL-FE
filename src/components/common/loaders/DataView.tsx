import React from 'react';
import { Center, Stack, Text } from '@mantine/core';
import { IconAlertTriangle, IconInbox } from '@tabler/icons-react';
import PremiumLoader from './PremiumLoader';
import { CommonButton } from '../button/CommonButton';

interface DataViewProps {
  isLoading: boolean;
  error?: any;
  isEmpty?: boolean;
  label?: string;
  children: React.ReactNode;
  onRetry?: () => void;
  minHeight?: string | number;
}

const DataView: React.FC<DataViewProps> = ({
  isLoading,
  error,
  isEmpty,
  label = 'data',
  children,
  onRetry,
  minHeight = '400px'
}) => {
  if (isLoading) {
    return (
      <PremiumLoader label={`Loading ${label}...`} minHeight={minHeight} />
    );
  }

  if (error) {
    return (
      <Center h={minHeight} w='100%'>
        <Stack align='center' gap='md'>
          <IconAlertTriangle size={48} color='red' />
          <Text size='lg' fw={500}>
            Failed to load {label}
          </Text>
          {onRetry && (
            <CommonButton variant='light' color='blue' onClick={onRetry}>
              Try Again
            </CommonButton>
          )}
        </Stack>
      </Center>
    );
  }

  if (isEmpty) {
    return (
      <Center h={minHeight} w='100%'>
        <Stack align='center' gap='sm'>
          <IconInbox size={48} opacity={0.3} />
          <Text size='lg' c='dimmed'>
            No {label} found
          </Text>
        </Stack>
      </Center>
    );
  }

  return <>{children}</>;
};

export default DataView;
