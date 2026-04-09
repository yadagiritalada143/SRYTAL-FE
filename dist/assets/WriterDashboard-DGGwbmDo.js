import {
  e as x,
  d as Ie,
  f as J,
  u as R,
  j as e,
  B as fe,
  ab as Y,
  a9 as Te,
  ad as xe,
  X as ve,
  au as ye,
  b0 as we,
  U as je,
  aM as Ae,
  i as Ne,
  h as Ee,
  a as Pe,
  b5 as _e,
  v as ze,
  C as Le,
  s as Re,
  V as se,
  P as Be,
  S as P,
  G as U,
  T as _,
  W as Fe,
  Q as Oe
} from './index-Cn_-nzwF.js';
import { a as ne } from './button-D3DmOMH8.js';
import { g as $e } from './useUserQueries-m-8gfZ67.js';
import { C as H } from './CommonButton-D8AVyhIy.js';
import { C as he } from './Container-3LzVKj3b.js';
import { A as re } from './ActionIcon-BBM-Tm4F.js';
import { I as Ke } from './IconArrowLeft-DGaJMG-t.js';
import { T as V } from './Title-T3OvY56h.js';
import { I as ge } from './IconPlus-zkiZIHJ7.js';
import { C as W } from './Card-BOCM3d4L.js';
import { T as Ue } from './TextInput-DUPEWkCs.js';
import { I as Ve } from './IconX-BFEQcM8f.js';
import { I as We } from './IconSearch-D9mxNvB2.js';
import { S as X } from './SimpleGrid-B8ebT4MM.js';
import { P as Ge } from './Pagination-BaGk3Wb1.js';
import { I as ae } from './Image-Ck_xSqda.js';
import { I as qe } from './IconBook-BHRzfMqD.js';
import { c as Z } from './createReactComponent-wv-YgGrS.js';
import { T as He } from './ThemeIcon-DU_nylS8.js';
import { D as Qe } from './Divider-C8nnAxUa.js';
import { f as Xe, c as be } from './create-scoped-keydown-handler-O-eo68DQ.js';
import { a as Je } from './Input-kzRYOXAd.js';
import { P as G } from './Popover-C5NzMGSx.js';
import { c as S } from './create-event-handler-C3eq9ghx.js';
import { A as Ye } from './AccordionChevron-D1fL7nd1.js';
import { u as Ze } from './use-disclosure-Dul82tkt.js';
import { u as eo } from './use-uncontrolled-C8lBt68W.js';
import { I as oo } from './IconEdit-BA67kK5H.js';
import { I as to } from './IconTrash-BQZ6jsv8.js';
import { B as so } from './Badge-pr8cFvg5.js';
import './api-client-CcbR4Lbf.js';
import './useQuery-4fhBkLAX.js';
import './common-services-DPGUVDMw.js';
import './InputBase-CO8vJiWZ.js';
import './use-input-props-CLa6mLr2.js';
import './get-base-value-BKGvYumc.js';
import './get-auto-contrast-value-Da6zqqWm.js';
import './get-floating-position-TyKNLeXJ.js';
function no(s, l, a) {
  var d;
  return a
    ? Array.from(
        ((d = Xe(a, l)) == null ? void 0 : d.querySelectorAll(s)) || []
      ).findIndex(u => u === a)
    : null;
}
function Me({ open: s, close: l, openDelay: a, closeDelay: d }) {
  const u = x.useRef(-1),
    n = x.useRef(-1),
    t = () => {
      (window.clearTimeout(u.current), window.clearTimeout(n.current));
    },
    c = () => {
      (t(),
        a === 0 || a === void 0 ? s() : (u.current = window.setTimeout(s, a)));
    },
    h = () => {
      (t(),
        d === 0 || d === void 0 ? l() : (n.current = window.setTimeout(l, d)));
    };
  return (x.useEffect(() => t, []), { openDropdown: c, closeDropdown: h });
}
const [ro, B] = Ie('Menu component was not found in the tree');
var F = {
  dropdown: 'm_dc9b7c9f',
  label: 'm_9bfac126',
  divider: 'm_efdf90cb',
  item: 'm_99ac2aa1',
  itemLabel: 'm_5476e0d3',
  itemSection: 'm_8b75e504',
  chevron: 'm_b85b0bed'
};
const le = J((s, l) => {
  const {
      classNames: a,
      className: d,
      style: u,
      styles: n,
      vars: t,
      ...c
    } = R('MenuDivider', null, s),
    h = B();
  return e.jsx(fe, {
    ref: l,
    ...h.getStyles('divider', {
      className: d,
      style: u,
      styles: n,
      classNames: a
    }),
    ...c
  });
});
le.classes = F;
le.displayName = '@mantine/core/MenuDivider';
const ce = J((s, l) => {
  const {
      classNames: a,
      className: d,
      style: u,
      styles: n,
      vars: t,
      onMouseEnter: c,
      onMouseLeave: h,
      onKeyDown: v,
      children: b,
      ...M
    } = R('MenuDropdown', null, s),
    m = x.useRef(null),
    g = B(),
    p = S(v, y => {
      var D, I;
      (y.key === 'ArrowUp' || y.key === 'ArrowDown') &&
        (y.preventDefault(),
        (I =
          (D = m.current) == null
            ? void 0
            : D.querySelectorAll('[data-menu-item]:not(:disabled)')[0]) ==
          null || I.focus());
    }),
    r = S(
      c,
      () =>
        (g.trigger === 'hover' || g.trigger === 'click-hover') &&
        g.openDropdown()
    ),
    i = S(
      h,
      () =>
        (g.trigger === 'hover' || g.trigger === 'click-hover') &&
        g.closeDropdown()
    );
  return e.jsxs(G.Dropdown, {
    ...M,
    onMouseEnter: r,
    onMouseLeave: i,
    role: 'menu',
    'aria-orientation': 'vertical',
    ref: Y(l, m),
    ...g.getStyles('dropdown', {
      className: d,
      style: u,
      styles: n,
      classNames: a,
      withStaticClass: !1
    }),
    tabIndex: -1,
    'data-menu-dropdown': !0,
    onKeyDown: p,
    children: [
      g.withInitialFocusPlaceholder &&
        e.jsx('div', {
          tabIndex: -1,
          'data-autofocus': !0,
          'data-mantine-stop-propagation': !0,
          style: { outline: 0 }
        }),
      b
    ]
  });
});
ce.classes = F;
ce.displayName = '@mantine/core/MenuDropdown';
const [ao, ee] = Te(),
  de = xe((s, l) => {
    const {
        classNames: a,
        className: d,
        style: u,
        styles: n,
        vars: t,
        color: c,
        closeMenuOnClick: h,
        leftSection: v,
        rightSection: b,
        children: M,
        disabled: m,
        'data-disabled': g,
        ...p
      } = R('MenuItem', null, s),
      r = B(),
      i = ee(),
      y = ve(),
      { dir: D } = ye(),
      I = x.useRef(null),
      T = p,
      C = S(T.onClick, () => {
        g ||
          (typeof h == 'boolean'
            ? h && r.closeDropdownImmediately()
            : r.closeOnItemClick && r.closeDropdownImmediately());
      }),
      w = c
        ? y.variantColorResolver({ color: c, theme: y, variant: 'light' })
        : void 0,
      k = c ? we({ color: c, theme: y }) : null,
      O = S(T.onKeyDown, z => {
        z.key === 'ArrowLeft' && i && (i.close(), i.focusParentItem());
      });
    return e.jsxs(je, {
      onMouseDown: z => z.preventDefault(),
      ...p,
      unstyled: r.unstyled,
      tabIndex: r.menuItemTabIndex,
      ...r.getStyles('item', {
        className: d,
        style: u,
        styles: n,
        classNames: a
      }),
      ref: Y(I, l),
      role: 'menuitem',
      disabled: m,
      'data-menu-item': !0,
      'data-disabled': m || g || void 0,
      'data-mantine-stop-propagation': !0,
      onClick: C,
      onKeyDown: be({
        siblingSelector: '[data-menu-item]:not([data-disabled])',
        parentSelector: '[data-menu-dropdown]',
        activateOnFocus: !1,
        loop: r.loop,
        dir: D,
        orientation: 'vertical',
        onKeyDown: O
      }),
      __vars: {
        '--menu-item-color':
          k != null &&
          k.isThemeColor &&
          (k == null ? void 0 : k.shade) === void 0
            ? `var(--mantine-color-${k.color}-6)`
            : w == null
              ? void 0
              : w.color,
        '--menu-item-hover': w == null ? void 0 : w.hover
      },
      children: [
        v &&
          e.jsx('div', {
            ...r.getStyles('itemSection', { styles: n, classNames: a }),
            'data-position': 'left',
            children: v
          }),
        M &&
          e.jsx('div', {
            ...r.getStyles('itemLabel', { styles: n, classNames: a }),
            children: M
          }),
        b &&
          e.jsx('div', {
            ...r.getStyles('itemSection', { styles: n, classNames: a }),
            'data-position': 'right',
            children: b
          })
      ]
    });
  });
de.classes = F;
de.displayName = '@mantine/core/MenuItem';
const ue = J((s, l) => {
  const {
      classNames: a,
      className: d,
      style: u,
      styles: n,
      vars: t,
      ...c
    } = R('MenuLabel', null, s),
    h = B();
  return e.jsx(fe, {
    ref: l,
    ...h.getStyles('label', {
      className: d,
      style: u,
      styles: n,
      classNames: a
    }),
    ...c
  });
});
ue.classes = F;
ue.displayName = '@mantine/core/MenuLabel';
const me = J((s, l) => {
  const {
      classNames: a,
      className: d,
      style: u,
      styles: n,
      vars: t,
      onMouseEnter: c,
      onMouseLeave: h,
      onKeyDown: v,
      children: b,
      ...M
    } = R('MenuSubDropdown', null, s),
    m = x.useRef(null),
    g = B(),
    p = ee(),
    r = S(c, p == null ? void 0 : p.open),
    i = S(h, p == null ? void 0 : p.close);
  return e.jsx(G.Dropdown, {
    ...M,
    onMouseEnter: r,
    onMouseLeave: i,
    role: 'menu',
    'aria-orientation': 'vertical',
    ref: Y(l, m),
    ...g.getStyles('dropdown', {
      className: d,
      style: u,
      styles: n,
      classNames: a,
      withStaticClass: !1
    }),
    tabIndex: -1,
    'data-menu-dropdown': !0,
    children: b
  });
});
me.classes = F;
me.displayName = '@mantine/core/MenuSubDropdown';
const pe = xe((s, l) => {
  const {
      classNames: a,
      className: d,
      style: u,
      styles: n,
      vars: t,
      color: c,
      leftSection: h,
      rightSection: v,
      children: b,
      disabled: M,
      'data-disabled': m,
      closeMenuOnClick: g,
      ...p
    } = R('MenuSubItem', null, s),
    r = B(),
    i = ee(),
    y = ve(),
    { dir: D } = ye(),
    I = x.useRef(null),
    T = p,
    C = c
      ? y.variantColorResolver({ color: c, theme: y, variant: 'light' })
      : void 0,
    w = c ? we({ color: c, theme: y }) : null,
    k = S(T.onKeyDown, E => {
      (E.key === 'ArrowRight' &&
        (i == null || i.open(), i == null || i.focusFirstItem()),
        E.key === 'ArrowLeft' &&
          i != null &&
          i.parentContext &&
          (i.parentContext.close(), i.parentContext.focusParentItem()));
    }),
    O = S(T.onClick, () => {
      !m && g && r.closeDropdownImmediately();
    }),
    z = S(T.onMouseEnter, i == null ? void 0 : i.open),
    N = S(T.onMouseLeave, i == null ? void 0 : i.close);
  return e.jsxs(je, {
    onMouseDown: E => E.preventDefault(),
    ...p,
    unstyled: r.unstyled,
    tabIndex: r.menuItemTabIndex,
    ...r.getStyles('item', {
      className: d,
      style: u,
      styles: n,
      classNames: a
    }),
    ref: Y(I, l),
    role: 'menuitem',
    disabled: M,
    'data-menu-item': !0,
    'data-sub-menu-item': !0,
    'data-disabled': M || m || void 0,
    'data-mantine-stop-propagation': !0,
    onMouseEnter: z,
    onMouseLeave: N,
    onClick: O,
    onKeyDown: be({
      siblingSelector: '[data-menu-item]:not([data-disabled])',
      parentSelector: '[data-menu-dropdown]',
      activateOnFocus: !1,
      loop: r.loop,
      dir: D,
      orientation: 'vertical',
      onKeyDown: k
    }),
    __vars: {
      '--menu-item-color':
        w != null && w.isThemeColor && (w == null ? void 0 : w.shade) === void 0
          ? `var(--mantine-color-${w.color}-6)`
          : C == null
            ? void 0
            : C.color,
      '--menu-item-hover': C == null ? void 0 : C.hover
    },
    children: [
      h &&
        e.jsx('div', {
          ...r.getStyles('itemSection', { styles: n, classNames: a }),
          'data-position': 'left',
          children: h
        }),
      b &&
        e.jsx('div', {
          ...r.getStyles('itemLabel', { styles: n, classNames: a }),
          children: b
        }),
      e.jsx('div', {
        ...r.getStyles('itemSection', { styles: n, classNames: a }),
        'data-position': 'right',
        children: v || e.jsx(Ye, { ...r.getStyles('chevron'), size: 14 })
      })
    ]
  });
});
pe.classes = F;
pe.displayName = '@mantine/core/MenuSubItem';
function Ce({ children: s, refProp: l }) {
  if (!Ae(s))
    throw new Error(
      'Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
    );
  return (B(), e.jsx(G.Target, { refProp: l, popupType: 'menu', children: s }));
}
Ce.displayName = '@mantine/core/MenuSubTarget';
const io = {
  offset: 0,
  position: 'right-start',
  transitionProps: { duration: 0 },
  openDelay: 0,
  middlewares: { shift: { crossAxis: !0 } }
};
function q(s) {
  const {
      children: l,
      closeDelay: a,
      openDelay: d,
      ...u
    } = R('MenuSub', io, s),
    n = Ne(),
    [t, { open: c, close: h }] = Ze(!1),
    v = ee(),
    { openDropdown: b, closeDropdown: M } = Me({
      open: c,
      close: h,
      closeDelay: a,
      openDelay: d
    }),
    m = () =>
      window.setTimeout(() => {
        var p, r;
        (r =
          (p = document.getElementById(`${n}-dropdown`)) == null
            ? void 0
            : p.querySelectorAll('[data-menu-item]:not([data-disabled])')[0]) ==
          null || r.focus();
      }, 16),
    g = () =>
      window.setTimeout(() => {
        var p;
        (p = document.getElementById(`${n}-target`)) == null || p.focus();
      }, 16);
  return e.jsx(ao, {
    value: {
      opened: t,
      close: M,
      open: b,
      focusFirstItem: m,
      focusParentItem: g,
      parentContext: v
    },
    children: e.jsx(G, {
      opened: t,
      withinPortal: !1,
      withArrow: !1,
      id: n,
      ...u,
      children: l
    })
  });
}
q.extend = s => s;
q.displayName = '@mantine/core/MenuSub';
q.Target = Ce;
q.Dropdown = me;
q.Item = pe;
const lo = { refProp: 'ref' },
  Se = x.forwardRef((s, l) => {
    const { children: a, refProp: d, ...u } = R('MenuTarget', lo, s),
      n = Ee(a);
    if (!n)
      throw new Error(
        'Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
      );
    const t = B(),
      c = n.props,
      h = S(c.onClick, () => {
        t.trigger === 'click'
          ? t.toggleDropdown()
          : t.trigger === 'click-hover' &&
            (t.setOpenedViaClick(!0), t.opened || t.openDropdown());
      }),
      v = S(
        c.onMouseEnter,
        () =>
          (t.trigger === 'hover' || t.trigger === 'click-hover') &&
          t.openDropdown()
      ),
      b = S(c.onMouseLeave, () => {
        (t.trigger === 'hover' ||
          (t.trigger === 'click-hover' && !t.openedViaClick)) &&
          t.closeDropdown();
      });
    return e.jsx(G.Target, {
      refProp: d,
      popupType: 'menu',
      ref: l,
      ...u,
      children: x.cloneElement(n, {
        onClick: h,
        onMouseEnter: v,
        onMouseLeave: b,
        'data-expanded': t.opened ? !0 : void 0
      })
    });
  });
Se.displayName = '@mantine/core/MenuTarget';
const co = {
  trapFocus: !0,
  closeOnItemClick: !0,
  withInitialFocusPlaceholder: !0,
  clickOutsideEvents: ['mousedown', 'touchstart', 'keydown'],
  loop: !0,
  trigger: 'click',
  openDelay: 0,
  closeDelay: 100,
  menuItemTabIndex: -1
};
function j(s) {
  const l = R('Menu', co, s),
    {
      children: a,
      onOpen: d,
      onClose: u,
      opened: n,
      defaultOpened: t,
      trapFocus: c,
      onChange: h,
      closeOnItemClick: v,
      loop: b,
      closeOnEscape: M,
      trigger: m,
      openDelay: g,
      closeDelay: p,
      classNames: r,
      styles: i,
      unstyled: y,
      variant: D,
      vars: I,
      menuItemTabIndex: T,
      keepMounted: C,
      withInitialFocusPlaceholder: w,
      attributes: k,
      ...O
    } = l,
    z = Pe({
      name: 'Menu',
      classes: F,
      props: l,
      classNames: r,
      styles: i,
      unstyled: y,
      attributes: k
    }),
    [N, E] = eo({ value: n, defaultValue: t, finalValue: !1, onChange: h }),
    [o, f] = x.useState(!1),
    A = () => {
      (E(!1), f(!1), N && (u == null || u()));
    },
    L = () => {
      (E(!0), !N && (d == null || d()));
    },
    K = () => {
      N ? A() : L();
    },
    { openDropdown: $, closeDropdown: oe } = Me({
      open: L,
      close: A,
      closeDelay: p,
      openDelay: g
    }),
    te = ke => no('[data-menu-item]', '[data-menu-dropdown]', ke),
    { resolvedClassNames: Q, resolvedStyles: De } = Je({
      classNames: r,
      styles: i,
      props: l
    });
  return e.jsx(ro, {
    value: {
      getStyles: z,
      opened: N,
      toggleDropdown: K,
      getItemIndex: te,
      openedViaClick: o,
      setOpenedViaClick: f,
      closeOnItemClick: v,
      closeDropdown: m === 'click' ? A : oe,
      openDropdown: m === 'click' ? L : $,
      closeDropdownImmediately: A,
      loop: b,
      trigger: m,
      unstyled: y,
      menuItemTabIndex: T,
      withInitialFocusPlaceholder: w
    },
    children: e.jsx(G, {
      returnFocus: !0,
      ...O,
      opened: N,
      onChange: K,
      defaultOpened: t,
      trapFocus: C ? !1 : c,
      closeOnEscape: M,
      __staticSelector: 'Menu',
      classNames: Q,
      styles: De,
      unstyled: y,
      variant: D,
      keepMounted: C,
      children: a
    })
  });
}
j.extend = s => s;
j.withProps = _e(j);
j.classes = F;
j.displayName = '@mantine/core/Menu';
j.Item = de;
j.Label = ue;
j.Dropdown = ce;
j.Target = Se;
j.Divider = le;
j.Sub = q;
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const uo = [
    [
      'path',
      {
        d: 'M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2',
        key: 'svg-0'
      }
    ],
    [
      'path',
      { d: 'M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10', key: 'svg-1' }
    ],
    ['path', { d: 'M10 12l4 0', key: 'svg-2' }]
  ],
  mo = Z('outline', 'archive', 'Archive', uo);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const po = [
    ['path', { d: 'M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0', key: 'svg-0' }],
    ['path', { d: 'M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0', key: 'svg-1' }],
    ['path', { d: 'M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0', key: 'svg-2' }]
  ],
  ho = Z('outline', 'dots', 'Dots', po);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const go = [
    [
      'path',
      {
        d: 'M8 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8',
        key: 'svg-0'
      }
    ],
    [
      'path',
      {
        d: 'M16 16v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2',
        key: 'svg-1'
      }
    ]
  ],
  fo = Z('outline', 'layers-subtract', 'LayersSubtract', go);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xo = [
    ['path', { d: 'M3.5 5.5l1.5 1.5l2.5 -2.5', key: 'svg-0' }],
    ['path', { d: 'M3.5 11.5l1.5 1.5l2.5 -2.5', key: 'svg-1' }],
    ['path', { d: 'M3.5 17.5l1.5 1.5l2.5 -2.5', key: 'svg-2' }],
    ['path', { d: 'M11 6l9 0', key: 'svg-3' }],
    ['path', { d: 'M11 12l9 0', key: 'svg-4' }],
    ['path', { d: 'M11 18l9 0', key: 'svg-5' }]
  ],
  vo = Z('outline', 'list-check', 'ListCheck', xo),
  ie = 6,
  st = () => {
    const { themeConfig: s, organizationConfig: l } = ze(),
      [a, d] = x.useState(!1),
      [u, n] = x.useState(1),
      [t, c] = x.useState(''),
      [h, v] = x.useState(!1),
      [b, M] = x.useState(null),
      { data: m = [], isLoading: g } = $e(),
      p = Le(),
      r = Re('(max-width: 768px)'),
      i = x.useMemo(() => {
        if (!m.length)
          return { totalCourses: 0, totalModules: 0, totalTasks: 0 };
        const o = m.length,
          f = m.reduce((L, K) => {
            var $;
            return L + ((($ = K.modules) == null ? void 0 : $.length) || 0);
          }, 0),
          A = m.reduce((L, K) => {
            var $;
            return (
              L +
              ((($ = K.modules) == null
                ? void 0
                : $.reduce((oe, te) => {
                    var Q;
                    return (
                      oe + (((Q = te.tasks) == null ? void 0 : Q.length) || 0)
                    );
                  }, 0)) || 0)
            );
          }, 0);
        return { totalCourses: o, totalModules: f, totalTasks: A };
      }, [m]),
      y = x.useMemo(
        () =>
          m
            .filter(o => o.updatedAt)
            .sort(
              (o, f) =>
                new Date(f.updatedAt || '').getTime() -
                new Date(o.updatedAt || '').getTime()
            )
            .slice(0, 4)
            .map(o => ({
              id: o._id,
              title: o.courseName,
              thumbnail: o.thumbnail || '/public/course-thumbnail.png',
              type: 'Course'
            })),
        [m]
      ),
      D = x.useMemo(
        () => ({
          title: 'Content Writer Dashboard',
          banner: {
            headline: 'Craft Your Written Journey',
            tag: "The Creator's Playground",
            thumbnailBanner: '/public/contentwriter.jpg'
          }
        }),
        []
      ),
      I = x.useMemo(() => {
        if (!t.trim()) return m;
        const o = t.toLowerCase();
        return m.filter(f => {
          var A;
          return (
            f.courseName.toLowerCase().includes(o) ||
            ((A = f.courseDescription) == null
              ? void 0
              : A.toLowerCase().includes(o))
          );
        });
      }, [m, t]),
      { paginatedCourses: T, totalPages: C } = x.useMemo(() => {
        const o = (u - 1) * ie,
          f = o + ie,
          A = I.slice(o, f),
          L = Math.ceil(I.length / ie);
        return { paginatedCourses: A, totalPages: L };
      }, [I, u]),
      w = o => {
        console.log('Edit course:', o);
      },
      k = o => {
        (M(o), v(!0));
      },
      O = () => {
        (console.log('Delete course:', b), v(!1), M(null));
      },
      z = o => {
        console.log('Archive course:', o);
      },
      N = x.useCallback(() => {
        p(`${ne(l.organization_name)}/dashboard/add-course`);
      }, [p, l.organization_name]),
      E = ({ course: o }) =>
        e.jsxs(W, {
          shadow: 'xs',
          radius: 'md',
          p: 'md',
          withBorder: !0,
          onClick: () =>
            p(`${ne(l.organization_name)}/dashboard/course/${o._id}`),
          style: { position: 'relative', cursor: 'pointer' },
          children: [
            e.jsxs(j, {
              position: 'bottom-end',
              shadow: 'md',
              width: 160,
              children: [
                e.jsx(j.Target, {
                  children: e.jsx(re, {
                    variant: 'subtle',
                    onClick: f => f.stopPropagation(),
                    style: {
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      color: s.color
                    },
                    children: e.jsx(ho, { size: 18 })
                  })
                }),
                e.jsxs(j.Dropdown, {
                  children: [
                    e.jsx(j.Item, {
                      leftSection: e.jsx(oo, { size: 16 }),
                      onClick: f => {
                        (f.stopPropagation(), w(o._id));
                      },
                      color: s.button.color,
                      children: 'Edit'
                    }),
                    e.jsx(j.Item, {
                      leftSection: e.jsx(mo, { size: 16 }),
                      onClick: f => {
                        (f.stopPropagation(), z(o._id));
                      },
                      color: s.button.color,
                      children: 'Archive'
                    }),
                    e.jsx(j.Divider, { style: { borderColor: s.borderColor } }),
                    e.jsx(j.Item, {
                      color: 'red',
                      leftSection: e.jsx(to, { size: 16 }),
                      onClick: f => {
                        (f.stopPropagation(), k(o._id));
                      },
                      children: 'Delete'
                    })
                  ]
                })
              ]
            }),
            e.jsx(ae, {
              src: o.thumbnail || '/public/course-thumbnail.png',
              height: 140,
              radius: 'md',
              mb: 'sm'
            }),
            e.jsxs(P, {
              gap: 4,
              children: [
                e.jsx(_, {
                  fw: 600,
                  size: 'md',
                  lineClamp: 1,
                  children: o.courseName
                }),
                e.jsx(_, {
                  size: 'sm',
                  c: 'dimmed',
                  lineClamp: 2,
                  children: o.courseDescription
                    ? `${o.courseDescription.replace(/<[^>]*>/g, '').slice(0, 64)}...`
                    : 'No description available'
                }),
                e.jsx(so, {
                  color: 'blue',
                  mt: 'xs',
                  radius: 'sm',
                  variant: 'light',
                  children: o.status || 'N/A'
                })
              ]
            })
          ]
        });
    return g
      ? e.jsx(se, {
          h: 400,
          children: e.jsx(Be, { label: 'Loading content...' })
        })
      : a
        ? e.jsx(he, {
            size: 'xl',
            py: 'xl',
            children: e.jsxs(P, {
              gap: 'lg',
              children: [
                e.jsxs(U, {
                  justify: 'space-between',
                  align: 'center',
                  wrap: 'nowrap',
                  children: [
                    e.jsxs(U, {
                      gap: 'sm',
                      children: [
                        e.jsx(re, {
                          variant: 'subtle',
                          color: 'gray',
                          size: 'lg',
                          onClick: () => {
                            (d(!1), n(1), c(''));
                          },
                          children: e.jsx(Ke, { size: 20 })
                        }),
                        e.jsxs(V, {
                          order: 2,
                          children: ['All Courses (', I.length, ')']
                        })
                      ]
                    }),
                    e.jsx(H, {
                      leftSection: e.jsx(ge, { size: 16 }),
                      visibleFrom: 'sm',
                      onClick: N,
                      children: 'Create New Course'
                    })
                  ]
                }),
                e.jsx(W, {
                  shadow: 'sm',
                  p: 'md',
                  radius: 'md',
                  withBorder: !0,
                  children: e.jsx(Ue, {
                    placeholder: 'Search courses...',
                    leftSection: e.jsx(We, { size: 16 }),
                    rightSection:
                      t &&
                      e.jsx(re, {
                        variant: 'subtle',
                        onClick: () => c(''),
                        children: e.jsx(Ve, { size: 16 })
                      }),
                    value: t,
                    onChange: o => {
                      (c(o.target.value), n(1));
                    },
                    radius: 'md'
                  })
                }),
                e.jsx(X, {
                  cols: { base: 1, xs: 2, sm: 2, md: 3 },
                  spacing: 'lg',
                  children:
                    T.length > 0
                      ? T.map(o => e.jsx(E, { course: o }, o._id))
                      : e.jsx(se, {
                          style: { gridColumn: '1 / -1' },
                          py: 'xl',
                          children: e.jsx(_, {
                            size: 'sm',
                            c: 'dimmed',
                            children: t
                              ? 'No courses found matching your search.'
                              : 'No courses available.'
                          })
                        })
                }),
                C > 1 &&
                  e.jsx(se, {
                    mt: 'md',
                    children: e.jsx(Ge, {
                      value: u,
                      onChange: n,
                      total: C,
                      size: r ? 'sm' : 'md',
                      radius: 'md',
                      withEdges: !0
                    })
                  })
              ]
            })
          })
        : e.jsxs(he, {
            size: 'xl',
            py: 'xl',
            children: [
              e.jsxs(P, {
                mb: 'xl',
                gap: 4,
                children: [
                  e.jsx(V, { order: 1, children: D.title }),
                  e.jsx(_, {
                    c: 'dimmed',
                    children:
                      'Welcome to your dashboard! Here you can manage and track your content creation journey.'
                  })
                ]
              }),
              e.jsxs(X, {
                cols: { base: 1, lg: 2 },
                spacing: 'xl',
                children: [
                  e.jsxs(P, {
                    gap: 'lg',
                    children: [
                      e.jsx(W, {
                        shadow: 'sm',
                        p: 'xl',
                        radius: 'xl',
                        style: {
                          background:
                            'linear-gradient(90deg, #6366F1, #8B5CF6, #EC4899)',
                          color: 'white'
                        },
                        children: e.jsxs(U, {
                          justify: 'space-between',
                          align: 'center',
                          wrap: 'nowrap',
                          children: [
                            e.jsxs(P, {
                              gap: 6,
                              style: { flex: 1 },
                              children: [
                                e.jsx(V, {
                                  order: 2,
                                  fw: 700,
                                  children: D.banner.headline
                                }),
                                e.jsx(_, {
                                  size: 'sm',
                                  opacity: 0.85,
                                  children: D.banner.tag
                                })
                              ]
                            }),
                            !r &&
                              e.jsx(ae, {
                                src: D.banner.thumbnailBanner,
                                radius: 'md',
                                alt: 'Banner',
                                fit: 'contain',
                                style: { width: 150, height: 120 }
                              })
                          ]
                        })
                      }),
                      e.jsx(X, {
                        cols: 3,
                        spacing: 'md',
                        children: [
                          {
                            icon: e.jsx(qe, { size: 24, color: '#4F46E5' }),
                            label: 'Courses',
                            value: i.totalCourses,
                            color: 'indigo'
                          },
                          {
                            icon: e.jsx(fo, { size: 24, color: '#9333EA' }),
                            label: 'Modules',
                            value: i.totalModules,
                            color: 'purple'
                          },
                          {
                            icon: e.jsx(vo, { size: 24, color: '#EC4899' }),
                            label: 'Tasks',
                            value: i.totalTasks,
                            color: 'pink'
                          }
                        ].map((o, f) =>
                          e.jsx(
                            W,
                            {
                              shadow: 'sm',
                              p: 'md',
                              radius: 'md',
                              withBorder: !0,
                              style: { textAlign: 'center' },
                              children: e.jsxs(P, {
                                align: 'center',
                                gap: 8,
                                children: [
                                  e.jsx(He, {
                                    size: 48,
                                    radius: 'xl',
                                    color: o.color,
                                    variant: 'light',
                                    children: o.icon
                                  }),
                                  e.jsx(_, {
                                    size: 'xs',
                                    c: 'dimmed',
                                    children: o.label
                                  }),
                                  e.jsx(V, { order: 3, children: o.value })
                                ]
                              })
                            },
                            f
                          )
                        )
                      }),
                      e.jsxs(W, {
                        shadow: 'sm',
                        p: 'lg',
                        radius: 'md',
                        withBorder: !0,
                        children: [
                          e.jsx(V, {
                            order: 5,
                            mb: 'sm',
                            children: 'Recent Activity'
                          }),
                          e.jsx(Qe, { mb: 'sm' }),
                          e.jsx(P, {
                            gap: 'sm',
                            children:
                              y.length > 0
                                ? y.map(o =>
                                    e.jsxs(
                                      U,
                                      {
                                        p: 'xs',
                                        onClick: () =>
                                          p(
                                            `${ne(l.organization_name)}/dashboard/course/${o.id}`
                                          ),
                                        style: {
                                          borderRadius: 8,
                                          cursor: 'pointer',
                                          backgroundColor: 'rgba(0,0,0,0.02)'
                                        },
                                        children: [
                                          e.jsx(ae, {
                                            src: o.thumbnail,
                                            width: 40,
                                            height: 40,
                                            radius: 'sm'
                                          }),
                                          e.jsxs(P, {
                                            gap: 0,
                                            style: { flex: 1 },
                                            children: [
                                              e.jsx(_, {
                                                size: 'sm',
                                                fw: 500,
                                                lineClamp: 1,
                                                children: o.title
                                              }),
                                              e.jsx(_, {
                                                size: 'xs',
                                                c: 'dimmed',
                                                children: o.type
                                              })
                                            ]
                                          })
                                        ]
                                      },
                                      o.id
                                    )
                                  )
                                : e.jsx(_, {
                                    size: 'sm',
                                    c: 'dimmed',
                                    children: 'No recent updates found.'
                                  })
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsxs(P, {
                    gap: 'lg',
                    children: [
                      e.jsxs(U, {
                        justify: 'space-between',
                        children: [
                          e.jsx(V, { order: 3, children: 'Content Pipeline' }),
                          e.jsx(H, {
                            leftSection: e.jsx(ge, { size: 16 }),
                            onClick: N,
                            children: 'New Course'
                          })
                        ]
                      }),
                      e.jsxs(W, {
                        shadow: 'sm',
                        p: 'lg',
                        radius: 'md',
                        withBorder: !0,
                        children: [
                          e.jsx(Fe, {
                            h: 600,
                            offsetScrollbars: !0,
                            children: e.jsx(X, {
                              cols: r ? 1 : 2,
                              spacing: 'lg',
                              children: m
                                .slice(0, 4)
                                .map(o => e.jsx(E, { course: o }, o._id))
                            })
                          }),
                          e.jsx(H, {
                            mt: 'md',
                            fullWidth: !0,
                            variant: 'outline',
                            onClick: () => d(!0),
                            children: 'Show All Courses'
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              e.jsx(Oe, {
                opened: h,
                onClose: () => v(!1),
                title: 'Delete Course',
                centered: !0,
                children: e.jsxs(P, {
                  gap: 'md',
                  children: [
                    e.jsx(_, {
                      children:
                        'Are you sure you want to delete this course? This action cannot be undone.'
                    }),
                    e.jsxs(U, {
                      justify: 'flex-end',
                      children: [
                        e.jsx(H, {
                          variant: 'default',
                          onClick: () => v(!1),
                          children: 'Cancel'
                        }),
                        e.jsx(H, {
                          color: 'red',
                          onClick: O,
                          children: 'Delete'
                        })
                      ]
                    })
                  ]
                })
              })
            ]
          });
  };
export { st as default };
