import { aA as o } from './index-Cn_-nzwF.js';
import { u as d } from './useMutation-bizDVTFN.js';
import {
  r as y,
  q as i,
  s as l,
  t as u,
  v as r,
  w as p,
  x as c,
  y as A,
  z as B,
  A as b,
  B as E,
  C as k,
  D,
  E as g,
  F as P,
  G as q,
  H as R,
  I as C,
  J as F,
  K as G,
  L as f,
  M as v,
  N as T,
  O as K
} from './admin-services-CTc0QqQI.js';
import { g as s } from './useAdminQueries-CeOlvTzF.js';
const h = () => {
    const t = o();
    return d({
      mutationFn: e => y(e),
      onSuccess: () => t.invalidateQueries({ queryKey: s.allEmployees })
    });
  },
  x = () => {
    const t = o();
    return d({
      mutationFn: e => i(e),
      onSuccess: () => t.invalidateQueries({ queryKey: s.allPackages })
    });
  },
  H = () => {
    const t = o();
    return d({
      mutationFn: e => l(e),
      onSuccess: (e, n) => {
        t.invalidateQueries({ queryKey: s.allEmployees });
      }
    });
  },
  M = () => {
    const t = o();
    return d({
      mutationFn: ({ id: e, data: n }) => u(e, n),
      onSuccess: (e, n) => {
        (t.invalidateQueries({ queryKey: s.allPackages }),
          t.invalidateQueries({ queryKey: s.package(n.id) }));
      }
    });
  },
  a =
    (t, e = []) =>
    () => {
      const n = o();
      return d({
        mutationFn: t,
        onSuccess: () => {
          e.forEach(m => n.invalidateQueries({ queryKey: m }));
        }
      });
    },
  _ = a(r),
  j = a(p, [s.allEmployees]),
  z = a(({ id: t, hardDelete: e }) => c(t, e), [s.allPackages]),
  I = a(A),
  J = a(B),
  L = a(b, [s.bloodGroups]),
  N = a(E, [s.employmentTypes]),
  O = a(k, [s.employeeRoles]),
  V = a(({ id: t, type: e }) => D(t, e), [s.bloodGroups]),
  W = a(({ id: t, designation: e }) => g(t, e), [s.employeeRoles]),
  X = a(({ id: t, employmentType: e }) => P(t, e), [s.employmentTypes]),
  Y = a(q, [s.employeeRoles]),
  Z = a(R, [s.bloodGroups]),
  $ = a(C, [s.employmentTypes]),
  ee = a(F, [s.feedbackAttributes]),
  te = a(({ id: t, name: e }) => G(t, e), [s.feedbackAttributes]),
  se = a(f, [s.feedbackAttributes]),
  ae = a(v, [s.departments]),
  ne = a(({ id: t, departmentName: e }) => T(t, e), [s.departments]),
  oe = a(K, [s.departments]);
export {
  H as a,
  j as b,
  _ as c,
  L as d,
  V as e,
  Z as f,
  N as g,
  X as h,
  $ as i,
  O as j,
  W as k,
  Y as l,
  x as m,
  M as n,
  z as o,
  ee as p,
  te as q,
  se as r,
  ae as s,
  ne as t,
  h as u,
  oe as v,
  J as w,
  I as x
};
