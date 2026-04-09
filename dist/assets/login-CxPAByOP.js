import {
  C as h,
  v as S,
  t as C,
  e as x,
  j as e,
  P as I,
  Q as P
} from './index-Cn_-nzwF.js';
import { u as T, t as k } from './zod-DC47Kjo4.js';
import { T as A, I as z, F as L, l as E } from './form-CTEBzu5k.js';
import { o as F } from './button-D3DmOMH8.js';
import { l as R } from './common-services-DPGUVDMw.js';
import { R as j, c as M } from './api-client-CcbR4Lbf.js';
import { u as b } from './toast-Cmrx_Mrb.js';
import { T as B } from './background-IMiwGkbJ.js';
import { C as D } from './CommonButton-D8AVyhIy.js';
import { T as H } from './TextInput-DUPEWkCs.js';
import { I as O } from './IconMail-BTX-Af1g.js';
import { P as U } from './PasswordInput-CGTZTn1Z.js';
import './createReactComponent-wv-YgGrS.js';
import './buttons-A92fQUY5.js';
import './IconArrowLeft-DGaJMG-t.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './IconX-BFEQcM8f.js';
import './InputBase-CO8vJiWZ.js';
import './Input-kzRYOXAd.js';
import './use-input-props-CLa6mLr2.js';
import './ActionIcon-BBM-Tm4F.js';
import './use-uncontrolled-C8lBt68W.js';
const W = () => {
    const { showSuccessToast: n, showErrorToast: o } = b(),
      l = h();
    return {
      submit: async (r, m) => {
        var s, a;
        try {
          (await R(r)).userRole === j.ADMIN
            ? (n('Login successfully!'), l(`${F(m)}/dashboard`))
            : o('Not authorized to access');
        } catch (i) {
          M.isAxiosError(i)
            ? o(
                'Login failed: ' +
                  (((a = (s = i.response) == null ? void 0 : s.data) == null
                    ? void 0
                    : a.message) ?? 'Unknown error')
              )
            : o('An unexpected error occurred.');
        }
      }
    };
  },
  ge = () => {
    var g, f;
    const n = h(),
      { themeConfig: o, organizationConfig: l } = S(),
      { showErrorToast: c } = b(),
      { organization: r = '' } = C(),
      [m, s] = x.useState(!1),
      {
        register: a,
        handleSubmit: i,
        formState: { errors: u, isSubmitting: d }
      } = T({ resolver: k(E) }),
      { submit: w } = W(),
      v = t => {
        w(t, r);
      };
    return (
      x.useEffect(() => {
        const t = localStorage.getItem('token'),
          y = localStorage.getItem('userRole'),
          p = localStorage.getItem('createdAt');
        if (t && y === j.ADMIN && p) {
          const N = new Date(p).getTime();
          (Date.now() - N) / (1e3 * 60 * 60) <= 24
            ? n(`/${r}/admin/dashboard`)
            : (localStorage.removeItem('token'),
              localStorage.removeItem('createdAt'),
              c('Session expired. Please login again.'));
        }
      }, [n, r, c]),
      e.jsxs(B, {
        className: 'flex justify-center items-center h-screen px-4',
        children: [
          e.jsxs(A, {
            onSubmit: i(v),
            children: [
              e.jsxs('div', {
                className: 'flex flex-col items-center',
                children: [
                  e.jsxs('div', {
                    className: 'relative mb-6',
                    children: [
                      e.jsx('img', {
                        src: l.organization_theme.logo,
                        className:
                          'max-h-32 rounded-3xl object-contain transition-transform duration-300 hover:scale-105',
                        alt: l.organization_name
                      }),
                      e.jsx('div', {
                        className:
                          'absolute -inset-1 rounded-full opacity-20 blur-lg transition-opacity duration-300',
                        style: { backgroundColor: o.button.color }
                      })
                    ]
                  }),
                  e.jsxs('div', {
                    className: 'text-center mb-6',
                    children: [
                      e.jsx('h1', {
                        className:
                          'text-2xl font-bold mb-2 transition-colors duration-300 ease-in-out',
                        style: { color: o.color },
                        children: 'Welcome Back'
                      }),
                      e.jsxs('div', {
                        className:
                          'flex items-center justify-center gap-2 mb-2',
                        children: [
                          e.jsx('div', {
                            className:
                              'w-8 h-0.5 transition-colors duration-300',
                            style: { backgroundColor: o.button.color }
                          }),
                          e.jsx('span', {
                            className:
                              'text-sm font-medium uppercase tracking-wider transition-colors duration-300',
                            style: { color: o.button.color },
                            children: 'Admin Portal'
                          }),
                          e.jsx('div', {
                            className:
                              'w-8 h-0.5 transition-colors duration-300',
                            style: { backgroundColor: o.button.color }
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              e.jsx('div', {
                className: 'mb-4',
                children: e.jsx(H, {
                  ...a('email'),
                  label: 'Email',
                  placeholder: 'Enter your email',
                  autoComplete: 'off',
                  error: (g = u.email) == null ? void 0 : g.message,
                  onChange: t => {
                    t.target.value = t.target.value.replace(/\s/g, '');
                  },
                  leftSection: e.jsx(O, { size: 18 })
                })
              }),
              e.jsx('div', {
                className: 'mb-4',
                children: e.jsx(U, {
                  ...a('password'),
                  label: 'Password',
                  placeholder: 'Password',
                  error: (f = u.password) == null ? void 0 : f.message,
                  leftSection: e.jsx('span', {
                    children: e.jsx(z, { size: 18 })
                  })
                })
              }),
              e.jsxs('div', {
                className:
                  'flex flex-wrap justify-between items-center gap-4 mt-8',
                children: [
                  e.jsx('div', {
                    className:
                      'w-full md:w-auto flex justify-center md:justify-start order-2 md:order-1',
                    children: e.jsx('button', {
                      type: 'button',
                      onClick: () => s(!0),
                      className:
                        'text-sm underline hover:opacity-80 transition-all duration-300 ease-in-out',
                      style: { color: o.linkColor },
                      children: 'Forgot Password'
                    })
                  }),
                  e.jsx('div', {
                    className:
                      'w-full md:w-auto flex justify-center order-1 md:order-2',
                    children: e.jsx(D, {
                      type: 'submit',
                      'data-testid': 'loginButton',
                      className: 'w-1/2 md:w-auto',
                      style: { minWidth: '200px' },
                      disabled: d,
                      leftSection:
                        d && e.jsx(I, { size: 'xs', minHeight: '20px' }),
                      children: d ? 'Logging in...' : 'Login'
                    })
                  })
                ]
              })
            ]
          }),
          e.jsx(P, {
            opened: m,
            onClose: () => s(!1),
            title: 'Reset your password',
            centered: !0,
            size: 'md',
            transitionProps: {
              transition: 'slide-right',
              duration: 300,
              timingFunction: 'ease'
            },
            children: e.jsx(L, { closeModal: () => s(!1) })
          })
        ]
      })
    );
  };
export { ge as default };
