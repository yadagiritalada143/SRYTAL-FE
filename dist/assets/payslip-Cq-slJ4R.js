import {
  v as C,
  j as e,
  e as l,
  D as z,
  G as h,
  B as A,
  T
} from './index-Cn_-nzwF.js';
import { h as c } from './common-services-DPGUVDMw.js';
import { h as k } from './button-D3DmOMH8.js';
import { C as b } from './CommonButton-D8AVyhIy.js';
import { T as M } from './Title-T3OvY56h.js';
import { G as N } from './Grid-CH2QJG7V.js';
import { A as D } from './ActionIcon-BBM-Tm4F.js';
import { I as P } from './IconChevronLeft-bJVEtpKR.js';
import { D as F } from './DatePickerInput-DkPCxbtp.js';
import { I as B } from './IconCalendar-Cp3De190.js';
import { I as R } from './IconChevronRight-TJh0Dsn1.js';
import { T as E } from './TextInput-DUPEWkCs.js';
import { I as L } from './IconX-BFEQcM8f.js';
import { I as O } from './IconSearch-D9mxNvB2.js';
import { T as Y } from './Table-Bwpju6TN.js';
import { B as $ } from './Badge-pr8cFvg5.js';
import { I as G } from './IconDownload-C0iPh4eJ.js';
import './api-client-CcbR4Lbf.js';
import './get-base-value-BKGvYumc.js';
import './createReactComponent-wv-YgGrS.js';
import './pick-calendar-levels-props-DunTV9xS.js';
import './use-uncontrolled-C8lBt68W.js';
import './AccordionChevron-D1fL7nd1.js';
import './Input-kzRYOXAd.js';
import './clamp-DTmYCdls.js';
import './use-dates-state-3PlMkQ_8.js';
import './use-input-props-CLa6mLr2.js';
import './Popover-C5NzMGSx.js';
import './get-floating-position-TyKNLeXJ.js';
import './use-dates-input-Cp74vuuz.js';
import './use-disclosure-Dul82tkt.js';
import './DatePicker-BI1MhDah.js';
import './InputBase-CO8vJiWZ.js';
const J = ({ children: r, className: a = '' }) => {
    const { themeConfig: m } = C();
    return e.jsx('div', {
      className: `custom-style-div ${a}`,
      style: { color: m.button.textColor },
      children: r
    });
  },
  Ce = () => {
    const { themeConfig: r } = C(),
      [a, m] = l.useState(null);
    l.useEffect(() => {
      k()
        .then(t => m(t))
        .catch(t => {
          var o, s;
          return z.error(
            (t == null ? void 0 : t.message) ||
              ((s =
                (o = t == null ? void 0 : t.response) == null
                  ? void 0
                  : o.data) == null
                ? void 0
                : s.message) ||
              'Failed to fetch user details'
          );
        });
    }, []);
    const u = a
        ? [
            {
              employeeName: `${a.firstName} ${a.lastName || ''}`,
              year: '2025',
              month: 'May',
              status: 'PAID'
            },
            {
              employeeName: `${a.firstName} ${a.lastName || ''}`,
              year: '2025',
              month: 'June',
              status: 'UNPAID'
            }
          ]
        : [],
      I = t =>
        [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ].indexOf(t),
      [d, f] = l.useState(''),
      [p, y] = l.useState([
        c().startOf('month').toDate(),
        c().endOf('month').toDate()
      ]),
      [S, v] = l.useState({ range: [null, null] }),
      j = u.filter(t => {
        const o = new Date(parseInt(t.year), I(t.month), 1),
          [s, n] = S.range,
          i = !s || !n || (o >= s && o <= n),
          x = t.employeeName.toLowerCase().includes(d.toLowerCase());
        return i && x;
      }),
      g = t => {
        const [o, s] = p;
        if (!o || !s) return;
        const n = c(s).diff(o, 'days') + 1,
          i = t === 'previous' ? 'subtract' : 'add',
          x = c(o)[i](n, 'days').toDate(),
          w = c(s)[i](n, 'days').toDate();
        y([x, w]);
      };
    return e.jsxs(J, {
      className: 'w-100 p-5',
      children: [
        e.jsx(M, {
          order: 2,
          className:
            'text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-6',
          children: 'Payslip List'
        }),
        e.jsx(N, {
          align: 'center',
          gutter: 'md',
          className: 'mb-4 p-4 rounded-md',
          children: e.jsx(N.Col, {
            span: 12,
            children: e.jsxs(h, {
              justify: 'space-between',
              wrap: 'wrap',
              children: [
                e.jsxs(h, {
                  gap: 'sm',
                  wrap: 'wrap',
                  children: [
                    e.jsx(D, {
                      variant: 'outline',
                      radius: 'xl',
                      color: r.color,
                      size: 'lg',
                      onClick: () => g('previous'),
                      children: e.jsx(P, { size: 18 })
                    }),
                    e.jsx(F, {
                      type: 'range',
                      value: p,
                      onChange: y,
                      leftSection: e.jsx(B, { size: 16 }),
                      size: 'sm',
                      radius: 'md',
                      valueFormat: 'MMMM YYYY',
                      allowSingleDateInRange: !1,
                      placeholder: 'Select from and to month'
                    }),
                    e.jsx(D, {
                      variant: 'outline',
                      radius: 'xl',
                      color: r.color,
                      size: 'lg',
                      onClick: () => g('next'),
                      children: e.jsx(R, { size: 18 })
                    }),
                    e.jsx(b, {
                      size: 'sm',
                      onClick: () => v({ range: p }),
                      style: {
                        backgroundColor: r.button.color,
                        color: r.button.textColor
                      },
                      children: 'Search'
                    })
                  ]
                }),
                e.jsx(E, {
                  placeholder: 'Search by name...',
                  leftSection: e.jsx(O, { size: 16 }),
                  rightSection:
                    d &&
                    e.jsx(L, {
                      size: 16,
                      style: { cursor: 'pointer' },
                      onClick: () => f('')
                    }),
                  value: d,
                  onChange: t => f(t.currentTarget.value),
                  size: 'sm',
                  radius: 'md',
                  style: { minWidth: '200px' }
                })
              ]
            })
          })
        }),
        e.jsxs(A, {
          style: { overflowX: 'auto' },
          children: [
            e.jsxs(Y, {
              striped: !0,
              highlightOnHover: !0,
              verticalSpacing: 'sm',
              horizontalSpacing: 'sm',
              className: 'border',
              style: {
                borderColor: r.borderColor,
                color: r.color,
                fontFamily: r.fontFamily
              },
              children: [
                e.jsx('thead', {
                  style: {
                    backgroundColor: r.headerBackgroundColor,
                    color: r.color
                  },
                  children: e.jsxs('tr', {
                    children: [
                      e.jsx('th', {
                        className: 'border px-1 py-1 text-center',
                        children: 'S.No'
                      }),
                      e.jsx('th', {
                        className: 'border px-1 py-1 text-center',
                        children: 'Employee Name'
                      }),
                      e.jsx('th', {
                        className: 'border px-1 py-1 text-center',
                        children: 'Year'
                      }),
                      e.jsx('th', {
                        className: 'border px-1 py-1 text-center',
                        children: 'Month'
                      }),
                      e.jsx('th', {
                        className: 'border px-1 py-1 text-center',
                        children: 'Status'
                      }),
                      e.jsx('th', {
                        className: 'border px-1 py-1 text-center',
                        children: 'Action'
                      })
                    ]
                  })
                }),
                e.jsx('tbody', {
                  children: j.map((t, o) =>
                    e.jsxs(
                      'tr',
                      {
                        children: [
                          e.jsx('td', {
                            className: 'border px-1 py-1 text-center',
                            children: o + 1
                          }),
                          e.jsx('td', {
                            className: 'border px-1 py-1 text-center',
                            children: t.employeeName
                          }),
                          e.jsx('td', {
                            className: 'border px-1 py-1 text-center',
                            children: t.year
                          }),
                          e.jsx('td', {
                            className: 'border px-1 py-1 text-center',
                            children: t.month
                          }),
                          e.jsx('td', {
                            className: 'border px-1 py-1 text-center',
                            children: e.jsx($, {
                              variant: 'light',
                              size: 'sm',
                              style: {
                                color: '#fff',
                                backgroundColor:
                                  t.status === 'PAID' ? '#4CAF50' : '#F44336'
                              },
                              children:
                                t.status === 'PAID' ? '✔ PAID' : '✖ UNPAID'
                            })
                          }),
                          e.jsx('td', {
                            className: 'border px-1 py-1 text-center',
                            children: e.jsx(h, {
                              justify: 'center',
                              gap: 'xs',
                              wrap: 'nowrap',
                              children: e.jsx(b, {
                                leftSection: e.jsx(G, { size: 14 }),
                                size: 'xs',
                                variant: 'filled',
                                style: { color: r.button.textColor },
                                children: 'Download'
                              })
                            })
                          })
                        ]
                      },
                      o
                    )
                  )
                })
              ]
            }),
            e.jsxs(T, {
              size: 'xs',
              mt: 'sm',
              style: { color: r.color },
              children: ['Showing ', j.length, ' of ', u.length, ' entries']
            })
          ]
        })
      ]
    });
  };
export { Ce as default };
