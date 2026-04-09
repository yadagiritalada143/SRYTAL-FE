import {
  e as O,
  ad as Fd,
  u as le,
  a as Kn,
  j as p,
  B as be,
  c as Na,
  r as W,
  a1 as _d,
  a9 as Vd,
  f as qe,
  X as Wd,
  ak as ui,
  ab as Wi,
  b6 as Ud,
  g as Qn,
  $ as qd,
  b4 as Kd,
  aa as Jd,
  d as Gd,
  b7 as Oa,
  q as Bt,
  b8 as Yd,
  U as Ia,
  b9 as Xd,
  J as Qd,
  G as Zt,
  v as Zd,
  C as eh,
  s as th,
  S as wt,
  T as Be,
  a5 as nh
} from './index-Cn_-nzwF.js';
import { u as rh } from './toast-Cmrx_Mrb.js';
import { f as sh } from './useUserMutations-BavkaDsw.js';
import { C as As } from './CommonButton-D8AVyhIy.js';
import { C as ih } from './Container-3LzVKj3b.js';
import { A as en } from './ActionIcon-BBM-Tm4F.js';
import { I as oh } from './IconArrowLeft-DGaJMG-t.js';
import { T as lh } from './Title-T3OvY56h.js';
import { B as ah } from './Badge-pr8cFvg5.js';
import { D as ch } from './Divider-C8nnAxUa.js';
import { C as Ns } from './Card-BOCM3d4L.js';
import { T as Ra } from './TextInput-DUPEWkCs.js';
import { a as La, I as uh } from './Input-kzRYOXAd.js';
import { I as Da } from './InputBase-CO8vJiWZ.js';
import { u as Pa } from './use-uncontrolled-C8lBt68W.js';
import { I as dh } from './IconUpload-C0QLgWKY.js';
import { I as hh } from './Image-Ck_xSqda.js';
import { I as fh } from './IconX-BFEQcM8f.js';
import { u as ja } from './use-disclosure-Dul82tkt.js';
import { P as on } from './Popover-C5NzMGSx.js';
import { T as Ba } from './Tooltip-BnLcCD-S.js';
import { S as ph } from './SimpleGrid-B8ebT4MM.js';
import { c as xr } from './clamp-DTmYCdls.js';
import { C as mh } from './CheckIcon-CpIg4BN2.js';
import { I as gh } from './IconCheck-BwudGQvW.js';
import { c as yh } from './createReactComponent-wv-YgGrS.js';
import './IconCircleDashedCheck-DJMlYteh.js';
import './useMutation-bizDVTFN.js';
import './button-D3DmOMH8.js';
import './api-client-CcbR4Lbf.js';
import './useUserQueries-m-8gfZ67.js';
import './useQuery-4fhBkLAX.js';
import './common-services-DPGUVDMw.js';
import './use-input-props-CLa6mLr2.js';
import './get-floating-position-TyKNLeXJ.js';
import './get-style-object-DUJZA7T_.js';
import './get-base-value-BKGvYumc.js';
function za(n) {
  return { x: xr(n.x, 0, 1), y: xr(n.y, 0, 1) };
}
function $a(n, e, t = 'ltr') {
  const r = O.useRef(!1),
    s = O.useRef(!1),
    i = O.useRef(0),
    [o, l] = O.useState(!1),
    a = O.useRef(null);
  return (
    O.useEffect(() => {
      r.current = !0;
    }, []),
    {
      ref: O.useCallback(
        u => {
          if ((a.current && (a.current(), (a.current = null)), !u)) return;
          const d = ({ x: S, y: v }) => {
              (cancelAnimationFrame(i.current),
                (i.current = requestAnimationFrame(() => {
                  if (r.current && u) {
                    u.style.userSelect = 'none';
                    const T = u.getBoundingClientRect();
                    if (T.width && T.height) {
                      const w = xr((S - T.left) / T.width, 0, 1);
                      n({
                        x: t === 'ltr' ? w : 1 - w,
                        y: xr((v - T.top) / T.height, 0, 1)
                      });
                    }
                  }
                })));
            },
            h = () => {
              (document.addEventListener('mousemove', b),
                document.addEventListener('mouseup', g),
                document.addEventListener('touchmove', k, { passive: !1 }),
                document.addEventListener('touchend', g));
            },
            f = () => {
              (document.removeEventListener('mousemove', b),
                document.removeEventListener('mouseup', g),
                document.removeEventListener('touchmove', k),
                document.removeEventListener('touchend', g));
            },
            m = () => {
              !s.current &&
                r.current &&
                ((s.current = !0),
                typeof (e == null ? void 0 : e.onScrubStart) == 'function' &&
                  e.onScrubStart(),
                l(!0),
                h());
            },
            g = () => {
              s.current &&
                r.current &&
                ((s.current = !1),
                l(!1),
                f(),
                setTimeout(() => {
                  typeof (e == null ? void 0 : e.onScrubEnd) == 'function' &&
                    e.onScrubEnd();
                }, 0));
            },
            y = S => {
              (m(), S.preventDefault(), b(S));
            },
            b = S => d({ x: S.clientX, y: S.clientY }),
            x = S => {
              (S.cancelable && S.preventDefault(), m(), k(S));
            },
            k = S => {
              (S.cancelable && S.preventDefault(),
                d({
                  x: S.changedTouches[0].clientX,
                  y: S.changedTouches[0].clientY
                }));
            };
          (u.addEventListener('mousedown', y),
            u.addEventListener('touchstart', x, { passive: !1 }),
            (a.current = () => {
              (u.removeEventListener('mousedown', y),
                u.removeEventListener('touchstart', x));
            }));
        },
        [t, n]
      ),
      active: o
    }
  );
}
function bh(n) {
  return e => {
    if (!e) n(e);
    else if (typeof e == 'function') n(e);
    else if (typeof e == 'object' && 'nativeEvent' in e) {
      const { currentTarget: t } = e;
      t.type === 'checkbox' ? n(t.checked) : n(t.value);
    } else n(e);
  };
}
function xh(n) {
  const [e, t] = O.useState(n);
  return [e, bh(t)];
}
var Ha = {
  root: 'm_de3d2490',
  colorOverlay: 'm_862f3d1b',
  shadowOverlay: 'm_98ae7f22',
  alphaOverlay: 'm_95709ac0',
  childrenOverlay: 'm_93e74e3'
};
const Uo = { withShadow: !0 },
  kh = Na((n, { radius: e, size: t }) => ({
    root: { '--cs-radius': e === void 0 ? void 0 : _d(e), '--cs-size': W(t) }
  })),
  zt = Fd((n, e) => {
    const t = le('ColorSwatch', Uo, n),
      {
        classNames: r,
        className: s,
        style: i,
        styles: o,
        unstyled: l,
        vars: a,
        color: c,
        size: u,
        radius: d,
        withShadow: h,
        children: f,
        variant: m,
        attributes: g,
        ...y
      } = le('ColorSwatch', Uo, t),
      b = Kn({
        name: 'ColorSwatch',
        props: t,
        classes: Ha,
        className: s,
        style: i,
        classNames: r,
        styles: o,
        unstyled: l,
        attributes: g,
        vars: a,
        varsResolver: kh
      });
    return p.jsxs(be, {
      ref: e,
      variant: m,
      size: u,
      ...b('root', { focusable: !0 }),
      ...y,
      children: [
        p.jsx('span', { ...b('alphaOverlay') }),
        h && p.jsx('span', { ...b('shadowOverlay') }),
        p.jsx('span', {
          ...b('colorOverlay', { style: { backgroundColor: c } })
        }),
        p.jsx('span', { ...b('childrenOverlay'), children: f })
      ]
    });
  });
zt.classes = Ha;
zt.displayName = '@mantine/core/ColorSwatch';
const [Ch, Ui] = Vd(null);
var qi = {
  wrapper: 'm_fee9c77',
  preview: 'm_9dddfbac',
  body: 'm_bffecc3e',
  sliders: 'm_3283bb96',
  thumb: 'm_40d572ba',
  swatch: 'm_d8ee6fd8',
  swatches: 'm_5711e686',
  saturation: 'm_202a296e',
  saturationOverlay: 'm_11b3db02',
  slider: 'm_d856d47d',
  sliderOverlay: 'm_8f327113'
};
const Ki = O.forwardRef(({ position: n, ...e }, t) =>
  p.jsx(be, {
    ref: t,
    __vars: {
      '--thumb-y-offset': `${n.y * 100}%`,
      '--thumb-x-offset': `${n.x * 100}%`
    },
    ...e
  })
);
Ki.displayName = '@mantine/core/ColorPickerThumb';
const Ji = qe((n, e) => {
  var Jt;
  const t = le('ColorSlider', null, n),
    {
      classNames: r,
      className: s,
      style: i,
      styles: o,
      unstyled: l,
      vars: a,
      onChange: c,
      onChangeEnd: u,
      maxValue: d,
      round: h,
      size: f = 'md',
      focusable: m = !0,
      value: g,
      overlays: y,
      thumbColor: b = 'transparent',
      onScrubStart: x,
      onScrubEnd: k,
      __staticSelector: S = 'ColorPicker',
      attributes: v,
      ...T
    } = t,
    w = Kn({
      name: S,
      classes: qi,
      props: t,
      className: s,
      style: i,
      classNames: r,
      styles: o,
      unstyled: l,
      attributes: v
    }),
    P = ((Jt = Ui()) == null ? void 0 : Jt.getStyles) || w,
    V = Wd(),
    [K, J] = O.useState({ y: 0, x: g / d }),
    L = O.useRef(K),
    j = ae => (h ? Math.round(ae * d) : ae * d),
    { ref: _ } = $a(
      ({ x: ae, y: Ce }) => {
        ((L.current = { x: ae, y: Ce }), c == null || c(j(ae)));
      },
      {
        onScrubEnd: () => {
          const { x: ae } = L.current;
          (u == null || u(j(ae)), k == null || k());
        },
        onScrubStart: x
      }
    );
  ui(() => {
    J({ y: 0, x: g / d });
  }, [g]);
  const fe = (ae, Ce) => {
      ae.preventDefault();
      const Gt = za(Ce);
      (c == null || c(j(Gt.x)), u == null || u(j(Gt.x)));
    },
    Ae = ae => {
      switch (ae.key) {
        case 'ArrowRight': {
          fe(ae, { x: K.x + 0.05, y: K.y });
          break;
        }
        case 'ArrowLeft': {
          fe(ae, { x: K.x - 0.05, y: K.y });
          break;
        }
      }
    },
    je = y.map((ae, Ce) =>
      O.createElement('div', { ...P('sliderOverlay'), style: ae, key: Ce })
    );
  return p.jsxs(be, {
    ...T,
    ref: Wi(_, e),
    ...P('slider'),
    role: 'slider',
    'aria-valuenow': g,
    'aria-valuemax': d,
    'aria-valuemin': 0,
    tabIndex: m ? 0 : -1,
    onKeyDown: Ae,
    'data-focus-ring': V.focusRing,
    __vars: { '--cp-thumb-size': `var(--cp-thumb-size-${f})` },
    children: [
      je,
      p.jsx(Ki, {
        position: K,
        ...P('thumb', { style: { top: W(1), background: b } })
      })
    ]
  });
});
Ji.displayName = '@mantine/core/ColorSlider';
function Le(n, e = 0, t = 10 ** e) {
  return Math.round(t * n) / t;
}
function Sh({ h: n, s: e, l: t, a: r }) {
  const s = e * ((t < 50 ? t : 100 - t) / 100);
  return { h: n, s: s > 0 ? ((2 * s) / (t + s)) * 100 : 0, v: t + s, a: r };
}
const vh = { grad: 360 / 400, turn: 360, rad: 360 / (Math.PI * 2) };
function Mh(n, e = 'deg') {
  return Number(n) * (vh[e] || 1);
}
const wh =
  /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
function qo(n) {
  const e = wh.exec(n);
  return e
    ? Sh({
        h: Mh(e[1], e[2]),
        s: Number(e[3]),
        l: Number(e[4]),
        a: e[5] === void 0 ? 1 : Number(e[5]) / (e[6] ? 100 : 1)
      })
    : { h: 0, s: 0, v: 0, a: 1 };
}
function di({ r: n, g: e, b: t, a: r }) {
  const s = Math.max(n, e, t),
    i = s - Math.min(n, e, t),
    o = i
      ? s === n
        ? (e - t) / i
        : s === e
          ? 2 + (t - n) / i
          : 4 + (n - e) / i
      : 0;
  return {
    h: Le(60 * (o < 0 ? o + 6 : o), 3),
    s: Le(s ? (i / s) * 100 : 0, 3),
    v: Le((s / 255) * 100, 3),
    a: r
  };
}
function hi(n) {
  const e = n[0] === '#' ? n.slice(1) : n;
  return e.length === 3
    ? di({
        r: parseInt(e[0] + e[0], 16),
        g: parseInt(e[1] + e[1], 16),
        b: parseInt(e[2] + e[2], 16),
        a: 1
      })
    : di({
        r: parseInt(e.slice(0, 2), 16),
        g: parseInt(e.slice(2, 4), 16),
        b: parseInt(e.slice(4, 6), 16),
        a: 1
      });
}
function Th(n) {
  const e = n[0] === '#' ? n.slice(1) : n,
    t = o => Le(parseInt(o, 16) / 255, 3);
  if (e.length === 4) {
    const o = e.slice(0, 3),
      l = t(e[3] + e[3]);
    return { ...hi(o), a: l };
  }
  const r = e.slice(0, 6),
    s = t(e.slice(6, 8));
  return { ...hi(r), a: s };
}
const Eh =
  /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
function Ko(n) {
  const e = Eh.exec(n);
  return e
    ? di({
        r: Number(e[1]) / (e[2] ? 100 / 255 : 1),
        g: Number(e[3]) / (e[4] ? 100 / 255 : 1),
        b: Number(e[5]) / (e[6] ? 100 / 255 : 1),
        a: e[7] === void 0 ? 1 : Number(e[7]) / (e[8] ? 100 : 1)
      })
    : { h: 0, s: 0, v: 0, a: 1 };
}
const Fa = {
    hex: /^#?([0-9A-F]{3}){1,2}$/i,
    hexa: /^#?([0-9A-F]{4}){1,2}$/i,
    rgb: /^rgb\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i,
    rgba: /^rgba\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i,
    hsl: /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/i,
    hsla: /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/i
  },
  Ah = { hex: hi, hexa: Th, rgb: Ko, rgba: Ko, hsl: qo, hsla: qo };
function Nh(n) {
  for (const [, e] of Object.entries(Fa)) if (e.test(n)) return !0;
  return !1;
}
function Zn(n) {
  if (typeof n != 'string') return { h: 0, s: 0, v: 0, a: 1 };
  if (n === 'transparent') return { h: 0, s: 0, v: 0, a: 0 };
  const e = n.trim();
  for (const [t, r] of Object.entries(Fa)) if (r.test(e)) return Ah[t](e);
  return { h: 0, s: 0, v: 0, a: 1 };
}
const _a = O.forwardRef((n, e) => {
  const {
    value: t,
    onChange: r,
    onChangeEnd: s,
    color: i,
    ...o
  } = le('AlphaSlider', null, n);
  return p.jsx(Ji, {
    ...o,
    ref: e,
    value: t,
    onChange: l => (r == null ? void 0 : r(Le(l, 2))),
    onChangeEnd: l => (s == null ? void 0 : s(Le(l, 2))),
    maxValue: 1,
    round: !1,
    'data-alpha': !0,
    overlays: [
      {
        backgroundImage:
          'linear-gradient(45deg, var(--slider-checkers) 25%, transparent 25%), linear-gradient(-45deg, var(--slider-checkers) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--slider-checkers) 75%), linear-gradient(-45deg, var(--mantine-color-body) 75%, var(--slider-checkers) 75%)',
        backgroundSize: `${W(8)} ${W(8)}`,
        backgroundPosition: `0 0, 0 ${W(4)}, ${W(4)} ${W(-4)}, ${W(-4)} 0`
      },
      { backgroundImage: `linear-gradient(90deg, transparent, ${i})` },
      {
        boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${W(1)} inset, rgb(0, 0, 0, .15) 0 0 ${W(4)} inset`
      }
    ]
  });
});
_a.displayName = '@mantine/core/AlphaSlider';
function Va({ h: n, s: e, v: t, a: r }) {
  const s = (n / 360) * 6,
    i = e / 100,
    o = t / 100,
    l = Math.floor(s),
    a = o * (1 - i),
    c = o * (1 - (s - l) * i),
    u = o * (1 - (1 - s + l) * i),
    d = l % 6;
  return {
    r: Le([o, c, a, a, u, o][d] * 255),
    g: Le([u, o, o, c, a, a][d] * 255),
    b: Le([a, a, u, o, o, c][d] * 255),
    a: Le(r, 2)
  };
}
function Jo(n, e) {
  const { r: t, g: r, b: s, a: i } = Va(n);
  return e ? `rgba(${t}, ${r}, ${s}, ${Le(i, 2)})` : `rgb(${t}, ${r}, ${s})`;
}
function Go({ h: n, s: e, v: t, a: r }, s) {
  const i = ((200 - e) * t) / 100,
    o = {
      h: Math.round(n),
      s: Math.round(
        i > 0 && i < 200 ? ((e * t) / 100 / (i <= 100 ? i : 200 - i)) * 100 : 0
      ),
      l: Math.round(i / 2)
    };
  return s
    ? `hsla(${o.h}, ${o.s}%, ${o.l}%, ${Le(r, 2)})`
    : `hsl(${o.h}, ${o.s}%, ${o.l}%)`;
}
function fr(n) {
  const e = n.toString(16);
  return e.length < 2 ? `0${e}` : e;
}
function Wa(n) {
  const { r: e, g: t, b: r } = Va(n);
  return `#${fr(e)}${fr(t)}${fr(r)}`;
}
function Oh(n) {
  const e = Math.round(n.a * 255);
  return `${Wa(n)}${fr(e)}`;
}
const Os = {
  hex: Wa,
  hexa: n => Oh(n),
  rgb: n => Jo(n, !1),
  rgba: n => Jo(n, !0),
  hsl: n => Go(n, !1),
  hsla: n => Go(n, !0)
};
function it(n, e) {
  return e ? (n in Os ? Os[n](e) : Os.hex(e)) : '#000000';
}
const Ua = O.forwardRef((n, e) => {
  const {
    value: t,
    onChange: r,
    onChangeEnd: s,
    color: i,
    ...o
  } = le('HueSlider', {}, n);
  return p.jsx(Ji, {
    ...o,
    ref: e,
    value: t,
    onChange: r,
    onChangeEnd: s,
    maxValue: 360,
    thumbColor: `hsl(${t}, 100%, 50%)`,
    round: !0,
    'data-hue': !0,
    overlays: [
      {
        backgroundImage:
          'linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(170,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))'
      },
      {
        boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${W(1)} inset, rgb(0, 0, 0, .15) 0 0 ${W(4)} inset`
      }
    ]
  });
});
Ua.displayName = '@mantine/core/HueSlider';
function qa({
  className: n,
  onChange: e,
  onChangeEnd: t,
  value: r,
  saturationLabel: s,
  focusable: i = !0,
  size: o,
  color: l,
  onScrubStart: a,
  onScrubEnd: c,
  ...u
}) {
  const { getStyles: d } = Ui(),
    [h, f] = O.useState({ x: r.s / 100, y: 1 - r.v / 100 }),
    m = O.useRef(h),
    { ref: g } = $a(
      ({ x, y: k }) => {
        ((m.current = { x, y: k }),
          e({ s: Math.round(x * 100), v: Math.round((1 - k) * 100) }));
      },
      {
        onScrubEnd: () => {
          const { x, y: k } = m.current;
          (t({ s: Math.round(x * 100), v: Math.round((1 - k) * 100) }),
            c == null || c());
        },
        onScrubStart: a
      }
    );
  O.useEffect(() => {
    f({ x: r.s / 100, y: 1 - r.v / 100 });
  }, [r.s, r.v]);
  const y = (x, k) => {
      x.preventDefault();
      const S = za(k);
      (e({ s: Math.round(S.x * 100), v: Math.round((1 - S.y) * 100) }),
        t({ s: Math.round(S.x * 100), v: Math.round((1 - S.y) * 100) }));
    },
    b = x => {
      switch (x.key) {
        case 'ArrowUp': {
          y(x, { y: h.y - 0.05, x: h.x });
          break;
        }
        case 'ArrowDown': {
          y(x, { y: h.y + 0.05, x: h.x });
          break;
        }
        case 'ArrowRight': {
          y(x, { x: h.x + 0.05, y: h.y });
          break;
        }
        case 'ArrowLeft': {
          y(x, { x: h.x - 0.05, y: h.y });
          break;
        }
      }
    };
  return p.jsxs(be, {
    ...d('saturation'),
    ref: g,
    ...u,
    role: 'slider',
    'aria-label': s,
    'aria-valuenow': h.x,
    'aria-valuetext': it('rgba', r),
    tabIndex: i ? 0 : -1,
    onKeyDown: b,
    children: [
      p.jsx('div', {
        ...d('saturationOverlay', {
          style: { backgroundColor: `hsl(${r.h}, 100%, 50%)` }
        })
      }),
      p.jsx('div', {
        ...d('saturationOverlay', {
          style: {
            backgroundImage: 'linear-gradient(90deg, #fff, transparent)'
          }
        })
      }),
      p.jsx('div', {
        ...d('saturationOverlay', {
          style: { backgroundImage: 'linear-gradient(0deg, #000, transparent)' }
        })
      }),
      p.jsx(Ki, {
        position: h,
        ...d('thumb', { style: { backgroundColor: l } })
      })
    ]
  });
}
qa.displayName = '@mantine/core/Saturation';
const Ka = O.forwardRef(
  (
    {
      className: n,
      datatype: e,
      setValue: t,
      onChangeEnd: r,
      size: s,
      focusable: i,
      data: o,
      swatchesPerRow: l,
      value: a,
      ...c
    },
    u
  ) => {
    const d = Ui(),
      h = o.map((f, m) =>
        O.createElement(
          zt,
          {
            ...d.getStyles('swatch'),
            unstyled: d.unstyled,
            component: 'button',
            type: 'button',
            color: f,
            key: m,
            radius: 'sm',
            onClick: () => {
              (t(f), r == null || r(f));
            },
            'aria-label': f,
            tabIndex: i ? 0 : -1,
            'data-swatch': !0
          },
          a === f &&
            p.jsx(mh, { size: '35%', color: Ud(f) < 0.5 ? 'white' : 'black' })
        )
      );
    return p.jsx(be, { ...d.getStyles('swatches'), ref: u, ...c, children: h });
  }
);
Ka.displayName = '@mantine/core/Swatches';
const Ih = {
    swatchesPerRow: 7,
    withPicker: !0,
    focusable: !0,
    size: 'md',
    __staticSelector: 'ColorPicker'
  },
  Rh = Na((n, { size: e, swatchesPerRow: t }) => ({
    wrapper: {
      '--cp-preview-size': Qn(e, 'cp-preview-size'),
      '--cp-width': Qn(e, 'cp-width'),
      '--cp-body-spacing': qd(e),
      '--cp-swatch-size': `${100 / t}%`,
      '--cp-thumb-size': Qn(e, 'cp-thumb-size'),
      '--cp-saturation-height': Qn(e, 'cp-saturation-height')
    }
  })),
  Gi = qe((n, e) => {
    const t = le('ColorPicker', Ih, n),
      {
        classNames: r,
        className: s,
        style: i,
        styles: o,
        unstyled: l,
        vars: a,
        format: c = 'hex',
        value: u,
        defaultValue: d,
        onChange: h,
        onChangeEnd: f,
        withPicker: m,
        size: g,
        saturationLabel: y,
        hueLabel: b,
        alphaLabel: x,
        focusable: k,
        swatches: S,
        swatchesPerRow: v,
        fullWidth: T,
        onColorSwatchClick: w,
        __staticSelector: R,
        mod: P,
        attributes: V,
        ...K
      } = t,
      J = Kn({
        name: R,
        props: t,
        classes: qi,
        className: s,
        style: i,
        classNames: r,
        styles: o,
        unstyled: l,
        attributes: V,
        rootSelector: 'wrapper',
        vars: a,
        varsResolver: Rh
      }),
      L = O.useRef(c || 'hex'),
      j = O.useRef(''),
      _ = O.useRef(-1),
      fe = O.useRef(!1),
      Ae = c === 'hexa' || c === 'rgba' || c === 'hsla',
      [je, Jt, ae] = Pa({
        value: u,
        defaultValue: d,
        finalValue: '#FFFFFF',
        onChange: h
      }),
      [Ce, Gt] = O.useState(Zn(je)),
      ws = () => {
        (window.clearTimeout(_.current), (fe.current = !0));
      },
      Ts = () => {
        (window.clearTimeout(_.current),
          (_.current = window.setTimeout(() => {
            fe.current = !1;
          }, 200)));
      },
      Es = Se => {
        (Gt(Yt => {
          const Wo = { ...Yt, ...Se };
          return ((j.current = it(L.current, Wo)), Wo);
        }),
          Jt(j.current));
      };
    return (
      ui(() => {
        typeof u == 'string' && Nh(u) && !fe.current && Gt(Zn(u));
      }, [u]),
      ui(() => {
        ((L.current = c || 'hex'), Jt(it(L.current, Ce)));
      }, [c]),
      p.jsx(Ch, {
        value: { getStyles: J, unstyled: l },
        children: p.jsxs(be, {
          ref: e,
          ...J('wrapper'),
          size: g,
          mod: [{ 'full-width': T }, P],
          ...K,
          children: [
            m &&
              p.jsxs(p.Fragment, {
                children: [
                  p.jsx(qa, {
                    value: Ce,
                    onChange: Es,
                    onChangeEnd: ({ s: Se, v: Yt }) =>
                      f == null
                        ? void 0
                        : f(it(L.current, { ...Ce, s: Se, v: Yt })),
                    color: je,
                    size: g,
                    focusable: k,
                    saturationLabel: y,
                    onScrubStart: ws,
                    onScrubEnd: Ts
                  }),
                  p.jsxs('div', {
                    ...J('body'),
                    children: [
                      p.jsxs('div', {
                        ...J('sliders'),
                        children: [
                          p.jsx(Ua, {
                            value: Ce.h,
                            onChange: Se => Es({ h: Se }),
                            onChangeEnd: Se =>
                              f == null
                                ? void 0
                                : f(it(L.current, { ...Ce, h: Se })),
                            size: g,
                            focusable: k,
                            'aria-label': b,
                            onScrubStart: ws,
                            onScrubEnd: Ts
                          }),
                          Ae &&
                            p.jsx(_a, {
                              value: Ce.a,
                              onChange: Se => Es({ a: Se }),
                              onChangeEnd: Se => {
                                f == null || f(it(L.current, { ...Ce, a: Se }));
                              },
                              size: g,
                              color: it('hex', Ce),
                              focusable: k,
                              'aria-label': x,
                              onScrubStart: ws,
                              onScrubEnd: Ts
                            })
                        ]
                      }),
                      Ae &&
                        p.jsx(zt, {
                          color: je,
                          radius: 'sm',
                          size: 'var(--cp-preview-size)',
                          ...J('preview')
                        })
                    ]
                  })
                ]
              }),
            Array.isArray(S) &&
              p.jsx(Ka, {
                data: S,
                swatchesPerRow: v,
                focusable: k,
                setValue: Jt,
                value: je,
                onChangeEnd: Se => {
                  const Yt = it(c, Zn(Se));
                  (w == null || w(Yt), f == null || f(Yt), ae || Gt(Zn(Se)));
                }
              })
          ]
        })
      })
    );
  });
Gi.classes = qi;
Gi.displayName = '@mantine/core/ColorPicker';
const Lh = { multiple: !1 },
  Ja = O.forwardRef((n, e) => {
    const {
        onChange: t,
        children: r,
        multiple: s,
        accept: i,
        name: o,
        form: l,
        resetRef: a,
        disabled: c,
        capture: u,
        inputProps: d,
        ...h
      } = le('FileButton', Lh, n),
      f = O.useRef(null),
      m = () => {
        var b;
        !c && ((b = f.current) == null || b.click());
      },
      g = b => {
        if (b.currentTarget.files === null) return t(s ? [] : null);
        t(
          s
            ? Array.from(b.currentTarget.files)
            : b.currentTarget.files[0] || null
        );
      };
    return (
      Kd(a, () => {
        f.current && (f.current.value = '');
      }),
      p.jsxs(p.Fragment, {
        children: [
          p.jsx('input', {
            style: { display: 'none' },
            type: 'file',
            accept: i,
            multiple: s,
            onChange: g,
            ref: Wi(e, f),
            name: o,
            form: l,
            capture: u,
            ...d
          }),
          r({ onClick: m, ...h })
        ]
      })
    );
  });
Ja.displayName = '@mantine/core/FileButton';
const Dh = ({ value: n }) =>
    p.jsx('div', {
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      children: Array.isArray(n)
        ? n.map(e => e.name).join(', ')
        : n == null
          ? void 0
          : n.name
    }),
  Ph = { valueComponent: Dh, size: 'sm' },
  Yi = qe((n, e) => {
    const t = le('FileInput', Ph, n),
      {
        unstyled: r,
        vars: s,
        onChange: i,
        value: o,
        defaultValue: l,
        multiple: a,
        accept: c,
        name: u,
        form: d,
        valueComponent: h,
        clearable: f,
        clearButtonProps: m,
        readOnly: g,
        capture: y,
        fileInputProps: b,
        rightSection: x,
        size: k,
        placeholder: S,
        component: v,
        resetRef: T,
        classNames: w,
        styles: R,
        attributes: P,
        ...V
      } = t,
      K = O.useRef(null),
      { resolvedClassNames: J, resolvedStyles: L } = La({
        classNames: w,
        styles: R,
        props: t
      }),
      [j, _] = Pa({
        value: o,
        defaultValue: l,
        onChange: i,
        finalValue: a ? [] : null
      }),
      fe = Array.isArray(j) ? j.length !== 0 : j !== null,
      Ae =
        x ||
        (f && fe && !g
          ? p.jsx(Jd, {
              ...m,
              variant: 'subtle',
              onClick: () => _(a ? [] : null),
              size: k,
              unstyled: r
            })
          : null);
    return (
      O.useEffect(() => {
        var je;
        ((Array.isArray(j) && j.length === 0) || j === null) &&
          ((je = K.current) == null || je.call(K));
      }, [j]),
      p.jsx(Ja, {
        onChange: _,
        multiple: a,
        accept: c,
        name: u,
        form: d,
        resetRef: Wi(K, T),
        disabled: g,
        capture: y,
        inputProps: b,
        children: je =>
          p.jsx(Da, {
            component: v || 'button',
            ref: e,
            rightSection: Ae,
            ...je,
            ...V,
            __staticSelector: 'FileInput',
            multiline: !0,
            type: 'button',
            pointer: !0,
            __stylesApiProps: t,
            unstyled: r,
            size: k,
            classNames: w,
            styles: R,
            attributes: P,
            children: fe
              ? p.jsx(h, { value: j })
              : p.jsx(uh.Placeholder, {
                  __staticSelector: 'FileInput',
                  classNames: J,
                  styles: L,
                  attributes: P,
                  children: S
                })
          })
      })
    );
  });
Yi.classes = Da.classes;
Yi.displayName = '@mantine/core/FileInput';
const jh = Yi;
var Ga = { root: 'm_d08caa0' };
const Xi = qe((n, e) => {
  const t = le('Typography', null, n),
    {
      classNames: r,
      className: s,
      style: i,
      styles: o,
      unstyled: l,
      attributes: a,
      ...c
    } = t,
    u = Kn({
      name: 'Typography',
      classes: Ga,
      props: t,
      className: s,
      style: i,
      classNames: r,
      styles: o,
      unstyled: l,
      attributes: a
    });
  return p.jsx(be, { ref: e, ...u('root'), ...c });
});
Xi.classes = Ga;
Xi.displayName = '@mantine/core/Typography';
/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Bh = [
    ['path', { d: 'M15 8h.01', key: 'svg-0' }],
    [
      'path',
      {
        d: 'M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12',
        key: 'svg-1'
      }
    ],
    ['path', { d: 'M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5', key: 'svg-2' }],
    ['path', { d: 'M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3', key: 'svg-3' }]
  ],
  zh = yh('outline', 'photo', 'Photo', Bh);
function ce(n) {
  this.content = n;
}
ce.prototype = {
  constructor: ce,
  find: function (n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  get: function (n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  update: function (n, e, t) {
    var r = t && t != n ? this.remove(t) : this,
      s = r.find(n),
      i = r.content.slice();
    return (
      s == -1 ? i.push(t || n, e) : ((i[s + 1] = e), t && (i[s] = t)),
      new ce(i)
    );
  },
  remove: function (n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return (t.splice(e, 2), new ce(t));
  },
  addToStart: function (n, e) {
    return new ce([n, e].concat(this.remove(n).content));
  },
  addToEnd: function (n, e) {
    var t = this.remove(n).content.slice();
    return (t.push(n, e), new ce(t));
  },
  addBefore: function (n, e, t) {
    var r = this.remove(e),
      s = r.content.slice(),
      i = r.find(n);
    return (s.splice(i == -1 ? s.length : i, 0, e, t), new ce(s));
  },
  forEach: function (n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  prepend: function (n) {
    return (
      (n = ce.from(n)),
      n.size ? new ce(n.content.concat(this.subtract(n).content)) : this
    );
  },
  append: function (n) {
    return (
      (n = ce.from(n)),
      n.size ? new ce(this.subtract(n).content.concat(n.content)) : this
    );
  },
  subtract: function (n) {
    var e = this;
    n = ce.from(n);
    for (var t = 0; t < n.content.length; t += 2) e = e.remove(n.content[t]);
    return e;
  },
  toObject: function () {
    var n = {};
    return (
      this.forEach(function (e, t) {
        n[e] = t;
      }),
      n
    );
  },
  get size() {
    return this.content.length >> 1;
  }
};
ce.from = function (n) {
  if (n instanceof ce) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new ce(e);
};
function Ya(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let s = n.child(r),
      i = e.child(r);
    if (s == i) {
      t += s.nodeSize;
      continue;
    }
    if (!s.sameMarkup(i)) return t;
    if (s.isText && s.text != i.text) {
      for (let o = 0; s.text[o] == i.text[o]; o++) t++;
      return t;
    }
    if (s.content.size || i.content.size) {
      let o = Ya(s.content, i.content, t + 1);
      if (o != null) return o;
    }
    t += s.nodeSize;
  }
}
function Xa(n, e, t, r) {
  for (let s = n.childCount, i = e.childCount; ; ) {
    if (s == 0 || i == 0) return s == i ? null : { a: t, b: r };
    let o = n.child(--s),
      l = e.child(--i),
      a = o.nodeSize;
    if (o == l) {
      ((t -= a), (r -= a));
      continue;
    }
    if (!o.sameMarkup(l)) return { a: t, b: r };
    if (o.isText && o.text != l.text) {
      let c = 0,
        u = Math.min(o.text.length, l.text.length);
      for (
        ;
        c < u && o.text[o.text.length - c - 1] == l.text[l.text.length - c - 1];
      )
        (c++, t--, r--);
      return { a: t, b: r };
    }
    if (o.content.size || l.content.size) {
      let c = Xa(o.content, l.content, t - 1, r - 1);
      if (c) return c;
    }
    ((t -= a), (r -= a));
  }
}
class C {
  constructor(e, t) {
    if (((this.content = e), (this.size = t || 0), t == null))
      for (let r = 0; r < e.length; r++) this.size += e[r].nodeSize;
  }
  nodesBetween(e, t, r, s = 0, i) {
    for (let o = 0, l = 0; l < t; o++) {
      let a = this.content[o],
        c = l + a.nodeSize;
      if (c > e && r(a, s + l, i || null, o) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(
          Math.max(0, e - u),
          Math.min(a.content.size, t - u),
          r,
          s + u
        );
      }
      l = c;
    }
  }
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  textBetween(e, t, r, s) {
    let i = '',
      o = !0;
    return (
      this.nodesBetween(
        e,
        t,
        (l, a) => {
          let c = l.isText
            ? l.text.slice(Math.max(e, a) - a, t - a)
            : l.isLeaf
              ? s
                ? typeof s == 'function'
                  ? s(l)
                  : s
                : l.type.spec.leafText
                  ? l.type.spec.leafText(l)
                  : ''
              : '';
          (l.isBlock &&
            ((l.isLeaf && c) || l.isTextblock) &&
            r &&
            (o ? (o = !1) : (i += r)),
            (i += c));
        },
        0
      ),
      i
    );
  }
  append(e) {
    if (!e.size) return this;
    if (!this.size) return e;
    let t = this.lastChild,
      r = e.firstChild,
      s = this.content.slice(),
      i = 0;
    for (
      t.isText &&
      t.sameMarkup(r) &&
      ((s[s.length - 1] = t.withText(t.text + r.text)), (i = 1));
      i < e.content.length;
      i++
    )
      s.push(e.content[i]);
    return new C(s, this.size + e.size);
  }
  cut(e, t = this.size) {
    if (e == 0 && t == this.size) return this;
    let r = [],
      s = 0;
    if (t > e)
      for (let i = 0, o = 0; o < t; i++) {
        let l = this.content[i],
          a = o + l.nodeSize;
        (a > e &&
          ((o < e || a > t) &&
            (l.isText
              ? (l = l.cut(Math.max(0, e - o), Math.min(l.text.length, t - o)))
              : (l = l.cut(
                  Math.max(0, e - o - 1),
                  Math.min(l.content.size, t - o - 1)
                ))),
          r.push(l),
          (s += l.nodeSize)),
          (o = a));
      }
    return new C(r, s);
  }
  cutByIndex(e, t) {
    return e == t
      ? C.empty
      : e == 0 && t == this.content.length
        ? this
        : new C(this.content.slice(e, t));
  }
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t) return this;
    let s = this.content.slice(),
      i = this.size + t.nodeSize - r.nodeSize;
    return ((s[e] = t), new C(s, i));
  }
  addToStart(e) {
    return new C([e].concat(this.content), this.size + e.nodeSize);
  }
  addToEnd(e) {
    return new C(this.content.concat(e), this.size + e.nodeSize);
  }
  eq(e) {
    if (this.content.length != e.content.length) return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t])) return !1;
    return !0;
  }
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  get childCount() {
    return this.content.length;
  }
  child(e) {
    let t = this.content[e];
    if (!t) throw new RangeError('Index ' + e + ' out of range for ' + this);
    return t;
  }
  maybeChild(e) {
    return this.content[e] || null;
  }
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let s = this.content[t];
      (e(s, r, t), (r += s.nodeSize));
    }
  }
  findDiffStart(e, t = 0) {
    return Ya(this, e, t);
  }
  findDiffEnd(e, t = this.size, r = e.size) {
    return Xa(this, e, t, r);
  }
  findIndex(e) {
    if (e == 0) return er(0, e);
    if (e == this.size) return er(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let s = this.child(t),
        i = r + s.nodeSize;
      if (i >= e) return i == e ? er(t + 1, i) : er(t, r);
      r = i;
    }
  }
  toString() {
    return '<' + this.toStringInner() + '>';
  }
  toStringInner() {
    return this.content.join(', ');
  }
  toJSON() {
    return this.content.length ? this.content.map(e => e.toJSON()) : null;
  }
  static fromJSON(e, t) {
    if (!t) return C.empty;
    if (!Array.isArray(t))
      throw new RangeError('Invalid input for Fragment.fromJSON');
    return new C(t.map(e.nodeFromJSON));
  }
  static fromArray(e) {
    if (!e.length) return C.empty;
    let t,
      r = 0;
    for (let s = 0; s < e.length; s++) {
      let i = e[s];
      ((r += i.nodeSize),
        s && i.isText && e[s - 1].sameMarkup(i)
          ? (t || (t = e.slice(0, s)),
            (t[t.length - 1] = i.withText(t[t.length - 1].text + i.text)))
          : t && t.push(i));
    }
    return new C(t || e, r);
  }
  static from(e) {
    if (!e) return C.empty;
    if (e instanceof C) return e;
    if (Array.isArray(e)) return this.fromArray(e);
    if (e.attrs) return new C([e], e.nodeSize);
    throw new RangeError(
      'Can not convert ' +
        e +
        ' to a Fragment' +
        (e.nodesBetween
          ? ' (looks like multiple versions of prosemirror-model were loaded)'
          : '')
    );
  }
}
C.empty = new C([], 0);
const Is = { index: 0, offset: 0 };
function er(n, e) {
  return ((Is.index = n), (Is.offset = e), Is);
}
function kr(n, e) {
  if (n === e) return !0;
  if (!(n && typeof n == 'object') || !(e && typeof e == 'object')) return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t) return !1;
  if (t) {
    if (n.length != e.length) return !1;
    for (let r = 0; r < n.length; r++) if (!kr(n[r], e[r])) return !1;
  } else {
    for (let r in n) if (!(r in e) || !kr(n[r], e[r])) return !1;
    for (let r in e) if (!(r in n)) return !1;
  }
  return !0;
}
let U = class fi {
  constructor(e, t) {
    ((this.type = e), (this.attrs = t));
  }
  addToSet(e) {
    let t,
      r = !1;
    for (let s = 0; s < e.length; s++) {
      let i = e[s];
      if (this.eq(i)) return e;
      if (this.type.excludes(i.type)) t || (t = e.slice(0, s));
      else {
        if (i.type.excludes(this.type)) return e;
        (!r &&
          i.type.rank > this.type.rank &&
          (t || (t = e.slice(0, s)), t.push(this), (r = !0)),
          t && t.push(i));
      }
    }
    return (t || (t = e.slice()), r || t.push(this), t);
  }
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t])) return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  isInSet(e) {
    for (let t = 0; t < e.length; t++) if (this.eq(e[t])) return !0;
    return !1;
  }
  eq(e) {
    return this == e || (this.type == e.type && kr(this.attrs, e.attrs));
  }
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  static fromJSON(e, t) {
    if (!t) throw new RangeError('Invalid input for Mark.fromJSON');
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let s = r.create(t.attrs);
    return (r.checkAttrs(s.attrs), s);
  }
  static sameSet(e, t) {
    if (e == t) return !0;
    if (e.length != t.length) return !1;
    for (let r = 0; r < e.length; r++) if (!e[r].eq(t[r])) return !1;
    return !0;
  }
  static setFrom(e) {
    if (!e || (Array.isArray(e) && e.length == 0)) return fi.none;
    if (e instanceof fi) return [e];
    let t = e.slice();
    return (t.sort((r, s) => r.type.rank - s.type.rank), t);
  }
};
U.none = [];
class Cr extends Error {}
class A {
  constructor(e, t, r) {
    ((this.content = e), (this.openStart = t), (this.openEnd = r));
  }
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  insertAt(e, t) {
    let r = Za(this.content, e + this.openStart, t);
    return r && new A(r, this.openStart, this.openEnd);
  }
  removeBetween(e, t) {
    return new A(
      Qa(this.content, e + this.openStart, t + this.openStart),
      this.openStart,
      this.openEnd
    );
  }
  eq(e) {
    return (
      this.content.eq(e.content) &&
      this.openStart == e.openStart &&
      this.openEnd == e.openEnd
    );
  }
  toString() {
    return this.content + '(' + this.openStart + ',' + this.openEnd + ')';
  }
  toJSON() {
    if (!this.content.size) return null;
    let e = { content: this.content.toJSON() };
    return (
      this.openStart > 0 && (e.openStart = this.openStart),
      this.openEnd > 0 && (e.openEnd = this.openEnd),
      e
    );
  }
  static fromJSON(e, t) {
    if (!t) return A.empty;
    let r = t.openStart || 0,
      s = t.openEnd || 0;
    if (typeof r != 'number' || typeof s != 'number')
      throw new RangeError('Invalid input for Slice.fromJSON');
    return new A(C.fromJSON(e, t.content), r, s);
  }
  static maxOpen(e, t = !0) {
    let r = 0,
      s = 0;
    for (
      let i = e.firstChild;
      i && !i.isLeaf && (t || !i.type.spec.isolating);
      i = i.firstChild
    )
      r++;
    for (
      let i = e.lastChild;
      i && !i.isLeaf && (t || !i.type.spec.isolating);
      i = i.lastChild
    )
      s++;
    return new A(e, r, s);
  }
}
A.empty = new A(C.empty, 0, 0);
function Qa(n, e, t) {
  let { index: r, offset: s } = n.findIndex(e),
    i = n.maybeChild(r),
    { index: o, offset: l } = n.findIndex(t);
  if (s == e || i.isText) {
    if (l != t && !n.child(o).isText)
      throw new RangeError('Removing non-flat range');
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != o) throw new RangeError('Removing non-flat range');
  return n.replaceChild(r, i.copy(Qa(i.content, e - s - 1, t - s - 1)));
}
function Za(n, e, t, r) {
  let { index: s, offset: i } = n.findIndex(e),
    o = n.maybeChild(s);
  if (i == e || o.isText)
    return r && !r.canReplace(s, s, t)
      ? null
      : n.cut(0, e).append(t).append(n.cut(e));
  let l = Za(o.content, e - i - 1, t, o);
  return l && n.replaceChild(s, o.copy(l));
}
function $h(n, e, t) {
  if (t.openStart > n.depth)
    throw new Cr('Inserted content deeper than insertion position');
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Cr('Inconsistent open depths');
  return ec(n, e, t, 0);
}
function ec(n, e, t, r) {
  let s = n.index(r),
    i = n.node(r);
  if (s == e.index(r) && r < n.depth - t.openStart) {
    let o = ec(n, e, t, r + 1);
    return i.copy(i.content.replaceChild(s, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let o = n.parent,
        l = o.content;
      return Lt(
        o,
        l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset))
      );
    } else {
      let { start: o, end: l } = Hh(t, n);
      return Lt(i, nc(n, o, l, e, r));
    }
  else return Lt(i, Sr(n, e, r));
}
function tc(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Cr('Cannot join ' + e.type.name + ' onto ' + n.type.name);
}
function pi(n, e, t) {
  let r = n.node(t);
  return (tc(r, e.node(t)), r);
}
function Rt(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t])
    ? (e[t] = n.withText(e[t].text + n.text))
    : e.push(n);
}
function wn(n, e, t, r) {
  let s = (e || n).node(t),
    i = 0,
    o = e ? e.index(t) : s.childCount;
  n &&
    ((i = n.index(t)),
    n.depth > t ? i++ : n.textOffset && (Rt(n.nodeAfter, r), i++));
  for (let l = i; l < o; l++) Rt(s.child(l), r);
  e && e.depth == t && e.textOffset && Rt(e.nodeBefore, r);
}
function Lt(n, e) {
  return (n.type.checkContent(e), n.copy(e));
}
function nc(n, e, t, r, s) {
  let i = n.depth > s && pi(n, e, s + 1),
    o = r.depth > s && pi(t, r, s + 1),
    l = [];
  return (
    wn(null, n, s, l),
    i && o && e.index(s) == t.index(s)
      ? (tc(i, o), Rt(Lt(i, nc(n, e, t, r, s + 1)), l))
      : (i && Rt(Lt(i, Sr(n, e, s + 1)), l),
        wn(e, t, s, l),
        o && Rt(Lt(o, Sr(t, r, s + 1)), l)),
    wn(r, null, s, l),
    new C(l)
  );
}
function Sr(n, e, t) {
  let r = [];
  if ((wn(null, n, t, r), n.depth > t)) {
    let s = pi(n, e, t + 1);
    Rt(Lt(s, Sr(n, e, t + 1)), r);
  }
  return (wn(e, null, t, r), new C(r));
}
function Hh(n, e) {
  let t = e.depth - n.openStart,
    s = e.node(t).copy(n.content);
  for (let i = t - 1; i >= 0; i--) s = e.node(i).copy(C.from(s));
  return {
    start: s.resolveNoCache(n.openStart + t),
    end: s.resolveNoCache(s.content.size - n.openEnd - t)
  };
}
class jn {
  constructor(e, t, r) {
    ((this.pos = e),
      (this.path = t),
      (this.parentOffset = r),
      (this.depth = t.length / 3 - 1));
  }
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  get parent() {
    return this.node(this.depth);
  }
  get doc() {
    return this.node(0);
  }
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  indexAfter(e) {
    return (
      (e = this.resolveDepth(e)),
      this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1)
    );
  }
  start(e) {
    return ((e = this.resolveDepth(e)), e == 0 ? 0 : this.path[e * 3 - 1] + 1);
  }
  end(e) {
    return (
      (e = this.resolveDepth(e)),
      this.start(e) + this.node(e).content.size
    );
  }
  before(e) {
    if (((e = this.resolveDepth(e)), !e))
      throw new RangeError('There is no position before the top-level node');
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  after(e) {
    if (((e = this.resolveDepth(e)), !e))
      throw new RangeError('There is no position after the top-level node');
    return e == this.depth + 1
      ? this.pos
      : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  get nodeAfter() {
    let e = this.parent,
      t = this.index(this.depth);
    if (t == e.childCount) return null;
    let r = this.pos - this.path[this.path.length - 1],
      s = e.child(t);
    return r ? e.child(t).cut(r) : s;
  }
  get nodeBefore() {
    let e = this.index(this.depth),
      t = this.pos - this.path[this.path.length - 1];
    return t
      ? this.parent.child(e).cut(0, t)
      : e == 0
        ? null
        : this.parent.child(e - 1);
  }
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3],
      s = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let i = 0; i < e; i++) s += r.child(i).nodeSize;
    return s;
  }
  marks() {
    let e = this.parent,
      t = this.index();
    if (e.content.size == 0) return U.none;
    if (this.textOffset) return e.child(t).marks;
    let r = e.maybeChild(t - 1),
      s = e.maybeChild(t);
    if (!r) {
      let l = r;
      ((r = s), (s = l));
    }
    let i = r.marks;
    for (var o = 0; o < i.length; o++)
      i[o].type.spec.inclusive === !1 &&
        (!s || !i[o].isInSet(s.marks)) &&
        (i = i[o--].removeFromSet(i));
    return i;
  }
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline) return null;
    let r = t.marks,
      s = e.parent.maybeChild(e.index());
    for (var i = 0; i < r.length; i++)
      r[i].type.spec.inclusive === !1 &&
        (!s || !r[i].isInSet(s.marks)) &&
        (r = r[i--].removeFromSet(r));
    return r;
  }
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e) return t;
    return 0;
  }
  blockRange(e = this, t) {
    if (e.pos < this.pos) return e.blockRange(this);
    for (
      let r =
        this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0);
      r >= 0;
      r--
    )
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new vr(this, e, r);
    return null;
  }
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  toString() {
    let e = '';
    for (let t = 1; t <= this.depth; t++)
      e += (e ? '/' : '') + this.node(t).type.name + '_' + this.index(t - 1);
    return e + ':' + this.parentOffset;
  }
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError('Position ' + t + ' out of range');
    let r = [],
      s = 0,
      i = t;
    for (let o = e; ; ) {
      let { index: l, offset: a } = o.content.findIndex(i),
        c = i - a;
      if ((r.push(o, l, s + a), !c || ((o = o.child(l)), o.isText))) break;
      ((i = c - 1), (s += a + 1));
    }
    return new jn(t, r, i);
  }
  static resolveCached(e, t) {
    let r = Yo.get(e);
    if (r)
      for (let i = 0; i < r.elts.length; i++) {
        let o = r.elts[i];
        if (o.pos == t) return o;
      }
    else Yo.set(e, (r = new Fh()));
    let s = (r.elts[r.i] = jn.resolve(e, t));
    return ((r.i = (r.i + 1) % _h), s);
  }
}
class Fh {
  constructor() {
    ((this.elts = []), (this.i = 0));
  }
}
const _h = 12,
  Yo = new WeakMap();
class vr {
  constructor(e, t, r) {
    ((this.$from = e), (this.$to = t), (this.depth = r));
  }
  get start() {
    return this.$from.before(this.depth + 1);
  }
  get end() {
    return this.$to.after(this.depth + 1);
  }
  get parent() {
    return this.$from.node(this.depth);
  }
  get startIndex() {
    return this.$from.index(this.depth);
  }
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Vh = Object.create(null);
class He {
  constructor(e, t, r, s = U.none) {
    ((this.type = e),
      (this.attrs = t),
      (this.marks = s),
      (this.content = r || C.empty));
  }
  get children() {
    return this.content.content;
  }
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  get childCount() {
    return this.content.childCount;
  }
  child(e) {
    return this.content.child(e);
  }
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  forEach(e) {
    this.content.forEach(e);
  }
  nodesBetween(e, t, r, s = 0) {
    this.content.nodesBetween(e, t, r, s, this);
  }
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  get textContent() {
    return this.isLeaf && this.type.spec.leafText
      ? this.type.spec.leafText(this)
      : this.textBetween(0, this.content.size, '');
  }
  textBetween(e, t, r, s) {
    return this.content.textBetween(e, t, r, s);
  }
  get firstChild() {
    return this.content.firstChild;
  }
  get lastChild() {
    return this.content.lastChild;
  }
  eq(e) {
    return this == e || (this.sameMarkup(e) && this.content.eq(e.content));
  }
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  hasMarkup(e, t, r) {
    return (
      this.type == e &&
      kr(this.attrs, t || e.defaultAttrs || Vh) &&
      U.sameSet(this.marks, r || U.none)
    );
  }
  copy(e = null) {
    return e == this.content
      ? this
      : new He(this.type, this.attrs, e, this.marks);
  }
  mark(e) {
    return e == this.marks
      ? this
      : new He(this.type, this.attrs, this.content, e);
  }
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size
      ? this
      : this.copy(this.content.cut(e, t));
  }
  slice(e, t = this.content.size, r = !1) {
    if (e == t) return A.empty;
    let s = this.resolve(e),
      i = this.resolve(t),
      o = r ? 0 : s.sharedDepth(t),
      l = s.start(o),
      c = s.node(o).content.cut(s.pos - l, i.pos - l);
    return new A(c, s.depth - o, i.depth - o);
  }
  replace(e, t, r) {
    return $h(this.resolve(e), this.resolve(t), r);
  }
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: s } = t.content.findIndex(e);
      if (((t = t.maybeChild(r)), !t)) return null;
      if (s == e || t.isText) return t;
      e -= s + 1;
    }
  }
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  childBefore(e) {
    if (e == 0) return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e) return { node: this.content.child(t), index: t, offset: r };
    let s = this.content.child(t - 1);
    return { node: s, index: t - 1, offset: r - s.nodeSize };
  }
  resolve(e) {
    return jn.resolveCached(this, e);
  }
  resolveNoCache(e) {
    return jn.resolve(this, e);
  }
  rangeHasMark(e, t, r) {
    let s = !1;
    return (
      t > e &&
        this.nodesBetween(e, t, i => (r.isInSet(i.marks) && (s = !0), !s)),
      s
    );
  }
  get isBlock() {
    return this.type.isBlock;
  }
  get isTextblock() {
    return this.type.isTextblock;
  }
  get inlineContent() {
    return this.type.inlineContent;
  }
  get isInline() {
    return this.type.isInline;
  }
  get isText() {
    return this.type.isText;
  }
  get isLeaf() {
    return this.type.isLeaf;
  }
  get isAtom() {
    return this.type.isAtom;
  }
  toString() {
    if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return (
      this.content.size && (e += '(' + this.content.toStringInner() + ')'),
      rc(this.marks, e)
    );
  }
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error('Called contentMatchAt on a node with invalid content');
    return t;
  }
  canReplace(e, t, r = C.empty, s = 0, i = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, s, i),
      l = o && o.matchFragment(this.content, t);
    if (!l || !l.validEnd) return !1;
    for (let a = s; a < i; a++)
      if (!this.type.allowsMarks(r.child(a).marks)) return !1;
    return !0;
  }
  canReplaceWith(e, t, r, s) {
    if (s && !this.type.allowsMarks(s)) return !1;
    let i = this.contentMatchAt(e).matchType(r),
      o = i && i.matchFragment(this.content, t);
    return o ? o.validEnd : !1;
  }
  canAppend(e) {
    return e.content.size
      ? this.canReplace(this.childCount, this.childCount, e.content)
      : this.type.compatibleContent(e.type);
  }
  check() {
    (this.type.checkContent(this.content), this.type.checkAttrs(this.attrs));
    let e = U.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      (r.type.checkAttrs(r.attrs), (e = r.addToSet(e)));
    }
    if (!U.sameSet(e, this.marks))
      throw new RangeError(
        `Invalid collection of marks for node ${this.type.name}: ${this.marks.map(t => t.type.name)}`
      );
    this.content.forEach(t => t.check());
  }
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return (
      this.content.size && (e.content = this.content.toJSON()),
      this.marks.length && (e.marks = this.marks.map(t => t.toJSON())),
      e
    );
  }
  static fromJSON(e, t) {
    if (!t) throw new RangeError('Invalid input for Node.fromJSON');
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError('Invalid mark data for Node.fromJSON');
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == 'text') {
      if (typeof t.text != 'string')
        throw new RangeError('Invalid text node in JSON');
      return e.text(t.text, r);
    }
    let s = C.fromJSON(e, t.content),
      i = e.nodeType(t.type).create(t.attrs, s, r);
    return (i.type.checkAttrs(i.attrs), i);
  }
}
He.prototype.text = void 0;
class Mr extends He {
  constructor(e, t, r, s) {
    if ((super(e, t, null, s), !r))
      throw new RangeError('Empty text nodes are not allowed');
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString
      ? this.type.spec.toDebugString(this)
      : rc(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new Mr(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Mr(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length
      ? this
      : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return ((e.text = this.text), e);
  }
}
function rc(n, e) {
  for (let t = n.length - 1; t >= 0; t--) e = n[t].type.name + '(' + e + ')';
  return e;
}
class $t {
  constructor(e) {
    ((this.validEnd = e), (this.next = []), (this.wrapCache = []));
  }
  static parse(e, t) {
    let r = new Wh(e, t);
    if (r.next == null) return $t.empty;
    let s = sc(r);
    r.next && r.err('Unexpected trailing text');
    let i = Xh(Yh(s));
    return (Qh(i, r), i);
  }
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e) return this.next[t].next;
    return null;
  }
  matchFragment(e, t = 0, r = e.childCount) {
    let s = this;
    for (let i = t; s && i < r; i++) s = s.matchType(e.child(i).type);
    return s;
  }
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs())) return t;
    }
    return null;
  }
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type) return !0;
    return !1;
  }
  fillBefore(e, t = !1, r = 0) {
    let s = [this];
    function i(o, l) {
      let a = o.matchFragment(e, r);
      if (a && (!t || a.validEnd)) return C.from(l.map(c => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: u, next: d } = o.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && s.indexOf(d) == -1) {
          s.push(d);
          let h = i(d, l.concat(u));
          if (h) return h;
        }
      }
      return null;
    }
    return i(this, []);
  }
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e) return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return (this.wrapCache.push(e, t), t);
  }
  computeWrapping(e) {
    let t = Object.create(null),
      r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let s = r.shift(),
        i = s.match;
      if (i.matchType(e)) {
        let o = [];
        for (let l = s; l.type; l = l.via) o.push(l.type);
        return o.reverse();
      }
      for (let o = 0; o < i.next.length; o++) {
        let { type: l, next: a } = i.next[o];
        !l.isLeaf &&
          !l.hasRequiredAttrs() &&
          !(l.name in t) &&
          (!s.type || a.validEnd) &&
          (r.push({ match: l.contentMatch, type: l, via: s }),
          (t[l.name] = !0));
      }
    }
    return null;
  }
  get edgeCount() {
    return this.next.length;
  }
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let s = 0; s < r.next.length; s++)
        e.indexOf(r.next[s].next) == -1 && t(r.next[s].next);
    }
    return (
      t(this),
      e.map((r, s) => {
        let i = s + (r.validEnd ? '*' : ' ') + ' ';
        for (let o = 0; o < r.next.length; o++)
          i +=
            (o ? ', ' : '') +
            r.next[o].type.name +
            '->' +
            e.indexOf(r.next[o].next);
        return i;
      }).join(`
`)
    );
  }
}
$t.empty = new $t(!0);
class Wh {
  constructor(e, t) {
    ((this.string = e),
      (this.nodeTypes = t),
      (this.inline = null),
      (this.pos = 0),
      (this.tokens = e.split(/\s*(?=\b|\W|$)/)),
      this.tokens[this.tokens.length - 1] == '' && this.tokens.pop(),
      this.tokens[0] == '' && this.tokens.shift());
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function sc(n) {
  let e = [];
  do e.push(Uh(n));
  while (n.eat('|'));
  return e.length == 1 ? e[0] : { type: 'choice', exprs: e };
}
function Uh(n) {
  let e = [];
  do e.push(qh(n));
  while (n.next && n.next != ')' && n.next != '|');
  return e.length == 1 ? e[0] : { type: 'seq', exprs: e };
}
function qh(n) {
  let e = Gh(n);
  for (;;)
    if (n.eat('+')) e = { type: 'plus', expr: e };
    else if (n.eat('*')) e = { type: 'star', expr: e };
    else if (n.eat('?')) e = { type: 'opt', expr: e };
    else if (n.eat('{')) e = Kh(n, e);
    else break;
  return e;
}
function Xo(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return (n.pos++, e);
}
function Kh(n, e) {
  let t = Xo(n),
    r = t;
  return (
    n.eat(',') && (n.next != '}' ? (r = Xo(n)) : (r = -1)),
    n.eat('}') || n.err('Unclosed braced range'),
    { type: 'range', min: t, max: r, expr: e }
  );
}
function Jh(n, e) {
  let t = n.nodeTypes,
    r = t[e];
  if (r) return [r];
  let s = [];
  for (let i in t) {
    let o = t[i];
    o.isInGroup(e) && s.push(o);
  }
  return (s.length == 0 && n.err("No node type or group '" + e + "' found"), s);
}
function Gh(n) {
  if (n.eat('(')) {
    let e = sc(n);
    return (n.eat(')') || n.err('Missing closing paren'), e);
  } else if (/\W/.test(n.next)) n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Jh(n, n.next).map(
      t => (
        n.inline == null
          ? (n.inline = t.isInline)
          : n.inline != t.isInline && n.err('Mixing inline and block content'),
        { type: 'name', value: t }
      )
    );
    return (n.pos++, e.length == 1 ? e[0] : { type: 'choice', exprs: e });
  }
}
function Yh(n) {
  let e = [[]];
  return (s(i(n, 0), t()), e);
  function t() {
    return e.push([]) - 1;
  }
  function r(o, l, a) {
    let c = { term: a, to: l };
    return (e[o].push(c), c);
  }
  function s(o, l) {
    o.forEach(a => (a.to = l));
  }
  function i(o, l) {
    if (o.type == 'choice')
      return o.exprs.reduce((a, c) => a.concat(i(c, l)), []);
    if (o.type == 'seq')
      for (let a = 0; ; a++) {
        let c = i(o.exprs[a], l);
        if (a == o.exprs.length - 1) return c;
        s(c, (l = t()));
      }
    else if (o.type == 'star') {
      let a = t();
      return (r(l, a), s(i(o.expr, a), a), [r(a)]);
    } else if (o.type == 'plus') {
      let a = t();
      return (s(i(o.expr, l), a), s(i(o.expr, a), a), [r(a)]);
    } else {
      if (o.type == 'opt') return [r(l)].concat(i(o.expr, l));
      if (o.type == 'range') {
        let a = l;
        for (let c = 0; c < o.min; c++) {
          let u = t();
          (s(i(o.expr, a), u), (a = u));
        }
        if (o.max == -1) s(i(o.expr, a), a);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = t();
            (r(a, u), s(i(o.expr, a), u), (a = u));
          }
        return [r(a)];
      } else {
        if (o.type == 'name') return [r(l, void 0, o.value)];
        throw new Error('Unknown expr type');
      }
    }
  }
}
function ic(n, e) {
  return e - n;
}
function Qo(n, e) {
  let t = [];
  return (r(e), t.sort(ic));
  function r(s) {
    let i = n[s];
    if (i.length == 1 && !i[0].term) return r(i[0].to);
    t.push(s);
    for (let o = 0; o < i.length; o++) {
      let { term: l, to: a } = i[o];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function Xh(n) {
  let e = Object.create(null);
  return t(Qo(n, 0));
  function t(r) {
    let s = [];
    r.forEach(o => {
      n[o].forEach(({ term: l, to: a }) => {
        if (!l) return;
        let c;
        for (let u = 0; u < s.length; u++) s[u][0] == l && (c = s[u][1]);
        Qo(n, a).forEach(u => {
          (c || s.push([l, (c = [])]), c.indexOf(u) == -1 && c.push(u));
        });
      });
    });
    let i = (e[r.join(',')] = new $t(r.indexOf(n.length - 1) > -1));
    for (let o = 0; o < s.length; o++) {
      let l = s[o][1].sort(ic);
      i.next.push({ type: s[o][0], next: e[l.join(',')] || t(l) });
    }
    return i;
  }
}
function Qh(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let s = r[t],
      i = !s.validEnd,
      o = [];
    for (let l = 0; l < s.next.length; l++) {
      let { type: a, next: c } = s.next[l];
      (o.push(a.name),
        i && !(a.isText || a.hasRequiredAttrs()) && (i = !1),
        r.indexOf(c) == -1 && r.push(c));
    }
    i &&
      e.err(
        'Only non-generatable nodes (' +
          o.join(', ') +
          ') in a required position (see https://prosemirror.net/docs/guide/#generatable)'
      );
  }
}
function oc(n) {
  let e = Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault) return null;
    e[t] = r.default;
  }
  return e;
}
function lc(n, e) {
  let t = Object.create(null);
  for (let r in n) {
    let s = e && e[r];
    if (s === void 0) {
      let i = n[r];
      if (i.hasDefault) s = i.default;
      else throw new RangeError('No value supplied for attribute ' + r);
    }
    t[r] = s;
  }
  return t;
}
function ac(n, e, t, r) {
  for (let s in e)
    if (!(s in n))
      throw new RangeError(`Unsupported attribute ${s} for ${t} of type ${s}`);
  for (let s in n) {
    let i = n[s];
    i.validate && i.validate(e[s]);
  }
}
function cc(n, e) {
  let t = Object.create(null);
  if (e) for (let r in e) t[r] = new ef(n, r, e[r]);
  return t;
}
let Zo = class uc {
  constructor(e, t, r) {
    ((this.name = e),
      (this.schema = t),
      (this.spec = r),
      (this.markSet = null),
      (this.groups = r.group ? r.group.split(' ') : []),
      (this.attrs = cc(e, r.attrs)),
      (this.defaultAttrs = oc(this.attrs)),
      (this.contentMatch = null),
      (this.inlineContent = null),
      (this.isBlock = !(r.inline || e == 'text')),
      (this.isText = e == 'text'));
  }
  get isInline() {
    return !this.isBlock;
  }
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  get isLeaf() {
    return this.contentMatch == $t.empty;
  }
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? 'pre' : 'normal');
  }
  hasRequiredAttrs() {
    for (let e in this.attrs) if (this.attrs[e].isRequired) return !0;
    return !1;
  }
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : lc(this.attrs, e);
  }
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new He(this, this.computeAttrs(e), C.from(t), U.setFrom(r));
  }
  createChecked(e = null, t, r) {
    return (
      (t = C.from(t)),
      this.checkContent(t),
      new He(this, this.computeAttrs(e), t, U.setFrom(r))
    );
  }
  createAndFill(e = null, t, r) {
    if (((e = this.computeAttrs(e)), (t = C.from(t)), t.size)) {
      let o = this.contentMatch.fillBefore(t);
      if (!o) return null;
      t = o.append(t);
    }
    let s = this.contentMatch.matchFragment(t),
      i = s && s.fillBefore(C.empty, !0);
    return i ? new He(this, e, t.append(i), U.setFrom(r)) : null;
  }
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd) return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks)) return !1;
    return !0;
  }
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(
        `Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`
      );
  }
  checkAttrs(e) {
    ac(this.attrs, e, 'node', this.name);
  }
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  allowsMarks(e) {
    if (this.markSet == null) return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type)) return !1;
    return !0;
  }
  allowedMarks(e) {
    if (this.markSet == null) return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type)
        ? t && t.push(e[r])
        : t || (t = e.slice(0, r));
    return t ? (t.length ? t : U.none) : e;
  }
  static compile(e, t) {
    let r = Object.create(null);
    e.forEach((i, o) => (r[i] = new uc(i, t, o)));
    let s = t.spec.topNode || 'doc';
    if (!r[s])
      throw new RangeError("Schema is missing its top node type ('" + s + "')");
    if (!r.text) throw new RangeError("Every schema needs a 'text' type");
    for (let i in r.text.attrs)
      throw new RangeError('The text node type should not have attributes');
    return r;
  }
};
function Zh(n, e, t) {
  let r = t.split('|');
  return s => {
    let i = s === null ? 'null' : typeof s;
    if (r.indexOf(i) < 0)
      throw new RangeError(
        `Expected value of type ${r} for attribute ${e} on type ${n}, got ${i}`
      );
  };
}
class ef {
  constructor(e, t, r) {
    ((this.hasDefault = Object.prototype.hasOwnProperty.call(r, 'default')),
      (this.default = r.default),
      (this.validate =
        typeof r.validate == 'string' ? Zh(e, t, r.validate) : r.validate));
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class us {
  constructor(e, t, r, s) {
    ((this.name = e),
      (this.rank = t),
      (this.schema = r),
      (this.spec = s),
      (this.attrs = cc(e, s.attrs)),
      (this.excluded = null));
    let i = oc(this.attrs);
    this.instance = i ? new U(this, i) : null;
  }
  create(e = null) {
    return !e && this.instance ? this.instance : new U(this, lc(this.attrs, e));
  }
  static compile(e, t) {
    let r = Object.create(null),
      s = 0;
    return (e.forEach((i, o) => (r[i] = new us(i, s++, t, o))), r);
  }
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && ((e = e.slice(0, t).concat(e.slice(t + 1))), t--);
    return e;
  }
  isInSet(e) {
    for (let t = 0; t < e.length; t++) if (e[t].type == this) return e[t];
  }
  checkAttrs(e) {
    ac(this.attrs, e, 'mark', this.name);
  }
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class dc {
  constructor(e) {
    ((this.linebreakReplacement = null), (this.cached = Object.create(null)));
    let t = (this.spec = {});
    for (let s in e) t[s] = e[s];
    ((t.nodes = ce.from(e.nodes)),
      (t.marks = ce.from(e.marks || {})),
      (this.nodes = Zo.compile(this.spec.nodes, this)),
      (this.marks = us.compile(this.spec.marks, this)));
    let r = Object.create(null);
    for (let s in this.nodes) {
      if (s in this.marks)
        throw new RangeError(s + ' can not be both a node and a mark');
      let i = this.nodes[s],
        o = i.spec.content || '',
        l = i.spec.marks;
      if (
        ((i.contentMatch = r[o] || (r[o] = $t.parse(o, this.nodes))),
        (i.inlineContent = i.contentMatch.inlineContent),
        i.spec.linebreakReplacement)
      ) {
        if (this.linebreakReplacement)
          throw new RangeError('Multiple linebreak nodes defined');
        if (!i.isInline || !i.isLeaf)
          throw new RangeError(
            'Linebreak replacement nodes must be inline leaf nodes'
          );
        this.linebreakReplacement = i;
      }
      i.markSet =
        l == '_'
          ? null
          : l
            ? el(this, l.split(' '))
            : l == '' || !i.inlineContent
              ? []
              : null;
    }
    for (let s in this.marks) {
      let i = this.marks[s],
        o = i.spec.excludes;
      i.excluded = o == null ? [i] : o == '' ? [] : el(this, o.split(' '));
    }
    ((this.nodeFromJSON = s => He.fromJSON(this, s)),
      (this.markFromJSON = s => U.fromJSON(this, s)),
      (this.topNodeType = this.nodes[this.spec.topNode || 'doc']),
      (this.cached.wrappings = Object.create(null)));
  }
  node(e, t = null, r, s) {
    if (typeof e == 'string') e = this.nodeType(e);
    else if (e instanceof Zo) {
      if (e.schema != this)
        throw new RangeError(
          'Node type from different schema used (' + e.name + ')'
        );
    } else throw new RangeError('Invalid node type: ' + e);
    return e.createChecked(t, r, s);
  }
  text(e, t) {
    let r = this.nodes.text;
    return new Mr(r, r.defaultAttrs, e, U.setFrom(t));
  }
  mark(e, t) {
    return (typeof e == 'string' && (e = this.marks[e]), e.create(t));
  }
  nodeType(e) {
    let t = this.nodes[e];
    if (!t) throw new RangeError('Unknown node type: ' + e);
    return t;
  }
}
function el(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let s = e[r],
      i = n.marks[s],
      o = i;
    if (i) t.push(i);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (s == '_' ||
          (a.spec.group && a.spec.group.split(' ').indexOf(s) > -1)) &&
          t.push((o = a));
      }
    if (!o) throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function tf(n) {
  return n.tag != null;
}
function nf(n) {
  return n.style != null;
}
class mt {
  constructor(e, t) {
    ((this.schema = e), (this.rules = t), (this.tags = []), (this.styles = []));
    let r = (this.matchedStyles = []);
    (t.forEach(s => {
      if (tf(s)) this.tags.push(s);
      else if (nf(s)) {
        let i = /[^=]*/.exec(s.style)[0];
        (r.indexOf(i) < 0 && r.push(i), this.styles.push(s));
      }
    }),
      (this.normalizeLists = !this.tags.some(s => {
        if (!/^(ul|ol)\b/.test(s.tag) || !s.node) return !1;
        let i = e.nodes[s.node];
        return i.contentMatch.matchType(i);
      })));
  }
  parse(e, t = {}) {
    let r = new nl(this, t, !1);
    return (r.addAll(e, U.none, t.from, t.to), r.finish());
  }
  parseSlice(e, t = {}) {
    let r = new nl(this, t, !0);
    return (r.addAll(e, U.none, t.from, t.to), A.maxOpen(r.finish()));
  }
  matchTag(e, t, r) {
    for (let s = r ? this.tags.indexOf(r) + 1 : 0; s < this.tags.length; s++) {
      let i = this.tags[s];
      if (
        of(e, i.tag) &&
        (i.namespace === void 0 || e.namespaceURI == i.namespace) &&
        (!i.context || t.matchesContext(i.context))
      ) {
        if (i.getAttrs) {
          let o = i.getAttrs(e);
          if (o === !1) continue;
          i.attrs = o || void 0;
        }
        return i;
      }
    }
  }
  matchStyle(e, t, r, s) {
    for (
      let i = s ? this.styles.indexOf(s) + 1 : 0;
      i < this.styles.length;
      i++
    ) {
      let o = this.styles[i],
        l = o.style;
      if (
        !(
          l.indexOf(e) != 0 ||
          (o.context && !r.matchesContext(o.context)) ||
          (l.length > e.length &&
            (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))
        )
      ) {
        if (o.getAttrs) {
          let a = o.getAttrs(t);
          if (a === !1) continue;
          o.attrs = a || void 0;
        }
        return o;
      }
    }
  }
  static schemaRules(e) {
    let t = [];
    function r(s) {
      let i = s.priority == null ? 50 : s.priority,
        o = 0;
      for (; o < t.length; o++) {
        let l = t[o];
        if ((l.priority == null ? 50 : l.priority) < i) break;
      }
      t.splice(o, 0, s);
    }
    for (let s in e.marks) {
      let i = e.marks[s].spec.parseDOM;
      i &&
        i.forEach(o => {
          (r((o = rl(o))), o.mark || o.ignore || o.clearMark || (o.mark = s));
        });
    }
    for (let s in e.nodes) {
      let i = e.nodes[s].spec.parseDOM;
      i &&
        i.forEach(o => {
          (r((o = rl(o))), o.node || o.ignore || o.mark || (o.node = s));
        });
    }
    return t;
  }
  static fromSchema(e) {
    return (
      e.cached.domParser || (e.cached.domParser = new mt(e, mt.schemaRules(e)))
    );
  }
}
const hc = {
    address: !0,
    article: !0,
    aside: !0,
    blockquote: !0,
    canvas: !0,
    dd: !0,
    div: !0,
    dl: !0,
    fieldset: !0,
    figcaption: !0,
    figure: !0,
    footer: !0,
    form: !0,
    h1: !0,
    h2: !0,
    h3: !0,
    h4: !0,
    h5: !0,
    h6: !0,
    header: !0,
    hgroup: !0,
    hr: !0,
    li: !0,
    noscript: !0,
    ol: !0,
    output: !0,
    p: !0,
    pre: !0,
    section: !0,
    table: !0,
    tfoot: !0,
    ul: !0
  },
  rf = { head: !0, noscript: !0, object: !0, script: !0, style: !0, title: !0 },
  fc = { ol: !0, ul: !0 },
  Bn = 1,
  mi = 2,
  Tn = 4;
function tl(n, e, t) {
  return e != null
    ? (e ? Bn : 0) | (e === 'full' ? mi : 0)
    : n && n.whitespace == 'pre'
      ? Bn | mi
      : t & ~Tn;
}
class tr {
  constructor(e, t, r, s, i, o) {
    ((this.type = e),
      (this.attrs = t),
      (this.marks = r),
      (this.solid = s),
      (this.options = o),
      (this.content = []),
      (this.activeMarks = U.none),
      (this.match = i || (o & Tn ? null : e.contentMatch)));
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type) return [];
      let t = this.type.contentMatch.fillBefore(C.from(e));
      if (t) this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch,
          s;
        return (s = r.findWrapping(e.type)) ? ((this.match = r), s) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Bn)) {
      let r = this.content[this.content.length - 1],
        s;
      if (r && r.isText && (s = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let i = r;
        r.text.length == s[0].length
          ? this.content.pop()
          : (this.content[this.content.length - 1] = i.withText(
              i.text.slice(0, i.text.length - s[0].length)
            ));
      }
    }
    let t = C.from(this.content);
    return (
      !e && this.match && (t = t.append(this.match.fillBefore(C.empty, !0))),
      this.type ? this.type.create(this.attrs, t, this.marks) : t
    );
  }
  inlineContext(e) {
    return this.type
      ? this.type.inlineContent
      : this.content.length
        ? this.content[0].isInline
        : e.parentNode &&
          !hc.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class nl {
  constructor(e, t, r) {
    ((this.parser = e),
      (this.options = t),
      (this.isOpen = r),
      (this.open = 0),
      (this.localPreserveWS = !1));
    let s = t.topNode,
      i,
      o = tl(null, t.preserveWhitespace, 0) | (r ? Tn : 0);
    (s
      ? (i = new tr(
          s.type,
          s.attrs,
          U.none,
          !0,
          t.topMatch || s.type.contentMatch,
          o
        ))
      : r
        ? (i = new tr(null, null, U.none, !0, null, o))
        : (i = new tr(e.schema.topNodeType, null, U.none, !0, null, o)),
      (this.nodes = [i]),
      (this.find = t.findPositions),
      (this.needsBlock = !1));
  }
  get top() {
    return this.nodes[this.open];
  }
  addDOM(e, t) {
    e.nodeType == 3
      ? this.addTextNode(e, t)
      : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue,
      s = this.top,
      i =
        s.options & mi ? 'full' : this.localPreserveWS || (s.options & Bn) > 0,
      { schema: o } = this.parser;
    if (i === 'full' || s.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (i)
        if (i === 'full')
          r = r.replace(
            /\r\n?/g,
            `
`
          );
        else if (
          o.linebreakReplacement &&
          /[\r\n]/.test(r) &&
          this.top.findWrapping(o.linebreakReplacement.create())
        ) {
          let l = r.split(/\r?\n|\r/);
          for (let a = 0; a < l.length; a++)
            (a && this.insertNode(o.linebreakReplacement.create(), t, !0),
              l[a] && this.insertNode(o.text(l[a]), t, !/\S/.test(l[a])));
          r = '';
        } else r = r.replace(/\r?\n|\r/g, ' ');
      else if (
        ((r = r.replace(/[ \t\r\n\u000c]+/g, ' ')),
        /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1)
      ) {
        let l = s.content[s.content.length - 1],
          a = e.previousSibling;
        (!l ||
          (a && a.nodeName == 'BR') ||
          (l.isText && /[ \t\r\n\u000c]$/.test(l.text))) &&
          (r = r.slice(1));
      }
      (r && this.insertNode(o.text(r), t, !/\S/.test(r)), this.findInText(e));
    } else this.findInside(e);
  }
  addElement(e, t, r) {
    let s = this.localPreserveWS,
      i = this.top;
    (e.tagName == 'PRE' || /pre/.test(e.style && e.style.whiteSpace)) &&
      (this.localPreserveWS = !0);
    let o = e.nodeName.toLowerCase(),
      l;
    fc.hasOwnProperty(o) && this.parser.normalizeLists && sf(e);
    let a =
      (this.options.ruleFromNode && this.options.ruleFromNode(e)) ||
      (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : rf.hasOwnProperty(o))
      (this.findInside(e), this.ignoreFallback(e, t));
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent
        ? (this.open = Math.max(0, this.open - 1))
        : a && a.skip.nodeType && (e = a.skip);
      let c,
        u = this.needsBlock;
      if (hc.hasOwnProperty(o))
        (i.content.length &&
          i.content[0].isInline &&
          this.open &&
          (this.open--, (i = this.top)),
          (c = !0),
          i.type || (this.needsBlock = !0));
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let d = a && a.skip ? t : this.readStyles(e, t);
      (d && this.addAll(e, d), c && this.sync(i), (this.needsBlock = u));
    } else {
      let c = this.readStyles(e, t);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = s;
  }
  leafFallback(e, t) {
    e.nodeName == 'BR' &&
      this.top.type &&
      this.top.type.inlineContent &&
      this.addTextNode(
        e.ownerDocument.createTextNode(`
`),
        t
      );
  }
  ignoreFallback(e, t) {
    e.nodeName == 'BR' &&
      (!this.top.type || !this.top.type.inlineContent) &&
      this.findPlace(this.parser.schema.text('-'), t, !0);
  }
  readStyles(e, t) {
    let r = e.style;
    if (r && r.length)
      for (let s = 0; s < this.parser.matchedStyles.length; s++) {
        let i = this.parser.matchedStyles[s],
          o = r.getPropertyValue(i);
        if (o)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(i, o, this, l);
            if (!a) break;
            if (a.ignore) return null;
            if (
              (a.clearMark
                ? (t = t.filter(c => !a.clearMark(c)))
                : (t = t.concat(
                    this.parser.schema.marks[a.mark].create(a.attrs)
                  )),
              a.consuming === !1)
            )
              l = a;
            else break;
          }
      }
    return t;
  }
  addElementByRule(e, t, r, s) {
    let i, o;
    if (t.node)
      if (((o = this.parser.schema.nodes[t.node]), o.isLeaf))
        this.insertNode(o.create(t.attrs), r, e.nodeName == 'BR') ||
          this.leafFallback(e, r);
      else {
        let a = this.enter(o, t.attrs || null, r, t.preserveWhitespace);
        a && ((i = !0), (r = a));
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (o && o.isLeaf) this.findInside(e);
    else if (s) this.addElement(e, r, s);
    else if (t.getContent)
      (this.findInside(e),
        t
          .getContent(e, this.parser.schema)
          .forEach(a => this.insertNode(a, r, !1)));
    else {
      let a = e;
      (typeof t.contentElement == 'string'
        ? (a = e.querySelector(t.contentElement))
        : typeof t.contentElement == 'function'
          ? (a = t.contentElement(e))
          : t.contentElement && (a = t.contentElement),
        this.findAround(e, a, !0),
        this.addAll(a, r),
        this.findAround(e, a, !1));
    }
    i && this.sync(l) && this.open--;
  }
  addAll(e, t, r, s) {
    let i = r || 0;
    for (
      let o = r ? e.childNodes[r] : e.firstChild,
        l = s == null ? null : e.childNodes[s];
      o != l;
      o = o.nextSibling, ++i
    )
      (this.findAtPoint(e, i), this.addDOM(o, t));
    this.findAtPoint(e, i);
  }
  findPlace(e, t, r) {
    let s, i;
    for (let o = this.open, l = 0; o >= 0; o--) {
      let a = this.nodes[o],
        c = a.findWrapping(e);
      if (c && (!s || s.length > c.length + l) && ((s = c), (i = a), !c.length))
        break;
      if (a.solid) {
        if (r) break;
        l += 2;
      }
    }
    if (!s) return null;
    this.sync(i);
    for (let o = 0; o < s.length; o++) t = this.enterInner(s[o], null, t, !1);
    return t;
  }
  insertNode(e, t, r) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let i = this.textblockFromContext();
      i && (t = this.enterInner(i, null, t));
    }
    let s = this.findPlace(e, t, r);
    if (s) {
      this.closeExtra();
      let i = this.top;
      i.match && (i.match = i.match.matchType(e.type));
      let o = U.none;
      for (let l of s.concat(e.marks))
        (i.type ? i.type.allowsMarkType(l.type) : sl(l.type, e.type)) &&
          (o = l.addToSet(o));
      return (i.content.push(e.mark(o)), !0);
    }
    return !1;
  }
  enter(e, t, r, s) {
    let i = this.findPlace(e.create(t), r, !1);
    return (i && (i = this.enterInner(e, t, r, !0, s)), i);
  }
  enterInner(e, t, r, s = !1, i) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let l = tl(e, i, o.options);
    o.options & Tn && o.content.length == 0 && (l |= Tn);
    let a = U.none;
    return (
      (r = r.filter(c =>
        (o.type ? o.type.allowsMarkType(c.type) : sl(c.type, e))
          ? ((a = c.addToSet(a)), !1)
          : !0
      )),
      this.nodes.push(new tr(e, t, a, s, null, l)),
      this.open++,
      r
    );
  }
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return (
      (this.open = 0),
      this.closeExtra(this.isOpen),
      this.nodes[0].finish(!!(this.isOpen || this.options.topOpen))
    );
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e) return ((this.open = t), !0);
      this.localPreserveWS && (this.nodes[t].options |= Bn);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let s = r.length - 1; s >= 0; s--) e += r[s].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e &&
          this.find[r].offset == t &&
          (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null &&
          e.nodeType == 1 &&
          e.contains(this.find[t].node) &&
          (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let s = 0; s < this.find.length; s++)
        this.find[s].pos == null &&
          e.nodeType == 1 &&
          e.contains(this.find[s].node) &&
          t.compareDocumentPosition(this.find[s].node) & (r ? 2 : 4) &&
          (this.find[s].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e &&
          (this.find[t].pos =
            this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  matchesContext(e) {
    if (e.indexOf('|') > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split('/'),
      r = this.options.context,
      s = !this.isOpen && (!r || r.parent.type == this.nodes[0].type),
      i = -(r ? r.depth + 1 : 0) + (s ? 0 : 1),
      o = (l, a) => {
        for (; l >= 0; l--) {
          let c = t[l];
          if (c == '') {
            if (l == t.length - 1 || l == 0) continue;
            for (; a >= i; a--) if (o(l - 1, a)) return !0;
            return !1;
          } else {
            let u =
              a > 0 || (a == 0 && s)
                ? this.nodes[a].type
                : r && a >= i
                  ? r.node(a - i).type
                  : null;
            if (!u || (u.name != c && !u.isInGroup(c))) return !1;
            a--;
          }
        }
        return !0;
      };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs) return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs) return r;
    }
  }
}
function sf(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && fc.hasOwnProperty(r) && t
      ? (t.appendChild(e), (e = t))
      : r == 'li'
        ? (t = e)
        : r && (t = null);
  }
}
function of(n, e) {
  return (
    n.matches ||
    n.msMatchesSelector ||
    n.webkitMatchesSelector ||
    n.mozMatchesSelector
  ).call(n, e);
}
function rl(n) {
  let e = {};
  for (let t in n) e[t] = n[t];
  return e;
}
function sl(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let s = t[r];
    if (!s.allowsMarkType(n)) continue;
    let i = [],
      o = l => {
        i.push(l);
        for (let a = 0; a < l.edgeCount; a++) {
          let { type: c, next: u } = l.edge(a);
          if (c == e || (i.indexOf(u) < 0 && o(u))) return !0;
        }
      };
    if (o(s.contentMatch)) return !0;
  }
}
class Wt {
  constructor(e, t) {
    ((this.nodes = e), (this.marks = t));
  }
  serializeFragment(e, t = {}, r) {
    r || (r = Rs(t).createDocumentFragment());
    let s = r,
      i = [];
    return (
      e.forEach(o => {
        if (i.length || o.marks.length) {
          let l = 0,
            a = 0;
          for (; l < i.length && a < o.marks.length; ) {
            let c = o.marks[a];
            if (!this.marks[c.type.name]) {
              a++;
              continue;
            }
            if (!c.eq(i[l][0]) || c.type.spec.spanning === !1) break;
            (l++, a++);
          }
          for (; l < i.length; ) s = i.pop()[1];
          for (; a < o.marks.length; ) {
            let c = o.marks[a++],
              u = this.serializeMark(c, o.isInline, t);
            u &&
              (i.push([c, s]),
              s.appendChild(u.dom),
              (s = u.contentDOM || u.dom));
          }
        }
        s.appendChild(this.serializeNodeInner(o, t));
      }),
      r
    );
  }
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: s } = pr(
      Rs(t),
      this.nodes[e.type.name](e),
      null,
      e.attrs
    );
    if (s) {
      if (e.isLeaf)
        throw new RangeError('Content hole not allowed in a leaf node spec');
      this.serializeFragment(e.content, t, s);
    }
    return r;
  }
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let s = e.marks.length - 1; s >= 0; s--) {
      let i = this.serializeMark(e.marks[s], e.isInline, t);
      i && ((i.contentDOM || i.dom).appendChild(r), (r = i.dom));
    }
    return r;
  }
  serializeMark(e, t, r = {}) {
    let s = this.marks[e.type.name];
    return s && pr(Rs(r), s(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, s) {
    return pr(e, t, r, s);
  }
  static fromSchema(e) {
    return (
      e.cached.domSerializer ||
      (e.cached.domSerializer = new Wt(
        this.nodesFromSchema(e),
        this.marksFromSchema(e)
      ))
    );
  }
  static nodesFromSchema(e) {
    let t = il(e.nodes);
    return (t.text || (t.text = r => r.text), t);
  }
  static marksFromSchema(e) {
    return il(e.marks);
  }
}
function il(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function Rs(n) {
  return n.document || window.document;
}
const ol = new WeakMap();
function lf(n) {
  let e = ol.get(n);
  return (e === void 0 && ol.set(n, (e = af(n))), e);
}
function af(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == 'object')
      if (Array.isArray(r))
        if (typeof r[0] == 'string') (e || (e = []), e.push(r));
        else for (let s = 0; s < r.length; s++) t(r[s]);
      else for (let s in r) t(r[s]);
  }
  return (t(n), e);
}
function pr(n, e, t, r) {
  if (typeof e == 'string') return { dom: n.createTextNode(e) };
  if (e.nodeType != null) return { dom: e };
  if (e.dom && e.dom.nodeType != null) return e;
  let s = e[0],
    i;
  if (typeof s != 'string')
    throw new RangeError('Invalid array passed to renderSpec');
  if (r && (i = lf(r)) && i.indexOf(e) > -1)
    throw new RangeError(
      'Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.'
    );
  let o = s.indexOf(' ');
  o > 0 && ((t = s.slice(0, o)), (s = s.slice(o + 1)));
  let l,
    a = t ? n.createElementNS(t, s) : n.createElement(s),
    c = e[1],
    u = 1;
  if (c && typeof c == 'object' && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let d in c)
      if (c[d] != null) {
        let h = d.indexOf(' ');
        h > 0
          ? a.setAttributeNS(d.slice(0, h), d.slice(h + 1), c[d])
          : d == 'style' && a.style
            ? (a.style.cssText = c[d])
            : a.setAttribute(d, c[d]);
      }
  }
  for (let d = u; d < e.length; d++) {
    let h = e[d];
    if (h === 0) {
      if (d < e.length - 1 || d > u)
        throw new RangeError(
          'Content hole must be the only child of its parent node'
        );
      return { dom: a, contentDOM: a };
    } else {
      let { dom: f, contentDOM: m } = pr(n, h, t, r);
      if ((a.appendChild(f), m)) {
        if (l) throw new RangeError('Multiple content holes');
        l = m;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const pc = 65535,
  mc = Math.pow(2, 16);
function cf(n, e) {
  return n + e * mc;
}
function ll(n) {
  return n & pc;
}
function uf(n) {
  return (n - (n & pc)) / mc;
}
const gc = 1,
  yc = 2,
  mr = 4,
  bc = 8;
class gi {
  constructor(e, t, r) {
    ((this.pos = e), (this.delInfo = t), (this.recover = r));
  }
  get deleted() {
    return (this.delInfo & bc) > 0;
  }
  get deletedBefore() {
    return (this.delInfo & (gc | mr)) > 0;
  }
  get deletedAfter() {
    return (this.delInfo & (yc | mr)) > 0;
  }
  get deletedAcross() {
    return (this.delInfo & mr) > 0;
  }
}
class we {
  constructor(e, t = !1) {
    if (((this.ranges = e), (this.inverted = t), !e.length && we.empty))
      return we.empty;
  }
  recover(e) {
    let t = 0,
      r = ll(e);
    if (!this.inverted)
      for (let s = 0; s < r; s++)
        t += this.ranges[s * 3 + 2] - this.ranges[s * 3 + 1];
    return this.ranges[r * 3] + t + uf(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  _map(e, t, r) {
    let s = 0,
      i = this.inverted ? 2 : 1,
      o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? s : 0);
      if (a > e) break;
      let c = this.ranges[l + i],
        u = this.ranges[l + o],
        d = a + c;
      if (e <= d) {
        let h = c ? (e == a ? -1 : e == d ? 1 : t) : t,
          f = a + s + (h < 0 ? 0 : u);
        if (r) return f;
        let m = e == (t < 0 ? a : d) ? null : cf(l / 3, e - a),
          g = e == a ? yc : e == d ? gc : mr;
        return ((t < 0 ? e != a : e != d) && (g |= bc), new gi(f, g, m));
      }
      s += u - c;
    }
    return r ? e + s : new gi(e + s, 0, null);
  }
  touches(e, t) {
    let r = 0,
      s = ll(t),
      i = this.inverted ? 2 : 1,
      o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e) break;
      let c = this.ranges[l + i],
        u = a + c;
      if (e <= u && l == s * 3) return !0;
      r += this.ranges[l + o] - c;
    }
    return !1;
  }
  forEach(e) {
    let t = this.inverted ? 2 : 1,
      r = this.inverted ? 1 : 2;
    for (let s = 0, i = 0; s < this.ranges.length; s += 3) {
      let o = this.ranges[s],
        l = o - (this.inverted ? i : 0),
        a = o + (this.inverted ? 0 : i),
        c = this.ranges[s + t],
        u = this.ranges[s + r];
      (e(l, l + c, a, a + u), (i += u - c));
    }
  }
  invert() {
    return new we(this.ranges, !this.inverted);
  }
  toString() {
    return (this.inverted ? '-' : '') + JSON.stringify(this.ranges);
  }
  static offset(e) {
    return e == 0 ? we.empty : new we(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
we.empty = new we([]);
class zn {
  constructor(e, t, r = 0, s = e ? e.length : 0) {
    ((this.mirror = t),
      (this.from = r),
      (this.to = s),
      (this._maps = e || []),
      (this.ownData = !(e || t)));
  }
  get maps() {
    return this._maps;
  }
  slice(e = 0, t = this.maps.length) {
    return new zn(this._maps, this.mirror, e, t);
  }
  appendMap(e, t) {
    (this.ownData ||
      ((this._maps = this._maps.slice()),
      (this.mirror = this.mirror && this.mirror.slice()),
      (this.ownData = !0)),
      (this.to = this._maps.push(e)),
      t != null && this.setMirror(this._maps.length - 1, t));
  }
  appendMapping(e) {
    for (let t = 0, r = this._maps.length; t < e._maps.length; t++) {
      let s = e.getMirror(t);
      this.appendMap(e._maps[t], s != null && s < t ? r + s : void 0);
    }
  }
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e) return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  setMirror(e, t) {
    (this.mirror || (this.mirror = []), this.mirror.push(e, t));
  }
  appendMappingInverted(e) {
    for (
      let t = e.maps.length - 1, r = this._maps.length + e._maps.length;
      t >= 0;
      t--
    ) {
      let s = e.getMirror(t);
      this.appendMap(
        e._maps[t].invert(),
        s != null && s > t ? r - s - 1 : void 0
      );
    }
  }
  invert() {
    let e = new zn();
    return (e.appendMappingInverted(this), e);
  }
  map(e, t = 1) {
    if (this.mirror) return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++) e = this._maps[r].map(e, t);
    return e;
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  _map(e, t, r) {
    let s = 0;
    for (let i = this.from; i < this.to; i++) {
      let o = this._maps[i],
        l = o.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(i);
        if (a != null && a > i && a < this.to) {
          ((i = a), (e = this._maps[a].recover(l.recover)));
          continue;
        }
      }
      ((s |= l.delInfo), (e = l.pos));
    }
    return r ? e : new gi(e, s, null);
  }
}
const Ls = Object.create(null);
class ge {
  getMap() {
    return we.empty;
  }
  merge(e) {
    return null;
  }
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError('Invalid input for Step.fromJSON');
    let r = Ls[t.stepType];
    if (!r) throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  static jsonID(e, t) {
    if (e in Ls) throw new RangeError('Duplicate use of step JSON ID ' + e);
    return ((Ls[e] = t), (t.prototype.jsonID = e), t);
  }
}
class ne {
  constructor(e, t) {
    ((this.doc = e), (this.failed = t));
  }
  static ok(e) {
    return new ne(e, null);
  }
  static fail(e) {
    return new ne(null, e);
  }
  static fromReplace(e, t, r, s) {
    try {
      return ne.ok(e.replace(t, r, s));
    } catch (i) {
      if (i instanceof Cr) return ne.fail(i.message);
      throw i;
    }
  }
}
function Qi(n, e, t) {
  let r = [];
  for (let s = 0; s < n.childCount; s++) {
    let i = n.child(s);
    (i.content.size && (i = i.copy(Qi(i.content, e, i))),
      i.isInline && (i = e(i, t, s)),
      r.push(i));
  }
  return C.fromArray(r);
}
class ht extends ge {
  constructor(e, t, r) {
    (super(), (this.from = e), (this.to = t), (this.mark = r));
  }
  apply(e) {
    let t = e.slice(this.from, this.to),
      r = e.resolve(this.from),
      s = r.node(r.sharedDepth(this.to)),
      i = new A(
        Qi(
          t.content,
          (o, l) =>
            !o.isAtom || !l.type.allowsMarkType(this.mark.type)
              ? o
              : o.mark(this.mark.addToSet(o.marks)),
          s
        ),
        t.openStart,
        t.openEnd
      );
    return ne.fromReplace(e, this.from, this.to, i);
  }
  invert() {
    return new $e(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1),
      r = e.mapResult(this.to, -1);
    return (t.deleted && r.deleted) || t.pos >= r.pos
      ? null
      : new ht(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof ht &&
      e.mark.eq(this.mark) &&
      this.from <= e.to &&
      this.to >= e.from
      ? new ht(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark)
      : null;
  }
  toJSON() {
    return {
      stepType: 'addMark',
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  static fromJSON(e, t) {
    if (typeof t.from != 'number' || typeof t.to != 'number')
      throw new RangeError('Invalid input for AddMarkStep.fromJSON');
    return new ht(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ge.jsonID('addMark', ht);
class $e extends ge {
  constructor(e, t, r) {
    (super(), (this.from = e), (this.to = t), (this.mark = r));
  }
  apply(e) {
    let t = e.slice(this.from, this.to),
      r = new A(
        Qi(t.content, s => s.mark(this.mark.removeFromSet(s.marks)), e),
        t.openStart,
        t.openEnd
      );
    return ne.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new ht(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1),
      r = e.mapResult(this.to, -1);
    return (t.deleted && r.deleted) || t.pos >= r.pos
      ? null
      : new $e(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof $e &&
      e.mark.eq(this.mark) &&
      this.from <= e.to &&
      this.to >= e.from
      ? new $e(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark)
      : null;
  }
  toJSON() {
    return {
      stepType: 'removeMark',
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  static fromJSON(e, t) {
    if (typeof t.from != 'number' || typeof t.to != 'number')
      throw new RangeError('Invalid input for RemoveMarkStep.fromJSON');
    return new $e(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ge.jsonID('removeMark', $e);
class ft extends ge {
  constructor(e, t) {
    (super(), (this.pos = e), (this.mark = t));
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t) return ne.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return ne.fromReplace(
      e,
      this.pos,
      this.pos + 1,
      new A(C.from(r), 0, t.isLeaf ? 0 : 1)
    );
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let s = 0; s < t.marks.length; s++)
          if (!t.marks[s].isInSet(r)) return new ft(this.pos, t.marks[s]);
        return new ft(this.pos, this.mark);
      }
    }
    return new Ht(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new ft(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: 'addNodeMark', pos: this.pos, mark: this.mark.toJSON() };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != 'number')
      throw new RangeError('Invalid input for AddNodeMarkStep.fromJSON');
    return new ft(t.pos, e.markFromJSON(t.mark));
  }
}
ge.jsonID('addNodeMark', ft);
class Ht extends ge {
  constructor(e, t) {
    (super(), (this.pos = e), (this.mark = t));
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t) return ne.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return ne.fromReplace(
      e,
      this.pos,
      this.pos + 1,
      new A(C.from(r), 0, t.isLeaf ? 0 : 1)
    );
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks)
      ? this
      : new ft(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ht(t.pos, this.mark);
  }
  toJSON() {
    return {
      stepType: 'removeNodeMark',
      pos: this.pos,
      mark: this.mark.toJSON()
    };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != 'number')
      throw new RangeError('Invalid input for RemoveNodeMarkStep.fromJSON');
    return new Ht(t.pos, e.markFromJSON(t.mark));
  }
}
ge.jsonID('removeNodeMark', Ht);
class te extends ge {
  constructor(e, t, r, s = !1) {
    (super(),
      (this.from = e),
      (this.to = t),
      (this.slice = r),
      (this.structure = s));
  }
  apply(e) {
    return this.structure && yi(e, this.from, this.to)
      ? ne.fail('Structure replace would overwrite content')
      : ne.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new we([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new te(
      this.from,
      this.from + this.slice.size,
      e.slice(this.from, this.to)
    );
  }
  map(e) {
    let t = e.mapResult(this.to, -1),
      r =
        this.from == this.to && te.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross
      ? null
      : new te(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof te) || e.structure || this.structure) return null;
    if (
      this.from + this.slice.size == e.from &&
      !this.slice.openEnd &&
      !e.slice.openStart
    ) {
      let t =
        this.slice.size + e.slice.size == 0
          ? A.empty
          : new A(
              this.slice.content.append(e.slice.content),
              this.slice.openStart,
              e.slice.openEnd
            );
      return new te(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t =
        this.slice.size + e.slice.size == 0
          ? A.empty
          : new A(
              e.slice.content.append(this.slice.content),
              e.slice.openStart,
              this.slice.openEnd
            );
      return new te(e.from, this.to, t, this.structure);
    } else return null;
  }
  toJSON() {
    let e = { stepType: 'replace', from: this.from, to: this.to };
    return (
      this.slice.size && (e.slice = this.slice.toJSON()),
      this.structure && (e.structure = !0),
      e
    );
  }
  static fromJSON(e, t) {
    if (typeof t.from != 'number' || typeof t.to != 'number')
      throw new RangeError('Invalid input for ReplaceStep.fromJSON');
    return new te(t.from, t.to, A.fromJSON(e, t.slice), !!t.structure);
  }
}
te.MAP_BIAS = 1;
ge.jsonID('replace', te);
class ie extends ge {
  constructor(e, t, r, s, i, o, l = !1) {
    (super(),
      (this.from = e),
      (this.to = t),
      (this.gapFrom = r),
      (this.gapTo = s),
      (this.slice = i),
      (this.insert = o),
      (this.structure = l));
  }
  apply(e) {
    if (
      this.structure &&
      (yi(e, this.from, this.gapFrom) || yi(e, this.gapTo, this.to))
    )
      return ne.fail('Structure gap-replace would overwrite content');
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd) return ne.fail('Gap is not a flat range');
    let r = this.slice.insertAt(this.insert, t.content);
    return r
      ? ne.fromReplace(e, this.from, this.to, r)
      : ne.fail('Content does not fit in gap');
  }
  getMap() {
    return new we([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new ie(
      this.from,
      this.from + this.slice.size + t,
      this.from + this.insert,
      this.from + this.insert + t,
      e
        .slice(this.from, this.to)
        .removeBetween(this.gapFrom - this.from, this.gapTo - this.from),
      this.gapFrom - this.from,
      this.structure
    );
  }
  map(e) {
    let t = e.mapResult(this.from, 1),
      r = e.mapResult(this.to, -1),
      s = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1),
      i = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return (t.deletedAcross && r.deletedAcross) || s < t.pos || i > r.pos
      ? null
      : new ie(t.pos, r.pos, s, i, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: 'replaceAround',
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return (
      this.slice.size && (e.slice = this.slice.toJSON()),
      this.structure && (e.structure = !0),
      e
    );
  }
  static fromJSON(e, t) {
    if (
      typeof t.from != 'number' ||
      typeof t.to != 'number' ||
      typeof t.gapFrom != 'number' ||
      typeof t.gapTo != 'number' ||
      typeof t.insert != 'number'
    )
      throw new RangeError('Invalid input for ReplaceAroundStep.fromJSON');
    return new ie(
      t.from,
      t.to,
      t.gapFrom,
      t.gapTo,
      A.fromJSON(e, t.slice),
      t.insert,
      !!t.structure
    );
  }
}
ge.jsonID('replaceAround', ie);
function yi(n, e, t) {
  let r = n.resolve(e),
    s = t - e,
    i = r.depth;
  for (; s > 0 && i > 0 && r.indexAfter(i) == r.node(i).childCount; )
    (i--, s--);
  if (s > 0) {
    let o = r.node(i).maybeChild(r.indexAfter(i));
    for (; s > 0; ) {
      if (!o || o.isLeaf) return !0;
      ((o = o.firstChild), s--);
    }
  }
  return !1;
}
function df(n, e, t, r) {
  let s = [],
    i = [],
    o,
    l;
  (n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline) return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let h = Math.max(c, e),
        f = Math.min(c + a.nodeSize, t),
        m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) ||
          (o && o.to == h && o.mark.eq(d[g])
            ? (o.to = f)
            : s.push((o = new $e(h, f, d[g]))));
      l && l.to == h ? (l.to = f) : i.push((l = new ht(h, f, r)));
    }
  }),
    s.forEach(a => n.step(a)),
    i.forEach(a => n.step(a)));
}
function hf(n, e, t, r) {
  let s = [],
    i = 0;
  (n.doc.nodesBetween(e, t, (o, l) => {
    if (!o.isInline) return;
    i++;
    let a = null;
    if (r instanceof us) {
      let c = o.marks,
        u;
      for (; (u = r.isInSet(c)); )
        ((a || (a = [])).push(u), (c = u.removeFromSet(c)));
    } else r ? r.isInSet(o.marks) && (a = [r]) : (a = o.marks);
    if (a && a.length) {
      let c = Math.min(l + o.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let d = a[u],
          h;
        for (let f = 0; f < s.length; f++) {
          let m = s[f];
          m.step == i - 1 && d.eq(s[f].style) && (h = m);
        }
        h
          ? ((h.to = c), (h.step = i))
          : s.push({ style: d, from: Math.max(l, e), to: c, step: i });
      }
    }
  }),
    s.forEach(o => n.step(new $e(o.from, o.to, o.style))));
}
function Zi(n, e, t, r = t.contentMatch, s = !0) {
  let i = n.doc.nodeAt(e),
    o = [],
    l = e + 1;
  for (let a = 0; a < i.childCount; a++) {
    let c = i.child(a),
      u = l + c.nodeSize,
      d = r.matchType(c.type);
    if (!d) o.push(new te(l, u, A.empty));
    else {
      r = d;
      for (let h = 0; h < c.marks.length; h++)
        t.allowsMarkType(c.marks[h].type) || n.step(new $e(l, u, c.marks[h]));
      if (s && c.isText && t.whitespace != 'pre') {
        let h,
          f = /\r?\n|\r/g,
          m;
        for (; (h = f.exec(c.text)); )
          (m ||
            (m = new A(
              C.from(t.schema.text(' ', t.allowedMarks(c.marks))),
              0,
              0
            )),
            o.push(new te(l + h.index, l + h.index + h[0].length, m)));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(C.empty, !0);
    n.replace(l, l, new A(a, 0, 0));
  }
  for (let a = o.length - 1; a >= 0; a--) n.step(o[a]);
}
function ff(n, e, t) {
  return (
    (e == 0 || n.canReplace(e, n.childCount)) &&
    (t == n.childCount || n.canReplace(0, t))
  );
}
function mn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, s = 0, i = 0; ; --r) {
    let o = n.$from.node(r),
      l = n.$from.index(r) + s,
      a = n.$to.indexAfter(r) - i;
    if (r < n.depth && o.canReplace(l, a, t)) return r;
    if (r == 0 || o.type.spec.isolating || !ff(o, l, a)) break;
    (l && (s = 1), a < o.childCount && (i = 1));
  }
  return null;
}
function pf(n, e, t) {
  let { $from: r, $to: s, depth: i } = e,
    o = r.before(i + 1),
    l = s.after(i + 1),
    a = o,
    c = l,
    u = C.empty,
    d = 0;
  for (let m = i, g = !1; m > t; m--)
    g || r.index(m) > 0
      ? ((g = !0), (u = C.from(r.node(m).copy(u))), d++)
      : a--;
  let h = C.empty,
    f = 0;
  for (let m = i, g = !1; m > t; m--)
    g || s.after(m + 1) < s.end(m)
      ? ((g = !0), (h = C.from(s.node(m).copy(h))), f++)
      : c++;
  n.step(new ie(a, c, o, l, new A(u.append(h), d, f), u.size - d, !0));
}
function eo(n, e, t = null, r = n) {
  let s = mf(n, e),
    i = s && gf(r, e);
  return i ? s.map(al).concat({ type: e, attrs: t }).concat(i.map(al)) : null;
}
function al(n) {
  return { type: n, attrs: null };
}
function mf(n, e) {
  let { parent: t, startIndex: r, endIndex: s } = n,
    i = t.contentMatchAt(r).findWrapping(e);
  if (!i) return null;
  let o = i.length ? i[0] : e;
  return t.canReplaceWith(r, s, o) ? i : null;
}
function gf(n, e) {
  let { parent: t, startIndex: r, endIndex: s } = n,
    i = t.child(r),
    o = e.contentMatch.findWrapping(i.type);
  if (!o) return null;
  let a = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; a && c < s; c++) a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : o;
}
function yf(n, e, t) {
  let r = C.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (r.size) {
      let l = t[o].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError(
          'Wrapper type given to Transform.wrap does not form valid content of its parent wrapper'
        );
    }
    r = C.from(t[o].type.create(t[o].attrs, r));
  }
  let s = e.start,
    i = e.end;
  n.step(new ie(s, i, s, i, new A(r, 0, 0), t.length, !0));
}
function bf(n, e, t, r, s) {
  if (!r.isTextblock)
    throw new RangeError('Type given to setBlockType should be a textblock');
  let i = n.steps.length;
  n.doc.nodesBetween(e, t, (o, l) => {
    let a = typeof s == 'function' ? s(o) : s;
    if (
      o.isTextblock &&
      !o.hasMarkup(r, a) &&
      xf(n.doc, n.mapping.slice(i).map(l), r)
    ) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let f = r.whitespace == 'pre',
          m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        f && !m ? (c = !1) : !f && m && (c = !0);
      }
      (c === !1 && kc(n, o, l, i),
        Zi(n, n.mapping.slice(i).map(l, 1), r, void 0, c === null));
      let u = n.mapping.slice(i),
        d = u.map(l, 1),
        h = u.map(l + o.nodeSize, 1);
      return (
        n.step(
          new ie(
            d,
            h,
            d + 1,
            h - 1,
            new A(C.from(r.create(a, null, o.marks)), 0, 0),
            1,
            !0
          )
        ),
        c === !0 && xc(n, o, l, i),
        !1
      );
    }
  });
}
function xc(n, e, t, r) {
  e.forEach((s, i) => {
    if (s.isText) {
      let o,
        l = /\r?\n|\r/g;
      for (; (o = l.exec(s.text)); ) {
        let a = n.mapping.slice(r).map(t + 1 + i + o.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function kc(n, e, t, r) {
  e.forEach((s, i) => {
    if (s.type == s.type.schema.linebreakReplacement) {
      let o = n.mapping.slice(r).map(t + 1 + i);
      n.replaceWith(
        o,
        o + 1,
        e.type.schema.text(`
`)
      );
    }
  });
}
function xf(n, e, t) {
  let r = n.resolve(e),
    s = r.index();
  return r.parent.canReplaceWith(s, s + 1, t);
}
function kf(n, e, t, r, s) {
  let i = n.doc.nodeAt(e);
  if (!i) throw new RangeError('No node at given position');
  t || (t = i.type);
  let o = t.create(r, null, s || i.marks);
  if (i.isLeaf) return n.replaceWith(e, e + i.nodeSize, o);
  if (!t.validContent(i.content))
    throw new RangeError('Invalid content for node type ' + t.name);
  n.step(
    new ie(
      e,
      e + i.nodeSize,
      e + 1,
      e + i.nodeSize - 1,
      new A(C.from(o), 0, 0),
      1,
      !0
    )
  );
}
function tt(n, e, t = 1, r) {
  let s = n.resolve(e),
    i = s.depth - t,
    o = (r && r[r.length - 1]) || s.parent;
  if (
    i < 0 ||
    s.parent.type.spec.isolating ||
    !s.parent.canReplace(s.index(), s.parent.childCount) ||
    !o.type.validContent(
      s.parent.content.cutByIndex(s.index(), s.parent.childCount)
    )
  )
    return !1;
  for (let c = s.depth - 1, u = t - 2; c > i; c--, u--) {
    let d = s.node(c),
      h = s.index(c);
    if (d.type.spec.isolating) return !1;
    let f = d.content.cutByIndex(h, d.childCount),
      m = r && r[u + 1];
    m && (f = f.replaceChild(0, m.type.create(m.attrs)));
    let g = (r && r[u]) || d;
    if (!d.canReplace(h + 1, d.childCount) || !g.type.validContent(f))
      return !1;
  }
  let l = s.indexAfter(i),
    a = r && r[0];
  return s.node(i).canReplaceWith(l, l, a ? a.type : s.node(i + 1).type);
}
function Cf(n, e, t = 1, r) {
  let s = n.doc.resolve(e),
    i = C.empty,
    o = C.empty;
  for (let l = s.depth, a = s.depth - t, c = t - 1; l > a; l--, c--) {
    i = C.from(s.node(l).copy(i));
    let u = r && r[c];
    o = C.from(u ? u.type.create(u.attrs, o) : s.node(l).copy(o));
  }
  n.step(new te(e, e, new A(i.append(o), t, t), !0));
}
function St(n, e) {
  let t = n.resolve(e),
    r = t.index();
  return Cc(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Sf(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount),
    { linebreakReplacement: r } = n.type.schema;
  for (let s = 0; s < e.childCount; s++) {
    let i = e.child(s),
      o = i.type == r ? n.type.schema.nodes.text : i.type;
    if (((t = t.matchType(o)), !t || !n.type.allowsMarks(i.marks))) return !1;
  }
  return t.validEnd;
}
function Cc(n, e) {
  return !!(n && e && !n.isLeaf && Sf(n, e));
}
function ds(n, e, t = -1) {
  let r = n.resolve(e);
  for (let s = r.depth; ; s--) {
    let i,
      o,
      l = r.index(s);
    if (
      (s == r.depth
        ? ((i = r.nodeBefore), (o = r.nodeAfter))
        : t > 0
          ? ((i = r.node(s + 1)), l++, (o = r.node(s).maybeChild(l)))
          : ((i = r.node(s).maybeChild(l - 1)), (o = r.node(s + 1))),
      i && !i.isTextblock && Cc(i, o) && r.node(s).canReplace(l, l + 1))
    )
      return e;
    if (s == 0) break;
    e = t < 0 ? r.before(s) : r.after(s);
  }
}
function vf(n, e, t) {
  let r = null,
    { linebreakReplacement: s } = n.doc.type.schema,
    i = n.doc.resolve(e - t),
    o = i.node().type;
  if (s && o.inlineContent) {
    let u = o.whitespace == 'pre',
      d = !!o.contentMatch.matchType(s);
    u && !d ? (r = !1) : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    kc(n, u.node(), u.before(), l);
  }
  o.inlineContent &&
    Zi(n, e + t - 1, o, i.node().contentMatchAt(i.index()), r == null);
  let a = n.mapping.slice(l),
    c = a.map(e - t);
  if ((n.step(new te(c, a.map(e + t, -1), A.empty, !0)), r === !0)) {
    let u = n.doc.resolve(c);
    xc(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function Mf(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t)) return e;
  if (r.parentOffset == 0)
    for (let s = r.depth - 1; s >= 0; s--) {
      let i = r.index(s);
      if (r.node(s).canReplaceWith(i, i, t)) return r.before(s + 1);
      if (i > 0) return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let s = r.depth - 1; s >= 0; s--) {
      let i = r.indexAfter(s);
      if (r.node(s).canReplaceWith(i, i, t)) return r.after(s + 1);
      if (i < r.node(s).childCount) return null;
    }
  return null;
}
function Sc(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size) return e;
  let s = t.content;
  for (let i = 0; i < t.openStart; i++) s = s.firstChild.content;
  for (let i = 1; i <= (t.openStart == 0 && t.size ? 2 : 1); i++)
    for (let o = r.depth; o >= 0; o--) {
      let l =
          o == r.depth
            ? 0
            : r.pos <= (r.start(o + 1) + r.end(o + 1)) / 2
              ? -1
              : 1,
        a = r.index(o) + (l > 0 ? 1 : 0),
        c = r.node(o),
        u = !1;
      if (i == 1) u = c.canReplace(a, a, s);
      else {
        let d = c.contentMatchAt(a).findWrapping(s.firstChild.type);
        u = d && c.canReplaceWith(a, a, d[0]);
      }
      if (u) return l == 0 ? r.pos : l < 0 ? r.before(o + 1) : r.after(o + 1);
    }
  return null;
}
function hs(n, e, t = e, r = A.empty) {
  if (e == t && !r.size) return null;
  let s = n.resolve(e),
    i = n.resolve(t);
  return vc(s, i, r) ? new te(e, t, r) : new wf(s, i, r).fit();
}
function vc(n, e, t) {
  return (
    !t.openStart &&
    !t.openEnd &&
    n.start() == e.start() &&
    n.parent.canReplace(n.index(), e.index(), t.content)
  );
}
class wf {
  constructor(e, t, r) {
    ((this.$from = e),
      (this.$to = t),
      (this.unplaced = r),
      (this.frontier = []),
      (this.placed = C.empty));
    for (let s = 0; s <= e.depth; s++) {
      let i = e.node(s);
      this.frontier.push({
        type: i.type,
        match: i.contentMatchAt(e.indexAfter(s))
      });
    }
    for (let s = e.depth; s > 0; s--)
      this.placed = C.from(e.node(s).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(),
      t = this.placed.size - this.depth - this.$from.depth,
      r = this.$from,
      s = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!s) return null;
    let i = this.placed,
      o = r.depth,
      l = s.depth;
    for (; o && l && i.childCount == 1; )
      ((i = i.firstChild.content), o--, l--);
    let a = new A(i, o, l);
    return e > -1
      ? new ie(r.pos, e, this.$to.pos, this.$to.end(), a, t)
      : a.size || r.pos != this.$to.pos
        ? new te(r.pos, s.pos, a)
        : null;
  }
  findFittable() {
    let e = this.unplaced.openStart;
    for (
      let t = this.unplaced.content, r = 0, s = this.unplaced.openEnd;
      r < e;
      r++
    ) {
      let i = t.firstChild;
      if ((t.childCount > 1 && (s = 0), i.type.spec.isolating && s <= r)) {
        e = r;
        break;
      }
      t = i.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let s,
          i = null;
        r
          ? ((i = Ds(this.unplaced.content, r - 1).firstChild), (s = i.content))
          : (s = this.unplaced.content);
        let o = s.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l],
            u,
            d = null;
          if (
            t == 1 &&
            (o
              ? c.matchType(o.type) || (d = c.fillBefore(C.from(o), !1))
              : i && a.compatibleContent(i.type))
          )
            return { sliceDepth: r, frontierDepth: l, parent: i, inject: d };
          if (t == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: i, wrap: u };
          if (i && c.matchType(i.type)) break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced,
      s = Ds(e, t);
    return !s.childCount || s.firstChild.isLeaf
      ? !1
      : ((this.unplaced = new A(
          e,
          t + 1,
          Math.max(r, s.size + t >= e.size - r ? t + 1 : 0)
        )),
        !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced,
      s = Ds(e, t);
    if (s.childCount <= 1 && t > 0) {
      let i = e.size - t <= t + s.size;
      this.unplaced = new A(kn(e, t - 1, 1), t - 1, i ? t - 1 : r);
    } else this.unplaced = new A(kn(e, t, 1), t, r);
  }
  placeNodes({
    sliceDepth: e,
    frontierDepth: t,
    parent: r,
    inject: s,
    wrap: i
  }) {
    for (; this.depth > t; ) this.closeFrontierNode();
    if (i) for (let g = 0; g < i.length; g++) this.openFrontierNode(i[g]);
    let o = this.unplaced,
      l = r ? r.content : o.content,
      a = o.openStart - e,
      c = 0,
      u = [],
      { match: d, type: h } = this.frontier[t];
    if (s) {
      for (let g = 0; g < s.childCount; g++) u.push(s.child(g));
      d = d.matchFragment(s);
    }
    let f = l.size + e - (o.content.size - o.openEnd);
    for (; c < l.childCount; ) {
      let g = l.child(c),
        y = d.matchType(g.type);
      if (!y) break;
      (c++,
        (c > 1 || a == 0 || g.content.size) &&
          ((d = y),
          u.push(
            Mc(
              g.mark(h.allowedMarks(g.marks)),
              c == 1 ? a : 0,
              c == l.childCount ? f : -1
            )
          )));
    }
    let m = c == l.childCount;
    (m || (f = -1),
      (this.placed = Cn(this.placed, t, C.from(u))),
      (this.frontier[t].match = d),
      m &&
        f < 0 &&
        r &&
        r.type == this.frontier[this.depth].type &&
        this.frontier.length > 1 &&
        this.closeFrontierNode());
    for (let g = 0, y = l; g < f; g++) {
      let b = y.lastChild;
      (this.frontier.push({
        type: b.type,
        match: b.contentMatchAt(b.childCount)
      }),
        (y = b.content));
    }
    this.unplaced = m
      ? e == 0
        ? A.empty
        : new A(kn(o.content, e - 1, 1), e - 1, f < 0 ? o.openEnd : e - 1)
      : new A(kn(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock) return -1;
    let e = this.frontier[this.depth],
      t;
    if (
      !e.type.isTextblock ||
      !Ps(this.$to, this.$to.depth, e.type, e.match, !1) ||
      (this.$to.depth == this.depth &&
        (t = this.findCloseLevel(this.$to)) &&
        t.depth == this.depth)
    )
      return -1;
    let { depth: r } = this.$to,
      s = this.$to.after(r);
    for (; r > 1 && s == this.$to.end(--r); ) ++s;
    return s;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: s } = this.frontier[t],
        i = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)),
        o = Ps(e, t, s, r, i);
      if (o) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l],
            u = Ps(e, l, c, a, !0);
          if (!u || u.childCount) continue e;
        }
        return {
          depth: t,
          fit: o,
          move: i ? e.doc.resolve(e.after(t + 1)) : e
        };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t) return null;
    for (; this.depth > t.depth; ) this.closeFrontierNode();
    (t.fit.childCount && (this.placed = Cn(this.placed, t.depth, t.fit)),
      (e = t.move));
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let s = e.node(r),
        i = s.type.contentMatch.fillBefore(s.content, !0, e.index(r));
      this.openFrontierNode(s.type, s.attrs, i);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let s = this.frontier[this.depth];
    ((s.match = s.match.matchType(e)),
      (this.placed = Cn(this.placed, this.depth, C.from(e.create(t, r)))),
      this.frontier.push({ type: e, match: e.contentMatch }));
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(C.empty, !0);
    t.childCount && (this.placed = Cn(this.placed, this.frontier.length, t));
  }
}
function kn(n, e, t) {
  return e == 0
    ? n.cutByIndex(t, n.childCount)
    : n.replaceChild(0, n.firstChild.copy(kn(n.firstChild.content, e - 1, t)));
}
function Cn(n, e, t) {
  return e == 0
    ? n.append(t)
    : n.replaceChild(
        n.childCount - 1,
        n.lastChild.copy(Cn(n.lastChild.content, e - 1, t))
      );
}
function Ds(n, e) {
  for (let t = 0; t < e; t++) n = n.firstChild.content;
  return n;
}
function Mc(n, e, t) {
  if (e <= 0) return n;
  let r = n.content;
  return (
    e > 1 &&
      (r = r.replaceChild(
        0,
        Mc(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0)
      )),
    e > 0 &&
      ((r = n.type.contentMatch.fillBefore(r).append(r)),
      t <= 0 &&
        (r = r.append(
          n.type.contentMatch.matchFragment(r).fillBefore(C.empty, !0)
        ))),
    n.copy(r)
  );
}
function Ps(n, e, t, r, s) {
  let i = n.node(e),
    o = s ? n.indexAfter(e) : n.index(e);
  if (o == i.childCount && !t.compatibleContent(i.type)) return null;
  let l = r.fillBefore(i.content, !0, o);
  return l && !Tf(t, i.content, o) ? l : null;
}
function Tf(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks)) return !0;
  return !1;
}
function Ef(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Af(n, e, t, r) {
  if (!r.size) return n.deleteRange(e, t);
  let s = n.doc.resolve(e),
    i = n.doc.resolve(t);
  if (vc(s, i, r)) return n.step(new te(e, t, r));
  let o = Tc(s, i);
  o[o.length - 1] == 0 && o.pop();
  let l = -(s.depth + 1);
  o.unshift(l);
  for (let h = s.depth, f = s.pos - 1; h > 0; h--, f--) {
    let m = s.node(h).type.spec;
    if (m.defining || m.definingAsContext || m.isolating) break;
    o.indexOf(h) > -1 ? (l = h) : s.before(h) == f && o.splice(1, 0, -h);
  }
  let a = o.indexOf(l),
    c = [],
    u = r.openStart;
  for (let h = r.content, f = 0; ; f++) {
    let m = h.firstChild;
    if ((c.push(m), f == r.openStart)) break;
    h = m.content;
  }
  for (let h = u - 1; h >= 0; h--) {
    let f = c[h],
      m = Ef(f.type);
    if (m && !f.sameMarkup(s.node(Math.abs(l) - 1))) u = h;
    else if (m || !f.type.isTextblock) break;
  }
  for (let h = r.openStart; h >= 0; h--) {
    let f = (h + u + 1) % (r.openStart + 1),
      m = c[f];
    if (m)
      for (let g = 0; g < o.length; g++) {
        let y = o[(g + a) % o.length],
          b = !0;
        y < 0 && ((b = !1), (y = -y));
        let x = s.node(y - 1),
          k = s.index(y - 1);
        if (x.canReplaceWith(k, k, m.type, m.marks))
          return n.replace(
            s.before(y),
            b ? i.after(y) : t,
            new A(wc(r.content, 0, r.openStart, f), f, r.openEnd)
          );
      }
  }
  let d = n.steps.length;
  for (
    let h = o.length - 1;
    h >= 0 && (n.replace(e, t, r), !(n.steps.length > d));
    h--
  ) {
    let f = o[h];
    f < 0 || ((e = s.before(f)), (t = i.after(f)));
  }
}
function wc(n, e, t, r, s) {
  if (e < t) {
    let i = n.firstChild;
    n = n.replaceChild(0, i.copy(wc(i.content, e + 1, t, r, i)));
  }
  if (e > r) {
    let i = s.contentMatchAt(0),
      o = i.fillBefore(n).append(n);
    n = o.append(i.matchFragment(o).fillBefore(C.empty, !0));
  }
  return n;
}
function Nf(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let s = Mf(n.doc, e, r.type);
    s != null && (e = t = s);
  }
  n.replaceRange(e, t, new A(C.from(r), 0, 0));
}
function Of(n, e, t) {
  let r = n.doc.resolve(e),
    s = n.doc.resolve(t);
  if (
    r.parent.isTextblock &&
    s.parent.isTextblock &&
    r.start() != s.start() &&
    r.parentOffset == 0 &&
    s.parentOffset == 0
  ) {
    let o = r.sharedDepth(t),
      l = !1;
    for (let a = r.depth; a > o; a--) r.node(a).type.spec.isolating && (l = !0);
    for (let a = s.depth; a > o; a--) s.node(a).type.spec.isolating && (l = !0);
    if (!l) {
      for (let a = r.depth; a > 0 && e == r.start(a); a--) e = r.before(a);
      for (let a = s.depth; a > 0 && t == s.start(a); a--) t = s.before(a);
      ((r = n.doc.resolve(e)), (s = n.doc.resolve(t)));
    }
  }
  let i = Tc(r, s);
  for (let o = 0; o < i.length; o++) {
    let l = i[o],
      a = o == i.length - 1;
    if ((a && l == 0) || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), s.end(l));
    if (
      l > 0 &&
      (a || r.node(l - 1).canReplace(r.index(l - 1), s.indexAfter(l - 1)))
    )
      return n.delete(r.before(l), s.after(l));
  }
  for (let o = 1; o <= r.depth && o <= s.depth; o++)
    if (
      e - r.start(o) == r.depth - o &&
      t > r.end(o) &&
      s.end(o) - t != s.depth - o &&
      r.start(o - 1) == s.start(o - 1) &&
      r.node(o - 1).canReplace(r.index(o - 1), s.index(o - 1))
    )
      return n.delete(r.before(o), t);
  n.delete(e, t);
}
function Tc(n, e) {
  let t = [],
    r = Math.min(n.depth, e.depth);
  for (let s = r; s >= 0; s--) {
    let i = n.start(s);
    if (
      i < n.pos - (n.depth - s) ||
      e.end(s) > e.pos + (e.depth - s) ||
      n.node(s).type.spec.isolating ||
      e.node(s).type.spec.isolating
    )
      break;
    (i == e.start(s) ||
      (s == n.depth &&
        s == e.depth &&
        n.parent.inlineContent &&
        e.parent.inlineContent &&
        s &&
        e.start(s - 1) == i - 1)) &&
      t.push(s);
  }
  return t;
}
class ln extends ge {
  constructor(e, t, r) {
    (super(), (this.pos = e), (this.attr = t), (this.value = r));
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t) return ne.fail("No node at attribute step's position");
    let r = Object.create(null);
    for (let i in t.attrs) r[i] = t.attrs[i];
    r[this.attr] = this.value;
    let s = t.type.create(r, null, t.marks);
    return ne.fromReplace(
      e,
      this.pos,
      this.pos + 1,
      new A(C.from(s), 0, t.isLeaf ? 0 : 1)
    );
  }
  getMap() {
    return we.empty;
  }
  invert(e) {
    return new ln(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new ln(t.pos, this.attr, this.value);
  }
  toJSON() {
    return {
      stepType: 'attr',
      pos: this.pos,
      attr: this.attr,
      value: this.value
    };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != 'number' || typeof t.attr != 'string')
      throw new RangeError('Invalid input for AttrStep.fromJSON');
    return new ln(t.pos, t.attr, t.value);
  }
}
ge.jsonID('attr', ln);
class $n extends ge {
  constructor(e, t) {
    (super(), (this.attr = e), (this.value = t));
  }
  apply(e) {
    let t = Object.create(null);
    for (let s in e.attrs) t[s] = e.attrs[s];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return ne.ok(r);
  }
  getMap() {
    return we.empty;
  }
  invert(e) {
    return new $n(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: 'docAttr', attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != 'string')
      throw new RangeError('Invalid input for DocAttrStep.fromJSON');
    return new $n(t.attr, t.value);
  }
}
ge.jsonID('docAttr', $n);
let cn = class extends Error {};
cn = function n(e) {
  let t = Error.call(this, e);
  return ((t.__proto__ = n.prototype), t);
};
cn.prototype = Object.create(Error.prototype);
cn.prototype.constructor = cn;
cn.prototype.name = 'TransformError';
class Ec {
  constructor(e) {
    ((this.doc = e),
      (this.steps = []),
      (this.docs = []),
      (this.mapping = new zn()));
  }
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed) throw new cn(t.failed);
    return this;
  }
  maybeStep(e) {
    let t = e.apply(this.doc);
    return (t.failed || this.addStep(e, t.doc), t);
  }
  get docChanged() {
    return this.steps.length > 0;
  }
  changedRange() {
    let e = 1e9,
      t = -1e9;
    for (let r = 0; r < this.mapping.maps.length; r++) {
      let s = this.mapping.maps[r];
      (r && ((e = s.map(e, 1)), (t = s.map(t, -1))),
        s.forEach((i, o, l, a) => {
          ((e = Math.min(e, l)), (t = Math.max(t, a)));
        }));
    }
    return e == 1e9 ? null : { from: e, to: t };
  }
  addStep(e, t) {
    (this.docs.push(this.doc),
      this.steps.push(e),
      this.mapping.appendMap(e.getMap()),
      (this.doc = t));
  }
  replace(e, t = e, r = A.empty) {
    let s = hs(this.doc, e, t, r);
    return (s && this.step(s), this);
  }
  replaceWith(e, t, r) {
    return this.replace(e, t, new A(C.from(r), 0, 0));
  }
  delete(e, t) {
    return this.replace(e, t, A.empty);
  }
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  replaceRange(e, t, r) {
    return (Af(this, e, t, r), this);
  }
  replaceRangeWith(e, t, r) {
    return (Nf(this, e, t, r), this);
  }
  deleteRange(e, t) {
    return (Of(this, e, t), this);
  }
  lift(e, t) {
    return (pf(this, e, t), this);
  }
  join(e, t = 1) {
    return (vf(this, e, t), this);
  }
  wrap(e, t) {
    return (yf(this, e, t), this);
  }
  setBlockType(e, t = e, r, s = null) {
    return (bf(this, e, t, r, s), this);
  }
  setNodeMarkup(e, t, r = null, s) {
    return (kf(this, e, t, r, s), this);
  }
  setNodeAttribute(e, t, r) {
    return (this.step(new ln(e, t, r)), this);
  }
  setDocAttribute(e, t) {
    return (this.step(new $n(e, t)), this);
  }
  addNodeMark(e, t) {
    return (this.step(new ft(e, t)), this);
  }
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r) throw new RangeError('No node at position ' + e);
    if (t instanceof U) t.isInSet(r.marks) && this.step(new Ht(e, t));
    else {
      let s = r.marks,
        i,
        o = [];
      for (; (i = t.isInSet(s)); )
        (o.push(new Ht(e, i)), (s = i.removeFromSet(s)));
      for (let l = o.length - 1; l >= 0; l--) this.step(o[l]);
    }
    return this;
  }
  split(e, t = 1, r) {
    return (Cf(this, e, t, r), this);
  }
  addMark(e, t, r) {
    return (df(this, e, t, r), this);
  }
  removeMark(e, t, r) {
    return (hf(this, e, t, r), this);
  }
  clearIncompatible(e, t, r) {
    return (Zi(this, e, t, r), this);
  }
}
const js = Object.create(null);
class z {
  constructor(e, t, r) {
    ((this.$anchor = e),
      (this.$head = t),
      (this.ranges = r || [new If(e.min(t), e.max(t))]));
  }
  get anchor() {
    return this.$anchor.pos;
  }
  get head() {
    return this.$head.pos;
  }
  get from() {
    return this.$from.pos;
  }
  get to() {
    return this.$to.pos;
  }
  get $from() {
    return this.ranges[0].$from;
  }
  get $to() {
    return this.ranges[0].$to;
  }
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos) return !1;
    return !0;
  }
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  replace(e, t = A.empty) {
    let r = t.content.lastChild,
      s = null;
    for (let l = 0; l < t.openEnd; l++) ((s = r), (r = r.lastChild));
    let i = e.steps.length,
      o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: c } = o[l],
        u = e.mapping.slice(i);
      (e.replaceRange(u.map(a.pos), u.map(c.pos), l ? A.empty : t),
        l == 0 && dl(e, i, (r ? r.isInline : s && s.isTextblock) ? -1 : 1));
    }
  }
  replaceWith(e, t) {
    let r = e.steps.length,
      s = this.ranges;
    for (let i = 0; i < s.length; i++) {
      let { $from: o, $to: l } = s[i],
        a = e.mapping.slice(r),
        c = a.map(o.pos),
        u = a.map(l.pos);
      i
        ? e.deleteRange(c, u)
        : (e.replaceRangeWith(c, u, t), dl(e, r, t.isInline ? -1 : 1));
    }
  }
  static findFrom(e, t, r = !1) {
    let s = e.parent.inlineContent
      ? new D(e)
      : tn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (s) return s;
    for (let i = e.depth - 1; i >= 0; i--) {
      let o =
        t < 0
          ? tn(e.node(0), e.node(i), e.before(i + 1), e.index(i), t, r)
          : tn(e.node(0), e.node(i), e.after(i + 1), e.index(i) + 1, t, r);
      if (o) return o;
    }
    return null;
  }
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Te(e.node(0));
  }
  static atStart(e) {
    return tn(e, e, 0, 0, 1) || new Te(e);
  }
  static atEnd(e) {
    return tn(e, e, e.content.size, e.childCount, -1) || new Te(e);
  }
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError('Invalid input for Selection.fromJSON');
    let r = js[t.type];
    if (!r) throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  static jsonID(e, t) {
    if (e in js)
      throw new RangeError('Duplicate use of selection JSON ID ' + e);
    return ((js[e] = t), (t.prototype.jsonID = e), t);
  }
  getBookmark() {
    return D.between(this.$anchor, this.$head).getBookmark();
  }
}
z.prototype.visible = !0;
class If {
  constructor(e, t) {
    ((this.$from = e), (this.$to = t));
  }
}
let cl = !1;
function ul(n) {
  !cl &&
    !n.parent.inlineContent &&
    ((cl = !0),
    console.warn(
      'TextSelection endpoint not pointing into a node with inline content (' +
        n.parent.type.name +
        ')'
    ));
}
class D extends z {
  constructor(e, t = e) {
    (ul(e), ul(t), super(e, t));
  }
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent) return z.near(r);
    let s = e.resolve(t.map(this.anchor));
    return new D(s.parent.inlineContent ? s : r, r);
  }
  replace(e, t = A.empty) {
    if ((super.replace(e, t), t == A.empty)) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof D && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new fs(this.anchor, this.head);
  }
  toJSON() {
    return { type: 'text', anchor: this.anchor, head: this.head };
  }
  static fromJSON(e, t) {
    if (typeof t.anchor != 'number' || typeof t.head != 'number')
      throw new RangeError('Invalid input for TextSelection.fromJSON');
    return new D(e.resolve(t.anchor), e.resolve(t.head));
  }
  static create(e, t, r = t) {
    let s = e.resolve(t);
    return new this(s, r == t ? s : e.resolve(r));
  }
  static between(e, t, r) {
    let s = e.pos - t.pos;
    if (((!r || s) && (r = s >= 0 ? 1 : -1), !t.parent.inlineContent)) {
      let i = z.findFrom(t, r, !0) || z.findFrom(t, -r, !0);
      if (i) t = i.$head;
      else return z.near(t, r);
    }
    return (
      e.parent.inlineContent ||
        (s == 0
          ? (e = t)
          : ((e = (z.findFrom(e, -r, !0) || z.findFrom(e, r, !0)).$anchor),
            e.pos < t.pos != s < 0 && (e = t))),
      new D(e, t)
    );
  }
}
z.jsonID('text', D);
class fs {
  constructor(e, t) {
    ((this.anchor = e), (this.head = t));
  }
  map(e) {
    return new fs(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return D.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class I extends z {
  constructor(e) {
    let t = e.nodeAfter,
      r = e.node(0).resolve(e.pos + t.nodeSize);
    (super(e, r), (this.node = t));
  }
  map(e, t) {
    let { deleted: r, pos: s } = t.mapResult(this.anchor),
      i = e.resolve(s);
    return r ? z.near(i) : new I(i);
  }
  content() {
    return new A(C.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof I && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: 'node', anchor: this.anchor };
  }
  getBookmark() {
    return new to(this.anchor);
  }
  static fromJSON(e, t) {
    if (typeof t.anchor != 'number')
      throw new RangeError('Invalid input for NodeSelection.fromJSON');
    return new I(e.resolve(t.anchor));
  }
  static create(e, t) {
    return new I(e.resolve(t));
  }
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
I.prototype.visible = !1;
z.jsonID('node', I);
class to {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new fs(r, r) : new to(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor),
      r = t.nodeAfter;
    return r && I.isSelectable(r) ? new I(t) : z.near(t);
  }
}
class Te extends z {
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = A.empty) {
    if (t == A.empty) {
      e.delete(0, e.doc.content.size);
      let r = z.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else super.replace(e, t);
  }
  toJSON() {
    return { type: 'all' };
  }
  static fromJSON(e) {
    return new Te(e);
  }
  map(e) {
    return new Te(e);
  }
  eq(e) {
    return e instanceof Te;
  }
  getBookmark() {
    return Rf;
  }
}
z.jsonID('all', Te);
const Rf = {
  map() {
    return this;
  },
  resolve(n) {
    return new Te(n);
  }
};
function tn(n, e, t, r, s, i = !1) {
  if (e.inlineContent) return D.create(n, t);
  for (let o = r - (s > 0 ? 0 : 1); s > 0 ? o < e.childCount : o >= 0; o += s) {
    let l = e.child(o);
    if (l.isAtom) {
      if (!i && I.isSelectable(l))
        return I.create(n, t - (s < 0 ? l.nodeSize : 0));
    } else {
      let a = tn(n, l, t + s, s < 0 ? l.childCount : 0, s, i);
      if (a) return a;
    }
    t += l.nodeSize * s;
  }
  return null;
}
function dl(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e) return;
  let s = n.steps[r];
  if (!(s instanceof te || s instanceof ie)) return;
  let i = n.mapping.maps[r],
    o;
  (i.forEach((l, a, c, u) => {
    o == null && (o = u);
  }),
    n.setSelection(z.near(n.doc.resolve(o), t)));
}
const hl = 1,
  nr = 2,
  fl = 4;
class Lf extends Ec {
  constructor(e) {
    (super(e.doc),
      (this.curSelectionFor = 0),
      (this.updated = 0),
      (this.meta = Object.create(null)),
      (this.time = Date.now()),
      (this.curSelection = e.selection),
      (this.storedMarks = e.storedMarks));
  }
  get selection() {
    return (
      this.curSelectionFor < this.steps.length &&
        ((this.curSelection = this.curSelection.map(
          this.doc,
          this.mapping.slice(this.curSelectionFor)
        )),
        (this.curSelectionFor = this.steps.length)),
      this.curSelection
    );
  }
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError(
        'Selection passed to setSelection must point at the current document'
      );
    return (
      (this.curSelection = e),
      (this.curSelectionFor = this.steps.length),
      (this.updated = (this.updated | hl) & ~nr),
      (this.storedMarks = null),
      this
    );
  }
  get selectionSet() {
    return (this.updated & hl) > 0;
  }
  setStoredMarks(e) {
    return ((this.storedMarks = e), (this.updated |= nr), this);
  }
  ensureMarks(e) {
    return (
      U.sameSet(this.storedMarks || this.selection.$from.marks(), e) ||
        this.setStoredMarks(e),
      this
    );
  }
  addStoredMark(e) {
    return this.ensureMarks(
      e.addToSet(this.storedMarks || this.selection.$head.marks())
    );
  }
  removeStoredMark(e) {
    return this.ensureMarks(
      e.removeFromSet(this.storedMarks || this.selection.$head.marks())
    );
  }
  get storedMarksSet() {
    return (this.updated & nr) > 0;
  }
  addStep(e, t) {
    (super.addStep(e, t),
      (this.updated = this.updated & ~nr),
      (this.storedMarks = null));
  }
  setTime(e) {
    return ((this.time = e), this);
  }
  replaceSelection(e) {
    return (this.selection.replace(this, e), this);
  }
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return (
      t &&
        (e = e.mark(
          this.storedMarks ||
            (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || U.none)
        )),
      r.replaceWith(this, e),
      this
    );
  }
  deleteSelection() {
    return (this.selection.replace(this), this);
  }
  insertText(e, t, r) {
    let s = this.doc.type.schema;
    if (t == null)
      return e
        ? this.replaceSelectionWith(s.text(e), !0)
        : this.deleteSelection();
    {
      if ((r == null && (r = t), !e)) return this.deleteRange(t, r);
      let i = this.storedMarks;
      if (!i) {
        let o = this.doc.resolve(t);
        i = r == t ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return (
        this.replaceRangeWith(t, r, s.text(e, i)),
        !this.selection.empty &&
          this.selection.to == t + e.length &&
          this.setSelection(z.near(this.selection.$to)),
        this
      );
    }
  }
  setMeta(e, t) {
    return ((this.meta[typeof e == 'string' ? e : e.key] = t), this);
  }
  getMeta(e) {
    return this.meta[typeof e == 'string' ? e : e.key];
  }
  get isGeneric() {
    for (let e in this.meta) return !1;
    return !0;
  }
  scrollIntoView() {
    return ((this.updated |= fl), this);
  }
  get scrolledIntoView() {
    return (this.updated & fl) > 0;
  }
}
function pl(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Sn {
  constructor(e, t, r) {
    ((this.name = e),
      (this.init = pl(t.init, r)),
      (this.apply = pl(t.apply, r)));
  }
}
const Df = [
  new Sn('doc', {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new Sn('selection', {
    init(n, e) {
      return n.selection || z.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new Sn('storedMarks', {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new Sn('scrollToSelection', {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class Bs {
  constructor(e, t) {
    ((this.schema = e),
      (this.plugins = []),
      (this.pluginsByKey = Object.create(null)),
      (this.fields = Df.slice()),
      t &&
        t.forEach(r => {
          if (this.pluginsByKey[r.key])
            throw new RangeError(
              'Adding different instances of a keyed plugin (' + r.key + ')'
            );
          (this.plugins.push(r),
            (this.pluginsByKey[r.key] = r),
            r.spec.state && this.fields.push(new Sn(r.key, r.spec.state, r)));
        }));
  }
}
class sn {
  constructor(e) {
    this.config = e;
  }
  get schema() {
    return this.config.schema;
  }
  get plugins() {
    return this.config.plugins;
  }
  apply(e) {
    return this.applyTransaction(e).state;
  }
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let s = this.config.plugins[r];
        if (
          s.spec.filterTransaction &&
          !s.spec.filterTransaction.call(s, e, this)
        )
          return !1;
      }
    return !0;
  }
  applyTransaction(e) {
    if (!this.filterTransaction(e)) return { state: this, transactions: [] };
    let t = [e],
      r = this.applyInner(e),
      s = null;
    for (;;) {
      let i = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = s ? s[o].n : 0,
            c = s ? s[o].state : this,
            u =
              a < t.length &&
              l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (u && r.filterTransaction(u, o)) {
            if ((u.setMeta('appendedTransaction', e), !s)) {
              s = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                s.push(
                  d < o ? { state: r, n: t.length } : { state: this, n: 0 }
                );
            }
            (t.push(u), (r = r.applyInner(u)), (i = !0));
          }
          s && (s[o] = { state: r, n: t.length });
        }
      }
      if (!i) return { state: r, transactions: t };
    }
  }
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError('Applying a mismatched transaction');
    let t = new sn(this.config),
      r = this.config.fields;
    for (let s = 0; s < r.length; s++) {
      let i = r[s];
      t[i.name] = i.apply(e, this[i.name], this, t);
    }
    return t;
  }
  get tr() {
    return new Lf(this);
  }
  static create(e) {
    let t = new Bs(e.doc ? e.doc.type.schema : e.schema, e.plugins),
      r = new sn(t);
    for (let s = 0; s < t.fields.length; s++)
      r[t.fields[s].name] = t.fields[s].init(e, r);
    return r;
  }
  reconfigure(e) {
    let t = new Bs(this.schema, e.plugins),
      r = t.fields,
      s = new sn(t);
    for (let i = 0; i < r.length; i++) {
      let o = r[i].name;
      s[o] = this.hasOwnProperty(o) ? this[o] : r[i].init(e, s);
    }
    return s;
  }
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (
      (this.storedMarks &&
        (t.storedMarks = this.storedMarks.map(r => r.toJSON())),
      e && typeof e == 'object')
    )
      for (let r in e) {
        if (r == 'doc' || r == 'selection')
          throw new RangeError(
            'The JSON fields `doc` and `selection` are reserved'
          );
        let s = e[r],
          i = s.spec.state;
        i && i.toJSON && (t[r] = i.toJSON.call(s, this[s.key]));
      }
    return t;
  }
  static fromJSON(e, t, r) {
    if (!t) throw new RangeError('Invalid input for EditorState.fromJSON');
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let s = new Bs(e.schema, e.plugins),
      i = new sn(s);
    return (
      s.fields.forEach(o => {
        if (o.name == 'doc') i.doc = He.fromJSON(e.schema, t.doc);
        else if (o.name == 'selection')
          i.selection = z.fromJSON(i.doc, t.selection);
        else if (o.name == 'storedMarks')
          t.storedMarks &&
            (i.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
        else {
          if (r)
            for (let l in r) {
              let a = r[l],
                c = a.spec.state;
              if (
                a.key == o.name &&
                c &&
                c.fromJSON &&
                Object.prototype.hasOwnProperty.call(t, l)
              ) {
                i[o.name] = c.fromJSON.call(a, e, t[l], i);
                return;
              }
            }
          i[o.name] = o.init(e, i);
        }
      }),
      i
    );
  }
}
function Ac(n, e, t) {
  for (let r in n) {
    let s = n[r];
    (s instanceof Function
      ? (s = s.bind(e))
      : r == 'handleDOMEvents' && (s = Ac(s, e, {})),
      (t[r] = s));
  }
  return t;
}
class X {
  constructor(e) {
    ((this.spec = e),
      (this.props = {}),
      e.props && Ac(e.props, this, this.props),
      (this.key = e.key ? e.key.key : Nc('plugin')));
  }
  getState(e) {
    return e[this.key];
  }
}
const zs = Object.create(null);
function Nc(n) {
  return n in zs ? n + '$' + ++zs[n] : ((zs[n] = 0), n + '$');
}
class se {
  constructor(e = 'key') {
    this.key = Nc(e);
  }
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  getState(e) {
    return e[this.key];
  }
}
const no = (n, e) =>
  n.selection.empty
    ? !1
    : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Oc(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock('backward', n) : t.parentOffset > 0)
    ? null
    : t;
}
const Ic = (n, e, t) => {
    let r = Oc(n, t);
    if (!r) return !1;
    let s = ro(r);
    if (!s) {
      let o = r.blockRange(),
        l = o && mn(o);
      return l == null ? !1 : (e && e(n.tr.lift(o, l).scrollIntoView()), !0);
    }
    let i = s.nodeBefore;
    if (Hc(n, s, e, -1)) return !0;
    if (r.parent.content.size == 0 && (un(i, 'end') || I.isSelectable(i)))
      for (let o = r.depth; ; o--) {
        let l = hs(n.doc, r.before(o), r.after(o), A.empty);
        if (l && l.slice.size < l.to - l.from) {
          if (e) {
            let a = n.tr.step(l);
            (a.setSelection(
              un(i, 'end')
                ? z.findFrom(a.doc.resolve(a.mapping.map(s.pos, -1)), -1)
                : I.create(a.doc, s.pos - i.nodeSize)
            ),
              e(a.scrollIntoView()));
          }
          return !0;
        }
        if (o == 1 || r.node(o - 1).childCount > 1) break;
      }
    return i.isAtom && s.depth == r.depth - 1
      ? (e && e(n.tr.delete(s.pos - i.nodeSize, s.pos).scrollIntoView()), !0)
      : !1;
  },
  Pf = (n, e, t) => {
    let r = Oc(n, t);
    if (!r) return !1;
    let s = ro(r);
    return s ? Rc(n, s, e) : !1;
  },
  jf = (n, e, t) => {
    let r = Dc(n, t);
    if (!r) return !1;
    let s = so(r);
    return s ? Rc(n, s, e) : !1;
  };
function Rc(n, e, t) {
  let r = e.nodeBefore,
    s = r,
    i = e.pos - 1;
  for (; !s.isTextblock; i--) {
    if (s.type.spec.isolating) return !1;
    let u = s.lastChild;
    if (!u) return !1;
    s = u;
  }
  let o = e.nodeAfter,
    l = o,
    a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating) return !1;
    let u = l.firstChild;
    if (!u) return !1;
    l = u;
  }
  let c = hs(n.doc, i, a, A.empty);
  if (!c || c.from != i || (c instanceof te && c.slice.size >= a - i))
    return !1;
  if (t) {
    let u = n.tr.step(c);
    (u.setSelection(D.create(u.doc, i)), t(u.scrollIntoView()));
  }
  return !0;
}
function un(n, e, t = !1) {
  for (let r = n; r; r = e == 'start' ? r.firstChild : r.lastChild) {
    if (r.isTextblock) return !0;
    if (t && r.childCount != 1) return !1;
  }
  return !1;
}
const Lc = (n, e, t) => {
  let { $head: r, empty: s } = n.selection,
    i = r;
  if (!s) return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock('backward', n) : r.parentOffset > 0) return !1;
    i = ro(r);
  }
  let o = i && i.nodeBefore;
  return !o || !I.isSelectable(o)
    ? !1
    : (e &&
        e(
          n.tr
            .setSelection(I.create(n.doc, i.pos - o.nodeSize))
            .scrollIntoView()
        ),
      !0);
};
function ro(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0) return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating) break;
    }
  return null;
}
function Dc(n, e) {
  let { $cursor: t } = n.selection;
  return !t ||
    (e
      ? !e.endOfTextblock('forward', n)
      : t.parentOffset < t.parent.content.size)
    ? null
    : t;
}
const Pc = (n, e, t) => {
    let r = Dc(n, t);
    if (!r) return !1;
    let s = so(r);
    if (!s) return !1;
    let i = s.nodeAfter;
    if (Hc(n, s, e, 1)) return !0;
    if (r.parent.content.size == 0 && (un(i, 'start') || I.isSelectable(i))) {
      let o = hs(n.doc, r.before(), r.after(), A.empty);
      if (o && o.slice.size < o.to - o.from) {
        if (e) {
          let l = n.tr.step(o);
          (l.setSelection(
            un(i, 'start')
              ? z.findFrom(l.doc.resolve(l.mapping.map(s.pos)), 1)
              : I.create(l.doc, l.mapping.map(s.pos))
          ),
            e(l.scrollIntoView()));
        }
        return !0;
      }
    }
    return i.isAtom && s.depth == r.depth - 1
      ? (e && e(n.tr.delete(s.pos, s.pos + i.nodeSize).scrollIntoView()), !0)
      : !1;
  },
  jc = (n, e, t) => {
    let { $head: r, empty: s } = n.selection,
      i = r;
    if (!s) return !1;
    if (r.parent.isTextblock) {
      if (
        t
          ? !t.endOfTextblock('forward', n)
          : r.parentOffset < r.parent.content.size
      )
        return !1;
      i = so(r);
    }
    let o = i && i.nodeAfter;
    return !o || !I.isSelectable(o)
      ? !1
      : (e && e(n.tr.setSelection(I.create(n.doc, i.pos)).scrollIntoView()),
        !0);
  };
function so(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount) return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating) break;
    }
  return null;
}
const Bf = (n, e) => {
    let t = n.selection,
      r = t instanceof I,
      s;
    if (r) {
      if (t.node.isTextblock || !St(n.doc, t.from)) return !1;
      s = t.from;
    } else if (((s = ds(n.doc, t.from, -1)), s == null)) return !1;
    if (e) {
      let i = n.tr.join(s);
      (r &&
        i.setSelection(
          I.create(i.doc, s - n.doc.resolve(s).nodeBefore.nodeSize)
        ),
        e(i.scrollIntoView()));
    }
    return !0;
  },
  zf = (n, e) => {
    let t = n.selection,
      r;
    if (t instanceof I) {
      if (t.node.isTextblock || !St(n.doc, t.to)) return !1;
      r = t.to;
    } else if (((r = ds(n.doc, t.to, 1)), r == null)) return !1;
    return (e && e(n.tr.join(r).scrollIntoView()), !0);
  },
  $f = (n, e) => {
    let { $from: t, $to: r } = n.selection,
      s = t.blockRange(r),
      i = s && mn(s);
    return i == null ? !1 : (e && e(n.tr.lift(s, i).scrollIntoView()), !0);
  },
  Bc = (n, e) => {
    let { $head: t, $anchor: r } = n.selection;
    return !t.parent.type.spec.code || !t.sameParent(r)
      ? !1
      : (e &&
          e(
            n.tr
              .insertText(
                `
`
              )
              .scrollIntoView()
          ),
        !0);
  };
function io(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const Hf = (n, e) => {
    let { $head: t, $anchor: r } = n.selection;
    if (!t.parent.type.spec.code || !t.sameParent(r)) return !1;
    let s = t.node(-1),
      i = t.indexAfter(-1),
      o = io(s.contentMatchAt(i));
    if (!o || !s.canReplaceWith(i, i, o)) return !1;
    if (e) {
      let l = t.after(),
        a = n.tr.replaceWith(l, l, o.createAndFill());
      (a.setSelection(z.near(a.doc.resolve(l), 1)), e(a.scrollIntoView()));
    }
    return !0;
  },
  zc = (n, e) => {
    let t = n.selection,
      { $from: r, $to: s } = t;
    if (t instanceof Te || r.parent.inlineContent || s.parent.inlineContent)
      return !1;
    let i = io(s.parent.contentMatchAt(s.indexAfter()));
    if (!i || !i.isTextblock) return !1;
    if (e) {
      let o = (!r.parentOffset && s.index() < s.parent.childCount ? r : s).pos,
        l = n.tr.insert(o, i.createAndFill());
      (l.setSelection(D.create(l.doc, o + 1)), e(l.scrollIntoView()));
    }
    return !0;
  },
  $c = (n, e) => {
    let { $cursor: t } = n.selection;
    if (!t || t.parent.content.size) return !1;
    if (t.depth > 1 && t.after() != t.end(-1)) {
      let i = t.before();
      if (tt(n.doc, i)) return (e && e(n.tr.split(i).scrollIntoView()), !0);
    }
    let r = t.blockRange(),
      s = r && mn(r);
    return s == null ? !1 : (e && e(n.tr.lift(r, s).scrollIntoView()), !0);
  };
function Ff(n) {
  return (e, t) => {
    let { $from: r, $to: s } = e.selection;
    if (e.selection instanceof I && e.selection.node.isBlock)
      return !r.parentOffset || !tt(e.doc, r.pos)
        ? !1
        : (t && t(e.tr.split(r.pos).scrollIntoView()), !0);
    if (!r.depth) return !1;
    let i = [],
      o,
      l,
      a = !1,
      c = !1;
    for (let f = r.depth; ; f--)
      if (r.node(f).isBlock) {
        ((a = r.end(f) == r.pos + (r.depth - f)),
          (c = r.start(f) == r.pos - (r.depth - f)),
          (l = io(r.node(f - 1).contentMatchAt(r.indexAfter(f - 1)))),
          i.unshift(a && l ? { type: l } : null),
          (o = f));
        break;
      } else {
        if (f == 1) return !1;
        i.unshift(null);
      }
    let u = e.tr;
    (e.selection instanceof D || e.selection instanceof Te) &&
      u.deleteSelection();
    let d = u.mapping.map(r.pos),
      h = tt(u.doc, d, i.length, i);
    if (
      (h || ((i[0] = l ? { type: l } : null), (h = tt(u.doc, d, i.length, i))),
      !h)
    )
      return !1;
    if ((u.split(d, i.length, i), !a && c && r.node(o).type != l)) {
      let f = u.mapping.map(r.before(o)),
        m = u.doc.resolve(f);
      l &&
        r.node(o - 1).canReplaceWith(m.index(), m.index() + 1, l) &&
        u.setNodeMarkup(u.mapping.map(r.before(o)), l);
    }
    return (t && t(u.scrollIntoView()), !0);
  };
}
const _f = Ff(),
  Vf = (n, e) => {
    let { $from: t, to: r } = n.selection,
      s,
      i = t.sharedDepth(r);
    return i == 0
      ? !1
      : ((s = t.before(i)), e && e(n.tr.setSelection(I.create(n.doc, s))), !0);
  };
function Wf(n, e, t) {
  let r = e.nodeBefore,
    s = e.nodeAfter,
    i = e.index();
  return !r || !s || !r.type.compatibleContent(s.type)
    ? !1
    : !r.content.size && e.parent.canReplace(i - 1, i)
      ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0)
      : !e.parent.canReplace(i, i + 1) || !(s.isTextblock || St(n.doc, e.pos))
        ? !1
        : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Hc(n, e, t, r) {
  let s = e.nodeBefore,
    i = e.nodeAfter,
    o,
    l,
    a = s.type.spec.isolating || i.type.spec.isolating;
  if (!a && Wf(n, e, t)) return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (
    c &&
    (o = (l = s.contentMatchAt(s.childCount)).findWrapping(i.type)) &&
    l.matchType(o[0] || i.type).validEnd
  ) {
    if (t) {
      let f = e.pos + i.nodeSize,
        m = C.empty;
      for (let b = o.length - 1; b >= 0; b--) m = C.from(o[b].create(null, m));
      m = C.from(s.copy(m));
      let g = n.tr.step(
          new ie(e.pos - 1, f, e.pos, f, new A(m, 1, 0), o.length, !0)
        ),
        y = g.doc.resolve(f + 2 * o.length);
      (y.nodeAfter &&
        y.nodeAfter.type == s.type &&
        St(g.doc, y.pos) &&
        g.join(y.pos),
        t(g.scrollIntoView()));
    }
    return !0;
  }
  let u = i.type.spec.isolating || (r > 0 && a) ? null : z.findFrom(e, 1),
    d = u && u.$from.blockRange(u.$to),
    h = d && mn(d);
  if (h != null && h >= e.depth)
    return (t && t(n.tr.lift(d, h).scrollIntoView()), !0);
  if (c && un(i, 'start', !0) && un(s, 'end')) {
    let f = s,
      m = [];
    for (; m.push(f), !f.isTextblock; ) f = f.lastChild;
    let g = i,
      y = 1;
    for (; !g.isTextblock; g = g.firstChild) y++;
    if (f.canReplace(f.childCount, f.childCount, g.content)) {
      if (t) {
        let b = C.empty;
        for (let k = m.length - 1; k >= 0; k--) b = C.from(m[k].copy(b));
        let x = n.tr.step(
          new ie(
            e.pos - m.length,
            e.pos + i.nodeSize,
            e.pos + y,
            e.pos + i.nodeSize - y,
            new A(b, m.length, 0),
            0,
            !0
          )
        );
        t(x.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Fc(n) {
  return function (e, t) {
    let r = e.selection,
      s = n < 0 ? r.$from : r.$to,
      i = s.depth;
    for (; s.node(i).isInline; ) {
      if (!i) return !1;
      i--;
    }
    return s.node(i).isTextblock
      ? (t &&
          t(e.tr.setSelection(D.create(e.doc, n < 0 ? s.start(i) : s.end(i)))),
        !0)
      : !1;
  };
}
const Uf = Fc(-1),
  qf = Fc(1);
function Kf(n, e = null) {
  return function (t, r) {
    let { $from: s, $to: i } = t.selection,
      o = s.blockRange(i),
      l = o && eo(o, n, e);
    return l ? (r && r(t.tr.wrap(o, l).scrollIntoView()), !0) : !1;
  };
}
function ml(n, e = null) {
  return function (t, r) {
    let s = !1;
    for (let i = 0; i < t.selection.ranges.length && !s; i++) {
      let {
        $from: { pos: o },
        $to: { pos: l }
      } = t.selection.ranges[i];
      t.doc.nodesBetween(o, l, (a, c) => {
        if (s) return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n) s = !0;
          else {
            let u = t.doc.resolve(c),
              d = u.index();
            s = u.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!s) return !1;
    if (r) {
      let i = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let {
          $from: { pos: l },
          $to: { pos: a }
        } = t.selection.ranges[o];
        i.setBlockType(l, a, n, e);
      }
      r(i.scrollIntoView());
    }
    return !0;
  };
}
function oo(...n) {
  return function (e, t, r) {
    for (let s = 0; s < n.length; s++) if (n[s](e, t, r)) return !0;
    return !1;
  };
}
oo(no, Ic, Lc);
oo(no, Pc, jc);
oo(Bc, zc, $c, _f);
typeof navigator < 'u'
  ? /Mac|iP(hone|[oa]d)/.test(navigator.platform)
  : typeof os < 'u' && os.platform && os.platform() == 'darwin';
function Jf(n, e = null) {
  return function (t, r) {
    let { $from: s, $to: i } = t.selection,
      o = s.blockRange(i);
    if (!o) return !1;
    let l = r ? t.tr : null;
    return Gf(l, o, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Gf(n, e, t, r = null) {
  let s = !1,
    i = e,
    o = e.$from.doc;
  if (
    e.depth >= 2 &&
    e.$from.node(e.depth - 1).type.compatibleContent(t) &&
    e.startIndex == 0
  ) {
    if (e.$from.index(e.depth - 1) == 0) return !1;
    let a = o.resolve(e.start - 2);
    ((i = new vr(a, a, e.depth)),
      e.endIndex < e.parent.childCount &&
        (e = new vr(e.$from, o.resolve(e.$to.end(e.depth)), e.depth)),
      (s = !0));
  }
  let l = eo(i, t, r, e);
  return l ? (n && Yf(n, e, l, s, t), !0) : !1;
}
function Yf(n, e, t, r, s) {
  let i = C.empty;
  for (let u = t.length - 1; u >= 0; u--)
    i = C.from(t[u].type.create(t[u].attrs, i));
  n.step(
    new ie(
      e.start - (r ? 2 : 0),
      e.end,
      e.start,
      e.end,
      new A(i, 0, 0),
      t.length,
      !0
    )
  );
  let o = 0;
  for (let u = 0; u < t.length; u++) t[u].type == s && (o = u + 1);
  let l = t.length - o,
    a = e.start + t.length - (r ? 2 : 0),
    c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, h = !0; u < d; u++, h = !1)
    (!h && tt(n.doc, a, l) && (n.split(a, l), (a += 2 * l)),
      (a += c.child(u).nodeSize));
  return n;
}
function Xf(n) {
  return function (e, t) {
    let { $from: r, $to: s } = e.selection,
      i = r.blockRange(s, o => o.childCount > 0 && o.firstChild.type == n);
    return i
      ? t
        ? r.node(i.depth - 1).type == n
          ? Qf(e, t, n, i)
          : Zf(e, t, i)
        : !0
      : !1;
  };
}
function Qf(n, e, t, r) {
  let s = n.tr,
    i = r.end,
    o = r.$to.end(r.depth);
  i < o &&
    (s.step(
      new ie(
        i - 1,
        o,
        i,
        o,
        new A(C.from(t.create(null, r.parent.copy())), 1, 0),
        1,
        !0
      )
    ),
    (r = new vr(s.doc.resolve(r.$from.pos), s.doc.resolve(o), r.depth)));
  const l = mn(r);
  if (l == null) return !1;
  s.lift(r, l);
  let a = s.doc.resolve(s.mapping.map(i, -1) - 1);
  return (
    St(s.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && s.join(a.pos),
    e(s.scrollIntoView()),
    !0
  );
}
function Zf(n, e, t) {
  let r = n.tr,
    s = t.parent;
  for (let f = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    ((f -= s.child(m).nodeSize), r.delete(f - 1, f + 1));
  let i = r.doc.resolve(t.start),
    o = i.nodeAfter;
  if (r.mapping.map(t.end) != t.start + i.nodeAfter.nodeSize) return !1;
  let l = t.startIndex == 0,
    a = t.endIndex == s.childCount,
    c = i.node(-1),
    u = i.index(-1);
  if (
    !c.canReplace(
      u + (l ? 0 : 1),
      u + 1,
      o.content.append(a ? C.empty : C.from(s))
    )
  )
    return !1;
  let d = i.pos,
    h = d + o.nodeSize;
  return (
    r.step(
      new ie(
        d - (l ? 1 : 0),
        h + (a ? 1 : 0),
        d + 1,
        h - 1,
        new A(
          (l ? C.empty : C.from(s.copy(C.empty))).append(
            a ? C.empty : C.from(s.copy(C.empty))
          ),
          l ? 0 : 1,
          a ? 0 : 1
        ),
        l ? 0 : 1
      )
    ),
    e(r.scrollIntoView()),
    !0
  );
}
function ep(n) {
  return function (e, t) {
    let { $from: r, $to: s } = e.selection,
      i = r.blockRange(s, c => c.childCount > 0 && c.firstChild.type == n);
    if (!i) return !1;
    let o = i.startIndex;
    if (o == 0) return !1;
    let l = i.parent,
      a = l.child(o - 1);
    if (a.type != n) return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type,
        u = C.from(c ? n.create() : null),
        d = new A(
          C.from(n.create(null, C.from(l.type.create(null, u)))),
          c ? 3 : 1,
          0
        ),
        h = i.start,
        f = i.end;
      t(e.tr.step(new ie(h - (c ? 3 : 1), f, h, f, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
const ue = function (n) {
    for (var e = 0; ; e++) if (((n = n.previousSibling), !n)) return e;
  },
  dn = function (n) {
    let e = n.assignedSlot || n.parentNode;
    return e && e.nodeType == 11 ? e.host : e;
  };
let bi = null;
const Ze = function (n, e, t) {
    let r = bi || (bi = document.createRange());
    return (r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r);
  },
  tp = function () {
    bi = null;
  },
  Ft = function (n, e, t, r) {
    return t && (gl(n, e, t, r, -1) || gl(n, e, t, r, 1));
  },
  np = /^(img|br|input|textarea|hr)$/i;
function gl(n, e, t, r, s) {
  for (var i; ; ) {
    if (n == t && e == r) return !0;
    if (e == (s < 0 ? 0 : Re(n))) {
      let o = n.parentNode;
      if (
        !o ||
        o.nodeType != 1 ||
        Jn(n) ||
        np.test(n.nodeName) ||
        n.contentEditable == 'false'
      )
        return !1;
      ((e = ue(n) + (s < 0 ? 0 : 1)), (n = o));
    } else if (n.nodeType == 1) {
      let o = n.childNodes[e + (s < 0 ? -1 : 0)];
      if (o.nodeType == 1 && o.contentEditable == 'false')
        if (
          !((i = o.pmViewDesc) === null || i === void 0) &&
          i.ignoreForSelection
        )
          e += s;
        else return !1;
      else ((n = o), (e = s < 0 ? Re(n) : 0));
    } else return !1;
  }
}
function Re(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function rp(n, e) {
  for (;;) {
    if (n.nodeType == 3 && e) return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == 'false') return null;
      ((n = n.childNodes[e - 1]), (e = Re(n)));
    } else if (n.parentNode && !Jn(n)) ((e = ue(n)), (n = n.parentNode));
    else return null;
  }
}
function sp(n, e) {
  for (;;) {
    if (n.nodeType == 3 && e < n.nodeValue.length) return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == 'false') return null;
      ((n = n.childNodes[e]), (e = 0));
    } else if (n.parentNode && !Jn(n)) ((e = ue(n) + 1), (n = n.parentNode));
    else return null;
  }
}
function ip(n, e, t) {
  for (let r = e == 0, s = e == Re(n); r || s; ) {
    if (n == t) return !0;
    let i = ue(n);
    if (((n = n.parentNode), !n)) return !1;
    ((r = r && i == 0), (s = s && i == Re(n)));
  }
}
function Jn(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode);
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const ps = function (n) {
  return (
    n.focusNode && Ft(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset)
  );
};
function Et(n, e) {
  let t = document.createEvent('Event');
  return (
    t.initEvent('keydown', !0, !0),
    (t.keyCode = n),
    (t.key = t.code = e),
    t
  );
}
function op(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; ) e = e.shadowRoot.activeElement;
  return e;
}
function lp(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return {
          node: r.offsetNode,
          offset: Math.min(Re(r.offsetNode), r.offset)
        };
    } catch {}
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return {
        node: r.startContainer,
        offset: Math.min(Re(r.startContainer), r.startOffset)
      };
  }
}
const We = typeof navigator < 'u' ? navigator : null,
  yl = typeof document < 'u' ? document : null,
  vt = (We && We.userAgent) || '',
  xi = /Edge\/(\d+)/.exec(vt),
  _c = /MSIE \d/.exec(vt),
  ki = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(vt),
  Me = !!(_c || ki || xi),
  gt = _c ? document.documentMode : ki ? +ki[1] : xi ? +xi[1] : 0,
  De = !Me && /gecko\/(\d+)/i.test(vt);
De && +(/Firefox\/(\d+)/.exec(vt) || [0, 0])[1];
const Ci = !Me && /Chrome\/(\d+)/.exec(vt),
  he = !!Ci,
  Vc = Ci ? +Ci[1] : 0,
  me = !Me && !!We && /Apple Computer/.test(We.vendor),
  hn = me && (/Mobile\/\w+/.test(vt) || (!!We && We.maxTouchPoints > 2)),
  Ie = hn || (We ? /Mac/.test(We.platform) : !1),
  Wc = We ? /Win/.test(We.platform) : !1,
  et = /Android \d/.test(vt),
  Gn = !!yl && 'webkitFontSmoothing' in yl.documentElement.style,
  ap = Gn
    ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
    : 0;
function cp(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e
    ? { left: 0, right: e.width, top: 0, bottom: e.height }
    : {
        left: 0,
        right: n.documentElement.clientWidth,
        top: 0,
        bottom: n.documentElement.clientHeight
      };
}
function Ge(n, e) {
  return typeof n == 'number' ? n : n[e];
}
function up(n) {
  let e = n.getBoundingClientRect(),
    t = e.width / n.offsetWidth || 1,
    r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function bl(n, e, t) {
  let r = n.someProp('scrollThreshold') || 0,
    s = n.someProp('scrollMargin') || 5,
    i = n.dom.ownerDocument;
  for (let o = t || n.dom; o; ) {
    if (o.nodeType != 1) {
      o = dn(o);
      continue;
    }
    let l = o,
      a = l == i.body,
      c = a ? cp(i) : up(l),
      u = 0,
      d = 0;
    if (
      (e.top < c.top + Ge(r, 'top')
        ? (d = -(c.top - e.top + Ge(s, 'top')))
        : e.bottom > c.bottom - Ge(r, 'bottom') &&
          (d =
            e.bottom - e.top > c.bottom - c.top
              ? e.top + Ge(s, 'top') - c.top
              : e.bottom - c.bottom + Ge(s, 'bottom')),
      e.left < c.left + Ge(r, 'left')
        ? (u = -(c.left - e.left + Ge(s, 'left')))
        : e.right > c.right - Ge(r, 'right') &&
          (u = e.right - c.right + Ge(s, 'right')),
      u || d)
    )
      if (a) i.defaultView.scrollBy(u, d);
      else {
        let f = l.scrollLeft,
          m = l.scrollTop;
        (d && (l.scrollTop += d), u && (l.scrollLeft += u));
        let g = l.scrollLeft - f,
          y = l.scrollTop - m;
        e = {
          left: e.left - g,
          top: e.top - y,
          right: e.right - g,
          bottom: e.bottom - y
        };
      }
    let h = a ? 'fixed' : getComputedStyle(o).position;
    if (/^(fixed|sticky)$/.test(h)) break;
    o = h == 'absolute' ? o.offsetParent : dn(o);
  }
}
function dp(n) {
  let e = n.dom.getBoundingClientRect(),
    t = Math.max(0, e.top),
    r,
    s;
  for (
    let i = (e.left + e.right) / 2, o = t + 1;
    o < Math.min(innerHeight, e.bottom);
    o += 5
  ) {
    let l = n.root.elementFromPoint(i, o);
    if (!l || l == n.dom || !n.dom.contains(l)) continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      ((r = l), (s = a.top));
      break;
    }
  }
  return { refDOM: r, refTop: s, stack: Uc(n.dom) };
}
function Uc(n) {
  let e = [],
    t = n.ownerDocument;
  for (
    let r = n;
    r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t);
    r = dn(r)
  );
  return e;
}
function hp({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  qc(t, r == 0 ? 0 : r - e);
}
function qc(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: s, left: i } = n[t];
    (r.scrollTop != s + e && (r.scrollTop = s + e),
      r.scrollLeft != i && (r.scrollLeft = i));
  }
}
let Xt = null;
function fp(n) {
  if (n.setActive) return n.setActive();
  if (Xt) return n.focus(Xt);
  let e = Uc(n);
  (n.focus(
    Xt == null
      ? {
          get preventScroll() {
            return ((Xt = { preventScroll: !0 }), !0);
          }
        }
      : void 0
  ),
    Xt || ((Xt = !1), qc(e, 0)));
}
function Kc(n, e) {
  let t,
    r = 2e8,
    s,
    i = 0,
    o = e.top,
    l = e.top,
    a,
    c;
  for (let u = n.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let h;
    if (u.nodeType == 1) h = u.getClientRects();
    else if (u.nodeType == 3) h = Ze(u).getClientRects();
    else continue;
    for (let f = 0; f < h.length; f++) {
      let m = h[f];
      if (m.top <= o && m.bottom >= l) {
        ((o = Math.max(m.bottom, o)), (l = Math.min(m.top, l)));
        let g =
          m.left > e.left
            ? m.left - e.left
            : m.right < e.left
              ? e.left - m.right
              : 0;
        if (g < r) {
          ((t = u),
            (r = g),
            (s =
              g && t.nodeType == 3
                ? { left: m.right < e.left ? m.right : m.left, top: e.top }
                : e),
            u.nodeType == 1 &&
              g &&
              (i = d + (e.left >= (m.left + m.right) / 2 ? 1 : 0)));
          continue;
        }
      } else
        m.top > e.top &&
          !a &&
          m.left <= e.left &&
          m.right >= e.left &&
          ((a = u),
          (c = {
            left: Math.max(m.left, Math.min(m.right, e.left)),
            top: m.top
          }));
      !t &&
        ((e.left >= m.right && e.top >= m.top) ||
          (e.left >= m.left && e.top >= m.bottom)) &&
        (i = d + 1);
    }
  }
  return (
    !t && a && ((t = a), (s = c), (r = 0)),
    t && t.nodeType == 3
      ? pp(t, s)
      : !t || (r && t.nodeType == 1)
        ? { node: n, offset: i }
        : Kc(t, s)
  );
}
function pp(n, e) {
  let t = n.nodeValue.length,
    r = document.createRange(),
    s;
  for (let i = 0; i < t; i++) {
    (r.setEnd(n, i + 1), r.setStart(n, i));
    let o = ot(r, 1);
    if (o.top != o.bottom && lo(e, o)) {
      s = { node: n, offset: i + (e.left >= (o.left + o.right) / 2 ? 1 : 0) };
      break;
    }
  }
  return (r.detach(), s || { node: n, offset: 0 });
}
function lo(n, e) {
  return (
    n.left >= e.left - 1 &&
    n.left <= e.right + 1 &&
    n.top >= e.top - 1 &&
    n.top <= e.bottom + 1
  );
}
function mp(n, e) {
  let t = n.parentNode;
  return t &&
    /^li$/i.test(t.nodeName) &&
    e.left < n.getBoundingClientRect().left
    ? t
    : n;
}
function gp(n, e, t) {
  let { node: r, offset: s } = Kc(e, t),
    i = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    i = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, s, i);
}
function yp(n, e, t, r) {
  let s = -1;
  for (let i = e, o = !1; i != n.dom; ) {
    let l = n.docView.nearestDesc(i, !0),
      a;
    if (!l) return null;
    if (
      l.dom.nodeType == 1 &&
      ((l.node.isBlock && l.parent) || !l.contentDOM) &&
      ((a = l.dom.getBoundingClientRect()).width || a.height) &&
      (l.node.isBlock &&
        l.parent &&
        !/^T(R|BODY|HEAD|FOOT)$/.test(l.dom.nodeName) &&
        ((!o && a.left > r.left) || a.top > r.top
          ? (s = l.posBefore)
          : ((!o && a.right < r.left) || a.bottom < r.top) && (s = l.posAfter),
        (o = !0)),
      !l.contentDOM && s < 0 && !l.node.isText)
    )
      return (
        l.node.isBlock
          ? r.top < (a.top + a.bottom) / 2
          : r.left < (a.left + a.right) / 2
      )
        ? l.posBefore
        : l.posAfter;
    i = l.dom.parentNode;
  }
  return s > -1 ? s : n.docView.posFromDOM(e, t, -1);
}
function Jc(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (
      let s = Math.max(
          0,
          Math.min(
            r - 1,
            Math.floor((r * (e.top - t.top)) / (t.bottom - t.top)) - 2
          )
        ),
        i = s;
      ;
    ) {
      let o = n.childNodes[i];
      if (o.nodeType == 1) {
        let l = o.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (lo(e, c)) return Jc(o, e, c);
        }
      }
      if ((i = (i + 1) % r) == s) break;
    }
  return n;
}
function bp(n, e) {
  let t = n.dom.ownerDocument,
    r,
    s = 0,
    i = lp(t, e.left, e.top);
  i && ({ node: r, offset: s } = i);
  let o = (n.root.elementFromPoint ? n.root : t).elementFromPoint(
      e.left,
      e.top
    ),
    l;
  if (!o || !n.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = n.dom.getBoundingClientRect();
    if (!lo(e, c) || ((o = Jc(n.dom, e, c)), !o)) return null;
  }
  if (me) for (let c = o; r && c; c = dn(c)) c.draggable && (r = void 0);
  if (((o = mp(o, e)), r)) {
    if (
      De &&
      r.nodeType == 1 &&
      ((s = Math.min(s, r.childNodes.length)), s < r.childNodes.length)
    ) {
      let u = r.childNodes[s],
        d;
      u.nodeName == 'IMG' &&
        (d = u.getBoundingClientRect()).right <= e.left &&
        d.bottom > e.top &&
        s++;
    }
    let c;
    (Gn &&
      s &&
      r.nodeType == 1 &&
      (c = r.childNodes[s - 1]).nodeType == 1 &&
      c.contentEditable == 'false' &&
      c.getBoundingClientRect().top >= e.top &&
      s--,
      r == n.dom &&
      s == r.childNodes.length - 1 &&
      r.lastChild.nodeType == 1 &&
      e.top > r.lastChild.getBoundingClientRect().bottom
        ? (l = n.state.doc.content.size)
        : (s == 0 || r.nodeType != 1 || r.childNodes[s - 1].nodeName != 'BR') &&
          (l = yp(n, r, s, e)));
  }
  l == null && (l = gp(n, o, e));
  let a = n.docView.nearestDesc(o, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function xl(n) {
  return n.top < n.bottom || n.left < n.right;
}
function ot(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (xl(r)) return r;
  }
  return Array.prototype.find.call(t, xl) || n.getBoundingClientRect();
}
const xp = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Gc(n, e, t) {
  let { node: r, offset: s, atom: i } = n.docView.domFromPos(e, t < 0 ? -1 : 1),
    o = Gn || De;
  if (r.nodeType == 3)
    if (o && (xp.test(r.nodeValue) || (t < 0 ? !s : s == r.nodeValue.length))) {
      let a = ot(Ze(r, s, s), t);
      if (De && s && /\s/.test(r.nodeValue[s - 1]) && s < r.nodeValue.length) {
        let c = ot(Ze(r, s - 1, s - 1), -1);
        if (c.top == a.top) {
          let u = ot(Ze(r, s, s + 1), -1);
          if (u.top != a.top) return gn(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = s,
        c = s,
        u = t < 0 ? 1 : -1;
      return (
        t < 0 && !s
          ? (c++, (u = -1))
          : t >= 0 && s == r.nodeValue.length
            ? (a--, (u = 1))
            : t < 0
              ? a--
              : c++,
        gn(ot(Ze(r, a, c), u), u < 0)
      );
    }
  if (!n.state.doc.resolve(e - (i || 0)).parent.inlineContent) {
    if (i == null && s && (t < 0 || s == Re(r))) {
      let a = r.childNodes[s - 1];
      if (a.nodeType == 1) return $s(a.getBoundingClientRect(), !1);
    }
    if (i == null && s < Re(r)) {
      let a = r.childNodes[s];
      if (a.nodeType == 1) return $s(a.getBoundingClientRect(), !0);
    }
    return $s(r.getBoundingClientRect(), t >= 0);
  }
  if (i == null && s && (t < 0 || s == Re(r))) {
    let a = r.childNodes[s - 1],
      c =
        a.nodeType == 3
          ? Ze(a, Re(a) - (o ? 0 : 1))
          : a.nodeType == 1 && (a.nodeName != 'BR' || !a.nextSibling)
            ? a
            : null;
    if (c) return gn(ot(c, 1), !1);
  }
  if (i == null && s < Re(r)) {
    let a = r.childNodes[s];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; ) a = a.nextSibling;
    let c = a
      ? a.nodeType == 3
        ? Ze(a, 0, o ? 0 : 1)
        : a.nodeType == 1
          ? a
          : null
      : null;
    if (c) return gn(ot(c, -1), !0);
  }
  return gn(ot(r.nodeType == 3 ? Ze(r) : r, -t), t >= 0);
}
function gn(n, e) {
  if (n.width == 0) return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function $s(n, e) {
  if (n.height == 0) return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function Yc(n, e, t) {
  let r = n.state,
    s = n.root.activeElement;
  (r != e && n.updateState(e), s != n.dom && n.focus());
  try {
    return t();
  } finally {
    (r != e && n.updateState(r), s != n.dom && s && s.focus());
  }
}
function kp(n, e, t) {
  let r = e.selection,
    s = t == 'up' ? r.$from : r.$to;
  return Yc(n, e, () => {
    let { node: i } = n.docView.domFromPos(s.pos, t == 'up' ? -1 : 1);
    for (;;) {
      let l = n.docView.nearestDesc(i, !0);
      if (!l) break;
      if (l.node.isBlock) {
        i = l.contentDOM || l.dom;
        break;
      }
      i = l.dom.parentNode;
    }
    let o = Gc(n, s.pos, 1);
    for (let l = i.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1) a = l.getClientRects();
      else if (l.nodeType == 3)
        a = Ze(l, 0, l.nodeValue.length).getClientRects();
      else continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (
          u.bottom > u.top + 1 &&
          (t == 'up'
            ? o.top - u.top > (u.bottom - o.top) * 2
            : u.bottom - o.bottom > (o.bottom - u.top) * 2)
        )
          return !1;
      }
    }
    return !0;
  });
}
const Cp = /[\u0590-\u08ac]/;
function Sp(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock) return !1;
  let s = r.parentOffset,
    i = !s,
    o = s == r.parent.content.size,
    l = n.domSelection();
  return l
    ? !Cp.test(r.parent.textContent) || !l.modify
      ? t == 'left' || t == 'backward'
        ? i
        : o
      : Yc(n, e, () => {
          let {
              focusNode: a,
              focusOffset: c,
              anchorNode: u,
              anchorOffset: d
            } = n.domSelectionRange(),
            h = l.caretBidiLevel;
          l.modify('move', t, 'character');
          let f = r.depth ? n.docView.domAfterPos(r.before()) : n.dom,
            { focusNode: m, focusOffset: g } = n.domSelectionRange(),
            y =
              (m && !f.contains(m.nodeType == 1 ? m : m.parentNode)) ||
              (a == m && c == g);
          try {
            (l.collapse(u, d),
              a && (a != u || c != d) && l.extend && l.extend(a, c));
          } catch {}
          return (h != null && (l.caretBidiLevel = h), y);
        })
    : r.pos == r.start() || r.pos == r.end();
}
let kl = null,
  Cl = null,
  Sl = !1;
function vp(n, e, t) {
  return kl == e && Cl == t
    ? Sl
    : ((kl = e),
      (Cl = t),
      (Sl = t == 'up' || t == 'down' ? kp(n, e, t) : Sp(n, e, t)));
}
const Pe = 0,
  vl = 1,
  At = 2,
  Ue = 3;
class Yn {
  constructor(e, t, r, s) {
    ((this.parent = e),
      (this.children = t),
      (this.dom = r),
      (this.contentDOM = s),
      (this.dirty = Pe),
      (r.pmViewDesc = this));
  }
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  parseRule() {
    return null;
  }
  stopEvent(e) {
    return !1;
  }
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++) e += this.children[t].size;
    return e;
  }
  get border() {
    return 0;
  }
  destroy() {
    ((this.parent = void 0),
      this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0));
    for (let e = 0; e < this.children.length; e++) this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let s = this.children[t];
      if (s == e) return r;
      r += s.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (
      this.contentDOM &&
      this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode)
    )
      if (r < 0) {
        let i, o;
        if (e == this.contentDOM) i = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; ) e = e.parentNode;
          i = e.previousSibling;
        }
        for (; i && !((o = i.pmViewDesc) && o.parent == this); )
          i = i.previousSibling;
        return i ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let i, o;
        if (e == this.contentDOM) i = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; ) e = e.parentNode;
          i = e.nextSibling;
        }
        for (; i && !((o = i.pmViewDesc) && o.parent == this); )
          i = i.nextSibling;
        return i ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let s;
    if (e == this.dom && this.contentDOM) s = t > ue(this.contentDOM);
    else if (
      this.contentDOM &&
      this.contentDOM != this.dom &&
      this.dom.contains(this.contentDOM)
    )
      s = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let i = e; ; i = i.parentNode) {
          if (i == this.dom) {
            s = !1;
            break;
          }
          if (i.previousSibling) break;
        }
      if (s == null && t == e.childNodes.length)
        for (let i = e; ; i = i.parentNode) {
          if (i == this.dom) {
            s = !0;
            break;
          }
          if (i.nextSibling) break;
        }
    }
    return (s ?? r > 0) ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, s = e; s; s = s.parentNode) {
      let i = this.getDesc(s),
        o;
      if (i && (!t || i.node))
        if (
          r &&
          (o = i.nodeDOM) &&
          !(o.nodeType == 1
            ? o.contains(e.nodeType == 1 ? e : e.parentNode)
            : o == e)
        )
          r = !1;
        else return i;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent) if (r == this) return t;
  }
  posFromDOM(e, t, r) {
    for (let s = e; s; s = s.parentNode) {
      let i = this.getDesc(s);
      if (i) return i.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let s = this.children[t],
        i = r + s.size;
      if (r == e && i != r) {
        for (; !s.border && s.children.length; )
          for (let o = 0; o < s.children.length; o++) {
            let l = s.children[o];
            if (l.size) {
              s = l;
              break;
            }
          }
        return s;
      }
      if (e < i) return s.descAt(e - r - s.border);
      r = i;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM) return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0,
      s = 0;
    for (let i = 0; r < this.children.length; r++) {
      let o = this.children[r],
        l = i + o.size;
      if (l > e || o instanceof Qc) {
        s = e - i;
        break;
      }
      i = l;
    }
    if (s) return this.children[r].domFromPos(s - this.children[r].border, t);
    for (
      let i;
      r && !(i = this.children[r - 1]).size && i instanceof Xc && i.side >= 0;
      r--
    );
    if (t <= 0) {
      let i,
        o = !0;
      for (
        ;
        (i = r ? this.children[r - 1] : null),
          !(!i || i.dom.parentNode == this.contentDOM);
        r--, o = !1
      );
      return i && t && o && !i.border && !i.domAtom
        ? i.domFromPos(i.size, t)
        : { node: this.contentDOM, offset: i ? ue(i.dom) + 1 : 0 };
    } else {
      let i,
        o = !0;
      for (
        ;
        (i = r < this.children.length ? this.children[r] : null),
          !(!i || i.dom.parentNode == this.contentDOM);
        r++, o = !1
      );
      return i && o && !i.border && !i.domAtom
        ? i.domFromPos(0, t)
        : {
            node: this.contentDOM,
            offset: i ? ue(i.dom) : this.contentDOM.childNodes.length
          };
    }
  }
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return {
        node: this.contentDOM,
        from: e,
        to: t,
        fromOffset: 0,
        toOffset: this.contentDOM.childNodes.length
      };
    let s = -1,
      i = -1;
    for (let o = r, l = 0; ; l++) {
      let a = this.children[l],
        c = o + a.size;
      if (s == -1 && e <= c) {
        let u = o + a.border;
        if (
          e >= u &&
          t <= c - a.border &&
          a.node &&
          a.contentDOM &&
          this.contentDOM.contains(a.contentDOM)
        )
          return a.parseRange(e, t, u);
        e = o;
        for (let d = l; d > 0; d--) {
          let h = this.children[d - 1];
          if (
            h.size &&
            h.dom.parentNode == this.contentDOM &&
            !h.emptyChildAt(1)
          ) {
            s = ue(h.dom) + 1;
            break;
          }
          e -= h.size;
        }
        s == -1 && (s = 0);
      }
      if (s > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (
            d.size &&
            d.dom.parentNode == this.contentDOM &&
            !d.emptyChildAt(-1)
          ) {
            i = ue(d.dom);
            break;
          }
          t += d.size;
        }
        i == -1 && (i = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return {
      node: this.contentDOM,
      from: e,
      to: t,
      fromOffset: s,
      toOffset: i
    };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length) return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError('No node after pos ' + e);
    return t.childNodes[r];
  }
  setSelection(e, t, r, s = !1) {
    let i = Math.min(e, t),
      o = Math.max(e, t);
    for (let f = 0, m = 0; f < this.children.length; f++) {
      let g = this.children[f],
        y = m + g.size;
      if (i > m && o < y)
        return g.setSelection(e - m - g.border, t - m - g.border, r, s);
      m = y;
    }
    let l = this.domFromPos(e, e ? -1 : 1),
      a = t == e ? l : this.domFromPos(t, t ? -1 : 1),
      c = r.root.getSelection(),
      u = r.domSelectionRange(),
      d = !1;
    if ((De || me) && e == t) {
      let { node: f, offset: m } = l;
      if (f.nodeType == 3) {
        if (
          ((d = !!(
            m &&
            f.nodeValue[m - 1] ==
              `
`
          )),
          d && m == f.nodeValue.length)
        )
          for (let g = f, y; g; g = g.parentNode) {
            if ((y = g.nextSibling)) {
              y.nodeName == 'BR' &&
                (l = a = { node: y.parentNode, offset: ue(y) + 1 });
              break;
            }
            let b = g.pmViewDesc;
            if (b && b.node && b.node.isBlock) break;
          }
      } else {
        let g = f.childNodes[m - 1];
        d = g && (g.nodeName == 'BR' || g.contentEditable == 'false');
      }
    }
    if (
      De &&
      u.focusNode &&
      u.focusNode != a.node &&
      u.focusNode.nodeType == 1
    ) {
      let f = u.focusNode.childNodes[u.focusOffset];
      f && f.contentEditable == 'false' && (s = !0);
    }
    if (
      !(s || (d && me)) &&
      Ft(l.node, l.offset, u.anchorNode, u.anchorOffset) &&
      Ft(a.node, a.offset, u.focusNode, u.focusOffset)
    )
      return;
    let h = !1;
    if ((c.extend || e == t) && !(d && De)) {
      c.collapse(l.node, l.offset);
      try {
        (e != t && c.extend(a.node, a.offset), (h = !0));
      } catch {}
    }
    if (!h) {
      if (e > t) {
        let m = l;
        ((l = a), (a = m));
      }
      let f = document.createRange();
      (f.setEnd(a.node, a.offset),
        f.setStart(l.node, l.offset),
        c.removeAllRanges(),
        c.addRange(f));
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != 'selection';
  }
  get contentLost() {
    return (
      this.contentDOM &&
      this.contentDOM != this.dom &&
      !this.dom.contains(this.contentDOM)
    );
  }
  markDirty(e, t) {
    for (let r = 0, s = 0; s < this.children.length; s++) {
      let i = this.children[s],
        o = r + i.size;
      if (r == o ? e <= o && t >= r : e < o && t > r) {
        let l = r + i.border,
          a = o - i.border;
        if (e >= l && t <= a) {
          ((this.dirty = e == r || t == o ? At : vl),
            e == l &&
            t == a &&
            (i.contentLost || i.dom.parentNode != this.contentDOM)
              ? (i.dirty = Ue)
              : i.markDirty(e - l, t - l));
          return;
        } else
          i.dirty =
            i.dom == i.contentDOM &&
            i.dom.parentNode == this.contentDOM &&
            !i.children.length
              ? At
              : Ue;
      }
      r = o;
    }
    this.dirty = At;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? At : vl;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  get ignoreForSelection() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class Xc extends Yn {
  constructor(e, t, r, s) {
    let i,
      o = t.type.toDOM;
    if (
      (typeof o == 'function' &&
        (o = o(r, () => {
          if (!i) return s;
          if (i.parent) return i.parent.posBeforeChild(i);
        })),
      !t.type.spec.raw)
    ) {
      if (o.nodeType != 1) {
        let l = document.createElement('span');
        (l.appendChild(o), (o = l));
      }
      ((o.contentEditable = 'false'), o.classList.add('ProseMirror-widget'));
    }
    (super(e, [], o, null), (this.widget = t), (this.widget = t), (i = this));
  }
  matchesWidget(e) {
    return this.dirty == Pe && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != 'selection' || this.widget.spec.ignoreSelection;
  }
  destroy() {
    (this.widget.type.destroy(this.dom), super.destroy());
  }
  get domAtom() {
    return !0;
  }
  get ignoreForSelection() {
    return !!this.widget.type.spec.relaxedSide;
  }
  get side() {
    return this.widget.type.side;
  }
}
class Mp extends Yn {
  constructor(e, t, r, s) {
    (super(e, [], t, null), (this.textDOM = r), (this.text = s));
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM
      ? this.posAtStart + (t ? this.size : 0)
      : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === 'characterData' && e.target.nodeValue == e.oldValue;
  }
}
class _t extends Yn {
  constructor(e, t, r, s, i) {
    (super(e, [], r, s), (this.mark = t), (this.spec = i));
  }
  static create(e, t, r, s) {
    let i = s.nodeViews[t.type.name],
      o = i && i(t, s, r);
    return (
      (!o || !o.dom) &&
        (o = Wt.renderSpec(document, t.type.spec.toDOM(t, r), null, t.attrs)),
      new _t(e, t, o.dom, o.contentDOM || o.dom, o)
    );
  }
  parseRule() {
    return this.dirty & Ue || this.mark.type.spec.reparseInView
      ? null
      : {
          mark: this.mark.type.name,
          attrs: this.mark.attrs,
          contentElement: this.contentDOM
        };
  }
  matchesMark(e) {
    return this.dirty != Ue && this.mark.eq(e);
  }
  markDirty(e, t) {
    if ((super.markDirty(e, t), this.dirty != Pe)) {
      let r = this.parent;
      for (; !r.node; ) r = r.parent;
      (r.dirty < this.dirty && (r.dirty = this.dirty), (this.dirty = Pe));
    }
  }
  slice(e, t, r) {
    let s = _t.create(this.parent, this.mark, !0, r),
      i = this.children,
      o = this.size;
    (t < o && (i = vi(i, t, o, r)), e > 0 && (i = vi(i, 0, e, r)));
    for (let l = 0; l < i.length; l++) i[l].parent = s;
    return ((s.children = i), s);
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation
      ? this.spec.ignoreMutation(e)
      : super.ignoreMutation(e);
  }
  destroy() {
    (this.spec.destroy && this.spec.destroy(), super.destroy());
  }
}
class yt extends Yn {
  constructor(e, t, r, s, i, o, l, a, c) {
    (super(e, [], i, o),
      (this.node = t),
      (this.outerDeco = r),
      (this.innerDeco = s),
      (this.nodeDOM = l));
  }
  static create(e, t, r, s, i, o) {
    let l = i.nodeViews[t.type.name],
      a,
      c =
        l &&
        l(
          t,
          i,
          () => {
            if (!a) return o;
            if (a.parent) return a.parent.posBeforeChild(a);
          },
          r,
          s
        ),
      u = c && c.dom,
      d = c && c.contentDOM;
    if (t.isText) {
      if (!u) u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError('Text must be rendered as a DOM text node');
    } else
      u ||
        ({ dom: u, contentDOM: d } = Wt.renderSpec(
          document,
          t.type.spec.toDOM(t),
          null,
          t.attrs
        ));
    !d &&
      !t.isText &&
      u.nodeName != 'BR' &&
      (u.hasAttribute('contenteditable') || (u.contentEditable = 'false'),
      t.type.spec.draggable && (u.draggable = !0));
    let h = u;
    return (
      (u = tu(u, r, t)),
      c
        ? (a = new wp(e, t, r, s, u, d || null, h, c, i, o + 1))
        : t.isText
          ? new ms(e, t, r, s, u, h, i)
          : new yt(e, t, r, s, u, d || null, h, i, o + 1)
    );
  }
  parseRule() {
    if (this.node.type.spec.reparseInView) return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (
      (this.node.type.whitespace == 'pre' && (e.preserveWhitespace = 'full'),
      !this.contentDOM)
    )
      e.getContent = () => this.node.content;
    else if (!this.contentLost) e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => C.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return (
      this.dirty == Pe &&
      e.eq(this.node) &&
      wr(t, this.outerDeco) &&
      r.eq(this.innerDeco)
    );
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  updateChildren(e, t) {
    let r = this.node.inlineContent,
      s = t,
      i = e.composing ? this.localCompositionInfo(e, t) : null,
      o = i && i.pos > -1 ? i : null,
      l = i && i.pos < 0,
      a = new Ep(this, o && o.node, e);
    (Op(
      this.node,
      this.innerDeco,
      (c, u, d) => {
        (c.spec.marks
          ? a.syncToMarks(c.spec.marks, r, e, u)
          : c.type.side >= 0 &&
            !d &&
            a.syncToMarks(
              u == this.node.childCount ? U.none : this.node.child(u).marks,
              r,
              e,
              u
            ),
          a.placeWidget(c, e, s));
      },
      (c, u, d, h) => {
        a.syncToMarks(c.marks, r, e, h);
        let f;
        (a.findNodeMatch(c, u, d, h) ||
          (l &&
            e.state.selection.from > s &&
            e.state.selection.to < s + c.nodeSize &&
            (f = a.findIndexWithChild(i.node)) > -1 &&
            a.updateNodeAt(c, u, d, f, e)) ||
          a.updateNextNode(c, u, d, e, h, s) ||
          a.addNode(c, u, d, e, s),
          (s += c.nodeSize));
      }
    ),
      a.syncToMarks([], r, e, 0),
      this.node.isTextblock && a.addTextblockHacks(),
      a.destroyRest(),
      (a.changed || this.dirty == At) &&
        (o && this.protectLocalComposition(e, o),
        Zc(this.contentDOM, this.children, e),
        hn && Ip(this.dom)));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: s } = e.state.selection;
    if (
      !(e.state.selection instanceof D) ||
      r < t ||
      s > t + this.node.content.size
    )
      return null;
    let i = e.input.compositionNode;
    if (!i || !this.dom.contains(i.parentNode)) return null;
    if (this.node.inlineContent) {
      let o = i.nodeValue,
        l = Rp(this.node.content, o, r - t, s - t);
      return l < 0 ? null : { node: i, pos: l, text: o };
    } else return { node: i, pos: -1, text: '' };
  }
  protectLocalComposition(e, { node: t, pos: r, text: s }) {
    if (this.getDesc(t)) return;
    let i = t;
    for (; i.parentNode != this.contentDOM; i = i.parentNode) {
      for (; i.previousSibling; ) i.parentNode.removeChild(i.previousSibling);
      for (; i.nextSibling; ) i.parentNode.removeChild(i.nextSibling);
      i.pmViewDesc && (i.pmViewDesc = void 0);
    }
    let o = new Mp(this, i, t, s);
    (e.input.compositionNodes.push(o),
      (this.children = vi(this.children, r, r + s.length, e, o)));
  }
  update(e, t, r, s) {
    return this.dirty == Ue || !e.sameMarkup(this.node)
      ? !1
      : (this.updateInner(e, t, r, s), !0);
  }
  updateInner(e, t, r, s) {
    (this.updateOuterDeco(t),
      (this.node = e),
      (this.innerDeco = r),
      this.contentDOM && this.updateChildren(s, this.posAtStart),
      (this.dirty = Pe));
  }
  updateOuterDeco(e) {
    if (wr(e, this.outerDeco)) return;
    let t = this.nodeDOM.nodeType != 1,
      r = this.dom;
    ((this.dom = eu(
      this.dom,
      this.nodeDOM,
      Si(this.outerDeco, this.node, t),
      Si(e, this.node, t)
    )),
      this.dom != r && ((r.pmViewDesc = void 0), (this.dom.pmViewDesc = this)),
      (this.outerDeco = e));
  }
  selectNode() {
    this.nodeDOM.nodeType == 1 &&
      (this.nodeDOM.classList.add('ProseMirror-selectednode'),
      (this.contentDOM || !this.node.type.spec.draggable) &&
        (this.nodeDOM.draggable = !0));
  }
  deselectNode() {
    this.nodeDOM.nodeType == 1 &&
      (this.nodeDOM.classList.remove('ProseMirror-selectednode'),
      (this.contentDOM || !this.node.type.spec.draggable) &&
        this.nodeDOM.removeAttribute('draggable'));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function Ml(n, e, t, r, s) {
  tu(r, e, n);
  let i = new yt(void 0, n, e, t, r, r, r, s, 0);
  return (i.contentDOM && i.updateChildren(s, 0), i);
}
class ms extends yt {
  constructor(e, t, r, s, i, o, l) {
    super(e, t, r, s, i, null, o, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; ) e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, s) {
    return this.dirty == Ue ||
      (this.dirty != Pe && !this.inParent()) ||
      !e.sameMarkup(this.node)
      ? !1
      : (this.updateOuterDeco(t),
        (this.dirty != Pe || e.text != this.node.text) &&
          e.text != this.nodeDOM.nodeValue &&
          ((this.nodeDOM.nodeValue = e.text),
          s.trackWrites == this.nodeDOM && (s.trackWrites = null)),
        (this.node = e),
        (this.dirty = Pe),
        !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode) if (t == e) return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM
      ? this.posAtStart + Math.min(t, this.node.text.length)
      : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != 'characterData' && e.type != 'selection';
  }
  slice(e, t, r) {
    let s = this.node.cut(e, t),
      i = document.createTextNode(s.text);
    return new ms(this.parent, s, this.outerDeco, this.innerDeco, i, i, r);
  }
  markDirty(e, t) {
    (super.markDirty(e, t),
      this.dom != this.nodeDOM &&
        (e == 0 || t == this.nodeDOM.nodeValue.length) &&
        (this.dirty = Ue));
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Qc extends Yn {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Pe && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == 'IMG';
  }
}
class wp extends yt {
  constructor(e, t, r, s, i, o, l, a, c, u) {
    (super(e, t, r, s, i, o, l, c, u), (this.spec = a));
  }
  update(e, t, r, s) {
    if (this.dirty == Ue) return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let i = this.spec.update(e, t, r);
      return (i && this.updateInner(e, t, r, s), i);
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, s);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, s) {
    this.spec.setSelection
      ? this.spec.setSelection(e, t, r.root)
      : super.setSelection(e, t, r, s);
  }
  destroy() {
    (this.spec.destroy && this.spec.destroy(), super.destroy());
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation
      ? this.spec.ignoreMutation(e)
      : super.ignoreMutation(e);
  }
}
function Zc(n, e, t) {
  let r = n.firstChild,
    s = !1;
  for (let i = 0; i < e.length; i++) {
    let o = e[i],
      l = o.dom;
    if (l.parentNode == n) {
      for (; l != r; ) ((r = wl(r)), (s = !0));
      r = r.nextSibling;
    } else ((s = !0), n.insertBefore(l, r));
    if (o instanceof _t) {
      let a = r ? r.previousSibling : n.lastChild;
      (Zc(o.contentDOM, o.children, t), (r = a ? a.nextSibling : n.firstChild));
    }
  }
  for (; r; ) ((r = wl(r)), (s = !0));
  s && t.trackWrites == n && (t.trackWrites = null);
}
const En = function (n) {
  n && (this.nodeName = n);
};
En.prototype = Object.create(null);
const Nt = [new En()];
function Si(n, e, t) {
  if (n.length == 0) return Nt;
  let r = t ? Nt[0] : new En(),
    s = [r];
  for (let i = 0; i < n.length; i++) {
    let o = n[i].type.attrs;
    if (o) {
      o.nodeName && s.push((r = new En(o.nodeName)));
      for (let l in o) {
        let a = o[l];
        a != null &&
          (t &&
            s.length == 1 &&
            s.push((r = new En(e.isInline ? 'span' : 'div'))),
          l == 'class'
            ? (r.class = (r.class ? r.class + ' ' : '') + a)
            : l == 'style'
              ? (r.style = (r.style ? r.style + ';' : '') + a)
              : l != 'nodeName' && (r[l] = a));
      }
    }
  }
  return s;
}
function eu(n, e, t, r) {
  if (t == Nt && r == Nt) return e;
  let s = e;
  for (let i = 0; i < r.length; i++) {
    let o = r[i],
      l = t[i];
    if (i) {
      let a;
      ((l &&
        l.nodeName == o.nodeName &&
        s != n &&
        (a = s.parentNode) &&
        a.nodeName.toLowerCase() == o.nodeName) ||
        ((a = document.createElement(o.nodeName)),
        (a.pmIsDeco = !0),
        a.appendChild(s),
        (l = Nt[0])),
        (s = a));
    }
    Tp(s, l || Nt[0], o);
  }
  return s;
}
function Tp(n, e, t) {
  for (let r in e)
    r != 'class' &&
      r != 'style' &&
      r != 'nodeName' &&
      !(r in t) &&
      n.removeAttribute(r);
  for (let r in t)
    r != 'class' &&
      r != 'style' &&
      r != 'nodeName' &&
      t[r] != e[r] &&
      n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(' ').filter(Boolean) : [],
      s = t.class ? t.class.split(' ').filter(Boolean) : [];
    for (let i = 0; i < r.length; i++)
      s.indexOf(r[i]) == -1 && n.classList.remove(r[i]);
    for (let i = 0; i < s.length; i++)
      r.indexOf(s[i]) == -1 && n.classList.add(s[i]);
    n.classList.length == 0 && n.removeAttribute('class');
  }
  if (e.style != t.style) {
    if (e.style) {
      let r =
          /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g,
        s;
      for (; (s = r.exec(e.style)); ) n.style.removeProperty(s[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function tu(n, e, t) {
  return eu(n, n, Nt, Si(e, t, n.nodeType != 1));
}
function wr(n, e) {
  if (n.length != e.length) return !1;
  for (let t = 0; t < n.length; t++) if (!n[t].type.eq(e[t].type)) return !1;
  return !0;
}
function wl(n) {
  let e = n.nextSibling;
  return (n.parentNode.removeChild(n), e);
}
class Ep {
  constructor(e, t, r) {
    ((this.lock = t),
      (this.view = r),
      (this.index = 0),
      (this.stack = []),
      (this.changed = !1),
      (this.top = e),
      (this.preMatch = Ap(e.node.content, e)));
  }
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++) this.top.children[r].destroy();
      (this.top.children.splice(e, t - e), (this.changed = !0));
    }
  }
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  syncToMarks(e, t, r, s) {
    let i = 0,
      o = this.stack.length >> 1,
      l = Math.min(o, e.length);
    for (
      ;
      i < l &&
      (i == o - 1 ? this.top : this.stack[(i + 1) << 1]).matchesMark(e[i]) &&
      e[i].type.spec.spanning !== !1;
    )
      i++;
    for (; i < o; )
      (this.destroyRest(),
        (this.top.dirty = Pe),
        (this.index = this.stack.pop()),
        (this.top = this.stack.pop()),
        o--);
    for (; o < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let a = -1,
        c = this.top.children.length;
      s < this.preMatch.index && (c = Math.min(this.index + 3, c));
      for (let u = this.index; u < c; u++) {
        let d = this.top.children[u];
        if (d.matchesMark(e[o]) && !this.isLocked(d.dom)) {
          a = u;
          break;
        }
      }
      if (a > -1)
        (a > this.index &&
          ((this.changed = !0), this.destroyBetween(this.index, a)),
          (this.top = this.top.children[this.index]));
      else {
        let u = _t.create(this.top, e[o], t, r);
        (this.top.children.splice(this.index, 0, u),
          (this.top = u),
          (this.changed = !0));
      }
      ((this.index = 0), o++);
    }
  }
  findNodeMatch(e, t, r, s) {
    let i = -1,
      o;
    if (
      s >= this.preMatch.index &&
      (o = this.preMatch.matches[s - this.preMatch.index]).parent == this.top &&
      o.matchesNode(e, t, r)
    )
      i = this.top.children.indexOf(o, this.index);
    else
      for (
        let l = this.index, a = Math.min(this.top.children.length, l + 5);
        l < a;
        l++
      ) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          i = l;
          break;
        }
      }
    return i < 0 ? !1 : (this.destroyBetween(this.index, i), this.index++, !0);
  }
  updateNodeAt(e, t, r, s, i) {
    let o = this.top.children[s];
    return (
      o.dirty == Ue && o.dom == o.contentDOM && (o.dirty = At),
      o.update(e, t, r, i)
        ? (this.destroyBetween(this.index, s), this.index++, !0)
        : !1
    );
  }
  findIndexWithChild(e) {
    for (;;) {
      let t = e.parentNode;
      if (!t) return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let s = this.index; s < this.top.children.length; s++)
            if (this.top.children[s] == r) return s;
        }
        return -1;
      }
      e = t;
    }
  }
  updateNextNode(e, t, r, s, i, o) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof yt) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != i) return !1;
        let u = a.dom,
          d,
          h =
            this.isLocked(u) &&
            !(
              e.isText &&
              a.node &&
              a.node.isText &&
              a.nodeDOM.nodeValue == e.text &&
              a.dirty != Ue &&
              wr(t, a.outerDeco)
            );
        if (!h && a.update(e, t, r, s))
          return (
            this.destroyBetween(this.index, l),
            a.dom != u && (this.changed = !0),
            this.index++,
            !0
          );
        if (!h && (d = this.recreateWrapper(a, e, t, r, s, o)))
          return (
            this.destroyBetween(this.index, l),
            (this.top.children[this.index] = d),
            d.contentDOM &&
              ((d.dirty = At), d.updateChildren(s, o + 1), (d.dirty = Pe)),
            (this.changed = !0),
            this.index++,
            !0
          );
        break;
      }
    }
    return !1;
  }
  recreateWrapper(e, t, r, s, i, o) {
    if (
      e.dirty ||
      t.isAtom ||
      !e.children.length ||
      !e.node.content.eq(t.content) ||
      !wr(r, e.outerDeco) ||
      !s.eq(e.innerDeco)
    )
      return null;
    let l = yt.create(this.top, t, r, s, i, o);
    if (l.contentDOM) {
      ((l.children = e.children), (e.children = []));
      for (let a of l.children) a.parent = l;
    }
    return (e.destroy(), l);
  }
  addNode(e, t, r, s, i) {
    let o = yt.create(this.top, e, t, r, s, i);
    (o.contentDOM && o.updateChildren(s, i + 1),
      this.top.children.splice(this.index++, 0, o),
      (this.changed = !0));
  }
  placeWidget(e, t, r) {
    let s =
      this.index < this.top.children.length
        ? this.top.children[this.index]
        : null;
    if (
      s &&
      s.matchesWidget(e) &&
      (e == s.widget || !s.widget.type.toDOM.parentNode)
    )
      this.index++;
    else {
      let i = new Xc(this.top, e, t, r);
      (this.top.children.splice(this.index++, 0, i), (this.changed = !0));
    }
  }
  addTextblockHacks() {
    let e = this.top.children[this.index - 1],
      t = this.top;
    for (; e instanceof _t; )
      ((t = e), (e = t.children[t.children.length - 1]));
    (!e ||
      !(e instanceof ms) ||
      /\n$/.test(e.node.text) ||
      (this.view.requiresGeckoHackNode && /\s$/.test(e.node.text))) &&
      ((me || he) &&
        e &&
        e.dom.contentEditable == 'false' &&
        this.addHackNode('IMG', t),
      this.addHackNode('BR', this.top));
  }
  addHackNode(e, t) {
    if (
      t == this.top &&
      this.index < t.children.length &&
      t.children[this.index].matchesHack(e)
    )
      this.index++;
    else {
      let r = document.createElement(e);
      (e == 'IMG' && ((r.className = 'ProseMirror-separator'), (r.alt = '')),
        e == 'BR' && (r.className = 'ProseMirror-trailingBreak'));
      let s = new Qc(this.top, [], r, null);
      (t != this.top
        ? t.children.push(s)
        : t.children.splice(this.index++, 0, s),
        (this.changed = !0));
    }
  }
  isLocked(e) {
    return (
      this.lock &&
      (e == this.lock || (e.nodeType == 1 && e.contains(this.lock.parentNode)))
    );
  }
}
function Ap(n, e) {
  let t = e,
    r = t.children.length,
    s = n.childCount,
    i = new Map(),
    o = [];
  e: for (; s > 0; ) {
    let l;
    for (;;)
      if (r) {
        let c = t.children[r - 1];
        if (c instanceof _t) ((t = c), (r = c.children.length));
        else {
          ((l = c), r--);
          break;
        }
      } else {
        if (t == e) break e;
        ((r = t.parent.children.indexOf(t)), (t = t.parent));
      }
    let a = l.node;
    if (a) {
      if (a != n.child(s - 1)) break;
      (--s, i.set(l, s), o.push(l));
    }
  }
  return { index: s, matched: i, matches: o.reverse() };
}
function Np(n, e) {
  return n.type.side - e.type.side;
}
function Op(n, e, t, r) {
  let s = e.locals(n),
    i = 0;
  if (s.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      (r(u, s, e.forChild(i, u), c), (i += u.nodeSize));
    }
    return;
  }
  let o = 0,
    l = [],
    a = null;
  for (let c = 0; ; ) {
    let u, d;
    for (; o < s.length && s[o].to == i; ) {
      let y = s[o++];
      y.widget && (u ? (d || (d = [u])).push(y) : (u = y));
    }
    if (u)
      if (d) {
        d.sort(Np);
        for (let y = 0; y < d.length; y++) t(d[y], c, !!a);
      } else t(u, c, !!a);
    let h, f;
    if (a) ((f = -1), (h = a), (a = null));
    else if (c < n.childCount) ((f = c), (h = n.child(c++)));
    else break;
    for (let y = 0; y < l.length; y++) l[y].to <= i && l.splice(y--, 1);
    for (; o < s.length && s[o].from <= i && s[o].to > i; ) l.push(s[o++]);
    let m = i + h.nodeSize;
    if (h.isText) {
      let y = m;
      o < s.length && s[o].from < y && (y = s[o].from);
      for (let b = 0; b < l.length; b++) l[b].to < y && (y = l[b].to);
      y < m && ((a = h.cut(y - i)), (h = h.cut(0, y - i)), (m = y), (f = -1));
    } else for (; o < s.length && s[o].to < m; ) o++;
    let g = h.isInline && !h.isLeaf ? l.filter(y => !y.inline) : l.slice();
    (r(h, g, e.forChild(i, h), f), (i = m));
  }
}
function Ip(n) {
  if (n.nodeName == 'UL' || n.nodeName == 'OL') {
    let e = n.style.cssText;
    ((n.style.cssText = e + '; list-style: square !important'),
      window.getComputedStyle(n).listStyle,
      (n.style.cssText = e));
  }
}
function Rp(n, e, t, r) {
  for (let s = 0, i = 0; s < n.childCount && i <= r; ) {
    let o = n.child(s++),
      l = i;
    if (((i += o.nodeSize), !o.isText)) continue;
    let a = o.text;
    for (; s < n.childCount; ) {
      let c = n.child(s++);
      if (((i += c.nodeSize), !c.isText)) break;
      a += c.text;
    }
    if (i >= t) {
      if (i >= r && a.slice(r - e.length - l, r - l) == e) return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t) return l + c;
      if (
        t == r &&
        a.length >= r + e.length - l &&
        a.slice(r - l, r - l + e.length) == e
      )
        return r;
    }
  }
  return -1;
}
function vi(n, e, t, r, s) {
  let i = [];
  for (let o = 0, l = 0; o < n.length; o++) {
    let a = n[o],
      c = l,
      u = (l += a.size);
    c >= t || u <= e
      ? i.push(a)
      : (c < e && i.push(a.slice(0, e - c, r)),
        s && (i.push(s), (s = void 0)),
        u > t && i.push(a.slice(t - c, a.size, r)));
  }
  return i;
}
function ao(n, e = null) {
  let t = n.domSelectionRange(),
    r = n.state.doc;
  if (!t.focusNode) return null;
  let s = n.docView.nearestDesc(t.focusNode),
    i = s && s.size == 0,
    o = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0) return null;
  let l = r.resolve(o),
    a,
    c;
  if (ps(t)) {
    for (a = o; s && !s.node; ) s = s.parent;
    let d = s.node;
    if (
      s &&
      d.isAtom &&
      I.isSelectable(d) &&
      s.parent &&
      !(d.isInline && ip(t.focusNode, t.focusOffset, s.dom))
    ) {
      let h = s.posBefore;
      c = new I(o == h ? l : r.resolve(h));
    }
  } else {
    if (
      t instanceof n.dom.ownerDocument.defaultView.Selection &&
      t.rangeCount > 1
    ) {
      let d = o,
        h = o;
      for (let f = 0; f < t.rangeCount; f++) {
        let m = t.getRangeAt(f);
        ((d = Math.min(
          d,
          n.docView.posFromDOM(m.startContainer, m.startOffset, 1)
        )),
          (h = Math.max(
            h,
            n.docView.posFromDOM(m.endContainer, m.endOffset, -1)
          )));
      }
      if (d < 0) return null;
      (([a, o] = h == n.state.selection.anchor ? [h, d] : [d, h]),
        (l = r.resolve(o)));
    } else a = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (a < 0) return null;
  }
  let u = r.resolve(a);
  if (!c) {
    let d = e == 'pointer' || (n.state.selection.head < l.pos && !i) ? 1 : -1;
    c = co(n, u, l, d);
  }
  return c;
}
function nu(n) {
  return n.editable
    ? n.hasFocus()
    : su(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function nt(n, e = !1) {
  let t = n.state.selection;
  if ((ru(n, t), !!nu(n))) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && he) {
      let r = n.domSelectionRange(),
        s = n.domObserver.currentSelection;
      if (
        r.anchorNode &&
        s.anchorNode &&
        Ft(r.anchorNode, r.anchorOffset, s.anchorNode, s.anchorOffset)
      ) {
        ((n.input.mouseDown.delayedSelectionSync = !0),
          n.domObserver.setCurSelection());
        return;
      }
    }
    if ((n.domObserver.disconnectSelection(), n.cursorWrapper)) Dp(n);
    else {
      let { anchor: r, head: s } = t,
        i,
        o;
      (Tl &&
        !(t instanceof D) &&
        (t.$from.parent.inlineContent || (i = El(n, t.from)),
        !t.empty && !t.$from.parent.inlineContent && (o = El(n, t.to))),
        n.docView.setSelection(r, s, n, e),
        Tl && (i && Al(i), o && Al(o)),
        t.visible
          ? n.dom.classList.remove('ProseMirror-hideselection')
          : (n.dom.classList.add('ProseMirror-hideselection'),
            'onselectionchange' in document && Lp(n)));
    }
    (n.domObserver.setCurSelection(), n.domObserver.connectSelection());
  }
}
const Tl = me || (he && Vc < 63);
function El(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0),
    s = r < t.childNodes.length ? t.childNodes[r] : null,
    i = r ? t.childNodes[r - 1] : null;
  if (me && s && s.contentEditable == 'false') return Hs(s);
  if (
    (!s || s.contentEditable == 'false') &&
    (!i || i.contentEditable == 'false')
  ) {
    if (s) return Hs(s);
    if (i) return Hs(i);
  }
}
function Hs(n) {
  return (
    (n.contentEditable = 'true'),
    me && n.draggable && ((n.draggable = !1), (n.wasDraggable = !0)),
    n
  );
}
function Al(n) {
  ((n.contentEditable = 'false'),
    n.wasDraggable && ((n.draggable = !0), (n.wasDraggable = null)));
}
function Lp(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener('selectionchange', n.input.hideSelectionGuard);
  let t = n.domSelectionRange(),
    r = t.anchorNode,
    s = t.anchorOffset;
  e.addEventListener(
    'selectionchange',
    (n.input.hideSelectionGuard = () => {
      (t.anchorNode != r || t.anchorOffset != s) &&
        (e.removeEventListener('selectionchange', n.input.hideSelectionGuard),
        setTimeout(() => {
          (!nu(n) || n.state.selection.visible) &&
            n.dom.classList.remove('ProseMirror-hideselection');
        }, 20));
    })
  );
}
function Dp(n) {
  let e = n.domSelection();
  if (!e) return;
  let t = n.cursorWrapper.dom,
    r = t.nodeName == 'IMG';
  (r ? e.collapse(t.parentNode, ue(t) + 1) : e.collapse(t, 0),
    !r &&
      !n.state.selection.visible &&
      Me &&
      gt <= 11 &&
      ((t.disabled = !0), (t.disabled = !1)));
}
function ru(n, e) {
  if (e instanceof I) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc &&
      (Nl(n), t && t.selectNode(), (n.lastSelectedViewDesc = t));
  } else Nl(n);
}
function Nl(n) {
  n.lastSelectedViewDesc &&
    (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(),
    (n.lastSelectedViewDesc = void 0));
}
function co(n, e, t, r) {
  return (
    n.someProp('createSelectionBetween', s => s(n, e, t)) || D.between(e, t, r)
  );
}
function Ol(n) {
  return n.editable && !n.hasFocus() ? !1 : su(n);
}
function su(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode) return !1;
  try {
    return (
      n.dom.contains(
        e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode
      ) &&
      (n.editable ||
        n.dom.contains(
          e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode
        ))
    );
  } catch {
    return !1;
  }
}
function Pp(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0),
    t = n.domSelectionRange();
  return Ft(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Mi(n, e) {
  let { $anchor: t, $head: r } = n.selection,
    s = e > 0 ? t.max(r) : t.min(r),
    i = s.parent.inlineContent
      ? s.depth
        ? n.doc.resolve(e > 0 ? s.after() : s.before())
        : null
      : s;
  return i && z.findFrom(i, e);
}
function lt(n, e) {
  return (n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0);
}
function Il(n, e, t) {
  let r = n.state.selection;
  if (r instanceof D)
    if (t.indexOf('s') > -1) {
      let { $head: s } = r,
        i = s.textOffset ? null : e < 0 ? s.nodeBefore : s.nodeAfter;
      if (!i || i.isText || !i.isLeaf) return !1;
      let o = n.state.doc.resolve(s.pos + i.nodeSize * (e < 0 ? -1 : 1));
      return lt(n, new D(r.$anchor, o));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? 'forward' : 'backward')) {
        let s = Mi(n.state, e);
        return s && s instanceof I ? lt(n, s) : !1;
      } else if (!(Ie && t.indexOf('m') > -1)) {
        let s = r.$head,
          i = s.textOffset ? null : e < 0 ? s.nodeBefore : s.nodeAfter,
          o;
        if (!i || i.isText) return !1;
        let l = e < 0 ? s.pos - i.nodeSize : s.pos;
        return i.isAtom || ((o = n.docView.descAt(l)) && !o.contentDOM)
          ? I.isSelectable(i)
            ? lt(n, new I(e < 0 ? n.state.doc.resolve(s.pos - i.nodeSize) : s))
            : Gn
              ? lt(n, new D(n.state.doc.resolve(e < 0 ? l : l + i.nodeSize)))
              : !1
          : !1;
      }
    } else return !1;
  else {
    if (r instanceof I && r.node.isInline)
      return lt(n, new D(e > 0 ? r.$to : r.$from));
    {
      let s = Mi(n.state, e);
      return s ? lt(n, s) : !1;
    }
  }
}
function Tr(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function An(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != 'BR');
}
function Qt(n, e) {
  return e < 0 ? jp(n) : Bp(n);
}
function jp(n) {
  let e = n.domSelectionRange(),
    t = e.focusNode,
    r = e.focusOffset;
  if (!t) return;
  let s,
    i,
    o = !1;
  for (
    De && t.nodeType == 1 && r < Tr(t) && An(t.childNodes[r], -1) && (o = !0);
    ;
  )
    if (r > 0) {
      if (t.nodeType != 1) break;
      {
        let l = t.childNodes[r - 1];
        if (An(l, -1)) ((s = t), (i = --r));
        else if (l.nodeType == 3) ((t = l), (r = t.nodeValue.length));
        else break;
      }
    } else {
      if (iu(t)) break;
      {
        let l = t.previousSibling;
        for (; l && An(l, -1); )
          ((s = t.parentNode), (i = ue(l)), (l = l.previousSibling));
        if (l) ((t = l), (r = Tr(t)));
        else {
          if (((t = t.parentNode), t == n.dom)) break;
          r = 0;
        }
      }
    }
  o ? wi(n, t, r) : s && wi(n, s, i);
}
function Bp(n) {
  let e = n.domSelectionRange(),
    t = e.focusNode,
    r = e.focusOffset;
  if (!t) return;
  let s = Tr(t),
    i,
    o;
  for (;;)
    if (r < s) {
      if (t.nodeType != 1) break;
      let l = t.childNodes[r];
      if (An(l, 1)) ((i = t), (o = ++r));
      else break;
    } else {
      if (iu(t)) break;
      {
        let l = t.nextSibling;
        for (; l && An(l, 1); )
          ((i = l.parentNode), (o = ue(l) + 1), (l = l.nextSibling));
        if (l) ((t = l), (r = 0), (s = Tr(t)));
        else {
          if (((t = t.parentNode), t == n.dom)) break;
          r = s = 0;
        }
      }
    }
  i && wi(n, i, o);
}
function iu(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function zp(n, e) {
  for (; n && e == n.childNodes.length && !Jn(n); )
    ((e = ue(n) + 1), (n = n.parentNode));
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3) return t;
    if (t.nodeType == 1 && t.contentEditable == 'false') break;
    ((n = t), (e = 0));
  }
}
function $p(n, e) {
  for (; n && !e && !Jn(n); ) ((e = ue(n)), (n = n.parentNode));
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3) return t;
    if (t.nodeType == 1 && t.contentEditable == 'false') break;
    ((n = t), (e = n.childNodes.length));
  }
}
function wi(n, e, t) {
  if (e.nodeType != 3) {
    let i, o;
    (o = zp(e, t))
      ? ((e = o), (t = 0))
      : (i = $p(e, t)) && ((e = i), (t = i.nodeValue.length));
  }
  let r = n.domSelection();
  if (!r) return;
  if (ps(r)) {
    let i = document.createRange();
    (i.setEnd(e, t), i.setStart(e, t), r.removeAllRanges(), r.addRange(i));
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: s } = n;
  setTimeout(() => {
    n.state == s && nt(n);
  }, 50);
}
function Rl(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(he || Wc) && t.parent.inlineContent) {
    let s = n.coordsAtPos(e);
    if (e > t.start()) {
      let i = n.coordsAtPos(e - 1),
        o = (i.top + i.bottom) / 2;
      if (o > s.top && o < s.bottom && Math.abs(i.left - s.left) > 1)
        return i.left < s.left ? 'ltr' : 'rtl';
    }
    if (e < t.end()) {
      let i = n.coordsAtPos(e + 1),
        o = (i.top + i.bottom) / 2;
      if (o > s.top && o < s.bottom && Math.abs(i.left - s.left) > 1)
        return i.left > s.left ? 'ltr' : 'rtl';
    }
  }
  return getComputedStyle(n.dom).direction == 'rtl' ? 'rtl' : 'ltr';
}
function Ll(n, e, t) {
  let r = n.state.selection;
  if (
    (r instanceof D && !r.empty) ||
    t.indexOf('s') > -1 ||
    (Ie && t.indexOf('m') > -1)
  )
    return !1;
  let { $from: s, $to: i } = r;
  if (!s.parent.inlineContent || n.endOfTextblock(e < 0 ? 'up' : 'down')) {
    let o = Mi(n.state, e);
    if (o && o instanceof I) return lt(n, o);
  }
  if (!s.parent.inlineContent) {
    let o = e < 0 ? s : i,
      l = r instanceof Te ? z.near(o, e) : z.findFrom(o, e);
    return l ? lt(n, l) : !1;
  }
  return !1;
}
function Dl(n, e) {
  if (!(n.state.selection instanceof D)) return !0;
  let { $head: t, $anchor: r, empty: s } = n.state.selection;
  if (!t.sameParent(r)) return !0;
  if (!s) return !1;
  if (n.endOfTextblock(e > 0 ? 'forward' : 'backward')) return !0;
  let i = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (i && !i.isText) {
    let o = n.state.tr;
    return (
      e < 0
        ? o.delete(t.pos - i.nodeSize, t.pos)
        : o.delete(t.pos, t.pos + i.nodeSize),
      n.dispatch(o),
      !0
    );
  }
  return !1;
}
function Pl(n, e, t) {
  (n.domObserver.stop(), (e.contentEditable = t), n.domObserver.start());
}
function Hp(n) {
  if (!me || n.state.selection.$head.parentOffset > 0) return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (
    e &&
    e.nodeType == 1 &&
    t == 0 &&
    e.firstChild &&
    e.firstChild.contentEditable == 'false'
  ) {
    let r = e.firstChild;
    (Pl(n, r, 'true'), setTimeout(() => Pl(n, r, 'false'), 20));
  }
  return !1;
}
function Fp(n) {
  let e = '';
  return (
    n.ctrlKey && (e += 'c'),
    n.metaKey && (e += 'm'),
    n.altKey && (e += 'a'),
    n.shiftKey && (e += 's'),
    e
  );
}
function _p(n, e) {
  let t = e.keyCode,
    r = Fp(e);
  if (t == 8 || (Ie && t == 72 && r == 'c')) return Dl(n, -1) || Qt(n, -1);
  if ((t == 46 && !e.shiftKey) || (Ie && t == 68 && r == 'c'))
    return Dl(n, 1) || Qt(n, 1);
  if (t == 13 || t == 27) return !0;
  if (t == 37 || (Ie && t == 66 && r == 'c')) {
    let s = t == 37 ? (Rl(n, n.state.selection.from) == 'ltr' ? -1 : 1) : -1;
    return Il(n, s, r) || Qt(n, s);
  } else if (t == 39 || (Ie && t == 70 && r == 'c')) {
    let s = t == 39 ? (Rl(n, n.state.selection.from) == 'ltr' ? 1 : -1) : 1;
    return Il(n, s, r) || Qt(n, s);
  } else {
    if (t == 38 || (Ie && t == 80 && r == 'c'))
      return Ll(n, -1, r) || Qt(n, -1);
    if (t == 40 || (Ie && t == 78 && r == 'c'))
      return Hp(n) || Ll(n, 1, r) || Qt(n, 1);
    if (r == (Ie ? 'm' : 'c') && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function uo(n, e) {
  n.someProp('transformCopied', f => {
    e = f(e, n);
  });
  let t = [],
    { content: r, openStart: s, openEnd: i } = e;
  for (
    ;
    s > 1 && i > 1 && r.childCount == 1 && r.firstChild.childCount == 1;
  ) {
    (s--, i--);
    let f = r.firstChild;
    (t.push(f.type.name, f.attrs != f.type.defaultAttrs ? f.attrs : null),
      (r = f.content));
  }
  let o = n.someProp('clipboardSerializer') || Wt.fromSchema(n.state.schema),
    l = du(),
    a = l.createElement('div');
  a.appendChild(o.serializeFragment(r, { document: l }));
  let c = a.firstChild,
    u,
    d = 0;
  for (; c && c.nodeType == 1 && (u = uu[c.nodeName.toLowerCase()]); ) {
    for (let f = u.length - 1; f >= 0; f--) {
      let m = l.createElement(u[f]);
      for (; a.firstChild; ) m.appendChild(a.firstChild);
      (a.appendChild(m), d++);
    }
    c = a.firstChild;
  }
  c &&
    c.nodeType == 1 &&
    c.setAttribute(
      'data-pm-slice',
      `${s} ${i}${d ? ` -${d}` : ''} ${JSON.stringify(t)}`
    );
  let h =
    n.someProp('clipboardTextSerializer', f => f(e, n)) ||
    e.content.textBetween(
      0,
      e.content.size,
      `

`
    );
  return { dom: a, text: h, slice: e };
}
function ou(n, e, t, r, s) {
  let i = s.parent.type.spec.code,
    o,
    l;
  if (!t && !e) return null;
  let a = !!e && (r || i || !t);
  if (a) {
    if (
      (n.someProp('transformPastedText', h => {
        e = h(e, i || r, n);
      }),
      i)
    )
      return (
        (l = new A(
          C.from(
            n.state.schema.text(
              e.replace(
                /\r\n?/g,
                `
`
              )
            )
          ),
          0,
          0
        )),
        n.someProp('transformPasted', h => {
          l = h(l, n, !0);
        }),
        l
      );
    let d = n.someProp('clipboardTextParser', h => h(e, s, r, n));
    if (d) l = d;
    else {
      let h = s.marks(),
        { schema: f } = n.state,
        m = Wt.fromSchema(f);
      ((o = document.createElement('div')),
        e.split(/(?:\r\n?|\n)+/).forEach(g => {
          let y = o.appendChild(document.createElement('p'));
          g && y.appendChild(m.serializeNode(f.text(g, h)));
        }));
    }
  } else
    (n.someProp('transformPastedHTML', d => {
      t = d(t, n);
    }),
      (o = qp(t)),
      Gn && Kp(o));
  let c = o && o.querySelector('[data-pm-slice]'),
    u =
      c &&
      /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(
        c.getAttribute('data-pm-slice') || ''
      );
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let h = o.firstChild;
      for (; h && h.nodeType != 1; ) h = h.nextSibling;
      if (!h) break;
      o = h;
    }
  if (
    (l ||
      (l = (
        n.someProp('clipboardParser') ||
        n.someProp('domParser') ||
        mt.fromSchema(n.state.schema)
      ).parseSlice(o, {
        preserveWhitespace: !!(a || u),
        context: s,
        ruleFromNode(h) {
          return h.nodeName == 'BR' &&
            !h.nextSibling &&
            h.parentNode &&
            !Vp.test(h.parentNode.nodeName)
            ? { ignore: !0 }
            : null;
        }
      })),
    u)
  )
    l = Jp(jl(l, +u[1], +u[2]), u[4]);
  else if (((l = A.maxOpen(Wp(l.content, s), !0)), l.openStart || l.openEnd)) {
    let d = 0,
      h = 0;
    for (
      let f = l.content.firstChild;
      d < l.openStart && !f.type.spec.isolating;
      d++, f = f.firstChild
    );
    for (
      let f = l.content.lastChild;
      h < l.openEnd && !f.type.spec.isolating;
      h++, f = f.lastChild
    );
    l = jl(l, d, h);
  }
  return (
    n.someProp('transformPasted', d => {
      l = d(l, n, a);
    }),
    l
  );
}
const Vp =
  /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Wp(n, e) {
  if (n.childCount < 2) return n;
  for (let t = e.depth; t >= 0; t--) {
    let s = e.node(t).contentMatchAt(e.index(t)),
      i,
      o = [];
    if (
      (n.forEach(l => {
        if (!o) return;
        let a = s.findWrapping(l.type),
          c;
        if (!a) return (o = null);
        if ((c = o.length && i.length && au(a, i, l, o[o.length - 1], 0)))
          o[o.length - 1] = c;
        else {
          o.length && (o[o.length - 1] = cu(o[o.length - 1], i.length));
          let u = lu(l, a);
          (o.push(u), (s = s.matchType(u.type)), (i = a));
        }
      }),
      o)
    )
      return C.from(o);
  }
  return n;
}
function lu(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--) n = e[r].create(null, C.from(n));
  return n;
}
function au(n, e, t, r, s) {
  if (s < n.length && s < e.length && n[s] == e[s]) {
    let i = au(n, e, t, r.lastChild, s + 1);
    if (i) return r.copy(r.content.replaceChild(r.childCount - 1, i));
    if (
      r
        .contentMatchAt(r.childCount)
        .matchType(s == n.length - 1 ? t.type : n[s + 1])
    )
      return r.copy(r.content.append(C.from(lu(t, n, s + 1))));
  }
}
function cu(n, e) {
  if (e == 0) return n;
  let t = n.content.replaceChild(n.childCount - 1, cu(n.lastChild, e - 1)),
    r = n.contentMatchAt(n.childCount).fillBefore(C.empty, !0);
  return n.copy(t.append(r));
}
function Ti(n, e, t, r, s, i) {
  let o = e < 0 ? n.firstChild : n.lastChild,
    l = o.content;
  return (
    n.childCount > 1 && (i = 0),
    s < r - 1 && (l = Ti(l, e, t, r, s + 1, i)),
    s >= t &&
      (l =
        e < 0
          ? o
              .contentMatchAt(0)
              .fillBefore(l, i <= s)
              .append(l)
          : l.append(o.contentMatchAt(o.childCount).fillBefore(C.empty, !0))),
    n.replaceChild(e < 0 ? 0 : n.childCount - 1, o.copy(l))
  );
}
function jl(n, e, t) {
  return (
    e < n.openStart &&
      (n = new A(
        Ti(n.content, -1, e, n.openStart, 0, n.openEnd),
        e,
        n.openEnd
      )),
    t < n.openEnd &&
      (n = new A(Ti(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)),
    n
  );
}
const uu = {
  thead: ['table'],
  tbody: ['table'],
  tfoot: ['table'],
  caption: ['table'],
  colgroup: ['table'],
  col: ['table', 'colgroup'],
  tr: ['table', 'tbody'],
  td: ['table', 'tbody', 'tr'],
  th: ['table', 'tbody', 'tr']
};
let Bl = null;
function du() {
  return Bl || (Bl = document.implementation.createHTMLDocument('title'));
}
let Fs = null;
function Up(n) {
  let e = window.trustedTypes;
  return e
    ? (Fs ||
        (Fs =
          e.defaultPolicy ||
          e.createPolicy('ProseMirrorClipboard', { createHTML: t => t })),
      Fs.createHTML(n))
    : n;
}
function qp(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = du().createElement('div'),
    r = /<([a-z][^>\s]+)/i.exec(n),
    s;
  if (
    ((s = r && uu[r[1].toLowerCase()]) &&
      (n =
        s.map(i => '<' + i + '>').join('') +
        n +
        s
          .map(i => '</' + i + '>')
          .reverse()
          .join('')),
    (t.innerHTML = Up(n)),
    s)
  )
    for (let i = 0; i < s.length; i++) t = t.querySelector(s[i]) || t;
  return t;
}
function Kp(n) {
  let e = n.querySelectorAll(
    he ? 'span:not([class]):not([style])' : 'span.Apple-converted-space'
  );
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 &&
      r.textContent == ' ' &&
      r.parentNode &&
      r.parentNode.replaceChild(n.ownerDocument.createTextNode(' '), r);
  }
}
function Jp(n, e) {
  if (!n.size) return n;
  let t = n.content.firstChild.type.schema,
    r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: s, openStart: i, openEnd: o } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs()) break;
    ((s = C.from(a.create(r[l + 1], s))), i++, o++);
  }
  return new A(s, i, o);
}
const xe = {},
  ke = {},
  Gp = { touchstart: !0, touchmove: !0 };
class Yp {
  constructor() {
    ((this.shiftKey = !1),
      (this.mouseDown = null),
      (this.lastKeyCode = null),
      (this.lastKeyCodeTime = 0),
      (this.lastClick = { time: 0, x: 0, y: 0, type: '', button: 0 }),
      (this.lastSelectionOrigin = null),
      (this.lastSelectionTime = 0),
      (this.lastIOSEnter = 0),
      (this.lastIOSEnterFallbackTimeout = -1),
      (this.lastFocus = 0),
      (this.lastTouch = 0),
      (this.lastChromeDelete = 0),
      (this.composing = !1),
      (this.compositionNode = null),
      (this.composingTimeout = -1),
      (this.compositionNodes = []),
      (this.compositionEndedAt = -2e8),
      (this.compositionID = 1),
      (this.badSafariComposition = !1),
      (this.compositionPendingChanges = 0),
      (this.domChangeCount = 0),
      (this.eventHandlers = Object.create(null)),
      (this.hideSelectionGuard = null));
  }
}
function Xp(n) {
  for (let e in xe) {
    let t = xe[e];
    n.dom.addEventListener(
      e,
      (n.input.eventHandlers[e] = r => {
        Zp(n, r) && !ho(n, r) && (n.editable || !(r.type in ke)) && t(n, r);
      }),
      Gp[e] ? { passive: !0 } : void 0
    );
  }
  (me && n.dom.addEventListener('input', () => null), Ei(n));
}
function pt(n, e) {
  ((n.input.lastSelectionOrigin = e), (n.input.lastSelectionTime = Date.now()));
}
function Qp(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  (clearTimeout(n.input.composingTimeout),
    clearTimeout(n.input.lastIOSEnterFallbackTimeout));
}
function Ei(n) {
  n.someProp('handleDOMEvents', e => {
    for (let t in e)
      n.input.eventHandlers[t] ||
        n.dom.addEventListener(t, (n.input.eventHandlers[t] = r => ho(n, r)));
  });
}
function ho(n, e) {
  return n.someProp('handleDOMEvents', t => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function Zp(n, e) {
  if (!e.bubbles) return !0;
  if (e.defaultPrevented) return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || (t.pmViewDesc && t.pmViewDesc.stopEvent(e)))
      return !1;
  return !0;
}
function em(n, e) {
  !ho(n, e) &&
    xe[e.type] &&
    (n.editable || !(e.type in ke)) &&
    xe[e.type](n, e);
}
ke.keydown = (n, e) => {
  let t = e;
  if (
    ((n.input.shiftKey = t.keyCode == 16 || t.shiftKey),
    !fu(n, t) &&
      ((n.input.lastKeyCode = t.keyCode),
      (n.input.lastKeyCodeTime = Date.now()),
      !(et && he && t.keyCode == 13)))
  )
    if (
      (t.keyCode != 229 && n.domObserver.forceFlush(),
      hn && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey)
    ) {
      let r = Date.now();
      ((n.input.lastIOSEnter = r),
        (n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
          n.input.lastIOSEnter == r &&
            (n.someProp('handleKeyDown', s => s(n, Et(13, 'Enter'))),
            (n.input.lastIOSEnter = 0));
        }, 200)));
    } else
      n.someProp('handleKeyDown', r => r(n, t)) || _p(n, t)
        ? t.preventDefault()
        : pt(n, 'key');
};
ke.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
ke.keypress = (n, e) => {
  let t = e;
  if (fu(n, t) || !t.charCode || (t.ctrlKey && !t.altKey) || (Ie && t.metaKey))
    return;
  if (n.someProp('handleKeyPress', s => s(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof D) || !r.$from.sameParent(r.$to)) {
    let s = String.fromCharCode(t.charCode),
      i = () => n.state.tr.insertText(s).scrollIntoView();
    (!/[\r\n]/.test(s) &&
      !n.someProp('handleTextInput', o => o(n, r.$from.pos, r.$to.pos, s, i)) &&
      n.dispatch(i()),
      t.preventDefault());
  }
};
function gs(n) {
  return { left: n.clientX, top: n.clientY };
}
function tm(n, e) {
  let t = e.x - n.clientX,
    r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function fo(n, e, t, r, s) {
  if (r == -1) return !1;
  let i = n.state.doc.resolve(r);
  for (let o = i.depth + 1; o > 0; o--)
    if (
      n.someProp(e, l =>
        o > i.depth
          ? l(n, t, i.nodeAfter, i.before(o), s, !0)
          : l(n, t, i.node(o), i.before(o), s, !1)
      )
    )
      return !0;
  return !1;
}
function an(n, e, t) {
  if ((n.focused || n.focus(), n.state.selection.eq(e))) return;
  let r = n.state.tr.setSelection(e);
  (r.setMeta('pointer', !0), n.dispatch(r));
}
function nm(n, e) {
  if (e == -1) return !1;
  let t = n.state.doc.resolve(e),
    r = t.nodeAfter;
  return r && r.isAtom && I.isSelectable(r) ? (an(n, new I(t)), !0) : !1;
}
function rm(n, e) {
  if (e == -1) return !1;
  let t = n.state.selection,
    r,
    s;
  t instanceof I && (r = t.node);
  let i = n.state.doc.resolve(e);
  for (let o = i.depth + 1; o > 0; o--) {
    let l = o > i.depth ? i.nodeAfter : i.node(o);
    if (I.isSelectable(l)) {
      r &&
      t.$from.depth > 0 &&
      o >= t.$from.depth &&
      i.before(t.$from.depth + 1) == t.$from.pos
        ? (s = i.before(t.$from.depth))
        : (s = i.before(o));
      break;
    }
  }
  return s != null ? (an(n, I.create(n.state.doc, s)), !0) : !1;
}
function sm(n, e, t, r, s) {
  return (
    fo(n, 'handleClickOn', e, t, r) ||
    n.someProp('handleClick', i => i(n, e, r)) ||
    (s ? rm(n, t) : nm(n, t))
  );
}
function im(n, e, t, r) {
  return (
    fo(n, 'handleDoubleClickOn', e, t, r) ||
    n.someProp('handleDoubleClick', s => s(n, e, r))
  );
}
function om(n, e, t, r) {
  return (
    fo(n, 'handleTripleClickOn', e, t, r) ||
    n.someProp('handleTripleClick', s => s(n, e, r)) ||
    lm(n, t, r)
  );
}
function lm(n, e, t) {
  if (t.button != 0) return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (an(n, D.create(r, 0, r.content.size)), !0) : !1;
  let s = r.resolve(e);
  for (let i = s.depth + 1; i > 0; i--) {
    let o = i > s.depth ? s.nodeAfter : s.node(i),
      l = s.before(i);
    if (o.inlineContent) an(n, D.create(r, l + 1, l + 1 + o.content.size));
    else if (I.isSelectable(o)) an(n, I.create(r, l));
    else continue;
    return !0;
  }
}
function po(n) {
  return Er(n);
}
const hu = Ie ? 'metaKey' : 'ctrlKey';
xe.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = po(n),
    s = Date.now(),
    i = 'singleClick';
  (s - n.input.lastClick.time < 500 &&
    tm(t, n.input.lastClick) &&
    !t[hu] &&
    n.input.lastClick.button == t.button &&
    (n.input.lastClick.type == 'singleClick'
      ? (i = 'doubleClick')
      : n.input.lastClick.type == 'doubleClick' && (i = 'tripleClick')),
    (n.input.lastClick = {
      time: s,
      x: t.clientX,
      y: t.clientY,
      type: i,
      button: t.button
    }));
  let o = n.posAtCoords(gs(t));
  o &&
    (i == 'singleClick'
      ? (n.input.mouseDown && n.input.mouseDown.done(),
        (n.input.mouseDown = new am(n, o, t, !!r)))
      : (i == 'doubleClick' ? im : om)(n, o.pos, o.inside, t)
        ? t.preventDefault()
        : pt(n, 'pointer'));
};
class am {
  constructor(e, t, r, s) {
    ((this.view = e),
      (this.pos = t),
      (this.event = r),
      (this.flushed = s),
      (this.delayedSelectionSync = !1),
      (this.mightDrag = null),
      (this.startDoc = e.state.doc),
      (this.selectNode = !!r[hu]),
      (this.allowDefault = r.shiftKey));
    let i, o;
    if (t.inside > -1) ((i = e.state.doc.nodeAt(t.inside)), (o = t.inside));
    else {
      let u = e.state.doc.resolve(t.pos);
      ((i = u.parent), (o = u.depth ? u.before() : 0));
    }
    const l = s ? null : r.target,
      a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.nodeDOM.nodeType == 1 ? a.nodeDOM : null;
    let { selection: c } = e.state;
    (r.button == 0 &&
      ((i.type.spec.draggable && i.type.spec.selectable !== !1) ||
        (c instanceof I && c.from <= o && c.to > o)) &&
      (this.mightDrag = {
        node: i,
        pos: o,
        addAttr: !!(this.target && !this.target.draggable),
        setUneditable: !!(
          this.target &&
          De &&
          !this.target.hasAttribute('contentEditable')
        )
      }),
      this.target &&
        this.mightDrag &&
        (this.mightDrag.addAttr || this.mightDrag.setUneditable) &&
        (this.view.domObserver.stop(),
        this.mightDrag.addAttr && (this.target.draggable = !0),
        this.mightDrag.setUneditable &&
          setTimeout(() => {
            this.view.input.mouseDown == this &&
              this.target.setAttribute('contentEditable', 'false');
          }, 20),
        this.view.domObserver.start()),
      e.root.addEventListener('mouseup', (this.up = this.up.bind(this))),
      e.root.addEventListener('mousemove', (this.move = this.move.bind(this))),
      pt(e, 'pointer'));
  }
  done() {
    (this.view.root.removeEventListener('mouseup', this.up),
      this.view.root.removeEventListener('mousemove', this.move),
      this.mightDrag &&
        this.target &&
        (this.view.domObserver.stop(),
        this.mightDrag.addAttr && this.target.removeAttribute('draggable'),
        this.mightDrag.setUneditable &&
          this.target.removeAttribute('contentEditable'),
        this.view.domObserver.start()),
      this.delayedSelectionSync && setTimeout(() => nt(this.view)),
      (this.view.input.mouseDown = null));
  }
  up(e) {
    if ((this.done(), !this.view.dom.contains(e.target))) return;
    let t = this.pos;
    (this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(gs(e))),
      this.updateAllowDefault(e),
      this.allowDefault || !t
        ? pt(this.view, 'pointer')
        : sm(this.view, t.pos, t.inside, e, this.selectNode)
          ? e.preventDefault()
          : e.button == 0 &&
              (this.flushed ||
                (me && this.mightDrag && !this.mightDrag.node.isAtom) ||
                (he &&
                  !this.view.state.selection.visible &&
                  Math.min(
                    Math.abs(t.pos - this.view.state.selection.from),
                    Math.abs(t.pos - this.view.state.selection.to)
                  ) <= 2))
            ? (an(this.view, z.near(this.view.state.doc.resolve(t.pos))),
              e.preventDefault())
            : pt(this.view, 'pointer'));
  }
  move(e) {
    (this.updateAllowDefault(e),
      pt(this.view, 'pointer'),
      e.buttons == 0 && this.done());
  }
  updateAllowDefault(e) {
    !this.allowDefault &&
      (Math.abs(this.event.x - e.clientX) > 4 ||
        Math.abs(this.event.y - e.clientY) > 4) &&
      (this.allowDefault = !0);
  }
}
xe.touchstart = n => {
  ((n.input.lastTouch = Date.now()), po(n), pt(n, 'pointer'));
};
xe.touchmove = n => {
  ((n.input.lastTouch = Date.now()), pt(n, 'pointer'));
};
xe.contextmenu = n => po(n);
function fu(n, e) {
  return n.composing
    ? !0
    : me && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500
      ? ((n.input.compositionEndedAt = -2e8), !0)
      : !1;
}
const cm = et ? 5e3 : -1;
ke.compositionstart = ke.compositionupdate = n => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n,
      t = e.selection.$to;
    if (
      e.selection instanceof D &&
      (e.storedMarks ||
        (!t.textOffset &&
          t.parentOffset &&
          t.nodeBefore.marks.some(r => r.type.spec.inclusive === !1)) ||
        (he && Wc && um(n)))
    )
      ((n.markCursor = n.state.storedMarks || t.marks()),
        Er(n, !0),
        (n.markCursor = null));
    else if (
      (Er(n, !e.selection.empty),
      De &&
        e.selection.empty &&
        t.parentOffset &&
        !t.textOffset &&
        t.nodeBefore.marks.length)
    ) {
      let r = n.domSelectionRange();
      for (
        let s = r.focusNode, i = r.focusOffset;
        s && s.nodeType == 1 && i != 0;
      ) {
        let o = i < 0 ? s.lastChild : s.childNodes[i - 1];
        if (!o) break;
        if (o.nodeType == 3) {
          let l = n.domSelection();
          l && l.collapse(o, o.nodeValue.length);
          break;
        } else ((s = o), (i = -1));
      }
    }
    n.input.composing = !0;
  }
  pu(n, cm);
};
function um(n) {
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (!e || e.nodeType != 1 || t >= e.childNodes.length) return !1;
  let r = e.childNodes[t];
  return r.nodeType == 1 && r.contentEditable == 'false';
}
ke.compositionend = (n, e) => {
  n.composing &&
    ((n.input.composing = !1),
    (n.input.compositionEndedAt = e.timeStamp),
    (n.input.compositionPendingChanges = n.domObserver.pendingRecords().length
      ? n.input.compositionID
      : 0),
    (n.input.compositionNode = null),
    n.input.badSafariComposition
      ? n.domObserver.forceFlush()
      : n.input.compositionPendingChanges &&
        Promise.resolve().then(() => n.domObserver.flush()),
    n.input.compositionID++,
    pu(n, 20));
};
function pu(n, e) {
  (clearTimeout(n.input.composingTimeout),
    e > -1 && (n.input.composingTimeout = setTimeout(() => Er(n), e)));
}
function mu(n) {
  for (
    n.composing &&
    ((n.input.composing = !1), (n.input.compositionEndedAt = hm()));
    n.input.compositionNodes.length > 0;
  )
    n.input.compositionNodes.pop().markParentsDirty();
}
function dm(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode) return null;
  let t = rp(e.focusNode, e.focusOffset),
    r = sp(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let s = r.pmViewDesc,
      i = n.domObserver.lastChangedTextNode;
    if (t == i || r == i) return i;
    if (!s || !s.isText(r.nodeValue)) return r;
    if (n.input.compositionNode == r) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue))) return r;
    }
  }
  return t || r;
}
function hm() {
  let n = document.createEvent('Event');
  return (n.initEvent('event', !0, !0), n.timeStamp);
}
function Er(n, e = !1) {
  if (!(et && n.domObserver.flushingSoon >= 0)) {
    if (
      (n.domObserver.forceFlush(), mu(n), e || (n.docView && n.docView.dirty))
    ) {
      let t = ao(n),
        r = n.state.selection;
      return (
        t && !t.eq(r)
          ? n.dispatch(n.state.tr.setSelection(t))
          : (n.markCursor || e) &&
              !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent
            ? n.dispatch(n.state.tr.deleteSelection())
            : n.updateState(n.state),
        !0
      );
    }
    return !1;
  }
}
function fm(n, e) {
  if (!n.dom.parentNode) return;
  let t = n.dom.parentNode.appendChild(document.createElement('div'));
  (t.appendChild(e),
    (t.style.cssText = 'position: fixed; left: -10000px; top: 10px'));
  let r = getSelection(),
    s = document.createRange();
  (s.selectNodeContents(e),
    n.dom.blur(),
    r.removeAllRanges(),
    r.addRange(s),
    setTimeout(() => {
      (t.parentNode && t.parentNode.removeChild(t), n.focus());
    }, 50));
}
const Hn = (Me && gt < 15) || (hn && ap < 604);
xe.copy = ke.cut = (n, e) => {
  let t = e,
    r = n.state.selection,
    s = t.type == 'cut';
  if (r.empty) return;
  let i = Hn ? null : t.clipboardData,
    o = r.content(),
    { dom: l, text: a } = uo(n, o);
  (i
    ? (t.preventDefault(),
      i.clearData(),
      i.setData('text/html', l.innerHTML),
      i.setData('text/plain', a))
    : fm(n, l),
    s &&
      n.dispatch(
        n.state.tr.deleteSelection().scrollIntoView().setMeta('uiEvent', 'cut')
      ));
};
function pm(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1
    ? n.content.firstChild
    : null;
}
function mm(n, e) {
  if (!n.dom.parentNode) return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code,
    r = n.dom.parentNode.appendChild(
      document.createElement(t ? 'textarea' : 'div')
    );
  (t || (r.contentEditable = 'true'),
    (r.style.cssText = 'position: fixed; left: -10000px; top: 10px'),
    r.focus());
  let s = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    (n.focus(),
      r.parentNode && r.parentNode.removeChild(r),
      t ? Fn(n, r.value, null, s, e) : Fn(n, r.textContent, r.innerHTML, s, e));
  }, 50);
}
function Fn(n, e, t, r, s) {
  let i = ou(n, e, t, r, n.state.selection.$from);
  if (n.someProp('handlePaste', a => a(n, s, i || A.empty))) return !0;
  if (!i) return !1;
  let o = pm(i),
    l = o
      ? n.state.tr.replaceSelectionWith(o, r)
      : n.state.tr.replaceSelection(i);
  return (
    n.dispatch(
      l.scrollIntoView().setMeta('paste', !0).setMeta('uiEvent', 'paste')
    ),
    !0
  );
}
function gu(n) {
  let e = n.getData('text/plain') || n.getData('Text');
  if (e) return e;
  let t = n.getData('text/uri-list');
  return t ? t.replace(/\r?\n/g, ' ') : '';
}
ke.paste = (n, e) => {
  let t = e;
  if (n.composing && !et) return;
  let r = Hn ? null : t.clipboardData,
    s = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && Fn(n, gu(r), r.getData('text/html'), s, t)
    ? t.preventDefault()
    : mm(n, t);
};
class yu {
  constructor(e, t, r) {
    ((this.slice = e), (this.move = t), (this.node = r));
  }
}
const gm = Ie ? 'altKey' : 'ctrlKey';
function bu(n, e) {
  let t;
  return (
    n.someProp('dragCopies', r => {
      t = t || r(e);
    }),
    t != null ? !t : !e[gm]
  );
}
xe.dragstart = (n, e) => {
  let t = e,
    r = n.input.mouseDown;
  if ((r && r.done(), !t.dataTransfer)) return;
  let s = n.state.selection,
    i = s.empty ? null : n.posAtCoords(gs(t)),
    o;
  if (!(i && i.pos >= s.from && i.pos <= (s instanceof I ? s.to - 1 : s.to))) {
    if (r && r.mightDrag) o = I.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let d = n.docView.nearestDesc(t.target, !0);
      d &&
        d.node.type.spec.draggable &&
        d != n.docView &&
        (o = I.create(n.state.doc, d.posBefore));
    }
  }
  let l = (o || n.state.selection).content(),
    { dom: a, text: c, slice: u } = uo(n, l);
  ((!t.dataTransfer.files.length || !he || Vc > 120) &&
    t.dataTransfer.clearData(),
    t.dataTransfer.setData(Hn ? 'Text' : 'text/html', a.innerHTML),
    (t.dataTransfer.effectAllowed = 'copyMove'),
    Hn || t.dataTransfer.setData('text/plain', c),
    (n.dragging = new yu(u, bu(n, t), o)));
};
xe.dragend = n => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
ke.dragover = ke.dragenter = (n, e) => e.preventDefault();
ke.drop = (n, e) => {
  try {
    ym(n, e, n.dragging);
  } finally {
    n.dragging = null;
  }
};
function ym(n, e, t) {
  if (!e.dataTransfer) return;
  let r = n.posAtCoords(gs(e));
  if (!r) return;
  let s = n.state.doc.resolve(r.pos),
    i = t && t.slice;
  i
    ? n.someProp('transformPasted', f => {
        i = f(i, n, !1);
      })
    : (i = ou(
        n,
        gu(e.dataTransfer),
        Hn ? null : e.dataTransfer.getData('text/html'),
        !1,
        s
      ));
  let o = !!(t && bu(n, e));
  if (n.someProp('handleDrop', f => f(n, e, i || A.empty, o))) {
    e.preventDefault();
    return;
  }
  if (!i) return;
  e.preventDefault();
  let l = i ? Sc(n.state.doc, s.pos, i) : s.pos;
  l == null && (l = s.pos);
  let a = n.state.tr;
  if (o) {
    let { node: f } = t;
    f ? f.replace(a) : a.deleteSelection();
  }
  let c = a.mapping.map(l),
    u = i.openStart == 0 && i.openEnd == 0 && i.content.childCount == 1,
    d = a.doc;
  if (
    (u
      ? a.replaceRangeWith(c, c, i.content.firstChild)
      : a.replaceRange(c, c, i),
    a.doc.eq(d))
  )
    return;
  let h = a.doc.resolve(c);
  if (
    u &&
    I.isSelectable(i.content.firstChild) &&
    h.nodeAfter &&
    h.nodeAfter.sameMarkup(i.content.firstChild)
  )
    a.setSelection(new I(h));
  else {
    let f = a.mapping.map(l);
    (a.mapping.maps[a.mapping.maps.length - 1].forEach((m, g, y, b) => (f = b)),
      a.setSelection(co(n, h, a.doc.resolve(f))));
  }
  (n.focus(), n.dispatch(a.setMeta('uiEvent', 'drop')));
}
xe.focus = n => {
  ((n.input.lastFocus = Date.now()),
    n.focused ||
      (n.domObserver.stop(),
      n.dom.classList.add('ProseMirror-focused'),
      n.domObserver.start(),
      (n.focused = !0),
      setTimeout(() => {
        n.docView &&
          n.hasFocus() &&
          !n.domObserver.currentSelection.eq(n.domSelectionRange()) &&
          nt(n);
      }, 20)));
};
xe.blur = (n, e) => {
  let t = e;
  n.focused &&
    (n.domObserver.stop(),
    n.dom.classList.remove('ProseMirror-focused'),
    n.domObserver.start(),
    t.relatedTarget &&
      n.dom.contains(t.relatedTarget) &&
      n.domObserver.currentSelection.clear(),
    (n.focused = !1));
};
xe.beforeinput = (n, e) => {
  if (he && et && e.inputType == 'deleteContentBackward') {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (
        n.input.domChangeCount != r ||
        (n.dom.blur(),
        n.focus(),
        n.someProp('handleKeyDown', i => i(n, Et(8, 'Backspace'))))
      )
        return;
      let { $cursor: s } = n.state.selection;
      s &&
        s.pos > 0 &&
        n.dispatch(n.state.tr.delete(s.pos - 1, s.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in ke) xe[n] = ke[n];
function _n(n, e) {
  if (n == e) return !0;
  for (let t in n) if (n[t] !== e[t]) return !1;
  for (let t in e) if (!(t in n)) return !1;
  return !0;
}
class Ar {
  constructor(e, t) {
    ((this.toDOM = e),
      (this.spec = t || Dt),
      (this.side = this.spec.side || 0));
  }
  map(e, t, r, s) {
    let { pos: i, deleted: o } = e.mapResult(
      t.from + s,
      this.side < 0 ? -1 : 1
    );
    return o ? null : new ye(i - r, i - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return (
      this == e ||
      (e instanceof Ar &&
        ((this.spec.key && this.spec.key == e.spec.key) ||
          (this.toDOM == e.toDOM && _n(this.spec, e.spec))))
    );
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class bt {
  constructor(e, t) {
    ((this.attrs = e), (this.spec = t || Dt));
  }
  map(e, t, r, s) {
    let i = e.map(t.from + s, this.spec.inclusiveStart ? -1 : 1) - r,
      o = e.map(t.to + s, this.spec.inclusiveEnd ? 1 : -1) - r;
    return i >= o ? null : new ye(i, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return (
      this == e ||
      (e instanceof bt && _n(this.attrs, e.attrs) && _n(this.spec, e.spec))
    );
  }
  static is(e) {
    return e.type instanceof bt;
  }
  destroy() {}
}
class mo {
  constructor(e, t) {
    ((this.attrs = e), (this.spec = t || Dt));
  }
  map(e, t, r, s) {
    let i = e.mapResult(t.from + s, 1);
    if (i.deleted) return null;
    let o = e.mapResult(t.to + s, -1);
    return o.deleted || o.pos <= i.pos
      ? null
      : new ye(i.pos - r, o.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: s } = e.content.findIndex(t.from),
      i;
    return s == t.from && !(i = e.child(r)).isText && s + i.nodeSize == t.to;
  }
  eq(e) {
    return (
      this == e ||
      (e instanceof mo && _n(this.attrs, e.attrs) && _n(this.spec, e.spec))
    );
  }
  destroy() {}
}
class ye {
  constructor(e, t, r) {
    ((this.from = e), (this.to = t), (this.type = r));
  }
  copy(e, t) {
    return new ye(e, t, this.type);
  }
  eq(e, t = 0) {
    return (
      this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to
    );
  }
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  static widget(e, t, r) {
    return new ye(e, e, new Ar(t, r));
  }
  static inline(e, t, r, s) {
    return new ye(e, t, new bt(r, s));
  }
  static node(e, t, r, s) {
    return new ye(e, t, new mo(r, s));
  }
  get spec() {
    return this.type.spec;
  }
  get inline() {
    return this.type instanceof bt;
  }
  get widget() {
    return this.type instanceof Ar;
  }
}
const nn = [],
  Dt = {};
class G {
  constructor(e, t) {
    ((this.local = e.length ? e : nn), (this.children = t.length ? t : nn));
  }
  static create(e, t) {
    return t.length ? Nr(t, e, 0, Dt) : pe;
  }
  find(e, t, r) {
    let s = [];
    return (this.findInner(e ?? 0, t ?? 1e9, s, 0, r), s);
  }
  findInner(e, t, r, s, i) {
    for (let o = 0; o < this.local.length; o++) {
      let l = this.local[o];
      l.from <= t &&
        l.to >= e &&
        (!i || i(l.spec)) &&
        r.push(l.copy(l.from + s, l.to + s));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let l = this.children[o] + 1;
        this.children[o + 2].findInner(e - l, t - l, r, s + l, i);
      }
  }
  map(e, t, r) {
    return this == pe || e.maps.length == 0
      ? this
      : this.mapInner(e, t, 0, 0, r || Dt);
  }
  mapInner(e, t, r, s, i) {
    let o;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, s);
      a && a.type.valid(t, a)
        ? (o || (o = [])).push(a)
        : i.onRemove && i.onRemove(this.local[l].spec);
    }
    return this.children.length
      ? bm(this.children, o || [], e, t, r, s, i)
      : o
        ? new G(o.sort(Pt), nn)
        : pe;
  }
  add(e, t) {
    return t.length
      ? this == pe
        ? G.create(e, t)
        : this.addInner(e, t, 0)
      : this;
  }
  addInner(e, t, r) {
    let s,
      i = 0;
    e.forEach((l, a) => {
      let c = a + r,
        u;
      if ((u = ku(t, l, c))) {
        for (s || (s = this.children.slice()); i < s.length && s[i] < a; )
          i += 3;
        (s[i] == a
          ? (s[i + 2] = s[i + 2].addInner(l, u, c + 1))
          : s.splice(i, 0, a, a + l.nodeSize, Nr(u, l, c + 1, Dt)),
          (i += 3));
      }
    });
    let o = xu(i ? Cu(t) : t, -r);
    for (let l = 0; l < o.length; l++)
      o[l].type.valid(e, o[l]) || o.splice(l--, 1);
    return new G(
      o.length ? this.local.concat(o).sort(Pt) : this.local,
      s || this.children
    );
  }
  remove(e) {
    return e.length == 0 || this == pe ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children,
      s = this.local;
    for (let i = 0; i < r.length; i += 3) {
      let o,
        l = r[i] + t,
        a = r[i + 1] + t;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) &&
          d.from > l &&
          d.to < a &&
          ((e[u] = null), (o || (o = [])).push(d));
      if (!o) continue;
      r == this.children && (r = this.children.slice());
      let c = r[i + 2].removeInner(o, l + 1);
      c != pe ? (r[i + 2] = c) : (r.splice(i, 3), (i -= 3));
    }
    if (s.length) {
      for (let i = 0, o; i < e.length; i++)
        if ((o = e[i]))
          for (let l = 0; l < s.length; l++)
            s[l].eq(o, t) &&
              (s == this.local && (s = this.local.slice()), s.splice(l--, 1));
    }
    return r == this.children && s == this.local
      ? this
      : s.length || r.length
        ? new G(s, r)
        : pe;
  }
  forChild(e, t) {
    if (this == pe) return this;
    if (t.isLeaf) return G.empty;
    let r, s;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let i = e + 1,
      o = i + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < o && a.to > i && a.type instanceof bt) {
        let c = Math.max(i, a.from) - i,
          u = Math.min(o, a.to) - i;
        c < u && (s || (s = [])).push(a.copy(c, u));
      }
    }
    if (s) {
      let l = new G(s.sort(Pt), nn);
      return r ? new ut([l, r]) : l;
    }
    return r || pe;
  }
  eq(e) {
    if (this == e) return !0;
    if (
      !(e instanceof G) ||
      this.local.length != e.local.length ||
      this.children.length != e.children.length
    )
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t])) return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (
        this.children[t] != e.children[t] ||
        this.children[t + 1] != e.children[t + 1] ||
        !this.children[t + 2].eq(e.children[t + 2])
      )
        return !1;
    return !0;
  }
  locals(e) {
    return go(this.localsInner(e));
  }
  localsInner(e) {
    if (this == pe) return nn;
    if (e.inlineContent || !this.local.some(bt.is)) return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof bt || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
G.empty = new G([], []);
G.removeOverlap = go;
const pe = G.empty;
class ut {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map(s => s.map(e, t, Dt));
    return ut.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf) return G.empty;
    let r = [];
    for (let s = 0; s < this.members.length; s++) {
      let i = this.members[s].forChild(e, t);
      i != pe && (i instanceof ut ? (r = r.concat(i.members)) : r.push(i));
    }
    return ut.from(r);
  }
  eq(e) {
    if (!(e instanceof ut) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t])) return !1;
    return !0;
  }
  locals(e) {
    let t,
      r = !0;
    for (let s = 0; s < this.members.length; s++) {
      let i = this.members[s].localsInner(e);
      if (i.length)
        if (!t) t = i;
        else {
          r && ((t = t.slice()), (r = !1));
          for (let o = 0; o < i.length; o++) t.push(i[o]);
        }
    }
    return t ? go(r ? t : t.sort(Pt)) : nn;
  }
  static from(e) {
    switch (e.length) {
      case 0:
        return pe;
      case 1:
        return e[0];
      default:
        return new ut(
          e.every(t => t instanceof G)
            ? e
            : e.reduce((t, r) => t.concat(r instanceof G ? r : r.members), [])
        );
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++) this.members[t].forEachSet(e);
  }
}
function bm(n, e, t, r, s, i, o) {
  let l = n.slice();
  for (let c = 0, u = i; c < t.maps.length; c++) {
    let d = 0;
    (t.maps[c].forEach((h, f, m, g) => {
      let y = g - m - (f - h);
      for (let b = 0; b < l.length; b += 3) {
        let x = l[b + 1];
        if (x < 0 || h > x + u - d) continue;
        let k = l[b] + u - d;
        f >= k
          ? (l[b + 1] = h <= k ? -2 : -1)
          : h >= u && y && ((l[b] += y), (l[b + 1] += y));
      }
      d += y;
    }),
      (u = t.maps[c].map(u, -1)));
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        ((a = !0), (l[c + 1] = -1));
        continue;
      }
      let u = t.map(n[c] + i),
        d = u - s;
      if (d < 0 || d >= r.content.size) {
        a = !0;
        continue;
      }
      let h = t.map(n[c + 1] + i, -1),
        f = h - s,
        { index: m, offset: g } = r.content.findIndex(d),
        y = r.maybeChild(m);
      if (y && g == d && g + y.nodeSize == f) {
        let b = l[c + 2].mapInner(t, y, u + 1, n[c] + i + 1, o);
        b != pe
          ? ((l[c] = d), (l[c + 1] = f), (l[c + 2] = b))
          : ((l[c + 1] = -2), (a = !0));
      } else a = !0;
    }
  if (a) {
    let c = xm(l, n, e, t, s, i, o),
      u = Nr(c, r, 0, o);
    e = u.local;
    for (let d = 0; d < l.length; d += 3)
      l[d + 1] < 0 && (l.splice(d, 3), (d -= 3));
    for (let d = 0, h = 0; d < u.children.length; d += 3) {
      let f = u.children[d];
      for (; h < l.length && l[h] < f; ) h += 3;
      l.splice(h, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new G(e.sort(Pt), l);
}
function xu(n, e) {
  if (!e || !n.length) return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let s = n[r];
    t.push(new ye(s.from + e, s.to + e, s.type));
  }
  return t;
}
function xm(n, e, t, r, s, i, o) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let d = a.local[u].map(r, s, c);
      d ? t.push(d) : o.onRemove && o.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + i + 1);
  return t;
}
function ku(n, e, t) {
  if (e.isLeaf) return null;
  let r = t + e.nodeSize,
    s = null;
  for (let i = 0, o; i < n.length; i++)
    (o = n[i]) &&
      o.from > t &&
      o.to < r &&
      ((s || (s = [])).push(o), (n[i] = null));
  return s;
}
function Cu(n) {
  let e = [];
  for (let t = 0; t < n.length; t++) n[t] != null && e.push(n[t]);
  return e;
}
function Nr(n, e, t, r) {
  let s = [],
    i = !1;
  e.forEach((l, a) => {
    let c = ku(n, l, a + t);
    if (c) {
      i = !0;
      let u = Nr(c, l, t + a + 1, r);
      u != pe && s.push(a, a + l.nodeSize, u);
    }
  });
  let o = xu(i ? Cu(n) : n, -t).sort(Pt);
  for (let l = 0; l < o.length; l++)
    o[l].type.valid(e, o[l]) ||
      (r.onRemove && r.onRemove(o[l].spec), o.splice(l--, 1));
  return o.length || s.length ? new G(o, s) : pe;
}
function Pt(n, e) {
  return n.from - e.from || n.to - e.to;
}
function go(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let s = t + 1; s < e.length; s++) {
        let i = e[s];
        if (i.from == r.from) {
          i.to != r.to &&
            (e == n && (e = n.slice()),
            (e[s] = i.copy(i.from, r.to)),
            zl(e, s + 1, i.copy(r.to, i.to)));
          continue;
        } else {
          i.from < r.to &&
            (e == n && (e = n.slice()),
            (e[t] = r.copy(r.from, i.from)),
            zl(e, s, r.copy(i.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function zl(n, e, t) {
  for (; e < n.length && Pt(t, n[e]) > 0; ) e++;
  n.splice(e, 0, t);
}
function _s(n) {
  let e = [];
  return (
    n.someProp('decorations', t => {
      let r = t(n.state);
      r && r != pe && e.push(r);
    }),
    n.cursorWrapper && e.push(G.create(n.state.doc, [n.cursorWrapper.deco])),
    ut.from(e)
  );
}
const km = {
    childList: !0,
    characterData: !0,
    characterDataOldValue: !0,
    attributes: !0,
    attributeOldValue: !0,
    subtree: !0
  },
  Cm = Me && gt <= 11;
class Sm {
  constructor() {
    ((this.anchorNode = null),
      (this.anchorOffset = 0),
      (this.focusNode = null),
      (this.focusOffset = 0));
  }
  set(e) {
    ((this.anchorNode = e.anchorNode),
      (this.anchorOffset = e.anchorOffset),
      (this.focusNode = e.focusNode),
      (this.focusOffset = e.focusOffset));
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return (
      e.anchorNode == this.anchorNode &&
      e.anchorOffset == this.anchorOffset &&
      e.focusNode == this.focusNode &&
      e.focusOffset == this.focusOffset
    );
  }
}
class vm {
  constructor(e, t) {
    ((this.view = e),
      (this.handleDOMChange = t),
      (this.queue = []),
      (this.flushingSoon = -1),
      (this.observer = null),
      (this.currentSelection = new Sm()),
      (this.onCharData = null),
      (this.suppressingSelectionUpdates = !1),
      (this.lastChangedTextNode = null),
      (this.observer =
        window.MutationObserver &&
        new window.MutationObserver(r => {
          for (let s = 0; s < r.length; s++) this.queue.push(r[s]);
          Me &&
          gt <= 11 &&
          r.some(
            s =>
              (s.type == 'childList' && s.removedNodes.length) ||
              (s.type == 'characterData' &&
                s.oldValue.length > s.target.nodeValue.length)
          )
            ? this.flushSoon()
            : me &&
                e.composing &&
                r.some(s => s.type == 'childList' && s.target.nodeName == 'TR')
              ? ((e.input.badSafariComposition = !0), this.flushSoon())
              : this.flush();
        })),
      Cm &&
        (this.onCharData = r => {
          (this.queue.push({
            target: r.target,
            type: 'characterData',
            oldValue: r.prevValue
          }),
            this.flushSoon());
        }),
      (this.onSelectionChange = this.onSelectionChange.bind(this)));
  }
  flushSoon() {
    this.flushingSoon < 0 &&
      (this.flushingSoon = window.setTimeout(() => {
        ((this.flushingSoon = -1), this.flush());
      }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 &&
      (window.clearTimeout(this.flushingSoon),
      (this.flushingSoon = -1),
      this.flush());
  }
  start() {
    (this.observer &&
      (this.observer.takeRecords(), this.observer.observe(this.view.dom, km)),
      this.onCharData &&
        this.view.dom.addEventListener(
          'DOMCharacterDataModified',
          this.onCharData
        ),
      this.connectSelection());
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++) this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    (this.onCharData &&
      this.view.dom.removeEventListener(
        'DOMCharacterDataModified',
        this.onCharData
      ),
      this.disconnectSelection());
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener(
      'selectionchange',
      this.onSelectionChange
    );
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener(
      'selectionchange',
      this.onSelectionChange
    );
  }
  suppressSelectionUpdates() {
    ((this.suppressingSelectionUpdates = !0),
      setTimeout(() => (this.suppressingSelectionUpdates = !1), 50));
  }
  onSelectionChange() {
    if (Ol(this.view)) {
      if (this.suppressingSelectionUpdates) return nt(this.view);
      if (Me && gt <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (
          e.focusNode &&
          Ft(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)
        )
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode) return !0;
    let t = new Set(),
      r;
    for (let i = e.focusNode; i; i = dn(i)) t.add(i);
    for (let i = e.anchorNode; i; i = dn(i))
      if (t.has(i)) {
        r = i;
        break;
      }
    let s = r && this.view.docView.nearestDesc(r);
    if (
      s &&
      s.ignoreMutation({
        type: 'selection',
        target: r.nodeType == 3 ? r.parentNode : r
      })
    )
      return (this.setCurSelection(), !0);
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords()) this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1) return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(),
      s =
        !this.suppressingSelectionUpdates &&
        !this.currentSelection.eq(r) &&
        Ol(e) &&
        !this.ignoreSelectionChange(r),
      i = -1,
      o = -1,
      l = !1,
      a = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let d = this.registerMutation(t[u], a);
        d &&
          ((i = i < 0 ? d.from : Math.min(d.from, i)),
          (o = o < 0 ? d.to : Math.max(d.to, o)),
          d.typeOver && (l = !0));
      }
    if (
      a.some(u => u.nodeName == 'BR') &&
      (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46)
    ) {
      for (let u of a)
        if (u.nodeName == 'BR' && u.parentNode) {
          let d = u.nextSibling;
          for (; d && d.nodeType == 1; ) {
            if (d.contentEditable == 'false') {
              u.parentNode.removeChild(u);
              break;
            }
            d = d.firstChild;
          }
        }
    } else if (De && a.length) {
      let u = a.filter(d => d.nodeName == 'BR');
      if (u.length == 2) {
        let [d, h] = u;
        d.parentNode && d.parentNode.parentNode == h.parentNode
          ? h.remove()
          : d.remove();
      } else {
        let { focusNode: d } = this.currentSelection;
        for (let h of u) {
          let f = h.parentNode;
          f && f.nodeName == 'LI' && (!d || Tm(e, d) != f) && h.remove();
        }
      }
    }
    let c = null;
    i < 0 &&
    s &&
    e.input.lastFocus > Date.now() - 200 &&
    Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 &&
    ps(r) &&
    (c = ao(e)) &&
    c.eq(z.near(e.state.doc.resolve(0), 1))
      ? ((e.input.lastFocus = 0),
        nt(e),
        this.currentSelection.set(r),
        e.scrollToSelection())
      : (i > -1 || s) &&
        (i > -1 && (e.docView.markDirty(i, o), Mm(e)),
        e.input.badSafariComposition &&
          ((e.input.badSafariComposition = !1), Em(e, a)),
        this.handleDOMChange(i, o, l, a),
        e.docView && e.docView.dirty
          ? e.updateState(e.state)
          : this.currentSelection.eq(r) || nt(e),
        this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1) return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (
      (e.type == 'attributes' &&
        (r == this.view.docView ||
          e.attributeName == 'contenteditable' ||
          (e.attributeName == 'style' &&
            !e.oldValue &&
            !e.target.getAttribute('style')))) ||
      !r ||
      r.ignoreMutation(e)
    )
      return null;
    if (e.type == 'childList') {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let d = e.addedNodes[u];
        (t.push(d), d.nodeType == 3 && (this.lastChangedTextNode = d));
      }
      if (
        r.contentDOM &&
        r.contentDOM != r.dom &&
        !r.contentDOM.contains(e.target)
      )
        return { from: r.posBefore, to: r.posAfter };
      let s = e.previousSibling,
        i = e.nextSibling;
      if (Me && gt <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: h } = e.addedNodes[u];
          ((!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (s = d),
            (!h || Array.prototype.indexOf.call(e.addedNodes, h) < 0) &&
              (i = h));
        }
      let o = s && s.parentNode == e.target ? ue(s) + 1 : 0,
        l = r.localPosFromDOM(e.target, o, -1),
        a = i && i.parentNode == e.target ? ue(i) : e.target.childNodes.length,
        c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else
      return e.type == 'attributes'
        ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border }
        : ((this.lastChangedTextNode = e.target),
          {
            from: r.posAtStart,
            to: r.posAtEnd,
            typeOver: e.target.nodeValue == e.oldValue
          });
  }
}
let $l = new WeakMap(),
  Hl = !1;
function Mm(n) {
  if (
    !$l.has(n) &&
    ($l.set(n, null),
    ['normal', 'nowrap', 'pre-line'].indexOf(
      getComputedStyle(n.dom).whiteSpace
    ) !== -1)
  ) {
    if (((n.requiresGeckoHackNode = De), Hl)) return;
    (console.warn(
      "ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."
    ),
      (Hl = !0));
  }
}
function Fl(n, e) {
  let t = e.startContainer,
    r = e.startOffset,
    s = e.endContainer,
    i = e.endOffset,
    o = n.domAtPos(n.state.selection.anchor);
  return (
    Ft(o.node, o.offset, s, i) && ([t, r, s, i] = [s, i, t, r]),
    { anchorNode: t, anchorOffset: r, focusNode: s, focusOffset: i }
  );
}
function wm(n, e) {
  if (e.getComposedRanges) {
    let s = e.getComposedRanges(n.root)[0];
    if (s) return Fl(n, s);
  }
  let t;
  function r(s) {
    (s.preventDefault(),
      s.stopImmediatePropagation(),
      (t = s.getTargetRanges()[0]));
  }
  return (
    n.dom.addEventListener('beforeinput', r, !0),
    document.execCommand('indent'),
    n.dom.removeEventListener('beforeinput', r, !0),
    t ? Fl(n, t) : null
  );
}
function Tm(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let r = n.docView.nearestDesc(t, !0);
    if (r && r.node.isBlock) return t;
  }
  return null;
}
function Em(n, e) {
  var t;
  let { focusNode: r, focusOffset: s } = n.domSelectionRange();
  for (let i of e)
    if (
      ((t = i.parentNode) === null || t === void 0 ? void 0 : t.nodeName) ==
      'TR'
    ) {
      let o = i.nextSibling;
      for (; o && o.nodeName != 'TD' && o.nodeName != 'TH'; ) o = o.nextSibling;
      if (o) {
        let l = o;
        for (;;) {
          let a = l.firstChild;
          if (
            !a ||
            a.nodeType != 1 ||
            a.contentEditable == 'false' ||
            /^(BR|IMG)$/.test(a.nodeName)
          )
            break;
          l = a;
        }
        (l.insertBefore(i, l.firstChild),
          r == i && n.domSelection().collapse(i, s));
      } else i.parentNode.removeChild(i);
    }
}
function Am(n, e, t) {
  let {
      node: r,
      fromOffset: s,
      toOffset: i,
      from: o,
      to: l
    } = n.docView.parseRange(e, t),
    a = n.domSelectionRange(),
    c,
    u = a.anchorNode;
  if (
    (u &&
      n.dom.contains(u.nodeType == 1 ? u : u.parentNode) &&
      ((c = [{ node: u, offset: a.anchorOffset }]),
      ps(a) || c.push({ node: a.focusNode, offset: a.focusOffset })),
    he && n.input.lastKeyCode === 8)
  )
    for (let y = i; y > s; y--) {
      let b = r.childNodes[y - 1],
        x = b.pmViewDesc;
      if (b.nodeName == 'BR' && !x) {
        i = y;
        break;
      }
      if (!x || x.size) break;
    }
  let d = n.state.doc,
    h = n.someProp('domParser') || mt.fromSchema(n.state.schema),
    f = d.resolve(o),
    m = null,
    g = h.parse(r, {
      topNode: f.parent,
      topMatch: f.parent.contentMatchAt(f.index()),
      topOpen: !0,
      from: s,
      to: i,
      preserveWhitespace: f.parent.type.whitespace == 'pre' ? 'full' : !0,
      findPositions: c,
      ruleFromNode: Nm,
      context: f
    });
  if (c && c[0].pos != null) {
    let y = c[0].pos,
      b = c[1] && c[1].pos;
    (b == null && (b = y), (m = { anchor: y + o, head: b + o }));
  }
  return { doc: g, sel: m, from: o, to: l };
}
function Nm(n) {
  let e = n.pmViewDesc;
  if (e) return e.parseRule();
  if (n.nodeName == 'BR' && n.parentNode) {
    if (me && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement('div');
      return (t.appendChild(document.createElement('li')), { skip: t });
    } else if (
      n.parentNode.lastChild == n ||
      (me && /^(tr|table)$/i.test(n.parentNode.nodeName))
    )
      return { ignore: !0 };
  } else if (n.nodeName == 'IMG' && n.getAttribute('mark-placeholder'))
    return { ignore: !0 };
  return null;
}
const Om =
  /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function Im(n, e, t, r, s) {
  let i =
    n.input.compositionPendingChanges ||
    (n.composing ? n.input.compositionID : 0);
  if (((n.input.compositionPendingChanges = 0), e < 0)) {
    let w =
        n.input.lastSelectionTime > Date.now() - 50
          ? n.input.lastSelectionOrigin
          : null,
      R = ao(n, w);
    if (R && !n.state.selection.eq(R)) {
      if (
        he &&
        et &&
        n.input.lastKeyCode === 13 &&
        Date.now() - 100 < n.input.lastKeyCodeTime &&
        n.someProp('handleKeyDown', V => V(n, Et(13, 'Enter')))
      )
        return;
      let P = n.state.tr.setSelection(R);
      (w == 'pointer'
        ? P.setMeta('pointer', !0)
        : w == 'key' && P.scrollIntoView(),
        i && P.setMeta('composition', i),
        n.dispatch(P));
    }
    return;
  }
  let o = n.state.doc.resolve(e),
    l = o.sharedDepth(t);
  ((e = o.before(l + 1)), (t = n.state.doc.resolve(t).after(l + 1)));
  let a = n.state.selection,
    c = Am(n, e, t),
    u = n.state.doc,
    d = u.slice(c.from, c.to),
    h,
    f;
  (n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime
    ? ((h = n.state.selection.to), (f = 'end'))
    : ((h = n.state.selection.from), (f = 'start')),
    (n.input.lastKeyCode = null));
  let m = Dm(d.content, c.doc.content, c.from, h, f);
  if (
    (m && n.input.domChangeCount++,
    ((hn && n.input.lastIOSEnter > Date.now() - 225) || et) &&
      s.some(w => w.nodeType == 1 && !Om.test(w.nodeName)) &&
      (!m || m.endA >= m.endB) &&
      n.someProp('handleKeyDown', w => w(n, Et(13, 'Enter'))))
  ) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!m)
    if (
      r &&
      a instanceof D &&
      !a.empty &&
      a.$head.sameParent(a.$anchor) &&
      !n.composing &&
      !(c.sel && c.sel.anchor != c.sel.head)
    )
      m = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let w = _l(n, n.state.doc, c.sel);
        if (w && !w.eq(n.state.selection)) {
          let R = n.state.tr.setSelection(w);
          (i && R.setMeta('composition', i), n.dispatch(R));
        }
      }
      return;
    }
  (n.state.selection.from < n.state.selection.to &&
    m.start == m.endB &&
    n.state.selection instanceof D &&
    (m.start > n.state.selection.from &&
    m.start <= n.state.selection.from + 2 &&
    n.state.selection.from >= c.from
      ? (m.start = n.state.selection.from)
      : m.endA < n.state.selection.to &&
        m.endA >= n.state.selection.to - 2 &&
        n.state.selection.to <= c.to &&
        ((m.endB += n.state.selection.to - m.endA),
        (m.endA = n.state.selection.to))),
    Me &&
      gt <= 11 &&
      m.endB == m.start + 1 &&
      m.endA == m.start &&
      m.start > c.from &&
      c.doc.textBetween(m.start - c.from - 1, m.start - c.from + 1) == '  ' &&
      (m.start--, m.endA--, m.endB--));
  let g = c.doc.resolveNoCache(m.start - c.from),
    y = c.doc.resolveNoCache(m.endB - c.from),
    b = u.resolve(m.start),
    x = g.sameParent(y) && g.parent.inlineContent && b.end() >= m.endA;
  if (
    ((hn &&
      n.input.lastIOSEnter > Date.now() - 225 &&
      (!x || s.some(w => w.nodeName == 'DIV' || w.nodeName == 'P'))) ||
      (!x &&
        g.pos < c.doc.content.size &&
        (!g.sameParent(y) || !g.parent.inlineContent) &&
        g.pos < y.pos &&
        !/\S/.test(c.doc.textBetween(g.pos, y.pos, '', '')))) &&
    n.someProp('handleKeyDown', w => w(n, Et(13, 'Enter')))
  ) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (
    n.state.selection.anchor > m.start &&
    Lm(u, m.start, m.endA, g, y) &&
    n.someProp('handleKeyDown', w => w(n, Et(8, 'Backspace')))
  ) {
    et && he && n.domObserver.suppressSelectionUpdates();
    return;
  }
  (he && m.endB == m.start && (n.input.lastChromeDelete = Date.now()),
    et &&
      !x &&
      g.start() != y.start() &&
      y.parentOffset == 0 &&
      g.depth == y.depth &&
      c.sel &&
      c.sel.anchor == c.sel.head &&
      c.sel.head == m.endA &&
      ((m.endB -= 2),
      (y = c.doc.resolveNoCache(m.endB - c.from)),
      setTimeout(() => {
        n.someProp('handleKeyDown', function (w) {
          return w(n, Et(13, 'Enter'));
        });
      }, 20)));
  let k = m.start,
    S = m.endA,
    v = w => {
      let R =
        w ||
        n.state.tr.replace(
          k,
          S,
          c.doc.slice(m.start - c.from, m.endB - c.from)
        );
      if (c.sel) {
        let P = _l(n, R.doc, c.sel);
        P &&
          !(
            (he &&
              n.composing &&
              P.empty &&
              (m.start != m.endB ||
                n.input.lastChromeDelete < Date.now() - 100) &&
              (P.head == k || P.head == R.mapping.map(S) - 1)) ||
            (Me && P.empty && P.head == k)
          ) &&
          R.setSelection(P);
      }
      return (i && R.setMeta('composition', i), R.scrollIntoView());
    },
    T;
  if (x)
    if (g.pos == y.pos) {
      Me &&
        gt <= 11 &&
        g.parentOffset == 0 &&
        (n.domObserver.suppressSelectionUpdates(), setTimeout(() => nt(n), 20));
      let w = v(n.state.tr.delete(k, S)),
        R = u.resolve(m.start).marksAcross(u.resolve(m.endA));
      (R && w.ensureMarks(R), n.dispatch(w));
    } else if (
      m.endA == m.endB &&
      (T = Rm(
        g.parent.content.cut(g.parentOffset, y.parentOffset),
        b.parent.content.cut(b.parentOffset, m.endA - b.start())
      ))
    ) {
      let w = v(n.state.tr);
      (T.type == 'add' ? w.addMark(k, S, T.mark) : w.removeMark(k, S, T.mark),
        n.dispatch(w));
    } else if (
      g.parent.child(g.index()).isText &&
      g.index() == y.index() - (y.textOffset ? 0 : 1)
    ) {
      let w = g.parent.textBetween(g.parentOffset, y.parentOffset),
        R = () => v(n.state.tr.insertText(w, k, S));
      n.someProp('handleTextInput', P => P(n, k, S, w, R)) || n.dispatch(R());
    } else n.dispatch(v());
  else n.dispatch(v());
}
function _l(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size
    ? null
    : co(n, e.resolve(t.anchor), e.resolve(t.head));
}
function Rm(n, e) {
  let t = n.firstChild.marks,
    r = e.firstChild.marks,
    s = t,
    i = r,
    o,
    l,
    a;
  for (let u = 0; u < r.length; u++) s = r[u].removeFromSet(s);
  for (let u = 0; u < t.length; u++) i = t[u].removeFromSet(i);
  if (s.length == 1 && i.length == 0)
    ((l = s[0]), (o = 'add'), (a = u => u.mark(l.addToSet(u.marks))));
  else if (s.length == 0 && i.length == 1)
    ((l = i[0]), (o = 'remove'), (a = u => u.mark(l.removeFromSet(u.marks))));
  else return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++) c.push(a(e.child(u)));
  if (C.from(c).eq(n)) return { mark: l, type: o };
}
function Lm(n, e, t, r, s) {
  if (t - e <= s.pos - r.pos || Vs(r, !0, !1) < s.pos) return !1;
  let i = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = i.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (i.parentOffset < i.parent.content.size || !i.parent.isTextblock)
    return !1;
  let o = n.resolve(Vs(i, !0, !0));
  return !o.parent.isTextblock || o.pos > t || Vs(o, !0, !1) < t
    ? !1
    : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function Vs(n, e, t) {
  let r = n.depth,
    s = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    (r--, s++, (e = !1));
  if (t) {
    let i = n.node(r).maybeChild(n.indexAfter(r));
    for (; i && !i.isLeaf; ) ((i = i.firstChild), s++);
  }
  return s;
}
function Dm(n, e, t, r, s) {
  let i = n.findDiffStart(e, t);
  if (i == null) return null;
  let { a: o, b: l } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (s == 'end') {
    let a = Math.max(0, i - Math.min(o, l));
    r -= o + a - i;
  }
  if (o < i && n.size < e.size) {
    let a = r <= i && r >= o ? i - r : 0;
    ((i -= a),
      i && i < e.size && Vl(e.textBetween(i - 1, i + 1)) && (i += a ? 1 : -1),
      (l = i + (l - o)),
      (o = i));
  } else if (l < i) {
    let a = r <= i && r >= l ? i - r : 0;
    ((i -= a),
      i && i < n.size && Vl(n.textBetween(i - 1, i + 1)) && (i += a ? 1 : -1),
      (o = i + (o - l)),
      (l = i));
  }
  return { start: i, endA: o, endB: l };
}
function Vl(n) {
  if (n.length != 2) return !1;
  let e = n.charCodeAt(0),
    t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class Su {
  constructor(e, t) {
    ((this._root = null),
      (this.focused = !1),
      (this.trackWrites = null),
      (this.mounted = !1),
      (this.markCursor = null),
      (this.cursorWrapper = null),
      (this.lastSelectedViewDesc = void 0),
      (this.input = new Yp()),
      (this.prevDirectPlugins = []),
      (this.pluginViews = []),
      (this.requiresGeckoHackNode = !1),
      (this.dragging = null),
      (this._props = t),
      (this.state = t.state),
      (this.directPlugins = t.plugins || []),
      this.directPlugins.forEach(Jl),
      (this.dispatch = this.dispatch.bind(this)),
      (this.dom = (e && e.mount) || document.createElement('div')),
      e &&
        (e.appendChild
          ? e.appendChild(this.dom)
          : typeof e == 'function'
            ? e(this.dom)
            : e.mount && (this.mounted = !0)),
      (this.editable = ql(this)),
      Ul(this),
      (this.nodeViews = Kl(this)),
      (this.docView = Ml(this.state.doc, Wl(this), _s(this), this.dom, this)),
      (this.domObserver = new vm(this, (r, s, i, o) => Im(this, r, s, i, o))),
      this.domObserver.start(),
      Xp(this),
      this.updatePluginViews());
  }
  get composing() {
    return this.input.composing;
  }
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e) this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && Ei(this);
    let t = this._props;
    ((this._props = e),
      e.plugins && (e.plugins.forEach(Jl), (this.directPlugins = e.plugins)),
      this.updateStateInner(e.state, t));
  }
  setProps(e) {
    let t = {};
    for (let r in this._props) t[r] = this._props[r];
    t.state = this.state;
    for (let r in e) t[r] = e[r];
    this.update(t);
  }
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let s = this.state,
      i = !1,
      o = !1;
    (e.storedMarks && this.composing && (mu(this), (o = !0)), (this.state = e));
    let l = s.plugins != e.plugins || this._props.plugins != t.plugins;
    if (
      l ||
      this._props.plugins != t.plugins ||
      this._props.nodeViews != t.nodeViews
    ) {
      let f = Kl(this);
      jm(f, this.nodeViews) && ((this.nodeViews = f), (i = !0));
    }
    ((l || t.handleDOMEvents != this._props.handleDOMEvents) && Ei(this),
      (this.editable = ql(this)),
      Ul(this));
    let a = _s(this),
      c = Wl(this),
      u =
        s.plugins != e.plugins && !s.doc.eq(e.doc)
          ? 'reset'
          : e.scrollToSelection > s.scrollToSelection
            ? 'to selection'
            : 'preserve',
      d = i || !this.docView.matchesNode(e.doc, c, a);
    (d || !e.selection.eq(s.selection)) && (o = !0);
    let h =
      u == 'preserve' && o && this.dom.style.overflowAnchor == null && dp(this);
    if (o) {
      this.domObserver.stop();
      let f =
        d &&
        (Me || he) &&
        !this.composing &&
        !s.selection.empty &&
        !e.selection.empty &&
        Pm(s.selection, e.selection);
      if (d) {
        let m = he
          ? (this.trackWrites = this.domSelectionRange().focusNode)
          : null;
        (this.composing && (this.input.compositionNode = dm(this)),
          (i || !this.docView.update(e.doc, c, a, this)) &&
            (this.docView.updateOuterDeco(c),
            this.docView.destroy(),
            (this.docView = Ml(e.doc, c, a, this.dom, this))),
          m &&
            (!this.trackWrites || !this.dom.contains(this.trackWrites)) &&
            (f = !0));
      }
      (f ||
      !(
        this.input.mouseDown &&
        this.domObserver.currentSelection.eq(this.domSelectionRange()) &&
        Pp(this)
      )
        ? nt(this, f)
        : (ru(this, e.selection), this.domObserver.setCurSelection()),
        this.domObserver.start());
    }
    (this.updatePluginViews(s),
      !((r = this.dragging) === null || r === void 0) &&
        r.node &&
        !s.doc.eq(e.doc) &&
        this.updateDraggedNode(this.dragging, s),
      u == 'reset'
        ? (this.dom.scrollTop = 0)
        : u == 'to selection'
          ? this.scrollToSelection()
          : h && hp(h));
  }
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp('handleScrollToSelection', t => t(this)))
        if (this.state.selection instanceof I) {
          let t = this.docView.domAfterPos(this.state.selection.from);
          t.nodeType == 1 && bl(this, t.getBoundingClientRect(), e);
        } else bl(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; (e = this.pluginViews.pop()); ) e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (
      !e ||
      e.plugins != this.state.plugins ||
      this.directPlugins != this.prevDirectPlugins
    ) {
      ((this.prevDirectPlugins = this.directPlugins),
        this.destroyPluginViews());
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node,
      s = -1;
    if (
      r.from < this.state.doc.content.size &&
      this.state.doc.nodeAt(r.from) == r.node
    )
      s = r.from;
    else {
      let i = r.from + (this.state.doc.content.size - t.doc.content.size);
      (i > 0 && i < this.state.doc.content.size && this.state.doc.nodeAt(i)) ==
        r.node && (s = i);
    }
    this.dragging = new yu(
      e.slice,
      e.move,
      s < 0 ? void 0 : I.create(this.state.doc, s)
    );
  }
  someProp(e, t) {
    let r = this._props && this._props[e],
      s;
    if (r != null && (s = t ? t(r) : r)) return s;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let l = this.directPlugins[o].props[e];
      if (l != null && (s = t ? t(l) : l)) return s;
    }
    let i = this.state.plugins;
    if (i)
      for (let o = 0; o < i.length; o++) {
        let l = i[o].props[e];
        if (l != null && (s = t ? t(l) : l)) return s;
      }
  }
  hasFocus() {
    if (Me) {
      let e = this.root.activeElement;
      if (e == this.dom) return !0;
      if (!e || !this.dom.contains(e)) return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == 'false') return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  focus() {
    (this.domObserver.stop(),
      this.editable && fp(this.dom),
      nt(this),
      this.domObserver.start());
  }
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || (t.nodeType == 11 && t.host))
          return (
            t.getSelection ||
              (Object.getPrototypeOf(t).getSelection = () =>
                t.ownerDocument.getSelection()),
            (this._root = t)
          );
    }
    return e || document;
  }
  updateRoot() {
    this._root = null;
  }
  posAtCoords(e) {
    return bp(this, e);
  }
  coordsAtPos(e, t = 1) {
    return Gc(this, e, t);
  }
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  posAtDOM(e, t, r = -1) {
    let s = this.docView.posFromDOM(e, t, r);
    if (s == null) throw new RangeError('DOM position not inside the editor');
    return s;
  }
  endOfTextblock(e, t) {
    return vp(this, t || this.state, e);
  }
  pasteHTML(e, t) {
    return Fn(this, '', e, !1, t || new ClipboardEvent('paste'));
  }
  pasteText(e, t) {
    return Fn(this, e, null, !0, t || new ClipboardEvent('paste'));
  }
  serializeForClipboard(e) {
    return uo(this, e);
  }
  destroy() {
    this.docView &&
      (Qp(this),
      this.destroyPluginViews(),
      this.mounted
        ? (this.docView.update(this.state.doc, [], _s(this), this),
          (this.dom.textContent = ''))
        : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom),
      this.docView.destroy(),
      (this.docView = null),
      tp());
  }
  get isDestroyed() {
    return this.docView == null;
  }
  dispatchEvent(e) {
    return em(this, e);
  }
  domSelectionRange() {
    let e = this.domSelection();
    return e
      ? (me &&
          this.root.nodeType === 11 &&
          op(this.dom.ownerDocument) == this.dom &&
          wm(this, e)) ||
          e
      : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  domSelection() {
    return this.root.getSelection();
  }
}
Su.prototype.dispatch = function (n) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, n) : this.updateState(this.state.apply(n));
};
function Wl(n) {
  let e = Object.create(null);
  return (
    (e.class = 'ProseMirror'),
    (e.contenteditable = String(n.editable)),
    n.someProp('attributes', t => {
      if ((typeof t == 'function' && (t = t(n.state)), t))
        for (let r in t)
          r == 'class'
            ? (e.class += ' ' + t[r])
            : r == 'style'
              ? (e.style = (e.style ? e.style + ';' : '') + t[r])
              : !e[r] &&
                r != 'contenteditable' &&
                r != 'nodeName' &&
                (e[r] = String(t[r]));
    }),
    e.translate || (e.translate = 'no'),
    [ye.node(0, n.state.doc.content.size, e)]
  );
}
function Ul(n) {
  if (n.markCursor) {
    let e = document.createElement('img');
    ((e.className = 'ProseMirror-separator'),
      e.setAttribute('mark-placeholder', 'true'),
      e.setAttribute('alt', ''),
      (n.cursorWrapper = {
        dom: e,
        deco: ye.widget(n.state.selection.from, e, {
          raw: !0,
          marks: n.markCursor
        })
      }));
  } else n.cursorWrapper = null;
}
function ql(n) {
  return !n.someProp('editable', e => e(n.state) === !1);
}
function Pm(n, e) {
  let t = Math.min(
    n.$anchor.sharedDepth(n.head),
    e.$anchor.sharedDepth(e.head)
  );
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function Kl(n) {
  let e = Object.create(null);
  function t(r) {
    for (let s in r)
      Object.prototype.hasOwnProperty.call(e, s) || (e[s] = r[s]);
  }
  return (n.someProp('nodeViews', t), n.someProp('markViews', t), e);
}
function jm(n, e) {
  let t = 0,
    r = 0;
  for (let s in n) {
    if (n[s] != e[s]) return !0;
    t++;
  }
  for (let s in e) r++;
  return t != r;
}
function Jl(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError(
      'Plugins passed directly to the view must not have a state component'
    );
}
var xt = {
    8: 'Backspace',
    9: 'Tab',
    10: 'Enter',
    12: 'NumLock',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    44: 'PrintScreen',
    45: 'Insert',
    46: 'Delete',
    59: ';',
    61: '=',
    91: 'Meta',
    92: 'Meta',
    106: '*',
    107: '+',
    108: ',',
    109: '-',
    110: '.',
    111: '/',
    144: 'NumLock',
    145: 'ScrollLock',
    160: 'Shift',
    161: 'Shift',
    162: 'Control',
    163: 'Control',
    164: 'Alt',
    165: 'Alt',
    173: '-',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: "'"
  },
  Or = {
    48: ')',
    49: '!',
    50: '@',
    51: '#',
    52: '$',
    53: '%',
    54: '^',
    55: '&',
    56: '*',
    57: '(',
    59: ':',
    61: '+',
    173: '_',
    186: ':',
    187: '+',
    188: '<',
    189: '_',
    190: '>',
    191: '?',
    192: '~',
    219: '{',
    220: '|',
    221: '}',
    222: '"'
  },
  Bm = typeof navigator < 'u' && /Mac/.test(navigator.platform),
  zm =
    typeof navigator < 'u' &&
    /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var de = 0; de < 10; de++) xt[48 + de] = xt[96 + de] = String(de);
for (var de = 1; de <= 24; de++) xt[de + 111] = 'F' + de;
for (var de = 65; de <= 90; de++)
  ((xt[de] = String.fromCharCode(de + 32)), (Or[de] = String.fromCharCode(de)));
for (var Ws in xt) Or.hasOwnProperty(Ws) || (Or[Ws] = xt[Ws]);
function $m(n) {
  var e =
      (Bm && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey) ||
      (zm && n.shiftKey && n.key && n.key.length == 1) ||
      n.key == 'Unidentified',
    t =
      (!e && n.key) ||
      (n.shiftKey ? Or : xt)[n.keyCode] ||
      n.key ||
      'Unidentified';
  return (
    t == 'Esc' && (t = 'Escape'),
    t == 'Del' && (t = 'Delete'),
    t == 'Left' && (t = 'ArrowLeft'),
    t == 'Up' && (t = 'ArrowUp'),
    t == 'Right' && (t = 'ArrowRight'),
    t == 'Down' && (t = 'ArrowDown'),
    t
  );
}
const Hm =
    typeof navigator < 'u' && /Mac|iP(hone|[oa]d)/.test(navigator.platform),
  Fm = typeof navigator < 'u' && /Win/.test(navigator.platform);
function _m(n) {
  let e = n.split(/-(?!$)/),
    t = e[e.length - 1];
  t == 'Space' && (t = ' ');
  let r, s, i, o;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a)) o = !0;
    else if (/^a(lt)?$/i.test(a)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(a)) s = !0;
    else if (/^s(hift)?$/i.test(a)) i = !0;
    else if (/^mod$/i.test(a)) Hm ? (o = !0) : (s = !0);
    else throw new Error('Unrecognized modifier name: ' + a);
  }
  return (
    r && (t = 'Alt-' + t),
    s && (t = 'Ctrl-' + t),
    o && (t = 'Meta-' + t),
    i && (t = 'Shift-' + t),
    t
  );
}
function Vm(n) {
  let e = Object.create(null);
  for (let t in n) e[_m(t)] = n[t];
  return e;
}
function Us(n, e, t = !0) {
  return (
    e.altKey && (n = 'Alt-' + n),
    e.ctrlKey && (n = 'Ctrl-' + n),
    e.metaKey && (n = 'Meta-' + n),
    t && e.shiftKey && (n = 'Shift-' + n),
    n
  );
}
function Wm(n) {
  return new X({ props: { handleKeyDown: vu(n) } });
}
function vu(n) {
  let e = Vm(n);
  return function (t, r) {
    let s = $m(r),
      i,
      o = e[Us(s, r)];
    if (o && o(t.state, t.dispatch, t)) return !0;
    if (s.length == 1 && s != ' ') {
      if (r.shiftKey) {
        let l = e[Us(s, r, !1)];
        if (l && l(t.state, t.dispatch, t)) return !0;
      }
      if (
        (r.altKey || r.metaKey || r.ctrlKey) &&
        !(Fm && r.ctrlKey && r.altKey) &&
        (i = xt[r.keyCode]) &&
        i != s
      ) {
        let l = e[Us(i, r)];
        if (l && l(t.state, t.dispatch, t)) return !0;
      }
    }
    return !1;
  };
}
var Um = Object.defineProperty,
  yo = (n, e) => {
    for (var t in e) Um(n, t, { get: e[t], enumerable: !0 });
  };
function ys(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t,
    { doc: s } = t,
    { storedMarks: i } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return i;
    },
    get selection() {
      return r;
    },
    get doc() {
      return s;
    },
    get tr() {
      return ((r = t.selection), (s = t.doc), (i = t.storedMarks), t);
    }
  };
}
var bs = class {
    constructor(n) {
      ((this.editor = n.editor),
        (this.rawCommands = this.editor.extensionManager.commands),
        (this.customState = n.state));
    }
    get hasCustomState() {
      return !!this.customState;
    }
    get state() {
      return this.customState || this.editor.state;
    }
    get commands() {
      const { rawCommands: n, editor: e, state: t } = this,
        { view: r } = e,
        { tr: s } = t,
        i = this.buildProps(s);
      return Object.fromEntries(
        Object.entries(n).map(([o, l]) => [
          o,
          (...c) => {
            const u = l(...c)(i);
            return (
              !s.getMeta('preventDispatch') &&
                !this.hasCustomState &&
                r.dispatch(s),
              u
            );
          }
        ])
      );
    }
    get chain() {
      return () => this.createChain();
    }
    get can() {
      return () => this.createCan();
    }
    createChain(n, e = !0) {
      const { rawCommands: t, editor: r, state: s } = this,
        { view: i } = r,
        o = [],
        l = !!n,
        a = n || s.tr,
        c = () => (
          !l &&
            e &&
            !a.getMeta('preventDispatch') &&
            !this.hasCustomState &&
            i.dispatch(a),
          o.every(d => d === !0)
        ),
        u = {
          ...Object.fromEntries(
            Object.entries(t).map(([d, h]) => [
              d,
              (...m) => {
                const g = this.buildProps(a, e),
                  y = h(...m)(g);
                return (o.push(y), u);
              }
            ])
          ),
          run: c
        };
      return u;
    }
    createCan(n) {
      const { rawCommands: e, state: t } = this,
        r = !1,
        s = n || t.tr,
        i = this.buildProps(s, r);
      return {
        ...Object.fromEntries(
          Object.entries(e).map(([l, a]) => [
            l,
            (...c) => a(...c)({ ...i, dispatch: void 0 })
          ])
        ),
        chain: () => this.createChain(s, r)
      };
    }
    buildProps(n, e = !0) {
      const { rawCommands: t, editor: r, state: s } = this,
        { view: i } = r,
        o = {
          tr: n,
          editor: r,
          view: i,
          state: ys({ state: s, transaction: n }),
          dispatch: e ? () => {} : void 0,
          chain: () => this.createChain(n, e),
          can: () => this.createCan(n),
          get commands() {
            return Object.fromEntries(
              Object.entries(t).map(([l, a]) => [l, (...c) => a(...c)(o)])
            );
          }
        };
      return o;
    }
  },
  Mu = {};
yo(Mu, {
  blur: () => qm,
  clearContent: () => Km,
  clearNodes: () => Jm,
  command: () => Gm,
  createParagraphNear: () => Ym,
  cut: () => Xm,
  deleteCurrentNode: () => Qm,
  deleteNode: () => Zm,
  deleteRange: () => eg,
  deleteSelection: () => tg,
  enter: () => ng,
  exitCode: () => rg,
  extendMarkRange: () => sg,
  first: () => ig,
  focus: () => lg,
  forEach: () => ag,
  insertContent: () => cg,
  insertContentAt: () => hg,
  joinBackward: () => mg,
  joinDown: () => pg,
  joinForward: () => gg,
  joinItemBackward: () => yg,
  joinItemForward: () => bg,
  joinTextblockBackward: () => xg,
  joinTextblockForward: () => kg,
  joinUp: () => fg,
  keyboardShortcut: () => Sg,
  lift: () => vg,
  liftEmptyBlock: () => Mg,
  liftListItem: () => wg,
  newlineInCode: () => Tg,
  resetAttributes: () => Eg,
  scrollIntoView: () => Ag,
  selectAll: () => Ng,
  selectNodeBackward: () => Og,
  selectNodeForward: () => Ig,
  selectParentNode: () => Rg,
  selectTextblockEnd: () => Lg,
  selectTextblockStart: () => Dg,
  setContent: () => Pg,
  setMark: () => n0,
  setMeta: () => r0,
  setNode: () => s0,
  setNodeSelection: () => i0,
  setTextDirection: () => o0,
  setTextSelection: () => l0,
  sinkListItem: () => a0,
  splitBlock: () => c0,
  splitListItem: () => u0,
  toggleList: () => h0,
  toggleMark: () => f0,
  toggleNode: () => p0,
  toggleWrap: () => m0,
  undoInputRule: () => g0,
  unsetAllMarks: () => y0,
  unsetMark: () => b0,
  unsetTextDirection: () => x0,
  updateAttributes: () => k0,
  wrapIn: () => C0,
  wrapInList: () => S0
});
var qm =
    () =>
    ({ editor: n, view: e }) => (
      requestAnimationFrame(() => {
        var t;
        n.isDestroyed ||
          (e.dom.blur(),
          (t = window == null ? void 0 : window.getSelection()) == null ||
            t.removeAllRanges());
      }),
      !0
    ),
  Km =
    (n = !0) =>
    ({ commands: e }) =>
      e.setContent('', { emitUpdate: n }),
  Jm =
    () =>
    ({ state: n, tr: e, dispatch: t }) => {
      const { selection: r } = e,
        { ranges: s } = r;
      return (
        t &&
          s.forEach(({ $from: i, $to: o }) => {
            n.doc.nodesBetween(i.pos, o.pos, (l, a) => {
              if (l.type.isText) return;
              const { doc: c, mapping: u } = e,
                d = c.resolve(u.map(a)),
                h = c.resolve(u.map(a + l.nodeSize)),
                f = d.blockRange(h);
              if (!f) return;
              const m = mn(f);
              if (l.type.isTextblock) {
                const { defaultType: g } = d.parent.contentMatchAt(d.index());
                e.setNodeMarkup(f.start, g);
              }
              (m || m === 0) && e.lift(f, m);
            });
          }),
        !0
      );
    },
  Gm = n => e => n(e),
  Ym =
    () =>
    ({ state: n, dispatch: e }) =>
      zc(n, e),
  Xm =
    (n, e) =>
    ({ editor: t, tr: r }) => {
      const { state: s } = t,
        i = s.doc.slice(n.from, n.to);
      r.deleteRange(n.from, n.to);
      const o = r.mapping.map(e);
      return (
        r.insert(o, i.content),
        r.setSelection(new D(r.doc.resolve(Math.max(o - 1, 0)))),
        !0
      );
    },
  Qm =
    () =>
    ({ tr: n, dispatch: e }) => {
      const { selection: t } = n,
        r = t.$anchor.node();
      if (r.content.size > 0) return !1;
      const s = n.selection.$anchor;
      for (let i = s.depth; i > 0; i -= 1)
        if (s.node(i).type === r.type) {
          if (e) {
            const l = s.before(i),
              a = s.after(i);
            n.delete(l, a).scrollIntoView();
          }
          return !0;
        }
      return !1;
    };
function re(n, e) {
  if (typeof n == 'string') {
    if (!e.nodes[n])
      throw Error(
        `There is no node type named '${n}'. Maybe you forgot to add the extension?`
      );
    return e.nodes[n];
  }
  return n;
}
var Zm =
    n =>
    ({ tr: e, state: t, dispatch: r }) => {
      const s = re(n, t.schema),
        i = e.selection.$anchor;
      for (let o = i.depth; o > 0; o -= 1)
        if (i.node(o).type === s) {
          if (r) {
            const a = i.before(o),
              c = i.after(o);
            e.delete(a, c).scrollIntoView();
          }
          return !0;
        }
      return !1;
    },
  eg =
    n =>
    ({ tr: e, dispatch: t }) => {
      const { from: r, to: s } = n;
      return (t && e.delete(r, s), !0);
    },
  tg =
    () =>
    ({ state: n, dispatch: e }) =>
      no(n, e),
  ng =
    () =>
    ({ commands: n }) =>
      n.keyboardShortcut('Enter'),
  rg =
    () =>
    ({ state: n, dispatch: e }) =>
      Hf(n, e);
function bo(n) {
  return Object.prototype.toString.call(n) === '[object RegExp]';
}
function Ir(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length
    ? r.every(s =>
        t.strict ? e[s] === n[s] : bo(e[s]) ? e[s].test(n[s]) : e[s] === n[s]
      )
    : !0;
}
function wu(n, e, t = {}) {
  return n.find(
    r =>
      r.type === e &&
      Ir(Object.fromEntries(Object.keys(t).map(s => [s, r.attrs[s]])), t)
  );
}
function Gl(n, e, t = {}) {
  return !!wu(n, e, t);
}
function xo(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if (
    ((!r.node || !r.node.marks.some(c => c.type === e)) &&
      (r = n.parent.childBefore(n.parentOffset)),
    !r.node || !r.node.marks.some(c => c.type === e))
  )
    return;
  if (!t) {
    const c = r.node.marks.find(u => u.type === e);
    c && (t = c.attrs);
  }
  if (!wu([...r.node.marks], e, t)) return;
  let i = r.index,
    o = n.start() + r.offset,
    l = i + 1,
    a = o + r.node.nodeSize;
  for (; i > 0 && Gl([...n.parent.child(i - 1).marks], e, t); )
    ((i -= 1), (o -= n.parent.child(i).nodeSize));
  for (; l < n.parent.childCount && Gl([...n.parent.child(l).marks], e, t); )
    ((a += n.parent.child(l).nodeSize), (l += 1));
  return { from: o, to: a };
}
function rt(n, e) {
  if (typeof n == 'string') {
    if (!e.marks[n])
      throw Error(
        `There is no mark type named '${n}'. Maybe you forgot to add the extension?`
      );
    return e.marks[n];
  }
  return n;
}
var sg =
    (n, e) =>
    ({ tr: t, state: r, dispatch: s }) => {
      const i = rt(n, r.schema),
        { doc: o, selection: l } = t,
        { $from: a, from: c, to: u } = l;
      if (s) {
        const d = xo(a, i, e);
        if (d && d.from <= c && d.to >= u) {
          const h = D.create(o, d.from, d.to);
          t.setSelection(h);
        }
      }
      return !0;
    },
  ig = n => e => {
    const t = typeof n == 'function' ? n(e) : n;
    for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
    return !1;
  };
function Tu(n) {
  return n instanceof D;
}
function Ot(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Eu(n, e = null) {
  if (!e) return null;
  const t = z.atStart(n),
    r = z.atEnd(n);
  if (e === 'start' || e === !0) return t;
  if (e === 'end') return r;
  const s = t.from,
    i = r.to;
  return e === 'all'
    ? D.create(n, Ot(0, s, i), Ot(n.content.size, s, i))
    : D.create(n, Ot(e, s, i), Ot(e, s, i));
}
function Yl() {
  return (
    navigator.platform === 'Android' || /android/i.test(navigator.userAgent)
  );
}
function Rr() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}
function og() {
  return typeof navigator < 'u'
    ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    : !1;
}
var lg =
    (n = null, e = {}) =>
    ({ editor: t, view: r, tr: s, dispatch: i }) => {
      e = { scrollIntoView: !0, ...e };
      const o = () => {
        ((Rr() || Yl()) && r.dom.focus(),
          og() && !Rr() && !Yl() && r.dom.focus({ preventScroll: !0 }),
          requestAnimationFrame(() => {
            t.isDestroyed ||
              (r.focus(),
              e != null && e.scrollIntoView && t.commands.scrollIntoView());
          }));
      };
      try {
        if ((r.hasFocus() && n === null) || n === !1) return !0;
      } catch {
        return !1;
      }
      if (i && n === null && !Tu(t.state.selection)) return (o(), !0);
      const l = Eu(s.doc, n) || t.state.selection,
        a = t.state.selection.eq(l);
      return (
        i &&
          (a || s.setSelection(l),
          a && s.storedMarks && s.setStoredMarks(s.storedMarks),
          o()),
        !0
      );
    },
  ag = (n, e) => t => n.every((r, s) => e(r, { ...t, index: s })),
  cg =
    (n, e) =>
    ({ tr: t, commands: r }) =>
      r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e),
  Au = n => {
    const e = n.childNodes;
    for (let t = e.length - 1; t >= 0; t -= 1) {
      const r = e[t];
      r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue)
        ? n.removeChild(r)
        : r.nodeType === 1 && Au(r);
    }
    return n;
  };
function rr(n) {
  if (typeof window > 'u')
    throw new Error(
      '[tiptap error]: there is no window object available, so this function cannot be used'
    );
  const e = `<body>${n}</body>`,
    t = new window.DOMParser().parseFromString(e, 'text/html').body;
  return Au(t);
}
function Vn(n, e, t) {
  if (n instanceof He || n instanceof C) return n;
  t = { slice: !0, parseOptions: {}, ...t };
  const r = typeof n == 'object' && n !== null,
    s = typeof n == 'string';
  if (r)
    try {
      if (Array.isArray(n) && n.length > 0)
        return C.fromArray(n.map(l => e.nodeFromJSON(l)));
      const o = e.nodeFromJSON(n);
      return (t.errorOnInvalidContent && o.check(), o);
    } catch (i) {
      if (t.errorOnInvalidContent)
        throw new Error('[tiptap error]: Invalid JSON content', { cause: i });
      return (
        console.warn(
          '[tiptap warn]: Invalid content.',
          'Passed value:',
          n,
          'Error:',
          i
        ),
        Vn('', e, t)
      );
    }
  if (s) {
    if (t.errorOnInvalidContent) {
      let o = !1,
        l = '';
      const a = new dc({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: 'inline*',
            group: 'block',
            parseDOM: [
              {
                tag: '*',
                getAttrs: c => (
                  (o = !0),
                  (l = typeof c == 'string' ? c : c.outerHTML),
                  null
                )
              }
            ]
          }
        })
      });
      if (
        (t.slice
          ? mt.fromSchema(a).parseSlice(rr(n), t.parseOptions)
          : mt.fromSchema(a).parse(rr(n), t.parseOptions),
        t.errorOnInvalidContent && o)
      )
        throw new Error('[tiptap error]: Invalid HTML content', {
          cause: new Error(`Invalid element found: ${l}`)
        });
    }
    const i = mt.fromSchema(e);
    return t.slice
      ? i.parseSlice(rr(n), t.parseOptions).content
      : i.parse(rr(n), t.parseOptions);
  }
  return Vn('', e, t);
}
function ug(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const s = n.steps[r];
  if (!(s instanceof te || s instanceof ie)) return;
  const i = n.mapping.maps[r];
  let o = 0;
  (i.forEach((l, a, c, u) => {
    o === 0 && (o = u);
  }),
    n.setSelection(z.near(n.doc.resolve(o), t)));
}
var dg = n => !('type' in n),
  hg =
    (n, e, t) =>
    ({ tr: r, dispatch: s, editor: i }) => {
      var o;
      if (s) {
        t = {
          parseOptions: i.options.parseOptions,
          updateSelection: !0,
          applyInputRules: !1,
          applyPasteRules: !1,
          ...t
        };
        let l;
        const a = y => {
            i.emit('contentError', {
              editor: i,
              error: y,
              disableCollaboration: () => {
                'collaboration' in i.storage &&
                  typeof i.storage.collaboration == 'object' &&
                  i.storage.collaboration &&
                  (i.storage.collaboration.isDisabled = !0);
              }
            });
          },
          c = { preserveWhitespace: 'full', ...t.parseOptions };
        if (
          !t.errorOnInvalidContent &&
          !i.options.enableContentCheck &&
          i.options.emitContentError
        )
          try {
            Vn(e, i.schema, { parseOptions: c, errorOnInvalidContent: !0 });
          } catch (y) {
            a(y);
          }
        try {
          l = Vn(e, i.schema, {
            parseOptions: c,
            errorOnInvalidContent:
              (o = t.errorOnInvalidContent) != null
                ? o
                : i.options.enableContentCheck
          });
        } catch (y) {
          return (a(y), !1);
        }
        let { from: u, to: d } =
            typeof n == 'number'
              ? { from: n, to: n }
              : { from: n.from, to: n.to },
          h = !0,
          f = !0;
        if (
          ((dg(l) ? l : [l]).forEach(y => {
            (y.check(),
              (h = h ? y.isText && y.marks.length === 0 : !1),
              (f = f ? y.isBlock : !1));
          }),
          u === d && f)
        ) {
          const { parent: y } = r.doc.resolve(u);
          y.isTextblock &&
            !y.type.spec.code &&
            !y.childCount &&
            ((u -= 1), (d += 1));
        }
        let g;
        if (h) {
          if (Array.isArray(e)) g = e.map(y => y.text || '').join('');
          else if (e instanceof C) {
            let y = '';
            (e.forEach(b => {
              b.text && (y += b.text);
            }),
              (g = y));
          } else typeof e == 'object' && e && e.text ? (g = e.text) : (g = e);
          r.insertText(g, u, d);
        } else {
          g = l;
          const y = r.doc.resolve(u),
            b = y.node(),
            x = y.parentOffset === 0,
            k = b.isText || b.isTextblock,
            S = b.content.size > 0;
          (x && k && S && (u = Math.max(0, u - 1)), r.replaceWith(u, d, g));
        }
        (t.updateSelection && ug(r, r.steps.length - 1, -1),
          t.applyInputRules &&
            r.setMeta('applyInputRules', { from: u, text: g }),
          t.applyPasteRules &&
            r.setMeta('applyPasteRules', { from: u, text: g }));
      }
      return !0;
    },
  fg =
    () =>
    ({ state: n, dispatch: e }) =>
      Bf(n, e),
  pg =
    () =>
    ({ state: n, dispatch: e }) =>
      zf(n, e),
  mg =
    () =>
    ({ state: n, dispatch: e }) =>
      Ic(n, e),
  gg =
    () =>
    ({ state: n, dispatch: e }) =>
      Pc(n, e),
  yg =
    () =>
    ({ state: n, dispatch: e, tr: t }) => {
      try {
        const r = ds(n.doc, n.selection.$from.pos, -1);
        return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
      } catch {
        return !1;
      }
    },
  bg =
    () =>
    ({ state: n, dispatch: e, tr: t }) => {
      try {
        const r = ds(n.doc, n.selection.$from.pos, 1);
        return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
      } catch {
        return !1;
      }
    },
  xg =
    () =>
    ({ state: n, dispatch: e }) =>
      Pf(n, e),
  kg =
    () =>
    ({ state: n, dispatch: e }) =>
      jf(n, e);
function Nu() {
  return typeof navigator < 'u' ? /Mac/.test(navigator.platform) : !1;
}
function Cg(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === 'Space' && (t = ' ');
  let r, s, i, o;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a)) o = !0;
    else if (/^a(lt)?$/i.test(a)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(a)) s = !0;
    else if (/^s(hift)?$/i.test(a)) i = !0;
    else if (/^mod$/i.test(a)) Rr() || Nu() ? (o = !0) : (s = !0);
    else throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return (
    r && (t = `Alt-${t}`),
    s && (t = `Ctrl-${t}`),
    o && (t = `Meta-${t}`),
    i && (t = `Shift-${t}`),
    t
  );
}
var Sg =
  n =>
  ({ editor: e, view: t, tr: r, dispatch: s }) => {
    const i = Cg(n).split(/-(?!$)/),
      o = i.find(c => !['Alt', 'Ctrl', 'Meta', 'Shift'].includes(c)),
      l = new KeyboardEvent('keydown', {
        key: o === 'Space' ? ' ' : o,
        altKey: i.includes('Alt'),
        ctrlKey: i.includes('Ctrl'),
        metaKey: i.includes('Meta'),
        shiftKey: i.includes('Shift'),
        bubbles: !0,
        cancelable: !0
      }),
      a = e.captureTransaction(() => {
        t.someProp('handleKeyDown', c => c(t, l));
      });
    return (
      a == null ||
        a.steps.forEach(c => {
          const u = c.map(r.mapping);
          u && s && r.maybeStep(u);
        }),
      !0
    );
  };
function kt(n, e, t = {}) {
  const { from: r, to: s, empty: i } = n.selection,
    o = e ? re(e, n.schema) : null,
    l = [];
  n.doc.nodesBetween(r, s, (d, h) => {
    if (d.isText) return;
    const f = Math.max(r, h),
      m = Math.min(s, h + d.nodeSize);
    l.push({ node: d, from: f, to: m });
  });
  const a = s - r,
    c = l
      .filter(d => (o ? o.name === d.node.type.name : !0))
      .filter(d => Ir(d.node.attrs, t, { strict: !1 }));
  return i ? !!c.length : c.reduce((d, h) => d + h.to - h.from, 0) >= a;
}
var vg =
    (n, e = {}) =>
    ({ state: t, dispatch: r }) => {
      const s = re(n, t.schema);
      return kt(t, s, e) ? $f(t, r) : !1;
    },
  Mg =
    () =>
    ({ state: n, dispatch: e }) =>
      $c(n, e),
  wg =
    n =>
    ({ state: e, dispatch: t }) => {
      const r = re(n, e.schema);
      return Xf(r)(e, t);
    },
  Tg =
    () =>
    ({ state: n, dispatch: e }) =>
      Bc(n, e);
function xs(n, e) {
  return e.nodes[n] ? 'node' : e.marks[n] ? 'mark' : null;
}
function Xl(n, e) {
  const t = typeof e == 'string' ? [e] : e;
  return Object.keys(n).reduce(
    (r, s) => (t.includes(s) || (r[s] = n[s]), r),
    {}
  );
}
var Eg =
    (n, e) =>
    ({ tr: t, state: r, dispatch: s }) => {
      let i = null,
        o = null;
      const l = xs(typeof n == 'string' ? n : n.name, r.schema);
      if (!l) return !1;
      (l === 'node' && (i = re(n, r.schema)),
        l === 'mark' && (o = rt(n, r.schema)));
      let a = !1;
      return (
        t.selection.ranges.forEach(c => {
          r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, d) => {
            (i &&
              i === u.type &&
              ((a = !0), s && t.setNodeMarkup(d, void 0, Xl(u.attrs, e))),
              o &&
                u.marks.length &&
                u.marks.forEach(h => {
                  o === h.type &&
                    ((a = !0),
                    s &&
                      t.addMark(d, d + u.nodeSize, o.create(Xl(h.attrs, e))));
                }));
          });
        }),
        a
      );
    },
  Ag =
    () =>
    ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0),
  Ng =
    () =>
    ({ tr: n, dispatch: e }) => {
      if (e) {
        const t = new Te(n.doc);
        n.setSelection(t);
      }
      return !0;
    },
  Og =
    () =>
    ({ state: n, dispatch: e }) =>
      Lc(n, e),
  Ig =
    () =>
    ({ state: n, dispatch: e }) =>
      jc(n, e),
  Rg =
    () =>
    ({ state: n, dispatch: e }) =>
      Vf(n, e),
  Lg =
    () =>
    ({ state: n, dispatch: e }) =>
      qf(n, e),
  Dg =
    () =>
    ({ state: n, dispatch: e }) =>
      Uf(n, e);
function Ai(n, e, t = {}, r = {}) {
  return Vn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
var Pg =
  (
    n,
    { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}
  ) =>
  ({ editor: s, tr: i, dispatch: o, commands: l }) => {
    const { doc: a } = i;
    if (r.preserveWhitespace !== 'full') {
      const c = Ai(n, s.schema, r, {
        errorOnInvalidContent: e ?? s.options.enableContentCheck
      });
      return (
        o && i.replaceWith(0, a.content.size, c).setMeta('preventUpdate', !t),
        !0
      );
    }
    return (
      o && i.setMeta('preventUpdate', !t),
      l.insertContentAt({ from: 0, to: a.content.size }, n, {
        parseOptions: r,
        errorOnInvalidContent: e ?? s.options.enableContentCheck
      })
    );
  };
function Ou(n, e) {
  const t = rt(e, n.schema),
    { from: r, to: s, empty: i } = n.selection,
    o = [];
  i
    ? (n.storedMarks && o.push(...n.storedMarks),
      o.push(...n.selection.$head.marks()))
    : n.doc.nodesBetween(r, s, a => {
        o.push(...a.marks);
      });
  const l = o.find(a => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Iu(n, e) {
  const t = new Ec(n);
  return (
    e.forEach(r => {
      r.steps.forEach(s => {
        t.step(s);
      });
    }),
    t
  );
}
function jg(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
function Bg(n, e, t) {
  const r = [];
  return (
    n.nodesBetween(e.from, e.to, (s, i) => {
      t(s) && r.push({ node: s, pos: i });
    }),
    r
  );
}
function zg(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function ks(n) {
  return e => zg(e.$from, n);
}
function N(n, e, t) {
  return n.config[e] === void 0 && n.parent
    ? N(n.parent, e, t)
    : typeof n.config[e] == 'function'
      ? n.config[e].bind({ ...t, parent: n.parent ? N(n.parent, e, t) : null })
      : n.config[e];
}
function ko(n) {
  return n
    .map(e => {
      const t = { name: e.name, options: e.options, storage: e.storage },
        r = N(e, 'addExtensions', t);
      return r ? [e, ...ko(r())] : e;
    })
    .flat(10);
}
function Co(n, e) {
  const t = Wt.fromSchema(e).serializeFragment(n),
    s = document.implementation.createHTMLDocument().createElement('div');
  return (s.appendChild(t), s.innerHTML);
}
function Ru(n) {
  return typeof n == 'function';
}
function F(n, e = void 0, ...t) {
  return Ru(n) ? (e ? n.bind(e)(...t) : n(...t)) : n;
}
function $g(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function fn(n) {
  const e = n.filter(s => s.type === 'extension'),
    t = n.filter(s => s.type === 'node'),
    r = n.filter(s => s.type === 'mark');
  return { baseExtensions: e, nodeExtensions: t, markExtensions: r };
}
function Lu(n) {
  const e = [],
    { nodeExtensions: t, markExtensions: r } = fn(n),
    s = [...t, ...r],
    i = {
      default: null,
      validate: void 0,
      rendered: !0,
      renderHTML: null,
      parseHTML: null,
      keepOnSplit: !0,
      isRequired: !1
    },
    o = t.filter(c => c.name !== 'text').map(c => c.name),
    l = r.map(c => c.name),
    a = [...o, ...l];
  return (
    n.forEach(c => {
      const u = {
          name: c.name,
          options: c.options,
          storage: c.storage,
          extensions: s
        },
        d = N(c, 'addGlobalAttributes', u);
      if (!d) return;
      d().forEach(f => {
        let m;
        (Array.isArray(f.types)
          ? (m = f.types)
          : f.types === '*'
            ? (m = a)
            : f.types === 'nodes'
              ? (m = o)
              : f.types === 'marks'
                ? (m = l)
                : (m = []),
          m.forEach(g => {
            Object.entries(f.attributes).forEach(([y, b]) => {
              e.push({ type: g, name: y, attribute: { ...i, ...b } });
            });
          }));
      });
    }),
    s.forEach(c => {
      const u = { name: c.name, options: c.options, storage: c.storage },
        d = N(c, 'addAttributes', u);
      if (!d) return;
      const h = d();
      Object.entries(h).forEach(([f, m]) => {
        const g = { ...i, ...m };
        (typeof (g == null ? void 0 : g.default) == 'function' &&
          (g.default = g.default()),
          g != null &&
            g.isRequired &&
            (g == null ? void 0 : g.default) === void 0 &&
            delete g.default,
          e.push({ type: c.name, name: f, attribute: g }));
      });
    }),
    e
  );
}
function Hg(n) {
  const e = [];
  let t = '',
    r = !1,
    s = !1,
    i = 0;
  const o = n.length;
  for (let l = 0; l < o; l += 1) {
    const a = n[l];
    if (a === "'" && !s) {
      ((r = !r), (t += a));
      continue;
    }
    if (a === '"' && !r) {
      ((s = !s), (t += a));
      continue;
    }
    if (!r && !s) {
      if (a === '(') {
        ((i += 1), (t += a));
        continue;
      }
      if (a === ')' && i > 0) {
        ((i -= 1), (t += a));
        continue;
      }
      if (a === ';' && i === 0) {
        (e.push(t), (t = ''));
        continue;
      }
    }
    t += a;
  }
  return (t && e.push(t), e);
}
function Ql(n) {
  const e = [],
    t = Hg(n || ''),
    r = t.length;
  for (let s = 0; s < r; s += 1) {
    const i = t[s],
      o = i.indexOf(':');
    if (o === -1) continue;
    const l = i.slice(0, o).trim(),
      a = i.slice(o + 1).trim();
    l && a && e.push([l, a]);
  }
  return e;
}
function Y(...n) {
  return n
    .filter(e => !!e)
    .reduce((e, t) => {
      const r = { ...e };
      return (
        Object.entries(t).forEach(([s, i]) => {
          if (!r[s]) {
            r[s] = i;
            return;
          }
          if (s === 'class') {
            const l = i ? String(i).split(' ') : [],
              a = r[s] ? r[s].split(' ') : [],
              c = l.filter(u => !a.includes(u));
            r[s] = [...a, ...c].join(' ');
          } else if (s === 'style') {
            const l = new Map([...Ql(r[s]), ...Ql(i)]);
            r[s] = Array.from(l.entries())
              .map(([a, c]) => `${a}: ${c}`)
              .join('; ');
          } else r[s] = i;
        }),
        r
      );
    }, {});
}
function Wn(n, e) {
  return e
    .filter(t => t.type === n.type.name)
    .filter(t => t.attribute.rendered)
    .map(t =>
      t.attribute.renderHTML
        ? t.attribute.renderHTML(n.attrs) || {}
        : { [t.name]: n.attrs[t.name] }
    )
    .reduce((t, r) => Y(t, r), {});
}
function Fg(n) {
  return typeof n != 'string'
    ? n
    : n.match(/^[+-]?(?:\d*\.)?\d+$/)
      ? Number(n)
      : n === 'true'
        ? !0
        : n === 'false'
          ? !1
          : n;
}
function Zl(n, e) {
  return 'style' in n
    ? n
    : {
        ...n,
        getAttrs: t => {
          const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
          if (r === !1) return !1;
          const s = e.reduce((i, o) => {
            const l = o.attribute.parseHTML
              ? o.attribute.parseHTML(t)
              : Fg(t.getAttribute(o.name));
            return l == null ? i : { ...i, [o.name]: l };
          }, {});
          return { ...r, ...s };
        }
      };
}
function ea(n) {
  return Object.fromEntries(
    Object.entries(n).filter(([e, t]) =>
      e === 'attrs' && $g(t) ? !1 : t != null
    )
  );
}
function ta(n) {
  var e, t;
  const r = {};
  return (
    !((e = n == null ? void 0 : n.attribute) != null && e.isRequired) &&
      'default' in ((n == null ? void 0 : n.attribute) || {}) &&
      (r.default = n.attribute.default),
    ((t = n == null ? void 0 : n.attribute) == null ? void 0 : t.validate) !==
      void 0 && (r.validate = n.attribute.validate),
    [n.name, r]
  );
}
function _g(n, e) {
  var t;
  const r = Lu(n),
    { nodeExtensions: s, markExtensions: i } = fn(n),
    o = (t = s.find(c => N(c, 'topNode'))) == null ? void 0 : t.name,
    l = Object.fromEntries(
      s.map(c => {
        const u = r.filter(b => b.type === c.name),
          d = {
            name: c.name,
            options: c.options,
            storage: c.storage,
            editor: e
          },
          h = n.reduce((b, x) => {
            const k = N(x, 'extendNodeSchema', d);
            return { ...b, ...(k ? k(c) : {}) };
          }, {}),
          f = ea({
            ...h,
            content: F(N(c, 'content', d)),
            marks: F(N(c, 'marks', d)),
            group: F(N(c, 'group', d)),
            inline: F(N(c, 'inline', d)),
            atom: F(N(c, 'atom', d)),
            selectable: F(N(c, 'selectable', d)),
            draggable: F(N(c, 'draggable', d)),
            code: F(N(c, 'code', d)),
            whitespace: F(N(c, 'whitespace', d)),
            linebreakReplacement: F(N(c, 'linebreakReplacement', d)),
            defining: F(N(c, 'defining', d)),
            isolating: F(N(c, 'isolating', d)),
            attrs: Object.fromEntries(u.map(ta))
          }),
          m = F(N(c, 'parseHTML', d));
        m && (f.parseDOM = m.map(b => Zl(b, u)));
        const g = N(c, 'renderHTML', d);
        g && (f.toDOM = b => g({ node: b, HTMLAttributes: Wn(b, u) }));
        const y = N(c, 'renderText', d);
        return (y && (f.toText = y), [c.name, f]);
      })
    ),
    a = Object.fromEntries(
      i.map(c => {
        const u = r.filter(y => y.type === c.name),
          d = {
            name: c.name,
            options: c.options,
            storage: c.storage,
            editor: e
          },
          h = n.reduce((y, b) => {
            const x = N(b, 'extendMarkSchema', d);
            return { ...y, ...(x ? x(c) : {}) };
          }, {}),
          f = ea({
            ...h,
            inclusive: F(N(c, 'inclusive', d)),
            excludes: F(N(c, 'excludes', d)),
            group: F(N(c, 'group', d)),
            spanning: F(N(c, 'spanning', d)),
            code: F(N(c, 'code', d)),
            attrs: Object.fromEntries(u.map(ta))
          }),
          m = F(N(c, 'parseHTML', d));
        m && (f.parseDOM = m.map(y => Zl(y, u)));
        const g = N(c, 'renderHTML', d);
        return (
          g && (f.toDOM = y => g({ mark: y, HTMLAttributes: Wn(y, u) })),
          [c.name, f]
        );
      })
    );
  return new dc({ topNode: o, nodes: l, marks: a });
}
function Vg(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return Array.from(new Set(e));
}
function Nn(n) {
  return n.sort((t, r) => {
    const s = N(t, 'priority') || 100,
      i = N(r, 'priority') || 100;
    return s > i ? -1 : s < i ? 1 : 0;
  });
}
function Du(n) {
  const e = Nn(ko(n)),
    t = Vg(e.map(r => r.name));
  return (
    t.length &&
      console.warn(
        `[tiptap warn]: Duplicate extension names found: [${t.map(r => `'${r}'`).join(', ')}]. This can lead to issues.`
      ),
    e
  );
}
function Pu(n, e, t) {
  const { from: r, to: s } = e,
    {
      blockSeparator: i = `

`,
      textSerializers: o = {}
    } = t || {};
  let l = '';
  return (
    n.nodesBetween(r, s, (a, c, u, d) => {
      var h;
      a.isBlock && c > r && (l += i);
      const f = o == null ? void 0 : o[a.type.name];
      if (f)
        return (
          u && (l += f({ node: a, pos: c, parent: u, index: d, range: e })),
          !1
        );
      a.isText &&
        (l +=
          (h = a == null ? void 0 : a.text) == null
            ? void 0
            : h.slice(Math.max(r, c) - c, s - c));
    }),
    l
  );
}
function Wg(n, e) {
  const t = { from: 0, to: n.content.size };
  return Pu(n, t, e);
}
function ju(n) {
  return Object.fromEntries(
    Object.entries(n.nodes)
      .filter(([, e]) => e.spec.toText)
      .map(([e, t]) => [e, t.spec.toText])
  );
}
function Ug(n, e) {
  const t = re(e, n.schema),
    { from: r, to: s } = n.selection,
    i = [];
  n.doc.nodesBetween(r, s, l => {
    i.push(l);
  });
  const o = i.reverse().find(l => l.type.name === t.name);
  return o ? { ...o.attrs } : {};
}
function Bu(n, e) {
  const t = xs(typeof e == 'string' ? e : e.name, n.schema);
  return t === 'node' ? Ug(n, e) : t === 'mark' ? Ou(n, e) : {};
}
function qg(n, e = JSON.stringify) {
  const t = {};
  return n.filter(r => {
    const s = e(r);
    return Object.prototype.hasOwnProperty.call(t, s) ? !1 : (t[s] = !0);
  });
}
function Kg(n) {
  const e = qg(n);
  return e.length === 1
    ? e
    : e.filter(
        (t, r) =>
          !e
            .filter((i, o) => o !== r)
            .some(
              i =>
                t.oldRange.from >= i.oldRange.from &&
                t.oldRange.to <= i.oldRange.to &&
                t.newRange.from >= i.newRange.from &&
                t.newRange.to <= i.newRange.to
            )
      );
}
function zu(n) {
  const { mapping: e, steps: t } = n,
    r = [];
  return (
    e.maps.forEach((s, i) => {
      const o = [];
      if (s.ranges.length)
        s.forEach((l, a) => {
          o.push({ from: l, to: a });
        });
      else {
        const { from: l, to: a } = t[i];
        if (l === void 0 || a === void 0) return;
        o.push({ from: l, to: a });
      }
      o.forEach(({ from: l, to: a }) => {
        const c = e.slice(i).map(l, -1),
          u = e.slice(i).map(a),
          d = e.invert().map(c, -1),
          h = e.invert().map(u);
        r.push({ oldRange: { from: d, to: h }, newRange: { from: c, to: u } });
      });
    }),
    Kg(r)
  );
}
function So(n, e, t) {
  const r = [];
  return (
    n === e
      ? t
          .resolve(n)
          .marks()
          .forEach(s => {
            const i = t.resolve(n),
              o = xo(i, s.type);
            o && r.push({ mark: s, ...o });
          })
      : t.nodesBetween(n, e, (s, i) => {
          !s ||
            (s == null ? void 0 : s.nodeSize) === void 0 ||
            r.push(
              ...s.marks.map(o => ({ from: i, to: i + s.nodeSize, mark: o }))
            );
        }),
    r
  );
}
var Jg = (n, e, t, r = 20) => {
  const s = n.doc.resolve(t);
  let i = r,
    o = null;
  for (; i > 0 && o === null; ) {
    const l = s.node(i);
    (l == null ? void 0 : l.type.name) === e ? (o = l) : (i -= 1);
  }
  return [o, i];
};
function yn(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function gr(n, e, t) {
  return Object.fromEntries(
    Object.entries(t).filter(([r]) => {
      const s = n.find(i => i.type === e && i.name === r);
      return s ? s.attribute.keepOnSplit : !1;
    })
  );
}
var Gg = (n, e = 500) => {
  let t = '';
  const r = n.parentOffset;
  return (
    n.parent.nodesBetween(Math.max(0, r - e), r, (s, i, o, l) => {
      var a, c;
      const u =
        ((c = (a = s.type.spec).toText) == null
          ? void 0
          : c.call(a, { node: s, pos: i, parent: o, index: l })) ||
        s.textContent ||
        '%leaf%';
      t += s.isAtom && !s.isText ? u : u.slice(0, Math.max(0, r - i));
    }),
    t
  );
};
function Ni(n, e, t = {}) {
  const { empty: r, ranges: s } = n.selection,
    i = e ? rt(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks())
      .filter(d => (i ? i.name === d.type.name : !0))
      .find(d => Ir(d.attrs, t, { strict: !1 }));
  let o = 0;
  const l = [];
  if (
    (s.forEach(({ $from: d, $to: h }) => {
      const f = d.pos,
        m = h.pos;
      n.doc.nodesBetween(f, m, (g, y) => {
        if (i && g.inlineContent && !g.type.allowsMarkType(i)) return !1;
        if (!g.isText && !g.marks.length) return;
        const b = Math.max(f, y),
          x = Math.min(m, y + g.nodeSize),
          k = x - b;
        ((o += k), l.push(...g.marks.map(S => ({ mark: S, from: b, to: x }))));
      });
    }),
    o === 0)
  )
    return !1;
  const a = l
      .filter(d => (i ? i.name === d.mark.type.name : !0))
      .filter(d => Ir(d.mark.attrs, t, { strict: !1 }))
      .reduce((d, h) => d + h.to - h.from, 0),
    c = l
      .filter(d => (i ? d.mark.type !== i && d.mark.type.excludes(i) : !0))
      .reduce((d, h) => d + h.to - h.from, 0);
  return (a > 0 ? a + c : a) >= o;
}
function Yg(n, e, t = {}) {
  if (!e) return kt(n, null, t) || Ni(n, null, t);
  const r = xs(e, n.schema);
  return r === 'node' ? kt(n, e, t) : r === 'mark' ? Ni(n, e, t) : !1;
}
var Xg = (n, e) => {
    const { $from: t, $to: r, $anchor: s } = n.selection;
    if (e) {
      const i = ks(l => l.type.name === e)(n.selection);
      if (!i) return !1;
      const o = n.doc.resolve(i.pos + 1);
      return s.pos + 1 === o.end();
    }
    return !(r.parentOffset < r.parent.nodeSize - 2 || t.pos !== r.pos);
  },
  Qg = n => {
    const { $from: e, $to: t } = n.selection;
    return !(e.parentOffset > 0 || e.pos !== t.pos);
  };
function na(n, e) {
  return Array.isArray(e)
    ? e.some(t => (typeof t == 'string' ? t : t.name) === n.name)
    : e;
}
function qs(n, e) {
  const { nodeExtensions: t } = fn(e),
    r = t.find(o => o.name === n);
  if (!r) return !1;
  const s = { name: r.name, options: r.options, storage: r.storage },
    i = F(N(r, 'group', s));
  return typeof i != 'string' ? !1 : i.split(' ').includes('list');
}
function Cs(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
  var r;
  if (t) {
    if (n.type.name === 'hardBreak') return !0;
    if (n.isText) return !/\S/.test((r = n.text) != null ? r : '');
  }
  if (n.isText) return !n.text;
  if (n.isAtom || n.isLeaf) return !1;
  if (n.content.childCount === 0) return !0;
  if (e) {
    let s = !0;
    return (
      n.content.forEach(i => {
        s !== !1 &&
          (Cs(i, { ignoreWhitespace: t, checkChildren: e }) || (s = !1));
      }),
      s
    );
  }
  return !1;
}
function $u(n) {
  return n instanceof I;
}
var Hu = class Fu {
  constructor(e) {
    this.position = e;
  }
  static fromJSON(e) {
    return new Fu(e.position);
  }
  toJSON() {
    return { position: this.position };
  }
};
function Zg(n, e) {
  const t = e.mapping.mapResult(n.position);
  return { position: new Hu(t.pos), mapResult: t };
}
function e0(n) {
  return new Hu(n);
}
function t0(n, e, t) {
  var r;
  const { selection: s } = e;
  let i = null;
  if ((Tu(s) && (i = s.$cursor), i)) {
    const l = (r = n.storedMarks) != null ? r : i.marks();
    return (
      i.parent.type.allowsMarkType(t) &&
      (!!t.isInSet(l) || !l.some(c => c.type.excludes(t)))
    );
  }
  const { ranges: o } = s;
  return o.some(({ $from: l, $to: a }) => {
    let c =
      l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return (
      n.doc.nodesBetween(l.pos, a.pos, (u, d, h) => {
        if (c) return !1;
        if (u.isInline) {
          const f = !h || h.type.allowsMarkType(t),
            m = !!t.isInSet(u.marks) || !u.marks.some(g => g.type.excludes(t));
          c = f && m;
        }
        return !c;
      }),
      c
    );
  });
}
var n0 =
    (n, e = {}) =>
    ({ tr: t, state: r, dispatch: s }) => {
      const { selection: i } = t,
        { empty: o, ranges: l } = i,
        a = rt(n, r.schema);
      if (s)
        if (o) {
          const c = Ou(r, a);
          t.addStoredMark(a.create({ ...c, ...e }));
        } else
          l.forEach(c => {
            const u = c.$from.pos,
              d = c.$to.pos;
            r.doc.nodesBetween(u, d, (h, f) => {
              const m = Math.max(f, u),
                g = Math.min(f + h.nodeSize, d);
              h.marks.find(b => b.type === a)
                ? h.marks.forEach(b => {
                    a === b.type &&
                      t.addMark(m, g, a.create({ ...b.attrs, ...e }));
                  })
                : t.addMark(m, g, a.create(e));
            });
          });
      return t0(r, t, a);
    },
  r0 =
    (n, e) =>
    ({ tr: t }) => (t.setMeta(n, e), !0),
  s0 =
    (n, e = {}) =>
    ({ state: t, dispatch: r, chain: s }) => {
      const i = re(n, t.schema);
      let o;
      return (
        t.selection.$anchor.sameParent(t.selection.$head) &&
          (o = t.selection.$anchor.parent.attrs),
        i.isTextblock
          ? s()
              .command(({ commands: l }) =>
                ml(i, { ...o, ...e })(t) ? !0 : l.clearNodes()
              )
              .command(({ state: l }) => ml(i, { ...o, ...e })(l, r))
              .run()
          : (console.warn(
              '[tiptap warn]: Currently "setNode()" only supports text block nodes.'
            ),
            !1)
      );
    },
  i0 =
    n =>
    ({ tr: e, dispatch: t }) => {
      if (t) {
        const { doc: r } = e,
          s = Ot(n, 0, r.content.size),
          i = I.create(r, s);
        e.setSelection(i);
      }
      return !0;
    },
  o0 =
    (n, e) =>
    ({ tr: t, state: r, dispatch: s }) => {
      const { selection: i } = r;
      let o, l;
      return (
        typeof e == 'number'
          ? ((o = e), (l = e))
          : e && 'from' in e && 'to' in e
            ? ((o = e.from), (l = e.to))
            : ((o = i.from), (l = i.to)),
        s &&
          t.doc.nodesBetween(o, l, (a, c) => {
            a.isText || t.setNodeMarkup(c, void 0, { ...a.attrs, dir: n });
          }),
        !0
      );
    },
  l0 =
    n =>
    ({ tr: e, dispatch: t }) => {
      if (t) {
        const { doc: r } = e,
          { from: s, to: i } = typeof n == 'number' ? { from: n, to: n } : n,
          o = D.atStart(r).from,
          l = D.atEnd(r).to,
          a = Ot(s, o, l),
          c = Ot(i, o, l),
          u = D.create(r, a, c);
        e.setSelection(u);
      }
      return !0;
    },
  a0 =
    n =>
    ({ state: e, dispatch: t }) => {
      const r = re(n, e.schema);
      return ep(r)(e, t);
    };
function ra(n, e) {
  const t =
    n.storedMarks ||
    (n.selection.$to.parentOffset && n.selection.$from.marks());
  if (t) {
    const r = t.filter(s => (e == null ? void 0 : e.includes(s.type.name)));
    n.tr.ensureMarks(r);
  }
}
var c0 =
    ({ keepMarks: n = !0 } = {}) =>
    ({ tr: e, state: t, dispatch: r, editor: s }) => {
      const { selection: i, doc: o } = e,
        { $from: l, $to: a } = i,
        c = s.extensionManager.attributes,
        u = gr(c, l.node().type.name, l.node().attrs);
      if (i instanceof I && i.node.isBlock)
        return !l.parentOffset || !tt(o, l.pos)
          ? !1
          : (r &&
              (n && ra(t, s.extensionManager.splittableMarks),
              e.split(l.pos).scrollIntoView()),
            !0);
      if (!l.parent.isBlock) return !1;
      const d = a.parentOffset === a.parent.content.size,
        h =
          l.depth === 0
            ? void 0
            : jg(l.node(-1).contentMatchAt(l.indexAfter(-1)));
      let f = d && h ? [{ type: h, attrs: u }] : void 0,
        m = tt(e.doc, e.mapping.map(l.pos), 1, f);
      if (
        (!f &&
          !m &&
          tt(e.doc, e.mapping.map(l.pos), 1, h ? [{ type: h }] : void 0) &&
          ((m = !0), (f = h ? [{ type: h, attrs: u }] : void 0)),
        r)
      ) {
        if (
          m &&
          (i instanceof D && e.deleteSelection(),
          e.split(e.mapping.map(l.pos), 1, f),
          h && !d && !l.parentOffset && l.parent.type !== h)
        ) {
          const g = e.mapping.map(l.before()),
            y = e.doc.resolve(g);
          l.node(-1).canReplaceWith(y.index(), y.index() + 1, h) &&
            e.setNodeMarkup(e.mapping.map(l.before()), h);
        }
        (n && ra(t, s.extensionManager.splittableMarks), e.scrollIntoView());
      }
      return m;
    },
  u0 =
    (n, e = {}) =>
    ({ tr: t, state: r, dispatch: s, editor: i }) => {
      var o;
      const l = re(n, r.schema),
        { $from: a, $to: c } = r.selection,
        u = r.selection.node;
      if ((u && u.isBlock) || a.depth < 2 || !a.sameParent(c)) return !1;
      const d = a.node(-1);
      if (d.type !== l) return !1;
      const h = i.extensionManager.attributes;
      if (
        a.parent.content.size === 0 &&
        a.node(-1).childCount === a.indexAfter(-1)
      ) {
        if (
          a.depth === 2 ||
          a.node(-3).type !== l ||
          a.index(-2) !== a.node(-2).childCount - 1
        )
          return !1;
        if (s) {
          let b = C.empty;
          const x = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
          for (let R = a.depth - x; R >= a.depth - 3; R -= 1)
            b = C.from(a.node(R).copy(b));
          const k =
              a.indexAfter(-1) < a.node(-2).childCount
                ? 1
                : a.indexAfter(-2) < a.node(-3).childCount
                  ? 2
                  : 3,
            S = { ...gr(h, a.node().type.name, a.node().attrs), ...e },
            v =
              ((o = l.contentMatch.defaultType) == null
                ? void 0
                : o.createAndFill(S)) || void 0;
          b = b.append(C.from(l.createAndFill(null, v) || void 0));
          const T = a.before(a.depth - (x - 1));
          t.replace(T, a.after(-k), new A(b, 4 - x, 0));
          let w = -1;
          (t.doc.nodesBetween(T, t.doc.content.size, (R, P) => {
            if (w > -1) return !1;
            R.isTextblock && R.content.size === 0 && (w = P + 1);
          }),
            w > -1 && t.setSelection(D.near(t.doc.resolve(w))),
            t.scrollIntoView());
        }
        return !0;
      }
      const f = c.pos === a.end() ? d.contentMatchAt(0).defaultType : null,
        m = { ...gr(h, d.type.name, d.attrs), ...e },
        g = { ...gr(h, a.node().type.name, a.node().attrs), ...e };
      t.delete(a.pos, c.pos);
      const y = f
        ? [
            { type: l, attrs: m },
            { type: f, attrs: g }
          ]
        : [{ type: l, attrs: m }];
      if (!tt(t.doc, a.pos, 2)) return !1;
      if (s) {
        const { selection: b, storedMarks: x } = r,
          { splittableMarks: k } = i.extensionManager,
          S = x || (b.$to.parentOffset && b.$from.marks());
        if ((t.split(a.pos, 2, y).scrollIntoView(), !S || !s)) return !0;
        const v = S.filter(T => k.includes(T.type.name));
        t.ensureMarks(v);
      }
      return !0;
    },
  Ks = (n, e) => {
    const t = ks(o => o.type === e)(n.selection);
    if (!t) return !0;
    const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
    if (r === void 0) return !0;
    const s = n.doc.nodeAt(r);
    return (
      t.node.type === (s == null ? void 0 : s.type) &&
        St(n.doc, t.pos) &&
        n.join(t.pos),
      !0
    );
  },
  Js = (n, e) => {
    const t = ks(o => o.type === e)(n.selection);
    if (!t) return !0;
    const r = n.doc.resolve(t.start).after(t.depth);
    if (r === void 0) return !0;
    const s = n.doc.nodeAt(r);
    return (
      t.node.type === (s == null ? void 0 : s.type) &&
        St(n.doc, r) &&
        n.join(r),
      !0
    );
  };
function d0(n) {
  const e = n.doc,
    t = e.firstChild;
  if (!t) return null;
  const r = 1,
    s = t.nodeSize - 1;
  return D.create(e, r, s);
}
var h0 =
    (n, e, t, r = {}) =>
    ({
      editor: s,
      tr: i,
      state: o,
      dispatch: l,
      chain: a,
      commands: c,
      can: u
    }) => {
      const { extensions: d, splittableMarks: h } = s.extensionManager,
        f = re(n, o.schema),
        m = re(e, o.schema),
        { selection: g, storedMarks: y } = o,
        { $from: b, $to: x } = g,
        k = b.blockRange(x),
        S = y || (g.$to.parentOffset && g.$from.marks());
      if (!k) return !1;
      const v = ks(L => qs(L.type.name, d))(g),
        T = g.from === 0 && g.to === o.doc.content.size,
        w = o.doc.content.content,
        R = w.length === 1 ? w[0] : null,
        P = T && R && qs(R.type.name, d) ? { node: R, pos: 0 } : null,
        V = v ?? P,
        K = !!v && k.depth >= 1 && k.depth - v.depth <= 1,
        J = !!P;
      if ((K || J) && V) {
        if (V.node.type === f)
          return T && J
            ? a()
                .command(({ tr: L, dispatch: j }) => {
                  const _ = d0(L);
                  return _ ? (L.setSelection(_), j && j(L), !0) : !1;
                })
                .liftListItem(m)
                .run()
            : c.liftListItem(m);
        if (qs(V.node.type.name, d) && f.validContent(V.node.content))
          return a()
            .command(() => (i.setNodeMarkup(V.pos, f), !0))
            .command(() => Ks(i, f))
            .command(() => Js(i, f))
            .run();
      }
      return !t || !S || !l
        ? a()
            .command(() => (u().wrapInList(f, r) ? !0 : c.clearNodes()))
            .wrapInList(f, r)
            .command(() => Ks(i, f))
            .command(() => Js(i, f))
            .run()
        : a()
            .command(() => {
              const L = u().wrapInList(f, r),
                j = S.filter(_ => h.includes(_.type.name));
              return (i.ensureMarks(j), L ? !0 : c.clearNodes());
            })
            .wrapInList(f, r)
            .command(() => Ks(i, f))
            .command(() => Js(i, f))
            .run();
    },
  f0 =
    (n, e = {}, t = {}) =>
    ({ state: r, commands: s }) => {
      const { extendEmptyMarkRange: i = !1 } = t,
        o = rt(n, r.schema);
      return Ni(r, o, e)
        ? s.unsetMark(o, { extendEmptyMarkRange: i })
        : s.setMark(o, e);
    },
  p0 =
    (n, e, t = {}) =>
    ({ state: r, commands: s }) => {
      const i = re(n, r.schema),
        o = re(e, r.schema),
        l = kt(r, i, t);
      let a;
      return (
        r.selection.$anchor.sameParent(r.selection.$head) &&
          (a = r.selection.$anchor.parent.attrs),
        l ? s.setNode(o, a) : s.setNode(i, { ...a, ...t })
      );
    },
  m0 =
    (n, e = {}) =>
    ({ state: t, commands: r }) => {
      const s = re(n, t.schema);
      return kt(t, s, e) ? r.lift(s) : r.wrapIn(s, e);
    },
  g0 =
    () =>
    ({ state: n, dispatch: e }) => {
      const t = n.plugins;
      for (let r = 0; r < t.length; r += 1) {
        const s = t[r];
        let i;
        if (s.spec.isInputRules && (i = s.getState(n))) {
          if (e) {
            const o = n.tr,
              l = i.transform;
            for (let a = l.steps.length - 1; a >= 0; a -= 1)
              o.step(l.steps[a].invert(l.docs[a]));
            if (i.text) {
              const a = o.doc.resolve(i.from).marks();
              o.replaceWith(i.from, i.to, n.schema.text(i.text, a));
            } else o.delete(i.from, i.to);
          }
          return !0;
        }
      }
      return !1;
    },
  y0 =
    () =>
    ({ tr: n, dispatch: e }) => {
      const { selection: t } = n,
        { empty: r, ranges: s } = t;
      return (
        r ||
          (e &&
            s.forEach(i => {
              n.removeMark(i.$from.pos, i.$to.pos);
            })),
        !0
      );
    },
  b0 =
    (n, e = {}) =>
    ({ tr: t, state: r, dispatch: s }) => {
      var i;
      const { extendEmptyMarkRange: o = !1 } = e,
        { selection: l } = t,
        a = rt(n, r.schema),
        { $from: c, empty: u, ranges: d } = l;
      if (!s) return !0;
      if (u && o) {
        let { from: h, to: f } = l;
        const m =
            (i = c.marks().find(y => y.type === a)) == null ? void 0 : i.attrs,
          g = xo(c, a, m);
        (g && ((h = g.from), (f = g.to)), t.removeMark(h, f, a));
      } else
        d.forEach(h => {
          t.removeMark(h.$from.pos, h.$to.pos, a);
        });
      return (t.removeStoredMark(a), !0);
    },
  x0 =
    n =>
    ({ tr: e, state: t, dispatch: r }) => {
      const { selection: s } = t;
      let i, o;
      return (
        typeof n == 'number'
          ? ((i = n), (o = n))
          : n && 'from' in n && 'to' in n
            ? ((i = n.from), (o = n.to))
            : ((i = s.from), (o = s.to)),
        r &&
          e.doc.nodesBetween(i, o, (l, a) => {
            if (l.isText) return;
            const c = { ...l.attrs };
            (delete c.dir, e.setNodeMarkup(a, void 0, c));
          }),
        !0
      );
    },
  k0 =
    (n, e = {}) =>
    ({ tr: t, state: r, dispatch: s }) => {
      let i = null,
        o = null;
      const l = xs(typeof n == 'string' ? n : n.name, r.schema);
      if (!l) return !1;
      (l === 'node' && (i = re(n, r.schema)),
        l === 'mark' && (o = rt(n, r.schema)));
      let a = !1;
      return (
        t.selection.ranges.forEach(c => {
          const u = c.$from.pos,
            d = c.$to.pos;
          let h, f, m, g;
          (t.selection.empty
            ? r.doc.nodesBetween(u, d, (y, b) => {
                i &&
                  i === y.type &&
                  ((a = !0),
                  (m = Math.max(b, u)),
                  (g = Math.min(b + y.nodeSize, d)),
                  (h = b),
                  (f = y));
              })
            : r.doc.nodesBetween(u, d, (y, b) => {
                (b < u &&
                  i &&
                  i === y.type &&
                  ((a = !0),
                  (m = Math.max(b, u)),
                  (g = Math.min(b + y.nodeSize, d)),
                  (h = b),
                  (f = y)),
                  b >= u &&
                    b <= d &&
                    (i &&
                      i === y.type &&
                      ((a = !0),
                      s && t.setNodeMarkup(b, void 0, { ...y.attrs, ...e })),
                    o &&
                      y.marks.length &&
                      y.marks.forEach(x => {
                        if (o === x.type && ((a = !0), s)) {
                          const k = Math.max(b, u),
                            S = Math.min(b + y.nodeSize, d);
                          t.addMark(k, S, o.create({ ...x.attrs, ...e }));
                        }
                      })));
              }),
            f &&
              (h !== void 0 &&
                s &&
                t.setNodeMarkup(h, void 0, { ...f.attrs, ...e }),
              o &&
                f.marks.length &&
                f.marks.forEach(y => {
                  o === y.type &&
                    s &&
                    t.addMark(m, g, o.create({ ...y.attrs, ...e }));
                })));
        }),
        a
      );
    },
  C0 =
    (n, e = {}) =>
    ({ state: t, dispatch: r }) => {
      const s = re(n, t.schema);
      return Kf(s, e)(t, r);
    },
  S0 =
    (n, e = {}) =>
    ({ state: t, dispatch: r }) => {
      const s = re(n, t.schema);
      return Jf(s, e)(t, r);
    },
  v0 = class {
    constructor() {
      this.callbacks = {};
    }
    on(n, e) {
      return (
        this.callbacks[n] || (this.callbacks[n] = []),
        this.callbacks[n].push(e),
        this
      );
    }
    emit(n, ...e) {
      const t = this.callbacks[n];
      return (t && t.forEach(r => r.apply(this, e)), this);
    }
    off(n, e) {
      const t = this.callbacks[n];
      return (
        t &&
          (e
            ? (this.callbacks[n] = t.filter(r => r !== e))
            : delete this.callbacks[n]),
        this
      );
    }
    once(n, e) {
      const t = (...r) => {
        (this.off(n, t), e.apply(this, r));
      };
      return this.on(n, t);
    }
    removeAllListeners() {
      this.callbacks = {};
    }
  },
  Ss = class {
    constructor(n) {
      var e;
      ((this.find = n.find),
        (this.handler = n.handler),
        (this.undoable = (e = n.undoable) != null ? e : !0));
    }
  },
  M0 = (n, e) => {
    if (bo(e)) return e.exec(n);
    const t = e(n);
    if (!t) return null;
    const r = [t.text];
    return (
      (r.index = t.index),
      (r.input = n),
      (r.data = t.data),
      t.replaceWith &&
        (t.text.includes(t.replaceWith) ||
          console.warn(
            '[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'
          ),
        r.push(t.replaceWith)),
      r
    );
  };
function sr(n) {
  var e;
  const { editor: t, from: r, to: s, text: i, rules: o, plugin: l } = n,
    { view: a } = t;
  if (a.composing) return !1;
  const c = a.state.doc.resolve(r);
  if (
    c.parent.type.spec.code ||
    ((e = c.nodeBefore || c.nodeAfter) != null &&
      e.marks.find(h => h.type.spec.code))
  )
    return !1;
  let u = !1;
  const d = Gg(c) + i;
  return (
    o.forEach(h => {
      if (u) return;
      const f = M0(d, h.find);
      if (!f) return;
      const m = a.state.tr,
        g = ys({ state: a.state, transaction: m }),
        y = { from: r - (f[0].length - i.length), to: s },
        { commands: b, chain: x, can: k } = new bs({ editor: t, state: g });
      h.handler({
        state: g,
        range: y,
        match: f,
        commands: b,
        chain: x,
        can: k
      }) === null ||
        !m.steps.length ||
        (h.undoable && m.setMeta(l, { transform: m, from: r, to: s, text: i }),
        a.dispatch(m),
        (u = !0));
    }),
    u
  );
}
function w0(n) {
  const { editor: e, rules: t } = n,
    r = new X({
      state: {
        init() {
          return null;
        },
        apply(s, i, o) {
          const l = s.getMeta(r);
          if (l) return l;
          const a = s.getMeta('applyInputRules');
          return (
            !!a &&
              setTimeout(() => {
                let { text: u } = a;
                typeof u == 'string' ? (u = u) : (u = Co(C.from(u), o.schema));
                const { from: d } = a,
                  h = d + u.length;
                sr({ editor: e, from: d, to: h, text: u, rules: t, plugin: r });
              }),
            s.selectionSet || s.docChanged ? null : i
          );
        }
      },
      props: {
        handleTextInput(s, i, o, l) {
          return sr({
            editor: e,
            from: i,
            to: o,
            text: l,
            rules: t,
            plugin: r
          });
        },
        handleDOMEvents: {
          compositionend: s => (
            setTimeout(() => {
              const { $cursor: i } = s.state.selection;
              i &&
                sr({
                  editor: e,
                  from: i.pos,
                  to: i.pos,
                  text: '',
                  rules: t,
                  plugin: r
                });
            }),
            !1
          )
        },
        handleKeyDown(s, i) {
          if (i.key !== 'Enter') return !1;
          const { $cursor: o } = s.state.selection;
          return o
            ? sr({
                editor: e,
                from: o.pos,
                to: o.pos,
                text: `
`,
                rules: t,
                plugin: r
              })
            : !1;
        }
      },
      isInputRules: !0
    });
  return r;
}
function T0(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function ir(n) {
  return T0(n) !== 'Object'
    ? !1
    : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function _u(n, e) {
  const t = { ...n };
  return (
    ir(n) &&
      ir(e) &&
      Object.keys(e).forEach(r => {
        ir(e[r]) && ir(n[r]) ? (t[r] = _u(n[r], e[r])) : (t[r] = e[r]);
      }),
    t
  );
}
var vo = class {
    constructor(n = {}) {
      ((this.type = 'extendable'),
        (this.parent = null),
        (this.child = null),
        (this.name = ''),
        (this.config = { name: this.name }),
        (this.config = { ...this.config, ...n }),
        (this.name = this.config.name));
    }
    get options() {
      return { ...(F(N(this, 'addOptions', { name: this.name })) || {}) };
    }
    get storage() {
      return {
        ...(F(
          N(this, 'addStorage', { name: this.name, options: this.options })
        ) || {})
      };
    }
    configure(n = {}) {
      const e = this.extend({
        ...this.config,
        addOptions: () => _u(this.options, n)
      });
      return ((e.name = this.name), (e.parent = this.parent), e);
    }
    extend(n = {}) {
      const e = new this.constructor({ ...this.config, ...n });
      return (
        (e.parent = this),
        (this.child = e),
        (e.name = 'name' in n ? n.name : e.parent.name),
        e
      );
    }
  },
  Ke = class Vu extends vo {
    constructor() {
      (super(...arguments), (this.type = 'mark'));
    }
    static create(e = {}) {
      const t = typeof e == 'function' ? e() : e;
      return new Vu(t);
    }
    static handleExit({ editor: e, mark: t }) {
      const { tr: r } = e.state,
        s = e.state.selection.$from;
      if (s.pos === s.end()) {
        const o = s.marks();
        if (!!!o.find(c => (c == null ? void 0 : c.type.name) === t.name))
          return !1;
        const a = o.find(c => (c == null ? void 0 : c.type.name) === t.name);
        return (
          a && r.removeStoredMark(a),
          r.insertText(' ', s.pos),
          e.view.dispatch(r),
          !0
        );
      }
      return !1;
    }
    configure(e) {
      return super.configure(e);
    }
    extend(e) {
      const t = typeof e == 'function' ? e() : e;
      return super.extend(t);
    }
  };
function E0(n) {
  return typeof n == 'number';
}
var A0 = class {
    constructor(n) {
      ((this.find = n.find), (this.handler = n.handler));
    }
  },
  N0 = (n, e, t) => {
    if (bo(e)) return [...n.matchAll(e)];
    const r = e(n, t);
    return r
      ? r.map(s => {
          const i = [s.text];
          return (
            (i.index = s.index),
            (i.input = n),
            (i.data = s.data),
            s.replaceWith &&
              (s.text.includes(s.replaceWith) ||
                console.warn(
                  '[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'
                ),
              i.push(s.replaceWith)),
            i
          );
        })
      : [];
  };
function O0(n) {
  const {
      editor: e,
      state: t,
      from: r,
      to: s,
      rule: i,
      pasteEvent: o,
      dropEvent: l
    } = n,
    { commands: a, chain: c, can: u } = new bs({ editor: e, state: t }),
    d = [];
  return (
    t.doc.nodesBetween(r, s, (f, m) => {
      var g, y, b, x, k;
      if (
        ((y = (g = f.type) == null ? void 0 : g.spec) != null && y.code) ||
        !(f.isText || f.isTextblock || f.isInline)
      )
        return;
      const S =
          (k =
            (x = (b = f.content) == null ? void 0 : b.size) != null
              ? x
              : f.nodeSize) != null
            ? k
            : 0,
        v = Math.max(r, m),
        T = Math.min(s, m + S);
      if (v >= T) return;
      const w = f.isText
        ? f.text || ''
        : f.textBetween(v - m, T - m, void 0, '￼');
      N0(w, i.find, o).forEach(P => {
        if (P.index === void 0) return;
        const V = v + P.index + 1,
          K = V + P[0].length,
          J = { from: t.tr.mapping.map(V), to: t.tr.mapping.map(K) },
          L = i.handler({
            state: t,
            range: J,
            match: P,
            commands: a,
            chain: c,
            can: u,
            pasteEvent: o,
            dropEvent: l
          });
        d.push(L);
      });
    }),
    d.every(f => f !== null)
  );
}
var or = null,
  I0 = n => {
    var e;
    const t = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer()
    });
    return ((e = t.clipboardData) == null || e.setData('text/html', n), t);
  };
function R0(n) {
  const { editor: e, rules: t } = n;
  let r = null,
    s = !1,
    i = !1,
    o = typeof ClipboardEvent < 'u' ? new ClipboardEvent('paste') : null,
    l;
  try {
    l = typeof DragEvent < 'u' ? new DragEvent('drop') : null;
  } catch {
    l = null;
  }
  const a = ({ state: u, from: d, to: h, rule: f, pasteEvt: m }) => {
    const g = u.tr,
      y = ys({ state: u, transaction: g });
    if (
      !(
        !O0({
          editor: e,
          state: y,
          from: Math.max(d - 1, 0),
          to: h.b - 1,
          rule: f,
          pasteEvent: m,
          dropEvent: l
        }) || !g.steps.length
      )
    ) {
      try {
        l = typeof DragEvent < 'u' ? new DragEvent('drop') : null;
      } catch {
        l = null;
      }
      return (
        (o = typeof ClipboardEvent < 'u' ? new ClipboardEvent('paste') : null),
        g
      );
    }
  };
  return t.map(
    u =>
      new X({
        view(d) {
          const h = m => {
              var g;
              ((r =
                (g = d.dom.parentElement) != null && g.contains(m.target)
                  ? d.dom.parentElement
                  : null),
                r && (or = e));
            },
            f = () => {
              or && (or = null);
            };
          return (
            window.addEventListener('dragstart', h),
            window.addEventListener('dragend', f),
            {
              destroy() {
                (window.removeEventListener('dragstart', h),
                  window.removeEventListener('dragend', f));
              }
            }
          );
        },
        props: {
          handleDOMEvents: {
            drop: (d, h) => {
              if (((i = r === d.dom.parentElement), (l = h), !i)) {
                const f = or;
                f != null &&
                  f.isEditable &&
                  setTimeout(() => {
                    const m = f.state.selection;
                    m && f.commands.deleteRange({ from: m.from, to: m.to });
                  }, 10);
              }
              return !1;
            },
            paste: (d, h) => {
              var f;
              const m =
                (f = h.clipboardData) == null ? void 0 : f.getData('text/html');
              return (
                (o = h),
                (s = !!(m != null && m.includes('data-pm-slice'))),
                !1
              );
            }
          }
        },
        appendTransaction: (d, h, f) => {
          const m = d[0],
            g = m.getMeta('uiEvent') === 'paste' && !s,
            y = m.getMeta('uiEvent') === 'drop' && !i,
            b = m.getMeta('applyPasteRules'),
            x = !!b;
          if (!g && !y && !x) return;
          if (x) {
            let { text: v } = b;
            typeof v == 'string' ? (v = v) : (v = Co(C.from(v), f.schema));
            const { from: T } = b,
              w = T + v.length,
              R = I0(v);
            return a({ rule: u, state: f, from: T, to: { b: w }, pasteEvt: R });
          }
          const k = h.doc.content.findDiffStart(f.doc.content),
            S = h.doc.content.findDiffEnd(f.doc.content);
          if (!(!E0(k) || !S || k === S.b))
            return a({ rule: u, state: f, from: k, to: S, pasteEvt: o });
        }
      })
  );
}
var vs = class {
  constructor(n, e) {
    ((this.splittableMarks = []),
      (this.editor = e),
      (this.baseExtensions = n),
      (this.extensions = Du(n)),
      (this.schema = _g(this.extensions, e)),
      this.setupExtensions());
  }
  get commands() {
    return this.extensions.reduce((n, e) => {
      const t = {
          name: e.name,
          options: e.options,
          storage: this.editor.extensionStorage[e.name],
          editor: this.editor,
          type: yn(e.name, this.schema)
        },
        r = N(e, 'addCommands', t);
      return r ? { ...n, ...r() } : n;
    }, {});
  }
  get plugins() {
    const { editor: n } = this;
    return Nn([...this.extensions].reverse()).flatMap(r => {
      const s = {
          name: r.name,
          options: r.options,
          storage: this.editor.extensionStorage[r.name],
          editor: n,
          type: yn(r.name, this.schema)
        },
        i = [],
        o = N(r, 'addKeyboardShortcuts', s);
      let l = {};
      if (
        (r.type === 'mark' &&
          N(r, 'exitable', s) &&
          (l.ArrowRight = () => Ke.handleExit({ editor: n, mark: r })),
        o)
      ) {
        const h = Object.fromEntries(
          Object.entries(o()).map(([f, m]) => [f, () => m({ editor: n })])
        );
        l = { ...l, ...h };
      }
      const a = Wm(l);
      i.push(a);
      const c = N(r, 'addInputRules', s);
      if (na(r, n.options.enableInputRules) && c) {
        const h = c();
        if (h && h.length) {
          const f = w0({ editor: n, rules: h }),
            m = Array.isArray(f) ? f : [f];
          i.push(...m);
        }
      }
      const u = N(r, 'addPasteRules', s);
      if (na(r, n.options.enablePasteRules) && u) {
        const h = u();
        if (h && h.length) {
          const f = R0({ editor: n, rules: h });
          i.push(...f);
        }
      }
      const d = N(r, 'addProseMirrorPlugins', s);
      if (d) {
        const h = d();
        i.push(...h);
      }
      return i;
    });
  }
  get attributes() {
    return Lu(this.extensions);
  }
  get nodeViews() {
    const { editor: n } = this,
      { nodeExtensions: e } = fn(this.extensions);
    return Object.fromEntries(
      e
        .filter(t => !!N(t, 'addNodeView'))
        .map(t => {
          const r = this.attributes.filter(a => a.type === t.name),
            s = {
              name: t.name,
              options: t.options,
              storage: this.editor.extensionStorage[t.name],
              editor: n,
              type: re(t.name, this.schema)
            },
            i = N(t, 'addNodeView', s);
          if (!i) return [];
          const o = i();
          if (!o) return [];
          const l = (a, c, u, d, h) => {
            const f = Wn(a, r);
            return o({
              node: a,
              view: c,
              getPos: u,
              decorations: d,
              innerDecorations: h,
              editor: n,
              extension: t,
              HTMLAttributes: f
            });
          };
          return [t.name, l];
        })
    );
  }
  dispatchTransaction(n) {
    const { editor: e } = this;
    return Nn([...this.extensions].reverse()).reduceRight((r, s) => {
      const i = {
          name: s.name,
          options: s.options,
          storage: this.editor.extensionStorage[s.name],
          editor: e,
          type: yn(s.name, this.schema)
        },
        o = N(s, 'dispatchTransaction', i);
      return o
        ? l => {
            o.call(i, { transaction: l, next: r });
          }
        : r;
    }, n);
  }
  transformPastedHTML(n) {
    const { editor: e } = this;
    return Nn([...this.extensions]).reduce(
      (r, s) => {
        const i = {
            name: s.name,
            options: s.options,
            storage: this.editor.extensionStorage[s.name],
            editor: e,
            type: yn(s.name, this.schema)
          },
          o = N(s, 'transformPastedHTML', i);
        return o
          ? (l, a) => {
              const c = r(l, a);
              return o.call(i, c);
            }
          : r;
      },
      n || (r => r)
    );
  }
  get markViews() {
    const { editor: n } = this,
      { markExtensions: e } = fn(this.extensions);
    return Object.fromEntries(
      e
        .filter(t => !!N(t, 'addMarkView'))
        .map(t => {
          const r = this.attributes.filter(l => l.type === t.name),
            s = {
              name: t.name,
              options: t.options,
              storage: this.editor.extensionStorage[t.name],
              editor: n,
              type: rt(t.name, this.schema)
            },
            i = N(t, 'addMarkView', s);
          if (!i) return [];
          const o = (l, a, c) => {
            const u = Wn(l, r);
            return i()({
              mark: l,
              view: a,
              inline: c,
              editor: n,
              extension: t,
              HTMLAttributes: u,
              updateAttributes: d => {
                q0(l, n, d);
              }
            });
          };
          return [t.name, o];
        })
    );
  }
  setupExtensions() {
    const n = this.extensions;
    ((this.editor.extensionStorage = Object.fromEntries(
      n.map(e => [e.name, e.storage])
    )),
      n.forEach(e => {
        var t;
        const r = {
          name: e.name,
          options: e.options,
          storage: this.editor.extensionStorage[e.name],
          editor: this.editor,
          type: yn(e.name, this.schema)
        };
        e.type === 'mark' &&
          ((t = F(N(e, 'keepOnSplit', r))) == null || t) &&
          this.splittableMarks.push(e.name);
        const s = N(e, 'onBeforeCreate', r),
          i = N(e, 'onCreate', r),
          o = N(e, 'onUpdate', r),
          l = N(e, 'onSelectionUpdate', r),
          a = N(e, 'onTransaction', r),
          c = N(e, 'onFocus', r),
          u = N(e, 'onBlur', r),
          d = N(e, 'onDestroy', r);
        (s && this.editor.on('beforeCreate', s),
          i && this.editor.on('create', i),
          o && this.editor.on('update', o),
          l && this.editor.on('selectionUpdate', l),
          a && this.editor.on('transaction', a),
          c && this.editor.on('focus', c),
          u && this.editor.on('blur', u),
          d && this.editor.on('destroy', d));
      }));
  }
};
vs.resolve = Du;
vs.sort = Nn;
vs.flatten = ko;
var L0 = {};
yo(L0, {
  ClipboardTextSerializer: () => Uu,
  Commands: () => qu,
  Delete: () => Ku,
  Drop: () => Ju,
  Editable: () => Gu,
  FocusEvents: () => Xu,
  Keymap: () => Qu,
  Paste: () => Zu,
  Tabindex: () => ed,
  TextDirection: () => td,
  focusEventsPluginKey: () => Yu
});
var ee = class Wu extends vo {
    constructor() {
      (super(...arguments), (this.type = 'extension'));
    }
    static create(e = {}) {
      const t = typeof e == 'function' ? e() : e;
      return new Wu(t);
    }
    configure(e) {
      return super.configure(e);
    }
    extend(e) {
      const t = typeof e == 'function' ? e() : e;
      return super.extend(t);
    }
  },
  Uu = ee.create({
    name: 'clipboardTextSerializer',
    addOptions() {
      return { blockSeparator: void 0 };
    },
    addProseMirrorPlugins() {
      return [
        new X({
          key: new se('clipboardTextSerializer'),
          props: {
            clipboardTextSerializer: () => {
              const { editor: n } = this,
                { state: e, schema: t } = n,
                { doc: r, selection: s } = e,
                { ranges: i } = s,
                o = Math.min(...i.map(u => u.$from.pos)),
                l = Math.max(...i.map(u => u.$to.pos)),
                a = ju(t);
              return Pu(
                r,
                { from: o, to: l },
                {
                  ...(this.options.blockSeparator !== void 0
                    ? { blockSeparator: this.options.blockSeparator }
                    : {}),
                  textSerializers: a
                }
              );
            }
          }
        })
      ];
    }
  }),
  qu = ee.create({
    name: 'commands',
    addCommands() {
      return { ...Mu };
    }
  }),
  Ku = ee.create({
    name: 'delete',
    onUpdate({ transaction: n, appendedTransactions: e }) {
      var t, r, s;
      const i = () => {
        var o, l, a, c;
        if (
          (c =
            (a =
              (l =
                (o = this.editor.options.coreExtensionOptions) == null
                  ? void 0
                  : o.delete) == null
                ? void 0
                : l.filterTransaction) == null
              ? void 0
              : a.call(l, n)) != null
            ? c
            : n.getMeta('y-sync$')
        )
          return;
        const u = Iu(n.before, [n, ...e]);
        zu(u).forEach(f => {
          u.mapping.mapResult(f.oldRange.from).deletedAfter &&
            u.mapping.mapResult(f.oldRange.to).deletedBefore &&
            u.before.nodesBetween(f.oldRange.from, f.oldRange.to, (m, g) => {
              const y = g + m.nodeSize - 2,
                b = f.oldRange.from <= g && y <= f.oldRange.to;
              this.editor.emit('delete', {
                type: 'node',
                node: m,
                from: g,
                to: y,
                newFrom: u.mapping.map(g),
                newTo: u.mapping.map(y),
                deletedRange: f.oldRange,
                newRange: f.newRange,
                partial: !b,
                editor: this.editor,
                transaction: n,
                combinedTransform: u
              });
            });
        });
        const h = u.mapping;
        u.steps.forEach((f, m) => {
          var g, y;
          if (f instanceof $e) {
            const b = h.slice(m).map(f.from, -1),
              x = h.slice(m).map(f.to),
              k = h.invert().map(b, -1),
              S = h.invert().map(x),
              v =
                b > 0
                  ? (g = u.doc.nodeAt(b - 1)) == null
                    ? void 0
                    : g.marks.some(w => w.eq(f.mark))
                  : !1,
              T =
                (y = u.doc.nodeAt(x)) == null
                  ? void 0
                  : y.marks.some(w => w.eq(f.mark));
            this.editor.emit('delete', {
              type: 'mark',
              mark: f.mark,
              from: f.from,
              to: f.to,
              deletedRange: { from: k, to: S },
              newRange: { from: b, to: x },
              partial: !!(T || v),
              editor: this.editor,
              transaction: n,
              combinedTransform: u
            });
          }
        });
      };
      (s =
        (r =
          (t = this.editor.options.coreExtensionOptions) == null
            ? void 0
            : t.delete) == null
          ? void 0
          : r.async) == null || s
        ? setTimeout(i, 0)
        : i();
    }
  }),
  Ju = ee.create({
    name: 'drop',
    addProseMirrorPlugins() {
      return [
        new X({
          key: new se('tiptapDrop'),
          props: {
            handleDrop: (n, e, t, r) => {
              this.editor.emit('drop', {
                editor: this.editor,
                event: e,
                slice: t,
                moved: r
              });
            }
          }
        })
      ];
    }
  }),
  Gu = ee.create({
    name: 'editable',
    addProseMirrorPlugins() {
      return [
        new X({
          key: new se('editable'),
          props: { editable: () => this.editor.options.editable }
        })
      ];
    }
  }),
  Yu = new se('focusEvents'),
  Xu = ee.create({
    name: 'focusEvents',
    addProseMirrorPlugins() {
      const { editor: n } = this;
      return [
        new X({
          key: Yu,
          props: {
            handleDOMEvents: {
              focus: (e, t) => {
                n.isFocused = !0;
                const r = n.state.tr
                  .setMeta('focus', { event: t })
                  .setMeta('addToHistory', !1);
                return (e.dispatch(r), !1);
              },
              blur: (e, t) => {
                n.isFocused = !1;
                const r = n.state.tr
                  .setMeta('blur', { event: t })
                  .setMeta('addToHistory', !1);
                return (e.dispatch(r), !1);
              }
            }
          }
        })
      ];
    }
  }),
  Qu = ee.create({
    name: 'keymap',
    addKeyboardShortcuts() {
      const n = () =>
          this.editor.commands.first(({ commands: o }) => [
            () => o.undoInputRule(),
            () =>
              o.command(({ tr: l }) => {
                const { selection: a, doc: c } = l,
                  { empty: u, $anchor: d } = a,
                  { pos: h, parent: f } = d,
                  m = d.parent.isTextblock && h > 0 ? l.doc.resolve(h - 1) : d,
                  g = m.parent.type.spec.isolating,
                  y = d.pos - d.parentOffset,
                  b =
                    g && m.parent.childCount === 1
                      ? y === d.pos
                      : z.atStart(c).from === h;
                return !u ||
                  !f.type.isTextblock ||
                  f.textContent.length ||
                  !b ||
                  (b && d.parent.type.name === 'paragraph')
                  ? !1
                  : o.clearNodes();
              }),
            () => o.deleteSelection(),
            () => o.joinBackward(),
            () => o.selectNodeBackward()
          ]),
        e = () =>
          this.editor.commands.first(({ commands: o }) => [
            () => o.deleteSelection(),
            () => o.deleteCurrentNode(),
            () => o.joinForward(),
            () => o.selectNodeForward()
          ]),
        r = {
          Enter: () =>
            this.editor.commands.first(({ commands: o }) => [
              () => o.newlineInCode(),
              () => o.createParagraphNear(),
              () => o.liftEmptyBlock(),
              () => o.splitBlock()
            ]),
          'Mod-Enter': () => this.editor.commands.exitCode(),
          Backspace: n,
          'Mod-Backspace': n,
          'Shift-Backspace': n,
          Delete: e,
          'Mod-Delete': e,
          'Mod-a': () => this.editor.commands.selectAll()
        },
        s = { ...r },
        i = {
          ...r,
          'Ctrl-h': n,
          'Alt-Backspace': n,
          'Ctrl-d': e,
          'Ctrl-Alt-Backspace': e,
          'Alt-Delete': e,
          'Alt-d': e,
          'Ctrl-a': () => this.editor.commands.selectTextblockStart(),
          'Ctrl-e': () => this.editor.commands.selectTextblockEnd()
        };
      return Rr() || Nu() ? i : s;
    },
    addProseMirrorPlugins() {
      return [
        new X({
          key: new se('clearDocument'),
          appendTransaction: (n, e, t) => {
            if (n.some(g => g.getMeta('composition'))) return;
            const r = n.some(g => g.docChanged) && !e.doc.eq(t.doc),
              s = n.some(g => g.getMeta('preventClearDocument'));
            if (!r || s) return;
            const { empty: i, from: o, to: l } = e.selection,
              a = z.atStart(e.doc).from,
              c = z.atEnd(e.doc).to;
            if (i || !(o === a && l === c) || !Cs(t.doc)) return;
            const h = t.tr,
              f = ys({ state: t, transaction: h }),
              { commands: m } = new bs({ editor: this.editor, state: f });
            if ((m.clearNodes(), !!h.steps.length)) return h;
          }
        })
      ];
    }
  }),
  Zu = ee.create({
    name: 'paste',
    addProseMirrorPlugins() {
      return [
        new X({
          key: new se('tiptapPaste'),
          props: {
            handlePaste: (n, e, t) => {
              this.editor.emit('paste', {
                editor: this.editor,
                event: e,
                slice: t
              });
            }
          }
        })
      ];
    }
  }),
  ed = ee.create({
    name: 'tabindex',
    addProseMirrorPlugins() {
      return [
        new X({
          key: new se('tabindex'),
          props: {
            attributes: () => (this.editor.isEditable ? { tabindex: '0' } : {})
          }
        })
      ];
    }
  }),
  td = ee.create({
    name: 'textDirection',
    addOptions() {
      return { direction: void 0 };
    },
    addGlobalAttributes() {
      if (!this.options.direction) return [];
      const { nodeExtensions: n } = fn(this.extensions);
      return [
        {
          types: n.filter(e => e.name !== 'text').map(e => e.name),
          attributes: {
            dir: {
              default: this.options.direction,
              parseHTML: e => {
                const t = e.getAttribute('dir');
                return t && (t === 'ltr' || t === 'rtl' || t === 'auto')
                  ? t
                  : this.options.direction;
              },
              renderHTML: e => (e.dir ? { dir: e.dir } : {})
            }
          }
        }
      ];
    },
    addProseMirrorPlugins() {
      return [
        new X({
          key: new se('textDirection'),
          props: {
            attributes: () => {
              const n = this.options.direction;
              return n ? { dir: n } : {};
            }
          }
        })
      ];
    }
  }),
  D0 = class vn {
    constructor(e, t, r = !1, s = null) {
      ((this.currentNode = null),
        (this.actualDepth = null),
        (this.isBlock = r),
        (this.resolvedPos = e),
        (this.editor = t),
        (this.currentNode = s));
    }
    get name() {
      return this.node.type.name;
    }
    get node() {
      return this.currentNode || this.resolvedPos.node();
    }
    get element() {
      return this.editor.view.domAtPos(this.pos).node;
    }
    get depth() {
      var e;
      return (e = this.actualDepth) != null ? e : this.resolvedPos.depth;
    }
    get pos() {
      return this.resolvedPos.pos;
    }
    get content() {
      return this.node.content;
    }
    set content(e) {
      let t = this.from,
        r = this.to;
      if (this.isBlock) {
        if (this.content.size === 0) {
          console.error(
            `You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`
          );
          return;
        }
        ((t = this.from + 1), (r = this.to - 1));
      }
      this.editor.commands.insertContentAt({ from: t, to: r }, e);
    }
    get attributes() {
      return this.node.attrs;
    }
    get textContent() {
      return this.node.textContent;
    }
    get size() {
      return this.node.nodeSize;
    }
    get from() {
      return this.isBlock
        ? this.pos
        : this.resolvedPos.start(this.resolvedPos.depth);
    }
    get range() {
      return { from: this.from, to: this.to };
    }
    get to() {
      return this.isBlock
        ? this.pos + this.size
        : this.resolvedPos.end(this.resolvedPos.depth) +
            (this.node.isText ? 0 : 1);
    }
    get parent() {
      if (this.depth === 0) return null;
      const e = this.resolvedPos.start(this.resolvedPos.depth - 1),
        t = this.resolvedPos.doc.resolve(e);
      return new vn(t, this.editor);
    }
    get before() {
      let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
      return (
        e.depth !== this.depth &&
          (e = this.resolvedPos.doc.resolve(this.from - 3)),
        new vn(e, this.editor)
      );
    }
    get after() {
      let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
      return (
        e.depth !== this.depth &&
          (e = this.resolvedPos.doc.resolve(this.to + 3)),
        new vn(e, this.editor)
      );
    }
    get children() {
      const e = [];
      return (
        this.node.content.forEach((t, r) => {
          const s = t.isBlock && !t.isTextblock,
            i = t.isAtom && !t.isText,
            o = t.isInline,
            l = this.pos + r + (i ? 0 : 1);
          if (l < 0 || l > this.resolvedPos.doc.nodeSize - 2) return;
          const a = this.resolvedPos.doc.resolve(l);
          if (!s && !o && a.depth <= this.depth) return;
          const c = new vn(a, this.editor, s, s || o ? t : null);
          (s && (c.actualDepth = this.depth + 1), e.push(c));
        }),
        e
      );
    }
    get firstChild() {
      return this.children[0] || null;
    }
    get lastChild() {
      const e = this.children;
      return e[e.length - 1] || null;
    }
    closest(e, t = {}) {
      let r = null,
        s = this.parent;
      for (; s && !r; ) {
        if (s.node.type.name === e)
          if (Object.keys(t).length > 0) {
            const i = s.node.attrs,
              o = Object.keys(t);
            for (let l = 0; l < o.length; l += 1) {
              const a = o[l];
              if (i[a] !== t[a]) break;
            }
          } else r = s;
        s = s.parent;
      }
      return r;
    }
    querySelector(e, t = {}) {
      return this.querySelectorAll(e, t, !0)[0] || null;
    }
    querySelectorAll(e, t = {}, r = !1) {
      let s = [];
      if (!this.children || this.children.length === 0) return s;
      const i = Object.keys(t);
      return (
        this.children.forEach(o => {
          (r && s.length > 0) ||
            (o.node.type.name === e &&
              i.every(a => t[a] === o.node.attrs[a]) &&
              s.push(o),
            !(r && s.length > 0) &&
              (s = s.concat(o.querySelectorAll(e, t, r))));
        }),
        s
      );
    }
    setAttribute(e) {
      const { tr: t } = this.editor.state;
      (t.setNodeMarkup(this.from, void 0, { ...this.node.attrs, ...e }),
        this.editor.view.dispatch(t));
    }
  },
  P0 = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}`;
function j0(n, e, t) {
  const r = document.querySelector('style[data-tiptap-style]');
  if (r !== null) return r;
  const s = document.createElement('style');
  return (
    e && s.setAttribute('nonce', e),
    s.setAttribute('data-tiptap-style', ''),
    (s.innerHTML = n),
    document.getElementsByTagName('head')[0].appendChild(s),
    s
  );
}
var B0 = class extends v0 {
  constructor(n = {}) {
    (super(),
      (this.css = null),
      (this.className = 'tiptap'),
      (this.editorView = null),
      (this.isFocused = !1),
      (this.isInitialized = !1),
      (this.extensionStorage = {}),
      (this.instanceId = Math.random().toString(36).slice(2, 9)),
      (this.options = {
        element: typeof document < 'u' ? document.createElement('div') : null,
        content: '',
        injectCSS: !0,
        injectNonce: void 0,
        extensions: [],
        autofocus: !1,
        editable: !0,
        textDirection: void 0,
        editorProps: {},
        parseOptions: {},
        coreExtensionOptions: {},
        enableInputRules: !0,
        enablePasteRules: !0,
        enableCoreExtensions: !0,
        enableContentCheck: !1,
        emitContentError: !1,
        onBeforeCreate: () => null,
        onCreate: () => null,
        onMount: () => null,
        onUnmount: () => null,
        onUpdate: () => null,
        onSelectionUpdate: () => null,
        onTransaction: () => null,
        onFocus: () => null,
        onBlur: () => null,
        onDestroy: () => null,
        onContentError: ({ error: r }) => {
          throw r;
        },
        onPaste: () => null,
        onDrop: () => null,
        onDelete: () => null,
        enableExtensionDispatchTransaction: !0
      }),
      (this.isCapturingTransaction = !1),
      (this.capturedTransaction = null),
      (this.utils = { getUpdatedPosition: Zg, createMappablePosition: e0 }),
      this.setOptions(n),
      this.createExtensionManager(),
      this.createCommandManager(),
      this.createSchema(),
      this.on('beforeCreate', this.options.onBeforeCreate),
      this.emit('beforeCreate', { editor: this }),
      this.on('mount', this.options.onMount),
      this.on('unmount', this.options.onUnmount),
      this.on('contentError', this.options.onContentError),
      this.on('create', this.options.onCreate),
      this.on('update', this.options.onUpdate),
      this.on('selectionUpdate', this.options.onSelectionUpdate),
      this.on('transaction', this.options.onTransaction),
      this.on('focus', this.options.onFocus),
      this.on('blur', this.options.onBlur),
      this.on('destroy', this.options.onDestroy),
      this.on('drop', ({ event: r, slice: s, moved: i }) =>
        this.options.onDrop(r, s, i)
      ),
      this.on('paste', ({ event: r, slice: s }) => this.options.onPaste(r, s)),
      this.on('delete', this.options.onDelete));
    const e = this.createDoc(),
      t = Eu(e, this.options.autofocus);
    ((this.editorState = sn.create({
      doc: e,
      schema: this.schema,
      selection: t || void 0
    })),
      this.options.element && this.mount(this.options.element));
  }
  mount(n) {
    if (typeof document > 'u')
      throw new Error(
        "[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment."
      );
    (this.createView(n),
      this.emit('mount', { editor: this }),
      this.css &&
        !document.head.contains(this.css) &&
        document.head.appendChild(this.css),
      window.setTimeout(() => {
        this.isDestroyed ||
          (this.options.autofocus !== !1 &&
            this.options.autofocus !== null &&
            this.commands.focus(this.options.autofocus),
          this.emit('create', { editor: this }),
          (this.isInitialized = !0));
      }, 0));
  }
  unmount() {
    if (this.editorView) {
      const n = this.editorView.dom;
      (n != null && n.editor && delete n.editor, this.editorView.destroy());
    }
    if (
      ((this.editorView = null),
      (this.isInitialized = !1),
      this.css && !document.querySelectorAll(`.${this.className}`).length)
    )
      try {
        typeof this.css.remove == 'function'
          ? this.css.remove()
          : this.css.parentNode && this.css.parentNode.removeChild(this.css);
      } catch (n) {
        console.warn('Failed to remove CSS element:', n);
      }
    ((this.css = null), this.emit('unmount', { editor: this }));
  }
  get storage() {
    return this.extensionStorage;
  }
  get commands() {
    return this.commandManager.commands;
  }
  chain() {
    return this.commandManager.chain();
  }
  can() {
    return this.commandManager.can();
  }
  injectCSS() {
    this.options.injectCSS &&
      typeof document < 'u' &&
      (this.css = j0(P0, this.options.injectNonce));
  }
  setOptions(n = {}) {
    ((this.options = { ...this.options, ...n }),
      !(!this.editorView || !this.state || this.isDestroyed) &&
        (this.options.editorProps &&
          this.view.setProps(this.options.editorProps),
        this.view.updateState(this.state)));
  }
  setEditable(n, e = !0) {
    (this.setOptions({ editable: n }),
      e &&
        this.emit('update', {
          editor: this,
          transaction: this.state.tr,
          appendedTransactions: []
        }));
  }
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  get view() {
    return this.editorView
      ? this.editorView
      : new Proxy(
          {
            state: this.editorState,
            updateState: n => {
              this.editorState = n;
            },
            dispatch: n => {
              this.dispatchTransaction(n);
            },
            composing: !1,
            dragging: null,
            editable: !0,
            isDestroyed: !1
          },
          {
            get: (n, e) => {
              if (this.editorView) return this.editorView[e];
              if (e === 'state') return this.editorState;
              if (e in n) return Reflect.get(n, e);
              throw new Error(
                `[tiptap error]: The editor view is not available. Cannot access view['${e}']. The editor may not be mounted yet.`
              );
            }
          }
        );
  }
  get state() {
    return (
      this.editorView && (this.editorState = this.view.state),
      this.editorState
    );
  }
  registerPlugin(n, e) {
    const t = Ru(e)
        ? e(n, [...this.state.plugins])
        : [...this.state.plugins, n],
      r = this.state.reconfigure({ plugins: t });
    return (this.view.updateState(r), r);
  }
  unregisterPlugin(n) {
    if (this.isDestroyed) return;
    const e = this.state.plugins;
    let t = e;
    if (
      ([].concat(n).forEach(s => {
        const i = typeof s == 'string' ? `${s}$` : s.key;
        t = t.filter(o => !o.key.startsWith(i));
      }),
      e.length === t.length)
    )
      return;
    const r = this.state.reconfigure({ plugins: t });
    return (this.view.updateState(r), r);
  }
  createExtensionManager() {
    var n, e;
    const r = [
      ...(this.options.enableCoreExtensions
        ? [
            Gu,
            Uu.configure({
              blockSeparator:
                (e =
                  (n = this.options.coreExtensionOptions) == null
                    ? void 0
                    : n.clipboardTextSerializer) == null
                  ? void 0
                  : e.blockSeparator
            }),
            qu,
            Xu,
            Qu,
            ed,
            Ju,
            Zu,
            Ku,
            td.configure({ direction: this.options.textDirection })
          ].filter(s =>
            typeof this.options.enableCoreExtensions == 'object'
              ? this.options.enableCoreExtensions[s.name] !== !1
              : !0
          )
        : []),
      ...this.options.extensions
    ].filter(s =>
      ['extension', 'node', 'mark'].includes(s == null ? void 0 : s.type)
    );
    this.extensionManager = new vs(r, this);
  }
  createCommandManager() {
    this.commandManager = new bs({ editor: this });
  }
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  createDoc() {
    let n;
    try {
      n = Ai(this.options.content, this.schema, this.options.parseOptions, {
        errorOnInvalidContent: this.options.enableContentCheck
      });
    } catch (e) {
      if (
        !(e instanceof Error) ||
        ![
          '[tiptap error]: Invalid JSON content',
          '[tiptap error]: Invalid HTML content'
        ].includes(e.message)
      )
        throw e;
      (this.emit('contentError', {
        editor: this,
        error: e,
        disableCollaboration: () => {
          ('collaboration' in this.storage &&
            typeof this.storage.collaboration == 'object' &&
            this.storage.collaboration &&
            (this.storage.collaboration.isDisabled = !0),
            (this.options.extensions = this.options.extensions.filter(
              t => t.name !== 'collaboration'
            )),
            this.createExtensionManager());
        }
      }),
        (n = Ai(this.options.content, this.schema, this.options.parseOptions, {
          errorOnInvalidContent: !1
        })));
    }
    return n;
  }
  createView(n) {
    const { editorProps: e, enableExtensionDispatchTransaction: t } =
        this.options,
      r = e.dispatchTransaction || this.dispatchTransaction.bind(this),
      s = t ? this.extensionManager.dispatchTransaction(r) : r,
      i = e.transformPastedHTML,
      o = this.extensionManager.transformPastedHTML(i);
    this.editorView = new Su(n, {
      ...e,
      attributes: { role: 'textbox', ...(e == null ? void 0 : e.attributes) },
      dispatchTransaction: s,
      transformPastedHTML: o,
      state: this.editorState,
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
    const l = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    (this.view.updateState(l), this.prependClass(), this.injectCSS());
    const a = this.view.dom;
    a.editor = this;
  }
  createNodeViews() {
    this.view.isDestroyed ||
      this.view.setProps({
        markViews: this.extensionManager.markViews,
        nodeViews: this.extensionManager.nodeViews
      });
  }
  prependClass() {
    this.view.dom.className = `${this.className} ${this.view.dom.className}`;
  }
  captureTransaction(n) {
    ((this.isCapturingTransaction = !0),
      n(),
      (this.isCapturingTransaction = !1));
    const e = this.capturedTransaction;
    return ((this.capturedTransaction = null), e);
  }
  dispatchTransaction(n) {
    if (this.view.isDestroyed) return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = n;
        return;
      }
      n.steps.forEach(c => {
        var u;
        return (u = this.capturedTransaction) == null ? void 0 : u.step(c);
      });
      return;
    }
    const { state: e, transactions: t } = this.state.applyTransaction(n),
      r = !this.state.selection.eq(e.selection),
      s = t.includes(n),
      i = this.state;
    if (
      (this.emit('beforeTransaction', {
        editor: this,
        transaction: n,
        nextState: e
      }),
      !s)
    )
      return;
    (this.view.updateState(e),
      this.emit('transaction', {
        editor: this,
        transaction: n,
        appendedTransactions: t.slice(1)
      }),
      r && this.emit('selectionUpdate', { editor: this, transaction: n }));
    const o = t.findLast(c => c.getMeta('focus') || c.getMeta('blur')),
      l = o == null ? void 0 : o.getMeta('focus'),
      a = o == null ? void 0 : o.getMeta('blur');
    (l && this.emit('focus', { editor: this, event: l.event, transaction: o }),
      a && this.emit('blur', { editor: this, event: a.event, transaction: o }),
      !(
        n.getMeta('preventUpdate') ||
        !t.some(c => c.docChanged) ||
        i.doc.eq(e.doc)
      ) &&
        this.emit('update', {
          editor: this,
          transaction: n,
          appendedTransactions: t.slice(1)
        }));
  }
  getAttributes(n) {
    return Bu(this.state, n);
  }
  isActive(n, e) {
    const t = typeof n == 'string' ? n : null,
      r = typeof n == 'string' ? e : n;
    return Yg(this.state, t, r);
  }
  getJSON() {
    return this.state.doc.toJSON();
  }
  getHTML() {
    return Co(this.state.doc.content, this.schema);
  }
  getText(n) {
    const {
      blockSeparator: e = `

`,
      textSerializers: t = {}
    } = n || {};
    return Wg(this.state.doc, {
      blockSeparator: e,
      textSerializers: { ...ju(this.schema), ...t }
    });
  }
  get isEmpty() {
    return Cs(this.state.doc);
  }
  destroy() {
    (this.emit('destroy'), this.unmount(), this.removeAllListeners());
  }
  get isDestroyed() {
    var n, e;
    return (e = (n = this.editorView) == null ? void 0 : n.isDestroyed) != null
      ? e
      : !0;
  }
  $node(n, e) {
    var t;
    return ((t = this.$doc) == null ? void 0 : t.querySelector(n, e)) || null;
  }
  $nodes(n, e) {
    var t;
    return (
      ((t = this.$doc) == null ? void 0 : t.querySelectorAll(n, e)) || null
    );
  }
  $pos(n) {
    const e = this.state.doc.resolve(n);
    return new D0(e, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function Vt(n) {
  return new Ss({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const s = F(n.getAttributes, void 0, r);
      if (s === !1 || s === null) return null;
      const { tr: i } = e,
        o = r[r.length - 1],
        l = r[0];
      if (o) {
        const a = l.search(/\S/),
          c = t.from + l.indexOf(o),
          u = c + o.length;
        if (
          So(t.from, t.to, e.doc)
            .filter(f =>
              f.mark.type.excluded.find(g => g === n.type && g !== f.mark.type)
            )
            .filter(f => f.to > c).length
        )
          return null;
        (u < t.to && i.delete(u, t.to), c > t.from && i.delete(t.from + a, c));
        const h = t.from + a + o.length;
        (i.addMark(t.from + a, h, n.type.create(s || {})),
          i.removeStoredMark(n.type));
      }
    },
    undoable: n.undoable
  });
}
function z0(n) {
  return new Ss({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const s = F(n.getAttributes, void 0, r) || {},
        { tr: i } = e,
        o = t.from;
      let l = t.to;
      const a = n.type.create(s);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let u = o + c;
        u > l ? (u = l) : (l = u + r[1].length);
        const d = r[0][r[0].length - 1];
        (i.insertText(d, o + r[0].length - 1), i.replaceWith(u, l, a));
      } else if (r[0]) {
        const c = n.type.isInline ? o : o - 1;
        i.insert(c, n.type.create(s)).delete(
          i.mapping.map(o),
          i.mapping.map(l)
        );
      }
      i.scrollIntoView();
    },
    undoable: n.undoable
  });
}
function Oi(n) {
  return new Ss({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const s = e.doc.resolve(t.from),
        i = F(n.getAttributes, void 0, r) || {};
      if (!s.node(-1).canReplaceWith(s.index(-1), s.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, i);
    },
    undoable: n.undoable
  });
}
function pn(n) {
  return new Ss({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: s }) => {
      const i = F(n.getAttributes, void 0, r) || {},
        o = e.tr.delete(t.from, t.to),
        a = o.doc.resolve(t.from).blockRange(),
        c = a && eo(a, n.type, i);
      if (!c) return null;
      if ((o.wrap(a, c), n.keepMarks && n.editor)) {
        const { selection: d, storedMarks: h } = e,
          { splittableMarks: f } = n.editor.extensionManager,
          m = h || (d.$to.parentOffset && d.$from.marks());
        if (m) {
          const g = m.filter(y => f.includes(y.type.name));
          o.ensureMarks(g);
        }
      }
      if (n.keepAttributes) {
        const d =
          n.type.name === 'bulletList' || n.type.name === 'orderedList'
            ? 'listItem'
            : 'taskList';
        s().updateAttributes(d, i).run();
      }
      const u = o.doc.resolve(t.from - 1).nodeBefore;
      u &&
        u.type === n.type &&
        St(o.doc, t.from - 1) &&
        (!n.joinPredicate || n.joinPredicate(r, u)) &&
        o.join(t.from - 1);
    },
    undoable: n.undoable
  });
}
function $0(n, e) {
  const { selection: t } = n,
    { $from: r } = t;
  if (t instanceof I) {
    const i = r.index();
    return r.parent.canReplaceWith(i, i + 1, e);
  }
  let s = r.depth;
  for (; s >= 0; ) {
    const i = r.index(s);
    if (r.node(s).contentMatchAt(i).matchType(e)) return !0;
    s -= 1;
  }
  return !1;
}
var H0 = {};
yo(H0, {
  createAtomBlockMarkdownSpec: () => F0,
  createBlockMarkdownSpec: () => _0,
  createInlineMarkdownSpec: () => U0,
  parseAttributes: () => Mo,
  parseIndentedBlocks: () => Ii,
  renderNestedMarkdownContent: () => To,
  serializeAttributes: () => wo
});
function Mo(n) {
  if (!(n != null && n.trim())) return {};
  const e = {},
    t = [],
    r = n.replace(
      /["']([^"']*)["']/g,
      c => (t.push(c), `__QUOTED_${t.length - 1}__`)
    ),
    s = r.match(/(?:^|\s)\.([a-zA-Z][\w-]*)/g);
  if (s) {
    const c = s.map(u => u.trim().slice(1));
    e.class = c.join(' ');
  }
  const i = r.match(/(?:^|\s)#([a-zA-Z][\w-]*)/);
  i && (e.id = i[1]);
  const o = /([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g;
  Array.from(r.matchAll(o)).forEach(([, c, u]) => {
    var d;
    const h = parseInt(
        ((d = u.match(/__QUOTED_(\d+)__/)) == null ? void 0 : d[1]) || '0',
        10
      ),
      f = t[h];
    f && (e[c] = f.slice(1, -1));
  });
  const a = r
    .replace(/(?:^|\s)\.([a-zA-Z][\w-]*)/g, '')
    .replace(/(?:^|\s)#([a-zA-Z][\w-]*)/g, '')
    .replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, '')
    .trim();
  return (
    a &&
      a
        .split(/\s+/)
        .filter(Boolean)
        .forEach(u => {
          u.match(/^[a-zA-Z][\w-]*$/) && (e[u] = !0);
        }),
    e
  );
}
function wo(n) {
  if (!n || Object.keys(n).length === 0) return '';
  const e = [];
  return (
    n.class &&
      String(n.class)
        .split(/\s+/)
        .filter(Boolean)
        .forEach(r => e.push(`.${r}`)),
    n.id && e.push(`#${n.id}`),
    Object.entries(n).forEach(([t, r]) => {
      t === 'class' ||
        t === 'id' ||
        (r === !0
          ? e.push(t)
          : r !== !1 && r != null && e.push(`${t}="${String(r)}"`));
    }),
    e.join(' ')
  );
}
function F0(n) {
  const {
      nodeName: e,
      name: t,
      parseAttributes: r = Mo,
      serializeAttributes: s = wo,
      defaultAttributes: i = {},
      requiredAttributes: o = [],
      allowedAttributes: l
    } = n,
    a = t || e,
    c = u => {
      if (!l) return u;
      const d = {};
      return (
        l.forEach(h => {
          h in u && (d[h] = u[h]);
        }),
        d
      );
    };
  return {
    parseMarkdown: (u, d) => {
      const h = { ...i, ...u.attributes };
      return d.createNode(e, h, []);
    },
    markdownTokenizer: {
      name: e,
      level: 'block',
      start(u) {
        var d;
        const h = new RegExp(`^:::${a}(?:\\s|$)`, 'm'),
          f = (d = u.match(h)) == null ? void 0 : d.index;
        return f !== void 0 ? f : -1;
      },
      tokenize(u, d, h) {
        const f = new RegExp(`^:::${a}(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)`),
          m = u.match(f);
        if (!m) return;
        const g = m[1] || '',
          y = r(g);
        if (!o.find(x => !(x in y)))
          return { type: e, raw: m[0], attributes: y };
      }
    },
    renderMarkdown: u => {
      const d = c(u.attrs || {}),
        h = s(d),
        f = h ? ` {${h}}` : '';
      return `:::${a}${f} :::`;
    }
  };
}
function _0(n) {
  const {
      nodeName: e,
      name: t,
      getContent: r,
      parseAttributes: s = Mo,
      serializeAttributes: i = wo,
      defaultAttributes: o = {},
      content: l = 'block',
      allowedAttributes: a
    } = n,
    c = t || e,
    u = d => {
      if (!a) return d;
      const h = {};
      return (
        a.forEach(f => {
          f in d && (h[f] = d[f]);
        }),
        h
      );
    };
  return {
    parseMarkdown: (d, h) => {
      let f;
      if (r) {
        const g = r(d);
        f = typeof g == 'string' ? [{ type: 'text', text: g }] : g;
      } else
        l === 'block'
          ? (f = h.parseChildren(d.tokens || []))
          : (f = h.parseInline(d.tokens || []));
      const m = { ...o, ...d.attributes };
      return h.createNode(e, m, f);
    },
    markdownTokenizer: {
      name: e,
      level: 'block',
      start(d) {
        var h;
        const f = new RegExp(`^:::${c}`, 'm'),
          m = (h = d.match(f)) == null ? void 0 : h.index;
        return m !== void 0 ? m : -1;
      },
      tokenize(d, h, f) {
        var m;
        const g = new RegExp(`^:::${c}(?:\\s+\\{([^}]*)\\})?\\s*\\n`),
          y = d.match(g);
        if (!y) return;
        const [b, x = ''] = y,
          k = s(x);
        let S = 1;
        const v = b.length;
        let T = '';
        const w = /^:::([\w-]*)(\s.*)?/gm,
          R = d.slice(v);
        for (w.lastIndex = 0; ; ) {
          const P = w.exec(R);
          if (P === null) break;
          const V = P.index,
            K = P[1];
          if (!((m = P[2]) != null && m.endsWith(':::'))) {
            if (K) S += 1;
            else if (((S -= 1), S === 0)) {
              const J = R.slice(0, V);
              T = J.trim();
              const L = d.slice(0, v + V + P[0].length);
              let j = [];
              if (T)
                if (l === 'block')
                  for (
                    j = f.blockTokens(J),
                      j.forEach(_ => {
                        _.text &&
                          (!_.tokens || _.tokens.length === 0) &&
                          (_.tokens = f.inlineTokens(_.text));
                      });
                    j.length > 0;
                  ) {
                    const _ = j[j.length - 1];
                    if (
                      _.type === 'paragraph' &&
                      (!_.text || _.text.trim() === '')
                    )
                      j.pop();
                    else break;
                  }
                else j = f.inlineTokens(T);
              return { type: e, raw: L, attributes: k, content: T, tokens: j };
            }
          }
        }
      }
    },
    renderMarkdown: (d, h) => {
      const f = u(d.attrs || {}),
        m = i(f),
        g = m ? ` {${m}}` : '',
        y = h.renderChildren(
          d.content || [],
          `

`
        );
      return `:::${c}${g}

${y}

:::`;
    }
  };
}
function V0(n) {
  if (!n.trim()) return {};
  const e = {},
    t = /(\w+)=(?:"([^"]*)"|'([^']*)')/g;
  let r = t.exec(n);
  for (; r !== null; ) {
    const [, s, i, o] = r;
    ((e[s] = i || o), (r = t.exec(n)));
  }
  return e;
}
function W0(n) {
  return Object.entries(n)
    .filter(([, e]) => e != null)
    .map(([e, t]) => `${e}="${t}"`)
    .join(' ');
}
function U0(n) {
  const {
      nodeName: e,
      name: t,
      getContent: r,
      parseAttributes: s = V0,
      serializeAttributes: i = W0,
      defaultAttributes: o = {},
      selfClosing: l = !1,
      allowedAttributes: a
    } = n,
    c = t || e,
    u = h => {
      if (!a) return h;
      const f = {};
      return (
        a.forEach(m => {
          const g = typeof m == 'string' ? m : m.name,
            y = typeof m == 'string' ? void 0 : m.skipIfDefault;
          if (g in h) {
            const b = h[g];
            if (y !== void 0 && b === y) return;
            f[g] = b;
          }
        }),
        f
      );
    },
    d = c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return {
    parseMarkdown: (h, f) => {
      const m = { ...o, ...h.attributes };
      if (l) return f.createNode(e, m);
      const g = r ? r(h) : h.content || '';
      return g
        ? f.createNode(e, m, [f.createTextNode(g)])
        : f.createNode(e, m, []);
    },
    markdownTokenizer: {
      name: e,
      level: 'inline',
      start(h) {
        const f = l
            ? new RegExp(`\\[${d}\\s*[^\\]]*\\]`)
            : new RegExp(`\\[${d}\\s*[^\\]]*\\][\\s\\S]*?\\[\\/${d}\\]`),
          m = h.match(f),
          g = m == null ? void 0 : m.index;
        return g !== void 0 ? g : -1;
      },
      tokenize(h, f, m) {
        const g = l
            ? new RegExp(`^\\[${d}\\s*([^\\]]*)\\]`)
            : new RegExp(`^\\[${d}\\s*([^\\]]*)\\]([\\s\\S]*?)\\[\\/${d}\\]`),
          y = h.match(g);
        if (!y) return;
        let b = '',
          x = '';
        if (l) {
          const [, S] = y;
          x = S;
        } else {
          const [, S, v] = y;
          ((x = S), (b = v || ''));
        }
        const k = s(x.trim());
        return { type: e, raw: y[0], content: b.trim(), attributes: k };
      }
    },
    renderMarkdown: h => {
      let f = '';
      r
        ? (f = r(h))
        : h.content &&
          h.content.length > 0 &&
          (f = h.content
            .filter(b => b.type === 'text')
            .map(b => b.text)
            .join(''));
      const m = u(h.attrs || {}),
        g = i(m),
        y = g ? ` ${g}` : '';
      return l ? `[${c}${y}]` : `[${c}${y}]${f}[/${c}]`;
    }
  };
}
function Ii(n, e, t) {
  var r, s, i, o;
  const l = n.split(`
`),
    a = [];
  let c = '',
    u = 0;
  const d = e.baseIndentSize || 2;
  for (; u < l.length; ) {
    const h = l[u],
      f = h.match(e.itemPattern);
    if (!f) {
      if (a.length > 0) break;
      if (h.trim() === '') {
        ((u += 1),
          (c = `${c}${h}
`));
        continue;
      } else return;
    }
    const m = e.extractItemData(f),
      { indentLevel: g, mainContent: y } = m;
    c = `${c}${h}
`;
    const b = [y];
    for (u += 1; u < l.length; ) {
      const v = l[u];
      if (v.trim() === '') {
        const w = l.slice(u + 1).findIndex(V => V.trim() !== '');
        if (w === -1) break;
        if (
          (((s = (r = l[u + 1 + w].match(/^(\s*)/)) == null ? void 0 : r[1]) ==
          null
            ? void 0
            : s.length) || 0) > g
        ) {
          (b.push(v),
            (c = `${c}${v}
`),
            (u += 1));
          continue;
        } else break;
      }
      if (
        (((o = (i = v.match(/^(\s*)/)) == null ? void 0 : i[1]) == null
          ? void 0
          : o.length) || 0) > g
      )
        (b.push(v),
          (c = `${c}${v}
`),
          (u += 1));
      else break;
    }
    let x;
    const k = b.slice(1);
    if (k.length > 0) {
      const v = k.map(T => T.slice(g + d)).join(`
`);
      v.trim() &&
        (e.customNestedParser
          ? (x = e.customNestedParser(v))
          : (x = t.blockTokens(v)));
    }
    const S = e.createToken(m, x);
    a.push(S);
  }
  if (a.length !== 0) return { items: a, raw: c };
}
function To(n, e, t, r) {
  if (!n || !Array.isArray(n.content)) return '';
  const s = typeof t == 'function' ? t(r) : t,
    [i, ...o] = n.content,
    l = e.renderChildren([i]);
  let a = `${s}${l}`;
  return (
    o &&
      o.length > 0 &&
      o.forEach((c, u) => {
        var d, h;
        const f =
          (h = (d = e.renderChild) == null ? void 0 : d.call(e, c, u + 1)) !=
          null
            ? h
            : e.renderChildren([c]);
        if (f != null) {
          const m = f
            .split(
              `
`
            )
            .map(g => (g ? e.indent(g) : e.indent(''))).join(`
`);
          a +=
            c.type === 'paragraph'
              ? `

${m}`
              : `
${m}`;
        }
      }),
    a
  );
}
function q0(n, e, t = {}) {
  const { state: r } = e,
    { doc: s, tr: i } = r,
    o = n;
  (s.descendants((l, a) => {
    const c = i.mapping.map(a),
      u = i.mapping.map(a) + l.nodeSize;
    let d = null;
    if (
      (l.marks.forEach(f => {
        if (f !== o) return !1;
        d = f;
      }),
      !d)
    )
      return;
    let h = !1;
    if (
      (Object.keys(t).forEach(f => {
        t[f] !== d.attrs[f] && (h = !0);
      }),
      h)
    ) {
      const f = n.type.create({ ...n.attrs, ...t });
      (i.removeMark(c, u, n.type), i.addMark(c, u, f));
    }
  }),
    i.docChanged && e.view.dispatch(i));
}
var Ee = class nd extends vo {
  constructor() {
    (super(...arguments), (this.type = 'node'));
  }
  static create(e = {}) {
    const t = typeof e == 'function' ? e() : e;
    return new nd(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == 'function' ? e() : e;
    return super.extend(t);
  }
};
function Ct(n) {
  return new A0({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: s }) => {
      const i = F(n.getAttributes, void 0, r, s);
      if (i === !1 || i === null) return null;
      const { tr: o } = e,
        l = r[r.length - 1],
        a = r[0];
      let c = t.to;
      if (l) {
        const u = a.search(/\S/),
          d = t.from + a.indexOf(l),
          h = d + l.length;
        if (
          So(t.from, t.to, e.doc)
            .filter(g =>
              g.mark.type.excluded.find(b => b === n.type && b !== g.mark.type)
            )
            .filter(g => g.to > d).length
        )
          return null;
        (h < t.to && o.delete(h, t.to),
          d > t.from && o.delete(t.from + u, d),
          (c = t.from + u + l.length),
          o.addMark(t.from + u, c, n.type.create(i || {})),
          (r.index !== void 0 &&
            r.input !== void 0 &&
            r.index + r[0].length >= r.input.length) ||
            o.removeStoredMark(n.type));
      }
    }
  });
}
const K0 =
    'aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2',
  J0 =
    'ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2',
  Ri = 'numeric',
  Li = 'ascii',
  Di = 'alpha',
  On = 'asciinumeric',
  Mn = 'alphanumeric',
  Pi = 'domain',
  rd = 'emoji',
  G0 = 'scheme',
  Y0 = 'slashscheme',
  Gs = 'whitespace';
function X0(n, e) {
  return (n in e || (e[n] = []), e[n]);
}
function It(n, e, t) {
  (e[Ri] && ((e[On] = !0), (e[Mn] = !0)),
    e[Li] && ((e[On] = !0), (e[Di] = !0)),
    e[On] && (e[Mn] = !0),
    e[Di] && (e[Mn] = !0),
    e[Mn] && (e[Pi] = !0),
    e[rd] && (e[Pi] = !0));
  for (const r in e) {
    const s = X0(r, t);
    s.indexOf(n) < 0 && s.push(n);
  }
}
function Q0(n, e) {
  const t = {};
  for (const r in e) e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function ve(n = null) {
  ((this.j = {}), (this.jr = []), (this.jd = null), (this.t = n));
}
ve.groups = {};
ve.prototype = {
  accepts() {
    return !!this.t;
  },
  go(n) {
    const e = this,
      t = e.j[n];
    if (t) return t;
    for (let r = 0; r < e.jr.length; r++) {
      const s = e.jr[r][0],
        i = e.jr[r][1];
      if (i && s.test(n)) return i;
    }
    return e.jd;
  },
  has(n, e = !1) {
    return e ? n in this.j : !!this.go(n);
  },
  ta(n, e, t, r) {
    for (let s = 0; s < n.length; s++) this.tt(n[s], e, t, r);
  },
  tr(n, e, t, r) {
    r = r || ve.groups;
    let s;
    return (
      e && e.j ? (s = e) : ((s = new ve(e)), t && r && It(e, t, r)),
      this.jr.push([n, s]),
      s
    );
  },
  ts(n, e, t, r) {
    let s = this;
    const i = n.length;
    if (!i) return s;
    for (let o = 0; o < i - 1; o++) s = s.tt(n[o]);
    return s.tt(n[i - 1], e, t, r);
  },
  tt(n, e, t, r) {
    r = r || ve.groups;
    const s = this;
    if (e && e.j) return ((s.j[n] = e), e);
    const i = e;
    let o,
      l = s.go(n);
    if (
      (l
        ? ((o = new ve()),
          Object.assign(o.j, l.j),
          o.jr.push.apply(o.jr, l.jr),
          (o.jd = l.jd),
          (o.t = l.t))
        : (o = new ve()),
      i)
    ) {
      if (r)
        if (o.t && typeof o.t == 'string') {
          const a = Object.assign(Q0(o.t, r), t);
          It(i, a, r);
        } else t && It(i, t, r);
      o.t = i;
    }
    return ((s.j[n] = o), o);
  }
};
const B = (n, e, t, r, s) => n.ta(e, t, r, s),
  Q = (n, e, t, r, s) => n.tr(e, t, r, s),
  sa = (n, e, t, r, s) => n.ts(e, t, r, s),
  M = (n, e, t, r, s) => n.tt(e, t, r, s),
  Qe = 'WORD',
  ji = 'UWORD',
  sd = 'ASCIINUMERICAL',
  id = 'ALPHANUMERICAL',
  Un = 'LOCALHOST',
  Bi = 'TLD',
  zi = 'UTLD',
  yr = 'SCHEME',
  rn = 'SLASH_SCHEME',
  Eo = 'NUM',
  $i = 'WS',
  Ao = 'NL',
  In = 'OPENBRACE',
  Rn = 'CLOSEBRACE',
  Lr = 'OPENBRACKET',
  Dr = 'CLOSEBRACKET',
  Pr = 'OPENPAREN',
  jr = 'CLOSEPAREN',
  Br = 'OPENANGLEBRACKET',
  zr = 'CLOSEANGLEBRACKET',
  $r = 'FULLWIDTHLEFTPAREN',
  Hr = 'FULLWIDTHRIGHTPAREN',
  Fr = 'LEFTCORNERBRACKET',
  _r = 'RIGHTCORNERBRACKET',
  Vr = 'LEFTWHITECORNERBRACKET',
  Wr = 'RIGHTWHITECORNERBRACKET',
  Ur = 'FULLWIDTHLESSTHAN',
  qr = 'FULLWIDTHGREATERTHAN',
  Kr = 'AMPERSAND',
  Jr = 'APOSTROPHE',
  Gr = 'ASTERISK',
  at = 'AT',
  Yr = 'BACKSLASH',
  Xr = 'BACKTICK',
  Qr = 'CARET',
  dt = 'COLON',
  No = 'COMMA',
  Zr = 'DOLLAR',
  Fe = 'DOT',
  es = 'EQUALS',
  Oo = 'EXCLAMATION',
  Oe = 'HYPHEN',
  Ln = 'PERCENT',
  ts = 'PIPE',
  ns = 'PLUS',
  rs = 'POUND',
  Dn = 'QUERY',
  Io = 'QUOTE',
  od = 'FULLWIDTHMIDDLEDOT',
  Ro = 'SEMI',
  _e = 'SLASH',
  Pn = 'TILDE',
  ss = 'UNDERSCORE',
  ld = 'EMOJI',
  is = 'SYM';
var ad = Object.freeze({
  __proto__: null,
  ALPHANUMERICAL: id,
  AMPERSAND: Kr,
  APOSTROPHE: Jr,
  ASCIINUMERICAL: sd,
  ASTERISK: Gr,
  AT: at,
  BACKSLASH: Yr,
  BACKTICK: Xr,
  CARET: Qr,
  CLOSEANGLEBRACKET: zr,
  CLOSEBRACE: Rn,
  CLOSEBRACKET: Dr,
  CLOSEPAREN: jr,
  COLON: dt,
  COMMA: No,
  DOLLAR: Zr,
  DOT: Fe,
  EMOJI: ld,
  EQUALS: es,
  EXCLAMATION: Oo,
  FULLWIDTHGREATERTHAN: qr,
  FULLWIDTHLEFTPAREN: $r,
  FULLWIDTHLESSTHAN: Ur,
  FULLWIDTHMIDDLEDOT: od,
  FULLWIDTHRIGHTPAREN: Hr,
  HYPHEN: Oe,
  LEFTCORNERBRACKET: Fr,
  LEFTWHITECORNERBRACKET: Vr,
  LOCALHOST: Un,
  NL: Ao,
  NUM: Eo,
  OPENANGLEBRACKET: Br,
  OPENBRACE: In,
  OPENBRACKET: Lr,
  OPENPAREN: Pr,
  PERCENT: Ln,
  PIPE: ts,
  PLUS: ns,
  POUND: rs,
  QUERY: Dn,
  QUOTE: Io,
  RIGHTCORNERBRACKET: _r,
  RIGHTWHITECORNERBRACKET: Wr,
  SCHEME: yr,
  SEMI: Ro,
  SLASH: _e,
  SLASH_SCHEME: rn,
  SYM: is,
  TILDE: Pn,
  TLD: Bi,
  UNDERSCORE: ss,
  UTLD: zi,
  UWORD: ji,
  WORD: Qe,
  WS: $i
});
const Ye = /[a-z]/,
  bn = new RegExp('\\p{L}', 'u'),
  Ys = new RegExp('\\p{Emoji}', 'u'),
  Xe = /\d/,
  Xs = /\s/,
  ia = '\r',
  Qs = `
`,
  Z0 = '️',
  ey = '‍',
  Zs = '￼';
let lr = null,
  ar = null;
function ty(n = []) {
  const e = {};
  ve.groups = e;
  const t = new ve();
  (lr == null && (lr = oa(K0)),
    ar == null && (ar = oa(J0)),
    M(t, "'", Jr),
    M(t, '{', In),
    M(t, '}', Rn),
    M(t, '[', Lr),
    M(t, ']', Dr),
    M(t, '(', Pr),
    M(t, ')', jr),
    M(t, '<', Br),
    M(t, '>', zr),
    M(t, '（', $r),
    M(t, '）', Hr),
    M(t, '「', Fr),
    M(t, '」', _r),
    M(t, '『', Vr),
    M(t, '』', Wr),
    M(t, '＜', Ur),
    M(t, '＞', qr),
    M(t, '&', Kr),
    M(t, '*', Gr),
    M(t, '@', at),
    M(t, '`', Xr),
    M(t, '^', Qr),
    M(t, ':', dt),
    M(t, ',', No),
    M(t, '$', Zr),
    M(t, '.', Fe),
    M(t, '=', es),
    M(t, '!', Oo),
    M(t, '-', Oe),
    M(t, '%', Ln),
    M(t, '|', ts),
    M(t, '+', ns),
    M(t, '#', rs),
    M(t, '?', Dn),
    M(t, '"', Io),
    M(t, '/', _e),
    M(t, ';', Ro),
    M(t, '~', Pn),
    M(t, '_', ss),
    M(t, '\\', Yr),
    M(t, '・', od));
  const r = Q(t, Xe, Eo, { [Ri]: !0 });
  Q(r, Xe, r);
  const s = Q(r, Ye, sd, { [On]: !0 }),
    i = Q(r, bn, id, { [Mn]: !0 }),
    o = Q(t, Ye, Qe, { [Li]: !0 });
  (Q(o, Xe, s), Q(o, Ye, o), Q(s, Xe, s), Q(s, Ye, s));
  const l = Q(t, bn, ji, { [Di]: !0 });
  (Q(l, Ye), Q(l, Xe, i), Q(l, bn, l), Q(i, Xe, i), Q(i, Ye), Q(i, bn, i));
  const a = M(t, Qs, Ao, { [Gs]: !0 }),
    c = M(t, ia, $i, { [Gs]: !0 }),
    u = Q(t, Xs, $i, { [Gs]: !0 });
  (M(t, Zs, u),
    M(c, Qs, a),
    M(c, Zs, u),
    Q(c, Xs, u),
    M(u, ia),
    M(u, Qs),
    Q(u, Xs, u),
    M(u, Zs, u));
  const d = Q(t, Ys, ld, { [rd]: !0 });
  (M(d, '#'), Q(d, Ys, d), M(d, Z0, d));
  const h = M(d, ey);
  (M(h, '#'), Q(h, Ys, d));
  const f = [
      [Ye, o],
      [Xe, s]
    ],
    m = [
      [Ye, null],
      [bn, l],
      [Xe, i]
    ];
  for (let g = 0; g < lr.length; g++) st(t, lr[g], Bi, Qe, f);
  for (let g = 0; g < ar.length; g++) st(t, ar[g], zi, ji, m);
  (It(Bi, { tld: !0, ascii: !0 }, e),
    It(zi, { utld: !0, alpha: !0 }, e),
    st(t, 'file', yr, Qe, f),
    st(t, 'mailto', yr, Qe, f),
    st(t, 'http', rn, Qe, f),
    st(t, 'https', rn, Qe, f),
    st(t, 'ftp', rn, Qe, f),
    st(t, 'ftps', rn, Qe, f),
    It(yr, { scheme: !0, ascii: !0 }, e),
    It(rn, { slashscheme: !0, ascii: !0 }, e),
    (n = n.sort((g, y) => (g[0] > y[0] ? 1 : -1))));
  for (let g = 0; g < n.length; g++) {
    const y = n[g][0],
      x = n[g][1] ? { [G0]: !0 } : { [Y0]: !0 };
    (y.indexOf('-') >= 0
      ? (x[Pi] = !0)
      : Ye.test(y)
        ? Xe.test(y)
          ? (x[On] = !0)
          : (x[Li] = !0)
        : (x[Ri] = !0),
      sa(t, y, y, x));
  }
  return (
    sa(t, 'localhost', Un, { ascii: !0 }),
    (t.jd = new ve(is)),
    { start: t, tokens: Object.assign({ groups: e }, ad) }
  );
}
function cd(n, e) {
  const t = ny(e.replace(/[A-Z]/g, l => l.toLowerCase())),
    r = t.length,
    s = [];
  let i = 0,
    o = 0;
  for (; o < r; ) {
    let l = n,
      a = null,
      c = 0,
      u = null,
      d = -1,
      h = -1;
    for (; o < r && (a = l.go(t[o])); )
      ((l = a),
        l.accepts()
          ? ((d = 0), (h = 0), (u = l))
          : d >= 0 && ((d += t[o].length), h++),
        (c += t[o].length),
        (i += t[o].length),
        o++);
    ((i -= d),
      (o -= h),
      (c -= d),
      s.push({ t: u.t, v: e.slice(i - c, i), s: i - c, e: i }));
  }
  return s;
}
function ny(n) {
  const e = [],
    t = n.length;
  let r = 0;
  for (; r < t; ) {
    let s = n.charCodeAt(r),
      i,
      o =
        s < 55296 ||
        s > 56319 ||
        r + 1 === t ||
        (i = n.charCodeAt(r + 1)) < 56320 ||
        i > 57343
          ? n[r]
          : n.slice(r, r + 2);
    (e.push(o), (r += o.length));
  }
  return e;
}
function st(n, e, t, r, s) {
  let i;
  const o = e.length;
  for (let l = 0; l < o - 1; l++) {
    const a = e[l];
    (n.j[a]
      ? (i = n.j[a])
      : ((i = new ve(r)), (i.jr = s.slice()), (n.j[a] = i)),
      (n = i));
  }
  return ((i = new ve(t)), (i.jr = s.slice()), (n.j[e[o - 1]] = i), i);
}
function oa(n) {
  const e = [],
    t = [];
  let r = 0,
    s = '0123456789';
  for (; r < n.length; ) {
    let i = 0;
    for (; s.indexOf(n[r + i]) >= 0; ) i++;
    if (i > 0) {
      e.push(t.join(''));
      for (let o = parseInt(n.substring(r, r + i), 10); o > 0; o--) t.pop();
      r += i;
    } else (t.push(n[r]), r++);
  }
  return e;
}
const qn = {
  defaultProtocol: 'http',
  events: null,
  format: la,
  formatHref: la,
  nl2br: !1,
  tagName: 'a',
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function Lo(n, e = null) {
  let t = Object.assign({}, qn);
  n && (t = Object.assign(t, n instanceof Lo ? n.o : n));
  const r = t.ignoreTags,
    s = [];
  for (let i = 0; i < r.length; i++) s.push(r[i].toUpperCase());
  ((this.o = t), e && (this.defaultRender = e), (this.ignoreTags = s));
}
Lo.prototype = {
  o: qn,
  ignoreTags: [],
  defaultRender(n) {
    return n;
  },
  check(n) {
    return this.get('validate', n.toString(), n);
  },
  get(n, e, t) {
    const r = e != null;
    let s = this.o[n];
    return (
      s &&
      (typeof s == 'object'
        ? ((s = t.t in s ? s[t.t] : qn[n]),
          typeof s == 'function' && r && (s = s(e, t)))
        : typeof s == 'function' && r && (s = s(e, t.t, t)),
      s)
    );
  },
  getObj(n, e, t) {
    let r = this.o[n];
    return (typeof r == 'function' && e != null && (r = r(e, t.t, t)), r);
  },
  render(n) {
    const e = n.render(this);
    return (this.get('render', null, n) || this.defaultRender)(e, n.t, n);
  }
};
function la(n) {
  return n;
}
function ud(n, e) {
  ((this.t = 'token'), (this.v = n), (this.tk = e));
}
ud.prototype = {
  isLink: !1,
  toString() {
    return this.v;
  },
  toHref(n) {
    return this.toString();
  },
  toFormattedString(n) {
    const e = this.toString(),
      t = n.get('truncate', e, this),
      r = n.get('format', e, this);
    return t && r.length > t ? r.substring(0, t) + '…' : r;
  },
  toFormattedHref(n) {
    return n.get('formatHref', this.toHref(n.get('defaultProtocol')), this);
  },
  startIndex() {
    return this.tk[0].s;
  },
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  toObject(n = qn.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  validate(n) {
    return n.get('validate', this.toString(), this);
  },
  render(n) {
    const e = this,
      t = this.toHref(n.get('defaultProtocol')),
      r = n.get('formatHref', t, this),
      s = n.get('tagName', t, e),
      i = this.toFormattedString(n),
      o = {},
      l = n.get('className', t, e),
      a = n.get('target', t, e),
      c = n.get('rel', t, e),
      u = n.getObj('attributes', t, e),
      d = n.getObj('events', t, e);
    return (
      (o.href = r),
      l && (o.class = l),
      a && (o.target = a),
      c && (o.rel = c),
      u && Object.assign(o, u),
      { tagName: s, attributes: o, content: i, eventListeners: d }
    );
  }
};
function Ms(n, e) {
  class t extends ud {
    constructor(s, i) {
      (super(s, i), (this.t = n));
    }
  }
  for (const r in e) t.prototype[r] = e[r];
  return ((t.t = n), t);
}
const aa = Ms('email', {
    isLink: !0,
    toHref() {
      return 'mailto:' + this.toString();
    }
  }),
  ca = Ms('text'),
  ry = Ms('nl'),
  cr = Ms('url', {
    isLink: !0,
    toHref(n = qn.defaultProtocol) {
      return this.hasProtocol() ? this.v : `${n}://${this.v}`;
    },
    hasProtocol() {
      const n = this.tk;
      return n.length >= 2 && n[0].t !== Un && n[1].t === dt;
    }
  }),
  Ne = n => new ve(n);
function sy({ groups: n }) {
  const e = n.domain.concat([
      Kr,
      Gr,
      at,
      Yr,
      Xr,
      Qr,
      Zr,
      es,
      Oe,
      Eo,
      Ln,
      ts,
      ns,
      rs,
      _e,
      is,
      Pn,
      ss
    ]),
    t = [
      Jr,
      dt,
      No,
      Fe,
      Oo,
      Ln,
      Dn,
      Io,
      Ro,
      Br,
      zr,
      In,
      Rn,
      Dr,
      Lr,
      Pr,
      jr,
      $r,
      Hr,
      Fr,
      _r,
      Vr,
      Wr,
      Ur,
      qr
    ],
    r = [
      Kr,
      Jr,
      Gr,
      Yr,
      Xr,
      Qr,
      Zr,
      es,
      Oe,
      In,
      Rn,
      Ln,
      ts,
      ns,
      rs,
      Dn,
      _e,
      is,
      Pn,
      ss
    ],
    s = Ne(),
    i = M(s, Pn);
  (B(i, r, i), B(i, n.domain, i));
  const o = Ne(),
    l = Ne(),
    a = Ne();
  (B(s, n.domain, o),
    B(s, n.scheme, l),
    B(s, n.slashscheme, a),
    B(o, r, i),
    B(o, n.domain, o));
  const c = M(o, at);
  (M(i, at, c), M(l, at, c), M(a, at, c));
  const u = M(i, Fe);
  (B(u, r, i), B(u, n.domain, i));
  const d = Ne();
  (B(c, n.domain, d), B(d, n.domain, d));
  const h = M(d, Fe);
  B(h, n.domain, d);
  const f = Ne(aa);
  (B(h, n.tld, f), B(h, n.utld, f), M(c, Un, f));
  const m = M(d, Oe);
  (M(m, Oe, m), B(m, n.domain, d), B(f, n.domain, d), M(f, Fe, h), M(f, Oe, m));
  const g = M(f, dt);
  B(g, n.numeric, aa);
  const y = M(o, Oe),
    b = M(o, Fe);
  (M(y, Oe, y), B(y, n.domain, o), B(b, r, i), B(b, n.domain, o));
  const x = Ne(cr);
  (B(b, n.tld, x),
    B(b, n.utld, x),
    B(x, n.domain, o),
    B(x, r, i),
    M(x, Fe, b),
    M(x, Oe, y),
    M(x, at, c));
  const k = M(x, dt),
    S = Ne(cr);
  B(k, n.numeric, S);
  const v = Ne(cr),
    T = Ne();
  (B(v, e, v), B(v, t, T), B(T, e, v), B(T, t, T), M(x, _e, v), M(S, _e, v));
  const w = M(l, dt),
    R = M(a, dt),
    P = M(R, _e),
    V = M(P, _e);
  (B(l, n.domain, o),
    M(l, Fe, b),
    M(l, Oe, y),
    B(a, n.domain, o),
    M(a, Fe, b),
    M(a, Oe, y),
    B(w, n.domain, v),
    M(w, _e, v),
    M(w, Dn, v),
    B(V, n.domain, v),
    B(V, e, v),
    M(V, _e, v));
  const K = [
    [In, Rn],
    [Lr, Dr],
    [Pr, jr],
    [Br, zr],
    [$r, Hr],
    [Fr, _r],
    [Vr, Wr],
    [Ur, qr]
  ];
  for (let J = 0; J < K.length; J++) {
    const [L, j] = K[J],
      _ = M(v, L);
    (M(T, L, _), M(_, j, v));
    const fe = Ne(cr);
    B(_, e, fe);
    const Ae = Ne();
    (B(_, t),
      B(fe, e, fe),
      B(fe, t, Ae),
      B(Ae, e, fe),
      B(Ae, t, Ae),
      M(fe, j, v),
      M(Ae, j, v));
  }
  return (M(s, Un, x), M(s, Ao, ry), { start: s, tokens: ad });
}
function iy(n, e, t) {
  let r = t.length,
    s = 0,
    i = [],
    o = [];
  for (; s < r; ) {
    let l = n,
      a = null,
      c = null,
      u = 0,
      d = null,
      h = -1;
    for (; s < r && !(a = l.go(t[s].t)); ) o.push(t[s++]);
    for (; s < r && (c = a || l.go(t[s].t)); )
      ((a = null),
        (l = c),
        l.accepts() ? ((h = 0), (d = l)) : h >= 0 && h++,
        s++,
        u++);
    if (h < 0) ((s -= u), s < r && (o.push(t[s]), s++));
    else {
      (o.length > 0 && (i.push(ei(ca, e, o)), (o = [])), (s -= h), (u -= h));
      const f = d.t,
        m = t.slice(s - u, s);
      i.push(ei(f, e, m));
    }
  }
  return (o.length > 0 && i.push(ei(ca, e, o)), i);
}
function ei(n, e, t) {
  const r = t[0].s,
    s = t[t.length - 1].e,
    i = e.slice(r, s);
  return new n(i, t);
}
const oy = (typeof console < 'u' && console && console.warn) || (() => {}),
  ly =
    'until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.',
  q = {
    scanner: null,
    parser: null,
    tokenQueue: [],
    pluginQueue: [],
    customSchemes: [],
    initialized: !1
  };
function ay() {
  return (
    (ve.groups = {}),
    (q.scanner = null),
    (q.parser = null),
    (q.tokenQueue = []),
    (q.pluginQueue = []),
    (q.customSchemes = []),
    (q.initialized = !1),
    q
  );
}
function ua(n, e = !1) {
  if (
    (q.initialized &&
      oy(
        `linkifyjs: already initialized - will not register custom scheme "${n}" ${ly}`
      ),
    !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
  )
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  q.customSchemes.push([n, e]);
}
function cy() {
  q.scanner = ty(q.customSchemes);
  for (let n = 0; n < q.tokenQueue.length; n++)
    q.tokenQueue[n][1]({ scanner: q.scanner });
  q.parser = sy(q.scanner.tokens);
  for (let n = 0; n < q.pluginQueue.length; n++)
    q.pluginQueue[n][1]({ scanner: q.scanner, parser: q.parser });
  return ((q.initialized = !0), q);
}
function Do(n) {
  return (q.initialized || cy(), iy(q.parser.start, n, cd(q.scanner.start, n)));
}
Do.scan = cd;
function dd(n, e = null, t = null) {
  if (e && typeof e == 'object') {
    if (t) throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    ((t = e), (e = null));
  }
  const r = new Lo(t),
    s = Do(n),
    i = [];
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    l.isLink &&
      (!e || l.t === e) &&
      r.check(l) &&
      i.push(l.toFormattedObject(r));
  }
  return i;
}
var Po = '[\0-   ᠎ -\u2029 　]',
  uy = new RegExp(Po),
  dy = new RegExp(`${Po}$`),
  hy = new RegExp(Po, 'g');
function fy(n) {
  return n.length === 1
    ? n[0].isLink
    : n.length === 3 && n[1].isLink
      ? ['()', '[]'].includes(n[0].value + n[2].value)
      : !1;
}
function py(n) {
  return new X({
    key: new se('autolink'),
    appendTransaction: (e, t, r) => {
      const s = e.some(c => c.docChanged) && !t.doc.eq(r.doc),
        i = e.some(c => c.getMeta('preventAutolink'));
      if (!s || i) return;
      const { tr: o } = r,
        l = Iu(t.doc, [...e]);
      if (
        (zu(l).forEach(({ newRange: c }) => {
          const u = Bg(r.doc, c, f => f.isTextblock);
          let d, h;
          if (u.length > 1)
            ((d = u[0]),
              (h = r.doc.textBetween(
                d.pos,
                d.pos + d.node.nodeSize,
                void 0,
                ' '
              )));
          else if (u.length) {
            const f = r.doc.textBetween(c.from, c.to, ' ', ' ');
            if (!dy.test(f)) return;
            ((d = u[0]), (h = r.doc.textBetween(d.pos, c.to, void 0, ' ')));
          }
          if (d && h) {
            const f = h.split(uy).filter(Boolean);
            if (f.length <= 0) return !1;
            const m = f[f.length - 1],
              g = d.pos + h.lastIndexOf(m);
            if (!m) return !1;
            const y = Do(m).map(b => b.toObject(n.defaultProtocol));
            if (!fy(y)) return !1;
            y.filter(b => b.isLink)
              .map(b => ({ ...b, from: g + b.start + 1, to: g + b.end + 1 }))
              .filter(b =>
                r.schema.marks.code
                  ? !r.doc.rangeHasMark(b.from, b.to, r.schema.marks.code)
                  : !0
              )
              .filter(b => n.validate(b.value))
              .filter(b => n.shouldAutoLink(b.value))
              .forEach(b => {
                So(b.from, b.to, r.doc).some(x => x.mark.type === n.type) ||
                  o.addMark(b.from, b.to, n.type.create({ href: b.href }));
              });
          }
        }),
        !!o.steps.length)
      )
        return o;
    }
  });
}
function my(n) {
  return new X({
    key: new se('handleClickLink'),
    props: {
      handleClick: (e, t, r) => {
        var s, i;
        if (r.button !== 0 || !e.editable) return !1;
        let o = null;
        if (r.target instanceof HTMLAnchorElement) o = r.target;
        else {
          const a = r.target;
          if (!a) return !1;
          const c = n.editor.view.dom;
          ((o = a.closest('a')), o && !c.contains(o) && (o = null));
        }
        if (!o) return !1;
        let l = !1;
        if (
          (n.enableClickSelection &&
            (l = n.editor.commands.extendMarkRange(n.type.name)),
          n.openOnClick)
        ) {
          const a = Bu(e.state, n.type.name),
            c = (s = o.href) != null ? s : a.href,
            u = (i = o.target) != null ? i : a.target;
          c && (window.open(c, u), (l = !0));
        }
        return l;
      }
    }
  });
}
function gy(n) {
  return new X({
    key: new se('handlePasteLink'),
    props: {
      handlePaste: (e, t, r) => {
        const { shouldAutoLink: s } = n,
          { state: i } = e,
          { selection: o } = i,
          { empty: l } = o;
        if (l) return !1;
        let a = '';
        r.content.forEach(u => {
          a += u.textContent;
        });
        const c = dd(a, { defaultProtocol: n.defaultProtocol }).find(
          u => u.isLink && u.value === a
        );
        return !a || !c || (s !== void 0 && !s(c.value))
          ? !1
          : n.editor.commands.setMark(n.type, { href: c.href });
      }
    }
  });
}
function Tt(n, e) {
  const t = [
    'http',
    'https',
    'ftp',
    'ftps',
    'mailto',
    'tel',
    'callto',
    'sms',
    'cid',
    'xmpp'
  ];
  return (
    e &&
      e.forEach(r => {
        const s = typeof r == 'string' ? r : r.scheme;
        s && t.push(s);
      }),
    !n ||
      n
        .replace(hy, '')
        .match(
          new RegExp(
            `^(?:(?:${t.join('|')}):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))`,
            'i'
          )
        )
  );
}
var hd = Ke.create({
    name: 'link',
    priority: 1e3,
    keepOnSplit: !1,
    exitable: !0,
    onCreate() {
      (this.options.validate &&
        !this.options.shouldAutoLink &&
        ((this.options.shouldAutoLink = this.options.validate),
        console.warn(
          'The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.'
        )),
        this.options.protocols.forEach(n => {
          if (typeof n == 'string') {
            ua(n);
            return;
          }
          ua(n.scheme, n.optionalSlashes);
        }));
    },
    onDestroy() {
      ay();
    },
    inclusive() {
      return this.options.autolink;
    },
    addOptions() {
      return {
        openOnClick: !0,
        enableClickSelection: !1,
        linkOnPaste: !0,
        autolink: !0,
        protocols: [],
        defaultProtocol: 'http',
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer nofollow',
          class: null
        },
        isAllowedUri: (n, e) => !!Tt(n, e.protocols),
        validate: n => !!n,
        shouldAutoLink: n => {
          const e = /^[a-z][a-z0-9+.-]*:\/\//i.test(n),
            t = /^[a-z][a-z0-9+.-]*:/i.test(n);
          if (e || (t && !n.includes('@'))) return !0;
          const s = (n.includes('@') ? n.split('@').pop() : n).split(
            /[/?#:]/
          )[0];
          return !(/^\d{1,3}(\.\d{1,3}){3}$/.test(s) || !/\./.test(s));
        }
      };
    },
    addAttributes() {
      return {
        href: {
          default: null,
          parseHTML(n) {
            return n.getAttribute('href');
          }
        },
        target: { default: this.options.HTMLAttributes.target },
        rel: { default: this.options.HTMLAttributes.rel },
        class: { default: this.options.HTMLAttributes.class },
        title: { default: null }
      };
    },
    parseHTML() {
      return [
        {
          tag: 'a[href]',
          getAttrs: n => {
            const e = n.getAttribute('href');
            return !e ||
              !this.options.isAllowedUri(e, {
                defaultValidate: t => !!Tt(t, this.options.protocols),
                protocols: this.options.protocols,
                defaultProtocol: this.options.defaultProtocol
              })
              ? !1
              : null;
          }
        }
      ];
    },
    renderHTML({ HTMLAttributes: n }) {
      return this.options.isAllowedUri(n.href, {
        defaultValidate: e => !!Tt(e, this.options.protocols),
        protocols: this.options.protocols,
        defaultProtocol: this.options.defaultProtocol
      })
        ? ['a', Y(this.options.HTMLAttributes, n), 0]
        : ['a', Y(this.options.HTMLAttributes, { ...n, href: '' }), 0];
    },
    markdownTokenName: 'link',
    parseMarkdown: (n, e) =>
      e.applyMark('link', e.parseInline(n.tokens || []), {
        href: n.href,
        title: n.title || null
      }),
    renderMarkdown: (n, e) => {
      var t, r, s, i;
      const o = (r = (t = n.attrs) == null ? void 0 : t.href) != null ? r : '',
        l = (i = (s = n.attrs) == null ? void 0 : s.title) != null ? i : '',
        a = e.renderChildren(n);
      return l ? `[${a}](${o} "${l}")` : `[${a}](${o})`;
    },
    addCommands() {
      return {
        setLink:
          n =>
          ({ chain: e }) => {
            const { href: t } = n;
            return this.options.isAllowedUri(t, {
              defaultValidate: r => !!Tt(r, this.options.protocols),
              protocols: this.options.protocols,
              defaultProtocol: this.options.defaultProtocol
            })
              ? e().setMark(this.name, n).setMeta('preventAutolink', !0).run()
              : !1;
          },
        toggleLink:
          n =>
          ({ chain: e }) => {
            const { href: t } = n || {};
            return t &&
              !this.options.isAllowedUri(t, {
                defaultValidate: r => !!Tt(r, this.options.protocols),
                protocols: this.options.protocols,
                defaultProtocol: this.options.defaultProtocol
              })
              ? !1
              : e()
                  .toggleMark(this.name, n, { extendEmptyMarkRange: !0 })
                  .setMeta('preventAutolink', !0)
                  .run();
          },
        unsetLink:
          () =>
          ({ chain: n }) =>
            n()
              .unsetMark(this.name, { extendEmptyMarkRange: !0 })
              .setMeta('preventAutolink', !0)
              .run()
      };
    },
    addPasteRules() {
      return [
        Ct({
          find: n => {
            const e = [];
            if (n) {
              const { protocols: t, defaultProtocol: r } = this.options,
                s = dd(n).filter(
                  i =>
                    i.isLink &&
                    this.options.isAllowedUri(i.value, {
                      defaultValidate: o => !!Tt(o, t),
                      protocols: t,
                      defaultProtocol: r
                    })
                );
              s.length &&
                s.forEach(i => {
                  this.options.shouldAutoLink(i.value) &&
                    e.push({
                      text: i.value,
                      data: { href: i.href },
                      index: i.start
                    });
                });
            }
            return e;
          },
          type: this.type,
          getAttributes: n => {
            var e;
            return { href: (e = n.data) == null ? void 0 : e.href };
          }
        })
      ];
    },
    addProseMirrorPlugins() {
      const n = [],
        { protocols: e, defaultProtocol: t } = this.options;
      return (
        this.options.autolink &&
          n.push(
            py({
              type: this.type,
              defaultProtocol: this.options.defaultProtocol,
              validate: r =>
                this.options.isAllowedUri(r, {
                  defaultValidate: s => !!Tt(s, e),
                  protocols: e,
                  defaultProtocol: t
                }),
              shouldAutoLink: this.options.shouldAutoLink
            })
          ),
        n.push(
          my({
            type: this.type,
            editor: this.editor,
            openOnClick:
              this.options.openOnClick === 'whenNotEditable'
                ? !0
                : this.options.openOnClick,
            enableClickSelection: this.options.enableClickSelection
          })
        ),
        this.options.linkOnPaste &&
          n.push(
            gy({
              editor: this.editor,
              defaultProtocol: this.options.defaultProtocol,
              type: this.type,
              shouldAutoLink: this.options.shouldAutoLink
            })
          ),
        n
      );
    }
  }),
  yy = hd;
const by = yy
  .extend({
    addKeyboardShortcuts: () => ({
      'Mod-k': () => (window.dispatchEvent(new Event('edit-link')), !0)
    })
  })
  .configure({ openOnClick: !1 });
var Ut = {
  root: 'm_dd3f7539',
  Typography: 'm_f2016866',
  content: 'm_c2204cc2',
  linkEditorDropdown: 'm_8a991b4f',
  control: 'm_c2207da6',
  controlIcon: 'm_9cdfeb3f',
  controlsGroup: 'm_2ab47ef2',
  linkEditor: 'm_b67b711e',
  linkEditorInput: 'm_296cf94c',
  linkEditorExternalControl: 'm_cfef614',
  linkEditorSave: 'm_3b28e7bb',
  toolbar: 'm_4574a3c4',
  taskList: 'm_8b44009a'
};
const xy = {
    linkControlLabel: 'Link',
    colorPickerControlLabel: 'Text color',
    highlightControlLabel: 'Highlight text',
    colorControlLabel: n => `Set text color ${n}`,
    boldControlLabel: 'Bold',
    italicControlLabel: 'Italic',
    underlineControlLabel: 'Underline',
    strikeControlLabel: 'Strikethrough',
    clearFormattingControlLabel: 'Clear formatting',
    unlinkControlLabel: 'Remove link',
    bulletListControlLabel: 'Bullet list',
    orderedListControlLabel: 'Ordered list',
    sourceCodeControlLabel: 'Switch between text/source code',
    h1ControlLabel: 'Heading 1',
    h2ControlLabel: 'Heading 2',
    h3ControlLabel: 'Heading 3',
    h4ControlLabel: 'Heading 4',
    h5ControlLabel: 'Heading 5',
    h6ControlLabel: 'Heading 6',
    blockquoteControlLabel: 'Blockquote',
    alignLeftControlLabel: 'Align text: left',
    alignCenterControlLabel: 'Align text: center',
    alignRightControlLabel: 'Align text: right',
    alignJustifyControlLabel: 'Align text: justify',
    codeControlLabel: 'Code',
    codeBlockControlLabel: 'Code block',
    subscriptControlLabel: 'Subscript',
    superscriptControlLabel: 'Superscript',
    unsetColorControlLabel: 'Unset color',
    hrControlLabel: 'Horizontal line',
    undoControlLabel: 'Undo',
    redoControlLabel: 'Redo',
    tasksControlLabel: 'Task list',
    tasksSinkLabel: 'Decrease task level',
    tasksLiftLabel: 'Increase task level',
    linkEditorInputLabel: 'Enter URL',
    linkEditorInputPlaceholder: 'https://example.com/',
    linkEditorExternalLink: 'Open link in a new tab',
    linkEditorInternalLink: 'Open link in the same tab',
    linkEditorSave: 'Save',
    colorPickerCancel: 'Cancel',
    colorPickerClear: 'Clear color',
    colorPickerColorPicker: 'Color picker',
    colorPickerPalette: 'Color palette',
    colorPickerSave: 'Save',
    colorPickerColorLabel: n => `Set text color ${n}`
  },
  [ky, Je] = Gd('RichTextEditor component was not found in tree');
var ti = { exports: {} },
  ni = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var da;
function Cy() {
  if (da) return ni;
  da = 1;
  var n = Oa();
  function e(d, h) {
    return (d === h && (d !== 0 || 1 / d === 1 / h)) || (d !== d && h !== h);
  }
  var t = typeof Object.is == 'function' ? Object.is : e,
    r = n.useState,
    s = n.useEffect,
    i = n.useLayoutEffect,
    o = n.useDebugValue;
  function l(d, h) {
    var f = h(),
      m = r({ inst: { value: f, getSnapshot: h } }),
      g = m[0].inst,
      y = m[1];
    return (
      i(
        function () {
          ((g.value = f), (g.getSnapshot = h), a(g) && y({ inst: g }));
        },
        [d, f, h]
      ),
      s(
        function () {
          return (
            a(g) && y({ inst: g }),
            d(function () {
              a(g) && y({ inst: g });
            })
          );
        },
        [d]
      ),
      o(f),
      f
    );
  }
  function a(d) {
    var h = d.getSnapshot;
    d = d.value;
    try {
      var f = h();
      return !t(d, f);
    } catch {
      return !0;
    }
  }
  function c(d, h) {
    return h();
  }
  var u =
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
      ? c
      : l;
  return (
    (ni.useSyncExternalStore =
      n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : u),
    ni
  );
}
var ha;
function fd() {
  return (ha || ((ha = 1), (ti.exports = Cy())), ti.exports);
}
var pd = fd();
const { getOwnPropertyNames: Sy, getOwnPropertySymbols: vy } = Object,
  { hasOwnProperty: My } = Object.prototype;
function ri(n, e) {
  return function (r, s, i) {
    return n(r, s, i) && e(r, s, i);
  };
}
function ur(n) {
  return function (t, r, s) {
    if (!t || !r || typeof t != 'object' || typeof r != 'object')
      return n(t, r, s);
    const { cache: i } = s,
      o = i.get(t),
      l = i.get(r);
    if (o && l) return o === r && l === t;
    (i.set(t, r), i.set(r, t));
    const a = n(t, r, s);
    return (i.delete(t), i.delete(r), a);
  };
}
function wy(n) {
  return n != null ? n[Symbol.toStringTag] : void 0;
}
function fa(n) {
  return Sy(n).concat(vy(n));
}
const Ty = Object.hasOwn || ((n, e) => My.call(n, e));
function qt(n, e) {
  return n === e || (!n && !e && n !== n && e !== e);
}
const Ey = '__v',
  Ay = '__o',
  Ny = '_owner',
  { getOwnPropertyDescriptor: pa, keys: ma } = Object;
function Oy(n, e) {
  return (
    n.byteLength === e.byteLength && ls(new Uint8Array(n), new Uint8Array(e))
  );
}
function Iy(n, e, t) {
  let r = n.length;
  if (e.length !== r) return !1;
  for (; r-- > 0; ) if (!t.equals(n[r], e[r], r, r, n, e, t)) return !1;
  return !0;
}
function Ry(n, e) {
  return (
    n.byteLength === e.byteLength &&
    ls(
      new Uint8Array(n.buffer, n.byteOffset, n.byteLength),
      new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
    )
  );
}
function Ly(n, e) {
  return qt(n.getTime(), e.getTime());
}
function Dy(n, e) {
  return (
    n.name === e.name &&
    n.message === e.message &&
    n.cause === e.cause &&
    n.stack === e.stack
  );
}
function Py(n, e) {
  return n === e;
}
function ga(n, e, t) {
  const r = n.size;
  if (r !== e.size) return !1;
  if (!r) return !0;
  const s = new Array(r),
    i = n.entries();
  let o,
    l,
    a = 0;
  for (; (o = i.next()) && !o.done; ) {
    const c = e.entries();
    let u = !1,
      d = 0;
    for (; (l = c.next()) && !l.done; ) {
      if (s[d]) {
        d++;
        continue;
      }
      const h = o.value,
        f = l.value;
      if (
        t.equals(h[0], f[0], a, d, n, e, t) &&
        t.equals(h[1], f[1], h[0], f[0], n, e, t)
      ) {
        u = s[d] = !0;
        break;
      }
      d++;
    }
    if (!u) return !1;
    a++;
  }
  return !0;
}
const jy = qt;
function By(n, e, t) {
  const r = ma(n);
  let s = r.length;
  if (ma(e).length !== s) return !1;
  for (; s-- > 0; ) if (!md(n, e, t, r[s])) return !1;
  return !0;
}
function xn(n, e, t) {
  const r = fa(n);
  let s = r.length;
  if (fa(e).length !== s) return !1;
  let i, o, l;
  for (; s-- > 0; )
    if (
      ((i = r[s]),
      !md(n, e, t, i) ||
        ((o = pa(n, i)),
        (l = pa(e, i)),
        (o || l) &&
          (!o ||
            !l ||
            o.configurable !== l.configurable ||
            o.enumerable !== l.enumerable ||
            o.writable !== l.writable)))
    )
      return !1;
  return !0;
}
function zy(n, e) {
  return qt(n.valueOf(), e.valueOf());
}
function $y(n, e) {
  return n.source === e.source && n.flags === e.flags;
}
function ya(n, e, t) {
  const r = n.size;
  if (r !== e.size) return !1;
  if (!r) return !0;
  const s = new Array(r),
    i = n.values();
  let o, l;
  for (; (o = i.next()) && !o.done; ) {
    const a = e.values();
    let c = !1,
      u = 0;
    for (; (l = a.next()) && !l.done; ) {
      if (!s[u] && t.equals(o.value, l.value, o.value, l.value, n, e, t)) {
        c = s[u] = !0;
        break;
      }
      u++;
    }
    if (!c) return !1;
  }
  return !0;
}
function ls(n, e) {
  let t = n.byteLength;
  if (e.byteLength !== t || n.byteOffset !== e.byteOffset) return !1;
  for (; t-- > 0; ) if (n[t] !== e[t]) return !1;
  return !0;
}
function Hy(n, e) {
  return (
    n.hostname === e.hostname &&
    n.pathname === e.pathname &&
    n.protocol === e.protocol &&
    n.port === e.port &&
    n.hash === e.hash &&
    n.username === e.username &&
    n.password === e.password
  );
}
function md(n, e, t, r) {
  return (r === Ny || r === Ay || r === Ey) && (n.$$typeof || e.$$typeof)
    ? !0
    : Ty(e, r) && t.equals(n[r], e[r], r, r, n, e, t);
}
const Fy = '[object ArrayBuffer]',
  _y = '[object Arguments]',
  Vy = '[object Boolean]',
  Wy = '[object DataView]',
  Uy = '[object Date]',
  qy = '[object Error]',
  Ky = '[object Map]',
  Jy = '[object Number]',
  Gy = '[object Object]',
  Yy = '[object RegExp]',
  Xy = '[object Set]',
  Qy = '[object String]',
  Zy = {
    '[object Int8Array]': !0,
    '[object Uint8Array]': !0,
    '[object Uint8ClampedArray]': !0,
    '[object Int16Array]': !0,
    '[object Uint16Array]': !0,
    '[object Int32Array]': !0,
    '[object Uint32Array]': !0,
    '[object Float16Array]': !0,
    '[object Float32Array]': !0,
    '[object Float64Array]': !0,
    '[object BigInt64Array]': !0,
    '[object BigUint64Array]': !0
  },
  eb = '[object URL]',
  tb = Object.prototype.toString;
function nb({
  areArrayBuffersEqual: n,
  areArraysEqual: e,
  areDataViewsEqual: t,
  areDatesEqual: r,
  areErrorsEqual: s,
  areFunctionsEqual: i,
  areMapsEqual: o,
  areNumbersEqual: l,
  areObjectsEqual: a,
  arePrimitiveWrappersEqual: c,
  areRegExpsEqual: u,
  areSetsEqual: d,
  areTypedArraysEqual: h,
  areUrlsEqual: f,
  unknownTagComparators: m
}) {
  return function (y, b, x) {
    if (y === b) return !0;
    if (y == null || b == null) return !1;
    const k = typeof y;
    if (k !== typeof b) return !1;
    if (k !== 'object')
      return k === 'number' ? l(y, b, x) : k === 'function' ? i(y, b, x) : !1;
    const S = y.constructor;
    if (S !== b.constructor) return !1;
    if (S === Object) return a(y, b, x);
    if (Array.isArray(y)) return e(y, b, x);
    if (S === Date) return r(y, b, x);
    if (S === RegExp) return u(y, b, x);
    if (S === Map) return o(y, b, x);
    if (S === Set) return d(y, b, x);
    const v = tb.call(y);
    if (v === Uy) return r(y, b, x);
    if (v === Yy) return u(y, b, x);
    if (v === Ky) return o(y, b, x);
    if (v === Xy) return d(y, b, x);
    if (v === Gy)
      return (
        typeof y.then != 'function' && typeof b.then != 'function' && a(y, b, x)
      );
    if (v === eb) return f(y, b, x);
    if (v === qy) return s(y, b, x);
    if (v === _y) return a(y, b, x);
    if (Zy[v]) return h(y, b, x);
    if (v === Fy) return n(y, b, x);
    if (v === Wy) return t(y, b, x);
    if (v === Vy || v === Jy || v === Qy) return c(y, b, x);
    if (m) {
      let T = m[v];
      if (!T) {
        const w = wy(y);
        w && (T = m[w]);
      }
      if (T) return T(y, b, x);
    }
    return !1;
  };
}
function rb({ circular: n, createCustomConfig: e, strict: t }) {
  let r = {
    areArrayBuffersEqual: Oy,
    areArraysEqual: t ? xn : Iy,
    areDataViewsEqual: Ry,
    areDatesEqual: Ly,
    areErrorsEqual: Dy,
    areFunctionsEqual: Py,
    areMapsEqual: t ? ri(ga, xn) : ga,
    areNumbersEqual: jy,
    areObjectsEqual: t ? xn : By,
    arePrimitiveWrappersEqual: zy,
    areRegExpsEqual: $y,
    areSetsEqual: t ? ri(ya, xn) : ya,
    areTypedArraysEqual: t ? ri(ls, xn) : ls,
    areUrlsEqual: Hy,
    unknownTagComparators: void 0
  };
  if ((e && (r = Object.assign({}, r, e(r))), n)) {
    const s = ur(r.areArraysEqual),
      i = ur(r.areMapsEqual),
      o = ur(r.areObjectsEqual),
      l = ur(r.areSetsEqual);
    r = Object.assign({}, r, {
      areArraysEqual: s,
      areMapsEqual: i,
      areObjectsEqual: o,
      areSetsEqual: l
    });
  }
  return r;
}
function sb(n) {
  return function (e, t, r, s, i, o, l) {
    return n(e, t, l);
  };
}
function ib({
  circular: n,
  comparator: e,
  createState: t,
  equals: r,
  strict: s
}) {
  if (t)
    return function (l, a) {
      const { cache: c = n ? new WeakMap() : void 0, meta: u } = t();
      return e(l, a, { cache: c, equals: r, meta: u, strict: s });
    };
  if (n)
    return function (l, a) {
      return e(l, a, {
        cache: new WeakMap(),
        equals: r,
        meta: void 0,
        strict: s
      });
    };
  const i = { cache: void 0, equals: r, meta: void 0, strict: s };
  return function (l, a) {
    return e(l, a, i);
  };
}
const ob = Mt();
Mt({ strict: !0 });
Mt({ circular: !0 });
Mt({ circular: !0, strict: !0 });
Mt({ createInternalComparator: () => qt });
Mt({ strict: !0, createInternalComparator: () => qt });
Mt({ circular: !0, createInternalComparator: () => qt });
Mt({ circular: !0, createInternalComparator: () => qt, strict: !0 });
function Mt(n = {}) {
  const {
      circular: e = !1,
      createInternalComparator: t,
      createState: r,
      strict: s = !1
    } = n,
    i = rb(n),
    o = nb(i),
    l = t ? t(o) : sb(o);
  return ib({
    circular: e,
    comparator: o,
    createState: r,
    equals: l,
    strict: s
  });
}
var si = { exports: {} },
  ii = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ba;
function lb() {
  if (ba) return ii;
  ba = 1;
  var n = Oa(),
    e = fd();
  function t(c, u) {
    return (c === u && (c !== 0 || 1 / c === 1 / u)) || (c !== c && u !== u);
  }
  var r = typeof Object.is == 'function' ? Object.is : t,
    s = e.useSyncExternalStore,
    i = n.useRef,
    o = n.useEffect,
    l = n.useMemo,
    a = n.useDebugValue;
  return (
    (ii.useSyncExternalStoreWithSelector = function (c, u, d, h, f) {
      var m = i(null);
      if (m.current === null) {
        var g = { hasValue: !1, value: null };
        m.current = g;
      } else g = m.current;
      m = l(
        function () {
          function b(T) {
            if (!x) {
              if (((x = !0), (k = T), (T = h(T)), f !== void 0 && g.hasValue)) {
                var w = g.value;
                if (f(w, T)) return (S = w);
              }
              return (S = T);
            }
            if (((w = S), r(k, T))) return w;
            var R = h(T);
            return f !== void 0 && f(w, R) ? ((k = T), w) : ((k = T), (S = R));
          }
          var x = !1,
            k,
            S,
            v = d === void 0 ? null : d;
          return [
            function () {
              return b(u());
            },
            v === null
              ? void 0
              : function () {
                  return b(v());
                }
          ];
        },
        [u, d, h, f]
      );
      var y = s(c, m[0], m[1]);
      return (
        o(
          function () {
            ((g.hasValue = !0), (g.value = y));
          },
          [y]
        ),
        a(y),
        y
      );
    }),
    ii
  );
}
var xa;
function ab() {
  return (xa || ((xa = 1), (si.exports = lb())), si.exports);
}
var cb = ab(),
  ub =
    (...n) =>
    e => {
      n.forEach(t => {
        typeof t == 'function' ? t(e) : t && (t.current = e);
      });
    },
  db = ({ contentComponent: n }) => {
    const e = pd.useSyncExternalStore(
      n.subscribe,
      n.getSnapshot,
      n.getServerSnapshot
    );
    return p.jsx(p.Fragment, { children: Object.values(e) });
  };
function hb() {
  const n = new Set();
  let e = {};
  return {
    subscribe(t) {
      return (
        n.add(t),
        () => {
          n.delete(t);
        }
      );
    },
    getSnapshot() {
      return e;
    },
    getServerSnapshot() {
      return e;
    },
    setRenderer(t, r) {
      ((e = { ...e, [t]: Yd.createPortal(r.reactElement, r.element, t) }),
        n.forEach(s => s()));
    },
    removeRenderer(t) {
      const r = { ...e };
      (delete r[t], (e = r), n.forEach(s => s()));
    }
  };
}
var fb = class extends Bt.Component {
    constructor(n) {
      (super(n), (this.editorContentRef = Bt.createRef()));
    }
    componentDidMount() {
      this.init();
    }
    componentDidUpdate() {
      this.init();
    }
    init() {
      var n;
      const e = this.props.editor;
      if (e && !e.isDestroyed && (n = e.view.dom) != null && n.parentNode) {
        if (e.contentComponent) return;
        const t = this.editorContentRef.current;
        (t.append(...e.view.dom.parentNode.childNodes),
          e.setOptions({ element: t }),
          (e.contentComponent = hb()),
          e.createNodeViews(),
          (e.isEditorContentInitialized = !0),
          this.forceUpdate());
      }
    }
    componentWillUnmount() {
      var n;
      const e = this.props.editor;
      if (e) {
        ((e.isEditorContentInitialized = !1),
          e.isDestroyed || e.view.setProps({ nodeViews: {} }),
          (e.contentComponent = null));
        try {
          if (!((n = e.view.dom) != null && n.parentNode)) return;
          const t = document.createElement('div');
          (t.append(...e.view.dom.parentNode.childNodes),
            e.setOptions({ element: t }));
        } catch {}
      }
    }
    render() {
      const { editor: n, innerRef: e, ...t } = this.props;
      return p.jsxs(p.Fragment, {
        children: [
          p.jsx('div', { ref: ub(e, this.editorContentRef), ...t }),
          (n == null ? void 0 : n.contentComponent) &&
            p.jsx(db, { contentComponent: n.contentComponent })
        ]
      });
    }
  },
  pb = O.forwardRef((n, e) => {
    const t = Bt.useMemo(
      () => Math.floor(Math.random() * 4294967295).toString(),
      [n.editor]
    );
    return Bt.createElement(fb, { key: t, innerRef: e, ...n });
  }),
  Hi = Bt.memo(pb),
  mb = typeof window < 'u' ? O.useLayoutEffect : O.useEffect,
  gb = class {
    constructor(n) {
      ((this.transactionNumber = 0),
        (this.lastTransactionNumber = 0),
        (this.subscribers = new Set()),
        (this.editor = n),
        (this.lastSnapshot = { editor: n, transactionNumber: 0 }),
        (this.getSnapshot = this.getSnapshot.bind(this)),
        (this.getServerSnapshot = this.getServerSnapshot.bind(this)),
        (this.watch = this.watch.bind(this)),
        (this.subscribe = this.subscribe.bind(this)));
    }
    getSnapshot() {
      return this.transactionNumber === this.lastTransactionNumber
        ? this.lastSnapshot
        : ((this.lastTransactionNumber = this.transactionNumber),
          (this.lastSnapshot = {
            editor: this.editor,
            transactionNumber: this.transactionNumber
          }),
          this.lastSnapshot);
    }
    getServerSnapshot() {
      return { editor: null, transactionNumber: 0 };
    }
    subscribe(n) {
      return (
        this.subscribers.add(n),
        () => {
          this.subscribers.delete(n);
        }
      );
    }
    watch(n) {
      if (((this.editor = n), this.editor)) {
        const e = () => {
            ((this.transactionNumber += 1), this.subscribers.forEach(r => r()));
          },
          t = this.editor;
        return (
          t.on('transaction', e),
          () => {
            t.off('transaction', e);
          }
        );
      }
    }
  };
function yb(n) {
  var e;
  const [t] = O.useState(() => new gb(n.editor)),
    r = cb.useSyncExternalStoreWithSelector(
      t.subscribe,
      t.getSnapshot,
      t.getServerSnapshot,
      n.selector,
      (e = n.equalityFn) != null ? e : ob
    );
  return (mb(() => t.watch(n.editor), [n.editor, t]), O.useDebugValue(r), r);
}
var bb = !1,
  Fi = typeof window > 'u',
  xb = Fi || !!(typeof window < 'u' && window.next),
  kb = class gd {
    constructor(e) {
      ((this.editor = null),
        (this.subscriptions = new Set()),
        (this.isComponentMounted = !1),
        (this.previousDeps = null),
        (this.instanceId = ''),
        (this.options = e),
        (this.subscriptions = new Set()),
        this.setEditor(this.getInitialEditor()),
        this.scheduleDestroy(),
        (this.getEditor = this.getEditor.bind(this)),
        (this.getServerSnapshot = this.getServerSnapshot.bind(this)),
        (this.subscribe = this.subscribe.bind(this)),
        (this.refreshEditorInstance = this.refreshEditorInstance.bind(this)),
        (this.scheduleDestroy = this.scheduleDestroy.bind(this)),
        (this.onRender = this.onRender.bind(this)),
        (this.createEditor = this.createEditor.bind(this)));
    }
    setEditor(e) {
      ((this.editor = e),
        (this.instanceId = Math.random().toString(36).slice(2, 9)),
        this.subscriptions.forEach(t => t()));
    }
    getInitialEditor() {
      return this.options.current.immediatelyRender === void 0
        ? Fi || xb
          ? null
          : this.createEditor()
        : (this.options.current.immediatelyRender,
          this.options.current.immediatelyRender ? this.createEditor() : null);
    }
    createEditor() {
      const e = {
        ...this.options.current,
        onBeforeCreate: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onBeforeCreate) == null
            ? void 0
            : i.call(s, ...r);
        },
        onBlur: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onBlur) == null
            ? void 0
            : i.call(s, ...r);
        },
        onCreate: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onCreate) == null
            ? void 0
            : i.call(s, ...r);
        },
        onDestroy: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onDestroy) == null
            ? void 0
            : i.call(s, ...r);
        },
        onFocus: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onFocus) == null
            ? void 0
            : i.call(s, ...r);
        },
        onSelectionUpdate: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onSelectionUpdate) == null
            ? void 0
            : i.call(s, ...r);
        },
        onTransaction: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onTransaction) == null
            ? void 0
            : i.call(s, ...r);
        },
        onUpdate: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onUpdate) == null
            ? void 0
            : i.call(s, ...r);
        },
        onContentError: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onContentError) == null
            ? void 0
            : i.call(s, ...r);
        },
        onDrop: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onDrop) == null
            ? void 0
            : i.call(s, ...r);
        },
        onPaste: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onPaste) == null
            ? void 0
            : i.call(s, ...r);
        },
        onDelete: (...r) => {
          var s, i;
          return (i = (s = this.options.current).onDelete) == null
            ? void 0
            : i.call(s, ...r);
        }
      };
      return new B0(e);
    }
    getEditor() {
      return this.editor;
    }
    getServerSnapshot() {
      return null;
    }
    subscribe(e) {
      return (
        this.subscriptions.add(e),
        () => {
          this.subscriptions.delete(e);
        }
      );
    }
    static compareOptions(e, t) {
      return Object.keys(e).every(r =>
        [
          'onCreate',
          'onBeforeCreate',
          'onDestroy',
          'onUpdate',
          'onTransaction',
          'onFocus',
          'onBlur',
          'onSelectionUpdate',
          'onContentError',
          'onDrop',
          'onPaste'
        ].includes(r)
          ? !0
          : r === 'extensions' && e.extensions && t.extensions
            ? e.extensions.length !== t.extensions.length
              ? !1
              : e.extensions.every((s, i) => {
                  var o;
                  return s === ((o = t.extensions) == null ? void 0 : o[i]);
                })
            : e[r] === t[r]
      );
    }
    onRender(e) {
      return () => (
        (this.isComponentMounted = !0),
        clearTimeout(this.scheduledDestructionTimeout),
        this.editor && !this.editor.isDestroyed && e.length === 0
          ? gd.compareOptions(this.options.current, this.editor.options) ||
            this.editor.setOptions({
              ...this.options.current,
              editable: this.editor.isEditable
            })
          : this.refreshEditorInstance(e),
        () => {
          ((this.isComponentMounted = !1), this.scheduleDestroy());
        }
      );
    }
    refreshEditorInstance(e) {
      if (this.editor && !this.editor.isDestroyed) {
        if (this.previousDeps === null) {
          this.previousDeps = e;
          return;
        }
        if (
          this.previousDeps.length === e.length &&
          this.previousDeps.every((r, s) => r === e[s])
        )
          return;
      }
      (this.editor && !this.editor.isDestroyed && this.editor.destroy(),
        this.setEditor(this.createEditor()),
        (this.previousDeps = e));
    }
    scheduleDestroy() {
      const e = this.instanceId,
        t = this.editor;
      this.scheduledDestructionTimeout = setTimeout(() => {
        if (this.isComponentMounted && this.instanceId === e) {
          t && t.setOptions(this.options.current);
          return;
        }
        t &&
          !t.isDestroyed &&
          (t.destroy(), this.instanceId === e && this.setEditor(null));
      }, 1);
    }
  };
function Cb(n = {}, e = []) {
  const t = O.useRef(n);
  t.current = n;
  const [r] = O.useState(() => new kb(t)),
    s = pd.useSyncExternalStore(r.subscribe, r.getEditor, r.getServerSnapshot);
  return (
    O.useDebugValue(s),
    O.useEffect(r.onRender(e)),
    yb({
      editor: s,
      selector: ({ transactionNumber: i }) =>
        n.shouldRerenderOnTransaction === !1 ||
        n.shouldRerenderOnTransaction === void 0
          ? null
          : n.immediatelyRender && i === 0
            ? 0
            : i + 1
    }),
    s
  );
}
var yd = O.createContext({ editor: null });
yd.Consumer;
var Sb = O.createContext({
    onDragStart: () => {},
    nodeViewContentChildren: void 0,
    nodeViewContentRef: () => {}
  }),
  vb = () => O.useContext(Sb);
Bt.forwardRef((n, e) => {
  const { onDragStart: t } = vb(),
    r = n.as || 'div';
  return p.jsx(r, {
    ...n,
    ref: e,
    'data-node-view-wrapper': '',
    onDragStart: t,
    style: { whiteSpace: 'normal', ...n.style }
  });
});
Bt.createContext({ markViewContentRef: () => {} });
var jo = O.createContext({
  get editor() {
    throw new Error('useTiptap must be used within a <Tiptap> provider');
  }
});
jo.displayName = 'TiptapContext';
var Mb = () => O.useContext(jo);
function bd({ editor: n, instance: e, children: t }) {
  const r = n ?? e;
  if (!r)
    throw new Error(
      'Tiptap: An editor instance is required. Pass a non-null `editor` prop.'
    );
  const s = O.useMemo(() => ({ editor: r }), [r]),
    i = O.useMemo(() => ({ editor: r }), [r]);
  return p.jsx(yd.Provider, {
    value: i,
    children: p.jsx(jo.Provider, { value: s, children: t })
  });
}
bd.displayName = 'Tiptap';
function xd({ ...n }) {
  const { editor: e } = Mb();
  return p.jsx(Hi, { editor: e, ...n });
}
xd.displayName = 'Tiptap.Content';
Object.assign(bd, { Content: xd });
const Bo = qe((n, e) => {
  const t = le('RichTextEditorContent', null, n),
    { classNames: r, className: s, style: i, styles: o, vars: l, ...a } = t,
    c = Je();
  return c.withTypographyStyles
    ? p.jsx(Xi, {
        ...c.getStyles('Typography', {
          className: s,
          style: i,
          styles: o,
          classNames: r
        }),
        unstyled: c.unstyled,
        ref: e,
        children: p.jsx(be, {
          component: Hi,
          editor: c.editor,
          ...c.getStyles('content', { classNames: r, styles: o }),
          ...a
        })
      })
    : p.jsx(be, {
        component: Hi,
        editor: c.editor,
        ...c.getStyles('content', {
          classNames: r,
          styles: o,
          className: s,
          style: i
        }),
        ...a
      });
});
Bo.classes = Ut;
Bo.displayName = '@mantine/tiptap/RichTextEditorContent';
function $(n) {
  return p.jsx('svg', {
    ...n,
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    strokeWidth: '1.5',
    stroke: 'currentColor',
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  });
}
function wb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M7 5h6a3.5 3.5 0 0 1 0 7h-6z' }),
      p.jsx('path', { d: 'M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7' })
    ]
  });
}
function Tb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M11 5l6 0' }),
      p.jsx('path', { d: 'M7 19l6 0' }),
      p.jsx('path', { d: 'M14 5l-4 14' })
    ]
  });
}
function Eb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M7 5v5a5 5 0 0 0 10 0v-5' }),
      p.jsx('path', { d: 'M5 19h14' })
    ]
  });
}
function Ab(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M5 12l14 0' }),
      p.jsx('path', {
        d: 'M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5'
      })
    ]
  });
}
function Nb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M17 15l4 4m0 -4l-4 4' }),
      p.jsx('path', { d: 'M7 6v-1h11v1' }),
      p.jsx('path', { d: 'M7 19l4 0' }),
      p.jsx('path', { d: 'M13 5l-4 14' })
    ]
  });
}
function Ob(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M19 18v-8l-2 2' }),
      p.jsx('path', { d: 'M4 6v12' }),
      p.jsx('path', { d: 'M12 6v12' }),
      p.jsx('path', { d: 'M11 18h2' }),
      p.jsx('path', { d: 'M3 18h2' }),
      p.jsx('path', { d: 'M4 12h8' }),
      p.jsx('path', { d: 'M3 6h2' }),
      p.jsx('path', { d: 'M11 6h2' })
    ]
  });
}
function Ib(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', {
        d: 'M17 12a2 2 0 1 1 4 0c0 .591 -.417 1.318 -.816 1.858l-3.184 4.143l4 0'
      }),
      p.jsx('path', { d: 'M4 6v12' }),
      p.jsx('path', { d: 'M12 6v12' }),
      p.jsx('path', { d: 'M11 18h2' }),
      p.jsx('path', { d: 'M3 18h2' }),
      p.jsx('path', { d: 'M4 12h8' }),
      p.jsx('path', { d: 'M3 6h2' }),
      p.jsx('path', { d: 'M11 6h2' })
    ]
  });
}
function Rb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M19 14a2 2 0 1 0 -2 -2' }),
      p.jsx('path', { d: 'M17 16a2 2 0 1 0 2 -2' }),
      p.jsx('path', { d: 'M4 6v12' }),
      p.jsx('path', { d: 'M12 6v12' }),
      p.jsx('path', { d: 'M11 18h2' }),
      p.jsx('path', { d: 'M3 18h2' }),
      p.jsx('path', { d: 'M4 12h8' }),
      p.jsx('path', { d: 'M3 6h2' }),
      p.jsx('path', { d: 'M11 6h2' })
    ]
  });
}
function Lb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M20 18v-8l-4 6h5' }),
      p.jsx('path', { d: 'M4 6v12' }),
      p.jsx('path', { d: 'M12 6v12' }),
      p.jsx('path', { d: 'M11 18h2' }),
      p.jsx('path', { d: 'M3 18h2' }),
      p.jsx('path', { d: 'M4 12h8' }),
      p.jsx('path', { d: 'M3 6h2' }),
      p.jsx('path', { d: 'M11 6h2' })
    ]
  });
}
function Db(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M17 18h2a2 2 0 1 0 0 -4h-2v-4h4' }),
      p.jsx('path', { d: 'M4 6v12' }),
      p.jsx('path', { d: 'M12 6v12' }),
      p.jsx('path', { d: 'M11 18h2' }),
      p.jsx('path', { d: 'M3 18h2' }),
      p.jsx('path', { d: 'M4 12h8' }),
      p.jsx('path', { d: 'M3 6h2' }),
      p.jsx('path', { d: 'M11 6h2' })
    ]
  });
}
function Pb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M19 14a2 2 0 1 0 0 4a2 2 0 0 0 0 -4z' }),
      p.jsx('path', { d: 'M21 12a2 2 0 1 0 -4 0v4' }),
      p.jsx('path', { d: 'M4 6v12' }),
      p.jsx('path', { d: 'M12 6v12' }),
      p.jsx('path', { d: 'M11 18h2' }),
      p.jsx('path', { d: 'M3 18h2' }),
      p.jsx('path', { d: 'M4 12h8' }),
      p.jsx('path', { d: 'M3 6h2' }),
      p.jsx('path', { d: 'M11 6h2' })
    ]
  });
}
function jb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M9 6l11 0' }),
      p.jsx('path', { d: 'M9 12l11 0' }),
      p.jsx('path', { d: 'M9 18l11 0' }),
      p.jsx('path', { d: 'M5 6l0 .01' }),
      p.jsx('path', { d: 'M5 12l0 .01' }),
      p.jsx('path', { d: 'M5 18l0 .01' })
    ]
  });
}
function Bb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M11 6h9' }),
      p.jsx('path', { d: 'M11 12h9' }),
      p.jsx('path', { d: 'M12 18h8' }),
      p.jsx('path', { d: 'M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4' }),
      p.jsx('path', { d: 'M6 10v-6l-2 2' })
    ]
  });
}
function zb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M17 22v-2' }),
      p.jsx('path', { d: 'M9 15l6 -6' }),
      p.jsx('path', { d: 'M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464' }),
      p.jsx('path', {
        d: 'M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463'
      }),
      p.jsx('path', { d: 'M20 17h2' }),
      p.jsx('path', { d: 'M2 7h2' }),
      p.jsx('path', { d: 'M7 2v2' })
    ]
  });
}
function $b(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M6 15h15' }),
      p.jsx('path', { d: 'M21 19h-15' }),
      p.jsx('path', { d: 'M15 11h6' }),
      p.jsx('path', { d: 'M21 7h-6' }),
      p.jsx('path', { d: 'M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2' }),
      p.jsx('path', { d: 'M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2' })
    ]
  });
}
function Hb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M4 6l16 0' }),
      p.jsx('path', { d: 'M4 12l10 0' }),
      p.jsx('path', { d: 'M4 18l14 0' })
    ]
  });
}
function Fb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M4 6l16 0' }),
      p.jsx('path', { d: 'M10 12l10 0' }),
      p.jsx('path', { d: 'M6 18l14 0' })
    ]
  });
}
function _b(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M4 6l16 0' }),
      p.jsx('path', { d: 'M8 12l8 0' }),
      p.jsx('path', { d: 'M6 18l12 0' })
    ]
  });
}
function Vb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M4 6l16 0' }),
      p.jsx('path', { d: 'M4 12l16 0' }),
      p.jsx('path', { d: 'M4 18l12 0' })
    ]
  });
}
function Wb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M5 7l8 10m-8 0l8 -10' }),
      p.jsx('path', { d: 'M21 20h-4l3.5 -4a1.73 1.73 0 0 0 -3.5 -2' })
    ]
  });
}
function Ub(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M5 7l8 10m-8 0l8 -10' }),
      p.jsx('path', { d: 'M21 11h-4l3.5 -4a1.73 1.73 0 0 0 -3.5 -2' })
    ]
  });
}
function kd(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M7 8l-4 4l4 4' }),
      p.jsx('path', { d: 'M17 8l4 4l-4 4' }),
      p.jsx('path', { d: 'M14 4l-4 16' })
    ]
  });
}
function qb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', {
        d: 'M3 19h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4'
      }),
      p.jsx('path', { d: 'M12.5 5.5l4 4' }),
      p.jsx('path', { d: 'M4.5 13.5l4 4' }),
      p.jsx('path', { d: 'M21 15v4h-8l4 -4z' })
    ]
  });
}
function Kb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M5 12h2' }),
      p.jsx('path', { d: 'M17 12h2' }),
      p.jsx('path', { d: 'M11 12h2' })
    ]
  });
}
function Cd(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', {
        d: 'M20.042 16.045a9 9 0 0 0 -12.087 -12.087m-2.318 1.677a9 9 0 1 0 12.725 12.73'
      }),
      p.jsx('path', { d: 'M3 3l18 18' })
    ]
  });
}
function Jb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M11 7l6 6' }),
      p.jsx('path', {
        d: 'M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z'
      })
    ]
  });
}
function Gb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M18 6l-12 12' }),
      p.jsx('path', { d: 'M6 6l12 12' })
    ]
  });
}
function Yb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', {
        d: 'M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25'
      }),
      p.jsx('path', { d: 'M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' }),
      p.jsx('path', { d: 'M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' }),
      p.jsx('path', { d: 'M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' })
    ]
  });
}
function Xb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M5 12l5 5l10 -10' })
    ]
  });
}
function Qb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M9 15l6 -6' }),
      p.jsx('path', { d: 'M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464' }),
      p.jsx('path', {
        d: 'M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463'
      })
    ]
  });
}
function Zb(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', {
        d: 'M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6'
      }),
      p.jsx('path', { d: 'M11 13l9 -9' }),
      p.jsx('path', { d: 'M15 4h5v5' })
    ]
  });
}
function e1(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M9 14l-4 -4l4 -4' }),
      p.jsx('path', { d: 'M5 10h11a4 4 0 1 1 0 8h-1' })
    ]
  });
}
function t1(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M15 14l4 -4l-4 -4' }),
      p.jsx('path', { d: 'M19 10h-11a4 4 0 1 0 0 8h1' })
    ]
  });
}
function n1(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M3.5 5.5l1.5 1.5l2.5 -2.5' }),
      p.jsx('path', { d: 'M3.5 11.5l1.5 1.5l2.5 -2.5' }),
      p.jsx('path', { d: 'M3.5 17.5l1.5 1.5l2.5 -2.5' }),
      p.jsx('path', { d: 'M11 6l9 0' }),
      p.jsx('path', { d: 'M11 12l9 0' }),
      p.jsx('path', { d: 'M11 18l9 0' })
    ]
  });
}
function r1(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M20 6l-11 0' }),
      p.jsx('path', { d: 'M20 12l-7 0' }),
      p.jsx('path', { d: 'M20 18l-11 0' }),
      p.jsx('path', { d: 'M4 8l4 4l-4 4' })
    ]
  });
}
function s1(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', { d: 'M20 6l-7 0' }),
      p.jsx('path', { d: 'M20 12l-9 0' }),
      p.jsx('path', { d: 'M20 18l-7 0' }),
      p.jsx('path', { d: 'M8 8l-4 4l4 4' })
    ]
  });
}
function i1(n) {
  return p.jsxs($, {
    ...n,
    children: [
      p.jsx('path', { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' }),
      p.jsx('path', {
        d: `M19 3v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914
           a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18
           a1 1 0 0 1 1 1Z`
      }),
      p.jsx('path', { d: 'M10 11l-2 2 2 2' }),
      p.jsx('path', { d: 'M14 11l2 2-2 2' })
    ]
  });
}
const o1 = { interactive: !0 },
  Kt = qe((n, e) => {
    const t = le('RichTextEditorControl', o1, n),
      {
        classNames: r,
        className: s,
        style: i,
        styles: o,
        vars: l,
        interactive: a,
        active: c,
        onMouseDown: u,
        disabled: d,
        ...h
      } = t,
      f = Je();
    return p.jsx(Ia, {
      ...h,
      ...f.getStyles('control', {
        className: s,
        style: i,
        classNames: r,
        styles: o
      }),
      disabled: d,
      'data-rich-text-editor-control': !0,
      tabIndex: a ? 0 : -1,
      'data-interactive': a || void 0,
      'data-disabled': d || void 0,
      'data-active': c || void 0,
      'aria-pressed': (c && a) || void 0,
      'aria-hidden': !a || void 0,
      ref: e,
      unstyled: f.unstyled,
      variant: f.variant || 'default',
      onMouseDown: m => {
        (m.preventDefault(), u == null || u(m));
      }
    });
  });
Kt.classes = Ut;
Kt.displayName = '@mantine/tiptap/RichTextEditorControl';
const zo = O.forwardRef(({ className: n, icon: e, ...t }, r) => {
  const s = Je();
  return p.jsx(Kt, {
    ref: r,
    ...t,
    children: p.jsx(e, { ...s.getStyles('controlIcon') })
  });
});
zo.displayName = '@mantine/tiptap/RichTextEditorControlBase';
function H({ label: n, isActive: e, operation: t, icon: r, isDisabled: s }) {
  const i = O.forwardRef((o, l) => {
    const { editor: a, labels: c } = Je(),
      u = c[n];
    return p.jsx(zo, {
      'aria-label': u,
      title: u,
      active:
        e != null && e.name
          ? a == null
            ? void 0
            : a.isActive(e.name, e.attributes)
          : !1,
      ref: l,
      icon: o.icon || r,
      disabled: (s == null ? void 0 : s(a)) || !1,
      ...o,
      onClick: () =>
        a == null ? void 0 : a.chain().focus()[t.name](t.attributes).run()
    });
  });
  return ((i.displayName = `@mantine/tiptap/${n}`), i);
}
const l1 = H({
    label: 'boldControlLabel',
    icon: n => p.jsx(wb, { ...n }),
    isActive: { name: 'bold' },
    operation: { name: 'toggleBold' }
  }),
  a1 = H({
    label: 'italicControlLabel',
    icon: n => p.jsx(Tb, { ...n }),
    isActive: { name: 'italic' },
    operation: { name: 'toggleItalic' }
  }),
  c1 = H({
    label: 'underlineControlLabel',
    icon: n => p.jsx(Eb, { ...n }),
    isActive: { name: 'underline' },
    operation: { name: 'toggleUnderline' }
  }),
  u1 = H({
    label: 'strikeControlLabel',
    icon: n => p.jsx(Ab, { ...n }),
    isActive: { name: 'strike' },
    operation: { name: 'toggleStrike' }
  }),
  d1 = H({
    label: 'clearFormattingControlLabel',
    icon: n => p.jsx(Nb, { ...n }),
    operation: { name: 'unsetAllMarks' }
  }),
  h1 = H({
    label: 'unlinkControlLabel',
    icon: n => p.jsx(zb, { ...n }),
    operation: { name: 'unsetLink' }
  }),
  f1 = H({
    label: 'bulletListControlLabel',
    icon: n => p.jsx(jb, { ...n }),
    isActive: { name: 'bulletList' },
    operation: { name: 'toggleBulletList' }
  }),
  p1 = H({
    label: 'orderedListControlLabel',
    icon: n => p.jsx(Bb, { ...n }),
    isActive: { name: 'orderedList' },
    operation: { name: 'toggleOrderedList' }
  }),
  m1 = H({
    label: 'h1ControlLabel',
    icon: n => p.jsx(Ob, { ...n }),
    isActive: { name: 'heading', attributes: { level: 1 } },
    operation: { name: 'toggleHeading', attributes: { level: 1 } }
  }),
  g1 = H({
    label: 'h2ControlLabel',
    icon: n => p.jsx(Ib, { ...n }),
    isActive: { name: 'heading', attributes: { level: 2 } },
    operation: { name: 'toggleHeading', attributes: { level: 2 } }
  }),
  y1 = H({
    label: 'h3ControlLabel',
    icon: n => p.jsx(Rb, { ...n }),
    isActive: { name: 'heading', attributes: { level: 3 } },
    operation: { name: 'toggleHeading', attributes: { level: 3 } }
  }),
  b1 = H({
    label: 'h4ControlLabel',
    icon: n => p.jsx(Lb, { ...n }),
    isActive: { name: 'heading', attributes: { level: 4 } },
    operation: { name: 'toggleHeading', attributes: { level: 4 } }
  }),
  x1 = H({
    label: 'h5ControlLabel',
    icon: n => p.jsx(Db, { ...n }),
    isActive: { name: 'heading', attributes: { level: 5 } },
    operation: { name: 'toggleHeading', attributes: { level: 5 } }
  }),
  k1 = H({
    label: 'h6ControlLabel',
    icon: n => p.jsx(Pb, { ...n }),
    isActive: { name: 'heading', attributes: { level: 6 } },
    operation: { name: 'toggleHeading', attributes: { level: 6 } }
  }),
  C1 = H({
    label: 'blockquoteControlLabel',
    icon: n => p.jsx($b, { ...n }),
    isActive: { name: 'blockquote' },
    operation: { name: 'toggleBlockquote' }
  }),
  S1 = H({
    label: 'alignLeftControlLabel',
    icon: n => p.jsx(Hb, { ...n }),
    operation: { name: 'setTextAlign', attributes: 'left' }
  }),
  v1 = H({
    label: 'alignRightControlLabel',
    icon: n => p.jsx(Fb, { ...n }),
    operation: { name: 'setTextAlign', attributes: 'right' }
  }),
  M1 = H({
    label: 'alignCenterControlLabel',
    icon: n => p.jsx(_b, { ...n }),
    operation: { name: 'setTextAlign', attributes: 'center' }
  }),
  w1 = H({
    label: 'alignJustifyControlLabel',
    icon: n => p.jsx(Vb, { ...n }),
    operation: { name: 'setTextAlign', attributes: 'justify' }
  }),
  T1 = H({
    label: 'subscriptControlLabel',
    icon: n => p.jsx(Wb, { ...n }),
    isActive: { name: 'subscript' },
    operation: { name: 'toggleSubscript' }
  }),
  E1 = H({
    label: 'superscriptControlLabel',
    icon: n => p.jsx(Ub, { ...n }),
    isActive: { name: 'superscript' },
    operation: { name: 'toggleSuperscript' }
  }),
  A1 = H({
    label: 'codeControlLabel',
    icon: n => p.jsx(kd, { ...n }),
    isActive: { name: 'code' },
    operation: { name: 'toggleCode' }
  }),
  N1 = H({
    label: 'codeBlockControlLabel',
    icon: n => p.jsx(kd, { ...n }),
    isActive: { name: 'codeBlock' },
    operation: { name: 'toggleCodeBlock' }
  }),
  O1 = H({
    label: 'highlightControlLabel',
    icon: n => p.jsx(qb, { ...n }),
    isActive: { name: 'highlight' },
    operation: { name: 'toggleHighlight' }
  }),
  I1 = H({
    label: 'hrControlLabel',
    icon: n => p.jsx(Kb, { ...n }),
    operation: { name: 'setHorizontalRule' }
  }),
  R1 = H({
    label: 'unsetColorControlLabel',
    icon: n => p.jsx(Cd, { ...n }),
    operation: { name: 'unsetColor' }
  }),
  L1 = H({
    label: 'undoControlLabel',
    icon: n => p.jsx(e1, { ...n }),
    isDisabled: n => !(n != null && n.can().undo()),
    operation: { name: 'undo' }
  }),
  D1 = H({
    label: 'redoControlLabel',
    icon: n => p.jsx(t1, { ...n }),
    isDisabled: n => !(n != null && n.can().redo()),
    operation: { name: 'redo' }
  }),
  P1 = H({
    label: 'tasksControlLabel',
    icon: n => p.jsx(n1, { ...n }),
    isActive: { name: 'taskList' },
    operation: { name: 'toggleTaskList' }
  }),
  j1 = H({
    label: 'tasksSinkLabel',
    icon: n => p.jsx(r1, { ...n }),
    operation: { name: 'sinkListItem', attributes: 'taskItem' },
    isDisabled: n => !(n != null && n.can().sinkListItem('taskItem'))
  }),
  B1 = H({
    label: 'tasksLiftLabel',
    icon: n => p.jsx(s1, { ...n }),
    operation: { name: 'liftListItem', attributes: 'taskItem' },
    isDisabled: n => !(n != null && n.can().liftListItem('taskItem'))
  }),
  z1 = n => p.jsx(Qb, { ...n }),
  $o = qe((n, e) => {
    var J;
    const t = le('RichTextEditorLinkControl', null, n),
      {
        classNames: r,
        className: s,
        style: i,
        styles: o,
        vars: l,
        icon: a,
        popoverProps: c,
        disableTooltips: u,
        initialExternal: d,
        ...h
      } = t,
      f = Je(),
      m = { classNames: r, styles: o },
      [g, y] = xh(''),
      [b, x] = O.useState(d),
      [k, { open: S, close: v }] = ja(!1),
      T = () => {
        var j;
        S();
        const L = (j = f.editor) == null ? void 0 : j.getAttributes('link');
        (y((L == null ? void 0 : L.href) || ''),
          x(
            L != null && L.href
              ? (L == null ? void 0 : L.target) === '_blank'
              : d
          ));
      },
      w = () => {
        (v(), y(''), x(d));
      },
      R = () => {
        var L, j;
        (w(),
          g === ''
            ? (L = f.editor) == null ||
              L.chain().focus().extendMarkRange('link').unsetLink().run()
            : (j = f.editor) == null ||
              j
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: g, target: b ? '_blank' : null })
                .run());
      },
      P = L => {
        L.key === 'Enter' && (L.preventDefault(), R());
      };
    Xd('edit-link', T, !1);
    const { resolvedClassNames: V, resolvedStyles: K } = La({
      classNames: r,
      styles: o,
      props: t
    });
    return p.jsxs(on, {
      trapFocus: !0,
      shadow: 'md',
      withinPortal: !0,
      opened: k,
      onChange: L => !L && w(),
      offset: -44,
      zIndex: 1e4,
      ...c,
      children: [
        p.jsx(on.Target, {
          children: p.jsx(zo, {
            icon: a || z1,
            ...h,
            'aria-label': f.labels.linkControlLabel,
            title: f.labels.linkControlLabel,
            onClick: T,
            active: (J = f.editor) == null ? void 0 : J.isActive('link'),
            ref: e,
            classNames: V,
            styles: K,
            className: s,
            style: i,
            variant: f.variant
          })
        }),
        p.jsx(on.Dropdown, {
          ...f.getStyles('linkEditorDropdown', m),
          children: p.jsxs('div', {
            ...f.getStyles('linkEditor', m),
            children: [
              p.jsx(Ra, {
                placeholder: f.labels.linkEditorInputPlaceholder,
                'aria-label': f.labels.linkEditorInputLabel,
                type: 'url',
                value: g,
                onChange: y,
                classNames: {
                  input: f.getStyles('linkEditorInput', m).className
                },
                onKeyDown: P,
                rightSection: p.jsx(Ba, {
                  label: b
                    ? f.labels.linkEditorExternalLink
                    : f.labels.linkEditorInternalLink,
                  events: { hover: !0, focus: !0, touch: !0 },
                  withinPortal: !0,
                  withArrow: !0,
                  disabled: u,
                  zIndex: 1e4,
                  children: p.jsx(Ia, {
                    onClick: () => x(L => !L),
                    'data-active': b || void 0,
                    ...f.getStyles('linkEditorExternalControl', m),
                    children: p.jsx(Zb, {
                      style: { width: W(14), height: W(14) }
                    })
                  })
                })
              }),
              p.jsx(Qd, {
                variant: 'default',
                onClick: R,
                ...f.getStyles('linkEditorSave', m),
                children: f.labels.linkEditorSave
              })
            ]
          })
        })
      ]
    });
  });
$o.classes = Ut;
$o.displayName = '@mantine/tiptap/RichTextEditorLinkControl';
const Sd = O.forwardRef((n, e) => {
  const {
      popoverProps: t,
      colors: r,
      colorPickerProps: s,
      ...i
    } = le('RichTextEditorColorPickerControl', null, n),
    { editor: o, labels: l, getStyles: a, variant: c } = Je(),
    [u, { toggle: d, close: h }] = ja(!1),
    [f, m] = O.useState('palette'),
    g =
      (o == null ? void 0 : o.getAttributes('textStyle').color) ||
      'var(--mantine-color-text)',
    y = (k, S = !0) => {
      ((o == null ? void 0 : o.chain()).focus().setColor(k).run(), S && h());
    },
    b = () => {
      ((o == null ? void 0 : o.chain()).focus().unsetColor().run(), h());
    },
    x = r.map((k, S) =>
      p.jsx(
        zt,
        {
          component: 'button',
          color: k,
          onClick: () => y(k),
          size: 26,
          radius: 'xs',
          style: { cursor: 'pointer' },
          title: l.colorPickerColorLabel(k),
          'aria-label': l.colorPickerColorLabel(k)
        },
        S
      )
    );
  return p.jsxs(on, {
    opened: u,
    withinPortal: !0,
    trapFocus: !0,
    onChange: k => !k && h(),
    ...t,
    children: [
      p.jsx(on.Target, {
        children: p.jsx(Kt, {
          ...i,
          variant: c,
          'aria-label': l.colorPickerControlLabel,
          title: l.colorPickerControlLabel,
          ref: e,
          onClick: d,
          children: p.jsx(zt, { color: g, size: 14 })
        })
      }),
      p.jsxs(on.Dropdown, {
        ...a('linkEditorDropdown'),
        children: [
          f === 'palette' && p.jsx(ph, { cols: 7, spacing: 2, children: x }),
          f === 'colorPicker' &&
            p.jsx(Gi, { defaultValue: g, onChange: k => y(k, !1), ...s }),
          p.jsx(Ba.Group, {
            closeDelay: 200,
            children: p.jsxs(Zt, {
              justify: 'flex-end',
              gap: 'xs',
              mt: 'sm',
              children: [
                f === 'palette' &&
                  p.jsx(en, {
                    variant: 'default',
                    onClick: h,
                    title: l.colorPickerCancel,
                    'aria-label': l.colorPickerCancel,
                    children: p.jsx(Gb, {
                      style: { width: W(16), height: W(16) }
                    })
                  }),
                p.jsx(en, {
                  variant: 'default',
                  onClick: b,
                  title: l.colorPickerClear,
                  'aria-label': l.colorPickerClear,
                  children: p.jsx(Cd, {
                    style: { width: W(16), height: W(16) }
                  })
                }),
                f === 'palette'
                  ? p.jsx(en, {
                      variant: 'default',
                      onClick: () => m('colorPicker'),
                      title: l.colorPickerColorPicker,
                      'aria-label': l.colorPickerColorPicker,
                      children: p.jsx(Jb, {
                        style: { width: W(16), height: W(16) }
                      })
                    })
                  : p.jsx(en, {
                      variant: 'default',
                      onClick: () => m('palette'),
                      'aria-label': l.colorPickerPalette,
                      title: l.colorPickerPalette,
                      children: p.jsx(Yb, {
                        style: { width: W(16), height: W(16) }
                      })
                    }),
                f === 'colorPicker' &&
                  p.jsx(en, {
                    variant: 'default',
                    onClick: h,
                    title: l.colorPickerSave,
                    'aria-label': l.colorPickerSave,
                    children: p.jsx(Xb, {
                      style: { width: W(16), height: W(16) }
                    })
                  })
              ]
            })
          })
        ]
      })
    ]
  });
});
Sd.displayName = '@mantine/tiptap/ColorPickerControl';
const vd = O.forwardRef((n, e) => {
  const { color: t, ...r } = le('RichTextEditorColorControl', null, n),
    { editor: s, labels: i, variant: o } = Je(),
    l = (s == null ? void 0 : s.getAttributes('textStyle').color) || null,
    a = i.colorControlLabel(t);
  return p.jsx(Kt, {
    ...r,
    variant: o,
    active: l === t,
    'aria-label': a,
    title: a,
    onClick: () => (s == null ? void 0 : s.chain()).focus().setColor(t).run(),
    ref: e,
    children: p.jsx(zt, { color: t, size: 14 })
  });
});
vd.displayName = '@mantine/tiptap/RichTextEditorColorControl';
const $1 = {},
  Md = O.forwardRef((n, e) => {
    const { ...t } = le('RichTextEditorSourceCodeControl', $1, n),
      { editor: r, labels: s, variant: i, onSourceCodeTextSwitch: o } = Je(),
      [l, a] = O.useState(!1),
      c = () => {
        l
          ? r == null || r.commands.setContent(r.getText(), { emitUpdate: !0 })
          : r == null ||
            r.commands.setContent(`<textarea>${r.getHTML()}</textarea>`);
        const u = !l;
        (a(u), o == null || o(u));
      };
    return p.jsx(Kt, {
      ...t,
      variant: i,
      active: l,
      'aria-label': s.sourceCodeControlLabel,
      title: s.sourceCodeControlLabel,
      onClick: () => c(),
      ref: e,
      children: p.jsx(i1, { style: { width: W(16), height: W(16) } })
    });
  });
Md.displayName = '@mantine/tiptap/RichTextEditorSourceCodeControl';
const Ho = qe((n, e) => {
  const t = le('RichTextEditorControlsGroup', null, n),
    {
      classNames: r,
      className: s,
      style: i,
      styles: o,
      vars: l,
      variant: a,
      ...c
    } = t,
    u = Je();
  return p.jsx(be, {
    ref: e,
    variant: a || u.variant,
    ...u.getStyles('controlsGroup', {
      className: s,
      style: i,
      styles: o,
      classNames: r
    }),
    ...c
  });
});
Ho.classes = Ut;
Ho.displayName = '@mantine/tiptap/RichTextEditorControlsGroup';
const Fo = qe((n, e) => {
  const t = le('RichTextEditorToolbar', null, n),
    {
      classNames: r,
      className: s,
      style: i,
      styles: o,
      vars: l,
      sticky: a,
      stickyOffset: c,
      mod: u,
      variant: d,
      ...h
    } = t,
    f = Je();
  return p.jsx(be, {
    ref: e,
    mod: [{ sticky: a }, u],
    variant: d || f.variant,
    ...f.getStyles('toolbar', {
      className: s,
      style: i,
      styles: o,
      classNames: r
    }),
    ...h,
    __vars: { '--rte-sticky-offset': W(c) }
  });
});
Fo.classes = Ut;
Fo.displayName = '@mantine/tiptap/RichTextEditorToolbar';
const H1 = {
    withCodeHighlightStyles: !0,
    withTypographyStyles: !0,
    variant: 'default'
  },
  E = qe((n, e) => {
    const t = le('RichTextEditor', H1, n),
      {
        classNames: r,
        className: s,
        style: i,
        styles: o,
        unstyled: l,
        vars: a,
        editor: c,
        withCodeHighlightStyles: u,
        withTypographyStyles: d,
        onSourceCodeTextSwitch: h,
        labels: f,
        children: m,
        variant: g,
        attributes: y,
        ...b
      } = t,
      x = Kn({
        name: 'RichTextEditor',
        classes: Ut,
        props: t,
        className: s,
        style: i,
        classNames: r,
        styles: o,
        unstyled: l,
        attributes: y,
        vars: a
      }),
      k = O.useMemo(() => ({ ...xy, ...f }), [f]);
    return p.jsx(ky, {
      value: {
        editor: c,
        getStyles: x,
        labels: k,
        withCodeHighlightStyles: u,
        withTypographyStyles: d,
        onSourceCodeTextSwitch: h,
        unstyled: l,
        variant: g
      },
      children: p.jsx(be, { ...x('root'), ...b, ref: e, children: m })
    });
  });
E.classes = Ut;
E.displayName = '@mantine/tiptap/RichTextEditor';
E.Content = Bo;
E.Control = Kt;
E.Toolbar = Fo;
E.ControlsGroup = Ho;
E.Bold = l1;
E.Italic = a1;
E.Strikethrough = u1;
E.Underline = c1;
E.ClearFormatting = d1;
E.H1 = m1;
E.H2 = g1;
E.H3 = y1;
E.H4 = b1;
E.H5 = x1;
E.H6 = k1;
E.BulletList = f1;
E.OrderedList = p1;
E.Link = $o;
E.Unlink = h1;
E.Blockquote = C1;
E.AlignLeft = S1;
E.AlignRight = v1;
E.AlignCenter = M1;
E.AlignJustify = w1;
E.Superscript = E1;
E.Subscript = T1;
E.Code = A1;
E.CodeBlock = N1;
E.ColorPicker = Sd;
E.Color = vd;
E.Highlight = O1;
E.Hr = I1;
E.UnsetColor = R1;
E.Undo = L1;
E.Redo = D1;
E.TaskList = P1;
E.TaskListSink = j1;
E.TaskListLift = B1;
E.SourceCode = Md;
var as = (n, e) => {
    if (n === 'slot') return 0;
    if (n instanceof Function) return n(e);
    const { children: t, ...r } = e ?? {};
    if (n === 'svg')
      throw new Error(
        'SVG elements are not supported in the JSX syntax, use the array syntax instead'
      );
    return [n, r, t];
  },
  F1 = /^\s*>\s$/,
  _1 = Ee.create({
    name: 'blockquote',
    addOptions() {
      return { HTMLAttributes: {} };
    },
    content: 'block+',
    group: 'block',
    defining: !0,
    parseHTML() {
      return [{ tag: 'blockquote' }];
    },
    renderHTML({ HTMLAttributes: n }) {
      return as('blockquote', {
        ...Y(this.options.HTMLAttributes, n),
        children: as('slot', {})
      });
    },
    parseMarkdown: (n, e) => {
      var t;
      const r = (t = e.parseBlockChildren) != null ? t : e.parseChildren;
      return e.createNode('blockquote', void 0, r(n.tokens || []));
    },
    renderMarkdown: (n, e) => {
      if (!n.content) return '';
      const t = '>',
        r = [];
      return (
        n.content.forEach((s, i) => {
          var o, l;
          const u = (
            (l = (o = e.renderChild) == null ? void 0 : o.call(e, s, i)) != null
              ? l
              : e.renderChildren([s])
          )
            .split(
              `
`
            )
            .map(d => (d.trim() === '' ? t : `${t} ${d}`));
          r.push(
            u.join(`
`)
          );
        }),
        r.join(`
${t}
`)
      );
    },
    addCommands() {
      return {
        setBlockquote:
          () =>
          ({ commands: n }) =>
            n.wrapIn(this.name),
        toggleBlockquote:
          () =>
          ({ commands: n }) =>
            n.toggleWrap(this.name),
        unsetBlockquote:
          () =>
          ({ commands: n }) =>
            n.lift(this.name)
      };
    },
    addKeyboardShortcuts() {
      return { 'Mod-Shift-b': () => this.editor.commands.toggleBlockquote() };
    },
    addInputRules() {
      return [pn({ find: F1, type: this.type })];
    }
  }),
  V1 = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/,
  W1 = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g,
  U1 = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/,
  q1 = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g,
  K1 = Ke.create({
    name: 'bold',
    addOptions() {
      return { HTMLAttributes: {} };
    },
    parseHTML() {
      return [
        { tag: 'strong' },
        { tag: 'b', getAttrs: n => n.style.fontWeight !== 'normal' && null },
        { style: 'font-weight=400', clearMark: n => n.type.name === this.name },
        {
          style: 'font-weight',
          getAttrs: n => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
        }
      ];
    },
    renderHTML({ HTMLAttributes: n }) {
      return as('strong', {
        ...Y(this.options.HTMLAttributes, n),
        children: as('slot', {})
      });
    },
    markdownTokenName: 'strong',
    parseMarkdown: (n, e) => e.applyMark('bold', e.parseInline(n.tokens || [])),
    markdownOptions: { htmlReopen: { open: '<strong>', close: '</strong>' } },
    renderMarkdown: (n, e) => `**${e.renderChildren(n)}**`,
    addCommands() {
      return {
        setBold:
          () =>
          ({ commands: n }) =>
            n.setMark(this.name),
        toggleBold:
          () =>
          ({ commands: n }) =>
            n.toggleMark(this.name),
        unsetBold:
          () =>
          ({ commands: n }) =>
            n.unsetMark(this.name)
      };
    },
    addKeyboardShortcuts() {
      return {
        'Mod-b': () => this.editor.commands.toggleBold(),
        'Mod-B': () => this.editor.commands.toggleBold()
      };
    },
    addInputRules() {
      return [
        Vt({ find: V1, type: this.type }),
        Vt({ find: U1, type: this.type })
      ];
    },
    addPasteRules() {
      return [
        Ct({ find: W1, type: this.type }),
        Ct({ find: q1, type: this.type })
      ];
    }
  }),
  J1 = /(^|[^`])`([^`]+)`(?!`)$/,
  G1 = /(^|[^`])`([^`]+)`(?!`)/g,
  Y1 = Ke.create({
    name: 'code',
    addOptions() {
      return { HTMLAttributes: {} };
    },
    excludes: '_',
    code: !0,
    exitable: !0,
    parseHTML() {
      return [{ tag: 'code' }];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['code', Y(this.options.HTMLAttributes, n), 0];
    },
    markdownTokenName: 'codespan',
    parseMarkdown: (n, e) =>
      e.applyMark('code', [{ type: 'text', text: n.text || '' }]),
    renderMarkdown: (n, e) =>
      n.content ? `\`${e.renderChildren(n.content)}\`` : '',
    addCommands() {
      return {
        setCode:
          () =>
          ({ commands: n }) =>
            n.setMark(this.name),
        toggleCode:
          () =>
          ({ commands: n }) =>
            n.toggleMark(this.name),
        unsetCode:
          () =>
          ({ commands: n }) =>
            n.unsetMark(this.name)
      };
    },
    addKeyboardShortcuts() {
      return { 'Mod-e': () => this.editor.commands.toggleCode() };
    },
    addInputRules() {
      return [Vt({ find: J1, type: this.type })];
    },
    addPasteRules() {
      return [Ct({ find: G1, type: this.type })];
    }
  }),
  oi = 4,
  X1 = /^```([a-z]+)?[\s\n]$/,
  Q1 = /^~~~([a-z]+)?[\s\n]$/,
  Z1 = Ee.create({
    name: 'codeBlock',
    addOptions() {
      return {
        languageClassPrefix: 'language-',
        exitOnTripleEnter: !0,
        exitOnArrowDown: !0,
        defaultLanguage: null,
        enableTabIndentation: !1,
        tabSize: oi,
        HTMLAttributes: {}
      };
    },
    content: 'text*',
    marks: '',
    group: 'block',
    code: !0,
    defining: !0,
    addAttributes() {
      return {
        language: {
          default: this.options.defaultLanguage,
          parseHTML: n => {
            var e;
            const { languageClassPrefix: t } = this.options;
            if (!t) return null;
            const i = [
              ...(((e = n.firstElementChild) == null ? void 0 : e.classList) ||
                [])
            ]
              .filter(o => o.startsWith(t))
              .map(o => o.replace(t, ''))[0];
            return i || null;
          },
          rendered: !1
        }
      };
    },
    parseHTML() {
      return [{ tag: 'pre', preserveWhitespace: 'full' }];
    },
    renderHTML({ node: n, HTMLAttributes: e }) {
      return [
        'pre',
        Y(this.options.HTMLAttributes, e),
        [
          'code',
          {
            class: n.attrs.language
              ? this.options.languageClassPrefix + n.attrs.language
              : null
          },
          0
        ]
      ];
    },
    markdownTokenName: 'code',
    parseMarkdown: (n, e) => {
      var t, r;
      return ((t = n.raw) == null ? void 0 : t.startsWith('```')) === !1 &&
        ((r = n.raw) == null ? void 0 : r.startsWith('~~~')) === !1 &&
        n.codeBlockStyle !== 'indented'
        ? []
        : e.createNode(
            'codeBlock',
            { language: n.lang || null },
            n.text ? [e.createTextNode(n.text)] : []
          );
    },
    renderMarkdown: (n, e) => {
      var t;
      let r = '';
      const s = ((t = n.attrs) == null ? void 0 : t.language) || '';
      return (
        n.content
          ? (r = [`\`\`\`${s}`, e.renderChildren(n.content), '```'].join(`
`))
          : (r = `\`\`\`${s}

\`\`\``),
        r
      );
    },
    addCommands() {
      return {
        setCodeBlock:
          n =>
          ({ commands: e }) =>
            e.setNode(this.name, n),
        toggleCodeBlock:
          n =>
          ({ commands: e }) =>
            e.toggleNode(this.name, 'paragraph', n)
      };
    },
    addKeyboardShortcuts() {
      return {
        'Mod-Alt-c': () => this.editor.commands.toggleCodeBlock(),
        Backspace: () => {
          const { empty: n, $anchor: e } = this.editor.state.selection,
            t = e.pos === 1;
          return !n || e.parent.type.name !== this.name
            ? !1
            : t || !e.parent.textContent.length
              ? this.editor.commands.clearNodes()
              : !1;
        },
        Tab: ({ editor: n }) => {
          var e;
          if (!this.options.enableTabIndentation) return !1;
          const t = (e = this.options.tabSize) != null ? e : oi,
            { state: r } = n,
            { selection: s } = r,
            { $from: i, empty: o } = s;
          if (i.parent.type !== this.type) return !1;
          const l = ' '.repeat(t);
          return o
            ? n.commands.insertContent(l)
            : n.commands.command(({ tr: a }) => {
                const { from: c, to: u } = s,
                  f = r.doc
                    .textBetween(
                      c,
                      u,
                      `
`,
                      `
`
                    )
                    .split(
                      `
`
                    )
                    .map(m => l + m).join(`
`);
                return (a.replaceWith(c, u, r.schema.text(f)), !0);
              });
        },
        'Shift-Tab': ({ editor: n }) => {
          var e;
          if (!this.options.enableTabIndentation) return !1;
          const t = (e = this.options.tabSize) != null ? e : oi,
            { state: r } = n,
            { selection: s } = r,
            { $from: i, empty: o } = s;
          return i.parent.type !== this.type
            ? !1
            : o
              ? n.commands.command(({ tr: l }) => {
                  var a;
                  const { pos: c } = i,
                    u = i.start(),
                    d = i.end(),
                    f = r.doc.textBetween(
                      u,
                      d,
                      `
`,
                      `
`
                    ).split(`
`);
                  let m = 0,
                    g = 0;
                  const y = c - u;
                  for (let T = 0; T < f.length; T += 1) {
                    if (g + f[T].length >= y) {
                      m = T;
                      break;
                    }
                    g += f[T].length + 1;
                  }
                  const x =
                      ((a = f[m].match(/^ */)) == null ? void 0 : a[0]) || '',
                    k = Math.min(x.length, t);
                  if (k === 0) return !0;
                  let S = u;
                  for (let T = 0; T < m; T += 1) S += f[T].length + 1;
                  return (
                    l.delete(S, S + k),
                    c - S <= k && l.setSelection(D.create(l.doc, S)),
                    !0
                  );
                })
              : n.commands.command(({ tr: l }) => {
                  const { from: a, to: c } = s,
                    h = r.doc
                      .textBetween(
                        a,
                        c,
                        `
`,
                        `
`
                      )
                      .split(
                        `
`
                      )
                      .map(f => {
                        var m;
                        const g =
                            ((m = f.match(/^ */)) == null ? void 0 : m[0]) ||
                            '',
                          y = Math.min(g.length, t);
                        return f.slice(y);
                      }).join(`
`);
                  return (l.replaceWith(a, c, r.schema.text(h)), !0);
                });
        },
        Enter: ({ editor: n }) => {
          if (!this.options.exitOnTripleEnter) return !1;
          const { state: e } = n,
            { selection: t } = e,
            { $from: r, empty: s } = t;
          if (!s || r.parent.type !== this.type) return !1;
          const i = r.parentOffset === r.parent.nodeSize - 2,
            o = r.parent.textContent.endsWith(`

`);
          return !i || !o
            ? !1
            : n
                .chain()
                .command(({ tr: l }) => (l.delete(r.pos - 2, r.pos), !0))
                .exitCode()
                .run();
        },
        ArrowDown: ({ editor: n }) => {
          if (!this.options.exitOnArrowDown) return !1;
          const { state: e } = n,
            { selection: t, doc: r } = e,
            { $from: s, empty: i } = t;
          if (
            !i ||
            s.parent.type !== this.type ||
            !(s.parentOffset === s.parent.nodeSize - 2)
          )
            return !1;
          const l = s.after();
          return l === void 0
            ? !1
            : r.nodeAt(l)
              ? n.commands.command(
                  ({ tr: c }) => (c.setSelection(z.near(r.resolve(l))), !0)
                )
              : n.commands.exitCode();
        }
      };
    },
    addInputRules() {
      return [
        Oi({
          find: X1,
          type: this.type,
          getAttributes: n => ({ language: n[1] })
        }),
        Oi({
          find: Q1,
          type: this.type,
          getAttributes: n => ({ language: n[1] })
        })
      ];
    },
    addProseMirrorPlugins() {
      return [
        new X({
          key: new se('codeBlockVSCodeHandler'),
          props: {
            handlePaste: (n, e) => {
              if (!e.clipboardData || this.editor.isActive(this.type.name))
                return !1;
              const t = e.clipboardData.getData('text/plain'),
                r = e.clipboardData.getData('vscode-editor-data'),
                s = r ? JSON.parse(r) : void 0,
                i = s == null ? void 0 : s.mode;
              if (!t || !i) return !1;
              const { tr: o, schema: l } = n.state,
                a = l.text(
                  t.replace(
                    /\r\n?/g,
                    `
`
                  )
                );
              return (
                o.replaceSelectionWith(this.type.create({ language: i }, a)),
                o.selection.$from.parent.type !== this.type &&
                  o.setSelection(
                    D.near(o.doc.resolve(Math.max(0, o.selection.from - 2)))
                  ),
                o.setMeta('paste', !0),
                n.dispatch(o),
                !0
              );
            }
          }
        })
      ];
    }
  }),
  ex = Ee.create({
    name: 'doc',
    topNode: !0,
    content: 'block+',
    renderMarkdown: (n, e) =>
      n.content
        ? e.renderChildren(
            n.content,
            `

`
          )
        : ''
  }),
  tx = Ee.create({
    name: 'hardBreak',
    markdownTokenName: 'br',
    addOptions() {
      return { keepMarks: !0, HTMLAttributes: {} };
    },
    inline: !0,
    group: 'inline',
    selectable: !1,
    linebreakReplacement: !0,
    parseHTML() {
      return [{ tag: 'br' }];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['br', Y(this.options.HTMLAttributes, n)];
    },
    renderText() {
      return `
`;
    },
    renderMarkdown: () => `  
`,
    parseMarkdown: () => ({ type: 'hardBreak' }),
    addCommands() {
      return {
        setHardBreak:
          () =>
          ({ commands: n, chain: e, state: t, editor: r }) =>
            n.first([
              () => n.exitCode(),
              () =>
                n.command(() => {
                  const { selection: s, storedMarks: i } = t;
                  if (s.$from.parent.type.spec.isolating) return !1;
                  const { keepMarks: o } = this.options,
                    { splittableMarks: l } = r.extensionManager,
                    a = i || (s.$to.parentOffset && s.$from.marks());
                  return e()
                    .insertContent({ type: this.name })
                    .command(({ tr: c, dispatch: u }) => {
                      if (u && a && o) {
                        const d = a.filter(h => l.includes(h.type.name));
                        c.ensureMarks(d);
                      }
                      return !0;
                    })
                    .run();
                })
            ])
      };
    },
    addKeyboardShortcuts() {
      return {
        'Mod-Enter': () => this.editor.commands.setHardBreak(),
        'Shift-Enter': () => this.editor.commands.setHardBreak()
      };
    }
  }),
  nx = Ee.create({
    name: 'heading',
    addOptions() {
      return { levels: [1, 2, 3, 4, 5, 6], HTMLAttributes: {} };
    },
    content: 'inline*',
    group: 'block',
    defining: !0,
    addAttributes() {
      return { level: { default: 1, rendered: !1 } };
    },
    parseHTML() {
      return this.options.levels.map(n => ({
        tag: `h${n}`,
        attrs: { level: n }
      }));
    },
    renderHTML({ node: n, HTMLAttributes: e }) {
      return [
        `h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`,
        Y(this.options.HTMLAttributes, e),
        0
      ];
    },
    parseMarkdown: (n, e) =>
      e.createNode(
        'heading',
        { level: n.depth || 1 },
        e.parseInline(n.tokens || [])
      ),
    renderMarkdown: (n, e) => {
      var t;
      const r =
          (t = n.attrs) != null && t.level ? parseInt(n.attrs.level, 10) : 1,
        s = '#'.repeat(r);
      return n.content ? `${s} ${e.renderChildren(n.content)}` : '';
    },
    addCommands() {
      return {
        setHeading:
          n =>
          ({ commands: e }) =>
            this.options.levels.includes(n.level)
              ? e.setNode(this.name, n)
              : !1,
        toggleHeading:
          n =>
          ({ commands: e }) =>
            this.options.levels.includes(n.level)
              ? e.toggleNode(this.name, 'paragraph', n)
              : !1
      };
    },
    addKeyboardShortcuts() {
      return this.options.levels.reduce(
        (n, e) => ({
          ...n,
          [`Mod-Alt-${e}`]: () =>
            this.editor.commands.toggleHeading({ level: e })
        }),
        {}
      );
    },
    addInputRules() {
      return this.options.levels.map(n =>
        Oi({
          find: new RegExp(
            `^(#{${Math.min(...this.options.levels)},${n}})\\s$`
          ),
          type: this.type,
          getAttributes: { level: n }
        })
      );
    }
  }),
  rx = Ee.create({
    name: 'horizontalRule',
    addOptions() {
      return { HTMLAttributes: {}, nextNodeType: 'paragraph' };
    },
    group: 'block',
    parseHTML() {
      return [{ tag: 'hr' }];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['hr', Y(this.options.HTMLAttributes, n)];
    },
    markdownTokenName: 'hr',
    parseMarkdown: (n, e) => e.createNode('horizontalRule'),
    renderMarkdown: () => '---',
    addCommands() {
      return {
        setHorizontalRule:
          () =>
          ({ chain: n, state: e }) => {
            if (!$0(e, e.schema.nodes[this.name])) return !1;
            const { selection: t } = e,
              { $to: r } = t,
              s = n();
            return (
              $u(t)
                ? s.insertContentAt(r.pos, { type: this.name })
                : s.insertContent({ type: this.name }),
              s
                .command(({ state: i, tr: o, dispatch: l }) => {
                  if (l) {
                    const { $to: a } = o.selection,
                      c = a.end();
                    if (a.nodeAfter)
                      a.nodeAfter.isTextblock
                        ? o.setSelection(D.create(o.doc, a.pos + 1))
                        : a.nodeAfter.isBlock
                          ? o.setSelection(I.create(o.doc, a.pos))
                          : o.setSelection(D.create(o.doc, a.pos));
                    else {
                      const u =
                          i.schema.nodes[this.options.nextNodeType] ||
                          a.parent.type.contentMatch.defaultType,
                        d = u == null ? void 0 : u.create();
                      d &&
                        (o.insert(c, d),
                        o.setSelection(D.create(o.doc, c + 1)));
                    }
                    o.scrollIntoView();
                  }
                  return !0;
                })
                .run()
            );
          }
      };
    },
    addInputRules() {
      return [z0({ find: /^(?:---|—-|___\s|\*\*\*\s)$/, type: this.type })];
    }
  }),
  sx = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/,
  ix = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g,
  ox = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/,
  lx = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g,
  ax = Ke.create({
    name: 'italic',
    addOptions() {
      return { HTMLAttributes: {} };
    },
    parseHTML() {
      return [
        { tag: 'em' },
        { tag: 'i', getAttrs: n => n.style.fontStyle !== 'normal' && null },
        {
          style: 'font-style=normal',
          clearMark: n => n.type.name === this.name
        },
        { style: 'font-style=italic' }
      ];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['em', Y(this.options.HTMLAttributes, n), 0];
    },
    addCommands() {
      return {
        setItalic:
          () =>
          ({ commands: n }) =>
            n.setMark(this.name),
        toggleItalic:
          () =>
          ({ commands: n }) =>
            n.toggleMark(this.name),
        unsetItalic:
          () =>
          ({ commands: n }) =>
            n.unsetMark(this.name)
      };
    },
    markdownTokenName: 'em',
    parseMarkdown: (n, e) =>
      e.applyMark('italic', e.parseInline(n.tokens || [])),
    markdownOptions: { htmlReopen: { open: '<em>', close: '</em>' } },
    renderMarkdown: (n, e) => `*${e.renderChildren(n)}*`,
    addKeyboardShortcuts() {
      return {
        'Mod-i': () => this.editor.commands.toggleItalic(),
        'Mod-I': () => this.editor.commands.toggleItalic()
      };
    },
    addInputRules() {
      return [
        Vt({ find: sx, type: this.type }),
        Vt({ find: ox, type: this.type })
      ];
    },
    addPasteRules() {
      return [
        Ct({ find: ix, type: this.type }),
        Ct({ find: lx, type: this.type })
      ];
    }
  }),
  cx = Object.defineProperty,
  ux = (n, e) => {
    for (var t in e) cx(n, t, { get: e[t], enumerable: !0 });
  },
  dx = 'listItem',
  ka = 'textStyle',
  Ca = /^\s*([-+*])\s$/,
  wd = Ee.create({
    name: 'bulletList',
    addOptions() {
      return {
        itemTypeName: 'listItem',
        HTMLAttributes: {},
        keepMarks: !1,
        keepAttributes: !1
      };
    },
    group: 'block list',
    content() {
      return `${this.options.itemTypeName}+`;
    },
    parseHTML() {
      return [{ tag: 'ul' }];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['ul', Y(this.options.HTMLAttributes, n), 0];
    },
    markdownTokenName: 'list',
    parseMarkdown: (n, e) =>
      n.type !== 'list' || n.ordered
        ? []
        : {
            type: 'bulletList',
            content: n.items ? e.parseChildren(n.items) : []
          },
    renderMarkdown: (n, e) =>
      n.content
        ? e.renderChildren(
            n.content,
            `
`
          )
        : '',
    markdownOptions: { indentsContent: !0 },
    addCommands() {
      return {
        toggleBulletList:
          () =>
          ({ commands: n, chain: e }) =>
            this.options.keepAttributes
              ? e()
                  .toggleList(
                    this.name,
                    this.options.itemTypeName,
                    this.options.keepMarks
                  )
                  .updateAttributes(dx, this.editor.getAttributes(ka))
                  .run()
              : n.toggleList(
                  this.name,
                  this.options.itemTypeName,
                  this.options.keepMarks
                )
      };
    },
    addKeyboardShortcuts() {
      return { 'Mod-Shift-8': () => this.editor.commands.toggleBulletList() };
    },
    addInputRules() {
      let n = pn({ find: Ca, type: this.type });
      return (
        (this.options.keepMarks || this.options.keepAttributes) &&
          (n = pn({
            find: Ca,
            type: this.type,
            keepMarks: this.options.keepMarks,
            keepAttributes: this.options.keepAttributes,
            getAttributes: () => this.editor.getAttributes(ka),
            editor: this.editor
          })),
        [n]
      );
    }
  }),
  Td = Ee.create({
    name: 'listItem',
    addOptions() {
      return {
        HTMLAttributes: {},
        bulletListTypeName: 'bulletList',
        orderedListTypeName: 'orderedList'
      };
    },
    content: 'paragraph block*',
    defining: !0,
    parseHTML() {
      return [{ tag: 'li' }];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['li', Y(this.options.HTMLAttributes, n), 0];
    },
    markdownTokenName: 'list_item',
    parseMarkdown: (n, e) => {
      var t;
      if (n.type !== 'list_item') return [];
      const r = (t = e.parseBlockChildren) != null ? t : e.parseChildren;
      let s = [];
      if (n.tokens && n.tokens.length > 0)
        if (n.tokens.some(o => o.type === 'paragraph')) s = r(n.tokens);
        else {
          const o = n.tokens[0];
          if (o && o.type === 'text' && o.tokens && o.tokens.length > 0) {
            if (
              ((s = [{ type: 'paragraph', content: e.parseInline(o.tokens) }]),
              n.tokens.length > 1)
            ) {
              const a = n.tokens.slice(1),
                c = r(a);
              s.push(...c);
            }
          } else s = r(n.tokens);
        }
      return (
        s.length === 0 && (s = [{ type: 'paragraph', content: [] }]),
        { type: 'listItem', content: s }
      );
    },
    renderMarkdown: (n, e, t) =>
      To(
        n,
        e,
        r => {
          var s, i;
          return r.parentType === 'bulletList'
            ? '- '
            : r.parentType === 'orderedList'
              ? `${(((i = (s = r.meta) == null ? void 0 : s.parentAttrs) == null ? void 0 : i.start) || 1) + r.index}. `
              : '- ';
        },
        t
      ),
    addKeyboardShortcuts() {
      return {
        Enter: () => this.editor.commands.splitListItem(this.name),
        Tab: () => this.editor.commands.sinkListItem(this.name),
        'Shift-Tab': () => this.editor.commands.liftListItem(this.name)
      };
    }
  }),
  hx = {};
ux(hx, {
  findListItemPos: () => Xn,
  getNextListDepth: () => _o,
  handleBackspace: () => _i,
  handleDelete: () => Vi,
  hasListBefore: () => Ed,
  hasListItemAfter: () => fx,
  hasListItemBefore: () => Ad,
  listItemHasSubList: () => Nd,
  nextListIsDeeper: () => Od,
  nextListIsHigher: () => Id
});
var Xn = (n, e) => {
    const { $from: t } = e.selection,
      r = re(n, e.schema);
    let s = null,
      i = t.depth,
      o = t.pos,
      l = null;
    for (; i > 0 && l === null; )
      ((s = t.node(i)), s.type === r ? (l = i) : ((i -= 1), (o -= 1)));
    return l === null ? null : { $pos: e.doc.resolve(o), depth: l };
  },
  _o = (n, e) => {
    const t = Xn(n, e);
    if (!t) return !1;
    const [, r] = Jg(e, n, t.$pos.pos + 4);
    return r;
  },
  Ed = (n, e, t) => {
    const { $anchor: r } = n.selection,
      s = Math.max(0, r.pos - 2),
      i = n.doc.resolve(s).node();
    return !(!i || !t.includes(i.type.name));
  },
  Ad = (n, e) => {
    var t;
    const { $anchor: r } = e.selection,
      s = e.doc.resolve(r.pos - 2);
    return !(
      s.index() === 0 ||
      ((t = s.nodeBefore) == null ? void 0 : t.type.name) !== n
    );
  },
  Nd = (n, e, t) => {
    if (!t) return !1;
    const r = re(n, e.schema);
    let s = !1;
    return (
      t.descendants(i => {
        i.type === r && (s = !0);
      }),
      s
    );
  },
  _i = (n, e, t) => {
    if (n.commands.undoInputRule()) return !0;
    if (n.state.selection.from !== n.state.selection.to) return !1;
    if (!kt(n.state, e) && Ed(n.state, e, t)) {
      const { $anchor: l } = n.state.selection,
        a = n.state.doc.resolve(l.before() - 1),
        c = [];
      a.node().descendants((h, f) => {
        h.type.name === e && c.push({ node: h, pos: f });
      });
      const u = c.at(-1);
      if (!u) return !1;
      const d = n.state.doc.resolve(a.start() + u.pos + 1);
      return n
        .chain()
        .cut({ from: l.start() - 1, to: l.end() + 1 }, d.end())
        .joinForward()
        .run();
    }
    if (!kt(n.state, e) || !Qg(n.state)) return !1;
    const r = Xn(e, n.state);
    if (!r) return !1;
    const i = n.state.doc.resolve(r.$pos.pos - 2).node(r.depth),
      o = Nd(e, n.state, i);
    return Ad(e, n.state) && !o
      ? n.commands.joinItemBackward()
      : n.chain().liftListItem(e).run();
  },
  Od = (n, e) => {
    const t = _o(n, e),
      r = Xn(n, e);
    return !r || !t ? !1 : t > r.depth;
  },
  Id = (n, e) => {
    const t = _o(n, e),
      r = Xn(n, e);
    return !r || !t ? !1 : t < r.depth;
  },
  Vi = (n, e) => {
    if (!kt(n.state, e) || !Xg(n.state, e)) return !1;
    const { selection: t } = n.state,
      { $from: r, $to: s } = t;
    return !t.empty && r.sameParent(s)
      ? !1
      : Od(e, n.state)
        ? n
            .chain()
            .focus(n.state.selection.from + 4)
            .lift(e)
            .joinBackward()
            .run()
        : Id(e, n.state)
          ? n.chain().joinForward().joinBackward().run()
          : n.commands.joinItemForward();
  },
  fx = (n, e) => {
    var t;
    const { $anchor: r } = e.selection,
      s = e.doc.resolve(r.pos - r.parentOffset - 2);
    return !(
      s.index() === s.parent.childCount - 1 ||
      ((t = s.nodeAfter) == null ? void 0 : t.type.name) !== n
    );
  },
  Rd = ee.create({
    name: 'listKeymap',
    addOptions() {
      return {
        listTypes: [
          { itemName: 'listItem', wrapperNames: ['bulletList', 'orderedList'] },
          { itemName: 'taskItem', wrapperNames: ['taskList'] }
        ]
      };
    },
    addKeyboardShortcuts() {
      return {
        Delete: ({ editor: n }) => {
          let e = !1;
          return (
            this.options.listTypes.forEach(({ itemName: t }) => {
              n.state.schema.nodes[t] !== void 0 && Vi(n, t) && (e = !0);
            }),
            e
          );
        },
        'Mod-Delete': ({ editor: n }) => {
          let e = !1;
          return (
            this.options.listTypes.forEach(({ itemName: t }) => {
              n.state.schema.nodes[t] !== void 0 && Vi(n, t) && (e = !0);
            }),
            e
          );
        },
        Backspace: ({ editor: n }) => {
          let e = !1;
          return (
            this.options.listTypes.forEach(
              ({ itemName: t, wrapperNames: r }) => {
                n.state.schema.nodes[t] !== void 0 && _i(n, t, r) && (e = !0);
              }
            ),
            e
          );
        },
        'Mod-Backspace': ({ editor: n }) => {
          let e = !1;
          return (
            this.options.listTypes.forEach(
              ({ itemName: t, wrapperNames: r }) => {
                n.state.schema.nodes[t] !== void 0 && _i(n, t, r) && (e = !0);
              }
            ),
            e
          );
        }
      };
    }
  }),
  Sa = /^(\s*)(\d+)\.\s+(.*)$/,
  px = /^\s/;
function mx(n) {
  const e = [];
  let t = 0,
    r = 0;
  for (; t < n.length; ) {
    const s = n[t],
      i = s.match(Sa);
    if (!i) break;
    const [, o, l, a] = i,
      c = o.length;
    let u = a,
      d = t + 1;
    const h = [s];
    for (; d < n.length; ) {
      const f = n[d];
      if (f.match(Sa)) break;
      if (f.trim() === '')
        (h.push(f),
          (u += `
`),
          (d += 1));
      else if (f.match(px))
        (h.push(f),
          (u += `
${f.slice(c + 2)}`),
          (d += 1));
      else break;
    }
    (e.push({
      indent: c,
      number: parseInt(l, 10),
      content: u.trim(),
      raw: h.join(`
`)
    }),
      (r = d),
      (t = d));
  }
  return [e, r];
}
function Ld(n, e, t) {
  var r;
  const s = [];
  let i = 0;
  for (; i < n.length; ) {
    const o = n[i];
    if (o.indent === e) {
      const l = o.content.split(`
`),
        a = ((r = l[0]) == null ? void 0 : r.trim()) || '',
        c = [];
      a && c.push({ type: 'paragraph', raw: a, tokens: t.inlineTokens(a) });
      const u = l
        .slice(1)
        .join(
          `
`
        )
        .trim();
      if (u) {
        const f = t.blockTokens(u);
        c.push(...f);
      }
      let d = i + 1;
      const h = [];
      for (; d < n.length && n[d].indent > e; ) (h.push(n[d]), (d += 1));
      if (h.length > 0) {
        const f = Math.min(...h.map(g => g.indent)),
          m = Ld(h, f, t);
        c.push({
          type: 'list',
          ordered: !0,
          start: h[0].number,
          items: m,
          raw: h.map(g => g.raw).join(`
`)
        });
      }
      (s.push({ type: 'list_item', raw: o.raw, tokens: c }), (i = d));
    } else i += 1;
  }
  return s;
}
function gx(n, e) {
  return n.map(t => {
    if (t.type !== 'list_item') return e.parseChildren([t])[0];
    const r = [];
    return (
      t.tokens &&
        t.tokens.length > 0 &&
        t.tokens.forEach(s => {
          if (
            s.type === 'paragraph' ||
            s.type === 'list' ||
            s.type === 'blockquote' ||
            s.type === 'code'
          )
            r.push(...e.parseChildren([s]));
          else if (s.type === 'text' && s.tokens) {
            const i = e.parseChildren([s]);
            r.push({ type: 'paragraph', content: i });
          } else {
            const i = e.parseChildren([s]);
            i.length > 0 && r.push(...i);
          }
        }),
      { type: 'listItem', content: r }
    );
  });
}
var yx = 'listItem',
  va = 'textStyle',
  Ma = /^(\d+)\.\s$/,
  Dd = Ee.create({
    name: 'orderedList',
    addOptions() {
      return {
        itemTypeName: 'listItem',
        HTMLAttributes: {},
        keepMarks: !1,
        keepAttributes: !1
      };
    },
    group: 'block list',
    content() {
      return `${this.options.itemTypeName}+`;
    },
    addAttributes() {
      return {
        start: {
          default: 1,
          parseHTML: n =>
            n.hasAttribute('start')
              ? parseInt(n.getAttribute('start') || '', 10)
              : 1
        },
        type: { default: null, parseHTML: n => n.getAttribute('type') }
      };
    },
    parseHTML() {
      return [{ tag: 'ol' }];
    },
    renderHTML({ HTMLAttributes: n }) {
      const { start: e, ...t } = n;
      return e === 1
        ? ['ol', Y(this.options.HTMLAttributes, t), 0]
        : ['ol', Y(this.options.HTMLAttributes, n), 0];
    },
    markdownTokenName: 'list',
    parseMarkdown: (n, e) => {
      if (n.type !== 'list' || !n.ordered) return [];
      const t = n.start || 1,
        r = n.items ? gx(n.items, e) : [];
      return t !== 1
        ? { type: 'orderedList', attrs: { start: t }, content: r }
        : { type: 'orderedList', content: r };
    },
    renderMarkdown: (n, e) =>
      n.content
        ? e.renderChildren(
            n.content,
            `
`
          )
        : '',
    markdownTokenizer: {
      name: 'orderedList',
      level: 'block',
      start: n => {
        const e = n.match(/^(\s*)(\d+)\.\s+/),
          t = e == null ? void 0 : e.index;
        return t !== void 0 ? t : -1;
      },
      tokenize: (n, e, t) => {
        var r;
        const s = n.split(`
`),
          [i, o] = mx(s);
        if (i.length === 0) return;
        const l = Ld(i, 0, t);
        return l.length === 0
          ? void 0
          : {
              type: 'list',
              ordered: !0,
              start: ((r = i[0]) == null ? void 0 : r.number) || 1,
              items: l,
              raw: s.slice(0, o).join(`
`)
            };
      }
    },
    markdownOptions: { indentsContent: !0 },
    addCommands() {
      return {
        toggleOrderedList:
          () =>
          ({ commands: n, chain: e }) =>
            this.options.keepAttributes
              ? e()
                  .toggleList(
                    this.name,
                    this.options.itemTypeName,
                    this.options.keepMarks
                  )
                  .updateAttributes(yx, this.editor.getAttributes(va))
                  .run()
              : n.toggleList(
                  this.name,
                  this.options.itemTypeName,
                  this.options.keepMarks
                )
      };
    },
    addKeyboardShortcuts() {
      return { 'Mod-Shift-7': () => this.editor.commands.toggleOrderedList() };
    },
    addInputRules() {
      let n = pn({
        find: Ma,
        type: this.type,
        getAttributes: e => ({ start: +e[1] }),
        joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
      });
      return (
        (this.options.keepMarks || this.options.keepAttributes) &&
          (n = pn({
            find: Ma,
            type: this.type,
            keepMarks: this.options.keepMarks,
            keepAttributes: this.options.keepAttributes,
            getAttributes: e => ({
              start: +e[1],
              ...this.editor.getAttributes(va)
            }),
            joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
            editor: this.editor
          })),
        [n]
      );
    }
  }),
  bx = /^\s*(\[([( |x])?\])\s$/,
  xx = Ee.create({
    name: 'taskItem',
    addOptions() {
      return {
        nested: !1,
        HTMLAttributes: {},
        taskListTypeName: 'taskList',
        a11y: void 0
      };
    },
    content() {
      return this.options.nested ? 'paragraph block*' : 'paragraph+';
    },
    defining: !0,
    addAttributes() {
      return {
        checked: {
          default: !1,
          keepOnSplit: !1,
          parseHTML: n => {
            const e = n.getAttribute('data-checked');
            return e === '' || e === 'true';
          },
          renderHTML: n => ({ 'data-checked': n.checked })
        }
      };
    },
    parseHTML() {
      return [{ tag: `li[data-type="${this.name}"]`, priority: 51 }];
    },
    renderHTML({ node: n, HTMLAttributes: e }) {
      return [
        'li',
        Y(this.options.HTMLAttributes, e, { 'data-type': this.name }),
        [
          'label',
          [
            'input',
            { type: 'checkbox', checked: n.attrs.checked ? 'checked' : null }
          ],
          ['span']
        ],
        ['div', 0]
      ];
    },
    parseMarkdown: (n, e) => {
      const t = [];
      if (
        (n.tokens && n.tokens.length > 0
          ? t.push(e.createNode('paragraph', {}, e.parseInline(n.tokens)))
          : n.text
            ? t.push(
                e.createNode('paragraph', {}, [
                  e.createNode('text', { text: n.text })
                ])
              )
            : t.push(e.createNode('paragraph', {}, [])),
        n.nestedTokens && n.nestedTokens.length > 0)
      ) {
        const r = e.parseChildren(n.nestedTokens);
        t.push(...r);
      }
      return e.createNode('taskItem', { checked: n.checked || !1 }, t);
    },
    renderMarkdown: (n, e) => {
      var t;
      const s = `- [${(t = n.attrs) != null && t.checked ? 'x' : ' '}] `;
      return To(n, e, s);
    },
    addKeyboardShortcuts() {
      const n = {
        Enter: () => this.editor.commands.splitListItem(this.name),
        'Shift-Tab': () => this.editor.commands.liftListItem(this.name)
      };
      return this.options.nested
        ? { ...n, Tab: () => this.editor.commands.sinkListItem(this.name) }
        : n;
    },
    addNodeView() {
      return ({ node: n, HTMLAttributes: e, getPos: t, editor: r }) => {
        const s = document.createElement('li'),
          i = document.createElement('label'),
          o = document.createElement('span'),
          l = document.createElement('input'),
          a = document.createElement('div'),
          c = d => {
            var h, f;
            l.ariaLabel =
              ((f =
                (h = this.options.a11y) == null ? void 0 : h.checkboxLabel) ==
              null
                ? void 0
                : f.call(h, d, l.checked)) ||
              `Task item checkbox for ${d.textContent || 'empty task item'}`;
          };
        (c(n),
          (i.contentEditable = 'false'),
          (l.type = 'checkbox'),
          l.addEventListener('mousedown', d => d.preventDefault()),
          l.addEventListener('change', d => {
            if (!r.isEditable && !this.options.onReadOnlyChecked) {
              l.checked = !l.checked;
              return;
            }
            const { checked: h } = d.target;
            (r.isEditable &&
              typeof t == 'function' &&
              r
                .chain()
                .focus(void 0, { scrollIntoView: !1 })
                .command(({ tr: f }) => {
                  const m = t();
                  if (typeof m != 'number') return !1;
                  const g = f.doc.nodeAt(m);
                  return (
                    f.setNodeMarkup(m, void 0, {
                      ...(g == null ? void 0 : g.attrs),
                      checked: h
                    }),
                    !0
                  );
                })
                .run(),
              !r.isEditable &&
                this.options.onReadOnlyChecked &&
                (this.options.onReadOnlyChecked(n, h) ||
                  (l.checked = !l.checked)));
          }),
          Object.entries(this.options.HTMLAttributes).forEach(([d, h]) => {
            s.setAttribute(d, h);
          }),
          (s.dataset.checked = n.attrs.checked),
          (l.checked = n.attrs.checked),
          i.append(l, o),
          s.append(i, a),
          Object.entries(e).forEach(([d, h]) => {
            s.setAttribute(d, h);
          }));
        let u = new Set(Object.keys(e));
        return {
          dom: s,
          contentDOM: a,
          update: d => {
            if (d.type !== this.type) return !1;
            ((s.dataset.checked = d.attrs.checked),
              (l.checked = d.attrs.checked),
              c(d));
            const h = r.extensionManager.attributes,
              f = Wn(d, h),
              m = new Set(Object.keys(f)),
              g = this.options.HTMLAttributes;
            return (
              u.forEach(y => {
                m.has(y) ||
                  (y in g ? s.setAttribute(y, g[y]) : s.removeAttribute(y));
              }),
              Object.entries(f).forEach(([y, b]) => {
                b == null
                  ? y in g
                    ? s.setAttribute(y, g[y])
                    : s.removeAttribute(y)
                  : s.setAttribute(y, b);
              }),
              (u = m),
              !0
            );
          }
        };
      };
    },
    addInputRules() {
      return [
        pn({
          find: bx,
          type: this.type,
          getAttributes: n => ({ checked: n[n.length - 1] === 'x' })
        })
      ];
    }
  }),
  kx = Ee.create({
    name: 'taskList',
    addOptions() {
      return { itemTypeName: 'taskItem', HTMLAttributes: {} };
    },
    group: 'block list',
    content() {
      return `${this.options.itemTypeName}+`;
    },
    parseHTML() {
      return [{ tag: `ul[data-type="${this.name}"]`, priority: 51 }];
    },
    renderHTML({ HTMLAttributes: n }) {
      return [
        'ul',
        Y(this.options.HTMLAttributes, n, { 'data-type': this.name }),
        0
      ];
    },
    parseMarkdown: (n, e) =>
      e.createNode('taskList', {}, e.parseChildren(n.items || [])),
    renderMarkdown: (n, e) =>
      n.content
        ? e.renderChildren(
            n.content,
            `
`
          )
        : '',
    markdownTokenizer: {
      name: 'taskList',
      level: 'block',
      start(n) {
        var e;
        const t =
          (e = n.match(/^\s*[-+*]\s+\[([ xX])\]\s+/)) == null
            ? void 0
            : e.index;
        return t !== void 0 ? t : -1;
      },
      tokenize(n, e, t) {
        const r = i => {
            const o = Ii(
              i,
              {
                itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
                extractItemData: l => ({
                  indentLevel: l[1].length,
                  mainContent: l[4],
                  checked: l[3].toLowerCase() === 'x'
                }),
                createToken: (l, a) => ({
                  type: 'taskItem',
                  raw: '',
                  mainContent: l.mainContent,
                  indentLevel: l.indentLevel,
                  checked: l.checked,
                  text: l.mainContent,
                  tokens: t.inlineTokens(l.mainContent),
                  nestedTokens: a
                }),
                customNestedParser: r
              },
              t
            );
            return o
              ? [{ type: 'taskList', raw: o.raw, items: o.items }]
              : t.blockTokens(i);
          },
          s = Ii(
            n,
            {
              itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
              extractItemData: i => ({
                indentLevel: i[1].length,
                mainContent: i[4],
                checked: i[3].toLowerCase() === 'x'
              }),
              createToken: (i, o) => ({
                type: 'taskItem',
                raw: '',
                mainContent: i.mainContent,
                indentLevel: i.indentLevel,
                checked: i.checked,
                text: i.mainContent,
                tokens: t.inlineTokens(i.mainContent),
                nestedTokens: o
              }),
              customNestedParser: r
            },
            t
          );
        if (s) return { type: 'taskList', raw: s.raw, items: s.items };
      }
    },
    markdownOptions: { indentsContent: !0 },
    addCommands() {
      return {
        toggleTaskList:
          () =>
          ({ commands: n }) =>
            n.toggleList(this.name, this.options.itemTypeName)
      };
    },
    addKeyboardShortcuts() {
      return { 'Mod-Shift-9': () => this.editor.commands.toggleTaskList() };
    }
  });
ee.create({
  name: 'listKit',
  addExtensions() {
    const n = [];
    return (
      this.options.bulletList !== !1 &&
        n.push(wd.configure(this.options.bulletList)),
      this.options.listItem !== !1 &&
        n.push(Td.configure(this.options.listItem)),
      this.options.listKeymap !== !1 &&
        n.push(Rd.configure(this.options.listKeymap)),
      this.options.orderedList !== !1 &&
        n.push(Dd.configure(this.options.orderedList)),
      this.options.taskItem !== !1 &&
        n.push(xx.configure(this.options.taskItem)),
      this.options.taskList !== !1 &&
        n.push(kx.configure(this.options.taskList)),
      n
    );
  }
});
var dr = '&nbsp;',
  li = ' ',
  Cx = Ee.create({
    name: 'paragraph',
    priority: 1e3,
    addOptions() {
      return { HTMLAttributes: {} };
    },
    group: 'block',
    content: 'inline*',
    parseHTML() {
      return [{ tag: 'p' }];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['p', Y(this.options.HTMLAttributes, n), 0];
    },
    parseMarkdown: (n, e) => {
      const t = n.tokens || [];
      if (t.length === 1 && t[0].type === 'image')
        return e.parseChildren([t[0]]);
      const r = e.parseInline(t);
      return t.length === 1 &&
        t[0].type === 'text' &&
        (t[0].raw === dr ||
          t[0].text === dr ||
          t[0].raw === li ||
          t[0].text === li) &&
        r.length === 1 &&
        r[0].type === 'text' &&
        (r[0].text === dr || r[0].text === li)
        ? e.createNode('paragraph', void 0, [])
        : e.createNode('paragraph', void 0, r);
    },
    renderMarkdown: (n, e, t) => {
      var r, s;
      if (!n) return '';
      const i = Array.isArray(n.content) ? n.content : [];
      if (i.length === 0) {
        const o = Array.isArray(
          (r = t == null ? void 0 : t.previousNode) == null ? void 0 : r.content
        )
          ? t.previousNode.content
          : [];
        return ((s = t == null ? void 0 : t.previousNode) == null
          ? void 0
          : s.type) === 'paragraph' && o.length === 0
          ? dr
          : '';
      }
      return e.renderChildren(i);
    },
    addCommands() {
      return {
        setParagraph:
          () =>
          ({ commands: n }) =>
            n.setNode(this.name)
      };
    },
    addKeyboardShortcuts() {
      return { 'Mod-Alt-0': () => this.editor.commands.setParagraph() };
    }
  }),
  Sx = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/,
  vx = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g,
  Mx = Ke.create({
    name: 'strike',
    addOptions() {
      return { HTMLAttributes: {} };
    },
    parseHTML() {
      return [
        { tag: 's' },
        { tag: 'del' },
        { tag: 'strike' },
        {
          style: 'text-decoration',
          consuming: !1,
          getAttrs: n => (n.includes('line-through') ? {} : !1)
        }
      ];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['s', Y(this.options.HTMLAttributes, n), 0];
    },
    markdownTokenName: 'del',
    parseMarkdown: (n, e) =>
      e.applyMark('strike', e.parseInline(n.tokens || [])),
    renderMarkdown: (n, e) => `~~${e.renderChildren(n)}~~`,
    addCommands() {
      return {
        setStrike:
          () =>
          ({ commands: n }) =>
            n.setMark(this.name),
        toggleStrike:
          () =>
          ({ commands: n }) =>
            n.toggleMark(this.name),
        unsetStrike:
          () =>
          ({ commands: n }) =>
            n.unsetMark(this.name)
      };
    },
    addKeyboardShortcuts() {
      return { 'Mod-Shift-s': () => this.editor.commands.toggleStrike() };
    },
    addInputRules() {
      return [Vt({ find: Sx, type: this.type })];
    },
    addPasteRules() {
      return [Ct({ find: vx, type: this.type })];
    }
  }),
  wx = Ee.create({
    name: 'text',
    group: 'inline',
    parseMarkdown: n => ({ type: 'text', text: n.text || '' }),
    renderMarkdown: n => n.text || ''
  }),
  Pd = Ke.create({
    name: 'underline',
    addOptions() {
      return { HTMLAttributes: {} };
    },
    parseHTML() {
      return [
        { tag: 'u' },
        {
          style: 'text-decoration',
          consuming: !1,
          getAttrs: n => (n.includes('underline') ? {} : !1)
        }
      ];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['u', Y(this.options.HTMLAttributes, n), 0];
    },
    parseMarkdown(n, e) {
      return e.applyMark(
        this.name || 'underline',
        e.parseInline(n.tokens || [])
      );
    },
    renderMarkdown(n, e) {
      return `++${e.renderChildren(n)}++`;
    },
    markdownTokenizer: {
      name: 'underline',
      level: 'inline',
      start(n) {
        return n.indexOf('++');
      },
      tokenize(n, e, t) {
        const s = /^(\+\+)([\s\S]+?)(\+\+)/.exec(n);
        if (!s) return;
        const i = s[2].trim();
        return {
          type: 'underline',
          raw: s[0],
          text: i,
          tokens: t.inlineTokens(i)
        };
      }
    },
    addCommands() {
      return {
        setUnderline:
          () =>
          ({ commands: n }) =>
            n.setMark(this.name),
        toggleUnderline:
          () =>
          ({ commands: n }) =>
            n.toggleMark(this.name),
        unsetUnderline:
          () =>
          ({ commands: n }) =>
            n.unsetMark(this.name)
      };
    },
    addKeyboardShortcuts() {
      return {
        'Mod-u': () => this.editor.commands.toggleUnderline(),
        'Mod-U': () => this.editor.commands.toggleUnderline()
      };
    }
  }),
  Tx = Pd;
function Ex(n = {}) {
  return new X({
    view(e) {
      return new Ax(e, n);
    }
  });
}
class Ax {
  constructor(e, t) {
    var r;
    ((this.editorView = e),
      (this.cursorPos = null),
      (this.element = null),
      (this.timeout = -1),
      (this.width = (r = t.width) !== null && r !== void 0 ? r : 1),
      (this.color = t.color === !1 ? void 0 : t.color || 'black'),
      (this.class = t.class),
      (this.handlers = ['dragover', 'dragend', 'drop', 'dragleave'].map(s => {
        let i = o => {
          this[s](o);
        };
        return (e.dom.addEventListener(s, i), { name: s, handler: i });
      })));
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) =>
      this.editorView.dom.removeEventListener(e, t)
    );
  }
  update(e, t) {
    this.cursorPos != null &&
      t.doc != e.state.doc &&
      (this.cursorPos > e.state.doc.content.size
        ? this.setCursor(null)
        : this.updateOverlay());
  }
  setCursor(e) {
    e != this.cursorPos &&
      ((this.cursorPos = e),
      e == null
        ? (this.element.parentNode.removeChild(this.element),
          (this.element = null))
        : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos),
      t = !e.parent.inlineContent,
      r,
      s = this.editorView.dom,
      i = s.getBoundingClientRect(),
      o = i.width / s.offsetWidth,
      l = i.height / s.offsetHeight;
    if (t) {
      let d = e.nodeBefore,
        h = e.nodeAfter;
      if (d || h) {
        let f = this.editorView.nodeDOM(this.cursorPos - (d ? d.nodeSize : 0));
        if (f) {
          let m = f.getBoundingClientRect(),
            g = d ? m.bottom : m.top;
          d &&
            h &&
            (g =
              (g +
                this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect()
                  .top) /
              2);
          let y = (this.width / 2) * l;
          r = { left: m.left, right: m.right, top: g - y, bottom: g + y };
        }
      }
    }
    if (!r) {
      let d = this.editorView.coordsAtPos(this.cursorPos),
        h = (this.width / 2) * o;
      r = { left: d.left - h, right: d.left + h, top: d.top, bottom: d.bottom };
    }
    let a = this.editorView.dom.offsetParent;
    (this.element ||
      ((this.element = a.appendChild(document.createElement('div'))),
      this.class && (this.element.className = this.class),
      (this.element.style.cssText =
        'position: absolute; z-index: 50; pointer-events: none;'),
      this.color && (this.element.style.backgroundColor = this.color)),
      this.element.classList.toggle('prosemirror-dropcursor-block', t),
      this.element.classList.toggle('prosemirror-dropcursor-inline', !t));
    let c, u;
    if (!a || (a == document.body && getComputedStyle(a).position == 'static'))
      ((c = -pageXOffset), (u = -pageYOffset));
    else {
      let d = a.getBoundingClientRect(),
        h = d.width / a.offsetWidth,
        f = d.height / a.offsetHeight;
      ((c = d.left - a.scrollLeft * h), (u = d.top - a.scrollTop * f));
    }
    ((this.element.style.left = (r.left - c) / o + 'px'),
      (this.element.style.top = (r.top - u) / l + 'px'),
      (this.element.style.width = (r.right - r.left) / o + 'px'),
      (this.element.style.height = (r.bottom - r.top) / l + 'px'));
  }
  scheduleRemoval(e) {
    (clearTimeout(this.timeout),
      (this.timeout = setTimeout(() => this.setCursor(null), e)));
  }
  dragover(e) {
    if (!this.editorView.editable) return;
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }),
      r = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside),
      s = r && r.type.spec.disableDropCursor,
      i = typeof s == 'function' ? s(this.editorView, t, e) : s;
    if (t && !i) {
      let o = t.pos;
      if (this.editorView.dragging && this.editorView.dragging.slice) {
        let l = Sc(
          this.editorView.state.doc,
          o,
          this.editorView.dragging.slice
        );
        l != null && (o = l);
      }
      (this.setCursor(o), this.scheduleRemoval(5e3));
    }
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
  }
}
class Z extends z {
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return Z.valid(r) ? new Z(r) : z.near(r);
  }
  content() {
    return A.empty;
  }
  eq(e) {
    return e instanceof Z && e.head == this.head;
  }
  toJSON() {
    return { type: 'gapcursor', pos: this.head };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != 'number')
      throw new RangeError('Invalid input for GapCursor.fromJSON');
    return new Z(e.resolve(t.pos));
  }
  getBookmark() {
    return new Vo(this.anchor);
  }
  static valid(e) {
    let t = e.parent;
    if (t.inlineContent || !Nx(e) || !Ox(e)) return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null) return r;
    let s = t.contentMatchAt(e.index()).defaultType;
    return s && s.isTextblock;
  }
  static findGapCursorFrom(e, t, r = !1) {
    e: for (;;) {
      if (!r && Z.valid(e)) return e;
      let s = e.pos,
        i = null;
      for (let o = e.depth; ; o--) {
        let l = e.node(o);
        if (t > 0 ? e.indexAfter(o) < l.childCount : e.index(o) > 0) {
          i = l.child(t > 0 ? e.indexAfter(o) : e.index(o) - 1);
          break;
        } else if (o == 0) return null;
        s += t;
        let a = e.doc.resolve(s);
        if (Z.valid(a)) return a;
      }
      for (;;) {
        let o = t > 0 ? i.firstChild : i.lastChild;
        if (!o) {
          if (i.isAtom && !i.isText && !I.isSelectable(i)) {
            ((e = e.doc.resolve(s + i.nodeSize * t)), (r = !1));
            continue e;
          }
          break;
        }
        ((i = o), (s += t));
        let l = e.doc.resolve(s);
        if (Z.valid(l)) return l;
      }
      return null;
    }
  }
}
Z.prototype.visible = !1;
Z.findFrom = Z.findGapCursorFrom;
z.jsonID('gapcursor', Z);
class Vo {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new Vo(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return Z.valid(t) ? new Z(t) : z.near(t);
  }
}
function jd(n) {
  return n.isAtom || n.spec.isolating || n.spec.createGapCursor;
}
function Nx(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e),
      r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating) return !0;
      continue;
    }
    for (let s = r.child(t - 1); ; s = s.lastChild) {
      if ((s.childCount == 0 && !s.inlineContent) || jd(s.type)) return !0;
      if (s.inlineContent) return !1;
    }
  }
  return !0;
}
function Ox(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e),
      r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating) return !0;
      continue;
    }
    for (let s = r.child(t); ; s = s.firstChild) {
      if ((s.childCount == 0 && !s.inlineContent) || jd(s.type)) return !0;
      if (s.inlineContent) return !1;
    }
  }
  return !0;
}
function Ix() {
  return new X({
    props: {
      decorations: Px,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && Z.valid(t) ? new Z(t) : null;
      },
      handleClick: Lx,
      handleKeyDown: Rx,
      handleDOMEvents: { beforeinput: Dx }
    }
  });
}
const Rx = vu({
  ArrowLeft: hr('horiz', -1),
  ArrowRight: hr('horiz', 1),
  ArrowUp: hr('vert', -1),
  ArrowDown: hr('vert', 1)
});
function hr(n, e) {
  const t = n == 'vert' ? (e > 0 ? 'down' : 'up') : e > 0 ? 'right' : 'left';
  return function (r, s, i) {
    let o = r.selection,
      l = e > 0 ? o.$to : o.$from,
      a = o.empty;
    if (o instanceof D) {
      if (!i.endOfTextblock(t) || l.depth == 0) return !1;
      ((a = !1), (l = r.doc.resolve(e > 0 ? l.after() : l.before())));
    }
    let c = Z.findGapCursorFrom(l, e, a);
    return c ? (s && s(r.tr.setSelection(new Z(c))), !0) : !1;
  };
}
function Lx(n, e, t) {
  if (!n || !n.editable) return !1;
  let r = n.state.doc.resolve(e);
  if (!Z.valid(r)) return !1;
  let s = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return s && s.inside > -1 && I.isSelectable(n.state.doc.nodeAt(s.inside))
    ? !1
    : (n.dispatch(n.state.tr.setSelection(new Z(r))), !0);
}
function Dx(n, e) {
  if (
    e.inputType != 'insertCompositionText' ||
    !(n.state.selection instanceof Z)
  )
    return !1;
  let { $from: t } = n.state.selection,
    r = t.parent
      .contentMatchAt(t.index())
      .findWrapping(n.state.schema.nodes.text);
  if (!r) return !1;
  let s = C.empty;
  for (let o = r.length - 1; o >= 0; o--)
    s = C.from(r[o].createAndFill(null, s));
  let i = n.state.tr.replace(t.pos, t.pos, new A(s, 0, 0));
  return (i.setSelection(D.near(i.doc.resolve(t.pos + 1))), n.dispatch(i), !1);
}
function Px(n) {
  if (!(n.selection instanceof Z)) return null;
  let e = document.createElement('div');
  return (
    (e.className = 'ProseMirror-gapcursor'),
    G.create(n.doc, [ye.widget(n.selection.head, e, { key: 'gapcursor' })])
  );
}
var cs = 200,
  oe = function () {};
oe.prototype.append = function (e) {
  return e.length
    ? ((e = oe.from(e)),
      (!this.length && e) ||
        (e.length < cs && this.leafAppend(e)) ||
        (this.length < cs && e.leafPrepend(this)) ||
        this.appendInner(e))
    : this;
};
oe.prototype.prepend = function (e) {
  return e.length ? oe.from(e).append(this) : this;
};
oe.prototype.appendInner = function (e) {
  return new jx(this, e);
};
oe.prototype.slice = function (e, t) {
  return (
    e === void 0 && (e = 0),
    t === void 0 && (t = this.length),
    e >= t
      ? oe.empty
      : this.sliceInner(Math.max(0, e), Math.min(this.length, t))
  );
};
oe.prototype.get = function (e) {
  if (!(e < 0 || e >= this.length)) return this.getInner(e);
};
oe.prototype.forEach = function (e, t, r) {
  (t === void 0 && (t = 0),
    r === void 0 && (r = this.length),
    t <= r
      ? this.forEachInner(e, t, r, 0)
      : this.forEachInvertedInner(e, t, r, 0));
};
oe.prototype.map = function (e, t, r) {
  (t === void 0 && (t = 0), r === void 0 && (r = this.length));
  var s = [];
  return (
    this.forEach(
      function (i, o) {
        return s.push(e(i, o));
      },
      t,
      r
    ),
    s
  );
};
oe.from = function (e) {
  return e instanceof oe ? e : e && e.length ? new Bd(e) : oe.empty;
};
var Bd = (function (n) {
  function e(r) {
    (n.call(this), (this.values = r));
  }
  (n && (e.__proto__ = n),
    (e.prototype = Object.create(n && n.prototype)),
    (e.prototype.constructor = e));
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return (
    (e.prototype.flatten = function () {
      return this.values;
    }),
    (e.prototype.sliceInner = function (s, i) {
      return s == 0 && i == this.length ? this : new e(this.values.slice(s, i));
    }),
    (e.prototype.getInner = function (s) {
      return this.values[s];
    }),
    (e.prototype.forEachInner = function (s, i, o, l) {
      for (var a = i; a < o; a++)
        if (s(this.values[a], l + a) === !1) return !1;
    }),
    (e.prototype.forEachInvertedInner = function (s, i, o, l) {
      for (var a = i - 1; a >= o; a--)
        if (s(this.values[a], l + a) === !1) return !1;
    }),
    (e.prototype.leafAppend = function (s) {
      if (this.length + s.length <= cs)
        return new e(this.values.concat(s.flatten()));
    }),
    (e.prototype.leafPrepend = function (s) {
      if (this.length + s.length <= cs)
        return new e(s.flatten().concat(this.values));
    }),
    (t.length.get = function () {
      return this.values.length;
    }),
    (t.depth.get = function () {
      return 0;
    }),
    Object.defineProperties(e.prototype, t),
    e
  );
})(oe);
oe.empty = new Bd([]);
var jx = (function (n) {
  function e(t, r) {
    (n.call(this),
      (this.left = t),
      (this.right = r),
      (this.length = t.length + r.length),
      (this.depth = Math.max(t.depth, r.depth) + 1));
  }
  return (
    n && (e.__proto__ = n),
    (e.prototype = Object.create(n && n.prototype)),
    (e.prototype.constructor = e),
    (e.prototype.flatten = function () {
      return this.left.flatten().concat(this.right.flatten());
    }),
    (e.prototype.getInner = function (r) {
      return r < this.left.length
        ? this.left.get(r)
        : this.right.get(r - this.left.length);
    }),
    (e.prototype.forEachInner = function (r, s, i, o) {
      var l = this.left.length;
      if (
        (s < l && this.left.forEachInner(r, s, Math.min(i, l), o) === !1) ||
        (i > l &&
          this.right.forEachInner(
            r,
            Math.max(s - l, 0),
            Math.min(this.length, i) - l,
            o + l
          ) === !1)
      )
        return !1;
    }),
    (e.prototype.forEachInvertedInner = function (r, s, i, o) {
      var l = this.left.length;
      if (
        (s > l &&
          this.right.forEachInvertedInner(
            r,
            s - l,
            Math.max(i, l) - l,
            o + l
          ) === !1) ||
        (i < l &&
          this.left.forEachInvertedInner(r, Math.min(s, l), i, o) === !1)
      )
        return !1;
    }),
    (e.prototype.sliceInner = function (r, s) {
      if (r == 0 && s == this.length) return this;
      var i = this.left.length;
      return s <= i
        ? this.left.slice(r, s)
        : r >= i
          ? this.right.slice(r - i, s - i)
          : this.left.slice(r, i).append(this.right.slice(0, s - i));
    }),
    (e.prototype.leafAppend = function (r) {
      var s = this.right.leafAppend(r);
      if (s) return new e(this.left, s);
    }),
    (e.prototype.leafPrepend = function (r) {
      var s = this.left.leafPrepend(r);
      if (s) return new e(s, this.right);
    }),
    (e.prototype.appendInner = function (r) {
      return this.left.depth >= Math.max(this.right.depth, r.depth) + 1
        ? new e(this.left, new e(this.right, r))
        : new e(this, r);
    }),
    e
  );
})(oe);
const Bx = 500;
class ze {
  constructor(e, t) {
    ((this.items = e), (this.eventCount = t));
  }
  popEvent(e, t) {
    if (this.eventCount == 0) return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let s, i;
    t && ((s = this.remapping(r, this.items.length)), (i = s.maps.length));
    let o = e.tr,
      l,
      a,
      c = [],
      u = [];
    return (
      this.items.forEach(
        (d, h) => {
          if (!d.step) {
            (s || ((s = this.remapping(r, h + 1)), (i = s.maps.length)),
              i--,
              u.push(d));
            return;
          }
          if (s) {
            u.push(new Ve(d.map));
            let f = d.step.map(s.slice(i)),
              m;
            (f &&
              o.maybeStep(f).doc &&
              ((m = o.mapping.maps[o.mapping.maps.length - 1]),
              c.push(new Ve(m, void 0, void 0, c.length + u.length))),
              i--,
              m && s.appendMap(m, i));
          } else o.maybeStep(d.step);
          if (d.selection)
            return (
              (l = s ? d.selection.map(s.slice(i)) : d.selection),
              (a = new ze(
                this.items.slice(0, r).append(u.reverse().concat(c)),
                this.eventCount - 1
              )),
              !1
            );
        },
        this.items.length,
        0
      ),
      { remaining: a, transform: o, selection: l }
    );
  }
  addTransform(e, t, r, s) {
    let i = [],
      o = this.eventCount,
      l = this.items,
      a = !s && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]),
        h = new Ve(e.mapping.maps[u], d, t),
        f;
      ((f = a && a.merge(h)) &&
        ((h = f), u ? i.pop() : (l = l.slice(0, l.length - 1))),
        i.push(h),
        t && (o++, (t = void 0)),
        s || (a = h));
    }
    let c = o - r.depth;
    return (c > $x && ((l = zx(l, c)), (o -= c)), new ze(l.append(i), o));
  }
  remapping(e, t) {
    let r = new zn();
    return (
      this.items.forEach(
        (s, i) => {
          let o =
            s.mirrorOffset != null && i - s.mirrorOffset >= e
              ? r.maps.length - s.mirrorOffset
              : void 0;
          r.appendMap(s.map, o);
        },
        e,
        t
      ),
      r
    );
  }
  addMaps(e) {
    return this.eventCount == 0
      ? this
      : new ze(this.items.append(e.map(t => new Ve(t))), this.eventCount);
  }
  rebased(e, t) {
    if (!this.eventCount) return this;
    let r = [],
      s = Math.max(0, this.items.length - t),
      i = e.mapping,
      o = e.steps.length,
      l = this.eventCount;
    this.items.forEach(h => {
      h.selection && l--;
    }, s);
    let a = t;
    this.items.forEach(h => {
      let f = i.getMirror(--a);
      if (f == null) return;
      o = Math.min(o, f);
      let m = i.maps[f];
      if (h.step) {
        let g = e.steps[f].invert(e.docs[f]),
          y = h.selection && h.selection.map(i.slice(a + 1, f));
        (y && l++, r.push(new Ve(m, g, y)));
      } else r.push(new Ve(m));
    }, s);
    let c = [];
    for (let h = t; h < o; h++) c.push(new Ve(i.maps[h]));
    let u = this.items.slice(0, s).append(c).append(r),
      d = new ze(u, l);
    return (
      d.emptyItemCount() > Bx && (d = d.compress(this.items.length - r.length)),
      d
    );
  }
  emptyItemCount() {
    let e = 0;
    return (
      this.items.forEach(t => {
        t.step || e++;
      }),
      e
    );
  }
  compress(e = this.items.length) {
    let t = this.remapping(0, e),
      r = t.maps.length,
      s = [],
      i = 0;
    return (
      this.items.forEach(
        (o, l) => {
          if (l >= e) (s.push(o), o.selection && i++);
          else if (o.step) {
            let a = o.step.map(t.slice(r)),
              c = a && a.getMap();
            if ((r--, c && t.appendMap(c, r), a)) {
              let u = o.selection && o.selection.map(t.slice(r));
              u && i++;
              let d = new Ve(c.invert(), a, u),
                h,
                f = s.length - 1;
              (h = s.length && s[f].merge(d)) ? (s[f] = h) : s.push(d);
            }
          } else o.map && r--;
        },
        this.items.length,
        0
      ),
      new ze(oe.from(s.reverse()), i)
    );
  }
}
ze.empty = new ze(oe.empty, 0);
function zx(n, e) {
  let t;
  return (
    n.forEach((r, s) => {
      if (r.selection && e-- == 0) return ((t = s), !1);
    }),
    n.slice(t)
  );
}
class Ve {
  constructor(e, t, r, s) {
    ((this.map = e),
      (this.step = t),
      (this.selection = r),
      (this.mirrorOffset = s));
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t) return new Ve(t.getMap().invert(), t, this.selection);
    }
  }
}
class ct {
  constructor(e, t, r, s, i) {
    ((this.done = e),
      (this.undone = t),
      (this.prevRanges = r),
      (this.prevTime = s),
      (this.prevComposition = i));
  }
}
const $x = 20;
function Hx(n, e, t, r) {
  let s = t.getMeta(jt),
    i;
  if (s) return s.historyState;
  t.getMeta(Vx) && (n = new ct(n.done, n.undone, null, 0, -1));
  let o = t.getMeta('appendedTransaction');
  if (t.steps.length == 0) return n;
  if (o && o.getMeta(jt))
    return o.getMeta(jt).redo
      ? new ct(
          n.done.addTransform(t, void 0, r, br(e)),
          n.undone,
          wa(t.mapping.maps),
          n.prevTime,
          n.prevComposition
        )
      : new ct(
          n.done,
          n.undone.addTransform(t, void 0, r, br(e)),
          null,
          n.prevTime,
          n.prevComposition
        );
  if (
    t.getMeta('addToHistory') !== !1 &&
    !(o && o.getMeta('addToHistory') === !1)
  ) {
    let l = t.getMeta('composition'),
      a =
        n.prevTime == 0 ||
        (!o &&
          n.prevComposition != l &&
          (n.prevTime < (t.time || 0) - r.newGroupDelay ||
            !Fx(t, n.prevRanges))),
      c = o ? ai(n.prevRanges, t.mapping) : wa(t.mapping.maps);
    return new ct(
      n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, br(e)),
      ze.empty,
      c,
      t.time,
      l ?? n.prevComposition
    );
  } else
    return (i = t.getMeta('rebased'))
      ? new ct(
          n.done.rebased(t, i),
          n.undone.rebased(t, i),
          ai(n.prevRanges, t.mapping),
          n.prevTime,
          n.prevComposition
        )
      : new ct(
          n.done.addMaps(t.mapping.maps),
          n.undone.addMaps(t.mapping.maps),
          ai(n.prevRanges, t.mapping),
          n.prevTime,
          n.prevComposition
        );
}
function Fx(n, e) {
  if (!e) return !1;
  if (!n.docChanged) return !0;
  let t = !1;
  return (
    n.mapping.maps[0].forEach((r, s) => {
      for (let i = 0; i < e.length; i += 2)
        r <= e[i + 1] && s >= e[i] && (t = !0);
    }),
    t
  );
}
function wa(n) {
  let e = [];
  for (let t = n.length - 1; t >= 0 && e.length == 0; t--)
    n[t].forEach((r, s, i, o) => e.push(i, o));
  return e;
}
function ai(n, e) {
  if (!n) return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let s = e.map(n[r], 1),
      i = e.map(n[r + 1], -1);
    s <= i && t.push(s, i);
  }
  return t;
}
function _x(n, e, t) {
  let r = br(e),
    s = jt.get(e).spec.config,
    i = (t ? n.undone : n.done).popEvent(e, r);
  if (!i) return null;
  let o = i.selection.resolve(i.transform.doc),
    l = (t ? n.done : n.undone).addTransform(
      i.transform,
      e.selection.getBookmark(),
      s,
      r
    ),
    a = new ct(t ? l : i.remaining, t ? i.remaining : l, null, 0, -1);
  return i.transform.setSelection(o).setMeta(jt, { redo: t, historyState: a });
}
let ci = !1,
  Ta = null;
function br(n) {
  let e = n.plugins;
  if (Ta != e) {
    ((ci = !1), (Ta = e));
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        ci = !0;
        break;
      }
  }
  return ci;
}
const jt = new se('history'),
  Vx = new se('closeHistory');
function Wx(n = {}) {
  return (
    (n = { depth: n.depth || 100, newGroupDelay: n.newGroupDelay || 500 }),
    new X({
      key: jt,
      state: {
        init() {
          return new ct(ze.empty, ze.empty, null, 0, -1);
        },
        apply(e, t, r) {
          return Hx(t, r, e, n);
        }
      },
      config: n,
      props: {
        handleDOMEvents: {
          beforeinput(e, t) {
            let r = t.inputType,
              s = r == 'historyUndo' ? $d : r == 'historyRedo' ? Hd : null;
            return !s || !e.editable
              ? !1
              : (t.preventDefault(), s(e.state, e.dispatch));
          }
        }
      }
    })
  );
}
function zd(n, e) {
  return (t, r) => {
    let s = jt.getState(t);
    if (!s || (n ? s.undone : s.done).eventCount == 0) return !1;
    if (r) {
      let i = _x(s, t, n);
      i && r(e ? i.scrollIntoView() : i);
    }
    return !0;
  };
}
const $d = zd(!1, !0),
  Hd = zd(!0, !0);
ee.create({
  name: 'characterCount',
  addOptions() {
    return {
      limit: null,
      mode: 'textSize',
      textCounter: n => n.length,
      wordCounter: n => n.split(' ').filter(e => e !== '').length
    };
  },
  addStorage() {
    return { characters: () => 0, words: () => 0 };
  },
  onBeforeCreate() {
    ((this.storage.characters = n => {
      const e = (n == null ? void 0 : n.node) || this.editor.state.doc;
      if (((n == null ? void 0 : n.mode) || this.options.mode) === 'textSize') {
        const r = e.textBetween(0, e.content.size, void 0, ' ');
        return this.options.textCounter(r);
      }
      return e.nodeSize;
    }),
      (this.storage.words = n => {
        const e = (n == null ? void 0 : n.node) || this.editor.state.doc,
          t = e.textBetween(0, e.content.size, ' ', ' ');
        return this.options.wordCounter(t);
      }));
  },
  addProseMirrorPlugins() {
    let n = !1;
    return [
      new X({
        key: new se('characterCount'),
        appendTransaction: (e, t, r) => {
          if (n) return;
          const s = this.options.limit;
          if (s == null || s === 0) {
            n = !0;
            return;
          }
          const i = this.storage.characters({ node: r.doc });
          if (i > s) {
            const o = i - s,
              l = 0,
              a = o;
            console.warn(
              `[CharacterCount] Initial content exceeded limit of ${s} characters. Content was automatically trimmed.`
            );
            const c = r.tr.deleteRange(l, a);
            return ((n = !0), c);
          }
          n = !0;
        },
        filterTransaction: (e, t) => {
          const r = this.options.limit;
          if (!e.docChanged || r === 0 || r === null || r === void 0) return !0;
          const s = this.storage.characters({ node: t.doc }),
            i = this.storage.characters({ node: e.doc });
          if (i <= r || (s > r && i > r && i <= s)) return !0;
          if ((s > r && i > r && i > s) || !e.getMeta('paste')) return !1;
          const l = e.selection.$head.pos,
            a = i - r,
            c = l - a,
            u = l;
          return (
            e.deleteRange(c, u),
            !(this.storage.characters({ node: e.doc }) > r)
          );
        }
      })
    ];
  }
});
var Ux = ee.create({
  name: 'dropCursor',
  addOptions() {
    return { color: 'currentColor', width: 1, class: void 0 };
  },
  addProseMirrorPlugins() {
    return [Ex(this.options)];
  }
});
ee.create({
  name: 'focus',
  addOptions() {
    return { className: 'has-focus', mode: 'all' };
  },
  addProseMirrorPlugins() {
    return [
      new X({
        key: new se('focus'),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            const { isEditable: t, isFocused: r } = this.editor,
              { anchor: s } = e,
              i = [];
            if (!t || !r) return G.create(n, []);
            let o = 0;
            this.options.mode === 'deepest' &&
              n.descendants((a, c) => {
                if (a.isText) return;
                if (!(s >= c && s <= c + a.nodeSize - 1)) return !1;
                o += 1;
              });
            let l = 0;
            return (
              n.descendants((a, c) => {
                if (a.isText || !(s >= c && s <= c + a.nodeSize - 1)) return !1;
                if (
                  ((l += 1),
                  (this.options.mode === 'deepest' && o - l > 0) ||
                    (this.options.mode === 'shallowest' && l > 1))
                )
                  return this.options.mode === 'deepest';
                i.push(
                  ye.node(c, c + a.nodeSize, { class: this.options.className })
                );
              }),
              G.create(n, i)
            );
          }
        }
      })
    ];
  }
});
var qx = ee.create({
    name: 'gapCursor',
    addProseMirrorPlugins() {
      return [Ix()];
    },
    extendNodeSchema(n) {
      var e;
      const t = { name: n.name, options: n.options, storage: n.storage };
      return {
        allowGapCursor: (e = F(N(n, 'allowGapCursor', t))) != null ? e : null
      };
    }
  }),
  Ea = 'placeholder';
function Kx(n) {
  return n
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/^[0-9-]+/, '')
    .replace(/^-+/, '')
    .toLowerCase();
}
ee.create({
  name: 'placeholder',
  addOptions() {
    return {
      emptyEditorClass: 'is-editor-empty',
      emptyNodeClass: 'is-empty',
      dataAttribute: Ea,
      placeholder: 'Write something …',
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    const n = this.options.dataAttribute
      ? `data-${Kx(this.options.dataAttribute)}`
      : `data-${Ea}`;
    return [
      new X({
        key: new se('placeholder'),
        props: {
          decorations: ({ doc: e, selection: t }) => {
            const r =
                this.editor.isEditable || !this.options.showOnlyWhenEditable,
              { anchor: s } = t,
              i = [];
            if (!r) return null;
            const o = this.editor.isEmpty;
            return (
              e.descendants((l, a) => {
                const c = s >= a && s <= a + l.nodeSize,
                  u = !l.isLeaf && Cs(l);
                if (!l.type.isTextblock) return this.options.includeChildren;
                if ((c || !this.options.showOnlyCurrent) && u) {
                  const d = [this.options.emptyNodeClass];
                  o && d.push(this.options.emptyEditorClass);
                  const h = ye.node(a, a + l.nodeSize, {
                    class: d.join(' '),
                    [n]:
                      typeof this.options.placeholder == 'function'
                        ? this.options.placeholder({
                            editor: this.editor,
                            node: l,
                            pos: a,
                            hasAnchor: c
                          })
                        : this.options.placeholder
                  });
                  i.push(h);
                }
                return this.options.includeChildren;
              }),
              G.create(e, i)
            );
          }
        }
      })
    ];
  }
});
ee.create({
  name: 'selection',
  addOptions() {
    return { className: 'selection' };
  },
  addProseMirrorPlugins() {
    const { editor: n, options: e } = this;
    return [
      new X({
        key: new se('selection'),
        props: {
          decorations(t) {
            return t.selection.empty ||
              n.isFocused ||
              !n.isEditable ||
              $u(t.selection) ||
              n.view.dragging
              ? null
              : G.create(t.doc, [
                  ye.inline(t.selection.from, t.selection.to, {
                    class: e.className
                  })
                ]);
          }
        }
      })
    ];
  }
});
var Jx = 'skipTrailingNode';
function Aa({ types: n, node: e }) {
  return (
    (e && Array.isArray(n) && n.includes(e.type)) ||
    (e == null ? void 0 : e.type) === n
  );
}
var Gx = ee.create({
    name: 'trailingNode',
    addOptions() {
      return { node: void 0, notAfter: [] };
    },
    addProseMirrorPlugins() {
      var n;
      const e = new se(this.name),
        t =
          this.options.node ||
          ((n = this.editor.schema.topNodeType.contentMatch.defaultType) == null
            ? void 0
            : n.name) ||
          'paragraph',
        r = Object.entries(this.editor.schema.nodes)
          .map(([, s]) => s)
          .filter(s =>
            (this.options.notAfter || []).concat(t).includes(s.name)
          );
      return [
        new X({
          key: e,
          appendTransaction: (s, i, o) => {
            const { doc: l, tr: a, schema: c } = o,
              u = e.getState(o),
              d = l.content.size,
              h = c.nodes[t];
            if (!s.some(f => f.getMeta(Jx)) && u)
              return a.insert(d, h.create());
          },
          state: {
            init: (s, i) => {
              const o = i.tr.doc.lastChild;
              return !Aa({ node: o, types: r });
            },
            apply: (s, i) => {
              if (!s.docChanged || s.getMeta('__uniqueIDTransaction')) return i;
              const o = s.doc.lastChild;
              return !Aa({ node: o, types: r });
            }
          }
        })
      ];
    }
  }),
  Yx = ee.create({
    name: 'undoRedo',
    addOptions() {
      return { depth: 100, newGroupDelay: 500 };
    },
    addCommands() {
      return {
        undo:
          () =>
          ({ state: n, dispatch: e }) =>
            $d(n, e),
        redo:
          () =>
          ({ state: n, dispatch: e }) =>
            Hd(n, e)
      };
    },
    addProseMirrorPlugins() {
      return [Wx(this.options)];
    },
    addKeyboardShortcuts() {
      return {
        'Mod-z': () => this.editor.commands.undo(),
        'Shift-Mod-z': () => this.editor.commands.redo(),
        'Mod-y': () => this.editor.commands.redo(),
        'Mod-я': () => this.editor.commands.undo(),
        'Shift-Mod-я': () => this.editor.commands.redo()
      };
    }
  }),
  Xx = ee.create({
    name: 'starterKit',
    addExtensions() {
      var n, e, t, r;
      const s = [];
      return (
        this.options.bold !== !1 && s.push(K1.configure(this.options.bold)),
        this.options.blockquote !== !1 &&
          s.push(_1.configure(this.options.blockquote)),
        this.options.bulletList !== !1 &&
          s.push(wd.configure(this.options.bulletList)),
        this.options.code !== !1 && s.push(Y1.configure(this.options.code)),
        this.options.codeBlock !== !1 &&
          s.push(Z1.configure(this.options.codeBlock)),
        this.options.document !== !1 &&
          s.push(ex.configure(this.options.document)),
        this.options.dropcursor !== !1 &&
          s.push(Ux.configure(this.options.dropcursor)),
        this.options.gapcursor !== !1 &&
          s.push(qx.configure(this.options.gapcursor)),
        this.options.hardBreak !== !1 &&
          s.push(tx.configure(this.options.hardBreak)),
        this.options.heading !== !1 &&
          s.push(nx.configure(this.options.heading)),
        this.options.undoRedo !== !1 &&
          s.push(Yx.configure(this.options.undoRedo)),
        this.options.horizontalRule !== !1 &&
          s.push(rx.configure(this.options.horizontalRule)),
        this.options.italic !== !1 && s.push(ax.configure(this.options.italic)),
        this.options.listItem !== !1 &&
          s.push(Td.configure(this.options.listItem)),
        this.options.listKeymap !== !1 &&
          s.push(
            Rd.configure((n = this.options) == null ? void 0 : n.listKeymap)
          ),
        this.options.link !== !1 &&
          s.push(hd.configure((e = this.options) == null ? void 0 : e.link)),
        this.options.orderedList !== !1 &&
          s.push(Dd.configure(this.options.orderedList)),
        this.options.paragraph !== !1 &&
          s.push(Cx.configure(this.options.paragraph)),
        this.options.strike !== !1 && s.push(Mx.configure(this.options.strike)),
        this.options.text !== !1 && s.push(wx.configure(this.options.text)),
        this.options.underline !== !1 &&
          s.push(
            Pd.configure((t = this.options) == null ? void 0 : t.underline)
          ),
        this.options.trailingNode !== !1 &&
          s.push(
            Gx.configure((r = this.options) == null ? void 0 : r.trailingNode)
          ),
        s
      );
    }
  }),
  Qx = Xx,
  Zx = ee.create({
    name: 'textAlign',
    addOptions() {
      return {
        types: [],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: null
      };
    },
    addGlobalAttributes() {
      return [
        {
          types: this.options.types,
          attributes: {
            textAlign: {
              default: this.options.defaultAlignment,
              parseHTML: n => {
                const e = n.style.textAlign;
                return this.options.alignments.includes(e)
                  ? e
                  : this.options.defaultAlignment;
              },
              renderHTML: n =>
                n.textAlign ? { style: `text-align: ${n.textAlign}` } : {}
            }
          }
        }
      ];
    },
    addCommands() {
      return {
        setTextAlign:
          n =>
          ({ commands: e }) =>
            this.options.alignments.includes(n)
              ? this.options.types
                  .map(t => e.updateAttributes(t, { textAlign: n }))
                  .some(t => t)
              : !1,
        unsetTextAlign:
          () =>
          ({ commands: n }) =>
            this.options.types
              .map(e => n.resetAttributes(e, 'textAlign'))
              .some(e => e),
        toggleTextAlign:
          n =>
          ({ editor: e, commands: t }) =>
            this.options.alignments.includes(n)
              ? e.isActive({ textAlign: n })
                ? t.unsetTextAlign()
                : t.setTextAlign(n)
              : !1
      };
    },
    addKeyboardShortcuts() {
      return {
        'Mod-Shift-l': () => this.editor.commands.setTextAlign('left'),
        'Mod-Shift-e': () => this.editor.commands.setTextAlign('center'),
        'Mod-Shift-r': () => this.editor.commands.setTextAlign('right'),
        'Mod-Shift-j': () => this.editor.commands.setTextAlign('justify')
      };
    }
  }),
  ek = Zx,
  tk = Ke.create({
    name: 'superscript',
    addOptions() {
      return { HTMLAttributes: {} };
    },
    parseHTML() {
      return [
        { tag: 'sup' },
        {
          style: 'vertical-align',
          getAttrs(n) {
            return n !== 'super' ? !1 : null;
          }
        }
      ];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['sup', Y(this.options.HTMLAttributes, n), 0];
    },
    addCommands() {
      return {
        setSuperscript:
          () =>
          ({ commands: n }) =>
            n.setMark(this.name),
        toggleSuperscript:
          () =>
          ({ commands: n }) =>
            n.toggleMark(this.name),
        unsetSuperscript:
          () =>
          ({ commands: n }) =>
            n.unsetMark(this.name)
      };
    },
    addKeyboardShortcuts() {
      return { 'Mod-.': () => this.editor.commands.toggleSuperscript() };
    }
  }),
  nk = tk,
  rk = Ke.create({
    name: 'subscript',
    addOptions() {
      return { HTMLAttributes: {} };
    },
    parseHTML() {
      return [
        { tag: 'sub' },
        {
          style: 'vertical-align',
          getAttrs(n) {
            return n !== 'sub' ? !1 : null;
          }
        }
      ];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['sub', Y(this.options.HTMLAttributes, n), 0];
    },
    addCommands() {
      return {
        setSubscript:
          () =>
          ({ commands: n }) =>
            n.setMark(this.name),
        toggleSubscript:
          () =>
          ({ commands: n }) =>
            n.toggleMark(this.name),
        unsetSubscript:
          () =>
          ({ commands: n }) =>
            n.unsetMark(this.name)
      };
    },
    addKeyboardShortcuts() {
      return { 'Mod-,': () => this.editor.commands.toggleSubscript() };
    }
  }),
  sk = rk,
  ik = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/,
  ok = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g,
  lk = Ke.create({
    name: 'highlight',
    addOptions() {
      return { multicolor: !1, HTMLAttributes: {} };
    },
    addAttributes() {
      return this.options.multicolor
        ? {
            color: {
              default: null,
              parseHTML: n =>
                n.getAttribute('data-color') || n.style.backgroundColor,
              renderHTML: n =>
                n.color
                  ? {
                      'data-color': n.color,
                      style: `background-color: ${n.color}; color: inherit`
                    }
                  : {}
            }
          }
        : {};
    },
    parseHTML() {
      return [{ tag: 'mark' }];
    },
    renderHTML({ HTMLAttributes: n }) {
      return ['mark', Y(this.options.HTMLAttributes, n), 0];
    },
    renderMarkdown: (n, e) => `==${e.renderChildren(n)}==`,
    parseMarkdown: (n, e) =>
      e.applyMark('highlight', e.parseInline(n.tokens || [])),
    markdownTokenizer: {
      name: 'highlight',
      level: 'inline',
      start: n => n.indexOf('=='),
      tokenize(n, e, t) {
        const s = /^(==)([^=]+)(==)/.exec(n);
        if (s) {
          const i = s[2].trim(),
            o = t.inlineTokens(i);
          return { type: 'highlight', raw: s[0], text: i, tokens: o };
        }
      }
    },
    addCommands() {
      return {
        setHighlight:
          n =>
          ({ commands: e }) =>
            e.setMark(this.name, n),
        toggleHighlight:
          n =>
          ({ commands: e }) =>
            e.toggleMark(this.name, n),
        unsetHighlight:
          () =>
          ({ commands: n }) =>
            n.unsetMark(this.name)
      };
    },
    addKeyboardShortcuts() {
      return { 'Mod-Shift-h': () => this.editor.commands.toggleHighlight() };
    },
    addInputRules() {
      return [Vt({ find: ik, type: this.type })];
    },
    addPasteRules() {
      return [Ct({ find: ok, type: this.type })];
    }
  }),
  ak = lk;
const qk = () => {
  const [n, e] = O.useState(''),
    { themeConfig: t } = Zd(),
    [r, s] = O.useState(null),
    [i, o] = O.useState(null),
    l = eh(),
    { showErrorToast: a, showSuccessToast: c } = rh(),
    { mutateAsync: u, isPending: d } = sh(),
    h = th('(max-width: 768px)'),
    f = Cb({
      extensions: [
        Qx,
        Tx,
        by,
        nk,
        sk,
        ak,
        ek.configure({ types: ['heading', 'paragraph'] })
      ],
      content: '<p>Write your course description here...</p>'
    }),
    m = x => {
      if ((s(x), x)) {
        const k = new FileReader();
        ((k.onloadend = () => {
          o(k.result);
        }),
          k.readAsDataURL(x));
      } else o(null);
    },
    g = () => {
      (s(null), o(null));
    },
    y = async () => {
      var k, S;
      const x = (f == null ? void 0 : f.getHTML()) || '';
      try {
        (await u({ name: n, description: x, image: r }),
          c('Course added successfully!'),
          l(-1));
      } catch (v) {
        a(
          ((S =
            (k = v == null ? void 0 : v.response) == null ? void 0 : k.data) ==
          null
            ? void 0
            : S.message) || 'Failed to add course'
        );
      }
    },
    b = n.trim() && r && (f == null ? void 0 : f.getText().trim());
  return p.jsx(ih, {
    size: 'lg',
    py: { base: 'md', sm: 'xl' },
    px: { base: 'xs', sm: 'md' },
    children: p.jsxs(wt, {
      gap: 'lg',
      children: [
        p.jsxs(wt, {
          gap: 'sm',
          children: [
            p.jsxs(Zt, {
              justify: 'space-between',
              align: 'flex-start',
              wrap: 'wrap',
              children: [
                p.jsxs(Zt, {
                  gap: 'sm',
                  align: 'flex-start',
                  style: { flex: 1 },
                  children: [
                    p.jsx(en, {
                      variant: 'subtle',
                      color: 'gray',
                      size: h ? 'md' : 'lg',
                      onClick: () => l(-1),
                      mt: { base: 4, sm: 0 },
                      children: p.jsx(oh, { size: h ? 18 : 20 })
                    }),
                    p.jsxs(wt, {
                      gap: 4,
                      style: { flex: 1 },
                      children: [
                        p.jsx(lh, {
                          order: h ? 2 : 1,
                          children: 'Create New Course'
                        }),
                        p.jsx(Be, {
                          size: h ? 'xs' : 'sm',
                          c: 'dimmed',
                          children:
                            'Fill in the details below to create a new course'
                        })
                      ]
                    })
                  ]
                }),
                p.jsx(ah, {
                  size: h ? 'md' : 'lg',
                  variant: 'light',
                  color: 'blue',
                  mt: { base: 'xs', sm: 0 },
                  children: 'Draft'
                })
              ]
            }),
            p.jsx(ch, {})
          ]
        }),
        p.jsx(Ns, {
          shadow: 'sm',
          p: { base: 'md', sm: 'xl' },
          radius: 'md',
          withBorder: !0,
          style: {
            backgroundColor: t.headerBackgroundColor,
            color: t.color,
            borderColor: t.borderColor
          },
          children: p.jsxs(wt, {
            gap: 'lg',
            children: [
              p.jsx(be, {
                children: p.jsx(Ra, {
                  label: 'Course Name',
                  placeholder: 'Enter course name',
                  size: h ? 'sm' : 'md',
                  value: n,
                  onChange: x => e(x.target.value),
                  required: !0,
                  description: 'Give your course a clear and descriptive name',
                  styles: {
                    input: {
                      backgroundColor: t.headerBackgroundColor,
                      color: t.color,
                      borderColor: t.borderColor || '#ccc'
                    },
                    label: {
                      fontSize: h ? '14px' : '16px',
                      fontWeight: 600,
                      marginBottom: '8px',
                      color: t.color
                    },
                    description: {
                      color: t.color,
                      fontSize: h ? '11px' : '13px'
                    }
                  }
                })
              }),
              p.jsxs(be, {
                children: [
                  p.jsxs(Be, {
                    size: h ? 'sm' : 'md',
                    fw: 600,
                    mb: 'xs',
                    c: t.color,
                    children: [
                      'Course Thumbnail',
                      ' ',
                      p.jsx(Be, { component: 'span', c: 'red', children: '*' })
                    ]
                  }),
                  p.jsxs(Be, {
                    size: h ? 'xs' : 'sm',
                    c: 'dimmed',
                    mb: 'md',
                    children: [
                      'Upload a high-quality image that represents your course',
                      !h && ' (Recommended: 1280x720px)'
                    ]
                  }),
                  i
                    ? p.jsx(nh, {
                        radius: 'md',
                        withBorder: !0,
                        p: h ? 'sm' : 'md',
                        style: {
                          position: 'relative',
                          backgroundColor: t.headerBackgroundColor,
                          color: t.color,
                          borderColor: t.borderColor
                        },
                        children: p.jsx(wt, {
                          gap: 'md',
                          children: p.jsxs(Zt, {
                            gap: h ? 'sm' : 'md',
                            align: 'center',
                            wrap: h ? 'wrap' : 'nowrap',
                            children: [
                              p.jsx(hh, {
                                src: i,
                                height: h ? 80 : 120,
                                style: { maxWidth: h ? '100%' : '200px' },
                                radius: 'md',
                                fit: 'cover',
                                alt: 'Course thumbnail'
                              }),
                              p.jsxs(wt, {
                                gap: 'xs',
                                style: { flex: 1, minWidth: 0 },
                                children: [
                                  p.jsx(Be, {
                                    size: h ? 'xs' : 'sm',
                                    fw: 500,
                                    c: t.color,
                                    lineClamp: 1,
                                    children: r == null ? void 0 : r.name
                                  }),
                                  p.jsxs(Be, {
                                    size: 'xs',
                                    c: 'dimmed',
                                    children: [
                                      r ? (r.size / 1024 / 1024).toFixed(2) : 0,
                                      ' ',
                                      'MB'
                                    ]
                                  }),
                                  p.jsx(As, {
                                    variant: 'light',
                                    color: 'red',
                                    size: 'xs',
                                    leftSection: p.jsx(fh, { size: 12 }),
                                    onClick: g,
                                    style: { width: 'fit-content' },
                                    children: 'Remove'
                                  })
                                ]
                              })
                            ]
                          })
                        })
                      })
                    : p.jsx(jh, {
                        placeholder: 'Click to upload or drag and drop',
                        accept: 'image/*',
                        value: r,
                        onChange: m,
                        leftSection: p.jsx(dh, { size: h ? 16 : 18 }),
                        size: h ? 'sm' : 'md',
                        styles: {
                          input: {
                            cursor: 'pointer',
                            minHeight: h ? '80px' : '120px',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: t.headerBackgroundColor,
                            color: t.color,
                            borderColor: t.borderColor,
                            fontSize: h ? '12px' : '14px'
                          }
                        }
                      })
                ]
              }),
              p.jsxs(be, {
                children: [
                  p.jsxs(Be, {
                    size: h ? 'sm' : 'md',
                    fw: 600,
                    mb: 'xs',
                    c: t.color,
                    children: [
                      'Course Description',
                      ' ',
                      p.jsx(Be, { component: 'span', c: 'red', children: '*' })
                    ]
                  }),
                  p.jsx(Be, {
                    size: h ? 'xs' : 'sm',
                    c: 'dimmed',
                    mb: 'md',
                    children:
                      'Provide a detailed description of what students will learn'
                  }),
                  p.jsxs(E, {
                    editor: f,
                    styles: {
                      root: {
                        backgroundColor: t.headerBackgroundColor,
                        color: t.color,
                        borderColor: t.borderColor,
                        fontSize: h ? '13px' : '14px'
                      },
                      toolbar: {
                        backgroundColor: t.headerBackgroundColor,
                        color: t.color,
                        border: 'none',
                        padding: h ? '4px' : '8px',
                        gap: h ? '2px' : '4px',
                        flexWrap: 'wrap'
                      },
                      control: {
                        backgroundColor: t.headerBackgroundColor,
                        color: t.color,
                        border: 'none',
                        minWidth: h ? '28px' : '32px',
                        minHeight: h ? '28px' : '32px',
                        padding: h ? '4px' : '6px'
                      },
                      content: {
                        backgroundColor: t.headerBackgroundColor,
                        color: t.color,
                        minHeight: h ? 150 : 200,
                        padding: h ? '0.5rem' : '1rem',
                        fontSize: h ? '13px' : '14px'
                      }
                    },
                    children: [
                      p.jsxs(E.Toolbar, {
                        sticky: !0,
                        stickyOffset: h ? 0 : 60,
                        children: [
                          p.jsxs(E.ControlsGroup, {
                            children: [
                              p.jsx(E.Bold, {}),
                              p.jsx(E.Italic, {}),
                              p.jsx(E.Underline, {}),
                              p.jsx(E.Strikethrough, {}),
                              p.jsx(E.ClearFormatting, {}),
                              p.jsx(E.Highlight, {})
                            ]
                          }),
                          p.jsxs(E.ControlsGroup, {
                            children: [
                              p.jsx(E.H1, {}),
                              p.jsx(E.H2, {}),
                              p.jsx(E.H3, {}),
                              p.jsx(E.H4, {})
                            ]
                          }),
                          p.jsxs(E.ControlsGroup, {
                            children: [
                              p.jsx(E.BulletList, {}),
                              p.jsx(E.OrderedList, {})
                            ]
                          }),
                          p.jsxs(E.ControlsGroup, {
                            children: [p.jsx(E.Link, {}), p.jsx(E.Unlink, {})]
                          }),
                          p.jsxs(E.ControlsGroup, {
                            children: [
                              p.jsx(E.AlignLeft, {}),
                              p.jsx(E.AlignCenter, {}),
                              p.jsx(E.AlignJustify, {}),
                              p.jsx(E.AlignRight, {})
                            ]
                          }),
                          p.jsxs(E.ControlsGroup, {
                            children: [p.jsx(E.Undo, {}), p.jsx(E.Redo, {})]
                          })
                        ]
                      }),
                      p.jsx(E.Content, {
                        style: {
                          minHeight: h ? '200px' : '300px',
                          maxHeight: h ? '400px' : '500px',
                          overflowY: 'auto'
                        }
                      })
                    ]
                  })
                ]
              })
            ]
          })
        }),
        p.jsx(Ns, {
          shadow: 'sm',
          p: { base: 'md', sm: 'lg' },
          radius: 'md',
          withBorder: !0,
          children: p.jsxs(Zt, {
            justify: 'space-between',
            wrap: 'wrap',
            children: [
              p.jsx(As, {
                variant: 'default',
                onClick: () => l(-1),
                fullWidth: h,
                children: 'Cancel'
              }),
              p.jsx(As, {
                leftSection: p.jsx(gh, { size: 18 }),
                disabled: !b,
                loading: d,
                onClick: y,
                fullWidth: h,
                children: 'Create Course'
              })
            ]
          })
        }),
        p.jsx(Ns, {
          shadow: 'sm',
          p: { base: 'md', sm: 'lg' },
          radius: 'md',
          withBorder: !0,
          bg: 'blue.0',
          children: p.jsxs(Zt, {
            gap: h ? 'sm' : 'md',
            align: 'flex-start',
            children: [
              p.jsx(zh, { size: h ? 24 : 32, color: '#228BE6' }),
              p.jsxs(wt, {
                gap: 4,
                style: { flex: 1 },
                children: [
                  p.jsx(Be, {
                    size: h ? 'xs' : 'sm',
                    fw: 600,
                    children: 'Tips for a Great Course'
                  }),
                  p.jsxs(Be, {
                    size: 'xs',
                    c: 'dimmed',
                    style: { lineHeight: 1.6 },
                    children: [
                      '• Use a clear, high-resolution thumbnail image',
                      p.jsx('br', {}),
                      '• Write a compelling description that highlights key learning outcomes',
                      p.jsx('br', {}),
                      '• Keep your course name concise and descriptive',
                      p.jsx('br', {}),
                      '• Include what students will achieve after completing the course'
                    ]
                  })
                ]
              })
            ]
          })
        })
      ]
    })
  });
};
export { qk as default };
