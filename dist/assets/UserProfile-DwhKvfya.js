import {
  s as x,
  e as g,
  j as r,
  V as j,
  S as m,
  P as C,
  T as y
} from './index-Cn_-nzwF.js';
import { I as S, P as B } from './profile-BbXBjzpO.js';
import { u as D } from './useUserQueries-m-8gfZ67.js';
import { C as P } from './CommonButton-D8AVyhIy.js';
import { C as a } from './Container-3LzVKj3b.js';
import { C as w } from './Card-BOCM3d4L.js';
import './createReactComponent-wv-YgGrS.js';
import './toast-Cmrx_Mrb.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './IconX-BFEQcM8f.js';
import './useMutation-bizDVTFN.js';
import './common-services-DPGUVDMw.js';
import './api-client-CcbR4Lbf.js';
import './button-D3DmOMH8.js';
import './IconUser-BXnFItyZ.js';
import './IconUpload-C0QLgWKY.js';
import './Title-T3OvY56h.js';
import './IconUserCog-CNTxfMfa.js';
import './Badge-pr8cFvg5.js';
import './Divider-C8nnAxUa.js';
import './Grid-CH2QJG7V.js';
import './get-base-value-BKGvYumc.js';
import './IconCalendar-Cp3De190.js';
import './IconDroplet-BIln8pIB.js';
import './IconMail-BTX-Af1g.js';
import './IconPhone-BEZBDdov.js';
import './Tabs-asIDgMUj.js';
import './get-auto-contrast-value-Da6zqqWm.js';
import './create-scoped-keydown-handler-O-eo68DQ.js';
import './use-uncontrolled-C8lBt68W.js';
import './IconBriefcase-C5ZKuHUX.js';
import './IconBuildingBank-DjT6Mwz6.js';
import './useQuery-4fhBkLAX.js';
const sr = () => {
  const n = x('(max-width: 768px)'),
    { data: t, isLoading: p, isError: l, error: i, refetch: d } = D(),
    c = e => {
      if (!e) return '';
      const o = new Date(e),
        u = o.getDate().toString().padStart(2, '0'),
        f = o.toLocaleString('en-US', { month: 'short' }),
        h = o.getFullYear();
      return `${u}-${f}-${h}`;
    },
    s = g.useMemo(
      () =>
        t ? { ...t, dateOfBirth: t.dateOfBirth ? c(t.dateOfBirth) : '' } : null,
      [t]
    );
  if (p)
    return r.jsx(a, {
      size: 'xl',
      py: 'xl',
      children: r.jsx(j, {
        style: { minHeight: '60vh' },
        children: r.jsx(m, {
          align: 'center',
          gap: 'md',
          children: r.jsx(C, { label: 'Loading profile...' })
        })
      })
    });
  if (l) {
    const e = (i == null ? void 0 : i.message) || 'Failed to load profile';
    return r.jsx(a, {
      size: n ? 'sm' : 'lg',
      py: 'xl',
      children: r.jsx(w, {
        shadow: 'sm',
        p: 'lg',
        radius: 'md',
        withBorder: !0,
        children: r.jsxs(m, {
          align: 'center',
          gap: 'md',
          children: [
            r.jsx(y, { ta: 'center', size: 'lg', c: 'red', children: e }),
            r.jsx(P, {
              leftSection: r.jsx(S, { size: 16 }),
              onClick: () => d(),
              children: 'Try Again'
            })
          ]
        })
      })
    });
  }
  return s ? r.jsx(B, { details: s }) : null;
};
export { sr as default };
