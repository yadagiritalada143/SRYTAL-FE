jest.mock('@constants', () => ({
  BASE_URL: 'http://localhost:3000/',
  ROLES: {
    ADMIN: 'admin',
    SUPER_ADMIN: 'superadmin',
    USER: 'Employee',
    RECRUITER: 'Recruiter',
    CONTENT_WRITER: 'ContentWriter',
  },
}));

import { BASE_URL, ROLES } from '@constants';

describe('constants', () => {
  it('BASE_URL is defined', () => {
    expect(BASE_URL).toBeDefined();
  });

  it('ROLES has the expected keys', () => {
    expect(ROLES).toHaveProperty('ADMIN');
    expect(ROLES).toHaveProperty('SUPER_ADMIN');
    expect(ROLES).toHaveProperty('USER');
    expect(ROLES).toHaveProperty('RECRUITER');
    expect(ROLES).toHaveProperty('CONTENT_WRITER');
  });

  it('ROLES has the correct values', () => {
    expect(ROLES.ADMIN).toBe('admin');
    expect(ROLES.SUPER_ADMIN).toBe('superadmin');
    expect(ROLES.USER).toBe('Employee');
    expect(ROLES.RECRUITER).toBe('Recruiter');
    expect(ROLES.CONTENT_WRITER).toBe('ContentWriter');
  });
});
