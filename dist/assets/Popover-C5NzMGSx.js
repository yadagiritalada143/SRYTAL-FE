import {
  e as f,
  d as $e,
  f as te,
  u as N,
  ae as Le,
  ab as oe,
  j as h,
  af as re,
  Y as ne,
  ag as He,
  B as Ke,
  r as Ue,
  h as We,
  ah as Ye,
  ai as ae,
  k as Xe,
  aj as Z,
  ak as G,
  al as Be,
  am as qe,
  an as Ze,
  ao as J,
  ap as Ge,
  aq as Q,
  ar as Je,
  as as Qe,
  at as ee,
  a as et,
  au as tt,
  i as ot,
  av as rt,
  aw as nt,
  c as at,
  ax as st,
  a1 as it
} from './index-Cn_-nzwF.js';
import { a as lt } from './Input-kzRYOXAd.js';
import { F as dt, g as ct, a as ut } from './get-floating-position-TyKNLeXJ.js';
import { u as ft } from './use-uncontrolled-C8lBt68W.js';
const pt = () => {};
function gt(e, s = { active: !0 }) {
  return typeof e != 'function' || !s.active
    ? s.onKeyDown || pt
    : n => {
        var r;
        n.key === 'Escape' && (e(n), (r = s.onTrigger) == null || r.call(s));
      };
}
const wt = ['mousedown', 'touchstart'];
function ht(e, s, n) {
  const r = f.useRef(null),
    l = s || wt;
  return (
    f.useEffect(() => {
      const g = i => {
        const { target: a } = i ?? {};
        if (Array.isArray(n)) {
          const o =
            !document.body.contains(a) &&
            (a == null ? void 0 : a.tagName) !== 'HTML';
          n.every(d => !!d && !i.composedPath().includes(d)) && !o && e(i);
        } else r.current && !r.current.contains(a) && e(i);
      };
      return (
        l.forEach(i => document.addEventListener(i, g)),
        () => {
          l.forEach(i => document.removeEventListener(i, g));
        }
      );
    }, [r, e, n]),
    r
  );
}
const [mt, se] = $e('Popover component was not found in the tree');
var ie = { dropdown: 'm_38a85659', arrow: 'm_a31dc6c1', overlay: 'm_3d7bc908' };
const z = te((e, s) => {
  var O, E, y, v;
  const n = N('PopoverDropdown', null, e),
    {
      className: r,
      style: l,
      vars: g,
      children: i,
      onKeyDownCapture: a,
      variant: o,
      classNames: u,
      styles: d,
      ...w
    } = n,
    t = se(),
    C = Le({ opened: t.opened, shouldReturnFocus: t.returnFocus }),
    R = t.withRoles
      ? {
          'aria-labelledby': t.getTargetId(),
          id: t.getDropdownId(),
          role: 'dialog',
          tabIndex: -1
        }
      : {},
    D = oe(s, t.floating);
  return t.disabled
    ? null
    : h.jsx(re, {
        ...t.portalProps,
        withinPortal: t.withinPortal,
        children: h.jsx(ne, {
          mounted: t.opened,
          ...t.transitionProps,
          transition:
            ((O = t.transitionProps) == null ? void 0 : O.transition) || 'fade',
          duration:
            ((E = t.transitionProps) == null ? void 0 : E.duration) ?? 150,
          keepMounted: t.keepMounted,
          exitDuration:
            typeof ((y = t.transitionProps) == null
              ? void 0
              : y.exitDuration) == 'number'
              ? t.transitionProps.exitDuration
              : (v = t.transitionProps) == null
                ? void 0
                : v.duration,
          children: x =>
            h.jsx(He, {
              active: t.trapFocus && t.opened,
              innerRef: D,
              children: h.jsxs(Ke, {
                ...R,
                ...w,
                variant: o,
                onKeyDownCapture: gt(
                  () => {
                    var S, P;
                    ((S = t.onClose) == null || S.call(t),
                      (P = t.onDismiss) == null || P.call(t));
                  },
                  { active: t.closeOnEscape, onTrigger: C, onKeyDown: a }
                ),
                'data-position': t.placement,
                'data-fixed': t.floatingStrategy === 'fixed' || void 0,
                ...t.getStyles('dropdown', {
                  className: r,
                  props: n,
                  classNames: u,
                  styles: d,
                  style: [
                    {
                      ...x,
                      zIndex: t.zIndex,
                      top: t.y ?? 0,
                      left: t.x ?? 0,
                      width: t.width === 'target' ? void 0 : Ue(t.width),
                      ...(t.referenceHidden ? { display: 'none' } : null)
                    },
                    t.resolvedStyles.dropdown,
                    d == null ? void 0 : d.dropdown,
                    l
                  ]
                }),
                children: [
                  i,
                  h.jsx(dt, {
                    ref: t.arrowRef,
                    arrowX: t.arrowX,
                    arrowY: t.arrowY,
                    visible: t.withArrow,
                    position: t.placement,
                    arrowSize: t.arrowSize,
                    arrowRadius: t.arrowRadius,
                    arrowOffset: t.arrowOffset,
                    arrowPosition: t.arrowPosition,
                    ...t.getStyles('arrow', {
                      props: n,
                      classNames: u,
                      styles: d
                    })
                  })
                ]
              })
            })
        })
      });
});
z.classes = ie;
z.displayName = '@mantine/core/PopoverDropdown';
const vt = { refProp: 'ref', popupType: 'dialog' },
  le = te((e, s) => {
    const {
        children: n,
        refProp: r,
        popupType: l,
        ...g
      } = N('PopoverTarget', vt, e),
      i = We(n);
    if (!i)
      throw new Error(
        'Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
      );
    const a = g,
      o = se(),
      u = oe(o.reference, ct(i), s),
      d = o.withRoles
        ? {
            'aria-haspopup': l,
            'aria-expanded': o.opened,
            'aria-controls': o.opened ? o.getDropdownId() : void 0,
            id: o.getTargetId()
          }
        : {},
      w = i.props;
    return f.cloneElement(i, {
      ...a,
      ...d,
      ...o.targetProps,
      className: Ye(o.targetProps.className, a.className, w.className),
      [r]: u,
      ...(o.controlled
        ? null
        : {
            onClick: () => {
              var t;
              (o.onToggle(), (t = w.onClick) == null || t.call(w));
            }
          })
    });
  });
le.displayName = '@mantine/core/PopoverTarget';
function yt(e) {
  if (e === void 0) return { shift: !0, flip: !0 };
  const s = { ...e };
  return (
    e.shift === void 0 && (s.shift = !0),
    e.flip === void 0 && (s.flip = !0),
    s
  );
}
function xt(e, s, n) {
  const r = yt(e.middlewares),
    l = [qe(e.offset), Ze()];
  return (
    e.dropdownVisible &&
      n !== 'test' &&
      e.preventPositionChangeWhenVisible &&
      (r.flip = !1),
    r.flip && l.push(typeof r.flip == 'boolean' ? J() : J(r.flip)),
    r.shift &&
      l.push(
        Ge(
          typeof r.shift == 'boolean'
            ? { limiter: ee(), padding: 5 }
            : { limiter: ee(), padding: 5, ...r.shift }
        )
      ),
    r.inline && l.push(typeof r.inline == 'boolean' ? Q() : Q(r.inline)),
    l.push(Je({ element: e.arrowRef, padding: e.arrowOffset })),
    (r.size || e.width === 'target') &&
      l.push(
        Qe({
          ...(typeof r.size == 'boolean' ? {} : r.size),
          apply({ rects: g, availableWidth: i, availableHeight: a, ...o }) {
            var w;
            const d =
              ((w = s().refs.floating.current) == null ? void 0 : w.style) ??
              {};
            (r.size &&
              (typeof r.size == 'object' && r.size.apply
                ? r.size.apply({
                    rects: g,
                    availableWidth: i,
                    availableHeight: a,
                    ...o
                  })
                : Object.assign(d, {
                    maxWidth: `${i}px`,
                    maxHeight: `${a}px`
                  })),
              e.width === 'target' &&
                Object.assign(d, { width: `${g.reference.width}px` }));
          }
        })
      ),
    l
  );
}
function Pt(e) {
  const s = ae(),
    [n, r] = ft({
      value: e.opened,
      defaultValue: e.defaultOpened,
      finalValue: !1,
      onChange: e.onChange
    }),
    l = f.useRef(n),
    g = () => {
      n && !e.disabled && r(!1);
    },
    i = () => {
      e.disabled || r(!n);
    },
    a = Xe({
      strategy: e.strategy,
      placement: e.preventPositionChangeWhenVisible
        ? e.positionRef.current
        : e.position,
      middleware: xt(e, () => a, s),
      whileElementsMounted: e.keepMounted ? void 0 : Z
    });
  return (
    f.useEffect(() => {
      if (!(!a.refs.reference.current || !a.refs.floating.current) && n)
        return Z(a.refs.reference.current, a.refs.floating.current, a.update);
    }, [n, a.update]),
    G(() => {
      var o;
      ((o = e.onPositionChange) == null || o.call(e, a.placement),
        (e.positionRef.current = a.placement));
    }, [a.placement, e.preventPositionChangeWhenVisible]),
    G(() => {
      var o, u;
      (n !== l.current &&
        (n
          ? (u = e.onOpen) == null || u.call(e)
          : (o = e.onClose) == null || o.call(e)),
        (l.current = n));
    }, [n, e.onClose, e.onOpen]),
    Be(() => {
      let o = -1;
      return (
        n && (o = window.setTimeout(() => e.setDropdownVisible(!0), 4)),
        () => {
          window.clearTimeout(o);
        }
      );
    }, [n, e.position]),
    {
      floating: a,
      controlled: typeof e.opened == 'boolean',
      opened: n,
      onClose: g,
      onToggle: i
    }
  );
}
const bt = {
    position: 'bottom',
    offset: 8,
    positionDependencies: [],
    transitionProps: { transition: 'fade', duration: 150 },
    middlewares: { flip: !0, shift: !0, inline: !1 },
    arrowSize: 7,
    arrowOffset: 5,
    arrowRadius: 0,
    arrowPosition: 'side',
    closeOnClickOutside: !0,
    withinPortal: !0,
    closeOnEscape: !0,
    trapFocus: !1,
    withRoles: !0,
    returnFocus: !1,
    withOverlay: !1,
    hideDetached: !0,
    clickOutsideEvents: ['mousedown', 'touchstart'],
    zIndex: nt('popover'),
    __staticSelector: 'Popover',
    width: 'max-content'
  },
  Ct = at((e, { radius: s, shadow: n }) => ({
    dropdown: {
      '--popover-radius': s === void 0 ? void 0 : it(s),
      '--popover-shadow': st(n)
    }
  }));
function T(e) {
  var K, U, W, Y, X, B, q;
  const s = N('Popover', bt, e),
    {
      children: n,
      position: r,
      offset: l,
      onPositionChange: g,
      positionDependencies: i,
      opened: a,
      transitionProps: o,
      onExitTransitionEnd: u,
      onEnterTransitionEnd: d,
      width: w,
      middlewares: t,
      withArrow: C,
      arrowSize: R,
      arrowOffset: D,
      arrowRadius: O,
      arrowPosition: E,
      unstyled: y,
      classNames: v,
      styles: x,
      closeOnClickOutside: S,
      withinPortal: P,
      portalProps: de,
      closeOnEscape: ce,
      clickOutsideEvents: ue,
      trapFocus: fe,
      onClose: pe,
      onDismiss: b,
      onOpen: ge,
      onChange: we,
      zIndex: he,
      radius: me,
      shadow: ve,
      id: ye,
      defaultOpened: j,
      __staticSelector: k,
      withRoles: xe,
      disabled: I,
      returnFocus: Pe,
      variant: be,
      keepMounted: V,
      vars: Ce,
      floatingStrategy: M,
      withOverlay: Re,
      overlayProps: m,
      hideDetached: De,
      attributes: Oe,
      preventPositionChangeWhenVisible: F,
      ...Ee
    } = s,
    _ = et({
      name: k,
      props: s,
      classes: ie,
      classNames: v,
      styles: x,
      unstyled: y,
      attributes: Oe,
      rootSelector: 'dropdown',
      vars: Ce,
      varsResolver: Ct
    }),
    { resolvedStyles: Se } = lt({ classNames: v, styles: x, props: s }),
    [Te, A] = f.useState(a ?? j ?? !1),
    $ = f.useRef(r),
    L = f.useRef(null),
    [Fe, Ne] = f.useState(null),
    [ze, je] = f.useState(null),
    { dir: ke } = tt(),
    Ie = ae(),
    H = ot(ye),
    c = Pt({
      middlewares: t,
      width: w,
      position: ut(ke, r),
      offset: typeof l == 'number' ? l + (C ? R / 2 : 0) : l,
      arrowRef: L,
      arrowOffset: D,
      onPositionChange: g,
      positionDependencies: i,
      opened: a,
      defaultOpened: j,
      onChange: we,
      onOpen: ge,
      onClose: pe,
      onDismiss: b,
      strategy: M,
      dropdownVisible: Te,
      setDropdownVisible: A,
      positionRef: $,
      disabled: I,
      preventPositionChangeWhenVisible: F,
      keepMounted: V
    });
  ht(
    () => {
      S && (c.onClose(), b == null || b());
    },
    ue,
    [Fe, ze]
  );
  const Ve = f.useCallback(
      p => {
        (Ne(p), c.floating.refs.setReference(p));
      },
      [c.floating.refs.setReference]
    ),
    Me = f.useCallback(
      p => {
        (je(p), c.floating.refs.setFloating(p));
      },
      [c.floating.refs.setFloating]
    ),
    _e = f.useCallback(() => {
      var p;
      ((p = o == null ? void 0 : o.onExited) == null || p.call(o),
        u == null || u(),
        A(!1),
        F || ($.current = r));
    }, [o == null ? void 0 : o.onExited, u, F, r]),
    Ae = f.useCallback(() => {
      var p;
      ((p = o == null ? void 0 : o.onEntered) == null || p.call(o),
        d == null || d());
    }, [o == null ? void 0 : o.onEntered, d]);
  return h.jsxs(mt, {
    value: {
      returnFocus: Pe,
      disabled: I,
      controlled: c.controlled,
      reference: Ve,
      floating: Me,
      x: c.floating.x,
      y: c.floating.y,
      arrowX:
        (W =
          (U = (K = c.floating) == null ? void 0 : K.middlewareData) == null
            ? void 0
            : U.arrow) == null
          ? void 0
          : W.x,
      arrowY:
        (B =
          (X = (Y = c.floating) == null ? void 0 : Y.middlewareData) == null
            ? void 0
            : X.arrow) == null
          ? void 0
          : B.y,
      opened: c.opened,
      arrowRef: L,
      transitionProps: { ...o, onExited: _e, onEntered: Ae },
      width: w,
      withArrow: C,
      arrowSize: R,
      arrowOffset: D,
      arrowRadius: O,
      arrowPosition: E,
      placement: c.floating.placement,
      trapFocus: fe,
      withinPortal: P,
      portalProps: de,
      zIndex: he,
      radius: me,
      shadow: ve,
      closeOnEscape: ce,
      onDismiss: b,
      onClose: c.onClose,
      onToggle: c.onToggle,
      getTargetId: () => `${H}-target`,
      getDropdownId: () => `${H}-dropdown`,
      withRoles: xe,
      targetProps: Ee,
      __staticSelector: k,
      classNames: v,
      styles: x,
      unstyled: y,
      variant: be,
      keepMounted: V,
      getStyles: _,
      resolvedStyles: Se,
      floatingStrategy: M,
      referenceHidden:
        De && Ie !== 'test'
          ? (q = c.floating.middlewareData.hide) == null
            ? void 0
            : q.referenceHidden
          : !1
    },
    children: [
      n,
      Re &&
        h.jsx(ne, {
          transition: 'fade',
          mounted: c.opened,
          duration: (o == null ? void 0 : o.duration) || 250,
          exitDuration: (o == null ? void 0 : o.exitDuration) || 250,
          children: p =>
            h.jsx(re, {
              withinPortal: P,
              children: h.jsx(rt, {
                ...m,
                ..._('overlay', {
                  className: m == null ? void 0 : m.className,
                  style: [p, m == null ? void 0 : m.style]
                })
              })
            })
        })
    ]
  });
}
T.Target = le;
T.Dropdown = z;
T.displayName = '@mantine/core/Popover';
T.extend = e => e;
export { T as P, pt as n, ht as u };
