import {
  C as z,
  e as g,
  D as i,
  j as e,
  J as C,
  P as E
} from './index-Cn_-nzwF.js';
import { u as A, t as y, C as x } from './zod-DC47Kjo4.js';
import { g as B, r as R } from './super-admin-services-BvvksAUt.js';
import { r as I } from './register-admin-superadmin-BB7rGhgJ.js';
import { C as w } from './CommonButton-D8AVyhIy.js';
import { I as F } from './IconX-BFEQcM8f.js';
import { T as o } from './TextInput-DUPEWkCs.js';
import { S as b } from './Select-KZOOD-9X.js';
import './api-client-CcbR4Lbf.js';
import './createReactComponent-wv-YgGrS.js';
import './InputBase-CO8vJiWZ.js';
import './Input-kzRYOXAd.js';
import './use-input-props-CLa6mLr2.js';
import './OptionsDropdown-B_GLZDf8.js';
import './CheckIcon-CpIg4BN2.js';
import './Popover-C5NzMGSx.js';
import './get-floating-position-TyKNLeXJ.js';
import './use-uncontrolled-C8lBt68W.js';
const Z = () => {
  var n, d, c, u;
  const h = z(),
    {
      register: t,
      control: l,
      handleSubmit: j,
      reset: f,
      formState: { errors: r, isSubmitting: m }
    } = A({ resolver: y(I) }),
    [N, v] = g.useState([]);
  g.useEffect(() => {
    B()
      .then(s => {
        v(s.organizations);
      })
      .catch(s => {
        i.error(s || s.message || s.response.data.message);
      });
  }, []);
  const S = s => {
    (console.log(s),
      R(s)
        .then(a => {
          (f(), i.success(a.message));
        })
        .catch(a => i.error(a || a.message || a.response.data.message)));
  };
  return e.jsx('div', {
    className: 'flex items-center justify-center h-screen ',
    children: e.jsxs('form', {
      onSubmit: j(S),
      className: 'w-full max-w-2xl p-8 shadow-lg rounded-lg',
      children: [
        e.jsxs('div', {
          className: 'flex justify-between',
          children: [
            e.jsx('div', {}),
            e.jsx('h2', {
              className: 'text-2xl font-bold text-center mb-6',
              children: 'Register admin'
            }),
            e.jsx(C, {
              className: 'rounded-full',
              onClick: () => h('/superadmin/dashboard'),
              children: e.jsx(F, {})
            })
          ]
        }),
        e.jsxs('div', {
          className: 'grid gap-4 grid-cols-1 sm:grid-cols-2',
          children: [
            e.jsx(o, {
              label: 'First Name',
              placeholder: 'Enter first name',
              ...t('firstName'),
              error: (n = r.firstName) == null ? void 0 : n.message
            }),
            e.jsx(o, {
              label: 'Last Name',
              placeholder: 'Enter last name',
              ...t('lastName'),
              error: (d = r.lastName) == null ? void 0 : d.message
            }),
            e.jsx(o, {
              label: 'Email',
              placeholder: 'Enter email',
              ...t('email'),
              error: (c = r.email) == null ? void 0 : c.message
            }),
            e.jsx(o, {
              label: 'Phone Number',
              placeholder: 'Enter phone number',
              type: 'tel',
              ...t('mobileNumber'),
              error: (u = r.mobileNumber) == null ? void 0 : u.message
            }),
            e.jsx(x, {
              name: 'userRole',
              control: l,
              render: ({ field: s }) => {
                var a;
                return e.jsx(b, {
                  label: 'User Role',
                  ...s,
                  error: (a = r.userRole) == null ? void 0 : a.message,
                  placeholder: 'Select user role',
                  value: s.value,
                  data: [{ label: 'Admin', value: 'admin' }]
                });
              }
            }),
            e.jsx(x, {
              name: 'organizationId',
              control: l,
              render: ({ field: s }) => {
                var a;
                return e.jsx(b, {
                  label: 'Organization',
                  ...s,
                  error: (a = r.organizationId) == null ? void 0 : a.message,
                  placeholder: 'Select organization',
                  value: s.value,
                  data: N.map(p => ({ label: p.organizationName, value: p.id }))
                });
              }
            }),
            e.jsx('div', {}),
            e.jsx(w, {
              className: ' mt-7 rounded-md',
              type: 'submit',
              'data-testid': 'submitButton',
              leftSection: m && e.jsx(E, { size: 'xs', minHeight: '20px' }),
              disabled: m,
              children: m ? 'Creating...' : 'Create Admin'
            })
          ]
        })
      ]
    })
  });
};
export { Z as default };
