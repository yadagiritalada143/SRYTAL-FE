import {
  ad as w,
  u as v,
  a as E,
  X as R,
  aE as _,
  aY as B,
  j as e,
  aD as C,
  B as D,
  aB as T
} from './index-Cn_-nzwF.js';
const b = {
  gap: { type: 'spacing', property: 'gap' },
  rowGap: { type: 'spacing', property: 'rowGap' },
  columnGap: { type: 'spacing', property: 'columnGap' },
  align: { type: 'identity', property: 'alignItems' },
  justify: { type: 'identity', property: 'justifyContent' },
  wrap: { type: 'identity', property: 'flexWrap' },
  direction: { type: 'identity', property: 'flexDirection' }
};
var p = { root: 'm_8bffd616' };
const r = w((o, n) => {
  const t = v('Flex', null, o),
    {
      classNames: l,
      className: i,
      style: y,
      styles: c,
      unstyled: m,
      vars: d,
      gap: u,
      rowGap: x,
      columnGap: g,
      align: f,
      justify: S,
      wrap: j,
      direction: F,
      attributes: P,
      ...h
    } = t,
    G = E({
      name: 'Flex',
      classes: p,
      props: t,
      className: i,
      style: y,
      classNames: l,
      styles: c,
      unstyled: m,
      attributes: P,
      vars: d
    }),
    N = R(),
    a = _(),
    s = B({
      styleProps: {
        gap: u,
        rowGap: x,
        columnGap: g,
        align: f,
        justify: S,
        wrap: j,
        direction: F
      },
      theme: N,
      data: b
    });
  return e.jsxs(e.Fragment, {
    children: [
      s.hasResponsiveStyles &&
        e.jsx(C, { selector: `.${a}`, styles: s.styles, media: s.media }),
      e.jsx(D, {
        ref: n,
        ...G('root', { className: a, style: T(s.inlineStyles) }),
        ...h
      })
    ]
  });
});
r.classes = p;
r.displayName = '@mantine/core/Flex';
export { r as F };
