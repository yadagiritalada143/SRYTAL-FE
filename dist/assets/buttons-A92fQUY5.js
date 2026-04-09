import { j as s } from './index-Cn_-nzwF.js';
const e = '_button_1ncjr_2',
  a = '_xs_1ncjr_13',
  m = '_sm_1ncjr_19',
  j = '_md_1ncjr_25',
  x = '_lg_1ncjr_31',
  i = '_xl_1ncjr_37',
  p = '_logoutBtn_1ncjr_120',
  d = '_sign_1ncjr_137',
  h = '_text_1ncjr_153',
  n = {
    button: e,
    xs: a,
    sm: m,
    md: j,
    lg: x,
    xl: i,
    'span-mother': '_span-mother_1ncjr_43',
    'span-mother2': '_span-mother2_1ncjr_80',
    logoutBtn: p,
    sign: d,
    text: h
  },
  b = ({ label: t, size: r = 'md', variant: u = 'filled', ..._ }) => {
    const l = t.split('');
    return s.jsxs('button', {
      className: `${n.button} ${n[r]}`,
      ..._,
      children: [
        s.jsx('span', {
          className: n['span-mother'],
          children: l.map((c, o) => s.jsx('span', { children: c }, `top-${o}`))
        }),
        s.jsx('span', {
          className: n['span-mother2'],
          children: l.map((c, o) =>
            s.jsx('span', { children: c }, `bottom-${o}`)
          )
        })
      ]
    });
  },
  B = ({ ...t }) =>
    s.jsx('button', {
      onClick: t.handleLogout,
      className: n.logoutBtn,
      children: s.jsx('div', {
        className: n.sign,
        children: s.jsx('svg', {
          viewBox: '0 0 512 512',
          children: s.jsx('path', {
            d: 'M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z'
          })
        })
      })
    });
export { b as C, B as L };
