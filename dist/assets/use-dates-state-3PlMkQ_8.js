import {
  d as s,
  t as B,
  H as q,
  u as G
} from './pick-calendar-levels-props-DunTV9xS.js';
import { f as J, j as u, Q as K, ah as X, e as k } from './index-Cn_-nzwF.js';
import { u as Y } from './use-input-props-CLa6mLr2.js';
import { I as _ } from './Input-kzRYOXAd.js';
import { P as A } from './Popover-C5NzMGSx.js';
function ee({ minDate: r, maxDate: t }) {
  const o = s();
  return !r && !t
    ? B(o)
    : r && s(o).isBefore(r)
      ? B(r)
      : t && s(o).isAfter(t)
        ? B(t)
        : B(o);
}
var E = { input: 'm_6fa5e2aa' };
const T = J((r, t) => {
  const {
      inputProps: o,
      wrapperProps: h,
      placeholder: S,
      classNames: p,
      styles: R,
      unstyled: d,
      popoverProps: e,
      modalProps: l,
      dropdownType: f,
      children: m,
      formattedValue: g,
      dropdownHandlers: c,
      dropdownOpened: I,
      onClick: C,
      clearable: b,
      onClear: j,
      clearButtonProps: P,
      rightSection: w,
      shouldClear: D,
      readOnly: n,
      disabled: a,
      value: i,
      name: y,
      form: z,
      type: H,
      onDropdownClose: N,
      withTime: Q,
      ...U
    } = Y('PickerInputBase', { size: 'sm' }, r),
    W = u.jsx(_.ClearButton, { onClick: j, unstyled: d, ...P }),
    F = () => {
      (H === 'range' && Array.isArray(i) && i[0] && !i[1] && j(), c.close());
    };
  return u.jsxs(u.Fragment, {
    children: [
      f === 'modal' &&
        !n &&
        u.jsx(K, {
          opened: I,
          onClose: F,
          withCloseButton: !1,
          size: 'auto',
          'data-dates-modal': !0,
          unstyled: d,
          ...l,
          children: m
        }),
      u.jsx(_.Wrapper, {
        ...h,
        children: u.jsxs(A, {
          position: 'bottom-start',
          opened: I,
          trapFocus: !0,
          returnFocus: !1,
          unstyled: d,
          onClose: N,
          ...e,
          disabled: (e == null ? void 0 : e.disabled) || f === 'modal' || n,
          onChange: x => {
            var O;
            x ||
              ((O = e == null ? void 0 : e.onClose) == null || O.call(e), F());
          },
          children: [
            u.jsx(A.Target, {
              children: u.jsx(_, {
                'data-dates-input': !0,
                'data-read-only': n || void 0,
                disabled: a,
                component: 'button',
                type: 'button',
                multiline: !0,
                onClick: x => {
                  (C == null || C(x), c.toggle());
                },
                __clearSection: W,
                __clearable: b && D && !n && !a,
                rightSection: w,
                ...o,
                ref: t,
                classNames: {
                  ...p,
                  input: X(E.input, p == null ? void 0 : p.input)
                },
                ...U,
                children:
                  g ||
                  u.jsx(_.Placeholder, {
                    error: o.error,
                    unstyled: d,
                    classNames: p,
                    styles: R,
                    __staticSelector: o.__staticSelector,
                    children: S
                  })
              })
            }),
            u.jsx(A.Dropdown, { 'data-dates-dropdown': !0, children: m })
          ]
        })
      }),
      u.jsx(q, { value: i, name: y, form: z, type: H, withTime: Q })
    ]
  });
});
T.classes = E;
T.displayName = '@mantine/dates/PickerInputBase';
function V(r, t) {
  const o = [...t].sort((h, S) => (s(h).isAfter(s(S)) ? 1 : -1));
  return (
    s(o[0]).startOf('day').subtract(1, 'ms').isBefore(r) &&
    s(o[1]).endOf('day').add(1, 'ms').isAfter(r)
  );
}
function ne({
  type: r,
  level: t,
  value: o,
  defaultValue: h,
  onChange: S,
  allowSingleDateInRange: p,
  allowDeselect: R,
  onMouseLeave: d
}) {
  const [e, l] = G({ type: r, value: o, defaultValue: h, onChange: S }),
    [f, m] = k.useState(r === 'range' && e[0] && !e[1] ? e[0] : null),
    [g, c] = k.useState(null),
    I = n => {
      if (r === 'range') {
        if (f && !e[1]) {
          if (s(n).isSame(f, t) && !p) {
            (m(null), c(null), l([null, null]));
            return;
          }
          const a = [n, f];
          (a.sort((i, y) => (s(i).isAfter(s(y)) ? 1 : -1)),
            l(a),
            c(null),
            m(null));
          return;
        }
        if (e[0] && !e[1] && s(n).isSame(e[0], t) && !p) {
          (m(null), c(null), l([null, null]));
          return;
        }
        (l([n, null]), c(null), m(n));
        return;
      }
      if (r === 'multiple') {
        e.some(a => s(a).isSame(n, t))
          ? l(e.filter(a => !s(a).isSame(n, t)))
          : l([...e, n]);
        return;
      }
      e && R && s(n).isSame(e, t) ? l(null) : l(n);
    },
    C = n => (f && g ? V(n, [g, f]) : e[0] && e[1] ? V(n, e) : !1),
    b =
      r === 'range'
        ? n => {
            (d == null || d(n), c(null));
          }
        : d,
    j = n => (e[0] && s(n).isSame(e[0], t) ? !(g && s(g).isBefore(e[0])) : !1),
    P = n =>
      e[1]
        ? s(n).isSame(e[1], t)
        : !e[0] || !g
          ? !1
          : s(g).isBefore(e[0]) && s(n).isSame(e[0], t),
    w = n => {
      if (r === 'range')
        return {
          selected: e.some(i => i && s(i).isSame(n, t)),
          inRange: C(n),
          firstInRange: j(n),
          lastInRange: P(n),
          'data-autofocus': (!!e[0] && s(e[0]).isSame(n, t)) || void 0
        };
      if (r === 'multiple')
        return {
          selected: e.some(i => i && s(i).isSame(n, t)),
          'data-autofocus': (!!e[0] && s(e[0]).isSame(n, t)) || void 0
        };
      const a = s(e).isSame(n, t);
      return { selected: a, 'data-autofocus': a || void 0 };
    },
    D = r === 'range' && f ? c : () => {};
  return (
    k.useEffect(() => {
      if (r === 'range')
        if (e[0] && !e[1]) m(e[0]);
        else {
          const n = e[0] == null && e[1] == null,
            a = e[0] != null && e[1] != null;
          (n || a) && (m(null), c(null));
        }
    }, [e]),
    {
      onDateChange: I,
      onRootMouseLeave: b,
      onHoveredDateChange: D,
      getControlProps: w,
      _value: e,
      setValue: l
    }
  );
}
export { T as P, ee as g, ne as u };
