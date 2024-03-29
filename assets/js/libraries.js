this.createjs = this.createjs || {}, function () {
    "use strict";
    var a = createjs.PreloadJS = createjs.PreloadJS || {};
    a.version = "0.6.3", a.buildDate = "Tue, 15 Sep 2015 20:59:37 GMT"
}(), this.createjs = this.createjs || {}, createjs.extend = function (a, b) {
    "use strict";

    function c() {
        this.constructor = a
    }

    return c.prototype = b.prototype, a.prototype = new c
}, this.createjs = this.createjs || {}, createjs.promote = function (a, b) {
    "use strict";
    var c = a.prototype, d = Object.getPrototypeOf && Object.getPrototypeOf(c) || c.__proto__;
    if (d) {
        c[(b += "_") + "constructor"] = d.constructor;
        for (var e in d) c.hasOwnProperty(e) && "function" == typeof d[e] && (c[b + e] = d[e])
    }
    return a
}, this.createjs = this.createjs || {}, createjs.indexOf = function (a, b) {
    "use strict";
    for (var c = 0, d = a.length; d > c; c++) if (b === a[c]) return c;
    return -1
}, this.createjs = this.createjs || {}, function () {
    "use strict";
    createjs.proxy = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        return function () {
            return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c))
        }
    }
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a() {
        throw"BrowserDetect cannot be instantiated"
    }

    var b = a.agent = window.navigator.userAgent;
    a.isWindowPhone = b.indexOf("IEMobile") > -1 || b.indexOf("Windows Phone") > -1, a.isFirefox = b.indexOf("Firefox") > -1, a.isOpera = null != window.opera, a.isChrome = b.indexOf("Chrome") > -1, a.isIOS = (b.indexOf("iPod") > -1 || b.indexOf("iPhone") > -1 || b.indexOf("iPad") > -1) && !a.isWindowPhone, a.isAndroid = b.indexOf("Android") > -1 && !a.isWindowPhone, a.isBlackberry = b.indexOf("Blackberry") > -1, createjs.BrowserDetect = a
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b, c) {
        this.type = a, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!b, this.cancelable = !!c, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1
    }

    var b = a.prototype;
    b.preventDefault = function () {
        this.defaultPrevented = this.cancelable && !0
    }, b.stopPropagation = function () {
        this.propagationStopped = !0
    }, b.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }, b.remove = function () {
        this.removed = !0
    }, b.clone = function () {
        return new a(this.type, this.bubbles, this.cancelable)
    }, b.set = function (a) {
        for (var b in a) this[b] = a[b];
        return this
    }, b.toString = function () {
        return "[Event (type=" + this.type + ")]"
    }, createjs.Event = a
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b, c) {
        this.Event_constructor("error"), this.title = a, this.message = b, this.data = c
    }

    var b = createjs.extend(a, createjs.Event);
    b.clone = function () {
        return new createjs.ErrorEvent(this.title, this.message, this.data)
    }, createjs.ErrorEvent = createjs.promote(a, "Event")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a() {
        this._listeners = null, this._captureListeners = null
    }

    var b = a.prototype;
    a.initialize = function (a) {
        a.addEventListener = b.addEventListener, a.on = b.on, a.removeEventListener = a.off = b.removeEventListener, a.removeAllEventListeners = b.removeAllEventListeners, a.hasEventListener = b.hasEventListener, a.dispatchEvent = b.dispatchEvent, a._dispatchEvent = b._dispatchEvent, a.willTrigger = b.willTrigger
    }, b.addEventListener = function (a, b, c) {
        var d;
        d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var e = d[a];
        return e && this.removeEventListener(a, b, c), e = d[a], e ? e.push(b) : d[a] = [b], b
    }, b.on = function (a, b, c, d, e, f) {
        return b.handleEvent && (c = c || b, b = b.handleEvent), c = c || this, this.addEventListener(a, function (a) {
            b.call(c, a, e), d && a.remove()
        }, f)
    }, b.removeEventListener = function (a, b, c) {
        var d = c ? this._captureListeners : this._listeners;
        if (d) {
            var e = d[a];
            if (e) for (var f = 0, g = e.length; g > f; f++) if (e[f] == b) {
                1 == g ? delete d[a] : e.splice(f, 1);
                break
            }
        }
    }, b.off = b.removeEventListener, b.removeAllEventListeners = function (a) {
        a ? (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    }, b.dispatchEvent = function (a) {
        if ("string" == typeof a) {
            var b = this._listeners;
            if (!b || !b[a]) return !1;
            a = new createjs.Event(a)
        } else a.target && a.clone && (a = a.clone());
        try {
            a.target = this
        } catch (c) {
        }
        if (a.bubbles && this.parent) {
            for (var d = this, e = [d]; d.parent;) e.push(d = d.parent);
            var f, g = e.length;
            for (f = g - 1; f >= 0 && !a.propagationStopped; f--) e[f]._dispatchEvent(a, 1 + (0 == f));
            for (f = 1; g > f && !a.propagationStopped; f++) e[f]._dispatchEvent(a, 3)
        } else this._dispatchEvent(a, 2);
        return a.defaultPrevented
    }, b.hasEventListener = function (a) {
        var b = this._listeners, c = this._captureListeners;
        return !!(b && b[a] || c && c[a])
    }, b.willTrigger = function (a) {
        for (var b = this; b;) {
            if (b.hasEventListener(a)) return !0;
            b = b.parent
        }
        return !1
    }, b.toString = function () {
        return "[EventDispatcher]"
    }, b._dispatchEvent = function (a, b) {
        var c, d = 1 == b ? this._captureListeners : this._listeners;
        if (a && d) {
            var e = d[a.type];
            if (!e || !(c = e.length)) return;
            try {
                a.currentTarget = this
            } catch (f) {
            }
            try {
                a.eventPhase = b
            } catch (f) {
            }
            a.removed = !1, e = e.slice();
            for (var g = 0; c > g && !a.immediatePropagationStopped; g++) {
                var h = e[g];
                h.handleEvent ? h.handleEvent(a) : h(a), a.removed && (this.off(a.type, h, 1 == b), a.removed = !1)
            }
        }
    }, createjs.EventDispatcher = a
}(), this.createjs = this.createjs || {}, function (a) {
    "use strict";

    function b(a, b) {
        this.Event_constructor("progress"), this.loaded = a, this.total = null == b ? 1 : b, this.progress = 0 == b ? 0 : this.loaded / this.total
    }

    var c = createjs.extend(b, createjs.Event);
    c.clone = function () {
        return new createjs.ProgressEvent(this.loaded, this.total)
    }, createjs.ProgressEvent = createjs.promote(b, "Event")
}(window), function () {
    function a(b, d) {
        function f(a) {
            if (f[a] !== q) return f[a];
            var b;
            if ("bug-string-char-index" == a) b = "a" != "a"[0]; else if ("json" == a) b = f("json-stringify") && f("json-parse"); else {
                var c, e = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                if ("json-stringify" == a) {
                    var i = d.stringify, k = "function" == typeof i && t;
                    if (k) {
                        (c = function () {
                            return 1
                        }).toJSON = c;
                        try {
                            k = "0" === i(0) && "0" === i(new g) && '""' == i(new h) && i(s) === q && i(q) === q && i() === q && "1" === i(c) && "[1]" == i([c]) && "[null]" == i([q]) && "null" == i(null) && "[null,null,null]" == i([q, s, null]) && i({a: [c, !0, !1, null, "\0\b\n\f\r\t"]}) == e && "1" === i(null, c) && "[\n 1,\n 2\n]" == i([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == i(new j((-864e13))) && '"+275760-09-13T00:00:00.000Z"' == i(new j(864e13)) && '"-000001-01-01T00:00:00.000Z"' == i(new j((-621987552e5))) && '"1969-12-31T23:59:59.999Z"' == i(new j((-1)))
                        } catch (l) {
                            k = !1
                        }
                    }
                    b = k
                }
                if ("json-parse" == a) {
                    var m = d.parse;
                    if ("function" == typeof m) try {
                        if (0 === m("0") && !m(!1)) {
                            c = m(e);
                            var n = 5 == c.a.length && 1 === c.a[0];
                            if (n) {
                                try {
                                    n = !m('"\t"')
                                } catch (l) {
                                }
                                if (n) try {
                                    n = 1 !== m("01")
                                } catch (l) {
                                }
                                if (n) try {
                                    n = 1 !== m("1.")
                                } catch (l) {
                                }
                            }
                        }
                    } catch (l) {
                        n = !1
                    }
                    b = n
                }
            }
            return f[a] = !!b
        }

        b || (b = e.Object()), d || (d = e.Object());
        var g = b.Number || e.Number, h = b.String || e.String, i = b.Object || e.Object, j = b.Date || e.Date,
            k = b.SyntaxError || e.SyntaxError, l = b.TypeError || e.TypeError, m = b.Math || e.Math,
            n = b.JSON || e.JSON;
        "object" == typeof n && n && (d.stringify = n.stringify, d.parse = n.parse);
        var o, p, q, r = i.prototype, s = r.toString, t = new j((-0xc782b5b800cec));
        try {
            t = -109252 == t.getUTCFullYear() && 0 === t.getUTCMonth() && 1 === t.getUTCDate() && 10 == t.getUTCHours() && 37 == t.getUTCMinutes() && 6 == t.getUTCSeconds() && 708 == t.getUTCMilliseconds()
        } catch (u) {
        }
        if (!f("json")) {
            var v = "[object Function]", w = "[object Date]", x = "[object Number]", y = "[object String]",
                z = "[object Array]", A = "[object Boolean]", B = f("bug-string-char-index");
            if (!t) var C = m.floor, D = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], E = function (a, b) {
                return D[b] + 365 * (a - 1970) + C((a - 1969 + (b = +(b > 1))) / 4) - C((a - 1901 + b) / 100) + C((a - 1601 + b) / 400)
            };
            if ((o = r.hasOwnProperty) || (o = function (a) {
                    var b, c = {};
                    return (c.__proto__ = null, c.__proto__ = {toString: 1}, c).toString != s ? o = function (a) {
                        var b = this.__proto__, c = a in (this.__proto__ = null, this);
                        return this.__proto__ = b, c
                    } : (b = c.constructor, o = function (a) {
                        var c = (this.constructor || b).prototype;
                        return a in this && !(a in c && this[a] === c[a])
                    }), c = null, o.call(this, a)
                }), p = function (a, b) {
                    var d, e, f, g = 0;
                    (d = function () {
                        this.valueOf = 0
                    }).prototype.valueOf = 0, e = new d;
                    for (f in e) o.call(e, f) && g++;
                    return d = e = null, g ? p = 2 == g ? function (a, b) {
                        var c, d = {}, e = s.call(a) == v;
                        for (c in a) e && "prototype" == c || o.call(d, c) || !(d[c] = 1) || !o.call(a, c) || b(c)
                    } : function (a, b) {
                        var c, d, e = s.call(a) == v;
                        for (c in a) e && "prototype" == c || !o.call(a, c) || (d = "constructor" === c) || b(c);
                        (d || o.call(a, c = "constructor")) && b(c)
                    } : (e = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], p = function (a, b) {
                        var d, f, g = s.call(a) == v,
                            h = !g && "function" != typeof a.constructor && c[typeof a.hasOwnProperty] && a.hasOwnProperty || o;
                        for (d in a) g && "prototype" == d || !h.call(a, d) || b(d);
                        for (f = e.length; d = e[--f]; h.call(a, d) && b(d)) ;
                    }), p(a, b)
                }, !f("json-stringify")) {
                var F = {92: "\\\\", 34: '\\"', 8: "\\b", 12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t"}, G = "000000",
                    H = function (a, b) {
                        return (G + (b || 0)).slice(-a)
                    }, I = "\\u00", J = function (a) {
                        for (var b = '"', c = 0, d = a.length, e = !B || d > 10, f = e && (B ? a.split("") : a); d > c; c++) {
                            var g = a.charCodeAt(c);
                            switch (g) {
                                case 8:
                                case 9:
                                case 10:
                                case 12:
                                case 13:
                                case 34:
                                case 92:
                                    b += F[g];
                                    break;
                                default:
                                    if (32 > g) {
                                        b += I + H(2, g.toString(16));
                                        break
                                    }
                                    b += e ? f[c] : a.charAt(c)
                            }
                        }
                        return b + '"'
                    }, K = function (a, b, c, d, e, f, g) {
                        var h, i, j, k, m, n, r, t, u, v, B, D, F, G, I, L;
                        try {
                            h = b[a]
                        } catch (M) {
                        }
                        if ("object" == typeof h && h) if (i = s.call(h), i != w || o.call(h, "toJSON")) "function" == typeof h.toJSON && (i != x && i != y && i != z || o.call(h, "toJSON")) && (h = h.toJSON(a)); else if (h > -1 / 0 && 1 / 0 > h) {
                            if (E) {
                                for (m = C(h / 864e5), j = C(m / 365.2425) + 1970 - 1; E(j + 1, 0) <= m; j++) ;
                                for (k = C((m - E(j, 0)) / 30.42); E(j, k + 1) <= m; k++) ;
                                m = 1 + m - E(j, k), n = (h % 864e5 + 864e5) % 864e5, r = C(n / 36e5) % 24, t = C(n / 6e4) % 60, u = C(n / 1e3) % 60, v = n % 1e3
                            } else j = h.getUTCFullYear(), k = h.getUTCMonth(), m = h.getUTCDate(), r = h.getUTCHours(), t = h.getUTCMinutes(), u = h.getUTCSeconds(), v = h.getUTCMilliseconds();
                            h = (0 >= j || j >= 1e4 ? (0 > j ? "-" : "+") + H(6, 0 > j ? -j : j) : H(4, j)) + "-" + H(2, k + 1) + "-" + H(2, m) + "T" + H(2, r) + ":" + H(2, t) + ":" + H(2, u) + "." + H(3, v) + "Z"
                        } else h = null;
                        if (c && (h = c.call(b, a, h)), null === h) return "null";
                        if (i = s.call(h), i == A) return "" + h;
                        if (i == x) return h > -1 / 0 && 1 / 0 > h ? "" + h : "null";
                        if (i == y) return J("" + h);
                        if ("object" == typeof h) {
                            for (G = g.length; G--;) if (g[G] === h) throw l();
                            if (g.push(h), B = [], I = f, f += e, i == z) {
                                for (F = 0, G = h.length; G > F; F++) D = K(F, h, c, d, e, f, g), B.push(D === q ? "null" : D);
                                L = B.length ? e ? "[\n" + f + B.join(",\n" + f) + "\n" + I + "]" : "[" + B.join(",") + "]" : "[]"
                            } else p(d || h, function (a) {
                                var b = K(a, h, c, d, e, f, g);
                                b !== q && B.push(J(a) + ":" + (e ? " " : "") + b)
                            }), L = B.length ? e ? "{\n" + f + B.join(",\n" + f) + "\n" + I + "}" : "{" + B.join(",") + "}" : "{}";
                            return g.pop(), L
                        }
                    };
                d.stringify = function (a, b, d) {
                    var e, f, g, h;
                    if (c[typeof b] && b) if ((h = s.call(b)) == v) f = b; else if (h == z) {
                        g = {};
                        for (var i, j = 0, k = b.length; k > j; i = b[j++], h = s.call(i), (h == y || h == x) && (g[i] = 1)) ;
                    }
                    if (d) if ((h = s.call(d)) == x) {
                        if ((d -= d % 1) > 0) for (e = "", d > 10 && (d = 10); e.length < d; e += " ") ;
                    } else h == y && (e = d.length <= 10 ? d : d.slice(0, 10));
                    return K("", (i = {}, i[""] = a, i), f, g, e, "", [])
                }
            }
            if (!f("json-parse")) {
                var L, M, N = h.fromCharCode,
                    O = {92: "\\", 34: '"', 47: "/", 98: "\b", 116: "\t", 110: "\n", 102: "\f", 114: "\r"},
                    P = function () {
                        throw L = M = null, k()
                    }, Q = function () {
                        for (var a, b, c, d, e, f = M, g = f.length; g > L;) switch (e = f.charCodeAt(L)) {
                            case 9:
                            case 10:
                            case 13:
                            case 32:
                                L++;
                                break;
                            case 123:
                            case 125:
                            case 91:
                            case 93:
                            case 58:
                            case 44:
                                return a = B ? f.charAt(L) : f[L], L++, a;
                            case 34:
                                for (a = "@", L++; g > L;) if (e = f.charCodeAt(L), 32 > e) P(); else if (92 == e) switch (e = f.charCodeAt(++L)) {
                                    case 92:
                                    case 34:
                                    case 47:
                                    case 98:
                                    case 116:
                                    case 110:
                                    case 102:
                                    case 114:
                                        a += O[e], L++;
                                        break;
                                    case 117:
                                        for (b = ++L, c = L + 4; c > L; L++) e = f.charCodeAt(L), e >= 48 && 57 >= e || e >= 97 && 102 >= e || e >= 65 && 70 >= e || P();
                                        a += N("0x" + f.slice(b, L));
                                        break;
                                    default:
                                        P()
                                } else {
                                    if (34 == e) break;
                                    for (e = f.charCodeAt(L), b = L; e >= 32 && 92 != e && 34 != e;) e = f.charCodeAt(++L);
                                    a += f.slice(b, L)
                                }
                                if (34 == f.charCodeAt(L)) return L++, a;
                                P();
                            default:
                                if (b = L, 45 == e && (d = !0, e = f.charCodeAt(++L)), e >= 48 && 57 >= e) {
                                    for (48 == e && (e = f.charCodeAt(L + 1), e >= 48 && 57 >= e) && P(), d = !1; g > L && (e = f.charCodeAt(L), e >= 48 && 57 >= e); L++) ;
                                    if (46 == f.charCodeAt(L)) {
                                        for (c = ++L; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++) ;
                                        c == L && P(), L = c
                                    }
                                    if (e = f.charCodeAt(L), 101 == e || 69 == e) {
                                        for (e = f.charCodeAt(++L), (43 == e || 45 == e) && L++, c = L; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++) ;
                                        c == L && P(), L = c
                                    }
                                    return +f.slice(b, L)
                                }
                                if (d && P(), "true" == f.slice(L, L + 4)) return L += 4, !0;
                                if ("false" == f.slice(L, L + 5)) return L += 5, !1;
                                if ("null" == f.slice(L, L + 4)) return L += 4, null;
                                P()
                        }
                        return "$"
                    }, R = function (a) {
                        var b, c;
                        if ("$" == a && P(), "string" == typeof a) {
                            if ("@" == (B ? a.charAt(0) : a[0])) return a.slice(1);
                            if ("[" == a) {
                                for (b = []; a = Q(), "]" != a; c || (c = !0)) c && ("," == a ? (a = Q(), "]" == a && P()) : P()), "," == a && P(), b.push(R(a));
                                return b
                            }
                            if ("{" == a) {
                                for (b = {}; a = Q(), "}" != a; c || (c = !0)) c && ("," == a ? (a = Q(), "}" == a && P()) : P()), ("," == a || "string" != typeof a || "@" != (B ? a.charAt(0) : a[0]) || ":" != Q()) && P(), b[a.slice(1)] = R(Q());
                                return b
                            }
                            P()
                        }
                        return a
                    }, S = function (a, b, c) {
                        var d = T(a, b, c);
                        d === q ? delete a[b] : a[b] = d
                    }, T = function (a, b, c) {
                        var d, e = a[b];
                        if ("object" == typeof e && e) if (s.call(e) == z) for (d = e.length; d--;) S(e, d, c); else p(e, function (a) {
                            S(e, a, c)
                        });
                        return c.call(a, b, e)
                    };
                d.parse = function (a, b) {
                    var c, d;
                    return L = 0, M = "" + a, c = R(Q()), "$" != Q() && P(), L = M = null, b && s.call(b) == v ? T((d = {}, d[""] = c, d), "", b) : c
                }
            }
        }
        return d.runInContext = a, d
    }

    var b = "function" == typeof define && define.amd, c = {"function": !0, object: !0},
        d = c[typeof exports] && exports && !exports.nodeType && exports, e = c[typeof window] && window || this,
        f = d && c[typeof module] && module && !module.nodeType && "object" == typeof global && global;
    if (!f || f.global !== f && f.window !== f && f.self !== f || (e = f), d && !b) a(e, d); else {
        var g = e.JSON, h = e.JSON3, i = !1, j = a(e, e.JSON3 = {
            noConflict: function () {
                return i || (i = !0, e.JSON = g, e.JSON3 = h, g = h = null), j
            }
        });
        e.JSON = {parse: j.parse, stringify: j.stringify}
    }
    b && define(function () {
        return j
    })
}.call(this), function () {
    var a = {};
    a.appendToHead = function (b) {
        a.getHead().appendChild(b)
    }, a.getHead = function () {
        return document.head || document.getElementsByTagName("head")[0]
    }, a.getBody = function () {
        return document.body || document.getElementsByTagName("body")[0]
    }, createjs.DomUtils = a
}(), function () {
    var a = {};
    a.parseXML = function (a, b) {
        var c = null;
        try {
            if (window.DOMParser) {
                var d = new DOMParser;
                c = d.parseFromString(a, b)
            }
        } catch (e) {
        }
        if (!c) try {
            c = new ActiveXObject("Microsoft.XMLDOM"), c.async = !1, c.loadXML(a)
        } catch (e) {
            c = null
        }
        return c
    }, a.parseJSON = function (a) {
        if (null == a) return null;
        try {
            return JSON.parse(a)
        } catch (b) {
            throw b
        }
    }, createjs.DataUtils = a
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a() {
        this.src = null, this.type = null, this.id = null, this.maintainOrder = !1, this.callback = null, this.data = null, this.method = createjs.LoadItem.GET, this.values = null, this.headers = null, this.withCredentials = !1, this.mimeType = null, this.crossOrigin = null, this.loadTimeout = c.LOAD_TIMEOUT_DEFAULT
    }

    var b = a.prototype = {}, c = a;
    c.LOAD_TIMEOUT_DEFAULT = 8e3, c.create = function (b) {
        if ("string" == typeof b) {
            var d = new a;
            return d.src = b, d
        }
        if (b instanceof c) return b;
        if (b instanceof Object && b.src) return null == b.loadTimeout && (b.loadTimeout = c.LOAD_TIMEOUT_DEFAULT), b;
        throw new Error("Type not recognized.")
    }, b.set = function (a) {
        for (var b in a) this[b] = a[b];
        return this
    }, createjs.LoadItem = c
}(), function () {
    var a = {};
    a.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i, a.RELATIVE_PATT = /^[.\/]*?\//i, a.EXTENSION_PATT = /\/?[^\/]+\.(\w{1,5})$/i, a.parseURI = function (b) {
        var c = {absolute: !1, relative: !1};
        if (null == b) return c;
        var d = b.indexOf("?");
        d > -1 && (b = b.substr(0, d));
        var e;
        return a.ABSOLUTE_PATT.test(b) ? c.absolute = !0 : a.RELATIVE_PATT.test(b) && (c.relative = !0), (e = b.match(a.EXTENSION_PATT)) && (c.extension = e[1].toLowerCase()), c
    }, a.formatQueryString = function (a, b) {
        if (null == a) throw new Error("You must specify data.");
        var c = [];
        for (var d in a) c.push(d + "=" + escape(a[d]));
        return b && (c = c.concat(b)), c.join("&")
    }, a.buildPath = function (a, b) {
        if (null == b) return a;
        var c = [], d = a.indexOf("?");
        if (-1 != d) {
            var e = a.slice(d + 1);
            c = c.concat(e.split("&"))
        }
        return -1 != d ? a.slice(0, d) + "?" + this._formatQueryString(b, c) : a + "?" + this._formatQueryString(b, c)
    }, a.isCrossDomain = function (a) {
        var b = document.createElement("a");
        b.href = a.src;
        var c = document.createElement("a");
        c.href = location.href;
        var d = "" != b.hostname && (b.port != c.port || b.protocol != c.protocol || b.hostname != c.hostname);
        return d
    }, a.isLocal = function (a) {
        var b = document.createElement("a");
        return b.href = a.src, "" == b.hostname && "file:" == b.protocol
    }, a.isBinary = function (a) {
        switch (a) {
            case createjs.AbstractLoader.IMAGE:
            case createjs.AbstractLoader.BINARY:
                return !0;
            default:
                return !1
        }
    }, a.isImageTag = function (a) {
        return a instanceof HTMLImageElement
    }, a.isAudioTag = function (a) {
        return !!window.HTMLAudioElement && a instanceof HTMLAudioElement
    }, a.isVideoTag = function (a) {
        return !!window.HTMLVideoElement && a instanceof HTMLVideoElement
    }, a.isText = function (a) {
        switch (a) {
            case createjs.AbstractLoader.TEXT:
            case createjs.AbstractLoader.JSON:
            case createjs.AbstractLoader.MANIFEST:
            case createjs.AbstractLoader.XML:
            case createjs.AbstractLoader.CSS:
            case createjs.AbstractLoader.SVG:
            case createjs.AbstractLoader.JAVASCRIPT:
            case createjs.AbstractLoader.SPRITESHEET:
                return !0;
            default:
                return !1
        }
    }, a.getTypeByExtension = function (a) {
        if (null == a) return createjs.AbstractLoader.TEXT;
        switch (a.toLowerCase()) {
            case"jpeg":
            case"jpg":
            case"gif":
            case"png":
            case"webp":
            case"bmp":
                return createjs.AbstractLoader.IMAGE;
            case"ogg":
            case"mp3":
            case"webm":
                return createjs.AbstractLoader.SOUND;
            case"mp4":
            case"webm":
            case"ts":
                return createjs.AbstractLoader.VIDEO;
            case"json":
                return createjs.AbstractLoader.JSON;
            case"xml":
                return createjs.AbstractLoader.XML;
            case"css":
                return createjs.AbstractLoader.CSS;
            case"js":
                return createjs.AbstractLoader.JAVASCRIPT;
            case"svg":
                return createjs.AbstractLoader.SVG;
            default:
                return createjs.AbstractLoader.TEXT
        }
    }, createjs.RequestUtils = a
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b, c) {
        this.EventDispatcher_constructor(), this.loaded = !1, this.canceled = !1, this.progress = 0, this.type = c, this.resultFormatter = null, a ? this._item = createjs.LoadItem.create(a) : this._item = null, this._preferXHR = b, this._result = null, this._rawResult = null, this._loadedItems = null, this._tagSrcAttribute = null, this._tag = null
    }

    var b = createjs.extend(a, createjs.EventDispatcher), c = a;
    c.POST = "POST", c.GET = "GET", c.BINARY = "binary", c.CSS = "css", c.IMAGE = "image", c.JAVASCRIPT = "javascript", c.JSON = "json", c.JSONP = "jsonp", c.MANIFEST = "manifest", c.SOUND = "sound", c.VIDEO = "video", c.SPRITESHEET = "spritesheet", c.SVG = "svg", c.TEXT = "text", c.XML = "xml", b.getItem = function () {
        return this._item
    }, b.getResult = function (a) {
        return a ? this._rawResult : this._result
    }, b.getTag = function () {
        return this._tag
    }, b.setTag = function (a) {
        this._tag = a
    }, b.load = function () {
        this._createRequest(), this._request.on("complete", this, this), this._request.on("progress", this, this), this._request.on("loadStart", this, this), this._request.on("abort", this, this), this._request.on("timeout", this, this), this._request.on("error", this, this);
        var a = new createjs.Event("initialize");
        a.loader = this._request, this.dispatchEvent(a), this._request.load()
    }, b.cancel = function () {
        this.canceled = !0, this.destroy()
    }, b.destroy = function () {
        this._request && (this._request.removeAllEventListeners(), this._request.destroy()), this._request = null, this._item = null, this._rawResult = null, this._result = null, this._loadItems = null, this.removeAllEventListeners()
    }, b.getLoadedItems = function () {
        return this._loadedItems
    }, b._createRequest = function () {
        this._preferXHR ? this._request = new createjs.XHRRequest(this._item) : this._request = new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
    }, b._createTag = function (a) {
        return null
    }, b._sendLoadStart = function () {
        this._isCanceled() || this.dispatchEvent("loadstart")
    }, b._sendProgress = function (a) {
        if (!this._isCanceled()) {
            var b = null;
            "number" == typeof a ? (this.progress = a, b = new createjs.ProgressEvent(this.progress)) : (b = a, this.progress = a.loaded / a.total, b.progress = this.progress, (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0)), this.hasEventListener("progress") && this.dispatchEvent(b)
        }
    }, b._sendComplete = function () {
        if (!this._isCanceled()) {
            this.loaded = !0;
            var a = new createjs.Event("complete");
            a.rawResult = this._rawResult, null != this._result && (a.result = this._result), this.dispatchEvent(a)
        }
    }, b._sendError = function (a) {
        !this._isCanceled() && this.hasEventListener("error") && (null == a && (a = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")), this.dispatchEvent(a))
    }, b._isCanceled = function () {
        return !(null != window.createjs && !this.canceled)
    }, b.resultFormatter = null, b.handleEvent = function (a) {
        switch (a.type) {
            case"complete":
                this._rawResult = a.target._response;
                var b = this.resultFormatter && this.resultFormatter(this), c = this;
                b instanceof Function ? b(function (a) {
                    c._result = a, c._sendComplete()
                }) : (this._result = b || this._rawResult, this._sendComplete());
                break;
            case"progress":
                this._sendProgress(a);
                break;
            case"error":
                this._sendError(a);
                break;
            case"loadstart":
                this._sendLoadStart();
                break;
            case"abort":
            case"timeout":
                this._isCanceled() || this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_" + a.type.toUpperCase() + "_ERROR"))
        }
    }, b.buildPath = function (a, b) {
        return createjs.RequestUtils.buildPath(a, b)
    }, b.toString = function () {
        return "[PreloadJS AbstractLoader]"
    }, createjs.AbstractLoader = createjs.promote(a, "EventDispatcher")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b, c) {
        this.AbstractLoader_constructor(a, b, c), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src"
    }

    var b = createjs.extend(a, createjs.AbstractLoader);
    b.load = function () {
        this._tag || (this._tag = this._createTag(this._item.src)), this._tag.preload = "auto", this._tag.load(), this.AbstractLoader_load()
    }, b._createTag = function () {
    }, b._createRequest = function () {
        this._preferXHR ? this._request = new createjs.XHRRequest(this._item) : this._request = new createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
    }, b._formatResult = function (a) {
        return this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR && (a.getTag().src = a.getResult(!0)), a.getTag()
    }, createjs.AbstractMediaLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";
    var a = function (a) {
        this._item = a
    }, b = createjs.extend(a, createjs.EventDispatcher);
    b.load = function () {
    }, b.destroy = function () {
    }, b.cancel = function () {
    }, createjs.AbstractRequest = createjs.promote(a, "EventDispatcher")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b, c) {
        this.AbstractRequest_constructor(a), this._tag = b, this._tagSrcAttribute = c, this._loadedHandler = createjs.proxy(this._handleTagComplete, this), this._addedToDOM = !1, this._startTagVisibility = null
    }

    var b = createjs.extend(a, createjs.AbstractRequest);
    b.load = function () {
        this._tag.onload = createjs.proxy(this._handleTagComplete, this), this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this), this._tag.onerror = createjs.proxy(this._handleError, this);
        var a = new createjs.Event("initialize");
        a.loader = this._tag, this.dispatchEvent(a), this._hideTag(), this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout), this._tag[this._tagSrcAttribute] = this._item.src, null == this._tag.parentNode && (window.document.body.appendChild(this._tag), this._addedToDOM = !0)
    }, b.destroy = function () {
        this._clean(), this._tag = null, this.AbstractRequest_destroy()
    }, b._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var a = this._tag;
        ("loaded" == a.readyState || "complete" == a.readyState) && this._handleTagComplete()
    }, b._handleError = function () {
        this._clean(), this.dispatchEvent("error")
    }, b._handleTagComplete = function () {
        this._rawResult = this._tag, this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult, this._clean(), this._showTag(), this.dispatchEvent("complete")
    }, b._handleTimeout = function () {
        this._clean(), this.dispatchEvent(new createjs.Event("timeout"))
    }, b._clean = function () {
        this._tag.onload = null, this._tag.onreadystatechange = null, this._tag.onerror = null, this._addedToDOM && null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag), clearTimeout(this._loadTimeout)
    }, b._hideTag = function () {
        this._startTagVisibility = this._tag.style.visibility, this._tag.style.visibility = "hidden"
    }, b._showTag = function () {
        this._tag.style.visibility = this._startTagVisibility
    }, b._handleStalled = function () {
    }, createjs.TagRequest = createjs.promote(a, "AbstractRequest")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b, c) {
        this.AbstractRequest_constructor(a), this._tag = b, this._tagSrcAttribute = c, this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
    }

    var b = createjs.extend(a, createjs.TagRequest);
    b.load = function () {
        var a = createjs.proxy(this._handleStalled, this);
        this._stalledCallback = a;
        var b = createjs.proxy(this._handleProgress, this);
        this._handleProgress = b, this._tag.addEventListener("stalled", a), this._tag.addEventListener("progress", b), this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1), this.TagRequest_load()
    }, b._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var a = this._tag;
        ("loaded" == a.readyState || "complete" == a.readyState) && this._handleTagComplete()
    }, b._handleStalled = function () {
    }, b._handleProgress = function (a) {
        if (a && !(a.loaded > 0 && 0 == a.total)) {
            var b = new createjs.ProgressEvent(a.loaded, a.total);
            this.dispatchEvent(b)
        }
    }, b._clean = function () {
        this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.removeEventListener("stalled", this._stalledCallback), this._tag.removeEventListener("progress", this._progressCallback), this.TagRequest__clean()
    }, createjs.MediaTagRequest = createjs.promote(a, "TagRequest")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a) {
        this.AbstractRequest_constructor(a), this._request = null, this._loadTimeout = null, this._xhrLevel = 1, this._response = null, this._rawResponse = null, this._canceled = !1, this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this), this._handleProgressProxy = createjs.proxy(this._handleProgress, this), this._handleAbortProxy = createjs.proxy(this._handleAbort, this), this._handleErrorProxy = createjs.proxy(this._handleError, this), this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this), this._handleLoadProxy = createjs.proxy(this._handleLoad, this), this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this), !this._createXHR(a)
    }

    var b = createjs.extend(a, createjs.AbstractRequest);
    a.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], b.getResult = function (a) {
        return a && this._rawResponse ? this._rawResponse : this._response
    }, b.cancel = function () {
        this.canceled = !0, this._clean(), this._request.abort()
    }, b.load = function () {
        if (null == this._request) return void this._handleError();
        null != this._request.addEventListener ? (this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1), this._request.addEventListener("progress", this._handleProgressProxy, !1), this._request.addEventListener("abort", this._handleAbortProxy, !1), this._request.addEventListener("error", this._handleErrorProxy, !1), this._request.addEventListener("timeout", this._handleTimeoutProxy, !1), this._request.addEventListener("load", this._handleLoadProxy, !1), this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1)) : (this._request.onloadstart = this._handleLoadStartProxy, this._request.onprogress = this._handleProgressProxy, this._request.onabort = this._handleAbortProxy, this._request.onerror = this._handleErrorProxy, this._request.ontimeout = this._handleTimeoutProxy, this._request.onload = this._handleLoadProxy, this._request.onreadystatechange = this._handleReadyStateChangeProxy), 1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));
        try {
            this._item.values && this._item.method != createjs.AbstractLoader.GET ? this._item.method == createjs.AbstractLoader.POST && this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)) : this._request.send()
        } catch (a) {
            this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, a))
        }
    }, b.setResponseType = function (a) {
        "blob" === a && (a = window.URL ? "blob" : "arraybuffer", this._responseType = a), this._request.responseType = a
    }, b.getAllResponseHeaders = function () {
        return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
    }, b.getResponseHeader = function (a) {
        return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(a) : null
    }, b._handleProgress = function (a) {
        if (a && !(a.loaded > 0 && 0 == a.total)) {
            var b = new createjs.ProgressEvent(a.loaded, a.total);
            this.dispatchEvent(b)
        }
    }, b._handleLoadStart = function (a) {
        clearTimeout(this._loadTimeout), this.dispatchEvent("loadstart")
    }, b._handleAbort = function (a) {
        this._clean(), this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, a))
    }, b._handleError = function (a) {
        this._clean(), this.dispatchEvent(new createjs.ErrorEvent(a.message))
    }, b._handleReadyStateChange = function (a) {
        4 == this._request.readyState && this._handleLoad()
    }, b._handleLoad = function (a) {
        if (!this.loaded) {
            this.loaded = !0;
            var b = this._checkError();
            if (b) return void this._handleError(b);
            if (this._response = this._getResponse(), "arraybuffer" === this._responseType) try {
                this._response = new Blob([this._response])
            } catch (c) {
                if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, "TypeError" === c.name && window.BlobBuilder) {
                    var d = new BlobBuilder;
                    d.append(this._response), this._response = d.getBlob()
                }
            }
            this._clean(), this.dispatchEvent(new createjs.Event("complete"))
        }
    }, b._handleTimeout = function (a) {
        this._clean(), this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, a))
    }, b._checkError = function () {
        var a = parseInt(this._request.status);
        switch (a) {
            case 404:
                return new Error(a);
            case 0:
                return this._getResponse() ? null : new Error(a)
        }
        return null
    }, b._getResponse = function () {
        if (null != this._response) return this._response;
        if (null != this._request.response) return this._request.response;
        try {
            if (null != this._request.responseText) return this._request.responseText
        } catch (a) {
        }
        try {
            if (null != this._request.responseXML) return this._request.responseXML
        } catch (a) {
        }
        return null
    }, b._createXHR = function (a) {
        var b = createjs.RequestUtils.isCrossDomain(a), c = {}, d = null;
        if (window.XMLHttpRequest) d = new XMLHttpRequest, b && void 0 === d.withCredentials && window.XDomainRequest && (d = new XDomainRequest); else {
            for (var e = 0, f = s.ACTIVEX_VERSIONS.length; f > e; e++) {
                var g = s.ACTIVEX_VERSIONS[e];
                try {
                    d = new ActiveXObject(g);
                    break
                } catch (h) {
                }
            }
            if (null == d) return !1
        }
        null == a.mimeType && createjs.RequestUtils.isText(a.type) && (a.mimeType = "text/plain; charset=utf-8"), a.mimeType && d.overrideMimeType && d.overrideMimeType(a.mimeType), this._xhrLevel = "string" == typeof d.responseType ? 2 : 1;
        var i = null;
        if (i = a.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(a.src, a.values) : a.src, d.open(a.method || createjs.AbstractLoader.GET, i, !0), b && d instanceof XMLHttpRequest && 1 == this._xhrLevel && (c.Origin = location.origin), a.values && a.method == createjs.AbstractLoader.POST && (c["Content-Type"] = "application/x-www-form-urlencoded"), b || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest"), a.headers) for (var j in a.headers) c[j] = a.headers[j];
        for (j in c) d.setRequestHeader(j, c[j]);
        return d instanceof XMLHttpRequest && void 0 !== a.withCredentials && (d.withCredentials = a.withCredentials), this._request = d, !0
    }, b._clean = function () {
        clearTimeout(this._loadTimeout), null != this._request.removeEventListener ? (this._request.removeEventListener("loadstart", this._handleLoadStartProxy), this._request.removeEventListener("progress", this._handleProgressProxy), this._request.removeEventListener("abort", this._handleAbortProxy), this._request.removeEventListener("error", this._handleErrorProxy), this._request.removeEventListener("timeout", this._handleTimeoutProxy), this._request.removeEventListener("load", this._handleLoadProxy), this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)) : (this._request.onloadstart = null, this._request.onprogress = null, this._request.onabort = null, this._request.onerror = null, this._request.ontimeout = null, this._request.onload = null, this._request.onreadystatechange = null)
    }, b.toString = function () {
        return "[PreloadJS XHRRequest]"
    }, createjs.XHRRequest = createjs.promote(a, "AbstractRequest")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b, c) {
        this.AbstractLoader_constructor(), this._plugins = [], this._typeCallbacks = {}, this._extensionCallbacks = {}, this.next = null, this.maintainScriptOrder = !0, this.stopOnError = !1, this._maxConnections = 1, this._availableLoaders = [createjs.ImageLoader, createjs.JavaScriptLoader, createjs.CSSLoader, createjs.JSONLoader, createjs.JSONPLoader, createjs.SoundLoader, createjs.ManifestLoader, createjs.SpriteSheetLoader, createjs.XMLLoader, createjs.SVGLoader, createjs.BinaryLoader, createjs.VideoLoader, createjs.TextLoader], this._defaultLoaderLength = this._availableLoaders.length,
            this.init(a, b, c)
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    b.init = function (a, b, c) {
        this.useXHR = !0, this.preferXHR = !0, this._preferXHR = !0, this.setPreferXHR(a), this._paused = !1, this._basePath = b, this._crossOrigin = c, this._loadStartWasDispatched = !1, this._currentlyLoadingScript = null, this._currentLoads = [], this._loadQueue = [], this._loadQueueBackup = [], this._loadItemsById = {}, this._loadItemsBySrc = {}, this._loadedResults = {}, this._loadedRawResults = {}, this._numItems = 0, this._numItemsLoaded = 0, this._scriptOrder = [], this._loadedScripts = [], this._lastProgress = NaN
    }, c.loadTimeout = 8e3, c.LOAD_TIMEOUT = 0, c.BINARY = createjs.AbstractLoader.BINARY, c.CSS = createjs.AbstractLoader.CSS, c.IMAGE = createjs.AbstractLoader.IMAGE, c.JAVASCRIPT = createjs.AbstractLoader.JAVASCRIPT, c.JSON = createjs.AbstractLoader.JSON, c.JSONP = createjs.AbstractLoader.JSONP, c.MANIFEST = createjs.AbstractLoader.MANIFEST, c.SOUND = createjs.AbstractLoader.SOUND, c.VIDEO = createjs.AbstractLoader.VIDEO, c.SVG = createjs.AbstractLoader.SVG, c.TEXT = createjs.AbstractLoader.TEXT, c.XML = createjs.AbstractLoader.XML, c.POST = createjs.AbstractLoader.POST, c.GET = createjs.AbstractLoader.GET, b.registerLoader = function (a) {
        if (!a || !a.canLoadItem) throw new Error("loader is of an incorrect type.");
        if (-1 != this._availableLoaders.indexOf(a)) throw new Error("loader already exists.");
        this._availableLoaders.unshift(a)
    }, b.unregisterLoader = function (a) {
        var b = this._availableLoaders.indexOf(a);
        -1 != b && b < this._defaultLoaderLength - 1 && this._availableLoaders.splice(b, 1)
    }, b.setUseXHR = function (a) {
        return this.setPreferXHR(a)
    }, b.setPreferXHR = function (a) {
        return this.preferXHR = 0 != a && null != window.XMLHttpRequest, this.preferXHR
    }, b.removeAll = function () {
        this.remove()
    }, b.remove = function (a) {
        var b = null;
        if (!a || a instanceof Array) {
            if (a) b = a; else if (arguments.length > 0) return
        } else b = [a];
        var c = !1;
        if (b) {
            for (; b.length;) {
                var d = b.pop(), e = this.getResult(d);
                for (f = this._loadQueue.length - 1; f >= 0; f--) if (g = this._loadQueue[f].getItem(), g.id == d || g.src == d) {
                    this._loadQueue.splice(f, 1)[0].cancel();
                    break
                }
                for (f = this._loadQueueBackup.length - 1; f >= 0; f--) if (g = this._loadQueueBackup[f].getItem(), g.id == d || g.src == d) {
                    this._loadQueueBackup.splice(f, 1)[0].cancel();
                    break
                }
                if (e) this._disposeItem(this.getItem(d)); else for (var f = this._currentLoads.length - 1; f >= 0; f--) {
                    var g = this._currentLoads[f].getItem();
                    if (g.id == d || g.src == d) {
                        this._currentLoads.splice(f, 1)[0].cancel(), c = !0;
                        break
                    }
                }
            }
            c && this._loadNext()
        } else {
            this.close();
            for (var h in this._loadItemsById) this._disposeItem(this._loadItemsById[h]);
            this.init(this.preferXHR, this._basePath, this._crossOrigin)
        }
    }, b.reset = function () {
        this.close();
        for (var a in this._loadItemsById) this._disposeItem(this._loadItemsById[a]);
        for (var b = [], c = 0, d = this._loadQueueBackup.length; d > c; c++) b.push(this._loadQueueBackup[c].getItem());
        this.loadManifest(b, !1)
    }, b.installPlugin = function (a) {
        if (null != a && null != a.getPreloadHandlers) {
            this._plugins.push(a);
            var b = a.getPreloadHandlers();
            if (b.scope = a, null != b.types) for (var c = 0, d = b.types.length; d > c; c++) this._typeCallbacks[b.types[c]] = b;
            if (null != b.extensions) for (c = 0, d = b.extensions.length; d > c; c++) this._extensionCallbacks[b.extensions[c]] = b
        }
    }, b.setMaxConnections = function (a) {
        this._maxConnections = a, !this._paused && this._loadQueue.length > 0 && this._loadNext()
    }, b.loadFile = function (a, b, c) {
        if (null == a) {
            var d = new createjs.ErrorEvent("PRELOAD_NO_FILE");
            return void this._sendError(d)
        }
        this._addItem(a, null, c), b !== !1 ? this.setPaused(!1) : this.setPaused(!0)
    }, b.loadManifest = function (a, b, d) {
        var e = null, f = null;
        if (a instanceof Array) {
            if (0 == a.length) {
                var g = new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");
                return void this._sendError(g)
            }
            e = a
        } else if ("string" == typeof a) e = [{src: a, type: c.MANIFEST}]; else {
            if ("object" != typeof a) {
                var g = new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");
                return void this._sendError(g)
            }
            if (void 0 !== a.src) {
                if (null == a.type) a.type = c.MANIFEST; else if (a.type != c.MANIFEST) {
                    var g = new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");
                    this._sendError(g)
                }
                e = [a]
            } else void 0 !== a.manifest && (e = a.manifest, f = a.path)
        }
        for (var h = 0, i = e.length; i > h; h++) this._addItem(e[h], f, d);
        b !== !1 ? this.setPaused(!1) : this.setPaused(!0)
    }, b.load = function () {
        this.setPaused(!1)
    }, b.getItem = function (a) {
        return this._loadItemsById[a] || this._loadItemsBySrc[a]
    }, b.getResult = function (a, b) {
        var c = this._loadItemsById[a] || this._loadItemsBySrc[a];
        if (null == c) return null;
        var d = c.id;
        return b && this._loadedRawResults[d] ? this._loadedRawResults[d] : this._loadedResults[d]
    }, b.getItems = function (a) {
        var b = [];
        for (var c in this._loadItemsById) {
            var d = this._loadItemsById[c], e = this.getResult(c);
            (a !== !0 || null != e) && b.push({item: d, result: e, rawResult: this.getResult(c, !0)})
        }
        return b
    }, b.setPaused = function (a) {
        this._paused = a, this._paused || this._loadNext()
    }, b.close = function () {
        for (; this._currentLoads.length;) this._currentLoads.pop().cancel();
        this._scriptOrder.length = 0, this._loadedScripts.length = 0, this.loadStartWasDispatched = !1, this._itemCount = 0, this._lastProgress = NaN
    }, b._addItem = function (a, b, c) {
        var d = this._createLoadItem(a, b, c);
        if (null != d) {
            var e = this._createLoader(d);
            null != e && ("plugins" in e && (e.plugins = this._plugins), d._loader = e, this._loadQueue.push(e), this._loadQueueBackup.push(e), this._numItems++, this._updateProgress(), (this.maintainScriptOrder && d.type == createjs.LoadQueue.JAVASCRIPT || d.maintainOrder === !0) && (this._scriptOrder.push(d), this._loadedScripts.push(null)))
        }
    }, b._createLoadItem = function (a, b, c) {
        var d = createjs.LoadItem.create(a);
        if (null == d) return null;
        var e = "", f = c || this._basePath;
        if (d.src instanceof Object) {
            if (!d.type) return null;
            if (b) {
                e = b;
                var g = createjs.RequestUtils.parseURI(b);
                null == f || g.absolute || g.relative || (e = f + e)
            } else null != f && (e = f)
        } else {
            var h = createjs.RequestUtils.parseURI(d.src);
            h.extension && (d.ext = h.extension), null == d.type && (!d.ext && window.console && console.error("unable to get extension for " + d.src), d.type = createjs.RequestUtils.getTypeByExtension(d.ext));
            var i = d.src;
            if (!h.absolute && !h.relative) if (b) {
                e = b;
                var g = createjs.RequestUtils.parseURI(b);
                i = b + i, null == f || g.absolute || g.relative || (e = f + e)
            } else null != f && (e = f);
            d.src = e + d.src
        }
        d.path = e, (void 0 === d.id || null === d.id || "" === d.id) && (d.id = i);
        var j = this._typeCallbacks[d.type] || this._extensionCallbacks[d.ext];
        if (j) {
            var k = j.callback.call(j.scope, d, this);
            if (k === !1) return null;
            k === !0 || null != k && (d._loader = k), h = createjs.RequestUtils.parseURI(d.src), null != h.extension && (d.ext = h.extension)
        }
        return this._loadItemsById[d.id] = d, this._loadItemsBySrc[d.src] = d, null == d.crossOrigin && (d.crossOrigin = this._crossOrigin), d
    }, b._createLoader = function (a) {
        if (null != a._loader) return a._loader;
        for (var b = this.preferXHR, c = 0; c < this._availableLoaders.length; c++) {
            var d = this._availableLoaders[c];
            if (d && d.canLoadItem(a)) return new d(a, b)
        }
        return null
    }, b._loadNext = function () {
        if (!this._paused) {
            this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = !0), this._numItems == this._numItemsLoaded ? (this.loaded = !0, this._sendComplete(), this.next && this.next.load && this.next.load()) : this.loaded = !1;
            for (var a = 0; a < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); a++) {
                var b = this._loadQueue[a];
                this._canStartLoad(b) && (this._loadQueue.splice(a, 1), a--, this._loadItem(b))
            }
        }
    }, b._loadItem = function (a) {
        a.on("fileload", this._handleFileLoad, this), a.on("progress", this._handleProgress, this), a.on("complete", this._handleFileComplete, this), a.on("error", this._handleError, this), a.on("fileerror", this._handleFileError, this), this._currentLoads.push(a), this._sendFileStart(a.getItem()), a.load()
    }, b._handleFileLoad = function (a) {
        a.target = null, this.dispatchEvent(a)
    }, b._handleFileError = function (a) {
        var b = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, a.item);
        this._sendError(b)
    }, b._handleError = function (a) {
        var b = a.target;
        this._numItemsLoaded++, this._finishOrderedItem(b, !0), this._updateProgress();
        var c = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, b.getItem());
        this._sendError(c), this.stopOnError ? this.setPaused(!0) : (this._removeLoadItem(b), this._cleanLoadItem(b), this._loadNext())
    }, b._handleFileComplete = function (a) {
        var b = a.target, c = b.getItem(), d = b.getResult();
        this._loadedResults[c.id] = d;
        var e = b.getResult(!0);
        null != e && e !== d && (this._loadedRawResults[c.id] = e), this._saveLoadedItems(b), this._removeLoadItem(b), this._finishOrderedItem(b) || this._processFinishedLoad(c, b), this._cleanLoadItem(b)
    }, b._saveLoadedItems = function (a) {
        var b = a.getLoadedItems();
        if (null !== b) for (var c = 0; c < b.length; c++) {
            var d = b[c].item;
            this._loadItemsBySrc[d.src] = d, this._loadItemsById[d.id] = d, this._loadedResults[d.id] = b[c].result, this._loadedRawResults[d.id] = b[c].rawResult
        }
    }, b._finishOrderedItem = function (a, b) {
        var c = a.getItem();
        if (this.maintainScriptOrder && c.type == createjs.LoadQueue.JAVASCRIPT || c.maintainOrder) {
            a instanceof createjs.JavaScriptLoader && (this._currentlyLoadingScript = !1);
            var d = createjs.indexOf(this._scriptOrder, c);
            return -1 != d && (this._loadedScripts[d] = b === !0 || c, this._checkScriptLoadOrder(), !0)
        }
        return !1
    }, b._checkScriptLoadOrder = function () {
        for (var a = this._loadedScripts.length, b = 0; a > b; b++) {
            var c = this._loadedScripts[b];
            if (null === c || void 0 === c) break;
            if (c !== !0) {
                var d = this._loadedResults[c.id];
                c.type == createjs.LoadQueue.JAVASCRIPT && createjs.DomUtils.appendToHead(d);
                var e = c._loader;
                this._processFinishedLoad(c, e), this._loadedScripts[b] = !0
            }
        }
    }, b._processFinishedLoad = function (a, b) {
        if (this._numItemsLoaded++, !this.maintainScriptOrder && a.type == createjs.LoadQueue.JAVASCRIPT) {
            var c = b.getTag();
            createjs.DomUtils.appendToHead(c)
        }
        this._updateProgress(), this._sendFileComplete(a, b), this._loadNext()
    }, b._canStartLoad = function (a) {
        if (!this.maintainScriptOrder || a.preferXHR) return !0;
        var b = a.getItem();
        if (b.type != createjs.LoadQueue.JAVASCRIPT) return !0;
        if (this._currentlyLoadingScript) return !1;
        for (var c = this._scriptOrder.indexOf(b), d = 0; c > d;) {
            var e = this._loadedScripts[d];
            if (null == e) return !1;
            d++
        }
        return this._currentlyLoadingScript = !0, !0
    }, b._removeLoadItem = function (a) {
        for (var b = this._currentLoads.length, c = 0; b > c; c++) if (this._currentLoads[c] == a) {
            this._currentLoads.splice(c, 1);
            break
        }
    }, b._cleanLoadItem = function (a) {
        var b = a.getItem();
        b && delete b._loader
    }, b._handleProgress = function (a) {
        var b = a.target;
        this._sendFileProgress(b.getItem(), b.progress), this._updateProgress()
    }, b._updateProgress = function () {
        var a = this._numItemsLoaded / this._numItems, b = this._numItems - this._numItemsLoaded;
        if (b > 0) {
            for (var c = 0, d = 0, e = this._currentLoads.length; e > d; d++) c += this._currentLoads[d].progress;
            a += c / b * (b / this._numItems)
        }
        this._lastProgress != a && (this._sendProgress(a), this._lastProgress = a)
    }, b._disposeItem = function (a) {
        delete this._loadedResults[a.id], delete this._loadedRawResults[a.id], delete this._loadItemsById[a.id], delete this._loadItemsBySrc[a.src]
    }, b._sendFileProgress = function (a, b) {
        if (!this._isCanceled() && !this._paused && this.hasEventListener("fileprogress")) {
            var c = new createjs.Event("fileprogress");
            c.progress = b, c.loaded = b, c.total = 1, c.item = a, this.dispatchEvent(c)
        }
    }, b._sendFileComplete = function (a, b) {
        if (!this._isCanceled() && !this._paused) {
            var c = new createjs.Event("fileload");
            c.loader = b, c.item = a, c.result = this._loadedResults[a.id], c.rawResult = this._loadedRawResults[a.id], a.completeHandler && a.completeHandler(c), this.hasEventListener("fileload") && this.dispatchEvent(c)
        }
    }, b._sendFileStart = function (a) {
        var b = new createjs.Event("filestart");
        b.item = a, this.hasEventListener("filestart") && this.dispatchEvent(b)
    }, b.toString = function () {
        return "[PreloadJS LoadQueue]"
    }, createjs.LoadQueue = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a) {
        this.AbstractLoader_constructor(a, !0, createjs.AbstractLoader.TEXT)
    }

    var b = (createjs.extend(a, createjs.AbstractLoader), a);
    b.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.TEXT
    }, createjs.TextLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a) {
        this.AbstractLoader_constructor(a, !0, createjs.AbstractLoader.BINARY), this.on("initialize", this._updateXHR, this)
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.BINARY
    }, b._updateXHR = function (a) {
        a.loader.setResponseType("arraybuffer")
    }, createjs.BinaryLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b) {
        this.AbstractLoader_constructor(a, b, createjs.AbstractLoader.CSS), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "href", b ? this._tag = document.createElement("style") : this._tag = document.createElement("link"), this._tag.rel = "stylesheet", this._tag.type = "text/css"
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.CSS
    }, b._formatResult = function (a) {
        if (this._preferXHR) {
            var b = a.getTag();
            if (b.styleSheet) b.styleSheet.cssText = a.getResult(!0); else {
                var c = document.createTextNode(a.getResult(!0));
                b.appendChild(c)
            }
        } else b = this._tag;
        return createjs.DomUtils.appendToHead(b), b
    }, createjs.CSSLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b) {
        this.AbstractLoader_constructor(a, b, createjs.AbstractLoader.IMAGE), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", createjs.RequestUtils.isImageTag(a) ? this._tag = a : createjs.RequestUtils.isImageTag(a.src) ? this._tag = a.src : createjs.RequestUtils.isImageTag(a.tag) && (this._tag = a.tag), null != this._tag ? this._preferXHR = !1 : this._tag = document.createElement("img"), this.on("initialize", this._updateXHR, this)
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.IMAGE
    }, b.load = function () {
        if ("" != this._tag.src && this._tag.complete) return void this._sendComplete();
        var a = this._item.crossOrigin;
        1 == a && (a = "Anonymous"), null == a || createjs.RequestUtils.isLocal(this._item.src) || (this._tag.crossOrigin = a), this.AbstractLoader_load()
    }, b._updateXHR = function (a) {
        a.loader.mimeType = "text/plain; charset=x-user-defined-binary", a.loader.setResponseType && a.loader.setResponseType("blob")
    }, b._formatResult = function (a) {
        var b = this;
        return function (c) {
            var d = b._tag, e = window.URL || window.webkitURL;
            if (b._preferXHR) if (e) {
                var f = e.createObjectURL(a.getResult(!0));
                f ? (d.src = f, d.onload = function () {
                    e.revokeObjectURL(this.src), c(this)
                }) : (d.src = a.getItem().src, d.complete ? c(d) : d.onload = function () {
                    c(this)
                })
            } else d.src = a.getItem().src, d.complete ? c(d) : d.onload = function () {
                c(this)
            }
        }
    }, createjs.ImageLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b) {
        this.AbstractLoader_constructor(a, b, createjs.AbstractLoader.JAVASCRIPT), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", this.setTag(document.createElement("script"))
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.JAVASCRIPT
    }, b._formatResult = function (a) {
        var b = a.getTag();
        return this._preferXHR && (b.text = a.getResult(!0)), b
    }, createjs.JavaScriptLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a) {
        this.AbstractLoader_constructor(a, !0, createjs.AbstractLoader.JSON), this.resultFormatter = this._formatResult
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.JSON
    }, b._formatResult = function (a) {
        var b = null;
        try {
            b = createjs.DataUtils.parseJSON(a.getResult(!0))
        } catch (c) {
            var d = new createjs.ErrorEvent("JSON_FORMAT", null, c);
            return this._sendError(d), c
        }
        return b
    }, createjs.JSONLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a) {
        this.AbstractLoader_constructor(a, !1, createjs.AbstractLoader.JSONP), this.setTag(document.createElement("script")), this.getTag().type = "text/javascript"
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.JSONP
    }, b.cancel = function () {
        this.AbstractLoader_cancel(), this._dispose()
    }, b.load = function () {
        if (null == this._item.callback) throw new Error("callback is required for loading JSONP requests.");
        if (null != window[this._item.callback]) throw new Error("JSONP callback '" + this._item.callback + "' already exists on window. You need to specify a different callback or re-name the current one.");
        window[this._item.callback] = createjs.proxy(this._handleLoad, this), window.document.body.appendChild(this._tag), this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout), this._tag.src = this._item.src
    }, b._handleLoad = function (a) {
        this._result = this._rawResult = a, this._sendComplete(), this._dispose()
    }, b._handleTimeout = function () {
        this._dispose(), this.dispatchEvent(new createjs.ErrorEvent("timeout"))
    }, b._dispose = function () {
        window.document.body.removeChild(this._tag), delete window[this._item.callback], clearTimeout(this._loadTimeout)
    }, createjs.JSONPLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a) {
        this.AbstractLoader_constructor(a, null, createjs.AbstractLoader.MANIFEST), this.plugins = null, this._manifestQueue = null
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    c.MANIFEST_PROGRESS = .25, c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.MANIFEST
    }, b.load = function () {
        this.AbstractLoader_load()
    }, b._createRequest = function () {
        var a = this._item.callback;
        null != a ? this._request = new createjs.JSONPLoader(this._item) : this._request = new createjs.JSONLoader(this._item)
    }, b.handleEvent = function (a) {
        switch (a.type) {
            case"complete":
                return this._rawResult = a.target.getResult(!0), this._result = a.target.getResult(), this._sendProgress(c.MANIFEST_PROGRESS), void this._loadManifest(this._result);
            case"progress":
                return a.loaded *= c.MANIFEST_PROGRESS, this.progress = a.loaded / a.total, (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0), void this._sendProgress(a)
        }
        this.AbstractLoader_handleEvent(a)
    }, b.destroy = function () {
        this.AbstractLoader_destroy(), this._manifestQueue.close()
    }, b._loadManifest = function (a) {
        if (a && a.manifest) {
            var b = this._manifestQueue = new createjs.LoadQueue;
            b.on("fileload", this._handleManifestFileLoad, this), b.on("progress", this._handleManifestProgress, this), b.on("complete", this._handleManifestComplete, this, !0), b.on("error", this._handleManifestError, this, !0);
            for (var c = 0, d = this.plugins.length; d > c; c++) b.installPlugin(this.plugins[c]);
            b.loadManifest(a)
        } else this._sendComplete()
    }, b._handleManifestFileLoad = function (a) {
        a.target = null, this.dispatchEvent(a)
    }, b._handleManifestComplete = function (a) {
        this._loadedItems = this._manifestQueue.getItems(!0), this._sendComplete()
    }, b._handleManifestProgress = function (a) {
        this.progress = a.progress * (1 - c.MANIFEST_PROGRESS) + c.MANIFEST_PROGRESS, this._sendProgress(this.progress)
    }, b._handleManifestError = function (a) {
        var b = new createjs.Event("fileerror");
        b.item = a.data, this.dispatchEvent(b)
    }, createjs.ManifestLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b) {
        this.AbstractMediaLoader_constructor(a, b, createjs.AbstractLoader.SOUND), createjs.RequestUtils.isAudioTag(a) ? this._tag = a : createjs.RequestUtils.isAudioTag(a.src) ? this._tag = a : createjs.RequestUtils.isAudioTag(a.tag) && (this._tag = createjs.RequestUtils.isAudioTag(a) ? a : a.src), null != this._tag && (this._preferXHR = !1)
    }

    var b = createjs.extend(a, createjs.AbstractMediaLoader), c = a;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.SOUND
    }, b._createTag = function (a) {
        var b = document.createElement("audio");
        return b.autoplay = !1, b.preload = "none", b.src = a, b
    }, createjs.SoundLoader = createjs.promote(a, "AbstractMediaLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b) {
        this.AbstractMediaLoader_constructor(a, b, createjs.AbstractLoader.VIDEO), createjs.RequestUtils.isVideoTag(a) || createjs.RequestUtils.isVideoTag(a.src) ? (this.setTag(createjs.RequestUtils.isVideoTag(a) ? a : a.src), this._preferXHR = !1) : this.setTag(this._createTag())
    }

    var b = createjs.extend(a, createjs.AbstractMediaLoader), c = a;
    b._createTag = function () {
        return document.createElement("video")
    }, c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.VIDEO
    }, createjs.VideoLoader = createjs.promote(a, "AbstractMediaLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a) {
        this.AbstractLoader_constructor(a, null, createjs.AbstractLoader.SPRITESHEET), this._manifestQueue = null
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    c.SPRITESHEET_PROGRESS = .25, c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.SPRITESHEET
    }, b.destroy = function () {
        this.AbstractLoader_destroy, this._manifestQueue.close()
    }, b._createRequest = function () {
        var a = this._item.callback;
        null != a ? this._request = new createjs.JSONPLoader(this._item) : this._request = new createjs.JSONLoader(this._item)
    }, b.handleEvent = function (a) {
        switch (a.type) {
            case"complete":
                return this._rawResult = a.target.getResult(!0), this._result = a.target.getResult(), this._sendProgress(c.SPRITESHEET_PROGRESS), void this._loadManifest(this._result);
            case"progress":
                return a.loaded *= c.SPRITESHEET_PROGRESS, this.progress = a.loaded / a.total, (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0), void this._sendProgress(a)
        }
        this.AbstractLoader_handleEvent(a)
    }, b._loadManifest = function (a) {
        if (a && a.images) {
            var b = this._manifestQueue = new createjs.LoadQueue;
            b.on("complete", this._handleManifestComplete, this, !0), b.on("fileload", this._handleManifestFileLoad, this), b.on("progress", this._handleManifestProgress, this), b.on("error", this._handleManifestError, this, !0), b.loadManifest(a.images)
        }
    }, b._handleManifestFileLoad = function (a) {
        var b = a.result;
        if (null != b) {
            var c = this.getResult().images, d = c.indexOf(a.item.src);
            c[d] = b
        }
    }, b._handleManifestComplete = function (a) {
        this._result = new createjs.SpriteSheet(this._result), this._loadedItems = this._manifestQueue.getItems(!0), this._sendComplete()
    }, b._handleManifestProgress = function (a) {
        this.progress = a.progress * (1 - c.SPRITESHEET_PROGRESS) + c.SPRITESHEET_PROGRESS, this._sendProgress(this.progress)
    }, b._handleManifestError = function (a) {
        var b = new createjs.Event("fileerror");
        b.item = a.data, this.dispatchEvent(b)
    }, createjs.SpriteSheetLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a, b) {
        this.AbstractLoader_constructor(a, b, createjs.AbstractLoader.SVG), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "data", b ? this.setTag(document.createElement("svg")) : (this.setTag(document.createElement("object")), this.getTag().type = "image/svg+xml")
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.SVG
    }, b._formatResult = function (a) {
        var b = createjs.DataUtils.parseXML(a.getResult(!0), "text/xml"), c = a.getTag();
        return !this._preferXHR && document.body.contains(c) && document.body.removeChild(c), null != b.documentElement ? (c.appendChild(b.documentElement), c.style.visibility = "visible", c) : b
    }, createjs.SVGLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () {
    "use strict";

    function a(a) {
        this.AbstractLoader_constructor(a, !0, createjs.AbstractLoader.XML), this.resultFormatter = this._formatResult
    }

    var b = createjs.extend(a, createjs.AbstractLoader), c = a;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.XML
    }, b._formatResult = function (a) {
        return createjs.DataUtils.parseXML(a.getResult(!0), "text/xml")
    }, createjs.XMLLoader = createjs.promote(a, "AbstractLoader")
}(), !function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.PIXI = a()
    }
}(function () {
    var a;
    return function b(a, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!a[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {exports: {}};
                a[g][0].call(k.exports, function (b) {
                    var c = a[g][1][b];
                    return e(c ? c : b)
                }, k, k.exports, b, a, c, d)
            }
            return c[g].exports
        }

        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function (b, c, d) {
            (function (b, d) {
                !function () {
                    function e() {
                    }

                    function f(a) {
                        return a
                    }

                    function g(a) {
                        return !!a
                    }

                    function h(a) {
                        return !a
                    }

                    function i(a) {
                        return function () {
                            if (null === a) throw new Error("Callback was already called.");
                            a.apply(this, arguments), a = null
                        }
                    }

                    function j(a) {
                        return function () {
                            null !== a && (a.apply(this, arguments), a = null)
                        }
                    }

                    function k(a) {
                        return O(a) || "number" == typeof a.length && a.length >= 0 && a.length % 1 === 0
                    }

                    function l(a, b) {
                        for (var c = -1, d = a.length; ++c < d;) b(a[c], c, a)
                    }

                    function m(a, b) {
                        for (var c = -1, d = a.length, e = Array(d); ++c < d;) e[c] = b(a[c], c, a);
                        return e
                    }

                    function n(a) {
                        return m(Array(a), function (a, b) {
                            return b
                        })
                    }

                    function o(a, b, c) {
                        return l(a, function (a, d, e) {
                            c = b(c, a, d, e)
                        }), c
                    }

                    function p(a, b) {
                        l(Q(a), function (c) {
                            b(a[c], c)
                        })
                    }

                    function q(a, b) {
                        for (var c = 0; c < a.length; c++) if (a[c] === b) return c;
                        return -1
                    }

                    function r(a) {
                        var b, c, d = -1;
                        return k(a) ? (b = a.length, function () {
                            return d++, b > d ? d : null
                        }) : (c = Q(a), b = c.length, function () {
                            return d++, b > d ? c[d] : null
                        })
                    }

                    function s(a, b) {
                        return b = null == b ? a.length - 1 : +b, function () {
                            for (var c = Math.max(arguments.length - b, 0), d = Array(c), e = 0; c > e; e++) d[e] = arguments[e + b];
                            switch (b) {
                                case 0:
                                    return a.call(this, d);
                                case 1:
                                    return a.call(this, arguments[0], d)
                            }
                        }
                    }

                    function t(a) {
                        return function (b, c, d) {
                            return a(b, d)
                        }
                    }

                    function u(a) {
                        return function (b, c, d) {
                            d = j(d || e), b = b || [];
                            var f = r(b);
                            if (0 >= a) return d(null);
                            var g = !1, h = 0, k = !1;
                            !function l() {
                                if (g && 0 >= h) return d(null);
                                for (; a > h && !k;) {
                                    var e = f();
                                    if (null === e) return g = !0, void(0 >= h && d(null));
                                    h += 1, c(b[e], e, i(function (a) {
                                        h -= 1, a ? (d(a), k = !0) : l()
                                    }))
                                }
                            }()
                        }
                    }

                    function v(a) {
                        return function (b, c, d) {
                            return a(L.eachOf, b, c, d)
                        }
                    }

                    function w(a) {
                        return function (b, c, d, e) {
                            return a(u(c), b, d, e)
                        }
                    }

                    function x(a) {
                        return function (b, c, d) {
                            return a(L.eachOfSeries, b, c, d)
                        }
                    }

                    function y(a, b, c, d) {
                        d = j(d || e), b = b || [];
                        var f = k(b) ? [] : {};
                        a(b, function (a, b, d) {
                            c(a, function (a, c) {
                                f[b] = c, d(a)
                            })
                        }, function (a) {
                            d(a, f)
                        })
                    }

                    function z(a, b, c, d) {
                        var e = [];
                        a(b, function (a, b, d) {
                            c(a, function (c) {
                                c && e.push({index: b, value: a}), d()
                            })
                        }, function () {
                            d(m(e.sort(function (a, b) {
                                return a.index - b.index
                            }), function (a) {
                                return a.value
                            }))
                        })
                    }

                    function A(a, b, c, d) {
                        z(a, b, function (a, b) {
                            c(a, function (a) {
                                b(!a)
                            })
                        }, d)
                    }

                    function B(a, b, c) {
                        return function (d, e, f, g) {
                            function h() {
                                g && g(c(!1, void 0))
                            }

                            function i(a, d, e) {
                                return g ? void f(a, function (d) {
                                    g && b(d) && (g(c(!0, a)), g = f = !1), e()
                                }) : e()
                            }

                            arguments.length > 3 ? a(d, e, i, h) : (g = f, f = e, a(d, i, h))
                        }
                    }

                    function C(a, b) {
                        return b
                    }

                    function D(a, b, c) {
                        c = c || e;
                        var d = k(b) ? [] : {};
                        a(b, function (a, b, c) {
                            a(s(function (a, e) {
                                e.length <= 1 && (e = e[0]), d[b] = e, c(a)
                            }))
                        }, function (a) {
                            c(a, d)
                        })
                    }

                    function E(a, b, c, d) {
                        var e = [];
                        a(b, function (a, b, d) {
                            c(a, function (a, b) {
                                e = e.concat(b || []), d(a)
                            })
                        }, function (a) {
                            d(a, e)
                        })
                    }

                    function F(a, b, c) {
                        function d(a, b, c, d) {
                            if (null != d && "function" != typeof d) throw new Error("task callback must be a function");
                            return a.started = !0, O(b) || (b = [b]), 0 === b.length && a.idle() ? L.setImmediate(function () {
                                a.drain()
                            }) : (l(b, function (b) {
                                var f = {data: b, callback: d || e};
                                c ? a.tasks.unshift(f) : a.tasks.push(f), a.tasks.length === a.concurrency && a.saturated()
                            }), void L.setImmediate(a.process))
                        }

                        function f(a, b) {
                            return function () {
                                g -= 1;
                                var c = !1, d = arguments;
                                l(b, function (a) {
                                    l(h, function (b, d) {
                                        b !== a || c || (h.splice(d, 1), c = !0)
                                    }), a.callback.apply(a, d)
                                }), a.tasks.length + g === 0 && a.drain(), a.process()
                            }
                        }

                        if (null == b) b = 1; else if (0 === b) throw new Error("Concurrency must not be zero");
                        var g = 0, h = [], j = {
                            tasks: [],
                            concurrency: b,
                            payload: c,
                            saturated: e,
                            empty: e,
                            drain: e,
                            started: !1,
                            paused: !1,
                            push: function (a, b) {
                                d(j, a, !1, b)
                            },
                            kill: function () {
                                j.drain = e, j.tasks = []
                            },
                            unshift: function (a, b) {
                                d(j, a, !0, b)
                            },
                            process: function () {
                                for (; !j.paused && g < j.concurrency && j.tasks.length;) {
                                    var b = j.payload ? j.tasks.splice(0, j.payload) : j.tasks.splice(0, j.tasks.length),
                                        c = m(b, function (a) {
                                            return a.data
                                        });
                                    0 === j.tasks.length && j.empty(), g += 1, h.push(b[0]);
                                    var d = i(f(j, b));
                                    a(c, d)
                                }
                            },
                            length: function () {
                                return j.tasks.length
                            },
                            running: function () {
                                return g
                            },
                            workersList: function () {
                                return h
                            },
                            idle: function () {
                                return j.tasks.length + g === 0
                            },
                            pause: function () {
                                j.paused = !0
                            },
                            resume: function () {
                                if (j.paused !== !1) {
                                    j.paused = !1;
                                    for (var a = Math.min(j.concurrency, j.tasks.length), b = 1; a >= b; b++) L.setImmediate(j.process)
                                }
                            }
                        };
                        return j
                    }

                    function G(a) {
                        return s(function (b, c) {
                            b.apply(null, c.concat([s(function (b, c) {
                                "object" == typeof console && (b ? console.error && console.error(b) : console[a] && l(c, function (b) {
                                    console[a](b)
                                }))
                            })]))
                        })
                    }

                    function H(a) {
                        return function (b, c, d) {
                            a(n(b), c, d)
                        }
                    }

                    function I(a) {
                        return s(function (b, c) {
                            var d = s(function (c) {
                                var d = this, e = c.pop();
                                return a(b, function (a, b, e) {
                                    a.apply(d, c.concat([e]))
                                }, e)
                            });
                            return c.length ? d.apply(this, c) : d
                        })
                    }

                    function J(a) {
                        return s(function (b) {
                            var c = b.pop();
                            b.push(function () {
                                var a = arguments;
                                d ? L.setImmediate(function () {
                                    c.apply(null, a)
                                }) : c.apply(null, a)
                            });
                            var d = !0;
                            a.apply(this, b), d = !1
                        })
                    }

                    var K, L = {},
                        M = "object" == typeof self && self.self === self && self || "object" == typeof d && d.global === d && d || this;
                    null != M && (K = M.async), L.noConflict = function () {
                        return M.async = K, L
                    };
                    var N = Object.prototype.toString, O = Array.isArray || function (a) {
                        return "[object Array]" === N.call(a)
                    }, P = function (a) {
                        var b = typeof a;
                        return "function" === b || "object" === b && !!a
                    }, Q = Object.keys || function (a) {
                        var b = [];
                        for (var c in a) a.hasOwnProperty(c) && b.push(c);
                        return b
                    }, R = "function" == typeof setImmediate && setImmediate, S = R ? function (a) {
                        R(a)
                    } : function (a) {
                        setTimeout(a, 0)
                    };
                    "object" == typeof b && "function" == typeof b.nextTick ? L.nextTick = b.nextTick : L.nextTick = S, L.setImmediate = R ? S : L.nextTick, L.forEach = L.each = function (a, b, c) {
                        return L.eachOf(a, t(b), c)
                    }, L.forEachSeries = L.eachSeries = function (a, b, c) {
                        return L.eachOfSeries(a, t(b), c)
                    }, L.forEachLimit = L.eachLimit = function (a, b, c, d) {
                        return u(b)(a, t(c), d)
                    }, L.forEachOf = L.eachOf = function (a, b, c) {
                        function d(a) {
                            h--, a ? c(a) : null === f && 0 >= h && c(null)
                        }

                        c = j(c || e), a = a || [];
                        for (var f, g = r(a), h = 0; null != (f = g());) h += 1, b(a[f], f, i(d));
                        0 === h && c(null)
                    }, L.forEachOfSeries = L.eachOfSeries = function (a, b, c) {
                        function d() {
                            var e = !0;
                            return null === g ? c(null) : (b(a[g], g, i(function (a) {
                                if (a) c(a); else {
                                    if (g = f(), null === g) return c(null);
                                    e ? L.setImmediate(d) : d()
                                }
                            })), void(e = !1))
                        }

                        c = j(c || e), a = a || [];
                        var f = r(a), g = f();
                        d()
                    }, L.forEachOfLimit = L.eachOfLimit = function (a, b, c, d) {
                        u(b)(a, c, d)
                    }, L.map = v(y), L.mapSeries = x(y), L.mapLimit = w(y), L.inject = L.foldl = L.reduce = function (a, b, c, d) {
                        L.eachOfSeries(a, function (a, d, e) {
                            c(b, a, function (a, c) {
                                b = c, e(a)
                            })
                        }, function (a) {
                            d(a, b)
                        })
                    }, L.foldr = L.reduceRight = function (a, b, c, d) {
                        var e = m(a, f).reverse();
                        L.reduce(e, b, c, d)
                    }, L.transform = function (a, b, c, d) {
                        3 === arguments.length && (d = c, c = b, b = O(a) ? [] : {}), L.eachOf(a, function (a, d, e) {
                            c(b, a, d, e)
                        }, function (a) {
                            d(a, b)
                        })
                    }, L.select = L.filter = v(z), L.selectLimit = L.filterLimit = w(z), L.selectSeries = L.filterSeries = x(z), L.reject = v(A), L.rejectLimit = w(A), L.rejectSeries = x(A), L.any = L.some = B(L.eachOf, g, f), L.someLimit = B(L.eachOfLimit, g, f), L.all = L.every = B(L.eachOf, h, h), L.everyLimit = B(L.eachOfLimit, h, h), L.detect = B(L.eachOf, f, C), L.detectSeries = B(L.eachOfSeries, f, C), L.detectLimit = B(L.eachOfLimit, f, C), L.sortBy = function (a, b, c) {
                        function d(a, b) {
                            var c = a.criteria, d = b.criteria;
                            return d > c ? -1 : c > d ? 1 : 0
                        }

                        L.map(a, function (a, c) {
                            b(a, function (b, d) {
                                b ? c(b) : c(null, {value: a, criteria: d})
                            })
                        }, function (a, b) {
                            return a ? c(a) : void c(null, m(b.sort(d), function (a) {
                                return a.value
                            }))
                        })
                    }, L.auto = function (a, b, c) {
                        function d(a) {
                            r.unshift(a)
                        }

                        function f(a) {
                            var b = q(r, a);
                            b >= 0 && r.splice(b, 1)
                        }

                        function g() {
                            i--, l(r.slice(0), function (a) {
                                a()
                            })
                        }

                        "function" == typeof arguments[1] && (c = b, b = null), c = j(c || e);
                        var h = Q(a), i = h.length;
                        if (!i) return c(null);
                        b || (b = i);
                        var k = {}, m = 0, n = !1, r = [];
                        d(function () {
                            i || c(null, k)
                        }), l(h, function (e) {
                            function h() {
                                return b > m && o(t, function (a, b) {
                                    return a && k.hasOwnProperty(b)
                                }, !0) && !k.hasOwnProperty(e)
                            }

                            function i() {
                                h() && (m++, f(i), l[l.length - 1](r, k))
                            }

                            if (!n) {
                                for (var j, l = O(a[e]) ? a[e] : [a[e]], r = s(function (a, b) {
                                    if (m--, b.length <= 1 && (b = b[0]), a) {
                                        var d = {};
                                        p(k, function (a, b) {
                                            d[b] = a
                                        }), d[e] = b, n = !0, c(a, d)
                                    } else k[e] = b, L.setImmediate(g)
                                }), t = l.slice(0, l.length - 1), u = t.length; u--;) {
                                    if (!(j = a[t[u]])) throw new Error("Has nonexistent dependency in " + t.join(", "));
                                    if (O(j) && q(j, e) >= 0) throw new Error("Has cyclic dependencies")
                                }
                                h() ? (m++, l[l.length - 1](r, k)) : d(i)
                            }
                        })
                    }, L.retry = function (a, b, c) {
                        function d(a, b) {
                            if ("number" == typeof b) a.times = parseInt(b, 10) || f; else {
                                if ("object" != typeof b) throw new Error("Unsupported argument type for 'times': " + typeof b);
                                a.times = parseInt(b.times, 10) || f, a.interval = parseInt(b.interval, 10) || g
                            }
                        }

                        function e(a, b) {
                            function c(a, c) {
                                return function (d) {
                                    a(function (a, b) {
                                        d(!a || c, {err: a, result: b})
                                    }, b)
                                }
                            }

                            function d(a) {
                                return function (b) {
                                    setTimeout(function () {
                                        b(null)
                                    }, a)
                                }
                            }

                            for (; i.times;) {
                                var e = !(i.times -= 1);
                                h.push(c(i.task, e)), !e && i.interval > 0 && h.push(d(i.interval))
                            }
                            L.series(h, function (b, c) {
                                c = c[c.length - 1], (a || i.callback)(c.err, c.result)
                            })
                        }

                        var f = 5, g = 0, h = [], i = {times: f, interval: g}, j = arguments.length;
                        if (1 > j || j > 3) throw new Error("Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)");
                        return 2 >= j && "function" == typeof a && (c = b, b = a), "function" != typeof a && d(i, a), i.callback = c, i.task = b, i.callback ? e() : e
                    }, L.waterfall = function (a, b) {
                        function c(a) {
                            return s(function (d, e) {
                                if (d) b.apply(null, [d].concat(e)); else {
                                    var f = a.next();
                                    f ? e.push(c(f)) : e.push(b), J(a).apply(null, e)
                                }
                            })
                        }

                        if (b = j(b || e), !O(a)) {
                            var d = new Error("First argument to waterfall must be an array of functions");
                            return b(d)
                        }
                        return a.length ? void c(L.iterator(a))() : b()
                    }, L.parallel = function (a, b) {
                        D(L.eachOf, a, b)
                    }, L.parallelLimit = function (a, b, c) {
                        D(u(b), a, c)
                    }, L.series = function (a, b) {
                        D(L.eachOfSeries, a, b)
                    }, L.iterator = function (a) {
                        function b(c) {
                            function d() {
                                return a.length && a[c].apply(null, arguments), d.next()
                            }

                            return d.next = function () {
                                return c < a.length - 1 ? b(c + 1) : null
                            }, d
                        }

                        return b(0)
                    }, L.apply = s(function (a, b) {
                        return s(function (c) {
                            return a.apply(null, b.concat(c))
                        })
                    }), L.concat = v(E), L.concatSeries = x(E), L.whilst = function (a, b, c) {
                        if (c = c || e, a()) {
                            var d = s(function (e, f) {
                                e ? c(e) : a.apply(this, f) ? b(d) : c.apply(null, [null].concat(f))
                            });
                            b(d)
                        } else c(null)
                    }, L.doWhilst = function (a, b, c) {
                        var d = 0;
                        return L.whilst(function () {
                            return ++d <= 1 || b.apply(this, arguments)
                        }, a, c)
                    }, L.until = function (a, b, c) {
                        return L.whilst(function () {
                            return !a.apply(this, arguments)
                        }, b, c)
                    }, L.doUntil = function (a, b, c) {
                        return L.doWhilst(a, function () {
                            return !b.apply(this, arguments)
                        }, c)
                    }, L.during = function (a, b, c) {
                        c = c || e;
                        var d = s(function (b, d) {
                            b ? c(b) : (d.push(f), a.apply(this, d))
                        }), f = function (a, e) {
                            a ? c(a) : e ? b(d) : c(null)
                        };
                        a(f)
                    }, L.doDuring = function (a, b, c) {
                        var d = 0;
                        L.during(function (a) {
                            d++ < 1 ? a(null, !0) : b.apply(this, arguments)
                        }, a, c)
                    }, L.queue = function (a, b) {
                        var c = F(function (b, c) {
                            a(b[0], c)
                        }, b, 1);
                        return c
                    }, L.priorityQueue = function (a, b) {
                        function c(a, b) {
                            return a.priority - b.priority
                        }

                        function d(a, b, c) {
                            for (var d = -1, e = a.length - 1; e > d;) {
                                var f = d + (e - d + 1 >>> 1);
                                c(b, a[f]) >= 0 ? d = f : e = f - 1
                            }
                            return d
                        }

                        function f(a, b, f, g) {
                            if (null != g && "function" != typeof g) throw new Error("task callback must be a function");
                            return a.started = !0, O(b) || (b = [b]), 0 === b.length ? L.setImmediate(function () {
                                a.drain()
                            }) : void l(b, function (b) {
                                var h = {data: b, priority: f, callback: "function" == typeof g ? g : e};
                                a.tasks.splice(d(a.tasks, h, c) + 1, 0, h), a.tasks.length === a.concurrency && a.saturated(), L.setImmediate(a.process)
                            })
                        }

                        var g = L.queue(a, b);
                        return g.push = function (a, b, c) {
                            f(g, a, b, c)
                        }, delete g.unshift, g
                    }, L.cargo = function (a, b) {
                        return F(a, 1, b)
                    }, L.log = G("log"), L.dir = G("dir"), L.memoize = function (a, b) {
                        var c = {}, d = {}, e = Object.prototype.hasOwnProperty;
                        b = b || f;
                        var g = s(function (f) {
                            var g = f.pop(), h = b.apply(null, f);
                            e.call(c, h) ? L.setImmediate(function () {
                                g.apply(null, c[h])
                            }) : e.call(d, h) ? d[h].push(g) : (d[h] = [g], a.apply(null, f.concat([s(function (a) {
                                c[h] = a;
                                var b = d[h];
                                delete d[h];
                                for (var e = 0, f = b.length; f > e; e++) b[e].apply(null, a)
                            })])))
                        });
                        return g.memo = c, g.unmemoized = a, g
                    }, L.unmemoize = function (a) {
                        return function () {
                            return (a.unmemoized || a).apply(null, arguments)
                        }
                    }, L.times = H(L.map), L.timesSeries = H(L.mapSeries), L.timesLimit = function (a, b, c, d) {
                        return L.mapLimit(n(a), b, c, d)
                    }, L.seq = function () {
                        var a = arguments;
                        return s(function (b) {
                            var c = this, d = b[b.length - 1];
                            "function" == typeof d ? b.pop() : d = e, L.reduce(a, b, function (a, b, d) {
                                b.apply(c, a.concat([s(function (a, b) {
                                    d(a, b)
                                })]))
                            }, function (a, b) {
                                d.apply(c, [a].concat(b))
                            })
                        })
                    }, L.compose = function () {
                        return L.seq.apply(null, Array.prototype.reverse.call(arguments))
                    }, L.applyEach = I(L.eachOf), L.applyEachSeries = I(L.eachOfSeries), L.forever = function (a, b) {
                        function c(a) {
                            return a ? d(a) : void f(c)
                        }

                        var d = i(b || e), f = J(a);
                        c()
                    }, L.ensureAsync = J, L.constant = s(function (a) {
                        var b = [null].concat(a);
                        return function (a) {
                            return a.apply(this, b)
                        }
                    }), L.wrapSync = L.asyncify = function (a) {
                        return s(function (b) {
                            var c, d = b.pop();
                            try {
                                c = a.apply(this, b)
                            } catch (e) {
                                return d(e)
                            }
                            P(c) && "function" == typeof c.then ? c.then(function (a) {
                                d(null, a)
                            })["catch"](function (a) {
                                d(a.message ? a : new Error(a))
                            }) : d(null, c)
                        })
                    }, "object" == typeof c && c.exports ? c.exports = L : "function" == typeof a && a.amd ? a([], function () {
                        return L
                    }) : M.async = L
                }()
            }).call(this, b("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {_process: 3}],
        2: [function (a, b, c) {
            (function (a) {
                function b(a, b) {
                    for (var c = 0, d = a.length - 1; d >= 0; d--) {
                        var e = a[d];
                        "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--)
                    }
                    if (b) for (; c--; c) a.unshift("..");
                    return a
                }

                function d(a, b) {
                    if (a.filter) return a.filter(b);
                    for (var c = [], d = 0; d < a.length; d++) b(a[d], d, a) && c.push(a[d]);
                    return c
                }

                var e = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, f = function (a) {
                    return e.exec(a).slice(1)
                };
                c.resolve = function () {
                    for (var c = "", e = !1, f = arguments.length - 1; f >= -1 && !e; f--) {
                        var g = f >= 0 ? arguments[f] : a.cwd();
                        if ("string" != typeof g) throw new TypeError("Arguments to path.resolve must be strings");
                        g && (c = g + "/" + c, e = "/" === g.charAt(0))
                    }
                    return c = b(d(c.split("/"), function (a) {
                        return !!a
                    }), !e).join("/"), (e ? "/" : "") + c || "."
                }, c.normalize = function (a) {
                    var e = c.isAbsolute(a), f = "/" === g(a, -1);
                    return a = b(d(a.split("/"), function (a) {
                        return !!a
                    }), !e).join("/"), a || e || (a = "."), a && f && (a += "/"), (e ? "/" : "") + a
                }, c.isAbsolute = function (a) {
                    return "/" === a.charAt(0)
                }, c.join = function () {
                    var a = Array.prototype.slice.call(arguments, 0);
                    return c.normalize(d(a, function (a, b) {
                        if ("string" != typeof a) throw new TypeError("Arguments to path.join must be strings");
                        return a
                    }).join("/"))
                }, c.relative = function (a, b) {
                    function d(a) {
                        for (var b = 0; b < a.length && "" === a[b]; b++) ;
                        for (var c = a.length - 1; c >= 0 && "" === a[c]; c--) ;
                        return b > c ? [] : a.slice(b, c - b + 1)
                    }

                    a = c.resolve(a).substr(1), b = c.resolve(b).substr(1);
                    for (var e = d(a.split("/")), f = d(b.split("/")), g = Math.min(e.length, f.length), h = g, i = 0; g > i; i++) if (e[i] !== f[i]) {
                        h = i;
                        break
                    }
                    for (var j = [], i = h; i < e.length; i++) j.push("..");
                    return j = j.concat(f.slice(h)), j.join("/")
                }, c.sep = "/", c.delimiter = ":", c.dirname = function (a) {
                    var b = f(a), c = b[0], d = b[1];
                    return c || d ? (d && (d = d.substr(0, d.length - 1)), c + d) : "."
                }, c.basename = function (a, b) {
                    var c = f(a)[2];
                    return b && c.substr(-1 * b.length) === b && (c = c.substr(0, c.length - b.length)), c
                }, c.extname = function (a) {
                    return f(a)[3]
                };
                var g = "b" === "ab".substr(-1) ? function (a, b, c) {
                    return a.substr(b, c)
                } : function (a, b, c) {
                    return 0 > b && (b = a.length + b), a.substr(b, c)
                }
            }).call(this, a("_process"))
        }, {_process: 3}],
        3: [function (a, b, c) {
            function d() {
                k = !1, h.length ? j = h.concat(j) : l = -1, j.length && e()
            }

            function e() {
                if (!k) {
                    var a = setTimeout(d);
                    k = !0;
                    for (var b = j.length; b;) {
                        for (h = j, j = []; ++l < b;) h && h[l].run();
                        l = -1, b = j.length
                    }
                    h = null, k = !1, clearTimeout(a)
                }
            }

            function f(a, b) {
                this.fun = a, this.array = b
            }

            function g() {
            }

            var h, i = b.exports = {}, j = [], k = !1, l = -1;
            i.nextTick = function (a) {
                var b = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c];
                j.push(new f(a, b)), 1 !== j.length || k || setTimeout(e, 0)
            }, f.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = g, i.addListener = g, i.once = g, i.off = g, i.removeListener = g, i.removeAllListeners = g, i.emit = g, i.binding = function (a) {
                throw new Error("process.binding is not supported")
            }, i.cwd = function () {
                return "/"
            }, i.chdir = function (a) {
                throw new Error("process.chdir is not supported")
            }, i.umask = function () {
                return 0
            }
        }, {}],
        4: [function (b, c, d) {
            (function (b) {
                !function (e) {
                    function f(a) {
                        throw new RangeError(I[a])
                    }

                    function g(a, b) {
                        for (var c = a.length, d = []; c--;) d[c] = b(a[c]);
                        return d
                    }

                    function h(a, b) {
                        var c = a.split("@"), d = "";
                        c.length > 1 && (d = c[0] + "@", a = c[1]), a = a.replace(H, ".");
                        var e = a.split("."), f = g(e, b).join(".");
                        return d + f
                    }

                    function i(a) {
                        for (var b, c, d = [], e = 0, f = a.length; f > e;) b = a.charCodeAt(e++), b >= 55296 && 56319 >= b && f > e ? (c = a.charCodeAt(e++), 56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b), e--)) : d.push(b);
                        return d
                    }

                    function j(a) {
                        return g(a, function (a) {
                            var b = "";
                            return a > 65535 && (a -= 65536, b += L(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), b += L(a)
                        }).join("")
                    }

                    function k(a) {
                        return 10 > a - 48 ? a - 22 : 26 > a - 65 ? a - 65 : 26 > a - 97 ? a - 97 : x
                    }

                    function l(a, b) {
                        return a + 22 + 75 * (26 > a) - ((0 != b) << 5)
                    }

                    function m(a, b, c) {
                        var d = 0;
                        for (a = c ? K(a / B) : a >> 1, a += K(a / b); a > J * z >> 1; d += x) a = K(a / J);
                        return K(d + (J + 1) * a / (a + A))
                    }

                    function n(a) {
                        var b, c, d, e, g, h, i, l, n, o, p = [], q = a.length, r = 0, s = D, t = C;
                        for (c = a.lastIndexOf(E), 0 > c && (c = 0), d = 0; c > d; ++d) a.charCodeAt(d) >= 128 && f("not-basic"), p.push(a.charCodeAt(d));
                        for (e = c > 0 ? c + 1 : 0; q > e;) {
                            for (g = r, h = 1, i = x; e >= q && f("invalid-input"), l = k(a.charCodeAt(e++)), (l >= x || l > K((w - r) / h)) && f("overflow"), r += l * h, n = t >= i ? y : i >= t + z ? z : i - t, !(n > l); i += x) o = x - n, h > K(w / o) && f("overflow"), h *= o;
                            b = p.length + 1, t = m(r - g, b, 0 == g), K(r / b) > w - s && f("overflow"), s += K(r / b), r %= b, p.splice(r++, 0, s)
                        }
                        return j(p)
                    }

                    function o(a) {
                        var b, c, d, e, g, h, j, k, n, o, p, q, r, s, t, u = [];
                        for (a = i(a), q = a.length, b = D, c = 0, g = C, h = 0; q > h; ++h) p = a[h], 128 > p && u.push(L(p));
                        for (d = e = u.length, e && u.push(E); q > d;) {
                            for (j = w, h = 0; q > h; ++h) p = a[h], p >= b && j > p && (j = p);
                            for (r = d + 1, j - b > K((w - c) / r) && f("overflow"), c += (j - b) * r, b = j, h = 0; q > h; ++h) if (p = a[h], b > p && ++c > w && f("overflow"), p == b) {
                                for (k = c, n = x; o = g >= n ? y : n >= g + z ? z : n - g, !(o > k); n += x) t = k - o, s = x - o, u.push(L(l(o + t % s, 0))), k = K(t / s);
                                u.push(L(l(k, 0))), g = m(c, r, d == e), c = 0, ++d
                            }
                            ++c, ++b
                        }
                        return u.join("")
                    }

                    function p(a) {
                        return h(a, function (a) {
                            return F.test(a) ? n(a.slice(4).toLowerCase()) : a
                        })
                    }

                    function q(a) {
                        return h(a, function (a) {
                            return G.test(a) ? "xn--" + o(a) : a
                        })
                    }

                    var r = "object" == typeof d && d && !d.nodeType && d,
                        s = "object" == typeof c && c && !c.nodeType && c, t = "object" == typeof b && b;
                    (t.global === t || t.window === t || t.self === t) && (e = t);
                    var u, v, w = 2147483647, x = 36, y = 1, z = 26, A = 38, B = 700, C = 72, D = 128, E = "-",
                        F = /^xn--/, G = /[^\x20-\x7E]/, H = /[\x2E\u3002\uFF0E\uFF61]/g, I = {
                            overflow: "Overflow: input needs wider integers to process",
                            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                            "invalid-input": "Invalid input"
                        }, J = x - y, K = Math.floor, L = String.fromCharCode;
                    if (u = {
                            version: "1.3.2",
                            ucs2: {decode: i, encode: j},
                            decode: n,
                            encode: o,
                            toASCII: q,
                            toUnicode: p
                        }, "function" == typeof a && "object" == typeof a.amd && a.amd) a("punycode", function () {
                        return u
                    }); else if (r && s) if (c.exports == r) s.exports = u; else for (v in u) u.hasOwnProperty(v) && (r[v] = u[v]); else e.punycode = u
                }(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        5: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                return Object.prototype.hasOwnProperty.call(a, b)
            }

            b.exports = function (a, b, c, f) {
                b = b || "&", c = c || "=";
                var g = {};
                if ("string" != typeof a || 0 === a.length) return g;
                var h = /\+/g;
                a = a.split(b);
                var i = 1e3;
                f && "number" == typeof f.maxKeys && (i = f.maxKeys);
                var j = a.length;
                i > 0 && j > i && (j = i);
                for (var k = 0; j > k; ++k) {
                    var l, m, n, o, p = a[k].replace(h, "%20"), q = p.indexOf(c);
                    q >= 0 ? (l = p.substr(0, q), m = p.substr(q + 1)) : (l = p, m = ""), n = decodeURIComponent(l), o = decodeURIComponent(m), d(g, n) ? e(g[n]) ? g[n].push(o) : g[n] = [g[n], o] : g[n] = o
                }
                return g
            };
            var e = Array.isArray || function (a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }
        }, {}],
        6: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                if (a.map) return a.map(b);
                for (var c = [], d = 0; d < a.length; d++) c.push(b(a[d], d));
                return c
            }

            var e = function (a) {
                switch (typeof a) {
                    case"string":
                        return a;
                    case"boolean":
                        return a ? "true" : "false";
                    case"number":
                        return isFinite(a) ? a : "";
                    default:
                        return ""
                }
            };
            b.exports = function (a, b, c, h) {
                return b = b || "&", c = c || "=", null === a && (a = void 0), "object" == typeof a ? d(g(a), function (g) {
                    var h = encodeURIComponent(e(g)) + c;
                    return f(a[g]) ? d(a[g], function (a) {
                        return h + encodeURIComponent(e(a))
                    }).join(b) : h + encodeURIComponent(e(a[g]))
                }).join(b) : h ? encodeURIComponent(e(h)) + c + encodeURIComponent(e(a)) : ""
            };
            var f = Array.isArray || function (a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }, g = Object.keys || function (a) {
                var b = [];
                for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
                return b
            }
        }, {}],
        7: [function (a, b, c) {
            "use strict";
            c.decode = c.parse = a("./decode"), c.encode = c.stringify = a("./encode")
        }, {"./decode": 5, "./encode": 6}],
        8: [function (a, b, c) {
            function d() {
                this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
            }

            function e(a, b, c) {
                if (a && j(a) && a instanceof d) return a;
                var e = new d;
                return e.parse(a, b, c), e
            }

            function f(a) {
                return i(a) && (a = e(a)), a instanceof d ? a.format() : d.prototype.format.call(a)
            }

            function g(a, b) {
                return e(a, !1, !0).resolve(b)
            }

            function h(a, b) {
                return a ? e(a, !1, !0).resolveObject(b) : b
            }

            function i(a) {
                return "string" == typeof a
            }

            function j(a) {
                return "object" == typeof a && null !== a
            }

            function k(a) {
                return null === a
            }

            function l(a) {
                return null == a
            }

            var m = a("punycode");
            c.parse = e, c.resolve = g, c.resolveObject = h, c.format = f, c.Url = d;
            var n = /^([a-z0-9.+-]+:)/i, o = /:[0-9]*$/, p = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
                q = ["{", "}", "|", "\\", "^", "`"].concat(p), r = ["'"].concat(q),
                s = ["%", "/", "?", ";", "#"].concat(r), t = ["/", "?", "#"], u = 255, v = /^[a-z0-9A-Z_-]{0,63}$/,
                w = /^([a-z0-9A-Z_-]{0,63})(.*)$/, x = {javascript: !0, "javascript:": !0},
                y = {javascript: !0, "javascript:": !0}, z = {
                    http: !0,
                    https: !0,
                    ftp: !0,
                    gopher: !0,
                    file: !0,
                    "http:": !0,
                    "https:": !0,
                    "ftp:": !0,
                    "gopher:": !0,
                    "file:": !0
                }, A = a("querystring");
            d.prototype.parse = function (a, b, c) {
                if (!i(a)) throw new TypeError("Parameter 'url' must be a string, not " + typeof a);
                var d = a;
                d = d.trim();
                var e = n.exec(d);
                if (e) {
                    e = e[0];
                    var f = e.toLowerCase();
                    this.protocol = f, d = d.substr(e.length)
                }
                if (c || e || d.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var g = "//" === d.substr(0, 2);
                    !g || e && y[e] || (d = d.substr(2), this.slashes = !0)
                }
                if (!y[e] && (g || e && !z[e])) {
                    for (var h = -1, j = 0; j < t.length; j++) {
                        var k = d.indexOf(t[j]);
                        -1 !== k && (-1 === h || h > k) && (h = k)
                    }
                    var l, o;
                    o = -1 === h ? d.lastIndexOf("@") : d.lastIndexOf("@", h), -1 !== o && (l = d.slice(0, o), d = d.slice(o + 1), this.auth = decodeURIComponent(l)), h = -1;
                    for (var j = 0; j < s.length; j++) {
                        var k = d.indexOf(s[j]);
                        -1 !== k && (-1 === h || h > k) && (h = k)
                    }
                    -1 === h && (h = d.length), this.host = d.slice(0, h), d = d.slice(h), this.parseHost(), this.hostname = this.hostname || "";
                    var p = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                    if (!p) for (var q = this.hostname.split(/\./), j = 0, B = q.length; B > j; j++) {
                        var C = q[j];
                        if (C && !C.match(v)) {
                            for (var D = "", E = 0, F = C.length; F > E; E++) D += C.charCodeAt(E) > 127 ? "x" : C[E];
                            if (!D.match(v)) {
                                var G = q.slice(0, j), H = q.slice(j + 1), I = C.match(w);
                                I && (G.push(I[1]), H.unshift(I[2])), H.length && (d = "/" + H.join(".") + d), this.hostname = G.join(".");
                                break
                            }
                        }
                    }
                    if (this.hostname.length > u ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), !p) {
                        for (var J = this.hostname.split("."), K = [], j = 0; j < J.length; ++j) {
                            var L = J[j];
                            K.push(L.match(/[^A-Za-z0-9_-]/) ? "xn--" + m.encode(L) : L)
                        }
                        this.hostname = K.join(".")
                    }
                    var M = this.port ? ":" + this.port : "", N = this.hostname || "";
                    this.host = N + M, this.href += this.host, p && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== d[0] && (d = "/" + d))
                }
                if (!x[f]) for (var j = 0, B = r.length; B > j; j++) {
                    var O = r[j], P = encodeURIComponent(O);
                    P === O && (P = escape(O)), d = d.split(O).join(P)
                }
                var Q = d.indexOf("#");
                -1 !== Q && (this.hash = d.substr(Q), d = d.slice(0, Q));
                var R = d.indexOf("?");
                if (-1 !== R ? (this.search = d.substr(R), this.query = d.substr(R + 1), b && (this.query = A.parse(this.query)), d = d.slice(0, R)) : b && (this.search = "", this.query = {}), d && (this.pathname = d), z[f] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                    var M = this.pathname || "", L = this.search || "";
                    this.path = M + L
                }
                return this.href = this.format(), this
            }, d.prototype.format = function () {
                var a = this.auth || "";
                a && (a = encodeURIComponent(a), a = a.replace(/%3A/i, ":"), a += "@");
                var b = this.protocol || "", c = this.pathname || "", d = this.hash || "", e = !1, f = "";
                this.host ? e = a + this.host : this.hostname && (e = a + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (e += ":" + this.port)), this.query && j(this.query) && Object.keys(this.query).length && (f = A.stringify(this.query));
                var g = this.search || f && "?" + f || "";
                return b && ":" !== b.substr(-1) && (b += ":"), this.slashes || (!b || z[b]) && e !== !1 ? (e = "//" + (e || ""), c && "/" !== c.charAt(0) && (c = "/" + c)) : e || (e = ""), d && "#" !== d.charAt(0) && (d = "#" + d), g && "?" !== g.charAt(0) && (g = "?" + g), c = c.replace(/[?#]/g, function (a) {
                    return encodeURIComponent(a)
                }), g = g.replace("#", "%23"), b + e + c + g + d
            }, d.prototype.resolve = function (a) {
                return this.resolveObject(e(a, !1, !0)).format()
            }, d.prototype.resolveObject = function (a) {
                if (i(a)) {
                    var b = new d;
                    b.parse(a, !1, !0), a = b
                }
                var c = new d;
                if (Object.keys(this).forEach(function (a) {
                        c[a] = this[a]
                    }, this), c.hash = a.hash, "" === a.href) return c.href = c.format(), c;
                if (a.slashes && !a.protocol) return Object.keys(a).forEach(function (b) {
                    "protocol" !== b && (c[b] = a[b])
                }), z[c.protocol] && c.hostname && !c.pathname && (c.path = c.pathname = "/"), c.href = c.format(), c;
                if (a.protocol && a.protocol !== c.protocol) {
                    if (!z[a.protocol]) return Object.keys(a).forEach(function (b) {
                        c[b] = a[b]
                    }), c.href = c.format(), c;
                    if (c.protocol = a.protocol, a.host || y[a.protocol]) c.pathname = a.pathname; else {
                        for (var e = (a.pathname || "").split("/"); e.length && !(a.host = e.shift());) ;
                        a.host || (a.host = ""), a.hostname || (a.hostname = ""), "" !== e[0] && e.unshift(""), e.length < 2 && e.unshift(""), c.pathname = e.join("/")
                    }
                    if (c.search = a.search, c.query = a.query, c.host = a.host || "", c.auth = a.auth, c.hostname = a.hostname || a.host, c.port = a.port, c.pathname || c.search) {
                        var f = c.pathname || "", g = c.search || "";
                        c.path = f + g
                    }
                    return c.slashes = c.slashes || a.slashes, c.href = c.format(), c
                }
                var h = c.pathname && "/" === c.pathname.charAt(0),
                    j = a.host || a.pathname && "/" === a.pathname.charAt(0), m = j || h || c.host && a.pathname, n = m,
                    o = c.pathname && c.pathname.split("/") || [], e = a.pathname && a.pathname.split("/") || [],
                    p = c.protocol && !z[c.protocol];
                if (p && (c.hostname = "", c.port = null, c.host && ("" === o[0] ? o[0] = c.host : o.unshift(c.host)), c.host = "", a.protocol && (a.hostname = null, a.port = null, a.host && ("" === e[0] ? e[0] = a.host : e.unshift(a.host)), a.host = null), m = m && ("" === e[0] || "" === o[0])), j) c.host = a.host || "" === a.host ? a.host : c.host, c.hostname = a.hostname || "" === a.hostname ? a.hostname : c.hostname, c.search = a.search, c.query = a.query, o = e; else if (e.length) o || (o = []), o.pop(), o = o.concat(e), c.search = a.search, c.query = a.query; else if (!l(a.search)) {
                    if (p) {
                        c.hostname = c.host = o.shift();
                        var q = !!(c.host && c.host.indexOf("@") > 0) && c.host.split("@");
                        q && (c.auth = q.shift(), c.host = c.hostname = q.shift())
                    }
                    return c.search = a.search, c.query = a.query, k(c.pathname) && k(c.search) || (c.path = (c.pathname ? c.pathname : "") + (c.search ? c.search : "")), c.href = c.format(), c
                }
                if (!o.length) return c.pathname = null, c.search ? c.path = "/" + c.search : c.path = null, c.href = c.format(), c;
                for (var r = o.slice(-1)[0], s = (c.host || a.host) && ("." === r || ".." === r) || "" === r, t = 0, u = o.length; u >= 0; u--) r = o[u], "." == r ? o.splice(u, 1) : ".." === r ? (o.splice(u, 1), t++) : t && (o.splice(u, 1), t--);
                if (!m && !n) for (; t--; t) o.unshift("..");
                !m || "" === o[0] || o[0] && "/" === o[0].charAt(0) || o.unshift(""), s && "/" !== o.join("/").substr(-1) && o.push("");
                var v = "" === o[0] || o[0] && "/" === o[0].charAt(0);
                if (p) {
                    c.hostname = c.host = v ? "" : o.length ? o.shift() : "";
                    var q = !!(c.host && c.host.indexOf("@") > 0) && c.host.split("@");
                    q && (c.auth = q.shift(), c.host = c.hostname = q.shift())
                }
                return m = m || c.host && o.length, m && !v && o.unshift(""), o.length ? c.pathname = o.join("/") : (c.pathname = null, c.path = null), k(c.pathname) && k(c.search) || (c.path = (c.pathname ? c.pathname : "") + (c.search ? c.search : "")), c.auth = a.auth || c.auth, c.slashes = c.slashes || a.slashes, c.href = c.format(), c
            }, d.prototype.parseHost = function () {
                var a = this.host, b = o.exec(a);
                b && (b = b[0], ":" !== b && (this.port = b.substr(1)), a = a.substr(0, a.length - b.length)), a && (this.hostname = a)
            }
        }, {punycode: 4, querystring: 7}],
        9: [function (a, b, c) {
            "use strict";

            function d(a, b, c) {
                c = c || 2;
                var d = b && b.length, f = d ? b[0] * c : a.length, h = e(a, 0, f, c, !0), i = [];
                if (!h) return i;
                var j, k, m, n, o, p, q;
                if (d && (h = l(a, b, h, c)), a.length > 80 * c) {
                    j = m = a[0], k = n = a[1];
                    for (var r = c; f > r; r += c) o = a[r], p = a[r + 1], j > o && (j = o), k > p && (k = p), o > m && (m = o), p > n && (n = p);
                    q = Math.max(m - j, n - k)
                }
                return g(h, i, c, j, k, q), i
            }

            function e(a, b, c, d, e) {
                var f, g, h, i = 0;
                for (f = b, g = c - d; c > f; f += d) i += (a[g] - a[f]) * (a[f + 1] + a[g + 1]), g = f;
                if (e === i > 0) for (f = b; c > f; f += d) h = C(f, a[f], a[f + 1], h); else for (f = c - d; f >= b; f -= d) h = C(f, a[f], a[f + 1], h);
                return h
            }

            function f(a, b) {
                if (!a) return a;
                b || (b = a);
                var c, d = a;
                do if (c = !1, d.steiner || !w(d, d.next) && 0 !== v(d.prev, d, d.next)) d = d.next; else {
                    if (D(d), d = b = d.prev, d === d.next) return null;
                    c = !0
                } while (c || d !== b);
                return b
            }

            function g(a, b, c, d, e, l, m) {
                if (a) {
                    !m && l && p(a, d, e, l);
                    for (var n, o, q = a; a.prev !== a.next;) if (n = a.prev, o = a.next, l ? i(a, d, e, l) : h(a)) b.push(n.i / c), b.push(a.i / c), b.push(o.i / c), D(a), a = o.next, q = o.next; else if (a = o, a === q) {
                        m ? 1 === m ? (a = j(a, b, c), g(a, b, c, d, e, l, 2)) : 2 === m && k(a, b, c, d, e, l) : g(f(a), b, c, d, e, l, 1);
                        break
                    }
                }
            }

            function h(a) {
                var b = a.prev, c = a, d = a.next;
                if (v(b, c, d) >= 0) return !1;
                for (var e = a.next.next; e !== a.prev;) {
                    if (t(b.x, b.y, c.x, c.y, d.x, d.y, e.x, e.y) && v(e.prev, e, e.next) >= 0) return !1;
                    e = e.next
                }
                return !0
            }

            function i(a, b, c, d) {
                var e = a.prev, f = a, g = a.next;
                if (v(e, f, g) >= 0) return !1;
                for (var h = e.x < f.x ? e.x < g.x ? e.x : g.x : f.x < g.x ? f.x : g.x, i = e.y < f.y ? e.y < g.y ? e.y : g.y : f.y < g.y ? f.y : g.y, j = e.x > f.x ? e.x > g.x ? e.x : g.x : f.x > g.x ? f.x : g.x, k = e.y > f.y ? e.y > g.y ? e.y : g.y : f.y > g.y ? f.y : g.y, l = r(h, i, b, c, d), m = r(j, k, b, c, d), n = a.nextZ; n && n.z <= m;) {
                    if (n !== a.prev && n !== a.next && t(e.x, e.y, f.x, f.y, g.x, g.y, n.x, n.y) && v(n.prev, n, n.next) >= 0) return !1;
                    n = n.nextZ
                }
                for (n = a.prevZ; n && n.z >= l;) {
                    if (n !== a.prev && n !== a.next && t(e.x, e.y, f.x, f.y, g.x, g.y, n.x, n.y) && v(n.prev, n, n.next) >= 0) return !1;
                    n = n.prevZ
                }
                return !0
            }

            function j(a, b, c) {
                var d = a;
                do {
                    var e = d.prev, f = d.next.next;
                    x(e, d, d.next, f) && z(e, f) && z(f, e) && (b.push(e.i / c), b.push(d.i / c), b.push(f.i / c), D(d), D(d.next), d = a = f), d = d.next
                } while (d !== a);
                return d
            }

            function k(a, b, c, d, e, h) {
                var i = a;
                do {
                    for (var j = i.next.next; j !== i.prev;) {
                        if (i.i !== j.i && u(i, j)) {
                            var k = B(i, j);
                            return i = f(i, i.next), k = f(k, k.next), g(i, b, c, d, e, h), void g(k, b, c, d, e, h)
                        }
                        j = j.next
                    }
                    i = i.next
                } while (i !== a)
            }

            function l(a, b, c, d) {
                var g, h, i, j, k, l = [];
                for (g = 0, h = b.length; h > g; g++) i = b[g] * d, j = h - 1 > g ? b[g + 1] * d : a.length, k = e(a, i, j, d, !1), k === k.next && (k.steiner = !0), l.push(s(k));
                for (l.sort(m), g = 0; g < l.length; g++) n(l[g], c), c = f(c, c.next);
                return c
            }

            function m(a, b) {
                return a.x - b.x
            }

            function n(a, b) {
                if (b = o(a, b)) {
                    var c = B(b, a);
                    f(c, c.next)
                }
            }

            function o(a, b) {
                var c, d = b, e = a.x, f = a.y, g = -(1 / 0);
                do {
                    if (f <= d.y && f >= d.next.y) {
                        var h = d.x + (f - d.y) * (d.next.x - d.x) / (d.next.y - d.y);
                        e >= h && h > g && (g = h, c = d.x < d.next.x ? d : d.next)
                    }
                    d = d.next
                } while (d !== b);
                if (!c) return null;
                if (a.x === c.x) return c.prev;
                var i, j = c, k = 1 / 0;
                for (d = c.next; d !== j;) e >= d.x && d.x >= c.x && t(f < c.y ? e : g, f, c.x, c.y, f < c.y ? g : e, f, d.x, d.y) && (i = Math.abs(f - d.y) / (e - d.x), (k > i || i === k && d.x > c.x) && z(d, a) && (c = d, k = i)), d = d.next;
                return c
            }

            function p(a, b, c, d) {
                var e = a;
                do null === e.z && (e.z = r(e.x, e.y, b, c, d)), e.prevZ = e.prev, e.nextZ = e.next, e = e.next; while (e !== a);
                e.prevZ.nextZ = null, e.prevZ = null, q(e)
            }

            function q(a) {
                var b, c, d, e, f, g, h, i, j = 1;
                do {
                    for (c = a, a = null, f = null, g = 0; c;) {
                        for (g++, d = c, h = 0, b = 0; j > b && (h++, d = d.nextZ); b++) ;
                        for (i = j; h > 0 || i > 0 && d;) 0 === h ? (e = d, d = d.nextZ, i--) : 0 !== i && d ? c.z <= d.z ? (e = c, c = c.nextZ, h--) : (e = d, d = d.nextZ, i--) : (e = c, c = c.nextZ, h--), f ? f.nextZ = e : a = e, e.prevZ = f, f = e;
                        c = d
                    }
                    f.nextZ = null, j *= 2
                } while (g > 1);
                return a
            }

            function r(a, b, c, d, e) {
                return a = 32767 * (a - c) / e, b = 32767 * (b - d) / e, a = 16711935 & (a | a << 8), a = 252645135 & (a | a << 4), a = 858993459 & (a | a << 2), a = 1431655765 & (a | a << 1), b = 16711935 & (b | b << 8), b = 252645135 & (b | b << 4), b = 858993459 & (b | b << 2), b = 1431655765 & (b | b << 1), a | b << 1
            }

            function s(a) {
                var b = a, c = a;
                do b.x < c.x && (c = b), b = b.next; while (b !== a);
                return c
            }

            function t(a, b, c, d, e, f, g, h) {
                return (e - g) * (b - h) - (a - g) * (f - h) >= 0 && (a - g) * (d - h) - (c - g) * (b - h) >= 0 && (c - g) * (f - h) - (e - g) * (d - h) >= 0
            }

            function u(a, b) {
                return w(a, b) || a.next.i !== b.i && a.prev.i !== b.i && !y(a, b) && z(a, b) && z(b, a) && A(a, b)
            }

            function v(a, b, c) {
                return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y)
            }

            function w(a, b) {
                return a.x === b.x && a.y === b.y
            }

            function x(a, b, c, d) {
                return v(a, b, c) > 0 != v(a, b, d) > 0 && v(c, d, a) > 0 != v(c, d, b) > 0
            }

            function y(a, b) {
                var c = a;
                do {
                    if (c.i !== a.i && c.next.i !== a.i && c.i !== b.i && c.next.i !== b.i && x(c, c.next, a, b)) return !0;
                    c = c.next
                } while (c !== a);
                return !1
            }

            function z(a, b) {
                return v(a.prev, a, a.next) < 0 ? v(a, b, a.next) >= 0 && v(a, a.prev, b) >= 0 : v(a, b, a.prev) < 0 || v(a, a.next, b) < 0
            }

            function A(a, b) {
                var c = a, d = !1, e = (a.x + b.x) / 2, f = (a.y + b.y) / 2;
                do c.y > f != c.next.y > f && e < (c.next.x - c.x) * (f - c.y) / (c.next.y - c.y) + c.x && (d = !d), c = c.next; while (c !== a);
                return d
            }

            function B(a, b) {
                var c = new E(a.i, a.x, a.y), d = new E(b.i, b.x, b.y), e = a.next, f = b.prev;
                return a.next = b, b.prev = a, c.next = e, e.prev = c, d.next = c, c.prev = d, f.next = d, d.prev = f, d
            }

            function C(a, b, c, d) {
                var e = new E(a, b, c);
                return d ? (e.next = d.next, e.prev = d, d.next.prev = e, d.next = e) : (e.prev = e, e.next = e), e
            }

            function D(a) {
                a.next.prev = a.prev, a.prev.next = a.next, a.prevZ && (a.prevZ.nextZ = a.nextZ), a.nextZ && (a.nextZ.prevZ = a.prevZ)
            }

            function E(a, b, c) {
                this.i = a, this.x = b, this.y = c, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
            }

            b.exports = d
        }, {}],
        10: [function (a, b, c) {
            "use strict";

            function d(a, b, c) {
                this.fn = a, this.context = b, this.once = c || !1
            }

            function e() {
            }

            var f = "function" != typeof Object.create && "~";
            e.prototype._events = void 0, e.prototype.listeners = function (a, b) {
                var c = f ? f + a : a, d = this._events && this._events[c];
                if (b) return !!d;
                if (!d) return [];
                if (d.fn) return [d.fn];
                for (var e = 0, g = d.length, h = new Array(g); g > e; e++) h[e] = d[e].fn;
                return h
            }, e.prototype.emit = function (a, b, c, d, e, g) {
                var h = f ? f + a : a;
                if (!this._events || !this._events[h]) return !1;
                var i, j, k = this._events[h], l = arguments.length;
                if ("function" == typeof k.fn) {
                    switch (k.once && this.removeListener(a, k.fn, void 0, !0), l) {
                        case 1:
                            return k.fn.call(k.context), !0;
                        case 2:
                            return k.fn.call(k.context, b), !0;
                        case 3:
                            return k.fn.call(k.context, b, c), !0;
                        case 4:
                            return k.fn.call(k.context, b, c, d), !0;
                        case 5:
                            return k.fn.call(k.context, b, c, d, e), !0;
                        case 6:
                            return k.fn.call(k.context, b, c, d, e, g), !0
                    }
                    for (j = 1, i = new Array(l - 1); l > j; j++) i[j - 1] = arguments[j];
                    k.fn.apply(k.context, i)
                } else {
                    var m, n = k.length;
                    for (j = 0; n > j; j++) switch (k[j].once && this.removeListener(a, k[j].fn, void 0, !0), l) {
                        case 1:
                            k[j].fn.call(k[j].context);
                            break;
                        case 2:
                            k[j].fn.call(k[j].context, b);
                            break;
                        case 3:
                            k[j].fn.call(k[j].context, b, c);
                            break;
                        default:
                            if (!i) for (m = 1, i = new Array(l - 1); l > m; m++) i[m - 1] = arguments[m];
                            k[j].fn.apply(k[j].context, i)
                    }
                }
                return !0
            }, e.prototype.on = function (a, b, c) {
                var e = new d(b, c || this), g = f ? f + a : a;
                return this._events || (this._events = f ? {} : Object.create(null)), this._events[g] ? this._events[g].fn ? this._events[g] = [this._events[g], e] : this._events[g].push(e) : this._events[g] = e, this
            }, e.prototype.once = function (a, b, c) {
                var e = new d(b, c || this, (!0)), g = f ? f + a : a;
                return this._events || (this._events = f ? {} : Object.create(null)), this._events[g] ? this._events[g].fn ? this._events[g] = [this._events[g], e] : this._events[g].push(e) : this._events[g] = e, this
            }, e.prototype.removeListener = function (a, b, c, d) {
                var e = f ? f + a : a;
                if (!this._events || !this._events[e]) return this;
                var g = this._events[e], h = [];
                if (b) if (g.fn) (g.fn !== b || d && !g.once || c && g.context !== c) && h.push(g); else for (var i = 0, j = g.length; j > i; i++) (g[i].fn !== b || d && !g[i].once || c && g[i].context !== c) && h.push(g[i]);
                return h.length ? this._events[e] = 1 === h.length ? h[0] : h : delete this._events[e], this
            }, e.prototype.removeAllListeners = function (a) {
                return this._events ? (a ? delete this._events[f ? f + a : a] : this._events = f ? {} : Object.create(null), this) : this
            }, e.prototype.off = e.prototype.removeListener, e.prototype.addListener = e.prototype.on, e.prototype.setMaxListeners = function () {
                return this
            }, e.prefixed = f, "undefined" != typeof b && (b.exports = e)
        }, {}],
        11: [function (a, b, c) {
            "use strict";

            function d(a) {
                if (null === a || void 0 === a) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(a)
            }

            var e = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable;
            b.exports = Object.assign || function (a, b) {
                for (var c, g, h = d(a), i = 1; i < arguments.length; i++) {
                    c = Object(arguments[i]);
                    for (var j in c) e.call(c, j) && (h[j] = c[j]);
                    if (Object.getOwnPropertySymbols) {
                        g = Object.getOwnPropertySymbols(c);
                        for (var k = 0; k < g.length; k++) f.call(c, g[k]) && (h[g[k]] = c[g[k]])
                    }
                }
                return h
            }
        }, {}],
        12: [function (b, c, d) {
            (function (b) {
                !function () {
                    function d(a) {
                        var b = !1;
                        return function () {
                            if (b) throw new Error("Callback was already called.");
                            b = !0, a.apply(e, arguments)
                        }
                    }

                    var e, f, g = {};
                    e = this, null != e && (f = e.async), g.noConflict = function () {
                        return e.async = f, g
                    };
                    var h = Object.prototype.toString, i = Array.isArray || function (a) {
                        return "[object Array]" === h.call(a)
                    }, j = function (a, b) {
                        for (var c = 0; c < a.length; c += 1) b(a[c], c, a)
                    }, k = function (a, b) {
                        if (a.map) return a.map(b);
                        var c = [];
                        return j(a, function (a, d, e) {
                            c.push(b(a, d, e))
                        }), c
                    }, l = function (a, b, c) {
                        return a.reduce ? a.reduce(b, c) : (j(a, function (a, d, e) {
                            c = b(c, a, d, e)
                        }), c)
                    }, m = function (a) {
                        if (Object.keys) return Object.keys(a);
                        var b = [];
                        for (var c in a) a.hasOwnProperty(c) && b.push(c);
                        return b
                    };
                    "undefined" != typeof b && b.nextTick ? (g.nextTick = b.nextTick, "undefined" != typeof setImmediate ? g.setImmediate = function (a) {
                        setImmediate(a)
                    } : g.setImmediate = g.nextTick) : "function" == typeof setImmediate ? (g.nextTick = function (a) {
                        setImmediate(a)
                    }, g.setImmediate = g.nextTick) : (g.nextTick = function (a) {
                        setTimeout(a, 0)
                    }, g.setImmediate = g.nextTick), g.each = function (a, b, c) {
                        function e(b) {
                            b ? (c(b), c = function () {
                            }) : (f += 1, f >= a.length && c())
                        }

                        if (c = c || function () {
                            }, !a.length) return c();
                        var f = 0;
                        j(a, function (a) {
                            b(a, d(e))
                        })
                    }, g.forEach = g.each, g.eachSeries = function (a, b, c) {
                        if (c = c || function () {
                            }, !a.length) return c();
                        var d = 0, e = function () {
                            b(a[d], function (b) {
                                b ? (c(b), c = function () {
                                }) : (d += 1, d >= a.length ? c() : e())
                            })
                        };
                        e()
                    }, g.forEachSeries = g.eachSeries, g.eachLimit = function (a, b, c, d) {
                        var e = n(b);
                        e.apply(null, [a, c, d])
                    }, g.forEachLimit = g.eachLimit;
                    var n = function (a) {
                        return function (b, c, d) {
                            if (d = d || function () {
                                }, !b.length || 0 >= a) return d();
                            var e = 0, f = 0, g = 0;
                            !function h() {
                                if (e >= b.length) return d();
                                for (; a > g && f < b.length;) f += 1, g += 1, c(b[f - 1], function (a) {
                                    a ? (d(a), d = function () {
                                    }) : (e += 1, g -= 1, e >= b.length ? d() : h())
                                })
                            }()
                        }
                    }, o = function (a) {
                        return function () {
                            var b = Array.prototype.slice.call(arguments);
                            return a.apply(null, [g.each].concat(b))
                        }
                    }, p = function (a, b) {
                        return function () {
                            var c = Array.prototype.slice.call(arguments);
                            return b.apply(null, [n(a)].concat(c))
                        }
                    }, q = function (a) {
                        return function () {
                            var b = Array.prototype.slice.call(arguments);
                            return a.apply(null, [g.eachSeries].concat(b))
                        }
                    }, r = function (a, b, c, d) {
                        if (b = k(b, function (a, b) {
                                return {index: b, value: a}
                            }), d) {
                            var e = [];
                            a(b, function (a, b) {
                                c(a.value, function (c, d) {
                                    e[a.index] = d, b(c)
                                })
                            }, function (a) {
                                d(a, e)
                            })
                        } else a(b, function (a, b) {
                            c(a.value, function (a) {
                                b(a)
                            })
                        })
                    };
                    g.map = o(r), g.mapSeries = q(r), g.mapLimit = function (a, b, c, d) {
                        return s(b)(a, c, d)
                    };
                    var s = function (a) {
                        return p(a, r)
                    };
                    g.reduce = function (a, b, c, d) {
                        g.eachSeries(a, function (a, d) {
                            c(b, a, function (a, c) {
                                b = c, d(a)
                            })
                        }, function (a) {
                            d(a, b)
                        })
                    }, g.inject = g.reduce, g.foldl = g.reduce, g.reduceRight = function (a, b, c, d) {
                        var e = k(a, function (a) {
                            return a
                        }).reverse();
                        g.reduce(e, b, c, d)
                    }, g.foldr = g.reduceRight;
                    var t = function (a, b, c, d) {
                        var e = [];
                        b = k(b, function (a, b) {
                            return {index: b, value: a}
                        }), a(b, function (a, b) {
                            c(a.value, function (c) {
                                c && e.push(a), b()
                            })
                        }, function (a) {
                            d(k(e.sort(function (a, b) {
                                return a.index - b.index
                            }), function (a) {
                                return a.value
                            }))
                        })
                    };
                    g.filter = o(t), g.filterSeries = q(t), g.select = g.filter, g.selectSeries = g.filterSeries;
                    var u = function (a, b, c, d) {
                        var e = [];
                        b = k(b, function (a, b) {
                            return {index: b, value: a}
                        }), a(b, function (a, b) {
                            c(a.value, function (c) {
                                c || e.push(a), b()
                            })
                        }, function (a) {
                            d(k(e.sort(function (a, b) {
                                return a.index - b.index
                            }), function (a) {
                                return a.value
                            }))
                        })
                    };
                    g.reject = o(u), g.rejectSeries = q(u);
                    var v = function (a, b, c, d) {
                        a(b, function (a, b) {
                            c(a, function (c) {
                                c ? (d(a), d = function () {
                                }) : b()
                            })
                        }, function (a) {
                            d()
                        })
                    };
                    g.detect = o(v), g.detectSeries = q(v), g.some = function (a, b, c) {
                        g.each(a, function (a, d) {
                            b(a, function (a) {
                                a && (c(!0), c = function () {
                                }), d()
                            })
                        }, function (a) {
                            c(!1)
                        })
                    }, g.any = g.some, g.every = function (a, b, c) {
                        g.each(a, function (a, d) {
                            b(a, function (a) {
                                a || (c(!1), c = function () {
                                }), d()
                            })
                        }, function (a) {
                            c(!0)
                        })
                    }, g.all = g.every, g.sortBy = function (a, b, c) {
                        g.map(a, function (a, c) {
                            b(a, function (b, d) {
                                b ? c(b) : c(null, {value: a, criteria: d})
                            })
                        }, function (a, b) {
                            if (a) return c(a);
                            var d = function (a, b) {
                                var c = a.criteria, d = b.criteria;
                                return d > c ? -1 : c > d ? 1 : 0
                            };
                            c(null, k(b.sort(d), function (a) {
                                return a.value
                            }))
                        })
                    }, g.auto = function (a, b) {
                        b = b || function () {
                        };
                        var c = m(a), d = c.length;
                        if (!d) return b();
                        var e = {}, f = [], h = function (a) {
                            f.unshift(a)
                        }, k = function (a) {
                            for (var b = 0; b < f.length; b += 1) if (f[b] === a) return void f.splice(b, 1)
                        }, n = function () {
                            d--, j(f.slice(0), function (a) {
                                a()
                            })
                        };
                        h(function () {
                            if (!d) {
                                var a = b;
                                b = function () {
                                }, a(null, e)
                            }
                        }), j(c, function (c) {
                            var d = i(a[c]) ? a[c] : [a[c]], f = function (a) {
                                var d = Array.prototype.slice.call(arguments, 1);
                                if (d.length <= 1 && (d = d[0]), a) {
                                    var f = {};
                                    j(m(e), function (a) {
                                        f[a] = e[a]
                                    }), f[c] = d, b(a, f), b = function () {
                                    }
                                } else e[c] = d, g.setImmediate(n)
                            }, o = d.slice(0, Math.abs(d.length - 1)) || [], p = function () {
                                return l(o, function (a, b) {
                                    return a && e.hasOwnProperty(b)
                                }, !0) && !e.hasOwnProperty(c)
                            };
                            if (p()) d[d.length - 1](f, e); else {
                                var q = function () {
                                    p() && (k(q), d[d.length - 1](f, e))
                                };
                                h(q)
                            }
                        })
                    }, g.retry = function (a, b, c) {
                        var d = 5, e = [];
                        "function" == typeof a && (c = b, b = a, a = d), a = parseInt(a, 10) || d;
                        var f = function (d, f) {
                            for (var h = function (a, b) {
                                return function (c) {
                                    a(function (a, d) {
                                        c(!a || b, {err: a, result: d})
                                    }, f)
                                }
                            }; a;) e.push(h(b, !(a -= 1)));
                            g.series(e, function (a, b) {
                                b = b[b.length - 1], (d || c)(b.err, b.result)
                            })
                        };
                        return c ? f() : f;
                    }, g.waterfall = function (a, b) {
                        if (b = b || function () {
                            }, !i(a)) {
                            var c = new Error("First argument to waterfall must be an array of functions");
                            return b(c)
                        }
                        if (!a.length) return b();
                        var d = function (a) {
                            return function (c) {
                                if (c) b.apply(null, arguments), b = function () {
                                }; else {
                                    var e = Array.prototype.slice.call(arguments, 1), f = a.next();
                                    f ? e.push(d(f)) : e.push(b), g.setImmediate(function () {
                                        a.apply(null, e)
                                    })
                                }
                            }
                        };
                        d(g.iterator(a))()
                    };
                    var w = function (a, b, c) {
                        if (c = c || function () {
                            }, i(b)) a.map(b, function (a, b) {
                            a && a(function (a) {
                                var c = Array.prototype.slice.call(arguments, 1);
                                c.length <= 1 && (c = c[0]), b.call(null, a, c)
                            })
                        }, c); else {
                            var d = {};
                            a.each(m(b), function (a, c) {
                                b[a](function (b) {
                                    var e = Array.prototype.slice.call(arguments, 1);
                                    e.length <= 1 && (e = e[0]), d[a] = e, c(b)
                                })
                            }, function (a) {
                                c(a, d)
                            })
                        }
                    };
                    g.parallel = function (a, b) {
                        w({map: g.map, each: g.each}, a, b)
                    }, g.parallelLimit = function (a, b, c) {
                        w({map: s(b), each: n(b)}, a, c)
                    }, g.series = function (a, b) {
                        if (b = b || function () {
                            }, i(a)) g.mapSeries(a, function (a, b) {
                            a && a(function (a) {
                                var c = Array.prototype.slice.call(arguments, 1);
                                c.length <= 1 && (c = c[0]), b.call(null, a, c)
                            })
                        }, b); else {
                            var c = {};
                            g.eachSeries(m(a), function (b, d) {
                                a[b](function (a) {
                                    var e = Array.prototype.slice.call(arguments, 1);
                                    e.length <= 1 && (e = e[0]), c[b] = e, d(a)
                                })
                            }, function (a) {
                                b(a, c)
                            })
                        }
                    }, g.iterator = function (a) {
                        var b = function (c) {
                            var d = function () {
                                return a.length && a[c].apply(null, arguments), d.next()
                            };
                            return d.next = function () {
                                return c < a.length - 1 ? b(c + 1) : null
                            }, d
                        };
                        return b(0)
                    }, g.apply = function (a) {
                        var b = Array.prototype.slice.call(arguments, 1);
                        return function () {
                            return a.apply(null, b.concat(Array.prototype.slice.call(arguments)))
                        }
                    };
                    var x = function (a, b, c, d) {
                        var e = [];
                        a(b, function (a, b) {
                            c(a, function (a, c) {
                                e = e.concat(c || []), b(a)
                            })
                        }, function (a) {
                            d(a, e)
                        })
                    };
                    g.concat = o(x), g.concatSeries = q(x), g.whilst = function (a, b, c) {
                        a() ? b(function (d) {
                            return d ? c(d) : void g.whilst(a, b, c)
                        }) : c()
                    }, g.doWhilst = function (a, b, c) {
                        a(function (d) {
                            if (d) return c(d);
                            var e = Array.prototype.slice.call(arguments, 1);
                            b.apply(null, e) ? g.doWhilst(a, b, c) : c()
                        })
                    }, g.until = function (a, b, c) {
                        a() ? c() : b(function (d) {
                            return d ? c(d) : void g.until(a, b, c)
                        })
                    }, g.doUntil = function (a, b, c) {
                        a(function (d) {
                            if (d) return c(d);
                            var e = Array.prototype.slice.call(arguments, 1);
                            b.apply(null, e) ? c() : g.doUntil(a, b, c)
                        })
                    }, g.queue = function (a, b) {
                        function c(a, b, c, d) {
                            return a.started || (a.started = !0), i(b) || (b = [b]), 0 == b.length ? g.setImmediate(function () {
                                a.drain && a.drain()
                            }) : void j(b, function (b) {
                                var e = {data: b, callback: "function" == typeof d ? d : null};
                                c ? a.tasks.unshift(e) : a.tasks.push(e), a.saturated && a.tasks.length === a.concurrency && a.saturated(), g.setImmediate(a.process)
                            })
                        }

                        void 0 === b && (b = 1);
                        var e = 0, f = {
                            tasks: [],
                            concurrency: b,
                            saturated: null,
                            empty: null,
                            drain: null,
                            started: !1,
                            paused: !1,
                            push: function (a, b) {
                                c(f, a, !1, b)
                            },
                            kill: function () {
                                f.drain = null, f.tasks = []
                            },
                            unshift: function (a, b) {
                                c(f, a, !0, b)
                            },
                            process: function () {
                                if (!f.paused && e < f.concurrency && f.tasks.length) {
                                    var b = f.tasks.shift();
                                    f.empty && 0 === f.tasks.length && f.empty(), e += 1;
                                    var c = function () {
                                        e -= 1, b.callback && b.callback.apply(b, arguments), f.drain && f.tasks.length + e === 0 && f.drain(), f.process()
                                    }, g = d(c);
                                    a(b.data, g)
                                }
                            },
                            length: function () {
                                return f.tasks.length
                            },
                            running: function () {
                                return e
                            },
                            idle: function () {
                                return f.tasks.length + e === 0
                            },
                            pause: function () {
                                f.paused !== !0 && (f.paused = !0)
                            },
                            resume: function () {
                                if (f.paused !== !1) {
                                    f.paused = !1;
                                    for (var a = 1; a <= f.concurrency; a++) g.setImmediate(f.process)
                                }
                            }
                        };
                        return f
                    }, g.priorityQueue = function (a, b) {
                        function c(a, b) {
                            return a.priority - b.priority
                        }

                        function d(a, b, c) {
                            for (var d = -1, e = a.length - 1; e > d;) {
                                var f = d + (e - d + 1 >>> 1);
                                c(b, a[f]) >= 0 ? d = f : e = f - 1
                            }
                            return d
                        }

                        function e(a, b, e, f) {
                            return a.started || (a.started = !0), i(b) || (b = [b]), 0 == b.length ? g.setImmediate(function () {
                                a.drain && a.drain()
                            }) : void j(b, function (b) {
                                var h = {data: b, priority: e, callback: "function" == typeof f ? f : null};
                                a.tasks.splice(d(a.tasks, h, c) + 1, 0, h), a.saturated && a.tasks.length === a.concurrency && a.saturated(), g.setImmediate(a.process)
                            })
                        }

                        var f = g.queue(a, b);
                        return f.push = function (a, b, c) {
                            e(f, a, b, c)
                        }, delete f.unshift, f
                    }, g.cargo = function (a, b) {
                        var c = !1, d = [], e = {
                            tasks: d,
                            payload: b,
                            saturated: null,
                            empty: null,
                            drain: null,
                            drained: !0,
                            push: function (a, c) {
                                i(a) || (a = [a]), j(a, function (a) {
                                    d.push({
                                        data: a,
                                        callback: "function" == typeof c ? c : null
                                    }), e.drained = !1, e.saturated && d.length === b && e.saturated()
                                }), g.setImmediate(e.process)
                            },
                            process: function f() {
                                if (!c) {
                                    if (0 === d.length) return e.drain && !e.drained && e.drain(), void(e.drained = !0);
                                    var g = "number" == typeof b ? d.splice(0, b) : d.splice(0, d.length),
                                        h = k(g, function (a) {
                                            return a.data
                                        });
                                    e.empty && e.empty(), c = !0, a(h, function () {
                                        c = !1;
                                        var a = arguments;
                                        j(g, function (b) {
                                            b.callback && b.callback.apply(null, a)
                                        }), f()
                                    })
                                }
                            },
                            length: function () {
                                return d.length
                            },
                            running: function () {
                                return c
                            }
                        };
                        return e
                    };
                    var y = function (a) {
                        return function (b) {
                            var c = Array.prototype.slice.call(arguments, 1);
                            b.apply(null, c.concat([function (b) {
                                var c = Array.prototype.slice.call(arguments, 1);
                                "undefined" != typeof console && (b ? console.error && console.error(b) : console[a] && j(c, function (b) {
                                    console[a](b)
                                }))
                            }]))
                        }
                    };
                    g.log = y("log"), g.dir = y("dir"), g.memoize = function (a, b) {
                        var c = {}, d = {};
                        b = b || function (a) {
                            return a
                        };
                        var e = function () {
                            var e = Array.prototype.slice.call(arguments), f = e.pop(), h = b.apply(null, e);
                            h in c ? g.nextTick(function () {
                                f.apply(null, c[h])
                            }) : h in d ? d[h].push(f) : (d[h] = [f], a.apply(null, e.concat([function () {
                                c[h] = arguments;
                                var a = d[h];
                                delete d[h];
                                for (var b = 0, e = a.length; e > b; b++) a[b].apply(null, arguments)
                            }])))
                        };
                        return e.memo = c, e.unmemoized = a, e
                    }, g.unmemoize = function (a) {
                        return function () {
                            return (a.unmemoized || a).apply(null, arguments)
                        }
                    }, g.times = function (a, b, c) {
                        for (var d = [], e = 0; a > e; e++) d.push(e);
                        return g.map(d, b, c)
                    }, g.timesSeries = function (a, b, c) {
                        for (var d = [], e = 0; a > e; e++) d.push(e);
                        return g.mapSeries(d, b, c)
                    }, g.seq = function () {
                        var a = arguments;
                        return function () {
                            var b = this, c = Array.prototype.slice.call(arguments), d = c.pop();
                            g.reduce(a, c, function (a, c, d) {
                                c.apply(b, a.concat([function () {
                                    var a = arguments[0], b = Array.prototype.slice.call(arguments, 1);
                                    d(a, b)
                                }]))
                            }, function (a, c) {
                                d.apply(b, [a].concat(c))
                            })
                        }
                    }, g.compose = function () {
                        return g.seq.apply(null, Array.prototype.reverse.call(arguments))
                    };
                    var z = function (a, b) {
                        var c = function () {
                            var c = this, d = Array.prototype.slice.call(arguments), e = d.pop();
                            return a(b, function (a, b) {
                                a.apply(c, d.concat([b]))
                            }, e)
                        };
                        if (arguments.length > 2) {
                            var d = Array.prototype.slice.call(arguments, 2);
                            return c.apply(this, d)
                        }
                        return c
                    };
                    g.applyEach = o(z), g.applyEachSeries = q(z), g.forever = function (a, b) {
                        function c(d) {
                            if (d) {
                                if (b) return b(d);
                                throw d
                            }
                            a(c)
                        }

                        c()
                    }, "undefined" != typeof c && c.exports ? c.exports = g : "undefined" != typeof a && a.amd ? a([], function () {
                        return g
                    }) : e.async = g
                }()
            }).call(this, b("_process"))
        }, {_process: 3}],
        13: [function (a, b, c) {
            function d(a, b) {
                h.call(this), b = b || 10, this.baseUrl = a || "", this.progress = 0, this.loading = !1, this._progressChunk = 0, this._beforeMiddleware = [], this._afterMiddleware = [], this._boundLoadResource = this._loadResource.bind(this), this._boundOnLoad = this._onLoad.bind(this), this._buffer = [], this._numToLoad = 0, this._queue = e.queue(this._boundLoadResource, b), this.resources = {}
            }

            var e = a("async"), f = a("url"), g = a("./Resource"), h = a("eventemitter3");
            d.prototype = Object.create(h.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.add = d.prototype.enqueue = function (a, b, c, d) {
                if (Array.isArray(a)) {
                    for (var e = 0; e < a.length; ++e) this.add(a[e]);
                    return this
                }
                if ("object" == typeof a && (d = b || a.callback || a.onComplete, c = a, b = a.url, a = a.name || a.key || a.url), "string" != typeof b && (d = c, c = b, b = a), "string" != typeof b) throw new Error("No url passed to add resource to loader.");
                if ("function" == typeof c && (d = c, c = null), this.resources[a]) throw new Error('Resource with name "' + a + '" already exists.');
                return b = this._handleBaseUrl(b), this.resources[a] = new g(a, b, c), "function" == typeof d && this.resources[a].once("afterMiddleware", d), this._numToLoad++, this._queue.started ? (this._queue.push(this.resources[a]), this._progressChunk = (100 - this.progress) / (this._queue.length() + this._queue.running())) : (this._buffer.push(this.resources[a]), this._progressChunk = 100 / this._buffer.length), this
            }, d.prototype._handleBaseUrl = function (a) {
                var b = f.parse(a);
                return b.protocol || 0 === b.pathname.indexOf("//") ? a : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== a.charAt(0) ? this.baseUrl + "/" + a : this.baseUrl + a
            }, d.prototype.before = d.prototype.pre = function (a) {
                return this._beforeMiddleware.push(a), this
            }, d.prototype.after = d.prototype.use = function (a) {
                return this._afterMiddleware.push(a), this
            }, d.prototype.reset = function () {
                this.progress = 0, this.loading = !1, this._progressChunk = 0, this._buffer.length = 0, this._numToLoad = 0, this._queue.kill(), this._queue.started = !1, this.resources = {}
            }, d.prototype.load = function (a) {
                if ("function" == typeof a && this.once("complete", a), this._queue.started) return this;
                this.emit("start", this);
                for (var b = 0; b < this._buffer.length; ++b) this._queue.push(this._buffer[b]);
                return this._buffer.length = 0, this
            }, d.prototype._loadResource = function (a, b) {
                var c = this;
                a._dequeue = b, this._runMiddleware(a, this._beforeMiddleware, function () {
                    a.load(c._boundOnLoad)
                })
            }, d.prototype._onComplete = function () {
                this.emit("complete", this, this.resources)
            }, d.prototype._onLoad = function (a) {
                this.progress += this._progressChunk, this.emit("progress", this, a), this._runMiddleware(a, this._afterMiddleware, function () {
                    a.emit("afterMiddleware", a), this._numToLoad--, 0 === this._numToLoad && (this.progress = 100, this._onComplete()), a.error ? this.emit("error", a.error, this, a) : this.emit("load", this, a)
                }), a._dequeue()
            }, d.prototype._runMiddleware = function (a, b, c) {
                var d = this;
                e.eachSeries(b, function (b, c) {
                    b.call(d, a, c)
                }, c.bind(this, a))
            }, d.LOAD_TYPE = g.LOAD_TYPE, d.XHR_READY_STATE = g.XHR_READY_STATE, d.XHR_RESPONSE_TYPE = g.XHR_RESPONSE_TYPE
        }, {"./Resource": 14, async: 12, eventemitter3: 10, url: 8}],
        14: [function (a, b, c) {
            function d(a, b, c) {
                if (g.call(this), c = c || {}, "string" != typeof a || "string" != typeof b) throw new Error("Both name and url are required for constructing a resource.");
                this.name = a, this.url = b, this.isDataUrl = 0 === this.url.indexOf("data:"), this.data = null, this.crossOrigin = c.crossOrigin === !0 ? "anonymous" : c.crossOrigin, this.loadType = c.loadType || this._determineLoadType(), this.xhrType = c.xhrType, this.metadata = c.metadata || {}, this.error = null, this.xhr = null, this.isJson = !1, this.isXml = !1, this.isImage = !1, this.isAudio = !1, this.isVideo = !1, this._dequeue = null, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this)
            }

            function e(a) {
                return a.toString().replace("object ", "")
            }

            function f(a, b, c) {
                b && 0 === b.indexOf(".") && (b = b.substring(1)), b && (a[b] = c)
            }

            var g = a("eventemitter3"), h = a("url"),
                i = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest), j = null;
            d.prototype = Object.create(g.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.complete = function () {
                this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError), this.data.removeEventListener("load", this._boundComplete), this.data.removeEventListener("progress", this._boundOnProgress), this.data.removeEventListener("canplaythrough", this._boundComplete)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError), this.xhr.removeEventListener("abort", this._boundXhrOnAbort), this.xhr.removeEventListener("progress", this._boundOnProgress), this.xhr.removeEventListener("load", this._boundXhrOnLoad)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null)), this.emit("complete", this)
            }, d.prototype.load = function (a) {
                switch (this.emit("start", this), a && this.once("complete", a), (this.crossOrigin === !1 || "string" != typeof this.crossOrigin) && (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
                    case d.LOAD_TYPE.IMAGE:
                        this._loadImage();
                        break;
                    case d.LOAD_TYPE.AUDIO:
                        this._loadElement("audio");
                        break;
                    case d.LOAD_TYPE.VIDEO:
                        this._loadElement("video");
                        break;
                    case d.LOAD_TYPE.XHR:
                    default:
                        i && this.crossOrigin ? this._loadXdr() : this._loadXhr()
                }
            }, d.prototype._loadImage = function () {
                this.data = new Image, this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.data.src = this.url, this.isImage = !0, this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1)
            }, d.prototype._loadElement = function (a) {
                if ("audio" === a && "undefined" != typeof Audio ? this.data = new Audio : this.data = document.createElement(a), null === this.data) return this.error = new Error("Unsupported element " + a), void this.complete();
                if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url; else if (Array.isArray(this.url)) for (var b = 0; b < this.url.length; ++b) this.data.appendChild(this._createSource(a, this.url[b])); else this.data.appendChild(this._createSource(a, this.url));
                this["is" + a[0].toUpperCase() + a.substring(1)] = !0, this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load()
            }, d.prototype._loadXhr = function () {
                "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                var a = this.xhr = new XMLHttpRequest;
                a.open("GET", this.url, !0), this.xhrType === d.XHR_RESPONSE_TYPE.JSON || this.xhrType === d.XHR_RESPONSE_TYPE.DOCUMENT ? a.responseType = d.XHR_RESPONSE_TYPE.TEXT : a.responseType = this.xhrType, a.addEventListener("error", this._boundXhrOnError, !1), a.addEventListener("abort", this._boundXhrOnAbort, !1), a.addEventListener("progress", this._boundOnProgress, !1), a.addEventListener("load", this._boundXhrOnLoad, !1), a.send()
            }, d.prototype._loadXdr = function () {
                "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                var a = this.xhr = new XDomainRequest;
                a.timeout = 5e3, a.onerror = this._boundXhrOnError, a.ontimeout = this._boundXdrOnTimeout, a.onprogress = this._boundOnProgress, a.onload = this._boundXhrOnLoad, a.open("GET", this.url, !0), setTimeout(function () {
                    a.send()
                }, 0)
            }, d.prototype._createSource = function (a, b, c) {
                c || (c = a + "/" + b.substr(b.lastIndexOf(".") + 1));
                var d = document.createElement("source");
                return d.src = b, d.type = c, d
            }, d.prototype._onError = function (a) {
                this.error = new Error("Failed to load element using " + a.target.nodeName), this.complete()
            }, d.prototype._onProgress = function (a) {
                a && a.lengthComputable && this.emit("progress", this, a.loaded / a.total)
            }, d.prototype._xhrOnError = function () {
                this.error = new Error(e(this.xhr) + " Request failed. Status: " + this.xhr.status + ', text: "' + this.xhr.statusText + '"'), this.complete()
            }, d.prototype._xhrOnAbort = function () {
                this.error = new Error(e(this.xhr) + " Request was aborted by the user."), this.complete()
            }, d.prototype._xdrOnTimeout = function () {
                this.error = new Error(e(this.xhr) + " Request timed out."), this.complete()
            }, d.prototype._xhrOnLoad = function () {
                var a = this.xhr, b = void 0 !== a.status ? a.status : 200;
                if (200 === b || 204 === b || 0 === b && a.responseText.length > 0) if (this.xhrType === d.XHR_RESPONSE_TYPE.TEXT) this.data = a.responseText; else if (this.xhrType === d.XHR_RESPONSE_TYPE.JSON) try {
                    this.data = JSON.parse(a.responseText), this.isJson = !0
                } catch (c) {
                    this.error = new Error("Error trying to parse loaded json:", c)
                } else if (this.xhrType === d.XHR_RESPONSE_TYPE.DOCUMENT) try {
                    if (window.DOMParser) {
                        var e = new DOMParser;
                        this.data = e.parseFromString(a.responseText, "text/xml")
                    } else {
                        var f = document.createElement("div");
                        f.innerHTML = a.responseText, this.data = f
                    }
                    this.isXml = !0
                } catch (c) {
                    this.error = new Error("Error trying to parse loaded xml:", c)
                } else this.data = a.response || a.responseText; else this.error = new Error("[" + a.status + "]" + a.statusText + ":" + a.responseURL);
                this.complete()
            }, d.prototype._determineCrossOrigin = function (a, b) {
                if (0 === a.indexOf("data:")) return "";
                b = b || window.location, j || (j = document.createElement("a")), j.href = a, a = h.parse(j.href);
                var c = !a.port && "" === b.port || a.port === b.port;
                return a.hostname === b.hostname && c && a.protocol === b.protocol ? "" : "anonymous"
            }, d.prototype._determineXhrType = function () {
                return d._xhrTypeMap[this._getExtension()] || d.XHR_RESPONSE_TYPE.TEXT
            }, d.prototype._determineLoadType = function () {
                return d._loadTypeMap[this._getExtension()] || d.LOAD_TYPE.XHR
            }, d.prototype._getExtension = function () {
                var a, b = this.url;
                if (this.isDataUrl) {
                    var c = b.indexOf("/");
                    a = b.substring(c + 1, b.indexOf(";", c))
                } else {
                    var d = b.indexOf("?");
                    -1 !== d && (b = b.substring(0, d)), a = b.substring(b.lastIndexOf(".") + 1)
                }
                return a
            }, d.prototype._getMimeFromXhrType = function (a) {
                switch (a) {
                    case d.XHR_RESPONSE_TYPE.BUFFER:
                        return "application/octet-binary";
                    case d.XHR_RESPONSE_TYPE.BLOB:
                        return "application/blob";
                    case d.XHR_RESPONSE_TYPE.DOCUMENT:
                        return "application/xml";
                    case d.XHR_RESPONSE_TYPE.JSON:
                        return "application/json";
                    case d.XHR_RESPONSE_TYPE.DEFAULT:
                    case d.XHR_RESPONSE_TYPE.TEXT:
                    default:
                        return "text/plain"
                }
            }, d.LOAD_TYPE = {XHR: 1, IMAGE: 2, AUDIO: 3, VIDEO: 4}, d.XHR_READY_STATE = {
                UNSENT: 0,
                OPENED: 1,
                HEADERS_RECEIVED: 2,
                LOADING: 3,
                DONE: 4
            }, d.XHR_RESPONSE_TYPE = {
                DEFAULT: "text",
                BUFFER: "arraybuffer",
                BLOB: "blob",
                DOCUMENT: "document",
                JSON: "json",
                TEXT: "text"
            }, d._loadTypeMap = {
                gif: d.LOAD_TYPE.IMAGE,
                png: d.LOAD_TYPE.IMAGE,
                bmp: d.LOAD_TYPE.IMAGE,
                jpg: d.LOAD_TYPE.IMAGE,
                jpeg: d.LOAD_TYPE.IMAGE,
                tif: d.LOAD_TYPE.IMAGE,
                tiff: d.LOAD_TYPE.IMAGE,
                webp: d.LOAD_TYPE.IMAGE,
                tga: d.LOAD_TYPE.IMAGE
            }, d._xhrTypeMap = {
                xhtml: d.XHR_RESPONSE_TYPE.DOCUMENT,
                html: d.XHR_RESPONSE_TYPE.DOCUMENT,
                htm: d.XHR_RESPONSE_TYPE.DOCUMENT,
                xml: d.XHR_RESPONSE_TYPE.DOCUMENT,
                tmx: d.XHR_RESPONSE_TYPE.DOCUMENT,
                tsx: d.XHR_RESPONSE_TYPE.DOCUMENT,
                svg: d.XHR_RESPONSE_TYPE.DOCUMENT,
                gif: d.XHR_RESPONSE_TYPE.BLOB,
                png: d.XHR_RESPONSE_TYPE.BLOB,
                bmp: d.XHR_RESPONSE_TYPE.BLOB,
                jpg: d.XHR_RESPONSE_TYPE.BLOB,
                jpeg: d.XHR_RESPONSE_TYPE.BLOB,
                tif: d.XHR_RESPONSE_TYPE.BLOB,
                tiff: d.XHR_RESPONSE_TYPE.BLOB,
                webp: d.XHR_RESPONSE_TYPE.BLOB,
                tga: d.XHR_RESPONSE_TYPE.BLOB,
                json: d.XHR_RESPONSE_TYPE.JSON,
                text: d.XHR_RESPONSE_TYPE.TEXT,
                txt: d.XHR_RESPONSE_TYPE.TEXT
            }, d.setExtensionLoadType = function (a, b) {
                f(d._loadTypeMap, a, b)
            }, d.setExtensionXhrType = function (a, b) {
                f(d._xhrTypeMap, a, b)
            }
        }, {eventemitter3: 10, url: 8}],
        15: [function (a, b, c) {
            b.exports = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encodeBinary: function (a) {
                    for (var b, c = "", d = new Array(4), e = 0, f = 0, g = 0; e < a.length;) {
                        for (b = new Array(3), f = 0; f < b.length; f++) e < a.length ? b[f] = 255 & a.charCodeAt(e++) : b[f] = 0;
                        switch (d[0] = b[0] >> 2, d[1] = (3 & b[0]) << 4 | b[1] >> 4, d[2] = (15 & b[1]) << 2 | b[2] >> 6, d[3] = 63 & b[2], g = e - (a.length - 1)) {
                            case 2:
                                d[3] = 64, d[2] = 64;
                                break;
                            case 1:
                                d[3] = 64
                        }
                        for (f = 0; f < d.length; f++) c += this._keyStr.charAt(d[f])
                    }
                    return c
                }
            }
        }, {}],
        16: [function (a, b, c) {
            b.exports = a("./Loader"), b.exports.Resource = a("./Resource"), b.exports.middleware = {
                caching: {memory: a("./middlewares/caching/memory")},
                parsing: {blob: a("./middlewares/parsing/blob")}
            }
        }, {"./Loader": 13, "./Resource": 14, "./middlewares/caching/memory": 17, "./middlewares/parsing/blob": 18}],
        17: [function (a, b, c) {
            var d = {};
            b.exports = function () {
                return function (a, b) {
                    d[a.url] ? (a.data = d[a.url], a.complete()) : a.once("complete", function () {
                        d[this.url] = this.data
                    }), b()
                }
            }
        }, {}],
        18: [function (a, b, c) {
            var d = a("../../Resource"), e = a("../../b64");
            window.URL = window.URL || window.webkitURL, b.exports = function () {
                return function (a, b) {
                    if (!a.data) return b();
                    if (a.xhr && a.xhrType === d.XHR_RESPONSE_TYPE.BLOB) if (window.Blob && "string" != typeof a.data) {
                        if (0 === a.data.type.indexOf("image")) {
                            var c = URL.createObjectURL(a.data);
                            a.blob = a.data, a.data = new Image, a.data.src = c, a.isImage = !0, a.data.onload = function () {
                                URL.revokeObjectURL(c), a.data.onload = null, b()
                            }
                        }
                    } else {
                        var f = a.xhr.getResponseHeader("content-type");
                        f && 0 === f.indexOf("image") && (a.data = new Image, a.data.src = "data:" + f + ";base64," + e.encodeBinary(a.xhr.responseText), a.isImage = !0, a.data.onload = function () {
                            a.data.onload = null, b()
                        })
                    } else b()
                }
            }
        }, {"../../Resource": 14, "../../b64": 15}],
        19: [function (a, b, c) {
            b.exports = {
                name: "pixi.js",
                version: "3.0.9",
                description: "Pixi.js is a fast lightweight 2D library that works across all devices.",
                author: "Mat Groves",
                contributors: ["Chad Engler <chad@pantherdev.com>", "Richard Davey <rdavey@gmail.com>"],
                main: "./src/index.js",
                homepage: "http://goodboydigital.com/",
                bugs: "https://github.com/pixijs/pixi.js/issues",
                license: "MIT",
                repository: {type: "git", url: "https://github.com/pixijs/pixi.js.git"},
                scripts: {
                    start: "gulp && gulp watch",
                    test: "gulp && testem ci",
                    build: "gulp",
                    docs: "jsdoc -c ./gulp/util/jsdoc.conf.json -R README.md"
                },
                files: ["bin/", "src/", "CONTRIBUTING.md", "LICENSE", "package.json", "README.md"],
                dependencies: {
                    async: "^1.5.0",
                    brfs: "^1.4.1",
                    earcut: "^2.0.7",
                    eventemitter3: "^1.1.1",
                    "object-assign": "^4.0.1",
                    "resource-loader": "^1.6.4"
                },
                devDependencies: {
                    browserify: "^11.1.0",
                    chai: "^3.2.0",
                    del: "^2.0.2",
                    gulp: "^3.9.0",
                    "gulp-cached": "^1.1.0",
                    "gulp-concat": "^2.6.0",
                    "gulp-debug": "^2.1.0",
                    "gulp-header": "^1.7.1",
                    "gulp-jshint": "^1.11.2",
                    "gulp-mirror": "^0.4.0",
                    "gulp-plumber": "^1.0.1",
                    "gulp-rename": "^1.2.2",
                    "gulp-sourcemaps": "^1.5.2",
                    "gulp-uglify": "^1.4.1",
                    "gulp-util": "^3.0.6",
                    "jaguarjs-jsdoc": "git+https://github.com/davidshimjs/jaguarjs-jsdoc.git",
                    jsdoc: "^3.3.2",
                    "jshint-summary": "^0.4.0",
                    minimist: "^1.2.0",
                    mocha: "^2.3.2",
                    "require-dir": "^0.3.0",
                    "run-sequence": "^1.1.2",
                    testem: "^0.9.4",
                    "vinyl-buffer": "^1.0.0",
                    "vinyl-source-stream": "^1.1.0",
                    watchify: "^3.4.0"
                },
                browserify: {transform: ["brfs"]}
            }
        }, {}],
        20: [function (a, b, c) {
            function d(a) {
                var b = document.createElement("div");
                b.style.width = "100px", b.style.height = "100px", b.style.position = "absolute", b.style.top = 0, b.style.left = 0, b.style.zIndex = 2, this.div = b, this.pool = [], this.renderId = 0, this.debug = !1, this.renderer = a, this.children = [], this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this.isActive = !1, window.addEventListener("keydown", this._onKeyDown, !1)
            }

            var e = a("../core");
            Object.assign(e.DisplayObject.prototype, a("./accessibleTarget")), d.prototype.constructor = d, b.exports = d, d.prototype.activate = function () {
                this.isActive || (this.isActive = !0, window.document.addEventListener("mousemove", this._onMouseMove, !0), window.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), this.renderer.view.parentNode.appendChild(this.div))
            }, d.prototype.deactivate = function () {
                this.isActive && (this.isActive = !1, window.document.removeEventListener("mousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), this.div.parentNode.removeChild(this.div))
            }, d.prototype.updateAccessibleObjects = function (a) {
                if (a.visible) {
                    a.accessible && a.interactive && (a._accessibleActive || this.addChild(a), a.renderId = this.renderId);
                    for (var b = a.children, c = b.length - 1; c >= 0; c--) this.updateAccessibleObjects(b[c])
                }
            }, d.prototype.update = function () {
                this.updateAccessibleObjects(this.renderer._lastObjectRendered);
                var a = this.renderer.view.getBoundingClientRect(), b = a.width / this.renderer.width,
                    c = a.height / this.renderer.height, d = this.div;
                d.style.left = a.left + "px", d.style.top = a.top + "px", d.style.width = this.renderer.width + "px", d.style.height = this.renderer.height + "px";
                for (var f = 0; f < this.children.length; f++) {
                    var g = this.children[f];
                    if (g.renderId !== this.renderId) g._accessibleActive = !1, e.utils.removeItems(this.children, f, 1), this.div.removeChild(g._accessibleDiv), this.pool.push(g._accessibleDiv), g._accessibleDiv = null, f--, 0 === this.children.length && this.deactivate(); else {
                        d = g._accessibleDiv;
                        var h = g.hitArea, i = g.worldTransform;
                        g.hitArea ? (d.style.left = (i.tx + h.x * i.a) * b + "px", d.style.top = (i.ty + h.y * i.d) * c + "px", d.style.width = h.width * i.a * b + "px", d.style.height = h.height * i.d * c + "px") : (h = g.getBounds(), this.capHitArea(h), d.style.left = h.x * b + "px", d.style.top = h.y * c + "px", d.style.width = h.width * b + "px", d.style.height = h.height * c + "px")
                    }
                }
                this.renderId++
            }, d.prototype.capHitArea = function (a) {
                a.x < 0 && (a.width += a.x, a.x = 0), a.y < 0 && (a.height += a.y, a.y = 0), a.x + a.width > this.renderer.width && (a.width = this.renderer.width - a.x), a.y + a.height > this.renderer.height && (a.height = this.renderer.height - a.y)
            }, d.prototype.addChild = function (a) {
                var b = this.pool.pop();
                b || (b = document.createElement("button"), b.style.width = "100px", b.style.height = "100px", b.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent", b.style.position = "absolute", b.style.zIndex = 2, b.style.borderStyle = "none", b.addEventListener("click", this._onClick.bind(this)), b.addEventListener("focus", this._onFocus.bind(this)), b.addEventListener("focusout", this._onFocusOut.bind(this))), b.title = a.accessibleTitle || "displayObject " + this.tabIndex, a._accessibleActive = !0, a._accessibleDiv = b, b.displayObject = a, this.children.push(a), this.div.appendChild(a._accessibleDiv), a._accessibleDiv.tabIndex = a.tabIndex
            }, d.prototype._onClick = function (a) {
                var b = this.renderer.plugins.interaction;
                b.dispatchEvent(a.target.displayObject, "click", b.eventData)
            }, d.prototype._onFocus = function (a) {
                var b = this.renderer.plugins.interaction;
                b.dispatchEvent(a.target.displayObject, "mouseover", b.eventData)
            }, d.prototype._onFocusOut = function (a) {
                var b = this.renderer.plugins.interaction;
                b.dispatchEvent(a.target.displayObject, "mouseout", b.eventData)
            }, d.prototype._onKeyDown = function (a) {
                9 === a.keyCode && this.activate()
            }, d.prototype._onMouseMove = function () {
                this.deactivate()
            }, d.prototype.destroy = function () {
                this.div = null;
                for (var a = 0; a < this.children.length; a++) this.children[a].div = null;
                window.document.removeEventListener("mousemove", this._onMouseMove), window.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null
            }, e.WebGLRenderer.registerPlugin("accessibility", d), e.CanvasRenderer.registerPlugin("accessibility", d)
        }, {"../core": 30, "./accessibleTarget": 21}],
        21: [function (a, b, c) {
            var d = {accessible: !1, accessibleTitle: null, tabIndex: 0, _accessibleActive: !1, _accessibleDiv: !1};
            b.exports = d
        }, {}],
        22: [function (a, b, c) {
            b.exports = {accessibleTarget: a("./accessibleTarget"), AccessibilityManager: a("./AccessibilityManager")}
        }, {"./AccessibilityManager": 20, "./accessibleTarget": 21}],
        23: [function (a, b, c) {
            var d = {
                VERSION: a("../../package.json").version,
                PI_2: 2 * Math.PI,
                RAD_TO_DEG: 180 / Math.PI,
                DEG_TO_RAD: Math.PI / 180,
                TARGET_FPMS: .06,
                RENDERER_TYPE: {UNKNOWN: 0, WEBGL: 1, CANVAS: 2},
                BLEND_MODES: {
                    NORMAL: 0,
                    ADD: 1,
                    MULTIPLY: 2,
                    SCREEN: 3,
                    OVERLAY: 4,
                    DARKEN: 5,
                    LIGHTEN: 6,
                    COLOR_DODGE: 7,
                    COLOR_BURN: 8,
                    HARD_LIGHT: 9,
                    SOFT_LIGHT: 10,
                    DIFFERENCE: 11,
                    EXCLUSION: 12,
                    HUE: 13,
                    SATURATION: 14,
                    COLOR: 15,
                    LUMINOSITY: 16
                },
                DRAW_MODES: {
                    POINTS: 0,
                    LINES: 1,
                    LINE_LOOP: 2,
                    LINE_STRIP: 3,
                    TRIANGLES: 4,
                    TRIANGLE_STRIP: 5,
                    TRIANGLE_FAN: 6
                },
                SCALE_MODES: {DEFAULT: 0, LINEAR: 0, NEAREST: 1},
                RETINA_PREFIX: /@(.+)x/,
                RESOLUTION: 1,
                FILTER_RESOLUTION: 1,
                DEFAULT_RENDER_OPTIONS: {
                    view: null,
                    resolution: 1,
                    antialias: !1,
                    forceFXAA: !1,
                    autoResize: !1,
                    transparent: !1,
                    backgroundColor: 0,
                    clearBeforeRender: !0,
                    preserveDrawingBuffer: !1,
                    roundPixels: !1
                },
                SHAPES: {POLY: 0, RECT: 1, CIRC: 2, ELIP: 3, RREC: 4},
                SPRITE_BATCH_SIZE: 2e3
            };
            b.exports = d
        }, {"../../package.json": 19}],
        24: [function (a, b, c) {
            function d() {
                g.call(this), this.children = []
            }

            var e = a("../math"), f = a("../utils"), g = a("./DisplayObject"), h = a("../textures/RenderTexture"),
                i = new e.Matrix;
            d.prototype = Object.create(g.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                width: {
                    configurable: !0,
                    get: function () {
                        return this.scale.x * this.getLocalBounds().width
                    },
                    set: function (a) {
                        var b = this.getLocalBounds().width;
                        0 !== b ? this.scale.x = a / b : this.scale.x = 1, this._width = a
                    }
                }, height: {
                    configurable: !0, get: function () {
                        return this.scale.y * this.getLocalBounds().height
                    }, set: function (a) {
                        var b = this.getLocalBounds().height;
                        0 !== b ? this.scale.y = a / b : this.scale.y = 1, this._height = a
                    }
                }
            }), d.prototype.onChildrenChange = function () {
            }, d.prototype.addChild = function (a) {
                var b = arguments.length;
                if (b > 1) for (var c = 0; b > c; c++) this.addChild(arguments[c]); else a.parent && a.parent.removeChild(a), a.parent = this, this.children.push(a), this.onChildrenChange(this.children.length - 1), a.emit("added", this);
                return a
            }, d.prototype.addChildAt = function (a, b) {
                if (b >= 0 && b <= this.children.length) return a.parent && a.parent.removeChild(a), a.parent = this, this.children.splice(b, 0, a), this.onChildrenChange(b), a.emit("added", this), a;
                throw new Error(a + "addChildAt: The index " + b + " supplied is out of bounds " + this.children.length)
            }, d.prototype.swapChildren = function (a, b) {
                if (a !== b) {
                    var c = this.getChildIndex(a), d = this.getChildIndex(b);
                    if (0 > c || 0 > d) throw new Error("swapChildren: Both the supplied DisplayObjects must be children of the caller.");
                    this.children[c] = b, this.children[d] = a, this.onChildrenChange(d > c ? c : d)
                }
            }, d.prototype.getChildIndex = function (a) {
                var b = this.children.indexOf(a);
                if (-1 === b) throw new Error("The supplied DisplayObject must be a child of the caller");
                return b
            }, d.prototype.setChildIndex = function (a, b) {
                if (0 > b || b >= this.children.length) throw new Error("The supplied index is out of bounds");
                var c = this.getChildIndex(a);
                f.removeItems(this.children, c, 1), this.children.splice(b, 0, a), this.onChildrenChange(b)
            }, d.prototype.getChildAt = function (a) {
                if (0 > a || a >= this.children.length) throw new Error("getChildAt: Supplied index " + a + " does not exist in the child list, or the supplied DisplayObject is not a child of the caller");
                return this.children[a]
            }, d.prototype.removeChild = function (a) {
                var b = arguments.length;
                if (b > 1) for (var c = 0; b > c; c++) this.removeChild(arguments[c]); else {
                    var d = this.children.indexOf(a);
                    if (-1 === d) return;
                    a.parent = null, f.removeItems(this.children, d, 1), this.onChildrenChange(d), a.emit("removed", this)
                }
                return a
            }, d.prototype.removeChildAt = function (a) {
                var b = this.getChildAt(a);
                return b.parent = null, f.removeItems(this.children, a, 1), this.onChildrenChange(a), b.emit("removed", this), b
            }, d.prototype.removeChildren = function (a, b) {
                var c, d, e = a || 0, f = "number" == typeof b ? b : this.children.length, g = f - e;
                if (g > 0 && f >= g) {
                    for (c = this.children.splice(e, g), d = 0; d < c.length; ++d) c[d].parent = null;
                    for (this.onChildrenChange(a), d = 0; d < c.length; ++d) c[d].emit("removed", this);
                    return c
                }
                if (0 === g && 0 === this.children.length) return [];
                throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
            }, d.prototype.generateTexture = function (a, b, c) {
                var d = this.getLocalBounds(), e = new h(a, 0 | d.width, 0 | d.height, c, b);
                return i.tx = -d.x, i.ty = -d.y, e.render(this, i), e
            }, d.prototype.updateTransform = function () {
                if (this.visible) {
                    this.displayObjectUpdateTransform();
                    for (var a = 0, b = this.children.length; b > a; ++a) this.children[a].updateTransform()
                }
            }, d.prototype.containerUpdateTransform = d.prototype.updateTransform, d.prototype.getBounds = function () {
                if (!this._currentBounds) {
                    if (0 === this.children.length) return e.Rectangle.EMPTY;
                    for (var a, b, c, d = 1 / 0, f = 1 / 0, g = -(1 / 0), h = -(1 / 0), i = !1, j = 0, k = this.children.length; k > j; ++j) {
                        var l = this.children[j];
                        l.visible && (i = !0, a = this.children[j].getBounds(), d = d < a.x ? d : a.x, f = f < a.y ? f : a.y, b = a.width + a.x, c = a.height + a.y, g = g > b ? g : b, h = h > c ? h : c)
                    }
                    if (!i) return e.Rectangle.EMPTY;
                    var m = this._bounds;
                    m.x = d, m.y = f, m.width = g - d, m.height = h - f, this._currentBounds = m
                }
                return this._currentBounds
            }, d.prototype.containerGetBounds = d.prototype.getBounds, d.prototype.getLocalBounds = function () {
                var a = this.worldTransform;
                this.worldTransform = e.Matrix.IDENTITY;
                for (var b = 0, c = this.children.length; c > b; ++b) this.children[b].updateTransform();
                return this.worldTransform = a, this._currentBounds = null, this.getBounds(e.Matrix.IDENTITY)
            }, d.prototype.renderWebGL = function (a) {
                if (this.visible && !(this.worldAlpha <= 0) && this.renderable) {
                    var b, c;
                    if (this._mask || this._filters) {
                        for (a.currentRenderer.flush(), this._filters && this._filters.length && a.filterManager.pushFilter(this, this._filters), this._mask && a.maskManager.pushMask(this, this._mask), a.currentRenderer.start(), this._renderWebGL(a), b = 0, c = this.children.length; c > b; b++) this.children[b].renderWebGL(a);
                        a.currentRenderer.flush(), this._mask && a.maskManager.popMask(this, this._mask), this._filters && a.filterManager.popFilter(), a.currentRenderer.start()
                    } else for (this._renderWebGL(a), b = 0, c = this.children.length; c > b; ++b) this.children[b].renderWebGL(a)
                }
            }, d.prototype._renderWebGL = function (a) {
            }, d.prototype._renderCanvas = function (a) {
            }, d.prototype.renderCanvas = function (a) {
                if (this.visible && !(this.alpha <= 0) && this.renderable) {
                    this._mask && a.maskManager.pushMask(this._mask, a), this._renderCanvas(a);
                    for (var b = 0, c = this.children.length; c > b; ++b) this.children[b].renderCanvas(a);
                    this._mask && a.maskManager.popMask(a)
                }
            }, d.prototype.destroy = function (a) {
                if (g.prototype.destroy.call(this), a) for (var b = 0, c = this.children.length; c > b; ++b) this.children[b].destroy(a);
                this.removeChildren(), this.children = null
            }
        }, {"../math": 33, "../textures/RenderTexture": 71, "../utils": 77, "./DisplayObject": 25}],
        25: [function (a, b, c) {
            function d() {
                g.call(this), this.position = new e.Point, this.scale = new e.Point(1, 1), this.pivot = new e.Point(0, 0), this.skew = new e.Point(0, 0),
                    this.rotation = 0, this.alpha = 1, this.visible = !0, this.renderable = !0, this.parent = null, this.worldAlpha = 1, this.worldTransform = new e.Matrix, this.filterArea = null, this._sr = 0, this._cr = 1, this._bounds = new e.Rectangle(0, 0, 1, 1), this._currentBounds = null, this._mask = null
            }

            var e = a("../math"), f = a("../textures/RenderTexture"), g = a("eventemitter3"), h = a("../const"),
                i = new e.Matrix, j = {worldTransform: new e.Matrix, worldAlpha: 1, children: []};
            d.prototype = Object.create(g.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                x: {
                    get: function () {
                        return this.position.x
                    }, set: function (a) {
                        this.position.x = a
                    }
                }, y: {
                    get: function () {
                        return this.position.y
                    }, set: function (a) {
                        this.position.y = a
                    }
                }, worldVisible: {
                    get: function () {
                        var a = this;
                        do {
                            if (!a.visible) return !1;
                            a = a.parent
                        } while (a);
                        return !0
                    }
                }, mask: {
                    get: function () {
                        return this._mask
                    }, set: function (a) {
                        this._mask && (this._mask.renderable = !0), this._mask = a, this._mask && (this._mask.renderable = !1)
                    }
                }, filters: {
                    get: function () {
                        return this._filters && this._filters.slice()
                    }, set: function (a) {
                        this._filters = a && a.slice()
                    }
                }
            }), d.prototype.updateTransform = function () {
                var a, b, c, d, e, f, g = this.parent.worldTransform, j = this.worldTransform;
                this.skew.x || this.skew.y ? (i.setTransform(this.position.x, this.position.y, this.pivot.x, this.pivot.y, this.scale.x, this.scale.y, this.rotation, this.skew.x, this.skew.y), j.a = i.a * g.a + i.b * g.c, j.b = i.a * g.b + i.b * g.d, j.c = i.c * g.a + i.d * g.c, j.d = i.c * g.b + i.d * g.d, j.tx = i.tx * g.a + i.ty * g.c + g.tx, j.ty = i.tx * g.b + i.ty * g.d + g.ty) : this.rotation % h.PI_2 ? (this.rotation !== this.rotationCache && (this.rotationCache = this.rotation, this._sr = Math.sin(this.rotation), this._cr = Math.cos(this.rotation)), a = this._cr * this.scale.x, b = this._sr * this.scale.x, c = -this._sr * this.scale.y, d = this._cr * this.scale.y, e = this.position.x, f = this.position.y, (this.pivot.x || this.pivot.y) && (e -= this.pivot.x * a + this.pivot.y * c, f -= this.pivot.x * b + this.pivot.y * d), j.a = a * g.a + b * g.c, j.b = a * g.b + b * g.d, j.c = c * g.a + d * g.c, j.d = c * g.b + d * g.d, j.tx = e * g.a + f * g.c + g.tx, j.ty = e * g.b + f * g.d + g.ty) : (a = this.scale.x, d = this.scale.y, e = this.position.x - this.pivot.x * a, f = this.position.y - this.pivot.y * d, j.a = a * g.a, j.b = a * g.b, j.c = d * g.c, j.d = d * g.d, j.tx = e * g.a + f * g.c + g.tx, j.ty = e * g.b + f * g.d + g.ty), this.worldAlpha = this.alpha * this.parent.worldAlpha, this._currentBounds = null
            }, d.prototype.displayObjectUpdateTransform = d.prototype.updateTransform, d.prototype.getBounds = function (a) {
                return e.Rectangle.EMPTY
            }, d.prototype.getLocalBounds = function () {
                return this.getBounds(e.Matrix.IDENTITY)
            }, d.prototype.toGlobal = function (a, b) {
                return this.parent ? this.displayObjectUpdateTransform() : (this.parent = j, this.displayObjectUpdateTransform(), this.parent = null), this.worldTransform.apply(a, b)
            }, d.prototype.toLocal = function (a, b, c) {
                return b && (a = b.toGlobal(a, c)), this.parent ? this.displayObjectUpdateTransform() : (this.parent = j, this.displayObjectUpdateTransform(), this.parent = null), this.worldTransform.applyInverse(a, c)
            }, d.prototype.renderWebGL = function (a) {
            }, d.prototype.renderCanvas = function (a) {
            }, d.prototype.generateTexture = function (a, b, c) {
                var d = this.getLocalBounds(), e = new f(a, 0 | d.width, 0 | d.height, b, c);
                return i.tx = -d.x, i.ty = -d.y, e.render(this, i), e
            }, d.prototype.setParent = function (a) {
                if (!a || !a.addChild) throw new Error("setParent: Argument must be a Container");
                return a.addChild(this), a
            }, d.prototype.setTransform = function (a, b, c, d, e, f, g, h, i) {
                return this.position.x = a || 0, this.position.y = b || 0, this.scale.x = c ? c : 1, this.scale.y = d ? d : 1, this.rotation = e || 0, this.skew.x = f || 0, this.skew.y = g || 0, this.pivot.x = h || 0, this.pivot.y = i || 0, this
            }, d.prototype.destroy = function () {
                this.position = null, this.scale = null, this.pivot = null, this.skew = null, this.parent = null, this._bounds = null, this._currentBounds = null, this._mask = null, this.worldTransform = null, this.filterArea = null
            }
        }, {"../const": 23, "../math": 33, "../textures/RenderTexture": 71, eventemitter3: 10}],
        26: [function (a, b, c) {
            function d() {
                e.call(this), this.fillAlpha = 1, this.lineWidth = 0, this.lineColor = 0, this.graphicsData = [], this.tint = 16777215, this._prevTint = 16777215, this.blendMode = k.BLEND_MODES.NORMAL, this.currentPath = null, this._webGL = {}, this.isMask = !1, this.boundsPadding = 0, this._localBounds = new j.Rectangle(0, 0, 1, 1), this.dirty = !0, this.glDirty = !1, this.boundsDirty = !0, this.cachedSpriteDirty = !1
            }

            var e = a("../display/Container"), f = a("../textures/Texture"),
                g = a("../renderers/canvas/utils/CanvasBuffer"), h = a("../renderers/canvas/utils/CanvasGraphics"),
                i = a("./GraphicsData"), j = a("../math"), k = a("../const"), l = new j.Point;
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.clone = function () {
                var a = new d;
                a.renderable = this.renderable, a.fillAlpha = this.fillAlpha, a.lineWidth = this.lineWidth, a.lineColor = this.lineColor, a.tint = this.tint, a.blendMode = this.blendMode, a.isMask = this.isMask, a.boundsPadding = this.boundsPadding, a.dirty = !0, a.glDirty = !0, a.cachedSpriteDirty = this.cachedSpriteDirty;
                for (var b = 0; b < this.graphicsData.length; ++b) a.graphicsData.push(this.graphicsData[b].clone());
                return a.currentPath = a.graphicsData[a.graphicsData.length - 1], a.updateLocalBounds(), a
            }, d.prototype.lineStyle = function (a, b, c) {
                if (this.lineWidth = a || 0, this.lineColor = b || 0, this.lineAlpha = void 0 === c ? 1 : c, this.currentPath) if (this.currentPath.shape.points.length) {
                    var d = new j.Polygon(this.currentPath.shape.points.slice(-2));
                    d.closed = !1, this.drawShape(d)
                } else this.currentPath.lineWidth = this.lineWidth, this.currentPath.lineColor = this.lineColor, this.currentPath.lineAlpha = this.lineAlpha;
                return this
            }, d.prototype.moveTo = function (a, b) {
                var c = new j.Polygon([a, b]);
                return c.closed = !1, this.drawShape(c), this
            }, d.prototype.lineTo = function (a, b) {
                return this.currentPath.shape.points.push(a, b), this.dirty = !0, this
            }, d.prototype.quadraticCurveTo = function (a, b, c, d) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                var e, f, g = 20, h = this.currentPath.shape.points;
                0 === h.length && this.moveTo(0, 0);
                for (var i = h[h.length - 2], j = h[h.length - 1], k = 0, l = 1; g >= l; ++l) k = l / g, e = i + (a - i) * k, f = j + (b - j) * k, h.push(e + (a + (c - a) * k - e) * k, f + (b + (d - b) * k - f) * k);
                return this.dirty = this.boundsDirty = !0, this
            }, d.prototype.bezierCurveTo = function (a, b, c, d, e, f) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                for (var g, h, i, j, k, l = 20, m = this.currentPath.shape.points, n = m[m.length - 2], o = m[m.length - 1], p = 0, q = 1; l >= q; ++q) p = q / l, g = 1 - p, h = g * g, i = h * g, j = p * p, k = j * p, m.push(i * n + 3 * h * p * a + 3 * g * j * c + k * e, i * o + 3 * h * p * b + 3 * g * j * d + k * f);
                return this.dirty = this.boundsDirty = !0, this
            }, d.prototype.arcTo = function (a, b, c, d, e) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(a, b) : this.moveTo(a, b);
                var f = this.currentPath.shape.points, g = f[f.length - 2], h = f[f.length - 1], i = h - b, j = g - a,
                    k = d - b, l = c - a, m = Math.abs(i * l - j * k);
                if (1e-8 > m || 0 === e) (f[f.length - 2] !== a || f[f.length - 1] !== b) && f.push(a, b); else {
                    var n = i * i + j * j, o = k * k + l * l, p = i * k + j * l, q = e * Math.sqrt(n) / m,
                        r = e * Math.sqrt(o) / m, s = q * p / n, t = r * p / o, u = q * l + r * j, v = q * k + r * i,
                        w = j * (r + s), x = i * (r + s), y = l * (q + t), z = k * (q + t),
                        A = Math.atan2(x - v, w - u), B = Math.atan2(z - v, y - u);
                    this.arc(u + a, v + b, e, A, B, j * k > l * i)
                }
                return this.dirty = this.boundsDirty = !0, this
            }, d.prototype.arc = function (a, b, c, d, e, f) {
                if (f = f || !1, d === e) return this;
                !f && d >= e ? e += 2 * Math.PI : f && e >= d && (d += 2 * Math.PI);
                var g = f ? -1 * (d - e) : e - d, h = 40 * Math.ceil(Math.abs(g) / (2 * Math.PI));
                if (0 === g) return this;
                var i = a + Math.cos(d) * c, j = b + Math.sin(d) * c;
                this.currentPath ? this.currentPath.shape.points.push(i, j) : this.moveTo(i, j);
                for (var k = this.currentPath.shape.points, l = g / (2 * h), m = 2 * l, n = Math.cos(l), o = Math.sin(l), p = h - 1, q = p % 1 / p, r = 0; p >= r; r++) {
                    var s = r + q * r, t = l + d + m * s, u = Math.cos(t), v = -Math.sin(t);
                    k.push((n * u + o * v) * c + a, (n * -v + o * u) * c + b)
                }
                return this.dirty = this.boundsDirty = !0, this
            }, d.prototype.beginFill = function (a, b) {
                return this.filling = !0, this.fillColor = a || 0, this.fillAlpha = void 0 === b ? 1 : b, this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha), this
            }, d.prototype.endFill = function () {
                return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this
            }, d.prototype.drawRect = function (a, b, c, d) {
                return this.drawShape(new j.Rectangle(a, b, c, d)), this
            }, d.prototype.drawRoundedRect = function (a, b, c, d, e) {
                return this.drawShape(new j.RoundedRectangle(a, b, c, d, e)), this
            }, d.prototype.drawCircle = function (a, b, c) {
                return this.drawShape(new j.Circle(a, b, c)), this
            }, d.prototype.drawEllipse = function (a, b, c, d) {
                return this.drawShape(new j.Ellipse(a, b, c, d)), this
            }, d.prototype.drawPolygon = function (a) {
                var b = a, c = !0;
                if (b instanceof j.Polygon && (c = b.closed, b = b.points), !Array.isArray(b)) {
                    b = new Array(arguments.length);
                    for (var d = 0; d < b.length; ++d) b[d] = arguments[d]
                }
                var e = new j.Polygon(b);
                return e.closed = c, this.drawShape(e), this
            }, d.prototype.clear = function () {
                return this.lineWidth = 0, this.filling = !1, this.dirty = !0, this.clearDirty = !0, this.graphicsData = [], this
            }, d.prototype.generateTexture = function (a, b, c) {
                b = b || 1;
                var d = this.getLocalBounds(), e = new g(d.width * b, d.height * b), i = f.fromCanvas(e.canvas, c);
                return i.baseTexture.resolution = b, e.context.scale(b, b), e.context.translate(-d.x, -d.y), h.renderGraphics(this, e.context), i
            }, d.prototype._renderWebGL = function (a) {
                this.glDirty && (this.dirty = !0, this.glDirty = !1), a.setObjectRenderer(a.plugins.graphics), a.plugins.graphics.render(this)
            }, d.prototype._renderCanvas = function (a) {
                if (this.isMask !== !0) {
                    this._prevTint !== this.tint && (this.dirty = !0);
                    var b = a.context, c = this.worldTransform, d = a.blendModes[this.blendMode];
                    d !== b.globalCompositeOperation && (b.globalCompositeOperation = d);
                    var e = a.resolution;
                    b.setTransform(c.a * e, c.b * e, c.c * e, c.d * e, c.tx * e, c.ty * e), h.renderGraphics(this, b)
                }
            }, d.prototype.getBounds = function (a) {
                if (!this._currentBounds) {
                    if (!this.renderable) return j.Rectangle.EMPTY;
                    this.boundsDirty && (this.updateLocalBounds(), this.glDirty = !0, this.cachedSpriteDirty = !0, this.boundsDirty = !1);
                    var b = this._localBounds, c = b.x, d = b.width + b.x, e = b.y, f = b.height + b.y,
                        g = a || this.worldTransform, h = g.a, i = g.b, k = g.c, l = g.d, m = g.tx, n = g.ty,
                        o = h * d + k * f + m, p = l * f + i * d + n, q = h * c + k * f + m, r = l * f + i * c + n,
                        s = h * c + k * e + m, t = l * e + i * c + n, u = h * d + k * e + m, v = l * e + i * d + n,
                        w = o, x = p, y = o, z = p;
                    y = y > q ? q : y, y = y > s ? s : y, y = y > u ? u : y, z = z > r ? r : z, z = z > t ? t : z, z = z > v ? v : z, w = q > w ? q : w, w = s > w ? s : w, w = u > w ? u : w, x = r > x ? r : x, x = t > x ? t : x, x = v > x ? v : x, this._bounds.x = y, this._bounds.width = w - y, this._bounds.y = z, this._bounds.height = x - z, this._currentBounds = this._bounds
                }
                return this._currentBounds
            }, d.prototype.containsPoint = function (a) {
                this.worldTransform.applyInverse(a, l);
                for (var b = this.graphicsData, c = 0; c < b.length; c++) {
                    var d = b[c];
                    if (d.fill && d.shape && d.shape.contains(l.x, l.y)) return !0
                }
                return !1
            }, d.prototype.updateLocalBounds = function () {
                var a = 1 / 0, b = -(1 / 0), c = 1 / 0, d = -(1 / 0);
                if (this.graphicsData.length) for (var e, f, g, h, i, j, l = 0; l < this.graphicsData.length; l++) {
                    var m = this.graphicsData[l], n = m.type, o = m.lineWidth;
                    if (e = m.shape, n === k.SHAPES.RECT || n === k.SHAPES.RREC) g = e.x - o / 2, h = e.y - o / 2, i = e.width + o, j = e.height + o, a = a > g ? g : a, b = g + i > b ? g + i : b, c = c > h ? h : c, d = h + j > d ? h + j : d; else if (n === k.SHAPES.CIRC) g = e.x, h = e.y, i = e.radius + o / 2, j = e.radius + o / 2, a = a > g - i ? g - i : a, b = g + i > b ? g + i : b, c = c > h - j ? h - j : c, d = h + j > d ? h + j : d; else if (n === k.SHAPES.ELIP) g = e.x, h = e.y, i = e.width + o / 2, j = e.height + o / 2, a = a > g - i ? g - i : a, b = g + i > b ? g + i : b, c = c > h - j ? h - j : c, d = h + j > d ? h + j : d; else {
                        f = e.points;
                        for (var p = 0; p < f.length; p += 2) g = f[p], h = f[p + 1], a = a > g - o ? g - o : a, b = g + o > b ? g + o : b, c = c > h - o ? h - o : c, d = h + o > d ? h + o : d
                    }
                } else a = 0, b = 0, c = 0, d = 0;
                var q = this.boundsPadding;
                this._localBounds.x = a - q, this._localBounds.width = b - a + 2 * q, this._localBounds.y = c - q, this._localBounds.height = d - c + 2 * q
            }, d.prototype.drawShape = function (a) {
                this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(), this.currentPath = null;
                var b = new i(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, a);
                return this.graphicsData.push(b), b.type === k.SHAPES.POLY && (b.shape.closed = b.shape.closed || this.filling, this.currentPath = b), this.dirty = this.boundsDirty = !0, b
            }, d.prototype.destroy = function () {
                e.prototype.destroy.apply(this, arguments);
                for (var a = 0; a < this.graphicsData.length; ++a) this.graphicsData[a].destroy();
                for (var b in this._webgl) for (var c = 0; c < this._webgl[b].data.length; ++c) this._webgl[b].data[c].destroy();
                this.graphicsData = null, this.currentPath = null, this._webgl = null, this._localBounds = null
            }
        }, {
            "../const": 23,
            "../display/Container": 24,
            "../math": 33,
            "../renderers/canvas/utils/CanvasBuffer": 45,
            "../renderers/canvas/utils/CanvasGraphics": 46,
            "../textures/Texture": 72,
            "./GraphicsData": 27
        }],
        27: [function (a, b, c) {
            function d(a, b, c, d, e, f, g) {
                this.lineWidth = a, this.lineColor = b, this.lineAlpha = c, this._lineTint = b, this.fillColor = d, this.fillAlpha = e, this._fillTint = d, this.fill = f, this.shape = g, this.type = g.type
            }

            d.prototype.constructor = d, b.exports = d, d.prototype.clone = function () {
                return new d(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.shape)
            }, d.prototype.destroy = function () {
                this.shape = null
            }
        }, {}],
        28: [function (a, b, c) {
            function d(a) {
                h.call(this, a), this.graphicsDataPool = [], this.primitiveShader = null, this.complexPrimitiveShader = null, this.maximumSimplePolySize = 200
            }

            var e = a("../../utils"), f = a("../../math"), g = a("../../const"),
                h = a("../../renderers/webgl/utils/ObjectRenderer"), i = a("../../renderers/webgl/WebGLRenderer"),
                j = a("./WebGLGraphicsData"), k = a("earcut");
            d.prototype = Object.create(h.prototype), d.prototype.constructor = d, b.exports = d, i.registerPlugin("graphics", d), d.prototype.onContextChange = function () {
            }, d.prototype.destroy = function () {
                h.prototype.destroy.call(this);
                for (var a = 0; a < this.graphicsDataPool.length; ++a) this.graphicsDataPool[a].destroy();
                this.graphicsDataPool = null
            }, d.prototype.render = function (a) {
                var b, c = this.renderer, d = c.gl, f = c.shaderManager.plugins.primitiveShader;
                (a.dirty || !a._webGL[d.id]) && this.updateGraphics(a);
                var g = a._webGL[d.id];
                c.blendModeManager.setBlendMode(a.blendMode);
                for (var h = 0, i = g.data.length; i > h; h++) b = g.data[h], 1 === g.data[h].mode ? (c.stencilManager.pushStencil(a, b), d.uniform1f(c.shaderManager.complexPrimitiveShader.uniforms.alpha._location, a.worldAlpha * b.alpha), d.drawElements(d.TRIANGLE_FAN, 4, d.UNSIGNED_SHORT, 2 * (b.indices.length - 4)), c.stencilManager.popStencil(a, b)) : (f = c.shaderManager.primitiveShader, c.shaderManager.setShader(f), d.uniformMatrix3fv(f.uniforms.translationMatrix._location, !1, a.worldTransform.toArray(!0)), d.uniformMatrix3fv(f.uniforms.projectionMatrix._location, !1, c.currentRenderTarget.projectionMatrix.toArray(!0)), d.uniform3fv(f.uniforms.tint._location, e.hex2rgb(a.tint)), d.uniform1f(f.uniforms.alpha._location, a.worldAlpha), d.bindBuffer(d.ARRAY_BUFFER, b.buffer), d.vertexAttribPointer(f.attributes.aVertexPosition, 2, d.FLOAT, !1, 24, 0), d.vertexAttribPointer(f.attributes.aColor, 4, d.FLOAT, !1, 24, 8), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, b.indexBuffer), d.drawElements(d.TRIANGLE_STRIP, b.indices.length, d.UNSIGNED_SHORT, 0)), c.drawCount++
            }, d.prototype.updateGraphics = function (a) {
                var b = this.renderer.gl, c = a._webGL[b.id];
                c || (c = a._webGL[b.id] = {lastIndex: 0, data: [], gl: b}), a.dirty = !1;
                var d;
                if (a.clearDirty) {
                    for (a.clearDirty = !1, d = 0; d < c.data.length; d++) {
                        var e = c.data[d];
                        e.reset(), this.graphicsDataPool.push(e)
                    }
                    c.data = [], c.lastIndex = 0
                }
                var f;
                for (d = c.lastIndex; d < a.graphicsData.length; d++) {
                    var h = a.graphicsData[d];
                    if (h.type === g.SHAPES.POLY) {
                        if (h.points = h.shape.points.slice(), h.shape.closed && (h.points[0] !== h.points[h.points.length - 2] || h.points[1] !== h.points[h.points.length - 1]) && h.points.push(h.points[0], h.points[1]), h.fill && h.points.length >= 6) if (h.points.length < 2 * this.maximumSimplePolySize) {
                            f = this.switchMode(c, 0);
                            var i = this.buildPoly(h, f);
                            i || (f = this.switchMode(c, 1), this.buildComplexPoly(h, f))
                        } else f = this.switchMode(c, 1), this.buildComplexPoly(h, f);
                        h.lineWidth > 0 && (f = this.switchMode(c, 0), this.buildLine(h, f))
                    } else f = this.switchMode(c, 0), h.type === g.SHAPES.RECT ? this.buildRectangle(h, f) : h.type === g.SHAPES.CIRC || h.type === g.SHAPES.ELIP ? this.buildCircle(h, f) : h.type === g.SHAPES.RREC && this.buildRoundedRectangle(h, f);
                    c.lastIndex++
                }
                for (d = 0; d < c.data.length; d++) f = c.data[d], f.dirty && f.upload()
            }, d.prototype.switchMode = function (a, b) {
                var c;
                return a.data.length ? (c = a.data[a.data.length - 1], (c.points.length > 32e4 || c.mode !== b || 1 === b) && (c = this.graphicsDataPool.pop() || new j(a.gl), c.mode = b, a.data.push(c))) : (c = this.graphicsDataPool.pop() || new j(a.gl), c.mode = b, a.data.push(c)), c.dirty = !0, c
            }, d.prototype.buildRectangle = function (a, b) {
                var c = a.shape, d = c.x, f = c.y, g = c.width, h = c.height;
                if (a.fill) {
                    var i = e.hex2rgb(a.fillColor), j = a.fillAlpha, k = i[0] * j, l = i[1] * j, m = i[2] * j,
                        n = b.points, o = b.indices, p = n.length / 6;
                    n.push(d, f), n.push(k, l, m, j), n.push(d + g, f), n.push(k, l, m, j), n.push(d, f + h), n.push(k, l, m, j), n.push(d + g, f + h), n.push(k, l, m, j), o.push(p, p, p + 1, p + 2, p + 3, p + 3)
                }
                if (a.lineWidth) {
                    var q = a.points;
                    a.points = [d, f, d + g, f, d + g, f + h, d, f + h, d, f], this.buildLine(a, b), a.points = q
                }
            }, d.prototype.buildRoundedRectangle = function (a, b) {
                var c = a.shape, d = c.x, f = c.y, g = c.width, h = c.height, i = c.radius, j = [];
                if (j.push(d, f + i), this.quadraticBezierCurve(d, f + h - i, d, f + h, d + i, f + h, j), this.quadraticBezierCurve(d + g - i, f + h, d + g, f + h, d + g, f + h - i, j), this.quadraticBezierCurve(d + g, f + i, d + g, f, d + g - i, f, j), this.quadraticBezierCurve(d + i, f, d, f, d, f + i + 1e-10, j), a.fill) {
                    var l = e.hex2rgb(a.fillColor), m = a.fillAlpha, n = l[0] * m, o = l[1] * m, p = l[2] * m,
                        q = b.points, r = b.indices, s = q.length / 6, t = k(j, null, 2), u = 0;
                    for (u = 0; u < t.length; u += 3) r.push(t[u] + s), r.push(t[u] + s), r.push(t[u + 1] + s), r.push(t[u + 2] + s), r.push(t[u + 2] + s);
                    for (u = 0; u < j.length; u++) q.push(j[u], j[++u], n, o, p, m)
                }
                if (a.lineWidth) {
                    var v = a.points;
                    a.points = j, this.buildLine(a, b), a.points = v
                }
            }, d.prototype.quadraticBezierCurve = function (a, b, c, d, e, f, g) {
                function h(a, b, c) {
                    var d = b - a;
                    return a + d * c
                }

                for (var i, j, k, l, m, n, o = 20, p = g || [], q = 0, r = 0; o >= r; r++) q = r / o, i = h(a, c, q), j = h(b, d, q), k = h(c, e, q), l = h(d, f, q), m = h(i, k, q), n = h(j, l, q), p.push(m, n);
                return p
            }, d.prototype.buildCircle = function (a, b) {
                var c, d, f = a.shape, h = f.x, i = f.y;
                a.type === g.SHAPES.CIRC ? (c = f.radius, d = f.radius) : (c = f.width, d = f.height);
                var j = Math.floor(30 * Math.sqrt(f.radius)) || Math.floor(15 * Math.sqrt(f.width + f.height)),
                    k = 2 * Math.PI / j, l = 0;
                if (a.fill) {
                    var m = e.hex2rgb(a.fillColor), n = a.fillAlpha, o = m[0] * n, p = m[1] * n, q = m[2] * n,
                        r = b.points, s = b.indices, t = r.length / 6;
                    for (s.push(t), l = 0; j + 1 > l; l++) r.push(h, i, o, p, q, n), r.push(h + Math.sin(k * l) * c, i + Math.cos(k * l) * d, o, p, q, n), s.push(t++, t++);
                    s.push(t - 1)
                }
                if (a.lineWidth) {
                    var u = a.points;
                    for (a.points = [], l = 0; j + 1 > l; l++) a.points.push(h + Math.sin(k * l) * c, i + Math.cos(k * l) * d);
                    this.buildLine(a, b), a.points = u
                }
            }, d.prototype.buildLine = function (a, b) {
                var c = 0, d = a.points;
                if (0 !== d.length) {
                    var g = new f.Point(d[0], d[1]), h = new f.Point(d[d.length - 2], d[d.length - 1]);
                    if (g.x === h.x && g.y === h.y) {
                        d = d.slice(), d.pop(), d.pop(), h = new f.Point(d[d.length - 2], d[d.length - 1]);
                        var i = h.x + .5 * (g.x - h.x), j = h.y + .5 * (g.y - h.y);
                        d.unshift(i, j), d.push(i, j)
                    }
                    var k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H = b.points,
                        I = b.indices, J = d.length / 2, K = d.length, L = H.length / 6, M = a.lineWidth / 2,
                        N = e.hex2rgb(a.lineColor), O = a.lineAlpha, P = N[0] * O, Q = N[1] * O, R = N[2] * O;
                    for (m = d[0], n = d[1], o = d[2], p = d[3], s = -(n - p), t = m - o, G = Math.sqrt(s * s + t * t), s /= G, t /= G, s *= M, t *= M, H.push(m - s, n - t, P, Q, R, O), H.push(m + s, n + t, P, Q, R, O), c = 1; J - 1 > c; c++) m = d[2 * (c - 1)], n = d[2 * (c - 1) + 1], o = d[2 * c], p = d[2 * c + 1], q = d[2 * (c + 1)], r = d[2 * (c + 1) + 1], s = -(n - p), t = m - o, G = Math.sqrt(s * s + t * t), s /= G, t /= G, s *= M, t *= M, u = -(p - r), v = o - q, G = Math.sqrt(u * u + v * v), u /= G, v /= G, u *= M, v *= M, y = -t + n - (-t + p), z = -s + o - (-s + m), A = (-s + m) * (-t + p) - (-s + o) * (-t + n), B = -v + r - (-v + p), C = -u + o - (-u + q), D = (-u + q) * (-v + p) - (-u + o) * (-v + r), E = y * C - B * z, Math.abs(E) < .1 ? (E += 10.1, H.push(o - s, p - t, P, Q, R, O), H.push(o + s, p + t, P, Q, R, O)) : (k = (z * D - C * A) / E, l = (B * A - y * D) / E, F = (k - o) * (k - o) + (l - p) * (l - p), F > 19600 ? (w = s - u, x = t - v, G = Math.sqrt(w * w + x * x), w /= G, x /= G, w *= M, x *= M, H.push(o - w, p - x), H.push(P, Q, R, O), H.push(o + w, p + x), H.push(P, Q, R, O), H.push(o - w, p - x), H.push(P, Q, R, O), K++) : (H.push(k, l), H.push(P, Q, R, O), H.push(o - (k - o), p - (l - p)), H.push(P, Q, R, O)));
                    for (m = d[2 * (J - 2)], n = d[2 * (J - 2) + 1], o = d[2 * (J - 1)], p = d[2 * (J - 1) + 1], s = -(n - p), t = m - o, G = Math.sqrt(s * s + t * t), s /= G, t /= G, s *= M, t *= M, H.push(o - s, p - t), H.push(P, Q, R, O), H.push(o + s, p + t), H.push(P, Q, R, O), I.push(L), c = 0; K > c; c++) I.push(L++);
                    I.push(L - 1)
                }
            }, d.prototype.buildComplexPoly = function (a, b) {
                var c = a.points.slice();
                if (!(c.length < 6)) {
                    var d = b.indices;
                    b.points = c, b.alpha = a.fillAlpha, b.color = e.hex2rgb(a.fillColor);
                    for (var f, g, h = 1 / 0, i = -(1 / 0), j = 1 / 0, k = -(1 / 0), l = 0; l < c.length; l += 2) f = c[l], g = c[l + 1], h = h > f ? f : h, i = f > i ? f : i, j = j > g ? g : j, k = g > k ? g : k;
                    c.push(h, j, i, j, i, k, h, k);
                    var m = c.length / 2;
                    for (l = 0; m > l; l++) d.push(l)
                }
            }, d.prototype.buildPoly = function (a, b) {
                var c = a.points;
                if (!(c.length < 6)) {
                    var d = b.points, f = b.indices, g = c.length / 2, h = e.hex2rgb(a.fillColor), i = a.fillAlpha,
                        j = h[0] * i, l = h[1] * i, m = h[2] * i, n = k(c, null, 2);
                    if (!n) return !1;
                    var o = d.length / 6, p = 0;
                    for (p = 0; p < n.length; p += 3) f.push(n[p] + o), f.push(n[p] + o), f.push(n[p + 1] + o), f.push(n[p + 2] + o), f.push(n[p + 2] + o);
                    for (p = 0; g > p; p++) d.push(c[2 * p], c[2 * p + 1], j, l, m, i);
                    return !0
                }
            }
        }, {
            "../../const": 23,
            "../../math": 33,
            "../../renderers/webgl/WebGLRenderer": 49,
            "../../renderers/webgl/utils/ObjectRenderer": 63,
            "../../utils": 77,
            "./WebGLGraphicsData": 29,
            earcut: 9
        }],
        29: [function (a, b, c) {
            function d(a) {
                this.gl = a, this.color = [0, 0, 0], this.points = [], this.indices = [], this.buffer = a.createBuffer(), this.indexBuffer = a.createBuffer(), this.mode = 1, this.alpha = 1, this.dirty = !0, this.glPoints = null, this.glIndices = null
            }

            d.prototype.constructor = d, b.exports = d, d.prototype.reset = function () {
                this.points.length = 0, this.indices.length = 0
            }, d.prototype.upload = function () {
                var a = this.gl;
                this.glPoints = new Float32Array(this.points), a.bindBuffer(a.ARRAY_BUFFER, this.buffer), a.bufferData(a.ARRAY_BUFFER, this.glPoints, a.STATIC_DRAW), this.glIndices = new Uint16Array(this.indices), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer), a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.glIndices, a.STATIC_DRAW), this.dirty = !1
            }, d.prototype.destroy = function () {
                this.color = null, this.points = null, this.indices = null, this.gl.deleteBuffer(this.buffer), this.gl.deleteBuffer(this.indexBuffer), this.gl = null, this.buffer = null, this.indexBuffer = null, this.glPoints = null, this.glIndices = null
            }
        }, {}],
        30: [function (a, b, c) {
            var d = b.exports = Object.assign(a("./const"), a("./math"), {
                utils: a("./utils"),
                ticker: a("./ticker"),
                DisplayObject: a("./display/DisplayObject"),
                Container: a("./display/Container"),
                Sprite: a("./sprites/Sprite"),
                ParticleContainer: a("./particles/ParticleContainer"),
                SpriteRenderer: a("./sprites/webgl/SpriteRenderer"),
                ParticleRenderer: a("./particles/webgl/ParticleRenderer"),
                Text: a("./text/Text"),
                Graphics: a("./graphics/Graphics"),
                GraphicsData: a("./graphics/GraphicsData"),
                GraphicsRenderer: a("./graphics/webgl/GraphicsRenderer"),
                Texture: a("./textures/Texture"),
                BaseTexture: a("./textures/BaseTexture"),
                RenderTexture: a("./textures/RenderTexture"),
                VideoBaseTexture: a("./textures/VideoBaseTexture"),
                TextureUvs: a("./textures/TextureUvs"),
                CanvasRenderer: a("./renderers/canvas/CanvasRenderer"),
                CanvasGraphics: a("./renderers/canvas/utils/CanvasGraphics"),
                CanvasBuffer: a("./renderers/canvas/utils/CanvasBuffer"),
                WebGLRenderer: a("./renderers/webgl/WebGLRenderer"),
                WebGLManager: a("./renderers/webgl/managers/WebGLManager"),
                ShaderManager: a("./renderers/webgl/managers/ShaderManager"),
                Shader: a("./renderers/webgl/shaders/Shader"),
                ObjectRenderer: a("./renderers/webgl/utils/ObjectRenderer"),
                RenderTarget: a("./renderers/webgl/utils/RenderTarget"),
                AbstractFilter: a("./renderers/webgl/filters/AbstractFilter"),
                FXAAFilter: a("./renderers/webgl/filters/FXAAFilter"),
                SpriteMaskFilter: a("./renderers/webgl/filters/SpriteMaskFilter"),
                autoDetectRenderer: function (a, b, c, e) {
                    return a = a || 800, b = b || 600, !e && d.utils.isWebGLSupported() ? new d.WebGLRenderer(a, b, c) : new d.CanvasRenderer(a, b, c)
                }
            })
        }, {
            "./const": 23,
            "./display/Container": 24,
            "./display/DisplayObject": 25,
            "./graphics/Graphics": 26,
            "./graphics/GraphicsData": 27,
            "./graphics/webgl/GraphicsRenderer": 28,
            "./math": 33,
            "./particles/ParticleContainer": 39,
            "./particles/webgl/ParticleRenderer": 41,
            "./renderers/canvas/CanvasRenderer": 44,
            "./renderers/canvas/utils/CanvasBuffer": 45,
            "./renderers/canvas/utils/CanvasGraphics": 46,
            "./renderers/webgl/WebGLRenderer": 49,
            "./renderers/webgl/filters/AbstractFilter": 50,
            "./renderers/webgl/filters/FXAAFilter": 51,
            "./renderers/webgl/filters/SpriteMaskFilter": 52,
            "./renderers/webgl/managers/ShaderManager": 56,
            "./renderers/webgl/managers/WebGLManager": 58,
            "./renderers/webgl/shaders/Shader": 61,
            "./renderers/webgl/utils/ObjectRenderer": 63,
            "./renderers/webgl/utils/RenderTarget": 65,
            "./sprites/Sprite": 67,
            "./sprites/webgl/SpriteRenderer": 68,
            "./text/Text": 69,
            "./textures/BaseTexture": 70,
            "./textures/RenderTexture": 71,
            "./textures/Texture": 72,
            "./textures/TextureUvs": 73,
            "./textures/VideoBaseTexture": 74,
            "./ticker": 76,
            "./utils": 77
        }],
        31: [function (a, b, c) {
            function d() {
                this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0
            }

            var e = a("./Point");
            d.prototype.constructor = d, b.exports = d, d.prototype.fromArray = function (a) {
                this.a = a[0], this.b = a[1], this.c = a[3], this.d = a[4], this.tx = a[2], this.ty = a[5]
            }, d.prototype.set = function (a, b, c, d, e, f) {
                return this.a = a, this.b = b, this.c = c, this.d = d, this.tx = e, this.ty = f, this
            }, d.prototype.toArray = function (a, b) {
                this.array || (this.array = new Float32Array(9));
                var c = b || this.array;
                return a ? (c[0] = this.a, c[1] = this.b, c[2] = 0, c[3] = this.c, c[4] = this.d, c[5] = 0, c[6] = this.tx, c[7] = this.ty, c[8] = 1) : (c[0] = this.a, c[1] = this.c, c[2] = this.tx, c[3] = this.b, c[4] = this.d, c[5] = this.ty, c[6] = 0, c[7] = 0, c[8] = 1), c
            }, d.prototype.apply = function (a, b) {
                b = b || new e;
                var c = a.x, d = a.y;
                return b.x = this.a * c + this.c * d + this.tx, b.y = this.b * c + this.d * d + this.ty, b
            }, d.prototype.applyInverse = function (a, b) {
                b = b || new e;
                var c = 1 / (this.a * this.d + this.c * -this.b), d = a.x, f = a.y;
                return b.x = this.d * c * d + -this.c * c * f + (this.ty * this.c - this.tx * this.d) * c, b.y = this.a * c * f + -this.b * c * d + (-this.ty * this.a + this.tx * this.b) * c, b
            }, d.prototype.translate = function (a, b) {
                return this.tx += a, this.ty += b, this
            }, d.prototype.scale = function (a, b) {
                return this.a *= a, this.d *= b, this.c *= a, this.b *= b, this.tx *= a, this.ty *= b, this
            }, d.prototype.rotate = function (a) {
                var b = Math.cos(a), c = Math.sin(a), d = this.a, e = this.c, f = this.tx;
                return this.a = d * b - this.b * c, this.b = d * c + this.b * b, this.c = e * b - this.d * c, this.d = e * c + this.d * b, this.tx = f * b - this.ty * c, this.ty = f * c + this.ty * b, this
            }, d.prototype.append = function (a) {
                var b = this.a, c = this.b, d = this.c, e = this.d;
                return this.a = a.a * b + a.b * d, this.b = a.a * c + a.b * e, this.c = a.c * b + a.d * d, this.d = a.c * c + a.d * e, this.tx = a.tx * b + a.ty * d + this.tx, this.ty = a.tx * c + a.ty * e + this.ty, this
            }, d.prototype.setTransform = function (a, b, c, d, e, f, g, h, i) {
                var j, k, l, m, n, o, p, q, r, s;
                return n = Math.sin(g), o = Math.cos(g), p = Math.cos(i), q = Math.sin(i), r = -Math.sin(h), s = Math.cos(h), j = o * e, k = n * e, l = -n * f, m = o * f, this.a = p * j + q * l, this.b = p * k + q * m, this.c = r * j + s * l, this.d = r * k + s * m, this.tx = a + (c * j + d * l), this.ty = b + (c * k + d * m), this
            }, d.prototype.prepend = function (a) {
                var b = this.tx;
                if (1 !== a.a || 0 !== a.b || 0 !== a.c || 1 !== a.d) {
                    var c = this.a, d = this.c;
                    this.a = c * a.a + this.b * a.c, this.b = c * a.b + this.b * a.d, this.c = d * a.a + this.d * a.c, this.d = d * a.b + this.d * a.d
                }
                return this.tx = b * a.a + this.ty * a.c + a.tx, this.ty = b * a.b + this.ty * a.d + a.ty, this
            }, d.prototype.invert = function () {
                var a = this.a, b = this.b, c = this.c, d = this.d, e = this.tx, f = a * d - b * c;
                return this.a = d / f, this.b = -b / f, this.c = -c / f, this.d = a / f, this.tx = (c * this.ty - d * e) / f, this.ty = -(a * this.ty - b * e) / f, this
            }, d.prototype.identity = function () {
                return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this
            }, d.prototype.clone = function () {
                var a = new d;
                return a.a = this.a, a.b = this.b, a.c = this.c, a.d = this.d, a.tx = this.tx, a.ty = this.ty, a
            }, d.prototype.copy = function (a) {
                return a.a = this.a, a.b = this.b, a.c = this.c, a.d = this.d, a.tx = this.tx, a.ty = this.ty, a
            }, d.IDENTITY = new d, d.TEMP_MATRIX = new d
        }, {"./Point": 32}],
        32: [function (a, b, c) {
            function d(a, b) {
                this.x = a || 0, this.y = b || 0
            }

            d.prototype.constructor = d, b.exports = d, d.prototype.clone = function () {
                return new d(this.x, this.y)
            }, d.prototype.copy = function (a) {
                this.set(a.x, a.y)
            }, d.prototype.equals = function (a) {
                return a.x === this.x && a.y === this.y
            }, d.prototype.set = function (a, b) {
                this.x = a || 0, this.y = b || (0 !== b ? this.x : 0)
            }
        }, {}],
        33: [function (a, b, c) {
            b.exports = {
                Point: a("./Point"),
                Matrix: a("./Matrix"),
                Circle: a("./shapes/Circle"),
                Ellipse: a("./shapes/Ellipse"),
                Polygon: a("./shapes/Polygon"),
                Rectangle: a("./shapes/Rectangle"),
                RoundedRectangle: a("./shapes/RoundedRectangle")
            }
        }, {
            "./Matrix": 31,
            "./Point": 32,
            "./shapes/Circle": 34,
            "./shapes/Ellipse": 35,
            "./shapes/Polygon": 36,
            "./shapes/Rectangle": 37,
            "./shapes/RoundedRectangle": 38
        }],
        34: [function (a, b, c) {
            function d(a, b, c) {
                this.x = a || 0, this.y = b || 0, this.radius = c || 0, this.type = f.SHAPES.CIRC
            }

            var e = a("./Rectangle"), f = a("../../const");
            d.prototype.constructor = d, b.exports = d, d.prototype.clone = function () {
                return new d(this.x, this.y, this.radius)
            }, d.prototype.contains = function (a, b) {
                if (this.radius <= 0) return !1;
                var c = this.x - a, d = this.y - b, e = this.radius * this.radius;
                return c *= c, d *= d, e >= c + d
            }, d.prototype.getBounds = function () {
                return new e(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
            }
        }, {"../../const": 23, "./Rectangle": 37}],
        35: [function (a, b, c) {
            function d(a, b, c, d) {
                this.x = a || 0, this.y = b || 0, this.width = c || 0, this.height = d || 0, this.type = f.SHAPES.ELIP
            }

            var e = a("./Rectangle"), f = a("../../const");
            d.prototype.constructor = d, b.exports = d, d.prototype.clone = function () {
                return new d(this.x, this.y, this.width, this.height)
            }, d.prototype.contains = function (a, b) {
                if (this.width <= 0 || this.height <= 0) return !1;
                var c = (a - this.x) / this.width, d = (b - this.y) / this.height;
                return c *= c, d *= d, 1 >= c + d
            }, d.prototype.getBounds = function () {
                return new e(this.x - this.width, this.y - this.height, this.width, this.height)
            }
        }, {"../../const": 23, "./Rectangle": 37}],
        36: [function (a, b, c) {
            function d(a) {
                var b = a;
                if (!Array.isArray(b)) {
                    b = new Array(arguments.length);
                    for (var c = 0; c < b.length; ++c) b[c] = arguments[c]
                }
                if (b[0] instanceof e) {
                    for (var d = [], g = 0, h = b.length; h > g; g++) d.push(b[g].x, b[g].y);
                    b = d
                }
                this.closed = !0, this.points = b, this.type = f.SHAPES.POLY
            }

            var e = a("../Point"), f = a("../../const");
            d.prototype.constructor = d, b.exports = d, d.prototype.clone = function () {
                return new d(this.points.slice())
            }, d.prototype.contains = function (a, b) {
                for (var c = !1, d = this.points.length / 2, e = 0, f = d - 1; d > e; f = e++) {
                    var g = this.points[2 * e], h = this.points[2 * e + 1], i = this.points[2 * f],
                        j = this.points[2 * f + 1], k = h > b != j > b && (i - g) * (b - h) / (j - h) + g > a;
                    k && (c = !c)
                }
                return c
            }
        }, {"../../const": 23, "../Point": 32}],
        37: [function (a, b, c) {
            function d(a, b, c, d) {
                this.x = a || 0, this.y = b || 0, this.width = c || 0, this.height = d || 0, this.type = e.SHAPES.RECT
            }

            var e = a("../../const");
            d.prototype.constructor = d, b.exports = d, d.EMPTY = new d(0, 0, 0, 0), d.prototype.clone = function () {
                return new d(this.x, this.y, this.width, this.height)
            }, d.prototype.contains = function (a, b) {
                return !(this.width <= 0 || this.height <= 0) && (a >= this.x && a < this.x + this.width && b >= this.y && b < this.y + this.height)
            }
        }, {"../../const": 23}],
        38: [function (a, b, c) {
            function d(a, b, c, d, f) {
                this.x = a || 0, this.y = b || 0, this.width = c || 0, this.height = d || 0, this.radius = f || 20, this.type = e.SHAPES.RREC
            }

            var e = a("../../const");
            d.prototype.constructor = d, b.exports = d, d.prototype.clone = function () {
                return new d(this.x, this.y, this.width, this.height, this.radius)
            }, d.prototype.contains = function (a, b) {
                return !(this.width <= 0 || this.height <= 0) && (a >= this.x && a <= this.x + this.width && b >= this.y && b <= this.y + this.height)
            }
        }, {"../../const": 23}],
        39: [function (a, b, c) {
            function d(a, b, c) {
                e.call(this), c = c || 15e3, a = a || 15e3;
                var d = 16384;
                c > d && (c = d), c > a && (c = a), this._properties = [!1, !0, !1, !1, !1], this._maxSize = a, this._batchSize = c, this._buffers = null, this._bufferToUpdate = 0, this.interactiveChildren = !1, this.blendMode = f.BLEND_MODES.NORMAL, this.roundPixels = !0, this.setProperties(b)
            }

            var e = a("../display/Container"), f = a("../const");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.setProperties = function (a) {
                a && (this._properties[0] = "scale" in a ? !!a.scale : this._properties[0], this._properties[1] = "position" in a ? !!a.position : this._properties[1], this._properties[2] = "rotation" in a ? !!a.rotation : this._properties[2], this._properties[3] = "uvs" in a ? !!a.uvs : this._properties[3], this._properties[4] = "alpha" in a ? !!a.alpha : this._properties[4])
            }, d.prototype.updateTransform = function () {
                this.displayObjectUpdateTransform()
            }, d.prototype.renderWebGL = function (a) {
                this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (a.setObjectRenderer(a.plugins.particle), a.plugins.particle.render(this))
            }, d.prototype.onChildrenChange = function (a) {
                var b = Math.floor(a / this._batchSize);
                b < this._bufferToUpdate && (this._bufferToUpdate = b)
            }, d.prototype.renderCanvas = function (a) {
                if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
                    var b = a.context, c = this.worldTransform, d = !0, e = 0, f = 0, g = 0, h = 0,
                        i = a.blendModes[this.blendMode];
                    i !== b.globalCompositeOperation && (b.globalCompositeOperation = i), b.globalAlpha = this.worldAlpha, this.displayObjectUpdateTransform();
                    for (var j = 0; j < this.children.length; ++j) {
                        var k = this.children[j];
                        if (k.visible) {
                            var l = k.texture.frame;
                            if (b.globalAlpha = this.worldAlpha * k.alpha, k.rotation % (2 * Math.PI) === 0) d && (b.setTransform(c.a, c.b, c.c, c.d, c.tx, c.ty), d = !1), e = k.anchor.x * (-l.width * k.scale.x) + k.position.x + .5,
                                f = k.anchor.y * (-l.height * k.scale.y) + k.position.y + .5, g = l.width * k.scale.x, h = l.height * k.scale.y; else {
                                d || (d = !0), k.displayObjectUpdateTransform();
                                var m = k.worldTransform;
                                a.roundPixels ? b.setTransform(m.a, m.b, m.c, m.d, 0 | m.tx, 0 | m.ty) : b.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty), e = k.anchor.x * -l.width + .5, f = k.anchor.y * -l.height + .5, g = l.width, h = l.height
                            }
                            b.drawImage(k.texture.baseTexture.source, l.x, l.y, l.width, l.height, e, f, g, h)
                        }
                    }
                }
            }, d.prototype.destroy = function () {
                if (e.prototype.destroy.apply(this, arguments), this._buffers) for (var a = 0; a < this._buffers.length; ++a) this._buffers[a].destroy();
                this._properties = null, this._buffers = null
            }
        }, {"../const": 23, "../display/Container": 24}],
        40: [function (a, b, c) {
            function d(a, b, c, d) {
                this.gl = a, this.vertSize = 2, this.vertByteSize = 4 * this.vertSize, this.size = d, this.dynamicProperties = [], this.staticProperties = [];
                for (var e = 0; e < b.length; e++) {
                    var f = b[e];
                    c[e] ? this.dynamicProperties.push(f) : this.staticProperties.push(f)
                }
                this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.initBuffers()
            }

            d.prototype.constructor = d, b.exports = d, d.prototype.initBuffers = function () {
                var a, b, c = this.gl, d = 0;
                for (this.dynamicStride = 0, a = 0; a < this.dynamicProperties.length; a++) b = this.dynamicProperties[a], b.offset = d, d += b.size, this.dynamicStride += b.size;
                this.dynamicData = new Float32Array(this.size * this.dynamicStride * 4), this.dynamicBuffer = c.createBuffer(), c.bindBuffer(c.ARRAY_BUFFER, this.dynamicBuffer), c.bufferData(c.ARRAY_BUFFER, this.dynamicData, c.DYNAMIC_DRAW);
                var e = 0;
                for (this.staticStride = 0, a = 0; a < this.staticProperties.length; a++) b = this.staticProperties[a], b.offset = e, e += b.size, this.staticStride += b.size;
                this.staticData = new Float32Array(this.size * this.staticStride * 4), this.staticBuffer = c.createBuffer(), c.bindBuffer(c.ARRAY_BUFFER, this.staticBuffer), c.bufferData(c.ARRAY_BUFFER, this.staticData, c.DYNAMIC_DRAW)
            }, d.prototype.uploadDynamic = function (a, b, c) {
                for (var d = this.gl, e = 0; e < this.dynamicProperties.length; e++) {
                    var f = this.dynamicProperties[e];
                    f.uploadFunction(a, b, c, this.dynamicData, this.dynamicStride, f.offset)
                }
                d.bindBuffer(d.ARRAY_BUFFER, this.dynamicBuffer), d.bufferSubData(d.ARRAY_BUFFER, 0, this.dynamicData)
            }, d.prototype.uploadStatic = function (a, b, c) {
                for (var d = this.gl, e = 0; e < this.staticProperties.length; e++) {
                    var f = this.staticProperties[e];
                    f.uploadFunction(a, b, c, this.staticData, this.staticStride, f.offset)
                }
                d.bindBuffer(d.ARRAY_BUFFER, this.staticBuffer), d.bufferSubData(d.ARRAY_BUFFER, 0, this.staticData)
            }, d.prototype.bind = function () {
                var a, b, c = this.gl;
                for (c.bindBuffer(c.ARRAY_BUFFER, this.dynamicBuffer), a = 0; a < this.dynamicProperties.length; a++) b = this.dynamicProperties[a], c.vertexAttribPointer(b.attribute, b.size, c.FLOAT, !1, 4 * this.dynamicStride, 4 * b.offset);
                for (c.bindBuffer(c.ARRAY_BUFFER, this.staticBuffer), a = 0; a < this.staticProperties.length; a++) b = this.staticProperties[a], c.vertexAttribPointer(b.attribute, b.size, c.FLOAT, !1, 4 * this.staticStride, 4 * b.offset)
            }, d.prototype.destroy = function () {
                this.dynamicProperties = null, this.dynamicData = null, this.gl.deleteBuffer(this.dynamicBuffer), this.staticProperties = null, this.staticData = null, this.gl.deleteBuffer(this.staticBuffer)
            }
        }, {}],
        41: [function (a, b, c) {
            function d(a) {
                e.call(this, a);
                var b = 98304;
                this.indices = new Uint16Array(b);
                for (var c = 0, d = 0; b > c; c += 6, d += 4) this.indices[c + 0] = d + 0, this.indices[c + 1] = d + 1, this.indices[c + 2] = d + 2, this.indices[c + 3] = d + 0, this.indices[c + 4] = d + 2, this.indices[c + 5] = d + 3;
                this.shader = null, this.indexBuffer = null, this.properties = null, this.tempMatrix = new i.Matrix
            }

            var e = a("../../renderers/webgl/utils/ObjectRenderer"), f = a("../../renderers/webgl/WebGLRenderer"),
                g = a("./ParticleShader"), h = a("./ParticleBuffer"), i = a("../../math");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, f.registerPlugin("particle", d), d.prototype.onContextChange = function () {
                var a = this.renderer.gl;
                this.shader = new g(this.renderer.shaderManager), this.indexBuffer = a.createBuffer(), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer), a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW), this.properties = [{
                    attribute: this.shader.attributes.aVertexPosition,
                    size: 2,
                    uploadFunction: this.uploadVertices,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aPositionCoord,
                    size: 2,
                    uploadFunction: this.uploadPosition,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aRotation,
                    size: 1,
                    uploadFunction: this.uploadRotation,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aTextureCoord,
                    size: 2,
                    uploadFunction: this.uploadUvs,
                    offset: 0
                }, {attribute: this.shader.attributes.aColor, size: 1, uploadFunction: this.uploadAlpha, offset: 0}]
            }, d.prototype.start = function () {
                var a = this.renderer.gl;
                a.activeTexture(a.TEXTURE0), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var b = this.shader;
                this.renderer.shaderManager.setShader(b)
            }, d.prototype.render = function (a) {
                var b = a.children, c = b.length, d = a._maxSize, e = a._batchSize;
                if (0 !== c) {
                    c > d && (c = d), a._buffers || (a._buffers = this.generateBuffers(a)), this.renderer.blendModeManager.setBlendMode(a.blendMode);
                    var f = this.renderer.gl, g = a.worldTransform.copy(this.tempMatrix);
                    g.prepend(this.renderer.currentRenderTarget.projectionMatrix), f.uniformMatrix3fv(this.shader.uniforms.projectionMatrix._location, !1, g.toArray(!0)), f.uniform1f(this.shader.uniforms.uAlpha._location, a.worldAlpha);
                    var h = b[0]._texture.baseTexture;
                    if (h._glTextures[f.id]) f.bindTexture(f.TEXTURE_2D, h._glTextures[f.id]); else {
                        if (!this.renderer.updateTexture(h)) return;
                        a._properties[0] && a._properties[3] || (a._bufferToUpdate = 0)
                    }
                    for (var i = 0, j = 0; c > i; i += e, j += 1) {
                        var k = c - i;
                        k > e && (k = e);
                        var l = a._buffers[j];
                        l.uploadDynamic(b, i, k), a._bufferToUpdate === j && (l.uploadStatic(b, i, k), a._bufferToUpdate = j + 1), l.bind(this.shader), f.drawElements(f.TRIANGLES, 6 * k, f.UNSIGNED_SHORT, 0), this.renderer.drawCount++
                    }
                }
            }, d.prototype.generateBuffers = function (a) {
                var b, c = this.renderer.gl, d = [], e = a._maxSize, f = a._batchSize, g = a._properties;
                for (b = 0; e > b; b += f) d.push(new h(c, this.properties, g, f));
                return d
            }, d.prototype.uploadVertices = function (a, b, c, d, e, f) {
                for (var g, h, i, j, k, l, m, n, o, p = 0; c > p; p++) g = a[b + p], h = g._texture, j = g.scale.x, k = g.scale.y, h.trim ? (i = h.trim, m = i.x - g.anchor.x * i.width, l = m + h.crop.width, o = i.y - g.anchor.y * i.height, n = o + h.crop.height) : (l = h._frame.width * (1 - g.anchor.x), m = h._frame.width * -g.anchor.x, n = h._frame.height * (1 - g.anchor.y), o = h._frame.height * -g.anchor.y), d[f] = m * j, d[f + 1] = o * k, d[f + e] = l * j, d[f + e + 1] = o * k, d[f + 2 * e] = l * j, d[f + 2 * e + 1] = n * k, d[f + 3 * e] = m * j, d[f + 3 * e + 1] = n * k, f += 4 * e
            }, d.prototype.uploadPosition = function (a, b, c, d, e, f) {
                for (var g = 0; c > g; g++) {
                    var h = a[b + g].position;
                    d[f] = h.x, d[f + 1] = h.y, d[f + e] = h.x, d[f + e + 1] = h.y, d[f + 2 * e] = h.x, d[f + 2 * e + 1] = h.y, d[f + 3 * e] = h.x, d[f + 3 * e + 1] = h.y, f += 4 * e
                }
            }, d.prototype.uploadRotation = function (a, b, c, d, e, f) {
                for (var g = 0; c > g; g++) {
                    var h = a[b + g].rotation;
                    d[f] = h, d[f + e] = h, d[f + 2 * e] = h, d[f + 3 * e] = h, f += 4 * e
                }
            }, d.prototype.uploadUvs = function (a, b, c, d, e, f) {
                for (var g = 0; c > g; g++) {
                    var h = a[b + g]._texture._uvs;
                    h ? (d[f] = h.x0, d[f + 1] = h.y0, d[f + e] = h.x1, d[f + e + 1] = h.y1, d[f + 2 * e] = h.x2, d[f + 2 * e + 1] = h.y2, d[f + 3 * e] = h.x3, d[f + 3 * e + 1] = h.y3, f += 4 * e) : (d[f] = 0, d[f + 1] = 0, d[f + e] = 0, d[f + e + 1] = 0, d[f + 2 * e] = 0, d[f + 2 * e + 1] = 0, d[f + 3 * e] = 0, d[f + 3 * e + 1] = 0, f += 4 * e)
                }
            }, d.prototype.uploadAlpha = function (a, b, c, d, e, f) {
                for (var g = 0; c > g; g++) {
                    var h = a[b + g].alpha;
                    d[f] = h, d[f + e] = h, d[f + 2 * e] = h, d[f + 3 * e] = h, f += 4 * e
                }
            }, d.prototype.destroy = function () {
                this.renderer.gl && this.renderer.gl.deleteBuffer(this.indexBuffer), e.prototype.destroy.apply(this, arguments), this.shader.destroy(), this.indices = null, this.tempMatrix = null
            }
        }, {
            "../../math": 33,
            "../../renderers/webgl/WebGLRenderer": 49,
            "../../renderers/webgl/utils/ObjectRenderer": 63,
            "./ParticleBuffer": 40,
            "./ParticleShader": 42
        }],
        42: [function (a, b, c) {
            function d(a) {
                e.call(this, a, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "void main(void){", "   vec2 v = aVertexPosition;", "   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"].join("\n"), ["precision lowp float;", "varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "uniform float uAlpha;", "void main(void){", "  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uAlpha;", "  if (color.a == 0.0) discard;", "  gl_FragColor = color;", "}"].join("\n"), {
                    uAlpha: {
                        type: "1f",
                        value: 1
                    }
                }, {aPositionCoord: 0, aRotation: 0})
            }

            var e = a("../../renderers/webgl/shaders/TextureShader");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d
        }, {"../../renderers/webgl/shaders/TextureShader": 62}],
        43: [function (a, b, c) {
            function d(a, b, c, d) {
                if (h.call(this), e.sayHello(a), d) for (var i in g.DEFAULT_RENDER_OPTIONS) "undefined" == typeof d[i] && (d[i] = g.DEFAULT_RENDER_OPTIONS[i]); else d = g.DEFAULT_RENDER_OPTIONS;
                this.type = g.RENDERER_TYPE.UNKNOWN, this.width = b || 800, this.height = c || 600, this.view = d.view || document.createElement("canvas"), this.resolution = d.resolution, this.transparent = d.transparent, this.autoResize = d.autoResize || !1, this.blendModes = null, this.preserveDrawingBuffer = d.preserveDrawingBuffer, this.clearBeforeRender = d.clearBeforeRender, this.roundPixels = d.roundPixels, this._backgroundColor = 0, this._backgroundColorRgb = [0, 0, 0], this._backgroundColorString = "#000000", this.backgroundColor = d.backgroundColor || this._backgroundColor, this._tempDisplayObjectParent = {
                    worldTransform: new f.Matrix,
                    worldAlpha: 1,
                    children: []
                }, this._lastObjectRendered = this._tempDisplayObjectParent
            }

            var e = a("../utils"), f = a("../math"), g = a("../const"), h = a("eventemitter3");
            d.prototype = Object.create(h.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                backgroundColor: {
                    get: function () {
                        return this._backgroundColor
                    }, set: function (a) {
                        this._backgroundColor = a, this._backgroundColorString = e.hex2string(a), e.hex2rgb(a, this._backgroundColorRgb)
                    }
                }
            }), d.prototype.resize = function (a, b) {
                this.width = a * this.resolution, this.height = b * this.resolution, this.view.width = this.width, this.view.height = this.height, this.autoResize && (this.view.style.width = this.width / this.resolution + "px", this.view.style.height = this.height / this.resolution + "px")
            }, d.prototype.destroy = function (a) {
                a && this.view.parentNode && this.view.parentNode.removeChild(this.view), this.type = g.RENDERER_TYPE.UNKNOWN, this.width = 0, this.height = 0, this.view = null, this.resolution = 0, this.transparent = !1, this.autoResize = !1, this.blendModes = null, this.preserveDrawingBuffer = !1, this.clearBeforeRender = !1, this.roundPixels = !1, this._backgroundColor = 0, this._backgroundColorRgb = null, this._backgroundColorString = null
            }
        }, {"../const": 23, "../math": 33, "../utils": 77, eventemitter3: 10}],
        44: [function (a, b, c) {
            function d(a, b, c) {
                c = c || {}, e.call(this, "Canvas", a, b, c), this.type = i.RENDERER_TYPE.CANVAS, this.context = this.view.getContext("2d", {alpha: this.transparent}), this.refresh = !0, this.maskManager = new f, this.smoothProperty = "imageSmoothingEnabled", this.context.imageSmoothingEnabled || (this.context.webkitImageSmoothingEnabled ? this.smoothProperty = "webkitImageSmoothingEnabled" : this.context.mozImageSmoothingEnabled ? this.smoothProperty = "mozImageSmoothingEnabled" : this.context.oImageSmoothingEnabled ? this.smoothProperty = "oImageSmoothingEnabled" : this.context.msImageSmoothingEnabled && (this.smoothProperty = "msImageSmoothingEnabled")), this.initPlugins(), this._mapBlendModes(), this._tempDisplayObjectParent = {
                    worldTransform: new h.Matrix,
                    worldAlpha: 1
                }, this.resize(a, b)
            }

            var e = a("../SystemRenderer"), f = a("./utils/CanvasMaskManager"), g = a("../../utils"),
                h = a("../../math"), i = a("../../const");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, g.pluginTarget.mixin(d), d.prototype.render = function (a) {
                this.emit("prerender");
                var b = a.parent;
                this._lastObjectRendered = a, a.parent = this._tempDisplayObjectParent, a.updateTransform(), a.parent = b, this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.globalAlpha = 1, this.context.globalCompositeOperation = this.blendModes[i.BLEND_MODES.NORMAL], navigator.isCocoonJS && this.view.screencanvas && (this.context.fillStyle = "black", this.context.clear()), this.clearBeforeRender && (this.transparent ? this.context.clearRect(0, 0, this.width, this.height) : (this.context.fillStyle = this._backgroundColorString, this.context.fillRect(0, 0, this.width, this.height))), this.renderDisplayObject(a, this.context), this.emit("postrender")
            }, d.prototype.destroy = function (a) {
                this.destroyPlugins(), e.prototype.destroy.call(this, a), this.context = null, this.refresh = !0, this.maskManager.destroy(), this.maskManager = null, this.smoothProperty = null
            }, d.prototype.renderDisplayObject = function (a, b) {
                var c = this.context;
                this.context = b, a.renderCanvas(this), this.context = c
            }, d.prototype.resize = function (a, b) {
                e.prototype.resize.call(this, a, b), this.smoothProperty && (this.context[this.smoothProperty] = i.SCALE_MODES.DEFAULT === i.SCALE_MODES.LINEAR)
            }, d.prototype._mapBlendModes = function () {
                this.blendModes || (this.blendModes = {}, g.canUseNewCanvasBlendModes() ? (this.blendModes[i.BLEND_MODES.NORMAL] = "source-over", this.blendModes[i.BLEND_MODES.ADD] = "lighter", this.blendModes[i.BLEND_MODES.MULTIPLY] = "multiply", this.blendModes[i.BLEND_MODES.SCREEN] = "screen", this.blendModes[i.BLEND_MODES.OVERLAY] = "overlay", this.blendModes[i.BLEND_MODES.DARKEN] = "darken", this.blendModes[i.BLEND_MODES.LIGHTEN] = "lighten", this.blendModes[i.BLEND_MODES.COLOR_DODGE] = "color-dodge", this.blendModes[i.BLEND_MODES.COLOR_BURN] = "color-burn", this.blendModes[i.BLEND_MODES.HARD_LIGHT] = "hard-light", this.blendModes[i.BLEND_MODES.SOFT_LIGHT] = "soft-light", this.blendModes[i.BLEND_MODES.DIFFERENCE] = "difference", this.blendModes[i.BLEND_MODES.EXCLUSION] = "exclusion", this.blendModes[i.BLEND_MODES.HUE] = "hue", this.blendModes[i.BLEND_MODES.SATURATION] = "saturate", this.blendModes[i.BLEND_MODES.COLOR] = "color", this.blendModes[i.BLEND_MODES.LUMINOSITY] = "luminosity") : (this.blendModes[i.BLEND_MODES.NORMAL] = "source-over", this.blendModes[i.BLEND_MODES.ADD] = "lighter", this.blendModes[i.BLEND_MODES.MULTIPLY] = "source-over", this.blendModes[i.BLEND_MODES.SCREEN] = "source-over", this.blendModes[i.BLEND_MODES.OVERLAY] = "source-over", this.blendModes[i.BLEND_MODES.DARKEN] = "source-over", this.blendModes[i.BLEND_MODES.LIGHTEN] = "source-over", this.blendModes[i.BLEND_MODES.COLOR_DODGE] = "source-over", this.blendModes[i.BLEND_MODES.COLOR_BURN] = "source-over", this.blendModes[i.BLEND_MODES.HARD_LIGHT] = "source-over", this.blendModes[i.BLEND_MODES.SOFT_LIGHT] = "source-over", this.blendModes[i.BLEND_MODES.DIFFERENCE] = "source-over", this.blendModes[i.BLEND_MODES.EXCLUSION] = "source-over", this.blendModes[i.BLEND_MODES.HUE] = "source-over", this.blendModes[i.BLEND_MODES.SATURATION] = "source-over", this.blendModes[i.BLEND_MODES.COLOR] = "source-over", this.blendModes[i.BLEND_MODES.LUMINOSITY] = "source-over"))
            }
        }, {
            "../../const": 23,
            "../../math": 33,
            "../../utils": 77,
            "../SystemRenderer": 43,
            "./utils/CanvasMaskManager": 47
        }],
        45: [function (a, b, c) {
            function d(a, b) {
                this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = a, this.canvas.height = b
            }

            d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                width: {
                    get: function () {
                        return this.canvas.width
                    }, set: function (a) {
                        this.canvas.width = a
                    }
                }, height: {
                    get: function () {
                        return this.canvas.height
                    }, set: function (a) {
                        this.canvas.height = a
                    }
                }
            }), d.prototype.clear = function () {
                this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            }, d.prototype.resize = function (a, b) {
                this.canvas.width = a, this.canvas.height = b
            }, d.prototype.destroy = function () {
                this.context = null, this.canvas = null
            }
        }, {}],
        46: [function (a, b, c) {
            var d = a("../../../const"), e = {};
            b.exports = e, e.renderGraphics = function (a, b) {
                var c = a.worldAlpha;
                a.dirty && (this.updateGraphicsTint(a), a.dirty = !1);
                for (var e = 0; e < a.graphicsData.length; e++) {
                    var f = a.graphicsData[e], g = f.shape, h = f._fillTint, i = f._lineTint;
                    if (b.lineWidth = f.lineWidth, f.type === d.SHAPES.POLY) {
                        b.beginPath();
                        var j = g.points;
                        b.moveTo(j[0], j[1]);
                        for (var k = 1; k < j.length / 2; k++) b.lineTo(j[2 * k], j[2 * k + 1]);
                        g.closed && b.lineTo(j[0], j[1]), j[0] === j[j.length - 2] && j[1] === j[j.length - 1] && b.closePath(), f.fill && (b.globalAlpha = f.fillAlpha * c, b.fillStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6), b.fill()), f.lineWidth && (b.globalAlpha = f.lineAlpha * c, b.strokeStyle = "#" + ("00000" + (0 | i).toString(16)).substr(-6), b.stroke())
                    } else if (f.type === d.SHAPES.RECT) (f.fillColor || 0 === f.fillColor) && (b.globalAlpha = f.fillAlpha * c, b.fillStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6), b.fillRect(g.x, g.y, g.width, g.height)), f.lineWidth && (b.globalAlpha = f.lineAlpha * c, b.strokeStyle = "#" + ("00000" + (0 | i).toString(16)).substr(-6), b.strokeRect(g.x, g.y, g.width, g.height)); else if (f.type === d.SHAPES.CIRC) b.beginPath(), b.arc(g.x, g.y, g.radius, 0, 2 * Math.PI), b.closePath(), f.fill && (b.globalAlpha = f.fillAlpha * c, b.fillStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6), b.fill()), f.lineWidth && (b.globalAlpha = f.lineAlpha * c, b.strokeStyle = "#" + ("00000" + (0 | i).toString(16)).substr(-6), b.stroke()); else if (f.type === d.SHAPES.ELIP) {
                        var l = 2 * g.width, m = 2 * g.height, n = g.x - l / 2, o = g.y - m / 2;
                        b.beginPath();
                        var p = .5522848, q = l / 2 * p, r = m / 2 * p, s = n + l, t = o + m, u = n + l / 2,
                            v = o + m / 2;
                        b.moveTo(n, v), b.bezierCurveTo(n, v - r, u - q, o, u, o), b.bezierCurveTo(u + q, o, s, v - r, s, v), b.bezierCurveTo(s, v + r, u + q, t, u, t), b.bezierCurveTo(u - q, t, n, v + r, n, v), b.closePath(), f.fill && (b.globalAlpha = f.fillAlpha * c, b.fillStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6), b.fill()), f.lineWidth && (b.globalAlpha = f.lineAlpha * c, b.strokeStyle = "#" + ("00000" + (0 | i).toString(16)).substr(-6), b.stroke())
                    } else if (f.type === d.SHAPES.RREC) {
                        var w = g.x, x = g.y, y = g.width, z = g.height, A = g.radius, B = Math.min(y, z) / 2 | 0;
                        A = A > B ? B : A, b.beginPath(), b.moveTo(w, x + A), b.lineTo(w, x + z - A), b.quadraticCurveTo(w, x + z, w + A, x + z), b.lineTo(w + y - A, x + z), b.quadraticCurveTo(w + y, x + z, w + y, x + z - A), b.lineTo(w + y, x + A), b.quadraticCurveTo(w + y, x, w + y - A, x), b.lineTo(w + A, x), b.quadraticCurveTo(w, x, w, x + A), b.closePath(), (f.fillColor || 0 === f.fillColor) && (b.globalAlpha = f.fillAlpha * c, b.fillStyle = "#" + ("00000" + (0 | h).toString(16)).substr(-6), b.fill()), f.lineWidth && (b.globalAlpha = f.lineAlpha * c, b.strokeStyle = "#" + ("00000" + (0 | i).toString(16)).substr(-6), b.stroke())
                    }
                }
            }, e.renderGraphicsMask = function (a, b) {
                var c = a.graphicsData.length;
                if (0 !== c) {
                    b.beginPath();
                    for (var e = 0; c > e; e++) {
                        var f = a.graphicsData[e], g = f.shape;
                        if (f.type === d.SHAPES.POLY) {
                            var h = g.points;
                            b.moveTo(h[0], h[1]);
                            for (var i = 1; i < h.length / 2; i++) b.lineTo(h[2 * i], h[2 * i + 1]);
                            h[0] === h[h.length - 2] && h[1] === h[h.length - 1] && b.closePath()
                        } else if (f.type === d.SHAPES.RECT) b.rect(g.x, g.y, g.width, g.height), b.closePath(); else if (f.type === d.SHAPES.CIRC) b.arc(g.x, g.y, g.radius, 0, 2 * Math.PI), b.closePath(); else if (f.type === d.SHAPES.ELIP) {
                            var j = 2 * g.width, k = 2 * g.height, l = g.x - j / 2, m = g.y - k / 2, n = .5522848,
                                o = j / 2 * n, p = k / 2 * n, q = l + j, r = m + k, s = l + j / 2, t = m + k / 2;
                            b.moveTo(l, t), b.bezierCurveTo(l, t - p, s - o, m, s, m), b.bezierCurveTo(s + o, m, q, t - p, q, t), b.bezierCurveTo(q, t + p, s + o, r, s, r), b.bezierCurveTo(s - o, r, l, t + p, l, t), b.closePath()
                        } else if (f.type === d.SHAPES.RREC) {
                            var u = g.x, v = g.y, w = g.width, x = g.height, y = g.radius, z = Math.min(w, x) / 2 | 0;
                            y = y > z ? z : y, b.moveTo(u, v + y), b.lineTo(u, v + x - y), b.quadraticCurveTo(u, v + x, u + y, v + x), b.lineTo(u + w - y, v + x), b.quadraticCurveTo(u + w, v + x, u + w, v + x - y), b.lineTo(u + w, v + y), b.quadraticCurveTo(u + w, v, u + w - y, v), b.lineTo(u + y, v), b.quadraticCurveTo(u, v, u, v + y), b.closePath()
                        }
                    }
                }
            }, e.updateGraphicsTint = function (a) {
                if (16777215 !== a.tint || a._prevTint !== a.tint) {
                    a._prevTint = a.tint;
                    for (var b = (a.tint >> 16 & 255) / 255, c = (a.tint >> 8 & 255) / 255, d = (255 & a.tint) / 255, e = 0; e < a.graphicsData.length; e++) {
                        var f = a.graphicsData[e], g = 0 | f.fillColor, h = 0 | f.lineColor;
                        f._fillTint = ((g >> 16 & 255) / 255 * b * 255 << 16) + ((g >> 8 & 255) / 255 * c * 255 << 8) + (255 & g) / 255 * d * 255, f._lineTint = ((h >> 16 & 255) / 255 * b * 255 << 16) + ((h >> 8 & 255) / 255 * c * 255 << 8) + (255 & h) / 255 * d * 255
                    }
                }
            }
        }, {"../../../const": 23}],
        47: [function (a, b, c) {
            function d() {
            }

            var e = a("./CanvasGraphics");
            d.prototype.constructor = d, b.exports = d, d.prototype.pushMask = function (a, b) {
                b.context.save();
                var c = a.alpha, d = a.worldTransform, f = b.resolution;
                b.context.setTransform(d.a * f, d.b * f, d.c * f, d.d * f, d.tx * f, d.ty * f), a.texture || (e.renderGraphicsMask(a, b.context), b.context.clip()), a.worldAlpha = c
            }, d.prototype.popMask = function (a) {
                a.context.restore()
            }, d.prototype.destroy = function () {
            }
        }, {"./CanvasGraphics": 46}],
        48: [function (a, b, c) {
            var d = a("../../../utils"), e = {};
            b.exports = e, e.getTintedTexture = function (a, b) {
                var c = a.texture;
                b = e.roundColor(b);
                var d = "#" + ("00000" + (0 | b).toString(16)).substr(-6);
                if (c.tintCache = c.tintCache || {}, c.tintCache[d]) return c.tintCache[d];
                var f = e.canvas || document.createElement("canvas");
                if (e.tintMethod(c, b, f), e.convertTintToImage) {
                    var g = new Image;
                    g.src = f.toDataURL(), c.tintCache[d] = g
                } else c.tintCache[d] = f, e.canvas = null;
                return f
            }, e.tintWithMultiply = function (a, b, c) {
                var d = c.getContext("2d"), e = a.baseTexture.resolution, f = a.crop.clone();
                f.x *= e, f.y *= e, f.width *= e, f.height *= e, c.width = f.width, c.height = f.height, d.fillStyle = "#" + ("00000" + (0 | b).toString(16)).substr(-6), d.fillRect(0, 0, f.width, f.height), d.globalCompositeOperation = "multiply", d.drawImage(a.baseTexture.source, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height), d.globalCompositeOperation = "destination-atop", d.drawImage(a.baseTexture.source, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height)
            }, e.tintWithOverlay = function (a, b, c) {
                var d = c.getContext("2d"), e = a.baseTexture.resolution, f = a.crop.clone();
                f.x *= e, f.y *= e, f.width *= e, f.height *= e, c.width = f.width, c.height = f.height, d.globalCompositeOperation = "copy", d.fillStyle = "#" + ("00000" + (0 | b).toString(16)).substr(-6), d.fillRect(0, 0, f.width, f.height), d.globalCompositeOperation = "destination-atop", d.drawImage(a.baseTexture.source, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height)
            }, e.tintWithPerPixel = function (a, b, c) {
                var e = c.getContext("2d"), f = a.baseTexture.resolution, g = a.crop.clone();
                g.x *= f, g.y *= f, g.width *= f, g.height *= f, c.width = g.width, c.height = g.height, e.globalCompositeOperation = "copy", e.drawImage(a.baseTexture.source, g.x, g.y, g.width, g.height, 0, 0, g.width, g.height);
                for (var h = d.hex2rgb(b), i = h[0], j = h[1], k = h[2], l = e.getImageData(0, 0, g.width, g.height), m = l.data, n = 0; n < m.length; n += 4) m[n + 0] *= i, m[n + 1] *= j, m[n + 2] *= k;
                e.putImageData(l, 0, 0)
            }, e.roundColor = function (a) {
                var b = e.cacheStepsPerColorChannel, c = d.hex2rgb(a);
                return c[0] = Math.min(255, c[0] / b * b), c[1] = Math.min(255, c[1] / b * b), c[2] = Math.min(255, c[2] / b * b), d.rgb2hex(c)
            }, e.cacheStepsPerColorChannel = 8, e.convertTintToImage = !1, e.canUseMultiply = d.canUseNewCanvasBlendModes(), e.tintMethod = e.canUseMultiply ? e.tintWithMultiply : e.tintWithPerPixel
        }, {"../../../utils": 77}],
        49: [function (a, b, c) {
            function d(a, b, c) {
                c = c || {}, e.call(this, "WebGL", a, b, c), this.type = o.RENDERER_TYPE.WEBGL, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), this.view.addEventListener("webglcontextlost", this.handleContextLost, !1), this.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1), this._useFXAA = !!c.forceFXAA && c.antialias, this._FXAAFilter = null, this._contextOptions = {
                    alpha: this.transparent,
                    antialias: c.antialias,
                    premultipliedAlpha: this.transparent && "notMultiplied" !== this.transparent,
                    stencil: !0,
                    preserveDrawingBuffer: c.preserveDrawingBuffer
                }, this.drawCount = 0, this.shaderManager = new f(this), this.maskManager = new g(this), this.stencilManager = new h(this), this.filterManager = new i(this), this.blendModeManager = new j(this), this.currentRenderTarget = null, this.currentRenderer = new l(this), this.initPlugins(), this._createContext(), this._initContext(), this._mapGlModes(), this._managedTextures = [], this._renderTargetStack = []
            }

            var e = a("../SystemRenderer"), f = a("./managers/ShaderManager"), g = a("./managers/MaskManager"),
                h = a("./managers/StencilManager"), i = a("./managers/FilterManager"),
                j = a("./managers/BlendModeManager"), k = a("./utils/RenderTarget"), l = a("./utils/ObjectRenderer"),
                m = a("./filters/FXAAFilter"), n = a("../../utils"), o = a("../../const");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, n.pluginTarget.mixin(d), d.glContextId = 0, d.prototype._createContext = function () {
                var a = this.view.getContext("webgl", this._contextOptions) || this.view.getContext("experimental-webgl", this._contextOptions);
                if (this.gl = a, !a) throw new Error("This browser does not support webGL. Try using the canvas renderer");
                this.glContextId = d.glContextId++, a.id = this.glContextId, a.renderer = this
            }, d.prototype._initContext = function () {
                var a = this.gl;
                a.disable(a.DEPTH_TEST), a.disable(a.CULL_FACE), a.enable(a.BLEND), this.renderTarget = new k(a, this.width, this.height, null, this.resolution, (!0)), this.setRenderTarget(this.renderTarget), this.emit("context", a), this.resize(this.width, this.height), this._useFXAA || (this._useFXAA = this._contextOptions.antialias && !a.getContextAttributes().antialias), this._useFXAA && (window.console.warn("FXAA antialiasing being used instead of native antialiasing"), this._FXAAFilter = [new m])
            }, d.prototype.render = function (a) {
                if (this.emit("prerender"), !this.gl.isContextLost()) {
                    this.drawCount = 0, this._lastObjectRendered = a, this._useFXAA && (this._FXAAFilter[0].uniforms.resolution.value.x = this.width, this._FXAAFilter[0].uniforms.resolution.value.y = this.height, a.filterArea = this.renderTarget.size, a.filters = this._FXAAFilter);
                    var b = a.parent;
                    a.parent = this._tempDisplayObjectParent, a.updateTransform(), a.parent = b;
                    var c = this.gl;
                    this.setRenderTarget(this.renderTarget), this.clearBeforeRender && (this.transparent ? c.clearColor(0, 0, 0, 0) : c.clearColor(this._backgroundColorRgb[0], this._backgroundColorRgb[1], this._backgroundColorRgb[2], 1), c.clear(c.COLOR_BUFFER_BIT)), this.renderDisplayObject(a, this.renderTarget), this.emit("postrender")
                }
            }, d.prototype.renderDisplayObject = function (a, b, c) {
                this.setRenderTarget(b), c && b.clear(), this.filterManager.setFilterStack(b.filterStack), a.renderWebGL(this), this.currentRenderer.flush()
            }, d.prototype.setObjectRenderer = function (a) {
                this.currentRenderer !== a && (this.currentRenderer.stop(), this.currentRenderer = a, this.currentRenderer.start())
            }, d.prototype.setRenderTarget = function (a) {
                this.currentRenderTarget !== a && (this.currentRenderTarget = a, this.currentRenderTarget.activate(), this.stencilManager.setMaskStack(a.stencilMaskStack))
            }, d.prototype.resize = function (a, b) {
                e.prototype.resize.call(this, a, b), this.filterManager.resize(a, b), this.renderTarget.resize(a, b), this.currentRenderTarget === this.renderTarget && (this.renderTarget.activate(), this.gl.viewport(0, 0, this.width, this.height))
            }, d.prototype.updateTexture = function (a) {
                if (a = a.baseTexture || a, a.hasLoaded) {
                    var b = this.gl;
                    return a._glTextures[b.id] || (a._glTextures[b.id] = b.createTexture(), a.on("update", this.updateTexture, this), a.on("dispose", this.destroyTexture, this), this._managedTextures.push(a)), b.bindTexture(b.TEXTURE_2D, a._glTextures[b.id]), b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultipliedAlpha), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a.source), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, a.scaleMode === o.SCALE_MODES.LINEAR ? b.LINEAR : b.NEAREST), a.mipmap && a.isPowerOfTwo ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a.scaleMode === o.SCALE_MODES.LINEAR ? b.LINEAR_MIPMAP_LINEAR : b.NEAREST_MIPMAP_NEAREST), b.generateMipmap(b.TEXTURE_2D)) : b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a.scaleMode === o.SCALE_MODES.LINEAR ? b.LINEAR : b.NEAREST), a.isPowerOfTwo ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.REPEAT), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.REPEAT)) : (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE)), a._glTextures[b.id]
                }
            }, d.prototype.destroyTexture = function (a, b) {
                if (a = a.baseTexture || a, a.hasLoaded && a._glTextures[this.gl.id] && (this.gl.deleteTexture(a._glTextures[this.gl.id]), delete a._glTextures[this.gl.id], !b)) {
                    var c = this._managedTextures.indexOf(a);
                    -1 !== c && n.removeItems(this._managedTextures, c, 1)
                }
            }, d.prototype.handleContextLost = function (a) {
                a.preventDefault()
            }, d.prototype.handleContextRestored = function () {
                this._initContext();
                for (var a = 0; a < this._managedTextures.length; ++a) {
                    var b = this._managedTextures[a];
                    b._glTextures[this.gl.id] && delete b._glTextures[this.gl.id]
                }
            }, d.prototype.destroy = function (a) {
                this.destroyPlugins(), this.view.removeEventListener("webglcontextlost", this.handleContextLost), this.view.removeEventListener("webglcontextrestored", this.handleContextRestored);
                for (var b = 0; b < this._managedTextures.length; ++b) {
                    var c = this._managedTextures[b];
                    this.destroyTexture(c, !0), c.off("update", this.updateTexture, this), c.off("dispose", this.destroyTexture, this)
                }
                e.prototype.destroy.call(this, a), this.uid = 0, this.shaderManager.destroy(), this.maskManager.destroy(), this.stencilManager.destroy(), this.filterManager.destroy(), this.blendModeManager.destroy(), this.shaderManager = null, this.maskManager = null, this.filterManager = null, this.blendModeManager = null, this.currentRenderer = null, this.handleContextLost = null, this.handleContextRestored = null, this._contextOptions = null, this._managedTextures = null, this.drawCount = 0, this.gl.useProgram(null), this.gl = null
            }, d.prototype._mapGlModes = function () {
                var a = this.gl;
                this.blendModes || (this.blendModes = {}, this.blendModes[o.BLEND_MODES.NORMAL] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.ADD] = [a.SRC_ALPHA, a.DST_ALPHA], this.blendModes[o.BLEND_MODES.MULTIPLY] = [a.DST_COLOR, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.SCREEN] = [a.SRC_ALPHA, a.ONE], this.blendModes[o.BLEND_MODES.OVERLAY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.DARKEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.LIGHTEN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.COLOR_DODGE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.COLOR_BURN] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.HARD_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.SOFT_LIGHT] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.DIFFERENCE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.EXCLUSION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.HUE] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.SATURATION] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.COLOR] = [a.ONE, a.ONE_MINUS_SRC_ALPHA], this.blendModes[o.BLEND_MODES.LUMINOSITY] = [a.ONE, a.ONE_MINUS_SRC_ALPHA]), this.drawModes || (this.drawModes = {}, this.drawModes[o.DRAW_MODES.POINTS] = a.POINTS, this.drawModes[o.DRAW_MODES.LINES] = a.LINES, this.drawModes[o.DRAW_MODES.LINE_LOOP] = a.LINE_LOOP, this.drawModes[o.DRAW_MODES.LINE_STRIP] = a.LINE_STRIP, this.drawModes[o.DRAW_MODES.TRIANGLES] = a.TRIANGLES, this.drawModes[o.DRAW_MODES.TRIANGLE_STRIP] = a.TRIANGLE_STRIP, this.drawModes[o.DRAW_MODES.TRIANGLE_FAN] = a.TRIANGLE_FAN)
            }
        }, {
            "../../const": 23,
            "../../utils": 77,
            "../SystemRenderer": 43,
            "./filters/FXAAFilter": 51,
            "./managers/BlendModeManager": 53,
            "./managers/FilterManager": 54,
            "./managers/MaskManager": 55,
            "./managers/ShaderManager": 56,
            "./managers/StencilManager": 57,
            "./utils/ObjectRenderer": 63,
            "./utils/RenderTarget": 65
        }],
        50: [function (a, b, c) {
            function d(a, b, c) {
                this.shaders = [], this.padding = 0, this.uniforms = c || {}, this.vertexSrc = a || e.defaultVertexSrc, this.fragmentSrc = b || e.defaultFragmentSrc
            }

            var e = a("../shaders/TextureShader");
            d.prototype.constructor = d, b.exports = d, d.prototype.getShader = function (a) {
                var b = a.gl, c = this.shaders[b.id];
                return c || (c = new e(a.shaderManager, this.vertexSrc, this.fragmentSrc, this.uniforms, this.attributes), this.shaders[b.id] = c), c
            }, d.prototype.applyFilter = function (a, b, c, d) {
                var e = this.getShader(a);
                a.filterManager.applyFilter(e, b, c, d)
            }, d.prototype.syncUniform = function (a) {
                for (var b = 0, c = this.shaders.length; c > b; ++b) this.shaders[b].syncUniform(a)
            }
        }, {"../shaders/TextureShader": 62}],
        51: [function (a, b, c) {
            function d() {
                e.call(this, "\nprecision mediump float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform vec2 resolution;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n            out vec2 v_rgbNW, out vec2 v_rgbNE,\n            out vec2 v_rgbSW, out vec2 v_rgbSE,\n            out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n   vResolution = resolution;\n\n   //compute the texture coords and send them to varyings\n   texcoords(aTextureCoord * resolution, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n", 'precision lowp float;\n\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE,\n            vec2 v_rgbSW, vec2 v_rgbSE,\n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform sampler2D uSampler;\n\n\nvoid main(void){\n\n    gl_FragColor = fxaa(uSampler, vTextureCoord * vResolution, vResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n}\n', {
                    resolution: {type: "v2", value: {x: 1, y: 1}}
                })
            }

            var e = a("./AbstractFilter");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c) {
                var d = a.filterManager, e = this.getShader(a);
                d.applyFilter(e, b, c)
            }
        }, {"./AbstractFilter": 50}],
        52: [function (a, b, c) {
            function d(a) {
                var b = new f.Matrix;
                e.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    original *= (masky.r * masky.a * alpha * clip);\n    gl_FragColor = original;\n}\n", {
                    mask: {
                        type: "sampler2D",
                        value: a._texture
                    }, alpha: {type: "f", value: 1}, otherMatrix: {type: "mat3", value: b.toArray(!0)}
                }), this.maskSprite = a, this.maskMatrix = b
            }

            var e = a("./AbstractFilter"), f = a("../../../math");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c) {
                var d = a.filterManager;
                this.uniforms.mask.value = this.maskSprite._texture, d.calculateMappedMatrix(b.frame, this.maskSprite, this.maskMatrix), this.uniforms.otherMatrix.value = this.maskMatrix.toArray(!0), this.uniforms.alpha.value = this.maskSprite.worldAlpha;
                var e = this.getShader(a);
                d.applyFilter(e, b, c)
            }, Object.defineProperties(d.prototype, {
                map: {
                    get: function () {
                        return this.uniforms.mask.value
                    }, set: function (a) {
                        this.uniforms.mask.value = a
                    }
                }, offset: {
                    get: function () {
                        return this.uniforms.offset.value
                    }, set: function (a) {
                        this.uniforms.offset.value = a
                    }
                }
            })
        }, {"../../../math": 33, "./AbstractFilter": 50}],
        53: [function (a, b, c) {
            function d(a) {
                e.call(this, a), this.currentBlendMode = 99999
            }

            var e = a("./WebGLManager");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.setBlendMode = function (a) {
                if (this.currentBlendMode === a) return !1;
                this.currentBlendMode = a;
                var b = this.renderer.blendModes[this.currentBlendMode];
                return this.renderer.gl.blendFunc(b[0], b[1]), !0
            }
        }, {"./WebGLManager": 58}],
        54: [function (a, b, c) {
            function d(a) {
                e.call(this, a), this.filterStack = [], this.filterStack.push({
                    renderTarget: a.currentRenderTarget,
                    filter: [],
                    bounds: null
                }), this.texturePool = [], this.textureSize = new i.Rectangle(0, 0, a.width, a.height), this.currentFrame = null
            }

            var e = a("./WebGLManager"), f = a("../utils/RenderTarget"), g = a("../../../const"),
                h = a("../utils/Quad"), i = a("../../../math");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.onContextChange = function () {
                this.texturePool.length = 0;
                var a = this.renderer.gl;
                this.quad = new h(a)
            }, d.prototype.setFilterStack = function (a) {
                this.filterStack = a
            }, d.prototype.pushFilter = function (a, b) {
                var c = a.filterArea ? a.filterArea.clone() : a.getBounds();
                c.x = 0 | c.x, c.y = 0 | c.y, c.width = 0 | c.width, c.height = 0 | c.height;
                var d = 0 | b[0].padding;
                if (c.x -= d, c.y -= d, c.width += 2 * d, c.height += 2 * d, this.renderer.currentRenderTarget.transform) {
                    var e = this.renderer.currentRenderTarget.transform;
                    c.x += e.tx, c.y += e.ty, this.capFilterArea(c), c.x -= e.tx, c.y -= e.ty
                } else this.capFilterArea(c);
                if (c.width > 0 && c.height > 0) {
                    this.currentFrame = c;
                    var f = this.getRenderTarget();
                    this.renderer.setRenderTarget(f), f.clear(), this.filterStack.push({renderTarget: f, filter: b})
                } else this.filterStack.push({renderTarget: null, filter: b})
            }, d.prototype.popFilter = function () {
                var a = this.filterStack.pop(), b = this.filterStack[this.filterStack.length - 1], c = a.renderTarget;
                if (a.renderTarget) {
                    var d = b.renderTarget, e = this.renderer.gl;
                    this.currentFrame = c.frame, this.quad.map(this.textureSize, c.frame), e.bindBuffer(e.ARRAY_BUFFER, this.quad.vertexBuffer), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.quad.indexBuffer);
                    var f = a.filter;
                    if (e.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aVertexPosition, 2, e.FLOAT, !1, 0, 0), e.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aTextureCoord, 2, e.FLOAT, !1, 0, 32), e.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aColor, 4, e.FLOAT, !1, 0, 64), this.renderer.blendModeManager.setBlendMode(g.BLEND_MODES.NORMAL), 1 === f.length) f[0].uniforms.dimensions && (f[0].uniforms.dimensions.value[0] = this.renderer.width, f[0].uniforms.dimensions.value[1] = this.renderer.height, f[0].uniforms.dimensions.value[2] = this.quad.vertices[0], f[0].uniforms.dimensions.value[3] = this.quad.vertices[5]), f[0].applyFilter(this.renderer, c, d), this.returnRenderTarget(c); else {
                        for (var h = c, i = this.getRenderTarget(!0), j = 0; j < f.length - 1; j++) {
                            var k = f[j];
                            k.uniforms.dimensions && (k.uniforms.dimensions.value[0] = this.renderer.width, k.uniforms.dimensions.value[1] = this.renderer.height, k.uniforms.dimensions.value[2] = this.quad.vertices[0], k.uniforms.dimensions.value[3] = this.quad.vertices[5]), k.applyFilter(this.renderer, h, i);
                            var l = h;
                            h = i, i = l
                        }
                        f[f.length - 1].applyFilter(this.renderer, h, d), this.returnRenderTarget(h), this.returnRenderTarget(i)
                    }
                    return a.filter
                }
            }, d.prototype.getRenderTarget = function (a) {
                var b = this.texturePool.pop() || new f(this.renderer.gl, this.textureSize.width, this.textureSize.height, g.SCALE_MODES.LINEAR, this.renderer.resolution * g.FILTER_RESOLUTION);
                return b.frame = this.currentFrame, a && b.clear(!0), b
            }, d.prototype.returnRenderTarget = function (a) {
                this.texturePool.push(a)
            }, d.prototype.applyFilter = function (a, b, c, d) {
                var e = this.renderer.gl;
                this.renderer.setRenderTarget(c), d && c.clear(), this.renderer.shaderManager.setShader(a), a.uniforms.projectionMatrix.value = this.renderer.currentRenderTarget.projectionMatrix.toArray(!0), a.syncUniforms(), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, b.texture), e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0), this.renderer.drawCount++
            }, d.prototype.calculateMappedMatrix = function (a, b, c) {
                var d = b.worldTransform.copy(i.Matrix.TEMP_MATRIX), e = b._texture.baseTexture, f = c.identity(),
                    g = this.textureSize.height / this.textureSize.width;
                f.translate(a.x / this.textureSize.width, a.y / this.textureSize.height), f.scale(1, g);
                var h = this.textureSize.width / e.width, j = this.textureSize.height / e.height;
                return d.tx /= e.width * h, d.ty /= e.width * h, d.invert(), f.prepend(d), f.scale(1, 1 / g), f.scale(h, j), f.translate(b.anchor.x, b.anchor.y), f
            }, d.prototype.capFilterArea = function (a) {
                a.x < 0 && (a.width += a.x, a.x = 0), a.y < 0 && (a.height += a.y, a.y = 0), a.x + a.width > this.textureSize.width && (a.width = this.textureSize.width - a.x), a.y + a.height > this.textureSize.height && (a.height = this.textureSize.height - a.y)
            }, d.prototype.resize = function (a, b) {
                this.textureSize.width = a, this.textureSize.height = b;
                for (var c = 0; c < this.texturePool.length; c++) this.texturePool[c].resize(a, b)
            }, d.prototype.destroy = function () {
                this.quad.destroy(), e.prototype.destroy.call(this), this.filterStack = null, this.offsetY = 0;
                for (var a = 0; a < this.texturePool.length; a++) this.texturePool[a].destroy();
                this.texturePool = null
            }
        }, {
            "../../../const": 23,
            "../../../math": 33,
            "../utils/Quad": 64,
            "../utils/RenderTarget": 65,
            "./WebGLManager": 58
        }],
        55: [function (a, b, c) {
            function d(a) {
                e.call(this, a), this.stencilStack = [], this.reverse = !0, this.count = 0, this.alphaMaskPool = []
            }

            var e = a("./WebGLManager"), f = a("../filters/SpriteMaskFilter");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.pushMask = function (a, b) {
                b.texture ? this.pushSpriteMask(a, b) : this.pushStencilMask(a, b)
            }, d.prototype.popMask = function (a, b) {
                b.texture ? this.popSpriteMask(a, b) : this.popStencilMask(a, b)
            }, d.prototype.pushSpriteMask = function (a, b) {
                var c = this.alphaMaskPool.pop();
                c || (c = [new f(b)]), c[0].maskSprite = b, this.renderer.filterManager.pushFilter(a, c)
            }, d.prototype.popSpriteMask = function () {
                var a = this.renderer.filterManager.popFilter();
                this.alphaMaskPool.push(a)
            }, d.prototype.pushStencilMask = function (a, b) {
                this.renderer.stencilManager.pushMask(b)
            }, d.prototype.popStencilMask = function (a, b) {
                this.renderer.stencilManager.popMask(b)
            }
        }, {"../filters/SpriteMaskFilter": 52, "./WebGLManager": 58}],
        56: [function (a, b, c) {
            function d(a) {
                e.call(this, a), this.maxAttibs = 10, this.attribState = [], this.tempAttribState = [];
                for (var b = 0; b < this.maxAttibs; b++) this.attribState[b] = !1;
                this.stack = [], this._currentId = -1, this.currentShader = null
            }

            var e = a("./WebGLManager"), f = a("../shaders/TextureShader"), g = a("../shaders/ComplexPrimitiveShader"),
                h = a("../shaders/PrimitiveShader"), i = a("../../../utils");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, i.pluginTarget.mixin(d), b.exports = d, d.prototype.onContextChange = function () {
                this.initPlugins();
                var a = this.renderer.gl;
                this.maxAttibs = a.getParameter(a.MAX_VERTEX_ATTRIBS), this.attribState = [];
                for (var b = 0; b < this.maxAttibs; b++) this.attribState[b] = !1;
                this.defaultShader = new f(this), this.primitiveShader = new h(this), this.complexPrimitiveShader = new g(this)
            }, d.prototype.setAttribs = function (a) {
                var b;
                for (b = 0; b < this.tempAttribState.length; b++) this.tempAttribState[b] = !1;
                for (var c in a) this.tempAttribState[a[c]] = !0;
                var d = this.renderer.gl;
                for (b = 0; b < this.attribState.length; b++) this.attribState[b] !== this.tempAttribState[b] && (this.attribState[b] = this.tempAttribState[b], this.attribState[b] ? d.enableVertexAttribArray(b) : d.disableVertexAttribArray(b))
            }, d.prototype.setShader = function (a) {
                return this._currentId !== a.uid && (this._currentId = a.uid, this.currentShader = a, this.renderer.gl.useProgram(a.program), this.setAttribs(a.attributes), !0)
            }, d.prototype.destroy = function () {
                this.primitiveShader.destroy(), this.complexPrimitiveShader.destroy(), e.prototype.destroy.call(this), this.destroyPlugins(), this.attribState = null, this.tempAttribState = null
            }
        }, {
            "../../../utils": 77,
            "../shaders/ComplexPrimitiveShader": 59,
            "../shaders/PrimitiveShader": 60,
            "../shaders/TextureShader": 62,
            "./WebGLManager": 58
        }],
        57: [function (a, b, c) {
            function d(a) {
                e.call(this, a), this.stencilMaskStack = null
            }

            var e = a("./WebGLManager"), f = a("../../../utils");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.setMaskStack = function (a) {
                this.stencilMaskStack = a;
                var b = this.renderer.gl;
                0 === a.stencilStack.length ? b.disable(b.STENCIL_TEST) : b.enable(b.STENCIL_TEST)
            }, d.prototype.pushStencil = function (a, b) {
                this.renderer.currentRenderTarget.attachStencilBuffer();
                var c = this.renderer.gl, d = this.stencilMaskStack;
                this.bindGraphics(a, b), 0 === d.stencilStack.length && (c.enable(c.STENCIL_TEST), c.clear(c.STENCIL_BUFFER_BIT), d.reverse = !0, d.count = 0), d.stencilStack.push(b);
                var e = d.count;
                c.colorMask(!1, !1, !1, !1), c.stencilFunc(c.ALWAYS, 0, 255), c.stencilOp(c.KEEP, c.KEEP, c.INVERT), 1 === b.mode ? (c.drawElements(c.TRIANGLE_FAN, b.indices.length - 4, c.UNSIGNED_SHORT, 0), d.reverse ? (c.stencilFunc(c.EQUAL, 255 - e, 255), c.stencilOp(c.KEEP, c.KEEP, c.DECR)) : (c.stencilFunc(c.EQUAL, e, 255), c.stencilOp(c.KEEP, c.KEEP, c.INCR)), c.drawElements(c.TRIANGLE_FAN, 4, c.UNSIGNED_SHORT, 2 * (b.indices.length - 4)), d.reverse ? c.stencilFunc(c.EQUAL, 255 - (e + 1), 255) : c.stencilFunc(c.EQUAL, e + 1, 255), d.reverse = !d.reverse) : (d.reverse ? (c.stencilFunc(c.EQUAL, e, 255), c.stencilOp(c.KEEP, c.KEEP, c.INCR)) : (c.stencilFunc(c.EQUAL, 255 - e, 255), c.stencilOp(c.KEEP, c.KEEP, c.DECR)), c.drawElements(c.TRIANGLE_STRIP, b.indices.length, c.UNSIGNED_SHORT, 0), d.reverse ? c.stencilFunc(c.EQUAL, e + 1, 255) : c.stencilFunc(c.EQUAL, 255 - (e + 1), 255)), c.colorMask(!0, !0, !0, !0), c.stencilOp(c.KEEP, c.KEEP, c.KEEP), d.count++
            }, d.prototype.bindGraphics = function (a, b) {
                var c, d = this.renderer.gl;
                1 === b.mode ? (c = this.renderer.shaderManager.complexPrimitiveShader, this.renderer.shaderManager.setShader(c), d.uniformMatrix3fv(c.uniforms.translationMatrix._location, !1, a.worldTransform.toArray(!0)), d.uniformMatrix3fv(c.uniforms.projectionMatrix._location, !1, this.renderer.currentRenderTarget.projectionMatrix.toArray(!0)), d.uniform3fv(c.uniforms.tint._location, f.hex2rgb(a.tint)), d.uniform3fv(c.uniforms.color._location, b.color), d.uniform1f(c.uniforms.alpha._location, a.worldAlpha), d.bindBuffer(d.ARRAY_BUFFER, b.buffer), d.vertexAttribPointer(c.attributes.aVertexPosition, 2, d.FLOAT, !1, 8, 0), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, b.indexBuffer)) : (c = this.renderer.shaderManager.primitiveShader, this.renderer.shaderManager.setShader(c), d.uniformMatrix3fv(c.uniforms.translationMatrix._location, !1, a.worldTransform.toArray(!0)), d.uniformMatrix3fv(c.uniforms.projectionMatrix._location, !1, this.renderer.currentRenderTarget.projectionMatrix.toArray(!0)), d.uniform3fv(c.uniforms.tint._location, f.hex2rgb(a.tint)), d.uniform1f(c.uniforms.alpha._location, a.worldAlpha), d.bindBuffer(d.ARRAY_BUFFER, b.buffer), d.vertexAttribPointer(c.attributes.aVertexPosition, 2, d.FLOAT, !1, 24, 0), d.vertexAttribPointer(c.attributes.aColor, 4, d.FLOAT, !1, 24, 8), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, b.indexBuffer))
            }, d.prototype.popStencil = function (a, b) {
                var c = this.renderer.gl, d = this.stencilMaskStack;
                if (d.stencilStack.pop(), d.count--, 0 === d.stencilStack.length) c.disable(c.STENCIL_TEST); else {
                    var e = d.count;
                    this.bindGraphics(a, b), c.colorMask(!1, !1, !1, !1), 1 === b.mode ? (d.reverse = !d.reverse, d.reverse ? (c.stencilFunc(c.EQUAL, 255 - (e + 1), 255), c.stencilOp(c.KEEP, c.KEEP, c.INCR)) : (c.stencilFunc(c.EQUAL, e + 1, 255), c.stencilOp(c.KEEP, c.KEEP, c.DECR)), c.drawElements(c.TRIANGLE_FAN, 4, c.UNSIGNED_SHORT, 2 * (b.indices.length - 4)), c.stencilFunc(c.ALWAYS, 0, 255), c.stencilOp(c.KEEP, c.KEEP, c.INVERT), c.drawElements(c.TRIANGLE_FAN, b.indices.length - 4, c.UNSIGNED_SHORT, 0), this.renderer.drawCount += 2, d.reverse ? c.stencilFunc(c.EQUAL, e, 255) : c.stencilFunc(c.EQUAL, 255 - e, 255)) : (d.reverse ? (c.stencilFunc(c.EQUAL, e + 1, 255), c.stencilOp(c.KEEP, c.KEEP, c.DECR)) : (c.stencilFunc(c.EQUAL, 255 - (e + 1), 255), c.stencilOp(c.KEEP, c.KEEP, c.INCR)), c.drawElements(c.TRIANGLE_STRIP, b.indices.length, c.UNSIGNED_SHORT, 0), this.renderer.drawCount++, d.reverse ? c.stencilFunc(c.EQUAL, e, 255) : c.stencilFunc(c.EQUAL, 255 - e, 255)), c.colorMask(!0, !0, !0, !0), c.stencilOp(c.KEEP, c.KEEP, c.KEEP)
                }
            }, d.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.stencilMaskStack.stencilStack = null
            }, d.prototype.pushMask = function (a) {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics), a.dirty && this.renderer.plugins.graphics.updateGraphics(a, this.renderer.gl), a._webGL[this.renderer.gl.id].data.length && this.pushStencil(a, a._webGL[this.renderer.gl.id].data[0])
            }, d.prototype.popMask = function (a) {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics), this.popStencil(a, a._webGL[this.renderer.gl.id].data[0])
            }
        }, {"../../../utils": 77, "./WebGLManager": 58}],
        58: [function (a, b, c) {
            function d(a) {
                this.renderer = a, this.renderer.on("context", this.onContextChange, this)
            }

            d.prototype.constructor = d, b.exports = d, d.prototype.onContextChange = function () {
            }, d.prototype.destroy = function () {
                this.renderer.off("context", this.onContextChange, this), this.renderer = null
            }
        }, {}],
        59: [function (a, b, c) {
            function d(a) {
                e.call(this, a, ["attribute vec2 aVertexPosition;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform vec3 tint;", "uniform float alpha;", "uniform vec3 color;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = vec4(color * alpha * tint, alpha);", "}"].join("\n"), ["precision mediump float;", "varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n"), {
                    tint: {
                        type: "3f",
                        value: [0, 0, 0]
                    },
                    alpha: {type: "1f", value: 0},
                    color: {type: "3f", value: [0, 0, 0]},
                    translationMatrix: {type: "mat3", value: new Float32Array(9)},
                    projectionMatrix: {type: "mat3", value: new Float32Array(9)}
                }, {aVertexPosition: 0})
            }

            var e = a("./Shader");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d
        }, {"./Shader": 61}],
        60: [function (a, b, c) {
            function d(a) {
                e.call(this, a, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform float flipY;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["precision mediump float;", "varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n"), {
                    tint: {
                        type: "3f",
                        value: [0, 0, 0]
                    },
                    alpha: {type: "1f", value: 0},
                    translationMatrix: {type: "mat3", value: new Float32Array(9)},
                    projectionMatrix: {type: "mat3", value: new Float32Array(9)}
                }, {aVertexPosition: 0, aColor: 0})
            }

            var e = a("./Shader");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d
        }, {"./Shader": 61}],
        61: [function (a, b, c) {
            function d(a, b, c, d, f) {
                if (!b || !c) throw new Error("Pixi.js Error. Shader requires vertexSrc and fragmentSrc");
                this.uid = e.uid(), this.gl = a.renderer.gl, this.shaderManager = a, this.program = null, this.uniforms = d || {}, this.attributes = f || {}, this.textureCount = 1, this.vertexSrc = b, this.fragmentSrc = c, this.init()
            }

            var e = a("../../../utils");
            d.prototype.constructor = d, b.exports = d, d.prototype.init = function () {
                this.compile(), this.gl.useProgram(this.program), this.cacheUniformLocations(Object.keys(this.uniforms)), this.cacheAttributeLocations(Object.keys(this.attributes))
            }, d.prototype.cacheUniformLocations = function (a) {
                for (var b = 0; b < a.length; ++b) this.uniforms[a[b]]._location = this.gl.getUniformLocation(this.program, a[b])
            }, d.prototype.cacheAttributeLocations = function (a) {
                for (var b = 0; b < a.length; ++b) this.attributes[a[b]] = this.gl.getAttribLocation(this.program, a[b])
            }, d.prototype.compile = function () {
                var a = this.gl, b = this._glCompile(a.VERTEX_SHADER, this.vertexSrc),
                    c = this._glCompile(a.FRAGMENT_SHADER, this.fragmentSrc), d = a.createProgram();
                return a.attachShader(d, b), a.attachShader(d, c), a.linkProgram(d), a.getProgramParameter(d, a.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."), console.error("gl.VALIDATE_STATUS", a.getProgramParameter(d, a.VALIDATE_STATUS)), console.error("gl.getError()", a.getError()), "" !== a.getProgramInfoLog(d) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", a.getProgramInfoLog(d)), a.deleteProgram(d), d = null), a.deleteShader(b), a.deleteShader(c), this.program = d
            }, d.prototype.syncUniform = function (a) {
                var b, c, d = a._location, f = a.value, g = this.gl;
                switch (a.type) {
                    case"b":
                    case"bool":
                    case"boolean":
                        g.uniform1i(d, f ? 1 : 0);
                        break;
                    case"i":
                    case"1i":
                        g.uniform1i(d, f);
                        break;
                    case"f":
                    case"1f":
                        g.uniform1f(d, f);
                        break;
                    case"2f":
                        g.uniform2f(d, f[0], f[1]);
                        break;
                    case"3f":
                        g.uniform3f(d, f[0], f[1], f[2]);
                        break;
                    case"4f":
                        g.uniform4f(d, f[0], f[1], f[2], f[3]);
                        break;
                    case"v2":
                        g.uniform2f(d, f.x, f.y);
                        break;
                    case"v3":
                        g.uniform3f(d, f.x, f.y, f.z);
                        break;
                    case"v4":
                        g.uniform4f(d, f.x, f.y, f.z, f.w);
                        break;
                    case"1iv":
                        g.uniform1iv(d, f);
                        break;
                    case"2iv":
                        g.uniform2iv(d, f);
                        break;
                    case"3iv":
                        g.uniform3iv(d, f);
                        break;
                    case"4iv":
                        g.uniform4iv(d, f);
                        break;
                    case"1fv":
                        g.uniform1fv(d, f);
                        break;
                    case"2fv":
                        g.uniform2fv(d, f);
                        break;
                    case"3fv":
                        g.uniform3fv(d, f);
                        break;
                    case"4fv":
                        g.uniform4fv(d, f);
                        break;
                    case"m2":
                    case"mat2":
                    case"Matrix2fv":
                        g.uniformMatrix2fv(d, a.transpose, f);
                        break;
                    case"m3":
                    case"mat3":
                    case"Matrix3fv":
                        g.uniformMatrix3fv(d, a.transpose, f);
                        break;
                    case"m4":
                    case"mat4":
                    case"Matrix4fv":
                        g.uniformMatrix4fv(d, a.transpose, f);
                        break;
                    case"c":
                        "number" == typeof f && (f = e.hex2rgb(f)), g.uniform3f(d, f[0], f[1], f[2]);
                        break;
                    case"iv1":
                        g.uniform1iv(d, f);
                        break;
                    case"iv":
                        g.uniform3iv(d, f);
                        break;
                    case"fv1":
                        g.uniform1fv(d, f);
                        break;
                    case"fv":
                        g.uniform3fv(d, f);
                        break;
                    case"v2v":
                        for (a._array || (a._array = new Float32Array(2 * f.length)), b = 0, c = f.length; c > b; ++b) a._array[2 * b] = f[b].x, a._array[2 * b + 1] = f[b].y;
                        g.uniform2fv(d, a._array);
                        break;
                    case"v3v":
                        for (a._array || (a._array = new Float32Array(3 * f.length)), b = 0, c = f.length; c > b; ++b) a._array[3 * b] = f[b].x, a._array[3 * b + 1] = f[b].y, a._array[3 * b + 2] = f[b].z;
                        g.uniform3fv(d, a._array);
                        break;
                    case"v4v":
                        for (a._array || (a._array = new Float32Array(4 * f.length)), b = 0, c = f.length; c > b; ++b) a._array[4 * b] = f[b].x, a._array[4 * b + 1] = f[b].y, a._array[4 * b + 2] = f[b].z, a._array[4 * b + 3] = f[b].w;
                        g.uniform4fv(d, a._array);
                        break;
                    case"t":
                    case"sampler2D":
                        if (!a.value || !a.value.baseTexture.hasLoaded) break;
                        g.activeTexture(g["TEXTURE" + this.textureCount]);
                        var h = a.value.baseTexture._glTextures[g.id];
                        h || (this.initSampler2D(a), h = a.value.baseTexture._glTextures[g.id]), g.bindTexture(g.TEXTURE_2D, h), g.uniform1i(a._location, this.textureCount), this.textureCount++;
                        break;
                    default:
                        console.warn("Pixi.js Shader Warning: Unknown uniform type: " + a.type)
                }
            }, d.prototype.syncUniforms = function () {
                this.textureCount = 1;
                for (var a in this.uniforms) this.syncUniform(this.uniforms[a])
            }, d.prototype.initSampler2D = function (a) {
                var b = this.gl, c = a.value.baseTexture;
                if (c.hasLoaded) if (a.textureData) {
                    var d = a.textureData;
                    c._glTextures[b.id] = b.createTexture(), b.bindTexture(b.TEXTURE_2D, c._glTextures[b.id]), b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, c.premultipliedAlpha), b.texImage2D(b.TEXTURE_2D, 0, d.luminance ? b.LUMINANCE : b.RGBA, b.RGBA, b.UNSIGNED_BYTE, c.source), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, d.magFilter ? d.magFilter : b.LINEAR), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, d.wrapS ? d.wrapS : b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, d.wrapS ? d.wrapS : b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, d.wrapT ? d.wrapT : b.CLAMP_TO_EDGE)
                } else this.shaderManager.renderer.updateTexture(c)
            }, d.prototype.destroy = function () {
                this.gl.deleteProgram(this.program), this.gl = null, this.uniforms = null, this.attributes = null, this.vertexSrc = null, this.fragmentSrc = null
            }, d.prototype._glCompile = function (a, b) {
                var c = this.gl.createShader(a);
                return this.gl.shaderSource(c, b), this.gl.compileShader(c), this.gl.getShaderParameter(c, this.gl.COMPILE_STATUS) ? c : (console.log(this.gl.getShaderInfoLog(c)), null)
            }
        }, {"../../../utils": 77}],
        62: [function (a, b, c) {
            function d(a, b, c, f, g) {
                var h = {
                    uSampler: {type: "sampler2D", value: 0},
                    projectionMatrix: {type: "mat3", value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])}
                };
                if (f) for (var i in f) h[i] = f[i];
                var j = {aVertexPosition: 0, aTextureCoord: 0, aColor: 0};
                if (g) for (var k in g) j[k] = g[k];
                b = b || d.defaultVertexSrc, c = c || d.defaultFragmentSrc, e.call(this, a, b, c, h, j)
            }

            var e = a("./Shader");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.defaultVertexSrc = ["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", "}"].join("\n"), d.defaultFragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"].join("\n")
        }, {"./Shader": 61}],
        63: [function (a, b, c) {
            function d(a) {
                e.call(this, a)
            }

            var e = a("../managers/WebGLManager");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.start = function () {
            }, d.prototype.stop = function () {
                this.flush()
            }, d.prototype.flush = function () {
            }, d.prototype.render = function (a) {
            }
        }, {"../managers/WebGLManager": 58}],
        64: [function (a, b, c) {
            function d(a) {
                this.gl = a, this.vertices = new Float32Array([0, 0, 200, 0, 200, 200, 0, 200]), this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.colors = new Float32Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), this.indices = new Uint16Array([0, 1, 2, 0, 3, 2]), this.vertexBuffer = a.createBuffer(), this.indexBuffer = a.createBuffer(), a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer), a.bufferData(a.ARRAY_BUFFER, 128, a.DYNAMIC_DRAW), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer), a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW), this.upload()
            }

            d.prototype.constructor = d, d.prototype.map = function (a, b) {
                var c = 0, d = 0;
                this.uvs[0] = c, this.uvs[1] = d, this.uvs[2] = c + b.width / a.width, this.uvs[3] = d, this.uvs[4] = c + b.width / a.width, this.uvs[5] = d + b.height / a.height, this.uvs[6] = c, this.uvs[7] = d + b.height / a.height, c = b.x, d = b.y, this.vertices[0] = c, this.vertices[1] = d, this.vertices[2] = c + b.width, this.vertices[3] = d, this.vertices[4] = c + b.width, this.vertices[5] = d + b.height, this.vertices[6] = c, this.vertices[7] = d + b.height, this.upload()
            }, d.prototype.upload = function () {
                var a = this.gl;
                a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer), a.bufferSubData(a.ARRAY_BUFFER, 0, this.vertices), a.bufferSubData(a.ARRAY_BUFFER, 32, this.uvs), a.bufferSubData(a.ARRAY_BUFFER, 64, this.colors)
            }, d.prototype.destroy = function () {
                var a = this.gl;
                a.deleteBuffer(this.vertexBuffer), a.deleteBuffer(this.indexBuffer)
            }, b.exports = d
        }, {}],
        65: [function (a, b, c) {
            var d = a("../../../math"), e = a("../../../utils"), f = a("../../../const"), g = a("./StencilMaskStack"),
                h = function (a, b, c, h, i, j) {
                    if (this.gl = a, this.frameBuffer = null, this.texture = null, this.size = new d.Rectangle(0, 0, 1, 1), this.resolution = i || f.RESOLUTION, this.projectionMatrix = new d.Matrix, this.transform = null, this.frame = null, this.stencilBuffer = null, this.stencilMaskStack = new g, this.filterStack = [{
                            renderTarget: this,
                            filter: [],
                            bounds: this.size
                        }], this.scaleMode = h || f.SCALE_MODES.DEFAULT, this.root = j, !this.root) {
                        this.frameBuffer = a.createFramebuffer(), this.texture = a.createTexture(), a.bindTexture(a.TEXTURE_2D, this.texture), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, h === f.SCALE_MODES.LINEAR ? a.LINEAR : a.NEAREST), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, h === f.SCALE_MODES.LINEAR ? a.LINEAR : a.NEAREST);
                        var k = e.isPowerOfTwo(b, c);
                        k ? (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.REPEAT), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.REPEAT)) : (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE)), a.bindFramebuffer(a.FRAMEBUFFER, this.frameBuffer), a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.texture, 0)
                    }
                    this.resize(b, c)
                };
            h.prototype.constructor = h, b.exports = h, h.prototype.clear = function (a) {
                var b = this.gl;
                a && b.bindFramebuffer(b.FRAMEBUFFER, this.frameBuffer), b.clearColor(0, 0, 0, 0), b.clear(b.COLOR_BUFFER_BIT)
            }, h.prototype.attachStencilBuffer = function () {
                if (!this.stencilBuffer && !this.root) {
                    var a = this.gl;
                    this.stencilBuffer = a.createRenderbuffer(), a.bindRenderbuffer(a.RENDERBUFFER, this.stencilBuffer), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT, a.RENDERBUFFER, this.stencilBuffer), a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_STENCIL, this.size.width * this.resolution, this.size.height * this.resolution)
                }
            }, h.prototype.activate = function () {
                var a = this.gl;
                a.bindFramebuffer(a.FRAMEBUFFER, this.frameBuffer);
                var b = this.frame || this.size;
                this.calculateProjection(b), this.transform && this.projectionMatrix.append(this.transform), a.viewport(0, 0, b.width * this.resolution, b.height * this.resolution)
            }, h.prototype.calculateProjection = function (a) {
                var b = this.projectionMatrix;
                b.identity(), this.root ? (b.a = 1 / a.width * 2, b.d = -1 / a.height * 2, b.tx = -1 - a.x * b.a, b.ty = 1 - a.y * b.d) : (b.a = 1 / a.width * 2, b.d = 1 / a.height * 2, b.tx = -1 - a.x * b.a, b.ty = -1 - a.y * b.d)
            }, h.prototype.resize = function (a, b) {
                if (a = 0 | a, b = 0 | b, this.size.width !== a || this.size.height !== b) {
                    if (this.size.width = a, this.size.height = b, !this.root) {
                        var c = this.gl;
                        c.bindTexture(c.TEXTURE_2D, this.texture), c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, a * this.resolution, b * this.resolution, 0, c.RGBA, c.UNSIGNED_BYTE, null), this.stencilBuffer && (c.bindRenderbuffer(c.RENDERBUFFER, this.stencilBuffer), c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_STENCIL, a * this.resolution, b * this.resolution))
                    }
                    var d = this.frame || this.size;
                    this.calculateProjection(d)
                }
            }, h.prototype.destroy = function () {
                var a = this.gl;
                a.deleteRenderbuffer(this.stencilBuffer), a.deleteFramebuffer(this.frameBuffer), a.deleteTexture(this.texture), this.frameBuffer = null, this.texture = null
            }
        }, {"../../../const": 23, "../../../math": 33, "../../../utils": 77, "./StencilMaskStack": 66}],
        66: [function (a, b, c) {
            function d() {
                this.stencilStack = [], this.reverse = !0, this.count = 0
            }

            d.prototype.constructor = d, b.exports = d
        }, {}],
        67: [function (a, b, c) {
            function d(a) {
                g.call(this), this.anchor = new e.Point, this._texture = null, this._width = 0, this._height = 0, this.tint = 16777215, this.blendMode = j.BLEND_MODES.NORMAL, this.shader = null, this.cachedTint = 16777215, this.texture = a || f.EMPTY
            }

            var e = a("../math"), f = a("../textures/Texture"), g = a("../display/Container"),
                h = a("../renderers/canvas/utils/CanvasTinter"), i = a("../utils"), j = a("../const"), k = new e.Point;
            d.prototype = Object.create(g.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                width: {
                    get: function () {
                        return Math.abs(this.scale.x) * this.texture.width
                    }, set: function (a) {
                        var b = i.sign(this.scale.x) || 1;
                        this.scale.x = b * a / this.texture.width, this._width = a
                    }
                }, height: {
                    get: function () {
                        return Math.abs(this.scale.y) * this.texture.height
                    }, set: function (a) {
                        var b = i.sign(this.scale.y) || 1;
                        this.scale.y = b * a / this.texture.height, this._height = a
                    }
                }, texture: {
                    get: function () {
                        return this._texture
                    }, set: function (a) {
                        this._texture !== a && (this._texture = a, this.cachedTint = 16777215, a && (a.baseTexture.hasLoaded ? this._onTextureUpdate() : a.once("update", this._onTextureUpdate, this)))
                    }
                }
            }), d.prototype._onTextureUpdate = function () {
                this._width && (this.scale.x = i.sign(this.scale.x) * this._width / this.texture.width), this._height && (this.scale.y = i.sign(this.scale.y) * this._height / this.texture.height)
            }, d.prototype._renderWebGL = function (a) {
                a.setObjectRenderer(a.plugins.sprite), a.plugins.sprite.render(this)
            }, d.prototype.getBounds = function (a) {
                if (!this._currentBounds) {
                    var b, c, d, e, f = this._texture.width, g = this._texture.height, h = f * (1 - this.anchor.x),
                        i = f * -this.anchor.x, j = g * (1 - this.anchor.y), k = g * -this.anchor.y,
                        l = a || this.worldTransform, m = l.a, n = l.b, o = l.c, p = l.d, q = l.tx, r = l.ty,
                        s = m * i + o * k + q, t = p * k + n * i + r, u = m * h + o * k + q, v = p * k + n * h + r,
                        w = m * h + o * j + q, x = p * j + n * h + r, y = m * i + o * j + q, z = p * j + n * i + r;
                    if (b = s, b = b > u ? u : b, b = b > w ? w : b, b = b > y ? y : b, d = t, d = d > v ? v : d, d = d > x ? x : d, d = d > z ? z : d, c = s, c = u > c ? u : c, c = w > c ? w : c, c = y > c ? y : c, e = t, e = v > e ? v : e, e = x > e ? x : e, e = z > e ? z : e, this.children.length) {
                        var A = this.containerGetBounds();
                        h = A.x, i = A.x + A.width, j = A.y, k = A.y + A.height, b = h > b ? b : h, d = j > d ? d : j, c = c > i ? c : i, e = e > k ? e : k
                    }
                    var B = this._bounds;
                    B.x = b, B.width = c - b, B.y = d, B.height = e - d, this._currentBounds = B
                }
                return this._currentBounds
            }, d.prototype.getLocalBounds = function () {
                return this._bounds.x = -this._texture._frame.width * this.anchor.x, this._bounds.y = -this._texture._frame.height * this.anchor.y, this._bounds.width = this._texture._frame.width, this._bounds.height = this._texture._frame.height, this._bounds
            }, d.prototype.containsPoint = function (a) {
                this.worldTransform.applyInverse(a, k);
                var b, c = this._texture.width, d = this._texture.height, e = -c * this.anchor.x;
                return k.x > e && k.x < e + c && (b = -d * this.anchor.y, k.y > b && k.y < b + d)
            }, d.prototype._renderCanvas = function (a) {
                if (!(this.texture.crop.width <= 0 || this.texture.crop.height <= 0)) {
                    var b = a.blendModes[this.blendMode];
                    if (b !== a.context.globalCompositeOperation && (a.context.globalCompositeOperation = b), this.texture.valid) {
                        var c, d, e, f, g = this._texture, i = this.worldTransform;
                        a.context.globalAlpha = this.worldAlpha;
                        var k = g.baseTexture.scaleMode === j.SCALE_MODES.LINEAR;
                        if (a.smoothProperty && a.context[a.smoothProperty] !== k && (a.context[a.smoothProperty] = k), g.rotate) {
                            e = g.crop.height, f = g.crop.width, c = g.trim ? g.trim.y - this.anchor.y * g.trim.height : this.anchor.y * -g._frame.height, d = g.trim ? g.trim.x - this.anchor.x * g.trim.width : this.anchor.x * -g._frame.width, c += e, i.tx = d * i.a + c * i.c + i.tx, i.ty = d * i.b + c * i.d + i.ty;
                            var l = i.a;
                            i.a = -i.c, i.c = l, l = i.b, i.b = -i.d, i.d = l, c = 0, d = 0
                        } else e = g.crop.width, f = g.crop.height, c = g.trim ? g.trim.x - this.anchor.x * g.trim.width : this.anchor.x * -g._frame.width, d = g.trim ? g.trim.y - this.anchor.y * g.trim.height : this.anchor.y * -g._frame.height;
                        var m = g.baseTexture.resolution;
                        a.roundPixels ? (a.context.setTransform(i.a / m, i.b / m, i.c / m, i.d / m, i.tx * a.resolution | 0, i.ty * a.resolution | 0), c = 0 | c, d = 0 | d) : a.context.setTransform(i.a / m, i.b / m, i.c / m, i.d / m, i.tx * a.resolution, i.ty * a.resolution), 16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = h.getTintedTexture(this, this.tint)), a.context.drawImage(this.tintedTexture, 0, 0, e, f, c * a.resolution, d * a.resolution, e * a.resolution, f * a.resolution)) : a.context.drawImage(g.baseTexture.source, g.crop.x, g.crop.y, e, f, c * a.resolution, d * a.resolution, e * a.resolution, f * a.resolution)
                    }
                }
            }, d.prototype.destroy = function (a, b) {
                g.prototype.destroy.call(this), this.anchor = null, a && this._texture.destroy(b), this._texture = null, this.shader = null
            }, d.fromFrame = function (a) {
                var b = i.TextureCache[a];
                if (!b) throw new Error('The frameId "' + a + '" does not exist in the texture cache');
                return new d(b)
            }, d.fromImage = function (a, b, c) {
                return new d(f.fromImage(a, b, c))
            }
        }, {
            "../const": 23,
            "../display/Container": 24,
            "../math": 33,
            "../renderers/canvas/utils/CanvasTinter": 48,
            "../textures/Texture": 72,
            "../utils": 77
        }],
        68: [function (a, b, c) {
            function d(a) {
                e.call(this, a), this.vertSize = 5, this.vertByteSize = 4 * this.vertSize, this.size = g.SPRITE_BATCH_SIZE;
                var b = 4 * this.size * this.vertByteSize, c = 6 * this.size;
                this.vertices = new ArrayBuffer(b), this.positions = new Float32Array(this.vertices), this.colors = new Uint32Array(this.vertices), this.indices = new Uint16Array(c);
                for (var d = 0, f = 0; c > d; d += 6, f += 4) this.indices[d + 0] = f + 0, this.indices[d + 1] = f + 1, this.indices[d + 2] = f + 2, this.indices[d + 3] = f + 0, this.indices[d + 4] = f + 2, this.indices[d + 5] = f + 3;
                this.currentBatchSize = 0, this.sprites = [], this.shader = null
            }

            var e = a("../../renderers/webgl/utils/ObjectRenderer"), f = a("../../renderers/webgl/WebGLRenderer"),
                g = a("../../const");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, f.registerPlugin("sprite", d), d.prototype.onContextChange = function () {
                var a = this.renderer.gl;
                this.shader = this.renderer.shaderManager.defaultShader, this.vertexBuffer = a.createBuffer(), this.indexBuffer = a.createBuffer(), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer), a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW), a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer), a.bufferData(a.ARRAY_BUFFER, this.vertices, a.DYNAMIC_DRAW), this.currentBlendMode = 99999
            }, d.prototype.render = function (a) {
                var b = a._texture;
                this.currentBatchSize >= this.size && this.flush();
                var c = b._uvs;
                if (c) {
                    var d, e, f, g, h = a.anchor.x, i = a.anchor.y;
                    if (b.trim && void 0 === a.tileScale) {
                        var j = b.trim;
                        e = j.x - h * j.width, d = e + b.crop.width, g = j.y - i * j.height, f = g + b.crop.height
                    } else d = b._frame.width * (1 - h), e = b._frame.width * -h, f = b._frame.height * (1 - i), g = b._frame.height * -i;
                    var k = this.currentBatchSize * this.vertByteSize, l = a.worldTransform,
                        m = b.baseTexture.resolution, n = l.a / m, o = l.b / m, p = l.c / m, q = l.d / m, r = l.tx,
                        s = l.ty, t = this.colors, u = this.positions;
                    if (this.renderer.roundPixels) {
                        var m = this.renderer.resolution;
                        u[k] = ((n * e + p * g + r) * m | 0) / m, u[k + 1] = ((q * g + o * e + s) * m | 0) / m, u[k + 5] = ((n * d + p * g + r) * m | 0) / m, u[k + 6] = ((q * g + o * d + s) * m | 0) / m, u[k + 10] = ((n * d + p * f + r) * m | 0) / m, u[k + 11] = ((q * f + o * d + s) * m | 0) / m, u[k + 15] = ((n * e + p * f + r) * m | 0) / m, u[k + 16] = ((q * f + o * e + s) * m | 0) / m
                    } else u[k] = n * e + p * g + r, u[k + 1] = q * g + o * e + s, u[k + 5] = n * d + p * g + r, u[k + 6] = q * g + o * d + s, u[k + 10] = n * d + p * f + r, u[k + 11] = q * f + o * d + s, u[k + 15] = n * e + p * f + r, u[k + 16] = q * f + o * e + s;
                    u[k + 2] = c.x0, u[k + 3] = c.y0, u[k + 7] = c.x1, u[k + 8] = c.y1, u[k + 12] = c.x2, u[k + 13] = c.y2, u[k + 17] = c.x3, u[k + 18] = c.y3;
                    var v = a.tint;
                    t[k + 4] = t[k + 9] = t[k + 14] = t[k + 19] = (v >> 16) + (65280 & v) + ((255 & v) << 16) + (255 * a.worldAlpha << 24), this.sprites[this.currentBatchSize++] = a
                }
            }, d.prototype.flush = function () {
                if (0 !== this.currentBatchSize) {
                    var a, b = this.renderer.gl;
                    if (this.currentBatchSize > .5 * this.size) b.bufferSubData(b.ARRAY_BUFFER, 0, this.vertices); else {
                        var c = this.positions.subarray(0, this.currentBatchSize * this.vertByteSize);
                        b.bufferSubData(b.ARRAY_BUFFER, 0, c)
                    }
                    for (var d, e, f, g, h = 0, i = 0, j = null, k = this.renderer.blendModeManager.currentBlendMode, l = null, m = !1, n = !1, o = 0, p = this.currentBatchSize; p > o; o++) g = this.sprites[o], d = g._texture.baseTexture, e = g.blendMode, f = g.shader || this.shader, m = k !== e, n = l !== f, (j !== d || m || n) && (this.renderBatch(j, h, i), i = o, h = 0, j = d, m && (k = e, this.renderer.blendModeManager.setBlendMode(k)), n && (l = f, a = l.shaders ? l.shaders[b.id] : l, a || (a = l.getShader(this.renderer)), this.renderer.shaderManager.setShader(a), a.uniforms.projectionMatrix.value = this.renderer.currentRenderTarget.projectionMatrix.toArray(!0), a.syncUniforms(), b.activeTexture(b.TEXTURE0))), h++;
                    this.renderBatch(j, h, i), this.currentBatchSize = 0
                }
            }, d.prototype.renderBatch = function (a, b, c) {
                if (0 !== b) {
                    var d = this.renderer.gl;
                    a._glTextures[d.id] ? d.bindTexture(d.TEXTURE_2D, a._glTextures[d.id]) : this.renderer.updateTexture(a), d.drawElements(d.TRIANGLES, 6 * b, d.UNSIGNED_SHORT, 6 * c * 2), this.renderer.drawCount++
                }
            }, d.prototype.start = function () {
                var a = this.renderer.gl;
                a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer), a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var b = this.vertByteSize;
                a.vertexAttribPointer(this.shader.attributes.aVertexPosition, 2, a.FLOAT, !1, b, 0), a.vertexAttribPointer(this.shader.attributes.aTextureCoord, 2, a.FLOAT, !1, b, 8), a.vertexAttribPointer(this.shader.attributes.aColor, 4, a.UNSIGNED_BYTE, !0, b, 16)
            }, d.prototype.destroy = function () {
                this.renderer.gl.deleteBuffer(this.vertexBuffer), this.renderer.gl.deleteBuffer(this.indexBuffer), e.prototype.destroy.call(this), this.shader.destroy(), this.renderer = null, this.vertices = null, this.positions = null, this.colors = null, this.indices = null, this.vertexBuffer = null, this.indexBuffer = null, this.sprites = null, this.shader = null
            }
        }, {
            "../../const": 23,
            "../../renderers/webgl/WebGLRenderer": 49,
            "../../renderers/webgl/utils/ObjectRenderer": 63
        }],
        69: [function (a, b, c) {
            function d(a, b, c) {
                this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = c || i.RESOLUTION, this._text = null, this._style = null;
                var d = f.fromCanvas(this.canvas);
                d.trim = new g.Rectangle, e.call(this, d), this.text = a, this.style = b
            }

            var e = a("../sprites/Sprite"), f = a("../textures/Texture"), g = a("../math"), h = a("../utils"),
                i = a("../const");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.fontPropertiesCache = {}, d.fontPropertiesCanvas = document.createElement("canvas"), d.fontPropertiesContext = d.fontPropertiesCanvas.getContext("2d"), Object.defineProperties(d.prototype, {
                width: {
                    get: function () {
                        return this.dirty && this.updateText(), this.scale.x * this._texture.width
                    }, set: function (a) {
                        this.scale.x = a / this._texture.width, this._width = a
                    }
                }, height: {
                    get: function () {
                        return this.dirty && this.updateText(), this.scale.y * this._texture.height
                    }, set: function (a) {
                        this.scale.y = a / this._texture.height, this._height = a
                    }
                }, style: {
                    get: function () {
                        return this._style
                    }, set: function (a) {
                        a = a || {}, "number" == typeof a.fill && (a.fill = h.hex2string(a.fill)), "number" == typeof a.stroke && (a.stroke = h.hex2string(a.stroke)), "number" == typeof a.dropShadowColor && (a.dropShadowColor = h.hex2string(a.dropShadowColor)), a.font = a.font || "bold 20pt Arial", a.fill = a.fill || "black", a.align = a.align || "left", a.stroke = a.stroke || "black", a.strokeThickness = a.strokeThickness || 0, a.wordWrap = a.wordWrap || !1, a.wordWrapWidth = a.wordWrapWidth || 100, a.dropShadow = a.dropShadow || !1, a.dropShadowColor = a.dropShadowColor || "#000000", a.dropShadowAngle = void 0 !== a.dropShadowAngle ? a.dropShadowAngle : Math.PI / 6, a.dropShadowDistance = void 0 !== a.dropShadowDistance ? a.dropShadowDistance : 5, a.dropShadowBlur = void 0 !== a.dropShadowBlur ? a.dropShadowBlur : 0, a.padding = a.padding || 0, a.textBaseline = a.textBaseline || "alphabetic", a.lineJoin = a.lineJoin || "miter", a.miterLimit = a.miterLimit || 10, this._style = a, this.dirty = !0
                    }
                }, text: {
                    get: function () {
                        return this._text
                    }, set: function (a) {
                        a = a.toString() || " ", this._text !== a && (this._text = a, this.dirty = !0)
                    }
                }
            }), d.prototype.updateText = function () {
                var a = this._style;
                this.context.font = a.font;
                for (var b = a.wordWrap ? this.wordWrap(this._text) : this._text, c = b.split(/(?:\r\n|\r|\n)/), d = new Array(c.length), e = 0, f = this.determineFontProperties(a.font), g = 0; g < c.length; g++) {
                    var h = this.context.measureText(c[g]).width;
                    d[g] = h, e = Math.max(e, h)
                }
                var i = e + a.strokeThickness;
                a.dropShadow && (i += a.dropShadowDistance), this.canvas.width = (i + this.context.lineWidth) * this.resolution;
                var j = this.style.lineHeight || f.fontSize + a.strokeThickness, k = j * c.length;
                a.dropShadow && (k += a.dropShadowDistance), this.canvas.height = (k + 2 * this._style.padding) * this.resolution, this.context.scale(this.resolution, this.resolution), navigator.isCocoonJS && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.font = a.font, this.context.strokeStyle = a.stroke, this.context.lineWidth = a.strokeThickness, this.context.textBaseline = a.textBaseline, this.context.lineJoin = a.lineJoin, this.context.miterLimit = a.miterLimit;
                var l, m;
                if (a.dropShadow) {
                    a.dropShadowBlur > 0 ? (this.context.shadowColor = a.dropShadowColor, this.context.shadowBlur = a.dropShadowBlur) : this.context.fillStyle = a.dropShadowColor;
                    var n = Math.cos(a.dropShadowAngle) * a.dropShadowDistance,
                        o = Math.sin(a.dropShadowAngle) * a.dropShadowDistance;
                    for (g = 0; g < c.length; g++) l = a.strokeThickness / 2, m = a.strokeThickness / 2 + g * j + f.ascent, "right" === a.align ? l += e - d[g] : "center" === a.align && (l += (e - d[g]) / 2), a.fill && this.context.fillText(c[g], l + n, m + o + this._style.padding)
                }
                for (this.context.fillStyle = a.fill, g = 0; g < c.length; g++) l = a.strokeThickness / 2, m = a.strokeThickness / 2 + g * j + f.ascent, "right" === a.align ? l += e - d[g] : "center" === a.align && (l += (e - d[g]) / 2), a.stroke && a.strokeThickness && this.context.strokeText(c[g], l, m + this._style.padding), a.fill && this.context.fillText(c[g], l, m + this._style.padding);
                this.updateTexture()
            }, d.prototype.updateTexture = function () {
                var a = this._texture;
                a.baseTexture.hasLoaded = !0, a.baseTexture.resolution = this.resolution, a.baseTexture.realWidth = this.canvas.width, a.baseTexture.realHeight = this.canvas.height, a.width = a.baseTexture.width = this.canvas.width / this.resolution, a.height = a.baseTexture.height = this.canvas.height / this.resolution, a.crop.width = a._frame.width = this.canvas.width / this.resolution, a.crop.height = a._frame.height = this.canvas.height / this.resolution, a.trim.x = 0, a.trim.y = -this._style.padding, a.trim.width = a._frame.width, a.trim.height = a._frame.height - 2 * this._style.padding, this._width = this.canvas.width / this.resolution, this._height = this.canvas.height / this.resolution, a.baseTexture.emit("update", a.baseTexture), this.dirty = !1
            }, d.prototype.renderWebGL = function (a) {
                this.dirty && this.updateText(), e.prototype.renderWebGL.call(this, a)
            }, d.prototype._renderCanvas = function (a) {
                this.dirty && this.updateText(), e.prototype._renderCanvas.call(this, a)
            }, d.prototype.determineFontProperties = function (a) {
                var b = d.fontPropertiesCache[a];
                if (!b) {
                    b = {};
                    var c = d.fontPropertiesCanvas, e = d.fontPropertiesContext;
                    e.font = a;
                    var f = Math.ceil(e.measureText("|MÉq").width), g = Math.ceil(e.measureText("M").width), h = 2 * g;
                    g = 1.4 * g | 0, c.width = f, c.height = h, e.fillStyle = "#f00", e.fillRect(0, 0, f, h), e.font = a, e.textBaseline = "alphabetic", e.fillStyle = "#000", e.fillText("|MÉq", 0, g);
                    var i, j, k = e.getImageData(0, 0, f, h).data, l = k.length, m = 4 * f, n = 0, o = !1;
                    for (i = 0; g > i; i++) {
                        for (j = 0; m > j; j += 4) if (255 !== k[n + j]) {
                            o = !0;
                            break
                        }
                        if (o) break;
                        n += m
                    }
                    for (b.ascent = g - i, n = l - m, o = !1, i = h; i > g; i--) {
                        for (j = 0; m > j; j += 4) if (255 !== k[n + j]) {
                            o = !0;
                            break
                        }
                        if (o) break;
                        n -= m
                    }
                    b.descent = i - g, b.fontSize = b.ascent + b.descent, d.fontPropertiesCache[a] = b
                }
                return b
            }, d.prototype.wordWrap = function (a) {
                for (var b = "", c = a.split("\n"), d = this._style.wordWrapWidth, e = 0; e < c.length; e++) {
                    for (var f = d, g = c[e].split(" "), h = 0; h < g.length; h++) {
                        var i = this.context.measureText(g[h]).width, j = i + this.context.measureText(" ").width;
                        0 === h || j > f ? (h > 0 && (b += "\n"), b += g[h], f = d - i) : (f -= j, b += " " + g[h])
                    }
                    e < c.length - 1 && (b += "\n")
                }
                return b
            }, d.prototype.getBounds = function (a) {
                return this.dirty && this.updateText(), e.prototype.getBounds.call(this, a)
            }, d.prototype.destroy = function (a) {
                this.context = null, this.canvas = null, this._style = null, this._texture.destroy(void 0 === a || a)
            }
        }, {"../const": 23, "../math": 33, "../sprites/Sprite": 67, "../textures/Texture": 72, "../utils": 77}],
        70: [function (a, b, c) {
            function d(a, b, c) {
                g.call(this), this.uid = e.uid(), this.resolution = c || 1, this.width = 100, this.height = 100, this.realWidth = 100, this.realHeight = 100, this.scaleMode = b || f.SCALE_MODES.DEFAULT, this.hasLoaded = !1, this.isLoading = !1, this.source = null, this.premultipliedAlpha = !0, this.imageUrl = null, this.isPowerOfTwo = !1, this.mipmap = !1, this._glTextures = {}, a && this.loadSource(a)
            }

            var e = a("../utils"), f = a("../const"), g = a("eventemitter3");
            d.prototype = Object.create(g.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.update = function () {
                this.realWidth = this.source.naturalWidth || this.source.width, this.realHeight = this.source.naturalHeight || this.source.height, this.width = this.realWidth / this.resolution, this.height = this.realHeight / this.resolution, this.isPowerOfTwo = e.isPowerOfTwo(this.realWidth, this.realHeight), this.emit("update", this)
            }, d.prototype.loadSource = function (a) {
                var b = this.isLoading;
                if (this.hasLoaded = !1, this.isLoading = !1, b && this.source && (this.source.onload = null, this.source.onerror = null), this.source = a, (this.source.complete || this.source.getContext) && this.source.width && this.source.height) this._sourceLoaded(); else if (!a.getContext) {
                    this.isLoading = !0;
                    var c = this;
                    a.onload = function () {
                        a.onload = null, a.onerror = null, c.isLoading && (c.isLoading = !1, c._sourceLoaded(), c.emit("loaded", c))
                    }, a.onerror = function () {
                        a.onload = null, a.onerror = null, c.isLoading && (c.isLoading = !1, c.emit("error", c))
                    }, a.complete && a.src && (this.isLoading = !1, a.onload = null, a.onerror = null, a.width && a.height ? (this._sourceLoaded(), b && this.emit("loaded", this)) : b && this.emit("error", this))
                }
            }, d.prototype._sourceLoaded = function () {
                this.hasLoaded = !0, this.update()
            }, d.prototype.destroy = function () {
                var a;
                this.imageUrl ? (a = this.imageUrl, e.useFilenamesForTextures && (a = e.getFilenameFromUrl(this.imageUrl)), delete e.BaseTextureCache[a], delete e.TextureCache[a], this.imageUrl = null, navigator.isCocoonJS || (this.source.src = "")) : this.source && this.source._pixiId && delete e.BaseTextureCache[this.source._pixiId], this.source = null, this.dispose();
                var b = e.TextureCache;
                for (a in b) {
                    var c = b[a];
                    c ? c.baseTexture === this && (c.destroy(), delete b[a]) : delete b[a]
                }
                this.removeAllListeners()
            }, d.prototype.dispose = function () {
                this.emit("dispose", this)
            }, d.prototype.updateSourceImage = function (a) {
                this.source.src = a, this.loadSource(this.source)
            }, d.fromImage = function (a, b, c) {
                var f = a;
                e.useFilenamesForTextures && (f = e.getFilenameFromUrl(a));
                var g = e.BaseTextureCache[f];
                if (void 0 === b && 0 !== a.indexOf("data:") && (b = !0), !g) {
                    var h = new Image;
                    b && (h.crossOrigin = ""), g = new d(h, c), g.imageUrl = a, h.src = a, e.BaseTextureCache[f] = g, g.resolution = e.getResolutionOfUrl(a)
                }
                return g
            }, d.fromCanvas = function (a, b) {
                a._pixiId || (a._pixiId = "canvas_" + e.uid());
                var c = e.BaseTextureCache[a._pixiId];
                return c || (c = new d(a, b), e.BaseTextureCache[a._pixiId] = c), c
            }
        }, {"../const": 23, "../utils": 77, eventemitter3: 10}],
        71: [function (a, b, c) {
            function d(a, b, c, d, l) {
                if (!a) throw new Error("Unable to create RenderTexture, you must pass a renderer into the constructor.");
                b = b || 100, c = c || 100, l = l || k.RESOLUTION;
                var m = new e;
                if (m.width = b, m.height = c, m.realWidth = b * l, m.realHeight = c * l, m.resolution = l, m.scaleMode = d || k.SCALE_MODES.DEFAULT, m.hasLoaded = !0, f.call(this, m, new j.Rectangle(0, 0, m.realWidth, m.realHeight)), this.width = b, this.height = c, this.resolution = l, this.render = null, this.renderer = a, this.renderer.type === k.RENDERER_TYPE.WEBGL) {
                    var n = this.renderer.gl;
                    this.textureBuffer = new g(n, this.width, this.height, m.scaleMode, this.resolution), this.baseTexture._glTextures[n.id] = this.textureBuffer.texture, this.filterManager = new h(this.renderer), this.filterManager.onContextChange(), this.filterManager.resize(b, c), this.render = this.renderWebGL, this.renderer.currentRenderer.start(), this.renderer.currentRenderTarget.activate()
                } else this.render = this.renderCanvas, this.textureBuffer = new i(this.width * this.resolution, this.height * this.resolution), this.baseTexture.source = this.textureBuffer.canvas;
                this.valid = !0, this._updateUvs()
            }

            var e = a("./BaseTexture"), f = a("./Texture"), g = a("../renderers/webgl/utils/RenderTarget"),
                h = a("../renderers/webgl/managers/FilterManager"), i = a("../renderers/canvas/utils/CanvasBuffer"),
                j = a("../math"), k = a("../const"), l = new j.Matrix;
            d.prototype = Object.create(f.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.resize = function (a, b, c) {
                (a !== this.width || b !== this.height) && (this.valid = a > 0 && b > 0, this.width = a, this.height = b, this._frame.width = this.crop.width = a * this.resolution, this._frame.height = this.crop.height = b * this.resolution, c && (this.baseTexture.realWidth = a * this.resolution, this.baseTexture.realHeight = b * this.resolution, this.baseTexture.width = this.width, this.baseTexture.height = this.height), this.valid && (this.renderer.type === k.RENDERER_TYPE.WEBGL ? this.textureBuffer.resize(this.width, this.height) : this.textureBuffer.resize(this.baseTexture.realWidth, this.baseTexture.realHeight), this.filterManager && this.filterManager.resize(this.width, this.height)))
            }, d.prototype.clear = function () {
                this.valid && (this.renderer.type === k.RENDERER_TYPE.WEBGL && this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer), this.textureBuffer.clear())
            }, d.prototype.renderWebGL = function (a, b, c, d) {
                if (this.valid) {
                    if (d = void 0 === d || d, this.textureBuffer.transform = b, this.textureBuffer.activate(), a.worldAlpha = 1, d) {
                        a.worldTransform.identity(), a.currentBounds = null;
                        var e, f, g = a.children;
                        for (e = 0, f = g.length; f > e; ++e) g[e].updateTransform()
                    }
                    var h = this.renderer.filterManager;
                    this.renderer.filterManager = this.filterManager, this.renderer.renderDisplayObject(a, this.textureBuffer, c), this.renderer.filterManager = h
                }
            }, d.prototype.renderCanvas = function (a, b, c, d) {
                if (this.valid) {
                    d = !!d;
                    var e = l;
                    e.identity(), b && e.append(b);
                    var f = a.worldTransform;
                    a.worldTransform = e, a.worldAlpha = 1;
                    var g, h, i = a.children;
                    for (g = 0, h = i.length; h > g; ++g) i[g].updateTransform();
                    c && this.textureBuffer.clear();
                    var j = this.textureBuffer.context, k = this.renderer.resolution;
                    this.renderer.resolution = this.resolution, this.renderer.renderDisplayObject(a, j), this.renderer.resolution = k, a.worldTransform === e && (a.worldTransform = f)
                }
            }, d.prototype.destroy = function () {
                f.prototype.destroy.call(this, !0), this.textureBuffer.destroy(), this.filterManager && this.filterManager.destroy(), this.renderer = null
            }, d.prototype.getImage = function () {
                var a = new Image;
                return a.src = this.getBase64(), a
            }, d.prototype.getBase64 = function () {
                return this.getCanvas().toDataURL()
            }, d.prototype.getCanvas = function () {
                if (this.renderer.type === k.RENDERER_TYPE.WEBGL) {
                    var a = this.renderer.gl, b = this.textureBuffer.size.width, c = this.textureBuffer.size.height,
                        d = new Uint8Array(4 * b * c);
                    a.bindFramebuffer(a.FRAMEBUFFER, this.textureBuffer.frameBuffer), a.readPixels(0, 0, b, c, a.RGBA, a.UNSIGNED_BYTE, d), a.bindFramebuffer(a.FRAMEBUFFER, null);
                    var e = new i(b, c), f = e.context.getImageData(0, 0, b, c);
                    return f.data.set(d), e.context.putImageData(f, 0, 0), e.canvas
                }
                return this.textureBuffer.canvas
            }, d.prototype.getPixels = function () {
                var a, b;
                if (this.renderer.type === k.RENDERER_TYPE.WEBGL) {
                    var c = this.renderer.gl;
                    a = this.textureBuffer.size.width, b = this.textureBuffer.size.height;
                    var d = new Uint8Array(4 * a * b);
                    return c.bindFramebuffer(c.FRAMEBUFFER, this.textureBuffer.frameBuffer), c.readPixels(0, 0, a, b, c.RGBA, c.UNSIGNED_BYTE, d), c.bindFramebuffer(c.FRAMEBUFFER, null), d
                }
                return a = this.textureBuffer.canvas.width, b = this.textureBuffer.canvas.height, this.textureBuffer.canvas.getContext("2d").getImageData(0, 0, a, b).data
            }, d.prototype.getPixel = function (a, b) {
                if (this.renderer.type === k.RENDERER_TYPE.WEBGL) {
                    var c = this.renderer.gl, d = new Uint8Array(4);
                    return c.bindFramebuffer(c.FRAMEBUFFER, this.textureBuffer.frameBuffer), c.readPixels(a, b, 1, 1, c.RGBA, c.UNSIGNED_BYTE, d), c.bindFramebuffer(c.FRAMEBUFFER, null), d
                }
                return this.textureBuffer.canvas.getContext("2d").getImageData(a, b, 1, 1).data
            }
        }, {
            "../const": 23,
            "../math": 33,
            "../renderers/canvas/utils/CanvasBuffer": 45,
            "../renderers/webgl/managers/FilterManager": 54,
            "../renderers/webgl/utils/RenderTarget": 65,
            "./BaseTexture": 70,
            "./Texture": 72
        }],
        72: [function (a, b, c) {
            function d(a, b, c, e, f) {
                h.call(this), this.noFrame = !1, b || (this.noFrame = !0, b = new i.Rectangle(0, 0, 1, 1)), a instanceof d && (a = a.baseTexture), this.baseTexture = a, this._frame = b, this.trim = e, this.valid = !1, this.requiresUpdate = !1, this._uvs = null, this.width = 0, this.height = 0, this.crop = c || b, this.rotate = !!f, a.hasLoaded ? (this.noFrame && (b = new i.Rectangle(0, 0, a.realWidth, a.realHeight)), this.frame = b) : a.once("loaded", this.onBaseTextureLoaded, this), a.on("update", this.onBaseTextureUpdated, this)
            }

            var e = a("./BaseTexture"), f = a("./VideoBaseTexture"), g = a("./TextureUvs"), h = a("eventemitter3"),
                i = a("../math"), j = a("../utils");
            d.prototype = Object.create(h.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                frame: {
                    get: function () {
                        return this._frame
                    }, set: function (a) {
                        this._frame = a, this.noFrame = !1;
                        var b = this.baseTexture.resolution;
                        if (this.width = a.width / b, this.height = a.height / b, !this.trim && !this.rotate && (a.x + a.width > this.baseTexture.width || a.y + a.height > this.baseTexture.height)) throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
                        this.valid = a && a.width && a.height && this.baseTexture.hasLoaded, this.trim ? (this.width = this.trim.width / b, this.height = this.trim.height / b, this._frame.width = this.trim.width, this._frame.height = this.trim.height) : this.crop = a, this.valid && this._updateUvs()
                    }
                }
            }), d.prototype.update = function () {
                this.baseTexture.update()
            }, d.prototype.onBaseTextureLoaded = function (a) {
                this.noFrame ? this.frame = new i.Rectangle(0, 0, a.realWidth, a.realHeight) : this.frame = this._frame, this.emit("update", this)
            }, d.prototype.onBaseTextureUpdated = function (a) {
                this.noFrame ? (this._frame.width = a.realWidth, this._frame.height = a.realHeight) : this.frame = this._frame, this.emit("update", this)
            }, d.prototype.destroy = function (a) {
                this.baseTexture && (a && this.baseTexture.destroy(), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture.off("loaded", this.onBaseTextureLoaded, this), this.baseTexture = null), this._frame = null, this._uvs = null, this.trim = null, this.crop = null, this.valid = !1, this.off("dispose", this.dispose, this), this.off("update", this.update, this)
            }, d.prototype.clone = function () {
                return new d(this.baseTexture, this.frame, this.crop, this.trim, this.rotate)
            }, d.prototype._updateUvs = function () {
                this._uvs || (this._uvs = new g), this._uvs.set(this.crop, this.baseTexture, this.rotate)
            }, d.fromImage = function (a, b, c) {
                var f = a;
                j.useFilenamesForTextures && (f = j.getFilenameFromUrl(a));
                var g = j.TextureCache[f];
                return g || (g = new d(e.fromImage(a, b, c)), j.TextureCache[f] = g), g
            }, d.fromFrame = function (a, b) {
                var c = a;
                j.useFilenamesForTextures && (c = j.getFilenameFromUrl(a));
                var d = j.TextureCache[c];
                if (!d && !b) throw new Error('The frameId "' + a + '" does not exist in the texture cache');
                return d
            }, d.fromCanvas = function (a, b) {
                return new d(e.fromCanvas(a, b))
            }, d.fromVideo = function (a, b) {
                return "string" == typeof a ? d.fromVideoUrl(a, b) : new d(f.fromVideo(a, b))
            }, d.fromVideoUrl = function (a, b) {
                return new d(f.fromUrl(a, b))
            }, d.addTextureToCache = function (a, b) {
                j.TextureCache[b] = a
            }, d.removeTextureFromCache = function (a) {
                var b = j.TextureCache[a];
                return delete j.TextureCache[a], delete j.BaseTextureCache[a], b
            }, d.EMPTY = new d(new e)
        }, {
            "../math": 33,
            "../utils": 77,
            "./BaseTexture": 70,
            "./TextureUvs": 73,
            "./VideoBaseTexture": 74,
            eventemitter3: 10
        }],
        73: [function (a, b, c) {
            function d() {
                this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1
            }

            b.exports = d, d.prototype.set = function (a, b, c) {
                var d = b.realWidth, e = b.realHeight;
                c ? (this.x0 = (a.x + a.height) / d, this.y0 = a.y / e, this.x1 = (a.x + a.height) / d, this.y1 = (a.y + a.width) / e, this.x2 = a.x / d, this.y2 = (a.y + a.width) / e, this.x3 = a.x / d, this.y3 = a.y / e) : (this.x0 = a.x / d, this.y0 = a.y / e, this.x1 = (a.x + a.width) / d, this.y1 = a.y / e, this.x2 = (a.x + a.width) / d, this.y2 = (a.y + a.height) / e, this.x3 = a.x / d, this.y3 = (a.y + a.height) / e)
            }
        }, {}],
        74: [function (a, b, c) {
            function d(a, b) {
                if (!a) throw new Error("No video source element specified.");
                (a.readyState === a.HAVE_ENOUGH_DATA || a.readyState === a.HAVE_FUTURE_DATA) && a.width && a.height && (a.complete = !0), f.call(this, a, b), this.autoUpdate = !1, this._onUpdate = this._onUpdate.bind(this), this._onCanPlay = this._onCanPlay.bind(this), a.complete || (a.addEventListener("canplay", this._onCanPlay), a.addEventListener("canplaythrough", this._onCanPlay), a.addEventListener("play", this._onPlayStart.bind(this)), a.addEventListener("pause", this._onPlayStop.bind(this))), this.__loaded = !1
            }

            function e(a, b) {
                b || (b = "video/" + a.substr(a.lastIndexOf(".") + 1));
                var c = document.createElement("source");
                return c.src = a, c.type = b, c
            }

            var f = a("./BaseTexture"), g = a("../utils");
            d.prototype = Object.create(f.prototype), d.prototype.constructor = d, b.exports = d, d.prototype._onUpdate = function () {
                this.autoUpdate && (window.requestAnimationFrame(this._onUpdate), this.update())
            }, d.prototype._onPlayStart = function () {
                this.autoUpdate || (window.requestAnimationFrame(this._onUpdate), this.autoUpdate = !0)
            }, d.prototype._onPlayStop = function () {
                this.autoUpdate = !1
            }, d.prototype._onCanPlay = function () {
                this.hasLoaded = !0, this.source && (this.source.removeEventListener("canplay", this._onCanPlay), this.source.removeEventListener("canplaythrough", this._onCanPlay), this.width = this.source.videoWidth, this.height = this.source.videoHeight, this.source.play(), this.__loaded || (this.__loaded = !0, this.emit("loaded", this)))
            }, d.prototype.destroy = function () {
                this.source && this.source._pixiId && (delete g.BaseTextureCache[this.source._pixiId], delete this.source._pixiId), f.prototype.destroy.call(this)
            }, d.fromVideo = function (a, b) {
                a._pixiId || (a._pixiId = "video_" + g.uid());
                var c = g.BaseTextureCache[a._pixiId];
                return c || (c = new d(a, b), g.BaseTextureCache[a._pixiId] = c), c
            }, d.fromUrl = function (a, b) {
                var c = document.createElement("video");
                if (Array.isArray(a)) for (var f = 0; f < a.length; ++f) c.appendChild(e(a[f].src || a[f], a[f].mime)); else c.appendChild(e(a.src || a, a.mime));
                return c.load(), c.play(), d.fromVideo(c, b)
            }, d.fromUrls = d.fromUrl
        }, {"../utils": 77, "./BaseTexture": 70}],
        75: [function (a, b, c) {
            function d() {
                var a = this;
                this._tick = function (b) {
                    a._requestId = null, a.started && (a.update(b), a.started && null === a._requestId && a._emitter.listeners(g, !0) && (a._requestId = requestAnimationFrame(a._tick)))
                }, this._emitter = new f, this._requestId = null, this._maxElapsedMS = 100, this.autoStart = !1, this.deltaTime = 1, this.elapsedMS = 1 / e.TARGET_FPMS, this.lastTime = 0, this.speed = 1, this.started = !1
            }

            var e = a("../const"), f = a("eventemitter3"), g = "tick";
            Object.defineProperties(d.prototype, {
                FPS: {
                    get: function () {
                        return 1e3 / this.elapsedMS
                    }
                }, minFPS: {
                    get: function () {
                        return 1e3 / this._maxElapsedMS
                    }, set: function (a) {
                        var b = Math.min(Math.max(0, a) / 1e3, e.TARGET_FPMS);
                        this._maxElapsedMS = 1 / b
                    }
                }
            }), d.prototype._requestIfNeeded = function () {
                null === this._requestId && this._emitter.listeners(g, !0) && (this.lastTime = performance.now(), this._requestId = requestAnimationFrame(this._tick))
            }, d.prototype._cancelIfNeeded = function () {
                null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null)
            }, d.prototype._startIfPossible = function () {
                this.started ? this._requestIfNeeded() : this.autoStart && this.start()
            }, d.prototype.add = function (a, b) {
                return this._emitter.on(g, a, b), this._startIfPossible(), this
            }, d.prototype.addOnce = function (a, b) {
                return this._emitter.once(g, a, b), this._startIfPossible(), this
            }, d.prototype.remove = function (a, b) {
                return this._emitter.off(g, a, b), this._emitter.listeners(g, !0) || this._cancelIfNeeded(), this
            }, d.prototype.start = function () {
                this.started || (this.started = !0, this._requestIfNeeded())
            }, d.prototype.stop = function () {
                this.started && (this.started = !1, this._cancelIfNeeded())
            }, d.prototype.update = function (a) {
                var b;
                a = a || performance.now(), b = this.elapsedMS = a - this.lastTime, b > this._maxElapsedMS && (b = this._maxElapsedMS), this.deltaTime = b * e.TARGET_FPMS * this.speed, this._emitter.emit(g, this.deltaTime), this.lastTime = a
            }, b.exports = d
        }, {"../const": 23, eventemitter3: 10}],
        76: [function (a, b, c) {
            var d = a("./Ticker"), e = new d;
            e.autoStart = !0, b.exports = {shared: e, Ticker: d}
        }, {"./Ticker": 75}],
        77: [function (a, b, c) {
            var d = a("../const"), e = b.exports = {
                _uid: 0,
                _saidHello: !1,
                EventEmitter: a("eventemitter3"),
                pluginTarget: a("./pluginTarget"),
                async: a("async"),
                uid: function () {
                    return ++e._uid
                },
                hex2rgb: function (a, b) {
                    return b = b || [], b[0] = (a >> 16 & 255) / 255, b[1] = (a >> 8 & 255) / 255, b[2] = (255 & a) / 255, b
                },
                hex2string: function (a) {
                    return a = a.toString(16), a = "000000".substr(0, 6 - a.length) + a, "#" + a
                },
                rgb2hex: function (a) {
                    return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
                },
                canUseNewCanvasBlendModes: function () {
                    if ("undefined" == typeof document) return !1;
                    var a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/",
                        b = "AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==", c = new Image;
                    c.src = a + "AP804Oa6" + b;
                    var d = new Image;
                    d.src = a + "/wCKxvRF" + b;
                    var e = document.createElement("canvas");
                    e.width = 6, e.height = 1;
                    var f = e.getContext("2d");
                    f.globalCompositeOperation = "multiply", f.drawImage(c, 0, 0), f.drawImage(d, 2, 0);
                    var g = f.getImageData(2, 0, 1, 1).data;
                    return 255 === g[0] && 0 === g[1] && 0 === g[2]
                },
                getNextPowerOfTwo: function (a) {
                    if (a > 0 && 0 === (a & a - 1)) return a;
                    for (var b = 1; a > b;) b <<= 1;
                    return b
                },
                isPowerOfTwo: function (a, b) {
                    return a > 0 && 0 === (a & a - 1) && b > 0 && 0 === (b & b - 1)
                },
                getResolutionOfUrl: function (a) {
                    var b = d.RETINA_PREFIX.exec(a);
                    return b ? parseFloat(b[1]) : 1
                },
                sayHello: function (a) {
                    if (!e._saidHello) {
                        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                            var b = ["\n %c %c %c Pixi.js " + d.VERSION + " - ✰ " + a + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
                            window.console.log.apply(console, b)
                        } else window.console && window.console.log("Pixi.js " + d.VERSION + " - " + a + " - http://www.pixijs.com/");
                        e._saidHello = !0
                    }
                },
                isWebGLSupported: function () {
                    var a = {stencil: !0};
                    try {
                        if (!window.WebGLRenderingContext) return !1;
                        var b = document.createElement("canvas"),
                            c = b.getContext("webgl", a) || b.getContext("experimental-webgl", a);
                        return !(!c || !c.getContextAttributes().stencil)
                    } catch (d) {
                        return !1
                    }
                },
                sign: function (a) {
                    return a ? 0 > a ? -1 : 1 : 0
                },
                removeItems: function (a, b, c) {
                    var d = a.length;
                    if (!(b >= d || 0 === c)) {
                        c = b + c > d ? d - b : c;
                        for (var e = b, f = d - c; f > e; ++e) a[e] = a[e + c];
                        a.length = f
                    }
                },
                TextureCache: {},
                BaseTextureCache: {},
                useFilenamesForTextures: !1,
                getFilenameFromUrl: function (a) {
                    if (0 === a.indexOf("data:")) return a;
                    var b = a.substring(a.lastIndexOf("/") + 1), c = b.lastIndexOf(".");
                    return -1 !== c && (b = b.substring(0, c)), b
                }
            }
        }, {"../const": 23, "./pluginTarget": 78, async: 1, eventemitter3: 10}],
        78: [function (a, b, c) {
            function d(a) {
                a.__plugins = {}, a.registerPlugin = function (b, c) {
                    a.__plugins[b] = c
                }, a.prototype.initPlugins = function () {
                    this.plugins = this.plugins || {};
                    for (var b in a.__plugins) this.plugins[b] = new a.__plugins[b](this)
                }, a.prototype.destroyPlugins = function () {
                    for (var a in this.plugins) this.plugins[a].destroy(), this.plugins[a] = null;
                    this.plugins = null
                }
            }

            b.exports = {
                mixin: function (a) {
                    d(a)
                }
            }
        }, {}],
        79: [function (a, b, c) {
            var d = a("./core"), e = a("./mesh"), f = a("./extras"), g = a("./filters");
            d.SpriteBatch = function () {
                throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")
            }, d.AssetLoader = function () {
                throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")
            }, Object.defineProperties(d, {
                Stage: {
                    get: function () {
                        return console.warn("You do not need to use a PIXI Stage any more, you can simply render any container."), d.Container
                    }
                }, DisplayObjectContainer: {
                    get: function () {
                        return console.warn("DisplayObjectContainer has been shortened to Container, please use Container from now on."), d.Container
                    }
                }, Strip: {
                    get: function () {
                        return console.warn("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."), e.Mesh
                    }
                }, Rope: {
                    get: function () {
                        return console.warn("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."), e.Rope
                    }
                }, MovieClip: {
                    get: function () {
                        return console.warn("The MovieClip class has been moved to extras.MovieClip, please use extras.MovieClip from now on."), f.MovieClip
                    }
                }, TilingSprite: {
                    get: function () {
                        return console.warn("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."), f.TilingSprite
                    }
                }, BitmapText: {
                    get: function () {
                        return console.warn("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."), f.BitmapText
                    }
                }, blendModes: {
                    get: function () {
                        return console.warn("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."), d.BLEND_MODES
                    }
                }, scaleModes: {
                    get: function () {
                        return console.warn("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."), d.SCALE_MODES
                    }
                }, BaseTextureCache: {
                    get: function () {
                        return console.warn("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."), d.utils.BaseTextureCache
                    }
                }, TextureCache: {
                    get: function () {
                        return console.warn("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."), d.utils.TextureCache
                    }
                }, math: {
                    get: function () {
                        return console.warn("The math namespace is deprecated, please access members already accessible on PIXI."),
                            d
                    }
                }
            }), d.Sprite.prototype.setTexture = function (a) {
                this.texture = a, console.warn("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")
            }, f.BitmapText.prototype.setText = function (a) {
                this.text = a, console.warn("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")
            }, d.Text.prototype.setText = function (a) {
                this.text = a, console.warn("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")
            }, d.Text.prototype.setStyle = function (a) {
                this.style = a, console.warn("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")
            }, d.Texture.prototype.setFrame = function (a) {
                this.frame = a, console.warn("setFrame is now deprecated, please use the frame property, e.g : myTexture.frame = frame;")
            }, Object.defineProperties(g, {
                AbstractFilter: {
                    get: function () {
                        return console.warn("filters.AbstractFilter is an undocumented alias, please use AbstractFilter from now on."), d.AbstractFilter
                    }
                }, FXAAFilter: {
                    get: function () {
                        return console.warn("filters.FXAAFilter is an undocumented alias, please use FXAAFilter from now on."), d.FXAAFilter
                    }
                }, SpriteMaskFilter: {
                    get: function () {
                        return console.warn("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."), d.SpriteMaskFilter
                    }
                }
            }), d.utils.uuid = function () {
                return console.warn("utils.uuid() is deprecated, please use utils.uid() from now on."), d.utils.uid()
            }
        }, {"./core": 30, "./extras": 86, "./filters": 103, "./mesh": 128}],
        80: [function (a, b, c) {
            function d(a, b) {
                e.Container.call(this), b = b || {}, this.textWidth = 0, this.textHeight = 0, this._glyphs = [], this._font = {
                    tint: void 0 !== b.tint ? b.tint : 16777215,
                    align: b.align || "left",
                    name: null,
                    size: 0
                }, this.font = b.font, this._text = a, this.maxWidth = 0, this.maxLineHeight = 0, this.dirty = !1, this.updateText()
            }

            var e = a("../core");
            d.prototype = Object.create(e.Container.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                tint: {
                    get: function () {
                        return this._font.tint
                    }, set: function (a) {
                        this._font.tint = "number" == typeof a && a >= 0 ? a : 16777215, this.dirty = !0
                    }
                }, align: {
                    get: function () {
                        return this._font.align
                    }, set: function (a) {
                        this._font.align = a || "left", this.dirty = !0
                    }
                }, font: {
                    get: function () {
                        return this._font
                    }, set: function (a) {
                        a && ("string" == typeof a ? (a = a.split(" "), this._font.name = 1 === a.length ? a[0] : a.slice(1).join(" "), this._font.size = a.length >= 2 ? parseInt(a[0], 10) : d.fonts[this._font.name].size) : (this._font.name = a.name, this._font.size = "number" == typeof a.size ? a.size : parseInt(a.size, 10)), this.dirty = !0)
                    }
                }, text: {
                    get: function () {
                        return this._text
                    }, set: function (a) {
                        a = a.toString() || " ", this._text !== a && (this._text = a, this.dirty = !0)
                    }
                }
            }), d.prototype.updateText = function () {
                for (var a = d.fonts[this._font.name], b = new e.Point, c = null, f = [], g = 0, h = 0, i = [], j = 0, k = this._font.size / a.size, l = -1, m = 0, n = 0; n < this.text.length; n++) {
                    var o = this.text.charCodeAt(n);
                    if (l = /(\s)/.test(this.text.charAt(n)) ? n : l, /(?:\r\n|\r|\n)/.test(this.text.charAt(n))) i.push(g), h = Math.max(h, g), j++, b.x = 0, b.y += a.lineHeight, c = null; else if (-1 !== l && this.maxWidth > 0 && b.x * k > this.maxWidth) e.utils.removeItems(f, l, n - l), n = l, l = -1, i.push(g), h = Math.max(h, g), j++, b.x = 0, b.y += a.lineHeight, c = null; else {
                        var p = a.chars[o];
                        p && (c && p.kerning[c] && (b.x += p.kerning[c]), f.push({
                            texture: p.texture,
                            line: j,
                            charCode: o,
                            position: new e.Point(b.x + p.xOffset, b.y + p.yOffset)
                        }), g = b.x + (p.texture.width + p.xOffset), b.x += p.xAdvance, m = Math.max(m, p.yOffset + p.texture.height), c = o)
                    }
                }
                i.push(g), h = Math.max(h, g);
                var q = [];
                for (n = 0; j >= n; n++) {
                    var r = 0;
                    "right" === this._font.align ? r = h - i[n] : "center" === this._font.align && (r = (h - i[n]) / 2), q.push(r)
                }
                var s = f.length, t = this.tint;
                for (n = 0; s > n; n++) {
                    var u = this._glyphs[n];
                    u ? u.texture = f[n].texture : (u = new e.Sprite(f[n].texture), this._glyphs.push(u)), u.position.x = (f[n].position.x + q[f[n].line]) * k, u.position.y = f[n].position.y * k, u.scale.x = u.scale.y = k, u.tint = t, u.parent || this.addChild(u)
                }
                for (n = s; n < this._glyphs.length; ++n) this.removeChild(this._glyphs[n]);
                this.textWidth = h * k, this.textHeight = (b.y + a.lineHeight) * k, this.maxLineHeight = m * k
            }, d.prototype.updateTransform = function () {
                this.validate(), this.containerUpdateTransform()
            }, d.prototype.getLocalBounds = function () {
                return this.validate(), e.Container.prototype.getLocalBounds.call(this)
            }, d.prototype.validate = function () {
                this.dirty && (this.updateText(), this.dirty = !1)
            }, d.fonts = {}
        }, {"../core": 30}],
        81: [function (a, b, c) {
            function d(a) {
                e.Sprite.call(this, a[0] instanceof e.Texture ? a[0] : a[0].texture), this._textures = null, this._durations = null, this.textures = a, this.animationSpeed = 1, this.loop = !0, this.onComplete = null, this._currentTime = 0, this.playing = !1
            }

            var e = a("../core");
            d.prototype = Object.create(e.Sprite.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                totalFrames: {
                    get: function () {
                        return this._textures.length
                    }
                }, textures: {
                    get: function () {
                        return this._textures
                    }, set: function (a) {
                        if (a[0] instanceof e.Texture) this._textures = a, this._durations = null; else {
                            this._textures = [], this._durations = [];
                            for (var b = 0; b < a.length; b++) this._textures.push(a[b].texture), this._durations.push(a[b].time)
                        }
                    }
                }, currentFrame: {
                    get: function () {
                        var a = Math.floor(this._currentTime) % this._textures.length;
                        return 0 > a && (a += this._textures.length), a
                    }
                }
            }), d.prototype.stop = function () {
                this.playing && (this.playing = !1, e.ticker.shared.remove(this.update, this))
            }, d.prototype.play = function () {
                this.playing || (this.playing = !0, e.ticker.shared.add(this.update, this))
            }, d.prototype.gotoAndStop = function (a) {
                this.stop(), this._currentTime = a, this._texture = this._textures[this.currentFrame]
            }, d.prototype.gotoAndPlay = function (a) {
                this._currentTime = a, this.play()
            }, d.prototype.update = function (a) {
                var b = this.animationSpeed * a;
                if (null !== this._durations) {
                    var c = this._currentTime % 1 * this._durations[this.currentFrame];
                    for (c += b / 60 * 1e3; 0 > c;) this._currentTime--, c += this._durations[this.currentFrame];
                    var d = Math.sign(this.animationSpeed * a);
                    for (this._currentTime = Math.floor(this._currentTime); c >= this._durations[this.currentFrame];) c -= this._durations[this.currentFrame] * d, this._currentTime += d;
                    this._currentTime += c / this._durations[this.currentFrame]
                } else this._currentTime += b;
                this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : this._texture = this._textures[this.currentFrame]
            }, d.prototype.destroy = function () {
                this.stop(), e.Sprite.prototype.destroy.call(this)
            }, d.fromFrames = function (a) {
                for (var b = [], c = 0; c < a.length; ++c) b.push(new e.Texture.fromFrame(a[c]));
                return new d(b)
            }, d.fromImages = function (a) {
                for (var b = [], c = 0; c < a.length; ++c) b.push(new e.Texture.fromImage(a[c]));
                return new d(b)
            }
        }, {"../core": 30}],
        82: [function (a, b, c) {
            function d(a, b, c) {
                e.Sprite.call(this, a), this.tileScale = new e.Point(1, 1), this.tilePosition = new e.Point(0, 0), this._width = b || 100, this._height = c || 100, this._uvs = new e.TextureUvs, this._canvasPattern = null, this.shader = new e.AbstractFilter(["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform mat3 projectionMatrix;", "uniform vec4 uFrame;", "uniform vec4 uTransform;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vec2 coord = aTextureCoord;", "   coord -= uTransform.xy;", "   coord /= uTransform.zw;", "   vTextureCoord = coord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", "}"].join("\n"), ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform vec4 uFrame;", "uniform vec2 uPixelSize;", "void main(void){", "   vec2 coord = mod(vTextureCoord, uFrame.zw);", "   coord = clamp(coord, uPixelSize, uFrame.zw - uPixelSize);", "   coord += uFrame.xy;", "   gl_FragColor =  texture2D(uSampler, coord) * vColor ;", "}"].join("\n"), {
                    uFrame: {
                        type: "4fv",
                        value: [0, 0, 1, 1]
                    }, uTransform: {type: "4fv", value: [0, 0, 1, 1]}, uPixelSize: {type: "2fv", value: [1, 1]}
                })
            }

            var e = a("../core"), f = new e.Point, g = a("../core/renderers/canvas/utils/CanvasTinter");
            d.prototype = Object.create(e.Sprite.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                width: {
                    get: function () {
                        return this._width
                    }, set: function (a) {
                        this._width = a
                    }
                }, height: {
                    get: function () {
                        return this._height
                    }, set: function (a) {
                        this._height = a
                    }
                }
            }), d.prototype._onTextureUpdate = function () {
            }, d.prototype._renderWebGL = function (a) {
                var b = this._texture;
                if (b && b._uvs) {
                    var c = b._uvs, d = b._frame.width, e = b._frame.height, f = b.baseTexture.width,
                        g = b.baseTexture.height;
                    b._uvs = this._uvs, b._frame.width = this.width, b._frame.height = this.height, this.shader.uniforms.uPixelSize.value[0] = 1 / f, this.shader.uniforms.uPixelSize.value[1] = 1 / g, this.shader.uniforms.uFrame.value[0] = c.x0, this.shader.uniforms.uFrame.value[1] = c.y0, this.shader.uniforms.uFrame.value[2] = c.x1 - c.x0, this.shader.uniforms.uFrame.value[3] = c.y2 - c.y0, this.shader.uniforms.uTransform.value[0] = this.tilePosition.x % (d * this.tileScale.x) / this._width, this.shader.uniforms.uTransform.value[1] = this.tilePosition.y % (e * this.tileScale.y) / this._height, this.shader.uniforms.uTransform.value[2] = f / this._width * this.tileScale.x, this.shader.uniforms.uTransform.value[3] = g / this._height * this.tileScale.y, a.setObjectRenderer(a.plugins.sprite), a.plugins.sprite.render(this), b._uvs = c, b._frame.width = d, b._frame.height = e
                }
            }, d.prototype._renderCanvas = function (a) {
                var b = this._texture;
                if (b.baseTexture.hasLoaded) {
                    var c = a.context, d = this.worldTransform, f = a.resolution, h = b.baseTexture,
                        i = this.tilePosition.x / this.tileScale.x % b._frame.width,
                        j = this.tilePosition.y / this.tileScale.y % b._frame.height;
                    if (!this._canvasPattern) {
                        var k = new e.CanvasBuffer(b._frame.width, b._frame.height);
                        16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = g.getTintedTexture(this, this.tint)), k.context.drawImage(this.tintedTexture, 0, 0)) : k.context.drawImage(h.source, -b._frame.x, -b._frame.y), this._canvasPattern = k.context.createPattern(k.canvas, "repeat")
                    }
                    c.globalAlpha = this.worldAlpha, c.setTransform(d.a * f, d.b * f, d.c * f, d.d * f, d.tx * f, d.ty * f), c.scale(this.tileScale.x, this.tileScale.y), c.translate(i + this.anchor.x * -this._width, j + this.anchor.y * -this._height);
                    var l = a.blendModes[this.blendMode];
                    l !== a.context.globalCompositeOperation && (c.globalCompositeOperation = l), c.fillStyle = this._canvasPattern, c.fillRect(-i, -j, this._width / this.tileScale.x, this._height / this.tileScale.y)
                }
            }, d.prototype.getBounds = function () {
                var a, b, c, d, e = this._width, f = this._height, g = e * (1 - this.anchor.x), h = e * -this.anchor.x,
                    i = f * (1 - this.anchor.y), j = f * -this.anchor.y, k = this.worldTransform, l = k.a, m = k.b,
                    n = k.c, o = k.d, p = k.tx, q = k.ty, r = l * h + n * j + p, s = o * j + m * h + q,
                    t = l * g + n * j + p, u = o * j + m * g + q, v = l * g + n * i + p, w = o * i + m * g + q,
                    x = l * h + n * i + p, y = o * i + m * h + q;
                a = r, a = a > t ? t : a, a = a > v ? v : a, a = a > x ? x : a, c = s, c = c > u ? u : c, c = c > w ? w : c, c = c > y ? y : c, b = r, b = t > b ? t : b, b = v > b ? v : b, b = x > b ? x : b, d = s, d = u > d ? u : d, d = w > d ? w : d, d = y > d ? y : d;
                var z = this._bounds;
                return z.x = a, z.width = b - a, z.y = c, z.height = d - c, this._currentBounds = z, z
            }, d.prototype.containsPoint = function (a) {
                this.worldTransform.applyInverse(a, f);
                var b, c = this._width, d = this._height, e = -c * this.anchor.x;
                return f.x > e && f.x < e + c && (b = -d * this.anchor.y, f.y > b && f.y < b + d)
            }, d.prototype.destroy = function () {
                e.Sprite.prototype.destroy.call(this), this.tileScale = null, this._tileScaleOffset = null, this.tilePosition = null, this._uvs = null
            }, d.fromFrame = function (a, b, c) {
                var f = e.utils.TextureCache[a];
                if (!f) throw new Error('The frameId "' + a + '" does not exist in the texture cache ' + this);
                return new d(f, b, c)
            }, d.fromImage = function (a, b, c, f, g) {
                return new d(e.Texture.fromImage(a, f, g), b, c)
            }
        }, {"../core": 30, "../core/renderers/canvas/utils/CanvasTinter": 48}],
        83: [function (a, b, c) {
            var d = a("../core"), e = d.DisplayObject, f = new d.Matrix;
            e.prototype._cacheAsBitmap = !1, e.prototype._originalRenderWebGL = null, e.prototype._originalRenderCanvas = null, e.prototype._originalUpdateTransform = null, e.prototype._originalHitTest = null, e.prototype._originalDestroy = null, e.prototype._cachedSprite = null, Object.defineProperties(e.prototype, {
                cacheAsBitmap: {
                    get: function () {
                        return this._cacheAsBitmap
                    }, set: function (a) {
                        this._cacheAsBitmap !== a && (this._cacheAsBitmap = a, a ? (this._originalRenderWebGL = this.renderWebGL, this._originalRenderCanvas = this.renderCanvas, this._originalUpdateTransform = this.updateTransform, this._originalGetBounds = this.getBounds, this._originalDestroy = this.destroy, this._originalContainsPoint = this.containsPoint, this.renderWebGL = this._renderCachedWebGL, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (this._cachedSprite && this._destroyCachedDisplayObject(), this.renderWebGL = this._originalRenderWebGL, this.renderCanvas = this._originalRenderCanvas, this.getBounds = this._originalGetBounds, this.destroy = this._originalDestroy, this.updateTransform = this._originalUpdateTransform, this.containsPoint = this._originalContainsPoint))
                    }
                }
            }), e.prototype._renderCachedWebGL = function (a) {
                !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(a), this._cachedSprite.worldAlpha = this.worldAlpha, a.setObjectRenderer(a.plugins.sprite), a.plugins.sprite.render(this._cachedSprite))
            }, e.prototype._initCachedDisplayObject = function (a) {
                if (!this._cachedSprite) {
                    a.currentRenderer.flush();
                    var b = this.getLocalBounds().clone();
                    if (this._filters) {
                        var c = this._filters[0].padding;
                        b.x -= c, b.y -= c, b.width += 2 * c, b.height += 2 * c
                    }
                    var e = a.currentRenderTarget, g = a.filterManager.filterStack,
                        h = new d.RenderTexture(a, 0 | b.width, 0 | b.height), i = f;
                    i.tx = -b.x, i.ty = -b.y, this.renderWebGL = this._originalRenderWebGL, h.render(this, i, !0, !0), a.setRenderTarget(e), a.filterManager.filterStack = g, this.renderWebGL = this._renderCachedWebGL, this.updateTransform = this.displayObjectUpdateTransform, this.getBounds = this._getCachedBounds, this._cachedSprite = new d.Sprite(h), this._cachedSprite.worldTransform = this.worldTransform, this._cachedSprite.anchor.x = -(b.x / b.width), this._cachedSprite.anchor.y = -(b.y / b.height), this.updateTransform(), this.containsPoint = this._cachedSprite.containsPoint.bind(this._cachedSprite)
                }
            }, e.prototype._renderCachedCanvas = function (a) {
                !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(a), this._cachedSprite.worldAlpha = this.worldAlpha, this._cachedSprite.renderCanvas(a))
            }, e.prototype._initCachedDisplayObjectCanvas = function (a) {
                if (!this._cachedSprite) {
                    var b = this.getLocalBounds(), c = a.context, e = new d.RenderTexture(a, 0 | b.width, 0 | b.height),
                        g = f;
                    g.tx = -b.x, g.ty = -b.y, this.renderCanvas = this._originalRenderCanvas, e.render(this, g, !0), a.context = c, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.getBounds = this._getCachedBounds, this._cachedSprite = new d.Sprite(e), this._cachedSprite.worldTransform = this.worldTransform, this._cachedSprite.anchor.x = -(b.x / b.width), this._cachedSprite.anchor.y = -(b.y / b.height), this.updateTransform(), this.containsPoint = this._cachedSprite.containsPoint.bind(this._cachedSprite)
                }
            }, e.prototype._getCachedBounds = function () {
                return this._cachedSprite._currentBounds = null, this._cachedSprite.getBounds()
            }, e.prototype._destroyCachedDisplayObject = function () {
                this._cachedSprite._texture.destroy(), this._cachedSprite = null
            }, e.prototype._cacheAsBitmapDestroy = function () {
                this.cacheAsBitmap = !1, this._originalDestroy()
            }
        }, {"../core": 30}],
        84: [function (a, b, c) {
            var d = a("../core");
            d.DisplayObject.prototype.name = null, d.Container.prototype.getChildByName = function (a) {
                for (var b = 0; b < this.children.length; b++) if (this.children[b].name === a) return this.children[b];
                return null
            }
        }, {"../core": 30}],
        85: [function (a, b, c) {
            var d = a("../core");
            d.DisplayObject.prototype.getGlobalPosition = function (a) {
                return a = a || new d.Point, this.parent ? (this.displayObjectUpdateTransform(), a.x = this.worldTransform.tx, a.y = this.worldTransform.ty) : (a.x = this.position.x, a.y = this.position.y), a
            }
        }, {"../core": 30}],
        86: [function (a, b, c) {
            a("./cacheAsBitmap"), a("./getChildByName"), a("./getGlobalPosition"), b.exports = {
                MovieClip: a("./MovieClip"),
                TilingSprite: a("./TilingSprite"),
                BitmapText: a("./BitmapText")
            }
        }, {
            "./BitmapText": 80,
            "./MovieClip": 81,
            "./TilingSprite": 82,
            "./cacheAsBitmap": 83,
            "./getChildByName": 84,
            "./getGlobalPosition": 85
        }],
        87: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nuniform vec4 dimensions;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 uv = gl_FragCoord.xy;\n\n    vec3 col = texture2D(uSampler, floor( uv / pixelSize ) * pixelSize / dimensions.xy).rgb;\n\n    float gray = (col.r + col.g + col.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    vec2 p = mod( uv / ( pixelSize * 0.5 ), 2.0) - vec2(1.0);\n    col = col * character(n, p);\n\n    gl_FragColor = vec4(col, 1.0);\n}\n", {
                    dimensions: {
                        type: "4fv",
                        value: new Float32Array([0, 0, 0, 0])
                    }, pixelSize: {type: "1f", value: 8}
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                size: {
                    get: function () {
                        return this.uniforms.pixelSize.value
                    }, set: function (a) {
                        this.uniforms.pixelSize.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        88: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this), this.blurXFilter = new f, this.blurYFilter = new g, this.defaultFilter = new e.AbstractFilter
            }

            var e = a("../../core"), f = a("../blur/BlurXFilter"), g = a("../blur/BlurYFilter");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c) {
                var d = a.filterManager.getRenderTarget(!0);
                this.defaultFilter.applyFilter(a, b, c), this.blurXFilter.applyFilter(a, b, d), a.blendModeManager.setBlendMode(e.BLEND_MODES.SCREEN), this.blurYFilter.applyFilter(a, d, c), a.blendModeManager.setBlendMode(e.BLEND_MODES.NORMAL), a.filterManager.returnRenderTarget(d)
            }, Object.defineProperties(d.prototype, {
                blur: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (a) {
                        this.blurXFilter.blur = this.blurYFilter.blur = a
                    }
                }, blurX: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (a) {
                        this.blurXFilter.blur = a
                    }
                }, blurY: {
                    get: function () {
                        return this.blurYFilter.blur
                    }, set: function (a) {
                        this.blurYFilter.blur = a
                    }
                }
            })
        }, {"../../core": 30, "../blur/BlurXFilter": 91, "../blur/BlurYFilter": 92}],
        89: [function (a, b, c) {
            function d(a, b) {
                e.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform float dirX;\nuniform float dirY;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[3];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[0] = aTextureCoord + vec2( (0.004 * strength) * dirX, (0.004 * strength) * dirY );\n    vBlurTexCoords[1] = aTextureCoord + vec2( (0.008 * strength) * dirX, (0.008 * strength) * dirY );\n    vBlurTexCoords[2] = aTextureCoord + vec2( (0.012 * strength) * dirX, (0.012 * strength) * dirY );\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[3];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vTextureCoord     ) * 0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0]) * 0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1]) * 0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2]) * 0.004431848411938341;\n}\n", {
                    strength: {
                        type: "1f",
                        value: 1
                    }, dirX: {type: "1f", value: a || 0}, dirY: {type: "1f", value: b || 0}
                }), this.defaultFilter = new e.AbstractFilter, this.passes = 1, this.dirX = a || 0, this.dirY = b || 0, this.strength = 4
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c, d) {
                var e = this.getShader(a);
                if (this.uniforms.strength.value = this.strength / 4 / this.passes * (b.frame.width / b.size.width), 1 === this.passes) a.filterManager.applyFilter(e, b, c, d); else {
                    var f = a.filterManager.getRenderTarget(!0);
                    a.filterManager.applyFilter(e, b, f, d);
                    for (var g = 0; g < this.passes - 2; g++) a.filterManager.applyFilter(e, f, f, d);
                    a.filterManager.applyFilter(e, f, c, d), a.filterManager.returnRenderTarget(f)
                }
            }, Object.defineProperties(d.prototype, {
                blur: {
                    get: function () {
                        return this.strength
                    }, set: function (a) {
                        this.padding = .5 * a, this.strength = a
                    }
                }, dirX: {
                    get: function () {
                        return this.dirX
                    }, set: function (a) {
                        this.uniforms.dirX.value = a
                    }
                }, dirY: {
                    get: function () {
                        return this.dirY
                    }, set: function (a) {
                        this.uniforms.dirY.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        90: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this), this.blurXFilter = new f, this.blurYFilter = new g
            }

            var e = a("../../core"), f = a("./BlurXFilter"), g = a("./BlurYFilter");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c) {
                var d = a.filterManager.getRenderTarget(!0);
                this.blurXFilter.applyFilter(a, b, d), this.blurYFilter.applyFilter(a, d, c), a.filterManager.returnRenderTarget(d)
            }, Object.defineProperties(d.prototype, {
                blur: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (a) {
                        this.padding = .5 * Math.abs(a), this.blurXFilter.blur = this.blurYFilter.blur = a
                    }
                }, passes: {
                    get: function () {
                        return this.blurXFilter.passes
                    }, set: function (a) {
                        this.blurXFilter.passes = this.blurYFilter.passes = a
                    }
                }, blurX: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (a) {
                        this.blurXFilter.blur = a
                    }
                }, blurY: {
                    get: function () {
                        return this.blurYFilter.blur
                    }, set: function (a) {
                        this.blurYFilter.blur = a
                    }
                }
            })
        }, {"../../core": 30, "./BlurXFilter": 91, "./BlurYFilter": 92}],
        91: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(-0.012 * strength, 0.0);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(-0.008 * strength, 0.0);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(-0.004 * strength, 0.0);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2( 0.004 * strength, 0.0);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2( 0.008 * strength, 0.0);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2( 0.012 * strength, 0.0);\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n", {
                    strength: {
                        type: "1f",
                        value: 1
                    }
                }), this.passes = 1, this.strength = 4
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c, d) {
                var e = this.getShader(a);
                if (this.uniforms.strength.value = this.strength / 4 / this.passes * (b.frame.width / b.size.width), 1 === this.passes) a.filterManager.applyFilter(e, b, c, d); else {
                    for (var f = a.filterManager.getRenderTarget(!0), g = b, h = f, i = 0; i < this.passes - 1; i++) {
                        a.filterManager.applyFilter(e, g, h, !0);
                        var j = h;
                        h = g, g = j
                    }
                    a.filterManager.applyFilter(e, g, c, d), a.filterManager.returnRenderTarget(f)
                }
            }, Object.defineProperties(d.prototype, {
                blur: {
                    get: function () {
                        return this.strength
                    }, set: function (a) {
                        this.padding = .5 * Math.abs(a), this.strength = a
                    }
                }
            })
        }, {"../../core": 30}],
        92: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n", {
                    strength: {
                        type: "1f",
                        value: 1
                    }
                }), this.passes = 1, this.strength = 4
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c, d) {
                var e = this.getShader(a);
                if (this.uniforms.strength.value = Math.abs(this.strength) / 4 / this.passes * (b.frame.height / b.size.height), 1 === this.passes) a.filterManager.applyFilter(e, b, c, d); else {
                    for (var f = a.filterManager.getRenderTarget(!0), g = b, h = f, i = 0; i < this.passes - 1; i++) {
                        a.filterManager.applyFilter(e, g, h, !0);
                        var j = h;
                        h = g, g = j
                    }
                    a.filterManager.applyFilter(e, g, c, d), a.filterManager.returnRenderTarget(f)
                }
            }, Object.defineProperties(d.prototype, {
                blur: {
                    get: function () {
                        return this.strength
                    }, set: function (a) {
                        this.padding = .5 * Math.abs(a), this.strength = a
                    }
                }
            })
        }, {"../../core": 30}],
        93: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 delta;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta * percent);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n", {
                    delta: {
                        type: "v2",
                        value: {x: .1, y: 0}
                    }
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d
        }, {"../../core": 30}],
        94: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[25];\n\nvoid main(void)\n{\n\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.r = (m[0] * c.r);\n        gl_FragColor.r += (m[1] * c.g);\n        gl_FragColor.r += (m[2] * c.b);\n        gl_FragColor.r += (m[3] * c.a);\n        gl_FragColor.r += m[4];\n\n    gl_FragColor.g = (m[5] * c.r);\n        gl_FragColor.g += (m[6] * c.g);\n        gl_FragColor.g += (m[7] * c.b);\n        gl_FragColor.g += (m[8] * c.a);\n        gl_FragColor.g += m[9];\n\n     gl_FragColor.b = (m[10] * c.r);\n        gl_FragColor.b += (m[11] * c.g);\n        gl_FragColor.b += (m[12] * c.b);\n        gl_FragColor.b += (m[13] * c.a);\n        gl_FragColor.b += m[14];\n\n     gl_FragColor.a = (m[15] * c.r);\n        gl_FragColor.a += (m[16] * c.g);\n        gl_FragColor.a += (m[17] * c.b);\n        gl_FragColor.a += (m[18] * c.a);\n        gl_FragColor.a += m[19];\n\n}\n", {
                    m: {
                        type: "1fv",
                        value: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
                    }
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype._loadMatrix = function (a, b) {
                b = !!b;
                var c = a;
                b && (this._multiply(c, this.uniforms.m.value, a), c = this._colorMatrix(c)), this.uniforms.m.value = c
            }, d.prototype._multiply = function (a, b, c) {
                return a[0] = b[0] * c[0] + b[1] * c[5] + b[2] * c[10] + b[3] * c[15], a[1] = b[0] * c[1] + b[1] * c[6] + b[2] * c[11] + b[3] * c[16], a[2] = b[0] * c[2] + b[1] * c[7] + b[2] * c[12] + b[3] * c[17], a[3] = b[0] * c[3] + b[1] * c[8] + b[2] * c[13] + b[3] * c[18], a[4] = b[0] * c[4] + b[1] * c[9] + b[2] * c[14] + b[3] * c[19], a[5] = b[5] * c[0] + b[6] * c[5] + b[7] * c[10] + b[8] * c[15], a[6] = b[5] * c[1] + b[6] * c[6] + b[7] * c[11] + b[8] * c[16], a[7] = b[5] * c[2] + b[6] * c[7] + b[7] * c[12] + b[8] * c[17], a[8] = b[5] * c[3] + b[6] * c[8] + b[7] * c[13] + b[8] * c[18], a[9] = b[5] * c[4] + b[6] * c[9] + b[7] * c[14] + b[8] * c[19], a[10] = b[10] * c[0] + b[11] * c[5] + b[12] * c[10] + b[13] * c[15], a[11] = b[10] * c[1] + b[11] * c[6] + b[12] * c[11] + b[13] * c[16], a[12] = b[10] * c[2] + b[11] * c[7] + b[12] * c[12] + b[13] * c[17], a[13] = b[10] * c[3] + b[11] * c[8] + b[12] * c[13] + b[13] * c[18], a[14] = b[10] * c[4] + b[11] * c[9] + b[12] * c[14] + b[13] * c[19], a[15] = b[15] * c[0] + b[16] * c[5] + b[17] * c[10] + b[18] * c[15], a[16] = b[15] * c[1] + b[16] * c[6] + b[17] * c[11] + b[18] * c[16], a[17] = b[15] * c[2] + b[16] * c[7] + b[17] * c[12] + b[18] * c[17], a[18] = b[15] * c[3] + b[16] * c[8] + b[17] * c[13] + b[18] * c[18], a[19] = b[15] * c[4] + b[16] * c[9] + b[17] * c[14] + b[18] * c[19], a
            }, d.prototype._colorMatrix = function (a) {
                var b = new Float32Array(a);
                return b[4] /= 255, b[9] /= 255, b[14] /= 255, b[19] /= 255, b
            }, d.prototype.brightness = function (a, b) {
                var c = [a, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(c, b)
            }, d.prototype.greyscale = function (a, b) {
                var c = [a, a, a, 0, 0, a, a, a, 0, 0, a, a, a, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(c, b)
            }, d.prototype.grayscale = d.prototype.greyscale, d.prototype.blackAndWhite = function (a) {
                var b = [.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(b, a)
            }, d.prototype.hue = function (a, b) {
                a = (a || 0) / 180 * Math.PI;
                var c = Math.cos(a), d = Math.sin(a), e = .213, f = .715, g = .072,
                    h = [e + c * (1 - e) + d * -e, f + c * -f + d * -f, g + c * -g + d * (1 - g), 0, 0, e + c * -e + .143 * d, f + c * (1 - f) + .14 * d, g + c * -g + d * -.283, 0, 0, e + c * -e + d * -(1 - e), f + c * -f + d * f, g + c * (1 - g) + d * g, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(h, b)
            }, d.prototype.contrast = function (a, b) {
                var c = (a || 0) + 1, d = -128 * (c - 1),
                    e = [c, 0, 0, 0, d, 0, c, 0, 0, d, 0, 0, c, 0, d, 0, 0, 0, 1, 0];
                this._loadMatrix(e, b)
            }, d.prototype.saturate = function (a, b) {
                var c = 2 * (a || 0) / 3 + 1, d = (c - 1) * -.5,
                    e = [c, d, d, 0, 0, d, c, d, 0, 0, d, d, c, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, b)
            }, d.prototype.desaturate = function (a) {
                this.saturate(-1)
            }, d.prototype.negative = function (a) {
                var b = [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(b, a)
            }, d.prototype.sepia = function (a) {
                var b = [.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(b, a)
            }, d.prototype.technicolor = function (a) {
                var b = [1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0];
                this._loadMatrix(b, a)
            }, d.prototype.polaroid = function (a) {
                var b = [1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(b, a)
            }, d.prototype.toBGR = function (a) {
                var b = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(b, a)
            }, d.prototype.kodachrome = function (a) {
                var b = [1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0];
                this._loadMatrix(b, a)
            }, d.prototype.browni = function (a) {
                var b = [.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0];
                this._loadMatrix(b, a)
            }, d.prototype.vintage = function (a) {
                var b = [.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0];
                this._loadMatrix(b, a)
            }, d.prototype.colorTone = function (a, b, c, d, e) {
                a = a || .2, b = b || .15, c = c || 16770432, d = d || 3375104;
                var f = (c >> 16 & 255) / 255, g = (c >> 8 & 255) / 255, h = (255 & c) / 255, i = (d >> 16 & 255) / 255,
                    j = (d >> 8 & 255) / 255, k = (255 & d) / 255,
                    l = [.3, .59, .11, 0, 0, f, g, h, a, 0, i, j, k, b, 0, f - i, g - j, h - k, 0, 0];
                this._loadMatrix(l, e)
            }, d.prototype.night = function (a, b) {
                a = a || .1;
                var c = [-2 * a, -a, 0, 0, 0, -a, 0, a, 0, 0, 0, a, 2 * a, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(c, b)
            }, d.prototype.predator = function (a, b) {
                var c = [11.224130630493164 * a, -4.794486999511719 * a, -2.8746118545532227 * a, 0 * a, .40342438220977783 * a, -3.6330697536468506 * a, 9.193157196044922 * a, -2.951810836791992 * a, 0 * a, -1.316135048866272 * a, -3.2184197902679443 * a, -4.2375030517578125 * a, 7.476448059082031 * a, 0 * a, .8044459223747253 * a, 0, 0, 0, 1, 0];
                this._loadMatrix(c, b)
            }, d.prototype.lsd = function (a) {
                var b = [2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(b, a)
            }, d.prototype.reset = function () {
                var a = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(a, !1)
            }, Object.defineProperties(d.prototype, {
                matrix: {
                    get: function () {
                        return this.uniforms.m.value
                    }, set: function (a) {
                        this.uniforms.m.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        95: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float step;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    color = floor(color * step) / step;\n\n    gl_FragColor = color;\n}\n", {
                    step: {
                        type: "1f",
                        value: 5
                    }
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                step: {
                    get: function () {
                        return this.uniforms.step.value
                    }, set: function (a) {
                        this.uniforms.step.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        96: [function (a, b, c) {
            function d(a, b, c) {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n", {
                    matrix: {
                        type: "1fv",
                        value: new Float32Array(a)
                    }, texelSize: {type: "v2", value: {x: 1 / b, y: 1 / c}}
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                matrix: {
                    get: function () {
                        return this.uniforms.matrix.value
                    }, set: function (a) {
                        this.uniforms.matrix.value = new Float32Array(a)
                    }
                }, width: {
                    get: function () {
                        return 1 / this.uniforms.texelSize.value.x
                    }, set: function (a) {
                        this.uniforms.texelSize.value.x = 1 / a
                    }
                }, height: {
                    get: function () {
                        return 1 / this.uniforms.texelSize.value.y
                    }, set: function (a) {
                        this.uniforms.texelSize.value.y = 1 / a
                    }
                }
            })
        }, {"../../core": 30}],
        97: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n")
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d
        }, {"../../core": 30}],
        98: [function (a, b, c) {
            function d(a, b) {
                var c = new e.Matrix;
                a.renderable = !1, e.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vMapCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision mediump float;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vMapCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y));\n}\n", {
                    mapSampler: {
                        type: "sampler2D",
                        value: a.texture
                    }, otherMatrix: {type: "mat3", value: c.toArray(!0)}, scale: {type: "v2", value: {x: 1, y: 1}}
                }), this.maskSprite = a, this.maskMatrix = c, (null === b || void 0 === b) && (b = 20), this.scale = new e.Point(b, b)
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c) {
                var d = a.filterManager;
                d.calculateMappedMatrix(b.frame, this.maskSprite, this.maskMatrix), this.uniforms.otherMatrix.value = this.maskMatrix.toArray(!0), this.uniforms.scale.value.x = this.scale.x * (1 / b.frame.width), this.uniforms.scale.value.y = this.scale.y * (1 / b.frame.height);
                var e = this.getShader(a);
                d.applyFilter(e, b, c)
            }, Object.defineProperties(d.prototype, {
                map: {
                    get: function () {
                        return this.uniforms.mapSampler.value
                    }, set: function (a) {
                        this.uniforms.mapSampler.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        99: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 dimensions;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * dimensions.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n", {
                    scale: {
                        type: "1f",
                        value: 1
                    }, angle: {type: "1f", value: 5}, dimensions: {type: "4fv", value: [0, 0, 0, 0]}
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                scale: {
                    get: function () {
                        return this.uniforms.scale.value
                    }, set: function (a) {
                        this.uniforms.scale.value = a
                    }
                }, angle: {
                    get: function () {
                        return this.uniforms.angle.value
                    }, set: function (a) {
                        this.uniforms.angle.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        100: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform vec2 offset;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition+offset), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform vec3 color;\nuniform float alpha;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec4 sum = vec4(0.0);\n\n    sum += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    sum += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    sum += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    sum += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    sum += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n\n    gl_FragColor = vec4( color.rgb * sum.a * alpha, sum.a * alpha );\n}\n", {
                    blur: {
                        type: "1f",
                        value: 1 / 512
                    },
                    color: {type: "c", value: [0, 0, 0]},
                    alpha: {type: "1f", value: .7},
                    offset: {type: "2f", value: [5, 5]},
                    strength: {type: "1f", value: 1}
                }), this.passes = 1, this.strength = 4
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c, d) {
                var e = this.getShader(a);
                if (this.uniforms.strength.value = this.strength / 4 / this.passes * (b.frame.height / b.size.height), 1 === this.passes) a.filterManager.applyFilter(e, b, c, d); else {
                    for (var f = a.filterManager.getRenderTarget(!0), g = b, h = f, i = 0; i < this.passes - 1; i++) {
                        a.filterManager.applyFilter(e, g, h, d);
                        var j = h;
                        h = g, g = j
                    }
                    a.filterManager.applyFilter(e, g, c, d), a.filterManager.returnRenderTarget(f)
                }
            }, Object.defineProperties(d.prototype, {
                blur: {
                    get: function () {
                        return this.strength
                    }, set: function (a) {
                        this.padding = .5 * a, this.strength = a
                    }
                }
            })
        }, {"../../core": 30}],
        101: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this), this.blurXFilter = new f, this.blurYTintFilter = new g, this.defaultFilter = new e.AbstractFilter, this.padding = 30, this._dirtyPosition = !0, this._angle = 45 * Math.PI / 180, this._distance = 10, this.alpha = .75, this.hideObject = !1, this.blendMode = e.BLEND_MODES.MULTIPLY
            }

            var e = a("../../core"), f = a("../blur/BlurXFilter"), g = a("./BlurYTintFilter");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c) {
                var d = a.filterManager.getRenderTarget(!0);
                this._dirtyPosition && (this._dirtyPosition = !1, this.blurYTintFilter.uniforms.offset.value[0] = Math.sin(this._angle) * this._distance, this.blurYTintFilter.uniforms.offset.value[1] = Math.cos(this._angle) * this._distance), this.blurXFilter.applyFilter(a, b, d), a.blendModeManager.setBlendMode(this.blendMode), this.blurYTintFilter.applyFilter(a, d, c), a.blendModeManager.setBlendMode(e.BLEND_MODES.NORMAL), this.hideObject || this.defaultFilter.applyFilter(a, b, c), a.filterManager.returnRenderTarget(d)
            }, Object.defineProperties(d.prototype, {
                blur: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (a) {
                        this.blurXFilter.blur = this.blurYTintFilter.blur = a
                    }
                }, blurX: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (a) {
                        this.blurXFilter.blur = a
                    }
                }, blurY: {
                    get: function () {
                        return this.blurYTintFilter.blur
                    }, set: function (a) {
                        this.blurYTintFilter.blur = a
                    }
                }, color: {
                    get: function () {
                        return e.utils.rgb2hex(this.blurYTintFilter.uniforms.color.value)
                    }, set: function (a) {
                        this.blurYTintFilter.uniforms.color.value = e.utils.hex2rgb(a)
                    }
                }, alpha: {
                    get: function () {
                        return this.blurYTintFilter.uniforms.alpha.value
                    }, set: function (a) {
                        this.blurYTintFilter.uniforms.alpha.value = a
                    }
                }, distance: {
                    get: function () {
                        return this._distance
                    }, set: function (a) {
                        this._dirtyPosition = !0, this._distance = a
                    }
                }, angle: {
                    get: function () {
                        return this._angle
                    }, set: function (a) {
                        this._dirtyPosition = !0, this._angle = a
                    }
                }
            })
        }, {"../../core": 30, "../blur/BlurXFilter": 91, "./BlurYTintFilter": 100}],
        102: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float gray;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);\n}\n", {
                    gray: {
                        type: "1f",
                        value: 1
                    }
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                gray: {
                    get: function () {
                        return this.uniforms.gray.value
                    }, set: function (a) {
                        this.uniforms.gray.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        103: [function (a, b, c) {
            b.exports = {
                AsciiFilter: a("./ascii/AsciiFilter"),
                BloomFilter: a("./bloom/BloomFilter"),
                BlurFilter: a("./blur/BlurFilter"),
                BlurXFilter: a("./blur/BlurXFilter"),
                BlurYFilter: a("./blur/BlurYFilter"),
                BlurDirFilter: a("./blur/BlurDirFilter"),
                ColorMatrixFilter: a("./color/ColorMatrixFilter"),
                ColorStepFilter: a("./color/ColorStepFilter"),
                ConvolutionFilter: a("./convolution/ConvolutionFilter"),
                CrossHatchFilter: a("./crosshatch/CrossHatchFilter"),
                DisplacementFilter: a("./displacement/DisplacementFilter"),
                DotScreenFilter: a("./dot/DotScreenFilter"),
                GrayFilter: a("./gray/GrayFilter"),
                DropShadowFilter: a("./dropshadow/DropShadowFilter"),
                InvertFilter: a("./invert/InvertFilter"),
                NoiseFilter: a("./noise/NoiseFilter"),
                PixelateFilter: a("./pixelate/PixelateFilter"),
                RGBSplitFilter: a("./rgb/RGBSplitFilter"),
                ShockwaveFilter: a("./shockwave/ShockwaveFilter"),
                SepiaFilter: a("./sepia/SepiaFilter"),
                SmartBlurFilter: a("./blur/SmartBlurFilter"),
                TiltShiftFilter: a("./tiltshift/TiltShiftFilter"),
                TiltShiftXFilter: a("./tiltshift/TiltShiftXFilter"),
                TiltShiftYFilter: a("./tiltshift/TiltShiftYFilter"),
                TwistFilter: a("./twist/TwistFilter")
            }
        }, {
            "./ascii/AsciiFilter": 87,
            "./bloom/BloomFilter": 88,
            "./blur/BlurDirFilter": 89,
            "./blur/BlurFilter": 90,
            "./blur/BlurXFilter": 91,
            "./blur/BlurYFilter": 92,
            "./blur/SmartBlurFilter": 93,
            "./color/ColorMatrixFilter": 94,
            "./color/ColorStepFilter": 95,
            "./convolution/ConvolutionFilter": 96,
            "./crosshatch/CrossHatchFilter": 97,
            "./displacement/DisplacementFilter": 98,
            "./dot/DotScreenFilter": 99,
            "./dropshadow/DropShadowFilter": 101,
            "./gray/GrayFilter": 102,
            "./invert/InvertFilter": 104,
            "./noise/NoiseFilter": 105,
            "./pixelate/PixelateFilter": 106,
            "./rgb/RGBSplitFilter": 107,
            "./sepia/SepiaFilter": 108,
            "./shockwave/ShockwaveFilter": 109,
            "./tiltshift/TiltShiftFilter": 111,
            "./tiltshift/TiltShiftXFilter": 112,
            "./tiltshift/TiltShiftYFilter": 113,
            "./twist/TwistFilter": 114
        }],
        104: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform float invert;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);\n}\n", {
                    invert: {
                        type: "1f",
                        value: 1
                    }
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                invert: {
                    get: function () {
                        return this.uniforms.invert.value
                    }, set: function (a) {
                        this.uniforms.invert.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        105: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(vTextureCoord) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n", {
                    noise: {
                        type: "1f",
                        value: .5
                    }
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                noise: {
                    get: function () {
                        return this.uniforms.noise.value
                    }, set: function (a) {
                        this.uniforms.noise.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        106: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 dimensions;\nuniform vec2 pixelSize;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord;\n\n    vec2 size = dimensions.xy / pixelSize;\n\n    vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;\n\n    gl_FragColor = texture2D(uSampler, color);\n}\n", {
                    dimensions: {
                        type: "4fv",
                        value: new Float32Array([0, 0, 0, 0])
                    }, pixelSize: {type: "v2", value: {x: 10, y: 10}}
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                size: {
                    get: function () {
                        return this.uniforms.pixelSize.value
                    }, set: function (a) {
                        this.uniforms.pixelSize.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        107: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 dimensions;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n", {
                    red: {
                        type: "v2",
                        value: {x: 20, y: 20}
                    },
                    green: {type: "v2", value: {x: -20, y: 20}},
                    blue: {type: "v2", value: {x: 20, y: -20}},
                    dimensions: {type: "4fv", value: [0, 0, 0, 0]}
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                red: {
                    get: function () {
                        return this.uniforms.red.value
                    }, set: function (a) {
                        this.uniforms.red.value = a
                    }
                }, green: {
                    get: function () {
                        return this.uniforms.green.value
                    }, set: function (a) {
                        this.uniforms.green.value = a
                    }
                }, blue: {
                    get: function () {
                        return this.uniforms.blue.value
                    }, set: function (a) {
                        this.uniforms.blue.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        108: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float sepia;\n\nconst mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);\n}\n", {
                    sepia: {
                        type: "1f",
                        value: 1
                    }
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                sepia: {
                    get: function () {
                        return this.uniforms.sepia.value
                    }, set: function (a) {
                        this.uniforms.sepia.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        109: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nuniform vec2 center;\nuniform vec3 params; // 10.0, 0.8, 0.1\nuniform float time;\n\nvoid main()\n{\n    vec2 uv = vTextureCoord;\n    vec2 texCoord = uv;\n\n    float dist = distance(uv, center);\n\n    if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )\n    {\n        float diff = (dist - time);\n        float powDiff = 1.0 - pow(abs(diff*params.x), params.y);\n\n        float diffTime = diff  * powDiff;\n        vec2 diffUV = normalize(uv - center);\n        texCoord = uv + (diffUV * diffTime);\n    }\n\n    gl_FragColor = texture2D(uSampler, texCoord);\n}\n", {
                    center: {
                        type: "v2",
                        value: {x: .5, y: .5}
                    }, params: {type: "v3", value: {x: 10, y: .8, z: .1}}, time: {type: "1f", value: 0}
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                center: {
                    get: function () {
                        return this.uniforms.center.value
                    }, set: function (a) {
                        this.uniforms.center.value = a
                    }
                }, params: {
                    get: function () {
                        return this.uniforms.params.value
                    }, set: function (a) {
                        this.uniforms.params.value = a
                    }
                }, time: {
                    get: function () {
                        return this.uniforms.time.value
                    }, set: function (a) {
                        this.uniforms.time.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        110: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n", {
                    blur: {
                        type: "1f",
                        value: 100
                    },
                    gradientBlur: {type: "1f", value: 600},
                    start: {type: "v2", value: {x: 0, y: window.innerHeight / 2}},
                    end: {type: "v2", value: {x: 600, y: window.innerHeight / 2}},
                    delta: {type: "v2", value: {x: 30, y: 30}},
                    texSize: {type: "v2", value: {x: window.innerWidth, y: window.innerHeight}}
                }), this.updateDelta()
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.updateDelta = function () {
                this.uniforms.delta.value.x = 0, this.uniforms.delta.value.y = 0
            }, Object.defineProperties(d.prototype, {
                blur: {
                    get: function () {
                        return this.uniforms.blur.value
                    }, set: function (a) {
                        this.uniforms.blur.value = a
                    }
                }, gradientBlur: {
                    get: function () {
                        return this.uniforms.gradientBlur.value
                    }, set: function (a) {
                        this.uniforms.gradientBlur.value = a
                    }
                }, start: {
                    get: function () {
                        return this.uniforms.start.value
                    }, set: function (a) {
                        this.uniforms.start.value = a, this.updateDelta()
                    }
                }, end: {
                    get: function () {
                        return this.uniforms.end.value
                    }, set: function (a) {
                        this.uniforms.end.value = a, this.updateDelta()
                    }
                }
            })
        }, {"../../core": 30}],
        111: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this), this.tiltShiftXFilter = new f, this.tiltShiftYFilter = new g
            }

            var e = a("../../core"), f = a("./TiltShiftXFilter"), g = a("./TiltShiftYFilter");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.applyFilter = function (a, b, c) {
                var d = a.filterManager.getRenderTarget(!0);
                this.tiltShiftXFilter.applyFilter(a, b, d), this.tiltShiftYFilter.applyFilter(a, d, c), a.filterManager.returnRenderTarget(d)
            }, Object.defineProperties(d.prototype, {
                blur: {
                    get: function () {
                        return this.tiltShiftXFilter.blur
                    }, set: function (a) {
                        this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = a
                    }
                }, gradientBlur: {
                    get: function () {
                        return this.tiltShiftXFilter.gradientBlur
                    }, set: function (a) {
                        this.tiltShiftXFilter.gradientBlur = this.tiltShiftYFilter.gradientBlur = a
                    }
                }, start: {
                    get: function () {
                        return this.tiltShiftXFilter.start
                    }, set: function (a) {
                        this.tiltShiftXFilter.start = this.tiltShiftYFilter.start = a
                    }
                }, end: {
                    get: function () {
                        return this.tiltShiftXFilter.end
                    }, set: function (a) {
                        this.tiltShiftXFilter.end = this.tiltShiftYFilter.end = a
                    }
                }
            })
        }, {"../../core": 30, "./TiltShiftXFilter": 112, "./TiltShiftYFilter": 113}],
        112: [function (a, b, c) {
            function d() {
                e.call(this)
            }

            var e = a("./TiltShiftAxisFilter");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.updateDelta = function () {
                var a = this.uniforms.end.value.x - this.uniforms.start.value.x,
                    b = this.uniforms.end.value.y - this.uniforms.start.value.y, c = Math.sqrt(a * a + b * b);
                this.uniforms.delta.value.x = a / c, this.uniforms.delta.value.y = b / c
            }
        }, {"./TiltShiftAxisFilter": 110}],
        113: [function (a, b, c) {
            function d() {
                e.call(this)
            }

            var e = a("./TiltShiftAxisFilter");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.updateDelta = function () {
                var a = this.uniforms.end.value.x - this.uniforms.start.value.x,
                    b = this.uniforms.end.value.y - this.uniforms.start.value.y, c = Math.sqrt(a * a + b * b);
                this.uniforms.delta.value.x = -b / c, this.uniforms.delta.value.y = a / c
            }
        }, {"./TiltShiftAxisFilter": 110}],
        114: [function (a, b, c) {
            function d() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\n\nvoid main(void)\n{\n   vec2 coord = vTextureCoord - offset;\n   float dist = length(coord);\n\n   if (dist < radius)\n   {\n       float ratio = (radius - dist) / radius;\n       float angleMod = ratio * ratio * angle;\n       float s = sin(angleMod);\n       float c = cos(angleMod);\n       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n   }\n\n   gl_FragColor = texture2D(uSampler, coord+offset);\n}\n", {
                    radius: {
                        type: "1f",
                        value: .5
                    }, angle: {type: "1f", value: 5}, offset: {type: "v2", value: {x: .5, y: .5}}
                })
            }

            var e = a("../../core");
            d.prototype = Object.create(e.AbstractFilter.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                offset: {
                    get: function () {
                        return this.uniforms.offset.value
                    }, set: function (a) {
                        this.uniforms.offset.value = a
                    }
                }, radius: {
                    get: function () {
                        return this.uniforms.radius.value
                    }, set: function (a) {
                        this.uniforms.radius.value = a
                    }
                }, angle: {
                    get: function () {
                        return this.uniforms.angle.value
                    }, set: function (a) {
                        this.uniforms.angle.value = a
                    }
                }
            })
        }, {"../../core": 30}],
        115: [function (a, b, c) {
            (function (c) {
                a("./polyfill");
                var d = b.exports = a("./core");
                d.extras = a("./extras"), d.filters = a("./filters"), d.interaction = a("./interaction"), d.loaders = a("./loaders"), d.mesh = a("./mesh"), d.accessibility = a("./accessibility"), d.loader = new d.loaders.Loader, Object.assign(d, a("./deprecation")), c.PIXI = d
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./accessibility": 22,
            "./core": 30,
            "./deprecation": 79,
            "./extras": 86,
            "./filters": 103,
            "./interaction": 118,
            "./loaders": 121,
            "./mesh": 128,
            "./polyfill": 133
        }],
        116: [function (a, b, c) {
            function d() {
                this.global = new e.Point, this.target = null, this.originalEvent = null, this.identifier = -1
            }

            var e = a("../core");
            d.prototype.constructor = d, b.exports = d, d.prototype.getLocalPosition = function (a, b, c) {
                return a.worldTransform.applyInverse(c || this.global, b)
            }
        }, {"../core": 30}],
        117: [function (a, b, c) {
            function d(a, b) {
                b = b || {}, g.call(this), this.renderer = a, this.autoPreventDefault = void 0 === b.autoPreventDefault || b.autoPreventDefault, this.interactionFrequency = b.interactionFrequency || 10, this.mouse = new f, this.eventData = {
                    stopped: !1,
                    target: null,
                    type: null,
                    data: this.mouse,
                    stopPropagation: function () {
                        this.stopped = !0
                    }
                }, this.interactiveDataPool = [], this.interactionDOMElement = null, this.eventsAdded = !1, this.onMouseUp = this.onMouseUp.bind(this), this.processMouseUp = this.processMouseUp.bind(this), this.onMouseDown = this.onMouseDown.bind(this), this.processMouseDown = this.processMouseDown.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.processMouseMove = this.processMouseMove.bind(this), this.onMouseOver = this.onMouseOver.bind(this), this.onMouseOut = this.onMouseOut.bind(this), this.processMouseOverOut = this.processMouseOverOut.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.processTouchStart = this.processTouchStart.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this), this.processTouchEnd = this.processTouchEnd.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.processTouchMove = this.processTouchMove.bind(this), this.last = 0, this.currentCursorStyle = "inherit", this.handleCursorChange = null, this._tempPoint = new e.Point, this.resolution = 1, this.setTargetElement(this.renderer.view, this.renderer.resolution)
            }

            var e = a("../core"), f = a("./InteractionData"), g = a("eventemitter3");
            Object.assign(e.DisplayObject.prototype, a("./interactiveTarget")), d.prototype = Object.create(g.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.setTargetElement = function (a, b) {
                this.removeEvents(), this.interactionDOMElement = a, this.resolution = b || 1, this.addEvents()
            }, d.prototype.addEvents = function () {
                this.interactionDOMElement && (e.ticker.shared.add(this.update, this), window.navigator.msPointerEnabled && (this.interactionDOMElement.style["-ms-content-zooming"] = "none", this.interactionDOMElement.style["-ms-touch-action"] = "none"), window.document.addEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.addEventListener("mouseover", this.onMouseOver, !0), this.interactionDOMElement.addEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.addEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.addEventListener("touchmove", this.onTouchMove, !0), window.addEventListener("mouseup", this.onMouseUp, !0), this.eventsAdded = !0)
            }, d.prototype.removeEvents = function () {
                this.interactionDOMElement && (e.ticker.shared.remove(this.update), window.navigator.msPointerEnabled && (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = ""), window.document.removeEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.removeEventListener("mouseover", this.onMouseOver, !0), this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0), this.interactionDOMElement = null, window.removeEventListener("mouseup", this.onMouseUp, !0), this.eventsAdded = !1)
            }, d.prototype.update = function (a) {
                if (this._deltaTime += a, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.interactionDOMElement)) {
                    if (this.didMove) return void(this.didMove = !1);
                    this.cursor = "inherit", this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, !0), this.currentCursorStyle !== this.cursor && (this.currentCursorStyle = this.cursor, this.handleCursorChange ? this.handleCursorChange(this.cursor) : this.interactionDOMElement.style.cursor = this.cursor);
                }
            }, d.prototype.dispatchEvent = function (a, b, c) {
                c.stopped || (c.target = a, c.type = b, a.emit(b, c), a[b] && a[b](c))
            }, d.prototype.mapPositionToPoint = function (a, b, c) {
                var d = this.interactionDOMElement.getBoundingClientRect();
                a.x = (b - d.left) * (this.interactionDOMElement.width / d.width) / this.resolution, a.y = (c - d.top) * (this.interactionDOMElement.height / d.height) / this.resolution
            }, d.prototype.processInteractive = function (a, b, c, d, e) {
                if (!b || !b.visible) return !1;
                var f = !1, g = e = b.interactive || e;
                if (b.hitArea && (g = !1), b.interactiveChildren) for (var h = b.children, i = h.length - 1; i >= 0; i--) this.processInteractive(a, h[i], c, d, g) && (f = !0, g = !1, h[i].interactive && (d = !1));
                return e && (d && !f && (b.hitArea ? (b.worldTransform.applyInverse(a, this._tempPoint), f = b.hitArea.contains(this._tempPoint.x, this._tempPoint.y)) : b.containsPoint && (f = b.containsPoint(a))), b.interactive && c(b, f)), f
            }, d.prototype.onMouseDown = function (a) {
                this.mouse.originalEvent = a, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, a.clientX, a.clientY), this.autoPreventDefault && this.mouse.originalEvent.preventDefault(), this.emit("stagedown", this.eventData), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseDown, !0)
            }, d.prototype.processMouseDown = function (a, b) {
                var c = this.mouse.originalEvent, d = 2 === c.button || 3 === c.which;
                b && (a[d ? "_isRightDown" : "_isLeftDown"] = !0, this.dispatchEvent(a, d ? "rightdown" : "mousedown", this.eventData))
            }, d.prototype.onMouseUp = function (a) {
                this.mouse.originalEvent = a, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, a.clientX, a.clientY), this.emit("stageup", this.eventData), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseUp, !0)
            }, d.prototype.processMouseUp = function (a, b) {
                var c = this.mouse.originalEvent, d = 2 === c.button || 3 === c.which,
                    e = d ? "_isRightDown" : "_isLeftDown";
                b ? (this.dispatchEvent(a, d ? "rightup" : "mouseup", this.eventData), a[e] && (a[e] = !1, this.dispatchEvent(a, d ? "rightclick" : "click", this.eventData))) : a[e] && (a[e] = !1, this.dispatchEvent(a, d ? "rightupoutside" : "mouseupoutside", this.eventData))
            }, d.prototype.onMouseMove = function (a) {
                this.mouse.originalEvent = a, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, a.clientX, a.clientY), this.didMove = !0, this.cursor = "inherit", this.emit("stagemove", this.eventData), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseMove, !0), this.currentCursorStyle !== this.cursor && (this.currentCursorStyle = this.cursor, this.handleCursorChange ? this.handleCursorChange(this.cursor) : this.interactionDOMElement.style.cursor = this.cursor)
            }, d.prototype.processMouseMove = function (a, b) {
                this.dispatchEvent(a, "mousemove", this.eventData), this.processMouseOverOut(a, b)
            }, d.prototype.onMouseOut = function (a) {
                this.mouse.originalEvent = a, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, a.clientX, a.clientY), this.handleCursorChange || (this.interactionDOMElement.style.cursor = "inherit"), this.mapPositionToPoint(this.mouse.global, a.clientX, a.clientY), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, !1), this.emit("stageout")
            }, d.prototype.processMouseOverOut = function (a, b) {
                b ? (a._over || (a._over = !0, this.dispatchEvent(a, "mouseover", this.eventData)), a.buttonMode && (this.cursor = a.defaultCursor)) : a._over && (a._over = !1, this.dispatchEvent(a, "mouseout", this.eventData))
            }, d.prototype.onMouseOver = function () {
                this.emit("stagein")
            }, d.prototype.onTouchStart = function (a) {
                this.autoPreventDefault && a.preventDefault();
                for (var b = a.changedTouches, c = b.length, d = 0; c > d; d++) {
                    var e = b[d], f = this.getTouchData(e);
                    f.originalEvent = a, this.eventData.data = f, this.eventData.stopped = !1, this.emit("stagedown", this.eventData), this.processInteractive(f.global, this.renderer._lastObjectRendered, this.processTouchStart, !0), this.returnTouchData(f)
                }
            }, d.prototype.processTouchStart = function (a, b) {
                b && (a._touchDown = this.eventData.data.identifier, this.dispatchEvent(a, "touchstart", this.eventData))
            }, d.prototype.onTouchEnd = function (a) {
                this.autoPreventDefault && a.preventDefault();
                for (var b = a.changedTouches, c = b.length, d = 0; c > d; d++) {
                    var e = b[d], f = this.getTouchData(e);
                    f.originalEvent = a, this.eventData.data = f, this.eventData.stopped = !1, this.emit("stageup", this.eventData), this.processInteractive(f.global, this.renderer._lastObjectRendered, this.processTouchEnd, !0), this.returnTouchData(f)
                }
            }, d.prototype.processTouchEnd = function (a, b) {
                b ? (this.dispatchEvent(a, "touchend", this.eventData), a._touchDown === this.eventData.data.identifier && (a._touchDown = !1, this.dispatchEvent(a, "tap", this.eventData))) : a._touchDown === this.eventData.data.identifier && (a._touchDown = !1, this.dispatchEvent(a, "touchendoutside", this.eventData))
            }, d.prototype.onTouchMove = function (a) {
                this.autoPreventDefault && a.preventDefault();
                for (var b = a.changedTouches, c = b.length, d = 0; c > d; d++) {
                    var e = b[d], f = this.getTouchData(e);
                    f.originalEvent = a, this.eventData.data = f, this.eventData.stopped = !1, this.emit("stagemove", this.eventData), this.processInteractive(f.global, this.renderer._lastObjectRendered, this.processTouchMove, !0), this.returnTouchData(f)
                }
            }, d.prototype.processTouchMove = function (a, b) {
                b = b, this.dispatchEvent(a, "touchmove", this.eventData)
            }, d.prototype.getTouchData = function (a) {
                var b = this.interactiveDataPool.pop();
                return b || (b = new f), b.identifier = a.identifier, this.mapPositionToPoint(b.global, a.clientX, a.clientY), navigator.isCocoonJS && (b.global.x = b.global.x / this.resolution, b.global.y = b.global.y / this.resolution), a.globalX = b.global.x, a.globalY = b.global.y, b
            }, d.prototype.returnTouchData = function (a) {
                this.interactiveDataPool.push(a)
            }, d.prototype.destroy = function () {
                this.removeEvents(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactiveDataPool = null, this.interactionDOMElement = null, this.onMouseUp = null, this.processMouseUp = null, this.onMouseDown = null, this.processMouseDown = null, this.onMouseMove = null, this.processMouseMove = null, this.onMouseOut = null, this.processMouseOverOut = null, this.onMouseOver = null, this.onTouchStart = null, this.processTouchStart = null, this.onTouchEnd = null, this.processTouchEnd = null, this.onTouchMove = null, this.processTouchMove = null, this._tempPoint = null, this.handleCursorChange = null
            }, e.WebGLRenderer.registerPlugin("interaction", d), e.CanvasRenderer.registerPlugin("interaction", d)
        }, {"../core": 30, "./InteractionData": 116, "./interactiveTarget": 119, eventemitter3: 10}],
        118: [function (a, b, c) {
            b.exports = {
                InteractionData: a("./InteractionData"),
                InteractionManager: a("./InteractionManager"),
                interactiveTarget: a("./interactiveTarget")
            }
        }, {"./InteractionData": 116, "./InteractionManager": 117, "./interactiveTarget": 119}],
        119: [function (a, b, c) {
            var d = {
                interactive: !1,
                buttonMode: !1,
                interactiveChildren: !0,
                defaultCursor: "pointer",
                _over: !1,
                _touchDown: !1
            };
            b.exports = d
        }, {}],
        120: [function (a, b, c) {
            function d(a, b) {
                var c = {}, d = a.data.getElementsByTagName("info")[0], e = a.data.getElementsByTagName("common")[0];
                c.font = d.getAttribute("face"), c.size = parseInt(d.getAttribute("size"), 10), c.lineHeight = parseInt(e.getAttribute("lineHeight"), 10), c.chars = {};
                for (var h = a.data.getElementsByTagName("char"), i = 0; i < h.length; i++) {
                    var j = parseInt(h[i].getAttribute("id"), 10),
                        k = new f.Rectangle(parseInt(h[i].getAttribute("x"), 10) + b.frame.x, parseInt(h[i].getAttribute("y"), 10) + b.frame.y, parseInt(h[i].getAttribute("width"), 10), parseInt(h[i].getAttribute("height"), 10));
                    c.chars[j] = {
                        xOffset: parseInt(h[i].getAttribute("xoffset"), 10),
                        yOffset: parseInt(h[i].getAttribute("yoffset"), 10),
                        xAdvance: parseInt(h[i].getAttribute("xadvance"), 10),
                        kerning: {},
                        texture: new f.Texture(b.baseTexture, k)
                    }
                }
                var l = a.data.getElementsByTagName("kerning");
                for (i = 0; i < l.length; i++) {
                    var m = parseInt(l[i].getAttribute("first"), 10), n = parseInt(l[i].getAttribute("second"), 10),
                        o = parseInt(l[i].getAttribute("amount"), 10);
                    c.chars[n].kerning[m] = o
                }
                a.bitmapFont = c, g.BitmapText.fonts[c.font] = c
            }

            var e = a("resource-loader").Resource, f = a("../core"), g = a("../extras"), h = a("path");
            b.exports = function () {
                return function (a, b) {
                    if (!a.data || !a.isXml) return b();
                    if (0 === a.data.getElementsByTagName("page").length || 0 === a.data.getElementsByTagName("info").length || null === a.data.getElementsByTagName("info")[0].getAttribute("face")) return b();
                    var c = h.dirname(a.url);
                    "." === c && (c = ""), this.baseUrl && c && ("/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (c += "/"), c = c.replace(this.baseUrl, "")), c && "/" !== c.charAt(c.length - 1) && (c += "/");
                    var g = c + a.data.getElementsByTagName("page")[0].getAttribute("file"), i = g;
                    if (f.utils.useFilenamesForTextures && (i = f.utils.getFilenameFromUrl(i)), f.utils.TextureCache[i]) d(a, f.utils.TextureCache[i]), b(); else {
                        var j = {
                            crossOrigin: a.crossOrigin,
                            loadType: e.LOAD_TYPE.IMAGE,
                            metadata: a.metadata.imageMetadata
                        };
                        this.add(a.name + "_image", g, j, function (c) {
                            d(a, c.texture), b()
                        })
                    }
                }
            }
        }, {"../core": 30, "../extras": 86, path: 2, "resource-loader": 16}],
        121: [function (a, b, c) {
            b.exports = {
                Loader: a("./loader"),
                bitmapFontParser: a("./bitmapFontParser"),
                spritesheetParser: a("./spritesheetParser"),
                textureParser: a("./textureParser"),
                Resource: a("resource-loader").Resource
            }
        }, {
            "./bitmapFontParser": 120,
            "./loader": 122,
            "./spritesheetParser": 123,
            "./textureParser": 124,
            "resource-loader": 16
        }],
        122: [function (a, b, c) {
            function d(a, b) {
                e.call(this, a, b);
                for (var c = 0; c < d._pixiMiddleware.length; ++c) this.use(d._pixiMiddleware[c]())
            }

            var e = a("resource-loader"), f = a("./textureParser"), g = a("./spritesheetParser"),
                h = a("./bitmapFontParser");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d._pixiMiddleware = [e.middleware.parsing.blob, f, g, h], d.addPixiMiddleware = function (a) {
                d._pixiMiddleware.push(a)
            };
            var i = e.Resource;
            i.setExtensionXhrType("fnt", i.XHR_RESPONSE_TYPE.DOCUMENT)
        }, {"./bitmapFontParser": 120, "./spritesheetParser": 123, "./textureParser": 124, "resource-loader": 16}],
        123: [function (a, b, c) {
            var d = a("resource-loader").Resource, e = a("path"), f = a("../core");
            b.exports = function () {
                return function (a, b) {
                    if (!a.data || !a.isJson || !a.data.frames) return b();
                    var c = {
                        crossOrigin: a.crossOrigin,
                        loadType: d.LOAD_TYPE.IMAGE,
                        metadata: a.metadata.imageMetadata
                    }, g = e.dirname(a.url.replace(this.baseUrl, "")), h = f.utils.getResolutionOfUrl(a.url);
                    this.add(a.name + "_image", g + "/" + a.data.meta.image, c, function (c) {
                        a.textures = {};
                        var d = a.data.frames;
                        for (var e in d) {
                            var g = d[e].frame;
                            if (g) {
                                var i = null, j = null;
                                if (i = d[e].rotated ? new f.Rectangle(g.x, g.y, g.h, g.w) : new f.Rectangle(g.x, g.y, g.w, g.h), d[e].trimmed && (j = new f.Rectangle(d[e].spriteSourceSize.x / h, d[e].spriteSourceSize.y / h, d[e].sourceSize.w / h, d[e].sourceSize.h / h)), d[e].rotated) {
                                    var k = i.width;
                                    i.width = i.height, i.height = k
                                }
                                i.x /= h, i.y /= h, i.width /= h, i.height /= h;
                                var l = e;
                                f.utils.useFilenamesForTextures && (l = f.utils.getFilenameFromUrl(e)), a.textures[l] = new f.Texture(c.texture.baseTexture, i, i.clone(), j, d[e].rotated), f.utils.TextureCache[l] = a.textures[l]
                            }
                        }
                        b()
                    })
                }
            }
        }, {"../core": 30, path: 2, "resource-loader": 16}],
        124: [function (a, b, c) {
            var d = a("../core");
            b.exports = function () {
                return function (a, b) {
                    if (a.data && a.isImage) {
                        var c = new d.BaseTexture(a.data, null, d.utils.getResolutionOfUrl(a.url));
                        c.imageUrl = a.url, a.texture = new d.Texture(c);
                        var e = a.url;
                        d.utils.useFilenamesForTextures && (e = d.utils.getFilenameFromUrl(e)), d.utils.BaseTextureCache[e] = c, d.utils.TextureCache[e] = a.texture
                    }
                    b()
                }
            }
        }, {"../core": 30}],
        125: [function (a, b, c) {
            function d(a, b, c, f, g) {
                e.Container.call(this), this._texture = null, this.uvs = c || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.vertices = b || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]), this.indices = f || new Uint16Array([0, 1, 3, 2]), this.dirty = !0, this.blendMode = e.BLEND_MODES.NORMAL, this.canvasPadding = 0, this.drawMode = g || d.DRAW_MODES.TRIANGLE_MESH, this.texture = a, this.shader = null
            }

            var e = a("../core"), f = new e.Point, g = new e.Polygon;
            d.prototype = Object.create(e.Container.prototype), d.prototype.constructor = d, b.exports = d, Object.defineProperties(d.prototype, {
                texture: {
                    get: function () {
                        return this._texture
                    }, set: function (a) {
                        this._texture !== a && (this._texture = a, a && (a.baseTexture.hasLoaded ? this._onTextureUpdate() : a.once("update", this._onTextureUpdate, this)))
                    }
                }
            }), d.prototype._renderWebGL = function (a) {
                a.setObjectRenderer(a.plugins.mesh), a.plugins.mesh.render(this)
            }, d.prototype._renderCanvas = function (a) {
                var b = a.context, c = this.worldTransform;
                a.roundPixels ? b.setTransform(c.a, c.b, c.c, c.d, 0 | c.tx, 0 | c.ty) : b.setTransform(c.a, c.b, c.c, c.d, c.tx, c.ty), this.drawMode === d.DRAW_MODES.TRIANGLE_MESH ? this._renderCanvasTriangleMesh(b) : this._renderCanvasTriangles(b)
            }, d.prototype._renderCanvasTriangleMesh = function (a) {
                for (var b = this.vertices, c = this.uvs, d = b.length / 2, e = 0; d - 2 > e; e++) {
                    var f = 2 * e;
                    this._renderCanvasDrawTriangle(a, b, c, f, f + 2, f + 4)
                }
            }, d.prototype._renderCanvasTriangles = function (a) {
                for (var b = this.vertices, c = this.uvs, d = this.indices, e = d.length, f = 0; e > f; f += 3) {
                    var g = 2 * d[f], h = 2 * d[f + 1], i = 2 * d[f + 2];
                    this._renderCanvasDrawTriangle(a, b, c, g, h, i)
                }
            }, d.prototype._renderCanvasDrawTriangle = function (a, b, c, d, e, f) {
                var g = this._texture.baseTexture.source, h = this._texture.baseTexture.width,
                    i = this._texture.baseTexture.height, j = b[d], k = b[e], l = b[f], m = b[d + 1], n = b[e + 1],
                    o = b[f + 1], p = c[d] * h, q = c[e] * h, r = c[f] * h, s = c[d + 1] * i, t = c[e + 1] * i,
                    u = c[f + 1] * i;
                if (this.canvasPadding > 0) {
                    var v = this.canvasPadding / this.worldTransform.a, w = this.canvasPadding / this.worldTransform.d,
                        x = (j + k + l) / 3, y = (m + n + o) / 3, z = j - x, A = m - y, B = Math.sqrt(z * z + A * A);
                    j = x + z / B * (B + v), m = y + A / B * (B + w), z = k - x, A = n - y, B = Math.sqrt(z * z + A * A), k = x + z / B * (B + v), n = y + A / B * (B + w), z = l - x, A = o - y, B = Math.sqrt(z * z + A * A), l = x + z / B * (B + v), o = y + A / B * (B + w)
                }
                a.save(), a.beginPath(), a.moveTo(j, m), a.lineTo(k, n), a.lineTo(l, o), a.closePath(), a.clip();
                var C = p * t + s * r + q * u - t * r - s * q - p * u,
                    D = j * t + s * l + k * u - t * l - s * k - j * u,
                    E = p * k + j * r + q * l - k * r - j * q - p * l,
                    F = p * t * l + s * k * r + j * q * u - j * t * r - s * q * l - p * k * u,
                    G = m * t + s * o + n * u - t * o - s * n - m * u,
                    H = p * n + m * r + q * o - n * r - m * q - p * o,
                    I = p * t * o + s * n * r + m * q * u - m * t * r - s * q * o - p * n * u;
                a.transform(D / C, G / C, E / C, H / C, F / C, I / C), a.drawImage(g, 0, 0), a.restore()
            }, d.prototype.renderMeshFlat = function (a) {
                var b = this.context, c = a.vertices, d = c.length / 2;
                b.beginPath();
                for (var e = 1; d - 2 > e; e++) {
                    var f = 2 * e, g = c[f], h = c[f + 2], i = c[f + 4], j = c[f + 1], k = c[f + 3], l = c[f + 5];
                    b.moveTo(g, j), b.lineTo(h, k), b.lineTo(i, l)
                }
                b.fillStyle = "#FF0000", b.fill(), b.closePath()
            }, d.prototype._onTextureUpdate = function () {
                this.updateFrame = !0
            }, d.prototype.getBounds = function (a) {
                if (!this._currentBounds) {
                    for (var b = a || this.worldTransform, c = b.a, d = b.b, f = b.c, g = b.d, h = b.tx, i = b.ty, j = -(1 / 0), k = -(1 / 0), l = 1 / 0, m = 1 / 0, n = this.vertices, o = 0, p = n.length; p > o; o += 2) {
                        var q = n[o], r = n[o + 1], s = c * q + f * r + h, t = g * r + d * q + i;
                        l = l > s ? s : l, m = m > t ? t : m, j = s > j ? s : j, k = t > k ? t : k
                    }
                    if (l === -(1 / 0) || k === 1 / 0) return e.Rectangle.EMPTY;
                    var u = this._bounds;
                    u.x = l, u.width = j - l, u.y = m, u.height = k - m, this._currentBounds = u
                }
                return this._currentBounds
            }, d.prototype.containsPoint = function (a) {
                if (!this.getBounds().contains(a.x, a.y)) return !1;
                this.worldTransform.applyInverse(a, f);
                var b, c, e = this.vertices, h = g.points;
                if (this.drawMode === d.DRAW_MODES.TRIANGLES) {
                    var i = this.indices;
                    for (c = this.indices.length, b = 0; c > b; b += 3) {
                        var j = 2 * i[b], k = 2 * i[b + 1], l = 2 * i[b + 2];
                        if (h[0] = e[j], h[1] = e[j + 1], h[2] = e[k], h[3] = e[k + 1], h[4] = e[l], h[5] = e[l + 1], g.contains(f.x, f.y)) return !0
                    }
                } else for (c = e.length, b = 0; c > b; b += 6) if (h[0] = e[b], h[1] = e[b + 1], h[2] = e[b + 2], h[3] = e[b + 3], h[4] = e[b + 4], h[5] = e[b + 5], g.contains(f.x, f.y)) return !0;
                return !1
            }, d.DRAW_MODES = {TRIANGLE_MESH: 0, TRIANGLES: 1}
        }, {"../core": 30}],
        126: [function (a, b, c) {
            function d(a, b, c) {
                e.call(this, a), this._ready = !0, this.segmentsX = b || 10, this.segmentsY = c || 10, this.drawMode = e.DRAW_MODES.TRIANGLES, this.refresh()
            }

            var e = a("./Mesh");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.refresh = function () {
                var a = this.segmentsX * this.segmentsY, b = [], c = [], d = [], e = [], f = this.texture,
                    g = this.segmentsX - 1, h = this.segmentsY - 1, i = 0, j = f.width / g, k = f.height / h;
                for (i = 0; a > i; i++) {
                    var l = i % this.segmentsX, m = i / this.segmentsX | 0;
                    b.push(l * j, m * k), d.push(l / (this.segmentsX - 1), m / (this.segmentsY - 1))
                }
                var n = g * h;
                for (i = 0; n > i; i++) {
                    var o = i % g, p = i / g | 0, q = p * this.segmentsX + o, r = p * this.segmentsX + o + 1,
                        s = (p + 1) * this.segmentsX + o, t = (p + 1) * this.segmentsX + o + 1;
                    e.push(q, r, s), e.push(r, t, s)
                }
                this.vertices = new Float32Array(b), this.uvs = new Float32Array(d), this.colors = new Float32Array(c), this.indices = new Uint16Array(e)
            }, d.prototype._onTextureUpdate = function () {
                e.prototype._onTextureUpdate.call(this), this._ready && this.refresh()
            }
        }, {"./Mesh": 125}],
        127: [function (a, b, c) {
            function d(a, b) {
                e.call(this, a), this.points = b, this.vertices = new Float32Array(4 * b.length), this.uvs = new Float32Array(4 * b.length), this.colors = new Float32Array(2 * b.length), this.indices = new Uint16Array(2 * b.length), this._ready = !0, this.refresh()
            }

            var e = a("./Mesh"), f = a("../core");
            d.prototype = Object.create(e.prototype), d.prototype.constructor = d, b.exports = d, d.prototype.refresh = function () {
                var a = this.points;
                if (!(a.length < 1) && this._texture._uvs) {
                    var b = this.uvs, c = this.indices, d = this.colors, e = this._texture._uvs,
                        g = new f.Point(e.x0, e.y0), h = new f.Point(e.x2 - e.x0, e.y2 - e.y0);
                    b[0] = 0 + g.x, b[1] = 0 + g.y, b[2] = 0 + g.x, b[3] = 1 * h.y + g.y, d[0] = 1, d[1] = 1, c[0] = 0, c[1] = 1;
                    for (var i, j, k, l = a.length, m = 1; l > m; m++) i = a[m], j = 4 * m, k = m / (l - 1), b[j] = k * h.x + g.x, b[j + 1] = 0 + g.y, b[j + 2] = k * h.x + g.x, b[j + 3] = 1 * h.y + g.y, j = 2 * m, d[j] = 1, d[j + 1] = 1, j = 2 * m, c[j] = j, c[j + 1] = j + 1;
                    this.dirty = !0
                }
            }, d.prototype._onTextureUpdate = function () {
                e.prototype._onTextureUpdate.call(this), this._ready && this.refresh()
            }, d.prototype.updateTransform = function () {
                var a = this.points;
                if (!(a.length < 1)) {
                    for (var b, c, d, e, f, g, h = a[0], i = 0, j = 0, k = this.vertices, l = a.length, m = 0; l > m; m++) c = a[m], d = 4 * m, b = m < a.length - 1 ? a[m + 1] : c, j = -(b.x - h.x), i = b.y - h.y, e = 10 * (1 - m / (l - 1)), e > 1 && (e = 1), f = Math.sqrt(i * i + j * j), g = this._texture.height / 2, i /= f, j /= f, i *= g, j *= g, k[d] = c.x + i, k[d + 1] = c.y + j, k[d + 2] = c.x - i, k[d + 3] = c.y - j, h = c;
                    this.containerUpdateTransform()
                }
            }
        }, {"../core": 30, "./Mesh": 125}],
        128: [function (a, b, c) {
            b.exports = {
                Mesh: a("./Mesh"),
                Plane: a("./Plane"),
                Rope: a("./Rope"),
                MeshRenderer: a("./webgl/MeshRenderer"),
                MeshShader: a("./webgl/MeshShader")
            }
        }, {"./Mesh": 125, "./Plane": 126, "./Rope": 127, "./webgl/MeshRenderer": 129, "./webgl/MeshShader": 130}],
        129: [function (a, b, c) {
            function d(a) {
                e.ObjectRenderer.call(this, a), this.indices = new Uint16Array(15e3);
                for (var b = 0, c = 0; 15e3 > b; b += 6, c += 4) this.indices[b + 0] = c + 0, this.indices[b + 1] = c + 1, this.indices[b + 2] = c + 2, this.indices[b + 3] = c + 0, this.indices[b + 4] = c + 2, this.indices[b + 5] = c + 3;
                this.currentShader = null
            }

            var e = a("../../core"), f = a("../Mesh");
            d.prototype = Object.create(e.ObjectRenderer.prototype), d.prototype.constructor = d, b.exports = d, e.WebGLRenderer.registerPlugin("mesh", d), d.prototype.onContextChange = function () {
            }, d.prototype.render = function (a) {
                a._vertexBuffer || this._initWebGL(a);
                var b = this.renderer, c = b.gl, d = a._texture.baseTexture, e = a.shader,
                    g = a.drawMode === f.DRAW_MODES.TRIANGLE_MESH ? c.TRIANGLE_STRIP : c.TRIANGLES;
                b.blendModeManager.setBlendMode(a.blendMode), e = e ? e.shaders[c.id] || e.getShader(b) : b.shaderManager.plugins.meshShader, this.renderer.shaderManager.setShader(e), e.uniforms.translationMatrix.value = a.worldTransform.toArray(!0), e.uniforms.projectionMatrix.value = b.currentRenderTarget.projectionMatrix.toArray(!0), e.uniforms.alpha.value = a.worldAlpha, e.syncUniforms(), a.dirty ? (a.dirty = !1, c.bindBuffer(c.ARRAY_BUFFER, a._vertexBuffer), c.bufferData(c.ARRAY_BUFFER, a.vertices, c.STATIC_DRAW), c.vertexAttribPointer(e.attributes.aVertexPosition, 2, c.FLOAT, !1, 0, 0), c.bindBuffer(c.ARRAY_BUFFER, a._uvBuffer), c.bufferData(c.ARRAY_BUFFER, a.uvs, c.STATIC_DRAW), c.vertexAttribPointer(e.attributes.aTextureCoord, 2, c.FLOAT, !1, 0, 0), c.activeTexture(c.TEXTURE0), d._glTextures[c.id] ? c.bindTexture(c.TEXTURE_2D, d._glTextures[c.id]) : this.renderer.updateTexture(d), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, a._indexBuffer), c.bufferData(c.ELEMENT_ARRAY_BUFFER, a.indices, c.STATIC_DRAW)) : (c.bindBuffer(c.ARRAY_BUFFER, a._vertexBuffer), c.bufferSubData(c.ARRAY_BUFFER, 0, a.vertices), c.vertexAttribPointer(e.attributes.aVertexPosition, 2, c.FLOAT, !1, 0, 0), c.bindBuffer(c.ARRAY_BUFFER, a._uvBuffer), c.vertexAttribPointer(e.attributes.aTextureCoord, 2, c.FLOAT, !1, 0, 0), c.activeTexture(c.TEXTURE0), d._glTextures[c.id] ? c.bindTexture(c.TEXTURE_2D, d._glTextures[c.id]) : this.renderer.updateTexture(d), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, a._indexBuffer), c.bufferSubData(c.ELEMENT_ARRAY_BUFFER, 0, a.indices)), c.drawElements(g, a.indices.length, c.UNSIGNED_SHORT, 0)
            }, d.prototype._initWebGL = function (a) {
                var b = this.renderer.gl;
                a._vertexBuffer = b.createBuffer(), a._indexBuffer = b.createBuffer(), a._uvBuffer = b.createBuffer(), b.bindBuffer(b.ARRAY_BUFFER, a._vertexBuffer), b.bufferData(b.ARRAY_BUFFER, a.vertices, b.DYNAMIC_DRAW), b.bindBuffer(b.ARRAY_BUFFER, a._uvBuffer), b.bufferData(b.ARRAY_BUFFER, a.uvs, b.STATIC_DRAW), a.colors && (a._colorBuffer = b.createBuffer(), b.bindBuffer(b.ARRAY_BUFFER, a._colorBuffer), b.bufferData(b.ARRAY_BUFFER, a.colors, b.STATIC_DRAW)), b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, a._indexBuffer), b.bufferData(b.ELEMENT_ARRAY_BUFFER, a.indices, b.STATIC_DRAW)
            }, d.prototype.flush = function () {
            }, d.prototype.start = function () {
                this.currentShader = null
            }, d.prototype.destroy = function () {
                e.ObjectRenderer.prototype.destroy.call(this)
            }
        }, {"../../core": 30, "../Mesh": 125}],
        130: [function (a, b, c) {
            function d(a) {
                e.Shader.call(this, a, ["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "}"].join("\n"), ["precision lowp float;", "varying vec2 vTextureCoord;", "uniform float alpha;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * alpha ;", "}"].join("\n"), {
                    alpha: {
                        type: "1f",
                        value: 0
                    },
                    translationMatrix: {type: "mat3", value: new Float32Array(9)},
                    projectionMatrix: {type: "mat3", value: new Float32Array(9)}
                }, {aVertexPosition: 0, aTextureCoord: 0})
            }

            var e = a("../../core");
            d.prototype = Object.create(e.Shader.prototype), d.prototype.constructor = d, b.exports = d, e.ShaderManager.registerPlugin("meshShader", d)
        }, {"../../core": 30}],
        131: [function (a, b, c) {
            Math.sign || (Math.sign = function (a) {
                return a = +a, 0 === a || isNaN(a) ? a : a > 0 ? 1 : -1
            })
        }, {}],
        132: [function (a, b, c) {
            Object.assign || (Object.assign = a("object-assign"))
        }, {"object-assign": 11}],
        133: [function (a, b, c) {
            a("./Object.assign"), a("./requestAnimationFrame"), a("./Math.sign")
        }, {"./Math.sign": 131, "./Object.assign": 132, "./requestAnimationFrame": 134}],
        134: [function (a, b, c) {
            (function (a) {
                if (Date.now && Date.prototype.getTime || (Date.now = function () {
                        return (new Date).getTime()
                    }), !a.performance || !a.performance.now) {
                    var b = Date.now();
                    a.performance || (a.performance = {}), a.performance.now = function () {
                        return Date.now() - b
                    }
                }
                for (var c = Date.now(), d = ["ms", "moz", "webkit", "o"], e = 0; e < d.length && !a.requestAnimationFrame; ++e) a.requestAnimationFrame = a[d[e] + "RequestAnimationFrame"], a.cancelAnimationFrame = a[d[e] + "CancelAnimationFrame"] || a[d[e] + "CancelRequestAnimationFrame"];
                a.requestAnimationFrame || (a.requestAnimationFrame = function (a) {
                    if ("function" != typeof a) throw new TypeError(a + "is not a function");
                    var b = Date.now(), d = 16 + c - b;
                    return 0 > d && (d = 0), c = b, setTimeout(function () {
                        c = Date.now(), a(performance.now())
                    }, d)
                }), a.cancelAnimationFrame || (a.cancelAnimationFrame = function (a) {
                    clearTimeout(a)
                })
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}]
    }, {}, [115])(115)
}), !function () {
    "use strict";
    Array.prototype.shuffle || Object.defineProperty(Array.prototype, "shuffle", {
        enumerable: !1,
        writable: !1,
        value: function () {
            for (var a, b, c = this.length; c; a = Math.floor(Math.random() * c), b = this[--c], this[c] = this[a], this[a] = b) ;
            return this
        }
    }), Array.prototype.random || Object.defineProperty(Array.prototype, "random", {
        enumerable: !1,
        writable: !1,
        value: function () {
            return this[Math.floor(Math.random() * this.length)]
        }
    }), function () {
        var a = "undefined" != typeof window ? window : GLOBAL, b = {};
        if ("undefined" != typeof module && module.exports) "undefined" == typeof PIXI && require("pixi.js"), module.exports = b; else if ("undefined" == typeof PIXI) throw"Requires pixi.js";
        a.PIXI.particles = a.PIXI.particles || b
    }(), function (a, b) {
        var c = a.BLEND_MODES || a.blendModes, d = a.Texture, e = {}, f = e.DEG_TO_RADS = Math.PI / 180;
        e.useAPI3 = !1;
        var g = a.VERSION;
        g && parseInt(g.substring(0, g.indexOf("."))) >= 3 && (e.useAPI3 = !0);
        var h = e.EMPTY_TEXTURE = null;
        if (e.useAPI3) h = e.EMPTY_TEXTURE = d.EMPTY, h.on = h.destroy = h.once = h.emit = function () {
        }; else {
            var i = document.createElement("canvas");
            i.width = i.height = 1, h = e.EMPTY_TEXTURE = a.Texture.fromCanvas(i), h.baseTexture.hasLoaded = !1, h.on = h.destroy = h.once = h.emit = function () {
            }
        }
        e.rotatePoint = function (a, b) {
            if (a) {
                a *= f;
                var c = Math.sin(a), d = Math.cos(a), e = b.x * d - b.y * c, g = b.x * c + b.y * d;
                b.x = e, b.y = g
            }
        }, e.combineRGBComponents = function (a, b, c) {
            return a << 16 | b << 8 | c
        }, e.normalize = function (a) {
            var b = 1 / e.length(a);
            a.x *= b, a.y *= b
        }, e.scaleBy = function (a, b) {
            a.x *= b, a.y *= b
        }, e.length = function (a) {
            return Math.sqrt(a.x * a.x + a.y * a.y)
        }, e.hexToRGB = function (a, b) {
            b ? b.length = 0 : b = [], "#" == a.charAt(0) ? a = a.substr(1) : 0 === a.indexOf("0x") && (a = a.substr(2));
            var c;
            return 8 == a.length && (c = a.substr(0, 2), a = a.substr(2)), b.push(parseInt(a.substr(0, 2), 16)), b.push(parseInt(a.substr(2, 2), 16)), b.push(parseInt(a.substr(4, 2), 16)), c && b.push(parseInt(c, 16)), b
        }, e.generateEase = function (a) {
            var b = a.length, c = 1 / b, d = function (d) {
                var e, f, g = b * d | 0;
                return e = (d - g * c) * b, f = a[g] || a[b - 1], f.s + e * (2 * (1 - e) * (f.cp - f.s) + e * (f.e - f.s))
            };
            return d
        }, e.getBlendMode = function (a) {
            if (!a) return c.NORMAL;
            for (a = a.toUpperCase(); a.indexOf(" ") >= 0;) a = a.replace(" ", "_");
            return c[a] || c.NORMAL
        }, a.particles.ParticleUtils = e
    }(PIXI), function (a, b) {
        var c = a.particles.ParticleUtils, d = a.Sprite, e = c.useAPI3, f = function (b) {
            e ? d.call(this) : d.call(this, c.EMPTY_TEXTURE), this.emitter = b, this.anchor.x = this.anchor.y = .5, this.velocity = new a.Point, this.maxLife = 0, this.age = 0, this.ease = null, this.extraData = null, this.startAlpha = 0, this.endAlpha = 0, this.startSpeed = 0, this.endSpeed = 0, this.acceleration = new a.Point, this.maxSpeed = NaN, this.startScale = 0, this.endScale = 0, this.startColor = null, this._sR = 0, this._sG = 0, this._sB = 0, this.endColor = null, this._eR = 0, this._eG = 0, this._eB = 0, this._doAlpha = !1, this._doScale = !1, this._doSpeed = !1, this._doAcceleration = !1, this._doColor = !1, this._doNormalMovement = !1, this._oneOverLife = 0, this.next = null, this.prev = null, this.init = this.init, this.Particle_init = this.Particle_init, this.update = this.update, this.Particle_update = this.Particle_update, this.applyArt = this.applyArt, this.kill = this.kill
        }, g = f.prototype = Object.create(d.prototype);
        g.init = g.Particle_init = function () {
            this.age = 0, this.velocity.x = this.startSpeed, this.velocity.y = 0, c.rotatePoint(this.rotation, this.velocity), this.noRotation ? this.rotation = 0 : this.rotation *= c.DEG_TO_RADS, this.rotationSpeed *= c.DEG_TO_RADS, this.alpha = this.startAlpha, this.scale.x = this.scale.y = this.startScale, this.startColor && (this._sR = this.startColor[0], this._sG = this.startColor[1], this._sB = this.startColor[2], this.endColor && (this._eR = this.endColor[0], this._eG = this.endColor[1], this._eB = this.endColor[2])), this._doAlpha = this.startAlpha != this.endAlpha, this._doSpeed = this.startSpeed != this.endSpeed, this._doScale = this.startScale != this.endScale, this._doColor = !!this.endColor, this._doAcceleration = 0 !== this.acceleration.x || 0 !== this.acceleration.y, this._doNormalMovement = this._doSpeed || 0 !== this.startSpeed || this._doAcceleration, this._oneOverLife = 1 / this.maxLife, this.tint = c.combineRGBComponents(this._sR, this._sG, this._sB), this.visible = !0
        }, g.applyArt = function (a) {
            e ? this.texture = a || c.EMPTY_TEXTURE : this.setTexture(a || c.EMPTY_TEXTURE)
        }, g.update = g.Particle_update = function (a) {
            if (this.age += a, this.age >= this.maxLife) return this.kill(), -1;
            var b = this.age * this._oneOverLife;

            //interpolate alpha
            if (1){//this._doAlpha){
                if(this.endAlpha === 0 && this.startAlpha === 0){
                    if(b<=0.5){
                        this.alpha = b*2;
                    }else{
                        this.alpha = 1-2*(b-0.5);
                    }
                } else {
                    this.alpha = (this.endAlpha - this.startAlpha) * b + this.startAlpha;
                }
            }

            if (this.ease && (b = 4 == this.ease.length ? this.ease(b, 0, 1, 1) : this.ease(b)), this._doScale) {
                var d = (this.endScale - this.startScale) * b + this.startScale;
                this.scale.x = this.scale.y = d
            }
            if (this._doNormalMovement) {
                if (this._doSpeed) {
                    var e = (this.endSpeed - this.startSpeed) * b + this.startSpeed;
                    c.normalize(this.velocity), c.scaleBy(this.velocity, e)
                } else if (this._doAcceleration && (this.velocity.x += this.acceleration.x * a, this.velocity.y += this.acceleration.y * a, this.maxSpeed)) {
                    var f = c.length(this.velocity);
                    f > this.maxSpeed && c.scaleBy(this.velocity, this.maxSpeed / f)
                }
                this.position.x += this.velocity.x * a, this.position.y += this.velocity.y * a
            }
            if (this._doColor) {
                var g = (this._eR - this._sR) * b + this._sR, h = (this._eG - this._sG) * b + this._sG,
                    i = (this._eB - this._sB) * b + this._sB;
                this.tint = c.combineRGBComponents(g, h, i)
            }
            return 0 !== this.rotationSpeed ? this.rotation += this.rotationSpeed * a : this.acceleration && !this.noRotation && (this.rotation = Math.atan2(this.velocity.y, this.velocity.x)), b
        }, g.kill = function () {
            this.emitter.recycle(this)
        }, g.Sprite_Destroy = d.prototype.destroy, g.destroy = function () {
            this.parent && this.parent.removeChild(this), this.Sprite_Destroy && this.Sprite_Destroy(), this.emitter = this.velocity = this.startColor = this.endColor = this.ease = this.next = this.prev = null
        }, f.parseArt = function (b) {
            var c;
            for (c = b.length; c >= 0; --c) "string" == typeof b[c] && (b[c] = a.Texture.fromImage(b[c]));
            return b
        }, f.parseData = function (a) {
            return a
        }, a.particles.Particle = f
    }(PIXI), function (a, b) {
        var c = a.particles.ParticleUtils, d = a.particles.Particle,
            e = a.particles.ParticleContainer || a.ParticleContainer, f = function (a, b, c) {
                this._particleConstructor = d, this.particleImages = null, this.startAlpha = 1, this.endAlpha = 1, this.startSpeed = 0, this.endSpeed = 0, this.minimumSpeedMultiplier = 1, this.acceleration = null, this.maxSpeed = NaN, this.startScale = 1, this.endScale = 1, this.minimumScaleMultiplier = 1, this.startColor = null, this.endColor = null, this.minLifetime = 0, this.maxLifetime = 0, this.minStartRotation = 0, this.maxStartRotation = 0, this.noRotation = !1, this.minRotationSpeed = 0, this.maxRotationSpeed = 0, this.particleBlendMode = 0, this.customEase = null, this.extraData = null, this._frequency = 1, this.maxParticles = 1e3, this.emitterLifetime = -1, this.spawnPos = null, this.spawnType = null, this._spawnFunc = null, this.spawnRect = null, this.spawnCircle = null, this.particlesPerWave = 1, this.particleSpacing = 0, this.angleStart = 0, this.rotation = 0, this.ownerPos = null, this._prevEmitterPos = null, this._prevPosIsValid = !1, this._posChanged = !1, this._parentIsPC = !1, this._parent = null, this.addAtBack = !1, this.particleCount = 0, this._emit = !1, this._spawnTimer = 0, this._emitterLife = -1, this._activeParticlesFirst = null, this._activeParticlesLast = null, this._poolFirst = null, this._origConfig = null, this._origArt = null, this.parent = a, b && c && this.init(b, c), this.recycle = this.recycle, this.update = this.update, this.rotate = this.rotate, this.updateSpawnPos = this.updateSpawnPos, this.updateOwnerPos = this.updateOwnerPos
            }, g = f.prototype = {}, h = new a.Point;
        Object.defineProperty(g, "frequency", {
            get: function () {
                return this._frequency
            }, set: function (a) {
                "number" == typeof a && a > 0 ? this._frequency = a : this._frequency = 1
            }
        }), Object.defineProperty(g, "particleConstructor", {
            get: function () {
                return this._particleConstructor
            }, set: function (a) {
                if (a != this._particleConstructor) {
                    this._particleConstructor = a, this.cleanup();
                    for (var b = this._poolFirst; b; b = b.next) b.destroy();
                    this._poolFirst = null, this._origConfig && this._origArt && this.init(this._origArt, this._origConfig)
                }
            }
        }), Object.defineProperty(g, "parent", {
            get: function () {
                return this._parent
            }, set: function (a) {
                if (this._parentIsPC) for (var b = this._poolFirst; b; b = b.next) b.parent && b.parent.removeChild(b);
                this.cleanup(), this._parent = a, this._parentIsPC = e && a && a instanceof e
            }
        }), g.init = function (d, e) {
            if (d && e) {
                this.cleanup(), this._origConfig = e, this._origArt = d, d = Array.isArray(d) ? d.slice() : [d];
                var f = this._particleConstructor;
                this.particleImages = f.parseArt ? f.parseArt(d) : d, e.alpha ? (this.startAlpha = e.alpha.start, this.endAlpha = e.alpha.end) : this.startAlpha = this.endAlpha = 1, e.speed ? (this.startSpeed = e.speed.start, this.endSpeed = e.speed.end, this.minimumSpeedMultiplier = e.speed.minimumSpeedMultiplier || 1) : (this.minimumSpeedMultiplier = 1, this.startSpeed = this.endSpeed = 0);
                var g = e.acceleration;
                g && (g.x || g.y) ? (this.endSpeed = this.startSpeed, this.acceleration = new a.Point(g.x, g.y), this.maxSpeed = e.maxSpeed || NaN) : this.acceleration = new a.Point, e.scale ? (this.startScale = e.scale.start, this.endScale = e.scale.end, this.minimumScaleMultiplier = e.scale.minimumScaleMultiplier || 1) : this.startScale = this.endScale = this.minimumScaleMultiplier = 1, e.color && (this.startColor = c.hexToRGB(e.color.start), e.color.start != e.color.end ? this.endColor = c.hexToRGB(e.color.end) : this.endColor = null), e.startRotation ? (this.minStartRotation = e.startRotation.min, this.maxStartRotation = e.startRotation.max) : this.minStartRotation = this.maxStartRotation = 0, e.noRotation && (this.minStartRotation || this.maxStartRotation) ? this.noRotation = !!e.noRotation : this.noRotation = !1, e.rotationSpeed ? (this.minRotationSpeed = e.rotationSpeed.min,
                    this.maxRotationSpeed = e.rotationSpeed.max) : this.minRotationSpeed = this.maxRotationSpeed = 0, this.minLifetime = e.lifetime.min, this.maxLifetime = e.lifetime.max, this.particleBlendMode = c.getBlendMode(e.blendMode), e.ease ? this.customEase = "function" == typeof e.ease ? e.ease : c.generateEase(e.ease) : this.customEase = null, f.parseData ? this.extraData = f.parseData(e.extraData) : this.extraData = e.extraData || null, this.spawnRect = this.spawnCircle = null, this.particlesPerWave = 1, this.particleSpacing = 0, this.angleStart = 0;
                var h;
                switch (e.spawnType) {
                    case"rect":
                        this.spawnType = "rect", this._spawnFunc = this._spawnRect;
                        var i = e.spawnRect;
                        this.spawnRect = new a.Rectangle(i.x, i.y, i.w, i.h);
                        break;
                    case"circle":
                        this.spawnType = "circle", this._spawnFunc = this._spawnCircle, h = e.spawnCircle, this.spawnCircle = new a.Circle(h.x, h.y, h.r);
                        break;
                    case"ring":
                        this.spawnType = "ring", this._spawnFunc = this._spawnRing, h = e.spawnCircle, this.spawnCircle = new a.Circle(h.x, h.y, h.r), this.spawnCircle.minRadius = h.minR;
                        break;
                    case"burst":
                        this.spawnType = "burst", this._spawnFunc = this._spawnBurst, this.particlesPerWave = e.particlesPerWave, this.particleSpacing = e.particleSpacing, this.angleStart = e.angleStart ? e.angleStart : 0;
                        break;
                    case"point":
                        this.spawnType = "point", this._spawnFunc = this._spawnPoint;
                        break;
                    default:
                        this.spawnType = "point", this._spawnFunc = this._spawnPoint
                }
                this.frequency = e.frequency, this.emitterLifetime = e.emitterLifetime || -1, this.maxParticles = e.maxParticles > 0 ? e.maxParticles : 1e3, this.addAtBack = !!e.addAtBack, this.rotation = 0, this.ownerPos = new a.Point, this.spawnPos = new a.Point(e.pos.x, e.pos.y), this._prevEmitterPos = this.spawnPos.clone(), this._prevPosIsValid = !1, this._spawnTimer = 0, this.emit = e.emit === b || !!e.emit
            }
        }, g.recycle = function (a) {
            a.next && (a.next.prev = a.prev), a.prev && (a.prev.next = a.next), a == this._activeParticlesLast && (this._activeParticlesLast = a.prev), a == this._activeParticlesFirst && (this._activeParticlesFirst = a.next), a.prev = null, a.next = this._poolFirst, this._poolFirst = a, this._parentIsPC ? (a.alpha = 0, a.visible = !1) : a.parent && a.parent.removeChild(a), --this.particleCount
        }, g.rotate = function (a) {
            if (this.rotation != a) {
                var b = a - this.rotation;
                this.rotation = a, c.rotatePoint(b, this.spawnPos), this._posChanged = !0
            }
        }, g.updateSpawnPos = function (a, b) {
            this._posChanged = !0, this.spawnPos.x = a, this.spawnPos.y = b
        }, g.updateOwnerPos = function (a, b) {
            this._posChanged = !0, this.ownerPos.x = a, this.ownerPos.y = b
        }, g.resetPositionTracking = function () {
            this._prevPosIsValid = !1
        }, Object.defineProperty(g, "emit", {
            get: function () {
                return this._emit
            }, set: function (a) {
                this._emit = !!a, this._emitterLife = this.emitterLifetime
            }
        }), g.update = function (a) {
            if (this._parent) {
                var b, c, d;
                for (c = this._activeParticlesFirst; c; c = d) d = c.next, c.update(a);
                var e, f;
                this._prevPosIsValid && (e = this._prevEmitterPos.x, f = this._prevEmitterPos.y);
                var g = this.ownerPos.x + this.spawnPos.x, h = this.ownerPos.y + this.spawnPos.y;
                if (this.emit) for (this._spawnTimer -= a; this._spawnTimer <= 0;) {
                    if (this._emitterLife > 0 && (this._emitterLife -= this._frequency, this._emitterLife <= 0)) {
                        this._spawnTimer = 0, this._emitterLife = 0, this.emit = !1;
                        break
                    }
                    if (this.particleCount >= this.maxParticles) this._spawnTimer += this._frequency; else {
                        var i;
                        if (i = this.minLifetime == this.maxLifetime ? this.minLifetime : Math.random() * (this.maxLifetime - this.minLifetime) + this.minLifetime, -this._spawnTimer < i) {
                            var j, k;
                            if (this._prevPosIsValid && this._posChanged) {
                                var l = 1 + this._spawnTimer / a;
                                j = (g - e) * l + e, k = (h - f) * l + f
                            } else j = g, k = h;
                            b = 0;
                            for (var m = Math.min(this.particlesPerWave, this.maxParticles - this.particleCount); m > b; ++b) {
                                var n, o;
                                if (this._poolFirst ? (n = this._poolFirst, this._poolFirst = this._poolFirst.next, n.next = null) : n = new this.particleConstructor(this), this.particleImages.length > 1 ? n.applyArt(this.particleImages.random()) : n.applyArt(this.particleImages[0]), n.startAlpha = this.startAlpha, n.endAlpha = this.endAlpha, 1 != this.minimumSpeedMultiplier ? (o = Math.random() * (1 - this.minimumSpeedMultiplier) + this.minimumSpeedMultiplier, n.startSpeed = this.startSpeed * o, n.endSpeed = this.endSpeed * o) : (n.startSpeed = this.startSpeed, n.endSpeed = this.endSpeed), n.acceleration.x = this.acceleration.x, n.acceleration.y = this.acceleration.y, n.maxSpeed = this.maxSpeed, 1 != this.minimumScaleMultiplier ? (o = Math.random() * (1 - this.minimumScaleMultiplier) + this.minimumScaleMultiplier, n.startScale = this.startScale * o, n.endScale = this.endScale * o) : (n.startScale = this.startScale, n.endScale = this.endScale), n.startColor = this.startColor, n.endColor = this.endColor, this.minRotationSpeed == this.maxRotationSpeed ? n.rotationSpeed = this.minRotationSpeed : n.rotationSpeed = Math.random() * (this.maxRotationSpeed - this.minRotationSpeed) + this.minRotationSpeed, n.noRotation = this.noRotation, n.maxLife = i, n.blendMode = this.particleBlendMode, n.ease = this.customEase, n.extraData = this.extraData, this._spawnFunc(n, j, k, b), n.init(), n.update(-this._spawnTimer), this._parentIsPC && n.parent) {
                                    var p = this._parent.children;
                                    if (p[0] == n) p.shift(); else if (p[p.length - 1] == n) p.pop(); else {
                                        var q = p.indexOf(n);
                                        p.splice(q, 1)
                                    }
                                    this.addAtBack ? p.unshift(n) : p.push(n)
                                } else this.addAtBack ? this._parent.addChildAt(n, 0) : this._parent.addChild(n);
                                this._activeParticlesLast ? (this._activeParticlesLast.next = n, n.prev = this._activeParticlesLast, this._activeParticlesLast = n) : this._activeParticlesLast = this._activeParticlesFirst = n, ++this.particleCount
                            }
                        }
                        this._spawnTimer += this._frequency
                    }
                }
                this._posChanged && (this._prevEmitterPos.x = g, this._prevEmitterPos.y = h, this._prevPosIsValid = !0, this._posChanged = !1)
            }
        }, g._spawnPoint = function (a, b, c, d) {
            this.minStartRotation == this.maxStartRotation ? a.rotation = this.minStartRotation + this.rotation : a.rotation = Math.random() * (this.maxStartRotation - this.minStartRotation) + this.minStartRotation + this.rotation, a.position.x = b, a.position.y = c
        }, g._spawnRect = function (a, b, d, e) {
            this.minStartRotation == this.maxStartRotation ? a.rotation = this.minStartRotation + this.rotation : a.rotation = Math.random() * (this.maxStartRotation - this.minStartRotation) + this.minStartRotation + this.rotation, h.x = Math.random() * this.spawnRect.width + this.spawnRect.x, h.y = Math.random() * this.spawnRect.height + this.spawnRect.y, 0 !== this.rotation && c.rotatePoint(this.rotation, h), a.position.x = b + h.x, a.position.y = d + h.y
        }, g._spawnCircle = function (a, b, d, e) {
            this.minStartRotation == this.maxStartRotation ? a.rotation = this.minStartRotation + this.rotation : a.rotation = Math.random() * (this.maxStartRotation - this.minStartRotation) + this.minStartRotation + this.rotation, h.x = Math.random() * this.spawnCircle.radius, h.y = 0, c.rotatePoint(360 * Math.random(), h), h.x += this.spawnCircle.x, h.y += this.spawnCircle.y, 0 !== this.rotation && c.rotatePoint(this.rotation, h), a.position.x = b + h.x, a.position.y = d + h.y
        }, g._spawnRing = function (a, b, d, e) {
            var f = this.spawnCircle;
            this.minStartRotation == this.maxStartRotation ? a.rotation = this.minStartRotation + this.rotation : a.rotation = Math.random() * (this.maxStartRotation - this.minStartRotation) + this.minStartRotation + this.rotation, f.minRadius == f.radius ? h.x = Math.random() * (f.radius - f.minRadius) + f.minRadius : h.x = f.radius, h.y = 0;
            var g = 360 * Math.random();
            a.rotation += g, c.rotatePoint(g, h), h.x += this.spawnCircle.x, h.y += this.spawnCircle.y, 0 !== this.rotation && c.rotatePoint(this.rotation, h), a.position.x = b + h.x, a.position.y = d + h.y
        }, g._spawnBurst = function (a, b, c, d) {
            0 === this.particleSpacing ? a.rotation = 360 * Math.random() : a.rotation = this.angleStart + this.particleSpacing * d + this.rotation, a.position.x = b, a.position.y = c
        }, g.cleanup = function () {
            var a, b;
            for (a = this._activeParticlesFirst; a; a = b) b = a.next, this.recycle(a), a.parent && a.parent.removeChild(a);
            this._activeParticlesFirst = this._activeParticlesLast = null, this.particleCount = 0
        }, g.destroy = function () {
            this.cleanup();
            for (var a, b = this._poolFirst; b; b = a) a = b.next, b.destroy();
            this._poolFirst = this._parent = this.particleImages = this.spawnPos = this.ownerPos = this.startColor = this.endColor = this.customEase = null
        }, a.particles.Emitter = f
    }(PIXI), function (a) {
        var b = "undefined" != typeof window ? window : GLOBAL;
        "undefined" == typeof cloudkid && (b.cloudkid = {}), Object.defineProperties(b.cloudkid, {
            AnimatedParticle: {
                get: function () {
                    return PIXI.particles.AnimatedParticle
                }
            }, Emitter: {
                get: function () {
                    return PIXI.particles.Emitter
                }
            }, Particle: {
                get: function () {
                    return PIXI.particles.Particle
                }
            }, ParticleUtils: {
                get: function () {
                    return PIXI.particles.ParticleUtils
                }
            }, PathParticle: {
                get: function () {
                    return PIXI.particles.PathParticle
                }
            }
        })
    }()
}(), !function () {
    "use strict";
    !function (PIXI, undefined) {
        var ParticleUtils = PIXI.particles.ParticleUtils, Particle = PIXI.particles.Particle,
            PathParticle = function (a) {
                Particle.call(this, a), this.path = null, this.initialRotation = 0, this.initialPosition = new PIXI.Point, this.movement = 0
            }, s = Particle.prototype, p = PathParticle.prototype = Object.create(s), helperPoint = new PIXI.Point;
        p.init = function () {
            this.initialRotation = this.rotation, this.Particle_init(), this.path = this.extraData.path, this._doNormalMovement = !this.path, this.movement = 0, this.initialPosition.x = this.position.x, this.initialPosition.y = this.position.y
        };
        for (var MATH_FUNCS = ["pow", "sqrt", "abs", "floor", "round", "ceil", "E", "PI", "sin", "cos", "tan", "asin", "acos", "atan", "atan2", "log"], WHITELISTER = "[01234567890\\.\\*\\-\\+\\/\\(\\)x ,]", index = MATH_FUNCS.length - 1; index >= 0; --index) WHITELISTER += "|" + MATH_FUNCS[index];
        WHITELISTER = new RegExp(WHITELISTER, "g");
        var parsePath = function (pathString) {
            for (var rtn, matches = pathString.match(WHITELISTER), i = matches.length - 1; i >= 0; --i) MATH_FUNCS.indexOf(matches[i]) >= 0 && (matches[i] = "Math." + matches[i]);
            return pathString = matches.join(""), eval("rtn = function(x){ return " + pathString + "; };"), rtn
        };
        p.update = function (a) {
            var b = this.Particle_update(a);
            if (b >= 0 && this.path) {
                var c = (this.endSpeed - this.startSpeed) * b + this.startSpeed;
                this.movement += c * a, helperPoint.x = this.movement, helperPoint.y = this.path(this.movement), ParticleUtils.rotatePoint(this.initialRotation, helperPoint), this.position.x = this.initialPosition.x + helperPoint.x, this.position.y = this.initialPosition.y + helperPoint.y
            }
        }, p.Particle_destroy = Particle.prototype.destroy, p.destroy = function () {
            this.Particle_destroy(), this.path = this.initialPosition = null
        }, PathParticle.parseArt = function (a) {
            return Particle.parseArt(a)
        }, PathParticle.parseData = function (a) {
            var b = {};
            if (a && a.path) try {
                b.path = parsePath(a.path)
            } catch (c) {
                b.path = null
            } else b.path = null;
            return b
        }, PIXI.particles.PathParticle = PathParticle
    }(PIXI)
}(), !function () {
    "use strict";
    !function (a, b) {
        var c = a.particles.ParticleUtils, d = a.particles.Particle, e = a.Texture, f = c.useAPI3, g = function (a) {
            d.call(this, a), this.textures = null, this.duration = 0, this.framerate = 0, this.elapsed = 0, this.loop = !1
        }, h = d.prototype, i = g.prototype = Object.create(h);
        i.init = function () {
            this.Particle_init(), this.elapsed = 0, this.framerate < 0 && (this.duration = this.maxLife, this.framerate = this.textures.length / this.duration)
        }, i.applyArt = function (a) {
            this.textures = a.textures, this.framerate = a.framerate, this.duration = a.duration, this.loop = a.loop
        }, i.update = function (a) {
            if (this.Particle_update(a) >= 0) {
                this.elapsed += a, this.elapsed > this.duration && (this.loop ? this.elapsed = this.elapsed % this.duration : this.elapsed = this.duration - 1e-6);
                var b = this.elapsed * this.framerate + 1e-7 | 0;
                f ? this.texture = this.textures[b] || c.EMPTY_TEXTURE : this.setTexture(this.textures[b] || c.EMPTY_TEXTURE)
            }
        }, i.Particle_destroy = d.prototype.destroy, i.destroy = function () {
            this.Particle_destroy(), this.textures = null
        }, g.parseArt = function (a) {
            var b, c, d, f, g, h, i = [];
            for (b = 0; b < a.length; ++b) {
                for (c = a[b], a[b] = i = {}, i.textures = h = [], f = c.textures, d = 0; d < f.length; ++d) if (g = f[d], "string" == typeof g) h.push(e.fromImage(g)); else if (g instanceof e) h.push(g); else {
                    var j = g.count || 1;
                    for (g = "string" == typeof g.texture ? e.fromImage(g.texture) : g.texture; j > 0; --j) h.push(g)
                }
                "matchLife" == c.framerate ? (i.framerate = -1, i.duration = 0, i.loop = !1) : (i.loop = !!c.loop, i.framerate = c.framerate > 0 ? c.framerate : 60, i.duration = h.length / i.framerate)
            }
            return a
        }, a.particles.AnimatedParticle = g
    }(PIXI)
}(), !function () {
    "use strict";
    !function (a) {
        "extend" in a || (a.extend = function (b, c) {
            if (c) {
                "string" == typeof c && (c = a.include(c));
                var d = c.prototype;
                b.prototype = Object.create(d), Object.defineProperty(b.prototype, "__parent", {
                    configurable: !0,
                    writable: !0,
                    value: d
                })
            }
            return Object.defineProperty(b.prototype, "constructor", {
                configurable: !0,
                writable: !0,
                value: b
            }), b.extend = function (c) {
                return a.extend(c, b)
            }, b.prototype
        })
    }(window), function (a, b) {
        if (!("include" in a)) {
            var c = function (c, d) {
                var e = c.split("."), f = a, g = "";
                d = d === b || !!d;
                for (var h = 0, i = e.length; i > h; h++) {
                    if (g = e[h], !f[g]) {
                        if (!d) return null;
                        throw"Unable to include '" + c + "'"
                    }
                    f = f[g]
                }
                return f
            };
            a.include = c
        }
    }(window), function (a, b) {
        if (!("mixin" in a)) {
            var c = function (c, d) {
                if ("string" == typeof d && (d = a.include(d)), !d.prototype) throw"no mixin prototype";
                var e = d.prototype;
                for (var f in e) {
                    var g = b.getOwnPropertyDescriptor(e, f);
                    g ? b.defineProperty(c, f, g) : c[f] = e[f]
                }
                return d.apply(c, Array.prototype.slice.call(arguments, 2)), c
            };
            a.mixin = c
        }
    }(window, Object), function (a) {
        if (!("namespace" in a)) {
            var b = function (b) {
                for (var c = b.split("."), d = a, e = "", f = 0, g = c.length; g > f; f++) e = c[f], d[e] = d[e] || {}, d = d[e];
                return d
            };
            a.namespace = b
        }
    }(window), function (a, b, c) {
        a.prototype.shuffle || c.defineProperty(a.prototype, "shuffle", {
            enumerable: !1,
            writable: !1,
            value: function () {
                for (var a, c, d = this.length; d; a = b.floor(b.random() * d), c = this[--d], this[d] = this[a], this[a] = c) ;
                return this
            }
        }), a.prototype.random || c.defineProperty(a.prototype, "random", {
            enumerable: !1,
            writable: !1,
            value: function () {
                return this[b.floor(b.random() * this.length)]
            }
        }), a.prototype.last || c.defineProperty(a.prototype, "last", {
            enumerable: !1,
            writable: !1,
            value: function () {
                return this[this.length - 1]
            }
        }), a.prototype.append || c.defineProperty(a.prototype, "append", {
            enumerable: !1,
            writable: !1,
            value: function () {
                for (var b = arguments, c = 0, d = b.length; d > c; ++c) {
                    var e = b[c];
                    if (a.isArray(e)) for (var f = 0, g = e.length; g > f; ++f) this.push(e[f]); else this.push(e)
                }
                return this
            }
        })
    }(Array, Math, Object), function (a) {
        a.randomInt = function (b, c) {
            return void 0 === c && (c = b, b = 0), a.floor(a.random() * (c - b + 1)) + b
        }, a.randomFloat = function (b, c) {
            return void 0 === c && (c = b, b = 0), a.random() * (c - b) + b
        }, a.dist = function (b, c, d, e) {
            return a.sqrt(a.distSq(b, c, d, e))
        }, a.distSq = function (a, b, c, d) {
            return "number" == typeof a.x && a.x == a.x && (d = c, c = b, b = a.y, a = a.x), "number" == typeof c.x && c.x == c.x && (d = c.y, c = c.x), (a - c) * (a - c) + (b - d) * (b - d)
        }, a.clamp = function (a, b, c) {
            return void 0 === c && (c = b, b = 0), a > c ? c : b > a ? b : a
        }, a.roundDecimal = function (b, c) {
            return a.round(b / c) * c
        }
    }(Math), function (a, b) {
        a.prototype.toPaddedString || b.defineProperty(a.prototype, "toPaddedString", {
            enumerable: !1,
            writable: !1,
            value: function (a) {
                a || (a = 2);
                var b, c = this;
                0 > c && (c *= -1, b = "-");
                for (var d = String(Math.floor(c)); d.length < a;) d = "0" + d;
                return b && (d = b + d), d
            }
        })
    }(Number, Object), function (a, b, c) {
        a.merge = function (b, c) {
            b && "object" == typeof b || (b = {});
            for (var d in c) if (c.hasOwnProperty(d)) {
                var e = c[d];
                if ("object" == typeof e && a.isPlain(e)) {
                    b[d] = a.merge(b[d], e);
                    continue
                }
                b[d] = e
            }
            for (var f = 2, g = arguments.length; g > f; f++) a.merge(b, arguments[f]);
            return b
        }, a.isPlain = function (a) {
            var d, e = b.hasOwnProperty;
            if (!a || "object" != typeof a || a.nodeType || a === window) return !1;
            try {
                if (a.constructor && !e.call(a, "constructor") && !e.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (f) {
                return !1
            }
            if (b.ownLast) for (d in a) return e.call(a, d);
            for (d in a) ;
            return d === c || e.call(a, d)
        }, a.prototype.clone || a.defineProperty(a.prototype, "clone", {
            enumerable: !1,
            writable: !0,
            value: function () {
                var a = {}, b = this;
                for (var c in b) a[c] = b[c];
                return a
            }
        })
    }(Object, {}), function () {
        var a = include("createjs.RequestUtils", !1), b = include("createjs.AbstractLoader", !1);
        if (a) {
            var c = a.getTypeByExtension;
            a.getTypeByExtension = function (a) {
                if (a) switch (a.toLowerCase()) {
                    case"fnt":
                        return b.XML
                }
                return c(a)
            }
        }
    }(), function (a, b) {
        b.defineProperty(a.prototype, "format", {
            enumerable: !1, writable: !1, value: function () {
                if (arguments.length < 1) return this;
                var a = Array.isArray(a) ? a : Array.prototype.slice.call(arguments);
                return this.replace(/([^%]|^)%(?:(\d+)\$)?s/g, function (b, c, d) {
                    return d ? c + a[parseInt(d) - 1] : c + a.shift()
                }).replace(/%%s/g, "%s")
            }
        }), a.prototype.reverse || b.defineProperty(a.prototype, "reverse", {
            enumerable: !1,
            writable: !1,
            value: function () {
                for (var a = "", b = this.length - 1; b >= 0; b--) a += this[b];
                return a
            }
        })
    }(String, Object), function () {
        function a() {
            this.currentCallCount = 0
        }

        var b = {};
        b.create = function (b, c) {
            if (!b) return null;
            ("number" != typeof c || 1 > c) && (c = 2);
            var d = function () {
                ++d.currentCallCount >= c && b()
            };
            return d.currentCallCount = 0, d.reset = a, d
        }, namespace("springroll").CombinedCallback = b
    }(), function (a) {
        var b, c = function (c, d, e, f, g) {
            b || (b = include("springroll.Application")), "boolean" == typeof e && (e = {
                repeat: !!e,
                autoDestroy: f === a || !!f,
                useFrames: !!g
            }), e = Object.merge({
                repeat: !1,
                autoDestroy: !0,
                useFrames: !1
            }, e || {}), this._callback = c, this._delay = d, this._timer = d, this._repeat = e.repeat, this._autoDestroy = e.autoDestroy, this._useFrames = e.useFrames, this._paused = !1, this._update = this._update.bind(this), b.instance.on("update", this._update)
        }, d = extend(c);
        d._update = function (a) {
            return this._callback ? (this._timer -= this._useFrames ? 1 : a, void(this._timer <= 0 && (this._callback(this), this._repeat ? this._timer += this._delay : this._autoDestroy ? this.destroy() : b.instance.off("update", this._update)))) : void this.destroy()
        }, d.restart = function () {
            if (this._callback) {
                var a = b.instance;
                a.has("update", this._update) || a.on("update", this._update), this._timer = this._delay, this._paused = !1
            }
        }, d.stop = function () {
            b.instance.off("update", this._update), this._paused = !1
        }, Object.defineProperty(d, "paused", {
            get: function () {
                return this._paused
            }, set: function (a) {
                if (this._callback) {
                    var c = b.instance;
                    this._paused && !a ? (this._paused = !1, c.has("update", this._update) || c.on("update", this._update)) : a && c.has("update", this._update) && (this._paused = !0, c.off("update", this._update))
                }
            }
        }), d.destroy = function () {
            b.instance.off("update", this._update), this._callback = null
        }, namespace("springroll").DelayedCall = c
    }(), function () {
        var a, b = function (b, c, d) {
            void 0 === a && (a = include("springroll.Debug", !1)), this.name = b, this._value = c, this._toString = d || this.name
        };
        Object.defineProperty(b.prototype, "asInt", {
            get: function () {
                return this._value
            }
        }), b.prototype.toString = function () {
            return this._toString
        };
        var c = function () {
            var a = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
            Object.defineProperty(this, "_byValue", {
                enumerable: !1,
                writable: !1,
                value: []
            }), Object.defineProperty(this, "rawEnumValues", {enumerable: !1, writable: !1, value: a});
            for (var c, d, e, f = 0, g = 0, h = a.length; h > g; ++g) "string" == typeof a[g] ? e = a[g] : (e = a[g].name, d = a[g].value || f, f = d), this[e] || (c = "string" == typeof a[g] ? new b(e, f, e) : new b(e, d, a[g].toString || e), this[c.name] = c, this._byValue[f] ? Array.isArray(this._byValue[f]) ? this._byValue[f].push(c) : this._byValue[f] = [this._byValue[f], c] : this._byValue[f] = c, f++);
            Object.defineProperty(this, "length", {
                enumerable: !1,
                writable: !1,
                value: a.length
            }), Object.defineProperty(this, "next", {
                enumerable: !1, writable: !1, value: function (a) {
                    var b = a.asInt + 1;
                    return b >= f ? this.first : this.valueFromInt(b)
                }
            }), Object.defineProperty(this, "first", {
                enumerable: !1,
                writable: !1,
                value: this.valueFromInt(a[0].value || 0)
            }), Object.defineProperty(this, "last", {enumerable: !1, writable: !1, value: this.valueFromInt(f - 1)})
        }, d = extend(c);
        Object.defineProperty(d, "valueFromInt", {
            enumerable: !1, writable: !1, value: function (a) {
                var b = this._byValue[a];
                return b ? Array.isArray(b) ? b[0] : b : null
            }
        }), namespace("springroll").Enum = c
    }(), function (a) {
        var b = {}, c = window.Storage !== a, d = -1;
        if (c) try {
            localStorage.setItem("LS_TEST", "test"), localStorage.removeItem("LS_TEST")
        } catch (e) {
            c = !1
        }
        b.remove = function (a) {
            c ? (localStorage.removeItem(a), sessionStorage.removeItem(a)) : b.write(a, "", d)
        }, b.write = function (a, b, e) {
            if (c) e ? sessionStorage.setItem(a, JSON.stringify(b)) : localStorage.setItem(a, JSON.stringify(b)); else {
                var f;
                f = e ? e !== d ? "" : "; expires=Thu, 01 Jan 1970 00:00:00 GMT" : "; expires=" + new Date(2147483646e3).toGMTString(), document.cookie = a + "=" + escape(JSON.stringify(b)) + f + "; path=/"
            }
        }, b.read = function (a) {
            if (c) {
                var d = localStorage.getItem(a) || sessionStorage.getItem(a);
                return d ? JSON.parse(d, b.reviver) : null
            }
            var e, f, g = a + "=", h = document.cookie.split(";"), i = 0;
            for (i = 0, f = h.length; f > i; i++) {
                for (e = h[i]; " " == e.charAt(0);) e = e.substring(1, e.length);
                if (0 === e.indexOf(g)) return JSON.parse(unescape(e.substring(g.length, e.length)), b.reviver)
            }
            return null
        }, b.reviver = function (a, b) {
            if (b && "string" == typeof b.__classname) {
                var c = include(b.__classname, !1);
                if (c) {
                    var d = new c;
                    if (d.fromJSON) return d.fromJSON(b), d
                }
            }
            return b
        }, namespace("springroll").SavedData = b
    }(), function (a) {
        var b = include("performance", !1), c = b && (b.now || b.mozNow || b.msNow || b.oNow || b.webkitNow);
        c && (b.now = c);
        var d = {};
        d.now = c ? function () {
            return b.now()
        } : Date.now, namespace("springroll").TimeUtils = d
    }(window), function () {
        var a = function (a) {
            this.max = -1, this.options = [];
            var b = 0;
            for (var c in a) b += a[c], this.options.push({key: c, value: b}), this.max += a[c]
        }, b = extend(a);
        b.random = function () {
            for (var a = Math.randomInt(0, this.max), b = 0, c = this.options, d = c.length; d > b; ++b) if (a < c[b].value) return c[b].key;
            return null
        }, namespace("springroll").WeightedRandom = a
    }(), function () {
        for (var a = ["ms", "moz", "webkit", "o"], b = a.length, c = 0; b > c && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[a[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[a[c] + "CancelAnimationFrame"] || window[a[c] + "CancelRequestAnimationFrame"];
        if (!window.requestAnimationFrame) {
            var d = include("springroll.TimeUtils"), e = 0;
            window.requestAnimationFrame = function (a) {
                var b = d.now(), c = Math.max(0, 16 - (b - e)), f = window.setTimeout(function () {
                    a(b + c)
                }, c);
                return e = b + c, f
            }, window.cancelAnimationFrame = function (a) {
                clearTimeout(a)
            }
        }
        window.requestAnimFrame = window.requestAnimationFrame
    }(), function (a) {
        function b(a, b) {
            return a._priority - b._priority
        }

        function c(a) {
            if (null === a) return "null";
            var b = typeof a;
            return "object" === b || "function" === b ? Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase() || "object" : b
        }

        var d = function () {
            this._listeners = {}, this._destroyed = !1
        }, e = extend(d);
        Object.defineProperty(e, "destroyed", {
            enumerable: !0, get: function () {
                return this._destroyed
            }
        }), e.trigger = function (b) {
            if (!this._destroyed && this._listeners.hasOwnProperty(b) && this._listeners[b] !== a) {
                var c, d = this._listeners[b].slice();
                arguments.length > 1 && (c = Array.prototype.slice.call(arguments, 1));
                for (var e = d.length - 1; e >= 0; --e) {
                    var f = d[e];
                    f._eventDispatcherOnce && (delete f._eventDispatcherOnce, this.off(b, f)), f.apply(this, c)
                }
            }
        }, e.once = function (a, b, c) {
            return this.on(a, b, c, !0)
        }, e.on = function (a, d, e, f) {
            if (!this._destroyed) {
                if ("object" === c(a)) for (var g in a) a.hasOwnProperty(g) && this.on(g, a[g], e, f); else if ("function" === c(d)) for (var h, i = a.split(" "), j = null, k = 0, l = i.length; l > k; k++) j = i[k], h = this._listeners.hasOwnProperty(j) ? this._listeners[j] : this._listeners[j] = [], f && (d._eventDispatcherOnce = !0), d._priority = parseInt(e) || 0, -1 === h.indexOf(d) && (h.push(d), h.length > 1 && h.sort(b)); else if (Array.isArray(d)) for (var m = 0, n = d.length; n > m; m++) this.on(a, d[m], e, f);
                return this
            }
        }, e.off = function (b, c) {
            if (!this._destroyed) {
                if (b === a) this._listeners = {}; else if (Array.isArray(c)) for (var d = 0, e = c.length; e > d; d++) this.off(b, c[d]); else for (var f, g, h = b.split(" "), i = null, j = 0, k = h.length; k > j; j++) i = h[j], this._listeners.hasOwnProperty(i) && (f = this._listeners[i], c === a ? f.length = 0 : (g = f.indexOf(c), -1 !== g && f.splice(g, 1)));
                return this
            }
        }, e.has = function (a, b) {
            if (!a || !this._listeners.hasOwnProperty(a)) return !1;
            var c = this._listeners[a];
            return !!c && (b ? c.indexOf(b) >= 0 : c.length > 0)
        }, e.destroy = function () {
            this._destroyed = !0, this._listeners = null
        }, namespace("springroll").EventDispatcher = d
    }(), function (a) {
        var b = include("springroll.EventDispatcher"), c = function () {
            b.call(this), this._properties = {}
        }, d = b.prototype, e = b.extend(c), f = function (a, b) {
            var c = this._properties[a];
            if (c.readOnly) throw"Property '" + a + "' is read-only";
            var d = c.value;
            c.value = b, d != b && this.trigger(a, b)
        }, g = function (a) {
            var b = this._properties[a];
            if (b.responder) {
                var c = b.responder();
                return b.value = c, c
            }
            return b.value
        };
        e.add = function (b, c, d) {
            var e = this._properties, i = e[b];
            if (i !== a) return i.setValue(c), i.setReadOnly(d === a ? i.readOnly : d), this;
            if (this.hasOwnProperty(b)) throw"Object already has property " + b;
            return e[b] = new h(b, c, d), Object.defineProperty(this, b, {
                get: g.bind(this, b),
                set: f.bind(this, b)
            }), this
        }, e.respond = function (b, c) {
            var d = this._properties[b];
            if (d === a) throw"Property " + b + " does not exist";
            return d.responder = c, d.value = c(), this
        }, e.destroy = function () {
            var a;
            for (var b in this._properties) a = this._properties[b], a.value = null, a.responder = null;
            this._properties = null, d.destroy.call(this)
        };
        var h = function (a, b, c) {
            this.name = a, this.setValue(b), this.setReadOnly(c), this.responder = null
        };
        h.prototype.setValue = function (b) {
            this.value = b === a ? null : b
        }, h.prototype.setReadOnly = function (b) {
            this.readOnly = b !== a && !!b
        }, namespace("springroll").PropertyDispatcher = c
    }(), function (a) {
        var b, c = include("springroll.PropertyDispatcher"), d = function (d, e) {
            b === a && (b = include("springroll.Debug", !1)), c.call(this), this._options = e || {}, this._app = d
        }, e = c.extend(d);
        e.init = function () {
            var a = this._options;
            this._app, a = Object.merge({}, a), a.useQueryString && Object.merge(a, f());
            for (var b in a) this.add(b, a[b]);
            var c = this._properties;
            for (var d in c) this.trigger(d, c[d].value)
        };
        var f = function () {
            var b = {}, c = window.location.search;
            if (!c) return b;
            var d = c.substr(c.indexOf("?") + 1), e = d.indexOf("#");
            d = 0 > e ? d : d.substring(0, e);
            for (var f, g = d.split("&"), h = 0, i = g.length; i > h; h++) {
                f = g[h].split("=");
                var j = f[1];
                "true" === j || j === a ? j = !0 : "false" === j && (j = !1), b[f[0]] = j
            }
            return b
        };
        e.asDOMElement = function (a) {
            var b = this._properties[a];
            b && b.value && "string" == typeof b.value && (b.value = document.getElementById(b.value))
        }, e.override = function (b, c) {
            var d = this._properties[b];
            if (d === a) throw"Invalid override " + b;
            return d.setValue(c), this
        }, namespace("springroll").ApplicationOptions = d
    }(), function () {
        var a, b = function (b) {
            a || (a = include("springroll.Application")), this.priority = b || 0, this.setup = function () {
            }, this.preload = null, this.teardown = function () {
            }, a._plugins.push(this), a._plugins.sort(function (a, b) {
                return b.priority - a.priority
            })
        };
        namespace("springroll").ApplicationPlugin = b
    }(), function (a) {
        var b = include("springroll.TimeUtils"), c = include("springroll.EventDispatcher"),
            d = include("springroll.ApplicationOptions"), e = include("springroll.DelayedCall"), f = function (a, b) {
                if (r) throw"Only one Application can be opened at a time";
                r = this, c.call(this), this.options = new d(this, a), this.display = null, this.init = b || null, this.pluginLoad = null, q = {}, p = [], j = this._tick.bind(this), f._plugins.forEach(function (a) {
                    a.setup.call(r)
                }), this.options.init(), this.name = this.options.name, setTimeout(this._preInit.bind(this), 0)
            };
        f.version = "0.4.26";
        var g = c.prototype, h = c.extend(f);
        f._plugins = [];
        var i = 0, j = null, k = !1, l = !0, m = -1, n = !1, o = 0, p = null, q = null, r = null;
        Object.defineProperty(f, "instance", {
            get: function () {
                return r
            }
        }), h._preInit = function () {
            if (!this.destroyed) {
                var a = this.options;
                n = a.raf, a.on("raf", function (a) {
                    n = a
                }), a.on("fps", function (a) {
                    "number" == typeof a && (o = 1e3 / a | 0)
                }), a.canvasId && a.display && this.addDisplay(a.canvasId, a.display, a.displayOptions);
                var b = [];
                f._plugins.forEach(function (a) {
                    a.preload && b.push(a.preload.bind(r))
                }), this.pluginLoad = this.load(b, {
                    complete: this._doInit.bind(this),
                    progress: s.bind(this),
                    autoStart: !1,
                    startAll: !1
                }), this.pluginLoad.start()
            }
        };
        var s = function (a) {
            this.trigger("pluginProgress", a)
        };
        h._doInit = function () {
            this.destroyed || (this.pluginLoad = null, this.trigger("beforeInit"), this.paused = !1, this.trigger("init"), this.init && this.init.call(this), this.trigger("afterInit"))
        }, Object.defineProperty(h, "enabled", {
            set: function (a) {
                l = a, p.forEach(function (b) {
                    b.enabled = a
                })
            }, get: function () {
                return l
            }
        }), Object.defineProperty(h, "paused", {
            get: function () {
                return k
            }, set: function (a) {
                k = !!a, this.internalPaused(k)
            }
        }), h.internalPaused = function (a) {
            this.trigger("pause", a), this.trigger(a ? "paused" : "resumed", a), a ? -1 != m && (n ? cancelAnimationFrame(m) : clearTimeout(m), m = -1) : -1 == m && j && (i = b.now(), m = n ? requestAnimFrame(j) : t(j))
        };
        var t = function (a, b) {
            var c = o;
            return b && (c = Math.max(0, o - b)), setTimeout(a, c)
        };
        h.addDisplay = function (a, b, c) {
            if (q[a]) throw"Display exists with id '" + a + "'";
            var d = new b(a, c);
            return q[a] = d, p.push(d), d.enabled = l, this.display || (this.display = d), this.trigger("displayAdded", d), d
        }, Object.defineProperty(h, "displays", {
            get: function () {
                return p
            }
        }), h.getDisplay = function (a) {
            return q[a]
        }, h.removeDisplay = function (a) {
            var b = q[a];
            b && (p.splice(p.indexOf(b), 1), b.destroy(), delete q[a], this.trigger("displayRemoved", a))
        }, h._tick = function () {
            if (k) return void(m = -1);
            var a = b.now(), c = a - i;
            if (i = a, this.trigger("update", c), p) for (var d = 0; d < p.length; d++) p[d].render(c);
            j && (m = n ? requestAnimFrame(j) : t(j, b.now() - i))
        }, h.setTimeout = function (a, b, c, d) {
            return new e(a, b, (!1), d, c)
        }, h.setInterval = function (a, b, c) {
            return new e(a, b, (!0), (!1), c)
        }, h.destroy = function () {
            if (!this.destroyed) {
                this.paused = !0, this.trigger("destroy");
                var a = f._plugins.slice().reverse();
                a.forEach(function (a) {
                    a.teardown.call(r)
                }), p.forEach(function (a) {
                    a.destroy()
                }), p = null, q = null, r = j = null, this.display = null, this.options.destroy(), this.options = null, g.destroy.call(this)
            }
        }, h.toString = function () {
            return "[Application name='" + this.name + "']"
        }, namespace("springroll").Application = f
    }(), function () {
        var a = include("springroll.ApplicationPlugin"), b = include("createjs.Tween", !1),
            c = include("createjs.Ticker", !1), d = new a(120);
        d.setup = function () {
            var a = this.options;
            a.add("raf", !0, !0), a.add("fps", 60, !0), a.add("useQueryString", !1, !0), a.add("canvasId", null, !0), a.add("display", null, !0), a.add("displayOptions", null, !0);
            var d = this;
            a.add("updateTween", !0, !0).on("updateTween", function (a) {
                b && (c && c.setPaused(!!a), d.off("update", b.tick), a && d.on("update", b.tick))
            }), a.add("name", "", !0)
        }
    }(), function (a, b, c) {
        var d = function (a, d) {
            this._onFocus = a, this._onBlur = d, this._enabled = !1, (f || b.onfocusin !== c) && (this._onToggle = function () {
                b.hidden || b.webkitHidden || b.msHidden || b.mozHidden ? this._onBlur() : this._onFocus()
            }.bind(this), this.enabled = !0)
        }, e = extend(d), f = null;
        b.hidden !== c ? f = "visibilitychange" : b.mozHidden !== c ? f = "mozvisibilitychange" : b.msHidden !== c ? f = "msvisibilitychange" : b.webkitHidden !== c && (f = "webkitvisibilitychange");
        var g = !f && b.onfocusin !== c;
        Object.defineProperty(e, "enabled", {
            get: function () {
                return this._enabled
            }, set: function (c) {
                c = !!c, this._enabled != c && (this._enabled = c, a.removeEventListener("pagehide", this._onBlur), a.removeEventListener("pageshow", this._onFocus), a.removeEventListener("blur", this._onBlur), a.removeEventListener("focus", this._onFocus), a.removeEventListener("visibilitychange", this._onToggle), b.removeEventListener(f, this._onToggle, !1), g && (b.removeEventListener("focusin", this._onFocus), b.removeEventListener("focusout", this._onBlur)), c && (b.addEventListener(f, this._onToggle, !1), a.addEventListener("pagehide", this._onBlur), a.addEventListener("pageshow", this._onFocus), a.addEventListener("blur", this._onBlur), a.addEventListener("focus", this._onFocus), a.addEventListener("visibilitychange", this._onToggle, !1), g && (b.addEventListener("focusin", this._onFocus), b.addEventListener("focusout", this._onBlur))))
            }
        }), e.destroy = function () {
            f && this._onToggle && (this.enabled = !1, this._onToggle = null, this._onFocus = null, this._onBlur = null)
        }, namespace("springroll").PageVisibility = d
    }(window, document), function () {
        var a = include("springroll.ApplicationPlugin"), b = new a;
        b.setup = function () {
            var a = include("springroll.PageVisibility"), b = this._visibility = new a(d.bind(this), c.bind(this));
            this.options.add("autoPause", !0).on("autoPause", function (a) {
                b.enabled = a
            }).respond("autoPause", function () {
                return b.enabled
            }), Object.defineProperty(this, "autoPaused", {
                set: function (a) {
                    this.paused || this.internalPaused(a)
                }
            })
        };
        var c = function () {
            this.autoPaused = !0
        }, d = function () {
            this.autoPaused = !1
        };
        b.teardown = function () {
            this._visibility && this._visibility.destroy(), this._visibility = null
        }
    }(), function () {
        var a = function () {
            this._filters = []
        }, b = extend(a);
        b.add = function (a, b) {
            if (!a || "string" != typeof a && a instanceof RegExp == 0) throw"invalide replace value";
            if ("string" != typeof b) throw"invalid replacement value";
            if (this._filters) {
                for (var c = this._filters.length - 1; c >= 0; c--) if (a.toString() == this._filters[c].replace.toString()) throw"Filter already exists.";
                this._filters.push({replace: a, replacement: b})
            }
        }, b.filter = function (a) {
            if (!this._filters) return a;
            for (var b = this._filters.length - 1; b >= 0; b--) {
                var c = this._filters[b].replace, d = this._filters[b].replacement;
                a = a.replace(c, d)
            }
            return a
        }, b.destroy = function () {
            this._filters = null
        }, namespace("springroll").StringFilters = a
    }(), function () {
        var a = include("springroll.ApplicationPlugin"), b = new a(110);
        b.setup = function () {
            var a = include("springroll.StringFilters");
            this.filters = new a
        }, b.teardown = function () {
            this.filters && this.filters.destroy(), this.filters = null
        }
    }(), function () {
        var a = include("springroll.ApplicationPlugin"), b = include("devicePixelRatio", !1), c = new a(100), d = null,
            e = 0, f = 0, g = 0, h = 0, i = {width: 0, height: 0, normalWidth: 0, normalHeight: 0}, j = null;
        c.setup = function () {
            var a = this.options;
            a.add("maxWidth", 0), a.add("maxHeight", 0), a.add("uniformResize", !0), a.add("responsive", !1, !0), a.add("resizeElement", "frame", !0), a.add("enableHiDPI", !1), a.on("maxWidth", function (a) {
                e = a
            }), a.on("maxHeight", function (a) {
                f = a
            }), this.once("displayAdded", function (a) {
                g = a.width, h = a.height, e || (e = g), f || (f = h)
            }), this.realWidth = 0, this.realHeight = 0, this.triggerResize = function () {
                if (d) {
                    i.width = 0 | (d.innerWidth || d.clientWidth), i.height = 0 | (d.innerHeight || d.clientHeight), this.calculateDisplaySize(i);
                    var a = this.realWidth = i.width, c = this.realHeight = i.height, e = i.normalWidth,
                        f = i.normalHeight, g = this.options.responsive, h = this.options.enableHiDPI;
                    this.displays.forEach(function (d) {
                        g ? (h && b && (d.canvas.style.width = a + "px", d.canvas.style.height = c + "px", a *= b, c *= b), d.resize(a, c)) : (d.canvas.style.width = a + "px", d.canvas.style.height = c + "px", h && b && (e *= b, f *= b), d.resize(e, f))
                    }), this.trigger("resize", g ? a : e, g ? c : f), this.displays.forEach(function (a) {
                        a.render(0, !0)
                    })
                }
            }, this.onWindowResize = function () {
                this.triggerResize(), j = this.setTimeout(function () {
                    this.triggerResize(), j = null
                }.bind(this), 500)
            }, this.calculateDisplaySize = function (a) {
                if (h && this.options.uniformResize) {
                    var b = e / h, c = g / f, d = g / h, i = a.width / a.height;
                    c > i ? a.height = a.width / c : i > b && (a.width = a.height * b), i = a.width / a.height, a.normalWidth = g, a.normalHeight = h, i > d ? a.normalWidth = h * i : d > i && (a.normalHeight = g / i), a.width = Math.ceil(a.width), a.height = Math.ceil(a.height), a.normalWidth = Math.ceil(a.normalWidth), a.normalHeight = Math.ceil(a.normalHeight)
                }
            }, this.once("beforeInit", this.triggerResize)
        }, c.preload = function (a) {
            var b = this.options;
            b.asDOMElement("resizeElement"), b.resizeElement && (d = b.resizeElement, this.onWindowResize = this.onWindowResize.bind(this), window.addEventListener("resize", this.onWindowResize)), a()
        }, c.teardown = function () {
            j && (j.destroy(), j = null), d && window.removeEventListener("resize", this.onWindowResize), d = null, i.width = i.height = i.normalWidth = i.normalHeight = g = h = f = e = 0
        }
    }(), function (a) {
        var b = function (a) {
            this._app = a, this._versions = {}, this._filters = [], this._globalVersion = null, this._applySpecificVersion = this._applySpecificVersion.bind(this), this._applyGlobalVersion = this._applyGlobalVersion.bind(this), this.cacheBust = !1
        }, c = extend(b);
        Object.defineProperty(c, "cacheBust", {
            get: function () {
                return !(!this._globalVersion || 0 !== this._globalVersion.indexOf("cb="))
            }, set: function (a) {
                if (a) this._globalVersion = "cb=" + Date.now(), this.unregisterURLFilter(this._applySpecificVersion), this.registerURLFilter(this._applyGlobalVersion); else {
                    var b = this._app.options.version;
                    this._globalVersion = b ? "v=" + b : null, this._globalVersion ? (this.unregisterURLFilter(this._applySpecificVersion), this.registerURLFilter(this._applyGlobalVersion)) : (this.unregisterURLFilter(this._applyGlobalVersion), this.registerURLFilter(this._applySpecificVersion))
                }
            }
        }), c.destroy = function () {
            this._app = null, this._versions = null, this._filters = null, this._applySpecificVersion = null, this._applyGlobalVersion = null
        }, c.addVersionsFile = function (a, b, c) {
            if (this.cacheBust) return void(b && b());
            this.addVersion(a, Date.now().toString()), a = this._applySpecificVersion(a);
            var d = this;
            this._app.load(a, function (a) {
                if (a) {
                    var e, f, g = a.replace(/\r/g, "").split("\n");
                    for (e = 0, len = g.length; e < len; e++) g[e] && (f = g[e].split(" "), 2 == f.length && d.addVersion((c || "") + f[0], f[1]))
                }
                b && b()
            })
        }, c.addVersion = function (a, b) {
            this._versions[a] || (this._versions[a] = b)
        }, c.registerURLFilter = function (a) {
            -1 == this._filters.indexOf(a) && this._filters.push(a)
        }, c.unregisterURLFilter = function (a) {
            var b = this._filters.indexOf(a);
            b > -1 && this._filters.splice(b, 1)
        }, c._applySpecificVersion = function (a) {
            var b = this._app.options.basePath;
            if (b && b.indexOf("?") > 0) return a;
            var c = this._versions[a];
            return c && /(\?|\&)v\=[0-9]*/.test(a) === !1 && (a = a + (a.indexOf("?") < 0 ? "?" : "&") + "v=" + c.version), a
        }, c._applyGlobalVersion = function (a) {
            if (!this._globalVersion) return a;
            var b = this._app.options.basePath;
            if (b && b.indexOf("?") > 0) return a;
            var c = 0 === this._globalVersion.indexOf("cb=") ? /(\?|\&)cb\=[0-9]*/ : /(\?|\&)v\=/;
            return c.test(a) === !1 && (a = a + (a.indexOf("?") < 0 ? "?" : "&") + this._globalVersion), a
        }, c._applyBasePath = function (a) {
            var b = this._app.options.basePath;
            return b && /^http(s)?\:/.test(a) === !1 && -1 == a.search(b) && (a = b + a), a
        }, c.prepare = function (a, b) {
            b && (a = this._applyBasePath(a));
            for (var c = 0, d = this._filters.length; d > c; ++c) a = this._filters[c](a);
            return a
        }, namespace("springroll").CacheManager = b
    }(), function () {
        var a, b = include("springroll.Application"), c = function (b, d) {
            if (void 0 === a && (a = include("springroll.Debug", !1)), this.status = c.WAITING, this.complete = b.complete || null, this.cache = !!b.cache, this.id = b.id || null, this.type = b.type || null, this.original = b, this.cache && !this.id) {
                if (d && "string" == typeof d) {
                    var e = d.lastIndexOf(".");
                    e > -1 && (d = d.substr(0, e));
                    var f = d.lastIndexOf("/");
                    f > -1 && (d = d.substr(f + 1)), b.id = this.id = d
                }
                this.id || (this.cache = !1)
            }
        }, d = extend(c);
        c.WAITING = 0, c.RUNNING = 1, c.FINISHED = 2, d.start = function (a) {
            a()
        }, d.filter = function (a) {
            var c = b.instance.assetManager.sizes;
            if (a && c.test(a)) {
                var d = c.size(this.original.sizes);
                a = c.filter(a, d), this.original.scale = d.scale
            }
            return a
        }, d.load = function (a, c) {
            return b.instance.load(a, c)
        }, d.simpleLoad = function (a, c, d, e) {
            return b.instance.loader.load(a, c, d, e)
        }, d.destroy = function () {
            this.status = c.FINISHED, this.id = null, this.type = null, this.complete = null, this.original = null
        }, namespace("springroll").Task = c
    }(), function () {
        var a = include("springroll.Task"), b = function (b) {
            a.call(this, b), this.async = b.async
        }, c = a.extend(b);
        b.test = function (a) {
            return !!a.async
        }, c.start = function (a) {
            this.async(a)
        }, c.destroy = function () {
            a.prototype.destroy.call(this), this.async = null
        }, namespace("springroll").FunctionTask = b
    }(), function () {
        var a = include("springroll.Task"), b = function (b) {
            a.call(this, b, b.color), this.color = this.filter(b.color), this.alpha = this.filter(b.alpha)
        }, c = a.extend(b);
        b.test = function (a) {
            return !!a.color && !!a.alpha
        }, c.start = function (a) {
            this.load({_alpha: this.alpha, _color: this.color}, function (c) {
                a(b.mergeAlpha(c._color, c._alpha)), c._color.src = c._alpha.src = ""
            })
        }, b.mergeAlpha = function (a, b, c) {
            c || (c = document.createElement("canvas")), c.width = Math.max(b.width, a.width), c.height = Math.max(b.height, a.height);
            var d = c.getContext("2d");
            return d.save(), d.drawImage(a, 0, 0), d.globalCompositeOperation = "destination-in", d.drawImage(b, 0, 0), d.restore(), c
        }, namespace("springroll").ColorAlphaTask = b
    }(), function () {
        var a = include("springroll.Task"), b = function (b) {
            a.call(this, b), this.assets = b.assets, this.cacheAll = b.cacheAll, this.progress = b.progress
        }, c = a.extend(b);
        b.test = function (a) {
            return !!a.assets && (Array.isArray(a.assets) || Object.isPlain(a.assets))
        }, c.start = function (a) {
            this.load(this.assets, {complete: a, progress: this.progress, cacheAll: this.cacheAll})
        }, c.destroy = function () {
            a.prototype.destroy.call(this), this.assets = null
        }, namespace("springroll").ListTask = b
    }(), function () {
        var a = include("springroll.Task"), b = function (b) {
            a.call(this, b, b.src), this.src = this.filter(b.src), this.progress = b.progress || null, this.data = b.data || null, this.advanced = !!b.advanced
        }, c = a.extend(b);
        b.test = function (a) {
            return !!a.src
        }, c.start = function (a) {
            var b = this.advanced;
            this.simpleLoad(this.src, function (c) {
                var d = c;
                d && !b && (d = c.content, c.destroy()), a(d)
            }, this.progress, this.data)
        }, c.destroy = function () {
            a.prototype.destroy.call(this), this.data = null, this.progress = null
        }, namespace("springroll").LoadTask = b
    }(), function (a) {
        var b, c = include("createjs.LoadQueue"), d = include("createjs.Sound", !1), e = function () {
            c.call(this, !0), b === a && (b = include("springroll.Debug", !1)), this.retries = 0, this.url = null, this.preparedUrl = null, this.data = null, this.onComplete = null, this.onProgress = null, this._onFailed = this._onFailed.bind(this), this._onProgress = this._onProgress.bind(this), this._onCompleted = this._onCompleted.bind(this), d && this.installPlugin(d)
        }, f = extend(e, c);
        e.MAX_RETRIES = 3, f.toString = function () {
            return "[LoaderItem(url:'" + this.url + "')]"
        }, Object.defineProperty(f, "basePath", {
            set: function (a) {
                this._basePath = a
            }
        }), Object.defineProperty(f, "crossOrigin", {
            set: function (a) {
                this._crossOrigin = a
            }
        }), f.clear = function () {
            this.basePath = "", this.crossOrigin = !1, this.retries = 0, this.onComplete = null, this.onProgress = null, this.data = null, this.preparedUrl = null, this.url = null, this.removeAllEventListeners(), this.removeAll(), this.close()
        }, f.start = function (a) {
            this.addEventListener("fileload", this._onCompleted), this.addEventListener("error", this._onFailed), this.addEventListener("fileprogress", this._onProgress), this._internalStart()
        }, f._internalStart = function () {
            var a = this.preparedUrl;
            this.data && this.data.id && (a = {id: this.data.id, src: a, data: this.data}), this.loadFile(a)
        }, f._onProgress = function (a) {
            this.onProgress && this.onProgress(this.progress)
        }, f._onFailed = function (a) {
            this.retry()
        }, f.retry = function () {
            this.retries++, this.retries > e.MAX_RETRIES ? this.onComplete(this, null) : this._internalStart()
        }, f._onCompleted = function (a) {
            this.onComplete(this, a.result)
        }, namespace("springroll").LoaderItem = e
    }(), function () {
        var a = function (a, b, c) {
            this.content = a, this.url = b, this.data = c, this.id = null
        }, b = extend(a);
        b.toString = function () {
            return "[LoaderResult(url: '" + this.url + "')]"
        }, b.reset = function () {
            this.content = this.url = this.data = this.id = null
        }, b.destroy = function () {
            this.reset()
        }, namespace("springroll").LoaderResult = a
    }(), function (a) {
        var b = include("springroll.LoaderItem"), c = include("springroll.CacheManager"),
            d = include("springroll.LoaderResult"), e = function (a) {
                this.app = a, this.maxCurrentLoads = 2, this.cacheManager = new c(a), this.items = {}, this.itemPool = []
            }, f = extend(e);
        f.destroy = function () {
            this.itemPool && this.itemPool.forEach(function (a) {
                a.clear()
            }), this.itemPool = null, this.cacheManager && this.cacheManager.destroy(), this.cacheManager = null, this.items = null
        }, f.load = function (b, c, d, e) {
            var f = this.app.options, g = this._getItem(), h = f.basePath;
            return h !== a && /^http(s)?\:/.test(b) === !1 && -1 == b.search(h) && (g.basePath = h), g.crossOrigin = f.crossOrigin, g.url = b, g.preparedUrl = this.cacheManager.prepare(b), g.onComplete = this._onComplete.bind(this, c), g.onProgress = d || null, g.data = e || null, g.setMaxConnections(this.maxCurrentLoads), this.items[b] = g, g.start(), g
        }, f._onComplete = function (a, b, c) {
            c && (c = new d(c, b.url, b.data)), a(c), this._putItem(b)
        }, f.cancel = function (a) {
            var b = this.items[a];
            return !!b && (b.clear(), this._putItem(b), !0)
        }, f._getItem = function () {
            var a = this.itemPool;
            return a.length ? a.pop() : new b
        }, f._putItem = function (a) {
            delete this.items[a.url], a.clear(), this.itemPool.push(a)
        }, namespace("springroll").Loader = e
    }(), function (a) {
        function b(a) {
            a && (a.destroy && a.destroy(), "IMG" == a.tagName && (a.src = ""))
        }

        var c, d = function () {
            c === a && (c = include("springroll.Debug", !1)), this._cache = {}
        }, e = extend(d);
        e.read = function (a) {
            return this._cache[a] || null
        }, e.write = function (a, b) {
            this._cache[a] && this["delete"](a), this._cache[a] = b
        }, e["delete"] = function (a) {
            var c = "string" == typeof a ? a : a.id;
            if (c) {
                var d = this._cache[c];
                if (d) {
                    if (Object.isPlain(d)) for (var e in d) b(d[e]); else Array.isArray(d) ? d.forEach(b) : b(d);
                    delete this._cache[c]
                }
            }
        }, e.empty = function () {
            for (var a in this._cache) this["delete"](a)
        }, e.destroy = function () {
            this.empty(), this._cache = null
        }, namespace("springroll").AssetCache = d
    }(), function () {
        var a, b = include("devicePixelRatio", !1) || 1, c = function () {
            void 0 === a && (a = include("springroll.Debug", !1)), this._sizes = [], this._sizesMap = {}, this._preferredSize = null
        }, d = extend(c);
        c.SIZE_TOKEN = "%SIZE%", d.reset = function () {
            this._sizes.length = 0, this._sizesMap = {}
        }, d.define = function (a, b, c, d) {
            var e = {id: a, maxSize: b, scale: c, fallback: d};
            this._sizesMap[a] = e, this._sizes.push(e), this._sizes.sort(function (a, b) {
                return a.maxSize - b.maxSize
            })
        }, d.filter = function (a, b) {
            return b = b || this._preferredSize, a.replace(c.SIZE_TOKEN, b.id)
        }, d.test = function (a) {
            return a.indexOf(c.SIZE_TOKEN) > -1
        }, d.size = function (a) {
            var b = this._preferredSize, c = b.fallback;
            if (a && !a[b.id]) for (var d = 0, e = c.length; e > d; d++) {
                var f = c[d];
                if (a[f] !== !1) {
                    b = this._sizesMap[f];
                    break
                }
            }
            if (!b) throw"Asset does not support any valid size";
            return b
        }, d.refresh = function (a, c) {
            for (var d = Math.min(a, c), e = null, f = this._sizes, g = f.length - 1; g >= 0 && f[g].maxSize / b > d; --g) e = f[g];
            this._preferredSize = e
        }, d.destroy = function () {
            this._preferredSize = null, this._sizes = null, this._sizesMap = null
        }, namespace("springroll").AssetSizes = c
    }(), function (a) {
        function b(a) {
            return c(a) ? {src: a} : d(a) ? {async: a} : a
        }

        function c(a) {
            return "string" == typeof a
        }

        function d(a) {
            return "function" == typeof a
        }

        var e, f = include("springroll.Task"), g = include("springroll.EventDispatcher"), h = function (a) {
            g.call(this), this.manager = a, this.mode = k, this.startAll = !0, this.cacheAll = !1, this.tasks = [], this.results = null, this.running = !1, this.numLoaded = 0, this.total = 0, this.type = null
        }, i = g.extend(h);
        i.setup = function (a, b) {
            this.startAll = b.startAll, this.cacheAll = b.cacheAll, this.type = b.type, this.mode = this.addTasks(a), this.results = m(this.mode), b.autoStart && this.start()
        }, i.start = function () {
            this.trigger("progress", 0), this.running = !0, this.nextTask()
        }, i.reset = function () {
            this.tasks.forEach(function (a) {
                a.status = f.FINISHED, a.destroy()
            }), this.total = 0, this.numLoaded = 0, this.mode = k, this.tasks.length = 0, this.results = null, this.type = null, this.startAll = !0, this.cacheAll = !1, this.running = !1
        };
        var j = 0, k = 1, l = 2;
        i.addTasks = function (c) {
            var d, e = k;
            c = b(c), c.type === a && this.type && (c.type = this.type);
            var f = this.getTaskByAsset(c);
            if (f) return this.addTask(c), j;
            c.type === this.type && this.type && delete c.type;
            var g;
            if (Array.isArray(c)) for (var h = 0; h < c.length; h++) d = b(c[h]), g = this.addTask(d), g.id || (e = l); else if (Object.isPlain(c)) for (var i in c) d = b(c[i]), g = this.addTask(d), g.id || (g.id = i);
            return e
        }, i.addTask = function (b) {
            b.type === a && this.type && (b.type = this.type);
            var c, d = this.getTaskByAsset(b);
            return d ? (b.cache === a && this.cacheAll && (b.cache = !0), c = new d(b), this.tasks.push(c), ++this.total) : e && e.error("Unable to find a task definition for asset", b), c
        }, i.getTaskByAsset = function (a) {
            for (var b, c = this.manager.taskDefs, d = 0, e = c.length; e > d; d++) if (b = c[d], b.test(a)) return b;
            return null
        }, i.nextTask = function () {
            for (var a = this.tasks, b = 0; b < a.length; b++) {
                var c = a[b];
                if (c.status === f.WAITING && (c.status = f.RUNNING, c.start(this.taskDone.bind(this, c)), !this.startAll)) return
            }
        }, i.taskDone = function (a, b) {
            if (this.running) {
                b = b || null;
                var c = this.tasks.indexOf(a);
                if (-1 !== c) {
                    this.tasks.splice(c, 1);
                    var d = [];
                    if (b) {
                        switch (this.mode) {
                            case j:
                                this.results = b;
                                break;
                            case l:
                                this.results.push(b);
                                break;
                            case k:
                                this.results[a.id] = b
                        }
                        a.cache && this.manager.cache.write(a.id, b)
                    }
                    a.complete && a.complete(b, a.original, d), this.trigger("taskDone", b, a.original, d), a.destroy();
                    var e = this.addTasks(d);
                    if (this.trigger("progress", ++this.numLoaded / this.total), this.mode === k && e !== this.mode) throw"Assets require IDs";
                    this.tasks.length ? this.nextTask() : this.trigger("complete", this.results)
                }
            }
        };
        var m = function (a) {
            switch (a) {
                case j:
                    return null;
                case l:
                    return [];
                case k:
                    return {}
            }
        };
        i.destroy = function () {
            g.prototype.destroy.call(this), this.reset(), this.tasks = null, this.manager = null
        }, namespace("springroll").AssetLoad = h
    }(), function (a) {
        var b = include("springroll.AssetLoad"), c = include("springroll.AssetCache"),
            d = include("springroll.AssetSizes"), e = (include("springroll.Task"), function () {
                this.loads = [], this.loadPool = [], this.taskDefs = [], this.cache = new c, this.sizes = new d, this.defaultType = null, this.sizes.define("half", 400, .5, ["full"]), this.sizes.define("full", 1e4, 1, ["half"])
            }), f = extend(e);
        f.register = function (a, b) {
            "string" == typeof a && (a = include(a, !1)), a && (a.priority = b || 0, this.taskDefs.push(a), this.taskDefs.sort(function (a, b) {
                return b.priority - a.priority
            }))
        }, f.load = function (a, b) {
            b = Object.merge({
                complete: null,
                progress: null,
                taskDone: null,
                cacheAll: !1,
                startAll: !0,
                autoStart: !0,
                type: this.defaultType
            }, b);
            var c = this.getLoad();
            return this.loads.push(c), b.complete = this._onLoaded.bind(this, b.complete, c), c.once("complete", b.complete), b.progress && c.on("progress", b.progress), b.taskDone && c.on("taskDone", b.taskDone), c.setup(a, b), c
        }, f.poolLoad = function (a) {
            a.off("complete progress taskDone"), a.reset(), this.loadPool.push(a)
        }, f.getLoad = function () {
            return this.loadPool.length > 0 ? this.loadPool.pop() : new b(this)
        }, f._onLoaded = function (a, b, c) {
            var d = this.loads.indexOf(b);
            d > -1 && this.loads.splice(d, 1), a && a(c), this.poolLoad(b)
        }, f.destroy = function () {
            this.sizes.destroy(), this.sizes = null, this.cache.destroy(), this.cache = null, this.loadPool = null, this.loads = null, this.taskDefs = null
        }, namespace("springroll").AssetManager = e
    }(), function () {
        var a = include("springroll.ApplicationPlugin"), b = include("springroll.Loader"),
            c = include("springroll.AssetManager"), d = new a(100);
        d.setup = function () {
            var a = this.loader = new b(this), d = this.assetManager = new c;
            d.register("springroll.LoadTask"), d.register("springroll.ListTask"), d.register("springroll.FunctionTask", 10), d.register("springroll.ColorAlphaTask", 20);
            var e = this.options;
            e.add("cacheBust", !1).respond("cacheBust", function () {
                return a.cacheManager.cacheBust
            }).on("cacheBust", function (b) {
                a.cacheManager.cacheBust = "true" == b || !!b
            }), e.add("basePath"), e.add("version", null, !0), e.add("versionsFile", null, !0), e.add("defaultAssetType").on("defaultAssetType", function (a) {
                d.defaultType = a
            }), this.load = function (a, b, c, e, f) {
                var g;
                return "string" == typeof a ? a = {
                    src: a,
                    progress: c || null,
                    complete: b || null,
                    cache: !!e,
                    data: f || null
                } : (g = b, "function" == typeof b && (g = {complete: b})), d.load(a, g)
            }, this.unload = function (a) {
                "string" == typeof a && (a = Array.prototype.slice.call(arguments));
                for (var b = 0; b < a.length; b++) d.cache["delete"](a[b])
            }, this.unloadAll = function () {
                d.cache.empty()
            }, this.getCache = function (a) {
                return d.cache.read(a)
            }, this.on("resize", function () {
                d.sizes.refresh(this.realWidth, this.realHeight)
            }), this.once("beforeInit", function () {
                this.display && d.sizes.refresh(this.realWidth, this.realHeight)
            })
        }, d.preload = function (a) {
            this.triggerResize();
            var b = this.options.versionsFile;
            b ? this.loader.cacheManager.addVersionsFile(b, a) : a()
        }, d.teardown = function () {
            this.loader && (this.loader.destroy(), this.loader = null), this.assetManager && (this.assetManager.destroy(), this.assetManager = null)
        }
    }(), function () {
        var a, b = include("springroll.ApplicationPlugin"), c = new b(80);
        c.setup = function () {
            a = include("springroll.Debug", !1);
            var b = this.options;
            b.add("configPath", null, !0), b.add("preload", [], !0), this.config = null, this._assetLoad = null, this._numLoaded = 0, this._total = 0, this._progress = -1, this.on("pluginProgress", d.bind(this))
        }, c.preload = function (a) {
            var b = [], c = this.options.configPath;
            c ? b.push({id: "config", src: c, cache: !1, complete: f.bind(this)}) : e(this, b);
            var h = g.bind(this, a);
            b.length ? this._assetLoad = this.load(b, {complete: h, progress: d.bind(this), cacheAll: !0}) : h()
        };
        var d = function () {
            this._assetLoad && (this._numLoaded = this._assetLoad.numLoaded, this._total = this._assetLoad.total);
            var a = this._numLoaded + this.pluginLoad.numLoaded, b = this._total + this.pluginLoad.total, c = a / b;
            c > this._progress && (this._progress = c, this.trigger("progress", c))
        }, e = function (a, b) {
            b.append(a.options.preload), a.trigger("loading", b)
        }, f = function (a, b, c) {
            this.config = a, this.trigger("configLoaded", a, c), e(this, c)
        }, g = function (a, b) {
            this._assetLoad = null, this.trigger("loaded", b), a()
        };
        c.teardown = function () {
            this.config = null
        }
    }(), function (a) {
        var b = include("springroll.EventDispatcher"), c = function (a, c) {
            b.call(this), c = c || {}, this.canvas = document.getElementById(a), this.id = a, this.width = this.canvas.width, this.height = this.canvas.height, this.stage = null, this.paused = !1, this._enabled = !1, this._visible = "none" != this.canvas.style.display, this.adapter = null
        }, d = b.extend(c);
        Object.defineProperty(d, "enabled", {
            get: function () {
                return this._enabled
            }, set: function (a) {
                var b = this._enabled;
                this._enabled = a, b != a && (this.trigger(a ? "enabled" : "disabled"), this.trigger("enable", a))
            }
        }), Object.defineProperty(d, "visible", {
            get: function () {
                return this._visible
            }, set: function (a) {
                var b = this._visible;
                this._visible = a, this.canvas.style.display = a ? "block" : "none", b != a && (this.trigger(a ? "visible" : "hidden"), this.trigger("visibility", a))
            }
        }), d.resize = function (a, b) {
            this.width = this.canvas.width = a, this.height = this.canvas.height = b
        }, d.render = function (a, b) {
        }, d.destroy = function () {
            this.enabled = !1, this.adapter = null, this.stage = null, this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.canvas.onmousedown = null, this.canvas = null
        }, namespace("springroll").AbstractDisplay = c
    }(), function () {
        var a = include("springroll.Application"), b = include("springroll.Loader"),
            c = include("springroll.PropertyDispatcher"), d = include("springroll.EventDispatcher");
        a.prototype.getDisplays = function (a) {
            return "function" == typeof a && _displays.forEach(a), _displays
        }, d.mixIn = function (a, b) {
            return mixin(a, d)
        }, Object.defineProperty(b, "instance", {
            get: function () {
                return a.instance.loader
            }
        }), c.prototype.readOnly = function (a) {
            for (var b, c, d = 0; d < arguments.length; d++) {
                if (c = arguments[d], b = this._properties[c], void 0 === b) throw"Property " + c + " does not exist";
                b.readOnly = !0
            }
            return this
        }
    }()
}(), !function () {
    "use strict";
    !function () {
        function a(a) {
            var b = "color:" + a;
            return function (a) {
                if (arguments.length > 1) {
                    var e = c.call(arguments);
                    if ("object" == typeof e[0]) e.unshift(b), e.unshift("%c%o"); else {
                        var f = "%c" + e[0];
                        e[0] = b, e.unshift(f)
                    }
                    return d.log.apply(d, e)
                }
                return "object" == typeof arguments[0] ? d.log("%c%o", b, a) : d.log("%c" + a, b)
            }
        }

        var b = include("springroll.Enum"), c = Array.prototype.slice, d = {}, e = void 0 !== window.console,
            f = void 0 === document.documentMode, g = "DEBUG";
        if (e) try {
            console.assert.apply(console, [!0, "IE9 test"])
        } catch (h) {
            for (var i, j = Function.prototype.bind, k = ["log", "debug", "warn", "info", "error", "assert", "dir", "trace", "group", "groupCollapsed", "groupEnd"], l = 0; l < k.length; l++) i = k[l], console[i] && (console[i] = j.call(console[i], console))
        }
        var m = d.Levels = new b("GENERAL", g, "INFO", "WARN", "ERROR");
        d.minLogLevel = m.GENERAL, d.enabled = !0, d.output = null;
        var n = 1026, o = !1, p = null, q = null, r = null, s = {},
            t = ["log", "debug", "warn", "info", "error", "assert", "dir", "trace", "group", "groupCollapsed", "groupEnd", "_remoteLog", "globalErrorHandler", "navy", "blue", "aqua", "teal", "olive", "green", "lime", "yellow", "orange", "red", "pink", "purple", "maroon", "silver", "gray"],
            u = /(:\d+)+/;
        d.connect = function (a) {
            if (!("WebSocket" in window || "MozWebSocket" in window)) return !1;
            window.WebSocket = WebSocket || MozWebSocket;
            try {
                p = new WebSocket("ws://" + a + ":" + n), p.onopen = v, p.onclose = w, p.onerror = w, r = [], o = !0
            } catch (b) {
                return !1
            }
            return !0
        }, d.disconnect = function () {
            o && (p.close(), w())
        };
        var v = function () {
            window.onerror = s.globalErrorHandler, q = {
                level: "session",
                message: "",
                stack: null,
                time: 0
            }, p.send(JSON.stringify(q));
            for (var a = 0, b = r.length; b > a; ++a) p.send(JSON.stringify(r[a]));
            r = null
        };
        s.globalErrorHandler = function (a, b, c, e, f) {
            return d._remoteLog(a, m.ERROR, f ? f.stack : null), !1
        };
        var w = function () {
            window.onerror = null, o = !1, p.onopen = null, p.onmessage = null, p.onclose = null, p.onerror = null, p = null, q = null, r = null
        }, x = function (a, b) {
            d.output && (d.output.innerHTML += '<div class="' + a + '">' + b + "</div>")
        };
        d._remoteLog = function (a, b, e) {
            b = b || m.GENERAL, Array.isArray(a) || (a = [a]), a = c.call(a);
            var f, g;
            for (f = 0, g = a.length; g > f; f++) if ("object" == typeof a[f]) try {
                a[f] = z(a[f], 3)
            } catch (h) {
                a[f] = String(a[f])
            }
            e || (e = (new Error).stack), e = e ? e.split("\n") : [];
            var i, j, k, l, n, o, s = -1, v = !0;
            for (f = 0, g = e.length; g > f; ++f) {
                var w = e[f].trim();
                if (w) if ("Error" == w || w.indexOf("Error:") > -1) s = f; else {
                    if (w.indexOf("@") > -1) {
                        if (i = w.indexOf("@"), j = w.substring(0, i), n = -1 != j.indexOf(".") ? j.substring(j.lastIndexOf(".") + 1) : j, v && -1 != t.indexOf(n)) {
                            s = f;
                            continue
                        }
                        k = w.substring(i + 1)
                    } else {
                        if (i = w.indexOf("("), j = w.substring(3, i - 1), n = -1 != j.indexOf(".") ? j.substring(j.lastIndexOf(".") + 1) : j, v && -1 != t.indexOf(n)) {
                            s = f;
                            continue
                        }
                        k = w.substring(i + 1, w.length - 2)
                    }
                    o = u.exec(k), o ? (k = k.substring(0, o.index), l = o[0].substring(1), v = !1, e[f] = {
                        "function": j || "<anonymous>",
                        file: k,
                        lineLocation: l
                    }) : e[f] = {"function": "", file: "", lineLocation: ""}
                } else if (f == g - 1) {
                    e.pop();
                    break
                }
            }
            if (s >= 0 && (e = e.slice(s + 1)), r) r.push({
                message: a,
                level: b.name,
                stack: e,
                time: Date.now()
            }); else {
                q.level = b.name, q.message = a, q.stack = e, q.time = Date.now();
                var x;
                try {
                    x = JSON.stringify(q)
                } catch (h) {
                    q.message = ["[circular object]"], x = JSON.stringify(q)
                }
                p.send(x)
            }
            return d
        };
        var y = [], z = function (a, b, c) {
            if (Array.isArray(a)) return a;
            c = c || 0, 0 === c && (y.length = 0), y.push(a);
            var d = {};
            for (var e in a) {
                var f = a[e];
                if (f instanceof Window || f instanceof Document || f instanceof HTMLElement || "document" == e || "window" == e || "ownerDocument" == e || "view" == e || "target" == e || "currentTarget" == e || "originalTarget" == e || "explicitOriginalTarget" == e || "rangeParent" == e || "srcElement" == e || "relatedTarget" == e || "fromElement" == e || "toElement" == e) {
                    if (f instanceof HTMLElement) {
                        var g;
                        g = "<" + f.tagName, f.id && (g += " id='" + f.id + "'"), f.className && (g += " class='" + f.className + "'"), d[e] = g + " />"
                    }
                } else switch (typeof f) {
                    case"object":
                        d[e] = c > b || y.indexOf(f) > -1 ? String(f) : z(f, b, c + 1);
                        break;
                    case"function":
                        d[e] = "[function]";
                        break;
                    case"string":
                    case"number":
                    case"boolean":
                    case"bool":
                        d[e] = f;
                        break;
                    default:
                        d[e] = f
                }
            }
            return d
        };
        d.log = function (a) {
            return d.enabled ? (o ? d._remoteLog(Array.prototype.slice.call(arguments)) : d.minLogLevel == m.GENERAL && (e && (1 === arguments.length ? console.log(a) : console.log.apply(console, arguments)), x("general", a)), d) : d
        }, d.debug = function (a) {
            return d.enabled ? (o ? d._remoteLog(Array.prototype.slice.call(arguments), m[g]) : d.minLogLevel.asInt <= m[g].asInt && (e && (console.debug ? 1 === arguments.length ? console.debug(a) : console.debug.apply(console, arguments) : 1 === arguments.length ? console.log(a) : console.log.apply(console, arguments)), x("debug", a)), d) : d
        }, d.info = function (a) {
            return d.enabled ? (o ? d._remoteLog(Array.prototype.slice.call(arguments), m.INFO) : d.minLogLevel.asInt <= m.INFO.asInt && (e && (1 === arguments.length ? console.info(a) : console.info.apply(console, arguments)), x("info", a)), d) : d
        }, d.warn = function (a) {
            return d.enabled ? (o ? d._remoteLog(Array.prototype.slice.call(arguments), m.WARN) : d.minLogLevel.asInt <= m.WARN.asInt && (e && (1 === arguments.length ? console.warn(a) : console.warn.apply(console, arguments)), x("warn", a)), d) : d
        }, d.error = function (a) {
            return d.enabled ? (o ? d._remoteLog(Array.prototype.slice.call(arguments), m.ERROR) : (e && (1 === arguments.length ? console.error(a) : console.error.apply(console, arguments)), x("error", a)), d) : void 0
        }, d.assert = function (a, b) {
            return d.enabled && (a || (x("error", b), o && d._remoteLog(b, m.ERROR)), e && console.assert && console.assert(a, b)), d
        }, d.dir = function (a) {
            return d.enabled && (o ? d._remoteLog(Array.prototype.slice.call(arguments), m.GENERAL) : e && (1 === arguments.length ? console.dir(a) : console.dir.apply(console, arguments))), d
        }, d.clear = function () {
            return d.enabled && (o && d._remoteLog("", "clear"), e && console.clear(), d.output && (d.output.innerHTML = "")), d
        }, d.trace = function (a) {
            return d.enabled && (o ? d._remoteLog(Array.prototype.slice.call(arguments), m.GENERAL) : e && (1 === arguments.length ? console.trace(a) : console.trace.apply(console, arguments))), d
        }, d.group = function (a) {
            return d.enabled && (o ? d._remoteLog(Array.prototype.slice.call(arguments), "group") : e && console.group && console.group.apply(console, arguments)), d
        }, d.groupCollapsed = function (a) {
            return d.enabled && (o ? d._remoteLog(Array.prototype.slice.call(arguments), "groupCollapsed") : e && console.groupCollapsed && console.groupCollapsed.apply(console, arguments)), d
        }, d.groupEnd = function () {
            return d.enabled && (o ? d._remoteLog(Array.prototype.slice.call(arguments), "groupEnd") : e && console.groupEnd && console.groupEnd()), d
        };
        var A = {
            navy: "#001F3F",
            blue: "#0074D9",
            aqua: "#7FDBFF",
            teal: "#39CCCC",
            olive: "#3D9970",
            green: "#2ECC40",
            lime: "#01FF70",
            yellow: "#FFDC00",
            orange: "#FF851B",
            red: "#FF4136",
            pink: "#F012BE",
            purple: "#B10DC9",
            maroon: "#85144B",
            silver: "#ddd",
            gray: "#aaa"
        };
        for (var B in A) f ? d[B] = a(A[B]) : d[B] = d.log;
        namespace("springroll").Debug = d
    }(), function () {
        var a = {}, b = 4, c = [], d = 0, e = 0, f = {
            HEADER: "color: #FF4136; font-size: 1.2em; text-decoration:underline;",
            LABEL: "color: #2ECC40;",
            TYPE: "color: #0074D9;",
            DESC: "color: #FF851B"
        }, g = "\n%cQuery Debug Options:\n%c", h = {INT: "int", NUMBER: "number", STRING: "string", BOOLEAN: "boolean"};
        a["int"] = function (b, c) {
            return a.add(b, h.INT, c)
        }, a["boolean"] = function (b, c) {
            return a.add(b, h.BOOLEAN, c)
        }, a.string = function (b, c) {
            return a.add(b, h.STRING, c)
        }, a.number = function (b, c) {
            return a.add(b, h.NUMBER, c)
        }, a.add = function (b, f, g) {
            return d = Math.max(b.length, d), e = Math.max(f.length, e), c.push({label: b, type: f, desc: g}), a
        }, a.log = function () {
            var a = g, h = [f.HEADER, "display:none"];
            d += b, e += b;
            for (var j, k = i(d + e + b), l = c.length, m = 0; l > m; m++) j = c[m], a += "\t%c" + i(d, j.label), a += "%c" + i(e, j.type), j.desc && (j.desc = j.desc.replace(/(\r\n|\n|\r)/gm, "\n" + k), a += "%c" + j.desc), a += "\n", h.push(f.LABEL, f.TYPE), j.desc && h.push(f.DESC);
            console.log.apply(console, [a + "\n"].concat(h))
        }, a.reset = function () {
            return c.length = [], d = 0, e = 0, a
        };
        var i = function (a, b) {
            if (b) for (; b.length < a;) b += " "; else for (b = " "; --a;) b += " ";
            return b
        };
        namespace("springroll").DebugOptions = a
    }(), function () {
        var a = include("springroll.ApplicationPlugin"), b = include("springroll.Debug"), c = new a;
        c.setup = function () {
            this.options.add("debug", !0), this.options.add("minLogLevel", 0), this.options.add("framerate"), this._framerate = null, this.options.add("debugRemote", null).respond("debug", function () {
                return b.enabled
            }).on("debug", function (a) {
                b.enabled = a
            }).on("debugRemote", function (a) {
                b.disconnect(), a && b.connect(a)
            }).respond("minLogLevel", function () {
                return b.minLogLevel.asInt
            }).on("minLogLevel", function (a) {
                b.minLogLevel = b.Levels.valueFromInt(parseInt(a, 10)), b.minLogLevel || (b.minLogLevel = b.Levels.GENERAL)
            })
        }, c.preload = function (a) {
            this.options.asDOMElement("framerate");
            var b = this.options.framerate, c = this.display;
            if (!b && c) {
                var d = c.canvas;
                b = document.createElement("div"), b.id = "framerate", d.parentNode.insertBefore(b, d)
            }
            if (b) {
                this._framerate = b, b.innerHTML = "FPS: 00.000";
                var e = 0, f = 0;
                this.on("update", function (a) {
                    if (e++, f += a, f >= 1e3) {
                        var c = 1e3 / f * e;
                        b.innerHTML = "FPS: " + c.toFixed(3), f = 0, e = 0
                    }
                }).on("resumed", function () {
                    e = f = 0
                })
            }
            a()
        }, c.teardown = function () {
            b.disconnect()
        }
    }()
}(), !function () {
    "use strict";
    !function (a) {
        var b = include("PIXI.extras.BitmapText", !1);
        if (b) {
            var c = b.prototype;
            c.setPivotToAlign = !1, c._orig_updateText = c.updateText, c.updateText = function () {
                if (this._orig_updateText(), this.setPivotToAlign) switch (this.align) {
                    case"center":
                        this.pivot.x = this.textWidth / 2;
                        break;
                    case"right":
                        this.pivot.x = this.textWidth;
                        break;
                    default:
                        this.pivot.x = 0
                }
            }
        }
    }(), function (a) {
        var b = include("PIXI.Container", !1);
        if (b) {
            var c = b.prototype;
            c.useBoundsForSize = !0, c._width = 0, c._height = 0, Object.getOwnPropertyDescriptor(c, "width").configurable && (Object.defineProperty(c, "width", {
                configurable: !0,
                get: function () {
                    return this.useBoundsForSize ? this.scale.x * this.getLocalBounds().width : this.scale.x * this._width
                },
                set: function (a) {
                    if (this.useBoundsForSize) {
                        var b = this.getLocalBounds().width;
                        0 !== b ? this.scale.x = a / b : this.scale.x = 1, this._width = a
                    } else 0 === this._width ? this._width = a / this.scale.x : this.scale.x = a / this._width
                }
            }), Object.defineProperty(c, "height", {
                configurable: !0, get: function () {
                    return this.useBoundsForSize ? this.scale.y * this.getLocalBounds().height : this.scale.y * this._height
                }, set: function (a) {
                    if (this.useBoundsForSize) {
                        var b = this.getLocalBounds().height;
                        0 !== b ? this.scale.y = a / b : this.scale.y = 1, this._height = a
                    } else 0 === this._height ? this._height = a / this.scale.y : this.scale.y = a / this._height
                }
            }))
        }
    }(), function (a) {
        var b = include("PIXI.interaction.InteractionManager", !1);
        if (b) {
            var c = b.prototype;
            c.removeClickEvents = function () {
                this.interactionDOMElement && (window.navigator.msPointerEnabled && (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = ""), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0), window.removeEventListener("mouseup", this.onMouseUp, !0))
            }
        }
    }(), function (a) {
        var b = include("PIXI.Point", !1);
        if (b) {
            var c = b.prototype;
            c.dotProd = function (a) {
                return this.x * a.x + this.y * a.y
            }, c.length = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            }, c.lengthSq = function () {
                return this.x * this.x + this.y * this.y
            }, c.normalize = function () {
                var a = 1 / this.length();
                this.x *= a, this.y *= a
            }, c.subtract = function (a) {
                this.x -= a.x, this.y -= a.y
            }, c.add = function (a) {
                this.x += a.x, this.y += a.y
            }, c.truncate = function (a) {
                var b = this.length();
                if (b > a) {
                    var c = a / b;
                    this.x *= c, this.y *= c
                }
            }, c.scaleBy = function (a) {
                this.x *= a, this.y *= a
            }, c.distance = function (a) {
                var b = this.x - a.x, c = this.y - a.y;
                return Math.sqrt(b * b + c * c)
            }, c.distanceSq = function (a) {
                var b = this.x - a.x, c = this.y - a.y;
                return b * b + c * c
            }, b.localToGlobal = function (a, b, c, d) {
                return d || (d = new PIXI.Point), d.x = b, d.y = c, a.toGlobal(d, d)
            }, b.globalToLocal = function (a, b, c, d) {
                return d || (d = new PIXI.Point), d.x = b, d.y = c, a.toLocal(d, null, d)
            }, b.localToLocal = function (a, b, c, d, e) {
                return e || (e = new PIXI.Point), e.x = c, e.y = d, b.toLocal(e, a, e)
            }, c.toString = function () {
                return "(" + this.x + ", " + this.y + ")"
            }
        }
    }(), function (a) {
        var b = 180 / Math.PI, c = function (a, b, c, d, e) {
            for (this.x = a || 0, this.y = b || 0, this.radius = c || 0,
                     this.startAngle = d || 0; this.startAngle < 0;) this.startAngle += 360;
            this.endAngle = e || 0, this.endAngle < this.startAngle && (this.endAngle += 360)
        }, d = c.prototype;
        d.clone = function () {
            return new PIXI.Sector(this.x, this.y, this.radius, this.startAngle, this.endAngle)
        }, d.contains = function (a, c) {
            if (this.radius <= 0) return !1;
            var d = this.x - a, e = this.y - c, f = this.radius * this.radius;
            if (d *= d, e *= e, d + e > f) return !1;
            for (var g = Math.atan2(c - this.y, a - this.x) * b; g < this.startAngle;) g += 360;
            return g >= this.startAngle && g <= this.endAngle
        }, d.constructor = c, namespace("PIXI").Sector = c
    }(), function (a) {
        var b = include("PIXI.Text", !1);
        if (b) {
            var c = b.prototype;
            c.setPivotToAlign = !1, c._orig_updateText = c.updateText, c.updateText = function () {
                if (this._orig_updateText(), this.setPivotToAlign) switch (this.style.align) {
                    case"center":
                        this.pivot.x = this._width / 2;
                        break;
                    case"right":
                        this.pivot.x = this._width;
                        break;
                    default:
                        this.pivot.x = 0
                }
            }
        }
    }(), function () {
        var a, b = include("springroll.ColorAlphaTask"), c = include("springroll.Task"), d = include("PIXI.Texture"),
            e = include("PIXI.BaseTexture"), f = include("PIXI.utils"), g = include("springroll.Application"),
            h = function (b, d) {
                a || (a = include("springroll.pixi.PixiDisplay")), c.call(this, b, d || b.image), this.image = this.filter(b.image), this.color = this.filter(b.color), this.alpha = this.filter(b.alpha), this.uploadToGPU = !!b.uploadToGPU
            }, i = c.extend(h);
        h.test = function (a) {
            return "pixi" == a.type && (!!a.image || !!a.alpha && !!a.color)
        }, i.start = function (a) {
            this.loadImage({}, a)
        }, i.loadImage = function (c, h, i) {
            this.image ? c._image = this.image : (c._color = this.color, c._alpha = this.alpha), this.load(c, function (c) {
                var j;
                j = c._image ? c._image : b.mergeAlpha(c._color, c._alpha);
                var k = this.original.scale;
                k && 1 !== k || (k = f.getResolutionOfUrl(this.image || this.color));
                var l = new d(new e(j, null, k));
                if (l.baseTexture.imageUrl = this.image, this.cache && !i) {
                    var m = this.id;
                    f.useFilenamesForTextures || (m = this.image || this.color), f.TextureCache[m] = l, f.BaseTextureCache[m] = l.baseTexture, l.__T_destroy = l.destroy, l.destroy = function () {
                        this.__destroyed || (this.__destroyed = !0, this.__T_destroy(!0), f.TextureCache[m] == this && delete f.TextureCache[m])
                    }
                }
                if (this.uploadToGPU) {
                    var n = g.instance.displays;
                    for (var o in n) {
                        var p = n[o];
                        if (p instanceof a && p.isWebGL) {
                            p.renderer.updateTexture(l);
                            break
                        }
                    }
                }
                h(l, c)
            }.bind(this))
        }, i.destroy = function () {
            c.prototype.destroy.call(this)
        }, namespace("springroll.pixi").TextureTask = h
    }(), function (a) {
        var b = include("PIXI.Rectangle"), c = include("PIXI.Texture"), d = include("PIXI.utils"),
            e = function (a, e, f) {
                this.baseTexture = a.baseTexture, this.texture = a, this.frames = {};
                var g = e.meta && "http://www.codeandweb.com/texturepacker" == e.meta.app, h = e.frames;
                for (var i in h) {
                    var j = h[i], k = i.lastIndexOf(".");
                    k > 0 && (i = i.substring(0, k)), k = i.lastIndexOf("/"), k >= 0 && (i = i.substring(k + 1));
                    var l = j.frame;
                    if (l) {
                        var m = null, n = null;
                        m = j.rotated && g ? new b(l.x, l.y, l.h, l.w) : new b(l.x, l.y, l.w, l.h), j.trimmed && (n = new b(j.spriteSourceSize.x, j.spriteSourceSize.y, j.sourceSize.w, j.sourceSize.h)), this.frames[i] = new c(this.baseTexture, m, m.clone(), n, j.rotated), f && (d.TextureCache[i] = this.frames[i])
                    }
                }
            }, f = extend(e);
        f.getFrame = function (a) {
            return this.frames[a] || null
        }, f.getFrames = function (b, c, d, e, f) {
            e === a && (e = 4), 0 > e && (e = 0), f || (f = []);
            var g, h, i = [], j = [];
            for (g = 1; e > g; ++g) {
                var k = "";
                h = 1;
                for (var l = 0; g > l; ++l) k += "0", h *= 10;
                i.unshift(k), j.push(h)
            }
            var m, n, o = j.length;
            for (g = c, n = d; n >= g; ++g) {
                var p = null;
                for (h = 0; o > h; ++h) if (g < j[h]) {
                    p = i[h] + g;
                    break
                }
                p || (p = g.toString());
                var q = b.replace("#", p), r = this.frames[q];
                r && (m = r), m && f.push(m)
            }
            return f
        }, f.destroy = function () {
            this.texture.destroy(!0), this.texture = null, this.baseTexture = null, this.frames = null
        }, namespace("springroll.pixi").TextureAtlas = e
    }(), function () {
        var a = include("springroll.pixi.TextureTask"),
            b = (include("PIXI.Texture"), include("springroll.pixi.TextureAtlas")),
            c = (include("PIXI.utils"), function (b, c) {
                a.call(this, b, c || b.atlas), this.atlas = this.filter(b.atlas)
            }), d = a.extend(c);
        c.test = function (b) {
            return !!b.atlas && a.test(b)
        }, d.start = function (a) {
            this.loadAtlas({}, a)
        }, d.loadAtlas = function (a, c, d) {
            a._atlas = this.atlas, this.loadImage(a, function (a, e) {
                var f = e._atlas, g = new b(a, f, this.cache && !d);
                f.meta && f.meta.scale && 1 != parseFloat(f.meta.scale) && (a.baseTexture.resolution = parseFloat(e._atlas.meta.scale), a.baseTexture.update()), c(g, e)
            }.bind(this), !0)
        }, namespace("springroll.pixi").TextureAtlasTask = c
    }(), function () {
        var a = include("springroll.pixi.TextureTask"), b = include("PIXI.Texture"), c = include("PIXI.Rectangle"),
            d = include("PIXI.extras.BitmapText", !1);
        if (include("PIXI.utils"), d) {
            var e = function (b) {
                a.call(this, b, b.font), this.font = this.filter(b.font)
            }, f = a.extend(e);
            e.test = function (b) {
                return !!b.font && a.test(b)
            }, f.start = function (a) {
                this.loadImage({_font: this.font}, function (e, f) {
                    var g = f._font, h = {}, i = g.getElementsByTagName("info")[0],
                        j = g.getElementsByTagName("common")[0];
                    h.font = i.getAttribute("face"), h.size = parseInt(i.getAttribute("size"), 10), h.lineHeight = parseInt(j.getAttribute("lineHeight"), 10), h.chars = {};
                    var k, l = g.getElementsByTagName("char");
                    for (k = 0; k < l.length; k++) {
                        var m = l[k], n = parseInt(m.getAttribute("id"), 10),
                            o = new c(parseInt(m.getAttribute("x"), 10) + e.frame.x, parseInt(m.getAttribute("y"), 10) + e.frame.y, parseInt(m.getAttribute("width"), 10), parseInt(m.getAttribute("height"), 10));
                        h.chars[n] = {
                            xOffset: parseInt(m.getAttribute("xoffset"), 10),
                            yOffset: parseInt(m.getAttribute("yoffset"), 10),
                            xAdvance: parseInt(m.getAttribute("xadvance"), 10),
                            kerning: {},
                            texture: new b(e.baseTexture, o)
                        }
                    }
                    var p = g.getElementsByTagName("kerning");
                    for (k = 0; k < p.length; k++) {
                        var q = p[k], r = parseInt(q.getAttribute("first"), 10),
                            s = parseInt(q.getAttribute("second"), 10), t = parseInt(q.getAttribute("amount"), 10);
                        h.chars[s].kerning[r] = t
                    }
                    this.cache && d.fonts && (d.fonts[h.font] = h), h.destroy = function () {
                        h.chars = null, e.destroy()
                    }, a(h, f)
                }.bind(this), !0)
            }, namespace("springroll.pixi").BitmapFontTask = e
        }
    }(), function () {
        var a = include("springroll.ApplicationPlugin"), b = new a;
        b.setup = function () {
            this.assetManager.register("springroll.pixi.TextureTask", 60), this.assetManager.register("springroll.pixi.TextureAtlasTask", 70), this.assetManager.register("springroll.pixi.BitmapFontTask", 80), this.once("displayAdded", function (a) {
                var b = this.options;
                !b.defaultAssetType && a instanceof include("springroll.PixiDisplay") && (b.defaultAssetType = "pixi")
            })
        }
    }(), function (a) {
        var b = {};
        b.Circle = include("PIXI.Circle"), b.Ellipse = include("PIXI.Ellipse"), b.Rectangle = include("PIXI.Rectangle"), b.Sector = include("PIXI.Sector"), b.Point = include("PIXI.Point"), b.Polygon = include("PIXI.Polygon"), b.useRadians = !0, b.getLocalBounds = function (a) {
            var b, c = a.width, d = a.height;
            return b = c && d ? new PIXI.Rectangle((-a.pivot.x), (-a.pivot.y), c / a.scale.x, d / a.scale.y) : new PIXI.Rectangle, b.right = b.x + b.width, b.bottom = b.y + b.height, b
        }, b.getScale = function (b, c) {
            return c !== a ? b.scale[c] : b.scale
        }, b.setPosition = function (b, c, d) {
            return d !== a ? b.position[d] = c : (c.x !== a && (b.position.x = c.x), c.y !== a && (b.position.y = c.y)), b
        }, b.getPosition = function (b, c) {
            return c !== a ? b.position[c] : b.position
        }, b.setScale = function (b, c, d) {
            return d !== a ? b.scale[d] = c : b.scale.x = b.scale.y = c, b
        }, b.setPivot = function (b, c, d) {
            return d !== a && (b.pivot[d] = c), b.pivot = c, b
        }, b.setHitArea = function (a, b) {
            return a.hitArea = b, a
        }, b.getBitmapSize = function (a) {
            return {h: a.height / a.scale.y, w: a.width / a.scale.x}
        }, b.removeChildren = function (a) {
            a.removeChildren()
        }, b.contains = function (a, b) {
            for (; b;) {
                if (b == a) return !0;
                b = b.parent
            }
            return !1
        }, namespace("springroll.pixi").DisplayAdapter = b
    }(), function (a) {
        var b = include("springroll.AbstractDisplay"), c = include("PIXI.Container"),
            d = include("PIXI.CanvasRenderer"), e = include("PIXI.WebGLRenderer"),
            f = include("PIXI.autoDetectRenderer"), g = function (a, g) {
                b.call(this, a, g), g = g || {}, this.keepMouseover = g.keepMouseover || !1, this._autoPreventDefault = !g.hasOwnProperty("autoPreventDefault") || g.autoPreventDefault, this.stage = new c, this.renderer = null;
                var h = {
                    view: this.canvas,
                    transparent: !!g.transparent,
                    antialias: !!g.antiAlias,
                    preserveDrawingBuffer: !!g.preserveDrawingBuffer,
                    clearBeforeRender: !!g.clearView,
                    backgroundColor: g.backgroundColor || 0,
                    autoResize: !1
                }, i = !!g.preMultAlpha;
                if (h.transparent && !i && (h.transparent = "notMultiplied"), "webgl" != g.forceContext) {
                    var j = window.navigator.userAgent;
                    j.indexOf("Trident/7.0") > 0 && (g.forceContext = "canvas2d")
                }
                "canvas2d" == g.forceContext ? this.renderer = new d(this.width, this.height, h) : "webgl" == g.forceContext ? this.renderer = new e(this.width, this.height, h) : this.renderer = f(this.width, this.height, h), this.isWebGL = this.renderer instanceof e, this.adapter = include("springroll.pixi.DisplayAdapter"), this.autoPreventDefault = this._autoPreventDefault
            }, h = b.prototype, i = b.extend(g);
        Object.defineProperty(i, "enabled", {
            get: function () {
                return this._enabled
            }, set: function (a) {
                Object.getOwnPropertyDescriptor(h, "enabled").set.call(this, a);
                var b = this.renderer.plugins.interaction;
                b && (a ? b.setTargetElement(this.canvas) : this.keepMouseover ? b.removeClickEvents() : b.removeEvents())
            }
        }), Object.defineProperty(i, "autoPreventDefault", {
            get: function () {
                return this._autoPreventDefault
            }, set: function (a) {
                this._autoPreventDefault = !!a;
                var b = this.renderer.plugins.interaction;
                b && (b.autoPreventDefault = this._autoPreventDefault)
            }
        }), i.resize = function (a, b) {
            h.resize.call(this, a, b), this.renderer.resize(a, b)
        }, i.render = function (a, b) {
            (b || !this.paused && this._visible) && this.renderer.render(this.stage)
        }, i.destroy = function () {
            this.stage.destroy(), h.destroy.call(this), this.renderer.destroy(), this.renderer = null
        }, namespace("springroll").PixiDisplay = g, namespace("springroll.pixi").PixiDisplay = g
    }(), function () {
        function a(a) {
            e += a, b.update(e)
        }

        var b = include("PIXI.ticker.shared", !1), c = include("springroll.ApplicationPlugin");
        if (b) {
            var d = new c, e = 0;
            b.autoStart = !1, b.stop(), d.setup = function () {
                this.on("update", a, 300)
            }
        }
    }(), function (a) {
        var b = include("springroll.pixi.PixiDisplay"), c = include("springroll.Application");
        a.defineProperty(b.prototype, "animator", {
            get: function () {
                return c.instance.animator
            }
        })
    }(Object)
}();
var saveAs = saveAs || function (a) {
    "use strict";
    if (!("undefined" == typeof a || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
        var b = a.document, c = function () {
            return a.URL || a.webkitURL || a
        }, d = b.createElementNS("http://www.w3.org/1999/xhtml", "a"), e = "download" in d, f = function (a) {
            var b = new MouseEvent("click");
            a.dispatchEvent(b)
        }, g = /constructor/i.test(a.HTMLElement), h = /CriOS\/[\d]+/.test(navigator.userAgent), i = function (b) {
            (a.setImmediate || a.setTimeout)(function () {
                throw b
            }, 0)
        }, j = "application/octet-stream", k = 4e4, l = function (a) {
            var b = function () {
                "string" == typeof a ? c().revokeObjectURL(a) : a.remove()
            };
            setTimeout(b, k)
        }, m = function (a, b, c) {
            b = [].concat(b);
            for (var d = b.length; d--;) {
                var e = a["on" + b[d]];
                if ("function" == typeof e) try {
                    e.call(a, c || a)
                } catch (f) {
                    i(f)
                }
            }
        }, n = function (a) {
            return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob([String.fromCharCode(65279), a], {type: a.type}) : a
        }, o = function (b, i, k) {
            k || (b = n(b));
            var o, p = this, q = b.type, r = q === j, s = function () {
                m(p, "writestart progress write writeend".split(" "))
            }, t = function () {
                if ((h || r && g) && a.FileReader) {
                    var d = new FileReader;
                    return d.onloadend = function () {
                        var b = h ? d.result : d.result.replace(/^data:[^;]*;/, "data:attachment/file;"),
                            c = a.open(b, "_blank");
                        c || (a.location.href = b), b = void 0, p.readyState = p.DONE, s()
                    }, d.readAsDataURL(b), void(p.readyState = p.INIT)
                }
                if (o || (o = c().createObjectURL(b)), r) a.location.href = o; else {
                    var e = a.open(o, "_blank");
                    e || (a.location.href = o)
                }
                p.readyState = p.DONE, s(), l(o)
            };
            return p.readyState = p.INIT, e ? (o = c().createObjectURL(b), void setTimeout(function () {
                d.href = o, d.download = i, f(d), s(), l(o), p.readyState = p.DONE
            })) : void t()
        }, p = o.prototype, q = function (a, b, c) {
            return new o(a, b || a.name || "download", c)
        };
        return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function (a, b, c) {
            return b = b || a.name || "download", c || (a = n(a)), navigator.msSaveOrOpenBlob(a, b)
        } : (p.abort = function () {
        }, p.readyState = p.INIT = 0, p.WRITING = 1, p.DONE = 2, p.error = p.onwritestart = p.onprogress = p.onwrite = p.onabort = p.onerror = p.onwriteend = null, q)
    }
}("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
if ("undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs : "undefined" != typeof define && null !== define && null !== define.amd && define([], function () {
        return saveAs
    }), function (a, b) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
            if (!a.document) throw new Error("jQuery requires a window with a document");
            return b(a)
        } : b(a)
    }("undefined" != typeof window ? window : this, function (a, b) {
        "use strict";

        function c(a, b) {
            b = b || _;
            var c = b.createElement("script");
            c.text = a, b.head.appendChild(c).parentNode.removeChild(c)
        }

        function d(a) {
            var b = !!a && "length" in a && a.length, c = ma.type(a);
            return "function" !== c && !ma.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a)
        }

        function e(a, b, c) {
            if (ma.isFunction(b)) return ma.grep(a, function (a, d) {
                return !!b.call(a, d, a) !== c
            });
            if (b.nodeType) return ma.grep(a, function (a) {
                return a === b !== c
            });
            if ("string" == typeof b) {
                if (wa.test(b)) return ma.filter(b, a, c);
                b = ma.filter(b, a)
            }
            return ma.grep(a, function (a) {
                return ea.call(b, a) > -1 !== c && 1 === a.nodeType
            })
        }

        function f(a, b) {
            for (; (a = a[b]) && 1 !== a.nodeType;) ;
            return a
        }

        function g(a) {
            var b = {};
            return ma.each(a.match(Ca) || [], function (a, c) {
                b[c] = !0
            }), b
        }

        function h(a) {
            return a
        }

        function i(a) {
            throw a
        }

        function j(a, b, c) {
            var d;
            try {
                a && ma.isFunction(d = a.promise) ? d.call(a).done(b).fail(c) : a && ma.isFunction(d = a.then) ? d.call(a, b, c) : b.call(void 0, a)
            } catch (a) {
                c.call(void 0, a)
            }
        }

        function k() {
            _.removeEventListener("DOMContentLoaded", k), a.removeEventListener("load", k), ma.ready()
        }

        function l() {
            this.expando = ma.expando + l.uid++
        }

        function m(a, b, c) {
            var d;
            if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Ka, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : Ja.test(c) ? JSON.parse(c) : c)
                } catch (e) {
                }
                Ia.set(a, b, c)
            } else c = void 0;
            return c
        }

        function n(a, b, c, d) {
            var e, f = 1, g = 20, h = d ? function () {
                    return d.cur()
                } : function () {
                    return ma.css(a, b, "")
                }, i = h(), j = c && c[3] || (ma.cssNumber[b] ? "" : "px"),
                k = (ma.cssNumber[b] || "px" !== j && +i) && Ma.exec(ma.css(a, b));
            if (k && k[3] !== j) {
                j = j || k[3], c = c || [], k = +i || 1;
                do f = f || ".5", k /= f, ma.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
            }
            return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
        }

        function o(a) {
            var b, c = a.ownerDocument, d = a.nodeName, e = Qa[d];
            return e ? e : (b = c.body.appendChild(c.createElement(d)), e = ma.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), Qa[d] = e, e)
        }

        function p(a, b) {
            for (var c, d, e = [], f = 0, g = a.length; f < g; f++) d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = Ha.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && Oa(d) && (e[f] = o(d))) : "none" !== c && (e[f] = "none", Ha.set(d, "display", c)));
            for (f = 0; f < g; f++) null != e[f] && (a[f].style.display = e[f]);
            return a
        }

        function q(a, b) {
            var c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
            return void 0 === b || b && ma.nodeName(a, b) ? ma.merge([a], c) : c
        }

        function r(a, b) {
            for (var c = 0, d = a.length; c < d; c++) Ha.set(a[c], "globalEval", !b || Ha.get(b[c], "globalEval"))
        }

        function s(a, b, c, d, e) {
            for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++) if (f = a[n], f || 0 === f) if ("object" === ma.type(f)) ma.merge(m, f.nodeType ? [f] : f); else if (Va.test(f)) {
                for (g = g || l.appendChild(b.createElement("div")), h = (Sa.exec(f) || ["", ""])[1].toLowerCase(), i = Ua[h] || Ua._default, g.innerHTML = i[1] + ma.htmlPrefilter(f) + i[2], k = i[0]; k--;) g = g.lastChild;
                ma.merge(m, g.childNodes), g = l.firstChild, g.textContent = ""
            } else m.push(b.createTextNode(f));
            for (l.textContent = "", n = 0; f = m[n++];) if (d && ma.inArray(f, d) > -1) e && e.push(f); else if (j = ma.contains(f.ownerDocument, f), g = q(l.appendChild(f), "script"), j && r(g), c) for (k = 0; f = g[k++];) Ta.test(f.type || "") && c.push(f);
            return l
        }

        function t() {
            return !0
        }

        function u() {
            return !1
        }

        function v() {
            try {
                return _.activeElement
            } catch (a) {
            }
        }

        function w(a, b, c, d, e, f) {
            var g, h;
            if ("object" == typeof b) {
                "string" != typeof c && (d = d || c, c = void 0);
                for (h in b) w(a, h, c, d, b[h], f);
                return a
            }
            if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = u; else if (!e) return a;
            return 1 === f && (g = e, e = function (a) {
                return ma().off(a), g.apply(this, arguments)
            }, e.guid = g.guid || (g.guid = ma.guid++)), a.each(function () {
                ma.event.add(this, b, e, d, c)
            })
        }

        function x(a, b) {
            return ma.nodeName(a, "table") && ma.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a : a
        }

        function y(a) {
            return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
        }

        function z(a) {
            var b = bb.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"), a
        }

        function A(a, b) {
            var c, d, e, f, g, h, i, j;
            if (1 === b.nodeType) {
                if (Ha.hasData(a) && (f = Ha.access(a), g = Ha.set(b, f), j = f.events)) {
                    delete g.handle, g.events = {};
                    for (e in j) for (c = 0, d = j[e].length; c < d; c++) ma.event.add(b, e, j[e][c])
                }
                Ia.hasData(a) && (h = Ia.access(a), i = ma.extend({}, h), Ia.set(b, i))
            }
        }

        function B(a, b) {
            var c = b.nodeName.toLowerCase();
            "input" === c && Ra.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
        }

        function C(a, b, d, e) {
            b = ca.apply([], b);
            var f, g, h, i, j, k, l = 0, m = a.length, n = m - 1, o = b[0], p = ma.isFunction(o);
            if (p || m > 1 && "string" == typeof o && !ka.checkClone && ab.test(o)) return a.each(function (c) {
                var f = a.eq(c);
                p && (b[0] = o.call(this, c, f.html())), C(f, b, d, e)
            });
            if (m && (f = s(b, a[0].ownerDocument, !1, a, e), g = f.firstChild, 1 === f.childNodes.length && (f = g), g || e)) {
                for (h = ma.map(q(f, "script"), y), i = h.length; l < m; l++) j = f, l !== n && (j = ma.clone(j, !0, !0), i && ma.merge(h, q(j, "script"))), d.call(a[l], j, l);
                if (i) for (k = h[h.length - 1].ownerDocument, ma.map(h, z), l = 0; l < i; l++) j = h[l], Ta.test(j.type || "") && !Ha.access(j, "globalEval") && ma.contains(k, j) && (j.src ? ma._evalUrl && ma._evalUrl(j.src) : c(j.textContent.replace(cb, ""), k))
            }
            return a
        }

        function D(a, b, c) {
            for (var d, e = b ? ma.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || ma.cleanData(q(d)), d.parentNode && (c && ma.contains(d.ownerDocument, d) && r(q(d, "script")), d.parentNode.removeChild(d));
            return a
        }

        function E(a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || fb(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || ma.contains(a.ownerDocument, a) || (g = ma.style(a, b)), !ka.pixelMarginRight() && eb.test(g) && db.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
        }

        function F(a, b) {
            return {
                get: function () {
                    return a() ? void delete this.get : (this.get = b).apply(this, arguments)
                }
            }
        }

        function G(a) {
            if (a in kb) return a;
            for (var b = a[0].toUpperCase() + a.slice(1), c = jb.length; c--;) if (a = jb[c] + b, a in kb) return a
        }

        function H(a, b, c) {
            var d = Ma.exec(b);
            return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
        }

        function I(a, b, c, d, e) {
            for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; f < 4; f += 2) "margin" === c && (g += ma.css(a, c + Na[f], !0, e)), d ? ("content" === c && (g -= ma.css(a, "padding" + Na[f], !0, e)), "margin" !== c && (g -= ma.css(a, "border" + Na[f] + "Width", !0, e))) : (g += ma.css(a, "padding" + Na[f], !0, e), "padding" !== c && (g += ma.css(a, "border" + Na[f] + "Width", !0, e)));
            return g
        }

        function J(a, b, c) {
            var d, e = !0, f = fb(a), g = "border-box" === ma.css(a, "boxSizing", !1, f);
            if (a.getClientRects().length && (d = a.getBoundingClientRect()[b]), d <= 0 || null == d) {
                if (d = E(a, b, f), (d < 0 || null == d) && (d = a.style[b]), eb.test(d)) return d;
                e = g && (ka.boxSizingReliable() || d === a.style[b]), d = parseFloat(d) || 0
            }
            return d + I(a, b, c || (g ? "border" : "content"), e, f) + "px"
        }

        function K(a, b, c, d, e) {
            return new K.prototype.init(a, b, c, d, e)
        }

        function L() {
            mb && (a.requestAnimationFrame(L), ma.fx.tick())
        }

        function M() {
            return a.setTimeout(function () {
                lb = void 0
            }), lb = ma.now()
        }

        function N(a, b) {
            var c, d = 0, e = {height: a};
            for (b = b ? 1 : 0; d < 4; d += 2 - b) c = Na[d], e["margin" + c] = e["padding" + c] = a;
            return b && (e.opacity = e.width = a), e
        }

        function O(a, b, c) {
            for (var d, e = (R.tweeners[b] || []).concat(R.tweeners["*"]), f = 0, g = e.length; f < g; f++) if (d = e[f].call(c, b, a)) return d
        }

        function P(a, b, c) {
            var d, e, f, g, h, i, j, k, l = "width" in b || "height" in b, m = this, n = {}, o = a.style,
                q = a.nodeType && Oa(a), r = Ha.get(a, "fxshow");
            c.queue || (g = ma._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function () {
                g.unqueued || h()
            }), g.unqueued++, m.always(function () {
                m.always(function () {
                    g.unqueued--, ma.queue(a, "fx").length || g.empty.fire()
                })
            }));
            for (d in b) if (e = b[d], nb.test(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                    if ("show" !== e || !r || void 0 === r[d]) continue;
                    q = !0
                }
                n[d] = r && r[d] || ma.style(a, d)
            }
            if (i = !ma.isEmptyObject(b), i || !ma.isEmptyObject(n)) {
                l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = r && r.display, null == j && (j = Ha.get(a, "display")), k = ma.css(a, "display"), "none" === k && (j ? k = j : (p([a], !0), j = a.style.display || j, k = ma.css(a, "display"), p([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === ma.css(a, "float") && (i || (m.done(function () {
                    o.display = j
                }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function () {
                    o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
                })), i = !1;
                for (d in n) i || (r ? "hidden" in r && (q = r.hidden) : r = Ha.access(a, "fxshow", {display: j}), f && (r.hidden = !q), q && p([a], !0), m.done(function () {
                    q || p([a]), Ha.remove(a, "fxshow");
                    for (d in n) ma.style(a, d, n[d])
                })), i = O(q ? r[d] : 0, d, m), d in r || (r[d] = i.start, q && (i.end = i.start, i.start = 0))
            }
        }

        function Q(a, b) {
            var c, d, e, f, g;
            for (c in a) if (d = ma.camelCase(c), e = b[d], f = a[c], ma.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ma.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
        }

        function R(a, b, c) {
            var d, e, f = 0, g = R.prefilters.length, h = ma.Deferred().always(function () {
                delete i.elem
            }), i = function () {
                if (e) return !1;
                for (var b = lb || M(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (h.resolveWith(a, [j]), !1)
            }, j = h.promise({
                elem: a,
                props: ma.extend({}, b),
                opts: ma.extend(!0, {specialEasing: {}, easing: ma.easing._default}, c),
                originalProperties: b,
                originalOptions: c,
                startTime: lb || M(),
                duration: c.duration,
                tweens: [],
                createTween: function (b, c) {
                    var d = ma.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function (b) {
                    var c = 0, d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; c < d; c++) j.tweens[c].run(1);
                    return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
                }
            }), k = j.props;
            for (Q(k, j.opts.specialEasing); f < g; f++) if (d = R.prefilters[f].call(j, a, k, j.opts)) return ma.isFunction(d.stop) && (ma._queueHooks(j.elem, j.opts.queue).stop = ma.proxy(d.stop, d)), d;
            return ma.map(k, O, j), ma.isFunction(j.opts.start) && j.opts.start.call(a, j), ma.fx.timer(ma.extend(i, {
                elem: a,
                anim: j,
                queue: j.opts.queue
            })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }

        function S(a) {
            return a.getAttribute && a.getAttribute("class") || ""
        }

        function T(a, b, c, d) {
            var e;
            if (ma.isArray(b)) ma.each(b, function (b, e) {
                c || Ab.test(a) ? d(a, e) : T(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
            }); else if (c || "object" !== ma.type(b)) d(a, b); else for (e in b) T(a + "[" + e + "]", b[e], c, d)
        }

        function U(a) {
            return function (b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d, e = 0, f = b.toLowerCase().match(Ca) || [];
                if (ma.isFunction(c)) for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }

        function V(a, b, c, d) {
            function e(h) {
                var i;
                return f[h] = !0, ma.each(a[h] || [], function (a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
                }), i
            }

            var f = {}, g = a === Mb;
            return e(b.dataTypes[0]) || !f["*"] && e("*")
        }

        function W(a, b) {
            var c, d, e = ma.ajaxSettings.flatOptions || {};
            for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
            return d && ma.extend(!0, a, d), a
        }

        function X(a, b, c) {
            for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
            if (d) for (e in h) if (h[e] && h[e].test(d)) {
                i.unshift(e);
                break
            }
            if (i[0] in c) f = i[0]; else {
                for (e in c) {
                    if (!i[0] || a.converters[e + " " + i[0]]) {
                        f = e;
                        break
                    }
                    g || (g = e)
                }
                f = f || g
            }
            if (f) return f !== i[0] && i.unshift(f), c[f]
        }

        function Y(a, b, c, d) {
            var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
            if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
            for (f = k.shift(); f;) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
                if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                    g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                    break
                }
                if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                    b = g(b)
                } catch (l) {
                    return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
                }
            }
            return {state: "success", data: b}
        }

        function Z(a) {
            return ma.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
        }

        var $ = [], _ = a.document, aa = Object.getPrototypeOf, ba = $.slice, ca = $.concat, da = $.push,
            ea = $.indexOf, fa = {}, ga = fa.toString, ha = fa.hasOwnProperty, ia = ha.toString, ja = ia.call(Object),
            ka = {}, la = "3.0.0", ma = function (a, b) {
                return new ma.fn.init(a, b)
            }, na = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, oa = /^-ms-/, pa = /-([a-z])/g, qa = function (a, b) {
                return b.toUpperCase()
            };
        ma.fn = ma.prototype = {
            jquery: la, constructor: ma, length: 0, toArray: function () {
                return ba.call(this)
            }, get: function (a) {
                return null != a ? a < 0 ? this[a + this.length] : this[a] : ba.call(this)
            }, pushStack: function (a) {
                var b = ma.merge(this.constructor(), a);
                return b.prevObject = this, b
            }, each: function (a) {
                return ma.each(this, a)
            }, map: function (a) {
                return this.pushStack(ma.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            }, slice: function () {
                return this.pushStack(ba.apply(this, arguments))
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, eq: function (a) {
                var b = this.length, c = +a + (a < 0 ? b : 0);
                return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
            }, end: function () {
                return this.prevObject || this.constructor()
            }, push: da, sort: $.sort, splice: $.splice
        }, ma.extend = ma.fn.extend = function () {
            var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
            for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || ma.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++) if (null != (a = arguments[h])) for (b in a) c = g[b], d = a[b], g !== d && (j && d && (ma.isPlainObject(d) || (e = ma.isArray(d))) ? (e ? (e = !1, f = c && ma.isArray(c) ? c : []) : f = c && ma.isPlainObject(c) ? c : {}, g[b] = ma.extend(j, f, d)) : void 0 !== d && (g[b] = d));
            return g
        }, ma.extend({
            expando: "jQuery" + (la + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
                throw new Error(a)
            }, noop: function () {
            }, isFunction: function (a) {
                return "function" === ma.type(a)
            }, isArray: Array.isArray, isWindow: function (a) {
                return null != a && a === a.window
            }, isNumeric: function (a) {
                var b = ma.type(a);
                return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a))
            }, isPlainObject: function (a) {
                var b, c;
                return !(!a || "[object Object]" !== ga.call(a)) && (!(b = aa(a)) || (c = ha.call(b, "constructor") && b.constructor, "function" == typeof c && ia.call(c) === ja))
            }, isEmptyObject: function (a) {
                var b;
                for (b in a) return !1;
                return !0
            }, type: function (a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? fa[ga.call(a)] || "object" : typeof a
            }, globalEval: function (a) {
                c(a)
            }, camelCase: function (a) {
                return a.replace(oa, "ms-").replace(pa, qa)
            }, nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
            }, each: function (a, b) {
                var c, e = 0;
                if (d(a)) for (c = a.length; e < c && b.call(a[e], e, a[e]) !== !1; e++) ; else for (e in a) if (b.call(a[e], e, a[e]) === !1) break;
                return a
            }, trim: function (a) {
                return null == a ? "" : (a + "").replace(na, "")
            }, makeArray: function (a, b) {
                var c = b || [];
                return null != a && (d(Object(a)) ? ma.merge(c, "string" == typeof a ? [a] : a) : da.call(c, a)), c
            }, inArray: function (a, b, c) {
                return null == b ? -1 : ea.call(b, a, c)
            }, merge: function (a, b) {
                for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
                return a.length = e, a
            }, grep: function (a, b, c) {
                for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
                return e
            }, map: function (a, b, c) {
                var e, f, g = 0, h = [];
                if (d(a)) for (e = a.length; g < e; g++) f = b(a[g], g, c), null != f && h.push(f); else for (g in a) f = b(a[g], g, c), null != f && h.push(f);
                return ca.apply([], h)
            }, guid: 1, proxy: function (a, b) {
                var c, d, e;
                if ("string" == typeof b && (c = a[b], b = a, a = c), ma.isFunction(a)) return d = ba.call(arguments, 2), e = function () {
                    return a.apply(b || this, d.concat(ba.call(arguments)))
                }, e.guid = a.guid = a.guid || ma.guid++, e
            }, now: Date.now, support: ka
        }), "function" == typeof Symbol && (ma.fn[Symbol.iterator] = $[Symbol.iterator]), ma.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
            fa["[object " + b + "]"] = b.toLowerCase()
        });
        var ra = function (a) {
            function b(a, b, c, d) {
                var e, f, g, h, i, j, k, m = b && b.ownerDocument, o = b ? b.nodeType : 9;
                if (c = c || [], "string" != typeof a || !a || 1 !== o && 9 !== o && 11 !== o) return c;
                if (!d && ((b ? b.ownerDocument || b : P) !== H && G(b), b = b || H, J)) {
                    if (11 !== o && (i = ra.exec(a))) if (e = i[1]) {
                        if (9 === o) {
                            if (!(g = b.getElementById(e))) return c;
                            if (g.id === e) return c.push(g), c
                        } else if (m && (g = m.getElementById(e)) && N(b, g) && g.id === e) return c.push(g), c
                    } else {
                        if (i[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                        if ((e = i[3]) && w.getElementsByClassName && b.getElementsByClassName) return $.apply(c, b.getElementsByClassName(e)), c
                    }
                    if (w.qsa && !U[a + " "] && (!K || !K.test(a))) {
                        if (1 !== o) m = b, k = a; else if ("object" !== b.nodeName.toLowerCase()) {
                            for ((h = b.getAttribute("id")) ? h = h.replace(va, wa) : b.setAttribute("id", h = O), j = A(a), f = j.length; f--;) j[f] = "#" + h + " " + n(j[f]);
                            k = j.join(","), m = sa.test(a) && l(b.parentNode) || b
                        }
                        if (k) try {
                            return $.apply(c, m.querySelectorAll(k)), c
                        } catch (p) {
                        } finally {
                            h === O && b.removeAttribute("id")
                        }
                    }
                }
                return C(a.replace(ha, "$1"), b, c, d)
            }

            function c() {
                function a(c, d) {
                    return b.push(c + " ") > x.cacheLength && delete a[b.shift()], a[c + " "] = d
                }

                var b = [];
                return a
            }

            function d(a) {
                return a[O] = !0, a
            }

            function e(a) {
                var b = H.createElement("fieldset");
                try {
                    return !!a(b)
                } catch (c) {
                    return !1
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }

            function f(a, b) {
                for (var c = a.split("|"), d = c.length; d--;) x.attrHandle[c[d]] = b
            }

            function g(a, b) {
                var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
                if (d) return d;
                if (c) for (; c = c.nextSibling;) if (c === b) return -1;
                return a ? 1 : -1
            }

            function h(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return "input" === c && b.type === a
                }
            }

            function i(a) {
                return function (b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }

            function j(a) {
                return function (b) {
                    return "label" in b && b.disabled === a || "form" in b && b.disabled === a || "form" in b && b.disabled === !1 && (b.isDisabled === a || b.isDisabled !== !a && ("label" in b || !ya(b)) !== a)
                }
            }

            function k(a) {
                return d(function (b) {
                    return b = +b, d(function (c, d) {
                        for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }

            function l(a) {
                return a && "undefined" != typeof a.getElementsByTagName && a
            }

            function m() {
            }

            function n(a) {
                for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
                return d
            }

            function o(a, b, c) {
                var d = b.dir, e = b.next, f = e || d, g = c && "parentNode" === f, h = R++;
                return b.first ? function (b, c, e) {
                    for (; b = b[d];) if (1 === b.nodeType || g) return a(b, c, e)
                } : function (b, c, i) {
                    var j, k, l, m = [Q, h];
                    if (i) {
                        for (; b = b[d];) if ((1 === b.nodeType || g) && a(b, c, i)) return !0
                    } else for (; b = b[d];) if (1 === b.nodeType || g) if (l = b[O] || (b[O] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b; else {
                        if ((j = k[f]) && j[0] === Q && j[1] === h) return m[2] = j[2];
                        if (k[f] = m, m[2] = a(b, c, i)) return !0
                    }
                }
            }

            function p(a) {
                return a.length > 1 ? function (b, c, d) {
                    for (var e = a.length; e--;) if (!a[e](b, c, d)) return !1;
                    return !0
                } : a[0]
            }

            function q(a, c, d) {
                for (var e = 0, f = c.length; e < f; e++) b(a, c[e], d);
                return d
            }

            function r(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++) (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
                return g
            }

            function s(a, b, c, e, f, g) {
                return e && !e[O] && (e = s(e)), f && !f[O] && (f = s(f, g)), d(function (d, g, h, i) {
                    var j, k, l, m = [], n = [], o = g.length, p = d || q(b || "*", h.nodeType ? [h] : h, []),
                        s = !a || !d && b ? p : r(p, m, a, h, i), t = c ? f || (d ? a : o || e) ? [] : g : s;
                    if (c && c(s, t, h, i), e) for (j = r(t, n), e(j, [], h, i), k = j.length; k--;) (l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                    if (d) {
                        if (f || a) {
                            if (f) {
                                for (j = [], k = t.length; k--;) (l = t[k]) && j.push(s[k] = l);
                                f(null, t = [], j, i)
                            }
                            for (k = t.length; k--;) (l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                        }
                    } else t = r(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
                })
            }

            function t(a) {
                for (var b, c, d, e = a.length, f = x.relative[a[0].type], g = f || x.relative[" "], h = f ? 1 : 0, i = o(function (a) {
                    return a === b
                }, g, !0), j = o(function (a) {
                    return aa(b, a) > -1
                }, g, !0), k = [function (a, c, d) {
                    var e = !f && (d || c !== D) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                    return b = null, e
                }]; h < e; h++) if (c = x.relative[a[h].type]) k = [o(p(k), c)]; else {
                    if (c = x.filter[a[h].type].apply(null, a[h].matches), c[O]) {
                        for (d = ++h; d < e && !x.relative[a[d].type]; d++) ;
                        return s(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({value: " " === a[h - 2].type ? "*" : ""})).replace(ha, "$1"), c, h < d && t(a.slice(h, d)), d < e && t(a = a.slice(d)), d < e && n(a))
                    }
                    k.push(c)
                }
                return p(k)
            }

            function u(a, c) {
                var e = c.length > 0, f = a.length > 0, g = function (d, g, h, i, j) {
                    var k, l, m, n = 0, o = "0", p = d && [], q = [], s = D, t = d || f && x.find.TAG("*", j),
                        u = Q += null == s ? 1 : Math.random() || .1, v = t.length;
                    for (j && (D = g === H || g || j); o !== v && null != (k = t[o]); o++) {
                        if (f && k) {
                            for (l = 0, g || k.ownerDocument === H || (G(k), h = !J); m = a[l++];) if (m(k, g || H, h)) {
                                i.push(k);
                                break
                            }
                            j && (Q = u)
                        }
                        e && ((k = !m && k) && n--, d && p.push(k))
                    }
                    if (n += o, e && o !== n) {
                        for (l = 0; m = c[l++];) m(p, q, g, h);
                        if (d) {
                            if (n > 0) for (; o--;) p[o] || q[o] || (q[o] = Y.call(i));
                            q = r(q)
                        }
                        $.apply(i, q), j && !d && q.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                    }
                    return j && (Q = u, D = s), p
                };
                return e ? d(g) : g
            }

            var v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = "sizzle" + 1 * new Date, P = a.document,
                Q = 0, R = 0, S = c(), T = c(), U = c(), V = function (a, b) {
                    return a === b && (F = !0), 0
                }, W = {}.hasOwnProperty, X = [], Y = X.pop, Z = X.push, $ = X.push, _ = X.slice, aa = function (a, b) {
                    for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return c;
                    return -1
                },
                ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ca = "[\\x20\\t\\r\\n\\f]", da = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                ea = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + da + "))|)" + ca + "*\\]",
                fa = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ea + ")*)|.*)\\)|)",
                ga = new RegExp(ca + "+", "g"),
                ha = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
                ia = new RegExp("^" + ca + "*," + ca + "*"),
                ja = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
                ka = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"), la = new RegExp(fa),
                ma = new RegExp("^" + da + "$"), na = {
                    ID: new RegExp("^#(" + da + ")"),
                    CLASS: new RegExp("^\\.(" + da + ")"),
                    TAG: new RegExp("^(" + da + "|[*])"),
                    ATTR: new RegExp("^" + ea),
                    PSEUDO: new RegExp("^" + fa),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + ba + ")$", "i"),
                    needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
                }, oa = /^(?:input|select|textarea|button)$/i, pa = /^h\d$/i, qa = /^[^{]+\{\s*\[native \w/,
                ra = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, sa = /[+~]/,
                ta = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"), ua = function (a, b, c) {
                    var d = "0x" + b - 65536;
                    return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                }, va = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, wa = function (a, b) {
                    return b ? "\0" === a ? "�" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a
                }, xa = function () {
                    G()
                }, ya = o(function (a) {
                    return a.disabled === !0
                }, {dir: "parentNode", next: "legend"});
            try {
                $.apply(X = _.call(P.childNodes), P.childNodes), X[P.childNodes.length].nodeType
            } catch (za) {
                $ = {
                    apply: X.length ? function (a, b) {
                        Z.apply(a, _.call(b))
                    } : function (a, b) {
                        for (var c = a.length, d = 0; a[c++] = b[d++];) ;
                        a.length = c - 1
                    }
                }
            }
            w = b.support = {}, z = b.isXML = function (a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return !!b && "HTML" !== b.nodeName
            }, G = b.setDocument = function (a) {
                var b, c, d = a ? a.ownerDocument || a : P;
                return d !== H && 9 === d.nodeType && d.documentElement ? (H = d, I = H.documentElement, J = !z(H), P !== H && (c = H.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), w.attributes = e(function (a) {
                    return a.className = "i", !a.getAttribute("className")
                }), w.getElementsByTagName = e(function (a) {
                    return a.appendChild(H.createComment("")), !a.getElementsByTagName("*").length
                }), w.getElementsByClassName = qa.test(H.getElementsByClassName), w.getById = e(function (a) {
                    return I.appendChild(a).id = O, !H.getElementsByName || !H.getElementsByName(O).length
                }), w.getById ? (x.find.ID = function (a, b) {
                    if ("undefined" != typeof b.getElementById && J) {
                        var c = b.getElementById(a);
                        return c ? [c] : []
                    }
                }, x.filter.ID = function (a) {
                    var b = a.replace(ta, ua);
                    return function (a) {
                        return a.getAttribute("id") === b
                    }
                }) : (delete x.find.ID, x.filter.ID = function (a) {
                    var b = a.replace(ta, ua);
                    return function (a) {
                        var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }), x.find.TAG = w.getElementsByTagName ? function (a, b) {
                    return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : w.qsa ? b.querySelectorAll(a) : void 0
                } : function (a, b) {
                    var c, d = [], e = 0, f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, x.find.CLASS = w.getElementsByClassName && function (a, b) {
                    if ("undefined" != typeof b.getElementsByClassName && J) return b.getElementsByClassName(a)
                }, L = [], K = [], (w.qsa = qa.test(H.querySelectorAll)) && (e(function (a) {
                    I.appendChild(a).innerHTML = "<a id='" + O + "'></a><select id='" + O + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && K.push("[*^$]=" + ca + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || K.push("\\[" + ca + "*(?:value|" + ba + ")"), a.querySelectorAll("[id~=" + O + "-]").length || K.push("~="), a.querySelectorAll(":checked").length || K.push(":checked"), a.querySelectorAll("a#" + O + "+*").length || K.push(".#.+[+~]")
                }), e(function (a) {
                    a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var b = H.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && K.push("name" + ca + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && K.push(":enabled", ":disabled"), I.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && K.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), K.push(",.*:")
                })), (w.matchesSelector = qa.test(M = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && e(function (a) {
                    w.disconnectedMatch = M.call(a, "*"), M.call(a, "[s!='']:x"), L.push("!=", fa)
                }), K = K.length && new RegExp(K.join("|")), L = L.length && new RegExp(L.join("|")), b = qa.test(I.compareDocumentPosition), N = b || qa.test(I.contains) ? function (a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function (a, b) {
                    if (b) for (; b = b.parentNode;) if (b === a) return !0;
                    return !1
                }, V = b ? function (a, b) {
                    if (a === b) return F = !0, 0;
                    var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !w.sortDetached && b.compareDocumentPosition(a) === c ? a === H || a.ownerDocument === P && N(P, a) ? -1 : b === H || b.ownerDocument === P && N(P, b) ? 1 : E ? aa(E, a) - aa(E, b) : 0 : 4 & c ? -1 : 1)
                } : function (a, b) {
                    if (a === b) return F = !0, 0;
                    var c, d = 0, e = a.parentNode, f = b.parentNode, h = [a], i = [b];
                    if (!e || !f) return a === H ? -1 : b === H ? 1 : e ? -1 : f ? 1 : E ? aa(E, a) - aa(E, b) : 0;
                    if (e === f) return g(a, b);
                    for (c = a; c = c.parentNode;) h.unshift(c);
                    for (c = b; c = c.parentNode;) i.unshift(c);
                    for (; h[d] === i[d];) d++;
                    return d ? g(h[d], i[d]) : h[d] === P ? -1 : i[d] === P ? 1 : 0
                }, H) : H
            }, b.matches = function (a, c) {
                return b(a, null, null, c)
            }, b.matchesSelector = function (a, c) {
                if ((a.ownerDocument || a) !== H && G(a), c = c.replace(ka, "='$1']"), w.matchesSelector && J && !U[c + " "] && (!L || !L.test(c)) && (!K || !K.test(c))) try {
                    var d = M.call(a, c);
                    if (d || w.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                } catch (e) {
                }
                return b(c, H, null, [a]).length > 0
            }, b.contains = function (a, b) {
                return (a.ownerDocument || a) !== H && G(a), N(a, b)
            }, b.attr = function (a, b) {
                (a.ownerDocument || a) !== H && G(a);
                var c = x.attrHandle[b.toLowerCase()],
                    d = c && W.call(x.attrHandle, b.toLowerCase()) ? c(a, b, !J) : void 0;
                return void 0 !== d ? d : w.attributes || !J ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }, b.escape = function (a) {
                return (a + "").replace(va, wa)
            }, b.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, b.uniqueSort = function (a) {
                var b, c = [], d = 0, e = 0;
                if (F = !w.detectDuplicates, E = !w.sortStable && a.slice(0), a.sort(V), F) {
                    for (; b = a[e++];) b === a[e] && (d = c.push(e));
                    for (; d--;) a.splice(c[d], 1)
                }
                return E = null, a
            }, y = b.getText = function (a) {
                var b, c = "", d = 0, e = a.nodeType;
                if (e) {
                    if (1 === e || 9 === e || 11 === e) {
                        if ("string" == typeof a.textContent) return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += y(a)
                    } else if (3 === e || 4 === e) return a.nodeValue
                } else for (; b = a[d++];) c += y(b);
                return c
            }, x = b.selectors = {
                cacheLength: 50,
                createPseudo: d,
                match: na,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {dir: "parentNode", first: !0},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: !0},
                    "~": {dir: "previousSibling"}
                },
                preFilter: {
                    ATTR: function (a) {
                        return a[1] = a[1].replace(ta, ua), a[3] = (a[3] || a[4] || a[5] || "").replace(ta, ua), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    }, CHILD: function (a) {
                        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                    }, PSEUDO: function (a) {
                        var b, c = !a[6] && a[2];
                        return na.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && la.test(c) && (b = A(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (a) {
                        var b = a.replace(ta, ua).toLowerCase();
                        return "*" === a ? function () {
                            return !0
                        } : function (a) {
                            return a.nodeName && a.nodeName.toLowerCase() === b
                        }
                    }, CLASS: function (a) {
                        var b = S[a + " "];
                        return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && S(a, function (a) {
                            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                        })
                    }, ATTR: function (a, c, d) {
                        return function (e) {
                            var f = b.attr(e, a);
                            return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ga, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                        }
                    }, CHILD: function (a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                        return 1 === d && 0 === e ? function (a) {
                            return !!a.parentNode
                        } : function (b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode,
                                r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1;
                            if (q) {
                                if (f) {
                                    for (; p;) {
                                        for (m = b; m = m[p];) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    for (m = q, l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === Q && j[1], t = n && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop();) if (1 === m.nodeType && ++t && m === b) {
                                        k[a] = [Q, n, t];
                                        break
                                    }
                                } else if (s && (m = b, l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === Q && j[1], t = n), t === !1) for (; (m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [Q, t]), m !== b));) ;
                                return t -= e, t === d || t % d === 0 && t / d >= 0
                            }
                        }
                    }, PSEUDO: function (a, c) {
                        var e, f = x.pseudos[a] || x.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                        return f[O] ? f(c) : f.length > 1 ? (e = [a, a, "", c], x.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
                            for (var d, e = f(a, c), g = e.length; g--;) d = aa(a, e[g]), a[d] = !(b[d] = e[g])
                        }) : function (a) {
                            return f(a, 0, e)
                        }) : f
                    }
                },
                pseudos: {
                    not: d(function (a) {
                        var b = [], c = [], e = B(a.replace(ha, "$1"));
                        return e[O] ? d(function (a, b, c, d) {
                            for (var f, g = e(a, null, d, []), h = a.length; h--;) (f = g[h]) && (a[h] = !(b[h] = f))
                        }) : function (a, d, f) {
                            return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
                        }
                    }), has: d(function (a) {
                        return function (c) {
                            return b(a, c).length > 0
                        }
                    }), contains: d(function (a) {
                        return a = a.replace(ta, ua), function (b) {
                            return (b.textContent || b.innerText || y(b)).indexOf(a) > -1
                        }
                    }), lang: d(function (a) {
                        return ma.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(ta, ua).toLowerCase(), function (b) {
                            var c;
                            do if (c = J ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                    }), target: function (b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id
                    }, root: function (a) {
                        return a === I
                    }, focus: function (a) {
                        return a === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                    }, enabled: j(!1), disabled: j(!0), checked: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && !!a.checked || "option" === b && !!a.selected
                    }, selected: function (a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    }, empty: function (a) {
                        for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                        return !0
                    }, parent: function (a) {
                        return !x.pseudos.empty(a)
                    }, header: function (a) {
                        return pa.test(a.nodeName)
                    }, input: function (a) {
                        return oa.test(a.nodeName)
                    }, button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && "button" === a.type || "button" === b
                    }, text: function (a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                    }, first: k(function () {
                        return [0]
                    }), last: k(function (a, b) {
                        return [b - 1]
                    }), eq: k(function (a, b, c) {
                        return [c < 0 ? c + b : c]
                    }), even: k(function (a, b) {
                        for (var c = 0; c < b; c += 2) a.push(c);
                        return a
                    }), odd: k(function (a, b) {
                        for (var c = 1; c < b; c += 2) a.push(c);
                        return a
                    }), lt: k(function (a, b, c) {
                        for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                        return a
                    }), gt: k(function (a, b, c) {
                        for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                        return a
                    })
                }
            }, x.pseudos.nth = x.pseudos.eq;
            for (v in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) x.pseudos[v] = h(v);
            for (v in{submit: !0, reset: !0}) x.pseudos[v] = i(v);
            return m.prototype = x.filters = x.pseudos, x.setFilters = new m, A = b.tokenize = function (a, c) {
                var d, e, f, g, h, i, j, k = T[a + " "];
                if (k) return c ? 0 : k.slice(0);
                for (h = a, i = [], j = x.preFilter; h;) {
                    d && !(e = ia.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ja.exec(h)) && (d = e.shift(), f.push({
                        value: d,
                        type: e[0].replace(ha, " ")
                    }), h = h.slice(d.length));
                    for (g in x.filter) !(e = na[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                        value: d,
                        type: g,
                        matches: e
                    }), h = h.slice(d.length));
                    if (!d) break
                }
                return c ? h.length : h ? b.error(a) : T(a, i).slice(0)
            }, B = b.compile = function (a, b) {
                var c, d = [], e = [], f = U[a + " "];
                if (!f) {
                    for (b || (b = A(a)), c = b.length; c--;) f = t(b[c]), f[O] ? d.push(f) : e.push(f);
                    f = U(a, u(e, d)), f.selector = a
                }
                return f
            }, C = b.select = function (a, b, c, d) {
                var e, f, g, h, i, j = "function" == typeof a && a, k = !d && A(a = j.selector || a);
                if (c = c || [], 1 === k.length) {
                    if (f = k[0] = k[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && w.getById && 9 === b.nodeType && J && x.relative[f[1].type]) {
                        if (b = (x.find.ID(g.matches[0].replace(ta, ua), b) || [])[0], !b) return c;
                        j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                    }
                    for (e = na.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !x.relative[h = g.type]);) if ((i = x.find[h]) && (d = i(g.matches[0].replace(ta, ua), sa.test(f[0].type) && l(b.parentNode) || b))) {
                        if (f.splice(e, 1), a = d.length && n(f), !a) return $.apply(c, d), c;
                        break
                    }
                }
                return (j || B(a, k))(d, b, !J, c, !b || sa.test(a) && l(b.parentNode) || b), c
            }, w.sortStable = O.split("").sort(V).join("") === O, w.detectDuplicates = !!F, G(), w.sortDetached = e(function (a) {
                return 1 & a.compareDocumentPosition(H.createElement("fieldset"))
            }), e(function (a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || f("type|href|height|width", function (a, b, c) {
                if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
            }), w.attributes && e(function (a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }) || f("value", function (a, b, c) {
                if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
            }), e(function (a) {
                return null == a.getAttribute("disabled")
            }) || f(ba, function (a, b, c) {
                var d;
                if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }), b
        }(a);
        ma.find = ra, ma.expr = ra.selectors, ma.expr[":"] = ma.expr.pseudos, ma.uniqueSort = ma.unique = ra.uniqueSort, ma.text = ra.getText, ma.isXMLDoc = ra.isXML, ma.contains = ra.contains, ma.escapeSelector = ra.escape;
        var sa = function (a, b, c) {
                for (var d = [], e = void 0 !== c; (a = a[b]) && 9 !== a.nodeType;) if (1 === a.nodeType) {
                    if (e && ma(a).is(c)) break;
                    d.push(a)
                }
                return d
            }, ta = function (a, b) {
                for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                return c
            }, ua = ma.expr.match.needsContext, va = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
            wa = /^.[^:#\[\.,]*$/;
        ma.filter = function (a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? ma.find.matchesSelector(d, a) ? [d] : [] : ma.find.matches(a, ma.grep(b, function (a) {
                return 1 === a.nodeType
            }))
        }, ma.fn.extend({
            find: function (a) {
                var b, c, d = this.length, e = this;
                if ("string" != typeof a) return this.pushStack(ma(a).filter(function () {
                    for (b = 0; b < d; b++) if (ma.contains(e[b], this)) return !0
                }));
                for (c = this.pushStack([]), b = 0; b < d; b++) ma.find(a, e[b], c);
                return d > 1 ? ma.uniqueSort(c) : c
            }, filter: function (a) {
                return this.pushStack(e(this, a || [], !1))
            }, not: function (a) {
                return this.pushStack(e(this, a || [], !0))
            }, is: function (a) {
                return !!e(this, "string" == typeof a && ua.test(a) ? ma(a) : a || [], !1).length
            }
        });
        var xa, ya = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, za = ma.fn.init = function (a, b, c) {
            var d, e;
            if (!a) return this;
            if (c = c || xa, "string" == typeof a) {
                if (d = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ya.exec(a), !d || !d[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                if (d[1]) {
                    if (b = b instanceof ma ? b[0] : b, ma.merge(this, ma.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : _, !0)), va.test(d[1]) && ma.isPlainObject(b)) for (d in b) ma.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                    return this
                }
                return e = _.getElementById(d[2]), e && (this[0] = e, this.length = 1), this
            }
            return a.nodeType ? (this[0] = a, this.length = 1, this) : ma.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(ma) : ma.makeArray(a, this)
        };
        za.prototype = ma.fn, xa = ma(_);
        var Aa = /^(?:parents|prev(?:Until|All))/, Ba = {children: !0, contents: !0, next: !0, prev: !0};
        ma.fn.extend({
            has: function (a) {
                var b = ma(a, this), c = b.length;
                return this.filter(function () {
                    for (var a = 0; a < c; a++) if (ma.contains(this, b[a])) return !0
                })
            }, closest: function (a, b) {
                var c, d = 0, e = this.length, f = [], g = "string" != typeof a && ma(a);
                if (!ua.test(a)) for (; d < e; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ma.find.matchesSelector(c, a))) {
                    f.push(c);
                    break
                }
                return this.pushStack(f.length > 1 ? ma.uniqueSort(f) : f)
            }, index: function (a) {
                return a ? "string" == typeof a ? ea.call(ma(a), this[0]) : ea.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }, add: function (a, b) {
                return this.pushStack(ma.uniqueSort(ma.merge(this.get(), ma(a, b))))
            }, addBack: function (a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }
        }), ma.each({
            parent: function (a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null
            }, parents: function (a) {
                return sa(a, "parentNode")
            }, parentsUntil: function (a, b, c) {
                return sa(a, "parentNode", c)
            }, next: function (a) {
                return f(a, "nextSibling")
            }, prev: function (a) {
                return f(a, "previousSibling")
            }, nextAll: function (a) {
                return sa(a, "nextSibling")
            }, prevAll: function (a) {
                return sa(a, "previousSibling")
            }, nextUntil: function (a, b, c) {
                return sa(a, "nextSibling", c)
            }, prevUntil: function (a, b, c) {
                return sa(a, "previousSibling", c)
            }, siblings: function (a) {
                return ta((a.parentNode || {}).firstChild, a)
            }, children: function (a) {
                return ta(a.firstChild)
            }, contents: function (a) {
                return a.contentDocument || ma.merge([], a.childNodes)
            }
        }, function (a, b) {
            ma.fn[a] = function (c, d) {
                var e = ma.map(this, b, c);
                return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ma.filter(d, e)), this.length > 1 && (Ba[a] || ma.uniqueSort(e), Aa.test(a) && e.reverse()), this.pushStack(e)
            }
        });
        var Ca = /\S+/g;
        ma.Callbacks = function (a) {
            a = "string" == typeof a ? g(a) : ma.extend({}, a);
            var b, c, d, e, f = [], h = [], i = -1, j = function () {
                for (e = a.once, d = b = !0; h.length; i = -1) for (c = h.shift(); ++i < f.length;) f[i].apply(c[0], c[1]) === !1 && a.stopOnFalse && (i = f.length, c = !1);
                a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
            }, k = {
                add: function () {
                    return f && (c && !b && (i = f.length - 1, h.push(c)), function d(b) {
                        ma.each(b, function (b, c) {
                            ma.isFunction(c) ? a.unique && k.has(c) || f.push(c) : c && c.length && "string" !== ma.type(c) && d(c)
                        })
                    }(arguments), c && !b && j()), this
                }, remove: function () {
                    return ma.each(arguments, function (a, b) {
                        for (var c; (c = ma.inArray(b, f, c)) > -1;) f.splice(c, 1), c <= i && i--
                    }), this
                }, has: function (a) {
                    return a ? ma.inArray(a, f) > -1 : f.length > 0
                }, empty: function () {
                    return f && (f = []), this
                }, disable: function () {
                    return e = h = [], f = c = "", this
                }, disabled: function () {
                    return !f
                }, lock: function () {
                    return e = h = [], c || b || (f = c = ""), this
                }, locked: function () {
                    return !!e
                }, fireWith: function (a, c) {
                    return e || (c = c || [], c = [a, c.slice ? c.slice() : c], h.push(c), b || j()), this
                }, fire: function () {
                    return k.fireWith(this, arguments), this
                }, fired: function () {
                    return !!d
                }
            };
            return k
        }, ma.extend({
            Deferred: function (b) {
                var c = [["notify", "progress", ma.Callbacks("memory"), ma.Callbacks("memory"), 2], ["resolve", "done", ma.Callbacks("once memory"), ma.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", ma.Callbacks("once memory"), ma.Callbacks("once memory"), 1, "rejected"]],
                    d = "pending", e = {
                        state: function () {
                            return d
                        }, always: function () {
                            return f.done(arguments).fail(arguments), this
                        }, "catch": function (a) {
                            return e.then(null, a)
                        }, pipe: function () {
                            var a = arguments;
                            return ma.Deferred(function (b) {
                                ma.each(c, function (c, d) {
                                    var e = ma.isFunction(a[d[4]]) && a[d[4]];
                                    f[d[1]](function () {
                                        var a = e && e.apply(this, arguments);
                                        a && ma.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments)
                                    })
                                }), a = null
                            }).promise()
                        }, then: function (b, d, e) {
                            function f(b, c, d, e) {
                                return function () {
                                    var j = this, k = arguments, l = function () {
                                        var a, l;
                                        if (!(b < g)) {
                                            if (a = d.apply(j, k), a === c.promise()) throw new TypeError("Thenable self-resolution");
                                            l = a && ("object" == typeof a || "function" == typeof a) && a.then, ma.isFunction(l) ? e ? l.call(a, f(g, c, h, e), f(g, c, i, e)) : (g++, l.call(a, f(g, c, h, e), f(g, c, i, e), f(g, c, h, c.notifyWith))) : (d !== h && (j = void 0, k = [a]), (e || c.resolveWith)(j, k))
                                        }
                                    }, m = e ? l : function () {
                                        try {
                                            l()
                                        } catch (a) {
                                            ma.Deferred.exceptionHook && ma.Deferred.exceptionHook(a, m.stackTrace), b + 1 >= g && (d !== i && (j = void 0, k = [a]), c.rejectWith(j, k))
                                        }
                                    };
                                    b ? m() : (ma.Deferred.getStackHook && (m.stackTrace = ma.Deferred.getStackHook()), a.setTimeout(m))
                                }
                            }

                            var g = 0;
                            return ma.Deferred(function (a) {
                                c[0][3].add(f(0, a, ma.isFunction(e) ? e : h, a.notifyWith)), c[1][3].add(f(0, a, ma.isFunction(b) ? b : h)), c[2][3].add(f(0, a, ma.isFunction(d) ? d : i))
                            }).promise()
                        }, promise: function (a) {
                            return null != a ? ma.extend(a, e) : e
                        }
                    }, f = {};
                return ma.each(c, function (a, b) {
                    var g = b[2], h = b[5];
                    e[b[1]] = g.add, h && g.add(function () {
                        d = h
                    }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function () {
                        return f[b[0] + "With"](this === f ? void 0 : this, arguments), this
                    }, f[b[0] + "With"] = g.fireWith
                }), e.promise(f), b && b.call(f, f), f
            }, when: function (a) {
                var b = arguments.length, c = b, d = Array(c), e = ba.call(arguments), f = ma.Deferred(),
                    g = function (a) {
                        return function (c) {
                            d[a] = this, e[a] = arguments.length > 1 ? ba.call(arguments) : c, --b || f.resolveWith(d, e)
                        }
                    };
                if (b <= 1 && (j(a, f.done(g(c)).resolve, f.reject), "pending" === f.state() || ma.isFunction(e[c] && e[c].then))) return f.then();
                for (; c--;) j(e[c], g(c), f.reject);
                return f.promise()
            }
        });
        var Da = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        ma.Deferred.exceptionHook = function (b, c) {
            a.console && a.console.warn && b && Da.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c)
        };
        var Ea = ma.Deferred();
        ma.fn.ready = function (a) {
            return Ea.then(a), this
        }, ma.extend({
            isReady: !1, readyWait: 1, holdReady: function (a) {
                a ? ma.readyWait++ : ma.ready(!0)
            }, ready: function (a) {
                (a === !0 ? --ma.readyWait : ma.isReady) || (ma.isReady = !0, a !== !0 && --ma.readyWait > 0 || Ea.resolveWith(_, [ma]))
            }
        }), ma.ready.then = Ea.then, "complete" === _.readyState || "loading" !== _.readyState && !_.documentElement.doScroll ? a.setTimeout(ma.ready) : (_.addEventListener("DOMContentLoaded", k), a.addEventListener("load", k));
        var Fa = function (a, b, c, d, e, f, g) {
            var h = 0, i = a.length, j = null == c;
            if ("object" === ma.type(c)) {
                e = !0;
                for (h in c) Fa(a, b, h, c[h], !0, f, g)
            } else if (void 0 !== d && (e = !0, ma.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
                    return j.call(ma(a), c)
                })), b)) for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
        }, Ga = function (a) {
            return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
        };
        l.uid = 1, l.prototype = {
            cache: function (a) {
                var b = a[this.expando];
                return b || (b = {}, Ga(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                    value: b,
                    configurable: !0
                }))), b
            }, set: function (a, b, c) {
                var d, e = this.cache(a);
                if ("string" == typeof b) e[ma.camelCase(b)] = c; else for (d in b) e[ma.camelCase(d)] = b[d];
                return e
            }, get: function (a, b) {
                return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][ma.camelCase(b)]
            }, access: function (a, b, c) {
                return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b)
            }, remove: function (a, b) {
                var c, d = a[this.expando];
                if (void 0 !== d) {
                    if (void 0 !== b) {
                        ma.isArray(b) ? b = b.map(ma.camelCase) : (b = ma.camelCase(b), b = b in d ? [b] : b.match(Ca) || []), c = b.length;
                        for (; c--;) delete d[b[c]]
                    }
                    (void 0 === b || ma.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
                }
            }, hasData: function (a) {
                var b = a[this.expando];
                return void 0 !== b && !ma.isEmptyObject(b)
            }
        };
        var Ha = new l, Ia = new l, Ja = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Ka = /[A-Z]/g;
        ma.extend({
            hasData: function (a) {
                return Ia.hasData(a) || Ha.hasData(a)
            }, data: function (a, b, c) {
                return Ia.access(a, b, c)
            }, removeData: function (a, b) {
                Ia.remove(a, b)
            }, _data: function (a, b, c) {
                return Ha.access(a, b, c)
            }, _removeData: function (a, b) {
                Ha.remove(a, b)
            }
        }), ma.fn.extend({
            data: function (a, b) {
                var c, d, e, f = this[0], g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && (e = Ia.get(f), 1 === f.nodeType && !Ha.get(f, "hasDataAttrs"))) {
                        for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = ma.camelCase(d.slice(5)), m(f, d, e[d])));
                        Ha.set(f, "hasDataAttrs", !0)
                    }
                    return e
                }
                return "object" == typeof a ? this.each(function () {
                    Ia.set(this, a)
                }) : Fa(this, function (b) {
                    var c;
                    if (f && void 0 === b) {
                        if (c = Ia.get(f, a), void 0 !== c) return c;
                        if (c = m(f, a), void 0 !== c) return c
                    } else this.each(function () {
                        Ia.set(this, a, b)
                    })
                }, null, b, arguments.length > 1, null, !0)
            }, removeData: function (a) {
                return this.each(function () {
                    Ia.remove(this, a)
                })
            }
        }), ma.extend({
            queue: function (a, b, c) {
                var d;
                if (a) return b = (b || "fx") + "queue", d = Ha.get(a, b), c && (!d || ma.isArray(c) ? d = Ha.access(a, b, ma.makeArray(c)) : d.push(c)), d || []
            }, dequeue: function (a, b) {
                b = b || "fx";
                var c = ma.queue(a, b), d = c.length, e = c.shift(), f = ma._queueHooks(a, b), g = function () {
                    ma.dequeue(a, b)
                };
                "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            }, _queueHooks: function (a, b) {
                var c = b + "queueHooks";
                return Ha.get(a, c) || Ha.access(a, c, {
                    empty: ma.Callbacks("once memory").add(function () {
                        Ha.remove(a, [b + "queue", c])
                    })
                })
            }
        }), ma.fn.extend({
            queue: function (a, b) {
                var c = 2;
                return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? ma.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                    var c = ma.queue(this, a, b);
                    ma._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && ma.dequeue(this, a)
                })
            }, dequeue: function (a) {
                return this.each(function () {
                    ma.dequeue(this, a)
                })
            }, clearQueue: function (a) {
                return this.queue(a || "fx", [])
            }, promise: function (a, b) {
                var c, d = 1, e = ma.Deferred(), f = this, g = this.length, h = function () {
                    --d || e.resolveWith(f, [f])
                };
                for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = Ha.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b)
            }
        });
        var La = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ma = new RegExp("^(?:([+-])=|)(" + La + ")([a-z%]*)$", "i"), Na = ["Top", "Right", "Bottom", "Left"],
            Oa = function (a, b) {
                return a = b || a, "none" === a.style.display || "" === a.style.display && ma.contains(a.ownerDocument, a) && "none" === ma.css(a, "display")
            }, Pa = function (a, b, c, d) {
                var e, f, g = {};
                for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e
            }, Qa = {};
        ma.fn.extend({
            show: function () {
                return p(this, !0)
            }, hide: function () {
                return p(this)
            }, toggle: function (a) {
                return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                    Oa(this) ? ma(this).show() : ma(this).hide()
                })
            }
        });
        var Ra = /^(?:checkbox|radio)$/i, Sa = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, Ta = /^$|\/(?:java|ecma)script/i,
            Ua = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Ua.optgroup = Ua.option, Ua.tbody = Ua.tfoot = Ua.colgroup = Ua.caption = Ua.thead, Ua.th = Ua.td;
        var Va = /<|&#?\w+;/;
        !function () {
            var a = _.createDocumentFragment(), b = a.appendChild(_.createElement("div")), c = _.createElement("input");
            c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), ka.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", ka.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
        }();
        var Wa = _.documentElement, Xa = /^key/, Ya = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Za = /^([^.]*)(?:\.(.+)|)/;
        ma.event = {
            global: {}, add: function (a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = Ha.get(a);
                if (q) for (c.handler && (f = c, c = f.handler, e = f.selector), e && ma.find.matchesSelector(Wa, e), c.guid || (c.guid = ma.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
                    return "undefined" != typeof ma && ma.event.triggered !== b.type ? ma.event.dispatch.apply(a, arguments) : void 0
                }), b = (b || "").match(Ca) || [""], j = b.length; j--;) h = Za.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = ma.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = ma.event.special[n] || {}, k = ma.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && ma.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), ma.event.global[n] = !0)
            }, remove: function (a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = Ha.hasData(a) && Ha.get(a);
                if (q && (i = q.events)) {
                    for (b = (b || "").match(Ca) || [""], j = b.length; j--;) if (h = Za.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                        for (l = ma.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                        g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ma.removeEvent(a, n, q.handle), delete i[n])
                    } else for (n in i) ma.event.remove(a, n + b[j], c, d, !0);
                    ma.isEmptyObject(i) && Ha.remove(a, "handle events")
                }
            }, dispatch: function (a) {
                var b, c, d, e, f, g, h = ma.event.fix(a), i = new Array(arguments.length),
                    j = (Ha.get(this, "events") || {})[h.type] || [], k = ma.event.special[h.type] || {};
                for (i[0] = h, b = 1; b < arguments.length; b++) i[b] = arguments[b];
                if (h.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, h) !== !1) {
                    for (g = ma.event.handlers.call(this, h, j), b = 0; (e = g[b++]) && !h.isPropagationStopped();) for (h.currentTarget = e.elem, c = 0; (f = e.handlers[c++]) && !h.isImmediatePropagationStopped();) h.rnamespace && !h.rnamespace.test(f.namespace) || (h.handleObj = f, h.data = f.data, d = ((ma.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, i), void 0 !== d && (h.result = d) === !1 && (h.preventDefault(), h.stopPropagation()));
                    return k.postDispatch && k.postDispatch.call(this, h), h.result
                }
            }, handlers: function (a, b) {
                var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
                if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1)) for (; i !== this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                    for (d = [], c = 0; c < h; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? ma(e, this).index(i) > -1 : ma.find(e, this, null, [i]).length), d[e] && d.push(f);
                    d.length && g.push({elem: i, handlers: d})
                }
                return h < b.length && g.push({elem: this, handlers: b.slice(h)}), g
            }, addProp: function (a, b) {
                Object.defineProperty(ma.Event.prototype, a, {
                    enumerable: !0,
                    configurable: !0,
                    get: ma.isFunction(b) ? function () {
                        if (this.originalEvent) return b(this.originalEvent)
                    } : function () {
                        if (this.originalEvent) return this.originalEvent[a]
                    },
                    set: function (b) {
                        Object.defineProperty(this, a, {enumerable: !0, configurable: !0, writable: !0, value: b})
                    }
                })
            }, fix: function (a) {
                return a[ma.expando] ? a : new ma.Event(a)
            }, special: {
                load: {noBubble: !0}, focus: {
                    trigger: function () {
                        if (this !== v() && this.focus) return this.focus(), !1
                    }, delegateType: "focusin"
                }, blur: {
                    trigger: function () {
                        if (this === v() && this.blur) return this.blur(), !1
                    }, delegateType: "focusout"
                }, click: {
                    trigger: function () {
                        if ("checkbox" === this.type && this.click && ma.nodeName(this, "input")) return this.click(), !1
                    }, _default: function (a) {
                        return ma.nodeName(a.target, "a")
                    }
                }, beforeunload: {
                    postDispatch: function (a) {
                        void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                    }
                }
            }
        }, ma.removeEvent = function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c)
        }, ma.Event = function (a, b) {
            return this instanceof ma.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? t : u,
                this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && ma.extend(this, b), this.timeStamp = a && a.timeStamp || ma.now(), void(this[ma.expando] = !0)) : new ma.Event(a, b)
        }, ma.Event.prototype = {
            constructor: ma.Event,
            isDefaultPrevented: u,
            isPropagationStopped: u,
            isImmediatePropagationStopped: u,
            isSimulated: !1,
            preventDefault: function () {
                var a = this.originalEvent;
                this.isDefaultPrevented = t, a && !this.isSimulated && a.preventDefault()
            },
            stopPropagation: function () {
                var a = this.originalEvent;
                this.isPropagationStopped = t, a && !this.isSimulated && a.stopPropagation()
            },
            stopImmediatePropagation: function () {
                var a = this.originalEvent;
                this.isImmediatePropagationStopped = t, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
            }
        }, ma.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            "char": !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function (a) {
                var b = a.button;
                return null == a.which && Xa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && Ya.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which
            }
        }, ma.event.addProp), ma.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (a, b) {
            ma.event.special[a] = {
                delegateType: b, bindType: b, handle: function (a) {
                    var c, d = this, e = a.relatedTarget, f = a.handleObj;
                    return e && (e === d || ma.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                }
            }
        }), ma.fn.extend({
            on: function (a, b, c, d) {
                return w(this, a, b, c, d)
            }, one: function (a, b, c, d) {
                return w(this, a, b, c, d, 1)
            }, off: function (a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj) return d = a.handleObj, ma(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                if ("object" == typeof a) {
                    for (e in a) this.off(e, b, a[e]);
                    return this
                }
                return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = u), this.each(function () {
                    ma.event.remove(this, a, c, b)
                })
            }
        });
        var $a = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            _a = /<script|<style|<link/i, ab = /checked\s*(?:[^=]|=\s*.checked.)/i, bb = /^true\/(.*)/,
            cb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        ma.extend({
            htmlPrefilter: function (a) {
                return a.replace($a, "<$1></$2>")
            }, clone: function (a, b, c) {
                var d, e, f, g, h = a.cloneNode(!0), i = ma.contains(a.ownerDocument, a);
                if (!(ka.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ma.isXMLDoc(a))) for (g = q(h), f = q(a), d = 0, e = f.length; d < e; d++) B(f[d], g[d]);
                if (b) if (c) for (f = f || q(a), g = g || q(h), d = 0, e = f.length; d < e; d++) A(f[d], g[d]); else A(a, h);
                return g = q(h, "script"), g.length > 0 && r(g, !i && q(a, "script")), h
            }, cleanData: function (a) {
                for (var b, c, d, e = ma.event.special, f = 0; void 0 !== (c = a[f]); f++) if (Ga(c)) {
                    if (b = c[Ha.expando]) {
                        if (b.events) for (d in b.events) e[d] ? ma.event.remove(c, d) : ma.removeEvent(c, d, b.handle);
                        c[Ha.expando] = void 0
                    }
                    c[Ia.expando] && (c[Ia.expando] = void 0)
                }
            }
        }), ma.fn.extend({
            detach: function (a) {
                return D(this, a, !0)
            }, remove: function (a) {
                return D(this, a)
            }, text: function (a) {
                return Fa(this, function (a) {
                    return void 0 === a ? ma.text(this) : this.empty().each(function () {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                    })
                }, null, a, arguments.length)
            }, append: function () {
                return C(this, arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = x(this, a);
                        b.appendChild(a)
                    }
                })
            }, prepend: function () {
                return C(this, arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = x(this, a);
                        b.insertBefore(a, b.firstChild)
                    }
                })
            }, before: function () {
                return C(this, arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this)
                })
            }, after: function () {
                return C(this, arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                })
            }, empty: function () {
                for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (ma.cleanData(q(a, !1)), a.textContent = "");
                return this
            }, clone: function (a, b) {
                return a = null != a && a, b = null == b ? a : b, this.map(function () {
                    return ma.clone(this, a, b)
                })
            }, html: function (a) {
                return Fa(this, function (a) {
                    var b = this[0] || {}, c = 0, d = this.length;
                    if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                    if ("string" == typeof a && !_a.test(a) && !Ua[(Sa.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = ma.htmlPrefilter(a);
                        try {
                            for (; c < d; c++) b = this[c] || {}, 1 === b.nodeType && (ma.cleanData(q(b, !1)), b.innerHTML = a);
                            b = 0
                        } catch (e) {
                        }
                    }
                    b && this.empty().append(a)
                }, null, a, arguments.length)
            }, replaceWith: function () {
                var a = [];
                return C(this, arguments, function (b) {
                    var c = this.parentNode;
                    ma.inArray(this, a) < 0 && (ma.cleanData(q(this)), c && c.replaceChild(b, this))
                }, a)
            }
        }), ma.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (a, b) {
            ma.fn[a] = function (a) {
                for (var c, d = [], e = ma(a), f = e.length - 1, g = 0; g <= f; g++) c = g === f ? this : this.clone(!0), ma(e[g])[b](c), da.apply(d, c.get());
                return this.pushStack(d)
            }
        });
        var db = /^margin/, eb = new RegExp("^(" + La + ")(?!px)[a-z%]+$", "i"), fb = function (b) {
            var c = b.ownerDocument.defaultView;
            return c && c.opener || (c = a), c.getComputedStyle(b)
        };
        !function () {
            function b() {
                if (h) {
                    h.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.innerHTML = "", Wa.appendChild(g);
                    var b = a.getComputedStyle(h);
                    c = "1%" !== b.top, f = "2px" === b.marginLeft, d = "4px" === b.width, h.style.marginRight = "50%", e = "4px" === b.marginRight, Wa.removeChild(g), h = null
                }
            }

            var c, d, e, f, g = _.createElement("div"), h = _.createElement("div");
            h.style && (h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", ka.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", g.appendChild(h), ma.extend(ka, {
                pixelPosition: function () {
                    return b(), c
                }, boxSizingReliable: function () {
                    return b(), d
                }, pixelMarginRight: function () {
                    return b(), e
                }, reliableMarginLeft: function () {
                    return b(), f
                }
            }))
        }();
        var gb = /^(none|table(?!-c[ea]).+)/, hb = {position: "absolute", visibility: "hidden", display: "block"},
            ib = {letterSpacing: "0", fontWeight: "400"}, jb = ["Webkit", "Moz", "ms"],
            kb = _.createElement("div").style;
        ma.extend({
            cssHooks: {
                opacity: {
                    get: function (a, b) {
                        if (b) {
                            var c = E(a, "opacity");
                            return "" === c ? "1" : c
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {"float": "cssFloat"},
            style: function (a, b, c, d) {
                if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var e, f, g, h = ma.camelCase(b), i = a.style;
                    return b = ma.cssProps[h] || (ma.cssProps[h] = G(h) || h), g = ma.cssHooks[b] || ma.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ma.exec(c)) && e[1] && (c = n(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (ma.cssNumber[h] ? "" : "px")), ka.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
                }
            },
            css: function (a, b, c, d) {
                var e, f, g, h = ma.camelCase(b);
                return b = ma.cssProps[h] || (ma.cssProps[h] = G(h) || h), g = ma.cssHooks[b] || ma.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = E(a, b, d)), "normal" === e && b in ib && (e = ib[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e
            }
        }), ma.each(["height", "width"], function (a, b) {
            ma.cssHooks[b] = {
                get: function (a, c, d) {
                    if (c) return !gb.test(ma.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? J(a, b, d) : Pa(a, hb, function () {
                        return J(a, b, d)
                    })
                }, set: function (a, c, d) {
                    var e, f = d && fb(a), g = d && I(a, b, d, "border-box" === ma.css(a, "boxSizing", !1, f), f);
                    return g && (e = Ma.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = ma.css(a, b)), H(a, c, g)
                }
            }
        }), ma.cssHooks.marginLeft = F(ka.reliableMarginLeft, function (a, b) {
            if (b) return (parseFloat(E(a, "marginLeft")) || a.getBoundingClientRect().left - Pa(a, {marginLeft: 0}, function () {
                return a.getBoundingClientRect().left
            })) + "px"
        }), ma.each({margin: "", padding: "", border: "Width"}, function (a, b) {
            ma.cssHooks[a + b] = {
                expand: function (c) {
                    for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + Na[d] + b] = f[d] || f[d - 2] || f[0];
                    return e
                }
            }, db.test(a) || (ma.cssHooks[a + b].set = H)
        }), ma.fn.extend({
            css: function (a, b) {
                return Fa(this, function (a, b, c) {
                    var d, e, f = {}, g = 0;
                    if (ma.isArray(b)) {
                        for (d = fb(a), e = b.length; g < e; g++) f[b[g]] = ma.css(a, b[g], !1, d);
                        return f
                    }
                    return void 0 !== c ? ma.style(a, b, c) : ma.css(a, b)
                }, a, b, arguments.length > 1)
            }
        }), ma.Tween = K, K.prototype = {
            constructor: K, init: function (a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || ma.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (ma.cssNumber[c] ? "" : "px")
            }, cur: function () {
                var a = K.propHooks[this.prop];
                return a && a.get ? a.get(this) : K.propHooks._default.get(this)
            }, run: function (a) {
                var b, c = K.propHooks[this.prop];
                return this.options.duration ? this.pos = b = ma.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : K.propHooks._default.set(this), this
            }
        }, K.prototype.init.prototype = K.prototype, K.propHooks = {
            _default: {
                get: function (a) {
                    var b;
                    return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = ma.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
                }, set: function (a) {
                    ma.fx.step[a.prop] ? ma.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[ma.cssProps[a.prop]] && !ma.cssHooks[a.prop] ? a.elem[a.prop] = a.now : ma.style(a.elem, a.prop, a.now + a.unit)
                }
            }
        }, K.propHooks.scrollTop = K.propHooks.scrollLeft = {
            set: function (a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }
        }, ma.easing = {
            linear: function (a) {
                return a
            }, swing: function (a) {
                return .5 - Math.cos(a * Math.PI) / 2
            }, _default: "swing"
        }, ma.fx = K.prototype.init, ma.fx.step = {};
        var lb, mb, nb = /^(?:toggle|show|hide)$/, ob = /queueHooks$/;
        ma.Animation = ma.extend(R, {
            tweeners: {
                "*": [function (a, b) {
                    var c = this.createTween(a, b);
                    return n(c.elem, a, Ma.exec(b), c), c
                }]
            }, tweener: function (a, b) {
                ma.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(Ca);
                for (var c, d = 0, e = a.length; d < e; d++) c = a[d], R.tweeners[c] = R.tweeners[c] || [], R.tweeners[c].unshift(b)
            }, prefilters: [P], prefilter: function (a, b) {
                b ? R.prefilters.unshift(a) : R.prefilters.push(a)
            }
        }), ma.speed = function (a, b, c) {
            var d = a && "object" == typeof a ? ma.extend({}, a) : {
                complete: c || !c && b || ma.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !ma.isFunction(b) && b
            };
            return ma.fx.off || _.hidden ? d.duration = 0 : d.duration = "number" == typeof d.duration ? d.duration : d.duration in ma.fx.speeds ? ma.fx.speeds[d.duration] : ma.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
                ma.isFunction(d.old) && d.old.call(this), d.queue && ma.dequeue(this, d.queue)
            }, d
        }, ma.fn.extend({
            fadeTo: function (a, b, c, d) {
                return this.filter(Oa).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
            }, animate: function (a, b, c, d) {
                var e = ma.isEmptyObject(a), f = ma.speed(b, c, d), g = function () {
                    var b = R(this, ma.extend({}, a), f);
                    (e || Ha.get(this, "finish")) && b.stop(!0)
                };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            }, stop: function (a, b, c) {
                var d = function (a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                    var b = !0, e = null != a && a + "queueHooks", f = ma.timers, g = Ha.get(this);
                    if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && ob.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    !b && c || ma.dequeue(this, a)
                })
            }, finish: function (a) {
                return a !== !1 && (a = a || "fx"), this.each(function () {
                    var b, c = Ha.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = ma.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, ma.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), ma.each(["toggle", "show", "hide"], function (a, b) {
            var c = ma.fn[b];
            ma.fn[b] = function (a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(N(b, !0), a, d, e)
            }
        }), ma.each({
            slideDown: N("show"),
            slideUp: N("hide"),
            slideToggle: N("toggle"),
            fadeIn: {opacity: "show"},
            fadeOut: {opacity: "hide"},
            fadeToggle: {opacity: "toggle"}
        }, function (a, b) {
            ma.fn[a] = function (a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), ma.timers = [], ma.fx.tick = function () {
            var a, b = 0, c = ma.timers;
            for (lb = ma.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
            c.length || ma.fx.stop(), lb = void 0
        }, ma.fx.timer = function (a) {
            ma.timers.push(a), a() ? ma.fx.start() : ma.timers.pop()
        }, ma.fx.interval = 13, ma.fx.start = function () {
            mb || (mb = a.requestAnimationFrame ? a.requestAnimationFrame(L) : a.setInterval(ma.fx.tick, ma.fx.interval))
        }, ma.fx.stop = function () {
            a.cancelAnimationFrame ? a.cancelAnimationFrame(mb) : a.clearInterval(mb), mb = null
        }, ma.fx.speeds = {slow: 600, fast: 200, _default: 400}, ma.fn.delay = function (b, c) {
            return b = ma.fx ? ma.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
                var e = a.setTimeout(c, b);
                d.stop = function () {
                    a.clearTimeout(e)
                }
            })
        }, function () {
            var a = _.createElement("input"), b = _.createElement("select"),
                c = b.appendChild(_.createElement("option"));
            a.type = "checkbox", ka.checkOn = "" !== a.value, ka.optSelected = c.selected, a = _.createElement("input"), a.value = "t", a.type = "radio", ka.radioValue = "t" === a.value
        }();
        var pb, qb = ma.expr.attrHandle;
        ma.fn.extend({
            attr: function (a, b) {
                return Fa(this, ma.attr, a, b, arguments.length > 1)
            }, removeAttr: function (a) {
                return this.each(function () {
                    ma.removeAttr(this, a)
                })
            }
        }), ma.extend({
            attr: function (a, b, c) {
                var d, e, f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? ma.prop(a, b, c) : (1 === f && ma.isXMLDoc(a) || (e = ma.attrHooks[b.toLowerCase()] || (ma.expr.match.bool.test(b) ? pb : void 0)), void 0 !== c ? null === c ? void ma.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = ma.find.attr(a, b), null == d ? void 0 : d))
            }, attrHooks: {
                type: {
                    set: function (a, b) {
                        if (!ka.radioValue && "radio" === b && ma.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                }
            }, removeAttr: function (a, b) {
                var c, d = 0, e = b && b.match(Ca);
                if (e && 1 === a.nodeType) for (; c = e[d++];) a.removeAttribute(c)
            }
        }), pb = {
            set: function (a, b, c) {
                return b === !1 ? ma.removeAttr(a, c) : a.setAttribute(c, c), c
            }
        }, ma.each(ma.expr.match.bool.source.match(/\w+/g), function (a, b) {
            var c = qb[b] || ma.find.attr;
            qb[b] = function (a, b, d) {
                var e, f, g = b.toLowerCase();
                return d || (f = qb[g], qb[g] = e, e = null != c(a, b, d) ? g : null, qb[g] = f), e
            }
        });
        var rb = /^(?:input|select|textarea|button)$/i, sb = /^(?:a|area)$/i;
        ma.fn.extend({
            prop: function (a, b) {
                return Fa(this, ma.prop, a, b, arguments.length > 1)
            }, removeProp: function (a) {
                return this.each(function () {
                    delete this[ma.propFix[a] || a]
                })
            }
        }), ma.extend({
            prop: function (a, b, c) {
                var d, e, f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f) return 1 === f && ma.isXMLDoc(a) || (b = ma.propFix[b] || b, e = ma.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
            }, propHooks: {
                tabIndex: {
                    get: function (a) {
                        var b = ma.find.attr(a, "tabindex");
                        return b ? parseInt(b, 10) : rb.test(a.nodeName) || sb.test(a.nodeName) && a.href ? 0 : -1
                    }
                }
            }, propFix: {"for": "htmlFor", "class": "className"}
        }), ka.optSelected || (ma.propHooks.selected = {
            get: function (a) {
                var b = a.parentNode;
                return b && b.parentNode && b.parentNode.selectedIndex, null
            }, set: function (a) {
                var b = a.parentNode;
                b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
            }
        }), ma.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            ma.propFix[this.toLowerCase()] = this
        });
        var tb = /[\t\r\n\f]/g;
        ma.fn.extend({
            addClass: function (a) {
                var b, c, d, e, f, g, h, i = 0;
                if (ma.isFunction(a)) return this.each(function (b) {
                    ma(this).addClass(a.call(this, b, S(this)))
                });
                if ("string" == typeof a && a) for (b = a.match(Ca) || []; c = this[i++];) if (e = S(c), d = 1 === c.nodeType && (" " + e + " ").replace(tb, " ")) {
                    for (g = 0; f = b[g++];) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                    h = ma.trim(d), e !== h && c.setAttribute("class", h)
                }
                return this
            }, removeClass: function (a) {
                var b, c, d, e, f, g, h, i = 0;
                if (ma.isFunction(a)) return this.each(function (b) {
                    ma(this).removeClass(a.call(this, b, S(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof a && a) for (b = a.match(Ca) || []; c = this[i++];) if (e = S(c), d = 1 === c.nodeType && (" " + e + " ").replace(tb, " ")) {
                    for (g = 0; f = b[g++];) for (; d.indexOf(" " + f + " ") > -1;) d = d.replace(" " + f + " ", " ");
                    h = ma.trim(d), e !== h && c.setAttribute("class", h)
                }
                return this
            }, toggleClass: function (a, b) {
                var c = typeof a;
                return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : ma.isFunction(a) ? this.each(function (c) {
                    ma(this).toggleClass(a.call(this, c, S(this), b), b)
                }) : this.each(function () {
                    var b, d, e, f;
                    if ("string" === c) for (d = 0, e = ma(this), f = a.match(Ca) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b); else void 0 !== a && "boolean" !== c || (b = S(this), b && Ha.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : Ha.get(this, "__className__") || ""))
                })
            }, hasClass: function (a) {
                var b, c, d = 0;
                for (b = " " + a + " "; c = this[d++];) if (1 === c.nodeType && (" " + S(c) + " ").replace(tb, " ").indexOf(b) > -1) return !0;
                return !1
            }
        });
        var ub = /\r/g, vb = /[\x20\t\r\n\f]+/g;
        ma.fn.extend({
            val: function (a) {
                var b, c, d, e = this[0];
                {
                    if (arguments.length) return d = ma.isFunction(a), this.each(function (c) {
                        var e;
                        1 === this.nodeType && (e = d ? a.call(this, c, ma(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : ma.isArray(e) && (e = ma.map(e, function (a) {
                            return null == a ? "" : a + ""
                        })), b = ma.valHooks[this.type] || ma.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                    });
                    if (e) return b = ma.valHooks[e.type] || ma.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ub, "") : null == c ? "" : c)
                }
            }
        }), ma.extend({
            valHooks: {
                option: {
                    get: function (a) {
                        var b = ma.find.attr(a, "value");
                        return null != b ? b : ma.trim(ma.text(a)).replace(vb, " ")
                    }
                }, select: {
                    get: function (a) {
                        for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type, g = f ? null : [], h = f ? e + 1 : d.length, i = e < 0 ? h : f ? e : 0; i < h; i++) if (c = d[i], (c.selected || i === e) && !c.disabled && (!c.parentNode.disabled || !ma.nodeName(c.parentNode, "optgroup"))) {
                            if (b = ma(c).val(), f) return b;
                            g.push(b)
                        }
                        return g
                    }, set: function (a, b) {
                        for (var c, d, e = a.options, f = ma.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = ma.inArray(ma.valHooks.option.get(d), f) > -1) && (c = !0);
                        return c || (a.selectedIndex = -1), f
                    }
                }
            }
        }), ma.each(["radio", "checkbox"], function () {
            ma.valHooks[this] = {
                set: function (a, b) {
                    if (ma.isArray(b)) return a.checked = ma.inArray(ma(a).val(), b) > -1
                }
            }, ka.checkOn || (ma.valHooks[this].get = function (a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        });
        var wb = /^(?:focusinfocus|focusoutblur)$/;
        ma.extend(ma.event, {
            trigger: function (b, c, d, e) {
                var f, g, h, i, j, k, l, m = [d || _], n = ha.call(b, "type") ? b.type : b,
                    o = ha.call(b, "namespace") ? b.namespace.split(".") : [];
                if (g = h = d = d || _, 3 !== d.nodeType && 8 !== d.nodeType && !wb.test(n + ma.event.triggered) && (n.indexOf(".") > -1 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[ma.expando] ? b : new ma.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : ma.makeArray(c, [b]), l = ma.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                    if (!e && !l.noBubble && !ma.isWindow(d)) {
                        for (i = l.delegateType || n, wb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                        h === (d.ownerDocument || _) && m.push(h.defaultView || h.parentWindow || a)
                    }
                    for (f = 0; (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (Ha.get(g, "events") || {})[b.type] && Ha.get(g, "handle"), k && k.apply(g, c), k = j && g[j], k && k.apply && Ga(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
                    return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !Ga(d) || j && ma.isFunction(d[n]) && !ma.isWindow(d) && (h = d[j], h && (d[j] = null), ma.event.triggered = n, d[n](), ma.event.triggered = void 0, h && (d[j] = h)), b.result
                }
            }, simulate: function (a, b, c) {
                var d = ma.extend(new ma.Event, c, {type: a, isSimulated: !0});
                ma.event.trigger(d, null, b)
            }
        }), ma.fn.extend({
            trigger: function (a, b) {
                return this.each(function () {
                    ma.event.trigger(a, b, this)
                })
            }, triggerHandler: function (a, b) {
                var c = this[0];
                if (c) return ma.event.trigger(a, b, c, !0)
            }
        }), ma.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) {
            ma.fn[b] = function (a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }
        }), ma.fn.extend({
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            }
        }), ka.focusin = "onfocusin" in a, ka.focusin || ma.each({focus: "focusin", blur: "focusout"}, function (a, b) {
            var c = function (a) {
                ma.event.simulate(b, a.target, ma.event.fix(a))
            };
            ma.event.special[b] = {
                setup: function () {
                    var d = this.ownerDocument || this, e = Ha.access(d, b);
                    e || d.addEventListener(a, c, !0), Ha.access(d, b, (e || 0) + 1)
                }, teardown: function () {
                    var d = this.ownerDocument || this, e = Ha.access(d, b) - 1;
                    e ? Ha.access(d, b, e) : (d.removeEventListener(a, c, !0), Ha.remove(d, b))
                }
            }
        });
        var xb = a.location, yb = ma.now(), zb = /\?/;
        ma.parseXML = function (b) {
            var c;
            if (!b || "string" != typeof b) return null;
            try {
                c = (new a.DOMParser).parseFromString(b, "text/xml")
            } catch (d) {
                c = void 0
            }
            return c && !c.getElementsByTagName("parsererror").length || ma.error("Invalid XML: " + b), c
        };
        var Ab = /\[\]$/, Bb = /\r?\n/g, Cb = /^(?:submit|button|image|reset|file)$/i,
            Db = /^(?:input|select|textarea|keygen)/i;
        ma.param = function (a, b) {
            var c, d = [], e = function (a, b) {
                var c = ma.isFunction(b) ? b() : b;
                d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c)
            };
            if (ma.isArray(a) || a.jquery && !ma.isPlainObject(a)) ma.each(a, function () {
                e(this.name, this.value)
            }); else for (c in a) T(c, a[c], b, e);
            return d.join("&")
        }, ma.fn.extend({
            serialize: function () {
                return ma.param(this.serializeArray())
            }, serializeArray: function () {
                return this.map(function () {
                    var a = ma.prop(this, "elements");
                    return a ? ma.makeArray(a) : this
                }).filter(function () {
                    var a = this.type;
                    return this.name && !ma(this).is(":disabled") && Db.test(this.nodeName) && !Cb.test(a) && (this.checked || !Ra.test(a))
                }).map(function (a, b) {
                    var c = ma(this).val();
                    return null == c ? null : ma.isArray(c) ? ma.map(c, function (a) {
                        return {name: b.name, value: a.replace(Bb, "\r\n")}
                    }) : {name: b.name, value: c.replace(Bb, "\r\n")}
                }).get()
            }
        });
        var Eb = /%20/g, Fb = /#.*$/, Gb = /([?&])_=[^&]*/, Hb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Ib = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Jb = /^(?:GET|HEAD)$/, Kb = /^\/\//,
            Lb = {}, Mb = {}, Nb = "*/".concat("*"), Ob = _.createElement("a");
        Ob.href = xb.href, ma.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: xb.href,
                type: "GET",
                isLocal: Ib.test(xb.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Nb,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                converters: {"* text": String, "text html": !0, "text json": JSON.parse, "text xml": ma.parseXML},
                flatOptions: {url: !0, context: !0}
            },
            ajaxSetup: function (a, b) {
                return b ? W(W(a, ma.ajaxSettings), b) : W(ma.ajaxSettings, a)
            },
            ajaxPrefilter: U(Lb),
            ajaxTransport: U(Mb),
            ajax: function (b, c) {
                function d(b, c, d, h) {
                    var j, m, n, u, v, w = c;
                    k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", x.readyState = b > 0 ? 4 : 0, j = b >= 200 && b < 300 || 304 === b, d && (u = X(o, x, d)), u = Y(o, u, x, j), j ? (o.ifModified && (v = x.getResponseHeader("Last-Modified"), v && (ma.lastModified[f] = v), v = x.getResponseHeader("etag"), v && (ma.etag[f] = v)), 204 === b || "HEAD" === o.type ? w = "nocontent" : 304 === b ? w = "notmodified" : (w = u.state, m = u.data, n = u.error, j = !n)) : (n = w, !b && w || (w = "error", b < 0 && (b = 0))), x.status = b, x.statusText = (c || w) + "", j ? r.resolveWith(p, [m, w, x]) : r.rejectWith(p, [x, w, n]), x.statusCode(t), t = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [x, o, j ? m : n]), s.fireWith(p, [x, w]), l && (q.trigger("ajaxComplete", [x, o]), --ma.active || ma.event.trigger("ajaxStop")))
                }

                "object" == typeof b && (c = b, b = void 0), c = c || {};
                var e, f, g, h, i, j, k, l, m, n, o = ma.ajaxSetup({}, c), p = o.context || o,
                    q = o.context && (p.nodeType || p.jquery) ? ma(p) : ma.event, r = ma.Deferred(),
                    s = ma.Callbacks("once memory"), t = o.statusCode || {}, u = {}, v = {}, w = "canceled", x = {
                        readyState: 0, getResponseHeader: function (a) {
                            var b;
                            if (k) {
                                if (!h) for (h = {}; b = Hb.exec(g);) h[b[1].toLowerCase()] = b[2];
                                b = h[a.toLowerCase()]
                            }
                            return null == b ? null : b
                        }, getAllResponseHeaders: function () {
                            return k ? g : null
                        }, setRequestHeader: function (a, b) {
                            return null == k && (a = v[a.toLowerCase()] = v[a.toLowerCase()] || a, u[a] = b), this
                        }, overrideMimeType: function (a) {
                            return null == k && (o.mimeType = a), this
                        }, statusCode: function (a) {
                            var b;
                            if (a) if (k) x.always(a[x.status]); else for (b in a) t[b] = [t[b], a[b]];
                            return this
                        }, abort: function (a) {
                            var b = a || w;
                            return e && e.abort(b), d(0, b), this
                        }
                    };
                if (r.promise(x), o.url = ((b || o.url || xb.href) + "").replace(Kb, xb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(Ca) || [""], null == o.crossDomain) {
                    j = _.createElement("a");
                    try {
                        j.href = o.url, j.href = j.href, o.crossDomain = Ob.protocol + "//" + Ob.host != j.protocol + "//" + j.host
                    } catch (y) {
                        o.crossDomain = !0
                    }
                }
                if (o.data && o.processData && "string" != typeof o.data && (o.data = ma.param(o.data, o.traditional)), V(Lb, o, c, x), k) return x;
                l = ma.event && o.global, l && 0 === ma.active++ && ma.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Jb.test(o.type), f = o.url.replace(Fb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Eb, "+")) : (n = o.url.slice(f.length), o.data && (f += (zb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(Gb, ""), n = (zb.test(f) ? "&" : "?") + "_=" + yb++ + n), o.url = f + n), o.ifModified && (ma.lastModified[f] && x.setRequestHeader("If-Modified-Since", ma.lastModified[f]), ma.etag[f] && x.setRequestHeader("If-None-Match", ma.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", o.contentType), x.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Nb + "; q=0.01" : "") : o.accepts["*"]);
                for (m in o.headers) x.setRequestHeader(m, o.headers[m]);
                if (o.beforeSend && (o.beforeSend.call(p, x, o) === !1 || k)) return x.abort();
                if (w = "abort", s.add(o.complete), x.done(o.success), x.fail(o.error), e = V(Mb, o, c, x)) {
                    if (x.readyState = 1, l && q.trigger("ajaxSend", [x, o]), k) return x;
                    o.async && o.timeout > 0 && (i = a.setTimeout(function () {
                        x.abort("timeout")
                    }, o.timeout));
                    try {
                        k = !1, e.send(u, d)
                    } catch (y) {
                        if (k) throw y;
                        d(-1, y)
                    }
                } else d(-1, "No Transport");
                return x
            },
            getJSON: function (a, b, c) {
                return ma.get(a, b, c, "json")
            },
            getScript: function (a, b) {
                return ma.get(a, void 0, b, "script")
            }
        }), ma.each(["get", "post"], function (a, b) {
            ma[b] = function (a, c, d, e) {
                return ma.isFunction(c) && (e = e || d, d = c, c = void 0), ma.ajax(ma.extend({
                    url: a,
                    type: b,
                    dataType: e,
                    data: c,
                    success: d
                }, ma.isPlainObject(a) && a))
            }
        }), ma._evalUrl = function (a) {
            return ma.ajax({url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0})
        }, ma.fn.extend({
            wrapAll: function (a) {
                var b;
                return this[0] && (ma.isFunction(a) && (a = a.call(this[0])), b = ma(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                    return a
                }).append(this)), this
            }, wrapInner: function (a) {
                return ma.isFunction(a) ? this.each(function (b) {
                    ma(this).wrapInner(a.call(this, b))
                }) : this.each(function () {
                    var b = ma(this), c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            }, wrap: function (a) {
                var b = ma.isFunction(a);
                return this.each(function (c) {
                    ma(this).wrapAll(b ? a.call(this, c) : a)
                })
            }, unwrap: function (a) {
                return this.parent(a).not("body").each(function () {
                    ma(this).replaceWith(this.childNodes)
                }), this
            }
        }), ma.expr.pseudos.hidden = function (a) {
            return !ma.expr.pseudos.visible(a)
        }, ma.expr.pseudos.visible = function (a) {
            return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
        }, ma.ajaxSettings.xhr = function () {
            try {
                return new a.XMLHttpRequest
            } catch (b) {
            }
        };
        var Pb = {0: 200, 1223: 204}, Qb = ma.ajaxSettings.xhr();
        ka.cors = !!Qb && "withCredentials" in Qb, ka.ajax = Qb = !!Qb, ma.ajaxTransport(function (b) {
            var c, d;
            if (ka.cors || Qb && !b.crossDomain) return {
                send: function (e, f) {
                    var g, h = b.xhr();
                    if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) h[g] = b.xhrFields[g];
                    b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    for (g in e) h.setRequestHeader(g, e[g]);
                    c = function (a) {
                        return function () {
                            c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Pb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {binary: h.response} : {text: h.responseText}, h.getAllResponseHeaders()))
                        }
                    }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () {
                        4 === h.readyState && a.setTimeout(function () {
                            c && d()
                        })
                    }, c = c("abort");
                    try {
                        h.send(b.hasContent && b.data || null)
                    } catch (i) {
                        if (c) throw i
                    }
                }, abort: function () {
                    c && c()
                }
            }
        }), ma.ajaxPrefilter(function (a) {
            a.crossDomain && (a.contents.script = !1)
        }), ma.ajaxSetup({
            accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
            contents: {script: /\b(?:java|ecma)script\b/},
            converters: {
                "text script": function (a) {
                    return ma.globalEval(a), a
                }
            }
        }), ma.ajaxPrefilter("script", function (a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
        }), ma.ajaxTransport("script", function (a) {
            if (a.crossDomain) {
                var b, c;
                return {
                    send: function (d, e) {
                        b = ma("<script>").prop({
                            charset: a.scriptCharset,
                            src: a.url
                        }).on("load error", c = function (a) {
                            b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                        }), _.head.appendChild(b[0])
                    }, abort: function () {
                        c && c()
                    }
                }
            }
        });
        var Rb = [], Sb = /(=)\?(?=&|$)|\?\?/;
        ma.ajaxSetup({
            jsonp: "callback", jsonpCallback: function () {
                var a = Rb.pop() || ma.expando + "_" + yb++;
                return this[a] = !0, a
            }
        }), ma.ajaxPrefilter("json jsonp", function (b, c, d) {
            var e, f, g,
                h = b.jsonp !== !1 && (Sb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Sb.test(b.data) && "data");
            if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = ma.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Sb, "$1" + e) : b.jsonp !== !1 && (b.url += (zb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
                return g || ma.error(e + " was not called"), g[0]
            }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
                g = arguments
            }, d.always(function () {
                void 0 === f ? ma(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Rb.push(e)), g && ma.isFunction(f) && f(g[0]), g = f = void 0
            }), "script"
        }), ka.createHTMLDocument = function () {
            var a = _.implementation.createHTMLDocument("").body;
            return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length
        }(), ma.parseHTML = function (a, b, c) {
            if ("string" != typeof a) return [];
            "boolean" == typeof b && (c = b, b = !1);
            var d, e, f;
            return b || (ka.createHTMLDocument ? (b = _.implementation.createHTMLDocument(""), d = b.createElement("base"), d.href = _.location.href, b.head.appendChild(d)) : b = _), e = va.exec(a), f = !c && [], e ? [b.createElement(e[1])] : (e = s([a], b, f), f && f.length && ma(f).remove(), ma.merge([], e.childNodes))
        }, ma.fn.load = function (a, b, c) {
            var d, e, f, g = this, h = a.indexOf(" ");
            return h > -1 && (d = ma.trim(a.slice(h)), a = a.slice(0, h)), ma.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && ma.ajax({
                url: a,
                type: e || "GET",
                dataType: "html",
                data: b
            }).done(function (a) {
                f = arguments, g.html(d ? ma("<div>").append(ma.parseHTML(a)).find(d) : a)
            }).always(c && function (a, b) {
                g.each(function () {
                    c.apply(this, f || [a.responseText, b, a])
                })
            }), this
        }, ma.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
            ma.fn[b] = function (a) {
                return this.on(b, a)
            }
        }), ma.expr.pseudos.animated = function (a) {
            return ma.grep(ma.timers, function (b) {
                return a === b.elem
            }).length
        }, ma.offset = {
            setOffset: function (a, b, c) {
                var d, e, f, g, h, i, j, k = ma.css(a, "position"), l = ma(a), m = {};
                "static" === k && (a.style.position = "relative"), h = l.offset(), f = ma.css(a, "top"), i = ma.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0),
                ma.isFunction(b) && (b = b.call(a, c, ma.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
            }
        }, ma.fn.extend({
            offset: function (a) {
                if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                    ma.offset.setOffset(this, a, b)
                });
                var b, c, d, e, f = this[0];
                if (f) return f.getClientRects().length ? (d = f.getBoundingClientRect(), d.width || d.height ? (e = f.ownerDocument, c = Z(e), b = e.documentElement, {
                    top: d.top + c.pageYOffset - b.clientTop,
                    left: d.left + c.pageXOffset - b.clientLeft
                }) : d) : {top: 0, left: 0}
            }, position: function () {
                if (this[0]) {
                    var a, b, c = this[0], d = {top: 0, left: 0};
                    return "fixed" === ma.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ma.nodeName(a[0], "html") || (d = a.offset()), d = {
                        top: d.top + ma.css(a[0], "borderTopWidth", !0),
                        left: d.left + ma.css(a[0], "borderLeftWidth", !0)
                    }), {
                        top: b.top - d.top - ma.css(c, "marginTop", !0),
                        left: b.left - d.left - ma.css(c, "marginLeft", !0)
                    }
                }
            }, offsetParent: function () {
                return this.map(function () {
                    for (var a = this.offsetParent; a && "static" === ma.css(a, "position");) a = a.offsetParent;
                    return a || Wa
                })
            }
        }), ma.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
            var c = "pageYOffset" === b;
            ma.fn[a] = function (d) {
                return Fa(this, function (a, d, e) {
                    var f = Z(a);
                    return void 0 === e ? f ? f[b] : a[d] : void(f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e)
                }, a, d, arguments.length)
            }
        }), ma.each(["top", "left"], function (a, b) {
            ma.cssHooks[b] = F(ka.pixelPosition, function (a, c) {
                if (c) return c = E(a, b), eb.test(c) ? ma(a).position()[b] + "px" : c
            })
        }), ma.each({Height: "height", Width: "width"}, function (a, b) {
            ma.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, d) {
                ma.fn[d] = function (e, f) {
                    var g = arguments.length && (c || "boolean" != typeof e),
                        h = c || (e === !0 || f === !0 ? "margin" : "border");
                    return Fa(this, function (b, c, e) {
                        var f;
                        return ma.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? ma.css(b, c, h) : ma.style(b, c, e, h)
                    }, b, g ? e : void 0, g)
                }
            })
        }), ma.fn.extend({
            bind: function (a, b, c) {
                return this.on(a, null, b, c)
            }, unbind: function (a, b) {
                return this.off(a, null, b)
            }, delegate: function (a, b, c, d) {
                return this.on(b, a, c, d)
            }, undelegate: function (a, b, c) {
                return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
            }
        }), ma.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function () {
            return ma
        });
        var Tb = a.jQuery, Ub = a.$;
        return ma.noConflict = function (b) {
            return a.$ === ma && (a.$ = Ub), b && a.jQuery === ma && (a.jQuery = Tb), ma
        }, b || (a.jQuery = a.$ = ma), ma
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b) if (void 0 !== a.style[c]) return {end: b[c]};
        return !1
    }

    a.fn.emulateTransitionEnd = function (b) {
        var c = !1, d = this;
        a(this).one("bsTransitionEnd", function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function (b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var c = a(this), e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }

    var c = '[data-dismiss="alert"]', d = function (b) {
        a(b).on("click", c, this.close)
    };
    d.VERSION = "3.2.0", d.prototype.close = function (b) {
        function c() {
            f.detach().trigger("closed.bs.alert").remove()
        }

        var d = a(this), e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", c).emulateTransitionEnd(150) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }

    var c = function (b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {loadingText: "loading..."}, c.prototype.setState = function (b) {
        var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), d[e](null == f[b] ? this.options[b] : f[b]), setTimeout(a.proxy(function () {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function () {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }

    var c = function (b, c) {
        this.$element = a(b).on("keydown.bs.carousel", a.proxy(this.keydown, this)), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {interval: 5e3, pause: "hover", wrap: !0}, c.prototype.keydown = function (a) {
        switch (a.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        a.preventDefault()
    }, c.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function (a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.to = function (b) {
        var c = this, d = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, c.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function (b, c) {
        var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval,
            g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]()
        }
        if (e.hasClass("active")) return this.sliding = !1;
        var j = e[0], k = a.Event("slide.bs.carousel", {relatedTarget: j, direction: g});
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, f && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(e)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {relatedTarget: j, direction: g});
            return a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one("bsTransitionEnd", function () {
                e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger(m)), f && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = d, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (c) {
        var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()), h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    }), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.collapse"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b);
            !e && f.toggle && "show" == b && (b = !b), e || d.data("bs.collapse", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {toggle: !0}, c.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, c.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var c = a.Event("show.bs.collapse");
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                var d = this.$parent && this.$parent.find("> .panel > .in");
                if (d && d.length) {
                    var e = d.data("bs.collapse");
                    if (e && e.transitioning) return;
                    b.call(d, "hide"), e || d.data("bs.collapse", null)
                }
                var f = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[f](0), this.transitioning = 1;
                var g = function () {
                    this.$element.removeClass("collapsing").addClass("collapse in")[f](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition) return g.call(this);
                var h = a.camelCase(["scroll", f].join("-"));
                this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h])
            }
        }
    }, c.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function () {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
            }
        }
    }, c.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var d = a.fn.collapse;
    a.fn.collapse = b, a.fn.collapse.Constructor = c, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = d, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (c) {
        var d, e = a(this),
            f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""),
            g = a(f), h = g.data("bs.collapse"), i = h ? "toggle" : e.data(), j = e.attr("data-parent"), k = j && a(j);
        h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"), e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), b.call(g, i)
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function () {
            var d = c(a(this)), e = {relatedTarget: this};
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
        }))
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function d(b) {
        return this.each(function () {
            var c = a(this), d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }

    var e = ".dropdown-backdrop", f = '[data-toggle="dropdown"]', g = function (b) {
        a(b).on("click.bs.dropdown", this.toggle)
    };
    g.VERSION = "3.2.0", g.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e), g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {relatedTarget: this};
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d), g = e.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.divider):visible a", i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ', [role="menu"], [role="listbox"]', g.prototype.keydown)
}(jQuery), +function (a) {
    "use strict";

    function b(b, d) {
        return this.each(function () {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }

    var c = function (b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0}, c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function (b) {
        var c = this, d = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(c.$body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {relatedTarget: b});
            d ? c.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                c.$element.trigger("focus").trigger(e)
            }).emulateTransitionEnd(300) : c.$element.trigger("focus").trigger(e)
        }))
    }, c.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, c.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function (b) {
        var c = this, d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            if (this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            e ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var f = function () {
                c.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f()
        } else b && b()
    }, c.prototype.checkScrollbar = function () {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
    }, c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "")
    }, c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
        var d = a(this), e = d.attr("href"), f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({remote: !/#/.test(e) && e}, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }

    var c = function (a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, c.prototype.init = function (b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function () {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show()
    }, c.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var c = a.contains(document.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !c) return;
            var d = this, e = this.tip(), f = this.getUID(this.type);
            this.setContent(), e.attr("id", f), this.$element.attr("aria-describedby", f), this.options.animation && e.addClass("fade");
            var g = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement,
                h = /\s?auto?\s?/i, i = h.test(g);
            i && (g = g.replace(h, "") || "top"), e.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(g).data("bs." + this.type, this), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element);
            var j = this.getPosition(), k = e[0].offsetWidth, l = e[0].offsetHeight;
            if (i) {
                var m = g, n = this.$element.parent(), o = this.getPosition(n);
                g = "bottom" == g && j.top + j.height + l - o.scroll > o.height ? "top" : "top" == g && j.top - o.scroll - l < 0 ? "bottom" : "right" == g && j.right + k > o.width ? "left" : "left" == g && j.left - k < o.left ? "right" : g, e.removeClass(m).addClass(g)
            }
            var p = this.getCalculatedOffset(g, j, k, l);
            this.applyPlacement(p, g);
            var q = function () {
                d.$element.trigger("shown.bs." + d.type), d.hoverState = null
            };
            a.support.transition && this.$tip.hasClass("fade") ? e.one("bsTransitionEnd", q).emulateTransitionEnd(150) : q()
        }
    }, c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function (a) {
                d.css({top: Math.round(a.top), left: Math.round(a.left)})
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j, m = k.left ? "left" : "top",
            n = k.left ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(l, d[0][n], m)
    }, c.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, c.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function () {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type)
        }

        var c = this, d = this.tip(), e = a.Event("hide.bs." + this.type);
        return this.$element.removeAttr("aria-describedby"), this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function () {
        return this.getTitle()
    }, c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var c = b[0], d = "BODY" == c.tagName;
        return a.extend({}, "function" == typeof c.getBoundingClientRect ? c.getBoundingClientRect() : null, {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop(),
            width: d ? a(window).width() : b.outerWidth(),
            height: d ? a(window).height() : b.outerHeight()
        }, d ? {top: 0, left: 0} : b.offset())
    }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = {top: 0, left: 0};
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll, i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f, k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function () {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function (a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function () {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, c.prototype.enable = function () {
        this.enabled = !0
    }, c.prototype.disable = function () {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function (b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function () {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = d, this
    }
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }

    var c = function (a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.2.0", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").empty()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, c.prototype.tip = function () {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
        return a.fn.popover = d, this
    }
}(jQuery), +function (a) {
    "use strict";

    function b(c, d) {
        var e = a.proxy(this.process, this);
        this.$body = a("body"), this.$scrollElement = a(a(c).is("body") ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }

    b.VERSION = "3.2.0", b.DEFAULTS = {offset: 10}, b.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function () {
        var b = "offset", c = 0;
        a.isWindow(this.$scrollElement[0]) || (b = "position", c = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var d = this;
        this.$body.find(this.selector).map(function () {
            var d = a(this), e = d.data("target") || d.attr("href"), f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [[f[b]().top + c, e]] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            d.offsets.push(this[0]), d.targets.push(this[1])
        })
    }, b.prototype.process = function () {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b) {
        this.element = a(b)
    };
    c.VERSION = "3.2.0", c.prototype.show = function () {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", {relatedTarget: e});
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.closest("li"), c), this.activate(g, g.parent(), function () {
                    b.trigger({type: "shown.bs.tab", relatedTarget: e})
                })
            }
        }
    }, c.prototype.activate = function (b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }

        var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
        g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
        return a.fn.tab = d, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (c) {
        c.preventDefault(), b.call(a(this), "show")
    })
}(jQuery), +function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }

    var c = function (b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.2.0", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(), b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b = a(document).height(), d = this.$target.scrollTop(), e = this.$element.offset(),
                f = this.options.offset, g = f.top, h = f.bottom;
            "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element));
            var i = !(null != this.unpin && d + this.unpin <= e.top) && (null != h && e.top + this.$element.height() >= b - h ? "bottom" : null != g && g >= d && "top");
            if (this.affixed !== i) {
                null != this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : ""), k = a.Event(j + ".bs.affix");
                this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({top: b - this.$element.height() - h}))
            }
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
        return a.fn.affix = d, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var c = a(this), d = c.data();
            d.offset = d.offset || {}, d.offsetBottom && (d.offset.bottom = d.offsetBottom), d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery), !function (a) {
    "use strict";

    function b(a, b) {
        return a + ".touchspin_" + b
    }

    function c(c, d) {
        return a.map(c, function (a) {
            return b(a, d)
        })
    }

    var d = 0;
    a.fn.TouchSpin = function (b) {
        if ("destroy" === b) return void this.each(function () {
            var b = a(this), d = b.data();
            a(document).off(c(["mouseup", "touchend", "touchcancel", "mousemove", "touchmove", "scroll", "scrollstart"], d.spinnerid).join(" "))
        });
        var e = {
            min: 0,
            max: 100,
            initval: "",
            step: 1,
            decimals: 0,
            stepinterval: 100,
            forcestepdivisibility: "round",
            stepintervaldelay: 500,
            verticalbuttons: !1,
            verticalupclass: "glyphicon glyphicon-chevron-up",
            verticaldownclass: "glyphicon glyphicon-chevron-down",
            prefix: "",
            postfix: "",
            prefix_extraclass: "",
            postfix_extraclass: "",
            booster: !0,
            boostat: 10,
            maxboostedstep: !1,
            mousewheel: !0,
            buttondown_class: "btn btn-default",
            buttonup_class: "btn btn-default",
            buttondown_txt: "-",
            buttonup_txt: "+"
        }, f = {
            min: "min",
            max: "max",
            initval: "init-val",
            step: "step",
            decimals: "decimals",
            stepinterval: "step-interval",
            verticalbuttons: "vertical-buttons",
            verticalupclass: "vertical-up-class",
            verticaldownclass: "vertical-down-class",
            forcestepdivisibility: "force-step-divisibility",
            stepintervaldelay: "step-interval-delay",
            prefix: "prefix",
            postfix: "postfix",
            prefix_extraclass: "prefix-extra-class",
            postfix_extraclass: "postfix-extra-class",
            booster: "booster",
            boostat: "boostat",
            maxboostedstep: "max-boosted-step",
            mousewheel: "mouse-wheel",
            buttondown_class: "button-down-class",
            buttonup_class: "button-up-class",
            buttondown_txt: "button-down-txt",
            buttonup_txt: "button-up-txt"
        };
        return this.each(function () {
            function g() {
                if (!J.data("alreadyinitialized")) {
                    if (J.data("alreadyinitialized", !0), d += 1, J.data("spinnerid", d), !J.is("input")) return void console.log("Must be an input.");
                    j(), h(), u(), m(), p(), q(), r(), s(), D.input.css("display", "block")
                }
            }

            function h() {
                "" !== B.initval && "" === J.val() && J.val(B.initval)
            }

            function i(a) {
                l(a), u();
                var b = D.input.val();
                "" !== b && (b = Number(D.input.val()), D.input.val(b.toFixed(B.decimals)))
            }

            function j() {
                B = a.extend({}, e, K, k(), b)
            }

            function k() {
                var b = {};
                return a.each(f, function (a, c) {
                    var d = "bts-" + c;
                    J.is("[data-" + d + "]") && (b[a] = J.data(d))
                }), b
            }

            function l(b) {
                B = a.extend({}, B, b)
            }

            function m() {
                var a = J.val(), b = J.parent();
                "" !== a && (a = Number(a).toFixed(B.decimals)), J.data("initvalue", a).val(a), J.addClass("form-control"), b.hasClass("input-group") ? n(b) : o()
            }

            function n(b) {
                b.addClass("bootstrap-touchspin");
                var c, d, e = J.prev(), f = J.next(),
                    g = '<span class="input-group-addon bootstrap-touchspin-prefix">' + B.prefix + "</span>",
                    h = '<span class="input-group-addon bootstrap-touchspin-postfix">' + B.postfix + "</span>";
                e.hasClass("input-group-btn") ? (c = '<button class="' + B.buttondown_class + ' bootstrap-touchspin-down" type="button">' + B.buttondown_txt + "</button>", e.append(c)) : (c = '<span class="input-group-btn"><button class="' + B.buttondown_class + ' bootstrap-touchspin-down" type="button">' + B.buttondown_txt + "</button></span>", a(c).insertBefore(J)), f.hasClass("input-group-btn") ? (d = '<button class="' + B.buttonup_class + ' bootstrap-touchspin-up" type="button">' + B.buttonup_txt + "</button>", f.prepend(d)) : (d = '<span class="input-group-btn"><button class="' + B.buttonup_class + ' bootstrap-touchspin-up" type="button">' + B.buttonup_txt + "</button></span>", a(d).insertAfter(J)), a(g).insertBefore(J), a(h).insertAfter(J), C = b
            }

            function o() {
                var b;
                b = B.verticalbuttons ? '<div class="input-group bootstrap-touchspin"><span class="input-group-addon bootstrap-touchspin-prefix">' + B.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + B.postfix + '</span><span class="input-group-btn-vertical"><button class="' + B.buttondown_class + ' bootstrap-touchspin-up" type="button"><i class="' + B.verticalupclass + '"></i></button><button class="' + B.buttonup_class + ' bootstrap-touchspin-down" type="button"><i class="' + B.verticaldownclass + '"></i></button></span></div>' : '<div class="input-group bootstrap-touchspin"><span class="input-group-btn"><button class="' + B.buttondown_class + ' bootstrap-touchspin-down" type="button">' + B.buttondown_txt + '</button></span><span class="input-group-addon bootstrap-touchspin-prefix">' + B.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + B.postfix + '</span><span class="input-group-btn"><button class="' + B.buttonup_class + ' bootstrap-touchspin-up" type="button">' + B.buttonup_txt + "</button></span></div>", C = a(b).insertBefore(J), a(".bootstrap-touchspin-prefix", C).after(J), J.hasClass("input-sm") ? C.addClass("input-group-sm") : J.hasClass("input-lg") && C.addClass("input-group-lg")
            }

            function p() {
                D = {
                    down: a(".bootstrap-touchspin-down", C),
                    up: a(".bootstrap-touchspin-up", C),
                    input: a("input", C),
                    prefix: a(".bootstrap-touchspin-prefix", C).addClass(B.prefix_extraclass),
                    postfix: a(".bootstrap-touchspin-postfix", C).addClass(B.postfix_extraclass)
                }
            }

            function q() {
                "" === B.prefix && D.prefix.hide(), "" === B.postfix && D.postfix.hide()
            }

            function r() {
                J.on("keydown", function (a) {
                    var b = a.keyCode || a.which;
                    38 === b ? ("up" !== M && (w(), z()), a.preventDefault()) : 40 === b && ("down" !== M && (x(), y()), a.preventDefault())
                }), J.on("keyup", function (a) {
                    var b = a.keyCode || a.which;
                    38 === b ? A() : 40 === b && A()
                }), J.on("blur", function () {
                    u()
                }), D.down.on("keydown", function (a) {
                    var b = a.keyCode || a.which;
                    (32 === b || 13 === b) && ("down" !== M && (x(), y()), a.preventDefault())
                }), D.down.on("keyup", function (a) {
                    var b = a.keyCode || a.which;
                    (32 === b || 13 === b) && A()
                }), D.up.on("keydown", function (a) {
                    var b = a.keyCode || a.which;
                    (32 === b || 13 === b) && ("up" !== M && (w(), z()), a.preventDefault())
                }), D.up.on("keyup", function (a) {
                    var b = a.keyCode || a.which;
                    (32 === b || 13 === b) && A()
                }), D.down.on("mousedown.touchspin", function (a) {
                    D.down.off("touchstart.touchspin"), J.is(":disabled") || (x(), y(), a.preventDefault(), a.stopPropagation())
                }), D.down.on("touchstart.touchspin", function (a) {
                    D.down.off("mousedown.touchspin"), J.is(":disabled") || (x(), y(), a.preventDefault(), a.stopPropagation())
                }), D.up.on("mousedown.touchspin", function (a) {
                    D.up.off("touchstart.touchspin"), J.is(":disabled") || (w(), z(), a.preventDefault(), a.stopPropagation())
                }), D.up.on("touchstart.touchspin", function (a) {
                    D.up.off("mousedown.touchspin"), J.is(":disabled") || (w(), z(), a.preventDefault(), a.stopPropagation())
                }), D.up.on("mouseout touchleave touchend touchcancel", function (a) {
                    M && (a.stopPropagation(), A())
                }), D.down.on("mouseout touchleave touchend touchcancel", function (a) {
                    M && (a.stopPropagation(), A())
                }), D.down.on("mousemove touchmove", function (a) {
                    M && (a.stopPropagation(), a.preventDefault())
                }), D.up.on("mousemove touchmove", function (a) {
                    M && (a.stopPropagation(), a.preventDefault())
                }), a(document).on(c(["mouseup", "touchend", "touchcancel"], d).join(" "), function (a) {
                    M && (a.preventDefault(), A())
                }), a(document).on(c(["mousemove", "touchmove", "scroll", "scrollstart"], d).join(" "), function (a) {
                    M && (a.preventDefault(), A())
                }), J.on("mousewheel DOMMouseScroll", function (a) {
                    if (B.mousewheel && J.is(":focus")) {
                        var b = a.originalEvent.wheelDelta || -a.originalEvent.deltaY || -a.originalEvent.detail;
                        a.stopPropagation(), a.preventDefault(), 0 > b ? x() : w()
                    }
                })
            }

            function s() {
                J.on("touchspin.uponce", function () {
                    A(), w()
                }), J.on("touchspin.downonce", function () {
                    A(), x()
                }), J.on("touchspin.startupspin", function () {
                    z()
                }), J.on("touchspin.startdownspin", function () {
                    y()
                }), J.on("touchspin.stopspin", function () {
                    A()
                }), J.on("touchspin.updatesettings", function (a, b) {
                    i(b)
                })
            }

            function t(a) {
                switch (B.forcestepdivisibility) {
                    case"round":
                        return (Math.round(a / B.step) * B.step).toFixed(B.decimals);
                    case"floor":
                        return (Math.floor(a / B.step) * B.step).toFixed(B.decimals);
                    case"ceil":
                        return (Math.ceil(a / B.step) * B.step).toFixed(B.decimals);
                    default:
                        return a
                }
            }

            function u() {
                var a, b, c;
                a = J.val(), "" !== a && (B.decimals > 0 && "." === a || (b = parseFloat(a), isNaN(b) && (b = 0), c = b, b.toString() !== a && (c = b), b < B.min && (c = B.min), b > B.max && (c = B.max), c = t(c), Number(a).toString() !== c.toString() && (J.val(c), J.trigger("change"))))
            }

            function v() {
                if (B.booster) {
                    var a = Math.pow(2, Math.floor(L / B.boostat)) * B.step;
                    return B.maxboostedstep && a > B.maxboostedstep && (a = B.maxboostedstep, E = Math.round(E / a) * a), Math.max(B.step, a)
                }
                return B.step
            }

            function w() {
                u(), E = parseFloat(D.input.val()), isNaN(E) && (E = 0);
                var a = E, b = v();
                E += b, E > B.max && (E = B.max, J.trigger("touchspin.on.max"), A()), D.input.val(Number(E).toFixed(B.decimals)), a !== E && J.trigger("change")
            }

            function x() {
                u(), E = parseFloat(D.input.val()), isNaN(E) && (E = 0);
                var a = E, b = v();
                E -= b, E < B.min && (E = B.min, J.trigger("touchspin.on.min"), A()), D.input.val(E.toFixed(B.decimals)), a !== E && J.trigger("change")
            }

            function y() {
                A(), L = 0, M = "down", J.trigger("touchspin.on.startspin"), J.trigger("touchspin.on.startdownspin"), H = setTimeout(function () {
                    F = setInterval(function () {
                        L++, x()
                    }, B.stepinterval)
                }, B.stepintervaldelay)
            }

            function z() {
                A(), L = 0, M = "up", J.trigger("touchspin.on.startspin"), J.trigger("touchspin.on.startupspin"), I = setTimeout(function () {
                    G = setInterval(function () {
                        L++, w()
                    }, B.stepinterval)
                }, B.stepintervaldelay)
            }

            function A() {
                switch (clearTimeout(H), clearTimeout(I), clearInterval(F), clearInterval(G), M) {
                    case"up":
                        J.trigger("touchspin.on.stopupspin"), J.trigger("touchspin.on.stopspin");
                        break;
                    case"down":
                        J.trigger("touchspin.on.stopdownspin"), J.trigger("touchspin.on.stopspin")
                }
                L = 0, M = !1
            }

            var B, C, D, E, F, G, H, I, J = a(this), K = J.data(), L = 0, M = !1;
            g()
        })
    }
}(jQuery), !function (a) {
    !function (a) {
        "use strict";

        function b() {
        }

        function c(a) {
            function c(b) {
                b.prototype.option || (b.prototype.option = function (b) {
                    a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
                })
            }

            function e(b, c) {
                a.fn[b] = function (e) {
                    if ("string" == typeof e) {
                        for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
                            var j = this[h], k = a.data(j, b);
                            if (k) if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                                var l = k[e].apply(k, g);
                                if (void 0 !== l && l !== k) return l
                            } else f("no such method '" + e + "' for " + b + " instance"); else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
                        }
                        return this
                    }
                    var m = this.map(function () {
                        var d = a.data(this, b);
                        return d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d)), a(this)
                    });
                    return !m || m.length > 1 ? m : m[0]
                }
            }

            if (a) {
                var f = "undefined" == typeof console ? b : function (a) {
                    console.error(a)
                };
                return a.bridget = function (a, b) {
                    c(b), e(a, b)
                }, a.bridget
            }
        }

        var d = Array.prototype.slice;
        c(a)
    }(a), function (a) {
        function b(b, c) {
            function d(a, b) {
                var c = "data-slider-" + b, d = a.getAttribute(c);
                try {
                    return JSON.parse(d)
                } catch (e) {
                    return d
                }
            }

            "string" == typeof b ? this.element = document.querySelector(b) : b instanceof HTMLElement && (this.element = b);
            var e, f, g, h = this.element.style.width, i = !1, j = this.element.parentNode;
            if (this.sliderElem) i = !0; else {
                this.sliderElem = document.createElement("div"), this.sliderElem.className = "slider";
                var k = document.createElement("div");
                k.className = "slider-track", e = document.createElement("div"), e.className = "slider-selection", f = document.createElement("div"), f.className = "slider-handle min-slider-handle", g = document.createElement("div"), g.className = "slider-handle max-slider-handle", k.appendChild(e), k.appendChild(f), k.appendChild(g);
                var l = function (a) {
                    var b = document.createElement("div");
                    b.className = "tooltip-arrow";
                    var c = document.createElement("div");
                    c.className = "tooltip-inner", a.appendChild(b), a.appendChild(c)
                }, m = document.createElement("div");
                m.className = "tooltip tooltip-main", l(m);
                var n = document.createElement("div");
                n.className = "tooltip tooltip-min", l(n);
                var o = document.createElement("div");
                o.className = "tooltip tooltip-max", l(o), this.sliderElem.appendChild(k), this.sliderElem.appendChild(m), this.sliderElem.appendChild(n), this.sliderElem.appendChild(o), j.insertBefore(this.sliderElem, this.element), this.element.style.display = "none"
            }
            a && (this.$element = a(this.element), this.$sliderElem = a(this.sliderElem)), c = c ? c : {};
            for (var p = Object.keys(this.defaultOptions), q = 0; q < p.length; q++) {
                var r = p[q], s = c[r];
                s = "undefined" != typeof s ? s : d(this.element, r), s = null !== s ? s : this.defaultOptions[r], this.options || (this.options = {}), this.options[r] = s
            }
            this.eventToCallbackMap = {}, this.sliderElem.id = this.options.id, this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, this.tooltip = this.sliderElem.querySelector(".tooltip-main"), this.tooltipInner = this.tooltip.querySelector(".tooltip-inner"), this.tooltip_min = this.sliderElem.querySelector(".tooltip-min"), this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner"), this.tooltip_max = this.sliderElem.querySelector(".tooltip-max"), this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner"), i === !0 && (this._removeClass(this.sliderElem, "slider-horizontal"), this._removeClass(this.sliderElem, "slider-vertical"), this._removeClass(this.tooltip, "hide"), this._removeClass(this.tooltip_min, "hide"), this._removeClass(this.tooltip_max, "hide"), ["left", "top", "width", "height"].forEach(function (a) {
                this._removeProperty(this.trackSelection, a)
            }, this), [this.handle1, this.handle2].forEach(function (a) {
                this._removeProperty(a, "left"), this._removeProperty(a, "top")
            }, this), [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function (a) {
                this._removeProperty(a, "left"), this._removeProperty(a, "top"), this._removeProperty(a, "margin-left"), this._removeProperty(a, "margin-top"), this._removeClass(a, "right"), this._removeClass(a, "top")
            }, this)), "vertical" === this.options.orientation ? (this._addClass(this.sliderElem, "slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight", this._addClass(this.tooltip, "right"), this.tooltip.style.left = "100%", this._addClass(this.tooltip_min, "right"), this.tooltip_min.style.left = "100%", this._addClass(this.tooltip_max, "right"), this.tooltip_max.style.left = "100%") : (this._addClass(this.sliderElem, "slider-horizontal"), this.sliderElem.style.width = h, this.options.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth", this._addClass(this.tooltip, "top"), this.tooltip.style.top = -this.tooltip.outerHeight - 14 + "px", this._addClass(this.tooltip_min, "top"), this.tooltip_min.style.top = -this.tooltip_min.outerHeight - 14 + "px", this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = -this.tooltip_max.outerHeight - 14 + "px"), this.options.value instanceof Array ? this.options.range = !0 : this.options.range && (this.options.value = [this.options.value, this.options.max]), this.trackSelection = e || this.trackSelection, "none" === this.options.selection && this._addClass(this.trackSelection, "hide"), this.handle1 = f || this.handle1, this.handle2 = g || this.handle2, i === !0 && (this._removeClass(this.handle1, "round triangle"), this._removeClass(this.handle2, "round triangle hide"));
            var t = ["round", "triangle", "custom"], u = -1 !== t.indexOf(this.options.handle);
            u && (this._addClass(this.handle1, this.options.handle), this._addClass(this.handle2, this.options.handle)), this.offset = this._offset(this.sliderElem), this.size = this.sliderElem[this.sizePos], this.setValue(this.options.value), this.handle1Keydown = this._keydown.bind(this, 0), this.handle1.addEventListener("keydown", this.handle1Keydown, !1), this.handle2Keydown = this._keydown.bind(this, 0), this.handle2.addEventListener("keydown", this.handle2Keydown, !1), this.touchCapable && (this.mousedown = this._mousedown.bind(this), this.sliderElem.addEventListener("touchstart", this.mousedown, !1)), this.mousedown = this._mousedown.bind(this), this.sliderElem.addEventListener("mousedown", this.mousedown, !1), "hide" === this.options.tooltip ? (this._addClass(this.tooltip, "hide"), this._addClass(this.tooltip_min, "hide"), this._addClass(this.tooltip_max, "hide")) : "always" === this.options.tooltip ? (this._showTooltip(), this._alwaysShowTooltip = !0) : (this.showTooltip = this._showTooltip.bind(this), this.hideTooltip = this._hideTooltip.bind(this), this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1), this.handle1.addEventListener("focus", this.showTooltip, !1), this.handle1.addEventListener("blur", this.hideTooltip, !1), this.handle2.addEventListener("focus", this.showTooltip, !1), this.handle2.addEventListener("blur", this.hideTooltip, !1)), this.options.enabled ? this.enable() : this.disable()
        }

        var c = {
            formatInvalidInputErrorMsg: function (a) {
                return "Invalid input value '" + a + "' passed in"
            },
            callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
        }, d = function (a, c) {
            return b.call(this, a, c), this
        };
        if (d.prototype = {
                _init: function () {
                },
                constructor: d,
                defaultOptions: {
                    id: "",
                    min: 0,
                    max: 10,
                    step: 1,
                    precision: 0,
                    orientation: "horizontal",
                    value: 5,
                    range: !1,
                    selection: "before",
                    tooltip: "show",
                    tooltip_split: !1,
                    handle: "round",
                    reversed: !1,
                    enabled: !0,
                    formatter: function (a) {
                        return a instanceof Array ? a[0] + " : " + a[1] : a
                    },
                    natural_arrow_keys: !1
                },
                over: !1,
                inDrag: !1,
                getValue: function () {
                    return this.options.range ? this.options.value : this.options.value[0]
                },
                setValue: function (a, b) {
                    a || (a = 0), this.options.value = this._validateInputValue(a);
                    var c = this._applyPrecision.bind(this);
                    this.options.range ? (this.options.value[0] = c(this.options.value[0]), this.options.value[1] = c(this.options.value[1]), this.options.value[0] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[0])), this.options.value[1] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[1]))) : (this.options.value = c(this.options.value), this.options.value = [Math.max(this.options.min, Math.min(this.options.max, this.options.value))], this._addClass(this.handle2, "hide"), this.options.value[1] = "after" === this.options.selection ? this.options.max : this.options.min), this.diff = this.options.max - this.options.min, this.percentage = this.diff > 0 ? [100 * (this.options.value[0] - this.options.min) / this.diff, 100 * (this.options.value[1] - this.options.min) / this.diff, 100 * this.options.step / this.diff] : [0, 0, 100], this._layout();
                    var d = this.options.range ? this.options.value : this.options.value[0];
                    return this._setDataVal(d), b === !0 && this._trigger("slide", d), this
                },
                destroy: function () {
                    this._removeSliderEventHandlers(), this.sliderElem.parentNode.removeChild(this.sliderElem), this.element.style.display = "", this._cleanUpEventCallbacksMap(), this.element.removeAttribute("data"), a && (this._unbindJQueryEventHandlers(), this.$element.removeData("slider"))
                },
                disable: function () {
                    return this.options.enabled = !1, this.handle1.removeAttribute("tabindex"), this.handle2.removeAttribute("tabindex"), this._addClass(this.sliderElem, "slider-disabled"), this._trigger("slideDisabled"), this
                },
                enable: function () {
                    return this.options.enabled = !0, this.handle1.setAttribute("tabindex", 0), this.handle2.setAttribute("tabindex", 0), this._removeClass(this.sliderElem, "slider-disabled"), this._trigger("slideEnabled"), this
                },
                toggle: function () {
                    return this.options.enabled ? this.disable() : this.enable(), this
                },
                isEnabled: function () {
                    return this.options.enabled
                },
                on: function (b, c) {
                    return a ? (this.$element.on(b, c), this.$sliderElem.on(b, c)) : this._bindNonQueryEventHandler(b, c), this
                },
                getAttribute: function (a) {
                    return a ? this.options[a] : this.options
                },
                setAttribute: function (a, b) {
                    return this.options[a] = b, this
                },
                refresh: function () {
                    return this._removeSliderEventHandlers(), b.call(this, this.element, this.options), a && a.data(this.element, "slider", this), this
                },
                _removeSliderEventHandlers: function () {
                    this.handle1.removeEventListener("keydown", this.handle1Keydown, !1), this.handle1.removeEventListener("focus", this.showTooltip, !1), this.handle1.removeEventListener("blur", this.hideTooltip, !1), this.handle2.removeEventListener("keydown", this.handle2Keydown, !1), this.handle2.removeEventListener("focus", this.handle2Keydown, !1), this.handle2.removeEventListener("blur", this.handle2Keydown, !1), this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1), this.sliderElem.removeEventListener("touchstart", this.mousedown, !1), this.sliderElem.removeEventListener("mousedown", this.mousedown, !1)
                },
                _bindNonQueryEventHandler: function (a, b) {
                    void 0 === this.eventToCallbackMap[a] && (this.eventToCallbackMap[a] = []), this.eventToCallbackMap[a].push(b)
                },
                _cleanUpEventCallbacksMap: function () {
                    for (var a = Object.keys(this.eventToCallbackMap), b = 0; b < a.length; b++) {
                        var c = a[b];
                        this.eventToCallbackMap[c] = null
                    }
                },
                _showTooltip: function () {
                    this.options.tooltip_split === !1 ? this._addClass(this.tooltip, "in") : (this._addClass(this.tooltip_min, "in"), this._addClass(this.tooltip_max, "in")), this.over = !0
                },
                _hideTooltip: function () {
                    this.inDrag === !1 && this.alwaysShowTooltip !== !0 && (this._removeClass(this.tooltip, "in"), this._removeClass(this.tooltip_min, "in"), this._removeClass(this.tooltip_max, "in")), this.over = !1
                },
                _layout: function () {
                    var a;
                    if (a = this.options.reversed ? [100 - this.percentage[0], this.percentage[1]] : [this.percentage[0], this.percentage[1]], this.handle1.style[this.stylePos] = a[0] + "%", this.handle2.style[this.stylePos] = a[1] + "%", "vertical" === this.options.orientation) this.trackSelection.style.top = Math.min(a[0], a[1]) + "%", this.trackSelection.style.height = Math.abs(a[0] - a[1]) + "%"; else {
                        this.trackSelection.style.left = Math.min(a[0], a[1]) + "%", this.trackSelection.style.width = Math.abs(a[0] - a[1]) + "%";
                        var b = this.tooltip_min.getBoundingClientRect(), c = this.tooltip_max.getBoundingClientRect();
                        b.right > c.left ? (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = "18px") : (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = "-30px")
                    }
                    var d;
                    if (this.options.range) {
                        d = this.options.formatter(this.options.value), this._setText(this.tooltipInner, d), this.tooltip.style[this.stylePos] = (a[1] + a[0]) / 2 + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px"), "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px");
                        var e = this.options.formatter(this.options.value[0]);
                        this._setText(this.tooltipInner_min, e);
                        var f = this.options.formatter(this.options.value[1]);
                        this._setText(this.tooltipInner_max, f), this.tooltip_min.style[this.stylePos] = a[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_min, "margin-top", -this.tooltip_min.offsetHeight / 2 + "px") : this._css(this.tooltip_min, "margin-left", -this.tooltip_min.offsetWidth / 2 + "px"), this.tooltip_max.style[this.stylePos] = a[1] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_max, "margin-top", -this.tooltip_max.offsetHeight / 2 + "px") : this._css(this.tooltip_max, "margin-left", -this.tooltip_max.offsetWidth / 2 + "px")
                    } else d = this.options.formatter(this.options.value[0]), this._setText(this.tooltipInner, d), this.tooltip.style[this.stylePos] = a[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px")
                },
                _removeProperty: function (a, b) {
                    a.style.removeProperty ? a.style.removeProperty(b) : a.style.removeAttribute(b)
                },
                _mousedown: function (a) {
                    if (!this.options.enabled) return !1;
                    this._triggerFocusOnHandle(), this.offset = this._offset(this.sliderElem), this.size = this.sliderElem[this.sizePos];
                    var b = this._getPercentage(a);
                    if (this.options.range) {
                        var c = Math.abs(this.percentage[0] - b), d = Math.abs(this.percentage[1] - b);
                        this.dragged = d > c ? 0 : 1
                    } else this.dragged = 0;
                    this.percentage[this.dragged] = this.options.reversed ? 100 - b : b, this._layout(), this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), this.mousemove && document.removeEventListener("mousemove", this.mousemove, !1), this.mouseup && document.removeEventListener("mouseup", this.mouseup, !1), this.mousemove = this._mousemove.bind(this), this.mouseup = this._mouseup.bind(this), this.touchCapable && (document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)), document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), this.inDrag = !0;
                    var e = this._calculateValue();
                    return this._trigger("slideStart", e), this._setDataVal(e), this.setValue(e), this._pauseEvent(a), !0
                },
                _triggerFocusOnHandle: function (a) {
                    0 === a && this.handle1.focus(), 1 === a && this.handle2.focus()
                },
                _keydown: function (a, b) {
                    if (!this.options.enabled) return !1;
                    var c;
                    switch (b.keyCode) {
                        case 37:
                        case 40:
                            c = -1;
                            break;
                        case 39:
                        case 38:
                            c = 1
                    }
                    if (c) {
                        if (this.options.natural_arrow_keys) {
                            var d = "vertical" === this.options.orientation && !this.options.reversed,
                                e = "horizontal" === this.options.orientation && this.options.reversed;
                            (d || e) && (c = -1 * c)
                        }
                        var f = c * this.percentage[2], g = this.percentage[a] + f;
                        g > 100 ? g = 100 : 0 > g && (g = 0), this.dragged = a, this._adjustPercentageForRangeSliders(g), this.percentage[this.dragged] = g, this._layout();
                        var h = this._calculateValue();
                        return this._trigger("slideStart", h), this._setDataVal(h), this.setValue(h, !0), this._trigger("slideStop", h), this._setDataVal(h), this._pauseEvent(b), !1
                    }
                },
                _pauseEvent: function (a) {
                    a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault(), a.cancelBubble = !0, a.returnValue = !1
                },
                _mousemove: function (a) {
                    if (!this.options.enabled) return !1;
                    var b = this._getPercentage(a);
                    this._adjustPercentageForRangeSliders(b), this.percentage[this.dragged] = this.options.reversed ? 100 - b : b, this._layout();
                    var c = this._calculateValue();
                    return this.setValue(c, !0), !1
                },
                _adjustPercentageForRangeSliders: function (a) {
                    this.options.range && (0 === this.dragged && this.percentage[1] < a ? (this.percentage[0] = this.percentage[1], this.dragged = 1) : 1 === this.dragged && this.percentage[0] > a && (this.percentage[1] = this.percentage[0], this.dragged = 0))
                },
                _mouseup: function () {
                    if (!this.options.enabled) return !1;
                    this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), document.removeEventListener("mousemove", this.mousemove, !1), document.removeEventListener("mouseup", this.mouseup, !1), this.inDrag = !1, this.over === !1 && this._hideTooltip();
                    var a = this._calculateValue();
                    return this._layout(), this._setDataVal(a), this._trigger("slideStop", a), !1
                },
                _calculateValue: function () {
                    var a;
                    return this.options.range ? (a = [this.options.min, this.options.max], 0 !== this.percentage[0] && (a[0] = Math.max(this.options.min, this.options.min + Math.round(this.diff * this.percentage[0] / 100 / this.options.step) * this.options.step), a[0] = this._applyPrecision(a[0])), 100 !== this.percentage[1] && (a[1] = Math.min(this.options.max, this.options.min + Math.round(this.diff * this.percentage[1] / 100 / this.options.step) * this.options.step), a[1] = this._applyPrecision(a[1])), this.options.value = a) : (a = this.options.min + Math.round(this.diff * this.percentage[0] / 100 / this.options.step) * this.options.step, a < this.options.min ? a = this.options.min : a > this.options.max && (a = this.options.max), a = parseFloat(a), a = this._applyPrecision(a), this.options.value = [a, this.options.value[1]]), a
                },
                _applyPrecision: function (a) {
                    var b = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
                    return this._applyToFixedAndParseFloat(a, b)
                },
                _getNumDigitsAfterDecimalPlace: function (a) {
                    var b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                    return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
                },
                _applyToFixedAndParseFloat: function (a, b) {
                    var c = a.toFixed(b);
                    return parseFloat(c)
                },
                _getPercentage: function (a) {
                    !this.touchCapable || "touchstart" !== a.type && "touchmove" !== a.type || (a = a.touches[0]);
                    var b = 100 * (a[this.mousePos] - this.offset[this.stylePos]) / this.size;
                    return b = Math.round(b / this.percentage[2]) * this.percentage[2], Math.max(0, Math.min(100, b))
                },
                _validateInputValue: function (a) {
                    if ("number" == typeof a) return a;
                    if (a instanceof Array) return this._validateArray(a), a;
                    throw new Error(c.formatInvalidInputErrorMsg(a))
                },
                _validateArray: function (a) {
                    for (var b = 0; b < a.length; b++) {
                        var d = a[b];
                        if ("number" != typeof d) throw new Error(c.formatInvalidInputErrorMsg(d))
                    }
                },
                _setDataVal: function (a) {
                    var b = "value: '" + a + "'";
                    this.element.setAttribute("data", b), this.element.setAttribute("value", a)
                },
                _trigger: function (b, c) {
                    c = c || 0 === c ? c : void 0;
                    var d = this.eventToCallbackMap[b];
                    if (d && d.length) for (var e = 0; e < d.length; e++) {
                        var f = d[e];
                        f(c)
                    }
                    a && this._triggerJQueryEvent(b, c)
                },
                _triggerJQueryEvent: function (a, b) {
                    var c = {type: a, value: b};
                    this.$element.trigger(c), this.$sliderElem.trigger(c)
                },
                _unbindJQueryEventHandlers: function () {
                    this.$element.off(), this.$sliderElem.off()
                },
                _setText: function (a, b) {
                    "undefined" != typeof a.innerText ? a.innerText = b : "undefined" != typeof a.textContent && (a.textContent = b)
                },
                _removeClass: function (a, b) {
                    for (var c = b.split(" "), d = a.className, e = 0; e < c.length; e++) {
                        var f = c[e], g = new RegExp("(?:\\s|^)" + f + "(?:\\s|$)");
                        d = d.replace(g, " ")
                    }
                    a.className = d.trim()
                },
                _addClass: function (a, b) {
                    for (var c = b.split(" "), d = a.className, e = 0; e < c.length; e++) {
                        var f = c[e], g = new RegExp("(?:\\s|^)" + f + "(?:\\s|$)"), h = g.test(d);
                        h || (d += " " + f)
                    }
                    a.className = d.trim()
                },
                _offset: function (a) {
                    var b = 0, c = 0;
                    if (a.offsetParent) do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
                    return {left: b, top: c}
                },
                _css: function (a, b, c) {
                    a.style[b] = c
                }
            }, a) {
            var e = a.fn.slider ? "bootstrapSlider" : "slider";
            a.bridget(e, d)
        } else window.Slider = d
    }(a)
}(window.jQuery), !function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    "use strict";

    function b(b, c) {
        var d, e, f, g, h, j = a('<div class="minicolors" />'), k = a.minicolors.defaults;
        if (!b.data("minicolors-initialized")) {
            if (c = a.extend(!0, {}, k, c), j.addClass("minicolors-theme-" + c.theme).toggleClass("minicolors-with-opacity", c.opacity).toggleClass("minicolors-no-data-uris", c.dataUris !== !0), void 0 !== c.position && a.each(c.position.split(" "), function () {
                    j.addClass("minicolors-position-" + this)
                }), d = "rgb" === c.format ? c.opacity ? "25" : "20" : c.keywords ? "11" : "7", b.addClass("minicolors-input").data("minicolors-initialized", !1).data("minicolors-settings", c).prop("size", d).wrap(j).after('<div class="minicolors-panel minicolors-slider-' + c.control + '"><div class="minicolors-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-opacity-slider minicolors-sprite"><div class="minicolors-picker"></div></div><div class="minicolors-grid minicolors-sprite"><div class="minicolors-grid-inner"></div><div class="minicolors-picker"><div></div></div></div></div>'), c.inline || (b.after('<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch"><span class="minicolors-swatch-color"></span></span>'), b.next(".minicolors-input-swatch").on("click", function (a) {
                    a.preventDefault(), b.focus()
                })), g = b.parent().find(".minicolors-panel"), g.on("selectstart", function () {
                    return !1
                }).end(), c.swatches && 0 !== c.swatches.length) for (c.swatches.length > 7 && (c.swatches.length = 7), g.addClass("minicolors-with-swatches"), e = a('<ul class="minicolors-swatches"></ul>').appendTo(g), h = 0; h < c.swatches.length; ++h) f = c.swatches[h], f = r(f) ? o(f, !0) : z(n(f, !0)), a('<li class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></li>').appendTo(e).data("swatch-color", c.swatches[h]).find(".minicolors-swatch-color").css({
                backgroundColor: v(f),
                opacity: f.a
            }), c.swatches[h] = f;
            c.inline && b.parent().addClass("minicolors-inline"), i(b, !1), b.data("minicolors-initialized", !0)
        }
    }

    function c(a) {
        var b = a.parent();
        a.removeData("minicolors-initialized").removeData("minicolors-settings").removeProp("size").removeClass("minicolors-input"), b.before(a).remove()
    }

    function d(a) {
        var b = a.parent(), c = b.find(".minicolors-panel"), d = a.data("minicolors-settings");
        !a.data("minicolors-initialized") || a.prop("disabled") || b.hasClass("minicolors-inline") || b.hasClass("minicolors-focus") || (e(), b.addClass("minicolors-focus"), c.stop(!0, !0).fadeIn(d.showSpeed, function () {
            d.show && d.show.call(a.get(0))
        }))
    }

    function e() {
        a(".minicolors-focus").each(function () {
            var b = a(this), c = b.find(".minicolors-input"), d = b.find(".minicolors-panel"),
                e = c.data("minicolors-settings");
            d.fadeOut(e.hideSpeed, function () {
                e.hide && e.hide.call(c.get(0)), b.removeClass("minicolors-focus")
            })
        })
    }

    function f(a, b, c) {
        var d, e, f, h, i = a.parents(".minicolors").find(".minicolors-input"), j = i.data("minicolors-settings"),
            k = a.find("[class$=-picker]"), l = a.offset().left, m = a.offset().top, n = Math.round(b.pageX - l),
            o = Math.round(b.pageY - m), p = c ? j.animationSpeed : 0;
        b.originalEvent.changedTouches && (n = b.originalEvent.changedTouches[0].pageX - l, o = b.originalEvent.changedTouches[0].pageY - m), 0 > n && (n = 0), 0 > o && (o = 0), n > a.width() && (n = a.width()), o > a.height() && (o = a.height()), a.parent().is(".minicolors-slider-wheel") && k.parent().is(".minicolors-grid") && (d = 75 - n, e = 75 - o, f = Math.sqrt(d * d + e * e), h = Math.atan2(e, d), 0 > h && (h += 2 * Math.PI), f > 75 && (f = 75, n = 75 - 75 * Math.cos(h), o = 75 - 75 * Math.sin(h)), n = Math.round(n), o = Math.round(o)), a.is(".minicolors-grid") ? k.stop(!0).animate({
            top: o + "px",
            left: n + "px"
        }, p, j.animationEasing, function () {
            g(i, a)
        }) : k.stop(!0).animate({top: o + "px"}, p, j.animationEasing, function () {
            g(i, a)
        })
    }

    function g(a, b) {
        function c(a, b) {
            var c, d;
            return a.length && b ? (c = a.offset().left, d = a.offset().top, {
                x: c - b.offset().left + a.outerWidth() / 2,
                y: d - b.offset().top + a.outerHeight() / 2
            }) : null
        }

        var d, e, f, g, i, k, l, m = a.val(), n = a.attr("data-opacity"), o = a.parent(),
            p = a.data("minicolors-settings"), r = o.find(".minicolors-input-swatch"), s = o.find(".minicolors-grid"),
            t = o.find(".minicolors-slider"), u = o.find(".minicolors-opacity-slider"), v = s.find("[class$=-picker]"),
            x = t.find("[class$=-picker]"), y = u.find("[class$=-picker]"), z = c(v, s), A = c(x, t), B = c(y, u);
        if (b.is(".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider")) {
            switch (p.control) {
                case"wheel":
                    g = s.width() / 2 - z.x, i = s.height() / 2 - z.y, k = Math.sqrt(g * g + i * i), l = Math.atan2(i, g), 0 > l && (l += 2 * Math.PI), k > 75 && (k = 75, z.x = 69 - 75 * Math.cos(l), z.y = 69 - 75 * Math.sin(l)), e = q(k / .75, 0, 100), d = q(180 * l / Math.PI, 0, 360), f = q(100 - Math.floor(A.y * (100 / t.height())), 0, 100), m = w({
                        h: d,
                        s: e,
                        b: f
                    }), t.css("backgroundColor", w({h: d, s: e, b: 100}));
                    break;
                case"saturation":
                    d = q(parseInt(z.x * (360 / s.width()), 10), 0, 360), e = q(100 - Math.floor(A.y * (100 / t.height())), 0, 100), f = q(100 - Math.floor(z.y * (100 / s.height())), 0, 100), m = w({
                        h: d,
                        s: e,
                        b: f
                    }), t.css("backgroundColor", w({
                        h: d,
                        s: 100,
                        b: f
                    })), o.find(".minicolors-grid-inner").css("opacity", e / 100);
                    break;
                case"brightness":
                    d = q(parseInt(z.x * (360 / s.width()), 10), 0, 360), e = q(100 - Math.floor(z.y * (100 / s.height())), 0, 100), f = q(100 - Math.floor(A.y * (100 / t.height())), 0, 100), m = w({
                        h: d,
                        s: e,
                        b: f
                    }), t.css("backgroundColor", w({
                        h: d,
                        s: e,
                        b: 100
                    })), o.find(".minicolors-grid-inner").css("opacity", 1 - f / 100);
                    break;
                default:
                    d = q(360 - parseInt(A.y * (360 / t.height()), 10), 0, 360), e = q(Math.floor(z.x * (100 / s.width())), 0, 100), f = q(100 - Math.floor(z.y * (100 / s.height())), 0, 100), m = w({
                        h: d,
                        s: e,
                        b: f
                    }), s.css("backgroundColor", w({h: d, s: 100, b: 100}))
            }
            n = p.opacity ? parseFloat(1 - B.y / u.height()).toFixed(2) : 1, h(a, m, n)
        } else r.find("span").css({backgroundColor: m, opacity: n}), j(a, m, n)
    }

    function h(a, b, c) {
        var d, e = a.parent(), f = a.data("minicolors-settings"), g = e.find(".minicolors-input-swatch");
        f.opacity && a.attr("data-opacity", c), "rgb" === f.format ? (d = r(b) ? o(b, !0) : z(n(b, !0)), c = "" === a.attr("data-opacity") ? 1 : q(parseFloat(a.attr("data-opacity")).toFixed(2), 0, 1), (isNaN(c) || !f.opacity) && (c = 1), b = a.minicolors("rgbObject").a <= 1 && d && f.opacity ? "rgba(" + d.r + ", " + d.g + ", " + d.b + ", " + parseFloat(c) + ")" : "rgb(" + d.r + ", " + d.g + ", " + d.b + ")") : (r(b) && (b = u(b)), b = m(b, f.letterCase)), a.val(b), g.find("span").css({
            backgroundColor: b,
            opacity: c
        }), j(a, b, c)
    }

    function i(b, c) {
        var d, e, f, g, h, i, k, l, t, v, y = b.parent(), z = b.data("minicolors-settings"),
            A = y.find(".minicolors-input-swatch"), B = y.find(".minicolors-grid"), C = y.find(".minicolors-slider"),
            D = y.find(".minicolors-opacity-slider"), E = B.find("[class$=-picker]"), F = C.find("[class$=-picker]"),
            G = D.find("[class$=-picker]");
        switch (r(b.val()) ? (d = u(b.val()), h = q(parseFloat(s(b.val())).toFixed(2), 0, 1), h && b.attr("data-opacity", h)) : d = m(n(b.val(), !0), z.letterCase), d || (d = m(p(z.defaultValue, !0), z.letterCase)), e = x(d), g = z.keywords ? a.map(z.keywords.split(","), function (b) {
            return a.trim(b.toLowerCase())
        }) : [], i = "" !== b.val() && a.inArray(b.val().toLowerCase(), g) > -1 ? m(b.val()) : r(b.val()) ? o(b.val()) : d, c || b.val(i), z.opacity && (f = "" === b.attr("data-opacity") ? 1 : q(parseFloat(b.attr("data-opacity")).toFixed(2), 0, 1), isNaN(f) && (f = 1), b.attr("data-opacity", f), A.find("span").css("opacity", f), l = q(D.height() - D.height() * f, 0, D.height()), G.css("top", l + "px")), "transparent" === b.val().toLowerCase() && A.find("span").css("opacity", 0), A.find("span").css("backgroundColor", d), z.control) {
            case"wheel":
                t = q(Math.ceil(.75 * e.s), 0, B.height() / 2), v = e.h * Math.PI / 180, k = q(75 - Math.cos(v) * t, 0, B.width()), l = q(75 - Math.sin(v) * t, 0, B.height()), E.css({
                    top: l + "px",
                    left: k + "px"
                }), l = 150 - e.b / (100 / B.height()), "" === d && (l = 0), F.css("top", l + "px"), C.css("backgroundColor", w({
                    h: e.h,
                    s: e.s,
                    b: 100
                }));
                break;
            case"saturation":
                k = q(5 * e.h / 12, 0, 150), l = q(B.height() - Math.ceil(e.b / (100 / B.height())), 0, B.height()), E.css({
                    top: l + "px",
                    left: k + "px"
                }), l = q(C.height() - e.s * (C.height() / 100), 0, C.height()), F.css("top", l + "px"), C.css("backgroundColor", w({
                    h: e.h,
                    s: 100,
                    b: e.b
                })), y.find(".minicolors-grid-inner").css("opacity", e.s / 100);
                break;
            case"brightness":
                k = q(5 * e.h / 12, 0, 150), l = q(B.height() - Math.ceil(e.s / (100 / B.height())), 0, B.height()), E.css({
                    top: l + "px",
                    left: k + "px"
                }), l = q(C.height() - e.b * (C.height() / 100), 0, C.height()), F.css("top", l + "px"), C.css("backgroundColor", w({
                    h: e.h,
                    s: e.s,
                    b: 100
                })), y.find(".minicolors-grid-inner").css("opacity", 1 - e.b / 100);
                break;
            default:
                k = q(Math.ceil(e.s / (100 / B.width())), 0, B.width()), l = q(B.height() - Math.ceil(e.b / (100 / B.height())), 0, B.height()), E.css({
                    top: l + "px",
                    left: k + "px"
                }), l = q(C.height() - e.h / (360 / C.height()), 0, C.height()), F.css("top", l + "px"), B.css("backgroundColor", w({
                    h: e.h,
                    s: 100,
                    b: 100
                }))
        }
        b.data("minicolors-initialized") && j(b, i, f)
    }

    function j(a, b, c) {
        var d, e, f, g = a.data("minicolors-settings"), h = a.data("minicolors-lastChange");
        if (!h || h.value !== b || h.opacity !== c) {
            if (a.data("minicolors-lastChange", {value: b, opacity: c}), g.swatches && 0 !== g.swatches.length) {
                for (d = r(b) ? o(b, !0) : z(b), e = -1, f = 0; f < g.swatches.length; ++f) if (d.r === g.swatches[f].r && d.g === g.swatches[f].g && d.b === g.swatches[f].b && d.a === g.swatches[f].a) {
                    e = f;
                    break
                }
                a.parent().find(".minicolors-swatches .minicolors-swatch").removeClass("selected"), -1 !== f && a.parent().find(".minicolors-swatches .minicolors-swatch").eq(f).addClass("selected")
            }
            g.change && (g.changeDelay ? (clearTimeout(a.data("minicolors-changeTimeout")), a.data("minicolors-changeTimeout", setTimeout(function () {
                g.change.call(a.get(0), b, c)
            }, g.changeDelay))) : g.change.call(a.get(0), b, c)), a.trigger("change").trigger("input")
        }
    }

    function k(b) {
        var c = n(a(b).val(), !0), d = z(c), e = a(b).attr("data-opacity");
        return d ? (void 0 !== e && a.extend(d, {a: parseFloat(e)}), d) : null
    }

    function l(b, c) {
        var d = n(a(b).val(), !0), e = z(d), f = a(b).attr("data-opacity");
        return e ? (void 0 === f && (f = 1), c ? "rgba(" + e.r + ", " + e.g + ", " + e.b + ", " + parseFloat(f) + ")" : "rgb(" + e.r + ", " + e.g + ", " + e.b + ")") : null
    }

    function m(a, b) {
        return "uppercase" === b ? a.toUpperCase() : a.toLowerCase()
    }

    function n(a, b) {
        return a = a.replace(/^#/g, ""), a.match(/^[A-F0-9]{3,6}/gi) ? 3 !== a.length && 6 !== a.length ? "" : (3 === a.length && b && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]), "#" + a) : ""
    }

    function o(a, b) {
        var c = a.replace(/[^\d,.]/g, ""), d = c.split(",");
        return d[0] = q(parseInt(d[0], 10), 0, 255), d[1] = q(parseInt(d[1], 10), 0, 255), d[2] = q(parseInt(d[2], 10), 0, 255), d[3] && (d[3] = q(parseFloat(d[3], 10), 0, 1)), b ? {
            r: d[0],
            g: d[1],
            b: d[2],
            a: d[3] ? d[3] : null
        } : "undefined" != typeof d[3] && d[3] <= 1 ? "rgba(" + d[0] + ", " + d[1] + ", " + d[2] + ", " + d[3] + ")" : "rgb(" + d[0] + ", " + d[1] + ", " + d[2] + ")"
    }

    function p(a, b) {
        return r(a) ? o(a) : n(a, b)
    }

    function q(a, b, c) {
        return b > a && (a = b), a > c && (a = c), a
    }

    function r(a) {
        var b = a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return !(!b || 4 !== b.length)
    }

    function s(a) {
        return a = a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i), a && 6 === a.length ? a[4] : "1"
    }

    function t(a) {
        var b = {}, c = Math.round(a.h), d = Math.round(255 * a.s / 100), e = Math.round(255 * a.b / 100);
        if (0 === d) b.r = b.g = b.b = e; else {
            var f = e, g = (255 - d) * e / 255, h = (f - g) * (c % 60) / 60;
            360 === c && (c = 0), 60 > c ? (b.r = f, b.b = g, b.g = g + h) : 120 > c ? (b.g = f, b.b = g, b.r = f - h) : 180 > c ? (b.g = f, b.r = g, b.b = g + h) : 240 > c ? (b.b = f, b.r = g, b.g = f - h) : 300 > c ? (b.b = f, b.g = g, b.r = g + h) : 360 > c ? (b.r = f, b.g = g, b.b = f - h) : (b.r = 0, b.g = 0, b.b = 0)
        }
        return {r: Math.round(b.r), g: Math.round(b.g), b: Math.round(b.b)}
    }

    function u(a) {
        return a = a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i), a && 4 === a.length ? "#" + ("0" + parseInt(a[1], 10).toString(16)).slice(-2) + ("0" + parseInt(a[2], 10).toString(16)).slice(-2) + ("0" + parseInt(a[3], 10).toString(16)).slice(-2) : ""
    }

    function v(b) {
        var c = [b.r.toString(16), b.g.toString(16), b.b.toString(16)];
        return a.each(c, function (a, b) {
            1 === b.length && (c[a] = "0" + b)
        }), "#" + c.join("")
    }

    function w(a) {
        return v(t(a))
    }

    function x(a) {
        var b = y(z(a));
        return 0 === b.s && (b.h = 360), b
    }

    function y(a) {
        var b = {h: 0, s: 0, b: 0}, c = Math.min(a.r, a.g, a.b), d = Math.max(a.r, a.g, a.b), e = d - c;
        return b.b = d, b.s = 0 !== d ? 255 * e / d : 0, 0 !== b.s ? a.r === d ? b.h = (a.g - a.b) / e : a.g === d ? b.h = 2 + (a.b - a.r) / e : b.h = 4 + (a.r - a.g) / e : b.h = -1, b.h *= 60, b.h < 0 && (b.h += 360), b.s *= 100 / 255, b.b *= 100 / 255, b
    }

    function z(a) {
        return a = parseInt(a.indexOf("#") > -1 ? a.substring(1) : a, 16), {r: a >> 16, g: (65280 & a) >> 8, b: 255 & a}
    }

    a.minicolors = {
        defaults: {
            animationSpeed: 50,
            animationEasing: "swing",
            change: null,
            changeDelay: 0,
            control: "hue",
            dataUris: !0,
            defaultValue: "",
            format: "hex",
            hide: null,
            hideSpeed: 100,
            inline: !1,
            keywords: "",
            letterCase: "lowercase",
            opacity: !1,
            position: "bottom left",
            show: null,
            showSpeed: 100,
            theme: "default",
            swatches: []
        }
    }, a.extend(a.fn, {
        minicolors: function (f, g) {
            switch (f) {
                case"destroy":
                    return a(this).each(function () {
                        c(a(this))
                    }), a(this);
                case"hide":
                    return e(), a(this);
                case"opacity":
                    return void 0 === g ? a(this).attr("data-opacity") : (a(this).each(function () {
                        i(a(this).attr("data-opacity", g))
                    }), a(this));
                case"rgbObject":
                    return k(a(this), "rgbaObject" === f);
                case"rgbString":
                case"rgbaString":
                    return l(a(this), "rgbaString" === f);
                case"settings":
                    return void 0 === g ? a(this).data("minicolors-settings") : (a(this).each(function () {
                        var b = a(this).data("minicolors-settings") || {};
                        c(a(this)), a(this).minicolors(a.extend(!0, b, g))
                    }), a(this));
                case"show":
                    return d(a(this).eq(0)), a(this);
                case"value":
                    return void 0 === g ? a(this).val() : (a(this).each(function () {
                        "object" == typeof g ? (g.opacity && a(this).attr("data-opacity", q(g.opacity, 0, 1)), g.color && a(this).val(g.color)) : a(this).val(g), i(a(this))
                    }), a(this));
                default:
                    return "create" !== f && (g = f), a(this).each(function () {
                        b(a(this), g)
                    }), a(this)
            }
        }
    }), a(document).on("mousedown.minicolors touchstart.minicolors", function (b) {
        a(b.target).parents().add(b.target).hasClass("minicolors") || e()
    }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-grid, .minicolors-slider, .minicolors-opacity-slider", function (b) {
        var c = a(this);
        b.preventDefault(), a(document).data("minicolors-target", c), f(c, b, !0)
    }).on("mousemove.minicolors touchmove.minicolors", function (b) {
        var c = a(document).data("minicolors-target");
        c && f(c, b)
    }).on("mouseup.minicolors touchend.minicolors", function () {
        a(this).removeData("minicolors-target")
    }).on("click.minicolors", ".minicolors-swatches li", function (b) {
        b.preventDefault();
        var c = a(this), d = c.parents(".minicolors").find(".minicolors-input"), e = c.data("swatch-color");
        h(d, e, s(e)), i(d)
    }).on("mousedown.minicolors touchstart.minicolors", ".minicolors-input-swatch", function (b) {
        var c = a(this).parent().find(".minicolors-input");
        b.preventDefault(), d(c)
    }).on("focus.minicolors", ".minicolors-input", function () {
        var b = a(this);
        b.data("minicolors-initialized") && d(b)
    }).on("blur.minicolors", ".minicolors-input", function () {
        var b, c, d, e, f, g = a(this), h = g.data("minicolors-settings");
        g.data("minicolors-initialized") && (b = h.keywords ? a.map(h.keywords.split(","), function (b) {
            return a.trim(b.toLowerCase())
        }) : [], "" !== g.val() && a.inArray(g.val().toLowerCase(), b) > -1 ? f = g.val() : (r(g.val()) ? d = o(g.val(), !0) : (c = n(g.val(), !0), d = c ? z(c) : null), f = null === d ? h.defaultValue : "rgb" === h.format ? o(h.opacity ? "rgba(" + d.r + "," + d.g + "," + d.b + "," + g.attr("data-opacity") + ")" : "rgb(" + d.r + "," + d.g + "," + d.b + ")") : v(d)), e = h.opacity ? g.attr("data-opacity") : 1, "transparent" === f.toLowerCase() && (e = 0), g.closest(".minicolors").find(".minicolors-input-swatch > span").css("opacity", e), g.val(f), "" === g.val() && g.val(p(h.defaultValue, !0)), g.val(m(g.val(), h.letterCase)))
    }).on("keydown.minicolors", ".minicolors-input", function (b) {
        var c = a(this);
        if (c.data("minicolors-initialized")) switch (b.keyCode) {
            case 9:
                e();
                break;
            case 13:
            case 27:
                e(), c.blur()
        }
    }).on("keyup.minicolors", ".minicolors-input", function () {
        var b = a(this);
        b.data("minicolors-initialized") && i(b, !0)
    }).on("paste.minicolors", ".minicolors-input", function () {
        var b = a(this);
        b.data("minicolors-initialized") && setTimeout(function () {
            i(b, !0)
        }, 1)
    })
});