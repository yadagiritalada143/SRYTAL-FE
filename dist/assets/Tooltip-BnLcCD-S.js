import {
  e as c,
  k as ue,
  ap as fe,
  a_ as Fe,
  f as me,
  u as U,
  X as je,
  a as he,
  h as ve,
  ab as ye,
  j as r,
  af as ee,
  B as oe,
  aw as ge,
  c as we,
  b as Oe,
  a1 as xe,
  F as Ce,
  i as Ne,
  aj as Ge,
  l as Se,
  m as Ie,
  n as ke,
  a$ as Le,
  o as ze,
  p as Ae,
  ak as Be,
  am as Xe,
  ao as ie,
  ar as Ye,
  aq as W,
  au as $e,
  Y as le,
  ah as Ue
} from './index-Cn_-nzwF.js';
import { g as Pe, a as qe, F as pe } from './get-floating-position-TyKNLeXJ.js';
import { g as He } from './get-style-object-DUJZA7T_.js';
const _e = { duration: 100, transition: 'fade' };
function ce(e, o) {
  return { ..._e, ...o, ...e };
}
var q = { tooltip: 'm_1b3c8819', arrow: 'm_f898399f' };
function Ve({ offset: e, position: o, defaultOpened: t }) {
  const [i, d] = c.useState(t),
    u = c.useRef(null),
    {
      x: l,
      y: M,
      elements: x,
      refs: f,
      update: s,
      placement: P
    } = ue({
      placement: o,
      middleware: [fe({ crossAxis: !0, padding: 5, rootBoundary: 'document' })]
    }),
    y = P.includes('right') ? e : o.includes('left') ? e * -1 : 0,
    O = P.includes('bottom') ? e : o.includes('top') ? e * -1 : 0,
    g = c.useCallback(
      ({ clientX: p, clientY: a }) => {
        f.setPositionReference({
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: p,
              y: a,
              left: p + y,
              top: a + O,
              right: p,
              bottom: a
            };
          }
        });
      },
      [x.reference]
    );
  return (
    c.useEffect(() => {
      if (f.floating.current) {
        const p = u.current;
        p.addEventListener('mousemove', g);
        const a = Fe(f.floating.current);
        return (
          a.forEach(w => {
            w.addEventListener('scroll', s);
          }),
          () => {
            (p.removeEventListener('mousemove', g),
              a.forEach(w => {
                w.removeEventListener('scroll', s);
              }));
          }
        );
      }
    }, [x.reference, f.floating.current, s, g, i]),
    {
      handleMouseMove: g,
      x: l,
      y: M,
      opened: i,
      setOpened: d,
      boundaryRef: u,
      floating: f.setFloating
    }
  );
}
const Ze = {
    refProp: 'ref',
    withinPortal: !0,
    offset: 10,
    position: 'right',
    zIndex: ge('popover')
  },
  Je = we((e, { radius: o, color: t }) => ({
    tooltip: {
      '--tooltip-radius': o === void 0 ? void 0 : xe(o),
      '--tooltip-bg': t ? Oe(t, e) : void 0,
      '--tooltip-color': t ? 'var(--mantine-color-white)' : void 0
    }
  })),
  te = me((e, o) => {
    const t = U('TooltipFloating', Ze, e),
      {
        children: i,
        refProp: d,
        withinPortal: u,
        style: l,
        className: M,
        classNames: x,
        styles: f,
        unstyled: s,
        radius: P,
        color: y,
        label: O,
        offset: g,
        position: p,
        multiline: a,
        zIndex: w,
        disabled: S,
        defaultOpened: C,
        variant: D,
        vars: b,
        portalProps: T,
        attributes: E,
        ...h
      } = t,
      I = je(),
      L = he({
        name: 'TooltipFloating',
        props: t,
        classes: q,
        className: M,
        style: l,
        classNames: x,
        styles: f,
        unstyled: s,
        attributes: E,
        rootSelector: 'tooltip',
        vars: b,
        varsResolver: Je
      }),
      {
        handleMouseMove: z,
        x: A,
        y: k,
        opened: B,
        boundaryRef: _,
        floating: V,
        setOpened: X
      } = Ve({ offset: g, position: p, defaultOpened: C }),
      N = ve(i);
    if (!N)
      throw new Error(
        '[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported'
      );
    const Z = ye(_, Pe(N), o),
      v = N.props,
      Y = F => {
        var R;
        ((R = v.onMouseEnter) == null || R.call(v, F), z(F), X(!0));
      },
      J = F => {
        var R;
        ((R = v.onMouseLeave) == null || R.call(v, F), X(!1));
      };
    return r.jsxs(r.Fragment, {
      children: [
        r.jsx(ee, {
          ...T,
          withinPortal: u,
          children: r.jsx(oe, {
            ...h,
            ...L('tooltip', {
              style: {
                ...He(l, I),
                zIndex: w,
                display: !S && B ? 'block' : 'none',
                top: (k && Math.round(k)) ?? '',
                left: (A && Math.round(A)) ?? ''
              }
            }),
            variant: D,
            ref: V,
            mod: { multiline: a },
            children: O
          })
        }),
        c.cloneElement(N, { ...v, [d]: Z, onMouseEnter: Y, onMouseLeave: J })
      ]
    });
  });
te.classes = q;
te.displayName = '@mantine/core/TooltipFloating';
const be = c.createContext(!1),
  Ke = be.Provider,
  Qe = () => c.useContext(be),
  We = { openDelay: 0, closeDelay: 0 };
function ne(e) {
  const { openDelay: o, closeDelay: t, children: i } = U('TooltipGroup', We, e);
  return r.jsx(Ke, {
    value: !0,
    children: r.jsx(Ce, { delay: { open: o, close: t }, children: i })
  });
}
ne.displayName = '@mantine/core/TooltipGroup';
ne.extend = e => e;
function eo(e) {
  if (e === void 0) return { shift: !0, flip: !0 };
  const o = { ...e };
  return (
    e.shift === void 0 && (o.shift = !0),
    e.flip === void 0 && (o.flip = !0),
    o
  );
}
function oo(e) {
  const o = eo(e.middlewares),
    t = [Xe(e.offset)];
  return (
    o.shift &&
      t.push(
        fe(
          typeof o.shift == 'boolean'
            ? { padding: 8 }
            : { padding: 8, ...o.shift }
        )
      ),
    o.flip && t.push(typeof o.flip == 'boolean' ? ie() : ie(o.flip)),
    t.push(Ye({ element: e.arrowRef, padding: e.arrowOffset })),
    o.inline
      ? t.push(typeof o.inline == 'boolean' ? W() : W(o.inline))
      : e.inline && t.push(W()),
    t
  );
}
function to(e) {
  var b, T, E;
  const [o, t] = c.useState(e.defaultOpened),
    d = typeof e.opened == 'boolean' ? e.opened : o,
    u = Qe(),
    l = Ne(),
    M = c.useCallback(
      h => {
        (t(h), h && w(l));
      },
      [l]
    ),
    {
      x,
      y: f,
      context: s,
      refs: P,
      placement: y,
      middlewareData: { arrow: { x: O, y: g } = {} }
    } = ue({
      strategy: e.strategy,
      placement: e.position,
      open: d,
      onOpenChange: M,
      middleware: oo(e),
      whileElementsMounted: Ge
    }),
    { delay: p, currentId: a, setCurrentId: w } = Se(s, { id: l }),
    { getReferenceProps: S, getFloatingProps: C } = Ie([
      ke(s, {
        enabled: (b = e.events) == null ? void 0 : b.hover,
        delay: u ? p : { open: e.openDelay, close: e.closeDelay },
        mouseOnly: !((T = e.events) != null && T.touch)
      }),
      Le(s, {
        enabled: (E = e.events) == null ? void 0 : E.focus,
        visibleOnly: !0
      }),
      ze(s, { role: 'tooltip' }),
      Ae(s, { enabled: typeof e.opened > 'u' })
    ]);
  Be(() => {
    var h;
    (h = e.onPositionChange) == null || h.call(e, y);
  }, [y]);
  const D = d && a && a !== l;
  return {
    x,
    y: f,
    arrowX: O,
    arrowY: g,
    reference: P.setReference,
    floating: P.setFloating,
    getFloatingProps: C,
    getReferenceProps: S,
    isGroupPhase: D,
    opened: d,
    placement: y
  };
}
const de = {
    position: 'top',
    refProp: 'ref',
    withinPortal: !0,
    arrowSize: 4,
    arrowOffset: 5,
    arrowRadius: 0,
    arrowPosition: 'side',
    offset: 5,
    transitionProps: { duration: 100, transition: 'fade' },
    events: { hover: !0, focus: !1, touch: !1 },
    zIndex: ge('popover'),
    positionDependencies: [],
    middlewares: { flip: !0, shift: !0, inline: !1 }
  },
  no = we((e, { radius: o, color: t, variant: i, autoContrast: d }) => {
    const u = e.variantColorResolver({
      theme: e,
      color: t || e.primaryColor,
      autoContrast: d,
      variant: i || 'filled'
    });
    return {
      tooltip: {
        '--tooltip-radius': o === void 0 ? void 0 : xe(o),
        '--tooltip-bg': t ? u.background : void 0,
        '--tooltip-color': t ? u.color : void 0
      }
    };
  }),
  H = me((e, o) => {
    const t = U('Tooltip', de, e),
      {
        children: i,
        position: d,
        refProp: u,
        label: l,
        openDelay: M,
        closeDelay: x,
        onPositionChange: f,
        opened: s,
        defaultOpened: P,
        withinPortal: y,
        radius: O,
        color: g,
        classNames: p,
        styles: a,
        unstyled: w,
        style: S,
        className: C,
        withArrow: D,
        arrowSize: b,
        arrowOffset: T,
        arrowRadius: E,
        arrowPosition: h,
        offset: I,
        transitionProps: L,
        multiline: z,
        events: A,
        zIndex: k,
        disabled: B,
        positionDependencies: _,
        onClick: V,
        onMouseEnter: X,
        onMouseLeave: N,
        inline: Z,
        variant: v,
        keepMounted: Y,
        vars: J,
        portalProps: F,
        mod: R,
        floatingStrategy: K,
        middlewares: Te,
        autoContrast: ro,
        attributes: Re,
        target: m,
        ...re
      } = U('Tooltip', de, t),
      { dir: Me } = $e(),
      Q = c.useRef(null),
      n = to({
        position: qe(Me, d),
        closeDelay: x,
        openDelay: M,
        onPositionChange: f,
        opened: s,
        defaultOpened: P,
        events: A,
        arrowRef: Q,
        arrowOffset: T,
        offset: typeof I == 'number' ? I + (D ? b / 2 : 0) : I,
        positionDependencies: [..._, m ?? i],
        inline: Z,
        strategy: K,
        middlewares: Te
      });
    c.useEffect(() => {
      const j =
        m instanceof HTMLElement
          ? m
          : typeof m == 'string'
            ? document.querySelector(m)
            : (m == null ? void 0 : m.current) || null;
      j && n.reference(j);
    }, [m, n]);
    const G = he({
        name: 'Tooltip',
        props: t,
        classes: q,
        className: C,
        style: S,
        classNames: p,
        styles: a,
        unstyled: w,
        attributes: Re,
        rootSelector: 'tooltip',
        vars: J,
        varsResolver: no
      }),
      $ = ve(i);
    if (!m && !$)
      throw new Error(
        '[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported'
      );
    if (m) {
      const j = ce(L, { duration: 100, transition: 'fade' });
      return r.jsx(r.Fragment, {
        children: r.jsx(ee, {
          ...F,
          withinPortal: y,
          children: r.jsx(le, {
            ...j,
            keepMounted: Y,
            mounted: !B && !!n.opened,
            duration: n.isGroupPhase ? 10 : j.duration,
            children: Ee =>
              r.jsxs(oe, {
                ...re,
                'data-fixed': K === 'fixed' || void 0,
                variant: v,
                mod: [{ multiline: z }, R],
                ...n.getFloatingProps({
                  ref: n.floating,
                  className: G('tooltip').className,
                  style: {
                    ...G('tooltip').style,
                    ...Ee,
                    zIndex: k,
                    top: n.y ?? 0,
                    left: n.x ?? 0
                  }
                }),
                children: [
                  l,
                  r.jsx(pe, {
                    ref: Q,
                    arrowX: n.arrowX,
                    arrowY: n.arrowY,
                    visible: D,
                    position: n.placement,
                    arrowSize: b,
                    arrowOffset: T,
                    arrowRadius: E,
                    arrowPosition: h,
                    ...G('arrow')
                  })
                ]
              })
          })
        })
      });
    }
    const se = $.props,
      De = ye(n.reference, Pe($), o),
      ae = ce(L, { duration: 100, transition: 'fade' });
    return r.jsxs(r.Fragment, {
      children: [
        r.jsx(ee, {
          ...F,
          withinPortal: y,
          children: r.jsx(le, {
            ...ae,
            keepMounted: Y,
            mounted: !B && !!n.opened,
            duration: n.isGroupPhase ? 10 : ae.duration,
            children: j =>
              r.jsxs(oe, {
                ...re,
                'data-fixed': K === 'fixed' || void 0,
                variant: v,
                mod: [{ multiline: z }, R],
                ...n.getFloatingProps({
                  ref: n.floating,
                  className: G('tooltip').className,
                  style: {
                    ...G('tooltip').style,
                    ...j,
                    zIndex: k,
                    top: n.y ?? 0,
                    left: n.x ?? 0
                  }
                }),
                children: [
                  l,
                  r.jsx(pe, {
                    ref: Q,
                    arrowX: n.arrowX,
                    arrowY: n.arrowY,
                    visible: D,
                    position: n.placement,
                    arrowSize: b,
                    arrowOffset: T,
                    arrowRadius: E,
                    arrowPosition: h,
                    ...G('arrow')
                  })
                ]
              })
          })
        }),
        c.cloneElement(
          $,
          n.getReferenceProps({
            onClick: V,
            onMouseEnter: X,
            onMouseLeave: N,
            onMouseMove: t.onMouseMove,
            onPointerDown: t.onPointerDown,
            onPointerEnter: t.onPointerEnter,
            ...se,
            className: Ue(C, se.className),
            [u]: De
          })
        )
      ]
    });
  });
H.classes = q;
H.displayName = '@mantine/core/Tooltip';
H.Floating = te;
H.Group = ne;
export { H as T };
