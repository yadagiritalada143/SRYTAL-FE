import { e as n, v as h, K as u, j as e, O as y } from './index-Cn_-nzwF.js';
import {
  I as s,
  a as f,
  b as t,
  U as b,
  C as v
} from './updatePassword-7Ak6V7-i.js';
import { c as R } from './createReactComponent-wv-YgGrS.js';
import { I as l } from './IconCalendarTime-DVe39A0m.js';
import { I as g } from './IconBook-BHRzfMqD.js';
import { u as x } from './button-D3DmOMH8.js';
import { T as C } from './background-IMiwGkbJ.js';
import { u as w } from './use-disclosure-Dul82tkt.js';
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
 */ const D = [
    [
      'path',
      {
        d: 'M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1',
        key: 'svg-0'
      }
    ],
    [
      'path',
      {
        d: 'M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1',
        key: 'svg-1'
      }
    ],
    [
      'path',
      {
        d: 'M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1',
        key: 'svg-2'
      }
    ],
    [
      'path',
      {
        d: 'M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1',
        key: 'svg-3'
      }
    ]
  ],
  I = R('outline', 'layout-dashboard', 'LayoutDashboard', D),
  k = [
    {
      role: 'Employee',
      url: 'employee/dashboard/profile',
      icon: s,
      name: 'My Profile'
    },
    {
      role: 'ContentWriter',
      url: 'employee/dashboard/profile',
      icon: s,
      name: 'My Profile'
    },
    {
      role: 'Recruiter',
      url: 'employee/dashboard/profile',
      icon: s,
      name: 'My Profile'
    },
    {
      role: 'Recruiter',
      icon: f,
      name: 'Talent Pool',
      children: [
        { name: 'Pool Candidates', url: 'employee/dashboard/pool-candidates' },
        { name: 'Pool Companies', url: 'employee/dashboard/pool-companies' }
      ]
    },
    {
      role: 'Employee',
      url: 'employee/dashboard/dashboard',
      icon: I,
      name: 'Dashboard'
    },
    {
      role: 'Recruiter',
      url: 'employee/dashboard/timesheet',
      icon: l,
      name: 'Timesheet'
    },
    {
      role: 'Employee',
      url: 'employee/dashboard/timesheet',
      icon: l,
      name: 'Timesheet'
    },
    {
      role: 'ContentWriter',
      url: 'employee/dashboard/content-writer',
      icon: g,
      name: 'Content Writer'
    },
    {
      role: 'Recruiter',
      name: 'Reports',
      icon: t,
      children: [
        { name: 'Salary Slip', url: 'employee/dashboard/reports/salary-slip' }
      ]
    },
    {
      role: 'Employee',
      name: 'Reports',
      icon: t,
      children: [
        { name: 'Salary Slip', url: 'employee/dashboard/reports/salary-slip' }
      ]
    },
    {
      role: 'ContentWriter',
      name: 'Reports',
      icon: t,
      children: [
        { name: 'Salary Slip', url: 'employee/dashboard/reports/salary-slip' }
      ]
    }
  ].sort((o, a) => o.name.length - a.name.length),
  Y = () => {
    const [o, a] = n.useState(!1),
      { organizationConfig: m } = h(),
      [p, { open: i, close: d }] = w(!1),
      c = () => a(!o),
      r = u(x);
    return (
      n.useEffect(() => {
        r &&
          r.passwordResetRequired &&
          r.passwordResetRequired === 'true' &&
          i();
      }, [r, i]),
      e.jsxs(C, {
        className: 'flex min-h-screen ',
        children: [
          e.jsx(b, {
            navLinks: k,
            organizationConfig: m,
            isDrawerOpen: o,
            setIsDrawerOpen: c
          }),
          e.jsx('div', {
            className: 'flex-grow transition-all duration-300 overflow-hidden',
            children: e.jsx('div', { children: e.jsx(y, {}) })
          }),
          e.jsx(v, { opened: p, close: d, forceUpdate: !0 })
        ]
      })
    );
  };
export { Y as default };
