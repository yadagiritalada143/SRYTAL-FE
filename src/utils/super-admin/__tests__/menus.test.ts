import { documentsMenuSuperadmin } from '../menus';

describe('documentsMenuSuperadmin', () => {
  it('has 4 items', () => {
    expect(documentsMenuSuperadmin).toHaveLength(4);
  });

  it('each item has icon, text, and openModel fields', () => {
    documentsMenuSuperadmin.forEach((item) => {
      expect(item).toHaveProperty('icon');
      expect(item).toHaveProperty('text');
      expect(item).toHaveProperty('openModel');
      expect(typeof item.text).toBe('string');
      expect(typeof item.openModel).toBe('string');
    });
  });

  it('has the expected openModel values', () => {
    const models = documentsMenuSuperadmin.map((item) => item.openModel);
    expect(models).toEqual([
      'offerletter',
      'salaaryslip',
      'relievingletter',
      'vendorshipagreement',
    ]);
  });
});
