import {
  f as de,
  u as D,
  a as ue,
  j as e,
  U as he,
  B as me,
  c as pe,
  r as xe,
  g as ve,
  b as fe,
  d as ge,
  e as d,
  F as ye,
  h as be,
  i as je,
  k as we,
  l as Ne,
  m as ke,
  n as Ce,
  o as Me,
  p as Se,
  q as G,
  N as J,
  L as Te,
  G as Ie,
  T as E,
  s as De
} from './index-Cn_-nzwF.js';
import { u as K } from './use-disclosure-Dul82tkt.js';
import { P as j } from './Popover-C5NzMGSx.js';
import { c as M } from './create-event-handler-C3eq9ghx.js';
import { c as m } from './createReactComponent-wv-YgGrS.js';
import { C as Q } from './CommonButton-D8AVyhIy.js';
import { T as Pe } from './ThemeIcon-DU_nylS8.js';
import { T as _e } from './Title-T3OvY56h.js';
import { I as Be } from './IconUserCheck-CwRNgvtA.js';
import { o as Re, s as _, u as Ee, t as Le } from './zod-DC47Kjo4.js';
import { s as He, g as Oe } from './common-services-DPGUVDMw.js';
import { T as L } from './TextInput-DUPEWkCs.js';
import { T as Ae } from './Textarea-CHnPFotR.js';
import { C as $e } from './Card-BOCM3d4L.js';
import { B as ze } from './Badge-pr8cFvg5.js';
import { I as Fe } from './IconEye-Bds7tWBk.js';
import './Input-kzRYOXAd.js';
import './get-floating-position-TyKNLeXJ.js';
import './use-uncontrolled-C8lBt68W.js';
import './api-client-CcbR4Lbf.js';
import './InputBase-CO8vJiWZ.js';
import './use-input-props-CLa6mLr2.js';
var X = { root: 'm_fea6bf1a', burger: 'm_d4fb9cad' };
const Ge = pe(
    (
      t,
      {
        color: r,
        size: o,
        lineSize: a,
        transitionDuration: n,
        transitionTimingFunction: i
      }
    ) => ({
      root: {
        '--burger-color': r ? fe(r, t) : void 0,
        '--burger-size': ve(o, 'burger-size'),
        '--burger-line-size': a ? xe(a) : void 0,
        '--burger-transition-duration': n === void 0 ? void 0 : `${n}ms`,
        '--burger-transition-timing-function': i
      }
    })
  ),
  A = de((t, r) => {
    const o = D('Burger', null, t),
      {
        classNames: a,
        className: n,
        style: i,
        styles: l,
        unstyled: s,
        vars: c,
        opened: u,
        children: h,
        transitionDuration: p,
        transitionTimingFunction: y,
        lineSize: N,
        attributes: w,
        ...k
      } = o,
      b = ue({
        name: 'Burger',
        classes: X,
        props: o,
        className: n,
        style: i,
        classNames: a,
        styles: l,
        unstyled: s,
        attributes: w,
        vars: c,
        varsResolver: Ge
      });
    return e.jsxs(he, {
      ...b('root'),
      ref: r,
      ...k,
      children: [
        e.jsx(me, { mod: ['reduce-motion', { opened: u }], ...b('burger') }),
        h
      ]
    });
  });
A.classes = X;
A.displayName = '@mantine/core/Burger';
const [qe, Z] = ge('HoverCard component was not found in the tree'),
  ee = d.createContext(!1),
  We = ee.Provider,
  $ = () => d.useContext(ee);
function te(t) {
  const {
      children: r,
      onMouseEnter: o,
      onMouseLeave: a,
      ...n
    } = D('HoverCardDropdown', null, t),
    i = Z();
  if ($() && i.getFloatingProps && i.floating) {
    const u = i.getFloatingProps();
    return e.jsx(j.Dropdown, {
      ref: i.floating,
      ...u,
      onMouseEnter: M(o, u.onMouseEnter),
      onMouseLeave: M(a, u.onMouseLeave),
      ...n,
      children: r
    });
  }
  const s = M(o, i.openDropdown),
    c = M(a, i.closeDropdown);
  return e.jsx(j.Dropdown, {
    onMouseEnter: s,
    onMouseLeave: c,
    ...n,
    children: r
  });
}
te.displayName = '@mantine/core/HoverCardDropdown';
const Ue = { openDelay: 0, closeDelay: 0 };
function z(t) {
  const {
    openDelay: r,
    closeDelay: o,
    children: a
  } = D('HoverCardGroup', Ue, t);
  return e.jsx(We, {
    value: !0,
    children: e.jsx(ye, { delay: { open: r, close: o }, children: a })
  });
}
z.displayName = '@mantine/core/HoverCardGroup';
z.extend = t => t;
const Ve = { refProp: 'ref' },
  re = d.forwardRef((t, r) => {
    const {
        children: o,
        refProp: a,
        eventPropsWrapperName: n,
        ...i
      } = D('HoverCardTarget', Ve, t),
      l = be(o);
    if (!l)
      throw new Error(
        'HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
      );
    const s = Z();
    if ($() && s.getReferenceProps && s.reference) {
      const y = s.getReferenceProps();
      return e.jsx(j.Target, {
        refProp: a,
        ref: r,
        ...i,
        children: d.cloneElement(
          l,
          n ? { [n]: { ...y, ref: s.reference } } : { ...y, ref: s.reference }
        )
      });
    }
    const u = M(l.props.onMouseEnter, s.openDropdown),
      h = M(l.props.onMouseLeave, s.closeDropdown),
      p = { onMouseEnter: u, onMouseLeave: h };
    return e.jsx(j.Target, {
      refProp: a,
      ref: r,
      ...i,
      children: d.cloneElement(l, n ? { [n]: p } : p)
    });
  });
re.displayName = '@mantine/core/HoverCardTarget';
function Ye(t) {
  const [r, o] = d.useState(t.defaultOpened),
    n = typeof t.opened == 'boolean' ? t.opened : r,
    i = $(),
    l = je(),
    s = d.useRef(-1),
    c = d.useRef(-1),
    u = d.useCallback(() => {
      (window.clearTimeout(s.current), window.clearTimeout(c.current));
    }, []),
    h = d.useCallback(
      g => {
        var T, C;
        (o(g),
          g
            ? (w(l), (T = t.onOpen) == null || T.call(t))
            : (C = t.onClose) == null || C.call(t));
      },
      [l, t.onOpen, t.onClose]
    ),
    { context: p, refs: y } = we({ open: n, onOpenChange: h }),
    { delay: N, setCurrentId: w } = Ne(p, { id: l }),
    { getReferenceProps: k, getFloatingProps: b } = ke([
      Ce(p, {
        enabled: !0,
        delay: i ? N : { open: t.openDelay, close: t.closeDelay }
      }),
      Me(p, { role: 'dialog' }),
      Se(p, { enabled: i })
    ]),
    P = d.useCallback(() => {
      i ||
        (u(),
        t.openDelay === 0 || t.openDelay === void 0
          ? h(!0)
          : (s.current = window.setTimeout(() => h(!0), t.openDelay)));
    }, [i, u, t.openDelay, h]),
    f = d.useCallback(() => {
      i ||
        (u(),
        t.closeDelay === 0 || t.closeDelay === void 0
          ? h(!1)
          : (c.current = window.setTimeout(() => h(!1), t.closeDelay)));
    }, [i, u, t.closeDelay, h]);
  return (
    d.useEffect(() => () => u(), [u]),
    {
      opened: n,
      reference: y.setReference,
      floating: y.setFloating,
      getReferenceProps: k,
      getFloatingProps: b,
      openDropdown: P,
      closeDropdown: f
    }
  );
}
const Je = { openDelay: 0, closeDelay: 150, initiallyOpened: !1 };
function x(t) {
  const {
      children: r,
      onOpen: o,
      onClose: a,
      openDelay: n,
      closeDelay: i,
      initiallyOpened: l,
      ...s
    } = D('HoverCard', Je, t),
    c = Ye({
      openDelay: n,
      closeDelay: i,
      defaultOpened: l,
      onOpen: o,
      onClose: a
    });
  return e.jsx(qe, {
    value: {
      openDropdown: c.openDropdown,
      closeDropdown: c.closeDropdown,
      getReferenceProps: c.getReferenceProps,
      getFloatingProps: c.getFloatingProps,
      reference: c.reference,
      floating: c.floating
    },
    children: e.jsx(j, {
      ...s,
      opened: c.opened,
      __staticSelector: 'HoverCard',
      children: r
    })
  });
}
x.displayName = '@mantine/core/HoverCard';
x.Target = re;
x.Dropdown = te;
x.Group = z;
x.extend = t => t;
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ke = [
    ['path', { d: 'M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5l16 0', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M8.5 8h7l-4.5 4h4l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5',
        key: 'svg-1'
      }
    ]
  ],
  Qe = m('outline', 'brand-css3', 'BrandCss3', Ke);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xe = [
    [
      'path',
      {
        d: 'M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3',
        key: 'svg-0'
      }
    ]
  ],
  oe = m('outline', 'brand-facebook', 'BrandFacebook', Xe);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ze = [
    ['path', { d: 'M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5l16 0', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M15.5 8h-7l.5 4h6l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5',
        key: 'svg-1'
      }
    ]
  ],
  et = m('outline', 'brand-html5', 'BrandHtml5', Ze);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tt = [
    ['path', { d: 'M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5l16 0', key: 'svg-0' }],
    ['path', { d: 'M7.5 8h3v8l-2 -1', key: 'svg-1' }],
    [
      'path',
      {
        d: 'M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5',
        key: 'svg-2'
      }
    ]
  ],
  rt = m('outline', 'brand-javascript', 'BrandJavascript', tt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ot = [
    ['path', { d: 'M8 11v5', key: 'svg-0' }],
    ['path', { d: 'M8 8v.01', key: 'svg-1' }],
    ['path', { d: 'M12 16v-5', key: 'svg-2' }],
    ['path', { d: 'M16 16v-3a2 2 0 1 0 -4 0', key: 'svg-3' }],
    [
      'path',
      {
        d: 'M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10',
        key: 'svg-4'
      }
    ]
  ],
  se = m('outline', 'brand-linkedin', 'BrandLinkedin', ot);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const st = [
    [
      'path',
      {
        d: 'M12 10.174c1.766 -2.784 3.315 -4.174 4.648 -4.174c2 0 3.263 2.213 4 5.217c.704 2.869 .5 6.783 -2 6.783c-1.114 0 -2.648 -1.565 -4.148 -3.652a27.627 27.627 0 0 1 -2.5 -4.174',
        key: 'svg-0'
      }
    ],
    [
      'path',
      {
        d: 'M12 10.174c-1.766 -2.784 -3.315 -4.174 -4.648 -4.174c-2 0 -3.263 2.213 -4 5.217c-.704 2.869 -.5 6.783 2 6.783c1.114 0 2.648 -1.565 4.148 -3.652c1 -1.391 1.833 -2.783 2.5 -4.174',
        key: 'svg-1'
      }
    ]
  ],
  at = m('outline', 'brand-meta', 'BrandMeta', st);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nt = [
    ['path', { d: 'M12 3v19', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M18 11.227c0 3.273 -1.812 4.77 -6 9.273c-4.188 -4.503 -6 -6 -6 -9.273c0 -4.454 3.071 -6.927 6 -9.227c2.929 2.3 6 4.773 6 9.227',
        key: 'svg-1'
      }
    ]
  ],
  it = m('outline', 'brand-mongodb', 'BrandMongodb', nt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const lt = [
    [
      'path',
      {
        d: 'M9 9v8.044a2 2 0 0 1 -2.996 1.734l-1.568 -.9a3 3 0 0 1 -1.436 -2.561v-6.635a3 3 0 0 1 1.436 -2.56l6 -3.667a3 3 0 0 1 3.128 0l6 3.667a3 3 0 0 1 1.436 2.561v6.634a3 3 0 0 1 -1.436 2.56l-6 3.667a3 3 0 0 1 -3.128 0',
        key: 'svg-0'
      }
    ],
    [
      'path',
      {
        d: 'M17 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3.5',
        key: 'svg-1'
      }
    ]
  ],
  ct = m('outline', 'brand-nodejs', 'BrandNodejs', lt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const dt = [
    ['path', { d: 'M12 9h-7a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h3', key: 'svg-0' }],
    [
      'path',
      { d: 'M12 15h7a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-3', key: 'svg-1' }
    ],
    [
      'path',
      {
        d: 'M8 9v-4a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-4a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4',
        key: 'svg-2'
      }
    ],
    ['path', { d: 'M11 6l0 .01', key: 'svg-3' }],
    ['path', { d: 'M13 18l0 .01', key: 'svg-4' }]
  ],
  ut = m('outline', 'brand-python', 'BrandPython', dt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ht = [
    [
      'path',
      {
        d: 'M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102',
        key: 'svg-0'
      }
    ],
    [
      'path',
      {
        d: 'M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102',
        key: 'svg-1'
      }
    ],
    [
      'path',
      {
        d: 'M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2',
        key: 'svg-2'
      }
    ],
    [
      'path',
      {
        d: 'M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2',
        key: 'svg-3'
      }
    ],
    [
      'path',
      {
        d: 'M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896',
        key: 'svg-4'
      }
    ],
    [
      'path',
      {
        d: 'M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897',
        key: 'svg-5'
      }
    ],
    [
      'path',
      { d: 'M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732', key: 'svg-6' }
    ]
  ],
  mt = m('outline', 'brand-react', 'BrandReact', ht);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pt = [
    [
      'path',
      {
        d: 'M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968m-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968',
        key: 'svg-0'
      }
    ]
  ],
  xt = m('outline', 'brand-tailwind', 'BrandTailwind', pt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const vt = [
    [
      'path',
      {
        d: 'M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7',
        key: 'svg-0'
      }
    ],
    [
      'path',
      {
        d: 'M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3',
        key: 'svg-1'
      }
    ],
    ['path', { d: 'M9.7 17l4.6 0', key: 'svg-2' }]
  ],
  ft = m('outline', 'bulb', 'Bulb', vt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const gt = [
    [
      'path',
      {
        d: 'M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6',
        key: 'svg-0'
      }
    ],
    [
      'path',
      {
        d: 'M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10',
        key: 'svg-1'
      }
    ],
    [
      'path',
      {
        d: 'M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14',
        key: 'svg-2'
      }
    ],
    ['path', { d: 'M4 20h14', key: 'svg-3' }]
  ],
  yt = m('outline', 'chart-bar', 'ChartBar', gt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const bt = [
    [
      'path',
      {
        d: 'M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878',
        key: 'svg-0'
      }
    ]
  ],
  jt = m('outline', 'cloud', 'Cloud', bt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const wt = [
    ['path', { d: 'M7 8l-4 4l4 4', key: 'svg-0' }],
    ['path', { d: 'M17 8l4 4l-4 4', key: 'svg-1' }],
    ['path', { d: 'M14 4l-4 16', key: 'svg-2' }]
  ],
  Nt = m('outline', 'code', 'Code', wt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const kt = [
    ['path', { d: 'M4 6a8 3 0 1 0 16 0a8 3 0 1 0 -16 0', key: 'svg-0' }],
    ['path', { d: 'M4 6v6a8 3 0 0 0 16 0v-6', key: 'svg-1' }],
    ['path', { d: 'M4 12v6a8 3 0 0 0 16 0v-6', key: 'svg-2' }]
  ],
  Ct = m('outline', 'database', 'Database', kt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Mt = [
    ['path', { d: 'M3 19l18 0', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M5 7a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -8',
        key: 'svg-1'
      }
    ]
  ],
  St = m('outline', 'device-laptop', 'DeviceLaptop', Mt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Tt = [
    [
      'path',
      {
        d: 'M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3',
        key: 'svg-0'
      }
    ],
    ['path', { d: 'M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3', key: 'svg-1' }],
    ['path', { d: 'M14 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0', key: 'svg-2' }]
  ],
  ae = m('outline', 'rocket', 'Rocket', Tt);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const It = [
    [
      'path',
      {
        d: 'M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06',
        key: 'svg-0'
      }
    ],
    ['path', { d: 'M15 19l2 2l4 -4', key: 'svg-1' }]
  ],
  ne = m('outline', 'shield-check', 'ShieldCheck', It);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var H =
  function () {
    return (
      (H =
        Object.assign ||
        function (r) {
          for (var o, a = 1, n = arguments.length; a < n; a++) {
            o = arguments[a];
            for (var i in o)
              Object.prototype.hasOwnProperty.call(o, i) && (r[i] = o[i]);
          }
          return r;
        }),
      H.apply(this, arguments)
    );
  };
function Dt(t, r) {
  var o = {};
  for (var a in t)
    Object.prototype.hasOwnProperty.call(t, a) &&
      r.indexOf(a) < 0 &&
      (o[a] = t[a]);
  if (t != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var n = 0, a = Object.getOwnPropertySymbols(t); n < a.length; n++)
      r.indexOf(a[n]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(t, a[n]) &&
        (o[a[n]] = t[a[n]]);
  return o;
}
var S = '',
  I = null,
  R = null,
  ie = null;
function F() {
  ((S = ''),
    I !== null && I.disconnect(),
    R !== null && (window.clearTimeout(R), (R = null)));
}
function q(t) {
  var r = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'],
    o = ['A', 'AREA'];
  return (
    (r.includes(t.tagName) && !t.hasAttribute('disabled')) ||
    (o.includes(t.tagName) && t.hasAttribute('href'))
  );
}
function W() {
  var t = null;
  if (S === '#') t = document.body;
  else {
    var r = S.replace('#', '');
    ((t = document.getElementById(r)),
      t === null && S === '#top' && (t = document.body));
  }
  if (t !== null) {
    ie(t);
    var o = t.getAttribute('tabindex');
    return (
      o === null && !q(t) && t.setAttribute('tabindex', -1),
      t.focus({ preventScroll: !0 }),
      o === null && !q(t) && (t.blur(), t.removeAttribute('tabindex')),
      F(),
      !0
    );
  }
  return !1;
}
function Pt(t) {
  window.setTimeout(function () {
    W() === !1 &&
      (I === null && (I = new MutationObserver(W)),
      I.observe(document, { attributes: !0, childList: !0, subtree: !0 }),
      (R = window.setTimeout(function () {
        F();
      }, t || 1e4)));
  }, 0);
}
function le(t) {
  return G.forwardRef(function (r, o) {
    var a = '';
    typeof r.to == 'string' && r.to.includes('#')
      ? (a = '#' + r.to.split('#').slice(1).join('#'))
      : typeof r.to == 'object' &&
        typeof r.to.hash == 'string' &&
        (a = r.to.hash);
    var n = {};
    t === J &&
      (n.isActive = function (s, c) {
        return s && s.isExact && c.hash === a;
      });
    function i(s) {
      (F(),
        (S = r.elementId ? '#' + r.elementId : a),
        r.onClick && r.onClick(s),
        S !== '' &&
          !s.defaultPrevented &&
          s.button === 0 &&
          (!r.target || r.target === '_self') &&
          !(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey) &&
          ((ie =
            r.scroll ||
            function (c) {
              return r.smooth
                ? c.scrollIntoView({ behavior: 'smooth' })
                : c.scrollIntoView();
            }),
          Pt(r.timeout)));
    }
    var l = Dt(r, ['scroll', 'smooth', 'timeout', 'elementId']);
    return G.createElement(t, H({}, n, l, { onClick: i, ref: o }), r.children);
  });
}
var v = le(Te);
le(J);
const U = {
    overflow: 'hidden',
    backgroundColor: 'black',
    border: 'none',
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'
  },
  _t = () => {
    const [t, { toggle: r }] = K(!1);
    return e.jsx('header', {
      id: 'header',
      className: 'relative text-white my-4 px-4',
      children: e.jsxs('div', {
        className:
          'container mx-auto flex flex-col lg:flex-row  items-center justify-between',
        children: [
          e.jsxs('div', {
            className: 'flex justify-between w-full lg:w-auto  items-center',
            children: [
              e.jsx('a', {
                href: '/',
                className:
                  ' cursor-pointer  shadow-md transition-transform duration-300 ease-in-out hover:scale-110  ',
                children: e.jsx('img', {
                  src: '/public/logo.jpg',
                  style: { width: 'auto', maxWidth: '280px', height: 'auto' },
                  alt: 'Logo'
                })
              }),
              e.jsx('div', {
                className: 'lg:hidden ml-auto',
                children: e.jsx(A, { color: 'white', opened: t, onClick: r })
              })
            ]
          }),
          e.jsx('div', {
            className: `${t ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} lg:max-h-none lg:opacity-100 overflow-hidden transition-all duration-500 ease-in-out lg:flex justify-center items-center text-center w-full mt-4 lg:mt-0 space-y-4 lg:space-y-0 lg:space-x-8`,
            children: e.jsxs('nav', {
              className: 'flex flex-col lg:flex-row gap-4 lg:gap-8',
              children: [
                e.jsx(v, {
                  to: '#',
                  smooth: !0,
                  className:
                    'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-1 hover:rotate-x-12 hover:rotate-y-6 hover:text-purple-400',
                  children: 'Home'
                }),
                e.jsx(v, {
                  to: '#about',
                  smooth: !0,
                  className:
                    'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-1 hover:rotate-x-12 hover:rotate-y-6 hover:text-purple-400',
                  children: 'About'
                }),
                e.jsxs(x, {
                  width: 'max-content',
                  position: 'bottom',
                  radius: 'md',
                  children: [
                    e.jsx(x.Target, {
                      children: e.jsx(v, {
                        to: '#services',
                        smooth: !0,
                        className:
                          'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-1 hover:rotate-x-12 hover:rotate-y-6 hover:text-purple-400',
                        children: 'Services'
                      })
                    }),
                    e.jsx(x.Dropdown, {
                      style: U,
                      children: e.jsxs('div', {
                        className: 'flex flex-col space-y-2',
                        children: [
                          e.jsx('a', {
                            className:
                              'text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500',
                            children: 'Custom Software Development'
                          }),
                          e.jsx('a', {
                            className:
                              'text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500',
                            children: 'Web Development'
                          }),
                          e.jsx('a', {
                            className:
                              'text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500',
                            children: 'Mobile App Development'
                          }),
                          e.jsx('a', {
                            className:
                              'text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500',
                            children: 'Cloud Solutions'
                          }),
                          e.jsx('a', {
                            className:
                              'text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500',
                            children: 'IT Consulting and Strategy'
                          })
                        ]
                      })
                    })
                  ]
                }),
                e.jsxs(x, {
                  width: 'max-content',
                  position: 'bottom',
                  radius: 'md',
                  children: [
                    e.jsx(x.Target, {
                      children: e.jsx(v, {
                        to: '#technologies',
                        smooth: !0,
                        className:
                          'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-1 hover:rotate-x-12 hover:rotate-y-6 hover:text-purple-400',
                        children: 'Technologies'
                      })
                    }),
                    e.jsx(x.Dropdown, {
                      style: U,
                      children: e.jsxs('div', {
                        className: 'flex flex-col space-y-2',
                        children: [
                          e.jsx('a', {
                            className:
                              'text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500',
                            children: 'JAVA'
                          }),
                          e.jsx('a', {
                            className:
                              'text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500',
                            children: 'MERN'
                          }),
                          e.jsx('a', {
                            className:
                              'text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500',
                            children: 'FLUTTER'
                          }),
                          e.jsx('a', {
                            className:
                              'text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500',
                            children: 'DJANGO'
                          }),
                          e.jsx('a', {
                            className:
                              'text-white py-2 px-4 rounded-xl cursor-pointer hover:shadow-sm hover:bg-purple-900 hover:shadow-gray-500',
                            children: 'BLOCKCHAIN'
                          })
                        ]
                      })
                    })
                  ]
                }),
                e.jsx('a', {
                  href: '#',
                  className:
                    'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-1 hover:rotate-x-12 hover:rotate-y-6 hover:text-purple-400',
                  children: 'Pricing'
                }),
                e.jsx(v, {
                  to: '#contact',
                  smooth: !0,
                  className:
                    'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-1 hover:rotate-x-12 hover:rotate-y-6 hover:text-purple-400',
                  children: 'Contact'
                })
              ]
            })
          }),
          e.jsxs('div', {
            className:
              'flex justify-center space-x-3 mt-4 lg:mt-0 items-center',
            children: [
              e.jsx('div', {
                className:
                  'text-white animate-bounce cursor-pointer hover:text-purple-400',
                children: e.jsx('a', {
                  href: 'https://www.linkedin.com/company/srytal-systems-india-pvt-ltd',
                  target: '_blank',
                  children: e.jsx(se, { size: 28 })
                })
              }),
              e.jsx('div', {
                className:
                  'text-white animate-bounce cursor-pointer hover:text-purple-400',
                children: e.jsx(at, { size: 28 })
              }),
              e.jsx('div', {
                className:
                  'text-white animate-bounce cursor-pointer hover:text-purple-400',
                children: e.jsx(oe, { size: 28 })
              })
            ]
          })
        ]
      })
    });
  },
  Bt = () =>
    e.jsxs('main', {
      className:
        'relative h-[130dvh] flex flex-col justify-center items-center px-4',
      children: [
        e.jsx('h1', {
          className:
            'text-2xl sm:text-4xl md:max-w-6xl md:text-5xl lg:text-6xl font-extrabold tracking-wide mb-4 md:mb-6 text-center animate-slideInTop',
          children: 'Empowering Business with Innovative Technology Solutions'
        }),
        e.jsx('p', {
          className:
            'text-base md:text-lg text-white text-center max-w-full md:max-w-3xl px-4 md:px-0 leading-relaxed animate-slideInBottom',
          children:
            "At Srytal Systems, we are dedicated to driving digital transformation by providing cutting-edge software solutions tailored to meet the unique needs of businesses across industries. Our expertise spans custom software development, web and mobile app creation, cloud solutions, and IT consulting. With a focus on innovation, quality, and client satisfaction, we leverage the latest technologies to deliver scalable and efficient solutions that empower our clients to thrive in the digital age. Whether you're a startup or an established enterprise, Srytal Systems is your trusted partner in achieving technological excellence."
        }),
        e.jsx(v, {
          smooth: !0,
          className:
            'p-2 mt-4 bg-transparent text-white hover:shadow-lg hover:shadow-purple-400 shadow-sm shadow-purple-400 rounded-md animate-slideInLeft',
          to: '#about',
          children: 'Get Started'
        })
      ]
    });
function ce({ icon: t, name: r, color: o, hoverColor: a, size: n }) {
  const i = t,
    [l, { close: s, open: c }] = K(!1);
  return e.jsxs(j, {
    position: 'bottom',
    withArrow: !0,
    shadow: 'md',
    opened: l,
    children: [
      e.jsx(j.Target, {
        children: e.jsx(i, {
          onMouseEnter: c,
          onMouseLeave: s,
          className: `w-${n}   h-${n} ${o} hover:${a} transform transition-transform ease-in-out duration-500 hover:scale-150`
        })
      }),
      e.jsx(j.Dropdown, {
        className:
          'border-1 border-black bg-gradient-to-r from-purple-500 to-blue-500',
        children: e.jsx('p', {
          className: 'text-white text-md font-semibold',
          children: r
        })
      })
    ]
  });
}
const Rt = [
    {
      name: 'Follow us on LinkedIn',
      icon: se,
      link: 'https://www.linkedin.com/company/srytal-systems-india-pvt-ltd '
    },
    { name: 'Follow us on Facebook', icon: oe, link: '' }
  ],
  Et = () =>
    e.jsxs('div', {
      className: ' text-white py-10 px-4 border-t-2 border-gray-400',
      children: [
        e.jsx('div', {
          className: ' px-4',
          children: e.jsxs('div', {
            className: 'flex flex-col md:flex-row justify-between',
            children: [
              e.jsxs('div', {
                className: 'mb-6 md:mb-0',
                children: [
                  e.jsx('h1', {
                    className:
                      'text-3xl py-4 sm:text-4xl cursor-pointer font-bold  text-white hover:text-transparent bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text  transition-transform duration-300 ease-in-out hover:scale-110  ',
                    children: 'SRYTAL Systems India Pvt Ltd'
                  }),
                  e.jsx('p', {
                    className: 'text-sm mb-4',
                    children: 'Empowering Business with Technology'
                  }),
                  e.jsx('div', {
                    className: 'flex gap-6 mb-4',
                    children: Rt.map((t, r) => {
                      const o = t.icon;
                      return e.jsx(
                        'a',
                        {
                          href: t.link,
                          target: '_blank',
                          children: e.jsx(ce, {
                            icon: o,
                            name: t.name,
                            color: 'text-white',
                            hoverColor: 'text-purple-400',
                            size: 16
                          })
                        },
                        r
                      );
                    })
                  })
                ]
              }),
              e.jsxs('div', {
                className: 'flex flex-wrap gap-8',
                children: [
                  e.jsxs('div', {
                    className: 'mb-6 md:mb-0',
                    children: [
                      e.jsx('h2', {
                        className: ' text-xl font-bold mb-2',
                        children: 'Company'
                      }),
                      e.jsxs('ul', {
                        className: ' text-gray-400',
                        children: [
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx(v, {
                              to: '#header',
                              smooth: !0,
                              children: 'Home'
                            })
                          }),
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx(v, {
                              to: '#about',
                              smooth: !0,
                              children: 'About Us'
                            })
                          }),
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx('a', {
                              href: '#',
                              children: 'Careers'
                            })
                          }),
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx('a', {
                              href: '#',
                              children: 'Press'
                            })
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsxs('div', {
                    className: 'mb-6 md:mb-0',
                    children: [
                      e.jsx('h2', {
                        className: 'text-xl font-bold mb-2',
                        children: 'Product'
                      }),
                      e.jsxs('ul', {
                        className: 'space-y-1  text-gray-400',
                        children: [
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx('a', {
                              href: '#',
                              children: 'Features'
                            })
                          }),
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx('a', {
                              href: '#',
                              children: 'Integrations'
                            })
                          }),
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx('a', {
                              href: '#',
                              children: 'Pricing'
                            })
                          }),
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx('a', {
                              href: '#',
                              children: 'Demo'
                            })
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsxs('div', {
                    className: ' mb-6 md:mb-0',
                    children: [
                      e.jsx('h2', {
                        className: 'text-xl font-bold mb-2',
                        children: 'Resources'
                      }),
                      e.jsxs('ul', {
                        className: 'space-y-1  text-gray-400',
                        children: [
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx('a', {
                              href: '#',
                              children: 'Privacy Policy'
                            })
                          }),
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx('a', {
                              href: '#',
                              children: 'Terms of Service'
                            })
                          }),
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx('a', {
                              href: '#',
                              children: 'Help Center'
                            })
                          }),
                          e.jsx('li', {
                            className:
                              'text-gray-300 nav-item transform transition-transform duration-300 ease-out hover:scale-125 hover:-translate-y-2 hover:rotate-x-16 hover:rotate-y-8 hover:text-purple-400',
                            children: e.jsx(v, {
                              to: '#contact',
                              smooth: !0,
                              children: 'Contact Us'
                            })
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        }),
        e.jsxs('p', {
          className: 'text-xs text-gray-400',
          children: [
            '© SRYTAL Systems India Pvt Ltd 2024 - ',
            new Date().getFullYear(),
            ' | All Rights Reserved'
          ]
        })
      ]
    }),
  Lt = () => {
    const t = d.useRef(null),
      r = () => {
        t.current && t.current.classList.toggle('is-flipped');
      };
    return e.jsx('section', {
      id: 'about',
      className: 'py-12',
      children: e.jsxs('div', {
        className: 'px-4 md:px-12 flex flex-wrap items-stretch',
        children: [
          e.jsxs('div', {
            className:
              'w-full md:w-2/3 md:pr-8 mb-8 md:mb-0 flex flex-col justify-center',
            children: [
              e.jsx('h1', {
                className: 'text-2xl md:text-3xl font-bold mb-4',
                children: e.jsx('u', { children: 'About Us' })
              }),
              e.jsx('div', {
                className: 'text-base md:text-lg leading-relaxed',
                children:
                  "We are a forward-thinking software company committed to transforming businesses through innovative technology solutions. Our team of experienced developers, designers, and strategists works closely with clients to understand their unique challenges and deliver customized software that drives growth and efficiency. With a passion for excellence, we specialize in creating cutting-edge applications, responsive websites, and robust cloud solutions that empower businesses to stay ahead in a competitive market. Our approach is centered around client collaboration, quality, and continuous improvement. We leverage the latest technologies and best practices to ensure that our solutions are not only powerful but also scalable and secure. By focusing on long-term partnerships, we aim to provide ongoing support and enhancements that keep our clients at the forefront of their industries. Whether it's developing a custom software solution or optimizing existing systems, we are dedicated to helping businesses achieve their goals through technology."
              })
            ]
          }),
          e.jsx('div', {
            ref: t,
            className:
              'w-full md:w-1/3 flex-initial rounded-3xl overflow-hidden transform transition-transform duration-1000 relative',
            onMouseEnter: r,
            onMouseLeave: r,
            style: { minHeight: '16rem' },
            children: e.jsxs('div', {
              className: 'flip-inner w-full h-full relative',
              children: [
                e.jsx('div', {
                  className:
                    'flip-front absolute w-full h-full backface-hidden',
                  style: {
                    transform: 'rotateY(0deg)',
                    backfaceVisibility: 'hidden'
                  },
                  children: e.jsx('img', {
                    className: 'w-full h-full object-cover rounded-3xl',
                    src: '/public/img-2.jpg',
                    alt: 'Front'
                  })
                }),
                e.jsx('div', {
                  className: 'flip-back absolute w-full h-full backface-hidden',
                  style: {
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                  },
                  children: e.jsx('img', {
                    className: 'w-full h-full object-cover rounded-3xl',
                    src: '/public/img-4.jpg',
                    alt: 'Back'
                  })
                })
              ]
            })
          })
        ]
      })
    });
  },
  Ht = [
    {
      title: 'Custom Software Development',
      description:
        'Tailor-made software solutions that align with your business needs, ensuring seamless operations and a competitive edge.',
      icon: e.jsx(Nt, { size: '4rem' })
    },
    {
      title: 'Cloud Integration',
      description:
        'Transform your IT infrastructure with our cloud integration services, ensuring scalability, flexibility, and security.',
      icon: e.jsx(jt, { size: '4rem' })
    },
    {
      title: 'Database Management',
      description:
        'Efficient and secure database management solutions to streamline your data operations and enhance accessibility.',
      icon: e.jsx(Ct, { size: '4rem' })
    },
    {
      title: 'Business Analytics',
      description:
        'Leverage advanced analytics to make data-driven decisions that boost productivity and profitability.',
      icon: e.jsx(yt, { size: '4rem' })
    },
    {
      title: 'IT Consultation',
      description:
        'Expert IT consultation services to help you navigate the digital landscape and implement cutting-edge technology.',
      icon: e.jsx(St, { size: '4rem' })
    },
    {
      title: 'Security Solutions',
      description:
        'Comprehensive cyber security strategies to protect your digital assets and ensure business continuity.',
      icon: e.jsx(ne, { size: '4rem' })
    }
  ],
  Ot = () =>
    e.jsx('section', {
      id: 'services',
      className: 'py-16',
      children: e.jsxs('div', {
        className: 'container mx-auto px-8',
        children: [
          e.jsxs('div', {
            className: 'text-center mb-12',
            children: [
              e.jsx('h2', {
                className: 'text-2xl md:text-3xl text-center font-bold',
                children: 'Our Services'
              }),
              e.jsx('p', {
                className: 'text-xl mt-4',
                children: 'Empowering Business with Innovative Solutions'
              })
            ]
          }),
          e.jsx('div', {
            className: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3',
            children: Ht.map((t, r) =>
              e.jsxs(
                'div',
                {
                  className:
                    'flex flex-col items-center justify-between h-full max-h-72 shadow-sm rounded-lg p-6 hover:shadow-purple-500 hover:shadow-lg transition-shadow duration-300',
                  children: [
                    e.jsx(Ie, { className: 'mb-4', children: t.icon }),
                    e.jsx(E, {
                      className: 'text-xl font-semibold text-center mb-4',
                      children: t.title
                    }),
                    e.jsx(E, {
                      className: 'text-sm text-center',
                      children: t.description
                    })
                  ]
                },
                r
              )
            )
          })
        ]
      })
    }),
  At = () =>
    e.jsxs('div', {
      className:
        'bg-gradient-to-r mx-8 md:mx-16 from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg text-center',
      children: [
        e.jsx('h2', {
          className: 'text-2xl font-bold',
          children: 'Ready to elevate your business strategy?'
        }),
        e.jsx('p', {
          className: 'mt-4 text-lg px-4 md:px-16',
          children:
            'Discover innovative solutions that streamline operations and drive growth. Join the leaders in your industry and unlock new potential with our expertise.'
        }),
        e.jsx(Q, {
          className: 'mt-6 bg-black text-white hover:bg-gray-800',
          size: 'md',
          leftSection: e.jsx(ae, {}),
          children: e.jsx(v, {
            to: '#contact',
            children: 'Contact our experts'
          })
        })
      ]
    }),
  $t = () => {
    const t = [
      {
        title: 'Innovative Solutions',
        description:
          'We deliver cutting-edge technology solutions tailored to your business needs.',
        icon: e.jsx(ft, { size: 40 })
      },
      {
        title: 'Reliability & Security',
        description:
          'Your data and projects are secure with our top-notch security measures.',
        icon: e.jsx(ne, { size: 40 })
      },
      {
        title: 'Client-Centric Approach',
        description:
          'We focus on building strong, lasting relationships with our clients.',
        icon: e.jsx(Be, { size: 40 })
      },
      {
        title: 'Rapid Delivery',
        description:
          'We ensure timely delivery without compromising on quality.',
        icon: e.jsx(ae, { size: 40 })
      }
    ];
    return e.jsxs('section', {
      className:
        'bg-gray-900 text-white py-12 mx-4 md:mx-8 px-4 rounded-lg shadow-lg',
      children: [
        e.jsx('h1', {
          className: 'text-2xl md:text-3xl text-center font-bold mb-16',
          children: 'Why Choose Us ?'
        }),
        e.jsx('div', {
          className: 'flex justify-center',
          children: e.jsx('div', {
            className:
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8',
            children: t.map((r, o) =>
              e.jsxs(
                'div',
                {
                  className:
                    'flex flex-col items-center justify-between h-full max-h-72 bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-xl',
                  'aria-labelledby': `feature-title-${o}`,
                  'aria-describedby': `feature-desc-${o}`,
                  children: [
                    e.jsx(Pe, {
                      color: 'white',
                      variant: 'light',
                      size: 'xl',
                      radius: 'lg',
                      className: 'mb-4',
                      children: r.icon
                    }),
                    e.jsx(_e, {
                      order: 3,
                      ta: 'center',
                      className: 'text-lg mb-2',
                      id: `feature-title-${o}`,
                      children: r.title
                    }),
                    e.jsx(E, {
                      ta: 'center',
                      id: `feature-desc-${o}`,
                      children: r.description
                    })
                  ]
                },
                o
              )
            )
          })
        })
      ]
    });
  },
  zt = Re({
    companyName: _({ required_error: 'Please enter the company name !' }).min(
      1,
      { message: 'Please enter the company name !' }
    ),
    customerEmail: _({ required_error: 'Please enter valid email !' }).email({
      message: 'Please enter valid email !'
    }),
    subject: _({ required_error: 'Please enter the Subject !' }).min(1, {
      message: 'Please enter the Subject !'
    }),
    message: _({ required_error: 'Please enter the Message !' }).min(1, {
      message: 'Please enter the Message !'
    })
  }),
  Ft = () => {
    var l, s, c, u;
    const {
        register: t,
        handleSubmit: r,
        formState: { errors: o }
      } = Ee({ resolver: Le(zt) }),
      [a, n] = d.useState({ message: '', status: !1 }),
      i = h => {
        He(h)
          .then(() => {
            (n({
              message:
                'Thank you for reaching out! Your message has been successfully sent. We will get back to you as soon as possible',
              status: !0
            }),
              setTimeout(() => {
                n({ message: '', status: !1 });
              }, 5e3));
          })
          .catch(() => {
            (setTimeout(() => {
              n({ message: '', status: !1 });
            }, 5e3),
              n({
                message:
                  'Oops! Something went wrong while sending your message. Please try again later or contact us directly.',
                status: !0
              }));
          });
      };
    return e.jsx('div', {
      id: 'contact',
      className: 'flex bg-transparent justify-center items-center',
      children: e.jsxs('form', {
        onSubmit: r(i),
        className: ' px-8 py-4 w-full md:w-1/2  rounded-lg shadow-lg ',
        children: [
          e.jsx('h1', {
            className: 'text-center text-xl font-semibold',
            children: 'Contact Us'
          }),
          e.jsx(L, {
            label: 'Company Name',
            placeholder: 'Your company name',
            ...t('companyName', { required: 'Company name is required' }),
            error: (l = o.companyName) == null ? void 0 : l.message
          }),
          e.jsx(L, {
            label: 'Email',
            placeholder: 'Your email',
            ...t('customerEmail', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Please enter valid email !'
              }
            }),
            error: (s = o.customerEmail) == null ? void 0 : s.message,
            mt: 'md'
          }),
          e.jsx(L, {
            label: 'Subject',
            placeholder: 'Message subject',
            ...t('subject', { required: 'Please enter the Subject !' }),
            error: (c = o.subject) == null ? void 0 : c.message,
            mt: 'md'
          }),
          e.jsx(Ae, {
            label: 'Message',
            placeholder: 'Your message',
            autosize: !0,
            maxRows: 5,
            minRows: 3,
            ...t('message', { required: 'Please enter the Message !' }),
            error: (u = o.message) == null ? void 0 : u.message,
            mt: 'md'
          }),
          a.status && e.jsx('p', { className: 'my-8 ', children: a.message }),
          e.jsx('div', {
            className: 'mt-2 text-right',
            children: e.jsx(Q, {
              type: 'submit',
              className: 'bg-blue-500 mt-4 hover:bg-blue-600',
              children: 'Send Message'
            })
          })
        ]
      })
    });
  },
  V = [
    { name: 'React', icon: mt, color: 'text-blue-500' },
    { name: 'Node.js', icon: ct, color: 'text-green-500' },
    { name: 'JavaScript', icon: rt, color: 'text-yellow-500' },
    { name: 'Tailwind CSS', icon: xt, color: 'text-teal-500' },
    { name: 'Python', icon: ut, color: 'text-blue-600' },
    { name: 'HTML5', icon: et, color: 'text-orange-600' },
    { name: 'CSS3', icon: Qe, color: 'text-blue-700' },
    { name: 'MongoDB', icon: it, color: 'text-green-700' }
  ],
  Gt = () =>
    e.jsxs('div', {
      id: 'technologies',
      className: 'mt-8',
      children: [
        e.jsx('h1', {
          className: 'text-2xl md:text-3xl text-center font-bold',
          children: 'Cutting-Edge Tools & Technologies'
        }),
        e.jsx('div', {
          className: 'flex ',
          children: e.jsx('div', {
            className: 'flex space-x-32  animate-technologies mt-8',
            children: V.concat(V).map((t, r) => {
              const o = t.icon;
              return e.jsx(
                ce,
                {
                  icon: o,
                  color: t.color,
                  name: t.name,
                  hoverColor: t.color,
                  size: 32
                },
                r
              );
            })
          })
        })
      ]
    }),
  qt = () => {
    const [t, r] = d.useState(0),
      [o, a] = d.useState(0),
      n = d.useRef(null);
    (d.useEffect(() => {
      Oe().then(l => r(l));
    }, []),
      d.useEffect(() => {
        const l = new IntersectionObserver(
          ([s]) => {
            s.isIntersecting && (i(), l.unobserve(s.target));
          },
          { threshold: 0.9 }
        );
        return (
          n.current && l.observe(n.current),
          () => {
            n.current && l.unobserve(n.current);
          }
        );
      }, [t]));
    const i = () => {
      let l = 0;
      const s = t,
        u = Math.ceil(s / (500 / 100)),
        h = setInterval(() => {
          ((l += u), l >= s && ((l = s), clearInterval(h)), a(l));
        }, 100);
    };
    return e.jsx('div', {
      ref: n,
      children: e.jsxs($e, {
        p: 'lg',
        radius: 'md',
        className:
          'bg-transparent text-center w-full md:w-2/3 lg:w-1/2 mx-auto my-6 transform hover:scale-105 transition-transform',
        children: [
          e.jsxs('div', {
            className: 'flex space-x-10 justify-center items-center',
            children: [
              e.jsx(ze, {
                color: 'blue',
                variant: 'light',
                children: 'Visitors'
              }),
              e.jsx(Fe, { size: 24, className: 'text-blue-500' })
            ]
          }),
          e.jsx('div', {
            className: 'mt-4 text-5xl font-bold text-indigo-700',
            children: o
          }),
          e.jsx(E, {
            color: 'dimmed',
            size: 'sm',
            className: 'mt-2',
            children: 'People have visited this site.'
          })
        ]
      })
    });
  };
var O = new Map(),
  B = new WeakMap(),
  Y = 0,
  Wt = void 0;
function Ut(t) {
  return t ? (B.has(t) || ((Y += 1), B.set(t, Y.toString())), B.get(t)) : '0';
}
function Vt(t) {
  return Object.keys(t)
    .sort()
    .filter(r => t[r] !== void 0)
    .map(r => `${r}_${r === 'root' ? Ut(t.root) : t[r]}`)
    .toString();
}
function Yt(t) {
  const r = Vt(t);
  let o = O.get(r);
  if (!o) {
    const a = new Map();
    let n;
    const i = new IntersectionObserver(l => {
      l.forEach(s => {
        var c;
        const u = s.isIntersecting && n.some(h => s.intersectionRatio >= h);
        (t.trackVisibility && typeof s.isVisible > 'u' && (s.isVisible = u),
          (c = a.get(s.target)) == null ||
            c.forEach(h => {
              h(u, s);
            }));
      });
    }, t);
    ((n =
      i.thresholds ||
      (Array.isArray(t.threshold) ? t.threshold : [t.threshold || 0])),
      (o = { id: r, observer: i, elements: a }),
      O.set(r, o));
  }
  return o;
}
function Jt(t, r, o = {}, a = Wt) {
  if (typeof window.IntersectionObserver > 'u' && a !== void 0) {
    const c = t.getBoundingClientRect();
    return (
      r(a, {
        isIntersecting: a,
        target: t,
        intersectionRatio: typeof o.threshold == 'number' ? o.threshold : 0,
        time: 0,
        boundingClientRect: c,
        intersectionRect: c,
        rootBounds: c
      }),
      () => {}
    );
  }
  const { id: n, observer: i, elements: l } = Yt(o),
    s = l.get(t) || [];
  return (
    l.has(t) || l.set(t, s),
    s.push(r),
    i.observe(t),
    function () {
      (s.splice(s.indexOf(r), 1),
        s.length === 0 && (l.delete(t), i.unobserve(t)),
        l.size === 0 && (i.disconnect(), O.delete(n)));
    }
  );
}
function Kt({
  threshold: t,
  delay: r,
  trackVisibility: o,
  rootMargin: a,
  root: n,
  triggerOnce: i,
  skip: l,
  initialInView: s,
  fallbackInView: c,
  onChange: u
} = {}) {
  var h;
  const [p, y] = d.useState(null),
    N = d.useRef(u),
    [w, k] = d.useState({ inView: !!s, entry: void 0 });
  ((N.current = u),
    d.useEffect(() => {
      if (l || !p) return;
      let g;
      return (
        (g = Jt(
          p,
          (T, C) => {
            (k({ inView: T, entry: C }),
              N.current && N.current(T, C),
              C.isIntersecting && i && g && (g(), (g = void 0)));
          },
          {
            root: n,
            rootMargin: a,
            threshold: t,
            trackVisibility: o,
            delay: r
          },
          c
        )),
        () => {
          g && g();
        }
      );
    }, [Array.isArray(t) ? t.toString() : t, p, n, a, i, l, o, c, r]));
  const b = (h = w.entry) == null ? void 0 : h.target,
    P = d.useRef(void 0);
  !p &&
    b &&
    !i &&
    !l &&
    P.current !== b &&
    ((P.current = b), k({ inView: !!s, entry: void 0 }));
  const f = [y, w.inView, w.entry];
  return ((f.ref = f[0]), (f.inView = f[1]), (f.entry = f[2]), f);
}
const Qt = ({ children: t }) => {
    const { ref: r, inView: o } = Kt({ triggerOnce: !0, threshold: 0.1 });
    return e.jsx('div', { ref: r, children: o ? t : null });
  },
  br = () => {
    const t = De('(max-width: 768px)');
    return e.jsxs('div', {
      className:
        'relative  w-full h-screen bg-gray-900 text-white overflow-x-hidden',
      children: [
        e.jsx('div', {
          className:
            'fixed top-10 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-50 animate-move1'
        }),
        e.jsx('div', {
          className:
            'fixed top-20 right-10 w-40 h-40 bg-pink-500 rounded-full opacity-50 animate-move2'
        }),
        e.jsx('div', {
          className:
            'fixed bottom-10 left-20 w-48 h-48 bg-blue-500 rounded-full opacity-50 animate-move3'
        }),
        e.jsxs('div', {
          className: 'flex flex-col justify-between',
          style: {
            backgroundImage: 'url(/public/wal2.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            height: t ? '140dvh' : '120dvh'
          },
          children: [e.jsx(_t, {}), e.jsx(Bt, {})]
        }),
        e.jsx('div', { className: ' py-6 w-full ', children: e.jsx(Lt, {}) }),
        e.jsx('div', { className: 'py-6 w-full ', children: e.jsx(Gt, {}) }),
        e.jsx('div', {
          className: ' py-6 w-full mx-auto',
          children: e.jsx(Ot, {})
        }),
        e.jsx('div', {
          className: ' py-6 w-full mx-auto',
          children: e.jsx(At, {})
        }),
        e.jsx('div', {
          className: ' py-6 w-full max-w-5xl mx-auto',
          children: e.jsx($t, {})
        }),
        e.jsx(d.Suspense, {
          fallback: e.jsx('div', {
            className: 'text-center',
            children: 'Loading About...'
          }),
          children: e.jsx(Qt, {
            children: e.jsx('div', {
              className: ' py-6 w-full mx-auto',
              children: e.jsx(qt, {})
            })
          })
        }),
        e.jsx('div', {
          className: ' py-6 w-full mx-auto',
          children: e.jsx(Ft, {})
        }),
        e.jsx('div', {
          className: ' py-6 w-full max-w-5xl mx-auto',
          children: e.jsx(Et, {})
        })
      ]
    });
  };
export { br as default };
