import { j as e, P as x, V as o, S as r, T as t } from './index-Cn_-nzwF.js';
import { C as g } from './CommonButton-D8AVyhIy.js';
import { c as i } from './createReactComponent-wv-YgGrS.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const m = [
    ['path', { d: 'M12 9v4', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0',
        key: 'svg-1'
      }
    ],
    ['path', { d: 'M12 16h.01', key: 'svg-2' }]
  ],
  p = i('outline', 'alert-triangle', 'AlertTriangle', m);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const j = [
    [
      'path',
      {
        d: 'M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12',
        key: 'svg-0'
      }
    ],
    ['path', { d: 'M4 13h3l3 3h4l3 -3h3', key: 'svg-1' }]
  ],
  u = i('outline', 'inbox', 'Inbox', j),
  y = ({
    isLoading: l,
    error: c,
    isEmpty: d,
    label: a = 'data',
    children: h,
    onRetry: s,
    minHeight: n = '400px'
  }) =>
    l
      ? e.jsx(x, { label: `Loading ${a}...`, minHeight: n })
      : c
        ? e.jsx(o, {
            h: n,
            w: '100%',
            children: e.jsxs(r, {
              align: 'center',
              gap: 'md',
              children: [
                e.jsx(p, { size: 48, color: 'red' }),
                e.jsxs(t, {
                  size: 'lg',
                  fw: 500,
                  children: ['Failed to load ', a]
                }),
                s &&
                  e.jsx(g, {
                    variant: 'light',
                    color: 'blue',
                    onClick: s,
                    children: 'Try Again'
                  })
              ]
            })
          })
        : d
          ? e.jsx(o, {
              h: n,
              w: '100%',
              children: e.jsxs(r, {
                align: 'center',
                gap: 'sm',
                children: [
                  e.jsx(u, { size: 48, opacity: 0.3 }),
                  e.jsxs(t, {
                    size: 'lg',
                    c: 'dimmed',
                    children: ['No ', a, ' found']
                  })
                ]
              })
            })
          : e.jsx(e.Fragment, { children: h });
export { y as D, p as I };
