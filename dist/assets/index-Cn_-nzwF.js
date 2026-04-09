const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/landing-CGvcWUhR.js',
      'assets/use-disclosure-Dul82tkt.js',
      'assets/Popover-C5NzMGSx.js',
      'assets/Input-kzRYOXAd.js',
      'assets/get-floating-position-TyKNLeXJ.js',
      'assets/use-uncontrolled-C8lBt68W.js',
      'assets/create-event-handler-C3eq9ghx.js',
      'assets/createReactComponent-wv-YgGrS.js',
      'assets/CommonButton-D8AVyhIy.js',
      'assets/ThemeIcon-DU_nylS8.js',
      'assets/Title-T3OvY56h.js',
      'assets/IconUserCheck-CwRNgvtA.js',
      'assets/zod-DC47Kjo4.js',
      'assets/common-services-DPGUVDMw.js',
      'assets/api-client-CcbR4Lbf.js',
      'assets/TextInput-DUPEWkCs.js',
      'assets/InputBase-CO8vJiWZ.js',
      'assets/use-input-props-CLa6mLr2.js',
      'assets/Textarea-CHnPFotR.js',
      'assets/Card-BOCM3d4L.js',
      'assets/Badge-pr8cFvg5.js',
      'assets/IconEye-Bds7tWBk.js',
      'assets/admin-B4khXjP8.js',
      'assets/button-D3DmOMH8.js',
      'assets/button-zA0PV1y8.css',
      'assets/user-DszOWzyE.js'
    ])
) => i.map(i => d[i]);
var yv = e => {
  throw TypeError(e);
};
var bf = (e, n, o) => n.has(e) || yv('Cannot ' + o);
var Y = (e, n, o) => (
    bf(e, n, 'read from private field'),
    o ? o.call(e) : n.get(e)
  ),
  Fe = (e, n, o) =>
    n.has(e)
      ? yv('Cannot add the same private member more than once')
      : n instanceof WeakSet
        ? n.add(e)
        : n.set(e, o),
  Le = (e, n, o, i) => (
    bf(e, n, 'write to private field'),
    i ? i.call(e, o) : n.set(e, o),
    o
  ),
  Rt = (e, n, o) => (bf(e, n, 'access private method'), o);
var gl = (e, n, o, i) => ({
  set _(a) {
    Le(e, n, a, o);
  },
  get _() {
    return Y(e, n, i);
  }
});
function oC(e, n) {
  for (var o = 0; o < n.length; o++) {
    const i = n[o];
    if (typeof i != 'string' && !Array.isArray(i)) {
      for (const a in i)
        if (a !== 'default' && !(a in e)) {
          const l = Object.getOwnPropertyDescriptor(i, a);
          l &&
            Object.defineProperty(
              e,
              a,
              l.get ? l : { enumerable: !0, get: () => i[a] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' })
  );
}
(function () {
  const n = document.createElement('link').relList;
  if (n && n.supports && n.supports('modulepreload')) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) i(a);
  new MutationObserver(a => {
    for (const l of a)
      if (l.type === 'childList')
        for (const c of l.addedNodes)
          c.tagName === 'LINK' && c.rel === 'modulepreload' && i(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(a) {
    const l = {};
    return (
      a.integrity && (l.integrity = a.integrity),
      a.referrerPolicy && (l.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === 'use-credentials'
        ? (l.credentials = 'include')
        : a.crossOrigin === 'anonymous'
          ? (l.credentials = 'omit')
          : (l.credentials = 'same-origin'),
      l
    );
  }
  function i(a) {
    if (a.ep) return;
    a.ep = !0;
    const l = o(a);
    fetch(a.href, l);
  }
})();
function lg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
function KM(e) {
  if (Object.prototype.hasOwnProperty.call(e, '__esModule')) return e;
  var n = e.default;
  if (typeof n == 'function') {
    var o = function i() {
      return this instanceof i
        ? Reflect.construct(n, arguments, this.constructor)
        : n.apply(this, arguments);
    };
    o.prototype = n.prototype;
  } else o = {};
  return (
    Object.defineProperty(o, '__esModule', { value: !0 }),
    Object.keys(e).forEach(function (i) {
      var a = Object.getOwnPropertyDescriptor(e, i);
      Object.defineProperty(
        o,
        i,
        a.get
          ? a
          : {
              enumerable: !0,
              get: function () {
                return e[i];
              }
            }
      );
    }),
    o
  );
}
var Rf = { exports: {} },
  bs = {},
  xf = { exports: {} },
  De = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gv;
function iC() {
  if (gv) return De;
  gv = 1;
  var e = Symbol.for('react.element'),
    n = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    i = Symbol.for('react.strict_mode'),
    a = Symbol.for('react.profiler'),
    l = Symbol.for('react.provider'),
    c = Symbol.for('react.context'),
    f = Symbol.for('react.forward_ref'),
    p = Symbol.for('react.suspense'),
    m = Symbol.for('react.memo'),
    v = Symbol.for('react.lazy'),
    y = Symbol.iterator;
  function C(L) {
    return L === null || typeof L != 'object'
      ? null
      : ((L = (y && L[y]) || L['@@iterator']),
        typeof L == 'function' ? L : null);
  }
  var S = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {}
    },
    E = Object.assign,
    _ = {};
  function b(L, x, B) {
    ((this.props = L),
      (this.context = x),
      (this.refs = _),
      (this.updater = B || S));
  }
  ((b.prototype.isReactComponent = {}),
    (b.prototype.setState = function (L, x) {
      if (typeof L != 'object' && typeof L != 'function' && L != null)
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, L, x, 'setState');
    }),
    (b.prototype.forceUpdate = function (L) {
      this.updater.enqueueForceUpdate(this, L, 'forceUpdate');
    }));
  function N() {}
  N.prototype = b.prototype;
  function R(L, x, B) {
    ((this.props = L),
      (this.context = x),
      (this.refs = _),
      (this.updater = B || S));
  }
  var T = (R.prototype = new N());
  ((T.constructor = R), E(T, b.prototype), (T.isPureReactComponent = !0));
  var k = Array.isArray,
    $ = Object.prototype.hasOwnProperty,
    W = { current: null },
    H = { key: !0, ref: !0, __self: !0, __source: !0 };
  function F(L, x, B) {
    var Q,
      te = {},
      J = null,
      de = null;
    if (x != null)
      for (Q in (x.ref !== void 0 && (de = x.ref),
      x.key !== void 0 && (J = '' + x.key),
      x))
        $.call(x, Q) && !H.hasOwnProperty(Q) && (te[Q] = x[Q]);
    var ae = arguments.length - 2;
    if (ae === 1) te.children = B;
    else if (1 < ae) {
      for (var _e = Array(ae), Me = 0; Me < ae; Me++)
        _e[Me] = arguments[Me + 2];
      te.children = _e;
    }
    if (L && L.defaultProps)
      for (Q in ((ae = L.defaultProps), ae))
        te[Q] === void 0 && (te[Q] = ae[Q]);
    return {
      $$typeof: e,
      type: L,
      key: J,
      ref: de,
      props: te,
      _owner: W.current
    };
  }
  function G(L, x) {
    return {
      $$typeof: e,
      type: L.type,
      key: x,
      ref: L.ref,
      props: L.props,
      _owner: L._owner
    };
  }
  function q(L) {
    return typeof L == 'object' && L !== null && L.$$typeof === e;
  }
  function ce(L) {
    var x = { '=': '=0', ':': '=2' };
    return (
      '$' +
      L.replace(/[=:]/g, function (B) {
        return x[B];
      })
    );
  }
  var ye = /\/+/g;
  function le(L, x) {
    return typeof L == 'object' && L !== null && L.key != null
      ? ce('' + L.key)
      : x.toString(36);
  }
  function Z(L, x, B, Q, te) {
    var J = typeof L;
    (J === 'undefined' || J === 'boolean') && (L = null);
    var de = !1;
    if (L === null) de = !0;
    else
      switch (J) {
        case 'string':
        case 'number':
          de = !0;
          break;
        case 'object':
          switch (L.$$typeof) {
            case e:
            case n:
              de = !0;
          }
      }
    if (de)
      return (
        (de = L),
        (te = te(de)),
        (L = Q === '' ? '.' + le(de, 0) : Q),
        k(te)
          ? ((B = ''),
            L != null && (B = L.replace(ye, '$&/') + '/'),
            Z(te, x, B, '', function (Me) {
              return Me;
            }))
          : te != null &&
            (q(te) &&
              (te = G(
                te,
                B +
                  (!te.key || (de && de.key === te.key)
                    ? ''
                    : ('' + te.key).replace(ye, '$&/') + '/') +
                  L
              )),
            x.push(te)),
        1
      );
    if (((de = 0), (Q = Q === '' ? '.' : Q + ':'), k(L)))
      for (var ae = 0; ae < L.length; ae++) {
        J = L[ae];
        var _e = Q + le(J, ae);
        de += Z(J, x, B, _e, te);
      }
    else if (((_e = C(L)), typeof _e == 'function'))
      for (L = _e.call(L), ae = 0; !(J = L.next()).done; )
        ((J = J.value), (_e = Q + le(J, ae++)), (de += Z(J, x, B, _e, te)));
    else if (J === 'object')
      throw (
        (x = String(L)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (x === '[object Object]'
              ? 'object with keys {' + Object.keys(L).join(', ') + '}'
              : x) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    return de;
  }
  function me(L, x, B) {
    if (L == null) return L;
    var Q = [],
      te = 0;
    return (
      Z(L, Q, '', '', function (J) {
        return x.call(B, J, te++);
      }),
      Q
    );
  }
  function fe(L) {
    if (L._status === -1) {
      var x = L._result;
      ((x = x()),
        x.then(
          function (B) {
            (L._status === 0 || L._status === -1) &&
              ((L._status = 1), (L._result = B));
          },
          function (B) {
            (L._status === 0 || L._status === -1) &&
              ((L._status = 2), (L._result = B));
          }
        ),
        L._status === -1 && ((L._status = 0), (L._result = x)));
    }
    if (L._status === 1) return L._result.default;
    throw L._result;
  }
  var ee = { current: null },
    O = { transition: null },
    X = {
      ReactCurrentDispatcher: ee,
      ReactCurrentBatchConfig: O,
      ReactCurrentOwner: W
    };
  function U() {
    throw Error('act(...) is not supported in production builds of React.');
  }
  return (
    (De.Children = {
      map: me,
      forEach: function (L, x, B) {
        me(
          L,
          function () {
            x.apply(this, arguments);
          },
          B
        );
      },
      count: function (L) {
        var x = 0;
        return (
          me(L, function () {
            x++;
          }),
          x
        );
      },
      toArray: function (L) {
        return (
          me(L, function (x) {
            return x;
          }) || []
        );
      },
      only: function (L) {
        if (!q(L))
          throw Error(
            'React.Children.only expected to receive a single React element child.'
          );
        return L;
      }
    }),
    (De.Component = b),
    (De.Fragment = o),
    (De.Profiler = a),
    (De.PureComponent = R),
    (De.StrictMode = i),
    (De.Suspense = p),
    (De.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = X),
    (De.act = U),
    (De.cloneElement = function (L, x, B) {
      if (L == null)
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' +
            L +
            '.'
        );
      var Q = E({}, L.props),
        te = L.key,
        J = L.ref,
        de = L._owner;
      if (x != null) {
        if (
          (x.ref !== void 0 && ((J = x.ref), (de = W.current)),
          x.key !== void 0 && (te = '' + x.key),
          L.type && L.type.defaultProps)
        )
          var ae = L.type.defaultProps;
        for (_e in x)
          $.call(x, _e) &&
            !H.hasOwnProperty(_e) &&
            (Q[_e] = x[_e] === void 0 && ae !== void 0 ? ae[_e] : x[_e]);
      }
      var _e = arguments.length - 2;
      if (_e === 1) Q.children = B;
      else if (1 < _e) {
        ae = Array(_e);
        for (var Me = 0; Me < _e; Me++) ae[Me] = arguments[Me + 2];
        Q.children = ae;
      }
      return {
        $$typeof: e,
        type: L.type,
        key: te,
        ref: J,
        props: Q,
        _owner: de
      };
    }),
    (De.createContext = function (L) {
      return (
        (L = {
          $$typeof: c,
          _currentValue: L,
          _currentValue2: L,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null
        }),
        (L.Provider = { $$typeof: l, _context: L }),
        (L.Consumer = L)
      );
    }),
    (De.createElement = F),
    (De.createFactory = function (L) {
      var x = F.bind(null, L);
      return ((x.type = L), x);
    }),
    (De.createRef = function () {
      return { current: null };
    }),
    (De.forwardRef = function (L) {
      return { $$typeof: f, render: L };
    }),
    (De.isValidElement = q),
    (De.lazy = function (L) {
      return { $$typeof: v, _payload: { _status: -1, _result: L }, _init: fe };
    }),
    (De.memo = function (L, x) {
      return { $$typeof: m, type: L, compare: x === void 0 ? null : x };
    }),
    (De.startTransition = function (L) {
      var x = O.transition;
      O.transition = {};
      try {
        L();
      } finally {
        O.transition = x;
      }
    }),
    (De.unstable_act = U),
    (De.useCallback = function (L, x) {
      return ee.current.useCallback(L, x);
    }),
    (De.useContext = function (L) {
      return ee.current.useContext(L);
    }),
    (De.useDebugValue = function () {}),
    (De.useDeferredValue = function (L) {
      return ee.current.useDeferredValue(L);
    }),
    (De.useEffect = function (L, x) {
      return ee.current.useEffect(L, x);
    }),
    (De.useId = function () {
      return ee.current.useId();
    }),
    (De.useImperativeHandle = function (L, x, B) {
      return ee.current.useImperativeHandle(L, x, B);
    }),
    (De.useInsertionEffect = function (L, x) {
      return ee.current.useInsertionEffect(L, x);
    }),
    (De.useLayoutEffect = function (L, x) {
      return ee.current.useLayoutEffect(L, x);
    }),
    (De.useMemo = function (L, x) {
      return ee.current.useMemo(L, x);
    }),
    (De.useReducer = function (L, x, B) {
      return ee.current.useReducer(L, x, B);
    }),
    (De.useRef = function (L) {
      return ee.current.useRef(L);
    }),
    (De.useState = function (L) {
      return ee.current.useState(L);
    }),
    (De.useSyncExternalStore = function (L, x, B) {
      return ee.current.useSyncExternalStore(L, x, B);
    }),
    (De.useTransition = function () {
      return ee.current.useTransition();
    }),
    (De.version = '18.3.1'),
    De
  );
}
var wv;
function Dd() {
  return (wv || ((wv = 1), (xf.exports = iC())), xf.exports);
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Sv;
function sC() {
  if (Sv) return bs;
  Sv = 1;
  var e = Dd(),
    n = Symbol.for('react.element'),
    o = Symbol.for('react.fragment'),
    i = Object.prototype.hasOwnProperty,
    a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(f, p, m) {
    var v,
      y = {},
      C = null,
      S = null;
    (m !== void 0 && (C = '' + m),
      p.key !== void 0 && (C = '' + p.key),
      p.ref !== void 0 && (S = p.ref));
    for (v in p) i.call(p, v) && !l.hasOwnProperty(v) && (y[v] = p[v]);
    if (f && f.defaultProps)
      for (v in ((p = f.defaultProps), p)) y[v] === void 0 && (y[v] = p[v]);
    return {
      $$typeof: n,
      type: f,
      key: C,
      ref: S,
      props: y,
      _owner: a.current
    };
  }
  return ((bs.Fragment = o), (bs.jsx = c), (bs.jsxs = c), bs);
}
var Cv;
function aC() {
  return (Cv || ((Cv = 1), (Rf.exports = sC())), Rf.exports);
}
var D = aC(),
  w = Dd();
const ke = lg(w),
  Fd = oC({ __proto__: null, default: ke }, [w]);
var wl = {},
  Tf = { exports: {} },
  Wt = {},
  kf = { exports: {} },
  Pf = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _v;
function lC() {
  return (
    _v ||
      ((_v = 1),
      (function (e) {
        function n(O, X) {
          var U = O.length;
          O.push(X);
          e: for (; 0 < U; ) {
            var L = (U - 1) >>> 1,
              x = O[L];
            if (0 < a(x, X)) ((O[L] = X), (O[U] = x), (U = L));
            else break e;
          }
        }
        function o(O) {
          return O.length === 0 ? null : O[0];
        }
        function i(O) {
          if (O.length === 0) return null;
          var X = O[0],
            U = O.pop();
          if (U !== X) {
            O[0] = U;
            e: for (var L = 0, x = O.length, B = x >>> 1; L < B; ) {
              var Q = 2 * (L + 1) - 1,
                te = O[Q],
                J = Q + 1,
                de = O[J];
              if (0 > a(te, U))
                J < x && 0 > a(de, te)
                  ? ((O[L] = de), (O[J] = U), (L = J))
                  : ((O[L] = te), (O[Q] = U), (L = Q));
              else if (J < x && 0 > a(de, U))
                ((O[L] = de), (O[J] = U), (L = J));
              else break e;
            }
          }
          return X;
        }
        function a(O, X) {
          var U = O.sortIndex - X.sortIndex;
          return U !== 0 ? U : O.id - X.id;
        }
        if (
          typeof performance == 'object' &&
          typeof performance.now == 'function'
        ) {
          var l = performance;
          e.unstable_now = function () {
            return l.now();
          };
        } else {
          var c = Date,
            f = c.now();
          e.unstable_now = function () {
            return c.now() - f;
          };
        }
        var p = [],
          m = [],
          v = 1,
          y = null,
          C = 3,
          S = !1,
          E = !1,
          _ = !1,
          b = typeof setTimeout == 'function' ? setTimeout : null,
          N = typeof clearTimeout == 'function' ? clearTimeout : null,
          R = typeof setImmediate < 'u' ? setImmediate : null;
        typeof navigator < 'u' &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function T(O) {
          for (var X = o(m); X !== null; ) {
            if (X.callback === null) i(m);
            else if (X.startTime <= O)
              (i(m), (X.sortIndex = X.expirationTime), n(p, X));
            else break;
            X = o(m);
          }
        }
        function k(O) {
          if (((_ = !1), T(O), !E))
            if (o(p) !== null) ((E = !0), fe($));
            else {
              var X = o(m);
              X !== null && ee(k, X.startTime - O);
            }
        }
        function $(O, X) {
          ((E = !1), _ && ((_ = !1), N(F), (F = -1)), (S = !0));
          var U = C;
          try {
            for (
              T(X), y = o(p);
              y !== null && (!(y.expirationTime > X) || (O && !ce()));
            ) {
              var L = y.callback;
              if (typeof L == 'function') {
                ((y.callback = null), (C = y.priorityLevel));
                var x = L(y.expirationTime <= X);
                ((X = e.unstable_now()),
                  typeof x == 'function'
                    ? (y.callback = x)
                    : y === o(p) && i(p),
                  T(X));
              } else i(p);
              y = o(p);
            }
            if (y !== null) var B = !0;
            else {
              var Q = o(m);
              (Q !== null && ee(k, Q.startTime - X), (B = !1));
            }
            return B;
          } finally {
            ((y = null), (C = U), (S = !1));
          }
        }
        var W = !1,
          H = null,
          F = -1,
          G = 5,
          q = -1;
        function ce() {
          return !(e.unstable_now() - q < G);
        }
        function ye() {
          if (H !== null) {
            var O = e.unstable_now();
            q = O;
            var X = !0;
            try {
              X = H(!0, O);
            } finally {
              X ? le() : ((W = !1), (H = null));
            }
          } else W = !1;
        }
        var le;
        if (typeof R == 'function')
          le = function () {
            R(ye);
          };
        else if (typeof MessageChannel < 'u') {
          var Z = new MessageChannel(),
            me = Z.port2;
          ((Z.port1.onmessage = ye),
            (le = function () {
              me.postMessage(null);
            }));
        } else
          le = function () {
            b(ye, 0);
          };
        function fe(O) {
          ((H = O), W || ((W = !0), le()));
        }
        function ee(O, X) {
          F = b(function () {
            O(e.unstable_now());
          }, X);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (O) {
            O.callback = null;
          }),
          (e.unstable_continueExecution = function () {
            E || S || ((E = !0), fe($));
          }),
          (e.unstable_forceFrameRate = function (O) {
            0 > O || 125 < O
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (G = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return C;
          }),
          (e.unstable_getFirstCallbackNode = function () {
            return o(p);
          }),
          (e.unstable_next = function (O) {
            switch (C) {
              case 1:
              case 2:
              case 3:
                var X = 3;
                break;
              default:
                X = C;
            }
            var U = C;
            C = X;
            try {
              return O();
            } finally {
              C = U;
            }
          }),
          (e.unstable_pauseExecution = function () {}),
          (e.unstable_requestPaint = function () {}),
          (e.unstable_runWithPriority = function (O, X) {
            switch (O) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                O = 3;
            }
            var U = C;
            C = O;
            try {
              return X();
            } finally {
              C = U;
            }
          }),
          (e.unstable_scheduleCallback = function (O, X, U) {
            var L = e.unstable_now();
            switch (
              (typeof U == 'object' && U !== null
                ? ((U = U.delay),
                  (U = typeof U == 'number' && 0 < U ? L + U : L))
                : (U = L),
              O)
            ) {
              case 1:
                var x = -1;
                break;
              case 2:
                x = 250;
                break;
              case 5:
                x = 1073741823;
                break;
              case 4:
                x = 1e4;
                break;
              default:
                x = 5e3;
            }
            return (
              (x = U + x),
              (O = {
                id: v++,
                callback: X,
                priorityLevel: O,
                startTime: U,
                expirationTime: x,
                sortIndex: -1
              }),
              U > L
                ? ((O.sortIndex = U),
                  n(m, O),
                  o(p) === null &&
                    O === o(m) &&
                    (_ ? (N(F), (F = -1)) : (_ = !0), ee(k, U - L)))
                : ((O.sortIndex = x), n(p, O), E || S || ((E = !0), fe($))),
              O
            );
          }),
          (e.unstable_shouldYield = ce),
          (e.unstable_wrapCallback = function (O) {
            var X = C;
            return function () {
              var U = C;
              C = X;
              try {
                return O.apply(this, arguments);
              } finally {
                C = U;
              }
            };
          }));
      })(Pf)),
    Pf
  );
}
var Ev;
function uC() {
  return (Ev || ((Ev = 1), (kf.exports = lC())), kf.exports);
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bv;
function cC() {
  if (bv) return Wt;
  bv = 1;
  var e = Dd(),
    n = uC();
  function o(t) {
    for (
      var r = 'https://reactjs.org/docs/error-decoder.html?invariant=' + t,
        s = 1;
      s < arguments.length;
      s++
    )
      r += '&args[]=' + encodeURIComponent(arguments[s]);
    return (
      'Minified React error #' +
      t +
      '; visit ' +
      r +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  var i = new Set(),
    a = {};
  function l(t, r) {
    (c(t, r), c(t + 'Capture', r));
  }
  function c(t, r) {
    for (a[t] = r, t = 0; t < r.length; t++) i.add(r[t]);
  }
  var f = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    p = Object.prototype.hasOwnProperty,
    m =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    v = {},
    y = {};
  function C(t) {
    return p.call(y, t)
      ? !0
      : p.call(v, t)
        ? !1
        : m.test(t)
          ? (y[t] = !0)
          : ((v[t] = !0), !1);
  }
  function S(t, r, s, u) {
    if (s !== null && s.type === 0) return !1;
    switch (typeof r) {
      case 'function':
      case 'symbol':
        return !0;
      case 'boolean':
        return u
          ? !1
          : s !== null
            ? !s.acceptsBooleans
            : ((t = t.toLowerCase().slice(0, 5)),
              t !== 'data-' && t !== 'aria-');
      default:
        return !1;
    }
  }
  function E(t, r, s, u) {
    if (r === null || typeof r > 'u' || S(t, r, s, u)) return !0;
    if (u) return !1;
    if (s !== null)
      switch (s.type) {
        case 3:
          return !r;
        case 4:
          return r === !1;
        case 5:
          return isNaN(r);
        case 6:
          return isNaN(r) || 1 > r;
      }
    return !1;
  }
  function _(t, r, s, u, d, h, g) {
    ((this.acceptsBooleans = r === 2 || r === 3 || r === 4),
      (this.attributeName = u),
      (this.attributeNamespace = d),
      (this.mustUseProperty = s),
      (this.propertyName = t),
      (this.type = r),
      (this.sanitizeURL = h),
      (this.removeEmptyString = g));
  }
  var b = {};
  ('children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (t) {
      b[t] = new _(t, 0, !1, t, null, !1, !1);
    }),
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv']
    ].forEach(function (t) {
      var r = t[0];
      b[r] = new _(r, 1, !1, t[1], null, !1, !1);
    }),
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
      function (t) {
        b[t] = new _(t, 2, !1, t.toLowerCase(), null, !1, !1);
      }
    ),
    [
      'autoReverse',
      'externalResourcesRequired',
      'focusable',
      'preserveAlpha'
    ].forEach(function (t) {
      b[t] = new _(t, 2, !1, t, null, !1, !1);
    }),
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (t) {
        b[t] = new _(t, 3, !1, t.toLowerCase(), null, !1, !1);
      }),
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (t) {
      b[t] = new _(t, 3, !0, t, null, !1, !1);
    }),
    ['capture', 'download'].forEach(function (t) {
      b[t] = new _(t, 4, !1, t, null, !1, !1);
    }),
    ['cols', 'rows', 'size', 'span'].forEach(function (t) {
      b[t] = new _(t, 6, !1, t, null, !1, !1);
    }),
    ['rowSpan', 'start'].forEach(function (t) {
      b[t] = new _(t, 5, !1, t.toLowerCase(), null, !1, !1);
    }));
  var N = /[\-:]([a-z])/g;
  function R(t) {
    return t[1].toUpperCase();
  }
  ('accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (t) {
      var r = t.replace(N, R);
      b[r] = new _(r, 1, !1, t, null, !1, !1);
    }),
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (t) {
        var r = t.replace(N, R);
        b[r] = new _(r, 1, !1, t, 'http://www.w3.org/1999/xlink', !1, !1);
      }),
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (t) {
      var r = t.replace(N, R);
      b[r] = new _(r, 1, !1, t, 'http://www.w3.org/XML/1998/namespace', !1, !1);
    }),
    ['tabIndex', 'crossOrigin'].forEach(function (t) {
      b[t] = new _(t, 1, !1, t.toLowerCase(), null, !1, !1);
    }),
    (b.xlinkHref = new _(
      'xlinkHref',
      1,
      !1,
      'xlink:href',
      'http://www.w3.org/1999/xlink',
      !0,
      !1
    )),
    ['src', 'href', 'action', 'formAction'].forEach(function (t) {
      b[t] = new _(t, 1, !1, t.toLowerCase(), null, !0, !0);
    }));
  function T(t, r, s, u) {
    var d = b.hasOwnProperty(r) ? b[r] : null;
    (d !== null
      ? d.type !== 0
      : u ||
        !(2 < r.length) ||
        (r[0] !== 'o' && r[0] !== 'O') ||
        (r[1] !== 'n' && r[1] !== 'N')) &&
      (E(r, s, d, u) && (s = null),
      u || d === null
        ? C(r) &&
          (s === null ? t.removeAttribute(r) : t.setAttribute(r, '' + s))
        : d.mustUseProperty
          ? (t[d.propertyName] = s === null ? (d.type === 3 ? !1 : '') : s)
          : ((r = d.attributeName),
            (u = d.attributeNamespace),
            s === null
              ? t.removeAttribute(r)
              : ((d = d.type),
                (s = d === 3 || (d === 4 && s === !0) ? '' : '' + s),
                u ? t.setAttributeNS(u, r, s) : t.setAttribute(r, s))));
  }
  var k = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    $ = Symbol.for('react.element'),
    W = Symbol.for('react.portal'),
    H = Symbol.for('react.fragment'),
    F = Symbol.for('react.strict_mode'),
    G = Symbol.for('react.profiler'),
    q = Symbol.for('react.provider'),
    ce = Symbol.for('react.context'),
    ye = Symbol.for('react.forward_ref'),
    le = Symbol.for('react.suspense'),
    Z = Symbol.for('react.suspense_list'),
    me = Symbol.for('react.memo'),
    fe = Symbol.for('react.lazy'),
    ee = Symbol.for('react.offscreen'),
    O = Symbol.iterator;
  function X(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (O && t[O]) || t['@@iterator']),
        typeof t == 'function' ? t : null);
  }
  var U = Object.assign,
    L;
  function x(t) {
    if (L === void 0)
      try {
        throw Error();
      } catch (s) {
        var r = s.stack.trim().match(/\n( *(at )?)/);
        L = (r && r[1]) || '';
      }
    return (
      `
` +
      L +
      t
    );
  }
  var B = !1;
  function Q(t, r) {
    if (!t || B) return '';
    B = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r)
        if (
          ((r = function () {
            throw Error();
          }),
          Object.defineProperty(r.prototype, 'props', {
            set: function () {
              throw Error();
            }
          }),
          typeof Reflect == 'object' && Reflect.construct)
        ) {
          try {
            Reflect.construct(r, []);
          } catch (K) {
            var u = K;
          }
          Reflect.construct(t, [], r);
        } else {
          try {
            r.call();
          } catch (K) {
            u = K;
          }
          t.call(r.prototype);
        }
      else {
        try {
          throw Error();
        } catch (K) {
          u = K;
        }
        t();
      }
    } catch (K) {
      if (K && u && typeof K.stack == 'string') {
        for (
          var d = K.stack.split(`
`),
            h = u.stack.split(`
`),
            g = d.length - 1,
            P = h.length - 1;
          1 <= g && 0 <= P && d[g] !== h[P];
        )
          P--;
        for (; 1 <= g && 0 <= P; g--, P--)
          if (d[g] !== h[P]) {
            if (g !== 1 || P !== 1)
              do
                if ((g--, P--, 0 > P || d[g] !== h[P])) {
                  var M =
                    `
` + d[g].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      M.includes('<anonymous>') &&
                      (M = M.replace('<anonymous>', t.displayName)),
                    M
                  );
                }
              while (1 <= g && 0 <= P);
            break;
          }
      }
    } finally {
      ((B = !1), (Error.prepareStackTrace = s));
    }
    return (t = t ? t.displayName || t.name : '') ? x(t) : '';
  }
  function te(t) {
    switch (t.tag) {
      case 5:
        return x(t.type);
      case 16:
        return x('Lazy');
      case 13:
        return x('Suspense');
      case 19:
        return x('SuspenseList');
      case 0:
      case 2:
      case 15:
        return ((t = Q(t.type, !1)), t);
      case 11:
        return ((t = Q(t.type.render, !1)), t);
      case 1:
        return ((t = Q(t.type, !0)), t);
      default:
        return '';
    }
  }
  function J(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case H:
        return 'Fragment';
      case W:
        return 'Portal';
      case G:
        return 'Profiler';
      case F:
        return 'StrictMode';
      case le:
        return 'Suspense';
      case Z:
        return 'SuspenseList';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case ce:
          return (t.displayName || 'Context') + '.Consumer';
        case q:
          return (t._context.displayName || 'Context') + '.Provider';
        case ye:
          var r = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = r.displayName || r.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case me:
          return (
            (r = t.displayName || null),
            r !== null ? r : J(t.type) || 'Memo'
          );
        case fe:
          ((r = t._payload), (t = t._init));
          try {
            return J(t(r));
          } catch {}
      }
    return null;
  }
  function de(t) {
    var r = t.type;
    switch (t.tag) {
      case 24:
        return 'Cache';
      case 9:
        return (r.displayName || 'Context') + '.Consumer';
      case 10:
        return (r._context.displayName || 'Context') + '.Provider';
      case 18:
        return 'DehydratedFragment';
      case 11:
        return (
          (t = r.render),
          (t = t.displayName || t.name || ''),
          r.displayName || (t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')
        );
      case 7:
        return 'Fragment';
      case 5:
        return r;
      case 4:
        return 'Portal';
      case 3:
        return 'Root';
      case 6:
        return 'Text';
      case 16:
        return J(r);
      case 8:
        return r === F ? 'StrictMode' : 'Mode';
      case 22:
        return 'Offscreen';
      case 12:
        return 'Profiler';
      case 21:
        return 'Scope';
      case 13:
        return 'Suspense';
      case 19:
        return 'SuspenseList';
      case 25:
        return 'TracingMarker';
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == 'function') return r.displayName || r.name || null;
        if (typeof r == 'string') return r;
    }
    return null;
  }
  function ae(t) {
    switch (typeof t) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return t;
      case 'object':
        return t;
      default:
        return '';
    }
  }
  function _e(t) {
    var r = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === 'input' &&
      (r === 'checkbox' || r === 'radio')
    );
  }
  function Me(t) {
    var r = _e(t) ? 'checked' : 'value',
      s = Object.getOwnPropertyDescriptor(t.constructor.prototype, r),
      u = '' + t[r];
    if (
      !t.hasOwnProperty(r) &&
      typeof s < 'u' &&
      typeof s.get == 'function' &&
      typeof s.set == 'function'
    ) {
      var d = s.get,
        h = s.set;
      return (
        Object.defineProperty(t, r, {
          configurable: !0,
          get: function () {
            return d.call(this);
          },
          set: function (g) {
            ((u = '' + g), h.call(this, g));
          }
        }),
        Object.defineProperty(t, r, { enumerable: s.enumerable }),
        {
          getValue: function () {
            return u;
          },
          setValue: function (g) {
            u = '' + g;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[r]);
          }
        }
      );
    }
  }
  function Ue(t) {
    t._valueTracker || (t._valueTracker = Me(t));
  }
  function Ie(t) {
    if (!t) return !1;
    var r = t._valueTracker;
    if (!r) return !0;
    var s = r.getValue(),
      u = '';
    return (
      t && (u = _e(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = u),
      t !== s ? (r.setValue(t), !0) : !1
    );
  }
  function We(t) {
    if (
      ((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function mt(t, r) {
    var s = r.checked;
    return U({}, r, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: s ?? t._wrapperState.initialChecked
    });
  }
  function vt(t, r) {
    var s = r.defaultValue == null ? '' : r.defaultValue,
      u = r.checked != null ? r.checked : r.defaultChecked;
    ((s = ae(r.value != null ? r.value : s)),
      (t._wrapperState = {
        initialChecked: u,
        initialValue: s,
        controlled:
          r.type === 'checkbox' || r.type === 'radio'
            ? r.checked != null
            : r.value != null
      }));
  }
  function dt(t, r) {
    ((r = r.checked), r != null && T(t, 'checked', r, !1));
  }
  function Mn(t, r) {
    dt(t, r);
    var s = ae(r.value),
      u = r.type;
    if (s != null)
      u === 'number'
        ? ((s === 0 && t.value === '') || t.value != s) && (t.value = '' + s)
        : t.value !== '' + s && (t.value = '' + s);
    else if (u === 'submit' || u === 'reset') {
      t.removeAttribute('value');
      return;
    }
    (r.hasOwnProperty('value')
      ? Qr(t, r.type, s)
      : r.hasOwnProperty('defaultValue') && Qr(t, r.type, ae(r.defaultValue)),
      r.checked == null &&
        r.defaultChecked != null &&
        (t.defaultChecked = !!r.defaultChecked));
  }
  function Kr(t, r, s) {
    if (r.hasOwnProperty('value') || r.hasOwnProperty('defaultValue')) {
      var u = r.type;
      if (
        !(
          (u !== 'submit' && u !== 'reset') ||
          (r.value !== void 0 && r.value !== null)
        )
      )
        return;
      ((r = '' + t._wrapperState.initialValue),
        s || r === t.value || (t.value = r),
        (t.defaultValue = r));
    }
    ((s = t.name),
      s !== '' && (t.name = ''),
      (t.defaultChecked = !!t._wrapperState.initialChecked),
      s !== '' && (t.name = s));
  }
  function Qr(t, r, s) {
    (r !== 'number' || We(t.ownerDocument) !== t) &&
      (s == null
        ? (t.defaultValue = '' + t._wrapperState.initialValue)
        : t.defaultValue !== '' + s && (t.defaultValue = '' + s));
  }
  var pn = Array.isArray;
  function An(t, r, s, u) {
    if (((t = t.options), r)) {
      r = {};
      for (var d = 0; d < s.length; d++) r['$' + s[d]] = !0;
      for (s = 0; s < t.length; s++)
        ((d = r.hasOwnProperty('$' + t[s].value)),
          t[s].selected !== d && (t[s].selected = d),
          d && u && (t[s].defaultSelected = !0));
    } else {
      for (s = '' + ae(s), r = null, d = 0; d < t.length; d++) {
        if (t[d].value === s) {
          ((t[d].selected = !0), u && (t[d].defaultSelected = !0));
          return;
        }
        r !== null || t[d].disabled || (r = t[d]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Ao(t, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(o(91));
    return U({}, r, {
      value: void 0,
      defaultValue: void 0,
      children: '' + t._wrapperState.initialValue
    });
  }
  function ia(t, r) {
    var s = r.value;
    if (s == null) {
      if (((s = r.children), (r = r.defaultValue), s != null)) {
        if (r != null) throw Error(o(92));
        if (pn(s)) {
          if (1 < s.length) throw Error(o(93));
          s = s[0];
        }
        r = s;
      }
      (r == null && (r = ''), (s = r));
    }
    t._wrapperState = { initialValue: ae(s) };
  }
  function $o(t, r) {
    var s = ae(r.value),
      u = ae(r.defaultValue);
    (s != null &&
      ((s = '' + s),
      s !== t.value && (t.value = s),
      r.defaultValue == null && t.defaultValue !== s && (t.defaultValue = s)),
      u != null && (t.defaultValue = '' + u));
  }
  function Oo(t) {
    var r = t.textContent;
    r === t._wrapperState.initialValue &&
      r !== '' &&
      r !== null &&
      (t.value = r);
  }
  function sa(t) {
    switch (t) {
      case 'svg':
        return 'http://www.w3.org/2000/svg';
      case 'math':
        return 'http://www.w3.org/1998/Math/MathML';
      default:
        return 'http://www.w3.org/1999/xhtml';
    }
  }
  function Ui(t, r) {
    return t == null || t === 'http://www.w3.org/1999/xhtml'
      ? sa(r)
      : t === 'http://www.w3.org/2000/svg' && r === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : t;
  }
  var Io,
    aa = (function (t) {
      return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
        ? function (r, s, u, d) {
            MSApp.execUnsafeLocalFunction(function () {
              return t(r, s, u, d);
            });
          }
        : t;
    })(function (t, r) {
      if (t.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in t)
        t.innerHTML = r;
      else {
        for (
          Io = Io || document.createElement('div'),
            Io.innerHTML = '<svg>' + r.valueOf().toString() + '</svg>',
            r = Io.firstChild;
          t.firstChild;
        )
          t.removeChild(t.firstChild);
        for (; r.firstChild; ) t.appendChild(r.firstChild);
      }
    });
  function Gr(t, r) {
    if (r) {
      var s = t.firstChild;
      if (s && s === t.lastChild && s.nodeType === 3) {
        s.nodeValue = r;
        return;
      }
    }
    t.textContent = r;
  }
  var Yr = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    },
    la = ['Webkit', 'ms', 'Moz', 'O'];
  Object.keys(Yr).forEach(function (t) {
    la.forEach(function (r) {
      ((r = r + t.charAt(0).toUpperCase() + t.substring(1)), (Yr[r] = Yr[t]));
    });
  });
  function ua(t, r, s) {
    return r == null || typeof r == 'boolean' || r === ''
      ? ''
      : s || typeof r != 'number' || r === 0 || (Yr.hasOwnProperty(t) && Yr[t])
        ? ('' + r).trim()
        : r + 'px';
  }
  function ca(t, r) {
    t = t.style;
    for (var s in r)
      if (r.hasOwnProperty(s)) {
        var u = s.indexOf('--') === 0,
          d = ua(s, r[s], u);
        (s === 'float' && (s = 'cssFloat'),
          u ? t.setProperty(s, d) : (t[s] = d));
      }
  }
  var j = U(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
    }
  );
  function I(t, r) {
    if (r) {
      if (j[t] && (r.children != null || r.dangerouslySetInnerHTML != null))
        throw Error(o(137, t));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(o(60));
        if (
          typeof r.dangerouslySetInnerHTML != 'object' ||
          !('__html' in r.dangerouslySetInnerHTML)
        )
          throw Error(o(61));
      }
      if (r.style != null && typeof r.style != 'object') throw Error(o(62));
    }
  }
  function oe(t, r) {
    if (t.indexOf('-') === -1) return typeof r.is == 'string';
    switch (t) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1;
      default:
        return !0;
    }
  }
  var pe = null;
  function he(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var ge = null,
    Re = null,
    be = null;
  function Pe(t) {
    if ((t = us(t))) {
      if (typeof ge != 'function') throw Error(o(280));
      var r = t.stateNode;
      r && ((r = Aa(r)), ge(t.stateNode, t.type, r));
    }
  }
  function $e(t) {
    Re ? (be ? be.push(t) : (be = [t])) : (Re = t);
  }
  function He() {
    if (Re) {
      var t = Re,
        r = be;
      if (((be = Re = null), Pe(t), r)) for (t = 0; t < r.length; t++) Pe(r[t]);
    }
  }
  function _t(t, r) {
    return t(r);
  }
  function at() {}
  var xt = !1;
  function Ft(t, r, s) {
    if (xt) return t(r, s);
    xt = !0;
    try {
      return _t(t, r, s);
    } finally {
      ((xt = !1), (Re !== null || be !== null) && (at(), He()));
    }
  }
  function Jt(t, r) {
    var s = t.stateNode;
    if (s === null) return null;
    var u = Aa(s);
    if (u === null) return null;
    s = u[r];
    e: switch (r) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ((u = !u.disabled) ||
          ((t = t.type),
          (u = !(
            t === 'button' ||
            t === 'input' ||
            t === 'select' ||
            t === 'textarea'
          ))),
          (t = !u));
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (s && typeof s != 'function') throw Error(o(231, r, typeof s));
    return s;
  }
  var pr = !1;
  if (f)
    try {
      var hn = {};
      (Object.defineProperty(hn, 'passive', {
        get: function () {
          pr = !0;
        }
      }),
        window.addEventListener('test', hn, hn),
        window.removeEventListener('test', hn, hn));
    } catch {
      pr = !1;
    }
  function Xr(t, r, s, u, d, h, g, P, M) {
    var K = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(s, K);
    } catch (re) {
      this.onError(re);
    }
  }
  var Wi = !1,
    fa = null,
    da = !1,
    Bu = null,
    fS = {
      onError: function (t) {
        ((Wi = !0), (fa = t));
      }
    };
  function dS(t, r, s, u, d, h, g, P, M) {
    ((Wi = !1), (fa = null), Xr.apply(fS, arguments));
  }
  function pS(t, r, s, u, d, h, g, P, M) {
    if ((dS.apply(this, arguments), Wi)) {
      if (Wi) {
        var K = fa;
        ((Wi = !1), (fa = null));
      } else throw Error(o(198));
      da || ((da = !0), (Bu = K));
    }
  }
  function qr(t) {
    var r = t,
      s = t;
    if (t.alternate) for (; r.return; ) r = r.return;
    else {
      t = r;
      do ((r = t), (r.flags & 4098) !== 0 && (s = r.return), (t = r.return));
      while (t);
    }
    return r.tag === 3 ? s : null;
  }
  function jp(t) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (
        (r === null && ((t = t.alternate), t !== null && (r = t.memoizedState)),
        r !== null)
      )
        return r.dehydrated;
    }
    return null;
  }
  function Vp(t) {
    if (qr(t) !== t) throw Error(o(188));
  }
  function hS(t) {
    var r = t.alternate;
    if (!r) {
      if (((r = qr(t)), r === null)) throw Error(o(188));
      return r !== t ? null : t;
    }
    for (var s = t, u = r; ; ) {
      var d = s.return;
      if (d === null) break;
      var h = d.alternate;
      if (h === null) {
        if (((u = d.return), u !== null)) {
          s = u;
          continue;
        }
        break;
      }
      if (d.child === h.child) {
        for (h = d.child; h; ) {
          if (h === s) return (Vp(d), t);
          if (h === u) return (Vp(d), r);
          h = h.sibling;
        }
        throw Error(o(188));
      }
      if (s.return !== u.return) ((s = d), (u = h));
      else {
        for (var g = !1, P = d.child; P; ) {
          if (P === s) {
            ((g = !0), (s = d), (u = h));
            break;
          }
          if (P === u) {
            ((g = !0), (u = d), (s = h));
            break;
          }
          P = P.sibling;
        }
        if (!g) {
          for (P = h.child; P; ) {
            if (P === s) {
              ((g = !0), (s = h), (u = d));
              break;
            }
            if (P === u) {
              ((g = !0), (u = h), (s = d));
              break;
            }
            P = P.sibling;
          }
          if (!g) throw Error(o(189));
        }
      }
      if (s.alternate !== u) throw Error(o(190));
    }
    if (s.tag !== 3) throw Error(o(188));
    return s.stateNode.current === s ? t : r;
  }
  function Bp(t) {
    return ((t = hS(t)), t !== null ? Up(t) : null);
  }
  function Up(t) {
    if (t.tag === 5 || t.tag === 6) return t;
    for (t = t.child; t !== null; ) {
      var r = Up(t);
      if (r !== null) return r;
      t = t.sibling;
    }
    return null;
  }
  var Wp = n.unstable_scheduleCallback,
    Hp = n.unstable_cancelCallback,
    mS = n.unstable_shouldYield,
    vS = n.unstable_requestPaint,
    lt = n.unstable_now,
    yS = n.unstable_getCurrentPriorityLevel,
    Uu = n.unstable_ImmediatePriority,
    Kp = n.unstable_UserBlockingPriority,
    pa = n.unstable_NormalPriority,
    gS = n.unstable_LowPriority,
    Qp = n.unstable_IdlePriority,
    ha = null,
    $n = null;
  function wS(t) {
    if ($n && typeof $n.onCommitFiberRoot == 'function')
      try {
        $n.onCommitFiberRoot(ha, t, void 0, (t.current.flags & 128) === 128);
      } catch {}
  }
  var mn = Math.clz32 ? Math.clz32 : _S,
    SS = Math.log,
    CS = Math.LN2;
  function _S(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((SS(t) / CS) | 0)) | 0);
  }
  var ma = 64,
    va = 4194304;
  function Hi(t) {
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return t & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return t;
    }
  }
  function ya(t, r) {
    var s = t.pendingLanes;
    if (s === 0) return 0;
    var u = 0,
      d = t.suspendedLanes,
      h = t.pingedLanes,
      g = s & 268435455;
    if (g !== 0) {
      var P = g & ~d;
      P !== 0 ? (u = Hi(P)) : ((h &= g), h !== 0 && (u = Hi(h)));
    } else ((g = s & ~d), g !== 0 ? (u = Hi(g)) : h !== 0 && (u = Hi(h)));
    if (u === 0) return 0;
    if (
      r !== 0 &&
      r !== u &&
      (r & d) === 0 &&
      ((d = u & -u), (h = r & -r), d >= h || (d === 16 && (h & 4194240) !== 0))
    )
      return r;
    if (((u & 4) !== 0 && (u |= s & 16), (r = t.entangledLanes), r !== 0))
      for (t = t.entanglements, r &= u; 0 < r; )
        ((s = 31 - mn(r)), (d = 1 << s), (u |= t[s]), (r &= ~d));
    return u;
  }
  function ES(t, r) {
    switch (t) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function bS(t, r) {
    for (
      var s = t.suspendedLanes,
        u = t.pingedLanes,
        d = t.expirationTimes,
        h = t.pendingLanes;
      0 < h;
    ) {
      var g = 31 - mn(h),
        P = 1 << g,
        M = d[g];
      (M === -1
        ? ((P & s) === 0 || (P & u) !== 0) && (d[g] = ES(P, r))
        : M <= r && (t.expiredLanes |= P),
        (h &= ~P));
    }
  }
  function Wu(t) {
    return (
      (t = t.pendingLanes & -1073741825),
      t !== 0 ? t : t & 1073741824 ? 1073741824 : 0
    );
  }
  function Gp() {
    var t = ma;
    return ((ma <<= 1), (ma & 4194240) === 0 && (ma = 64), t);
  }
  function Hu(t) {
    for (var r = [], s = 0; 31 > s; s++) r.push(t);
    return r;
  }
  function Ki(t, r, s) {
    ((t.pendingLanes |= r),
      r !== 536870912 && ((t.suspendedLanes = 0), (t.pingedLanes = 0)),
      (t = t.eventTimes),
      (r = 31 - mn(r)),
      (t[r] = s));
  }
  function RS(t, r) {
    var s = t.pendingLanes & ~r;
    ((t.pendingLanes = r),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.expiredLanes &= r),
      (t.mutableReadLanes &= r),
      (t.entangledLanes &= r),
      (r = t.entanglements));
    var u = t.eventTimes;
    for (t = t.expirationTimes; 0 < s; ) {
      var d = 31 - mn(s),
        h = 1 << d;
      ((r[d] = 0), (u[d] = -1), (t[d] = -1), (s &= ~h));
    }
  }
  function Ku(t, r) {
    var s = (t.entangledLanes |= r);
    for (t = t.entanglements; s; ) {
      var u = 31 - mn(s),
        d = 1 << u;
      ((d & r) | (t[u] & r) && (t[u] |= r), (s &= ~d));
    }
  }
  var Ve = 0;
  function Yp(t) {
    return (
      (t &= -t),
      1 < t ? (4 < t ? ((t & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var Xp,
    Qu,
    qp,
    Zp,
    Jp,
    Gu = !1,
    ga = [],
    hr = null,
    mr = null,
    vr = null,
    Qi = new Map(),
    Gi = new Map(),
    yr = [],
    xS =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
        ' '
      );
  function eh(t, r) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        hr = null;
        break;
      case 'dragenter':
      case 'dragleave':
        mr = null;
        break;
      case 'mouseover':
      case 'mouseout':
        vr = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Qi.delete(r.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Gi.delete(r.pointerId);
    }
  }
  function Yi(t, r, s, u, d, h) {
    return t === null || t.nativeEvent !== h
      ? ((t = {
          blockedOn: r,
          domEventName: s,
          eventSystemFlags: u,
          nativeEvent: h,
          targetContainers: [d]
        }),
        r !== null && ((r = us(r)), r !== null && Qu(r)),
        t)
      : ((t.eventSystemFlags |= u),
        (r = t.targetContainers),
        d !== null && r.indexOf(d) === -1 && r.push(d),
        t);
  }
  function TS(t, r, s, u, d) {
    switch (r) {
      case 'focusin':
        return ((hr = Yi(hr, t, r, s, u, d)), !0);
      case 'dragenter':
        return ((mr = Yi(mr, t, r, s, u, d)), !0);
      case 'mouseover':
        return ((vr = Yi(vr, t, r, s, u, d)), !0);
      case 'pointerover':
        var h = d.pointerId;
        return (Qi.set(h, Yi(Qi.get(h) || null, t, r, s, u, d)), !0);
      case 'gotpointercapture':
        return (
          (h = d.pointerId),
          Gi.set(h, Yi(Gi.get(h) || null, t, r, s, u, d)),
          !0
        );
    }
    return !1;
  }
  function th(t) {
    var r = Zr(t.target);
    if (r !== null) {
      var s = qr(r);
      if (s !== null) {
        if (((r = s.tag), r === 13)) {
          if (((r = jp(s)), r !== null)) {
            ((t.blockedOn = r),
              Jp(t.priority, function () {
                qp(s);
              }));
            return;
          }
        } else if (r === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function wa(t) {
    if (t.blockedOn !== null) return !1;
    for (var r = t.targetContainers; 0 < r.length; ) {
      var s = Xu(t.domEventName, t.eventSystemFlags, r[0], t.nativeEvent);
      if (s === null) {
        s = t.nativeEvent;
        var u = new s.constructor(s.type, s);
        ((pe = u), s.target.dispatchEvent(u), (pe = null));
      } else return ((r = us(s)), r !== null && Qu(r), (t.blockedOn = s), !1);
      r.shift();
    }
    return !0;
  }
  function nh(t, r, s) {
    wa(t) && s.delete(r);
  }
  function kS() {
    ((Gu = !1),
      hr !== null && wa(hr) && (hr = null),
      mr !== null && wa(mr) && (mr = null),
      vr !== null && wa(vr) && (vr = null),
      Qi.forEach(nh),
      Gi.forEach(nh));
  }
  function Xi(t, r) {
    t.blockedOn === r &&
      ((t.blockedOn = null),
      Gu ||
        ((Gu = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, kS)));
  }
  function qi(t) {
    function r(d) {
      return Xi(d, t);
    }
    if (0 < ga.length) {
      Xi(ga[0], t);
      for (var s = 1; s < ga.length; s++) {
        var u = ga[s];
        u.blockedOn === t && (u.blockedOn = null);
      }
    }
    for (
      hr !== null && Xi(hr, t),
        mr !== null && Xi(mr, t),
        vr !== null && Xi(vr, t),
        Qi.forEach(r),
        Gi.forEach(r),
        s = 0;
      s < yr.length;
      s++
    )
      ((u = yr[s]), u.blockedOn === t && (u.blockedOn = null));
    for (; 0 < yr.length && ((s = yr[0]), s.blockedOn === null); )
      (th(s), s.blockedOn === null && yr.shift());
  }
  var Do = k.ReactCurrentBatchConfig,
    Sa = !0;
  function PS(t, r, s, u) {
    var d = Ve,
      h = Do.transition;
    Do.transition = null;
    try {
      ((Ve = 1), Yu(t, r, s, u));
    } finally {
      ((Ve = d), (Do.transition = h));
    }
  }
  function NS(t, r, s, u) {
    var d = Ve,
      h = Do.transition;
    Do.transition = null;
    try {
      ((Ve = 4), Yu(t, r, s, u));
    } finally {
      ((Ve = d), (Do.transition = h));
    }
  }
  function Yu(t, r, s, u) {
    if (Sa) {
      var d = Xu(t, r, s, u);
      if (d === null) (pc(t, r, u, Ca, s), eh(t, u));
      else if (TS(d, t, r, s, u)) u.stopPropagation();
      else if ((eh(t, u), r & 4 && -1 < xS.indexOf(t))) {
        for (; d !== null; ) {
          var h = us(d);
          if (
            (h !== null && Xp(h),
            (h = Xu(t, r, s, u)),
            h === null && pc(t, r, u, Ca, s),
            h === d)
          )
            break;
          d = h;
        }
        d !== null && u.stopPropagation();
      } else pc(t, r, u, null, s);
    }
  }
  var Ca = null;
  function Xu(t, r, s, u) {
    if (((Ca = null), (t = he(u)), (t = Zr(t)), t !== null))
      if (((r = qr(t)), r === null)) t = null;
      else if (((s = r.tag), s === 13)) {
        if (((t = jp(r)), t !== null)) return t;
        t = null;
      } else if (s === 3) {
        if (r.stateNode.current.memoizedState.isDehydrated)
          return r.tag === 3 ? r.stateNode.containerInfo : null;
        t = null;
      } else r !== t && (t = null);
    return ((Ca = t), null);
  }
  function rh(t) {
    switch (t) {
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 1;
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'toggle':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 4;
      case 'message':
        switch (yS()) {
          case Uu:
            return 1;
          case Kp:
            return 4;
          case pa:
          case gS:
            return 16;
          case Qp:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var gr = null,
    qu = null,
    _a = null;
  function oh() {
    if (_a) return _a;
    var t,
      r = qu,
      s = r.length,
      u,
      d = 'value' in gr ? gr.value : gr.textContent,
      h = d.length;
    for (t = 0; t < s && r[t] === d[t]; t++);
    var g = s - t;
    for (u = 1; u <= g && r[s - u] === d[h - u]; u++);
    return (_a = d.slice(t, 1 < u ? 1 - u : void 0));
  }
  function Ea(t) {
    var r = t.keyCode;
    return (
      'charCode' in t
        ? ((t = t.charCode), t === 0 && r === 13 && (t = 13))
        : (t = r),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function ba() {
    return !0;
  }
  function ih() {
    return !1;
  }
  function Qt(t) {
    function r(s, u, d, h, g) {
      ((this._reactName = s),
        (this._targetInst = d),
        (this.type = u),
        (this.nativeEvent = h),
        (this.target = g),
        (this.currentTarget = null));
      for (var P in t)
        t.hasOwnProperty(P) && ((s = t[P]), (this[P] = s ? s(h) : h[P]));
      return (
        (this.isDefaultPrevented = (
          h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1
        )
          ? ba
          : ih),
        (this.isPropagationStopped = ih),
        this
      );
    }
    return (
      U(r.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var s = this.nativeEvent;
          s &&
            (s.preventDefault
              ? s.preventDefault()
              : typeof s.returnValue != 'unknown' && (s.returnValue = !1),
            (this.isDefaultPrevented = ba));
        },
        stopPropagation: function () {
          var s = this.nativeEvent;
          s &&
            (s.stopPropagation
              ? s.stopPropagation()
              : typeof s.cancelBubble != 'unknown' && (s.cancelBubble = !0),
            (this.isPropagationStopped = ba));
        },
        persist: function () {},
        isPersistent: ba
      }),
      r
    );
  }
  var Fo = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    },
    Zu = Qt(Fo),
    Zi = U({}, Fo, { view: 0, detail: 0 }),
    LS = Qt(Zi),
    Ju,
    ec,
    Ji,
    Ra = U({}, Zi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: nc,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return 'movementX' in t
          ? t.movementX
          : (t !== Ji &&
              (Ji && t.type === 'mousemove'
                ? ((Ju = t.screenX - Ji.screenX), (ec = t.screenY - Ji.screenY))
                : (ec = Ju = 0),
              (Ji = t)),
            Ju);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : ec;
      }
    }),
    sh = Qt(Ra),
    MS = U({}, Ra, { dataTransfer: 0 }),
    AS = Qt(MS),
    $S = U({}, Zi, { relatedTarget: 0 }),
    tc = Qt($S),
    OS = U({}, Fo, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    IS = Qt(OS),
    DS = U({}, Fo, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      }
    }),
    FS = Qt(DS),
    zS = U({}, Fo, { data: 0 }),
    ah = Qt(zS),
    jS = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified'
    },
    VS = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
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
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta'
    },
    BS = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey'
    };
  function US(t) {
    var r = this.nativeEvent;
    return r.getModifierState
      ? r.getModifierState(t)
      : (t = BS[t])
        ? !!r[t]
        : !1;
  }
  function nc() {
    return US;
  }
  var WS = U({}, Zi, {
      key: function (t) {
        if (t.key) {
          var r = jS[t.key] || t.key;
          if (r !== 'Unidentified') return r;
        }
        return t.type === 'keypress'
          ? ((t = Ea(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? VS[t.keyCode] || 'Unidentified'
            : '';
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: nc,
      charCode: function (t) {
        return t.type === 'keypress' ? Ea(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? Ea(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      }
    }),
    HS = Qt(WS),
    KS = U({}, Ra, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }),
    lh = Qt(KS),
    QS = U({}, Zi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: nc
    }),
    GS = Qt(QS),
    YS = U({}, Fo, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    XS = Qt(YS),
    qS = U({}, Ra, {
      deltaX: function (t) {
        return 'deltaX' in t
          ? t.deltaX
          : 'wheelDeltaX' in t
            ? -t.wheelDeltaX
            : 0;
      },
      deltaY: function (t) {
        return 'deltaY' in t
          ? t.deltaY
          : 'wheelDeltaY' in t
            ? -t.wheelDeltaY
            : 'wheelDelta' in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }),
    ZS = Qt(qS),
    JS = [9, 13, 27, 32],
    rc = f && 'CompositionEvent' in window,
    es = null;
  f && 'documentMode' in document && (es = document.documentMode);
  var e1 = f && 'TextEvent' in window && !es,
    uh = f && (!rc || (es && 8 < es && 11 >= es)),
    ch = ' ',
    fh = !1;
  function dh(t, r) {
    switch (t) {
      case 'keyup':
        return JS.indexOf(r.keyCode) !== -1;
      case 'keydown':
        return r.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function ph(t) {
    return (
      (t = t.detail),
      typeof t == 'object' && 'data' in t ? t.data : null
    );
  }
  var zo = !1;
  function t1(t, r) {
    switch (t) {
      case 'compositionend':
        return ph(r);
      case 'keypress':
        return r.which !== 32 ? null : ((fh = !0), ch);
      case 'textInput':
        return ((t = r.data), t === ch && fh ? null : t);
      default:
        return null;
    }
  }
  function n1(t, r) {
    if (zo)
      return t === 'compositionend' || (!rc && dh(t, r))
        ? ((t = oh()), (_a = qu = gr = null), (zo = !1), t)
        : null;
    switch (t) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(r.ctrlKey || r.altKey || r.metaKey) || (r.ctrlKey && r.altKey)) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case 'compositionend':
        return uh && r.locale !== 'ko' ? null : r.data;
      default:
        return null;
    }
  }
  var r1 = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function hh(t) {
    var r = t && t.nodeName && t.nodeName.toLowerCase();
    return r === 'input' ? !!r1[t.type] : r === 'textarea';
  }
  function mh(t, r, s, u) {
    ($e(u),
      (r = Na(r, 'onChange')),
      0 < r.length &&
        ((s = new Zu('onChange', 'change', null, s, u)),
        t.push({ event: s, listeners: r })));
  }
  var ts = null,
    ns = null;
  function o1(t) {
    Ah(t, 0);
  }
  function xa(t) {
    var r = Wo(t);
    if (Ie(r)) return t;
  }
  function i1(t, r) {
    if (t === 'change') return r;
  }
  var vh = !1;
  if (f) {
    var oc;
    if (f) {
      var ic = 'oninput' in document;
      if (!ic) {
        var yh = document.createElement('div');
        (yh.setAttribute('oninput', 'return;'),
          (ic = typeof yh.oninput == 'function'));
      }
      oc = ic;
    } else oc = !1;
    vh = oc && (!document.documentMode || 9 < document.documentMode);
  }
  function gh() {
    ts && (ts.detachEvent('onpropertychange', wh), (ns = ts = null));
  }
  function wh(t) {
    if (t.propertyName === 'value' && xa(ns)) {
      var r = [];
      (mh(r, ns, t, he(t)), Ft(o1, r));
    }
  }
  function s1(t, r, s) {
    t === 'focusin'
      ? (gh(), (ts = r), (ns = s), ts.attachEvent('onpropertychange', wh))
      : t === 'focusout' && gh();
  }
  function a1(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown')
      return xa(ns);
  }
  function l1(t, r) {
    if (t === 'click') return xa(r);
  }
  function u1(t, r) {
    if (t === 'input' || t === 'change') return xa(r);
  }
  function c1(t, r) {
    return (t === r && (t !== 0 || 1 / t === 1 / r)) || (t !== t && r !== r);
  }
  var vn = typeof Object.is == 'function' ? Object.is : c1;
  function rs(t, r) {
    if (vn(t, r)) return !0;
    if (
      typeof t != 'object' ||
      t === null ||
      typeof r != 'object' ||
      r === null
    )
      return !1;
    var s = Object.keys(t),
      u = Object.keys(r);
    if (s.length !== u.length) return !1;
    for (u = 0; u < s.length; u++) {
      var d = s[u];
      if (!p.call(r, d) || !vn(t[d], r[d])) return !1;
    }
    return !0;
  }
  function Sh(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Ch(t, r) {
    var s = Sh(t);
    t = 0;
    for (var u; s; ) {
      if (s.nodeType === 3) {
        if (((u = t + s.textContent.length), t <= r && u >= r))
          return { node: s, offset: r - t };
        t = u;
      }
      e: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break e;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = Sh(s);
    }
  }
  function _h(t, r) {
    return t && r
      ? t === r
        ? !0
        : t && t.nodeType === 3
          ? !1
          : r && r.nodeType === 3
            ? _h(t, r.parentNode)
            : 'contains' in t
              ? t.contains(r)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(r) & 16)
                : !1
      : !1;
  }
  function Eh() {
    for (var t = window, r = We(); r instanceof t.HTMLIFrameElement; ) {
      try {
        var s = typeof r.contentWindow.location.href == 'string';
      } catch {
        s = !1;
      }
      if (s) t = r.contentWindow;
      else break;
      r = We(t.document);
    }
    return r;
  }
  function sc(t) {
    var r = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      r &&
      ((r === 'input' &&
        (t.type === 'text' ||
          t.type === 'search' ||
          t.type === 'tel' ||
          t.type === 'url' ||
          t.type === 'password')) ||
        r === 'textarea' ||
        t.contentEditable === 'true')
    );
  }
  function f1(t) {
    var r = Eh(),
      s = t.focusedElem,
      u = t.selectionRange;
    if (
      r !== s &&
      s &&
      s.ownerDocument &&
      _h(s.ownerDocument.documentElement, s)
    ) {
      if (u !== null && sc(s)) {
        if (
          ((r = u.start),
          (t = u.end),
          t === void 0 && (t = r),
          'selectionStart' in s)
        )
          ((s.selectionStart = r),
            (s.selectionEnd = Math.min(t, s.value.length)));
        else if (
          ((t = ((r = s.ownerDocument || document) && r.defaultView) || window),
          t.getSelection)
        ) {
          t = t.getSelection();
          var d = s.textContent.length,
            h = Math.min(u.start, d);
          ((u = u.end === void 0 ? h : Math.min(u.end, d)),
            !t.extend && h > u && ((d = u), (u = h), (h = d)),
            (d = Ch(s, h)));
          var g = Ch(s, u);
          d &&
            g &&
            (t.rangeCount !== 1 ||
              t.anchorNode !== d.node ||
              t.anchorOffset !== d.offset ||
              t.focusNode !== g.node ||
              t.focusOffset !== g.offset) &&
            ((r = r.createRange()),
            r.setStart(d.node, d.offset),
            t.removeAllRanges(),
            h > u
              ? (t.addRange(r), t.extend(g.node, g.offset))
              : (r.setEnd(g.node, g.offset), t.addRange(r)));
        }
      }
      for (r = [], t = s; (t = t.parentNode); )
        t.nodeType === 1 &&
          r.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
      for (typeof s.focus == 'function' && s.focus(), s = 0; s < r.length; s++)
        ((t = r[s]),
          (t.element.scrollLeft = t.left),
          (t.element.scrollTop = t.top));
    }
  }
  var d1 = f && 'documentMode' in document && 11 >= document.documentMode,
    jo = null,
    ac = null,
    os = null,
    lc = !1;
  function bh(t, r, s) {
    var u =
      s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    lc ||
      jo == null ||
      jo !== We(u) ||
      ((u = jo),
      'selectionStart' in u && sc(u)
        ? (u = { start: u.selectionStart, end: u.selectionEnd })
        : ((u = (
            (u.ownerDocument && u.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (u = {
            anchorNode: u.anchorNode,
            anchorOffset: u.anchorOffset,
            focusNode: u.focusNode,
            focusOffset: u.focusOffset
          })),
      (os && rs(os, u)) ||
        ((os = u),
        (u = Na(ac, 'onSelect')),
        0 < u.length &&
          ((r = new Zu('onSelect', 'select', null, r, s)),
          t.push({ event: r, listeners: u }),
          (r.target = jo))));
  }
  function Ta(t, r) {
    var s = {};
    return (
      (s[t.toLowerCase()] = r.toLowerCase()),
      (s['Webkit' + t] = 'webkit' + r),
      (s['Moz' + t] = 'moz' + r),
      s
    );
  }
  var Vo = {
      animationend: Ta('Animation', 'AnimationEnd'),
      animationiteration: Ta('Animation', 'AnimationIteration'),
      animationstart: Ta('Animation', 'AnimationStart'),
      transitionend: Ta('Transition', 'TransitionEnd')
    },
    uc = {},
    Rh = {};
  f &&
    ((Rh = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Vo.animationend.animation,
      delete Vo.animationiteration.animation,
      delete Vo.animationstart.animation),
    'TransitionEvent' in window || delete Vo.transitionend.transition);
  function ka(t) {
    if (uc[t]) return uc[t];
    if (!Vo[t]) return t;
    var r = Vo[t],
      s;
    for (s in r) if (r.hasOwnProperty(s) && s in Rh) return (uc[t] = r[s]);
    return t;
  }
  var xh = ka('animationend'),
    Th = ka('animationiteration'),
    kh = ka('animationstart'),
    Ph = ka('transitionend'),
    Nh = new Map(),
    Lh =
      'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  function wr(t, r) {
    (Nh.set(t, r), l(r, [t]));
  }
  for (var cc = 0; cc < Lh.length; cc++) {
    var fc = Lh[cc],
      p1 = fc.toLowerCase(),
      h1 = fc[0].toUpperCase() + fc.slice(1);
    wr(p1, 'on' + h1);
  }
  (wr(xh, 'onAnimationEnd'),
    wr(Th, 'onAnimationIteration'),
    wr(kh, 'onAnimationStart'),
    wr('dblclick', 'onDoubleClick'),
    wr('focusin', 'onFocus'),
    wr('focusout', 'onBlur'),
    wr(Ph, 'onTransitionEnd'),
    c('onMouseEnter', ['mouseout', 'mouseover']),
    c('onMouseLeave', ['mouseout', 'mouseover']),
    c('onPointerEnter', ['pointerout', 'pointerover']),
    c('onPointerLeave', ['pointerout', 'pointerover']),
    l(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' '
      )
    ),
    l(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    l('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    l(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' ')
    ),
    l(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    l(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var is =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    m1 = new Set(
      'cancel close invalid load scroll toggle'.split(' ').concat(is)
    );
  function Mh(t, r, s) {
    var u = t.type || 'unknown-event';
    ((t.currentTarget = s), pS(u, r, void 0, t), (t.currentTarget = null));
  }
  function Ah(t, r) {
    r = (r & 4) !== 0;
    for (var s = 0; s < t.length; s++) {
      var u = t[s],
        d = u.event;
      u = u.listeners;
      e: {
        var h = void 0;
        if (r)
          for (var g = u.length - 1; 0 <= g; g--) {
            var P = u[g],
              M = P.instance,
              K = P.currentTarget;
            if (((P = P.listener), M !== h && d.isPropagationStopped()))
              break e;
            (Mh(d, P, K), (h = M));
          }
        else
          for (g = 0; g < u.length; g++) {
            if (
              ((P = u[g]),
              (M = P.instance),
              (K = P.currentTarget),
              (P = P.listener),
              M !== h && d.isPropagationStopped())
            )
              break e;
            (Mh(d, P, K), (h = M));
          }
      }
    }
    if (da) throw ((t = Bu), (da = !1), (Bu = null), t);
  }
  function Ye(t, r) {
    var s = r[wc];
    s === void 0 && (s = r[wc] = new Set());
    var u = t + '__bubble';
    s.has(u) || ($h(r, t, 2, !1), s.add(u));
  }
  function dc(t, r, s) {
    var u = 0;
    (r && (u |= 4), $h(s, t, u, r));
  }
  var Pa = '_reactListening' + Math.random().toString(36).slice(2);
  function ss(t) {
    if (!t[Pa]) {
      ((t[Pa] = !0),
        i.forEach(function (s) {
          s !== 'selectionchange' && (m1.has(s) || dc(s, !1, t), dc(s, !0, t));
        }));
      var r = t.nodeType === 9 ? t : t.ownerDocument;
      r === null || r[Pa] || ((r[Pa] = !0), dc('selectionchange', !1, r));
    }
  }
  function $h(t, r, s, u) {
    switch (rh(r)) {
      case 1:
        var d = PS;
        break;
      case 4:
        d = NS;
        break;
      default:
        d = Yu;
    }
    ((s = d.bind(null, r, s, t)),
      (d = void 0),
      !pr ||
        (r !== 'touchstart' && r !== 'touchmove' && r !== 'wheel') ||
        (d = !0),
      u
        ? d !== void 0
          ? t.addEventListener(r, s, { capture: !0, passive: d })
          : t.addEventListener(r, s, !0)
        : d !== void 0
          ? t.addEventListener(r, s, { passive: d })
          : t.addEventListener(r, s, !1));
  }
  function pc(t, r, s, u, d) {
    var h = u;
    if ((r & 1) === 0 && (r & 2) === 0 && u !== null)
      e: for (;;) {
        if (u === null) return;
        var g = u.tag;
        if (g === 3 || g === 4) {
          var P = u.stateNode.containerInfo;
          if (P === d || (P.nodeType === 8 && P.parentNode === d)) break;
          if (g === 4)
            for (g = u.return; g !== null; ) {
              var M = g.tag;
              if (
                (M === 3 || M === 4) &&
                ((M = g.stateNode.containerInfo),
                M === d || (M.nodeType === 8 && M.parentNode === d))
              )
                return;
              g = g.return;
            }
          for (; P !== null; ) {
            if (((g = Zr(P)), g === null)) return;
            if (((M = g.tag), M === 5 || M === 6)) {
              u = h = g;
              continue e;
            }
            P = P.parentNode;
          }
        }
        u = u.return;
      }
    Ft(function () {
      var K = h,
        re = he(s),
        ie = [];
      e: {
        var ne = Nh.get(t);
        if (ne !== void 0) {
          var ve = Zu,
            Se = t;
          switch (t) {
            case 'keypress':
              if (Ea(s) === 0) break e;
            case 'keydown':
            case 'keyup':
              ve = HS;
              break;
            case 'focusin':
              ((Se = 'focus'), (ve = tc));
              break;
            case 'focusout':
              ((Se = 'blur'), (ve = tc));
              break;
            case 'beforeblur':
            case 'afterblur':
              ve = tc;
              break;
            case 'click':
              if (s.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              ve = sh;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              ve = AS;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              ve = GS;
              break;
            case xh:
            case Th:
            case kh:
              ve = IS;
              break;
            case Ph:
              ve = XS;
              break;
            case 'scroll':
              ve = LS;
              break;
            case 'wheel':
              ve = ZS;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              ve = FS;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              ve = lh;
          }
          var Ce = (r & 4) !== 0,
            ut = !Ce && t === 'scroll',
            z = Ce ? (ne !== null ? ne + 'Capture' : null) : ne;
          Ce = [];
          for (var A = K, V; A !== null; ) {
            V = A;
            var ue = V.stateNode;
            if (
              (V.tag === 5 &&
                ue !== null &&
                ((V = ue),
                z !== null &&
                  ((ue = Jt(A, z)), ue != null && Ce.push(as(A, ue, V)))),
              ut)
            )
              break;
            A = A.return;
          }
          0 < Ce.length &&
            ((ne = new ve(ne, Se, null, s, re)),
            ie.push({ event: ne, listeners: Ce }));
        }
      }
      if ((r & 7) === 0) {
        e: {
          if (
            ((ne = t === 'mouseover' || t === 'pointerover'),
            (ve = t === 'mouseout' || t === 'pointerout'),
            ne &&
              s !== pe &&
              (Se = s.relatedTarget || s.fromElement) &&
              (Zr(Se) || Se[qn]))
          )
            break e;
          if (
            (ve || ne) &&
            ((ne =
              re.window === re
                ? re
                : (ne = re.ownerDocument)
                  ? ne.defaultView || ne.parentWindow
                  : window),
            ve
              ? ((Se = s.relatedTarget || s.toElement),
                (ve = K),
                (Se = Se ? Zr(Se) : null),
                Se !== null &&
                  ((ut = qr(Se)),
                  Se !== ut || (Se.tag !== 5 && Se.tag !== 6)) &&
                  (Se = null))
              : ((ve = null), (Se = K)),
            ve !== Se)
          ) {
            if (
              ((Ce = sh),
              (ue = 'onMouseLeave'),
              (z = 'onMouseEnter'),
              (A = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((Ce = lh),
                (ue = 'onPointerLeave'),
                (z = 'onPointerEnter'),
                (A = 'pointer')),
              (ut = ve == null ? ne : Wo(ve)),
              (V = Se == null ? ne : Wo(Se)),
              (ne = new Ce(ue, A + 'leave', ve, s, re)),
              (ne.target = ut),
              (ne.relatedTarget = V),
              (ue = null),
              Zr(re) === K &&
                ((Ce = new Ce(z, A + 'enter', Se, s, re)),
                (Ce.target = V),
                (Ce.relatedTarget = ut),
                (ue = Ce)),
              (ut = ue),
              ve && Se)
            )
              t: {
                for (Ce = ve, z = Se, A = 0, V = Ce; V; V = Bo(V)) A++;
                for (V = 0, ue = z; ue; ue = Bo(ue)) V++;
                for (; 0 < A - V; ) ((Ce = Bo(Ce)), A--);
                for (; 0 < V - A; ) ((z = Bo(z)), V--);
                for (; A--; ) {
                  if (Ce === z || (z !== null && Ce === z.alternate)) break t;
                  ((Ce = Bo(Ce)), (z = Bo(z)));
                }
                Ce = null;
              }
            else Ce = null;
            (ve !== null && Oh(ie, ne, ve, Ce, !1),
              Se !== null && ut !== null && Oh(ie, ut, Se, Ce, !0));
          }
        }
        e: {
          if (
            ((ne = K ? Wo(K) : window),
            (ve = ne.nodeName && ne.nodeName.toLowerCase()),
            ve === 'select' || (ve === 'input' && ne.type === 'file'))
          )
            var Ee = i1;
          else if (hh(ne))
            if (vh) Ee = u1;
            else {
              Ee = a1;
              var xe = s1;
            }
          else
            (ve = ne.nodeName) &&
              ve.toLowerCase() === 'input' &&
              (ne.type === 'checkbox' || ne.type === 'radio') &&
              (Ee = l1);
          if (Ee && (Ee = Ee(t, K))) {
            mh(ie, Ee, s, re);
            break e;
          }
          (xe && xe(t, ne, K),
            t === 'focusout' &&
              (xe = ne._wrapperState) &&
              xe.controlled &&
              ne.type === 'number' &&
              Qr(ne, 'number', ne.value));
        }
        switch (((xe = K ? Wo(K) : window), t)) {
          case 'focusin':
            (hh(xe) || xe.contentEditable === 'true') &&
              ((jo = xe), (ac = K), (os = null));
            break;
          case 'focusout':
            os = ac = jo = null;
            break;
          case 'mousedown':
            lc = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((lc = !1), bh(ie, s, re));
            break;
          case 'selectionchange':
            if (d1) break;
          case 'keydown':
          case 'keyup':
            bh(ie, s, re);
        }
        var Te;
        if (rc)
          e: {
            switch (t) {
              case 'compositionstart':
                var Ne = 'onCompositionStart';
                break e;
              case 'compositionend':
                Ne = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                Ne = 'onCompositionUpdate';
                break e;
            }
            Ne = void 0;
          }
        else
          zo
            ? dh(t, s) && (Ne = 'onCompositionEnd')
            : t === 'keydown' &&
              s.keyCode === 229 &&
              (Ne = 'onCompositionStart');
        (Ne &&
          (uh &&
            s.locale !== 'ko' &&
            (zo || Ne !== 'onCompositionStart'
              ? Ne === 'onCompositionEnd' && zo && (Te = oh())
              : ((gr = re),
                (qu = 'value' in gr ? gr.value : gr.textContent),
                (zo = !0))),
          (xe = Na(K, Ne)),
          0 < xe.length &&
            ((Ne = new ah(Ne, t, null, s, re)),
            ie.push({ event: Ne, listeners: xe }),
            Te
              ? (Ne.data = Te)
              : ((Te = ph(s)), Te !== null && (Ne.data = Te)))),
          (Te = e1 ? t1(t, s) : n1(t, s)) &&
            ((K = Na(K, 'onBeforeInput')),
            0 < K.length &&
              ((re = new ah('onBeforeInput', 'beforeinput', null, s, re)),
              ie.push({ event: re, listeners: K }),
              (re.data = Te))));
      }
      Ah(ie, r);
    });
  }
  function as(t, r, s) {
    return { instance: t, listener: r, currentTarget: s };
  }
  function Na(t, r) {
    for (var s = r + 'Capture', u = []; t !== null; ) {
      var d = t,
        h = d.stateNode;
      (d.tag === 5 &&
        h !== null &&
        ((d = h),
        (h = Jt(t, s)),
        h != null && u.unshift(as(t, h, d)),
        (h = Jt(t, r)),
        h != null && u.push(as(t, h, d))),
        (t = t.return));
    }
    return u;
  }
  function Bo(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5);
    return t || null;
  }
  function Oh(t, r, s, u, d) {
    for (var h = r._reactName, g = []; s !== null && s !== u; ) {
      var P = s,
        M = P.alternate,
        K = P.stateNode;
      if (M !== null && M === u) break;
      (P.tag === 5 &&
        K !== null &&
        ((P = K),
        d
          ? ((M = Jt(s, h)), M != null && g.unshift(as(s, M, P)))
          : d || ((M = Jt(s, h)), M != null && g.push(as(s, M, P)))),
        (s = s.return));
    }
    g.length !== 0 && t.push({ event: r, listeners: g });
  }
  var v1 = /\r\n?/g,
    y1 = /\u0000|\uFFFD/g;
  function Ih(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        v1,
        `
`
      )
      .replace(y1, '');
  }
  function La(t, r, s) {
    if (((r = Ih(r)), Ih(t) !== r && s)) throw Error(o(425));
  }
  function Ma() {}
  var hc = null,
    mc = null;
  function vc(t, r) {
    return (
      t === 'textarea' ||
      t === 'noscript' ||
      typeof r.children == 'string' ||
      typeof r.children == 'number' ||
      (typeof r.dangerouslySetInnerHTML == 'object' &&
        r.dangerouslySetInnerHTML !== null &&
        r.dangerouslySetInnerHTML.__html != null)
    );
  }
  var yc = typeof setTimeout == 'function' ? setTimeout : void 0,
    g1 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Dh = typeof Promise == 'function' ? Promise : void 0,
    w1 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Dh < 'u'
          ? function (t) {
              return Dh.resolve(null).then(t).catch(S1);
            }
          : yc;
  function S1(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function gc(t, r) {
    var s = r,
      u = 0;
    do {
      var d = s.nextSibling;
      if ((t.removeChild(s), d && d.nodeType === 8))
        if (((s = d.data), s === '/$')) {
          if (u === 0) {
            (t.removeChild(d), qi(r));
            return;
          }
          u--;
        } else (s !== '$' && s !== '$?' && s !== '$!') || u++;
      s = d;
    } while (s);
    qi(r);
  }
  function Sr(t) {
    for (; t != null; t = t.nextSibling) {
      var r = t.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (((r = t.data), r === '$' || r === '$!' || r === '$?')) break;
        if (r === '/$') return null;
      }
    }
    return t;
  }
  function Fh(t) {
    t = t.previousSibling;
    for (var r = 0; t; ) {
      if (t.nodeType === 8) {
        var s = t.data;
        if (s === '$' || s === '$!' || s === '$?') {
          if (r === 0) return t;
          r--;
        } else s === '/$' && r++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  var Uo = Math.random().toString(36).slice(2),
    On = '__reactFiber$' + Uo,
    ls = '__reactProps$' + Uo,
    qn = '__reactContainer$' + Uo,
    wc = '__reactEvents$' + Uo,
    C1 = '__reactListeners$' + Uo,
    _1 = '__reactHandles$' + Uo;
  function Zr(t) {
    var r = t[On];
    if (r) return r;
    for (var s = t.parentNode; s; ) {
      if ((r = s[qn] || s[On])) {
        if (
          ((s = r.alternate),
          r.child !== null || (s !== null && s.child !== null))
        )
          for (t = Fh(t); t !== null; ) {
            if ((s = t[On])) return s;
            t = Fh(t);
          }
        return r;
      }
      ((t = s), (s = t.parentNode));
    }
    return null;
  }
  function us(t) {
    return (
      (t = t[On] || t[qn]),
      !t || (t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3)
        ? null
        : t
    );
  }
  function Wo(t) {
    if (t.tag === 5 || t.tag === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Aa(t) {
    return t[ls] || null;
  }
  var Sc = [],
    Ho = -1;
  function Cr(t) {
    return { current: t };
  }
  function Xe(t) {
    0 > Ho || ((t.current = Sc[Ho]), (Sc[Ho] = null), Ho--);
  }
  function Ke(t, r) {
    (Ho++, (Sc[Ho] = t.current), (t.current = r));
  }
  var _r = {},
    Tt = Cr(_r),
    zt = Cr(!1),
    Jr = _r;
  function Ko(t, r) {
    var s = t.type.contextTypes;
    if (!s) return _r;
    var u = t.stateNode;
    if (u && u.__reactInternalMemoizedUnmaskedChildContext === r)
      return u.__reactInternalMemoizedMaskedChildContext;
    var d = {},
      h;
    for (h in s) d[h] = r[h];
    return (
      u &&
        ((t = t.stateNode),
        (t.__reactInternalMemoizedUnmaskedChildContext = r),
        (t.__reactInternalMemoizedMaskedChildContext = d)),
      d
    );
  }
  function jt(t) {
    return ((t = t.childContextTypes), t != null);
  }
  function $a() {
    (Xe(zt), Xe(Tt));
  }
  function zh(t, r, s) {
    if (Tt.current !== _r) throw Error(o(168));
    (Ke(Tt, r), Ke(zt, s));
  }
  function jh(t, r, s) {
    var u = t.stateNode;
    if (((r = r.childContextTypes), typeof u.getChildContext != 'function'))
      return s;
    u = u.getChildContext();
    for (var d in u) if (!(d in r)) throw Error(o(108, de(t) || 'Unknown', d));
    return U({}, s, u);
  }
  function Oa(t) {
    return (
      (t =
        ((t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext) ||
        _r),
      (Jr = Tt.current),
      Ke(Tt, t),
      Ke(zt, zt.current),
      !0
    );
  }
  function Vh(t, r, s) {
    var u = t.stateNode;
    if (!u) throw Error(o(169));
    (s
      ? ((t = jh(t, r, Jr)),
        (u.__reactInternalMemoizedMergedChildContext = t),
        Xe(zt),
        Xe(Tt),
        Ke(Tt, t))
      : Xe(zt),
      Ke(zt, s));
  }
  var Zn = null,
    Ia = !1,
    Cc = !1;
  function Bh(t) {
    Zn === null ? (Zn = [t]) : Zn.push(t);
  }
  function E1(t) {
    ((Ia = !0), Bh(t));
  }
  function Er() {
    if (!Cc && Zn !== null) {
      Cc = !0;
      var t = 0,
        r = Ve;
      try {
        var s = Zn;
        for (Ve = 1; t < s.length; t++) {
          var u = s[t];
          do u = u(!0);
          while (u !== null);
        }
        ((Zn = null), (Ia = !1));
      } catch (d) {
        throw (Zn !== null && (Zn = Zn.slice(t + 1)), Wp(Uu, Er), d);
      } finally {
        ((Ve = r), (Cc = !1));
      }
    }
    return null;
  }
  var Qo = [],
    Go = 0,
    Da = null,
    Fa = 0,
    en = [],
    tn = 0,
    eo = null,
    Jn = 1,
    er = '';
  function to(t, r) {
    ((Qo[Go++] = Fa), (Qo[Go++] = Da), (Da = t), (Fa = r));
  }
  function Uh(t, r, s) {
    ((en[tn++] = Jn), (en[tn++] = er), (en[tn++] = eo), (eo = t));
    var u = Jn;
    t = er;
    var d = 32 - mn(u) - 1;
    ((u &= ~(1 << d)), (s += 1));
    var h = 32 - mn(r) + d;
    if (30 < h) {
      var g = d - (d % 5);
      ((h = (u & ((1 << g) - 1)).toString(32)),
        (u >>= g),
        (d -= g),
        (Jn = (1 << (32 - mn(r) + d)) | (s << d) | u),
        (er = h + t));
    } else ((Jn = (1 << h) | (s << d) | u), (er = t));
  }
  function _c(t) {
    t.return !== null && (to(t, 1), Uh(t, 1, 0));
  }
  function Ec(t) {
    for (; t === Da; )
      ((Da = Qo[--Go]), (Qo[Go] = null), (Fa = Qo[--Go]), (Qo[Go] = null));
    for (; t === eo; )
      ((eo = en[--tn]),
        (en[tn] = null),
        (er = en[--tn]),
        (en[tn] = null),
        (Jn = en[--tn]),
        (en[tn] = null));
  }
  var Gt = null,
    Yt = null,
    et = !1,
    yn = null;
  function Wh(t, r) {
    var s = sn(5, null, null, 0);
    ((s.elementType = 'DELETED'),
      (s.stateNode = r),
      (s.return = t),
      (r = t.deletions),
      r === null ? ((t.deletions = [s]), (t.flags |= 16)) : r.push(s));
  }
  function Hh(t, r) {
    switch (t.tag) {
      case 5:
        var s = t.type;
        return (
          (r =
            r.nodeType !== 1 || s.toLowerCase() !== r.nodeName.toLowerCase()
              ? null
              : r),
          r !== null
            ? ((t.stateNode = r), (Gt = t), (Yt = Sr(r.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (r = t.pendingProps === '' || r.nodeType !== 3 ? null : r),
          r !== null ? ((t.stateNode = r), (Gt = t), (Yt = null), !0) : !1
        );
      case 13:
        return (
          (r = r.nodeType !== 8 ? null : r),
          r !== null
            ? ((s = eo !== null ? { id: Jn, overflow: er } : null),
              (t.memoizedState = {
                dehydrated: r,
                treeContext: s,
                retryLane: 1073741824
              }),
              (s = sn(18, null, null, 0)),
              (s.stateNode = r),
              (s.return = t),
              (t.child = s),
              (Gt = t),
              (Yt = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function bc(t) {
    return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
  }
  function Rc(t) {
    if (et) {
      var r = Yt;
      if (r) {
        var s = r;
        if (!Hh(t, r)) {
          if (bc(t)) throw Error(o(418));
          r = Sr(s.nextSibling);
          var u = Gt;
          r && Hh(t, r)
            ? Wh(u, s)
            : ((t.flags = (t.flags & -4097) | 2), (et = !1), (Gt = t));
        }
      } else {
        if (bc(t)) throw Error(o(418));
        ((t.flags = (t.flags & -4097) | 2), (et = !1), (Gt = t));
      }
    }
  }
  function Kh(t) {
    for (
      t = t.return;
      t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13;
    )
      t = t.return;
    Gt = t;
  }
  function za(t) {
    if (t !== Gt) return !1;
    if (!et) return (Kh(t), (et = !0), !1);
    var r;
    if (
      ((r = t.tag !== 3) &&
        !(r = t.tag !== 5) &&
        ((r = t.type),
        (r = r !== 'head' && r !== 'body' && !vc(t.type, t.memoizedProps))),
      r && (r = Yt))
    ) {
      if (bc(t)) throw (Qh(), Error(o(418)));
      for (; r; ) (Wh(t, r), (r = Sr(r.nextSibling)));
    }
    if ((Kh(t), t.tag === 13)) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(o(317));
      e: {
        for (t = t.nextSibling, r = 0; t; ) {
          if (t.nodeType === 8) {
            var s = t.data;
            if (s === '/$') {
              if (r === 0) {
                Yt = Sr(t.nextSibling);
                break e;
              }
              r--;
            } else (s !== '$' && s !== '$!' && s !== '$?') || r++;
          }
          t = t.nextSibling;
        }
        Yt = null;
      }
    } else Yt = Gt ? Sr(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Qh() {
    for (var t = Yt; t; ) t = Sr(t.nextSibling);
  }
  function Yo() {
    ((Yt = Gt = null), (et = !1));
  }
  function xc(t) {
    yn === null ? (yn = [t]) : yn.push(t);
  }
  var b1 = k.ReactCurrentBatchConfig;
  function cs(t, r, s) {
    if (
      ((t = s.ref),
      t !== null && typeof t != 'function' && typeof t != 'object')
    ) {
      if (s._owner) {
        if (((s = s._owner), s)) {
          if (s.tag !== 1) throw Error(o(309));
          var u = s.stateNode;
        }
        if (!u) throw Error(o(147, t));
        var d = u,
          h = '' + t;
        return r !== null &&
          r.ref !== null &&
          typeof r.ref == 'function' &&
          r.ref._stringRef === h
          ? r.ref
          : ((r = function (g) {
              var P = d.refs;
              g === null ? delete P[h] : (P[h] = g);
            }),
            (r._stringRef = h),
            r);
      }
      if (typeof t != 'string') throw Error(o(284));
      if (!s._owner) throw Error(o(290, t));
    }
    return t;
  }
  function ja(t, r) {
    throw (
      (t = Object.prototype.toString.call(r)),
      Error(
        o(
          31,
          t === '[object Object]'
            ? 'object with keys {' + Object.keys(r).join(', ') + '}'
            : t
        )
      )
    );
  }
  function Gh(t) {
    var r = t._init;
    return r(t._payload);
  }
  function Yh(t) {
    function r(z, A) {
      if (t) {
        var V = z.deletions;
        V === null ? ((z.deletions = [A]), (z.flags |= 16)) : V.push(A);
      }
    }
    function s(z, A) {
      if (!t) return null;
      for (; A !== null; ) (r(z, A), (A = A.sibling));
      return null;
    }
    function u(z, A) {
      for (z = new Map(); A !== null; )
        (A.key !== null ? z.set(A.key, A) : z.set(A.index, A), (A = A.sibling));
      return z;
    }
    function d(z, A) {
      return ((z = Lr(z, A)), (z.index = 0), (z.sibling = null), z);
    }
    function h(z, A, V) {
      return (
        (z.index = V),
        t
          ? ((V = z.alternate),
            V !== null
              ? ((V = V.index), V < A ? ((z.flags |= 2), A) : V)
              : ((z.flags |= 2), A))
          : ((z.flags |= 1048576), A)
      );
    }
    function g(z) {
      return (t && z.alternate === null && (z.flags |= 2), z);
    }
    function P(z, A, V, ue) {
      return A === null || A.tag !== 6
        ? ((A = gf(V, z.mode, ue)), (A.return = z), A)
        : ((A = d(A, V)), (A.return = z), A);
    }
    function M(z, A, V, ue) {
      var Ee = V.type;
      return Ee === H
        ? re(z, A, V.props.children, ue, V.key)
        : A !== null &&
            (A.elementType === Ee ||
              (typeof Ee == 'object' &&
                Ee !== null &&
                Ee.$$typeof === fe &&
                Gh(Ee) === A.type))
          ? ((ue = d(A, V.props)), (ue.ref = cs(z, A, V)), (ue.return = z), ue)
          : ((ue = cl(V.type, V.key, V.props, null, z.mode, ue)),
            (ue.ref = cs(z, A, V)),
            (ue.return = z),
            ue);
    }
    function K(z, A, V, ue) {
      return A === null ||
        A.tag !== 4 ||
        A.stateNode.containerInfo !== V.containerInfo ||
        A.stateNode.implementation !== V.implementation
        ? ((A = wf(V, z.mode, ue)), (A.return = z), A)
        : ((A = d(A, V.children || [])), (A.return = z), A);
    }
    function re(z, A, V, ue, Ee) {
      return A === null || A.tag !== 7
        ? ((A = uo(V, z.mode, ue, Ee)), (A.return = z), A)
        : ((A = d(A, V)), (A.return = z), A);
    }
    function ie(z, A, V) {
      if ((typeof A == 'string' && A !== '') || typeof A == 'number')
        return ((A = gf('' + A, z.mode, V)), (A.return = z), A);
      if (typeof A == 'object' && A !== null) {
        switch (A.$$typeof) {
          case $:
            return (
              (V = cl(A.type, A.key, A.props, null, z.mode, V)),
              (V.ref = cs(z, null, A)),
              (V.return = z),
              V
            );
          case W:
            return ((A = wf(A, z.mode, V)), (A.return = z), A);
          case fe:
            var ue = A._init;
            return ie(z, ue(A._payload), V);
        }
        if (pn(A) || X(A))
          return ((A = uo(A, z.mode, V, null)), (A.return = z), A);
        ja(z, A);
      }
      return null;
    }
    function ne(z, A, V, ue) {
      var Ee = A !== null ? A.key : null;
      if ((typeof V == 'string' && V !== '') || typeof V == 'number')
        return Ee !== null ? null : P(z, A, '' + V, ue);
      if (typeof V == 'object' && V !== null) {
        switch (V.$$typeof) {
          case $:
            return V.key === Ee ? M(z, A, V, ue) : null;
          case W:
            return V.key === Ee ? K(z, A, V, ue) : null;
          case fe:
            return ((Ee = V._init), ne(z, A, Ee(V._payload), ue));
        }
        if (pn(V) || X(V)) return Ee !== null ? null : re(z, A, V, ue, null);
        ja(z, V);
      }
      return null;
    }
    function ve(z, A, V, ue, Ee) {
      if ((typeof ue == 'string' && ue !== '') || typeof ue == 'number')
        return ((z = z.get(V) || null), P(A, z, '' + ue, Ee));
      if (typeof ue == 'object' && ue !== null) {
        switch (ue.$$typeof) {
          case $:
            return (
              (z = z.get(ue.key === null ? V : ue.key) || null),
              M(A, z, ue, Ee)
            );
          case W:
            return (
              (z = z.get(ue.key === null ? V : ue.key) || null),
              K(A, z, ue, Ee)
            );
          case fe:
            var xe = ue._init;
            return ve(z, A, V, xe(ue._payload), Ee);
        }
        if (pn(ue) || X(ue))
          return ((z = z.get(V) || null), re(A, z, ue, Ee, null));
        ja(A, ue);
      }
      return null;
    }
    function Se(z, A, V, ue) {
      for (
        var Ee = null, xe = null, Te = A, Ne = (A = 0), wt = null;
        Te !== null && Ne < V.length;
        Ne++
      ) {
        Te.index > Ne ? ((wt = Te), (Te = null)) : (wt = Te.sibling);
        var je = ne(z, Te, V[Ne], ue);
        if (je === null) {
          Te === null && (Te = wt);
          break;
        }
        (t && Te && je.alternate === null && r(z, Te),
          (A = h(je, A, Ne)),
          xe === null ? (Ee = je) : (xe.sibling = je),
          (xe = je),
          (Te = wt));
      }
      if (Ne === V.length) return (s(z, Te), et && to(z, Ne), Ee);
      if (Te === null) {
        for (; Ne < V.length; Ne++)
          ((Te = ie(z, V[Ne], ue)),
            Te !== null &&
              ((A = h(Te, A, Ne)),
              xe === null ? (Ee = Te) : (xe.sibling = Te),
              (xe = Te)));
        return (et && to(z, Ne), Ee);
      }
      for (Te = u(z, Te); Ne < V.length; Ne++)
        ((wt = ve(Te, z, Ne, V[Ne], ue)),
          wt !== null &&
            (t &&
              wt.alternate !== null &&
              Te.delete(wt.key === null ? Ne : wt.key),
            (A = h(wt, A, Ne)),
            xe === null ? (Ee = wt) : (xe.sibling = wt),
            (xe = wt)));
      return (
        t &&
          Te.forEach(function (Mr) {
            return r(z, Mr);
          }),
        et && to(z, Ne),
        Ee
      );
    }
    function Ce(z, A, V, ue) {
      var Ee = X(V);
      if (typeof Ee != 'function') throw Error(o(150));
      if (((V = Ee.call(V)), V == null)) throw Error(o(151));
      for (
        var xe = (Ee = null), Te = A, Ne = (A = 0), wt = null, je = V.next();
        Te !== null && !je.done;
        Ne++, je = V.next()
      ) {
        Te.index > Ne ? ((wt = Te), (Te = null)) : (wt = Te.sibling);
        var Mr = ne(z, Te, je.value, ue);
        if (Mr === null) {
          Te === null && (Te = wt);
          break;
        }
        (t && Te && Mr.alternate === null && r(z, Te),
          (A = h(Mr, A, Ne)),
          xe === null ? (Ee = Mr) : (xe.sibling = Mr),
          (xe = Mr),
          (Te = wt));
      }
      if (je.done) return (s(z, Te), et && to(z, Ne), Ee);
      if (Te === null) {
        for (; !je.done; Ne++, je = V.next())
          ((je = ie(z, je.value, ue)),
            je !== null &&
              ((A = h(je, A, Ne)),
              xe === null ? (Ee = je) : (xe.sibling = je),
              (xe = je)));
        return (et && to(z, Ne), Ee);
      }
      for (Te = u(z, Te); !je.done; Ne++, je = V.next())
        ((je = ve(Te, z, Ne, je.value, ue)),
          je !== null &&
            (t &&
              je.alternate !== null &&
              Te.delete(je.key === null ? Ne : je.key),
            (A = h(je, A, Ne)),
            xe === null ? (Ee = je) : (xe.sibling = je),
            (xe = je)));
      return (
        t &&
          Te.forEach(function (rC) {
            return r(z, rC);
          }),
        et && to(z, Ne),
        Ee
      );
    }
    function ut(z, A, V, ue) {
      if (
        (typeof V == 'object' &&
          V !== null &&
          V.type === H &&
          V.key === null &&
          (V = V.props.children),
        typeof V == 'object' && V !== null)
      ) {
        switch (V.$$typeof) {
          case $:
            e: {
              for (var Ee = V.key, xe = A; xe !== null; ) {
                if (xe.key === Ee) {
                  if (((Ee = V.type), Ee === H)) {
                    if (xe.tag === 7) {
                      (s(z, xe.sibling),
                        (A = d(xe, V.props.children)),
                        (A.return = z),
                        (z = A));
                      break e;
                    }
                  } else if (
                    xe.elementType === Ee ||
                    (typeof Ee == 'object' &&
                      Ee !== null &&
                      Ee.$$typeof === fe &&
                      Gh(Ee) === xe.type)
                  ) {
                    (s(z, xe.sibling),
                      (A = d(xe, V.props)),
                      (A.ref = cs(z, xe, V)),
                      (A.return = z),
                      (z = A));
                    break e;
                  }
                  s(z, xe);
                  break;
                } else r(z, xe);
                xe = xe.sibling;
              }
              V.type === H
                ? ((A = uo(V.props.children, z.mode, ue, V.key)),
                  (A.return = z),
                  (z = A))
                : ((ue = cl(V.type, V.key, V.props, null, z.mode, ue)),
                  (ue.ref = cs(z, A, V)),
                  (ue.return = z),
                  (z = ue));
            }
            return g(z);
          case W:
            e: {
              for (xe = V.key; A !== null; ) {
                if (A.key === xe)
                  if (
                    A.tag === 4 &&
                    A.stateNode.containerInfo === V.containerInfo &&
                    A.stateNode.implementation === V.implementation
                  ) {
                    (s(z, A.sibling),
                      (A = d(A, V.children || [])),
                      (A.return = z),
                      (z = A));
                    break e;
                  } else {
                    s(z, A);
                    break;
                  }
                else r(z, A);
                A = A.sibling;
              }
              ((A = wf(V, z.mode, ue)), (A.return = z), (z = A));
            }
            return g(z);
          case fe:
            return ((xe = V._init), ut(z, A, xe(V._payload), ue));
        }
        if (pn(V)) return Se(z, A, V, ue);
        if (X(V)) return Ce(z, A, V, ue);
        ja(z, V);
      }
      return (typeof V == 'string' && V !== '') || typeof V == 'number'
        ? ((V = '' + V),
          A !== null && A.tag === 6
            ? (s(z, A.sibling), (A = d(A, V)), (A.return = z), (z = A))
            : (s(z, A), (A = gf(V, z.mode, ue)), (A.return = z), (z = A)),
          g(z))
        : s(z, A);
    }
    return ut;
  }
  var Xo = Yh(!0),
    Xh = Yh(!1),
    Va = Cr(null),
    Ba = null,
    qo = null,
    Tc = null;
  function kc() {
    Tc = qo = Ba = null;
  }
  function Pc(t) {
    var r = Va.current;
    (Xe(Va), (t._currentValue = r));
  }
  function Nc(t, r, s) {
    for (; t !== null; ) {
      var u = t.alternate;
      if (
        ((t.childLanes & r) !== r
          ? ((t.childLanes |= r), u !== null && (u.childLanes |= r))
          : u !== null && (u.childLanes & r) !== r && (u.childLanes |= r),
        t === s)
      )
        break;
      t = t.return;
    }
  }
  function Zo(t, r) {
    ((Ba = t),
      (Tc = qo = null),
      (t = t.dependencies),
      t !== null &&
        t.firstContext !== null &&
        ((t.lanes & r) !== 0 && (Vt = !0), (t.firstContext = null)));
  }
  function nn(t) {
    var r = t._currentValue;
    if (Tc !== t)
      if (((t = { context: t, memoizedValue: r, next: null }), qo === null)) {
        if (Ba === null) throw Error(o(308));
        ((qo = t), (Ba.dependencies = { lanes: 0, firstContext: t }));
      } else qo = qo.next = t;
    return r;
  }
  var no = null;
  function Lc(t) {
    no === null ? (no = [t]) : no.push(t);
  }
  function qh(t, r, s, u) {
    var d = r.interleaved;
    return (
      d === null ? ((s.next = s), Lc(r)) : ((s.next = d.next), (d.next = s)),
      (r.interleaved = s),
      tr(t, u)
    );
  }
  function tr(t, r) {
    t.lanes |= r;
    var s = t.alternate;
    for (s !== null && (s.lanes |= r), s = t, t = t.return; t !== null; )
      ((t.childLanes |= r),
        (s = t.alternate),
        s !== null && (s.childLanes |= r),
        (s = t),
        (t = t.return));
    return s.tag === 3 ? s.stateNode : null;
  }
  var br = !1;
  function Mc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null
    };
  }
  function Zh(t, r) {
    ((t = t.updateQueue),
      r.updateQueue === t &&
        (r.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          effects: t.effects
        }));
  }
  function nr(t, r) {
    return {
      eventTime: t,
      lane: r,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function Rr(t, r, s) {
    var u = t.updateQueue;
    if (u === null) return null;
    if (((u = u.shared), (ze & 2) !== 0)) {
      var d = u.pending;
      return (
        d === null ? (r.next = r) : ((r.next = d.next), (d.next = r)),
        (u.pending = r),
        tr(t, s)
      );
    }
    return (
      (d = u.interleaved),
      d === null ? ((r.next = r), Lc(u)) : ((r.next = d.next), (d.next = r)),
      (u.interleaved = r),
      tr(t, s)
    );
  }
  function Ua(t, r, s) {
    if (
      ((r = r.updateQueue), r !== null && ((r = r.shared), (s & 4194240) !== 0))
    ) {
      var u = r.lanes;
      ((u &= t.pendingLanes), (s |= u), (r.lanes = s), Ku(t, s));
    }
  }
  function Jh(t, r) {
    var s = t.updateQueue,
      u = t.alternate;
    if (u !== null && ((u = u.updateQueue), s === u)) {
      var d = null,
        h = null;
      if (((s = s.firstBaseUpdate), s !== null)) {
        do {
          var g = {
            eventTime: s.eventTime,
            lane: s.lane,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          };
          (h === null ? (d = h = g) : (h = h.next = g), (s = s.next));
        } while (s !== null);
        h === null ? (d = h = r) : (h = h.next = r);
      } else d = h = r;
      ((s = {
        baseState: u.baseState,
        firstBaseUpdate: d,
        lastBaseUpdate: h,
        shared: u.shared,
        effects: u.effects
      }),
        (t.updateQueue = s));
      return;
    }
    ((t = s.lastBaseUpdate),
      t === null ? (s.firstBaseUpdate = r) : (t.next = r),
      (s.lastBaseUpdate = r));
  }
  function Wa(t, r, s, u) {
    var d = t.updateQueue;
    br = !1;
    var h = d.firstBaseUpdate,
      g = d.lastBaseUpdate,
      P = d.shared.pending;
    if (P !== null) {
      d.shared.pending = null;
      var M = P,
        K = M.next;
      ((M.next = null), g === null ? (h = K) : (g.next = K), (g = M));
      var re = t.alternate;
      re !== null &&
        ((re = re.updateQueue),
        (P = re.lastBaseUpdate),
        P !== g &&
          (P === null ? (re.firstBaseUpdate = K) : (P.next = K),
          (re.lastBaseUpdate = M)));
    }
    if (h !== null) {
      var ie = d.baseState;
      ((g = 0), (re = K = M = null), (P = h));
      do {
        var ne = P.lane,
          ve = P.eventTime;
        if ((u & ne) === ne) {
          re !== null &&
            (re = re.next =
              {
                eventTime: ve,
                lane: 0,
                tag: P.tag,
                payload: P.payload,
                callback: P.callback,
                next: null
              });
          e: {
            var Se = t,
              Ce = P;
            switch (((ne = r), (ve = s), Ce.tag)) {
              case 1:
                if (((Se = Ce.payload), typeof Se == 'function')) {
                  ie = Se.call(ve, ie, ne);
                  break e;
                }
                ie = Se;
                break e;
              case 3:
                Se.flags = (Se.flags & -65537) | 128;
              case 0:
                if (
                  ((Se = Ce.payload),
                  (ne = typeof Se == 'function' ? Se.call(ve, ie, ne) : Se),
                  ne == null)
                )
                  break e;
                ie = U({}, ie, ne);
                break e;
              case 2:
                br = !0;
            }
          }
          P.callback !== null &&
            P.lane !== 0 &&
            ((t.flags |= 64),
            (ne = d.effects),
            ne === null ? (d.effects = [P]) : ne.push(P));
        } else
          ((ve = {
            eventTime: ve,
            lane: ne,
            tag: P.tag,
            payload: P.payload,
            callback: P.callback,
            next: null
          }),
            re === null ? ((K = re = ve), (M = ie)) : (re = re.next = ve),
            (g |= ne));
        if (((P = P.next), P === null)) {
          if (((P = d.shared.pending), P === null)) break;
          ((ne = P),
            (P = ne.next),
            (ne.next = null),
            (d.lastBaseUpdate = ne),
            (d.shared.pending = null));
        }
      } while (!0);
      if (
        (re === null && (M = ie),
        (d.baseState = M),
        (d.firstBaseUpdate = K),
        (d.lastBaseUpdate = re),
        (r = d.shared.interleaved),
        r !== null)
      ) {
        d = r;
        do ((g |= d.lane), (d = d.next));
        while (d !== r);
      } else h === null && (d.shared.lanes = 0);
      ((io |= g), (t.lanes = g), (t.memoizedState = ie));
    }
  }
  function em(t, r, s) {
    if (((t = r.effects), (r.effects = null), t !== null))
      for (r = 0; r < t.length; r++) {
        var u = t[r],
          d = u.callback;
        if (d !== null) {
          if (((u.callback = null), (u = s), typeof d != 'function'))
            throw Error(o(191, d));
          d.call(u);
        }
      }
  }
  var fs = {},
    In = Cr(fs),
    ds = Cr(fs),
    ps = Cr(fs);
  function ro(t) {
    if (t === fs) throw Error(o(174));
    return t;
  }
  function Ac(t, r) {
    switch ((Ke(ps, r), Ke(ds, t), Ke(In, fs), (t = r.nodeType), t)) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Ui(null, '');
        break;
      default:
        ((t = t === 8 ? r.parentNode : r),
          (r = t.namespaceURI || null),
          (t = t.tagName),
          (r = Ui(r, t)));
    }
    (Xe(In), Ke(In, r));
  }
  function Jo() {
    (Xe(In), Xe(ds), Xe(ps));
  }
  function tm(t) {
    ro(ps.current);
    var r = ro(In.current),
      s = Ui(r, t.type);
    r !== s && (Ke(ds, t), Ke(In, s));
  }
  function $c(t) {
    ds.current === t && (Xe(In), Xe(ds));
  }
  var nt = Cr(0);
  function Ha(t) {
    for (var r = t; r !== null; ) {
      if (r.tag === 13) {
        var s = r.memoizedState;
        if (
          s !== null &&
          ((s = s.dehydrated), s === null || s.data === '$?' || s.data === '$!')
        )
          return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if ((r.flags & 128) !== 0) return r;
      } else if (r.child !== null) {
        ((r.child.return = r), (r = r.child));
        continue;
      }
      if (r === t) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t) return null;
        r = r.return;
      }
      ((r.sibling.return = r.return), (r = r.sibling));
    }
    return null;
  }
  var Oc = [];
  function Ic() {
    for (var t = 0; t < Oc.length; t++)
      Oc[t]._workInProgressVersionPrimary = null;
    Oc.length = 0;
  }
  var Ka = k.ReactCurrentDispatcher,
    Dc = k.ReactCurrentBatchConfig,
    oo = 0,
    rt = null,
    pt = null,
    yt = null,
    Qa = !1,
    hs = !1,
    ms = 0,
    R1 = 0;
  function kt() {
    throw Error(o(321));
  }
  function Fc(t, r) {
    if (r === null) return !1;
    for (var s = 0; s < r.length && s < t.length; s++)
      if (!vn(t[s], r[s])) return !1;
    return !0;
  }
  function zc(t, r, s, u, d, h) {
    if (
      ((oo = h),
      (rt = r),
      (r.memoizedState = null),
      (r.updateQueue = null),
      (r.lanes = 0),
      (Ka.current = t === null || t.memoizedState === null ? P1 : N1),
      (t = s(u, d)),
      hs)
    ) {
      h = 0;
      do {
        if (((hs = !1), (ms = 0), 25 <= h)) throw Error(o(301));
        ((h += 1),
          (yt = pt = null),
          (r.updateQueue = null),
          (Ka.current = L1),
          (t = s(u, d)));
      } while (hs);
    }
    if (
      ((Ka.current = Xa),
      (r = pt !== null && pt.next !== null),
      (oo = 0),
      (yt = pt = rt = null),
      (Qa = !1),
      r)
    )
      throw Error(o(300));
    return t;
  }
  function jc() {
    var t = ms !== 0;
    return ((ms = 0), t);
  }
  function Dn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return (yt === null ? (rt.memoizedState = yt = t) : (yt = yt.next = t), yt);
  }
  function rn() {
    if (pt === null) {
      var t = rt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = pt.next;
    var r = yt === null ? rt.memoizedState : yt.next;
    if (r !== null) ((yt = r), (pt = t));
    else {
      if (t === null) throw Error(o(310));
      ((pt = t),
        (t = {
          memoizedState: pt.memoizedState,
          baseState: pt.baseState,
          baseQueue: pt.baseQueue,
          queue: pt.queue,
          next: null
        }),
        yt === null ? (rt.memoizedState = yt = t) : (yt = yt.next = t));
    }
    return yt;
  }
  function vs(t, r) {
    return typeof r == 'function' ? r(t) : r;
  }
  function Vc(t) {
    var r = rn(),
      s = r.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var u = pt,
      d = u.baseQueue,
      h = s.pending;
    if (h !== null) {
      if (d !== null) {
        var g = d.next;
        ((d.next = h.next), (h.next = g));
      }
      ((u.baseQueue = d = h), (s.pending = null));
    }
    if (d !== null) {
      ((h = d.next), (u = u.baseState));
      var P = (g = null),
        M = null,
        K = h;
      do {
        var re = K.lane;
        if ((oo & re) === re)
          (M !== null &&
            (M = M.next =
              {
                lane: 0,
                action: K.action,
                hasEagerState: K.hasEagerState,
                eagerState: K.eagerState,
                next: null
              }),
            (u = K.hasEagerState ? K.eagerState : t(u, K.action)));
        else {
          var ie = {
            lane: re,
            action: K.action,
            hasEagerState: K.hasEagerState,
            eagerState: K.eagerState,
            next: null
          };
          (M === null ? ((P = M = ie), (g = u)) : (M = M.next = ie),
            (rt.lanes |= re),
            (io |= re));
        }
        K = K.next;
      } while (K !== null && K !== h);
      (M === null ? (g = u) : (M.next = P),
        vn(u, r.memoizedState) || (Vt = !0),
        (r.memoizedState = u),
        (r.baseState = g),
        (r.baseQueue = M),
        (s.lastRenderedState = u));
    }
    if (((t = s.interleaved), t !== null)) {
      d = t;
      do ((h = d.lane), (rt.lanes |= h), (io |= h), (d = d.next));
      while (d !== t);
    } else d === null && (s.lanes = 0);
    return [r.memoizedState, s.dispatch];
  }
  function Bc(t) {
    var r = rn(),
      s = r.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = t;
    var u = s.dispatch,
      d = s.pending,
      h = r.memoizedState;
    if (d !== null) {
      s.pending = null;
      var g = (d = d.next);
      do ((h = t(h, g.action)), (g = g.next));
      while (g !== d);
      (vn(h, r.memoizedState) || (Vt = !0),
        (r.memoizedState = h),
        r.baseQueue === null && (r.baseState = h),
        (s.lastRenderedState = h));
    }
    return [h, u];
  }
  function nm() {}
  function rm(t, r) {
    var s = rt,
      u = rn(),
      d = r(),
      h = !vn(u.memoizedState, d);
    if (
      (h && ((u.memoizedState = d), (Vt = !0)),
      (u = u.queue),
      Uc(sm.bind(null, s, u, t), [t]),
      u.getSnapshot !== r || h || (yt !== null && yt.memoizedState.tag & 1))
    ) {
      if (
        ((s.flags |= 2048),
        ys(9, im.bind(null, s, u, d, r), void 0, null),
        gt === null)
      )
        throw Error(o(349));
      (oo & 30) !== 0 || om(s, r, d);
    }
    return d;
  }
  function om(t, r, s) {
    ((t.flags |= 16384),
      (t = { getSnapshot: r, value: s }),
      (r = rt.updateQueue),
      r === null
        ? ((r = { lastEffect: null, stores: null }),
          (rt.updateQueue = r),
          (r.stores = [t]))
        : ((s = r.stores), s === null ? (r.stores = [t]) : s.push(t)));
  }
  function im(t, r, s, u) {
    ((r.value = s), (r.getSnapshot = u), am(r) && lm(t));
  }
  function sm(t, r, s) {
    return s(function () {
      am(r) && lm(t);
    });
  }
  function am(t) {
    var r = t.getSnapshot;
    t = t.value;
    try {
      var s = r();
      return !vn(t, s);
    } catch {
      return !0;
    }
  }
  function lm(t) {
    var r = tr(t, 1);
    r !== null && Cn(r, t, 1, -1);
  }
  function um(t) {
    var r = Dn();
    return (
      typeof t == 'function' && (t = t()),
      (r.memoizedState = r.baseState = t),
      (t = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: vs,
        lastRenderedState: t
      }),
      (r.queue = t),
      (t = t.dispatch = k1.bind(null, rt, t)),
      [r.memoizedState, t]
    );
  }
  function ys(t, r, s, u) {
    return (
      (t = { tag: t, create: r, destroy: s, deps: u, next: null }),
      (r = rt.updateQueue),
      r === null
        ? ((r = { lastEffect: null, stores: null }),
          (rt.updateQueue = r),
          (r.lastEffect = t.next = t))
        : ((s = r.lastEffect),
          s === null
            ? (r.lastEffect = t.next = t)
            : ((u = s.next), (s.next = t), (t.next = u), (r.lastEffect = t))),
      t
    );
  }
  function cm() {
    return rn().memoizedState;
  }
  function Ga(t, r, s, u) {
    var d = Dn();
    ((rt.flags |= t),
      (d.memoizedState = ys(1 | r, s, void 0, u === void 0 ? null : u)));
  }
  function Ya(t, r, s, u) {
    var d = rn();
    u = u === void 0 ? null : u;
    var h = void 0;
    if (pt !== null) {
      var g = pt.memoizedState;
      if (((h = g.destroy), u !== null && Fc(u, g.deps))) {
        d.memoizedState = ys(r, s, h, u);
        return;
      }
    }
    ((rt.flags |= t), (d.memoizedState = ys(1 | r, s, h, u)));
  }
  function fm(t, r) {
    return Ga(8390656, 8, t, r);
  }
  function Uc(t, r) {
    return Ya(2048, 8, t, r);
  }
  function dm(t, r) {
    return Ya(4, 2, t, r);
  }
  function pm(t, r) {
    return Ya(4, 4, t, r);
  }
  function hm(t, r) {
    if (typeof r == 'function')
      return (
        (t = t()),
        r(t),
        function () {
          r(null);
        }
      );
    if (r != null)
      return (
        (t = t()),
        (r.current = t),
        function () {
          r.current = null;
        }
      );
  }
  function mm(t, r, s) {
    return (
      (s = s != null ? s.concat([t]) : null),
      Ya(4, 4, hm.bind(null, r, t), s)
    );
  }
  function Wc() {}
  function vm(t, r) {
    var s = rn();
    r = r === void 0 ? null : r;
    var u = s.memoizedState;
    return u !== null && r !== null && Fc(r, u[1])
      ? u[0]
      : ((s.memoizedState = [t, r]), t);
  }
  function ym(t, r) {
    var s = rn();
    r = r === void 0 ? null : r;
    var u = s.memoizedState;
    return u !== null && r !== null && Fc(r, u[1])
      ? u[0]
      : ((t = t()), (s.memoizedState = [t, r]), t);
  }
  function gm(t, r, s) {
    return (oo & 21) === 0
      ? (t.baseState && ((t.baseState = !1), (Vt = !0)), (t.memoizedState = s))
      : (vn(s, r) ||
          ((s = Gp()), (rt.lanes |= s), (io |= s), (t.baseState = !0)),
        r);
  }
  function x1(t, r) {
    var s = Ve;
    ((Ve = s !== 0 && 4 > s ? s : 4), t(!0));
    var u = Dc.transition;
    Dc.transition = {};
    try {
      (t(!1), r());
    } finally {
      ((Ve = s), (Dc.transition = u));
    }
  }
  function wm() {
    return rn().memoizedState;
  }
  function T1(t, r, s) {
    var u = Pr(t);
    if (
      ((s = {
        lane: u,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }),
      Sm(t))
    )
      Cm(r, s);
    else if (((s = qh(t, r, s, u)), s !== null)) {
      var d = $t();
      (Cn(s, t, u, d), _m(s, r, u));
    }
  }
  function k1(t, r, s) {
    var u = Pr(t),
      d = {
        lane: u,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
    if (Sm(t)) Cm(r, d);
    else {
      var h = t.alternate;
      if (
        t.lanes === 0 &&
        (h === null || h.lanes === 0) &&
        ((h = r.lastRenderedReducer), h !== null)
      )
        try {
          var g = r.lastRenderedState,
            P = h(g, s);
          if (((d.hasEagerState = !0), (d.eagerState = P), vn(P, g))) {
            var M = r.interleaved;
            (M === null
              ? ((d.next = d), Lc(r))
              : ((d.next = M.next), (M.next = d)),
              (r.interleaved = d));
            return;
          }
        } catch {
        } finally {
        }
      ((s = qh(t, r, d, u)),
        s !== null && ((d = $t()), Cn(s, t, u, d), _m(s, r, u)));
    }
  }
  function Sm(t) {
    var r = t.alternate;
    return t === rt || (r !== null && r === rt);
  }
  function Cm(t, r) {
    hs = Qa = !0;
    var s = t.pending;
    (s === null ? (r.next = r) : ((r.next = s.next), (s.next = r)),
      (t.pending = r));
  }
  function _m(t, r, s) {
    if ((s & 4194240) !== 0) {
      var u = r.lanes;
      ((u &= t.pendingLanes), (s |= u), (r.lanes = s), Ku(t, s));
    }
  }
  var Xa = {
      readContext: nn,
      useCallback: kt,
      useContext: kt,
      useEffect: kt,
      useImperativeHandle: kt,
      useInsertionEffect: kt,
      useLayoutEffect: kt,
      useMemo: kt,
      useReducer: kt,
      useRef: kt,
      useState: kt,
      useDebugValue: kt,
      useDeferredValue: kt,
      useTransition: kt,
      useMutableSource: kt,
      useSyncExternalStore: kt,
      useId: kt,
      unstable_isNewReconciler: !1
    },
    P1 = {
      readContext: nn,
      useCallback: function (t, r) {
        return ((Dn().memoizedState = [t, r === void 0 ? null : r]), t);
      },
      useContext: nn,
      useEffect: fm,
      useImperativeHandle: function (t, r, s) {
        return (
          (s = s != null ? s.concat([t]) : null),
          Ga(4194308, 4, hm.bind(null, r, t), s)
        );
      },
      useLayoutEffect: function (t, r) {
        return Ga(4194308, 4, t, r);
      },
      useInsertionEffect: function (t, r) {
        return Ga(4, 2, t, r);
      },
      useMemo: function (t, r) {
        var s = Dn();
        return (
          (r = r === void 0 ? null : r),
          (t = t()),
          (s.memoizedState = [t, r]),
          t
        );
      },
      useReducer: function (t, r, s) {
        var u = Dn();
        return (
          (r = s !== void 0 ? s(r) : r),
          (u.memoizedState = u.baseState = r),
          (t = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: r
          }),
          (u.queue = t),
          (t = t.dispatch = T1.bind(null, rt, t)),
          [u.memoizedState, t]
        );
      },
      useRef: function (t) {
        var r = Dn();
        return ((t = { current: t }), (r.memoizedState = t));
      },
      useState: um,
      useDebugValue: Wc,
      useDeferredValue: function (t) {
        return (Dn().memoizedState = t);
      },
      useTransition: function () {
        var t = um(!1),
          r = t[0];
        return ((t = x1.bind(null, t[1])), (Dn().memoizedState = t), [r, t]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (t, r, s) {
        var u = rt,
          d = Dn();
        if (et) {
          if (s === void 0) throw Error(o(407));
          s = s();
        } else {
          if (((s = r()), gt === null)) throw Error(o(349));
          (oo & 30) !== 0 || om(u, r, s);
        }
        d.memoizedState = s;
        var h = { value: s, getSnapshot: r };
        return (
          (d.queue = h),
          fm(sm.bind(null, u, h, t), [t]),
          (u.flags |= 2048),
          ys(9, im.bind(null, u, h, s, r), void 0, null),
          s
        );
      },
      useId: function () {
        var t = Dn(),
          r = gt.identifierPrefix;
        if (et) {
          var s = er,
            u = Jn;
          ((s = (u & ~(1 << (32 - mn(u) - 1))).toString(32) + s),
            (r = ':' + r + 'R' + s),
            (s = ms++),
            0 < s && (r += 'H' + s.toString(32)),
            (r += ':'));
        } else ((s = R1++), (r = ':' + r + 'r' + s.toString(32) + ':'));
        return (t.memoizedState = r);
      },
      unstable_isNewReconciler: !1
    },
    N1 = {
      readContext: nn,
      useCallback: vm,
      useContext: nn,
      useEffect: Uc,
      useImperativeHandle: mm,
      useInsertionEffect: dm,
      useLayoutEffect: pm,
      useMemo: ym,
      useReducer: Vc,
      useRef: cm,
      useState: function () {
        return Vc(vs);
      },
      useDebugValue: Wc,
      useDeferredValue: function (t) {
        var r = rn();
        return gm(r, pt.memoizedState, t);
      },
      useTransition: function () {
        var t = Vc(vs)[0],
          r = rn().memoizedState;
        return [t, r];
      },
      useMutableSource: nm,
      useSyncExternalStore: rm,
      useId: wm,
      unstable_isNewReconciler: !1
    },
    L1 = {
      readContext: nn,
      useCallback: vm,
      useContext: nn,
      useEffect: Uc,
      useImperativeHandle: mm,
      useInsertionEffect: dm,
      useLayoutEffect: pm,
      useMemo: ym,
      useReducer: Bc,
      useRef: cm,
      useState: function () {
        return Bc(vs);
      },
      useDebugValue: Wc,
      useDeferredValue: function (t) {
        var r = rn();
        return pt === null ? (r.memoizedState = t) : gm(r, pt.memoizedState, t);
      },
      useTransition: function () {
        var t = Bc(vs)[0],
          r = rn().memoizedState;
        return [t, r];
      },
      useMutableSource: nm,
      useSyncExternalStore: rm,
      useId: wm,
      unstable_isNewReconciler: !1
    };
  function gn(t, r) {
    if (t && t.defaultProps) {
      ((r = U({}, r)), (t = t.defaultProps));
      for (var s in t) r[s] === void 0 && (r[s] = t[s]);
      return r;
    }
    return r;
  }
  function Hc(t, r, s, u) {
    ((r = t.memoizedState),
      (s = s(u, r)),
      (s = s == null ? r : U({}, r, s)),
      (t.memoizedState = s),
      t.lanes === 0 && (t.updateQueue.baseState = s));
  }
  var qa = {
    isMounted: function (t) {
      return (t = t._reactInternals) ? qr(t) === t : !1;
    },
    enqueueSetState: function (t, r, s) {
      t = t._reactInternals;
      var u = $t(),
        d = Pr(t),
        h = nr(u, d);
      ((h.payload = r),
        s != null && (h.callback = s),
        (r = Rr(t, h, d)),
        r !== null && (Cn(r, t, d, u), Ua(r, t, d)));
    },
    enqueueReplaceState: function (t, r, s) {
      t = t._reactInternals;
      var u = $t(),
        d = Pr(t),
        h = nr(u, d);
      ((h.tag = 1),
        (h.payload = r),
        s != null && (h.callback = s),
        (r = Rr(t, h, d)),
        r !== null && (Cn(r, t, d, u), Ua(r, t, d)));
    },
    enqueueForceUpdate: function (t, r) {
      t = t._reactInternals;
      var s = $t(),
        u = Pr(t),
        d = nr(s, u);
      ((d.tag = 2),
        r != null && (d.callback = r),
        (r = Rr(t, d, u)),
        r !== null && (Cn(r, t, u, s), Ua(r, t, u)));
    }
  };
  function Em(t, r, s, u, d, h, g) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(u, h, g)
        : r.prototype && r.prototype.isPureReactComponent
          ? !rs(s, u) || !rs(d, h)
          : !0
    );
  }
  function bm(t, r, s) {
    var u = !1,
      d = _r,
      h = r.contextType;
    return (
      typeof h == 'object' && h !== null
        ? (h = nn(h))
        : ((d = jt(r) ? Jr : Tt.current),
          (u = r.contextTypes),
          (h = (u = u != null) ? Ko(t, d) : _r)),
      (r = new r(s, h)),
      (t.memoizedState =
        r.state !== null && r.state !== void 0 ? r.state : null),
      (r.updater = qa),
      (t.stateNode = r),
      (r._reactInternals = t),
      u &&
        ((t = t.stateNode),
        (t.__reactInternalMemoizedUnmaskedChildContext = d),
        (t.__reactInternalMemoizedMaskedChildContext = h)),
      r
    );
  }
  function Rm(t, r, s, u) {
    ((t = r.state),
      typeof r.componentWillReceiveProps == 'function' &&
        r.componentWillReceiveProps(s, u),
      typeof r.UNSAFE_componentWillReceiveProps == 'function' &&
        r.UNSAFE_componentWillReceiveProps(s, u),
      r.state !== t && qa.enqueueReplaceState(r, r.state, null));
  }
  function Kc(t, r, s, u) {
    var d = t.stateNode;
    ((d.props = s), (d.state = t.memoizedState), (d.refs = {}), Mc(t));
    var h = r.contextType;
    (typeof h == 'object' && h !== null
      ? (d.context = nn(h))
      : ((h = jt(r) ? Jr : Tt.current), (d.context = Ko(t, h))),
      (d.state = t.memoizedState),
      (h = r.getDerivedStateFromProps),
      typeof h == 'function' && (Hc(t, r, h, s), (d.state = t.memoizedState)),
      typeof r.getDerivedStateFromProps == 'function' ||
        typeof d.getSnapshotBeforeUpdate == 'function' ||
        (typeof d.UNSAFE_componentWillMount != 'function' &&
          typeof d.componentWillMount != 'function') ||
        ((r = d.state),
        typeof d.componentWillMount == 'function' && d.componentWillMount(),
        typeof d.UNSAFE_componentWillMount == 'function' &&
          d.UNSAFE_componentWillMount(),
        r !== d.state && qa.enqueueReplaceState(d, d.state, null),
        Wa(t, s, d, u),
        (d.state = t.memoizedState)),
      typeof d.componentDidMount == 'function' && (t.flags |= 4194308));
  }
  function ei(t, r) {
    try {
      var s = '',
        u = r;
      do ((s += te(u)), (u = u.return));
      while (u);
      var d = s;
    } catch (h) {
      d =
        `
Error generating stack: ` +
        h.message +
        `
` +
        h.stack;
    }
    return { value: t, source: r, stack: d, digest: null };
  }
  function Qc(t, r, s) {
    return { value: t, source: null, stack: s ?? null, digest: r ?? null };
  }
  function Gc(t, r) {
    try {
      console.error(r.value);
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  var M1 = typeof WeakMap == 'function' ? WeakMap : Map;
  function xm(t, r, s) {
    ((s = nr(-1, s)), (s.tag = 3), (s.payload = { element: null }));
    var u = r.value;
    return (
      (s.callback = function () {
        (ol || ((ol = !0), (cf = u)), Gc(t, r));
      }),
      s
    );
  }
  function Tm(t, r, s) {
    ((s = nr(-1, s)), (s.tag = 3));
    var u = t.type.getDerivedStateFromError;
    if (typeof u == 'function') {
      var d = r.value;
      ((s.payload = function () {
        return u(d);
      }),
        (s.callback = function () {
          Gc(t, r);
        }));
    }
    var h = t.stateNode;
    return (
      h !== null &&
        typeof h.componentDidCatch == 'function' &&
        (s.callback = function () {
          (Gc(t, r),
            typeof u != 'function' &&
              (Tr === null ? (Tr = new Set([this])) : Tr.add(this)));
          var g = r.stack;
          this.componentDidCatch(r.value, {
            componentStack: g !== null ? g : ''
          });
        }),
      s
    );
  }
  function km(t, r, s) {
    var u = t.pingCache;
    if (u === null) {
      u = t.pingCache = new M1();
      var d = new Set();
      u.set(r, d);
    } else ((d = u.get(r)), d === void 0 && ((d = new Set()), u.set(r, d)));
    d.has(s) || (d.add(s), (t = K1.bind(null, t, r, s)), r.then(t, t));
  }
  function Pm(t) {
    do {
      var r;
      if (
        ((r = t.tag === 13) &&
          ((r = t.memoizedState),
          (r = r !== null ? r.dehydrated !== null : !0)),
        r)
      )
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function Nm(t, r, s, u, d) {
    return (t.mode & 1) === 0
      ? (t === r
          ? (t.flags |= 65536)
          : ((t.flags |= 128),
            (s.flags |= 131072),
            (s.flags &= -52805),
            s.tag === 1 &&
              (s.alternate === null
                ? (s.tag = 17)
                : ((r = nr(-1, 1)), (r.tag = 2), Rr(s, r, 1))),
            (s.lanes |= 1)),
        t)
      : ((t.flags |= 65536), (t.lanes = d), t);
  }
  var A1 = k.ReactCurrentOwner,
    Vt = !1;
  function At(t, r, s, u) {
    r.child = t === null ? Xh(r, null, s, u) : Xo(r, t.child, s, u);
  }
  function Lm(t, r, s, u, d) {
    s = s.render;
    var h = r.ref;
    return (
      Zo(r, d),
      (u = zc(t, r, s, u, h, d)),
      (s = jc()),
      t !== null && !Vt
        ? ((r.updateQueue = t.updateQueue),
          (r.flags &= -2053),
          (t.lanes &= ~d),
          rr(t, r, d))
        : (et && s && _c(r), (r.flags |= 1), At(t, r, u, d), r.child)
    );
  }
  function Mm(t, r, s, u, d) {
    if (t === null) {
      var h = s.type;
      return typeof h == 'function' &&
        !yf(h) &&
        h.defaultProps === void 0 &&
        s.compare === null &&
        s.defaultProps === void 0
        ? ((r.tag = 15), (r.type = h), Am(t, r, h, u, d))
        : ((t = cl(s.type, null, u, r, r.mode, d)),
          (t.ref = r.ref),
          (t.return = r),
          (r.child = t));
    }
    if (((h = t.child), (t.lanes & d) === 0)) {
      var g = h.memoizedProps;
      if (
        ((s = s.compare), (s = s !== null ? s : rs), s(g, u) && t.ref === r.ref)
      )
        return rr(t, r, d);
    }
    return (
      (r.flags |= 1),
      (t = Lr(h, u)),
      (t.ref = r.ref),
      (t.return = r),
      (r.child = t)
    );
  }
  function Am(t, r, s, u, d) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (rs(h, u) && t.ref === r.ref)
        if (((Vt = !1), (r.pendingProps = u = h), (t.lanes & d) !== 0))
          (t.flags & 131072) !== 0 && (Vt = !0);
        else return ((r.lanes = t.lanes), rr(t, r, d));
    }
    return Yc(t, r, s, u, d);
  }
  function $m(t, r, s) {
    var u = r.pendingProps,
      d = u.children,
      h = t !== null ? t.memoizedState : null;
    if (u.mode === 'hidden')
      if ((r.mode & 1) === 0)
        ((r.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        }),
          Ke(ni, Xt),
          (Xt |= s));
      else {
        if ((s & 1073741824) === 0)
          return (
            (t = h !== null ? h.baseLanes | s : s),
            (r.lanes = r.childLanes = 1073741824),
            (r.memoizedState = {
              baseLanes: t,
              cachePool: null,
              transitions: null
            }),
            (r.updateQueue = null),
            Ke(ni, Xt),
            (Xt |= t),
            null
          );
        ((r.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null
        }),
          (u = h !== null ? h.baseLanes : s),
          Ke(ni, Xt),
          (Xt |= u));
      }
    else
      (h !== null ? ((u = h.baseLanes | s), (r.memoizedState = null)) : (u = s),
        Ke(ni, Xt),
        (Xt |= u));
    return (At(t, r, d, s), r.child);
  }
  function Om(t, r) {
    var s = r.ref;
    ((t === null && s !== null) || (t !== null && t.ref !== s)) &&
      ((r.flags |= 512), (r.flags |= 2097152));
  }
  function Yc(t, r, s, u, d) {
    var h = jt(s) ? Jr : Tt.current;
    return (
      (h = Ko(r, h)),
      Zo(r, d),
      (s = zc(t, r, s, u, h, d)),
      (u = jc()),
      t !== null && !Vt
        ? ((r.updateQueue = t.updateQueue),
          (r.flags &= -2053),
          (t.lanes &= ~d),
          rr(t, r, d))
        : (et && u && _c(r), (r.flags |= 1), At(t, r, s, d), r.child)
    );
  }
  function Im(t, r, s, u, d) {
    if (jt(s)) {
      var h = !0;
      Oa(r);
    } else h = !1;
    if ((Zo(r, d), r.stateNode === null))
      (Ja(t, r), bm(r, s, u), Kc(r, s, u, d), (u = !0));
    else if (t === null) {
      var g = r.stateNode,
        P = r.memoizedProps;
      g.props = P;
      var M = g.context,
        K = s.contextType;
      typeof K == 'object' && K !== null
        ? (K = nn(K))
        : ((K = jt(s) ? Jr : Tt.current), (K = Ko(r, K)));
      var re = s.getDerivedStateFromProps,
        ie =
          typeof re == 'function' ||
          typeof g.getSnapshotBeforeUpdate == 'function';
      (ie ||
        (typeof g.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof g.componentWillReceiveProps != 'function') ||
        ((P !== u || M !== K) && Rm(r, g, u, K)),
        (br = !1));
      var ne = r.memoizedState;
      ((g.state = ne),
        Wa(r, u, g, d),
        (M = r.memoizedState),
        P !== u || ne !== M || zt.current || br
          ? (typeof re == 'function' &&
              (Hc(r, s, re, u), (M = r.memoizedState)),
            (P = br || Em(r, s, P, u, ne, M, K))
              ? (ie ||
                  (typeof g.UNSAFE_componentWillMount != 'function' &&
                    typeof g.componentWillMount != 'function') ||
                  (typeof g.componentWillMount == 'function' &&
                    g.componentWillMount(),
                  typeof g.UNSAFE_componentWillMount == 'function' &&
                    g.UNSAFE_componentWillMount()),
                typeof g.componentDidMount == 'function' &&
                  (r.flags |= 4194308))
              : (typeof g.componentDidMount == 'function' &&
                  (r.flags |= 4194308),
                (r.memoizedProps = u),
                (r.memoizedState = M)),
            (g.props = u),
            (g.state = M),
            (g.context = K),
            (u = P))
          : (typeof g.componentDidMount == 'function' && (r.flags |= 4194308),
            (u = !1)));
    } else {
      ((g = r.stateNode),
        Zh(t, r),
        (P = r.memoizedProps),
        (K = r.type === r.elementType ? P : gn(r.type, P)),
        (g.props = K),
        (ie = r.pendingProps),
        (ne = g.context),
        (M = s.contextType),
        typeof M == 'object' && M !== null
          ? (M = nn(M))
          : ((M = jt(s) ? Jr : Tt.current), (M = Ko(r, M))));
      var ve = s.getDerivedStateFromProps;
      ((re =
        typeof ve == 'function' ||
        typeof g.getSnapshotBeforeUpdate == 'function') ||
        (typeof g.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof g.componentWillReceiveProps != 'function') ||
        ((P !== ie || ne !== M) && Rm(r, g, u, M)),
        (br = !1),
        (ne = r.memoizedState),
        (g.state = ne),
        Wa(r, u, g, d));
      var Se = r.memoizedState;
      P !== ie || ne !== Se || zt.current || br
        ? (typeof ve == 'function' && (Hc(r, s, ve, u), (Se = r.memoizedState)),
          (K = br || Em(r, s, K, u, ne, Se, M) || !1)
            ? (re ||
                (typeof g.UNSAFE_componentWillUpdate != 'function' &&
                  typeof g.componentWillUpdate != 'function') ||
                (typeof g.componentWillUpdate == 'function' &&
                  g.componentWillUpdate(u, Se, M),
                typeof g.UNSAFE_componentWillUpdate == 'function' &&
                  g.UNSAFE_componentWillUpdate(u, Se, M)),
              typeof g.componentDidUpdate == 'function' && (r.flags |= 4),
              typeof g.getSnapshotBeforeUpdate == 'function' &&
                (r.flags |= 1024))
            : (typeof g.componentDidUpdate != 'function' ||
                (P === t.memoizedProps && ne === t.memoizedState) ||
                (r.flags |= 4),
              typeof g.getSnapshotBeforeUpdate != 'function' ||
                (P === t.memoizedProps && ne === t.memoizedState) ||
                (r.flags |= 1024),
              (r.memoizedProps = u),
              (r.memoizedState = Se)),
          (g.props = u),
          (g.state = Se),
          (g.context = M),
          (u = K))
        : (typeof g.componentDidUpdate != 'function' ||
            (P === t.memoizedProps && ne === t.memoizedState) ||
            (r.flags |= 4),
          typeof g.getSnapshotBeforeUpdate != 'function' ||
            (P === t.memoizedProps && ne === t.memoizedState) ||
            (r.flags |= 1024),
          (u = !1));
    }
    return Xc(t, r, s, u, h, d);
  }
  function Xc(t, r, s, u, d, h) {
    Om(t, r);
    var g = (r.flags & 128) !== 0;
    if (!u && !g) return (d && Vh(r, s, !1), rr(t, r, h));
    ((u = r.stateNode), (A1.current = r));
    var P =
      g && typeof s.getDerivedStateFromError != 'function' ? null : u.render();
    return (
      (r.flags |= 1),
      t !== null && g
        ? ((r.child = Xo(r, t.child, null, h)), (r.child = Xo(r, null, P, h)))
        : At(t, r, P, h),
      (r.memoizedState = u.state),
      d && Vh(r, s, !0),
      r.child
    );
  }
  function Dm(t) {
    var r = t.stateNode;
    (r.pendingContext
      ? zh(t, r.pendingContext, r.pendingContext !== r.context)
      : r.context && zh(t, r.context, !1),
      Ac(t, r.containerInfo));
  }
  function Fm(t, r, s, u, d) {
    return (Yo(), xc(d), (r.flags |= 256), At(t, r, s, u), r.child);
  }
  var qc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Zc(t) {
    return { baseLanes: t, cachePool: null, transitions: null };
  }
  function zm(t, r, s) {
    var u = r.pendingProps,
      d = nt.current,
      h = !1,
      g = (r.flags & 128) !== 0,
      P;
    if (
      ((P = g) ||
        (P = t !== null && t.memoizedState === null ? !1 : (d & 2) !== 0),
      P
        ? ((h = !0), (r.flags &= -129))
        : (t === null || t.memoizedState !== null) && (d |= 1),
      Ke(nt, d & 1),
      t === null)
    )
      return (
        Rc(r),
        (t = r.memoizedState),
        t !== null && ((t = t.dehydrated), t !== null)
          ? ((r.mode & 1) === 0
              ? (r.lanes = 1)
              : t.data === '$!'
                ? (r.lanes = 8)
                : (r.lanes = 1073741824),
            null)
          : ((g = u.children),
            (t = u.fallback),
            h
              ? ((u = r.mode),
                (h = r.child),
                (g = { mode: 'hidden', children: g }),
                (u & 1) === 0 && h !== null
                  ? ((h.childLanes = 0), (h.pendingProps = g))
                  : (h = fl(g, u, 0, null)),
                (t = uo(t, u, s, null)),
                (h.return = r),
                (t.return = r),
                (h.sibling = t),
                (r.child = h),
                (r.child.memoizedState = Zc(s)),
                (r.memoizedState = qc),
                t)
              : Jc(r, g))
      );
    if (((d = t.memoizedState), d !== null && ((P = d.dehydrated), P !== null)))
      return $1(t, r, g, u, P, d, s);
    if (h) {
      ((h = u.fallback), (g = r.mode), (d = t.child), (P = d.sibling));
      var M = { mode: 'hidden', children: u.children };
      return (
        (g & 1) === 0 && r.child !== d
          ? ((u = r.child),
            (u.childLanes = 0),
            (u.pendingProps = M),
            (r.deletions = null))
          : ((u = Lr(d, M)), (u.subtreeFlags = d.subtreeFlags & 14680064)),
        P !== null ? (h = Lr(P, h)) : ((h = uo(h, g, s, null)), (h.flags |= 2)),
        (h.return = r),
        (u.return = r),
        (u.sibling = h),
        (r.child = u),
        (u = h),
        (h = r.child),
        (g = t.child.memoizedState),
        (g =
          g === null
            ? Zc(s)
            : {
                baseLanes: g.baseLanes | s,
                cachePool: null,
                transitions: g.transitions
              }),
        (h.memoizedState = g),
        (h.childLanes = t.childLanes & ~s),
        (r.memoizedState = qc),
        u
      );
    }
    return (
      (h = t.child),
      (t = h.sibling),
      (u = Lr(h, { mode: 'visible', children: u.children })),
      (r.mode & 1) === 0 && (u.lanes = s),
      (u.return = r),
      (u.sibling = null),
      t !== null &&
        ((s = r.deletions),
        s === null ? ((r.deletions = [t]), (r.flags |= 16)) : s.push(t)),
      (r.child = u),
      (r.memoizedState = null),
      u
    );
  }
  function Jc(t, r) {
    return (
      (r = fl({ mode: 'visible', children: r }, t.mode, 0, null)),
      (r.return = t),
      (t.child = r)
    );
  }
  function Za(t, r, s, u) {
    return (
      u !== null && xc(u),
      Xo(r, t.child, null, s),
      (t = Jc(r, r.pendingProps.children)),
      (t.flags |= 2),
      (r.memoizedState = null),
      t
    );
  }
  function $1(t, r, s, u, d, h, g) {
    if (s)
      return r.flags & 256
        ? ((r.flags &= -257), (u = Qc(Error(o(422)))), Za(t, r, g, u))
        : r.memoizedState !== null
          ? ((r.child = t.child), (r.flags |= 128), null)
          : ((h = u.fallback),
            (d = r.mode),
            (u = fl({ mode: 'visible', children: u.children }, d, 0, null)),
            (h = uo(h, d, g, null)),
            (h.flags |= 2),
            (u.return = r),
            (h.return = r),
            (u.sibling = h),
            (r.child = u),
            (r.mode & 1) !== 0 && Xo(r, t.child, null, g),
            (r.child.memoizedState = Zc(g)),
            (r.memoizedState = qc),
            h);
    if ((r.mode & 1) === 0) return Za(t, r, g, null);
    if (d.data === '$!') {
      if (((u = d.nextSibling && d.nextSibling.dataset), u)) var P = u.dgst;
      return (
        (u = P),
        (h = Error(o(419))),
        (u = Qc(h, u, void 0)),
        Za(t, r, g, u)
      );
    }
    if (((P = (g & t.childLanes) !== 0), Vt || P)) {
      if (((u = gt), u !== null)) {
        switch (g & -g) {
          case 4:
            d = 2;
            break;
          case 16:
            d = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            d = 32;
            break;
          case 536870912:
            d = 268435456;
            break;
          default:
            d = 0;
        }
        ((d = (d & (u.suspendedLanes | g)) !== 0 ? 0 : d),
          d !== 0 &&
            d !== h.retryLane &&
            ((h.retryLane = d), tr(t, d), Cn(u, t, d, -1)));
      }
      return (vf(), (u = Qc(Error(o(421)))), Za(t, r, g, u));
    }
    return d.data === '$?'
      ? ((r.flags |= 128),
        (r.child = t.child),
        (r = Q1.bind(null, t)),
        (d._reactRetry = r),
        null)
      : ((t = h.treeContext),
        (Yt = Sr(d.nextSibling)),
        (Gt = r),
        (et = !0),
        (yn = null),
        t !== null &&
          ((en[tn++] = Jn),
          (en[tn++] = er),
          (en[tn++] = eo),
          (Jn = t.id),
          (er = t.overflow),
          (eo = r)),
        (r = Jc(r, u.children)),
        (r.flags |= 4096),
        r);
  }
  function jm(t, r, s) {
    t.lanes |= r;
    var u = t.alternate;
    (u !== null && (u.lanes |= r), Nc(t.return, r, s));
  }
  function ef(t, r, s, u, d) {
    var h = t.memoizedState;
    h === null
      ? (t.memoizedState = {
          isBackwards: r,
          rendering: null,
          renderingStartTime: 0,
          last: u,
          tail: s,
          tailMode: d
        })
      : ((h.isBackwards = r),
        (h.rendering = null),
        (h.renderingStartTime = 0),
        (h.last = u),
        (h.tail = s),
        (h.tailMode = d));
  }
  function Vm(t, r, s) {
    var u = r.pendingProps,
      d = u.revealOrder,
      h = u.tail;
    if ((At(t, r, u.children, s), (u = nt.current), (u & 2) !== 0))
      ((u = (u & 1) | 2), (r.flags |= 128));
    else {
      if (t !== null && (t.flags & 128) !== 0)
        e: for (t = r.child; t !== null; ) {
          if (t.tag === 13) t.memoizedState !== null && jm(t, s, r);
          else if (t.tag === 19) jm(t, s, r);
          else if (t.child !== null) {
            ((t.child.return = t), (t = t.child));
            continue;
          }
          if (t === r) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === r) break e;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      u &= 1;
    }
    if ((Ke(nt, u), (r.mode & 1) === 0)) r.memoizedState = null;
    else
      switch (d) {
        case 'forwards':
          for (s = r.child, d = null; s !== null; )
            ((t = s.alternate),
              t !== null && Ha(t) === null && (d = s),
              (s = s.sibling));
          ((s = d),
            s === null
              ? ((d = r.child), (r.child = null))
              : ((d = s.sibling), (s.sibling = null)),
            ef(r, !1, d, s, h));
          break;
        case 'backwards':
          for (s = null, d = r.child, r.child = null; d !== null; ) {
            if (((t = d.alternate), t !== null && Ha(t) === null)) {
              r.child = d;
              break;
            }
            ((t = d.sibling), (d.sibling = s), (s = d), (d = t));
          }
          ef(r, !0, s, null, h);
          break;
        case 'together':
          ef(r, !1, null, null, void 0);
          break;
        default:
          r.memoizedState = null;
      }
    return r.child;
  }
  function Ja(t, r) {
    (r.mode & 1) === 0 &&
      t !== null &&
      ((t.alternate = null), (r.alternate = null), (r.flags |= 2));
  }
  function rr(t, r, s) {
    if (
      (t !== null && (r.dependencies = t.dependencies),
      (io |= r.lanes),
      (s & r.childLanes) === 0)
    )
      return null;
    if (t !== null && r.child !== t.child) throw Error(o(153));
    if (r.child !== null) {
      for (
        t = r.child, s = Lr(t, t.pendingProps), r.child = s, s.return = r;
        t.sibling !== null;
      )
        ((t = t.sibling),
          (s = s.sibling = Lr(t, t.pendingProps)),
          (s.return = r));
      s.sibling = null;
    }
    return r.child;
  }
  function O1(t, r, s) {
    switch (r.tag) {
      case 3:
        (Dm(r), Yo());
        break;
      case 5:
        tm(r);
        break;
      case 1:
        jt(r.type) && Oa(r);
        break;
      case 4:
        Ac(r, r.stateNode.containerInfo);
        break;
      case 10:
        var u = r.type._context,
          d = r.memoizedProps.value;
        (Ke(Va, u._currentValue), (u._currentValue = d));
        break;
      case 13:
        if (((u = r.memoizedState), u !== null))
          return u.dehydrated !== null
            ? (Ke(nt, nt.current & 1), (r.flags |= 128), null)
            : (s & r.child.childLanes) !== 0
              ? zm(t, r, s)
              : (Ke(nt, nt.current & 1),
                (t = rr(t, r, s)),
                t !== null ? t.sibling : null);
        Ke(nt, nt.current & 1);
        break;
      case 19:
        if (((u = (s & r.childLanes) !== 0), (t.flags & 128) !== 0)) {
          if (u) return Vm(t, r, s);
          r.flags |= 128;
        }
        if (
          ((d = r.memoizedState),
          d !== null &&
            ((d.rendering = null), (d.tail = null), (d.lastEffect = null)),
          Ke(nt, nt.current),
          u)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((r.lanes = 0), $m(t, r, s));
    }
    return rr(t, r, s);
  }
  var Bm, tf, Um, Wm;
  ((Bm = function (t, r) {
    for (var s = r.child; s !== null; ) {
      if (s.tag === 5 || s.tag === 6) t.appendChild(s.stateNode);
      else if (s.tag !== 4 && s.child !== null) {
        ((s.child.return = s), (s = s.child));
        continue;
      }
      if (s === r) break;
      for (; s.sibling === null; ) {
        if (s.return === null || s.return === r) return;
        s = s.return;
      }
      ((s.sibling.return = s.return), (s = s.sibling));
    }
  }),
    (tf = function () {}),
    (Um = function (t, r, s, u) {
      var d = t.memoizedProps;
      if (d !== u) {
        ((t = r.stateNode), ro(In.current));
        var h = null;
        switch (s) {
          case 'input':
            ((d = mt(t, d)), (u = mt(t, u)), (h = []));
            break;
          case 'select':
            ((d = U({}, d, { value: void 0 })),
              (u = U({}, u, { value: void 0 })),
              (h = []));
            break;
          case 'textarea':
            ((d = Ao(t, d)), (u = Ao(t, u)), (h = []));
            break;
          default:
            typeof d.onClick != 'function' &&
              typeof u.onClick == 'function' &&
              (t.onclick = Ma);
        }
        I(s, u);
        var g;
        s = null;
        for (K in d)
          if (!u.hasOwnProperty(K) && d.hasOwnProperty(K) && d[K] != null)
            if (K === 'style') {
              var P = d[K];
              for (g in P) P.hasOwnProperty(g) && (s || (s = {}), (s[g] = ''));
            } else
              K !== 'dangerouslySetInnerHTML' &&
                K !== 'children' &&
                K !== 'suppressContentEditableWarning' &&
                K !== 'suppressHydrationWarning' &&
                K !== 'autoFocus' &&
                (a.hasOwnProperty(K)
                  ? h || (h = [])
                  : (h = h || []).push(K, null));
        for (K in u) {
          var M = u[K];
          if (
            ((P = d != null ? d[K] : void 0),
            u.hasOwnProperty(K) && M !== P && (M != null || P != null))
          )
            if (K === 'style')
              if (P) {
                for (g in P)
                  !P.hasOwnProperty(g) ||
                    (M && M.hasOwnProperty(g)) ||
                    (s || (s = {}), (s[g] = ''));
                for (g in M)
                  M.hasOwnProperty(g) &&
                    P[g] !== M[g] &&
                    (s || (s = {}), (s[g] = M[g]));
              } else (s || (h || (h = []), h.push(K, s)), (s = M));
            else
              K === 'dangerouslySetInnerHTML'
                ? ((M = M ? M.__html : void 0),
                  (P = P ? P.__html : void 0),
                  M != null && P !== M && (h = h || []).push(K, M))
                : K === 'children'
                  ? (typeof M != 'string' && typeof M != 'number') ||
                    (h = h || []).push(K, '' + M)
                  : K !== 'suppressContentEditableWarning' &&
                    K !== 'suppressHydrationWarning' &&
                    (a.hasOwnProperty(K)
                      ? (M != null && K === 'onScroll' && Ye('scroll', t),
                        h || P === M || (h = []))
                      : (h = h || []).push(K, M));
        }
        s && (h = h || []).push('style', s);
        var K = h;
        (r.updateQueue = K) && (r.flags |= 4);
      }
    }),
    (Wm = function (t, r, s, u) {
      s !== u && (r.flags |= 4);
    }));
  function gs(t, r) {
    if (!et)
      switch (t.tailMode) {
        case 'hidden':
          r = t.tail;
          for (var s = null; r !== null; )
            (r.alternate !== null && (s = r), (r = r.sibling));
          s === null ? (t.tail = null) : (s.sibling = null);
          break;
        case 'collapsed':
          s = t.tail;
          for (var u = null; s !== null; )
            (s.alternate !== null && (u = s), (s = s.sibling));
          u === null
            ? r || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (u.sibling = null);
      }
  }
  function Pt(t) {
    var r = t.alternate !== null && t.alternate.child === t.child,
      s = 0,
      u = 0;
    if (r)
      for (var d = t.child; d !== null; )
        ((s |= d.lanes | d.childLanes),
          (u |= d.subtreeFlags & 14680064),
          (u |= d.flags & 14680064),
          (d.return = t),
          (d = d.sibling));
    else
      for (d = t.child; d !== null; )
        ((s |= d.lanes | d.childLanes),
          (u |= d.subtreeFlags),
          (u |= d.flags),
          (d.return = t),
          (d = d.sibling));
    return ((t.subtreeFlags |= u), (t.childLanes = s), r);
  }
  function I1(t, r, s) {
    var u = r.pendingProps;
    switch ((Ec(r), r.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Pt(r), null);
      case 1:
        return (jt(r.type) && $a(), Pt(r), null);
      case 3:
        return (
          (u = r.stateNode),
          Jo(),
          Xe(zt),
          Xe(Tt),
          Ic(),
          u.pendingContext &&
            ((u.context = u.pendingContext), (u.pendingContext = null)),
          (t === null || t.child === null) &&
            (za(r)
              ? (r.flags |= 4)
              : t === null ||
                (t.memoizedState.isDehydrated && (r.flags & 256) === 0) ||
                ((r.flags |= 1024), yn !== null && (pf(yn), (yn = null)))),
          tf(t, r),
          Pt(r),
          null
        );
      case 5:
        $c(r);
        var d = ro(ps.current);
        if (((s = r.type), t !== null && r.stateNode != null))
          (Um(t, r, s, u, d),
            t.ref !== r.ref && ((r.flags |= 512), (r.flags |= 2097152)));
        else {
          if (!u) {
            if (r.stateNode === null) throw Error(o(166));
            return (Pt(r), null);
          }
          if (((t = ro(In.current)), za(r))) {
            ((u = r.stateNode), (s = r.type));
            var h = r.memoizedProps;
            switch (((u[On] = r), (u[ls] = h), (t = (r.mode & 1) !== 0), s)) {
              case 'dialog':
                (Ye('cancel', u), Ye('close', u));
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                Ye('load', u);
                break;
              case 'video':
              case 'audio':
                for (d = 0; d < is.length; d++) Ye(is[d], u);
                break;
              case 'source':
                Ye('error', u);
                break;
              case 'img':
              case 'image':
              case 'link':
                (Ye('error', u), Ye('load', u));
                break;
              case 'details':
                Ye('toggle', u);
                break;
              case 'input':
                (vt(u, h), Ye('invalid', u));
                break;
              case 'select':
                ((u._wrapperState = { wasMultiple: !!h.multiple }),
                  Ye('invalid', u));
                break;
              case 'textarea':
                (ia(u, h), Ye('invalid', u));
            }
            (I(s, h), (d = null));
            for (var g in h)
              if (h.hasOwnProperty(g)) {
                var P = h[g];
                g === 'children'
                  ? typeof P == 'string'
                    ? u.textContent !== P &&
                      (h.suppressHydrationWarning !== !0 &&
                        La(u.textContent, P, t),
                      (d = ['children', P]))
                    : typeof P == 'number' &&
                      u.textContent !== '' + P &&
                      (h.suppressHydrationWarning !== !0 &&
                        La(u.textContent, P, t),
                      (d = ['children', '' + P]))
                  : a.hasOwnProperty(g) &&
                    P != null &&
                    g === 'onScroll' &&
                    Ye('scroll', u);
              }
            switch (s) {
              case 'input':
                (Ue(u), Kr(u, h, !0));
                break;
              case 'textarea':
                (Ue(u), Oo(u));
                break;
              case 'select':
              case 'option':
                break;
              default:
                typeof h.onClick == 'function' && (u.onclick = Ma);
            }
            ((u = d), (r.updateQueue = u), u !== null && (r.flags |= 4));
          } else {
            ((g = d.nodeType === 9 ? d : d.ownerDocument),
              t === 'http://www.w3.org/1999/xhtml' && (t = sa(s)),
              t === 'http://www.w3.org/1999/xhtml'
                ? s === 'script'
                  ? ((t = g.createElement('div')),
                    (t.innerHTML = '<script><\/script>'),
                    (t = t.removeChild(t.firstChild)))
                  : typeof u.is == 'string'
                    ? (t = g.createElement(s, { is: u.is }))
                    : ((t = g.createElement(s)),
                      s === 'select' &&
                        ((g = t),
                        u.multiple
                          ? (g.multiple = !0)
                          : u.size && (g.size = u.size)))
                : (t = g.createElementNS(t, s)),
              (t[On] = r),
              (t[ls] = u),
              Bm(t, r, !1, !1),
              (r.stateNode = t));
            e: {
              switch (((g = oe(s, u)), s)) {
                case 'dialog':
                  (Ye('cancel', t), Ye('close', t), (d = u));
                  break;
                case 'iframe':
                case 'object':
                case 'embed':
                  (Ye('load', t), (d = u));
                  break;
                case 'video':
                case 'audio':
                  for (d = 0; d < is.length; d++) Ye(is[d], t);
                  d = u;
                  break;
                case 'source':
                  (Ye('error', t), (d = u));
                  break;
                case 'img':
                case 'image':
                case 'link':
                  (Ye('error', t), Ye('load', t), (d = u));
                  break;
                case 'details':
                  (Ye('toggle', t), (d = u));
                  break;
                case 'input':
                  (vt(t, u), (d = mt(t, u)), Ye('invalid', t));
                  break;
                case 'option':
                  d = u;
                  break;
                case 'select':
                  ((t._wrapperState = { wasMultiple: !!u.multiple }),
                    (d = U({}, u, { value: void 0 })),
                    Ye('invalid', t));
                  break;
                case 'textarea':
                  (ia(t, u), (d = Ao(t, u)), Ye('invalid', t));
                  break;
                default:
                  d = u;
              }
              (I(s, d), (P = d));
              for (h in P)
                if (P.hasOwnProperty(h)) {
                  var M = P[h];
                  h === 'style'
                    ? ca(t, M)
                    : h === 'dangerouslySetInnerHTML'
                      ? ((M = M ? M.__html : void 0), M != null && aa(t, M))
                      : h === 'children'
                        ? typeof M == 'string'
                          ? (s !== 'textarea' || M !== '') && Gr(t, M)
                          : typeof M == 'number' && Gr(t, '' + M)
                        : h !== 'suppressContentEditableWarning' &&
                          h !== 'suppressHydrationWarning' &&
                          h !== 'autoFocus' &&
                          (a.hasOwnProperty(h)
                            ? M != null && h === 'onScroll' && Ye('scroll', t)
                            : M != null && T(t, h, M, g));
                }
              switch (s) {
                case 'input':
                  (Ue(t), Kr(t, u, !1));
                  break;
                case 'textarea':
                  (Ue(t), Oo(t));
                  break;
                case 'option':
                  u.value != null && t.setAttribute('value', '' + ae(u.value));
                  break;
                case 'select':
                  ((t.multiple = !!u.multiple),
                    (h = u.value),
                    h != null
                      ? An(t, !!u.multiple, h, !1)
                      : u.defaultValue != null &&
                        An(t, !!u.multiple, u.defaultValue, !0));
                  break;
                default:
                  typeof d.onClick == 'function' && (t.onclick = Ma);
              }
              switch (s) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  u = !!u.autoFocus;
                  break e;
                case 'img':
                  u = !0;
                  break e;
                default:
                  u = !1;
              }
            }
            u && (r.flags |= 4);
          }
          r.ref !== null && ((r.flags |= 512), (r.flags |= 2097152));
        }
        return (Pt(r), null);
      case 6:
        if (t && r.stateNode != null) Wm(t, r, t.memoizedProps, u);
        else {
          if (typeof u != 'string' && r.stateNode === null) throw Error(o(166));
          if (((s = ro(ps.current)), ro(In.current), za(r))) {
            if (
              ((u = r.stateNode),
              (s = r.memoizedProps),
              (u[On] = r),
              (h = u.nodeValue !== s) && ((t = Gt), t !== null))
            )
              switch (t.tag) {
                case 3:
                  La(u.nodeValue, s, (t.mode & 1) !== 0);
                  break;
                case 5:
                  t.memoizedProps.suppressHydrationWarning !== !0 &&
                    La(u.nodeValue, s, (t.mode & 1) !== 0);
              }
            h && (r.flags |= 4);
          } else
            ((u = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(u)),
              (u[On] = r),
              (r.stateNode = u));
        }
        return (Pt(r), null);
      case 13:
        if (
          (Xe(nt),
          (u = r.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (et && Yt !== null && (r.mode & 1) !== 0 && (r.flags & 128) === 0)
            (Qh(), Yo(), (r.flags |= 98560), (h = !1));
          else if (((h = za(r)), u !== null && u.dehydrated !== null)) {
            if (t === null) {
              if (!h) throw Error(o(318));
              if (
                ((h = r.memoizedState),
                (h = h !== null ? h.dehydrated : null),
                !h)
              )
                throw Error(o(317));
              h[On] = r;
            } else
              (Yo(),
                (r.flags & 128) === 0 && (r.memoizedState = null),
                (r.flags |= 4));
            (Pt(r), (h = !1));
          } else (yn !== null && (pf(yn), (yn = null)), (h = !0));
          if (!h) return r.flags & 65536 ? r : null;
        }
        return (r.flags & 128) !== 0
          ? ((r.lanes = s), r)
          : ((u = u !== null),
            u !== (t !== null && t.memoizedState !== null) &&
              u &&
              ((r.child.flags |= 8192),
              (r.mode & 1) !== 0 &&
                (t === null || (nt.current & 1) !== 0
                  ? ht === 0 && (ht = 3)
                  : vf())),
            r.updateQueue !== null && (r.flags |= 4),
            Pt(r),
            null);
      case 4:
        return (
          Jo(),
          tf(t, r),
          t === null && ss(r.stateNode.containerInfo),
          Pt(r),
          null
        );
      case 10:
        return (Pc(r.type._context), Pt(r), null);
      case 17:
        return (jt(r.type) && $a(), Pt(r), null);
      case 19:
        if ((Xe(nt), (h = r.memoizedState), h === null)) return (Pt(r), null);
        if (((u = (r.flags & 128) !== 0), (g = h.rendering), g === null))
          if (u) gs(h, !1);
          else {
            if (ht !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = r.child; t !== null; ) {
                if (((g = Ha(t)), g !== null)) {
                  for (
                    r.flags |= 128,
                      gs(h, !1),
                      u = g.updateQueue,
                      u !== null && ((r.updateQueue = u), (r.flags |= 4)),
                      r.subtreeFlags = 0,
                      u = s,
                      s = r.child;
                    s !== null;
                  )
                    ((h = s),
                      (t = u),
                      (h.flags &= 14680066),
                      (g = h.alternate),
                      g === null
                        ? ((h.childLanes = 0),
                          (h.lanes = t),
                          (h.child = null),
                          (h.subtreeFlags = 0),
                          (h.memoizedProps = null),
                          (h.memoizedState = null),
                          (h.updateQueue = null),
                          (h.dependencies = null),
                          (h.stateNode = null))
                        : ((h.childLanes = g.childLanes),
                          (h.lanes = g.lanes),
                          (h.child = g.child),
                          (h.subtreeFlags = 0),
                          (h.deletions = null),
                          (h.memoizedProps = g.memoizedProps),
                          (h.memoizedState = g.memoizedState),
                          (h.updateQueue = g.updateQueue),
                          (h.type = g.type),
                          (t = g.dependencies),
                          (h.dependencies =
                            t === null
                              ? null
                              : {
                                  lanes: t.lanes,
                                  firstContext: t.firstContext
                                })),
                      (s = s.sibling));
                  return (Ke(nt, (nt.current & 1) | 2), r.child);
                }
                t = t.sibling;
              }
            h.tail !== null &&
              lt() > ri &&
              ((r.flags |= 128), (u = !0), gs(h, !1), (r.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = Ha(g)), t !== null)) {
              if (
                ((r.flags |= 128),
                (u = !0),
                (s = t.updateQueue),
                s !== null && ((r.updateQueue = s), (r.flags |= 4)),
                gs(h, !0),
                h.tail === null &&
                  h.tailMode === 'hidden' &&
                  !g.alternate &&
                  !et)
              )
                return (Pt(r), null);
            } else
              2 * lt() - h.renderingStartTime > ri &&
                s !== 1073741824 &&
                ((r.flags |= 128), (u = !0), gs(h, !1), (r.lanes = 4194304));
          h.isBackwards
            ? ((g.sibling = r.child), (r.child = g))
            : ((s = h.last),
              s !== null ? (s.sibling = g) : (r.child = g),
              (h.last = g));
        }
        return h.tail !== null
          ? ((r = h.tail),
            (h.rendering = r),
            (h.tail = r.sibling),
            (h.renderingStartTime = lt()),
            (r.sibling = null),
            (s = nt.current),
            Ke(nt, u ? (s & 1) | 2 : s & 1),
            r)
          : (Pt(r), null);
      case 22:
      case 23:
        return (
          mf(),
          (u = r.memoizedState !== null),
          t !== null && (t.memoizedState !== null) !== u && (r.flags |= 8192),
          u && (r.mode & 1) !== 0
            ? (Xt & 1073741824) !== 0 &&
              (Pt(r), r.subtreeFlags & 6 && (r.flags |= 8192))
            : Pt(r),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(o(156, r.tag));
  }
  function D1(t, r) {
    switch ((Ec(r), r.tag)) {
      case 1:
        return (
          jt(r.type) && $a(),
          (t = r.flags),
          t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
        );
      case 3:
        return (
          Jo(),
          Xe(zt),
          Xe(Tt),
          Ic(),
          (t = r.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((r.flags = (t & -65537) | 128), r)
            : null
        );
      case 5:
        return ($c(r), null);
      case 13:
        if (
          (Xe(nt), (t = r.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (r.alternate === null) throw Error(o(340));
          Yo();
        }
        return (
          (t = r.flags),
          t & 65536 ? ((r.flags = (t & -65537) | 128), r) : null
        );
      case 19:
        return (Xe(nt), null);
      case 4:
        return (Jo(), null);
      case 10:
        return (Pc(r.type._context), null);
      case 22:
      case 23:
        return (mf(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var el = !1,
    Nt = !1,
    F1 = typeof WeakSet == 'function' ? WeakSet : Set,
    we = null;
  function ti(t, r) {
    var s = t.ref;
    if (s !== null)
      if (typeof s == 'function')
        try {
          s(null);
        } catch (u) {
          it(t, r, u);
        }
      else s.current = null;
  }
  function nf(t, r, s) {
    try {
      s();
    } catch (u) {
      it(t, r, u);
    }
  }
  var Hm = !1;
  function z1(t, r) {
    if (((hc = Sa), (t = Eh()), sc(t))) {
      if ('selectionStart' in t)
        var s = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          s = ((s = t.ownerDocument) && s.defaultView) || window;
          var u = s.getSelection && s.getSelection();
          if (u && u.rangeCount !== 0) {
            s = u.anchorNode;
            var d = u.anchorOffset,
              h = u.focusNode;
            u = u.focusOffset;
            try {
              (s.nodeType, h.nodeType);
            } catch {
              s = null;
              break e;
            }
            var g = 0,
              P = -1,
              M = -1,
              K = 0,
              re = 0,
              ie = t,
              ne = null;
            t: for (;;) {
              for (
                var ve;
                ie !== s || (d !== 0 && ie.nodeType !== 3) || (P = g + d),
                  ie !== h || (u !== 0 && ie.nodeType !== 3) || (M = g + u),
                  ie.nodeType === 3 && (g += ie.nodeValue.length),
                  (ve = ie.firstChild) !== null;
              )
                ((ne = ie), (ie = ve));
              for (;;) {
                if (ie === t) break t;
                if (
                  (ne === s && ++K === d && (P = g),
                  ne === h && ++re === u && (M = g),
                  (ve = ie.nextSibling) !== null)
                )
                  break;
                ((ie = ne), (ne = ie.parentNode));
              }
              ie = ve;
            }
            s = P === -1 || M === -1 ? null : { start: P, end: M };
          } else s = null;
        }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (
      mc = { focusedElem: t, selectionRange: s }, Sa = !1, we = r;
      we !== null;
    )
      if (
        ((r = we), (t = r.child), (r.subtreeFlags & 1028) !== 0 && t !== null)
      )
        ((t.return = r), (we = t));
      else
        for (; we !== null; ) {
          r = we;
          try {
            var Se = r.alternate;
            if ((r.flags & 1024) !== 0)
              switch (r.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (Se !== null) {
                    var Ce = Se.memoizedProps,
                      ut = Se.memoizedState,
                      z = r.stateNode,
                      A = z.getSnapshotBeforeUpdate(
                        r.elementType === r.type ? Ce : gn(r.type, Ce),
                        ut
                      );
                    z.__reactInternalSnapshotBeforeUpdate = A;
                  }
                  break;
                case 3:
                  var V = r.stateNode.containerInfo;
                  V.nodeType === 1
                    ? (V.textContent = '')
                    : V.nodeType === 9 &&
                      V.documentElement &&
                      V.removeChild(V.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(o(163));
              }
          } catch (ue) {
            it(r, r.return, ue);
          }
          if (((t = r.sibling), t !== null)) {
            ((t.return = r.return), (we = t));
            break;
          }
          we = r.return;
        }
    return ((Se = Hm), (Hm = !1), Se);
  }
  function ws(t, r, s) {
    var u = r.updateQueue;
    if (((u = u !== null ? u.lastEffect : null), u !== null)) {
      var d = (u = u.next);
      do {
        if ((d.tag & t) === t) {
          var h = d.destroy;
          ((d.destroy = void 0), h !== void 0 && nf(r, s, h));
        }
        d = d.next;
      } while (d !== u);
    }
  }
  function tl(t, r) {
    if (
      ((r = r.updateQueue), (r = r !== null ? r.lastEffect : null), r !== null)
    ) {
      var s = (r = r.next);
      do {
        if ((s.tag & t) === t) {
          var u = s.create;
          s.destroy = u();
        }
        s = s.next;
      } while (s !== r);
    }
  }
  function rf(t) {
    var r = t.ref;
    if (r !== null) {
      var s = t.stateNode;
      switch (t.tag) {
        case 5:
          t = s;
          break;
        default:
          t = s;
      }
      typeof r == 'function' ? r(t) : (r.current = t);
    }
  }
  function Km(t) {
    var r = t.alternate;
    (r !== null && ((t.alternate = null), Km(r)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 &&
        ((r = t.stateNode),
        r !== null &&
          (delete r[On],
          delete r[ls],
          delete r[wc],
          delete r[C1],
          delete r[_1])),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  function Qm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 4;
  }
  function Gm(t) {
    e: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Qm(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if (t.flags & 2 || t.child === null || t.tag === 4) continue e;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function of(t, r, s) {
    var u = t.tag;
    if (u === 5 || u === 6)
      ((t = t.stateNode),
        r
          ? s.nodeType === 8
            ? s.parentNode.insertBefore(t, r)
            : s.insertBefore(t, r)
          : (s.nodeType === 8
              ? ((r = s.parentNode), r.insertBefore(t, s))
              : ((r = s), r.appendChild(t)),
            (s = s._reactRootContainer),
            s != null || r.onclick !== null || (r.onclick = Ma)));
    else if (u !== 4 && ((t = t.child), t !== null))
      for (of(t, r, s), t = t.sibling; t !== null; )
        (of(t, r, s), (t = t.sibling));
  }
  function sf(t, r, s) {
    var u = t.tag;
    if (u === 5 || u === 6)
      ((t = t.stateNode), r ? s.insertBefore(t, r) : s.appendChild(t));
    else if (u !== 4 && ((t = t.child), t !== null))
      for (sf(t, r, s), t = t.sibling; t !== null; )
        (sf(t, r, s), (t = t.sibling));
  }
  var Et = null,
    wn = !1;
  function xr(t, r, s) {
    for (s = s.child; s !== null; ) (Ym(t, r, s), (s = s.sibling));
  }
  function Ym(t, r, s) {
    if ($n && typeof $n.onCommitFiberUnmount == 'function')
      try {
        $n.onCommitFiberUnmount(ha, s);
      } catch {}
    switch (s.tag) {
      case 5:
        Nt || ti(s, r);
      case 6:
        var u = Et,
          d = wn;
        ((Et = null),
          xr(t, r, s),
          (Et = u),
          (wn = d),
          Et !== null &&
            (wn
              ? ((t = Et),
                (s = s.stateNode),
                t.nodeType === 8
                  ? t.parentNode.removeChild(s)
                  : t.removeChild(s))
              : Et.removeChild(s.stateNode)));
        break;
      case 18:
        Et !== null &&
          (wn
            ? ((t = Et),
              (s = s.stateNode),
              t.nodeType === 8
                ? gc(t.parentNode, s)
                : t.nodeType === 1 && gc(t, s),
              qi(t))
            : gc(Et, s.stateNode));
        break;
      case 4:
        ((u = Et),
          (d = wn),
          (Et = s.stateNode.containerInfo),
          (wn = !0),
          xr(t, r, s),
          (Et = u),
          (wn = d));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Nt &&
          ((u = s.updateQueue), u !== null && ((u = u.lastEffect), u !== null))
        ) {
          d = u = u.next;
          do {
            var h = d,
              g = h.destroy;
            ((h = h.tag),
              g !== void 0 && ((h & 2) !== 0 || (h & 4) !== 0) && nf(s, r, g),
              (d = d.next));
          } while (d !== u);
        }
        xr(t, r, s);
        break;
      case 1:
        if (
          !Nt &&
          (ti(s, r),
          (u = s.stateNode),
          typeof u.componentWillUnmount == 'function')
        )
          try {
            ((u.props = s.memoizedProps),
              (u.state = s.memoizedState),
              u.componentWillUnmount());
          } catch (P) {
            it(s, r, P);
          }
        xr(t, r, s);
        break;
      case 21:
        xr(t, r, s);
        break;
      case 22:
        s.mode & 1
          ? ((Nt = (u = Nt) || s.memoizedState !== null), xr(t, r, s), (Nt = u))
          : xr(t, r, s);
        break;
      default:
        xr(t, r, s);
    }
  }
  function Xm(t) {
    var r = t.updateQueue;
    if (r !== null) {
      t.updateQueue = null;
      var s = t.stateNode;
      (s === null && (s = t.stateNode = new F1()),
        r.forEach(function (u) {
          var d = G1.bind(null, t, u);
          s.has(u) || (s.add(u), u.then(d, d));
        }));
    }
  }
  function Sn(t, r) {
    var s = r.deletions;
    if (s !== null)
      for (var u = 0; u < s.length; u++) {
        var d = s[u];
        try {
          var h = t,
            g = r,
            P = g;
          e: for (; P !== null; ) {
            switch (P.tag) {
              case 5:
                ((Et = P.stateNode), (wn = !1));
                break e;
              case 3:
                ((Et = P.stateNode.containerInfo), (wn = !0));
                break e;
              case 4:
                ((Et = P.stateNode.containerInfo), (wn = !0));
                break e;
            }
            P = P.return;
          }
          if (Et === null) throw Error(o(160));
          (Ym(h, g, d), (Et = null), (wn = !1));
          var M = d.alternate;
          (M !== null && (M.return = null), (d.return = null));
        } catch (K) {
          it(d, r, K);
        }
      }
    if (r.subtreeFlags & 12854)
      for (r = r.child; r !== null; ) (qm(r, t), (r = r.sibling));
  }
  function qm(t, r) {
    var s = t.alternate,
      u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Sn(r, t), Fn(t), u & 4)) {
          try {
            (ws(3, t, t.return), tl(3, t));
          } catch (Ce) {
            it(t, t.return, Ce);
          }
          try {
            ws(5, t, t.return);
          } catch (Ce) {
            it(t, t.return, Ce);
          }
        }
        break;
      case 1:
        (Sn(r, t), Fn(t), u & 512 && s !== null && ti(s, s.return));
        break;
      case 5:
        if (
          (Sn(r, t),
          Fn(t),
          u & 512 && s !== null && ti(s, s.return),
          t.flags & 32)
        ) {
          var d = t.stateNode;
          try {
            Gr(d, '');
          } catch (Ce) {
            it(t, t.return, Ce);
          }
        }
        if (u & 4 && ((d = t.stateNode), d != null)) {
          var h = t.memoizedProps,
            g = s !== null ? s.memoizedProps : h,
            P = t.type,
            M = t.updateQueue;
          if (((t.updateQueue = null), M !== null))
            try {
              (P === 'input' &&
                h.type === 'radio' &&
                h.name != null &&
                dt(d, h),
                oe(P, g));
              var K = oe(P, h);
              for (g = 0; g < M.length; g += 2) {
                var re = M[g],
                  ie = M[g + 1];
                re === 'style'
                  ? ca(d, ie)
                  : re === 'dangerouslySetInnerHTML'
                    ? aa(d, ie)
                    : re === 'children'
                      ? Gr(d, ie)
                      : T(d, re, ie, K);
              }
              switch (P) {
                case 'input':
                  Mn(d, h);
                  break;
                case 'textarea':
                  $o(d, h);
                  break;
                case 'select':
                  var ne = d._wrapperState.wasMultiple;
                  d._wrapperState.wasMultiple = !!h.multiple;
                  var ve = h.value;
                  ve != null
                    ? An(d, !!h.multiple, ve, !1)
                    : ne !== !!h.multiple &&
                      (h.defaultValue != null
                        ? An(d, !!h.multiple, h.defaultValue, !0)
                        : An(d, !!h.multiple, h.multiple ? [] : '', !1));
              }
              d[ls] = h;
            } catch (Ce) {
              it(t, t.return, Ce);
            }
        }
        break;
      case 6:
        if ((Sn(r, t), Fn(t), u & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          ((d = t.stateNode), (h = t.memoizedProps));
          try {
            d.nodeValue = h;
          } catch (Ce) {
            it(t, t.return, Ce);
          }
        }
        break;
      case 3:
        if (
          (Sn(r, t), Fn(t), u & 4 && s !== null && s.memoizedState.isDehydrated)
        )
          try {
            qi(r.containerInfo);
          } catch (Ce) {
            it(t, t.return, Ce);
          }
        break;
      case 4:
        (Sn(r, t), Fn(t));
        break;
      case 13:
        (Sn(r, t),
          Fn(t),
          (d = t.child),
          d.flags & 8192 &&
            ((h = d.memoizedState !== null),
            (d.stateNode.isHidden = h),
            !h ||
              (d.alternate !== null && d.alternate.memoizedState !== null) ||
              (uf = lt())),
          u & 4 && Xm(t));
        break;
      case 22:
        if (
          ((re = s !== null && s.memoizedState !== null),
          t.mode & 1 ? ((Nt = (K = Nt) || re), Sn(r, t), (Nt = K)) : Sn(r, t),
          Fn(t),
          u & 8192)
        ) {
          if (
            ((K = t.memoizedState !== null),
            (t.stateNode.isHidden = K) && !re && (t.mode & 1) !== 0)
          )
            for (we = t, re = t.child; re !== null; ) {
              for (ie = we = re; we !== null; ) {
                switch (((ne = we), (ve = ne.child), ne.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ws(4, ne, ne.return);
                    break;
                  case 1:
                    ti(ne, ne.return);
                    var Se = ne.stateNode;
                    if (typeof Se.componentWillUnmount == 'function') {
                      ((u = ne), (s = ne.return));
                      try {
                        ((r = u),
                          (Se.props = r.memoizedProps),
                          (Se.state = r.memoizedState),
                          Se.componentWillUnmount());
                      } catch (Ce) {
                        it(u, s, Ce);
                      }
                    }
                    break;
                  case 5:
                    ti(ne, ne.return);
                    break;
                  case 22:
                    if (ne.memoizedState !== null) {
                      ev(ie);
                      continue;
                    }
                }
                ve !== null ? ((ve.return = ne), (we = ve)) : ev(ie);
              }
              re = re.sibling;
            }
          e: for (re = null, ie = t; ; ) {
            if (ie.tag === 5) {
              if (re === null) {
                re = ie;
                try {
                  ((d = ie.stateNode),
                    K
                      ? ((h = d.style),
                        typeof h.setProperty == 'function'
                          ? h.setProperty('display', 'none', 'important')
                          : (h.display = 'none'))
                      : ((P = ie.stateNode),
                        (M = ie.memoizedProps.style),
                        (g =
                          M != null && M.hasOwnProperty('display')
                            ? M.display
                            : null),
                        (P.style.display = ua('display', g))));
                } catch (Ce) {
                  it(t, t.return, Ce);
                }
              }
            } else if (ie.tag === 6) {
              if (re === null)
                try {
                  ie.stateNode.nodeValue = K ? '' : ie.memoizedProps;
                } catch (Ce) {
                  it(t, t.return, Ce);
                }
            } else if (
              ((ie.tag !== 22 && ie.tag !== 23) ||
                ie.memoizedState === null ||
                ie === t) &&
              ie.child !== null
            ) {
              ((ie.child.return = ie), (ie = ie.child));
              continue;
            }
            if (ie === t) break e;
            for (; ie.sibling === null; ) {
              if (ie.return === null || ie.return === t) break e;
              (re === ie && (re = null), (ie = ie.return));
            }
            (re === ie && (re = null),
              (ie.sibling.return = ie.return),
              (ie = ie.sibling));
          }
        }
        break;
      case 19:
        (Sn(r, t), Fn(t), u & 4 && Xm(t));
        break;
      case 21:
        break;
      default:
        (Sn(r, t), Fn(t));
    }
  }
  function Fn(t) {
    var r = t.flags;
    if (r & 2) {
      try {
        e: {
          for (var s = t.return; s !== null; ) {
            if (Qm(s)) {
              var u = s;
              break e;
            }
            s = s.return;
          }
          throw Error(o(160));
        }
        switch (u.tag) {
          case 5:
            var d = u.stateNode;
            u.flags & 32 && (Gr(d, ''), (u.flags &= -33));
            var h = Gm(t);
            sf(t, h, d);
            break;
          case 3:
          case 4:
            var g = u.stateNode.containerInfo,
              P = Gm(t);
            of(t, P, g);
            break;
          default:
            throw Error(o(161));
        }
      } catch (M) {
        it(t, t.return, M);
      }
      t.flags &= -3;
    }
    r & 4096 && (t.flags &= -4097);
  }
  function j1(t, r, s) {
    ((we = t), Zm(t));
  }
  function Zm(t, r, s) {
    for (var u = (t.mode & 1) !== 0; we !== null; ) {
      var d = we,
        h = d.child;
      if (d.tag === 22 && u) {
        var g = d.memoizedState !== null || el;
        if (!g) {
          var P = d.alternate,
            M = (P !== null && P.memoizedState !== null) || Nt;
          P = el;
          var K = Nt;
          if (((el = g), (Nt = M) && !K))
            for (we = d; we !== null; )
              ((g = we),
                (M = g.child),
                g.tag === 22 && g.memoizedState !== null
                  ? tv(d)
                  : M !== null
                    ? ((M.return = g), (we = M))
                    : tv(d));
          for (; h !== null; ) ((we = h), Zm(h), (h = h.sibling));
          ((we = d), (el = P), (Nt = K));
        }
        Jm(t);
      } else
        (d.subtreeFlags & 8772) !== 0 && h !== null
          ? ((h.return = d), (we = h))
          : Jm(t);
    }
  }
  function Jm(t) {
    for (; we !== null; ) {
      var r = we;
      if ((r.flags & 8772) !== 0) {
        var s = r.alternate;
        try {
          if ((r.flags & 8772) !== 0)
            switch (r.tag) {
              case 0:
              case 11:
              case 15:
                Nt || tl(5, r);
                break;
              case 1:
                var u = r.stateNode;
                if (r.flags & 4 && !Nt)
                  if (s === null) u.componentDidMount();
                  else {
                    var d =
                      r.elementType === r.type
                        ? s.memoizedProps
                        : gn(r.type, s.memoizedProps);
                    u.componentDidUpdate(
                      d,
                      s.memoizedState,
                      u.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                var h = r.updateQueue;
                h !== null && em(r, h, u);
                break;
              case 3:
                var g = r.updateQueue;
                if (g !== null) {
                  if (((s = null), r.child !== null))
                    switch (r.child.tag) {
                      case 5:
                        s = r.child.stateNode;
                        break;
                      case 1:
                        s = r.child.stateNode;
                    }
                  em(r, g, s);
                }
                break;
              case 5:
                var P = r.stateNode;
                if (s === null && r.flags & 4) {
                  s = P;
                  var M = r.memoizedProps;
                  switch (r.type) {
                    case 'button':
                    case 'input':
                    case 'select':
                    case 'textarea':
                      M.autoFocus && s.focus();
                      break;
                    case 'img':
                      M.src && (s.src = M.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (r.memoizedState === null) {
                  var K = r.alternate;
                  if (K !== null) {
                    var re = K.memoizedState;
                    if (re !== null) {
                      var ie = re.dehydrated;
                      ie !== null && qi(ie);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(o(163));
            }
          Nt || (r.flags & 512 && rf(r));
        } catch (ne) {
          it(r, r.return, ne);
        }
      }
      if (r === t) {
        we = null;
        break;
      }
      if (((s = r.sibling), s !== null)) {
        ((s.return = r.return), (we = s));
        break;
      }
      we = r.return;
    }
  }
  function ev(t) {
    for (; we !== null; ) {
      var r = we;
      if (r === t) {
        we = null;
        break;
      }
      var s = r.sibling;
      if (s !== null) {
        ((s.return = r.return), (we = s));
        break;
      }
      we = r.return;
    }
  }
  function tv(t) {
    for (; we !== null; ) {
      var r = we;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var s = r.return;
            try {
              tl(4, r);
            } catch (M) {
              it(r, s, M);
            }
            break;
          case 1:
            var u = r.stateNode;
            if (typeof u.componentDidMount == 'function') {
              var d = r.return;
              try {
                u.componentDidMount();
              } catch (M) {
                it(r, d, M);
              }
            }
            var h = r.return;
            try {
              rf(r);
            } catch (M) {
              it(r, h, M);
            }
            break;
          case 5:
            var g = r.return;
            try {
              rf(r);
            } catch (M) {
              it(r, g, M);
            }
        }
      } catch (M) {
        it(r, r.return, M);
      }
      if (r === t) {
        we = null;
        break;
      }
      var P = r.sibling;
      if (P !== null) {
        ((P.return = r.return), (we = P));
        break;
      }
      we = r.return;
    }
  }
  var V1 = Math.ceil,
    nl = k.ReactCurrentDispatcher,
    af = k.ReactCurrentOwner,
    on = k.ReactCurrentBatchConfig,
    ze = 0,
    gt = null,
    ft = null,
    bt = 0,
    Xt = 0,
    ni = Cr(0),
    ht = 0,
    Ss = null,
    io = 0,
    rl = 0,
    lf = 0,
    Cs = null,
    Bt = null,
    uf = 0,
    ri = 1 / 0,
    or = null,
    ol = !1,
    cf = null,
    Tr = null,
    il = !1,
    kr = null,
    sl = 0,
    _s = 0,
    ff = null,
    al = -1,
    ll = 0;
  function $t() {
    return (ze & 6) !== 0 ? lt() : al !== -1 ? al : (al = lt());
  }
  function Pr(t) {
    return (t.mode & 1) === 0
      ? 1
      : (ze & 2) !== 0 && bt !== 0
        ? bt & -bt
        : b1.transition !== null
          ? (ll === 0 && (ll = Gp()), ll)
          : ((t = Ve),
            t !== 0 ||
              ((t = window.event), (t = t === void 0 ? 16 : rh(t.type))),
            t);
  }
  function Cn(t, r, s, u) {
    if (50 < _s) throw ((_s = 0), (ff = null), Error(o(185)));
    (Ki(t, s, u),
      ((ze & 2) === 0 || t !== gt) &&
        (t === gt && ((ze & 2) === 0 && (rl |= s), ht === 4 && Nr(t, bt)),
        Ut(t, u),
        s === 1 &&
          ze === 0 &&
          (r.mode & 1) === 0 &&
          ((ri = lt() + 500), Ia && Er())));
  }
  function Ut(t, r) {
    var s = t.callbackNode;
    bS(t, r);
    var u = ya(t, t === gt ? bt : 0);
    if (u === 0)
      (s !== null && Hp(s), (t.callbackNode = null), (t.callbackPriority = 0));
    else if (((r = u & -u), t.callbackPriority !== r)) {
      if ((s != null && Hp(s), r === 1))
        (t.tag === 0 ? E1(rv.bind(null, t)) : Bh(rv.bind(null, t)),
          w1(function () {
            (ze & 6) === 0 && Er();
          }),
          (s = null));
      else {
        switch (Yp(u)) {
          case 1:
            s = Uu;
            break;
          case 4:
            s = Kp;
            break;
          case 16:
            s = pa;
            break;
          case 536870912:
            s = Qp;
            break;
          default:
            s = pa;
        }
        s = fv(s, nv.bind(null, t));
      }
      ((t.callbackPriority = r), (t.callbackNode = s));
    }
  }
  function nv(t, r) {
    if (((al = -1), (ll = 0), (ze & 6) !== 0)) throw Error(o(327));
    var s = t.callbackNode;
    if (oi() && t.callbackNode !== s) return null;
    var u = ya(t, t === gt ? bt : 0);
    if (u === 0) return null;
    if ((u & 30) !== 0 || (u & t.expiredLanes) !== 0 || r) r = ul(t, u);
    else {
      r = u;
      var d = ze;
      ze |= 2;
      var h = iv();
      (gt !== t || bt !== r) && ((or = null), (ri = lt() + 500), ao(t, r));
      do
        try {
          W1();
          break;
        } catch (P) {
          ov(t, P);
        }
      while (!0);
      (kc(),
        (nl.current = h),
        (ze = d),
        ft !== null ? (r = 0) : ((gt = null), (bt = 0), (r = ht)));
    }
    if (r !== 0) {
      if (
        (r === 2 && ((d = Wu(t)), d !== 0 && ((u = d), (r = df(t, d)))),
        r === 1)
      )
        throw ((s = Ss), ao(t, 0), Nr(t, u), Ut(t, lt()), s);
      if (r === 6) Nr(t, u);
      else {
        if (
          ((d = t.current.alternate),
          (u & 30) === 0 &&
            !B1(d) &&
            ((r = ul(t, u)),
            r === 2 && ((h = Wu(t)), h !== 0 && ((u = h), (r = df(t, h)))),
            r === 1))
        )
          throw ((s = Ss), ao(t, 0), Nr(t, u), Ut(t, lt()), s);
        switch (((t.finishedWork = d), (t.finishedLanes = u), r)) {
          case 0:
          case 1:
            throw Error(o(345));
          case 2:
            lo(t, Bt, or);
            break;
          case 3:
            if (
              (Nr(t, u),
              (u & 130023424) === u && ((r = uf + 500 - lt()), 10 < r))
            ) {
              if (ya(t, 0) !== 0) break;
              if (((d = t.suspendedLanes), (d & u) !== u)) {
                ($t(), (t.pingedLanes |= t.suspendedLanes & d));
                break;
              }
              t.timeoutHandle = yc(lo.bind(null, t, Bt, or), r);
              break;
            }
            lo(t, Bt, or);
            break;
          case 4:
            if ((Nr(t, u), (u & 4194240) === u)) break;
            for (r = t.eventTimes, d = -1; 0 < u; ) {
              var g = 31 - mn(u);
              ((h = 1 << g), (g = r[g]), g > d && (d = g), (u &= ~h));
            }
            if (
              ((u = d),
              (u = lt() - u),
              (u =
                (120 > u
                  ? 120
                  : 480 > u
                    ? 480
                    : 1080 > u
                      ? 1080
                      : 1920 > u
                        ? 1920
                        : 3e3 > u
                          ? 3e3
                          : 4320 > u
                            ? 4320
                            : 1960 * V1(u / 1960)) - u),
              10 < u)
            ) {
              t.timeoutHandle = yc(lo.bind(null, t, Bt, or), u);
              break;
            }
            lo(t, Bt, or);
            break;
          case 5:
            lo(t, Bt, or);
            break;
          default:
            throw Error(o(329));
        }
      }
    }
    return (Ut(t, lt()), t.callbackNode === s ? nv.bind(null, t) : null);
  }
  function df(t, r) {
    var s = Cs;
    return (
      t.current.memoizedState.isDehydrated && (ao(t, r).flags |= 256),
      (t = ul(t, r)),
      t !== 2 && ((r = Bt), (Bt = s), r !== null && pf(r)),
      t
    );
  }
  function pf(t) {
    Bt === null ? (Bt = t) : Bt.push.apply(Bt, t);
  }
  function B1(t) {
    for (var r = t; ; ) {
      if (r.flags & 16384) {
        var s = r.updateQueue;
        if (s !== null && ((s = s.stores), s !== null))
          for (var u = 0; u < s.length; u++) {
            var d = s[u],
              h = d.getSnapshot;
            d = d.value;
            try {
              if (!vn(h(), d)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((s = r.child), r.subtreeFlags & 16384 && s !== null))
        ((s.return = r), (r = s));
      else {
        if (r === t) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === t) return !0;
          r = r.return;
        }
        ((r.sibling.return = r.return), (r = r.sibling));
      }
    }
    return !0;
  }
  function Nr(t, r) {
    for (
      r &= ~lf,
        r &= ~rl,
        t.suspendedLanes |= r,
        t.pingedLanes &= ~r,
        t = t.expirationTimes;
      0 < r;
    ) {
      var s = 31 - mn(r),
        u = 1 << s;
      ((t[s] = -1), (r &= ~u));
    }
  }
  function rv(t) {
    if ((ze & 6) !== 0) throw Error(o(327));
    oi();
    var r = ya(t, 0);
    if ((r & 1) === 0) return (Ut(t, lt()), null);
    var s = ul(t, r);
    if (t.tag !== 0 && s === 2) {
      var u = Wu(t);
      u !== 0 && ((r = u), (s = df(t, u)));
    }
    if (s === 1) throw ((s = Ss), ao(t, 0), Nr(t, r), Ut(t, lt()), s);
    if (s === 6) throw Error(o(345));
    return (
      (t.finishedWork = t.current.alternate),
      (t.finishedLanes = r),
      lo(t, Bt, or),
      Ut(t, lt()),
      null
    );
  }
  function hf(t, r) {
    var s = ze;
    ze |= 1;
    try {
      return t(r);
    } finally {
      ((ze = s), ze === 0 && ((ri = lt() + 500), Ia && Er()));
    }
  }
  function so(t) {
    kr !== null && kr.tag === 0 && (ze & 6) === 0 && oi();
    var r = ze;
    ze |= 1;
    var s = on.transition,
      u = Ve;
    try {
      if (((on.transition = null), (Ve = 1), t)) return t();
    } finally {
      ((Ve = u), (on.transition = s), (ze = r), (ze & 6) === 0 && Er());
    }
  }
  function mf() {
    ((Xt = ni.current), Xe(ni));
  }
  function ao(t, r) {
    ((t.finishedWork = null), (t.finishedLanes = 0));
    var s = t.timeoutHandle;
    if ((s !== -1 && ((t.timeoutHandle = -1), g1(s)), ft !== null))
      for (s = ft.return; s !== null; ) {
        var u = s;
        switch ((Ec(u), u.tag)) {
          case 1:
            ((u = u.type.childContextTypes), u != null && $a());
            break;
          case 3:
            (Jo(), Xe(zt), Xe(Tt), Ic());
            break;
          case 5:
            $c(u);
            break;
          case 4:
            Jo();
            break;
          case 13:
            Xe(nt);
            break;
          case 19:
            Xe(nt);
            break;
          case 10:
            Pc(u.type._context);
            break;
          case 22:
          case 23:
            mf();
        }
        s = s.return;
      }
    if (
      ((gt = t),
      (ft = t = Lr(t.current, null)),
      (bt = Xt = r),
      (ht = 0),
      (Ss = null),
      (lf = rl = io = 0),
      (Bt = Cs = null),
      no !== null)
    ) {
      for (r = 0; r < no.length; r++)
        if (((s = no[r]), (u = s.interleaved), u !== null)) {
          s.interleaved = null;
          var d = u.next,
            h = s.pending;
          if (h !== null) {
            var g = h.next;
            ((h.next = d), (u.next = g));
          }
          s.pending = u;
        }
      no = null;
    }
    return t;
  }
  function ov(t, r) {
    do {
      var s = ft;
      try {
        if ((kc(), (Ka.current = Xa), Qa)) {
          for (var u = rt.memoizedState; u !== null; ) {
            var d = u.queue;
            (d !== null && (d.pending = null), (u = u.next));
          }
          Qa = !1;
        }
        if (
          ((oo = 0),
          (yt = pt = rt = null),
          (hs = !1),
          (ms = 0),
          (af.current = null),
          s === null || s.return === null)
        ) {
          ((ht = 1), (Ss = r), (ft = null));
          break;
        }
        e: {
          var h = t,
            g = s.return,
            P = s,
            M = r;
          if (
            ((r = bt),
            (P.flags |= 32768),
            M !== null && typeof M == 'object' && typeof M.then == 'function')
          ) {
            var K = M,
              re = P,
              ie = re.tag;
            if ((re.mode & 1) === 0 && (ie === 0 || ie === 11 || ie === 15)) {
              var ne = re.alternate;
              ne
                ? ((re.updateQueue = ne.updateQueue),
                  (re.memoizedState = ne.memoizedState),
                  (re.lanes = ne.lanes))
                : ((re.updateQueue = null), (re.memoizedState = null));
            }
            var ve = Pm(g);
            if (ve !== null) {
              ((ve.flags &= -257),
                Nm(ve, g, P, h, r),
                ve.mode & 1 && km(h, K, r),
                (r = ve),
                (M = K));
              var Se = r.updateQueue;
              if (Se === null) {
                var Ce = new Set();
                (Ce.add(M), (r.updateQueue = Ce));
              } else Se.add(M);
              break e;
            } else {
              if ((r & 1) === 0) {
                (km(h, K, r), vf());
                break e;
              }
              M = Error(o(426));
            }
          } else if (et && P.mode & 1) {
            var ut = Pm(g);
            if (ut !== null) {
              ((ut.flags & 65536) === 0 && (ut.flags |= 256),
                Nm(ut, g, P, h, r),
                xc(ei(M, P)));
              break e;
            }
          }
          ((h = M = ei(M, P)),
            ht !== 4 && (ht = 2),
            Cs === null ? (Cs = [h]) : Cs.push(h),
            (h = g));
          do {
            switch (h.tag) {
              case 3:
                ((h.flags |= 65536), (r &= -r), (h.lanes |= r));
                var z = xm(h, M, r);
                Jh(h, z);
                break e;
              case 1:
                P = M;
                var A = h.type,
                  V = h.stateNode;
                if (
                  (h.flags & 128) === 0 &&
                  (typeof A.getDerivedStateFromError == 'function' ||
                    (V !== null &&
                      typeof V.componentDidCatch == 'function' &&
                      (Tr === null || !Tr.has(V))))
                ) {
                  ((h.flags |= 65536), (r &= -r), (h.lanes |= r));
                  var ue = Tm(h, P, r);
                  Jh(h, ue);
                  break e;
                }
            }
            h = h.return;
          } while (h !== null);
        }
        av(s);
      } catch (Ee) {
        ((r = Ee), ft === s && s !== null && (ft = s = s.return));
        continue;
      }
      break;
    } while (!0);
  }
  function iv() {
    var t = nl.current;
    return ((nl.current = Xa), t === null ? Xa : t);
  }
  function vf() {
    ((ht === 0 || ht === 3 || ht === 2) && (ht = 4),
      gt === null ||
        ((io & 268435455) === 0 && (rl & 268435455) === 0) ||
        Nr(gt, bt));
  }
  function ul(t, r) {
    var s = ze;
    ze |= 2;
    var u = iv();
    (gt !== t || bt !== r) && ((or = null), ao(t, r));
    do
      try {
        U1();
        break;
      } catch (d) {
        ov(t, d);
      }
    while (!0);
    if ((kc(), (ze = s), (nl.current = u), ft !== null)) throw Error(o(261));
    return ((gt = null), (bt = 0), ht);
  }
  function U1() {
    for (; ft !== null; ) sv(ft);
  }
  function W1() {
    for (; ft !== null && !mS(); ) sv(ft);
  }
  function sv(t) {
    var r = cv(t.alternate, t, Xt);
    ((t.memoizedProps = t.pendingProps),
      r === null ? av(t) : (ft = r),
      (af.current = null));
  }
  function av(t) {
    var r = t;
    do {
      var s = r.alternate;
      if (((t = r.return), (r.flags & 32768) === 0)) {
        if (((s = I1(s, r, Xt)), s !== null)) {
          ft = s;
          return;
        }
      } else {
        if (((s = D1(s, r)), s !== null)) {
          ((s.flags &= 32767), (ft = s));
          return;
        }
        if (t !== null)
          ((t.flags |= 32768), (t.subtreeFlags = 0), (t.deletions = null));
        else {
          ((ht = 6), (ft = null));
          return;
        }
      }
      if (((r = r.sibling), r !== null)) {
        ft = r;
        return;
      }
      ft = r = t;
    } while (r !== null);
    ht === 0 && (ht = 5);
  }
  function lo(t, r, s) {
    var u = Ve,
      d = on.transition;
    try {
      ((on.transition = null), (Ve = 1), H1(t, r, s, u));
    } finally {
      ((on.transition = d), (Ve = u));
    }
    return null;
  }
  function H1(t, r, s, u) {
    do oi();
    while (kr !== null);
    if ((ze & 6) !== 0) throw Error(o(327));
    s = t.finishedWork;
    var d = t.finishedLanes;
    if (s === null) return null;
    if (((t.finishedWork = null), (t.finishedLanes = 0), s === t.current))
      throw Error(o(177));
    ((t.callbackNode = null), (t.callbackPriority = 0));
    var h = s.lanes | s.childLanes;
    if (
      (RS(t, h),
      t === gt && ((ft = gt = null), (bt = 0)),
      ((s.subtreeFlags & 2064) === 0 && (s.flags & 2064) === 0) ||
        il ||
        ((il = !0),
        fv(pa, function () {
          return (oi(), null);
        })),
      (h = (s.flags & 15990) !== 0),
      (s.subtreeFlags & 15990) !== 0 || h)
    ) {
      ((h = on.transition), (on.transition = null));
      var g = Ve;
      Ve = 1;
      var P = ze;
      ((ze |= 4),
        (af.current = null),
        z1(t, s),
        qm(s, t),
        f1(mc),
        (Sa = !!hc),
        (mc = hc = null),
        (t.current = s),
        j1(s),
        vS(),
        (ze = P),
        (Ve = g),
        (on.transition = h));
    } else t.current = s;
    if (
      (il && ((il = !1), (kr = t), (sl = d)),
      (h = t.pendingLanes),
      h === 0 && (Tr = null),
      wS(s.stateNode),
      Ut(t, lt()),
      r !== null)
    )
      for (u = t.onRecoverableError, s = 0; s < r.length; s++)
        ((d = r[s]), u(d.value, { componentStack: d.stack, digest: d.digest }));
    if (ol) throw ((ol = !1), (t = cf), (cf = null), t);
    return (
      (sl & 1) !== 0 && t.tag !== 0 && oi(),
      (h = t.pendingLanes),
      (h & 1) !== 0 ? (t === ff ? _s++ : ((_s = 0), (ff = t))) : (_s = 0),
      Er(),
      null
    );
  }
  function oi() {
    if (kr !== null) {
      var t = Yp(sl),
        r = on.transition,
        s = Ve;
      try {
        if (((on.transition = null), (Ve = 16 > t ? 16 : t), kr === null))
          var u = !1;
        else {
          if (((t = kr), (kr = null), (sl = 0), (ze & 6) !== 0))
            throw Error(o(331));
          var d = ze;
          for (ze |= 4, we = t.current; we !== null; ) {
            var h = we,
              g = h.child;
            if ((we.flags & 16) !== 0) {
              var P = h.deletions;
              if (P !== null) {
                for (var M = 0; M < P.length; M++) {
                  var K = P[M];
                  for (we = K; we !== null; ) {
                    var re = we;
                    switch (re.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ws(8, re, h);
                    }
                    var ie = re.child;
                    if (ie !== null) ((ie.return = re), (we = ie));
                    else
                      for (; we !== null; ) {
                        re = we;
                        var ne = re.sibling,
                          ve = re.return;
                        if ((Km(re), re === K)) {
                          we = null;
                          break;
                        }
                        if (ne !== null) {
                          ((ne.return = ve), (we = ne));
                          break;
                        }
                        we = ve;
                      }
                  }
                }
                var Se = h.alternate;
                if (Se !== null) {
                  var Ce = Se.child;
                  if (Ce !== null) {
                    Se.child = null;
                    do {
                      var ut = Ce.sibling;
                      ((Ce.sibling = null), (Ce = ut));
                    } while (Ce !== null);
                  }
                }
                we = h;
              }
            }
            if ((h.subtreeFlags & 2064) !== 0 && g !== null)
              ((g.return = h), (we = g));
            else
              e: for (; we !== null; ) {
                if (((h = we), (h.flags & 2048) !== 0))
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ws(9, h, h.return);
                  }
                var z = h.sibling;
                if (z !== null) {
                  ((z.return = h.return), (we = z));
                  break e;
                }
                we = h.return;
              }
          }
          var A = t.current;
          for (we = A; we !== null; ) {
            g = we;
            var V = g.child;
            if ((g.subtreeFlags & 2064) !== 0 && V !== null)
              ((V.return = g), (we = V));
            else
              e: for (g = A; we !== null; ) {
                if (((P = we), (P.flags & 2048) !== 0))
                  try {
                    switch (P.tag) {
                      case 0:
                      case 11:
                      case 15:
                        tl(9, P);
                    }
                  } catch (Ee) {
                    it(P, P.return, Ee);
                  }
                if (P === g) {
                  we = null;
                  break e;
                }
                var ue = P.sibling;
                if (ue !== null) {
                  ((ue.return = P.return), (we = ue));
                  break e;
                }
                we = P.return;
              }
          }
          if (
            ((ze = d),
            Er(),
            $n && typeof $n.onPostCommitFiberRoot == 'function')
          )
            try {
              $n.onPostCommitFiberRoot(ha, t);
            } catch {}
          u = !0;
        }
        return u;
      } finally {
        ((Ve = s), (on.transition = r));
      }
    }
    return !1;
  }
  function lv(t, r, s) {
    ((r = ei(s, r)),
      (r = xm(t, r, 1)),
      (t = Rr(t, r, 1)),
      (r = $t()),
      t !== null && (Ki(t, 1, r), Ut(t, r)));
  }
  function it(t, r, s) {
    if (t.tag === 3) lv(t, t, s);
    else
      for (; r !== null; ) {
        if (r.tag === 3) {
          lv(r, t, s);
          break;
        } else if (r.tag === 1) {
          var u = r.stateNode;
          if (
            typeof r.type.getDerivedStateFromError == 'function' ||
            (typeof u.componentDidCatch == 'function' &&
              (Tr === null || !Tr.has(u)))
          ) {
            ((t = ei(s, t)),
              (t = Tm(r, t, 1)),
              (r = Rr(r, t, 1)),
              (t = $t()),
              r !== null && (Ki(r, 1, t), Ut(r, t)));
            break;
          }
        }
        r = r.return;
      }
  }
  function K1(t, r, s) {
    var u = t.pingCache;
    (u !== null && u.delete(r),
      (r = $t()),
      (t.pingedLanes |= t.suspendedLanes & s),
      gt === t &&
        (bt & s) === s &&
        (ht === 4 || (ht === 3 && (bt & 130023424) === bt && 500 > lt() - uf)
          ? ao(t, 0)
          : (lf |= s)),
      Ut(t, r));
  }
  function uv(t, r) {
    r === 0 &&
      ((t.mode & 1) === 0
        ? (r = 1)
        : ((r = va), (va <<= 1), (va & 130023424) === 0 && (va = 4194304)));
    var s = $t();
    ((t = tr(t, r)), t !== null && (Ki(t, r, s), Ut(t, s)));
  }
  function Q1(t) {
    var r = t.memoizedState,
      s = 0;
    (r !== null && (s = r.retryLane), uv(t, s));
  }
  function G1(t, r) {
    var s = 0;
    switch (t.tag) {
      case 13:
        var u = t.stateNode,
          d = t.memoizedState;
        d !== null && (s = d.retryLane);
        break;
      case 19:
        u = t.stateNode;
        break;
      default:
        throw Error(o(314));
    }
    (u !== null && u.delete(r), uv(t, s));
  }
  var cv;
  cv = function (t, r, s) {
    if (t !== null)
      if (t.memoizedProps !== r.pendingProps || zt.current) Vt = !0;
      else {
        if ((t.lanes & s) === 0 && (r.flags & 128) === 0)
          return ((Vt = !1), O1(t, r, s));
        Vt = (t.flags & 131072) !== 0;
      }
    else ((Vt = !1), et && (r.flags & 1048576) !== 0 && Uh(r, Fa, r.index));
    switch (((r.lanes = 0), r.tag)) {
      case 2:
        var u = r.type;
        (Ja(t, r), (t = r.pendingProps));
        var d = Ko(r, Tt.current);
        (Zo(r, s), (d = zc(null, r, u, t, d, s)));
        var h = jc();
        return (
          (r.flags |= 1),
          typeof d == 'object' &&
          d !== null &&
          typeof d.render == 'function' &&
          d.$$typeof === void 0
            ? ((r.tag = 1),
              (r.memoizedState = null),
              (r.updateQueue = null),
              jt(u) ? ((h = !0), Oa(r)) : (h = !1),
              (r.memoizedState =
                d.state !== null && d.state !== void 0 ? d.state : null),
              Mc(r),
              (d.updater = qa),
              (r.stateNode = d),
              (d._reactInternals = r),
              Kc(r, u, t, s),
              (r = Xc(null, r, u, !0, h, s)))
            : ((r.tag = 0), et && h && _c(r), At(null, r, d, s), (r = r.child)),
          r
        );
      case 16:
        u = r.elementType;
        e: {
          switch (
            (Ja(t, r),
            (t = r.pendingProps),
            (d = u._init),
            (u = d(u._payload)),
            (r.type = u),
            (d = r.tag = X1(u)),
            (t = gn(u, t)),
            d)
          ) {
            case 0:
              r = Yc(null, r, u, t, s);
              break e;
            case 1:
              r = Im(null, r, u, t, s);
              break e;
            case 11:
              r = Lm(null, r, u, t, s);
              break e;
            case 14:
              r = Mm(null, r, u, gn(u.type, t), s);
              break e;
          }
          throw Error(o(306, u, ''));
        }
        return r;
      case 0:
        return (
          (u = r.type),
          (d = r.pendingProps),
          (d = r.elementType === u ? d : gn(u, d)),
          Yc(t, r, u, d, s)
        );
      case 1:
        return (
          (u = r.type),
          (d = r.pendingProps),
          (d = r.elementType === u ? d : gn(u, d)),
          Im(t, r, u, d, s)
        );
      case 3:
        e: {
          if ((Dm(r), t === null)) throw Error(o(387));
          ((u = r.pendingProps),
            (h = r.memoizedState),
            (d = h.element),
            Zh(t, r),
            Wa(r, u, null, s));
          var g = r.memoizedState;
          if (((u = g.element), h.isDehydrated))
            if (
              ((h = {
                element: u,
                isDehydrated: !1,
                cache: g.cache,
                pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
                transitions: g.transitions
              }),
              (r.updateQueue.baseState = h),
              (r.memoizedState = h),
              r.flags & 256)
            ) {
              ((d = ei(Error(o(423)), r)), (r = Fm(t, r, u, s, d)));
              break e;
            } else if (u !== d) {
              ((d = ei(Error(o(424)), r)), (r = Fm(t, r, u, s, d)));
              break e;
            } else
              for (
                Yt = Sr(r.stateNode.containerInfo.firstChild),
                  Gt = r,
                  et = !0,
                  yn = null,
                  s = Xh(r, null, u, s),
                  r.child = s;
                s;
              )
                ((s.flags = (s.flags & -3) | 4096), (s = s.sibling));
          else {
            if ((Yo(), u === d)) {
              r = rr(t, r, s);
              break e;
            }
            At(t, r, u, s);
          }
          r = r.child;
        }
        return r;
      case 5:
        return (
          tm(r),
          t === null && Rc(r),
          (u = r.type),
          (d = r.pendingProps),
          (h = t !== null ? t.memoizedProps : null),
          (g = d.children),
          vc(u, d) ? (g = null) : h !== null && vc(u, h) && (r.flags |= 32),
          Om(t, r),
          At(t, r, g, s),
          r.child
        );
      case 6:
        return (t === null && Rc(r), null);
      case 13:
        return zm(t, r, s);
      case 4:
        return (
          Ac(r, r.stateNode.containerInfo),
          (u = r.pendingProps),
          t === null ? (r.child = Xo(r, null, u, s)) : At(t, r, u, s),
          r.child
        );
      case 11:
        return (
          (u = r.type),
          (d = r.pendingProps),
          (d = r.elementType === u ? d : gn(u, d)),
          Lm(t, r, u, d, s)
        );
      case 7:
        return (At(t, r, r.pendingProps, s), r.child);
      case 8:
        return (At(t, r, r.pendingProps.children, s), r.child);
      case 12:
        return (At(t, r, r.pendingProps.children, s), r.child);
      case 10:
        e: {
          if (
            ((u = r.type._context),
            (d = r.pendingProps),
            (h = r.memoizedProps),
            (g = d.value),
            Ke(Va, u._currentValue),
            (u._currentValue = g),
            h !== null)
          )
            if (vn(h.value, g)) {
              if (h.children === d.children && !zt.current) {
                r = rr(t, r, s);
                break e;
              }
            } else
              for (h = r.child, h !== null && (h.return = r); h !== null; ) {
                var P = h.dependencies;
                if (P !== null) {
                  g = h.child;
                  for (var M = P.firstContext; M !== null; ) {
                    if (M.context === u) {
                      if (h.tag === 1) {
                        ((M = nr(-1, s & -s)), (M.tag = 2));
                        var K = h.updateQueue;
                        if (K !== null) {
                          K = K.shared;
                          var re = K.pending;
                          (re === null
                            ? (M.next = M)
                            : ((M.next = re.next), (re.next = M)),
                            (K.pending = M));
                        }
                      }
                      ((h.lanes |= s),
                        (M = h.alternate),
                        M !== null && (M.lanes |= s),
                        Nc(h.return, s, r),
                        (P.lanes |= s));
                      break;
                    }
                    M = M.next;
                  }
                } else if (h.tag === 10) g = h.type === r.type ? null : h.child;
                else if (h.tag === 18) {
                  if (((g = h.return), g === null)) throw Error(o(341));
                  ((g.lanes |= s),
                    (P = g.alternate),
                    P !== null && (P.lanes |= s),
                    Nc(g, s, r),
                    (g = h.sibling));
                } else g = h.child;
                if (g !== null) g.return = h;
                else
                  for (g = h; g !== null; ) {
                    if (g === r) {
                      g = null;
                      break;
                    }
                    if (((h = g.sibling), h !== null)) {
                      ((h.return = g.return), (g = h));
                      break;
                    }
                    g = g.return;
                  }
                h = g;
              }
          (At(t, r, d.children, s), (r = r.child));
        }
        return r;
      case 9:
        return (
          (d = r.type),
          (u = r.pendingProps.children),
          Zo(r, s),
          (d = nn(d)),
          (u = u(d)),
          (r.flags |= 1),
          At(t, r, u, s),
          r.child
        );
      case 14:
        return (
          (u = r.type),
          (d = gn(u, r.pendingProps)),
          (d = gn(u.type, d)),
          Mm(t, r, u, d, s)
        );
      case 15:
        return Am(t, r, r.type, r.pendingProps, s);
      case 17:
        return (
          (u = r.type),
          (d = r.pendingProps),
          (d = r.elementType === u ? d : gn(u, d)),
          Ja(t, r),
          (r.tag = 1),
          jt(u) ? ((t = !0), Oa(r)) : (t = !1),
          Zo(r, s),
          bm(r, u, d),
          Kc(r, u, d, s),
          Xc(null, r, u, !0, t, s)
        );
      case 19:
        return Vm(t, r, s);
      case 22:
        return $m(t, r, s);
    }
    throw Error(o(156, r.tag));
  };
  function fv(t, r) {
    return Wp(t, r);
  }
  function Y1(t, r, s, u) {
    ((this.tag = t),
      (this.key = s),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = r),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = u),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function sn(t, r, s, u) {
    return new Y1(t, r, s, u);
  }
  function yf(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function X1(t) {
    if (typeof t == 'function') return yf(t) ? 1 : 0;
    if (t != null) {
      if (((t = t.$$typeof), t === ye)) return 11;
      if (t === me) return 14;
    }
    return 2;
  }
  function Lr(t, r) {
    var s = t.alternate;
    return (
      s === null
        ? ((s = sn(t.tag, r, t.key, t.mode)),
          (s.elementType = t.elementType),
          (s.type = t.type),
          (s.stateNode = t.stateNode),
          (s.alternate = t),
          (t.alternate = s))
        : ((s.pendingProps = r),
          (s.type = t.type),
          (s.flags = 0),
          (s.subtreeFlags = 0),
          (s.deletions = null)),
      (s.flags = t.flags & 14680064),
      (s.childLanes = t.childLanes),
      (s.lanes = t.lanes),
      (s.child = t.child),
      (s.memoizedProps = t.memoizedProps),
      (s.memoizedState = t.memoizedState),
      (s.updateQueue = t.updateQueue),
      (r = t.dependencies),
      (s.dependencies =
        r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }),
      (s.sibling = t.sibling),
      (s.index = t.index),
      (s.ref = t.ref),
      s
    );
  }
  function cl(t, r, s, u, d, h) {
    var g = 2;
    if (((u = t), typeof t == 'function')) yf(t) && (g = 1);
    else if (typeof t == 'string') g = 5;
    else
      e: switch (t) {
        case H:
          return uo(s.children, d, h, r);
        case F:
          ((g = 8), (d |= 8));
          break;
        case G:
          return (
            (t = sn(12, s, r, d | 2)),
            (t.elementType = G),
            (t.lanes = h),
            t
          );
        case le:
          return (
            (t = sn(13, s, r, d)),
            (t.elementType = le),
            (t.lanes = h),
            t
          );
        case Z:
          return ((t = sn(19, s, r, d)), (t.elementType = Z), (t.lanes = h), t);
        case ee:
          return fl(s, d, h, r);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case q:
                g = 10;
                break e;
              case ce:
                g = 9;
                break e;
              case ye:
                g = 11;
                break e;
              case me:
                g = 14;
                break e;
              case fe:
                ((g = 16), (u = null));
                break e;
            }
          throw Error(o(130, t == null ? t : typeof t, ''));
      }
    return (
      (r = sn(g, s, r, d)),
      (r.elementType = t),
      (r.type = u),
      (r.lanes = h),
      r
    );
  }
  function uo(t, r, s, u) {
    return ((t = sn(7, t, u, r)), (t.lanes = s), t);
  }
  function fl(t, r, s, u) {
    return (
      (t = sn(22, t, u, r)),
      (t.elementType = ee),
      (t.lanes = s),
      (t.stateNode = { isHidden: !1 }),
      t
    );
  }
  function gf(t, r, s) {
    return ((t = sn(6, t, null, r)), (t.lanes = s), t);
  }
  function wf(t, r, s) {
    return (
      (r = sn(4, t.children !== null ? t.children : [], t.key, r)),
      (r.lanes = s),
      (r.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation
      }),
      r
    );
  }
  function q1(t, r, s, u, d) {
    ((this.tag = r),
      (this.containerInfo = t),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Hu(0)),
      (this.expirationTimes = Hu(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Hu(0)),
      (this.identifierPrefix = u),
      (this.onRecoverableError = d),
      (this.mutableSourceEagerHydrationData = null));
  }
  function Sf(t, r, s, u, d, h, g, P, M) {
    return (
      (t = new q1(t, r, s, P, M)),
      r === 1 ? ((r = 1), h === !0 && (r |= 8)) : (r = 0),
      (h = sn(3, null, null, r)),
      (t.current = h),
      (h.stateNode = t),
      (h.memoizedState = {
        element: u,
        isDehydrated: s,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
      }),
      Mc(h),
      t
    );
  }
  function Z1(t, r, s) {
    var u =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: W,
      key: u == null ? null : '' + u,
      children: t,
      containerInfo: r,
      implementation: s
    };
  }
  function dv(t) {
    if (!t) return _r;
    t = t._reactInternals;
    e: {
      if (qr(t) !== t || t.tag !== 1) throw Error(o(170));
      var r = t;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (jt(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(o(171));
    }
    if (t.tag === 1) {
      var s = t.type;
      if (jt(s)) return jh(t, s, r);
    }
    return r;
  }
  function pv(t, r, s, u, d, h, g, P, M) {
    return (
      (t = Sf(s, u, !0, t, d, h, g, P, M)),
      (t.context = dv(null)),
      (s = t.current),
      (u = $t()),
      (d = Pr(s)),
      (h = nr(u, d)),
      (h.callback = r ?? null),
      Rr(s, h, d),
      (t.current.lanes = d),
      Ki(t, d, u),
      Ut(t, u),
      t
    );
  }
  function dl(t, r, s, u) {
    var d = r.current,
      h = $t(),
      g = Pr(d);
    return (
      (s = dv(s)),
      r.context === null ? (r.context = s) : (r.pendingContext = s),
      (r = nr(h, g)),
      (r.payload = { element: t }),
      (u = u === void 0 ? null : u),
      u !== null && (r.callback = u),
      (t = Rr(d, r, g)),
      t !== null && (Cn(t, d, g, h), Ua(t, d, g)),
      g
    );
  }
  function pl(t) {
    if (((t = t.current), !t.child)) return null;
    switch (t.child.tag) {
      case 5:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function hv(t, r) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var s = t.retryLane;
      t.retryLane = s !== 0 && s < r ? s : r;
    }
  }
  function Cf(t, r) {
    (hv(t, r), (t = t.alternate) && hv(t, r));
  }
  function J1() {
    return null;
  }
  var mv =
    typeof reportError == 'function'
      ? reportError
      : function (t) {
          console.error(t);
        };
  function _f(t) {
    this._internalRoot = t;
  }
  ((hl.prototype.render = _f.prototype.render =
    function (t) {
      var r = this._internalRoot;
      if (r === null) throw Error(o(409));
      dl(t, r, null, null);
    }),
    (hl.prototype.unmount = _f.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var r = t.containerInfo;
          (so(function () {
            dl(null, t, null, null);
          }),
            (r[qn] = null));
        }
      }));
  function hl(t) {
    this._internalRoot = t;
  }
  hl.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var r = Zp();
      t = { blockedOn: null, target: t, priority: r };
      for (var s = 0; s < yr.length && r !== 0 && r < yr[s].priority; s++);
      (yr.splice(s, 0, t), s === 0 && th(t));
    }
  };
  function Ef(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function ml(t) {
    return !(
      !t ||
      (t.nodeType !== 1 &&
        t.nodeType !== 9 &&
        t.nodeType !== 11 &&
        (t.nodeType !== 8 || t.nodeValue !== ' react-mount-point-unstable '))
    );
  }
  function vv() {}
  function eC(t, r, s, u, d) {
    if (d) {
      if (typeof u == 'function') {
        var h = u;
        u = function () {
          var K = pl(g);
          h.call(K);
        };
      }
      var g = pv(r, u, t, 0, null, !1, !1, '', vv);
      return (
        (t._reactRootContainer = g),
        (t[qn] = g.current),
        ss(t.nodeType === 8 ? t.parentNode : t),
        so(),
        g
      );
    }
    for (; (d = t.lastChild); ) t.removeChild(d);
    if (typeof u == 'function') {
      var P = u;
      u = function () {
        var K = pl(M);
        P.call(K);
      };
    }
    var M = Sf(t, 0, !1, null, null, !1, !1, '', vv);
    return (
      (t._reactRootContainer = M),
      (t[qn] = M.current),
      ss(t.nodeType === 8 ? t.parentNode : t),
      so(function () {
        dl(r, M, s, u);
      }),
      M
    );
  }
  function vl(t, r, s, u, d) {
    var h = s._reactRootContainer;
    if (h) {
      var g = h;
      if (typeof d == 'function') {
        var P = d;
        d = function () {
          var M = pl(g);
          P.call(M);
        };
      }
      dl(r, g, t, d);
    } else g = eC(s, r, t, d, u);
    return pl(g);
  }
  ((Xp = function (t) {
    switch (t.tag) {
      case 3:
        var r = t.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var s = Hi(r.pendingLanes);
          s !== 0 &&
            (Ku(r, s | 1),
            Ut(r, lt()),
            (ze & 6) === 0 && ((ri = lt() + 500), Er()));
        }
        break;
      case 13:
        (so(function () {
          var u = tr(t, 1);
          if (u !== null) {
            var d = $t();
            Cn(u, t, 1, d);
          }
        }),
          Cf(t, 1));
    }
  }),
    (Qu = function (t) {
      if (t.tag === 13) {
        var r = tr(t, 134217728);
        if (r !== null) {
          var s = $t();
          Cn(r, t, 134217728, s);
        }
        Cf(t, 134217728);
      }
    }),
    (qp = function (t) {
      if (t.tag === 13) {
        var r = Pr(t),
          s = tr(t, r);
        if (s !== null) {
          var u = $t();
          Cn(s, t, r, u);
        }
        Cf(t, r);
      }
    }),
    (Zp = function () {
      return Ve;
    }),
    (Jp = function (t, r) {
      var s = Ve;
      try {
        return ((Ve = t), r());
      } finally {
        Ve = s;
      }
    }),
    (ge = function (t, r, s) {
      switch (r) {
        case 'input':
          if ((Mn(t, s), (r = s.name), s.type === 'radio' && r != null)) {
            for (s = t; s.parentNode; ) s = s.parentNode;
            for (
              s = s.querySelectorAll(
                'input[name=' + JSON.stringify('' + r) + '][type="radio"]'
              ),
                r = 0;
              r < s.length;
              r++
            ) {
              var u = s[r];
              if (u !== t && u.form === t.form) {
                var d = Aa(u);
                if (!d) throw Error(o(90));
                (Ie(u), Mn(u, d));
              }
            }
          }
          break;
        case 'textarea':
          $o(t, s);
          break;
        case 'select':
          ((r = s.value), r != null && An(t, !!s.multiple, r, !1));
      }
    }),
    (_t = hf),
    (at = so));
  var tC = { usingClientEntryPoint: !1, Events: [us, Wo, Aa, $e, He, hf] },
    Es = {
      findFiberByHostInstance: Zr,
      bundleType: 0,
      version: '18.3.1',
      rendererPackageName: 'react-dom'
    },
    nC = {
      bundleType: Es.bundleType,
      version: Es.version,
      rendererPackageName: Es.rendererPackageName,
      rendererConfig: Es.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: k.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (t) {
        return ((t = Bp(t)), t === null ? null : t.stateNode);
      },
      findFiberByHostInstance: Es.findFiberByHostInstance || J1,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: '18.3.1-next-f1338f8080-20240426'
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var yl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!yl.isDisabled && yl.supportsFiber)
      try {
        ((ha = yl.inject(nC)), ($n = yl));
      } catch {}
  }
  return (
    (Wt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tC),
    (Wt.createPortal = function (t, r) {
      var s =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Ef(r)) throw Error(o(200));
      return Z1(t, r, null, s);
    }),
    (Wt.createRoot = function (t, r) {
      if (!Ef(t)) throw Error(o(299));
      var s = !1,
        u = '',
        d = mv;
      return (
        r != null &&
          (r.unstable_strictMode === !0 && (s = !0),
          r.identifierPrefix !== void 0 && (u = r.identifierPrefix),
          r.onRecoverableError !== void 0 && (d = r.onRecoverableError)),
        (r = Sf(t, 1, !1, null, null, s, !1, u, d)),
        (t[qn] = r.current),
        ss(t.nodeType === 8 ? t.parentNode : t),
        new _f(r)
      );
    }),
    (Wt.findDOMNode = function (t) {
      if (t == null) return null;
      if (t.nodeType === 1) return t;
      var r = t._reactInternals;
      if (r === void 0)
        throw typeof t.render == 'function'
          ? Error(o(188))
          : ((t = Object.keys(t).join(',')), Error(o(268, t)));
      return ((t = Bp(r)), (t = t === null ? null : t.stateNode), t);
    }),
    (Wt.flushSync = function (t) {
      return so(t);
    }),
    (Wt.hydrate = function (t, r, s) {
      if (!ml(r)) throw Error(o(200));
      return vl(null, t, r, !0, s);
    }),
    (Wt.hydrateRoot = function (t, r, s) {
      if (!Ef(t)) throw Error(o(405));
      var u = (s != null && s.hydratedSources) || null,
        d = !1,
        h = '',
        g = mv;
      if (
        (s != null &&
          (s.unstable_strictMode === !0 && (d = !0),
          s.identifierPrefix !== void 0 && (h = s.identifierPrefix),
          s.onRecoverableError !== void 0 && (g = s.onRecoverableError)),
        (r = pv(r, null, t, 1, s ?? null, d, !1, h, g)),
        (t[qn] = r.current),
        ss(t),
        u)
      )
        for (t = 0; t < u.length; t++)
          ((s = u[t]),
            (d = s._getVersion),
            (d = d(s._source)),
            r.mutableSourceEagerHydrationData == null
              ? (r.mutableSourceEagerHydrationData = [s, d])
              : r.mutableSourceEagerHydrationData.push(s, d));
      return new hl(r);
    }),
    (Wt.render = function (t, r, s) {
      if (!ml(r)) throw Error(o(200));
      return vl(null, t, r, !1, s);
    }),
    (Wt.unmountComponentAtNode = function (t) {
      if (!ml(t)) throw Error(o(40));
      return t._reactRootContainer
        ? (so(function () {
            vl(null, null, t, !1, function () {
              ((t._reactRootContainer = null), (t[qn] = null));
            });
          }),
          !0)
        : !1;
    }),
    (Wt.unstable_batchedUpdates = hf),
    (Wt.unstable_renderSubtreeIntoContainer = function (t, r, s, u) {
      if (!ml(s)) throw Error(o(200));
      if (t == null || t._reactInternals === void 0) throw Error(o(38));
      return vl(t, r, s, !1, u);
    }),
    (Wt.version = '18.3.1-next-f1338f8080-20240426'),
    Wt
  );
}
var Rv;
function ug() {
  if (Rv) return Tf.exports;
  Rv = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  return (e(), (Tf.exports = cC()), Tf.exports);
}
var xv;
function fC() {
  if (xv) return wl;
  xv = 1;
  var e = ug();
  return ((wl.createRoot = e.createRoot), (wl.hydrateRoot = e.hydrateRoot), wl);
}
var dC = fC();
const pC = 'modulepreload',
  hC = function (e) {
    return '/' + e;
  },
  Tv = {},
  Gs = function (n, o, i) {
    let a = Promise.resolve();
    if (o && o.length > 0) {
      let c = function (m) {
        return Promise.all(
          m.map(v =>
            Promise.resolve(v).then(
              y => ({ status: 'fulfilled', value: y }),
              y => ({ status: 'rejected', reason: y })
            )
          )
        );
      };
      document.getElementsByTagName('link');
      const f = document.querySelector('meta[property=csp-nonce]'),
        p =
          (f == null ? void 0 : f.nonce) ||
          (f == null ? void 0 : f.getAttribute('nonce'));
      a = c(
        o.map(m => {
          if (((m = hC(m)), m in Tv)) return;
          Tv[m] = !0;
          const v = m.endsWith('.css'),
            y = v ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${m}"]${y}`)) return;
          const C = document.createElement('link');
          if (
            ((C.rel = v ? 'stylesheet' : pC),
            v || (C.as = 'script'),
            (C.crossOrigin = ''),
            (C.href = m),
            p && C.setAttribute('nonce', p),
            document.head.appendChild(C),
            v)
          )
            return new Promise((S, E) => {
              (C.addEventListener('load', S),
                C.addEventListener('error', () =>
                  E(new Error(`Unable to preload CSS for ${m}`))
                ));
            });
        })
      );
    }
    function l(c) {
      const f = new Event('vite:preloadError', { cancelable: !0 });
      if (((f.payload = c), window.dispatchEvent(f), !f.defaultPrevented))
        throw c;
    }
    return a.then(c => {
      for (const f of c || []) f.status === 'rejected' && l(f.reason);
      return n().catch(l);
    });
  };
var zd = ug();
const cg = lg(zd);
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Os() {
  return (
    (Os = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var o = arguments[n];
            for (var i in o)
              Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i]);
          }
          return e;
        }),
    Os.apply(this, arguments)
  );
}
var Vr;
(function (e) {
  ((e.Pop = 'POP'), (e.Push = 'PUSH'), (e.Replace = 'REPLACE'));
})(Vr || (Vr = {}));
const kv = 'popstate';
function mC(e) {
  e === void 0 && (e = {});
  function n(i, a) {
    let { pathname: l, search: c, hash: f } = i.location;
    return od(
      '',
      { pathname: l, search: c, hash: f },
      (a.state && a.state.usr) || null,
      (a.state && a.state.key) || 'default'
    );
  }
  function o(i, a) {
    return typeof a == 'string' ? a : Ul(a);
  }
  return yC(n, o, null, e);
}
function ot(e, n) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(n);
}
function jd(e, n) {
  if (!e) {
    typeof console < 'u' && console.warn(n);
    try {
      throw new Error(n);
    } catch {}
  }
}
function vC() {
  return Math.random().toString(36).substr(2, 8);
}
function Pv(e, n) {
  return { usr: e.state, key: e.key, idx: n };
}
function od(e, n, o, i) {
  return (
    o === void 0 && (o = null),
    Os(
      { pathname: typeof e == 'string' ? e : e.pathname, search: '', hash: '' },
      typeof n == 'string' ? Mi(n) : n,
      { state: o, key: (n && n.key) || i || vC() }
    )
  );
}
function Ul(e) {
  let { pathname: n = '/', search: o = '', hash: i = '' } = e;
  return (
    o && o !== '?' && (n += o.charAt(0) === '?' ? o : '?' + o),
    i && i !== '#' && (n += i.charAt(0) === '#' ? i : '#' + i),
    n
  );
}
function Mi(e) {
  let n = {};
  if (e) {
    let o = e.indexOf('#');
    o >= 0 && ((n.hash = e.substr(o)), (e = e.substr(0, o)));
    let i = e.indexOf('?');
    (i >= 0 && ((n.search = e.substr(i)), (e = e.substr(0, i))),
      e && (n.pathname = e));
  }
  return n;
}
function yC(e, n, o, i) {
  i === void 0 && (i = {});
  let { window: a = document.defaultView, v5Compat: l = !1 } = i,
    c = a.history,
    f = Vr.Pop,
    p = null,
    m = v();
  m == null && ((m = 0), c.replaceState(Os({}, c.state, { idx: m }), ''));
  function v() {
    return (c.state || { idx: null }).idx;
  }
  function y() {
    f = Vr.Pop;
    let b = v(),
      N = b == null ? null : b - m;
    ((m = b), p && p({ action: f, location: _.location, delta: N }));
  }
  function C(b, N) {
    f = Vr.Push;
    let R = od(_.location, b, N);
    m = v() + 1;
    let T = Pv(R, m),
      k = _.createHref(R);
    try {
      c.pushState(T, '', k);
    } catch ($) {
      if ($ instanceof DOMException && $.name === 'DataCloneError') throw $;
      a.location.assign(k);
    }
    l && p && p({ action: f, location: _.location, delta: 1 });
  }
  function S(b, N) {
    f = Vr.Replace;
    let R = od(_.location, b, N);
    m = v();
    let T = Pv(R, m),
      k = _.createHref(R);
    (c.replaceState(T, '', k),
      l && p && p({ action: f, location: _.location, delta: 0 }));
  }
  function E(b) {
    let N = a.location.origin !== 'null' ? a.location.origin : a.location.href,
      R = typeof b == 'string' ? b : Ul(b);
    return (
      (R = R.replace(/ $/, '%20')),
      ot(
        N,
        'No window.location.(origin|href) available to create URL for href: ' +
          R
      ),
      new URL(R, N)
    );
  }
  let _ = {
    get action() {
      return f;
    },
    get location() {
      return e(a, c);
    },
    listen(b) {
      if (p) throw new Error('A history only accepts one active listener');
      return (
        a.addEventListener(kv, y),
        (p = b),
        () => {
          (a.removeEventListener(kv, y), (p = null));
        }
      );
    },
    createHref(b) {
      return n(a, b);
    },
    createURL: E,
    encodeLocation(b) {
      let N = E(b);
      return { pathname: N.pathname, search: N.search, hash: N.hash };
    },
    push: C,
    replace: S,
    go(b) {
      return c.go(b);
    }
  };
  return _;
}
var Nv;
(function (e) {
  ((e.data = 'data'),
    (e.deferred = 'deferred'),
    (e.redirect = 'redirect'),
    (e.error = 'error'));
})(Nv || (Nv = {}));
function gC(e, n, o) {
  return (o === void 0 && (o = '/'), wC(e, n, o));
}
function wC(e, n, o, i) {
  let a = typeof n == 'string' ? Mi(n) : n,
    l = Ri(a.pathname || '/', o);
  if (l == null) return null;
  let c = fg(e);
  SC(c);
  let f = null;
  for (let p = 0; f == null && p < c.length; ++p) {
    let m = LC(l);
    f = PC(c[p], m);
  }
  return f;
}
function fg(e, n, o, i) {
  (n === void 0 && (n = []),
    o === void 0 && (o = []),
    i === void 0 && (i = ''));
  let a = (l, c, f) => {
    let p = {
      relativePath: f === void 0 ? l.path || '' : f,
      caseSensitive: l.caseSensitive === !0,
      childrenIndex: c,
      route: l
    };
    p.relativePath.startsWith('/') &&
      (ot(
        p.relativePath.startsWith(i),
        'Absolute route path "' +
          p.relativePath +
          '" nested under path ' +
          ('"' + i + '" is not valid. An absolute child route path ') +
          'must start with the combined path of all its parent routes.'
      ),
      (p.relativePath = p.relativePath.slice(i.length)));
    let m = Ur([i, p.relativePath]),
      v = o.concat(p);
    (l.children &&
      l.children.length > 0 &&
      (ot(
        l.index !== !0,
        'Index routes must not have child routes. Please remove ' +
          ('all child routes from route path "' + m + '".')
      ),
      fg(l.children, n, v, m)),
      !(l.path == null && !l.index) &&
        n.push({ path: m, score: TC(m, l.index), routesMeta: v }));
  };
  return (
    e.forEach((l, c) => {
      var f;
      if (l.path === '' || !((f = l.path) != null && f.includes('?'))) a(l, c);
      else for (let p of dg(l.path)) a(l, c, p);
    }),
    n
  );
}
function dg(e) {
  let n = e.split('/');
  if (n.length === 0) return [];
  let [o, ...i] = n,
    a = o.endsWith('?'),
    l = o.replace(/\?$/, '');
  if (i.length === 0) return a ? [l, ''] : [l];
  let c = dg(i.join('/')),
    f = [];
  return (
    f.push(...c.map(p => (p === '' ? l : [l, p].join('/')))),
    a && f.push(...c),
    f.map(p => (e.startsWith('/') && p === '' ? '/' : p))
  );
}
function SC(e) {
  e.sort((n, o) =>
    n.score !== o.score
      ? o.score - n.score
      : kC(
          n.routesMeta.map(i => i.childrenIndex),
          o.routesMeta.map(i => i.childrenIndex)
        )
  );
}
const CC = /^:[\w-]+$/,
  _C = 3,
  EC = 2,
  bC = 1,
  RC = 10,
  xC = -2,
  Lv = e => e === '*';
function TC(e, n) {
  let o = e.split('/'),
    i = o.length;
  return (
    o.some(Lv) && (i += xC),
    n && (i += EC),
    o
      .filter(a => !Lv(a))
      .reduce((a, l) => a + (CC.test(l) ? _C : l === '' ? bC : RC), i)
  );
}
function kC(e, n) {
  return e.length === n.length && e.slice(0, -1).every((i, a) => i === n[a])
    ? e[e.length - 1] - n[n.length - 1]
    : 0;
}
function PC(e, n, o) {
  let { routesMeta: i } = e,
    a = {},
    l = '/',
    c = [];
  for (let f = 0; f < i.length; ++f) {
    let p = i[f],
      m = f === i.length - 1,
      v = l === '/' ? n : n.slice(l.length) || '/',
      y = id(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
        v
      ),
      C = p.route;
    if (!y) return null;
    (Object.assign(a, y.params),
      c.push({
        params: a,
        pathname: Ur([l, y.pathname]),
        pathnameBase: IC(Ur([l, y.pathnameBase])),
        route: C
      }),
      y.pathnameBase !== '/' && (l = Ur([l, y.pathnameBase])));
  }
  return c;
}
function id(e, n) {
  typeof e == 'string' && (e = { path: e, caseSensitive: !1, end: !0 });
  let [o, i] = NC(e.path, e.caseSensitive, e.end),
    a = n.match(o);
  if (!a) return null;
  let l = a[0],
    c = l.replace(/(.)\/+$/, '$1'),
    f = a.slice(1);
  return {
    params: i.reduce((m, v, y) => {
      let { paramName: C, isOptional: S } = v;
      if (C === '*') {
        let _ = f[y] || '';
        c = l.slice(0, l.length - _.length).replace(/(.)\/+$/, '$1');
      }
      const E = f[y];
      return (
        S && !E ? (m[C] = void 0) : (m[C] = (E || '').replace(/%2F/g, '/')),
        m
      );
    }, {}),
    pathname: l,
    pathnameBase: c,
    pattern: e
  };
}
function NC(e, n, o) {
  (n === void 0 && (n = !1),
    o === void 0 && (o = !0),
    jd(
      e === '*' || !e.endsWith('*') || e.endsWith('/*'),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, '/*') + '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' + e.replace(/\*$/, '/*') + '".')
    ));
  let i = [],
    a =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (c, f, p) => (
            i.push({ paramName: f, isOptional: p != null }),
            p ? '/?([^\\/]+)?' : '/([^\\/]+)'
          )
        );
  return (
    e.endsWith('*')
      ? (i.push({ paramName: '*' }),
        (a += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : o
        ? (a += '\\/*$')
        : e !== '' && e !== '/' && (a += '(?:(?=\\/|$))'),
    [new RegExp(a, n ? void 0 : 'i'), i]
  );
}
function LC(e) {
  try {
    return e
      .split('/')
      .map(n => decodeURIComponent(n).replace(/\//g, '%2F'))
      .join('/');
  } catch (n) {
    return (
      jd(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ('encoding (' + n + ').')
      ),
      e
    );
  }
}
function Ri(e, n) {
  if (n === '/') return e;
  if (!e.toLowerCase().startsWith(n.toLowerCase())) return null;
  let o = n.endsWith('/') ? n.length - 1 : n.length,
    i = e.charAt(o);
  return i && i !== '/' ? null : e.slice(o) || '/';
}
const MC = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  AC = e => MC.test(e);
function $C(e, n) {
  n === void 0 && (n = '/');
  let {
      pathname: o,
      search: i = '',
      hash: a = ''
    } = typeof e == 'string' ? Mi(e) : e,
    l;
  if (o)
    if (AC(o)) l = o;
    else {
      if (o.includes('//')) {
        let c = o;
        ((o = o.replace(/\/\/+/g, '/')),
          jd(
            !1,
            'Pathnames cannot have embedded double slashes - normalizing ' +
              (c + ' -> ' + o)
          ));
      }
      o.startsWith('/') ? (l = Mv(o.substring(1), '/')) : (l = Mv(o, n));
    }
  else l = n;
  return { pathname: l, search: DC(i), hash: FC(a) };
}
function Mv(e, n) {
  let o = n.replace(/\/+$/, '').split('/');
  return (
    e.split('/').forEach(a => {
      a === '..' ? o.length > 1 && o.pop() : a !== '.' && o.push(a);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function Nf(e, n, o, i) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ('`to.' +
      n +
      '` field [' +
      JSON.stringify(i) +
      '].  Please separate it out to the ') +
    ('`to.' + o + '` field. Alternatively you may provide the full path as ') +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function OC(e) {
  return e.filter(
    (n, o) => o === 0 || (n.route.path && n.route.path.length > 0)
  );
}
function Vd(e, n) {
  let o = OC(e);
  return n
    ? o.map((i, a) => (a === o.length - 1 ? i.pathname : i.pathnameBase))
    : o.map(i => i.pathnameBase);
}
function Bd(e, n, o, i) {
  i === void 0 && (i = !1);
  let a;
  typeof e == 'string'
    ? (a = Mi(e))
    : ((a = Os({}, e)),
      ot(
        !a.pathname || !a.pathname.includes('?'),
        Nf('?', 'pathname', 'search', a)
      ),
      ot(
        !a.pathname || !a.pathname.includes('#'),
        Nf('#', 'pathname', 'hash', a)
      ),
      ot(!a.search || !a.search.includes('#'), Nf('#', 'search', 'hash', a)));
  let l = e === '' || a.pathname === '',
    c = l ? '/' : a.pathname,
    f;
  if (c == null) f = o;
  else {
    let y = n.length - 1;
    if (!i && c.startsWith('..')) {
      let C = c.split('/');
      for (; C[0] === '..'; ) (C.shift(), (y -= 1));
      a.pathname = C.join('/');
    }
    f = y >= 0 ? n[y] : '/';
  }
  let p = $C(a, f),
    m = c && c !== '/' && c.endsWith('/'),
    v = (l || c === '.') && o.endsWith('/');
  return (!p.pathname.endsWith('/') && (m || v) && (p.pathname += '/'), p);
}
const Ur = e => e.join('/').replace(/\/\/+/g, '/'),
  IC = e => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  DC = e => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  FC = e => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e);
function zC(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.internal == 'boolean' &&
    'data' in e
  );
}
const pg = ['post', 'put', 'patch', 'delete'];
new Set(pg);
const jC = ['get', ...pg];
new Set(jC);
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Is() {
  return (
    (Is = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var o = arguments[n];
            for (var i in o)
              Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i]);
          }
          return e;
        }),
    Is.apply(this, arguments)
  );
}
const eu = w.createContext(null),
  hg = w.createContext(null),
  ur = w.createContext(null),
  tu = w.createContext(null),
  Yn = w.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  mg = w.createContext(null);
function VC(e, n) {
  let { relative: o } = n === void 0 ? {} : n;
  Ai() || ot(!1);
  let { basename: i, navigator: a } = w.useContext(ur),
    { hash: l, pathname: c, search: f } = nu(e, { relative: o }),
    p = c;
  return (
    i !== '/' && (p = c === '/' ? i : Ur([i, c])),
    a.createHref({ pathname: p, search: f, hash: l })
  );
}
function Ai() {
  return w.useContext(tu) != null;
}
function $i() {
  return (Ai() || ot(!1), w.useContext(tu).location);
}
function vg(e) {
  w.useContext(ur).static || w.useLayoutEffect(e);
}
function yg() {
  let { isDataRoute: e } = w.useContext(Yn);
  return e ? n_() : BC();
}
function BC() {
  Ai() || ot(!1);
  let e = w.useContext(eu),
    { basename: n, future: o, navigator: i } = w.useContext(ur),
    { matches: a } = w.useContext(Yn),
    { pathname: l } = $i(),
    c = JSON.stringify(Vd(a, o.v7_relativeSplatPath)),
    f = w.useRef(!1);
  return (
    vg(() => {
      f.current = !0;
    }),
    w.useCallback(
      function (m, v) {
        if ((v === void 0 && (v = {}), !f.current)) return;
        if (typeof m == 'number') {
          i.go(m);
          return;
        }
        let y = Bd(m, JSON.parse(c), l, v.relative === 'path');
        (e == null &&
          n !== '/' &&
          (y.pathname = y.pathname === '/' ? n : Ur([n, y.pathname])),
          (v.replace ? i.replace : i.push)(y, v.state, v));
      },
      [n, i, c, l, e]
    )
  );
}
const UC = w.createContext(null);
function WC(e) {
  let n = w.useContext(Yn).outlet;
  return n && w.createElement(UC.Provider, { value: e }, n);
}
function QM() {
  let { matches: e } = w.useContext(Yn),
    n = e[e.length - 1];
  return n ? n.params : {};
}
function nu(e, n) {
  let { relative: o } = n === void 0 ? {} : n,
    { future: i } = w.useContext(ur),
    { matches: a } = w.useContext(Yn),
    { pathname: l } = $i(),
    c = JSON.stringify(Vd(a, i.v7_relativeSplatPath));
  return w.useMemo(() => Bd(e, JSON.parse(c), l, o === 'path'), [e, c, l, o]);
}
function HC(e, n) {
  return KC(e, n);
}
function KC(e, n, o, i) {
  Ai() || ot(!1);
  let { navigator: a } = w.useContext(ur),
    { matches: l } = w.useContext(Yn),
    c = l[l.length - 1],
    f = c ? c.params : {};
  c && c.pathname;
  let p = c ? c.pathnameBase : '/';
  c && c.route;
  let m = $i(),
    v;
  if (n) {
    var y;
    let b = typeof n == 'string' ? Mi(n) : n;
    (p === '/' || ((y = b.pathname) != null && y.startsWith(p)) || ot(!1),
      (v = b));
  } else v = m;
  let C = v.pathname || '/',
    S = C;
  if (p !== '/') {
    let b = p.replace(/^\//, '').split('/');
    S = '/' + C.replace(/^\//, '').split('/').slice(b.length).join('/');
  }
  let E = gC(e, { pathname: S }),
    _ = qC(
      E &&
        E.map(b =>
          Object.assign({}, b, {
            params: Object.assign({}, f, b.params),
            pathname: Ur([
              p,
              a.encodeLocation
                ? a.encodeLocation(b.pathname).pathname
                : b.pathname
            ]),
            pathnameBase:
              b.pathnameBase === '/'
                ? p
                : Ur([
                    p,
                    a.encodeLocation
                      ? a.encodeLocation(b.pathnameBase).pathname
                      : b.pathnameBase
                  ])
          })
        ),
      l,
      o,
      i
    );
  return n && _
    ? w.createElement(
        tu.Provider,
        {
          value: {
            location: Is(
              {
                pathname: '/',
                search: '',
                hash: '',
                state: null,
                key: 'default'
              },
              v
            ),
            navigationType: Vr.Pop
          }
        },
        _
      )
    : _;
}
function QC() {
  let e = t_(),
    n = zC(e)
      ? e.status + ' ' + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    o = e instanceof Error ? e.stack : null,
    a = { padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)' };
  return w.createElement(
    w.Fragment,
    null,
    w.createElement('h2', null, 'Unexpected Application Error!'),
    w.createElement('h3', { style: { fontStyle: 'italic' } }, n),
    o ? w.createElement('pre', { style: a }, o) : null,
    null
  );
}
const GC = w.createElement(QC, null);
class YC extends w.Component {
  constructor(n) {
    (super(n),
      (this.state = {
        location: n.location,
        revalidation: n.revalidation,
        error: n.error
      }));
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  static getDerivedStateFromProps(n, o) {
    return o.location !== n.location ||
      (o.revalidation !== 'idle' && n.revalidation === 'idle')
      ? { error: n.error, location: n.location, revalidation: n.revalidation }
      : {
          error: n.error !== void 0 ? n.error : o.error,
          location: o.location,
          revalidation: n.revalidation || o.revalidation
        };
  }
  componentDidCatch(n, o) {
    console.error(
      'React Router caught the following error during render',
      n,
      o
    );
  }
  render() {
    return this.state.error !== void 0
      ? w.createElement(
          Yn.Provider,
          { value: this.props.routeContext },
          w.createElement(mg.Provider, {
            value: this.state.error,
            children: this.props.component
          })
        )
      : this.props.children;
  }
}
function XC(e) {
  let { routeContext: n, match: o, children: i } = e,
    a = w.useContext(eu);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (o.route.errorElement || o.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = o.route.id),
    w.createElement(Yn.Provider, { value: n }, i)
  );
}
function qC(e, n, o, i) {
  var a;
  if (
    (n === void 0 && (n = []),
    o === void 0 && (o = null),
    i === void 0 && (i = null),
    e == null)
  ) {
    var l;
    if (!o) return null;
    if (o.errors) e = o.matches;
    else if (
      (l = i) != null &&
      l.v7_partialHydration &&
      n.length === 0 &&
      !o.initialized &&
      o.matches.length > 0
    )
      e = o.matches;
    else return null;
  }
  let c = e,
    f = (a = o) == null ? void 0 : a.errors;
  if (f != null) {
    let v = c.findIndex(
      y => y.route.id && (f == null ? void 0 : f[y.route.id]) !== void 0
    );
    (v >= 0 || ot(!1), (c = c.slice(0, Math.min(c.length, v + 1))));
  }
  let p = !1,
    m = -1;
  if (o && i && i.v7_partialHydration)
    for (let v = 0; v < c.length; v++) {
      let y = c[v];
      if (
        ((y.route.HydrateFallback || y.route.hydrateFallbackElement) && (m = v),
        y.route.id)
      ) {
        let { loaderData: C, errors: S } = o,
          E =
            y.route.loader &&
            C[y.route.id] === void 0 &&
            (!S || S[y.route.id] === void 0);
        if (y.route.lazy || E) {
          ((p = !0), m >= 0 ? (c = c.slice(0, m + 1)) : (c = [c[0]]));
          break;
        }
      }
    }
  return c.reduceRight((v, y, C) => {
    let S,
      E = !1,
      _ = null,
      b = null;
    o &&
      ((S = f && y.route.id ? f[y.route.id] : void 0),
      (_ = y.route.errorElement || GC),
      p &&
        (m < 0 && C === 0
          ? (r_('route-fallback'), (E = !0), (b = null))
          : m === C &&
            ((E = !0), (b = y.route.hydrateFallbackElement || null))));
    let N = n.concat(c.slice(0, C + 1)),
      R = () => {
        let T;
        return (
          S
            ? (T = _)
            : E
              ? (T = b)
              : y.route.Component
                ? (T = w.createElement(y.route.Component, null))
                : y.route.element
                  ? (T = y.route.element)
                  : (T = v),
          w.createElement(XC, {
            match: y,
            routeContext: { outlet: v, matches: N, isDataRoute: o != null },
            children: T
          })
        );
      };
    return o && (y.route.ErrorBoundary || y.route.errorElement || C === 0)
      ? w.createElement(YC, {
          location: o.location,
          revalidation: o.revalidation,
          component: _,
          error: S,
          children: R(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 }
        })
      : R();
  }, null);
}
var gg = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      e
    );
  })(gg || {}),
  wg = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseLoaderData = 'useLoaderData'),
      (e.UseActionData = 'useActionData'),
      (e.UseRouteError = 'useRouteError'),
      (e.UseNavigation = 'useNavigation'),
      (e.UseRouteLoaderData = 'useRouteLoaderData'),
      (e.UseMatches = 'useMatches'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      (e.UseRouteId = 'useRouteId'),
      e
    );
  })(wg || {});
function ZC(e) {
  let n = w.useContext(eu);
  return (n || ot(!1), n);
}
function JC(e) {
  let n = w.useContext(hg);
  return (n || ot(!1), n);
}
function e_(e) {
  let n = w.useContext(Yn);
  return (n || ot(!1), n);
}
function Sg(e) {
  let n = e_(),
    o = n.matches[n.matches.length - 1];
  return (o.route.id || ot(!1), o.route.id);
}
function t_() {
  var e;
  let n = w.useContext(mg),
    o = JC(),
    i = Sg();
  return n !== void 0 ? n : (e = o.errors) == null ? void 0 : e[i];
}
function n_() {
  let { router: e } = ZC(gg.UseNavigateStable),
    n = Sg(wg.UseNavigateStable),
    o = w.useRef(!1);
  return (
    vg(() => {
      o.current = !0;
    }),
    w.useCallback(
      function (a, l) {
        (l === void 0 && (l = {}),
          o.current &&
            (typeof a == 'number'
              ? e.navigate(a)
              : e.navigate(a, Is({ fromRouteId: n }, l))));
      },
      [e, n]
    )
  );
}
const Av = {};
function r_(e, n, o) {
  Av[e] || (Av[e] = !0);
}
function o_(e, n) {
  (e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath);
}
function GM(e) {
  let { to: n, replace: o, state: i, relative: a } = e;
  Ai() || ot(!1);
  let { future: l, static: c } = w.useContext(ur),
    { matches: f } = w.useContext(Yn),
    { pathname: p } = $i(),
    m = yg(),
    v = Bd(n, Vd(f, l.v7_relativeSplatPath), p, a === 'path'),
    y = JSON.stringify(v);
  return (
    w.useEffect(
      () => m(JSON.parse(y), { replace: o, state: i, relative: a }),
      [m, y, a, o, i]
    ),
    null
  );
}
function YM(e) {
  return WC(e.context);
}
function di(e) {
  ot(!1);
}
function i_(e) {
  let {
    basename: n = '/',
    children: o = null,
    location: i,
    navigationType: a = Vr.Pop,
    navigator: l,
    static: c = !1,
    future: f
  } = e;
  Ai() && ot(!1);
  let p = n.replace(/^\/*/, '/'),
    m = w.useMemo(
      () => ({
        basename: p,
        navigator: l,
        static: c,
        future: Is({ v7_relativeSplatPath: !1 }, f)
      }),
      [p, f, l, c]
    );
  typeof i == 'string' && (i = Mi(i));
  let {
      pathname: v = '/',
      search: y = '',
      hash: C = '',
      state: S = null,
      key: E = 'default'
    } = i,
    _ = w.useMemo(() => {
      let b = Ri(v, p);
      return b == null
        ? null
        : {
            location: { pathname: b, search: y, hash: C, state: S, key: E },
            navigationType: a
          };
    }, [p, v, y, C, S, E, a]);
  return _ == null
    ? null
    : w.createElement(
        ur.Provider,
        { value: m },
        w.createElement(tu.Provider, { children: o, value: _ })
      );
}
function s_(e) {
  let { children: n, location: o } = e;
  return HC(sd(n), o);
}
new Promise(() => {});
function sd(e, n) {
  n === void 0 && (n = []);
  let o = [];
  return (
    w.Children.forEach(e, (i, a) => {
      if (!w.isValidElement(i)) return;
      let l = [...n, a];
      if (i.type === w.Fragment) {
        o.push.apply(o, sd(i.props.children, l));
        return;
      }
      (i.type !== di && ot(!1), !i.props.index || !i.props.children || ot(!1));
      let c = {
        id: i.props.id || l.join('-'),
        caseSensitive: i.props.caseSensitive,
        element: i.props.element,
        Component: i.props.Component,
        index: i.props.index,
        path: i.props.path,
        loader: i.props.loader,
        action: i.props.action,
        errorElement: i.props.errorElement,
        ErrorBoundary: i.props.ErrorBoundary,
        hasErrorBoundary:
          i.props.ErrorBoundary != null || i.props.errorElement != null,
        shouldRevalidate: i.props.shouldRevalidate,
        handle: i.props.handle,
        lazy: i.props.lazy
      };
      (i.props.children && (c.children = sd(i.props.children, l)), o.push(c));
    }),
    o
  );
}
/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Wl() {
  return (
    (Wl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var o = arguments[n];
            for (var i in o)
              Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i]);
          }
          return e;
        }),
    Wl.apply(this, arguments)
  );
}
function Cg(e, n) {
  if (e == null) return {};
  var o = {},
    i = Object.keys(e),
    a,
    l;
  for (l = 0; l < i.length; l++)
    ((a = i[l]), !(n.indexOf(a) >= 0) && (o[a] = e[a]));
  return o;
}
function a_(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function l_(e, n) {
  return e.button === 0 && (!n || n === '_self') && !a_(e);
}
const u_ = [
    'onClick',
    'relative',
    'reloadDocument',
    'replace',
    'state',
    'target',
    'to',
    'preventScrollReset',
    'viewTransition'
  ],
  c_ = [
    'aria-current',
    'caseSensitive',
    'className',
    'end',
    'style',
    'to',
    'viewTransition',
    'children'
  ],
  f_ = '6';
try {
  window.__reactRouterVersion = f_;
} catch {}
const d_ = w.createContext({ isTransitioning: !1 }),
  p_ = 'startTransition',
  $v = Fd[p_];
function h_(e) {
  let { basename: n, children: o, future: i, window: a } = e,
    l = w.useRef();
  l.current == null && (l.current = mC({ window: a, v5Compat: !0 }));
  let c = l.current,
    [f, p] = w.useState({ action: c.action, location: c.location }),
    { v7_startTransition: m } = i || {},
    v = w.useCallback(
      y => {
        m && $v ? $v(() => p(y)) : p(y);
      },
      [p, m]
    );
  return (
    w.useLayoutEffect(() => c.listen(v), [c, v]),
    w.useEffect(() => o_(i), [i]),
    w.createElement(i_, {
      basename: n,
      children: o,
      location: f.location,
      navigationType: f.action,
      navigator: c,
      future: i
    })
  );
}
const m_ =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u',
  v_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  y_ = w.forwardRef(function (n, o) {
    let {
        onClick: i,
        relative: a,
        reloadDocument: l,
        replace: c,
        state: f,
        target: p,
        to: m,
        preventScrollReset: v,
        viewTransition: y
      } = n,
      C = Cg(n, u_),
      { basename: S } = w.useContext(ur),
      E,
      _ = !1;
    if (typeof m == 'string' && v_.test(m) && ((E = m), m_))
      try {
        let T = new URL(window.location.href),
          k = m.startsWith('//') ? new URL(T.protocol + m) : new URL(m),
          $ = Ri(k.pathname, S);
        k.origin === T.origin && $ != null
          ? (m = $ + k.search + k.hash)
          : (_ = !0);
      } catch {}
    let b = VC(m, { relative: a }),
      N = w_(m, {
        replace: c,
        state: f,
        target: p,
        preventScrollReset: v,
        relative: a,
        viewTransition: y
      });
    function R(T) {
      (i && i(T), T.defaultPrevented || N(T));
    }
    return w.createElement(
      'a',
      Wl({}, C, { href: E || b, onClick: _ || l ? i : R, ref: o, target: p })
    );
  }),
  XM = w.forwardRef(function (n, o) {
    let {
        'aria-current': i = 'page',
        caseSensitive: a = !1,
        className: l = '',
        end: c = !1,
        style: f,
        to: p,
        viewTransition: m,
        children: v
      } = n,
      y = Cg(n, c_),
      C = nu(p, { relative: y.relative }),
      S = $i(),
      E = w.useContext(hg),
      { navigator: _, basename: b } = w.useContext(ur),
      N = E != null && S_(C) && m === !0,
      R = _.encodeLocation ? _.encodeLocation(C).pathname : C.pathname,
      T = S.pathname,
      k =
        E && E.navigation && E.navigation.location
          ? E.navigation.location.pathname
          : null;
    (a ||
      ((T = T.toLowerCase()),
      (k = k ? k.toLowerCase() : null),
      (R = R.toLowerCase())),
      k && b && (k = Ri(k, b) || k));
    const $ = R !== '/' && R.endsWith('/') ? R.length - 1 : R.length;
    let W = T === R || (!c && T.startsWith(R) && T.charAt($) === '/'),
      H =
        k != null &&
        (k === R || (!c && k.startsWith(R) && k.charAt(R.length) === '/')),
      F = { isActive: W, isPending: H, isTransitioning: N },
      G = W ? i : void 0,
      q;
    typeof l == 'function'
      ? (q = l(F))
      : (q = [
          l,
          W ? 'active' : null,
          H ? 'pending' : null,
          N ? 'transitioning' : null
        ]
          .filter(Boolean)
          .join(' '));
    let ce = typeof f == 'function' ? f(F) : f;
    return w.createElement(
      y_,
      Wl({}, y, {
        'aria-current': G,
        className: q,
        ref: o,
        style: ce,
        to: p,
        viewTransition: m
      }),
      typeof v == 'function' ? v(F) : v
    );
  });
var ad;
(function (e) {
  ((e.UseScrollRestoration = 'useScrollRestoration'),
    (e.UseSubmit = 'useSubmit'),
    (e.UseSubmitFetcher = 'useSubmitFetcher'),
    (e.UseFetcher = 'useFetcher'),
    (e.useViewTransitionState = 'useViewTransitionState'));
})(ad || (ad = {}));
var Ov;
(function (e) {
  ((e.UseFetcher = 'useFetcher'),
    (e.UseFetchers = 'useFetchers'),
    (e.UseScrollRestoration = 'useScrollRestoration'));
})(Ov || (Ov = {}));
function g_(e) {
  let n = w.useContext(eu);
  return (n || ot(!1), n);
}
function w_(e, n) {
  let {
      target: o,
      replace: i,
      state: a,
      preventScrollReset: l,
      relative: c,
      viewTransition: f
    } = n === void 0 ? {} : n,
    p = yg(),
    m = $i(),
    v = nu(e, { relative: c });
  return w.useCallback(
    y => {
      if (l_(y, o)) {
        y.preventDefault();
        let C = i !== void 0 ? i : Ul(m) === Ul(v);
        p(e, {
          replace: C,
          state: a,
          preventScrollReset: l,
          relative: c,
          viewTransition: f
        });
      }
    },
    [m, p, v, i, a, o, e, l, c, f]
  );
}
function S_(e, n) {
  n === void 0 && (n = {});
  let o = w.useContext(d_);
  o == null && ot(!1);
  let { basename: i } = g_(ad.useViewTransitionState),
    a = nu(e, { relative: n.relative });
  if (!o.isTransitioning) return !1;
  let l = Ri(o.currentLocation.pathname, i) || o.currentLocation.pathname,
    c = Ri(o.nextLocation.pathname, i) || o.nextLocation.pathname;
  return id(a.pathname, c) != null || id(a.pathname, l) != null;
}
var Un = function () {
  return (
    (Un =
      Object.assign ||
      function (n) {
        for (var o, i = 1, a = arguments.length; i < a; i++) {
          o = arguments[i];
          for (var l in o)
            Object.prototype.hasOwnProperty.call(o, l) && (n[l] = o[l]);
        }
        return n;
      }),
    Un.apply(this, arguments)
  );
};
function _g(e, n) {
  var o = {};
  for (var i in e)
    Object.prototype.hasOwnProperty.call(e, i) &&
      n.indexOf(i) < 0 &&
      (o[i] = e[i]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var a = 0, i = Object.getOwnPropertySymbols(e); a < i.length; a++)
      n.indexOf(i[a]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, i[a]) &&
        (o[i[a]] = e[i[a]]);
  return o;
}
function C_(e, n, o) {
  if (o || arguments.length === 2)
    for (var i = 0, a = n.length, l; i < a; i++)
      (l || !(i in n)) &&
        (l || (l = Array.prototype.slice.call(n, 0, i)), (l[i] = n[i]));
  return e.concat(l || Array.prototype.slice.call(n));
}
var Ol = 'right-scroll-bar-position',
  Il = 'width-before-scroll-bar',
  __ = 'with-scroll-bars-hidden',
  E_ = '--removed-body-scroll-bar-size';
function Lf(e, n) {
  return (typeof e == 'function' ? e(n) : e && (e.current = n), e);
}
function b_(e, n) {
  var o = w.useState(function () {
    return {
      value: e,
      callback: n,
      facade: {
        get current() {
          return o.value;
        },
        set current(i) {
          var a = o.value;
          a !== i && ((o.value = i), o.callback(i, a));
        }
      }
    };
  })[0];
  return ((o.callback = n), o.facade);
}
var R_ = typeof window < 'u' ? w.useLayoutEffect : w.useEffect,
  Iv = new WeakMap();
function x_(e, n) {
  var o = b_(null, function (i) {
    return e.forEach(function (a) {
      return Lf(a, i);
    });
  });
  return (
    R_(
      function () {
        var i = Iv.get(o);
        if (i) {
          var a = new Set(i),
            l = new Set(e),
            c = o.current;
          (a.forEach(function (f) {
            l.has(f) || Lf(f, null);
          }),
            l.forEach(function (f) {
              a.has(f) || Lf(f, c);
            }));
        }
        Iv.set(o, e);
      },
      [e]
    ),
    o
  );
}
function T_(e) {
  return e;
}
function k_(e, n) {
  n === void 0 && (n = T_);
  var o = [],
    i = !1,
    a = {
      read: function () {
        if (i)
          throw new Error(
            'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.'
          );
        return o.length ? o[o.length - 1] : e;
      },
      useMedium: function (l) {
        var c = n(l, i);
        return (
          o.push(c),
          function () {
            o = o.filter(function (f) {
              return f !== c;
            });
          }
        );
      },
      assignSyncMedium: function (l) {
        for (i = !0; o.length; ) {
          var c = o;
          ((o = []), c.forEach(l));
        }
        o = {
          push: function (f) {
            return l(f);
          },
          filter: function () {
            return o;
          }
        };
      },
      assignMedium: function (l) {
        i = !0;
        var c = [];
        if (o.length) {
          var f = o;
          ((o = []), f.forEach(l), (c = o));
        }
        var p = function () {
            var v = c;
            ((c = []), v.forEach(l));
          },
          m = function () {
            return Promise.resolve().then(p);
          };
        (m(),
          (o = {
            push: function (v) {
              (c.push(v), m());
            },
            filter: function (v) {
              return ((c = c.filter(v)), o);
            }
          }));
      }
    };
  return a;
}
function P_(e) {
  e === void 0 && (e = {});
  var n = k_(null);
  return ((n.options = Un({ async: !0, ssr: !1 }, e)), n);
}
var Eg = function (e) {
  var n = e.sideCar,
    o = _g(e, ['sideCar']);
  if (!n)
    throw new Error(
      'Sidecar: please provide `sideCar` property to import the right car'
    );
  var i = n.read();
  if (!i) throw new Error('Sidecar medium not found');
  return w.createElement(i, Un({}, o));
};
Eg.isSideCarExport = !0;
function N_(e, n) {
  return (e.useMedium(n), Eg);
}
var bg = P_(),
  Mf = function () {},
  ru = w.forwardRef(function (e, n) {
    var o = w.useRef(null),
      i = w.useState({
        onScrollCapture: Mf,
        onWheelCapture: Mf,
        onTouchMoveCapture: Mf
      }),
      a = i[0],
      l = i[1],
      c = e.forwardProps,
      f = e.children,
      p = e.className,
      m = e.removeScrollBar,
      v = e.enabled,
      y = e.shards,
      C = e.sideCar,
      S = e.noRelative,
      E = e.noIsolation,
      _ = e.inert,
      b = e.allowPinchZoom,
      N = e.as,
      R = N === void 0 ? 'div' : N,
      T = e.gapMode,
      k = _g(e, [
        'forwardProps',
        'children',
        'className',
        'removeScrollBar',
        'enabled',
        'shards',
        'sideCar',
        'noRelative',
        'noIsolation',
        'inert',
        'allowPinchZoom',
        'as',
        'gapMode'
      ]),
      $ = C,
      W = x_([o, n]),
      H = Un(Un({}, k), a);
    return w.createElement(
      w.Fragment,
      null,
      v &&
        w.createElement($, {
          sideCar: bg,
          removeScrollBar: m,
          shards: y,
          noRelative: S,
          noIsolation: E,
          inert: _,
          setCallbacks: l,
          allowPinchZoom: !!b,
          lockRef: o,
          gapMode: T
        }),
      c
        ? w.cloneElement(w.Children.only(f), Un(Un({}, H), { ref: W }))
        : w.createElement(R, Un({}, H, { className: p, ref: W }), f)
    );
  });
ru.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
ru.classNames = { fullWidth: Il, zeroRight: Ol };
var L_ = function () {
  if (typeof __webpack_nonce__ < 'u') return __webpack_nonce__;
};
function M_() {
  if (!document) return null;
  var e = document.createElement('style');
  e.type = 'text/css';
  var n = L_();
  return (n && e.setAttribute('nonce', n), e);
}
function A_(e, n) {
  e.styleSheet
    ? (e.styleSheet.cssText = n)
    : e.appendChild(document.createTextNode(n));
}
function $_(e) {
  var n = document.head || document.getElementsByTagName('head')[0];
  n.appendChild(e);
}
var O_ = function () {
    var e = 0,
      n = null;
    return {
      add: function (o) {
        (e == 0 && (n = M_()) && (A_(n, o), $_(n)), e++);
      },
      remove: function () {
        (e--,
          !e && n && (n.parentNode && n.parentNode.removeChild(n), (n = null)));
      }
    };
  },
  I_ = function () {
    var e = O_();
    return function (n, o) {
      w.useEffect(
        function () {
          return (
            e.add(n),
            function () {
              e.remove();
            }
          );
        },
        [n && o]
      );
    };
  },
  Rg = function () {
    var e = I_(),
      n = function (o) {
        var i = o.styles,
          a = o.dynamic;
        return (e(i, a), null);
      };
    return n;
  },
  D_ = { left: 0, top: 0, right: 0, gap: 0 },
  Af = function (e) {
    return parseInt(e || '', 10) || 0;
  },
  F_ = function (e) {
    var n = window.getComputedStyle(document.body),
      o = n[e === 'padding' ? 'paddingLeft' : 'marginLeft'],
      i = n[e === 'padding' ? 'paddingTop' : 'marginTop'],
      a = n[e === 'padding' ? 'paddingRight' : 'marginRight'];
    return [Af(o), Af(i), Af(a)];
  },
  z_ = function (e) {
    if ((e === void 0 && (e = 'margin'), typeof window > 'u')) return D_;
    var n = F_(e),
      o = document.documentElement.clientWidth,
      i = window.innerWidth;
    return {
      left: n[0],
      top: n[1],
      right: n[2],
      gap: Math.max(0, i - o + n[2] - n[0])
    };
  },
  j_ = Rg(),
  hi = 'data-scroll-locked',
  V_ = function (e, n, o, i) {
    var a = e.left,
      l = e.top,
      c = e.right,
      f = e.gap;
    return (
      o === void 0 && (o = 'margin'),
      `
  .`
        .concat(
          __,
          ` {
   overflow: hidden `
        )
        .concat(
          i,
          `;
   padding-right: `
        )
        .concat(f, 'px ')
        .concat(
          i,
          `;
  }
  body[`
        )
        .concat(
          hi,
          `] {
    overflow: hidden `
        )
        .concat(
          i,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            n && 'position: relative '.concat(i, ';'),
            o === 'margin' &&
              `
    padding-left: `
                .concat(
                  a,
                  `px;
    padding-top: `
                )
                .concat(
                  l,
                  `px;
    padding-right: `
                )
                .concat(
                  c,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(f, 'px ')
                .concat(
                  i,
                  `;
    `
                ),
            o === 'padding' && 'padding-right: '.concat(f, 'px ').concat(i, ';')
          ]
            .filter(Boolean)
            .join(''),
          `
  }
  
  .`
        )
        .concat(
          Ol,
          ` {
    right: `
        )
        .concat(f, 'px ')
        .concat(
          i,
          `;
  }
  
  .`
        )
        .concat(
          Il,
          ` {
    margin-right: `
        )
        .concat(f, 'px ')
        .concat(
          i,
          `;
  }
  
  .`
        )
        .concat(Ol, ' .')
        .concat(
          Ol,
          ` {
    right: 0 `
        )
        .concat(
          i,
          `;
  }
  
  .`
        )
        .concat(Il, ' .')
        .concat(
          Il,
          ` {
    margin-right: 0 `
        )
        .concat(
          i,
          `;
  }
  
  body[`
        )
        .concat(
          hi,
          `] {
    `
        )
        .concat(E_, ': ')
        .concat(
          f,
          `px;
  }
`
        )
    );
  },
  Dv = function () {
    var e = parseInt(document.body.getAttribute(hi) || '0', 10);
    return isFinite(e) ? e : 0;
  },
  B_ = function () {
    w.useEffect(function () {
      return (
        document.body.setAttribute(hi, (Dv() + 1).toString()),
        function () {
          var e = Dv() - 1;
          e <= 0
            ? document.body.removeAttribute(hi)
            : document.body.setAttribute(hi, e.toString());
        }
      );
    }, []);
  },
  U_ = function (e) {
    var n = e.noRelative,
      o = e.noImportant,
      i = e.gapMode,
      a = i === void 0 ? 'margin' : i;
    B_();
    var l = w.useMemo(
      function () {
        return z_(a);
      },
      [a]
    );
    return w.createElement(j_, { styles: V_(l, !n, a, o ? '' : '!important') });
  },
  ld = !1;
if (typeof window < 'u')
  try {
    var Sl = Object.defineProperty({}, 'passive', {
      get: function () {
        return ((ld = !0), !0);
      }
    });
    (window.addEventListener('test', Sl, Sl),
      window.removeEventListener('test', Sl, Sl));
  } catch {
    ld = !1;
  }
var ii = ld ? { passive: !1 } : !1,
  W_ = function (e) {
    return e.tagName === 'TEXTAREA';
  },
  xg = function (e, n) {
    if (!(e instanceof Element)) return !1;
    var o = window.getComputedStyle(e);
    return (
      o[n] !== 'hidden' &&
      !(o.overflowY === o.overflowX && !W_(e) && o[n] === 'visible')
    );
  },
  H_ = function (e) {
    return xg(e, 'overflowY');
  },
  K_ = function (e) {
    return xg(e, 'overflowX');
  },
  Fv = function (e, n) {
    var o = n.ownerDocument,
      i = n;
    do {
      typeof ShadowRoot < 'u' && i instanceof ShadowRoot && (i = i.host);
      var a = Tg(e, i);
      if (a) {
        var l = kg(e, i),
          c = l[1],
          f = l[2];
        if (c > f) return !0;
      }
      i = i.parentNode;
    } while (i && i !== o.body);
    return !1;
  },
  Q_ = function (e) {
    var n = e.scrollTop,
      o = e.scrollHeight,
      i = e.clientHeight;
    return [n, o, i];
  },
  G_ = function (e) {
    var n = e.scrollLeft,
      o = e.scrollWidth,
      i = e.clientWidth;
    return [n, o, i];
  },
  Tg = function (e, n) {
    return e === 'v' ? H_(n) : K_(n);
  },
  kg = function (e, n) {
    return e === 'v' ? Q_(n) : G_(n);
  },
  Y_ = function (e, n) {
    return e === 'h' && n === 'rtl' ? -1 : 1;
  },
  X_ = function (e, n, o, i, a) {
    var l = Y_(e, window.getComputedStyle(n).direction),
      c = l * i,
      f = o.target,
      p = n.contains(f),
      m = !1,
      v = c > 0,
      y = 0,
      C = 0;
    do {
      if (!f) break;
      var S = kg(e, f),
        E = S[0],
        _ = S[1],
        b = S[2],
        N = _ - b - l * E;
      (E || N) && Tg(e, f) && ((y += N), (C += E));
      var R = f.parentNode;
      f = R && R.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? R.host : R;
    } while ((!p && f !== document.body) || (p && (n.contains(f) || n === f)));
    return (((v && Math.abs(y) < 1) || (!v && Math.abs(C) < 1)) && (m = !0), m);
  },
  Cl = function (e) {
    return 'changedTouches' in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  zv = function (e) {
    return [e.deltaX, e.deltaY];
  },
  jv = function (e) {
    return e && 'current' in e ? e.current : e;
  },
  q_ = function (e, n) {
    return e[0] === n[0] && e[1] === n[1];
  },
  Z_ = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        e,
        ` {pointer-events: all;}
`
      );
  },
  J_ = 0,
  si = [];
function eE(e) {
  var n = w.useRef([]),
    o = w.useRef([0, 0]),
    i = w.useRef(),
    a = w.useState(J_++)[0],
    l = w.useState(Rg)[0],
    c = w.useRef(e);
  (w.useEffect(
    function () {
      c.current = e;
    },
    [e]
  ),
    w.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add('block-interactivity-'.concat(a));
          var _ = C_([e.lockRef.current], (e.shards || []).map(jv), !0).filter(
            Boolean
          );
          return (
            _.forEach(function (b) {
              return b.classList.add('allow-interactivity-'.concat(a));
            }),
            function () {
              (document.body.classList.remove('block-interactivity-'.concat(a)),
                _.forEach(function (b) {
                  return b.classList.remove('allow-interactivity-'.concat(a));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    ));
  var f = w.useCallback(function (_, b) {
      if (
        ('touches' in _ && _.touches.length === 2) ||
        (_.type === 'wheel' && _.ctrlKey)
      )
        return !c.current.allowPinchZoom;
      var N = Cl(_),
        R = o.current,
        T = 'deltaX' in _ ? _.deltaX : R[0] - N[0],
        k = 'deltaY' in _ ? _.deltaY : R[1] - N[1],
        $,
        W = _.target,
        H = Math.abs(T) > Math.abs(k) ? 'h' : 'v';
      if ('touches' in _ && H === 'h' && W.type === 'range') return !1;
      var F = window.getSelection(),
        G = F && F.anchorNode,
        q = G ? G === W || G.contains(W) : !1;
      if (q) return !1;
      var ce = Fv(H, W);
      if (!ce) return !0;
      if ((ce ? ($ = H) : (($ = H === 'v' ? 'h' : 'v'), (ce = Fv(H, W))), !ce))
        return !1;
      if (
        (!i.current && 'changedTouches' in _ && (T || k) && (i.current = $), !$)
      )
        return !0;
      var ye = i.current || $;
      return X_(ye, b, _, ye === 'h' ? T : k);
    }, []),
    p = w.useCallback(function (_) {
      var b = _;
      if (!(!si.length || si[si.length - 1] !== l)) {
        var N = 'deltaY' in b ? zv(b) : Cl(b),
          R = n.current.filter(function ($) {
            return (
              $.name === b.type &&
              ($.target === b.target || b.target === $.shadowParent) &&
              q_($.delta, N)
            );
          })[0];
        if (R && R.should) {
          b.cancelable && b.preventDefault();
          return;
        }
        if (!R) {
          var T = (c.current.shards || [])
              .map(jv)
              .filter(Boolean)
              .filter(function ($) {
                return $.contains(b.target);
              }),
            k = T.length > 0 ? f(b, T[0]) : !c.current.noIsolation;
          k && b.cancelable && b.preventDefault();
        }
      }
    }, []),
    m = w.useCallback(function (_, b, N, R) {
      var T = { name: _, delta: b, target: N, should: R, shadowParent: tE(N) };
      (n.current.push(T),
        setTimeout(function () {
          n.current = n.current.filter(function (k) {
            return k !== T;
          });
        }, 1));
    }, []),
    v = w.useCallback(function (_) {
      ((o.current = Cl(_)), (i.current = void 0));
    }, []),
    y = w.useCallback(function (_) {
      m(_.type, zv(_), _.target, f(_, e.lockRef.current));
    }, []),
    C = w.useCallback(function (_) {
      m(_.type, Cl(_), _.target, f(_, e.lockRef.current));
    }, []);
  w.useEffect(function () {
    return (
      si.push(l),
      e.setCallbacks({
        onScrollCapture: y,
        onWheelCapture: y,
        onTouchMoveCapture: C
      }),
      document.addEventListener('wheel', p, ii),
      document.addEventListener('touchmove', p, ii),
      document.addEventListener('touchstart', v, ii),
      function () {
        ((si = si.filter(function (_) {
          return _ !== l;
        })),
          document.removeEventListener('wheel', p, ii),
          document.removeEventListener('touchmove', p, ii),
          document.removeEventListener('touchstart', v, ii));
      }
    );
  }, []);
  var S = e.removeScrollBar,
    E = e.inert;
  return w.createElement(
    w.Fragment,
    null,
    E ? w.createElement(l, { styles: Z_(a) }) : null,
    S
      ? w.createElement(U_, { noRelative: e.noRelative, gapMode: e.gapMode })
      : null
  );
}
function tE(e) {
  for (var n = null; e !== null; )
    (e instanceof ShadowRoot && ((n = e.host), (e = e.host)),
      (e = e.parentNode));
  return n;
}
const nE = N_(bg, eE);
var Pg = w.forwardRef(function (e, n) {
  return w.createElement(ru, Un({}, e, { ref: n, sideCar: nE }));
});
Pg.classNames = ru.classNames;
function Hn(e) {
  return Object.keys(e);
}
function $f(e) {
  return e && typeof e == 'object' && !Array.isArray(e);
}
function Ud(e, n) {
  const o = { ...e },
    i = n;
  return (
    $f(e) &&
      $f(n) &&
      Object.keys(n).forEach(a => {
        $f(i[a]) && a in e ? (o[a] = Ud(o[a], i[a])) : (o[a] = i[a]);
      }),
    o
  );
}
function rE(e) {
  return e.replace(/[A-Z]/g, n => `-${n.toLowerCase()}`);
}
function oE(e) {
  var n;
  return typeof e != 'string' || !e.includes('var(--mantine-scale)')
    ? e
    : (n = e.match(/^calc\((.*?)\)$/)) == null
      ? void 0
      : n[1].split('*')[0].trim();
}
function iE(e) {
  const n = oE(e);
  return typeof n == 'number'
    ? n
    : typeof n == 'string'
      ? n.includes('calc') || n.includes('var')
        ? n
        : n.includes('px')
          ? Number(n.replace('px', ''))
          : n.includes('rem')
            ? Number(n.replace('rem', '')) * 16
            : n.includes('em')
              ? Number(n.replace('em', '')) * 16
              : Number(n)
      : NaN;
}
function Vv(e) {
  return e === '0rem' ? '0rem' : `calc(${e} * var(--mantine-scale))`;
}
function Ng(e, { shouldScale: n = !1 } = {}) {
  function o(i) {
    if (i === 0 || i === '0') return `0${e}`;
    if (typeof i == 'number') {
      const a = `${i / 16}${e}`;
      return n ? Vv(a) : a;
    }
    if (typeof i == 'string') {
      if (
        i === '' ||
        i.startsWith('calc(') ||
        i.startsWith('clamp(') ||
        i.includes('rgba(')
      )
        return i;
      if (i.includes(','))
        return i
          .split(',')
          .map(l => o(l))
          .join(',');
      if (i.includes(' '))
        return i
          .split(' ')
          .map(l => o(l))
          .join(' ');
      const a = i.replace('px', '');
      if (!Number.isNaN(Number(a))) {
        const l = `${Number(a) / 16}${e}`;
        return n ? Vv(l) : l;
      }
    }
    return i;
  }
  return o;
}
const se = Ng('rem', { shouldScale: !0 }),
  Bv = Ng('em');
function Wd(e) {
  return Object.keys(e).reduce(
    (n, o) => (e[o] !== void 0 && (n[o] = e[o]), n),
    {}
  );
}
function Lg(e) {
  if (typeof e == 'number') return !0;
  if (typeof e == 'string') {
    if (
      e.startsWith('calc(') ||
      e.startsWith('var(') ||
      (e.includes(' ') && e.trim() !== '')
    )
      return !0;
    const n =
      /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
    return e
      .trim()
      .split(/\s+/)
      .every(i => n.test(i));
  }
  return !1;
}
function sE(e) {
  return Array.isArray(e) || e === null
    ? !1
    : typeof e == 'object'
      ? e.type !== w.Fragment
      : !1;
}
function ou(e) {
  const n = w.createContext(null);
  return [
    ({ children: a, value: l }) => D.jsx(n.Provider, { value: l, children: a }),
    () => {
      const a = w.useContext(n);
      if (a === null) throw new Error(e);
      return a;
    }
  ];
}
function aE(e = null) {
  const n = w.createContext(e);
  return [
    ({ children: a, value: l }) => D.jsx(n.Provider, { value: l, children: a }),
    () => w.useContext(n)
  ];
}
const lE = { app: 100, modal: 200, popover: 300, overlay: 400, max: 9999 };
function xo(e) {
  return lE[e];
}
function un(e, n = 'size', o = !0) {
  if (e !== void 0) return Lg(e) ? (o ? se(e) : e) : `var(--${n}-${e})`;
}
function iu(e) {
  return un(e, 'mantine-spacing');
}
function Oi(e) {
  return e === void 0
    ? 'var(--mantine-radius-default)'
    : un(e, 'mantine-radius');
}
function Ds(e) {
  return un(e, 'mantine-font-size');
}
function uE(e) {
  return un(e, 'mantine-line-height', !1);
}
function Mg(e) {
  if (e) return un(e, 'mantine-shadow', !1);
}
function Dl(e = 'mantine-') {
  return `${e}${Math.random().toString(36).slice(2, 11)}`;
}
function fo(e) {
  const n = w.useRef(e);
  return (
    w.useEffect(() => {
      n.current = e;
    }),
    w.useMemo(
      () =>
        (...o) => {
          var i;
          return (i = n.current) == null ? void 0 : i.call(n, ...o);
        },
      []
    )
  );
}
function su(e, n) {
  const {
      delay: o,
      flushOnUnmount: i,
      leading: a
    } = typeof n == 'number'
      ? { delay: n, flushOnUnmount: !1, leading: !1 }
      : n,
    l = fo(e),
    c = w.useRef(0),
    f = w.useMemo(() => {
      const p = Object.assign(
        (...m) => {
          window.clearTimeout(c.current);
          const v = p._isFirstCall;
          p._isFirstCall = !1;
          function y() {
            (window.clearTimeout(c.current),
              (c.current = 0),
              (p._isFirstCall = !0));
          }
          if (a && v) {
            l(...m);
            const E = () => {
                y();
              },
              _ = () => {
                c.current !== 0 && (y(), l(...m));
              },
              b = () => {
                y();
              };
            ((p.flush = _),
              (p.cancel = b),
              (c.current = window.setTimeout(E, o)));
            return;
          }
          if (a && !v) {
            const E = () => {
                c.current !== 0 && (y(), l(...m));
              },
              _ = () => {
                y();
              };
            ((p.flush = E), (p.cancel = _));
            const b = () => {
              y();
            };
            c.current = window.setTimeout(b, o);
            return;
          }
          const C = () => {
              c.current !== 0 && (y(), l(...m));
            },
            S = () => {
              y();
            };
          ((p.flush = C),
            (p.cancel = S),
            (c.current = window.setTimeout(C, o)));
        },
        { flush: () => {}, cancel: () => {}, _isFirstCall: !0 }
      );
      return p;
    }, [l, o, a]);
  return (
    w.useEffect(
      () => () => {
        i ? f.flush() : f.cancel();
      },
      [f, i]
    ),
    f
  );
}
function cE(e, n) {
  try {
    return (
      e.addEventListener('change', n),
      () => e.removeEventListener('change', n)
    );
  } catch {
    return (e.addListener(n), () => e.removeListener(n));
  }
}
function fE(e, n) {
  return typeof window < 'u' && 'matchMedia' in window
    ? window.matchMedia(e).matches
    : !1;
}
function dE(
  e,
  n,
  { getInitialValueInEffect: o } = { getInitialValueInEffect: !0 }
) {
  const [i, a] = w.useState(o ? n : fE(e));
  return (
    w.useEffect(() => {
      try {
        const l = window.matchMedia(e);
        return (a(l.matches), cE(l, c => a(c.matches)));
      } catch {
        return;
      }
    }, [e]),
    i || !1
  );
}
const Ii = typeof document < 'u' ? w.useLayoutEffect : w.useEffect;
function Ag(e, n) {
  const o = w.useRef(!1);
  (w.useEffect(
    () => () => {
      o.current = !1;
    },
    []
  ),
    w.useEffect(() => {
      if (o.current) return e();
      o.current = !0;
    }, n));
}
function pE({ opened: e, shouldReturnFocus: n = !0 }) {
  const o = w.useRef(null),
    i = () => {
      var a;
      o.current &&
        'focus' in o.current &&
        typeof o.current.focus == 'function' &&
        ((a = o.current) == null || a.focus({ preventScroll: !0 }));
    };
  return (
    Ag(() => {
      let a = -1;
      const l = c => {
        c.key === 'Tab' && window.clearTimeout(a);
      };
      return (
        document.addEventListener('keydown', l),
        e
          ? (o.current = document.activeElement)
          : n && (a = window.setTimeout(i, 10)),
        () => {
          (window.clearTimeout(a), document.removeEventListener('keydown', l));
        }
      );
    }, [e, n]),
    i
  );
}
const hE = /input|select|textarea|button|object/,
  $g = 'a, input, select, textarea, button, object, [tabindex]';
function mE(e) {
  return e.style.display === 'none';
}
function vE(e) {
  if (
    e.getAttribute('aria-hidden') ||
    e.getAttribute('hidden') ||
    e.getAttribute('type') === 'hidden'
  )
    return !1;
  let o = e;
  for (; o && !(o === document.body || o.nodeType === 11); ) {
    if (mE(o)) return !1;
    o = o.parentNode;
  }
  return !0;
}
function Og(e) {
  let n = e.getAttribute('tabindex');
  return (n === null && (n = void 0), parseInt(n, 10));
}
function ud(e) {
  const n = e.nodeName.toLowerCase(),
    o = !Number.isNaN(Og(e));
  return (
    ((hE.test(n) && !e.disabled) ||
      (e instanceof HTMLAnchorElement && e.href) ||
      o) &&
    vE(e)
  );
}
function Ig(e) {
  const n = Og(e);
  return (Number.isNaN(n) || n >= 0) && ud(e);
}
function yE(e) {
  return Array.from(e.querySelectorAll($g)).filter(Ig);
}
function gE(e, n) {
  const o = yE(e);
  if (!o.length) {
    n.preventDefault();
    return;
  }
  const i = o[n.shiftKey ? 0 : o.length - 1],
    a = e.getRootNode();
  let l = i === a.activeElement || e === a.activeElement;
  const c = a.activeElement;
  if (
    (c.tagName === 'INPUT' &&
      c.getAttribute('type') === 'radio' &&
      (l = o
        .filter(
          v =>
            v.getAttribute('type') === 'radio' &&
            v.getAttribute('name') === c.getAttribute('name')
        )
        .includes(i)),
    !l)
  )
    return;
  n.preventDefault();
  const p = o[n.shiftKey ? o.length - 1 : 0];
  p && p.focus();
}
function wE(e = !0) {
  const n = w.useRef(null),
    o = a => {
      let l = a.querySelector('[data-autofocus]');
      if (!l) {
        const c = Array.from(a.querySelectorAll($g));
        ((l = c.find(Ig) || c.find(ud) || null), !l && ud(a) && (l = a));
      }
      l && l.focus({ preventScroll: !0 });
    },
    i = w.useCallback(
      a => {
        e &&
          a !== null &&
          n.current !== a &&
          (a
            ? (setTimeout(() => {
                a.getRootNode() && o(a);
              }),
              (n.current = a))
            : (n.current = null));
      },
      [e]
    );
  return (
    w.useEffect(() => {
      if (!e) return;
      n.current && setTimeout(() => o(n.current));
      const a = l => {
        l.key === 'Tab' && n.current && gE(n.current, l);
      };
      return (
        document.addEventListener('keydown', a),
        () => document.removeEventListener('keydown', a)
      );
    }, [e]),
    i
  );
}
const SE = ke.useId || (() => {});
function CE() {
  const e = SE();
  return e ? `mantine-${e.replace(/:/g, '')}` : '';
}
function _E(e) {
  const n = CE(),
    [o, i] = w.useState(n);
  return (
    Ii(() => {
      i(Dl());
    }, []),
    typeof e == 'string' ? e : typeof window > 'u' ? n : o
  );
}
function EE(e, n, o) {
  w.useEffect(
    () => (
      window.addEventListener(e, n, o),
      () => window.removeEventListener(e, n, o)
    ),
    [e, n]
  );
}
function cd(e, n) {
  if (typeof e == 'function') return e(n);
  typeof e == 'object' && e !== null && 'current' in e && (e.current = n);
}
function bE(...e) {
  const n = new Map();
  return o => {
    if (
      (e.forEach(i => {
        const a = cd(i, o);
        a && n.set(i, a);
      }),
      n.size > 0)
    )
      return () => {
        (e.forEach(i => {
          const a = n.get(i);
          a && typeof a == 'function' ? a() : cd(i, null);
        }),
          n.clear());
      };
  };
}
function To(...e) {
  return w.useCallback(bE(...e), e);
}
function Dg(e, n) {
  return dE('(prefers-reduced-motion: reduce)', e, n);
}
function RE(e, n) {
  window.dispatchEvent(new CustomEvent(e, { detail: n }));
}
function xE(e) {
  function n(i) {
    const a = Object.keys(i).reduce(
      (l, c) => ((l[`${e}:${c}`] = f => i[c](f.detail)), l),
      {}
    );
    Ii(
      () => (
        Object.keys(a).forEach(l => {
          (window.removeEventListener(l, a[l]),
            window.addEventListener(l, a[l]));
        }),
        () =>
          Object.keys(a).forEach(l => {
            window.removeEventListener(l, a[l]);
          })
      ),
      [a]
    );
  }
  function o(i) {
    return (...a) => RE(`${e}:${String(i)}`, a[0]);
  }
  return [n, o];
}
function TE(e) {
  const n = w.Children.toArray(e);
  return n.length !== 1 || !sE(n[0]) ? null : n[0];
}
function qM(e) {
  return e;
}
function Fg(e) {
  var n,
    o,
    i = '';
  if (typeof e == 'string' || typeof e == 'number') i += e;
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var a = e.length;
      for (n = 0; n < a; n++)
        e[n] && (o = Fg(e[n])) && (i && (i += ' '), (i += o));
    } else for (o in e) e[o] && (i && (i += ' '), (i += o));
  return i;
}
function ct() {
  for (var e, n, o = 0, i = '', a = arguments.length; o < a; o++)
    (e = arguments[o]) && (n = Fg(e)) && (i && (i += ' '), (i += n));
  return i;
}
const kE = {};
function PE(e) {
  const n = {};
  return (
    e.forEach(o => {
      Object.entries(o).forEach(([i, a]) => {
        n[i] ? (n[i] = ct(n[i], a)) : (n[i] = a);
      });
    }),
    n
  );
}
function Hd({ theme: e, classNames: n, props: o, stylesCtx: i }) {
  const l = (Array.isArray(n) ? n : [n]).map(c =>
    typeof c == 'function' ? c(e, o, i) : c || kE
  );
  return PE(l);
}
function fd({ theme: e, styles: n, props: o, stylesCtx: i }) {
  return (Array.isArray(n) ? n : [n]).reduce(
    (l, c) =>
      typeof c == 'function' ? { ...l, ...c(e, o, i) } : { ...l, ...c },
    {}
  );
}
const zg = w.createContext(null);
function Hr() {
  const e = w.useContext(zg);
  if (!e)
    throw new Error('[@mantine/core] MantineProvider was not found in tree');
  return e;
}
function NE() {
  return Hr().cssVariablesResolver;
}
function LE() {
  return Hr().classNamesPrefix;
}
function Kd() {
  return Hr().getStyleNonce;
}
function ME() {
  return Hr().withStaticClasses;
}
function AE() {
  return Hr().headless;
}
function $E() {
  var e;
  return (e = Hr().stylesTransform) == null ? void 0 : e.sx;
}
function OE() {
  var e;
  return (e = Hr().stylesTransform) == null ? void 0 : e.styles;
}
function jg() {
  return Hr().env || 'default';
}
function IE(e) {
  return /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(e);
}
function DE(e) {
  let n = e.replace('#', '');
  if (n.length === 3) {
    const c = n.split('');
    n = [c[0], c[0], c[1], c[1], c[2], c[2]].join('');
  }
  if (n.length === 8) {
    const c = parseInt(n.slice(6, 8), 16) / 255;
    return {
      r: parseInt(n.slice(0, 2), 16),
      g: parseInt(n.slice(2, 4), 16),
      b: parseInt(n.slice(4, 6), 16),
      a: c
    };
  }
  const o = parseInt(n, 16),
    i = (o >> 16) & 255,
    a = (o >> 8) & 255,
    l = o & 255;
  return { r: i, g: a, b: l, a: 1 };
}
function FE(e) {
  const [n, o, i, a] = e
    .replace(/[^0-9,./]/g, '')
    .split(/[/,]/)
    .map(Number);
  return { r: n, g: o, b: i, a: a === void 0 ? 1 : a };
}
function zE(e) {
  const n =
      /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i,
    o = e.match(n);
  if (!o) return { r: 0, g: 0, b: 0, a: 1 };
  const i = parseInt(o[1], 10),
    a = parseInt(o[2], 10) / 100,
    l = parseInt(o[3], 10) / 100,
    c = o[5] ? parseFloat(o[5]) : void 0,
    f = (1 - Math.abs(2 * l - 1)) * a,
    p = i / 60,
    m = f * (1 - Math.abs((p % 2) - 1)),
    v = l - f / 2;
  let y, C, S;
  return (
    p >= 0 && p < 1
      ? ((y = f), (C = m), (S = 0))
      : p >= 1 && p < 2
        ? ((y = m), (C = f), (S = 0))
        : p >= 2 && p < 3
          ? ((y = 0), (C = f), (S = m))
          : p >= 3 && p < 4
            ? ((y = 0), (C = m), (S = f))
            : p >= 4 && p < 5
              ? ((y = m), (C = 0), (S = f))
              : ((y = f), (C = 0), (S = m)),
    {
      r: Math.round((y + v) * 255),
      g: Math.round((C + v) * 255),
      b: Math.round((S + v) * 255),
      a: c || 1
    }
  );
}
function Qd(e) {
  return IE(e)
    ? DE(e)
    : e.startsWith('rgb')
      ? FE(e)
      : e.startsWith('hsl')
        ? zE(e)
        : { r: 0, g: 0, b: 0, a: 1 };
}
function _l(e, n) {
  if (e.startsWith('var('))
    return `color-mix(in srgb, ${e}, black ${n * 100}%)`;
  const { r: o, g: i, b: a, a: l } = Qd(e),
    c = 1 - n,
    f = p => Math.round(p * c);
  return `rgba(${f(o)}, ${f(i)}, ${f(a)}, ${l})`;
}
function Fs(e, n) {
  return typeof e.primaryShade == 'number'
    ? e.primaryShade
    : n === 'dark'
      ? e.primaryShade.dark
      : e.primaryShade.light;
}
function Of(e) {
  return e <= 0.03928 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
}
function jE(e) {
  const n = e.match(/oklch\((.*?)%\s/);
  return n ? parseFloat(n[1]) : null;
}
function VE(e) {
  if (e.startsWith('oklch(')) return (jE(e) || 0) / 100;
  const { r: n, g: o, b: i } = Qd(e),
    a = n / 255,
    l = o / 255,
    c = i / 255,
    f = Of(a),
    p = Of(l),
    m = Of(c);
  return 0.2126 * f + 0.7152 * p + 0.0722 * m;
}
function Rs(e, n = 0.179) {
  return e.startsWith('var(') ? !1 : VE(e) > n;
}
function Ys({ color: e, theme: n, colorScheme: o }) {
  if (typeof e != 'string')
    throw new Error(
      `[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof e}`
    );
  if (e === 'bright')
    return {
      color: e,
      value: o === 'dark' ? n.white : n.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: Rs(o === 'dark' ? n.white : n.black, n.luminanceThreshold),
      variable: '--mantine-color-bright'
    };
  if (e === 'dimmed')
    return {
      color: e,
      value: o === 'dark' ? n.colors.dark[2] : n.colors.gray[7],
      shade: void 0,
      isThemeColor: !1,
      isLight: Rs(
        o === 'dark' ? n.colors.dark[2] : n.colors.gray[6],
        n.luminanceThreshold
      ),
      variable: '--mantine-color-dimmed'
    };
  if (e === 'white' || e === 'black')
    return {
      color: e,
      value: e === 'white' ? n.white : n.black,
      shade: void 0,
      isThemeColor: !1,
      isLight: Rs(e === 'white' ? n.white : n.black, n.luminanceThreshold),
      variable: `--mantine-color-${e}`
    };
  const [i, a] = e.split('.'),
    l = a ? Number(a) : void 0,
    c = i in n.colors;
  if (c) {
    const f = l !== void 0 ? n.colors[i][l] : n.colors[i][Fs(n, o || 'light')];
    return {
      color: i,
      value: f,
      shade: l,
      isThemeColor: c,
      isLight: Rs(f, n.luminanceThreshold),
      variable: a ? `--mantine-color-${i}-${l}` : `--mantine-color-${i}-filled`
    };
  }
  return {
    color: e,
    value: e,
    isThemeColor: c,
    isLight: Rs(e, n.luminanceThreshold),
    shade: l,
    variable: void 0
  };
}
function Hl(e, n) {
  const o = Ys({ color: e || n.primaryColor, theme: n });
  return o.variable ? `var(${o.variable})` : e;
}
function dd(e, n) {
  const o = {
      from: (e == null ? void 0 : e.from) || n.defaultGradient.from,
      to: (e == null ? void 0 : e.to) || n.defaultGradient.to,
      deg: (e == null ? void 0 : e.deg) ?? n.defaultGradient.deg ?? 0
    },
    i = Hl(o.from, n),
    a = Hl(o.to, n);
  return `linear-gradient(${o.deg}deg, ${i} 0%, ${a} 100%)`;
}
function zn(e, n) {
  if (typeof e != 'string' || n > 1 || n < 0) return 'rgba(0, 0, 0, 1)';
  if (e.startsWith('var(')) {
    const l = (1 - n) * 100;
    return `color-mix(in srgb, ${e}, transparent ${l}%)`;
  }
  if (e.startsWith('oklch'))
    return e.includes('/')
      ? e.replace(/\/\s*[\d.]+\s*\)/, `/ ${n})`)
      : e.replace(')', ` / ${n})`);
  const { r: o, g: i, b: a } = Qd(e);
  return `rgba(${o}, ${i}, ${a}, ${n})`;
}
const ai = zn,
  BE = ({ color: e, theme: n, variant: o, gradient: i, autoContrast: a }) => {
    const l = Ys({ color: e, theme: n }),
      c = typeof a == 'boolean' ? a : n.autoContrast;
    if (o === 'none')
      return {
        background: 'transparent',
        hover: 'transparent',
        color: 'inherit',
        border: 'none'
      };
    if (o === 'filled') {
      const f =
        c && l.isLight
          ? 'var(--mantine-color-black)'
          : 'var(--mantine-color-white)';
      return l.isThemeColor
        ? l.shade === void 0
          ? {
              background: `var(--mantine-color-${e}-filled)`,
              hover: `var(--mantine-color-${e}-filled-hover)`,
              color: f,
              border: `${se(1)} solid transparent`
            }
          : {
              background: `var(--mantine-color-${l.color}-${l.shade})`,
              hover: `var(--mantine-color-${l.color}-${l.shade === 9 ? 8 : l.shade + 1})`,
              color: f,
              border: `${se(1)} solid transparent`
            }
        : {
            background: e,
            hover: _l(e, 0.1),
            color: f,
            border: `${se(1)} solid transparent`
          };
    }
    if (o === 'light') {
      if (l.isThemeColor) {
        if (l.shade === void 0)
          return {
            background: `var(--mantine-color-${e}-light)`,
            hover: `var(--mantine-color-${e}-light-hover)`,
            color: `var(--mantine-color-${e}-light-color)`,
            border: `${se(1)} solid transparent`
          };
        const f = n.colors[l.color][l.shade];
        return {
          background: zn(f, 0.1),
          hover: zn(f, 0.12),
          color: `var(--mantine-color-${l.color}-${Math.min(l.shade, 6)})`,
          border: `${se(1)} solid transparent`
        };
      }
      return {
        background: zn(e, 0.1),
        hover: zn(e, 0.12),
        color: e,
        border: `${se(1)} solid transparent`
      };
    }
    if (o === 'outline')
      return l.isThemeColor
        ? l.shade === void 0
          ? {
              background: 'transparent',
              hover: `var(--mantine-color-${e}-outline-hover)`,
              color: `var(--mantine-color-${e}-outline)`,
              border: `${se(1)} solid var(--mantine-color-${e}-outline)`
            }
          : {
              background: 'transparent',
              hover: zn(n.colors[l.color][l.shade], 0.05),
              color: `var(--mantine-color-${l.color}-${l.shade})`,
              border: `${se(1)} solid var(--mantine-color-${l.color}-${l.shade})`
            }
        : {
            background: 'transparent',
            hover: zn(e, 0.05),
            color: e,
            border: `${se(1)} solid ${e}`
          };
    if (o === 'subtle') {
      if (l.isThemeColor) {
        if (l.shade === void 0)
          return {
            background: 'transparent',
            hover: `var(--mantine-color-${e}-light-hover)`,
            color: `var(--mantine-color-${e}-light-color)`,
            border: `${se(1)} solid transparent`
          };
        const f = n.colors[l.color][l.shade];
        return {
          background: 'transparent',
          hover: zn(f, 0.12),
          color: `var(--mantine-color-${l.color}-${Math.min(l.shade, 6)})`,
          border: `${se(1)} solid transparent`
        };
      }
      return {
        background: 'transparent',
        hover: zn(e, 0.12),
        color: e,
        border: `${se(1)} solid transparent`
      };
    }
    return o === 'transparent'
      ? l.isThemeColor
        ? l.shade === void 0
          ? {
              background: 'transparent',
              hover: 'transparent',
              color: `var(--mantine-color-${e}-light-color)`,
              border: `${se(1)} solid transparent`
            }
          : {
              background: 'transparent',
              hover: 'transparent',
              color: `var(--mantine-color-${l.color}-${Math.min(l.shade, 6)})`,
              border: `${se(1)} solid transparent`
            }
        : {
            background: 'transparent',
            hover: 'transparent',
            color: e,
            border: `${se(1)} solid transparent`
          }
      : o === 'white'
        ? l.isThemeColor
          ? l.shade === void 0
            ? {
                background: 'var(--mantine-color-white)',
                hover: _l(n.white, 0.01),
                color: `var(--mantine-color-${e}-filled)`,
                border: `${se(1)} solid transparent`
              }
            : {
                background: 'var(--mantine-color-white)',
                hover: _l(n.white, 0.01),
                color: `var(--mantine-color-${l.color}-${l.shade})`,
                border: `${se(1)} solid transparent`
              }
          : {
              background: 'var(--mantine-color-white)',
              hover: _l(n.white, 0.01),
              color: e,
              border: `${se(1)} solid transparent`
            }
        : o === 'gradient'
          ? {
              background: dd(i, n),
              hover: dd(i, n),
              color: 'var(--mantine-color-white)',
              border: 'none'
            }
          : o === 'default'
            ? {
                background: 'var(--mantine-color-default)',
                hover: 'var(--mantine-color-default-hover)',
                color: 'var(--mantine-color-default-color)',
                border: `${se(1)} solid var(--mantine-color-default-border)`
              }
            : {};
  },
  UE = {
    dark: [
      '#C9C9C9',
      '#b8b8b8',
      '#828282',
      '#696969',
      '#424242',
      '#3b3b3b',
      '#2e2e2e',
      '#242424',
      '#1f1f1f',
      '#141414'
    ],
    gray: [
      '#f8f9fa',
      '#f1f3f5',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#868e96',
      '#495057',
      '#343a40',
      '#212529'
    ],
    red: [
      '#fff5f5',
      '#ffe3e3',
      '#ffc9c9',
      '#ffa8a8',
      '#ff8787',
      '#ff6b6b',
      '#fa5252',
      '#f03e3e',
      '#e03131',
      '#c92a2a'
    ],
    pink: [
      '#fff0f6',
      '#ffdeeb',
      '#fcc2d7',
      '#faa2c1',
      '#f783ac',
      '#f06595',
      '#e64980',
      '#d6336c',
      '#c2255c',
      '#a61e4d'
    ],
    grape: [
      '#f8f0fc',
      '#f3d9fa',
      '#eebefa',
      '#e599f7',
      '#da77f2',
      '#cc5de8',
      '#be4bdb',
      '#ae3ec9',
      '#9c36b5',
      '#862e9c'
    ],
    violet: [
      '#f3f0ff',
      '#e5dbff',
      '#d0bfff',
      '#b197fc',
      '#9775fa',
      '#845ef7',
      '#7950f2',
      '#7048e8',
      '#6741d9',
      '#5f3dc4'
    ],
    indigo: [
      '#edf2ff',
      '#dbe4ff',
      '#bac8ff',
      '#91a7ff',
      '#748ffc',
      '#5c7cfa',
      '#4c6ef5',
      '#4263eb',
      '#3b5bdb',
      '#364fc7'
    ],
    blue: [
      '#e7f5ff',
      '#d0ebff',
      '#a5d8ff',
      '#74c0fc',
      '#4dabf7',
      '#339af0',
      '#228be6',
      '#1c7ed6',
      '#1971c2',
      '#1864ab'
    ],
    cyan: [
      '#e3fafc',
      '#c5f6fa',
      '#99e9f2',
      '#66d9e8',
      '#3bc9db',
      '#22b8cf',
      '#15aabf',
      '#1098ad',
      '#0c8599',
      '#0b7285'
    ],
    teal: [
      '#e6fcf5',
      '#c3fae8',
      '#96f2d7',
      '#63e6be',
      '#38d9a9',
      '#20c997',
      '#12b886',
      '#0ca678',
      '#099268',
      '#087f5b'
    ],
    green: [
      '#ebfbee',
      '#d3f9d8',
      '#b2f2bb',
      '#8ce99a',
      '#69db7c',
      '#51cf66',
      '#40c057',
      '#37b24d',
      '#2f9e44',
      '#2b8a3e'
    ],
    lime: [
      '#f4fce3',
      '#e9fac8',
      '#d8f5a2',
      '#c0eb75',
      '#a9e34b',
      '#94d82d',
      '#82c91e',
      '#74b816',
      '#66a80f',
      '#5c940d'
    ],
    yellow: [
      '#fff9db',
      '#fff3bf',
      '#ffec99',
      '#ffe066',
      '#ffd43b',
      '#fcc419',
      '#fab005',
      '#f59f00',
      '#f08c00',
      '#e67700'
    ],
    orange: [
      '#fff4e6',
      '#ffe8cc',
      '#ffd8a8',
      '#ffc078',
      '#ffa94d',
      '#ff922b',
      '#fd7e14',
      '#f76707',
      '#e8590c',
      '#d9480f'
    ]
  },
  Uv =
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  Gd = {
    scale: 1,
    fontSmoothing: !0,
    focusRing: 'auto',
    white: '#fff',
    black: '#000',
    colors: UE,
    primaryShade: { light: 6, dark: 8 },
    primaryColor: 'blue',
    variantColorResolver: BE,
    autoContrast: !1,
    luminanceThreshold: 0.3,
    fontFamily: Uv,
    fontFamilyMonospace:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
    respectReducedMotion: !1,
    cursorType: 'default',
    defaultGradient: { from: 'blue', to: 'cyan', deg: 45 },
    defaultRadius: 'sm',
    activeClassName: 'mantine-active',
    focusClassName: '',
    headings: {
      fontFamily: Uv,
      fontWeight: '700',
      textWrap: 'wrap',
      sizes: {
        h1: { fontSize: se(34), lineHeight: '1.3' },
        h2: { fontSize: se(26), lineHeight: '1.35' },
        h3: { fontSize: se(22), lineHeight: '1.4' },
        h4: { fontSize: se(18), lineHeight: '1.45' },
        h5: { fontSize: se(16), lineHeight: '1.5' },
        h6: { fontSize: se(14), lineHeight: '1.5' }
      }
    },
    fontSizes: { xs: se(12), sm: se(14), md: se(16), lg: se(18), xl: se(20) },
    lineHeights: { xs: '1.4', sm: '1.45', md: '1.55', lg: '1.6', xl: '1.65' },
    radius: { xs: se(2), sm: se(4), md: se(8), lg: se(16), xl: se(32) },
    spacing: { xs: se(10), sm: se(12), md: se(16), lg: se(20), xl: se(32) },
    breakpoints: { xs: '36em', sm: '48em', md: '62em', lg: '75em', xl: '88em' },
    shadows: {
      xs: `0 ${se(1)} ${se(3)} rgba(0, 0, 0, 0.05), 0 ${se(1)} ${se(2)} rgba(0, 0, 0, 0.1)`,
      sm: `0 ${se(1)} ${se(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${se(10)} ${se(15)} ${se(-5)}, rgba(0, 0, 0, 0.04) 0 ${se(7)} ${se(7)} ${se(-5)}`,
      md: `0 ${se(1)} ${se(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${se(20)} ${se(25)} ${se(-5)}, rgba(0, 0, 0, 0.04) 0 ${se(10)} ${se(10)} ${se(-5)}`,
      lg: `0 ${se(1)} ${se(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${se(28)} ${se(23)} ${se(-7)}, rgba(0, 0, 0, 0.04) 0 ${se(12)} ${se(12)} ${se(-7)}`,
      xl: `0 ${se(1)} ${se(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${se(36)} ${se(28)} ${se(-7)}, rgba(0, 0, 0, 0.04) 0 ${se(17)} ${se(17)} ${se(-7)}`
    },
    other: {},
    components: {}
  };
function Wv(e) {
  return e === 'auto' || e === 'dark' || e === 'light';
}
function WE({ key: e = 'mantine-color-scheme-value' } = {}) {
  let n;
  return {
    get: o => {
      if (typeof window > 'u') return o;
      try {
        const i = window.localStorage.getItem(e);
        return Wv(i) ? i : o;
      } catch {
        return o;
      }
    },
    set: o => {
      try {
        window.localStorage.setItem(e, o);
      } catch (i) {
        console.warn(
          '[@mantine/core] Local storage color scheme manager was unable to save color scheme.',
          i
        );
      }
    },
    subscribe: o => {
      ((n = i => {
        i.storageArea === window.localStorage &&
          i.key === e &&
          Wv(i.newValue) &&
          o(i.newValue);
      }),
        window.addEventListener('storage', n));
    },
    unsubscribe: () => {
      window.removeEventListener('storage', n);
    },
    clear: () => {
      window.localStorage.removeItem(e);
    }
  };
}
const HE =
    '[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color',
  Hv =
    '[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }';
function If(e) {
  return e < 0 || e > 9 ? !1 : parseInt(e.toString(), 10) === e;
}
function Kv(e) {
  if (!(e.primaryColor in e.colors)) throw new Error(HE);
  if (
    typeof e.primaryShade == 'object' &&
    (!If(e.primaryShade.dark) || !If(e.primaryShade.light))
  )
    throw new Error(Hv);
  if (typeof e.primaryShade == 'number' && !If(e.primaryShade))
    throw new Error(Hv);
}
function KE(e, n) {
  var i;
  if (!n) return (Kv(e), e);
  const o = Ud(e, n);
  return (
    n.fontFamily &&
      !((i = n.headings) != null && i.fontFamily) &&
      (o.headings.fontFamily = n.fontFamily),
    Kv(o),
    o
  );
}
const Yd = w.createContext(null),
  QE = () => w.useContext(Yd) || Gd;
function ko() {
  const e = w.useContext(Yd);
  if (!e)
    throw new Error(
      '@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app'
    );
  return e;
}
function Vg({ theme: e, children: n, inherit: o = !0 }) {
  const i = QE(),
    a = w.useMemo(() => KE(o ? i : Gd, e), [e, i, o]);
  return D.jsx(Yd.Provider, { value: a, children: n });
}
Vg.displayName = '@mantine/core/MantineThemeProvider';
function GE() {
  const e = ko(),
    n = Kd(),
    o = Hn(e.breakpoints).reduce((i, a) => {
      const l = e.breakpoints[a].includes('px'),
        c = iE(e.breakpoints[a]),
        f = l ? `${c - 0.1}px` : Bv(c - 0.1),
        p = l ? `${c}px` : Bv(c);
      return `${i}@media (max-width: ${f}) {.mantine-visible-from-${a} {display: none !important;}}@media (min-width: ${p}) {.mantine-hidden-from-${a} {display: none !important;}}`;
    }, '');
  return D.jsx('style', {
    'data-mantine-styles': 'classes',
    nonce: n == null ? void 0 : n(),
    dangerouslySetInnerHTML: { __html: o }
  });
}
function Df(e) {
  return Object.entries(e)
    .map(([n, o]) => `${n}: ${o};`)
    .join('');
}
function Bg(e, n) {
  const o = n ? [n] : [':root', ':host'],
    i = Df(e.variables),
    a = i ? `${o.join(', ')}{${i}}` : '',
    l = Df(e.dark),
    c = Df(e.light),
    f = v =>
      o
        .map(y =>
          y === ':host'
            ? `${y}([data-mantine-color-scheme="${v}"])`
            : `${y}[data-mantine-color-scheme="${v}"]`
        )
        .join(', '),
    p = l ? `${f('dark')}{${l}}` : '',
    m = c ? `${f('light')}{${c}}` : '';
  return `${a}

${p}

${m}`;
}
function YE({ color: e, theme: n, autoContrast: o }) {
  return (typeof o == 'boolean' ? o : n.autoContrast) &&
    Ys({ color: e || n.primaryColor, theme: n }).isLight
    ? 'var(--mantine-color-black)'
    : 'var(--mantine-color-white)';
}
function Qv(e, n) {
  return YE({
    color: e.colors[e.primaryColor][Fs(e, n)],
    theme: e,
    autoContrast: null
  });
}
function El({
  theme: e,
  color: n,
  colorScheme: o,
  name: i = n,
  withColorValues: a = !0
}) {
  if (!e.colors[n]) return {};
  if (o === 'light') {
    const f = Fs(e, 'light'),
      p = {
        [`--mantine-color-${i}-text`]: `var(--mantine-color-${i}-filled)`,
        [`--mantine-color-${i}-filled`]: `var(--mantine-color-${i}-${f})`,
        [`--mantine-color-${i}-filled-hover`]: `var(--mantine-color-${i}-${f === 9 ? 8 : f + 1})`,
        [`--mantine-color-${i}-light`]: ai(e.colors[n][f], 0.1),
        [`--mantine-color-${i}-light-hover`]: ai(e.colors[n][f], 0.12),
        [`--mantine-color-${i}-light-color`]: `var(--mantine-color-${i}-${f})`,
        [`--mantine-color-${i}-outline`]: `var(--mantine-color-${i}-${f})`,
        [`--mantine-color-${i}-outline-hover`]: ai(e.colors[n][f], 0.05)
      };
    return a
      ? {
          [`--mantine-color-${i}-0`]: e.colors[n][0],
          [`--mantine-color-${i}-1`]: e.colors[n][1],
          [`--mantine-color-${i}-2`]: e.colors[n][2],
          [`--mantine-color-${i}-3`]: e.colors[n][3],
          [`--mantine-color-${i}-4`]: e.colors[n][4],
          [`--mantine-color-${i}-5`]: e.colors[n][5],
          [`--mantine-color-${i}-6`]: e.colors[n][6],
          [`--mantine-color-${i}-7`]: e.colors[n][7],
          [`--mantine-color-${i}-8`]: e.colors[n][8],
          [`--mantine-color-${i}-9`]: e.colors[n][9],
          ...p
        }
      : p;
  }
  const l = Fs(e, 'dark'),
    c = {
      [`--mantine-color-${i}-text`]: `var(--mantine-color-${i}-4)`,
      [`--mantine-color-${i}-filled`]: `var(--mantine-color-${i}-${l})`,
      [`--mantine-color-${i}-filled-hover`]: `var(--mantine-color-${i}-${l === 9 ? 8 : l + 1})`,
      [`--mantine-color-${i}-light`]: ai(e.colors[n][Math.max(0, l - 2)], 0.15),
      [`--mantine-color-${i}-light-hover`]: ai(
        e.colors[n][Math.max(0, l - 2)],
        0.2
      ),
      [`--mantine-color-${i}-light-color`]: `var(--mantine-color-${i}-${Math.max(l - 5, 0)})`,
      [`--mantine-color-${i}-outline`]: `var(--mantine-color-${i}-${Math.max(l - 4, 0)})`,
      [`--mantine-color-${i}-outline-hover`]: ai(
        e.colors[n][Math.max(l - 4, 0)],
        0.05
      )
    };
  return a
    ? {
        [`--mantine-color-${i}-0`]: e.colors[n][0],
        [`--mantine-color-${i}-1`]: e.colors[n][1],
        [`--mantine-color-${i}-2`]: e.colors[n][2],
        [`--mantine-color-${i}-3`]: e.colors[n][3],
        [`--mantine-color-${i}-4`]: e.colors[n][4],
        [`--mantine-color-${i}-5`]: e.colors[n][5],
        [`--mantine-color-${i}-6`]: e.colors[n][6],
        [`--mantine-color-${i}-7`]: e.colors[n][7],
        [`--mantine-color-${i}-8`]: e.colors[n][8],
        [`--mantine-color-${i}-9`]: e.colors[n][9],
        ...c
      }
    : c;
}
function XE(e) {
  return !!e && typeof e == 'object' && 'mantine-virtual-color' in e;
}
function li(e, n, o) {
  Hn(n).forEach(i => Object.assign(e, { [`--mantine-${o}-${i}`]: n[i] }));
}
const Ug = e => {
  const n = Fs(e, 'light'),
    o =
      e.defaultRadius in e.radius
        ? e.radius[e.defaultRadius]
        : se(e.defaultRadius),
    i = {
      variables: {
        '--mantine-z-index-app': '100',
        '--mantine-z-index-modal': '200',
        '--mantine-z-index-popover': '300',
        '--mantine-z-index-overlay': '400',
        '--mantine-z-index-max': '9999',
        '--mantine-scale': e.scale.toString(),
        '--mantine-cursor-type': e.cursorType,
        '--mantine-webkit-font-smoothing': e.fontSmoothing
          ? 'antialiased'
          : 'unset',
        '--mantine-moz-font-smoothing': e.fontSmoothing ? 'grayscale' : 'unset',
        '--mantine-color-white': e.white,
        '--mantine-color-black': e.black,
        '--mantine-line-height': e.lineHeights.md,
        '--mantine-font-family': e.fontFamily,
        '--mantine-font-family-monospace': e.fontFamilyMonospace,
        '--mantine-font-family-headings': e.headings.fontFamily,
        '--mantine-heading-font-weight': e.headings.fontWeight,
        '--mantine-heading-text-wrap': e.headings.textWrap,
        '--mantine-radius-default': o,
        '--mantine-primary-color-filled': `var(--mantine-color-${e.primaryColor}-filled)`,
        '--mantine-primary-color-filled-hover': `var(--mantine-color-${e.primaryColor}-filled-hover)`,
        '--mantine-primary-color-light': `var(--mantine-color-${e.primaryColor}-light)`,
        '--mantine-primary-color-light-hover': `var(--mantine-color-${e.primaryColor}-light-hover)`,
        '--mantine-primary-color-light-color': `var(--mantine-color-${e.primaryColor}-light-color)`
      },
      light: {
        '--mantine-color-scheme': 'light',
        '--mantine-primary-color-contrast': Qv(e, 'light'),
        '--mantine-color-bright': 'var(--mantine-color-black)',
        '--mantine-color-text': e.black,
        '--mantine-color-body': e.white,
        '--mantine-color-error': 'var(--mantine-color-red-6)',
        '--mantine-color-placeholder': 'var(--mantine-color-gray-5)',
        '--mantine-color-anchor': `var(--mantine-color-${e.primaryColor}-${n})`,
        '--mantine-color-default': 'var(--mantine-color-white)',
        '--mantine-color-default-hover': 'var(--mantine-color-gray-0)',
        '--mantine-color-default-color': 'var(--mantine-color-black)',
        '--mantine-color-default-border': 'var(--mantine-color-gray-4)',
        '--mantine-color-dimmed': 'var(--mantine-color-gray-6)',
        '--mantine-color-disabled': 'var(--mantine-color-gray-2)',
        '--mantine-color-disabled-color': 'var(--mantine-color-gray-5)',
        '--mantine-color-disabled-border': 'var(--mantine-color-gray-3)'
      },
      dark: {
        '--mantine-color-scheme': 'dark',
        '--mantine-primary-color-contrast': Qv(e, 'dark'),
        '--mantine-color-bright': 'var(--mantine-color-white)',
        '--mantine-color-text': 'var(--mantine-color-dark-0)',
        '--mantine-color-body': 'var(--mantine-color-dark-7)',
        '--mantine-color-error': 'var(--mantine-color-red-8)',
        '--mantine-color-placeholder': 'var(--mantine-color-dark-3)',
        '--mantine-color-anchor': `var(--mantine-color-${e.primaryColor}-4)`,
        '--mantine-color-default': 'var(--mantine-color-dark-6)',
        '--mantine-color-default-hover': 'var(--mantine-color-dark-5)',
        '--mantine-color-default-color': 'var(--mantine-color-white)',
        '--mantine-color-default-border': 'var(--mantine-color-dark-4)',
        '--mantine-color-dimmed': 'var(--mantine-color-dark-2)',
        '--mantine-color-disabled': 'var(--mantine-color-dark-6)',
        '--mantine-color-disabled-color': 'var(--mantine-color-dark-3)',
        '--mantine-color-disabled-border': 'var(--mantine-color-dark-4)'
      }
    };
  (li(i.variables, e.breakpoints, 'breakpoint'),
    li(i.variables, e.spacing, 'spacing'),
    li(i.variables, e.fontSizes, 'font-size'),
    li(i.variables, e.lineHeights, 'line-height'),
    li(i.variables, e.shadows, 'shadow'),
    li(i.variables, e.radius, 'radius'),
    e.colors[e.primaryColor].forEach((l, c) => {
      i.variables[`--mantine-primary-color-${c}`] =
        `var(--mantine-color-${e.primaryColor}-${c})`;
    }),
    Hn(e.colors).forEach(l => {
      const c = e.colors[l];
      if (XE(c)) {
        (Object.assign(
          i.light,
          El({
            theme: e,
            name: c.name,
            color: c.light,
            colorScheme: 'light',
            withColorValues: !0
          })
        ),
          Object.assign(
            i.dark,
            El({
              theme: e,
              name: c.name,
              color: c.dark,
              colorScheme: 'dark',
              withColorValues: !0
            })
          ));
        return;
      }
      (c.forEach((f, p) => {
        i.variables[`--mantine-color-${l}-${p}`] = f;
      }),
        Object.assign(
          i.light,
          El({ theme: e, color: l, colorScheme: 'light', withColorValues: !1 })
        ),
        Object.assign(
          i.dark,
          El({ theme: e, color: l, colorScheme: 'dark', withColorValues: !1 })
        ));
    }));
  const a = e.headings.sizes;
  return (
    Hn(a).forEach(l => {
      ((i.variables[`--mantine-${l}-font-size`] = a[l].fontSize),
        (i.variables[`--mantine-${l}-line-height`] = a[l].lineHeight),
        (i.variables[`--mantine-${l}-font-weight`] =
          a[l].fontWeight || e.headings.fontWeight));
    }),
    i
  );
};
function qE({ theme: e, generator: n }) {
  const o = Ug(e),
    i = n == null ? void 0 : n(e);
  return i ? Ud(o, i) : o;
}
const Ff = Ug(Gd);
function ZE(e) {
  const n = { variables: {}, light: {}, dark: {} };
  return (
    Hn(e.variables).forEach(o => {
      Ff.variables[o] !== e.variables[o] && (n.variables[o] = e.variables[o]);
    }),
    Hn(e.light).forEach(o => {
      Ff.light[o] !== e.light[o] && (n.light[o] = e.light[o]);
    }),
    Hn(e.dark).forEach(o => {
      Ff.dark[o] !== e.dark[o] && (n.dark[o] = e.dark[o]);
    }),
    n
  );
}
function JE(e) {
  return Bg(
    {
      variables: {},
      dark: { '--mantine-color-scheme': 'dark' },
      light: { '--mantine-color-scheme': 'light' }
    },
    e
  );
}
function Wg({ cssVariablesSelector: e, deduplicateCssVariables: n }) {
  const o = ko(),
    i = Kd(),
    a = NE(),
    l = qE({ theme: o, generator: a }),
    c = (e === void 0 || e === ':root' || e === ':host') && n,
    f = c ? ZE(l) : l,
    p = Bg(f, e);
  return p
    ? D.jsx('style', {
        'data-mantine-styles': !0,
        nonce: i == null ? void 0 : i(),
        dangerouslySetInnerHTML: { __html: `${p}${c ? '' : JE(e)}` }
      })
    : null;
}
Wg.displayName = '@mantine/CssVariables';
function ui(e, n) {
  var a, l;
  const o =
      typeof window < 'u' &&
      'matchMedia' in window &&
      ((a = window.matchMedia('(prefers-color-scheme: dark)')) == null
        ? void 0
        : a.matches),
    i = e !== 'auto' ? e : o ? 'dark' : 'light';
  (l = n()) == null || l.setAttribute('data-mantine-color-scheme', i);
}
function eb({
  manager: e,
  defaultColorScheme: n,
  getRootElement: o,
  forceColorScheme: i
}) {
  const a = w.useRef(null),
    [l, c] = w.useState(() => e.get(n)),
    f = i || l,
    p = w.useCallback(
      v => {
        i || (ui(v, o), c(v), e.set(v));
      },
      [e.set, f, i]
    ),
    m = w.useCallback(() => {
      (c(n), ui(n, o), e.clear());
    }, [e.clear, n]);
  return (
    w.useEffect(
      () => (e.subscribe(p), e.unsubscribe),
      [e.subscribe, e.unsubscribe]
    ),
    Ii(() => {
      ui(e.get(n), o);
    }, []),
    w.useEffect(() => {
      var y;
      if (i) return (ui(i, o), () => {});
      (i === void 0 && ui(l, o),
        typeof window < 'u' &&
          'matchMedia' in window &&
          (a.current = window.matchMedia('(prefers-color-scheme: dark)')));
      const v = C => {
        l === 'auto' && ui(C.matches ? 'dark' : 'light', o);
      };
      return (
        (y = a.current) == null || y.addEventListener('change', v),
        () => {
          var C;
          return (C = a.current) == null
            ? void 0
            : C.removeEventListener('change', v);
        }
      );
    }, [l, i]),
    { colorScheme: f, setColorScheme: p, clearColorScheme: m }
  );
}
function tb({ respectReducedMotion: e, getRootElement: n }) {
  Ii(() => {
    var o;
    e &&
      ((o = n()) == null ||
        o.setAttribute('data-respect-reduced-motion', 'true'));
  }, [e]);
}
function Hg({
  theme: e,
  children: n,
  getStyleNonce: o,
  withStaticClasses: i = !0,
  withGlobalClasses: a = !0,
  deduplicateCssVariables: l = !0,
  withCssVariables: c = !0,
  cssVariablesSelector: f,
  classNamesPrefix: p = 'mantine',
  colorSchemeManager: m = WE(),
  defaultColorScheme: v = 'light',
  getRootElement: y = () => document.documentElement,
  cssVariablesResolver: C,
  forceColorScheme: S,
  stylesTransform: E,
  env: _
}) {
  const {
    colorScheme: b,
    setColorScheme: N,
    clearColorScheme: R
  } = eb({
    defaultColorScheme: v,
    forceColorScheme: S,
    manager: m,
    getRootElement: y
  });
  return (
    tb({
      respectReducedMotion: (e == null ? void 0 : e.respectReducedMotion) || !1,
      getRootElement: y
    }),
    D.jsx(zg.Provider, {
      value: {
        colorScheme: b,
        setColorScheme: N,
        clearColorScheme: R,
        getRootElement: y,
        classNamesPrefix: p,
        getStyleNonce: o,
        cssVariablesResolver: C,
        cssVariablesSelector: f ?? ':root',
        withStaticClasses: i,
        stylesTransform: E,
        env: _
      },
      children: D.jsxs(Vg, {
        theme: e,
        children: [
          c &&
            D.jsx(Wg, { cssVariablesSelector: f, deduplicateCssVariables: l }),
          a && D.jsx(GE, {}),
          n
        ]
      })
    })
  );
}
Hg.displayName = '@mantine/core/MantineProvider';
const nb = {
  always: 'mantine-focus-always',
  auto: 'mantine-focus-auto',
  never: 'mantine-focus-never'
};
function rb({ theme: e, options: n, unstyled: o }) {
  return ct(
    (n == null ? void 0 : n.focusable) &&
      !o &&
      (e.focusClassName || nb[e.focusRing]),
    (n == null ? void 0 : n.active) && !o && e.activeClassName
  );
}
function ob({ selector: e, stylesCtx: n, options: o, props: i, theme: a }) {
  return Hd({
    theme: a,
    classNames: o == null ? void 0 : o.classNames,
    props: (o == null ? void 0 : o.props) || i,
    stylesCtx: n
  })[e];
}
function Gv({ selector: e, stylesCtx: n, theme: o, classNames: i, props: a }) {
  return Hd({ theme: o, classNames: i, props: a, stylesCtx: n })[e];
}
function ib({ rootSelector: e, selector: n, className: o }) {
  return e === n ? o : void 0;
}
function sb({ selector: e, classes: n, unstyled: o }) {
  return o ? void 0 : n[e];
}
function ab({
  themeName: e,
  classNamesPrefix: n,
  selector: o,
  withStaticClass: i
}) {
  return i === !1 ? [] : e.map(a => `${n}-${a}-${o}`);
}
function lb({ themeName: e, theme: n, selector: o, props: i, stylesCtx: a }) {
  return e.map(l => {
    var c, f;
    return (f = Hd({
      theme: n,
      classNames: (c = n.components[l]) == null ? void 0 : c.classNames,
      props: i,
      stylesCtx: a
    })) == null
      ? void 0
      : f[o];
  });
}
function ub({ options: e, classes: n, selector: o, unstyled: i }) {
  return e != null && e.variant && !i ? n[`${o}--${e.variant}`] : void 0;
}
function cb({
  theme: e,
  options: n,
  themeName: o,
  selector: i,
  classNamesPrefix: a,
  classNames: l,
  classes: c,
  unstyled: f,
  className: p,
  rootSelector: m,
  props: v,
  stylesCtx: y,
  withStaticClasses: C,
  headless: S,
  transformedStyles: E
}) {
  return ct(
    rb({ theme: e, options: n, unstyled: f || S }),
    lb({ theme: e, themeName: o, selector: i, props: v, stylesCtx: y }),
    ub({ options: n, classes: c, selector: i, unstyled: f }),
    Gv({ selector: i, stylesCtx: y, theme: e, classNames: l, props: v }),
    Gv({ selector: i, stylesCtx: y, theme: e, classNames: E, props: v }),
    ob({ selector: i, stylesCtx: y, options: n, props: v, theme: e }),
    ib({ rootSelector: m, selector: i, className: p }),
    sb({ selector: i, classes: c, unstyled: f || S }),
    C &&
      !S &&
      ab({
        themeName: o,
        classNamesPrefix: a,
        selector: i,
        withStaticClass: n == null ? void 0 : n.withStaticClass
      }),
    n == null ? void 0 : n.className
  );
}
function fb({ theme: e, themeName: n, props: o, stylesCtx: i, selector: a }) {
  return n
    .map(l => {
      var c;
      return fd({
        theme: e,
        styles: (c = e.components[l]) == null ? void 0 : c.styles,
        props: o,
        stylesCtx: i
      })[a];
    })
    .reduce((l, c) => ({ ...l, ...c }), {});
}
function pd({ style: e, theme: n }) {
  return Array.isArray(e)
    ? [...e].reduce((o, i) => ({ ...o, ...pd({ style: i, theme: n }) }), {})
    : typeof e == 'function'
      ? e(n)
      : (e ?? {});
}
function db(e) {
  return e.reduce(
    (n, o) => (
      o &&
        Object.keys(o).forEach(i => {
          n[i] = { ...n[i], ...Wd(o[i]) };
        }),
      n
    ),
    {}
  );
}
function pb({
  vars: e,
  varsResolver: n,
  theme: o,
  props: i,
  stylesCtx: a,
  selector: l,
  themeName: c,
  headless: f
}) {
  var p;
  return (p = db([
    f ? {} : n == null ? void 0 : n(o, i, a),
    ...c.map(m => {
      var v, y, C;
      return (C =
        (y = (v = o.components) == null ? void 0 : v[m]) == null
          ? void 0
          : y.vars) == null
        ? void 0
        : C.call(y, o, i, a);
    }),
    e == null ? void 0 : e(o, i, a)
  ])) == null
    ? void 0
    : p[l];
}
function hb({
  theme: e,
  themeName: n,
  selector: o,
  options: i,
  props: a,
  stylesCtx: l,
  rootSelector: c,
  styles: f,
  style: p,
  vars: m,
  varsResolver: v,
  headless: y,
  withStylesTransform: C
}) {
  return {
    ...(!C &&
      fb({ theme: e, themeName: n, props: a, stylesCtx: l, selector: o })),
    ...(!C && fd({ theme: e, styles: f, props: a, stylesCtx: l })[o]),
    ...(!C &&
      fd({
        theme: e,
        styles: i == null ? void 0 : i.styles,
        props: (i == null ? void 0 : i.props) || a,
        stylesCtx: l
      })[o]),
    ...pb({
      theme: e,
      props: a,
      stylesCtx: l,
      vars: m,
      varsResolver: v,
      selector: o,
      themeName: n,
      headless: y
    }),
    ...(c === o ? pd({ style: p, theme: e }) : null),
    ...pd({ style: i == null ? void 0 : i.style, theme: e })
  };
}
function mb({ props: e, stylesCtx: n, themeName: o }) {
  var c;
  const i = ko(),
    a = (c = OE()) == null ? void 0 : c();
  return {
    getTransformedStyles: f =>
      a
        ? [
            ...f.map(m => a(m, { props: e, theme: i, ctx: n })),
            ...o.map(m => {
              var v;
              return a((v = i.components[m]) == null ? void 0 : v.styles, {
                props: e,
                theme: i,
                ctx: n
              });
            })
          ].filter(Boolean)
        : [],
    withStylesTransform: !!a
  };
}
function Dt({
  name: e,
  classes: n,
  props: o,
  stylesCtx: i,
  className: a,
  style: l,
  rootSelector: c = 'root',
  unstyled: f,
  classNames: p,
  styles: m,
  vars: v,
  varsResolver: y,
  attributes: C
}) {
  const S = ko(),
    E = LE(),
    _ = ME(),
    b = AE(),
    N = (Array.isArray(e) ? e : [e]).filter(k => k),
    { withStylesTransform: R, getTransformedStyles: T } = mb({
      props: o,
      stylesCtx: i,
      themeName: N
    });
  return (k, $) => ({
    className: cb({
      theme: S,
      options: $,
      themeName: N,
      selector: k,
      classNamesPrefix: E,
      classNames: p,
      classes: n,
      unstyled: f,
      className: a,
      rootSelector: c,
      props: o,
      stylesCtx: i,
      withStaticClasses: _,
      headless: b,
      transformedStyles: T([$ == null ? void 0 : $.styles, m])
    }),
    style: hb({
      theme: S,
      themeName: N,
      selector: k,
      options: $,
      props: o,
      stylesCtx: i,
      rootSelector: c,
      styles: m,
      style: l,
      vars: v,
      varsResolver: y,
      headless: b,
      withStylesTransform: R
    }),
    ...(C == null ? void 0 : C[k])
  });
}
function Ge(e, n, o) {
  var c;
  const i = ko(),
    a = (c = i.components[e]) == null ? void 0 : c.defaultProps,
    l = typeof a == 'function' ? a(i) : a;
  return { ...n, ...l, ...Wd(o) };
}
function zf(e) {
  return Hn(e)
    .reduce((n, o) => (e[o] !== void 0 ? `${n}${rE(o)}:${e[o]};` : n), '')
    .trim();
}
function vb({ selector: e, styles: n, media: o, container: i }) {
  const a = n ? zf(n) : '',
    l = Array.isArray(o)
      ? o.map(f => `@media${f.query}{${e}{${zf(f.styles)}}}`)
      : [],
    c = Array.isArray(i)
      ? i.map(f => `@container ${f.query}{${e}{${zf(f.styles)}}}`)
      : [];
  return `${a ? `${e}{${a}}` : ''}${l.join('')}${c.join('')}`.trim();
}
function yb(e) {
  const n = Kd();
  return D.jsx('style', {
    'data-mantine-styles': 'inline',
    nonce: n == null ? void 0 : n(),
    dangerouslySetInnerHTML: { __html: vb(e) }
  });
}
function gb(e) {
  const {
    m: n,
    mx: o,
    my: i,
    mt: a,
    mb: l,
    ml: c,
    mr: f,
    me: p,
    ms: m,
    p: v,
    px: y,
    py: C,
    pt: S,
    pb: E,
    pl: _,
    pr: b,
    pe: N,
    ps: R,
    bd: T,
    bdrs: k,
    bg: $,
    c: W,
    opacity: H,
    ff: F,
    fz: G,
    fw: q,
    lts: ce,
    ta: ye,
    lh: le,
    fs: Z,
    tt: me,
    td: fe,
    w: ee,
    miw: O,
    maw: X,
    h: U,
    mih: L,
    mah: x,
    bgsz: B,
    bgp: Q,
    bgr: te,
    bga: J,
    pos: de,
    top: ae,
    left: _e,
    bottom: Me,
    right: Ue,
    inset: Ie,
    display: We,
    flex: mt,
    hiddenFrom: vt,
    visibleFrom: dt,
    lightHidden: Mn,
    darkHidden: Kr,
    sx: Qr,
    ...pn
  } = e;
  return {
    styleProps: Wd({
      m: n,
      mx: o,
      my: i,
      mt: a,
      mb: l,
      ml: c,
      mr: f,
      me: p,
      ms: m,
      p: v,
      px: y,
      py: C,
      pt: S,
      pb: E,
      pl: _,
      pr: b,
      pe: N,
      ps: R,
      bd: T,
      bg: $,
      c: W,
      opacity: H,
      ff: F,
      fz: G,
      fw: q,
      lts: ce,
      ta: ye,
      lh: le,
      fs: Z,
      tt: me,
      td: fe,
      w: ee,
      miw: O,
      maw: X,
      h: U,
      mih: L,
      mah: x,
      bgsz: B,
      bgp: Q,
      bgr: te,
      bga: J,
      pos: de,
      top: ae,
      left: _e,
      bottom: Me,
      right: Ue,
      inset: Ie,
      display: We,
      flex: mt,
      bdrs: k,
      hiddenFrom: vt,
      visibleFrom: dt,
      lightHidden: Mn,
      darkHidden: Kr,
      sx: Qr
    }),
    rest: pn
  };
}
const wb = {
  m: { type: 'spacing', property: 'margin' },
  mt: { type: 'spacing', property: 'marginTop' },
  mb: { type: 'spacing', property: 'marginBottom' },
  ml: { type: 'spacing', property: 'marginLeft' },
  mr: { type: 'spacing', property: 'marginRight' },
  ms: { type: 'spacing', property: 'marginInlineStart' },
  me: { type: 'spacing', property: 'marginInlineEnd' },
  mx: { type: 'spacing', property: 'marginInline' },
  my: { type: 'spacing', property: 'marginBlock' },
  p: { type: 'spacing', property: 'padding' },
  pt: { type: 'spacing', property: 'paddingTop' },
  pb: { type: 'spacing', property: 'paddingBottom' },
  pl: { type: 'spacing', property: 'paddingLeft' },
  pr: { type: 'spacing', property: 'paddingRight' },
  ps: { type: 'spacing', property: 'paddingInlineStart' },
  pe: { type: 'spacing', property: 'paddingInlineEnd' },
  px: { type: 'spacing', property: 'paddingInline' },
  py: { type: 'spacing', property: 'paddingBlock' },
  bd: { type: 'border', property: 'border' },
  bdrs: { type: 'radius', property: 'borderRadius' },
  bg: { type: 'color', property: 'background' },
  c: { type: 'textColor', property: 'color' },
  opacity: { type: 'identity', property: 'opacity' },
  ff: { type: 'fontFamily', property: 'fontFamily' },
  fz: { type: 'fontSize', property: 'fontSize' },
  fw: { type: 'identity', property: 'fontWeight' },
  lts: { type: 'size', property: 'letterSpacing' },
  ta: { type: 'identity', property: 'textAlign' },
  lh: { type: 'lineHeight', property: 'lineHeight' },
  fs: { type: 'identity', property: 'fontStyle' },
  tt: { type: 'identity', property: 'textTransform' },
  td: { type: 'identity', property: 'textDecoration' },
  w: { type: 'spacing', property: 'width' },
  miw: { type: 'spacing', property: 'minWidth' },
  maw: { type: 'spacing', property: 'maxWidth' },
  h: { type: 'spacing', property: 'height' },
  mih: { type: 'spacing', property: 'minHeight' },
  mah: { type: 'spacing', property: 'maxHeight' },
  bgsz: { type: 'size', property: 'backgroundSize' },
  bgp: { type: 'identity', property: 'backgroundPosition' },
  bgr: { type: 'identity', property: 'backgroundRepeat' },
  bga: { type: 'identity', property: 'backgroundAttachment' },
  pos: { type: 'identity', property: 'position' },
  top: { type: 'size', property: 'top' },
  left: { type: 'size', property: 'left' },
  bottom: { type: 'size', property: 'bottom' },
  right: { type: 'size', property: 'right' },
  inset: { type: 'size', property: 'inset' },
  display: { type: 'identity', property: 'display' },
  flex: { type: 'identity', property: 'flex' }
};
function Xd(e, n) {
  const o = Ys({ color: e, theme: n });
  return o.color === 'dimmed'
    ? 'var(--mantine-color-dimmed)'
    : o.color === 'bright'
      ? 'var(--mantine-color-bright)'
      : o.variable
        ? `var(${o.variable})`
        : o.color;
}
function Sb(e, n) {
  const o = Ys({ color: e, theme: n });
  return o.isThemeColor && o.shade === void 0
    ? `var(--mantine-color-${o.color}-text)`
    : Xd(e, n);
}
function Cb(e, n) {
  if (typeof e == 'number') return se(e);
  if (typeof e == 'string') {
    const [o, i, ...a] = e.split(' ').filter(c => c.trim() !== '');
    let l = `${se(o)}`;
    return (
      i && (l += ` ${i}`),
      a.length > 0 && (l += ` ${Xd(a.join(' '), n)}`),
      l.trim()
    );
  }
  return e;
}
const Yv = {
  text: 'var(--mantine-font-family)',
  mono: 'var(--mantine-font-family-monospace)',
  monospace: 'var(--mantine-font-family-monospace)',
  heading: 'var(--mantine-font-family-headings)',
  headings: 'var(--mantine-font-family-headings)'
};
function _b(e) {
  return typeof e == 'string' && e in Yv ? Yv[e] : e;
}
const Eb = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
function bb(e, n) {
  return typeof e == 'string' && e in n.fontSizes
    ? `var(--mantine-font-size-${e})`
    : typeof e == 'string' && Eb.includes(e)
      ? `var(--mantine-${e}-font-size)`
      : typeof e == 'number' || typeof e == 'string'
        ? se(e)
        : e;
}
function Rb(e) {
  return e;
}
const xb = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
function Tb(e, n) {
  return typeof e == 'string' && e in n.lineHeights
    ? `var(--mantine-line-height-${e})`
    : typeof e == 'string' && xb.includes(e)
      ? `var(--mantine-${e}-line-height)`
      : e;
}
function kb(e, n) {
  return typeof e == 'string' && e in n.radius
    ? `var(--mantine-radius-${e})`
    : typeof e == 'number' || typeof e == 'string'
      ? se(e)
      : e;
}
function Pb(e) {
  return typeof e == 'number' ? se(e) : e;
}
function Nb(e, n) {
  if (typeof e == 'number') return se(e);
  if (typeof e == 'string') {
    const o = e.replace('-', '');
    if (!(o in n.spacing)) return se(e);
    const i = `--mantine-spacing-${o}`;
    return e.startsWith('-') ? `calc(var(${i}) * -1)` : `var(${i})`;
  }
  return e;
}
const jf = {
  color: Xd,
  textColor: Sb,
  fontSize: bb,
  spacing: Nb,
  radius: kb,
  identity: Rb,
  size: Pb,
  lineHeight: Tb,
  fontFamily: _b,
  border: Cb
};
function Xv(e) {
  return e.replace('(min-width: ', '').replace('em)', '');
}
function Lb({ media: e, ...n }) {
  const i = Object.keys(e)
    .sort((a, l) => Number(Xv(a)) - Number(Xv(l)))
    .map(a => ({ query: a, styles: e[a] }));
  return { ...n, media: i };
}
function Mb(e) {
  if (typeof e != 'object' || e === null) return !1;
  const n = Object.keys(e);
  return !(n.length === 1 && n[0] === 'base');
}
function Ab(e) {
  return typeof e == 'object' && e !== null
    ? 'base' in e
      ? e.base
      : void 0
    : e;
}
function $b(e) {
  return typeof e == 'object' && e !== null
    ? Hn(e).filter(n => n !== 'base')
    : [];
}
function Ob(e, n) {
  return typeof e == 'object' && e !== null && n in e ? e[n] : e;
}
function Ib({ styleProps: e, data: n, theme: o }) {
  return Lb(
    Hn(e).reduce(
      (i, a) => {
        if (a === 'hiddenFrom' || a === 'visibleFrom' || a === 'sx') return i;
        const l = n[a],
          c = Array.isArray(l.property) ? l.property : [l.property],
          f = Ab(e[a]);
        if (!Mb(e[a]))
          return (
            c.forEach(m => {
              i.inlineStyles[m] = jf[l.type](f, o);
            }),
            i
          );
        i.hasResponsiveStyles = !0;
        const p = $b(e[a]);
        return (
          c.forEach(m => {
            (f != null && (i.styles[m] = jf[l.type](f, o)),
              p.forEach(v => {
                const y = `(min-width: ${o.breakpoints[v]})`;
                i.media[y] = { ...i.media[y], [m]: jf[l.type](Ob(e[a], v), o) };
              }));
          }),
          i
        );
      },
      { hasResponsiveStyles: !1, styles: {}, inlineStyles: {}, media: {} }
    )
  );
}
function Db() {
  return `__m__-${w.useId().replace(/[:«»]/g, '')}`;
}
function ZM(e) {
  return e;
}
function Kg(e) {
  return e.startsWith('data-') ? e : `data-${e}`;
}
function Fb(e) {
  return Object.keys(e).reduce((n, o) => {
    const i = e[o];
    return (
      i === void 0 || i === '' || i === !1 || i === null || (n[Kg(o)] = e[o]),
      n
    );
  }, {});
}
function Qg(e) {
  return e
    ? typeof e == 'string'
      ? { [Kg(e)]: !0 }
      : Array.isArray(e)
        ? [...e].reduce((n, o) => ({ ...n, ...Qg(o) }), {})
        : Fb(e)
    : null;
}
function hd(e, n) {
  return Array.isArray(e)
    ? [...e].reduce((o, i) => ({ ...o, ...hd(i, n) }), {})
    : typeof e == 'function'
      ? e(n)
      : (e ?? {});
}
function zb({ theme: e, style: n, vars: o, styleProps: i }) {
  const a = hd(n, e),
    l = hd(o, e);
  return { ...a, ...l, ...i };
}
const Gg = w.forwardRef(
  (
    {
      component: e,
      style: n,
      __vars: o,
      className: i,
      variant: a,
      mod: l,
      size: c,
      hiddenFrom: f,
      visibleFrom: p,
      lightHidden: m,
      darkHidden: v,
      renderRoot: y,
      __size: C,
      ...S
    },
    E
  ) => {
    var F;
    const _ = ko(),
      b = e || 'div',
      { styleProps: N, rest: R } = gb(S),
      T = $E(),
      k = (F = T == null ? void 0 : T()) == null ? void 0 : F(N.sx),
      $ = Db(),
      W = Ib({ styleProps: N, theme: _, data: wb }),
      H = {
        ref: E,
        style: zb({ theme: _, style: n, vars: o, styleProps: W.inlineStyles }),
        className: ct(i, k, {
          [$]: W.hasResponsiveStyles,
          'mantine-light-hidden': m,
          'mantine-dark-hidden': v,
          [`mantine-hidden-from-${f}`]: f,
          [`mantine-visible-from-${p}`]: p
        }),
        'data-variant': a,
        'data-size': Lg(c) ? void 0 : c || void 0,
        size: C,
        ...Qg(l),
        ...R
      };
    return D.jsxs(D.Fragment, {
      children: [
        W.hasResponsiveStyles &&
          D.jsx(yb, { selector: `.${$}`, styles: W.styles, media: W.media }),
        typeof y == 'function' ? y(H) : D.jsx(b, { ...H })
      ]
    });
  }
);
Gg.displayName = '@mantine/core/Box';
const Be = Gg;
function Yg(e) {
  return e;
}
function JM(e) {
  const n = e;
  return o => {
    const i = w.forwardRef((a, l) => D.jsx(n, { ...o, ...a, ref: l }));
    return (
      (i.extend = n.extend),
      (i.displayName = `WithProps(${n.displayName})`),
      i
    );
  };
}
function Ct(e) {
  const n = w.forwardRef(e);
  return (
    (n.extend = Yg),
    (n.withProps = o => {
      const i = w.forwardRef((a, l) => D.jsx(n, { ...o, ...a, ref: l }));
      return (
        (i.extend = n.extend),
        (i.displayName = `WithProps(${n.displayName})`),
        i
      );
    }),
    n
  );
}
function Po(e) {
  const n = w.forwardRef(e);
  return (
    (n.withProps = o => {
      const i = w.forwardRef((a, l) => D.jsx(n, { ...o, ...a, ref: l }));
      return (
        (i.extend = n.extend),
        (i.displayName = `WithProps(${n.displayName})`),
        i
      );
    }),
    (n.extend = Yg),
    n
  );
}
const jb = w.createContext({
  dir: 'ltr',
  toggleDirection: () => {},
  setDirection: () => {}
});
function Vb() {
  return w.useContext(jb);
}
function au() {
  return typeof window < 'u';
}
function Di(e) {
  return Xg(e) ? (e.nodeName || '').toLowerCase() : '#document';
}
function Ht(e) {
  var n;
  return (
    (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) ||
    window
  );
}
function Xn(e) {
  var n;
  return (n = (Xg(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : n.documentElement;
}
function Xg(e) {
  return au() ? e instanceof Node || e instanceof Ht(e).Node : !1;
}
function Ze(e) {
  return au() ? e instanceof Element || e instanceof Ht(e).Element : !1;
}
function fn(e) {
  return au() ? e instanceof HTMLElement || e instanceof Ht(e).HTMLElement : !1;
}
function md(e) {
  return !au() || typeof ShadowRoot > 'u'
    ? !1
    : e instanceof ShadowRoot || e instanceof Ht(e).ShadowRoot;
}
function Xs(e) {
  const { overflow: n, overflowX: o, overflowY: i, display: a } = cn(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(n + i + o) &&
    a !== 'inline' &&
    a !== 'contents'
  );
}
function Bb(e) {
  return /^(table|td|th)$/.test(Di(e));
}
function lu(e) {
  try {
    if (e.matches(':popover-open')) return !0;
  } catch {}
  try {
    return e.matches(':modal');
  } catch {
    return !1;
  }
}
const Ub = /transform|translate|scale|rotate|perspective|filter/,
  Wb = /paint|layout|strict|content/,
  co = e => !!e && e !== 'none';
let Vf;
function qd(e) {
  const n = Ze(e) ? cn(e) : e;
  return (
    co(n.transform) ||
    co(n.translate) ||
    co(n.scale) ||
    co(n.rotate) ||
    co(n.perspective) ||
    (!uu() && (co(n.backdropFilter) || co(n.filter))) ||
    Ub.test(n.willChange || '') ||
    Wb.test(n.contain || '')
  );
}
function Hb(e) {
  let n = lr(e);
  for (; fn(n) && !ar(n); ) {
    if (qd(n)) return n;
    if (lu(n)) return null;
    n = lr(n);
  }
  return null;
}
function uu() {
  return (
    Vf == null &&
      (Vf =
        typeof CSS < 'u' &&
        CSS.supports &&
        CSS.supports('-webkit-backdrop-filter', 'none')),
    Vf
  );
}
function ar(e) {
  return /^(html|body|#document)$/.test(Di(e));
}
function cn(e) {
  return Ht(e).getComputedStyle(e);
}
function cu(e) {
  return Ze(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function lr(e) {
  if (Di(e) === 'html') return e;
  const n = e.assignedSlot || e.parentNode || (md(e) && e.host) || Xn(e);
  return md(n) ? n.host : n;
}
function qg(e) {
  const n = lr(e);
  return ar(n)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : fn(n) && Xs(n)
      ? n
      : qg(n);
}
function Wr(e, n, o) {
  var i;
  (n === void 0 && (n = []), o === void 0 && (o = !0));
  const a = qg(e),
    l = a === ((i = e.ownerDocument) == null ? void 0 : i.body),
    c = Ht(a);
  if (l) {
    const f = vd(c);
    return n.concat(
      c,
      c.visualViewport || [],
      Xs(a) ? a : [],
      f && o ? Wr(f) : []
    );
  } else return n.concat(a, Wr(a, [], o));
}
function vd(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
const Kb = ['top', 'right', 'bottom', 'left'],
  kn = Math.min,
  Mt = Math.max,
  Kl = Math.round,
  bl = Math.floor,
  Kn = e => ({ x: e, y: e }),
  Qb = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function yd(e, n, o) {
  return Mt(e, kn(n, o));
}
function Gn(e, n) {
  return typeof e == 'function' ? e(n) : e;
}
function Pn(e) {
  return e.split('-')[0];
}
function Fi(e) {
  return e.split('-')[1];
}
function Zd(e) {
  return e === 'x' ? 'y' : 'x';
}
function Jd(e) {
  return e === 'y' ? 'height' : 'width';
}
function Rn(e) {
  const n = e[0];
  return n === 't' || n === 'b' ? 'y' : 'x';
}
function ep(e) {
  return Zd(Rn(e));
}
function Gb(e, n, o) {
  o === void 0 && (o = !1);
  const i = Fi(e),
    a = ep(e),
    l = Jd(a);
  let c =
    a === 'x'
      ? i === (o ? 'end' : 'start')
        ? 'right'
        : 'left'
      : i === 'start'
        ? 'bottom'
        : 'top';
  return (n.reference[l] > n.floating[l] && (c = Ql(c)), [c, Ql(c)]);
}
function Yb(e) {
  const n = Ql(e);
  return [gd(e), n, gd(n)];
}
function gd(e) {
  return e.includes('start')
    ? e.replace('start', 'end')
    : e.replace('end', 'start');
}
const qv = ['left', 'right'],
  Zv = ['right', 'left'],
  Xb = ['top', 'bottom'],
  qb = ['bottom', 'top'];
function Zb(e, n, o) {
  switch (e) {
    case 'top':
    case 'bottom':
      return o ? (n ? Zv : qv) : n ? qv : Zv;
    case 'left':
    case 'right':
      return n ? Xb : qb;
    default:
      return [];
  }
}
function Jb(e, n, o, i) {
  const a = Fi(e);
  let l = Zb(Pn(e), o === 'start', i);
  return (
    a && ((l = l.map(c => c + '-' + a)), n && (l = l.concat(l.map(gd)))),
    l
  );
}
function Ql(e) {
  const n = Pn(e);
  return Qb[n] + e.slice(n.length);
}
function eR(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function tp(e) {
  return typeof e != 'number'
    ? eR(e)
    : { top: e, right: e, bottom: e, left: e };
}
function xi(e) {
  const { x: n, y: o, width: i, height: a } = e;
  return {
    width: i,
    height: a,
    top: o,
    left: n,
    right: n + i,
    bottom: o + a,
    x: n,
    y: o
  };
}
function tR() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function nR() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands)
    ? e.brands
        .map(n => {
          let { brand: o, version: i } = n;
          return o + '/' + i;
        })
        .join(' ')
    : navigator.userAgent;
}
function rR() {
  return /apple/i.test(navigator.vendor);
}
function oR() {
  return tR().toLowerCase().startsWith('mac') && !navigator.maxTouchPoints;
}
function iR() {
  return nR().includes('jsdom/');
}
const Jv = 'data-floating-ui-focusable',
  sR =
    "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function ey(e) {
  let n = e.activeElement;
  for (
    ;
    ((o = n) == null || (o = o.shadowRoot) == null
      ? void 0
      : o.activeElement) != null;
  ) {
    var o;
    n = n.shadowRoot.activeElement;
  }
  return n;
}
function zs(e, n) {
  if (!e || !n) return !1;
  const o = n.getRootNode == null ? void 0 : n.getRootNode();
  if (e.contains(n)) return !0;
  if (o && md(o)) {
    let i = n;
    for (; i; ) {
      if (e === i) return !0;
      i = i.parentNode || i.host;
    }
  }
  return !1;
}
function pi(e) {
  return 'composedPath' in e ? e.composedPath()[0] : e.target;
}
function Bf(e, n) {
  if (n == null) return !1;
  if ('composedPath' in e) return e.composedPath().includes(n);
  const o = e;
  return o.target != null && n.contains(o.target);
}
function aR(e) {
  return e.matches('html,body');
}
function ho(e) {
  return (e == null ? void 0 : e.ownerDocument) || document;
}
function lR(e) {
  return fn(e) && e.matches(sR);
}
function uR(e) {
  if (!e || iR()) return !0;
  try {
    return e.matches(':focus-visible');
  } catch {
    return !0;
  }
}
function cR(e) {
  return e
    ? e.hasAttribute(Jv)
      ? e
      : e.querySelector('[' + Jv + ']') || e
    : null;
}
function Fl(e, n, o) {
  return (
    o === void 0 && (o = !0),
    e
      .filter(a => {
        var l;
        return (
          a.parentId === n &&
          (!o || ((l = a.context) == null ? void 0 : l.open))
        );
      })
      .flatMap(a => [a, ...Fl(e, a.id, o)])
  );
}
function fR(e) {
  return 'nativeEvent' in e;
}
function wd(e, n) {
  const o = ['mouse', 'pen'];
  return (o.push('', void 0), o.includes(e));
}
var dR = typeof document < 'u',
  pR = function () {},
  Qn = dR ? w.useLayoutEffect : pR;
const hR = { ...Fd };
function Rl(e) {
  const n = w.useRef(e);
  return (
    Qn(() => {
      n.current = e;
    }),
    n
  );
}
const mR = hR.useInsertionEffect,
  vR = mR || (e => e());
function Wn(e) {
  const n = w.useRef(() => {});
  return (
    vR(() => {
      n.current = e;
    }),
    w.useCallback(function () {
      for (var o = arguments.length, i = new Array(o), a = 0; a < o; a++)
        i[a] = arguments[a];
      return n.current == null ? void 0 : n.current(...i);
    }, [])
  );
}
function ty(e, n, o) {
  let { reference: i, floating: a } = e;
  const l = Rn(n),
    c = ep(n),
    f = Jd(c),
    p = Pn(n),
    m = l === 'y',
    v = i.x + i.width / 2 - a.width / 2,
    y = i.y + i.height / 2 - a.height / 2,
    C = i[f] / 2 - a[f] / 2;
  let S;
  switch (p) {
    case 'top':
      S = { x: v, y: i.y - a.height };
      break;
    case 'bottom':
      S = { x: v, y: i.y + i.height };
      break;
    case 'right':
      S = { x: i.x + i.width, y };
      break;
    case 'left':
      S = { x: i.x - a.width, y };
      break;
    default:
      S = { x: i.x, y: i.y };
  }
  switch (Fi(n)) {
    case 'start':
      S[c] -= C * (o && m ? -1 : 1);
      break;
    case 'end':
      S[c] += C * (o && m ? -1 : 1);
      break;
  }
  return S;
}
async function yR(e, n) {
  var o;
  n === void 0 && (n = {});
  const { x: i, y: a, platform: l, rects: c, elements: f, strategy: p } = e,
    {
      boundary: m = 'clippingAncestors',
      rootBoundary: v = 'viewport',
      elementContext: y = 'floating',
      altBoundary: C = !1,
      padding: S = 0
    } = Gn(n, e),
    E = tp(S),
    b = f[C ? (y === 'floating' ? 'reference' : 'floating') : y],
    N = xi(
      await l.getClippingRect({
        element:
          (o = await (l.isElement == null ? void 0 : l.isElement(b))) == null ||
          o
            ? b
            : b.contextElement ||
              (await (l.getDocumentElement == null
                ? void 0
                : l.getDocumentElement(f.floating))),
        boundary: m,
        rootBoundary: v,
        strategy: p
      })
    ),
    R =
      y === 'floating'
        ? { x: i, y: a, width: c.floating.width, height: c.floating.height }
        : c.reference,
    T = await (l.getOffsetParent == null
      ? void 0
      : l.getOffsetParent(f.floating)),
    k = (await (l.isElement == null ? void 0 : l.isElement(T)))
      ? (await (l.getScale == null ? void 0 : l.getScale(T))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    $ = xi(
      l.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await l.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: f,
            rect: R,
            offsetParent: T,
            strategy: p
          })
        : R
    );
  return {
    top: (N.top - $.top + E.top) / k.y,
    bottom: ($.bottom - N.bottom + E.bottom) / k.y,
    left: (N.left - $.left + E.left) / k.x,
    right: ($.right - N.right + E.right) / k.x
  };
}
const gR = 50,
  wR = async (e, n, o) => {
    const {
        placement: i = 'bottom',
        strategy: a = 'absolute',
        middleware: l = [],
        platform: c
      } = o,
      f = c.detectOverflow ? c : { ...c, detectOverflow: yR },
      p = await (c.isRTL == null ? void 0 : c.isRTL(n));
    let m = await c.getElementRects({ reference: e, floating: n, strategy: a }),
      { x: v, y } = ty(m, i, p),
      C = i,
      S = 0;
    const E = {};
    for (let _ = 0; _ < l.length; _++) {
      const b = l[_];
      if (!b) continue;
      const { name: N, fn: R } = b,
        {
          x: T,
          y: k,
          data: $,
          reset: W
        } = await R({
          x: v,
          y,
          initialPlacement: i,
          placement: C,
          strategy: a,
          middlewareData: E,
          rects: m,
          platform: f,
          elements: { reference: e, floating: n }
        });
      ((v = T ?? v),
        (y = k ?? y),
        (E[N] = { ...E[N], ...$ }),
        W &&
          S < gR &&
          (S++,
          typeof W == 'object' &&
            (W.placement && (C = W.placement),
            W.rects &&
              (m =
                W.rects === !0
                  ? await c.getElementRects({
                      reference: e,
                      floating: n,
                      strategy: a
                    })
                  : W.rects),
            ({ x: v, y } = ty(m, C, p))),
          (_ = -1)));
    }
    return { x: v, y, placement: C, strategy: a, middlewareData: E };
  },
  SR = e => ({
    name: 'arrow',
    options: e,
    async fn(n) {
      const {
          x: o,
          y: i,
          placement: a,
          rects: l,
          platform: c,
          elements: f,
          middlewareData: p
        } = n,
        { element: m, padding: v = 0 } = Gn(e, n) || {};
      if (m == null) return {};
      const y = tp(v),
        C = { x: o, y: i },
        S = ep(a),
        E = Jd(S),
        _ = await c.getDimensions(m),
        b = S === 'y',
        N = b ? 'top' : 'left',
        R = b ? 'bottom' : 'right',
        T = b ? 'clientHeight' : 'clientWidth',
        k = l.reference[E] + l.reference[S] - C[S] - l.floating[E],
        $ = C[S] - l.reference[S],
        W = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(m));
      let H = W ? W[T] : 0;
      (!H || !(await (c.isElement == null ? void 0 : c.isElement(W)))) &&
        (H = f.floating[T] || l.floating[E]);
      const F = k / 2 - $ / 2,
        G = H / 2 - _[E] / 2 - 1,
        q = kn(y[N], G),
        ce = kn(y[R], G),
        ye = q,
        le = H - _[E] - ce,
        Z = H / 2 - _[E] / 2 + F,
        me = yd(ye, Z, le),
        fe =
          !p.arrow &&
          Fi(a) != null &&
          Z !== me &&
          l.reference[E] / 2 - (Z < ye ? q : ce) - _[E] / 2 < 0,
        ee = fe ? (Z < ye ? Z - ye : Z - le) : 0;
      return {
        [S]: C[S] + ee,
        data: {
          [S]: me,
          centerOffset: Z - me - ee,
          ...(fe && { alignmentOffset: ee })
        },
        reset: fe
      };
    }
  }),
  CR = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'flip',
        options: e,
        async fn(n) {
          var o, i;
          const {
              placement: a,
              middlewareData: l,
              rects: c,
              initialPlacement: f,
              platform: p,
              elements: m
            } = n,
            {
              mainAxis: v = !0,
              crossAxis: y = !0,
              fallbackPlacements: C,
              fallbackStrategy: S = 'bestFit',
              fallbackAxisSideDirection: E = 'none',
              flipAlignment: _ = !0,
              ...b
            } = Gn(e, n);
          if ((o = l.arrow) != null && o.alignmentOffset) return {};
          const N = Pn(a),
            R = Rn(f),
            T = Pn(f) === f,
            k = await (p.isRTL == null ? void 0 : p.isRTL(m.floating)),
            $ = C || (T || !_ ? [Ql(f)] : Yb(f)),
            W = E !== 'none';
          !C && W && $.push(...Jb(f, _, E, k));
          const H = [f, ...$],
            F = await p.detectOverflow(n, b),
            G = [];
          let q = ((i = l.flip) == null ? void 0 : i.overflows) || [];
          if ((v && G.push(F[N]), y)) {
            const Z = Gb(a, c, k);
            G.push(F[Z[0]], F[Z[1]]);
          }
          if (
            ((q = [...q, { placement: a, overflows: G }]),
            !G.every(Z => Z <= 0))
          ) {
            var ce, ye;
            const Z = (((ce = l.flip) == null ? void 0 : ce.index) || 0) + 1,
              me = H[Z];
            if (
              me &&
              (!(y === 'alignment' ? R !== Rn(me) : !1) ||
                q.every(O => (Rn(O.placement) === R ? O.overflows[0] > 0 : !0)))
            )
              return {
                data: { index: Z, overflows: q },
                reset: { placement: me }
              };
            let fe =
              (ye = q
                .filter(ee => ee.overflows[0] <= 0)
                .sort((ee, O) => ee.overflows[1] - O.overflows[1])[0]) == null
                ? void 0
                : ye.placement;
            if (!fe)
              switch (S) {
                case 'bestFit': {
                  var le;
                  const ee =
                    (le = q
                      .filter(O => {
                        if (W) {
                          const X = Rn(O.placement);
                          return X === R || X === 'y';
                        }
                        return !0;
                      })
                      .map(O => [
                        O.placement,
                        O.overflows
                          .filter(X => X > 0)
                          .reduce((X, U) => X + U, 0)
                      ])
                      .sort((O, X) => O[1] - X[1])[0]) == null
                      ? void 0
                      : le[0];
                  ee && (fe = ee);
                  break;
                }
                case 'initialPlacement':
                  fe = f;
                  break;
              }
            if (a !== fe) return { reset: { placement: fe } };
          }
          return {};
        }
      }
    );
  };
function ny(e, n) {
  return {
    top: e.top - n.height,
    right: e.right - n.width,
    bottom: e.bottom - n.height,
    left: e.left - n.width
  };
}
function ry(e) {
  return Kb.some(n => e[n] >= 0);
}
const _R = function (e) {
  return (
    e === void 0 && (e = {}),
    {
      name: 'hide',
      options: e,
      async fn(n) {
        const { rects: o, platform: i } = n,
          { strategy: a = 'referenceHidden', ...l } = Gn(e, n);
        switch (a) {
          case 'referenceHidden': {
            const c = await i.detectOverflow(n, {
                ...l,
                elementContext: 'reference'
              }),
              f = ny(c, o.reference);
            return {
              data: { referenceHiddenOffsets: f, referenceHidden: ry(f) }
            };
          }
          case 'escaped': {
            const c = await i.detectOverflow(n, { ...l, altBoundary: !0 }),
              f = ny(c, o.floating);
            return { data: { escapedOffsets: f, escaped: ry(f) } };
          }
          default:
            return {};
        }
      }
    }
  );
};
function Zg(e) {
  const n = kn(...e.map(l => l.left)),
    o = kn(...e.map(l => l.top)),
    i = Mt(...e.map(l => l.right)),
    a = Mt(...e.map(l => l.bottom));
  return { x: n, y: o, width: i - n, height: a - o };
}
function ER(e) {
  const n = e.slice().sort((a, l) => a.y - l.y),
    o = [];
  let i = null;
  for (let a = 0; a < n.length; a++) {
    const l = n[a];
    (!i || l.y - i.y > i.height / 2 ? o.push([l]) : o[o.length - 1].push(l),
      (i = l));
  }
  return o.map(a => xi(Zg(a)));
}
const bR = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'inline',
        options: e,
        async fn(n) {
          const {
              placement: o,
              elements: i,
              rects: a,
              platform: l,
              strategy: c
            } = n,
            { padding: f = 2, x: p, y: m } = Gn(e, n),
            v = Array.from(
              (await (l.getClientRects == null
                ? void 0
                : l.getClientRects(i.reference))) || []
            ),
            y = ER(v),
            C = xi(Zg(v)),
            S = tp(f);
          function E() {
            if (
              y.length === 2 &&
              y[0].left > y[1].right &&
              p != null &&
              m != null
            )
              return (
                y.find(
                  b =>
                    p > b.left - S.left &&
                    p < b.right + S.right &&
                    m > b.top - S.top &&
                    m < b.bottom + S.bottom
                ) || C
              );
            if (y.length >= 2) {
              if (Rn(o) === 'y') {
                const q = y[0],
                  ce = y[y.length - 1],
                  ye = Pn(o) === 'top',
                  le = q.top,
                  Z = ce.bottom,
                  me = ye ? q.left : ce.left,
                  fe = ye ? q.right : ce.right,
                  ee = fe - me,
                  O = Z - le;
                return {
                  top: le,
                  bottom: Z,
                  left: me,
                  right: fe,
                  width: ee,
                  height: O,
                  x: me,
                  y: le
                };
              }
              const b = Pn(o) === 'left',
                N = Mt(...y.map(q => q.right)),
                R = kn(...y.map(q => q.left)),
                T = y.filter(q => (b ? q.left === R : q.right === N)),
                k = T[0].top,
                $ = T[T.length - 1].bottom,
                W = R,
                H = N,
                F = H - W,
                G = $ - k;
              return {
                top: k,
                bottom: $,
                left: W,
                right: H,
                width: F,
                height: G,
                x: W,
                y: k
              };
            }
            return C;
          }
          const _ = await l.getElementRects({
            reference: { getBoundingClientRect: E },
            floating: i.floating,
            strategy: c
          });
          return a.reference.x !== _.reference.x ||
            a.reference.y !== _.reference.y ||
            a.reference.width !== _.reference.width ||
            a.reference.height !== _.reference.height
            ? { reset: { rects: _ } }
            : {};
        }
      }
    );
  },
  Jg = new Set(['left', 'top']);
async function RR(e, n) {
  const { placement: o, platform: i, elements: a } = e,
    l = await (i.isRTL == null ? void 0 : i.isRTL(a.floating)),
    c = Pn(o),
    f = Fi(o),
    p = Rn(o) === 'y',
    m = Jg.has(c) ? -1 : 1,
    v = l && p ? -1 : 1,
    y = Gn(n, e);
  let {
    mainAxis: C,
    crossAxis: S,
    alignmentAxis: E
  } = typeof y == 'number'
    ? { mainAxis: y, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: y.mainAxis || 0,
        crossAxis: y.crossAxis || 0,
        alignmentAxis: y.alignmentAxis
      };
  return (
    f && typeof E == 'number' && (S = f === 'end' ? E * -1 : E),
    p ? { x: S * v, y: C * m } : { x: C * m, y: S * v }
  );
}
const xR = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn(n) {
          var o, i;
          const { x: a, y: l, placement: c, middlewareData: f } = n,
            p = await RR(n, e);
          return c === ((o = f.offset) == null ? void 0 : o.placement) &&
            (i = f.arrow) != null &&
            i.alignmentOffset
            ? {}
            : { x: a + p.x, y: l + p.y, data: { ...p, placement: c } };
        }
      }
    );
  },
  TR = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'shift',
        options: e,
        async fn(n) {
          const { x: o, y: i, placement: a, platform: l } = n,
            {
              mainAxis: c = !0,
              crossAxis: f = !1,
              limiter: p = {
                fn: N => {
                  let { x: R, y: T } = N;
                  return { x: R, y: T };
                }
              },
              ...m
            } = Gn(e, n),
            v = { x: o, y: i },
            y = await l.detectOverflow(n, m),
            C = Rn(Pn(a)),
            S = Zd(C);
          let E = v[S],
            _ = v[C];
          if (c) {
            const N = S === 'y' ? 'top' : 'left',
              R = S === 'y' ? 'bottom' : 'right',
              T = E + y[N],
              k = E - y[R];
            E = yd(T, E, k);
          }
          if (f) {
            const N = C === 'y' ? 'top' : 'left',
              R = C === 'y' ? 'bottom' : 'right',
              T = _ + y[N],
              k = _ - y[R];
            _ = yd(T, _, k);
          }
          const b = p.fn({ ...n, [S]: E, [C]: _ });
          return {
            ...b,
            data: { x: b.x - o, y: b.y - i, enabled: { [S]: c, [C]: f } }
          };
        }
      }
    );
  },
  kR = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(n) {
          const { x: o, y: i, placement: a, rects: l, middlewareData: c } = n,
            { offset: f = 0, mainAxis: p = !0, crossAxis: m = !0 } = Gn(e, n),
            v = { x: o, y: i },
            y = Rn(a),
            C = Zd(y);
          let S = v[C],
            E = v[y];
          const _ = Gn(f, n),
            b =
              typeof _ == 'number'
                ? { mainAxis: _, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ..._ };
          if (p) {
            const T = C === 'y' ? 'height' : 'width',
              k = l.reference[C] - l.floating[T] + b.mainAxis,
              $ = l.reference[C] + l.reference[T] - b.mainAxis;
            S < k ? (S = k) : S > $ && (S = $);
          }
          if (m) {
            var N, R;
            const T = C === 'y' ? 'width' : 'height',
              k = Jg.has(Pn(a)),
              $ =
                l.reference[y] -
                l.floating[T] +
                ((k && ((N = c.offset) == null ? void 0 : N[y])) || 0) +
                (k ? 0 : b.crossAxis),
              W =
                l.reference[y] +
                l.reference[T] +
                (k ? 0 : ((R = c.offset) == null ? void 0 : R[y]) || 0) -
                (k ? b.crossAxis : 0);
            E < $ ? (E = $) : E > W && (E = W);
          }
          return { [C]: S, [y]: E };
        }
      }
    );
  },
  PR = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'size',
        options: e,
        async fn(n) {
          var o, i;
          const { placement: a, rects: l, platform: c, elements: f } = n,
            { apply: p = () => {}, ...m } = Gn(e, n),
            v = await c.detectOverflow(n, m),
            y = Pn(a),
            C = Fi(a),
            S = Rn(a) === 'y',
            { width: E, height: _ } = l.floating;
          let b, N;
          y === 'top' || y === 'bottom'
            ? ((b = y),
              (N =
                C ===
                ((await (c.isRTL == null ? void 0 : c.isRTL(f.floating)))
                  ? 'start'
                  : 'end')
                  ? 'left'
                  : 'right'))
            : ((N = y), (b = C === 'end' ? 'top' : 'bottom'));
          const R = _ - v.top - v.bottom,
            T = E - v.left - v.right,
            k = kn(_ - v[b], R),
            $ = kn(E - v[N], T),
            W = !n.middlewareData.shift;
          let H = k,
            F = $;
          if (
            ((o = n.middlewareData.shift) != null && o.enabled.x && (F = T),
            (i = n.middlewareData.shift) != null && i.enabled.y && (H = R),
            W && !C)
          ) {
            const q = Mt(v.left, 0),
              ce = Mt(v.right, 0),
              ye = Mt(v.top, 0),
              le = Mt(v.bottom, 0);
            S
              ? (F =
                  E - 2 * (q !== 0 || ce !== 0 ? q + ce : Mt(v.left, v.right)))
              : (H =
                  _ -
                  2 * (ye !== 0 || le !== 0 ? ye + le : Mt(v.top, v.bottom)));
          }
          await p({ ...n, availableWidth: F, availableHeight: H });
          const G = await c.getDimensions(f.floating);
          return E !== G.width || _ !== G.height
            ? { reset: { rects: !0 } }
            : {};
        }
      }
    );
  };
function e0(e) {
  const n = cn(e);
  let o = parseFloat(n.width) || 0,
    i = parseFloat(n.height) || 0;
  const a = fn(e),
    l = a ? e.offsetWidth : o,
    c = a ? e.offsetHeight : i,
    f = Kl(o) !== l || Kl(i) !== c;
  return (f && ((o = l), (i = c)), { width: o, height: i, $: f });
}
function np(e) {
  return Ze(e) ? e : e.contextElement;
}
function mi(e) {
  const n = np(e);
  if (!fn(n)) return Kn(1);
  const o = n.getBoundingClientRect(),
    { width: i, height: a, $: l } = e0(n);
  let c = (l ? Kl(o.width) : o.width) / i,
    f = (l ? Kl(o.height) : o.height) / a;
  return (
    (!c || !Number.isFinite(c)) && (c = 1),
    (!f || !Number.isFinite(f)) && (f = 1),
    { x: c, y: f }
  );
}
const NR = Kn(0);
function t0(e) {
  const n = Ht(e);
  return !uu() || !n.visualViewport
    ? NR
    : { x: n.visualViewport.offsetLeft, y: n.visualViewport.offsetTop };
}
function LR(e, n, o) {
  return (n === void 0 && (n = !1), !o || (n && o !== Ht(e)) ? !1 : n);
}
function Eo(e, n, o, i) {
  (n === void 0 && (n = !1), o === void 0 && (o = !1));
  const a = e.getBoundingClientRect(),
    l = np(e);
  let c = Kn(1);
  n && (i ? Ze(i) && (c = mi(i)) : (c = mi(e)));
  const f = LR(l, o, i) ? t0(l) : Kn(0);
  let p = (a.left + f.x) / c.x,
    m = (a.top + f.y) / c.y,
    v = a.width / c.x,
    y = a.height / c.y;
  if (l) {
    const C = Ht(l),
      S = i && Ze(i) ? Ht(i) : i;
    let E = C,
      _ = vd(E);
    for (; _ && i && S !== E; ) {
      const b = mi(_),
        N = _.getBoundingClientRect(),
        R = cn(_),
        T = N.left + (_.clientLeft + parseFloat(R.paddingLeft)) * b.x,
        k = N.top + (_.clientTop + parseFloat(R.paddingTop)) * b.y;
      ((p *= b.x),
        (m *= b.y),
        (v *= b.x),
        (y *= b.y),
        (p += T),
        (m += k),
        (E = Ht(_)),
        (_ = vd(E)));
    }
  }
  return xi({ width: v, height: y, x: p, y: m });
}
function fu(e, n) {
  const o = cu(e).scrollLeft;
  return n ? n.left + o : Eo(Xn(e)).left + o;
}
function n0(e, n) {
  const o = e.getBoundingClientRect(),
    i = o.left + n.scrollLeft - fu(e, o),
    a = o.top + n.scrollTop;
  return { x: i, y: a };
}
function MR(e) {
  let { elements: n, rect: o, offsetParent: i, strategy: a } = e;
  const l = a === 'fixed',
    c = Xn(i),
    f = n ? lu(n.floating) : !1;
  if (i === c || (f && l)) return o;
  let p = { scrollLeft: 0, scrollTop: 0 },
    m = Kn(1);
  const v = Kn(0),
    y = fn(i);
  if ((y || (!y && !l)) && ((Di(i) !== 'body' || Xs(c)) && (p = cu(i)), y)) {
    const S = Eo(i);
    ((m = mi(i)), (v.x = S.x + i.clientLeft), (v.y = S.y + i.clientTop));
  }
  const C = c && !y && !l ? n0(c, p) : Kn(0);
  return {
    width: o.width * m.x,
    height: o.height * m.y,
    x: o.x * m.x - p.scrollLeft * m.x + v.x + C.x,
    y: o.y * m.y - p.scrollTop * m.y + v.y + C.y
  };
}
function AR(e) {
  return Array.from(e.getClientRects());
}
function $R(e) {
  const n = Xn(e),
    o = cu(e),
    i = e.ownerDocument.body,
    a = Mt(n.scrollWidth, n.clientWidth, i.scrollWidth, i.clientWidth),
    l = Mt(n.scrollHeight, n.clientHeight, i.scrollHeight, i.clientHeight);
  let c = -o.scrollLeft + fu(e);
  const f = -o.scrollTop;
  return (
    cn(i).direction === 'rtl' && (c += Mt(n.clientWidth, i.clientWidth) - a),
    { width: a, height: l, x: c, y: f }
  );
}
const oy = 25;
function OR(e, n) {
  const o = Ht(e),
    i = Xn(e),
    a = o.visualViewport;
  let l = i.clientWidth,
    c = i.clientHeight,
    f = 0,
    p = 0;
  if (a) {
    ((l = a.width), (c = a.height));
    const v = uu();
    (!v || (v && n === 'fixed')) && ((f = a.offsetLeft), (p = a.offsetTop));
  }
  const m = fu(i);
  if (m <= 0) {
    const v = i.ownerDocument,
      y = v.body,
      C = getComputedStyle(y),
      S =
        (v.compatMode === 'CSS1Compat' &&
          parseFloat(C.marginLeft) + parseFloat(C.marginRight)) ||
        0,
      E = Math.abs(i.clientWidth - y.clientWidth - S);
    E <= oy && (l -= E);
  } else m <= oy && (l += m);
  return { width: l, height: c, x: f, y: p };
}
function IR(e, n) {
  const o = Eo(e, !0, n === 'fixed'),
    i = o.top + e.clientTop,
    a = o.left + e.clientLeft,
    l = fn(e) ? mi(e) : Kn(1),
    c = e.clientWidth * l.x,
    f = e.clientHeight * l.y,
    p = a * l.x,
    m = i * l.y;
  return { width: c, height: f, x: p, y: m };
}
function iy(e, n, o) {
  let i;
  if (n === 'viewport') i = OR(e, o);
  else if (n === 'document') i = $R(Xn(e));
  else if (Ze(n)) i = IR(n, o);
  else {
    const a = t0(e);
    i = { x: n.x - a.x, y: n.y - a.y, width: n.width, height: n.height };
  }
  return xi(i);
}
function r0(e, n) {
  const o = lr(e);
  return o === n || !Ze(o) || ar(o)
    ? !1
    : cn(o).position === 'fixed' || r0(o, n);
}
function DR(e, n) {
  const o = n.get(e);
  if (o) return o;
  let i = Wr(e, [], !1).filter(f => Ze(f) && Di(f) !== 'body'),
    a = null;
  const l = cn(e).position === 'fixed';
  let c = l ? lr(e) : e;
  for (; Ze(c) && !ar(c); ) {
    const f = cn(c),
      p = qd(c);
    (!p && f.position === 'fixed' && (a = null),
      (
        l
          ? !p && !a
          : (!p &&
              f.position === 'static' &&
              !!a &&
              (a.position === 'absolute' || a.position === 'fixed')) ||
            (Xs(c) && !p && r0(e, c))
      )
        ? (i = i.filter(v => v !== c))
        : (a = f),
      (c = lr(c)));
  }
  return (n.set(e, i), i);
}
function FR(e) {
  let { element: n, boundary: o, rootBoundary: i, strategy: a } = e;
  const c = [
      ...(o === 'clippingAncestors'
        ? lu(n)
          ? []
          : DR(n, this._c)
        : [].concat(o)),
      i
    ],
    f = iy(n, c[0], a);
  let p = f.top,
    m = f.right,
    v = f.bottom,
    y = f.left;
  for (let C = 1; C < c.length; C++) {
    const S = iy(n, c[C], a);
    ((p = Mt(S.top, p)),
      (m = kn(S.right, m)),
      (v = kn(S.bottom, v)),
      (y = Mt(S.left, y)));
  }
  return { width: m - y, height: v - p, x: y, y: p };
}
function zR(e) {
  const { width: n, height: o } = e0(e);
  return { width: n, height: o };
}
function jR(e, n, o) {
  const i = fn(n),
    a = Xn(n),
    l = o === 'fixed',
    c = Eo(e, !0, l, n);
  let f = { scrollLeft: 0, scrollTop: 0 };
  const p = Kn(0);
  function m() {
    p.x = fu(a);
  }
  if (i || (!i && !l))
    if (((Di(n) !== 'body' || Xs(a)) && (f = cu(n)), i)) {
      const S = Eo(n, !0, l, n);
      ((p.x = S.x + n.clientLeft), (p.y = S.y + n.clientTop));
    } else a && m();
  l && !i && a && m();
  const v = a && !i && !l ? n0(a, f) : Kn(0),
    y = c.left + f.scrollLeft - p.x - v.x,
    C = c.top + f.scrollTop - p.y - v.y;
  return { x: y, y: C, width: c.width, height: c.height };
}
function Uf(e) {
  return cn(e).position === 'static';
}
function sy(e, n) {
  if (!fn(e) || cn(e).position === 'fixed') return null;
  if (n) return n(e);
  let o = e.offsetParent;
  return (Xn(e) === o && (o = o.ownerDocument.body), o);
}
function o0(e, n) {
  const o = Ht(e);
  if (lu(e)) return o;
  if (!fn(e)) {
    let a = lr(e);
    for (; a && !ar(a); ) {
      if (Ze(a) && !Uf(a)) return a;
      a = lr(a);
    }
    return o;
  }
  let i = sy(e, n);
  for (; i && Bb(i) && Uf(i); ) i = sy(i, n);
  return i && ar(i) && Uf(i) && !qd(i) ? o : i || Hb(e) || o;
}
const VR = async function (e) {
  const n = this.getOffsetParent || o0,
    o = this.getDimensions,
    i = await o(e.floating);
  return {
    reference: jR(e.reference, await n(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: i.width, height: i.height }
  };
};
function BR(e) {
  return cn(e).direction === 'rtl';
}
const UR = {
  convertOffsetParentRelativeRectToViewportRelativeRect: MR,
  getDocumentElement: Xn,
  getClippingRect: FR,
  getOffsetParent: o0,
  getElementRects: VR,
  getClientRects: AR,
  getDimensions: zR,
  getScale: mi,
  isElement: Ze,
  isRTL: BR
};
function i0(e, n) {
  return (
    e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height
  );
}
function WR(e, n) {
  let o = null,
    i;
  const a = Xn(e);
  function l() {
    var f;
    (clearTimeout(i), (f = o) == null || f.disconnect(), (o = null));
  }
  function c(f, p) {
    (f === void 0 && (f = !1), p === void 0 && (p = 1), l());
    const m = e.getBoundingClientRect(),
      { left: v, top: y, width: C, height: S } = m;
    if ((f || n(), !C || !S)) return;
    const E = bl(y),
      _ = bl(a.clientWidth - (v + C)),
      b = bl(a.clientHeight - (y + S)),
      N = bl(v),
      T = {
        rootMargin: -E + 'px ' + -_ + 'px ' + -b + 'px ' + -N + 'px',
        threshold: Mt(0, kn(1, p)) || 1
      };
    let k = !0;
    function $(W) {
      const H = W[0].intersectionRatio;
      if (H !== p) {
        if (!k) return c();
        H
          ? c(!1, H)
          : (i = setTimeout(() => {
              c(!1, 1e-7);
            }, 1e3));
      }
      (H === 1 && !i0(m, e.getBoundingClientRect()) && c(), (k = !1));
    }
    try {
      o = new IntersectionObserver($, { ...T, root: a.ownerDocument });
    } catch {
      o = new IntersectionObserver($, T);
    }
    o.observe(e);
  }
  return (c(!0), l);
}
function eA(e, n, o, i) {
  i === void 0 && (i = {});
  const {
      ancestorScroll: a = !0,
      ancestorResize: l = !0,
      elementResize: c = typeof ResizeObserver == 'function',
      layoutShift: f = typeof IntersectionObserver == 'function',
      animationFrame: p = !1
    } = i,
    m = np(e),
    v = a || l ? [...(m ? Wr(m) : []), ...(n ? Wr(n) : [])] : [];
  v.forEach(N => {
    (a && N.addEventListener('scroll', o, { passive: !0 }),
      l && N.addEventListener('resize', o));
  });
  const y = m && f ? WR(m, o) : null;
  let C = -1,
    S = null;
  c &&
    ((S = new ResizeObserver(N => {
      let [R] = N;
      (R &&
        R.target === m &&
        S &&
        n &&
        (S.unobserve(n),
        cancelAnimationFrame(C),
        (C = requestAnimationFrame(() => {
          var T;
          (T = S) == null || T.observe(n);
        }))),
        o());
    })),
    m && !p && S.observe(m),
    n && S.observe(n));
  let E,
    _ = p ? Eo(e) : null;
  p && b();
  function b() {
    const N = Eo(e);
    (_ && !i0(_, N) && o(), (_ = N), (E = requestAnimationFrame(b)));
  }
  return (
    o(),
    () => {
      var N;
      (v.forEach(R => {
        (a && R.removeEventListener('scroll', o),
          l && R.removeEventListener('resize', o));
      }),
        y == null || y(),
        (N = S) == null || N.disconnect(),
        (S = null),
        p && cancelAnimationFrame(E));
    }
  );
}
const HR = xR,
  KR = TR,
  QR = CR,
  GR = PR,
  YR = _R,
  ay = SR,
  XR = bR,
  qR = kR,
  ZR = (e, n, o) => {
    const i = new Map(),
      a = { platform: UR, ...o },
      l = { ...a.platform, _c: i };
    return wR(e, n, { ...a, platform: l });
  };
var JR = typeof document < 'u',
  ex = function () {},
  zl = JR ? w.useLayoutEffect : ex;
function Gl(e, n) {
  if (e === n) return !0;
  if (typeof e != typeof n) return !1;
  if (typeof e == 'function' && e.toString() === n.toString()) return !0;
  let o, i, a;
  if (e && n && typeof e == 'object') {
    if (Array.isArray(e)) {
      if (((o = e.length), o !== n.length)) return !1;
      for (i = o; i-- !== 0; ) if (!Gl(e[i], n[i])) return !1;
      return !0;
    }
    if (((a = Object.keys(e)), (o = a.length), o !== Object.keys(n).length))
      return !1;
    for (i = o; i-- !== 0; ) if (!{}.hasOwnProperty.call(n, a[i])) return !1;
    for (i = o; i-- !== 0; ) {
      const l = a[i];
      if (!(l === '_owner' && e.$$typeof) && !Gl(e[l], n[l])) return !1;
    }
    return !0;
  }
  return e !== e && n !== n;
}
function s0(e) {
  return typeof window > 'u'
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ly(e, n) {
  const o = s0(e);
  return Math.round(n * o) / o;
}
function Wf(e) {
  const n = w.useRef(e);
  return (
    zl(() => {
      n.current = e;
    }),
    n
  );
}
function tx(e) {
  e === void 0 && (e = {});
  const {
      placement: n = 'bottom',
      strategy: o = 'absolute',
      middleware: i = [],
      platform: a,
      elements: { reference: l, floating: c } = {},
      transform: f = !0,
      whileElementsMounted: p,
      open: m
    } = e,
    [v, y] = w.useState({
      x: 0,
      y: 0,
      strategy: o,
      placement: n,
      middlewareData: {},
      isPositioned: !1
    }),
    [C, S] = w.useState(i);
  Gl(C, i) || S(i);
  const [E, _] = w.useState(null),
    [b, N] = w.useState(null),
    R = w.useCallback(O => {
      O !== W.current && ((W.current = O), _(O));
    }, []),
    T = w.useCallback(O => {
      O !== H.current && ((H.current = O), N(O));
    }, []),
    k = l || E,
    $ = c || b,
    W = w.useRef(null),
    H = w.useRef(null),
    F = w.useRef(v),
    G = p != null,
    q = Wf(p),
    ce = Wf(a),
    ye = Wf(m),
    le = w.useCallback(() => {
      if (!W.current || !H.current) return;
      const O = { placement: n, strategy: o, middleware: C };
      (ce.current && (O.platform = ce.current),
        ZR(W.current, H.current, O).then(X => {
          const U = { ...X, isPositioned: ye.current !== !1 };
          Z.current &&
            !Gl(F.current, U) &&
            ((F.current = U),
            zd.flushSync(() => {
              y(U);
            }));
        }));
    }, [C, n, o, ce, ye]);
  zl(() => {
    m === !1 &&
      F.current.isPositioned &&
      ((F.current.isPositioned = !1), y(O => ({ ...O, isPositioned: !1 })));
  }, [m]);
  const Z = w.useRef(!1);
  (zl(
    () => (
      (Z.current = !0),
      () => {
        Z.current = !1;
      }
    ),
    []
  ),
    zl(() => {
      if ((k && (W.current = k), $ && (H.current = $), k && $)) {
        if (q.current) return q.current(k, $, le);
        le();
      }
    }, [k, $, le, q, G]));
  const me = w.useMemo(
      () => ({ reference: W, floating: H, setReference: R, setFloating: T }),
      [R, T]
    ),
    fe = w.useMemo(() => ({ reference: k, floating: $ }), [k, $]),
    ee = w.useMemo(() => {
      const O = { position: o, left: 0, top: 0 };
      if (!fe.floating) return O;
      const X = ly(fe.floating, v.x),
        U = ly(fe.floating, v.y);
      return f
        ? {
            ...O,
            transform: 'translate(' + X + 'px, ' + U + 'px)',
            ...(s0(fe.floating) >= 1.5 && { willChange: 'transform' })
          }
        : { position: o, left: X, top: U };
    }, [o, f, fe.floating, v.x, v.y]);
  return w.useMemo(
    () => ({ ...v, update: le, refs: me, elements: fe, floatingStyles: ee }),
    [v, le, me, fe, ee]
  );
}
const nx = e => {
    function n(o) {
      return {}.hasOwnProperty.call(o, 'current');
    }
    return {
      name: 'arrow',
      options: e,
      fn(o) {
        const { element: i, padding: a } = typeof e == 'function' ? e(o) : e;
        return i && n(i)
          ? i.current != null
            ? ay({ element: i.current, padding: a }).fn(o)
            : {}
          : i
            ? ay({ element: i, padding: a }).fn(o)
            : {};
      }
    };
  },
  tA = (e, n) => {
    const o = HR(e);
    return { name: o.name, fn: o.fn, options: [e, n] };
  },
  nA = (e, n) => {
    const o = KR(e);
    return { name: o.name, fn: o.fn, options: [e, n] };
  },
  rA = (e, n) => ({ fn: qR(e).fn, options: [e, n] }),
  oA = (e, n) => {
    const o = QR(e);
    return { name: o.name, fn: o.fn, options: [e, n] };
  },
  iA = (e, n) => {
    const o = GR(e);
    return { name: o.name, fn: o.fn, options: [e, n] };
  },
  sA = (e, n) => {
    const o = YR(e);
    return { name: o.name, fn: o.fn, options: [e, n] };
  },
  aA = (e, n) => {
    const o = XR(e);
    return { name: o.name, fn: o.fn, options: [e, n] };
  },
  lA = (e, n) => {
    const o = nx(e);
    return { name: o.name, fn: o.fn, options: [e, n] };
  };
function a0(e) {
  const n = w.useRef(void 0),
    o = w.useCallback(i => {
      const a = e.map(l => {
        if (l != null) {
          if (typeof l == 'function') {
            const c = l,
              f = c(i);
            return typeof f == 'function'
              ? f
              : () => {
                  c(null);
                };
          }
          return (
            (l.current = i),
            () => {
              l.current = null;
            }
          );
        }
      });
      return () => {
        a.forEach(l => (l == null ? void 0 : l()));
      };
    }, e);
  return w.useMemo(
    () =>
      e.every(i => i == null)
        ? null
        : i => {
            (n.current && (n.current(), (n.current = void 0)),
              i != null && (n.current = o(i)));
          },
    e
  );
}
const rx = 'data-floating-ui-focusable',
  uy = 'active',
  cy = 'selected',
  ox = { ...Fd };
let fy = !1,
  ix = 0;
const dy = () => 'floating-ui-' + Math.random().toString(36).slice(2, 6) + ix++;
function sx() {
  const [e, n] = w.useState(() => (fy ? dy() : void 0));
  return (
    Qn(() => {
      e == null && n(dy());
    }, []),
    w.useEffect(() => {
      fy = !0;
    }, []),
    e
  );
}
const ax = ox.useId,
  l0 = ax || sx;
function lx() {
  const e = new Map();
  return {
    emit(n, o) {
      var i;
      (i = e.get(n)) == null || i.forEach(a => a(o));
    },
    on(n, o) {
      (e.has(n) || e.set(n, new Set()), e.get(n).add(o));
    },
    off(n, o) {
      var i;
      (i = e.get(n)) == null || i.delete(o);
    }
  };
}
const ux = w.createContext(null),
  cx = w.createContext(null),
  rp = () => {
    var e;
    return ((e = w.useContext(ux)) == null ? void 0 : e.id) || null;
  },
  op = () => w.useContext(cx);
function ip(e) {
  return 'data-floating-ui-' + e;
}
function an(e) {
  e.current !== -1 && (clearTimeout(e.current), (e.current = -1));
}
const py = ip('safe-polygon');
function jl(e, n, o) {
  if (o && !wd(o)) return 0;
  if (typeof e == 'number') return e;
  if (typeof e == 'function') {
    const i = e();
    return typeof i == 'number' ? i : i == null ? void 0 : i[n];
  }
  return e == null ? void 0 : e[n];
}
function Hf(e) {
  return typeof e == 'function' ? e() : e;
}
function uA(e, n) {
  n === void 0 && (n = {});
  const { open: o, onOpenChange: i, dataRef: a, events: l, elements: c } = e,
    {
      enabled: f = !0,
      delay: p = 0,
      handleClose: m = null,
      mouseOnly: v = !1,
      restMs: y = 0,
      move: C = !0
    } = n,
    S = op(),
    E = rp(),
    _ = Rl(m),
    b = Rl(p),
    N = Rl(o),
    R = Rl(y),
    T = w.useRef(),
    k = w.useRef(-1),
    $ = w.useRef(),
    W = w.useRef(-1),
    H = w.useRef(!0),
    F = w.useRef(!1),
    G = w.useRef(() => {}),
    q = w.useRef(!1),
    ce = Wn(() => {
      var ee;
      const O = (ee = a.current.openEvent) == null ? void 0 : ee.type;
      return (O == null ? void 0 : O.includes('mouse')) && O !== 'mousedown';
    });
  (w.useEffect(() => {
    if (!f) return;
    function ee(O) {
      let { open: X } = O;
      X || (an(k), an(W), (H.current = !0), (q.current = !1));
    }
    return (
      l.on('openchange', ee),
      () => {
        l.off('openchange', ee);
      }
    );
  }, [f, l]),
    w.useEffect(() => {
      if (!f || !_.current || !o) return;
      function ee(X) {
        ce() && i(!1, X, 'hover');
      }
      const O = ho(c.floating).documentElement;
      return (
        O.addEventListener('mouseleave', ee),
        () => {
          O.removeEventListener('mouseleave', ee);
        }
      );
    }, [c.floating, o, i, f, _, ce]));
  const ye = w.useCallback(
      function (ee, O, X) {
        (O === void 0 && (O = !0), X === void 0 && (X = 'hover'));
        const U = jl(b.current, 'close', T.current);
        U && !$.current
          ? (an(k), (k.current = window.setTimeout(() => i(!1, ee, X), U)))
          : O && (an(k), i(!1, ee, X));
      },
      [b, i]
    ),
    le = Wn(() => {
      (G.current(), ($.current = void 0));
    }),
    Z = Wn(() => {
      if (F.current) {
        const ee = ho(c.floating).body;
        ((ee.style.pointerEvents = ''),
          ee.removeAttribute(py),
          (F.current = !1));
      }
    }),
    me = Wn(() =>
      a.current.openEvent
        ? ['click', 'mousedown'].includes(a.current.openEvent.type)
        : !1
    );
  (w.useEffect(() => {
    if (!f) return;
    function ee(x) {
      if (
        (an(k),
        (H.current = !1),
        (v && !wd(T.current)) || (Hf(R.current) > 0 && !jl(b.current, 'open')))
      )
        return;
      const B = jl(b.current, 'open', T.current);
      B
        ? (k.current = window.setTimeout(() => {
            N.current || i(!0, x, 'hover');
          }, B))
        : o || i(!0, x, 'hover');
    }
    function O(x) {
      if (me()) {
        Z();
        return;
      }
      G.current();
      const B = ho(c.floating);
      if ((an(W), (q.current = !1), _.current && a.current.floatingContext)) {
        (o || an(k),
          ($.current = _.current({
            ...a.current.floatingContext,
            tree: S,
            x: x.clientX,
            y: x.clientY,
            onClose() {
              (Z(), le(), me() || ye(x, !0, 'safe-polygon'));
            }
          })));
        const te = $.current;
        (B.addEventListener('mousemove', te),
          (G.current = () => {
            B.removeEventListener('mousemove', te);
          }));
        return;
      }
      (T.current === 'touch' ? !zs(c.floating, x.relatedTarget) : !0) && ye(x);
    }
    function X(x) {
      me() ||
        (a.current.floatingContext &&
          (_.current == null ||
            _.current({
              ...a.current.floatingContext,
              tree: S,
              x: x.clientX,
              y: x.clientY,
              onClose() {
                (Z(), le(), me() || ye(x));
              }
            })(x)));
    }
    function U() {
      an(k);
    }
    function L(x) {
      me() || ye(x, !1);
    }
    if (Ze(c.domReference)) {
      const x = c.domReference,
        B = c.floating;
      return (
        o && x.addEventListener('mouseleave', X),
        C && x.addEventListener('mousemove', ee, { once: !0 }),
        x.addEventListener('mouseenter', ee),
        x.addEventListener('mouseleave', O),
        B &&
          (B.addEventListener('mouseleave', X),
          B.addEventListener('mouseenter', U),
          B.addEventListener('mouseleave', L)),
        () => {
          (o && x.removeEventListener('mouseleave', X),
            C && x.removeEventListener('mousemove', ee),
            x.removeEventListener('mouseenter', ee),
            x.removeEventListener('mouseleave', O),
            B &&
              (B.removeEventListener('mouseleave', X),
              B.removeEventListener('mouseenter', U),
              B.removeEventListener('mouseleave', L)));
        }
      );
    }
  }, [c, f, e, v, C, ye, le, Z, i, o, N, S, b, _, a, me, R]),
    Qn(() => {
      var ee;
      if (
        f &&
        o &&
        (ee = _.current) != null &&
        (ee = ee.__options) != null &&
        ee.blockPointerEvents &&
        ce()
      ) {
        F.current = !0;
        const X = c.floating;
        if (Ze(c.domReference) && X) {
          var O;
          const U = ho(c.floating).body;
          U.setAttribute(py, '');
          const L = c.domReference,
            x =
              S == null ||
              (O = S.nodesRef.current.find(B => B.id === E)) == null ||
              (O = O.context) == null
                ? void 0
                : O.elements.floating;
          return (
            x && (x.style.pointerEvents = ''),
            (U.style.pointerEvents = 'none'),
            (L.style.pointerEvents = 'auto'),
            (X.style.pointerEvents = 'auto'),
            () => {
              ((U.style.pointerEvents = ''),
                (L.style.pointerEvents = ''),
                (X.style.pointerEvents = ''));
            }
          );
        }
      }
    }, [f, o, E, c, S, _, ce]),
    Qn(() => {
      o || ((T.current = void 0), (q.current = !1), le(), Z());
    }, [o, le, Z]),
    w.useEffect(
      () => () => {
        (le(), an(k), an(W), Z());
      },
      [f, c.domReference, le, Z]
    ));
  const fe = w.useMemo(() => {
    function ee(O) {
      T.current = O.pointerType;
    }
    return {
      onPointerDown: ee,
      onPointerEnter: ee,
      onMouseMove(O) {
        const { nativeEvent: X } = O;
        function U() {
          !H.current && !N.current && i(!0, X, 'hover');
        }
        (v && !wd(T.current)) ||
          o ||
          Hf(R.current) === 0 ||
          (q.current && O.movementX ** 2 + O.movementY ** 2 < 2) ||
          (an(W),
          T.current === 'touch'
            ? U()
            : ((q.current = !0),
              (W.current = window.setTimeout(U, Hf(R.current)))));
      }
    };
  }, [v, i, o, N, R]);
  return w.useMemo(() => (f ? { reference: fe } : {}), [f, fe]);
}
const Sd = () => {},
  u0 = w.createContext({
    delay: 0,
    initialDelay: 0,
    timeoutMs: 0,
    currentId: null,
    setCurrentId: Sd,
    setState: Sd,
    isInstantPhase: !1
  }),
  fx = () => w.useContext(u0);
function cA(e) {
  const { children: n, delay: o, timeoutMs: i = 0 } = e,
    [a, l] = w.useReducer((p, m) => ({ ...p, ...m }), {
      delay: o,
      timeoutMs: i,
      initialDelay: o,
      currentId: null,
      isInstantPhase: !1
    }),
    c = w.useRef(null),
    f = w.useCallback(p => {
      l({ currentId: p });
    }, []);
  return (
    Qn(() => {
      a.currentId
        ? c.current === null
          ? (c.current = a.currentId)
          : a.isInstantPhase || l({ isInstantPhase: !0 })
        : (a.isInstantPhase && l({ isInstantPhase: !1 }), (c.current = null));
    }, [a.currentId, a.isInstantPhase]),
    D.jsx(u0.Provider, {
      value: w.useMemo(() => ({ ...a, setState: l, setCurrentId: f }), [a, f]),
      children: n
    })
  );
}
function fA(e, n) {
  n === void 0 && (n = {});
  const { open: o, onOpenChange: i, floatingId: a } = e,
    { id: l, enabled: c = !0 } = n,
    f = l ?? a,
    p = fx(),
    {
      currentId: m,
      setCurrentId: v,
      initialDelay: y,
      setState: C,
      timeoutMs: S
    } = p;
  return (
    Qn(() => {
      c &&
        m &&
        (C({ delay: { open: 1, close: jl(y, 'close') } }), m !== f && i(!1));
    }, [c, f, i, C, m, y]),
    Qn(() => {
      function E() {
        (i(!1), C({ delay: y, currentId: null }));
      }
      if (c && m && !o && m === f) {
        if (S) {
          const _ = window.setTimeout(E, S);
          return () => {
            clearTimeout(_);
          };
        }
        E();
      }
    }, [c, o, C, m, f, i, y, S]),
    Qn(() => {
      c && (v === Sd || !o || v(f));
    }, [c, o, v, f]),
    p
  );
}
const dx = {
    pointerdown: 'onPointerDown',
    mousedown: 'onMouseDown',
    click: 'onClick'
  },
  px = {
    pointerdown: 'onPointerDownCapture',
    mousedown: 'onMouseDownCapture',
    click: 'onClickCapture'
  },
  hy = e => {
    var n, o;
    return {
      escapeKey:
        typeof e == 'boolean'
          ? e
          : (n = e == null ? void 0 : e.escapeKey) != null
            ? n
            : !1,
      outsidePress:
        typeof e == 'boolean'
          ? e
          : (o = e == null ? void 0 : e.outsidePress) != null
            ? o
            : !0
    };
  };
function dA(e, n) {
  n === void 0 && (n = {});
  const { open: o, onOpenChange: i, elements: a, dataRef: l } = e,
    {
      enabled: c = !0,
      escapeKey: f = !0,
      outsidePress: p = !0,
      outsidePressEvent: m = 'pointerdown',
      referencePress: v = !1,
      referencePressEvent: y = 'pointerdown',
      ancestorScroll: C = !1,
      bubbles: S,
      capture: E
    } = n,
    _ = op(),
    b = Wn(typeof p == 'function' ? p : () => !1),
    N = typeof p == 'function' ? b : p,
    R = w.useRef(!1),
    { escapeKey: T, outsidePress: k } = hy(S),
    { escapeKey: $, outsidePress: W } = hy(E),
    H = w.useRef(!1),
    F = Wn(Z => {
      var me;
      if (!o || !c || !f || Z.key !== 'Escape' || H.current) return;
      const fe = (me = l.current.floatingContext) == null ? void 0 : me.nodeId,
        ee = _ ? Fl(_.nodesRef.current, fe) : [];
      if (!T && (Z.stopPropagation(), ee.length > 0)) {
        let O = !0;
        if (
          (ee.forEach(X => {
            var U;
            if (
              (U = X.context) != null &&
              U.open &&
              !X.context.dataRef.current.__escapeKeyBubbles
            ) {
              O = !1;
              return;
            }
          }),
          !O)
        )
          return;
      }
      i(!1, fR(Z) ? Z.nativeEvent : Z, 'escape-key');
    }),
    G = Wn(Z => {
      var me;
      const fe = () => {
        var ee;
        (F(Z), (ee = pi(Z)) == null || ee.removeEventListener('keydown', fe));
      };
      (me = pi(Z)) == null || me.addEventListener('keydown', fe);
    }),
    q = Wn(Z => {
      var me;
      const fe = l.current.insideReactTree;
      l.current.insideReactTree = !1;
      const ee = R.current;
      if (
        ((R.current = !1),
        (m === 'click' && ee) || fe || (typeof N == 'function' && !N(Z)))
      )
        return;
      const O = pi(Z),
        X = '[' + ip('inert') + ']',
        U = ho(a.floating).querySelectorAll(X);
      let L = Ze(O) ? O : null;
      for (; L && !ar(L); ) {
        const te = lr(L);
        if (ar(te) || !Ze(te)) break;
        L = te;
      }
      if (
        U.length &&
        Ze(O) &&
        !aR(O) &&
        !zs(O, a.floating) &&
        Array.from(U).every(te => !zs(L, te))
      )
        return;
      if (fn(O) && le) {
        const te = ar(O),
          J = cn(O),
          de = /auto|scroll/,
          ae = te || de.test(J.overflowX),
          _e = te || de.test(J.overflowY),
          Me = ae && O.clientWidth > 0 && O.scrollWidth > O.clientWidth,
          Ue = _e && O.clientHeight > 0 && O.scrollHeight > O.clientHeight,
          Ie = J.direction === 'rtl',
          We =
            Ue &&
            (Ie
              ? Z.offsetX <= O.offsetWidth - O.clientWidth
              : Z.offsetX > O.clientWidth),
          mt = Me && Z.offsetY > O.clientHeight;
        if (We || mt) return;
      }
      const x = (me = l.current.floatingContext) == null ? void 0 : me.nodeId,
        B =
          _ &&
          Fl(_.nodesRef.current, x).some(te => {
            var J;
            return Bf(
              Z,
              (J = te.context) == null ? void 0 : J.elements.floating
            );
          });
      if (Bf(Z, a.floating) || Bf(Z, a.domReference) || B) return;
      const Q = _ ? Fl(_.nodesRef.current, x) : [];
      if (Q.length > 0) {
        let te = !0;
        if (
          (Q.forEach(J => {
            var de;
            if (
              (de = J.context) != null &&
              de.open &&
              !J.context.dataRef.current.__outsidePressBubbles
            ) {
              te = !1;
              return;
            }
          }),
          !te)
        )
          return;
      }
      i(!1, Z, 'outside-press');
    }),
    ce = Wn(Z => {
      var me;
      const fe = () => {
        var ee;
        (q(Z), (ee = pi(Z)) == null || ee.removeEventListener(m, fe));
      };
      (me = pi(Z)) == null || me.addEventListener(m, fe);
    });
  (w.useEffect(() => {
    if (!o || !c) return;
    ((l.current.__escapeKeyBubbles = T), (l.current.__outsidePressBubbles = k));
    let Z = -1;
    function me(U) {
      i(!1, U, 'ancestor-scroll');
    }
    function fe() {
      (window.clearTimeout(Z), (H.current = !0));
    }
    function ee() {
      Z = window.setTimeout(
        () => {
          H.current = !1;
        },
        uu() ? 5 : 0
      );
    }
    const O = ho(a.floating);
    (f &&
      (O.addEventListener('keydown', $ ? G : F, $),
      O.addEventListener('compositionstart', fe),
      O.addEventListener('compositionend', ee)),
      N && O.addEventListener(m, W ? ce : q, W));
    let X = [];
    return (
      C &&
        (Ze(a.domReference) && (X = Wr(a.domReference)),
        Ze(a.floating) && (X = X.concat(Wr(a.floating))),
        !Ze(a.reference) &&
          a.reference &&
          a.reference.contextElement &&
          (X = X.concat(Wr(a.reference.contextElement)))),
      (X = X.filter(U => {
        var L;
        return U !== ((L = O.defaultView) == null ? void 0 : L.visualViewport);
      })),
      X.forEach(U => {
        U.addEventListener('scroll', me, { passive: !0 });
      }),
      () => {
        (f &&
          (O.removeEventListener('keydown', $ ? G : F, $),
          O.removeEventListener('compositionstart', fe),
          O.removeEventListener('compositionend', ee)),
          N && O.removeEventListener(m, W ? ce : q, W),
          X.forEach(U => {
            U.removeEventListener('scroll', me);
          }),
          window.clearTimeout(Z));
      }
    );
  }, [l, a, f, N, m, o, i, C, c, T, k, F, $, G, q, W, ce]),
    w.useEffect(() => {
      l.current.insideReactTree = !1;
    }, [l, N, m]));
  const ye = w.useMemo(
      () => ({
        onKeyDown: F,
        ...(v && {
          [dx[y]]: Z => {
            i(!1, Z.nativeEvent, 'reference-press');
          },
          ...(y !== 'click' && {
            onClick(Z) {
              i(!1, Z.nativeEvent, 'reference-press');
            }
          })
        })
      }),
      [F, i, v, y]
    ),
    le = w.useMemo(() => {
      function Z(me) {
        me.button === 0 && (R.current = !0);
      }
      return {
        onKeyDown: F,
        onMouseDown: Z,
        onMouseUp: Z,
        [px[m]]: () => {
          l.current.insideReactTree = !0;
        }
      };
    }, [F, m, l]);
  return w.useMemo(
    () => (c ? { reference: ye, floating: le } : {}),
    [c, ye, le]
  );
}
function hx(e) {
  const { open: n = !1, onOpenChange: o, elements: i } = e,
    a = l0(),
    l = w.useRef({}),
    [c] = w.useState(() => lx()),
    f = rp() != null,
    [p, m] = w.useState(i.reference),
    v = Wn((S, E, _) => {
      ((l.current.openEvent = S ? E : void 0),
        c.emit('openchange', { open: S, event: E, reason: _, nested: f }),
        o == null || o(S, E, _));
    }),
    y = w.useMemo(() => ({ setPositionReference: m }), []),
    C = w.useMemo(
      () => ({
        reference: p || i.reference || null,
        floating: i.floating || null,
        domReference: i.reference
      }),
      [p, i.reference, i.floating]
    );
  return w.useMemo(
    () => ({
      dataRef: l,
      open: n,
      onOpenChange: v,
      elements: C,
      events: c,
      floatingId: a,
      refs: y
    }),
    [n, v, C, c, a, y]
  );
}
function pA(e) {
  e === void 0 && (e = {});
  const { nodeId: n } = e,
    o = hx({
      ...e,
      elements: { reference: null, floating: null, ...e.elements }
    }),
    i = e.rootContext || o,
    a = i.elements,
    [l, c] = w.useState(null),
    [f, p] = w.useState(null),
    v = (a == null ? void 0 : a.domReference) || l,
    y = w.useRef(null),
    C = op();
  Qn(() => {
    v && (y.current = v);
  }, [v]);
  const S = tx({ ...e, elements: { ...a, ...(f && { reference: f }) } }),
    E = w.useCallback(
      T => {
        const k = Ze(T)
          ? {
              getBoundingClientRect: () => T.getBoundingClientRect(),
              getClientRects: () => T.getClientRects(),
              contextElement: T
            }
          : T;
        (p(k), S.refs.setReference(k));
      },
      [S.refs]
    ),
    _ = w.useCallback(
      T => {
        ((Ze(T) || T === null) && ((y.current = T), c(T)),
          (Ze(S.refs.reference.current) ||
            S.refs.reference.current === null ||
            (T !== null && !Ze(T))) &&
            S.refs.setReference(T));
      },
      [S.refs]
    ),
    b = w.useMemo(
      () => ({
        ...S.refs,
        setReference: _,
        setPositionReference: E,
        domReference: y
      }),
      [S.refs, _, E]
    ),
    N = w.useMemo(() => ({ ...S.elements, domReference: v }), [S.elements, v]),
    R = w.useMemo(
      () => ({ ...S, ...i, refs: b, elements: N, nodeId: n }),
      [S, b, N, n, i]
    );
  return (
    Qn(() => {
      i.dataRef.current.floatingContext = R;
      const T = C == null ? void 0 : C.nodesRef.current.find(k => k.id === n);
      T && (T.context = R);
    }),
    w.useMemo(() => ({ ...S, context: R, refs: b, elements: N }), [S, b, N, R])
  );
}
function Kf() {
  return oR() && rR();
}
function hA(e, n) {
  n === void 0 && (n = {});
  const { open: o, onOpenChange: i, events: a, dataRef: l, elements: c } = e,
    { enabled: f = !0, visibleOnly: p = !0 } = n,
    m = w.useRef(!1),
    v = w.useRef(-1),
    y = w.useRef(!0);
  (w.useEffect(() => {
    if (!f) return;
    const S = Ht(c.domReference);
    function E() {
      !o &&
        fn(c.domReference) &&
        c.domReference === ey(ho(c.domReference)) &&
        (m.current = !0);
    }
    function _() {
      y.current = !0;
    }
    function b() {
      y.current = !1;
    }
    return (
      S.addEventListener('blur', E),
      Kf() &&
        (S.addEventListener('keydown', _, !0),
        S.addEventListener('pointerdown', b, !0)),
      () => {
        (S.removeEventListener('blur', E),
          Kf() &&
            (S.removeEventListener('keydown', _, !0),
            S.removeEventListener('pointerdown', b, !0)));
      }
    );
  }, [c.domReference, o, f]),
    w.useEffect(() => {
      if (!f) return;
      function S(E) {
        let { reason: _ } = E;
        (_ === 'reference-press' || _ === 'escape-key') && (m.current = !0);
      }
      return (
        a.on('openchange', S),
        () => {
          a.off('openchange', S);
        }
      );
    }, [a, f]),
    w.useEffect(
      () => () => {
        an(v);
      },
      []
    ));
  const C = w.useMemo(
    () => ({
      onMouseLeave() {
        m.current = !1;
      },
      onFocus(S) {
        if (m.current) return;
        const E = pi(S.nativeEvent);
        if (p && Ze(E)) {
          if (Kf() && !S.relatedTarget) {
            if (!y.current && !lR(E)) return;
          } else if (!uR(E)) return;
        }
        i(!0, S.nativeEvent, 'focus');
      },
      onBlur(S) {
        m.current = !1;
        const E = S.relatedTarget,
          _ = S.nativeEvent,
          b =
            Ze(E) &&
            E.hasAttribute(ip('focus-guard')) &&
            E.getAttribute('data-type') === 'outside';
        v.current = window.setTimeout(() => {
          var N;
          const R = ey(
            c.domReference ? c.domReference.ownerDocument : document
          );
          (!E && R === c.domReference) ||
            zs(
              (N = l.current.floatingContext) == null
                ? void 0
                : N.refs.floating.current,
              R
            ) ||
            zs(c.domReference, R) ||
            b ||
            i(!1, _, 'focus');
        });
      }
    }),
    [l, c.domReference, i, p]
  );
  return w.useMemo(() => (f ? { reference: C } : {}), [f, C]);
}
function Qf(e, n, o) {
  const i = new Map(),
    a = o === 'item';
  let l = e;
  if (a && e) {
    const { [uy]: c, [cy]: f, ...p } = e;
    l = p;
  }
  return {
    ...(o === 'floating' && { tabIndex: -1, [rx]: '' }),
    ...l,
    ...n
      .map(c => {
        const f = c ? c[o] : null;
        return typeof f == 'function' ? (e ? f(e) : null) : f;
      })
      .concat(e)
      .reduce(
        (c, f) => (
          f &&
            Object.entries(f).forEach(p => {
              let [m, v] = p;
              if (!(a && [uy, cy].includes(m)))
                if (m.indexOf('on') === 0) {
                  if ((i.has(m) || i.set(m, []), typeof v == 'function')) {
                    var y;
                    ((y = i.get(m)) == null || y.push(v),
                      (c[m] = function () {
                        for (
                          var C, S = arguments.length, E = new Array(S), _ = 0;
                          _ < S;
                          _++
                        )
                          E[_] = arguments[_];
                        return (C = i.get(m)) == null
                          ? void 0
                          : C.map(b => b(...E)).find(b => b !== void 0);
                      }));
                  }
                } else c[m] = v;
            }),
          c
        ),
        {}
      )
  };
}
function mA(e) {
  e === void 0 && (e = []);
  const n = e.map(f => (f == null ? void 0 : f.reference)),
    o = e.map(f => (f == null ? void 0 : f.floating)),
    i = e.map(f => (f == null ? void 0 : f.item)),
    a = w.useCallback(f => Qf(f, e, 'reference'), n),
    l = w.useCallback(f => Qf(f, e, 'floating'), o),
    c = w.useCallback(f => Qf(f, e, 'item'), i);
  return w.useMemo(
    () => ({ getReferenceProps: a, getFloatingProps: l, getItemProps: c }),
    [a, l, c]
  );
}
const mx = new Map([
  ['select', 'listbox'],
  ['combobox', 'listbox'],
  ['label', !1]
]);
function vA(e, n) {
  var o, i;
  n === void 0 && (n = {});
  const { open: a, elements: l, floatingId: c } = e,
    { enabled: f = !0, role: p = 'dialog' } = n,
    m = l0(),
    v = ((o = l.domReference) == null ? void 0 : o.id) || m,
    y = w.useMemo(() => {
      var R;
      return ((R = cR(l.floating)) == null ? void 0 : R.id) || c;
    }, [l.floating, c]),
    C = (i = mx.get(p)) != null ? i : p,
    E = rp() != null,
    _ = w.useMemo(
      () =>
        C === 'tooltip' || p === 'label'
          ? {
              ['aria-' + (p === 'label' ? 'labelledby' : 'describedby')]: a
                ? y
                : void 0
            }
          : {
              'aria-expanded': a ? 'true' : 'false',
              'aria-haspopup': C === 'alertdialog' ? 'dialog' : C,
              'aria-controls': a ? y : void 0,
              ...(C === 'listbox' && { role: 'combobox' }),
              ...(C === 'menu' && { id: v }),
              ...(C === 'menu' && E && { role: 'menuitem' }),
              ...(p === 'select' && { 'aria-autocomplete': 'none' }),
              ...(p === 'combobox' && { 'aria-autocomplete': 'list' })
            },
      [C, y, E, a, v, p]
    ),
    b = w.useMemo(() => {
      const R = { id: y, ...(C && { role: C }) };
      return C === 'tooltip' || p === 'label'
        ? R
        : { ...R, ...(C === 'menu' && { 'aria-labelledby': v }) };
    }, [C, y, v, p]),
    N = w.useCallback(
      R => {
        let { active: T, selected: k } = R;
        const $ = { role: 'option', ...(T && { id: y + '-fui-option' }) };
        switch (p) {
          case 'select':
          case 'combobox':
            return { ...$, 'aria-selected': k };
        }
        return {};
      },
      [y, p]
    );
  return w.useMemo(
    () => (f ? { reference: _, floating: b, item: N } : {}),
    [f, _, b, N]
  );
}
var sp = {
  root: 'm_d57069b5',
  content: 'm_b1336c6',
  viewport: 'm_c0783ff9',
  viewportInner: 'm_f8f631dd',
  scrollbar: 'm_c44ba933',
  thumb: 'm_d8b5e363',
  corner: 'm_21657268'
};
const [vx, dn] = ou('ScrollArea.Root component was not found in tree');
function Ti(e, n) {
  const o = fo(n);
  Ii(() => {
    let i = 0;
    if (e) {
      const a = new ResizeObserver(() => {
        (cancelAnimationFrame(i), (i = window.requestAnimationFrame(o)));
      });
      return (
        a.observe(e),
        () => {
          (window.cancelAnimationFrame(i), a.unobserve(e));
        }
      );
    }
  }, [e, o]);
}
const yx = w.forwardRef((e, n) => {
    const { style: o, ...i } = e,
      a = dn(),
      [l, c] = w.useState(0),
      [f, p] = w.useState(0),
      m = !!(l && f);
    return (
      Ti(a.scrollbarX, () => {
        var y;
        const v = ((y = a.scrollbarX) == null ? void 0 : y.offsetHeight) || 0;
        (a.onCornerHeightChange(v), p(v));
      }),
      Ti(a.scrollbarY, () => {
        var y;
        const v = ((y = a.scrollbarY) == null ? void 0 : y.offsetWidth) || 0;
        (a.onCornerWidthChange(v), c(v));
      }),
      m
        ? D.jsx('div', { ...i, ref: n, style: { ...o, width: l, height: f } })
        : null
    );
  }),
  gx = w.forwardRef((e, n) => {
    const o = dn(),
      i = !!(o.scrollbarX && o.scrollbarY);
    return o.type !== 'scroll' && i ? D.jsx(yx, { ...e, ref: n }) : null;
  }),
  wx = { scrollHideDelay: 1e3, type: 'hover' },
  c0 = w.forwardRef((e, n) => {
    const {
        type: o,
        scrollHideDelay: i,
        scrollbars: a,
        getStyles: l,
        ...c
      } = Ge('ScrollAreaRoot', wx, e),
      [f, p] = w.useState(null),
      [m, v] = w.useState(null),
      [y, C] = w.useState(null),
      [S, E] = w.useState(null),
      [_, b] = w.useState(null),
      [N, R] = w.useState(0),
      [T, k] = w.useState(0),
      [$, W] = w.useState(!1),
      [H, F] = w.useState(!1),
      G = To(n, q => p(q));
    return D.jsx(vx, {
      value: {
        type: o,
        scrollHideDelay: i,
        scrollArea: f,
        viewport: m,
        onViewportChange: v,
        content: y,
        onContentChange: C,
        scrollbarX: S,
        onScrollbarXChange: E,
        scrollbarXEnabled: $,
        onScrollbarXEnabledChange: W,
        scrollbarY: _,
        onScrollbarYChange: b,
        scrollbarYEnabled: H,
        onScrollbarYEnabledChange: F,
        onCornerWidthChange: R,
        onCornerHeightChange: k,
        getStyles: l
      },
      children: D.jsx(Be, {
        ...c,
        ref: G,
        __vars: {
          '--sa-corner-width': a !== 'xy' ? '0px' : `${N}px`,
          '--sa-corner-height': a !== 'xy' ? '0px' : `${T}px`
        }
      })
    });
  });
c0.displayName = '@mantine/core/ScrollAreaRoot';
function f0(e, n) {
  const o = e / n;
  return Number.isNaN(o) ? 0 : o;
}
function du(e) {
  const n = f0(e.viewport, e.content),
    o = e.scrollbar.paddingStart + e.scrollbar.paddingEnd,
    i = (e.scrollbar.size - o) * n;
  return Math.max(i, 18);
}
function d0(e, n) {
  return o => {
    if (e[0] === e[1] || n[0] === n[1]) return n[0];
    const i = (n[1] - n[0]) / (e[1] - e[0]);
    return n[0] + i * (o - e[0]);
  };
}
function Sx(e, [n, o]) {
  return Math.min(o, Math.max(n, e));
}
function my(e, n, o = 'ltr') {
  const i = du(n),
    a = n.scrollbar.paddingStart + n.scrollbar.paddingEnd,
    l = n.scrollbar.size - a,
    c = n.content - n.viewport,
    f = l - i,
    p = o === 'ltr' ? [0, c] : [c * -1, 0],
    m = Sx(e, p);
  return d0([0, c], [0, f])(m);
}
function Cx(e, n, o, i = 'ltr') {
  const a = du(o),
    l = a / 2,
    c = n || l,
    f = a - c,
    p = o.scrollbar.paddingStart + c,
    m = o.scrollbar.size - o.scrollbar.paddingEnd - f,
    v = o.content - o.viewport,
    y = i === 'ltr' ? [0, v] : [v * -1, 0];
  return d0([p, m], y)(e);
}
function p0(e, n) {
  return e > 0 && e < n;
}
function Yl(e) {
  return e ? parseInt(e, 10) : 0;
}
function Co(e, n, { checkForDefaultPrevented: o = !0 } = {}) {
  return i => {
    (e == null || e(i),
      (o === !1 || !i.defaultPrevented) && (n == null || n(i)));
  };
}
const [_x, h0] = ou('ScrollAreaScrollbar was not found in tree'),
  m0 = w.forwardRef((e, n) => {
    const {
        sizes: o,
        hasThumb: i,
        onThumbChange: a,
        onThumbPointerUp: l,
        onThumbPointerDown: c,
        onThumbPositionChange: f,
        onDragScroll: p,
        onWheelScroll: m,
        onResize: v,
        ...y
      } = e,
      C = dn(),
      [S, E] = w.useState(null),
      _ = To(n, F => E(F)),
      b = w.useRef(null),
      N = w.useRef(''),
      { viewport: R } = C,
      T = o.content - o.viewport,
      k = fo(m),
      $ = fo(f),
      W = su(v, 10),
      H = F => {
        if (b.current) {
          const G = F.clientX - b.current.left,
            q = F.clientY - b.current.top;
          p({ x: G, y: q });
        }
      };
    return (
      w.useEffect(() => {
        const F = G => {
          const q = G.target;
          (S == null ? void 0 : S.contains(q)) && k(G, T);
        };
        return (
          document.addEventListener('wheel', F, { passive: !1 }),
          () => document.removeEventListener('wheel', F, { passive: !1 })
        );
      }, [R, S, T, k]),
      w.useEffect($, [o, $]),
      Ti(S, W),
      Ti(C.content, W),
      D.jsx(_x, {
        value: {
          scrollbar: S,
          hasThumb: i,
          onThumbChange: fo(a),
          onThumbPointerUp: fo(l),
          onThumbPositionChange: $,
          onThumbPointerDown: fo(c)
        },
        children: D.jsx('div', {
          ...y,
          ref: _,
          'data-mantine-scrollbar': !0,
          style: { position: 'absolute', ...y.style },
          onPointerDown: Co(e.onPointerDown, F => {
            (F.preventDefault(),
              F.button === 0 &&
                (F.target.setPointerCapture(F.pointerId),
                (b.current = S.getBoundingClientRect()),
                (N.current = document.body.style.webkitUserSelect),
                (document.body.style.webkitUserSelect = 'none'),
                H(F)));
          }),
          onPointerMove: Co(e.onPointerMove, H),
          onPointerUp: Co(e.onPointerUp, F => {
            const G = F.target;
            G.hasPointerCapture(F.pointerId) &&
              (F.preventDefault(), G.releasePointerCapture(F.pointerId));
          }),
          onLostPointerCapture: () => {
            ((document.body.style.webkitUserSelect = N.current),
              (b.current = null));
          }
        })
      })
    );
  }),
  v0 = w.forwardRef((e, n) => {
    const { sizes: o, onSizesChange: i, style: a, ...l } = e,
      c = dn(),
      [f, p] = w.useState(),
      m = w.useRef(null),
      v = To(n, m, c.onScrollbarXChange);
    return (
      w.useEffect(() => {
        m.current && p(getComputedStyle(m.current));
      }, [m]),
      D.jsx(m0, {
        'data-orientation': 'horizontal',
        ...l,
        ref: v,
        sizes: o,
        style: { ...a, '--sa-thumb-width': `${du(o)}px` },
        onThumbPointerDown: y => e.onThumbPointerDown(y.x),
        onDragScroll: y => e.onDragScroll(y.x),
        onWheelScroll: (y, C) => {
          if (c.viewport) {
            const S = c.viewport.scrollLeft + y.deltaX;
            (e.onWheelScroll(S), p0(S, C) && y.preventDefault());
          }
        },
        onResize: () => {
          m.current &&
            c.viewport &&
            f &&
            i({
              content: c.viewport.scrollWidth,
              viewport: c.viewport.offsetWidth,
              scrollbar: {
                size: m.current.clientWidth,
                paddingStart: Yl(f.paddingLeft),
                paddingEnd: Yl(f.paddingRight)
              }
            });
        }
      })
    );
  });
v0.displayName = '@mantine/core/ScrollAreaScrollbarX';
const y0 = w.forwardRef((e, n) => {
  const { sizes: o, onSizesChange: i, style: a, ...l } = e,
    c = dn(),
    [f, p] = w.useState(),
    m = w.useRef(null),
    v = To(n, m, c.onScrollbarYChange);
  return (
    w.useEffect(() => {
      m.current && p(window.getComputedStyle(m.current));
    }, []),
    D.jsx(m0, {
      ...l,
      'data-orientation': 'vertical',
      ref: v,
      sizes: o,
      style: { '--sa-thumb-height': `${du(o)}px`, ...a },
      onThumbPointerDown: y => e.onThumbPointerDown(y.y),
      onDragScroll: y => e.onDragScroll(y.y),
      onWheelScroll: (y, C) => {
        if (c.viewport) {
          const S = c.viewport.scrollTop + y.deltaY;
          (e.onWheelScroll(S), p0(S, C) && y.preventDefault());
        }
      },
      onResize: () => {
        m.current &&
          c.viewport &&
          f &&
          i({
            content: c.viewport.scrollHeight,
            viewport: c.viewport.offsetHeight,
            scrollbar: {
              size: m.current.clientHeight,
              paddingStart: Yl(f.paddingTop),
              paddingEnd: Yl(f.paddingBottom)
            }
          });
      }
    })
  );
});
y0.displayName = '@mantine/core/ScrollAreaScrollbarY';
const pu = w.forwardRef((e, n) => {
  const { orientation: o = 'vertical', ...i } = e,
    { dir: a } = Vb(),
    l = dn(),
    c = w.useRef(null),
    f = w.useRef(0),
    [p, m] = w.useState({
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
    }),
    v = f0(p.viewport, p.content),
    y = {
      ...i,
      sizes: p,
      onSizesChange: m,
      hasThumb: v > 0 && v < 1,
      onThumbChange: S => {
        c.current = S;
      },
      onThumbPointerUp: () => {
        f.current = 0;
      },
      onThumbPointerDown: S => {
        f.current = S;
      }
    },
    C = (S, E) => Cx(S, f.current, p, E);
  return o === 'horizontal'
    ? D.jsx(v0, {
        ...y,
        ref: n,
        onThumbPositionChange: () => {
          if (l.viewport && c.current) {
            const S = l.viewport.scrollLeft,
              E = my(S, p, a);
            c.current.style.transform = `translate3d(${E}px, 0, 0)`;
          }
        },
        onWheelScroll: S => {
          l.viewport && (l.viewport.scrollLeft = S);
        },
        onDragScroll: S => {
          l.viewport && (l.viewport.scrollLeft = C(S, a));
        }
      })
    : o === 'vertical'
      ? D.jsx(y0, {
          ...y,
          ref: n,
          onThumbPositionChange: () => {
            if (l.viewport && c.current) {
              const S = l.viewport.scrollTop,
                E = my(S, p);
              (p.scrollbar.size === 0
                ? c.current.style.setProperty('--thumb-opacity', '0')
                : c.current.style.setProperty('--thumb-opacity', '1'),
                (c.current.style.transform = `translate3d(0, ${E}px, 0)`));
            }
          },
          onWheelScroll: S => {
            l.viewport && (l.viewport.scrollTop = S);
          },
          onDragScroll: S => {
            l.viewport && (l.viewport.scrollTop = C(S));
          }
        })
      : null;
});
pu.displayName = '@mantine/core/ScrollAreaScrollbarVisible';
const ap = w.forwardRef((e, n) => {
  const o = dn(),
    { forceMount: i, ...a } = e,
    [l, c] = w.useState(!1),
    f = e.orientation === 'horizontal',
    p = su(() => {
      if (o.viewport) {
        const m = o.viewport.offsetWidth < o.viewport.scrollWidth,
          v = o.viewport.offsetHeight < o.viewport.scrollHeight;
        c(f ? m : v);
      }
    }, 10);
  return (
    Ti(o.viewport, p),
    Ti(o.content, p),
    i || l
      ? D.jsx(pu, { 'data-state': l ? 'visible' : 'hidden', ...a, ref: n })
      : null
  );
});
ap.displayName = '@mantine/core/ScrollAreaScrollbarAuto';
const g0 = w.forwardRef((e, n) => {
  const { forceMount: o, ...i } = e,
    a = dn(),
    [l, c] = w.useState(!1);
  return (
    w.useEffect(() => {
      const { scrollArea: f } = a;
      let p = 0;
      if (f) {
        const m = () => {
            (window.clearTimeout(p), c(!0));
          },
          v = () => {
            p = window.setTimeout(() => c(!1), a.scrollHideDelay);
          };
        return (
          f.addEventListener('pointerenter', m),
          f.addEventListener('pointerleave', v),
          () => {
            (window.clearTimeout(p),
              f.removeEventListener('pointerenter', m),
              f.removeEventListener('pointerleave', v));
          }
        );
      }
    }, [a.scrollArea, a.scrollHideDelay]),
    o || l
      ? D.jsx(ap, { 'data-state': l ? 'visible' : 'hidden', ...i, ref: n })
      : null
  );
});
g0.displayName = '@mantine/core/ScrollAreaScrollbarHover';
const Ex = w.forwardRef((e, n) => {
    const { forceMount: o, ...i } = e,
      a = dn(),
      l = e.orientation === 'horizontal',
      [c, f] = w.useState('hidden'),
      p = su(() => f('idle'), 100);
    return (
      w.useEffect(() => {
        if (c === 'idle') {
          const m = window.setTimeout(() => f('hidden'), a.scrollHideDelay);
          return () => window.clearTimeout(m);
        }
      }, [c, a.scrollHideDelay]),
      w.useEffect(() => {
        const { viewport: m } = a,
          v = l ? 'scrollLeft' : 'scrollTop';
        if (m) {
          let y = m[v];
          const C = () => {
            const S = m[v];
            (y !== S && (f('scrolling'), p()), (y = S));
          };
          return (
            m.addEventListener('scroll', C),
            () => m.removeEventListener('scroll', C)
          );
        }
      }, [a.viewport, l, p]),
      o || c !== 'hidden'
        ? D.jsx(pu, {
            'data-state': c === 'hidden' ? 'hidden' : 'visible',
            ...i,
            ref: n,
            onPointerEnter: Co(e.onPointerEnter, () => f('interacting')),
            onPointerLeave: Co(e.onPointerLeave, () => f('idle'))
          })
        : null
    );
  }),
  Cd = w.forwardRef((e, n) => {
    const { forceMount: o, ...i } = e,
      a = dn(),
      { onScrollbarXEnabledChange: l, onScrollbarYEnabledChange: c } = a,
      f = e.orientation === 'horizontal';
    return (
      w.useEffect(
        () => (
          f ? l(!0) : c(!0),
          () => {
            f ? l(!1) : c(!1);
          }
        ),
        [f, l, c]
      ),
      a.type === 'hover'
        ? D.jsx(g0, { ...i, ref: n, forceMount: o })
        : a.type === 'scroll'
          ? D.jsx(Ex, { ...i, ref: n, forceMount: o })
          : a.type === 'auto'
            ? D.jsx(ap, { ...i, ref: n, forceMount: o })
            : a.type === 'always'
              ? D.jsx(pu, { ...i, ref: n })
              : null
    );
  });
Cd.displayName = '@mantine/core/ScrollAreaScrollbar';
function bx(e, n = () => {}) {
  let o = { left: e.scrollLeft, top: e.scrollTop },
    i = 0;
  return (
    (function a() {
      const l = { left: e.scrollLeft, top: e.scrollTop },
        c = o.left !== l.left,
        f = o.top !== l.top;
      ((c || f) && n(), (o = l), (i = window.requestAnimationFrame(a)));
    })(),
    () => window.cancelAnimationFrame(i)
  );
}
const w0 = w.forwardRef((e, n) => {
  const { style: o, ...i } = e,
    a = dn(),
    l = h0(),
    { onThumbPositionChange: c } = l,
    f = To(n, v => l.onThumbChange(v)),
    p = w.useRef(void 0),
    m = su(() => {
      p.current && (p.current(), (p.current = void 0));
    }, 100);
  return (
    w.useEffect(() => {
      const { viewport: v } = a;
      if (v) {
        const y = () => {
          if ((m(), !p.current)) {
            const C = bx(v, c);
            ((p.current = C), c());
          }
        };
        return (
          c(),
          v.addEventListener('scroll', y),
          () => v.removeEventListener('scroll', y)
        );
      }
    }, [a.viewport, m, c]),
    D.jsx('div', {
      'data-state': l.hasThumb ? 'visible' : 'hidden',
      ...i,
      ref: f,
      style: {
        width: 'var(--sa-thumb-width)',
        height: 'var(--sa-thumb-height)',
        ...o
      },
      onPointerDownCapture: Co(e.onPointerDownCapture, v => {
        const C = v.target.getBoundingClientRect(),
          S = v.clientX - C.left,
          E = v.clientY - C.top;
        l.onThumbPointerDown({ x: S, y: E });
      }),
      onPointerUp: Co(e.onPointerUp, l.onThumbPointerUp)
    })
  );
});
w0.displayName = '@mantine/core/ScrollAreaThumb';
const _d = w.forwardRef((e, n) => {
  const { forceMount: o, ...i } = e,
    a = h0();
  return o || a.hasThumb ? D.jsx(w0, { ref: n, ...i }) : null;
});
_d.displayName = '@mantine/core/ScrollAreaThumb';
const S0 = w.forwardRef(({ children: e, style: n, onWheel: o, ...i }, a) => {
  const l = dn(),
    c = To(a, l.onViewportChange),
    f = p => {
      if (
        (o == null || o(p), l.scrollbarXEnabled && l.viewport && p.shiftKey)
      ) {
        const {
            scrollTop: m,
            scrollHeight: v,
            clientHeight: y,
            scrollWidth: C,
            clientWidth: S
          } = l.viewport,
          E = m < 1,
          _ = m >= v - y - 1;
        C > S && (E || _) && p.stopPropagation();
      }
    };
  return D.jsx(Be, {
    ...i,
    ref: c,
    onWheel: f,
    style: {
      overflowX: l.scrollbarXEnabled ? 'scroll' : 'hidden',
      overflowY: l.scrollbarYEnabled ? 'scroll' : 'hidden',
      ...n
    },
    children: D.jsx('div', {
      ...l.getStyles('content'),
      ref: l.onContentChange,
      children: e
    })
  });
});
S0.displayName = '@mantine/core/ScrollAreaViewport';
const C0 = { scrollHideDelay: 1e3, type: 'hover', scrollbars: 'xy' },
  Rx = (e, { scrollbarSize: n, overscrollBehavior: o, scrollbars: i }) => {
    let a = o;
    return (
      o &&
        i &&
        (i === 'x' ? (a = `${o} auto`) : i === 'y' && (a = `auto ${o}`)),
      {
        root: {
          '--scrollarea-scrollbar-size': se(n),
          '--scrollarea-over-scroll-behavior': a
        }
      }
    );
  },
  qs = Ct((e, n) => {
    const o = Ge('ScrollArea', C0, e),
      {
        classNames: i,
        className: a,
        style: l,
        styles: c,
        unstyled: f,
        scrollbarSize: p,
        vars: m,
        type: v,
        scrollHideDelay: y,
        viewportProps: C,
        viewportRef: S,
        onScrollPositionChange: E,
        children: _,
        offsetScrollbars: b,
        scrollbars: N,
        onBottomReached: R,
        onTopReached: T,
        overscrollBehavior: k,
        attributes: $,
        ...W
      } = o,
      [H, F] = w.useState(!1),
      [G, q] = w.useState(!1),
      [ce, ye] = w.useState(!1),
      le = Dt({
        name: 'ScrollArea',
        props: o,
        classes: sp,
        className: a,
        style: l,
        classNames: i,
        styles: c,
        unstyled: f,
        attributes: $,
        vars: m,
        varsResolver: Rx
      }),
      Z = w.useRef(null),
      me = a0([S, Z]);
    return (
      w.useEffect(() => {
        if (!Z.current || b !== 'present') return;
        const fe = Z.current,
          ee = new ResizeObserver(() => {
            const {
              scrollHeight: O,
              clientHeight: X,
              scrollWidth: U,
              clientWidth: L
            } = fe;
            (q(O > X), ye(U > L));
          });
        return (ee.observe(fe), () => ee.disconnect());
      }, [Z, b]),
      D.jsxs(c0, {
        getStyles: le,
        type: v === 'never' ? 'always' : v,
        scrollHideDelay: y,
        ref: n,
        scrollbars: N,
        ...le('root'),
        ...W,
        children: [
          D.jsx(S0, {
            ...C,
            ...le('viewport', { style: C == null ? void 0 : C.style }),
            ref: me,
            'data-offset-scrollbars': b === !0 ? 'xy' : b || void 0,
            'data-scrollbars': N || void 0,
            'data-horizontal-hidden': b === 'present' && !ce ? 'true' : void 0,
            'data-vertical-hidden': b === 'present' && !G ? 'true' : void 0,
            onScroll: fe => {
              var U;
              ((U = C == null ? void 0 : C.onScroll) == null || U.call(C, fe),
                E == null ||
                  E({
                    x: fe.currentTarget.scrollLeft,
                    y: fe.currentTarget.scrollTop
                  }));
              const {
                scrollTop: ee,
                scrollHeight: O,
                clientHeight: X
              } = fe.currentTarget;
              (ee - (O - X) >= -0.8 && (R == null || R()),
                ee === 0 && (T == null || T()));
            },
            children: _
          }),
          (N === 'xy' || N === 'x') &&
            D.jsx(Cd, {
              ...le('scrollbar'),
              orientation: 'horizontal',
              'data-hidden':
                v === 'never' || (b === 'present' && !ce) ? !0 : void 0,
              forceMount: !0,
              onMouseEnter: () => F(!0),
              onMouseLeave: () => F(!1),
              children: D.jsx(_d, { ...le('thumb') })
            }),
          (N === 'xy' || N === 'y') &&
            D.jsx(Cd, {
              ...le('scrollbar'),
              orientation: 'vertical',
              'data-hidden':
                v === 'never' || (b === 'present' && !G) ? !0 : void 0,
              forceMount: !0,
              onMouseEnter: () => F(!0),
              onMouseLeave: () => F(!1),
              children: D.jsx(_d, { ...le('thumb') })
            }),
          D.jsx(gx, {
            ...le('corner'),
            'data-hovered': H || void 0,
            'data-hidden': v === 'never' || void 0
          })
        ]
      })
    );
  });
qs.displayName = '@mantine/core/ScrollArea';
const lp = Ct((e, n) => {
  const {
      children: o,
      classNames: i,
      styles: a,
      scrollbarSize: l,
      scrollHideDelay: c,
      type: f,
      dir: p,
      offsetScrollbars: m,
      overscrollBehavior: v,
      viewportRef: y,
      onScrollPositionChange: C,
      unstyled: S,
      variant: E,
      viewportProps: _,
      scrollbars: b,
      style: N,
      vars: R,
      onBottomReached: T,
      onTopReached: k,
      onOverflowChange: $,
      ...W
    } = Ge('ScrollAreaAutosize', C0, e),
    H = w.useRef(null),
    F = a0([y, H]),
    [G, q] = w.useState(!1),
    ce = w.useRef(!1);
  return (
    w.useEffect(() => {
      if (!$) return;
      const ye = H.current;
      if (!ye) return;
      const le = () => {
        const me = ye.scrollHeight > ye.clientHeight;
        me !== G &&
          (ce.current
            ? $ == null || $(me)
            : ((ce.current = !0), me && ($ == null || $(!0))),
          q(me));
      };
      le();
      const Z = new ResizeObserver(le);
      return (Z.observe(ye), () => Z.disconnect());
    }, [$, G]),
    D.jsx(Be, {
      ...W,
      ref: n,
      style: [{ display: 'flex', overflow: 'hidden' }, N],
      children: D.jsx(Be, {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          ...(b === 'y' && { minWidth: 0 }),
          ...(b === 'x' && { minHeight: 0 }),
          ...(b === 'xy' && { minWidth: 0, minHeight: 0 }),
          ...(b === !1 && { minWidth: 0, minHeight: 0 })
        },
        children: D.jsx(qs, {
          classNames: i,
          styles: a,
          scrollHideDelay: c,
          scrollbarSize: l,
          type: f,
          dir: p,
          offsetScrollbars: m,
          overscrollBehavior: v,
          viewportRef: F,
          onScrollPositionChange: C,
          unstyled: S,
          variant: E,
          viewportProps: _,
          vars: R,
          scrollbars: b,
          onBottomReached: T,
          onTopReached: k,
          'data-autosize': 'true',
          children: o
        })
      })
    })
  );
});
qs.classes = sp;
lp.displayName = '@mantine/core/ScrollAreaAutosize';
lp.classes = sp;
qs.Autosize = lp;
var _0 = { root: 'm_87cf2631' };
const xx = { __staticSelector: 'UnstyledButton' },
  hu = Po((e, n) => {
    const o = Ge('UnstyledButton', xx, e),
      {
        className: i,
        component: a = 'button',
        __staticSelector: l,
        unstyled: c,
        classNames: f,
        styles: p,
        style: m,
        attributes: v,
        ...y
      } = o,
      C = Dt({
        name: l,
        props: o,
        classes: _0,
        className: i,
        style: m,
        classNames: f,
        styles: p,
        unstyled: c,
        attributes: v
      });
    return D.jsx(Be, {
      ...C('root', { focusable: !0 }),
      component: a,
      ref: n,
      type: a === 'button' ? 'button' : void 0,
      ...y
    });
  });
hu.classes = _0;
hu.displayName = '@mantine/core/UnstyledButton';
var E0 = { root: 'm_515a97f8' };
const up = Ct((e, n) => {
  const o = Ge('VisuallyHidden', null, e),
    {
      classNames: i,
      className: a,
      style: l,
      styles: c,
      unstyled: f,
      vars: p,
      attributes: m,
      ...v
    } = o,
    y = Dt({
      name: 'VisuallyHidden',
      classes: E0,
      props: o,
      className: a,
      style: l,
      classNames: i,
      styles: c,
      unstyled: f,
      attributes: m
    });
  return D.jsx(Be, { component: 'span', ref: n, ...y('root'), ...v });
});
up.classes = E0;
up.displayName = '@mantine/core/VisuallyHidden';
var b0 = { root: 'm_1b7284a3' };
const Tx = (e, { radius: n, shadow: o }) => ({
    root: {
      '--paper-radius': n === void 0 ? void 0 : Oi(n),
      '--paper-shadow': Mg(o)
    }
  }),
  cp = Po((e, n) => {
    const o = Ge('Paper', null, e),
      {
        classNames: i,
        className: a,
        style: l,
        styles: c,
        unstyled: f,
        withBorder: p,
        vars: m,
        radius: v,
        shadow: y,
        variant: C,
        mod: S,
        attributes: E,
        ..._
      } = o,
      b = Dt({
        name: 'Paper',
        props: o,
        classes: b0,
        className: a,
        style: l,
        classNames: i,
        styles: c,
        unstyled: f,
        attributes: E,
        vars: m,
        varsResolver: Tx
      });
    return D.jsx(Be, {
      ref: n,
      mod: [{ 'data-with-border': p }, S],
      ...b('root'),
      variant: C,
      ..._
    });
  });
cp.classes = b0;
cp.displayName = '@mantine/core/Paper';
var R0 = { root: 'm_9814e45f' };
const kx = { zIndex: xo('modal') },
  Px = (
    e,
    {
      gradient: n,
      color: o,
      backgroundOpacity: i,
      blur: a,
      radius: l,
      zIndex: c
    }
  ) => ({
    root: {
      '--overlay-bg':
        n ||
        ((o !== void 0 || i !== void 0) && zn(o || '#000', i ?? 0.6)) ||
        void 0,
      '--overlay-filter': a ? `blur(${se(a)})` : void 0,
      '--overlay-radius': l === void 0 ? void 0 : Oi(l),
      '--overlay-z-index': c == null ? void 0 : c.toString()
    }
  }),
  fp = Po((e, n) => {
    const o = Ge('Overlay', kx, e),
      {
        classNames: i,
        className: a,
        style: l,
        styles: c,
        unstyled: f,
        vars: p,
        fixed: m,
        center: v,
        children: y,
        radius: C,
        zIndex: S,
        gradient: E,
        blur: _,
        color: b,
        backgroundOpacity: N,
        mod: R,
        attributes: T,
        ...k
      } = o,
      $ = Dt({
        name: 'Overlay',
        props: o,
        classes: R0,
        className: a,
        style: l,
        classNames: i,
        styles: c,
        unstyled: f,
        attributes: T,
        vars: p,
        varsResolver: Px
      });
    return D.jsx(Be, {
      ref: n,
      ...$('root'),
      mod: [{ center: v, fixed: m }, R],
      ...k,
      children: y
    });
  });
fp.classes = R0;
fp.displayName = '@mantine/core/Overlay';
function Gf(e) {
  const n = document.createElement('div');
  return (
    n.setAttribute('data-portal', 'true'),
    typeof e.className == 'string' &&
      n.classList.add(...e.className.split(' ').filter(Boolean)),
    typeof e.style == 'object' && Object.assign(n.style, e.style),
    typeof e.id == 'string' && n.setAttribute('id', e.id),
    n
  );
}
function Nx({ target: e, reuseTargetNode: n, ...o }) {
  if (e) return typeof e == 'string' ? document.querySelector(e) || Gf(o) : e;
  if (n) {
    const i = document.querySelector('[data-mantine-shared-portal-node]');
    if (i) return i;
    const a = Gf(o);
    return (
      a.setAttribute('data-mantine-shared-portal-node', 'true'),
      document.body.appendChild(a),
      a
    );
  }
  return Gf(o);
}
const Lx = { reuseTargetNode: !0 },
  x0 = Ct((e, n) => {
    const {
        children: o,
        target: i,
        reuseTargetNode: a,
        ...l
      } = Ge('Portal', Lx, e),
      [c, f] = w.useState(!1),
      p = w.useRef(null);
    return (
      Ii(
        () => (
          f(!0),
          (p.current = Nx({ target: i, reuseTargetNode: a, ...l })),
          cd(n, p.current),
          !i && !a && p.current && document.body.appendChild(p.current),
          () => {
            !i && !a && p.current && document.body.removeChild(p.current);
          }
        ),
        [i]
      ),
      !c || !p.current
        ? null
        : zd.createPortal(D.jsx(D.Fragment, { children: o }), p.current)
    );
  });
x0.displayName = '@mantine/core/Portal';
const T0 = Ct(({ withinPortal: e = !0, children: n, ...o }, i) =>
  jg() === 'test' || !e
    ? D.jsx(D.Fragment, { children: n })
    : D.jsx(x0, { ref: i, ...o, children: n })
);
T0.displayName = '@mantine/core/OptionalPortal';
const xs = e => ({
    in: { opacity: 1, transform: 'scale(1)' },
    out: {
      opacity: 0,
      transform: `scale(.9) translateY(${e === 'bottom' ? 10 : -10}px)`
    },
    transitionProperty: 'transform, opacity'
  }),
  xl = {
    fade: {
      in: { opacity: 1 },
      out: { opacity: 0 },
      transitionProperty: 'opacity'
    },
    'fade-up': {
      in: { opacity: 1, transform: 'translateY(0)' },
      out: { opacity: 0, transform: 'translateY(30px)' },
      transitionProperty: 'opacity, transform'
    },
    'fade-down': {
      in: { opacity: 1, transform: 'translateY(0)' },
      out: { opacity: 0, transform: 'translateY(-30px)' },
      transitionProperty: 'opacity, transform'
    },
    'fade-left': {
      in: { opacity: 1, transform: 'translateX(0)' },
      out: { opacity: 0, transform: 'translateX(30px)' },
      transitionProperty: 'opacity, transform'
    },
    'fade-right': {
      in: { opacity: 1, transform: 'translateX(0)' },
      out: { opacity: 0, transform: 'translateX(-30px)' },
      transitionProperty: 'opacity, transform'
    },
    scale: {
      in: { opacity: 1, transform: 'scale(1)' },
      out: { opacity: 0, transform: 'scale(0)' },
      common: { transformOrigin: 'top' },
      transitionProperty: 'transform, opacity'
    },
    'scale-y': {
      in: { opacity: 1, transform: 'scaleY(1)' },
      out: { opacity: 0, transform: 'scaleY(0)' },
      common: { transformOrigin: 'top' },
      transitionProperty: 'transform, opacity'
    },
    'scale-x': {
      in: { opacity: 1, transform: 'scaleX(1)' },
      out: { opacity: 0, transform: 'scaleX(0)' },
      common: { transformOrigin: 'left' },
      transitionProperty: 'transform, opacity'
    },
    'skew-up': {
      in: { opacity: 1, transform: 'translateY(0) skew(0deg, 0deg)' },
      out: { opacity: 0, transform: 'translateY(-20px) skew(-10deg, -5deg)' },
      common: { transformOrigin: 'top' },
      transitionProperty: 'transform, opacity'
    },
    'skew-down': {
      in: { opacity: 1, transform: 'translateY(0) skew(0deg, 0deg)' },
      out: { opacity: 0, transform: 'translateY(20px) skew(-10deg, -5deg)' },
      common: { transformOrigin: 'bottom' },
      transitionProperty: 'transform, opacity'
    },
    'rotate-left': {
      in: { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
      out: { opacity: 0, transform: 'translateY(20px) rotate(-5deg)' },
      common: { transformOrigin: 'bottom' },
      transitionProperty: 'transform, opacity'
    },
    'rotate-right': {
      in: { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
      out: { opacity: 0, transform: 'translateY(20px) rotate(5deg)' },
      common: { transformOrigin: 'top' },
      transitionProperty: 'transform, opacity'
    },
    'slide-down': {
      in: { opacity: 1, transform: 'translateY(0)' },
      out: { opacity: 0, transform: 'translateY(-100%)' },
      common: { transformOrigin: 'top' },
      transitionProperty: 'transform, opacity'
    },
    'slide-up': {
      in: { opacity: 1, transform: 'translateY(0)' },
      out: { opacity: 0, transform: 'translateY(100%)' },
      common: { transformOrigin: 'bottom' },
      transitionProperty: 'transform, opacity'
    },
    'slide-left': {
      in: { opacity: 1, transform: 'translateX(0)' },
      out: { opacity: 0, transform: 'translateX(100%)' },
      common: { transformOrigin: 'left' },
      transitionProperty: 'transform, opacity'
    },
    'slide-right': {
      in: { opacity: 1, transform: 'translateX(0)' },
      out: { opacity: 0, transform: 'translateX(-100%)' },
      common: { transformOrigin: 'right' },
      transitionProperty: 'transform, opacity'
    },
    pop: { ...xs('bottom'), common: { transformOrigin: 'center center' } },
    'pop-bottom-left': {
      ...xs('bottom'),
      common: { transformOrigin: 'bottom left' }
    },
    'pop-bottom-right': {
      ...xs('bottom'),
      common: { transformOrigin: 'bottom right' }
    },
    'pop-top-left': { ...xs('top'), common: { transformOrigin: 'top left' } },
    'pop-top-right': { ...xs('top'), common: { transformOrigin: 'top right' } }
  },
  vy = {
    entering: 'in',
    entered: 'in',
    exiting: 'out',
    exited: 'out',
    'pre-exiting': 'out',
    'pre-entering': 'out'
  };
function Mx({ transition: e, state: n, duration: o, timingFunction: i }) {
  const a = {
    WebkitBackfaceVisibility: 'hidden',
    transitionDuration: `${o}ms`,
    transitionTimingFunction: i
  };
  return typeof e == 'string'
    ? e in xl
      ? {
          transitionProperty: xl[e].transitionProperty,
          ...a,
          ...xl[e].common,
          ...xl[e][vy[n]]
        }
      : {}
    : {
        transitionProperty: e.transitionProperty,
        ...a,
        ...e.common,
        ...e[vy[n]]
      };
}
function Ax({
  duration: e,
  exitDuration: n,
  timingFunction: o,
  mounted: i,
  onEnter: a,
  onExit: l,
  onEntered: c,
  onExited: f,
  enterDelay: p,
  exitDelay: m
}) {
  const v = ko(),
    y = Dg(),
    C = v.respectReducedMotion ? y : !1,
    [S, E] = w.useState(C ? 0 : e),
    [_, b] = w.useState(i ? 'entered' : 'exited'),
    N = w.useRef(-1),
    R = w.useRef(-1),
    T = w.useRef(-1);
  function k() {
    (window.clearTimeout(N.current),
      window.clearTimeout(R.current),
      cancelAnimationFrame(T.current));
  }
  const $ = H => {
      k();
      const F = H ? a : l,
        G = H ? c : f,
        q = C ? 0 : H ? e : n;
      (E(q),
        q === 0
          ? (typeof F == 'function' && F(),
            typeof G == 'function' && G(),
            b(H ? 'entered' : 'exited'))
          : (T.current = requestAnimationFrame(() => {
              (cg.flushSync(() => {
                b(H ? 'pre-entering' : 'pre-exiting');
              }),
                (T.current = requestAnimationFrame(() => {
                  (typeof F == 'function' && F(),
                    b(H ? 'entering' : 'exiting'),
                    (N.current = window.setTimeout(() => {
                      (typeof G == 'function' && G(),
                        b(H ? 'entered' : 'exited'));
                    }, q)));
                })));
            })));
    },
    W = H => {
      if ((k(), typeof (H ? p : m) != 'number')) {
        $(H);
        return;
      }
      R.current = window.setTimeout(
        () => {
          $(H);
        },
        H ? p : m
      );
    };
  return (
    Ag(() => {
      W(i);
    }, [i]),
    w.useEffect(
      () => () => {
        k();
      },
      []
    ),
    {
      transitionDuration: S,
      transitionStatus: _,
      transitionTimingFunction: o || 'ease'
    }
  );
}
function mu({
  keepMounted: e,
  transition: n = 'fade',
  duration: o = 250,
  exitDuration: i = o,
  mounted: a,
  children: l,
  timingFunction: c = 'ease',
  onExit: f,
  onEntered: p,
  onEnter: m,
  onExited: v,
  enterDelay: y,
  exitDelay: C
}) {
  const S = jg(),
    {
      transitionDuration: E,
      transitionStatus: _,
      transitionTimingFunction: b
    } = Ax({
      mounted: a,
      exitDuration: i,
      duration: o,
      timingFunction: c,
      onExit: f,
      onEntered: p,
      onEnter: m,
      onExited: v,
      enterDelay: y,
      exitDelay: C
    });
  return E === 0 || S === 'test'
    ? a
      ? D.jsx(D.Fragment, { children: l({}) })
      : e
        ? l({ display: 'none' })
        : null
    : _ === 'exited'
      ? e
        ? l({ display: 'none' })
        : null
      : D.jsx(D.Fragment, {
          children: l(
            Mx({ transition: n, duration: E, state: _, timingFunction: b })
          )
        });
}
mu.displayName = '@mantine/core/Transition';
function dp({ children: e, active: n = !0, refProp: o = 'ref', innerRef: i }) {
  const a = wE(n),
    l = To(a, i),
    c = TE(e);
  return c ? w.cloneElement(c, { [o]: l }) : e;
}
function k0(e) {
  return D.jsx(up, { tabIndex: -1, 'data-autofocus': !0, ...e });
}
dp.displayName = '@mantine/core/FocusTrap';
k0.displayName = '@mantine/core/FocusTrapInitialFocus';
dp.InitialFocus = k0;
var xn = {
  root: 'm_5ae2e3c',
  barsLoader: 'm_7a2bd4cd',
  bar: 'm_870bb79',
  'bars-loader-animation': 'm_5d2b3b9d',
  dotsLoader: 'm_4e3f22d7',
  dot: 'm_870c4af',
  'loader-dots-animation': 'm_aac34a1',
  ovalLoader: 'm_b34414df',
  'oval-loader-animation': 'm_f8e89c4b'
};
const P0 = w.forwardRef(({ className: e, ...n }, o) =>
  D.jsxs(Be, {
    component: 'span',
    className: ct(xn.barsLoader, e),
    ...n,
    ref: o,
    children: [
      D.jsx('span', { className: xn.bar }),
      D.jsx('span', { className: xn.bar }),
      D.jsx('span', { className: xn.bar })
    ]
  })
);
P0.displayName = '@mantine/core/Bars';
const N0 = w.forwardRef(({ className: e, ...n }, o) =>
  D.jsxs(Be, {
    component: 'span',
    className: ct(xn.dotsLoader, e),
    ...n,
    ref: o,
    children: [
      D.jsx('span', { className: xn.dot }),
      D.jsx('span', { className: xn.dot }),
      D.jsx('span', { className: xn.dot })
    ]
  })
);
N0.displayName = '@mantine/core/Dots';
const L0 = w.forwardRef(({ className: e, ...n }, o) =>
  D.jsx(Be, {
    component: 'span',
    className: ct(xn.ovalLoader, e),
    ...n,
    ref: o
  })
);
L0.displayName = '@mantine/core/Oval';
const M0 = { bars: P0, oval: L0, dots: N0 },
  $x = { loaders: M0, type: 'oval' },
  Ox = (e, { size: n, color: o }) => ({
    root: {
      '--loader-size': un(n, 'loader-size'),
      '--loader-color': o ? Hl(o, e) : void 0
    }
  }),
  vu = Ct((e, n) => {
    const o = Ge('Loader', $x, e),
      {
        size: i,
        color: a,
        type: l,
        vars: c,
        className: f,
        style: p,
        classNames: m,
        styles: v,
        unstyled: y,
        loaders: C,
        variant: S,
        children: E,
        attributes: _,
        ...b
      } = o,
      N = Dt({
        name: 'Loader',
        props: o,
        classes: xn,
        className: f,
        style: p,
        classNames: m,
        styles: v,
        unstyled: y,
        attributes: _,
        vars: c,
        varsResolver: Ox
      });
    return E
      ? D.jsx(Be, { ...N('root'), ref: n, ...b, children: E })
      : D.jsx(Be, {
          ...N('root'),
          ref: n,
          component: C[l],
          variant: S,
          size: i,
          ...b
        });
  });
vu.defaultLoaders = M0;
vu.classes = xn;
vu.displayName = '@mantine/core/Loader';
const A0 = w.forwardRef(
  ({ size: e = 'var(--cb-icon-size, 70%)', style: n, ...o }, i) =>
    D.jsx('svg', {
      viewBox: '0 0 15 15',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      style: { ...n, width: e, height: e },
      ref: i,
      ...o,
      children: D.jsx('path', {
        d: 'M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z',
        fill: 'currentColor',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      })
    })
);
A0.displayName = '@mantine/core/CloseIcon';
var $0 = { root: 'm_86a44da5', 'root--subtle': 'm_220c80f2' };
const Ix = { variant: 'subtle' },
  Dx = (e, { size: n, radius: o, iconSize: i }) => ({
    root: {
      '--cb-size': un(n, 'cb-size'),
      '--cb-radius': o === void 0 ? void 0 : Oi(o),
      '--cb-icon-size': se(i)
    }
  }),
  pp = Po((e, n) => {
    const o = Ge('CloseButton', Ix, e),
      {
        iconSize: i,
        children: a,
        vars: l,
        radius: c,
        className: f,
        classNames: p,
        style: m,
        styles: v,
        unstyled: y,
        'data-disabled': C,
        disabled: S,
        variant: E,
        icon: _,
        mod: b,
        attributes: N,
        __staticSelector: R,
        ...T
      } = o,
      k = Dt({
        name: R || 'CloseButton',
        props: o,
        className: f,
        style: m,
        classes: $0,
        classNames: p,
        styles: v,
        unstyled: y,
        attributes: N,
        vars: l,
        varsResolver: Dx
      });
    return D.jsxs(hu, {
      ref: n,
      ...T,
      unstyled: y,
      variant: E,
      disabled: S,
      mod: [{ disabled: S || C }, b],
      ...k('root', { variant: E, active: !S && !C }),
      children: [_ || D.jsx(A0, {}), a]
    });
  });
pp.classes = $0;
pp.displayName = '@mantine/core/CloseButton';
function Fx(e) {
  return w.Children.toArray(e).filter(Boolean);
}
var O0 = { root: 'm_4081bf90' };
const zx = {
    preventGrowOverflow: !0,
    gap: 'md',
    align: 'center',
    justify: 'flex-start',
    wrap: 'wrap'
  },
  jx = (
    e,
    { grow: n, preventGrowOverflow: o, gap: i, align: a, justify: l, wrap: c },
    { childWidth: f }
  ) => ({
    root: {
      '--group-child-width': n && o ? f : void 0,
      '--group-gap': iu(i),
      '--group-align': a,
      '--group-justify': l,
      '--group-wrap': c
    }
  }),
  hp = Ct((e, n) => {
    const o = Ge('Group', zx, e),
      {
        classNames: i,
        className: a,
        style: l,
        styles: c,
        unstyled: f,
        children: p,
        gap: m,
        align: v,
        justify: y,
        wrap: C,
        grow: S,
        preventGrowOverflow: E,
        vars: _,
        variant: b,
        __size: N,
        mod: R,
        attributes: T,
        ...k
      } = o,
      $ = Fx(p),
      W = $.length,
      H = iu(m ?? 'md'),
      G = { childWidth: `calc(${100 / W}% - (${H} - ${H} / ${W}))` },
      q = Dt({
        name: 'Group',
        props: o,
        stylesCtx: G,
        className: a,
        style: l,
        classes: O0,
        classNames: i,
        styles: c,
        unstyled: f,
        attributes: T,
        vars: _,
        varsResolver: jx
      });
    return D.jsx(Be, {
      ...q('root'),
      ref: n,
      variant: b,
      mod: [{ grow: S }, R],
      size: N,
      ...k,
      children: $
    });
  });
hp.classes = O0;
hp.displayName = '@mantine/core/Group';
const [Vx, cr] = ou('ModalBase component was not found in tree');
function Bx({ opened: e, transitionDuration: n }) {
  const [o, i] = w.useState(e),
    a = w.useRef(-1),
    c = Dg() ? 0 : n;
  return (
    w.useEffect(
      () => (
        e
          ? (i(!0), window.clearTimeout(a.current))
          : c === 0
            ? i(!1)
            : (a.current = window.setTimeout(() => i(!1), c)),
        () => window.clearTimeout(a.current)
      ),
      [e, c]
    ),
    o
  );
}
function Ux({
  id: e,
  transitionProps: n,
  opened: o,
  trapFocus: i,
  closeOnEscape: a,
  onClose: l,
  returnFocus: c
}) {
  const f = _E(e),
    [p, m] = w.useState(!1),
    [v, y] = w.useState(!1),
    C =
      typeof (n == null ? void 0 : n.duration) == 'number'
        ? n == null
          ? void 0
          : n.duration
        : 200,
    S = Bx({ opened: o, transitionDuration: C });
  return (
    EE(
      'keydown',
      E => {
        var _;
        E.key === 'Escape' &&
          a &&
          !E.isComposing &&
          o &&
          ((_ = E.target) == null
            ? void 0
            : _.getAttribute('data-mantine-stop-propagation')) !== 'true' &&
          l();
      },
      { capture: !0 }
    ),
    pE({ opened: o, shouldReturnFocus: i && c }),
    {
      _id: f,
      titleMounted: p,
      bodyMounted: v,
      shouldLockScroll: S,
      setTitleMounted: m,
      setBodyMounted: y
    }
  );
}
const I0 = w.forwardRef(
  (
    {
      keepMounted: e,
      opened: n,
      onClose: o,
      id: i,
      transitionProps: a,
      onExitTransitionEnd: l,
      onEnterTransitionEnd: c,
      trapFocus: f,
      closeOnEscape: p,
      returnFocus: m,
      closeOnClickOutside: v,
      withinPortal: y,
      portalProps: C,
      lockScroll: S,
      children: E,
      zIndex: _,
      shadow: b,
      padding: N,
      __vars: R,
      unstyled: T,
      removeScrollProps: k,
      ...$
    },
    W
  ) => {
    const {
        _id: H,
        titleMounted: F,
        bodyMounted: G,
        shouldLockScroll: q,
        setTitleMounted: ce,
        setBodyMounted: ye
      } = Ux({
        id: i,
        transitionProps: a,
        opened: n,
        trapFocus: f,
        closeOnEscape: p,
        onClose: o,
        returnFocus: m
      }),
      { key: le, ...Z } = k || {};
    return D.jsx(T0, {
      ...C,
      withinPortal: y,
      children: D.jsx(Vx, {
        value: {
          opened: n,
          onClose: o,
          closeOnClickOutside: v,
          onExitTransitionEnd: l,
          onEnterTransitionEnd: c,
          transitionProps: { ...a, keepMounted: e },
          getTitleId: () => `${H}-title`,
          getBodyId: () => `${H}-body`,
          titleMounted: F,
          bodyMounted: G,
          setTitleMounted: ce,
          setBodyMounted: ye,
          trapFocus: f,
          closeOnEscape: p,
          zIndex: _,
          unstyled: T
        },
        children: D.jsx(
          Pg,
          {
            enabled: q && S,
            ...Z,
            children: D.jsx(Be, {
              ref: W,
              ...$,
              __vars: {
                ...R,
                '--mb-z-index': (_ || xo('modal')).toString(),
                '--mb-shadow': Mg(b),
                '--mb-padding': iu(N)
              },
              children: E
            })
          },
          le
        )
      })
    });
  }
);
I0.displayName = '@mantine/core/ModalBase';
var ki = {
  title: 'm_615af6c9',
  header: 'm_b5489c3c',
  inner: 'm_60c222c7',
  content: 'm_fd1ab0aa',
  close: 'm_606cb269',
  body: 'm_5df29311'
};
function Wx() {
  const e = cr();
  return (
    w.useEffect(() => (e.setBodyMounted(!0), () => e.setBodyMounted(!1)), []),
    e.getBodyId()
  );
}
const D0 = w.forwardRef(({ className: e, ...n }, o) => {
  const i = Wx(),
    a = cr();
  return D.jsx(Be, {
    ref: o,
    ...n,
    id: i,
    className: ct({ [ki.body]: !a.unstyled }, e)
  });
});
D0.displayName = '@mantine/core/ModalBaseBody';
const F0 = w.forwardRef(({ className: e, onClick: n, ...o }, i) => {
  const a = cr();
  return D.jsx(pp, {
    ref: i,
    ...o,
    onClick: l => {
      (a.onClose(), n == null || n(l));
    },
    className: ct({ [ki.close]: !a.unstyled }, e),
    unstyled: a.unstyled
  });
});
F0.displayName = '@mantine/core/ModalBaseCloseButton';
const z0 = w.forwardRef(
  (
    {
      transitionProps: e,
      className: n,
      innerProps: o,
      onKeyDown: i,
      style: a,
      ...l
    },
    c
  ) => {
    const f = cr();
    return D.jsx(mu, {
      mounted: f.opened,
      transition: 'pop',
      ...f.transitionProps,
      onExited: () => {
        var p, m, v;
        ((p = f.onExitTransitionEnd) == null || p.call(f),
          (v = (m = f.transitionProps) == null ? void 0 : m.onExited) == null ||
            v.call(m));
      },
      onEntered: () => {
        var p, m, v;
        ((p = f.onEnterTransitionEnd) == null || p.call(f),
          (v = (m = f.transitionProps) == null ? void 0 : m.onEntered) ==
            null || v.call(m));
      },
      ...e,
      children: p =>
        D.jsx('div', {
          ...o,
          className: ct({ [ki.inner]: !f.unstyled }, o.className),
          children: D.jsx(dp, {
            active: f.opened && f.trapFocus,
            innerRef: c,
            children: D.jsx(cp, {
              ...l,
              component: 'section',
              role: 'dialog',
              tabIndex: -1,
              'aria-modal': !0,
              'aria-describedby': f.bodyMounted ? f.getBodyId() : void 0,
              'aria-labelledby': f.titleMounted ? f.getTitleId() : void 0,
              style: [a, p],
              className: ct({ [ki.content]: !f.unstyled }, n),
              unstyled: f.unstyled,
              children: l.children
            })
          })
        })
    });
  }
);
z0.displayName = '@mantine/core/ModalBaseContent';
const j0 = w.forwardRef(({ className: e, ...n }, o) => {
  const i = cr();
  return D.jsx(Be, {
    component: 'header',
    ref: o,
    className: ct({ [ki.header]: !i.unstyled }, e),
    ...n
  });
});
j0.displayName = '@mantine/core/ModalBaseHeader';
const Hx = { duration: 200, timingFunction: 'ease', transition: 'fade' };
function Kx(e) {
  const n = cr();
  return { ...Hx, ...n.transitionProps, ...e };
}
const V0 = w.forwardRef(
  ({ onClick: e, transitionProps: n, style: o, visible: i, ...a }, l) => {
    const c = cr(),
      f = Kx(n);
    return D.jsx(mu, {
      mounted: i !== void 0 ? i : c.opened,
      ...f,
      transition: 'fade',
      children: p =>
        D.jsx(fp, {
          ref: l,
          fixed: !0,
          style: [o, p],
          zIndex: c.zIndex,
          unstyled: c.unstyled,
          onClick: m => {
            (e == null || e(m), c.closeOnClickOutside && c.onClose());
          },
          ...a
        })
    });
  }
);
V0.displayName = '@mantine/core/ModalBaseOverlay';
function Qx() {
  const e = cr();
  return (
    w.useEffect(() => (e.setTitleMounted(!0), () => e.setTitleMounted(!1)), []),
    e.getTitleId()
  );
}
const B0 = w.forwardRef(({ className: e, ...n }, o) => {
  const i = Qx(),
    a = cr();
  return D.jsx(Be, {
    component: 'h2',
    ref: o,
    className: ct({ [ki.title]: !a.unstyled }, e),
    ...n,
    id: i
  });
});
B0.displayName = '@mantine/core/ModalBaseTitle';
function Gx({ children: e }) {
  return D.jsx(D.Fragment, { children: e });
}
var U0 = { root: 'm_b6d8b162' };
function Yx(e) {
  if (e === 'start') return 'start';
  if (e === 'end' || e) return 'end';
}
const Xx = { inherit: !1 },
  qx = (e, { variant: n, lineClamp: o, gradient: i, size: a, color: l }) => ({
    root: {
      '--text-fz': Ds(a),
      '--text-lh': uE(a),
      '--text-gradient': n === 'gradient' ? dd(i, e) : void 0,
      '--text-line-clamp': typeof o == 'number' ? o.toString() : void 0,
      '--text-color': l ? Hl(l, e) : void 0
    }
  }),
  mp = Po((e, n) => {
    const o = Ge('Text', Xx, e),
      {
        lineClamp: i,
        truncate: a,
        inline: l,
        inherit: c,
        gradient: f,
        span: p,
        __staticSelector: m,
        vars: v,
        className: y,
        style: C,
        classNames: S,
        styles: E,
        unstyled: _,
        variant: b,
        mod: N,
        size: R,
        attributes: T,
        ...k
      } = o,
      $ = Dt({
        name: ['Text', m],
        props: o,
        classes: U0,
        className: y,
        style: C,
        classNames: S,
        styles: E,
        unstyled: _,
        attributes: T,
        vars: v,
        varsResolver: qx
      });
    return D.jsx(Be, {
      ...$('root', { focusable: !0 }),
      ref: n,
      component: p ? 'span' : 'p',
      variant: b,
      mod: [
        {
          'data-truncate': Yx(a),
          'data-line-clamp': typeof i == 'number',
          'data-inline': l,
          'data-inherit': c
        },
        N
      ],
      size: R,
      ...k
    });
  });
mp.classes = U0;
mp.displayName = '@mantine/core/Text';
var zi = {
  root: 'm_77c9d27d',
  inner: 'm_80f1301b',
  label: 'm_811560b9',
  section: 'm_a74036a',
  loader: 'm_a25b86ee',
  group: 'm_80d6d844',
  groupSection: 'm_70be2a01'
};
const yy = { orientation: 'horizontal' },
  Zx = (e, { borderWidth: n }) => ({
    group: { '--button-border-width': se(n) }
  }),
  vp = Ct((e, n) => {
    const o = Ge('ButtonGroup', yy, e),
      {
        className: i,
        style: a,
        classNames: l,
        styles: c,
        unstyled: f,
        orientation: p,
        vars: m,
        borderWidth: v,
        variant: y,
        mod: C,
        attributes: S,
        ...E
      } = Ge('ButtonGroup', yy, e),
      _ = Dt({
        name: 'ButtonGroup',
        props: o,
        classes: zi,
        className: i,
        style: a,
        classNames: l,
        styles: c,
        unstyled: f,
        attributes: S,
        vars: m,
        varsResolver: Zx,
        rootSelector: 'group'
      });
    return D.jsx(Be, {
      ..._('group'),
      ref: n,
      variant: y,
      mod: [{ 'data-orientation': p }, C],
      role: 'group',
      ...E
    });
  });
vp.classes = zi;
vp.displayName = '@mantine/core/ButtonGroup';
const Jx = (
    e,
    { radius: n, color: o, gradient: i, variant: a, autoContrast: l, size: c }
  ) => {
    const f = e.variantColorResolver({
      color: o || e.primaryColor,
      theme: e,
      gradient: i,
      variant: a || 'filled',
      autoContrast: l
    });
    return {
      groupSection: {
        '--section-height': un(c, 'section-height'),
        '--section-padding-x': un(c, 'section-padding-x'),
        '--section-fz':
          c != null && c.includes('compact')
            ? Ds(c.replace('compact-', ''))
            : Ds(c),
        '--section-radius': n === void 0 ? void 0 : Oi(n),
        '--section-bg': o || a ? f.background : void 0,
        '--section-color': f.color,
        '--section-bd': o || a ? f.border : void 0
      }
    };
  },
  yp = Ct((e, n) => {
    const o = Ge('ButtonGroupSection', null, e),
      {
        className: i,
        style: a,
        classNames: l,
        styles: c,
        unstyled: f,
        vars: p,
        variant: m,
        gradient: v,
        radius: y,
        autoContrast: C,
        attributes: S,
        ...E
      } = o,
      _ = Dt({
        name: 'ButtonGroupSection',
        props: o,
        classes: zi,
        className: i,
        style: a,
        classNames: l,
        styles: c,
        unstyled: f,
        attributes: S,
        vars: p,
        varsResolver: Jx,
        rootSelector: 'groupSection'
      });
    return D.jsx(Be, { ..._('groupSection'), ref: n, variant: m, ...E });
  });
yp.classes = zi;
yp.displayName = '@mantine/core/ButtonGroupSection';
const eT = {
    in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${se(1)}))` },
    out: { opacity: 0, transform: 'translate(-50%, -200%)' },
    common: { transformOrigin: 'center' },
    transitionProperty: 'transform, opacity'
  },
  tT = (
    e,
    {
      radius: n,
      color: o,
      gradient: i,
      variant: a,
      size: l,
      justify: c,
      autoContrast: f
    }
  ) => {
    const p = e.variantColorResolver({
      color: o || e.primaryColor,
      theme: e,
      gradient: i,
      variant: a || 'filled',
      autoContrast: f
    });
    return {
      root: {
        '--button-justify': c,
        '--button-height': un(l, 'button-height'),
        '--button-padding-x': un(l, 'button-padding-x'),
        '--button-fz':
          l != null && l.includes('compact')
            ? Ds(l.replace('compact-', ''))
            : Ds(l),
        '--button-radius': n === void 0 ? void 0 : Oi(n),
        '--button-bg': o || a ? p.background : void 0,
        '--button-hover': o || a ? p.hover : void 0,
        '--button-color': p.color,
        '--button-bd': o || a ? p.border : void 0,
        '--button-hover-color': o || a ? p.hoverColor : void 0
      }
    };
  },
  Pi = Po((e, n) => {
    const o = Ge('Button', null, e),
      {
        style: i,
        vars: a,
        className: l,
        color: c,
        disabled: f,
        children: p,
        leftSection: m,
        rightSection: v,
        fullWidth: y,
        variant: C,
        radius: S,
        loading: E,
        loaderProps: _,
        gradient: b,
        classNames: N,
        styles: R,
        unstyled: T,
        'data-disabled': k,
        autoContrast: $,
        mod: W,
        attributes: H,
        ...F
      } = o,
      G = Dt({
        name: 'Button',
        props: o,
        classes: zi,
        className: l,
        style: i,
        classNames: N,
        styles: R,
        unstyled: T,
        attributes: H,
        vars: a,
        varsResolver: tT
      }),
      q = !!m,
      ce = !!v;
    return D.jsxs(hu, {
      ref: n,
      ...G('root', { active: !f && !E && !k }),
      unstyled: T,
      variant: C,
      disabled: f || E,
      mod: [
        {
          disabled: f || k,
          loading: E,
          block: y,
          'with-left-section': q,
          'with-right-section': ce
        },
        W
      ],
      ...F,
      children: [
        typeof E == 'boolean' &&
          D.jsx(mu, {
            mounted: E,
            transition: eT,
            duration: 150,
            children: ye =>
              D.jsx(Be, {
                component: 'span',
                ...G('loader', { style: ye }),
                'aria-hidden': !0,
                children: D.jsx(vu, {
                  color: 'var(--button-color)',
                  size: 'calc(var(--button-height) / 1.8)',
                  ..._
                })
              })
          }),
        D.jsxs('span', {
          ...G('inner'),
          children: [
            m &&
              D.jsx(Be, {
                component: 'span',
                ...G('section'),
                mod: { position: 'left' },
                children: m
              }),
            D.jsx(Be, {
              component: 'span',
              mod: { loading: E },
              ...G('label'),
              children: p
            }),
            v &&
              D.jsx(Be, {
                component: 'span',
                ...G('section'),
                mod: { position: 'right' },
                children: v
              })
          ]
        })
      ]
    });
  });
Pi.classes = zi;
Pi.displayName = '@mantine/core/Button';
Pi.Group = vp;
Pi.GroupSection = yp;
var W0 = { root: 'm_4451eb3a' };
const gp = Po((e, n) => {
  const o = Ge('Center', null, e),
    {
      classNames: i,
      className: a,
      style: l,
      styles: c,
      unstyled: f,
      vars: p,
      inline: m,
      mod: v,
      attributes: y,
      ...C
    } = o,
    S = Dt({
      name: 'Center',
      props: o,
      classes: W0,
      className: a,
      style: l,
      classNames: i,
      styles: c,
      unstyled: f,
      attributes: y,
      vars: p
    });
  return D.jsx(Be, { ref: n, mod: [{ inline: m }, v], ...S('root'), ...C });
});
gp.classes = W0;
gp.displayName = '@mantine/core/Center';
var fr = {
  root: 'm_9df02822',
  content: 'm_54c44539',
  inner: 'm_1f958f16',
  header: 'm_d0e2b9cd'
};
const [nT, ji] = ou('Modal component was not found in tree'),
  yu = Ct((e, n) => {
    const o = Ge('ModalBody', null, e),
      { classNames: i, className: a, style: l, styles: c, vars: f, ...p } = o,
      m = ji();
    return D.jsx(D0, {
      ref: n,
      ...m.getStyles('body', {
        classNames: i,
        style: l,
        styles: c,
        className: a
      }),
      ...p
    });
  });
yu.classes = fr;
yu.displayName = '@mantine/core/ModalBody';
const gu = Ct((e, n) => {
  const o = Ge('ModalCloseButton', null, e),
    { classNames: i, className: a, style: l, styles: c, vars: f, ...p } = o,
    m = ji();
  return D.jsx(F0, {
    ref: n,
    ...m.getStyles('close', {
      classNames: i,
      style: l,
      styles: c,
      className: a
    }),
    ...p
  });
});
gu.classes = fr;
gu.displayName = '@mantine/core/ModalCloseButton';
const wu = Ct((e, n) => {
  const o = Ge('ModalContent', null, e),
    {
      classNames: i,
      className: a,
      style: l,
      styles: c,
      vars: f,
      children: p,
      __hidden: m,
      ...v
    } = o,
    y = ji(),
    C = y.scrollAreaComponent || Gx;
  return D.jsx(z0, {
    ...y.getStyles('content', {
      className: a,
      style: l,
      styles: c,
      classNames: i
    }),
    innerProps: y.getStyles('inner', {
      className: a,
      style: l,
      styles: c,
      classNames: i
    }),
    'data-full-screen': y.fullScreen || void 0,
    'data-modal-content': !0,
    'data-hidden': m || void 0,
    ref: n,
    ...v,
    children: D.jsx(C, {
      style: {
        maxHeight: y.fullScreen
          ? '100dvh'
          : `calc(100dvh - (${se(y.yOffset)} * 2))`
      },
      children: p
    })
  });
});
wu.classes = fr;
wu.displayName = '@mantine/core/ModalContent';
const Su = Ct((e, n) => {
  const o = Ge('ModalHeader', null, e),
    { classNames: i, className: a, style: l, styles: c, vars: f, ...p } = o,
    m = ji();
  return D.jsx(j0, {
    ref: n,
    ...m.getStyles('header', {
      classNames: i,
      style: l,
      styles: c,
      className: a
    }),
    ...p
  });
});
Su.classes = fr;
Su.displayName = '@mantine/core/ModalHeader';
const Cu = Ct((e, n) => {
  const o = Ge('ModalOverlay', null, e),
    { classNames: i, className: a, style: l, styles: c, vars: f, ...p } = o,
    m = ji();
  return D.jsx(V0, {
    ref: n,
    ...m.getStyles('overlay', {
      classNames: i,
      style: l,
      styles: c,
      className: a
    }),
    ...p
  });
});
Cu.classes = fr;
Cu.displayName = '@mantine/core/ModalOverlay';
const rT = {
    __staticSelector: 'Modal',
    closeOnClickOutside: !0,
    withinPortal: !0,
    lockScroll: !0,
    trapFocus: !0,
    returnFocus: !0,
    closeOnEscape: !0,
    keepMounted: !1,
    zIndex: xo('modal'),
    transitionProps: { duration: 200, transition: 'fade-down' },
    yOffset: '5dvh'
  },
  oT = (e, { radius: n, size: o, yOffset: i, xOffset: a }) => ({
    root: {
      '--modal-radius': n === void 0 ? void 0 : Oi(n),
      '--modal-size': un(o, 'modal-size'),
      '--modal-y-offset': se(i),
      '--modal-x-offset': se(a)
    }
  }),
  _u = Ct((e, n) => {
    const o = Ge('ModalRoot', rT, e),
      {
        classNames: i,
        className: a,
        style: l,
        styles: c,
        unstyled: f,
        vars: p,
        yOffset: m,
        scrollAreaComponent: v,
        radius: y,
        fullScreen: C,
        centered: S,
        xOffset: E,
        __staticSelector: _,
        attributes: b,
        ...N
      } = o,
      R = Dt({
        name: _,
        classes: fr,
        props: o,
        className: a,
        style: l,
        classNames: i,
        styles: c,
        unstyled: f,
        attributes: b,
        vars: p,
        varsResolver: oT
      });
    return D.jsx(nT, {
      value: {
        yOffset: m,
        scrollAreaComponent: v,
        getStyles: R,
        fullScreen: C
      },
      children: D.jsx(I0, {
        ref: n,
        ...R('root'),
        'data-full-screen': C || void 0,
        'data-centered': S || void 0,
        'data-offset-scrollbars': v === qs.Autosize || void 0,
        unstyled: f,
        ...N
      })
    });
  });
_u.classes = fr;
_u.displayName = '@mantine/core/ModalRoot';
const [iT, sT] = aE();
function H0({ children: e }) {
  const [n, o] = w.useState([]),
    [i, a] = w.useState(xo('modal'));
  return D.jsx(iT, {
    value: {
      stack: n,
      addModal: (l, c) => {
        (o(f => [...new Set([...f, l])]),
          a(f =>
            typeof c == 'number' && typeof f == 'number' ? Math.max(f, c) : f
          ));
      },
      removeModal: l => o(c => c.filter(f => f !== l)),
      getZIndex: l => `calc(${i} + ${n.indexOf(l)} + 1)`,
      currentId: n[n.length - 1],
      maxZIndex: i
    },
    children: e
  });
}
H0.displayName = '@mantine/core/ModalStack';
const Eu = Ct((e, n) => {
  const o = Ge('ModalTitle', null, e),
    { classNames: i, className: a, style: l, styles: c, vars: f, ...p } = o,
    m = ji();
  return D.jsx(B0, {
    ref: n,
    ...m.getStyles('title', {
      classNames: i,
      style: l,
      styles: c,
      className: a
    }),
    ...p
  });
});
Eu.classes = fr;
Eu.displayName = '@mantine/core/ModalTitle';
const aT = {
    closeOnClickOutside: !0,
    withinPortal: !0,
    lockScroll: !0,
    trapFocus: !0,
    returnFocus: !0,
    closeOnEscape: !0,
    keepMounted: !1,
    zIndex: xo('modal'),
    transitionProps: { duration: 200, transition: 'fade-down' },
    withOverlay: !0,
    withCloseButton: !0
  },
  Nn = Ct((e, n) => {
    const {
        title: o,
        withOverlay: i,
        overlayProps: a,
        withCloseButton: l,
        closeButtonProps: c,
        children: f,
        radius: p,
        opened: m,
        stackId: v,
        zIndex: y,
        ...C
      } = Ge('Modal', aT, e),
      S = sT(),
      E = !!o || l,
      _ =
        S && v
          ? {
              closeOnEscape: S.currentId === v,
              trapFocus: S.currentId === v,
              zIndex: S.getZIndex(v)
            }
          : {},
      b = i === !1 ? !1 : v && S ? S.currentId === v : m;
    return (
      w.useEffect(() => {
        S && v && (m ? S.addModal(v, y || xo('modal')) : S.removeModal(v));
      }, [m, v, y]),
      D.jsxs(_u, {
        ref: n,
        radius: p,
        opened: m,
        zIndex: S && v ? S.getZIndex(v) : y,
        ...C,
        ..._,
        children: [
          i &&
            D.jsx(Cu, {
              visible: b,
              transitionProps: S && v ? { duration: 0 } : void 0,
              ...a
            }),
          D.jsxs(wu, {
            radius: p,
            __hidden: S && v && m ? v !== S.currentId : !1,
            children: [
              E &&
                D.jsxs(Su, {
                  children: [
                    o && D.jsx(Eu, { children: o }),
                    l && D.jsx(gu, { ...c })
                  ]
                }),
              D.jsx(yu, { children: f })
            ]
          })
        ]
      })
    );
  });
Nn.classes = fr;
Nn.displayName = '@mantine/core/Modal';
Nn.Root = _u;
Nn.Overlay = Cu;
Nn.Content = wu;
Nn.Body = yu;
Nn.Header = Su;
Nn.Title = Eu;
Nn.CloseButton = gu;
Nn.Stack = H0;
var K0 = { root: 'm_6d731127' };
const lT = { gap: 'md', align: 'stretch', justify: 'flex-start' },
  uT = (e, { gap: n, align: o, justify: i }) => ({
    root: { '--stack-gap': iu(n), '--stack-align': o, '--stack-justify': i }
  }),
  wp = Ct((e, n) => {
    const o = Ge('Stack', lT, e),
      {
        classNames: i,
        className: a,
        style: l,
        styles: c,
        unstyled: f,
        vars: p,
        align: m,
        justify: v,
        gap: y,
        variant: C,
        attributes: S,
        ...E
      } = o,
      _ = Dt({
        name: 'Stack',
        props: o,
        classes: K0,
        className: a,
        style: l,
        classNames: i,
        styles: c,
        unstyled: f,
        attributes: S,
        vars: p,
        varsResolver: uT
      });
    return D.jsx(Be, { ref: n, ..._('root'), variant: C, ...E });
  });
wp.classes = K0;
wp.displayName = '@mantine/core/Stack';
const Sp = w.createContext(null);
Sp.displayName = '@mantine/modals/ModalsContext';
function cT() {
  const e = w.useContext(Sp);
  if (!e)
    throw new Error(
      '[@mantine/modals] useModals hook was called outside of context, wrap your app with ModalsProvider component'
    );
  return e;
}
function fT({
  id: e,
  cancelProps: n,
  confirmProps: o,
  labels: i = { cancel: '', confirm: '' },
  closeOnConfirm: a = !0,
  closeOnCancel: l = !0,
  groupProps: c,
  onCancel: f,
  onConfirm: p,
  children: m
}) {
  const { cancel: v, confirm: y } = i,
    C = cT(),
    S = _ => {
      (typeof (n == null ? void 0 : n.onClick) == 'function' &&
        (n == null || n.onClick(_)),
        typeof f == 'function' && f(),
        l && C.closeModal(e));
    },
    E = _ => {
      (typeof (o == null ? void 0 : o.onClick) == 'function' &&
        (o == null || o.onClick(_)),
        typeof p == 'function' && p(),
        a && C.closeModal(e));
    };
  return D.jsxs(D.Fragment, {
    children: [
      m && D.jsx(Be, { mb: 'md', children: m }),
      D.jsxs(hp, {
        mt: m ? 0 : 'md',
        justify: 'flex-end',
        ...c,
        children: [
          D.jsx(Pi, {
            variant: 'default',
            ...n,
            onClick: S,
            children: (n == null ? void 0 : n.children) || v
          }),
          D.jsx(Pi, {
            ...o,
            onClick: E,
            children: (o == null ? void 0 : o.children) || y
          })
        ]
      })
    ]
  });
}
const [dT, Q0] = xE('mantine-modals');
Q0('closeModal');
Q0('closeAllModals');
function gy(e, n) {
  var o, i, a, l;
  (n &&
    e.type === 'confirm' &&
    ((i = (o = e.props).onCancel) == null || i.call(o)),
    (l = (a = e.props).onClose) == null || l.call(a));
}
function pT(e, n) {
  var o;
  switch (n.type) {
    case 'OPEN':
      return { current: n.modal, modals: [...e.modals, n.modal] };
    case 'CLOSE': {
      if (!e.modals.find(l => l.id === n.modalId)) return e;
      const a = e.modals.filter(l => l.id !== n.modalId);
      return { current: a[a.length - 1] || e.current, modals: a };
    }
    case 'CLOSE_ALL':
      return e.modals.length ? { current: e.current, modals: [] } : e;
    case 'UPDATE': {
      const { modalId: i, newProps: a } = n,
        l = e.modals.map(f =>
          f.id !== i
            ? f
            : f.type === 'content' || f.type === 'confirm'
              ? { ...f, props: { ...f.props, ...a } }
              : f.type === 'context'
                ? {
                    ...f,
                    props: {
                      ...f.props,
                      ...a,
                      innerProps: { ...f.props.innerProps, ...a.innerProps }
                    }
                  }
                : f
        ),
        c =
          (((o = e.current) == null ? void 0 : o.id) === i &&
            l.find(f => f.id === i)) ||
          e.current;
      return { ...e, modals: l, current: c };
    }
    default:
      return e;
  }
}
function hT(e) {
  if (!e) return { confirmProps: {}, modalProps: {} };
  const {
    id: n,
    children: o,
    onCancel: i,
    onConfirm: a,
    closeOnConfirm: l,
    closeOnCancel: c,
    cancelProps: f,
    confirmProps: p,
    groupProps: m,
    labels: v,
    ...y
  } = e;
  return {
    confirmProps: {
      id: n,
      children: o,
      onCancel: i,
      onConfirm: a,
      closeOnConfirm: l,
      closeOnCancel: c,
      cancelProps: f,
      confirmProps: p,
      groupProps: m,
      labels: v
    },
    modalProps: { id: n, ...y }
  };
}
function mT({ children: e, modalProps: n, labels: o, modals: i }) {
  const [a, l] = w.useReducer(pT, { modals: [], current: null }),
    c = w.useRef(a);
  c.current = a;
  const f = w.useCallback(
      R => {
        (c.current.modals
          .concat()
          .reverse()
          .forEach(T => {
            gy(T, R);
          }),
          l({ type: 'CLOSE_ALL', canceled: R }));
      },
      [c, l]
    ),
    p = w.useCallback(
      ({ modalId: R, ...T }) => {
        const k = R || Dl();
        return (
          l({ type: 'OPEN', modal: { id: k, type: 'content', props: T } }),
          k
        );
      },
      [l]
    ),
    m = w.useCallback(
      ({ modalId: R, ...T }) => {
        const k = R || Dl();
        return (
          l({ type: 'OPEN', modal: { id: k, type: 'confirm', props: T } }),
          k
        );
      },
      [l]
    ),
    v = w.useCallback(
      (R, { modalId: T, ...k }) => {
        const $ = T || Dl();
        return (
          l({
            type: 'OPEN',
            modal: { id: $, type: 'context', props: k, ctx: R }
          }),
          $
        );
      },
      [l]
    ),
    y = w.useCallback(
      (R, T) => {
        const k = c.current.modals.find($ => $.id === R);
        (k && gy(k, T), l({ type: 'CLOSE', modalId: R, canceled: T }));
      },
      [c, l]
    ),
    C = w.useCallback(
      ({ modalId: R, ...T }) => {
        l({ type: 'UPDATE', modalId: R, newProps: T });
      },
      [l]
    ),
    S = w.useCallback(
      ({ modalId: R, ...T }) => {
        l({ type: 'UPDATE', modalId: R, newProps: T });
      },
      [l]
    );
  dT({
    openModal: p,
    openConfirmModal: m,
    openContextModal: ({ modal: R, ...T }) => v(R, T),
    closeModal: y,
    closeContextModal: y,
    closeAllModals: f,
    updateModal: C,
    updateContextModal: S
  });
  const E = {
      modalProps: n || {},
      modals: a.modals,
      openModal: p,
      openConfirmModal: m,
      openContextModal: v,
      closeModal: y,
      closeContextModal: y,
      closeAll: f,
      updateModal: C,
      updateContextModal: S
    },
    _ = () => {
      const R = c.current.current;
      switch (R == null ? void 0 : R.type) {
        case 'context': {
          const { innerProps: T, ...k } = R.props,
            $ = i[R.ctx];
          return {
            modalProps: k,
            content: D.jsx($, { innerProps: T, context: E, id: R.id })
          };
        }
        case 'confirm': {
          const { modalProps: T, confirmProps: k } = hT(R.props);
          return {
            modalProps: T,
            content: D.jsx(fT, { ...k, id: R.id, labels: R.props.labels || o })
          };
        }
        case 'content': {
          const { children: T, ...k } = R.props;
          return { modalProps: k, content: T };
        }
        default:
          return { modalProps: {}, content: null };
      }
    },
    { modalProps: b, content: N } = _();
  return D.jsxs(Sp.Provider, {
    value: E,
    children: [
      D.jsx(Nn, {
        zIndex: xo('modal') + 1,
        ...n,
        ...b,
        opened: a.modals.length > 0,
        onClose: () => {
          var R;
          return y((R = a.current) == null ? void 0 : R.id);
        },
        children: N
      }),
      e
    ]
  });
}
var G0 = {};
function vT(e) {
  const n = new Error(e);
  if (n.stack === void 0)
    try {
      throw n;
    } catch {}
  return n;
}
var yT = vT,
  Oe = yT;
function gT(e) {
  return !!e && typeof e.then == 'function';
}
var Je = gT;
function wT(e, n) {
  if (e != null) return e;
  throw Oe(n ?? 'Got unexpected null or undefined');
}
var tt = wT;
function Ae(e, n, o) {
  return (
    n in e
      ? Object.defineProperty(e, n, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[n] = o),
    e
  );
}
class bu {
  getValue() {
    throw Oe('BaseLoadable');
  }
  toPromise() {
    throw Oe('BaseLoadable');
  }
  valueMaybe() {
    throw Oe('BaseLoadable');
  }
  valueOrThrow() {
    throw Oe(`Loadable expected value, but in "${this.state}" state`);
  }
  promiseMaybe() {
    throw Oe('BaseLoadable');
  }
  promiseOrThrow() {
    throw Oe(`Loadable expected promise, but in "${this.state}" state`);
  }
  errorMaybe() {
    throw Oe('BaseLoadable');
  }
  errorOrThrow() {
    throw Oe(`Loadable expected error, but in "${this.state}" state`);
  }
  is(n) {
    return n.state === this.state && n.contents === this.contents;
  }
  map(n) {
    throw Oe('BaseLoadable');
  }
}
class ST extends bu {
  constructor(n) {
    (super(),
      Ae(this, 'state', 'hasValue'),
      Ae(this, 'contents', void 0),
      (this.contents = n));
  }
  getValue() {
    return this.contents;
  }
  toPromise() {
    return Promise.resolve(this.contents);
  }
  valueMaybe() {
    return this.contents;
  }
  valueOrThrow() {
    return this.contents;
  }
  promiseMaybe() {}
  errorMaybe() {}
  map(n) {
    try {
      const o = n(this.contents);
      return Je(o) ? bo(o) : Ni(o) ? o : Zs(o);
    } catch (o) {
      return Je(o) ? bo(o.next(() => this.map(n))) : Ru(o);
    }
  }
}
class CT extends bu {
  constructor(n) {
    (super(),
      Ae(this, 'state', 'hasError'),
      Ae(this, 'contents', void 0),
      (this.contents = n));
  }
  getValue() {
    throw this.contents;
  }
  toPromise() {
    return Promise.reject(this.contents);
  }
  valueMaybe() {}
  promiseMaybe() {}
  errorMaybe() {
    return this.contents;
  }
  errorOrThrow() {
    return this.contents;
  }
  map(n) {
    return this;
  }
}
class Y0 extends bu {
  constructor(n) {
    (super(),
      Ae(this, 'state', 'loading'),
      Ae(this, 'contents', void 0),
      (this.contents = n));
  }
  getValue() {
    throw this.contents;
  }
  toPromise() {
    return this.contents;
  }
  valueMaybe() {}
  promiseMaybe() {
    return this.contents;
  }
  promiseOrThrow() {
    return this.contents;
  }
  errorMaybe() {}
  map(n) {
    return bo(
      this.contents
        .then(o => {
          const i = n(o);
          if (Ni(i)) {
            const a = i;
            switch (a.state) {
              case 'hasValue':
                return a.contents;
              case 'hasError':
                throw a.contents;
              case 'loading':
                return a.contents;
            }
          }
          return i;
        })
        .catch(o => {
          if (Je(o)) return o.then(() => this.map(n).contents);
          throw o;
        })
    );
  }
}
function Zs(e) {
  return Object.freeze(new ST(e));
}
function Ru(e) {
  return Object.freeze(new CT(e));
}
function bo(e) {
  return Object.freeze(new Y0(e));
}
function X0() {
  return Object.freeze(new Y0(new Promise(() => {})));
}
function _T(e) {
  return e.every(n => n.state === 'hasValue')
    ? Zs(e.map(n => n.contents))
    : e.some(n => n.state === 'hasError')
      ? Ru(
          tt(
            e.find(n => n.state === 'hasError'),
            'Invalid loadable passed to loadableAll'
          ).contents
        )
      : bo(Promise.all(e.map(n => n.contents)));
}
function q0(e) {
  const o = (
      Array.isArray(e) ? e : Object.getOwnPropertyNames(e).map(a => e[a])
    ).map(a => (Ni(a) ? a : Je(a) ? bo(a) : Zs(a))),
    i = _T(o);
  return Array.isArray(e)
    ? i
    : i.map(a =>
        Object.getOwnPropertyNames(e).reduce(
          (l, c, f) => ({ ...l, [c]: a[f] }),
          {}
        )
      );
}
function Ni(e) {
  return e instanceof bu;
}
const ET = {
  of: e => (Je(e) ? bo(e) : Ni(e) ? e : Zs(e)),
  error: e => Ru(e),
  loading: () => X0(),
  all: q0,
  isLoadable: Ni
};
var No = {
    loadableWithValue: Zs,
    loadableWithError: Ru,
    loadableWithPromise: bo,
    loadableLoading: X0,
    loadableAll: q0,
    isLoadable: Ni,
    RecoilLoadable: ET
  },
  bT = No.loadableWithValue,
  RT = No.loadableWithError,
  xT = No.loadableWithPromise,
  TT = No.loadableLoading,
  kT = No.loadableAll,
  PT = No.isLoadable,
  NT = No.RecoilLoadable,
  Js = Object.freeze({
    __proto__: null,
    loadableWithValue: bT,
    loadableWithError: RT,
    loadableWithPromise: xT,
    loadableLoading: TT,
    loadableAll: kT,
    isLoadable: PT,
    RecoilLoadable: NT
  });
const Ed = {
  RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: !0,
  RECOIL_GKS_ENABLED: new Set([
    'recoil_hamt_2020',
    'recoil_sync_external_store',
    'recoil_suppress_rerender_in_callback',
    'recoil_memory_managament_2020'
  ])
};
function LT(e, n) {
  var o, i;
  const a =
    (o = G0[e]) === null ||
    o === void 0 ||
    (i = o.toLowerCase()) === null ||
    i === void 0
      ? void 0
      : i.trim();
  if (a == null || a === '') return;
  if (!['true', 'false'].includes(a))
    throw Oe(`process.env.${e} value must be 'true', 'false', or empty: ${a}`);
  n(a === 'true');
}
function MT(e, n) {
  var o;
  const i = (o = G0[e]) === null || o === void 0 ? void 0 : o.trim();
  i == null || i === '' || n(i.split(/\s*,\s*|\s+/));
}
function AT() {
  var e;
  typeof process > 'u' ||
    (((e = process) === null || e === void 0 ? void 0 : e.env) != null &&
      (LT('RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED', n => {
        Ed.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = n;
      }),
      MT('RECOIL_GKS_ENABLED', n => {
        n.forEach(o => {
          Ed.RECOIL_GKS_ENABLED.add(o);
        });
      })));
}
AT();
var ea = Ed;
function xu(e) {
  return ea.RECOIL_GKS_ENABLED.has(e);
}
xu.setPass = e => {
  ea.RECOIL_GKS_ENABLED.add(e);
};
xu.setFail = e => {
  ea.RECOIL_GKS_ENABLED.delete(e);
};
xu.clear = () => {
  ea.RECOIL_GKS_ENABLED.clear();
};
var Qe = xu;
function $T(e, n, { error: o } = {}) {
  return null;
}
var OT = $T,
  Kt = OT,
  Yf,
  Xf,
  qf;
const IT =
    (Yf = ke.createMutableSource) !== null && Yf !== void 0
      ? Yf
      : ke.unstable_createMutableSource,
  Z0 =
    (Xf = ke.useMutableSource) !== null && Xf !== void 0
      ? Xf
      : ke.unstable_useMutableSource,
  Cp =
    (qf = ke.useSyncExternalStore) !== null && qf !== void 0
      ? qf
      : ke.unstable_useSyncExternalStore;
let wy = !1;
function DT() {
  var e;
  const { ReactCurrentDispatcher: n, ReactCurrentOwner: o } =
      ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    a =
      ((e = n == null ? void 0 : n.current) !== null && e !== void 0
        ? e
        : o.currentDispatcher
      ).useSyncExternalStore != null;
  return (Cp && !a && !wy && ((wy = !0), Kt()), a);
}
function FT() {
  return Qe('recoil_transition_support')
    ? { mode: 'TRANSITION_SUPPORT', early: !0, concurrent: !0 }
    : Qe('recoil_sync_external_store') && Cp != null
      ? { mode: 'SYNC_EXTERNAL_STORE', early: !0, concurrent: !1 }
      : Qe('recoil_mutable_source') &&
          Z0 != null &&
          typeof window < 'u' &&
          !window.$disableRecoilValueMutableSource_TEMP_HACK_DO_NOT_USE
        ? Qe('recoil_suppress_rerender_in_callback')
          ? { mode: 'MUTABLE_SOURCE', early: !0, concurrent: !0 }
          : { mode: 'MUTABLE_SOURCE', early: !1, concurrent: !1 }
        : Qe('recoil_suppress_rerender_in_callback')
          ? { mode: 'LEGACY', early: !0, concurrent: !1 }
          : { mode: 'LEGACY', early: !1, concurrent: !1 };
}
var _p = {
  createMutableSource: IT,
  useMutableSource: Z0,
  useSyncExternalStore: Cp,
  currentRendererSupportsUseSyncExternalStore: DT,
  reactMode: FT
};
class Ep {
  constructor(n) {
    (Ae(this, 'key', void 0), (this.key = n));
  }
  toJSON() {
    return { key: this.key };
  }
}
class J0 extends Ep {}
class ew extends Ep {}
function zT(e) {
  return e instanceof J0 || e instanceof ew;
}
var Tu = {
    AbstractRecoilValue: Ep,
    RecoilState: J0,
    RecoilValueReadOnly: ew,
    isRecoilValue: zT
  },
  jT = Tu.AbstractRecoilValue,
  VT = Tu.RecoilState,
  BT = Tu.RecoilValueReadOnly,
  UT = Tu.isRecoilValue,
  Ro = Object.freeze({
    __proto__: null,
    AbstractRecoilValue: jT,
    RecoilState: VT,
    RecoilValueReadOnly: BT,
    isRecoilValue: UT
  });
function WT(e, ...n) {}
var HT = WT,
  tw = HT;
function KT(e, n) {
  return (function* () {
    let o = 0;
    for (const i of e) yield n(i, o++);
  })();
}
var ku = KT;
class nw {}
const QT = new nw(),
  Li = new Map(),
  bp = new Map();
function GT(e) {
  return ku(e, n => tt(bp.get(n)));
}
function YT(e) {
  if (Li.has(e)) {
    const n = `Duplicate atom key "${e}". This is a FATAL ERROR in
      production. But it is safe to ignore this warning if it occurred because of
      hot module replacement.`;
    console.warn(n);
  }
}
function XT(e) {
  (ea.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED && YT(e.key),
    Li.set(e.key, e));
  const n =
    e.set == null
      ? new Ro.RecoilValueReadOnly(e.key)
      : new Ro.RecoilState(e.key);
  return (bp.set(e.key, n), n);
}
class qT extends Error {}
function ZT(e) {
  const n = Li.get(e);
  if (n == null) throw new qT(`Missing definition for RecoilValue: "${e}""`);
  return n;
}
function JT(e) {
  return Li.get(e);
}
const Xl = new Map();
function ek(e) {
  var n;
  if (!Qe('recoil_memory_managament_2020')) return;
  const o = Li.get(e);
  if (
    o != null &&
    (n = o.shouldDeleteConfigOnRelease) !== null &&
    n !== void 0 &&
    n.call(o)
  ) {
    var i;
    (Li.delete(e), (i = rw(e)) === null || i === void 0 || i(), Xl.delete(e));
  }
}
function tk(e, n) {
  Qe('recoil_memory_managament_2020') &&
    (n === void 0 ? Xl.delete(e) : Xl.set(e, n));
}
function rw(e) {
  return Xl.get(e);
}
var Ln = {
  recoilValues: bp,
  registerNode: XT,
  getNode: ZT,
  getNodeMaybe: JT,
  deleteNodeConfigIfPossible: ek,
  setConfigDeletionHandler: tk,
  getConfigDeletionHandler: rw,
  recoilValuesForKeys: GT,
  DefaultValue: nw,
  DEFAULT_VALUE: QT
};
function nk(e, n) {
  n();
}
var rk = { enqueueExecution: nk };
function ok(e, n) {
  return ((n = { exports: {} }), e(n, n.exports), n.exports);
}
var ik = ok(function (e) {
  var n =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (j) {
            return typeof j;
          }
        : function (j) {
            return j &&
              typeof Symbol == 'function' &&
              j.constructor === Symbol &&
              j !== Symbol.prototype
              ? 'symbol'
              : typeof j;
          },
    o = {},
    i = 5,
    a = Math.pow(2, i),
    l = a - 1,
    c = a / 2,
    f = a / 4,
    p = {},
    m = function (I) {
      return function () {
        return I;
      };
    },
    v = (o.hash = function (j) {
      var I = typeof j > 'u' ? 'undefined' : n(j);
      if (I === 'number') return j;
      I !== 'string' && (j += '');
      for (var oe = 0, pe = 0, he = j.length; pe < he; ++pe) {
        var ge = j.charCodeAt(pe);
        oe = ((oe << 5) - oe + ge) | 0;
      }
      return oe;
    }),
    y = function (I) {
      return (
        (I -= (I >> 1) & 1431655765),
        (I = (I & 858993459) + ((I >> 2) & 858993459)),
        (I = (I + (I >> 4)) & 252645135),
        (I += I >> 8),
        (I += I >> 16),
        I & 127
      );
    },
    C = function (I, oe) {
      return (oe >>> I) & l;
    },
    S = function (I) {
      return 1 << I;
    },
    E = function (I, oe) {
      return y(I & (oe - 1));
    },
    _ = function (I, oe, pe, he) {
      var ge = he;
      if (!I) {
        var Re = he.length;
        ge = new Array(Re);
        for (var be = 0; be < Re; ++be) ge[be] = he[be];
      }
      return ((ge[oe] = pe), ge);
    },
    b = function (I, oe, pe) {
      var he = pe.length - 1,
        ge = 0,
        Re = 0,
        be = pe;
      if (I) ge = Re = oe;
      else for (be = new Array(he); ge < oe; ) be[Re++] = pe[ge++];
      for (++ge; ge <= he; ) be[Re++] = pe[ge++];
      return (I && (be.length = he), be);
    },
    N = function (I, oe, pe, he) {
      var ge = he.length;
      if (I) {
        for (var Re = ge; Re >= oe; ) he[Re--] = he[Re];
        return ((he[oe] = pe), he);
      }
      for (var be = 0, Pe = 0, $e = new Array(ge + 1); be < oe; )
        $e[Pe++] = he[be++];
      for ($e[oe] = pe; be < ge; ) $e[++Pe] = he[be++];
      return $e;
    },
    R = 1,
    T = 2,
    k = 3,
    $ = 4,
    W = { __hamt_isEmpty: !0 },
    H = function (I) {
      return I === W || (I && I.__hamt_isEmpty);
    },
    F = function (I, oe, pe, he) {
      return { type: R, edit: I, hash: oe, key: pe, value: he, _modify: O };
    },
    G = function (I, oe, pe) {
      return { type: T, edit: I, hash: oe, children: pe, _modify: X };
    },
    q = function (I, oe, pe) {
      return { type: k, edit: I, mask: oe, children: pe, _modify: U };
    },
    ce = function (I, oe, pe) {
      return { type: $, edit: I, size: oe, children: pe, _modify: L };
    },
    ye = function (I) {
      return I === W || I.type === R || I.type === T;
    },
    le = function (I, oe, pe, he, ge) {
      for (var Re = [], be = he, Pe = 0, $e = 0; be; ++$e)
        (be & 1 && (Re[$e] = ge[Pe++]), (be >>>= 1));
      return ((Re[oe] = pe), ce(I, Pe + 1, Re));
    },
    Z = function (I, oe, pe, he) {
      for (
        var ge = new Array(oe - 1), Re = 0, be = 0, Pe = 0, $e = he.length;
        Pe < $e;
        ++Pe
      )
        if (Pe !== pe) {
          var He = he[Pe];
          He && !H(He) && ((ge[Re++] = He), (be |= 1 << Pe));
        }
      return q(I, be, ge);
    },
    me = function j(I, oe, pe, he, ge, Re) {
      if (pe === ge) return G(I, pe, [Re, he]);
      var be = C(oe, pe),
        Pe = C(oe, ge);
      return q(
        I,
        S(be) | S(Pe),
        be === Pe
          ? [j(I, oe + i, pe, he, ge, Re)]
          : be < Pe
            ? [he, Re]
            : [Re, he]
      );
    },
    fe = function (I, oe, pe, he, ge, Re, be, Pe) {
      for (var $e = ge.length, He = 0; He < $e; ++He) {
        var _t = ge[He];
        if (pe(be, _t.key)) {
          var at = _t.value,
            xt = Re(at);
          return xt === at
            ? ge
            : xt === p
              ? (--Pe.value, b(I, He, ge))
              : _(I, He, F(oe, he, be, xt), ge);
        }
      }
      var Ft = Re();
      return Ft === p ? ge : (++Pe.value, _(I, $e, F(oe, he, be, Ft), ge));
    },
    ee = function (I, oe) {
      return I === oe.edit;
    },
    O = function (I, oe, pe, he, ge, Re, be) {
      if (oe(Re, this.key)) {
        var Pe = he(this.value);
        return Pe === this.value
          ? this
          : Pe === p
            ? (--be.value, W)
            : ee(I, this)
              ? ((this.value = Pe), this)
              : F(I, ge, Re, Pe);
      }
      var $e = he();
      return $e === p
        ? this
        : (++be.value, me(I, pe, this.hash, this, ge, F(I, ge, Re, $e)));
    },
    X = function (I, oe, pe, he, ge, Re, be) {
      if (ge === this.hash) {
        var Pe = ee(I, this),
          $e = fe(Pe, I, oe, this.hash, this.children, he, Re, be);
        return $e === this.children
          ? this
          : $e.length > 1
            ? G(I, this.hash, $e)
            : $e[0];
      }
      var He = he();
      return He === p
        ? this
        : (++be.value, me(I, pe, this.hash, this, ge, F(I, ge, Re, He)));
    },
    U = function (I, oe, pe, he, ge, Re, be) {
      var Pe = this.mask,
        $e = this.children,
        He = C(pe, ge),
        _t = S(He),
        at = E(Pe, _t),
        xt = Pe & _t,
        Ft = xt ? $e[at] : W,
        Jt = Ft._modify(I, oe, pe + i, he, ge, Re, be);
      if (Ft === Jt) return this;
      var pr = ee(I, this),
        hn = Pe,
        Xr = void 0;
      if (xt && H(Jt)) {
        if (((hn &= ~_t), !hn)) return W;
        if ($e.length <= 2 && ye($e[at ^ 1])) return $e[at ^ 1];
        Xr = b(pr, at, $e);
      } else if (!xt && !H(Jt)) {
        if ($e.length >= c) return le(I, He, Jt, Pe, $e);
        ((hn |= _t), (Xr = N(pr, at, Jt, $e)));
      } else Xr = _(pr, at, Jt, $e);
      return pr ? ((this.mask = hn), (this.children = Xr), this) : q(I, hn, Xr);
    },
    L = function (I, oe, pe, he, ge, Re, be) {
      var Pe = this.size,
        $e = this.children,
        He = C(pe, ge),
        _t = $e[He],
        at = (_t || W)._modify(I, oe, pe + i, he, ge, Re, be);
      if (_t === at) return this;
      var xt = ee(I, this),
        Ft = void 0;
      if (H(_t) && !H(at)) (++Pe, (Ft = _(xt, He, at, $e)));
      else if (!H(_t) && H(at)) {
        if ((--Pe, Pe <= f)) return Z(I, Pe, He, $e);
        Ft = _(xt, He, W, $e);
      } else Ft = _(xt, He, at, $e);
      return xt
        ? ((this.size = Pe), (this.children = Ft), this)
        : ce(I, Pe, Ft);
    };
  W._modify = function (j, I, oe, pe, he, ge, Re) {
    var be = pe();
    return be === p ? W : (++Re.value, F(j, he, ge, be));
  };
  function x(j, I, oe, pe, he) {
    ((this._editable = j),
      (this._edit = I),
      (this._config = oe),
      (this._root = pe),
      (this._size = he));
  }
  x.prototype.setTree = function (j, I) {
    return this._editable
      ? ((this._root = j), (this._size = I), this)
      : j === this._root
        ? this
        : new x(this._editable, this._edit, this._config, j, I);
  };
  var B = (o.tryGetHash = function (j, I, oe, pe) {
    for (var he = pe._root, ge = 0, Re = pe._config.keyEq; ; )
      switch (he.type) {
        case R:
          return Re(oe, he.key) ? he.value : j;
        case T: {
          if (I === he.hash)
            for (var be = he.children, Pe = 0, $e = be.length; Pe < $e; ++Pe) {
              var He = be[Pe];
              if (Re(oe, He.key)) return He.value;
            }
          return j;
        }
        case k: {
          var _t = C(ge, I),
            at = S(_t);
          if (he.mask & at) {
            ((he = he.children[E(he.mask, at)]), (ge += i));
            break;
          }
          return j;
        }
        case $: {
          if (((he = he.children[C(ge, I)]), he)) {
            ge += i;
            break;
          }
          return j;
        }
        default:
          return j;
      }
  });
  x.prototype.tryGetHash = function (j, I, oe) {
    return B(j, I, oe, this);
  };
  var Q = (o.tryGet = function (j, I, oe) {
    return B(j, oe._config.hash(I), I, oe);
  });
  x.prototype.tryGet = function (j, I) {
    return Q(j, I, this);
  };
  var te = (o.getHash = function (j, I, oe) {
    return B(void 0, j, I, oe);
  });
  ((x.prototype.getHash = function (j, I) {
    return te(j, I, this);
  }),
    (o.get = function (j, I) {
      return B(void 0, I._config.hash(j), j, I);
    }),
    (x.prototype.get = function (j, I) {
      return Q(I, j, this);
    }));
  var J = (o.has = function (j, I, oe) {
    return B(p, j, I, oe) !== p;
  });
  x.prototype.hasHash = function (j, I) {
    return J(j, I, this);
  };
  var de = (o.has = function (j, I) {
    return J(I._config.hash(j), j, I);
  });
  x.prototype.has = function (j) {
    return de(j, this);
  };
  var ae = function (I, oe) {
    return I === oe;
  };
  ((o.make = function (j) {
    return new x(
      0,
      0,
      { keyEq: (j && j.keyEq) || ae, hash: (j && j.hash) || v },
      W,
      0
    );
  }),
    (o.empty = o.make()));
  var _e = (o.isEmpty = function (j) {
    return j && !!H(j._root);
  });
  x.prototype.isEmpty = function () {
    return _e(this);
  };
  var Me = (o.modifyHash = function (j, I, oe, pe) {
    var he = { value: pe._size },
      ge = pe._root._modify(
        pe._editable ? pe._edit : NaN,
        pe._config.keyEq,
        0,
        j,
        I,
        oe,
        he
      );
    return pe.setTree(ge, he.value);
  });
  x.prototype.modifyHash = function (j, I, oe) {
    return Me(oe, j, I, this);
  };
  var Ue = (o.modify = function (j, I, oe) {
    return Me(j, oe._config.hash(I), I, oe);
  });
  x.prototype.modify = function (j, I) {
    return Ue(I, j, this);
  };
  var Ie = (o.setHash = function (j, I, oe, pe) {
    return Me(m(oe), j, I, pe);
  });
  x.prototype.setHash = function (j, I, oe) {
    return Ie(j, I, oe, this);
  };
  var We = (o.set = function (j, I, oe) {
    return Ie(oe._config.hash(j), j, I, oe);
  });
  x.prototype.set = function (j, I) {
    return We(j, I, this);
  };
  var mt = m(p),
    vt = (o.removeHash = function (j, I, oe) {
      return Me(mt, j, I, oe);
    });
  x.prototype.removeHash = x.prototype.deleteHash = function (j, I) {
    return vt(j, I, this);
  };
  var dt = (o.remove = function (j, I) {
    return vt(I._config.hash(j), j, I);
  });
  x.prototype.remove = x.prototype.delete = function (j) {
    return dt(j, this);
  };
  var Mn = (o.beginMutation = function (j) {
    return new x(j._editable + 1, j._edit + 1, j._config, j._root, j._size);
  });
  x.prototype.beginMutation = function () {
    return Mn(this);
  };
  var Kr = (o.endMutation = function (j) {
    return ((j._editable = j._editable && j._editable - 1), j);
  });
  x.prototype.endMutation = function () {
    return Kr(this);
  };
  var Qr = (o.mutate = function (j, I) {
    var oe = Mn(I);
    return (j(oe), Kr(oe));
  });
  x.prototype.mutate = function (j) {
    return Qr(j, this);
  };
  var pn = function (I) {
      return I && An(I[0], I[1], I[2], I[3], I[4]);
    },
    An = function (I, oe, pe, he, ge) {
      for (; pe < I; ) {
        var Re = oe[pe++];
        if (Re && !H(Re)) return Ao(Re, he, [I, oe, pe, he, ge]);
      }
      return pn(ge);
    },
    Ao = function (I, oe, pe) {
      switch (I.type) {
        case R:
          return { value: oe(I), rest: pe };
        case T:
        case $:
        case k:
          var he = I.children;
          return An(he.length, he, 0, oe, pe);
        default:
          return pn(pe);
      }
    },
    ia = { done: !0 };
  function $o(j) {
    this.v = j;
  }
  (($o.prototype.next = function () {
    if (!this.v) return ia;
    var j = this.v;
    return ((this.v = pn(j.rest)), j);
  }),
    ($o.prototype[Symbol.iterator] = function () {
      return this;
    }));
  var Oo = function (I, oe) {
      return new $o(Ao(I._root, oe));
    },
    sa = function (I) {
      return [I.key, I.value];
    },
    Ui = (o.entries = function (j) {
      return Oo(j, sa);
    });
  x.prototype.entries = x.prototype[Symbol.iterator] = function () {
    return Ui(this);
  };
  var Io = function (I) {
      return I.key;
    },
    aa = (o.keys = function (j) {
      return Oo(j, Io);
    });
  x.prototype.keys = function () {
    return aa(this);
  };
  var Gr = function (I) {
      return I.value;
    },
    Yr =
      (o.values =
      x.prototype.values =
        function (j) {
          return Oo(j, Gr);
        });
  x.prototype.values = function () {
    return Yr(this);
  };
  var la = (o.fold = function (j, I, oe) {
    var pe = oe._root;
    if (pe.type === R) return j(I, pe.value, pe.key);
    for (var he = [pe.children], ge = void 0; (ge = he.pop()); )
      for (var Re = 0, be = ge.length; Re < be; ) {
        var Pe = ge[Re++];
        Pe &&
          Pe.type &&
          (Pe.type === R ? (I = j(I, Pe.value, Pe.key)) : he.push(Pe.children));
      }
    return I;
  });
  x.prototype.fold = function (j, I) {
    return la(j, I, this);
  };
  var ua = (o.forEach = function (j, I) {
    return la(
      function (oe, pe, he) {
        return j(pe, he, I);
      },
      null,
      I
    );
  });
  x.prototype.forEach = function (j) {
    return ua(j, this);
  };
  var ca = (o.count = function (j) {
    return j._size;
  });
  ((x.prototype.count = function () {
    return ca(this);
  }),
    Object.defineProperty(x.prototype, 'size', { get: x.prototype.count }),
    e.exports ? (e.exports = o) : ((void 0).hamt = o));
});
class sk {
  constructor(n) {
    (Ae(this, '_map', void 0),
      (this._map = new Map(n == null ? void 0 : n.entries())));
  }
  keys() {
    return this._map.keys();
  }
  entries() {
    return this._map.entries();
  }
  get(n) {
    return this._map.get(n);
  }
  has(n) {
    return this._map.has(n);
  }
  set(n, o) {
    return (this._map.set(n, o), this);
  }
  delete(n) {
    return (this._map.delete(n), this);
  }
  clone() {
    return xp(this);
  }
  toMap() {
    return new Map(this._map);
  }
}
class Rp {
  constructor(n) {
    if ((Ae(this, '_hamt', ik.empty.beginMutation()), n instanceof Rp)) {
      const o = n._hamt.endMutation();
      ((n._hamt = o.beginMutation()), (this._hamt = o.beginMutation()));
    } else if (n) for (const [o, i] of n.entries()) this._hamt.set(o, i);
  }
  keys() {
    return this._hamt.keys();
  }
  entries() {
    return this._hamt.entries();
  }
  get(n) {
    return this._hamt.get(n);
  }
  has(n) {
    return this._hamt.has(n);
  }
  set(n, o) {
    return (this._hamt.set(n, o), this);
  }
  delete(n) {
    return (this._hamt.delete(n), this);
  }
  clone() {
    return xp(this);
  }
  toMap() {
    return new Map(this._hamt);
  }
}
function xp(e) {
  return Qe('recoil_hamt_2020') ? new Rp(e) : new sk(e);
}
var ak = { persistentMap: xp },
  lk = ak.persistentMap,
  uk = Object.freeze({ __proto__: null, persistentMap: lk });
function ck(e, ...n) {
  const o = new Set();
  e: for (const i of e) {
    for (const a of n) if (a.has(i)) continue e;
    o.add(i);
  }
  return o;
}
var Sy = ck;
function fk(e, n) {
  const o = new Map();
  return (
    e.forEach((i, a) => {
      o.set(a, n(i, a));
    }),
    o
  );
}
var Cy = fk;
function dk() {
  return { nodeDeps: new Map(), nodeToNodeSubscriptions: new Map() };
}
function pk(e) {
  return {
    nodeDeps: Cy(e.nodeDeps, n => new Set(n)),
    nodeToNodeSubscriptions: Cy(e.nodeToNodeSubscriptions, n => new Set(n))
  };
}
function Zf(e, n, o, i) {
  const { nodeDeps: a, nodeToNodeSubscriptions: l } = o,
    c = a.get(e);
  if (c && i && c !== i.nodeDeps.get(e)) return;
  a.set(e, n);
  const f = c == null ? n : Sy(n, c);
  for (const p of f) (l.has(p) || l.set(p, new Set()), tt(l.get(p)).add(e));
  if (c) {
    const p = Sy(c, n);
    for (const m of p) {
      if (!l.has(m)) return;
      const v = tt(l.get(m));
      (v.delete(e), v.size === 0 && l.delete(m));
    }
  }
}
function hk(e, n, o, i) {
  var a, l, c, f;
  const p = o.getState();
  i === p.currentTree.version ||
    i === ((a = p.nextTree) === null || a === void 0 ? void 0 : a.version) ||
    i ===
      ((l = p.previousTree) === null || l === void 0 ? void 0 : l.version) ||
    Kt();
  const m = o.getGraph(i);
  if (
    (Zf(e, n, m),
    i === ((c = p.previousTree) === null || c === void 0 ? void 0 : c.version))
  ) {
    const y = o.getGraph(p.currentTree.version);
    Zf(e, n, y, m);
  }
  if (
    i ===
      ((f = p.previousTree) === null || f === void 0 ? void 0 : f.version) ||
    i === p.currentTree.version
  ) {
    var v;
    const y = (v = p.nextTree) === null || v === void 0 ? void 0 : v.version;
    if (y !== void 0) {
      const C = o.getGraph(y);
      Zf(e, n, C, m);
    }
  }
}
var ta = { cloneGraph: pk, graph: dk, saveDepsToStore: hk };
let mk = 0;
const vk = () => mk++;
let yk = 0;
const gk = () => yk++;
let wk = 0;
const Sk = () => wk++;
var Pu = {
  getNextTreeStateVersion: vk,
  getNextStoreID: gk,
  getNextComponentID: Sk
};
const { persistentMap: _y } = uk,
  { graph: Ck } = ta,
  { getNextTreeStateVersion: ow } = Pu;
function _k() {
  const e = ow();
  return {
    version: e,
    stateID: e,
    transactionMetadata: {},
    dirtyAtoms: new Set(),
    atomValues: _y(),
    nonvalidatedAtoms: _y()
  };
}
function Ek() {
  const e = _k();
  return {
    currentTree: e,
    nextTree: null,
    previousTree: null,
    commitDepth: 0,
    knownAtoms: new Set(),
    knownSelectors: new Set(),
    transactionSubscriptions: new Map(),
    nodeTransactionSubscriptions: new Map(),
    nodeToComponentSubscriptions: new Map(),
    queuedComponentCallbacks_DEPRECATED: [],
    suspendedComponentResolvers: new Set(),
    graphsByVersion: new Map().set(e.version, Ck()),
    retention: {
      referenceCounts: new Map(),
      nodesRetainedByZone: new Map(),
      retainablesToCheckForRelease: new Set()
    },
    nodeCleanupFunctions: new Map()
  };
}
var iw = { makeEmptyStoreState: Ek, getNextTreeStateVersion: ow };
class bk {}
var Tp = { RetentionZone: bk };
function Rk(e, n) {
  const o = new Set(e);
  return (o.add(n), o);
}
var xk = { setByAddingToSet: Rk };
function* Tk(e, n) {
  let o = 0;
  for (const i of e) n(i, o++) && (yield i);
}
var kp = Tk;
function kk(e, n) {
  return new Proxy(e, {
    get: (i, a) => (!(a in i) && a in n && (i[a] = n[a]()), i[a]),
    ownKeys: i => Object.keys(i)
  });
}
var sw = kk;
const { getNode: na, getNodeMaybe: Pk, recoilValuesForKeys: Ey } = Ln,
  { RetentionZone: by } = Tp,
  { setByAddingToSet: Nk } = xk,
  Lk = Object.freeze(new Set());
class Mk extends Error {}
function Ak(e, n, o) {
  if (!Qe('recoil_memory_managament_2020')) return () => {};
  const { nodesRetainedByZone: i } = e.getState().retention;
  function a(l) {
    let c = i.get(l);
    (c || i.set(l, (c = new Set())), c.add(n));
  }
  if (o instanceof by) a(o);
  else if (Array.isArray(o)) for (const l of o) a(l);
  return () => {
    if (!Qe('recoil_memory_managament_2020')) return;
    const { retention: l } = e.getState();
    function c(f) {
      const p = l.nodesRetainedByZone.get(f);
      (p == null || p.delete(n),
        p && p.size === 0 && l.nodesRetainedByZone.delete(f));
    }
    if (o instanceof by) c(o);
    else if (Array.isArray(o)) for (const f of o) c(f);
  };
}
function Pp(e, n, o, i) {
  const a = e.getState();
  if (a.nodeCleanupFunctions.has(o)) return;
  const l = na(o),
    c = Ak(e, o, l.retainedBy),
    f = l.init(e, n, i);
  a.nodeCleanupFunctions.set(o, () => {
    (f(), c());
  });
}
function $k(e, n, o) {
  Pp(e, e.getState().currentTree, n, o);
}
function Ok(e, n) {
  var o;
  const i = e.getState();
  ((o = i.nodeCleanupFunctions.get(n)) === null || o === void 0 || o(),
    i.nodeCleanupFunctions.delete(n));
}
function Ik(e, n, o) {
  return (Pp(e, n, o, 'get'), na(o).get(e, n));
}
function aw(e, n, o) {
  return na(o).peek(e, n);
}
function Dk(e, n, o) {
  var i;
  const a = Pk(n);
  return (
    a == null || (i = a.invalidate) === null || i === void 0 || i.call(a, e),
    {
      ...e,
      atomValues: e.atomValues.clone().delete(n),
      nonvalidatedAtoms: e.nonvalidatedAtoms.clone().set(n, o),
      dirtyAtoms: Nk(e.dirtyAtoms, n)
    }
  );
}
function Fk(e, n, o, i) {
  const a = na(o);
  if (a.set == null) throw new Mk(`Attempt to set read-only RecoilValue: ${o}`);
  const l = a.set;
  return (Pp(e, n, o, 'set'), l(e, n, i));
}
function zk(e, n, o) {
  const i = e.getState(),
    a = e.getGraph(n.version),
    l = na(o).nodeType;
  return sw(
    { type: l },
    {
      loadable: () => aw(e, n, o),
      isActive: () => i.knownAtoms.has(o) || i.knownSelectors.has(o),
      isSet: () => (l === 'selector' ? !1 : n.atomValues.has(o)),
      isModified: () => n.dirtyAtoms.has(o),
      deps: () => {
        var c;
        return Ey((c = a.nodeDeps.get(o)) !== null && c !== void 0 ? c : []);
      },
      subscribers: () => {
        var c, f;
        return {
          nodes: Ey(kp(lw(e, n, new Set([o])), p => p !== o)),
          components: ku(
            (c =
              (f = i.nodeToComponentSubscriptions.get(o)) === null ||
              f === void 0
                ? void 0
                : f.values()) !== null && c !== void 0
              ? c
              : [],
            ([p]) => ({ name: p })
          )
        };
      }
    }
  );
}
function lw(e, n, o) {
  const i = new Set(),
    a = Array.from(o),
    l = e.getGraph(n.version);
  for (let f = a.pop(); f; f = a.pop()) {
    var c;
    i.add(f);
    const p =
      (c = l.nodeToNodeSubscriptions.get(f)) !== null && c !== void 0 ? c : Lk;
    for (const m of p) i.has(m) || a.push(m);
  }
  return i;
}
var Lo = {
  getNodeLoadable: Ik,
  peekNodeLoadable: aw,
  setNodeValue: Fk,
  initializeNode: $k,
  cleanUpNode: Ok,
  setUnvalidatedAtomValue_DEPRECATED: Dk,
  peekNodeInfo: zk,
  getDownstreamNodes: lw
};
let uw = null;
function jk(e) {
  uw = e;
}
function Vk() {
  var e;
  (e = uw) === null || e === void 0 || e();
}
var cw = { setInvalidateMemoizedSnapshot: jk, invalidateMemoizedSnapshot: Vk };
const { getDownstreamNodes: Bk, getNodeLoadable: fw, setNodeValue: Uk } = Lo,
  { getNextComponentID: Wk } = Pu,
  { getNode: Hk, getNodeMaybe: dw } = Ln,
  { DefaultValue: Np } = Ln,
  { reactMode: Kk } = _p,
  {
    AbstractRecoilValue: Qk,
    RecoilState: yA,
    RecoilValueReadOnly: gA,
    isRecoilValue: wA
  } = Ro,
  { invalidateMemoizedSnapshot: Gk } = cw;
function Yk(e, { key: n }, o = e.getState().currentTree) {
  var i, a;
  const l = e.getState();
  o.version === l.currentTree.version ||
    o.version ===
      ((i = l.nextTree) === null || i === void 0 ? void 0 : i.version) ||
    o.version ===
      ((a = l.previousTree) === null || a === void 0 ? void 0 : a.version) ||
    Kt();
  const c = fw(e, o, n);
  return (c.state === 'loading' && c.contents.catch(() => {}), c);
}
function Xk(e, n) {
  const o = e.clone();
  return (
    n.forEach((i, a) => {
      i.state === 'hasValue' && i.contents instanceof Np
        ? o.delete(a)
        : o.set(a, i);
    }),
    o
  );
}
function qk(e, n, { key: o }, i) {
  if (typeof i == 'function') {
    const a = fw(e, n, o);
    if (a.state === 'loading') {
      const l = `Tried to set atom or selector "${o}" using an updater function while the current state is pending, this is not currently supported.`;
      throw (Kt(), Oe(l));
    } else if (a.state === 'hasError') throw a.contents;
    return i(a.contents);
  } else return i;
}
function Zk(e, n, o) {
  if (o.type === 'set') {
    const { recoilValue: a, valueOrUpdater: l } = o,
      c = qk(e, n, a, l),
      f = Uk(e, n, a.key, c);
    for (const [p, m] of f.entries()) bd(n, p, m);
  } else if (o.type === 'setLoadable') {
    const {
      recoilValue: { key: a },
      loadable: l
    } = o;
    bd(n, a, l);
  } else if (o.type === 'markModified') {
    const {
      recoilValue: { key: a }
    } = o;
    n.dirtyAtoms.add(a);
  } else if (o.type === 'setUnvalidated') {
    var i;
    const {
        recoilValue: { key: a },
        unvalidatedValue: l
      } = o,
      c = dw(a);
    (c == null || (i = c.invalidate) === null || i === void 0 || i.call(c, n),
      n.atomValues.delete(a),
      n.nonvalidatedAtoms.set(a, l),
      n.dirtyAtoms.add(a));
  } else Kt(`Unknown action ${o.type}`);
}
function bd(e, n, o) {
  (o.state === 'hasValue' && o.contents instanceof Np
    ? e.atomValues.delete(n)
    : e.atomValues.set(n, o),
    e.dirtyAtoms.add(n),
    e.nonvalidatedAtoms.delete(n));
}
function pw(e, n) {
  e.replaceState(o => {
    const i = hw(o);
    for (const a of n) Zk(e, i, a);
    return (mw(e, i), Gk(), i);
  });
}
function Nu(e, n) {
  if (As.length) {
    const o = As[As.length - 1];
    let i = o.get(e);
    (i || o.set(e, (i = [])), i.push(n));
  } else pw(e, [n]);
}
const As = [];
function Jk() {
  const e = new Map();
  return (
    As.push(e),
    () => {
      for (const [o, i] of e) pw(o, i);
      As.pop() !== e && Kt();
    }
  );
}
function hw(e) {
  return {
    ...e,
    atomValues: e.atomValues.clone(),
    nonvalidatedAtoms: e.nonvalidatedAtoms.clone(),
    dirtyAtoms: new Set(e.dirtyAtoms)
  };
}
function mw(e, n) {
  const o = Bk(e, n, n.dirtyAtoms);
  for (const l of o) {
    var i, a;
    (i = dw(l)) === null ||
      i === void 0 ||
      (a = i.invalidate) === null ||
      a === void 0 ||
      a.call(i, n);
  }
}
function vw(e, n, o) {
  Nu(e, { type: 'set', recoilValue: n, valueOrUpdater: o });
}
function e2(e, n, o) {
  if (o instanceof Np) return vw(e, n, o);
  Nu(e, { type: 'setLoadable', recoilValue: n, loadable: o });
}
function t2(e, n) {
  Nu(e, { type: 'markModified', recoilValue: n });
}
function n2(e, n, o) {
  Nu(e, { type: 'setUnvalidated', recoilValue: n, unvalidatedValue: o });
}
function r2(e, { key: n }, o, i = null) {
  const a = Wk(),
    l = e.getState();
  (l.nodeToComponentSubscriptions.has(n) ||
    l.nodeToComponentSubscriptions.set(n, new Map()),
    tt(l.nodeToComponentSubscriptions.get(n)).set(a, [
      i ?? '<not captured>',
      o
    ]));
  const c = Kk();
  if (c.early && (c.mode === 'LEGACY' || c.mode === 'MUTABLE_SOURCE')) {
    const f = e.getState().nextTree;
    f && f.dirtyAtoms.has(n) && o(f);
  }
  return {
    release: () => {
      const f = e.getState(),
        p = f.nodeToComponentSubscriptions.get(n);
      if (p === void 0 || !p.has(a)) {
        Kt();
        return;
      }
      (p.delete(a), p.size === 0 && f.nodeToComponentSubscriptions.delete(n));
    }
  };
}
function o2(e, n) {
  var o;
  const { currentTree: i } = e.getState(),
    a = Hk(n.key);
  (o = a.clearCache) === null || o === void 0 || o.call(a, e, i);
}
var dr = {
  AbstractRecoilValue: Qk,
  getRecoilValueAsLoadable: Yk,
  setRecoilValue: vw,
  setRecoilValueLoadable: e2,
  markRecoilValueModified: t2,
  setUnvalidatedRecoilValue: n2,
  subscribeToRecoilValue: r2,
  applyAtomValueWrites: Xk,
  batchStart: Jk,
  writeLoadableToTreeState: bd,
  invalidateDownstreams: mw,
  copyTreeState: hw,
  refreshRecoilValue: o2
};
function i2(e, n, o) {
  const i = e.entries();
  let a = i.next();
  for (; !a.done; ) {
    const l = a.value;
    if (n.call(o, l[1], l[0], e)) return !0;
    a = i.next();
  }
  return !1;
}
var s2 = i2;
const { cleanUpNode: a2 } = Lo,
  { deleteNodeConfigIfPossible: l2, getNode: yw } = Ln,
  { RetentionZone: gw } = Tp,
  u2 = 12e4,
  ww = new Set();
function Sw(e, n) {
  const o = e.getState(),
    i = o.currentTree;
  if (o.nextTree) {
    Kt();
    return;
  }
  const a = new Set();
  for (const c of n)
    if (c instanceof gw) for (const f of p2(o, c)) a.add(f);
    else a.add(c);
  const l = c2(e, a);
  for (const c of l) d2(e, i, c);
}
function c2(e, n) {
  const o = e.getState(),
    i = o.currentTree,
    a = e.getGraph(i.version),
    l = new Set(),
    c = new Set();
  return (f(n), l);
  function f(p) {
    const m = new Set(),
      v = f2(e, i, p, l, c);
    for (const E of v) {
      var y;
      if (yw(E).retainedBy === 'recoilRoot') {
        c.add(E);
        continue;
      }
      if (
        ((y = o.retention.referenceCounts.get(E)) !== null && y !== void 0
          ? y
          : 0) > 0
      ) {
        c.add(E);
        continue;
      }
      if (Cw(E).some(b => o.retention.referenceCounts.get(b))) {
        c.add(E);
        continue;
      }
      const _ = a.nodeToNodeSubscriptions.get(E);
      if (_ && s2(_, b => c.has(b))) {
        c.add(E);
        continue;
      }
      (l.add(E), m.add(E));
    }
    const C = new Set();
    for (const E of m)
      for (const _ of (S = a.nodeDeps.get(E)) !== null && S !== void 0
        ? S
        : ww) {
        var S;
        l.has(_) || C.add(_);
      }
    C.size && f(C);
  }
}
function f2(e, n, o, i, a) {
  const l = e.getGraph(n.version),
    c = [],
    f = new Set();
  for (; o.size > 0; ) p(tt(o.values().next().value));
  return c;
  function p(m) {
    if (i.has(m) || a.has(m)) {
      o.delete(m);
      return;
    }
    if (f.has(m)) return;
    const v = l.nodeToNodeSubscriptions.get(m);
    if (v) for (const y of v) p(y);
    (f.add(m), o.delete(m), c.push(m));
  }
}
function d2(e, n, o) {
  if (!Qe('recoil_memory_managament_2020')) return;
  a2(e, o);
  const i = e.getState();
  (i.knownAtoms.delete(o),
    i.knownSelectors.delete(o),
    i.nodeTransactionSubscriptions.delete(o),
    i.retention.referenceCounts.delete(o));
  const a = Cw(o);
  for (const p of a) {
    var l;
    (l = i.retention.nodesRetainedByZone.get(p)) === null ||
      l === void 0 ||
      l.delete(o);
  }
  (n.atomValues.delete(o),
    n.dirtyAtoms.delete(o),
    n.nonvalidatedAtoms.delete(o));
  const c = i.graphsByVersion.get(n.version);
  if (c) {
    const p = c.nodeDeps.get(o);
    if (p !== void 0) {
      c.nodeDeps.delete(o);
      for (const m of p) {
        var f;
        (f = c.nodeToNodeSubscriptions.get(m)) === null ||
          f === void 0 ||
          f.delete(o);
      }
    }
    c.nodeToNodeSubscriptions.delete(o);
  }
  l2(o);
}
function p2(e, n) {
  var o;
  return (o = e.retention.nodesRetainedByZone.get(n)) !== null && o !== void 0
    ? o
    : ww;
}
function Cw(e) {
  const n = yw(e).retainedBy;
  return n === void 0 || n === 'components' || n === 'recoilRoot'
    ? []
    : n instanceof gw
      ? [n]
      : n;
}
function h2(e, n) {
  const o = e.getState();
  o.nextTree
    ? o.retention.retainablesToCheckForRelease.add(n)
    : Sw(e, new Set([n]));
}
function m2(e, n, o) {
  var i;
  if (!Qe('recoil_memory_managament_2020')) return;
  const a = e.getState().retention.referenceCounts,
    l = ((i = a.get(n)) !== null && i !== void 0 ? i : 0) + o;
  l === 0 ? v2(e, n) : a.set(n, l);
}
function v2(e, n) {
  if (!Qe('recoil_memory_managament_2020')) return;
  (e.getState().retention.referenceCounts.delete(n), h2(e, n));
}
function y2(e) {
  if (!Qe('recoil_memory_managament_2020')) return;
  const n = e.getState();
  (Sw(e, n.retention.retainablesToCheckForRelease),
    n.retention.retainablesToCheckForRelease.clear());
}
function g2(e) {
  return e === void 0 ? 'recoilRoot' : e;
}
var Vi = {
  SUSPENSE_TIMEOUT_MS: u2,
  updateRetainCount: m2,
  releaseScheduledRetainablesNow: y2,
  retainedByOptionWithDefault: g2
};
const { unstable_batchedUpdates: w2 } = cg;
var S2 = { unstable_batchedUpdates: w2 };
const { unstable_batchedUpdates: C2 } = S2;
var _2 = { unstable_batchedUpdates: C2 };
const { batchStart: E2 } = dr,
  { unstable_batchedUpdates: b2 } = _2;
let R2 = b2 || (e => e());
const x2 = e => {
  R2(() => {
    let n = () => {};
    try {
      ((n = E2()), e());
    } finally {
      n();
    }
  });
};
var Lp = { batchUpdates: x2 };
function* T2(e) {
  for (const n of e) for (const o of n) yield o;
}
var _w = T2;
const k2 = typeof Window > 'u' || typeof window > 'u';
var Mp = { isSSR: k2 };
function P2(e, n) {
  let o, i;
  return [
    (...c) => {
      const f = n(...c);
      return (o === f || ((o = f), (i = e(...c))), i);
    },
    () => {
      o = null;
    }
  ];
}
var N2 = { memoizeOneWithArgsHashAndInvalidation: P2 };
const { batchUpdates: Rd } = Lp,
  { initializeNode: L2, peekNodeInfo: M2 } = Lo,
  { graph: A2 } = ta,
  { getNextStoreID: $2 } = Pu,
  { DEFAULT_VALUE: O2, recoilValues: Ry, recoilValuesForKeys: xy } = Ln,
  {
    AbstractRecoilValue: I2,
    getRecoilValueAsLoadable: D2,
    setRecoilValue: Ty,
    setUnvalidatedRecoilValue: F2
  } = dr,
  { updateRetainCount: Vl } = Vi,
  { setInvalidateMemoizedSnapshot: z2 } = cw,
  { getNextTreeStateVersion: j2, makeEmptyStoreState: V2 } = iw,
  { isSSR: B2 } = Mp,
  { memoizeOneWithArgsHashAndInvalidation: U2 } = N2;
class Lu {
  constructor(n, o) {
    (Ae(this, '_store', void 0),
      Ae(this, '_refCount', 1),
      Ae(
        this,
        'getLoadable',
        i => (this.checkRefCount_INTERNAL(), D2(this._store, i))
      ),
      Ae(
        this,
        'getPromise',
        i => (this.checkRefCount_INTERNAL(), this.getLoadable(i).toPromise())
      ),
      Ae(this, 'getNodes_UNSTABLE', i => {
        if (
          (this.checkRefCount_INTERNAL(),
          (i == null ? void 0 : i.isModified) === !0)
        ) {
          if ((i == null ? void 0 : i.isInitialized) === !1) return [];
          const c = this._store.getState().currentTree;
          return xy(c.dirtyAtoms);
        }
        const a = this._store.getState().knownAtoms,
          l = this._store.getState().knownSelectors;
        return (i == null ? void 0 : i.isInitialized) == null
          ? Ry.values()
          : i.isInitialized === !0
            ? xy(_w([a, l]))
            : kp(Ry.values(), ({ key: c }) => !a.has(c) && !l.has(c));
      }),
      Ae(
        this,
        'getInfo_UNSTABLE',
        ({ key: i }) => (
          this.checkRefCount_INTERNAL(),
          M2(this._store, this._store.getState().currentTree, i)
        )
      ),
      Ae(this, 'map', i => {
        this.checkRefCount_INTERNAL();
        const a = new xd(this, Rd);
        return (i(a), a);
      }),
      Ae(this, 'asyncMap', async i => {
        this.checkRefCount_INTERNAL();
        const a = new xd(this, Rd);
        return (a.retain(), await i(a), a.autoRelease_INTERNAL(), a);
      }),
      (this._store = {
        storeID: $2(),
        parentStoreID: o,
        getState: () => n,
        replaceState: i => {
          n.currentTree = i(n.currentTree);
        },
        getGraph: i => {
          const a = n.graphsByVersion;
          if (a.has(i)) return tt(a.get(i));
          const l = A2();
          return (a.set(i, l), l);
        },
        subscribeToTransactions: () => ({ release: () => {} }),
        addTransactionMetadata: () => {
          throw Oe('Cannot subscribe to Snapshots');
        }
      }));
    for (const i of this._store.getState().knownAtoms)
      (L2(this._store, i, 'get'), Vl(this._store, i, 1));
    this.autoRelease_INTERNAL();
  }
  retain() {
    (this._refCount <= 0 && Kt(), this._refCount++);
    let n = !1;
    return () => {
      n || ((n = !0), this._release());
    };
  }
  autoRelease_INTERNAL() {
    B2 || window.setTimeout(() => this._release(), 10);
  }
  _release() {
    if ((this._refCount--, this._refCount === 0)) {
      if (
        (this._store.getState().nodeCleanupFunctions.forEach(n => n()),
        this._store.getState().nodeCleanupFunctions.clear(),
        !Qe('recoil_memory_managament_2020'))
      )
        return;
    } else this._refCount < 0;
  }
  isRetained() {
    return this._refCount > 0;
  }
  checkRefCount_INTERNAL() {
    Qe('recoil_memory_managament_2020') && this._refCount <= 0;
  }
  getStore_INTERNAL() {
    return (this.checkRefCount_INTERNAL(), this._store);
  }
  getID() {
    return (
      this.checkRefCount_INTERNAL(),
      this._store.getState().currentTree.stateID
    );
  }
  getStoreID() {
    return (this.checkRefCount_INTERNAL(), this._store.storeID);
  }
}
function Ew(e, n, o = !1) {
  const i = e.getState(),
    a = o ? j2() : n.version;
  return {
    currentTree: {
      version: o ? a : n.version,
      stateID: o ? a : n.stateID,
      transactionMetadata: { ...n.transactionMetadata },
      dirtyAtoms: new Set(n.dirtyAtoms),
      atomValues: n.atomValues.clone(),
      nonvalidatedAtoms: n.nonvalidatedAtoms.clone()
    },
    commitDepth: 0,
    nextTree: null,
    previousTree: null,
    knownAtoms: new Set(i.knownAtoms),
    knownSelectors: new Set(i.knownSelectors),
    transactionSubscriptions: new Map(),
    nodeTransactionSubscriptions: new Map(),
    nodeToComponentSubscriptions: new Map(),
    queuedComponentCallbacks_DEPRECATED: [],
    suspendedComponentResolvers: new Set(),
    graphsByVersion: new Map().set(a, e.getGraph(n.version)),
    retention: {
      referenceCounts: new Map(),
      nodesRetainedByZone: new Map(),
      retainablesToCheckForRelease: new Set()
    },
    nodeCleanupFunctions: new Map(
      ku(i.nodeCleanupFunctions.entries(), ([l]) => [l, () => {}])
    )
  };
}
function W2(e) {
  const n = new Lu(V2());
  return e != null ? n.map(e) : n;
}
const [ky, bw] = U2(
  (e, n) => {
    var o;
    const i = e.getState(),
      a =
        n === 'latest'
          ? (o = i.nextTree) !== null && o !== void 0
            ? o
            : i.currentTree
          : tt(i.previousTree);
    return new Lu(Ew(e, a), e.storeID);
  },
  (e, n) => {
    var o, i;
    return (
      String(n) +
      String(e.storeID) +
      String(
        (o = e.getState().nextTree) === null || o === void 0
          ? void 0
          : o.version
      ) +
      String(e.getState().currentTree.version) +
      String(
        (i = e.getState().previousTree) === null || i === void 0
          ? void 0
          : i.version
      )
    );
  }
);
z2(bw);
function H2(e, n = 'latest') {
  const o = ky(e, n);
  return o.isRetained() ? o : (bw(), ky(e, n));
}
class xd extends Lu {
  constructor(n, o) {
    (super(
      Ew(
        n.getStore_INTERNAL(),
        n.getStore_INTERNAL().getState().currentTree,
        !0
      ),
      n.getStoreID()
    ),
      Ae(this, '_batch', void 0),
      Ae(this, 'set', (i, a) => {
        this.checkRefCount_INTERNAL();
        const l = this.getStore_INTERNAL();
        this._batch(() => {
          (Vl(l, i.key, 1), Ty(this.getStore_INTERNAL(), i, a));
        });
      }),
      Ae(this, 'reset', i => {
        this.checkRefCount_INTERNAL();
        const a = this.getStore_INTERNAL();
        this._batch(() => {
          (Vl(a, i.key, 1), Ty(this.getStore_INTERNAL(), i, O2));
        });
      }),
      Ae(this, 'setUnvalidatedAtomValues_DEPRECATED', i => {
        this.checkRefCount_INTERNAL();
        const a = this.getStore_INTERNAL();
        Rd(() => {
          for (const [l, c] of i.entries()) (Vl(a, l, 1), F2(a, new I2(l), c));
        });
      }),
      (this._batch = o));
  }
}
var Mu = {
    Snapshot: Lu,
    MutableSnapshot: xd,
    freshSnapshot: W2,
    cloneSnapshot: H2
  },
  K2 = Mu.Snapshot,
  Q2 = Mu.MutableSnapshot,
  G2 = Mu.freshSnapshot,
  Y2 = Mu.cloneSnapshot,
  Au = Object.freeze({
    __proto__: null,
    Snapshot: K2,
    MutableSnapshot: Q2,
    freshSnapshot: G2,
    cloneSnapshot: Y2
  });
function X2(...e) {
  const n = new Set();
  for (const o of e) for (const i of o) n.add(i);
  return n;
}
var q2 = X2;
const { useRef: Z2 } = ke;
function J2(e) {
  const n = Z2(e);
  return (n.current === e && typeof e == 'function' && (n.current = e()), n);
}
var Py = J2;
const { getNextTreeStateVersion: eP, makeEmptyStoreState: Rw } = iw,
  {
    cleanUpNode: tP,
    getDownstreamNodes: nP,
    initializeNode: rP,
    setNodeValue: oP,
    setUnvalidatedAtomValue_DEPRECATED: iP
  } = Lo,
  { graph: sP } = ta,
  { cloneGraph: aP } = ta,
  { getNextStoreID: xw } = Pu,
  { createMutableSource: Jf, reactMode: Tw } = _p,
  { applyAtomValueWrites: lP } = dr,
  { releaseScheduledRetainablesNow: kw } = Vi,
  { freshSnapshot: uP } = Au,
  {
    useCallback: cP,
    useContext: Pw,
    useEffect: Td,
    useMemo: fP,
    useRef: dP,
    useState: pP
  } = ke;
function Ts() {
  throw Oe('This component must be used inside a <RecoilRoot> component.');
}
const Nw = Object.freeze({
  storeID: xw(),
  getState: Ts,
  replaceState: Ts,
  getGraph: Ts,
  subscribeToTransactions: Ts,
  addTransactionMetadata: Ts
});
let kd = !1;
function Ny(e) {
  if (kd)
    throw Oe(
      'An atom update was triggered within the execution of a state updater function. State updater functions provided to Recoil must be pure functions.'
    );
  const n = e.getState();
  if (n.nextTree === null) {
    Qe('recoil_memory_managament_2020') &&
      Qe('recoil_release_on_cascading_update_killswitch_2021') &&
      n.commitDepth > 0 &&
      kw(e);
    const o = n.currentTree.version,
      i = eP();
    ((n.nextTree = {
      ...n.currentTree,
      version: i,
      stateID: i,
      dirtyAtoms: new Set(),
      transactionMetadata: {}
    }),
      n.graphsByVersion.set(i, aP(tt(n.graphsByVersion.get(o)))));
  }
}
const Lw = ke.createContext({ current: Nw }),
  Ap = () => Pw(Lw),
  Mw = ke.createContext(null);
function hP() {
  const e = Pw(Mw);
  return (e == null && tw(), e);
}
function Aw(e, n, o) {
  const i = nP(e, o, o.dirtyAtoms);
  for (const a of i) {
    const l = n.nodeToComponentSubscriptions.get(a);
    if (l) for (const [c, [f, p]] of l) p(o);
  }
}
function mP(e) {
  const n = e.getState(),
    o = n.currentTree,
    i = o.dirtyAtoms;
  if (i.size) {
    for (const [a, l] of n.nodeTransactionSubscriptions)
      if (i.has(a)) for (const [c, f] of l) f(e);
    for (const [a, l] of n.transactionSubscriptions) l(e);
    (!Tw().early || n.suspendedComponentResolvers.size > 0) &&
      (Aw(e, n, o),
      n.suspendedComponentResolvers.forEach(a => a()),
      n.suspendedComponentResolvers.clear());
  }
  (n.queuedComponentCallbacks_DEPRECATED.forEach(a => a(o)),
    n.queuedComponentCallbacks_DEPRECATED.splice(
      0,
      n.queuedComponentCallbacks_DEPRECATED.length
    ));
}
function vP(e) {
  const n = e.getState();
  n.commitDepth++;
  try {
    const { nextTree: o } = n;
    if (o == null) return;
    ((n.previousTree = n.currentTree),
      (n.currentTree = o),
      (n.nextTree = null),
      mP(e),
      n.previousTree != null
        ? n.graphsByVersion.delete(n.previousTree.version)
        : Kt(
            'Ended batch with no previous state, which is unexpected',
            'recoil'
          ),
      (n.previousTree = null),
      Qe('recoil_memory_managament_2020') && o == null && kw(e));
  } finally {
    n.commitDepth--;
  }
}
function yP({ setNotifyBatcherOfChange: e }) {
  const n = Ap(),
    [, o] = pP([]);
  return (
    e(() => o({})),
    Td(
      () => (
        e(() => o({})),
        () => {
          e(() => {});
        }
      ),
      [e]
    ),
    Td(() => {
      rk.enqueueExecution('Batcher', () => {
        vP(n.current);
      });
    }),
    null
  );
}
function gP(e, n) {
  const o = Rw();
  return (
    n({
      set: (i, a) => {
        const l = o.currentTree,
          c = oP(e, l, i.key, a),
          f = new Set(c.keys()),
          p = l.nonvalidatedAtoms.clone();
        for (const m of f) p.delete(m);
        o.currentTree = {
          ...l,
          dirtyAtoms: q2(l.dirtyAtoms, f),
          atomValues: lP(l.atomValues, c),
          nonvalidatedAtoms: p
        };
      },
      setUnvalidatedAtomValues: i => {
        i.forEach((a, l) => {
          o.currentTree = iP(o.currentTree, l, a);
        });
      }
    }),
    o
  );
}
function wP(e) {
  const n = uP(e),
    o = n.getStore_INTERNAL().getState();
  return (
    n.retain(),
    o.nodeCleanupFunctions.forEach(i => i()),
    o.nodeCleanupFunctions.clear(),
    o
  );
}
let Ly = 0;
function SP({
  initializeState_DEPRECATED: e,
  initializeState: n,
  store_INTERNAL: o,
  children: i
}) {
  let a;
  const l = S => {
      const E = a.current.graphsByVersion;
      if (E.has(S)) return tt(E.get(S));
      const _ = sP();
      return (E.set(S, _), _);
    },
    c = (S, E) => {
      if (E == null) {
        const { transactionSubscriptions: _ } = y.current.getState(),
          b = Ly++;
        return (
          _.set(b, S),
          {
            release: () => {
              _.delete(b);
            }
          }
        );
      } else {
        const { nodeTransactionSubscriptions: _ } = y.current.getState();
        _.has(E) || _.set(E, new Map());
        const b = Ly++;
        return (
          tt(_.get(E)).set(b, S),
          {
            release: () => {
              const N = _.get(E);
              N && (N.delete(b), N.size === 0 && _.delete(E));
            }
          }
        );
      }
    },
    f = S => {
      Ny(y.current);
      for (const E of Object.keys(S))
        tt(y.current.getState().nextTree).transactionMetadata[E] = S[E];
    },
    p = S => {
      Ny(y.current);
      const E = tt(a.current.nextTree);
      let _;
      try {
        ((kd = !0), (_ = S(E)));
      } finally {
        kd = !1;
      }
      _ !== E &&
        ((a.current.nextTree = _),
        Tw().early && Aw(y.current, a.current, _),
        tt(m.current)());
    },
    m = dP(null),
    v = cP(
      S => {
        m.current = S;
      },
      [m]
    ),
    y = Py(
      () =>
        o ?? {
          storeID: xw(),
          getState: () => a.current,
          replaceState: p,
          getGraph: l,
          subscribeToTransactions: c,
          addTransactionMetadata: f
        }
    );
  (o != null && (y.current = o),
    (a = Py(() => (e != null ? gP(y.current, e) : n != null ? wP(n) : Rw()))));
  const C = fP(
    () => (Jf == null ? void 0 : Jf(a, () => a.current.currentTree.version)),
    [a]
  );
  return (
    Td(() => {
      const S = y.current;
      for (const E of new Set(S.getState().knownAtoms)) rP(S, E, 'get');
      return () => {
        for (const E of S.getState().knownAtoms) tP(S, E);
      };
    }, [y]),
    ke.createElement(
      Lw.Provider,
      { value: y },
      ke.createElement(
        Mw.Provider,
        { value: C },
        ke.createElement(yP, { setNotifyBatcherOfChange: v }),
        i
      )
    )
  );
}
function CP(e) {
  const { override: n, ...o } = e,
    i = Ap();
  return n === !1 && i.current !== Nw ? e.children : ke.createElement(SP, o);
}
var $p = { RecoilRoot: CP, useStoreRef: Ap, useRecoilMutableSource: hP };
function _P(e, n) {
  if (e === n) return !0;
  if (e.length !== n.length) return !1;
  for (let o = 0, i = e.length; o < i; o++) if (e[o] !== n[o]) return !1;
  return !0;
}
var EP = _P;
const { useEffect: bP, useRef: RP } = ke;
function xP(e) {
  const n = RP();
  return (
    bP(() => {
      n.current = e;
    }),
    n.current
  );
}
var TP = xP;
const { useStoreRef: kP } = $p,
  { SUSPENSE_TIMEOUT_MS: PP } = Vi,
  { updateRetainCount: ks } = Vi,
  { RetentionZone: NP } = Tp,
  { useEffect: LP, useRef: MP } = ke,
  { isSSR: My } = Mp;
function AP(e) {
  if (Qe('recoil_memory_managament_2020')) return $P(e);
}
function $P(e) {
  const o = (Array.isArray(e) ? e : [e]).map(c =>
      c instanceof NP ? c : c.key
    ),
    i = kP();
  LP(() => {
    if (!Qe('recoil_memory_managament_2020')) return;
    const c = i.current;
    if (a.current && !My) (window.clearTimeout(a.current), (a.current = null));
    else for (const f of o) ks(c, f, 1);
    return () => {
      for (const f of o) ks(c, f, -1);
    };
  }, [i, ...o]);
  const a = MP(),
    l = TP(o);
  if (!My && (l === void 0 || !EP(l, o))) {
    const c = i.current;
    for (const f of o) ks(c, f, 1);
    if (l) for (const f of l) ks(c, f, -1);
    (a.current && window.clearTimeout(a.current),
      (a.current = window.setTimeout(() => {
        a.current = null;
        for (const f of o) ks(c, f, -1);
      }, PP)));
  }
}
var OP = AP;
function IP() {
  return '<component name not available>';
}
var $u = IP;
const {
    currentRendererSupportsUseSyncExternalStore: DP,
    reactMode: ra,
    useMutableSource: FP,
    useSyncExternalStore: zP
  } = _p,
  { useRecoilMutableSource: jP, useStoreRef: Bi } = $p,
  { isRecoilValue: SA } = Ro,
  {
    getRecoilValueAsLoadable: Ou,
    setRecoilValue: VP,
    subscribeToRecoilValue: Iu
  } = dr,
  {
    useCallback: Tn,
    useEffect: ql,
    useMemo: BP,
    useRef: $w,
    useState: Ow
  } = ke,
  { isSSR: UP } = Mp;
function WP(e, n, o) {
  if (e.state === 'hasValue') return e.contents;
  throw e.state === 'loading'
    ? new Promise(a => {
        const l = o.current.getState().suspendedComponentResolvers;
        (l.add(a),
          UP &&
            Je(e.contents) &&
            e.contents.finally(() => {
              l.delete(a);
            }));
      })
    : e.state === 'hasError'
      ? e.contents
      : Oe(`Invalid value of loadable atom "${n.key}"`);
}
function HP(e) {
  const n = Bi(),
    o = $u(),
    i = Tn(() => {
      var f;
      const p = n.current,
        m = p.getState(),
        v =
          ra().early && (f = m.nextTree) !== null && f !== void 0
            ? f
            : m.currentTree;
      return { loadable: Ou(p, e, v), key: e.key };
    }, [n, e]),
    a = Tn(f => {
      let p;
      return () => {
        var m, v;
        const y = f();
        return (m = p) !== null &&
          m !== void 0 &&
          m.loadable.is(y.loadable) &&
          ((v = p) === null || v === void 0 ? void 0 : v.key) === y.key
          ? p
          : ((p = y), y);
      };
    }, []),
    l = BP(() => a(i), [i, a]),
    c = Tn(
      f => {
        const p = n.current;
        return Iu(p, e, f, o).release;
      },
      [n, e, o]
    );
  return zP(c, l, l).loadable;
}
function KP(e) {
  const n = Bi(),
    o = Tn(() => {
      var m;
      const v = n.current,
        y = v.getState(),
        C =
          ra().early && (m = y.nextTree) !== null && m !== void 0
            ? m
            : y.currentTree;
      return Ou(v, e, C);
    }, [n, e]),
    i = Tn(() => o(), [o]),
    a = $u(),
    l = Tn(
      (m, v) => {
        const y = n.current;
        return Iu(
          y,
          e,
          () => {
            if (!Qe('recoil_suppress_rerender_in_callback')) return v();
            const S = o();
            (p.current.is(S) || v(), (p.current = S));
          },
          a
        ).release;
      },
      [n, e, a, o]
    ),
    c = jP();
  if (c == null)
    throw Oe(
      'Recoil hooks must be used in components contained within a <RecoilRoot> component.'
    );
  const f = FP(c, i, l),
    p = $w(f);
  return (
    ql(() => {
      p.current = f;
    }),
    f
  );
}
function Ay(e) {
  const n = Bi(),
    o = $u(),
    i = Tn(() => {
      var p;
      const m = n.current,
        v = m.getState(),
        y =
          ra().early && (p = v.nextTree) !== null && p !== void 0
            ? p
            : v.currentTree;
      return Ou(m, e, y);
    }, [n, e]),
    a = Tn(() => ({ loadable: i(), key: e.key }), [i, e.key]),
    l = Tn(
      p => {
        const m = a();
        return p.loadable.is(m.loadable) && p.key === m.key ? p : m;
      },
      [a]
    );
  ql(() => {
    const p = Iu(
      n.current,
      e,
      m => {
        f(l);
      },
      o
    );
    return (f(l), p.release);
  }, [o, e, n, l]);
  const [c, f] = Ow(a);
  return c.key !== e.key ? a().loadable : c.loadable;
}
function QP(e) {
  const n = Bi(),
    [, o] = Ow([]),
    i = $u(),
    a = Tn(() => {
      var f;
      const p = n.current,
        m = p.getState(),
        v =
          ra().early && (f = m.nextTree) !== null && f !== void 0
            ? f
            : m.currentTree;
      return Ou(p, e, v);
    }, [n, e]),
    l = a(),
    c = $w(l);
  return (
    ql(() => {
      c.current = l;
    }),
    ql(() => {
      const f = n.current,
        p = f.getState(),
        m = Iu(
          f,
          e,
          y => {
            var C;
            if (!Qe('recoil_suppress_rerender_in_callback')) return o([]);
            const S = a();
            (((C = c.current) !== null && C !== void 0 && C.is(S)) || o(S),
              (c.current = S));
          },
          i
        );
      if (p.nextTree)
        f.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
          ((c.current = null), o([]));
        });
      else {
        var v;
        if (!Qe('recoil_suppress_rerender_in_callback')) return o([]);
        const y = a();
        (((v = c.current) !== null && v !== void 0 && v.is(y)) || o(y),
          (c.current = y));
      }
      return m.release;
    }, [i, a, e, n]),
    l
  );
}
function GP(e) {
  return (
    Qe('recoil_memory_managament_2020') && OP(e),
    {
      TRANSITION_SUPPORT: Ay,
      SYNC_EXTERNAL_STORE: DP() ? HP : Ay,
      MUTABLE_SOURCE: KP,
      LEGACY: QP
    }[ra().mode](e)
  );
}
function Iw(e) {
  const n = Bi(),
    o = GP(e);
  return WP(o, e, n);
}
function Dw(e) {
  const n = Bi();
  return Tn(
    o => {
      VP(n.current, e, o);
    },
    [n, e]
  );
}
function YP(e) {
  return [Iw(e), Dw(e)];
}
var XP = { useRecoilState: YP, useRecoilValue: Iw, useSetRecoilState: Dw };
const { batchUpdates: qP } = Lp,
  { DEFAULT_VALUE: ZP, getNode: JP } = Ln,
  { AbstractRecoilValue: eN, setRecoilValueLoadable: tN } = dr,
  { cloneSnapshot: CA } = Au,
  { useCallback: _A, useEffect: EA, useRef: bA, useState: RA } = ke;
function nN(e, n) {
  var o;
  const i = e.getState(),
    a = (o = i.nextTree) !== null && o !== void 0 ? o : i.currentTree,
    l = n.getStore_INTERNAL().getState().currentTree;
  qP(() => {
    const c = new Set();
    for (const m of [a.atomValues.keys(), l.atomValues.keys()])
      for (const v of m) {
        var f, p;
        ((f = a.atomValues.get(v)) === null || f === void 0
          ? void 0
          : f.contents) !==
          ((p = l.atomValues.get(v)) === null || p === void 0
            ? void 0
            : p.contents) &&
          JP(v).shouldRestoreFromSnapshots &&
          c.add(v);
      }
    (c.forEach(m => {
      tN(e, new eN(m), l.atomValues.has(m) ? tt(l.atomValues.get(m)) : ZP);
    }),
      e.replaceState(m => ({ ...m, stateID: n.getID() })));
  });
}
var rN = { gotoSnapshot: nN };
const { useMemo: xA } = ke,
  { loadableWithValue: oN } = Js,
  { initializeNode: iN } = Lo,
  { DEFAULT_VALUE: sN, getNode: aN } = Ln,
  {
    copyTreeState: lN,
    getRecoilValueAsLoadable: uN,
    invalidateDownstreams: cN,
    writeLoadableToTreeState: fN
  } = dr;
function $y(e) {
  return aN(e.key).nodeType === 'atom';
}
class dN {
  constructor(n, o) {
    (Ae(this, '_store', void 0),
      Ae(this, '_treeState', void 0),
      Ae(this, '_changes', void 0),
      Ae(this, 'get', i => {
        if (this._changes.has(i.key)) return this._changes.get(i.key);
        if (!$y(i))
          throw Oe('Reading selectors within atomicUpdate is not supported');
        const a = uN(this._store, i, this._treeState);
        if (a.state === 'hasValue') return a.contents;
        throw a.state === 'hasError'
          ? a.contents
          : Oe(
              `Expected Recoil atom ${i.key} to have a value, but it is in a loading state.`
            );
      }),
      Ae(this, 'set', (i, a) => {
        if (!$y(i))
          throw Oe('Setting selectors within atomicUpdate is not supported');
        if (typeof a == 'function') {
          const l = this.get(i);
          this._changes.set(i.key, a(l));
        } else (iN(this._store, i.key, 'set'), this._changes.set(i.key, a));
      }),
      Ae(this, 'reset', i => {
        this.set(i, sN);
      }),
      (this._store = n),
      (this._treeState = o),
      (this._changes = new Map()));
  }
  newTreeState_INTERNAL() {
    if (this._changes.size === 0) return this._treeState;
    const n = lN(this._treeState);
    for (const [o, i] of this._changes) fN(n, o, oN(i));
    return (cN(this._store, n), n);
  }
}
function pN(e) {
  return n => {
    e.replaceState(o => {
      const i = new dN(e, o);
      return (n(i), i.newTreeState_INTERNAL());
    });
  };
}
var hN = { atomicUpdater: pN },
  mN = hN.atomicUpdater,
  Fw = Object.freeze({ __proto__: null, atomicUpdater: mN });
function vN(e, n) {
  if (!e) throw new Error(n);
}
var yN = vN,
  Ms = yN;
const { atomicUpdater: gN } = Fw,
  { batchUpdates: wN } = Lp,
  { DEFAULT_VALUE: SN } = Ln,
  { refreshRecoilValue: CN, setRecoilValue: Oy } = dr,
  { cloneSnapshot: _N } = Au,
  { gotoSnapshot: EN } = rN,
  { useCallback: TA } = ke;
class zw {}
const bN = new zw();
function RN(e, n, o, i) {
  let a = bN,
    l;
  if (
    (wN(() => {
      const f =
        'useRecoilCallback() expects a function that returns a function: it accepts a function of the type (RecoilInterface) => (Args) => ReturnType and returns a callback function (Args) => ReturnType, where RecoilInterface is an object {snapshot, set, ...} and Args and ReturnType are the argument and return types of the callback you want to create.  Please see the docs at recoiljs.org for details.';
      if (typeof n != 'function') throw Oe(f);
      const p = sw(
          {
            ...(i ?? {}),
            set: (v, y) => Oy(e, v, y),
            reset: v => Oy(e, v, SN),
            refresh: v => CN(e, v),
            gotoSnapshot: v => EN(e, v),
            transact_UNSTABLE: v => gN(e)(v)
          },
          {
            snapshot: () => {
              const v = _N(e);
              return ((l = v.retain()), v);
            }
          }
        ),
        m = n(p);
      if (typeof m != 'function') throw Oe(f);
      a = m(...o);
    }),
    a instanceof zw && Ms(!1),
    Je(a))
  )
    a = a.finally(() => {
      var f;
      (f = l) === null || f === void 0 || f();
    });
  else {
    var c;
    (c = l) === null || c === void 0 || c();
  }
  return a;
}
var xN = { recoilCallback: RN };
const { useCallback: kA } = ke,
  { atomicUpdater: PA } = Fw,
  { useMemo: NA } = ke;
class TN {
  constructor(n) {
    (Ae(this, 'value', void 0), (this.value = n));
  }
}
var kN = { WrappedValue: TN },
  PN = kN.WrappedValue,
  jw = Object.freeze({ __proto__: null, WrappedValue: PN });
class Iy extends Error {}
class NN {
  constructor(n) {
    var o, i, a;
    (Ae(this, '_name', void 0),
      Ae(this, '_numLeafs', void 0),
      Ae(this, '_root', void 0),
      Ae(this, '_onHit', void 0),
      Ae(this, '_onSet', void 0),
      Ae(this, '_mapNodeValue', void 0),
      (this._name = n == null ? void 0 : n.name),
      (this._numLeafs = 0),
      (this._root = null),
      (this._onHit =
        (o = n == null ? void 0 : n.onHit) !== null && o !== void 0
          ? o
          : () => {}),
      (this._onSet =
        (i = n == null ? void 0 : n.onSet) !== null && i !== void 0
          ? i
          : () => {}),
      (this._mapNodeValue =
        (a = n == null ? void 0 : n.mapNodeValue) !== null && a !== void 0
          ? a
          : l => l));
  }
  size() {
    return this._numLeafs;
  }
  root() {
    return this._root;
  }
  get(n, o) {
    var i;
    return (i = this.getLeafNode(n, o)) === null || i === void 0
      ? void 0
      : i.value;
  }
  getLeafNode(n, o) {
    if (this._root == null) return;
    let i = this._root;
    for (; i; ) {
      if ((o == null || o.onNodeVisit(i), i.type === 'leaf'))
        return (this._onHit(i), i);
      const a = this._mapNodeValue(n(i.nodeKey));
      i = i.branches.get(a);
    }
  }
  set(n, o, i) {
    const a = () => {
      var l, c, f, p;
      let m, v;
      for (const [b, N] of n) {
        var y, C, S;
        const R = this._root;
        if ((R == null ? void 0 : R.type) === 'leaf')
          throw this.invalidCacheError();
        const T = m;
        if (
          ((m = T ? T.branches.get(v) : R),
          (m =
            (y = m) !== null && y !== void 0
              ? y
              : {
                  type: 'branch',
                  nodeKey: b,
                  parent: T,
                  branches: new Map(),
                  branchKey: v
                }),
          m.type !== 'branch' || m.nodeKey !== b)
        )
          throw this.invalidCacheError();
        (T == null || T.branches.set(v, m),
          i == null ||
            (C = i.onNodeVisit) === null ||
            C === void 0 ||
            C.call(i, m),
          (v = this._mapNodeValue(N)),
          (this._root = (S = this._root) !== null && S !== void 0 ? S : m));
      }
      const E = m
        ? (l = m) === null || l === void 0
          ? void 0
          : l.branches.get(v)
        : this._root;
      if (E != null && (E.type !== 'leaf' || E.branchKey !== v))
        throw this.invalidCacheError();
      const _ = { type: 'leaf', value: o, parent: m, branchKey: v };
      ((c = m) === null || c === void 0 || c.branches.set(v, _),
        (this._root = (f = this._root) !== null && f !== void 0 ? f : _),
        this._numLeafs++,
        this._onSet(_),
        i == null ||
          (p = i.onNodeVisit) === null ||
          p === void 0 ||
          p.call(i, _));
    };
    try {
      a();
    } catch (l) {
      if (l instanceof Iy) (this.clear(), a());
      else throw l;
    }
  }
  delete(n) {
    const o = this.root();
    if (!o) return !1;
    if (n === o) return ((this._root = null), (this._numLeafs = 0), !0);
    let i = n.parent,
      a = n.branchKey;
    for (; i; ) {
      var l;
      if ((i.branches.delete(a), i === o))
        return (
          i.branches.size === 0
            ? ((this._root = null), (this._numLeafs = 0))
            : this._numLeafs--,
          !0
        );
      if (i.branches.size > 0) break;
      ((a = (l = i) === null || l === void 0 ? void 0 : l.branchKey),
        (i = i.parent));
    }
    for (; i !== o; i = i.parent) if (i == null) return !1;
    return (this._numLeafs--, !0);
  }
  clear() {
    ((this._numLeafs = 0), (this._root = null));
  }
  invalidCacheError() {
    throw (
      Kt(
        'Invalid cache values.  This happens when selectors do not return consistent values for the same input dependency values.  That may also be caused when using Fast Refresh to change a selector implementation.  Resetting cache.' +
          (this._name != null ? ` - ${this._name}` : '')
      ),
      new Iy()
    );
  }
}
var LN = { TreeCache: NN },
  MN = LN.TreeCache,
  Vw = Object.freeze({ __proto__: null, TreeCache: MN });
class AN {
  constructor(n) {
    var o;
    (Ae(this, '_maxSize', void 0),
      Ae(this, '_size', void 0),
      Ae(this, '_head', void 0),
      Ae(this, '_tail', void 0),
      Ae(this, '_map', void 0),
      Ae(this, '_keyMapper', void 0),
      (this._maxSize = n.maxSize),
      (this._size = 0),
      (this._head = null),
      (this._tail = null),
      (this._map = new Map()),
      (this._keyMapper = (o = n.mapKey) !== null && o !== void 0 ? o : i => i));
  }
  head() {
    return this._head;
  }
  tail() {
    return this._tail;
  }
  size() {
    return this._size;
  }
  maxSize() {
    return this._maxSize;
  }
  has(n) {
    return this._map.has(this._keyMapper(n));
  }
  get(n) {
    const o = this._keyMapper(n),
      i = this._map.get(o);
    if (i) return (this.set(n, i.value), i.value);
  }
  set(n, o) {
    const i = this._keyMapper(n);
    this._map.get(i) && this.delete(n);
    const l = this.head(),
      c = { key: n, right: l, left: null, value: o };
    (l ? (l.left = c) : (this._tail = c),
      this._map.set(i, c),
      (this._head = c),
      this._size++,
      this._maybeDeleteLRU());
  }
  _maybeDeleteLRU() {
    this.size() > this.maxSize() && this.deleteLru();
  }
  deleteLru() {
    const n = this.tail();
    n && this.delete(n.key);
  }
  delete(n) {
    const o = this._keyMapper(n);
    if (!this._size || !this._map.has(o)) return;
    const i = tt(this._map.get(o)),
      a = i.right,
      l = i.left;
    (a && (a.left = i.left),
      l && (l.right = i.right),
      i === this.head() && (this._head = a),
      i === this.tail() && (this._tail = l),
      this._map.delete(o),
      this._size--);
  }
  clear() {
    ((this._size = 0),
      (this._head = null),
      (this._tail = null),
      (this._map = new Map()));
  }
}
var $N = { LRUCache: AN },
  ON = $N.LRUCache,
  Bw = Object.freeze({ __proto__: null, LRUCache: ON });
const { LRUCache: IN } = Bw,
  { TreeCache: DN } = Vw;
function FN({ name: e, maxSize: n, mapNodeValue: o = i => i }) {
  const i = new IN({ maxSize: n }),
    a = new DN({
      name: e,
      mapNodeValue: o,
      onHit: l => {
        i.set(l, !0);
      },
      onSet: l => {
        const c = i.tail();
        (i.set(l, !0), c && a.size() > n && a.delete(c.key));
      }
    });
  return a;
}
var Dy = FN;
function _n(e, n, o) {
  if (typeof e == 'string' && !e.includes('"') && !e.includes('\\'))
    return `"${e}"`;
  switch (typeof e) {
    case 'undefined':
      return '';
    case 'boolean':
      return e ? 'true' : 'false';
    case 'number':
    case 'symbol':
      return String(e);
    case 'string':
      return JSON.stringify(e);
    case 'function':
      if ((n == null ? void 0 : n.allowFunctions) !== !0)
        throw Oe('Attempt to serialize function in a Recoil cache key');
      return `__FUNCTION(${e.name})__`;
  }
  if (e === null) return 'null';
  if (typeof e != 'object') {
    var i;
    return (i = JSON.stringify(e)) !== null && i !== void 0 ? i : '';
  }
  if (Je(e)) return '__PROMISE__';
  if (Array.isArray(e)) return `[${e.map((a, l) => _n(a, n, l.toString()))}]`;
  if (typeof e.toJSON == 'function') return _n(e.toJSON(o), n, o);
  if (e instanceof Map) {
    const a = {};
    for (const [l, c] of e) a[typeof l == 'string' ? l : _n(l, n)] = c;
    return _n(a, n, o);
  }
  return e instanceof Set
    ? _n(
        Array.from(e).sort((a, l) => _n(a, n).localeCompare(_n(l, n))),
        n,
        o
      )
    : Symbol !== void 0 &&
        e[Symbol.iterator] != null &&
        typeof e[Symbol.iterator] == 'function'
      ? _n(Array.from(e), n, o)
      : `{${Object.keys(e)
          .filter(a => e[a] !== void 0)
          .sort()
          .map(a => `${_n(a, n)}:${_n(e[a], n, a)}`)
          .join(',')}}`;
}
function zN(e, n = { allowFunctions: !1 }) {
  return _n(e, n);
}
var Op = zN;
const { TreeCache: jN } = Vw,
  Tl = { equality: 'reference', eviction: 'keep-all', maxSize: 1 / 0 };
function VN(
  {
    equality: e = Tl.equality,
    eviction: n = Tl.eviction,
    maxSize: o = Tl.maxSize
  } = Tl,
  i
) {
  const a = BN(e);
  return UN(n, o, a, i);
}
function BN(e) {
  switch (e) {
    case 'reference':
      return n => n;
    case 'value':
      return n => Op(n);
  }
  throw Oe(`Unrecognized equality policy ${e}`);
}
function UN(e, n, o, i) {
  switch (e) {
    case 'keep-all':
      return new jN({ name: i, mapNodeValue: o });
    case 'lru':
      return Dy({ name: i, maxSize: tt(n), mapNodeValue: o });
    case 'most-recent':
      return Dy({ name: i, maxSize: 1, mapNodeValue: o });
  }
  throw Oe(`Unrecognized eviction policy ${e}`);
}
var WN = VN;
const {
    isLoadable: HN,
    loadableWithError: kl,
    loadableWithPromise: KN,
    loadableWithValue: ed
  } = Js,
  { WrappedValue: Uw } = jw,
  { getNodeLoadable: Pl, peekNodeLoadable: QN, setNodeValue: GN } = Lo,
  { saveDepsToStore: YN } = ta,
  {
    DEFAULT_VALUE: XN,
    getConfigDeletionHandler: qN,
    getNode: ZN,
    registerNode: Fy
  } = Ln,
  { isRecoilValue: JN } = Ro,
  { markRecoilValueModified: zy } = dr,
  { retainedByOptionWithDefault: eL } = Vi,
  { recoilCallback: tL } = xN;
class Ww {}
const Ps = new Ww(),
  Ns = [],
  Nl = new Map(),
  nL = (() => {
    let e = 0;
    return () => e++;
  })();
function Hw(e) {
  let n = null;
  const { key: o, get: i, cachePolicy_UNSTABLE: a } = e,
    l = e.set != null ? e.set : void 0,
    c = new Set(),
    f = WN(a ?? { equality: 'reference', eviction: 'keep-all' }, o),
    p = eL(e.retainedBy_UNSTABLE),
    m = new Map();
  let v = 0;
  function y() {
    return !Qe('recoil_memory_managament_2020') || v > 0;
  }
  function C(x) {
    return (
      x.getState().knownSelectors.add(o),
      v++,
      () => {
        v--;
      }
    );
  }
  function S() {
    return qN(o) !== void 0 && !y();
  }
  function E(x, B, Q, te, J) {
    (fe(B, te, J), _(x, Q));
  }
  function _(x, B) {
    (Z(x, B) && le(x), N(B, !0));
  }
  function b(x, B) {
    Z(x, B) && (tt(q(x)).stateVersions.clear(), N(B, !1));
  }
  function N(x, B) {
    const Q = Nl.get(x);
    if (Q != null) {
      for (const te of Q) zy(te, tt(n));
      B && Nl.delete(x);
    }
  }
  function R(x, B) {
    let Q = Nl.get(B);
    (Q == null && Nl.set(B, (Q = new Set())), Q.add(x));
  }
  function T(x, B, Q, te, J, de) {
    return B.then(ae => {
      if (!y()) throw (le(x), Ps);
      const _e = ed(ae);
      return (E(x, Q, J, _e, te), ae);
    }).catch(ae => {
      if (!y()) throw (le(x), Ps);
      if (Je(ae)) return k(x, ae, Q, te, J, de);
      const _e = kl(ae);
      throw (E(x, Q, J, _e, te), ae);
    });
  }
  function k(x, B, Q, te, J, de) {
    return B.then(ae => {
      if (!y()) throw (le(x), Ps);
      de.loadingDepKey != null && de.loadingDepPromise === B
        ? Q.atomValues.set(de.loadingDepKey, ed(ae))
        : x.getState().knownSelectors.forEach(Ie => {
            Q.atomValues.delete(Ie);
          });
      const _e = H(x, Q);
      if (_e && _e.state !== 'loading') {
        if (((Z(x, J) || q(x) == null) && _(x, J), _e.state === 'hasValue'))
          return _e.contents;
        throw _e.contents;
      }
      if (!Z(x, J)) {
        const Ie = G(x, Q);
        if (Ie != null) return Ie.loadingLoadable.contents;
      }
      const [Me, Ue] = W(x, Q, J);
      if (
        (Me.state !== 'loading' && E(x, Q, J, Me, Ue), Me.state === 'hasError')
      )
        throw Me.contents;
      return Me.contents;
    }).catch(ae => {
      if (ae instanceof Ww) throw Ps;
      if (!y()) throw (le(x), Ps);
      const _e = kl(ae);
      throw (E(x, Q, J, _e, te), ae);
    });
  }
  function $(x, B, Q, te) {
    var J, de, ae, _e;
    if (
      Z(x, te) ||
      B.version ===
        ((J = x.getState()) === null ||
        J === void 0 ||
        (de = J.currentTree) === null ||
        de === void 0
          ? void 0
          : de.version) ||
      B.version ===
        ((ae = x.getState()) === null ||
        ae === void 0 ||
        (_e = ae.nextTree) === null ||
        _e === void 0
          ? void 0
          : _e.version)
    ) {
      var Me, Ue, Ie;
      YN(
        o,
        Q,
        x,
        (Me =
          (Ue = x.getState()) === null ||
          Ue === void 0 ||
          (Ie = Ue.nextTree) === null ||
          Ie === void 0
            ? void 0
            : Ie.version) !== null && Me !== void 0
          ? Me
          : x.getState().currentTree.version
      );
    }
    for (const We of Q) c.add(We);
  }
  function W(x, B, Q) {
    let te = !0,
      J = !0;
    const de = () => {
      J = !1;
    };
    let ae,
      _e = !1,
      Me;
    const Ue = { loadingDepKey: null, loadingDepPromise: null },
      Ie = new Map();
    function We({ key: vt }) {
      const dt = Pl(x, B, vt);
      switch (
        (Ie.set(vt, dt),
        te || ($(x, B, new Set(Ie.keys()), Q), b(x, Q)),
        dt.state)
      ) {
        case 'hasValue':
          return dt.contents;
        case 'hasError':
          throw dt.contents;
        case 'loading':
          throw (
            (Ue.loadingDepKey = vt),
            (Ue.loadingDepPromise = dt.contents),
            dt.contents
          );
      }
      throw Oe('Invalid Loadable state');
    }
    const mt =
      vt =>
      (...dt) => {
        if (J)
          throw Oe(
            'Callbacks from getCallback() should only be called asynchronously after the selector is evalutated.  It can be used for selectors to return objects with callbacks that can work with Recoil state without a subscription.'
          );
        return (n == null && Ms(!1), tL(x, vt, dt, { node: n }));
      };
    try {
      ((ae = i({ get: We, getCallback: mt })),
        (ae = JN(ae) ? We(ae) : ae),
        HN(ae) && (ae.state === 'hasError' && (_e = !0), (ae = ae.contents)),
        Je(ae) ? (ae = T(x, ae, B, Ie, Q, Ue).finally(de)) : de(),
        (ae = ae instanceof Uw ? ae.value : ae));
    } catch (vt) {
      ((ae = vt),
        Je(ae) ? (ae = k(x, ae, B, Ie, Q, Ue).finally(de)) : ((_e = !0), de()));
    }
    return (
      _e ? (Me = kl(ae)) : Je(ae) ? (Me = KN(ae)) : (Me = ed(ae)),
      (te = !1),
      ye(x, Q, Ie),
      $(x, B, new Set(Ie.keys()), Q),
      [Me, Ie]
    );
  }
  function H(x, B) {
    let Q = B.atomValues.get(o);
    if (Q != null) return Q;
    const te = new Set();
    try {
      Q = f.get(
        de => (typeof de != 'string' && Ms(!1), Pl(x, B, de).contents),
        {
          onNodeVisit: de => {
            de.type === 'branch' && de.nodeKey !== o && te.add(de.nodeKey);
          }
        }
      );
    } catch (de) {
      throw Oe(`Problem with cache lookup for selector "${o}": ${de.message}`);
    }
    if (Q) {
      var J;
      (B.atomValues.set(o, Q),
        $(
          x,
          B,
          te,
          (J = q(x)) === null || J === void 0 ? void 0 : J.executionID
        ));
    }
    return Q;
  }
  function F(x, B) {
    const Q = H(x, B);
    if (Q != null) return (le(x), Q);
    const te = G(x, B);
    if (te != null) {
      var J;
      return (
        ((J = te.loadingLoadable) === null || J === void 0
          ? void 0
          : J.state) === 'loading' && R(x, te.executionID),
        te.loadingLoadable
      );
    }
    const de = nL(),
      [ae, _e] = W(x, B, de);
    return (
      ae.state === 'loading'
        ? (ce(x, de, ae, _e, B), R(x, de))
        : (le(x), fe(B, ae, _e)),
      ae
    );
  }
  function G(x, B) {
    const Q = _w([
      m.has(x) ? [tt(m.get(x))] : [],
      ku(
        kp(m, ([J]) => J !== x),
        ([, J]) => J
      )
    ]);
    function te(J) {
      for (const [de, ae] of J) if (!Pl(x, B, de).is(ae)) return !0;
      return !1;
    }
    for (const J of Q) {
      if (
        J.stateVersions.get(B.version) ||
        !te(J.depValuesDiscoveredSoFarDuringAsyncWork)
      )
        return (J.stateVersions.set(B.version, !0), J);
      J.stateVersions.set(B.version, !1);
    }
  }
  function q(x) {
    return m.get(x);
  }
  function ce(x, B, Q, te, J) {
    m.set(x, {
      depValuesDiscoveredSoFarDuringAsyncWork: te,
      executionID: B,
      loadingLoadable: Q,
      stateVersions: new Map([[J.version, !0]])
    });
  }
  function ye(x, B, Q) {
    if (Z(x, B)) {
      const te = q(x);
      te != null && (te.depValuesDiscoveredSoFarDuringAsyncWork = Q);
    }
  }
  function le(x) {
    m.delete(x);
  }
  function Z(x, B) {
    var Q;
    return B === ((Q = q(x)) === null || Q === void 0 ? void 0 : Q.executionID);
  }
  function me(x) {
    return Array.from(x.entries()).map(([B, Q]) => [B, Q.contents]);
  }
  function fe(x, B, Q) {
    x.atomValues.set(o, B);
    try {
      f.set(me(Q), B);
    } catch (te) {
      throw Oe(`Problem with setting cache for selector "${o}": ${te.message}`);
    }
  }
  function ee(x) {
    if (Ns.includes(o)) {
      const B = `Recoil selector has circular dependencies: ${Ns.slice(Ns.indexOf(o)).join(' → ')}`;
      return kl(Oe(B));
    }
    Ns.push(o);
    try {
      return x();
    } finally {
      Ns.pop();
    }
  }
  function O(x, B) {
    const Q = B.atomValues.get(o);
    return (
      Q ??
      f.get(te => {
        var J;
        return (
          typeof te != 'string' && Ms(!1),
          (J = QN(x, B, te)) === null || J === void 0 ? void 0 : J.contents
        );
      })
    );
  }
  function X(x, B) {
    return ee(() => F(x, B));
  }
  function U(x) {
    x.atomValues.delete(o);
  }
  function L(x, B) {
    n == null && Ms(!1);
    for (const te of c) {
      var Q;
      const J = ZN(te);
      (Q = J.clearCache) === null || Q === void 0 || Q.call(J, x, B);
    }
    (c.clear(), U(B), f.clear(), zy(x, n));
  }
  return l != null
    ? (n = Fy({
        key: o,
        nodeType: 'selector',
        peek: O,
        get: X,
        set: (B, Q, te) => {
          let J = !1;
          const de = new Map();
          function ae({ key: Ie }) {
            if (J)
              throw Oe(
                'Recoil: Async selector sets are not currently supported.'
              );
            const We = Pl(B, Q, Ie);
            if (We.state === 'hasValue') return We.contents;
            if (We.state === 'loading') {
              const mt = `Getting value of asynchronous atom or selector "${Ie}" in a pending state while setting selector "${o}" is not yet supported.`;
              throw (Kt(), Oe(mt));
            } else throw We.contents;
          }
          function _e(Ie, We) {
            if (J) {
              const dt =
                'Recoil: Async selector sets are not currently supported.';
              throw (Kt(), Oe(dt));
            }
            const mt = typeof We == 'function' ? We(ae(Ie)) : We;
            GN(B, Q, Ie.key, mt).forEach((dt, Mn) => de.set(Mn, dt));
          }
          function Me(Ie) {
            _e(Ie, XN);
          }
          const Ue = l({ set: _e, get: ae, reset: Me }, te);
          if (Ue !== void 0)
            throw Je(Ue)
              ? Oe('Recoil: Async selector sets are not currently supported.')
              : Oe('Recoil: selector set should be a void function.');
          return ((J = !0), de);
        },
        init: C,
        invalidate: U,
        clearCache: L,
        shouldDeleteConfigOnRelease: S,
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
        shouldRestoreFromSnapshots: !1,
        retainedBy: p
      }))
    : (n = Fy({
        key: o,
        nodeType: 'selector',
        peek: O,
        get: X,
        init: C,
        invalidate: U,
        clearCache: L,
        shouldDeleteConfigOnRelease: S,
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
        shouldRestoreFromSnapshots: !1,
        retainedBy: p
      }));
}
Hw.value = e => new Uw(e);
var js = Hw;
const {
    isLoadable: rL,
    loadableWithError: td,
    loadableWithPromise: nd,
    loadableWithValue: ci
  } = Js,
  { WrappedValue: Kw } = jw,
  { peekNodeInfo: oL } = Lo,
  {
    DEFAULT_VALUE: po,
    DefaultValue: $r,
    getConfigDeletionHandler: Qw,
    registerNode: iL,
    setConfigDeletionHandler: sL
  } = Ln,
  { isRecoilValue: aL } = Ro,
  {
    getRecoilValueAsLoadable: lL,
    markRecoilValueModified: uL,
    setRecoilValue: jy,
    setRecoilValueLoadable: cL
  } = dr,
  { retainedByOptionWithDefault: fL } = Vi,
  Ls = e => (e instanceof Kw ? e.value : e);
function dL(e) {
  const { key: n, persistence_UNSTABLE: o } = e,
    i = fL(e.retainedBy_UNSTABLE);
  let a = 0;
  function l(R) {
    return nd(
      R.then(T => ((c = ci(T)), T)).catch(T => {
        throw ((c = td(T)), T);
      })
    );
  }
  let c = Je(e.default)
    ? l(e.default)
    : rL(e.default)
      ? e.default.state === 'loading'
        ? l(e.default.contents)
        : e.default
      : ci(Ls(e.default));
  c.contents;
  let f;
  const p = new Map();
  function m(R) {
    return R;
  }
  function v(R, T) {
    const k = T.then($ => {
      var W, H;
      return (
        ((H = (
          (W = R.getState().nextTree) !== null && W !== void 0
            ? W
            : R.getState().currentTree
        ).atomValues.get(n)) === null || H === void 0
          ? void 0
          : H.contents) === k && jy(R, N, $),
        $
      );
    }).catch($ => {
      var W, H;
      throw (
        ((H = (
          (W = R.getState().nextTree) !== null && W !== void 0
            ? W
            : R.getState().currentTree
        ).atomValues.get(n)) === null || H === void 0
          ? void 0
          : H.contents) === k && cL(R, N, td($)),
        $
      );
    });
    return k;
  }
  function y(R, T, k) {
    var $;
    a++;
    const W = () => {
      var q;
      (a--,
        (q = p.get(R)) === null || q === void 0 || q.forEach(ce => ce()),
        p.delete(R));
    };
    if ((R.getState().knownAtoms.add(n), c.state === 'loading')) {
      const q = () => {
        var ce;
        ((ce = R.getState().nextTree) !== null && ce !== void 0
          ? ce
          : R.getState().currentTree
        ).atomValues.has(n) || uL(R, N);
      };
      c.contents.finally(q);
    }
    const H = ($ = e.effects) !== null && $ !== void 0 ? $ : e.effects_UNSTABLE;
    if (H != null) {
      let q = function (U) {
          if (Z && U.key === n) {
            const L = le;
            return L instanceof $r
              ? C(R, T)
              : Je(L)
                ? nd(L.then(x => (x instanceof $r ? c.toPromise() : x)))
                : ci(L);
          }
          return lL(R, U);
        },
        ce = function (U) {
          return q(U).toPromise();
        },
        ye = function (U) {
          var L;
          const x = oL(
            R,
            (L = R.getState().nextTree) !== null && L !== void 0
              ? L
              : R.getState().currentTree,
            U.key
          );
          return Z && U.key === n && !(le instanceof $r)
            ? { ...x, isSet: !0, loadable: q(U) }
            : x;
        },
        le = po,
        Z = !0,
        me = !1,
        fe = null;
      const ee = U => L => {
          if (Z) {
            const x = q(N),
              B = x.state === 'hasValue' ? x.contents : po;
            ((le = typeof L == 'function' ? L(B) : L),
              Je(le) &&
                (le = le.then(Q => ((fe = { effect: U, value: Q }), Q))));
          } else {
            if (Je(L))
              throw Oe('Setting atoms to async values is not implemented.');
            (typeof L != 'function' && (fe = { effect: U, value: Ls(L) }),
              jy(
                R,
                N,
                typeof L == 'function'
                  ? x => {
                      const B = Ls(L(x));
                      return ((fe = { effect: U, value: B }), B);
                    }
                  : Ls(L)
              ));
          }
        },
        O = U => () => ee(U)(po),
        X = U => L => {
          var x;
          const { release: B } = R.subscribeToTransactions(Q => {
            var te;
            let { currentTree: J, previousTree: de } = Q.getState();
            de || (Kt(), (de = J));
            const ae =
              (te = J.atomValues.get(n)) !== null && te !== void 0 ? te : c;
            if (ae.state === 'hasValue') {
              var _e, Me, Ue, Ie;
              const We = ae.contents,
                mt =
                  (_e = de.atomValues.get(n)) !== null && _e !== void 0
                    ? _e
                    : c,
                vt = mt.state === 'hasValue' ? mt.contents : po;
              ((Me = fe) === null || Me === void 0 ? void 0 : Me.effect) !==
                U ||
              ((Ue = fe) === null || Ue === void 0 ? void 0 : Ue.value) !== We
                ? L(We, vt, !J.atomValues.has(n))
                : ((Ie = fe) === null || Ie === void 0 ? void 0 : Ie.effect) ===
                    U && (fe = null);
            }
          }, n);
          p.set(R, [...((x = p.get(R)) !== null && x !== void 0 ? x : []), B]);
        };
      for (const U of H)
        try {
          const L = U({
            node: N,
            storeID: R.storeID,
            parentStoreID_UNSTABLE: R.parentStoreID,
            trigger: k,
            setSelf: ee(U),
            resetSelf: O(U),
            onSet: X(U),
            getPromise: ce,
            getLoadable: q,
            getInfo_UNSTABLE: ye
          });
          if (L != null) {
            var F;
            p.set(R, [
              ...((F = p.get(R)) !== null && F !== void 0 ? F : []),
              L
            ]);
          }
        } catch (L) {
          ((le = L), (me = !0));
        }
      if (((Z = !1), !(le instanceof $r))) {
        var G;
        const U = me ? td(le) : Je(le) ? nd(v(R, le)) : ci(Ls(le));
        (U.contents,
          T.atomValues.set(n, U),
          (G = R.getState().nextTree) === null ||
            G === void 0 ||
            G.atomValues.set(n, U));
      }
    }
    return W;
  }
  function C(R, T) {
    var k, $;
    return (k = ($ = T.atomValues.get(n)) !== null && $ !== void 0 ? $ : f) !==
      null && k !== void 0
      ? k
      : c;
  }
  function S(R, T) {
    if (T.atomValues.has(n)) return tt(T.atomValues.get(n));
    if (T.nonvalidatedAtoms.has(n)) {
      if (f != null) return f;
      if (o == null) return (tw(), c);
      const k = T.nonvalidatedAtoms.get(n),
        $ = o.validator(k, po);
      return ((f = $ instanceof $r ? c : ci($)), f);
    } else return c;
  }
  function E() {
    f = void 0;
  }
  function _(R, T, k) {
    if (T.atomValues.has(n)) {
      const $ = tt(T.atomValues.get(n));
      if ($.state === 'hasValue' && k === $.contents) return new Map();
    } else if (!T.nonvalidatedAtoms.has(n) && k instanceof $r) return new Map();
    return ((f = void 0), new Map().set(n, ci(k)));
  }
  function b() {
    return Qw(n) !== void 0 && a <= 0;
  }
  const N = iL({
    key: n,
    nodeType: 'atom',
    peek: C,
    get: S,
    set: _,
    init: y,
    invalidate: E,
    shouldDeleteConfigOnRelease: b,
    dangerouslyAllowMutability: e.dangerouslyAllowMutability,
    persistence_UNSTABLE: e.persistence_UNSTABLE
      ? {
          type: e.persistence_UNSTABLE.type,
          backButton: e.persistence_UNSTABLE.backButton
        }
      : void 0,
    shouldRestoreFromSnapshots: !0,
    retainedBy: i
  });
  return N;
}
function Ip(e) {
  const { ...n } = e,
    o = 'default' in e ? e.default : new Promise(() => {});
  return aL(o) ? pL({ ...n, default: o }) : dL({ ...n, default: o });
}
function pL(e) {
  const n = Ip({
      ...e,
      default: po,
      persistence_UNSTABLE:
        e.persistence_UNSTABLE === void 0
          ? void 0
          : {
              ...e.persistence_UNSTABLE,
              validator: i =>
                i instanceof $r
                  ? i
                  : tt(e.persistence_UNSTABLE).validator(i, po)
            },
      effects: e.effects,
      effects_UNSTABLE: e.effects_UNSTABLE
    }),
    o = js({
      key: `${e.key}__withFallback`,
      get: ({ get: i }) => {
        const a = i(n);
        return a instanceof $r ? e.default : a;
      },
      set: ({ set: i }, a) => i(n, a),
      cachePolicy_UNSTABLE: { eviction: 'most-recent' },
      dangerouslyAllowMutability: e.dangerouslyAllowMutability
    });
  return (sL(o.key, Qw(e.key)), o);
}
Ip.value = e => new Kw(e);
var hL = Ip;
class mL {
  constructor(n) {
    var o;
    (Ae(this, '_map', void 0),
      Ae(this, '_keyMapper', void 0),
      (this._map = new Map()),
      (this._keyMapper =
        (o = n == null ? void 0 : n.mapKey) !== null && o !== void 0
          ? o
          : i => i));
  }
  size() {
    return this._map.size;
  }
  has(n) {
    return this._map.has(this._keyMapper(n));
  }
  get(n) {
    return this._map.get(this._keyMapper(n));
  }
  set(n, o) {
    this._map.set(this._keyMapper(n), o);
  }
  delete(n) {
    this._map.delete(this._keyMapper(n));
  }
  clear() {
    this._map.clear();
  }
}
var vL = { MapCache: mL },
  yL = vL.MapCache,
  gL = Object.freeze({ __proto__: null, MapCache: yL });
const { LRUCache: Vy } = Bw,
  { MapCache: wL } = gL,
  Ll = { equality: 'reference', eviction: 'none', maxSize: 1 / 0 };
function SL({
  equality: e = Ll.equality,
  eviction: n = Ll.eviction,
  maxSize: o = Ll.maxSize
} = Ll) {
  const i = CL(e);
  return _L(n, o, i);
}
function CL(e) {
  switch (e) {
    case 'reference':
      return n => n;
    case 'value':
      return n => Op(n);
  }
  throw Oe(`Unrecognized equality policy ${e}`);
}
function _L(e, n, o) {
  switch (e) {
    case 'keep-all':
      return new wL({ mapKey: o });
    case 'lru':
      return new Vy({ mapKey: o, maxSize: tt(n) });
    case 'most-recent':
      return new Vy({ mapKey: o, maxSize: 1 });
  }
  throw Oe(`Unrecognized eviction policy ${e}`);
}
var EL = SL;
const { setConfigDeletionHandler: bL } = Ln;
let RL = 0;
function xL(e) {
  var n, o;
  const i = EL({
    equality:
      (n =
        (o = e.cachePolicyForParams_UNSTABLE) === null || o === void 0
          ? void 0
          : o.equality) !== null && n !== void 0
        ? n
        : 'value',
    eviction: 'keep-all'
  });
  return a => {
    var l;
    let c;
    try {
      c = i.get(a);
    } catch (C) {
      throw Oe(`Problem with cache lookup for selector ${e.key}: ${C.message}`);
    }
    if (c != null) return c;
    const f = `${e.key}__selectorFamily/${(l = Op(a, { allowFunctions: !0 })) !== null && l !== void 0 ? l : 'void'}/${RL++}`,
      p = C => e.get(a)(C),
      m = e.cachePolicy_UNSTABLE,
      v =
        typeof e.retainedBy_UNSTABLE == 'function'
          ? e.retainedBy_UNSTABLE(a)
          : e.retainedBy_UNSTABLE;
    let y;
    if (e.set != null) {
      const C = e.set;
      y = js({
        key: f,
        get: p,
        set: (E, _) => C(a)(E, _),
        cachePolicy_UNSTABLE: m,
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
        retainedBy_UNSTABLE: v
      });
    } else
      y = js({
        key: f,
        get: p,
        cachePolicy_UNSTABLE: m,
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
        retainedBy_UNSTABLE: v
      });
    return (
      i.set(a, y),
      bL(y.key, () => {
        i.delete(a);
      }),
      y
    );
  };
}
var Mo = xL;
Mo({
  key: '__constant',
  get: e => () => e,
  cachePolicyForParams_UNSTABLE: { equality: 'reference' }
});
Mo({
  key: '__error',
  get: e => () => {
    throw Oe(e);
  },
  cachePolicyForParams_UNSTABLE: { equality: 'reference' }
});
const {
  loadableWithError: Gw,
  loadableWithPromise: Yw,
  loadableWithValue: Xw
} = Js;
function Du(e, n) {
  const o = Array(n.length).fill(void 0),
    i = Array(n.length).fill(void 0);
  for (const [a, l] of n.entries())
    try {
      o[a] = e(l);
    } catch (c) {
      i[a] = c;
    }
  return [o, i];
}
function TL(e) {
  return e != null && !Je(e);
}
function Fu(e) {
  return Array.isArray(e) ? e : Object.getOwnPropertyNames(e).map(n => e[n]);
}
function Pd(e, n) {
  return Array.isArray(e)
    ? n
    : Object.getOwnPropertyNames(e).reduce(
        (o, i, a) => ({ ...o, [i]: n[a] }),
        {}
      );
}
function vi(e, n, o) {
  const i = o.map((a, l) => (a == null ? Xw(n[l]) : Je(a) ? Yw(a) : Gw(a)));
  return Pd(e, i);
}
function kL(e, n) {
  return n.map((o, i) => (o === void 0 ? e[i] : o));
}
Mo({
  key: '__waitForNone',
  get:
    e =>
    ({ get: n }) => {
      const o = Fu(e),
        [i, a] = Du(n, o);
      return vi(e, i, a);
    },
  dangerouslyAllowMutability: !0
});
Mo({
  key: '__waitForAny',
  get:
    e =>
    ({ get: n }) => {
      const o = Fu(e),
        [i, a] = Du(n, o);
      return a.some(l => !Je(l))
        ? vi(e, i, a)
        : new Promise(l => {
            for (const [c, f] of a.entries())
              Je(f) &&
                f
                  .then(p => {
                    ((i[c] = p), (a[c] = void 0), l(vi(e, i, a)));
                  })
                  .catch(p => {
                    ((a[c] = p), l(vi(e, i, a)));
                  });
          });
    },
  dangerouslyAllowMutability: !0
});
Mo({
  key: '__waitForAll',
  get:
    e =>
    ({ get: n }) => {
      const o = Fu(e),
        [i, a] = Du(n, o);
      if (a.every(c => c == null)) return Pd(e, i);
      const l = a.find(TL);
      if (l != null) throw l;
      return Promise.all(a).then(c => Pd(e, kL(i, c)));
    },
  dangerouslyAllowMutability: !0
});
Mo({
  key: '__waitForAllSettled',
  get:
    e =>
    ({ get: n }) => {
      const o = Fu(e),
        [i, a] = Du(n, o);
      return a.every(l => !Je(l))
        ? vi(e, i, a)
        : Promise.all(
            a.map((l, c) =>
              Je(l)
                ? l
                    .then(f => {
                      ((i[c] = f), (a[c] = void 0));
                    })
                    .catch(f => {
                      ((i[c] = void 0), (a[c] = f));
                    })
                : null
            )
          ).then(() => vi(e, i, a));
    },
  dangerouslyAllowMutability: !0
});
Mo({
  key: '__noWait',
  get:
    e =>
    ({ get: n }) => {
      try {
        return js.value(Xw(n(e)));
      } catch (o) {
        return js.value(Je(o) ? Yw(o) : Gw(o));
      }
    },
  dangerouslyAllowMutability: !0
});
const { RecoilLoadable: LA } = Js,
  { RecoilRoot: PL } = $p,
  { isRecoilValue: MA } = Ro,
  { freshSnapshot: AA } = Au,
  { useRecoilState: NL, useRecoilValue: LL, useSetRecoilState: ML } = XP;
var oa = {
    RecoilRoot: PL,
    atom: hL,
    useRecoilValue: LL,
    useRecoilState: NL,
    useSetRecoilState: ML
  },
  AL = oa.RecoilRoot,
  Dp = oa.atom,
  By = oa.useRecoilValue,
  $A = oa.useRecoilState,
  OA = oa.useSetRecoilState;
const $L = Dp({
    key: 'organizationTheme',
    default: {
      organization_name: 'default',
      organization_theme: {
        logo: '/data-store.png',
        organization: 'default',
        theme: {
          primaryColor: 'primary',
          colorScheme: 'dark',
          fontFamily: 'Arial, sans-serif',
          button: { color: '#343a40', textColor: '#ffffff' },
          colors: {
            primary: [
              '#343a40',
              '#2c3136',
              '#23272b',
              '#1d2124',
              '#16191c',
              '#0f1214',
              '#080a0b',
              '#030405',
              '#000000',
              '#000000'
            ],
            secondary: [
              '#adb5bd',
              '#949aa0',
              '#7b8287',
              '#62696f',
              '#4a5157',
              '#32383e',
              '#1a1f24',
              '#080a0b',
              '#000000',
              '#000000'
            ]
          },
          color: '#ffffff',
          backgroundColor: '#1b1e21',
          borderColor: '#4a4e69',
          linkColor: '#ff4d77',
          headerBackgroundColor: '#23272b'
        },
        themes: {
          dark: {
            primaryColor: 'primary',
            colorScheme: 'dark',
            fontFamily: 'Arial, sans-serif',
            button: {
              color: '#343a40',
              textColor: '#ffffff',
              hoverColor: '#23272b'
            },
            iconColor: '#74c0fc',
            accentColor: '#4dabf7',
            successColor: '#69db7c',
            warningColor: '#ffd43b',
            dangerColor: '#ff8787',
            lightDangerColor: '#fa5252',
            mutedTextColor: '#adb5bd',
            cardBackground: '#23272b',
            colors: {
              primary: [
                '#343a40',
                '#2c3136',
                '#23272b',
                '#1d2124',
                '#16191c',
                '#0f1214',
                '#080a0b',
                '#030405',
                '#000000',
                '#000000'
              ],
              secondary: [
                '#adb5bd',
                '#949aa0',
                '#7b8287',
                '#62696f',
                '#4a5157',
                '#32383e',
                '#1a1f24',
                '#080a0b',
                '#000000',
                '#000000'
              ]
            },
            color: '#ffffff',
            backgroundColor: '#1b1e21',
            borderColor: '#4a4e69',
            linkColor: '#ff4d77',
            headerBackgroundColor: '#23272b'
          },
          light: {
            primaryColor: 'primary',
            colorScheme: 'light',
            fontFamily: 'Arial, sans-serif',
            button: {
              color: '#495057',
              textColor: '#ffffff',
              hoverColor: '#343a40'
            },
            iconColor: '#228be6',
            accentColor: '#1c7ed6',
            successColor: '#2f9e44',
            warningColor: '#f08c00',
            dangerColor: '#c92a2a',
            lightDangerColor: '#fa5252',
            mutedTextColor: '#6c757d',
            cardBackground: '#f8f9fa',
            colors: {
              primary: [
                '#495057',
                '#5a6268',
                '#6c757d',
                '#7e888f',
                '#909aa1',
                '#a2acb3',
                '#b4bec5',
                '#c6d0d7',
                '#d8e2e9',
                '#eaf4fb'
              ],
              secondary: [
                '#6c757d',
                '#868e96',
                '#adb5bd',
                '#ced4da',
                '#dee2e6',
                '#e9ecef',
                '#f1f3f5',
                '#f8f9fa',
                '#ffffff',
                '#ffffff'
              ]
            },
            color: '#212529',
            backgroundColor: '#ffffff',
            borderColor: '#dee2e6',
            linkColor: '#dc3545',
            headerBackgroundColor: '#f8f9fa'
          }
        }
      }
    }
  }),
  IA = Dp({ key: 'organizationEmployees', default: [] }),
  OL =
    e =>
    ({ setSelf: n, onSet: o }) => {
      const i = localStorage.getItem(e);
      if (i != null)
        try {
          n(JSON.parse(i));
        } catch (a) {
          console.warn(`Failed to parse localStorage value for key "${e}":`, a);
        }
      o((a, l, c) => {
        if (c) localStorage.removeItem(e);
        else
          try {
            localStorage.setItem(e, JSON.stringify(a));
          } catch (f) {
            console.error(`Failed to save to localStorage for key "${e}":`, f);
          }
      });
    },
  IL = Dp({ key: 'theme', default: !1, effects: [OL('theme')] }),
  Br = e => e,
  DL = {
    primaryColor: 'primary',
    colorScheme: 'dark',
    fontFamily: 'Arial, sans-serif',
    button: { color: '#343a40', textColor: '#ffffff', hoverColor: '#23272b' },
    iconColor: '#74c0fc',
    accentColor: '#4dabf7',
    successColor: '#69db7c',
    warningColor: '#ffd43b',
    dangerColor: '#ff8787',
    lightDangerColor: '#fa5252',
    mutedTextColor: '#adb5bd',
    cardBackground: '#23272b',
    colors: {
      primary: Br([
        '#343a40',
        '#2c3136',
        '#23272b',
        '#1d2124',
        '#16191c',
        '#0f1214',
        '#080a0b',
        '#030405',
        '#000000',
        '#000000'
      ]),
      secondary: Br([
        '#adb5bd',
        '#949aa0',
        '#7b8287',
        '#62696f',
        '#4a5157',
        '#32383e',
        '#1a1f24',
        '#080a0b',
        '#000000',
        '#000000'
      ])
    },
    color: '#ffffff',
    backgroundColor: '#1b1e21',
    borderColor: '#4a4e69',
    linkColor: '#ff4d77',
    headerBackgroundColor: '#23272b'
  },
  FL = {
    primaryColor: 'primary',
    colorScheme: 'light',
    fontFamily: 'Arial, sans-serif',
    button: { color: '#495057', textColor: '#ffffff', hoverColor: '#343a40' },
    iconColor: '#228be6',
    accentColor: '#1c7ed6',
    successColor: '#2f9e44',
    warningColor: '#f08c00',
    dangerColor: '#c92a2a',
    lightDangerColor: '#fa5252',
    mutedTextColor: '#6c757d',
    cardBackground: '#f8f9fa',
    colors: {
      primary: Br([
        '#495057',
        '#5a6268',
        '#6c757d',
        '#7e888f',
        '#909aa1',
        '#a2acb3',
        '#b4bec5',
        '#c6d0d7',
        '#d8e2e9',
        '#eaf4fb'
      ]),
      secondary: Br([
        '#6c757d',
        '#868e96',
        '#adb5bd',
        '#ced4da',
        '#dee2e6',
        '#e9ecef',
        '#f1f3f5',
        '#f8f9fa',
        '#ffffff',
        '#ffffff'
      ])
    },
    color: '#212529',
    backgroundColor: '#ffffff',
    borderColor: '#dee2e6',
    linkColor: '#dc3545',
    headerBackgroundColor: '#f8f9fa'
  };
function zL(e, n) {
  var a, l;
  const o = e == null ? void 0 : e.organization_theme,
    i = n ? DL : FL;
  if (
    (a = o == null ? void 0 : o.themes) != null &&
    a.dark &&
    (l = o == null ? void 0 : o.themes) != null &&
    l.light
  ) {
    const c = n ? o.themes.dark : o.themes.light;
    return {
      ...i,
      ...c,
      colors: {
        ...i.colors,
        ...(c.colors
          ? {
              primary: c.colors.primary
                ? Br(c.colors.primary)
                : i.colors.primary,
              secondary: c.colors.secondary
                ? Br(c.colors.secondary)
                : i.colors.secondary
            }
          : {})
      }
    };
  }
  if (o != null && o.theme) {
    const c = o.theme;
    return {
      ...i,
      ...c,
      button: { ...i.button, ...c.button },
      colors: {
        ...i.colors,
        ...(c.colors
          ? {
              primary: c.colors.primary
                ? Br(c.colors.primary)
                : i.colors.primary,
              secondary: c.colors.secondary
                ? Br(c.colors.secondary)
                : i.colors.secondary
            }
          : {})
      }
    };
  }
  return i;
}
const qw = () => {
    const e = By($L),
      n = By(IL);
    return {
      themeConfig: w.useMemo(() => zL(e, n), [e, n]),
      isDarkTheme: n,
      organizationConfig: e
    };
  },
  jL = '_loaderContainer_1o9zv_1',
  VL = '_md_1o9zv_8',
  BL = '_sm_1o9zv_13',
  UL = '_xs_1o9zv_18',
  WL = '_lg_1o9zv_23',
  HL = '_ripple_1o9zv_28',
  KL = '_core_1o9zv_37',
  QL = '_loadingText_1o9zv_44',
  GL = '_pulse_1o9zv_1',
  fi = {
    loaderContainer: jL,
    md: VL,
    sm: BL,
    xs: UL,
    lg: WL,
    ripple: HL,
    core: KL,
    loadingText: QL,
    pulse: GL,
    'ripple-md': '_ripple-md_1o9zv_1',
    'ripple-sm': '_ripple-sm_1o9zv_1',
    'ripple-xs': '_ripple-xs_1o9zv_1',
    'ripple-lg': '_ripple-lg_1o9zv_1'
  },
  YL = ({
    label: e = 'Loading...',
    minHeight: n = '400px',
    size: o = 'md'
  }) => {
    const { themeConfig: i } = qw();
    return D.jsx(gp, {
      h: n,
      w: '100%',
      style: { backgroundColor: i.backgroundColor },
      children: D.jsxs(wp, {
        align: 'center',
        gap: o === 'xs' ? 0 : o === 'sm' ? 'sm' : 'xl',
        children: [
          D.jsxs('div', {
            className: `${fi.loaderContainer} ${fi[o]}`,
            children: [
              D.jsx('div', {
                className: fi.ripple,
                style: { borderColor: i.button.color }
              }),
              D.jsx('div', {
                className: fi.ripple,
                style: { borderColor: i.button.color, animationDelay: '-1s' }
              }),
              D.jsx(Be, { className: fi.core, bg: i.button.color })
            ]
          }),
          o !== 'xs' &&
            D.jsx(mp, {
              fw: 500,
              size: o === 'sm' ? 'sm' : 'lg',
              className: fi.loadingText,
              style: { color: i.color },
              children: e
            })
        ]
      })
    });
  },
  XL = w.lazy(() =>
    Gs(
      () => import('./landing-CGvcWUhR.js'),
      __vite__mapDeps([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21
      ])
    )
  ),
  qL = w.lazy(() =>
    Gs(
      () => import('./admin-B4khXjP8.js'),
      __vite__mapDeps([22, 13, 14, 23, 24])
    )
  ),
  ZL = w.lazy(() =>
    Gs(
      () => import('./user-DszOWzyE.js'),
      __vite__mapDeps([25, 13, 14, 23, 24])
    )
  ),
  JL = w.lazy(() => Gs(() => import('./super-admin-Cz8A-hoq.js'), [])),
  eM = w.lazy(() => Gs(() => import('./common-DTST3rDm.js'), [])),
  tM = () => {
    const { themeConfig: e, isDarkTheme: n } = qw();
    return D.jsx(Hg, {
      theme: e,
      forceColorScheme: n ? 'dark' : 'light',
      children: D.jsx(mT, {
        children: D.jsx(h_, {
          children: D.jsx(w.Suspense, {
            fallback: D.jsx(YL, { label: 'SRYTAL', minHeight: '100vh' }),
            children: D.jsxs(s_, {
              children: [
                D.jsx(di, { path: '/', element: D.jsx(XL, {}) }),
                D.jsx(di, {
                  path: '/:organization/admin/*',
                  element: D.jsx(qL, {})
                }),
                D.jsx(di, {
                  path: '/:organization/employee/*',
                  element: D.jsx(ZL, {})
                }),
                D.jsx(di, { path: '/superadmin/*', element: D.jsx(JL, {}) }),
                D.jsx(di, { path: '/*', element: D.jsx(eM, {}) })
              ]
            })
          })
        })
      })
    });
  },
  Vs = e => typeof e == 'number' && !isNaN(e),
  _o = e => typeof e == 'string',
  Zt = e => typeof e == 'function',
  Bl = e => (_o(e) || Zt(e) ? e : null),
  Nd = e => w.isValidElement(e) || _o(e) || Zt(e) || Vs(e);
function nM(e, n, o) {
  o === void 0 && (o = 300);
  const { scrollHeight: i, style: a } = e;
  requestAnimationFrame(() => {
    ((a.minHeight = 'initial'),
      (a.height = i + 'px'),
      (a.transition = `all ${o}ms`),
      requestAnimationFrame(() => {
        ((a.height = '0'),
          (a.padding = '0'),
          (a.margin = '0'),
          setTimeout(n, o));
      }));
  });
}
function zu(e) {
  let {
    enter: n,
    exit: o,
    appendPosition: i = !1,
    collapse: a = !0,
    collapseDuration: l = 300
  } = e;
  return function (c) {
    let {
      children: f,
      position: p,
      preventExitTransition: m,
      done: v,
      nodeRef: y,
      isIn: C,
      playToast: S
    } = c;
    const E = i ? `${n}--${p}` : n,
      _ = i ? `${o}--${p}` : o,
      b = w.useRef(0);
    return (
      w.useLayoutEffect(() => {
        const N = y.current,
          R = E.split(' '),
          T = k => {
            k.target === y.current &&
              (S(),
              N.removeEventListener('animationend', T),
              N.removeEventListener('animationcancel', T),
              b.current === 0 &&
                k.type !== 'animationcancel' &&
                N.classList.remove(...R));
          };
        (N.classList.add(...R),
          N.addEventListener('animationend', T),
          N.addEventListener('animationcancel', T));
      }, []),
      w.useEffect(() => {
        const N = y.current,
          R = () => {
            (N.removeEventListener('animationend', R), a ? nM(N, v, l) : v());
          };
        C ||
          (m
            ? R()
            : ((b.current = 1),
              (N.className += ` ${_}`),
              N.addEventListener('animationend', R)));
      }, [C]),
      ke.createElement(ke.Fragment, null, f)
    );
  };
}
function Uy(e, n) {
  return e != null
    ? {
        content: e.content,
        containerId: e.props.containerId,
        id: e.props.toastId,
        theme: e.props.theme,
        type: e.props.type,
        data: e.props.data || {},
        isLoading: e.props.isLoading,
        icon: e.props.icon,
        status: n
      }
    : {};
}
const It = new Map();
let Bs = [];
const Ld = new Set(),
  rM = e => Ld.forEach(n => n(e)),
  Zw = () => It.size > 0;
function Jw(e, n) {
  var o;
  if (n) return !((o = It.get(n)) == null || !o.isToastActive(e));
  let i = !1;
  return (
    It.forEach(a => {
      a.isToastActive(e) && (i = !0);
    }),
    i
  );
}
function eS(e, n) {
  Nd(e) &&
    (Zw() || Bs.push({ content: e, options: n }),
    It.forEach(o => {
      o.buildToast(e, n);
    }));
}
function Wy(e, n) {
  It.forEach(o => {
    n != null && n != null && n.containerId
      ? (n == null ? void 0 : n.containerId) === o.id &&
        o.toggle(e, n == null ? void 0 : n.id)
      : o.toggle(e, n == null ? void 0 : n.id);
  });
}
function oM(e) {
  const {
    subscribe: n,
    getSnapshot: o,
    setProps: i
  } = w.useRef(
    (function (l) {
      const c = l.containerId || 1;
      return {
        subscribe(f) {
          const p = (function (v, y, C) {
            let S = 1,
              E = 0,
              _ = [],
              b = [],
              N = [],
              R = y;
            const T = new Map(),
              k = new Set(),
              $ = () => {
                ((N = Array.from(T.values())), k.forEach(F => F()));
              },
              W = F => {
                ((b = F == null ? [] : b.filter(G => G !== F)), $());
              },
              H = F => {
                const {
                    toastId: G,
                    onOpen: q,
                    updateId: ce,
                    children: ye
                  } = F.props,
                  le = ce == null;
                (F.staleId && T.delete(F.staleId),
                  T.set(G, F),
                  (b = [...b, F.props.toastId].filter(Z => Z !== F.staleId)),
                  $(),
                  C(Uy(F, le ? 'added' : 'updated')),
                  le && Zt(q) && q(w.isValidElement(ye) && ye.props));
              };
            return {
              id: v,
              props: R,
              observe: F => (k.add(F), () => k.delete(F)),
              toggle: (F, G) => {
                T.forEach(q => {
                  (G != null && G !== q.props.toastId) ||
                    (Zt(q.toggle) && q.toggle(F));
                });
              },
              removeToast: W,
              toasts: T,
              clearQueue: () => {
                ((E -= _.length), (_ = []));
              },
              buildToast: (F, G) => {
                if (
                  (x => {
                    let { containerId: B, toastId: Q, updateId: te } = x;
                    const J = B ? B !== v : v !== 1,
                      de = T.has(Q) && te == null;
                    return J || de;
                  })(G)
                )
                  return;
                const {
                    toastId: q,
                    updateId: ce,
                    data: ye,
                    staleId: le,
                    delay: Z
                  } = G,
                  me = () => {
                    W(q);
                  },
                  fe = ce == null;
                fe && E++;
                const ee = {
                  ...R,
                  style: R.toastStyle,
                  key: S++,
                  ...Object.fromEntries(
                    Object.entries(G).filter(x => {
                      let [B, Q] = x;
                      return Q != null;
                    })
                  ),
                  toastId: q,
                  updateId: ce,
                  data: ye,
                  closeToast: me,
                  isIn: !1,
                  className: Bl(G.className || R.toastClassName),
                  bodyClassName: Bl(G.bodyClassName || R.bodyClassName),
                  progressClassName: Bl(
                    G.progressClassName || R.progressClassName
                  ),
                  autoClose:
                    !G.isLoading &&
                    ((O = G.autoClose),
                    (X = R.autoClose),
                    O === !1 || (Vs(O) && O > 0) ? O : X),
                  deleteToast() {
                    const x = T.get(q),
                      { onClose: B, children: Q } = x.props;
                    (Zt(B) && B(w.isValidElement(Q) && Q.props),
                      C(Uy(x, 'removed')),
                      T.delete(q),
                      E--,
                      E < 0 && (E = 0),
                      _.length > 0 ? H(_.shift()) : $());
                  }
                };
                var O, X;
                ((ee.closeButton = R.closeButton),
                  G.closeButton === !1 || Nd(G.closeButton)
                    ? (ee.closeButton = G.closeButton)
                    : G.closeButton === !0 &&
                      (ee.closeButton = !Nd(R.closeButton) || R.closeButton));
                let U = F;
                w.isValidElement(F) && !_o(F.type)
                  ? (U = w.cloneElement(F, {
                      closeToast: me,
                      toastProps: ee,
                      data: ye
                    }))
                  : Zt(F) &&
                    (U = F({ closeToast: me, toastProps: ee, data: ye }));
                const L = { content: U, props: ee, staleId: le };
                R.limit && R.limit > 0 && E > R.limit && fe
                  ? _.push(L)
                  : Vs(Z)
                    ? setTimeout(() => {
                        H(L);
                      }, Z)
                    : H(L);
              },
              setProps(F) {
                R = F;
              },
              setToggle: (F, G) => {
                T.get(F).toggle = G;
              },
              isToastActive: F => b.some(G => G === F),
              getSnapshot: () => N
            };
          })(c, l, rM);
          It.set(c, p);
          const m = p.observe(f);
          return (
            Bs.forEach(v => eS(v.content, v.options)),
            (Bs = []),
            () => {
              (m(), It.delete(c));
            }
          );
        },
        setProps(f) {
          var p;
          (p = It.get(c)) == null || p.setProps(f);
        },
        getSnapshot() {
          var f;
          return (f = It.get(c)) == null ? void 0 : f.getSnapshot();
        }
      };
    })(e)
  ).current;
  i(e);
  const a = w.useSyncExternalStore(n, o, o);
  return {
    getToastToRender: function (l) {
      if (!a) return [];
      const c = new Map();
      return (
        e.newestOnTop && a.reverse(),
        a.forEach(f => {
          const { position: p } = f.props;
          (c.has(p) || c.set(p, []), c.get(p).push(f));
        }),
        Array.from(c, f => l(f[0], f[1]))
      );
    },
    isToastActive: Jw,
    count: a == null ? void 0 : a.length
  };
}
function iM(e) {
  const [n, o] = w.useState(!1),
    [i, a] = w.useState(!1),
    l = w.useRef(null),
    c = w.useRef({
      start: 0,
      delta: 0,
      removalDistance: 0,
      canCloseOnClick: !0,
      canDrag: !1,
      didMove: !1
    }).current,
    {
      autoClose: f,
      pauseOnHover: p,
      closeToast: m,
      onClick: v,
      closeOnClick: y
    } = e;
  var C, S;
  function E() {
    o(!0);
  }
  function _() {
    o(!1);
  }
  function b(T) {
    const k = l.current;
    c.canDrag &&
      k &&
      ((c.didMove = !0),
      n && _(),
      (c.delta =
        e.draggableDirection === 'x'
          ? T.clientX - c.start
          : T.clientY - c.start),
      c.start !== T.clientX && (c.canCloseOnClick = !1),
      (k.style.transform = `translate3d(${e.draggableDirection === 'x' ? `${c.delta}px, var(--y)` : `0, calc(${c.delta}px + var(--y))`},0)`),
      (k.style.opacity = '' + (1 - Math.abs(c.delta / c.removalDistance))));
  }
  function N() {
    (document.removeEventListener('pointermove', b),
      document.removeEventListener('pointerup', N));
    const T = l.current;
    if (c.canDrag && c.didMove && T) {
      if (((c.canDrag = !1), Math.abs(c.delta) > c.removalDistance))
        return (a(!0), e.closeToast(), void e.collapseAll());
      ((T.style.transition = 'transform 0.2s, opacity 0.2s'),
        T.style.removeProperty('transform'),
        T.style.removeProperty('opacity'));
    }
  }
  ((S = It.get(
    (C = { id: e.toastId, containerId: e.containerId, fn: o }).containerId || 1
  )) == null || S.setToggle(C.id, C.fn),
    w.useEffect(() => {
      if (e.pauseOnFocusLoss)
        return (
          document.hasFocus() || _(),
          window.addEventListener('focus', E),
          window.addEventListener('blur', _),
          () => {
            (window.removeEventListener('focus', E),
              window.removeEventListener('blur', _));
          }
        );
    }, [e.pauseOnFocusLoss]));
  const R = {
    onPointerDown: function (T) {
      if (e.draggable === !0 || e.draggable === T.pointerType) {
        ((c.didMove = !1),
          document.addEventListener('pointermove', b),
          document.addEventListener('pointerup', N));
        const k = l.current;
        ((c.canCloseOnClick = !0),
          (c.canDrag = !0),
          (k.style.transition = 'none'),
          e.draggableDirection === 'x'
            ? ((c.start = T.clientX),
              (c.removalDistance = k.offsetWidth * (e.draggablePercent / 100)))
            : ((c.start = T.clientY),
              (c.removalDistance =
                (k.offsetHeight *
                  (e.draggablePercent === 80
                    ? 1.5 * e.draggablePercent
                    : e.draggablePercent)) /
                100)));
      }
    },
    onPointerUp: function (T) {
      const {
        top: k,
        bottom: $,
        left: W,
        right: H
      } = l.current.getBoundingClientRect();
      T.nativeEvent.type !== 'touchend' &&
      e.pauseOnHover &&
      T.clientX >= W &&
      T.clientX <= H &&
      T.clientY >= k &&
      T.clientY <= $
        ? _()
        : E();
    }
  };
  return (
    f && p && ((R.onMouseEnter = _), e.stacked || (R.onMouseLeave = E)),
    y &&
      (R.onClick = T => {
        (v && v(T), c.canCloseOnClick && m());
      }),
    {
      playToast: E,
      pauseToast: _,
      isRunning: n,
      preventExitTransition: i,
      toastRef: l,
      eventHandlers: R
    }
  );
}
function sM(e) {
  let {
    delay: n,
    isRunning: o,
    closeToast: i,
    type: a = 'default',
    hide: l,
    className: c,
    style: f,
    controlledProgress: p,
    progress: m,
    rtl: v,
    isIn: y,
    theme: C
  } = e;
  const S = l || (p && m === 0),
    E = {
      ...f,
      animationDuration: `${n}ms`,
      animationPlayState: o ? 'running' : 'paused'
    };
  p && (E.transform = `scaleX(${m})`);
  const _ = ct(
      'Toastify__progress-bar',
      p
        ? 'Toastify__progress-bar--controlled'
        : 'Toastify__progress-bar--animated',
      `Toastify__progress-bar-theme--${C}`,
      `Toastify__progress-bar--${a}`,
      { 'Toastify__progress-bar--rtl': v }
    ),
    b = Zt(c) ? c({ rtl: v, type: a, defaultClassName: _ }) : ct(_, c),
    N = {
      [p && m >= 1 ? 'onTransitionEnd' : 'onAnimationEnd']:
        p && m < 1
          ? null
          : () => {
              y && i();
            }
    };
  return ke.createElement(
    'div',
    { className: 'Toastify__progress-bar--wrp', 'data-hidden': S },
    ke.createElement('div', {
      className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${C} Toastify__progress-bar--${a}`
    }),
    ke.createElement('div', {
      role: 'progressbar',
      'aria-hidden': S ? 'true' : 'false',
      'aria-label': 'notification timer',
      className: b,
      style: E,
      ...N
    })
  );
}
let aM = 1;
const tS = () => '' + aM++;
function lM(e) {
  return e && (_o(e.toastId) || Vs(e.toastId)) ? e.toastId : tS();
}
function $s(e, n) {
  return (eS(e, n), n.toastId);
}
function Zl(e, n) {
  return { ...n, type: (n && n.type) || e, toastId: lM(n) };
}
function Ml(e) {
  return (n, o) => $s(n, Zl(e, o));
}
function qe(e, n) {
  return $s(e, Zl('default', n));
}
((qe.loading = (e, n) =>
  $s(
    e,
    Zl('default', {
      isLoading: !0,
      autoClose: !1,
      closeOnClick: !1,
      closeButton: !1,
      draggable: !1,
      ...n
    })
  )),
  (qe.promise = function (e, n, o) {
    let i,
      { pending: a, error: l, success: c } = n;
    a && (i = _o(a) ? qe.loading(a, o) : qe.loading(a.render, { ...o, ...a }));
    const f = {
        isLoading: null,
        autoClose: null,
        closeOnClick: null,
        closeButton: null,
        draggable: null
      },
      p = (v, y, C) => {
        if (y == null) return void qe.dismiss(i);
        const S = { type: v, ...f, ...o, data: C },
          E = _o(y) ? { render: y } : y;
        return (
          i ? qe.update(i, { ...S, ...E }) : qe(E.render, { ...S, ...E }),
          C
        );
      },
      m = Zt(e) ? e() : e;
    return (m.then(v => p('success', c, v)).catch(v => p('error', l, v)), m);
  }),
  (qe.success = Ml('success')),
  (qe.info = Ml('info')),
  (qe.error = Ml('error')),
  (qe.warning = Ml('warning')),
  (qe.warn = qe.warning),
  (qe.dark = (e, n) => $s(e, Zl('default', { theme: 'dark', ...n }))),
  (qe.dismiss = function (e) {
    (function (n) {
      var o;
      if (Zw()) {
        if (n == null || _o((o = n)) || Vs(o))
          It.forEach(i => {
            i.removeToast(n);
          });
        else if (n && ('containerId' in n || 'id' in n)) {
          const i = It.get(n.containerId);
          i
            ? i.removeToast(n.id)
            : It.forEach(a => {
                a.removeToast(n.id);
              });
        }
      } else Bs = Bs.filter(i => n != null && i.options.toastId !== n);
    })(e);
  }),
  (qe.clearWaitingQueue = function (e) {
    (e === void 0 && (e = {}),
      It.forEach(n => {
        !n.props.limit ||
          (e.containerId && n.id !== e.containerId) ||
          n.clearQueue();
      }));
  }),
  (qe.isActive = Jw),
  (qe.update = function (e, n) {
    n === void 0 && (n = {});
    const o = ((i, a) => {
      var l;
      let { containerId: c } = a;
      return (l = It.get(c || 1)) == null ? void 0 : l.toasts.get(i);
    })(e, n);
    if (o) {
      const { props: i, content: a } = o,
        l = { delay: 100, ...i, ...n, toastId: n.toastId || e, updateId: tS() };
      l.toastId !== e && (l.staleId = e);
      const c = l.render || a;
      (delete l.render, $s(c, l));
    }
  }),
  (qe.done = e => {
    qe.update(e, { progress: 1 });
  }),
  (qe.onChange = function (e) {
    return (
      Ld.add(e),
      () => {
        Ld.delete(e);
      }
    );
  }),
  (qe.play = e => Wy(!0, e)),
  (qe.pause = e => Wy(!1, e)));
const uM = typeof window < 'u' ? w.useLayoutEffect : w.useEffect,
  Al = e => {
    let { theme: n, type: o, isLoading: i, ...a } = e;
    return ke.createElement('svg', {
      viewBox: '0 0 24 24',
      width: '100%',
      height: '100%',
      fill:
        n === 'colored' ? 'currentColor' : `var(--toastify-icon-color-${o})`,
      ...a
    });
  },
  rd = {
    info: function (e) {
      return ke.createElement(
        Al,
        { ...e },
        ke.createElement('path', {
          d: 'M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z'
        })
      );
    },
    warning: function (e) {
      return ke.createElement(
        Al,
        { ...e },
        ke.createElement('path', {
          d: 'M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z'
        })
      );
    },
    success: function (e) {
      return ke.createElement(
        Al,
        { ...e },
        ke.createElement('path', {
          d: 'M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z'
        })
      );
    },
    error: function (e) {
      return ke.createElement(
        Al,
        { ...e },
        ke.createElement('path', {
          d: 'M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z'
        })
      );
    },
    spinner: function () {
      return ke.createElement('div', { className: 'Toastify__spinner' });
    }
  },
  cM = e => {
    const {
        isRunning: n,
        preventExitTransition: o,
        toastRef: i,
        eventHandlers: a,
        playToast: l
      } = iM(e),
      {
        closeButton: c,
        children: f,
        autoClose: p,
        onClick: m,
        type: v,
        hideProgressBar: y,
        closeToast: C,
        transition: S,
        position: E,
        className: _,
        style: b,
        bodyClassName: N,
        bodyStyle: R,
        progressClassName: T,
        progressStyle: k,
        updateId: $,
        role: W,
        progress: H,
        rtl: F,
        toastId: G,
        deleteToast: q,
        isIn: ce,
        isLoading: ye,
        closeOnClick: le,
        theme: Z
      } = e,
      me = ct(
        'Toastify__toast',
        `Toastify__toast-theme--${Z}`,
        `Toastify__toast--${v}`,
        { 'Toastify__toast--rtl': F },
        { 'Toastify__toast--close-on-click': le }
      ),
      fe = Zt(_)
        ? _({ rtl: F, position: E, type: v, defaultClassName: me })
        : ct(me, _),
      ee = (function (L) {
        let { theme: x, type: B, isLoading: Q, icon: te } = L,
          J = null;
        const de = { theme: x, type: B };
        return (
          te === !1 ||
            (Zt(te)
              ? (J = te({ ...de, isLoading: Q }))
              : w.isValidElement(te)
                ? (J = w.cloneElement(te, de))
                : Q
                  ? (J = rd.spinner())
                  : (ae => ae in rd)(B) && (J = rd[B](de))),
          J
        );
      })(e),
      O = !!H || !p,
      X = { closeToast: C, type: v, theme: Z };
    let U = null;
    return (
      c === !1 ||
        (U = Zt(c)
          ? c(X)
          : w.isValidElement(c)
            ? w.cloneElement(c, X)
            : (function (L) {
                let { closeToast: x, theme: B, ariaLabel: Q = 'close' } = L;
                return ke.createElement(
                  'button',
                  {
                    className: `Toastify__close-button Toastify__close-button--${B}`,
                    type: 'button',
                    onClick: te => {
                      (te.stopPropagation(), x(te));
                    },
                    'aria-label': Q
                  },
                  ke.createElement(
                    'svg',
                    { 'aria-hidden': 'true', viewBox: '0 0 14 16' },
                    ke.createElement('path', {
                      fillRule: 'evenodd',
                      d: 'M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z'
                    })
                  )
                );
              })(X)),
      ke.createElement(
        S,
        {
          isIn: ce,
          done: q,
          position: E,
          preventExitTransition: o,
          nodeRef: i,
          playToast: l
        },
        ke.createElement(
          'div',
          {
            id: G,
            onClick: m,
            'data-in': ce,
            className: fe,
            ...a,
            style: b,
            ref: i
          },
          ke.createElement(
            'div',
            {
              ...(ce && { role: W }),
              className: Zt(N) ? N({ type: v }) : ct('Toastify__toast-body', N),
              style: R
            },
            ee != null &&
              ke.createElement(
                'div',
                {
                  className: ct('Toastify__toast-icon', {
                    'Toastify--animate-icon Toastify__zoom-enter': !ye
                  })
                },
                ee
              ),
            ke.createElement('div', null, f)
          ),
          U,
          ke.createElement(sM, {
            ...($ && !O ? { key: `pb-${$}` } : {}),
            rtl: F,
            theme: Z,
            delay: p,
            isRunning: n,
            isIn: ce,
            closeToast: C,
            hide: y,
            type: v,
            style: k,
            className: T,
            controlledProgress: O,
            progress: H || 0
          })
        )
      )
    );
  },
  ju = function (e, n) {
    return (
      n === void 0 && (n = !1),
      {
        enter: `Toastify--animate Toastify__${e}-enter`,
        exit: `Toastify--animate Toastify__${e}-exit`,
        appendPosition: n
      }
    );
  },
  fM = zu(ju('bounce', !0));
zu(ju('slide', !0));
zu(ju('zoom'));
zu(ju('flip'));
const dM = {
  position: 'top-right',
  transition: fM,
  autoClose: 5e3,
  closeButton: !0,
  pauseOnHover: !0,
  pauseOnFocusLoss: !0,
  draggable: 'touch',
  draggablePercent: 80,
  draggableDirection: 'x',
  role: 'alert',
  theme: 'light'
};
function pM(e) {
  let n = { ...dM, ...e };
  const o = e.stacked,
    [i, a] = w.useState(!0),
    l = w.useRef(null),
    { getToastToRender: c, isToastActive: f, count: p } = oM(n),
    { className: m, style: v, rtl: y, containerId: C } = n;
  function S(_) {
    const b = ct(
      'Toastify__toast-container',
      `Toastify__toast-container--${_}`,
      { 'Toastify__toast-container--rtl': y }
    );
    return Zt(m)
      ? m({ position: _, rtl: y, defaultClassName: b })
      : ct(b, Bl(m));
  }
  function E() {
    o && (a(!0), qe.play());
  }
  return (
    uM(() => {
      if (o) {
        var _;
        const b = l.current.querySelectorAll('[data-in="true"]'),
          N = 12,
          R = (_ = n.position) == null ? void 0 : _.includes('top');
        let T = 0,
          k = 0;
        Array.from(b)
          .reverse()
          .forEach(($, W) => {
            const H = $;
            (H.classList.add('Toastify__toast--stacked'),
              W > 0 && (H.dataset.collapsed = `${i}`),
              H.dataset.pos || (H.dataset.pos = R ? 'top' : 'bot'));
            const F = T * (i ? 0.2 : 1) + (i ? 0 : N * W);
            (H.style.setProperty('--y', `${R ? F : -1 * F}px`),
              H.style.setProperty('--g', `${N}`),
              H.style.setProperty('--s', '' + (1 - (i ? k : 0))),
              (T += H.offsetHeight),
              (k += 0.025));
          });
      }
    }, [i, p, o]),
    ke.createElement(
      'div',
      {
        ref: l,
        className: 'Toastify',
        id: C,
        onMouseEnter: () => {
          o && (a(!1), qe.pause());
        },
        onMouseLeave: E
      },
      c((_, b) => {
        const N = b.length ? { ...v } : { ...v, pointerEvents: 'none' };
        return ke.createElement(
          'div',
          { className: S(_), style: N, key: `container-${_}` },
          b.map(R => {
            let { content: T, props: k } = R;
            return ke.createElement(
              cM,
              {
                ...k,
                stacked: o,
                collapseAll: E,
                isIn: f(k.toastId, k.containerId),
                style: k.style,
                key: `toast-${k.key}`
              },
              T
            );
          })
        );
      })
    )
  );
}
var Vu = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  mo,
  Or,
  yi,
  Jy,
  hM =
    ((Jy = class extends Vu {
      constructor() {
        super();
        Fe(this, mo);
        Fe(this, Or);
        Fe(this, yi);
        Le(this, yi, n => {
          if (typeof window < 'u' && window.addEventListener) {
            const o = () => n();
            return (
              window.addEventListener('visibilitychange', o, !1),
              () => {
                window.removeEventListener('visibilitychange', o);
              }
            );
          }
        });
      }
      onSubscribe() {
        Y(this, Or) || this.setEventListener(Y(this, yi));
      }
      onUnsubscribe() {
        var n;
        this.hasListeners() ||
          ((n = Y(this, Or)) == null || n.call(this), Le(this, Or, void 0));
      }
      setEventListener(n) {
        var o;
        (Le(this, yi, n),
          (o = Y(this, Or)) == null || o.call(this),
          Le(
            this,
            Or,
            n(i => {
              typeof i == 'boolean' ? this.setFocused(i) : this.onFocus();
            })
          ));
      }
      setFocused(n) {
        Y(this, mo) !== n && (Le(this, mo, n), this.onFocus());
      }
      onFocus() {
        const n = this.isFocused();
        this.listeners.forEach(o => {
          o(n);
        });
      }
      isFocused() {
        var n;
        return typeof Y(this, mo) == 'boolean'
          ? Y(this, mo)
          : ((n = globalThis.document) == null ? void 0 : n.visibilityState) !==
              'hidden';
      }
    }),
    (mo = new WeakMap()),
    (Or = new WeakMap()),
    (yi = new WeakMap()),
    Jy),
  nS = new hM(),
  mM = {
    setTimeout: (e, n) => setTimeout(e, n),
    clearTimeout: e => clearTimeout(e),
    setInterval: (e, n) => setInterval(e, n),
    clearInterval: e => clearInterval(e)
  },
  Ir,
  Id,
  eg,
  vM =
    ((eg = class {
      constructor() {
        Fe(this, Ir, mM);
        Fe(this, Id, !1);
      }
      setTimeoutProvider(e) {
        Le(this, Ir, e);
      }
      setTimeout(e, n) {
        return Y(this, Ir).setTimeout(e, n);
      }
      clearTimeout(e) {
        Y(this, Ir).clearTimeout(e);
      }
      setInterval(e, n) {
        return Y(this, Ir).setInterval(e, n);
      }
      clearInterval(e) {
        Y(this, Ir).clearInterval(e);
      }
    }),
    (Ir = new WeakMap()),
    (Id = new WeakMap()),
    eg),
  Md = new vM();
function yM(e) {
  setTimeout(e, 0);
}
var gM = typeof window > 'u' || 'Deno' in globalThis;
function En() {}
function wM(e, n) {
  return typeof e == 'function' ? e(n) : e;
}
function SM(e) {
  return typeof e == 'number' && e >= 0 && e !== 1 / 0;
}
function CM(e, n) {
  return Math.max(e + (n || 0) - Date.now(), 0);
}
function Ad(e, n) {
  return typeof e == 'function' ? e(n) : e;
}
function _M(e, n) {
  return typeof e == 'function' ? e(n) : e;
}
function Hy(e, n) {
  const {
    type: o = 'all',
    exact: i,
    fetchStatus: a,
    predicate: l,
    queryKey: c,
    stale: f
  } = e;
  if (c) {
    if (i) {
      if (n.queryHash !== Fp(c, n.options)) return !1;
    } else if (!Ws(n.queryKey, c)) return !1;
  }
  if (o !== 'all') {
    const p = n.isActive();
    if ((o === 'active' && !p) || (o === 'inactive' && p)) return !1;
  }
  return !(
    (typeof f == 'boolean' && n.isStale() !== f) ||
    (a && a !== n.state.fetchStatus) ||
    (l && !l(n))
  );
}
function Ky(e, n) {
  const { exact: o, status: i, predicate: a, mutationKey: l } = e;
  if (l) {
    if (!n.options.mutationKey) return !1;
    if (o) {
      if (Us(n.options.mutationKey) !== Us(l)) return !1;
    } else if (!Ws(n.options.mutationKey, l)) return !1;
  }
  return !((i && n.state.status !== i) || (a && !a(n)));
}
function Fp(e, n) {
  return ((n == null ? void 0 : n.queryKeyHashFn) || Us)(e);
}
function Us(e) {
  return JSON.stringify(e, (n, o) =>
    $d(o)
      ? Object.keys(o)
          .sort()
          .reduce((i, a) => ((i[a] = o[a]), i), {})
      : o
  );
}
function Ws(e, n) {
  return e === n
    ? !0
    : typeof e != typeof n
      ? !1
      : e && n && typeof e == 'object' && typeof n == 'object'
        ? Object.keys(n).every(o => Ws(e[o], n[o]))
        : !1;
}
var EM = Object.prototype.hasOwnProperty;
function rS(e, n, o = 0) {
  if (e === n) return e;
  if (o > 500) return n;
  const i = Qy(e) && Qy(n);
  if (!i && !($d(e) && $d(n))) return n;
  const l = (i ? e : Object.keys(e)).length,
    c = i ? n : Object.keys(n),
    f = c.length,
    p = i ? new Array(f) : {};
  let m = 0;
  for (let v = 0; v < f; v++) {
    const y = i ? v : c[v],
      C = e[y],
      S = n[y];
    if (C === S) {
      ((p[y] = C), (i ? v < l : EM.call(e, y)) && m++);
      continue;
    }
    if (
      C === null ||
      S === null ||
      typeof C != 'object' ||
      typeof S != 'object'
    ) {
      p[y] = S;
      continue;
    }
    const E = rS(C, S, o + 1);
    ((p[y] = E), E === C && m++);
  }
  return l === f && m === l ? e : p;
}
function DA(e, n) {
  if (!n || Object.keys(e).length !== Object.keys(n).length) return !1;
  for (const o in e) if (e[o] !== n[o]) return !1;
  return !0;
}
function Qy(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function $d(e) {
  if (!Gy(e)) return !1;
  const n = e.constructor;
  if (n === void 0) return !0;
  const o = n.prototype;
  return !(
    !Gy(o) ||
    !o.hasOwnProperty('isPrototypeOf') ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function Gy(e) {
  return Object.prototype.toString.call(e) === '[object Object]';
}
function bM(e) {
  return new Promise(n => {
    Md.setTimeout(n, e);
  });
}
function RM(e, n, o) {
  return typeof o.structuralSharing == 'function'
    ? o.structuralSharing(e, n)
    : o.structuralSharing !== !1
      ? rS(e, n)
      : n;
}
function xM(e, n, o = 0) {
  const i = [...e, n];
  return o && i.length > o ? i.slice(1) : i;
}
function TM(e, n, o = 0) {
  const i = [n, ...e];
  return o && i.length > o ? i.slice(0, -1) : i;
}
var zp = Symbol();
function oS(e, n) {
  return !e.queryFn && n != null && n.initialPromise
    ? () => n.initialPromise
    : !e.queryFn || e.queryFn === zp
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
function FA(e, n) {
  return typeof e == 'function' ? e(...n) : !!e;
}
function kM(e, n, o) {
  let i = !1,
    a;
  return (
    Object.defineProperty(e, 'signal', {
      enumerable: !0,
      get: () => (
        a ?? (a = n()),
        i ||
          ((i = !0),
          a.aborted ? o() : a.addEventListener('abort', o, { once: !0 })),
        a
      )
    }),
    e
  );
}
var iS = (() => {
  let e = () => gM;
  return {
    isServer() {
      return e();
    },
    setIsServer(n) {
      e = n;
    }
  };
})();
function PM() {
  let e, n;
  const o = new Promise((a, l) => {
    ((e = a), (n = l));
  });
  ((o.status = 'pending'), o.catch(() => {}));
  function i(a) {
    (Object.assign(o, a), delete o.resolve, delete o.reject);
  }
  return (
    (o.resolve = a => {
      (i({ status: 'fulfilled', value: a }), e(a));
    }),
    (o.reject = a => {
      (i({ status: 'rejected', reason: a }), n(a));
    }),
    o
  );
}
var NM = yM;
function LM() {
  let e = [],
    n = 0,
    o = f => {
      f();
    },
    i = f => {
      f();
    },
    a = NM;
  const l = f => {
      n
        ? e.push(f)
        : a(() => {
            o(f);
          });
    },
    c = () => {
      const f = e;
      ((e = []),
        f.length &&
          a(() => {
            i(() => {
              f.forEach(p => {
                o(p);
              });
            });
          }));
    };
  return {
    batch: f => {
      let p;
      n++;
      try {
        p = f();
      } finally {
        (n--, n || c());
      }
      return p;
    },
    batchCalls:
      f =>
      (...p) => {
        l(() => {
          f(...p);
        });
      },
    schedule: l,
    setNotifyFunction: f => {
      o = f;
    },
    setBatchNotifyFunction: f => {
      i = f;
    },
    setScheduler: f => {
      a = f;
    }
  };
}
var Ot = LM(),
  gi,
  Dr,
  wi,
  tg,
  MM =
    ((tg = class extends Vu {
      constructor() {
        super();
        Fe(this, gi, !0);
        Fe(this, Dr);
        Fe(this, wi);
        Le(this, wi, n => {
          if (typeof window < 'u' && window.addEventListener) {
            const o = () => n(!0),
              i = () => n(!1);
            return (
              window.addEventListener('online', o, !1),
              window.addEventListener('offline', i, !1),
              () => {
                (window.removeEventListener('online', o),
                  window.removeEventListener('offline', i));
              }
            );
          }
        });
      }
      onSubscribe() {
        Y(this, Dr) || this.setEventListener(Y(this, wi));
      }
      onUnsubscribe() {
        var n;
        this.hasListeners() ||
          ((n = Y(this, Dr)) == null || n.call(this), Le(this, Dr, void 0));
      }
      setEventListener(n) {
        var o;
        (Le(this, wi, n),
          (o = Y(this, Dr)) == null || o.call(this),
          Le(this, Dr, n(this.setOnline.bind(this))));
      }
      setOnline(n) {
        Y(this, gi) !== n &&
          (Le(this, gi, n),
          this.listeners.forEach(i => {
            i(n);
          }));
      }
      isOnline() {
        return Y(this, gi);
      }
    }),
    (gi = new WeakMap()),
    (Dr = new WeakMap()),
    (wi = new WeakMap()),
    tg),
  Jl = new MM();
function AM(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function sS(e) {
  return (e ?? 'online') === 'online' ? Jl.isOnline() : !0;
}
var Od = class extends Error {
  constructor(e) {
    (super('CancelledError'),
      (this.revert = e == null ? void 0 : e.revert),
      (this.silent = e == null ? void 0 : e.silent));
  }
};
function aS(e) {
  let n = !1,
    o = 0,
    i;
  const a = PM(),
    l = () => a.status !== 'pending',
    c = _ => {
      var b;
      if (!l()) {
        const N = new Od(_);
        (C(N), (b = e.onCancel) == null || b.call(e, N));
      }
    },
    f = () => {
      n = !0;
    },
    p = () => {
      n = !1;
    },
    m = () =>
      nS.isFocused() &&
      (e.networkMode === 'always' || Jl.isOnline()) &&
      e.canRun(),
    v = () => sS(e.networkMode) && e.canRun(),
    y = _ => {
      l() || (i == null || i(), a.resolve(_));
    },
    C = _ => {
      l() || (i == null || i(), a.reject(_));
    },
    S = () =>
      new Promise(_ => {
        var b;
        ((i = N => {
          (l() || m()) && _(N);
        }),
          (b = e.onPause) == null || b.call(e));
      }).then(() => {
        var _;
        ((i = void 0), l() || (_ = e.onContinue) == null || _.call(e));
      }),
    E = () => {
      if (l()) return;
      let _;
      const b = o === 0 ? e.initialPromise : void 0;
      try {
        _ = b ?? e.fn();
      } catch (N) {
        _ = Promise.reject(N);
      }
      Promise.resolve(_)
        .then(y)
        .catch(N => {
          var W;
          if (l()) return;
          const R = e.retry ?? (iS.isServer() ? 0 : 3),
            T = e.retryDelay ?? AM,
            k = typeof T == 'function' ? T(o, N) : T,
            $ =
              R === !0 ||
              (typeof R == 'number' && o < R) ||
              (typeof R == 'function' && R(o, N));
          if (n || !$) {
            C(N);
            return;
          }
          (o++,
            (W = e.onFail) == null || W.call(e, o, N),
            bM(k)
              .then(() => (m() ? void 0 : S()))
              .then(() => {
                n ? C(N) : E();
              }));
        });
    };
  return {
    promise: a,
    status: () => a.status,
    cancel: c,
    continue: () => (i == null || i(), a),
    cancelRetry: f,
    continueRetry: p,
    canStart: v,
    start: () => (v() ? E() : S().then(E), a)
  };
}
var vo,
  ng,
  lS =
    ((ng = class {
      constructor() {
        Fe(this, vo);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        (this.clearGcTimeout(),
          SM(this.gcTime) &&
            Le(
              this,
              vo,
              Md.setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)
            ));
      }
      updateGcTime(e) {
        this.gcTime = Math.max(
          this.gcTime || 0,
          e ?? (iS.isServer() ? 1 / 0 : 300 * 1e3)
        );
      }
      clearGcTimeout() {
        Y(this, vo) && (Md.clearTimeout(Y(this, vo)), Le(this, vo, void 0));
      }
    }),
    (vo = new WeakMap()),
    ng),
  yo,
  Si,
  ln,
  go,
  St,
  Hs,
  wo,
  qt,
  uS,
  ir,
  rg,
  $M =
    ((rg = class extends lS {
      constructor(n) {
        super();
        Fe(this, qt);
        Fe(this, yo);
        Fe(this, Si);
        Fe(this, ln);
        Fe(this, go);
        Fe(this, St);
        Fe(this, Hs);
        Fe(this, wo);
        (Le(this, wo, !1),
          Le(this, Hs, n.defaultOptions),
          this.setOptions(n.options),
          (this.observers = []),
          Le(this, go, n.client),
          Le(this, ln, Y(this, go).getQueryCache()),
          (this.queryKey = n.queryKey),
          (this.queryHash = n.queryHash),
          Le(this, yo, Xy(this.options)),
          (this.state = n.state ?? Y(this, yo)),
          this.scheduleGc());
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        var n;
        return (n = Y(this, St)) == null ? void 0 : n.promise;
      }
      setOptions(n) {
        if (
          ((this.options = { ...Y(this, Hs), ...n }),
          this.updateGcTime(this.options.gcTime),
          this.state && this.state.data === void 0)
        ) {
          const o = Xy(this.options);
          o.data !== void 0 &&
            (this.setState(Yy(o.data, o.dataUpdatedAt)), Le(this, yo, o));
        }
      }
      optionalRemove() {
        !this.observers.length &&
          this.state.fetchStatus === 'idle' &&
          Y(this, ln).remove(this);
      }
      setData(n, o) {
        const i = RM(this.state.data, n, this.options);
        return (
          Rt(this, qt, ir).call(this, {
            data: i,
            type: 'success',
            dataUpdatedAt: o == null ? void 0 : o.updatedAt,
            manual: o == null ? void 0 : o.manual
          }),
          i
        );
      }
      setState(n, o) {
        Rt(this, qt, ir).call(this, {
          type: 'setState',
          state: n,
          setStateOptions: o
        });
      }
      cancel(n) {
        var i, a;
        const o = (i = Y(this, St)) == null ? void 0 : i.promise;
        return (
          (a = Y(this, St)) == null || a.cancel(n),
          o ? o.then(En).catch(En) : Promise.resolve()
        );
      }
      destroy() {
        (super.destroy(), this.cancel({ silent: !0 }));
      }
      get resetState() {
        return Y(this, yo);
      }
      reset() {
        (this.destroy(), this.setState(this.resetState));
      }
      isActive() {
        return this.observers.some(n => _M(n.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === zp || !this.isFetched();
      }
      isFetched() {
        return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
      }
      isStatic() {
        return this.getObserversCount() > 0
          ? this.observers.some(n => Ad(n.options.staleTime, this) === 'static')
          : !1;
      }
      isStale() {
        return this.getObserversCount() > 0
          ? this.observers.some(n => n.getCurrentResult().isStale)
          : this.state.data === void 0 || this.state.isInvalidated;
      }
      isStaleByTime(n = 0) {
        return this.state.data === void 0
          ? !0
          : n === 'static'
            ? !1
            : this.state.isInvalidated
              ? !0
              : !CM(this.state.dataUpdatedAt, n);
      }
      onFocus() {
        var o;
        const n = this.observers.find(i => i.shouldFetchOnWindowFocus());
        (n == null || n.refetch({ cancelRefetch: !1 }),
          (o = Y(this, St)) == null || o.continue());
      }
      onOnline() {
        var o;
        const n = this.observers.find(i => i.shouldFetchOnReconnect());
        (n == null || n.refetch({ cancelRefetch: !1 }),
          (o = Y(this, St)) == null || o.continue());
      }
      addObserver(n) {
        this.observers.includes(n) ||
          (this.observers.push(n),
          this.clearGcTimeout(),
          Y(this, ln).notify({
            type: 'observerAdded',
            query: this,
            observer: n
          }));
      }
      removeObserver(n) {
        this.observers.includes(n) &&
          ((this.observers = this.observers.filter(o => o !== n)),
          this.observers.length ||
            (Y(this, St) &&
              (Y(this, wo) || Rt(this, qt, uS).call(this)
                ? Y(this, St).cancel({ revert: !0 })
                : Y(this, St).cancelRetry()),
            this.scheduleGc()),
          Y(this, ln).notify({
            type: 'observerRemoved',
            query: this,
            observer: n
          }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated ||
          Rt(this, qt, ir).call(this, { type: 'invalidate' });
      }
      async fetch(n, o) {
        var p, m, v, y, C, S, E, _, b, N, R, T;
        if (
          this.state.fetchStatus !== 'idle' &&
          ((p = Y(this, St)) == null ? void 0 : p.status()) !== 'rejected'
        ) {
          if (this.state.data !== void 0 && o != null && o.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (Y(this, St))
            return (Y(this, St).continueRetry(), Y(this, St).promise);
        }
        if ((n && this.setOptions(n), !this.options.queryFn)) {
          const k = this.observers.find($ => $.options.queryFn);
          k && this.setOptions(k.options);
        }
        const i = new AbortController(),
          a = k => {
            Object.defineProperty(k, 'signal', {
              enumerable: !0,
              get: () => (Le(this, wo, !0), i.signal)
            });
          },
          l = () => {
            const k = oS(this.options, o),
              W = (() => {
                const H = {
                  client: Y(this, go),
                  queryKey: this.queryKey,
                  meta: this.meta
                };
                return (a(H), H);
              })();
            return (
              Le(this, wo, !1),
              this.options.persister ? this.options.persister(k, W, this) : k(W)
            );
          },
          f = (() => {
            const k = {
              fetchOptions: o,
              options: this.options,
              queryKey: this.queryKey,
              client: Y(this, go),
              state: this.state,
              fetchFn: l
            };
            return (a(k), k);
          })();
        ((m = this.options.behavior) == null || m.onFetch(f, this),
          Le(this, Si, this.state),
          (this.state.fetchStatus === 'idle' ||
            this.state.fetchMeta !==
              ((v = f.fetchOptions) == null ? void 0 : v.meta)) &&
            Rt(this, qt, ir).call(this, {
              type: 'fetch',
              meta: (y = f.fetchOptions) == null ? void 0 : y.meta
            }),
          Le(
            this,
            St,
            aS({
              initialPromise: o == null ? void 0 : o.initialPromise,
              fn: f.fetchFn,
              onCancel: k => {
                (k instanceof Od &&
                  k.revert &&
                  this.setState({ ...Y(this, Si), fetchStatus: 'idle' }),
                  i.abort());
              },
              onFail: (k, $) => {
                Rt(this, qt, ir).call(this, {
                  type: 'failed',
                  failureCount: k,
                  error: $
                });
              },
              onPause: () => {
                Rt(this, qt, ir).call(this, { type: 'pause' });
              },
              onContinue: () => {
                Rt(this, qt, ir).call(this, { type: 'continue' });
              },
              retry: f.options.retry,
              retryDelay: f.options.retryDelay,
              networkMode: f.options.networkMode,
              canRun: () => !0
            })
          ));
        try {
          const k = await Y(this, St).start();
          if (k === void 0)
            throw new Error(`${this.queryHash} data is undefined`);
          return (
            this.setData(k),
            (S = (C = Y(this, ln).config).onSuccess) == null ||
              S.call(C, k, this),
            (_ = (E = Y(this, ln).config).onSettled) == null ||
              _.call(E, k, this.state.error, this),
            k
          );
        } catch (k) {
          if (k instanceof Od) {
            if (k.silent) return Y(this, St).promise;
            if (k.revert) {
              if (this.state.data === void 0) throw k;
              return this.state.data;
            }
          }
          throw (
            Rt(this, qt, ir).call(this, { type: 'error', error: k }),
            (N = (b = Y(this, ln).config).onError) == null ||
              N.call(b, k, this),
            (T = (R = Y(this, ln).config).onSettled) == null ||
              T.call(R, this.state.data, k, this),
            k
          );
        } finally {
          this.scheduleGc();
        }
      }
    }),
    (yo = new WeakMap()),
    (Si = new WeakMap()),
    (ln = new WeakMap()),
    (go = new WeakMap()),
    (St = new WeakMap()),
    (Hs = new WeakMap()),
    (wo = new WeakMap()),
    (qt = new WeakSet()),
    (uS = function () {
      return (
        this.state.fetchStatus === 'paused' && this.state.status === 'pending'
      );
    }),
    (ir = function (n) {
      const o = i => {
        switch (n.type) {
          case 'failed':
            return {
              ...i,
              fetchFailureCount: n.failureCount,
              fetchFailureReason: n.error
            };
          case 'pause':
            return { ...i, fetchStatus: 'paused' };
          case 'continue':
            return { ...i, fetchStatus: 'fetching' };
          case 'fetch':
            return {
              ...i,
              ...OM(i.data, this.options),
              fetchMeta: n.meta ?? null
            };
          case 'success':
            const a = {
              ...i,
              ...Yy(n.data, n.dataUpdatedAt),
              dataUpdateCount: i.dataUpdateCount + 1,
              ...(!n.manual && {
                fetchStatus: 'idle',
                fetchFailureCount: 0,
                fetchFailureReason: null
              })
            };
            return (Le(this, Si, n.manual ? a : void 0), a);
          case 'error':
            const l = n.error;
            return {
              ...i,
              error: l,
              errorUpdateCount: i.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: i.fetchFailureCount + 1,
              fetchFailureReason: l,
              fetchStatus: 'idle',
              status: 'error',
              isInvalidated: !0
            };
          case 'invalidate':
            return { ...i, isInvalidated: !0 };
          case 'setState':
            return { ...i, ...n.state };
        }
      };
      ((this.state = o(this.state)),
        Ot.batch(() => {
          (this.observers.forEach(i => {
            i.onQueryUpdate();
          }),
            Y(this, ln).notify({ query: this, type: 'updated', action: n }));
        }));
    }),
    rg);
function OM(e, n) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: sS(n.networkMode) ? 'fetching' : 'paused',
    ...(e === void 0 && { error: null, status: 'pending' })
  };
}
function Yy(e, n) {
  return {
    data: e,
    dataUpdatedAt: n ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: 'success'
  };
}
function Xy(e) {
  const n =
      typeof e.initialData == 'function' ? e.initialData() : e.initialData,
    o = n !== void 0,
    i = o
      ? typeof e.initialDataUpdatedAt == 'function'
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: n,
    dataUpdateCount: 0,
    dataUpdatedAt: o ? (i ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: o ? 'success' : 'pending',
    fetchStatus: 'idle'
  };
}
function qy(e) {
  return {
    onFetch: (n, o) => {
      var v, y, C, S, E;
      const i = n.options,
        a =
          (C =
            (y = (v = n.fetchOptions) == null ? void 0 : v.meta) == null
              ? void 0
              : y.fetchMore) == null
            ? void 0
            : C.direction,
        l = ((S = n.state.data) == null ? void 0 : S.pages) || [],
        c = ((E = n.state.data) == null ? void 0 : E.pageParams) || [];
      let f = { pages: [], pageParams: [] },
        p = 0;
      const m = async () => {
        let _ = !1;
        const b = T => {
            kM(
              T,
              () => n.signal,
              () => (_ = !0)
            );
          },
          N = oS(n.options, n.fetchOptions),
          R = async (T, k, $) => {
            if (_) return Promise.reject();
            if (k == null && T.pages.length) return Promise.resolve(T);
            const H = (() => {
                const ce = {
                  client: n.client,
                  queryKey: n.queryKey,
                  pageParam: k,
                  direction: $ ? 'backward' : 'forward',
                  meta: n.options.meta
                };
                return (b(ce), ce);
              })(),
              F = await N(H),
              { maxPages: G } = n.options,
              q = $ ? TM : xM;
            return {
              pages: q(T.pages, F, G),
              pageParams: q(T.pageParams, k, G)
            };
          };
        if (a && l.length) {
          const T = a === 'backward',
            k = T ? IM : Zy,
            $ = { pages: l, pageParams: c },
            W = k(i, $);
          f = await R($, W, T);
        } else {
          const T = e ?? l.length;
          do {
            const k = p === 0 ? (c[0] ?? i.initialPageParam) : Zy(i, f);
            if (p > 0 && k == null) break;
            ((f = await R(f, k)), p++);
          } while (p < T);
        }
        return f;
      };
      n.options.persister
        ? (n.fetchFn = () => {
            var _, b;
            return (b = (_ = n.options).persister) == null
              ? void 0
              : b.call(
                  _,
                  m,
                  {
                    client: n.client,
                    queryKey: n.queryKey,
                    meta: n.options.meta,
                    signal: n.signal
                  },
                  o
                );
          })
        : (n.fetchFn = m);
    }
  };
}
function Zy(e, { pages: n, pageParams: o }) {
  const i = n.length - 1;
  return n.length > 0 ? e.getNextPageParam(n[i], n, o[i], o) : void 0;
}
function IM(e, { pages: n, pageParams: o }) {
  var i;
  return n.length > 0
    ? (i = e.getPreviousPageParam) == null
      ? void 0
      : i.call(e, n[0], n, o[0], o)
    : void 0;
}
var Ks,
  jn,
  Lt,
  So,
  Vn,
  Ar,
  og,
  DM =
    ((og = class extends lS {
      constructor(n) {
        super();
        Fe(this, Vn);
        Fe(this, Ks);
        Fe(this, jn);
        Fe(this, Lt);
        Fe(this, So);
        (Le(this, Ks, n.client),
          (this.mutationId = n.mutationId),
          Le(this, Lt, n.mutationCache),
          Le(this, jn, []),
          (this.state = n.state || FM()),
          this.setOptions(n.options),
          this.scheduleGc());
      }
      setOptions(n) {
        ((this.options = n), this.updateGcTime(this.options.gcTime));
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(n) {
        Y(this, jn).includes(n) ||
          (Y(this, jn).push(n),
          this.clearGcTimeout(),
          Y(this, Lt).notify({
            type: 'observerAdded',
            mutation: this,
            observer: n
          }));
      }
      removeObserver(n) {
        (Le(
          this,
          jn,
          Y(this, jn).filter(o => o !== n)
        ),
          this.scheduleGc(),
          Y(this, Lt).notify({
            type: 'observerRemoved',
            mutation: this,
            observer: n
          }));
      }
      optionalRemove() {
        Y(this, jn).length ||
          (this.state.status === 'pending'
            ? this.scheduleGc()
            : Y(this, Lt).remove(this));
      }
      continue() {
        var n;
        return (
          ((n = Y(this, So)) == null ? void 0 : n.continue()) ??
          this.execute(this.state.variables)
        );
      }
      async execute(n) {
        var c, f, p, m, v, y, C, S, E, _, b, N, R, T, k, $, W, H;
        const o = () => {
            Rt(this, Vn, Ar).call(this, { type: 'continue' });
          },
          i = {
            client: Y(this, Ks),
            meta: this.options.meta,
            mutationKey: this.options.mutationKey
          };
        Le(
          this,
          So,
          aS({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(n, i)
                : Promise.reject(new Error('No mutationFn found')),
            onFail: (F, G) => {
              Rt(this, Vn, Ar).call(this, {
                type: 'failed',
                failureCount: F,
                error: G
              });
            },
            onPause: () => {
              Rt(this, Vn, Ar).call(this, { type: 'pause' });
            },
            onContinue: o,
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => Y(this, Lt).canRun(this)
          })
        );
        const a = this.state.status === 'pending',
          l = !Y(this, So).canStart();
        try {
          if (a) o();
          else {
            (Rt(this, Vn, Ar).call(this, {
              type: 'pending',
              variables: n,
              isPaused: l
            }),
              Y(this, Lt).config.onMutate &&
                (await Y(this, Lt).config.onMutate(n, this, i)));
            const G = await ((f = (c = this.options).onMutate) == null
              ? void 0
              : f.call(c, n, i));
            G !== this.state.context &&
              Rt(this, Vn, Ar).call(this, {
                type: 'pending',
                context: G,
                variables: n,
                isPaused: l
              });
          }
          const F = await Y(this, So).start();
          return (
            await ((m = (p = Y(this, Lt).config).onSuccess) == null
              ? void 0
              : m.call(p, F, n, this.state.context, this, i)),
            await ((y = (v = this.options).onSuccess) == null
              ? void 0
              : y.call(v, F, n, this.state.context, i)),
            await ((S = (C = Y(this, Lt).config).onSettled) == null
              ? void 0
              : S.call(
                  C,
                  F,
                  null,
                  this.state.variables,
                  this.state.context,
                  this,
                  i
                )),
            await ((_ = (E = this.options).onSettled) == null
              ? void 0
              : _.call(E, F, null, n, this.state.context, i)),
            Rt(this, Vn, Ar).call(this, { type: 'success', data: F }),
            F
          );
        } catch (F) {
          try {
            await ((N = (b = Y(this, Lt).config).onError) == null
              ? void 0
              : N.call(b, F, n, this.state.context, this, i));
          } catch (G) {
            Promise.reject(G);
          }
          try {
            await ((T = (R = this.options).onError) == null
              ? void 0
              : T.call(R, F, n, this.state.context, i));
          } catch (G) {
            Promise.reject(G);
          }
          try {
            await (($ = (k = Y(this, Lt).config).onSettled) == null
              ? void 0
              : $.call(
                  k,
                  void 0,
                  F,
                  this.state.variables,
                  this.state.context,
                  this,
                  i
                ));
          } catch (G) {
            Promise.reject(G);
          }
          try {
            await ((H = (W = this.options).onSettled) == null
              ? void 0
              : H.call(W, void 0, F, n, this.state.context, i));
          } catch (G) {
            Promise.reject(G);
          }
          throw (Rt(this, Vn, Ar).call(this, { type: 'error', error: F }), F);
        } finally {
          Y(this, Lt).runNext(this);
        }
      }
    }),
    (Ks = new WeakMap()),
    (jn = new WeakMap()),
    (Lt = new WeakMap()),
    (So = new WeakMap()),
    (Vn = new WeakSet()),
    (Ar = function (n) {
      const o = i => {
        switch (n.type) {
          case 'failed':
            return {
              ...i,
              failureCount: n.failureCount,
              failureReason: n.error
            };
          case 'pause':
            return { ...i, isPaused: !0 };
          case 'continue':
            return { ...i, isPaused: !1 };
          case 'pending':
            return {
              ...i,
              context: n.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: n.isPaused,
              status: 'pending',
              variables: n.variables,
              submittedAt: Date.now()
            };
          case 'success':
            return {
              ...i,
              data: n.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: 'success',
              isPaused: !1
            };
          case 'error':
            return {
              ...i,
              data: void 0,
              error: n.error,
              failureCount: i.failureCount + 1,
              failureReason: n.error,
              isPaused: !1,
              status: 'error'
            };
        }
      };
      ((this.state = o(this.state)),
        Ot.batch(() => {
          (Y(this, jn).forEach(i => {
            i.onMutationUpdate(n);
          }),
            Y(this, Lt).notify({ mutation: this, type: 'updated', action: n }));
        }));
    }),
    og);
function FM() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: 'idle',
    variables: void 0,
    submittedAt: 0
  };
}
var sr,
  bn,
  Qs,
  ig,
  zM =
    ((ig = class extends Vu {
      constructor(n = {}) {
        super();
        Fe(this, sr);
        Fe(this, bn);
        Fe(this, Qs);
        ((this.config = n),
          Le(this, sr, new Set()),
          Le(this, bn, new Map()),
          Le(this, Qs, 0));
      }
      build(n, o, i) {
        const a = new DM({
          client: n,
          mutationCache: this,
          mutationId: ++gl(this, Qs)._,
          options: n.defaultMutationOptions(o),
          state: i
        });
        return (this.add(a), a);
      }
      add(n) {
        Y(this, sr).add(n);
        const o = $l(n);
        if (typeof o == 'string') {
          const i = Y(this, bn).get(o);
          i ? i.push(n) : Y(this, bn).set(o, [n]);
        }
        this.notify({ type: 'added', mutation: n });
      }
      remove(n) {
        if (Y(this, sr).delete(n)) {
          const o = $l(n);
          if (typeof o == 'string') {
            const i = Y(this, bn).get(o);
            if (i)
              if (i.length > 1) {
                const a = i.indexOf(n);
                a !== -1 && i.splice(a, 1);
              } else i[0] === n && Y(this, bn).delete(o);
          }
        }
        this.notify({ type: 'removed', mutation: n });
      }
      canRun(n) {
        const o = $l(n);
        if (typeof o == 'string') {
          const i = Y(this, bn).get(o),
            a = i == null ? void 0 : i.find(l => l.state.status === 'pending');
          return !a || a === n;
        } else return !0;
      }
      runNext(n) {
        var i;
        const o = $l(n);
        if (typeof o == 'string') {
          const a =
            (i = Y(this, bn).get(o)) == null
              ? void 0
              : i.find(l => l !== n && l.state.isPaused);
          return (a == null ? void 0 : a.continue()) ?? Promise.resolve();
        } else return Promise.resolve();
      }
      clear() {
        Ot.batch(() => {
          (Y(this, sr).forEach(n => {
            this.notify({ type: 'removed', mutation: n });
          }),
            Y(this, sr).clear(),
            Y(this, bn).clear());
        });
      }
      getAll() {
        return Array.from(Y(this, sr));
      }
      find(n) {
        const o = { exact: !0, ...n };
        return this.getAll().find(i => Ky(o, i));
      }
      findAll(n = {}) {
        return this.getAll().filter(o => Ky(n, o));
      }
      notify(n) {
        Ot.batch(() => {
          this.listeners.forEach(o => {
            o(n);
          });
        });
      }
      resumePausedMutations() {
        const n = this.getAll().filter(o => o.state.isPaused);
        return Ot.batch(() => Promise.all(n.map(o => o.continue().catch(En))));
      }
    }),
    (sr = new WeakMap()),
    (bn = new WeakMap()),
    (Qs = new WeakMap()),
    ig);
function $l(e) {
  var n;
  return (n = e.options.scope) == null ? void 0 : n.id;
}
var Bn,
  sg,
  jM =
    ((sg = class extends Vu {
      constructor(n = {}) {
        super();
        Fe(this, Bn);
        ((this.config = n), Le(this, Bn, new Map()));
      }
      build(n, o, i) {
        const a = o.queryKey,
          l = o.queryHash ?? Fp(a, o);
        let c = this.get(l);
        return (
          c ||
            ((c = new $M({
              client: n,
              queryKey: a,
              queryHash: l,
              options: n.defaultQueryOptions(o),
              state: i,
              defaultOptions: n.getQueryDefaults(a)
            })),
            this.add(c)),
          c
        );
      }
      add(n) {
        Y(this, Bn).has(n.queryHash) ||
          (Y(this, Bn).set(n.queryHash, n),
          this.notify({ type: 'added', query: n }));
      }
      remove(n) {
        const o = Y(this, Bn).get(n.queryHash);
        o &&
          (n.destroy(),
          o === n && Y(this, Bn).delete(n.queryHash),
          this.notify({ type: 'removed', query: n }));
      }
      clear() {
        Ot.batch(() => {
          this.getAll().forEach(n => {
            this.remove(n);
          });
        });
      }
      get(n) {
        return Y(this, Bn).get(n);
      }
      getAll() {
        return [...Y(this, Bn).values()];
      }
      find(n) {
        const o = { exact: !0, ...n };
        return this.getAll().find(i => Hy(o, i));
      }
      findAll(n = {}) {
        const o = this.getAll();
        return Object.keys(n).length > 0 ? o.filter(i => Hy(n, i)) : o;
      }
      notify(n) {
        Ot.batch(() => {
          this.listeners.forEach(o => {
            o(n);
          });
        });
      }
      onFocus() {
        Ot.batch(() => {
          this.getAll().forEach(n => {
            n.onFocus();
          });
        });
      }
      onOnline() {
        Ot.batch(() => {
          this.getAll().forEach(n => {
            n.onOnline();
          });
        });
      }
    }),
    (Bn = new WeakMap()),
    sg),
  st,
  Fr,
  zr,
  Ci,
  _i,
  jr,
  Ei,
  bi,
  ag,
  VM =
    ((ag = class {
      constructor(e = {}) {
        Fe(this, st);
        Fe(this, Fr);
        Fe(this, zr);
        Fe(this, Ci);
        Fe(this, _i);
        Fe(this, jr);
        Fe(this, Ei);
        Fe(this, bi);
        (Le(this, st, e.queryCache || new jM()),
          Le(this, Fr, e.mutationCache || new zM()),
          Le(this, zr, e.defaultOptions || {}),
          Le(this, Ci, new Map()),
          Le(this, _i, new Map()),
          Le(this, jr, 0));
      }
      mount() {
        (gl(this, jr)._++,
          Y(this, jr) === 1 &&
            (Le(
              this,
              Ei,
              nS.subscribe(async e => {
                e &&
                  (await this.resumePausedMutations(), Y(this, st).onFocus());
              })
            ),
            Le(
              this,
              bi,
              Jl.subscribe(async e => {
                e &&
                  (await this.resumePausedMutations(), Y(this, st).onOnline());
              })
            )));
      }
      unmount() {
        var e, n;
        (gl(this, jr)._--,
          Y(this, jr) === 0 &&
            ((e = Y(this, Ei)) == null || e.call(this),
            Le(this, Ei, void 0),
            (n = Y(this, bi)) == null || n.call(this),
            Le(this, bi, void 0)));
      }
      isFetching(e) {
        return Y(this, st).findAll({ ...e, fetchStatus: 'fetching' }).length;
      }
      isMutating(e) {
        return Y(this, Fr).findAll({ ...e, status: 'pending' }).length;
      }
      getQueryData(e) {
        var o;
        const n = this.defaultQueryOptions({ queryKey: e });
        return (o = Y(this, st).get(n.queryHash)) == null
          ? void 0
          : o.state.data;
      }
      ensureQueryData(e) {
        const n = this.defaultQueryOptions(e),
          o = Y(this, st).build(this, n),
          i = o.state.data;
        return i === void 0
          ? this.fetchQuery(e)
          : (e.revalidateIfStale &&
              o.isStaleByTime(Ad(n.staleTime, o)) &&
              this.prefetchQuery(n),
            Promise.resolve(i));
      }
      getQueriesData(e) {
        return Y(this, st)
          .findAll(e)
          .map(({ queryKey: n, state: o }) => {
            const i = o.data;
            return [n, i];
          });
      }
      setQueryData(e, n, o) {
        const i = this.defaultQueryOptions({ queryKey: e }),
          a = Y(this, st).get(i.queryHash),
          l = a == null ? void 0 : a.state.data,
          c = wM(n, l);
        if (c !== void 0)
          return Y(this, st)
            .build(this, i)
            .setData(c, { ...o, manual: !0 });
      }
      setQueriesData(e, n, o) {
        return Ot.batch(() =>
          Y(this, st)
            .findAll(e)
            .map(({ queryKey: i }) => [i, this.setQueryData(i, n, o)])
        );
      }
      getQueryState(e) {
        var o;
        const n = this.defaultQueryOptions({ queryKey: e });
        return (o = Y(this, st).get(n.queryHash)) == null ? void 0 : o.state;
      }
      removeQueries(e) {
        const n = Y(this, st);
        Ot.batch(() => {
          n.findAll(e).forEach(o => {
            n.remove(o);
          });
        });
      }
      resetQueries(e, n) {
        const o = Y(this, st);
        return Ot.batch(
          () => (
            o.findAll(e).forEach(i => {
              i.reset();
            }),
            this.refetchQueries({ type: 'active', ...e }, n)
          )
        );
      }
      cancelQueries(e, n = {}) {
        const o = { revert: !0, ...n },
          i = Ot.batch(() =>
            Y(this, st)
              .findAll(e)
              .map(a => a.cancel(o))
          );
        return Promise.all(i).then(En).catch(En);
      }
      invalidateQueries(e, n = {}) {
        return Ot.batch(
          () => (
            Y(this, st)
              .findAll(e)
              .forEach(o => {
                o.invalidate();
              }),
            (e == null ? void 0 : e.refetchType) === 'none'
              ? Promise.resolve()
              : this.refetchQueries(
                  {
                    ...e,
                    type:
                      (e == null ? void 0 : e.refetchType) ??
                      (e == null ? void 0 : e.type) ??
                      'active'
                  },
                  n
                )
          )
        );
      }
      refetchQueries(e, n = {}) {
        const o = { ...n, cancelRefetch: n.cancelRefetch ?? !0 },
          i = Ot.batch(() =>
            Y(this, st)
              .findAll(e)
              .filter(a => !a.isDisabled() && !a.isStatic())
              .map(a => {
                let l = a.fetch(void 0, o);
                return (
                  o.throwOnError || (l = l.catch(En)),
                  a.state.fetchStatus === 'paused' ? Promise.resolve() : l
                );
              })
          );
        return Promise.all(i).then(En);
      }
      fetchQuery(e) {
        const n = this.defaultQueryOptions(e);
        n.retry === void 0 && (n.retry = !1);
        const o = Y(this, st).build(this, n);
        return o.isStaleByTime(Ad(n.staleTime, o))
          ? o.fetch(n)
          : Promise.resolve(o.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(En).catch(En);
      }
      fetchInfiniteQuery(e) {
        return ((e.behavior = qy(e.pages)), this.fetchQuery(e));
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(En).catch(En);
      }
      ensureInfiniteQueryData(e) {
        return ((e.behavior = qy(e.pages)), this.ensureQueryData(e));
      }
      resumePausedMutations() {
        return Jl.isOnline()
          ? Y(this, Fr).resumePausedMutations()
          : Promise.resolve();
      }
      getQueryCache() {
        return Y(this, st);
      }
      getMutationCache() {
        return Y(this, Fr);
      }
      getDefaultOptions() {
        return Y(this, zr);
      }
      setDefaultOptions(e) {
        Le(this, zr, e);
      }
      setQueryDefaults(e, n) {
        Y(this, Ci).set(Us(e), { queryKey: e, defaultOptions: n });
      }
      getQueryDefaults(e) {
        const n = [...Y(this, Ci).values()],
          o = {};
        return (
          n.forEach(i => {
            Ws(e, i.queryKey) && Object.assign(o, i.defaultOptions);
          }),
          o
        );
      }
      setMutationDefaults(e, n) {
        Y(this, _i).set(Us(e), { mutationKey: e, defaultOptions: n });
      }
      getMutationDefaults(e) {
        const n = [...Y(this, _i).values()],
          o = {};
        return (
          n.forEach(i => {
            Ws(e, i.mutationKey) && Object.assign(o, i.defaultOptions);
          }),
          o
        );
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e;
        const n = {
          ...Y(this, zr).queries,
          ...this.getQueryDefaults(e.queryKey),
          ...e,
          _defaulted: !0
        };
        return (
          n.queryHash || (n.queryHash = Fp(n.queryKey, n)),
          n.refetchOnReconnect === void 0 &&
            (n.refetchOnReconnect = n.networkMode !== 'always'),
          n.throwOnError === void 0 && (n.throwOnError = !!n.suspense),
          !n.networkMode && n.persister && (n.networkMode = 'offlineFirst'),
          n.queryFn === zp && (n.enabled = !1),
          n
        );
      }
      defaultMutationOptions(e) {
        return e != null && e._defaulted
          ? e
          : {
              ...Y(this, zr).mutations,
              ...((e == null ? void 0 : e.mutationKey) &&
                this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0
            };
      }
      clear() {
        (Y(this, st).clear(), Y(this, Fr).clear());
      }
    }),
    (st = new WeakMap()),
    (Fr = new WeakMap()),
    (zr = new WeakMap()),
    (Ci = new WeakMap()),
    (_i = new WeakMap()),
    (jr = new WeakMap()),
    (Ei = new WeakMap()),
    (bi = new WeakMap()),
    ag),
  cS = w.createContext(void 0),
  zA = e => {
    const n = w.useContext(cS);
    if (!n)
      throw new Error('No QueryClient set, use QueryClientProvider to set one');
    return n;
  },
  BM = ({ client: e, children: n }) => (
    w.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e]
    ),
    D.jsx(cS.Provider, { value: e, children: n })
  ),
  UM = function () {
    return null;
  };
const WM = new VM({
  defaultOptions: {
    queries: { refetchOnWindowFocus: !1, retry: 1, staleTime: 300 * 1e3 }
  }
});
dC.createRoot(document.getElementById('root')).render(
  D.jsx(w.StrictMode, {
    children: D.jsx(AL, {
      children: D.jsxs(BM, {
        client: WM,
        children: [
          D.jsx(tM, {}),
          D.jsx(pM, {}),
          D.jsx(UM, { initialIsOpen: !1 })
        ]
      })
    })
  })
);
export {
  iu as $,
  GM as A,
  Be as B,
  yg as C,
  qe as D,
  mT as E,
  cA as F,
  hp as G,
  Dp as H,
  $A as I,
  Pi as J,
  By as K,
  y_ as L,
  Hg as M,
  XM as N,
  YM as O,
  YL as P,
  Nn as Q,
  OA as R,
  wp as S,
  mp as T,
  hu as U,
  gp as V,
  qs as W,
  ko as X,
  mu as Y,
  vu as Z,
  Gs as _,
  Dt as a,
  hA as a$,
  Ds as a0,
  Oi as a1,
  YE as a2,
  zn as a3,
  IA as a4,
  cp as a5,
  $i as a6,
  KM as a7,
  lg as a8,
  aE as a9,
  zA as aA,
  Wd as aB,
  Hn as aC,
  yb as aD,
  Db as aE,
  Vu as aF,
  DA as aG,
  Us as aH,
  FM as aI,
  Ot as aJ,
  En as aK,
  FA as aL,
  sE as aM,
  PM as aN,
  _M as aO,
  Ad as aP,
  iS as aQ,
  SM as aR,
  CM as aS,
  Md as aT,
  nS as aU,
  OM as aV,
  RM as aW,
  iE as aX,
  Ib as aY,
  ZM as aZ,
  Wr as a_,
  pp as aa,
  To as ab,
  gb as ac,
  Po as ad,
  pE as ae,
  T0 as af,
  dp as ag,
  ct as ah,
  jg as ai,
  eA as aj,
  Ag as ak,
  Ii as al,
  tA as am,
  sA as an,
  oA as ao,
  nA as ap,
  aA as aq,
  lA as ar,
  iA as as,
  rA as at,
  Vb as au,
  fp as av,
  xo as aw,
  Mg as ax,
  fd as ay,
  Hd as az,
  Hl as b,
  Ys as b0,
  bE as b1,
  zd as b2,
  Dg as b3,
  cd as b4,
  JM as b5,
  VE as b6,
  Dd as b7,
  cg as b8,
  EE as b9,
  Un as ba,
  C_ as bb,
  qM as c,
  ou as d,
  w as e,
  Ct as f,
  un as g,
  TE as h,
  _E as i,
  D as j,
  pA as k,
  fA as l,
  mA as m,
  uA as n,
  vA as o,
  dA as p,
  ke as q,
  se as r,
  dE as s,
  QM as t,
  Ge as u,
  qw as v,
  $L as w,
  IL as x,
  s_ as y,
  di as z
};
