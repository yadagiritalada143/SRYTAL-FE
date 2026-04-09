import {
  v as be,
  e as p,
  s as J,
  j as e,
  S as m,
  G as d,
  T as t,
  W as K,
  V as Be,
  Q as O
} from './index-Cn_-nzwF.js';
import { D as we, I as ze } from './DataView-D_fx5Wkp.js';
import { d as Ae } from './debounce-fynzmAtJ.js';
import { u as Se } from './toast-Cmrx_Mrb.js';
import { a as Te } from './useAdminQueries-CeOlvTzF.js';
import { d as Ge, e as ve, f as De } from './useAdminMutations-ClNNh0wK.js';
import { C as c } from './CommonButton-D8AVyhIy.js';
import { u as F } from './use-disclosure-Dul82tkt.js';
import { C as Ie } from './Container-3LzVKj3b.js';
import { C as y } from './Card-BOCM3d4L.js';
import { F as Z } from './Flex-BbX87tE5.js';
import { T as L } from './TextInput-DUPEWkCs.js';
import { I as Ee } from './IconSearch-D9mxNvB2.js';
import { S as ke } from './Select-KZOOD-9X.js';
import { B as ee } from './Badge-pr8cFvg5.js';
import { I as z } from './IconDroplet-BIln8pIB.js';
import { I as $ } from './IconPlus-zkiZIHJ7.js';
import { T as l } from './Table-Bwpju6TN.js';
import { P as Pe } from './Pagination-BaGk3Wb1.js';
import { I as X } from './IconDeviceFloppy-TiVnADbg.js';
import { T as oe } from './Tooltip-BnLcCD-S.js';
import { I as _ } from './IconTrash-BQZ6jsv8.js';
import { I as V } from './IconEdit-BA67kK5H.js';
import { A as se } from './ActionIcon-BBM-Tm4F.js';
import { D as Ne } from './Divider-C8nnAxUa.js';
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
const Me = ['5', '10', '20', '50'],
  Y = 10,
  S = i => /^(A|B|AB|O)\s*(\+|-)(ve)?$/i.test(i.trim()),
  Oe = ({ group: i, onEdit: u, color: n, isMobile: g = !1 }) =>
    e.jsx(d, {
      gap: 'xs',
      justify: 'center',
      children: e.jsx(oe, {
        label: 'Edit Blood Group',
        children: e.jsx(se, {
          variant: 'subtle',
          color: n,
          onClick: () => u(i),
          size: g ? 'md' : 'sm',
          children: e.jsx(V, { size: g ? 18 : 16 })
        })
      })
    }),
  Fe = ({
    group: i,
    index: u,
    activePage: n,
    itemsPerPage: g,
    color: C,
    onEdit: T
  }) =>
    e.jsx(y, {
      shadow: 'sm',
      p: 'md',
      mb: 'sm',
      withBorder: !0,
      children: e.jsxs(m, {
        gap: 'sm',
        children: [
          e.jsxs(d, {
            justify: 'space-between',
            align: 'center',
            children: [
              e.jsxs(ee, {
                variant: 'filled',
                color: C,
                children: ['#', u + 1 + (n - 1) * g]
              }),
              e.jsx(se, {
                variant: 'subtle',
                color: C,
                onClick: () => T(i),
                size: 'md',
                children: e.jsx(V, { size: 18 })
              })
            ]
          }),
          e.jsx(Ne, {}),
          e.jsxs(m, {
            gap: 2,
            children: [
              e.jsx(t, {
                size: 'xs',
                fw: 600,
                c: 'dimmed',
                children: 'Blood Group'
              }),
              e.jsxs(d, {
                gap: 'xs',
                children: [
                  e.jsx(z, { size: 20, color: 'red' }),
                  e.jsx(t, { size: 'lg', fw: 600, children: i.type })
                ]
              })
            ]
          })
        ]
      })
    }),
  Le = ({ filteredCount: i, onAdd: u, isMobile: n = !1 }) =>
    e.jsx(y, {
      shadow: 'sm',
      p: n ? 'md' : 'lg',
      radius: 'md',
      withBorder: !0,
      children: e.jsxs(Z, {
        direction: n ? 'column' : 'row',
        justify: 'space-between',
        align: 'center',
        gap: 'md',
        children: [
          e.jsxs(t, {
            size: n ? 'lg' : 'xl',
            fw: 700,
            ta: n ? 'center' : 'left',
            children: ['Manage Blood Groups (', i, ' Groups)']
          }),
          e.jsx(c, {
            leftSection: e.jsx($, { size: 16 }),
            onClick: u,
            variant: 'filled',
            fullWidth: n,
            size: n ? 'md' : 'sm',
            children: 'Add Blood Group'
          })
        ]
      })
    }),
  Io = () => {
    const { data: i = [], isLoading: u, isFetching: n } = Te(),
      { mutateAsync: g, isPending: C } = Ge(),
      { mutateAsync: T, isPending: Q } = ve(),
      { mutateAsync: re, isPending: R } = De(),
      G = C || Q || R,
      { themeConfig: r, isDarkTheme: te } = be(),
      { showSuccessToast: v, showErrorToast: x } = Se(),
      [b, D] = p.useState(1),
      [h, ie] = p.useState(Y),
      [a, I] = p.useState(null),
      [E, U] = p.useState(''),
      [B, de] = p.useState(''),
      j = J('(max-width: 768px)'),
      le = J('(max-width: 500px)'),
      [ne, { open: ae, close: A }] = F(!1),
      [ce, { open: q, close: k }] = F(!1),
      [pe, { open: P, close: N }] = F(!1),
      [M, me] = p.useState(''),
      ue = p.useMemo(
        () =>
          Ae(o => {
            (me(o.toLowerCase()), D(1));
          }, 300),
        []
      ),
      f = p.useMemo(
        () => (M ? i.filter(o => o.type.toLowerCase().includes(M)) : i),
        [i, M]
      ),
      he = o => {
        const s = o.target.value;
        (de(s), ue(s));
      },
      W = o => {
        (I(o), ae());
      },
      xe = o => {
        (I(s => ({ ...s, id: o })), q());
      },
      je = async () => {
        const o = a == null ? void 0 : a.type.trim();
        if (!S(o)) {
          x('Invalid blood group format (e.g., A+, B-, AB+, O-)');
          return;
        }
        if (
          i.some(s => s.type.toLowerCase() === o.toLowerCase() && s.id !== a.id)
        ) {
          x('This blood group already exists');
          return;
        }
        try {
          (await T({ id: a.id, type: o }), v('Updated successfully'), A());
        } catch {
          x('Failed to update');
        }
      },
      ge = async () => {
        try {
          (await re(a.id), v('Deleted successfully'), k(), A());
        } catch {
          x('Failed to delete');
        }
      },
      fe = async () => {
        const o = E.trim();
        if (!S(o)) {
          x('Invalid blood group format (e.g., A+, B-, AB+, O-)');
          return;
        }
        if (i.some(s => s.type.toLowerCase() === o.toLowerCase())) {
          x('This blood group already exists');
          return;
        }
        try {
          (await g({ type: o }), v('Added successfully'), N(), U(''));
        } catch {
          x('Failed to add');
        }
      },
      { paginatedData: w, totalPages: H } = p.useMemo(() => {
        const o = (b - 1) * h,
          s = o + h,
          ye = f.slice(o, s),
          Ce = Math.ceil(f.length / h);
        return { paginatedData: ye, totalPages: Ce };
      }, [f, b, h]);
    return (
      p.useEffect(() => {
        D(1);
      }, [h]),
      e.jsx(Ie, {
        size: 'lg',
        children: e.jsxs(y, {
          radius: 'lg',
          p: 'lg',
          withBorder: !0,
          shadow: te ? 'xs' : 'sm',
          style: {
            backgroundColor: r.backgroundColor,
            border: `1px solid ${r.borderColor}`
          },
          children: [
            e.jsxs(m, {
              gap: 'lg',
              children: [
                e.jsx(Le, { filteredCount: f.length, onAdd: P, isMobile: j }),
                e.jsx(y, {
                  shadow: 'sm',
                  p: j ? 'sm' : 'md',
                  radius: 'md',
                  children: e.jsxs(Z, {
                    direction: j ? 'column' : 'row',
                    justify: 'space-between',
                    align: j ? 'stretch' : 'center',
                    gap: 'md',
                    children: [
                      e.jsx(L, {
                        placeholder: 'Search by blood group...',
                        leftSection: e.jsx(Ee, { size: 16 }),
                        value: B,
                        onChange: he,
                        radius: 'md',
                        style: { flex: 1 }
                      }),
                      e.jsxs(d, {
                        justify: 'space-between',
                        wrap: 'nowrap',
                        children: [
                          e.jsxs(d, {
                            gap: 'xs',
                            children: [
                              e.jsx(t, {
                                size: 'sm',
                                children: 'Items per page:'
                              }),
                              e.jsx(ke, {
                                data: Me,
                                value: h.toString(),
                                onChange: o => ie(Number(o) || Y),
                                w: 80,
                                size: 'sm'
                              })
                            ]
                          }),
                          f.length !== i.length &&
                            e.jsxs(ee, {
                              variant: 'light',
                              color: r.dangerColor,
                              children: [f.length, ' of ', i.length, ' groups']
                            })
                        ]
                      })
                    ]
                  })
                }),
                e.jsx(y, {
                  shadow: 'sm',
                  p: 0,
                  radius: 'md',
                  children: e.jsx(we, {
                    isLoading: u,
                    label: 'blood groups',
                    isEmpty: w.length === 0 && !u,
                    children: j
                      ? e.jsx(K, {
                          p: 'md',
                          children: e.jsx(m, {
                            gap: 'sm',
                            children:
                              w.length > 0
                                ? w.map((o, s) =>
                                    e.jsx(
                                      Fe,
                                      {
                                        color: r.button.color,
                                        group: o,
                                        index: s,
                                        activePage: b,
                                        itemsPerPage: h,
                                        onEdit: W
                                      },
                                      o.id
                                    )
                                  )
                                : e.jsx(y, {
                                    p: 'xl',
                                    withBorder: !0,
                                    children: e.jsxs(m, {
                                      align: 'center',
                                      gap: 'md',
                                      children: [
                                        e.jsx(z, {
                                          size: 48,
                                          opacity: 0.5,
                                          color: r.dangerColor
                                        }),
                                        e.jsx(t, {
                                          size: 'lg',
                                          ta: 'center',
                                          children: 'No blood groups found'
                                        }),
                                        e.jsx(t, {
                                          size: 'sm',
                                          ta: 'center',
                                          children: B
                                            ? 'Try adjusting your search'
                                            : 'Start by adding your first blood group'
                                        }),
                                        !B &&
                                          e.jsx(c, {
                                            variant: 'light',
                                            leftSection: e.jsx($, { size: 16 }),
                                            onClick: P,
                                            fullWidth: le,
                                            children: 'Add Blood Group'
                                          })
                                      ]
                                    })
                                  })
                          })
                        })
                      : e.jsx(K, {
                          children: e.jsxs(l, {
                            stickyHeader: !0,
                            styles: {
                              table: { border: `1px solid ${r.borderColor}` },
                              th: {
                                borderBottom: `1px solid ${r.borderColor}`
                              },
                              td: {
                                borderBottom: `1px solid ${r.borderColor}`,
                                borderRight: `1px solid ${r.borderColor}`
                              }
                            },
                            children: [
                              e.jsx(l.Thead, {
                                style: {
                                  backgroundColor: r.backgroundColor,
                                  color: r.color
                                },
                                children: e.jsxs(l.Tr, {
                                  children: [
                                    e.jsx(l.Th, {
                                      className: 'p-3 border',
                                      style: { width: '100px' },
                                      children: e.jsx(d, {
                                        justify: 'center',
                                        children: e.jsx(t, {
                                          size: 'sm',
                                          fw: 500,
                                          children: 'S.No'
                                        })
                                      })
                                    }),
                                    e.jsx(l.Th, {
                                      className: 'p-3 border',
                                      children: e.jsx(t, {
                                        size: 'sm',
                                        fw: 500,
                                        children: 'Blood Group'
                                      })
                                    }),
                                    e.jsx(l.Th, {
                                      className: 'p-3 border',
                                      style: { width: '120px' },
                                      children: e.jsx(d, {
                                        justify: 'center',
                                        children: e.jsx(t, {
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
                                    ? w.map((o, s) =>
                                        e.jsxs(
                                          l.Tr,
                                          {
                                            className: 'transition-colors',
                                            children: [
                                              e.jsx(l.Td, {
                                                className: 'text-center',
                                                children: e.jsx(t, {
                                                  size: 'sm',
                                                  children: s + 1 + (b - 1) * h
                                                })
                                              }),
                                              e.jsx(l.Td, {
                                                className: 'p-3',
                                                children: e.jsxs(d, {
                                                  gap: 'xs',
                                                  children: [
                                                    e.jsx(z, {
                                                      size: 18,
                                                      color: r.dangerColor
                                                    }),
                                                    e.jsx(t, {
                                                      size: 'sm',
                                                      children: o.type
                                                    })
                                                  ]
                                                })
                                              }),
                                              e.jsx(l.Td, {
                                                className: 'p-3',
                                                children: e.jsx(Oe, {
                                                  group: o,
                                                  onEdit: W,
                                                  color: r.button.color
                                                })
                                              })
                                            ]
                                          },
                                          o.id
                                        )
                                      )
                                    : e.jsx(l.Tr, {
                                        children: e.jsx(l.Td, {
                                          colSpan: 3,
                                          className: 'text-center p-8',
                                          children: e.jsxs(m, {
                                            align: 'center',
                                            gap: 'md',
                                            children: [
                                              e.jsx(z, {
                                                size: 48,
                                                opacity: 0.5,
                                                color: r.dangerColor
                                              }),
                                              e.jsx(t, {
                                                size: 'lg',
                                                children:
                                                  'No blood groups found'
                                              }),
                                              e.jsx(t, {
                                                size: 'sm',
                                                children: B
                                                  ? 'Try adjusting your search'
                                                  : 'Start by adding your first blood group'
                                              }),
                                              !B &&
                                                e.jsx(c, {
                                                  variant: 'light',
                                                  leftSection: e.jsx($, {
                                                    size: 16
                                                  }),
                                                  onClick: P,
                                                  children: 'Add Blood Group'
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
                H > 1 &&
                  e.jsx(Be, {
                    children: e.jsx(Pe, {
                      value: b,
                      onChange: D,
                      total: H,
                      color: r.button.color,
                      size: j ? 'sm' : 'md',
                      radius: 'md',
                      withEdges: !0
                    })
                  })
              ]
            }),
            e.jsx(O, {
              opened: pe,
              onClose: N,
              title: e.jsxs(d, {
                gap: 'xs',
                children: [
                  e.jsx(z, { size: 20, stroke: 1.8, color: r.button.color }),
                  e.jsx(t, {
                    fw: 600,
                    size: 'lg',
                    children: 'Add New Blood Group'
                  })
                ]
              }),
              centered: !0,
              size: 'md',
              styles: { header: { paddingBottom: 4, paddingTop: 5 } },
              children: e.jsxs(m, {
                gap: 'md',
                children: [
                  e.jsx(L, {
                    mt: 'md',
                    label: 'Blood Group',
                    value: E,
                    onChange: o => {
                      const s = o.target.value;
                      (s === '' || S(s) || s.length < 5) && U(s);
                    },
                    placeholder: 'e.g., A+, B-, AB+, O-',
                    required: !0,
                    size: 'md',
                    description: 'Valid formats: A+, B-, AB+, O-, etc.'
                  }),
                  e.jsxs(d, {
                    justify: 'flex-end',
                    mt: 'xs',
                    children: [
                      e.jsx(c, {
                        variant: 'default',
                        onClick: N,
                        children: 'Cancel'
                      }),
                      e.jsx(c, {
                        onClick: fe,
                        disabled: G || !E.trim(),
                        leftSection: e.jsx(X, { size: 16 }),
                        children: C ? 'Adding...' : 'Add Blood Group'
                      })
                    ]
                  })
                ]
              })
            }),
            e.jsx(O, {
              opened: ne,
              onClose: A,
              title: e.jsxs(d, {
                gap: 'xs',
                children: [
                  e.jsx(V, { size: 20, color: r.button.color }),
                  e.jsx(t, {
                    fw: 600,
                    size: 'lg',
                    children: 'Edit Blood Group'
                  })
                ]
              }),
              centered: !0,
              size: 'md',
              styles: { header: { paddingBottom: 4, paddingTop: 5 } },
              children: e.jsxs(m, {
                gap: 'md',
                children: [
                  e.jsx(L, {
                    mt: 'md',
                    label: 'Blood Group',
                    value: (a == null ? void 0 : a.type) || '',
                    onChange: o => {
                      const s = o.target.value;
                      (s === '' || S(s) || s.length < 5) &&
                        I({ ...a, type: s });
                    },
                    required: !0,
                    size: 'md',
                    description: 'Valid formats: A+, B-, AB+, O-, etc.'
                  }),
                  e.jsxs(d, {
                    justify: 'space-between',
                    children: [
                      j
                        ? e.jsx(oe, {
                            label: 'Delete Blood Group',
                            children: e.jsx(c, {
                              onClick: q,
                              p: 'xs',
                              variant: 'outline',
                              children: e.jsx(_, { size: 16 })
                            })
                          })
                        : e.jsx(c, {
                            color: r.dangerColor,
                            variant: 'outline',
                            leftSection: e.jsx(_, { size: 16 }),
                            onClick: () => xe(a.id),
                            children: 'Delete'
                          }),
                      e.jsxs(d, {
                        children: [
                          e.jsx(c, {
                            variant: 'default',
                            onClick: A,
                            children: 'Cancel'
                          }),
                          e.jsx(c, {
                            onClick: je,
                            disabled: G,
                            leftSection: e.jsx(X, { size: 16 }),
                            children: Q ? 'Saving...' : 'Save'
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            }),
            e.jsx(O, {
              opened: ce,
              onClose: k,
              title: e.jsxs(d, {
                gap: 'xs',
                children: [
                  e.jsx(ze, { size: 24, color: r.dangerColor }),
                  e.jsx(t, {
                    fw: 600,
                    size: 'lg',
                    c: r.dangerColor,
                    children: 'Delete Blood Group'
                  })
                ]
              }),
              centered: !0,
              size: 'md',
              children: e.jsxs(m, {
                gap: 'md',
                children: [
                  e.jsx(t, {
                    size: 'sm',
                    mt: 'md',
                    children:
                      'Are you sure you want to delete this blood group? This action cannot be undone.'
                  }),
                  e.jsxs(d, {
                    justify: 'flex-end',
                    mt: 'md',
                    children: [
                      e.jsx(c, {
                        variant: 'default',
                        onClick: k,
                        children: 'Cancel'
                      }),
                      e.jsx(c, {
                        color: r.dangerColor,
                        onClick: ge,
                        disabled: G,
                        leftSection: e.jsx(_, { size: 16 }),
                        children: R ? 'Deleting...' : 'Delete'
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
export { Io as default };
