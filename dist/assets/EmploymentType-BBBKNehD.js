import {
  v as Te,
  e as m,
  s as V,
  j as e,
  S as h,
  G as d,
  T as n,
  W,
  V as Ce,
  Q as P
} from './index-Cn_-nzwF.js';
import { D as we, I as be } from './DataView-D_fx5Wkp.js';
import { d as ze } from './debounce-fynzmAtJ.js';
import { u as Ee } from './toast-Cmrx_Mrb.js';
import { b as Se } from './useAdminQueries-CeOlvTzF.js';
import { g as Ae, h as ve, i as Ie } from './useAdminMutations-ClNNh0wK.js';
import { C as a } from './CommonButton-D8AVyhIy.js';
import { u as M } from './use-disclosure-Dul82tkt.js';
import { C as De } from './Container-3LzVKj3b.js';
import { C as g } from './Card-BOCM3d4L.js';
import { F as K } from './Flex-BbX87tE5.js';
import { T as B } from './TextInput-DUPEWkCs.js';
import { I as ke } from './IconSearch-D9mxNvB2.js';
import { S as Ne } from './Select-KZOOD-9X.js';
import { B as X } from './Badge-pr8cFvg5.js';
import { I as H } from './IconCategory-DE2Gnoct.js';
import { I as L } from './IconPlus-zkiZIHJ7.js';
import { T as l } from './Table-Bwpju6TN.js';
import { P as Pe } from './Pagination-BaGk3Wb1.js';
import { I as Z } from './IconDeviceFloppy-TiVnADbg.js';
import { I as Me } from './IconBriefcase-C5ZKuHUX.js';
import { T as Y } from './Tooltip-BnLcCD-S.js';
import { I as F } from './IconTrash-BQZ6jsv8.js';
import { I as O } from './IconEdit-BA67kK5H.js';
import { A as ee } from './ActionIcon-BBM-Tm4F.js';
import { D as Be } from './Divider-C8nnAxUa.js';
import './createReactComponent-wv-YgGrS.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './IconX-BFEQcM8f.js';
import './useQuery-4fhBkLAX.js';
import './admin-services-CTc0QqQI.js';
import './common-services-DPGUVDMw.js';
import './api-client-CcbR4Lbf.js';
import './useMutation-bizDVTFN.js';
import './InputBase-CO8vJiWZ.js';
import './Input-kzRYOXAd.js';
import './use-input-props-CLa6mLr2.js';
import './OptionsDropdown-B_GLZDf8.js';
import './CheckIcon-CpIg4BN2.js';
import './Popover-C5NzMGSx.js';
import './get-floating-position-TyKNLeXJ.js';
import './use-uncontrolled-C8lBt68W.js';
import './create-event-handler-C3eq9ghx.js';
import './get-auto-contrast-value-Da6zqqWm.js';
import './get-style-object-DUJZA7T_.js';
const Fe = ['5', '10', '20', '50'],
  J = 10,
  E = r => /^([A-Za-z()\-\s_]|[0-9])+$/.test(r) && !/\d{2,}/.test(r),
  Le = ({ type: r, onEdit: p, color: t, isMobile: u = !1 }) =>
    e.jsx(d, {
      gap: 'xs',
      justify: 'center',
      children: e.jsx(Y, {
        label: 'Edit Type',
        children: e.jsx(ee, {
          variant: 'subtle',
          color: t,
          onClick: () => p(r),
          size: u ? 'md' : 'sm',
          children: e.jsx(O, { size: u ? 18 : 16 })
        })
      })
    }),
  Oe = ({
    type: r,
    index: p,
    activePage: t,
    itemsPerPage: u,
    color: c,
    onEdit: b
  }) =>
    e.jsx(g, {
      shadow: 'sm',
      p: 'md',
      mb: 'sm',
      withBorder: !0,
      children: e.jsxs(h, {
        gap: 'sm',
        children: [
          e.jsxs(d, {
            justify: 'space-between',
            align: 'center',
            children: [
              e.jsxs(X, {
                variant: 'filled',
                color: c,
                children: ['#', p + 1 + (t - 1) * u]
              }),
              e.jsx(ee, {
                variant: 'subtle',
                color: c,
                onClick: () => b(r),
                size: 'md',
                children: e.jsx(O, { size: 18 })
              })
            ]
          }),
          e.jsx(Be, {}),
          e.jsxs(h, {
            gap: 2,
            children: [
              e.jsx(n, {
                size: 'xs',
                fw: 600,
                c: 'dimmed',
                children: 'Employment Type'
              }),
              e.jsx(n, { size: 'lg', fw: 600, children: r.employmentType })
            ]
          })
        ]
      })
    }),
  _e = ({ filteredCount: r, onAdd: p, isMobile: t = !1 }) =>
    e.jsx(g, {
      shadow: 'sm',
      p: t ? 'md' : 'lg',
      radius: 'md',
      children: e.jsxs(K, {
        direction: t ? 'column' : 'row',
        justify: 'space-between',
        align: 'center',
        gap: 'md',
        children: [
          e.jsxs(n, {
            size: t ? 'lg' : 'xl',
            fw: 700,
            ta: t ? 'center' : 'left',
            children: ['Manage Employment Types (', r, ' Types)']
          }),
          e.jsx(a, {
            leftSection: e.jsx(L, { size: 16 }),
            onClick: p,
            variant: 'filled',
            fullWidth: t,
            size: t ? 'md' : 'sm',
            children: 'Add Type'
          })
        ]
      })
    }),
  Ns = () => {
    const { showErrorToast: r, showSuccessToast: p } = Ee(),
      { themeConfig: t, isDarkTheme: u } = Te(),
      { data: c = [], isLoading: b, isFetching: $e } = Se(),
      { mutateAsync: se, isPending: _ } = Ae(),
      { mutateAsync: te, isPending: $ } = ve(),
      { mutateAsync: oe, isPending: G } = Ie(),
      S = _ || $ || G,
      [f, A] = m.useState(1),
      [x, re] = m.useState(J),
      [i, v] = m.useState(null),
      [T, Q] = m.useState(''),
      [C, ne] = m.useState(''),
      y = V('(max-width: 768px)'),
      ie = V('(max-width: 500px)'),
      [le, { open: de, close: z }] = M(!1),
      [ae, { open: R, close: I }] = M(!1),
      [ce, { open: D, close: k }] = M(!1),
      [N, me] = m.useState(''),
      pe = m.useMemo(
        () =>
          ze(s => {
            (me(s.toLowerCase()), A(1));
          }, 300),
        []
      ),
      j = m.useMemo(
        () =>
          N ? c.filter(s => s.employmentType.toLowerCase().includes(N)) : c,
        [c, N]
      ),
      he = s => {
        const o = s.target.value;
        (ne(o), pe(o));
      },
      U = s => {
        (v(s), de());
      },
      xe = s => {
        (v(o => ({ ...o, id: s })), R());
      },
      ye = async () => {
        if (!E(i == null ? void 0 : i.employmentType)) {
          r(
            'Only letters, numbers, spaces, underscores, hyphens, and parentheses are allowed. No two or more consecutive digits.'
          );
          return;
        }
        if (
          c.some(
            s =>
              s.employmentType.toLowerCase() ===
                i.employmentType.toLowerCase() && s.id !== i.id
          )
        ) {
          r('This employment type already exists');
          return;
        }
        try {
          (await te({ id: i.id, employmentType: i.employmentType.trim() }),
            p('Updated successfully'),
            z());
        } catch {
          r('Failed to update');
        }
      },
      ue = async () => {
        try {
          (await oe(i.id), p('Deleted successfully'), I(), z());
        } catch {
          r('Failed to delete');
        }
      },
      je = async () => {
        if (!E(T)) {
          r(
            'Only letters, numbers, spaces, underscores, hyphens, and parentheses are allowed. No two or more consecutive digits.'
          );
          return;
        }
        if (c.some(s => s.employmentType.toLowerCase() === T.toLowerCase())) {
          r('This employment type already exists');
          return;
        }
        try {
          (await se({ employmentType: T.trim() }),
            p('Added successfully'),
            k(),
            Q(''));
        } catch {
          r('Failed to add');
        }
      },
      { paginatedData: w, totalPages: q } = m.useMemo(() => {
        const s = (f - 1) * x,
          o = s + x,
          ge = j.slice(s, o),
          fe = Math.ceil(j.length / x);
        return { paginatedData: ge, totalPages: fe };
      }, [j, f, x]);
    return (
      m.useEffect(() => {
        A(1);
      }, [x]),
      e.jsx(De, {
        size: 'lg',
        children: e.jsxs(g, {
          radius: 'lg',
          p: 'lg',
          withBorder: !0,
          shadow: u ? 'xs' : 'sm',
          style: {
            backgroundColor: t.backgroundColor,
            border: `1px solid ${t.borderColor}`
          },
          children: [
            e.jsxs(h, {
              gap: 'lg',
              children: [
                e.jsx(_e, { filteredCount: j.length, onAdd: D, isMobile: y }),
                e.jsx(g, {
                  shadow: 'sm',
                  p: y ? 'sm' : 'md',
                  radius: 'md',
                  children: e.jsxs(K, {
                    direction: y ? 'column' : 'row',
                    justify: 'space-between',
                    align: y ? 'stretch' : 'center',
                    gap: 'md',
                    children: [
                      e.jsx(B, {
                        placeholder: 'Search by employment type...',
                        leftSection: e.jsx(ke, { size: 16 }),
                        value: C,
                        onChange: he,
                        radius: 'md',
                        style: { flex: 1 }
                      }),
                      e.jsxs(d, {
                        wrap: 'nowrap',
                        gap: 'md',
                        children: [
                          e.jsxs(d, {
                            gap: 'xs',
                            children: [
                              e.jsx(n, {
                                size: 'sm',
                                children: 'Items per page:'
                              }),
                              e.jsx(Ne, {
                                data: Fe,
                                value: x.toString(),
                                onChange: s => re(Number(s) || J),
                                w: 80,
                                size: 'sm'
                              })
                            ]
                          }),
                          j.length !== c.length &&
                            e.jsxs(X, {
                              variant: 'light',
                              color: 'blue',
                              children: [
                                j.length,
                                ' of ',
                                c.length,
                                ' ',
                                'types'
                              ]
                            })
                        ]
                      })
                    ]
                  })
                }),
                e.jsx(g, {
                  shadow: 'sm',
                  p: 0,
                  radius: 'md',
                  children: e.jsx(we, {
                    isLoading: b,
                    label: 'employment types',
                    isEmpty: w.length === 0 && !b,
                    children: y
                      ? e.jsx(W, {
                          p: 'md',
                          children: e.jsx(h, {
                            gap: 'sm',
                            children:
                              w.length > 0
                                ? w.map((s, o) =>
                                    e.jsx(
                                      Oe,
                                      {
                                        color: t.button.color,
                                        type: s,
                                        index: o,
                                        activePage: f,
                                        itemsPerPage: x,
                                        onEdit: U
                                      },
                                      s.id
                                    )
                                  )
                                : e.jsx(g, {
                                    p: 'xl',
                                    withBorder: !0,
                                    children: e.jsxs(h, {
                                      align: 'center',
                                      gap: 'md',
                                      children: [
                                        e.jsx(H, { size: 48, opacity: 0.5 }),
                                        e.jsx(n, {
                                          size: 'lg',
                                          ta: 'center',
                                          children: 'No employment types found'
                                        }),
                                        e.jsx(n, {
                                          size: 'sm',
                                          ta: 'center',
                                          children: C
                                            ? 'Try adjusting your search'
                                            : 'Start by adding your first employment type'
                                        }),
                                        !C &&
                                          e.jsx(a, {
                                            variant: 'light',
                                            leftSection: e.jsx(L, { size: 16 }),
                                            onClick: D,
                                            fullWidth: ie,
                                            children: 'Add Type'
                                          })
                                      ]
                                    })
                                  })
                          })
                        })
                      : e.jsx(W, {
                          children: e.jsxs(l, {
                            stickyHeader: !0,
                            styles: {
                              table: { border: `1px solid ${t.borderColor}` },
                              th: {
                                borderBottom: `1px solid ${t.borderColor}`
                              },
                              td: {
                                borderBottom: `1px solid ${t.borderColor}`,
                                borderRight: `1px solid ${t.borderColor}`
                              }
                            },
                            children: [
                              ' ',
                              e.jsx(l.Thead, {
                                style: {
                                  backgroundColor: t.backgroundColor,
                                  color: t.color
                                },
                                children: e.jsxs(l.Tr, {
                                  children: [
                                    e.jsx(l.Th, {
                                      className: 'p-3 border',
                                      style: { width: '100px' },
                                      children: e.jsx(d, {
                                        justify: 'center',
                                        children: e.jsx(n, {
                                          size: 'sm',
                                          fw: 500,
                                          children: 'S.No'
                                        })
                                      })
                                    }),
                                    e.jsx(l.Th, {
                                      className: 'p-3 border',
                                      children: e.jsx(n, {
                                        size: 'sm',
                                        fw: 500,
                                        children: 'Employment Type'
                                      })
                                    }),
                                    e.jsx(l.Th, {
                                      className: 'p-3 border',
                                      style: { width: '120px' },
                                      children: e.jsx(d, {
                                        justify: 'center',
                                        children: e.jsx(n, {
                                          size: 'sm',
                                          fw: 500,
                                          children: 'Actions'
                                        })
                                      })
                                    })
                                  ]
                                })
                              }),
                              e.jsx(l.Tbody, {
                                children:
                                  w.length > 0
                                    ? w.map((s, o) =>
                                        e.jsxs(
                                          l.Tr,
                                          {
                                            className: 'transition-colors',
                                            children: [
                                              e.jsx(l.Td, {
                                                className: 'text-center',
                                                children: e.jsx(n, {
                                                  size: 'sm',
                                                  children: o + 1 + (f - 1) * x
                                                })
                                              }),
                                              e.jsx(l.Td, {
                                                className: 'p-3',
                                                children: e.jsx(n, {
                                                  size: 'sm',
                                                  children: s.employmentType
                                                })
                                              }),
                                              e.jsx(l.Td, {
                                                className: 'p-3',
                                                children: e.jsx(Le, {
                                                  type: s,
                                                  onEdit: U,
                                                  color: t.button.color
                                                })
                                              })
                                            ]
                                          },
                                          s.id
                                        )
                                      )
                                    : e.jsx(l.Tr, {
                                        children: e.jsx(l.Td, {
                                          colSpan: 3,
                                          className: 'text-center p-8',
                                          children: e.jsxs(h, {
                                            align: 'center',
                                            gap: 'md',
                                            children: [
                                              e.jsx(H, {
                                                size: 48,
                                                opacity: 0.5
                                              }),
                                              e.jsx(n, {
                                                size: 'lg',
                                                children:
                                                  'No employment types found'
                                              }),
                                              e.jsx(n, {
                                                size: 'sm',
                                                children: C
                                                  ? 'Try adjusting your search'
                                                  : 'Start by adding your first employment type'
                                              }),
                                              !C &&
                                                e.jsx(a, {
                                                  variant: 'light',
                                                  leftSection: e.jsx(L, {
                                                    size: 16
                                                  }),
                                                  onClick: D,
                                                  children: 'Add Type'
                                                })
                                            ]
                                          })
                                        })
                                      })
                              })
                            ]
                          })
                        })
                  })
                }),
                q > 1 &&
                  e.jsx(Ce, {
                    children: e.jsx(Pe, {
                      value: f,
                      onChange: A,
                      total: q,
                      color: t.button.color,
                      size: y ? 'sm' : 'md',
                      radius: 'md',
                      withEdges: !0
                    })
                  })
              ]
            }),
            e.jsx(P, {
              opened: ce,
              onClose: k,
              title: e.jsxs(d, {
                gap: 'xs',
                children: [
                  e.jsx(Me, { size: 20, stroke: 1.8, color: t.button.color }),
                  e.jsx(n, {
                    fw: 600,
                    size: 'lg',
                    children: 'Add New Employment Type'
                  })
                ]
              }),
              centered: !0,
              size: 'md',
              styles: { header: { paddingBottom: 4, paddingTop: 5 } },
              children: e.jsxs(h, {
                gap: 'md',
                children: [
                  e.jsx(B, {
                    mt: 'md',
                    label: 'Type Name',
                    value: T,
                    onChange: s => {
                      const o = s.target.value;
                      (o === '' || E(o)) && Q(o);
                    },
                    placeholder: 'Enter type name',
                    required: !0,
                    size: 'md'
                  }),
                  e.jsxs(d, {
                    justify: 'flex-end',
                    mt: 'xs',
                    children: [
                      e.jsx(a, {
                        variant: 'default',
                        onClick: k,
                        children: 'Cancel'
                      }),
                      e.jsx(a, {
                        onClick: je,
                        disabled: S || !T.trim(),
                        leftSection: e.jsx(Z, { size: 16 }),
                        children: _ ? 'Adding...' : 'Add Type'
                      })
                    ]
                  })
                ]
              })
            }),
            e.jsx(P, {
              opened: le,
              onClose: z,
              title: e.jsxs(d, {
                gap: 'xs',
                children: [
                  e.jsx(O, { size: 20, color: t.button.color }),
                  e.jsx(n, {
                    fw: 600,
                    size: 'lg',
                    children: 'Edit Employment Type'
                  })
                ]
              }),
              centered: !0,
              size: 'md',
              styles: { header: { paddingBottom: 4, paddingTop: 5 } },
              children: e.jsxs(h, {
                gap: 'md',
                children: [
                  e.jsx(B, {
                    mt: 'md',
                    label: 'Type Name',
                    value: (i == null ? void 0 : i.employmentType) || '',
                    onChange: s => {
                      const o = s.target.value;
                      (o === '' || E(o)) && v({ ...i, employmentType: o });
                    },
                    required: !0,
                    size: 'md'
                  }),
                  e.jsxs(d, {
                    justify: 'space-between',
                    children: [
                      y
                        ? e.jsx(Y, {
                            label: 'Delete Type',
                            children: e.jsx(a, {
                              onClick: R,
                              p: 'xs',
                              variant: 'outline',
                              children: e.jsx(F, { size: 16 })
                            })
                          })
                        : e.jsx(a, {
                            color: t.dangerColor,
                            variant: 'outline',
                            leftSection: e.jsx(F, { size: 16 }),
                            onClick: () => xe(i.id),
                            children: 'Delete'
                          }),
                      e.jsxs(d, {
                        children: [
                          e.jsx(a, {
                            variant: 'default',
                            onClick: z,
                            children: 'Cancel'
                          }),
                          e.jsx(a, {
                            onClick: ye,
                            disabled: S,
                            leftSection: e.jsx(Z, { size: 16 }),
                            children: $ ? 'Saving...' : 'Save'
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            }),
            e.jsx(P, {
              opened: ae,
              onClose: I,
              title: e.jsxs(d, {
                gap: 'xs',
                children: [
                  e.jsx(be, { size: 24, color: t.dangerColor }),
                  e.jsx(n, {
                    fw: 600,
                    size: 'lg',
                    c: t.dangerColor,
                    children: 'Delete Employment Type'
                  })
                ]
              }),
              centered: !0,
              size: 'md',
              children: e.jsxs(h, {
                gap: 'md',
                children: [
                  e.jsx(n, {
                    size: 'sm',
                    mt: 'md',
                    children:
                      'Are you sure you want to delete this employment type? This action cannot be undone.'
                  }),
                  e.jsxs(d, {
                    justify: 'flex-end',
                    mt: 'md',
                    children: [
                      e.jsx(a, {
                        variant: 'default',
                        onClick: I,
                        children: 'Cancel'
                      }),
                      e.jsx(a, {
                        color: t.dangerColor,
                        onClick: ue,
                        disabled: S,
                        leftSection: e.jsx(F, { size: 16 }),
                        children: G ? 'Deleting...' : 'Delete'
                      })
                    ]
                  })
                ]
              })
            })
          ]
        })
      })
    );
  };
export { Ns as default };
