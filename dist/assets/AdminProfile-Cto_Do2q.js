import {
  s as f,
  e as h,
  j as t,
  P as x,
  S as g,
  T as j
} from './index-Cn_-nzwF.js';
import { I as C, P as S } from './profile-BbXBjzpO.js';
import { u as y } from './useUserQueries-m-8gfZ67.js';
import { C as B } from './CommonButton-D8AVyhIy.js';
import { C as D } from './Container-3LzVKj3b.js';
import { C as P } from './Card-BOCM3d4L.js';
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
const et = () => {
  const m = f('(max-width: 768px)'),
    { data: r, isLoading: a, isError: n, error: o, refetch: p } = y(),
    d = i => {
      const e = new Date(i),
        l = e.getDate().toString().padStart(2, '0'),
        c = e.toLocaleString('en-US', { month: 'short' }),
        u = e.getFullYear();
      return `${l}-${c}-${u}`;
    },
    s = h.useMemo(
      () =>
        r ? { ...r, dateOfBirth: r.dateOfBirth ? d(r.dateOfBirth) : '' } : null,
      [r]
    );
  if (a) return t.jsx(x, {});
  if (n) {
    const i = (o == null ? void 0 : o.message) || 'Failed to load profile';
    return t.jsx(D, {
      size: m ? 'sm' : 'lg',
      py: 'xl',
      children: t.jsx(P, {
        shadow: 'sm',
        p: 'lg',
        radius: 'md',
        withBorder: !0,
        children: t.jsxs(g, {
          align: 'center',
          gap: 'md',
          children: [
            t.jsx(j, { ta: 'center', size: 'lg', c: 'red', children: i }),
            t.jsx(B, {
              leftSection: t.jsx(C, { size: 16 }),
              onClick: () => p(),
              children: 'Try Again'
            })
          ]
        })
      })
    });
  }
  return s ? t.jsx(S, { details: s }) : null;
};
export { et as default };
