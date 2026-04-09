import {
  a9 as Se,
  f as G,
  u as L,
  a as U,
  j as l,
  B as ae,
  c as Pe,
  g as q,
  aa as Ps,
  a1 as xs,
  ab as Os,
  e as W,
  i as _s,
  ac as ws
} from './index-Cn_-nzwF.js';
import { u as Cs, a as Is } from './Input-kzRYOXAd.js';
import {
  i as Ds,
  g as js,
  a as zs,
  u as Ns,
  C as N,
  O as Fs
} from './OptionsDropdown-B_GLZDf8.js';
import { I as xe } from './InputBase-CO8vJiWZ.js';
import { u as be } from './use-uncontrolled-C8lBt68W.js';
const [Vs, oe] = Se();
var B = {
  root: 'm_7cda1cd6',
  'root--default': 'm_44da308b',
  'root--contrast': 'm_e3a01f8',
  label: 'm_1e0e6180',
  remove: 'm_ae386778',
  group: 'm_1dcfd90b'
};
const [ks, Es] = Se(),
  Ms = Pe((h, { gap: o }, { size: t }) => ({
    group: { '--pg-gap': o !== void 0 ? q(o) : q(t, 'pg-gap') }
  })),
  ie = G((h, o) => {
    const t = L('PillGroup', null, h),
      {
        classNames: y,
        className: i,
        style: n,
        styles: f,
        unstyled: a,
        vars: I,
        size: g,
        disabled: b,
        attributes: v,
        ...d
      } = t,
      e = oe(),
      c = (e == null ? void 0 : e.size) || g || void 0,
      S = U({
        name: 'PillGroup',
        classes: B,
        props: t,
        className: i,
        style: n,
        classNames: y,
        styles: f,
        unstyled: a,
        attributes: v,
        vars: I,
        varsResolver: Ms,
        stylesCtx: { size: c },
        rootSelector: 'group'
      });
    return l.jsx(ks, {
      value: { size: c, disabled: b },
      children: l.jsx(ae, { ref: o, size: c, ...S('group'), ...d })
    });
  });
ie.classes = B;
ie.displayName = '@mantine/core/PillGroup';
const Rs = { variant: 'default' },
  Gs = Pe((h, { radius: o }, { size: t }) => ({
    root: {
      '--pill-fz': q(t, 'pill-fz'),
      '--pill-height': q(t, 'pill-height'),
      '--pill-radius': o === void 0 ? void 0 : xs(o)
    }
  })),
  R = G((h, o) => {
    const t = L('Pill', Rs, h),
      {
        classNames: y,
        className: i,
        style: n,
        styles: f,
        unstyled: a,
        vars: I,
        variant: g,
        children: b,
        withRemoveButton: v,
        onRemove: d,
        removeButtonProps: e,
        radius: c,
        size: S,
        disabled: u,
        mod: P,
        attributes: D,
        ...w
      } = t,
      m = Es(),
      V = oe(),
      F = S || (m == null ? void 0 : m.size) || void 0,
      $ =
        (V == null ? void 0 : V.variant) === 'filled'
          ? 'contrast'
          : g || 'default',
      k = U({
        name: 'Pill',
        classes: B,
        props: t,
        className: i,
        style: n,
        classNames: y,
        styles: f,
        unstyled: a,
        attributes: D,
        vars: I,
        varsResolver: Gs,
        stylesCtx: { size: F }
      });
    return l.jsxs(ae, {
      component: 'span',
      ref: o,
      variant: $,
      size: F,
      ...k('root', { variant: $ }),
      mod: [
        {
          'with-remove': v && !u,
          disabled: u || (m == null ? void 0 : m.disabled)
        },
        P
      ],
      ...w,
      children: [
        l.jsx('span', { ...k('label'), children: b }),
        v &&
          l.jsx(Ps, {
            variant: 'transparent',
            radius: c,
            tabIndex: -1,
            'aria-hidden': !0,
            unstyled: a,
            ...e,
            ...k('remove', {
              className: e == null ? void 0 : e.className,
              style: e == null ? void 0 : e.style
            }),
            onMouseDown: C => {
              var j;
              (C.preventDefault(),
                C.stopPropagation(),
                (j = e == null ? void 0 : e.onMouseDown) == null ||
                  j.call(e, C));
            },
            onClick: C => {
              var j;
              (C.stopPropagation(),
                d == null || d(),
                (j = e == null ? void 0 : e.onClick) == null || j.call(e, C));
            }
          })
      ]
    });
  });
R.classes = B;
R.displayName = '@mantine/core/Pill';
R.Group = ie;
var Oe = { field: 'm_45c4369d' };
const Ls = { type: 'visible' },
  ne = G((h, o) => {
    const t = L('PillsInputField', Ls, h),
      {
        classNames: y,
        className: i,
        style: n,
        styles: f,
        unstyled: a,
        vars: I,
        type: g,
        disabled: b,
        id: v,
        pointer: d,
        mod: e,
        attributes: c,
        ...S
      } = t,
      u = oe(),
      P = Cs(),
      D = U({
        name: 'PillsInputField',
        classes: Oe,
        props: t,
        className: i,
        style: n,
        classNames: y,
        styles: f,
        unstyled: a,
        attributes: c,
        rootSelector: 'field'
      }),
      w = b || (u == null ? void 0 : u.disabled);
    return l.jsx(ae, {
      component: 'input',
      ref: Os(o, u == null ? void 0 : u.fieldRef),
      'data-type': g,
      disabled: w,
      mod: [{ disabled: w, pointer: d }, e],
      ...D('field'),
      ...S,
      id: (P == null ? void 0 : P.inputId) || v,
      'aria-invalid': u == null ? void 0 : u.hasError,
      'aria-describedby': P == null ? void 0 : P.describedBy,
      type: 'text',
      onMouseDown: m => !d && m.stopPropagation()
    });
  });
ne.classes = Oe;
ne.displayName = '@mantine/core/PillsInputField';
const $s = { size: 'sm' },
  K = G((h, o) => {
    const t = L('PillsInput', $s, h),
      {
        children: y,
        onMouseDown: i,
        onClick: n,
        size: f,
        disabled: a,
        __staticSelector: I,
        error: g,
        variant: b,
        ...v
      } = t,
      d = W.useRef(null);
    return l.jsx(Vs, {
      value: { fieldRef: d, size: f, disabled: a, hasError: !!g, variant: b },
      children: l.jsx(xe, {
        size: f,
        error: g,
        variant: b,
        component: 'div',
        ref: o,
        'data-no-overflow': !0,
        onMouseDown: e => {
          var c;
          (e.preventDefault(),
            i == null || i(e),
            (c = d.current) == null || c.focus());
        },
        onClick: e => {
          var S;
          e.preventDefault();
          const c = e.currentTarget.closest('fieldset');
          (c != null && c.disabled) ||
            ((S = d.current) == null || S.focus(), n == null || n(e));
        },
        ...v,
        multiline: !0,
        disabled: a,
        __staticSelector: I || 'PillsInput',
        withAria: !1,
        children: y
      })
    });
  });
K.displayName = '@mantine/core/PillsInput';
K.Field = ne;
function As({ data: h, value: o }) {
  const t = o.map(i => i.trim().toLowerCase());
  return h.reduce(
    (i, n) => (
      Ds(n)
        ? i.push({
            group: n.group,
            items: n.items.filter(
              f => t.indexOf(f.value.toLowerCase().trim()) === -1
            )
          })
        : t.indexOf(n.value.toLowerCase().trim()) === -1 && i.push(n),
      i
    ),
    []
  );
}
const ve = { xs: 41, sm: 50, md: 60, lg: 72, xl: 89 },
  Ts = {
    maxValues: 1 / 0,
    withCheckIcon: !0,
    checkIconPosition: 'left',
    hiddenInputValuesDivider: ',',
    clearSearchOnChange: !0,
    openOnFocus: !0,
    size: 'sm'
  },
  _e = G((h, o) => {
    const t = L('MultiSelect', Ts, h),
      {
        classNames: y,
        className: i,
        style: n,
        styles: f,
        unstyled: a,
        vars: I,
        size: g,
        value: b,
        defaultValue: v,
        onChange: d,
        onKeyDown: e,
        variant: c,
        data: S,
        dropdownOpened: u,
        defaultDropdownOpened: P,
        onDropdownOpen: D,
        onDropdownClose: w,
        selectFirstOptionOnChange: m,
        selectFirstOptionOnDropdownOpen: V,
        onOptionSubmit: F,
        comboboxProps: $,
        filter: k,
        limit: C,
        withScrollArea: j,
        maxDropdownHeight: we,
        searchValue: Ce,
        defaultSearchValue: Ie,
        onSearchChange: De,
        readOnly: E,
        disabled: z,
        onFocus: J,
        onBlur: Q,
        radius: je,
        rightSection: ze,
        rightSectionWidth: Ne,
        rightSectionPointerEvents: re,
        rightSectionProps: Fe,
        leftSection: Ve,
        leftSectionWidth: ke,
        leftSectionPointerEvents: Ee,
        leftSectionProps: Me,
        inputContainer: Re,
        inputWrapperOrder: Ge,
        withAsterisk: Le,
        labelProps: $e,
        descriptionProps: Ae,
        errorProps: Te,
        wrapperProps: He,
        description: We,
        label: X,
        error: ce,
        maxValues: qe,
        searchable: x,
        nothingFoundMessage: de,
        withCheckIcon: Ke,
        withAlignedLabels: Ue,
        checkIconPosition: Be,
        hidePickedOptions: Je,
        withErrorStyles: Qe,
        name: Xe,
        form: Ye,
        id: Ze,
        clearable: es,
        clearButtonProps: ss,
        hiddenInputProps: ts,
        placeholder: ue,
        hiddenInputValuesDivider: ls,
        required: as,
        mod: os,
        renderOption: is,
        onRemove: O,
        onClear: Y,
        scrollAreaProps: ns,
        chevronColor: rs,
        attributes: A,
        clearSearchOnChange: cs,
        openOnFocus: ds,
        ...pe
      } = t,
      Z = _s(Ze),
      ee = js(S),
      _ = zs(ee),
      he = W.useRef({}),
      p = Ns({
        opened: u,
        defaultOpened: P,
        onDropdownOpen: () => {
          (D == null || D(), V && p.selectFirstOption());
        },
        onDropdownClose: () => {
          (w == null || w(), p.resetSelectedOption());
        }
      }),
      {
        styleProps: us,
        rest: { type: Hs, autoComplete: ps, ...hs }
      } = ws(pe),
      [r, M] = be({ value: b, defaultValue: v, finalValue: [], onChange: d }),
      [T, fs] = be({
        value: Ce,
        defaultValue: Ie,
        finalValue: '',
        onChange: De
      }),
      H = s => {
        (fs(s), p.resetSelectedOption());
      },
      se = U({
        name: 'MultiSelect',
        classes: {},
        props: t,
        classNames: y,
        styles: f,
        unstyled: a,
        attributes: A
      }),
      { resolvedClassNames: fe, resolvedStyles: ge } = Is({
        props: t,
        styles: f,
        classNames: y
      }),
      gs = s => {
        (e == null || e(s),
          s.key === ' ' && !x && (s.preventDefault(), p.toggleDropdown()),
          s.key === 'Backspace' &&
            T.length === 0 &&
            r.length > 0 &&
            (O == null || O(r[r.length - 1]), M(r.slice(0, r.length - 1))));
      },
      ms = r.map((s, te) => {
        var ye;
        const le = _[s] || he.current[s];
        return l.jsx(
          R,
          {
            withRemoveButton: !E && !((ye = _[s]) != null && ye.disabled),
            onRemove: () => {
              (M(r.filter(Ss => s !== Ss)), O == null || O(s));
            },
            unstyled: a,
            disabled: z,
            ...se('pill'),
            children: (le == null ? void 0 : le.label) || s
          },
          `${s}-${te}`
        );
      });
    (W.useEffect(() => {
      m && p.selectFirstOption();
    }, [m, T]),
      W.useEffect(() => {
        r.forEach(s => {
          s in _ && (he.current[s] = _[s]);
        });
      }, [_, r]));
    const ys = l.jsx(N.ClearButton, {
        ...ss,
        onClear: () => {
          (Y == null || Y(), M([]), H(''));
        }
      }),
      bs = As({ data: ee, value: r }),
      me = es && r.length > 0 && !z && !E,
      vs = me ? { paddingInlineEnd: ve[g] ?? ve.sm } : void 0;
    return l.jsxs(l.Fragment, {
      children: [
        l.jsxs(N, {
          store: p,
          classNames: fe,
          styles: ge,
          unstyled: a,
          size: g,
          readOnly: E,
          __staticSelector: 'MultiSelect',
          attributes: A,
          onOptionSubmit: s => {
            (F == null || F(s),
              cs && H(''),
              p.updateSelectedOptionIndex('selected'),
              r.includes(_[s].value)
                ? (M(r.filter(te => te !== _[s].value)),
                  O == null || O(_[s].value))
                : r.length < qe && M([...r, _[s].value]));
          },
          ...$,
          children: [
            l.jsx(N.DropdownTarget, {
              children: l.jsx(K, {
                ...us,
                __staticSelector: 'MultiSelect',
                classNames: fe,
                styles: ge,
                unstyled: a,
                size: g,
                className: i,
                style: n,
                variant: c,
                disabled: z,
                radius: je,
                __defaultRightSection: l.jsx(N.Chevron, {
                  size: g,
                  error: ce,
                  unstyled: a,
                  color: rs
                }),
                __clearSection: ys,
                __clearable: me,
                rightSection: ze,
                rightSectionPointerEvents: re || 'none',
                rightSectionWidth: Ne,
                rightSectionProps: Fe,
                leftSection: Ve,
                leftSectionWidth: ke,
                leftSectionPointerEvents: Ee,
                leftSectionProps: Me,
                inputContainer: Re,
                inputWrapperOrder: Ge,
                withAsterisk: Le,
                labelProps: $e,
                descriptionProps: Ae,
                errorProps: Te,
                wrapperProps: He,
                description: We,
                label: X,
                error: ce,
                withErrorStyles: Qe,
                __stylesApiProps: {
                  ...t,
                  rightSectionPointerEvents: re || 'none',
                  multiline: !0
                },
                pointer: !x,
                onClick: () => (x ? p.openDropdown() : p.toggleDropdown()),
                'data-expanded': p.dropdownOpened || void 0,
                id: Z,
                required: as,
                mod: os,
                attributes: A,
                children: l.jsxs(R.Group, {
                  attributes: A,
                  disabled: z,
                  unstyled: a,
                  ...se('pillsList', { style: vs }),
                  children: [
                    ms,
                    l.jsx(N.EventsTarget, {
                      autoComplete: ps,
                      children: l.jsx(K.Field, {
                        ...hs,
                        ref: o,
                        id: Z,
                        placeholder: ue,
                        type: !x && !ue ? 'hidden' : 'visible',
                        ...se('inputField'),
                        unstyled: a,
                        onFocus: s => {
                          (J == null || J(s), ds && x && p.openDropdown());
                        },
                        onBlur: s => {
                          (Q == null || Q(s), p.closeDropdown(), H(''));
                        },
                        onKeyDown: gs,
                        value: T,
                        onChange: s => {
                          (H(s.currentTarget.value),
                            x && p.openDropdown(),
                            m && p.selectFirstOption());
                        },
                        disabled: z,
                        readOnly: E || !x,
                        pointer: !x
                      })
                    })
                  ]
                })
              })
            }),
            l.jsx(Fs, {
              data: Je ? bs : ee,
              hidden: E || z,
              filter: k,
              search: T,
              limit: C,
              hiddenWhenEmpty: !de,
              withScrollArea: j,
              maxDropdownHeight: we,
              filterOptions: x,
              value: r,
              checkIconPosition: Be,
              withCheckIcon: Ke,
              withAlignedLabels: Ue,
              nothingFoundMessage: de,
              unstyled: a,
              labelId: X ? `${Z}-label` : void 0,
              'aria-label': X ? void 0 : pe['aria-label'],
              renderOption: is,
              scrollAreaProps: ns
            })
          ]
        }),
        l.jsx(N.HiddenInput, {
          name: Xe,
          valuesDivider: ls,
          value: r,
          form: Ye,
          disabled: z,
          ...ts
        })
      ]
    });
  });
_e.classes = { ...xe.classes, ...N.classes };
_e.displayName = '@mantine/core/MultiSelect';
export { _e as M };
