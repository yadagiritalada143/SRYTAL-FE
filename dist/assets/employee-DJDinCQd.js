import { e as i, D as m, j as e, P as g } from './index-Cn_-nzwF.js';
import { D as v } from './DataView-D_fx5Wkp.js';
import { g as S, a as y } from './super-admin-services-BvvksAUt.js';
import { u as E, t as z, C as I } from './zod-DC47Kjo4.js';
import { g as B } from './register-admin-superadmin-BB7rGhgJ.js';
import { C as p } from './CommonButton-D8AVyhIy.js';
import { S as D } from './Select-KZOOD-9X.js';
import { I as R } from './IconUser-BXnFItyZ.js';
import { I as C } from './IconEdit-BA67kK5H.js';
import './createReactComponent-wv-YgGrS.js';
import './api-client-CcbR4Lbf.js';
import './Input-kzRYOXAd.js';
import './OptionsDropdown-B_GLZDf8.js';
import './CheckIcon-CpIg4BN2.js';
import './Popover-C5NzMGSx.js';
import './get-floating-position-TyKNLeXJ.js';
import './use-uncontrolled-C8lBt68W.js';
import './InputBase-CO8vJiWZ.js';
import './use-input-props-CLa6mLr2.js';
const Y = () => {
  const [t, h] = i.useState([]),
    [n, o] = i.useState(!1),
    [x, j] = i.useState([]),
    {
      control: w,
      handleSubmit: N,
      formState: { errors: u, isSubmitting: d }
    } = E({ resolver: z(B) });
  i.useEffect(() => {
    S()
      .then(s => {
        j(s.organizations);
      })
      .catch(s => {
        m.error(s || s.message || s.response.data.message);
      });
  }, []);
  const b = s => {
    (o(!0),
      y(s.organizationId)
        .then(a => {
          (h(a), o(!1));
        })
        .catch(a => {
          var r, l;
          (m(
            ((l =
              (r = a == null ? void 0 : a.response) == null
                ? void 0
                : r.data) == null
              ? void 0
              : l.message) || 'Something went wrong'
          ),
            o(!1));
        }));
  };
  return e.jsx('div', {
    className: 'h-auto',
    children: e.jsxs('div', {
      children: [
        e.jsx('div', {
          children: e.jsx('form', {
            onSubmit: N(b),
            className: 'w-full  p-8 shadow-lg rounded-lg',
            children: e.jsxs('div', {
              className: 'w-full flex justify-between',
              children: [
                e.jsx(I, {
                  name: 'organizationId',
                  control: w,
                  render: ({ field: s }) => {
                    var a;
                    return e.jsx(D, {
                      label: 'Organization',
                      ...s,
                      error:
                        (a = u.organizationId) == null ? void 0 : a.message,
                      placeholder: 'Select organization',
                      value: s.value,
                      data: x.map(r => ({
                        label: r.organizationName,
                        value: r.id
                      }))
                    });
                  }
                }),
                e.jsx(p, {
                  className: ' mt-7 rounded-md',
                  type: 'submit',
                  'data-testid': 'submitButton',
                  leftSection: d && e.jsx(g, { size: 'xs', minHeight: '20px' }),
                  disabled: d,
                  children: d ? 'Searching...' : 'Search'
                })
              ]
            })
          })
        }),
        e.jsx(v, {
          isLoading: n,
          label: 'employees',
          isEmpty: (t == null ? void 0 : t.length) === 0 && !n,
          children:
            (t == null ? void 0 : t.length) > 0 &&
            e.jsx('div', {
              className: 'overflow-x-auto mt-4',
              children: e.jsxs('table', {
                className: 'min-w-full table-fixed text-center shadow-md',
                children: [
                  e.jsxs('colgroup', {
                    children: [
                      e.jsx('col', { className: 'w-56' }),
                      e.jsx('col', { className: 'w-32' }),
                      e.jsx('col', { className: 'w-32' }),
                      e.jsx('col', { className: 'w-32' }),
                      e.jsx('col', { className: 'w-32' }),
                      e.jsx('col', { className: 'w-32' }),
                      e.jsx('col', { className: 'w-32' }),
                      e.jsx('col', { className: 'w-32' })
                    ]
                  }),
                  e.jsx('thead', {
                    className: 'text-xs uppercase',
                    children: e.jsxs('tr', {
                      children: [
                        e.jsx('th', {
                          className: 'p-2 border',
                          children: 'First Name'
                        }),
                        e.jsx('th', {
                          className: 'p-2 border',
                          children: 'Last Name'
                        }),
                        e.jsx('th', {
                          className: 'p-2 border',
                          children: 'Email'
                        }),
                        e.jsx('th', {
                          className: 'p-2 border',
                          children: 'Mobile Number'
                        }),
                        e.jsx('th', {
                          className: 'p-2 border',
                          children: 'Role'
                        }),
                        e.jsx('th', {
                          className: 'p-2 border',
                          children: 'Employment Type'
                        }),
                        e.jsx('th', {
                          className: 'p-2 border',
                          children: 'Blood Group'
                        }),
                        e.jsx('th', {
                          className: 'p-2 border',
                          children: 'Employee Role'
                        }),
                        e.jsx('th', {
                          className: 'p-2 border',
                          children: 'Update Details'
                        })
                      ]
                    })
                  }),
                  e.jsx('tbody', {
                    className: 'text-sm',
                    children:
                      t == null
                        ? void 0
                        : t.map(s => {
                            var a, r, l;
                            return e.jsxs(
                              'tr',
                              {
                                className:
                                  'hover:bg-slate-200 hover:text-black',
                                children: [
                                  e.jsx('td', {
                                    className:
                                      'px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis',
                                    children: s.firstName
                                  }),
                                  e.jsx('td', {
                                    className:
                                      'px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis',
                                    children: s.lastName
                                  }),
                                  e.jsx('td', {
                                    className:
                                      'px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis',
                                    children: s.email
                                  }),
                                  e.jsx('td', {
                                    className:
                                      'px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis',
                                    children: s.mobileNumber
                                  }),
                                  e.jsx('td', {
                                    className:
                                      'px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis',
                                    children: s.userRole
                                  }),
                                  e.jsx('td', {
                                    className:
                                      'px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis',
                                    children:
                                      (a = s.employmentType) == null
                                        ? void 0
                                        : a.employmentType
                                  }),
                                  e.jsx('td', {
                                    className:
                                      'px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis',
                                    children:
                                      (r = s.bloodGroup) == null
                                        ? void 0
                                        : r.type
                                  }),
                                  e.jsx('td', {
                                    className:
                                      'px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis',
                                    children: e.jsx('ul', {
                                      children:
                                        (l = s.employeeRole) == null
                                          ? void 0
                                          : l.map((c, f) =>
                                              e.jsxs(
                                                'li',
                                                {
                                                  children: [
                                                    f + 1,
                                                    '. ',
                                                    c.designation
                                                  ]
                                                },
                                                c._id
                                              )
                                            )
                                    })
                                  }),
                                  e.jsx('td', {
                                    className:
                                      'px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis',
                                    children: e.jsxs(p, {
                                      children: [
                                        e.jsx(R, {}),
                                        ' ',
                                        '  ',
                                        e.jsx(C, {})
                                      ]
                                    })
                                  })
                                ]
                              },
                              s.id
                            );
                          })
                  })
                ]
              })
            })
        })
      ]
    })
  });
};
export { Y as default };
