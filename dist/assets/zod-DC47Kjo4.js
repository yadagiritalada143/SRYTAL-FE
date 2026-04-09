import { q as V } from './index-Cn_-nzwF.js';
var Ge = r => r.type === 'checkbox',
  Oe = r => r instanceof Date,
  ie = r => r == null;
const wr = r => typeof r == 'object';
var G = r => !ie(r) && !Array.isArray(r) && wr(r) && !Oe(r),
  Ar = r =>
    G(r) && r.target ? (Ge(r.target) ? r.target.checked : r.target.value) : r,
  Vr = (r, e) =>
    e
      .split('.')
      .some((t, s, a) => !isNaN(Number(t)) && r.has(a.slice(0, s).join('.'))),
  Jr = r => {
    const e = r.constructor && r.constructor.prototype;
    return G(e) && e.hasOwnProperty('isPrototypeOf');
  },
  Dt =
    typeof window < 'u' &&
    typeof window.HTMLElement < 'u' &&
    typeof document < 'u';
function B(r) {
  if (r instanceof Date) return new Date(r);
  const e = typeof FileList < 'u' && r instanceof FileList;
  if (Dt && (r instanceof Blob || e)) return r;
  const t = Array.isArray(r);
  if (!t && !(G(r) && Jr(r))) return r;
  const s = t ? [] : Object.create(Object.getPrototypeOf(r));
  for (const a in r)
    Object.prototype.hasOwnProperty.call(r, a) && (s[a] = B(r[a]));
  return s;
}
var st = r => /^\w*$/.test(r),
  P = r => r === void 0,
  at = r => (Array.isArray(r) ? r.filter(Boolean) : []),
  Zt = r => at(r.replace(/["|']|\]/g, '').split(/\.|\[/)),
  m = (r, e, t) => {
    if (!e || !G(r)) return t;
    const s = (st(e) ? [e] : Zt(e)).reduce((a, n) => (ie(a) ? a : a[n]), r);
    return P(s) || s === r ? (P(r[e]) ? t : r[e]) : s;
  },
  ue = r => typeof r == 'boolean',
  se = r => typeof r == 'function',
  j = (r, e, t) => {
    let s = -1;
    const a = st(e) ? [e] : Zt(e),
      n = a.length,
      i = n - 1;
    for (; ++s < n; ) {
      const u = a[s];
      let c = t;
      if (s !== i) {
        const f = r[u];
        c = G(f) || Array.isArray(f) ? f : isNaN(+a[s + 1]) ? {} : [];
      }
      if (u === '__proto__' || u === 'constructor' || u === 'prototype') return;
      ((r[u] = c), (r = r[u]));
    }
  };
const ke = {
    BLUR: 'blur',
    FOCUS_OUT: 'focusout',
    CHANGE: 'change',
    SUBMIT: 'submit',
    TRIGGER: 'trigger',
    VALID: 'valid'
  },
  le = {
    onBlur: 'onBlur',
    onChange: 'onChange',
    onSubmit: 'onSubmit',
    onTouched: 'onTouched',
    all: 'all'
  },
  me = {
    max: 'max',
    min: 'min',
    maxLength: 'maxLength',
    minLength: 'minLength',
    pattern: 'pattern',
    required: 'required',
    validate: 'validate'
  },
  ht = 'form',
  Cr = 'root',
  Sr = V.createContext(null);
Sr.displayName = 'HookFormControlContext';
const nt = () => V.useContext(Sr);
var Tr = (r, e, t, s = !0) => {
  const a = { defaultValues: e._defaultValues };
  for (const n in r)
    Object.defineProperty(a, n, {
      get: () => {
        const i = n;
        return (
          e._proxyFormState[i] !== le.all &&
            (e._proxyFormState[i] = !s || le.all),
          t && (t[i] = !0),
          r[i]
        );
      }
    });
  return a;
};
const it = typeof window < 'u' ? V.useLayoutEffect : V.useEffect;
function Qr(r) {
  const e = nt(),
    { control: t = e, disabled: s, name: a, exact: n } = r || {},
    [i, u] = V.useState(t._formState),
    c = V.useRef({
      isDirty: !1,
      isLoading: !1,
      dirtyFields: !1,
      touchedFields: !1,
      validatingFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1
    });
  return (
    it(
      () =>
        t._subscribe({
          name: a,
          formState: c.current,
          exact: n,
          callback: f => {
            !s && u({ ...t._formState, ...f });
          }
        }),
      [a, s, n]
    ),
    V.useEffect(() => {
      c.current.isValid && t._setValid(!0);
    }, [t]),
    V.useMemo(() => Tr(i, t, c.current, !1), [i, t])
  );
}
var ae = r => typeof r == 'string',
  At = (r, e, t, s, a) =>
    ae(r)
      ? (s && e.watch.add(r), m(t, r, a))
      : Array.isArray(r)
        ? r.map(n => (s && e.watch.add(n), m(t, n)))
        : (s && (e.watchAll = !0), t),
  Vt = r => ie(r) || !wr(r);
function ye(r, e, t = new WeakSet()) {
  if (Vt(r) || Vt(e)) return Object.is(r, e);
  if (Oe(r) && Oe(e)) return Object.is(r.getTime(), e.getTime());
  const s = Object.keys(r),
    a = Object.keys(e);
  if (s.length !== a.length) return !1;
  if (t.has(r) || t.has(e)) return !0;
  (t.add(r), t.add(e));
  for (const n of s) {
    const i = r[n];
    if (!a.includes(n)) return !1;
    if (n !== 'ref') {
      const u = e[n];
      if (
        (Oe(i) && Oe(u)) ||
        ((G(i) || Array.isArray(i)) && (G(u) || Array.isArray(u)))
          ? !ye(i, u, t)
          : !Object.is(i, u)
      )
        return !1;
    }
  }
  return !0;
}
function Xr(r) {
  const e = nt(),
    {
      control: t = e,
      name: s,
      defaultValue: a,
      disabled: n,
      exact: i,
      compute: u
    } = r || {},
    c = V.useRef(a),
    f = V.useRef(u),
    C = V.useRef(void 0),
    b = V.useRef(t),
    D = V.useRef(s);
  f.current = u;
  const [F, Q] = V.useState(() => {
      const y = t._getWatch(s, c.current);
      return f.current ? f.current(y) : y;
    }),
    W = V.useCallback(
      y => {
        const g = At(s, t._names, y || t._formValues, !1, c.current);
        return f.current ? f.current(g) : g;
      },
      [t._formValues, t._names, s]
    ),
    J = V.useCallback(
      y => {
        if (!n) {
          const g = At(s, t._names, y || t._formValues, !1, c.current);
          if (f.current) {
            const S = f.current(g);
            ye(S, C.current) || (Q(S), (C.current = S));
          } else Q(g);
        }
      },
      [t._formValues, t._names, n, s]
    );
  (it(
    () => (
      (b.current !== t || !ye(D.current, s)) &&
        ((b.current = t), (D.current = s), J()),
      t._subscribe({
        name: s,
        formState: { values: !0 },
        exact: i,
        callback: y => {
          J(y.values);
        }
      })
    ),
    [t, i, s, J]
  ),
    V.useEffect(() => t._removeUnmounted()));
  const q = b.current !== t,
    E = D.current,
    X = V.useMemo(() => {
      if (n) return null;
      const y = !q && !ye(E, s);
      return q || y ? W() : null;
    }, [n, q, s, E, W]);
  return X !== null ? X : F;
}
function Kr(r) {
  const e = nt(),
    {
      name: t,
      disabled: s,
      control: a = e,
      shouldUnregister: n,
      defaultValue: i,
      exact: u = !0
    } = r,
    c = Vr(a._names.array, t),
    f = V.useMemo(
      () => m(a._formValues, t, m(a._defaultValues, t, i)),
      [a, t, i]
    ),
    C = Xr({ control: a, name: t, defaultValue: f, exact: u }),
    b = Qr({ control: a, name: t, exact: u }),
    D = V.useRef(r),
    F = V.useRef(void 0),
    Q = V.useRef(
      a.register(t, {
        ...r.rules,
        value: C,
        ...(ue(r.disabled) ? { disabled: r.disabled } : {})
      })
    );
  D.current = r;
  const W = V.useMemo(
      () =>
        Object.defineProperties(
          {},
          {
            invalid: { enumerable: !0, get: () => !!m(b.errors, t) },
            isDirty: { enumerable: !0, get: () => !!m(b.dirtyFields, t) },
            isTouched: { enumerable: !0, get: () => !!m(b.touchedFields, t) },
            isValidating: {
              enumerable: !0,
              get: () => !!m(b.validatingFields, t)
            },
            error: { enumerable: !0, get: () => m(b.errors, t) }
          }
        ),
      [b, t]
    ),
    J = V.useCallback(
      y =>
        Q.current.onChange({
          target: { value: Ar(y), name: t },
          type: ke.CHANGE
        }),
      [t]
    ),
    q = V.useCallback(
      () =>
        Q.current.onBlur({
          target: { value: m(a._formValues, t), name: t },
          type: ke.BLUR
        }),
      [t, a._formValues]
    ),
    E = V.useCallback(
      y => {
        const g = m(a._fields, t);
        g &&
          g._f &&
          y &&
          (g._f.ref = {
            focus: () => se(y.focus) && y.focus(),
            select: () => se(y.select) && y.select(),
            setCustomValidity: S =>
              se(y.setCustomValidity) && y.setCustomValidity(S),
            reportValidity: () => se(y.reportValidity) && y.reportValidity()
          });
      },
      [a._fields, t]
    ),
    X = V.useMemo(
      () => ({
        name: t,
        value: C,
        ...(ue(s) || b.disabled ? { disabled: b.disabled || s } : {}),
        onChange: J,
        onBlur: q,
        ref: E
      }),
      [t, s, b.disabled, J, q, E, C]
    );
  return (
    V.useEffect(() => {
      const y = a._options.shouldUnregister || n,
        g = F.current;
      (g && g !== t && !c && a.unregister(g),
        a.register(t, {
          ...D.current.rules,
          ...(ue(D.current.disabled) ? { disabled: D.current.disabled } : {})
        }));
      const S = (L, fe) => {
        const K = m(a._fields, L);
        K && K._f && (K._f.mount = fe);
      };
      if ((S(t, !0), y)) {
        const L = B(m(a._options.defaultValues, t, D.current.defaultValue));
        (j(a._defaultValues, t, L),
          P(m(a._formValues, t)) && j(a._formValues, t, L));
      }
      return (
        !c && a.register(t),
        (F.current = t),
        () => {
          (c ? y && !a._state.action : y) ? a.unregister(t) : S(t, !1);
        }
      );
    }, [t, a, c, n]),
    V.useEffect(() => {
      a._setDisabledField({ disabled: s, name: t });
    }, [s, t, a]),
    V.useMemo(() => ({ field: X, formState: b, fieldState: W }), [X, b, W])
  );
}
const Hs = r => r.render(Kr(r)),
  es = V.createContext(null);
es.displayName = 'HookFormContext';
var Or = (r, e, t, s, a) =>
    e
      ? {
          ...t[r],
          types: { ...(t[r] && t[r].types ? t[r].types : {}), [s]: a || !0 }
        }
      : {},
  oe = r => (Array.isArray(r) ? r : [r]),
  Xt = () => {
    let r = [];
    return {
      get observers() {
        return r;
      },
      next: a => {
        for (const n of r) n.next && n.next(a);
      },
      subscribe: a => (
        r.push(a),
        {
          unsubscribe: () => {
            r = r.filter(n => n !== a);
          }
        }
      ),
      unsubscribe: () => {
        r = [];
      }
    };
  };
function Fr(r, e) {
  const t = {};
  for (const s in r)
    if (r.hasOwnProperty(s)) {
      const a = r[s],
        n = e[s];
      if (a && G(a) && n) {
        const i = Fr(a, n);
        G(i) && (t[s] = i);
      } else r[s] && (t[s] = n);
    }
  return t;
}
var te = r => G(r) && !Object.keys(r).length,
  jt = r => r.type === 'file',
  Qe = r => {
    if (!Dt) return !1;
    const e = r ? r.ownerDocument : 0;
    return (
      r instanceof
      (e && e.defaultView ? e.defaultView.HTMLElement : HTMLElement)
    );
  },
  Er = r => r.type === 'select-multiple',
  Mt = r => r.type === 'radio',
  ts = r => Mt(r) || Ge(r),
  mt = r => Qe(r) && r.isConnected;
function rs(r, e) {
  const t = e.slice(0, -1).length;
  let s = 0;
  for (; s < t; ) r = P(r) ? s++ : r[e[s++]];
  return r;
}
function ss(r) {
  for (const e in r) if (r.hasOwnProperty(e) && !P(r[e])) return !1;
  return !0;
}
function H(r, e) {
  const t = Array.isArray(e) ? e : st(e) ? [e] : Zt(e),
    s = t.length === 1 ? r : rs(r, t),
    a = t.length - 1,
    n = t[a];
  return (
    s && delete s[n],
    a !== 0 &&
      ((G(s) && te(s)) || (Array.isArray(s) && ss(s))) &&
      H(r, t.slice(0, -1)),
    r
  );
}
var as = r => {
  for (const e in r) if (se(r[e])) return !0;
  return !1;
};
function Rr(r) {
  return Array.isArray(r) || (G(r) && !as(r));
}
function Ct(r, e = {}) {
  for (const t in r) {
    const s = r[t];
    Rr(s)
      ? ((e[t] = Array.isArray(s) ? [] : {}), Ct(s, e[t]))
      : P(s) || (e[t] = !0);
  }
  return e;
}
function Be(r, e, t) {
  t || (t = Ct(e));
  for (const s in r) {
    const a = r[s];
    if (Rr(a))
      P(e) || Vt(t[s])
        ? (t[s] = Ct(a, Array.isArray(a) ? [] : {}))
        : Be(a, ie(e) ? {} : e[s], t[s]);
    else {
      const n = e[s];
      t[s] = !ye(a, n);
    }
  }
  return t;
}
const Kt = { value: !1, isValid: !1 },
  er = { value: !0, isValid: !0 };
var Nr = r => {
    if (Array.isArray(r)) {
      if (r.length > 1) {
        const e = r
          .filter(t => t && t.checked && !t.disabled)
          .map(t => t.value);
        return { value: e, isValid: !!e.length };
      }
      return r[0].checked && !r[0].disabled
        ? r[0].attributes && !P(r[0].attributes.value)
          ? P(r[0].value) || r[0].value === ''
            ? er
            : { value: r[0].value, isValid: !0 }
          : er
        : Kt;
    }
    return Kt;
  },
  Ir = (r, { valueAsNumber: e, valueAsDate: t, setValueAs: s }) =>
    P(r)
      ? r
      : e
        ? r === ''
          ? NaN
          : r && +r
        : t && ae(r)
          ? new Date(r)
          : s
            ? s(r)
            : r;
const tr = { isValid: !1, value: null };
var Dr = r =>
  Array.isArray(r)
    ? r.reduce(
        (e, t) =>
          t && t.checked && !t.disabled ? { isValid: !0, value: t.value } : e,
        tr
      )
    : tr;
function rr(r) {
  const e = r.ref;
  return jt(e)
    ? e.files
    : Mt(e)
      ? Dr(r.refs).value
      : Er(e)
        ? [...e.selectedOptions].map(({ value: t }) => t)
        : Ge(e)
          ? Nr(r.refs).value
          : Ir(P(e.value) ? r.ref.value : e.value, r);
}
var ns = r => r.substring(0, r.search(/\.\d+(\.|$)/)) || r,
  is = (r, e, t, s) => {
    const a = {};
    for (const n of r) {
      const i = m(e, n);
      i && j(a, n, i._f);
    }
    return {
      criteriaMode: t,
      names: [...r],
      fields: a,
      shouldUseNativeValidation: s
    };
  },
  Xe = r => r instanceof RegExp,
  Pe = r =>
    P(r)
      ? r
      : Xe(r)
        ? r.source
        : G(r)
          ? Xe(r.value)
            ? r.value.source
            : r.value
          : r,
  Ne = r => ({
    isOnSubmit: !r || r === le.onSubmit,
    isOnBlur: r === le.onBlur,
    isOnChange: r === le.onChange,
    isOnAll: r === le.all,
    isOnTouch: r === le.onTouched
  });
const sr = 'AsyncFunction';
var os = r =>
    !!r &&
    !!r.validate &&
    !!(
      (se(r.validate) && r.validate.constructor.name === sr) ||
      (G(r.validate) &&
        Object.values(r.validate).find(e => e.constructor.name === sr))
    ),
  us = r =>
    r.mount &&
    (r.required ||
      r.min ||
      r.max ||
      r.maxLength ||
      r.minLength ||
      r.pattern ||
      r.validate),
  St = (r, e, t) =>
    !t &&
    (e.watchAll ||
      e.watch.has(r) ||
      [...e.watch].some(
        s => r.startsWith(s) && /^\.\w+/.test(r.slice(s.length))
      ));
const Ie = (r, e, t, s) => {
  for (const a of t || Object.keys(r)) {
    const n = m(r, a);
    if (n) {
      const { _f: i, ...u } = n;
      if (i) {
        if (i.refs && i.refs[0] && e(i.refs[0], a) && !s) return !0;
        if (i.ref && e(i.ref, i.name) && !s) return !0;
        if (Ie(u, e)) break;
      } else if (G(u) && Ie(u, e)) break;
    }
  }
};
function ar(r, e, t) {
  const s = m(r, t);
  if (s || st(t)) return { error: s, name: t };
  const a = t.split('.');
  for (; a.length; ) {
    const n = a.join('.'),
      i = m(e, n),
      u = m(r, n);
    if (i && !Array.isArray(i) && t !== n) return { name: t };
    if (u && u.type) return { name: n, error: u };
    if (u && u.root && u.root.type) return { name: `${n}.root`, error: u.root };
    a.pop();
  }
  return { name: t };
}
var ds = (r, e, t, s) => {
    t(r);
    const { name: a, ...n } = r;
    return (
      te(n) ||
      Object.keys(n).length >= Object.keys(e).length ||
      Object.keys(n).find(i => e[i] === (!s || le.all))
    );
  },
  ls = (r, e, t) =>
    !r ||
    !e ||
    r === e ||
    oe(r).some(s => s && (t ? s === e : s.startsWith(e) || e.startsWith(s))),
  cs = (r, e, t, s, a) =>
    a.isOnAll
      ? !1
      : !t && a.isOnTouch
        ? !(e || r)
        : (t ? s.isOnBlur : a.isOnBlur)
          ? !r
          : (t ? s.isOnChange : a.isOnChange)
            ? r
            : !0,
  fs = (r, e) => !at(m(r, e)).length && H(r, e),
  Zr = (r, e, t) => {
    const s = oe(m(r, t));
    return (j(s, Cr, e[t]), j(r, t, s), r);
  };
function nr(r, e, t = 'validate') {
  if (ae(r) || (Array.isArray(r) && r.every(ae)) || (ue(r) && !r))
    return { type: t, message: ae(r) ? r : '', ref: e };
}
var Ee = r => (G(r) && !Xe(r) ? r : { value: r, message: '' }),
  Tt = async (r, e, t, s, a, n) => {
    const {
        ref: i,
        refs: u,
        required: c,
        maxLength: f,
        minLength: C,
        min: b,
        max: D,
        pattern: F,
        validate: Q,
        name: W,
        valueAsNumber: J,
        mount: q
      } = r._f,
      E = m(t, W);
    if (!q || e.has(W)) return {};
    const X = u ? u[0] : i,
      y = I => {
        a &&
          X.reportValidity &&
          (X.setCustomValidity(ue(I) ? '' : I || ''), X.reportValidity());
      },
      g = {},
      S = Mt(i),
      L = Ge(i),
      fe = S || L,
      K =
        ((J || jt(i)) && P(i.value) && P(E)) ||
        (Qe(i) && i.value === '') ||
        E === '' ||
        (Array.isArray(E) && !E.length),
      Te = Or.bind(null, W, s, g),
      $e = (I, U, z, ee = me.maxLength, ge = me.minLength) => {
        const he = I ? U : z;
        g[W] = {
          type: I ? ee : ge,
          message: he,
          ref: i,
          ...Te(I ? ee : ge, he)
        };
      };
    if (
      n
        ? !Array.isArray(E) || !E.length
        : c &&
          ((!fe && (K || ie(E))) ||
            (ue(E) && !E) ||
            (L && !Nr(u).isValid) ||
            (S && !Dr(u).isValid))
    ) {
      const { value: I, message: U } = ae(c)
        ? { value: !!c, message: c }
        : Ee(c);
      if (
        I &&
        ((g[W] = {
          type: me.required,
          message: U,
          ref: X,
          ...Te(me.required, U)
        }),
        !s)
      )
        return (y(U), g);
    }
    if (!K && (!ie(b) || !ie(D))) {
      let I, U;
      const z = Ee(D),
        ee = Ee(b);
      if (!ie(E) && !isNaN(E)) {
        const ge = i.valueAsNumber || (E && +E);
        (ie(z.value) || (I = ge > z.value),
          ie(ee.value) || (U = ge < ee.value));
      } else {
        const ge = i.valueAsDate || new Date(E),
          he = Ye => new Date(new Date().toDateString() + ' ' + Ye),
          Ue = i.type == 'time',
          xe = i.type == 'week';
        (ae(z.value) &&
          E &&
          (I = Ue
            ? he(E) > he(z.value)
            : xe
              ? E > z.value
              : ge > new Date(z.value)),
          ae(ee.value) &&
            E &&
            (U = Ue
              ? he(E) < he(ee.value)
              : xe
                ? E < ee.value
                : ge < new Date(ee.value)));
      }
      if ((I || U) && ($e(!!I, z.message, ee.message, me.max, me.min), !s))
        return (y(g[W].message), g);
    }
    if ((f || C) && !K && (ae(E) || (n && Array.isArray(E)))) {
      const I = Ee(f),
        U = Ee(C),
        z = !ie(I.value) && E.length > +I.value,
        ee = !ie(U.value) && E.length < +U.value;
      if ((z || ee) && ($e(z, I.message, U.message), !s))
        return (y(g[W].message), g);
    }
    if (F && !K && ae(E)) {
      const { value: I, message: U } = Ee(F);
      if (
        Xe(I) &&
        !E.match(I) &&
        ((g[W] = {
          type: me.pattern,
          message: U,
          ref: i,
          ...Te(me.pattern, U)
        }),
        !s)
      )
        return (y(U), g);
    }
    if (Q) {
      if (se(Q)) {
        const I = await Q(E, t),
          U = nr(I, X);
        if (U && ((g[W] = { ...U, ...Te(me.validate, U.message) }), !s))
          return (y(U.message), g);
      } else if (G(Q)) {
        let I = {};
        for (const U in Q) {
          if (!te(I) && !s) break;
          const z = nr(await Q[U](E, t), X, U);
          z &&
            ((I = { ...z, ...Te(U, z.message) }),
            y(z.message),
            s && (g[W] = I));
        }
        if (!te(I) && ((g[W] = { ref: X, ...I }), !s)) return g;
      }
    }
    return (y(!0), g);
  };
const hs = {
  mode: le.onSubmit,
  reValidateMode: le.onChange,
  shouldFocusError: !0
};
function ms(r = {}) {
  let e = { ...hs, ...r },
    t = {
      submitCount: 0,
      isDirty: !1,
      isReady: !1,
      isLoading: se(e.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: e.errors || {},
      disabled: e.disabled || !1
    },
    s = {},
    a =
      G(e.defaultValues) || G(e.values)
        ? B(e.defaultValues || e.values) || {}
        : {},
    n = e.shouldUnregister ? {} : B(a),
    i = { action: !1, mount: !1, watch: !1, keepIsValid: !1 },
    u = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
      registerName: new Set()
    },
    c,
    f = 0;
  const C = {
      isDirty: !1,
      dirtyFields: !1,
      validatingFields: !1,
      touchedFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1
    },
    b = { ...C };
  let D = { ...b };
  const F = { array: Xt(), state: Xt() },
    Q = e.criteriaMode === le.all,
    W = o => d => {
      (clearTimeout(f), (f = setTimeout(o, d)));
    },
    J = async o => {
      if (!i.keepIsValid && !e.disabled && (b.isValid || D.isValid || o)) {
        let d;
        (e.resolver
          ? ((d = te((await K()).errors)), q())
          : (d = await I({
              fields: s,
              onlyCheckValid: !0,
              eventType: ke.VALID
            })),
          d !== t.isValid && F.state.next({ isValid: d }));
      }
    },
    q = (o, d) => {
      !e.disabled &&
        (b.isValidating ||
          b.validatingFields ||
          D.isValidating ||
          D.validatingFields) &&
        ((o || Array.from(u.mount)).forEach(l => {
          l && (d ? j(t.validatingFields, l, d) : H(t.validatingFields, l));
        }),
        F.state.next({
          validatingFields: t.validatingFields,
          isValidating: !te(t.validatingFields)
        }));
    },
    E = o => {
      const d = Be(a, n),
        l = ns(o);
      j(t.dirtyFields, l, m(d, l));
    },
    X = (o, d = [], l, v, p = !0, _ = !0) => {
      if (v && l && !e.disabled) {
        if (((i.action = !0), _ && Array.isArray(m(s, o)))) {
          const k = l(m(s, o), v.argA, v.argB);
          p && j(s, o, k);
        }
        if (_ && Array.isArray(m(t.errors, o))) {
          const k = l(m(t.errors, o), v.argA, v.argB);
          (p && j(t.errors, o, k), fs(t.errors, o));
        }
        if (
          (b.touchedFields || D.touchedFields) &&
          _ &&
          Array.isArray(m(t.touchedFields, o))
        ) {
          const k = l(m(t.touchedFields, o), v.argA, v.argB);
          p && j(t.touchedFields, o, k);
        }
        ((b.dirtyFields || D.dirtyFields) && E(o),
          F.state.next({
            name: o,
            isDirty: z(o, d),
            dirtyFields: t.dirtyFields,
            errors: t.errors,
            isValid: t.isValid
          }));
      } else j(n, o, d);
    },
    y = (o, d) => {
      (j(t.errors, o, d), F.state.next({ errors: t.errors }));
    },
    g = o => {
      ((t.errors = o), F.state.next({ errors: t.errors, isValid: !1 }));
    },
    S = (o, d, l, v) => {
      const p = m(s, o);
      if (p) {
        const _ = m(n, o, P(l) ? m(a, o) : l);
        (P(_) || (v && v.defaultChecked) || d
          ? j(n, o, d ? _ : rr(p._f))
          : he(o, _),
          i.mount && !i.action && J());
      }
    },
    L = (o, d, l, v, p) => {
      let _ = !1,
        k = !1;
      const R = { name: o };
      if (!e.disabled) {
        if (!l || v) {
          (b.isDirty || D.isDirty) &&
            ((k = t.isDirty),
            (t.isDirty = R.isDirty = z()),
            (_ = k !== R.isDirty));
          const $ = ye(m(a, o), d);
          ((k = !!m(t.dirtyFields, o)),
            $ ? H(t.dirtyFields, o) : j(t.dirtyFields, o, !0),
            (R.dirtyFields = t.dirtyFields),
            (_ = _ || ((b.dirtyFields || D.dirtyFields) && k !== !$)));
        }
        if (l) {
          const $ = m(t.touchedFields, o);
          $ ||
            (j(t.touchedFields, o, l),
            (R.touchedFields = t.touchedFields),
            (_ = _ || ((b.touchedFields || D.touchedFields) && $ !== l)));
        }
        _ && p && F.state.next(R);
      }
      return _ ? R : {};
    },
    fe = (o, d, l, v) => {
      const p = m(t.errors, o),
        _ = (b.isValid || D.isValid) && ue(d) && t.isValid !== d;
      if (
        (e.delayError && l
          ? ((c = W(() => y(o, l))), c(e.delayError))
          : (clearTimeout(f),
            (c = null),
            l ? j(t.errors, o, l) : H(t.errors, o)),
        (l ? !ye(p, l) : p) || !te(v) || _)
      ) {
        const k = {
          ...v,
          ...(_ && ue(d) ? { isValid: d } : {}),
          errors: t.errors,
          name: o
        };
        ((t = { ...t, ...k }), F.state.next(k));
      }
    },
    K = async o => (
      q(o, !0),
      await e.resolver(
        n,
        e.context,
        is(o || u.mount, s, e.criteriaMode, e.shouldUseNativeValidation)
      )
    ),
    Te = async o => {
      const { errors: d } = await K(o);
      if ((q(o), o))
        for (const l of o) {
          const v = m(d, l);
          v ? j(t.errors, l, v) : H(t.errors, l);
        }
      else t.errors = d;
      return d;
    },
    $e = async ({ name: o, eventType: d }) => {
      if (r.validate) {
        const l = await r.validate({
          formValues: n,
          formState: t,
          name: o,
          eventType: d
        });
        if (G(l))
          for (const v in l)
            l[v] &&
              Je(`${ht}.${v}`, {
                message: ae(l.message) ? l.message : '',
                type: me.validate
              });
        else
          ae(l) || !l
            ? Je(ht, { message: l || '', type: me.validate })
            : Bt(ht);
        return l;
      }
      return !0;
    },
    I = async ({
      fields: o,
      onlyCheckValid: d,
      name: l,
      eventType: v,
      context: p = { valid: !0, runRootValidation: !1 }
    }) => {
      if (
        r.validate &&
        ((p.runRootValidation = !0),
        !(await $e({ name: l, eventType: v })) && ((p.valid = !1), d))
      )
        return p.valid;
      for (const _ in o) {
        const k = o[_];
        if (k) {
          const { _f: R, ...$ } = k;
          if (R) {
            const re = u.array.has(R.name),
              _e = k._f && os(k._f);
            _e && b.validatingFields && q([R.name], !0);
            const ne = await Tt(
              k,
              u.disabled,
              n,
              Q,
              e.shouldUseNativeValidation && !d,
              re
            );
            if (
              (_e && b.validatingFields && q([R.name]),
              (ne[R.name] && ((p.valid = !1), d)) ||
                (!d &&
                  (m(ne, R.name)
                    ? re
                      ? Zr(t.errors, ne, R.name)
                      : j(t.errors, R.name, ne[R.name])
                    : H(t.errors, R.name)),
                r.shouldUseNativeValidation && ne[R.name]))
            )
              break;
          }
          !te($) &&
            (await I({
              context: p,
              onlyCheckValid: d,
              fields: $,
              name: _,
              eventType: v
            }));
        }
      }
      return p.valid;
    },
    U = () => {
      for (const o of u.unMount) {
        const d = m(s, o);
        d &&
          (d._f.refs ? d._f.refs.every(l => !mt(l)) : !mt(d._f.ref)) &&
          ut(o);
      }
      u.unMount = new Set();
    },
    z = (o, d) => !e.disabled && (o && d && j(n, o, d), !ye(Ut(), a)),
    ee = (o, d, l) =>
      At(o, u, { ...(i.mount ? n : P(d) ? a : ae(o) ? { [o]: d } : d) }, l, d),
    ge = o => at(m(i.mount ? n : a, o, e.shouldUnregister ? m(a, o, []) : [])),
    he = (o, d, l = {}) => {
      const v = m(s, o);
      let p = d;
      if (v) {
        const _ = v._f;
        _ &&
          (!_.disabled && j(n, o, Ir(d, _)),
          (p = Qe(_.ref) && ie(d) ? '' : d),
          Er(_.ref)
            ? [..._.ref.options].forEach(
                k => (k.selected = p.includes(k.value))
              )
            : _.refs
              ? Ge(_.ref)
                ? _.refs.forEach(k => {
                    (!k.defaultChecked || !k.disabled) &&
                      (Array.isArray(p)
                        ? (k.checked = !!p.find(R => R === k.value))
                        : (k.checked = p === k.value || !!p));
                  })
                : _.refs.forEach(k => (k.checked = k.value === p))
              : jt(_.ref)
                ? (_.ref.value = '')
                : ((_.ref.value = p),
                  _.ref.type || F.state.next({ name: o, values: B(n) })));
      }
      ((l.shouldDirty || l.shouldTouch) &&
        L(o, p, l.shouldTouch, l.shouldDirty, !0),
        l.shouldValidate && ot(o));
    },
    Ue = (o, d, l) => {
      for (const v in d) {
        if (!d.hasOwnProperty(v)) return;
        const p = d[v],
          _ = o + '.' + v,
          k = m(s, _);
        (u.array.has(o) || G(p) || (k && !k._f)) && !Oe(p)
          ? Ue(_, p, l)
          : he(_, p, l);
      }
    },
    xe = (o, d, l = {}) => {
      const v = m(s, o),
        p = u.array.has(o),
        _ = B(d);
      (j(n, o, _),
        p
          ? (F.array.next({ name: o, values: B(n) }),
            (b.isDirty || b.dirtyFields || D.isDirty || D.dirtyFields) &&
              l.shouldDirty &&
              (E(o),
              F.state.next({
                name: o,
                dirtyFields: t.dirtyFields,
                isDirty: z(o, _)
              })))
          : v && !v._f && !ie(_)
            ? Ue(o, _, l)
            : he(o, _, l),
        St(o, u)
          ? F.state.next({ ...t, name: o, values: B(n) })
          : F.state.next({ name: i.mount ? o : void 0, values: B(n) }));
    },
    Ye = async o => {
      i.mount = !0;
      const d = o.target;
      let l = d.name,
        v = !0;
      const p = m(s, l),
        _ = $ => {
          v =
            Number.isNaN($) ||
            (Oe($) && isNaN($.getTime())) ||
            ye($, m(n, l, $));
        },
        k = Ne(e.mode),
        R = Ne(e.reValidateMode);
      if (p) {
        let $, re;
        const _e = d.type ? rr(p._f) : Ar(o),
          ne = o.type === ke.BLUR || o.type === ke.FOCUS_OUT,
          Hr =
            (!us(p._f) &&
              !r.validate &&
              !e.resolver &&
              !m(t.errors, l) &&
              !p._f.deps) ||
            cs(ne, m(t.touchedFields, l), t.isSubmitted, R, k),
          ct = St(l, u, ne);
        (j(n, l, _e),
          ne
            ? (!d || !d.readOnly) && (p._f.onBlur && p._f.onBlur(o), c && c(0))
            : p._f.onChange && p._f.onChange(o));
        const ft = L(l, _e, ne),
          Gr = !te(ft) || ct;
        if ((!ne && F.state.next({ name: l, type: o.type, values: B(n) }), Hr))
          return (
            (b.isValid || D.isValid) &&
              (e.mode === 'onBlur' ? ne && J() : ne || J()),
            Gr && F.state.next({ name: l, ...(ct ? {} : ft) })
          );
        if (
          (!e.resolver &&
            r.validate &&
            (await $e({ name: l, eventType: o.type })),
          !ne && ct && F.state.next({ ...t }),
          e.resolver)
        ) {
          const { errors: Jt } = await K([l]);
          if ((q([l]), _(_e), v)) {
            const Yr = ar(t.errors, s, l),
              Qt = ar(Jt, s, Yr.name || l);
            (($ = Qt.error), (l = Qt.name), (re = te(Jt)));
          }
        } else
          (q([l], !0),
            ($ = (await Tt(p, u.disabled, n, Q, e.shouldUseNativeValidation))[
              l
            ]),
            q([l]),
            _(_e),
            v &&
              ($
                ? (re = !1)
                : (b.isValid || D.isValid) &&
                  (re = await I({
                    fields: s,
                    onlyCheckValid: !0,
                    name: l,
                    eventType: o.type
                  }))));
        v &&
          (p._f.deps &&
            (!Array.isArray(p._f.deps) || p._f.deps.length > 0) &&
            ot(p._f.deps),
          fe(l, re, $, ft));
      }
    },
    $t = (o, d) => {
      if (m(t.errors, d) && o.focus) return (o.focus(), 1);
    },
    ot = async (o, d = {}) => {
      let l, v;
      const p = oe(o);
      if (e.resolver) {
        const _ = await Te(P(o) ? o : p);
        ((l = te(_)), (v = o ? !p.some(k => m(_, k)) : l));
      } else
        o
          ? ((v = (
              await Promise.all(
                p.map(async _ => {
                  const k = m(s, _);
                  return await I({
                    fields: k && k._f ? { [_]: k } : k,
                    eventType: ke.TRIGGER
                  });
                })
              )
            ).every(Boolean)),
            !(!v && !t.isValid) && J())
          : (v = l = await I({ fields: s, name: o, eventType: ke.TRIGGER }));
      return (
        F.state.next({
          ...(!ae(o) || ((b.isValid || D.isValid) && l !== t.isValid)
            ? {}
            : { name: o }),
          ...(e.resolver || !o ? { isValid: l } : {}),
          errors: t.errors
        }),
        d.shouldFocus && !v && Ie(s, $t, o ? p : u.mount),
        v
      );
    },
    Ut = (o, d) => {
      let l = { ...(i.mount ? n : a) };
      return (
        d && (l = Fr(d.dirtyFields ? t.dirtyFields : t.touchedFields, l)),
        P(o) ? l : ae(o) ? m(l, o) : o.map(v => m(l, v))
      );
    },
    Pt = (o, d) => ({
      invalid: !!m((d || t).errors, o),
      isDirty: !!m((d || t).dirtyFields, o),
      error: m((d || t).errors, o),
      isValidating: !!m(t.validatingFields, o),
      isTouched: !!m((d || t).touchedFields, o)
    }),
    Bt = o => {
      const d = o ? oe(o) : void 0;
      (d == null || d.forEach(l => H(t.errors, l)),
        d
          ? d.forEach(l => {
              F.state.next({ name: l, errors: t.errors });
            })
          : F.state.next({ errors: {} }));
    },
    Je = (o, d, l) => {
      const v = (m(s, o, { _f: {} })._f || {}).ref,
        p = m(t.errors, o) || {},
        { ref: _, message: k, type: R, ...$ } = p;
      (j(t.errors, o, { ...$, ...d, ref: v }),
        F.state.next({ name: o, errors: t.errors, isValid: !1 }),
        l && l.shouldFocus && v && v.focus && v.focus());
    },
    Ur = (o, d) =>
      se(o)
        ? F.state.subscribe({ next: l => 'values' in l && o(ee(void 0, d), l) })
        : ee(o, d, !0),
    zt = o =>
      F.state.subscribe({
        next: d => {
          ls(o.name, d.name, o.exact) &&
            ds(d, o.formState || b, qr, o.reRenderRoot) &&
            o.callback({ values: { ...n }, ...t, ...d, defaultValues: a });
        }
      }).unsubscribe,
    Pr = o => (
      (i.mount = !0),
      (D = { ...D, ...o.formState }),
      zt({ ...o, formState: { ...C, ...o.formState } })
    ),
    ut = (o, d = {}) => {
      for (const l of o ? oe(o) : u.mount)
        (u.mount.delete(l),
          u.array.delete(l),
          d.keepValue || (H(s, l), H(n, l)),
          !d.keepError && H(t.errors, l),
          !d.keepDirty && H(t.dirtyFields, l),
          !d.keepTouched && H(t.touchedFields, l),
          !d.keepIsValidating && H(t.validatingFields, l),
          !e.shouldUnregister && !d.keepDefaultValue && H(a, l));
      (F.state.next({ values: B(n) }),
        F.state.next({ ...t, ...(d.keepDirty ? { isDirty: z() } : {}) }),
        !d.keepIsValid && J());
    },
    Wt = ({ disabled: o, name: d }) => {
      if ((ue(o) && i.mount) || o || u.disabled.has(d)) {
        const p = u.disabled.has(d) !== !!o;
        (o ? u.disabled.add(d) : u.disabled.delete(d),
          p && i.mount && !i.action && J());
      }
    },
    dt = (o, d = {}) => {
      let l = m(s, o);
      const v = ue(d.disabled) || ue(e.disabled),
        p = !u.registerName.has(o) && l && !l._f.mount;
      return (
        j(s, o, {
          ...(l || {}),
          _f: {
            ...(l && l._f ? l._f : { ref: { name: o } }),
            name: o,
            mount: !0,
            ...d
          }
        }),
        u.mount.add(o),
        l && !p
          ? Wt({ disabled: ue(d.disabled) ? d.disabled : e.disabled, name: o })
          : S(o, !0, d.value),
        {
          ...(v ? { disabled: d.disabled || e.disabled } : {}),
          ...(e.progressive
            ? {
                required: !!d.required,
                min: Pe(d.min),
                max: Pe(d.max),
                minLength: Pe(d.minLength),
                maxLength: Pe(d.maxLength),
                pattern: Pe(d.pattern)
              }
            : {}),
          name: o,
          onChange: Ye,
          onBlur: Ye,
          ref: _ => {
            if (_) {
              (u.registerName.add(o),
                dt(o, d),
                u.registerName.delete(o),
                (l = m(s, o)));
              const k =
                  (P(_.value) &&
                    _.querySelectorAll &&
                    _.querySelectorAll('input,select,textarea')[0]) ||
                  _,
                R = ts(k),
                $ = l._f.refs || [];
              if (R ? $.find(re => re === k) : k === l._f.ref) return;
              (j(s, o, {
                _f: {
                  ...l._f,
                  ...(R
                    ? {
                        refs: [
                          ...$.filter(mt),
                          k,
                          ...(Array.isArray(m(a, o)) ? [{}] : [])
                        ],
                        ref: { type: k.type, name: o }
                      }
                    : { ref: k })
                }
              }),
                S(o, !1, void 0, k));
            } else
              ((l = m(s, o, {})),
                l._f && (l._f.mount = !1),
                (e.shouldUnregister || d.shouldUnregister) &&
                  !(Vr(u.array, o) && i.action) &&
                  u.unMount.add(o));
          }
        }
      );
    },
    lt = () => e.shouldFocusError && Ie(s, $t, u.mount),
    Br = o => {
      ue(o) &&
        (F.state.next({ disabled: o }),
        Ie(
          s,
          (d, l) => {
            const v = m(s, l);
            v &&
              ((d.disabled = v._f.disabled || o),
              Array.isArray(v._f.refs) &&
                v._f.refs.forEach(p => {
                  p.disabled = v._f.disabled || o;
                }));
          },
          0,
          !1
        ));
    },
    qt = (o, d) => async l => {
      let v;
      l && (l.preventDefault && l.preventDefault(), l.persist && l.persist());
      let p = B(n);
      if ((F.state.next({ isSubmitting: !0 }), e.resolver)) {
        const { errors: _, values: k } = await K();
        (q(), (t.errors = _), (p = B(k)));
      } else await I({ fields: s, eventType: ke.SUBMIT });
      if (u.disabled.size) for (const _ of u.disabled) H(p, _);
      if ((H(t.errors, Cr), te(t.errors))) {
        F.state.next({ errors: {} });
        try {
          await o(p, l);
        } catch (_) {
          v = _;
        }
      } else (d && (await d({ ...t.errors }, l)), lt(), setTimeout(lt));
      if (
        (F.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: te(t.errors) && !v,
          submitCount: t.submitCount + 1,
          errors: t.errors
        }),
        v)
      )
        throw v;
    },
    zr = (o, d = {}) => {
      m(s, o) &&
        (P(d.defaultValue)
          ? xe(o, B(m(a, o)))
          : (xe(o, d.defaultValue), j(a, o, B(d.defaultValue))),
        d.keepTouched || H(t.touchedFields, o),
        d.keepDirty ||
          (H(t.dirtyFields, o),
          (t.isDirty = d.defaultValue ? z(o, B(m(a, o))) : z())),
        d.keepError || (H(t.errors, o), b.isValid && J()),
        F.state.next({ ...t }));
    },
    Ht = (o, d = {}) => {
      const l = o ? B(o) : a,
        v = B(l),
        p = te(o),
        _ = p ? a : v;
      if ((d.keepDefaultValues || (a = l), !d.keepValues)) {
        if (d.keepDirtyValues) {
          const k = new Set([...u.mount, ...Object.keys(Be(a, n))]);
          for (const R of Array.from(k)) {
            const $ = m(t.dirtyFields, R),
              re = m(n, R),
              _e = m(_, R);
            $ && !P(re) ? j(_, R, re) : !$ && !P(_e) && xe(R, _e);
          }
        } else {
          if (Dt && P(o))
            for (const k of u.mount) {
              const R = m(s, k);
              if (R && R._f) {
                const $ = Array.isArray(R._f.refs) ? R._f.refs[0] : R._f.ref;
                if (Qe($)) {
                  const re = $.closest('form');
                  if (re) {
                    re.reset();
                    break;
                  }
                }
              }
            }
          if (d.keepFieldsRef) for (const k of u.mount) xe(k, m(_, k));
          else s = {};
        }
        ((n = e.shouldUnregister ? (d.keepDefaultValues ? B(a) : {}) : B(_)),
          F.array.next({ values: { ..._ } }),
          F.state.next({ values: { ..._ } }));
      }
      ((u = {
        mount: d.keepDirtyValues ? u.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        registerName: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: ''
      }),
        (i.mount =
          !b.isValid ||
          !!d.keepIsValid ||
          !!d.keepDirtyValues ||
          (!e.shouldUnregister && !te(_))),
        (i.watch = !!e.shouldUnregister),
        (i.keepIsValid = !!d.keepIsValid),
        (i.action = !1),
        d.keepErrors || (t.errors = {}),
        F.state.next({
          submitCount: d.keepSubmitCount ? t.submitCount : 0,
          isDirty: p
            ? !1
            : d.keepDirty
              ? t.isDirty
              : !!(d.keepDefaultValues && !ye(o, a)),
          isSubmitted: d.keepIsSubmitted ? t.isSubmitted : !1,
          dirtyFields: p
            ? {}
            : d.keepDirtyValues
              ? d.keepDefaultValues && n
                ? Be(a, n)
                : t.dirtyFields
              : d.keepDefaultValues && o
                ? Be(a, o)
                : d.keepDirty
                  ? t.dirtyFields
                  : {},
          touchedFields: d.keepTouched ? t.touchedFields : {},
          errors: d.keepErrors ? t.errors : {},
          isSubmitSuccessful: d.keepIsSubmitSuccessful
            ? t.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
          defaultValues: a
        }));
    },
    Gt = (o, d) => Ht(se(o) ? o(n) : o, { ...e.resetOptions, ...d }),
    Wr = (o, d = {}) => {
      const l = m(s, o),
        v = l && l._f;
      if (v) {
        const p = v.refs ? v.refs[0] : v.ref;
        p.focus &&
          setTimeout(() => {
            (p.focus(), d.shouldSelect && se(p.select) && p.select());
          });
      }
    },
    qr = o => {
      t = { ...t, ...o };
    },
    Yt = {
      control: {
        register: dt,
        unregister: ut,
        getFieldState: Pt,
        handleSubmit: qt,
        setError: Je,
        _subscribe: zt,
        _runSchema: K,
        _updateIsValidating: q,
        _focusError: lt,
        _getWatch: ee,
        _getDirty: z,
        _setValid: J,
        _setFieldArray: X,
        _setDisabledField: Wt,
        _setErrors: g,
        _getFieldArray: ge,
        _reset: Ht,
        _resetDefaultValues: () =>
          se(e.defaultValues) &&
          e.defaultValues().then(o => {
            (Gt(o, e.resetOptions), F.state.next({ isLoading: !1 }));
          }),
        _removeUnmounted: U,
        _disableForm: Br,
        _subjects: F,
        _proxyFormState: b,
        get _fields() {
          return s;
        },
        get _formValues() {
          return n;
        },
        get _state() {
          return i;
        },
        set _state(o) {
          i = o;
        },
        get _defaultValues() {
          return a;
        },
        get _names() {
          return u;
        },
        set _names(o) {
          u = o;
        },
        get _formState() {
          return t;
        },
        get _options() {
          return e;
        },
        set _options(o) {
          e = { ...e, ...o };
        }
      },
      subscribe: Pr,
      trigger: ot,
      register: dt,
      handleSubmit: qt,
      watch: Ur,
      setValue: xe,
      getValues: Ut,
      reset: Gt,
      resetField: zr,
      clearErrors: Bt,
      unregister: ut,
      setError: Je,
      setFocus: Wr,
      getFieldState: Pt
    };
  return { ...Yt, formControl: Yt };
}
var be = () => {
    if (typeof crypto < 'u' && crypto.randomUUID) return crypto.randomUUID();
    const r = typeof performance > 'u' ? Date.now() : performance.now() * 1e3;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, e => {
      const t = ((Math.random() * 16 + r) % 16) | 0;
      return (e == 'x' ? t : (t & 3) | 8).toString(16);
    });
  },
  yt = (r, e, t = {}) =>
    t.shouldFocus || P(t.shouldFocus)
      ? t.focusName || `${r}.${P(t.focusIndex) ? e : t.focusIndex}.`
      : '',
  gt = (r, e) => [...r, ...oe(e)],
  _t = r => (Array.isArray(r) ? r.map(() => {}) : void 0);
function pt(r, e, t) {
  return [...r.slice(0, e), ...oe(t), ...r.slice(e)];
}
var vt = (r, e, t) =>
    Array.isArray(r)
      ? (P(r[t]) && (r[t] = void 0), r.splice(t, 0, r.splice(e, 1)[0]), r)
      : [],
  xt = (r, e) => [...oe(e), ...oe(r)];
function ys(r, e) {
  let t = 0;
  const s = [...r];
  for (const a of e) (s.splice(a - t, 1), t++);
  return at(s).length ? s : [];
}
var bt = (r, e) =>
    P(e)
      ? []
      : ys(
          r,
          oe(e).sort((t, s) => t - s)
        ),
  kt = (r, e, t) => {
    [r[e], r[t]] = [r[t], r[e]];
  },
  ir = (r, e, t) => ((r[e] = t), r);
function Gs(r) {
  const e = nt(),
    {
      control: t = e,
      name: s,
      keyName: a = 'id',
      shouldUnregister: n,
      rules: i
    } = r,
    [u, c] = V.useState(t._getFieldArray(s)),
    f = V.useRef(t._getFieldArray(s).map(be)),
    C = V.useRef(!1);
  (t._names.array.add(s),
    V.useMemo(
      () => i && u.length >= 0 && t.register(s, i),
      [t, s, u.length, i]
    ),
    it(
      () =>
        t._subjects.array.subscribe({
          next: ({ values: y, name: g }) => {
            if (g === s || !g) {
              const S = m(y, s);
              Array.isArray(S) && (c(S), (f.current = S.map(be)));
            }
          }
        }).unsubscribe,
      [t, s]
    ));
  const b = V.useCallback(
      y => {
        ((C.current = !0), t._setFieldArray(s, y));
      },
      [t, s]
    ),
    D = (y, g) => {
      const S = oe(B(y)),
        L = gt(t._getFieldArray(s), S);
      ((t._names.focus = yt(s, L.length - 1, g)),
        (f.current = gt(f.current, S.map(be))),
        b(L),
        c(L),
        t._setFieldArray(s, L, gt, { argA: _t(y) }));
    },
    F = (y, g) => {
      const S = oe(B(y)),
        L = xt(t._getFieldArray(s), S);
      ((t._names.focus = yt(s, 0, g)),
        (f.current = xt(f.current, S.map(be))),
        b(L),
        c(L),
        t._setFieldArray(s, L, xt, { argA: _t(y) }));
    },
    Q = y => {
      const g = bt(t._getFieldArray(s), y);
      ((f.current = bt(f.current, y)),
        b(g),
        c(g),
        !Array.isArray(m(t._fields, s)) && j(t._fields, s, void 0),
        t._setFieldArray(s, g, bt, { argA: y }));
    },
    W = (y, g, S) => {
      const L = oe(B(g)),
        fe = pt(t._getFieldArray(s), y, L);
      ((t._names.focus = yt(s, y, S)),
        (f.current = pt(f.current, y, L.map(be))),
        b(fe),
        c(fe),
        t._setFieldArray(s, fe, pt, { argA: y, argB: _t(g) }));
    },
    J = (y, g) => {
      const S = t._getFieldArray(s);
      (kt(S, y, g),
        kt(f.current, y, g),
        b(S),
        c(S),
        t._setFieldArray(s, S, kt, { argA: y, argB: g }, !1));
    },
    q = (y, g) => {
      const S = t._getFieldArray(s);
      (vt(S, y, g),
        vt(f.current, y, g),
        b(S),
        c(S),
        t._setFieldArray(s, S, vt, { argA: y, argB: g }, !1));
    },
    E = (y, g) => {
      const S = B(g),
        L = ir(t._getFieldArray(s), y, S);
      ((f.current = [...L].map((fe, K) =>
        !fe || K === y ? be() : f.current[K]
      )),
        b(L),
        c([...L]),
        t._setFieldArray(s, L, ir, { argA: y, argB: S }, !0, !1));
    },
    X = y => {
      const g = oe(B(y));
      ((f.current = g.map(be)),
        b([...g]),
        c([...g]),
        t._setFieldArray(s, [...g], S => S, {}, !0, !1));
    };
  return (
    V.useEffect(() => {
      if (
        ((t._state.action = !1),
        St(s, t._names) && t._subjects.state.next({ ...t._formState }),
        C.current &&
          (!Ne(t._options.mode).isOnSubmit || t._formState.isSubmitted) &&
          !Ne(t._options.reValidateMode).isOnSubmit)
      )
        if (t._options.resolver)
          t._runSchema([s]).then(y => {
            t._updateIsValidating([s]);
            const g = m(y.errors, s),
              S = m(t._formState.errors, s);
            (S
              ? (!g && S.type) ||
                (g && (S.type !== g.type || S.message !== g.message))
              : g && g.type) &&
              (g ? j(t._formState.errors, s, g) : H(t._formState.errors, s),
              t._subjects.state.next({ errors: t._formState.errors }));
          });
        else {
          const y = m(t._fields, s);
          y &&
            y._f &&
            !(
              Ne(t._options.reValidateMode).isOnSubmit &&
              Ne(t._options.mode).isOnSubmit
            ) &&
            Tt(
              y,
              t._names.disabled,
              t._formValues,
              t._options.criteriaMode === le.all,
              t._options.shouldUseNativeValidation,
              !0
            ).then(
              g =>
                !te(g) &&
                t._subjects.state.next({
                  errors: Zr(t._formState.errors, g, s)
                })
            );
        }
      (t._subjects.state.next({ name: s, values: B(t._formValues) }),
        t._names.focus &&
          Ie(t._fields, (y, g) => {
            if (t._names.focus && g.startsWith(t._names.focus) && y.focus)
              return (y.focus(), 1);
          }),
        (t._names.focus = ''),
        t._setValid(),
        (C.current = !1));
    }, [u, s, t]),
    V.useEffect(
      () => (
        !m(t._formValues, s) && t._setFieldArray(s),
        () => {
          const y = (g, S) => {
            const L = m(t._fields, g);
            L && L._f && (L._f.mount = S);
          };
          t._options.shouldUnregister || n ? t.unregister(s) : y(s, !1);
        }
      ),
      [s, t, a, n]
    ),
    {
      swap: V.useCallback(J, [b, s, t]),
      move: V.useCallback(q, [b, s, t]),
      prepend: V.useCallback(F, [b, s, t]),
      append: V.useCallback(D, [b, s, t]),
      remove: V.useCallback(Q, [b, s, t]),
      insert: V.useCallback(W, [b, s, t]),
      update: V.useCallback(E, [b, s, t]),
      replace: V.useCallback(X, [b, s, t]),
      fields: V.useMemo(
        () => u.map((y, g) => ({ ...y, [a]: f.current[g] || be() })),
        [u, a]
      )
    }
  );
}
function Ys(r = {}) {
  const e = V.useRef(void 0),
    t = V.useRef(void 0),
    [s, a] = V.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: se(r.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: r.errors || {},
      disabled: r.disabled || !1,
      isReady: !1,
      defaultValues: se(r.defaultValues) ? void 0 : r.defaultValues
    });
  if (!e.current)
    if (r.formControl)
      ((e.current = { ...r.formControl, formState: s }),
        r.defaultValues &&
          !se(r.defaultValues) &&
          r.formControl.reset(r.defaultValues, r.resetOptions));
    else {
      const { formControl: i, ...u } = ms(r);
      e.current = { ...u, formState: s };
    }
  const n = e.current.control;
  return (
    (n._options = r),
    it(() => {
      const i = n._subscribe({
        formState: n._proxyFormState,
        callback: () => a({ ...n._formState }),
        reRenderRoot: !0
      });
      return (a(u => ({ ...u, isReady: !0 })), (n._formState.isReady = !0), i);
    }, [n]),
    V.useEffect(() => n._disableForm(r.disabled), [n, r.disabled]),
    V.useEffect(() => {
      (r.mode && (n._options.mode = r.mode),
        r.reValidateMode && (n._options.reValidateMode = r.reValidateMode));
    }, [n, r.mode, r.reValidateMode]),
    V.useEffect(() => {
      r.errors && (n._setErrors(r.errors), n._focusError());
    }, [n, r.errors]),
    V.useEffect(() => {
      r.shouldUnregister && n._subjects.state.next({ values: n._getWatch() });
    }, [n, r.shouldUnregister]),
    V.useEffect(() => {
      if (n._proxyFormState.isDirty) {
        const i = n._getDirty();
        i !== s.isDirty && n._subjects.state.next({ isDirty: i });
      }
    }, [n, s.isDirty]),
    V.useEffect(() => {
      var i;
      r.values && !ye(r.values, t.current)
        ? (n._reset(r.values, {
            keepFieldsRef: !0,
            ...n._options.resetOptions
          }),
          (!((i = n._options.resetOptions) === null || i === void 0) &&
            i.keepIsValid) ||
            n._setValid(),
          (t.current = r.values),
          a(u => ({ ...u })))
        : n._resetDefaultValues();
    }, [n, r.values]),
    V.useEffect(() => {
      (n._state.mount || (n._setValid(), (n._state.mount = !0)),
        n._state.watch &&
          ((n._state.watch = !1), n._subjects.state.next({ ...n._formState })),
        n._removeUnmounted());
    }),
    (e.current.formState = V.useMemo(() => Tr(s, n), [n, s])),
    e.current
  );
}
var M;
(function (r) {
  r.assertEqual = a => {};
  function e(a) {}
  r.assertIs = e;
  function t(a) {
    throw new Error();
  }
  ((r.assertNever = t),
    (r.arrayToEnum = a => {
      const n = {};
      for (const i of a) n[i] = i;
      return n;
    }),
    (r.getValidEnumValues = a => {
      const n = r.objectKeys(a).filter(u => typeof a[a[u]] != 'number'),
        i = {};
      for (const u of n) i[u] = a[u];
      return r.objectValues(i);
    }),
    (r.objectValues = a =>
      r.objectKeys(a).map(function (n) {
        return a[n];
      })),
    (r.objectKeys =
      typeof Object.keys == 'function'
        ? a => Object.keys(a)
        : a => {
            const n = [];
            for (const i in a)
              Object.prototype.hasOwnProperty.call(a, i) && n.push(i);
            return n;
          }),
    (r.find = (a, n) => {
      for (const i of a) if (n(i)) return i;
    }),
    (r.isInteger =
      typeof Number.isInteger == 'function'
        ? a => Number.isInteger(a)
        : a =>
            typeof a == 'number' && Number.isFinite(a) && Math.floor(a) === a));
  function s(a, n = ' | ') {
    return a.map(i => (typeof i == 'string' ? `'${i}'` : i)).join(n);
  }
  ((r.joinValues = s),
    (r.jsonStringifyReplacer = (a, n) =>
      typeof n == 'bigint' ? n.toString() : n));
})(M || (M = {}));
var or;
(function (r) {
  r.mergeShapes = (e, t) => ({ ...e, ...t });
})(or || (or = {}));
const w = M.arrayToEnum([
    'string',
    'nan',
    'number',
    'integer',
    'float',
    'boolean',
    'date',
    'bigint',
    'symbol',
    'function',
    'undefined',
    'null',
    'array',
    'object',
    'unknown',
    'promise',
    'void',
    'never',
    'map',
    'set'
  ]),
  we = r => {
    switch (typeof r) {
      case 'undefined':
        return w.undefined;
      case 'string':
        return w.string;
      case 'number':
        return Number.isNaN(r) ? w.nan : w.number;
      case 'boolean':
        return w.boolean;
      case 'function':
        return w.function;
      case 'bigint':
        return w.bigint;
      case 'symbol':
        return w.symbol;
      case 'object':
        return Array.isArray(r)
          ? w.array
          : r === null
            ? w.null
            : r.then &&
                typeof r.then == 'function' &&
                r.catch &&
                typeof r.catch == 'function'
              ? w.promise
              : typeof Map < 'u' && r instanceof Map
                ? w.map
                : typeof Set < 'u' && r instanceof Set
                  ? w.set
                  : typeof Date < 'u' && r instanceof Date
                    ? w.date
                    : w.object;
      default:
        return w.unknown;
    }
  },
  h = M.arrayToEnum([
    'invalid_type',
    'invalid_literal',
    'custom',
    'invalid_union',
    'invalid_union_discriminator',
    'invalid_enum_value',
    'unrecognized_keys',
    'invalid_arguments',
    'invalid_return_type',
    'invalid_date',
    'invalid_string',
    'too_small',
    'too_big',
    'invalid_intersection_types',
    'not_multiple_of',
    'not_finite'
  ]);
class ve extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    (super(),
      (this.issues = []),
      (this.addIssue = s => {
        this.issues = [...this.issues, s];
      }),
      (this.addIssues = (s = []) => {
        this.issues = [...this.issues, ...s];
      }));
    const t = new.target.prototype;
    (Object.setPrototypeOf
      ? Object.setPrototypeOf(this, t)
      : (this.__proto__ = t),
      (this.name = 'ZodError'),
      (this.issues = e));
  }
  format(e) {
    const t =
        e ||
        function (n) {
          return n.message;
        },
      s = { _errors: [] },
      a = n => {
        for (const i of n.issues)
          if (i.code === 'invalid_union') i.unionErrors.map(a);
          else if (i.code === 'invalid_return_type') a(i.returnTypeError);
          else if (i.code === 'invalid_arguments') a(i.argumentsError);
          else if (i.path.length === 0) s._errors.push(t(i));
          else {
            let u = s,
              c = 0;
            for (; c < i.path.length; ) {
              const f = i.path[c];
              (c === i.path.length - 1
                ? ((u[f] = u[f] || { _errors: [] }), u[f]._errors.push(t(i)))
                : (u[f] = u[f] || { _errors: [] }),
                (u = u[f]),
                c++);
            }
          }
      };
    return (a(this), s);
  }
  static assert(e) {
    if (!(e instanceof ve)) throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, M.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = t => t.message) {
    const t = {},
      s = [];
    for (const a of this.issues)
      if (a.path.length > 0) {
        const n = a.path[0];
        ((t[n] = t[n] || []), t[n].push(e(a)));
      } else s.push(e(a));
    return { formErrors: s, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
ve.create = r => new ve(r);
const Ot = (r, e) => {
  let t;
  switch (r.code) {
    case h.invalid_type:
      r.received === w.undefined
        ? (t = 'Required')
        : (t = `Expected ${r.expected}, received ${r.received}`);
      break;
    case h.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(r.expected, M.jsonStringifyReplacer)}`;
      break;
    case h.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${M.joinValues(r.keys, ', ')}`;
      break;
    case h.invalid_union:
      t = 'Invalid input';
      break;
    case h.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${M.joinValues(r.options)}`;
      break;
    case h.invalid_enum_value:
      t = `Invalid enum value. Expected ${M.joinValues(r.options)}, received '${r.received}'`;
      break;
    case h.invalid_arguments:
      t = 'Invalid function arguments';
      break;
    case h.invalid_return_type:
      t = 'Invalid function return type';
      break;
    case h.invalid_date:
      t = 'Invalid date';
      break;
    case h.invalid_string:
      typeof r.validation == 'object'
        ? 'includes' in r.validation
          ? ((t = `Invalid input: must include "${r.validation.includes}"`),
            typeof r.validation.position == 'number' &&
              (t = `${t} at one or more positions greater than or equal to ${r.validation.position}`))
          : 'startsWith' in r.validation
            ? (t = `Invalid input: must start with "${r.validation.startsWith}"`)
            : 'endsWith' in r.validation
              ? (t = `Invalid input: must end with "${r.validation.endsWith}"`)
              : M.assertNever(r.validation)
        : r.validation !== 'regex'
          ? (t = `Invalid ${r.validation}`)
          : (t = 'Invalid');
      break;
    case h.too_small:
      r.type === 'array'
        ? (t = `Array must contain ${r.exact ? 'exactly' : r.inclusive ? 'at least' : 'more than'} ${r.minimum} element(s)`)
        : r.type === 'string'
          ? (t = `String must contain ${r.exact ? 'exactly' : r.inclusive ? 'at least' : 'over'} ${r.minimum} character(s)`)
          : r.type === 'number'
            ? (t = `Number must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${r.minimum}`)
            : r.type === 'bigint'
              ? (t = `Number must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${r.minimum}`)
              : r.type === 'date'
                ? (t = `Date must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${new Date(Number(r.minimum))}`)
                : (t = 'Invalid input');
      break;
    case h.too_big:
      r.type === 'array'
        ? (t = `Array must contain ${r.exact ? 'exactly' : r.inclusive ? 'at most' : 'less than'} ${r.maximum} element(s)`)
        : r.type === 'string'
          ? (t = `String must contain ${r.exact ? 'exactly' : r.inclusive ? 'at most' : 'under'} ${r.maximum} character(s)`)
          : r.type === 'number'
            ? (t = `Number must be ${r.exact ? 'exactly' : r.inclusive ? 'less than or equal to' : 'less than'} ${r.maximum}`)
            : r.type === 'bigint'
              ? (t = `BigInt must be ${r.exact ? 'exactly' : r.inclusive ? 'less than or equal to' : 'less than'} ${r.maximum}`)
              : r.type === 'date'
                ? (t = `Date must be ${r.exact ? 'exactly' : r.inclusive ? 'smaller than or equal to' : 'smaller than'} ${new Date(Number(r.maximum))}`)
                : (t = 'Invalid input');
      break;
    case h.custom:
      t = 'Invalid input';
      break;
    case h.invalid_intersection_types:
      t = 'Intersection results could not be merged';
      break;
    case h.not_multiple_of:
      t = `Number must be a multiple of ${r.multipleOf}`;
      break;
    case h.not_finite:
      t = 'Number must be finite';
      break;
    default:
      ((t = e.defaultError), M.assertNever(r));
  }
  return { message: t };
};
let gs = Ot;
function _s() {
  return gs;
}
const ps = r => {
  const { data: e, path: t, errorMaps: s, issueData: a } = r,
    n = [...t, ...(a.path || [])],
    i = { ...a, path: n };
  if (a.message !== void 0) return { ...a, path: n, message: a.message };
  let u = '';
  const c = s
    .filter(f => !!f)
    .slice()
    .reverse();
  for (const f of c) u = f(i, { data: e, defaultError: u }).message;
  return { ...a, path: n, message: u };
};
function x(r, e) {
  const t = _s(),
    s = ps({
      issueData: e,
      data: r.data,
      path: r.path,
      errorMaps: [
        r.common.contextualErrorMap,
        r.schemaErrorMap,
        t,
        t === Ot ? void 0 : Ot
      ].filter(a => !!a)
    });
  r.common.issues.push(s);
}
class de {
  constructor() {
    this.value = 'valid';
  }
  dirty() {
    this.value === 'valid' && (this.value = 'dirty');
  }
  abort() {
    this.value !== 'aborted' && (this.value = 'aborted');
  }
  static mergeArray(e, t) {
    const s = [];
    for (const a of t) {
      if (a.status === 'aborted') return T;
      (a.status === 'dirty' && e.dirty(), s.push(a.value));
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, t) {
    const s = [];
    for (const a of t) {
      const n = await a.key,
        i = await a.value;
      s.push({ key: n, value: i });
    }
    return de.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, t) {
    const s = {};
    for (const a of t) {
      const { key: n, value: i } = a;
      if (n.status === 'aborted' || i.status === 'aborted') return T;
      (n.status === 'dirty' && e.dirty(),
        i.status === 'dirty' && e.dirty(),
        n.value !== '__proto__' &&
          (typeof i.value < 'u' || a.alwaysSet) &&
          (s[n.value] = i.value));
    }
    return { status: e.value, value: s };
  }
}
const T = Object.freeze({ status: 'aborted' }),
  ze = r => ({ status: 'dirty', value: r }),
  ce = r => ({ status: 'valid', value: r }),
  ur = r => r.status === 'aborted',
  dr = r => r.status === 'dirty',
  De = r => r.status === 'valid',
  Ke = r => typeof Promise < 'u' && r instanceof Promise;
var A;
(function (r) {
  ((r.errToObj = e => (typeof e == 'string' ? { message: e } : e || {})),
    (r.toString = e =>
      typeof e == 'string' ? e : e == null ? void 0 : e.message));
})(A || (A = {}));
class Ce {
  constructor(e, t, s, a) {
    ((this._cachedPath = []),
      (this.parent = e),
      (this.data = t),
      (this._path = s),
      (this._key = a));
  }
  get path() {
    return (
      this._cachedPath.length ||
        (Array.isArray(this._key)
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const lr = (r, e) => {
  if (De(e)) return { success: !0, data: e.value };
  if (!r.common.issues.length)
    throw new Error('Validation failed but no issues detected.');
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const t = new ve(r.common.issues);
      return ((this._error = t), this._error);
    }
  };
};
function N(r) {
  if (!r) return {};
  const {
    errorMap: e,
    invalid_type_error: t,
    required_error: s,
    description: a
  } = r;
  if (e && (t || s))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
    );
  return e
    ? { errorMap: e, description: a }
    : {
        errorMap: (i, u) => {
          const { message: c } = r;
          return i.code === 'invalid_enum_value'
            ? { message: c ?? u.defaultError }
            : typeof u.data > 'u'
              ? { message: c ?? s ?? u.defaultError }
              : i.code !== 'invalid_type'
                ? { message: u.defaultError }
                : { message: c ?? t ?? u.defaultError };
        },
        description: a
      };
}
class Z {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return we(e.data);
  }
  _getOrReturnCtx(e, t) {
    return (
      t || {
        common: e.parent.common,
        data: e.data,
        parsedType: we(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    );
  }
  _processInputParams(e) {
    return {
      status: new de(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: we(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (Ke(t)) throw new Error('Synchronous parse encountered promise.');
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const s = this.safeParse(e, t);
    if (s.success) return s.data;
    throw s.error;
  }
  safeParse(e, t) {
    const s = {
        common: {
          issues: [],
          async: (t == null ? void 0 : t.async) ?? !1,
          contextualErrorMap: t == null ? void 0 : t.errorMap
        },
        path: (t == null ? void 0 : t.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: we(e)
      },
      a = this._parseSync({ data: e, path: s.path, parent: s });
    return lr(s, a);
  }
  '~validate'(e) {
    var s, a;
    const t = {
      common: { issues: [], async: !!this['~standard'].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: we(e)
    };
    if (!this['~standard'].async)
      try {
        const n = this._parseSync({ data: e, path: [], parent: t });
        return De(n) ? { value: n.value } : { issues: t.common.issues };
      } catch (n) {
        ((a =
          (s = n == null ? void 0 : n.message) == null
            ? void 0
            : s.toLowerCase()) != null &&
          a.includes('encountered') &&
          (this['~standard'].async = !0),
          (t.common = { issues: [], async: !0 }));
      }
    return this._parseAsync({ data: e, path: [], parent: t }).then(n =>
      De(n) ? { value: n.value } : { issues: t.common.issues }
    );
  }
  async parseAsync(e, t) {
    const s = await this.safeParseAsync(e, t);
    if (s.success) return s.data;
    throw s.error;
  }
  async safeParseAsync(e, t) {
    const s = {
        common: {
          issues: [],
          contextualErrorMap: t == null ? void 0 : t.errorMap,
          async: !0
        },
        path: (t == null ? void 0 : t.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: we(e)
      },
      a = this._parse({ data: e, path: s.path, parent: s }),
      n = await (Ke(a) ? a : Promise.resolve(a));
    return lr(s, n);
  }
  refine(e, t) {
    const s = a =>
      typeof t == 'string' || typeof t > 'u'
        ? { message: t }
        : typeof t == 'function'
          ? t(a)
          : t;
    return this._refinement((a, n) => {
      const i = e(a),
        u = () => n.addIssue({ code: h.custom, ...s(a) });
      return typeof Promise < 'u' && i instanceof Promise
        ? i.then(c => (c ? !0 : (u(), !1)))
        : i
          ? !0
          : (u(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((s, a) =>
      e(s) ? !0 : (a.addIssue(typeof t == 'function' ? t(s, a) : t), !1)
    );
  }
  _refinement(e) {
    return new Me({
      schema: this,
      typeName: O.ZodEffects,
      effect: { type: 'refinement', refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    ((this.spa = this.safeParseAsync),
      (this._def = e),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this['~standard'] = {
        version: 1,
        vendor: 'zod',
        validate: t => this['~validate'](t)
      }));
  }
  optional() {
    return Ve.create(this, this._def);
  }
  nullable() {
    return Le.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return pe.create(this);
  }
  promise() {
    return rt.create(this, this._def);
  }
  or(e) {
    return et.create([this, e], this._def);
  }
  and(e) {
    return tt.create(this, e, this._def);
  }
  transform(e) {
    return new Me({
      ...N(this._def),
      schema: this,
      typeName: O.ZodEffects,
      effect: { type: 'transform', transform: e }
    });
  }
  default(e) {
    const t = typeof e == 'function' ? e : () => e;
    return new Rt({
      ...N(this._def),
      innerType: this,
      defaultValue: t,
      typeName: O.ZodDefault
    });
  }
  brand() {
    return new Us({ typeName: O.ZodBranded, type: this, ...N(this._def) });
  }
  catch(e) {
    const t = typeof e == 'function' ? e : () => e;
    return new Nt({
      ...N(this._def),
      innerType: this,
      catchValue: t,
      typeName: O.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({ ...this._def, description: e });
  }
  pipe(e) {
    return Lt.create(this, e);
  }
  readonly() {
    return It.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const vs = /^c[^\s-]{8,}$/i,
  xs = /^[0-9a-z]+$/,
  bs = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  ks =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  ws = /^[a-z0-9_-]{21}$/i,
  As = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  Vs =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  Cs =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  Ss = '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$';
let wt;
const Ts =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  Os =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  Fs =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  Es =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  Rs = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  Ns = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  jr =
    '((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
  Is = new RegExp(`^${jr}$`);
function Mr(r) {
  let e = '[0-5]\\d';
  r.precision
    ? (e = `${e}\\.\\d{${r.precision}}`)
    : r.precision == null && (e = `${e}(\\.\\d+)?`);
  const t = r.precision ? '+' : '?';
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`;
}
function Ds(r) {
  return new RegExp(`^${Mr(r)}$`);
}
function Zs(r) {
  let e = `${jr}T${Mr(r)}`;
  const t = [];
  return (
    t.push(r.local ? 'Z?' : 'Z'),
    r.offset && t.push('([+-]\\d{2}:?\\d{2})'),
    (e = `${e}(${t.join('|')})`),
    new RegExp(`^${e}$`)
  );
}
function js(r, e) {
  return !!(
    ((e === 'v4' || !e) && Ts.test(r)) ||
    ((e === 'v6' || !e) && Fs.test(r))
  );
}
function Ms(r, e) {
  if (!As.test(r)) return !1;
  try {
    const [t] = r.split('.');
    if (!t) return !1;
    const s = t
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(t.length + ((4 - (t.length % 4)) % 4), '='),
      a = JSON.parse(atob(s));
    return !(
      typeof a != 'object' ||
      a === null ||
      ('typ' in a && (a == null ? void 0 : a.typ) !== 'JWT') ||
      !a.alg ||
      (e && a.alg !== e)
    );
  } catch {
    return !1;
  }
}
function Ls(r, e) {
  return !!(
    ((e === 'v4' || !e) && Os.test(r)) ||
    ((e === 'v6' || !e) && Es.test(r))
  );
}
class Ae extends Z {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = String(e.data)),
      this._getType(e) !== w.string)
    ) {
      const n = this._getOrReturnCtx(e);
      return (
        x(n, {
          code: h.invalid_type,
          expected: w.string,
          received: n.parsedType
        }),
        T
      );
    }
    const s = new de();
    let a;
    for (const n of this._def.checks)
      if (n.kind === 'min')
        e.data.length < n.value &&
          ((a = this._getOrReturnCtx(e, a)),
          x(a, {
            code: h.too_small,
            minimum: n.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: n.message
          }),
          s.dirty());
      else if (n.kind === 'max')
        e.data.length > n.value &&
          ((a = this._getOrReturnCtx(e, a)),
          x(a, {
            code: h.too_big,
            maximum: n.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: n.message
          }),
          s.dirty());
      else if (n.kind === 'length') {
        const i = e.data.length > n.value,
          u = e.data.length < n.value;
        (i || u) &&
          ((a = this._getOrReturnCtx(e, a)),
          i
            ? x(a, {
                code: h.too_big,
                maximum: n.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: n.message
              })
            : u &&
              x(a, {
                code: h.too_small,
                minimum: n.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: n.message
              }),
          s.dirty());
      } else if (n.kind === 'email')
        Cs.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          x(a, {
            validation: 'email',
            code: h.invalid_string,
            message: n.message
          }),
          s.dirty());
      else if (n.kind === 'emoji')
        (wt || (wt = new RegExp(Ss, 'u')),
          wt.test(e.data) ||
            ((a = this._getOrReturnCtx(e, a)),
            x(a, {
              validation: 'emoji',
              code: h.invalid_string,
              message: n.message
            }),
            s.dirty()));
      else if (n.kind === 'uuid')
        ks.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          x(a, {
            validation: 'uuid',
            code: h.invalid_string,
            message: n.message
          }),
          s.dirty());
      else if (n.kind === 'nanoid')
        ws.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          x(a, {
            validation: 'nanoid',
            code: h.invalid_string,
            message: n.message
          }),
          s.dirty());
      else if (n.kind === 'cuid')
        vs.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          x(a, {
            validation: 'cuid',
            code: h.invalid_string,
            message: n.message
          }),
          s.dirty());
      else if (n.kind === 'cuid2')
        xs.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          x(a, {
            validation: 'cuid2',
            code: h.invalid_string,
            message: n.message
          }),
          s.dirty());
      else if (n.kind === 'ulid')
        bs.test(e.data) ||
          ((a = this._getOrReturnCtx(e, a)),
          x(a, {
            validation: 'ulid',
            code: h.invalid_string,
            message: n.message
          }),
          s.dirty());
      else if (n.kind === 'url')
        try {
          new URL(e.data);
        } catch {
          ((a = this._getOrReturnCtx(e, a)),
            x(a, {
              validation: 'url',
              code: h.invalid_string,
              message: n.message
            }),
            s.dirty());
        }
      else
        n.kind === 'regex'
          ? ((n.regex.lastIndex = 0),
            n.regex.test(e.data) ||
              ((a = this._getOrReturnCtx(e, a)),
              x(a, {
                validation: 'regex',
                code: h.invalid_string,
                message: n.message
              }),
              s.dirty()))
          : n.kind === 'trim'
            ? (e.data = e.data.trim())
            : n.kind === 'includes'
              ? e.data.includes(n.value, n.position) ||
                ((a = this._getOrReturnCtx(e, a)),
                x(a, {
                  code: h.invalid_string,
                  validation: { includes: n.value, position: n.position },
                  message: n.message
                }),
                s.dirty())
              : n.kind === 'toLowerCase'
                ? (e.data = e.data.toLowerCase())
                : n.kind === 'toUpperCase'
                  ? (e.data = e.data.toUpperCase())
                  : n.kind === 'startsWith'
                    ? e.data.startsWith(n.value) ||
                      ((a = this._getOrReturnCtx(e, a)),
                      x(a, {
                        code: h.invalid_string,
                        validation: { startsWith: n.value },
                        message: n.message
                      }),
                      s.dirty())
                    : n.kind === 'endsWith'
                      ? e.data.endsWith(n.value) ||
                        ((a = this._getOrReturnCtx(e, a)),
                        x(a, {
                          code: h.invalid_string,
                          validation: { endsWith: n.value },
                          message: n.message
                        }),
                        s.dirty())
                      : n.kind === 'datetime'
                        ? Zs(n).test(e.data) ||
                          ((a = this._getOrReturnCtx(e, a)),
                          x(a, {
                            code: h.invalid_string,
                            validation: 'datetime',
                            message: n.message
                          }),
                          s.dirty())
                        : n.kind === 'date'
                          ? Is.test(e.data) ||
                            ((a = this._getOrReturnCtx(e, a)),
                            x(a, {
                              code: h.invalid_string,
                              validation: 'date',
                              message: n.message
                            }),
                            s.dirty())
                          : n.kind === 'time'
                            ? Ds(n).test(e.data) ||
                              ((a = this._getOrReturnCtx(e, a)),
                              x(a, {
                                code: h.invalid_string,
                                validation: 'time',
                                message: n.message
                              }),
                              s.dirty())
                            : n.kind === 'duration'
                              ? Vs.test(e.data) ||
                                ((a = this._getOrReturnCtx(e, a)),
                                x(a, {
                                  validation: 'duration',
                                  code: h.invalid_string,
                                  message: n.message
                                }),
                                s.dirty())
                              : n.kind === 'ip'
                                ? js(e.data, n.version) ||
                                  ((a = this._getOrReturnCtx(e, a)),
                                  x(a, {
                                    validation: 'ip',
                                    code: h.invalid_string,
                                    message: n.message
                                  }),
                                  s.dirty())
                                : n.kind === 'jwt'
                                  ? Ms(e.data, n.alg) ||
                                    ((a = this._getOrReturnCtx(e, a)),
                                    x(a, {
                                      validation: 'jwt',
                                      code: h.invalid_string,
                                      message: n.message
                                    }),
                                    s.dirty())
                                  : n.kind === 'cidr'
                                    ? Ls(e.data, n.version) ||
                                      ((a = this._getOrReturnCtx(e, a)),
                                      x(a, {
                                        validation: 'cidr',
                                        code: h.invalid_string,
                                        message: n.message
                                      }),
                                      s.dirty())
                                    : n.kind === 'base64'
                                      ? Rs.test(e.data) ||
                                        ((a = this._getOrReturnCtx(e, a)),
                                        x(a, {
                                          validation: 'base64',
                                          code: h.invalid_string,
                                          message: n.message
                                        }),
                                        s.dirty())
                                      : n.kind === 'base64url'
                                        ? Ns.test(e.data) ||
                                          ((a = this._getOrReturnCtx(e, a)),
                                          x(a, {
                                            validation: 'base64url',
                                            code: h.invalid_string,
                                            message: n.message
                                          }),
                                          s.dirty())
                                        : M.assertNever(n);
    return { status: s.value, value: e.data };
  }
  _regex(e, t, s) {
    return this.refinement(a => e.test(a), {
      validation: t,
      code: h.invalid_string,
      ...A.errToObj(s)
    });
  }
  _addCheck(e) {
    return new Ae({ ...this._def, checks: [...this._def.checks, e] });
  }
  email(e) {
    return this._addCheck({ kind: 'email', ...A.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: 'url', ...A.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: 'emoji', ...A.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: 'uuid', ...A.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: 'nanoid', ...A.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: 'cuid', ...A.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: 'cuid2', ...A.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: 'ulid', ...A.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: 'base64', ...A.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({ kind: 'base64url', ...A.errToObj(e) });
  }
  jwt(e) {
    return this._addCheck({ kind: 'jwt', ...A.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: 'ip', ...A.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: 'cidr', ...A.errToObj(e) });
  }
  datetime(e) {
    return typeof e == 'string'
      ? this._addCheck({
          kind: 'datetime',
          precision: null,
          offset: !1,
          local: !1,
          message: e
        })
      : this._addCheck({
          kind: 'datetime',
          precision:
            typeof (e == null ? void 0 : e.precision) > 'u'
              ? null
              : e == null
                ? void 0
                : e.precision,
          offset: (e == null ? void 0 : e.offset) ?? !1,
          local: (e == null ? void 0 : e.local) ?? !1,
          ...A.errToObj(e == null ? void 0 : e.message)
        });
  }
  date(e) {
    return this._addCheck({ kind: 'date', message: e });
  }
  time(e) {
    return typeof e == 'string'
      ? this._addCheck({ kind: 'time', precision: null, message: e })
      : this._addCheck({
          kind: 'time',
          precision:
            typeof (e == null ? void 0 : e.precision) > 'u'
              ? null
              : e == null
                ? void 0
                : e.precision,
          ...A.errToObj(e == null ? void 0 : e.message)
        });
  }
  duration(e) {
    return this._addCheck({ kind: 'duration', ...A.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({ kind: 'regex', regex: e, ...A.errToObj(t) });
  }
  includes(e, t) {
    return this._addCheck({
      kind: 'includes',
      value: e,
      position: t == null ? void 0 : t.position,
      ...A.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({ kind: 'startsWith', value: e, ...A.errToObj(t) });
  }
  endsWith(e, t) {
    return this._addCheck({ kind: 'endsWith', value: e, ...A.errToObj(t) });
  }
  min(e, t) {
    return this._addCheck({ kind: 'min', value: e, ...A.errToObj(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: 'max', value: e, ...A.errToObj(t) });
  }
  length(e, t) {
    return this._addCheck({ kind: 'length', value: e, ...A.errToObj(t) });
  }
  nonempty(e) {
    return this.min(1, A.errToObj(e));
  }
  trim() {
    return new Ae({
      ...this._def,
      checks: [...this._def.checks, { kind: 'trim' }]
    });
  }
  toLowerCase() {
    return new Ae({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toLowerCase' }]
    });
  }
  toUpperCase() {
    return new Ae({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toUpperCase' }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find(e => e.kind === 'datetime');
  }
  get isDate() {
    return !!this._def.checks.find(e => e.kind === 'date');
  }
  get isTime() {
    return !!this._def.checks.find(e => e.kind === 'time');
  }
  get isDuration() {
    return !!this._def.checks.find(e => e.kind === 'duration');
  }
  get isEmail() {
    return !!this._def.checks.find(e => e.kind === 'email');
  }
  get isURL() {
    return !!this._def.checks.find(e => e.kind === 'url');
  }
  get isEmoji() {
    return !!this._def.checks.find(e => e.kind === 'emoji');
  }
  get isUUID() {
    return !!this._def.checks.find(e => e.kind === 'uuid');
  }
  get isNANOID() {
    return !!this._def.checks.find(e => e.kind === 'nanoid');
  }
  get isCUID() {
    return !!this._def.checks.find(e => e.kind === 'cuid');
  }
  get isCUID2() {
    return !!this._def.checks.find(e => e.kind === 'cuid2');
  }
  get isULID() {
    return !!this._def.checks.find(e => e.kind === 'ulid');
  }
  get isIP() {
    return !!this._def.checks.find(e => e.kind === 'ip');
  }
  get isCIDR() {
    return !!this._def.checks.find(e => e.kind === 'cidr');
  }
  get isBase64() {
    return !!this._def.checks.find(e => e.kind === 'base64');
  }
  get isBase64url() {
    return !!this._def.checks.find(e => e.kind === 'base64url');
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
Ae.create = r =>
  new Ae({
    checks: [],
    typeName: O.ZodString,
    coerce: (r == null ? void 0 : r.coerce) ?? !1,
    ...N(r)
  });
function $s(r, e) {
  const t = (r.toString().split('.')[1] || '').length,
    s = (e.toString().split('.')[1] || '').length,
    a = t > s ? t : s,
    n = Number.parseInt(r.toFixed(a).replace('.', '')),
    i = Number.parseInt(e.toFixed(a).replace('.', ''));
  return (n % i) / 10 ** a;
}
class Ze extends Z {
  constructor() {
    (super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf));
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = Number(e.data)),
      this._getType(e) !== w.number)
    ) {
      const n = this._getOrReturnCtx(e);
      return (
        x(n, {
          code: h.invalid_type,
          expected: w.number,
          received: n.parsedType
        }),
        T
      );
    }
    let s;
    const a = new de();
    for (const n of this._def.checks)
      n.kind === 'int'
        ? M.isInteger(e.data) ||
          ((s = this._getOrReturnCtx(e, s)),
          x(s, {
            code: h.invalid_type,
            expected: 'integer',
            received: 'float',
            message: n.message
          }),
          a.dirty())
        : n.kind === 'min'
          ? (n.inclusive ? e.data < n.value : e.data <= n.value) &&
            ((s = this._getOrReturnCtx(e, s)),
            x(s, {
              code: h.too_small,
              minimum: n.value,
              type: 'number',
              inclusive: n.inclusive,
              exact: !1,
              message: n.message
            }),
            a.dirty())
          : n.kind === 'max'
            ? (n.inclusive ? e.data > n.value : e.data >= n.value) &&
              ((s = this._getOrReturnCtx(e, s)),
              x(s, {
                code: h.too_big,
                maximum: n.value,
                type: 'number',
                inclusive: n.inclusive,
                exact: !1,
                message: n.message
              }),
              a.dirty())
            : n.kind === 'multipleOf'
              ? $s(e.data, n.value) !== 0 &&
                ((s = this._getOrReturnCtx(e, s)),
                x(s, {
                  code: h.not_multiple_of,
                  multipleOf: n.value,
                  message: n.message
                }),
                a.dirty())
              : n.kind === 'finite'
                ? Number.isFinite(e.data) ||
                  ((s = this._getOrReturnCtx(e, s)),
                  x(s, { code: h.not_finite, message: n.message }),
                  a.dirty())
                : M.assertNever(n);
    return { status: a.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit('min', e, !0, A.toString(t));
  }
  gt(e, t) {
    return this.setLimit('min', e, !1, A.toString(t));
  }
  lte(e, t) {
    return this.setLimit('max', e, !0, A.toString(t));
  }
  lt(e, t) {
    return this.setLimit('max', e, !1, A.toString(t));
  }
  setLimit(e, t, s, a) {
    return new Ze({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: t, inclusive: s, message: A.toString(a) }
      ]
    });
  }
  _addCheck(e) {
    return new Ze({ ...this._def, checks: [...this._def.checks, e] });
  }
  int(e) {
    return this._addCheck({ kind: 'int', message: A.toString(e) });
  }
  positive(e) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !1,
      message: A.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !1,
      message: A.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: !0,
      message: A.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: !0,
      message: A.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: 'multipleOf',
      value: e,
      message: A.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({ kind: 'finite', message: A.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: 'min',
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: A.toString(e)
    })._addCheck({
      kind: 'max',
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: A.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find(
      e => e.kind === 'int' || (e.kind === 'multipleOf' && M.isInteger(e.value))
    );
  }
  get isFinite() {
    let e = null,
      t = null;
    for (const s of this._def.checks) {
      if (s.kind === 'finite' || s.kind === 'int' || s.kind === 'multipleOf')
        return !0;
      s.kind === 'min'
        ? (t === null || s.value > t) && (t = s.value)
        : s.kind === 'max' && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
Ze.create = r =>
  new Ze({
    checks: [],
    typeName: O.ZodNumber,
    coerce: (r == null ? void 0 : r.coerce) || !1,
    ...N(r)
  });
class We extends Z {
  constructor() {
    (super(...arguments), (this.min = this.gte), (this.max = this.lte));
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== w.bigint) return this._getInvalidInput(e);
    let s;
    const a = new de();
    for (const n of this._def.checks)
      n.kind === 'min'
        ? (n.inclusive ? e.data < n.value : e.data <= n.value) &&
          ((s = this._getOrReturnCtx(e, s)),
          x(s, {
            code: h.too_small,
            type: 'bigint',
            minimum: n.value,
            inclusive: n.inclusive,
            message: n.message
          }),
          a.dirty())
        : n.kind === 'max'
          ? (n.inclusive ? e.data > n.value : e.data >= n.value) &&
            ((s = this._getOrReturnCtx(e, s)),
            x(s, {
              code: h.too_big,
              type: 'bigint',
              maximum: n.value,
              inclusive: n.inclusive,
              message: n.message
            }),
            a.dirty())
          : n.kind === 'multipleOf'
            ? e.data % n.value !== BigInt(0) &&
              ((s = this._getOrReturnCtx(e, s)),
              x(s, {
                code: h.not_multiple_of,
                multipleOf: n.value,
                message: n.message
              }),
              a.dirty())
            : M.assertNever(n);
    return { status: a.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return (
      x(t, {
        code: h.invalid_type,
        expected: w.bigint,
        received: t.parsedType
      }),
      T
    );
  }
  gte(e, t) {
    return this.setLimit('min', e, !0, A.toString(t));
  }
  gt(e, t) {
    return this.setLimit('min', e, !1, A.toString(t));
  }
  lte(e, t) {
    return this.setLimit('max', e, !0, A.toString(t));
  }
  lt(e, t) {
    return this.setLimit('max', e, !1, A.toString(t));
  }
  setLimit(e, t, s, a) {
    return new We({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: t, inclusive: s, message: A.toString(a) }
      ]
    });
  }
  _addCheck(e) {
    return new We({ ...this._def, checks: [...this._def.checks, e] });
  }
  positive(e) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !1,
      message: A.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !1,
      message: A.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !0,
      message: A.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !0,
      message: A.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: 'multipleOf',
      value: e,
      message: A.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
We.create = r =>
  new We({
    checks: [],
    typeName: O.ZodBigInt,
    coerce: (r == null ? void 0 : r.coerce) ?? !1,
    ...N(r)
  });
class cr extends Z {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = !!e.data), this._getType(e) !== w.boolean)
    ) {
      const s = this._getOrReturnCtx(e);
      return (
        x(s, {
          code: h.invalid_type,
          expected: w.boolean,
          received: s.parsedType
        }),
        T
      );
    }
    return ce(e.data);
  }
}
cr.create = r =>
  new cr({
    typeName: O.ZodBoolean,
    coerce: (r == null ? void 0 : r.coerce) || !1,
    ...N(r)
  });
class qe extends Z {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = new Date(e.data)),
      this._getType(e) !== w.date)
    ) {
      const n = this._getOrReturnCtx(e);
      return (
        x(n, {
          code: h.invalid_type,
          expected: w.date,
          received: n.parsedType
        }),
        T
      );
    }
    if (Number.isNaN(e.data.getTime())) {
      const n = this._getOrReturnCtx(e);
      return (x(n, { code: h.invalid_date }), T);
    }
    const s = new de();
    let a;
    for (const n of this._def.checks)
      n.kind === 'min'
        ? e.data.getTime() < n.value &&
          ((a = this._getOrReturnCtx(e, a)),
          x(a, {
            code: h.too_small,
            message: n.message,
            inclusive: !0,
            exact: !1,
            minimum: n.value,
            type: 'date'
          }),
          s.dirty())
        : n.kind === 'max'
          ? e.data.getTime() > n.value &&
            ((a = this._getOrReturnCtx(e, a)),
            x(a, {
              code: h.too_big,
              message: n.message,
              inclusive: !0,
              exact: !1,
              maximum: n.value,
              type: 'date'
            }),
            s.dirty())
          : M.assertNever(n);
    return { status: s.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(e) {
    return new qe({ ...this._def, checks: [...this._def.checks, e] });
  }
  min(e, t) {
    return this._addCheck({
      kind: 'min',
      value: e.getTime(),
      message: A.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: 'max',
      value: e.getTime(),
      message: A.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
qe.create = r =>
  new qe({
    checks: [],
    coerce: (r == null ? void 0 : r.coerce) || !1,
    typeName: O.ZodDate,
    ...N(r)
  });
class fr extends Z {
  _parse(e) {
    if (this._getType(e) !== w.symbol) {
      const s = this._getOrReturnCtx(e);
      return (
        x(s, {
          code: h.invalid_type,
          expected: w.symbol,
          received: s.parsedType
        }),
        T
      );
    }
    return ce(e.data);
  }
}
fr.create = r => new fr({ typeName: O.ZodSymbol, ...N(r) });
class hr extends Z {
  _parse(e) {
    if (this._getType(e) !== w.undefined) {
      const s = this._getOrReturnCtx(e);
      return (
        x(s, {
          code: h.invalid_type,
          expected: w.undefined,
          received: s.parsedType
        }),
        T
      );
    }
    return ce(e.data);
  }
}
hr.create = r => new hr({ typeName: O.ZodUndefined, ...N(r) });
class mr extends Z {
  _parse(e) {
    if (this._getType(e) !== w.null) {
      const s = this._getOrReturnCtx(e);
      return (
        x(s, {
          code: h.invalid_type,
          expected: w.null,
          received: s.parsedType
        }),
        T
      );
    }
    return ce(e.data);
  }
}
mr.create = r => new mr({ typeName: O.ZodNull, ...N(r) });
class yr extends Z {
  constructor() {
    (super(...arguments), (this._any = !0));
  }
  _parse(e) {
    return ce(e.data);
  }
}
yr.create = r => new yr({ typeName: O.ZodAny, ...N(r) });
class gr extends Z {
  constructor() {
    (super(...arguments), (this._unknown = !0));
  }
  _parse(e) {
    return ce(e.data);
  }
}
gr.create = r => new gr({ typeName: O.ZodUnknown, ...N(r) });
class Se extends Z {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return (
      x(t, { code: h.invalid_type, expected: w.never, received: t.parsedType }),
      T
    );
  }
}
Se.create = r => new Se({ typeName: O.ZodNever, ...N(r) });
class _r extends Z {
  _parse(e) {
    if (this._getType(e) !== w.undefined) {
      const s = this._getOrReturnCtx(e);
      return (
        x(s, {
          code: h.invalid_type,
          expected: w.void,
          received: s.parsedType
        }),
        T
      );
    }
    return ce(e.data);
  }
}
_r.create = r => new _r({ typeName: O.ZodVoid, ...N(r) });
class pe extends Z {
  _parse(e) {
    const { ctx: t, status: s } = this._processInputParams(e),
      a = this._def;
    if (t.parsedType !== w.array)
      return (
        x(t, {
          code: h.invalid_type,
          expected: w.array,
          received: t.parsedType
        }),
        T
      );
    if (a.exactLength !== null) {
      const i = t.data.length > a.exactLength.value,
        u = t.data.length < a.exactLength.value;
      (i || u) &&
        (x(t, {
          code: i ? h.too_big : h.too_small,
          minimum: u ? a.exactLength.value : void 0,
          maximum: i ? a.exactLength.value : void 0,
          type: 'array',
          inclusive: !0,
          exact: !0,
          message: a.exactLength.message
        }),
        s.dirty());
    }
    if (
      (a.minLength !== null &&
        t.data.length < a.minLength.value &&
        (x(t, {
          code: h.too_small,
          minimum: a.minLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: a.minLength.message
        }),
        s.dirty()),
      a.maxLength !== null &&
        t.data.length > a.maxLength.value &&
        (x(t, {
          code: h.too_big,
          maximum: a.maxLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: a.maxLength.message
        }),
        s.dirty()),
      t.common.async)
    )
      return Promise.all(
        [...t.data].map((i, u) => a.type._parseAsync(new Ce(t, i, t.path, u)))
      ).then(i => de.mergeArray(s, i));
    const n = [...t.data].map((i, u) =>
      a.type._parseSync(new Ce(t, i, t.path, u))
    );
    return de.mergeArray(s, n);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new pe({
      ...this._def,
      minLength: { value: e, message: A.toString(t) }
    });
  }
  max(e, t) {
    return new pe({
      ...this._def,
      maxLength: { value: e, message: A.toString(t) }
    });
  }
  length(e, t) {
    return new pe({
      ...this._def,
      exactLength: { value: e, message: A.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
pe.create = (r, e) =>
  new pe({
    type: r,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: O.ZodArray,
    ...N(e)
  });
function Re(r) {
  if (r instanceof Y) {
    const e = {};
    for (const t in r.shape) {
      const s = r.shape[t];
      e[t] = Ve.create(Re(s));
    }
    return new Y({ ...r._def, shape: () => e });
  } else
    return r instanceof pe
      ? new pe({ ...r._def, type: Re(r.element) })
      : r instanceof Ve
        ? Ve.create(Re(r.unwrap()))
        : r instanceof Le
          ? Le.create(Re(r.unwrap()))
          : r instanceof Fe
            ? Fe.create(r.items.map(e => Re(e)))
            : r;
}
class Y extends Z {
  constructor() {
    (super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend));
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const e = this._def.shape(),
      t = M.objectKeys(e);
    return ((this._cached = { shape: e, keys: t }), this._cached);
  }
  _parse(e) {
    if (this._getType(e) !== w.object) {
      const f = this._getOrReturnCtx(e);
      return (
        x(f, {
          code: h.invalid_type,
          expected: w.object,
          received: f.parsedType
        }),
        T
      );
    }
    const { status: s, ctx: a } = this._processInputParams(e),
      { shape: n, keys: i } = this._getCached(),
      u = [];
    if (
      !(this._def.catchall instanceof Se && this._def.unknownKeys === 'strip')
    )
      for (const f in a.data) i.includes(f) || u.push(f);
    const c = [];
    for (const f of i) {
      const C = n[f],
        b = a.data[f];
      c.push({
        key: { status: 'valid', value: f },
        value: C._parse(new Ce(a, b, a.path, f)),
        alwaysSet: f in a.data
      });
    }
    if (this._def.catchall instanceof Se) {
      const f = this._def.unknownKeys;
      if (f === 'passthrough')
        for (const C of u)
          c.push({
            key: { status: 'valid', value: C },
            value: { status: 'valid', value: a.data[C] }
          });
      else if (f === 'strict')
        u.length > 0 &&
          (x(a, { code: h.unrecognized_keys, keys: u }), s.dirty());
      else if (f !== 'strip')
        throw new Error('Internal ZodObject error: invalid unknownKeys value.');
    } else {
      const f = this._def.catchall;
      for (const C of u) {
        const b = a.data[C];
        c.push({
          key: { status: 'valid', value: C },
          value: f._parse(new Ce(a, b, a.path, C)),
          alwaysSet: C in a.data
        });
      }
    }
    return a.common.async
      ? Promise.resolve()
          .then(async () => {
            const f = [];
            for (const C of c) {
              const b = await C.key,
                D = await C.value;
              f.push({ key: b, value: D, alwaysSet: C.alwaysSet });
            }
            return f;
          })
          .then(f => de.mergeObjectSync(s, f))
      : de.mergeObjectSync(s, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return (
      A.errToObj,
      new Y({
        ...this._def,
        unknownKeys: 'strict',
        ...(e !== void 0
          ? {
              errorMap: (t, s) => {
                var n, i;
                const a =
                  ((i = (n = this._def).errorMap) == null
                    ? void 0
                    : i.call(n, t, s).message) ?? s.defaultError;
                return t.code === 'unrecognized_keys'
                  ? { message: A.errToObj(e).message ?? a }
                  : { message: a };
              }
            }
          : {})
      })
    );
  }
  strip() {
    return new Y({ ...this._def, unknownKeys: 'strip' });
  }
  passthrough() {
    return new Y({ ...this._def, unknownKeys: 'passthrough' });
  }
  extend(e) {
    return new Y({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...e })
    });
  }
  merge(e) {
    return new Y({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
      typeName: O.ZodObject
    });
  }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  catchall(e) {
    return new Y({ ...this._def, catchall: e });
  }
  pick(e) {
    const t = {};
    for (const s of M.objectKeys(e))
      e[s] && this.shape[s] && (t[s] = this.shape[s]);
    return new Y({ ...this._def, shape: () => t });
  }
  omit(e) {
    const t = {};
    for (const s of M.objectKeys(this.shape)) e[s] || (t[s] = this.shape[s]);
    return new Y({ ...this._def, shape: () => t });
  }
  deepPartial() {
    return Re(this);
  }
  partial(e) {
    const t = {};
    for (const s of M.objectKeys(this.shape)) {
      const a = this.shape[s];
      e && !e[s] ? (t[s] = a) : (t[s] = a.optional());
    }
    return new Y({ ...this._def, shape: () => t });
  }
  required(e) {
    const t = {};
    for (const s of M.objectKeys(this.shape))
      if (e && !e[s]) t[s] = this.shape[s];
      else {
        let n = this.shape[s];
        for (; n instanceof Ve; ) n = n._def.innerType;
        t[s] = n;
      }
    return new Y({ ...this._def, shape: () => t });
  }
  keyof() {
    return Lr(M.objectKeys(this.shape));
  }
}
Y.create = (r, e) =>
  new Y({
    shape: () => r,
    unknownKeys: 'strip',
    catchall: Se.create(),
    typeName: O.ZodObject,
    ...N(e)
  });
Y.strictCreate = (r, e) =>
  new Y({
    shape: () => r,
    unknownKeys: 'strict',
    catchall: Se.create(),
    typeName: O.ZodObject,
    ...N(e)
  });
Y.lazycreate = (r, e) =>
  new Y({
    shape: r,
    unknownKeys: 'strip',
    catchall: Se.create(),
    typeName: O.ZodObject,
    ...N(e)
  });
class et extends Z {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      s = this._def.options;
    function a(n) {
      for (const u of n) if (u.result.status === 'valid') return u.result;
      for (const u of n)
        if (u.result.status === 'dirty')
          return (t.common.issues.push(...u.ctx.common.issues), u.result);
      const i = n.map(u => new ve(u.ctx.common.issues));
      return (x(t, { code: h.invalid_union, unionErrors: i }), T);
    }
    if (t.common.async)
      return Promise.all(
        s.map(async n => {
          const i = { ...t, common: { ...t.common, issues: [] }, parent: null };
          return {
            result: await n._parseAsync({
              data: t.data,
              path: t.path,
              parent: i
            }),
            ctx: i
          };
        })
      ).then(a);
    {
      let n;
      const i = [];
      for (const c of s) {
        const f = { ...t, common: { ...t.common, issues: [] }, parent: null },
          C = c._parseSync({ data: t.data, path: t.path, parent: f });
        if (C.status === 'valid') return C;
        (C.status === 'dirty' && !n && (n = { result: C, ctx: f }),
          f.common.issues.length && i.push(f.common.issues));
      }
      if (n) return (t.common.issues.push(...n.ctx.common.issues), n.result);
      const u = i.map(c => new ve(c));
      return (x(t, { code: h.invalid_union, unionErrors: u }), T);
    }
  }
  get options() {
    return this._def.options;
  }
}
et.create = (r, e) => new et({ options: r, typeName: O.ZodUnion, ...N(e) });
function Ft(r, e) {
  const t = we(r),
    s = we(e);
  if (r === e) return { valid: !0, data: r };
  if (t === w.object && s === w.object) {
    const a = M.objectKeys(e),
      n = M.objectKeys(r).filter(u => a.indexOf(u) !== -1),
      i = { ...r, ...e };
    for (const u of n) {
      const c = Ft(r[u], e[u]);
      if (!c.valid) return { valid: !1 };
      i[u] = c.data;
    }
    return { valid: !0, data: i };
  } else if (t === w.array && s === w.array) {
    if (r.length !== e.length) return { valid: !1 };
    const a = [];
    for (let n = 0; n < r.length; n++) {
      const i = r[n],
        u = e[n],
        c = Ft(i, u);
      if (!c.valid) return { valid: !1 };
      a.push(c.data);
    }
    return { valid: !0, data: a };
  } else
    return t === w.date && s === w.date && +r == +e
      ? { valid: !0, data: r }
      : { valid: !1 };
}
class tt extends Z {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e),
      a = (n, i) => {
        if (ur(n) || ur(i)) return T;
        const u = Ft(n.value, i.value);
        return u.valid
          ? ((dr(n) || dr(i)) && t.dirty(), { status: t.value, value: u.data })
          : (x(s, { code: h.invalid_intersection_types }), T);
      };
    return s.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: s.data, path: s.path, parent: s }),
          this._def.right._parseAsync({ data: s.data, path: s.path, parent: s })
        ]).then(([n, i]) => a(n, i))
      : a(
          this._def.left._parseSync({ data: s.data, path: s.path, parent: s }),
          this._def.right._parseSync({ data: s.data, path: s.path, parent: s })
        );
  }
}
tt.create = (r, e, t) =>
  new tt({ left: r, right: e, typeName: O.ZodIntersection, ...N(t) });
class Fe extends Z {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== w.array)
      return (
        x(s, {
          code: h.invalid_type,
          expected: w.array,
          received: s.parsedType
        }),
        T
      );
    if (s.data.length < this._def.items.length)
      return (
        x(s, {
          code: h.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: 'array'
        }),
        T
      );
    !this._def.rest &&
      s.data.length > this._def.items.length &&
      (x(s, {
        code: h.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: 'array'
      }),
      t.dirty());
    const n = [...s.data]
      .map((i, u) => {
        const c = this._def.items[u] || this._def.rest;
        return c ? c._parse(new Ce(s, i, s.path, u)) : null;
      })
      .filter(i => !!i);
    return s.common.async
      ? Promise.all(n).then(i => de.mergeArray(t, i))
      : de.mergeArray(t, n);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Fe({ ...this._def, rest: e });
  }
}
Fe.create = (r, e) => {
  if (!Array.isArray(r))
    throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
  return new Fe({ items: r, typeName: O.ZodTuple, rest: null, ...N(e) });
};
class pr extends Z {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== w.map)
      return (
        x(s, { code: h.invalid_type, expected: w.map, received: s.parsedType }),
        T
      );
    const a = this._def.keyType,
      n = this._def.valueType,
      i = [...s.data.entries()].map(([u, c], f) => ({
        key: a._parse(new Ce(s, u, s.path, [f, 'key'])),
        value: n._parse(new Ce(s, c, s.path, [f, 'value']))
      }));
    if (s.common.async) {
      const u = new Map();
      return Promise.resolve().then(async () => {
        for (const c of i) {
          const f = await c.key,
            C = await c.value;
          if (f.status === 'aborted' || C.status === 'aborted') return T;
          ((f.status === 'dirty' || C.status === 'dirty') && t.dirty(),
            u.set(f.value, C.value));
        }
        return { status: t.value, value: u };
      });
    } else {
      const u = new Map();
      for (const c of i) {
        const f = c.key,
          C = c.value;
        if (f.status === 'aborted' || C.status === 'aborted') return T;
        ((f.status === 'dirty' || C.status === 'dirty') && t.dirty(),
          u.set(f.value, C.value));
      }
      return { status: t.value, value: u };
    }
  }
}
pr.create = (r, e, t) =>
  new pr({ valueType: e, keyType: r, typeName: O.ZodMap, ...N(t) });
class He extends Z {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== w.set)
      return (
        x(s, { code: h.invalid_type, expected: w.set, received: s.parsedType }),
        T
      );
    const a = this._def;
    (a.minSize !== null &&
      s.data.size < a.minSize.value &&
      (x(s, {
        code: h.too_small,
        minimum: a.minSize.value,
        type: 'set',
        inclusive: !0,
        exact: !1,
        message: a.minSize.message
      }),
      t.dirty()),
      a.maxSize !== null &&
        s.data.size > a.maxSize.value &&
        (x(s, {
          code: h.too_big,
          maximum: a.maxSize.value,
          type: 'set',
          inclusive: !0,
          exact: !1,
          message: a.maxSize.message
        }),
        t.dirty()));
    const n = this._def.valueType;
    function i(c) {
      const f = new Set();
      for (const C of c) {
        if (C.status === 'aborted') return T;
        (C.status === 'dirty' && t.dirty(), f.add(C.value));
      }
      return { status: t.value, value: f };
    }
    const u = [...s.data.values()].map((c, f) =>
      n._parse(new Ce(s, c, s.path, f))
    );
    return s.common.async ? Promise.all(u).then(c => i(c)) : i(u);
  }
  min(e, t) {
    return new He({
      ...this._def,
      minSize: { value: e, message: A.toString(t) }
    });
  }
  max(e, t) {
    return new He({
      ...this._def,
      maxSize: { value: e, message: A.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
He.create = (r, e) =>
  new He({
    valueType: r,
    minSize: null,
    maxSize: null,
    typeName: O.ZodSet,
    ...N(e)
  });
class vr extends Z {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
vr.create = (r, e) => new vr({ getter: r, typeName: O.ZodLazy, ...N(e) });
class Et extends Z {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return (
        x(t, {
          received: t.data,
          code: h.invalid_literal,
          expected: this._def.value
        }),
        T
      );
    }
    return { status: 'valid', value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Et.create = (r, e) => new Et({ value: r, typeName: O.ZodLiteral, ...N(e) });
function Lr(r, e) {
  return new je({ values: r, typeName: O.ZodEnum, ...N(e) });
}
class je extends Z {
  _parse(e) {
    if (typeof e.data != 'string') {
      const t = this._getOrReturnCtx(e),
        s = this._def.values;
      return (
        x(t, {
          expected: M.joinValues(s),
          received: t.parsedType,
          code: h.invalid_type
        }),
        T
      );
    }
    if (
      (this._cache || (this._cache = new Set(this._def.values)),
      !this._cache.has(e.data))
    ) {
      const t = this._getOrReturnCtx(e),
        s = this._def.values;
      return (
        x(t, { received: t.data, code: h.invalid_enum_value, options: s }),
        T
      );
    }
    return ce(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return je.create(e, { ...this._def, ...t });
  }
  exclude(e, t = this._def) {
    return je.create(
      this.options.filter(s => !e.includes(s)),
      { ...this._def, ...t }
    );
  }
}
je.create = Lr;
class xr extends Z {
  _parse(e) {
    const t = M.getValidEnumValues(this._def.values),
      s = this._getOrReturnCtx(e);
    if (s.parsedType !== w.string && s.parsedType !== w.number) {
      const a = M.objectValues(t);
      return (
        x(s, {
          expected: M.joinValues(a),
          received: s.parsedType,
          code: h.invalid_type
        }),
        T
      );
    }
    if (
      (this._cache ||
        (this._cache = new Set(M.getValidEnumValues(this._def.values))),
      !this._cache.has(e.data))
    ) {
      const a = M.objectValues(t);
      return (
        x(s, { received: s.data, code: h.invalid_enum_value, options: a }),
        T
      );
    }
    return ce(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
xr.create = (r, e) => new xr({ values: r, typeName: O.ZodNativeEnum, ...N(e) });
class rt extends Z {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== w.promise && t.common.async === !1)
      return (
        x(t, {
          code: h.invalid_type,
          expected: w.promise,
          received: t.parsedType
        }),
        T
      );
    const s = t.parsedType === w.promise ? t.data : Promise.resolve(t.data);
    return ce(
      s.then(a =>
        this._def.type.parseAsync(a, {
          path: t.path,
          errorMap: t.common.contextualErrorMap
        })
      )
    );
  }
}
rt.create = (r, e) => new rt({ type: r, typeName: O.ZodPromise, ...N(e) });
class Me extends Z {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === O.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e),
      a = this._def.effect || null,
      n = {
        addIssue: i => {
          (x(s, i), i.fatal ? t.abort() : t.dirty());
        },
        get path() {
          return s.path;
        }
      };
    if (((n.addIssue = n.addIssue.bind(n)), a.type === 'preprocess')) {
      const i = a.transform(s.data, n);
      if (s.common.async)
        return Promise.resolve(i).then(async u => {
          if (t.value === 'aborted') return T;
          const c = await this._def.schema._parseAsync({
            data: u,
            path: s.path,
            parent: s
          });
          return c.status === 'aborted'
            ? T
            : c.status === 'dirty' || t.value === 'dirty'
              ? ze(c.value)
              : c;
        });
      {
        if (t.value === 'aborted') return T;
        const u = this._def.schema._parseSync({
          data: i,
          path: s.path,
          parent: s
        });
        return u.status === 'aborted'
          ? T
          : u.status === 'dirty' || t.value === 'dirty'
            ? ze(u.value)
            : u;
      }
    }
    if (a.type === 'refinement') {
      const i = u => {
        const c = a.refinement(u, n);
        if (s.common.async) return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error(
            'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.'
          );
        return u;
      };
      if (s.common.async === !1) {
        const u = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return u.status === 'aborted'
          ? T
          : (u.status === 'dirty' && t.dirty(),
            i(u.value),
            { status: t.value, value: u.value });
      } else
        return this._def.schema
          ._parseAsync({ data: s.data, path: s.path, parent: s })
          .then(u =>
            u.status === 'aborted'
              ? T
              : (u.status === 'dirty' && t.dirty(),
                i(u.value).then(() => ({ status: t.value, value: u.value })))
          );
    }
    if (a.type === 'transform')
      if (s.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!De(i)) return T;
        const u = a.transform(i.value, n);
        if (u instanceof Promise)
          throw new Error(
            'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.'
          );
        return { status: t.value, value: u };
      } else
        return this._def.schema
          ._parseAsync({ data: s.data, path: s.path, parent: s })
          .then(i =>
            De(i)
              ? Promise.resolve(a.transform(i.value, n)).then(u => ({
                  status: t.value,
                  value: u
                }))
              : T
          );
    M.assertNever(a);
  }
}
Me.create = (r, e, t) =>
  new Me({ schema: r, typeName: O.ZodEffects, effect: e, ...N(t) });
Me.createWithPreprocess = (r, e, t) =>
  new Me({
    schema: e,
    effect: { type: 'preprocess', transform: r },
    typeName: O.ZodEffects,
    ...N(t)
  });
class Ve extends Z {
  _parse(e) {
    return this._getType(e) === w.undefined
      ? ce(void 0)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ve.create = (r, e) =>
  new Ve({ innerType: r, typeName: O.ZodOptional, ...N(e) });
class Le extends Z {
  _parse(e) {
    return this._getType(e) === w.null
      ? ce(null)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Le.create = (r, e) =>
  new Le({ innerType: r, typeName: O.ZodNullable, ...N(e) });
class Rt extends Z {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let s = t.data;
    return (
      t.parsedType === w.undefined && (s = this._def.defaultValue()),
      this._def.innerType._parse({ data: s, path: t.path, parent: t })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Rt.create = (r, e) =>
  new Rt({
    innerType: r,
    typeName: O.ZodDefault,
    defaultValue: typeof e.default == 'function' ? e.default : () => e.default,
    ...N(e)
  });
class Nt extends Z {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      s = { ...t, common: { ...t.common, issues: [] } },
      a = this._def.innerType._parse({
        data: s.data,
        path: s.path,
        parent: { ...s }
      });
    return Ke(a)
      ? a.then(n => ({
          status: 'valid',
          value:
            n.status === 'valid'
              ? n.value
              : this._def.catchValue({
                  get error() {
                    return new ve(s.common.issues);
                  },
                  input: s.data
                })
        }))
      : {
          status: 'valid',
          value:
            a.status === 'valid'
              ? a.value
              : this._def.catchValue({
                  get error() {
                    return new ve(s.common.issues);
                  },
                  input: s.data
                })
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Nt.create = (r, e) =>
  new Nt({
    innerType: r,
    typeName: O.ZodCatch,
    catchValue: typeof e.catch == 'function' ? e.catch : () => e.catch,
    ...N(e)
  });
class br extends Z {
  _parse(e) {
    if (this._getType(e) !== w.nan) {
      const s = this._getOrReturnCtx(e);
      return (
        x(s, { code: h.invalid_type, expected: w.nan, received: s.parsedType }),
        T
      );
    }
    return { status: 'valid', value: e.data };
  }
}
br.create = r => new br({ typeName: O.ZodNaN, ...N(r) });
class Us extends Z {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      s = t.data;
    return this._def.type._parse({ data: s, path: t.path, parent: t });
  }
  unwrap() {
    return this._def.type;
  }
}
class Lt extends Z {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const n = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return n.status === 'aborted'
          ? T
          : n.status === 'dirty'
            ? (t.dirty(), ze(n.value))
            : this._def.out._parseAsync({
                data: n.value,
                path: s.path,
                parent: s
              });
      })();
    {
      const a = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return a.status === 'aborted'
        ? T
        : a.status === 'dirty'
          ? (t.dirty(), { status: 'dirty', value: a.value })
          : this._def.out._parseSync({
              data: a.value,
              path: s.path,
              parent: s
            });
    }
  }
  static create(e, t) {
    return new Lt({ in: e, out: t, typeName: O.ZodPipeline });
  }
}
class It extends Z {
  _parse(e) {
    const t = this._def.innerType._parse(e),
      s = a => (De(a) && (a.value = Object.freeze(a.value)), a);
    return Ke(t) ? t.then(a => s(a)) : s(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
It.create = (r, e) =>
  new It({ innerType: r, typeName: O.ZodReadonly, ...N(e) });
var O;
(function (r) {
  ((r.ZodString = 'ZodString'),
    (r.ZodNumber = 'ZodNumber'),
    (r.ZodNaN = 'ZodNaN'),
    (r.ZodBigInt = 'ZodBigInt'),
    (r.ZodBoolean = 'ZodBoolean'),
    (r.ZodDate = 'ZodDate'),
    (r.ZodSymbol = 'ZodSymbol'),
    (r.ZodUndefined = 'ZodUndefined'),
    (r.ZodNull = 'ZodNull'),
    (r.ZodAny = 'ZodAny'),
    (r.ZodUnknown = 'ZodUnknown'),
    (r.ZodNever = 'ZodNever'),
    (r.ZodVoid = 'ZodVoid'),
    (r.ZodArray = 'ZodArray'),
    (r.ZodObject = 'ZodObject'),
    (r.ZodUnion = 'ZodUnion'),
    (r.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
    (r.ZodIntersection = 'ZodIntersection'),
    (r.ZodTuple = 'ZodTuple'),
    (r.ZodRecord = 'ZodRecord'),
    (r.ZodMap = 'ZodMap'),
    (r.ZodSet = 'ZodSet'),
    (r.ZodFunction = 'ZodFunction'),
    (r.ZodLazy = 'ZodLazy'),
    (r.ZodLiteral = 'ZodLiteral'),
    (r.ZodEnum = 'ZodEnum'),
    (r.ZodEffects = 'ZodEffects'),
    (r.ZodNativeEnum = 'ZodNativeEnum'),
    (r.ZodOptional = 'ZodOptional'),
    (r.ZodNullable = 'ZodNullable'),
    (r.ZodDefault = 'ZodDefault'),
    (r.ZodCatch = 'ZodCatch'),
    (r.ZodPromise = 'ZodPromise'),
    (r.ZodBranded = 'ZodBranded'),
    (r.ZodPipeline = 'ZodPipeline'),
    (r.ZodReadonly = 'ZodReadonly'));
})(O || (O = {}));
const Js = Ae.create,
  Qs = Ze.create,
  Xs = qe.create;
Se.create;
const Ks = pe.create,
  ea = Y.create,
  ta = et.create;
tt.create;
Fe.create;
const ra = Et.create,
  sa = je.create;
rt.create;
Ve.create;
Le.create;
const kr = (r, e, t) => {
    if (r && 'reportValidity' in r) {
      const s = m(t, e);
      (r.setCustomValidity((s && s.message) || ''), r.reportValidity());
    }
  },
  $r = (r, e) => {
    for (const t in e.fields) {
      const s = e.fields[t];
      s && s.ref && 'reportValidity' in s.ref
        ? kr(s.ref, t, r)
        : s.refs && s.refs.forEach(a => kr(a, t, r));
    }
  },
  Ps = (r, e) => {
    e.shouldUseNativeValidation && $r(r, e);
    const t = {};
    for (const s in r) {
      const a = m(e.fields, s),
        n = Object.assign(r[s] || {}, { ref: a && a.ref });
      if (Bs(e.names || Object.keys(r), s)) {
        const i = Object.assign({}, m(t, s));
        (j(i, 'root', n), j(t, s, i));
      } else j(t, s, n);
    }
    return t;
  },
  Bs = (r, e) => r.some(t => t.startsWith(e + '.'));
var zs = function (r, e) {
    for (var t = {}; r.length; ) {
      var s = r[0],
        a = s.code,
        n = s.message,
        i = s.path.join('.');
      if (!t[i])
        if ('unionErrors' in s) {
          var u = s.unionErrors[0].errors[0];
          t[i] = { message: u.message, type: u.code };
        } else t[i] = { message: n, type: a };
      if (
        ('unionErrors' in s &&
          s.unionErrors.forEach(function (C) {
            return C.errors.forEach(function (b) {
              return r.push(b);
            });
          }),
        e)
      ) {
        var c = t[i].types,
          f = c && c[s.code];
        t[i] = Or(i, e, t, a, f ? [].concat(f, s.message) : s.message);
      }
      r.shift();
    }
    return t;
  },
  aa = function (r, e, t) {
    return (
      t === void 0 && (t = {}),
      function (s, a, n) {
        try {
          return Promise.resolve(
            (function (i, u) {
              try {
                var c = Promise.resolve(
                  r[t.mode === 'sync' ? 'parse' : 'parseAsync'](s, e)
                ).then(function (f) {
                  return (
                    n.shouldUseNativeValidation && $r({}, n),
                    { errors: {}, values: t.raw ? s : f }
                  );
                });
              } catch (f) {
                return u(f);
              }
              return c && c.then ? c.then(void 0, u) : c;
            })(0, function (i) {
              if (
                (function (u) {
                  return Array.isArray(u == null ? void 0 : u.errors);
                })(i)
              )
                return {
                  values: {},
                  errors: Ps(
                    zs(
                      i.errors,
                      !n.shouldUseNativeValidation && n.criteriaMode === 'all'
                    ),
                    n
                  )
                };
              throw i;
            })
          );
        } catch (i) {
          return Promise.reject(i);
        }
      }
    );
  };
export {
  Hs as C,
  Ks as a,
  ta as b,
  Gs as c,
  Xs as d,
  sa as e,
  ra as l,
  Qs as n,
  ea as o,
  Js as s,
  aa as t,
  Ys as u
};
