const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/register-admin-CXoV6jtk.js',
      'assets/index-Cn_-nzwF.js',
      'assets/index-CJJFwIDs.css',
      'assets/zod-DC47Kjo4.js',
      'assets/super-admin-services-BvvksAUt.js',
      'assets/api-client-CcbR4Lbf.js',
      'assets/register-admin-superadmin-BB7rGhgJ.js',
      'assets/CommonButton-D8AVyhIy.js',
      'assets/IconX-BFEQcM8f.js',
      'assets/createReactComponent-wv-YgGrS.js',
      'assets/TextInput-DUPEWkCs.js',
      'assets/InputBase-CO8vJiWZ.js',
      'assets/Input-kzRYOXAd.js',
      'assets/use-input-props-CLa6mLr2.js',
      'assets/Select-KZOOD-9X.js',
      'assets/OptionsDropdown-B_GLZDf8.js',
      'assets/CheckIcon-CpIg4BN2.js',
      'assets/Popover-C5NzMGSx.js',
      'assets/get-floating-position-TyKNLeXJ.js',
      'assets/use-uncontrolled-C8lBt68W.js',
      'assets/dashboard-Cz676N0w.js',
      'assets/IconUser-BXnFItyZ.js',
      'assets/IconUsers-gx_wuuXq.js',
      'assets/employee-DJDinCQd.js',
      'assets/DataView-D_fx5Wkp.js',
      'assets/IconEdit-BA67kK5H.js',
      'assets/documents-Dtmt4039.js',
      'assets/offerletter-C11Op7FT.js',
      'assets/Textarea-CHnPFotR.js',
      'assets/use-disclosure-Dul82tkt.js'
    ])
) => i.map(i => d[i]);
import { j as e, y as o, z as t, e as s, _ as r } from './index-Cn_-nzwF.js';
const a = s.lazy(() =>
    r(
      () => import('./register-admin-CXoV6jtk.js'),
      __vite__mapDeps([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
      ])
    )
  ),
  n = s.lazy(() =>
    r(
      () => import('./dashboard-Cz676N0w.js'),
      __vite__mapDeps([20, 1, 2, 8, 9, 21, 22])
    )
  ),
  _ = s.lazy(() =>
    r(
      () => import('./employee-DJDinCQd.js'),
      __vite__mapDeps([
        23, 1, 2, 24, 7, 9, 4, 5, 3, 6, 14, 12, 15, 16, 17, 18, 19, 11, 13, 21,
        25
      ])
    )
  ),
  i = s.lazy(() =>
    r(
      () => import('./documents-Dtmt4039.js'),
      __vite__mapDeps([
        26, 1, 2, 9, 3, 27, 4, 5, 7, 28, 11, 12, 13, 10, 14, 15, 16, 17, 18, 19,
        29
      ])
    )
  ),
  d = () =>
    e.jsx(o, {
      children: e.jsxs(t, {
        path: '/dashboard',
        element: e.jsx(n, {}),
        children: [
          e.jsx(t, { path: 'register-admin', element: e.jsx(a, {}) }),
          e.jsx(t, { path: 'employees', element: e.jsx(_, {}) }),
          e.jsx(t, { path: 'documents', element: e.jsx(i, {}) })
        ]
      })
    });
export { d as default };
