import {
  f as P,
  u as _,
  X as k,
  a as N,
  j as e,
  Y as R,
  B as S,
  Z as w,
  av as c,
  aw as B,
  c as H
} from './index-Cn_-nzwF.js';
var y = { root: 'm_6e45937b', loader: 'm_e8eb006c', overlay: 'm_df587f17' };
const d = {
    transitionProps: { transition: 'fade', duration: 0 },
    overlayProps: { backgroundOpacity: 0.75 },
    zIndex: B('overlay')
  },
  T = H((t, { zIndex: a }) => ({
    root: { '--lo-z-index': a == null ? void 0 : a.toString() }
  })),
  v = P((t, a) => {
    const n = _('LoadingOverlay', d, t),
      {
        classNames: u,
        className: m,
        style: p,
        styles: f,
        unstyled: o,
        vars: g,
        transitionProps: x,
        loaderProps: h,
        overlayProps: s,
        visible: j,
        zIndex: Z,
        attributes: L,
        ...O
      } = n,
      l = k(),
      r = N({
        name: 'LoadingOverlay',
        classes: y,
        props: n,
        className: m,
        style: p,
        classNames: u,
        styles: f,
        unstyled: o,
        attributes: L,
        vars: g,
        varsResolver: T
      }),
      i = { ...d.overlayProps, ...s };
    return e.jsx(R, {
      transition: 'fade',
      ...x,
      mounted: !!j,
      children: b =>
        e.jsxs(S, {
          ...r('root', { style: b }),
          ref: a,
          ...O,
          children: [
            e.jsx(w, { ...r('loader'), unstyled: o, ...h }),
            e.jsx(c, {
              ...i,
              ...r('overlay'),
              darkHidden: !0,
              unstyled: o,
              color: (s == null ? void 0 : s.color) || l.white
            }),
            e.jsx(c, {
              ...i,
              ...r('overlay'),
              lightHidden: !0,
              unstyled: o,
              color: (s == null ? void 0 : s.color) || l.colors.dark[5]
            })
          ]
        })
    });
  });
v.classes = y;
v.displayName = '@mantine/core/LoadingOverlay';
export { v as L };
