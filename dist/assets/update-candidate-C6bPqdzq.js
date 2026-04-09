import {
  s as Y,
  aA as ce,
  j as e,
  S as m,
  T as i,
  G as S,
  P as X,
  v as _,
  W as H,
  e as M,
  C as xe,
  t as he
} from './index-Cn_-nzwF.js';
import { D as pe } from './DataView-D_fx5Wkp.js';
import { u as J } from './toast-Cmrx_Mrb.js';
import { a as ue, D as K, N as V, u as je } from './add-candidate-CqnQmDsm.js';
import { u as Z, t as ee, C as z } from './zod-DC47Kjo4.js';
import { o as ge } from './button-D3DmOMH8.js';
import { d as fe, e as Ce } from './useUserMutations-BavkaDsw.js';
import { C as v } from './CommonButton-D8AVyhIy.js';
import { d as we, f as be } from './useUserQueries-m-8gfZ67.js';
import { C as k } from './Card-BOCM3d4L.js';
import { T as ye } from './Textarea-CHnPFotR.js';
import { G as b } from './Grid-CH2QJG7V.js';
import { h as N } from './common-services-DPGUVDMw.js';
import { I as ze } from './IconMessageCircle--pxmizaD.js';
import { T as c } from './Table-Bwpju6TN.js';
import { B as O } from './Badge-pr8cFvg5.js';
import { D as U } from './Divider-C8nnAxUa.js';
import { B as Se } from './buttons-DnrPwwlZ.js';
import { S as Te } from './base-model-DqPjs_FM.js';
import { x as Ae } from './useAdminMutations-ClNNh0wK.js';
import { u as De } from './use-disclosure-Dul82tkt.js';
import { C as ve } from './Container-3LzVKj3b.js';
import { F as Ne } from './Flex-BbX87tE5.js';
import { T as W } from './TextInput-DUPEWkCs.js';
import { I as ke } from './Input-kzRYOXAd.js';
import { I as Ie } from './IconPlus-zkiZIHJ7.js';
import { I as Ee } from './IconX-BFEQcM8f.js';
import { I as $ } from './IconTrash-BQZ6jsv8.js';
import { I as Be } from './IconDeviceFloppy-TiVnADbg.js';
import { C as L } from './Checkbox-Bu1dHe0r.js';
import { T as Me } from './Title-T3OvY56h.js';
import './createReactComponent-wv-YgGrS.js';
import './IconCircleDashedCheck-DJMlYteh.js';
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
import './ActionIcon-BBM-Tm4F.js';
import './CheckIcon-CpIg4BN2.js';
import './api-client-CcbR4Lbf.js';
import './useMutation-bizDVTFN.js';
import './useQuery-4fhBkLAX.js';
import './IconArrowLeft-DGaJMG-t.js';
import './admin-services-CTc0QqQI.js';
import './useAdminQueries-CeOlvTzF.js';
import './get-auto-contrast-value-Da6zqqWm.js';
const Ye = ({ candidateId: t }) => {
    const {
        control: x,
        formState: { errors: d, isSubmitting: h },
        handleSubmit: p,
        reset: r
      } = Z({
        resolver: ee(ue),
        defaultValues: { comment: '', callStartsAt: '', callEndsAt: '' }
      }),
      { showSuccessToast: l, showErrorToast: g } = J(),
      { mutateAsync: u, isPending: f } = fe(),
      C = Y('(max-width: 768px)'),
      P = ce(),
      y = h || f,
      F = async o => {
        var a, w;
        o.id = t;
        try {
          (await u(o),
            l('Comment added successfully'),
            P.invalidateQueries({ queryKey: we.candidates }),
            r());
        } catch (A) {
          g(
            ((w =
              (a = A == null ? void 0 : A.response) == null
                ? void 0
                : a.data) == null
              ? void 0
              : w.message) || 'Something went wrong'
          );
        }
      };
    return e.jsx('div', {
      className: 'w-full max-w-4xl mx-auto my-6',
      children: e.jsx(k, {
        shadow: 'sm',
        p: C ? 'md' : 'lg',
        radius: 'md',
        withBorder: !0,
        children: e.jsxs(m, {
          gap: 'md',
          children: [
            e.jsx(i, {
              size: C ? 'lg' : 'xl',
              fw: 700,
              children: 'Add Comment'
            }),
            e.jsx('form', {
              onSubmit: p(F),
              children: e.jsxs(m, {
                gap: 'md',
                children: [
                  e.jsx(z, {
                    name: 'comment',
                    control: x,
                    render: ({ field: o }) => {
                      var a;
                      return e.jsx(ye, {
                        label: 'Comment',
                        placeholder: 'Enter your comment here...',
                        autosize: !0,
                        minRows: 4,
                        maxRows: 8,
                        ...o,
                        error:
                          (a = d == null ? void 0 : d.comment) == null
                            ? void 0
                            : a.message,
                        size: C ? 'sm' : 'md',
                        disabled: y
                      });
                    }
                  }),
                  e.jsxs(b, {
                    gutter: 'md',
                    children: [
                      e.jsx(b.Col, {
                        span: { base: 12, sm: 6 },
                        children: e.jsx(z, {
                          name: 'callStartsAt',
                          control: x,
                          render: ({ field: o }) => {
                            var a;
                            return e.jsx(K, {
                              ...o,
                              value: o.value ? new Date(o.value) : null,
                              onChange: w =>
                                o.onChange(
                                  w ? new Date(w).toISOString() : null
                                ),
                              clearable: !0,
                              label: 'Call Start Time',
                              placeholder: 'Pick date and time',
                              error:
                                (a = d == null ? void 0 : d.callStartsAt) ==
                                null
                                  ? void 0
                                  : a.message,
                              size: C ? 'sm' : 'md',
                              disabled: y
                            });
                          }
                        })
                      }),
                      e.jsx(b.Col, {
                        span: { base: 12, sm: 6 },
                        children: e.jsx(z, {
                          name: 'callEndsAt',
                          control: x,
                          render: ({ field: o }) => {
                            var a;
                            return e.jsx(K, {
                              ...o,
                              value: o.value ? new Date(o.value) : null,
                              onChange: w =>
                                o.onChange(
                                  w ? new Date(w).toISOString() : null
                                ),
                              clearable: !0,
                              label: 'Call End Time',
                              placeholder: 'Pick date and time',
                              error:
                                (a = d == null ? void 0 : d.callEndsAt) == null
                                  ? void 0
                                  : a.message,
                              size: C ? 'sm' : 'md',
                              disabled: y
                            });
                          }
                        })
                      })
                    ]
                  }),
                  e.jsx(S, {
                    justify: 'flex-end',
                    mt: 'md',
                    children: e.jsx(v, {
                      type: 'submit',
                      disabled: y,
                      size: C ? 'md' : 'sm',
                      fullWidth: C,
                      leftSection:
                        y && e.jsx(X, { size: 'xs', minHeight: '20px' }),
                      children: y ? 'Adding...' : 'Add Comment'
                    })
                  })
                ]
              })
            })
          ]
        })
      })
    });
  },
  Pe = ({ comment: t, index: x }) => {
    var h, p;
    const d = (r, l) => {
      if (!r || !l) return 'N/A';
      const g = typeof r == 'string' ? new Date(r) : r,
        u = typeof l == 'string' ? new Date(l) : l,
        f = Math.round((u.getTime() - g.getTime()) / 6e4);
      return f > 0 ? `${f} min` : 'N/A';
    };
    return e.jsx(k, {
      shadow: 'sm',
      p: 'md',
      mb: 'sm',
      withBorder: !0,
      children: e.jsxs(m, {
        gap: 'sm',
        children: [
          e.jsxs(S, {
            justify: 'space-between',
            align: 'center',
            children: [
              e.jsxs(O, {
                variant: 'filled',
                color: 'blue',
                children: ['Comment #', x + 1]
              }),
              e.jsx(O, {
                variant: 'light',
                color: 'teal',
                children: d(t.callStartsAt, t.callEndsAt)
              })
            ]
          }),
          e.jsx(U, {}),
          e.jsxs(m, {
            gap: 2,
            children: [
              e.jsx(i, {
                size: 'xs',
                fw: 600,
                c: 'dimmed',
                children: 'Comment'
              }),
              e.jsx(i, { size: 'sm', children: t.comment })
            ]
          }),
          e.jsx(S, {
            grow: !0,
            children: e.jsxs(m, {
              gap: 2,
              children: [
                e.jsx(i, {
                  size: 'xs',
                  fw: 600,
                  c: 'dimmed',
                  children: 'Created By'
                }),
                e.jsxs(i, {
                  size: 'sm',
                  children: [
                    ((h = t == null ? void 0 : t.userId) == null
                      ? void 0
                      : h.firstName) || '',
                    ' ',
                    ((p = t == null ? void 0 : t.userId) == null
                      ? void 0
                      : p.lastName) || 'N/A'
                  ]
                })
              ]
            })
          }),
          e.jsxs(m, {
            gap: 2,
            children: [
              e.jsx(i, {
                size: 'xs',
                fw: 600,
                c: 'dimmed',
                children: 'Created At'
              }),
              e.jsx(i, {
                size: 'sm',
                children: N(new Date(t.updateAt)).format('MMM DD, YYYY')
              }),
              e.jsx(i, {
                size: 'xs',
                c: 'dimmed',
                children: N(new Date(t.updateAt)).format('h:mm A')
              })
            ]
          }),
          t.callStartsAt &&
            t.callEndsAt &&
            e.jsxs(e.Fragment, {
              children: [
                e.jsx(U, {}),
                e.jsxs(m, {
                  gap: 2,
                  children: [
                    e.jsx(i, {
                      size: 'xs',
                      fw: 600,
                      c: 'dimmed',
                      children: 'Call Duration'
                    }),
                    e.jsxs(S, {
                      gap: 'xs',
                      children: [
                        e.jsx(i, {
                          size: 'xs',
                          children: N(new Date(t.callStartsAt)).format('h:mm A')
                        }),
                        e.jsx(i, { size: 'xs', c: 'dimmed', children: 'to' }),
                        e.jsx(i, {
                          size: 'xs',
                          children: N(new Date(t.callEndsAt)).format('h:mm A')
                        })
                      ]
                    })
                  ]
                })
              ]
            })
        ]
      })
    });
  },
  Fe = ({ comments: t }) => {
    const x = Y('(max-width: 768px)'),
      { themeConfig: d } = _(),
      h = Y('(max-width: 1024px)'),
      p = (r, l) => {
        if (!r || !l) return 'N/A';
        const g = typeof r == 'string' ? new Date(r) : r,
          u = typeof l == 'string' ? new Date(l) : l,
          f = Math.round((u.getTime() - g.getTime()) / 6e4);
        return f > 0 ? `${f} minutes` : 'N/A';
      };
    return !t || t.length === 0
      ? e.jsx('div', {
          className: 'w-full max-w-4xl mx-auto my-6',
          children: e.jsx(k, {
            shadow: 'sm',
            p: 'xl',
            radius: 'md',
            withBorder: !0,
            children: e.jsxs(m, {
              align: 'center',
              gap: 'md',
              children: [
                e.jsx(ze, { size: 48, opacity: 0.5 }),
                e.jsx(i, { size: 'lg', fw: 500, children: 'No Comments Yet' }),
                e.jsx(i, {
                  size: 'sm',
                  c: 'dimmed',
                  ta: 'center',
                  children: 'Comments will appear here once added'
                })
              ]
            })
          })
        })
      : e.jsx('div', {
          className: 'w-full max-w-4xl mx-auto my-6',
          children: e.jsx(k, {
            shadow: 'sm',
            p: 0,
            radius: 'md',
            withBorder: !0,
            children: e.jsxs(m, {
              gap: 0,
              children: [
                e.jsx('div', {
                  style: { backgroundColor: d.backgroundColor, color: d.color },
                  className: 'p-4 border-b',
                  children: e.jsxs(i, {
                    size: 'xl',
                    fw: 700,
                    children: ['Comments (', t.length, ')']
                  })
                }),
                x
                  ? e.jsx(H, {
                      p: 'md',
                      children: e.jsx(m, {
                        gap: 'sm',
                        children: t.map((r, l) =>
                          e.jsx(Pe, { comment: r, index: l }, l)
                        )
                      })
                    })
                  : e.jsx(H, {
                      children: e.jsxs(c, {
                        stickyHeader: !0,
                        withTableBorder: !0,
                        withColumnBorders: !0,
                        children: [
                          e.jsx(c.Thead, {
                            style: {
                              backgroundColor: d.backgroundColor,
                              color: d.color
                            },
                            children: e.jsxs(c.Tr, {
                              children: [
                                e.jsx(c.Th, {
                                  className: 'p-3 border text-center',
                                  ta: 'center',
                                  style: { minWidth: '60px' },
                                  children: e.jsx(i, {
                                    size: 'sm',
                                    fw: 500,
                                    children: 'S.No'
                                  })
                                }),
                                e.jsx(c.Th, {
                                  className: 'p-3 border',
                                  style: { minWidth: h ? '200px' : '300px' },
                                  children: e.jsx(i, {
                                    size: 'sm',
                                    fw: 500,
                                    children: 'Comment'
                                  })
                                }),
                                !h &&
                                  e.jsxs(e.Fragment, {
                                    children: [
                                      e.jsx(c.Th, {
                                        className: 'p-3 border text-center',
                                        ta: 'center',
                                        style: { minWidth: '150px' },
                                        children: e.jsx(i, {
                                          size: 'sm',
                                          fw: 500,
                                          children: 'Created By'
                                        })
                                      }),
                                      e.jsx(c.Th, {
                                        className: 'p-3 border text-center',
                                        ta: 'center',
                                        style: { minWidth: '180px' },
                                        children: e.jsx(i, {
                                          size: 'sm',
                                          fw: 500,
                                          children: 'Created At'
                                        })
                                      })
                                    ]
                                  }),
                                e.jsx(c.Th, {
                                  className: 'p-3 border text-center',
                                  ta: 'center',
                                  style: { minWidth: '120px' },
                                  children: e.jsx(i, {
                                    size: 'sm',
                                    fw: 500,
                                    children: 'Duration'
                                  })
                                })
                              ]
                            })
                          }),
                          e.jsx(c.Tbody, {
                            children: t.map((r, l) => {
                              var g, u;
                              return e.jsxs(
                                c.Tr,
                                {
                                  className: 'transition-colors',
                                  children: [
                                    e.jsx(c.Td, {
                                      className: 'text-center p-3',
                                      children: e.jsx(i, {
                                        size: 'sm',
                                        children: l + 1
                                      })
                                    }),
                                    e.jsx(c.Td, {
                                      className: 'p-3',
                                      children: e.jsx(i, {
                                        size: 'sm',
                                        lineClamp: h ? 2 : 3,
                                        children: r.comment
                                      })
                                    }),
                                    !h &&
                                      e.jsxs(e.Fragment, {
                                        children: [
                                          e.jsx(c.Td, {
                                            className: 'p-3 text-center',
                                            children: e.jsxs(i, {
                                              size: 'sm',
                                              children: [
                                                ((g =
                                                  r == null
                                                    ? void 0
                                                    : r.userId) == null
                                                  ? void 0
                                                  : g.firstName) || '',
                                                ' ',
                                                ((u =
                                                  r == null
                                                    ? void 0
                                                    : r.userId) == null
                                                  ? void 0
                                                  : u.lastName) || 'N/A'
                                              ]
                                            })
                                          }),
                                          e.jsxs(c.Td, {
                                            className: 'p-3 text-center',
                                            children: [
                                              e.jsx(i, {
                                                size: 'sm',
                                                children: N(
                                                  new Date(r.updateAt)
                                                ).format('MMM DD, YYYY')
                                              }),
                                              e.jsx(i, {
                                                size: 'xs',
                                                c: 'dimmed',
                                                children: N(
                                                  new Date(r.updateAt)
                                                ).format('h:mm A')
                                              })
                                            ]
                                          })
                                        ]
                                      }),
                                    e.jsx(c.Td, {
                                      className: 'p-3 text-center',
                                      children: e.jsx(O, {
                                        size: 'sm',
                                        variant: 'light',
                                        color: 'teal',
                                        children: p(
                                          r.callStartsAt,
                                          r.callEndsAt
                                        )
                                      })
                                    })
                                  ]
                                },
                                l
                              );
                            })
                          })
                        ]
                      })
                    })
              ]
            })
          })
        });
  },
  Os = () => {
    const [t, x] = M.useState([]),
      { themeConfig: d, organizationConfig: h } = _(),
      [p, r] = M.useState(''),
      [l, { open: g, close: u }] = De(!1),
      { showSuccessToast: f, showErrorToast: C } = J(),
      [P, y] = M.useState(!1),
      [F, o] = M.useState(!1),
      a = Y('(max-width: 768px)'),
      w = Y('(max-width: 500px)'),
      A = xe(),
      I = he().candidateId,
      { data: T, isLoading: se } = be(I),
      { mutateAsync: te, isPending: ae } = Ce(),
      { mutateAsync: re } = Ae(),
      {
        control: E,
        formState: { errors: B, isSubmitting: ie },
        reset: q,
        getValues: ne,
        handleSubmit: le
      } = Z({ resolver: ee(je) }),
      R = ae || ie;
    M.useEffect(() => {
      var s;
      T &&
        (x(
          ((s = T.evaluatedSkills) == null
            ? void 0
            : s.split(',').filter(Boolean)) || []
        ),
        q(T));
    }, [T, q]);
    const de = async (s, n) => {
        var j, D;
        try {
          (await re({ candidateId: s, confirmDelete: n }),
            f('Candidate deleted successfully!'),
            A(`${ge(h.organization_name)}/dashboard/pool-candidates`));
        } catch (G) {
          C(
            ((D =
              (j = G == null ? void 0 : G.response) == null
                ? void 0
                : j.data) == null
              ? void 0
              : D.message) || 'Something went wrong'
          );
        }
      },
      Q = () => {
        p.trim() && !t.includes(p.trim()) && (x([...t, p.trim()]), r(''));
      },
      oe = s => {
        x(t.filter(n => n !== s));
      },
      me = async s => {
        var n, j;
        (t.length && (s.evaluatedSkills = t.join(',')), (s.id = I));
        try {
          (await te(s), f('Candidate updated successfully!'), A(-1));
        } catch (D) {
          C(
            ((j =
              (n = D == null ? void 0 : D.response) == null
                ? void 0
                : n.data) == null
              ? void 0
              : j.message) || 'Failed to update candidate'
          );
        }
      };
    return e.jsx(ve, {
      size: 'lg',
      py: 'md',
      my: 'xl',
      px: w ? 'xs' : 'md',
      children: e.jsxs(m, {
        gap: 'md',
        children: [
          e.jsx(k, {
            shadow: 'sm',
            p: a ? 'md' : 'lg',
            radius: 'md',
            withBorder: !0,
            children: e.jsxs(Ne, {
              direction: 'row',
              justify: 'space-between',
              align: 'center',
              gap: 'md',
              children: [
                e.jsx(i, {
                  size: a ? 'lg' : 'xl',
                  fw: 700,
                  ta: a ? 'center' : 'left',
                  children: 'Edit Candidate Details'
                }),
                e.jsx(Se, { id: I })
              ]
            })
          }),
          e.jsx(pe, {
            isLoading: se,
            label: 'candidate details',
            children: e.jsxs(m, {
              gap: 'md',
              children: [
                e.jsx(k, {
                  shadow: 'sm',
                  p: a ? 'md' : 'lg',
                  radius: 'md',
                  withBorder: !0,
                  children: e.jsx('form', {
                    onSubmit: le(me),
                    children: e.jsxs(m, {
                      gap: 'md',
                      children: [
                        e.jsx(z, {
                          name: 'candidateName',
                          control: E,
                          render: ({ field: s }) => {
                            var n;
                            return e.jsx(W, {
                              label: 'Candidate Name',
                              placeholder: 'Enter candidate name',
                              ...s,
                              error:
                                (n = B.candidateName) == null
                                  ? void 0
                                  : n.message,
                              size: a ? 'sm' : 'md'
                            });
                          }
                        }),
                        e.jsxs(b, {
                          gutter: 'md',
                          children: [
                            e.jsx(b.Col, {
                              span: { base: 12, sm: 6 },
                              children: e.jsx(z, {
                                name: 'contact.email',
                                control: E,
                                render: ({ field: s }) => {
                                  var n, j;
                                  return e.jsx(W, {
                                    label: 'Email',
                                    placeholder: 'candidate@example.com',
                                    ...s,
                                    error:
                                      (j =
                                        (n = B.contact) == null
                                          ? void 0
                                          : n.email) == null
                                        ? void 0
                                        : j.message,
                                    size: a ? 'sm' : 'md'
                                  });
                                }
                              })
                            }),
                            e.jsx(b.Col, {
                              span: { base: 12, sm: 6 },
                              children: e.jsx(z, {
                                name: 'contact.phone',
                                control: E,
                                render: ({ field: s }) => {
                                  var n, j;
                                  return e.jsx(W, {
                                    label: 'Phone',
                                    placeholder: '+1234567890',
                                    ...s,
                                    error:
                                      (j =
                                        (n = B.contact) == null
                                          ? void 0
                                          : n.phone) == null
                                        ? void 0
                                        : j.message,
                                    size: a ? 'sm' : 'md'
                                  });
                                }
                              })
                            })
                          ]
                        }),
                        e.jsxs(b, {
                          gutter: 'md',
                          children: [
                            e.jsx(b.Col, {
                              span: { base: 12, sm: 6 },
                              children: e.jsx(z, {
                                name: 'totalYearsOfExperience',
                                control: E,
                                render: ({ field: s }) => {
                                  var n;
                                  return e.jsx(V, {
                                    label: 'Total Experience (Years)',
                                    placeholder: '0',
                                    ...s,
                                    min: 0,
                                    error:
                                      (n = B.totalYearsOfExperience) == null
                                        ? void 0
                                        : n.message,
                                    size: a ? 'sm' : 'md'
                                  });
                                }
                              })
                            }),
                            e.jsx(b.Col, {
                              span: { base: 12, sm: 6 },
                              children: e.jsx(z, {
                                name: 'relaventYearsOfExperience',
                                control: E,
                                render: ({ field: s }) => {
                                  var n;
                                  return e.jsx(V, {
                                    label: 'Relevant Experience (Years)',
                                    placeholder: '0',
                                    ...s,
                                    min: 0,
                                    error:
                                      (s.value || 0) >
                                      (ne('totalYearsOfExperience') || 0)
                                        ? 'Relevant experience cannot be more than total experience'
                                        : (n = B.relaventYearsOfExperience) ==
                                            null
                                          ? void 0
                                          : n.message,
                                    size: a ? 'sm' : 'md'
                                  });
                                }
                              })
                            })
                          ]
                        }),
                        e.jsx(U, {}),
                        e.jsxs(m, {
                          gap: 'xs',
                          children: [
                            e.jsx(ke.Wrapper, {
                              label: 'Skills',
                              size: a ? 'sm' : 'md',
                              children: e.jsxs(S, {
                                gap: 'xs',
                                mt: 'xs',
                                children: [
                                  e.jsx(W, {
                                    value: p,
                                    onChange: s => r(s.target.value),
                                    onKeyDown: s => {
                                      s.key === 'Enter' &&
                                        (s.preventDefault(), Q());
                                    },
                                    placeholder: 'Type a skill and press Enter',
                                    style: { flex: 1 },
                                    size: a ? 'sm' : 'md'
                                  }),
                                  e.jsx(v, {
                                    onClick: Q,
                                    leftSection: e.jsx(Ie, { size: 16 }),
                                    size: a ? 'xs' : 'sm',
                                    children: 'Add'
                                  })
                                ]
                              })
                            }),
                            t.length > 0 &&
                              e.jsx(S, {
                                gap: 'xs',
                                mt: 'xs',
                                children: t.map(s =>
                                  e.jsx(
                                    O,
                                    {
                                      size: 'lg',
                                      variant: 'filled',
                                      color: d.button.color,
                                      rightSection: e.jsx(Ee, {
                                        size: 14,
                                        style: { cursor: 'pointer' },
                                        onClick: () => oe(s)
                                      }),
                                      style: { cursor: 'pointer' },
                                      children: s
                                    },
                                    s
                                  )
                                )
                              })
                          ]
                        }),
                        e.jsx(U, {}),
                        e.jsxs(S, {
                          justify: 'space-between',
                          wrap: a ? 'wrap' : 'nowrap',
                          children: [
                            e.jsx(v, {
                              color: 'red',
                              variant: 'filled',
                              leftSection: e.jsx($, { size: 16 }),
                              onClick: g,
                              fullWidth: a,
                              size: a ? 'md' : 'sm',
                              children: 'Delete Candidate'
                            }),
                            e.jsx(v, {
                              type: 'submit',
                              disabled: R,
                              loading: R,
                              loaderProps: {
                                children: e.jsx(X, {
                                  size: 'xs',
                                  minHeight: '20px'
                                })
                              },
                              leftSection: e.jsx(Be, { size: 16 }),
                              fullWidth: a,
                              size: a ? 'md' : 'sm',
                              children: R ? 'Updating...' : 'Update Candidate'
                            })
                          ]
                        })
                      ]
                    })
                  })
                }),
                e.jsx(Te, {
                  title: e.jsx(Me, {
                    order: 3,
                    c: 'red',
                    children: 'Delete Action'
                  }),
                  size: 'md',
                  opened: l,
                  onClose: u,
                  children: e.jsxs(m, {
                    gap: 'md',
                    children: [
                      e.jsx(i, {
                        size: 'lg',
                        fw: 700,
                        children: 'Sure want to delete this Candidate?'
                      }),
                      e.jsx(i, {
                        size: 'sm',
                        c: 'dimmed',
                        children:
                          'Please be aware of doing this action! Deleting candidate is an un-reversible action and you should be aware while doing this.'
                      }),
                      e.jsxs(m, {
                        gap: 'sm',
                        mt: 'md',
                        children: [
                          e.jsx(L, {
                            label:
                              'I understand what are the consequences of doing this action!',
                            checked: P,
                            onChange: s => y(s.currentTarget.checked),
                            required: !0
                          }),
                          e.jsx(L, {
                            label:
                              'I understand that this candidate details are not a part of our application forever. I agreed to the Terms and Conditions to perform this action',
                            checked: F,
                            onChange: s => o(s.currentTarget.checked)
                          })
                        ]
                      }),
                      e.jsxs(S, {
                        justify: 'space-between',
                        mt: 'xl',
                        children: [
                          e.jsx(v, {
                            color: 'red',
                            variant: 'filled',
                            onClick: () => de(I, F),
                            disabled: !P,
                            leftSection: e.jsx($, { size: 16 }),
                            children: 'Delete'
                          }),
                          e.jsx(v, {
                            variant: 'default',
                            onClick: u,
                            children: 'Cancel'
                          })
                        ]
                      })
                    ]
                  })
                }),
                e.jsx(Ye, { candidateId: I }),
                e.jsx(Fe, { comments: (T == null ? void 0 : T.comments) || [] })
              ]
            })
          })
        ]
      })
    });
  };
export { Os as default };
