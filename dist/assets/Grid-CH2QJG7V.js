import {
  d as A,
  X as E,
  aB as M,
  aC as h,
  j as l,
  aD as D,
  f as I,
  u as O,
  aE as T,
  B as G,
  ah as H,
  $ as V,
  a as J,
  c as K
} from './index-Cn_-nzwF.js';
import { g as w, a as W } from './get-base-value-BKGvYumc.js';
const [P, X] = A('Grid component was not found in tree');
var $ = {
  container: 'm_8478a6da',
  root: 'm_410352e9',
  inner: 'm_dee7bd2f',
  col: 'm_96bdd299'
};
const N = (s, t) =>
    s === 'content'
      ? 'auto'
      : s === 'auto'
        ? '0rem'
        : s
          ? `${100 / (t / s)}%`
          : void 0,
  q = (s, t, n) =>
    n || s === 'auto' ? '100%' : s === 'content' ? 'unset' : N(s, t),
  R = (s, t) => {
    if (s) return s === 'auto' || t ? '1' : 'auto';
  },
  p = (s, t) => (s === 0 ? '0' : s ? `${100 / (t / s)}%` : void 0);
function L({ span: s, order: t, offset: n, selector: a }) {
  var x;
  const v = E(),
    e = X(),
    d = e.breakpoints || v.breakpoints,
    u = w(s) === void 0 ? 12 : w(s),
    m = M({
      '--col-order': (x = w(t)) == null ? void 0 : x.toString(),
      '--col-flex-grow': R(u, e.grow),
      '--col-flex-basis': N(u, e.columns),
      '--col-width': u === 'content' ? 'auto' : void 0,
      '--col-max-width': q(u, e.columns, e.grow),
      '--col-offset': p(w(n), e.columns)
    }),
    i = h(d).reduce((r, o) => {
      var y;
      return (
        r[o] || (r[o] = {}),
        typeof t == 'object' &&
          t[o] !== void 0 &&
          (r[o]['--col-order'] = (y = t[o]) == null ? void 0 : y.toString()),
        typeof s == 'object' &&
          s[o] !== void 0 &&
          ((r[o]['--col-flex-grow'] = R(s[o], e.grow)),
          (r[o]['--col-flex-basis'] = N(s[o], e.columns)),
          (r[o]['--col-width'] = s[o] === 'content' ? 'auto' : void 0),
          (r[o]['--col-max-width'] = q(s[o], e.columns, e.grow))),
        typeof n == 'object' &&
          n[o] !== void 0 &&
          (r[o]['--col-offset'] = p(n[o], e.columns)),
        r
      );
    }, {}),
    j = W(h(i), d)
      .filter(r => h(i[r.value]).length > 0)
      .map(r => ({
        query:
          e.type === 'container'
            ? `mantine-grid (min-width: ${d[r.value]})`
            : `(min-width: ${d[r.value]})`,
        styles: i[r.value]
      }));
  return l.jsx(D, {
    styles: m,
    media: e.type === 'container' ? void 0 : j,
    container: e.type === 'container' ? j : void 0,
    selector: a
  });
}
const Q = { span: 12 },
  B = I((s, t) => {
    const n = O('GridCol', Q, s),
      {
        classNames: a,
        className: v,
        style: e,
        styles: d,
        vars: f,
        span: u,
        order: m,
        offset: i,
        ...c
      } = n,
      j = X(),
      x = T();
    return l.jsxs(l.Fragment, {
      children: [
        l.jsx(L, { selector: `.${x}`, span: u, order: m, offset: i }),
        l.jsx(G, {
          ref: t,
          ...j.getStyles('col', {
            className: H(v, x),
            style: e,
            classNames: a,
            styles: d
          }),
          ...c
        })
      ]
    });
  });
B.classes = $;
B.displayName = '@mantine/core/GridCol';
function F({ gutter: s, selector: t, breakpoints: n, type: a }) {
  const v = E(),
    e = n || v.breakpoints,
    d = M({ '--grid-gutter': V(w(s)) }),
    f = h(e).reduce(
      (i, c) => (
        i[c] || (i[c] = {}),
        typeof s == 'object' &&
          s[c] !== void 0 &&
          (i[c]['--grid-gutter'] = V(s[c])),
        i
      ),
      {}
    ),
    m = W(h(f), e)
      .filter(i => h(f[i.value]).length > 0)
      .map(i => ({
        query:
          a === 'container'
            ? `mantine-grid (min-width: ${e[i.value]})`
            : `(min-width: ${e[i.value]})`,
        styles: f[i.value]
      }));
  return l.jsx(D, {
    styles: d,
    media: a === 'container' ? void 0 : m,
    container: a === 'container' ? m : void 0,
    selector: t
  });
}
const U = { gutter: 'md', grow: !1, columns: 12 },
  Y = K((s, { justify: t, align: n, overflow: a }) => ({
    root: { '--grid-justify': t, '--grid-align': n, '--grid-overflow': a }
  })),
  _ = I((s, t) => {
    const n = O('Grid', U, s),
      {
        classNames: a,
        className: v,
        style: e,
        styles: d,
        unstyled: f,
        vars: u,
        grow: m,
        gutter: i,
        columns: c,
        align: j,
        justify: x,
        children: r,
        breakpoints: o,
        type: y,
        attributes: z,
        ...S
      } = n,
      g = J({
        name: 'Grid',
        classes: $,
        props: n,
        className: v,
        style: e,
        classNames: a,
        styles: d,
        unstyled: f,
        attributes: z,
        vars: u,
        varsResolver: Y
      }),
      C = T();
    return y === 'container' && o
      ? l.jsxs(P, {
          value: { getStyles: g, grow: m, columns: c, breakpoints: o, type: y },
          children: [
            l.jsx(F, { selector: `.${C}`, ...n }),
            l.jsx('div', {
              ...g('container'),
              children: l.jsx(G, {
                ref: t,
                ...g('root', { className: C }),
                ...S,
                children: l.jsx('div', { ...g('inner'), children: r })
              })
            })
          ]
        })
      : l.jsxs(P, {
          value: { getStyles: g, grow: m, columns: c, breakpoints: o, type: y },
          children: [
            l.jsx(F, { selector: `.${C}`, ...n }),
            l.jsx(G, {
              ref: t,
              ...g('root', { className: C }),
              ...S,
              children: l.jsx('div', { ...g('inner'), children: r })
            })
          ]
        });
  });
_.classes = $;
_.displayName = '@mantine/core/Grid';
_.Col = B;
export { _ as G };
