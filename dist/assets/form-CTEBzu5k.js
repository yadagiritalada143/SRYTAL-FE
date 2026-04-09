import { c as f } from './createReactComponent-wv-YgGrS.js';
import { o as E, s as g, u as I } from './zod-DC47Kjo4.js';
import {
  e as x,
  v as k,
  j as e,
  S as y,
  T as a,
  G as L,
  Z as N
} from './index-Cn_-nzwF.js';
import { f as P } from './common-services-DPGUVDMw.js';
import { u as A } from './toast-Cmrx_Mrb.js';
import { C as B } from './buttons-A92fQUY5.js';
import { C as b } from './CommonButton-D8AVyhIy.js';
import { I as i } from './IconMail-BTX-Af1g.js';
import { I as M } from './IconArrowLeft-DGaJMG-t.js';
import { T as F } from './TextInput-DUPEWkCs.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _ = [
    [
      'path',
      {
        d: 'M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -6',
        key: 'svg-0'
      }
    ],
    ['path', { d: 'M8 11v-4a4 4 0 1 1 8 0v4', key: 'svg-1' }],
    ['path', { d: 'M15 16h.01', key: 'svg-2' }],
    ['path', { d: 'M12.01 16h.01', key: 'svg-3' }],
    ['path', { d: 'M9.02 16h.01', key: 'svg-4' }]
  ],
  Q = f('outline', 'lock-password', 'LockPassword', _);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const R = [
    [
      'path',
      {
        d: 'M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6',
        key: 'svg-0'
      }
    ],
    ['path', { d: 'M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0', key: 'svg-1' }],
    ['path', { d: 'M8 11v-4a4 4 0 1 1 8 0v4', key: 'svg-2' }]
  ],
  Z = f('outline', 'lock', 'Lock', R),
  U = E({
    email: g().email(),
    password: g().min(8, { message: 'Password must be 8 characters long' })
  }),
  X = ({ closeModal: r }) => {
    var u;
    const [s, l] = x.useState(!1),
      { themeConfig: o } = k(),
      [n, d] = x.useState(!1),
      {
        register: j,
        handleSubmit: v,
        formState: { errors: C },
        watch: w
      } = I(),
      { showSuccessToast: S, showErrorToast: T } = A(),
      m = w('username'),
      z = async t => {
        var h, p;
        l(!0);
        try {
          const c = await P(t.username);
          (S(c.message || 'Password reset link sent successfully!'),
            d(!0),
            l(!1),
            setTimeout(() => {
              r();
            }, 3e3));
        } catch (c) {
          (T(
            ((p = (h = c.response) == null ? void 0 : h.data) == null
              ? void 0
              : p.message) || 'Failed to send reset link. Please try again.'
          ),
            l(!1));
        }
      },
      $ = () => {
        (d(!1), r());
      };
    return n
      ? e.jsxs(y, {
          gap: 'lg',
          align: 'center',
          className: 'py-4',
          children: [
            e.jsx('div', {
              className:
                'w-16 h-16 rounded-full flex items-center justify-center mb-2',
              style: {
                backgroundColor: `${o.button.color}20`,
                border: `2px solid ${o.button.color}`
              },
              children: e.jsx(i, { size: 28, style: { color: o.button.color } })
            }),
            e.jsxs('div', {
              className: 'text-center',
              children: [
                e.jsx(a, {
                  size: 'lg',
                  fw: 600,
                  mb: 'xs',
                  style: { color: o.color },
                  children: 'Check Your Email'
                }),
                e.jsxs(a, {
                  size: 'sm',
                  c: 'dimmed',
                  mb: 'md',
                  style: { color: `${o.color}80` },
                  children: ["We've sent a temporary password to $", m]
                }),
                e.jsx(a, {
                  size: 'sm',
                  fw: 500,
                  style: { color: o.button.color },
                  children: m
                })
              ]
            }),
            e.jsx(a, {
              size: 'xs',
              ta: 'center',
              c: 'dimmed',
              style: { color: `${o.color}60` },
              children:
                "Didn't receive the email? Check your spam folder or try again."
            }),
            e.jsx(b, {
              variant: 'subtle',
              leftSection: e.jsx(M, { size: 16 }),
              onClick: $,
              style: {
                color: o.linkColor,
                ':hover': { backgroundColor: `${o.button.color}10` }
              },
              children: 'Back to Login'
            })
          ]
        })
      : e.jsx('form', {
          onSubmit: v(z),
          children: e.jsxs(y, {
            gap: 'lg',
            children: [
              e.jsxs('div', {
                className: 'text-center mb-2',
                children: [
                  e.jsx('div', {
                    className:
                      'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3',
                    style: { backgroundColor: `${o.button.color}15` },
                    children: e.jsx(Z, {
                      size: 24,
                      style: { color: o.button.color }
                    })
                  }),
                  e.jsx(a, {
                    size: 'sm',
                    c: 'dimmed',
                    style: { color: `${o.color}70` },
                    children:
                      "Enter your email address and we'll send you a temporary password to reset your password."
                  })
                ]
              }),
              e.jsx(F, {
                ...j('username', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                }),
                label: 'Email Address',
                autoComplete: 'off',
                placeholder: 'Enter your email address',
                size: 'md',
                leftSection: e.jsx(i, { size: 16 }),
                error: (u = C.username) == null ? void 0 : u.message,
                onChange: t => {
                  t.target.value = t.target.value.replace(/\s/g, '');
                }
              }),
              e.jsxs(L, {
                justify: 'space-between',
                mt: 'md',
                children: [
                  e.jsx(B, {
                    size: 'md',
                    label: 'Cancel',
                    variant: 'subtle',
                    style: { borderRadius: 8 },
                    onClick: t => {
                      (t.preventDefault(), r());
                    },
                    disabled: s,
                    color: o.button.color,
                    children: 'Cancel'
                  }),
                  e.jsx(b, {
                    type: 'submit',
                    disabled: s,
                    loading: s,
                    style: {
                      backgroundColor: o.button.color,
                      color: o.button.textColor,
                      minWidth: '120px'
                    },
                    leftSection: s
                      ? e.jsx(N, { size: 'xs', color: o.button.textColor })
                      : e.jsx(i, { size: 16 }),
                    children: s ? 'Sending...' : 'Send '
                  })
                ]
              }),
              e.jsxs(a, {
                size: 'xs',
                ta: 'center',
                c: 'dimmed',
                style: { color: `${o.color}50` },
                children: [
                  'Remember your password?',
                  ' ',
                  e.jsx('button', {
                    type: 'button',
                    onClick: r,
                    className: 'underline hover:opacity-80 transition-opacity',
                    style: { color: o.linkColor },
                    children: 'Back to Login'
                  })
                ]
              })
            ]
          })
        });
  },
  ee = ({ children: r, className: s = '', style: l = {}, onSubmit: o }) => {
    const { themeConfig: n } = k();
    return e.jsx('form', {
      onSubmit: o,
      style: {
        backgroundColor: n.headerBackgroundColor,
        color: n.color,
        border: `1px solid ${n.borderColor}`,
        transition:
          'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
        ...l
      },
      className: `shadow-xl rounded-lg p-6 max-w-md w-full ${s}`,
      children: r
    });
  };
export { X as F, Q as I, ee as T, U as l };
