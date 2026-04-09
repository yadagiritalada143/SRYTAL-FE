import {
  d as ws,
  f as ys,
  u as xs,
  X as Cs,
  j as e,
  U as Ss,
  Y as As,
  Z as is,
  b as bs,
  a as Ds,
  e as b,
  B as ds,
  c as Is,
  $ as ps,
  a0 as vs,
  a1 as ks,
  g as Ns,
  r as zs,
  a2 as Ps,
  v as be,
  S as $,
  s as Ts,
  G as d,
  T as t,
  a3 as Ms,
  D as X
} from './index-Cn_-nzwF.js';
import {
  o as ms,
  s as ne,
  a as Es,
  e as Os,
  n as L,
  b as Bs,
  d as Fs,
  u as Ls,
  t as _s,
  c as $s,
  C as us
} from './zod-DC47Kjo4.js';
import { e as Rs, p as Gs, f as Js } from './admin-services-CTc0QqQI.js';
import { u as qs } from './toast-Cmrx_Mrb.js';
import { g as Us } from './get-auto-contrast-value-Da6zqqWm.js';
import { C as Vs } from './CheckIcon-CpIg4BN2.js';
import { L as Ws } from './LoadingOverlay-B3xOMKqB.js';
import { C as q } from './CommonButton-D8AVyhIy.js';
import { C as Ys } from './Container-3LzVKj3b.js';
import { C as _ } from './Card-BOCM3d4L.js';
import { T as U } from './Title-T3OvY56h.js';
import { G as c } from './Grid-CH2QJG7V.js';
import { S as hs } from './Select-KZOOD-9X.js';
import { D as le } from './Divider-C8nnAxUa.js';
import { M as Ks } from './MonthPickerInput-CMfH1eKB.js';
import { T as v } from './TextInput-DUPEWkCs.js';
import { D as Hs } from './DatePickerInput-DkPCxbtp.js';
import { A as Zs } from './Alert-Br9n4AyK.js';
import { I as Qs } from './IconAlertCircle-BuevHmWi.js';
import { I as Xs } from './IconCheck-BwudGQvW.js';
import { I as ea } from './IconCircleCheck-rZ6LYGaS.js';
import './common-services-DPGUVDMw.js';
import './api-client-CcbR4Lbf.js';
import './createReactComponent-wv-YgGrS.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './IconX-BFEQcM8f.js';
import './get-base-value-BKGvYumc.js';
import './Input-kzRYOXAd.js';
import './OptionsDropdown-B_GLZDf8.js';
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
import './use-disclosure-Dul82tkt.js';
import './DatePicker-BI1MhDah.js';
const [sa, aa] = ws('Stepper component was not found in tree');
var je = {
  root: 'm_cbb4ea7e',
  steps: 'm_aaf89d0b',
  separator: 'm_2a371ac9',
  content: 'm_78da155d',
  step: 'm_cbb57068',
  'step--horizontal': 'm_f56b1e2c',
  'step--vertical': 'm_833edb7e',
  verticalSeparator: 'm_6496b3f3',
  stepWrapper: 'm_818e70b',
  stepIcon: 'm_1959ad01',
  stepCompletedIcon: 'm_a79331dc',
  stepBody: 'm_1956aa2a',
  stepLabel: 'm_12051f6c',
  stepDescription: 'm_164eea74'
};
const xe = () => null;
xe.displayName = '@mantine/core/StepperCompleted';
const ye = (i, m) => (typeof i == 'function' ? e.jsx(i, { step: m || 0 }) : i),
  oa = { withIcon: !0, allowStepClick: !0, iconPosition: 'left' },
  fe = ys((i, m) => {
    const {
        classNames: o,
        className: u,
        style: k,
        styles: g,
        vars: N,
        step: E,
        state: C,
        color: R,
        icon: z,
        completedIcon: P,
        progressIcon: j,
        label: O,
        description: G,
        withIcon: ee,
        iconSize: r,
        loading: H,
        allowStepClick: a,
        allowStepSelect: Z,
        iconPosition: V,
        orientation: se,
        mod: ae,
        ...x
      } = xs('StepperStep', oa, i),
      y = aa(),
      oe = Cs(),
      p = { classNames: o, styles: g },
      T = C === 'stepCompleted' ? null : C === 'stepProgress' ? j : z,
      w = {
        'data-progress': C === 'stepProgress' || void 0,
        'data-completed': C === 'stepCompleted' || void 0
      };
    return e.jsxs(Ss, {
      ...y.getStyles('step', {
        className: u,
        style: k,
        variant: y.orientation,
        ...p
      }),
      mod: [{ 'icon-position': V || y.iconPosition, 'allow-click': a }, ae],
      ref: m,
      ...w,
      ...x,
      __vars: { '--step-color': R ? bs(R, oe) : void 0 },
      tabIndex: a ? 0 : -1,
      children: [
        ee &&
          e.jsxs('span', {
            ...y.getStyles('stepWrapper', p),
            children: [
              e.jsxs('span', {
                ...y.getStyles('stepIcon', p),
                ...w,
                children: [
                  e.jsx(As, {
                    mounted: C === 'stepCompleted',
                    transition: 'pop',
                    duration: 200,
                    children: f =>
                      e.jsx('span', {
                        ...y.getStyles('stepCompletedIcon', { style: f, ...p }),
                        children: H
                          ? e.jsx(is, {
                              color: 'var(--mantine-color-white)',
                              size: 'calc(var(--stepper-icon-size) / 2)',
                              ...y.getStyles('stepLoader', p)
                            })
                          : ye(P, E) || e.jsx(Vs, { size: '60%' })
                      })
                  }),
                  C !== 'stepCompleted'
                    ? e.jsx('span', {
                        children: H
                          ? e.jsx(is, {
                              ...y.getStyles('stepLoader', p),
                              size: 'calc(var(--stepper-icon-size) / 2)',
                              color: R
                            })
                          : ye(T || z, E)
                      })
                    : null
                ]
              }),
              se === 'vertical' &&
                e.jsx('span', {
                  ...y.getStyles('verticalSeparator', p),
                  'data-active': C === 'stepCompleted' || void 0
                })
            ]
          }),
        (O || G) &&
          e.jsxs('span', {
            ...y.getStyles('stepBody', p),
            'data-orientation': y.orientation,
            'data-icon-position': V || y.iconPosition,
            children: [
              O &&
                e.jsx('span', {
                  ...y.getStyles('stepLabel', p),
                  children: ye(O, E)
                }),
              G &&
                e.jsx('span', {
                  ...y.getStyles('stepDescription', p),
                  children: ye(G, E)
                })
            ]
          })
      ]
    });
  });
fe.classes = je;
fe.displayName = '@mantine/core/StepperStep';
const ta = {
    orientation: 'horizontal',
    iconPosition: 'left',
    allowNextStepsSelect: !0,
    wrap: !0
  },
  na = Is(
    (
      i,
      {
        color: m,
        iconSize: o,
        size: u,
        contentPadding: k,
        radius: g,
        autoContrast: N
      }
    ) => ({
      root: {
        '--stepper-color': m ? bs(m, i) : void 0,
        '--stepper-icon-color': Us(N, i)
          ? Ps({ color: m, theme: i, autoContrast: N })
          : void 0,
        '--stepper-icon-size':
          o === void 0 ? Ns(u, 'stepper-icon-size') : zs(o),
        '--stepper-content-padding': ps(k),
        '--stepper-radius': g === void 0 ? void 0 : ks(g),
        '--stepper-fz': vs(u),
        '--stepper-spacing': ps(u)
      }
    })
  ),
  K = ys((i, m) => {
    var de, pe, me;
    const o = xs('Stepper', ta, i),
      {
        classNames: u,
        className: k,
        style: g,
        styles: N,
        unstyled: E,
        vars: C,
        children: R,
        onStepClick: z,
        active: P,
        icon: j,
        completedIcon: O,
        progressIcon: G,
        color: ee,
        iconSize: r,
        contentPadding: H,
        orientation: a,
        iconPosition: Z,
        size: V,
        radius: se,
        allowNextStepsSelect: ae,
        wrap: x,
        autoContrast: y,
        attributes: oe,
        ...p
      } = o,
      T = Ds({
        name: 'Stepper',
        classes: je,
        props: o,
        className: k,
        style: g,
        classNames: u,
        styles: N,
        unstyled: E,
        attributes: oe,
        vars: C,
        varsResolver: na
      }),
      w = b.Children.toArray(R),
      f = w.filter(B => B.type !== xe),
      W = w.find(B => B.type === xe),
      re = f.reduce((B, S, A) => {
        const ue =
            P === A ? 'stepProgress' : P > A ? 'stepCompleted' : 'stepInactive',
          he =
            typeof z != 'function'
              ? !1
              : typeof S.props.allowStepSelect == 'boolean'
                ? S.props.allowStepSelect
                : ue === 'stepCompleted' || ae;
        return (
          B.push(
            b.cloneElement(S, {
              icon: S.props.icon || j || A + 1,
              key: A,
              step: A,
              state: ue,
              onClick: () => he && (z == null ? void 0 : z(A)),
              allowStepClick: he,
              completedIcon: S.props.completedIcon || O,
              progressIcon: S.props.progressIcon || G,
              color: S.props.color || ee,
              iconSize: r,
              iconPosition: S.props.iconPosition || Z,
              orientation: a
            })
          ),
          a === 'horizontal' &&
            A !== f.length - 1 &&
            B.push(
              b.createElement('div', {
                ...T('separator'),
                'data-active': A < P || void 0,
                'data-orientation': a,
                key: `separator-${A}`
              })
            ),
          B
        );
      }, []),
      te =
        (pe = (de = f[P]) == null ? void 0 : de.props) == null
          ? void 0
          : pe.children,
      ce = (me = W == null ? void 0 : W.props) == null ? void 0 : me.children,
      ie = P > f.length - 1 ? ce : te;
    return e.jsx(sa, {
      value: { getStyles: T, orientation: a, iconPosition: Z },
      children: e.jsxs(ds, {
        ...T('root'),
        ref: m,
        size: V,
        ...p,
        children: [
          e.jsx(ds, {
            ...T('steps'),
            mod: {
              orientation: a,
              'icon-position': Z,
              wrap: x && a !== 'vertical'
            },
            children: re
          }),
          ie && e.jsx('div', { ...T('content'), children: ie })
        ]
      })
    });
  });
K.classes = je;
K.displayName = '@mantine/core/Stepper';
K.Completed = xe;
K.Step = fe;
const la = ms({
    employeeId: ne({ required_error: 'Employee ID is required' }).min(
      1,
      'Employee ID is required'
    ),
    selectedMonth: Bs([Fs(), ne()])
      .refine(i => i != null, 'Month/Year is required')
      .transform(i => {
        if (i instanceof Date) return i;
        const m = new Date(i);
        if (isNaN(m.getTime())) throw new Error('Invalid month');
        return m;
      }),
    daysInMonth: L({ required_error: 'Days in month is required' }).min(
      1,
      'Days in month must be at least 1'
    ),
    lopDays: L()
      .min(0, 'LOP days must be 0 or more')
      .max(31, 'LOP days cannot exceed 31')
      .optional()
      .default(0),
    basicSalary: L().min(0),
    hraPercentage: L().optional(),
    specialAllowance: L().optional(),
    conveyanceAllowance: L().optional(),
    medicalAllowance: L().optional(),
    otherAllowances: L().optional(),
    additionalAllowances: Es(
      ms({
        label: ne().min(1),
        amount: L().min(0),
        type: Os(['add', 'deduct']).default('add')
      })
    )
      .optional()
      .default([]),
    payDate: ne().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Pay date must be in YYYY-MM-DD format'
    }),
    transactionId: ne()
      .trim()
      .min(1, 'Transaction ID is required')
      .regex(/^[A-Z]{4,10}[0-9]{6,20}$/, {
        message: 'Invalid bank transaction reference'
      })
  }),
  ra = ({ steps: i, active: m, children: o }) => {
    const { themeConfig: u, isDarkTheme: k } = be();
    return e.jsxs(K, {
      active: m,
      allowNextStepsSelect: !1,
      styles: {
        stepLabel: { fontSize: '15px', fontWeight: 700, color: u.color },
        stepDescription: { fontSize: '12px', color: u.color, opacity: 0.7 },
        separator: { backgroundColor: u.button.color, height: 2 },
        stepIcon: {
          borderWidth: 3,
          borderColor: k ? u.button.color : '',
          '&[data-active]': {
            backgroundColor: u.accentColor,
            borderColor: u.accentColor,
            color: '#fff'
          },
          '&[data-completed]': {
            backgroundColor: u.successColor,
            borderColor: u.successColor,
            color: '#fff'
          }
        }
      },
      children: [
        i.map((g, N) =>
          e.jsx(
            K.Step,
            {
              label: g.label,
              description: g.description,
              disabled: g.enabled === !1,
              children: e.jsx($, { mt: 'xl', children: o[N] })
            },
            N
          )
        ),
        e.jsx(K.Completed, {
          children: e.jsx($, {
            align: 'center',
            py: 'xl',
            children: o[i.length]
          })
        })
      ]
    });
  },
  ca = ({ visible: i, blur: m = 6, opacity: o = 0.6 }) => {
    const { themeConfig: u } = be();
    return e.jsx(Ws, {
      visible: i,
      zIndex: 9999,
      overlayProps: { blur: m, backgroundOpacity: o, color: u.backgroundColor },
      loaderProps: { type: 'dots', size: 'xl' },
      style: { position: 'fixed', inset: 0 }
    });
  },
  M = ({ label: i, value: m, color: o, error: u }) =>
    e.jsx(v, {
      label: i,
      value: m ?? '',
      disabled: !0,
      error: u,
      styles: {
        input: {
          backgroundColor: 'transparent',
          border: 'none',
          paddingLeft: '10px',
          color: o
        }
      }
    }),
  ia = i => {
    if (!i) return '';
    try {
      return new Date(i).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return i;
    }
  },
  da = [
    { label: 'Fill Details', description: 'Employee Info', enabled: !0 },
    { label: 'Calculation', description: 'Salary Breakdown', enabled: !0 },
    {
      label: 'Generate Salary Slip',
      description: 'Review & Download',
      enabled: !0
    }
  ],
  Qa = () => {
    var De,
      Ie,
      ve,
      ke,
      Ne,
      ze,
      Pe,
      Te,
      Me,
      Ee,
      Oe,
      Be,
      Fe,
      Le,
      _e,
      $e,
      Re,
      Ge,
      Je,
      qe,
      Ue,
      Ve,
      We,
      Ye,
      Ke,
      He,
      Ze,
      Qe,
      Xe,
      es,
      ss,
      as,
      os,
      ts,
      ns,
      ls,
      rs,
      cs;
    const [i, m] = b.useState(0),
      { themeConfig: o, isDarkTheme: u } = be(),
      [k, g] = b.useState([]),
      [N, E] = b.useState(!1),
      [C, R] = b.useState(!1),
      [z, P] = b.useState(0),
      j = Ts('(max-width: 768px)'),
      [O, G] = b.useState(null),
      ee = u ? o.dangerColor : o.lightDangerColor,
      [r, H] = b.useState({
        _id: '',
        empId: '',
        empName: '',
        designation: '',
        department: '',
        dateOfJoining: '',
        uanNumber: '',
        email: '',
        dob: '',
        bankAccount: '',
        ifsc: '',
        bankName: '',
        pan: '',
        aadharNumber: ''
      }),
      [a, Z] = b.useState(null),
      [V, se] = b.useState(!1),
      { showSuccessToast: ae } = qs(),
      {
        register: x,
        control: y,
        handleSubmit: oe,
        watch: p,
        trigger: T,
        setValue: w,
        formState: { errors: f }
      } = Ls({
        resolver: _s(la),
        defaultValues: {
          employeeId: '',
          selectedMonth: void 0,
          daysInMonth: 0,
          lopDays: 0,
          basicSalary: 0,
          hraPercentage: 0,
          specialAllowance: 0,
          conveyanceAllowance: 0,
          medicalAllowance: 0,
          otherAllowances: 0,
          additionalAllowances: [],
          payDate: new Date().toISOString().split('T')[0],
          transactionId: ''
        }
      }),
      W = p('selectedMonth'),
      re = p('daysInMonth'),
      te = p('lopDays'),
      ce = p('basicSalary') || 0,
      ie = p('hraPercentage') || 0,
      de = p('specialAllowance') || 0,
      pe = p('conveyanceAllowance') || 0,
      me = p('medicalAllowance') || 0,
      B = p('otherAllowances') || 0,
      S = p('payDate'),
      A = p('transactionId'),
      ue = p();
    b.useEffect(() => {
      O && G(null);
    }, [JSON.stringify(ue)]);
    const {
        fields: ge,
        append: he,
        remove: js
      } = $s({ control: y, name: 'additionalAllowances' }),
      we = p('additionalAllowances') || [];
    (we.reduce(
      (s, n) =>
        n.type === 'deduct' ? s - (n.amount || 0) : s + (n.amount || 0),
      0
    ),
      b.useEffect(() => {
        (async () => {
          var n, h;
          try {
            E(!0);
            const l = await Rs();
            g(l);
          } catch (l) {
            const D =
              ((h =
                (n = l == null ? void 0 : l.response) == null
                  ? void 0
                  : n.data) == null
                ? void 0
                : h.message) || 'Failed to load employees';
            X.error(D);
          } finally {
            E(!1);
          }
        })();
      }, []));
    const fs = s => {
      var h, l, D, Y, Q, J;
      if ((w('employeeId', s || ''), !s)) {
        H({
          _id: '',
          empId: '',
          empName: '',
          designation: '',
          department: '',
          dateOfJoining: '',
          uanNumber: '',
          email: '',
          dob: '',
          bankAccount: '',
          ifsc: '',
          bankName: '',
          pan: '',
          aadharNumber: ''
        });
        return;
      }
      const n = k.find(F => F.employeeId === s);
      n &&
        H({
          _id: n.id,
          empId: n.employeeId,
          empName: n.firstName + ' ' + (n.lastName || ''),
          designation:
            ((l = (h = n.employeeRole) == null ? void 0 : h[0]) == null
              ? void 0
              : l.designation) || '',
          department:
            ((D = n.department) == null ? void 0 : D.departmentName) || '',
          dateOfJoining: n.dateOfJoining || '',
          uanNumber: n.uanNumber || '',
          email: n.email ?? '',
          dob: ia(n.dateOfBirth || ''),
          bankAccount:
            ((Y = n.bankDetailsInfo) == null ? void 0 : Y.accountNumber) || '',
          ifsc: ((Q = n.bankDetailsInfo) == null ? void 0 : Q.ifscCode) || '',
          bankName:
            ((J = n.bankDetailsInfo) == null ? void 0 : J.bankName) || '',
          pan: n.panCardNumber || '',
          aadharNumber: n.aadharNumber || ''
        });
    };
    b.useEffect(() => {
      const s = Ae(W);
      if (!s) {
        (P(0), w('daysInMonth', 0));
        return;
      }
      const n = s.getFullYear(),
        h = s.getMonth(),
        l = new Date(n, h + 1, 0).getDate();
      (P(l), w('daysInMonth', l));
    }, [W, w]);
    const Ce = async () => {
        var s, n;
        if (i === 0) {
          if (!(await T(['employeeId', 'selectedMonth']))) return;
          m(l => (l < 2 ? l + 1 : l));
        } else if (i === 1) {
          if (!(await T(['basicSalary', 'payDate', 'transactionId']))) return;
          if (!r.email) {
            X.error('Employee email is missing');
            return;
          }
          try {
            se(!0);
            const l = p(),
              D = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
              ],
              Y =
                l.selectedMonth instanceof Date
                  ? l.selectedMonth
                  : new Date(l.selectedMonth),
              Q = `${D[Y.getMonth()]} ${Y.getFullYear()}`,
              J = {
                employeeId: l.employeeId,
                employeeName: r.empName,
                employeeEmail: r.email,
                designation: r.designation,
                department: r.department,
                dateOfJoining: r.dateOfJoining,
                payPeriod: Q,
                payDate: l.payDate
                  ? new Date(l.payDate).toISOString().split('T')[0]
                  : '',
                bankName: r.bankName,
                IFSCCODE: r.ifsc,
                bankAccountNumber: r.bankAccount,
                transactionType: 'NEFT',
                transactionId: l.transactionId || void 0,
                panNumber: r.pan,
                uanNumber: r.uanNumber || 'N/A',
                totalWorkingDays: l.daysInMonth,
                daysWorked: l.daysInMonth - (l.lopDays || 0),
                lossOfPayDays: l.lopDays,
                basicSalary: l.basicSalary,
                hraPercentage: l.hraPercentage,
                specialAllowance: l.specialAllowance,
                conveyanceAllowance: l.conveyanceAllowance,
                medicalAllowance: l.medicalAllowance,
                otherAllowances: l.otherAllowances,
                additionalAllowances: l.additionalAllowances,
                pfPercentage: 0,
                professionalTax: 0,
                incomeTax: 0,
                otherDeductions: 0
              },
              F = await Gs(J);
            (Z(F), m(2));
          } catch (l) {
            X.error(
              ((n =
                (s = l == null ? void 0 : l.response) == null
                  ? void 0
                  : s.data) == null
                ? void 0
                : n.message) || 'Failed to fetch salary slip preview'
            );
          } finally {
            se(!1);
          }
        }
      },
      Se = () => m(s => (s > 0 ? s - 1 : s)),
      gs = async s => {
        var n, h;
        try {
          if (!r.email) {
            X.error('Employee email is missing');
            return;
          }
          if (O) {
            const F = window.URL.createObjectURL(O),
              I = document.createElement('a');
            ((I.href = F),
              (I.download = `SalarySlip_${r.empId}.pdf`),
              document.body.appendChild(I),
              I.click(),
              document.body.removeChild(I),
              window.URL.revokeObjectURL(F));
            return;
          }
          if ((R(!0), s.lopDays > s.daysInMonth)) {
            X.error('LOP days cannot exceed total days');
            return;
          }
          const l = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            D =
              s.selectedMonth instanceof Date
                ? s.selectedMonth
                : new Date(s.selectedMonth),
            Y = `${l[D.getMonth()]} ${D.getFullYear()}`,
            Q = {
              _id: r._id,
              employeeId: s.employeeId,
              employeeName: r.empName,
              employeeEmail: r.email,
              designation: r.designation,
              department: r.department,
              dateOfJoining: r.dateOfJoining,
              payPeriod: Y,
              payDate: s.payDate,
              bankName: r.bankName,
              IFSCCODE: r.ifsc,
              bankAccountNumber: r.bankAccount,
              transactionType: 'NEFT',
              transactionId: s.transactionId,
              panNumber: r.pan,
              uanNumber: r.uanNumber || 'N/A',
              totalWorkingDays: s.daysInMonth,
              daysWorked: s.daysInMonth - (s.lopDays || 0),
              lossOfPayDays: s.lopDays,
              basicSalary: s.basicSalary,
              hraPercentage: s.hraPercentage,
              specialAllowance: s.specialAllowance,
              conveyanceAllowance: s.conveyanceAllowance,
              medicalAllowance: s.medicalAllowance,
              otherAllowances: s.otherAllowances,
              additionalAllowances: s.additionalAllowances,
              pfPercentage: 0,
              professionalTax: 0,
              incomeTax: 0,
              otherDeductions: 0
            },
            J = await Js(Q);
          if (J instanceof Blob) {
            G(J);
            const F = window.URL.createObjectURL(J),
              I = document.createElement('a');
            ((I.href = F),
              (I.download = `SalarySlip_${r.empId}.pdf`),
              document.body.appendChild(I),
              I.click(),
              document.body.removeChild(I),
              window.URL.revokeObjectURL(F),
              ae('Salary slip generated successfully!'),
              m(3));
          }
        } catch (l) {
          X.error(
            ((h = (n = l.response) == null ? void 0 : n.data) == null
              ? void 0
              : h.message) ||
              l.message ||
              'Failed to generate salary slip'
          );
        } finally {
          R(!1);
        }
      },
      Ae = s => {
        if (s instanceof Date && !isNaN(s.getTime())) return s;
        if (typeof s == 'string') {
          const n = new Date(s);
          return isNaN(n.getTime()) ? null : n;
        }
        return null;
      };
    return e.jsxs(Ys, {
      size: 'lg',
      py: 'xl',
      px: 'sm',
      mt: 'xl',
      children: [
        e.jsx(ca, { visible: V }),
        e.jsxs(_, {
          shadow: 'sm',
          radius: 'md',
          p: j ? 'md' : 'xl',
          withBorder: !0,
          children: [
            e.jsx(U, {
              order: 2,
              ta: 'center',
              mb: 'xl',
              children: 'Generate Salary Slip'
            }),
            e.jsx(ra, {
              steps: da,
              active: i,
              children: [
                e.jsxs(
                  $,
                  {
                    mt: 'lg',
                    gap: 'lg',
                    children: [
                      e.jsx(U, { order: 5, children: 'Employee Information' }),
                      e.jsxs(c, {
                        children: [
                          e.jsx(c.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(hs, {
                              label: 'Employee ID',
                              placeholder: N ? 'Loading...' : 'Select employee',
                              searchable: !0,
                              required: !0,
                              data: k
                                .filter(s => s.employeeId)
                                .map(s => ({
                                  value: s.employeeId,
                                  label: `${s.employeeId} - ${s.firstName} ${s.lastName}`
                                })),
                              value: r.empId,
                              onChange: s => fs(s),
                              error:
                                (De = f.employeeId) == null
                                  ? void 0
                                  : De.message
                            })
                          }),
                          e.jsx(c.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(M, {
                              label: 'Employee Name',
                              value: r.empName,
                              color: o.color
                            })
                          }),
                          e.jsx(c.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(M, {
                              label: 'Email',
                              value: r.email,
                              color: o.color
                            })
                          }),
                          e.jsx(c.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(M, {
                              label: 'Designation',
                              value: r.designation,
                              color: o.color
                            })
                          }),
                          e.jsx(c.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(M, {
                              label: 'Date of Birth',
                              value: r.dob,
                              color: o.color
                            })
                          }),
                          e.jsx(c.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(M, {
                              label: 'Department',
                              value: r.department,
                              color: o.color
                            })
                          })
                        ]
                      }),
                      e.jsx(le, {}),
                      e.jsx(U, { order: 5, children: 'Bank Details' }),
                      e.jsxs(c, {
                        children: [
                          e.jsx(c.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(M, {
                              label: 'Bank Account Number',
                              value: r.bankAccount,
                              color: o.color
                            })
                          }),
                          e.jsx(c.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(M, {
                              label: 'Bank Name',
                              value: r.bankName,
                              color: o.color
                            })
                          }),
                          e.jsx(c.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(M, {
                              label: 'IFSC Code',
                              value: r.ifsc,
                              color: o.color
                            })
                          }),
                          e.jsx(c.Col, {
                            span: { base: 12, sm: 6 },
                            children: e.jsx(M, {
                              label: 'PAN Number',
                              value: r.pan,
                              color: o.color
                            })
                          })
                        ]
                      }),
                      e.jsx(le, {}),
                      e.jsx(U, { order: 5, children: 'Salary Period' }),
                      e.jsxs(c, {
                        align: 'flex-end',
                        children: [
                          e.jsx(c.Col, {
                            span: 4,
                            children: e.jsx(us, {
                              name: 'selectedMonth',
                              control: y,
                              render: ({ field: s }) => {
                                var n;
                                return e.jsx(Ks, {
                                  styles: {
                                    input: {
                                      backgroundColor: o.headerBackgroundColor,
                                      color: o.color,
                                      borderColor: o.borderColor
                                    },
                                    label: { color: o.color }
                                  },
                                  value: s.value
                                    ? s.value instanceof Date
                                      ? s.value
                                      : new Date(s.value)
                                    : null,
                                  onChange: s.onChange,
                                  label: 'Select Month',
                                  required: !0,
                                  placeholder: 'Pick month',
                                  error:
                                    (n = f.selectedMonth) == null
                                      ? void 0
                                      : n.message
                                });
                              }
                            })
                          }),
                          e.jsx(c.Col, {
                            span: 4,
                            children: e.jsx(M, {
                              label: 'Total Days',
                              value: z > 0 ? String(z) : '',
                              color: o.color,
                              error:
                                (Ie = f.daysInMonth) == null
                                  ? void 0
                                  : Ie.message
                            })
                          }),
                          e.jsx(c.Col, {
                            span: 4,
                            children: e.jsx(v, {
                              label: 'LOP Days',
                              ...x('lopDays', { valueAsNumber: !0 }),
                              type: 'number',
                              placeholder: '0',
                              error:
                                (ve = f.lopDays) == null ? void 0 : ve.message
                            })
                          })
                        ]
                      }),
                      e.jsx(d, {
                        justify: 'flex-end',
                        mt: 'xl',
                        children: e.jsx(q, { onClick: Ce, children: 'Next' })
                      })
                    ]
                  },
                  'step1'
                ),
                e.jsxs(
                  $,
                  {
                    mt: 'lg',
                    gap: 'md',
                    children: [
                      e.jsxs(_, {
                        radius: 'md',
                        p: j ? 'md' : 'lg',
                        withBorder: !0,
                        style: {
                          backgroundColor: o.headerBackgroundColor,
                          color: o.color
                        },
                        children: [
                          e.jsx(U, {
                            order: 5,
                            mb: 'md',
                            children: 'Earnings Breakdown'
                          }),
                          e.jsxs(c, {
                            children: [
                              e.jsx(c.Col, {
                                span: { base: 12, sm: 6 },
                                children: e.jsx(v, {
                                  label: 'Basic Salary',
                                  type: 'number',
                                  required: !0,
                                  onKeyDown: s => {
                                    ['e', 'E', '+', '-'].includes(s.key) &&
                                      s.preventDefault();
                                  },
                                  ...x('basicSalary', { valueAsNumber: !0 })
                                })
                              }),
                              e.jsx(c.Col, {
                                span: { base: 12, sm: 6 },
                                children: e.jsx(v, {
                                  label: 'HRA (%)',
                                  type: 'number',
                                  onKeyDown: s => {
                                    ['e', 'E', '+', '-'].includes(s.key) &&
                                      s.preventDefault();
                                  },
                                  ...x('hraPercentage', { valueAsNumber: !0 })
                                })
                              }),
                              e.jsx(c.Col, {
                                span: { base: 12, sm: 6 },
                                children: e.jsx(v, {
                                  label: 'Special Allowance',
                                  type: 'number',
                                  onKeyDown: s => {
                                    ['e', 'E', '+', '-'].includes(s.key) &&
                                      s.preventDefault();
                                  },
                                  ...x('specialAllowance', {
                                    valueAsNumber: !0
                                  })
                                })
                              }),
                              e.jsx(c.Col, {
                                span: { base: 12, sm: 6 },
                                children: e.jsx(v, {
                                  label: 'Conveyance Allowance',
                                  type: 'number',
                                  onKeyDown: s => {
                                    ['e', 'E', '+', '-'].includes(s.key) &&
                                      s.preventDefault();
                                  },
                                  ...x('conveyanceAllowance', {
                                    valueAsNumber: !0
                                  })
                                })
                              }),
                              e.jsx(c.Col, {
                                span: { base: 12, sm: 6 },
                                children: e.jsx(v, {
                                  label: 'Medical Allowance',
                                  type: 'number',
                                  onKeyDown: s => {
                                    ['e', 'E', '+', '-'].includes(s.key) &&
                                      s.preventDefault();
                                  },
                                  ...x('medicalAllowance', {
                                    valueAsNumber: !0
                                  })
                                })
                              }),
                              e.jsx(c.Col, {
                                span: { base: 12, sm: 6 },
                                children: e.jsx(v, {
                                  label: 'Other Allowances',
                                  type: 'number',
                                  onKeyDown: s => {
                                    ['e', 'E', '+', '-'].includes(s.key) &&
                                      s.preventDefault();
                                  },
                                  ...x('otherAllowances', { valueAsNumber: !0 })
                                })
                              }),
                              e.jsx(c.Col, {
                                span: { base: 12, sm: 6 },
                                children: e.jsx(us, {
                                  name: 'payDate',
                                  control: y,
                                  render: ({ field: s }) => {
                                    var n;
                                    return e.jsx(Hs, {
                                      label: 'Pay Date',
                                      placeholder: 'Select pay date',
                                      required: !0,
                                      value: s.value ? new Date(s.value) : null,
                                      onChange: h => {
                                        if (h) {
                                          const l = new Date(h),
                                            D = new Date(
                                              l.getTime() -
                                                l.getTimezoneOffset() * 6e4
                                            )
                                              .toISOString()
                                              .split('T')[0];
                                          s.onChange(D);
                                        }
                                      },
                                      error:
                                        (n = f.payDate) == null
                                          ? void 0
                                          : n.message,
                                      styles: {
                                        input: {
                                          backgroundColor:
                                            o.headerBackgroundColor,
                                          color: o.color,
                                          borderColor: o.borderColor
                                        },
                                        label: { color: o.color }
                                      }
                                    });
                                  }
                                })
                              }),
                              e.jsx(c.Col, {
                                span: { base: 12, sm: 6 },
                                children: e.jsx(v, {
                                  label: 'Transaction ID',
                                  required: !0,
                                  placeholder: 'Enter transaction ID',
                                  ...x('transactionId'),
                                  onChange: s =>
                                    w(
                                      'transactionId',
                                      s.target.value.toUpperCase()
                                    ),
                                  error:
                                    (ke = f.transactionId) == null
                                      ? void 0
                                      : ke.message
                                })
                              })
                            ]
                          })
                        ]
                      }),
                      e.jsxs(_, {
                        shadow: 'sm',
                        radius: 'md',
                        p: j ? 'md' : 'lg',
                        withBorder: !0,
                        style: {
                          backgroundColor: o.headerBackgroundColor,
                          color: o.color
                        },
                        children: [
                          e.jsxs(d, {
                            justify: 'space-between',
                            mb: 'md',
                            children: [
                              e.jsx(U, {
                                order: 6,
                                children: 'Additional Allowances'
                              }),
                              e.jsx(q, {
                                type: 'button',
                                variant: 'light',
                                onClick: () =>
                                  he({ label: '', amount: 0, type: 'add' }),
                                children: '+ Add More'
                              })
                            ]
                          }),
                          e.jsx($, {
                            children: ge.map((s, n) =>
                              e.jsx(
                                d,
                                {
                                  grow: !0,
                                  children: e.jsxs(c, {
                                    grow: !0,
                                    children: [
                                      e.jsx(c.Col, {
                                        span: 4,
                                        children: e.jsx(v, {
                                          placeholder: 'Allowance Name',
                                          ...x(
                                            `additionalAllowances.${n}.label`
                                          )
                                        })
                                      }),
                                      e.jsx(c.Col, {
                                        span: 3,
                                        children: e.jsx(v, {
                                          type: 'number',
                                          placeholder: 'Amount',
                                          onKeyDown: h => {
                                            ['e', 'E', '+', '-'].includes(
                                              h.key
                                            ) && h.preventDefault();
                                          },
                                          ...x(
                                            `additionalAllowances.${n}.amount`,
                                            { valueAsNumber: !0 }
                                          )
                                        })
                                      }),
                                      e.jsx(c.Col, {
                                        span: 3,
                                        children: e.jsx(hs, {
                                          data: [
                                            { value: 'add', label: 'Add' },
                                            { value: 'deduct', label: 'Deduct' }
                                          ],
                                          ...x(
                                            `additionalAllowances.${n}.type`
                                          ),
                                          defaultValue: 'add',
                                          onChange: h =>
                                            w(
                                              `additionalAllowances.${n}.type`,
                                              h
                                            )
                                        })
                                      }),
                                      e.jsx(c.Col, {
                                        span: 2,
                                        children: e.jsx(q, {
                                          type: 'button',
                                          color: 'red',
                                          variant: 'subtle',
                                          onClick: () => js(n),
                                          children: 'Remove'
                                        })
                                      })
                                    ]
                                  })
                                },
                                s.id
                              )
                            )
                          })
                        ]
                      }),
                      e.jsxs(d, {
                        justify: 'space-between',
                        mt: 'xl',
                        children: [
                          e.jsx(q, {
                            variant: 'default',
                            onClick: Se,
                            children: 'Back'
                          }),
                          e.jsx(q, {
                            loading: V,
                            onClick: Ce,
                            children: 'Preview'
                          })
                        ]
                      })
                    ]
                  },
                  'step2'
                ),
                e.jsx(
                  'form',
                  {
                    onSubmit: oe(gs),
                    children: e.jsxs($, {
                      mt: 'lg',
                      gap: 'xl',
                      children: [
                        e.jsxs(d, {
                          justify: 'space-between',
                          align: 'flex-end',
                          children: [
                            e.jsx('div', {
                              children: e.jsx(U, {
                                order: 3,
                                children: 'Salary Slip Summary'
                              })
                            }),
                            e.jsx(Zs, {
                              icon: e.jsx(Qs, { size: 16 }),
                              title: 'Review Details',
                              color: u ? 'cyan' : 'blue',
                              py: 5,
                              variant: 'light'
                            })
                          ]
                        }),
                        e.jsxs(c, {
                          gutter: 'md',
                          children: [
                            e.jsx(c.Col, {
                              span: { base: 12, sm: 4 },
                              children: e.jsxs(_, {
                                withBorder: !0,
                                radius: 'md',
                                p: j ? 'xs' : 'sm',
                                ta: 'center',
                                style: {
                                  borderLeft: `4px solid ${o.accentColor}`
                                },
                                children: [
                                  e.jsx(t, {
                                    size: 'xs',
                                    fw: 700,
                                    tt: 'uppercase',
                                    c: o.accentColor,
                                    children: 'Total Days'
                                  }),
                                  e.jsx(t, {
                                    size: j ? 'lg' : 'xl',
                                    fw: 800,
                                    c: o.accentColor,
                                    children: re
                                  })
                                ]
                              })
                            }),
                            e.jsx(c.Col, {
                              span: { base: 12, sm: 4 },
                              children: e.jsxs(_, {
                                withBorder: !0,
                                radius: 'md',
                                p: j ? 'xs' : 'sm',
                                ta: 'center',
                                style: { borderLeft: `4px solid ${ee}` },
                                children: [
                                  e.jsx(t, {
                                    size: 'xs',
                                    fw: 700,
                                    tt: 'uppercase',
                                    c: o.lightDangerColor,
                                    children: 'LOP Days'
                                  }),
                                  e.jsx(t, {
                                    size: j ? 'lg' : 'xl',
                                    fw: 800,
                                    c: o.lightDangerColor,
                                    children: te || 0
                                  })
                                ]
                              })
                            }),
                            e.jsx(c.Col, {
                              span: { base: 12, sm: 4 },
                              children: e.jsxs(_, {
                                withBorder: !0,
                                radius: 'md',
                                p: j ? 'xs' : 'sm',
                                ta: 'center',
                                style: {
                                  borderLeft: `4px solid ${o.successColor}`
                                },
                                children: [
                                  e.jsx(t, {
                                    size: 'xs',
                                    fw: 700,
                                    tt: 'uppercase',
                                    c: o.successColor,
                                    children: 'Working Days'
                                  }),
                                  e.jsx(t, {
                                    size: j ? 'lg' : 'xl',
                                    fw: 800,
                                    c: o.successColor,
                                    children: Math.max((re || 0) - (te || 0), 0)
                                  })
                                ]
                              })
                            })
                          ]
                        }),
                        e.jsxs(c, {
                          gutter: 'xl',
                          children: [
                            e.jsx(c.Col, {
                              span: { base: 12, md: 5 },
                              children: e.jsxs(_, {
                                withBorder: !0,
                                radius: 'md',
                                p: 'lg',
                                h: '100%',
                                children: [
                                  e.jsx(t, {
                                    fw: 700,
                                    mb: 'md',
                                    size: 'sm',
                                    tt: 'uppercase',
                                    children: 'Employee Details'
                                  }),
                                  e.jsxs($, {
                                    gap: 'xs',
                                    children: [
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Name'
                                          }),
                                          e.jsx(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: r.empName
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Employee ID'
                                          }),
                                          e.jsx(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: r.empId
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Designation'
                                          }),
                                          e.jsx(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: r.designation
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Department'
                                          }),
                                          e.jsx(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: r.department
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Email'
                                          }),
                                          e.jsx(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: r.email
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Date of Birth'
                                          }),
                                          e.jsx(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: r.dob
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'PAN'
                                          }),
                                          e.jsx(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: r.pan
                                          })
                                        ]
                                      }),
                                      e.jsx(le, { my: 'xs' }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Pay Period'
                                          }),
                                          e.jsx(t, {
                                            size: 'sm',
                                            fw: 700,
                                            c: o.accentColor,
                                            children: (() => {
                                              const s = Ae(W);
                                              return s
                                                ? s.toLocaleDateString(
                                                    'en-US',
                                                    {
                                                      month: 'long',
                                                      year: 'numeric'
                                                    }
                                                  )
                                                : '-';
                                            })()
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Pay Date'
                                          }),
                                          e.jsx(t, {
                                            size: 'sm',
                                            fw: 600,
                                            c: o.accentColor,
                                            children: S
                                              ? new Date(S).toLocaleDateString(
                                                  'en-IN',
                                                  {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit'
                                                  }
                                                )
                                              : '-'
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Transaction ID'
                                          }),
                                          e.jsx(t, {
                                            size: 'sm',
                                            fw: 600,
                                            c: o.accentColor,
                                            children:
                                              ((Ne =
                                                a == null ? void 0 : a.data) ==
                                              null
                                                ? void 0
                                                : Ne.transactionId) ??
                                              A ??
                                              '-'
                                          })
                                        ]
                                      })
                                    ]
                                  })
                                ]
                              })
                            }),
                            e.jsx(c.Col, {
                              span: { base: 12, md: 7 },
                              children: e.jsxs(_, {
                                withBorder: !0,
                                radius: 'md',
                                p: 'lg',
                                style: {
                                  backgroundColor: o.headerBackgroundColor
                                },
                                children: [
                                  e.jsx(t, {
                                    fw: 700,
                                    mb: 'md',
                                    size: 'sm',
                                    tt: 'uppercase',
                                    children: 'Salary Breakdown'
                                  }),
                                  e.jsxs($, {
                                    gap: 'xs',
                                    children: [
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Basic Salary'
                                          }),
                                          e.jsxs(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: [
                                              '₹',
                                              ' ',
                                              (
                                                ((Pe =
                                                  (ze =
                                                    a == null
                                                      ? void 0
                                                      : a.data) == null
                                                    ? void 0
                                                    : ze.calculations) == null
                                                  ? void 0
                                                  : Pe.basicSalary) ?? ce
                                              ).toFixed(2)
                                            ]
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'HRA'
                                          }),
                                          e.jsxs(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: [
                                              '₹',
                                              ' ',
                                              (
                                                ((Me =
                                                  (Te =
                                                    a == null
                                                      ? void 0
                                                      : a.data) == null
                                                    ? void 0
                                                    : Te.calculations) == null
                                                  ? void 0
                                                  : Me.hra) ?? (ce * ie) / 100
                                              ).toFixed(2)
                                            ]
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Special Allowance'
                                          }),
                                          e.jsxs(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: [
                                              '₹',
                                              ' ',
                                              (
                                                ((Oe =
                                                  (Ee =
                                                    a == null
                                                      ? void 0
                                                      : a.data) == null
                                                    ? void 0
                                                    : Ee.calculations) == null
                                                  ? void 0
                                                  : Oe.specialAllowance) ?? de
                                              ).toFixed(2)
                                            ]
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Conveyance'
                                          }),
                                          e.jsxs(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: [
                                              '₹',
                                              ' ',
                                              (
                                                ((Fe =
                                                  (Be =
                                                    a == null
                                                      ? void 0
                                                      : a.data) == null
                                                    ? void 0
                                                    : Be.calculations) == null
                                                  ? void 0
                                                  : Fe.conveyanceAllowance) ??
                                                pe
                                              ).toFixed(2)
                                            ]
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Medical'
                                          }),
                                          e.jsxs(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: [
                                              '₹',
                                              ' ',
                                              (
                                                ((_e =
                                                  (Le =
                                                    a == null
                                                      ? void 0
                                                      : a.data) == null
                                                    ? void 0
                                                    : Le.calculations) == null
                                                  ? void 0
                                                  : _e.medicalAllowance) ?? me
                                              ).toFixed(2)
                                            ]
                                          })
                                        ]
                                      }),
                                      e.jsxs(d, {
                                        justify: 'space-between',
                                        children: [
                                          e.jsx(t, {
                                            size: 'sm',
                                            children: 'Other Allowances'
                                          }),
                                          e.jsxs(t, {
                                            size: 'sm',
                                            fw: 600,
                                            children: [
                                              '₹',
                                              ' ',
                                              (
                                                ((Re =
                                                  ($e =
                                                    a == null
                                                      ? void 0
                                                      : a.data) == null
                                                    ? void 0
                                                    : $e.calculations) == null
                                                  ? void 0
                                                  : Re.otherAllowances) ?? B
                                              ).toFixed(2)
                                            ]
                                          })
                                        ]
                                      })
                                    ]
                                  }),
                                  e.jsxs(d, {
                                    justify: 'space-between',
                                    pt: 'sm',
                                    children: [
                                      e.jsx(t, {
                                        size: 'sm',
                                        fw: 600,
                                        children: 'Gross Salary:'
                                      }),
                                      e.jsxs(t, {
                                        size: 'sm',
                                        fw: 700,
                                        children: [
                                          '₹',
                                          ' ',
                                          (qe =
                                            (Je =
                                              (Ge =
                                                a == null ? void 0 : a.data) ==
                                              null
                                                ? void 0
                                                : Ge.calculations) == null
                                              ? void 0
                                              : Je.grossEarnings) == null
                                            ? void 0
                                            : qe.toFixed(2)
                                        ]
                                      })
                                    ]
                                  }),
                                  (((Ve =
                                    (Ue = a == null ? void 0 : a.data) == null
                                      ? void 0
                                      : Ue.calculations) == null
                                    ? void 0
                                    : Ve.lossOfPayAmount) ||
                                    ((Ye =
                                      (We = a == null ? void 0 : a.data) == null
                                        ? void 0
                                        : We.calculations) == null
                                      ? void 0
                                      : Ye.professionalTax) ||
                                    ((He =
                                      (Ke = a == null ? void 0 : a.data) == null
                                        ? void 0
                                        : Ke.calculations) == null
                                      ? void 0
                                      : He.incomeTax) ||
                                    ((Qe =
                                      (Ze = a == null ? void 0 : a.data) == null
                                        ? void 0
                                        : Ze.calculations) == null
                                      ? void 0
                                      : Qe.otherDeductions)) &&
                                    e.jsxs(e.Fragment, {
                                      children: [
                                        e.jsx(le, {
                                          my: 'xs',
                                          label: 'Deductions',
                                          labelPosition: 'center'
                                        }),
                                        ((es =
                                          (Xe = a == null ? void 0 : a.data) ==
                                          null
                                            ? void 0
                                            : Xe.calculations) == null
                                          ? void 0
                                          : es.lossOfPayAmount) &&
                                          ((as =
                                            (ss =
                                              a == null ? void 0 : a.data) ==
                                            null
                                              ? void 0
                                              : ss.calculations) == null
                                            ? void 0
                                            : as.lossOfPayAmount) > 0 &&
                                          e.jsxs(d, {
                                            justify: 'space-between',
                                            children: [
                                              e.jsxs(t, {
                                                size: 'sm',
                                                c: o.lightDangerColor,
                                                children: [
                                                  'LOP Deduction (',
                                                  te,
                                                  ' days)'
                                                ]
                                              }),
                                              e.jsxs(t, {
                                                size: 'sm',
                                                fw: 600,
                                                c: o.lightDangerColor,
                                                children: [
                                                  '− ₹',
                                                  ' ',
                                                  (ns =
                                                    (ts =
                                                      (os =
                                                        a == null
                                                          ? void 0
                                                          : a.data) == null
                                                        ? void 0
                                                        : os.calculations) ==
                                                    null
                                                      ? void 0
                                                      : ts.lossOfPayAmount) ==
                                                  null
                                                    ? void 0
                                                    : ns.toFixed(2)
                                                ]
                                              })
                                            ]
                                          }),
                                        (ls = a == null ? void 0 : a.data) !=
                                          null && ls.calculations
                                          ? e.jsxs(e.Fragment, {
                                              children: [
                                                a.data.calculations
                                                  .providentFund > 0 &&
                                                  e.jsxs(d, {
                                                    justify: 'space-between',
                                                    children: [
                                                      e.jsx(t, {
                                                        children: 'PF'
                                                      }),
                                                      e.jsxs(t, {
                                                        fw: 600,
                                                        c: 'red',
                                                        children: [
                                                          '− ₹',
                                                          ' ',
                                                          a.data.calculations.providentFund.toFixed(
                                                            2
                                                          )
                                                        ]
                                                      })
                                                    ]
                                                  }),
                                                a.data.calculations
                                                  .professionalTax > 0 &&
                                                  e.jsxs(d, {
                                                    justify: 'space-between',
                                                    children: [
                                                      e.jsx(t, {
                                                        children:
                                                          'Professional Tax'
                                                      }),
                                                      e.jsxs(t, {
                                                        fw: 600,
                                                        c: 'red',
                                                        children: [
                                                          '− ₹',
                                                          ' ',
                                                          a.data.calculations.professionalTax.toFixed(
                                                            2
                                                          )
                                                        ]
                                                      })
                                                    ]
                                                  }),
                                                a.data.calculations.incomeTax >
                                                  0 &&
                                                  e.jsxs(d, {
                                                    justify: 'space-between',
                                                    children: [
                                                      e.jsx(t, {
                                                        children: 'Income Tax'
                                                      }),
                                                      e.jsxs(t, {
                                                        fw: 600,
                                                        c: 'red',
                                                        children: [
                                                          '− ₹',
                                                          ' ',
                                                          a.data.calculations.incomeTax.toFixed(
                                                            2
                                                          )
                                                        ]
                                                      })
                                                    ]
                                                  }),
                                                a.data.calculations
                                                  .otherDeductions > 0 &&
                                                  e.jsxs(d, {
                                                    justify: 'space-between',
                                                    children: [
                                                      e.jsx(t, {
                                                        children:
                                                          'Other Deductions'
                                                      }),
                                                      e.jsxs(t, {
                                                        fw: 600,
                                                        c: 'red',
                                                        children: [
                                                          '− ₹',
                                                          ' ',
                                                          a.data.calculations.otherDeductions.toFixed(
                                                            2
                                                          )
                                                        ]
                                                      })
                                                    ]
                                                  })
                                              ]
                                            })
                                          : null
                                      ]
                                    }),
                                  !a &&
                                    we.map((s, n) =>
                                      e.jsxs(
                                        d,
                                        {
                                          justify: 'space-between',
                                          children: [
                                            e.jsxs(t, {
                                              children: [
                                                s.label,
                                                ' (',
                                                s.type === 'deduct' ? '-' : '+',
                                                ')'
                                              ]
                                            }),
                                            e.jsxs(t, {
                                              fw: 600,
                                              c:
                                                s.type === 'deduct'
                                                  ? 'red'
                                                  : 'inherit',
                                              children: [
                                                s.type === 'deduct' ? '− ' : '',
                                                '₹',
                                                ' ',
                                                s.amount
                                              ]
                                            })
                                          ]
                                        },
                                        n
                                      )
                                    ),
                                  e.jsx(_, {
                                    p: 'md',
                                    mt: 'md',
                                    radius: 'md',
                                    style: {
                                      border: `1px dashed ${o.successColor}`,
                                      backgroundColor: Ms(o.successColor, 0.2)
                                    },
                                    children: e.jsxs(d, {
                                      justify: 'space-between',
                                      children: [
                                        e.jsx(t, {
                                          fw: 700,
                                          c: o.successColor,
                                          children: 'Net Payable'
                                        }),
                                        e.jsxs(t, {
                                          fw: 800,
                                          size: 'xl',
                                          c: o.successColor,
                                          children: [
                                            '₹',
                                            ' ',
                                            (
                                              ((cs =
                                                (rs =
                                                  a == null
                                                    ? void 0
                                                    : a.data) == null
                                                  ? void 0
                                                  : rs.calculations) == null
                                                ? void 0
                                                : cs.netPay) ?? 0
                                            ).toFixed(2)
                                          ]
                                        })
                                      ]
                                    })
                                  })
                                ]
                              })
                            })
                          ]
                        }),
                        e.jsx(le, { mt: 'xl' }),
                        e.jsxs(d, {
                          justify: 'space-between',
                          pb: 'md',
                          children: [
                            e.jsx(q, {
                              variant: 'subtle',
                              color: 'gray',
                              onClick: Se,
                              disabled: i === 3,
                              children: 'Back'
                            }),
                            e.jsx(q, {
                              type: 'submit',
                              loading: C,
                              leftSection:
                                i === 3 ? e.jsx(Xs, { size: 16 }) : null,
                              children:
                                i === 3
                                  ? 'Salary Slip Generated'
                                  : 'Download Salary Slip'
                            })
                          ]
                        })
                      ]
                    })
                  },
                  'step3'
                ),
                e.jsxs(
                  $,
                  {
                    align: 'center',
                    py: 'xl',
                    gap: 'md',
                    children: [
                      e.jsx(ea, { size: 48, color: o.successColor }),
                      e.jsx(U, {
                        order: 3,
                        c: o.successColor,
                        children: 'Salary Slip Generated'
                      }),
                      e.jsx(t, {
                        size: 'sm',
                        ta: 'center',
                        opacity: 0.8,
                        children:
                          'The salary slip has been successfully generated and downloaded.'
                      }),
                      e.jsx(q, {
                        variant: 'light',
                        onClick: () => window.location.reload(),
                        children: 'Generate Another Salary Slip'
                      })
                    ]
                  },
                  'completed'
                )
              ]
            })
          ]
        })
      ]
    });
  };
export { Qa as default };
