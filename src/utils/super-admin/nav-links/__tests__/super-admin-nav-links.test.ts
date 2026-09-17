import { SuperAdminNavLinks } from '../super-admin-nav-links';

describe('SuperAdminNavLinks', () => {
  it('has 3 items', () => {
    expect(SuperAdminNavLinks).toHaveLength(3);
  });

  it('each item has url, icon, and name', () => {
    SuperAdminNavLinks.forEach((item) => {
      expect(item).toHaveProperty('url');
      expect(item).toHaveProperty('icon');
      expect(item).toHaveProperty('name');
      expect(typeof item.url).toBe('string');
      expect(typeof item.name).toBe('string');
    });
  });

  it('has the expected names', () => {
    const names = SuperAdminNavLinks.map((item) => item.name);
    expect(names).toEqual(['Register Admin', 'Manage Employees', 'Documents']);
  });
});
