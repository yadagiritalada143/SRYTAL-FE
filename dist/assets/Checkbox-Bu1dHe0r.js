import {
  e as R,
  a as w,
  j as r,
  B as S,
  g as A,
  a0 as ue,
  a9 as be,
  f as B,
  u as F,
  U as pe,
  c as E,
  a1 as U,
  b0 as K,
  b as $,
  a2 as L,
  ac as he,
  i as me
} from './index-Cn_-nzwF.js';
import { g as M } from './get-auto-contrast-value-Da6zqqWm.js';
import { I as z, u as xe } from './Input-kzRYOXAd.js';
import { u as Q } from './use-uncontrolled-C8lBt68W.js';
import { a as X } from './CheckIcon-CpIg4BN2.js';
var Y = {
  root: 'm_5f75b09e',
  body: 'm_5f6e695e',
  labelWrapper: 'm_d3ea56bb',
  label: 'm_8ee546b8',
  description: 'm_328f68c0',
  error: 'm_8e8a99cc'
};
const Ce = Y,
  Z = R.forwardRef(
    (
      {
        __staticSelector: e,
        __stylesApiProps: a,
        className: o,
        classNames: n,
        styles: c,
        unstyled: l,
        children: t,
        label: s,
        description: i,
        id: f,
        disabled: h,
        error: b,
        size: p,
        labelPosition: y = 'left',
        bodyElement: C = 'div',
        labelElement: d = 'label',
        variant: k,
        style: g,
        vars: P,
        mod: v,
        attributes: j,
        ...u
      },
      _
    ) => {
      const m = w({
        name: e,
        props: a,
        className: o,
        style: g,
        classes: Y,
        classNames: n,
        styles: c,
        unstyled: l,
        attributes: j
      });
      return r.jsx(S, {
        ...m('root'),
        ref: _,
        __vars: { '--label-fz': ue(p), '--label-lh': A(p, 'label-lh') },
        mod: [{ 'label-position': y }, v],
        variant: k,
        size: p,
        ...u,
        children: r.jsxs(S, {
          component: C,
          htmlFor: C === 'label' ? f : void 0,
          ...m('body'),
          children: [
            t,
            r.jsxs('div', {
              ...m('labelWrapper'),
              'data-disabled': h || void 0,
              children: [
                s &&
                  r.jsx(S, {
                    component: d,
                    htmlFor: d === 'label' ? f : void 0,
                    ...m('label'),
                    'data-disabled': h || void 0,
                    children: s
                  }),
                i &&
                  r.jsx(z.Description, {
                    size: p,
                    __inheritStyles: !1,
                    ...m('description'),
                    children: i
                  }),
                b &&
                  typeof b != 'boolean' &&
                  r.jsx(z.Error, {
                    size: p,
                    __inheritStyles: !1,
                    ...m('error'),
                    children: b
                  })
              ]
            })
          ]
        })
      });
    }
  );
Z.displayName = '@mantine/core/InlineInput';
var ee = {
  root: 'm_bf2d988c',
  inner: 'm_26062bec',
  input: 'm_26063560',
  icon: 'm_bf295423',
  'input--outline': 'm_215c4542'
};
const oe = R.createContext(null),
  ve = oe.Provider,
  se = () => R.useContext(oe),
  [fe, ke] = be();
var re = { card: 'm_26775b0a' };
const ye = { withBorder: !0 },
  _e = E((e, { radius: a }) => ({ card: { '--card-radius': U(a) } })),
  O = B((e, a) => {
    const o = F('CheckboxCard', ye, e),
      {
        classNames: n,
        className: c,
        style: l,
        styles: t,
        unstyled: s,
        vars: i,
        checked: f,
        mod: h,
        withBorder: b,
        value: p,
        onClick: y,
        defaultChecked: C,
        onChange: d,
        attributes: k,
        ...g
      } = o,
      P = w({
        name: 'CheckboxCard',
        classes: re,
        props: o,
        className: c,
        style: l,
        classNames: n,
        styles: t,
        unstyled: s,
        attributes: k,
        vars: i,
        varsResolver: _e,
        rootSelector: 'card'
      }),
      v = se(),
      j = typeof f == 'boolean' ? f : v ? v.value.includes(p || '') : void 0,
      [u, _] = Q({ value: j, defaultValue: C, finalValue: !1, onChange: d });
    return r.jsx(fe, {
      value: { checked: u },
      children: r.jsx(pe, {
        ref: a,
        mod: [{ 'with-border': b, checked: u }, h],
        ...P('card'),
        ...g,
        role: 'checkbox',
        'aria-checked': u,
        onClick: m => {
          (y == null || y(m), v == null || v.onChange(p || ''), _(!u));
        }
      })
    });
  });
O.displayName = '@mantine/core/CheckboxCard';
O.classes = re;
function ge({ children: e, role: a }) {
  const o = xe();
  return o
    ? r.jsx('div', {
        role: a,
        'aria-labelledby': o.labelId,
        'aria-describedby': o.describedBy,
        children: e
      })
    : r.jsx(r.Fragment, { children: e });
}
const D = B((e, a) => {
  const {
      value: o,
      defaultValue: n,
      onChange: c,
      size: l,
      wrapperProps: t,
      children: s,
      readOnly: i,
      disabled: f,
      ...h
    } = F('CheckboxGroup', null, e),
    [b, p] = Q({ value: o, defaultValue: n, finalValue: [], onChange: c }),
    y = C => {
      const d = typeof C == 'string' ? C : C.currentTarget.value;
      !i && p(b.includes(d) ? b.filter(k => k !== d) : [...b, d]);
    };
  return r.jsx(ve, {
    value: { value: b, onChange: y, size: l, disabled: f },
    children: r.jsx(z.Wrapper, {
      size: l,
      ref: a,
      ...t,
      ...h,
      labelElement: 'div',
      __staticSelector: 'CheckboxGroup',
      children: r.jsx(ge, { role: 'group', children: s })
    })
  });
});
D.classes = z.Wrapper.classes;
D.displayName = '@mantine/core/CheckboxGroup';
var ae = {
  indicator: 'm_5e5256ee',
  icon: 'm_1b1c543a',
  'indicator--outline': 'm_76e20374'
};
const je = { icon: X, variant: 'filled' },
  Ie = E(
    (
      e,
      {
        radius: a,
        color: o,
        size: n,
        iconColor: c,
        variant: l,
        autoContrast: t
      }
    ) => {
      const s = K({ color: o || e.primaryColor, theme: e }),
        i =
          s.isThemeColor && s.shade === void 0
            ? `var(--mantine-color-${s.color}-outline)`
            : s.color;
      return {
        indicator: {
          '--checkbox-size': A(n, 'checkbox-size'),
          '--checkbox-radius': a === void 0 ? void 0 : U(a),
          '--checkbox-color': l === 'outline' ? i : $(o, e),
          '--checkbox-icon-color': c
            ? $(c, e)
            : M(t, e)
              ? L({ color: o, theme: e, autoContrast: t })
              : void 0
        }
      };
    }
  ),
  q = B((e, a) => {
    const o = F('CheckboxIndicator', je, e),
      {
        classNames: n,
        className: c,
        style: l,
        styles: t,
        unstyled: s,
        vars: i,
        icon: f,
        indeterminate: h,
        radius: b,
        color: p,
        iconColor: y,
        autoContrast: C,
        checked: d,
        mod: k,
        variant: g,
        disabled: P,
        attributes: v,
        ...j
      } = o,
      u = w({
        name: 'CheckboxIndicator',
        classes: ae,
        props: o,
        className: c,
        style: l,
        classNames: n,
        styles: t,
        unstyled: s,
        attributes: v,
        vars: i,
        varsResolver: Ie,
        rootSelector: 'indicator'
      }),
      _ = ke(),
      m =
        typeof d == 'boolean' || typeof h == 'boolean'
          ? d || h
          : (_ == null ? void 0 : _.checked) || !1;
    return r.jsx(S, {
      ref: a,
      ...u('indicator', { variant: g }),
      variant: g,
      mod: [{ checked: m, disabled: P }, k],
      ...j,
      children: r.jsx(f, { indeterminate: h, ...u('icon') })
    });
  });
q.displayName = '@mantine/core/CheckboxIndicator';
q.classes = ae;
const Pe = { labelPosition: 'right', icon: X, variant: 'filled' },
  Se = E(
    (
      e,
      {
        radius: a,
        color: o,
        size: n,
        iconColor: c,
        variant: l,
        autoContrast: t
      }
    ) => {
      const s = K({ color: o || e.primaryColor, theme: e }),
        i =
          s.isThemeColor && s.shade === void 0
            ? `var(--mantine-color-${s.color}-outline)`
            : s.color;
      return {
        root: {
          '--checkbox-size': A(n, 'checkbox-size'),
          '--checkbox-radius': a === void 0 ? void 0 : U(a),
          '--checkbox-color': l === 'outline' ? i : $(o, e),
          '--checkbox-icon-color': c
            ? $(c, e)
            : M(t, e)
              ? L({ color: o, theme: e, autoContrast: t })
              : void 0
        }
      };
    }
  ),
  N = B((e, a) => {
    const o = F('Checkbox', Pe, e),
      {
        classNames: n,
        className: c,
        style: l,
        styles: t,
        unstyled: s,
        vars: i,
        color: f,
        label: h,
        id: b,
        size: p,
        radius: y,
        wrapperProps: C,
        checked: d,
        labelPosition: k,
        description: g,
        error: P,
        disabled: v,
        variant: j,
        indeterminate: u,
        icon: _,
        rootRef: m,
        iconColor: Re,
        onChange: T,
        autoContrast: Ne,
        mod: te,
        attributes: ce,
        ...ne
      } = o,
      x = se(),
      le = p || (x == null ? void 0 : x.size),
      G = w({
        name: 'Checkbox',
        props: o,
        classes: ee,
        className: c,
        style: l,
        classNames: n,
        styles: t,
        unstyled: s,
        attributes: ce,
        vars: i,
        varsResolver: Se
      }),
      { styleProps: ie, rest: V } = he(ne),
      H = me(b),
      W = {
        checked: (x == null ? void 0 : x.value.includes(V.value)) ?? d,
        onChange: J => {
          (x == null || x.onChange(J), T == null || T(J));
        },
        disabled: (x == null ? void 0 : x.disabled) ?? v
      },
      de = R.useRef(null),
      I = a || de;
    return (
      R.useEffect(() => {
        I &&
          'current' in I &&
          I.current &&
          ((I.current.indeterminate = u || !1),
          u
            ? I.current.setAttribute('data-indeterminate', 'true')
            : I.current.removeAttribute('data-indeterminate'));
      }, [u, I]),
      r.jsx(Z, {
        ...G('root'),
        __staticSelector: 'Checkbox',
        __stylesApiProps: o,
        id: H,
        size: le,
        labelPosition: k,
        label: h,
        description: g,
        error: P,
        disabled: W.disabled,
        classNames: n,
        styles: t,
        unstyled: s,
        'data-checked': W.checked || d || void 0,
        variant: j,
        ref: m,
        mod: te,
        inert: V.inert,
        ...ie,
        ...C,
        children: r.jsxs(S, {
          ...G('inner'),
          mod: { 'data-label-position': k },
          children: [
            r.jsx(S, {
              component: 'input',
              id: H,
              ref: I,
              mod: { error: !!P },
              ...G('input', { focusable: !0, variant: j }),
              ...V,
              ...W,
              inert: V.inert,
              type: 'checkbox'
            }),
            r.jsx(_, { indeterminate: u, ...G('icon') })
          ]
        })
      })
    );
  });
N.classes = { ...ee, ...Ce };
N.displayName = '@mantine/core/Checkbox';
N.Group = D;
N.Indicator = q;
N.Card = O;
export { N as C };
