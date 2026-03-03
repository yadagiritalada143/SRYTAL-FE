import { Skeleton, Stack, Table, Group, Card, SimpleGrid } from '@mantine/core';

interface SkeletonLoaderProps {
  type: 'table' | 'cards' | 'list' | 'form';
  rows?: number;
  columns?: number;
}

const SkeletonLoader = ({
  type,
  rows = 5,
  columns = 5
}: SkeletonLoaderProps) => {
  if (type === 'table') {
    return (
      <Table>
        <Table.Thead>
          <Table.Tr>
            {Array.from({ length: columns }).map((_, i) => (
              <Table.Th key={i}>
                <Skeleton h={20} w='80%' />
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <Table.Tr key={i}>
              {Array.from({ length: columns }).map((_, j) => (
                <Table.Td key={j}>
                  <Skeleton h={15} w='100%' />
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    );
  }

  if (type === 'cards') {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing='md'>
        {Array.from({ length: rows }).map((_, i) => (
          <Card key={i} withBorder padding='lg' radius='md'>
            <Stack gap='sm'>
              <Skeleton h={20} w='30%' radius='xl' />
              <Skeleton h={2} w='100%' />
              <Group grow>
                <Stack gap={4}>
                  <Skeleton h={10} w='40%' />
                  <Skeleton h={15} w='80%' />
                </Stack>
                <Stack gap={4}>
                  <Skeleton h={10} w='40%' />
                  <Skeleton h={15} w='80%' />
                </Stack>
              </Group>
              <Skeleton h={2} w='100%' />
              <Skeleton h={40} w='100%' radius='md' />
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  if (type === 'list') {
    return (
      <Stack gap='md'>
        {Array.from({ length: rows }).map((_, i) => (
          <Group key={i} align='center'>
            <Skeleton h={40} w={40} circle />
            <Stack gap={4} style={{ flex: 1 }}>
              <Skeleton h={15} w='40%' />
              <Skeleton h={10} w='20%' />
            </Stack>
          </Group>
        ))}
      </Stack>
    );
  }

  if (type === 'form') {
    return (
      <Stack gap='lg'>
        {Array.from({ length: rows }).map((_, i) => (
          <Stack key={i} gap={4}>
            <Skeleton h={15} w='20%' />
            <Skeleton h={40} w='100%' radius='md' />
          </Stack>
        ))}
        <Group justify='flex-end'>
          <Skeleton h={36} w={100} radius='md' />
          <Skeleton h={36} w={120} radius='md' />
        </Group>
      </Stack>
    );
  }

  return <Skeleton h={100} w='100%' />;
};

export default SkeletonLoader;
