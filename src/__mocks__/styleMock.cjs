const proxy = new Proxy(
  { __esModule: true },
  {
    get: (target, prop) => {
      if (prop === '__esModule') return true;
      if (prop === 'default') return proxy;
      return typeof prop === 'string' ? prop : '';
    }
  }
);

module.exports = proxy;