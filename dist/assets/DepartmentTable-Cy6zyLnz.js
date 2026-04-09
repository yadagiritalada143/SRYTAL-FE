import {
  v as De,
  e as c,
  s as Q,
  j as e,
  S as m,
  T as s,
  J as o,
  G as n,
  W,
  V as U,
  Q as v
} from './index-Cn_-nzwF.js';
import { D as Ce, I as we } from './DataView-D_fx5Wkp.js';
import { d as Te } from './debounce-fynzmAtJ.js';
import { u as Se } from './toast-Cmrx_Mrb.js';
import { f as ze } from './useAdminQueries-CeOlvTzF.js';
import { s as Ae, t as ve, v as Ie } from './useAdminMutations-ClNNh0wK.js';
import { u as I } from './use-disclosure-Dul82tkt.js';
import { C as Ne } from './Container-3LzVKj3b.js';
import { C as f } from './Card-BOCM3d4L.js';
import { F as V } from './Flex-BbX87tE5.js';
import { I as N } from './IconPlus-zkiZIHJ7.js';
import { T as k } from './TextInput-DUPEWkCs.js';
import { I as ke } from './IconSearch-D9mxNvB2.js';
import { S as Ee } from './Select-KZOOD-9X.js';
import { B as H } from './Badge-pr8cFvg5.js';
import { I as J } from './IconCategory-DE2Gnoct.js';
import { T as a } from './Table-Bwpju6TN.js';
import { T as K } from './Tooltip-BnLcCD-S.js';
import { A as X } from './ActionIcon-BBM-Tm4F.js';
import { I as E } from './IconEdit-BA67kK5H.js';
import { P as Pe } from './Pagination-BaGk3Wb1.js';
import { I as Be } from './IconBuildingBank-DjT6Mwz6.js';
import { I as P } from './IconTrash-BQZ6jsv8.js';
import { I as Me } from './IconDeviceFloppy-TiVnADbg.js';
import { D as _e } from './Divider-C8nnAxUa.js';
import './CommonButton-D8AVyhIy.js';
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
import './get-style-object-DUJZA7T_.js';
import './create-event-handler-C3eq9ghx.js';
import './get-auto-contrast-value-Da6zqqWm.js';
const Fe = ['5', '10', '20', '50'],
  Y = 10;
function It() {
  const { showErrorToast: u, showSuccessToast: D } = Se(),
    { themeConfig: r, isDarkTheme: Z } = De(),
    { data: x = [], isLoading: ee } = ze(),
    { mutateAsync: te, isPending: B } = Ae(),
    { mutateAsync: se, isPending: M } = ve(),
    { mutateAsync: re, isPending: _ } = Ie(),
    C = B || M || _,
    [j, w] = c.useState(1),
    [p, ie] = c.useState(Y),
    [d, F] = c.useState(null),
    [y, q] = c.useState(''),
    [g, ne] = c.useState(''),
    [ae, { open: T, close: S }] = I(!1),
    [oe, { open: de, close: b }] = I(!1),
    [le, { open: G, close: z }] = I(!1),
    l = Q('(max-width: 768px)'),
    ce = Q('(max-width: 500px)'),
    [A, me] = c.useState(''),
    pe = c.useMemo(
      () =>
        Te(t => {
          (me(t.toLowerCase()), w(1));
        }, 300),
      []
    ),
    h = c.useMemo(
      () => (A ? x.filter(t => t.departmentName.toLowerCase().includes(A)) : x),
      [x, A]
    ),
    he = t => {
      const i = t.target.value;
      (ne(i), pe(i));
    },
    ue = async () => {
      if (!y.trim()) return u('Department is required');
      try {
        (await te({ departmentName: y.trim() }),
          D('Department added successfully !!'),
          q(''),
          S());
      } catch {
        u('Failed to add');
      }
    },
    O = t => {
      (F(t), de());
    },
    xe = async () => {
      if (!(d != null && d.departmentName.trim())) return u('Required');
      try {
        (await se({ id: d._id, departmentName: d.departmentName.trim() }),
          D('Department updated successfully !!'),
          b());
      } catch {
        u('Failed to update');
      }
    },
    je = async () => {
      if (d)
        try {
          (await re(d._id), D('Department deleted successfully !! '), z(), b());
        } catch {
          u('Failed to delete');
        }
    },
    { paginatedData: R, totalPages: $ } = c.useMemo(() => {
      const t = (j - 1) * p,
        i = t + p;
      return {
        paginatedData: h.slice(t, i),
        totalPages: Math.ceil(h.length / p)
      };
    }, [h, j, p]);
  c.useEffect(() => w(1), [p]);
  const ge = ({
    type: t,
    index: i,
    activePage: fe,
    color: L,
    itemsPerPage: ye,
    onEdit: be
  }) =>
    e.jsx(f, {
      shadow: 'sm',
      p: 'md',
      mb: 'sm',
      children: e.jsxs(m, {
        gap: 'sm',
        children: [
          e.jsxs(n, {
            justify: 'space-between',
            align: 'center',
            children: [
              e.jsxs(H, {
                variant: 'filled',
                color: L,
                children: ['#', i + 1 + (fe - 1) * ye]
              }),
              e.jsx(X, {
                variant: 'subtle',
                color: L,
                onClick: () => be(t),
                size: 'md',
                children: e.jsx(E, { size: 18 })
              })
            ]
          }),
          e.jsx(_e, {}),
          e.jsxs(m, {
            gap: 2,
            children: [
              e.jsx(s, {
                size: 'xs',
                fw: 600,
                c: 'dimmed',
                children: 'Department'
              }),
              e.jsx(s, { size: 'lg', fw: 600, children: t.departmentName })
            ]
          })
        ]
      })
    });
  return e.jsx(Ne, {
    size: 'lg',
    children: e.jsxs(f, {
      radius: 'lg',
      p: 'lg',
      withBorder: !0,
      shadow: Z ? 'xs' : 'sm',
      style: {
        backgroundColor: r.backgroundColor,
        border: `1px solid ${r.borderColor}`
      },
      children: [
        e.jsxs(m, {
          gap: 'lg',
          children: [
            e.jsx(f, {
              shadow: 'sm',
              p: l ? 'md' : 'lg',
              radius: 'md',
              children: e.jsxs(V, {
                direction: l ? 'column' : 'row',
                justify: 'space-between',
                align: 'center',
                gap: 'md',
                children: [
                  e.jsxs(s, {
                    size: l ? 'lg' : 'xl',
                    fw: 700,
                    children: [
                      'Manage Departments (',
                      h.length,
                      ' Departments)'
                    ]
                  }),
                  e.jsx(o, {
                    leftSection: e.jsx(N, { size: 16 }),
                    onClick: T,
                    fullWidth: l,
                    radius: 'md',
                    children: 'Add Department'
                  })
                ]
              })
            }),
            e.jsx(f, {
              shadow: 'sm',
              p: 'md',
              radius: 'md',
              children: e.jsxs(V, {
                direction: l ? 'column' : 'row',
                justify: 'space-between',
                align: l ? 'stretch' : 'center',
                gap: 'md',
                children: [
                  e.jsx(k, {
                    placeholder: 'Search department....',
                    leftSection: e.jsx(ke, { size: 16 }),
                    value: g,
                    onChange: he,
                    radius: 'md',
                    style: { flex: 1 }
                  }),
                  e.jsxs(n, {
                    wrap: 'nowrap',
                    gap: 'md',
                    children: [
                      e.jsxs(n, {
                        gap: 'xs',
                        children: [
                          e.jsx(s, { size: 'sm', children: 'Items per page:' }),
                          e.jsx(Ee, {
                            data: Fe,
                            value: p.toString(),
                            onChange: t => ie(Number(t) || Y),
                            w: 80,
                            size: 'sm'
                          })
                        ]
                      }),
                      h.length !== x.length &&
                        e.jsxs(H, {
                          variant: 'light',
                          color: 'blue',
                          children: [h.length, ' of ', x.length]
                        })
                    ]
                  })
                ]
              })
            }),
            e.jsx(Ce, {
              isLoading: ee,
              label: 'Departments',
              children: l
                ? e.jsx(W, {
                    p: 'md',
                    children: e.jsx(m, {
                      gap: 'sm',
                      children:
                        h.length === 0
                          ? e.jsx(f, {
                              p: 'xl',
                              withBorder: !0,
                              children: e.jsxs(m, {
                                align: 'center',
                                gap: 'md',
                                children: [
                                  e.jsx(J, { size: 48, opacity: 0.5 }),
                                  e.jsx(s, {
                                    size: 'lg',
                                    ta: 'center',
                                    children: 'No Departments found'
                                  }),
                                  e.jsx(s, {
                                    size: 'sm',
                                    ta: 'center',
                                    children: g
                                      ? 'Try adjusting your search'
                                      : 'Start by adding your first departments'
                                  }),
                                  !g &&
                                    e.jsx(o, {
                                      variant: 'light',
                                      leftSection: e.jsx(N, { size: 16 }),
                                      onClick: T,
                                      fullWidth: ce,
                                      children: 'Add Department'
                                    })
                                ]
                              })
                            })
                          : R.map((t, i) =>
                              e.jsx(
                                ge,
                                {
                                  color: r.button.color,
                                  type: t,
                                  index: i,
                                  activePage: j,
                                  itemsPerPage: p,
                                  onEdit: O
                                },
                                t._id
                              )
                            )
                    })
                  })
                : e.jsx(W, {
                    children: e.jsxs(a, {
                      stickyHeader: !0,
                      styles: {
                        table: { border: `1px solid ${r.borderColor}` },
                        th: { borderBottom: `1px solid ${r.borderColor}` },
                        td: {
                          borderBottom: `1px solid ${r.borderColor}`,
                          borderRight: `1px solid ${r.borderColor}`
                        }
                      },
                      children: [
                        e.jsx(a.Thead, {
                          style: {
                            backgroundColor: r.backgroundColor,
                            color: r.color
                          },
                          children: e.jsxs(a.Tr, {
                            children: [
                              e.jsx(a.Th, {
                                className: 'p-3 border',
                                style: { width: '100px' },
                                children: e.jsx(n, {
                                  justify: 'center',
                                  children: e.jsx(s, {
                                    size: 'sm',
                                    fw: 500,
                                    children: 'S.No'
                                  })
                                })
                              }),
                              e.jsx(a.Th, {
                                className: 'p-3 border',
                                children: e.jsx(s, {
                                  size: 'sm',
                                  fw: 500,
                                  children: 'Departments'
                                })
                              }),
                              e.jsx(a.Th, {
                                className: 'p-3 border',
                                style: { width: '100px' },
                                children: e.jsx(n, {
                                  justify: 'center',
                                  children: e.jsx(s, {
                                    size: 'sm',
                                    fw: 500,
                                    children: 'Actions'
                                  })
                                })
                              })
                            ]
                          })
                        }),
                        e.jsx(a.Tbody, {
                          children:
                            h.length === 0
                              ? e.jsx(a.Tr, {
                                  children: e.jsx(a.Td, {
                                    colSpan: 3,
                                    children: e.jsx(U, {
                                      py: 'xl',
                                      children: e.jsxs(m, {
                                        align: 'center',
                                        gap: 'xs',
                                        children: [
                                          e.jsx(J, { size: 40, opacity: 0.5 }),
                                          e.jsx(s, {
                                            children: ' No Departments found '
                                          }),
                                          e.jsx(s, {
                                            size: 'sm',
                                            children: g
                                              ? 'Try adjusting your search'
                                              : 'Start by adding your first department'
                                          }),
                                          !g &&
                                            e.jsx(o, {
                                              leftSection: e.jsx(N, {
                                                size: 16
                                              }),
                                              onClick: T,
                                              fullWidth: l,
                                              radius: 'md',
                                              color: r.button.color,
                                              children: 'Add Department'
                                            })
                                        ]
                                      })
                                    })
                                  })
                                })
                              : R.map((t, i) =>
                                  e.jsxs(
                                    a.Tr,
                                    {
                                      children: [
                                        e.jsx(a.Td, {
                                          className: 'text-center',
                                          children: i + 1 + (j - 1) * p
                                        }),
                                        e.jsx(a.Td, {
                                          children: t.departmentName
                                        }),
                                        e.jsx(a.Td, {
                                          className: 'text-center',
                                          children: e.jsx(n, {
                                            justify: 'center',
                                            children: e.jsx(K, {
                                              label: 'Edit',
                                              children: e.jsx(X, {
                                                color: r.button.color,
                                                variant: 'subtle',
                                                onClick: () => O(t),
                                                children: e.jsx(E, { size: 16 })
                                              })
                                            })
                                          })
                                        })
                                      ]
                                    },
                                    t._id
                                  )
                                )
                        })
                      ]
                    })
                  })
            }),
            $ > 1 &&
              e.jsx(U, {
                children: e.jsx(Pe, {
                  value: j,
                  onChange: w,
                  total: $,
                  color: r.button.color,
                  size: l ? 'sm' : 'md',
                  radius: 'md',
                  withEdges: !0
                })
              })
          ]
        }),
        e.jsx(v, {
          opened: ae,
          onClose: S,
          title: e.jsxs(n, {
            gap: 'xs',
            children: [
              e.jsx(Be, { size: 20, stroke: 1.8, color: r.button.color }),
              e.jsx(s, { fw: 600, size: 'lg', children: 'Add New Department' })
            ]
          }),
          centered: !0,
          size: 'md',
          styles: { header: { paddingBottom: 4, paddingTop: 5 } },
          children: e.jsxs(m, {
            children: [
              e.jsx(k, {
                mt: 'md',
                label: 'Department',
                value: y,
                onChange: t => q(t.target.value),
                placeholder: 'Enter the department',
                required: !0
              }),
              e.jsxs(n, {
                justify: 'flex-end',
                children: [
                  e.jsx(o, {
                    variant: 'default',
                    onClick: S,
                    radius: 'md',
                    children: 'Cancel'
                  }),
                  e.jsx(o, {
                    onClick: ue,
                    disabled: C || !y.trim(),
                    radius: 'md',
                    children: B ? 'Adding...' : 'Add'
                  })
                ]
              })
            ]
          })
        }),
        e.jsx(v, {
          opened: oe,
          onClose: b,
          title: e.jsxs(n, {
            gap: 'xs',
            children: [
              e.jsx(E, { size: 20, color: r.button.color }),
              e.jsx(s, { fw: 600, size: 'lg', children: 'Edit Department' })
            ]
          }),
          centered: !0,
          size: 'md',
          styles: { header: { paddingBottom: 4, paddingTop: 5 } },
          children: e.jsxs(m, {
            children: [
              e.jsx(k, {
                mt: 'md',
                label: 'Department',
                placeholder: 'Enter the department',
                value: (d == null ? void 0 : d.departmentName) || '',
                onChange: t =>
                  F(i => i && { ...i, departmentName: t.target.value }),
                required: !0,
                size: 'md'
              }),
              e.jsxs(n, {
                justify: 'space-between',
                children: [
                  l
                    ? e.jsx(K, {
                        label: 'Delete',
                        children: e.jsx(o, {
                          onClick: G,
                          p: 'xs',
                          radius: 'md',
                          variant: 'outline',
                          children: e.jsx(P, { size: 16 })
                        })
                      })
                    : e.jsx(o, {
                        color: 'red',
                        variant: 'outline',
                        onClick: G,
                        radius: 'md',
                        leftSection: e.jsx(P, { size: 16 }),
                        children: 'Delete'
                      }),
                  e.jsxs(n, {
                    children: [
                      e.jsx(o, {
                        variant: 'default',
                        onClick: b,
                        radius: 'md',
                        children: 'Cancel'
                      }),
                      e.jsx(o, {
                        onClick: xe,
                        leftSection: e.jsx(Me, { size: 16 }),
                        disabled: C,
                        radius: 'md',
                        children: M ? 'Saving....' : 'Save'
                      })
                    ]
                  })
                ]
              })
            ]
          })
        }),
        e.jsx(v, {
          opened: le,
          onClose: z,
          title: e.jsxs(n, {
            gap: 'xs',
            children: [
              e.jsx(we, { size: 24, color: 'red' }),
              e.jsx(s, {
                fw: 600,
                size: 'lg',
                c: 'red',
                children: 'Delete Department'
              })
            ]
          }),
          centered: !0,
          size: 'md',
          children: e.jsxs(m, {
            gap: 'md',
            children: [
              e.jsx(s, {
                size: 'sm',
                mt: 'sm',
                children:
                  'Are you sure you want to delete this department? This action cannot be undone.'
              }),
              e.jsxs(n, {
                justify: 'flex-end',
                mt: 'md',
                children: [
                  e.jsx(o, {
                    variant: 'default',
                    onClick: z,
                    radius: 'md',
                    children: 'Cancel'
                  }),
                  e.jsx(o, {
                    color: 'red',
                    onClick: je,
                    disabled: C,
                    leftSection: e.jsx(P, { size: 16 }),
                    radius: 'md',
                    children: _ ? 'Deleting...' : 'Delete'
                  })
                ]
              })
            ]
          })
        })
      ]
    })
  });
}
export { It as default };
