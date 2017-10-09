/*!
 * TouchSlide v1.1
 * 1.1 宽度自适应（修复安卓横屏时滑动范围不变的bug）
 */

var TouchSlide = function (a) {
    a = a || {}
    var b = { slideCell: a.slideCell || '#touchSlide', titCell: a.titCell || '.hd li', mainCell: a.mainCell || '.bd', effect: a.effect || 'left', autoPlay: a.autoPlay || !1, delayTime: a.delayTime || 200, interTime: a.interTime || 2500, defaultIndex: a.defaultIndex || 0, titOnClassName: a.titOnClassName || 'on', autoPage: a.autoPage || !1, prevCell: a.prevCell || '.prev', nextCell: a.nextCell || '.next', pageStateCell: a.pageStateCell || '.pageState', pnLoop: a.pnLoop == 'undefined ' ? !0 : a.pnLoop, startFun: a.startFun || null, endFun: a.endFun || null, switchLoad: a.switchLoad || null },
        c = document.getElementById(b.slideCell.replace('#', ''))
    if (!c) return !1
    var d = function (a, b) {
            a = a.split(' ')
            var c = []
            b = b || document
            var d = [b]
            for (var e in a) a[e].length != 0 && c.push(a[e])
            for (var e in c) {
                if (d.length == 0) return !1
                var f = []
                for (var g in d) {
                    if (c[e][0] == '#') f.push(document.getElementById(c[e].replace('#', '')))
                    else if (c[e][0] == '.') {
                        for (var h = d[g].getElementsByTagName('*'), i = 0; i < h.length; i++) {
                            var j = h[i].className
                            j && j.search(new RegExp('\\b' + c[e].replace('.', '') + '\\b')) != -1 && f.push(h[i])
                        }
                    } else { for (var h = d[g].getElementsByTagName(c[e]), i = 0; i < h.length; i++) f.push(h[i]) }
                }
                d = f
            }
            return d.length == 0 || d[0] == b ? !1 : d
        },
        e = function (a, b) {
            var c = document.createElement('div')
            c.innerHTML = b, c = c.children[0]
            var d = a.cloneNode(!0)
            return c.appendChild(d), a.parentNode.replaceChild(c, a), m = d, c
        },
        g = function (a, b) { !a || !b || a.className && a.className.search(new RegExp('\\b' + b + '\\b')) != -1 || (a.className += (a.className ? ' ' : '') + b) },
        h = function (a, b) { !a || !b || a.className && a.className.search(new RegExp('\\b' + b + '\\b')) == -1 || (a.className = a.className.replace(new RegExp('\\s*\\b' + b + '\\b', 'g'), '')) },
        i = b.effect,
        j = d(b.prevCell, c)[0],
        k = d(b.nextCell, c)[0],
        l = d(b.pageStateCell)[0],
        m = d(b.mainCell, c)[0]
    if (!m) return !1
    var N, O, n = m.children.length,
        o = d(b.titCell, c),
        p = o ? o.length : n,
        q = b.switchLoad,
        r = parseInt(b.defaultIndex),
        s = parseInt(b.delayTime),
        t = parseInt(b.interTime),
        u = b.autoPlay == 'false' || b.autoPlay == 0 ? !1 : !0,
        v = b.autoPage == 'false' || b.autoPage == 0 ? !1 : !0,
        w = b.pnLoop == 'false' || b.pnLoop == 0 ? !1 : !0,
        x = r,
        y = null,
        z = null,
        A = null,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        G = /hp-tablet/gi.test(navigator.appVersion),
        H = 'ontouchstart' in window && !G,
        I = H ? 'touchstart' : 'mousedown',
        J = H ? 'touchmove' : '',
        K = H ? 'touchend' : 'mouseup',
        M = m.parentNode.clientWidth,
        P = n
    if (p == 0 && (p = n), v) {
        p = n, o = o[0], o.innerHTML = ''
        var Q = ''
        if (b.autoPage == 1 || b.autoPage == 'true') { for (var R = 0; p > R; R++) Q += '<li>' + (R + 1) + '</li>' } else { for (var R = 0; p > R; R++) Q += b.autoPage.replace('$', R + 1) }
        o.innerHTML = Q, o = o.children
    }
    i == 'leftLoop' && (P += 2, m.appendChild(m.children[0].cloneNode(!0)), m.insertBefore(m.children[n - 1].cloneNode(!0), m.children[0])), N = e(m, '<div class="tempWrap" style="overflow:hidden; position:relative;"></div>'), m.style.cssText = 'width:' + P * M + 'px;' + 'position:relative;overflow:hidden;padding:0;margin:0;'
    for (var R = 0; P > R; R++) m.children[R].style.cssText = 'display:table-cell;vertical-align:top;width:' + M + 'px'
    var S = function () { typeof b.startFun === 'function' && b.startFun(r, p) },
        T = function () { typeof b.endFun === 'function' && b.endFun(r, p) },
        U = function (a) {
            var b = (i == 'leftLoop' ? r + 1 : r) + a,
                c = function (a) {
                    for (var b = m.children[a].getElementsByTagName('img'), c = 0; c < b.length; c++) b[c].getAttribute(q) && (b[c].setAttribute('src', b[c].getAttribute(q)), b[c].removeAttribute(q))
                }
            if (c(b), i == 'leftLoop') {
                switch (b) {
                case 0:
                    c(n)
                    break
                case 1:
                    c(n + 1)
                    break
                case n:
                    c(0)
                    break
                case n + 1:
                    c(1)
                }
            }
        },
        V = function () {
            M = N.clientWidth, m.style.width = P * M + 'px'
            for (var a = 0; P > a; a++) m.children[a].style.width = M + 'px'
            var b = i == 'leftLoop' ? r + 1 : r
            W(-b * M, 0)
        }
    window.addEventListener('resize', V, !1)
    var W = function (a, b, c) { c = c ? c.style : m.style, c.webkitTransitionDuration = c.MozTransitionDuration = c.msTransitionDuration = c.OTransitionDuration = c.transitionDuration = b + 'ms', c.webkitTransform = 'translate(' + a + 'px,0)' + 'translateZ(0)', c.msTransform = c.MozTransform = c.OTransform = 'translateX(' + a + 'px)' },
        X = function (a) {
            switch (i) {
            case 'left':
                r >= p ? r = a ? r - 1 : 0 : r < 0 && (r = a ? 0 : p - 1), q != null && U(0), W(-r * M, s), x = r
                break
            case 'leftLoop':
                q != null && U(0), W(-(r + 1) * M, s), r == -1 ? (z = setTimeout(function () { W(-p * M, 0) }, s), r = p - 1) : r == p && (z = setTimeout(function () { W(-M, 0) }, s), r = 0), x = r
            }
            S(), A = setTimeout(function () { T() }, s)
            for (var c = 0; p > c; c++) h(o[c], b.titOnClassName), c == r && g(o[c], b.titOnClassName)
            w == 0 && (h(k, 'nextStop'), h(j, 'prevStop'), r == 0 ? g(j, 'prevStop') : r == p - 1 && g(k, 'nextStop')), l && (l.innerHTML = '<span>' + (r + 1) + '</span>/' + p)
        }
    if (X(), u && (y = setInterval(function () { r++, X() }, t)), o) {
        for (var R = 0; p > R; R++) {
            !(function () {
                var a = R
                o[a].addEventListener('click', function () { clearTimeout(z), clearTimeout(A), r = a, X() })
            }())
        }
    }
    k && k.addEventListener('click', function () {
        (w == 1 || r != p - 1) && (clearTimeout(z), clearTimeout(A), r++, X())
    }), j && j.addEventListener('click', function () {
        (w == 1 || r != 0) && (clearTimeout(z), clearTimeout(A), r--, X())
    })
    var Y = function (a) {
            clearTimeout(z), clearTimeout(A), O = void 0, D = 0
            var b = H ? a.touches[0] : a
            B = b.pageX, C = b.pageY, m.addEventListener(J, Z, !1), m.addEventListener(K, $, !1)
        },
        Z = function (a) {
            if (!H || !(a.touches.length > 1 || a.scale && a.scale !== 1)) {
                var b = H ? a.touches[0] : a
                if (D = b.pageX - B, E = b.pageY - C, typeof O === 'undefined' && (O = !!(O || Math.abs(D) < Math.abs(E))), !O) {
                    switch (a.preventDefault(), u && clearInterval(y), i) {
                    case 'left':
                        (r == 0 && D > 0 || r >= p - 1 && D < 0) && (D = 0.4 * D), W(-r * M + D, 0)
                        break
                    case 'leftLoop':
                        W(-(r + 1) * M + D, 0)
                    }
                    q != null && Math.abs(D) > M / 3 && U(D > -0 ? -1 : 1)
                }
            }
        },
        $ = function (a) { D != 0 && (a.preventDefault(), O || (Math.abs(D) > M / 10 && (D > 0 ? r-- : r++), X(!0), u && (y = setInterval(function () { r++, X() }, t))), m.removeEventListener(J, Z, !1), m.removeEventListener(K, $, !1)) }
    m.addEventListener(I, Y, !1)
}
