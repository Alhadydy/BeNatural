document.addEventListener('DOMContentLoaded', function () {
(function () {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload")) return;
  for (const f of document.querySelectorAll('link[rel="modulepreload"]')) r(f);
  new MutationObserver((f) => {
    for (const d of f)
      if (d.type === "childList")
        for (const h of d.addedNodes)
          h.tagName === "LINK" && h.rel === "modulepreload" && r(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function u(f) {
    const d = {};
    return (
      f.integrity && (d.integrity = f.integrity),
      f.referrerPolicy && (d.referrerPolicy = f.referrerPolicy),
      f.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : f.crossOrigin === "anonymous"
        ? (d.credentials = "omit")
        : (d.credentials = "same-origin"),
      d
    );
  }
  function r(f) {
    if (f.ep) return;
    f.ep = !0;
    const d = u(f);
    fetch(f.href, d);
  }
})();
const Ss = [];
let vm = !0;
const bm = console.error;
function Sh(s) {
  Ss.length > 5 || !vm || Ss.push(s);
}
function Sm(s) {
  Ss.push({ type: "runtime", args: s });
}
function Nm(s) {
  s.preventDefault();
}
function w0(s) {
  try {
    const i = s.find((u) => u instanceof Error);
    if (i && i.stack) Sh({ type: "console.error", args: i });
    else if (s.length > 0) {
      const u = s
          .map((f) => (typeof f == "object" ? JSON.stringify(f) : String(f)))
          .join(" "),
        r = new Error(u);
      Sh({ type: "console.error", args: r });
    }
  } catch (i) {
    console.warn(i);
  }
}
window.addEventListener("error", Sm);
window.addEventListener("unhandledrejection", Nm);
console.error = function (...i) {
  w0(i), bm.apply(this, i);
};
function E0() {
  return (
    window.removeEventListener("error", Sm),
    window.removeEventListener("unhandledrejection", Nm),
    (console.error = bm),
    (vm = !1),
    Ss
  );
}
const C0 = 1e3,
  Nh = Symbol("postMessageResponseTimeout");
let ms = 0;
const Ku = "*";
class Cs {
  client;
  baseTimeout;
  waitRes = new Map();
  removeListeners = new Set();
  clear;
  constructor(i, u) {
    (this.client = i), (this.baseTimeout = u?.timeout || C0);
    const r = this.emitResponse.bind(this);
    (this.clear = () => {
      window.removeEventListener("message", r);
    }),
      window.addEventListener("message", r);
  }
  destroy() {
    this.clear(), this.removeListeners.forEach((i) => i());
  }
  isTimeout(i) {
    return i === Nh;
  }
  post(i, u, r) {
    ms++;
    const { timeout: f, origin: d = Ku } = r || {};
    return (
      this.client.postMessage({ data: u, id: ms, type: i }, d),
      new Promise((h) => {
        this.waitRes.set(ms, (x) => {
          h(x);
        }),
          setTimeout(() => {
            this.waitRes.delete(ms), h(Nh);
          }, f || this.baseTimeout);
      })
    );
  }
  on(i, u, r) {
    const { once: f, origin: d = Ku } = r || {},
      h = async (g) => {
        const { id: m, type: y, data: S } = g.data;
        let N;
        y === i &&
          ((N = await u(S)),
          console.log(i, f, N, S),
          ((m && d === g.origin) || d === Ku) &&
            g.source?.postMessage({ fromType: i, id: m, data: N }, g.origin),
          f && x());
      };
    window.addEventListener("message", h);
    const x = () => {
      window.removeEventListener("message", h), this.removeListeners.delete(x);
    };
    return this.removeListeners.add(x), x;
  }
  emitResponse(i) {
    const u = i.data,
      { id: r, data: f } = u,
      d = this.waitRes.get(r);
    d && d(f);
  }
}
function _0(s) {
  if (Object.prototype.hasOwnProperty.call(s, "__esModule")) return s;
  var i = s.default;
  if (typeof i == "function") {
    var u = function r() {
      var f = !1;
      try {
        f = this instanceof r;
      } catch {}
      return f
        ? Reflect.construct(i, arguments, this.constructor)
        : i.apply(this, arguments);
    };
    u.prototype = i.prototype;
  } else u = {};
  return (
    Object.defineProperty(u, "__esModule", { value: !0 }),
    Object.keys(s).forEach(function (r) {
      var f = Object.getOwnPropertyDescriptor(s, r);
      Object.defineProperty(
        u,
        r,
        f.get
          ? f
          : {
              enumerable: !0,
              get: function () {
                return s[r];
              },
            }
      );
    }),
    u
  );
}
var Ul = {},
  $u = {},
  Ju = {},
  Fu = {},
  jh;
function A0() {
  if (jh) return Fu;
  jh = 1;
  const s =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
      ""
    );
  return (
    (Fu.encode = function (i) {
      if (0 <= i && i < s.length) return s[i];
      throw new TypeError("Must be between 0 and 63: " + i);
    }),
    Fu
  );
}
var wh;
function jm() {
  if (wh) return Ju;
  wh = 1;
  const s = A0(),
    i = 5,
    u = 1 << i,
    r = u - 1,
    f = u;
  function d(h) {
    return h < 0 ? (-h << 1) + 1 : (h << 1) + 0;
  }
  return (
    (Ju.encode = function (x) {
      let g = "",
        m,
        y = d(x);
      do (m = y & r), (y >>>= i), y > 0 && (m |= f), (g += s.encode(m));
      while (y > 0);
      return g;
    }),
    Ju
  );
}
var Ot = {};
const O0 = {},
  T0 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: O0 },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  R0 = _0(T0);
var Pu, Eh;
function M0() {
  return Eh || ((Eh = 1), (Pu = typeof URL == "function" ? URL : R0.URL)), Pu;
}
var Ch;
function _s() {
  if (Ch) return Ot;
  Ch = 1;
  const s = M0();
  function i(V, Z, F) {
    if (Z in V) return V[Z];
    if (arguments.length === 3) return F;
    throw new Error('"' + Z + '" is a required argument.');
  }
  Ot.getArg = i;
  const u = (function () {
    return !("__proto__" in Object.create(null));
  })();
  function r(V) {
    return V;
  }
  function f(V) {
    return h(V) ? "$" + V : V;
  }
  Ot.toSetString = u ? r : f;
  function d(V) {
    return h(V) ? V.slice(1) : V;
  }
  Ot.fromSetString = u ? r : d;
  function h(V) {
    if (!V) return !1;
    const Z = V.length;
    if (
      Z < 9 ||
      V.charCodeAt(Z - 1) !== 95 ||
      V.charCodeAt(Z - 2) !== 95 ||
      V.charCodeAt(Z - 3) !== 111 ||
      V.charCodeAt(Z - 4) !== 116 ||
      V.charCodeAt(Z - 5) !== 111 ||
      V.charCodeAt(Z - 6) !== 114 ||
      V.charCodeAt(Z - 7) !== 112 ||
      V.charCodeAt(Z - 8) !== 95 ||
      V.charCodeAt(Z - 9) !== 95
    )
      return !1;
    for (let F = Z - 10; F >= 0; F--) if (V.charCodeAt(F) !== 36) return !1;
    return !0;
  }
  function x(V, Z) {
    return V === Z ? 0 : V === null ? 1 : Z === null ? -1 : V > Z ? 1 : -1;
  }
  function g(V, Z) {
    let F = V.generatedLine - Z.generatedLine;
    return F !== 0 ||
      ((F = V.generatedColumn - Z.generatedColumn), F !== 0) ||
      ((F = x(V.source, Z.source)), F !== 0) ||
      ((F = V.originalLine - Z.originalLine), F !== 0) ||
      ((F = V.originalColumn - Z.originalColumn), F !== 0)
      ? F
      : x(V.name, Z.name);
  }
  Ot.compareByGeneratedPositionsInflated = g;
  function m(V) {
    return JSON.parse(V.replace(/^\)]}'[^\n]*\n/, ""));
  }
  Ot.parseSourceMapInput = m;
  const y = "http:",
    S = `${y}//host`;
  function N(V) {
    return (Z) => {
      const F = D(Z),
        le = T(Z),
        me = new s(Z, le);
      V(me);
      const ge = me.toString();
      return F === "absolute"
        ? ge
        : F === "scheme-relative"
        ? ge.slice(y.length)
        : F === "path-absolute"
        ? ge.slice(S.length)
        : U(le, ge);
    };
  }
  function b(V, Z) {
    return new s(V, Z).toString();
  }
  function w(V, Z) {
    let F = 0;
    do {
      const le = V + F++;
      if (Z.indexOf(le) === -1) return le;
    } while (!0);
  }
  function T(V) {
    const Z = V.split("..").length - 1,
      F = w("p", V);
    let le = `${S}/`;
    for (let me = 0; me < Z; me++) le += `${F}/`;
    return le;
  }
  const C = /^[A-Za-z0-9\+\-\.]+:/;
  function D(V) {
    return V[0] === "/"
      ? V[1] === "/"
        ? "scheme-relative"
        : "path-absolute"
      : C.test(V)
      ? "absolute"
      : "path-relative";
  }
  function U(V, Z) {
    typeof V == "string" && (V = new s(V)),
      typeof Z == "string" && (Z = new s(Z));
    const F = Z.pathname.split("/"),
      le = V.pathname.split("/");
    for (
      le.length > 0 && !le[le.length - 1] && le.pop();
      F.length > 0 && le.length > 0 && F[0] === le[0];

    )
      F.shift(), le.shift();
    return (
      le
        .map(() => "..")
        .concat(F)
        .join("/") +
      Z.search +
      Z.hash
    );
  }
  const Q = N((V) => {
      V.pathname = V.pathname.replace(/\/?$/, "/");
    }),
    P = N((V) => {
      V.href = new s(".", V.toString()).toString();
    }),
    G = N((V) => {});
  Ot.normalize = G;
  function I(V, Z) {
    const F = D(Z),
      le = D(V);
    if (((V = Q(V)), F === "absolute")) return b(Z, void 0);
    if (le === "absolute") return b(Z, V);
    if (F === "scheme-relative") return G(Z);
    if (le === "scheme-relative") return b(Z, b(V, S)).slice(y.length);
    if (F === "path-absolute") return G(Z);
    if (le === "path-absolute") return b(Z, b(V, S)).slice(S.length);
    const me = T(Z + V),
      ge = b(Z, b(V, me));
    return U(me, ge);
  }
  Ot.join = I;
  function oe(V, Z) {
    const F = Se(V, Z);
    return typeof F == "string" ? F : G(Z);
  }
  Ot.relative = oe;
  function Se(V, Z) {
    if (D(V) !== D(Z)) return null;
    const le = T(V + Z),
      me = new s(V, le),
      ge = new s(Z, le);
    try {
      new s("", ge.toString());
    } catch {
      return null;
    }
    return ge.protocol !== me.protocol ||
      ge.user !== me.user ||
      ge.password !== me.password ||
      ge.hostname !== me.hostname ||
      ge.port !== me.port
      ? null
      : U(me, ge);
  }
  function xe(V, Z, F) {
    V && D(Z) === "path-absolute" && (Z = Z.replace(/^\//, ""));
    let le = G(Z || "");
    return V && (le = I(V, le)), F && (le = I(P(F), le)), le;
  }
  return (Ot.computeSourceURL = xe), Ot;
}
var Wu = {},
  _h;
function wm() {
  if (_h) return Wu;
  _h = 1;
  class s {
    constructor() {
      (this._array = []), (this._set = new Map());
    }
    static fromArray(u, r) {
      const f = new s();
      for (let d = 0, h = u.length; d < h; d++) f.add(u[d], r);
      return f;
    }
    size() {
      return this._set.size;
    }
    add(u, r) {
      const f = this.has(u),
        d = this._array.length;
      (!f || r) && this._array.push(u), f || this._set.set(u, d);
    }
    has(u) {
      return this._set.has(u);
    }
    indexOf(u) {
      const r = this._set.get(u);
      if (r >= 0) return r;
      throw new Error('"' + u + '" is not in the set.');
    }
    at(u) {
      if (u >= 0 && u < this._array.length) return this._array[u];
      throw new Error("No element indexed by " + u);
    }
    toArray() {
      return this._array.slice();
    }
  }
  return (Wu.ArraySet = s), Wu;
}
var Iu = {},
  Ah;
function L0() {
  if (Ah) return Iu;
  Ah = 1;
  const s = _s();
  function i(r, f) {
    const d = r.generatedLine,
      h = f.generatedLine,
      x = r.generatedColumn,
      g = f.generatedColumn;
    return (
      h > d ||
      (h == d && g >= x) ||
      s.compareByGeneratedPositionsInflated(r, f) <= 0
    );
  }
  class u {
    constructor() {
      (this._array = []),
        (this._sorted = !0),
        (this._last = { generatedLine: -1, generatedColumn: 0 });
    }
    unsortedForEach(f, d) {
      this._array.forEach(f, d);
    }
    add(f) {
      i(this._last, f)
        ? ((this._last = f), this._array.push(f))
        : ((this._sorted = !1), this._array.push(f));
    }
    toArray() {
      return (
        this._sorted ||
          (this._array.sort(s.compareByGeneratedPositionsInflated),
          (this._sorted = !0)),
        this._array
      );
    }
  }
  return (Iu.MappingList = u), Iu;
}
var Oh;
function Em() {
  if (Oh) return $u;
  Oh = 1;
  const s = jm(),
    i = _s(),
    u = wm().ArraySet,
    r = L0().MappingList;
  class f {
    constructor(h) {
      h || (h = {}),
        (this._file = i.getArg(h, "file", null)),
        (this._sourceRoot = i.getArg(h, "sourceRoot", null)),
        (this._skipValidation = i.getArg(h, "skipValidation", !1)),
        (this._sources = new u()),
        (this._names = new u()),
        (this._mappings = new r()),
        (this._sourcesContents = null);
    }
    static fromSourceMap(h) {
      const x = h.sourceRoot,
        g = new f({ file: h.file, sourceRoot: x });
      return (
        h.eachMapping(function (m) {
          const y = {
            generated: { line: m.generatedLine, column: m.generatedColumn },
          };
          m.source != null &&
            ((y.source = m.source),
            x != null && (y.source = i.relative(x, y.source)),
            (y.original = { line: m.originalLine, column: m.originalColumn }),
            m.name != null && (y.name = m.name)),
            g.addMapping(y);
        }),
        h.sources.forEach(function (m) {
          let y = m;
          x != null && (y = i.relative(x, m)),
            g._sources.has(y) || g._sources.add(y);
          const S = h.sourceContentFor(m);
          S != null && g.setSourceContent(m, S);
        }),
        g
      );
    }
    addMapping(h) {
      const x = i.getArg(h, "generated"),
        g = i.getArg(h, "original", null);
      let m = i.getArg(h, "source", null),
        y = i.getArg(h, "name", null);
      this._skipValidation || this._validateMapping(x, g, m, y),
        m != null &&
          ((m = String(m)), this._sources.has(m) || this._sources.add(m)),
        y != null &&
          ((y = String(y)), this._names.has(y) || this._names.add(y)),
        this._mappings.add({
          generatedLine: x.line,
          generatedColumn: x.column,
          originalLine: g && g.line,
          originalColumn: g && g.column,
          source: m,
          name: y,
        });
    }
    setSourceContent(h, x) {
      let g = h;
      this._sourceRoot != null && (g = i.relative(this._sourceRoot, g)),
        x != null
          ? (this._sourcesContents ||
              (this._sourcesContents = Object.create(null)),
            (this._sourcesContents[i.toSetString(g)] = x))
          : this._sourcesContents &&
            (delete this._sourcesContents[i.toSetString(g)],
            Object.keys(this._sourcesContents).length === 0 &&
              (this._sourcesContents = null));
    }
    applySourceMap(h, x, g) {
      let m = x;
      if (x == null) {
        if (h.file == null)
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        m = h.file;
      }
      const y = this._sourceRoot;
      y != null && (m = i.relative(y, m));
      const S = this._mappings.toArray().length > 0 ? new u() : this._sources,
        N = new u();
      this._mappings.unsortedForEach(function (b) {
        if (b.source === m && b.originalLine != null) {
          const C = h.originalPositionFor({
            line: b.originalLine,
            column: b.originalColumn,
          });
          C.source != null &&
            ((b.source = C.source),
            g != null && (b.source = i.join(g, b.source)),
            y != null && (b.source = i.relative(y, b.source)),
            (b.originalLine = C.line),
            (b.originalColumn = C.column),
            C.name != null && (b.name = C.name));
        }
        const w = b.source;
        w != null && !S.has(w) && S.add(w);
        const T = b.name;
        T != null && !N.has(T) && N.add(T);
      }, this),
        (this._sources = S),
        (this._names = N),
        h.sources.forEach(function (b) {
          const w = h.sourceContentFor(b);
          w != null &&
            (g != null && (b = i.join(g, b)),
            y != null && (b = i.relative(y, b)),
            this.setSourceContent(b, w));
        }, this);
    }
    _validateMapping(h, x, g, m) {
      if (x && typeof x.line != "number" && typeof x.column != "number")
        throw new Error(
          "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
        );
      if (
        !(
          h &&
          "line" in h &&
          "column" in h &&
          h.line > 0 &&
          h.column >= 0 &&
          !x &&
          !g &&
          !m
        )
      ) {
        if (
          !(
            h &&
            "line" in h &&
            "column" in h &&
            x &&
            "line" in x &&
            "column" in x &&
            h.line > 0 &&
            h.column >= 0 &&
            x.line > 0 &&
            x.column >= 0 &&
            g
          )
        )
          throw new Error(
            "Invalid mapping: " +
              JSON.stringify({ generated: h, source: g, original: x, name: m })
          );
      }
    }
    _serializeMappings() {
      let h = 0,
        x = 1,
        g = 0,
        m = 0,
        y = 0,
        S = 0,
        N = "",
        b,
        w,
        T,
        C;
      const D = this._mappings.toArray();
      for (let U = 0, Q = D.length; U < Q; U++) {
        if (((w = D[U]), (b = ""), w.generatedLine !== x))
          for (h = 0; w.generatedLine !== x; ) (b += ";"), x++;
        else if (U > 0) {
          if (!i.compareByGeneratedPositionsInflated(w, D[U - 1])) continue;
          b += ",";
        }
        (b += s.encode(w.generatedColumn - h)),
          (h = w.generatedColumn),
          w.source != null &&
            ((C = this._sources.indexOf(w.source)),
            (b += s.encode(C - S)),
            (S = C),
            (b += s.encode(w.originalLine - 1 - m)),
            (m = w.originalLine - 1),
            (b += s.encode(w.originalColumn - g)),
            (g = w.originalColumn),
            w.name != null &&
              ((T = this._names.indexOf(w.name)),
              (b += s.encode(T - y)),
              (y = T))),
          (N += b);
      }
      return N;
    }
    _generateSourcesContent(h, x) {
      return h.map(function (g) {
        if (!this._sourcesContents) return null;
        x != null && (g = i.relative(x, g));
        const m = i.toSetString(g);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, m)
          ? this._sourcesContents[m]
          : null;
      }, this);
    }
    toJSON() {
      const h = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings(),
      };
      return (
        this._file != null && (h.file = this._file),
        this._sourceRoot != null && (h.sourceRoot = this._sourceRoot),
        this._sourcesContents &&
          (h.sourcesContent = this._generateSourcesContent(
            h.sources,
            h.sourceRoot
          )),
        h
      );
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
  }
  return (f.prototype._version = 3), ($u.SourceMapGenerator = f), $u;
}
var ql = {},
  eo = {},
  Th;
function D0() {
  return (
    Th ||
      ((Th = 1),
      (function (s) {
        (s.GREATEST_LOWER_BOUND = 1), (s.LEAST_UPPER_BOUND = 2);
        function i(u, r, f, d, h, x) {
          const g = Math.floor((r - u) / 2) + u,
            m = h(f, d[g], !0);
          return m === 0
            ? g
            : m > 0
            ? r - g > 1
              ? i(g, r, f, d, h, x)
              : x === s.LEAST_UPPER_BOUND
              ? r < d.length
                ? r
                : -1
              : g
            : g - u > 1
            ? i(u, g, f, d, h, x)
            : x == s.LEAST_UPPER_BOUND
            ? g
            : u < 0
            ? -1
            : u;
        }
        s.search = function (r, f, d, h) {
          if (f.length === 0) return -1;
          let x = i(-1, f.length, r, f, d, h || s.GREATEST_LOWER_BOUND);
          if (x < 0) return -1;
          for (; x - 1 >= 0 && d(f[x], f[x - 1], !0) === 0; ) --x;
          return x;
        };
      })(eo)),
    eo
  );
}
var gs = { exports: {} },
  Rh;
function Cm() {
  if (Rh) return gs.exports;
  Rh = 1;
  let s = null;
  return (
    (gs.exports = function () {
      if (typeof s == "string") return fetch(s).then((u) => u.arrayBuffer());
      if (s instanceof ArrayBuffer) return Promise.resolve(s);
      throw new Error(
        "You must provide the string URL or ArrayBuffer contents of lib/mappings.wasm by calling SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) before using SourceMapConsumer"
      );
    }),
    (gs.exports.initialize = (i) => {
      s = i;
    }),
    gs.exports
  );
}
var to, Mh;
function z0() {
  if (Mh) return to;
  Mh = 1;
  const s = Cm();
  function i() {
    (this.generatedLine = 0),
      (this.generatedColumn = 0),
      (this.lastGeneratedColumn = null),
      (this.source = null),
      (this.originalLine = null),
      (this.originalColumn = null),
      (this.name = null);
  }
  let u = null;
  return (
    (to = function () {
      if (u) return u;
      const f = [];
      return (
        (u = s()
          .then((d) =>
            WebAssembly.instantiate(d, {
              env: {
                mapping_callback(h, x, g, m, y, S, N, b, w, T) {
                  const C = new i();
                  (C.generatedLine = h + 1),
                    (C.generatedColumn = x),
                    g && (C.lastGeneratedColumn = m - 1),
                    y &&
                      ((C.source = S),
                      (C.originalLine = N + 1),
                      (C.originalColumn = b),
                      w && (C.name = T)),
                    f[f.length - 1](C);
                },
                start_all_generated_locations_for() {
                  console.time("all_generated_locations_for");
                },
                end_all_generated_locations_for() {
                  console.timeEnd("all_generated_locations_for");
                },
                start_compute_column_spans() {
                  console.time("compute_column_spans");
                },
                end_compute_column_spans() {
                  console.timeEnd("compute_column_spans");
                },
                start_generated_location_for() {
                  console.time("generated_location_for");
                },
                end_generated_location_for() {
                  console.timeEnd("generated_location_for");
                },
                start_original_location_for() {
                  console.time("original_location_for");
                },
                end_original_location_for() {
                  console.timeEnd("original_location_for");
                },
                start_parse_mappings() {
                  console.time("parse_mappings");
                },
                end_parse_mappings() {
                  console.timeEnd("parse_mappings");
                },
                start_sort_by_generated_location() {
                  console.time("sort_by_generated_location");
                },
                end_sort_by_generated_location() {
                  console.timeEnd("sort_by_generated_location");
                },
                start_sort_by_original_location() {
                  console.time("sort_by_original_location");
                },
                end_sort_by_original_location() {
                  console.timeEnd("sort_by_original_location");
                },
              },
            })
          )
          .then((d) => ({
            exports: d.instance.exports,
            withMappingCallback: (h, x) => {
              f.push(h);
              try {
                x();
              } finally {
                f.pop();
              }
            },
          }))
          .then(null, (d) => {
            throw ((u = null), d);
          })),
        u
      );
    }),
    to
  );
}
var Lh;
function U0() {
  if (Lh) return ql;
  Lh = 1;
  const s = _s(),
    i = D0(),
    u = wm().ArraySet;
  jm();
  const r = Cm(),
    f = z0(),
    d = Symbol("smcInternal");
  class h {
    constructor(N, b) {
      return N == d ? Promise.resolve(this) : m(N, b);
    }
    static initialize(N) {
      r.initialize(N["lib/mappings.wasm"]);
    }
    static fromSourceMap(N, b) {
      return y(N, b);
    }
    static async with(N, b, w) {
      const T = await new h(N, b);
      try {
        return await w(T);
      } finally {
        T.destroy();
      }
    }
    eachMapping(N, b, w) {
      throw new Error("Subclasses must implement eachMapping");
    }
    allGeneratedPositionsFor(N) {
      throw new Error("Subclasses must implement allGeneratedPositionsFor");
    }
    destroy() {
      throw new Error("Subclasses must implement destroy");
    }
  }
  (h.prototype._version = 3),
    (h.GENERATED_ORDER = 1),
    (h.ORIGINAL_ORDER = 2),
    (h.GREATEST_LOWER_BOUND = 1),
    (h.LEAST_UPPER_BOUND = 2),
    (ql.SourceMapConsumer = h);
  class x extends h {
    constructor(N, b) {
      return super(d).then((w) => {
        let T = N;
        typeof N == "string" && (T = s.parseSourceMapInput(N));
        const C = s.getArg(T, "version"),
          D = s.getArg(T, "sources").map(String),
          U = s.getArg(T, "names", []),
          Q = s.getArg(T, "sourceRoot", null),
          P = s.getArg(T, "sourcesContent", null),
          G = s.getArg(T, "mappings"),
          I = s.getArg(T, "file", null),
          oe = s.getArg(T, "x_google_ignoreList", null);
        if (C != w._version) throw new Error("Unsupported version: " + C);
        return (
          (w._sourceLookupCache = new Map()),
          (w._names = u.fromArray(U.map(String), !0)),
          (w._sources = u.fromArray(D, !0)),
          (w._absoluteSources = u.fromArray(
            w._sources.toArray().map(function (Se) {
              return s.computeSourceURL(Q, Se, b);
            }),
            !0
          )),
          (w.sourceRoot = Q),
          (w.sourcesContent = P),
          (w._mappings = G),
          (w._sourceMapURL = b),
          (w.file = I),
          (w.x_google_ignoreList = oe),
          (w._computedColumnSpans = !1),
          (w._mappingsPtr = 0),
          (w._wasm = null),
          f().then((Se) => ((w._wasm = Se), w))
        );
      });
    }
    _findSourceIndex(N) {
      const b = this._sourceLookupCache.get(N);
      if (typeof b == "number") return b;
      const w = s.computeSourceURL(null, N, this._sourceMapURL);
      if (this._absoluteSources.has(w)) {
        const C = this._absoluteSources.indexOf(w);
        return this._sourceLookupCache.set(N, C), C;
      }
      const T = s.computeSourceURL(this.sourceRoot, N, this._sourceMapURL);
      if (this._absoluteSources.has(T)) {
        const C = this._absoluteSources.indexOf(T);
        return this._sourceLookupCache.set(N, C), C;
      }
      return -1;
    }
    static fromSourceMap(N, b) {
      return new x(N.toString());
    }
    get sources() {
      return this._absoluteSources.toArray();
    }
    _getMappingsPtr() {
      return (
        this._mappingsPtr === 0 && this._parseMappings(), this._mappingsPtr
      );
    }
    _parseMappings() {
      const N = this._mappings,
        b = N.length,
        w = this._wasm.exports.allocate_mappings(b) >>> 0,
        T = new Uint8Array(this._wasm.exports.memory.buffer, w, b);
      for (let D = 0; D < b; D++) T[D] = N.charCodeAt(D);
      const C = this._wasm.exports.parse_mappings(w);
      if (!C) {
        const D = this._wasm.exports.get_last_error();
        let U = `Error parsing mappings (code ${D}): `;
        switch (D) {
          case 1:
            U +=
              "the mappings contained a negative line, column, source index, or name index";
            break;
          case 2:
            U += "the mappings contained a number larger than 2**32";
            break;
          case 3:
            U += "reached EOF while in the middle of parsing a VLQ";
            break;
          case 4:
            U += "invalid base 64 character while parsing a VLQ";
            break;
          default:
            U += "unknown error code";
            break;
        }
        throw new Error(U);
      }
      this._mappingsPtr = C;
    }
    eachMapping(N, b, w) {
      const T = b || null,
        C = w || h.GENERATED_ORDER;
      this._wasm.withMappingCallback(
        (D) => {
          D.source !== null &&
            ((D.source = this._absoluteSources.at(D.source)),
            D.name !== null && (D.name = this._names.at(D.name))),
            this._computedColumnSpans &&
              D.lastGeneratedColumn === null &&
              (D.lastGeneratedColumn = 1 / 0),
            N.call(T, D);
        },
        () => {
          switch (C) {
            case h.GENERATED_ORDER:
              this._wasm.exports.by_generated_location(this._getMappingsPtr());
              break;
            case h.ORIGINAL_ORDER:
              this._wasm.exports.by_original_location(this._getMappingsPtr());
              break;
            default:
              throw new Error("Unknown order of iteration.");
          }
        }
      );
    }
    allGeneratedPositionsFor(N) {
      let b = s.getArg(N, "source");
      const w = s.getArg(N, "line"),
        T = N.column || 0;
      if (((b = this._findSourceIndex(b)), b < 0)) return [];
      if (w < 1) throw new Error("Line numbers must be >= 1");
      if (T < 0) throw new Error("Column numbers must be >= 0");
      const C = [];
      return (
        this._wasm.withMappingCallback(
          (D) => {
            let U = D.lastGeneratedColumn;
            this._computedColumnSpans && U === null && (U = 1 / 0),
              C.push({
                line: D.generatedLine,
                column: D.generatedColumn,
                lastColumn: U,
              });
          },
          () => {
            this._wasm.exports.all_generated_locations_for(
              this._getMappingsPtr(),
              b,
              w - 1,
              "column" in N,
              T
            );
          }
        ),
        C
      );
    }
    destroy() {
      this._mappingsPtr !== 0 &&
        (this._wasm.exports.free_mappings(this._mappingsPtr),
        (this._mappingsPtr = 0));
    }
    computeColumnSpans() {
      this._computedColumnSpans ||
        (this._wasm.exports.compute_column_spans(this._getMappingsPtr()),
        (this._computedColumnSpans = !0));
    }
    originalPositionFor(N) {
      const b = {
        generatedLine: s.getArg(N, "line"),
        generatedColumn: s.getArg(N, "column"),
      };
      if (b.generatedLine < 1) throw new Error("Line numbers must be >= 1");
      if (b.generatedColumn < 0) throw new Error("Column numbers must be >= 0");
      let w = s.getArg(N, "bias", h.GREATEST_LOWER_BOUND);
      w == null && (w = h.GREATEST_LOWER_BOUND);
      let T;
      if (
        (this._wasm.withMappingCallback(
          (C) => (T = C),
          () => {
            this._wasm.exports.original_location_for(
              this._getMappingsPtr(),
              b.generatedLine - 1,
              b.generatedColumn,
              w
            );
          }
        ),
        T && T.generatedLine === b.generatedLine)
      ) {
        let C = s.getArg(T, "source", null);
        C !== null && (C = this._absoluteSources.at(C));
        let D = s.getArg(T, "name", null);
        return (
          D !== null && (D = this._names.at(D)),
          {
            source: C,
            line: s.getArg(T, "originalLine", null),
            column: s.getArg(T, "originalColumn", null),
            name: D,
          }
        );
      }
      return { source: null, line: null, column: null, name: null };
    }
    hasContentsOfAllSources() {
      return this.sourcesContent
        ? this.sourcesContent.length >= this._sources.size() &&
            !this.sourcesContent.some(function (N) {
              return N == null;
            })
        : !1;
    }
    sourceContentFor(N, b) {
      if (!this.sourcesContent) return null;
      const w = this._findSourceIndex(N);
      if (w >= 0) return this.sourcesContent[w];
      if (b) return null;
      throw new Error('"' + N + '" is not in the SourceMap.');
    }
    generatedPositionFor(N) {
      let b = s.getArg(N, "source");
      if (((b = this._findSourceIndex(b)), b < 0))
        return { line: null, column: null, lastColumn: null };
      const w = {
        source: b,
        originalLine: s.getArg(N, "line"),
        originalColumn: s.getArg(N, "column"),
      };
      if (w.originalLine < 1) throw new Error("Line numbers must be >= 1");
      if (w.originalColumn < 0) throw new Error("Column numbers must be >= 0");
      let T = s.getArg(N, "bias", h.GREATEST_LOWER_BOUND);
      T == null && (T = h.GREATEST_LOWER_BOUND);
      let C;
      if (
        (this._wasm.withMappingCallback(
          (D) => (C = D),
          () => {
            this._wasm.exports.generated_location_for(
              this._getMappingsPtr(),
              w.source,
              w.originalLine - 1,
              w.originalColumn,
              T
            );
          }
        ),
        C && C.source === w.source)
      ) {
        let D = C.lastGeneratedColumn;
        return (
          this._computedColumnSpans && D === null && (D = 1 / 0),
          {
            line: s.getArg(C, "generatedLine", null),
            column: s.getArg(C, "generatedColumn", null),
            lastColumn: D,
          }
        );
      }
      return { line: null, column: null, lastColumn: null };
    }
  }
  (x.prototype.consumer = h), (ql.BasicSourceMapConsumer = x);
  class g extends h {
    constructor(N, b) {
      return super(d).then((w) => {
        let T = N;
        typeof N == "string" && (T = s.parseSourceMapInput(N));
        const C = s.getArg(T, "version"),
          D = s.getArg(T, "sections");
        if (C != w._version) throw new Error("Unsupported version: " + C);
        let U = { line: -1, column: 0 };
        return Promise.all(
          D.map((Q) => {
            if (Q.url)
              throw new Error(
                "Support for url field in sections not implemented."
              );
            const P = s.getArg(Q, "offset"),
              G = s.getArg(P, "line"),
              I = s.getArg(P, "column");
            if (G < U.line || (G === U.line && I < U.column))
              throw new Error(
                "Section offsets must be ordered and non-overlapping."
              );
            return (
              (U = P),
              new h(s.getArg(Q, "map"), b).then((Se) => ({
                generatedOffset: {
                  generatedLine: G + 1,
                  generatedColumn: I + 1,
                },
                consumer: Se,
              }))
            );
          })
        ).then((Q) => ((w._sections = Q), w));
      });
    }
    get sources() {
      const N = [];
      for (let b = 0; b < this._sections.length; b++)
        for (let w = 0; w < this._sections[b].consumer.sources.length; w++)
          N.push(this._sections[b].consumer.sources[w]);
      return N;
    }
    originalPositionFor(N) {
      const b = {
          generatedLine: s.getArg(N, "line"),
          generatedColumn: s.getArg(N, "column"),
        },
        w = i.search(b, this._sections, function (C, D) {
          const U = C.generatedLine - D.generatedOffset.generatedLine;
          return (
            U || C.generatedColumn - (D.generatedOffset.generatedColumn - 1)
          );
        }),
        T = this._sections[w];
      return T
        ? T.consumer.originalPositionFor({
            line: b.generatedLine - (T.generatedOffset.generatedLine - 1),
            column:
              b.generatedColumn -
              (T.generatedOffset.generatedLine === b.generatedLine
                ? T.generatedOffset.generatedColumn - 1
                : 0),
            bias: N.bias,
          })
        : { source: null, line: null, column: null, name: null };
    }
    hasContentsOfAllSources() {
      return this._sections.every(function (N) {
        return N.consumer.hasContentsOfAllSources();
      });
    }
    sourceContentFor(N, b) {
      for (let w = 0; w < this._sections.length; w++) {
        const C = this._sections[w].consumer.sourceContentFor(N, !0);
        if (C) return C;
      }
      if (b) return null;
      throw new Error('"' + N + '" is not in the SourceMap.');
    }
    _findSectionIndex(N) {
      for (let b = 0; b < this._sections.length; b++) {
        const { consumer: w } = this._sections[b];
        if (w._findSourceIndex(N) !== -1) return b;
      }
      return -1;
    }
    generatedPositionFor(N) {
      const b = this._findSectionIndex(s.getArg(N, "source")),
        w = b >= 0 ? this._sections[b] : null,
        T =
          b >= 0 && b + 1 < this._sections.length
            ? this._sections[b + 1]
            : null,
        C = w && w.consumer.generatedPositionFor(N);
      if (C && C.line !== null) {
        const D = w.generatedOffset.generatedLine - 1,
          U = w.generatedOffset.generatedColumn - 1;
        return (
          C.line === 1 &&
            ((C.column += U),
            typeof C.lastColumn == "number" && (C.lastColumn += U)),
          C.lastColumn === 1 / 0 &&
            T &&
            C.line === T.generatedOffset.generatedLine &&
            (C.lastColumn = T.generatedOffset.generatedColumn - 2),
          (C.line += D),
          C
        );
      }
      return { line: null, column: null, lastColumn: null };
    }
    allGeneratedPositionsFor(N) {
      const b = this._findSectionIndex(s.getArg(N, "source")),
        w = b >= 0 ? this._sections[b] : null,
        T =
          b >= 0 && b + 1 < this._sections.length
            ? this._sections[b + 1]
            : null;
      return w
        ? w.consumer.allGeneratedPositionsFor(N).map((C) => {
            const D = w.generatedOffset.generatedLine - 1,
              U = w.generatedOffset.generatedColumn - 1;
            return (
              C.line === 1 &&
                ((C.column += U),
                typeof C.lastColumn == "number" && (C.lastColumn += U)),
              C.lastColumn === 1 / 0 &&
                T &&
                C.line === T.generatedOffset.generatedLine &&
                (C.lastColumn = T.generatedOffset.generatedColumn - 2),
              (C.line += D),
              C
            );
          })
        : [];
    }
    eachMapping(N, b, w) {
      this._sections.forEach((T, C) => {
        const D = C + 1 < this._sections.length ? this._sections[C + 1] : null,
          { generatedOffset: U } = T,
          Q = U.generatedLine - 1,
          P = U.generatedColumn - 1;
        T.consumer.eachMapping(
          function (G) {
            G.generatedLine === 1 &&
              ((G.generatedColumn += P),
              typeof G.lastGeneratedColumn == "number" &&
                (G.lastGeneratedColumn += P)),
              G.lastGeneratedColumn === 1 / 0 &&
                D &&
                G.generatedLine === D.generatedOffset.generatedLine &&
                (G.lastGeneratedColumn = D.generatedOffset.generatedColumn - 2),
              (G.generatedLine += Q),
              N.call(this, G);
          },
          b,
          w
        );
      });
    }
    computeColumnSpans() {
      for (let N = 0; N < this._sections.length; N++)
        this._sections[N].consumer.computeColumnSpans();
    }
    destroy() {
      for (let N = 0; N < this._sections.length; N++)
        this._sections[N].consumer.destroy();
    }
  }
  ql.IndexedSourceMapConsumer = g;
  function m(S, N) {
    let b = S;
    typeof S == "string" && (b = s.parseSourceMapInput(S));
    const w = b.sections != null ? new g(b, N) : new x(b, N);
    return Promise.resolve(w);
  }
  function y(S, N) {
    return x.fromSourceMap(S, N);
  }
  return ql;
}
var no = {},
  Dh;
function q0() {
  if (Dh) return no;
  Dh = 1;
  const s = Em().SourceMapGenerator,
    i = _s(),
    u = /(\r?\n)/,
    r = 10,
    f = "$$$isSourceNode$$$";
  class d {
    constructor(x, g, m, y, S) {
      (this.children = []),
        (this.sourceContents = {}),
        (this.line = x ?? null),
        (this.column = g ?? null),
        (this.source = m ?? null),
        (this.name = S ?? null),
        (this[f] = !0),
        y != null && this.add(y);
    }
    static fromStringWithSourceMap(x, g, m) {
      const y = new d(),
        S = x.split(u);
      let N = 0;
      const b = function () {
        const Q = G(),
          P = G() || "";
        return Q + P;
        function G() {
          return N < S.length ? S[N++] : void 0;
        }
      };
      let w = 1,
        T = 0,
        C = null,
        D;
      return (
        g.eachMapping(function (Q) {
          if (C !== null)
            if (w < Q.generatedLine) U(C, b()), w++, (T = 0);
            else {
              D = S[N] || "";
              const P = D.substr(0, Q.generatedColumn - T);
              (S[N] = D.substr(Q.generatedColumn - T)),
                (T = Q.generatedColumn),
                U(C, P),
                (C = Q);
              return;
            }
          for (; w < Q.generatedLine; ) y.add(b()), w++;
          T < Q.generatedColumn &&
            ((D = S[N] || ""),
            y.add(D.substr(0, Q.generatedColumn)),
            (S[N] = D.substr(Q.generatedColumn)),
            (T = Q.generatedColumn)),
            (C = Q);
        }, this),
        N < S.length && (C && U(C, b()), y.add(S.splice(N).join(""))),
        g.sources.forEach(function (Q) {
          const P = g.sourceContentFor(Q);
          P != null &&
            (m != null && (Q = i.join(m, Q)), y.setSourceContent(Q, P));
        }),
        y
      );
      function U(Q, P) {
        if (Q === null || Q.source === void 0) y.add(P);
        else {
          const G = m ? i.join(m, Q.source) : Q.source;
          y.add(new d(Q.originalLine, Q.originalColumn, G, P, Q.name));
        }
      }
    }
    add(x) {
      if (Array.isArray(x))
        x.forEach(function (g) {
          this.add(g);
        }, this);
      else if (x[f] || typeof x == "string") x && this.children.push(x);
      else
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
            x
        );
      return this;
    }
    prepend(x) {
      if (Array.isArray(x))
        for (let g = x.length - 1; g >= 0; g--) this.prepend(x[g]);
      else if (x[f] || typeof x == "string") this.children.unshift(x);
      else
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
            x
        );
      return this;
    }
    walk(x) {
      let g;
      for (let m = 0, y = this.children.length; m < y; m++)
        (g = this.children[m]),
          g[f]
            ? g.walk(x)
            : g !== "" &&
              x(g, {
                source: this.source,
                line: this.line,
                column: this.column,
                name: this.name,
              });
    }
    join(x) {
      let g, m;
      const y = this.children.length;
      if (y > 0) {
        for (g = [], m = 0; m < y - 1; m++) g.push(this.children[m]), g.push(x);
        g.push(this.children[m]), (this.children = g);
      }
      return this;
    }
    replaceRight(x, g) {
      const m = this.children[this.children.length - 1];
      return (
        m[f]
          ? m.replaceRight(x, g)
          : typeof m == "string"
          ? (this.children[this.children.length - 1] = m.replace(x, g))
          : this.children.push("".replace(x, g)),
        this
      );
    }
    setSourceContent(x, g) {
      this.sourceContents[i.toSetString(x)] = g;
    }
    walkSourceContents(x) {
      for (let m = 0, y = this.children.length; m < y; m++)
        this.children[m][f] && this.children[m].walkSourceContents(x);
      const g = Object.keys(this.sourceContents);
      for (let m = 0, y = g.length; m < y; m++)
        x(i.fromSetString(g[m]), this.sourceContents[g[m]]);
    }
    toString() {
      let x = "";
      return (
        this.walk(function (g) {
          x += g;
        }),
        x
      );
    }
    toStringWithSourceMap(x) {
      const g = { code: "", line: 1, column: 0 },
        m = new s(x);
      let y = !1,
        S = null,
        N = null,
        b = null,
        w = null;
      return (
        this.walk(function (T, C) {
          (g.code += T),
            C.source !== null && C.line !== null && C.column !== null
              ? ((S !== C.source ||
                  N !== C.line ||
                  b !== C.column ||
                  w !== C.name) &&
                  m.addMapping({
                    source: C.source,
                    original: { line: C.line, column: C.column },
                    generated: { line: g.line, column: g.column },
                    name: C.name,
                  }),
                (S = C.source),
                (N = C.line),
                (b = C.column),
                (w = C.name),
                (y = !0))
              : y &&
                (m.addMapping({
                  generated: { line: g.line, column: g.column },
                }),
                (S = null),
                (y = !1));
          for (let D = 0, U = T.length; D < U; D++)
            T.charCodeAt(D) === r
              ? (g.line++,
                (g.column = 0),
                D + 1 === U
                  ? ((S = null), (y = !1))
                  : y &&
                    m.addMapping({
                      source: C.source,
                      original: { line: C.line, column: C.column },
                      generated: { line: g.line, column: g.column },
                      name: C.name,
                    }))
              : g.column++;
        }),
        this.walkSourceContents(function (T, C) {
          m.setSourceContent(T, C);
        }),
        { code: g.code, map: m }
      );
    }
  }
  return (no.SourceNode = d), no;
}
var zh;
function H0() {
  return (
    zh ||
      ((zh = 1),
      (Ul.SourceMapGenerator = Em().SourceMapGenerator),
      (Ul.SourceMapConsumer = U0().SourceMapConsumer),
      (Ul.SourceNode = q0().SourceNode)),
    Ul
  );
}
var mo = H0();
let ao = !1;
const qa = new Map(),
  B0 = 300 * 1e3,
  k0 = 1e3;
setInterval(() => {
  const s = Date.now();
  for (const [i, u] of qa.entries()) s - u.timestamp > B0 && qa.delete(i);
}, 6e4);
async function Y0() {
  if (!ao)
    try {
      await mo.SourceMapConsumer.initialize({
        "lib/mappings.wasm":
          "https://unpkg.com/source-map@0.7.6/lib/mappings.wasm",
      }),
        (ao = !0);
    } catch (s) {
      console.warn("Failed to initialize SourceMapConsumer:", s);
      try {
        await mo.SourceMapConsumer.initialize({}), (ao = !0);
      } catch (i) {
        throw (
          (console.error(
            "SourceMapConsumer initialization failed completely:",
            i
          ),
          i)
        );
      }
    }
}
function G0(s) {
  if (!s || !s.stack) return `no-stack-${s?.message || "unknown"}`;
  const r = s.stack
    .split(
      `
`
    )
    .slice(0, 3)
    .map((f) =>
      f
        .replace(/\?t=\d+/g, "")
        .replace(/\?v=[\w\d]+/g, "")
        .replace(/\d{13,}/g, "TIMESTAMP")
    );
  return `${s.name || "Error"}-${s.message}-${r.join("|")}`;
}
const V0 = "preview-inject/";
async function ps(s, i = 5) {
  if (!s || !s.stack)
    return {
      errorMessage: s?.message || "",
      mappedStack: s?.stack || "",
      sourceContext: [],
    };
  const u = G0(s);
  if (qa.has(u)) {
    const y = qa.get(u);
    return console.log("Using cached error mapping for:", u), y;
  }
  if (qa.size >= k0) return null;
  await Y0();
  const r = s.stack.split(`
`),
    f = [],
    d = [],
    h = new Map(),
    x = new Map();
  let g = 0;
  for (const y of r) {
    const S = y.match(
      /at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)|at\s+(.+?):(\d+):(\d+)/
    );
    if (!S) {
      f.push(y);
      continue;
    }
    let N, b, w, T;
    S[1]
      ? ((N = S[1]), (b = S[2]), (w = parseInt(S[3])), (T = parseInt(S[4])))
      : ((N = "<anonymous>"),
        (b = S[5]),
        (w = parseInt(S[6])),
        (T = parseInt(S[7])));
    try {
      const C = `${b}.map`;
      let D = h.get(C);
      if (!D) {
        const Q = await Z0(C);
        (D = await new mo.SourceMapConsumer(Q)), h.set(C, D);
      }
      const U = D.originalPositionFor({ line: w, column: T });
      if (U.source) {
        if (U.source.includes(V0)) continue;
        const Q = U.source
            .split("/")
            .filter((I) => I !== "..")
            .join("/"),
          G = `    at ${U.name || N} (${Q}:${U.line}:${U.column})`;
        if ((f.push(G), U.line && U.column && g < i)) {
          g++;
          try {
            const I = await Q0(D, U.source, x);
            if (I) {
              const oe = X0(I, U.line, 10);
              d.push({ file: Q, line: U.line, column: U.column, context: oe });
            }
          } catch (I) {
            console.warn("Failed to extract source context:", I);
          }
        }
      } else f.push(y);
    } catch (C) {
      console.warn("Failed to map stack line:", y, C), f.push(y);
    }
  }
  for (const y of h.values()) y.destroy();
  const m = {
    errorMessage: s?.message || "",
    mappedStack: f.join(`
`),
    sourceContext: d,
  };
  return (m.timestamp = Date.now()), qa.set(u, m), m;
}
async function Q0(s, i, u) {
  if (u.has(i)) return u.get(i) || null;
  const r = s.sourceContentFor(i);
  return r ? (u.set(i, r), r) : null;
}
function X0(s, i, u = 10) {
  const r = s.split(`
`),
    f = Math.max(0, i - u - 1),
    d = Math.min(r.length - 1, i + u - 1),
    h = [];
  for (let x = f; x <= d; x++) {
    const g = x + 1,
      S = `${g === i ? ">>>" : "   "} ${g.toString().padStart(4, " ")} | ${
        r[x] || ""
      }`;
    h.push(S);
  }
  return h.join(`
`);
}
async function Z0(s) {
  try {
    const i = await fetch(s);
    if (!i.ok) throw new Error(`Failed to load source map: ${i.status}`);
    return await i.json();
  } catch (i) {
    const u = i instanceof Error ? i.message : String(i);
    throw new Error(`Error loading source map from ${s}: ${u}`);
  }
}
class K0 {
  client;
  originalConsoleError;
  constructor() {
    const i = E0();
    i.length > 0 &&
      i.forEach((u) => {
        u.type === "console.error"
          ? this.handleConsoleError(u.args)
          : u.type === "runtime" && this.handleError(u.args);
      }),
      (this.client = new Cs(window.parent)),
      (this.originalConsoleError = console.error),
      this.initErrorHandlers();
  }
  initErrorHandlers() {
    window.addEventListener("error", this.handleError.bind(this)),
      window.addEventListener(
        "unhandledrejection",
        this.handlePromiseRejection.bind(this)
      ),
      this.interceptConsoleError();
  }
  async handleError(i) {
    const u = i.target;
    if (
      !(
        u &&
        u instanceof HTMLElement &&
        u.tagName &&
        [
          "IMG",
          "SCRIPT",
          "LINK",
          "VIDEO",
          "AUDIO",
          "SOURCE",
          "IFRAME",
        ].includes(u.tagName)
      ) &&
      i.error &&
      i.error.stack
    )
      try {
        const r = await ps(i.error);
        this.sendError(r);
      } catch (r) {
        console.warn("Failed to map error stack:", r);
      }
  }
  async handlePromiseRejection(i) {
    const u =
      i.reason instanceof Error ? i.reason : new Error(String(i.reason));
    if (u.stack)
      try {
        const r = await ps(u);
        this.sendError(r);
      } catch (r) {
        console.warn("Failed to map promise rejection stack:", r);
      }
  }
  interceptConsoleError() {
    console.error = (...i) => {
      this.originalConsoleError.apply(console, i);
      const u = i.find((r) => r instanceof Error);
      if (u && u.stack) this.handleConsoleError(u);
      else if (i.length > 0) {
        const r = i
            .map((d) => (typeof d == "object" ? JSON.stringify(d) : String(d)))
            .join(" "),
          f = new Error(r);
        this.handleConsoleError(f);
      }
    };
  }
  async handleConsoleError(i) {
    try {
      const u = await ps(i);
      this.sendError(u);
    } catch (u) {
      console.warn("Failed to map console error stack:", u);
    }
  }
  reportError(i) {
    this.handleReactError(i);
  }
  async handleReactError(i) {
    try {
      const u = await ps(i);
      this.sendError(u);
    } catch (u) {
      console.warn("Failed to map React error stack:", u);
    }
  }
  async sendError(i) {
    if (!i) {
      console.warn("error is too many");
      return;
    }
    if (i.sourceContext.length !== 0)
      try {
        await this.client.post("runtime-error", i);
      } catch (u) {
        console.warn("Failed to send error to parent:", u);
      }
  }
  destroy() {
    (console.error = this.originalConsoleError), this.client.destroy();
  }
}
function $0() {
  const s = new K0();
  return (window.runtimeErrorCollector = s), s;
}
class J0 {
  _client;
  constructor() {
    (this._client = new Cs(window.parent)), this._domContentLoadedListener();
  }
  _domContentLoadedListener() {
    const i = () => {
      console.log("DOMContentLoaded"),
        this._client.post("DOMContentLoaded"),
        document.removeEventListener("DOMContentLoaded", i);
    };
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", i)
      : (console.log("DOMContentLoaded"),
        this._client.post("DOMContentLoaded"));
  }
}
function F0() {
  return new J0();
}
const vo = (s) => {
    const i = "/preview/aa27a765-101a-4fd5-a6c5-e8c66e45a4f0/2956086";
    return s.startsWith(i) ? s.replaceAll(i, "") || "/" : s || "/";
  },
  P0 = "modulepreload",
  W0 = function (s) {
    return "/preview/aa27a765-101a-4fd5-a6c5-e8c66e45a4f0/2956086/" + s;
  },
  Uh = {},
  _m = function (i, u, r) {
    let f = Promise.resolve();
    if (u && u.length > 0) {
      let m = function (y) {
        return Promise.all(
          y.map((S) =>
            Promise.resolve(S).then(
              (N) => ({ status: "fulfilled", value: N }),
              (N) => ({ status: "rejected", reason: N })
            )
          )
        );
      };
      var h = m;
      document.getElementsByTagName("link");
      const x = document.querySelector("meta[property=csp-nonce]"),
        g = x?.nonce || x?.getAttribute("nonce");
      f = m(
        u.map((y) => {
          if (((y = W0(y)), y in Uh)) return;
          Uh[y] = !0;
          const S = y.endsWith(".css"),
            N = S ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${y}"]${N}`)) return;
          const b = document.createElement("link");
          if (
            ((b.rel = S ? "stylesheet" : P0),
            S || (b.as = "script"),
            (b.crossOrigin = ""),
            (b.href = y),
            g && b.setAttribute("nonce", g),
            document.head.appendChild(b),
            S)
          )
            return new Promise((w, T) => {
              b.addEventListener("load", w),
                b.addEventListener("error", () =>
                  T(new Error(`Unable to preload CSS for ${y}`))
                );
            });
        })
      );
    }
    function d(x) {
      const g = new Event("vite:preloadError", { cancelable: !0 });
      if (((g.payload = x), window.dispatchEvent(g), !g.defaultPrevented))
        throw x;
    }
    return f.then((x) => {
      for (const g of x || []) g.status === "rejected" && d(g.reason);
      return i().catch(d);
    });
  };
async function I0() {
  const i = await await _m(() => Promise.resolve().then(() => Qv), [])
    .then((u) => u.navigatePromise)
    .catch((u) => (console.error(u), Promise.resolve(() => {})));
  window.REACT_APP_ROUTER = {
    push: (u, r) => {
      i(u, r);
    },
    replace: (u, r, f) => {
      i(u, { replace: !0, ...f });
    },
    forward: () => {
      i(1);
    },
    back: () => {
      i(-1);
    },
    refresh: () => {
      i(0);
    },
    prefetch: (u, r) => {
      i(u, r);
    },
  };
}
const Am = new Promise((s) => {
    I0().then(() => {
      s(window.REACT_APP_ROUTER);
    });
  }),
  bo = () => window.REACT_APP_ROUTER,
  Om = new Cs(window.parent),
  go = async (s, i) => {
    await Om.post("routeWillChange", { next: vo(s) }, i);
  };
function ex(s) {
  const i = document.querySelector(s);
  i && i.scrollIntoView({ behavior: "smooth" });
}
function tx() {
  const s = window.open;
  return (
    (window.open = function (i, u, r) {
      return i && typeof i == "string" && i.startsWith("#")
        ? (ex(i), null)
        : (s(i, "_blank", r), null);
    }),
    () => {
      window.open = s;
    }
  );
}
function nx() {
  const s = async (i) => {
    const r = i.target.closest("a");
    if (!r || r.tagName !== "A") return;
    const f = r.getAttribute("href");
    if (
      f &&
      !["#", "javascript:void(0)", ""].includes(f) &&
      !f.startsWith("#")
    ) {
      if ((i.preventDefault(), f.startsWith("/"))) {
        const d = bo();
        await go(f, { timeout: 500 });
        const h = vo(f);
        d.push(h);
        return;
      }
      window.open(r.href, "_blank");
    }
  };
  return (
    window.addEventListener("click", s, !0),
    () => {
      window.removeEventListener("click", s, !0);
    }
  );
}
const qh = (s) => s.startsWith("http://") || s.startsWith("https://");
function ax() {
  const s = () => {
    const i = bo(),
      u = i.push;
    i.push = async function (f, d, h) {
      return qh(f)
        ? (window.open(f, "_blank"), Promise.resolve(!1))
        : (await go(f, { timeout: 500 }), u.call(this, f, d, h));
    };
    const r = i.replace;
    i.replace = async function (f, d, h) {
      return qh(f)
        ? (window.open(f, "_blank"), Promise.resolve(!1))
        : (await go(f, { timeout: 500 }), r.call(this, f, d, h));
    };
  };
  return (
    window.addEventListener("load", s),
    () => {
      window.removeEventListener("load", s);
    }
  );
}
async function lx() {
  await Am;
  const s = tx(),
    i = nx(),
    u = ax();
  return () => {
    Om.destroy(), s(), i(), u();
  };
}
async function ix() {
  const s = await _m(() => Promise.resolve().then(() => Gv), void 0)
    .then((f) => f.default)
    .catch((f) => []);
  let i = [],
    u = 0;
  function r(f, d) {
    const { path: h = "", children: x, index: g } = f;
    u++;
    const m = g === !0 || h === "",
      y = h && h[0] === "/",
      S = h.slice(-1) === "/" ? h.slice(0, -1) : h,
      N = m ? d.path : `${d.path}/${S}`,
      b = y && !m ? h : N,
      w = { id: u, parentId: d.id, path: b };
    /\*/.test(w.path) || i.push(w), x && x.forEach((T) => r(T, w));
  }
  return s.forEach((f) => r(f, { id: 0, path: "" })), i;
}
async function sx() {
  const s = new Cs(window.parent),
    i = await ix();
  (window.REACT_APP_ROUTES = i),
    s.post("routes", { routes: i }),
    s.on("getRouteInfo", async (g) => i),
    await Am,
    s.on("routeAction", async (g) => {
      const m = bo(),
        { action: y, route: S } = g;
      switch (y) {
        case "goForward":
          m.forward();
          break;
        case "goBack":
          m.back();
          break;
        case "refresh":
          m.refresh();
          break;
        case "goTo":
          S && m.push(S);
          break;
        default:
          console.warn("Unknown action:", y);
      }
    });
  function u() {
    const g = window.history.state?.index ?? 0,
      m = window.history.length > g + 1,
      y = g > 0,
      S = window.location.pathname;
    s.post("updateNavigationState", {
      canGoForward: m,
      canGoBack: y,
      currentRoute: vo(S),
    });
  }
  function r() {
    const g = new MutationObserver((y) => {
        y.forEach((S) => {
          (S.type === "childList" || S.type === "characterData") &&
            s.post("titleChanged", { title: document.title });
        });
      }),
      m = document.querySelector("title");
    return (
      s.post("titleChanged", { title: document.title }),
      m && g.observe(m, { childList: !0, characterData: !0, subtree: !0 }),
      g
    );
  }
  let f = r();
  function d() {
    f.disconnect(),
      setTimeout(() => {
        f = r();
      }, 100);
  }
  const h = window.history.pushState,
    x = window.history.replaceState;
  return (
    (window.history.pushState = function (g, m, y) {
      h.apply(this, arguments), u(), d();
    }),
    (window.history.replaceState = function (g, m, y) {
      x.apply(this, arguments), u(), d();
    }),
    {
      destroy: () => {
        s.destroy(), f.disconnect();
      },
    }
  );
}
const rx = !0;
console.log("Is preview build:", rx);
async function ux() {
  $0(), lx(), F0(), sx();
}
ux();
var lo = { exports: {} },
  Hl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hh;
function ox() {
  if (Hh) return Hl;
  Hh = 1;
  var s = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.fragment");
  function u(r, f, d) {
    var h = null;
    if (
      (d !== void 0 && (h = "" + d),
      f.key !== void 0 && (h = "" + f.key),
      "key" in f)
    ) {
      d = {};
      for (var x in f) x !== "key" && (d[x] = f[x]);
    } else d = f;
    return (
      (f = d.ref),
      { $$typeof: s, type: r, key: h, ref: f !== void 0 ? f : null, props: d }
    );
  }
  return (Hl.Fragment = i), (Hl.jsx = u), (Hl.jsxs = u), Hl;
}
var Bh;
function cx() {
  return Bh || ((Bh = 1), (lo.exports = ox())), lo.exports;
}
var c = cx(),
  io = { exports: {} },
  ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var kh;
function fx() {
  if (kh) return ue;
  kh = 1;
  var s = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.portal"),
    u = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    f = Symbol.for("react.profiler"),
    d = Symbol.for("react.consumer"),
    h = Symbol.for("react.context"),
    x = Symbol.for("react.forward_ref"),
    g = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    y = Symbol.for("react.lazy"),
    S = Symbol.iterator;
  function N(E) {
    return E === null || typeof E != "object"
      ? null
      : ((E = (S && E[S]) || E["@@iterator"]),
        typeof E == "function" ? E : null);
  }
  var b = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    T = {};
  function C(E, k, $) {
    (this.props = E),
      (this.context = k),
      (this.refs = T),
      (this.updater = $ || b);
  }
  (C.prototype.isReactComponent = {}),
    (C.prototype.setState = function (E, k) {
      if (typeof E != "object" && typeof E != "function" && E != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, E, k, "setState");
    }),
    (C.prototype.forceUpdate = function (E) {
      this.updater.enqueueForceUpdate(this, E, "forceUpdate");
    });
  function D() {}
  D.prototype = C.prototype;
  function U(E, k, $) {
    (this.props = E),
      (this.context = k),
      (this.refs = T),
      (this.updater = $ || b);
  }
  var Q = (U.prototype = new D());
  (Q.constructor = U), w(Q, C.prototype), (Q.isPureReactComponent = !0);
  var P = Array.isArray,
    G = { H: null, A: null, T: null, S: null, V: null },
    I = Object.prototype.hasOwnProperty;
  function oe(E, k, $, K, te, ve) {
    return (
      ($ = ve.ref),
      { $$typeof: s, type: E, key: k, ref: $ !== void 0 ? $ : null, props: ve }
    );
  }
  function Se(E, k) {
    return oe(E.type, k, void 0, void 0, void 0, E.props);
  }
  function xe(E) {
    return typeof E == "object" && E !== null && E.$$typeof === s;
  }
  function V(E) {
    var k = { "=": "=0", ":": "=2" };
    return (
      "$" +
      E.replace(/[=:]/g, function ($) {
        return k[$];
      })
    );
  }
  var Z = /\/+/g;
  function F(E, k) {
    return typeof E == "object" && E !== null && E.key != null
      ? V("" + E.key)
      : k.toString(36);
  }
  function le() {}
  function me(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (
          (typeof E.status == "string"
            ? E.then(le, le)
            : ((E.status = "pending"),
              E.then(
                function (k) {
                  E.status === "pending" &&
                    ((E.status = "fulfilled"), (E.value = k));
                },
                function (k) {
                  E.status === "pending" &&
                    ((E.status = "rejected"), (E.reason = k));
                }
              )),
          E.status)
        ) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function ge(E, k, $, K, te) {
    var ve = typeof E;
    (ve === "undefined" || ve === "boolean") && (E = null);
    var re = !1;
    if (E === null) re = !0;
    else
      switch (ve) {
        case "bigint":
        case "string":
        case "number":
          re = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case s:
            case i:
              re = !0;
              break;
            case y:
              return (re = E._init), ge(re(E._payload), k, $, K, te);
          }
      }
    if (re)
      return (
        (te = te(E)),
        (re = K === "" ? "." + F(E, 0) : K),
        P(te)
          ? (($ = ""),
            re != null && ($ = re.replace(Z, "$&/") + "/"),
            ge(te, k, $, "", function (ln) {
              return ln;
            }))
          : te != null &&
            (xe(te) &&
              (te = Se(
                te,
                $ +
                  (te.key == null || (E && E.key === te.key)
                    ? ""
                    : ("" + te.key).replace(Z, "$&/") + "/") +
                  re
              )),
            k.push(te)),
        1
      );
    re = 0;
    var st = K === "" ? "." : K + ":";
    if (P(E))
      for (var Te = 0; Te < E.length; Te++)
        (K = E[Te]), (ve = st + F(K, Te)), (re += ge(K, k, $, ve, te));
    else if (((Te = N(E)), typeof Te == "function"))
      for (E = Te.call(E), Te = 0; !(K = E.next()).done; )
        (K = K.value), (ve = st + F(K, Te++)), (re += ge(K, k, $, ve, te));
    else if (ve === "object") {
      if (typeof E.then == "function") return ge(me(E), k, $, K, te);
      throw (
        ((k = String(E)),
        Error(
          "Objects are not valid as a React child (found: " +
            (k === "[object Object]"
              ? "object with keys {" + Object.keys(E).join(", ") + "}"
              : k) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return re;
  }
  function q(E, k, $) {
    if (E == null) return E;
    var K = [],
      te = 0;
    return (
      ge(E, K, "", "", function (ve) {
        return k.call($, ve, te++);
      }),
      K
    );
  }
  function X(E) {
    if (E._status === -1) {
      var k = E._result;
      (k = k()),
        k.then(
          function ($) {
            (E._status === 0 || E._status === -1) &&
              ((E._status = 1), (E._result = $));
          },
          function ($) {
            (E._status === 0 || E._status === -1) &&
              ((E._status = 2), (E._result = $));
          }
        ),
        E._status === -1 && ((E._status = 0), (E._result = k));
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var ee =
    typeof reportError == "function"
      ? reportError
      : function (E) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var k = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof E == "object" &&
                E !== null &&
                typeof E.message == "string"
                  ? String(E.message)
                  : String(E),
              error: E,
            });
            if (!window.dispatchEvent(k)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", E);
            return;
          }
          console.error(E);
        };
  function ye() {}
  return (
    (ue.Children = {
      map: q,
      forEach: function (E, k, $) {
        q(
          E,
          function () {
            k.apply(this, arguments);
          },
          $
        );
      },
      count: function (E) {
        var k = 0;
        return (
          q(E, function () {
            k++;
          }),
          k
        );
      },
      toArray: function (E) {
        return (
          q(E, function (k) {
            return k;
          }) || []
        );
      },
      only: function (E) {
        if (!xe(E))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return E;
      },
    }),
    (ue.Component = C),
    (ue.Fragment = u),
    (ue.Profiler = f),
    (ue.PureComponent = U),
    (ue.StrictMode = r),
    (ue.Suspense = g),
    (ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G),
    (ue.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (E) {
        return G.H.useMemoCache(E);
      },
    }),
    (ue.cache = function (E) {
      return function () {
        return E.apply(null, arguments);
      };
    }),
    (ue.cloneElement = function (E, k, $) {
      if (E == null)
        throw Error(
          "The argument must be a React element, but you passed " + E + "."
        );
      var K = w({}, E.props),
        te = E.key,
        ve = void 0;
      if (k != null)
        for (re in (k.ref !== void 0 && (ve = void 0),
        k.key !== void 0 && (te = "" + k.key),
        k))
          !I.call(k, re) ||
            re === "key" ||
            re === "__self" ||
            re === "__source" ||
            (re === "ref" && k.ref === void 0) ||
            (K[re] = k[re]);
      var re = arguments.length - 2;
      if (re === 1) K.children = $;
      else if (1 < re) {
        for (var st = Array(re), Te = 0; Te < re; Te++)
          st[Te] = arguments[Te + 2];
        K.children = st;
      }
      return oe(E.type, te, void 0, void 0, ve, K);
    }),
    (ue.createContext = function (E) {
      return (
        (E = {
          $$typeof: h,
          _currentValue: E,
          _currentValue2: E,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (E.Provider = E),
        (E.Consumer = { $$typeof: d, _context: E }),
        E
      );
    }),
    (ue.createElement = function (E, k, $) {
      var K,
        te = {},
        ve = null;
      if (k != null)
        for (K in (k.key !== void 0 && (ve = "" + k.key), k))
          I.call(k, K) &&
            K !== "key" &&
            K !== "__self" &&
            K !== "__source" &&
            (te[K] = k[K]);
      var re = arguments.length - 2;
      if (re === 1) te.children = $;
      else if (1 < re) {
        for (var st = Array(re), Te = 0; Te < re; Te++)
          st[Te] = arguments[Te + 2];
        te.children = st;
      }
      if (E && E.defaultProps)
        for (K in ((re = E.defaultProps), re))
          te[K] === void 0 && (te[K] = re[K]);
      return oe(E, ve, void 0, void 0, null, te);
    }),
    (ue.createRef = function () {
      return { current: null };
    }),
    (ue.forwardRef = function (E) {
      return { $$typeof: x, render: E };
    }),
    (ue.isValidElement = xe),
    (ue.lazy = function (E) {
      return { $$typeof: y, _payload: { _status: -1, _result: E }, _init: X };
    }),
    (ue.memo = function (E, k) {
      return { $$typeof: m, type: E, compare: k === void 0 ? null : k };
    }),
    (ue.startTransition = function (E) {
      var k = G.T,
        $ = {};
      G.T = $;
      try {
        var K = E(),
          te = G.S;
        te !== null && te($, K),
          typeof K == "object" &&
            K !== null &&
            typeof K.then == "function" &&
            K.then(ye, ee);
      } catch (ve) {
        ee(ve);
      } finally {
        G.T = k;
      }
    }),
    (ue.unstable_useCacheRefresh = function () {
      return G.H.useCacheRefresh();
    }),
    (ue.use = function (E) {
      return G.H.use(E);
    }),
    (ue.useActionState = function (E, k, $) {
      return G.H.useActionState(E, k, $);
    }),
    (ue.useCallback = function (E, k) {
      return G.H.useCallback(E, k);
    }),
    (ue.useContext = function (E) {
      return G.H.useContext(E);
    }),
    (ue.useDebugValue = function () {}),
    (ue.useDeferredValue = function (E, k) {
      return G.H.useDeferredValue(E, k);
    }),
    (ue.useEffect = function (E, k, $) {
      var K = G.H;
      if (typeof $ == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React."
        );
      return K.useEffect(E, k);
    }),
    (ue.useId = function () {
      return G.H.useId();
    }),
    (ue.useImperativeHandle = function (E, k, $) {
      return G.H.useImperativeHandle(E, k, $);
    }),
    (ue.useInsertionEffect = function (E, k) {
      return G.H.useInsertionEffect(E, k);
    }),
    (ue.useLayoutEffect = function (E, k) {
      return G.H.useLayoutEffect(E, k);
    }),
    (ue.useMemo = function (E, k) {
      return G.H.useMemo(E, k);
    }),
    (ue.useOptimistic = function (E, k) {
      return G.H.useOptimistic(E, k);
    }),
    (ue.useReducer = function (E, k, $) {
      return G.H.useReducer(E, k, $);
    }),
    (ue.useRef = function (E) {
      return G.H.useRef(E);
    }),
    (ue.useState = function (E) {
      return G.H.useState(E);
    }),
    (ue.useSyncExternalStore = function (E, k, $) {
      return G.H.useSyncExternalStore(E, k, $);
    }),
    (ue.useTransition = function () {
      return G.H.useTransition();
    }),
    (ue.version = "19.1.1"),
    ue
  );
}
var Yh;
function So() {
  return Yh || ((Yh = 1), (io.exports = fx())), io.exports;
}
var z = So();
const se = (s) => typeof s == "string",
  Bl = () => {
    let s, i;
    const u = new Promise((r, f) => {
      (s = r), (i = f);
    });
    return (u.resolve = s), (u.reject = i), u;
  },
  Gh = (s) => (s == null ? "" : "" + s),
  dx = (s, i, u) => {
    s.forEach((r) => {
      i[r] && (u[r] = i[r]);
    });
  },
  hx = /###/g,
  Vh = (s) => (s && s.indexOf("###") > -1 ? s.replace(hx, ".") : s),
  Qh = (s) => !s || se(s),
  Vl = (s, i, u) => {
    const r = se(i) ? i.split(".") : i;
    let f = 0;
    for (; f < r.length - 1; ) {
      if (Qh(s)) return {};
      const d = Vh(r[f]);
      !s[d] && u && (s[d] = new u()),
        Object.prototype.hasOwnProperty.call(s, d) ? (s = s[d]) : (s = {}),
        ++f;
    }
    return Qh(s) ? {} : { obj: s, k: Vh(r[f]) };
  },
  Xh = (s, i, u) => {
    const { obj: r, k: f } = Vl(s, i, Object);
    if (r !== void 0 || i.length === 1) {
      r[f] = u;
      return;
    }
    let d = i[i.length - 1],
      h = i.slice(0, i.length - 1),
      x = Vl(s, h, Object);
    for (; x.obj === void 0 && h.length; )
      (d = `${h[h.length - 1]}.${d}`),
        (h = h.slice(0, h.length - 1)),
        (x = Vl(s, h, Object)),
        x?.obj && typeof x.obj[`${x.k}.${d}`] < "u" && (x.obj = void 0);
    x.obj[`${x.k}.${d}`] = u;
  },
  mx = (s, i, u, r) => {
    const { obj: f, k: d } = Vl(s, i, Object);
    (f[d] = f[d] || []), f[d].push(u);
  },
  Ns = (s, i) => {
    const { obj: u, k: r } = Vl(s, i);
    if (u && Object.prototype.hasOwnProperty.call(u, r)) return u[r];
  },
  gx = (s, i, u) => {
    const r = Ns(s, u);
    return r !== void 0 ? r : Ns(i, u);
  },
  Tm = (s, i, u) => {
    for (const r in i)
      r !== "__proto__" &&
        r !== "constructor" &&
        (r in s
          ? se(s[r]) ||
            s[r] instanceof String ||
            se(i[r]) ||
            i[r] instanceof String
            ? u && (s[r] = i[r])
            : Tm(s[r], i[r], u)
          : (s[r] = i[r]));
    return s;
  },
  Da = (s) => s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var px = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};
const xx = (s) => (se(s) ? s.replace(/[&<>"'\/]/g, (i) => px[i]) : s);
class yx {
  constructor(i) {
    (this.capacity = i), (this.regExpMap = new Map()), (this.regExpQueue = []);
  }
  getRegExp(i) {
    const u = this.regExpMap.get(i);
    if (u !== void 0) return u;
    const r = new RegExp(i);
    return (
      this.regExpQueue.length === this.capacity &&
        this.regExpMap.delete(this.regExpQueue.shift()),
      this.regExpMap.set(i, r),
      this.regExpQueue.push(i),
      r
    );
  }
}
const vx = [" ", ",", "?", "!", ";"],
  bx = new yx(20),
  Sx = (s, i, u) => {
    (i = i || ""), (u = u || "");
    const r = vx.filter((h) => i.indexOf(h) < 0 && u.indexOf(h) < 0);
    if (r.length === 0) return !0;
    const f = bx.getRegExp(
      `(${r.map((h) => (h === "?" ? "\\?" : h)).join("|")})`
    );
    let d = !f.test(s);
    if (!d) {
      const h = s.indexOf(u);
      h > 0 && !f.test(s.substring(0, h)) && (d = !0);
    }
    return d;
  },
  po = (s, i, u = ".") => {
    if (!s) return;
    if (s[i]) return Object.prototype.hasOwnProperty.call(s, i) ? s[i] : void 0;
    const r = i.split(u);
    let f = s;
    for (let d = 0; d < r.length; ) {
      if (!f || typeof f != "object") return;
      let h,
        x = "";
      for (let g = d; g < r.length; ++g)
        if ((g !== d && (x += u), (x += r[g]), (h = f[x]), h !== void 0)) {
          if (
            ["string", "number", "boolean"].indexOf(typeof h) > -1 &&
            g < r.length - 1
          )
            continue;
          d += g - d + 1;
          break;
        }
      f = h;
    }
    return f;
  },
  Ql = (s) => s?.replace("_", "-"),
  Nx = {
    type: "logger",
    log(s) {
      this.output("log", s);
    },
    warn(s) {
      this.output("warn", s);
    },
    error(s) {
      this.output("error", s);
    },
    output(s, i) {
      console?.[s]?.apply?.(console, i);
    },
  };
class js {
  constructor(i, u = {}) {
    this.init(i, u);
  }
  init(i, u = {}) {
    (this.prefix = u.prefix || "i18next:"),
      (this.logger = i || Nx),
      (this.options = u),
      (this.debug = u.debug);
  }
  log(...i) {
    return this.forward(i, "log", "", !0);
  }
  warn(...i) {
    return this.forward(i, "warn", "", !0);
  }
  error(...i) {
    return this.forward(i, "error", "");
  }
  deprecate(...i) {
    return this.forward(i, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(i, u, r, f) {
    return f && !this.debug
      ? null
      : (se(i[0]) && (i[0] = `${r}${this.prefix} ${i[0]}`), this.logger[u](i));
  }
  create(i) {
    return new js(this.logger, {
      prefix: `${this.prefix}:${i}:`,
      ...this.options,
    });
  }
  clone(i) {
    return (
      (i = i || this.options),
      (i.prefix = i.prefix || this.prefix),
      new js(this.logger, i)
    );
  }
}
var Ut = new js();
class As {
  constructor() {
    this.observers = {};
  }
  on(i, u) {
    return (
      i.split(" ").forEach((r) => {
        this.observers[r] || (this.observers[r] = new Map());
        const f = this.observers[r].get(u) || 0;
        this.observers[r].set(u, f + 1);
      }),
      this
    );
  }
  off(i, u) {
    if (this.observers[i]) {
      if (!u) {
        delete this.observers[i];
        return;
      }
      this.observers[i].delete(u);
    }
  }
  emit(i, ...u) {
    this.observers[i] &&
      Array.from(this.observers[i].entries()).forEach(([f, d]) => {
        for (let h = 0; h < d; h++) f(...u);
      }),
      this.observers["*"] &&
        Array.from(this.observers["*"].entries()).forEach(([f, d]) => {
          for (let h = 0; h < d; h++) f.apply(f, [i, ...u]);
        });
  }
}
class Zh extends As {
  constructor(i, u = { ns: ["translation"], defaultNS: "translation" }) {
    super(),
      (this.data = i || {}),
      (this.options = u),
      this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
      this.options.ignoreJSONStructure === void 0 &&
        (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(i) {
    this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
  }
  removeNamespaces(i) {
    const u = this.options.ns.indexOf(i);
    u > -1 && this.options.ns.splice(u, 1);
  }
  getResource(i, u, r, f = {}) {
    const d =
        f.keySeparator !== void 0 ? f.keySeparator : this.options.keySeparator,
      h =
        f.ignoreJSONStructure !== void 0
          ? f.ignoreJSONStructure
          : this.options.ignoreJSONStructure;
    let x;
    i.indexOf(".") > -1
      ? (x = i.split("."))
      : ((x = [i, u]),
        r &&
          (Array.isArray(r)
            ? x.push(...r)
            : se(r) && d
            ? x.push(...r.split(d))
            : x.push(r)));
    const g = Ns(this.data, x);
    return (
      !g &&
        !u &&
        !r &&
        i.indexOf(".") > -1 &&
        ((i = x[0]), (u = x[1]), (r = x.slice(2).join("."))),
      g || !h || !se(r) ? g : po(this.data?.[i]?.[u], r, d)
    );
  }
  addResource(i, u, r, f, d = { silent: !1 }) {
    const h =
      d.keySeparator !== void 0 ? d.keySeparator : this.options.keySeparator;
    let x = [i, u];
    r && (x = x.concat(h ? r.split(h) : r)),
      i.indexOf(".") > -1 && ((x = i.split(".")), (f = u), (u = x[1])),
      this.addNamespaces(u),
      Xh(this.data, x, f),
      d.silent || this.emit("added", i, u, r, f);
  }
  addResources(i, u, r, f = { silent: !1 }) {
    for (const d in r)
      (se(r[d]) || Array.isArray(r[d])) &&
        this.addResource(i, u, d, r[d], { silent: !0 });
    f.silent || this.emit("added", i, u, r);
  }
  addResourceBundle(i, u, r, f, d, h = { silent: !1, skipCopy: !1 }) {
    let x = [i, u];
    i.indexOf(".") > -1 && ((x = i.split(".")), (f = r), (r = u), (u = x[1])),
      this.addNamespaces(u);
    let g = Ns(this.data, x) || {};
    h.skipCopy || (r = JSON.parse(JSON.stringify(r))),
      f ? Tm(g, r, d) : (g = { ...g, ...r }),
      Xh(this.data, x, g),
      h.silent || this.emit("added", i, u, r);
  }
  removeResourceBundle(i, u) {
    this.hasResourceBundle(i, u) && delete this.data[i][u],
      this.removeNamespaces(u),
      this.emit("removed", i, u);
  }
  hasResourceBundle(i, u) {
    return this.getResource(i, u) !== void 0;
  }
  getResourceBundle(i, u) {
    return u || (u = this.options.defaultNS), this.getResource(i, u);
  }
  getDataByLanguage(i) {
    return this.data[i];
  }
  hasLanguageSomeTranslations(i) {
    const u = this.getDataByLanguage(i);
    return !!((u && Object.keys(u)) || []).find(
      (f) => u[f] && Object.keys(u[f]).length > 0
    );
  }
  toJSON() {
    return this.data;
  }
}
var Rm = {
  processors: {},
  addPostProcessor(s) {
    this.processors[s.name] = s;
  },
  handle(s, i, u, r, f) {
    return (
      s.forEach((d) => {
        i = this.processors[d]?.process(i, u, r, f) ?? i;
      }),
      i
    );
  },
};
const Mm = Symbol("i18next/PATH_KEY");
function jx() {
  const s = [],
    i = Object.create(null);
  let u;
  return (
    (i.get = (r, f) => (
      u?.revoke?.(),
      f === Mm ? s : (s.push(f), (u = Proxy.revocable(r, i)), u.proxy)
    )),
    Proxy.revocable(Object.create(null), i).proxy
  );
}
function xo(s, i) {
  const { [Mm]: u } = s(jx());
  return u.join(i?.keySeparator ?? ".");
}
const Kh = {},
  $h = (s) => !se(s) && typeof s != "boolean" && typeof s != "number";
class ws extends As {
  constructor(i, u = {}) {
    super(),
      dx(
        [
          "resourceStore",
          "languageUtils",
          "pluralResolver",
          "interpolator",
          "backendConnector",
          "i18nFormat",
          "utils",
        ],
        i,
        this
      ),
      (this.options = u),
      this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
      (this.logger = Ut.create("translator"));
  }
  changeLanguage(i) {
    i && (this.language = i);
  }
  exists(i, u = { interpolation: {} }) {
    const r = { ...u };
    return i == null ? !1 : this.resolve(i, r)?.res !== void 0;
  }
  extractFromKey(i, u) {
    let r = u.nsSeparator !== void 0 ? u.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const f =
      u.keySeparator !== void 0 ? u.keySeparator : this.options.keySeparator;
    let d = u.ns || this.options.defaultNS || [];
    const h = r && i.indexOf(r) > -1,
      x =
        !this.options.userDefinedKeySeparator &&
        !u.keySeparator &&
        !this.options.userDefinedNsSeparator &&
        !u.nsSeparator &&
        !Sx(i, r, f);
    if (h && !x) {
      const g = i.match(this.interpolator.nestingRegexp);
      if (g && g.length > 0) return { key: i, namespaces: se(d) ? [d] : d };
      const m = i.split(r);
      (r !== f || (r === f && this.options.ns.indexOf(m[0]) > -1)) &&
        (d = m.shift()),
        (i = m.join(f));
    }
    return { key: i, namespaces: se(d) ? [d] : d };
  }
  translate(i, u, r) {
    let f = typeof u == "object" ? { ...u } : u;
    if (
      (typeof f != "object" &&
        this.options.overloadTranslationOptionHandler &&
        (f = this.options.overloadTranslationOptionHandler(arguments)),
      typeof options == "object" && (f = { ...f }),
      f || (f = {}),
      i == null)
    )
      return "";
    typeof i == "function" && (i = xo(i, f)),
      Array.isArray(i) || (i = [String(i)]);
    const d =
        f.returnDetails !== void 0
          ? f.returnDetails
          : this.options.returnDetails,
      h =
        f.keySeparator !== void 0 ? f.keySeparator : this.options.keySeparator,
      { key: x, namespaces: g } = this.extractFromKey(i[i.length - 1], f),
      m = g[g.length - 1];
    let y = f.nsSeparator !== void 0 ? f.nsSeparator : this.options.nsSeparator;
    y === void 0 && (y = ":");
    const S = f.lng || this.language,
      N = f.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (S?.toLowerCase() === "cimode")
      return N
        ? d
          ? {
              res: `${m}${y}${x}`,
              usedKey: x,
              exactUsedKey: x,
              usedLng: S,
              usedNS: m,
              usedParams: this.getUsedParamsDetails(f),
            }
          : `${m}${y}${x}`
        : d
        ? {
            res: x,
            usedKey: x,
            exactUsedKey: x,
            usedLng: S,
            usedNS: m,
            usedParams: this.getUsedParamsDetails(f),
          }
        : x;
    const b = this.resolve(i, f);
    let w = b?.res;
    const T = b?.usedKey || x,
      C = b?.exactUsedKey || x,
      D = ["[object Number]", "[object Function]", "[object RegExp]"],
      U = f.joinArrays !== void 0 ? f.joinArrays : this.options.joinArrays,
      Q = !this.i18nFormat || this.i18nFormat.handleAsObject,
      P = f.count !== void 0 && !se(f.count),
      G = ws.hasDefaultValue(f),
      I = P ? this.pluralResolver.getSuffix(S, f.count, f) : "",
      oe =
        f.ordinal && P
          ? this.pluralResolver.getSuffix(S, f.count, { ordinal: !1 })
          : "",
      Se = P && !f.ordinal && f.count === 0,
      xe =
        (Se && f[`defaultValue${this.options.pluralSeparator}zero`]) ||
        f[`defaultValue${I}`] ||
        f[`defaultValue${oe}`] ||
        f.defaultValue;
    let V = w;
    Q && !w && G && (V = xe);
    const Z = $h(V),
      F = Object.prototype.toString.apply(V);
    if (Q && V && Z && D.indexOf(F) < 0 && !(se(U) && Array.isArray(V))) {
      if (!f.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler ||
          this.logger.warn(
            "accessing an object - but returnObjects options is not enabled!"
          );
        const le = this.options.returnedObjectHandler
          ? this.options.returnedObjectHandler(T, V, { ...f, ns: g })
          : `key '${x} (${this.language})' returned an object instead of string.`;
        return d
          ? ((b.res = le), (b.usedParams = this.getUsedParamsDetails(f)), b)
          : le;
      }
      if (h) {
        const le = Array.isArray(V),
          me = le ? [] : {},
          ge = le ? C : T;
        for (const q in V)
          if (Object.prototype.hasOwnProperty.call(V, q)) {
            const X = `${ge}${h}${q}`;
            G && !w
              ? (me[q] = this.translate(X, {
                  ...f,
                  defaultValue: $h(xe) ? xe[q] : void 0,
                  joinArrays: !1,
                  ns: g,
                }))
              : (me[q] = this.translate(X, { ...f, joinArrays: !1, ns: g })),
              me[q] === X && (me[q] = V[q]);
          }
        w = me;
      }
    } else if (Q && se(U) && Array.isArray(w))
      (w = w.join(U)), w && (w = this.extendTranslation(w, i, f, r));
    else {
      let le = !1,
        me = !1;
      !this.isValidLookup(w) && G && ((le = !0), (w = xe)),
        this.isValidLookup(w) || ((me = !0), (w = x));
      const q =
          (f.missingKeyNoValueFallbackToKey ||
            this.options.missingKeyNoValueFallbackToKey) &&
          me
            ? void 0
            : w,
        X = G && xe !== w && this.options.updateMissing;
      if (me || le || X) {
        if (
          (this.logger.log(X ? "updateKey" : "missingKey", S, m, x, X ? xe : w),
          h)
        ) {
          const k = this.resolve(x, { ...f, keySeparator: !1 });
          k &&
            k.res &&
            this.logger.warn(
              "Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format."
            );
        }
        let ee = [];
        const ye = this.languageUtils.getFallbackCodes(
          this.options.fallbackLng,
          f.lng || this.language
        );
        if (this.options.saveMissingTo === "fallback" && ye && ye[0])
          for (let k = 0; k < ye.length; k++) ee.push(ye[k]);
        else
          this.options.saveMissingTo === "all"
            ? (ee = this.languageUtils.toResolveHierarchy(
                f.lng || this.language
              ))
            : ee.push(f.lng || this.language);
        const E = (k, $, K) => {
          const te = G && K !== w ? K : q;
          this.options.missingKeyHandler
            ? this.options.missingKeyHandler(k, m, $, te, X, f)
            : this.backendConnector?.saveMissing &&
              this.backendConnector.saveMissing(k, m, $, te, X, f),
            this.emit("missingKey", k, m, $, w);
        };
        this.options.saveMissing &&
          (this.options.saveMissingPlurals && P
            ? ee.forEach((k) => {
                const $ = this.pluralResolver.getSuffixes(k, f);
                Se &&
                  f[`defaultValue${this.options.pluralSeparator}zero`] &&
                  $.indexOf(`${this.options.pluralSeparator}zero`) < 0 &&
                  $.push(`${this.options.pluralSeparator}zero`),
                  $.forEach((K) => {
                    E([k], x + K, f[`defaultValue${K}`] || xe);
                  });
              })
            : E(ee, x, xe));
      }
      (w = this.extendTranslation(w, i, f, b, r)),
        me &&
          w === x &&
          this.options.appendNamespaceToMissingKey &&
          (w = `${m}${y}${x}`),
        (me || le) &&
          this.options.parseMissingKeyHandler &&
          (w = this.options.parseMissingKeyHandler(
            this.options.appendNamespaceToMissingKey ? `${m}${y}${x}` : x,
            le ? w : void 0,
            f
          ));
    }
    return d
      ? ((b.res = w), (b.usedParams = this.getUsedParamsDetails(f)), b)
      : w;
  }
  extendTranslation(i, u, r, f, d) {
    if (this.i18nFormat?.parse)
      i = this.i18nFormat.parse(
        i,
        { ...this.options.interpolation.defaultVariables, ...r },
        r.lng || this.language || f.usedLng,
        f.usedNS,
        f.usedKey,
        { resolved: f }
      );
    else if (!r.skipInterpolation) {
      r.interpolation &&
        this.interpolator.init({
          ...r,
          interpolation: { ...this.options.interpolation, ...r.interpolation },
        });
      const g =
        se(i) &&
        (r?.interpolation?.skipOnVariables !== void 0
          ? r.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables);
      let m;
      if (g) {
        const S = i.match(this.interpolator.nestingRegexp);
        m = S && S.length;
      }
      let y = r.replace && !se(r.replace) ? r.replace : r;
      if (
        (this.options.interpolation.defaultVariables &&
          (y = { ...this.options.interpolation.defaultVariables, ...y }),
        (i = this.interpolator.interpolate(
          i,
          y,
          r.lng || this.language || f.usedLng,
          r
        )),
        g)
      ) {
        const S = i.match(this.interpolator.nestingRegexp),
          N = S && S.length;
        m < N && (r.nest = !1);
      }
      !r.lng && f && f.res && (r.lng = this.language || f.usedLng),
        r.nest !== !1 &&
          (i = this.interpolator.nest(
            i,
            (...S) =>
              d?.[0] === S[0] && !r.context
                ? (this.logger.warn(
                    `It seems you are nesting recursively key: ${S[0]} in key: ${u[0]}`
                  ),
                  null)
                : this.translate(...S, u),
            r
          )),
        r.interpolation && this.interpolator.reset();
    }
    const h = r.postProcess || this.options.postProcess,
      x = se(h) ? [h] : h;
    return (
      i != null &&
        x?.length &&
        r.applyPostProcessor !== !1 &&
        (i = Rm.handle(
          x,
          i,
          u,
          this.options && this.options.postProcessPassResolved
            ? {
                i18nResolved: {
                  ...f,
                  usedParams: this.getUsedParamsDetails(r),
                },
                ...r,
              }
            : r,
          this
        )),
      i
    );
  }
  resolve(i, u = {}) {
    let r, f, d, h, x;
    return (
      se(i) && (i = [i]),
      i.forEach((g) => {
        if (this.isValidLookup(r)) return;
        const m = this.extractFromKey(g, u),
          y = m.key;
        f = y;
        let S = m.namespaces;
        this.options.fallbackNS && (S = S.concat(this.options.fallbackNS));
        const N = u.count !== void 0 && !se(u.count),
          b = N && !u.ordinal && u.count === 0,
          w =
            u.context !== void 0 &&
            (se(u.context) || typeof u.context == "number") &&
            u.context !== "",
          T = u.lngs
            ? u.lngs
            : this.languageUtils.toResolveHierarchy(
                u.lng || this.language,
                u.fallbackLng
              );
        S.forEach((C) => {
          this.isValidLookup(r) ||
            ((x = C),
            !Kh[`${T[0]}-${C}`] &&
              this.utils?.hasLoadedNamespace &&
              !this.utils?.hasLoadedNamespace(x) &&
              ((Kh[`${T[0]}-${C}`] = !0),
              this.logger.warn(
                `key "${f}" for languages "${T.join(
                  ", "
                )}" won't get resolved as namespace "${x}" was not yet loaded`,
                "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
              )),
            T.forEach((D) => {
              if (this.isValidLookup(r)) return;
              h = D;
              const U = [y];
              if (this.i18nFormat?.addLookupKeys)
                this.i18nFormat.addLookupKeys(U, y, D, C, u);
              else {
                let P;
                N && (P = this.pluralResolver.getSuffix(D, u.count, u));
                const G = `${this.options.pluralSeparator}zero`,
                  I = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                if (
                  (N &&
                    (u.ordinal &&
                      P.indexOf(I) === 0 &&
                      U.push(y + P.replace(I, this.options.pluralSeparator)),
                    U.push(y + P),
                    b && U.push(y + G)),
                  w)
                ) {
                  const oe = `${y}${this.options.contextSeparator || "_"}${
                    u.context
                  }`;
                  U.push(oe),
                    N &&
                      (u.ordinal &&
                        P.indexOf(I) === 0 &&
                        U.push(oe + P.replace(I, this.options.pluralSeparator)),
                      U.push(oe + P),
                      b && U.push(oe + G));
                }
              }
              let Q;
              for (; (Q = U.pop()); )
                this.isValidLookup(r) ||
                  ((d = Q), (r = this.getResource(D, C, Q, u)));
            }));
        });
      }),
      { res: r, usedKey: f, exactUsedKey: d, usedLng: h, usedNS: x }
    );
  }
  isValidLookup(i) {
    return (
      i !== void 0 &&
      !(!this.options.returnNull && i === null) &&
      !(!this.options.returnEmptyString && i === "")
    );
  }
  getResource(i, u, r, f = {}) {
    return this.i18nFormat?.getResource
      ? this.i18nFormat.getResource(i, u, r, f)
      : this.resourceStore.getResource(i, u, r, f);
  }
  getUsedParamsDetails(i = {}) {
    const u = [
        "defaultValue",
        "ordinal",
        "context",
        "replace",
        "lng",
        "lngs",
        "fallbackLng",
        "ns",
        "keySeparator",
        "nsSeparator",
        "returnObjects",
        "returnDetails",
        "joinArrays",
        "postProcess",
        "interpolation",
      ],
      r = i.replace && !se(i.replace);
    let f = r ? i.replace : i;
    if (
      (r && typeof i.count < "u" && (f.count = i.count),
      this.options.interpolation.defaultVariables &&
        (f = { ...this.options.interpolation.defaultVariables, ...f }),
      !r)
    ) {
      f = { ...f };
      for (const d of u) delete f[d];
    }
    return f;
  }
  static hasDefaultValue(i) {
    const u = "defaultValue";
    for (const r in i)
      if (
        Object.prototype.hasOwnProperty.call(i, r) &&
        u === r.substring(0, u.length) &&
        i[r] !== void 0
      )
        return !0;
    return !1;
  }
}
class Jh {
  constructor(i) {
    (this.options = i),
      (this.supportedLngs = this.options.supportedLngs || !1),
      (this.logger = Ut.create("languageUtils"));
  }
  getScriptPartFromCode(i) {
    if (((i = Ql(i)), !i || i.indexOf("-") < 0)) return null;
    const u = i.split("-");
    return u.length === 2 || (u.pop(), u[u.length - 1].toLowerCase() === "x")
      ? null
      : this.formatLanguageCode(u.join("-"));
  }
  getLanguagePartFromCode(i) {
    if (((i = Ql(i)), !i || i.indexOf("-") < 0)) return i;
    const u = i.split("-");
    return this.formatLanguageCode(u[0]);
  }
  formatLanguageCode(i) {
    if (se(i) && i.indexOf("-") > -1) {
      let u;
      try {
        u = Intl.getCanonicalLocales(i)[0];
      } catch {}
      return (
        u && this.options.lowerCaseLng && (u = u.toLowerCase()),
        u || (this.options.lowerCaseLng ? i.toLowerCase() : i)
      );
    }
    return this.options.cleanCode || this.options.lowerCaseLng
      ? i.toLowerCase()
      : i;
  }
  isSupportedCode(i) {
    return (
      (this.options.load === "languageOnly" ||
        this.options.nonExplicitSupportedLngs) &&
        (i = this.getLanguagePartFromCode(i)),
      !this.supportedLngs ||
        !this.supportedLngs.length ||
        this.supportedLngs.indexOf(i) > -1
    );
  }
  getBestMatchFromCodes(i) {
    if (!i) return null;
    let u;
    return (
      i.forEach((r) => {
        if (u) return;
        const f = this.formatLanguageCode(r);
        (!this.options.supportedLngs || this.isSupportedCode(f)) && (u = f);
      }),
      !u &&
        this.options.supportedLngs &&
        i.forEach((r) => {
          if (u) return;
          const f = this.getScriptPartFromCode(r);
          if (this.isSupportedCode(f)) return (u = f);
          const d = this.getLanguagePartFromCode(r);
          if (this.isSupportedCode(d)) return (u = d);
          u = this.options.supportedLngs.find((h) => {
            if (h === d) return h;
            if (
              !(h.indexOf("-") < 0 && d.indexOf("-") < 0) &&
              ((h.indexOf("-") > 0 &&
                d.indexOf("-") < 0 &&
                h.substring(0, h.indexOf("-")) === d) ||
                (h.indexOf(d) === 0 && d.length > 1))
            )
              return h;
          });
        }),
      u || (u = this.getFallbackCodes(this.options.fallbackLng)[0]),
      u
    );
  }
  getFallbackCodes(i, u) {
    if (!i) return [];
    if (
      (typeof i == "function" && (i = i(u)),
      se(i) && (i = [i]),
      Array.isArray(i))
    )
      return i;
    if (!u) return i.default || [];
    let r = i[u];
    return (
      r || (r = i[this.getScriptPartFromCode(u)]),
      r || (r = i[this.formatLanguageCode(u)]),
      r || (r = i[this.getLanguagePartFromCode(u)]),
      r || (r = i.default),
      r || []
    );
  }
  toResolveHierarchy(i, u) {
    const r = this.getFallbackCodes(
        (u === !1 ? [] : u) || this.options.fallbackLng || [],
        i
      ),
      f = [],
      d = (h) => {
        h &&
          (this.isSupportedCode(h)
            ? f.push(h)
            : this.logger.warn(
                `rejecting language code not found in supportedLngs: ${h}`
              ));
      };
    return (
      se(i) && (i.indexOf("-") > -1 || i.indexOf("_") > -1)
        ? (this.options.load !== "languageOnly" &&
            d(this.formatLanguageCode(i)),
          this.options.load !== "languageOnly" &&
            this.options.load !== "currentOnly" &&
            d(this.getScriptPartFromCode(i)),
          this.options.load !== "currentOnly" &&
            d(this.getLanguagePartFromCode(i)))
        : se(i) && d(this.formatLanguageCode(i)),
      r.forEach((h) => {
        f.indexOf(h) < 0 && d(this.formatLanguageCode(h));
      }),
      f
    );
  }
}
const Fh = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 },
  Ph = {
    select: (s) => (s === 1 ? "one" : "other"),
    resolvedOptions: () => ({ pluralCategories: ["one", "other"] }),
  };
class wx {
  constructor(i, u = {}) {
    (this.languageUtils = i),
      (this.options = u),
      (this.logger = Ut.create("pluralResolver")),
      (this.pluralRulesCache = {});
  }
  addRule(i, u) {
    this.rules[i] = u;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(i, u = {}) {
    const r = Ql(i === "dev" ? "en" : i),
      f = u.ordinal ? "ordinal" : "cardinal",
      d = JSON.stringify({ cleanedCode: r, type: f });
    if (d in this.pluralRulesCache) return this.pluralRulesCache[d];
    let h;
    try {
      h = new Intl.PluralRules(r, { type: f });
    } catch {
      if (!Intl)
        return (
          this.logger.error("No Intl support, please use an Intl polyfill!"), Ph
        );
      if (!i.match(/-|_/)) return Ph;
      const g = this.languageUtils.getLanguagePartFromCode(i);
      h = this.getRule(g, u);
    }
    return (this.pluralRulesCache[d] = h), h;
  }
  needsPlural(i, u = {}) {
    let r = this.getRule(i, u);
    return (
      r || (r = this.getRule("dev", u)),
      r?.resolvedOptions().pluralCategories.length > 1
    );
  }
  getPluralFormsOfKey(i, u, r = {}) {
    return this.getSuffixes(i, r).map((f) => `${u}${f}`);
  }
  getSuffixes(i, u = {}) {
    let r = this.getRule(i, u);
    return (
      r || (r = this.getRule("dev", u)),
      r
        ? r
            .resolvedOptions()
            .pluralCategories.sort((f, d) => Fh[f] - Fh[d])
            .map(
              (f) =>
                `${this.options.prepend}${
                  u.ordinal ? `ordinal${this.options.prepend}` : ""
                }${f}`
            )
        : []
    );
  }
  getSuffix(i, u, r = {}) {
    const f = this.getRule(i, r);
    return f
      ? `${this.options.prepend}${
          r.ordinal ? `ordinal${this.options.prepend}` : ""
        }${f.select(u)}`
      : (this.logger.warn(`no plural rule found for: ${i}`),
        this.getSuffix("dev", u, r));
  }
}
const Wh = (s, i, u, r = ".", f = !0) => {
    let d = gx(s, i, u);
    return (
      !d &&
        f &&
        se(u) &&
        ((d = po(s, u, r)), d === void 0 && (d = po(i, u, r))),
      d
    );
  },
  so = (s) => s.replace(/\$/g, "$$$$");
class Ex {
  constructor(i = {}) {
    (this.logger = Ut.create("interpolator")),
      (this.options = i),
      (this.format = i?.interpolation?.format || ((u) => u)),
      this.init(i);
  }
  init(i = {}) {
    i.interpolation || (i.interpolation = { escapeValue: !0 });
    const {
      escape: u,
      escapeValue: r,
      useRawValueToEscape: f,
      prefix: d,
      prefixEscaped: h,
      suffix: x,
      suffixEscaped: g,
      formatSeparator: m,
      unescapeSuffix: y,
      unescapePrefix: S,
      nestingPrefix: N,
      nestingPrefixEscaped: b,
      nestingSuffix: w,
      nestingSuffixEscaped: T,
      nestingOptionsSeparator: C,
      maxReplaces: D,
      alwaysFormat: U,
    } = i.interpolation;
    (this.escape = u !== void 0 ? u : xx),
      (this.escapeValue = r !== void 0 ? r : !0),
      (this.useRawValueToEscape = f !== void 0 ? f : !1),
      (this.prefix = d ? Da(d) : h || "{{"),
      (this.suffix = x ? Da(x) : g || "}}"),
      (this.formatSeparator = m || ","),
      (this.unescapePrefix = y ? "" : S || "-"),
      (this.unescapeSuffix = this.unescapePrefix ? "" : y || ""),
      (this.nestingPrefix = N ? Da(N) : b || Da("$t(")),
      (this.nestingSuffix = w ? Da(w) : T || Da(")")),
      (this.nestingOptionsSeparator = C || ","),
      (this.maxReplaces = D || 1e3),
      (this.alwaysFormat = U !== void 0 ? U : !1),
      this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const i = (u, r) =>
      u?.source === r ? ((u.lastIndex = 0), u) : new RegExp(r, "g");
    (this.regexp = i(this.regexp, `${this.prefix}(.+?)${this.suffix}`)),
      (this.regexpUnescape = i(
        this.regexpUnescape,
        `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`
      )),
      (this.nestingRegexp = i(
        this.nestingRegexp,
        `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`
      ));
  }
  interpolate(i, u, r, f) {
    let d, h, x;
    const g =
        (this.options &&
          this.options.interpolation &&
          this.options.interpolation.defaultVariables) ||
        {},
      m = (b) => {
        if (b.indexOf(this.formatSeparator) < 0) {
          const D = Wh(
            u,
            g,
            b,
            this.options.keySeparator,
            this.options.ignoreJSONStructure
          );
          return this.alwaysFormat
            ? this.format(D, void 0, r, { ...f, ...u, interpolationkey: b })
            : D;
        }
        const w = b.split(this.formatSeparator),
          T = w.shift().trim(),
          C = w.join(this.formatSeparator).trim();
        return this.format(
          Wh(
            u,
            g,
            T,
            this.options.keySeparator,
            this.options.ignoreJSONStructure
          ),
          C,
          r,
          { ...f, ...u, interpolationkey: T }
        );
      };
    this.resetRegExp();
    const y =
        f?.missingInterpolationHandler ||
        this.options.missingInterpolationHandler,
      S =
        f?.interpolation?.skipOnVariables !== void 0
          ? f.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables;
    return (
      [
        { regex: this.regexpUnescape, safeValue: (b) => so(b) },
        {
          regex: this.regexp,
          safeValue: (b) => (this.escapeValue ? so(this.escape(b)) : so(b)),
        },
      ].forEach((b) => {
        for (x = 0; (d = b.regex.exec(i)); ) {
          const w = d[1].trim();
          if (((h = m(w)), h === void 0))
            if (typeof y == "function") {
              const C = y(i, d, f);
              h = se(C) ? C : "";
            } else if (f && Object.prototype.hasOwnProperty.call(f, w)) h = "";
            else if (S) {
              h = d[0];
              continue;
            } else
              this.logger.warn(
                `missed to pass in variable ${w} for interpolating ${i}`
              ),
                (h = "");
          else !se(h) && !this.useRawValueToEscape && (h = Gh(h));
          const T = b.safeValue(h);
          if (
            ((i = i.replace(d[0], T)),
            S
              ? ((b.regex.lastIndex += h.length),
                (b.regex.lastIndex -= d[0].length))
              : (b.regex.lastIndex = 0),
            x++,
            x >= this.maxReplaces)
          )
            break;
        }
      }),
      i
    );
  }
  nest(i, u, r = {}) {
    let f, d, h;
    const x = (g, m) => {
      const y = this.nestingOptionsSeparator;
      if (g.indexOf(y) < 0) return g;
      const S = g.split(new RegExp(`${y}[ ]*{`));
      let N = `{${S[1]}`;
      (g = S[0]), (N = this.interpolate(N, h));
      const b = N.match(/'/g),
        w = N.match(/"/g);
      (((b?.length ?? 0) % 2 === 0 && !w) || w.length % 2 !== 0) &&
        (N = N.replace(/'/g, '"'));
      try {
        (h = JSON.parse(N)), m && (h = { ...m, ...h });
      } catch (T) {
        return (
          this.logger.warn(
            `failed parsing options string in nesting for key ${g}`,
            T
          ),
          `${g}${y}${N}`
        );
      }
      return (
        h.defaultValue &&
          h.defaultValue.indexOf(this.prefix) > -1 &&
          delete h.defaultValue,
        g
      );
    };
    for (; (f = this.nestingRegexp.exec(i)); ) {
      let g = [];
      (h = { ...r }),
        (h = h.replace && !se(h.replace) ? h.replace : h),
        (h.applyPostProcessor = !1),
        delete h.defaultValue;
      const m = /{.*}/.test(f[1])
        ? f[1].lastIndexOf("}") + 1
        : f[1].indexOf(this.formatSeparator);
      if (
        (m !== -1 &&
          ((g = f[1]
            .slice(m)
            .split(this.formatSeparator)
            .map((y) => y.trim())
            .filter(Boolean)),
          (f[1] = f[1].slice(0, m))),
        (d = u(x.call(this, f[1].trim(), h), h)),
        d && f[0] === i && !se(d))
      )
        return d;
      se(d) || (d = Gh(d)),
        d ||
          (this.logger.warn(`missed to resolve ${f[1]} for nesting ${i}`),
          (d = "")),
        g.length &&
          (d = g.reduce(
            (y, S) =>
              this.format(y, S, r.lng, { ...r, interpolationkey: f[1].trim() }),
            d.trim()
          )),
        (i = i.replace(f[0], d)),
        (this.regexp.lastIndex = 0);
    }
    return i;
  }
}
const Cx = (s) => {
    let i = s.toLowerCase().trim();
    const u = {};
    if (s.indexOf("(") > -1) {
      const r = s.split("(");
      i = r[0].toLowerCase().trim();
      const f = r[1].substring(0, r[1].length - 1);
      i === "currency" && f.indexOf(":") < 0
        ? u.currency || (u.currency = f.trim())
        : i === "relativetime" && f.indexOf(":") < 0
        ? u.range || (u.range = f.trim())
        : f.split(";").forEach((h) => {
            if (h) {
              const [x, ...g] = h.split(":"),
                m = g
                  .join(":")
                  .trim()
                  .replace(/^'+|'+$/g, ""),
                y = x.trim();
              u[y] || (u[y] = m),
                m === "false" && (u[y] = !1),
                m === "true" && (u[y] = !0),
                isNaN(m) || (u[y] = parseInt(m, 10));
            }
          });
    }
    return { formatName: i, formatOptions: u };
  },
  Ih = (s) => {
    const i = {};
    return (u, r, f) => {
      let d = f;
      f &&
        f.interpolationkey &&
        f.formatParams &&
        f.formatParams[f.interpolationkey] &&
        f[f.interpolationkey] &&
        (d = { ...d, [f.interpolationkey]: void 0 });
      const h = r + JSON.stringify(d);
      let x = i[h];
      return x || ((x = s(Ql(r), f)), (i[h] = x)), x(u);
    };
  },
  _x = (s) => (i, u, r) => s(Ql(u), r)(i);
class Ax {
  constructor(i = {}) {
    (this.logger = Ut.create("formatter")), (this.options = i), this.init(i);
  }
  init(i, u = { interpolation: {} }) {
    this.formatSeparator = u.interpolation.formatSeparator || ",";
    const r = u.cacheInBuiltFormats ? Ih : _x;
    this.formats = {
      number: r((f, d) => {
        const h = new Intl.NumberFormat(f, { ...d });
        return (x) => h.format(x);
      }),
      currency: r((f, d) => {
        const h = new Intl.NumberFormat(f, { ...d, style: "currency" });
        return (x) => h.format(x);
      }),
      datetime: r((f, d) => {
        const h = new Intl.DateTimeFormat(f, { ...d });
        return (x) => h.format(x);
      }),
      relativetime: r((f, d) => {
        const h = new Intl.RelativeTimeFormat(f, { ...d });
        return (x) => h.format(x, d.range || "day");
      }),
      list: r((f, d) => {
        const h = new Intl.ListFormat(f, { ...d });
        return (x) => h.format(x);
      }),
    };
  }
  add(i, u) {
    this.formats[i.toLowerCase().trim()] = u;
  }
  addCached(i, u) {
    this.formats[i.toLowerCase().trim()] = Ih(u);
  }
  format(i, u, r, f = {}) {
    const d = u.split(this.formatSeparator);
    if (
      d.length > 1 &&
      d[0].indexOf("(") > 1 &&
      d[0].indexOf(")") < 0 &&
      d.find((x) => x.indexOf(")") > -1)
    ) {
      const x = d.findIndex((g) => g.indexOf(")") > -1);
      d[0] = [d[0], ...d.splice(1, x)].join(this.formatSeparator);
    }
    return d.reduce((x, g) => {
      const { formatName: m, formatOptions: y } = Cx(g);
      if (this.formats[m]) {
        let S = x;
        try {
          const N = f?.formatParams?.[f.interpolationkey] || {},
            b = N.locale || N.lng || f.locale || f.lng || r;
          S = this.formats[m](x, b, { ...y, ...f, ...N });
        } catch (N) {
          this.logger.warn(N);
        }
        return S;
      } else this.logger.warn(`there was no format function for ${m}`);
      return x;
    }, i);
  }
}
const Ox = (s, i) => {
  s.pending[i] !== void 0 && (delete s.pending[i], s.pendingCount--);
};
class Tx extends As {
  constructor(i, u, r, f = {}) {
    super(),
      (this.backend = i),
      (this.store = u),
      (this.services = r),
      (this.languageUtils = r.languageUtils),
      (this.options = f),
      (this.logger = Ut.create("backendConnector")),
      (this.waitingReads = []),
      (this.maxParallelReads = f.maxParallelReads || 10),
      (this.readingCalls = 0),
      (this.maxRetries = f.maxRetries >= 0 ? f.maxRetries : 5),
      (this.retryTimeout = f.retryTimeout >= 1 ? f.retryTimeout : 350),
      (this.state = {}),
      (this.queue = []),
      this.backend?.init?.(r, f.backend, f);
  }
  queueLoad(i, u, r, f) {
    const d = {},
      h = {},
      x = {},
      g = {};
    return (
      i.forEach((m) => {
        let y = !0;
        u.forEach((S) => {
          const N = `${m}|${S}`;
          !r.reload && this.store.hasResourceBundle(m, S)
            ? (this.state[N] = 2)
            : this.state[N] < 0 ||
              (this.state[N] === 1
                ? h[N] === void 0 && (h[N] = !0)
                : ((this.state[N] = 1),
                  (y = !1),
                  h[N] === void 0 && (h[N] = !0),
                  d[N] === void 0 && (d[N] = !0),
                  g[S] === void 0 && (g[S] = !0)));
        }),
          y || (x[m] = !0);
      }),
      (Object.keys(d).length || Object.keys(h).length) &&
        this.queue.push({
          pending: h,
          pendingCount: Object.keys(h).length,
          loaded: {},
          errors: [],
          callback: f,
        }),
      {
        toLoad: Object.keys(d),
        pending: Object.keys(h),
        toLoadLanguages: Object.keys(x),
        toLoadNamespaces: Object.keys(g),
      }
    );
  }
  loaded(i, u, r) {
    const f = i.split("|"),
      d = f[0],
      h = f[1];
    u && this.emit("failedLoading", d, h, u),
      !u &&
        r &&
        this.store.addResourceBundle(d, h, r, void 0, void 0, { skipCopy: !0 }),
      (this.state[i] = u ? -1 : 2),
      u && r && (this.state[i] = 0);
    const x = {};
    this.queue.forEach((g) => {
      mx(g.loaded, [d], h),
        Ox(g, i),
        u && g.errors.push(u),
        g.pendingCount === 0 &&
          !g.done &&
          (Object.keys(g.loaded).forEach((m) => {
            x[m] || (x[m] = {});
            const y = g.loaded[m];
            y.length &&
              y.forEach((S) => {
                x[m][S] === void 0 && (x[m][S] = !0);
              });
          }),
          (g.done = !0),
          g.errors.length ? g.callback(g.errors) : g.callback());
    }),
      this.emit("loaded", x),
      (this.queue = this.queue.filter((g) => !g.done));
  }
  read(i, u, r, f = 0, d = this.retryTimeout, h) {
    if (!i.length) return h(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: i,
        ns: u,
        fcName: r,
        tried: f,
        wait: d,
        callback: h,
      });
      return;
    }
    this.readingCalls++;
    const x = (m, y) => {
        if ((this.readingCalls--, this.waitingReads.length > 0)) {
          const S = this.waitingReads.shift();
          this.read(S.lng, S.ns, S.fcName, S.tried, S.wait, S.callback);
        }
        if (m && y && f < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, i, u, r, f + 1, d * 2, h);
          }, d);
          return;
        }
        h(m, y);
      },
      g = this.backend[r].bind(this.backend);
    if (g.length === 2) {
      try {
        const m = g(i, u);
        m && typeof m.then == "function"
          ? m.then((y) => x(null, y)).catch(x)
          : x(null, m);
      } catch (m) {
        x(m);
      }
      return;
    }
    return g(i, u, x);
  }
  prepareLoading(i, u, r = {}, f) {
    if (!this.backend)
      return (
        this.logger.warn(
          "No backend was added via i18next.use. Will not load resources."
        ),
        f && f()
      );
    se(i) && (i = this.languageUtils.toResolveHierarchy(i)), se(u) && (u = [u]);
    const d = this.queueLoad(i, u, r, f);
    if (!d.toLoad.length) return d.pending.length || f(), null;
    d.toLoad.forEach((h) => {
      this.loadOne(h);
    });
  }
  load(i, u, r) {
    this.prepareLoading(i, u, {}, r);
  }
  reload(i, u, r) {
    this.prepareLoading(i, u, { reload: !0 }, r);
  }
  loadOne(i, u = "") {
    const r = i.split("|"),
      f = r[0],
      d = r[1];
    this.read(f, d, "read", void 0, void 0, (h, x) => {
      h &&
        this.logger.warn(
          `${u}loading namespace ${d} for language ${f} failed`,
          h
        ),
        !h &&
          x &&
          this.logger.log(`${u}loaded namespace ${d} for language ${f}`, x),
        this.loaded(i, h, x);
    });
  }
  saveMissing(i, u, r, f, d, h = {}, x = () => {}) {
    if (
      this.services?.utils?.hasLoadedNamespace &&
      !this.services?.utils?.hasLoadedNamespace(u)
    ) {
      this.logger.warn(
        `did not save key "${r}" as the namespace "${u}" was not yet loaded`,
        "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
      );
      return;
    }
    if (!(r == null || r === "")) {
      if (this.backend?.create) {
        const g = { ...h, isUpdate: d },
          m = this.backend.create.bind(this.backend);
        if (m.length < 6)
          try {
            let y;
            m.length === 5 ? (y = m(i, u, r, f, g)) : (y = m(i, u, r, f)),
              y && typeof y.then == "function"
                ? y.then((S) => x(null, S)).catch(x)
                : x(null, y);
          } catch (y) {
            x(y);
          }
        else m(i, u, r, f, x, g);
      }
      !i || !i[0] || this.store.addResource(i[0], u, r, f);
    }
  }
}
const em = () => ({
    debug: !1,
    initAsync: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: (s) => {
      let i = {};
      if (
        (typeof s[1] == "object" && (i = s[1]),
        se(s[1]) && (i.defaultValue = s[1]),
        se(s[2]) && (i.tDescription = s[2]),
        typeof s[2] == "object" || typeof s[3] == "object")
      ) {
        const u = s[3] || s[2];
        Object.keys(u).forEach((r) => {
          i[r] = u[r];
        });
      }
      return i;
    },
    interpolation: {
      escapeValue: !0,
      format: (s) => s,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0,
    },
    cacheInBuiltFormats: !0,
  }),
  tm = (s) => (
    se(s.ns) && (s.ns = [s.ns]),
    se(s.fallbackLng) && (s.fallbackLng = [s.fallbackLng]),
    se(s.fallbackNS) && (s.fallbackNS = [s.fallbackNS]),
    s.supportedLngs?.indexOf?.("cimode") < 0 &&
      (s.supportedLngs = s.supportedLngs.concat(["cimode"])),
    typeof s.initImmediate == "boolean" && (s.initAsync = s.initImmediate),
    s
  ),
  xs = () => {},
  Rx = (s) => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(s)).forEach((u) => {
      typeof s[u] == "function" && (s[u] = s[u].bind(s));
    });
  };
class Xl extends As {
  constructor(i = {}, u) {
    if (
      (super(),
      (this.options = tm(i)),
      (this.services = {}),
      (this.logger = Ut),
      (this.modules = { external: [] }),
      Rx(this),
      u && !this.isInitialized && !i.isClone)
    ) {
      if (!this.options.initAsync) return this.init(i, u), this;
      setTimeout(() => {
        this.init(i, u);
      }, 0);
    }
  }
  init(i = {}, u) {
    (this.isInitializing = !0),
      typeof i == "function" && ((u = i), (i = {})),
      i.defaultNS == null &&
        i.ns &&
        (se(i.ns)
          ? (i.defaultNS = i.ns)
          : i.ns.indexOf("translation") < 0 && (i.defaultNS = i.ns[0]));
    const r = em();
    (this.options = { ...r, ...this.options, ...tm(i) }),
      (this.options.interpolation = {
        ...r.interpolation,
        ...this.options.interpolation,
      }),
      i.keySeparator !== void 0 &&
        (this.options.userDefinedKeySeparator = i.keySeparator),
      i.nsSeparator !== void 0 &&
        (this.options.userDefinedNsSeparator = i.nsSeparator);
    const f = (m) => (m ? (typeof m == "function" ? new m() : m) : null);
    if (!this.options.isClone) {
      this.modules.logger
        ? Ut.init(f(this.modules.logger), this.options)
        : Ut.init(null, this.options);
      let m;
      this.modules.formatter ? (m = this.modules.formatter) : (m = Ax);
      const y = new Jh(this.options);
      this.store = new Zh(this.options.resources, this.options);
      const S = this.services;
      (S.logger = Ut),
        (S.resourceStore = this.store),
        (S.languageUtils = y),
        (S.pluralResolver = new wx(y, {
          prepend: this.options.pluralSeparator,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix,
        })),
        this.options.interpolation.format &&
          this.options.interpolation.format !== r.interpolation.format &&
          this.logger.deprecate(
            "init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"
          ),
        m &&
          (!this.options.interpolation.format ||
            this.options.interpolation.format === r.interpolation.format) &&
          ((S.formatter = f(m)),
          S.formatter.init && S.formatter.init(S, this.options),
          (this.options.interpolation.format = S.formatter.format.bind(
            S.formatter
          ))),
        (S.interpolator = new Ex(this.options)),
        (S.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
        (S.backendConnector = new Tx(
          f(this.modules.backend),
          S.resourceStore,
          S,
          this.options
        )),
        S.backendConnector.on("*", (b, ...w) => {
          this.emit(b, ...w);
        }),
        this.modules.languageDetector &&
          ((S.languageDetector = f(this.modules.languageDetector)),
          S.languageDetector.init &&
            S.languageDetector.init(S, this.options.detection, this.options)),
        this.modules.i18nFormat &&
          ((S.i18nFormat = f(this.modules.i18nFormat)),
          S.i18nFormat.init && S.i18nFormat.init(this)),
        (this.translator = new ws(this.services, this.options)),
        this.translator.on("*", (b, ...w) => {
          this.emit(b, ...w);
        }),
        this.modules.external.forEach((b) => {
          b.init && b.init(this);
        });
    }
    if (
      ((this.format = this.options.interpolation.format),
      u || (u = xs),
      this.options.fallbackLng &&
        !this.services.languageDetector &&
        !this.options.lng)
    ) {
      const m = this.services.languageUtils.getFallbackCodes(
        this.options.fallbackLng
      );
      m.length > 0 && m[0] !== "dev" && (this.options.lng = m[0]);
    }
    !this.services.languageDetector &&
      !this.options.lng &&
      this.logger.warn(
        "init: no languageDetector is used and no lng is defined"
      ),
      [
        "getResource",
        "hasResourceBundle",
        "getResourceBundle",
        "getDataByLanguage",
      ].forEach((m) => {
        this[m] = (...y) => this.store[m](...y);
      }),
      [
        "addResource",
        "addResources",
        "addResourceBundle",
        "removeResourceBundle",
      ].forEach((m) => {
        this[m] = (...y) => (this.store[m](...y), this);
      });
    const x = Bl(),
      g = () => {
        const m = (y, S) => {
          (this.isInitializing = !1),
            this.isInitialized &&
              !this.initializedStoreOnce &&
              this.logger.warn(
                "init: i18next is already initialized. You should call init just once!"
              ),
            (this.isInitialized = !0),
            this.options.isClone ||
              this.logger.log("initialized", this.options),
            this.emit("initialized", this.options),
            x.resolve(S),
            u(y, S);
        };
        if (this.languages && !this.isInitialized)
          return m(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, m);
      };
    return (
      this.options.resources || !this.options.initAsync
        ? g()
        : setTimeout(g, 0),
      x
    );
  }
  loadResources(i, u = xs) {
    let r = u;
    const f = se(i) ? i : this.language;
    if (
      (typeof i == "function" && (r = i),
      !this.options.resources || this.options.partialBundledLanguages)
    ) {
      if (
        f?.toLowerCase() === "cimode" &&
        (!this.options.preload || this.options.preload.length === 0)
      )
        return r();
      const d = [],
        h = (x) => {
          if (!x || x === "cimode") return;
          this.services.languageUtils.toResolveHierarchy(x).forEach((m) => {
            m !== "cimode" && d.indexOf(m) < 0 && d.push(m);
          });
        };
      f
        ? h(f)
        : this.services.languageUtils
            .getFallbackCodes(this.options.fallbackLng)
            .forEach((g) => h(g)),
        this.options.preload?.forEach?.((x) => h(x)),
        this.services.backendConnector.load(d, this.options.ns, (x) => {
          !x &&
            !this.resolvedLanguage &&
            this.language &&
            this.setResolvedLanguage(this.language),
            r(x);
        });
    } else r(null);
  }
  reloadResources(i, u, r) {
    const f = Bl();
    return (
      typeof i == "function" && ((r = i), (i = void 0)),
      typeof u == "function" && ((r = u), (u = void 0)),
      i || (i = this.languages),
      u || (u = this.options.ns),
      r || (r = xs),
      this.services.backendConnector.reload(i, u, (d) => {
        f.resolve(), r(d);
      }),
      f
    );
  }
  use(i) {
    if (!i)
      throw new Error(
        "You are passing an undefined module! Please check the object you are passing to i18next.use()"
      );
    if (!i.type)
      throw new Error(
        "You are passing a wrong module! Please check the object you are passing to i18next.use()"
      );
    return (
      i.type === "backend" && (this.modules.backend = i),
      (i.type === "logger" || (i.log && i.warn && i.error)) &&
        (this.modules.logger = i),
      i.type === "languageDetector" && (this.modules.languageDetector = i),
      i.type === "i18nFormat" && (this.modules.i18nFormat = i),
      i.type === "postProcessor" && Rm.addPostProcessor(i),
      i.type === "formatter" && (this.modules.formatter = i),
      i.type === "3rdParty" && this.modules.external.push(i),
      this
    );
  }
  setResolvedLanguage(i) {
    if (!(!i || !this.languages) && !(["cimode", "dev"].indexOf(i) > -1)) {
      for (let u = 0; u < this.languages.length; u++) {
        const r = this.languages[u];
        if (
          !(["cimode", "dev"].indexOf(r) > -1) &&
          this.store.hasLanguageSomeTranslations(r)
        ) {
          this.resolvedLanguage = r;
          break;
        }
      }
      !this.resolvedLanguage &&
        this.languages.indexOf(i) < 0 &&
        this.store.hasLanguageSomeTranslations(i) &&
        ((this.resolvedLanguage = i), this.languages.unshift(i));
    }
  }
  changeLanguage(i, u) {
    this.isLanguageChangingTo = i;
    const r = Bl();
    this.emit("languageChanging", i);
    const f = (x) => {
        (this.language = x),
          (this.languages = this.services.languageUtils.toResolveHierarchy(x)),
          (this.resolvedLanguage = void 0),
          this.setResolvedLanguage(x);
      },
      d = (x, g) => {
        g
          ? this.isLanguageChangingTo === i &&
            (f(g),
            this.translator.changeLanguage(g),
            (this.isLanguageChangingTo = void 0),
            this.emit("languageChanged", g),
            this.logger.log("languageChanged", g))
          : (this.isLanguageChangingTo = void 0),
          r.resolve((...m) => this.t(...m)),
          u && u(x, (...m) => this.t(...m));
      },
      h = (x) => {
        !i && !x && this.services.languageDetector && (x = []);
        const g = se(x) ? x : x && x[0],
          m = this.store.hasLanguageSomeTranslations(g)
            ? g
            : this.services.languageUtils.getBestMatchFromCodes(
                se(x) ? [x] : x
              );
        m &&
          (this.language || f(m),
          this.translator.language || this.translator.changeLanguage(m),
          this.services.languageDetector?.cacheUserLanguage?.(m)),
          this.loadResources(m, (y) => {
            d(y, m);
          });
      };
    return (
      !i &&
      this.services.languageDetector &&
      !this.services.languageDetector.async
        ? h(this.services.languageDetector.detect())
        : !i &&
          this.services.languageDetector &&
          this.services.languageDetector.async
        ? this.services.languageDetector.detect.length === 0
          ? this.services.languageDetector.detect().then(h)
          : this.services.languageDetector.detect(h)
        : h(i),
      r
    );
  }
  getFixedT(i, u, r) {
    const f = (d, h, ...x) => {
      let g;
      typeof h != "object"
        ? (g = this.options.overloadTranslationOptionHandler([d, h].concat(x)))
        : (g = { ...h }),
        (g.lng = g.lng || f.lng),
        (g.lngs = g.lngs || f.lngs),
        (g.ns = g.ns || f.ns),
        g.keyPrefix !== "" && (g.keyPrefix = g.keyPrefix || r || f.keyPrefix);
      const m = this.options.keySeparator || ".";
      let y;
      return (
        g.keyPrefix && Array.isArray(d)
          ? (y = d.map(
              (S) => (
                typeof S == "function" && (S = xo(S, h)),
                `${g.keyPrefix}${m}${S}`
              )
            ))
          : (typeof d == "function" && (d = xo(d, h)),
            (y = g.keyPrefix ? `${g.keyPrefix}${m}${d}` : d)),
        this.t(y, g)
      );
    };
    return se(i) ? (f.lng = i) : (f.lngs = i), (f.ns = u), (f.keyPrefix = r), f;
  }
  t(...i) {
    return this.translator?.translate(...i);
  }
  exists(...i) {
    return this.translator?.exists(...i);
  }
  setDefaultNamespace(i) {
    this.options.defaultNS = i;
  }
  hasLoadedNamespace(i, u = {}) {
    if (!this.isInitialized)
      return (
        this.logger.warn(
          "hasLoadedNamespace: i18next was not initialized",
          this.languages
        ),
        !1
      );
    if (!this.languages || !this.languages.length)
      return (
        this.logger.warn(
          "hasLoadedNamespace: i18n.languages were undefined or empty",
          this.languages
        ),
        !1
      );
    const r = u.lng || this.resolvedLanguage || this.languages[0],
      f = this.options ? this.options.fallbackLng : !1,
      d = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === "cimode") return !0;
    const h = (x, g) => {
      const m = this.services.backendConnector.state[`${x}|${g}`];
      return m === -1 || m === 0 || m === 2;
    };
    if (u.precheck) {
      const x = u.precheck(this, h);
      if (x !== void 0) return x;
    }
    return !!(
      this.hasResourceBundle(r, i) ||
      !this.services.backendConnector.backend ||
      (this.options.resources && !this.options.partialBundledLanguages) ||
      (h(r, i) && (!f || h(d, i)))
    );
  }
  loadNamespaces(i, u) {
    const r = Bl();
    return this.options.ns
      ? (se(i) && (i = [i]),
        i.forEach((f) => {
          this.options.ns.indexOf(f) < 0 && this.options.ns.push(f);
        }),
        this.loadResources((f) => {
          r.resolve(), u && u(f);
        }),
        r)
      : (u && u(), Promise.resolve());
  }
  loadLanguages(i, u) {
    const r = Bl();
    se(i) && (i = [i]);
    const f = this.options.preload || [],
      d = i.filter(
        (h) =>
          f.indexOf(h) < 0 && this.services.languageUtils.isSupportedCode(h)
      );
    return d.length
      ? ((this.options.preload = f.concat(d)),
        this.loadResources((h) => {
          r.resolve(), u && u(h);
        }),
        r)
      : (u && u(), Promise.resolve());
  }
  dir(i) {
    if (
      (i ||
        (i =
          this.resolvedLanguage ||
          (this.languages?.length > 0 ? this.languages[0] : this.language)),
      !i)
    )
      return "rtl";
    try {
      const f = new Intl.Locale(i);
      if (f && f.getTextInfo) {
        const d = f.getTextInfo();
        if (d && d.direction) return d.direction;
      }
    } catch {}
    const u = [
        "ar",
        "shu",
        "sqr",
        "ssh",
        "xaa",
        "yhd",
        "yud",
        "aao",
        "abh",
        "abv",
        "acm",
        "acq",
        "acw",
        "acx",
        "acy",
        "adf",
        "ads",
        "aeb",
        "aec",
        "afb",
        "ajp",
        "apc",
        "apd",
        "arb",
        "arq",
        "ars",
        "ary",
        "arz",
        "auz",
        "avl",
        "ayh",
        "ayl",
        "ayn",
        "ayp",
        "bbz",
        "pga",
        "he",
        "iw",
        "ps",
        "pbt",
        "pbu",
        "pst",
        "prp",
        "prd",
        "ug",
        "ur",
        "ydd",
        "yds",
        "yih",
        "ji",
        "yi",
        "hbo",
        "men",
        "xmn",
        "fa",
        "jpr",
        "peo",
        "pes",
        "prs",
        "dv",
        "sam",
        "ckb",
      ],
      r = this.services?.languageUtils || new Jh(em());
    return i.toLowerCase().indexOf("-latn") > 1
      ? "ltr"
      : u.indexOf(r.getLanguagePartFromCode(i)) > -1 ||
        i.toLowerCase().indexOf("-arab") > 1
      ? "rtl"
      : "ltr";
  }
  static createInstance(i = {}, u) {
    return new Xl(i, u);
  }
  cloneInstance(i = {}, u = xs) {
    const r = i.forkResourceStore;
    r && delete i.forkResourceStore;
    const f = { ...this.options, ...i, isClone: !0 },
      d = new Xl(f);
    if (
      ((i.debug !== void 0 || i.prefix !== void 0) &&
        (d.logger = d.logger.clone(i)),
      ["store", "services", "language"].forEach((x) => {
        d[x] = this[x];
      }),
      (d.services = { ...this.services }),
      (d.services.utils = { hasLoadedNamespace: d.hasLoadedNamespace.bind(d) }),
      r)
    ) {
      const x = Object.keys(this.store.data).reduce(
        (g, m) => (
          (g[m] = { ...this.store.data[m] }),
          (g[m] = Object.keys(g[m]).reduce(
            (y, S) => ((y[S] = { ...g[m][S] }), y),
            g[m]
          )),
          g
        ),
        {}
      );
      (d.store = new Zh(x, f)), (d.services.resourceStore = d.store);
    }
    return (
      (d.translator = new ws(d.services, f)),
      d.translator.on("*", (x, ...g) => {
        d.emit(x, ...g);
      }),
      d.init(f, u),
      (d.translator.options = f),
      (d.translator.backendConnector.services.utils = {
        hasLoadedNamespace: d.hasLoadedNamespace.bind(d),
      }),
      d
    );
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage,
    };
  }
}
const Ie = Xl.createInstance();
Ie.createInstance = Xl.createInstance;
Ie.createInstance;
Ie.dir;
Ie.init;
Ie.loadResources;
Ie.reloadResources;
Ie.use;
Ie.changeLanguage;
Ie.getFixedT;
Ie.t;
Ie.exists;
Ie.setDefaultNamespace;
Ie.hasLoadedNamespace;
Ie.loadNamespaces;
Ie.loadLanguages;
const Mx =
    /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,
  Lx = {
    "&amp;": "&",
    "&#38;": "&",
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&apos;": "'",
    "&#39;": "'",
    "&quot;": '"',
    "&#34;": '"',
    "&nbsp;": " ",
    "&#160;": " ",
    "&copy;": "©",
    "&#169;": "©",
    "&reg;": "®",
    "&#174;": "®",
    "&hellip;": "…",
    "&#8230;": "…",
    "&#x2F;": "/",
    "&#47;": "/",
  },
  Dx = (s) => Lx[s],
  zx = (s) => s.replace(Mx, Dx);
let nm = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: zx,
};
const Ux = (s = {}) => {
    nm = { ...nm, ...s };
  },
  qx = {
    type: "3rdParty",
    init(s) {
      Ux(s.options.react);
    },
  },
  { slice: Hx, forEach: Bx } = [];
function kx(s) {
  return (
    Bx.call(Hx.call(arguments, 1), (i) => {
      if (i) for (const u in i) s[u] === void 0 && (s[u] = i[u]);
    }),
    s
  );
}
function Yx(s) {
  return typeof s != "string"
    ? !1
    : [
        /<\s*script.*?>/i,
        /<\s*\/\s*script\s*>/i,
        /<\s*img.*?on\w+\s*=/i,
        /<\s*\w+\s*on\w+\s*=.*?>/i,
        /javascript\s*:/i,
        /vbscript\s*:/i,
        /expression\s*\(/i,
        /eval\s*\(/i,
        /alert\s*\(/i,
        /document\.cookie/i,
        /document\.write\s*\(/i,
        /window\.location/i,
        /innerHTML/i,
      ].some((u) => u.test(s));
}
const am = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
  Gx = function (s, i) {
    const r =
        arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : { path: "/" },
      f = encodeURIComponent(i);
    let d = `${s}=${f}`;
    if (r.maxAge > 0) {
      const h = r.maxAge - 0;
      if (Number.isNaN(h)) throw new Error("maxAge should be a Number");
      d += `; Max-Age=${Math.floor(h)}`;
    }
    if (r.domain) {
      if (!am.test(r.domain)) throw new TypeError("option domain is invalid");
      d += `; Domain=${r.domain}`;
    }
    if (r.path) {
      if (!am.test(r.path)) throw new TypeError("option path is invalid");
      d += `; Path=${r.path}`;
    }
    if (r.expires) {
      if (typeof r.expires.toUTCString != "function")
        throw new TypeError("option expires is invalid");
      d += `; Expires=${r.expires.toUTCString()}`;
    }
    if (
      (r.httpOnly && (d += "; HttpOnly"),
      r.secure && (d += "; Secure"),
      r.sameSite)
    )
      switch (
        typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite
      ) {
        case !0:
          d += "; SameSite=Strict";
          break;
        case "lax":
          d += "; SameSite=Lax";
          break;
        case "strict":
          d += "; SameSite=Strict";
          break;
        case "none":
          d += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    return r.partitioned && (d += "; Partitioned"), d;
  },
  lm = {
    create(s, i, u, r) {
      let f =
        arguments.length > 4 && arguments[4] !== void 0
          ? arguments[4]
          : { path: "/", sameSite: "strict" };
      u &&
        ((f.expires = new Date()),
        f.expires.setTime(f.expires.getTime() + u * 60 * 1e3)),
        r && (f.domain = r),
        (document.cookie = Gx(s, i, f));
    },
    read(s) {
      const i = `${s}=`,
        u = document.cookie.split(";");
      for (let r = 0; r < u.length; r++) {
        let f = u[r];
        for (; f.charAt(0) === " "; ) f = f.substring(1, f.length);
        if (f.indexOf(i) === 0) return f.substring(i.length, f.length);
      }
      return null;
    },
    remove(s, i) {
      this.create(s, "", -1, i);
    },
  };
var Vx = {
    name: "cookie",
    lookup(s) {
      let { lookupCookie: i } = s;
      if (i && typeof document < "u") return lm.read(i) || void 0;
    },
    cacheUserLanguage(s, i) {
      let {
        lookupCookie: u,
        cookieMinutes: r,
        cookieDomain: f,
        cookieOptions: d,
      } = i;
      u && typeof document < "u" && lm.create(u, s, r, f, d);
    },
  },
  Qx = {
    name: "querystring",
    lookup(s) {
      let { lookupQuerystring: i } = s,
        u;
      if (typeof window < "u") {
        let { search: r } = window.location;
        !window.location.search &&
          window.location.hash?.indexOf("?") > -1 &&
          (r = window.location.hash.substring(
            window.location.hash.indexOf("?")
          ));
        const d = r.substring(1).split("&");
        for (let h = 0; h < d.length; h++) {
          const x = d[h].indexOf("=");
          x > 0 && d[h].substring(0, x) === i && (u = d[h].substring(x + 1));
        }
      }
      return u;
    },
  },
  Xx = {
    name: "hash",
    lookup(s) {
      let { lookupHash: i, lookupFromHashIndex: u } = s,
        r;
      if (typeof window < "u") {
        const { hash: f } = window.location;
        if (f && f.length > 2) {
          const d = f.substring(1);
          if (i) {
            const h = d.split("&");
            for (let x = 0; x < h.length; x++) {
              const g = h[x].indexOf("=");
              g > 0 &&
                h[x].substring(0, g) === i &&
                (r = h[x].substring(g + 1));
            }
          }
          if (r) return r;
          if (!r && u > -1) {
            const h = f.match(/\/([a-zA-Z-]*)/g);
            return Array.isArray(h)
              ? h[typeof u == "number" ? u : 0]?.replace("/", "")
              : void 0;
          }
        }
      }
      return r;
    },
  };
let za = null;
const im = () => {
  if (za !== null) return za;
  try {
    if (((za = typeof window < "u" && window.localStorage !== null), !za))
      return !1;
    const s = "i18next.translate.boo";
    window.localStorage.setItem(s, "foo"), window.localStorage.removeItem(s);
  } catch {
    za = !1;
  }
  return za;
};
var Zx = {
  name: "localStorage",
  lookup(s) {
    let { lookupLocalStorage: i } = s;
    if (i && im()) return window.localStorage.getItem(i) || void 0;
  },
  cacheUserLanguage(s, i) {
    let { lookupLocalStorage: u } = i;
    u && im() && window.localStorage.setItem(u, s);
  },
};
let Ua = null;
const sm = () => {
  if (Ua !== null) return Ua;
  try {
    if (((Ua = typeof window < "u" && window.sessionStorage !== null), !Ua))
      return !1;
    const s = "i18next.translate.boo";
    window.sessionStorage.setItem(s, "foo"),
      window.sessionStorage.removeItem(s);
  } catch {
    Ua = !1;
  }
  return Ua;
};
var Kx = {
    name: "sessionStorage",
    lookup(s) {
      let { lookupSessionStorage: i } = s;
      if (i && sm()) return window.sessionStorage.getItem(i) || void 0;
    },
    cacheUserLanguage(s, i) {
      let { lookupSessionStorage: u } = i;
      u && sm() && window.sessionStorage.setItem(u, s);
    },
  },
  $x = {
    name: "navigator",
    lookup(s) {
      const i = [];
      if (typeof navigator < "u") {
        const { languages: u, userLanguage: r, language: f } = navigator;
        if (u) for (let d = 0; d < u.length; d++) i.push(u[d]);
        r && i.push(r), f && i.push(f);
      }
      return i.length > 0 ? i : void 0;
    },
  },
  Jx = {
    name: "htmlTag",
    lookup(s) {
      let { htmlTag: i } = s,
        u;
      const r = i || (typeof document < "u" ? document.documentElement : null);
      return (
        r &&
          typeof r.getAttribute == "function" &&
          (u = r.getAttribute("lang")),
        u
      );
    },
  },
  Fx = {
    name: "path",
    lookup(s) {
      let { lookupFromPathIndex: i } = s;
      if (typeof window > "u") return;
      const u = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      return Array.isArray(u)
        ? u[typeof i == "number" ? i : 0]?.replace("/", "")
        : void 0;
    },
  },
  Px = {
    name: "subdomain",
    lookup(s) {
      let { lookupFromSubdomainIndex: i } = s;
      const u = typeof i == "number" ? i + 1 : 1,
        r =
          typeof window < "u" &&
          window.location?.hostname?.match(
            /^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i
          );
      if (r) return r[u];
    },
  };
let Lm = !1;
try {
  document.cookie, (Lm = !0);
} catch {}
const Dm = [
  "querystring",
  "cookie",
  "localStorage",
  "sessionStorage",
  "navigator",
  "htmlTag",
];
Lm || Dm.splice(1, 1);
const Wx = () => ({
  order: Dm,
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  caches: ["localStorage"],
  excludeCacheFor: ["cimode"],
  convertDetectedLanguage: (s) => s,
});
class zm {
  constructor(i) {
    let u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.type = "languageDetector"), (this.detectors = {}), this.init(i, u);
  }
  init() {
    let i =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : { languageUtils: {} },
      u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    (this.services = i),
      (this.options = kx(u, this.options || {}, Wx())),
      typeof this.options.convertDetectedLanguage == "string" &&
        this.options.convertDetectedLanguage.indexOf("15897") > -1 &&
        (this.options.convertDetectedLanguage = (f) => f.replace("-", "_")),
      this.options.lookupFromUrlIndex &&
        (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
      (this.i18nOptions = r),
      this.addDetector(Vx),
      this.addDetector(Qx),
      this.addDetector(Zx),
      this.addDetector(Kx),
      this.addDetector($x),
      this.addDetector(Jx),
      this.addDetector(Fx),
      this.addDetector(Px),
      this.addDetector(Xx);
  }
  addDetector(i) {
    return (this.detectors[i.name] = i), this;
  }
  detect() {
    let i =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : this.options.order,
      u = [];
    return (
      i.forEach((r) => {
        if (this.detectors[r]) {
          let f = this.detectors[r].lookup(this.options);
          f && typeof f == "string" && (f = [f]), f && (u = u.concat(f));
        }
      }),
      (u = u
        .filter((r) => r != null && !Yx(r))
        .map((r) => this.options.convertDetectedLanguage(r))),
      this.services &&
      this.services.languageUtils &&
      this.services.languageUtils.getBestMatchFromCodes
        ? u
        : u.length > 0
        ? u[0]
        : null
    );
  }
  cacheUserLanguage(i) {
    let u =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : this.options.caches;
    u &&
      ((this.options.excludeCacheFor &&
        this.options.excludeCacheFor.indexOf(i) > -1) ||
        u.forEach((r) => {
          this.detectors[r] &&
            this.detectors[r].cacheUserLanguage(i, this.options);
        }));
  }
}
zm.type = "languageDetector";
const rm = Object.assign({}),
  Gl = {};
Object.keys(rm).forEach((s) => {
  const i = s.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
  if (i) {
    const [, u] = i,
      r = rm[s];
    Gl[u] || (Gl[u] = { translation: {} }),
      r.default && (Gl[u].translation = { ...Gl[u].translation, ...r.default });
  }
});
Ie.use(zm)
  .use(qx)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: !1,
    resources: Gl,
    interpolation: { escapeValue: !1 },
  });
var ro = { exports: {} },
  kl = {},
  uo = { exports: {} },
  oo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var um;
function Ix() {
  return (
    um ||
      ((um = 1),
      (function (s) {
        function i(q, X) {
          var ee = q.length;
          q.push(X);
          e: for (; 0 < ee; ) {
            var ye = (ee - 1) >>> 1,
              E = q[ye];
            if (0 < f(E, X)) (q[ye] = X), (q[ee] = E), (ee = ye);
            else break e;
          }
        }
        function u(q) {
          return q.length === 0 ? null : q[0];
        }
        function r(q) {
          if (q.length === 0) return null;
          var X = q[0],
            ee = q.pop();
          if (ee !== X) {
            q[0] = ee;
            e: for (var ye = 0, E = q.length, k = E >>> 1; ye < k; ) {
              var $ = 2 * (ye + 1) - 1,
                K = q[$],
                te = $ + 1,
                ve = q[te];
              if (0 > f(K, ee))
                te < E && 0 > f(ve, K)
                  ? ((q[ye] = ve), (q[te] = ee), (ye = te))
                  : ((q[ye] = K), (q[$] = ee), (ye = $));
              else if (te < E && 0 > f(ve, ee))
                (q[ye] = ve), (q[te] = ee), (ye = te);
              else break e;
            }
          }
          return X;
        }
        function f(q, X) {
          var ee = q.sortIndex - X.sortIndex;
          return ee !== 0 ? ee : q.id - X.id;
        }
        if (
          ((s.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var d = performance;
          s.unstable_now = function () {
            return d.now();
          };
        } else {
          var h = Date,
            x = h.now();
          s.unstable_now = function () {
            return h.now() - x;
          };
        }
        var g = [],
          m = [],
          y = 1,
          S = null,
          N = 3,
          b = !1,
          w = !1,
          T = !1,
          C = !1,
          D = typeof setTimeout == "function" ? setTimeout : null,
          U = typeof clearTimeout == "function" ? clearTimeout : null,
          Q = typeof setImmediate < "u" ? setImmediate : null;
        function P(q) {
          for (var X = u(m); X !== null; ) {
            if (X.callback === null) r(m);
            else if (X.startTime <= q)
              r(m), (X.sortIndex = X.expirationTime), i(g, X);
            else break;
            X = u(m);
          }
        }
        function G(q) {
          if (((T = !1), P(q), !w))
            if (u(g) !== null) (w = !0), I || ((I = !0), F());
            else {
              var X = u(m);
              X !== null && ge(G, X.startTime - q);
            }
        }
        var I = !1,
          oe = -1,
          Se = 5,
          xe = -1;
        function V() {
          return C ? !0 : !(s.unstable_now() - xe < Se);
        }
        function Z() {
          if (((C = !1), I)) {
            var q = s.unstable_now();
            xe = q;
            var X = !0;
            try {
              e: {
                (w = !1), T && ((T = !1), U(oe), (oe = -1)), (b = !0);
                var ee = N;
                try {
                  t: {
                    for (
                      P(q), S = u(g);
                      S !== null && !(S.expirationTime > q && V());

                    ) {
                      var ye = S.callback;
                      if (typeof ye == "function") {
                        (S.callback = null), (N = S.priorityLevel);
                        var E = ye(S.expirationTime <= q);
                        if (((q = s.unstable_now()), typeof E == "function")) {
                          (S.callback = E), P(q), (X = !0);
                          break t;
                        }
                        S === u(g) && r(g), P(q);
                      } else r(g);
                      S = u(g);
                    }
                    if (S !== null) X = !0;
                    else {
                      var k = u(m);
                      k !== null && ge(G, k.startTime - q), (X = !1);
                    }
                  }
                  break e;
                } finally {
                  (S = null), (N = ee), (b = !1);
                }
                X = void 0;
              }
            } finally {
              X ? F() : (I = !1);
            }
          }
        }
        var F;
        if (typeof Q == "function")
          F = function () {
            Q(Z);
          };
        else if (typeof MessageChannel < "u") {
          var le = new MessageChannel(),
            me = le.port2;
          (le.port1.onmessage = Z),
            (F = function () {
              me.postMessage(null);
            });
        } else
          F = function () {
            D(Z, 0);
          };
        function ge(q, X) {
          oe = D(function () {
            q(s.unstable_now());
          }, X);
        }
        (s.unstable_IdlePriority = 5),
          (s.unstable_ImmediatePriority = 1),
          (s.unstable_LowPriority = 4),
          (s.unstable_NormalPriority = 3),
          (s.unstable_Profiling = null),
          (s.unstable_UserBlockingPriority = 2),
          (s.unstable_cancelCallback = function (q) {
            q.callback = null;
          }),
          (s.unstable_forceFrameRate = function (q) {
            0 > q || 125 < q
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (Se = 0 < q ? Math.floor(1e3 / q) : 5);
          }),
          (s.unstable_getCurrentPriorityLevel = function () {
            return N;
          }),
          (s.unstable_next = function (q) {
            switch (N) {
              case 1:
              case 2:
              case 3:
                var X = 3;
                break;
              default:
                X = N;
            }
            var ee = N;
            N = X;
            try {
              return q();
            } finally {
              N = ee;
            }
          }),
          (s.unstable_requestPaint = function () {
            C = !0;
          }),
          (s.unstable_runWithPriority = function (q, X) {
            switch (q) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                q = 3;
            }
            var ee = N;
            N = q;
            try {
              return X();
            } finally {
              N = ee;
            }
          }),
          (s.unstable_scheduleCallback = function (q, X, ee) {
            var ye = s.unstable_now();
            switch (
              (typeof ee == "object" && ee !== null
                ? ((ee = ee.delay),
                  (ee = typeof ee == "number" && 0 < ee ? ye + ee : ye))
                : (ee = ye),
              q)
            ) {
              case 1:
                var E = -1;
                break;
              case 2:
                E = 250;
                break;
              case 5:
                E = 1073741823;
                break;
              case 4:
                E = 1e4;
                break;
              default:
                E = 5e3;
            }
            return (
              (E = ee + E),
              (q = {
                id: y++,
                callback: X,
                priorityLevel: q,
                startTime: ee,
                expirationTime: E,
                sortIndex: -1,
              }),
              ee > ye
                ? ((q.sortIndex = ee),
                  i(m, q),
                  u(g) === null &&
                    q === u(m) &&
                    (T ? (U(oe), (oe = -1)) : (T = !0), ge(G, ee - ye)))
                : ((q.sortIndex = E),
                  i(g, q),
                  w || b || ((w = !0), I || ((I = !0), F()))),
              q
            );
          }),
          (s.unstable_shouldYield = V),
          (s.unstable_wrapCallback = function (q) {
            var X = N;
            return function () {
              var ee = N;
              N = X;
              try {
                return q.apply(this, arguments);
              } finally {
                N = ee;
              }
            };
          });
      })(oo)),
    oo
  );
}
var om;
function ey() {
  return om || ((om = 1), (uo.exports = Ix())), uo.exports;
}
var co = { exports: {} },
  We = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var cm;
function ty() {
  if (cm) return We;
  cm = 1;
  var s = So();
  function i(g) {
    var m = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return (
      "Minified React error #" +
      g +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function u() {}
  var r = {
      d: {
        f: u,
        r: function () {
          throw Error(i(522));
        },
        D: u,
        C: u,
        L: u,
        m: u,
        X: u,
        S: u,
        M: u,
      },
      p: 0,
      findDOMNode: null,
    },
    f = Symbol.for("react.portal");
  function d(g, m, y) {
    var S =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: S == null ? null : "" + S,
      children: g,
      containerInfo: m,
      implementation: y,
    };
  }
  var h = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function x(g, m) {
    if (g === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (We.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (We.createPortal = function (g, m) {
      var y =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(i(299));
      return d(g, m, null, y);
    }),
    (We.flushSync = function (g) {
      var m = h.T,
        y = r.p;
      try {
        if (((h.T = null), (r.p = 2), g)) return g();
      } finally {
        (h.T = m), (r.p = y), r.d.f();
      }
    }),
    (We.preconnect = function (g, m) {
      typeof g == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        r.d.C(g, m));
    }),
    (We.prefetchDNS = function (g) {
      typeof g == "string" && r.d.D(g);
    }),
    (We.preinit = function (g, m) {
      if (typeof g == "string" && m && typeof m.as == "string") {
        var y = m.as,
          S = x(y, m.crossOrigin),
          N = typeof m.integrity == "string" ? m.integrity : void 0,
          b = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        y === "style"
          ? r.d.S(g, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: S,
              integrity: N,
              fetchPriority: b,
            })
          : y === "script" &&
            r.d.X(g, {
              crossOrigin: S,
              integrity: N,
              fetchPriority: b,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (We.preinitModule = function (g, m) {
      if (typeof g == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var y = x(m.as, m.crossOrigin);
            r.d.M(g, {
              crossOrigin: y,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && r.d.M(g);
    }),
    (We.preload = function (g, m) {
      if (
        typeof g == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var y = m.as,
          S = x(y, m.crossOrigin);
        r.d.L(g, y, {
          crossOrigin: S,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (We.preloadModule = function (g, m) {
      if (typeof g == "string")
        if (m) {
          var y = x(m.as, m.crossOrigin);
          r.d.m(g, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: y,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else r.d.m(g);
    }),
    (We.requestFormReset = function (g) {
      r.d.r(g);
    }),
    (We.unstable_batchedUpdates = function (g, m) {
      return g(m);
    }),
    (We.useFormState = function (g, m, y) {
      return h.H.useFormState(g, m, y);
    }),
    (We.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (We.version = "19.1.1"),
    We
  );
}
var fm;
function ny() {
  if (fm) return co.exports;
  fm = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (i) {
        console.error(i);
      }
  }
  return s(), (co.exports = ty()), co.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dm;
function ay() {
  if (dm) return kl;
  dm = 1;
  var s = ey(),
    i = So(),
    u = ny();
  function r(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function f(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function d(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function x(e) {
    if (d(e) !== e) throw Error(r(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var n = e, a = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var o = l.alternate;
      if (o === null) {
        if (((a = l.return), a !== null)) {
          n = a;
          continue;
        }
        break;
      }
      if (l.child === o.child) {
        for (o = l.child; o; ) {
          if (o === n) return x(l), e;
          if (o === a) return x(l), t;
          o = o.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== a.return) (n = l), (a = o);
      else {
        for (var p = !1, v = l.child; v; ) {
          if (v === n) {
            (p = !0), (n = l), (a = o);
            break;
          }
          if (v === a) {
            (p = !0), (a = l), (n = o);
            break;
          }
          v = v.sibling;
        }
        if (!p) {
          for (v = o.child; v; ) {
            if (v === n) {
              (p = !0), (n = o), (a = l);
              break;
            }
            if (v === a) {
              (p = !0), (a = o), (n = l);
              break;
            }
            v = v.sibling;
          }
          if (!p) throw Error(r(189));
        }
      }
      if (n.alternate !== a) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? e : t;
  }
  function m(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = m(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var y = Object.assign,
    S = Symbol.for("react.element"),
    N = Symbol.for("react.transitional.element"),
    b = Symbol.for("react.portal"),
    w = Symbol.for("react.fragment"),
    T = Symbol.for("react.strict_mode"),
    C = Symbol.for("react.profiler"),
    D = Symbol.for("react.provider"),
    U = Symbol.for("react.consumer"),
    Q = Symbol.for("react.context"),
    P = Symbol.for("react.forward_ref"),
    G = Symbol.for("react.suspense"),
    I = Symbol.for("react.suspense_list"),
    oe = Symbol.for("react.memo"),
    Se = Symbol.for("react.lazy"),
    xe = Symbol.for("react.activity"),
    V = Symbol.for("react.memo_cache_sentinel"),
    Z = Symbol.iterator;
  function F(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Z && e[Z]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var le = Symbol.for("react.client.reference");
  function me(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case w:
        return "Fragment";
      case C:
        return "Profiler";
      case T:
        return "StrictMode";
      case G:
        return "Suspense";
      case I:
        return "SuspenseList";
      case xe:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case b:
          return "Portal";
        case Q:
          return (e.displayName || "Context") + ".Provider";
        case U:
          return (e._context.displayName || "Context") + ".Consumer";
        case P:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case oe:
          return (
            (t = e.displayName || null), t !== null ? t : me(e.type) || "Memo"
          );
        case Se:
          (t = e._payload), (e = e._init);
          try {
            return me(e(t));
          } catch {}
      }
    return null;
  }
  var ge = Array.isArray,
    q = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ee = { pending: !1, data: null, method: null, action: null },
    ye = [],
    E = -1;
  function k(e) {
    return { current: e };
  }
  function $(e) {
    0 > E || ((e.current = ye[E]), (ye[E] = null), E--);
  }
  function K(e, t) {
    E++, (ye[E] = e.current), (e.current = t);
  }
  var te = k(null),
    ve = k(null),
    re = k(null),
    st = k(null);
  function Te(e, t) {
    switch ((K(re, t), K(ve, e), K(te, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Jd(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          (t = Jd(t)), (e = Fd(t, e));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    $(te), K(te, e);
  }
  function ln() {
    $(te), $(ve), $(re);
  }
  function Ms(e) {
    e.memoizedState !== null && K(st, e);
    var t = te.current,
      n = Fd(t, e.type);
    t !== n && (K(ve, e), K(te, n));
  }
  function Il(e) {
    ve.current === e && ($(te), $(ve)),
      st.current === e && ($(st), (Rl._currentValue = ee));
  }
  var Ls = Object.prototype.hasOwnProperty,
    Ds = s.unstable_scheduleCallback,
    zs = s.unstable_cancelCallback,
    ng = s.unstable_shouldYield,
    ag = s.unstable_requestPaint,
    Tt = s.unstable_now,
    lg = s.unstable_getCurrentPriorityLevel,
    Ao = s.unstable_ImmediatePriority,
    Oo = s.unstable_UserBlockingPriority,
    ei = s.unstable_NormalPriority,
    ig = s.unstable_LowPriority,
    To = s.unstable_IdlePriority,
    sg = s.log,
    rg = s.unstable_setDisableYieldValue,
    Ba = null,
    rt = null;
  function sn(e) {
    if (
      (typeof sg == "function" && rg(e),
      rt && typeof rt.setStrictMode == "function")
    )
      try {
        rt.setStrictMode(Ba, e);
      } catch {}
  }
  var ut = Math.clz32 ? Math.clz32 : cg,
    ug = Math.log,
    og = Math.LN2;
  function cg(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((ug(e) / og) | 0)) | 0;
  }
  var ti = 256,
    ni = 4194304;
  function Tn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
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
        return 64;
      case 128:
        return 128;
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
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function ai(e, t, n) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var l = 0,
      o = e.suspendedLanes,
      p = e.pingedLanes;
    e = e.warmLanes;
    var v = a & 134217727;
    return (
      v !== 0
        ? ((a = v & ~o),
          a !== 0
            ? (l = Tn(a))
            : ((p &= v),
              p !== 0
                ? (l = Tn(p))
                : n || ((n = v & ~e), n !== 0 && (l = Tn(n)))))
        : ((v = a & ~o),
          v !== 0
            ? (l = Tn(v))
            : p !== 0
            ? (l = Tn(p))
            : n || ((n = a & ~e), n !== 0 && (l = Tn(n)))),
      l === 0
        ? 0
        : t !== 0 &&
          t !== l &&
          (t & o) === 0 &&
          ((o = l & -l),
          (n = t & -t),
          o >= n || (o === 32 && (n & 4194048) !== 0))
        ? t
        : l
    );
  }
  function ka(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function fg(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
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
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ro() {
    var e = ti;
    return (ti <<= 1), (ti & 4194048) === 0 && (ti = 256), e;
  }
  function Mo() {
    var e = ni;
    return (ni <<= 1), (ni & 62914560) === 0 && (ni = 4194304), e;
  }
  function Us(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Ya(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function dg(e, t, n, a, l, o) {
    var p = e.pendingLanes;
    (e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= n),
      (e.entangledLanes &= n),
      (e.errorRecoveryDisabledLanes &= n),
      (e.shellSuspendCounter = 0);
    var v = e.entanglements,
      j = e.expirationTimes,
      R = e.hiddenUpdates;
    for (n = p & ~n; 0 < n; ) {
      var H = 31 - ut(n),
        Y = 1 << H;
      (v[H] = 0), (j[H] = -1);
      var M = R[H];
      if (M !== null)
        for (R[H] = null, H = 0; H < M.length; H++) {
          var L = M[H];
          L !== null && (L.lane &= -536870913);
        }
      n &= ~Y;
    }
    a !== 0 && Lo(e, a, 0),
      o !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= o & ~(p & ~t));
  }
  function Lo(e, t, n) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var a = 31 - ut(t);
    (e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (n & 4194090));
  }
  function Do(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var a = 31 - ut(n),
        l = 1 << a;
      (l & t) | (e[a] & t) && (e[a] |= t), (n &= ~l);
    }
  }
  function qs(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Hs(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function zo() {
    var e = X.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : gh(e.type));
  }
  function hg(e, t) {
    var n = X.p;
    try {
      return (X.p = e), t();
    } finally {
      X.p = n;
    }
  }
  var rn = Math.random().toString(36).slice(2),
    Fe = "__reactFiber$" + rn,
    tt = "__reactProps$" + rn,
    Jn = "__reactContainer$" + rn,
    Bs = "__reactEvents$" + rn,
    mg = "__reactListeners$" + rn,
    gg = "__reactHandles$" + rn,
    Uo = "__reactResources$" + rn,
    Ga = "__reactMarker$" + rn;
  function ks(e) {
    delete e[Fe], delete e[tt], delete e[Bs], delete e[mg], delete e[gg];
  }
  function Fn(e) {
    var t = e[Fe];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[Jn] || n[Fe])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = eh(e); e !== null; ) {
            if ((n = e[Fe])) return n;
            e = eh(e);
          }
        return t;
      }
      (e = n), (n = e.parentNode);
    }
    return null;
  }
  function Pn(e) {
    if ((e = e[Fe] || e[Jn])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Va(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function Wn(e) {
    var t = e[Uo];
    return (
      t ||
        (t = e[Uo] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Ge(e) {
    e[Ga] = !0;
  }
  var qo = new Set(),
    Ho = {};
  function Rn(e, t) {
    In(e, t), In(e + "Capture", t);
  }
  function In(e, t) {
    for (Ho[e] = t, e = 0; e < t.length; e++) qo.add(t[e]);
  }
  var pg = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Bo = {},
    ko = {};
  function xg(e) {
    return Ls.call(ko, e)
      ? !0
      : Ls.call(Bo, e)
      ? !1
      : pg.test(e)
      ? (ko[e] = !0)
      : ((Bo[e] = !0), !1);
  }
  function li(e, t, n) {
    if (xg(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function ii(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function kt(e, t, n, a) {
    if (a === null) e.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + a);
    }
  }
  var Ys, Yo;
  function ea(e) {
    if (Ys === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        (Ys = (t && t[1]) || ""),
          (Yo =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      Ys +
      e +
      Yo
    );
  }
  var Gs = !1;
  function Vs(e, t) {
    if (!e || Gs) return "";
    Gs = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var Y = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Y.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Y, []);
                } catch (L) {
                  var M = L;
                }
                Reflect.construct(e, [], Y);
              } else {
                try {
                  Y.call();
                } catch (L) {
                  M = L;
                }
                e.call(Y.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (L) {
                M = L;
              }
              (Y = e()) &&
                typeof Y.catch == "function" &&
                Y.catch(function () {});
            }
          } catch (L) {
            if (L && M && typeof L.stack == "string") return [L.stack, M.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var l = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      l &&
        l.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var o = a.DetermineComponentFrameRoot(),
        p = o[0],
        v = o[1];
      if (p && v) {
        var j = p.split(`
`),
          R = v.split(`
`);
        for (
          l = a = 0;
          a < j.length && !j[a].includes("DetermineComponentFrameRoot");

        )
          a++;
        for (; l < R.length && !R[l].includes("DetermineComponentFrameRoot"); )
          l++;
        if (a === j.length || l === R.length)
          for (
            a = j.length - 1, l = R.length - 1;
            1 <= a && 0 <= l && j[a] !== R[l];

          )
            l--;
        for (; 1 <= a && 0 <= l; a--, l--)
          if (j[a] !== R[l]) {
            if (a !== 1 || l !== 1)
              do
                if ((a--, l--, 0 > l || j[a] !== R[l])) {
                  var H =
                    `
` + j[a].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      H.includes("<anonymous>") &&
                      (H = H.replace("<anonymous>", e.displayName)),
                    H
                  );
                }
              while (1 <= a && 0 <= l);
            break;
          }
      }
    } finally {
      (Gs = !1), (Error.prepareStackTrace = n);
    }
    return (n = e ? e.displayName || e.name : "") ? ea(n) : "";
  }
  function yg(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ea(e.type);
      case 16:
        return ea("Lazy");
      case 13:
        return ea("Suspense");
      case 19:
        return ea("SuspenseList");
      case 0:
      case 15:
        return Vs(e.type, !1);
      case 11:
        return Vs(e.type.render, !1);
      case 1:
        return Vs(e.type, !0);
      case 31:
        return ea("Activity");
      default:
        return "";
    }
  }
  function Go(e) {
    try {
      var t = "";
      do (t += yg(e)), (e = e.return);
      while (e);
      return t;
    } catch (n) {
      return (
        `
Error generating stack: ` +
        n.message +
        `
` +
        n.stack
      );
    }
  }
  function pt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Vo(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function vg(e) {
    var t = Vo(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      a = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var l = n.get,
        o = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (p) {
            (a = "" + p), o.call(this, p);
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (p) {
            a = "" + p;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function si(e) {
    e._valueTracker || (e._valueTracker = vg(e));
  }
  function Qo(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      a = "";
    return (
      e && (a = Vo(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function ri(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var bg = /[\n"\\]/g;
  function xt(e) {
    return e.replace(bg, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function Qs(e, t, n, a, l, o, p, v) {
    (e.name = ""),
      p != null &&
      typeof p != "function" &&
      typeof p != "symbol" &&
      typeof p != "boolean"
        ? (e.type = p)
        : e.removeAttribute("type"),
      t != null
        ? p === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + pt(t))
          : e.value !== "" + pt(t) && (e.value = "" + pt(t))
        : (p !== "submit" && p !== "reset") || e.removeAttribute("value"),
      t != null
        ? Xs(e, p, pt(t))
        : n != null
        ? Xs(e, p, pt(n))
        : a != null && e.removeAttribute("value"),
      l == null && o != null && (e.defaultChecked = !!o),
      l != null &&
        (e.checked = l && typeof l != "function" && typeof l != "symbol"),
      v != null &&
      typeof v != "function" &&
      typeof v != "symbol" &&
      typeof v != "boolean"
        ? (e.name = "" + pt(v))
        : e.removeAttribute("name");
  }
  function Xo(e, t, n, a, l, o, p, v) {
    if (
      (o != null &&
        typeof o != "function" &&
        typeof o != "symbol" &&
        typeof o != "boolean" &&
        (e.type = o),
      t != null || n != null)
    ) {
      if (!((o !== "submit" && o !== "reset") || t != null)) return;
      (n = n != null ? "" + pt(n) : ""),
        (t = t != null ? "" + pt(t) : n),
        v || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (a = a ?? l),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (e.checked = v ? e.checked : !!a),
      (e.defaultChecked = !!a),
      p != null &&
        typeof p != "function" &&
        typeof p != "symbol" &&
        typeof p != "boolean" &&
        (e.name = p);
  }
  function Xs(e, t, n) {
    (t === "number" && ri(e.ownerDocument) === e) ||
      e.defaultValue === "" + n ||
      (e.defaultValue = "" + n);
  }
  function ta(e, t, n, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++)
        (l = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== l && (e[n].selected = l),
          l && a && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + pt(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          (e[l].selected = !0), a && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Zo(e, t, n) {
    if (
      t != null &&
      ((t = "" + pt(t)), t !== e.value && (e.value = t), n == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + pt(n) : "";
  }
  function Ko(e, t, n, a) {
    if (t == null) {
      if (a != null) {
        if (n != null) throw Error(r(92));
        if (ge(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), (t = n);
    }
    (n = pt(t)),
      (e.defaultValue = n),
      (a = e.textContent),
      a === n && a !== "" && a !== null && (e.value = a);
  }
  function na(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Sg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function $o(e, t, n) {
    var a = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? a
        ? e.setProperty(t, "")
        : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
      : a
      ? e.setProperty(t, n)
      : typeof n != "number" || n === 0 || Sg.has(t)
      ? t === "float"
        ? (e.cssFloat = n)
        : (e[t] = ("" + n).trim())
      : (e[t] = n + "px");
  }
  function Jo(e, t, n) {
    if (t != null && typeof t != "object") throw Error(r(62));
    if (((e = e.style), n != null)) {
      for (var a in n)
        !n.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? e.setProperty(a, "")
            : a === "float"
            ? (e.cssFloat = "")
            : (e[a] = ""));
      for (var l in t)
        (a = t[l]), t.hasOwnProperty(l) && n[l] !== a && $o(e, l, a);
    } else for (var o in t) t.hasOwnProperty(o) && $o(e, o, t[o]);
  }
  function Zs(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Ng = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    jg =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ui(e) {
    return jg.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var Ks = null;
  function $s(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var aa = null,
    la = null;
  function Fo(e) {
    var t = Pn(e);
    if (t && (e = t.stateNode)) {
      var n = e[tt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Qs(
              e,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name
            ),
            (t = n.name),
            n.type === "radio" && t != null)
          ) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name="' + xt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var a = n[t];
              if (a !== e && a.form === e.form) {
                var l = a[tt] || null;
                if (!l) throw Error(r(90));
                Qs(
                  a,
                  l.value,
                  l.defaultValue,
                  l.defaultValue,
                  l.checked,
                  l.defaultChecked,
                  l.type,
                  l.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              (a = n[t]), a.form === e.form && Qo(a);
          }
          break e;
        case "textarea":
          Zo(e, n.value, n.defaultValue);
          break e;
        case "select":
          (t = n.value), t != null && ta(e, !!n.multiple, t, !1);
      }
    }
  }
  var Js = !1;
  function Po(e, t, n) {
    if (Js) return e(t, n);
    Js = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((Js = !1),
        (aa !== null || la !== null) &&
          (Ki(), aa && ((t = aa), (e = la), (la = aa = null), Fo(t), e)))
      )
        for (t = 0; t < e.length; t++) Fo(e[t]);
    }
  }
  function Qa(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var a = n[tt] || null;
    if (a === null) return null;
    n = a[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !a);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(r(231, t, typeof n));
    return n;
  }
  var Yt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Fs = !1;
  if (Yt)
    try {
      var Xa = {};
      Object.defineProperty(Xa, "passive", {
        get: function () {
          Fs = !0;
        },
      }),
        window.addEventListener("test", Xa, Xa),
        window.removeEventListener("test", Xa, Xa);
    } catch {
      Fs = !1;
    }
  var un = null,
    Ps = null,
    oi = null;
  function Wo() {
    if (oi) return oi;
    var e,
      t = Ps,
      n = t.length,
      a,
      l = "value" in un ? un.value : un.textContent,
      o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var p = n - e;
    for (a = 1; a <= p && t[n - a] === l[o - a]; a++);
    return (oi = l.slice(e, 1 < a ? 1 - a : void 0));
  }
  function ci(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function fi() {
    return !0;
  }
  function Io() {
    return !1;
  }
  function nt(e) {
    function t(n, a, l, o, p) {
      (this._reactName = n),
        (this._targetInst = l),
        (this.type = a),
        (this.nativeEvent = o),
        (this.target = p),
        (this.currentTarget = null);
      for (var v in e)
        e.hasOwnProperty(v) && ((n = e[v]), (this[v] = n ? n(o) : o[v]));
      return (
        (this.isDefaultPrevented = (
          o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
        )
          ? fi
          : Io),
        (this.isPropagationStopped = Io),
        this
      );
    }
    return (
      y(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = fi));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = fi));
        },
        persist: function () {},
        isPersistent: fi,
      }),
      t
    );
  }
  var Mn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    di = nt(Mn),
    Za = y({}, Mn, { view: 0, detail: 0 }),
    wg = nt(Za),
    Ws,
    Is,
    Ka,
    hi = y({}, Za, {
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
      getModifierState: tr,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Ka &&
              (Ka && e.type === "mousemove"
                ? ((Ws = e.screenX - Ka.screenX), (Is = e.screenY - Ka.screenY))
                : (Is = Ws = 0),
              (Ka = e)),
            Ws);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Is;
      },
    }),
    ec = nt(hi),
    Eg = y({}, hi, { dataTransfer: 0 }),
    Cg = nt(Eg),
    _g = y({}, Za, { relatedTarget: 0 }),
    er = nt(_g),
    Ag = y({}, Mn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Og = nt(Ag),
    Tg = y({}, Mn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Rg = nt(Tg),
    Mg = y({}, Mn, { data: 0 }),
    tc = nt(Mg),
    Lg = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Dg = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    zg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Ug(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = zg[e])
      ? !!t[e]
      : !1;
  }
  function tr() {
    return Ug;
  }
  var qg = y({}, Za, {
      key: function (e) {
        if (e.key) {
          var t = Lg[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = ci(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
          ? Dg[e.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: tr,
      charCode: function (e) {
        return e.type === "keypress" ? ci(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? ci(e)
          : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
      },
    }),
    Hg = nt(qg),
    Bg = y({}, hi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    nc = nt(Bg),
    kg = y({}, Za, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: tr,
    }),
    Yg = nt(kg),
    Gg = y({}, Mn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Vg = nt(Gg),
    Qg = y({}, hi, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Xg = nt(Qg),
    Zg = y({}, Mn, { newState: 0, oldState: 0 }),
    Kg = nt(Zg),
    $g = [9, 13, 27, 32],
    nr = Yt && "CompositionEvent" in window,
    $a = null;
  Yt && "documentMode" in document && ($a = document.documentMode);
  var Jg = Yt && "TextEvent" in window && !$a,
    ac = Yt && (!nr || ($a && 8 < $a && 11 >= $a)),
    lc = " ",
    ic = !1;
  function sc(e, t) {
    switch (e) {
      case "keyup":
        return $g.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function rc(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var ia = !1;
  function Fg(e, t) {
    switch (e) {
      case "compositionend":
        return rc(t);
      case "keypress":
        return t.which !== 32 ? null : ((ic = !0), lc);
      case "textInput":
        return (e = t.data), e === lc && ic ? null : e;
      default:
        return null;
    }
  }
  function Pg(e, t) {
    if (ia)
      return e === "compositionend" || (!nr && sc(e, t))
        ? ((e = Wo()), (oi = Ps = un = null), (ia = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ac && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Wg = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
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
    week: !0,
  };
  function uc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Wg[e.type] : t === "textarea";
  }
  function oc(e, t, n, a) {
    aa ? (la ? la.push(a) : (la = [a])) : (aa = a),
      (t = Ii(t, "onChange")),
      0 < t.length &&
        ((n = new di("onChange", "change", null, n, a)),
        e.push({ event: n, listeners: t }));
  }
  var Ja = null,
    Fa = null;
  function Ig(e) {
    Qd(e, 0);
  }
  function mi(e) {
    var t = Va(e);
    if (Qo(t)) return e;
  }
  function cc(e, t) {
    if (e === "change") return t;
  }
  var fc = !1;
  if (Yt) {
    var ar;
    if (Yt) {
      var lr = "oninput" in document;
      if (!lr) {
        var dc = document.createElement("div");
        dc.setAttribute("oninput", "return;"),
          (lr = typeof dc.oninput == "function");
      }
      ar = lr;
    } else ar = !1;
    fc = ar && (!document.documentMode || 9 < document.documentMode);
  }
  function hc() {
    Ja && (Ja.detachEvent("onpropertychange", mc), (Fa = Ja = null));
  }
  function mc(e) {
    if (e.propertyName === "value" && mi(Fa)) {
      var t = [];
      oc(t, Fa, e, $s(e)), Po(Ig, t);
    }
  }
  function ep(e, t, n) {
    e === "focusin"
      ? (hc(), (Ja = t), (Fa = n), Ja.attachEvent("onpropertychange", mc))
      : e === "focusout" && hc();
  }
  function tp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return mi(Fa);
  }
  function np(e, t) {
    if (e === "click") return mi(t);
  }
  function ap(e, t) {
    if (e === "input" || e === "change") return mi(t);
  }
  function lp(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var ot = typeof Object.is == "function" ? Object.is : lp;
  function Pa(e, t) {
    if (ot(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      a = Object.keys(t);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var l = n[a];
      if (!Ls.call(t, l) || !ot(e[l], t[l])) return !1;
    }
    return !0;
  }
  function gc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function pc(e, t) {
    var n = gc(e);
    e = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (((a = e + n.textContent.length), e <= t && a >= t))
          return { node: n, offset: t - e };
        e = a;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = gc(n);
    }
  }
  function xc(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? xc(e, t.parentNode)
        : "contains" in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function yc(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = ri(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = ri(e.document);
    }
    return t;
  }
  function ir(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var ip = Yt && "documentMode" in document && 11 >= document.documentMode,
    sa = null,
    sr = null,
    Wa = null,
    rr = !1;
  function vc(e, t, n) {
    var a =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    rr ||
      sa == null ||
      sa !== ri(a) ||
      ((a = sa),
      "selectionStart" in a && ir(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Wa && Pa(Wa, a)) ||
        ((Wa = a),
        (a = Ii(sr, "onSelect")),
        0 < a.length &&
          ((t = new di("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: a }),
          (t.target = sa))));
  }
  function Ln(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var ra = {
      animationend: Ln("Animation", "AnimationEnd"),
      animationiteration: Ln("Animation", "AnimationIteration"),
      animationstart: Ln("Animation", "AnimationStart"),
      transitionrun: Ln("Transition", "TransitionRun"),
      transitionstart: Ln("Transition", "TransitionStart"),
      transitioncancel: Ln("Transition", "TransitionCancel"),
      transitionend: Ln("Transition", "TransitionEnd"),
    },
    ur = {},
    bc = {};
  Yt &&
    ((bc = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete ra.animationend.animation,
      delete ra.animationiteration.animation,
      delete ra.animationstart.animation),
    "TransitionEvent" in window || delete ra.transitionend.transition);
  function Dn(e) {
    if (ur[e]) return ur[e];
    if (!ra[e]) return e;
    var t = ra[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in bc) return (ur[e] = t[n]);
    return e;
  }
  var Sc = Dn("animationend"),
    Nc = Dn("animationiteration"),
    jc = Dn("animationstart"),
    sp = Dn("transitionrun"),
    rp = Dn("transitionstart"),
    up = Dn("transitioncancel"),
    wc = Dn("transitionend"),
    Ec = new Map(),
    or =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  or.push("scrollEnd");
  function Ct(e, t) {
    Ec.set(e, t), Rn(t, [e]);
  }
  var Cc = new WeakMap();
  function yt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Cc.get(e);
      return n !== void 0
        ? n
        : ((t = { value: e, source: t, stack: Go(t) }), Cc.set(e, t), t);
    }
    return { value: e, source: t, stack: Go(t) };
  }
  var vt = [],
    ua = 0,
    cr = 0;
  function gi() {
    for (var e = ua, t = (cr = ua = 0); t < e; ) {
      var n = vt[t];
      vt[t++] = null;
      var a = vt[t];
      vt[t++] = null;
      var l = vt[t];
      vt[t++] = null;
      var o = vt[t];
      if (((vt[t++] = null), a !== null && l !== null)) {
        var p = a.pending;
        p === null ? (l.next = l) : ((l.next = p.next), (p.next = l)),
          (a.pending = l);
      }
      o !== 0 && _c(n, l, o);
    }
  }
  function pi(e, t, n, a) {
    (vt[ua++] = e),
      (vt[ua++] = t),
      (vt[ua++] = n),
      (vt[ua++] = a),
      (cr |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a);
  }
  function fr(e, t, n, a) {
    return pi(e, t, n, a), xi(e);
  }
  function oa(e, t) {
    return pi(e, null, null, t), xi(e);
  }
  function _c(e, t, n) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n);
    for (var l = !1, o = e.return; o !== null; )
      (o.childLanes |= n),
        (a = o.alternate),
        a !== null && (a.childLanes |= n),
        o.tag === 22 &&
          ((e = o.stateNode), e === null || e._visibility & 1 || (l = !0)),
        (e = o),
        (o = o.return);
    return e.tag === 3
      ? ((o = e.stateNode),
        l &&
          t !== null &&
          ((l = 31 - ut(n)),
          (e = o.hiddenUpdates),
          (a = e[l]),
          a === null ? (e[l] = [t]) : a.push(t),
          (t.lane = n | 536870912)),
        o)
      : null;
  }
  function xi(e) {
    if (50 < jl) throw ((jl = 0), (xu = null), Error(r(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var ca = {};
  function op(e, t, n, a) {
    (this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function ct(e, t, n, a) {
    return new op(e, t, n, a);
  }
  function dr(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Gt(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = ct(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 65011712),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      (n.refCleanup = e.refCleanup),
      n
    );
  }
  function Ac(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return (
      n === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = n.childLanes),
          (e.lanes = n.lanes),
          (e.child = n.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = n.memoizedProps),
          (e.memoizedState = n.memoizedState),
          (e.updateQueue = n.updateQueue),
          (e.type = n.type),
          (t = n.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function yi(e, t, n, a, l, o) {
    var p = 0;
    if (((a = e), typeof e == "function")) dr(e) && (p = 1);
    else if (typeof e == "string")
      p = f0(e, n, te.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
    else
      e: switch (e) {
        case xe:
          return (e = ct(31, n, t, l)), (e.elementType = xe), (e.lanes = o), e;
        case w:
          return zn(n.children, l, o, t);
        case T:
          (p = 8), (l |= 24);
          break;
        case C:
          return (
            (e = ct(12, n, t, l | 2)), (e.elementType = C), (e.lanes = o), e
          );
        case G:
          return (e = ct(13, n, t, l)), (e.elementType = G), (e.lanes = o), e;
        case I:
          return (e = ct(19, n, t, l)), (e.elementType = I), (e.lanes = o), e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case D:
              case Q:
                p = 10;
                break e;
              case U:
                p = 9;
                break e;
              case P:
                p = 11;
                break e;
              case oe:
                p = 14;
                break e;
              case Se:
                (p = 16), (a = null);
                break e;
            }
          (p = 29),
            (n = Error(r(130, e === null ? "null" : typeof e, ""))),
            (a = null);
      }
    return (
      (t = ct(p, n, t, l)), (t.elementType = e), (t.type = a), (t.lanes = o), t
    );
  }
  function zn(e, t, n, a) {
    return (e = ct(7, e, a, t)), (e.lanes = n), e;
  }
  function hr(e, t, n) {
    return (e = ct(6, e, null, t)), (e.lanes = n), e;
  }
  function mr(e, t, n) {
    return (
      (t = ct(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var fa = [],
    da = 0,
    vi = null,
    bi = 0,
    bt = [],
    St = 0,
    Un = null,
    Vt = 1,
    Qt = "";
  function qn(e, t) {
    (fa[da++] = bi), (fa[da++] = vi), (vi = e), (bi = t);
  }
  function Oc(e, t, n) {
    (bt[St++] = Vt), (bt[St++] = Qt), (bt[St++] = Un), (Un = e);
    var a = Vt;
    e = Qt;
    var l = 32 - ut(a) - 1;
    (a &= ~(1 << l)), (n += 1);
    var o = 32 - ut(t) + l;
    if (30 < o) {
      var p = l - (l % 5);
      (o = (a & ((1 << p) - 1)).toString(32)),
        (a >>= p),
        (l -= p),
        (Vt = (1 << (32 - ut(t) + l)) | (n << l) | a),
        (Qt = o + e);
    } else (Vt = (1 << o) | (n << l) | a), (Qt = e);
  }
  function gr(e) {
    e.return !== null && (qn(e, 1), Oc(e, 1, 0));
  }
  function pr(e) {
    for (; e === vi; )
      (vi = fa[--da]), (fa[da] = null), (bi = fa[--da]), (fa[da] = null);
    for (; e === Un; )
      (Un = bt[--St]),
        (bt[St] = null),
        (Qt = bt[--St]),
        (bt[St] = null),
        (Vt = bt[--St]),
        (bt[St] = null);
  }
  var et = null,
    Le = null,
    Ne = !1,
    Hn = null,
    Rt = !1,
    xr = Error(r(519));
  function Bn(e) {
    var t = Error(r(418, ""));
    throw (tl(yt(t, e)), xr);
  }
  function Tc(e) {
    var t = e.stateNode,
      n = e.type,
      a = e.memoizedProps;
    switch (((t[Fe] = e), (t[tt] = a), n)) {
      case "dialog":
        he("cancel", t), he("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        he("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < El.length; n++) he(El[n], t);
        break;
      case "source":
        he("error", t);
        break;
      case "img":
      case "image":
      case "link":
        he("error", t), he("load", t);
        break;
      case "details":
        he("toggle", t);
        break;
      case "input":
        he("invalid", t),
          Xo(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          ),
          si(t);
        break;
      case "select":
        he("invalid", t);
        break;
      case "textarea":
        he("invalid", t), Ko(t, a.value, a.defaultValue, a.children), si(t);
    }
    (n = a.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      t.textContent === "" + n ||
      a.suppressHydrationWarning === !0 ||
      $d(t.textContent, n)
        ? (a.popover != null && (he("beforetoggle", t), he("toggle", t)),
          a.onScroll != null && he("scroll", t),
          a.onScrollEnd != null && he("scrollend", t),
          a.onClick != null && (t.onclick = es),
          (t = !0))
        : (t = !1),
      t || Bn(e);
  }
  function Rc(e) {
    for (et = e.return; et; )
      switch (et.tag) {
        case 5:
        case 13:
          Rt = !1;
          return;
        case 27:
        case 3:
          Rt = !0;
          return;
        default:
          et = et.return;
      }
  }
  function Ia(e) {
    if (e !== et) return !1;
    if (!Ne) return Rc(e), (Ne = !0), !1;
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type),
          (n =
            !(n !== "form" && n !== "button") || Lu(e.type, e.memoizedProps))),
        (n = !n)),
      n && Le && Bn(e),
      Rc(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((n = e.data), n === "/$")) {
              if (t === 0) {
                Le = At(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          e = e.nextSibling;
        }
        Le = null;
      }
    } else
      t === 27
        ? ((t = Le), wn(e.type) ? ((e = qu), (qu = null), (Le = e)) : (Le = t))
        : (Le = et ? At(e.stateNode.nextSibling) : null);
    return !0;
  }
  function el() {
    (Le = et = null), (Ne = !1);
  }
  function Mc() {
    var e = Hn;
    return (
      e !== null &&
        (it === null ? (it = e) : it.push.apply(it, e), (Hn = null)),
      e
    );
  }
  function tl(e) {
    Hn === null ? (Hn = [e]) : Hn.push(e);
  }
  var yr = k(null),
    kn = null,
    Xt = null;
  function on(e, t, n) {
    K(yr, t._currentValue), (t._currentValue = n);
  }
  function Zt(e) {
    (e._currentValue = yr.current), $(yr);
  }
  function vr(e, t, n) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function br(e, t, n, a) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null; ) {
      var o = l.dependencies;
      if (o !== null) {
        var p = l.child;
        o = o.firstContext;
        e: for (; o !== null; ) {
          var v = o;
          o = l;
          for (var j = 0; j < t.length; j++)
            if (v.context === t[j]) {
              (o.lanes |= n),
                (v = o.alternate),
                v !== null && (v.lanes |= n),
                vr(o.return, n, e),
                a || (p = null);
              break e;
            }
          o = v.next;
        }
      } else if (l.tag === 18) {
        if (((p = l.return), p === null)) throw Error(r(341));
        (p.lanes |= n),
          (o = p.alternate),
          o !== null && (o.lanes |= n),
          vr(p, n, e),
          (p = null);
      } else p = l.child;
      if (p !== null) p.return = l;
      else
        for (p = l; p !== null; ) {
          if (p === e) {
            p = null;
            break;
          }
          if (((l = p.sibling), l !== null)) {
            (l.return = p.return), (p = l);
            break;
          }
          p = p.return;
        }
      l = p;
    }
  }
  function nl(e, t, n, a) {
    e = null;
    for (var l = t, o = !1; l !== null; ) {
      if (!o) {
        if ((l.flags & 524288) !== 0) o = !0;
        else if ((l.flags & 262144) !== 0) break;
      }
      if (l.tag === 10) {
        var p = l.alternate;
        if (p === null) throw Error(r(387));
        if (((p = p.memoizedProps), p !== null)) {
          var v = l.type;
          ot(l.pendingProps.value, p.value) ||
            (e !== null ? e.push(v) : (e = [v]));
        }
      } else if (l === st.current) {
        if (((p = l.alternate), p === null)) throw Error(r(387));
        p.memoizedState.memoizedState !== l.memoizedState.memoizedState &&
          (e !== null ? e.push(Rl) : (e = [Rl]));
      }
      l = l.return;
    }
    e !== null && br(t, e, n, a), (t.flags |= 262144);
  }
  function Si(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ot(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Yn(e) {
    (kn = e),
      (Xt = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function Pe(e) {
    return Lc(kn, e);
  }
  function Ni(e, t) {
    return kn === null && Yn(e), Lc(e, t);
  }
  function Lc(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), Xt === null)) {
      if (e === null) throw Error(r(308));
      (Xt = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else Xt = Xt.next = t;
    return n;
  }
  var cp =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (n, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (n) {
                  return n();
                });
            };
          },
    fp = s.unstable_scheduleCallback,
    dp = s.unstable_NormalPriority,
    Be = {
      $$typeof: Q,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Sr() {
    return { controller: new cp(), data: new Map(), refCount: 0 };
  }
  function al(e) {
    e.refCount--,
      e.refCount === 0 &&
        fp(dp, function () {
          e.controller.abort();
        });
  }
  var ll = null,
    Nr = 0,
    ha = 0,
    ma = null;
  function hp(e, t) {
    if (ll === null) {
      var n = (ll = []);
      (Nr = 0),
        (ha = wu()),
        (ma = {
          status: "pending",
          value: void 0,
          then: function (a) {
            n.push(a);
          },
        });
    }
    return Nr++, t.then(Dc, Dc), t;
  }
  function Dc() {
    if (--Nr === 0 && ll !== null) {
      ma !== null && (ma.status = "fulfilled");
      var e = ll;
      (ll = null), (ha = 0), (ma = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function mp(e, t) {
    var n = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (l) {
          n.push(l);
        },
      };
    return (
      e.then(
        function () {
          (a.status = "fulfilled"), (a.value = t);
          for (var l = 0; l < n.length; l++) (0, n[l])(t);
        },
        function (l) {
          for (a.status = "rejected", a.reason = l, l = 0; l < n.length; l++)
            (0, n[l])(void 0);
        }
      ),
      a
    );
  }
  var zc = q.S;
  q.S = function (e, t) {
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      hp(e, t),
      zc !== null && zc(e, t);
  };
  var Gn = k(null);
  function jr() {
    var e = Gn.current;
    return e !== null ? e : Oe.pooledCache;
  }
  function ji(e, t) {
    t === null ? K(Gn, Gn.current) : K(Gn, t.pool);
  }
  function Uc() {
    var e = jr();
    return e === null ? null : { parent: Be._currentValue, pool: e };
  }
  var il = Error(r(460)),
    qc = Error(r(474)),
    wi = Error(r(542)),
    wr = { then: function () {} };
  function Hc(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected";
  }
  function Ei() {}
  function Bc(e, t, n) {
    switch (
      ((n = e[n]),
      n === void 0 ? e.push(t) : n !== t && (t.then(Ei, Ei), (t = n)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), Yc(e), e);
      default:
        if (typeof t.status == "string") t.then(Ei, Ei);
        else {
          if (((e = Oe), e !== null && 100 < e.shellSuspendCounter))
            throw Error(r(482));
          (e = t),
            (e.status = "pending"),
            e.then(
              function (a) {
                if (t.status === "pending") {
                  var l = t;
                  (l.status = "fulfilled"), (l.value = a);
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var l = t;
                  (l.status = "rejected"), (l.reason = a);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), Yc(e), e);
        }
        throw ((sl = t), il);
    }
  }
  var sl = null;
  function kc() {
    if (sl === null) throw Error(r(459));
    var e = sl;
    return (sl = null), e;
  }
  function Yc(e) {
    if (e === il || e === wi) throw Error(r(483));
  }
  var cn = !1;
  function Er(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Cr(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function fn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function dn(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (je & 2) !== 0)) {
      var l = a.pending;
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (a.pending = t),
        (t = xi(e)),
        _c(e, null, n),
        t
      );
    }
    return pi(e, a, t, n), xi(e);
  }
  function rl(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))
    ) {
      var a = t.lanes;
      (a &= e.pendingLanes), (n |= a), (t.lanes = n), Do(e, n);
    }
  }
  function _r(e, t) {
    var n = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), n === a)) {
      var l = null,
        o = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var p = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          };
          o === null ? (l = o = p) : (o = o.next = p), (n = n.next);
        } while (n !== null);
        o === null ? (l = o = t) : (o = o.next = t);
      } else l = o = t;
      (n = {
        baseState: a.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: o,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = n);
      return;
    }
    (e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t);
  }
  var Ar = !1;
  function ul() {
    if (Ar) {
      var e = ma;
      if (e !== null) throw e;
    }
  }
  function ol(e, t, n, a) {
    Ar = !1;
    var l = e.updateQueue;
    cn = !1;
    var o = l.firstBaseUpdate,
      p = l.lastBaseUpdate,
      v = l.shared.pending;
    if (v !== null) {
      l.shared.pending = null;
      var j = v,
        R = j.next;
      (j.next = null), p === null ? (o = R) : (p.next = R), (p = j);
      var H = e.alternate;
      H !== null &&
        ((H = H.updateQueue),
        (v = H.lastBaseUpdate),
        v !== p &&
          (v === null ? (H.firstBaseUpdate = R) : (v.next = R),
          (H.lastBaseUpdate = j)));
    }
    if (o !== null) {
      var Y = l.baseState;
      (p = 0), (H = R = j = null), (v = o);
      do {
        var M = v.lane & -536870913,
          L = M !== v.lane;
        if (L ? (pe & M) === M : (a & M) === M) {
          M !== 0 && M === ha && (Ar = !0),
            H !== null &&
              (H = H.next =
                {
                  lane: 0,
                  tag: v.tag,
                  payload: v.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var ie = e,
              ne = v;
            M = t;
            var _e = n;
            switch (ne.tag) {
              case 1:
                if (((ie = ne.payload), typeof ie == "function")) {
                  Y = ie.call(_e, Y, M);
                  break e;
                }
                Y = ie;
                break e;
              case 3:
                ie.flags = (ie.flags & -65537) | 128;
              case 0:
                if (
                  ((ie = ne.payload),
                  (M = typeof ie == "function" ? ie.call(_e, Y, M) : ie),
                  M == null)
                )
                  break e;
                Y = y({}, Y, M);
                break e;
              case 2:
                cn = !0;
            }
          }
          (M = v.callback),
            M !== null &&
              ((e.flags |= 64),
              L && (e.flags |= 8192),
              (L = l.callbacks),
              L === null ? (l.callbacks = [M]) : L.push(M));
        } else
          (L = {
            lane: M,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null,
          }),
            H === null ? ((R = H = L), (j = Y)) : (H = H.next = L),
            (p |= M);
        if (((v = v.next), v === null)) {
          if (((v = l.shared.pending), v === null)) break;
          (L = v),
            (v = L.next),
            (L.next = null),
            (l.lastBaseUpdate = L),
            (l.shared.pending = null);
        }
      } while (!0);
      H === null && (j = Y),
        (l.baseState = j),
        (l.firstBaseUpdate = R),
        (l.lastBaseUpdate = H),
        o === null && (l.shared.lanes = 0),
        (bn |= p),
        (e.lanes = p),
        (e.memoizedState = Y);
    }
  }
  function Gc(e, t) {
    if (typeof e != "function") throw Error(r(191, e));
    e.call(t);
  }
  function Vc(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++) Gc(n[e], t);
  }
  var ga = k(null),
    Ci = k(0);
  function Qc(e, t) {
    (e = It), K(Ci, e), K(ga, t), (It = e | t.baseLanes);
  }
  function Or() {
    K(Ci, It), K(ga, ga.current);
  }
  function Tr() {
    (It = Ci.current), $(ga), $(Ci);
  }
  var hn = 0,
    ce = null,
    Ee = null,
    qe = null,
    _i = !1,
    pa = !1,
    Vn = !1,
    Ai = 0,
    cl = 0,
    xa = null,
    gp = 0;
  function ze() {
    throw Error(r(321));
  }
  function Rr(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!ot(e[n], t[n])) return !1;
    return !0;
  }
  function Mr(e, t, n, a, l, o) {
    return (
      (hn = o),
      (ce = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (q.H = e === null || e.memoizedState === null ? Af : Of),
      (Vn = !1),
      (o = n(a, l)),
      (Vn = !1),
      pa && (o = Zc(t, n, a, l)),
      Xc(e),
      o
    );
  }
  function Xc(e) {
    q.H = Di;
    var t = Ee !== null && Ee.next !== null;
    if (((hn = 0), (qe = Ee = ce = null), (_i = !1), (cl = 0), (xa = null), t))
      throw Error(r(300));
    e === null ||
      Ve ||
      ((e = e.dependencies), e !== null && Si(e) && (Ve = !0));
  }
  function Zc(e, t, n, a) {
    ce = e;
    var l = 0;
    do {
      if ((pa && (xa = null), (cl = 0), (pa = !1), 25 <= l))
        throw Error(r(301));
      if (((l += 1), (qe = Ee = null), e.updateQueue != null)) {
        var o = e.updateQueue;
        (o.lastEffect = null),
          (o.events = null),
          (o.stores = null),
          o.memoCache != null && (o.memoCache.index = 0);
      }
      (q.H = Np), (o = t(n, a));
    } while (pa);
    return o;
  }
  function pp() {
    var e = q.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? fl(t) : t),
      (e = e.useState()[0]),
      (Ee !== null ? Ee.memoizedState : null) !== e && (ce.flags |= 1024),
      t
    );
  }
  function Lr() {
    var e = Ai !== 0;
    return (Ai = 0), e;
  }
  function Dr(e, t, n) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n);
  }
  function zr(e) {
    if (_i) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      _i = !1;
    }
    (hn = 0), (qe = Ee = ce = null), (pa = !1), (cl = Ai = 0), (xa = null);
  }
  function at() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return qe === null ? (ce.memoizedState = qe = e) : (qe = qe.next = e), qe;
  }
  function He() {
    if (Ee === null) {
      var e = ce.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ee.next;
    var t = qe === null ? ce.memoizedState : qe.next;
    if (t !== null) (qe = t), (Ee = e);
    else {
      if (e === null)
        throw ce.alternate === null ? Error(r(467)) : Error(r(310));
      (Ee = e),
        (e = {
          memoizedState: Ee.memoizedState,
          baseState: Ee.baseState,
          baseQueue: Ee.baseQueue,
          queue: Ee.queue,
          next: null,
        }),
        qe === null ? (ce.memoizedState = qe = e) : (qe = qe.next = e);
    }
    return qe;
  }
  function Ur() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function fl(e) {
    var t = cl;
    return (
      (cl += 1),
      xa === null && (xa = []),
      (e = Bc(xa, e, t)),
      (t = ce),
      (qe === null ? t.memoizedState : qe.next) === null &&
        ((t = t.alternate),
        (q.H = t === null || t.memoizedState === null ? Af : Of)),
      e
    );
  }
  function Oi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return fl(e);
      if (e.$$typeof === Q) return Pe(e);
    }
    throw Error(r(438, String(e)));
  }
  function qr(e) {
    var t = null,
      n = ce.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var a = ce.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (l) {
                return l.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      n === null && ((n = Ur()), (ce.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), a = 0; a < e; a++) n[a] = V;
    return t.index++, n;
  }
  function Kt(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ti(e) {
    var t = He();
    return Hr(t, Ee, e);
  }
  function Hr(e, t, n) {
    var a = e.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var l = e.baseQueue,
      o = a.pending;
    if (o !== null) {
      if (l !== null) {
        var p = l.next;
        (l.next = o.next), (o.next = p);
      }
      (t.baseQueue = l = o), (a.pending = null);
    }
    if (((o = e.baseState), l === null)) e.memoizedState = o;
    else {
      t = l.next;
      var v = (p = null),
        j = null,
        R = t,
        H = !1;
      do {
        var Y = R.lane & -536870913;
        if (Y !== R.lane ? (pe & Y) === Y : (hn & Y) === Y) {
          var M = R.revertLane;
          if (M === 0)
            j !== null &&
              (j = j.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: R.action,
                  hasEagerState: R.hasEagerState,
                  eagerState: R.eagerState,
                  next: null,
                }),
              Y === ha && (H = !0);
          else if ((hn & M) === M) {
            (R = R.next), M === ha && (H = !0);
            continue;
          } else
            (Y = {
              lane: 0,
              revertLane: R.revertLane,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null,
            }),
              j === null ? ((v = j = Y), (p = o)) : (j = j.next = Y),
              (ce.lanes |= M),
              (bn |= M);
          (Y = R.action),
            Vn && n(o, Y),
            (o = R.hasEagerState ? R.eagerState : n(o, Y));
        } else
          (M = {
            lane: Y,
            revertLane: R.revertLane,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null,
          }),
            j === null ? ((v = j = M), (p = o)) : (j = j.next = M),
            (ce.lanes |= Y),
            (bn |= Y);
        R = R.next;
      } while (R !== null && R !== t);
      if (
        (j === null ? (p = o) : (j.next = v),
        !ot(o, e.memoizedState) && ((Ve = !0), H && ((n = ma), n !== null)))
      )
        throw n;
      (e.memoizedState = o),
        (e.baseState = p),
        (e.baseQueue = j),
        (a.lastRenderedState = o);
    }
    return l === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function Br(e) {
    var t = He(),
      n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = e;
    var a = n.dispatch,
      l = n.pending,
      o = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var p = (l = l.next);
      do (o = e(o, p.action)), (p = p.next);
      while (p !== l);
      ot(o, t.memoizedState) || (Ve = !0),
        (t.memoizedState = o),
        t.baseQueue === null && (t.baseState = o),
        (n.lastRenderedState = o);
    }
    return [o, a];
  }
  function Kc(e, t, n) {
    var a = ce,
      l = He(),
      o = Ne;
    if (o) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = t();
    var p = !ot((Ee || l).memoizedState, n);
    p && ((l.memoizedState = n), (Ve = !0)), (l = l.queue);
    var v = Fc.bind(null, a, l, e);
    if (
      (dl(2048, 8, v, [e]),
      l.getSnapshot !== t || p || (qe !== null && qe.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        ya(9, Ri(), Jc.bind(null, a, l, n, t), null),
        Oe === null)
      )
        throw Error(r(349));
      o || (hn & 124) !== 0 || $c(a, t, n);
    }
    return n;
  }
  function $c(e, t, n) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = ce.updateQueue),
      t === null
        ? ((t = Ur()), (ce.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
  }
  function Jc(e, t, n, a) {
    (t.value = n), (t.getSnapshot = a), Pc(t) && Wc(e);
  }
  function Fc(e, t, n) {
    return n(function () {
      Pc(t) && Wc(e);
    });
  }
  function Pc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !ot(e, n);
    } catch {
      return !0;
    }
  }
  function Wc(e) {
    var t = oa(e, 2);
    t !== null && gt(t, e, 2);
  }
  function kr(e) {
    var t = at();
    if (typeof e == "function") {
      var n = e;
      if (((e = n()), Vn)) {
        sn(!0);
        try {
          n();
        } finally {
          sn(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kt,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Ic(e, t, n, a) {
    return (e.baseState = n), Hr(e, Ee, typeof a == "function" ? a : Kt);
  }
  function xp(e, t, n, a, l) {
    if (Li(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var o = {
        payload: l,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (p) {
          o.listeners.push(p);
        },
      };
      q.T !== null ? n(!0) : (o.isTransition = !1),
        a(o),
        (n = t.pending),
        n === null
          ? ((o.next = t.pending = o), ef(t, o))
          : ((o.next = n.next), (t.pending = n.next = o));
    }
  }
  function ef(e, t) {
    var n = t.action,
      a = t.payload,
      l = e.state;
    if (t.isTransition) {
      var o = q.T,
        p = {};
      q.T = p;
      try {
        var v = n(l, a),
          j = q.S;
        j !== null && j(p, v), tf(e, t, v);
      } catch (R) {
        Yr(e, t, R);
      } finally {
        q.T = o;
      }
    } else
      try {
        (o = n(l, a)), tf(e, t, o);
      } catch (R) {
        Yr(e, t, R);
      }
  }
  function tf(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (a) {
            nf(e, t, a);
          },
          function (a) {
            return Yr(e, t, a);
          }
        )
      : nf(e, t, n);
  }
  function nf(e, t, n) {
    (t.status = "fulfilled"),
      (t.value = n),
      af(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next),
        n === t ? (e.pending = null) : ((n = n.next), (t.next = n), ef(e, n)));
  }
  function Yr(e, t, n) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do (t.status = "rejected"), (t.reason = n), af(t), (t = t.next);
      while (t !== a);
    }
    e.action = null;
  }
  function af(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function lf(e, t) {
    return t;
  }
  function sf(e, t) {
    if (Ne) {
      var n = Oe.formState;
      if (n !== null) {
        e: {
          var a = ce;
          if (Ne) {
            if (Le) {
              t: {
                for (var l = Le, o = Rt; l.nodeType !== 8; ) {
                  if (!o) {
                    l = null;
                    break t;
                  }
                  if (((l = At(l.nextSibling)), l === null)) {
                    l = null;
                    break t;
                  }
                }
                (o = l.data), (l = o === "F!" || o === "F" ? l : null);
              }
              if (l) {
                (Le = At(l.nextSibling)), (a = l.data === "F!");
                break e;
              }
            }
            Bn(a);
          }
          a = !1;
        }
        a && (t = n[0]);
      }
    }
    return (
      (n = at()),
      (n.memoizedState = n.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: lf,
        lastRenderedState: t,
      }),
      (n.queue = a),
      (n = Ef.bind(null, ce, a)),
      (a.dispatch = n),
      (a = kr(!1)),
      (o = Zr.bind(null, ce, !1, a.queue)),
      (a = at()),
      (l = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = l),
      (n = xp.bind(null, ce, l, o, n)),
      (l.dispatch = n),
      (a.memoizedState = e),
      [t, n, !1]
    );
  }
  function rf(e) {
    var t = He();
    return uf(t, Ee, e);
  }
  function uf(e, t, n) {
    if (
      ((t = Hr(e, t, lf)[0]),
      (e = Ti(Kt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = fl(t);
      } catch (p) {
        throw p === il ? wi : p;
      }
    else a = t;
    t = He();
    var l = t.queue,
      o = l.dispatch;
    return (
      n !== t.memoizedState &&
        ((ce.flags |= 2048), ya(9, Ri(), yp.bind(null, l, n), null)),
      [a, o, e]
    );
  }
  function yp(e, t) {
    e.action = t;
  }
  function of(e) {
    var t = He(),
      n = Ee;
    if (n !== null) return uf(t, n, e);
    He(), (t = t.memoizedState), (n = He());
    var a = n.queue.dispatch;
    return (n.memoizedState = e), [t, a, !1];
  }
  function ya(e, t, n, a) {
    return (
      (e = { tag: e, create: n, deps: a, inst: t, next: null }),
      (t = ce.updateQueue),
      t === null && ((t = Ur()), (ce.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((a = n.next), (n.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function Ri() {
    return { destroy: void 0, resource: void 0 };
  }
  function cf() {
    return He().memoizedState;
  }
  function Mi(e, t, n, a) {
    var l = at();
    (a = a === void 0 ? null : a),
      (ce.flags |= e),
      (l.memoizedState = ya(1 | t, Ri(), n, a));
  }
  function dl(e, t, n, a) {
    var l = He();
    a = a === void 0 ? null : a;
    var o = l.memoizedState.inst;
    Ee !== null && a !== null && Rr(a, Ee.memoizedState.deps)
      ? (l.memoizedState = ya(t, o, n, a))
      : ((ce.flags |= e), (l.memoizedState = ya(1 | t, o, n, a)));
  }
  function ff(e, t) {
    Mi(8390656, 8, e, t);
  }
  function df(e, t) {
    dl(2048, 8, e, t);
  }
  function hf(e, t) {
    return dl(4, 2, e, t);
  }
  function mf(e, t) {
    return dl(4, 4, e, t);
  }
  function gf(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function () {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function pf(e, t, n) {
    (n = n != null ? n.concat([e]) : null), dl(4, 4, gf.bind(null, t, e), n);
  }
  function Gr() {}
  function xf(e, t) {
    var n = He();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return t !== null && Rr(t, a[1]) ? a[0] : ((n.memoizedState = [e, t]), e);
  }
  function yf(e, t) {
    var n = He();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    if (t !== null && Rr(t, a[1])) return a[0];
    if (((a = e()), Vn)) {
      sn(!0);
      try {
        e();
      } finally {
        sn(!1);
      }
    }
    return (n.memoizedState = [a, t]), a;
  }
  function Vr(e, t, n) {
    return n === void 0 || (hn & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = Sd()), (ce.lanes |= e), (bn |= e), n);
  }
  function vf(e, t, n, a) {
    return ot(n, t)
      ? n
      : ga.current !== null
      ? ((e = Vr(e, n, a)), ot(e, t) || (Ve = !0), e)
      : (hn & 42) === 0
      ? ((Ve = !0), (e.memoizedState = n))
      : ((e = Sd()), (ce.lanes |= e), (bn |= e), t);
  }
  function bf(e, t, n, a, l) {
    var o = X.p;
    X.p = o !== 0 && 8 > o ? o : 8;
    var p = q.T,
      v = {};
    (q.T = v), Zr(e, !1, t, n);
    try {
      var j = l(),
        R = q.S;
      if (
        (R !== null && R(v, j),
        j !== null && typeof j == "object" && typeof j.then == "function")
      ) {
        var H = mp(j, a);
        hl(e, t, H, mt(e));
      } else hl(e, t, a, mt(e));
    } catch (Y) {
      hl(e, t, { then: function () {}, status: "rejected", reason: Y }, mt());
    } finally {
      (X.p = o), (q.T = p);
    }
  }
  function vp() {}
  function Qr(e, t, n, a) {
    if (e.tag !== 5) throw Error(r(476));
    var l = Sf(e).queue;
    bf(
      e,
      l,
      t,
      ee,
      n === null
        ? vp
        : function () {
            return Nf(e), n(a);
          }
    );
  }
  function Sf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ee,
      baseState: ee,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kt,
        lastRenderedState: ee,
      },
      next: null,
    };
    var n = {};
    return (
      (t.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Kt,
          lastRenderedState: n,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Nf(e) {
    var t = Sf(e).next.queue;
    hl(e, t, {}, mt());
  }
  function Xr() {
    return Pe(Rl);
  }
  function jf() {
    return He().memoizedState;
  }
  function wf() {
    return He().memoizedState;
  }
  function bp(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = mt();
          e = fn(n);
          var a = dn(t, e, n);
          a !== null && (gt(a, t, n), rl(a, t, n)),
            (t = { cache: Sr() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function Sp(e, t, n) {
    var a = mt();
    (n = {
      lane: a,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Li(e)
        ? Cf(t, n)
        : ((n = fr(e, t, n, a)), n !== null && (gt(n, e, a), _f(n, t, a)));
  }
  function Ef(e, t, n) {
    var a = mt();
    hl(e, t, n, a);
  }
  function hl(e, t, n, a) {
    var l = {
      lane: a,
      revertLane: 0,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Li(e)) Cf(t, l);
    else {
      var o = e.alternate;
      if (
        e.lanes === 0 &&
        (o === null || o.lanes === 0) &&
        ((o = t.lastRenderedReducer), o !== null)
      )
        try {
          var p = t.lastRenderedState,
            v = o(p, n);
          if (((l.hasEagerState = !0), (l.eagerState = v), ot(v, p)))
            return pi(e, t, l, 0), Oe === null && gi(), !1;
        } catch {
        } finally {
        }
      if (((n = fr(e, t, l, a)), n !== null))
        return gt(n, e, a), _f(n, t, a), !0;
    }
    return !1;
  }
  function Zr(e, t, n, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: wu(),
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Li(e))
    ) {
      if (t) throw Error(r(479));
    } else (t = fr(e, n, a, 2)), t !== null && gt(t, e, 2);
  }
  function Li(e) {
    var t = e.alternate;
    return e === ce || (t !== null && t === ce);
  }
  function Cf(e, t) {
    pa = _i = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t);
  }
  function _f(e, t, n) {
    if ((n & 4194048) !== 0) {
      var a = t.lanes;
      (a &= e.pendingLanes), (n |= a), (t.lanes = n), Do(e, n);
    }
  }
  var Di = {
      readContext: Pe,
      use: Oi,
      useCallback: ze,
      useContext: ze,
      useEffect: ze,
      useImperativeHandle: ze,
      useLayoutEffect: ze,
      useInsertionEffect: ze,
      useMemo: ze,
      useReducer: ze,
      useRef: ze,
      useState: ze,
      useDebugValue: ze,
      useDeferredValue: ze,
      useTransition: ze,
      useSyncExternalStore: ze,
      useId: ze,
      useHostTransitionStatus: ze,
      useFormState: ze,
      useActionState: ze,
      useOptimistic: ze,
      useMemoCache: ze,
      useCacheRefresh: ze,
    },
    Af = {
      readContext: Pe,
      use: Oi,
      useCallback: function (e, t) {
        return (at().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: Pe,
      useEffect: ff,
      useImperativeHandle: function (e, t, n) {
        (n = n != null ? n.concat([e]) : null),
          Mi(4194308, 4, gf.bind(null, t, e), n);
      },
      useLayoutEffect: function (e, t) {
        return Mi(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Mi(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = at();
        t = t === void 0 ? null : t;
        var a = e();
        if (Vn) {
          sn(!0);
          try {
            e();
          } finally {
            sn(!1);
          }
        }
        return (n.memoizedState = [a, t]), a;
      },
      useReducer: function (e, t, n) {
        var a = at();
        if (n !== void 0) {
          var l = n(t);
          if (Vn) {
            sn(!0);
            try {
              n(t);
            } finally {
              sn(!1);
            }
          }
        } else l = t;
        return (
          (a.memoizedState = a.baseState = l),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: l,
          }),
          (a.queue = e),
          (e = e.dispatch = Sp.bind(null, ce, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = at();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: function (e) {
        e = kr(e);
        var t = e.queue,
          n = Ef.bind(null, ce, t);
        return (t.dispatch = n), [e.memoizedState, n];
      },
      useDebugValue: Gr,
      useDeferredValue: function (e, t) {
        var n = at();
        return Vr(n, e, t);
      },
      useTransition: function () {
        var e = kr(!1);
        return (
          (e = bf.bind(null, ce, e.queue, !0, !1)),
          (at().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, n) {
        var a = ce,
          l = at();
        if (Ne) {
          if (n === void 0) throw Error(r(407));
          n = n();
        } else {
          if (((n = t()), Oe === null)) throw Error(r(349));
          (pe & 124) !== 0 || $c(a, t, n);
        }
        l.memoizedState = n;
        var o = { value: n, getSnapshot: t };
        return (
          (l.queue = o),
          ff(Fc.bind(null, a, o, e), [e]),
          (a.flags |= 2048),
          ya(9, Ri(), Jc.bind(null, a, o, n, t), null),
          n
        );
      },
      useId: function () {
        var e = at(),
          t = Oe.identifierPrefix;
        if (Ne) {
          var n = Qt,
            a = Vt;
          (n = (a & ~(1 << (32 - ut(a) - 1))).toString(32) + n),
            (t = "«" + t + "R" + n),
            (n = Ai++),
            0 < n && (t += "H" + n.toString(32)),
            (t += "»");
        } else (n = gp++), (t = "«" + t + "r" + n.toString(32) + "»");
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Xr,
      useFormState: sf,
      useActionState: sf,
      useOptimistic: function (e) {
        var t = at();
        t.memoizedState = t.baseState = e;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = n),
          (t = Zr.bind(null, ce, !0, n)),
          (n.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: qr,
      useCacheRefresh: function () {
        return (at().memoizedState = bp.bind(null, ce));
      },
    },
    Of = {
      readContext: Pe,
      use: Oi,
      useCallback: xf,
      useContext: Pe,
      useEffect: df,
      useImperativeHandle: pf,
      useInsertionEffect: hf,
      useLayoutEffect: mf,
      useMemo: yf,
      useReducer: Ti,
      useRef: cf,
      useState: function () {
        return Ti(Kt);
      },
      useDebugValue: Gr,
      useDeferredValue: function (e, t) {
        var n = He();
        return vf(n, Ee.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Ti(Kt)[0],
          t = He().memoizedState;
        return [typeof e == "boolean" ? e : fl(e), t];
      },
      useSyncExternalStore: Kc,
      useId: jf,
      useHostTransitionStatus: Xr,
      useFormState: rf,
      useActionState: rf,
      useOptimistic: function (e, t) {
        var n = He();
        return Ic(n, Ee, e, t);
      },
      useMemoCache: qr,
      useCacheRefresh: wf,
    },
    Np = {
      readContext: Pe,
      use: Oi,
      useCallback: xf,
      useContext: Pe,
      useEffect: df,
      useImperativeHandle: pf,
      useInsertionEffect: hf,
      useLayoutEffect: mf,
      useMemo: yf,
      useReducer: Br,
      useRef: cf,
      useState: function () {
        return Br(Kt);
      },
      useDebugValue: Gr,
      useDeferredValue: function (e, t) {
        var n = He();
        return Ee === null ? Vr(n, e, t) : vf(n, Ee.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Br(Kt)[0],
          t = He().memoizedState;
        return [typeof e == "boolean" ? e : fl(e), t];
      },
      useSyncExternalStore: Kc,
      useId: jf,
      useHostTransitionStatus: Xr,
      useFormState: of,
      useActionState: of,
      useOptimistic: function (e, t) {
        var n = He();
        return Ee !== null
          ? Ic(n, Ee, e, t)
          : ((n.baseState = e), [e, n.queue.dispatch]);
      },
      useMemoCache: qr,
      useCacheRefresh: wf,
    },
    va = null,
    ml = 0;
  function zi(e) {
    var t = ml;
    return (ml += 1), va === null && (va = []), Bc(va, e, t);
  }
  function gl(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function Ui(e, t) {
    throw t.$$typeof === S
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function Tf(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Rf(e) {
    function t(A, _) {
      if (e) {
        var O = A.deletions;
        O === null ? ((A.deletions = [_]), (A.flags |= 16)) : O.push(_);
      }
    }
    function n(A, _) {
      if (!e) return null;
      for (; _ !== null; ) t(A, _), (_ = _.sibling);
      return null;
    }
    function a(A) {
      for (var _ = new Map(); A !== null; )
        A.key !== null ? _.set(A.key, A) : _.set(A.index, A), (A = A.sibling);
      return _;
    }
    function l(A, _) {
      return (A = Gt(A, _)), (A.index = 0), (A.sibling = null), A;
    }
    function o(A, _, O) {
      return (
        (A.index = O),
        e
          ? ((O = A.alternate),
            O !== null
              ? ((O = O.index), O < _ ? ((A.flags |= 67108866), _) : O)
              : ((A.flags |= 67108866), _))
          : ((A.flags |= 1048576), _)
      );
    }
    function p(A) {
      return e && A.alternate === null && (A.flags |= 67108866), A;
    }
    function v(A, _, O, B) {
      return _ === null || _.tag !== 6
        ? ((_ = hr(O, A.mode, B)), (_.return = A), _)
        : ((_ = l(_, O)), (_.return = A), _);
    }
    function j(A, _, O, B) {
      var J = O.type;
      return J === w
        ? H(A, _, O.props.children, B, O.key)
        : _ !== null &&
          (_.elementType === J ||
            (typeof J == "object" &&
              J !== null &&
              J.$$typeof === Se &&
              Tf(J) === _.type))
        ? ((_ = l(_, O.props)), gl(_, O), (_.return = A), _)
        : ((_ = yi(O.type, O.key, O.props, null, A.mode, B)),
          gl(_, O),
          (_.return = A),
          _);
    }
    function R(A, _, O, B) {
      return _ === null ||
        _.tag !== 4 ||
        _.stateNode.containerInfo !== O.containerInfo ||
        _.stateNode.implementation !== O.implementation
        ? ((_ = mr(O, A.mode, B)), (_.return = A), _)
        : ((_ = l(_, O.children || [])), (_.return = A), _);
    }
    function H(A, _, O, B, J) {
      return _ === null || _.tag !== 7
        ? ((_ = zn(O, A.mode, B, J)), (_.return = A), _)
        : ((_ = l(_, O)), (_.return = A), _);
    }
    function Y(A, _, O) {
      if (
        (typeof _ == "string" && _ !== "") ||
        typeof _ == "number" ||
        typeof _ == "bigint"
      )
        return (_ = hr("" + _, A.mode, O)), (_.return = A), _;
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case N:
            return (
              (O = yi(_.type, _.key, _.props, null, A.mode, O)),
              gl(O, _),
              (O.return = A),
              O
            );
          case b:
            return (_ = mr(_, A.mode, O)), (_.return = A), _;
          case Se:
            var B = _._init;
            return (_ = B(_._payload)), Y(A, _, O);
        }
        if (ge(_) || F(_))
          return (_ = zn(_, A.mode, O, null)), (_.return = A), _;
        if (typeof _.then == "function") return Y(A, zi(_), O);
        if (_.$$typeof === Q) return Y(A, Ni(A, _), O);
        Ui(A, _);
      }
      return null;
    }
    function M(A, _, O, B) {
      var J = _ !== null ? _.key : null;
      if (
        (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
      )
        return J !== null ? null : v(A, _, "" + O, B);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case N:
            return O.key === J ? j(A, _, O, B) : null;
          case b:
            return O.key === J ? R(A, _, O, B) : null;
          case Se:
            return (J = O._init), (O = J(O._payload)), M(A, _, O, B);
        }
        if (ge(O) || F(O)) return J !== null ? null : H(A, _, O, B, null);
        if (typeof O.then == "function") return M(A, _, zi(O), B);
        if (O.$$typeof === Q) return M(A, _, Ni(A, O), B);
        Ui(A, O);
      }
      return null;
    }
    function L(A, _, O, B, J) {
      if (
        (typeof B == "string" && B !== "") ||
        typeof B == "number" ||
        typeof B == "bigint"
      )
        return (A = A.get(O) || null), v(_, A, "" + B, J);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case N:
            return (
              (A = A.get(B.key === null ? O : B.key) || null), j(_, A, B, J)
            );
          case b:
            return (
              (A = A.get(B.key === null ? O : B.key) || null), R(_, A, B, J)
            );
          case Se:
            var fe = B._init;
            return (B = fe(B._payload)), L(A, _, O, B, J);
        }
        if (ge(B) || F(B)) return (A = A.get(O) || null), H(_, A, B, J, null);
        if (typeof B.then == "function") return L(A, _, O, zi(B), J);
        if (B.$$typeof === Q) return L(A, _, O, Ni(_, B), J);
        Ui(_, B);
      }
      return null;
    }
    function ie(A, _, O, B) {
      for (
        var J = null, fe = null, W = _, ae = (_ = 0), Xe = null;
        W !== null && ae < O.length;
        ae++
      ) {
        W.index > ae ? ((Xe = W), (W = null)) : (Xe = W.sibling);
        var be = M(A, W, O[ae], B);
        if (be === null) {
          W === null && (W = Xe);
          break;
        }
        e && W && be.alternate === null && t(A, W),
          (_ = o(be, _, ae)),
          fe === null ? (J = be) : (fe.sibling = be),
          (fe = be),
          (W = Xe);
      }
      if (ae === O.length) return n(A, W), Ne && qn(A, ae), J;
      if (W === null) {
        for (; ae < O.length; ae++)
          (W = Y(A, O[ae], B)),
            W !== null &&
              ((_ = o(W, _, ae)),
              fe === null ? (J = W) : (fe.sibling = W),
              (fe = W));
        return Ne && qn(A, ae), J;
      }
      for (W = a(W); ae < O.length; ae++)
        (Xe = L(W, A, ae, O[ae], B)),
          Xe !== null &&
            (e &&
              Xe.alternate !== null &&
              W.delete(Xe.key === null ? ae : Xe.key),
            (_ = o(Xe, _, ae)),
            fe === null ? (J = Xe) : (fe.sibling = Xe),
            (fe = Xe));
      return (
        e &&
          W.forEach(function (On) {
            return t(A, On);
          }),
        Ne && qn(A, ae),
        J
      );
    }
    function ne(A, _, O, B) {
      if (O == null) throw Error(r(151));
      for (
        var J = null, fe = null, W = _, ae = (_ = 0), Xe = null, be = O.next();
        W !== null && !be.done;
        ae++, be = O.next()
      ) {
        W.index > ae ? ((Xe = W), (W = null)) : (Xe = W.sibling);
        var On = M(A, W, be.value, B);
        if (On === null) {
          W === null && (W = Xe);
          break;
        }
        e && W && On.alternate === null && t(A, W),
          (_ = o(On, _, ae)),
          fe === null ? (J = On) : (fe.sibling = On),
          (fe = On),
          (W = Xe);
      }
      if (be.done) return n(A, W), Ne && qn(A, ae), J;
      if (W === null) {
        for (; !be.done; ae++, be = O.next())
          (be = Y(A, be.value, B)),
            be !== null &&
              ((_ = o(be, _, ae)),
              fe === null ? (J = be) : (fe.sibling = be),
              (fe = be));
        return Ne && qn(A, ae), J;
      }
      for (W = a(W); !be.done; ae++, be = O.next())
        (be = L(W, A, ae, be.value, B)),
          be !== null &&
            (e &&
              be.alternate !== null &&
              W.delete(be.key === null ? ae : be.key),
            (_ = o(be, _, ae)),
            fe === null ? (J = be) : (fe.sibling = be),
            (fe = be));
      return (
        e &&
          W.forEach(function (j0) {
            return t(A, j0);
          }),
        Ne && qn(A, ae),
        J
      );
    }
    function _e(A, _, O, B) {
      if (
        (typeof O == "object" &&
          O !== null &&
          O.type === w &&
          O.key === null &&
          (O = O.props.children),
        typeof O == "object" && O !== null)
      ) {
        switch (O.$$typeof) {
          case N:
            e: {
              for (var J = O.key; _ !== null; ) {
                if (_.key === J) {
                  if (((J = O.type), J === w)) {
                    if (_.tag === 7) {
                      n(A, _.sibling),
                        (B = l(_, O.props.children)),
                        (B.return = A),
                        (A = B);
                      break e;
                    }
                  } else if (
                    _.elementType === J ||
                    (typeof J == "object" &&
                      J !== null &&
                      J.$$typeof === Se &&
                      Tf(J) === _.type)
                  ) {
                    n(A, _.sibling),
                      (B = l(_, O.props)),
                      gl(B, O),
                      (B.return = A),
                      (A = B);
                    break e;
                  }
                  n(A, _);
                  break;
                } else t(A, _);
                _ = _.sibling;
              }
              O.type === w
                ? ((B = zn(O.props.children, A.mode, B, O.key)),
                  (B.return = A),
                  (A = B))
                : ((B = yi(O.type, O.key, O.props, null, A.mode, B)),
                  gl(B, O),
                  (B.return = A),
                  (A = B));
            }
            return p(A);
          case b:
            e: {
              for (J = O.key; _ !== null; ) {
                if (_.key === J)
                  if (
                    _.tag === 4 &&
                    _.stateNode.containerInfo === O.containerInfo &&
                    _.stateNode.implementation === O.implementation
                  ) {
                    n(A, _.sibling),
                      (B = l(_, O.children || [])),
                      (B.return = A),
                      (A = B);
                    break e;
                  } else {
                    n(A, _);
                    break;
                  }
                else t(A, _);
                _ = _.sibling;
              }
              (B = mr(O, A.mode, B)), (B.return = A), (A = B);
            }
            return p(A);
          case Se:
            return (J = O._init), (O = J(O._payload)), _e(A, _, O, B);
        }
        if (ge(O)) return ie(A, _, O, B);
        if (F(O)) {
          if (((J = F(O)), typeof J != "function")) throw Error(r(150));
          return (O = J.call(O)), ne(A, _, O, B);
        }
        if (typeof O.then == "function") return _e(A, _, zi(O), B);
        if (O.$$typeof === Q) return _e(A, _, Ni(A, O), B);
        Ui(A, O);
      }
      return (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
        ? ((O = "" + O),
          _ !== null && _.tag === 6
            ? (n(A, _.sibling), (B = l(_, O)), (B.return = A), (A = B))
            : (n(A, _), (B = hr(O, A.mode, B)), (B.return = A), (A = B)),
          p(A))
        : n(A, _);
    }
    return function (A, _, O, B) {
      try {
        ml = 0;
        var J = _e(A, _, O, B);
        return (va = null), J;
      } catch (W) {
        if (W === il || W === wi) throw W;
        var fe = ct(29, W, null, A.mode);
        return (fe.lanes = B), (fe.return = A), fe;
      } finally {
      }
    };
  }
  var ba = Rf(!0),
    Mf = Rf(!1),
    Nt = k(null),
    Mt = null;
  function mn(e) {
    var t = e.alternate;
    K(ke, ke.current & 1),
      K(Nt, e),
      Mt === null &&
        (t === null || ga.current !== null || t.memoizedState !== null) &&
        (Mt = e);
  }
  function Lf(e) {
    if (e.tag === 22) {
      if ((K(ke, ke.current), K(Nt, e), Mt === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Mt = e);
      }
    } else gn();
  }
  function gn() {
    K(ke, ke.current), K(Nt, Nt.current);
  }
  function $t(e) {
    $(Nt), Mt === e && (Mt = null), $(ke);
  }
  var ke = k(0);
  function qi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || Uu(n))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  function Kr(e, t, n, a) {
    (t = e.memoizedState),
      (n = n(a, t)),
      (n = n == null ? t : y({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var $r = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var a = mt(),
        l = fn(a);
      (l.payload = t),
        n != null && (l.callback = n),
        (t = dn(e, l, a)),
        t !== null && (gt(t, e, a), rl(t, e, a));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var a = mt(),
        l = fn(a);
      (l.tag = 1),
        (l.payload = t),
        n != null && (l.callback = n),
        (t = dn(e, l, a)),
        t !== null && (gt(t, e, a), rl(t, e, a));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = mt(),
        a = fn(n);
      (a.tag = 2),
        t != null && (a.callback = t),
        (t = dn(e, a, n)),
        t !== null && (gt(t, e, n), rl(t, e, n));
    },
  };
  function Df(e, t, n, a, l, o, p) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, o, p)
        : t.prototype && t.prototype.isPureReactComponent
        ? !Pa(n, a) || !Pa(l, o)
        : !0
    );
  }
  function zf(e, t, n, a) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, a),
      t.state !== e && $r.enqueueReplaceState(t, t.state, null);
  }
  function Qn(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var a in t) a !== "ref" && (n[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = y({}, n));
      for (var l in e) n[l] === void 0 && (n[l] = e[l]);
    }
    return n;
  }
  var Hi =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function Uf(e) {
    Hi(e);
  }
  function qf(e) {
    console.error(e);
  }
  function Hf(e) {
    Hi(e);
  }
  function Bi(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Bf(e, t, n) {
    try {
      var a = e.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Jr(e, t, n) {
    return (
      (n = fn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        Bi(e, t);
      }),
      n
    );
  }
  function kf(e) {
    return (e = fn(e)), (e.tag = 3), e;
  }
  function Yf(e, t, n, a) {
    var l = n.type.getDerivedStateFromError;
    if (typeof l == "function") {
      var o = a.value;
      (e.payload = function () {
        return l(o);
      }),
        (e.callback = function () {
          Bf(t, n, a);
        });
    }
    var p = n.stateNode;
    p !== null &&
      typeof p.componentDidCatch == "function" &&
      (e.callback = function () {
        Bf(t, n, a),
          typeof l != "function" &&
            (Sn === null ? (Sn = new Set([this])) : Sn.add(this));
        var v = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: v !== null ? v : "",
        });
      });
  }
  function jp(e, t, n, a, l) {
    if (
      ((n.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = n.alternate),
        t !== null && nl(t, n, l, !0),
        (n = Nt.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 13:
            return (
              Mt === null ? vu() : n.alternate === null && De === 0 && (De = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = l),
              a === wr
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([a])) : t.add(a),
                  Su(e, a, l)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              a === wr
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (n.updateQueue = t))
                    : ((n = t.retryQueue),
                      n === null ? (t.retryQueue = new Set([a])) : n.add(a)),
                  Su(e, a, l)),
              !1
            );
        }
        throw Error(r(435, n.tag));
      }
      return Su(e, a, l), vu(), !1;
    }
    if (Ne)
      return (
        (t = Nt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = l),
            a !== xr && ((e = Error(r(422), { cause: a })), tl(yt(e, n))))
          : (a !== xr && ((t = Error(r(423), { cause: a })), tl(yt(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (l &= -l),
            (e.lanes |= l),
            (a = yt(a, n)),
            (l = Jr(e.stateNode, a, l)),
            _r(e, l),
            De !== 4 && (De = 2)),
        !1
      );
    var o = Error(r(520), { cause: a });
    if (
      ((o = yt(o, n)),
      Nl === null ? (Nl = [o]) : Nl.push(o),
      De !== 4 && (De = 2),
      t === null)
    )
      return !0;
    (a = yt(a, n)), (n = t);
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = l & -l),
            (n.lanes |= e),
            (e = Jr(n.stateNode, a, e)),
            _r(n, e),
            !1
          );
        case 1:
          if (
            ((t = n.type),
            (o = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (o !== null &&
                  typeof o.componentDidCatch == "function" &&
                  (Sn === null || !Sn.has(o)))))
          )
            return (
              (n.flags |= 65536),
              (l &= -l),
              (n.lanes |= l),
              (l = kf(l)),
              Yf(l, e, n, a),
              _r(n, l),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Gf = Error(r(461)),
    Ve = !1;
  function Ke(e, t, n, a) {
    t.child = e === null ? Mf(t, null, n, a) : ba(t, e.child, n, a);
  }
  function Vf(e, t, n, a, l) {
    n = n.render;
    var o = t.ref;
    if ("ref" in a) {
      var p = {};
      for (var v in a) v !== "ref" && (p[v] = a[v]);
    } else p = a;
    return (
      Yn(t),
      (a = Mr(e, t, n, p, o, l)),
      (v = Lr()),
      e !== null && !Ve
        ? (Dr(e, t, l), Jt(e, t, l))
        : (Ne && v && gr(t), (t.flags |= 1), Ke(e, t, a, l), t.child)
    );
  }
  function Qf(e, t, n, a, l) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" &&
        !dr(o) &&
        o.defaultProps === void 0 &&
        n.compare === null
        ? ((t.tag = 15), (t.type = o), Xf(e, t, o, a, l))
        : ((e = yi(n.type, null, a, t, t.mode, l)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((o = e.child), !au(e, l))) {
      var p = o.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Pa), n(p, a) && e.ref === t.ref)
      )
        return Jt(e, t, l);
    }
    return (
      (t.flags |= 1),
      (e = Gt(o, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Xf(e, t, n, a, l) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (Pa(o, a) && e.ref === t.ref)
        if (((Ve = !1), (t.pendingProps = a = o), au(e, l)))
          (e.flags & 131072) !== 0 && (Ve = !0);
        else return (t.lanes = e.lanes), Jt(e, t, l);
    }
    return Fr(e, t, n, a, l);
  }
  function Zf(e, t, n) {
    var a = t.pendingProps,
      l = a.children,
      o = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((a = o !== null ? o.baseLanes | n : n), e !== null)) {
          for (l = t.child = e.child, o = 0; l !== null; )
            (o = o | l.lanes | l.childLanes), (l = l.sibling);
          t.childLanes = o & ~a;
        } else (t.childLanes = 0), (t.child = null);
        return Kf(e, t, a, n);
      }
      if ((n & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && ji(t, o !== null ? o.cachePool : null),
          o !== null ? Qc(t, o) : Or(),
          Lf(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          Kf(e, t, o !== null ? o.baseLanes | n : n, n)
        );
    } else
      o !== null
        ? (ji(t, o.cachePool), Qc(t, o), gn(), (t.memoizedState = null))
        : (e !== null && ji(t, null), Or(), gn());
    return Ke(e, t, l, n), t.child;
  }
  function Kf(e, t, n, a) {
    var l = jr();
    return (
      (l = l === null ? null : { parent: Be._currentValue, pool: l }),
      (t.memoizedState = { baseLanes: n, cachePool: l }),
      e !== null && ji(t, null),
      Or(),
      Lf(t),
      e !== null && nl(e, t, a, !0),
      null
    );
  }
  function ki(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(r(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Fr(e, t, n, a, l) {
    return (
      Yn(t),
      (n = Mr(e, t, n, a, void 0, l)),
      (a = Lr()),
      e !== null && !Ve
        ? (Dr(e, t, l), Jt(e, t, l))
        : (Ne && a && gr(t), (t.flags |= 1), Ke(e, t, n, l), t.child)
    );
  }
  function $f(e, t, n, a, l, o) {
    return (
      Yn(t),
      (t.updateQueue = null),
      (n = Zc(t, a, n, l)),
      Xc(e),
      (a = Lr()),
      e !== null && !Ve
        ? (Dr(e, t, o), Jt(e, t, o))
        : (Ne && a && gr(t), (t.flags |= 1), Ke(e, t, n, o), t.child)
    );
  }
  function Jf(e, t, n, a, l) {
    if ((Yn(t), t.stateNode === null)) {
      var o = ca,
        p = n.contextType;
      typeof p == "object" && p !== null && (o = Pe(p)),
        (o = new n(a, o)),
        (t.memoizedState =
          o.state !== null && o.state !== void 0 ? o.state : null),
        (o.updater = $r),
        (t.stateNode = o),
        (o._reactInternals = t),
        (o = t.stateNode),
        (o.props = a),
        (o.state = t.memoizedState),
        (o.refs = {}),
        Er(t),
        (p = n.contextType),
        (o.context = typeof p == "object" && p !== null ? Pe(p) : ca),
        (o.state = t.memoizedState),
        (p = n.getDerivedStateFromProps),
        typeof p == "function" && (Kr(t, n, p, a), (o.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function" ||
          (typeof o.UNSAFE_componentWillMount != "function" &&
            typeof o.componentWillMount != "function") ||
          ((p = o.state),
          typeof o.componentWillMount == "function" && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == "function" &&
            o.UNSAFE_componentWillMount(),
          p !== o.state && $r.enqueueReplaceState(o, o.state, null),
          ol(t, a, o, l),
          ul(),
          (o.state = t.memoizedState)),
        typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0);
    } else if (e === null) {
      o = t.stateNode;
      var v = t.memoizedProps,
        j = Qn(n, v);
      o.props = j;
      var R = o.context,
        H = n.contextType;
      (p = ca), typeof H == "object" && H !== null && (p = Pe(H));
      var Y = n.getDerivedStateFromProps;
      (H =
        typeof Y == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function"),
        (v = t.pendingProps !== v),
        H ||
          (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
            typeof o.componentWillReceiveProps != "function") ||
          ((v || R !== p) && zf(t, o, a, p)),
        (cn = !1);
      var M = t.memoizedState;
      (o.state = M),
        ol(t, a, o, l),
        ul(),
        (R = t.memoizedState),
        v || M !== R || cn
          ? (typeof Y == "function" && (Kr(t, n, Y, a), (R = t.memoizedState)),
            (j = cn || Df(t, n, j, a, M, R, p))
              ? (H ||
                  (typeof o.UNSAFE_componentWillMount != "function" &&
                    typeof o.componentWillMount != "function") ||
                  (typeof o.componentWillMount == "function" &&
                    o.componentWillMount(),
                  typeof o.UNSAFE_componentWillMount == "function" &&
                    o.UNSAFE_componentWillMount()),
                typeof o.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof o.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = R)),
            (o.props = a),
            (o.state = R),
            (o.context = p),
            (a = j))
          : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1));
    } else {
      (o = t.stateNode),
        Cr(e, t),
        (p = t.memoizedProps),
        (H = Qn(n, p)),
        (o.props = H),
        (Y = t.pendingProps),
        (M = o.context),
        (R = n.contextType),
        (j = ca),
        typeof R == "object" && R !== null && (j = Pe(R)),
        (v = n.getDerivedStateFromProps),
        (R =
          typeof v == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function") ||
          (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
            typeof o.componentWillReceiveProps != "function") ||
          ((p !== Y || M !== j) && zf(t, o, a, j)),
        (cn = !1),
        (M = t.memoizedState),
        (o.state = M),
        ol(t, a, o, l),
        ul();
      var L = t.memoizedState;
      p !== Y ||
      M !== L ||
      cn ||
      (e !== null && e.dependencies !== null && Si(e.dependencies))
        ? (typeof v == "function" && (Kr(t, n, v, a), (L = t.memoizedState)),
          (H =
            cn ||
            Df(t, n, H, a, M, L, j) ||
            (e !== null && e.dependencies !== null && Si(e.dependencies)))
            ? (R ||
                (typeof o.UNSAFE_componentWillUpdate != "function" &&
                  typeof o.componentWillUpdate != "function") ||
                (typeof o.componentWillUpdate == "function" &&
                  o.componentWillUpdate(a, L, j),
                typeof o.UNSAFE_componentWillUpdate == "function" &&
                  o.UNSAFE_componentWillUpdate(a, L, j)),
              typeof o.componentDidUpdate == "function" && (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof o.componentDidUpdate != "function" ||
                (p === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != "function" ||
                (p === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = L)),
          (o.props = a),
          (o.state = L),
          (o.context = j),
          (a = H))
        : (typeof o.componentDidUpdate != "function" ||
            (p === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 4),
          typeof o.getSnapshotBeforeUpdate != "function" ||
            (p === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (o = a),
      ki(e, t),
      (a = (t.flags & 128) !== 0),
      o || a
        ? ((o = t.stateNode),
          (n =
            a && typeof n.getDerivedStateFromError != "function"
              ? null
              : o.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = ba(t, e.child, null, l)),
              (t.child = ba(t, null, n, l)))
            : Ke(e, t, n, l),
          (t.memoizedState = o.state),
          (e = t.child))
        : (e = Jt(e, t, l)),
      e
    );
  }
  function Ff(e, t, n, a) {
    return el(), (t.flags |= 256), Ke(e, t, n, a), t.child;
  }
  var Pr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Wr(e) {
    return { baseLanes: e, cachePool: Uc() };
  }
  function Ir(e, t, n) {
    return (e = e !== null ? e.childLanes & ~n : 0), t && (e |= jt), e;
  }
  function Pf(e, t, n) {
    var a = t.pendingProps,
      l = !1,
      o = (t.flags & 128) !== 0,
      p;
    if (
      ((p = o) ||
        (p =
          e !== null && e.memoizedState === null ? !1 : (ke.current & 2) !== 0),
      p && ((l = !0), (t.flags &= -129)),
      (p = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ne) {
        if ((l ? mn(t) : gn(), Ne)) {
          var v = Le,
            j;
          if ((j = v)) {
            e: {
              for (j = v, v = Rt; j.nodeType !== 8; ) {
                if (!v) {
                  v = null;
                  break e;
                }
                if (((j = At(j.nextSibling)), j === null)) {
                  v = null;
                  break e;
                }
              }
              v = j;
            }
            v !== null
              ? ((t.memoizedState = {
                  dehydrated: v,
                  treeContext: Un !== null ? { id: Vt, overflow: Qt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (j = ct(18, null, null, 0)),
                (j.stateNode = v),
                (j.return = t),
                (t.child = j),
                (et = t),
                (Le = null),
                (j = !0))
              : (j = !1);
          }
          j || Bn(t);
        }
        if (
          ((v = t.memoizedState),
          v !== null && ((v = v.dehydrated), v !== null))
        )
          return Uu(v) ? (t.lanes = 32) : (t.lanes = 536870912), null;
        $t(t);
      }
      return (
        (v = a.children),
        (a = a.fallback),
        l
          ? (gn(),
            (l = t.mode),
            (v = Yi({ mode: "hidden", children: v }, l)),
            (a = zn(a, l, n, null)),
            (v.return = t),
            (a.return = t),
            (v.sibling = a),
            (t.child = v),
            (l = t.child),
            (l.memoizedState = Wr(n)),
            (l.childLanes = Ir(e, p, n)),
            (t.memoizedState = Pr),
            a)
          : (mn(t), eu(t, v))
      );
    }
    if (
      ((j = e.memoizedState), j !== null && ((v = j.dehydrated), v !== null))
    ) {
      if (o)
        t.flags & 256
          ? (mn(t), (t.flags &= -257), (t = tu(e, t, n)))
          : t.memoizedState !== null
          ? (gn(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (gn(),
            (l = a.fallback),
            (v = t.mode),
            (a = Yi({ mode: "visible", children: a.children }, v)),
            (l = zn(l, v, n, null)),
            (l.flags |= 2),
            (a.return = t),
            (l.return = t),
            (a.sibling = l),
            (t.child = a),
            ba(t, e.child, null, n),
            (a = t.child),
            (a.memoizedState = Wr(n)),
            (a.childLanes = Ir(e, p, n)),
            (t.memoizedState = Pr),
            (t = l));
      else if ((mn(t), Uu(v))) {
        if (((p = v.nextSibling && v.nextSibling.dataset), p)) var R = p.dgst;
        (p = R),
          (a = Error(r(419))),
          (a.stack = ""),
          (a.digest = p),
          tl({ value: a, source: null, stack: null }),
          (t = tu(e, t, n));
      } else if (
        (Ve || nl(e, t, n, !1), (p = (n & e.childLanes) !== 0), Ve || p)
      ) {
        if (
          ((p = Oe),
          p !== null &&
            ((a = n & -n),
            (a = (a & 42) !== 0 ? 1 : qs(a)),
            (a = (a & (p.suspendedLanes | n)) !== 0 ? 0 : a),
            a !== 0 && a !== j.retryLane))
        )
          throw ((j.retryLane = a), oa(e, a), gt(p, e, a), Gf);
        v.data === "$?" || vu(), (t = tu(e, t, n));
      } else
        v.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = j.treeContext),
            (Le = At(v.nextSibling)),
            (et = t),
            (Ne = !0),
            (Hn = null),
            (Rt = !1),
            e !== null &&
              ((bt[St++] = Vt),
              (bt[St++] = Qt),
              (bt[St++] = Un),
              (Vt = e.id),
              (Qt = e.overflow),
              (Un = t)),
            (t = eu(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return l
      ? (gn(),
        (l = a.fallback),
        (v = t.mode),
        (j = e.child),
        (R = j.sibling),
        (a = Gt(j, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = j.subtreeFlags & 65011712),
        R !== null ? (l = Gt(R, l)) : ((l = zn(l, v, n, null)), (l.flags |= 2)),
        (l.return = t),
        (a.return = t),
        (a.sibling = l),
        (t.child = a),
        (a = l),
        (l = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = Wr(n))
          : ((j = v.cachePool),
            j !== null
              ? ((R = Be._currentValue),
                (j = j.parent !== R ? { parent: R, pool: R } : j))
              : (j = Uc()),
            (v = { baseLanes: v.baseLanes | n, cachePool: j })),
        (l.memoizedState = v),
        (l.childLanes = Ir(e, p, n)),
        (t.memoizedState = Pr),
        a)
      : (mn(t),
        (n = e.child),
        (e = n.sibling),
        (n = Gt(n, { mode: "visible", children: a.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((p = t.deletions),
          p === null ? ((t.deletions = [e]), (t.flags |= 16)) : p.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function eu(e, t) {
    return (
      (t = Yi({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Yi(e, t) {
    return (
      (e = ct(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function tu(e, t, n) {
    return (
      ba(t, e.child, null, n),
      (e = eu(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Wf(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), vr(e.return, t, n);
  }
  function nu(e, t, n, a, l) {
    var o = e.memoizedState;
    o === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: n,
          tailMode: l,
        })
      : ((o.isBackwards = t),
        (o.rendering = null),
        (o.renderingStartTime = 0),
        (o.last = a),
        (o.tail = n),
        (o.tailMode = l));
  }
  function If(e, t, n) {
    var a = t.pendingProps,
      l = a.revealOrder,
      o = a.tail;
    if ((Ke(e, t, a.children, n), (a = ke.current), (a & 2) !== 0))
      (a = (a & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Wf(e, n, t);
          else if (e.tag === 19) Wf(e, n, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      a &= 1;
    }
    switch ((K(ke, a), l)) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && qi(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          nu(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && qi(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        nu(t, !0, n, null, o);
        break;
      case "together":
        nu(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Jt(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (bn |= t.lanes),
      (n & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((nl(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (
        e = t.child, n = Gt(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (n = n.sibling = Gt(e, e.pendingProps)),
          (n.return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function au(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && Si(e)));
  }
  function wp(e, t, n) {
    switch (t.tag) {
      case 3:
        Te(t, t.stateNode.containerInfo),
          on(t, Be, e.memoizedState.cache),
          el();
        break;
      case 27:
      case 5:
        Ms(t);
        break;
      case 4:
        Te(t, t.stateNode.containerInfo);
        break;
      case 10:
        on(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (mn(t), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
            ? Pf(e, t, n)
            : (mn(t), (e = Jt(e, t, n)), e !== null ? e.sibling : null);
        mn(t);
        break;
      case 19:
        var l = (e.flags & 128) !== 0;
        if (
          ((a = (n & t.childLanes) !== 0),
          a || (nl(e, t, n, !1), (a = (n & t.childLanes) !== 0)),
          l)
        ) {
          if (a) return If(e, t, n);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null &&
            ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          K(ke, ke.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), Zf(e, t, n);
      case 24:
        on(t, Be, e.memoizedState.cache);
    }
    return Jt(e, t, n);
  }
  function ed(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Ve = !0;
      else {
        if (!au(e, n) && (t.flags & 128) === 0) return (Ve = !1), wp(e, t, n);
        Ve = (e.flags & 131072) !== 0;
      }
    else (Ve = !1), Ne && (t.flags & 1048576) !== 0 && Oc(t, bi, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var a = t.elementType,
            l = a._init;
          if (((a = l(a._payload)), (t.type = a), typeof a == "function"))
            dr(a)
              ? ((e = Qn(a, e)), (t.tag = 1), (t = Jf(null, t, a, e, n)))
              : ((t.tag = 0), (t = Fr(null, t, a, e, n)));
          else {
            if (a != null) {
              if (((l = a.$$typeof), l === P)) {
                (t.tag = 11), (t = Vf(null, t, a, e, n));
                break e;
              } else if (l === oe) {
                (t.tag = 14), (t = Qf(null, t, a, e, n));
                break e;
              }
            }
            throw ((t = me(a) || a), Error(r(306, t, "")));
          }
        }
        return t;
      case 0:
        return Fr(e, t, t.type, t.pendingProps, n);
      case 1:
        return (a = t.type), (l = Qn(a, t.pendingProps)), Jf(e, t, a, l, n);
      case 3:
        e: {
          if ((Te(t, t.stateNode.containerInfo), e === null))
            throw Error(r(387));
          a = t.pendingProps;
          var o = t.memoizedState;
          (l = o.element), Cr(e, t), ol(t, a, null, n);
          var p = t.memoizedState;
          if (
            ((a = p.cache),
            on(t, Be, a),
            a !== o.cache && br(t, [Be], n, !0),
            ul(),
            (a = p.element),
            o.isDehydrated)
          )
            if (
              ((o = { element: a, isDehydrated: !1, cache: p.cache }),
              (t.updateQueue.baseState = o),
              (t.memoizedState = o),
              t.flags & 256)
            ) {
              t = Ff(e, t, a, n);
              break e;
            } else if (a !== l) {
              (l = yt(Error(r(424)), t)), tl(l), (t = Ff(e, t, a, n));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                Le = At(e.firstChild),
                  et = t,
                  Ne = !0,
                  Hn = null,
                  Rt = !0,
                  n = Mf(t, null, a, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
            }
          else {
            if ((el(), a === l)) {
              t = Jt(e, t, n);
              break e;
            }
            Ke(e, t, a, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          ki(e, t),
          e === null
            ? (n = lh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : Ne ||
                ((n = t.type),
                (e = t.pendingProps),
                (a = ts(re.current).createElement(n)),
                (a[Fe] = t),
                (a[tt] = e),
                Je(a, n, e),
                Ge(a),
                (t.stateNode = a))
            : (t.memoizedState = lh(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Ms(t),
          e === null &&
            Ne &&
            ((a = t.stateNode = th(t.type, t.pendingProps, re.current)),
            (et = t),
            (Rt = !0),
            (l = Le),
            wn(t.type) ? ((qu = l), (Le = At(a.firstChild))) : (Le = l)),
          Ke(e, t, t.pendingProps.children, n),
          ki(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ne &&
            ((l = a = Le) &&
              ((a = Wp(a, t.type, t.pendingProps, Rt)),
              a !== null
                ? ((t.stateNode = a),
                  (et = t),
                  (Le = At(a.firstChild)),
                  (Rt = !1),
                  (l = !0))
                : (l = !1)),
            l || Bn(t)),
          Ms(t),
          (l = t.type),
          (o = t.pendingProps),
          (p = e !== null ? e.memoizedProps : null),
          (a = o.children),
          Lu(l, o) ? (a = null) : p !== null && Lu(l, p) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((l = Mr(e, t, pp, null, null, n)), (Rl._currentValue = l)),
          ki(e, t),
          Ke(e, t, a, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ne &&
            ((e = n = Le) &&
              ((n = Ip(n, t.pendingProps, Rt)),
              n !== null
                ? ((t.stateNode = n), (et = t), (Le = null), (e = !0))
                : (e = !1)),
            e || Bn(t)),
          null
        );
      case 13:
        return Pf(e, t, n);
      case 4:
        return (
          Te(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = ba(t, null, a, n)) : Ke(e, t, a, n),
          t.child
        );
      case 11:
        return Vf(e, t, t.type, t.pendingProps, n);
      case 7:
        return Ke(e, t, t.pendingProps, n), t.child;
      case 8:
        return Ke(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return Ke(e, t, t.pendingProps.children, n), t.child;
      case 10:
        return (
          (a = t.pendingProps),
          on(t, t.type, a.value),
          Ke(e, t, a.children, n),
          t.child
        );
      case 9:
        return (
          (l = t.type._context),
          (a = t.pendingProps.children),
          Yn(t),
          (l = Pe(l)),
          (a = a(l)),
          (t.flags |= 1),
          Ke(e, t, a, n),
          t.child
        );
      case 14:
        return Qf(e, t, t.type, t.pendingProps, n);
      case 15:
        return Xf(e, t, t.type, t.pendingProps, n);
      case 19:
        return If(e, t, n);
      case 31:
        return (
          (a = t.pendingProps),
          (n = t.mode),
          (a = { mode: a.mode, children: a.children }),
          e === null
            ? ((n = Yi(a, n)),
              (n.ref = t.ref),
              (t.child = n),
              (n.return = t),
              (t = n))
            : ((n = Gt(e.child, a)),
              (n.ref = t.ref),
              (t.child = n),
              (n.return = t),
              (t = n)),
          t
        );
      case 22:
        return Zf(e, t, n);
      case 24:
        return (
          Yn(t),
          (a = Pe(Be)),
          e === null
            ? ((l = jr()),
              l === null &&
                ((l = Oe),
                (o = Sr()),
                (l.pooledCache = o),
                o.refCount++,
                o !== null && (l.pooledCacheLanes |= n),
                (l = o)),
              (t.memoizedState = { parent: a, cache: l }),
              Er(t),
              on(t, Be, l))
            : ((e.lanes & n) !== 0 && (Cr(e, t), ol(t, null, null, n), ul()),
              (l = e.memoizedState),
              (o = t.memoizedState),
              l.parent !== a
                ? ((l = { parent: a, cache: a }),
                  (t.memoizedState = l),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = l),
                  on(t, Be, a))
                : ((a = o.cache),
                  on(t, Be, a),
                  a !== l.cache && br(t, [Be], n, !0))),
          Ke(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Ft(e) {
    e.flags |= 4;
  }
  function td(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !oh(t))) {
      if (
        ((t = Nt.current),
        t !== null &&
          ((pe & 4194048) === pe
            ? Mt !== null
            : ((pe & 62914560) !== pe && (pe & 536870912) === 0) || t !== Mt))
      )
        throw ((sl = wr), qc);
      e.flags |= 8192;
    }
  }
  function Gi(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Mo() : 536870912), (e.lanes |= t), (wa |= t));
  }
  function pl(e, t) {
    if (!Ne)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), (t = t.sibling);
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), (n = n.sibling);
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Me(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      a = 0;
    if (t)
      for (var l = e.child; l !== null; )
        (n |= l.lanes | l.childLanes),
          (a |= l.subtreeFlags & 65011712),
          (a |= l.flags & 65011712),
          (l.return = e),
          (l = l.sibling);
    else
      for (l = e.child; l !== null; )
        (n |= l.lanes | l.childLanes),
          (a |= l.subtreeFlags),
          (a |= l.flags),
          (l.return = e),
          (l = l.sibling);
    return (e.subtreeFlags |= a), (e.childLanes = n), t;
  }
  function Ep(e, t, n) {
    var a = t.pendingProps;
    switch ((pr(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Me(t), null;
      case 1:
        return Me(t), null;
      case 3:
        return (
          (n = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Zt(Be),
          ln(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (Ia(t)
              ? Ft(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Mc())),
          Me(t),
          null
        );
      case 26:
        return (
          (n = t.memoizedState),
          e === null
            ? (Ft(t),
              n !== null ? (Me(t), td(t, n)) : (Me(t), (t.flags &= -16777217)))
            : n
            ? n !== e.memoizedState
              ? (Ft(t), Me(t), td(t, n))
              : (Me(t), (t.flags &= -16777217))
            : (e.memoizedProps !== a && Ft(t), Me(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        Il(t), (n = re.current);
        var l = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== a && Ft(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return Me(t), null;
          }
          (e = te.current),
            Ia(t) ? Tc(t) : ((e = th(l, a, n)), (t.stateNode = e), Ft(t));
        }
        return Me(t), null;
      case 5:
        if ((Il(t), (n = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && Ft(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return Me(t), null;
          }
          if (((e = te.current), Ia(t))) Tc(t);
          else {
            switch (((l = ts(re.current)), e)) {
              case 1:
                e = l.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                e = l.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    e = l.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    e = l.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    (e = l.createElement("div")),
                      (e.innerHTML = "<script></script>"),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case "select":
                    (e =
                      typeof a.is == "string"
                        ? l.createElement("select", { is: a.is })
                        : l.createElement("select")),
                      a.multiple
                        ? (e.multiple = !0)
                        : a.size && (e.size = a.size);
                    break;
                  default:
                    e =
                      typeof a.is == "string"
                        ? l.createElement(n, { is: a.is })
                        : l.createElement(n);
                }
            }
            (e[Fe] = t), (e[tt] = a);
            e: for (l = t.child; l !== null; ) {
              if (l.tag === 5 || l.tag === 6) e.appendChild(l.stateNode);
              else if (l.tag !== 4 && l.tag !== 27 && l.child !== null) {
                (l.child.return = l), (l = l.child);
                continue;
              }
              if (l === t) break e;
              for (; l.sibling === null; ) {
                if (l.return === null || l.return === t) break e;
                l = l.return;
              }
              (l.sibling.return = l.return), (l = l.sibling);
            }
            t.stateNode = e;
            e: switch ((Je(e, n, a), n)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!a.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Ft(t);
          }
        }
        return Me(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && Ft(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(r(166));
          if (((e = re.current), Ia(t))) {
            if (
              ((e = t.stateNode),
              (n = t.memoizedProps),
              (a = null),
              (l = et),
              l !== null)
            )
              switch (l.tag) {
                case 27:
                case 5:
                  a = l.memoizedProps;
              }
            (e[Fe] = t),
              (e = !!(
                e.nodeValue === n ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                $d(e.nodeValue, n)
              )),
              e || Bn(t);
          } else (e = ts(e).createTextNode(a)), (e[Fe] = t), (t.stateNode = e);
        }
        return Me(t), null;
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((l = Ia(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!l) throw Error(r(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(r(317));
              l[Fe] = t;
            } else
              el(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            Me(t), (l = !1);
          } else
            (l = Mc()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = l),
              (l = !0);
          if (!l) return t.flags & 256 ? ($t(t), t) : ($t(t), null);
        }
        if (($t(t), (t.flags & 128) !== 0)) return (t.lanes = n), t;
        if (
          ((n = a !== null), (e = e !== null && e.memoizedState !== null), n)
        ) {
          (a = t.child),
            (l = null),
            a.alternate !== null &&
              a.alternate.memoizedState !== null &&
              a.alternate.memoizedState.cachePool !== null &&
              (l = a.alternate.memoizedState.cachePool.pool);
          var o = null;
          a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (o = a.memoizedState.cachePool.pool),
            o !== l && (a.flags |= 2048);
        }
        return (
          n !== e && n && (t.child.flags |= 8192),
          Gi(t, t.updateQueue),
          Me(t),
          null
        );
      case 4:
        return ln(), e === null && Au(t.stateNode.containerInfo), Me(t), null;
      case 10:
        return Zt(t.type), Me(t), null;
      case 19:
        if (($(ke), (l = t.memoizedState), l === null)) return Me(t), null;
        if (((a = (t.flags & 128) !== 0), (o = l.rendering), o === null))
          if (a) pl(l, !1);
          else {
            if (De !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((o = qi(e)), o !== null)) {
                  for (
                    t.flags |= 128,
                      pl(l, !1),
                      e = o.updateQueue,
                      t.updateQueue = e,
                      Gi(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;

                  )
                    Ac(n, e), (n = n.sibling);
                  return K(ke, (ke.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null &&
              Tt() > Xi &&
              ((t.flags |= 128), (a = !0), pl(l, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = qi(o)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Gi(t, e),
                pl(l, !0),
                l.tail === null &&
                  l.tailMode === "hidden" &&
                  !o.alternate &&
                  !Ne)
              )
                return Me(t), null;
            } else
              2 * Tt() - l.renderingStartTime > Xi &&
                n !== 536870912 &&
                ((t.flags |= 128), (a = !0), pl(l, !1), (t.lanes = 4194304));
          l.isBackwards
            ? ((o.sibling = t.child), (t.child = o))
            : ((e = l.last),
              e !== null ? (e.sibling = o) : (t.child = o),
              (l.last = o));
        }
        return l.tail !== null
          ? ((t = l.tail),
            (l.rendering = t),
            (l.tail = t.sibling),
            (l.renderingStartTime = Tt()),
            (t.sibling = null),
            (e = ke.current),
            K(ke, a ? (e & 1) | 2 : e & 1),
            t)
          : (Me(t), null);
      case 22:
      case 23:
        return (
          $t(t),
          Tr(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (n & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Me(t),
          (n = t.updateQueue),
          n !== null && Gi(t, n.retryQueue),
          (n = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== n && (t.flags |= 2048),
          e !== null && $(Gn),
          null
        );
      case 24:
        return (
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Zt(Be),
          Me(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function Cp(e, t) {
    switch ((pr(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Zt(Be),
          ln(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Il(t), null;
      case 13:
        if (
          ($t(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340));
          el();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return $(ke), null;
      case 4:
        return ln(), null;
      case 10:
        return Zt(t.type), null;
      case 22:
      case 23:
        return (
          $t(t),
          Tr(),
          e !== null && $(Gn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return Zt(Be), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function nd(e, t) {
    switch ((pr(t), t.tag)) {
      case 3:
        Zt(Be), ln();
        break;
      case 26:
      case 27:
      case 5:
        Il(t);
        break;
      case 4:
        ln();
        break;
      case 13:
        $t(t);
        break;
      case 19:
        $(ke);
        break;
      case 10:
        Zt(t.type);
        break;
      case 22:
      case 23:
        $t(t), Tr(), e !== null && $(Gn);
        break;
      case 24:
        Zt(Be);
    }
  }
  function xl(e, t) {
    try {
      var n = t.updateQueue,
        a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var l = a.next;
        n = l;
        do {
          if ((n.tag & e) === e) {
            a = void 0;
            var o = n.create,
              p = n.inst;
            (a = o()), (p.destroy = a);
          }
          n = n.next;
        } while (n !== l);
      }
    } catch (v) {
      Ae(t, t.return, v);
    }
  }
  function pn(e, t, n) {
    try {
      var a = t.updateQueue,
        l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var o = l.next;
        a = o;
        do {
          if ((a.tag & e) === e) {
            var p = a.inst,
              v = p.destroy;
            if (v !== void 0) {
              (p.destroy = void 0), (l = t);
              var j = n,
                R = v;
              try {
                R();
              } catch (H) {
                Ae(l, j, H);
              }
            }
          }
          a = a.next;
        } while (a !== o);
      }
    } catch (H) {
      Ae(t, t.return, H);
    }
  }
  function ad(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Vc(t, n);
      } catch (a) {
        Ae(e, e.return, a);
      }
    }
  }
  function ld(e, t, n) {
    (n.props = Qn(e.type, e.memoizedProps)), (n.state = e.memoizedState);
    try {
      n.componentWillUnmount();
    } catch (a) {
      Ae(e, t, a);
    }
  }
  function yl(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof n == "function" ? (e.refCleanup = n(a)) : (n.current = a);
      }
    } catch (l) {
      Ae(e, t, l);
    }
  }
  function Lt(e, t) {
    var n = e.ref,
      a = e.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (l) {
          Ae(e, t, l);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (l) {
          Ae(e, t, l);
        }
      else n.current = null;
  }
  function id(e) {
    var t = e.type,
      n = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && a.focus();
          break e;
        case "img":
          n.src ? (a.src = n.src) : n.srcSet && (a.srcset = n.srcSet);
      }
    } catch (l) {
      Ae(e, e.return, l);
    }
  }
  function lu(e, t, n) {
    try {
      var a = e.stateNode;
      Kp(a, e.type, n, t), (a[tt] = t);
    } catch (l) {
      Ae(e, e.return, l);
    }
  }
  function sd(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && wn(e.type)) ||
      e.tag === 4
    );
  }
  function iu(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || sd(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && wn(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function su(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      (e = e.stateNode),
        t
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
              ? n.ownerDocument.body
              : n
            ).insertBefore(e, t)
          : ((t =
              n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n),
            t.appendChild(e),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = es));
    else if (
      a !== 4 &&
      (a === 27 && wn(e.type) && ((n = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (su(e, t, n), e = e.sibling; e !== null; )
        su(e, t, n), (e = e.sibling);
  }
  function Vi(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (
      a !== 4 &&
      (a === 27 && wn(e.type) && (n = e.stateNode), (e = e.child), e !== null)
    )
      for (Vi(e, t, n), e = e.sibling; e !== null; )
        Vi(e, t, n), (e = e.sibling);
  }
  function rd(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var a = e.type, l = t.attributes; l.length; )
        t.removeAttributeNode(l[0]);
      Je(t, a, n), (t[Fe] = e), (t[tt] = n);
    } catch (o) {
      Ae(e, e.return, o);
    }
  }
  var Pt = !1,
    Ue = !1,
    ru = !1,
    ud = typeof WeakSet == "function" ? WeakSet : Set,
    Qe = null;
  function _p(e, t) {
    if (((e = e.containerInfo), (Ru = rs), (e = yc(e)), ir(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var l = a.anchorOffset,
              o = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, o.nodeType;
            } catch {
              n = null;
              break e;
            }
            var p = 0,
              v = -1,
              j = -1,
              R = 0,
              H = 0,
              Y = e,
              M = null;
            t: for (;;) {
              for (
                var L;
                Y !== n || (l !== 0 && Y.nodeType !== 3) || (v = p + l),
                  Y !== o || (a !== 0 && Y.nodeType !== 3) || (j = p + a),
                  Y.nodeType === 3 && (p += Y.nodeValue.length),
                  (L = Y.firstChild) !== null;

              )
                (M = Y), (Y = L);
              for (;;) {
                if (Y === e) break t;
                if (
                  (M === n && ++R === l && (v = p),
                  M === o && ++H === a && (j = p),
                  (L = Y.nextSibling) !== null)
                )
                  break;
                (Y = M), (M = Y.parentNode);
              }
              Y = L;
            }
            n = v === -1 || j === -1 ? null : { start: v, end: j };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      Mu = { focusedElem: e, selectionRange: n }, rs = !1, Qe = t;
      Qe !== null;

    )
      if (
        ((t = Qe), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        (e.return = t), (Qe = e);
      else
        for (; Qe !== null; ) {
          switch (((t = Qe), (o = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && o !== null) {
                (e = void 0),
                  (n = t),
                  (l = o.memoizedProps),
                  (o = o.memoizedState),
                  (a = n.stateNode);
                try {
                  var ie = Qn(n.type, l, n.elementType === n.type);
                  (e = a.getSnapshotBeforeUpdate(ie, o)),
                    (a.__reactInternalSnapshotBeforeUpdate = e);
                } catch (ne) {
                  Ae(n, n.return, ne);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                )
                  zu(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      zu(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (Qe = e);
            break;
          }
          Qe = t.return;
        }
  }
  function od(e, t, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        xn(e, n), a & 4 && xl(5, n);
        break;
      case 1:
        if ((xn(e, n), a & 4))
          if (((e = n.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (p) {
              Ae(n, n.return, p);
            }
          else {
            var l = Qn(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(l, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (p) {
              Ae(n, n.return, p);
            }
          }
        a & 64 && ad(n), a & 512 && yl(n, n.return);
        break;
      case 3:
        if ((xn(e, n), a & 64 && ((e = n.updateQueue), e !== null))) {
          if (((t = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Vc(e, t);
          } catch (p) {
            Ae(n, n.return, p);
          }
        }
        break;
      case 27:
        t === null && a & 4 && rd(n);
      case 26:
      case 5:
        xn(e, n), t === null && a & 4 && id(n), a & 512 && yl(n, n.return);
        break;
      case 12:
        xn(e, n);
        break;
      case 13:
        xn(e, n),
          a & 4 && dd(e, n),
          a & 64 &&
            ((e = n.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((n = Up.bind(null, n)), e0(e, n))));
        break;
      case 22:
        if (((a = n.memoizedState !== null || Pt), !a)) {
          (t = (t !== null && t.memoizedState !== null) || Ue), (l = Pt);
          var o = Ue;
          (Pt = a),
            (Ue = t) && !o ? yn(e, n, (n.subtreeFlags & 8772) !== 0) : xn(e, n),
            (Pt = l),
            (Ue = o);
        }
        break;
      case 30:
        break;
      default:
        xn(e, n);
    }
  }
  function cd(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), cd(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && ks(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var Re = null,
    lt = !1;
  function Wt(e, t, n) {
    for (n = n.child; n !== null; ) fd(e, t, n), (n = n.sibling);
  }
  function fd(e, t, n) {
    if (rt && typeof rt.onCommitFiberUnmount == "function")
      try {
        rt.onCommitFiberUnmount(Ba, n);
      } catch {}
    switch (n.tag) {
      case 26:
        Ue || Lt(n, t),
          Wt(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n));
        break;
      case 27:
        Ue || Lt(n, t);
        var a = Re,
          l = lt;
        wn(n.type) && ((Re = n.stateNode), (lt = !1)),
          Wt(e, t, n),
          _l(n.stateNode),
          (Re = a),
          (lt = l);
        break;
      case 5:
        Ue || Lt(n, t);
      case 6:
        if (
          ((a = Re),
          (l = lt),
          (Re = null),
          Wt(e, t, n),
          (Re = a),
          (lt = l),
          Re !== null)
        )
          if (lt)
            try {
              (Re.nodeType === 9
                ? Re.body
                : Re.nodeName === "HTML"
                ? Re.ownerDocument.body
                : Re
              ).removeChild(n.stateNode);
            } catch (o) {
              Ae(n, t, o);
            }
          else
            try {
              Re.removeChild(n.stateNode);
            } catch (o) {
              Ae(n, t, o);
            }
        break;
      case 18:
        Re !== null &&
          (lt
            ? ((e = Re),
              Id(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e,
                n.stateNode
              ),
              zl(e))
            : Id(Re, n.stateNode));
        break;
      case 4:
        (a = Re),
          (l = lt),
          (Re = n.stateNode.containerInfo),
          (lt = !0),
          Wt(e, t, n),
          (Re = a),
          (lt = l);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ue || pn(2, n, t), Ue || pn(4, n, t), Wt(e, t, n);
        break;
      case 1:
        Ue ||
          (Lt(n, t),
          (a = n.stateNode),
          typeof a.componentWillUnmount == "function" && ld(n, t, a)),
          Wt(e, t, n);
        break;
      case 21:
        Wt(e, t, n);
        break;
      case 22:
        (Ue = (a = Ue) || n.memoizedState !== null), Wt(e, t, n), (Ue = a);
        break;
      default:
        Wt(e, t, n);
    }
  }
  function dd(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        zl(e);
      } catch (n) {
        Ae(t, t.return, n);
      }
  }
  function Ap(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new ud()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new ud()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function uu(e, t) {
    var n = Ap(e);
    t.forEach(function (a) {
      var l = qp.bind(null, e, a);
      n.has(a) || (n.add(a), a.then(l, l));
    });
  }
  function ft(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var l = n[a],
          o = e,
          p = t,
          v = p;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (wn(v.type)) {
                (Re = v.stateNode), (lt = !1);
                break e;
              }
              break;
            case 5:
              (Re = v.stateNode), (lt = !1);
              break e;
            case 3:
            case 4:
              (Re = v.stateNode.containerInfo), (lt = !0);
              break e;
          }
          v = v.return;
        }
        if (Re === null) throw Error(r(160));
        fd(o, p, l),
          (Re = null),
          (lt = !1),
          (o = l.alternate),
          o !== null && (o.return = null),
          (l.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) hd(t, e), (t = t.sibling);
  }
  var _t = null;
  function hd(e, t) {
    var n = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ft(t, e),
          dt(e),
          a & 4 && (pn(3, e, e.return), xl(3, e), pn(5, e, e.return));
        break;
      case 1:
        ft(t, e),
          dt(e),
          a & 512 && (Ue || n === null || Lt(n, n.return)),
          a & 64 &&
            Pt &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((n = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = n === null ? a : n.concat(a)))));
        break;
      case 26:
        var l = _t;
        if (
          (ft(t, e),
          dt(e),
          a & 512 && (Ue || n === null || Lt(n, n.return)),
          a & 4)
        ) {
          var o = n !== null ? n.memoizedState : null;
          if (((a = e.memoizedState), n === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  (a = e.type),
                    (n = e.memoizedProps),
                    (l = l.ownerDocument || l);
                  t: switch (a) {
                    case "title":
                      (o = l.getElementsByTagName("title")[0]),
                        (!o ||
                          o[Ga] ||
                          o[Fe] ||
                          o.namespaceURI === "http://www.w3.org/2000/svg" ||
                          o.hasAttribute("itemprop")) &&
                          ((o = l.createElement(a)),
                          l.head.insertBefore(
                            o,
                            l.querySelector("head > title")
                          )),
                        Je(o, a, n),
                        (o[Fe] = e),
                        Ge(o),
                        (a = o);
                      break e;
                    case "link":
                      var p = rh("link", "href", l).get(a + (n.href || ""));
                      if (p) {
                        for (var v = 0; v < p.length; v++)
                          if (
                            ((o = p[v]),
                            o.getAttribute("href") ===
                              (n.href == null || n.href === ""
                                ? null
                                : n.href) &&
                              o.getAttribute("rel") ===
                                (n.rel == null ? null : n.rel) &&
                              o.getAttribute("title") ===
                                (n.title == null ? null : n.title) &&
                              o.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            p.splice(v, 1);
                            break t;
                          }
                      }
                      (o = l.createElement(a)),
                        Je(o, a, n),
                        l.head.appendChild(o);
                      break;
                    case "meta":
                      if (
                        (p = rh("meta", "content", l).get(
                          a + (n.content || "")
                        ))
                      ) {
                        for (v = 0; v < p.length; v++)
                          if (
                            ((o = p[v]),
                            o.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              o.getAttribute("name") ===
                                (n.name == null ? null : n.name) &&
                              o.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              o.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              o.getAttribute("charset") ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            p.splice(v, 1);
                            break t;
                          }
                      }
                      (o = l.createElement(a)),
                        Je(o, a, n),
                        l.head.appendChild(o);
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  (o[Fe] = e), Ge(o), (a = o);
                }
                e.stateNode = a;
              } else uh(l, e.type, e.stateNode);
            else e.stateNode = sh(l, a, e.memoizedProps);
          else
            o !== a
              ? (o === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : o.count--,
                a === null
                  ? uh(l, e.type, e.stateNode)
                  : sh(l, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                lu(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        ft(t, e),
          dt(e),
          a & 512 && (Ue || n === null || Lt(n, n.return)),
          n !== null && a & 4 && lu(e, e.memoizedProps, n.memoizedProps);
        break;
      case 5:
        if (
          (ft(t, e),
          dt(e),
          a & 512 && (Ue || n === null || Lt(n, n.return)),
          e.flags & 32)
        ) {
          l = e.stateNode;
          try {
            na(l, "");
          } catch (L) {
            Ae(e, e.return, L);
          }
        }
        a & 4 &&
          e.stateNode != null &&
          ((l = e.memoizedProps), lu(e, l, n !== null ? n.memoizedProps : l)),
          a & 1024 && (ru = !0);
        break;
      case 6:
        if ((ft(t, e), dt(e), a & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          (a = e.memoizedProps), (n = e.stateNode);
          try {
            n.nodeValue = a;
          } catch (L) {
            Ae(e, e.return, L);
          }
        }
        break;
      case 3:
        if (
          ((ls = null),
          (l = _t),
          (_t = ns(t.containerInfo)),
          ft(t, e),
          (_t = l),
          dt(e),
          a & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            zl(t.containerInfo);
          } catch (L) {
            Ae(e, e.return, L);
          }
        ru && ((ru = !1), md(e));
        break;
      case 4:
        (a = _t),
          (_t = ns(e.stateNode.containerInfo)),
          ft(t, e),
          dt(e),
          (_t = a);
        break;
      case 12:
        ft(t, e), dt(e);
        break;
      case 13:
        ft(t, e),
          dt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (mu = Tt()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), uu(e, a)));
        break;
      case 22:
        l = e.memoizedState !== null;
        var j = n !== null && n.memoizedState !== null,
          R = Pt,
          H = Ue;
        if (
          ((Pt = R || l),
          (Ue = H || j),
          ft(t, e),
          (Ue = H),
          (Pt = R),
          dt(e),
          a & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = l ? t._visibility & -2 : t._visibility | 1,
              l && (n === null || j || Pt || Ue || Xn(e)),
              n = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                j = n = t;
                try {
                  if (((o = j.stateNode), l))
                    (p = o.style),
                      typeof p.setProperty == "function"
                        ? p.setProperty("display", "none", "important")
                        : (p.display = "none");
                  else {
                    v = j.stateNode;
                    var Y = j.memoizedProps.style,
                      M =
                        Y != null && Y.hasOwnProperty("display")
                          ? Y.display
                          : null;
                    v.style.display =
                      M == null || typeof M == "boolean" ? "" : ("" + M).trim();
                  }
                } catch (L) {
                  Ae(j, j.return, L);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                j = t;
                try {
                  j.stateNode.nodeValue = l ? "" : j.memoizedProps;
                } catch (L) {
                  Ae(j, j.return, L);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              n === t && (n = null), (t = t.return);
            }
            n === t && (n = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((n = a.retryQueue),
            n !== null && ((a.retryQueue = null), uu(e, n))));
        break;
      case 19:
        ft(t, e),
          dt(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), uu(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ft(t, e), dt(e);
    }
  }
  function dt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, a = e.return; a !== null; ) {
          if (sd(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var l = n.stateNode,
              o = iu(e);
            Vi(e, o, l);
            break;
          case 5:
            var p = n.stateNode;
            n.flags & 32 && (na(p, ""), (n.flags &= -33));
            var v = iu(e);
            Vi(e, v, p);
            break;
          case 3:
          case 4:
            var j = n.stateNode.containerInfo,
              R = iu(e);
            su(e, R, j);
            break;
          default:
            throw Error(r(161));
        }
      } catch (H) {
        Ae(e, e.return, H);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function md(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        md(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function xn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) od(e, t.alternate, t), (t = t.sibling);
  }
  function Xn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          pn(4, t, t.return), Xn(t);
          break;
        case 1:
          Lt(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && ld(t, t.return, n),
            Xn(t);
          break;
        case 27:
          _l(t.stateNode);
        case 26:
        case 5:
          Lt(t, t.return), Xn(t);
          break;
        case 22:
          t.memoizedState === null && Xn(t);
          break;
        case 30:
          Xn(t);
          break;
        default:
          Xn(t);
      }
      e = e.sibling;
    }
  }
  function yn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        l = e,
        o = t,
        p = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          yn(l, o, n), xl(4, o);
          break;
        case 1:
          if (
            (yn(l, o, n),
            (a = o),
            (l = a.stateNode),
            typeof l.componentDidMount == "function")
          )
            try {
              l.componentDidMount();
            } catch (R) {
              Ae(a, a.return, R);
            }
          if (((a = o), (l = a.updateQueue), l !== null)) {
            var v = a.stateNode;
            try {
              var j = l.shared.hiddenCallbacks;
              if (j !== null)
                for (l.shared.hiddenCallbacks = null, l = 0; l < j.length; l++)
                  Gc(j[l], v);
            } catch (R) {
              Ae(a, a.return, R);
            }
          }
          n && p & 64 && ad(o), yl(o, o.return);
          break;
        case 27:
          rd(o);
        case 26:
        case 5:
          yn(l, o, n), n && a === null && p & 4 && id(o), yl(o, o.return);
          break;
        case 12:
          yn(l, o, n);
          break;
        case 13:
          yn(l, o, n), n && p & 4 && dd(l, o);
          break;
        case 22:
          o.memoizedState === null && yn(l, o, n), yl(o, o.return);
          break;
        case 30:
          break;
        default:
          yn(l, o, n);
      }
      t = t.sibling;
    }
  }
  function ou(e, t) {
    var n = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && al(n));
  }
  function cu(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && al(e));
  }
  function Dt(e, t, n, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) gd(e, t, n, a), (t = t.sibling);
  }
  function gd(e, t, n, a) {
    var l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Dt(e, t, n, a), l & 2048 && xl(9, t);
        break;
      case 1:
        Dt(e, t, n, a);
        break;
      case 3:
        Dt(e, t, n, a),
          l & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && al(e)));
        break;
      case 12:
        if (l & 2048) {
          Dt(e, t, n, a), (e = t.stateNode);
          try {
            var o = t.memoizedProps,
              p = o.id,
              v = o.onPostCommit;
            typeof v == "function" &&
              v(
                p,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (j) {
            Ae(t, t.return, j);
          }
        } else Dt(e, t, n, a);
        break;
      case 13:
        Dt(e, t, n, a);
        break;
      case 23:
        break;
      case 22:
        (o = t.stateNode),
          (p = t.alternate),
          t.memoizedState !== null
            ? o._visibility & 2
              ? Dt(e, t, n, a)
              : vl(e, t)
            : o._visibility & 2
            ? Dt(e, t, n, a)
            : ((o._visibility |= 2),
              Sa(e, t, n, a, (t.subtreeFlags & 10256) !== 0)),
          l & 2048 && ou(p, t);
        break;
      case 24:
        Dt(e, t, n, a), l & 2048 && cu(t.alternate, t);
        break;
      default:
        Dt(e, t, n, a);
    }
  }
  function Sa(e, t, n, a, l) {
    for (l = l && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var o = e,
        p = t,
        v = n,
        j = a,
        R = p.flags;
      switch (p.tag) {
        case 0:
        case 11:
        case 15:
          Sa(o, p, v, j, l), xl(8, p);
          break;
        case 23:
          break;
        case 22:
          var H = p.stateNode;
          p.memoizedState !== null
            ? H._visibility & 2
              ? Sa(o, p, v, j, l)
              : vl(o, p)
            : ((H._visibility |= 2), Sa(o, p, v, j, l)),
            l && R & 2048 && ou(p.alternate, p);
          break;
        case 24:
          Sa(o, p, v, j, l), l && R & 2048 && cu(p.alternate, p);
          break;
        default:
          Sa(o, p, v, j, l);
      }
      t = t.sibling;
    }
  }
  function vl(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e,
          a = t,
          l = a.flags;
        switch (a.tag) {
          case 22:
            vl(n, a), l & 2048 && ou(a.alternate, a);
            break;
          case 24:
            vl(n, a), l & 2048 && cu(a.alternate, a);
            break;
          default:
            vl(n, a);
        }
        t = t.sibling;
      }
  }
  var bl = 8192;
  function Na(e) {
    if (e.subtreeFlags & bl)
      for (e = e.child; e !== null; ) pd(e), (e = e.sibling);
  }
  function pd(e) {
    switch (e.tag) {
      case 26:
        Na(e),
          e.flags & bl &&
            e.memoizedState !== null &&
            h0(_t, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        Na(e);
        break;
      case 3:
      case 4:
        var t = _t;
        (_t = ns(e.stateNode.containerInfo)), Na(e), (_t = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = bl), (bl = 16777216), Na(e), (bl = t))
            : Na(e));
        break;
      default:
        Na(e);
    }
  }
  function xd(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function Sl(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          (Qe = a), vd(a, e);
        }
      xd(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) yd(e), (e = e.sibling);
  }
  function yd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Sl(e), e.flags & 2048 && pn(9, e, e.return);
        break;
      case 3:
        Sl(e);
        break;
      case 12:
        Sl(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Qi(e))
          : Sl(e);
        break;
      default:
        Sl(e);
    }
  }
  function Qi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          (Qe = a), vd(a, e);
        }
      xd(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          pn(8, t, t.return), Qi(t);
          break;
        case 22:
          (n = t.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), Qi(t));
          break;
        default:
          Qi(t);
      }
      e = e.sibling;
    }
  }
  function vd(e, t) {
    for (; Qe !== null; ) {
      var n = Qe;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          pn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          al(n.memoizedState.cache);
      }
      if (((a = n.child), a !== null)) (a.return = n), (Qe = a);
      else
        e: for (n = e; Qe !== null; ) {
          a = Qe;
          var l = a.sibling,
            o = a.return;
          if ((cd(a), a === n)) {
            Qe = null;
            break e;
          }
          if (l !== null) {
            (l.return = o), (Qe = l);
            break e;
          }
          Qe = o;
        }
    }
  }
  var Op = {
      getCacheForType: function (e) {
        var t = Pe(Be),
          n = t.data.get(e);
        return n === void 0 && ((n = e()), t.data.set(e, n)), n;
      },
    },
    Tp = typeof WeakMap == "function" ? WeakMap : Map,
    je = 0,
    Oe = null,
    de = null,
    pe = 0,
    we = 0,
    ht = null,
    vn = !1,
    ja = !1,
    fu = !1,
    It = 0,
    De = 0,
    bn = 0,
    Zn = 0,
    du = 0,
    jt = 0,
    wa = 0,
    Nl = null,
    it = null,
    hu = !1,
    mu = 0,
    Xi = 1 / 0,
    Zi = null,
    Sn = null,
    $e = 0,
    Nn = null,
    Ea = null,
    Ca = 0,
    gu = 0,
    pu = null,
    bd = null,
    jl = 0,
    xu = null;
  function mt() {
    if ((je & 2) !== 0 && pe !== 0) return pe & -pe;
    if (q.T !== null) {
      var e = ha;
      return e !== 0 ? e : wu();
    }
    return zo();
  }
  function Sd() {
    jt === 0 && (jt = (pe & 536870912) === 0 || Ne ? Ro() : 536870912);
    var e = Nt.current;
    return e !== null && (e.flags |= 32), jt;
  }
  function gt(e, t, n) {
    ((e === Oe && (we === 2 || we === 9)) || e.cancelPendingCommit !== null) &&
      (_a(e, 0), jn(e, pe, jt, !1)),
      Ya(e, n),
      ((je & 2) === 0 || e !== Oe) &&
        (e === Oe &&
          ((je & 2) === 0 && (Zn |= n), De === 4 && jn(e, pe, jt, !1)),
        zt(e));
  }
  function Nd(e, t, n) {
    if ((je & 6) !== 0) throw Error(r(327));
    var a = (!n && (t & 124) === 0 && (t & e.expiredLanes) === 0) || ka(e, t),
      l = a ? Lp(e, t) : bu(e, t, !0),
      o = a;
    do {
      if (l === 0) {
        ja && !a && jn(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), o && !Rp(n))) {
          (l = bu(e, t, !1)), (o = !1);
          continue;
        }
        if (l === 2) {
          if (((o = t), e.errorRecoveryDisabledLanes & o)) var p = 0;
          else
            (p = e.pendingLanes & -536870913),
              (p = p !== 0 ? p : p & 536870912 ? 536870912 : 0);
          if (p !== 0) {
            t = p;
            e: {
              var v = e;
              l = Nl;
              var j = v.current.memoizedState.isDehydrated;
              if ((j && (_a(v, p).flags |= 256), (p = bu(v, p, !1)), p !== 2)) {
                if (fu && !j) {
                  (v.errorRecoveryDisabledLanes |= o), (Zn |= o), (l = 4);
                  break e;
                }
                (o = it),
                  (it = l),
                  o !== null && (it === null ? (it = o) : it.push.apply(it, o));
              }
              l = p;
            }
            if (((o = !1), l !== 2)) continue;
          }
        }
        if (l === 1) {
          _a(e, 0), jn(e, t, 0, !0);
          break;
        }
        e: {
          switch (((a = e), (o = l), o)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              jn(a, t, jt, !vn);
              break e;
            case 2:
              it = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((l = mu + 300 - Tt()), 10 < l)) {
            if ((jn(a, t, jt, !vn), ai(a, 0, !0) !== 0)) break e;
            a.timeoutHandle = Pd(
              jd.bind(null, a, n, it, Zi, hu, t, jt, Zn, wa, vn, o, 2, -0, 0),
              l
            );
            break e;
          }
          jd(a, n, it, Zi, hu, t, jt, Zn, wa, vn, o, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    zt(e);
  }
  function jd(e, t, n, a, l, o, p, v, j, R, H, Y, M, L) {
    if (
      ((e.timeoutHandle = -1),
      (Y = t.subtreeFlags),
      (Y & 8192 || (Y & 16785408) === 16785408) &&
        ((Tl = { stylesheets: null, count: 0, unsuspend: d0 }),
        pd(t),
        (Y = m0()),
        Y !== null))
    ) {
      (e.cancelPendingCommit = Y(
        Td.bind(null, e, t, o, n, a, l, p, v, j, H, 1, M, L)
      )),
        jn(e, o, p, !R);
      return;
    }
    Td(e, t, o, n, a, l, p, v, j);
  }
  function Rp(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var a = 0; a < n.length; a++) {
          var l = n[a],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!ot(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        (n.return = t), (t = n);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function jn(e, t, n, a) {
    (t &= ~du),
      (t &= ~Zn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes);
    for (var l = t; 0 < l; ) {
      var o = 31 - ut(l),
        p = 1 << o;
      (a[o] = -1), (l &= ~p);
    }
    n !== 0 && Lo(e, n, t);
  }
  function Ki() {
    return (je & 6) === 0 ? (wl(0), !1) : !0;
  }
  function yu() {
    if (de !== null) {
      if (we === 0) var e = de.return;
      else (e = de), (Xt = kn = null), zr(e), (va = null), (ml = 0), (e = de);
      for (; e !== null; ) nd(e.alternate, e), (e = e.return);
      de = null;
    }
  }
  function _a(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && ((e.timeoutHandle = -1), Jp(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      yu(),
      (Oe = e),
      (de = n = Gt(e.current, null)),
      (pe = t),
      (we = 0),
      (ht = null),
      (vn = !1),
      (ja = ka(e, t)),
      (fu = !1),
      (wa = jt = du = Zn = bn = De = 0),
      (it = Nl = null),
      (hu = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var l = 31 - ut(a),
          o = 1 << l;
        (t |= e[l]), (a &= ~o);
      }
    return (It = t), gi(), n;
  }
  function wd(e, t) {
    (ce = null),
      (q.H = Di),
      t === il || t === wi
        ? ((t = kc()), (we = 3))
        : t === qc
        ? ((t = kc()), (we = 4))
        : (we =
            t === Gf
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (ht = t),
      de === null && ((De = 1), Bi(e, yt(t, e.current)));
  }
  function Ed() {
    var e = q.H;
    return (q.H = Di), e === null ? Di : e;
  }
  function Cd() {
    var e = q.A;
    return (q.A = Op), e;
  }
  function vu() {
    (De = 4),
      vn || ((pe & 4194048) !== pe && Nt.current !== null) || (ja = !0),
      ((bn & 134217727) === 0 && (Zn & 134217727) === 0) ||
        Oe === null ||
        jn(Oe, pe, jt, !1);
  }
  function bu(e, t, n) {
    var a = je;
    je |= 2;
    var l = Ed(),
      o = Cd();
    (Oe !== e || pe !== t) && ((Zi = null), _a(e, t)), (t = !1);
    var p = De;
    e: do
      try {
        if (we !== 0 && de !== null) {
          var v = de,
            j = ht;
          switch (we) {
            case 8:
              yu(), (p = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Nt.current === null && (t = !0);
              var R = we;
              if (((we = 0), (ht = null), Aa(e, v, j, R), n && ja)) {
                p = 0;
                break e;
              }
              break;
            default:
              (R = we), (we = 0), (ht = null), Aa(e, v, j, R);
          }
        }
        Mp(), (p = De);
        break;
      } catch (H) {
        wd(e, H);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Xt = kn = null),
      (je = a),
      (q.H = l),
      (q.A = o),
      de === null && ((Oe = null), (pe = 0), gi()),
      p
    );
  }
  function Mp() {
    for (; de !== null; ) _d(de);
  }
  function Lp(e, t) {
    var n = je;
    je |= 2;
    var a = Ed(),
      l = Cd();
    Oe !== e || pe !== t
      ? ((Zi = null), (Xi = Tt() + 500), _a(e, t))
      : (ja = ka(e, t));
    e: do
      try {
        if (we !== 0 && de !== null) {
          t = de;
          var o = ht;
          t: switch (we) {
            case 1:
              (we = 0), (ht = null), Aa(e, t, o, 1);
              break;
            case 2:
            case 9:
              if (Hc(o)) {
                (we = 0), (ht = null), Ad(t);
                break;
              }
              (t = function () {
                (we !== 2 && we !== 9) || Oe !== e || (we = 7), zt(e);
              }),
                o.then(t, t);
              break e;
            case 3:
              we = 7;
              break e;
            case 4:
              we = 5;
              break e;
            case 7:
              Hc(o)
                ? ((we = 0), (ht = null), Ad(t))
                : ((we = 0), (ht = null), Aa(e, t, o, 7));
              break;
            case 5:
              var p = null;
              switch (de.tag) {
                case 26:
                  p = de.memoizedState;
                case 5:
                case 27:
                  var v = de;
                  if (!p || oh(p)) {
                    (we = 0), (ht = null);
                    var j = v.sibling;
                    if (j !== null) de = j;
                    else {
                      var R = v.return;
                      R !== null ? ((de = R), $i(R)) : (de = null);
                    }
                    break t;
                  }
              }
              (we = 0), (ht = null), Aa(e, t, o, 5);
              break;
            case 6:
              (we = 0), (ht = null), Aa(e, t, o, 6);
              break;
            case 8:
              yu(), (De = 6);
              break e;
            default:
              throw Error(r(462));
          }
        }
        Dp();
        break;
      } catch (H) {
        wd(e, H);
      }
    while (!0);
    return (
      (Xt = kn = null),
      (q.H = a),
      (q.A = l),
      (je = n),
      de !== null ? 0 : ((Oe = null), (pe = 0), gi(), De)
    );
  }
  function Dp() {
    for (; de !== null && !ng(); ) _d(de);
  }
  function _d(e) {
    var t = ed(e.alternate, e, It);
    (e.memoizedProps = e.pendingProps), t === null ? $i(e) : (de = t);
  }
  function Ad(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = $f(n, t, t.pendingProps, t.type, void 0, pe);
        break;
      case 11:
        t = $f(n, t, t.pendingProps, t.type.render, t.ref, pe);
        break;
      case 5:
        zr(t);
      default:
        nd(n, t), (t = de = Ac(t, It)), (t = ed(n, t, It));
    }
    (e.memoizedProps = e.pendingProps), t === null ? $i(e) : (de = t);
  }
  function Aa(e, t, n, a) {
    (Xt = kn = null), zr(t), (va = null), (ml = 0);
    var l = t.return;
    try {
      if (jp(e, l, t, n, pe)) {
        (De = 1), Bi(e, yt(n, e.current)), (de = null);
        return;
      }
    } catch (o) {
      if (l !== null) throw ((de = l), o);
      (De = 1), Bi(e, yt(n, e.current)), (de = null);
      return;
    }
    t.flags & 32768
      ? (Ne || a === 1
          ? (e = !0)
          : ja || (pe & 536870912) !== 0
          ? (e = !1)
          : ((vn = e = !0),
            (a === 2 || a === 9 || a === 3 || a === 6) &&
              ((a = Nt.current),
              a !== null && a.tag === 13 && (a.flags |= 16384))),
        Od(t, e))
      : $i(t);
  }
  function $i(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Od(t, vn);
        return;
      }
      e = t.return;
      var n = Ep(t.alternate, t, It);
      if (n !== null) {
        de = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        de = t;
        return;
      }
      de = t = e;
    } while (t !== null);
    De === 0 && (De = 5);
  }
  function Od(e, t) {
    do {
      var n = Cp(e.alternate, e);
      if (n !== null) {
        (n.flags &= 32767), (de = n);
        return;
      }
      if (
        ((n = e.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        de = e;
        return;
      }
      de = e = n;
    } while (e !== null);
    (De = 6), (de = null);
  }
  function Td(e, t, n, a, l, o, p, v, j) {
    e.cancelPendingCommit = null;
    do Ji();
    while ($e !== 0);
    if ((je & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((o = t.lanes | t.childLanes),
        (o |= cr),
        dg(e, n, o, p, v, j),
        e === Oe && ((de = Oe = null), (pe = 0)),
        (Ea = t),
        (Nn = e),
        (Ca = n),
        (gu = o),
        (pu = l),
        (bd = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Hp(ei, function () {
              return zd(), null;
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        (a = q.T), (q.T = null), (l = X.p), (X.p = 2), (p = je), (je |= 4);
        try {
          _p(e, t, n);
        } finally {
          (je = p), (X.p = l), (q.T = a);
        }
      }
      ($e = 1), Rd(), Md(), Ld();
    }
  }
  function Rd() {
    if ($e === 1) {
      $e = 0;
      var e = Nn,
        t = Ea,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        (n = q.T), (q.T = null);
        var a = X.p;
        X.p = 2;
        var l = je;
        je |= 4;
        try {
          hd(t, e);
          var o = Mu,
            p = yc(e.containerInfo),
            v = o.focusedElem,
            j = o.selectionRange;
          if (
            p !== v &&
            v &&
            v.ownerDocument &&
            xc(v.ownerDocument.documentElement, v)
          ) {
            if (j !== null && ir(v)) {
              var R = j.start,
                H = j.end;
              if ((H === void 0 && (H = R), "selectionStart" in v))
                (v.selectionStart = R),
                  (v.selectionEnd = Math.min(H, v.value.length));
              else {
                var Y = v.ownerDocument || document,
                  M = (Y && Y.defaultView) || window;
                if (M.getSelection) {
                  var L = M.getSelection(),
                    ie = v.textContent.length,
                    ne = Math.min(j.start, ie),
                    _e = j.end === void 0 ? ne : Math.min(j.end, ie);
                  !L.extend && ne > _e && ((p = _e), (_e = ne), (ne = p));
                  var A = pc(v, ne),
                    _ = pc(v, _e);
                  if (
                    A &&
                    _ &&
                    (L.rangeCount !== 1 ||
                      L.anchorNode !== A.node ||
                      L.anchorOffset !== A.offset ||
                      L.focusNode !== _.node ||
                      L.focusOffset !== _.offset)
                  ) {
                    var O = Y.createRange();
                    O.setStart(A.node, A.offset),
                      L.removeAllRanges(),
                      ne > _e
                        ? (L.addRange(O), L.extend(_.node, _.offset))
                        : (O.setEnd(_.node, _.offset), L.addRange(O));
                  }
                }
              }
            }
            for (Y = [], L = v; (L = L.parentNode); )
              L.nodeType === 1 &&
                Y.push({ element: L, left: L.scrollLeft, top: L.scrollTop });
            for (
              typeof v.focus == "function" && v.focus(), v = 0;
              v < Y.length;
              v++
            ) {
              var B = Y[v];
              (B.element.scrollLeft = B.left), (B.element.scrollTop = B.top);
            }
          }
          (rs = !!Ru), (Mu = Ru = null);
        } finally {
          (je = l), (X.p = a), (q.T = n);
        }
      }
      (e.current = t), ($e = 2);
    }
  }
  function Md() {
    if ($e === 2) {
      $e = 0;
      var e = Nn,
        t = Ea,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        (n = q.T), (q.T = null);
        var a = X.p;
        X.p = 2;
        var l = je;
        je |= 4;
        try {
          od(e, t.alternate, t);
        } finally {
          (je = l), (X.p = a), (q.T = n);
        }
      }
      $e = 3;
    }
  }
  function Ld() {
    if ($e === 4 || $e === 3) {
      ($e = 0), ag();
      var e = Nn,
        t = Ea,
        n = Ca,
        a = bd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? ($e = 5)
        : (($e = 0), (Ea = Nn = null), Dd(e, e.pendingLanes));
      var l = e.pendingLanes;
      if (
        (l === 0 && (Sn = null),
        Hs(n),
        (t = t.stateNode),
        rt && typeof rt.onCommitFiberRoot == "function")
      )
        try {
          rt.onCommitFiberRoot(Ba, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        (t = q.T), (l = X.p), (X.p = 2), (q.T = null);
        try {
          for (var o = e.onRecoverableError, p = 0; p < a.length; p++) {
            var v = a[p];
            o(v.value, { componentStack: v.stack });
          }
        } finally {
          (q.T = t), (X.p = l);
        }
      }
      (Ca & 3) !== 0 && Ji(),
        zt(e),
        (l = e.pendingLanes),
        (n & 4194090) !== 0 && (l & 42) !== 0
          ? e === xu
            ? jl++
            : ((jl = 0), (xu = e))
          : (jl = 0),
        wl(0);
    }
  }
  function Dd(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), al(t)));
  }
  function Ji(e) {
    return Rd(), Md(), Ld(), zd();
  }
  function zd() {
    if ($e !== 5) return !1;
    var e = Nn,
      t = gu;
    gu = 0;
    var n = Hs(Ca),
      a = q.T,
      l = X.p;
    try {
      (X.p = 32 > n ? 32 : n), (q.T = null), (n = pu), (pu = null);
      var o = Nn,
        p = Ca;
      if ((($e = 0), (Ea = Nn = null), (Ca = 0), (je & 6) !== 0))
        throw Error(r(331));
      var v = je;
      if (
        ((je |= 4),
        yd(o.current),
        gd(o, o.current, p, n),
        (je = v),
        wl(0, !1),
        rt && typeof rt.onPostCommitFiberRoot == "function")
      )
        try {
          rt.onPostCommitFiberRoot(Ba, o);
        } catch {}
      return !0;
    } finally {
      (X.p = l), (q.T = a), Dd(e, t);
    }
  }
  function Ud(e, t, n) {
    (t = yt(n, t)),
      (t = Jr(e.stateNode, t, 2)),
      (e = dn(e, t, 2)),
      e !== null && (Ya(e, 2), zt(e));
  }
  function Ae(e, t, n) {
    if (e.tag === 3) Ud(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ud(t, e, n);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (Sn === null || !Sn.has(a)))
          ) {
            (e = yt(n, e)),
              (n = kf(2)),
              (a = dn(t, n, 2)),
              a !== null && (Yf(n, a, t, e), Ya(a, 2), zt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Su(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Tp();
      var l = new Set();
      a.set(t, l);
    } else (l = a.get(t)), l === void 0 && ((l = new Set()), a.set(t, l));
    l.has(n) ||
      ((fu = !0), l.add(n), (e = zp.bind(null, e, t, n)), t.then(e, e));
  }
  function zp(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      Oe === e &&
        (pe & n) === n &&
        (De === 4 || (De === 3 && (pe & 62914560) === pe && 300 > Tt() - mu)
          ? (je & 2) === 0 && _a(e, 0)
          : (du |= n),
        wa === pe && (wa = 0)),
      zt(e);
  }
  function qd(e, t) {
    t === 0 && (t = Mo()), (e = oa(e, t)), e !== null && (Ya(e, t), zt(e));
  }
  function Up(e) {
    var t = e.memoizedState,
      n = 0;
    t !== null && (n = t.retryLane), qd(e, n);
  }
  function qp(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var a = e.stateNode,
          l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(t), qd(e, n);
  }
  function Hp(e, t) {
    return Ds(e, t);
  }
  var Fi = null,
    Oa = null,
    Nu = !1,
    Pi = !1,
    ju = !1,
    Kn = 0;
  function zt(e) {
    e !== Oa &&
      e.next === null &&
      (Oa === null ? (Fi = Oa = e) : (Oa = Oa.next = e)),
      (Pi = !0),
      Nu || ((Nu = !0), kp());
  }
  function wl(e, t) {
    if (!ju && Pi) {
      ju = !0;
      do
        for (var n = !1, a = Fi; a !== null; ) {
          if (e !== 0) {
            var l = a.pendingLanes;
            if (l === 0) var o = 0;
            else {
              var p = a.suspendedLanes,
                v = a.pingedLanes;
              (o = (1 << (31 - ut(42 | e) + 1)) - 1),
                (o &= l & ~(p & ~v)),
                (o = o & 201326741 ? (o & 201326741) | 1 : o ? o | 2 : 0);
            }
            o !== 0 && ((n = !0), Yd(a, o));
          } else
            (o = pe),
              (o = ai(
                a,
                a === Oe ? o : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (o & 3) === 0 || ka(a, o) || ((n = !0), Yd(a, o));
          a = a.next;
        }
      while (n);
      ju = !1;
    }
  }
  function Bp() {
    Hd();
  }
  function Hd() {
    Pi = Nu = !1;
    var e = 0;
    Kn !== 0 && ($p() && (e = Kn), (Kn = 0));
    for (var t = Tt(), n = null, a = Fi; a !== null; ) {
      var l = a.next,
        o = Bd(a, t);
      o === 0
        ? ((a.next = null),
          n === null ? (Fi = l) : (n.next = l),
          l === null && (Oa = n))
        : ((n = a), (e !== 0 || (o & 3) !== 0) && (Pi = !0)),
        (a = l);
    }
    wl(e);
  }
  function Bd(e, t) {
    for (
      var n = e.suspendedLanes,
        a = e.pingedLanes,
        l = e.expirationTimes,
        o = e.pendingLanes & -62914561;
      0 < o;

    ) {
      var p = 31 - ut(o),
        v = 1 << p,
        j = l[p];
      j === -1
        ? ((v & n) === 0 || (v & a) !== 0) && (l[p] = fg(v, t))
        : j <= t && (e.expiredLanes |= v),
        (o &= ~v);
    }
    if (
      ((t = Oe),
      (n = pe),
      (n = ai(
        e,
        e === t ? n : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (a = e.callbackNode),
      n === 0 ||
        (e === t && (we === 2 || we === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && zs(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((n & 3) === 0 || ka(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((a !== null && zs(a), Hs(n))) {
        case 2:
        case 8:
          n = Oo;
          break;
        case 32:
          n = ei;
          break;
        case 268435456:
          n = To;
          break;
        default:
          n = ei;
      }
      return (
        (a = kd.bind(null, e)),
        (n = Ds(n, a)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      a !== null && a !== null && zs(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function kd(e, t) {
    if ($e !== 0 && $e !== 5)
      return (e.callbackNode = null), (e.callbackPriority = 0), null;
    var n = e.callbackNode;
    if (Ji() && e.callbackNode !== n) return null;
    var a = pe;
    return (
      (a = ai(
        e,
        e === Oe ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      a === 0
        ? null
        : (Nd(e, a, t),
          Bd(e, Tt()),
          e.callbackNode != null && e.callbackNode === n
            ? kd.bind(null, e)
            : null)
    );
  }
  function Yd(e, t) {
    if (Ji()) return null;
    Nd(e, t, !0);
  }
  function kp() {
    Fp(function () {
      (je & 6) !== 0 ? Ds(Ao, Bp) : Hd();
    });
  }
  function wu() {
    return Kn === 0 && (Kn = Ro()), Kn;
  }
  function Gd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
      ? e
      : ui("" + e);
  }
  function Vd(e, t) {
    var n = t.ownerDocument.createElement("input");
    return (
      (n.name = t.name),
      (n.value = t.value),
      e.id && n.setAttribute("form", e.id),
      t.parentNode.insertBefore(n, t),
      (e = new FormData(e)),
      n.parentNode.removeChild(n),
      e
    );
  }
  function Yp(e, t, n, a, l) {
    if (t === "submit" && n && n.stateNode === l) {
      var o = Gd((l[tt] || null).action),
        p = a.submitter;
      p &&
        ((t = (t = p[tt] || null)
          ? Gd(t.formAction)
          : p.getAttribute("formAction")),
        t !== null && ((o = t), (p = null)));
      var v = new di("action", "action", null, a, l);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Kn !== 0) {
                  var j = p ? Vd(l, p) : new FormData(l);
                  Qr(
                    n,
                    { pending: !0, data: j, method: l.method, action: o },
                    null,
                    j
                  );
                }
              } else
                typeof o == "function" &&
                  (v.preventDefault(),
                  (j = p ? Vd(l, p) : new FormData(l)),
                  Qr(
                    n,
                    { pending: !0, data: j, method: l.method, action: o },
                    o,
                    j
                  ));
            },
            currentTarget: l,
          },
        ],
      });
    }
  }
  for (var Eu = 0; Eu < or.length; Eu++) {
    var Cu = or[Eu],
      Gp = Cu.toLowerCase(),
      Vp = Cu[0].toUpperCase() + Cu.slice(1);
    Ct(Gp, "on" + Vp);
  }
  Ct(Sc, "onAnimationEnd"),
    Ct(Nc, "onAnimationIteration"),
    Ct(jc, "onAnimationStart"),
    Ct("dblclick", "onDoubleClick"),
    Ct("focusin", "onFocus"),
    Ct("focusout", "onBlur"),
    Ct(sp, "onTransitionRun"),
    Ct(rp, "onTransitionStart"),
    Ct(up, "onTransitionCancel"),
    Ct(wc, "onTransitionEnd"),
    In("onMouseEnter", ["mouseout", "mouseover"]),
    In("onMouseLeave", ["mouseout", "mouseover"]),
    In("onPointerEnter", ["pointerout", "pointerover"]),
    In("onPointerLeave", ["pointerout", "pointerover"]),
    Rn(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Rn(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Rn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Rn(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Rn(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Rn(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var El =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    Qp = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(El)
    );
  function Qd(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var a = e[n],
        l = a.event;
      a = a.listeners;
      e: {
        var o = void 0;
        if (t)
          for (var p = a.length - 1; 0 <= p; p--) {
            var v = a[p],
              j = v.instance,
              R = v.currentTarget;
            if (((v = v.listener), j !== o && l.isPropagationStopped()))
              break e;
            (o = v), (l.currentTarget = R);
            try {
              o(l);
            } catch (H) {
              Hi(H);
            }
            (l.currentTarget = null), (o = j);
          }
        else
          for (p = 0; p < a.length; p++) {
            if (
              ((v = a[p]),
              (j = v.instance),
              (R = v.currentTarget),
              (v = v.listener),
              j !== o && l.isPropagationStopped())
            )
              break e;
            (o = v), (l.currentTarget = R);
            try {
              o(l);
            } catch (H) {
              Hi(H);
            }
            (l.currentTarget = null), (o = j);
          }
      }
    }
  }
  function he(e, t) {
    var n = t[Bs];
    n === void 0 && (n = t[Bs] = new Set());
    var a = e + "__bubble";
    n.has(a) || (Xd(t, e, 2, !1), n.add(a));
  }
  function _u(e, t, n) {
    var a = 0;
    t && (a |= 4), Xd(n, e, a, t);
  }
  var Wi = "_reactListening" + Math.random().toString(36).slice(2);
  function Au(e) {
    if (!e[Wi]) {
      (e[Wi] = !0),
        qo.forEach(function (n) {
          n !== "selectionchange" && (Qp.has(n) || _u(n, !1, e), _u(n, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Wi] || ((t[Wi] = !0), _u("selectionchange", !1, t));
    }
  }
  function Xd(e, t, n, a) {
    switch (gh(t)) {
      case 2:
        var l = x0;
        break;
      case 8:
        l = y0;
        break;
      default:
        l = Gu;
    }
    (n = l.bind(null, t, n, e)),
      (l = void 0),
      !Fs ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (l = !0),
      a
        ? l !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: l })
          : e.addEventListener(t, n, !0)
        : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1);
  }
  function Ou(e, t, n, a, l) {
    var o = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var p = a.tag;
        if (p === 3 || p === 4) {
          var v = a.stateNode.containerInfo;
          if (v === l) break;
          if (p === 4)
            for (p = a.return; p !== null; ) {
              var j = p.tag;
              if ((j === 3 || j === 4) && p.stateNode.containerInfo === l)
                return;
              p = p.return;
            }
          for (; v !== null; ) {
            if (((p = Fn(v)), p === null)) return;
            if (((j = p.tag), j === 5 || j === 6 || j === 26 || j === 27)) {
              a = o = p;
              continue e;
            }
            v = v.parentNode;
          }
        }
        a = a.return;
      }
    Po(function () {
      var R = o,
        H = $s(n),
        Y = [];
      e: {
        var M = Ec.get(e);
        if (M !== void 0) {
          var L = di,
            ie = e;
          switch (e) {
            case "keypress":
              if (ci(n) === 0) break e;
            case "keydown":
            case "keyup":
              L = Hg;
              break;
            case "focusin":
              (ie = "focus"), (L = er);
              break;
            case "focusout":
              (ie = "blur"), (L = er);
              break;
            case "beforeblur":
            case "afterblur":
              L = er;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              L = ec;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              L = Cg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              L = Yg;
              break;
            case Sc:
            case Nc:
            case jc:
              L = Og;
              break;
            case wc:
              L = Vg;
              break;
            case "scroll":
            case "scrollend":
              L = wg;
              break;
            case "wheel":
              L = Xg;
              break;
            case "copy":
            case "cut":
            case "paste":
              L = Rg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              L = nc;
              break;
            case "toggle":
            case "beforetoggle":
              L = Kg;
          }
          var ne = (t & 4) !== 0,
            _e = !ne && (e === "scroll" || e === "scrollend"),
            A = ne ? (M !== null ? M + "Capture" : null) : M;
          ne = [];
          for (var _ = R, O; _ !== null; ) {
            var B = _;
            if (
              ((O = B.stateNode),
              (B = B.tag),
              (B !== 5 && B !== 26 && B !== 27) ||
                O === null ||
                A === null ||
                ((B = Qa(_, A)), B != null && ne.push(Cl(_, B, O))),
              _e)
            )
              break;
            _ = _.return;
          }
          0 < ne.length &&
            ((M = new L(M, ie, null, n, H)),
            Y.push({ event: M, listeners: ne }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((M = e === "mouseover" || e === "pointerover"),
            (L = e === "mouseout" || e === "pointerout"),
            M &&
              n !== Ks &&
              (ie = n.relatedTarget || n.fromElement) &&
              (Fn(ie) || ie[Jn]))
          )
            break e;
          if (
            (L || M) &&
            ((M =
              H.window === H
                ? H
                : (M = H.ownerDocument)
                ? M.defaultView || M.parentWindow
                : window),
            L
              ? ((ie = n.relatedTarget || n.toElement),
                (L = R),
                (ie = ie ? Fn(ie) : null),
                ie !== null &&
                  ((_e = d(ie)),
                  (ne = ie.tag),
                  ie !== _e || (ne !== 5 && ne !== 27 && ne !== 6)) &&
                  (ie = null))
              : ((L = null), (ie = R)),
            L !== ie)
          ) {
            if (
              ((ne = ec),
              (B = "onMouseLeave"),
              (A = "onMouseEnter"),
              (_ = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ne = nc),
                (B = "onPointerLeave"),
                (A = "onPointerEnter"),
                (_ = "pointer")),
              (_e = L == null ? M : Va(L)),
              (O = ie == null ? M : Va(ie)),
              (M = new ne(B, _ + "leave", L, n, H)),
              (M.target = _e),
              (M.relatedTarget = O),
              (B = null),
              Fn(H) === R &&
                ((ne = new ne(A, _ + "enter", ie, n, H)),
                (ne.target = O),
                (ne.relatedTarget = _e),
                (B = ne)),
              (_e = B),
              L && ie)
            )
              t: {
                for (ne = L, A = ie, _ = 0, O = ne; O; O = Ta(O)) _++;
                for (O = 0, B = A; B; B = Ta(B)) O++;
                for (; 0 < _ - O; ) (ne = Ta(ne)), _--;
                for (; 0 < O - _; ) (A = Ta(A)), O--;
                for (; _--; ) {
                  if (ne === A || (A !== null && ne === A.alternate)) break t;
                  (ne = Ta(ne)), (A = Ta(A));
                }
                ne = null;
              }
            else ne = null;
            L !== null && Zd(Y, M, L, ne, !1),
              ie !== null && _e !== null && Zd(Y, _e, ie, ne, !0);
          }
        }
        e: {
          if (
            ((M = R ? Va(R) : window),
            (L = M.nodeName && M.nodeName.toLowerCase()),
            L === "select" || (L === "input" && M.type === "file"))
          )
            var J = cc;
          else if (uc(M))
            if (fc) J = ap;
            else {
              J = tp;
              var fe = ep;
            }
          else
            (L = M.nodeName),
              !L ||
              L.toLowerCase() !== "input" ||
              (M.type !== "checkbox" && M.type !== "radio")
                ? R && Zs(R.elementType) && (J = cc)
                : (J = np);
          if (J && (J = J(e, R))) {
            oc(Y, J, n, H);
            break e;
          }
          fe && fe(e, M, R),
            e === "focusout" &&
              R &&
              M.type === "number" &&
              R.memoizedProps.value != null &&
              Xs(M, "number", M.value);
        }
        switch (((fe = R ? Va(R) : window), e)) {
          case "focusin":
            (uc(fe) || fe.contentEditable === "true") &&
              ((sa = fe), (sr = R), (Wa = null));
            break;
          case "focusout":
            Wa = sr = sa = null;
            break;
          case "mousedown":
            rr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (rr = !1), vc(Y, n, H);
            break;
          case "selectionchange":
            if (ip) break;
          case "keydown":
          case "keyup":
            vc(Y, n, H);
        }
        var W;
        if (nr)
          e: {
            switch (e) {
              case "compositionstart":
                var ae = "onCompositionStart";
                break e;
              case "compositionend":
                ae = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ae = "onCompositionUpdate";
                break e;
            }
            ae = void 0;
          }
        else
          ia
            ? sc(e, n) && (ae = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (ae = "onCompositionStart");
        ae &&
          (ac &&
            n.locale !== "ko" &&
            (ia || ae !== "onCompositionStart"
              ? ae === "onCompositionEnd" && ia && (W = Wo())
              : ((un = H),
                (Ps = "value" in un ? un.value : un.textContent),
                (ia = !0))),
          (fe = Ii(R, ae)),
          0 < fe.length &&
            ((ae = new tc(ae, e, null, n, H)),
            Y.push({ event: ae, listeners: fe }),
            W ? (ae.data = W) : ((W = rc(n)), W !== null && (ae.data = W)))),
          (W = Jg ? Fg(e, n) : Pg(e, n)) &&
            ((ae = Ii(R, "onBeforeInput")),
            0 < ae.length &&
              ((fe = new tc("onBeforeInput", "beforeinput", null, n, H)),
              Y.push({ event: fe, listeners: ae }),
              (fe.data = W))),
          Yp(Y, e, R, n, H);
      }
      Qd(Y, t);
    });
  }
  function Cl(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Ii(e, t) {
    for (var n = t + "Capture", a = []; e !== null; ) {
      var l = e,
        o = l.stateNode;
      if (
        ((l = l.tag),
        (l !== 5 && l !== 26 && l !== 27) ||
          o === null ||
          ((l = Qa(e, n)),
          l != null && a.unshift(Cl(e, l, o)),
          (l = Qa(e, t)),
          l != null && a.push(Cl(e, l, o))),
        e.tag === 3)
      )
        return a;
      e = e.return;
    }
    return [];
  }
  function Ta(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Zd(e, t, n, a, l) {
    for (var o = t._reactName, p = []; n !== null && n !== a; ) {
      var v = n,
        j = v.alternate,
        R = v.stateNode;
      if (((v = v.tag), j !== null && j === a)) break;
      (v !== 5 && v !== 26 && v !== 27) ||
        R === null ||
        ((j = R),
        l
          ? ((R = Qa(n, o)), R != null && p.unshift(Cl(n, R, j)))
          : l || ((R = Qa(n, o)), R != null && p.push(Cl(n, R, j)))),
        (n = n.return);
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var Xp = /\r\n?/g,
    Zp = /\u0000|\uFFFD/g;
  function Kd(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        Xp,
        `
`
      )
      .replace(Zp, "");
  }
  function $d(e, t) {
    return (t = Kd(t)), Kd(e) === t;
  }
  function es() {}
  function Ce(e, t, n, a, l, o) {
    switch (n) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || na(e, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            na(e, "" + a);
        break;
      case "className":
        ii(e, "class", a);
        break;
      case "tabIndex":
        ii(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ii(e, n, a);
        break;
      case "style":
        Jo(e, a, o);
        break;
      case "data":
        if (t !== "object") {
          ii(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          e.removeAttribute(n);
          break;
        }
        (a = ui("" + a)), e.setAttribute(n, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == "function" &&
            (n === "formAction"
              ? (t !== "input" && Ce(e, t, "name", l.name, l, null),
                Ce(e, t, "formEncType", l.formEncType, l, null),
                Ce(e, t, "formMethod", l.formMethod, l, null),
                Ce(e, t, "formTarget", l.formTarget, l, null))
              : (Ce(e, t, "encType", l.encType, l, null),
                Ce(e, t, "method", l.method, l, null),
                Ce(e, t, "target", l.target, l, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        (a = ui("" + a)), e.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (e.onclick = es);
        break;
      case "onScroll":
        a != null && he("scroll", e);
        break;
      case "onScrollEnd":
        a != null && he("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((n = a.__html), n != null)) {
            if (l.children != null) throw Error(r(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        (n = ui("" + a)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(n, "" + a)
          : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(n, "")
          : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        a === !0
          ? e.setAttribute(n, "")
          : a !== !1 &&
            a != null &&
            typeof a != "function" &&
            typeof a != "symbol"
          ? e.setAttribute(n, a)
          : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(n, a)
          : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? e.removeAttribute(n)
          : e.setAttribute(n, a);
        break;
      case "popover":
        he("beforetoggle", e), he("toggle", e), li(e, "popover", a);
        break;
      case "xlinkActuate":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        kt(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        kt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        kt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        kt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        li(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = Ng.get(n) || n), li(e, n, a));
    }
  }
  function Tu(e, t, n, a, l, o) {
    switch (n) {
      case "style":
        Jo(e, a, o);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((n = a.__html), n != null)) {
            if (l.children != null) throw Error(r(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? na(e, a)
          : (typeof a == "number" || typeof a == "bigint") && na(e, "" + a);
        break;
      case "onScroll":
        a != null && he("scroll", e);
        break;
      case "onScrollEnd":
        a != null && he("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = es);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Ho.hasOwnProperty(n))
          e: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((l = n.endsWith("Capture")),
              (t = n.slice(2, l ? n.length - 7 : void 0)),
              (o = e[tt] || null),
              (o = o != null ? o[n] : null),
              typeof o == "function" && e.removeEventListener(t, o, l),
              typeof a == "function")
            ) {
              typeof o != "function" &&
                o !== null &&
                (n in e
                  ? (e[n] = null)
                  : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, a, l);
              break e;
            }
            n in e
              ? (e[n] = a)
              : a === !0
              ? e.setAttribute(n, "")
              : li(e, n, a);
          }
    }
  }
  function Je(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        he("error", e), he("load", e);
        var a = !1,
          l = !1,
          o;
        for (o in n)
          if (n.hasOwnProperty(o)) {
            var p = n[o];
            if (p != null)
              switch (o) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  l = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  Ce(e, t, o, p, n, null);
              }
          }
        l && Ce(e, t, "srcSet", n.srcSet, n, null),
          a && Ce(e, t, "src", n.src, n, null);
        return;
      case "input":
        he("invalid", e);
        var v = (o = p = l = null),
          j = null,
          R = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var H = n[a];
            if (H != null)
              switch (a) {
                case "name":
                  l = H;
                  break;
                case "type":
                  p = H;
                  break;
                case "checked":
                  j = H;
                  break;
                case "defaultChecked":
                  R = H;
                  break;
                case "value":
                  o = H;
                  break;
                case "defaultValue":
                  v = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null) throw Error(r(137, t));
                  break;
                default:
                  Ce(e, t, a, H, n, null);
              }
          }
        Xo(e, o, v, j, R, p, l, !1), si(e);
        return;
      case "select":
        he("invalid", e), (a = p = o = null);
        for (l in n)
          if (n.hasOwnProperty(l) && ((v = n[l]), v != null))
            switch (l) {
              case "value":
                o = v;
                break;
              case "defaultValue":
                p = v;
                break;
              case "multiple":
                a = v;
              default:
                Ce(e, t, l, v, n, null);
            }
        (t = o),
          (n = p),
          (e.multiple = !!a),
          t != null ? ta(e, !!a, t, !1) : n != null && ta(e, !!a, n, !0);
        return;
      case "textarea":
        he("invalid", e), (o = l = a = null);
        for (p in n)
          if (n.hasOwnProperty(p) && ((v = n[p]), v != null))
            switch (p) {
              case "value":
                a = v;
                break;
              case "defaultValue":
                l = v;
                break;
              case "children":
                o = v;
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(r(91));
                break;
              default:
                Ce(e, t, p, v, n, null);
            }
        Ko(e, a, l, o), si(e);
        return;
      case "option":
        for (j in n)
          if (n.hasOwnProperty(j) && ((a = n[j]), a != null))
            switch (j) {
              case "selected":
                e.selected =
                  a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Ce(e, t, j, a, n, null);
            }
        return;
      case "dialog":
        he("beforetoggle", e), he("toggle", e), he("cancel", e), he("close", e);
        break;
      case "iframe":
      case "object":
        he("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < El.length; a++) he(El[a], e);
        break;
      case "image":
        he("error", e), he("load", e);
        break;
      case "details":
        he("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        he("error", e), he("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (R in n)
          if (n.hasOwnProperty(R) && ((a = n[R]), a != null))
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                Ce(e, t, R, a, n, null);
            }
        return;
      default:
        if (Zs(t)) {
          for (H in n)
            n.hasOwnProperty(H) &&
              ((a = n[H]), a !== void 0 && Tu(e, t, H, a, n, void 0));
          return;
        }
    }
    for (v in n)
      n.hasOwnProperty(v) && ((a = n[v]), a != null && Ce(e, t, v, a, n, null));
  }
  function Kp(e, t, n, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var l = null,
          o = null,
          p = null,
          v = null,
          j = null,
          R = null,
          H = null;
        for (L in n) {
          var Y = n[L];
          if (n.hasOwnProperty(L) && Y != null)
            switch (L) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                j = Y;
              default:
                a.hasOwnProperty(L) || Ce(e, t, L, null, a, Y);
            }
        }
        for (var M in a) {
          var L = a[M];
          if (((Y = n[M]), a.hasOwnProperty(M) && (L != null || Y != null)))
            switch (M) {
              case "type":
                o = L;
                break;
              case "name":
                l = L;
                break;
              case "checked":
                R = L;
                break;
              case "defaultChecked":
                H = L;
                break;
              case "value":
                p = L;
                break;
              case "defaultValue":
                v = L;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null) throw Error(r(137, t));
                break;
              default:
                L !== Y && Ce(e, t, M, L, a, Y);
            }
        }
        Qs(e, p, v, j, R, H, o, l);
        return;
      case "select":
        L = p = v = M = null;
        for (o in n)
          if (((j = n[o]), n.hasOwnProperty(o) && j != null))
            switch (o) {
              case "value":
                break;
              case "multiple":
                L = j;
              default:
                a.hasOwnProperty(o) || Ce(e, t, o, null, a, j);
            }
        for (l in a)
          if (
            ((o = a[l]),
            (j = n[l]),
            a.hasOwnProperty(l) && (o != null || j != null))
          )
            switch (l) {
              case "value":
                M = o;
                break;
              case "defaultValue":
                v = o;
                break;
              case "multiple":
                p = o;
              default:
                o !== j && Ce(e, t, l, o, a, j);
            }
        (t = v),
          (n = p),
          (a = L),
          M != null
            ? ta(e, !!n, M, !1)
            : !!a != !!n &&
              (t != null ? ta(e, !!n, t, !0) : ta(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        L = M = null;
        for (v in n)
          if (
            ((l = n[v]),
            n.hasOwnProperty(v) && l != null && !a.hasOwnProperty(v))
          )
            switch (v) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ce(e, t, v, null, a, l);
            }
        for (p in a)
          if (
            ((l = a[p]),
            (o = n[p]),
            a.hasOwnProperty(p) && (l != null || o != null))
          )
            switch (p) {
              case "value":
                M = l;
                break;
              case "defaultValue":
                L = l;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (l != null) throw Error(r(91));
                break;
              default:
                l !== o && Ce(e, t, p, l, a, o);
            }
        Zo(e, M, L);
        return;
      case "option":
        for (var ie in n)
          if (
            ((M = n[ie]),
            n.hasOwnProperty(ie) && M != null && !a.hasOwnProperty(ie))
          )
            switch (ie) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ce(e, t, ie, null, a, M);
            }
        for (j in a)
          if (
            ((M = a[j]),
            (L = n[j]),
            a.hasOwnProperty(j) && M !== L && (M != null || L != null))
          )
            switch (j) {
              case "selected":
                e.selected =
                  M && typeof M != "function" && typeof M != "symbol";
                break;
              default:
                Ce(e, t, j, M, a, L);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ne in n)
          (M = n[ne]),
            n.hasOwnProperty(ne) &&
              M != null &&
              !a.hasOwnProperty(ne) &&
              Ce(e, t, ne, null, a, M);
        for (R in a)
          if (
            ((M = a[R]),
            (L = n[R]),
            a.hasOwnProperty(R) && M !== L && (M != null || L != null))
          )
            switch (R) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null) throw Error(r(137, t));
                break;
              default:
                Ce(e, t, R, M, a, L);
            }
        return;
      default:
        if (Zs(t)) {
          for (var _e in n)
            (M = n[_e]),
              n.hasOwnProperty(_e) &&
                M !== void 0 &&
                !a.hasOwnProperty(_e) &&
                Tu(e, t, _e, void 0, a, M);
          for (H in a)
            (M = a[H]),
              (L = n[H]),
              !a.hasOwnProperty(H) ||
                M === L ||
                (M === void 0 && L === void 0) ||
                Tu(e, t, H, M, a, L);
          return;
        }
    }
    for (var A in n)
      (M = n[A]),
        n.hasOwnProperty(A) &&
          M != null &&
          !a.hasOwnProperty(A) &&
          Ce(e, t, A, null, a, M);
    for (Y in a)
      (M = a[Y]),
        (L = n[Y]),
        !a.hasOwnProperty(Y) ||
          M === L ||
          (M == null && L == null) ||
          Ce(e, t, Y, M, a, L);
  }
  var Ru = null,
    Mu = null;
  function ts(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Jd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Fd(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Lu(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Du = null;
  function $p() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === Du
        ? !1
        : ((Du = e), !0)
      : ((Du = null), !1);
  }
  var Pd = typeof setTimeout == "function" ? setTimeout : void 0,
    Jp = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Wd = typeof Promise == "function" ? Promise : void 0,
    Fp =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Wd < "u"
        ? function (e) {
            return Wd.resolve(null).then(e).catch(Pp);
          }
        : Pd;
  function Pp(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function wn(e) {
    return e === "head";
  }
  function Id(e, t) {
    var n = t,
      a = 0,
      l = 0;
    do {
      var o = n.nextSibling;
      if ((e.removeChild(n), o && o.nodeType === 8))
        if (((n = o.data), n === "/$")) {
          if (0 < a && 8 > a) {
            n = a;
            var p = e.ownerDocument;
            if ((n & 1 && _l(p.documentElement), n & 2 && _l(p.body), n & 4))
              for (n = p.head, _l(n), p = n.firstChild; p; ) {
                var v = p.nextSibling,
                  j = p.nodeName;
                p[Ga] ||
                  j === "SCRIPT" ||
                  j === "STYLE" ||
                  (j === "LINK" && p.rel.toLowerCase() === "stylesheet") ||
                  n.removeChild(p),
                  (p = v);
              }
          }
          if (l === 0) {
            e.removeChild(o), zl(t);
            return;
          }
          l--;
        } else
          n === "$" || n === "$?" || n === "$!"
            ? l++
            : (a = n.charCodeAt(0) - 48);
      else a = 0;
      n = o;
    } while (n);
    zl(t);
  }
  function zu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          zu(n), ks(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function Wp(e, t, n, a) {
    for (; e.nodeType === 1; ) {
      var l = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (a) {
        if (!e[Ga])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((o = e.getAttribute("rel")),
                o === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                o !== l.rel ||
                e.getAttribute("href") !==
                  (l.href == null || l.href === "" ? null : l.href) ||
                e.getAttribute("crossorigin") !==
                  (l.crossOrigin == null ? null : l.crossOrigin) ||
                e.getAttribute("title") !== (l.title == null ? null : l.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((o = e.getAttribute("src")),
                (o !== (l.src == null ? null : l.src) ||
                  e.getAttribute("type") !== (l.type == null ? null : l.type) ||
                  e.getAttribute("crossorigin") !==
                    (l.crossOrigin == null ? null : l.crossOrigin)) &&
                  o &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var o = l.name == null ? null : "" + l.name;
        if (l.type === "hidden" && e.getAttribute("name") === o) return e;
      } else return e;
      if (((e = At(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Ip(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !n) ||
        ((e = At(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Uu(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function e0(e, t) {
    var n = e.ownerDocument;
    if (e.data !== "$?" || n.readyState === "complete") t();
    else {
      var a = function () {
        t(), n.removeEventListener("DOMContentLoaded", a);
      };
      n.addEventListener("DOMContentLoaded", a), (e._reactRetry = a);
    }
  }
  function At(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var qu = null;
  function eh(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function th(e, t, n) {
    switch (((t = ts(n)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(r(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(r(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function _l(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    ks(e);
  }
  var wt = new Map(),
    nh = new Set();
  function ns(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
      ? e
      : e.ownerDocument;
  }
  var en = X.d;
  X.d = { f: t0, r: n0, D: a0, C: l0, L: i0, m: s0, X: u0, S: r0, M: o0 };
  function t0() {
    var e = en.f(),
      t = Ki();
    return e || t;
  }
  function n0(e) {
    var t = Pn(e);
    t !== null && t.tag === 5 && t.type === "form" ? Nf(t) : en.r(e);
  }
  var Ra = typeof document > "u" ? null : document;
  function ah(e, t, n) {
    var a = Ra;
    if (a && typeof t == "string" && t) {
      var l = xt(t);
      (l = 'link[rel="' + e + '"][href="' + l + '"]'),
        typeof n == "string" && (l += '[crossorigin="' + n + '"]'),
        nh.has(l) ||
          (nh.add(l),
          (e = { rel: e, crossOrigin: n, href: t }),
          a.querySelector(l) === null &&
            ((t = a.createElement("link")),
            Je(t, "link", e),
            Ge(t),
            a.head.appendChild(t)));
    }
  }
  function a0(e) {
    en.D(e), ah("dns-prefetch", e, null);
  }
  function l0(e, t) {
    en.C(e, t), ah("preconnect", e, t);
  }
  function i0(e, t, n) {
    en.L(e, t, n);
    var a = Ra;
    if (a && e && t) {
      var l = 'link[rel="preload"][as="' + xt(t) + '"]';
      t === "image" && n && n.imageSrcSet
        ? ((l += '[imagesrcset="' + xt(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (l += '[imagesizes="' + xt(n.imageSizes) + '"]'))
        : (l += '[href="' + xt(e) + '"]');
      var o = l;
      switch (t) {
        case "style":
          o = Ma(e);
          break;
        case "script":
          o = La(e);
      }
      wt.has(o) ||
        ((e = y(
          {
            rel: "preload",
            href: t === "image" && n && n.imageSrcSet ? void 0 : e,
            as: t,
          },
          n
        )),
        wt.set(o, e),
        a.querySelector(l) !== null ||
          (t === "style" && a.querySelector(Al(o))) ||
          (t === "script" && a.querySelector(Ol(o))) ||
          ((t = a.createElement("link")),
          Je(t, "link", e),
          Ge(t),
          a.head.appendChild(t)));
    }
  }
  function s0(e, t) {
    en.m(e, t);
    var n = Ra;
    if (n && e) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        l =
          'link[rel="modulepreload"][as="' + xt(a) + '"][href="' + xt(e) + '"]',
        o = l;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = La(e);
      }
      if (
        !wt.has(o) &&
        ((e = y({ rel: "modulepreload", href: e }, t)),
        wt.set(o, e),
        n.querySelector(l) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Ol(o))) return;
        }
        (a = n.createElement("link")),
          Je(a, "link", e),
          Ge(a),
          n.head.appendChild(a);
      }
    }
  }
  function r0(e, t, n) {
    en.S(e, t, n);
    var a = Ra;
    if (a && e) {
      var l = Wn(a).hoistableStyles,
        o = Ma(e);
      t = t || "default";
      var p = l.get(o);
      if (!p) {
        var v = { loading: 0, preload: null };
        if ((p = a.querySelector(Al(o)))) v.loading = 5;
        else {
          (e = y({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = wt.get(o)) && Hu(e, n);
          var j = (p = a.createElement("link"));
          Ge(j),
            Je(j, "link", e),
            (j._p = new Promise(function (R, H) {
              (j.onload = R), (j.onerror = H);
            })),
            j.addEventListener("load", function () {
              v.loading |= 1;
            }),
            j.addEventListener("error", function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            as(p, t, a);
        }
        (p = { type: "stylesheet", instance: p, count: 1, state: v }),
          l.set(o, p);
      }
    }
  }
  function u0(e, t) {
    en.X(e, t);
    var n = Ra;
    if (n && e) {
      var a = Wn(n).hoistableScripts,
        l = La(e),
        o = a.get(l);
      o ||
        ((o = n.querySelector(Ol(l))),
        o ||
          ((e = y({ src: e, async: !0 }, t)),
          (t = wt.get(l)) && Bu(e, t),
          (o = n.createElement("script")),
          Ge(o),
          Je(o, "link", e),
          n.head.appendChild(o)),
        (o = { type: "script", instance: o, count: 1, state: null }),
        a.set(l, o));
    }
  }
  function o0(e, t) {
    en.M(e, t);
    var n = Ra;
    if (n && e) {
      var a = Wn(n).hoistableScripts,
        l = La(e),
        o = a.get(l);
      o ||
        ((o = n.querySelector(Ol(l))),
        o ||
          ((e = y({ src: e, async: !0, type: "module" }, t)),
          (t = wt.get(l)) && Bu(e, t),
          (o = n.createElement("script")),
          Ge(o),
          Je(o, "link", e),
          n.head.appendChild(o)),
        (o = { type: "script", instance: o, count: 1, state: null }),
        a.set(l, o));
    }
  }
  function lh(e, t, n, a) {
    var l = (l = re.current) ? ns(l) : null;
    if (!l) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((t = Ma(n.href)),
            (n = Wn(l).hoistableStyles),
            (a = n.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              n.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          e = Ma(n.href);
          var o = Wn(l).hoistableStyles,
            p = o.get(e);
          if (
            (p ||
              ((l = l.ownerDocument || l),
              (p = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              o.set(e, p),
              (o = l.querySelector(Al(e))) &&
                !o._p &&
                ((p.instance = o), (p.state.loading = 5)),
              wt.has(e) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                wt.set(e, n),
                o || c0(l, e, n, p.state))),
            t && a === null)
          )
            throw Error(r(528, ""));
          return p;
        }
        if (t && a !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (t = n.async),
          (n = n.src),
          typeof n == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = La(n)),
              (n = Wn(l).hoistableScripts),
              (a = n.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                n.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function Ma(e) {
    return 'href="' + xt(e) + '"';
  }
  function Al(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function ih(e) {
    return y({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function c0(e, t, n, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = e.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        Je(t, "link", n),
        Ge(t),
        e.head.appendChild(t));
  }
  function La(e) {
    return '[src="' + xt(e) + '"]';
  }
  function Ol(e) {
    return "script[async]" + e;
  }
  function sh(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = e.querySelector('style[data-href~="' + xt(n.href) + '"]');
          if (a) return (t.instance = a), Ge(a), a;
          var l = y({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement("style")),
            Ge(a),
            Je(a, "style", l),
            as(a, n.precedence, e),
            (t.instance = a)
          );
        case "stylesheet":
          l = Ma(n.href);
          var o = e.querySelector(Al(l));
          if (o) return (t.state.loading |= 4), (t.instance = o), Ge(o), o;
          (a = ih(n)),
            (l = wt.get(l)) && Hu(a, l),
            (o = (e.ownerDocument || e).createElement("link")),
            Ge(o);
          var p = o;
          return (
            (p._p = new Promise(function (v, j) {
              (p.onload = v), (p.onerror = j);
            })),
            Je(o, "link", a),
            (t.state.loading |= 4),
            as(o, n.precedence, e),
            (t.instance = o)
          );
        case "script":
          return (
            (o = La(n.src)),
            (l = e.querySelector(Ol(o)))
              ? ((t.instance = l), Ge(l), l)
              : ((a = n),
                (l = wt.get(o)) && ((a = y({}, n)), Bu(a, l)),
                (e = e.ownerDocument || e),
                (l = e.createElement("script")),
                Ge(l),
                Je(l, "link", a),
                e.head.appendChild(l),
                (t.instance = l))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), as(a, n.precedence, e));
    return t.instance;
  }
  function as(e, t, n) {
    for (
      var a = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        l = a.length ? a[a.length - 1] : null,
        o = l,
        p = 0;
      p < a.length;
      p++
    ) {
      var v = a[p];
      if (v.dataset.precedence === t) o = v;
      else if (o !== l) break;
    }
    o
      ? o.parentNode.insertBefore(e, o.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function Hu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function Bu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var ls = null;
  function rh(e, t, n) {
    if (ls === null) {
      var a = new Map(),
        l = (ls = new Map());
      l.set(n, a);
    } else (l = ls), (a = l.get(n)), a || ((a = new Map()), l.set(n, a));
    if (a.has(e)) return a;
    for (
      a.set(e, null), n = n.getElementsByTagName(e), l = 0;
      l < n.length;
      l++
    ) {
      var o = n[l];
      if (
        !(
          o[Ga] ||
          o[Fe] ||
          (e === "link" && o.getAttribute("rel") === "stylesheet")
        ) &&
        o.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var p = o.getAttribute(t) || "";
        p = e + p;
        var v = a.get(p);
        v ? v.push(o) : a.set(p, [o]);
      }
    }
    return a;
  }
  function uh(e, t, n) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null
      );
  }
  function f0(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function oh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var Tl = null;
  function d0() {}
  function h0(e, t, n) {
    if (Tl === null) throw Error(r(475));
    var a = Tl;
    if (
      t.type === "stylesheet" &&
      (typeof n.media != "string" || matchMedia(n.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var l = Ma(n.href),
          o = e.querySelector(Al(l));
        if (o) {
          (e = o._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (a.count++, (a = is.bind(a)), e.then(a, a)),
            (t.state.loading |= 4),
            (t.instance = o),
            Ge(o);
          return;
        }
        (o = e.ownerDocument || e),
          (n = ih(n)),
          (l = wt.get(l)) && Hu(n, l),
          (o = o.createElement("link")),
          Ge(o);
        var p = o;
        (p._p = new Promise(function (v, j) {
          (p.onload = v), (p.onerror = j);
        })),
          Je(o, "link", n),
          (t.instance = o);
      }
      a.stylesheets === null && (a.stylesheets = new Map()),
        a.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (a.count++,
          (t = is.bind(a)),
          e.addEventListener("load", t),
          e.addEventListener("error", t));
    }
  }
  function m0() {
    if (Tl === null) throw Error(r(475));
    var e = Tl;
    return (
      e.stylesheets && e.count === 0 && ku(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var n = setTimeout(function () {
              if ((e.stylesheets && ku(e, e.stylesheets), e.unsuspend)) {
                var a = e.unsuspend;
                (e.unsuspend = null), a();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(n);
              }
            );
          }
        : null
    );
  }
  function is() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) ku(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var ss = null;
  function ku(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (ss = new Map()),
        t.forEach(g0, e),
        (ss = null),
        is.call(e));
  }
  function g0(e, t) {
    if (!(t.state.loading & 4)) {
      var n = ss.get(e);
      if (n) var a = n.get(null);
      else {
        (n = new Map()), ss.set(e, n);
        for (
          var l = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            o = 0;
          o < l.length;
          o++
        ) {
          var p = l[o];
          (p.nodeName === "LINK" || p.getAttribute("media") !== "not all") &&
            (n.set(p.dataset.precedence, p), (a = p));
        }
        a && n.set(null, a);
      }
      (l = t.instance),
        (p = l.getAttribute("data-precedence")),
        (o = n.get(p) || a),
        o === a && n.set(null, l),
        n.set(p, l),
        this.count++,
        (a = is.bind(this)),
        l.addEventListener("load", a),
        l.addEventListener("error", a),
        o
          ? o.parentNode.insertBefore(l, o.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(l, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var Rl = {
    $$typeof: Q,
    Provider: null,
    Consumer: null,
    _currentValue: ee,
    _currentValue2: ee,
    _threadCount: 0,
  };
  function p0(e, t, n, a, l, o, p, v) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Us(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Us(0)),
      (this.hiddenUpdates = Us(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = l),
      (this.onCaughtError = o),
      (this.onRecoverableError = p),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = v),
      (this.incompleteTransitions = new Map());
  }
  function ch(e, t, n, a, l, o, p, v, j, R, H, Y) {
    return (
      (e = new p0(e, t, n, p, v, j, R, Y)),
      (t = 1),
      o === !0 && (t |= 24),
      (o = ct(3, null, null, t)),
      (e.current = o),
      (o.stateNode = e),
      (t = Sr()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (o.memoizedState = { element: a, isDehydrated: n, cache: t }),
      Er(o),
      e
    );
  }
  function fh(e) {
    return e ? ((e = ca), e) : ca;
  }
  function dh(e, t, n, a, l, o) {
    (l = fh(l)),
      a.context === null ? (a.context = l) : (a.pendingContext = l),
      (a = fn(t)),
      (a.payload = { element: n }),
      (o = o === void 0 ? null : o),
      o !== null && (a.callback = o),
      (n = dn(e, a, t)),
      n !== null && (gt(n, e, t), rl(n, e, t));
  }
  function hh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Yu(e, t) {
    hh(e, t), (e = e.alternate) && hh(e, t);
  }
  function mh(e) {
    if (e.tag === 13) {
      var t = oa(e, 67108864);
      t !== null && gt(t, e, 67108864), Yu(e, 67108864);
    }
  }
  var rs = !0;
  function x0(e, t, n, a) {
    var l = q.T;
    q.T = null;
    var o = X.p;
    try {
      (X.p = 2), Gu(e, t, n, a);
    } finally {
      (X.p = o), (q.T = l);
    }
  }
  function y0(e, t, n, a) {
    var l = q.T;
    q.T = null;
    var o = X.p;
    try {
      (X.p = 8), Gu(e, t, n, a);
    } finally {
      (X.p = o), (q.T = l);
    }
  }
  function Gu(e, t, n, a) {
    if (rs) {
      var l = Vu(a);
      if (l === null) Ou(e, t, a, us, n), ph(e, a);
      else if (b0(l, e, t, n, a)) a.stopPropagation();
      else if ((ph(e, a), t & 4 && -1 < v0.indexOf(e))) {
        for (; l !== null; ) {
          var o = Pn(l);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (((o = o.stateNode), o.current.memoizedState.isDehydrated)) {
                  var p = Tn(o.pendingLanes);
                  if (p !== 0) {
                    var v = o;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; p; ) {
                      var j = 1 << (31 - ut(p));
                      (v.entanglements[1] |= j), (p &= ~j);
                    }
                    zt(o), (je & 6) === 0 && ((Xi = Tt() + 500), wl(0));
                  }
                }
                break;
              case 13:
                (v = oa(o, 2)), v !== null && gt(v, o, 2), Ki(), Yu(o, 2);
            }
          if (((o = Vu(a)), o === null && Ou(e, t, a, us, n), o === l)) break;
          l = o;
        }
        l !== null && a.stopPropagation();
      } else Ou(e, t, a, null, n);
    }
  }
  function Vu(e) {
    return (e = $s(e)), Qu(e);
  }
  var us = null;
  function Qu(e) {
    if (((us = null), (e = Fn(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (us = e), null;
  }
  function gh(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (lg()) {
          case Ao:
            return 2;
          case Oo:
            return 8;
          case ei:
          case ig:
            return 32;
          case To:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Xu = !1,
    En = null,
    Cn = null,
    _n = null,
    Ml = new Map(),
    Ll = new Map(),
    An = [],
    v0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function ph(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        En = null;
        break;
      case "dragenter":
      case "dragleave":
        Cn = null;
        break;
      case "mouseover":
      case "mouseout":
        _n = null;
        break;
      case "pointerover":
      case "pointerout":
        Ml.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ll.delete(t.pointerId);
    }
  }
  function Dl(e, t, n, a, l, o) {
    return e === null || e.nativeEvent !== o
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: a,
          nativeEvent: o,
          targetContainers: [l],
        }),
        t !== null && ((t = Pn(t)), t !== null && mh(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e);
  }
  function b0(e, t, n, a, l) {
    switch (t) {
      case "focusin":
        return (En = Dl(En, e, t, n, a, l)), !0;
      case "dragenter":
        return (Cn = Dl(Cn, e, t, n, a, l)), !0;
      case "mouseover":
        return (_n = Dl(_n, e, t, n, a, l)), !0;
      case "pointerover":
        var o = l.pointerId;
        return Ml.set(o, Dl(Ml.get(o) || null, e, t, n, a, l)), !0;
      case "gotpointercapture":
        return (
          (o = l.pointerId), Ll.set(o, Dl(Ll.get(o) || null, e, t, n, a, l)), !0
        );
    }
    return !1;
  }
  function xh(e) {
    var t = Fn(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = h(n)), t !== null)) {
            (e.blockedOn = t),
              hg(e.priority, function () {
                if (n.tag === 13) {
                  var a = mt();
                  a = qs(a);
                  var l = oa(n, a);
                  l !== null && gt(l, n, a), Yu(n, a);
                }
              });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function os(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Vu(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var a = new n.constructor(n.type, n);
        (Ks = a), n.target.dispatchEvent(a), (Ks = null);
      } else return (t = Pn(n)), t !== null && mh(t), (e.blockedOn = n), !1;
      t.shift();
    }
    return !0;
  }
  function yh(e, t, n) {
    os(e) && n.delete(t);
  }
  function S0() {
    (Xu = !1),
      En !== null && os(En) && (En = null),
      Cn !== null && os(Cn) && (Cn = null),
      _n !== null && os(_n) && (_n = null),
      Ml.forEach(yh),
      Ll.forEach(yh);
  }
  function cs(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Xu ||
        ((Xu = !0),
        s.unstable_scheduleCallback(s.unstable_NormalPriority, S0)));
  }
  var fs = null;
  function vh(e) {
    fs !== e &&
      ((fs = e),
      s.unstable_scheduleCallback(s.unstable_NormalPriority, function () {
        fs === e && (fs = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            a = e[t + 1],
            l = e[t + 2];
          if (typeof a != "function") {
            if (Qu(a || n) === null) continue;
            break;
          }
          var o = Pn(n);
          o !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Qr(o, { pending: !0, data: l, method: n.method, action: a }, a, l));
        }
      }));
  }
  function zl(e) {
    function t(j) {
      return cs(j, e);
    }
    En !== null && cs(En, e),
      Cn !== null && cs(Cn, e),
      _n !== null && cs(_n, e),
      Ml.forEach(t),
      Ll.forEach(t);
    for (var n = 0; n < An.length; n++) {
      var a = An[n];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < An.length && ((n = An[0]), n.blockedOn === null); )
      xh(n), n.blockedOn === null && An.shift();
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (a = 0; a < n.length; a += 3) {
        var l = n[a],
          o = n[a + 1],
          p = l[tt] || null;
        if (typeof o == "function") p || vh(n);
        else if (p) {
          var v = null;
          if (o && o.hasAttribute("formAction")) {
            if (((l = o), (p = o[tt] || null))) v = p.formAction;
            else if (Qu(l) !== null) continue;
          } else v = p.action;
          typeof v == "function" ? (n[a + 1] = v) : (n.splice(a, 3), (a -= 3)),
            vh(n);
        }
      }
  }
  function Zu(e) {
    this._internalRoot = e;
  }
  (ds.prototype.render = Zu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var n = t.current,
        a = mt();
      dh(n, a, e, t, null, null);
    }),
    (ds.prototype.unmount = Zu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          dh(e.current, 2, null, e, null, null), Ki(), (t[Jn] = null);
        }
      });
  function ds(e) {
    this._internalRoot = e;
  }
  ds.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = zo();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < An.length && t !== 0 && t < An[n].priority; n++);
      An.splice(n, 0, e), n === 0 && xh(e);
    }
  };
  var bh = i.version;
  if (bh !== "19.1.1") throw Error(r(527, bh, "19.1.1"));
  X.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(r(188))
        : ((e = Object.keys(e).join(",")), Error(r(268, e)));
    return (
      (e = g(t)),
      (e = e !== null ? m(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var N0 = {
    bundleType: 0,
    version: "19.1.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: q,
    reconcilerVersion: "19.1.1",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var hs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hs.isDisabled && hs.supportsFiber)
      try {
        (Ba = hs.inject(N0)), (rt = hs);
      } catch {}
  }
  return (
    (kl.createRoot = function (e, t) {
      if (!f(e)) throw Error(r(299));
      var n = !1,
        a = "",
        l = Uf,
        o = qf,
        p = Hf,
        v = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (l = t.onUncaughtError),
          t.onCaughtError !== void 0 && (o = t.onCaughtError),
          t.onRecoverableError !== void 0 && (p = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (v = t.unstable_transitionCallbacks)),
        (t = ch(e, 1, !1, null, null, n, a, l, o, p, v, null)),
        (e[Jn] = t.current),
        Au(e),
        new Zu(t)
      );
    }),
    (kl.hydrateRoot = function (e, t, n) {
      if (!f(e)) throw Error(r(299));
      var a = !1,
        l = "",
        o = Uf,
        p = qf,
        v = Hf,
        j = null,
        R = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (a = !0),
          n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (o = n.onUncaughtError),
          n.onCaughtError !== void 0 && (p = n.onCaughtError),
          n.onRecoverableError !== void 0 && (v = n.onRecoverableError),
          n.unstable_transitionCallbacks !== void 0 &&
            (j = n.unstable_transitionCallbacks),
          n.formState !== void 0 && (R = n.formState)),
        (t = ch(e, 1, !0, t, n ?? null, a, l, o, p, v, j, R)),
        (t.context = fh(null)),
        (n = t.current),
        (a = mt()),
        (a = qs(a)),
        (l = fn(a)),
        (l.callback = null),
        dn(n, l, a),
        (n = a),
        (t.current.lanes = n),
        Ya(t, n),
        zt(t),
        (e[Jn] = t.current),
        Au(e),
        new ds(t)
      );
    }),
    (kl.version = "19.1.1"),
    kl
  );
}
var hm;
function ly() {
  if (hm) return ro.exports;
  hm = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (i) {
        console.error(i);
      }
  }
  return s(), (ro.exports = ay()), ro.exports;
}
var iy = ly();
/**
 * react-router v7.9.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var mm = "popstate";
function sy(s = {}) {
  function i(r, f) {
    let { pathname: d, search: h, hash: x } = r.location;
    return yo(
      "",
      { pathname: d, search: h, hash: x },
      (f.state && f.state.usr) || null,
      (f.state && f.state.key) || "default"
    );
  }
  function u(r, f) {
    return typeof f == "string" ? f : Zl(f);
  }
  return uy(i, u, null, s);
}
function Ye(s, i) {
  if (s === !1 || s === null || typeof s > "u") throw new Error(i);
}
function qt(s, i) {
  if (!s) {
    typeof console < "u" && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function ry() {
  return Math.random().toString(36).substring(2, 10);
}
function gm(s, i) {
  return { usr: s.state, key: s.key, idx: i };
}
function yo(s, i, u = null, r) {
  return {
    pathname: typeof s == "string" ? s : s.pathname,
    search: "",
    hash: "",
    ...(typeof i == "string" ? Kl(i) : i),
    state: u,
    key: (i && i.key) || r || ry(),
  };
}
function Zl({ pathname: s = "/", search: i = "", hash: u = "" }) {
  return (
    i && i !== "?" && (s += i.charAt(0) === "?" ? i : "?" + i),
    u && u !== "#" && (s += u.charAt(0) === "#" ? u : "#" + u),
    s
  );
}
function Kl(s) {
  let i = {};
  if (s) {
    let u = s.indexOf("#");
    u >= 0 && ((i.hash = s.substring(u)), (s = s.substring(0, u)));
    let r = s.indexOf("?");
    r >= 0 && ((i.search = s.substring(r)), (s = s.substring(0, r))),
      s && (i.pathname = s);
  }
  return i;
}
function uy(s, i, u, r = {}) {
  let { window: f = document.defaultView, v5Compat: d = !1 } = r,
    h = f.history,
    x = "POP",
    g = null,
    m = y();
  m == null && ((m = 0), h.replaceState({ ...h.state, idx: m }, ""));
  function y() {
    return (h.state || { idx: null }).idx;
  }
  function S() {
    x = "POP";
    let C = y(),
      D = C == null ? null : C - m;
    (m = C), g && g({ action: x, location: T.location, delta: D });
  }
  function N(C, D) {
    x = "PUSH";
    let U = yo(T.location, C, D);
    m = y() + 1;
    let Q = gm(U, m),
      P = T.createHref(U);
    try {
      h.pushState(Q, "", P);
    } catch (G) {
      if (G instanceof DOMException && G.name === "DataCloneError") throw G;
      f.location.assign(P);
    }
    d && g && g({ action: x, location: T.location, delta: 1 });
  }
  function b(C, D) {
    x = "REPLACE";
    let U = yo(T.location, C, D);
    m = y();
    let Q = gm(U, m),
      P = T.createHref(U);
    h.replaceState(Q, "", P),
      d && g && g({ action: x, location: T.location, delta: 0 });
  }
  function w(C) {
    return oy(C);
  }
  let T = {
    get action() {
      return x;
    },
    get location() {
      return s(f, h);
    },
    listen(C) {
      if (g) throw new Error("A history only accepts one active listener");
      return (
        f.addEventListener(mm, S),
        (g = C),
        () => {
          f.removeEventListener(mm, S), (g = null);
        }
      );
    },
    createHref(C) {
      return i(f, C);
    },
    createURL: w,
    encodeLocation(C) {
      let D = w(C);
      return { pathname: D.pathname, search: D.search, hash: D.hash };
    },
    push: N,
    replace: b,
    go(C) {
      return h.go(C);
    },
  };
  return T;
}
function oy(s, i = !1) {
  let u = "http://localhost";
  typeof window < "u" &&
    (u =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    Ye(u, "No window.location.(origin|href) available to create URL");
  let r = typeof s == "string" ? s : Zl(s);
  return (
    (r = r.replace(/ $/, "%20")),
    !i && r.startsWith("//") && (r = u + r),
    new URL(r, u)
  );
}
function Um(s, i, u = "/") {
  return cy(s, i, u, !1);
}
function cy(s, i, u, r) {
  let f = typeof i == "string" ? Kl(i) : i,
    d = an(f.pathname || "/", u);
  if (d == null) return null;
  let h = qm(s);
  fy(h);
  let x = null;
  for (let g = 0; x == null && g < h.length; ++g) {
    let m = Ny(d);
    x = by(h[g], m, r);
  }
  return x;
}
function qm(s, i = [], u = [], r = "", f = !1) {
  let d = (h, x, g = f, m) => {
    let y = {
      relativePath: m === void 0 ? h.path || "" : m,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: x,
      route: h,
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(r) && g) return;
      Ye(
        y.relativePath.startsWith(r),
        `Absolute route path "${y.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (y.relativePath = y.relativePath.slice(r.length));
    }
    let S = nn([r, y.relativePath]),
      N = u.concat(y);
    h.children &&
      h.children.length > 0 &&
      (Ye(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${S}".`
      ),
      qm(h.children, i, N, S, g)),
      !(h.path == null && !h.index) &&
        i.push({ path: S, score: yy(S, h.index), routesMeta: N });
  };
  return (
    s.forEach((h, x) => {
      if (h.path === "" || !h.path?.includes("?")) d(h, x);
      else for (let g of Hm(h.path)) d(h, x, !0, g);
    }),
    i
  );
}
function Hm(s) {
  let i = s.split("/");
  if (i.length === 0) return [];
  let [u, ...r] = i,
    f = u.endsWith("?"),
    d = u.replace(/\?$/, "");
  if (r.length === 0) return f ? [d, ""] : [d];
  let h = Hm(r.join("/")),
    x = [];
  return (
    x.push(...h.map((g) => (g === "" ? d : [d, g].join("/")))),
    f && x.push(...h),
    x.map((g) => (s.startsWith("/") && g === "" ? "/" : g))
  );
}
function fy(s) {
  s.sort((i, u) =>
    i.score !== u.score
      ? u.score - i.score
      : vy(
          i.routesMeta.map((r) => r.childrenIndex),
          u.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var dy = /^:[\w-]+$/,
  hy = 3,
  my = 2,
  gy = 1,
  py = 10,
  xy = -2,
  pm = (s) => s === "*";
function yy(s, i) {
  let u = s.split("/"),
    r = u.length;
  return (
    u.some(pm) && (r += xy),
    i && (r += my),
    u
      .filter((f) => !pm(f))
      .reduce((f, d) => f + (dy.test(d) ? hy : d === "" ? gy : py), r)
  );
}
function vy(s, i) {
  return s.length === i.length && s.slice(0, -1).every((r, f) => r === i[f])
    ? s[s.length - 1] - i[i.length - 1]
    : 0;
}
function by(s, i, u = !1) {
  let { routesMeta: r } = s,
    f = {},
    d = "/",
    h = [];
  for (let x = 0; x < r.length; ++x) {
    let g = r[x],
      m = x === r.length - 1,
      y = d === "/" ? i : i.slice(d.length) || "/",
      S = Es(
        { path: g.relativePath, caseSensitive: g.caseSensitive, end: m },
        y
      ),
      N = g.route;
    if (
      (!S &&
        m &&
        u &&
        !r[r.length - 1].route.index &&
        (S = Es(
          { path: g.relativePath, caseSensitive: g.caseSensitive, end: !1 },
          y
        )),
      !S)
    )
      return null;
    Object.assign(f, S.params),
      h.push({
        params: f,
        pathname: nn([d, S.pathname]),
        pathnameBase: Cy(nn([d, S.pathnameBase])),
        route: N,
      }),
      S.pathnameBase !== "/" && (d = nn([d, S.pathnameBase]));
  }
  return h;
}
function Es(s, i) {
  typeof s == "string" && (s = { path: s, caseSensitive: !1, end: !0 });
  let [u, r] = Sy(s.path, s.caseSensitive, s.end),
    f = i.match(u);
  if (!f) return null;
  let d = f[0],
    h = d.replace(/(.)\/+$/, "$1"),
    x = f.slice(1);
  return {
    params: r.reduce((m, { paramName: y, isOptional: S }, N) => {
      if (y === "*") {
        let w = x[N] || "";
        h = d.slice(0, d.length - w.length).replace(/(.)\/+$/, "$1");
      }
      const b = x[N];
      return (
        S && !b ? (m[y] = void 0) : (m[y] = (b || "").replace(/%2F/g, "/")), m
      );
    }, {}),
    pathname: d,
    pathnameBase: h,
    pattern: s,
  };
}
function Sy(s, i = !1, u = !0) {
  qt(
    s === "*" || !s.endsWith("*") || s.endsWith("/*"),
    `Route path "${s}" will be treated as if it were "${s.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let r = [],
    f =
      "^" +
      s
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (h, x, g) => (
            r.push({ paramName: x, isOptional: g != null }),
            g ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    s.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (f += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : u
      ? (f += "\\/*$")
      : s !== "" && s !== "/" && (f += "(?:(?=\\/|$))"),
    [new RegExp(f, i ? void 0 : "i"), r]
  );
}
function Ny(s) {
  try {
    return s
      .split("/")
      .map((i) => decodeURIComponent(i).replace(/\//g, "%2F"))
      .join("/");
  } catch (i) {
    return (
      qt(
        !1,
        `The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      s
    );
  }
}
function an(s, i) {
  if (i === "/") return s;
  if (!s.toLowerCase().startsWith(i.toLowerCase())) return null;
  let u = i.endsWith("/") ? i.length - 1 : i.length,
    r = s.charAt(u);
  return r && r !== "/" ? null : s.slice(u) || "/";
}
function jy(s, i = "/") {
  let {
    pathname: u,
    search: r = "",
    hash: f = "",
  } = typeof s == "string" ? Kl(s) : s;
  return {
    pathname: u ? (u.startsWith("/") ? u : wy(u, i)) : i,
    search: _y(r),
    hash: Ay(f),
  };
}
function wy(s, i) {
  let u = i.replace(/\/+$/, "").split("/");
  return (
    s.split("/").forEach((f) => {
      f === ".." ? u.length > 1 && u.pop() : f !== "." && u.push(f);
    }),
    u.length > 1 ? u.join("/") : "/"
  );
}
function fo(s, i, u, r) {
  return `Cannot include a '${s}' character in a manually specified \`to.${i}\` field [${JSON.stringify(
    r
  )}].  Please separate it out to the \`to.${u}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Ey(s) {
  return s.filter(
    (i, u) => u === 0 || (i.route.path && i.route.path.length > 0)
  );
}
function Bm(s) {
  let i = Ey(s);
  return i.map((u, r) => (r === i.length - 1 ? u.pathname : u.pathnameBase));
}
function km(s, i, u, r = !1) {
  let f;
  typeof s == "string"
    ? (f = Kl(s))
    : ((f = { ...s }),
      Ye(
        !f.pathname || !f.pathname.includes("?"),
        fo("?", "pathname", "search", f)
      ),
      Ye(
        !f.pathname || !f.pathname.includes("#"),
        fo("#", "pathname", "hash", f)
      ),
      Ye(!f.search || !f.search.includes("#"), fo("#", "search", "hash", f)));
  let d = s === "" || f.pathname === "",
    h = d ? "/" : f.pathname,
    x;
  if (h == null) x = u;
  else {
    let S = i.length - 1;
    if (!r && h.startsWith("..")) {
      let N = h.split("/");
      for (; N[0] === ".."; ) N.shift(), (S -= 1);
      f.pathname = N.join("/");
    }
    x = S >= 0 ? i[S] : "/";
  }
  let g = jy(f, x),
    m = h && h !== "/" && h.endsWith("/"),
    y = (d || h === ".") && u.endsWith("/");
  return !g.pathname.endsWith("/") && (m || y) && (g.pathname += "/"), g;
}
var nn = (s) => s.join("/").replace(/\/\/+/g, "/"),
  Cy = (s) => s.replace(/\/+$/, "").replace(/^\/*/, "/"),
  _y = (s) => (!s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s),
  Ay = (s) => (!s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s);
function Oy(s) {
  return (
    s != null &&
    typeof s.status == "number" &&
    typeof s.statusText == "string" &&
    typeof s.internal == "boolean" &&
    "data" in s
  );
}
var Ym = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Ym);
var Ty = ["GET", ...Ym];
new Set(Ty);
var Ha = z.createContext(null);
Ha.displayName = "DataRouter";
var Os = z.createContext(null);
Os.displayName = "DataRouterState";
z.createContext(!1);
var Gm = z.createContext({ isTransitioning: !1 });
Gm.displayName = "ViewTransition";
var Ry = z.createContext(new Map());
Ry.displayName = "Fetchers";
var My = z.createContext(null);
My.displayName = "Await";
var Ht = z.createContext(null);
Ht.displayName = "Navigation";
var Ts = z.createContext(null);
Ts.displayName = "Location";
var Bt = z.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Bt.displayName = "Route";
var No = z.createContext(null);
No.displayName = "RouteError";
function Ly(s, { relative: i } = {}) {
  Ye(
    $l(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: u, navigator: r } = z.useContext(Ht),
    { hash: f, pathname: d, search: h } = Jl(s, { relative: i }),
    x = d;
  return (
    u !== "/" && (x = d === "/" ? u : nn([u, d])),
    r.createHref({ pathname: x, search: h, hash: f })
  );
}
function $l() {
  return z.useContext(Ts) != null;
}
function $n() {
  return (
    Ye(
      $l(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    z.useContext(Ts).location
  );
}
var Vm =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Qm(s) {
  z.useContext(Ht).static || z.useLayoutEffect(s);
}
function Xm() {
  let { isDataRoute: s } = z.useContext(Bt);
  return s ? Ky() : Dy();
}
function Dy() {
  Ye(
    $l(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let s = z.useContext(Ha),
    { basename: i, navigator: u } = z.useContext(Ht),
    { matches: r } = z.useContext(Bt),
    { pathname: f } = $n(),
    d = JSON.stringify(Bm(r)),
    h = z.useRef(!1);
  return (
    Qm(() => {
      h.current = !0;
    }),
    z.useCallback(
      (g, m = {}) => {
        if ((qt(h.current, Vm), !h.current)) return;
        if (typeof g == "number") {
          u.go(g);
          return;
        }
        let y = km(g, JSON.parse(d), f, m.relative === "path");
        s == null &&
          i !== "/" &&
          (y.pathname = y.pathname === "/" ? i : nn([i, y.pathname])),
          (m.replace ? u.replace : u.push)(y, m.state, m);
      },
      [i, u, d, f, s]
    )
  );
}
z.createContext(null);
function zy() {
  let { matches: s } = z.useContext(Bt),
    i = s[s.length - 1];
  return i ? i.params : {};
}
function Jl(s, { relative: i } = {}) {
  let { matches: u } = z.useContext(Bt),
    { pathname: r } = $n(),
    f = JSON.stringify(Bm(u));
  return z.useMemo(() => km(s, JSON.parse(f), r, i === "path"), [s, f, r, i]);
}
function Uy(s, i) {
  return Zm(s);
}
function Zm(s, i, u, r, f) {
  Ye(
    $l(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: d } = z.useContext(Ht),
    { matches: h } = z.useContext(Bt),
    x = h[h.length - 1],
    g = x ? x.params : {},
    m = x ? x.pathname : "/",
    y = x ? x.pathnameBase : "/",
    S = x && x.route;
  {
    let U = (S && S.path) || "";
    Km(
      m,
      !S || U.endsWith("*") || U.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${U}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${U}"> to <Route path="${
        U === "/" ? "*" : `${U}/*`
      }">.`
    );
  }
  let N = $n(),
    b;
  b = N;
  let w = b.pathname || "/",
    T = w;
  if (y !== "/") {
    let U = y.replace(/^\//, "").split("/");
    T = "/" + w.replace(/^\//, "").split("/").slice(U.length).join("/");
  }
  let C = Um(s, { pathname: T });
  return (
    qt(
      S || C != null,
      `No routes matched location "${b.pathname}${b.search}${b.hash}" `
    ),
    qt(
      C == null ||
        C[C.length - 1].route.element !== void 0 ||
        C[C.length - 1].route.Component !== void 0 ||
        C[C.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ),
    Yy(
      C &&
        C.map((U) =>
          Object.assign({}, U, {
            params: Object.assign({}, g, U.params),
            pathname: nn([
              y,
              d.encodeLocation
                ? d.encodeLocation(
                    U.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
                  ).pathname
                : U.pathname,
            ]),
            pathnameBase:
              U.pathnameBase === "/"
                ? y
                : nn([
                    y,
                    d.encodeLocation
                      ? d.encodeLocation(
                          U.pathnameBase
                            .replace(/\?/g, "%3F")
                            .replace(/#/g, "%23")
                        ).pathname
                      : U.pathnameBase,
                  ]),
          })
        ),
      h,
      u,
      r,
      f
    )
  );
}
function qy() {
  let s = Zy(),
    i = Oy(s)
      ? `${s.status} ${s.statusText}`
      : s instanceof Error
      ? s.message
      : JSON.stringify(s),
    u = s instanceof Error ? s.stack : null,
    r = "rgba(200,200,200, 0.5)",
    f = { padding: "0.5rem", backgroundColor: r },
    d = { padding: "2px 4px", backgroundColor: r },
    h = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", s),
    (h = z.createElement(
      z.Fragment,
      null,
      z.createElement("p", null, "💿 Hey developer 👋"),
      z.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        z.createElement("code", { style: d }, "ErrorBoundary"),
        " or",
        " ",
        z.createElement("code", { style: d }, "errorElement"),
        " prop on your route."
      )
    )),
    z.createElement(
      z.Fragment,
      null,
      z.createElement("h2", null, "Unexpected Application Error!"),
      z.createElement("h3", { style: { fontStyle: "italic" } }, i),
      u ? z.createElement("pre", { style: f }, u) : null,
      h
    )
  );
}
var Hy = z.createElement(qy, null),
  By = class extends z.Component {
    constructor(s) {
      super(s),
        (this.state = {
          location: s.location,
          revalidation: s.revalidation,
          error: s.error,
        });
    }
    static getDerivedStateFromError(s) {
      return { error: s };
    }
    static getDerivedStateFromProps(s, i) {
      return i.location !== s.location ||
        (i.revalidation !== "idle" && s.revalidation === "idle")
        ? { error: s.error, location: s.location, revalidation: s.revalidation }
        : {
            error: s.error !== void 0 ? s.error : i.error,
            location: i.location,
            revalidation: s.revalidation || i.revalidation,
          };
    }
    componentDidCatch(s, i) {
      this.props.unstable_onError
        ? this.props.unstable_onError(s, i)
        : console.error(
            "React Router caught the following error during render",
            s
          );
    }
    render() {
      return this.state.error !== void 0
        ? z.createElement(
            Bt.Provider,
            { value: this.props.routeContext },
            z.createElement(No.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function ky({ routeContext: s, match: i, children: u }) {
  let r = z.useContext(Ha);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = i.route.id),
    z.createElement(Bt.Provider, { value: s }, u)
  );
}
function Yy(s, i = [], u = null, r = null, f = null) {
  if (s == null) {
    if (!u) return null;
    if (u.errors) s = u.matches;
    else if (i.length === 0 && !u.initialized && u.matches.length > 0)
      s = u.matches;
    else return null;
  }
  let d = s,
    h = u?.errors;
  if (h != null) {
    let m = d.findIndex((y) => y.route.id && h?.[y.route.id] !== void 0);
    Ye(
      m >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        h
      ).join(",")}`
    ),
      (d = d.slice(0, Math.min(d.length, m + 1)));
  }
  let x = !1,
    g = -1;
  if (u)
    for (let m = 0; m < d.length; m++) {
      let y = d[m];
      if (
        ((y.route.HydrateFallback || y.route.hydrateFallbackElement) && (g = m),
        y.route.id)
      ) {
        let { loaderData: S, errors: N } = u,
          b =
            y.route.loader &&
            !S.hasOwnProperty(y.route.id) &&
            (!N || N[y.route.id] === void 0);
        if (y.route.lazy || b) {
          (x = !0), g >= 0 ? (d = d.slice(0, g + 1)) : (d = [d[0]]);
          break;
        }
      }
    }
  return d.reduceRight((m, y, S) => {
    let N,
      b = !1,
      w = null,
      T = null;
    u &&
      ((N = h && y.route.id ? h[y.route.id] : void 0),
      (w = y.route.errorElement || Hy),
      x &&
        (g < 0 && S === 0
          ? (Km(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (b = !0),
            (T = null))
          : g === S &&
            ((b = !0), (T = y.route.hydrateFallbackElement || null))));
    let C = i.concat(d.slice(0, S + 1)),
      D = () => {
        let U;
        return (
          N
            ? (U = w)
            : b
            ? (U = T)
            : y.route.Component
            ? (U = z.createElement(y.route.Component, null))
            : y.route.element
            ? (U = y.route.element)
            : (U = m),
          z.createElement(ky, {
            match: y,
            routeContext: { outlet: m, matches: C, isDataRoute: u != null },
            children: U,
          })
        );
      };
    return u && (y.route.ErrorBoundary || y.route.errorElement || S === 0)
      ? z.createElement(By, {
          location: u.location,
          revalidation: u.revalidation,
          component: w,
          error: N,
          children: D(),
          routeContext: { outlet: null, matches: C, isDataRoute: !0 },
          unstable_onError: r,
        })
      : D();
  }, null);
}
function jo(s) {
  return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Gy(s) {
  let i = z.useContext(Ha);
  return Ye(i, jo(s)), i;
}
function Vy(s) {
  let i = z.useContext(Os);
  return Ye(i, jo(s)), i;
}
function Qy(s) {
  let i = z.useContext(Bt);
  return Ye(i, jo(s)), i;
}
function wo(s) {
  let i = Qy(s),
    u = i.matches[i.matches.length - 1];
  return (
    Ye(
      u.route.id,
      `${s} can only be used on routes that contain a unique "id"`
    ),
    u.route.id
  );
}
function Xy() {
  return wo("useRouteId");
}
function Zy() {
  let s = z.useContext(No),
    i = Vy("useRouteError"),
    u = wo("useRouteError");
  return s !== void 0 ? s : i.errors?.[u];
}
function Ky() {
  let { router: s } = Gy("useNavigate"),
    i = wo("useNavigate"),
    u = z.useRef(!1);
  return (
    Qm(() => {
      u.current = !0;
    }),
    z.useCallback(
      async (f, d = {}) => {
        qt(u.current, Vm),
          u.current &&
            (typeof f == "number"
              ? s.navigate(f)
              : await s.navigate(f, { fromRouteId: i, ...d }));
      },
      [s, i]
    )
  );
}
var xm = {};
function Km(s, i, u) {
  !i && !xm[s] && ((xm[s] = !0), qt(!1, u));
}
z.memo($y);
function $y({ routes: s, future: i, state: u, unstable_onError: r }) {
  return Zm(s, void 0, u, r, i);
}
function Jy({
  basename: s = "/",
  children: i = null,
  location: u,
  navigationType: r = "POP",
  navigator: f,
  static: d = !1,
}) {
  Ye(
    !$l(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = s.replace(/^\/*/, "/"),
    x = z.useMemo(
      () => ({ basename: h, navigator: f, static: d, future: {} }),
      [h, f, d]
    );
  typeof u == "string" && (u = Kl(u));
  let {
      pathname: g = "/",
      search: m = "",
      hash: y = "",
      state: S = null,
      key: N = "default",
    } = u,
    b = z.useMemo(() => {
      let w = an(g, h);
      return w == null
        ? null
        : {
            location: { pathname: w, search: m, hash: y, state: S, key: N },
            navigationType: r,
          };
    }, [h, g, m, y, S, N, r]);
  return (
    qt(
      b != null,
      `<Router basename="${h}"> is not able to match the URL "${g}${m}${y}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    b == null
      ? null
      : z.createElement(
          Ht.Provider,
          { value: x },
          z.createElement(Ts.Provider, { children: i, value: b })
        )
  );
}
var vs = "get",
  bs = "application/x-www-form-urlencoded";
function Rs(s) {
  return s != null && typeof s.tagName == "string";
}
function Fy(s) {
  return Rs(s) && s.tagName.toLowerCase() === "button";
}
function Py(s) {
  return Rs(s) && s.tagName.toLowerCase() === "form";
}
function Wy(s) {
  return Rs(s) && s.tagName.toLowerCase() === "input";
}
function Iy(s) {
  return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey);
}
function ev(s, i) {
  return s.button === 0 && (!i || i === "_self") && !Iy(s);
}
var ys = null;
function tv() {
  if (ys === null)
    try {
      new FormData(document.createElement("form"), 0), (ys = !1);
    } catch {
      ys = !0;
    }
  return ys;
}
var nv = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function ho(s) {
  return s != null && !nv.has(s)
    ? (qt(
        !1,
        `"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${bs}"`
      ),
      null)
    : s;
}
function av(s, i) {
  let u, r, f, d, h;
  if (Py(s)) {
    let x = s.getAttribute("action");
    (r = x ? an(x, i) : null),
      (u = s.getAttribute("method") || vs),
      (f = ho(s.getAttribute("enctype")) || bs),
      (d = new FormData(s));
  } else if (Fy(s) || (Wy(s) && (s.type === "submit" || s.type === "image"))) {
    let x = s.form;
    if (x == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = s.getAttribute("formaction") || x.getAttribute("action");
    if (
      ((r = g ? an(g, i) : null),
      (u = s.getAttribute("formmethod") || x.getAttribute("method") || vs),
      (f =
        ho(s.getAttribute("formenctype")) ||
        ho(x.getAttribute("enctype")) ||
        bs),
      (d = new FormData(x, s)),
      !tv())
    ) {
      let { name: m, type: y, value: S } = s;
      if (y === "image") {
        let N = m ? `${m}.` : "";
        d.append(`${N}x`, "0"), d.append(`${N}y`, "0");
      } else m && d.append(m, S);
    }
  } else {
    if (Rs(s))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (u = vs), (r = null), (f = bs), (h = s);
  }
  return (
    d && f === "text/plain" && ((h = d), (d = void 0)),
    { action: r, method: u.toLowerCase(), encType: f, formData: d, body: h }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Eo(s, i) {
  if (s === !1 || s === null || typeof s > "u") throw new Error(i);
}
function lv(s, i, u) {
  let r =
    typeof s == "string"
      ? new URL(
          s,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : s;
  return (
    r.pathname === "/"
      ? (r.pathname = `_root.${u}`)
      : i && an(r.pathname, i) === "/"
      ? (r.pathname = `${i.replace(/\/$/, "")}/_root.${u}`)
      : (r.pathname = `${r.pathname.replace(/\/$/, "")}.${u}`),
    r
  );
}
async function iv(s, i) {
  if (s.id in i) return i[s.id];
  try {
    let u = await import(s.module);
    return (i[s.id] = u), u;
  } catch (u) {
    return (
      console.error(
        `Error loading route module \`${s.module}\`, reloading page...`
      ),
      console.error(u),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function sv(s) {
  return s == null
    ? !1
    : s.href == null
    ? s.rel === "preload" &&
      typeof s.imageSrcSet == "string" &&
      typeof s.imageSizes == "string"
    : typeof s.rel == "string" && typeof s.href == "string";
}
async function rv(s, i, u) {
  let r = await Promise.all(
    s.map(async (f) => {
      let d = i.routes[f.route.id];
      if (d) {
        let h = await iv(d, u);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return fv(
    r
      .flat(1)
      .filter(sv)
      .filter((f) => f.rel === "stylesheet" || f.rel === "preload")
      .map((f) =>
        f.rel === "stylesheet"
          ? { ...f, rel: "prefetch", as: "style" }
          : { ...f, rel: "prefetch" }
      )
  );
}
function ym(s, i, u, r, f, d) {
  let h = (g, m) => (u[m] ? g.route.id !== u[m].route.id : !0),
    x = (g, m) =>
      u[m].pathname !== g.pathname ||
      (u[m].route.path?.endsWith("*") && u[m].params["*"] !== g.params["*"]);
  return d === "assets"
    ? i.filter((g, m) => h(g, m) || x(g, m))
    : d === "data"
    ? i.filter((g, m) => {
        let y = r.routes[g.route.id];
        if (!y || !y.hasLoader) return !1;
        if (h(g, m) || x(g, m)) return !0;
        if (g.route.shouldRevalidate) {
          let S = g.route.shouldRevalidate({
            currentUrl: new URL(f.pathname + f.search + f.hash, window.origin),
            currentParams: u[0]?.params || {},
            nextUrl: new URL(s, window.origin),
            nextParams: g.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof S == "boolean") return S;
        }
        return !0;
      })
    : [];
}
function uv(s, i, { includeHydrateFallback: u } = {}) {
  return ov(
    s
      .map((r) => {
        let f = i.routes[r.route.id];
        if (!f) return [];
        let d = [f.module];
        return (
          f.clientActionModule && (d = d.concat(f.clientActionModule)),
          f.clientLoaderModule && (d = d.concat(f.clientLoaderModule)),
          u &&
            f.hydrateFallbackModule &&
            (d = d.concat(f.hydrateFallbackModule)),
          f.imports && (d = d.concat(f.imports)),
          d
        );
      })
      .flat(1)
  );
}
function ov(s) {
  return [...new Set(s)];
}
function cv(s) {
  let i = {},
    u = Object.keys(s).sort();
  for (let r of u) i[r] = s[r];
  return i;
}
function fv(s, i) {
  let u = new Set();
  return (
    new Set(i),
    s.reduce((r, f) => {
      let d = JSON.stringify(cv(f));
      return u.has(d) || (u.add(d), r.push({ key: d, link: f })), r;
    }, [])
  );
}
function $m() {
  let s = z.useContext(Ha);
  return (
    Eo(
      s,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    s
  );
}
function dv() {
  let s = z.useContext(Os);
  return (
    Eo(
      s,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    s
  );
}
var Co = z.createContext(void 0);
Co.displayName = "FrameworkContext";
function Jm() {
  let s = z.useContext(Co);
  return (
    Eo(s, "You must render this element inside a <HydratedRouter> element"), s
  );
}
function hv(s, i) {
  let u = z.useContext(Co),
    [r, f] = z.useState(!1),
    [d, h] = z.useState(!1),
    {
      onFocus: x,
      onBlur: g,
      onMouseEnter: m,
      onMouseLeave: y,
      onTouchStart: S,
    } = i,
    N = z.useRef(null);
  z.useEffect(() => {
    if ((s === "render" && h(!0), s === "viewport")) {
      let T = (D) => {
          D.forEach((U) => {
            h(U.isIntersecting);
          });
        },
        C = new IntersectionObserver(T, { threshold: 0.5 });
      return (
        N.current && C.observe(N.current),
        () => {
          C.disconnect();
        }
      );
    }
  }, [s]),
    z.useEffect(() => {
      if (r) {
        let T = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(T);
        };
      }
    }, [r]);
  let b = () => {
      f(!0);
    },
    w = () => {
      f(!1), h(!1);
    };
  return u
    ? s !== "intent"
      ? [d, N, {}]
      : [
          d,
          N,
          {
            onFocus: Yl(x, b),
            onBlur: Yl(g, w),
            onMouseEnter: Yl(m, b),
            onMouseLeave: Yl(y, w),
            onTouchStart: Yl(S, b),
          },
        ]
    : [!1, N, {}];
}
function Yl(s, i) {
  return (u) => {
    s && s(u), u.defaultPrevented || i(u);
  };
}
function mv({ page: s, ...i }) {
  let { router: u } = $m(),
    r = z.useMemo(() => Um(u.routes, s, u.basename), [u.routes, s, u.basename]);
  return r ? z.createElement(pv, { page: s, matches: r, ...i }) : null;
}
function gv(s) {
  let { manifest: i, routeModules: u } = Jm(),
    [r, f] = z.useState([]);
  return (
    z.useEffect(() => {
      let d = !1;
      return (
        rv(s, i, u).then((h) => {
          d || f(h);
        }),
        () => {
          d = !0;
        }
      );
    }, [s, i, u]),
    r
  );
}
function pv({ page: s, matches: i, ...u }) {
  let r = $n(),
    { manifest: f, routeModules: d } = Jm(),
    { basename: h } = $m(),
    { loaderData: x, matches: g } = dv(),
    m = z.useMemo(() => ym(s, i, g, f, r, "data"), [s, i, g, f, r]),
    y = z.useMemo(() => ym(s, i, g, f, r, "assets"), [s, i, g, f, r]),
    S = z.useMemo(() => {
      if (s === r.pathname + r.search + r.hash) return [];
      let w = new Set(),
        T = !1;
      if (
        (i.forEach((D) => {
          let U = f.routes[D.route.id];
          !U ||
            !U.hasLoader ||
            ((!m.some((Q) => Q.route.id === D.route.id) &&
              D.route.id in x &&
              d[D.route.id]?.shouldRevalidate) ||
            U.hasClientLoader
              ? (T = !0)
              : w.add(D.route.id));
        }),
        w.size === 0)
      )
        return [];
      let C = lv(s, h, "data");
      return (
        T &&
          w.size > 0 &&
          C.searchParams.set(
            "_routes",
            i
              .filter((D) => w.has(D.route.id))
              .map((D) => D.route.id)
              .join(",")
          ),
        [C.pathname + C.search]
      );
    }, [h, x, r, f, m, i, s, d]),
    N = z.useMemo(() => uv(y, f), [y, f]),
    b = gv(y);
  return z.createElement(
    z.Fragment,
    null,
    S.map((w) =>
      z.createElement("link", {
        key: w,
        rel: "prefetch",
        as: "fetch",
        href: w,
        ...u,
      })
    ),
    N.map((w) =>
      z.createElement("link", { key: w, rel: "modulepreload", href: w, ...u })
    ),
    b.map(({ key: w, link: T }) =>
      z.createElement("link", { key: w, nonce: u.nonce, ...T })
    )
  );
}
function xv(...s) {
  return (i) => {
    s.forEach((u) => {
      typeof u == "function" ? u(i) : u != null && (u.current = i);
    });
  };
}
var Fm =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Fm && (window.__reactRouterVersion = "7.9.3");
} catch {}
function yv({ basename: s, children: i, window: u }) {
  let r = z.useRef();
  r.current == null && (r.current = sy({ window: u, v5Compat: !0 }));
  let f = r.current,
    [d, h] = z.useState({ action: f.action, location: f.location }),
    x = z.useCallback(
      (g) => {
        z.startTransition(() => h(g));
      },
      [h]
    );
  return (
    z.useLayoutEffect(() => f.listen(x), [f, x]),
    z.createElement(Jy, {
      basename: s,
      children: i,
      location: d.location,
      navigationType: d.action,
      navigator: f,
    })
  );
}
var Pm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ze = z.forwardRef(function (
    {
      onClick: i,
      discover: u = "render",
      prefetch: r = "none",
      relative: f,
      reloadDocument: d,
      replace: h,
      state: x,
      target: g,
      to: m,
      preventScrollReset: y,
      viewTransition: S,
      ...N
    },
    b
  ) {
    let { basename: w } = z.useContext(Ht),
      T = typeof m == "string" && Pm.test(m),
      C,
      D = !1;
    if (typeof m == "string" && T && ((C = m), Fm))
      try {
        let xe = new URL(window.location.href),
          V = m.startsWith("//") ? new URL(xe.protocol + m) : new URL(m),
          Z = an(V.pathname, w);
        V.origin === xe.origin && Z != null
          ? (m = Z + V.search + V.hash)
          : (D = !0);
      } catch {
        qt(
          !1,
          `<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let U = Ly(m, { relative: f }),
      [Q, P, G] = hv(r, N),
      I = Nv(m, {
        replace: h,
        state: x,
        target: g,
        preventScrollReset: y,
        relative: f,
        viewTransition: S,
      });
    function oe(xe) {
      i && i(xe), xe.defaultPrevented || I(xe);
    }
    let Se = z.createElement("a", {
      ...N,
      ...G,
      href: C || U,
      onClick: D || d ? i : oe,
      ref: xv(b, P),
      target: g,
      "data-discover": !T && u === "render" ? "true" : void 0,
    });
    return Q && !T
      ? z.createElement(z.Fragment, null, Se, z.createElement(mv, { page: U }))
      : Se;
  });
Ze.displayName = "Link";
var vv = z.forwardRef(function (
  {
    "aria-current": i = "page",
    caseSensitive: u = !1,
    className: r = "",
    end: f = !1,
    style: d,
    to: h,
    viewTransition: x,
    children: g,
    ...m
  },
  y
) {
  let S = Jl(h, { relative: m.relative }),
    N = $n(),
    b = z.useContext(Os),
    { navigator: w, basename: T } = z.useContext(Ht),
    C = b != null && _v(S) && x === !0,
    D = w.encodeLocation ? w.encodeLocation(S).pathname : S.pathname,
    U = N.pathname,
    Q =
      b && b.navigation && b.navigation.location
        ? b.navigation.location.pathname
        : null;
  u ||
    ((U = U.toLowerCase()),
    (Q = Q ? Q.toLowerCase() : null),
    (D = D.toLowerCase())),
    Q && T && (Q = an(Q, T) || Q);
  const P = D !== "/" && D.endsWith("/") ? D.length - 1 : D.length;
  let G = U === D || (!f && U.startsWith(D) && U.charAt(P) === "/"),
    I =
      Q != null &&
      (Q === D || (!f && Q.startsWith(D) && Q.charAt(D.length) === "/")),
    oe = { isActive: G, isPending: I, isTransitioning: C },
    Se = G ? i : void 0,
    xe;
  typeof r == "function"
    ? (xe = r(oe))
    : (xe = [
        r,
        G ? "active" : null,
        I ? "pending" : null,
        C ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let V = typeof d == "function" ? d(oe) : d;
  return z.createElement(
    Ze,
    {
      ...m,
      "aria-current": Se,
      className: xe,
      ref: y,
      style: V,
      to: h,
      viewTransition: x,
    },
    typeof g == "function" ? g(oe) : g
  );
});
vv.displayName = "NavLink";
var bv = z.forwardRef(
  (
    {
      discover: s = "render",
      fetcherKey: i,
      navigate: u,
      reloadDocument: r,
      replace: f,
      state: d,
      method: h = vs,
      action: x,
      onSubmit: g,
      relative: m,
      preventScrollReset: y,
      viewTransition: S,
      ...N
    },
    b
  ) => {
    let w = Ev(),
      T = Cv(x, { relative: m }),
      C = h.toLowerCase() === "get" ? "get" : "post",
      D = typeof x == "string" && Pm.test(x),
      U = (Q) => {
        if ((g && g(Q), Q.defaultPrevented)) return;
        Q.preventDefault();
        let P = Q.nativeEvent.submitter,
          G = P?.getAttribute("formmethod") || h;
        w(P || Q.currentTarget, {
          fetcherKey: i,
          method: G,
          navigate: u,
          replace: f,
          state: d,
          relative: m,
          preventScrollReset: y,
          viewTransition: S,
        });
      };
    return z.createElement("form", {
      ref: b,
      method: C,
      action: T,
      onSubmit: r ? g : U,
      ...N,
      "data-discover": !D && s === "render" ? "true" : void 0,
    });
  }
);
bv.displayName = "Form";
function Sv(s) {
  return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Wm(s) {
  let i = z.useContext(Ha);
  return Ye(i, Sv(s)), i;
}
function Nv(
  s,
  {
    target: i,
    replace: u,
    state: r,
    preventScrollReset: f,
    relative: d,
    viewTransition: h,
  } = {}
) {
  let x = Xm(),
    g = $n(),
    m = Jl(s, { relative: d });
  return z.useCallback(
    (y) => {
      if (ev(y, i)) {
        y.preventDefault();
        let S = u !== void 0 ? u : Zl(g) === Zl(m);
        x(s, {
          replace: S,
          state: r,
          preventScrollReset: f,
          relative: d,
          viewTransition: h,
        });
      }
    },
    [g, x, m, u, r, i, s, f, d, h]
  );
}
var jv = 0,
  wv = () => `__${String(++jv)}__`;
function Ev() {
  let { router: s } = Wm("useSubmit"),
    { basename: i } = z.useContext(Ht),
    u = Xy();
  return z.useCallback(
    async (r, f = {}) => {
      let { action: d, method: h, encType: x, formData: g, body: m } = av(r, i);
      if (f.navigate === !1) {
        let y = f.fetcherKey || wv();
        await s.fetch(y, u, f.action || d, {
          preventScrollReset: f.preventScrollReset,
          formData: g,
          body: m,
          formMethod: f.method || h,
          formEncType: f.encType || x,
          flushSync: f.flushSync,
        });
      } else
        await s.navigate(f.action || d, {
          preventScrollReset: f.preventScrollReset,
          formData: g,
          body: m,
          formMethod: f.method || h,
          formEncType: f.encType || x,
          replace: f.replace,
          state: f.state,
          fromRouteId: u,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition,
        });
    },
    [s, i, u]
  );
}
function Cv(s, { relative: i } = {}) {
  let { basename: u } = z.useContext(Ht),
    r = z.useContext(Bt);
  Ye(r, "useFormAction must be used inside a RouteContext");
  let [f] = r.matches.slice(-1),
    d = { ...Jl(s || ".", { relative: i }) },
    h = $n();
  if (s == null) {
    d.search = h.search;
    let x = new URLSearchParams(d.search),
      g = x.getAll("index");
    if (g.some((y) => y === "")) {
      x.delete("index"),
        g.filter((S) => S).forEach((S) => x.append("index", S));
      let y = x.toString();
      d.search = y ? `?${y}` : "";
    }
  }
  return (
    (!s || s === ".") &&
      f.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    u !== "/" && (d.pathname = d.pathname === "/" ? u : nn([u, d.pathname])),
    Zl(d)
  );
}
function _v(s, { relative: i } = {}) {
  let u = z.useContext(Gm);
  Ye(
    u != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = Wm("useViewTransitionState"),
    f = Jl(s, { relative: i });
  if (!u.isTransitioning) return !1;
  let d = an(u.currentLocation.pathname, r) || u.currentLocation.pathname,
    h = an(u.nextLocation.pathname, r) || u.nextLocation.pathname;
  return Es(f.pathname, h) != null || Es(f.pathname, d) != null;
}
function Av() {
  return c.jsxs("div", {
    className:
      "flex flex-col items-center justify-center h-screen text-center px-4",
    children: [
      c.jsx("h1", {
        className: "text-5xl md:text-5xl font-semibold text-gray-100",
        children: "404",
      }),
      c.jsx("h1", {
        className: "text-2xl md:text-3xl font-semibold mt-6",
        children: "This page has not been generated",
      }),
      c.jsx("p", {
        className: "mt-4 text-xl md:text-2xl text-gray-500",
        children: "Tell me what you would like on this page",
      }),
    ],
  });
}
function Et({
  children: s,
  variant: i = "primary",
  size: u = "md",
  className: r = "",
  onClick: f,
}) {
  const d =
      "inline-flex items-center justify-center font-medium transition-colors whitespace-nowrap cursor-pointer",
    h = {
      primary: "bg-rose-500 text-white hover:bg-rose-600",
      secondary: "bg-rose-50 text-rose-600 hover:bg-rose-100",
      outline:
        "border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white",
    },
    x = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-lg",
      lg: "px-8 py-4 text-lg rounded-xl",
    };
  return c.jsx("button", {
    className: `${d} ${h[i]} ${x[u]} ${r}`,
    onClick: f,
    children: s,
  });
}
function Fl() {
  const [s, i] = z.useState([]),
    [u, r] = z.useState(!1);
  z.useEffect(() => {
    const y = localStorage.getItem("cart");
    y && i(JSON.parse(y));
  }, []),
    z.useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(s));
    }, [s]);
  const f = (y) => {
      i((S) =>
        S.find((b) => b.id === y.id)
          ? S.map((b) =>
              b.id === y.id ? { ...b, quantity: b.quantity + 1 } : b
            )
          : [...S, { ...y, quantity: 1 }]
      ),
        r(!0);
    },
    d = (y) => {
      i((S) => S.filter((N) => N.id !== y));
    };
  return {
    cartItems: s,
    isCartOpen: u,
    setIsCartOpen: r,
    addToCart: f,
    removeFromCart: d,
    updateQuantity: (y, S) => {
      if (S <= 0) {
        d(y);
        return;
      }
      i((N) => N.map((b) => (b.id === y ? { ...b, quantity: S } : b)));
    },
    clearCart: () => {
      i([]);
    },
    getTotalItems: () => s.reduce((y, S) => y + S.quantity, 0),
    getTotalPrice: () => s.reduce((y, S) => y + S.price * S.quantity, 0),
  };
}
function Ov({ isOpen: s, onClose: i }) {
  const {
    cartItems: u,
    removeFromCart: r,
    updateQuantity: f,
    getTotalPrice: d,
    clearCart: h,
  } = Fl();
  if (!s) return null;
  const x = () => {
    alert(
      "Checkout functionality will be implemented with payment integration!"
    );
  };
  return c.jsxs(c.Fragment, {
    children: [
      c.jsx("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 z-40",
        onClick: i,
      }),
      c.jsx("div", {
        className:
          "fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300",
        children: c.jsxs("div", {
          className: "flex flex-col h-full",
          children: [
            c.jsxs("div", {
              className:
                "flex items-center justify-between p-6 border-b border-gray-200",
              children: [
                c.jsx("h2", {
                  className: "text-xl font-bold text-gray-900",
                  children: "Shopping Cart",
                }),
                c.jsx("button", {
                  onClick: i,
                  className:
                    "text-gray-400 hover:text-gray-600 transition-colors",
                  children: c.jsx("i", { className: "ri-close-line text-2xl" }),
                }),
              ],
            }),
            c.jsx("div", {
              className: "flex-1 overflow-y-auto p-6",
              children:
                u.length === 0
                  ? c.jsxs("div", {
                      className: "text-center py-12",
                      children: [
                        c.jsx("i", {
                          className:
                            "ri-shopping-cart-line text-6xl text-gray-300 mb-4",
                        }),
                        c.jsx("p", {
                          className: "text-gray-500 text-lg",
                          children: "Your cart is empty",
                        }),
                        c.jsx("p", {
                          className: "text-gray-400 text-sm mt-2",
                          children: "Add some products to get started",
                        }),
                      ],
                    })
                  : c.jsx("div", {
                      className: "space-y-4",
                      children: u.map((g) =>
                        c.jsxs(
                          "div",
                          {
                            className:
                              "flex items-center space-x-4 bg-gray-50 rounded-xl p-4",
                            children: [
                              c.jsx("img", {
                                src: g.image,
                                alt: g.name,
                                className: "w-16 h-16 object-cover rounded-lg",
                              }),
                              c.jsxs("div", {
                                className: "flex-1",
                                children: [
                                  c.jsx("h3", {
                                    className:
                                      "font-medium text-gray-900 text-sm line-clamp-2",
                                    children: g.name,
                                  }),
                                  c.jsxs("p", {
                                    className: "text-rose-600 font-bold",
                                    children: ["$", g.price],
                                  }),
                                ],
                              }),
                              c.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                  c.jsx("button", {
                                    onClick: () => f(g.id, g.quantity - 1),
                                    className:
                                      "w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors",
                                    children: c.jsx("i", {
                                      className: "ri-subtract-line text-sm",
                                    }),
                                  }),
                                  c.jsx("span", {
                                    className: "w-8 text-center font-medium",
                                    children: g.quantity,
                                  }),
                                  c.jsx("button", {
                                    onClick: () => f(g.id, g.quantity + 1),
                                    className:
                                      "w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors",
                                    children: c.jsx("i", {
                                      className: "ri-add-line text-sm",
                                    }),
                                  }),
                                ],
                              }),
                              c.jsx("button", {
                                onClick: () => r(g.id),
                                className:
                                  "text-gray-400 hover:text-red-500 transition-colors",
                                children: c.jsx("i", {
                                  className: "ri-delete-bin-line text-lg",
                                }),
                              }),
                            ],
                          },
                          g.id
                        )
                      ),
                    }),
            }),
            u.length > 0 &&
              c.jsxs("div", {
                className: "border-t border-gray-200 p-6",
                children: [
                  c.jsxs("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                      c.jsx("span", {
                        className: "text-lg font-semibold text-gray-900",
                        children: "Total:",
                      }),
                      c.jsxs("span", {
                        className: "text-2xl font-bold text-rose-600",
                        children: ["$", d().toFixed(2)],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      c.jsx(Et, {
                        onClick: x,
                        className: "w-full",
                        size: "lg",
                        children: "Checkout",
                      }),
                      c.jsx("button", {
                        onClick: h,
                        className:
                          "w-full text-gray-500 hover:text-gray-700 transition-colors text-sm",
                        children: "Clear Cart",
                      }),
                    ],
                  }),
                ],
              }),
          ],
        }),
      }),
    ],
  });
}
function Pl() {
  const [s, i] = z.useState(!1),
    [u, r] = z.useState(!0),
    [f, d] = z.useState(0),
    { getTotalItems: h, isCartOpen: x, setIsCartOpen: g } = Fl();
  z.useEffect(() => {
    const N = () => {
      const b = window.scrollY;
      b < f || b < 10 ? r(!0) : (r(!1), i(!1)), d(b);
    };
    return (
      window.addEventListener("scroll", N),
      () => window.removeEventListener("scroll", N)
    );
  }, [f]);
  const m = () => {
      i(!s);
    },
    y = () => {
      g(!0);
    },
    S = () => {
      g(!1);
    };
  return c.jsxs(c.Fragment, {
    children: [
      c.jsx("header", {
        className: `bg-white shadow-sm sticky top-0 z-30 transition-transform duration-300 ${
          u ? "translate-y-0" : "-translate-y-full"
        }`,
        children: c.jsxs("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: [
            c.jsxs("div", {
              className: "flex justify-between items-center h-16",
              children: [
                c.jsx(Ze, {
                  to: "/",
                  className: "flex items-center",
                  children: c.jsx("span", {
                    className: "text-2xl font-bold text-rose-600",
                    style: { fontFamily: '"Pacifico", serif' },
                    children: "logo",
                  }),
                }),
                c.jsxs("nav", {
                  className: "hidden md:flex items-center space-x-8",
                  children: [
                    c.jsx(Ze, {
                      to: "/",
                      className:
                        "text-gray-700 hover:text-rose-600 transition-colors",
                      children: "Home",
                    }),
                    c.jsx(Ze, {
                      to: "/products",
                      className:
                        "text-gray-700 hover:text-rose-600 transition-colors",
                      children: "Products",
                    }),
                    c.jsx("a", {
                      href: "#about",
                      className:
                        "text-gray-700 hover:text-rose-600 transition-colors",
                      children: "About",
                    }),
                    c.jsx("a", {
                      href: "#contact",
                      className:
                        "text-gray-700 hover:text-rose-600 transition-colors",
                      children: "Contact",
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "flex items-center space-x-4",
                  children: [
                    c.jsx("button", {
                      className:
                        "text-gray-700 hover:text-rose-600 transition-colors",
                      children: c.jsx("i", {
                        className: "ri-search-line text-xl",
                      }),
                    }),
                    c.jsxs("button", {
                      onClick: y,
                      className:
                        "relative text-gray-700 hover:text-rose-600 transition-colors",
                      children: [
                        c.jsx("i", {
                          className: "ri-shopping-cart-line text-xl",
                        }),
                        h() > 0 &&
                          c.jsx("span", {
                            className:
                              "absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
                            children: h(),
                          }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "hidden md:flex items-center space-x-2",
                      children: [
                        c.jsx(Ze, {
                          to: "/signin",
                          children: c.jsx(Et, {
                            variant: "outline",
                            size: "sm",
                            children: "Sign In",
                          }),
                        }),
                        c.jsx(Ze, {
                          to: "/signup",
                          children: c.jsx(Et, {
                            size: "sm",
                            children: "Sign Up",
                          }),
                        }),
                      ],
                    }),
                    c.jsx("button", {
                      onClick: m,
                      className:
                        "md:hidden text-gray-700 hover:text-rose-600 transition-colors",
                      children: c.jsx("i", {
                        className: `ri-${s ? "close" : "menu"}-line text-xl`,
                      }),
                    }),
                  ],
                }),
              ],
            }),
            s &&
              c.jsx("div", {
                className: "md:hidden border-t border-gray-200 py-4",
                children: c.jsxs("nav", {
                  className: "flex flex-col space-y-4",
                  children: [
                    c.jsx(Ze, {
                      to: "/",
                      className:
                        "text-gray-700 hover:text-rose-600 transition-colors",
                      onClick: () => i(!1),
                      children: "Home",
                    }),
                    c.jsx(Ze, {
                      to: "/products",
                      className:
                        "text-gray-700 hover:text-rose-600 transition-colors",
                      onClick: () => i(!1),
                      children: "Products",
                    }),
                    c.jsx("a", {
                      href: "#about",
                      className:
                        "text-gray-700 hover:text-rose-600 transition-colors",
                      onClick: () => i(!1),
                      children: "About",
                    }),
                    c.jsx("a", {
                      href: "#contact",
                      className:
                        "text-gray-700 hover:text-rose-600 transition-colors",
                      onClick: () => i(!1),
                      children: "Contact",
                    }),
                    c.jsxs("div", {
                      className: "flex space-x-2 pt-4 border-t border-gray-200",
                      children: [
                        c.jsx(Ze, {
                          to: "/signin",
                          onClick: () => i(!1),
                          children: c.jsx(Et, {
                            variant: "outline",
                            size: "sm",
                            children: "Sign In",
                          }),
                        }),
                        c.jsx(Ze, {
                          to: "/signup",
                          onClick: () => i(!1),
                          children: c.jsx(Et, {
                            size: "sm",
                            children: "Sign Up",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        }),
      }),
      c.jsx(Ov, { isOpen: x, onClose: S }),
    ],
  });
}
function Wl() {
  const s = [
      { icon: "ri-facebook-fill", href: "#" },
      { icon: "ri-instagram-line", href: "#" },
      { icon: "ri-twitter-line", href: "#" },
      { icon: "ri-youtube-line", href: "#" },
    ],
    i = [
      { name: "Home", href: "#home" },
      { name: "Skincare", href: "#skincare" },
      { name: "Haircare", href: "#haircare" },
      { name: "Body Care", href: "#bodycare" },
      { name: "About Us", href: "#about" },
      { name: "Website Builder", href: "https://readdy.ai/?origin=logo" },
    ],
    u = [
      { name: "Contact Us", href: "#contact" },
      { name: "Shipping Info", href: "#shipping" },
      { name: "Returns", href: "#returns" },
      { name: "FAQ", href: "#faq" },
      { name: "Support", href: "#support" },
    ];
  return c.jsx("footer", {
    className: "bg-gray-50 pt-16 pb-8",
    children: c.jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [
        c.jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-4 gap-8 mb-8",
          children: [
            c.jsxs("div", {
              children: [
                c.jsx("h3", {
                  className: "text-2xl font-bold text-rose-600 mb-4",
                  children: "BeautyGlow",
                }),
                c.jsx("p", {
                  className: "text-gray-600 mb-4",
                  children:
                    "Your trusted partner for premium skincare, haircare, and body care products. Discover the beauty within you.",
                }),
                c.jsx("div", {
                  className: "flex space-x-4",
                  children: s.map((r, f) =>
                    c.jsx(
                      "div",
                      {
                        className:
                          "w-10 h-10 flex items-center justify-center bg-rose-100 text-rose-600 rounded-full cursor-pointer hover:bg-rose-500 hover:text-white transition-colors",
                        children: c.jsx("i", { className: r.icon }),
                      },
                      f
                    )
                  ),
                }),
              ],
            }),
            c.jsxs("div", {
              children: [
                c.jsx("h4", {
                  className: "font-semibold text-gray-900 mb-4",
                  children: "Quick Links",
                }),
                c.jsx("ul", {
                  className: "space-y-2",
                  children: i.map((r) =>
                    c.jsx(
                      "li",
                      {
                        children: c.jsx("a", {
                          href: r.href,
                          className:
                            "text-gray-600 hover:text-rose-600 transition-colors cursor-pointer",
                          children: r.name,
                        }),
                      },
                      r.name
                    )
                  ),
                }),
              ],
            }),
            c.jsxs("div", {
              children: [
                c.jsx("h4", {
                  className: "font-semibold text-gray-900 mb-4",
                  children: "Customer Care",
                }),
                c.jsx("ul", {
                  className: "space-y-2",
                  children: u.map((r) =>
                    c.jsx(
                      "li",
                      {
                        children: c.jsx("a", {
                          href: r.href,
                          className:
                            "text-gray-600 hover:text-rose-600 transition-colors cursor-pointer",
                          children: r.name,
                        }),
                      },
                      r.name
                    )
                  ),
                }),
              ],
            }),
            c.jsxs("div", {
              children: [
                c.jsx("h4", {
                  className: "font-semibold text-gray-900 mb-4",
                  children: "Newsletter",
                }),
                c.jsx("p", {
                  className: "text-gray-600 mb-4",
                  children:
                    "Subscribe to get updates on new products and exclusive offers.",
                }),
                c.jsxs("div", {
                  className: "flex",
                  children: [
                    c.jsx("input", {
                      type: "email",
                      placeholder: "Your email",
                      className:
                        "flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                    }),
                    c.jsx("button", {
                      className:
                        "bg-rose-500 text-white px-6 py-2 rounded-r-lg hover:bg-rose-600 transition-colors whitespace-nowrap cursor-pointer",
                      children: "Subscribe",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        c.jsx("div", {
          className: "border-t pt-8",
          children: c.jsxs("div", {
            className: "flex flex-col md:flex-row justify-between items-center",
            children: [
              c.jsx("p", {
                className: "text-gray-600 text-sm",
                children: "© 2024 BeautyGlow. All rights reserved.",
              }),
              c.jsxs("div", {
                className: "flex space-x-6 mt-4 md:mt-0",
                children: [
                  c.jsx("a", {
                    href: "#privacy",
                    className:
                      "text-gray-600 hover:text-rose-600 text-sm transition-colors cursor-pointer",
                    children: "Privacy Policy",
                  }),
                  c.jsx("a", {
                    href: "#terms",
                    className:
                      "text-gray-600 hover:text-rose-600 text-sm transition-colors cursor-pointer",
                    children: "Terms of Service",
                  }),
                  c.jsx("a", {
                    href: "#cookies",
                    className:
                      "text-gray-600 hover:text-rose-600 text-sm transition-colors cursor-pointer",
                    children: "Cookie Policy",
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function Tv() {
  return c.jsxs("section", {
    id: "home",
    className: "relative min-h-screen flex items-center",
    style: {
      backgroundImage:
        "url('https://readdy.link/preview/c24e5962-a606-4609-8156-b303e639ebfb/2364925/static/media/hero-bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    children: [
      c.jsx("div", {
        className:
          "absolute inset-0 bg-gradient-to-r from-white/90 to-transparent",
      }),
      c.jsx("div", {
        className:
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10",
        children: c.jsx("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
          children: c.jsxs("div", {
            className: "text-left",
            children: [
              c.jsxs("h1", {
                className:
                  "text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight",
                children: [
                  "Discover Your",
                  c.jsx("span", {
                    className: "text-rose-500",
                    children: " Natural Beauty",
                  }),
                ],
              }),
              c.jsx("p", {
                className: "text-xl text-gray-700 mb-8 leading-relaxed",
                children:
                  "Premium skincare, haircare, and body care products designed to enhance your natural radiance. Experience the transformation with our scientifically-proven formulas.",
              }),
              c.jsxs("div", {
                className: "flex flex-col sm:flex-row gap-4",
                children: [
                  c.jsx(Et, { size: "lg", children: "Shop Collection" }),
                  c.jsx(Et, {
                    variant: "outline",
                    size: "lg",
                    children: "Learn More",
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "flex items-center space-x-8 mt-8",
                children: [
                  c.jsxs("div", {
                    className: "text-center",
                    children: [
                      c.jsx("div", {
                        className: "text-3xl font-bold text-gray-900",
                        children: "50K+",
                      }),
                      c.jsx("div", {
                        className: "text-gray-600",
                        children: "Happy Customers",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "text-center",
                    children: [
                      c.jsx("div", {
                        className: "text-3xl font-bold text-gray-900",
                        children: "4.9★",
                      }),
                      c.jsx("div", {
                        className: "text-gray-600",
                        children: "Average Rating",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "text-center",
                    children: [
                      c.jsx("div", {
                        className: "text-3xl font-bold text-gray-900",
                        children: "290+",
                      }),
                      c.jsx("div", {
                        className: "text-gray-600",
                        children: "Premium Products",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
const tn = [
    {
      id: "1",
      name: "Vitamin C Brightening Serum",
      category: "Skincare",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4,
      reviewCount: 1247,
      image:
        "https://readdy.ai/api/search-image?query=luxury%20vitamin%20C%20serum%20bottle%20with%20elegant%20dropper%2C%20premium%20skincare%20product%20with%20bright%20orange%20and%20white%20packaging%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20soft%20natural%20lighting&width=400&height=400&seq=5&orientation=squarish",
    },
    {
      id: "2",
      name: "Nourishing Hair Growth Oil",
      category: "Haircare",
      price: 64.99,
      originalPrice: 84.99,
      rating: 4,
      reviewCount: 892,
      image:
        "https://readdy.ai/api/search-image?query=premium%20hair%20growth%20oil%20bottle%20with%20elegant%20amber%20glass%20and%20rose%20gold%20cap%2C%20natural%20botanical%20ingredients%20visible%2C%20clean%20white%20background%2C%20professional%20product%20photography%2C%20soft%20lighting&width=400&height=400&seq=6&orientation=squarish",
    },
    {
      id: "3",
      name: "Anti-Aging Retinol Cream",
      category: "Skincare",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4,
      reviewCount: 2156,
      image:
        "https://readdy.ai/api/search-image?query=luxury%20anti-aging%20retinol%20cream%20jar%20with%20elegant%20white%20and%20rose%20gold%20packaging%2C%20premium%20skincare%20product%20with%20sophisticated%20design%2C%20clean%20white%20background%2C%20professional%20product%20photography&width=400&height=400&seq=7&orientation=squarish",
    },
    {
      id: "4",
      name: "Firming Body Cream",
      category: "Body Care",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4,
      reviewCount: 634,
      image:
        "https://readdy.ai/api/search-image?query=premium%20firming%20body%20cream%20tube%20with%20elegant%20white%20and%20rose%20gold%20packaging%2C%20luxury%20body%20care%20product%20with%20botanical%20elements%2C%20clean%20white%20background%2C%20professional%20product%20photography&width=400&height=400&seq=8&orientation=squarish",
    },
    {
      id: "5",
      name: "Hydrating Face Mask",
      category: "Skincare",
      price: 45.99,
      originalPrice: 59.99,
      rating: 4,
      reviewCount: 1089,
      image:
        "https://readdy.ai/api/search-image?query=luxury%20hydrating%20face%20mask%20jar%20with%20elegant%20white%20and%20rose%20gold%20packaging%2C%20premium%20skincare%20product%20with%20natural%20ingredients%2C%20clean%20white%20background%2C%20professional%20product%20photography&width=400&height=400&seq=9&orientation=squarish",
    },
    {
      id: "6",
      name: "Sulfate-Free Repair Shampoo",
      category: "Haircare",
      price: 54.99,
      originalPrice: 69.99,
      rating: 4,
      reviewCount: 743,
      image:
        "https://readdy.ai/api/search-image?query=premium%20sulfate-free%20shampoo%20bottle%20with%20elegant%20white%20and%20rose%20gold%20packaging%2C%20luxury%20haircare%20product%20with%20natural%20botanical%20elements%2C%20clean%20white%20background%2C%20professional%20product%20photography&width=400&height=400&seq=10&orientation=squarish",
    },
  ],
  Rv = [
    {
      id: "skincare",
      name: "Skincare",
      productCount: "150+ Products",
      description: "Transform your skin with our premium skincare collection",
      image:
        "https://readdy.ai/api/search-image?query=elegant%20skincare%20products%20collection%20with%20serums%2C%20creams%20and%20treatments%20arranged%20on%20clean%20white%20marble%20surface%2C%20premium%20beauty%20products%20with%20rose%20gold%20accents%2C%20soft%20natural%20lighting%2C%20minimalist%20aesthetic&width=400&height=300&seq=11&orientation=landscape",
    },
    {
      id: "haircare",
      name: "Haircare",
      productCount: "80+ Products",
      description:
        "Nourish and strengthen your hair with professional treatments",
      image:
        "https://readdy.ai/api/search-image?query=luxury%20haircare%20products%20collection%20with%20shampoos%2C%20oils%20and%20treatments%20arranged%20elegantly%20on%20white%20marble%20surface%2C%20premium%20beauty%20products%20with%20natural%20botanical%20elements%2C%20soft%20lighting&width=400&height=300&seq=12&orientation=landscape",
    },
    {
      id: "bodycare",
      name: "Body Care",
      productCount: "60+ Products",
      description: "Sculpt and pamper your body with our effective formulas",
      image:
        "https://readdy.ai/api/search-image?query=premium%20body%20care%20products%20collection%20with%20creams%2C%20lotions%20and%20treatments%20arranged%20on%20clean%20white%20marble%20surface%2C%20luxury%20beauty%20products%20with%20rose%20gold%20accents%2C%20professional%20photography&width=400&height=300&seq=13&orientation=landscape",
    },
  ];
function Mv() {
  return c.jsx("section", {
    className: "py-20 bg-gray-50",
    children: c.jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [
        c.jsxs("div", {
          className: "text-center mb-16",
          children: [
            c.jsx("h2", {
              className: "text-4xl font-bold text-gray-900 mb-4",
              children: "Shop by Category",
            }),
            c.jsx("p", {
              className: "text-xl text-gray-600 max-w-2xl mx-auto",
              children:
                "Explore our carefully curated collections designed to address your unique beauty needs",
            }),
          ],
        }),
        c.jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8",
          children: Rv.map((s) =>
            c.jsxs(
              "div",
              {
                className:
                  "bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer",
                children: [
                  c.jsxs("div", {
                    className: "relative",
                    children: [
                      c.jsx("img", {
                        alt: s.name,
                        className: "w-full h-64 object-cover object-top",
                        src: s.image,
                      }),
                      c.jsx("div", {
                        className:
                          "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent",
                      }),
                      c.jsxs("div", {
                        className: "absolute bottom-4 left-6 text-white",
                        children: [
                          c.jsx("div", {
                            className: "text-sm font-medium mb-1",
                            children: s.productCount,
                          }),
                          c.jsx("h3", {
                            className: "text-2xl font-bold",
                            children: s.name,
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "p-6",
                    children: [
                      c.jsx("p", {
                        className: "text-gray-600 mb-4",
                        children: s.description,
                      }),
                      c.jsxs(Et, {
                        variant: "outline",
                        className: "w-full",
                        children: ["Explore ", s.name],
                      }),
                    ],
                  }),
                ],
              },
              s.id
            )
          ),
        }),
      ],
    }),
  });
}
function _o({
  id: s,
  name: i,
  price: u,
  originalPrice: r,
  image: f,
  rating: d,
  reviews: h,
  badge: x,
  onAddToCart: g,
  onToggleFavorite: m,
  onShowReviews: y,
}) {
  const [S, N] = z.useState(!1),
    b = () => {
      N(!S), m(s);
    },
    w = () => {
      g(s);
    },
    T = () => {
      y && y();
    };
  return c.jsxs("div", {
    className:
      "bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group",
    children: [
      c.jsxs("div", {
        className: "relative",
        children: [
          c.jsx(Ze, {
            to: `/product/${s}`,
            children: c.jsx("img", {
              src: f,
              alt: i,
              className:
                "w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300",
            }),
          }),
          x &&
            c.jsx("span", {
              className:
                "absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium",
              children: x,
            }),
          c.jsx("button", {
            onClick: b,
            className:
              "absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200",
            children: c.jsx("i", {
              className: `${
                S
                  ? "ri-heart-fill text-rose-600"
                  : "ri-heart-line text-gray-400"
              } text-lg`,
            }),
          }),
        ],
      }),
      c.jsxs("div", {
        className: "p-6",
        children: [
          c.jsx(Ze, {
            to: `/product/${s}`,
            children: c.jsx("h3", {
              className:
                "text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-rose-600 transition-colors",
              children: i,
            }),
          }),
          c.jsxs("div", {
            className:
              "flex items-center mb-3 cursor-pointer hover:opacity-80 transition-opacity",
            onClick: T,
            children: [
              c.jsx("div", {
                className: "flex text-yellow-400 mr-2",
                children: [...Array(5)].map((C, D) =>
                  c.jsx(
                    "i",
                    {
                      className: `${
                        D < Math.floor(d) ? "ri-star-fill" : "ri-star-line"
                      } text-sm`,
                    },
                    D
                  )
                ),
              }),
              c.jsxs("span", {
                className: "text-gray-600 text-sm",
                children: ["(", h, ")"],
              }),
            ],
          }),
          c.jsx("div", {
            className: "flex items-center justify-between mb-4",
            children: c.jsxs("div", {
              className: "flex items-center space-x-2",
              children: [
                c.jsxs("span", {
                  className: "text-2xl font-bold text-gray-900",
                  children: ["$", u],
                }),
                r &&
                  c.jsxs("span", {
                    className: "text-lg text-gray-500 line-through",
                    children: ["$", r],
                  }),
              ],
            }),
          }),
          c.jsx("button", {
            onClick: w,
            className:
              "w-full bg-rose-600 text-white py-3 px-6 rounded-xl hover:bg-rose-700 transition-colors duration-200 font-medium whitespace-nowrap",
            children: "Add to Cart",
          }),
        ],
      }),
    ],
  });
}
function Lv() {
  const [s, i] = z.useState(null),
    [u, r] = z.useState(!1),
    { addToCart: f } = Fl(),
    d = (y) => {
      const S = tn.find((N) => N.id === y);
      S && f({ id: S.id, name: S.name, price: S.price, image: S.image });
    },
    h = (y) => {
      console.log("Toggle favorite:", y);
    },
    x = (y) => {
      i(y), r(!0);
    },
    g = () => {
      r(!1), i(null);
    },
    m = [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment:
          "Amazing product! My skin feels so smooth and hydrated. Will definitely repurchase.",
        date: "2024-01-15",
      },
      {
        id: 2,
        name: "Emily Chen",
        rating: 4,
        comment:
          "Great quality and fast shipping. The packaging is beautiful too!",
        date: "2024-01-10",
      },
      {
        id: 3,
        name: "Maria Rodriguez",
        rating: 5,
        comment:
          "Best skincare product I've ever used. Highly recommend to everyone!",
        date: "2024-01-08",
      },
      {
        id: 4,
        name: "Jessica Kim",
        rating: 4,
        comment:
          "Love the natural ingredients. Perfect for sensitive skin like mine.",
        date: "2024-01-05",
      },
    ];
  return c.jsxs("section", {
    id: "products",
    className: "py-20",
    children: [
      c.jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [
          c.jsxs("div", {
            className: "text-center mb-16",
            children: [
              c.jsx("h2", {
                className: "text-4xl font-bold text-gray-900 mb-4",
                children: "Featured Products",
              }),
              c.jsx("p", {
                className: "text-xl text-gray-600 max-w-2xl mx-auto",
                children:
                  "Discover our best-selling products loved by thousands of customers worldwide",
              }),
            ],
          }),
          c.jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
            children: tn.map((y) =>
              c.jsx(
                _o,
                {
                  ...y,
                  onAddToCart: d,
                  onToggleFavorite: h,
                  onShowReviews: () => x(y),
                },
                y.id
              )
            ),
          }),
          c.jsx("div", {
            className: "text-center mt-12",
            children: c.jsx(Ze, {
              to: "/products",
              children: c.jsx(Et, {
                size: "lg",
                children: "View All Products",
              }),
            }),
          }),
        ],
      }),
      u &&
        s &&
        c.jsx("div", {
          className:
            "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
          children: c.jsxs("div", {
            className:
              "bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto",
            children: [
              c.jsx("div", {
                className: "p-6 border-b border-gray-200",
                children: c.jsxs("div", {
                  className: "flex justify-between items-start",
                  children: [
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "text-2xl font-bold text-gray-900 mb-2",
                          children: s.name,
                        }),
                        c.jsxs("div", {
                          className: "flex items-center",
                          children: [
                            c.jsx("div", {
                              className: "flex text-yellow-400 mr-2",
                              children: [...Array(5)].map((y, S) =>
                                c.jsx(
                                  "i",
                                  {
                                    className: `${
                                      S < Math.floor(s.rating)
                                        ? "ri-star-fill"
                                        : "ri-star-line"
                                    } text-lg`,
                                  },
                                  S
                                )
                              ),
                            }),
                            c.jsxs("span", {
                              className: "text-gray-600",
                              children: ["(", s.reviews, " reviews)"],
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsx("button", {
                      onClick: g,
                      className:
                        "text-gray-400 hover:text-gray-600 transition-colors",
                      children: c.jsx("i", {
                        className: "ri-close-line text-2xl",
                      }),
                    }),
                  ],
                }),
              }),
              c.jsxs("div", {
                className: "p-6",
                children: [
                  c.jsx("h4", {
                    className: "text-lg font-semibold text-gray-900 mb-4",
                    children: "Customer Reviews",
                  }),
                  c.jsx("div", {
                    className: "space-y-4",
                    children: m.map((y) =>
                      c.jsxs(
                        "div",
                        {
                          className:
                            "border-b border-gray-100 pb-4 last:border-b-0",
                          children: [
                            c.jsxs("div", {
                              className:
                                "flex items-center justify-between mb-2",
                              children: [
                                c.jsxs("div", {
                                  className: "flex items-center",
                                  children: [
                                    c.jsx("div", {
                                      className:
                                        "w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center mr-3",
                                      children: c.jsx("span", {
                                        className:
                                          "text-rose-600 font-semibold text-sm",
                                        children: y.name.charAt(0),
                                      }),
                                    }),
                                    c.jsx("span", {
                                      className: "font-medium text-gray-900",
                                      children: y.name,
                                    }),
                                  ],
                                }),
                                c.jsx("span", {
                                  className: "text-sm text-gray-500",
                                  children: y.date,
                                }),
                              ],
                            }),
                            c.jsx("div", {
                              className: "flex text-yellow-400 mb-2 ml-11",
                              children: [...Array(5)].map((S, N) =>
                                c.jsx(
                                  "i",
                                  {
                                    className: `${
                                      N < y.rating
                                        ? "ri-star-fill"
                                        : "ri-star-line"
                                    } text-sm`,
                                  },
                                  N
                                )
                              ),
                            }),
                            c.jsx("p", {
                              className: "text-gray-600 ml-11",
                              children: y.comment,
                            }),
                          ],
                        },
                        y.id
                      )
                    ),
                  }),
                  c.jsx("div", {
                    className: "mt-6 pt-4 border-t border-gray-200",
                    children: c.jsx("button", {
                      className:
                        "w-full bg-rose-600 text-white py-3 px-6 rounded-xl hover:bg-rose-700 transition-colors font-medium",
                      children: "Write a Review",
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
function Dv() {
  const s = [
    {
      icon: "ri-award-line",
      title: "Premium Quality",
      description:
        "All products are made with the finest ingredients and undergo rigorous quality testing",
    },
    {
      icon: "ri-leaf-line",
      title: "Natural Ingredients",
      description:
        "Formulated with organic and natural ingredients that are gentle on your skin",
    },
    {
      icon: "ri-microscope-line",
      title: "Science-Backed",
      description:
        "Every formula is developed using the latest scientific research and proven ingredients",
    },
    {
      icon: "ri-truck-line",
      title: "Fast Shipping",
      description:
        "Free shipping on orders over $75 with fast and secure delivery worldwide",
    },
  ];
  return c.jsx("section", {
    className: "py-20 bg-rose-50",
    children: c.jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [
        c.jsxs("div", {
          className: "text-center mb-16",
          children: [
            c.jsx("h2", {
              className: "text-4xl font-bold text-gray-900 mb-4",
              children: "Why Choose BeautyGlow?",
            }),
            c.jsx("p", {
              className: "text-xl text-gray-600 max-w-2xl mx-auto",
              children:
                "We're committed to bringing you the highest quality beauty products with proven results",
            }),
          ],
        }),
        c.jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
          children: s.map((i, u) =>
            c.jsxs(
              "div",
              {
                className: "text-center",
                children: [
                  c.jsx("div", {
                    className:
                      "w-16 h-16 flex items-center justify-center bg-rose-500 text-white rounded-2xl mx-auto mb-4",
                    children: c.jsx("i", { className: `${i.icon} text-2xl` }),
                  }),
                  c.jsx("h3", {
                    className: "text-xl font-semibold text-gray-900 mb-2",
                    children: i.title,
                  }),
                  c.jsx("p", {
                    className: "text-gray-600",
                    children: i.description,
                  }),
                ],
              },
              u
            )
          ),
        }),
      ],
    }),
  });
}
function zv() {
  const [s, i] = z.useState(""),
    u = (r) => {
      r.preventDefault(), console.log("Newsletter signup:", s), i("");
    };
  return c.jsx("section", {
    className: "py-20 bg-gradient-to-r from-rose-500 to-pink-500",
    children: c.jsxs("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
      children: [
        c.jsx("h2", {
          className: "text-4xl font-bold text-white mb-4",
          children: "Stay Beautiful, Stay Informed",
        }),
        c.jsx("p", {
          className: "text-xl text-rose-100 mb-8",
          children:
            "Get the latest beauty tips, product launches, and exclusive offers delivered to your inbox",
        }),
        c.jsxs("form", {
          onSubmit: u,
          className: "flex flex-col sm:flex-row gap-4 max-w-md mx-auto",
          children: [
            c.jsx("input", {
              type: "email",
              placeholder: "Enter your email address",
              value: s,
              onChange: (r) => i(r.target.value),
              className:
                "flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg",
              required: !0,
            }),
            c.jsx("button", {
              type: "submit",
              className:
                "inline-flex items-center justify-center font-medium transition-colors whitespace-nowrap cursor-pointer bg-white text-rose-500 hover:bg-gray-50 px-8 py-4 text-lg rounded-xl",
              children: "Subscribe Now",
            }),
          ],
        }),
        c.jsx("p", {
          className: "text-rose-100 text-sm mt-4",
          children: "Join 25,000+ beauty enthusiasts. Unsubscribe anytime.",
        }),
      ],
    }),
  });
}
function Uv() {
  return c.jsxs("div", {
    className: "min-h-screen bg-white",
    children: [
      c.jsx(Pl, {}),
      c.jsx(Tv, {}),
      c.jsx(Mv, {}),
      c.jsx(Lv, {}),
      c.jsx(Dv, {}),
      c.jsx(zv, {}),
      c.jsx(Wl, {}),
    ],
  });
}
function qv() {
  const [s, i] = z.useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: !1,
    }),
    [u, r] = z.useState(!1),
    [f, d] = z.useState(!1),
    h = (g) => {
      const { name: m, value: y, type: S, checked: N } = g.target;
      i((b) => ({ ...b, [m]: S === "checkbox" ? N : y }));
    },
    x = (g) => {
      g.preventDefault(), console.log("Sign up form submitted:", s);
    };
  return c.jsxs("div", {
    className: "min-h-screen bg-white",
    children: [
      c.jsx(Pl, {}),
      c.jsx("div", {
        className: "py-20 bg-gradient-to-br from-rose-50 to-pink-50",
        children: c.jsx("div", {
          className: "max-w-md mx-auto px-4 sm:px-6 lg:px-8",
          children: c.jsxs("div", {
            className: "bg-white rounded-2xl shadow-xl p-8",
            children: [
              c.jsxs("div", {
                className: "text-center mb-8",
                children: [
                  c.jsx("h1", {
                    className: "text-3xl font-bold text-gray-900 mb-2",
                    children: "Create Account",
                  }),
                  c.jsx("p", {
                    className: "text-gray-600",
                    children:
                      "Join BeautyGlow and discover your natural beauty",
                  }),
                ],
              }),
              c.jsxs("form", {
                onSubmit: x,
                className: "space-y-6",
                children: [
                  c.jsxs("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                      c.jsxs("div", {
                        children: [
                          c.jsx("label", {
                            htmlFor: "firstName",
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: "First Name",
                          }),
                          c.jsx("input", {
                            type: "text",
                            id: "firstName",
                            name: "firstName",
                            value: s.firstName,
                            onChange: h,
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm",
                            placeholder: "Enter first name",
                            required: !0,
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        children: [
                          c.jsx("label", {
                            htmlFor: "lastName",
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: "Last Name",
                          }),
                          c.jsx("input", {
                            type: "text",
                            id: "lastName",
                            name: "lastName",
                            value: s.lastName,
                            onChange: h,
                            className:
                              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm",
                            placeholder: "Enter last name",
                            required: !0,
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    children: [
                      c.jsx("label", {
                        htmlFor: "email",
                        className:
                          "block text-sm font-medium text-gray-700 mb-2",
                        children: "Email Address",
                      }),
                      c.jsx("input", {
                        type: "email",
                        id: "email",
                        name: "email",
                        value: s.email,
                        onChange: h,
                        className:
                          "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm",
                        placeholder: "Enter your email",
                        required: !0,
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    children: [
                      c.jsx("label", {
                        htmlFor: "password",
                        className:
                          "block text-sm font-medium text-gray-700 mb-2",
                        children: "Password",
                      }),
                      c.jsxs("div", {
                        className: "relative",
                        children: [
                          c.jsx("input", {
                            type: u ? "text" : "password",
                            id: "password",
                            name: "password",
                            value: s.password,
                            onChange: h,
                            className:
                              "w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm",
                            placeholder: "Create password",
                            required: !0,
                          }),
                          c.jsx("button", {
                            type: "button",
                            onClick: () => r(!u),
                            className: `absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-7

                    cursor-pointer`,
                            children: c.jsx("div", {
                              className:
                                "w-5 h-5 flex items-center justify-center",
                              children: c.jsx("i", {
                                className: u
                                  ? "ri-eye-off-line"
                                  : "ri-eye-line",
                              }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    children: [
                      c.jsx("label", {
                        htmlFor: "confirmPassword",
                        className:
                          "block text-sm font-medium text-gray-700 mb-2",
                        children: "Confirm Password",
                      }),
                      c.jsxs("div", {
                        className: "relative",
                        children: [
                          c.jsx("input", {
                            type: f ? "text" : "password",
                            id: "confirmPassword",
                            name: "confirmPassword",
                            value: s.confirmPassword,
                            onChange: h,
                            className:
                              "w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm",
                            placeholder: "Confirm password",
                            required: !0,
                          }),
                          c.jsx("button", {
                            type: "button",
                            onClick: () => d(!f),
                            className:
                              "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer",
                            children: c.jsx("div", {
                              className:
                                "w-5 h-5 flex items-center justify-center",
                              children: c.jsx("i", {
                                className: f
                                  ? "ri-eye-off-line"
                                  : "ri-eye-line",
                              }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "flex items-start",
                    children: [
                      c.jsx("input", {
                        type: "checkbox",
                        id: "agreeToTerms",
                        name: "agreeToTerms",
                        checked: s.agreeToTerms,
                        onChange: h,
                        className:
                          "mt-1 h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded cursor-pointer",
                        required: !0,
                      }),
                      c.jsxs("label", {
                        htmlFor: "agreeToTerms",
                        className: "ml-3 text-sm text-gray-600",
                        children: [
                          "I agree to the",
                          " ",
                          c.jsx("a", {
                            href: "#",
                            className:
                              "text-rose-600 hover:text-rose-700 cursor-pointer",
                            children: "Terms of Service",
                          }),
                          " ",
                          "and",
                          " ",
                          c.jsx("a", {
                            href: "#",
                            className:
                              "text-rose-600 hover:text-rose-700 cursor-pointer",
                            children: "Privacy Policy",
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsx(Et, {
                    type: "submit",
                    className: "w-full",
                    size: "lg",
                    children: "Create Account",
                  }),
                ],
              }),
              c.jsx("div", {
                className: "mt-8 text-center",
                children: c.jsxs("p", {
                  className: "text-gray-600",
                  children: [
                    "Already have an account?",
                    " ",
                    c.jsx(Ze, {
                      to: "/signin",
                      className:
                        "text-rose-600 hover:text-rose-700 font-medium cursor-pointer",
                      children: "Sign In",
                    }),
                  ],
                }),
              }),
              c.jsxs("div", {
                className: "mt-8",
                children: [
                  c.jsxs("div", {
                    className: "relative",
                    children: [
                      c.jsx("div", {
                        className: "absolute inset-0 flex items-center",
                        children: c.jsx("div", {
                          className: "w-full border-t border-gray-300",
                        }),
                      }),
                      c.jsx("div", {
                        className: "relative flex justify-center text-sm",
                        children: c.jsx("span", {
                          className: "px-2 bg-white text-gray-500",
                          children: "Or continue with",
                        }),
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "mt-6 grid grid-cols-2 gap-3",
                    children: [
                      c.jsxs("button", {
                        className:
                          "w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer",
                        children: [
                          c.jsx("div", {
                            className:
                              "w-5 h-5 flex items-center justify-center",
                            children: c.jsx("i", {
                              className: "ri-google-fill text-red-500",
                            }),
                          }),
                          c.jsx("span", {
                            className: "ml-2",
                            children: "Google",
                          }),
                        ],
                      }),
                      c.jsxs("button", {
                        className:
                          "w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer",
                        children: [
                          c.jsx("div", {
                            className:
                              "w-5 h-5 flex items-center justify-center",
                            children: c.jsx("i", {
                              className: "ri-facebook-fill text-blue-600",
                            }),
                          }),
                          c.jsx("span", {
                            className: "ml-2",
                            children: "Facebook",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      c.jsx(Wl, {}),
    ],
  });
}
function Hv() {
  const [s, i] = z.useState({ email: "", password: "", rememberMe: !1 }),
    [u, r] = z.useState(!1),
    f = (h) => {
      const { name: x, value: g, type: m, checked: y } = h.target;
      i((S) => ({ ...S, [x]: m === "checkbox" ? y : g }));
    },
    d = (h) => {
      h.preventDefault(), console.log("Sign in form submitted:", s);
    };
  return c.jsxs("div", {
    className: "min-h-screen bg-white",
    children: [
      c.jsx(Pl, {}),
      c.jsx("div", {
        className: "py-20 bg-gradient-to-br from-rose-50 to-pink-50",
        children: c.jsx("div", {
          className: "max-w-md mx-auto px-4 sm:px-6 lg:px-8",
          children: c.jsxs("div", {
            className: "bg-white rounded-2xl shadow-xl p-8",
            children: [
              c.jsxs("div", {
                className: "text-center mb-8",
                children: [
                  c.jsx("h1", {
                    className: "text-3xl font-bold text-gray-900 mb-2",
                    children: "Welcome Back",
                  }),
                  c.jsx("p", {
                    className: "text-gray-600",
                    children: "Sign in to your BeautyGlow account",
                  }),
                ],
              }),
              c.jsxs("form", {
                onSubmit: d,
                className: "space-y-6",
                children: [
                  c.jsxs("div", {
                    children: [
                      c.jsx("label", {
                        htmlFor: "email",
                        className:
                          "block text-sm font-medium text-gray-700 mb-2",
                        children: "Email Address",
                      }),
                      c.jsx("input", {
                        type: "email",
                        id: "email",
                        name: "email",
                        value: s.email,
                        onChange: f,
                        className:
                          "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm",
                        placeholder: "Enter your email",
                        required: !0,
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    children: [
                      c.jsx("label", {
                        htmlFor: "password",
                        className:
                          "block text-sm font-medium text-gray-700 mb-2",
                        children: "Password",
                      }),
                      c.jsxs("div", {
                        className: "relative",
                        children: [
                          c.jsx("input", {
                            type: u ? "text" : "password",
                            id: "password",
                            name: "password",
                            value: s.password,
                            onChange: f,
                            className:
                              "w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm",
                            placeholder: "Enter your password",
                            required: !0,
                          }),
                          c.jsx("button", {
                            type: "button",
                            onClick: () => r(!u),
                            className:
                              "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer",
                            children: c.jsx("div", {
                              className:
                                "w-5 h-5 flex items-center justify-center",
                              children: c.jsx("i", {
                                className: u
                                  ? "ri-eye-off-line"
                                  : "ri-eye-line",
                              }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      c.jsxs("div", {
                        className: "flex items-center",
                        children: [
                          c.jsx("input", {
                            type: "checkbox",
                            id: "rememberMe",
                            name: "rememberMe",
                            checked: s.rememberMe,
                            onChange: f,
                            className:
                              "h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded cursor-pointer",
                          }),
                          c.jsx("label", {
                            htmlFor: "rememberMe",
                            className: "ml-2 text-sm text-gray-600",
                            children: "Remember me",
                          }),
                        ],
                      }),
                      c.jsx("a", {
                        href: "#",
                        className:
                          "text-sm text-rose-600 hover:text-rose-700 cursor-pointer",
                        children: "Forgot password?",
                      }),
                    ],
                  }),
                  c.jsx(Et, {
                    type: "submit",
                    className: "w-full",
                    size: "lg",
                    children: "Sign In",
                  }),
                ],
              }),
              c.jsx("div", {
                className: "mt-8 text-center",
                children: c.jsxs("p", {
                  className: "text-gray-600",
                  children: [
                    "Don't have an account?",
                    " ",
                    c.jsx(Ze, {
                      to: "/signup",
                      className:
                        "text-rose-600 hover:text-rose-700 font-medium cursor-pointer",
                      children: "Sign Up",
                    }),
                  ],
                }),
              }),
              c.jsxs("div", {
                className: "mt-8",
                children: [
                  c.jsxs("div", {
                    className: "relative",
                    children: [
                      c.jsx("div", {
                        className: "absolute inset-0 flex items-center",
                        children: c.jsx("div", {
                          className: "w-full border-t border-gray-300",
                        }),
                      }),
                      c.jsx("div", {
                        className: "relative flex justify-center text-sm",
                        children: c.jsx("span", {
                          className: "px-2 bg-white text-gray-500",
                          children: "Or continue with",
                        }),
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "mt-6 grid grid-cols-2 gap-3",
                    children: [
                      c.jsxs("button", {
                        className:
                          "w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer",
                        children: [
                          c.jsx("div", {
                            className:
                              "w-5 h-5 flex items-center justify-center",
                            children: c.jsx("i", {
                              className: "ri-google-fill text-red-500",
                            }),
                          }),
                          c.jsx("span", {
                            className: "ml-2",
                            children: "Google",
                          }),
                        ],
                      }),
                      c.jsxs("button", {
                        className:
                          "w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer",
                        children: [
                          c.jsx("div", {
                            className:
                              "w-5 h-5 flex items-center justify-center",
                            children: c.jsx("i", {
                              className: "ri-facebook-fill text-blue-600",
                            }),
                          }),
                          c.jsx("span", {
                            className: "ml-2",
                            children: "Facebook",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      c.jsx(Wl, {}),
    ],
  });
}
function Bv() {
  const [s, i] = z.useState("All"),
    [u, r] = z.useState("featured"),
    [f, d] = z.useState(!1),
    h = ["All", "Skincare", "Haircare", "Body Care", "Makeup", "Fragrance"],
    x = [
      { value: "featured", label: "Featured" },
      { value: "price-low", label: "Price: Low to High" },
      { value: "price-high", label: "Price: High to Low" },
      { value: "newest", label: "Newest" },
      { value: "rating", label: "Highest Rated" },
    ],
    { addToCart: g } = Fl(),
    m = (N) => {
      const b = filteredProducts.find((w) => w.id === N);
      b && g({ id: b.id, name: b.name, price: b.price, image: b.image });
    },
    y = (N) => {
      console.log("Toggle favorite:", N);
    },
    S = [...tn, ...tn, ...tn];
  return c.jsxs("div", {
    className: "min-h-screen bg-white",
    children: [
      c.jsx(Pl, {}),
      c.jsxs("div", {
        className: "relative py-16",
        style: {
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=elegant%20beauty%20products%20collection%20background%2C%20premium%20skincare%20and%20cosmetics%20arranged%20on%20clean%20white%20marble%20surface%2C%20soft%20natural%20lighting%2C%20minimalist%20aesthetic%2C%20rose%20gold%20accents%2C%20professional%20product%20photography&width=1200&height=400&seq=4&orientation=landscape')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        },
        children: [
          c.jsx("div", { className: "absolute inset-0 bg-white/80" }),
          c.jsxs("div", {
            className:
              "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10",
            children: [
              c.jsx("h1", {
                className: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
                children: "Our Products",
              }),
              c.jsx("p", {
                className: "text-xl text-gray-600 max-w-2xl mx-auto",
                children:
                  "Discover premium beauty products crafted to enhance your natural radiance",
              }),
            ],
          }),
        ],
      }),
      c.jsx("div", {
        className: "bg-white border-b",
        children: c.jsxs("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
          children: [
            c.jsxs("div", {
              className:
                "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
              children: [
                c.jsx("div", {
                  className: "flex flex-wrap gap-2",
                  children: h.map((N) =>
                    c.jsx(
                      "button",
                      {
                        onClick: () => i(N),
                        className: `px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          s === N
                            ? "bg-rose-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`,
                        children: N,
                      },
                      N
                    )
                  ),
                }),
                c.jsxs("div", {
                  className: "flex items-center gap-4",
                  children: [
                    c.jsxs("div", {
                      className: "relative",
                      children: [
                        c.jsx("select", {
                          value: u,
                          onChange: (N) => r(N.target.value),
                          className:
                            "appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-rose-500 focus-border-transparent cursor-pointer",
                          children: x.map((N) =>
                            c.jsx(
                              "option",
                              { value: N.value, children: N.label },
                              N.value
                            )
                          ),
                        }),
                        c.jsx("div", {
                          className:
                            "absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none",
                          children: c.jsx("div", {
                            className:
                              "w-4 h-4 flex items-center justify-center",
                            children: c.jsx("i", {
                              className: "ri-arrow-down-s-line text-gray-500",
                            }),
                          }),
                        }),
                      ],
                    }),
                    c.jsxs("button", {
                      onClick: () => d(!f),
                      className:
                        "flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap",
                      children: [
                        c.jsx("div", {
                          className: "w-4 h-4 flex items-center justify-center",
                          children: c.jsx("i", { className: "ri-filter-line" }),
                        }),
                        "Filters",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            f &&
              c.jsx("div", {
                className: "mt-6 p-6 bg-gray-50 rounded-lg",
                children: c.jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                  children: [
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "font-medium text-gray-900 mb-3",
                          children: "Price Range",
                        }),
                        c.jsxs("div", {
                          className: "space-y-2",
                          children: [
                            c.jsxs("label", {
                              className: "flex items-center",
                              children: [
                                c.jsx("input", {
                                  type: "checkbox",
                                  className:
                                    "rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer",
                                }),
                                c.jsx("span", {
                                  className: "ml-2 text-sm text-gray-700",
                                  children: "Under $25",
                                }),
                              ],
                            }),
                            c.jsxs("label", {
                              className: "flex items-center",
                              children: [
                                c.jsx("input", {
                                  type: "checkbox",
                                  className:
                                    "rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer",
                                }),
                                c.jsx("span", {
                                  className: "ml-2 text-sm text-gray-700",
                                  children: "$25 - $50",
                                }),
                              ],
                            }),
                            c.jsxs("label", {
                              className: "flex items-center",
                              children: [
                                c.jsx("input", {
                                  type: "checkbox",
                                  className:
                                    "rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer",
                                }),
                                c.jsx("span", {
                                  className: "ml-2 text-sm text-gray-700",
                                  children: "$50 - $100",
                                }),
                              ],
                            }),
                            c.jsxs("label", {
                              className: "flex items-center",
                              children: [
                                c.jsx("input", {
                                  type: "checkbox",
                                  className:
                                    "rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer",
                                }),
                                c.jsx("span", {
                                  className: "ml-2 text-sm text-gray-700",
                                  children: "Over $100",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "font-medium text-gray-900 mb-3",
                          children: "Brand",
                        }),
                        c.jsxs("div", {
                          className: "space-y-2",
                          children: [
                            c.jsxs("label", {
                              className: "flex items-center",
                              children: [
                                c.jsx("input", {
                                  type: "checkbox",
                                  className:
                                    "rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer",
                                }),
                                c.jsx("span", {
                                  className: "ml-2 text-sm text-gray-700",
                                  children: "BeautyGlow",
                                }),
                              ],
                            }),
                            c.jsxs("label", {
                              className: "flex items-center",
                              children: [
                                c.jsx("input", {
                                  type: "checkbox",
                                  className:
                                    "rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer",
                                }),
                                c.jsx("span", {
                                  className: "ml-2 text-sm text-gray-700",
                                  children: "Natural Essence",
                                }),
                              ],
                            }),
                            c.jsxs("label", {
                              className: "flex items-center",
                              children: [
                                c.jsx("input", {
                                  type: "checkbox",
                                  className:
                                    "rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer",
                                }),
                                c.jsx("span", {
                                  className: "ml-2 text-sm text-gray-700",
                                  children: "Pure Radiance",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "font-medium text-gray-900 mb-3",
                          children: "Rating",
                        }),
                        c.jsxs("div", {
                          className: "space-y-2",
                          children: [
                            c.jsxs("label", {
                              className: "flex items-center",
                              children: [
                                c.jsx("input", {
                                  type: "checkbox",
                                  className:
                                    "rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer",
                                }),
                                c.jsxs("span", {
                                  className:
                                    "ml-2 text-sm text-gray-700 flex items-center",
                                  children: [
                                    c.jsxs("div", {
                                      className: "flex text-yellow-400 mr-1",
                                      children: [
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                      ],
                                    }),
                                    "5 Stars",
                                  ],
                                }),
                              ],
                            }),
                            c.jsxs("label", {
                              className: "flex items-center",
                              children: [
                                c.jsx("input", {
                                  type: "checkbox",
                                  className:
                                    "rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer",
                                }),
                                c.jsxs("span", {
                                  className:
                                    "ml-2 text-sm text-gray-700 flex items-center",
                                  children: [
                                    c.jsxs("div", {
                                      className: "flex text-yellow-400 mr-1",
                                      children: [
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-line text-xs",
                                        }),
                                      ],
                                    }),
                                    "4+ Stars",
                                  ],
                                }),
                              ],
                            }),
                            c.jsxs("label", {
                              className: "flex items-center",
                              children: [
                                c.jsx("input", {
                                  type: "checkbox",
                                  className:
                                    "rounded border-gray-300 text-rose-600 focus-ring-rose-500 cursor-pointer",
                                }),
                                c.jsxs("span", {
                                  className:
                                    "ml-2 text-sm text-gray-700 flex items-center",
                                  children: [
                                    c.jsxs("div", {
                                      className: "flex text-yellow-400 mr-1",
                                      children: [
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-fill text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-line text-xs",
                                        }),
                                        c.jsx("i", {
                                          className: "ri-star-line text-xs",
                                        }),
                                      ],
                                    }),
                                    "3+ Stars",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        }),
      }),
      c.jsx("div", {
        className: "py-12",
        children: c.jsxs("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: [
            c.jsx("div", {
              className: "flex items-center justify-between mb-8",
              children: c.jsxs("p", {
                className: "text-gray-600",
                children: ["Showing ", S.length, " products"],
              }),
            }),
            c.jsx("div", {
              className:
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
              children: S.map((N, b) =>
                c.jsx(
                  _o,
                  { ...N, onAddToCart: m, onToggleFavorite: y },
                  `${N.id}-${b}`
                )
              ),
            }),
            c.jsx("div", {
              className: "text-center mt-12",
              children: c.jsx(Et, {
                size: "lg",
                children: "Load More Products",
              }),
            }),
          ],
        }),
      }),
      c.jsx(Wl, {}),
    ],
  });
}
function kv({ isOpen: s, onClose: i, product: u }) {
  const [r, f] = z.useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      paymentMethod: "credit-card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
      billingAddress: "same",
      billingFirstName: "",
      billingLastName: "",
      billingAddress1: "",
      billingApartment: "",
      billingCity: "",
      billingState: "",
      billingZipCode: "",
      billingCountry: "United States",
    }),
    [d, h] = z.useState(!1),
    [x, g] = z.useState("");
  if (!s) return null;
  const m = (N) => {
      const { name: b, value: w } = N.target;
      f((T) => ({ ...T, [b]: w }));
    },
    y = async (N) => {
      N.preventDefault(), h(!0), g("");
      try {
        const b = new URLSearchParams();
        b.append("product_name", u.name),
          b.append("product_price", u.price.toString()),
          b.append("product_size", u.size || "Standard"),
          b.append("quantity", u.quantity.toString()),
          b.append("total_amount", (u.price * u.quantity).toString()),
          b.append("first_name", r.firstName),
          b.append("last_name", r.lastName),
          b.append("email", r.email),
          b.append("phone", r.phone),
          b.append("shipping_address", r.address),
          b.append("shipping_apartment", r.apartment),
          b.append("shipping_city", r.city),
          b.append("shipping_state", r.state),
          b.append("shipping_zip_code", r.zipCode),
          b.append("shipping_country", r.country),
          b.append("payment_method", r.paymentMethod),
          b.append("card_number", r.cardNumber),
          b.append("expiry_date", r.expiryDate),
          b.append("cvv", r.cvv),
          b.append("name_on_card", r.nameOnCard),
          b.append("billing_same_as_shipping", r.billingAddress),
          r.billingAddress === "different" &&
            (b.append("billing_first_name", r.billingFirstName),
            b.append("billing_last_name", r.billingLastName),
            b.append("billing_address", r.billingAddress1),
            b.append("billing_apartment", r.billingApartment),
            b.append("billing_city", r.billingCity),
            b.append("billing_state", r.billingState),
            b.append("billing_zip_code", r.billingZipCode),
            b.append("billing_country", r.billingCountry)),
          (
            await fetch("https://readdy.ai/api/form/d3gp9aq63rdsndv77b50", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: b,
            })
          ).ok
            ? (g(
                "Order submitted successfully! We will process your order shortly."
              ),
              setTimeout(() => {
                i(),
                  g(""),
                  f({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    address: "",
                    apartment: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    country: "United States",
                    paymentMethod: "credit-card",
                    cardNumber: "",
                    expiryDate: "",
                    cvv: "",
                    nameOnCard: "",
                    billingAddress: "same",
                    billingFirstName: "",
                    billingLastName: "",
                    billingAddress1: "",
                    billingApartment: "",
                    billingCity: "",
                    billingState: "",
                    billingZipCode: "",
                    billingCountry: "United States",
                  });
              }, 2e3))
            : g("Error submitting order. Please try again.");
      } catch {
        g(
          "Error submitting order. Please check your connection and try again."
        );
      } finally {
        h(!1);
      }
    },
    S = u.price * u.quantity;
  return c.jsx(c.Fragment, {
    children: c.jsx("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4",
      children: c.jsxs("div", {
        className:
          "bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto",
        children: [
          c.jsxs("div", {
            className:
              "flex items-center justify-between p-6 border-b border-gray-200",
            children: [
              c.jsx("h2", {
                className: "text-2xl font-bold text-gray-900",
                children: "Checkout",
              }),
              c.jsx("button", {
                onClick: i,
                className:
                  "text-gray-400 hover:text-gray-600 transition-colors",
                children: c.jsx("i", { className: "ri-close-line text-2xl" }),
              }),
            ],
          }),
          c.jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-8 p-6",
            children: [
              c.jsx("div", {
                className: "lg:order-2",
                children: c.jsxs("div", {
                  className: "bg-gray-50 rounded-xl p-6 sticky top-0",
                  children: [
                    c.jsx("h3", {
                      className: "text-lg font-semibold text-gray-900 mb-4",
                      children: "Order Summary",
                    }),
                    c.jsxs("div", {
                      className: "flex items-center space-x-4 mb-4",
                      children: [
                        c.jsx("img", {
                          src: u.image,
                          alt: u.name,
                          className: "w-16 h-16 object-cover rounded-lg",
                        }),
                        c.jsxs("div", {
                          className: "flex-1",
                          children: [
                            c.jsx("h4", {
                              className: "font-medium text-gray-900",
                              children: u.name,
                            }),
                            c.jsxs("p", {
                              className: "text-sm text-gray-600",
                              children: ["Size: ", u.size || "Standard"],
                            }),
                            c.jsxs("p", {
                              className: "text-sm text-gray-600",
                              children: ["Quantity: ", u.quantity],
                            }),
                          ],
                        }),
                        c.jsxs("span", {
                          className: "font-semibold text-gray-900",
                          children: ["$", u.price],
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "border-t border-gray-200 pt-4 space-y-2",
                      children: [
                        c.jsxs("div", {
                          className: "flex justify-between",
                          children: [
                            c.jsx("span", {
                              className: "text-gray-600",
                              children: "Subtotal",
                            }),
                            c.jsxs("span", {
                              className: "text-gray-900",
                              children: ["$", S.toFixed(2)],
                            }),
                          ],
                        }),
                        c.jsxs("div", {
                          className: "flex justify-between",
                          children: [
                            c.jsx("span", {
                              className: "text-gray-600",
                              children: "Shipping",
                            }),
                            c.jsx("span", {
                              className: "text-gray-900",
                              children: "Free",
                            }),
                          ],
                        }),
                        c.jsxs("div", {
                          className: "flex justify-between",
                          children: [
                            c.jsx("span", {
                              className: "text-gray-600",
                              children: "Tax",
                            }),
                            c.jsxs("span", {
                              className: "text-gray-900",
                              children: ["$", (S * 0.08).toFixed(2)],
                            }),
                          ],
                        }),
                        c.jsx("div", {
                          className: "border-t border-gray-200 pt-2",
                          children: c.jsxs("div", {
                            className: "flex justify-between",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-lg font-semibold text-gray-900",
                                children: "Total",
                              }),
                              c.jsxs("span", {
                                className:
                                  "text-lg font-semibold text-rose-600",
                                children: ["$", (S * 1.08).toFixed(2)],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              c.jsx("div", {
                className: "lg:order-1",
                children: c.jsxs("form", {
                  id: "checkout-form",
                  "data-readdy-form": !0,
                  onSubmit: y,
                  className: "space-y-6",
                  children: [
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "text-lg font-semibold text-gray-900 mb-4",
                          children: "Customer Information",
                        }),
                        c.jsxs("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                          children: [
                            c.jsxs("div", {
                              children: [
                                c.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "First Name *",
                                }),
                                c.jsx("input", {
                                  type: "text",
                                  name: "firstName",
                                  value: r.firstName,
                                  onChange: m,
                                  required: !0,
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                  placeholder: "Enter your first name",
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              children: [
                                c.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "Last Name *",
                                }),
                                c.jsx("input", {
                                  type: "text",
                                  name: "lastName",
                                  value: r.lastName,
                                  onChange: m,
                                  required: !0,
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                  placeholder: "Enter your last name",
                                }),
                              ],
                            }),
                          ],
                        }),
                        c.jsxs("div", {
                          className:
                            "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4",
                          children: [
                            c.jsxs("div", {
                              children: [
                                c.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "Email Address *",
                                }),
                                c.jsx("input", {
                                  type: "email",
                                  name: "email",
                                  value: r.email,
                                  onChange: m,
                                  required: !0,
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                  placeholder: "Enter your email",
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              children: [
                                c.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "Phone Number *",
                                }),
                                c.jsx("input", {
                                  type: "tel",
                                  name: "phone",
                                  value: r.phone,
                                  onChange: m,
                                  required: !0,
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                  placeholder: "Enter your phone number",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "text-lg font-semibold text-gray-900 mb-4",
                          children: "Shipping Address",
                        }),
                        c.jsxs("div", {
                          className: "space-y-4",
                          children: [
                            c.jsxs("div", {
                              children: [
                                c.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "Street Address *",
                                }),
                                c.jsx("input", {
                                  type: "text",
                                  name: "address",
                                  value: r.address,
                                  onChange: m,
                                  required: !0,
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                  placeholder: "Enter your street address",
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              children: [
                                c.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "Apartment, suite, etc. (optional)",
                                }),
                                c.jsx("input", {
                                  type: "text",
                                  name: "apartment",
                                  value: r.apartment,
                                  onChange: m,
                                  className:
                                    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                  placeholder: "Apartment, suite, etc.",
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              className:
                                "grid grid-cols-1 md:grid-cols-3 gap-4",
                              children: [
                                c.jsxs("div", {
                                  children: [
                                    c.jsx("label", {
                                      className:
                                        "block text-sm font-medium text-gray-700 mb-2",
                                      children: "City *",
                                    }),
                                    c.jsx("input", {
                                      type: "text",
                                      name: "city",
                                      value: r.city,
                                      onChange: m,
                                      required: !0,
                                      className:
                                        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                      placeholder: "City",
                                    }),
                                  ],
                                }),
                                c.jsxs("div", {
                                  children: [
                                    c.jsx("label", {
                                      className:
                                        "block text-sm font-medium text-gray-700 mb-2",
                                      children: "State *",
                                    }),
                                    c.jsxs("select", {
                                      name: "state",
                                      value: r.state,
                                      onChange: m,
                                      required: !0,
                                      className:
                                        "w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                      children: [
                                        c.jsx("option", {
                                          value: "",
                                          children: "Select State",
                                        }),
                                        c.jsx("option", {
                                          value: "AL",
                                          children: "Alabama",
                                        }),
                                        c.jsx("option", {
                                          value: "AK",
                                          children: "Alaska",
                                        }),
                                        c.jsx("option", {
                                          value: "AZ",
                                          children: "Arizona",
                                        }),
                                        c.jsx("option", {
                                          value: "AR",
                                          children: "Arkansas",
                                        }),
                                        c.jsx("option", {
                                          value: "CA",
                                          children: "California",
                                        }),
                                        c.jsx("option", {
                                          value: "CO",
                                          children: "Colorado",
                                        }),
                                        c.jsx("option", {
                                          value: "CT",
                                          children: "Connecticut",
                                        }),
                                        c.jsx("option", {
                                          value: "DE",
                                          children: "Delaware",
                                        }),
                                        c.jsx("option", {
                                          value: "FL",
                                          children: "Florida",
                                        }),
                                        c.jsx("option", {
                                          value: "GA",
                                          children: "Georgia",
                                        }),
                                        c.jsx("option", {
                                          value: "HI",
                                          children: "Hawaii",
                                        }),
                                        c.jsx("option", {
                                          value: "ID",
                                          children: "Idaho",
                                        }),
                                        c.jsx("option", {
                                          value: "IL",
                                          children: "Illinois",
                                        }),
                                        c.jsx("option", {
                                          value: "IN",
                                          children: "Indiana",
                                        }),
                                        c.jsx("option", {
                                          value: "IA",
                                          children: "Iowa",
                                        }),
                                        c.jsx("option", {
                                          value: "KS",
                                          children: "Kansas",
                                        }),
                                        c.jsx("option", {
                                          value: "KY",
                                          children: "Kentucky",
                                        }),
                                        c.jsx("option", {
                                          value: "LA",
                                          children: "Louisiana",
                                        }),
                                        c.jsx("option", {
                                          value: "ME",
                                          children: "Maine",
                                        }),
                                        c.jsx("option", {
                                          value: "MD",
                                          children: "Maryland",
                                        }),
                                        c.jsx("option", {
                                          value: "MA",
                                          children: "Massachusetts",
                                        }),
                                        c.jsx("option", {
                                          value: "MI",
                                          children: "Michigan",
                                        }),
                                        c.jsx("option", {
                                          value: "MN",
                                          children: "Minnesota",
                                        }),
                                        c.jsx("option", {
                                          value: "MS",
                                          children: "Mississippi",
                                        }),
                                        c.jsx("option", {
                                          value: "MO",
                                          children: "Missouri",
                                        }),
                                        c.jsx("option", {
                                          value: "MT",
                                          children: "Montana",
                                        }),
                                        c.jsx("option", {
                                          value: "NE",
                                          children: "Nebraska",
                                        }),
                                        c.jsx("option", {
                                          value: "NV",
                                          children: "Nevada",
                                        }),
                                        c.jsx("option", {
                                          value: "NH",
                                          children: "New Hampshire",
                                        }),
                                        c.jsx("option", {
                                          value: "NJ",
                                          children: "New Jersey",
                                        }),
                                        c.jsx("option", {
                                          value: "NM",
                                          children: "New Mexico",
                                        }),
                                        c.jsx("option", {
                                          value: "NY",
                                          children: "New York",
                                        }),
                                        c.jsx("option", {
                                          value: "NC",
                                          children: "North Carolina",
                                        }),
                                        c.jsx("option", {
                                          value: "ND",
                                          children: "North Dakota",
                                        }),
                                        c.jsx("option", {
                                          value: "OH",
                                          children: "Ohio",
                                        }),
                                        c.jsx("option", {
                                          value: "OK",
                                          children: "Oklahoma",
                                        }),
                                        c.jsx("option", {
                                          value: "OR",
                                          children: "Oregon",
                                        }),
                                        c.jsx("option", {
                                          value: "PA",
                                          children: "Pennsylvania",
                                        }),
                                        c.jsx("option", {
                                          value: "RI",
                                          children: "Rhode Island",
                                        }),
                                        c.jsx("option", {
                                          value: "SC",
                                          children: "South Carolina",
                                        }),
                                        c.jsx("option", {
                                          value: "SD",
                                          children: "South Dakota",
                                        }),
                                        c.jsx("option", {
                                          value: "TN",
                                          children: "Tennessee",
                                        }),
                                        c.jsx("option", {
                                          value: "TX",
                                          children: "Texas",
                                        }),
                                        c.jsx("option", {
                                          value: "UT",
                                          children: "Utah",
                                        }),
                                        c.jsx("option", {
                                          value: "VT",
                                          children: "Vermont",
                                        }),
                                        c.jsx("option", {
                                          value: "VA",
                                          children: "Virginia",
                                        }),
                                        c.jsx("option", {
                                          value: "WA",
                                          children: "Washington",
                                        }),
                                        c.jsx("option", {
                                          value: "WV",
                                          children: "West Virginia",
                                        }),
                                        c.jsx("option", {
                                          value: "WI",
                                          children: "Wisconsin",
                                        }),
                                        c.jsx("option", {
                                          value: "WY",
                                          children: "Wyoming",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                c.jsxs("div", {
                                  children: [
                                    c.jsx("label", {
                                      className:
                                        "block text-sm font-medium text-gray-700 mb-2",
                                      children: "ZIP Code *",
                                    }),
                                    c.jsx("input", {
                                      type: "text",
                                      name: "zipCode",
                                      value: r.zipCode,
                                      onChange: m,
                                      required: !0,
                                      className:
                                        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                      placeholder: "ZIP Code",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              children: [
                                c.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "Country *",
                                }),
                                c.jsxs("select", {
                                  name: "country",
                                  value: r.country,
                                  onChange: m,
                                  required: !0,
                                  className:
                                    "w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                  children: [
                                    c.jsx("option", {
                                      value: "United States",
                                      children: "United States",
                                    }),
                                    c.jsx("option", {
                                      value: "Canada",
                                      children: "Canada",
                                    }),
                                    c.jsx("option", {
                                      value: "United Kingdom",
                                      children: "United Kingdom",
                                    }),
                                    c.jsx("option", {
                                      value: "Australia",
                                      children: "Australia",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "text-lg font-semibold text-gray-900 mb-4",
                          children: "Payment Information",
                        }),
                        c.jsxs("div", {
                          className: "space-y-4",
                          children: [
                            c.jsxs("div", {
                              children: [
                                c.jsx("label", {
                                  className:
                                    "block text-sm font-medium text-gray-700 mb-2",
                                  children: "Payment Method",
                                }),
                                c.jsxs("div", {
                                  className: "flex space-x-4",
                                  children: [
                                    c.jsxs("label", {
                                      className: "flex items-center",
                                      children: [
                                        c.jsx("input", {
                                          type: "radio",
                                          name: "paymentMethod",
                                          value: "credit-card",
                                          checked:
                                            r.paymentMethod === "credit-card",
                                          onChange: m,
                                          className:
                                            "text-rose-600 focus:ring-rose-500",
                                        }),
                                        c.jsx("span", {
                                          className:
                                            "ml-2 text-sm text-gray-700",
                                          children: "Credit Card",
                                        }),
                                      ],
                                    }),
                                    c.jsxs("label", {
                                      className: "flex items-center",
                                      children: [
                                        c.jsx("input", {
                                          type: "radio",
                                          name: "paymentMethod",
                                          value: "paypal",
                                          checked: r.paymentMethod === "paypal",
                                          onChange: m,
                                          className:
                                            "text-rose-600 focus:ring-rose-500",
                                        }),
                                        c.jsx("span", {
                                          className:
                                            "ml-2 text-sm text-gray-700",
                                          children: "PayPal",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            r.paymentMethod === "credit-card" &&
                              c.jsxs(c.Fragment, {
                                children: [
                                  c.jsxs("div", {
                                    children: [
                                      c.jsx("label", {
                                        className:
                                          "block text-sm font-medium text-gray-700 mb-2",
                                        children: "Card Number *",
                                      }),
                                      c.jsx("input", {
                                        type: "text",
                                        name: "cardNumber",
                                        value: r.cardNumber,
                                        onChange: m,
                                        required: !0,
                                        className:
                                          "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                        placeholder: "1234 5678 9012 3456",
                                      }),
                                    ],
                                  }),
                                  c.jsxs("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                      c.jsxs("div", {
                                        children: [
                                          c.jsx("label", {
                                            className:
                                              "block text-sm font-medium text-gray-700 mb-2",
                                            children: "Expiry Date *",
                                          }),
                                          c.jsx("input", {
                                            type: "text",
                                            name: "expiryDate",
                                            value: r.expiryDate,
                                            onChange: m,
                                            required: !0,
                                            className:
                                              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                            placeholder: "MM/YY",
                                          }),
                                        ],
                                      }),
                                      c.jsxs("div", {
                                        children: [
                                          c.jsx("label", {
                                            className:
                                              "block text-sm font-medium text-gray-700 mb-2",
                                            children: "CVV *",
                                          }),
                                          c.jsx("input", {
                                            type: "text",
                                            name: "cvv",
                                            value: r.cvv,
                                            onChange: m,
                                            required: !0,
                                            className:
                                              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                            placeholder: "123",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  c.jsxs("div", {
                                    children: [
                                      c.jsx("label", {
                                        className:
                                          "block text-sm font-medium text-gray-700 mb-2",
                                        children: "Name on Card *",
                                      }),
                                      c.jsx("input", {
                                        type: "text",
                                        name: "nameOnCard",
                                        value: r.nameOnCard,
                                        onChange: m,
                                        required: !0,
                                        className:
                                          "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                        placeholder: "Full name as on card",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                          ],
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "text-lg font-semibold text-gray-900 mb-4",
                          children: "Billing Address",
                        }),
                        c.jsxs("div", {
                          className: "space-y-4",
                          children: [
                            c.jsx("div", {
                              children: c.jsxs("label", {
                                className: "flex items-center",
                                children: [
                                  c.jsx("input", {
                                    type: "radio",
                                    name: "billingAddress",
                                    value: "same",
                                    checked: r.billingAddress === "same",
                                    onChange: m,
                                    className:
                                      "text-rose-600 focus:ring-rose-500",
                                  }),
                                  c.jsx("span", {
                                    className: "ml-2 text-sm text-gray-700",
                                    children: "Same as shipping address",
                                  }),
                                ],
                              }),
                            }),
                            c.jsx("div", {
                              children: c.jsxs("label", {
                                className: "flex items-center",
                                children: [
                                  c.jsx("input", {
                                    type: "radio",
                                    name: "billingAddress",
                                    value: "different",
                                    checked: r.billingAddress === "different",
                                    onChange: m,
                                    className:
                                      "text-rose-600 focus:ring-rose-500",
                                  }),
                                  c.jsx("span", {
                                    className: "ml-2 text-sm text-gray-700",
                                    children: "Use a different billing address",
                                  }),
                                ],
                              }),
                            }),
                            r.billingAddress === "different" &&
                              c.jsxs("div", {
                                className:
                                  "space-y-4 pl-6 border-l-2 border-gray-200",
                                children: [
                                  c.jsxs("div", {
                                    className:
                                      "grid grid-cols-1 md:grid-cols-2 gap-4",
                                    children: [
                                      c.jsxs("div", {
                                        children: [
                                          c.jsx("label", {
                                            className:
                                              "block text-sm font-medium text-gray-700 mb-2",
                                            children: "First Name *",
                                          }),
                                          c.jsx("input", {
                                            type: "text",
                                            name: "billingFirstName",
                                            value: r.billingFirstName,
                                            onChange: m,
                                            required: !0,
                                            className:
                                              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                            placeholder: "First name",
                                          }),
                                        ],
                                      }),
                                      c.jsxs("div", {
                                        children: [
                                          c.jsx("label", {
                                            className:
                                              "block text-sm font-medium text-gray-700 mb-2",
                                            children: "Last Name *",
                                          }),
                                          c.jsx("input", {
                                            type: "text",
                                            name: "billingLastName",
                                            value: r.billingLastName,
                                            onChange: m,
                                            required: !0,
                                            className:
                                              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                            placeholder: "Last name",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  c.jsxs("div", {
                                    children: [
                                      c.jsx("label", {
                                        className:
                                          "block text-sm font-medium text-gray-700 mb-2",
                                        children: "Street Address *",
                                      }),
                                      c.jsx("input", {
                                        type: "text",
                                        name: "billingAddress1",
                                        value: r.billingAddress1,
                                        onChange: m,
                                        required: !0,
                                        className:
                                          "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                        placeholder: "Street address",
                                      }),
                                    ],
                                  }),
                                  c.jsxs("div", {
                                    children: [
                                      c.jsx("label", {
                                        className:
                                          "block text-sm font-medium text-gray-700 mb-2",
                                        children: "Apartment, suite, etc.",
                                      }),
                                      c.jsx("input", {
                                        type: "text",
                                        name: "billingApartment",
                                        value: r.billingApartment,
                                        onChange: m,
                                        className:
                                          "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                        placeholder: "Apartment, suite, etc.",
                                      }),
                                    ],
                                  }),
                                  c.jsxs("div", {
                                    className:
                                      "grid grid-cols-1 md:grid-cols-3 gap-4",
                                    children: [
                                      c.jsxs("div", {
                                        children: [
                                          c.jsx("label", {
                                            className:
                                              "block text-sm font-medium text-gray-700 mb-2",
                                            children: "City *",
                                          }),
                                          c.jsx("input", {
                                            type: "text",
                                            name: "billingCity",
                                            value: r.billingCity,
                                            onChange: m,
                                            required: !0,
                                            className:
                                              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                            placeholder: "City",
                                          }),
                                        ],
                                      }),
                                      c.jsxs("div", {
                                        children: [
                                          c.jsx("label", {
                                            className:
                                              "block text-sm font-medium text-gray-700 mb-2",
                                            children: "State *",
                                          }),
                                          c.jsxs("select", {
                                            name: "billingState",
                                            value: r.billingState,
                                            onChange: m,
                                            required: !0,
                                            className:
                                              "w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                            children: [
                                              c.jsx("option", {
                                                value: "",
                                                children: "Select State",
                                              }),
                                              c.jsx("option", {
                                                value: "CA",
                                                children: "California",
                                              }),
                                              c.jsx("option", {
                                                value: "NY",
                                                children: "New York",
                                              }),
                                              c.jsx("option", {
                                                value: "TX",
                                                children: "Texas",
                                              }),
                                              c.jsx("option", {
                                                value: "FL",
                                                children: "Florida",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      c.jsxs("div", {
                                        children: [
                                          c.jsx("label", {
                                            className:
                                              "block text-sm font-medium text-gray-700 mb-2",
                                            children: "ZIP Code *",
                                          }),
                                          c.jsx("input", {
                                            type: "text",
                                            name: "billingZipCode",
                                            value: r.billingZipCode,
                                            onChange: m,
                                            required: !0,
                                            className:
                                              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm",
                                            placeholder: "ZIP Code",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                          ],
                        }),
                      ],
                    }),
                    x &&
                      c.jsx("div", {
                        className: `p-4 rounded-lg ${
                          x.includes("successfully")
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`,
                        children: x,
                      }),
                    c.jsx("button", {
                      type: "submit",
                      disabled: d,
                      className:
                        "w-full bg-rose-600 text-white py-4 px-6 rounded-xl hover:bg-rose-700 transition-colors font-medium text-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed",
                      children: d
                        ? "Processing Order..."
                        : `Complete Order - $${(S * 1.08).toFixed(2)}`,
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
function Yv() {
  const { id: s } = zy(),
    [i, u] = z.useState("50ml"),
    [r, f] = z.useState(1),
    [d, h] = z.useState(0),
    [x, g] = z.useState("benefits"),
    [m, y] = z.useState(!1),
    { addToCart: S } = Fl(),
    N = tn.find((G) => G.id === s) || tn[0],
    b = [
      N.image,
      "https://readdy.ai/api/search-image?query=luxury%20premium%20skincare%20cream%20jar%20with%20elegant%20white%20and%20rose%20gold%20packaging%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20soft%20natural%20lighting%2C%20minimalist%20aesthetic%2C%20premium%20beauty%20product%20with%20botanical%20elements&width=400&height=400&seq=1&orientation=squarish",
      "https://readdy.ai/api/search-image?query=skincare%20cream%20texture%20close%20up%20shot%2C%20smooth%20white%20cream%20with%20rose%20gold%20shimmer%2C%20luxury%20cosmetic%20texture%2C%20macro%20photography%2C%20clean%20white%20background%2C%20premium%20beauty%20ingredients%20visible&width=400&height=400&seq=2&orientation=squarish",
      "https://readdy.ai/api/search-image?query=skincare%20product%20ingredients%20display%2C%20natural%20botanical%20extracts%20like%20rose%20petals%2C%20collagen%20peptides%2C%20hyaluronic%20acid%2C%20premium%20beauty%20ingredients%20arranged%20elegantly%20on%20white%20background%20with%20soft%20lighting&width=400&height=400&seq=3&orientation=squarish",
    ],
    w = ["30ml", "50ml", "100ml", "200ml"],
    T = () => {
      S({
        id: N.id,
        name: N.name,
        price: N.price,
        image: N.image,
        size: i,
        quantity: r,
      });
    },
    C = () => {
      y(!0);
    },
    D = (G) => {
      console.log("Toggle favorite:", G);
    },
    U = tn.filter((G) => G.id !== N.id).slice(0, 3),
    Q = [
      "Improves skin firmness and elasticity",
      "Reduces appearance of cellulite",
      "Deeply moisturizes and nourishes",
      "Enhances collagen production",
      "Smooths and tones skin texture",
    ],
    P = [
      { name: "Collagen Peptides", benefit: "Firming" },
      { name: "Hyaluronic Acid", benefit: "Hydrating" },
      { name: "Shea Butter", benefit: "Nourishing" },
      { name: "Caffeine Extract", benefit: "Toning" },
    ];
  return c.jsxs("div", {
    className: "min-h-screen bg-white",
    children: [
      c.jsx(Pl, {}),
      c.jsx("div", {
        className: "bg-gray-50 py-4",
        children: c.jsx("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: c.jsxs("nav", {
            className: "flex items-center space-x-2 text-sm",
            children: [
              c.jsx(Ze, {
                to: "/",
                className: "text-gray-500 hover:text-gray-700",
                children: "Home",
              }),
              c.jsx("i", { className: "ri-arrow-right-s-line text-gray-400" }),
              c.jsx(Ze, {
                to: "/products",
                className: "text-gray-500 hover:text-gray-700",
                children: "Body Care",
              }),
              c.jsx("i", { className: "ri-arrow-right-s-line text-gray-400" }),
              c.jsx("span", {
                className: "text-gray-900",
                children: "Firming Body Cream",
              }),
            ],
          }),
        }),
      }),
      c.jsx("div", {
        className: "py-12",
        children: c.jsx("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: c.jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
            children: [
              c.jsxs("div", {
                className: "space-y-4",
                children: [
                  c.jsx("div", {
                    className:
                      "aspect-square bg-gray-100 rounded-2xl overflow-hidden",
                    children: c.jsx("img", {
                      src: b[d],
                      alt: N.name,
                      className: "w-full h-full object-cover",
                    }),
                  }),
                  c.jsx("div", {
                    className: "grid grid-cols-4 gap-4",
                    children: b.map((G, I) =>
                      c.jsx(
                        "button",
                        {
                          onClick: () => h(I),
                          className: `aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                            d === I ? "border-rose-500" : "border-gray-200"
                          }`,
                          children: c.jsx("img", {
                            src: G,
                            alt: `Product view ${I + 1}`,
                            className: "w-full h-full object-cover",
                          }),
                        },
                        I
                      )
                    ),
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "space-y-6",
                children: [
                  c.jsxs("div", {
                    children: [
                      c.jsx("div", {
                        className: "flex items-center space-x-2 mb-2",
                        children: c.jsx("span", {
                          className:
                            "bg-rose-100 text-rose-600 px-2 py-1 rounded text-sm font-medium",
                          children: "Best Seller",
                        }),
                      }),
                      c.jsx("h1", {
                        className: "text-3xl font-bold text-gray-900 mb-4",
                        children: "Firming Body Cream",
                      }),
                      c.jsxs("div", {
                        className: "flex items-center mb-4",
                        children: [
                          c.jsx("div", {
                            className: "flex text-yellow-400 mr-2",
                            children: [...Array(5)].map((G, I) =>
                              c.jsx(
                                "i",
                                {
                                  className: `${
                                    I < Math.floor(N.rating)
                                      ? "ri-star-fill"
                                      : "ri-star-line"
                                  } text-lg`,
                                },
                                I
                              )
                            ),
                          }),
                          c.jsx("span", {
                            className: "text-gray-600",
                            children: "4.8 (324 reviews)",
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "flex items-center space-x-4 mb-6",
                        children: [
                          c.jsxs("span", {
                            className: "text-3xl font-bold text-gray-900",
                            children: ["$", N.price],
                          }),
                          c.jsx("span", {
                            className: "text-xl text-gray-500 line-through",
                            children: "$99.99",
                          }),
                          c.jsx("span", {
                            className:
                              "bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium",
                            children: "20% OFF",
                          }),
                        ],
                      }),
                      c.jsx("p", {
                        className: "text-gray-600 leading-relaxed",
                        children:
                          "Transform your body with our advanced firming cream. This luxurious formula combines powerful peptides, collagen-boosting ingredients, and natural extracts to visibly improve skin firmness and elasticity. Perfect for targeting areas prone to cellulite and sagging skin.",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    children: [
                      c.jsx("h3", {
                        className: "text-lg font-medium text-gray-900 mb-3",
                        children: "Size",
                      }),
                      c.jsx("div", {
                        className: "flex space-x-3",
                        children: w.map((G) =>
                          c.jsx(
                            "button",
                            {
                              onClick: () => u(G),
                              className: `px-4 py-2 rounded-lg border transition-colors ${
                                i === G
                                  ? "border-rose-500 bg-rose-50 text-rose-600"
                                  : "border-gray-300 text-gray-700 hover:border-gray-400"
                              }`,
                              children: G,
                            },
                            G
                          )
                        ),
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    children: [
                      c.jsx("h3", {
                        className: "text-lg font-medium text-gray-900 mb-3",
                        children: "Quantity",
                      }),
                      c.jsxs("div", {
                        className: "flex items-center space-x-4",
                        children: [
                          c.jsxs("div", {
                            className:
                              "flex items-center border border-gray-300 rounded-lg",
                            children: [
                              c.jsx("button", {
                                onClick: () => f(Math.max(1, r - 1)),
                                className:
                                  "p-2 hover:bg-gray-50 transition-colors",
                                children: c.jsx("i", {
                                  className: "ri-subtract-line text-gray-600",
                                }),
                              }),
                              c.jsx("span", {
                                className:
                                  "px-4 py-2 text-gray-900 font-medium",
                                children: r,
                              }),
                              c.jsx("button", {
                                onClick: () => f(r + 1),
                                className:
                                  "p-2 hover->bg-gray-50 transition-colors",
                                children: c.jsx("i", {
                                  className: "ri-add-line text-gray-600",
                                }),
                              }),
                            ],
                          }),
                          c.jsx("span", {
                            className: "text-gray-600",
                            children: "In stock",
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "space-y-4",
                    children: [
                      c.jsx("button", {
                        onClick: T,
                        className:
                          "w-full bg-rose-600 text-white py-4 px-6 rounded-xl hover:bg-rose-700 transition-colors font-medium text-lg whitespace-nowrap",
                        children: "Add to Cart",
                      }),
                      c.jsx("button", {
                        onClick: C,
                        className:
                          "w-full border border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors font-medium whitespace-nowrap",
                        children: "Buy Now",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className:
                      "grid grid-cols-2 gap-4 pt-6 border-t border-gray-200",
                    children: [
                      c.jsxs("div", {
                        className: "flex items-center space-x-2",
                        children: [
                          c.jsx("i", {
                            className: "ri-truck-line text-rose-600",
                          }),
                          c.jsx("span", {
                            className: "text-sm text-gray-600",
                            children: "Free shipping over $75",
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "flex items-center space-x-2",
                        children: [
                          c.jsx("i", {
                            className: "ri-shield-check-line text-rose-600",
                          }),
                          c.jsx("span", {
                            className: "text-sm text-gray-600",
                            children: "30-day return policy",
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "flex items-center space-x-2",
                        children: [
                          c.jsx("i", {
                            className: "ri-award-line text-rose-600",
                          }),
                          c.jsx("span", {
                            className: "text-sm text-gray-600",
                            children: "Quality guaranteed",
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "flex items-center space-x-2",
                        children: [
                          c.jsx("i", {
                            className: "ri-customer-service-line text-rose-600",
                          }),
                          c.jsx("span", {
                            className: "text-sm text-gray-600",
                            children: "24/7 customer support",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      c.jsx("div", {
        className: "bg-gray-50 py-12",
        children: c.jsx("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: c.jsxs("div", {
            className: "bg-white rounded-2xl shadow-lg overflow-hidden",
            children: [
              c.jsx("div", {
                className: "border-b border-gray-200",
                children: c.jsx("nav", {
                  className: "flex",
                  children: [
                    { id: "benefits", label: "Benefits" },
                    { id: "ingredients", label: "Ingredients" },
                    { id: "usage", label: "How to Use" },
                  ].map((G) =>
                    c.jsx(
                      "button",
                      {
                        onClick: () => g(G.id),
                        className: `px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                          x === G.id
                            ? "text-rose-600 border-b-2 border-rose-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`,
                        children: G.label,
                      },
                      G.id
                    )
                  ),
                }),
              }),
              c.jsxs("div", {
                className: "p-8",
                children: [
                  x === "benefits" &&
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "text-xl font-semibold text-gray-900 mb-6",
                          children: "Key Benefits",
                        }),
                        c.jsxs("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                          children: [
                            c.jsx("div", {
                              children: c.jsx("ul", {
                                className: "space-y-3",
                                children: Q.map((G, I) =>
                                  c.jsxs(
                                    "li",
                                    {
                                      className: "flex items-start space-x-3",
                                      children: [
                                        c.jsx("i", {
                                          className:
                                            "ri-check-line text-rose-600 mt-1",
                                        }),
                                        c.jsx("span", {
                                          className: "text-gray-700",
                                          children: G,
                                        }),
                                      ],
                                    },
                                    I
                                  )
                                ),
                              }),
                            }),
                            c.jsxs("div", {
                              className: "bg-rose-50 p-6 rounded-xl",
                              children: [
                                c.jsx("h4", {
                                  className: "font-semibold text-gray-900 mb-3",
                                  children: "Clinical Results",
                                }),
                                c.jsxs("div", {
                                  className: "space-y-2",
                                  children: [
                                    c.jsxs("div", {
                                      className: "flex justify-between",
                                      children: [
                                        c.jsx("span", {
                                          className: "text-gray-600",
                                          children: "Improved firmness",
                                        }),
                                        c.jsx("span", {
                                          className:
                                            "font-semibold text-rose-600",
                                          children: "87%",
                                        }),
                                      ],
                                    }),
                                    c.jsxs("div", {
                                      className: "flex justify-between",
                                      children: [
                                        c.jsx("span", {
                                          className: "text-gray-600",
                                          children:
                                            "Reduced cellulite appearance",
                                        }),
                                        c.jsx("span", {
                                          className:
                                            "font-semibold text-rose-600",
                                          children: "73%",
                                        }),
                                      ],
                                    }),
                                    c.jsxs("div", {
                                      className: "flex justify-between",
                                      children: [
                                        c.jsx("span", {
                                          className: "text-gray-600",
                                          children: "Enhanced skin texture",
                                        }),
                                        c.jsx("span", {
                                          className:
                                            "font-semibold text-rose-600",
                                          children: "92%",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  x === "ingredients" &&
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "text-xl font-semibold text-gray-900 mb-6",
                          children: "Active Ingredients",
                        }),
                        c.jsx("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                          children: P.map((G, I) =>
                            c.jsxs(
                              "div",
                              {
                                className:
                                  "flex items-center justify-between p-4 bg-gray-50 rounded-lg",
                                children: [
                                  c.jsxs("div", {
                                    children: [
                                      c.jsx("h4", {
                                        className: "font-medium text-gray-900",
                                        children: G.name,
                                      }),
                                      c.jsx("p", {
                                        className: "text-sm text-gray-600",
                                        children: G.benefit,
                                      }),
                                    ],
                                  }),
                                  c.jsx("span", {
                                    className:
                                      "bg-rose-100 text-rose-600 px-2 py-1 rounded text-xs font-medium",
                                    children: G.benefit,
                                  }),
                                ],
                              },
                              I
                            )
                          ),
                        }),
                      ],
                    }),
                  x === "usage" &&
                    c.jsxs("div", {
                      children: [
                        c.jsx("h3", {
                          className: "text-xl font-semibold text-gray-900 mb-6",
                          children: "How to Use",
                        }),
                        c.jsxs("div", {
                          className: "space-y-4",
                          children: [
                            c.jsxs("div", {
                              className: "flex items-start space-x-4",
                              children: [
                                c.jsx("div", {
                                  className:
                                    "w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-semibold text-sm",
                                  children: "1",
                                }),
                                c.jsxs("div", {
                                  children: [
                                    c.jsx("h4", {
                                      className:
                                        "font-medium text-gray-900 mb-1",
                                      children: "Clean your skin",
                                    }),
                                    c.jsx("p", {
                                      className: "text-gray-600",
                                      children:
                                        "Start with clean, dry skin. Massage in circular motions until fully absorbed.",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              className: "flex items-start space-x-4",
                              children: [
                                c.jsx("div", {
                                  className:
                                    "w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-semibold text-sm",
                                  children: "2",
                                }),
                                c.jsxs("div", {
                                  children: [
                                    c.jsx("h4", {
                                      className:
                                        "font-medium text-gray-900 mb-1",
                                      children: "Apply generously",
                                    }),
                                    c.jsx("p", {
                                      className: "text-gray-600",
                                      children:
                                        "Use twice daily for best results.",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                ],
              }),
            ],
          }),
        }),
      }),
      c.jsx("div", {
        className: "py-16",
        children: c.jsxs("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: [
            c.jsx("h2", {
              className: "text-3xl font-bold text-gray-900 mb-8 text-center",
              children: "You Might Also Like",
            }),
            c.jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-8",
              children: U.map((G) =>
                c.jsx(
                  _o,
                  {
                    ...G,
                    onAddToCart: (I) => {
                      const oe = tn.find((Se) => Se.id === I);
                      oe &&
                        S({
                          id: oe.id,
                          name: oe.name,
                          price: oe.price,
                          image: oe.image,
                        });
                    },
                    onToggleFavorite: D,
                  },
                  G.id
                )
              ),
            }),
          ],
        }),
      }),
      c.jsx(kv, {
        isOpen: m,
        onClose: () => y(!1),
        product: {
          id: N.id,
          name: N.name,
          price: N.price,
          image: N.image,
          size: i,
          quantity: r,
        },
      }),
      c.jsx(Wl, {}),
    ],
  });
}
const Im = [
    { path: "/", element: c.jsx(Uv, {}) },
    { path: "/signup", element: c.jsx(qv, {}) },
    { path: "/signin", element: c.jsx(Hv, {}) },
    { path: "/products", element: c.jsx(Bv, {}) },
    { path: "/product/:id", element: c.jsx(Yv, {}) },
    { path: "*", element: c.jsx(Av, {}) },
  ],
  Gv = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Im },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
let eg;
const Vv = new Promise((s) => {
  eg = s;
});
function tg() {
  const s = Uy(Im);
  if (!window.REACT_APP_NAVIGATE) {
    const i = Xm();
    z.useEffect(() => {
      (window.REACT_APP_NAVIGATE = i), eg(window.REACT_APP_NAVIGATE);
    });
  }
  return s;
}
const Qv = Object.freeze(
  Object.defineProperty(
    { __proto__: null, AppRoutes: tg, navigatePromise: Vv },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function Xv() {
  return c.jsx(yv, {
    basename: "/preview/aa27a765-101a-4fd5-a6c5-e8c66e45a4f0/2956086",
    children: c.jsx(tg, {}),
  });
}
iy.createRoot(document.getElementById("root")).render(
  c.jsx(z.StrictMode, { children: c.jsx(Xv, {}) })
);
// # sourceMappingURL=index-B1vHmHUk.js.map