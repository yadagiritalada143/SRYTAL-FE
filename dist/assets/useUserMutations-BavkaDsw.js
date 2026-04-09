import { aA as s } from './index-Cn_-nzwF.js';
import { u } from './useMutation-bizDVTFN.js';
import {
  j as r,
  k as o,
  l as d,
  m as c,
  n as y,
  p as m,
  q as C
} from './button-D3DmOMH8.js';
import { d as a } from './useUserQueries-m-8gfZ67.js';
const K = () => {
    const n = s();
    return u({
      mutationFn: e => d(e),
      onSuccess: () => {
        n.invalidateQueries({ queryKey: a.companies });
      }
    });
  },
  v = () => {
    const n = s();
    return u({
      mutationFn: ({ data: e, id: t }) => c(e, t),
      onSuccess: (e, t) => {
        (n.invalidateQueries({ queryKey: a.companies }),
          n.invalidateQueries({ queryKey: a.company(t.id) }));
      }
    });
  },
  F = () => {
    const n = s();
    return u({
      mutationFn: ({ id: e, comment: t }) => o(e, t),
      onSuccess: (e, t) => {
        n.invalidateQueries({ queryKey: a.company(t.id) });
      }
    });
  },
  S = () => {
    const n = s();
    return u({
      mutationFn: e => r(e),
      onSuccess: (e, t) => {
        n.invalidateQueries({ queryKey: a.candidate(t.id) });
      }
    });
  },
  f = () => {
    const n = s();
    return u({
      mutationFn: e => y(e),
      onSuccess: () => {
        n.invalidateQueries({ queryKey: a.candidates });
      }
    });
  },
  A = () => {
    const n = s();
    return u({
      mutationFn: e => m(e),
      onSuccess: (e, t) => {
        (n.invalidateQueries({ queryKey: a.candidates }),
          t.id && n.invalidateQueries({ queryKey: a.candidate(t.id) }));
      }
    });
  },
  B = () => {
    const n = s();
    return u({
      mutationFn: ({ name: e, description: t, image: i }) => C(e, t, i),
      onSuccess: () => {
        n.invalidateQueries({ queryKey: a.courses });
      }
    });
  };
export { F as a, v as b, f as c, S as d, A as e, B as f, K as u };
