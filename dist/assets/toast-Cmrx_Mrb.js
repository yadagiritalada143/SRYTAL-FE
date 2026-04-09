import { v as a, D as s, j as r } from './index-Cn_-nzwF.js';
import { c as n } from './createReactComponent-wv-YgGrS.js';
import { I as i } from './IconCircleDashedCheck-DJMlYteh.js';
import { I as c } from './IconX-BFEQcM8f.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const d = [
    [
      'path',
      {
        d: 'M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1',
        key: 'svg-0'
      }
    ]
  ],
  h = n('filled', 'exclamation-circle-filled', 'ExclamationCircleFilled', d),
  k = () => {
    const { themeConfig: o } = a();
    return {
      showSuccessToast: (e, t = r.jsx(i, { width: 32, height: 32 })) => {
        s(e, {
          style: { color: o.color, backgroundColor: o.headerBackgroundColor },
          progressStyle: {
            background: o.button.color,
            accentColor: o.button.textColor,
            borderColor: o.borderColor
          },
          icon: t,
          closeButton: ({ closeToast: l }) =>
            r.jsx('span', {
              onClick: l,
              style: { cursor: 'pointer', display: 'flex' },
              children: r.jsx(c, { width: 20, height: 20 })
            })
        });
      },
      showErrorToast: (
        e,
        t = r.jsx(h, { width: 32, height: 32, color: 'red' })
      ) => {
        s(e, {
          style: { color: o.color, backgroundColor: o.headerBackgroundColor },
          progressStyle: {
            background: 'red',
            accentColor: 'red',
            borderColor: 'red'
          },
          icon: t,
          closeButton: r.jsx(c, {
            style: { cursor: 'pointer' },
            width: 20,
            height: 20,
            onClick: () => s.dismiss()
          })
        });
      }
    };
  };
export { k as u };
