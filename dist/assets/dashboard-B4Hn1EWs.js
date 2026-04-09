import { e as s, v as l, K as p, j as a, O as u } from './index-Cn_-nzwF.js';
import {
  I as h,
  a as f,
  b as g,
  U as b,
  C as v
} from './updatePassword-7Ak6V7-i.js';
import { I as x } from './IconUsers-gx_wuuXq.js';
import { I as k } from './IconPackage-DBvNit8w.js';
import { c as i } from './createReactComponent-wv-YgGrS.js';
import { u as I } from './button-D3DmOMH8.js';
import { T as y } from './background-IMiwGkbJ.js';
import { u as N } from './use-disclosure-Dul82tkt.js';
import './IconChevronDown-DCbfWWlv.js';
import './api-client-CcbR4Lbf.js';
import './toast-Cmrx_Mrb.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './IconX-BFEQcM8f.js';
import './buttons-A92fQUY5.js';
import './zod-DC47Kjo4.js';
import './base-model-DqPjs_FM.js';
import './CommonButton-D8AVyhIy.js';
import './PasswordInput-CGTZTn1Z.js';
import './Input-kzRYOXAd.js';
import './ActionIcon-BBM-Tm4F.js';
import './InputBase-CO8vJiWZ.js';
import './use-input-props-CLa6mLr2.js';
import './use-uncontrolled-C8lBt68W.js';
import './Title-T3OvY56h.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const P = [
    [
      'path',
      {
        d: 'M10 6h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3',
        key: 'svg-0'
      }
    ],
    ['path', { d: 'M14 7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0', key: 'svg-1' }]
  ],
  w = i('outline', 'notification', 'Notification', P);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const j = [
    [
      'path',
      {
        d: 'M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065',
        key: 'svg-0'
      }
    ],
    ['path', { d: 'M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0', key: 'svg-1' }]
  ],
  R = i('outline', 'settings', 'Settings', j),
  D = [
    { role: 'admin', url: 'admin/dashboard', icon: x, name: 'Employees' },
    { role: 'admin', url: 'admin/dashboard/profile', icon: h, name: 'Profile' },
    {
      role: 'admin',
      url: 'admin/dashboard/packages',
      icon: k,
      name: 'Packages'
    },
    {
      role: 'admin',
      url: 'admin/dashboard/notification',
      icon: w,
      name: 'Notification'
    },
    {
      role: 'admin',
      icon: f,
      name: 'Talent Pool',
      children: [
        { name: 'Pool Candidates', url: 'admin/dashboard/pool-candidates' },
        { name: 'Pool Companies', url: 'admin/dashboard/pool-companies' }
      ]
    },
    {
      role: 'admin',
      url: 'admin/dashboard/reports',
      icon: g,
      name: 'Payroll Management',
      children: [
        {
          name: 'Generate Salary Slip',
          url: 'admin/dashboard/reports/generate-salary-slip'
        },
        {
          name: 'Payroll Reports',
          url: 'admin/dashboard/reports/all-employee-reports'
        }
      ]
    },
    {
      role: 'admin',
      url: 'admin/dashboard/settings',
      icon: R,
      name: 'Settings'
    }
  ],
  Z = () => {
    const [e, n] = s.useState(!1),
      { organizationConfig: t } = l(),
      [m, { open: r, close: d }] = N(!1),
      c = () => n(!e),
      o = p(I);
    return (
      s.useEffect(() => {
        o &&
          o.passwordResetRequired &&
          o.passwordResetRequired === 'true' &&
          r();
      }, [o, r]),
      a.jsxs(y, {
        className: 'flex min-h-screen ',
        children: [
          a.jsx(b, {
            navLinks: D,
            organizationConfig: t,
            isDrawerOpen: e,
            setIsDrawerOpen: c
          }),
          a.jsx('div', {
            className: 'flex-grow transition-all duration-300 overflow-hidden',
            children: a.jsx('div', { children: a.jsx(u, {}) })
          }),
          a.jsx(v, { opened: m, close: d, forceUpdate: !0 })
        ]
      })
    );
  };
export { Z as default };
