import { j as e, P as C, D as k, e as S, Q as E } from './index-Cn_-nzwF.js';
import { c as d } from './createReactComponent-wv-YgGrS.js';
import { u as L, t as w, C as O } from './zod-DC47Kjo4.js';
import { o as R } from './offerletter-C11Op7FT.js';
import { G as F } from './super-admin-services-BvvksAUt.js';
import { C as T } from './CommonButton-D8AVyhIy.js';
import { T as I } from './Textarea-CHnPFotR.js';
import { T as c } from './TextInput-DUPEWkCs.js';
import { S as D } from './Select-KZOOD-9X.js';
import { u as _ } from './use-disclosure-Dul82tkt.js';
import './api-client-CcbR4Lbf.js';
import './InputBase-CO8vJiWZ.js';
import './Input-kzRYOXAd.js';
import './use-input-props-CLa6mLr2.js';
import './OptionsDropdown-B_GLZDf8.js';
import './CheckIcon-CpIg4BN2.js';
import './Popover-C5NzMGSx.js';
import './get-floating-position-TyKNLeXJ.js';
import './use-uncontrolled-C8lBt68W.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const A = [
    [
      'path',
      {
        d: 'M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2',
        key: 'svg-0'
      }
    ],
    [
      'path',
      {
        d: 'M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2',
        key: 'svg-1'
      }
    ],
    ['path', { d: 'M9 17v-4', key: 'svg-2' }],
    ['path', { d: 'M12 17v-1', key: 'svg-3' }],
    ['path', { d: 'M15 17v-2', key: 'svg-4' }],
    ['path', { d: 'M12 17v-1', key: 'svg-5' }]
  ],
  G = d('outline', 'clipboard-data', 'ClipboardData', A);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const P = [
    ['path', { d: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1',
        key: 'svg-1'
      }
    ],
    ['path', { d: 'M12 7v10', key: 'svg-2' }]
  ],
  U = d('outline', 'coin', 'Coin', P);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const B = [
    ['path', { d: 'M14 3v4a1 1 0 0 0 1 1h4', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2',
        key: 'svg-1'
      }
    ],
    ['path', { d: 'M9 15l2 2l4 -4', key: 'svg-2' }]
  ],
  $ = d('outline', 'file-check', 'FileCheck', B);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const z = [
    ['path', { d: 'M14 3v4a1 1 0 0 0 1 1h4', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2',
        key: 'svg-1'
      }
    ],
    ['path', { d: 'M11 14h1v4h1', key: 'svg-2' }],
    ['path', { d: 'M12 11h.01', key: 'svg-3' }]
  ],
  J = d('outline', 'file-info', 'FileInfo', z),
  V = [
    { icon: $, text: 'OFFER LETTER', openModel: 'offerletter' },
    { icon: U, text: 'SALARY SLIP', openModel: 'salaaryslip' },
    { icon: J, text: 'RELIEVING LETTER', openModel: 'relievingletter' },
    { icon: G, text: 'VENDORSHIP AGREEMENT', openModel: 'vendorshipagreement' }
  ],
  H = () => {
    var l, f, g, v, j;
    const {
        register: s,
        handleSubmit: m,
        control: p,
        getValues: h,
        reset: u,
        formState: { errors: o, isSubmitting: a }
      } = L({ resolver: w(R) }),
      t = async i => {
        var r, b;
        try {
          const x = await F(i),
            M = `${h('nameOfTheCandidate')}-OfferLetter.pdf`,
            y = window.URL.createObjectURL(new Blob([x]));
          (k.success(
            ({ closeToast: N }) =>
              e.jsxs('div', {
                children: [
                  e.jsx('p', {
                    children: 'Offer Letter generated successfully!'
                  }),
                  e.jsx('button', {
                    className: 'text-blue-500 underline',
                    onClick: () => {
                      const n = document.createElement('a');
                      ((n.href = y),
                        (n.download = M.replace(/["']/g, '')),
                        document.body.appendChild(n),
                        n.click(),
                        document.body.removeChild(n),
                        window.URL.revokeObjectURL(y));
                    },
                    children: 'Download PDF'
                  }),
                  e.jsx('button', {
                    className: 'ml-4 text-red-500 underline',
                    onClick: N,
                    children: 'Close'
                  })
                ]
              }),
            { autoClose: !1, closeOnClick: !1 }
          ),
            u());
        } catch (x) {
          k.error(
            ((b = (r = x.response) == null ? void 0 : r.data) == null
              ? void 0
              : b.message) || 'Failed to generate Offer Letter'
          );
        }
      };
    return e.jsx('div', {
      className: 'mx-auto ',
      children: e.jsxs('form', {
        onSubmit: m(t),
        className: 'w-full p-8',
        children: [
          e.jsx('h2', {
            className: 'text-2xl font-bold text-center mb-6',
            children: 'OFFER LETTER'
          }),
          e.jsx('div', {
            className: 'mt-4',
            children: e.jsx(I, {
              label: 'Subject',
              className: 'w-full',
              maxRows: 4,
              autosize: !0,
              placeholder: 'Enter Subject',
              ...s('subject'),
              error: (l = o.subject) == null ? void 0 : l.message
            })
          }),
          e.jsxs('div', {
            className: 'grid gap-4 grid-cols-1 sm:grid-cols-2 mt-4',
            children: [
              e.jsx(c, {
                label: 'Candidate Name',
                placeholder: 'Enter first name',
                ...s('nameOfTheCandidate'),
                error: (f = o.nameOfTheCandidate) == null ? void 0 : f.message
              }),
              e.jsx(c, {
                type: 'date',
                label: 'Joining Date',
                placeholder: 'Select joining date',
                ...s('dateOfJoining'),
                error: (g = o.dateOfJoining) == null ? void 0 : g.message
              }),
              e.jsx(c, {
                type: 'number',
                label: 'Compensation',
                placeholder: 'Enter Compensation',
                ...s('compensation'),
                error: (v = o.compensation) == null ? void 0 : v.message
              }),
              e.jsx(O, {
                name: 'role',
                control: p,
                render: ({ field: i }) => {
                  var r;
                  return e.jsx(D, {
                    label: 'User Role',
                    ...i,
                    error: (r = o.role) == null ? void 0 : r.message,
                    placeholder: 'Select user role',
                    value: i.value,
                    data: [
                      { label: 'employee', value: 'employee' },
                      { label: 'recruiter', value: 'recruiter' }
                    ]
                  });
                }
              }),
              e.jsx('div', {}),
              e.jsx(c, {
                label: 'Work Location',
                placeholder: 'Enter Work Location',
                ...s('workLocation'),
                error: (j = o.workLocation) == null ? void 0 : j.message
              })
            ]
          }),
          e.jsxs('div', {
            className: 'flex justify-between ',
            children: [
              e.jsx('div', {}),
              e.jsx(T, {
                className: 'mt-7 rounded-md',
                type: 'submit',
                'data-testid': 'submitButton',
                leftSection: a && e.jsx(C, { size: 'xs', minHeight: '20px' }),
                disabled: a,
                children: a ? 'Generating...' : 'Generate OfferLetter'
              })
            ]
          })
        ]
      })
    });
  },
  W = () => e.jsx('h1', { children: 'SalarySlips' }),
  he = () => {
    const [s, { open: m, close: p }] = _(!1),
      [h, u] = S.useState(''),
      o = t => {
        (u(t.text), m());
      },
      a = t => {
        switch (t) {
          case 'OFFER LETTER':
            return e.jsx(H, {});
          case 'SALARY SLIP':
            return e.jsx(W, {});
          default:
            return e.jsx('h1', { children: 'Oops this is still in progress' });
        }
      };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs('div', {
          className:
            ' mx-auto w-full max-w-4xl p-10 bg-gradient-to-r from-blue-50 to-purple-100 rounded-lg shadow-lg',
          children: [
            e.jsx('h1', {
              className: 'text-center text-3xl font-bold text-gray-800 mb-8',
              children: 'Documents'
            }),
            e.jsx('div', {
              className: 'grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
              children: V.map(t => {
                const l = t.icon;
                return e.jsxs(
                  'div',
                  {
                    onClick: () => o(t),
                    className:
                      'relative group hover:cursor-pointer bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl',
                    children: [
                      e.jsx('div', {
                        className:
                          'absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 rounded-lg transition-opacity'
                      }),
                      e.jsx('div', {
                        className:
                          'flex justify-center items-center mb-4 p-3 rounded-full bg-indigo-100 text-indigo-600 shadow-md',
                        children: e.jsx(l, { className: 'text-3xl' })
                      }),
                      e.jsx('h1', {
                        className: 'text-xl font-semibold text-gray-700',
                        children: t.text
                      })
                    ]
                  },
                  t.text
                );
              })
            })
          ]
        }),
        e.jsx(E, { size: 'lg', opened: s, onClose: p, children: a(h) })
      ]
    });
  };
export { he as default };
