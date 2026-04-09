import {
  H as q,
  t as K,
  v as Q,
  I as X,
  e as r,
  C as ee,
  j as e,
  V as E,
  Z as se,
  T as n,
  G as N,
  J as R,
  D as g
} from './index-Cn_-nzwF.js';
import { P as te } from './ProgressBar-ERKS8haW.js';
import { B as le } from './BackButton-DxSiNRKG.js';
import { a as ie } from './button-D3DmOMH8.js';
import { S as oe } from './base-model-DqPjs_FM.js';
import { C as u } from './CommonButton-D8AVyhIy.js';
import { C } from './Card-BOCM3d4L.js';
import { B as c } from './Badge-pr8cFvg5.js';
import { C as re } from './Collapse-BKrzQfX6.js';
import { C as ne } from './Checkbox-Bu1dHe0r.js';
import { c as z } from './createReactComponent-wv-YgGrS.js';
import { I as ae } from './IconArrowLeft-DGaJMG-t.js';
import { I as de } from './IconArrowRight-DZ_1n8se.js';
import './styled-components.browser.esm-9s-BpxqM.js';
import './api-client-CcbR4Lbf.js';
import './get-style-object-DUJZA7T_.js';
import './get-auto-contrast-value-Da6zqqWm.js';
import './Input-kzRYOXAd.js';
import './use-uncontrolled-C8lBt68W.js';
import './CheckIcon-CpIg4BN2.js';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ce = [
    ['path', { d: 'M14 3v4a1 1 0 0 0 1 1h4', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2',
        key: 'svg-1'
      }
    ]
  ],
  y = z('outline', 'file', 'File', ce);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const me = [
    ['path', { d: 'M9 15l6 -6', key: 'svg-0' }],
    [
      'path',
      { d: 'M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464', key: 'svg-1' }
    ],
    [
      'path',
      {
        d: 'M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463',
        key: 'svg-2'
      }
    ]
  ],
  S = z('outline', 'link', 'Link', me);
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const he = [
    [
      'path',
      {
        d: 'M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4',
        key: 'svg-0'
      }
    ],
    [
      'path',
      {
        d: 'M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8',
        key: 'svg-1'
      }
    ]
  ],
  A = z('outline', 'video', 'Video', he),
  pe = q({ key: 'taskAtom', default: null }),
  $ = {
    id: '1',
    name: 'Html & CSS for Beginners',
    description: 'Learn HTML & CSS from scratch with hands-on projects',
    progress: 0,
    status: 'In Progress',
    image: '/html_css.jpg',
    duration: '3h 20m',
    sections: [
      {
        id: 'sec-1',
        title: 'Introduction',
        lessons: [
          {
            id: 'l-1',
            title: 'Welcome to the Course',
            duration: '5m',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            pdfUrl:
              'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: 'l-2',
            title: 'What is HTML?',
            duration: '8m',
            link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
          }
        ]
      },
      {
        id: 'sec-2',
        title: 'CSS Basics',
        lessons: [
          {
            id: 'l-3',
            title: 'Selectors & Properties',
            duration: '15m',
            videoUrl:
              'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
          },
          {
            id: 'l-4',
            title: 'Box Model',
            duration: '12m',
            pdfUrl:
              'https://file-examples.com/storage/fefb4c41f8a0f5d7c8a55c9/2017/10/file-sample_150kB.pdf'
          },
          { id: 'l-5', title: 'Empty Lesson', duration: '5m' }
        ]
      }
    ]
  },
  Te = () => {
    var _, T, P;
    const { taskId: m } = K(),
      { themeConfig: V, organizationConfig: W } = Q(),
      [o, I] = X(pe),
      [j, x] = r.useState(null),
      [a, f] = r.useState([]),
      [t, v] = r.useState(null),
      [F, L] = r.useState(!1),
      [d, w] = r.useState(null),
      [H, M] = r.useState(!0),
      O = ee();
    r.useEffect(() => {
      M(!0);
      const s = setTimeout(() => {
        var i, l;
        (I($),
          x(
            ((l = (i = $.sections) == null ? void 0 : i[0]) == null
              ? void 0
              : l.id) ?? null
          ),
          M(!1));
      }, 800);
      return () => clearTimeout(s);
    }, [m, I]);
    const h =
        ((_ = o == null ? void 0 : o.sections) == null
          ? void 0
          : _.flatMap(s => s.lessons.map(i => ({ ...i, sectionId: s.id })))) ??
        [],
      D = () => {
        if (d === null) return;
        const s = d - 1;
        s >= 0 && (v(h[s]), w(s));
      },
      U = () => {
        if (d === null) return;
        const s = d + 1;
        s < h.length && (v(h[s]), w(s));
      };
    (r.useEffect(() => {
      const s = localStorage.getItem(`progress-${m}`);
      s && f(JSON.parse(s));
    }, [m]),
      r.useEffect(() => {
        localStorage.setItem(`progress-${m}`, JSON.stringify(a));
      }, [a, m]));
    const J = s => {
        f(i => (i.includes(s) ? i.filter(l => l !== s) : [...i, s]));
      },
      B = () => {
        t &&
          (f(s => (s.includes(t.id) ? s : [...s, t.id])),
          g.success(`Marked lesson as completed: ${t.title}`));
      },
      G = () => {
        if (!o) return;
        const i = (
          (o.sections ?? []).flatMap(l =>
            l.lessons.map(p => ({ ...p, sectionId: l.id }))
          ) ?? []
        ).find(l => !a.includes(l.id));
        if (i) {
          x(i.sectionId);
          const l = document.getElementById(i.id);
          (l && l.scrollIntoView({ behavior: 'smooth', block: 'center' }),
            g.success(`Resuming next lesson: ${i.title}`));
        } else g.success('You have completed all lessons!');
      },
      Y = () => {
        var i;
        if (!o) return;
        const s = (o.sections ?? []).flatMap(l => l.lessons.map(p => p.id));
        (f(s),
          (i = o.sections) != null && i[0] && x(o.sections[0].id),
          g.success('All lessons marked as completed!'));
      };
    if (H)
      return e.jsx(E, {
        h: 250,
        children: e.jsx(se, {
          mt: 300,
          size: 'lg',
          type: 'bars',
          color: V.button.color
        })
      });
    if (!o)
      return e.jsx(E, {
        h: '80vh',
        children: e.jsx(n, { children: 'No task found' })
      });
    const k =
        ((T = o.sections) == null
          ? void 0
          : T.reduce((s, i) => s + i.lessons.length, 0)) || 0,
      b = Math.round((a.length / k) * 100);
    return e.jsxs('div', {
      className: 'flex flex-col gap-6 px-5 sm:px-8 lg:px-20',
      children: [
        e.jsx(le, {
          label: 'Back',
          onClick: () => O(`${ie(W.organization_name)}/dashboard/mytasks`)
        }),
        e.jsxs('div', {
          className: 'flex flex-col lg:flex-row gap-8',
          children: [
            e.jsx('div', {
              className: 'w-full lg:w-1/3 flex-shrink-0',
              children: e.jsxs(C, {
                shadow: 'md',
                radius: 'lg',
                withBorder: !0,
                p: 'lg',
                children: [
                  e.jsx('div', {
                    className: 'rounded-lg overflow-hidden',
                    children: e.jsx('img', {
                      src: o.image,
                      alt: o.name,
                      className: 'w-full h-50 object-cover'
                    })
                  }),
                  e.jsx(n, { size: 'xl', fw: 700, mt: 'md', children: o.name }),
                  e.jsx(n, {
                    size: 'sm',
                    c: 'dimmed',
                    mt: 'xs',
                    children: o.description
                  }),
                  e.jsxs('div', {
                    className: 'mt-4 flex gap-2 flex-wrap',
                    children: [
                      e.jsxs(c, {
                        variant: 'outline',
                        radius: 'sm',
                        size: 'lg',
                        color: 'gray',
                        children: [k, ' lessons']
                      }),
                      e.jsx(c, {
                        variant: 'outline',
                        radius: 'sm',
                        size: 'lg',
                        color: 'gray',
                        children: o.duration
                      })
                    ]
                  })
                ]
              })
            }),
            e.jsxs('div', {
              className: 'flex-1',
              children: [
                e.jsxs(C, {
                  shadow: 'lg',
                  radius: 'lg',
                  withBorder: !0,
                  p: 'lg',
                  className: 'bg-white',
                  children: [
                    e.jsxs('div', {
                      className: 'flex justify-between items-center mb-4',
                      children: [
                        e.jsx(n, {
                          fw: 700,
                          size: 'lg',
                          className: 'text-gray-800',
                          children: 'Course Progress'
                        }),
                        e.jsx(c, {
                          color: b === 100 ? 'green' : 'yellow',
                          size: 'lg',
                          radius: 'md',
                          variant: 'light',
                          children: b === 100 ? 'Completed' : 'In Progress'
                        })
                      ]
                    }),
                    e.jsx('div', {
                      className: 'mb-3',
                      children: e.jsx(te, { progress: b })
                    }),
                    e.jsxs(n, {
                      size: 'sm',
                      c: 'dimmed',
                      className: 'mb-4',
                      children: [a.length, ' of ', k, ' lessons completed']
                    }),
                    e.jsxs('div', {
                      className:
                        'flex flex-col sm:flex-row gap-2 sm:gap-3 w-full items-center',
                      children: [
                        e.jsx(u, {
                          color: 'teal',
                          className:
                            'shadow-sm hover:shadow-md transition text-sm sm:text-base py-2 sm:py-3 [&>span]:whitespace-normal [&>span]:leading-snug text-center w-[90%] sm:w-1/2',
                          onClick: G,
                          children: 'Resume Course'
                        }),
                        e.jsx(u, {
                          variant: 'light',
                          color: 'blue',
                          className:
                            'shadow-sm hover:shadow-md transition text-sm sm:text-base py-2 sm:py-3 [&>span]:whitespace-normal [&>span]:leading-snug text-center w-[90%] sm:w-1/2',
                          onClick: Y,
                          children: 'Mark as Completed'
                        })
                      ]
                    })
                  ]
                }),
                e.jsx('div', {
                  className: 'mt-6',
                  children:
                    (P = o.sections) == null
                      ? void 0
                      : P.map((s, i) =>
                          e.jsxs(
                            C,
                            {
                              shadow: 'xs',
                              radius: 'md',
                              withBorder: !0,
                              p: 'md',
                              className: 'mb-4 hover:shadow-lg transition-all',
                              children: [
                                e.jsxs('div', {
                                  className:
                                    'flex justify-between items-center cursor-pointer',
                                  onClick: () => x(j === s.id ? null : s.id),
                                  children: [
                                    e.jsxs(n, {
                                      fw: 600,
                                      children: [i + 1, '. ', s.title, ' ']
                                    }),
                                    e.jsxs(n, {
                                      size: 'sm',
                                      c: 'dimmed',
                                      children: [s.lessons.length, ' lessons']
                                    }),
                                    e.jsx(n, {
                                      size: 'lg',
                                      fw: 700,
                                      children: j === s.id ? '−' : '+'
                                    })
                                  ]
                                }),
                                e.jsx(re, {
                                  in: j === s.id,
                                  children: e.jsx('div', {
                                    className: 'mt-3 divide-y divide-gray-200',
                                    children: s.lessons.map(l =>
                                      e.jsxs(
                                        'div',
                                        {
                                          id: l.id,
                                          className:
                                            'flex items-center justify-between py-2 group hover:bg-gray-50 rounded-md px-2 cursor-pointer flex-wrap',
                                          onClick: () => {
                                            const p = h.findIndex(
                                              Z => Z.id === l.id
                                            );
                                            (v(l), w(p), L(!0));
                                          },
                                          children: [
                                            e.jsx(ne, {
                                              label: l.title,
                                              checked: a.includes(l.id),
                                              onChange: () => J(l.id),
                                              disabled: !(
                                                l.videoUrl ||
                                                l.pdfUrl ||
                                                l.link
                                              )
                                            }),
                                            e.jsxs(N, {
                                              gap: 'xs',
                                              className: 'text-gray-500',
                                              children: [
                                                l.videoUrl &&
                                                  e.jsxs(e.Fragment, {
                                                    children: [
                                                      e.jsx(A, { size: 18 }),
                                                      e.jsx(n, {
                                                        size: 'sm',
                                                        c: 'dimmed',
                                                        children: l.duration
                                                      })
                                                    ]
                                                  }),
                                                l.pdfUrl &&
                                                  e.jsx(y, { size: 18 }),
                                                l.link && e.jsx(S, { size: 18 })
                                              ]
                                            })
                                          ]
                                        },
                                        l.id
                                      )
                                    )
                                  })
                                })
                              ]
                            },
                            s.id
                          )
                        )
                }),
                e.jsx(oe, {
                  opened: F,
                  onClose: () => L(!1),
                  classNames: { content: 'w-[90%] sm:w-[50%] max-w-[90%]' },
                  centered: !0,
                  title: t == null ? void 0 : t.title,
                  children: e.jsx('div', {
                    className: 'overflow-y-hidden',
                    children:
                      t &&
                      e.jsxs('div', {
                        children: [
                          e.jsxs(N, {
                            mb: 'md',
                            mt: 10,
                            justify: 'space-between',
                            children: [
                              t.videoUrl &&
                                e.jsx(c, {
                                  color: 'red',
                                  leftSection: e.jsx(A, { size: 16 }),
                                  children: t.duration ?? 'Video'
                                }),
                              t.pdfUrl &&
                                e.jsx(c, {
                                  color: 'blue',
                                  leftSection: e.jsx(y, { size: 16 }),
                                  children: 'PDF'
                                }),
                              t.link &&
                                e.jsx(c, {
                                  color: 'teal',
                                  leftSection: e.jsx(S, { size: 16 }),
                                  children: 'Link'
                                })
                            ]
                          }),
                          t.videoUrl &&
                            e.jsx('div', {
                              className:
                                'mb-4 rounded-lg overflow-hidden shadow-sm',
                              children: e.jsxs('video', {
                                controls: !0,
                                className: 'w-full rounded-lg',
                                onEnded: () => {
                                  (B(), U());
                                },
                                children: [
                                  e.jsx('source', {
                                    src: t.videoUrl,
                                    type: 'video/mp4'
                                  }),
                                  'Your browser does not support video.'
                                ]
                              })
                            }),
                          t.pdfUrl &&
                            e.jsxs(R, {
                              component: 'a',
                              href: t.pdfUrl,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              variant: 'light',
                              color: 'blue',
                              radius: 'md',
                              fullWidth: !0,
                              mt: 'sm',
                              children: [
                                e.jsx(y, { size: 16, className: 'mr-2' }),
                                ' View PDF'
                              ]
                            }),
                          t.link &&
                            e.jsxs(R, {
                              component: 'a',
                              href: t.link,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              variant: 'light',
                              color: 'teal',
                              radius: 'md',
                              fullWidth: !0,
                              mt: 'sm',
                              children: [
                                e.jsx(S, { size: 16, className: 'mr-2' }),
                                ' Open Resource'
                              ]
                            }),
                          !t.videoUrl &&
                            !t.pdfUrl &&
                            !t.link &&
                            e.jsx('p', {
                              className:
                                'mt-6 text-center text-sm text-gray-500',
                              children: 'No content available for this lesson.'
                            }),
                          e.jsxs(N, {
                            mt: 'xl',
                            justify: 'space-between',
                            children: [
                              e.jsxs(u, {
                                variant: 'default',
                                onClick: D,
                                disabled: d === 0,
                                children: [
                                  e.jsx(ae, { className: 'mr-1' }),
                                  ' Previous'
                                ]
                              }),
                              (t.videoUrl || t.pdfUrl || t.link) &&
                                e.jsx(u, {
                                  color: 'teal',
                                  onClick: B,
                                  disabled: a.includes(
                                    t == null ? void 0 : t.id
                                  ),
                                  children: a.includes(
                                    t == null ? void 0 : t.id
                                  )
                                    ? 'Lesson Completed'
                                    : 'Mark Lesson Completed'
                                }),
                              e.jsxs(u, {
                                variant: 'filled',
                                color: 'blue',
                                onClick: U,
                                disabled: d === null || d === h.length - 1,
                                children: [
                                  'Next ',
                                  e.jsx(de, { className: 'ml-1' })
                                ]
                              })
                            ]
                          })
                        ]
                      })
                  })
                })
              ]
            })
          ]
        })
      ]
    });
  };
export { Te as default };
