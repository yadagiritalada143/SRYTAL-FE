import { useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Card,
  Checkbox,
  Group,
  SegmentedControl,
  Select,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip
} from '@mantine/core';
import { IconLock, IconUsersGroup, IconUser } from '@tabler/icons-react';
import { ROLES } from '@constants';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import { useCustomToast } from '@utils/common/toast';
import { getErrorMessage } from '@utils/common/get-error-message';
import SkeletonLoader from '@components/common/loaders/SkeletonLoader';
import {
  useGetNavCatalog,
  useGetNavRoleAccess,
  useGetNavUserAccess
} from '@hooks/queries/useNavQueries';
import { useGetAllEmployeesByAdmin } from '@hooks/queries/useAdminQueries';
import {
  useUpdateNavRoleAccess,
  useUpdateNavUserAccess
} from '@hooks/mutations/useNavMutations';

type Surface = 'employee' | 'admin';
type Mode = 'role' | 'user';

interface CatalogItem {
  key: string;
  label: string;
  url?: string;
  icon: string;
  surface: Surface;
  parentKey?: string | null;
  order: number;
  isSystem: boolean;
}

const ROLES_BY_SURFACE: Record<Surface, string[]> = {
  employee: [ROLES.USER, ROLES.RECRUITER, ROLES.CONTENT_WRITER],
  admin: [ROLES.ADMIN]
};

// Adds the parentKey of any selected child so grouped items render their header.
const withParents = (keys: Set<string>, catalog: CatalogItem[]) => {
  const byKey = new Map(catalog.map(i => [i.key, i]));
  const result = new Set(keys);
  Array.from(keys).forEach(k => {
    const item = byKey.get(k);
    if (item?.parentKey) result.add(item.parentKey);
  });
  return result;
};

const NavAccess = () => {
  const { themeConfig } = useAppTheme();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [mode, setMode] = useState<Mode>('role');
  const [surface, setSurface] = useState<Surface>('employee');
  const [role, setRole] = useState<string>(ROLES.USER);
  const [userId, setUserId] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const { data: catalog = [], isLoading: catalogLoading } = useGetNavCatalog(surface);
  const { data: roleAccess, isLoading: roleLoading } = useGetNavRoleAccess(role, mode === 'role');
  const { data: userAccess, isLoading: userLoading } = useGetNavUserAccess(
    userId || '',
    mode === 'user' && !!userId
  );
  const { data: employees = [] } = useGetAllEmployeesByAdmin();

  const updateRole = useUpdateNavRoleAccess();
  const updateUser = useUpdateNavUserAccess();

  const systemKeys = useMemo(
    () => new Set(catalog.filter((i: CatalogItem) => i.isSystem).map((i: CatalogItem) => i.key)),
    [catalog]
  );
  // Baseline = the role grant the selected user inherits (used to label/derive overrides).
  const roleBaseline = useMemo(
    () => new Set<string>(mode === 'user' ? userAccess?.roleKeys ?? [] : []),
    [mode, userAccess]
  );

  // Initialise the checkbox state whenever the loaded access changes.
  useEffect(() => {
    if (mode === 'role') {
      if (roleAccess?.navKeys) setChecked(new Set(roleAccess.navKeys));
    }
  }, [mode, roleAccess]);

  useEffect(() => {
    if (mode === 'user' && userAccess?.success) {
      const eff = new Set<string>(userAccess.roleKeys ?? []);
      for (const k of userAccess.addedKeys ?? []) eff.add(k);
      for (const k of userAccess.removedKeys ?? []) eff.delete(k);
      setChecked(eff);
    }
  }, [mode, userAccess]);

  // When switching surface in role mode, snap the role to a valid one.
  useEffect(() => {
    if (mode === 'role' && !ROLES_BY_SURFACE[surface].includes(role)) {
      setRole(ROLES_BY_SURFACE[surface][0]);
    }
  }, [surface, mode, role]);

  const toggle = (key: string) => {
    if (systemKeys.has(key)) return; // locked
    setChecked(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const employeeOptions = useMemo(
    () =>
      (employees as any[])
        .filter(e => e.userRole !== ROLES.ADMIN)
        .map(e => ({
          value: e.id,
          label: `${e.firstName ?? ''} ${e.lastName ?? ''}`.trim() + (e.employeeId ? ` · ${e.employeeId}` : '')
        })),
    [employees]
  );

  // Build display groups: roots (no parent), each with its children.
  const groups = useMemo(() => {
    const roots = (catalog as CatalogItem[])
      .filter(i => !i.parentKey)
      .sort((a, b) => a.order - b.order);
    const childrenOf = (key: string) =>
      (catalog as CatalogItem[])
        .filter(i => i.parentKey === key)
        .sort((a, b) => a.order - b.order);
    return roots.map(root => ({ root, children: childrenOf(root.key) }));
  }, [catalog]);

  const userSurface: Surface = (userAccess?.surface as Surface) || 'employee';
  const effectiveSurface = mode === 'user' && userId ? userSurface : surface;

  // In user mode the catalog must match the user's surface.
  useEffect(() => {
    if (mode === 'user' && userId && userAccess?.surface && userAccess.surface !== surface) {
      setSurface(userAccess.surface);
    }
  }, [mode, userId, userAccess, surface]);

  const handleSave = () => {
    const finalSet = withParents(checked, catalog as CatalogItem[]);
    if (mode === 'role') {
      updateRole.mutate(
        { role, navKeys: Array.from(finalSet) },
        {
          onSuccess: () => showSuccessToast('Role menu access updated'),
          onError: err => showErrorToast(getErrorMessage(err, 'Failed to update role access'))
        }
      );
    } else {
      if (!userId) return;
      const addedKeys = Array.from(finalSet).filter(k => !roleBaseline.has(k));
      const removedKeys = Array.from(roleBaseline).filter(
        k => !finalSet.has(k) && !systemKeys.has(k)
      );
      updateUser.mutate(
        { userId, addedKeys, removedKeys },
        {
          onSuccess: () => showSuccessToast('User menu access updated'),
          onError: err => showErrorToast(getErrorMessage(err, 'Failed to update user access'))
        }
      );
    }
  };

  const isLoading =
    catalogLoading || (mode === 'role' ? roleLoading : userLoading && !!userId);
  const saving = updateRole.isPending || updateUser.isPending;
  const canSave = mode === 'role' ? true : !!userId;

  const renderRow = (item: CatalogItem, indent = false) => {
    const locked = systemKeys.has(item.key);
    const inherited = mode === 'user' && roleBaseline.has(item.key);
    return (
      <Group
        key={item.key}
        justify='space-between'
        wrap='nowrap'
        px='sm'
        py={8}
        style={{
          paddingLeft: indent ? 34 : 12,
          borderRadius: 8,
          background: checked.has(item.key) ? `${themeConfig.color}0c` : 'transparent'
        }}
      >
        <Checkbox
          checked={checked.has(item.key)}
          disabled={locked}
          onChange={() => toggle(item.key)}
          color={themeConfig.color}
          label={
            <Group gap={6} wrap='nowrap'>
              <Text size='sm' fw={indent ? 400 : 500}>
                {item.label}
              </Text>
              {item.url ? (
                <Text size='xs' c='dimmed'>
                  /{item.url.split('/').slice(2).join('/') || item.url}
                </Text>
              ) : (
                <Badge size='xs' variant='light' color='gray'>
                  group
                </Badge>
              )}
            </Group>
          }
        />
        <Group gap={6} wrap='nowrap'>
          {inherited && (
            <Badge size='xs' variant='light' color={themeConfig.color}>
              from role
            </Badge>
          )}
          {locked && (
            <Tooltip label='System item — always available, cannot be removed'>
              <ThemeIcon size='sm' variant='subtle' color='gray'>
                <IconLock size={14} />
              </ThemeIcon>
            </Tooltip>
          )}
        </Group>
      </Group>
    );
  };

  return (
    <Stack gap='lg'>
      <Stack gap={2}>
        <Title order={3}>Menu Access</Title>
        <Text size='sm' c='dimmed'>
          Control which navigation items each role sees, and add or revoke items for individual
          users. Users can only open pages their menu allows.
        </Text>
      </Stack>

      <SegmentedControl
        value={mode}
        onChange={v => setMode(v as Mode)}
        data={[
          { value: 'role', label: 'By Role' },
          { value: 'user', label: 'By User' }
        ]}
        color={themeConfig.color}
        w={{ base: '100%', sm: 280 }}
      />

      <Group gap='md' wrap='wrap'>
        <Select
          label='Surface'
          data={[
            { value: 'employee', label: 'Employee' },
            { value: 'admin', label: 'Admin' }
          ]}
          value={effectiveSurface}
          onChange={v => v && setSurface(v as Surface)}
          disabled={mode === 'user'}
          w={160}
          leftSection={<IconUsersGroup size={16} />}
        />

        {mode === 'role' ? (
          <Select
            label='Role'
            data={ROLES_BY_SURFACE[surface].map(r => ({ value: r, label: r }))}
            value={role}
            onChange={v => v && setRole(v)}
            w={220}
            leftSection={<IconUser size={16} />}
          />
        ) : (
          <Select
            label='Employee'
            placeholder='Select an employee'
            data={employeeOptions}
            value={userId}
            onChange={setUserId}
            searchable
            w={300}
            leftSection={<IconUser size={16} />}
            nothingFoundMessage='No employees'
          />
        )}
      </Group>

      <Card withBorder radius='md' p='md'>
        {mode === 'user' && !userId ? (
          <Text size='sm' c='dimmed' ta='center' py='lg'>
            Select an employee to manage their menu items.
          </Text>
        ) : isLoading ? (
          <SkeletonLoader type='list' />
        ) : (
          <Stack gap={2}>
            {groups.map(({ root, children }) => (
              <div key={root.key}>
                {renderRow(root)}
                {children.map(child => renderRow(child, true))}
              </div>
            ))}
          </Stack>
        )}
      </Card>

      <Group justify='flex-end'>
        <CommonButton
          onClick={handleSave}
          loading={saving}
          disabled={!canSave || saving}
          color={themeConfig.button.color}
        >
          Save changes
        </CommonButton>
      </Group>
    </Stack>
  );
};

export default NavAccess;
