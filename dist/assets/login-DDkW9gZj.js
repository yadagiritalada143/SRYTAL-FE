import {
  v as S,
  t as P,
  R as T,
  e as j,
  C as z,
  j as o,
  P as I,
  Q as L
} from './index-Cn_-nzwF.js';
import { u as _, t as F } from './zod-DC47Kjo4.js';
import { T as M, I as U, F as $, l as A } from './form-CTEBzu5k.js';
import { l as B } from './common-services-DPGUVDMw.js';
import { R as c, c as O } from './api-client-CcbR4Lbf.js';
import { u as q } from './toast-Cmrx_Mrb.js';
import { u as D, a as w } from './button-D3DmOMH8.js';
import { T as H } from './background-IMiwGkbJ.js';
import { C as Q } from './CommonButton-D8AVyhIy.js';
import { T as W } from './TextInput-DUPEWkCs.js';
import { I as G } from './IconMail-BTX-Af1g.js';
import { P as J } from './PasswordInput-CGTZTn1Z.js';
import { c as K } from './createReactComponent-wv-YgGrS.js';
import './buttons-A92fQUY5.js';
import './IconArrowLeft-DGaJMG-t.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './IconX-BFEQcM8f.js';
import './InputBase-CO8vJiWZ.js';
import './Input-kzRYOXAd.js';
import './use-input-props-CLa6mLr2.js';
import './ActionIcon-BBM-Tm4F.js';
import './use-uncontrolled-C8lBt68W.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const V = [
    [
      'path',
      {
        d: 'M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2',
        key: 'svg-0'
      }
    ],
    ['path', { d: 'M3 12h13l-3 -3', key: 'svg-1' }],
    ['path', { d: 'M13 15l3 -3', key: 'svg-2' }]
  ],
  X = K('outline', 'login-2', 'Login2', V),
  yo = () => {
    var g, h;
    const { showSuccessToast: y, showErrorToast: d } = q(),
      { themeConfig: a, organizationConfig: r } = S(),
      { organization: i } = P(),
      N = T(D),
      [R, n] = j.useState(!1),
      {
        register: u,
        formState: { errors: p, isSubmitting: l },
        handleSubmit: v
      } = _({ resolver: F(A) }),
      s = z(),
      { backgroundColor: f, button: C, color: x, linkColor: E } = a;
    j.useEffect(() => {
      const m = localStorage.getItem('token'),
        t = localStorage.getItem('userRole');
      m &&
        (t === c.RECRUITER
          ? s(`/${i}/employee/dashboard/pool-companies`)
          : t === c.USER && s(`/${i}/employee/dashboard/profile`));
    }, [s, i]);
    const k = async m => {
      var t, b;
      try {
        const e = await B(m);
        (N({
          firstName: e.firstName,
          lastName: e.lastName,
          userRole: e.userRole,
          passwordResetRequired: e.passwordResetRequired,
          id: e.id
        }),
          e.userRole === c.RECRUITER
            ? s(`${w(r.organization_name)}/dashboard/pool-companies`)
            : s(`${w(r.organization_name)}/dashboard/profile`),
          y('Login successfully !'));
      } catch (e) {
        O.isAxiosError(e)
          ? d(
              'Login failed: ' +
                (((b = (t = e.response) == null ? void 0 : t.data) == null
                  ? void 0
                  : b.message) || 'Unknown error')
            )
          : d('An unexpected error occurred.');
      }
    };
    return o.jsxs(H, {
      className: 'flex h-screen w-full transition-colors duration-500 ease-out',
      style: { background: `linear-gradient(135deg, ${f} 0%, #f8f9fa 100%)` },
      children: [
        o.jsxs('div', {
          className:
            'hidden md:flex w-1/2 flex-col items-center justify-center p-8 transition-all duration-500 ease-out',
          style: {
            backgroundColor: f,
            color: x,
            borderRadius: '0 100px 100px 0',
            boxShadow: '4px 0 12px rgba(0, 0, 0, 0.15)'
          },
          children: [
            o.jsx('img', {
              src: r.organization_theme.logo,
              alt: r.organization_name,
              className:
                'max-h-28 rounded-3xl object-contain transition-transform duration-300 ease-out hover:scale-105 mb-6'
            }),
            o.jsxs('div', {
              className: 'text-center transition-colors duration-500 ease-out',
              children: [
                o.jsx('h2', {
                  className: 'text-5xl font-bold mb-5',
                  children: 'Welcome Back !'
                }),
                o.jsxs('div', {
                  className: 'flex items-center justify-center gap-2 mb-2',
                  children: [
                    o.jsx('div', {
                      className:
                        'w-8 h-0.5 transition-colors duration-500 ease-out',
                      style: { backgroundColor: a.button.color }
                    }),
                    o.jsx('span', {
                      className:
                        'text-sm font-medium uppercase tracking-wider transition-colors duration-500 ease-out',
                      style: { color: a.button.color },
                      children: 'Employee Portal'
                    }),
                    o.jsx('div', {
                      className:
                        'w-8 h-0.5 transition-colors duration-500 ease-out',
                      style: { backgroundColor: a.button.color }
                    })
                  ]
                })
              ]
            })
          ]
        }),
        o.jsx('div', {
          className: 'flex w-full md:w-1/2 justify-center items-center px-6',
          children: o.jsxs(M, {
            onSubmit: v(k),
            className:
              'shadow-lg border rounded-2xl p-8 max-w-md w-full transition-all duration-500 ease-out',
            children: [
              o.jsx('h1', {
                className:
                  'text-3xl font-bold text-center mb-6 transition-colors duration-500 ease-out',
                style: { color: x },
                children: 'Employee Login'
              }),
              o.jsx('div', {
                className: 'mb-4',
                children: o.jsx(W, {
                  ...u('email'),
                  label: 'Email',
                  autoComplete: 'off',
                  placeholder: 'Enter your email',
                  error: (g = p.email) == null ? void 0 : g.message,
                  classNames: {
                    input: 'rounded-xl shadow-sm focus:border-blue-500',
                    label: 'font-medium mb-1'
                  },
                  leftSection: o.jsx(G, { size: 18 })
                })
              }),
              o.jsx('div', {
                className: 'mb-4',
                children: o.jsx(J, {
                  ...u('password'),
                  label: 'Password',
                  placeholder: 'Password',
                  error: (h = p.password) == null ? void 0 : h.message,
                  leftSection: o.jsx('span', { children: o.jsx(U, {}) })
                })
              }),
              o.jsx('div', {
                className: 'flex justify-end items-center mt-4 mb-6',
                children: o.jsx('button', {
                  type: 'button',
                  onClick: () => n(!0),
                  className: 'text-sm hover:underline transition-colors',
                  style: { color: E },
                  children: 'Forgot Password?'
                })
              }),
              o.jsx(Q, {
                type: 'submit',
                'data-testid': 'loginButton',
                className:
                  'w-full rounded-full font-semibold transition-all duration-200',
                disabled: l,
                style: { color: C.textColor, borderRadius: 8 },
                styles: {
                  root: {
                    '&:hover': { opacity: 0.9, transform: 'scale(1.01)' },
                    '&:disabled': { opacity: 0.6, cursor: 'not-allowed' }
                  }
                },
                leftSection: l
                  ? o.jsx(I, { size: 'xs', minHeight: '20px' })
                  : o.jsx(X, { size: 18 }),
                children: l ? 'Logging in...' : 'Log in'
              })
            ]
          })
        }),
        o.jsx(L, {
          opened: R,
          onClose: () => n(!1),
          title: 'Forgot Password',
          centered: !0,
          size: 'md',
          children: o.jsx($, { closeModal: () => n(!1) })
        })
      ]
    });
  };
export { yo as default };
