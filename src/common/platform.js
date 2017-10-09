import Cookies from 'js-cookie'

/*eslint-disable */
var exports = {

    domain: {
        mapi: 'c.m.500.com/mapi',
        touch: 'c.m.500.com',
        wx500: 'wx.500.com',
        ews: 'c.m.500.com/ews'
    },

    cpid: {
        touch: 2114,
        android: 2061,
        ios: 2062,
        wx: 2102,
        wx_cmb: 2106
    },

    /**
     * 配置环境参数
     * @param {Object} options 可设置的字段：touch, wx500, ews, mapi
     */
    initEnv: function (options) {
        if (!options) {
            return alert('initEnv未接收到参数');
        }
        for (var key in options) {
            exports.domain[key] = options[key];
        }
    },

    /**
     * 注册ready事件
     * @param {Function} callback
     */
    ready: function (callback) {
        if (isAllReady) {
            callback.call(exports);
        } else {
            if (callbacks.indexOf(callback) < 0) {
                callbacks.push(callback);
            }
        }
    },

    isLogin: function () {
        if (!isAllReady) {
            return alert('isLogin方法请确保ready后调用!');
        }
        if (exports.isApp) {
            return !!window.EsApp.getInfo().ck;
        }

        var cookie = document.cookie;
        return !!(cookie.match(/ck_user=/) && cookie.match(/ck_user2=/));
    },

    login: function (backurl, isReplace) {
        if (!isAllReady) {
            return alert('login方法请确保ready后调用!');
        }
        if (exports.isApp) {
            return window.EsApp.invoke('login');
        }

        backurl = backurl || location.href;

        if (exports.isWeixin) {
            return weixinLogin(backurl);
        }

        var coop_type = Cookies.get('coop_type');
        //        var coop_query  = Cookies.get('coop_query');
        //        coop_query = coop_query && JSON.parse(coop_query) || {};

        if (coop_type) {
            coopLogin(coop_type, backurl);
        } else {
            touchLogin(backurl, isReplace);
        }
    },

    recharge: function (options) {
        if (!isAllReady) {
            return alert('recharge方法请确保ready后调用!');
        }

        options = options || {};

        if (exports.isApp) {
            if (options.cid) {
                // 兼容2.0一个 ios和andriod不统一的BUG
                options.type = options.cid;
            }
            return window.EsApp.invoke('recharge', options);
        }

        location.href = exports.protocol + exports.domain.touch + '/recharge' + (options.money ? '?allmoney=' + options.money : '');
    },
    /**
          * i注册App状态改变后触发的回调事件
          * @param {[[Type]]} callback [[Description]]
          */
    dataChanged:

    function (callback) {
        if (isApiReady) {
            window.EsApp.on('datachanged', callback);
        } else {
            dataChanged.push(callback);
        }
    }

};

var has500UserAgent = navigator.userAgent.match(/(android|ios)_500cp_500com_/i) != null;
var timerID;

var isAllReady = false; // DOM和APP api都已经ready
var isDomReady = false; // DOM ready
var isApiReady = false; // APP api 已经准备好
var isInjected = false; // 是否注入了js
var callbacks = [];    // all ready的回调
var dataChanged = [];    // datachanged事件的回调

// var userbaseurl = '/user/index.php';
var userbaseurl = '/login';

/**
 * 检测平台
 */
function detectPlatform() {
    var isInEsunApp = (window.EsApp != null) && (typeof (window.EsApp.init) === 'function');

    exports.isApp = isInEsunApp;
    exports.isWeixin = !isInEsunApp && isWeixin();
}

/**
 * 注册api ready回调，并注入工具api
 */
function registerApiReady() {
    if (!isInjected && window.EsApp != null && typeof window.EsApp.init === 'function') {
        isInjected = true;

        if (typeof window.EsApp.onApiReady === 'function') {
            console.warn('EsApp.onApiReady已在esun.util.platform组件内部注册，请使用esun.use("esun.util.platform").ready方法注册ready事件!');
        }

        Object.defineProperty(window.EsApp, 'onApiReady', {
            get: function () {
                return triggerApiReady;
            },
            set: function (callback) {
                // console.warn('EsApp.onApiReady已在esun.util.platform组件内部注册，请使用esun.use("esun.util.platform").ready方法注册ready事件!');
                if (isAllReady) {
                    callback.call(exports);
                } else {
                    if (callbacks.indexOf(callback) < 0) {
                        callbacks.push(callback);
                    }
                }
            },
            configurable: true
        });

        window.EsApp.init();
    }
}

/**
 * 触发api ready，并注册datachanged，设置登录态
 */
function triggerApiReady() {
    clearTimeout(timerID);

    if (isApiReady) {
        return;
    }

    isApiReady = true;

    window.EsApp.on('datachanged', setLoginState);


    if (dataChanged.length) {
        dataChanged.forEach(function (callback) {
            window.EsApp.on('datachanged', callback);
        });
    }

    // 设置登录态
    setLoginState();

    if (isDomReady) {
        triggerAllReady();
    }
}

/**
 * 触发dom ready，检测api是否已经准备好，如果已经准备好直接触发all ready，
 * 否则再次尝试注入js api,并设置定时器在50ms后触发all ready
 */
function triggerDomReady() {
    isDomReady = true;

    if (isApiReady) {
        triggerAllReady();
    } else {
        registerApiReady();

        timerID = setTimeout(function () {
            if (has500UserAgent) {
                if (!window.EsApp) {
                    // 如果没有注入，强制要求注入
                    location.href = 'rabbit://reloadjs';
                }
                setTimeout(triggerDomReady, 0);
            } else {
                triggerAllReady();
            }
        }, 50);
    }
}

/**
 * 触发真正的ready
 */
function triggerAllReady() {
    if (isAllReady) {
        return;
    }

    detectPlatform();

    isAllReady = true;
    callbacks.forEach(function (callback) {
        callback.call(exports);
    });
}

/**
 * 保存新的是否登录的状态
 */
function setLoginState() {
    var info = window.EsApp.getInfo();

    var domain = '.' + document.domain.split('.').slice(-2).join('.');
    // domain = '.500.com';

    function expires(key) {

        Cookies.remove(key, { path: '/' });
        Cookies.remove(key, { domain: domain, path: '/' });
    }

    if (info.ck && info.ck.length > 0) {
        Cookies.set('ck_user', info.username, { domain: domain, path: '/' });
        Cookies.set('ck_user2', info.username, { domain: domain, path: '/', expires: 7200 });
        Cookies.set('usercheck', info.ck, { domain: domain, path: '/', expires: 7200 });
    } else {
        expires('usercheck');
        expires('ck_user2');
        expires('ck_user');
    }


    var cpid = window.EsApp.isAndroid ? exports.cpid.android : exports.cpid.ios;

    Cookies.set('cpid', cpid, { domain: domain, path: '/' });
}

function isWeixin() {
    if (typeof WeixinJSBridge !== 'undefined') {
        return true;
    }

    var av = navigator.appVersion && navigator.appVersion.toLowerCase() || '';
    var ua = navigator.userAgent && navigator.userAgent.toLowerCase() || '';

    if (av.indexOf('micromessenger') != -1 || ua.indexOf('micromessenger') != -1) {
        return true;
    }

    return false;
}

/**
 * 微信登录
 */
function weixinLogin(backurl) {
    var wx_nextfrom = Cookies.get('wx_nextfrom') || '500.com';

    var gourl = exports.protocol + exports.domain.wx500 + '/coop/wx/hezuoport.php?wfrom=' + wx_nextfrom;
    var tourl = exports.protocol + exports.domain.wx500 + '/coop/wx/coopauth.php?backurl=' +
        encodeURIComponent(backurl) +
        '&bfocus=0';

    location.href = gourl + '&tourl=' + encodeURIComponent(tourl);
}

/**
 * 合作登录
 */
function coopLogin(coop_type, backurl) {
    var query = [
        'c=coop',
        'a=hezuologurl',
        'coop_type=' + encodeURIComponent(coop_type),
        'tourl=' + encodeURIComponent(backurl)
    ].join('&');

    location.href = exports.protocol + exports.domain.touch + userbaseurl + '?' + query;
}

/**
 * touch版登录
 */
function touchLogin(backurl, isReplace) {
    var query;
    if (document.domain.indexOf('c.m.500.com') > -1 || document.referrer.indexOf('c.m.500.com') > -1) {
        query = [
            // 'c=home',
            // 'a=login',
            'backUrl=' + encodeURIComponent(backurl)
        ].join('&');
        if (isReplace) {
            location.replace('http://c.m.500.com/user/login/index.html' + '?' + query);
        } else {
            location.href = 'http://c.m.500.com/user/login/index.html' + '?' + query;
        }
    } else {
        query = [
            'c=home',
            'a=login',
            'backurl=' + encodeURIComponent(backurl)
        ].join('&');
        if (isReplace) {
            location.replace('http://m.500.com/user/index.php' + '?' + query);
        } else {
            location.href = 'http://m.500.com/user/index.php' + '?' + query;
        }
    }
}

registerApiReady();

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    triggerDomReady();
} else {
    document.addEventListener('DOMContentLoaded', triggerDomReady, false);
}
/*eslint-enable */
export default exports
