import { NavLinks } from '../user-nav-links';

describe('NavLinks', () => {
  it('exports an array', () => {
    expect(Array.isArray(NavLinks)).toBe(true);
    expect(NavLinks.length).toBeGreaterThan(0);
  });

  it('each item has role, name, and either url or children', () => {
    NavLinks.forEach((item) => {
      expect(item).toHaveProperty('role');
      expect(item).toHaveProperty('name');
      const hasUrl = 'url' in item;
      const hasChildren = 'children' in item;
      expect(hasUrl || hasChildren).toBe(true);
    });
  });

  it('items with children have array children', () => {
    const withChildren = NavLinks.filter((item) => 'children' in item);
    expect(withChildren.length).toBeGreaterThan(0);
    withChildren.forEach((item) => {
      expect(Array.isArray((item as any).children)).toBe(true);
    });
  });

  it('items are sorted by name length ascending', () => {
    for (let i = 1; i < NavLinks.length; i++) {
      expect(NavLinks[i].name.length).toBeGreaterThanOrEqual(
        NavLinks[i - 1].name.length
      );
    }
  });
});
