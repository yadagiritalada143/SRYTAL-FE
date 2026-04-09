import {
  j as e,
  S as p,
  T as t,
  G as d,
  e as h,
  s as E,
  D as z,
  v as le,
  V as je,
  W as se,
  Q as ge,
  C as fe,
  t as ye,
  K as we
} from './index-Cn_-nzwF.js';
import { I as ne, D as Te } from './DataView-D_fx5Wkp.js';
import {
  o as ke,
  a as Ce,
  s as Q,
  d as te,
  u as be,
  t as ze,
  C as V
} from './zod-DC47Kjo4.js';
import { u as De } from './button-D3DmOMH8.js';
import { n as ve, o as Se } from './useAdminMutations-ClNNh0wK.js';
import {
  h as Ae,
  u as Be,
  i as Ie,
  j as Me,
  e as Pe
} from './admin-services-CTc0QqQI.js';
import { u as J } from './toast-Cmrx_Mrb.js';
import { C as D } from './CommonButton-D8AVyhIy.js';
import { S as oe } from './base-model-DqPjs_FM.js';
import { C as W } from './Checkbox-Bu1dHe0r.js';
import { I as _ } from './IconTrash-BQZ6jsv8.js';
import { C as Y } from './Card-BOCM3d4L.js';
import { I as H } from './IconChecklist-DFnwLymQ.js';
import { T as de } from './Textarea-CHnPFotR.js';
import { I as Ne } from './IconPlus-zkiZIHJ7.js';
import { h as ce } from './common-services-DPGUVDMw.js';
import { u as K } from './use-disclosure-Dul82tkt.js';
import { T as j } from './Table-Bwpju6TN.js';
import { T as re } from './Tooltip-BnLcCD-S.js';
import { A as O } from './ActionIcon-BBM-Tm4F.js';
import { I as Z } from './IconEdit-BA67kK5H.js';
import { T as me } from './TextInput-DUPEWkCs.js';
import { I as he } from './IconDeviceFloppy-TiVnADbg.js';
import { B as Ee } from './Badge-pr8cFvg5.js';
import { D as Ye } from './Divider-C8nnAxUa.js';
import { I as _e } from './IconUser-BXnFItyZ.js';
import { I as qe } from './IconCalendar-Cp3De190.js';
import { B as Fe } from './buttons-DnrPwwlZ.js';
import { C as Ue } from './Container-3LzVKj3b.js';
import { F as Le } from './Flex-BbX87tE5.js';
import { I as Re } from './IconPackage-DBvNit8w.js';
import { M as We } from './MultiSelect-flSxlWG6.js';
import { D as ae } from './DateInput-C-_oP5N_.js';
import './createReactComponent-wv-YgGrS.js';
import './api-client-CcbR4Lbf.js';
import './useMutation-bizDVTFN.js';
import './useAdminQueries-CeOlvTzF.js';
import './useQuery-4fhBkLAX.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './IconX-BFEQcM8f.js';
import './get-auto-contrast-value-Da6zqqWm.js';
import './Input-kzRYOXAd.js';
import './use-uncontrolled-C8lBt68W.js';
import './CheckIcon-CpIg4BN2.js';
import './InputBase-CO8vJiWZ.js';
import './use-input-props-CLa6mLr2.js';
import './get-floating-position-TyKNLeXJ.js';
import './get-style-object-DUJZA7T_.js';
import './IconArrowLeft-DGaJMG-t.js';
import './OptionsDropdown-B_GLZDf8.js';
import './Popover-C5NzMGSx.js';
import './pick-calendar-levels-props-DunTV9xS.js';
import './AccordionChevron-D1fL7nd1.js';
import './clamp-DTmYCdls.js';
const ie = /^[a-zA-Z0-9\s-]+$/,
  Oe = ke({
    title: Q()
      .min(1, { message: 'Title is required' })
      .regex(ie, {
        message: 'Only letters, numbers, spaces, and hyphens are allowed'
      }),
    description: Q()
      .min(1, { message: 'Description is required' })
      .regex(ie, {
        message: 'Only letters, numbers, spaces, and hyphens are allowed'
      }),
    startDate: te({ required_error: 'Start date is required' }),
    endDate: te({ required_error: 'End date is required' }),
    approvers: Ce(Q().optional())
  }),
  $e = ({
    opened: i,
    close: g,
    confirmDelete: f,
    setConfirmDelete: T,
    agreeTerms: o,
    setAgreeTerms: u,
    handleDeletePackage: x
  }) =>
    e.jsx(oe, {
      title: e.jsxs(d, {
        gap: 'xs',
        children: [
          e.jsx(ne, { size: 24, color: 'red' }),
          e.jsx(t, {
            fw: 600,
            size: 'lg',
            c: 'red',
            children: 'Delete Package'
          })
        ]
      }),
      size: 'md',
      opened: i,
      onClose: g,
      children: e.jsxs(p, {
        gap: 'md',
        children: [
          e.jsx(t, {
            size: 'md',
            fw: 600,
            children: 'Are you sure you want to delete this package?'
          }),
          e.jsx(t, {
            size: 'sm',
            c: 'dimmed',
            children:
              'This action is irreversible. Deleting this package will permanently remove all its details and associated tasks from the system.'
          }),
          e.jsxs(p, {
            gap: 'xs',
            mt: 'sm',
            children: [
              e.jsx(W, {
                label: 'I understand the consequences of this action',
                checked: f,
                onChange: r => T(r.currentTarget.checked),
                required: !0
              }),
              e.jsx(W, {
                label:
                  "I agree that this package's details will be permanently deleted",
                checked: o,
                onChange: r => u(r.currentTarget.checked)
              })
            ]
          }),
          e.jsxs(d, {
            justify: 'flex-end',
            mt: 'lg',
            children: [
              e.jsx(D, { variant: 'default', onClick: g, children: 'Cancel' }),
              e.jsx(D, {
                color: 'red',
                onClick: () => x(o),
                disabled: !f,
                leftSection: e.jsx(_, { size: 16 }),
                children: 'Delete Package'
              })
            ]
          })
        ]
      })
    }),
  Ge = ({ packageId: i, required: g = !1, fetchPackageDetails: f }) => {
    const { showSuccessToast: T } = J(),
      [o, u] = h.useState(''),
      [x, r] = h.useState(''),
      [w, B] = h.useState(!1),
      I = E('(max-width: 768px)'),
      P = E('(max-width: 500px)'),
      M = async () => {
        var v, A;
        if (g && !o.trim()) {
          r('Task description is required');
          return;
        }
        (r(''), B(!0));
        try {
          (await Ae(i, o.trim()), T('Task added successfully!'), u(''), f());
        } catch (m) {
          z.error(
            ((A =
              (v = m == null ? void 0 : m.response) == null
                ? void 0
                : v.data) == null
              ? void 0
              : A.message) || 'Failed to add task'
          );
        } finally {
          B(!1);
        }
      };
    return e.jsx(Y, {
      shadow: 'sm',
      p: I ? 'md' : 'lg',
      radius: 'md',
      withBorder: !0,
      children: e.jsxs(p, {
        gap: 'md',
        children: [
          e.jsxs(d, {
            gap: 'xs',
            children: [
              e.jsx(H, { size: 20 }),
              e.jsx(t, { size: 'lg', fw: 600, children: 'Add New Task' })
            ]
          }),
          e.jsx(de, {
            label: 'Task Description',
            placeholder: 'Enter task details...',
            value: o,
            onChange: v => {
              (u(v.target.value), x && r(''));
            },
            error: x,
            minRows: 4,
            size: 'md',
            required: g
          }),
          e.jsx(d, {
            justify: 'flex-end',
            children: e.jsx(D, {
              onClick: M,
              disabled: w || (g && !o.trim()),
              leftSection: e.jsx(Ne, { size: 16 }),
              fullWidth: P,
              children: w ? 'Adding...' : 'Add Task'
            })
          })
        ]
      })
    });
  },
  Qe = ({
    opened: i,
    close: g,
    confirmDelete: f,
    setConfirmDelete: T,
    agreeTerms: o,
    setAgreeTerms: u,
    handleDeleteTask: x,
    selectedTask: r
  }) =>
    e.jsx(oe, {
      title: e.jsxs(d, {
        gap: 'xs',
        children: [
          e.jsx(ne, { size: 24, color: 'red' }),
          e.jsx(t, { fw: 600, size: 'lg', c: 'red', children: 'Delete Task' })
        ]
      }),
      size: 'md',
      opened: i,
      onClose: g,
      children: e.jsxs(p, {
        gap: 'md',
        children: [
          e.jsx(t, {
            size: 'md',
            fw: 600,
            children: 'Are you sure you want to delete this task?'
          }),
          e.jsx(t, {
            size: 'sm',
            c: 'dimmed',
            children:
              'This action is irreversible. Deleting this task will permanently remove all its details from the system.'
          }),
          e.jsxs(p, {
            gap: 'xs',
            mt: 'sm',
            children: [
              e.jsx(W, {
                label: 'I understand the consequences of this action',
                checked: f,
                onChange: w => T(w.currentTarget.checked),
                required: !0
              }),
              e.jsx(W, {
                label:
                  "I agree that this task's details will be permanently deleted",
                checked: o,
                onChange: w => u(w.currentTarget.checked)
              })
            ]
          }),
          e.jsxs(d, {
            justify: 'flex-end',
            mt: 'lg',
            children: [
              e.jsx(D, { variant: 'default', onClick: g, children: 'Cancel' }),
              e.jsx(D, {
                color: 'red',
                onClick: () => x(r, o),
                disabled: !f,
                leftSection: e.jsx(_, { size: 16 }),
                children: 'Delete Task'
              })
            ]
          })
        ]
      })
    }),
  Ve = ({ task: i, index: g, onEdit: f, onDelete: T, themeConfig: o }) => {
    var u, x;
    return e.jsx(Y, {
      shadow: 'sm',
      p: 'md',
      mb: 'sm',
      withBorder: !0,
      children: e.jsxs(p, {
        gap: 'sm',
        children: [
          e.jsxs(d, {
            justify: 'space-between',
            align: 'flex-start',
            children: [
              e.jsxs(Ee, {
                variant: 'filled',
                color: o.accentColor,
                children: ['#', g + 1]
              }),
              e.jsxs(d, {
                gap: 'xs',
                children: [
                  e.jsx(O, {
                    variant: 'subtle',
                    color: o.button.color,
                    onClick: () => f(i),
                    size: 'md',
                    children: e.jsx(Z, { size: 18 })
                  }),
                  e.jsx(O, {
                    variant: 'subtle',
                    color: o.dangerColor,
                    onClick: () => T(i._id),
                    size: 'md',
                    children: e.jsx(_, { size: 18 })
                  })
                ]
              })
            ]
          }),
          e.jsx(Ye, {}),
          e.jsxs(p, {
            gap: 'xs',
            children: [
              e.jsxs(p, {
                gap: 2,
                children: [
                  e.jsx(t, {
                    size: 'xs',
                    fw: 600,
                    c: 'dimmed',
                    children: 'Task'
                  }),
                  e.jsx(t, { size: 'sm', fw: 500, children: i.title })
                ]
              }),
              e.jsxs(p, {
                gap: 2,
                children: [
                  e.jsx(t, {
                    size: 'xs',
                    fw: 600,
                    c: 'dimmed',
                    children: e.jsxs(d, {
                      gap: 4,
                      children: [e.jsx(_e, { size: 12 }), 'Created By']
                    })
                  }),
                  e.jsxs(t, {
                    size: 'sm',
                    children: [
                      ((u = i == null ? void 0 : i.createdBy) == null
                        ? void 0
                        : u.firstName) || '',
                      ' ',
                      ((x = i == null ? void 0 : i.createdBy) == null
                        ? void 0
                        : x.lastName) || ''
                    ]
                  })
                ]
              }),
              e.jsxs(p, {
                gap: 2,
                children: [
                  e.jsx(t, {
                    size: 'xs',
                    fw: 600,
                    c: 'dimmed',
                    children: e.jsxs(d, {
                      gap: 4,
                      children: [e.jsx(qe, { size: 12 }), 'Created At']
                    })
                  }),
                  e.jsx(t, {
                    size: 'xs',
                    children: ce(i.createdAt).format('MMM DD, YYYY - h:mm A')
                  })
                ]
              })
            ]
          })
        ]
      })
    });
  },
  He = ({ tasks: i = [], organizationConfig: g, fetchPackageDetails: f }) => {
    const [T, { open: o, close: u }] = K(!1),
      { themeConfig: x } = le(),
      [r, w] = h.useState([...i]),
      [B, I] = h.useState(!1),
      [P, M] = h.useState(!1),
      [v, A] = h.useState(''),
      [m, q] = h.useState(null),
      [$, { open: N, close: S }] = K(!1),
      { showSuccessToast: F } = J(),
      U = E('(max-width: 768px)');
    h.useEffect(() => {
      w(i);
    }, [i]);
    const k = s => {
        (q(s), N());
      },
      L = s => {
        (A(s), o());
      },
      R = async (s, y) => {
        try {
          (await Ie(s, y),
            w(C => C.filter(b => b._id !== s)),
            I(!1),
            M(!1),
            u(),
            F('Task deleted successfully'),
            f());
        } catch (C) {
          (console.error('Error deleting task:', C),
            z.error('Failed to delete task'));
        }
      },
      G = async () => {
        if (m != null && m._id)
          try {
            (await Be(m._id, m.title),
              F('Task updated successfully'),
              w(s =>
                s.map(y => (y._id === m._id ? { ...y, title: m.title } : y))
              ),
              f(),
              S());
          } catch (s) {
            (console.error(s), z.error('Failed to update task'));
          }
      };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(Y, {
          shadow: 'sm',
          p: 0,
          radius: 'md',
          withBorder: !0,
          children: e.jsxs(p, {
            gap: 0,
            children: [
              e.jsx(d, {
                p: U ? 'md' : 'lg',
                justify: 'space-between',
                style: {
                  borderBottom: '1px solid var(--mantine-color-gray-3)'
                },
                children: e.jsxs(d, {
                  gap: 'xs',
                  children: [
                    e.jsx(H, { size: 20 }),
                    e.jsxs(t, {
                      size: 'lg',
                      fw: 600,
                      children: ['Package Tasks (', r.length, ')']
                    })
                  ]
                })
              }),
              r.length === 0
                ? e.jsx(je, {
                    p: 'xl',
                    children: e.jsxs(p, {
                      align: 'center',
                      gap: 'md',
                      children: [
                        e.jsx(H, { size: 48, opacity: 0.5 }),
                        e.jsx(t, {
                          size: 'lg',
                          children: 'No tasks available'
                        }),
                        e.jsx(t, {
                          size: 'sm',
                          c: 'dimmed',
                          children: 'Add your first task to get started'
                        })
                      ]
                    })
                  })
                : U
                  ? e.jsx(se, {
                      p: 'md',
                      children: e.jsx(p, {
                        gap: 'sm',
                        children: r.map((s, y) =>
                          e.jsx(
                            Ve,
                            {
                              task: s,
                              index: y,
                              onEdit: k,
                              onDelete: L,
                              themeConfig: x
                            },
                            s._id
                          )
                        )
                      })
                    })
                  : e.jsx(se, {
                      children: e.jsxs(j, {
                        stickyHeader: !0,
                        withTableBorder: !0,
                        withColumnBorders: !0,
                        children: [
                          e.jsx(j.Thead, {
                            style: {
                              backgroundColor: x.backgroundColor,
                              color: x.color
                            },
                            children: e.jsxs(j.Tr, {
                              children: [
                                e.jsx(j.Th, {
                                  className: 'p-3 border text-center',
                                  ta: 'center',
                                  style: { width: '80px' },
                                  children: e.jsx(t, {
                                    size: 'sm',
                                    fw: 500,
                                    children: 'S.No'
                                  })
                                }),
                                e.jsx(j.Th, {
                                  className: 'p-3 border',
                                  children: e.jsx(t, {
                                    size: 'sm',
                                    fw: 500,
                                    children: 'Task'
                                  })
                                }),
                                e.jsx(j.Th, {
                                  className: 'p-3 border',
                                  ta: 'center',
                                  style: { width: '200px' },
                                  children: e.jsx(t, {
                                    size: 'sm',
                                    fw: 500,
                                    children: 'Created By'
                                  })
                                }),
                                e.jsx(j.Th, {
                                  className: 'p-3 border',
                                  ta: 'center',
                                  style: { width: '220px' },
                                  children: e.jsx(t, {
                                    size: 'sm',
                                    fw: 500,
                                    children: 'Created At'
                                  })
                                }),
                                e.jsx(j.Th, {
                                  className: 'p-3 border text-center',
                                  ta: 'center',
                                  style: { width: '120px' },
                                  children: e.jsx(t, {
                                    size: 'sm',
                                    fw: 500,
                                    children: 'Actions'
                                  })
                                })
                              ]
                            })
                          }),
                          e.jsx(j.Tbody, {
                            children: r.map((s, y) => {
                              var C, b;
                              return e.jsxs(
                                j.Tr,
                                {
                                  className: 'transition-colors',
                                  children: [
                                    e.jsx(j.Td, {
                                      className: 'text-center p-3',
                                      children: e.jsx(t, {
                                        size: 'sm',
                                        children: y + 1
                                      })
                                    }),
                                    e.jsx(j.Td, {
                                      className: 'p-3',
                                      children: e.jsx(t, {
                                        size: 'sm',
                                        fw: 500,
                                        children: s.title
                                      })
                                    }),
                                    e.jsx(j.Td, {
                                      className: 'p-3 text-center',
                                      children: e.jsxs(t, {
                                        size: 'sm',
                                        children: [
                                          ((C =
                                            s == null ? void 0 : s.createdBy) ==
                                          null
                                            ? void 0
                                            : C.firstName) || '',
                                          ' ',
                                          ((b =
                                            s == null ? void 0 : s.createdBy) ==
                                          null
                                            ? void 0
                                            : b.lastName) || ''
                                        ]
                                      })
                                    }),
                                    e.jsx(j.Td, {
                                      className: 'p-3 text-center',
                                      children: e.jsx(t, {
                                        size: 'xs',
                                        children: ce(s.createdAt).format(
                                          'MMM DD, YYYY - h:mm A'
                                        )
                                      })
                                    }),
                                    e.jsx(j.Td, {
                                      className: 'p-3 text-center',
                                      children: e.jsxs(d, {
                                        gap: 'xs',
                                        justify: 'center',
                                        children: [
                                          e.jsx(re, {
                                            label: 'Edit Task',
                                            children: e.jsx(O, {
                                              variant: 'subtle',
                                              color: x.button.color,
                                              onClick: () => k(s),
                                              size: 'sm',
                                              children: e.jsx(Z, { size: 16 })
                                            })
                                          }),
                                          e.jsx(re, {
                                            label: 'Delete Task',
                                            children: e.jsx(O, {
                                              variant: 'subtle',
                                              color: x.dangerColor,
                                              onClick: () => L(s._id),
                                              size: 'sm',
                                              children: e.jsx(_, { size: 16 })
                                            })
                                          })
                                        ]
                                      })
                                    })
                                  ]
                                },
                                s._id
                              );
                            })
                          })
                        ]
                      })
                    })
            ]
          })
        }),
        e.jsx(ge, {
          opened: $,
          onClose: S,
          title: e.jsxs(d, {
            gap: 'xs',
            children: [
              e.jsx(Z, { size: 20 }),
              e.jsx(t, { fw: 600, size: 'lg', children: 'Edit Task' })
            ]
          }),
          centered: !0,
          size: 'md',
          children: e.jsxs(p, {
            gap: 'md',
            children: [
              e.jsx(me, {
                label: 'Task Title',
                value: (m == null ? void 0 : m.title) || '',
                onChange: s => q({ ...m, title: s.target.value }),
                required: !0,
                size: 'md',
                placeholder: 'Enter task title'
              }),
              e.jsxs(d, {
                justify: 'flex-end',
                mt: 'md',
                children: [
                  e.jsx(D, {
                    variant: 'default',
                    onClick: S,
                    children: 'Cancel'
                  }),
                  e.jsx(D, {
                    onClick: G,
                    leftSection: e.jsx(he, { size: 16 }),
                    children: 'Save Changes'
                  })
                ]
              })
            ]
          })
        }),
        e.jsx(Qe, {
          agreeTerms: P,
          close: u,
          opened: T,
          confirmDelete: B,
          handleDeleteTask: R,
          setAgreeTerms: M,
          setConfirmDelete: I,
          selectedTask: v
        })
      ]
    });
  },
  Ks = () => {
    var X, ee;
    const [i, { open: g, close: f }] = K(!1),
      { themeConfig: T, organizationConfig: o } = le(),
      u = fe(),
      r = ye().packageId,
      [w, B] = h.useState(!1),
      [I, P] = h.useState(!1),
      [M, v] = h.useState([]),
      { showSuccessToast: A } = J(),
      m = we(De),
      [q, $] = h.useState([]),
      [N, S] = h.useState(!1),
      { mutateAsync: F } = ve(),
      { mutateAsync: U } = Se(),
      k = E('(max-width: 768px)'),
      L = E('(max-width: 500px)'),
      {
        register: R,
        handleSubmit: G,
        formState: { errors: s },
        control: y,
        reset: C
      } = be({ resolver: ze(Oe) }),
      b = h.useCallback(async () => {
        var n, l, c;
        if (r) {
          S(!0);
          try {
            const a = await Me(r);
            if (!a) {
              z.error('Package not found.');
              return;
            }
            ($(a.tasks),
              C({
                ...a,
                approvers:
                  (n = a.approvers) == null ? void 0 : n.map(ue => ue._id),
                startDate: a.startDate ? new Date(a.startDate) : null,
                endDate: a.endDate ? new Date(a.endDate) : null
              }));
          } catch (a) {
            z.error(
              ((c =
                (l = a == null ? void 0 : a.response) == null
                  ? void 0
                  : l.data) == null
                ? void 0
                : c.message) || 'Failed to fetch package details.'
            );
          } finally {
            S(!1);
          }
        }
      }, [r, C]);
    (h.useEffect(() => {
      b();
    }, [b]),
      h.useEffect(() => {
        (async () => {
          try {
            const c = (await Pe()).map(a => ({
              value: a.id,
              label: `${a.firstName} ${a.lastName}`
            }));
            v(c);
          } catch (l) {
            (console.log(l), z.error('Failed to fetch approvers.'));
          }
        })();
      }, []));
    const pe = n => {
        if (!r) {
          z.error('Invalid package ID.');
          return;
        }
        U({ id: r, hardDelete: n })
          .then(() => {
            (A('Package deleted successfully!'), u(-1));
          })
          .catch(l => {
            var c, a;
            z.error(
              ((a =
                (c = l == null ? void 0 : l.response) == null
                  ? void 0
                  : c.data) == null
                ? void 0
                : a.message) || 'Something went wrong'
            );
          });
      },
      xe = async n => {
        var l, c;
        if (r)
          try {
            (S(!0),
              await F({ id: r, data: n }),
              A('Package updated successfully!'),
              u(-1));
          } catch (a) {
            z.error(
              ((c =
                (l = a == null ? void 0 : a.response) == null
                  ? void 0
                  : l.data) == null
                ? void 0
                : c.message) || 'Something went wrong'
            );
          } finally {
            S(!1);
          }
      };
    return e.jsxs(Ue, {
      size: 'lg',
      py: 'md',
      my: 'xl',
      px: L ? 'xs' : 'md',
      children: [
        e.jsxs(p, {
          gap: 'md',
          children: [
            e.jsx(Y, {
              shadow: 'sm',
              p: k ? 'md' : 'lg',
              radius: 'md',
              withBorder: !0,
              children: e.jsxs(Le, {
                direction: 'row',
                justify: 'space-between',
                align: 'center',
                gap: 'md',
                children: [
                  e.jsx(d, {
                    justify: 'space-between',
                    align: 'center',
                    children: e.jsxs(d, {
                      gap: 'xs',
                      children: [
                        e.jsx(Re, { size: 24 }),
                        e.jsx(t, {
                          size: k ? 'lg' : 'xl',
                          fw: 700,
                          children: 'Update Package'
                        })
                      ]
                    })
                  }),
                  e.jsx(Fe, { id: r })
                ]
              })
            }),
            e.jsx(Te, {
              isLoading: N,
              label: 'package details',
              children: e.jsxs(p, {
                gap: 'md',
                children: [
                  e.jsx(Y, {
                    shadow: 'sm',
                    p: k ? 'md' : 'lg',
                    radius: 'md',
                    withBorder: !0,
                    children: e.jsx('form', {
                      onSubmit: G(xe),
                      children: e.jsxs(p, {
                        gap: 'md',
                        children: [
                          e.jsx(me, {
                            label: 'Title',
                            placeholder: 'Enter package title',
                            ...R('title'),
                            error: (X = s.title) == null ? void 0 : X.message,
                            size: 'md',
                            required: !0
                          }),
                          e.jsx(de, {
                            label: 'Description',
                            placeholder: 'Enter package description',
                            ...R('description'),
                            error:
                              (ee = s.description) == null
                                ? void 0
                                : ee.message,
                            minRows: 4,
                            size: 'md',
                            required: !0
                          }),
                          e.jsx(V, {
                            name: 'approvers',
                            control: y,
                            render: ({ field: n }) => {
                              var l;
                              return e.jsx(We, {
                                data: M,
                                label: 'Approvers',
                                placeholder: 'Select approvers',
                                value: Array.isArray(n.value)
                                  ? n.value.map(c => String(c).trim())
                                  : [],
                                onChange: n.onChange,
                                onBlur: n.onBlur,
                                error:
                                  (l = s.approvers) == null
                                    ? void 0
                                    : l.message,
                                size: 'md',
                                searchable: !0,
                                clearable: !0
                              });
                            }
                          }),
                          e.jsxs(d, {
                            grow: k,
                            children: [
                              e.jsx(V, {
                                control: y,
                                name: 'startDate',
                                render: ({ field: n }) => {
                                  var l;
                                  return e.jsx(ae, {
                                    label: 'Start Date',
                                    placeholder: 'Pick a date',
                                    value: n.value ? new Date(n.value) : null,
                                    onChange: c =>
                                      n.onChange(c ? new Date(c) : null),
                                    error:
                                      (l = s.startDate) == null
                                        ? void 0
                                        : l.message,
                                    valueFormat: 'YYYY-MM-DD',
                                    size: 'md',
                                    clearable: !0
                                  });
                                }
                              }),
                              e.jsx(V, {
                                control: y,
                                name: 'endDate',
                                render: ({ field: n }) => {
                                  var l;
                                  return e.jsx(ae, {
                                    label: 'End Date',
                                    placeholder: 'Pick a date',
                                    value: n.value ? new Date(n.value) : null,
                                    onChange: c =>
                                      n.onChange(c ? new Date(c) : null),
                                    error:
                                      (l = s.endDate) == null
                                        ? void 0
                                        : l.message,
                                    valueFormat: 'YYYY-MM-DD',
                                    size: 'md',
                                    clearable: !0
                                  });
                                }
                              })
                            ]
                          }),
                          e.jsxs(d, {
                            justify: 'space-between',
                            mt: 'lg',
                            children: [
                              e.jsx(D, {
                                color: T.dangerColor,
                                variant: 'outline',
                                leftSection: e.jsx(_, { size: 16 }),
                                onClick: g,
                                fullWidth: k,
                                children: 'Delete Package'
                              }),
                              e.jsx(D, {
                                type: 'submit',
                                disabled: N,
                                leftSection: e.jsx(he, { size: 16 }),
                                fullWidth: k,
                                children: N ? 'Updating...' : 'Update Package'
                              })
                            ]
                          })
                        ]
                      })
                    })
                  }),
                  e.jsx(Ge, {
                    organizationConfig: o,
                    user: m,
                    packageId: r,
                    required: !0,
                    fetchPackageDetails: b
                  }),
                  e.jsx(He, {
                    organizationConfig: o,
                    tasks: q,
                    fetchPackageDetails: b
                  })
                ]
              })
            })
          ]
        }),
        e.jsx($e, {
          agreeTerms: I,
          close: f,
          opened: i,
          confirmDelete: w,
          handleDeletePackage: pe,
          setAgreeTerms: P,
          setConfirmDelete: B
        })
      ]
    });
  };
export { Ks as default };
