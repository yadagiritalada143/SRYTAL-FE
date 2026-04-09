import {
  X as P,
  v as k,
  j as e,
  C as S,
  t as B,
  G as c,
  S as x,
  T as j,
  P as Y,
  D as q
} from './index-Cn_-nzwF.js';
import {
  o as M,
  d as f,
  s as C,
  u as E,
  t as F,
  C as y
} from './zod-DC47Kjo4.js';
import { m as I } from './useAdminMutations-ClNNh0wK.js';
import { u as $ } from './toast-Cmrx_Mrb.js';
import { B as z } from './buttons-DnrPwwlZ.js';
import { C as A } from './CommonButton-D8AVyhIy.js';
import { C as N } from './Card-BOCM3d4L.js';
import { T as R } from './TextInput-DUPEWkCs.js';
import { D } from './DateInput-C-_oP5N_.js';
import { T as G } from './Textarea-CHnPFotR.js';
import './useMutation-bizDVTFN.js';
import './admin-services-CTc0QqQI.js';
import './common-services-DPGUVDMw.js';
import './api-client-CcbR4Lbf.js';
import './useAdminQueries-CeOlvTzF.js';
import './useQuery-4fhBkLAX.js';
import './createReactComponent-wv-YgGrS.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './IconX-BFEQcM8f.js';
import './IconArrowLeft-DGaJMG-t.js';
import './InputBase-CO8vJiWZ.js';
import './Input-kzRYOXAd.js';
import './use-input-props-CLa6mLr2.js';
import './pick-calendar-levels-props-DunTV9xS.js';
import './use-uncontrolled-C8lBt68W.js';
import './AccordionChevron-D1fL7nd1.js';
import './clamp-DTmYCdls.js';
import './Popover-C5NzMGSx.js';
import './get-floating-position-TyKNLeXJ.js';
const _ = ({ children: m, className: l = '', ...d }) => {
    const a = P(),
      { themeConfig: o } = k();
    return e.jsxs('div', {
      className: `custom-style-div ${l}`,
      style: {
        color: o.color,
        backgroundImage: `linear-gradient(to right, ${a.colors.primary[6]}, ${a.colors.primary[5]})`,
        fontFamily: a.fontFamily
      },
      ...d,
      children: [
        e.jsx('style', {
          children: `
          a {
            color: ${o.linkColor};
          }
        `
        }),
        m
      ]
    });
  },
  H = M({
    title: C().min(1, { message: 'Title is required' }),
    description: C().min(1, { message: 'Description is required' }),
    startDate: f({ required_error: 'Start date is required' }),
    endDate: f({ required_error: 'End date is required' })
  }),
  Ce = () => {
    var g, h;
    const m = S(),
      { themeConfig: l } = k(),
      a = B().packageId,
      { mutateAsync: o } = I(),
      {
        register: p,
        handleSubmit: v,
        reset: w,
        control: u,
        formState: { errors: i, isSubmitting: n }
      } = E({ resolver: F(H) }),
      { showSuccessToast: b } = $(),
      T = async r => {
        try {
          (await o(r), b(`${r.title} created successfully!`), w(), m(-1));
        } catch (t) {
          q.error(t.message);
        }
      };
    return e.jsx('div', {
      className: 'w-full max-w-3xl mx-auto my-10',
      children: e.jsx(_, {
        children: e.jsx(N, {
          shadow: 'md',
          radius: 'md',
          p: 'xl',
          withBorder: !0,
          style: { backgroundColor: l.backgroundColor },
          children: e.jsxs('form', {
            onSubmit: v(T),
            children: [
              e.jsxs(c, {
                justify: 'space-between',
                mb: 'lg',
                py: 4,
                children: [
                  e.jsxs(x, {
                    gap: 4,
                    children: [
                      e.jsx(j, {
                        size: 'xl',
                        fw: 700,
                        children: 'Add New Package'
                      }),
                      e.jsx(j, {
                        size: 'sm',
                        c: 'dimmed',
                        children: 'Create a new package for your organization'
                      })
                    ]
                  }),
                  e.jsx(z, { id: a })
                ]
              }),
              e.jsxs(x, {
                gap: 'md',
                children: [
                  e.jsx(R, {
                    label: 'Package Title',
                    placeholder: 'Enter package title',
                    ...p('title'),
                    error: (g = i.title) == null ? void 0 : g.message
                  }),
                  e.jsxs(c, {
                    grow: !0,
                    children: [
                      e.jsx(y, {
                        control: u,
                        name: 'startDate',
                        render: ({ field: r }) => {
                          var t;
                          return e.jsx(D, {
                            label: 'Start Date',
                            placeholder: 'Pick a date',
                            value: r.value ? new Date(r.value) : null,
                            onChange: s => r.onChange(s ? new Date(s) : null),
                            error:
                              (t = i.startDate) == null ? void 0 : t.message,
                            valueFormat: 'YYYY-MM-DD',
                            popoverProps: { withinPortal: !0 }
                          });
                        }
                      }),
                      e.jsx(y, {
                        control: u,
                        name: 'endDate',
                        render: ({ field: r }) => {
                          var t;
                          return e.jsx(D, {
                            label: 'End Date',
                            placeholder: 'Pick a date',
                            value: r.value ? new Date(r.value) : null,
                            onChange: s => r.onChange(s ? new Date(s) : null),
                            error: (t = i.endDate) == null ? void 0 : t.message,
                            valueFormat: 'YYYY-MM-DD',
                            popoverProps: { withinPortal: !0 }
                          });
                        }
                      })
                    ]
                  }),
                  e.jsx(G, {
                    label: 'Description',
                    placeholder: 'Enter package description',
                    ...p('description'),
                    minRows: 4,
                    error: (h = i.description) == null ? void 0 : h.message
                  }),
                  e.jsx(c, {
                    justify: 'flex-end',
                    mt: 'md',
                    children: e.jsx(A, {
                      type: 'submit',
                      'data-testid': 'submitButton',
                      loading: n,
                      leftSection:
                        n && e.jsx(Y, { size: 'xs', minHeight: '20px' }),
                      disabled: n,
                      children: n ? 'Creating...' : 'Create Package'
                    })
                  })
                ]
              })
            ]
          })
        })
      })
    });
  };
export { Ce as default };
