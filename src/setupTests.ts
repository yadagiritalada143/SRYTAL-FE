import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addListener: jest.fn(), // For older browsers
    removeListener: jest.fn(), // For older browsers
    addEventListener: jest.fn(), // Modern browsers
    removeEventListener: jest.fn(), // Modern browsers
    dispatchEvent: jest.fn() // Modern browsers
  }))
});
