import { C as r, j as t } from './index-Cn_-nzwF.js';
import { C as a } from './CommonButton-D8AVyhIy.js';
import { I as s } from './IconArrowLeft-DGaJMG-t.js';
const c = ({ id: o }) => {
  const e = r();
  return t.jsx(a, {
    className:
      'flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition',
    onClick: () => {
      (localStorage.setItem('id', o), e(-1));
    },
    children: t.jsx(s, { size: 20 })
  });
};
export { c as B };
