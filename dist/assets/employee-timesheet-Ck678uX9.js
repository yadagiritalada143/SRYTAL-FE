import {
  v as ze,
  s as N,
  j as e,
  S as C,
  G as T,
  T as i,
  r as y,
  e as l,
  a5 as Ne,
  B as H,
  t as Ve,
  I as Ye,
  D as $,
  V as se,
  Q as Qe
} from './index-Cn_-nzwF.js';
import { h as O, b as Ge, c as Ue } from './common-services-DPGUVDMw.js';
import { T as p, p as He, u as $e, f as Xe } from './helper-DOt_6Aha.js';
import { c as qe } from './employee-atom-CxuJif-K.js';
import { d as Je } from './admin-services-CTc0QqQI.js';
import { B as Ke } from './buttons-DnrPwwlZ.js';
import { C as F } from './Card-BOCM3d4L.js';
import { I as te } from './IconUser-BXnFItyZ.js';
import { S as Ze } from './SimpleGrid-B8ebT4MM.js';
import { I as es } from './IconBriefcase-C5ZKuHUX.js';
import { I as ne } from './IconCalendar-Cp3De190.js';
import { I as ss } from './IconPhone-BEZBDdov.js';
import { I as ts } from './IconMail-BTX-Af1g.js';
import { C as P } from './CommonButton-D8AVyhIy.js';
import { I as he } from './IconFilter-CKFvWpK5.js';
import { c as we } from './createReactComponent-wv-YgGrS.js';
import { I as rs } from './IconChevronDown-DCbfWWlv.js';
import { C as Ce } from './Collapse-BKrzQfX6.js';
import { S as re } from './Select-KZOOD-9X.js';
import { D as is } from './DatePickerInput-DkPCxbtp.js';
import { T as os } from './TextInput-DUPEWkCs.js';
import { I as ns } from './IconSearch-D9mxNvB2.js';
import { I as ve } from './IconX-BFEQcM8f.js';
import { B as W } from './Badge-pr8cFvg5.js';
import { T as ue } from './Tooltip-BnLcCD-S.js';
import { I as q } from './IconCircleCheck-rZ6LYGaS.js';
import { D as je } from './DataView-D_fx5Wkp.js';
import { T as h } from './Table-Bwpju6TN.js';
import { C as ie } from './Checkbox-Bu1dHe0r.js';
import { I as as, a as ls } from './IconSortDescending-Cj0BX4vG.js';
import { F as X } from './Flex-BbX87tE5.js';
import { D as oe } from './Divider-C8nnAxUa.js';
import { u as cs } from './toast-Cmrx_Mrb.js';
import { g as ds } from './add-package-6HxDEyan.js';
import { u as ms } from './use-disclosure-Dul82tkt.js';
import { C as ge } from './Container-3LzVKj3b.js';
import { A as ps } from './ActionIcon-BBM-Tm4F.js';
import { P as fe } from './Pagination-BaGk3Wb1.js';
import './api-client-CcbR4Lbf.js';
import './IconArrowLeft-DGaJMG-t.js';
import './get-base-value-BKGvYumc.js';
import './get-style-object-DUJZA7T_.js';
import './Input-kzRYOXAd.js';
import './OptionsDropdown-B_GLZDf8.js';
import './CheckIcon-CpIg4BN2.js';
import './Popover-C5NzMGSx.js';
import './get-floating-position-TyKNLeXJ.js';
import './use-uncontrolled-C8lBt68W.js';
import './InputBase-CO8vJiWZ.js';
import './use-input-props-CLa6mLr2.js';
import './pick-calendar-levels-props-DunTV9xS.js';
import './AccordionChevron-D1fL7nd1.js';
import './clamp-DTmYCdls.js';
import './use-dates-state-3PlMkQ_8.js';
import './use-dates-input-Cp74vuuz.js';
import './DatePicker-BI1MhDah.js';
import './get-auto-contrast-value-Da6zqqWm.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './create-event-handler-C3eq9ghx.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xs = [['path', { d: 'M6 15l6 -6l6 6', key: 'svg-0' }]],
  hs = we('outline', 'chevron-up', 'ChevronUp', xs);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const us = [
    ['path', { d: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0', key: 'svg-0' }],
    ['path', { d: 'M10 10l4 4m0 -4l-4 4', key: 'svg-1' }]
  ],
  J = we('outline', 'circle-x', 'CircleX', us),
  js = ({ employeeInfoItems: o }) => {
    const { themeConfig: n } = ze(),
      d = N('(max-width: 768px)'),
      f = m => {
        const c = d ? 14 : 16;
        switch (m) {
          case 'Name':
            return e.jsx(te, { size: c });
          case 'Email':
            return e.jsx(ts, { size: c });
          case 'Phone':
            return e.jsx(ss, { size: c });
          case 'Join Date':
            return e.jsx(ne, { size: c });
          case 'Role':
            return e.jsx(es, { size: c });
          default:
            return e.jsx(te, { size: c });
        }
      };
    return e.jsx(F, {
      shadow: 'lg',
      radius: 'md',
      withBorder: !0,
      p: d ? 'md' : 'lg',
      style: { backgroundColor: n.backgroundColor, borderColor: n.borderColor },
      children: e.jsxs(C, {
        gap: d ? 'md' : 'lg',
        children: [
          e.jsxs(T, {
            gap: 'sm',
            children: [
              e.jsx(te, { size: d ? 18 : 20, color: n.button.color }),
              e.jsx(i, {
                size: d ? 'md' : 'lg',
                fw: 600,
                c: n.color,
                children: 'Employee Information'
              })
            ]
          }),
          e.jsx(Ze, {
            cols: { base: 1, xs: 1, sm: 2, md: 2, lg: 3 },
            spacing: d ? 'md' : 'lg',
            children: o.map((m, c) =>
              e.jsx(
                F,
                {
                  radius: 'md',
                  p: d ? 'sm' : 'md',
                  style: { border: `1px solid ${n.borderColor}` },
                  children: e.jsxs(C, {
                    gap: 'xs',
                    children: [
                      e.jsxs(T, {
                        gap: 'xs',
                        children: [
                          f(m.label),
                          e.jsx(i, {
                            size: d ? 'xs' : 'sm',
                            c: 'dimmed',
                            children: m.label
                          })
                        ]
                      }),
                      e.jsx(i, {
                        size: d ? 'sm' : 'md',
                        fw: 500,
                        c: n.color,
                        className: 'break-words',
                        children: m.value || '-'
                      })
                    ]
                  })
                },
                c
              )
            )
          })
        ]
      })
    });
  },
  gs = ({
    searchQuery: o,
    setSearchQuery: n,
    selectedStatus: d,
    setSelectedStatus: f,
    dateRange: m,
    setDateRange: c,
    filtersExpanded: s,
    setFiltersExpanded: b,
    resetFilters: r,
    statusOptions: k
  }) => {
    const j = N('(max-width: 768px)'),
      I = N('(max-width: 500px)');
    return e.jsx(F, {
      shadow: 'sm',
      p: I ? 'xs' : j ? 'sm' : 'md',
      radius: 'md',
      withBorder: !0,
      children: e.jsxs(C, {
        gap: 'sm',
        children: [
          j &&
            e.jsx(P, {
              variant: 'light',
              fullWidth: !0,
              size: I ? 'xs' : 'sm',
              onClick: () => b(!s),
              rightSection: s
                ? e.jsx(hs, { size: 14 })
                : e.jsx(rs, { size: 14 }),
              leftSection: e.jsx(he, { size: 14 }),
              children: s ? 'Hide Filters' : 'Show Filters'
            }),
          e.jsx(Ce, {
            in: s || !j,
            children: e.jsxs(C, {
              gap: 'md',
              children: [
                e.jsxs(C, {
                  gap: 'sm',
                  children: [
                    e.jsx(re, {
                      label: 'Status',
                      placeholder: 'Filter by status',
                      data: k,
                      value: d,
                      onChange: v => f(v),
                      clearable: !0,
                      leftSection: e.jsx(he, { size: 14 }),
                      radius: 'md'
                    }),
                    e.jsx(is, {
                      type: 'range',
                      label: 'Date Range',
                      placeholder: 'Pick dates range',
                      value: m,
                      onChange: c,
                      leftSection: e.jsx(ne, { size: 14 }),
                      radius: 'md'
                    }),
                    e.jsx(os, {
                      label: 'Search',
                      placeholder: 'Search projects, tasks, comments...',
                      value: o,
                      onChange: v => n(v.currentTarget.value),
                      leftSection: e.jsx(ns, { size: 14 }),
                      radius: 'md'
                    })
                  ]
                }),
                e.jsx(T, {
                  grow: !0,
                  children: e.jsx(P, {
                    variant: 'outline',
                    color: 'gray',
                    onClick: r,
                    leftSection: e.jsx(ve, { size: 14 }),
                    size: I ? 'xs' : 'sm',
                    children: 'Reset Filters'
                  })
                })
              ]
            })
          })
        ]
      })
    });
  },
  Te = ({ status: o }) => {
    switch (o) {
      case p.Approved:
        return e.jsx(W, { color: 'green', size: 'sm', children: 'Approved' });
      case p.Rejected:
        return e.jsx(W, { color: 'red', size: 'sm', children: 'Rejected' });
      case p.WaitingForApproval:
        return e.jsx(W, { color: 'yellow', size: 'sm', children: 'Pending' });
      default:
        return e.jsx(W, {
          color: 'gray',
          size: 'sm',
          children: o || 'Unknown'
        });
    }
  },
  fs = ({ timesheet: o, onApprove: n, onReject: d }) => {
    const f = o.status === p.WaitingForApproval;
    return e.jsxs(T, {
      gap: 'xs',
      justify: 'center',
      children: [
        e.jsx(ue, {
          label: 'Approve',
          children: e.jsx(P, {
            size: 'xs',
            variant: 'light',
            color: 'green',
            onClick: m => {
              (m.stopPropagation(), n(o.id));
            },
            disabled: !f,
            leftSection: e.jsx(q, { size: 14 }),
            children: 'Approve'
          })
        }),
        e.jsx(ue, {
          label: 'Reject',
          children: e.jsx(P, {
            size: 'xs',
            variant: 'light',
            color: 'red',
            onClick: m => {
              (m.stopPropagation(), d(o.id));
            },
            disabled: !f,
            leftSection: e.jsx(J, { size: 14 }),
            children: 'Reject'
          })
        })
      ]
    });
  },
  Ss = ({
    timesheet: o,
    index: n,
    isSelected: d,
    onToggleSelect: f,
    onApprove: m,
    onReject: c,
    isLeaves: s
  }) => {
    const [b, r] = l.useState(!1),
      k = o.status === p.WaitingForApproval;
    return e.jsx(Ne, {
      onClick: () => r(!b),
      shadow: 'xs',
      p: 'sm',
      radius: 'md',
      withBorder: !0,
      children: e.jsxs(C, {
        gap: 'xs',
        children: [
          e.jsx(X, {
            justify: 'space-between',
            align: 'center',
            children: e.jsxs(T, {
              gap: 'xs',
              children: [
                e.jsx(ie, {
                  checked: d,
                  onChange: j => {
                    (j.stopPropagation(), f(o.id));
                  },
                  onClick: j => j.stopPropagation()
                }),
                e.jsxs(i, { size: 'sm', fw: 600, children: ['#', n] })
              ]
            })
          }),
          e.jsxs(X, {
            justify: 'space-between',
            align: 'center',
            children: [
              e.jsx(i, {
                size: 'sm',
                c: 'dimmed',
                children: O(o.date).format('MMM D, YYYY')
              }),
              e.jsx(Te, { status: o.status })
            ]
          }),
          e.jsxs(H, {
            children: [
              e.jsx(i, {
                size: 'xs',
                c: 'dimmed',
                children: s ? 'Leave Reason' : 'Project'
              }),
              e.jsx(i, {
                size: 'sm',
                fw: 500,
                children: s ? o.leaveReason : o.project_name
              })
            ]
          }),
          e.jsx(Ce, {
            in: b,
            children: e.jsxs(C, {
              gap: 'xs',
              children: [
                e.jsx(oe, {}),
                !s &&
                  e.jsxs(H, {
                    children: [
                      e.jsx(i, { size: 'xs', c: 'dimmed', children: 'Task' }),
                      e.jsx(i, { size: 'sm', children: o.task_name })
                    ]
                  }),
                e.jsx(X, {
                  justify: 'space-between',
                  align: 'center',
                  children: e.jsxs(H, {
                    children: [
                      e.jsx(i, { size: 'xs', c: 'dimmed', children: 'Hours' }),
                      e.jsxs(W, {
                        size: 'sm',
                        variant: 'light',
                        children: [o.hours, 'h']
                      })
                    ]
                  })
                }),
                o.comments &&
                  e.jsxs(H, {
                    children: [
                      e.jsx(i, {
                        size: 'xs',
                        c: 'dimmed',
                        children: 'Comments'
                      }),
                      e.jsx(i, { size: 'sm', children: o.comments })
                    ]
                  }),
                k &&
                  e.jsxs(e.Fragment, {
                    children: [
                      e.jsx(oe, {}),
                      e.jsxs(T, {
                        grow: !0,
                        children: [
                          e.jsx(P, {
                            size: 'xs',
                            variant: 'light',
                            color: 'green',
                            onClick: j => {
                              (j.stopPropagation(), m(o.id));
                            },
                            leftSection: e.jsx(q, { size: 14 }),
                            children: 'Approve'
                          }),
                          e.jsx(P, {
                            size: 'xs',
                            variant: 'light',
                            color: 'red',
                            onClick: j => {
                              (j.stopPropagation(), c(o.id));
                            },
                            leftSection: e.jsx(J, { size: 14 }),
                            children: 'Reject'
                          })
                        ]
                      })
                    ]
                  })
              ]
            })
          })
        ]
      })
    });
  },
  Se = ({
    data: o,
    isLoading: n,
    label: d,
    isMobile: f,
    selectedIds: m,
    onToggleSelect: c,
    onToggleAll: s,
    isAllSelected: b,
    sortOrder: r,
    onSort: k,
    onApprove: j,
    onReject: I,
    activePage: v,
    itemsPerPage: S,
    themeConfig: z,
    noDataMessage: u = 'No entries found',
    isLeaves: g = !1
  }) =>
    f
      ? e.jsx(je, {
          isLoading: n,
          label: d,
          children: e.jsx(C, {
            gap: 'sm',
            children:
              o.length > 0
                ? o.map((a, V) =>
                    e.jsx(
                      Ss,
                      {
                        timesheet: a,
                        index: V + 1 + (v - 1) * S,
                        isSelected: m.includes(a.id),
                        onToggleSelect: c,
                        onApprove: j,
                        onReject: I,
                        isLeaves: g
                      },
                      a.id
                    )
                  )
                : e.jsx(F, {
                    shadow: 'sm',
                    p: 'xl',
                    radius: 'md',
                    withBorder: !0,
                    children: e.jsx(C, {
                      align: 'center',
                      gap: 'md',
                      children: e.jsx(i, { size: 'lg', children: u })
                    })
                  })
          })
        })
      : e.jsx(je, {
          isLoading: n,
          label: d,
          children: e.jsx(F, {
            shadow: 'sm',
            p: 0,
            radius: 'md',
            withBorder: !0,
            style: { overflowX: 'auto' },
            children: e.jsxs(h, {
              stickyHeader: !0,
              withTableBorder: !0,
              withColumnBorders: !0,
              children: [
                e.jsx(h.Thead, {
                  style: { backgroundColor: z.backgroundColor, color: z.color },
                  children: e.jsxs(h.Tr, {
                    children: [
                      e.jsx(h.Th, {
                        style: { padding: y(12), textAlign: 'center' },
                        children: e.jsx(ie, {
                          checked: b,
                          onChange: a => s(a.currentTarget.checked)
                        })
                      }),
                      e.jsx(h.Th, {
                        style: { padding: y(12), textAlign: 'center' },
                        children: e.jsx(i, {
                          size: 'sm',
                          fw: 500,
                          children: 'S.No'
                        })
                      }),
                      e.jsx(h.Th, {
                        style: { cursor: 'pointer', userSelect: 'none' },
                        onClick: k,
                        children: e.jsxs(T, {
                          justify: 'center',
                          gap: 'xs',
                          children: [
                            e.jsx(i, { size: 'sm', fw: 500, children: 'Date' }),
                            r === 'asc'
                              ? e.jsx(as, { size: 14 })
                              : e.jsx(ls, { size: 14 })
                          ]
                        })
                      }),
                      e.jsx(h.Th, {
                        style: { padding: y(12), textAlign: 'center' },
                        children: e.jsx(i, {
                          size: 'sm',
                          fw: 500,
                          children: g ? 'Leave Reason' : 'Project'
                        })
                      }),
                      !g &&
                        e.jsx(h.Th, {
                          style: { padding: y(12), textAlign: 'center' },
                          children: e.jsx(i, {
                            size: 'sm',
                            fw: 500,
                            children: 'Task'
                          })
                        }),
                      e.jsx(h.Th, {
                        style: { padding: y(12), textAlign: 'center' },
                        children: e.jsx(i, {
                          size: 'sm',
                          fw: 500,
                          children: 'Hours'
                        })
                      }),
                      e.jsx(h.Th, {
                        style: { padding: y(12), textAlign: 'center' },
                        children: e.jsx(i, {
                          size: 'sm',
                          fw: 500,
                          children: 'Status'
                        })
                      }),
                      e.jsx(h.Th, {
                        style: { padding: y(12), textAlign: 'center' },
                        children: e.jsx(i, {
                          size: 'sm',
                          fw: 500,
                          children: 'Actions'
                        })
                      })
                    ]
                  })
                }),
                e.jsx(h.Tbody, {
                  children:
                    o.length > 0
                      ? o.map((a, V) =>
                          e.jsxs(
                            h.Tr,
                            {
                              children: [
                                e.jsx(h.Td, {
                                  style: {
                                    textAlign: 'center',
                                    padding: y(12)
                                  },
                                  children: e.jsx(ie, {
                                    checked: m.includes(a.id),
                                    onChange: () => c(a.id)
                                  })
                                }),
                                e.jsx(h.Td, {
                                  style: {
                                    textAlign: 'center',
                                    padding: y(12)
                                  },
                                  children: e.jsx(i, {
                                    size: 'sm',
                                    children: V + 1 + (v - 1) * S
                                  })
                                }),
                                e.jsx(h.Td, {
                                  style: {
                                    padding: y(12),
                                    textAlign: 'center'
                                  },
                                  children: e.jsx(i, {
                                    size: 'sm',
                                    children: O(a.date).format('MMM D, YYYY')
                                  })
                                }),
                                e.jsx(h.Td, {
                                  style: { padding: y(12) },
                                  children: e.jsx(i, {
                                    size: 'sm',
                                    children: g ? a.leaveReason : a.project_name
                                  })
                                }),
                                !g &&
                                  e.jsx(h.Td, {
                                    style: { padding: y(12) },
                                    children: e.jsx(i, {
                                      size: 'sm',
                                      children: a.task_name
                                    })
                                  }),
                                e.jsx(h.Td, {
                                  style: {
                                    padding: y(12),
                                    textAlign: 'center'
                                  },
                                  children: e.jsxs(W, {
                                    size: 'sm',
                                    children: [a.hours, 'h']
                                  })
                                }),
                                e.jsx(h.Td, {
                                  style: {
                                    padding: y(12),
                                    textAlign: 'center'
                                  },
                                  children: e.jsx(Te, { status: a.status })
                                }),
                                e.jsx(h.Td, {
                                  style: { padding: y(12) },
                                  children: e.jsx(fs, {
                                    timesheet: a,
                                    onApprove: j,
                                    onReject: I
                                  })
                                })
                              ]
                            },
                            a.id
                          )
                        )
                      : e.jsx(h.Tr, {
                          children: e.jsx(h.Td, {
                            colSpan: g ? 7 : 8,
                            style: { textAlign: 'center', padding: y(32) },
                            children: e.jsx(i, { size: 'lg', children: u })
                          })
                        })
                })
              ]
            })
          })
        }),
  ys = ['10', '20', '50', '100'],
  zs = 20,
  ye = 10,
  ws = o => {
    const [n, d] = l.useState(''),
      [f] = $e(n, 300),
      [m, c] = l.useState(p.WaitingForApproval),
      [s, b] = l.useState([
        O().startOf('month').toDate(),
        O().endOf('month').toDate()
      ]),
      [r, k] = l.useState('desc'),
      j = l.useMemo(() => {
        let S = [...o];
        if (
          (m && (S = S.filter(z => z.status === m)),
          s[0] &&
            s[1] &&
            (S = S.filter(z => {
              const u = O(z.date);
              return u.isSameOrAfter(s[0]) && u.isSameOrBefore(s[1]);
            })),
          f.trim())
        ) {
          const z = f.toLowerCase();
          S = S.filter(u => {
            var g;
            return (
              u.project_name.toLowerCase().includes(z) ||
              u.task_name.toLowerCase().includes(z) ||
              ((g = u.comments) == null ? void 0 : g.toLowerCase().includes(z))
            );
          });
        }
        return (
          S.sort((z, u) => {
            const g = new Date(z.date).getTime(),
              a = new Date(u.date).getTime();
            return r === 'asc' ? g - a : a - g;
          }),
          S
        );
      }, [o, m, s, f, r]),
      I = l.useCallback(() => {
        k(S => (S === 'asc' ? 'desc' : 'asc'));
      }, []),
      v = l.useCallback(() => {
        (c(null),
          d(''),
          b([O().startOf('month').toDate(), O().endOf('month').toDate()]));
      }, []);
    return {
      searchQuery: n,
      setSearchQuery: d,
      selectedStatus: m,
      setSelectedStatus: c,
      dateRange: s,
      setDateRange: b,
      sortOrder: r,
      toggleSortOrder: I,
      resetFilters: v,
      filteredTimesheets: j
    };
  },
  kt = () => {
    const n = Ve().employeeId,
      { showSuccessToast: d } = cs(),
      [f, m] = Ye(qe),
      { themeConfig: c } = ze(),
      s = N('(max-width: 768px)'),
      b = N('(max-width: 1024px)'),
      r = N('(max-width: 500px)'),
      [k, j] = l.useState([]),
      [I, v] = l.useState(!0),
      [S, z] = l.useState(null),
      [u, g] = l.useState([]),
      [a, V] = l.useState(p.Approved),
      [R, K] = l.useState(1),
      [w, Z] = l.useState(zs),
      [Ae, be] = l.useState(!s),
      [ke, { open: Ie, close: G }] = ms(!1);
    l.useEffect(() => {
      r && w > 5 ? Z(5) : s && w > ye && Z(ye);
    }, [s, r, w]);
    const {
        searchQuery: ae,
        setSearchQuery: De,
        selectedStatus: le,
        setSelectedStatus: Me,
        dateRange: _,
        setDateRange: Pe,
        sortOrder: ce,
        toggleSortOrder: de,
        resetFilters: Ee,
        filteredTimesheets: U
      } = ws(k),
      { workEntries: B, leaveEntries: L } = l.useMemo(
        () => ({
          workEntries: U.filter(t => !t.isVacation),
          leaveEntries: U.filter(t => t.isVacation)
        }),
        [U]
      ),
      { paginatedWork: Re, totalPagesWork: me } = l.useMemo(() => {
        const t = (R - 1) * w,
          x = t + w,
          D = B.slice(t, x),
          A = Math.ceil(B.length / w);
        return { paginatedWork: D, totalPagesWork: A };
      }, [B, R, w]),
      { paginatedLeaves: Be, totalPagesLeaves: pe } = l.useMemo(() => {
        const t = (R - 1) * w,
          x = t + w,
          D = L.slice(t, x),
          A = Math.ceil(L.length / w);
        return { paginatedLeaves: D, totalPagesLeaves: A };
      }, [L, R, w]);
    (l.useEffect(() => {
      (async () => {
        if (n)
          try {
            const x = await Je(n);
            m(x);
          } catch (x) {
            (console.error('Error fetching employee details:', x),
              $.error('Failed to load employee details'));
          }
      })();
    }, [n, m]),
      l.useEffect(() => {
        (async () => {
          var x, D;
          if (!(!n || !_[0] || !_[1])) {
            (v(!0), z(null));
            try {
              const A = await Ue(_[0], _[1], n),
                M = Xe(A);
              j(M.filter(E => E.hours > 0 || E.isVacation));
            } catch (A) {
              const M =
                ((D =
                  (x = A == null ? void 0 : A.response) == null
                    ? void 0
                    : x.data) == null
                  ? void 0
                  : D.message) || 'Failed to load timesheets';
              (z(M), $.error(M));
            } finally {
              v(!1);
            }
          }
        })();
      }, [_, n]),
      l.useEffect(() => {
        K(1);
      }, [ae, le, _, w]));
    const Y = l.useCallback(
        async (t, x) => {
          var D, A;
          if (n) {
            v(!0);
            try {
              const M = He(
                  k
                    .filter(Q => t.includes(Q.id))
                    .map(Q => ({ ...Q, status: x })),
                  x
                ),
                E = await Ge(M, n);
              if (
                (j(Q =>
                  Q.map(ee => (t.includes(ee.id) ? { ...ee, status: x } : ee))
                ),
                g([]),
                (E == null ? void 0 : E.success) === !1)
              ) {
                $.error(E.message || 'Failed to update timesheet status');
                return;
              } else
                d(
                  `Successfully ${x === p.Approved ? 'approved' : 'rejected'} ${t.length} timesheet(s)`
                );
              G();
            } catch (M) {
              const E =
                ((A =
                  (D = M == null ? void 0 : M.response) == null
                    ? void 0
                    : D.data) == null
                  ? void 0
                  : A.message) || 'Failed to update timesheet status';
              $.error(E);
            } finally {
              v(!1);
            }
          }
        },
        [k, n, G, d]
      ),
      Fe = l.useCallback(
        t => {
          g(t ? B.map(x => x.id) : []);
        },
        [B]
      ),
      xe = l.useCallback(t => {
        g(x => (x.includes(t) ? x.filter(D => D !== t) : [...x, t]));
      }, []),
      _e = l.useMemo(
        () => B.length > 0 && B.every(t => u.includes(t.id)),
        [B, u]
      ),
      Oe = l.useMemo(
        () => [
          { value: p.WaitingForApproval, label: 'Pending' },
          { value: p.Approved, label: 'Approved' },
          { value: p.Rejected, label: 'Rejected' }
        ],
        []
      ),
      We = l.useMemo(
        () => [
          { value: p.Approved, label: 'Approve Selected' },
          { value: p.Rejected, label: 'Reject Selected' }
        ],
        []
      );
    if (S)
      return e.jsx(ge, {
        size: r ? 'xs' : s ? 'sm' : 'lg',
        py: 'xl',
        px: r ? 'xs' : 'md',
        children: e.jsxs(F, {
          shadow: 'sm',
          p: r ? 'xs' : s ? 'sm' : 'lg',
          radius: 'md',
          withBorder: !0,
          children: [
            e.jsx(i, {
              ta: 'center',
              size: r ? 'sm' : s ? 'md' : 'lg',
              children: S
            }),
            e.jsx(se, {
              mt: 'md',
              children: e.jsx(P, {
                onClick: () => window.location.reload(),
                fullWidth: s,
                size: r ? 'sm' : 'md',
                children: 'Try Again'
              })
            })
          ]
        })
      });
    const Le = ds(f);
    return e.jsxs(ge, {
      size: b ? 'lg' : 'xl',
      py: r ? 'xs' : s ? 'sm' : 'md',
      my: r ? 'xs' : s ? 'sm' : 'xl',
      px: r ? 'xs' : s ? 'sm' : 'md',
      children: [
        e.jsxs(C, {
          gap: s ? 'sm' : 'md',
          children: [
            e.jsx(F, {
              shadow: 'sm',
              p: 'lg',
              radius: 'md',
              withBorder: !0,
              mt: 'xl',
              children: e.jsxs(T, {
                justify: 'space-between',
                align: s ? 'flex-start' : 'center',
                wrap: 'nowrap',
                gap: 'sm',
                children: [
                  e.jsxs(C, {
                    gap: s ? 4 : 6,
                    style: { flex: s ? '1 1 100%' : 'auto' },
                    children: [
                      e.jsxs(T, {
                        gap: s ? 8 : 10,
                        align: 'center',
                        children: [
                          e.jsx(ne, {
                            size: s ? 20 : 24,
                            color: c.button.color
                          }),
                          e.jsx(i, {
                            size: s ? 'lg' : 'xl',
                            fw: 700,
                            c: c.color,
                            children: 'Timesheet Management'
                          })
                        ]
                      }),
                      e.jsxs(i, {
                        size: s ? 'xs' : 'sm',
                        c: 'dimmed',
                        style: { lineHeight: 1.4, marginLeft: s ? 28 : 34 },
                        children: [
                          'Manage and review your employee timesheets —',
                          ' ',
                          e.jsx(i, {
                            span: !0,
                            fw: 600,
                            c: c.color,
                            children: U.length
                          }),
                          ' ',
                          'entries found'
                        ]
                      })
                    ]
                  }),
                  e.jsx(Ke, { id: n })
                ]
              })
            }),
            e.jsx(js, { employeeDetails: f, employeeInfoItems: Le }),
            e.jsx(gs, {
              searchQuery: ae,
              setSearchQuery: De,
              selectedStatus: le,
              setSelectedStatus: Me,
              dateRange: _,
              setDateRange: Pe,
              filtersExpanded: Ae,
              setFiltersExpanded: be,
              resetFilters: Ee,
              statusOptions: Oe
            }),
            u.length > 0 &&
              e.jsx(F, {
                shadow: 'sm',
                p: r ? 'xs' : s ? 'sm' : 'md',
                radius: 'md',
                withBorder: !0,
                children: e.jsxs(C, {
                  gap: 'sm',
                  children: [
                    e.jsxs(i, {
                      fw: 500,
                      size: r ? 'xs' : s ? 'sm' : 'md',
                      children: [
                        e.jsx(W, {
                          variant: 'filled',
                          color: 'blue',
                          mr: 'xs',
                          size: r ? 'xs' : 'sm',
                          children: u.length
                        }),
                        r ? 'sel.' : 'selected'
                      ]
                    }),
                    e.jsxs(X, {
                      gap: 'xs',
                      direction: s ? 'column' : 'row',
                      align: 'stretch',
                      children: [
                        e.jsx(re, {
                          placeholder: 'Select action',
                          data: We,
                          value: a,
                          onChange: t => V(t),
                          flex: s ? void 0 : 1,
                          size: r ? 'xs' : 'sm',
                          leftSection:
                            a === p.Approved
                              ? e.jsx(q, { size: 14 })
                              : e.jsx(J, { size: 14 })
                        }),
                        e.jsxs(T, {
                          gap: 'xs',
                          grow: s,
                          children: [
                            e.jsx(P, {
                              color: a === p.Approved ? 'green' : 'red',
                              size: r ? 'xs' : 'sm',
                              leftSection:
                                a === p.Approved
                                  ? e.jsx(q, { size: 16 })
                                  : e.jsx(J, { size: 16 }),
                              onClick: Ie,
                              children: r ? 'Apply' : 'Apply Action'
                            }),
                            e.jsx(ps, {
                              variant: 'subtle',
                              onClick: () => g([]),
                              size: r ? 'md' : 'lg',
                              children: e.jsx(ve, { size: 16 })
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              }),
            e.jsxs(C, {
              gap: 'xs',
              children: [
                e.jsxs(T, {
                  justify: 'space-between',
                  children: [
                    e.jsx(i, {
                      size: 'lg',
                      fw: 700,
                      c: c.color,
                      children: 'Timesheet Entries'
                    }),
                    !s &&
                      e.jsxs(T, {
                        gap: 'xs',
                        children: [
                          e.jsx(i, { size: 'xs', children: 'Items per page:' }),
                          e.jsx(re, {
                            data: ys,
                            value: w.toString(),
                            onChange: t => Z(Number(t) || 20),
                            w: 80,
                            size: 'xs'
                          })
                        ]
                      })
                  ]
                }),
                e.jsx(Se, {
                  data: Re,
                  isLoading: I,
                  label: 'timesheets',
                  isMobile: !!s,
                  selectedIds: u,
                  onToggleSelect: xe,
                  onToggleAll: Fe,
                  isAllSelected: _e,
                  sortOrder: ce,
                  onSort: de,
                  onApprove: t => Y([t], p.Approved),
                  onReject: t => Y([t], p.Rejected),
                  activePage: R,
                  itemsPerPage: w,
                  themeConfig: c,
                  noDataMessage: 'No timesheet entries found',
                  isLeaves: !1
                }),
                me > 1 &&
                  e.jsx(se, {
                    mt: 'md',
                    children: e.jsx(fe, {
                      value: R,
                      onChange: K,
                      total: me,
                      size: 'sm',
                      radius: 'md'
                    })
                  })
              ]
            }),
            e.jsx(oe, { my: 'md' }),
            e.jsxs(C, {
              gap: 'xs',
              children: [
                e.jsx(i, {
                  size: 'lg',
                  fw: 700,
                  c: c.color,
                  children: 'Leaves'
                }),
                e.jsx(Se, {
                  data: Be,
                  isLoading: I,
                  label: 'leaves',
                  isMobile: !!s,
                  selectedIds: u,
                  onToggleSelect: xe,
                  onToggleAll: t => {
                    g(t ? L.map(x => x.id) : []);
                  },
                  isAllSelected: L.length > 0 && L.every(t => u.includes(t.id)),
                  sortOrder: ce,
                  onSort: de,
                  onApprove: t => Y([t], p.Approved),
                  onReject: t => Y([t], p.Rejected),
                  activePage: R,
                  itemsPerPage: w,
                  themeConfig: c,
                  noDataMessage: 'No leave entries found',
                  isLeaves: !0
                }),
                pe > 1 &&
                  e.jsx(se, {
                    mt: 'md',
                    children: e.jsx(fe, {
                      value: R,
                      onChange: K,
                      total: pe,
                      size: 'sm',
                      radius: 'md'
                    })
                  })
              ]
            })
          ]
        }),
        e.jsx(Qe, {
          opened: ke,
          onClose: G,
          title: r ? 'Confirm' : 'Confirm Status Update',
          size: r ? 'xs' : s ? 'sm' : 'md',
          centered: !0,
          fullScreen: r,
          children: e.jsxs(C, {
            gap: 'md',
            children: [
              e.jsx(i, {
                size: r ? 'xs' : s ? 'sm' : 'md',
                children: r
                  ? e.jsxs(e.Fragment, {
                      children: [
                        a === p.Approved ? 'Approve' : 'Reject',
                        ' ',
                        u.length,
                        ' timesheet(s)?'
                      ]
                    })
                  : e.jsxs(e.Fragment, {
                      children: [
                        'Are you sure you want to',
                        ' ',
                        a === p.Approved ? 'approve' : 'reject',
                        ' ',
                        u.length,
                        ' timesheet(s)?'
                      ]
                    })
              }),
              e.jsxs(T, {
                justify: 'flex-end',
                grow: s,
                children: [
                  e.jsx(P, {
                    variant: 'outline',
                    onClick: G,
                    size: r ? 'xs' : 'sm',
                    children: 'Cancel'
                  }),
                  e.jsx(P, {
                    color: a === p.Approved ? 'green' : 'red',
                    onClick: () => Y(u, a),
                    size: r ? 'xs' : 'sm',
                    children: r
                      ? 'Confirm'
                      : `Confirm ${a === p.Approved ? 'Approval' : 'Rejection'}`
                  })
                ]
              })
            ]
          })
        })
      ]
    });
  };
export { kt as EmployeeTimesheetAdminView };
