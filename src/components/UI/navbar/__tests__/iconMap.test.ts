import { IconCircle, IconUsers, IconUsersGroup } from '@tabler/icons-react';
import { ICON_MAP, resolveIcon } from '../iconMap';

describe('iconMap', () => {
  it('registers known catalog icon names', () => {
    expect(ICON_MAP.IconUsers).toBe(IconUsers);
    expect(ICON_MAP.IconUsersGroup).toBe(IconUsersGroup);
  });

  it('resolves a known name to its icon component', () => {
    expect(resolveIcon('IconUsers')).toBe(IconUsers);
  });

  it('falls back to IconCircle for unknown names', () => {
    expect(resolveIcon('IconNobody')).toBe(IconCircle);
  });

  it('falls back to IconCircle when no name is provided', () => {
    expect(resolveIcon(undefined)).toBe(IconCircle);
  });
});