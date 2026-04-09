import { ad as i, j as r } from './index-Cn_-nzwF.js';
import { I as s } from './Input-kzRYOXAd.js';
import { u } from './use-input-props-CLa6mLr2.js';
const c = { __staticSelector: 'InputBase', withAria: !0, size: 'sm' },
  t = i((p, e) => {
    const { inputProps: a, wrapperProps: o, ...n } = u('InputBase', c, p);
    return r.jsx(s.Wrapper, {
      ...o,
      children: r.jsx(s, { ...a, ...n, ref: e })
    });
  });
t.classes = { ...s.classes, ...s.Wrapper.classes };
t.displayName = '@mantine/core/InputBase';
export { t as I };
