import { c as N } from './createReactComponent-wv-YgGrS.js';
import {
  C as F,
  v as M,
  a6 as L,
  e as l,
  j as e,
  U as $,
  K as H,
  S as z,
  T as X,
  D as v
} from './index-Cn_-nzwF.js';
import { I as q } from './IconChevronDown-DCbfWWlv.js';
import { u as W, b as D } from './button-D3DmOMH8.js';
import { l as K } from './api-client-CcbR4Lbf.js';
import { u as T } from './toast-Cmrx_Mrb.js';
import { T as Y } from './background-IMiwGkbJ.js';
import { L as G } from './buttons-A92fQUY5.js';
import { I as J } from './IconX-BFEQcM8f.js';
import { o as Q, s as k, u as V, t as Z } from './zod-DC47Kjo4.js';
import { S as A } from './base-model-DqPjs_FM.js';
import { C as S } from './CommonButton-D8AVyhIy.js';
import { P as C } from './PasswordInput-CGTZTn1Z.js';
import { T as O } from './Title-T3OvY56h.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ee = [
    [
      'path',
      {
        d: 'M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18',
        key: 'svg-0'
      }
    ],
    ['path', { d: 'M13 8l2 0', key: 'svg-1' }],
    ['path', { d: 'M13 12l2 0', key: 'svg-2' }]
  ],
  ze = N('outline', 'notebook', 'Notebook', ee);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const se = [
    ['path', { d: 'M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0', key: 'svg-0' }],
    ['path', { d: 'M6 21v-2a4 4 0 0 1 4 -4h3.5', key: 'svg-1' }],
    [
      'path',
      {
        d: 'M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39',
        key: 'svg-2'
      }
    ]
  ],
  Te = N('outline', 'user-edit', 'UserEdit', se);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ae = [
    ['path', { d: 'M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0', key: 'svg-0' }],
    ['path', { d: 'M6 21v-2a4 4 0 0 1 4 -4h.5', key: 'svg-1' }],
    [
      'path',
      {
        d: 'M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138',
        key: 'svg-2'
      }
    ]
  ],
  Ee = N('outline', 'user-star', 'UserStar', ae),
  oe = '_fab_1t9ar_2',
  re = '_fabX_1t9ar_16',
  te = '_fabContent_1t9ar_53',
  ne = '_fabLogo_1t9ar_61',
  le = '_backdrop_1t9ar_67',
  ie = '_navbar_1t9ar_88',
  de = '_expanded_1t9ar_108',
  ce = '_collapsed_1t9ar_114',
  ue = '_navbarHeader_1t9ar_121',
  me = '_logoExpanded_1t9ar_130',
  pe = '_navbarMain_1t9ar_147',
  f = {
    fab: oe,
    fabX: re,
    fabContent: te,
    fabLogo: ne,
    backdrop: le,
    navbar: ie,
    expanded: de,
    collapsed: ce,
    navbarHeader: ue,
    logoExpanded: me,
    navbarMain: pe
  };
function ge({
  icon: x,
  name: o,
  url: r,
  organization: t,
  isActive: s,
  onClick: i,
  setIsDrawerOpen: d,
  children: a
}) {
  const c = F(),
    { themeConfig: b } = M(),
    u = L(),
    [m, n] = l.useState(!1),
    [y, h] = l.useState(!1),
    _ = l.useRef(''),
    j = l.useMemo(
      () =>
        a == null
          ? void 0
          : a.some(g => u.pathname === `/${t.organization_name}/${g.url}`),
      [a, u.pathname, t.organization_name]
    );
  l.useEffect(() => {
    j && _.current !== u.pathname && (n(!0), (_.current = u.pathname));
  }, [j, u.pathname]);
  const w = l.useCallback(() => {
      if (a && a.length > 0) {
        n(g => !g);
        return;
      }
      (i && i(),
        r && (c(`/${t.organization_name}/${r}`, { replace: !1 }), d()));
    }, [i, r, t.organization_name, c, d, a]),
    E = l.useCallback(
      g => {
        (c(`/${t.organization_name}/${g}`, { replace: !1 }), d());
      },
      [t.organization_name, c, d]
    ),
    R = l.useCallback(
      g => u.pathname === `/${t.organization_name}/${g}`,
      [u.pathname, t.organization_name]
    ),
    p = b.color,
    P = b.backgroundColor,
    U = l.useMemo(
      () => ({
        color: s ? P : p,
        background: s
          ? `linear-gradient(135deg, ${p}ee 0%, ${p}cc 100%)`
          : 'transparent',
        borderRadius: 12,
        boxShadow: s
          ? `0 4px 16px ${p}30, inset 0 1px 0 rgba(255,255,255,0.15)`
          : 'none',
        transform: y ? 'scale(0.975)' : 'scale(1)',
        transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)'
      }),
      [s, p, P, y]
    );
  return e.jsxs('div', {
    className: 'w-full select-none',
    children: [
      e.jsxs($, {
        onClick: w,
        onMouseDown: () => h(!0),
        onMouseUp: () => h(!1),
        onMouseLeave: () => h(!1),
        style: U,
        'data-active': s || void 0,
        'aria-label': `Navigate to ${o}`,
        'aria-current': s ? 'page' : void 0,
        'aria-expanded': a != null && a.length ? m : void 0,
        role: 'menuitem',
        tabIndex: 0,
        className: [
          'group relative flex items-center gap-3',
          'w-full px-3.5 py-3',
          'text-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          !s && 'hover:bg-white/[0.06]'
        ]
          .filter(Boolean)
          .join(' '),
        children: [
          !s &&
            e.jsx('span', {
              className:
                'pointer-events-none absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300',
              style: {
                background: `linear-gradient(135deg, ${p}0c 0%, transparent 60%)`
              }
            }),
          e.jsx('span', {
            className:
              'relative flex-shrink-0 flex items-center justify-center w-[34px] h-[34px] rounded-[9px] transition-all duration-200',
            style: {
              background: s ? 'rgba(255,255,255,0.2)' : `${p}14`,
              boxShadow: s
                ? 'inset 0 1px 0 rgba(255,255,255,0.25)'
                : `inset 0 1px 0 ${p}10`
            },
            children: e.jsx(x, { stroke: s ? 2 : 1.6, size: 16 })
          }),
          e.jsx('span', {
            className: 'flex-1 truncate',
            style: {
              fontWeight: s ? 600 : 500,
              opacity: s ? 1 : 0.82,
              letterSpacing: '0.01em'
            },
            children: o
          }),
          a &&
            a.length > 0 &&
            e.jsx('span', {
              style: {
                opacity: m ? 0.7 : 0.38,
                transform: m ? 'rotate(180deg)' : 'rotate(0deg)',
                transition:
                  'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
                display: 'flex',
                flexShrink: 0
              },
              children: e.jsx(q, { stroke: 2.5, size: 13 })
            }),
          s &&
            e.jsx('span', {
              className:
                'absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full',
              style: {
                height: '52%',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 100%)'
              }
            })
        ]
      }),
      a &&
        a.length > 0 &&
        e.jsx('div', {
          'aria-hidden': !m,
          style: {
            display: 'grid',
            gridTemplateRows: m ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
          },
          children: e.jsx('div', {
            style: { overflow: 'hidden' },
            children: e.jsx('div', {
              className: 'pt-2 pb-2 pl-[26px] pr-2',
              children: e.jsxs('div', {
                className: 'relative pl-6',
                children: [
                  e.jsx('span', {
                    className:
                      'absolute left-0 top-3 bottom-3 w-px rounded-full',
                    style: {
                      background: `linear-gradient(180deg, transparent 0%, ${p}30 20%, ${p}30 80%, transparent 100%)`
                    }
                  }),
                  e.jsx('div', {
                    className: 'flex flex-col gap-2',
                    children: a.map((g, I) => {
                      const B = R(g.url);
                      return e.jsx(
                        fe,
                        {
                          child: g,
                          active: B,
                          themeColor: p,
                          idx: I,
                          isExpanded: m,
                          onChildClick: E
                        },
                        g.url
                      );
                    })
                  })
                ]
              })
            })
          })
        })
    ]
  });
}
function fe({
  child: x,
  active: o,
  themeColor: r,
  idx: t,
  isExpanded: s,
  onChildClick: i
}) {
  const [d, a] = l.useState(!1),
    [c, b] = l.useState(!1);
  return e.jsxs($, {
    onClick: () => i(x.url),
    onMouseEnter: () => a(!0),
    onMouseLeave: () => {
      (a(!1), b(!1));
    },
    onMouseDown: () => b(!0),
    onMouseUp: () => b(!1),
    role: 'menuitem',
    tabIndex: 0,
    className:
      'relative flex items-center w-full px-3 py-[10px] text-sm focus-visible:outline-none focus-visible:ring-2',
    style: {
      color: o ? r : `${r}72`,
      background: o ? `${r}14` : d ? `${r}09` : 'transparent',
      borderRadius: 9,
      padding: o ? 3 : 2,
      border: `1px solid ${o ? `${r}22` : 'transparent'}`,
      fontWeight: o ? 600 : 450,
      letterSpacing: '0.01em',
      transform: c ? 'scale(0.975)' : 'scale(1)',
      opacity: s ? 1 : 0,
      transitionDelay: s ? `${t * 45 + 50}ms` : '0ms',
      transition: `
          color 0.15s ease,
          background 0.15s ease,
          border-color 0.15s ease,
          transform 0.12s ease,
          opacity 0.2s ease ${s ? t * 45 + 50 : 0}ms
        `
    },
    children: [
      e.jsx('span', {
        className: 'absolute flex items-center justify-center',
        style: { left: -18 },
        children: e.jsx('span', {
          style: {
            width: o ? 7 : 4,
            height: o ? 7 : 4,
            borderRadius: '50%',
            background: o ? r : `${r}38`,
            boxShadow: o ? `0 0 0 2.5px ${r}20` : 'none',
            transition: 'all 0.2s ease'
          }
        })
      }),
      e.jsx('span', { className: 'flex-1 truncate', children: x.name }),
      o &&
        e.jsx('span', {
          className: 'ml-auto flex-shrink-0 rounded-full',
          style: {
            width: 6,
            height: 6,
            background: r,
            boxShadow: `0 0 8px ${r}90`
          }
        })
    ]
  });
}
function be({ navLinks: x, isDrawerOpen: o, setIsDrawerOpen: r }) {
  const t = H(W),
    { themeConfig: s, organizationConfig: i } = M(),
    d = L(),
    { showSuccessToast: a } = T(),
    c = n => {
      (n.stopPropagation(), r());
    },
    b = () => {
      (K(), a('Successfully logged out'));
    },
    u = d.pathname,
    m = x
      .filter(n => n.role === t.userRole)
      .map(n => {
        const y = `/${i.organization_name}/${n.url}`,
          h = u === y;
        return e.jsx(
          ge,
          {
            icon: n.icon,
            name: n.name,
            url: n.url,
            role: n.role,
            organization: i,
            isActive: h,
            setIsDrawerOpen: r,
            children: n.children
          },
          n.name
        );
      });
  return e.jsxs(e.Fragment, {
    children: [
      o && e.jsx('div', { className: f.backdrop, onClick: c }),
      !o &&
        e.jsx($, {
          onClick: c,
          className: `${f.fab}`,
          style: {
            backgroundColor: s.backgroundColor,
            position: 'fixed',
            left: '24px',
            top: '24px',
            width: 132,
            height: 50,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          },
          children: e.jsx('div', {
            className: f.fabContent,
            children: e.jsx('img', {
              src: i.organization_theme.logo,
              alt: 'Organization Logo',
              className: f.fabLogo,
              style: { width: 130, height: 55, borderRadius: 16 }
            })
          })
        }),
      e.jsxs(Y, {
        className: `${f.navbar} ${o ? f.expanded : f.collapsed} overflow-auto scrollbar-hide`,
        children: [
          e.jsxs('div', {
            className: `${f.navbarHeader}`,
            style: {
              backgroundColor: `${s.color}10`,
              borderBottom: `${s.color}100`
            },
            children: [
              e.jsx(G, { handleLogout: b }),
              e.jsx('img', {
                src: i.organization_theme.logo,
                alt: 'Organization Logo',
                className: f.logoExpanded,
                style: { width: 130, height: 35, borderRadius: 8 }
              }),
              e.jsx('div', {
                onClick: c,
                className: f.fabX,
                children: e.jsx(J, { color: s.color })
              })
            ]
          }),
          e.jsx('div', {
            className: f.navbarMain,
            children: e.jsx(z, { justify: 'center', gap: 20, children: m })
          })
        ]
      })
    ]
  });
}
const Re = l.memo(be),
  he = Q({
    oldPassword: k({ required_error: 'Please enter password' }).min(8, {
      message: 'Password must be 8 characters long'
    }),
    newPassword: k({ required_error: 'Please enter new password' }).min(8, {
      message: 'Password must be 8 characters long'
    }),
    confirmNewPassword: k({
      required_error: 'Please confirm new password'
    }).min(8, { message: 'Password must be 8 characters long' })
  }),
  Ue = ({ opened: x, close: o, forceUpdate: r = !1 }) => {
    var m, n, y;
    const [t, s] = l.useState(!1),
      { showSuccessToast: i } = T(),
      {
        register: d,
        formState: { errors: a },
        handleSubmit: c,
        reset: b
      } = V({ resolver: Z(he) }),
      u = async h => {
        var _, j;
        if (h.newPassword !== h.confirmNewPassword) {
          v.error('New password and confirmation do not match');
          return;
        }
        s(!0);
        try {
          const w = await D(h);
          w.success
            ? (i('Password updated successfully'), b(), o())
            : v.error(w.message || 'Failed to update password');
        } catch (w) {
          v.error(
            ((j =
              (_ = w == null ? void 0 : w.response) == null
                ? void 0
                : _.data) == null
              ? void 0
              : j.message) || 'An error occurred while updating password'
          );
        } finally {
          s(!1);
        }
      };
    return e.jsxs(A, {
      opened: x,
      onClose: o,
      forceAction: r,
      title: e.jsx(O, { order: 3, children: 'Update Your Password' }),
      children: [
        e.jsx(X, {
          size: 'sm',
          color: 'dimmed',
          mb: 'lg',
          children:
            'For security reasons, please update your password regularly.'
        }),
        e.jsx('form', {
          onSubmit: c(u),
          children: e.jsxs(z, {
            gap: 'md',
            children: [
              e.jsx(C, {
                ...d('oldPassword'),
                label: 'Current Password',
                placeholder: 'Enter your current password',
                error: (m = a.oldPassword) == null ? void 0 : m.message,
                withAsterisk: !0
              }),
              e.jsx(C, {
                ...d('newPassword'),
                label: 'New Password',
                placeholder: 'Enter your new password',
                error: (n = a.newPassword) == null ? void 0 : n.message,
                withAsterisk: !0
              }),
              e.jsx(C, {
                ...d('confirmNewPassword'),
                label: 'Confirm New Password',
                placeholder: 'Re-enter your new password',
                error: (y = a.confirmNewPassword) == null ? void 0 : y.message,
                withAsterisk: !0
              }),
              e.jsxs('div', {
                className: 'flex justify-end gap-3 mt-4',
                children: [
                  !r &&
                    e.jsx(S, {
                      variant: 'outline',
                      onClick: o,
                      disabled: t,
                      children: 'Cancel'
                    }),
                  e.jsx(S, {
                    type: 'submit',
                    loading: t,
                    disabled: t,
                    children: 'Update Password'
                  })
                ]
              })
            ]
          })
        })
      ]
    });
  };
export { Ue as C, Te as I, Re as U, Ee as a, ze as b };
