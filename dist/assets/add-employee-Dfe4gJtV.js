import {
  C as _,
  v as V,
  e as Z,
  j as e,
  S as c,
  G as x,
  T as d,
  D as w
} from './index-Cn_-nzwF.js';
import {
  o as H,
  e as J,
  s as u,
  u as K,
  t as Q,
  C as X
} from './zod-DC47Kjo4.js';
import { u as Y } from './useAdminMutations-ClNNh0wK.js';
import { c as ee } from './api-client-CcbR4Lbf.js';
import { o as I } from './button-D3DmOMH8.js';
import { T as re } from './background-IMiwGkbJ.js';
import { C as f } from './CommonButton-D8AVyhIy.js';
import { C as oe } from './Container-3LzVKj3b.js';
import { C as se } from './Card-BOCM3d4L.js';
import { P as te } from './Progress-2p2Kyjwk.js';
import { A as ae } from './Alert-Br9n4AyK.js';
import { I as ie } from './IconAlertCircle-BuevHmWi.js';
import { G as s } from './Grid-CH2QJG7V.js';
import { T as p } from './TextInput-DUPEWkCs.js';
import { I as v } from './IconUser-BXnFItyZ.js';
import { I as le } from './IconMail-BTX-Af1g.js';
import { I as ne } from './IconPhone-BEZBDdov.js';
import { S as me } from './Select-KZOOD-9X.js';
import { I as ce } from './IconUserCheck-CwRNgvtA.js';
import { I as de } from './IconArrowLeft-DGaJMG-t.js';
import { I as F } from './IconCircleDashedCheck-DJMlYteh.js';
import './useMutation-bizDVTFN.js';
import './admin-services-CTc0QqQI.js';
import './common-services-DPGUVDMw.js';
import './useAdminQueries-CeOlvTzF.js';
import './useQuery-4fhBkLAX.js';
import './Input-kzRYOXAd.js';
import './get-auto-contrast-value-Da6zqqWm.js';
import './createReactComponent-wv-YgGrS.js';
import './get-base-value-BKGvYumc.js';
import './InputBase-CO8vJiWZ.js';
import './use-input-props-CLa6mLr2.js';
import './OptionsDropdown-B_GLZDf8.js';
import './CheckIcon-CpIg4BN2.js';
import './Popover-C5NzMGSx.js';
import './get-floating-position-TyKNLeXJ.js';
import './use-uncontrolled-C8lBt68W.js';
const T = H({
    firstName: u()
      .min(1, { message: 'First name is required' })
      .regex(/^[A-Za-z ]+$/, {
        message: 'First name must contain only letters and spaces'
      }),
    lastName: u()
      .min(1, { message: 'Last name is required' })
      .regex(/^[A-Za-z ]+$/, {
        message: 'Last name must contain only letters and spaces'
      }),
    email: u().email({ message: 'Email is required' }),
    mobileNumber: u()
      .min(10, { message: 'Phone number must be 10 digits' })
      .max(10, { message: 'Phone number must be 10 digits' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
    userRole: J(['Employee', 'Recruiter', 'ContentWriter'])
  }),
  ue = [
    { label: 'Employee', value: 'Employee' },
    { label: 'Recruiter', value: 'Recruiter' },
    { label: ' Content Writer', value: 'ContentWriter' }
  ],
  Ke = () => {
    var z, N, R, A;
    const b = _(),
      { themeConfig: r, organizationConfig: C } = V(),
      { mutateAsync: P } = Y(),
      [j, g] = Z.useState(null),
      {
        register: n,
        handleSubmit: $,
        reset: y,
        control: q,
        getValues: h,
        watch: U,
        formState: { errors: t, isSubmitting: m, isValid: L, isDirty: E }
      } = K({ resolver: Q(T), mode: 'onChange' }),
      B = U(),
      G = Object.values(B).filter(
        o => o && o.toString().trim().length > 0
      ).length,
      M = Object.keys(T.shape).length,
      S = Math.round((G / M) * 100),
      D = async o => {
        var a, k;
        try {
          (g(null), await P(o));
          const i = h('userRole'),
            l = i.charAt(0).toUpperCase() + i.slice(1);
          (w.success(
            `${l} "${h('firstName')} ${h('lastName')}" created successfully!`,
            {
              style: {
                color: r.color,
                backgroundColor: r.backgroundColor,
                border: `1px solid ${r.borderColor}`
              },
              progressStyle: { background: r.button.color },
              icon: e.jsx(F, { size: 24 }),
              position: 'top-right',
              autoClose: 4e3
            }
          ),
            y(),
            b(`${I(C.organization_name)}/dashboard`));
        } catch (i) {
          let l = 'An unexpected error occurred.';
          (ee.isAxiosError(i) &&
            (l =
              ((k = (a = i.response) == null ? void 0 : a.data) == null
                ? void 0
                : k.message) || 'Failed to create employee'),
            g(l),
            w.error(l, {
              style: { color: r.color, backgroundColor: r.backgroundColor }
            }));
        }
      },
      O = () => {
        b(`${I(C.organization_name)}/dashboard`);
      },
      W = () => {
        window.confirm('Are you sure you want to clear all form data?') &&
          (y(), g(null));
      };
    return e.jsx(oe, {
      size: 'md',
      py: 'xl',
      children: e.jsx(re, {
        children: e.jsx(se, {
          shadow: 'lg',
          radius: 'md',
          withBorder: !0,
          p: 'xl',
          style: {
            backgroundColor: r.backgroundColor,
            borderColor: r.borderColor
          },
          children: e.jsxs(c, {
            gap: 'lg',
            children: [
              e.jsx(x, {
                justify: 'space-between',
                align: 'flex-start',
                children: e.jsxs(c, {
                  gap: 'xs',
                  children: [
                    e.jsx(d, {
                      size: 'xl',
                      fw: 700,
                      c: r.color,
                      children: 'Add New Employee'
                    }),
                    e.jsx(d, {
                      size: 'sm',
                      c: 'dimmed',
                      children:
                        'Fill in the details below to create a new employee account'
                    })
                  ]
                })
              }),
              E &&
                e.jsxs(c, {
                  gap: 'xs',
                  children: [
                    e.jsxs(x, {
                      justify: 'space-between',
                      children: [
                        e.jsx(d, {
                          size: 'sm',
                          c: 'dimmed',
                          children: 'Form Progress'
                        }),
                        e.jsxs(d, {
                          size: 'sm',
                          c: 'dimmed',
                          children: [S, '%']
                        })
                      ]
                    }),
                    e.jsx(te, {
                      value: S,
                      size: 'sm',
                      color: r.button.color,
                      radius: 'xl'
                    })
                  ]
                }),
              j &&
                e.jsx(ae, {
                  icon: e.jsx(ie, { size: 16 }),
                  color: 'red',
                  title: 'Error',
                  variant: 'light',
                  children: j
                }),
              e.jsx('form', {
                onSubmit: $(D),
                children: e.jsxs(c, {
                  gap: 'md',
                  children: [
                    e.jsxs(s, {
                      children: [
                        e.jsx(s.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(p, {
                            label: 'First Name',
                            placeholder: 'Enter first name',
                            leftSection: e.jsx(v, { size: 16 }),
                            ...n('firstName'),
                            autoComplete: 'off',
                            error:
                              (z = t.firstName) == null ? void 0 : z.message,
                            required: !0
                          })
                        }),
                        e.jsx(s.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(p, {
                            label: 'Last Name',
                            placeholder: 'Enter last name',
                            leftSection: e.jsx(v, { size: 16 }),
                            ...n('lastName'),
                            autoComplete: 'off',
                            error:
                              (N = t.lastName) == null ? void 0 : N.message,
                            required: !0
                          })
                        }),
                        e.jsx(s.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(p, {
                            label: 'Email Address',
                            placeholder: 'Enter email address',
                            type: 'email',
                            leftSection: e.jsx(le, { size: 16 }),
                            ...n('email'),
                            autoComplete: 'off',
                            error: (R = t.email) == null ? void 0 : R.message,
                            required: !0
                          })
                        }),
                        e.jsx(s.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(p, {
                            label: 'Phone Number',
                            placeholder: 'Enter phone number',
                            type: 'tel',
                            autoComplete: 'off',
                            leftSection: e.jsx(ne, { size: 16 }),
                            ...n('mobileNumber'),
                            error:
                              (A = t.mobileNumber) == null ? void 0 : A.message,
                            required: !0
                          })
                        }),
                        e.jsx(s.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(X, {
                            name: 'userRole',
                            control: q,
                            render: ({ field: o }) => {
                              var a;
                              return e.jsx(me, {
                                label: 'User Role',
                                placeholder: 'Select user role',
                                leftSection: e.jsx(ce, { size: 16 }),
                                data: ue,
                                ...o,
                                error:
                                  (a = t.userRole) == null ? void 0 : a.message,
                                required: !0,
                                autoComplete: 'off',
                                searchable: !0,
                                clearable: !0
                              });
                            }
                          })
                        })
                      ]
                    }),
                    e.jsxs(x, {
                      justify: 'flex-end',
                      gap: 'md',
                      mt: 'xl',
                      children: [
                        e.jsx(f, {
                          variant: 'subtle',
                          leftSection: e.jsx(de, { size: 16 }),
                          onClick: O,
                          children: 'Cancel'
                        }),
                        E &&
                          e.jsx(f, {
                            variant: 'light',
                            color: 'orange',
                            onClick: W,
                            children: 'Reset Form'
                          }),
                        e.jsx(f, {
                          type: 'submit',
                          loading: m,
                          disabled: !L || m,
                          leftSection: !m && e.jsx(F, { size: 16 }),
                          loaderProps: {
                            size: 'sm',
                            color: r.button.textColor
                          },
                          style: {
                            backgroundColor: r.button.color,
                            color: r.button.textColor
                          },
                          children: m
                            ? 'Creating Employee...'
                            : 'Create Employee'
                        })
                      ]
                    })
                  ]
                })
              })
            ]
          })
        })
      })
    });
  };
export { Ke as default };
