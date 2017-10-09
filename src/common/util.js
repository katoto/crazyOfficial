/**
 * Created by xiezg on 2017/3/17.
 */
// 数组转对象，对象的key 队友第二个参数
export function convertArrToObj (arr, key) {
    let result = {}
    if (arr) {
        arr.forEach(item => {
            result[item[key]] = item
        })
    }
    return result
}
export const getCookie = (sName) =>{
    let arr = document.cookie.split('; ');
    for (let i = 0, len = arr.length; i < len; i++) {
        let arr2 = arr[i].split('=');
        if (arr2[0] == sName) {
            return arr2[1];
        }
    }
}
export const addCookie = (name,value) =>{
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
export const  removeCookie = (sName)=> {
    addCookie(sName, 0, -1);
}

export let getCk = function () {
    if(!localStorage.getItem('ck') || localStorage.getItem('ck') === '' || localStorage.getItem('ck') === 'undefined' ){
        if(getCookie('ck') && getCookie('ck') !=='' ){
            return getCookie('ck')
        }
        return ''
    }
    return localStorage.getItem('ck') || ''
};

export const src = '500touch'
export const cptype = ''

export const platform = (function () {
    return ~navigator.userAgent.indexOf('iPhone') ? 'ios' : 'android'
})()

export const isLowAndroidVersion = (function () {
    let userAgent = window.navigator.userAgent
    let indexAndroid = userAgent.indexOf('Android')
    let androidVersion = 0
    let isLowAndroidVersion = false
    if (indexAndroid >= 0) {
        androidVersion = parseFloat(userAgent.slice(indexAndroid + 8))
        if (androidVersion < 4.5) {
            isLowAndroidVersion = true
        }
    }
    return isLowAndroidVersion
})()


export const convertToQueryString = function (obj) {
    let result = []
    if (Object.keys(obj).length <= 0) {
        return false
    }
    Object.keys(obj).forEach(key => {
        result.push(`${key}=${obj[key]}`)
    })
    return result.join('&')
}

export const wait = function (duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration)
    })
}

/**
 * @deprecated
 * @param ns
 * @returns {function(*): string}
 */
export function namespace (ns) {
    return (name) => [ns, name].join('/')
}

/**
 * @deprecated
 * @param array
 * @param ns
 * @returns {{}}
 */
export function mapTypes (array, ns) {
    const result = {}
    array.forEach(item => {
        result[item] = [ns, item].join('/')
    })
    return result
}

export function mapActions (acts, ns) {
    let aTypes = {}
    let actions = {}
    Object.keys(acts).forEach((key) => {
        aTypes[key] = [ns, key].join('/')
        actions[aTypes[key]] = acts[key]
    })
    return {actions, aTypes}
}

export function invokeWxzf (data) {
    return new Promise((resolve, reject) => {
        const onBridgeReady = () => {
            window.WeixinJSBridge && window.WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    'appId': data.appId,          // 公众号名称，由商户传入
                    'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
                    'nonceStr': data.nonceStr,   // 随机串
                    'package': data.package,
                    'signType': 'MD5',                // 微信签名方式：
                    'paySign': data.paySign // 微信签名
                },
                function (res) {
                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                        resolve('ok')
                    } else {
                        const error = new Error(res.err_msg)
                        error.code = '101'
                        reject(error)
                    }
                })
        }
        if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
            }
        } else {
            onBridgeReady()
        }
    })
}

export function mapMutations (muts, ns) {
    let mTypes = {}
    let mutations = {}
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join('/')
        mutations[mTypes[key]] = muts[key]
    })
    return {mutations, mTypes}
}

/**
*  禁止滚动条事件  公用样式
 */

export function stopHtml () {
    document.querySelector('html').className = 'overflow'
    document.querySelector('body').className = 'overflow'
}

/**
 *  禁止滚动条事件  公用样式
 */

export function starHtml () {
    document.querySelector('html').className = ''
    document.querySelector('body').className = ''
}
