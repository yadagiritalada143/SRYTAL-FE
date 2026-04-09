import {
  C as V,
  v as X,
  s as F,
  j as e,
  S as r,
  G as l,
  T as m,
  P as Y
} from './index-Cn_-nzwF.js';
import { u as Z, t as $ } from './zod-DC47Kjo4.js';
import { a as ee } from './add-company-hIloRGvy.js';
import { u as se } from './toast-Cmrx_Mrb.js';
import { u as ae } from './useUserMutations-BavkaDsw.js';
import { C as c } from './CommonButton-D8AVyhIy.js';
import { C as te } from './Container-3LzVKj3b.js';
import { C as i } from './Card-BOCM3d4L.js';
import { c as oe } from './createReactComponent-wv-YgGrS.js';
import { I as re } from './IconArrowLeft-DGaJMG-t.js';
import { T as o } from './TextInput-DUPEWkCs.js';
import { D as p } from './Divider-C8nnAxUa.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './IconX-BFEQcM8f.js';
import './useMutation-bizDVTFN.js';
import './button-D3DmOMH8.js';
import './api-client-CcbR4Lbf.js';
import './useUserQueries-m-8gfZ67.js';
import './useQuery-4fhBkLAX.js';
import './common-services-DPGUVDMw.js';
import './InputBase-CO8vJiWZ.js';
import './Input-kzRYOXAd.js';
import './use-input-props-CLa6mLr2.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const me = [
    ['path', { d: 'M3 21l18 0', key: 'svg-0' }],
    ['path', { d: 'M9 8l1 0', key: 'svg-1' }],
    ['path', { d: 'M9 12l1 0', key: 'svg-2' }],
    ['path', { d: 'M9 16l1 0', key: 'svg-3' }],
    ['path', { d: 'M14 8l1 0', key: 'svg-4' }],
    ['path', { d: 'M14 12l1 0', key: 'svg-5' }],
    ['path', { d: 'M14 16l1 0', key: 'svg-6' }],
    [
      'path',
      { d: 'M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16', key: 'svg-7' }
    ]
  ],
  G = oe('outline', 'building', 'Building', me),
  Me = () => {
    var x, y, C, f, g, j, b, w, z, v, k, S, E, _, A, M, N, T, B;
    const h = V(),
      { themeConfig: D } = X(),
      { showSuccessToast: L, showErrorToast: R } = se(),
      { mutateAsync: W, isPending: H } = ae(),
      s = F('(max-width: 768px)'),
      O = F('(max-width: 500px)'),
      {
        register: a,
        formState: { errors: t, isSubmitting: Q },
        handleSubmit: q,
        reset: J
      } = Z({ resolver: $(ee) }),
      n = H || Q,
      K = async U => {
        var P, I;
        try {
          (await W(U), J(), L('Company added successfully!'), h(-1));
        } catch (d) {
          R(
            ((I =
              (P = d == null ? void 0 : d.response) == null
                ? void 0
                : P.data) == null
              ? void 0
              : I.message) || 'Failed to add company'
          );
        }
      },
      u = () => {
        h(-1);
      };
    return e.jsx(te, {
      size: 'lg',
      py: 'md',
      my: 'xl',
      mt: 70,
      px: O ? 'xs' : 'md',
      style: { backgroundColor: D.backgroundColor },
      children: e.jsxs(r, {
        gap: 'md',
        children: [
          e.jsx(i, {
            shadow: 'sm',
            p: s ? 'md' : 'lg',
            radius: 'md',
            withBorder: !0,
            children: e.jsxs(l, {
              justify: 'space-between',
              wrap: 'wrap',
              children: [
                e.jsxs(l, {
                  gap: 'sm',
                  children: [
                    e.jsx(G, { size: s ? 24 : 28 }),
                    e.jsx(m, {
                      size: s ? 'lg' : 'xl',
                      fw: 700,
                      ta: s ? 'center' : 'left',
                      children: 'Add New Company'
                    })
                  ]
                }),
                e.jsx(c, {
                  onClick: u,
                  variant: 'light',
                  size: s ? 'xs' : 'sm',
                  children: e.jsx(re, { size: 18 })
                })
              ]
            })
          }),
          e.jsx(i, {
            shadow: 'sm',
            p: s ? 'md' : 'xl',
            radius: 'md',
            withBorder: !0,
            children: e.jsx('form', {
              onSubmit: q(K),
              children: e.jsxs(r, {
                gap: 'lg',
                children: [
                  e.jsxs('div', {
                    children: [
                      e.jsx(m, {
                        size: 'lg',
                        fw: 600,
                        mb: 'md',
                        children: 'Company Information'
                      }),
                      e.jsx(o, {
                        ...a('companyName'),
                        label: 'Company Name',
                        placeholder: 'Enter company name',
                        error: (x = t.companyName) == null ? void 0 : x.message,
                        size: s ? 'sm' : 'md',
                        withAsterisk: !0,
                        autoComplete: 'off'
                      })
                    ]
                  }),
                  e.jsx(p, {}),
                  e.jsxs('div', {
                    children: [
                      e.jsx(m, {
                        size: 'lg',
                        fw: 600,
                        mb: 'md',
                        children: 'Primary Contact'
                      }),
                      e.jsxs(r, {
                        gap: 'md',
                        children: [
                          e.jsx(o, {
                            ...a('primaryContact.name'),
                            label: 'Name',
                            placeholder: 'Enter contact name',
                            error:
                              (C =
                                (y = t.primaryContact) == null
                                  ? void 0
                                  : y.name) == null
                                ? void 0
                                : C.message,
                            size: s ? 'sm' : 'md',
                            withAsterisk: !0,
                            autoComplete: 'off'
                          }),
                          e.jsx(o, {
                            ...a('primaryContact.email'),
                            label: 'Email',
                            placeholder: 'Enter email address',
                            error:
                              (g =
                                (f = t.primaryContact) == null
                                  ? void 0
                                  : f.email) == null
                                ? void 0
                                : g.message,
                            size: s ? 'sm' : 'md',
                            type: 'email',
                            withAsterisk: !0,
                            autoComplete: 'off'
                          }),
                          e.jsx(o, {
                            ...a('primaryContact.phone'),
                            label: 'Phone',
                            placeholder: 'Enter phone number',
                            error:
                              (b =
                                (j = t.primaryContact) == null
                                  ? void 0
                                  : j.phone) == null
                                ? void 0
                                : b.message,
                            size: s ? 'sm' : 'md',
                            withAsterisk: !0,
                            autoComplete: 'off'
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsx(p, {}),
                  e.jsxs('div', {
                    children: [
                      e.jsx(m, {
                        size: 'lg',
                        fw: 600,
                        mb: 'md',
                        children: 'Secondary Contacts (Optional)'
                      }),
                      e.jsxs(r, {
                        gap: 'lg',
                        children: [
                          e.jsx(i, {
                            p: 'md',
                            withBorder: !0,
                            children: e.jsxs(r, {
                              gap: 'md',
                              children: [
                                e.jsx(m, {
                                  size: 'md',
                                  fw: 500,
                                  c: 'dimmed',
                                  children: 'Secondary Contact 1'
                                }),
                                e.jsx(o, {
                                  ...a('secondaryContact_1.name'),
                                  label: 'Name',
                                  placeholder: 'Enter contact name',
                                  error:
                                    (z =
                                      (w = t.secondaryContact_1) == null
                                        ? void 0
                                        : w.name) == null
                                      ? void 0
                                      : z.message,
                                  size: s ? 'sm' : 'md',
                                  autoComplete: 'off'
                                }),
                                e.jsx(o, {
                                  ...a('secondaryContact_1.email'),
                                  label: 'Email',
                                  placeholder: 'Enter email address',
                                  error:
                                    (k =
                                      (v = t.secondaryContact_1) == null
                                        ? void 0
                                        : v.email) == null
                                      ? void 0
                                      : k.message,
                                  size: s ? 'sm' : 'md',
                                  type: 'email',
                                  autoComplete: 'off'
                                }),
                                e.jsx(o, {
                                  ...a('secondaryContact_1.phone'),
                                  label: 'Phone',
                                  placeholder: 'Enter phone number',
                                  error:
                                    (E =
                                      (S = t.secondaryContact_1) == null
                                        ? void 0
                                        : S.phone) == null
                                      ? void 0
                                      : E.message,
                                  size: s ? 'sm' : 'md',
                                  autoComplete: 'off'
                                })
                              ]
                            })
                          }),
                          e.jsx(i, {
                            p: 'md',
                            withBorder: !0,
                            children: e.jsxs(r, {
                              gap: 'md',
                              children: [
                                e.jsx(m, {
                                  size: 'md',
                                  fw: 500,
                                  c: 'dimmed',
                                  children: 'Secondary Contact 2'
                                }),
                                e.jsx(o, {
                                  ...a('secondaryContact_2.name'),
                                  label: 'Name',
                                  placeholder: 'Enter contact name',
                                  error:
                                    (A =
                                      (_ = t.secondaryContact_2) == null
                                        ? void 0
                                        : _.name) == null
                                      ? void 0
                                      : A.message,
                                  size: s ? 'sm' : 'md',
                                  autoComplete: 'off'
                                }),
                                e.jsx(o, {
                                  ...a('secondaryContact_2.email'),
                                  label: 'Email',
                                  placeholder: 'Enter email address',
                                  error:
                                    (N =
                                      (M = t.secondaryContact_2) == null
                                        ? void 0
                                        : M.email) == null
                                      ? void 0
                                      : N.message,
                                  size: s ? 'sm' : 'md',
                                  type: 'email',
                                  autoComplete: 'off'
                                }),
                                e.jsx(o, {
                                  ...a('secondaryContact_2.phone'),
                                  label: 'Phone',
                                  placeholder: 'Enter phone number',
                                  error:
                                    (B =
                                      (T = t.secondaryContact_2) == null
                                        ? void 0
                                        : T.phone) == null
                                      ? void 0
                                      : B.message,
                                  size: s ? 'sm' : 'md',
                                  autoComplete: 'off'
                                })
                              ]
                            })
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsx(p, {}),
                  e.jsxs(l, {
                    justify: 'flex-end',
                    mt: 'md',
                    children: [
                      e.jsx(c, {
                        type: 'button',
                        variant: 'light',
                        onClick: u,
                        disabled: n,
                        size: s ? 'xs' : 'sm',
                        fullWidth: s,
                        children: 'Cancel'
                      }),
                      e.jsx(c, {
                        type: 'submit',
                        disabled: n,
                        size: s ? 'xs' : 'sm',
                        fullWidth: s,
                        leftSection: n
                          ? e.jsx(Y, { size: 'xs', minHeight: '20px' })
                          : e.jsx(G, { size: 16 }),
                        children: n ? 'Adding Company...' : 'Add Company'
                      })
                    ]
                  })
                ]
              })
            })
          })
        ]
      })
    });
  };
export { Me as default };
