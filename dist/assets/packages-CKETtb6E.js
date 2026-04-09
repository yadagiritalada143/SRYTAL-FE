import {
  e as h,
  C as te,
  v as oe,
  s as A,
  j as e,
  T as i,
  V as $,
  S as j,
  G as M,
  W as ae
} from './index-Cn_-nzwF.js';
import { o as W } from './button-D3DmOMH8.js';
import { u as ie } from './horizontal-scroll-BMLkS5oA.js';
import { h as z } from './common-services-DPGUVDMw.js';
import { D as ne } from './DataView-D_fx5Wkp.js';
import { d as ce } from './debounce-fynzmAtJ.js';
import { d as le } from './useAdminQueries-CeOlvTzF.js';
import { C as v } from './CommonButton-D8AVyhIy.js';
import { C as F } from './Container-3LzVKj3b.js';
import { C as y } from './Card-BOCM3d4L.js';
import { F as R } from './Flex-BbX87tE5.js';
import { T as de } from './TextInput-DUPEWkCs.js';
import { I as me } from './IconSearch-D9mxNvB2.js';
import { S as he } from './Select-KZOOD-9X.js';
import { B as S } from './Badge-pr8cFvg5.js';
import { I as G } from './IconPackage-DBvNit8w.js';
import { I as N } from './IconPlus-zkiZIHJ7.js';
import { T as c } from './Table-Bwpju6TN.js';
import { T as H } from './Tooltip-BnLcCD-S.js';
import { A as V } from './ActionIcon-BBM-Tm4F.js';
import { I as U } from './IconEdit-BA67kK5H.js';
import { P as xe } from './Pagination-BaGk3Wb1.js';
import { D as ue } from './Divider-C8nnAxUa.js';
import { I as ge, a as pe } from './IconSortDescending-Cj0BX4vG.js';
import './api-client-CcbR4Lbf.js';
import './createReactComponent-wv-YgGrS.js';
import './useQuery-4fhBkLAX.js';
import './admin-services-CTc0QqQI.js';
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
const je = ['5', '10', '20', '50'],
  Q = 10,
  fe = t => {
    const [d, l] = h.useState(''),
      [a, x] = h.useState({ field: 'title', order: 'asc' }),
      o = h.useMemo(() => {
        let u = t;
        if (d.trim()) {
          const r = d.toLowerCase().trim();
          u = t.filter(g => {
            var n, m;
            return (
              ((n = g.title) == null ? void 0 : n.toLowerCase().includes(r)) ||
              ((m = g.description) == null
                ? void 0
                : m.toLowerCase().includes(r))
            );
          });
        }
        return [...u].sort((r, g) => {
          var b, P;
          let n = '',
            m = '';
          if (
            (a.field === 'startDate' || a.field === 'endDate'
              ? ((n = new Date(r[a.field]).getTime()),
                (m = new Date(g[a.field]).getTime()))
              : ((n =
                  ((b = r[a.field]) == null
                    ? void 0
                    : b.toString().toLowerCase()) || ''),
                (m =
                  ((P = g[a.field]) == null
                    ? void 0
                    : P.toString().toLowerCase()) || '')),
            typeof n == 'string' && typeof m == 'string')
          ) {
            const f = n.localeCompare(m);
            return a.order === 'asc' ? f : -f;
          } else return a.order === 'asc' ? n - m : m - n;
        });
      }, [t, d, a]),
      T = h.useCallback(u => {
        x(r => ({
          field: u,
          order: r.field === u && r.order === 'asc' ? 'desc' : 'asc'
        }));
      }, []);
    return {
      searchQuery: d,
      setSearchQuery: l,
      sortConfig: a,
      handleSort: T,
      filteredPackages: o
    };
  },
  we = ({
    pkg: t,
    index: d,
    activePage: l,
    itemsPerPage: a,
    onEdit: x,
    themeConfig: o
  }) => {
    const T = z(t.endDate).isBefore(z(), 'day');
    return e.jsx(
      y,
      {
        id: `package-${t._id}`,
        shadow: 'sm',
        p: 'md',
        mb: 'sm',
        withBorder: !0,
        children: e.jsxs(j, {
          gap: 'sm',
          children: [
            e.jsxs(M, {
              justify: 'space-between',
              align: 'center',
              children: [
                e.jsxs(S, {
                  variant: 'filled',
                  color: o.accentColor,
                  children: ['#', d + 1 + (l - 1) * a]
                }),
                e.jsx(V, {
                  variant: 'subtle',
                  color: o.button.color,
                  onClick: () => x(t._id),
                  size: 'md',
                  children: e.jsx(U, { size: 18 })
                })
              ]
            }),
            e.jsx(ue, {}),
            e.jsxs(j, {
              gap: 2,
              children: [
                e.jsx(i, {
                  size: 'xs',
                  fw: 600,
                  c: 'dimmed',
                  children: 'Package Title'
                }),
                e.jsx(i, { size: 'lg', fw: 700, children: t.title })
              ]
            }),
            e.jsxs(j, {
              gap: 2,
              children: [
                e.jsx(i, {
                  size: 'xs',
                  fw: 600,
                  c: 'dimmed',
                  children: 'Description'
                }),
                e.jsx(i, { size: 'sm', lineClamp: 3, children: t.description })
              ]
            }),
            e.jsxs(M, {
              grow: !0,
              children: [
                e.jsxs(j, {
                  gap: 2,
                  children: [
                    e.jsx(i, {
                      size: 'xs',
                      fw: 600,
                      c: 'dimmed',
                      children: 'Start Date'
                    }),
                    e.jsx(S, {
                      size: 'sm',
                      variant: 'light',
                      color: o.successColor,
                      children: z(t.startDate).format('MMM DD, YYYY')
                    })
                  ]
                }),
                e.jsxs(j, {
                  gap: 2,
                  children: [
                    e.jsx(i, {
                      size: 'xs',
                      fw: 600,
                      c: 'dimmed',
                      children: 'End Date'
                    }),
                    e.jsx(S, {
                      size: 'sm',
                      variant: 'light',
                      color: T ? o.dangerColor : o.successColor,
                      children: z(t.endDate).format('MMM DD, YYYY')
                    })
                  ]
                })
              ]
            })
          ]
        })
      },
      t._id
    );
  },
  Ce = ({ sortConfig: t, onSort: d, themeConfig: l, isTablet: a }) => {
    const x = ({ field: o, children: T }) =>
      e.jsx(c.Th, {
        className:
          'border cursor-pointer select-none hover:bg-opacity-80 transition-colors',
        onClick: () => d(o),
        children: e.jsxs(M, {
          justify: 'center',
          children: [
            e.jsx(i, { size: 'sm', fw: 500, children: T }),
            t.field === o &&
              (t.order === 'asc'
                ? e.jsx(ge, { size: 14 })
                : e.jsx(pe, { size: 14 }))
          ]
        })
      });
    return e.jsx(c.Thead, {
      style: { backgroundColor: l.backgroundColor, color: l.color },
      children: e.jsxs(c.Tr, {
        children: [
          e.jsx(c.Th, {
            className: 'p-3 border',
            ta: 'center',
            style: { minWidth: '60px' },
            children: e.jsx(i, { size: 'sm', fw: 500, children: 'S.No' })
          }),
          e.jsx(x, { field: 'title', children: 'Title' }),
          !a &&
            e.jsx(c.Th, {
              className: 'p-3 border text-center',
              style: { minWidth: '250px' },
              children: e.jsx(i, {
                size: 'sm',
                fw: 500,
                children: 'Description'
              })
            }),
          e.jsx(x, { field: 'startDate', children: 'Start Date' }),
          e.jsx(x, { field: 'endDate', children: 'End Date' }),
          e.jsx(c.Th, {
            className: 'p-3 border',
            ta: 'center',
            children: e.jsx(i, { size: 'sm', fw: 500, children: 'Actions' })
          })
        ]
      })
    });
  },
  ze = ({ filteredCount: t, handleAddPackage: d, isMobile: l }) =>
    e.jsx(y, {
      shadow: 'sm',
      p: l ? 'md' : 'lg',
      radius: 'md',
      withBorder: !0,
      mt: 'xl',
      children: e.jsxs(R, {
        direction: l ? 'column' : 'row',
        justify: 'space-between',
        align: 'center',
        gap: 'md',
        children: [
          e.jsxs(i, {
            size: l ? 'lg' : 'xl',
            fw: 700,
            ta: l ? 'center' : 'left',
            children: ['Manage Packages (', t, ' Packages)']
          }),
          e.jsx(v, {
            leftSection: e.jsx(N, { size: 16 }),
            onClick: d,
            variant: 'filled',
            fullWidth: l,
            size: l ? 'md' : 'sm',
            children: 'Add Package'
          })
        ]
      })
    }),
  ns = () => {
    const { data: t = [], isLoading: d, error: l } = le(),
      [a, x] = h.useState(1),
      [o, T] = h.useState(Q),
      u = te(),
      { themeConfig: r, organizationConfig: g } = oe(),
      n = A('(max-width: 768px)'),
      m = A('(max-width: 1024px)'),
      b = A('(max-width: 500px)'),
      P = h.useRef(null),
      {
        searchQuery: f,
        setSearchQuery: _,
        sortConfig: q,
        handleSort: O,
        filteredPackages: p
      } = fe(t),
      {
        scrollRef: X,
        handleMouseDown: J,
        handleMouseMove: K,
        handleMouseUp: B,
        handleTouchEnd: Z,
        handleTouchMove: ee,
        handleTouchStart: se
      } = ie(),
      re = h.useMemo(() => ce(s => _(s), 300), [_]),
      { paginatedPackages: k, totalPages: Y } = h.useMemo(() => {
        const s = (a - 1) * o,
          w = s + o,
          D = p.slice(s, w),
          E = Math.ceil(p.length / o);
        return { paginatedPackages: D, totalPages: E };
      }, [p, a, o]);
    (h.useEffect(() => {
      x(1);
    }, [f, o]),
      h.useEffect(() => {
        const s = localStorage.getItem('packageId');
        if (!s || p.length === 0) return;
        const w = p.findIndex(C => C._id === s);
        if (w === -1) return;
        const D = Math.floor(w / o) + 1;
        (x(D), (P.current = s));
        const E = setTimeout(() => {
          const C = document.getElementById(`package-${s}`);
          C &&
            (C.scrollIntoView({ behavior: 'smooth', block: 'center' }),
            (C.style.backgroundColor = `${r.button.color}50`),
            (C.style.color = `${r.button.textColor}70`),
            setTimeout(() => {
              (localStorage.removeItem('packageId'),
                (C.style.backgroundColor = r.headerBackgroundColor),
                (C.style.color = r.color),
                (P.current = null));
            }, 2e3));
        }, 100);
        return () => clearTimeout(E);
      }, [
        p,
        o,
        r.headerBackgroundColor,
        r.color,
        r.button.color,
        r.button.textColor
      ]));
    const L = h.useCallback(
        s => {
          (localStorage.setItem('packageId', s),
            u(`${W(g.organization_name)}/dashboard/updates/${s}`));
        },
        [u, g.organization_name]
      ),
      I = h.useCallback(() => {
        u(`${W(g.organization_name)}/dashboard/addPackage`);
      }, [u, g.organization_name]);
    return l
      ? e.jsx(F, {
          size: n ? 'sm' : 'lg',
          py: 'xl',
          children: e.jsxs(y, {
            shadow: 'sm',
            p: 'lg',
            radius: 'md',
            withBorder: !0,
            children: [
              e.jsx(i, {
                ta: 'center',
                size: 'lg',
                children: 'Failed to fetch packages.'
              }),
              e.jsx($, {
                mt: 'md',
                children: e.jsx(v, {
                  onClick: () => window.location.reload(),
                  children: 'Try Again'
                })
              })
            ]
          })
        })
      : e.jsx(F, {
          size: 'xl',
          py: 'md',
          my: 'xl',
          px: b ? 'xs' : 'md',
          children: e.jsxs(j, {
            gap: 'md',
            children: [
              e.jsx(ze, {
                filteredCount: p.length,
                handleAddPackage: I,
                isMobile: n
              }),
              e.jsx(y, {
                shadow: 'sm',
                p: n ? 'sm' : 'md',
                radius: 'md',
                withBorder: !0,
                children: e.jsxs(R, {
                  gap: 'md',
                  align: 'center',
                  wrap: n ? 'wrap' : 'nowrap',
                  justify: 'space-between',
                  children: [
                    e.jsx(de, {
                      placeholder: 'Search by title or description...',
                      leftSection: e.jsx(me, { size: 16 }),
                      onChange: s => re(s.target.value),
                      radius: 'md',
                      size: n ? 'sm' : 'md',
                      style: { flex: 1, minWidth: n ? '100%' : '320px' }
                    }),
                    e.jsxs(M, {
                      gap: 'xs',
                      children: [
                        e.jsx(i, { size: 'sm', children: 'Items per page:' }),
                        e.jsx(he, {
                          data: je,
                          value: o.toString(),
                          onChange: s => T(Number(s) || Q),
                          w: 70,
                          size: 'sm'
                        })
                      ]
                    }),
                    p.length !== t.length &&
                      e.jsxs(S, {
                        variant: 'light',
                        color: r.accentColor,
                        children: [p.length, ' of ', t.length, ' packages']
                      })
                  ]
                })
              }),
              e.jsx(y, {
                shadow: 'sm',
                p: 0,
                radius: 'md',
                withBorder: !0,
                children: e.jsx(ne, {
                  isLoading: d,
                  label: 'packages',
                  isEmpty: k.length === 0 && !d,
                  children: n
                    ? e.jsx(ae, {
                        p: 'md',
                        children: e.jsx(j, {
                          gap: 'sm',
                          children:
                            k.length > 0
                              ? k.map((s, w) =>
                                  e.jsx(
                                    we,
                                    {
                                      pkg: s,
                                      index: w,
                                      activePage: a,
                                      itemsPerPage: o,
                                      onEdit: L,
                                      themeConfig: r
                                    },
                                    s._id
                                  )
                                )
                              : e.jsx(y, {
                                  p: 'xl',
                                  withBorder: !0,
                                  children: e.jsxs(j, {
                                    align: 'center',
                                    gap: 'md',
                                    children: [
                                      e.jsx(G, { size: 48, opacity: 0.5 }),
                                      e.jsx(i, {
                                        size: 'lg',
                                        ta: 'center',
                                        children: 'No packages found'
                                      }),
                                      e.jsx(i, {
                                        size: 'sm',
                                        ta: 'center',
                                        children: f
                                          ? 'Try adjusting your search'
                                          : 'Start by adding your first package'
                                      }),
                                      !f &&
                                        e.jsx(v, {
                                          variant: 'light',
                                          leftSection: e.jsx(N, { size: 16 }),
                                          onClick: I,
                                          fullWidth: b,
                                          children: 'Add Package'
                                        })
                                    ]
                                  })
                                })
                        })
                      })
                    : e.jsx('div', {
                        ref: X,
                        onMouseDown: J,
                        onMouseMove: K,
                        onMouseUp: B,
                        onMouseLeave: B,
                        onTouchStart: se,
                        onTouchMove: ee,
                        onTouchEnd: Z,
                        style: { overflowX: 'auto' },
                        children: e.jsxs(c, {
                          stickyHeader: !0,
                          withTableBorder: !0,
                          withColumnBorders: !0,
                          children: [
                            e.jsx(Ce, {
                              sortConfig: q,
                              onSort: O,
                              themeConfig: r,
                              isTablet: m
                            }),
                            e.jsx(c.Tbody, {
                              children:
                                k.length > 0
                                  ? k.map((s, w) => {
                                      const D = z(s.endDate).isBefore(
                                        z(),
                                        'day'
                                      );
                                      return e.jsxs(
                                        c.Tr,
                                        {
                                          id: `package-${s._id}`,
                                          className: 'transition-colors',
                                          children: [
                                            e.jsx(c.Td, {
                                              className: 'text-center p-3',
                                              children: e.jsx(i, {
                                                size: 'sm',
                                                children: w + 1 + (a - 1) * o
                                              })
                                            }),
                                            e.jsx(c.Td, {
                                              className: 'p-3',
                                              children: e.jsx(i, {
                                                size: 'sm',
                                                fw: 500,
                                                children: s.title
                                              })
                                            }),
                                            !m &&
                                              e.jsx(c.Td, {
                                                className: 'p-3',
                                                children: e.jsx(H, {
                                                  label: s.description,
                                                  withArrow: !0,
                                                  children: e.jsx(i, {
                                                    size: 'sm',
                                                    lineClamp: 2,
                                                    children: s.description
                                                  })
                                                })
                                              }),
                                            e.jsx(c.Td, {
                                              className: 'p-3 text-center',
                                              children: e.jsx(S, {
                                                size: 'sm',
                                                variant: 'light',
                                                color: r.successColor,
                                                children: z(s.startDate).format(
                                                  'MMM DD, YYYY'
                                                )
                                              })
                                            }),
                                            e.jsx(c.Td, {
                                              className: 'p-3 text-center',
                                              children: e.jsx(S, {
                                                size: 'sm',
                                                variant: 'light',
                                                color: D
                                                  ? r.dangerColor
                                                  : r.successColor,
                                                children: z(s.endDate).format(
                                                  'MMM DD, YYYY'
                                                )
                                              })
                                            }),
                                            e.jsx(c.Td, {
                                              className: 'p-3 text-center',
                                              children: e.jsx(M, {
                                                gap: 'xs',
                                                justify: 'center',
                                                children: e.jsx(H, {
                                                  label: 'Edit Package',
                                                  children: e.jsx(V, {
                                                    variant: 'subtle',
                                                    color: r.button.color,
                                                    onClick: () => L(s._id),
                                                    size: 'sm',
                                                    children: e.jsx(U, {
                                                      size: 16
                                                    })
                                                  })
                                                })
                                              })
                                            })
                                          ]
                                        },
                                        s._id
                                      );
                                    })
                                  : e.jsx(c.Tr, {
                                      children: e.jsx(c.Td, {
                                        colSpan: m ? 5 : 6,
                                        className: 'text-center p-8',
                                        children: e.jsxs(j, {
                                          align: 'center',
                                          gap: 'md',
                                          children: [
                                            e.jsx(G, {
                                              size: 48,
                                              opacity: 0.5
                                            }),
                                            e.jsx(i, {
                                              size: 'lg',
                                              children: 'No packages found'
                                            }),
                                            e.jsx(i, {
                                              size: 'sm',
                                              children: f
                                                ? 'Try adjusting your search'
                                                : 'Start by adding your first package'
                                            }),
                                            !f &&
                                              e.jsx(v, {
                                                variant: 'light',
                                                leftSection: e.jsx(N, {
                                                  size: 16
                                                }),
                                                onClick: I,
                                                children: 'Add Package'
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
              Y > 1 &&
                e.jsx($, {
                  children: e.jsx(xe, {
                    value: a,
                    onChange: x,
                    total: Y,
                    size: n ? 'sm' : 'md',
                    radius: 'md',
                    withEdges: !0,
                    color: r.button.color
                  })
                })
            ]
          })
        });
  };
export { ns as default };
