import {
  C as _,
  v as H,
  s as E,
  e as A,
  j as e,
  S as u,
  G as p,
  T as d,
  P as Q
} from './index-Cn_-nzwF.js';
import { u as U, t as X, C as c } from './zod-DC47Kjo4.js';
import { N as T, D, c as q } from './add-candidate-CqnQmDsm.js';
import { c as J } from './useUserMutations-BavkaDsw.js';
import { u as Z } from './toast-Cmrx_Mrb.js';
import { C as g } from './CommonButton-D8AVyhIy.js';
import { C as $ } from './Container-3LzVKj3b.js';
import { C as S } from './Card-BOCM3d4L.js';
import { I as v } from './IconUser-BXnFItyZ.js';
import { I as ee } from './IconArrowLeft-DGaJMG-t.js';
import { G as n } from './Grid-CH2QJG7V.js';
import { T as C } from './TextInput-DUPEWkCs.js';
import { D as j } from './Divider-C8nnAxUa.js';
import { I as se } from './IconMail-BTX-Af1g.js';
import { I as te } from './IconPhone-BEZBDdov.js';
import { I as M } from './IconBriefcase-C5ZKuHUX.js';
import { I as ae } from './Input-kzRYOXAd.js';
import { I as re } from './IconPlus-zkiZIHJ7.js';
import { B as P } from './Badge-pr8cFvg5.js';
import { I as ie } from './IconX-BFEQcM8f.js';
import { T as ne } from './Textarea-CHnPFotR.js';
import { c as oe } from './createReactComponent-wv-YgGrS.js';
import { I as B } from './IconClock-CuJY7wT9.js';
import './Popover-C5NzMGSx.js';
import './get-floating-position-TyKNLeXJ.js';
import './use-uncontrolled-C8lBt68W.js';
import './InputBase-CO8vJiWZ.js';
import './use-input-props-CLa6mLr2.js';
import './clamp-DTmYCdls.js';
import './pick-calendar-levels-props-DunTV9xS.js';
import './AccordionChevron-D1fL7nd1.js';
import './use-dates-state-3PlMkQ_8.js';
import './DatePicker-BI1MhDah.js';
import './SimpleGrid-B8ebT4MM.js';
import './get-base-value-BKGvYumc.js';
import './use-disclosure-Dul82tkt.js';
import './ActionIcon-BBM-Tm4F.js';
import './CheckIcon-CpIg4BN2.js';
import './useMutation-bizDVTFN.js';
import './button-D3DmOMH8.js';
import './api-client-CcbR4Lbf.js';
import './useUserQueries-m-8gfZ67.js';
import './useQuery-4fhBkLAX.js';
import './common-services-DPGUVDMw.js';
import './IconCircleDashedCheck-DJMlYteh.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const le = [
    ['path', { d: 'M8 9h8', key: 'svg-0' }],
    ['path', { d: 'M8 13h6', key: 'svg-1' }],
    [
      'path',
      {
        d: 'M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12',
        key: 'svg-2'
      }
    ]
  ],
  me = oe('outline', 'message', 'Message', le),
  ss = () => {
    const z = _(),
      { themeConfig: b } = H(),
      { showSuccessToast: N, showErrorToast: O } = Z(),
      { mutateAsync: Y, isPending: R } = J(),
      a = E('(max-width: 768px)'),
      G = E('(max-width: 500px)'),
      {
        control: l,
        formState: { errors: m, isSubmitting: W },
        getValues: F,
        handleSubmit: K
      } = U({
        resolver: X(q),
        defaultValues: {
          candidateName: '',
          contact: { email: '', phone: '' },
          evaluatedSkills: '',
          relaventYearsOfExperience: 0,
          totalYearsOfExperience: 0,
          comments: [{ callEndsAt: '', callStartsAt: '', comment: '' }]
        }
      }),
      f = R || W,
      [o, w] = A.useState([]),
      [x, k] = A.useState(''),
      I = () => {
        x.trim() && !o.includes(x.trim()) && (w([...o, x.trim()]), k(''));
      },
      L = s => {
        w(o.filter(t => t !== s));
      },
      y = () => {
        z(-1);
      },
      V = async s => {
        var t, r;
        o.length && (s.evaluatedSkills = o.join(','));
        try {
          (await Y(s), N('Candidate added successfully!'), z(-1));
        } catch (i) {
          O(
            ((r =
              (t = i == null ? void 0 : i.response) == null
                ? void 0
                : t.data) == null
              ? void 0
              : r.message) || 'Failed to add candidate'
          );
        }
      };
    return e.jsx($, {
      size: 'lg',
      py: 'md',
      my: 'xl',
      mt: 70,
      px: G ? 'xs' : 'md',
      style: { backgroundColor: b.backgroundColor },
      children: e.jsxs(u, {
        gap: 'md',
        children: [
          e.jsx(S, {
            shadow: 'sm',
            p: a ? 'md' : 'lg',
            radius: 'md',
            withBorder: !0,
            children: e.jsxs(p, {
              justify: 'space-between',
              wrap: 'wrap',
              children: [
                e.jsxs(p, {
                  gap: 'sm',
                  children: [
                    e.jsx(v, { size: a ? 24 : 28 }),
                    e.jsx(d, {
                      size: a ? 'lg' : 'xl',
                      fw: 700,
                      ta: a ? 'center' : 'left',
                      children: 'Add New Candidate'
                    })
                  ]
                }),
                e.jsx(g, {
                  onClick: y,
                  variant: 'light',
                  size: a ? 'xs' : 'sm',
                  children: e.jsx(ee, { size: 18 })
                })
              ]
            })
          }),
          e.jsx(S, {
            shadow: 'sm',
            p: a ? 'md' : 'xl',
            radius: 'md',
            withBorder: !0,
            children: e.jsx('form', {
              onSubmit: K(V),
              onKeyDown: s => {
                s.key === 'Enter' && s.preventDefault();
              },
              children: e.jsxs(u, {
                gap: 'lg',
                children: [
                  e.jsxs('div', {
                    children: [
                      e.jsx(d, {
                        size: 'lg',
                        fw: 600,
                        mb: 'md',
                        children: 'Basic Information'
                      }),
                      e.jsx(n, {
                        gutter: 'md',
                        children: e.jsx(n.Col, {
                          span: 12,
                          children: e.jsx(c, {
                            name: 'candidateName',
                            control: l,
                            render: ({ field: s }) => {
                              var t;
                              return e.jsx(C, {
                                ...s,
                                label: 'Candidate Name',
                                placeholder: 'Enter candidate full name',
                                error:
                                  (t = m.candidateName) == null
                                    ? void 0
                                    : t.message,
                                size: a ? 'sm' : 'md',
                                withAsterisk: !0,
                                leftSection: e.jsx(v, { size: 16 }),
                                autoComplete: 'off'
                              });
                            }
                          })
                        })
                      })
                    ]
                  }),
                  e.jsx(j, {}),
                  e.jsxs('div', {
                    children: [
                      e.jsx(d, {
                        size: 'lg',
                        fw: 600,
                        mb: 'md',
                        children: 'Contact Information'
                      }),
                      e.jsxs(n, {
                        gutter: 'md',
                        children: [
                          e.jsx(n.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(c, {
                              name: 'contact.email',
                              control: l,
                              render: ({ field: s }) => {
                                var t, r;
                                return e.jsx(C, {
                                  ...s,
                                  label: 'Email',
                                  placeholder: 'candidate@example.com',
                                  error:
                                    (r =
                                      (t = m.contact) == null
                                        ? void 0
                                        : t.email) == null
                                      ? void 0
                                      : r.message,
                                  size: a ? 'sm' : 'md',
                                  type: 'email',
                                  withAsterisk: !0,
                                  leftSection: e.jsx(se, { size: 16 }),
                                  autoComplete: 'off'
                                });
                              }
                            })
                          }),
                          e.jsx(n.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(c, {
                              name: 'contact.phone',
                              control: l,
                              render: ({ field: s }) => {
                                var t, r;
                                return e.jsx(C, {
                                  ...s,
                                  label: 'Phone',
                                  placeholder: 'Enter phone number',
                                  error:
                                    (r =
                                      (t = m.contact) == null
                                        ? void 0
                                        : t.phone) == null
                                      ? void 0
                                      : r.message,
                                  size: a ? 'sm' : 'md',
                                  withAsterisk: !0,
                                  leftSection: e.jsx(te, { size: 16 }),
                                  autoComplete: 'off'
                                });
                              }
                            })
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsx(j, {}),
                  e.jsxs('div', {
                    children: [
                      e.jsx(d, {
                        size: 'lg',
                        fw: 600,
                        mb: 'md',
                        children: 'Experience'
                      }),
                      e.jsxs(n, {
                        gutter: 'md',
                        children: [
                          e.jsx(n.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(c, {
                              name: 'totalYearsOfExperience',
                              control: l,
                              render: ({ field: s }) => {
                                var t;
                                return e.jsx(T, {
                                  ...s,
                                  label: 'Total Experience (Years)',
                                  placeholder: 'Enter total years',
                                  min: 0,
                                  error:
                                    (t = m.totalYearsOfExperience) == null
                                      ? void 0
                                      : t.message,
                                  size: a ? 'sm' : 'md',
                                  withAsterisk: !0,
                                  leftSection: e.jsx(M, { size: 16 }),
                                  autoComplete: 'off'
                                });
                              }
                            })
                          }),
                          e.jsx(n.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(c, {
                              name: 'relaventYearsOfExperience',
                              control: l,
                              render: ({ field: s }) => {
                                var t;
                                return e.jsx(T, {
                                  ...s,
                                  label: 'Relevant Experience (Years)',
                                  placeholder: 'Enter relevant years',
                                  min: 0,
                                  error:
                                    s.value > F('totalYearsOfExperience')
                                      ? 'Cannot exceed total experience'
                                      : (t = m.relaventYearsOfExperience) ==
                                          null
                                        ? void 0
                                        : t.message,
                                  size: a ? 'sm' : 'md',
                                  withAsterisk: !0,
                                  leftSection: e.jsx(M, { size: 16 }),
                                  autoComplete: 'off'
                                });
                              }
                            })
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsx(j, {}),
                  e.jsxs('div', {
                    children: [
                      e.jsx(d, {
                        size: 'lg',
                        fw: 600,
                        mb: 'md',
                        children: 'Skills & Expertise'
                      }),
                      e.jsxs(u, {
                        gap: 'md',
                        children: [
                          e.jsx(ae.Wrapper, {
                            label: 'Add Skills',
                            description:
                              "Enter a skill and click 'Add' or press Enter",
                            children: e.jsxs(p, {
                              gap: 'xs',
                              mt: 'xs',
                              children: [
                                e.jsx(C, {
                                  value: x,
                                  onChange: s => k(s.target.value),
                                  onKeyDown: s => {
                                    s.key === 'Enter' &&
                                      (s.preventDefault(), I());
                                  },
                                  placeholder: 'e.g., React, Python, AWS',
                                  style: { flex: 1 },
                                  size: a ? 'sm' : 'md',
                                  autoComplete: 'off'
                                }),
                                e.jsx(g, {
                                  onClick: I,
                                  leftSection: e.jsx(re, { size: 16 }),
                                  size: a ? 'xs' : 'sm',
                                  disabled: !x.trim(),
                                  children: 'Add'
                                })
                              ]
                            })
                          }),
                          o.length > 0 &&
                            e.jsx(S, {
                              p: 'md',
                              withBorder: !0,
                              children: e.jsxs(u, {
                                gap: 'xs',
                                children: [
                                  e.jsxs(p, {
                                    justify: 'space-between',
                                    children: [
                                      e.jsx(d, {
                                        size: 'sm',
                                        fw: 500,
                                        children: 'Added Skills'
                                      }),
                                      e.jsxs(P, {
                                        variant: 'filled',
                                        color: b.button.color,
                                        children: [
                                          o.length,
                                          ' ',
                                          o.length === 1 ? 'skill' : 'skills'
                                        ]
                                      })
                                    ]
                                  }),
                                  e.jsx(p, {
                                    gap: 'xs',
                                    children: o.map(s =>
                                      e.jsx(
                                        P,
                                        {
                                          color: b.button.color,
                                          size: 'md',
                                          variant: 'filled',
                                          onClick: () => L(s),
                                          style: {
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                          },
                                          children: e.jsxs(p, {
                                            gap: 4,
                                            align: 'center',
                                            children: [
                                              e.jsx(d, {
                                                size: 'xs',
                                                children: s
                                              }),
                                              e.jsx(ie, {
                                                size: 14,
                                                style: { marginTop: 1 }
                                              })
                                            ]
                                          })
                                        },
                                        s
                                      )
                                    )
                                  })
                                ]
                              })
                            })
                        ]
                      })
                    ]
                  }),
                  e.jsx(j, {}),
                  e.jsxs('div', {
                    children: [
                      e.jsx(d, {
                        size: 'lg',
                        fw: 600,
                        mb: 'md',
                        children: 'Initial Comments & Call Details'
                      }),
                      e.jsxs(u, {
                        gap: 'md',
                        children: [
                          e.jsx(c, {
                            name: 'comments.0.comment',
                            control: l,
                            render: ({ field: s }) => {
                              var t, r, i;
                              return e.jsx(ne, {
                                ...s,
                                label: 'Comment',
                                placeholder:
                                  'Add initial comments about the candidate...',
                                autosize: !0,
                                minRows: 4,
                                maxRows: 8,
                                error:
                                  (i =
                                    (r =
                                      (t = m.comments) == null
                                        ? void 0
                                        : t[0]) == null
                                      ? void 0
                                      : r.comment) == null
                                    ? void 0
                                    : i.message,
                                size: a ? 'sm' : 'md',
                                leftSection: e.jsx(me, { size: 16 })
                              });
                            }
                          }),
                          e.jsxs(n, {
                            gutter: 'md',
                            children: [
                              e.jsx(n.Col, {
                                span: { base: 12, sm: 6 },
                                children: e.jsx(c, {
                                  name: 'comments.0.callStartsAt',
                                  control: l,
                                  render: ({ field: s }) => {
                                    var t, r, i;
                                    return e.jsx(D, {
                                      ...s,
                                      value: s.value ? new Date(s.value) : null,
                                      onChange: h =>
                                        s.onChange(
                                          h ? new Date(h).toISOString() : null
                                        ),
                                      clearable: !0,
                                      label: 'Call Start Time',
                                      placeholder: 'Select date and time',
                                      error:
                                        (i =
                                          (r =
                                            (t = m.comments) == null
                                              ? void 0
                                              : t[0]) == null
                                            ? void 0
                                            : r.callStartsAt) == null
                                          ? void 0
                                          : i.message,
                                      size: a ? 'sm' : 'md',
                                      leftSection: e.jsx(B, { size: 16 })
                                    });
                                  }
                                })
                              }),
                              e.jsx(n.Col, {
                                span: { base: 12, sm: 6 },
                                children: e.jsx(c, {
                                  name: 'comments.0.callEndsAt',
                                  control: l,
                                  render: ({ field: s }) => {
                                    var t, r, i;
                                    return e.jsx(D, {
                                      ...s,
                                      value: s.value ? new Date(s.value) : null,
                                      onChange: h =>
                                        s.onChange(
                                          h ? new Date(h).toISOString() : null
                                        ),
                                      clearable: !0,
                                      label: 'Call End Time',
                                      placeholder: 'Select date and time',
                                      error:
                                        (i =
                                          (r =
                                            (t = m.comments) == null
                                              ? void 0
                                              : t[0]) == null
                                            ? void 0
                                            : r.callEndsAt) == null
                                          ? void 0
                                          : i.message,
                                      size: a ? 'sm' : 'md',
                                      leftSection: e.jsx(B, { size: 16 })
                                    });
                                  }
                                })
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsx(j, {}),
                  e.jsxs(p, {
                    justify: 'flex-end',
                    mt: 'md',
                    children: [
                      e.jsx(g, {
                        type: 'button',
                        variant: 'light',
                        onClick: y,
                        disabled: f,
                        size: a ? 'xs' : 'sm',
                        fullWidth: a,
                        children: 'Cancel'
                      }),
                      e.jsx(g, {
                        type: 'submit',
                        disabled: f,
                        size: a ? 'xs' : 'sm',
                        fullWidth: a,
                        leftSection: f
                          ? e.jsx(Q, { size: 'xs', minHeight: '20px' })
                          : e.jsx(v, { size: 16 }),
                        children: f ? 'Adding Candidate...' : 'Add Candidate'
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
export { ss as default };
