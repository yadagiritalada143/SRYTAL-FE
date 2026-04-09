import { c as F } from './createReactComponent-wv-YgGrS.js';
import {
  aA as G,
  K as _,
  e as I,
  j as e,
  J as O,
  s as P,
  v as J,
  S as t,
  G as n,
  T as a,
  a5 as d
} from './index-Cn_-nzwF.js';
import { c as Q } from './useUserQueries-m-8gfZ67.js';
import { u as q } from './toast-Cmrx_Mrb.js';
import { u as H } from './useMutation-bizDVTFN.js';
import { u as K } from './common-services-DPGUVDMw.js';
import { u as W } from './button-D3DmOMH8.js';
import { I as k } from './IconUser-BXnFItyZ.js';
import { I as U } from './IconUpload-C0QLgWKY.js';
import { C as $ } from './Container-3LzVKj3b.js';
import { C as A } from './Card-BOCM3d4L.js';
import { T as V } from './Title-T3OvY56h.js';
import { a as D, I as M, b as R, c as X } from './IconUserCog-CNTxfMfa.js';
import { B as b } from './Badge-pr8cFvg5.js';
import { D as Y } from './Divider-C8nnAxUa.js';
import { G as l } from './Grid-CH2QJG7V.js';
import { I as S } from './IconCalendar-Cp3De190.js';
import { I as Z } from './IconDroplet-BIln8pIB.js';
import { I as ee } from './IconMail-BTX-Af1g.js';
import { I as oe } from './IconPhone-BEZBDdov.js';
import { T as m } from './Tabs-asIDgMUj.js';
import { I as L } from './IconBriefcase-C5ZKuHUX.js';
import { I as y } from './IconBuildingBank-DjT6Mwz6.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const se = [
    ['path', { d: 'M12 6l0 -3', key: 'svg-0' }],
    ['path', { d: 'M16.25 7.75l2.15 -2.15', key: 'svg-1' }],
    ['path', { d: 'M18 12l3 0', key: 'svg-2' }],
    ['path', { d: 'M16.25 16.25l2.15 2.15', key: 'svg-3' }],
    ['path', { d: 'M12 18l0 3', key: 'svg-4' }],
    ['path', { d: 'M7.75 16.25l-2.15 2.15', key: 'svg-5' }],
    ['path', { d: 'M6 12l-3 0', key: 'svg-6' }],
    ['path', { d: 'M7.75 7.75l-2.15 -2.15', key: 'svg-7' }]
  ],
  re = F('outline', 'loader', 'Loader', se);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const le = [
    ['path', { d: 'M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4', key: 'svg-0' }],
    ['path', { d: 'M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4', key: 'svg-1' }]
  ],
  Ae = F('outline', 'refresh', 'Refresh', le),
  ae = () => {
    const s = G();
    return H({
      mutationFn: ({ file: r, userId: o }) => K(r, o),
      onSuccess: () => {
        s.invalidateQueries({ queryKey: ['profileImage'] });
      }
    });
  },
  te = () => {
    const s = _(W),
      { data: r, isLoading: o, isError: w } = Q(),
      { mutateAsync: C, isPending: u } = ae(),
      { showSuccessToast: B, showErrorToast: v } = q(),
      [p, f] = I.useState(''),
      [x, g] = I.useState(null);
    I.useEffect(() => {
      if (r && r instanceof Blob) {
        const i = URL.createObjectURL(r);
        return (f(i), () => URL.revokeObjectURL(i));
      }
    }, [r]);
    const z = i => {
        var j;
        const h = (j = i.target.files) == null ? void 0 : j[0];
        if (h) {
          g(h);
          const E = URL.createObjectURL(h);
          f(E);
        }
      },
      T = async () => {
        var i, h;
        if (x)
          try {
            (await C({ file: x, userId: s.id }),
              B('Profile image updated successfully'),
              g(null));
          } catch (j) {
            v(
              ((h =
                (i = j == null ? void 0 : j.response) == null
                  ? void 0
                  : i.data) == null
                ? void 0
                : h.message) || 'Failed to upload image'
            );
          }
      },
      N = o || u;
    return (
      console.log('render', x),
      e.jsxs('div', {
        className: 'flex flex-col items-center',
        style: { width: '155px' },
        children: [
          e.jsxs('div', {
            className: 'relative group w-28 h-28 mx-3 mb-2',
            children: [
              N
                ? e.jsx('div', {
                    className:
                      'flex items-center justify-center w-full h-full bg-gray-200 rounded-full border-3 shadow-md',
                    children: e.jsx(re, {
                      className: 'animate-spin text-gray-500',
                      size: 40
                    })
                  })
                : p
                  ? e.jsx('img', {
                      src: p,
                      className:
                        'w-full h-full object-cover rounded-full border-3 shadow-md',
                      alt: 'Profile'
                    })
                  : e.jsx('div', {
                      className:
                        'flex items-center justify-center w-full h-full bg-gray-200 rounded-full border-3 shadow-md',
                      children: e.jsx(k, {
                        className: 'text-gray-500',
                        size: 40
                      })
                    }),
              e.jsx('div', {
                className: `absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ${p ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} transition-opacity`,
                style: { borderRadius: '55px', overflow: 'hidden' },
                children: e.jsxs('label', {
                  className:
                    'cursor-pointer flex flex-col items-center justify-center',
                  children: [
                    e.jsx(U, { className: 'text-white', size: 24 }),
                    e.jsx('span', {
                      className: 'text-white text-sm',
                      children: 'Upload Image'
                    }),
                    e.jsx('input', {
                      type: 'file',
                      className: 'hidden',
                      accept: 'image/*',
                      onChange: z
                    })
                  ]
                })
              })
            ]
          }),
          x &&
            e.jsx(O, {
              onClick: T,
              loading: u,
              size: 'xs',
              radius: 'xl',
              variant: 'light',
              leftSection: e.jsx(U, { size: 14 }),
              children: 'Confirm Upload'
            })
        ]
      })
    );
  },
  c = ({
    icon: s,
    label: r,
    value: o,
    mutedTextColor: w,
    iconColor: C,
    isMobile: u = !1
  }) =>
    e.jsx(d, {
      p: u ? 'xs' : 'sm',
      withBorder: !0,
      radius: 'md',
      children: e.jsxs(n, {
        gap: 'xs',
        wrap: 'nowrap',
        children: [
          e.jsx('div', { style: { color: C }, children: s }),
          e.jsxs(t, {
            gap: 2,
            style: { flex: 1 },
            children: [
              e.jsx(a, { size: 'xs', c: w, fw: 500, children: r }),
              e.jsx(a, {
                size: 'sm',
                fw: 500,
                lineClamp: 1,
                children: o || 'N/A'
              })
            ]
          })
        ]
      })
    }),
  Re = ({ details: s }) => {
    var p, f, x, g, z, T, N;
    const r = P('(max-width: 768px)'),
      { themeConfig: o, isDarkTheme: w } = J(),
      C = P('(max-width: 500px)'),
      [u, B] = I.useState('employment'),
      v = i => {
        if (!i) return '';
        try {
          return new Date(i).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
        } catch {
          return i;
        }
      };
    return e.jsx($, {
      size: 'xl',
      py: 'md',
      my: 'xl',
      px: C ? 'xs' : 'md',
      children: e.jsxs(t, {
        gap: 'md',
        children: [
          e.jsx(A, {
            shadow: 'sm',
            p: 'xs',
            radius: 'md',
            withBorder: !0,
            mt: 'xl',
            style: { color: o.color, borderColor: o.borderColor },
            children: e.jsx(t, {
              gap: 'lg',
              children: e.jsxs(n, {
                justify: 'space-between',
                wrap: r ? 'wrap' : 'nowrap',
                align: r ? 'flex-start' : 'center',
                children: [
                  e.jsxs(n, {
                    gap: 'md',
                    children: [
                      e.jsx('div', {
                        style: { borderRadius: '29px', overflow: 'hidden' },
                        children: e.jsx(te, {})
                      }),
                      e.jsxs(t, {
                        gap: 4,
                        children: [
                          e.jsxs(V, {
                            order: r ? 4 : 2,
                            children: [s.firstName, ' ', s.lastName]
                          }),
                          s.employeeId &&
                            e.jsxs(n, {
                              gap: 'xs',
                              children: [
                                e.jsx(D, { size: 16 }),
                                e.jsx(a, {
                                  size: 'sm',
                                  c: o.mutedTextColor,
                                  children: s.employeeId
                                })
                              ]
                            }),
                          r &&
                            e.jsx(b, {
                              size: r ? 'sm' : 'md',
                              variant: 'light',
                              color: o.accentColor,
                              w: 'fit-content',
                              children: s.userRole
                            })
                        ]
                      })
                    ]
                  }),
                  !r &&
                    s.userRole &&
                    e.jsx(b, {
                      size: 'md',
                      variant: 'light',
                      color: o.accentColor,
                      children: s.userRole
                    })
                ]
              })
            })
          }),
          e.jsx(A, {
            shadow: 'sm',
            p: r ? 'md' : 'lg',
            radius: 'md',
            withBorder: !0,
            style: { color: o.color, borderColor: o.borderColor },
            children: e.jsxs(t, {
              gap: 'md',
              children: [
                e.jsx(a, {
                  size: 'lg',
                  fw: 600,
                  children: 'Basic Information'
                }),
                e.jsx(Y, {}),
                e.jsxs(l, {
                  gutter: 'md',
                  children: [
                    e.jsx(l.Col, {
                      span: { base: 12, xs: 6, sm: 6, md: 4 },
                      children: e.jsx(c, {
                        icon: e.jsx(k, { size: 20, stroke: 1.8 }),
                        label: 'First Name',
                        value: s.firstName,
                        isMobile: r,
                        mutedTextColor: o.mutedTextColor,
                        iconColor: o.accentColor
                      })
                    }),
                    e.jsx(l.Col, {
                      span: { base: 12, xs: 6, sm: 6, md: 4 },
                      children: e.jsx(c, {
                        icon: e.jsx(k, { size: 20, stroke: 1.8 }),
                        label: 'Last Name',
                        value: s.lastName,
                        isMobile: r,
                        mutedTextColor: o.mutedTextColor,
                        iconColor: o.accentColor
                      })
                    }),
                    e.jsx(l.Col, {
                      span: { base: 12, xs: 6, sm: 6, md: 4 },
                      children: e.jsx(c, {
                        icon: e.jsx(S, { size: 18 }),
                        label: 'Date of Birth',
                        value: v(s.dateOfBirth),
                        isMobile: r,
                        mutedTextColor: o.mutedTextColor,
                        iconColor: o.accentColor
                      })
                    }),
                    e.jsx(l.Col, {
                      span: { base: 12, xs: 6, sm: 6, md: 4 },
                      children: e.jsx(c, {
                        icon: e.jsx(Z, { size: 18 }),
                        label: 'Blood Group',
                        value: (p = s.bloodGroup) == null ? void 0 : p.type,
                        isMobile: r,
                        mutedTextColor: o.mutedTextColor,
                        iconColor: o.accentColor
                      })
                    }),
                    e.jsx(l.Col, {
                      span: { base: 12, xs: 6, sm: 6, md: 4 },
                      children: e.jsx(c, {
                        icon: e.jsx(ee, { size: 18 }),
                        label: 'Email',
                        value: s.email,
                        isMobile: r,
                        mutedTextColor: o.mutedTextColor,
                        iconColor: o.accentColor
                      })
                    }),
                    e.jsx(l.Col, {
                      span: { base: 12, xs: 6, sm: 6, md: 4 },
                      children: e.jsx(c, {
                        icon: e.jsx(oe, { size: 18 }),
                        label: 'Mobile',
                        value: s.mobileNumber,
                        isMobile: r,
                        mutedTextColor: o.mutedTextColor,
                        iconColor: o.accentColor
                      })
                    }),
                    e.jsx(l.Col, {
                      span: { base: 12, xs: 6, sm: 6, md: 4 },
                      children: e.jsx(c, {
                        icon: e.jsx(M, { size: 18 }),
                        label: 'Aadhar Number',
                        value: s.aadharNumber,
                        isMobile: r,
                        mutedTextColor: o.mutedTextColor,
                        iconColor: o.accentColor
                      })
                    }),
                    e.jsx(l.Col, {
                      span: { base: 12, xs: 6, sm: 6, md: 4 },
                      children: e.jsx(c, {
                        icon: e.jsx(D, { size: 18 }),
                        label: 'PAN Card Number',
                        value: s.panCardNumber,
                        isMobile: r,
                        mutedTextColor: o.mutedTextColor,
                        iconColor: o.accentColor
                      })
                    }),
                    e.jsx(l.Col, {
                      span: { base: 12, xs: 6, sm: 6, md: 4 },
                      children: e.jsx(c, {
                        icon: e.jsx(M, { size: 18 }),
                        label: 'UAN Number',
                        value: s.uanNumber,
                        isMobile: r,
                        mutedTextColor: o.mutedTextColor,
                        iconColor: o.accentColor
                      })
                    }),
                    e.jsx(l.Col, {
                      span: { base: 12, xs: 6, sm: 6, md: 4 },
                      children: e.jsx(c, {
                        icon: e.jsx(S, { size: 18 }),
                        label: 'Date of Joining',
                        value: v(s.dateOfJoining),
                        isMobile: r,
                        mutedTextColor: o.mutedTextColor,
                        iconColor: o.accentColor
                      })
                    })
                  ]
                })
              ]
            })
          }),
          e.jsx(A, {
            shadow: 'sm',
            p: 0,
            radius: 'md',
            withBorder: !0,
            style: { color: o.color, borderColor: o.borderColor },
            children: e.jsxs(m, {
              value: u,
              onChange: B,
              variant: 'default',
              orientation: 'horizontal',
              classNames: { tab: 'settings-tab' },
              styles: {
                list: {
                  flexWrap: r ? 'wrap' : 'nowrap',
                  justifyContent: r ? 'center' : 'flex-start',
                  gap: r ? 8 : 0
                },
                tab: {
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  ...(w && {
                    color: o.color,
                    '&[data-active]': { color: '#ffffff' },
                    '&[data-active] svg': { color: '#ffffff' }
                  })
                }
              },
              children: [
                e.jsxs(m.List, {
                  mb: 'md',
                  children: [
                    e.jsx(m.Tab, {
                      value: 'employment',
                      leftSection: e.jsx(L, { size: 16, stroke: 1.8 }),
                      w: r ? '50%' : 'auto',
                      children: 'Employment'
                    }),
                    e.jsx(m.Tab, {
                      value: 'address',
                      leftSection: e.jsx(R, { size: 16, stroke: 1.8 }),
                      w: r ? '40%' : 'auto',
                      children: 'Address'
                    }),
                    e.jsx(m.Tab, {
                      value: 'bankDetails',
                      leftSection: e.jsx(y, { size: 16, stroke: 1.8 }),
                      mt: r ? 'sm' : '0',
                      children: 'Bank Details'
                    })
                  ]
                }),
                e.jsx(m.Panel, {
                  value: 'employment',
                  p: r ? 'md' : 'lg',
                  children: e.jsx(t, {
                    gap: 'md',
                    children: e.jsxs(l, {
                      gutter: 'md',
                      children: [
                        e.jsx(l.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(d, {
                            p: 'md',
                            withBorder: !0,
                            radius: 'md',
                            style: {
                              color: o.color,
                              borderColor: o.borderColor
                            },
                            children: e.jsxs(t, {
                              gap: 'xs',
                              children: [
                                e.jsxs(n, {
                                  gap: 'xs',
                                  align: 'center',
                                  children: [
                                    e.jsx(L, { size: 16, color: o.iconColor }),
                                    e.jsx(a, {
                                      size: 'xs',
                                      c: o.mutedTextColor,
                                      fw: 500,
                                      children: 'Employment Type'
                                    })
                                  ]
                                }),
                                e.jsx(b, {
                                  size: 'md',
                                  variant: 'light',
                                  color: o.successColor,
                                  children:
                                    ((f = s.employmentType) == null
                                      ? void 0
                                      : f.employmentType) || 'N/A'
                                })
                              ]
                            })
                          })
                        }),
                        e.jsx(l.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(d, {
                            p: 'md',
                            withBorder: !0,
                            radius: 'md',
                            style: {
                              color: o.color,
                              borderColor: o.borderColor
                            },
                            children: e.jsxs(t, {
                              gap: 'xs',
                              children: [
                                e.jsxs(n, {
                                  gap: 'xs',
                                  align: 'center',
                                  children: [
                                    e.jsx(X, { size: 16, color: o.iconColor }),
                                    e.jsx(a, {
                                      size: 'xs',
                                      c: o.mutedTextColor,
                                      fw: 500,
                                      children: 'Designations'
                                    })
                                  ]
                                }),
                                e.jsx(n, {
                                  gap: 'xs',
                                  wrap: 'wrap',
                                  children:
                                    s.employeeRole && s.employeeRole.length > 0
                                      ? s.employeeRole.map(i =>
                                          e.jsx(
                                            b,
                                            {
                                              size: 'md',
                                              variant: 'outline',
                                              color: o.accentColor,
                                              children: i.designation
                                            },
                                            i._id
                                          )
                                        )
                                      : e.jsx(a, {
                                          size: 'sm',
                                          c: o.mutedTextColor,
                                          children: 'N/A'
                                        })
                                })
                              ]
                            })
                          })
                        }),
                        e.jsx(l.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(d, {
                            p: 'md',
                            withBorder: !0,
                            radius: 'md',
                            style: {
                              color: o.color,
                              borderColor: o.borderColor
                            },
                            children: e.jsxs(t, {
                              gap: 'xs',
                              children: [
                                e.jsxs(n, {
                                  gap: 'xs',
                                  align: 'center',
                                  children: [
                                    e.jsx(y, { size: 16, color: o.iconColor }),
                                    e.jsx(a, {
                                      size: 'xs',
                                      c: o.mutedTextColor,
                                      fw: 500,
                                      children: 'Department'
                                    })
                                  ]
                                }),
                                (x = s.department) != null && x.departmentName
                                  ? e.jsx(b, {
                                      size: 'md',
                                      variant: 'outline',
                                      color: o.accentColor,
                                      children: s.department.departmentName
                                    })
                                  : e.jsx(a, {
                                      size: 'sm',
                                      c: o.mutedTextColor,
                                      children: 'N/A'
                                    })
                              ]
                            })
                          })
                        })
                      ]
                    })
                  })
                }),
                e.jsx(m.Panel, {
                  value: 'address',
                  p: r ? 'md' : 'lg',
                  children: e.jsxs(l, {
                    children: [
                      e.jsx(l.Col, {
                        span: { base: 12, sm: 6 },
                        children: e.jsx(d, {
                          p: 'md',
                          withBorder: !0,
                          radius: 'md',
                          style: { color: o.color, borderColor: o.borderColor },
                          children: e.jsxs(t, {
                            gap: 'xs',
                            children: [
                              e.jsxs(n, {
                                gap: 'xs',
                                children: [
                                  e.jsx(R, { size: 16, color: o.iconColor }),
                                  e.jsx(a, {
                                    size: 'xs',
                                    fw: 500,
                                    c: o.mutedTextColor,
                                    children: 'Present Address'
                                  })
                                ]
                              }),
                              e.jsx(a, {
                                size: 'sm',
                                children: s.presentAddress || 'N/A'
                              })
                            ]
                          })
                        })
                      }),
                      e.jsx(l.Col, {
                        span: { base: 12, sm: 6 },
                        children: e.jsx(d, {
                          p: 'md',
                          withBorder: !0,
                          radius: 'md',
                          style: { color: o.color, borderColor: o.borderColor },
                          children: e.jsxs(t, {
                            gap: 'xs',
                            children: [
                              e.jsxs(n, {
                                gap: 'xs',
                                children: [
                                  e.jsx(R, { size: 16, color: o.successColor }),
                                  e.jsx(a, {
                                    size: 'xs',
                                    fw: 500,
                                    c: o.mutedTextColor,
                                    children: 'Permanent Address'
                                  })
                                ]
                              }),
                              e.jsx(a, {
                                size: 'sm',
                                children: s.permanentAddress || 'N/A'
                              })
                            ]
                          })
                        })
                      })
                    ]
                  })
                }),
                e.jsx(m.Panel, {
                  value: 'bankDetails',
                  p: r ? 'md' : 'lg',
                  children: e.jsx(t, {
                    gap: 'md',
                    children: e.jsxs(l, {
                      gutter: 'md',
                      children: [
                        e.jsx(l.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(d, {
                            p: 'md',
                            withBorder: !0,
                            radius: 'md',
                            style: {
                              color: o.color,
                              borderColor: o.borderColor
                            },
                            children: e.jsxs(t, {
                              gap: 'xs',
                              children: [
                                e.jsxs(n, {
                                  gap: 'xs',
                                  align: 'center',
                                  children: [
                                    e.jsx(y, { size: 16, color: o.iconColor }),
                                    e.jsx(a, {
                                      size: 'xs',
                                      c: o.mutedTextColor,
                                      fw: 500,
                                      children: 'Account Number'
                                    })
                                  ]
                                }),
                                e.jsx(a, {
                                  size: 'sm',
                                  fw: 500,
                                  children:
                                    ((g = s.bankDetailsInfo) == null
                                      ? void 0
                                      : g.accountNumber) || 'N/A'
                                })
                              ]
                            })
                          })
                        }),
                        e.jsx(l.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(d, {
                            p: 'md',
                            withBorder: !0,
                            radius: 'md',
                            style: {
                              color: o.color,
                              borderColor: o.borderColor
                            },
                            children: e.jsxs(t, {
                              gap: 'xs',
                              children: [
                                e.jsxs(n, {
                                  gap: 'xs',
                                  align: 'center',
                                  children: [
                                    e.jsx(k, { size: 16, color: o.iconColor }),
                                    e.jsx(a, {
                                      size: 'xs',
                                      c: o.mutedTextColor,
                                      fw: 500,
                                      children: 'Account Holder Name'
                                    })
                                  ]
                                }),
                                e.jsx(a, {
                                  size: 'sm',
                                  fw: 500,
                                  children:
                                    ((z = s.bankDetailsInfo) == null
                                      ? void 0
                                      : z.accountHolderName) || 'N/A'
                                })
                              ]
                            })
                          })
                        }),
                        e.jsx(l.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(d, {
                            p: 'md',
                            withBorder: !0,
                            radius: 'md',
                            style: {
                              color: o.color,
                              borderColor: o.borderColor
                            },
                            children: e.jsxs(t, {
                              gap: 'xs',
                              children: [
                                e.jsxs(n, {
                                  gap: 'xs',
                                  align: 'center',
                                  children: [
                                    e.jsx(y, { size: 16, color: o.iconColor }),
                                    e.jsx(a, {
                                      size: 'xs',
                                      c: o.mutedTextColor,
                                      fw: 500,
                                      children: 'Bank Name'
                                    })
                                  ]
                                }),
                                e.jsx(a, {
                                  size: 'sm',
                                  fw: 500,
                                  children:
                                    ((T = s.bankDetailsInfo) == null
                                      ? void 0
                                      : T.bankName) || 'N/A'
                                })
                              ]
                            })
                          })
                        }),
                        e.jsx(l.Col, {
                          span: { base: 12, sm: 6 },
                          children: e.jsx(d, {
                            p: 'md',
                            withBorder: !0,
                            radius: 'md',
                            style: {
                              color: o.color,
                              borderColor: o.borderColor
                            },
                            children: e.jsxs(t, {
                              gap: 'xs',
                              children: [
                                e.jsxs(n, {
                                  gap: 'xs',
                                  align: 'center',
                                  children: [
                                    e.jsx(y, { size: 16, color: o.iconColor }),
                                    e.jsx(a, {
                                      size: 'xs',
                                      c: o.mutedTextColor,
                                      fw: 500,
                                      children: 'IFSC Code'
                                    })
                                  ]
                                }),
                                e.jsx(a, {
                                  size: 'sm',
                                  fw: 500,
                                  children:
                                    ((N = s.bankDetailsInfo) == null
                                      ? void 0
                                      : N.ifscCode) || 'N/A'
                                })
                              ]
                            })
                          })
                        })
                      ]
                    })
                  })
                })
              ]
            })
          })
        ]
      })
    });
  };
export { Ae as I, Re as P };
