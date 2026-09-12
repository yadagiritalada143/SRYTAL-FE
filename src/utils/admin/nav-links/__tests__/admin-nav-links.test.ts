import { adminNavLinks } from '../admin-nav-links';

describe('adminNavLinks', () => {
  it('exports an array', () => {
    expect(Array.isArray(adminNavLinks)).toBe(true);
    expect(adminNavLinks.length).toBeGreaterThan(0);
  });

  it('each item has role and name', () => {
    adminNavLinks.forEach((item) => {
      expect(item).toHaveProperty('role');
      expect(item).toHaveProperty('name');
      expect(typeof item.role).toBe('string');
      expect(typeof item.name).toBe('string');
    });
  });

  it('each item has either url or children', () => {
    adminNavLinks.forEach((item) => {
      const hasUrl = 'url' in item;
      const hasChildren = 'children' in item;
      expect(hasUrl || hasChildren).toBe(true);
    });
  });

  it('items with children have an array of children', () => {
    const withChildren = adminNavLinks.filter(
      (item) => 'children' in item
    );
    expect(withChildren.length).toBeGreaterThan(0);
    withChildren.forEach((item) => {
      expect(Array.isArray((item as any).children)).toBe(true);
    });
  });

  it('each item has an icon property', () => {
    adminNavLinks.forEach((item) => {
      expect(item).toHaveProperty('icon');
    });
  });
});
