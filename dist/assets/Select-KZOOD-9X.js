import { e as r, f as Pe, u as je, i as Ee, j as a } from './index-Cn_-nzwF.js';
import { a as Fe } from './Input-kzRYOXAd.js';
import {
  g as Ve,
  a as ke,
  u as Re,
  C as d,
  O as Be
} from './OptionsDropdown-B_GLZDf8.js';
import { I as W } from './InputBase-CO8vJiWZ.js';
import { u as U } from './use-uncontrolled-C8lBt68W.js';
function Ne(p) {
  const f = r.useRef(void 0);
  return (
    r.useEffect(() => {
      f.current = p;
    }, [p]),
    f.current
  );
}
const Ae = {
    withCheckIcon: !0,
    allowDeselect: !0,
    checkIconPosition: 'left',
    openOnFocus: !0
  },
  $ = Pe((p, f) => {
    const V = je('Select', Ae, p),
      {
        classNames: q,
        styles: G,
        unstyled: h,
        vars: Me,
        dropdownOpened: J,
        defaultDropdownOpened: K,
        onDropdownClose: _,
        onDropdownOpen: v,
        onFocus: w,
        onBlur: C,
        onClick: y,
        onChange: Q,
        data: k,
        value: b,
        defaultValue: X,
        selectFirstOptionOnChange: D,
        selectFirstOptionOnDropdownOpen: Y,
        onOptionSubmit: I,
        comboboxProps: Z,
        readOnly: m,
        disabled: g,
        filter: ee,
        limit: te,
        withScrollArea: oe,
        maxDropdownHeight: ne,
        size: P,
        searchable: c,
        rightSection: se,
        checkIconPosition: le,
        withCheckIcon: ae,
        withAlignedLabels: re,
        nothingFoundMessage: R,
        name: ce,
        form: ie,
        searchValue: ue,
        defaultSearchValue: de,
        onSearchChange: pe,
        allowDeselect: fe,
        error: B,
        rightSectionPointerEvents: he,
        id: be,
        clearable: me,
        clearButtonProps: ge,
        hiddenInputProps: Se,
        renderOption: Oe,
        onClear: j,
        autoComplete: xe,
        scrollAreaProps: _e,
        __defaultRightSection: Te,
        __clearSection: Le,
        __clearable: He,
        chevronColor: ve,
        autoSelectOnBlur: N,
        openOnFocus: we,
        attributes: A,
        ...S
      } = V,
      E = r.useMemo(() => Ve(k), [k]),
      O = r.useRef({}),
      n = r.useMemo(() => ke(E), [E]),
      M = Ee(be),
      [e, T, L] = U({
        value: b,
        defaultValue: X,
        finalValue: null,
        onChange: Q
      }),
      l = typeof e == 'string' ? (e in n ? n[e] : O.current[e]) : void 0,
      u = Ne(l),
      [x, Ce, ye] = U({
        value: ue,
        defaultValue: de,
        finalValue: l ? l.label : '',
        onChange: pe
      }),
      o = Re({
        opened: J,
        defaultOpened: K,
        onDropdownOpen: () => {
          (v == null || v(),
            Y
              ? o.selectFirstOption()
              : o.updateSelectedOptionIndex('active', { scrollIntoView: !0 }));
        },
        onDropdownClose: () => {
          (_ == null || _(), setTimeout(o.resetSelectedOption, 0));
        }
      }),
      i = t => {
        (Ce(t), o.resetSelectedOption());
      },
      { resolvedClassNames: H, resolvedStyles: z } = Fe({
        props: V,
        styles: G,
        classNames: q
      });
    (r.useEffect(() => {
      D && o.selectFirstOption();
    }, [D, x]),
      r.useEffect(() => {
        (b === null && i(''),
          typeof b == 'string' &&
            l &&
            ((u == null ? void 0 : u.value) !== l.value ||
              (u == null ? void 0 : u.label) !== l.label) &&
            i(l.label));
      }, [b, l]),
      r.useEffect(() => {
        var t, s;
        !L &&
          !ye &&
          i(
            typeof e == 'string'
              ? e in n
                ? (t = n[e]) == null
                  ? void 0
                  : t.label
                : ((s = O.current[e]) == null ? void 0 : s.label) || ''
              : ''
          );
      }, [n, e]),
      r.useEffect(() => {
        e && e in n && (O.current[e] = n[e]);
      }, [n, e]));
    const De = a.jsx(d.ClearButton, {
        ...ge,
        onClear: () => {
          (T(null, null), i(''), j == null || j());
        }
      }),
      Ie = me && !!e && !g && !m;
    return a.jsxs(a.Fragment, {
      children: [
        a.jsxs(d, {
          store: o,
          __staticSelector: 'Select',
          classNames: H,
          styles: z,
          unstyled: h,
          readOnly: m,
          size: P,
          attributes: A,
          keepMounted: N,
          onOptionSubmit: t => {
            I == null || I(t);
            const s = fe && n[t].value === e ? null : n[t],
              F = s ? s.value : null;
            (F !== e && T(F, s),
              !L &&
                i(
                  (typeof F == 'string' && (s == null ? void 0 : s.label)) || ''
                ),
              o.closeDropdown());
          },
          ...Z,
          children: [
            a.jsx(d.Target, {
              targetType: c ? 'input' : 'button',
              autoComplete: xe,
              children: a.jsx(W, {
                id: M,
                ref: f,
                __defaultRightSection: a.jsx(d.Chevron, {
                  size: P,
                  error: B,
                  unstyled: h,
                  color: ve
                }),
                __clearSection: De,
                __clearable: Ie,
                rightSection: se,
                rightSectionPointerEvents: he || 'none',
                ...S,
                size: P,
                __staticSelector: 'Select',
                disabled: g,
                readOnly: m || !c,
                value: x,
                onChange: t => {
                  (i(t.currentTarget.value),
                    o.openDropdown(),
                    D && o.selectFirstOption());
                },
                onFocus: t => {
                  (we && c && o.openDropdown(), w == null || w(t));
                },
                onBlur: t => {
                  (N && o.clickSelectedOption(), c && o.closeDropdown());
                  const s =
                    typeof e == 'string' && (e in n ? n[e] : O.current[e]);
                  (i((s && s.label) || ''), C == null || C(t));
                },
                onClick: t => {
                  (c ? o.openDropdown() : o.toggleDropdown(),
                    y == null || y(t));
                },
                classNames: H,
                styles: z,
                unstyled: h,
                pointer: !c,
                error: B,
                attributes: A
              })
            }),
            a.jsx(Be, {
              data: E,
              hidden: m || g,
              filter: ee,
              search: x,
              limit: te,
              hiddenWhenEmpty: !R,
              withScrollArea: oe,
              maxDropdownHeight: ne,
              filterOptions: !!c && (l == null ? void 0 : l.label) !== x,
              value: e,
              checkIconPosition: le,
              withCheckIcon: ae,
              withAlignedLabels: re,
              nothingFoundMessage: R,
              unstyled: h,
              labelId: S.label ? `${M}-label` : void 0,
              'aria-label': S.label ? void 0 : S['aria-label'],
              renderOption: Oe,
              scrollAreaProps: _e
            })
          ]
        }),
        a.jsx(d.HiddenInput, {
          value: e,
          name: ce,
          form: ie,
          disabled: g,
          ...Se
        })
      ]
    });
  });
$.classes = { ...W.classes, ...d.classes };
$.displayName = '@mantine/core/Select';
export { $ as S };
