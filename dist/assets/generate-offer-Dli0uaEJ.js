import { j as e, S as u, G as s, P as f } from './index-Cn_-nzwF.js';
import { u as j, t as h, C as g } from './zod-DC47Kjo4.js';
import { o as b } from './offerletter-C11Op7FT.js';
import { C } from './CommonButton-D8AVyhIy.js';
import { C as S } from './Container-3LzVKj3b.js';
import { C as L } from './Card-BOCM3d4L.js';
import { T } from './Title-T3OvY56h.js';
import { T as w } from './Textarea-CHnPFotR.js';
import { T as t } from './TextInput-DUPEWkCs.js';
import { S as y } from './Select-KZOOD-9X.js';
import './InputBase-CO8vJiWZ.js';
import './Input-kzRYOXAd.js';
import './use-input-props-CLa6mLr2.js';
import './OptionsDropdown-B_GLZDf8.js';
import './CheckIcon-CpIg4BN2.js';
import './Popover-C5NzMGSx.js';
import './get-floating-position-TyKNLeXJ.js';
import './use-uncontrolled-C8lBt68W.js';
const A = () => {
  var i, n, m, l, p;
  const {
    register: o,
    control: x,
    formState: { errors: r, isSubmitting: a }
  } = j({ resolver: h(b) });
  return e.jsx(S, {
    size: 'lg',
    py: 'xl',
    children: e.jsx(L, {
      shadow: 'sm',
      p: 'lg',
      radius: 'md',
      withBorder: !0,
      children: e.jsxs(u, {
        gap: 'md',
        children: [
          e.jsx(T, {
            order: 2,
            className: 'text-center',
            children: 'Generate Offer Letter'
          }),
          e.jsx('form', {
            children: e.jsxs(u, {
              gap: 'md',
              children: [
                e.jsx(w, {
                  label: 'Subject',
                  maxRows: 4,
                  autosize: !0,
                  placeholder: 'Enter Subject',
                  ...o('subject'),
                  error: (i = r.subject) == null ? void 0 : i.message
                }),
                e.jsxs(s, {
                  grow: !0,
                  children: [
                    e.jsx(t, {
                      label: 'Candidate Name',
                      placeholder: 'Enter candidate name',
                      ...o('nameOfTheCandidate'),
                      error:
                        (n = r.nameOfTheCandidate) == null ? void 0 : n.message
                    }),
                    e.jsx(t, {
                      type: 'date',
                      label: 'Joining Date',
                      placeholder: 'Select joining date',
                      ...o('dateOfJoining'),
                      error: (m = r.dateOfJoining) == null ? void 0 : m.message
                    })
                  ]
                }),
                e.jsxs(s, {
                  grow: !0,
                  children: [
                    e.jsx(t, {
                      type: 'number',
                      label: 'Compensation',
                      placeholder: 'Enter Compensation',
                      ...o('compensation'),
                      error: (l = r.compensation) == null ? void 0 : l.message
                    }),
                    e.jsx(g, {
                      name: 'role',
                      control: x,
                      render: ({ field: d }) => {
                        var c;
                        return e.jsx(y, {
                          label: 'User Role',
                          ...d,
                          error: (c = r.role) == null ? void 0 : c.message,
                          placeholder: 'Select user role',
                          value: d.value,
                          data: [
                            { label: 'employee', value: 'employee' },
                            { label: 'recruiter', value: 'recruiter' }
                          ]
                        });
                      }
                    })
                  ]
                }),
                e.jsx(t, {
                  label: 'Work Location',
                  placeholder: 'Enter Work Location',
                  ...o('workLocation'),
                  error: (p = r.workLocation) == null ? void 0 : p.message
                }),
                e.jsx(s, {
                  justify: 'flex-end',
                  children: e.jsx(C, {
                    type: 'submit',
                    disabled: a,
                    leftSection:
                      a && e.jsx(f, { size: 'xs', minHeight: '20px' }),
                    children: a ? 'Generating...' : 'Generate Offer Letter'
                  })
                })
              ]
            })
          })
        ]
      })
    })
  });
};
export { A as default };
