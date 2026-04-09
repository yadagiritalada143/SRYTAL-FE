import {
  f as w,
  u as I,
  a as N,
  i as S,
  j as e,
  B as k,
  aa as z,
  c as $,
  a1 as E
} from './index-Cn_-nzwF.js';
var x = {
  root: 'm_66836ed3',
  wrapper: 'm_a5d60502',
  body: 'm_667c2793',
  title: 'm_6a03f287',
  label: 'm_698f4f23',
  icon: 'm_667f2a6a',
  message: 'm_7fa78076',
  closeButton: 'm_87f54839'
};
const L = $((a, { radius: l, color: o, variant: t, autoContrast: d }) => {
    const r = a.variantColorResolver({
      color: o || a.primaryColor,
      theme: a,
      variant: t || 'light',
      autoContrast: d
    });
    return {
      root: {
        '--alert-radius': l === void 0 ? void 0 : E(l),
        '--alert-bg': o || t ? r.background : void 0,
        '--alert-color': r.color,
        '--alert-bd': o || t ? r.border : void 0
      }
    };
  }),
  j = w((a, l) => {
    const o = I('Alert', null, a),
      {
        classNames: t,
        className: d,
        style: r,
        styles: f,
        unstyled: u,
        vars: h,
        radius: P,
        color: V,
        title: i,
        children: n,
        id: _,
        icon: b,
        withCloseButton: m,
        onClose: g,
        closeButtonLabel: B,
        variant: c,
        autoContrast: q,
        role: C,
        attributes: A,
        ...R
      } = o,
      s = N({
        name: 'Alert',
        classes: x,
        props: o,
        className: d,
        style: r,
        classNames: t,
        styles: f,
        unstyled: u,
        attributes: A,
        vars: h,
        varsResolver: L
      }),
      v = S(_),
      p = (i && `${v}-title`) || void 0,
      y = `${v}-body`;
    return e.jsx(k, {
      id: v,
      ...s('root', { variant: c }),
      variant: c,
      ref: l,
      role: C || 'alert',
      ...R,
      'aria-describedby': n ? y : void 0,
      'aria-labelledby': i ? p : void 0,
      children: e.jsxs('div', {
        ...s('wrapper'),
        children: [
          b && e.jsx('div', { ...s('icon'), children: b }),
          e.jsxs('div', {
            ...s('body'),
            children: [
              i &&
                e.jsx('div', {
                  ...s('title'),
                  'data-with-close-button': m || void 0,
                  children: e.jsx('span', { id: p, ...s('label'), children: i })
                }),
              n &&
                e.jsx('div', {
                  id: y,
                  ...s('message'),
                  'data-variant': c,
                  children: n
                })
            ]
          }),
          m &&
            e.jsx(z, {
              ...s('closeButton'),
              onClick: g,
              variant: 'transparent',
              size: 16,
              iconSize: 16,
              'aria-label': B,
              unstyled: u
            })
        ]
      })
    });
  });
j.classes = x;
j.displayName = '@mantine/core/Alert';
export { j as A };
