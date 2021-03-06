/**
 * Created by xiezg on 2017/3/10.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '~common/ajax'
import {addCookie, platform, src, wait, convertToQueryString, getCk, invokeWxzf } from '~common/util'
import main from './main'
import home from './home'
import feedback from './feedback'
import regPerson from './regPerson'
import router from '../router'
import $ from 'bc-zepto.full'

Vue.use(Vuex)

let baseURL = 'ws://10.0.1.167:6999'
if (process.env.NODE_ENV === 'production') {
    baseURL = 'wss://crazybet.choopaoo.com/wss'
} else if (process.env.NODE_ENV === 'preRelease') {
    baseURL = 'ws://10.0.1.167:6999'
}

// 全局的就是直接变量，一个页面一个对象
const state = {
    ck: '',
    userInfo: null,
    toastMsg: null,
    isLowAndroidVersion: false,
    cp_login_state: 0,  // 0： 合作方没登录， 1： 合作方已经登录
    socket: {
        reconnect: 0,
        sock: null,
        interval: null,
        data: null,
        latestSub: null
    },
    msgAllData: {         // 我的消息所有数据
        showMessbox: false, //  弹窗
        messageList: [],
        isReadyGet: true,
        isNoneMessList: false,
        isAddMessList: false,
        messPageNum: 1

    },
    guessAllData: {      // 赛事记录所有数据
        showBetListbox: false, //  弹窗
        goldList: null
    },

    eventCountAllData: {   // 賽事統計數據
        showEventCountbox: false,  // 彈窗
        footballCaseData: null,
        footballStatData: null
    },
    awardAllData: {
        showAwardbox: false,   // 显示，隐藏 嘉奖框
        setAwardImg: 'https://crazybet.choopaoo.com/img/esun/upload/8c/70/8c705f765b1611e7b209.jpg'
    },
    headParentBox: {
        showHeadBox: false,  // 弹窗
        showFeedBack: false
    },

    /* 新页面迁移的数据 */
    chargeNewData: {
        bannerScrollData: null,  // 滚动的数据
        goodslist: [],
        winGoodslist: null,
        chargeList: null, // 充值列表
        footballPropsList: null, // 道具列表
        winInformation: null,  // 中奖信息

        logisticMess: null   // 物流订单详情

    },
    shopAddData: {
        addressMess: { },  // 地址相关
        isConfirmBtn: false,  // 确认地址
        isSaveBtn: false  // 保存地址
    },
    luckdrawData: {
        luckMessData: null,
        chooseIDCartNumber: null
    },
    isLogin: false,
    isLogin500: false,
    isHideHomeHead: false, // 隐藏头部
    activeBox: {
        showActBox: false // 弹窗
    },
    showHeightTips: false,

    kefuAlert: true,
    showHelpbox: false,

    loginSucc: false,
    regisSucc: false,

    dhj: {  // 兑换劵相关的对象
        dhjBtn: true, // 抽奖按钮是否可点
        positionName: 'default', // position00 控制类名
        goodBingoNew: null  // 抽取实物的数据
    },
    bingoPrize: {
        number: 0,
        type: '',
        isShow: false
    },
    showPopGiftSu: false,  // 是否显示中奖弹窗
    currOid: null

}
const mutations = {
    setUserInfoIconData (state, data) {
        if (state.userInfo) {
            state.userInfo.gold_total = data
        }
    },
    setcurrOid (state, data) {
        state.currOid = data
    },
    setPositionName (state, data) {
        state.dhj.positionName = data
    },
    setdhjBtn (state, data) {
        state.dhj.dhjBtn = data
    },
    setbingoPrize (state, data) {
        state.bingoPrize = data
    },
    setGoodBingoNew (state, data) {
        state.dhj.goodBingoNew = data
    },
    showPopGiftSu (state, data) {
        state.showPopGiftSu = data
    },
    //  new

    loginSucc (state, data) {
        state.loginSucc = data
    },
    regisSucc (state, data) {
        state.regisSucc = data
    },
    setkefuAlert (state, data) {
        state.kefuAlert = data
    },

    showHeightTips (state, data) {
        state.showHeightTips = data
    },
    setActiveBox (state, data) {
        state.activeBox.showActBox = data
    },
    setIsHideHomeHead (state, data) {
        state.isHideHomeHead = data
    },
    setIsLogin (state, data) {
        state.isLogin = data
    },
    setIsLogin500 (state, data) {
        state.isLogin500 = data
    },
    setIsConfirmBtn (state, data) {
        state.shopAddData.isConfirmBtn = data
    },
    setIsSaveBtn (state, data) {
        state.shopAddData.isSaveBtn = data
    },

    setLogisticMess (state, logisticMess) {
        state.chargeNewData.logisticMess = logisticMess
    },
    setChooseIDCartNumber (state, data) {
        state.luckdrawData.chooseIDCartNumber = data
    },

    setGotoLuckMess (state, luckMessData) {
        state.luckdrawData.luckMessData = luckMessData
    },
    setAddressMess (state, addressMess) {
        state.shopAddData.addressMess = addressMess
    },
    setAddressMobile (state, mobile) {
        if (state.shopAddData.addressMess) {
            state.shopAddData.addressMess.mobile = mobile
        }
    },
    setAddressAdd (state, consignee) {
        if (state.shopAddData.addressMess) {
            state.shopAddData.addressMess.consignee = consignee
        }
    },
    setAddressPro (state, province) {
        if (state.shopAddData.addressMess) {
            state.shopAddData.addressMess.province = province
        }
    },
    setAddressCity (state, city) {
        if (state.shopAddData.addressMess) {
            state.shopAddData.addressMess.city = city
        }
    },
    setAddressDistrict (state, district) {
        if (state.shopAddData.addressMess) {
            state.shopAddData.addressMess.district = district
        }
    },
    setAddressAllAddress (state, allAddress) {
        if (state.shopAddData.addressMess) {
            state.shopAddData.addressMess.allAddress = allAddress
        }
    },
    setLuckGoodBingo (state, winInformation) {
        // state.chargeNewData.showWinCopyWriter = false
        state.chargeNewData.winInformation = winInformation
    },

    setBannerScrollData (state, data) {
        state.chargeNewData.bannerScrollData = data
    },
    setGoodsList (state, goodsList) {
        state.chargeNewData.goodslist = goodsList
    },
    setWinGoodList (state, winGoodList) {
        state.chargeNewData.winGoodslist = winGoodList
    },

    showHeadBox (state, data) {
        state.headParentBox.showHeadBox = data
    },
    setisLowAndroidVersion (state, data) {
        state.isLowAndroidVersion = data
    },
    cp_login_state (state, data) {
        state.cp_login_state = data
    },
    ck (state, ck) {
        state.ck = ck
        addCookie(src() + 'ck', ck)
        localStorage.setItem(src() + 'ck', ck)
    },
    removeCk (state) {
        state.ck = ''
        addCookie(src() + 'ck', '')
        localStorage.setItem(src() + 'ck', '')
    },
    userInfo (state, userInfo) {
        if (userInfo && userInfo.photo === '') {
            userInfo.photo = 'http://img.choopaoo.com/esun/upload/be/83/be837ad8049611e797ef.png'
        }
        state.userInfo = userInfo
    },
    addConnectNum (state) {
        state.socket.reconnect ++
    },
    toastMsg (state, msg) {
        state.toastMsg = msg
    },
    initSocket (state, {sock, interval}) {
        state.socket.sock = sock
        state.socket.interval = interval
    },
    updateSocketData (state, data) {
        state.socket.data = data
    },
    setLatestSub (state, latestSub) {
        state.socket.latestSub = latestSub
    },
    showAwardbox (state, data) {
        state.awardAllData.showAwardbox = data
    },
    showHelpbox (state, data) {
        state.showHelpbox = data
    },
    setAwardImg (state, data) {
        state.awardAllData.setAwardImg = data
    },

    showMessbox (state, data) {
        state.msgAllData.showMessbox = data
    },
    showBetListbox (state, data) {
        state.guessAllData.showBetListbox = data
    },
    showChargebox (state, data) {
        state.chargeAllData.showChargebox = data
    },

    showEventCountbox (state, data) {
        state.eventCountAllData.showEventCountbox = data
    },
    setMessageList (state, messageList) {
        state.msgAllData.messageList = messageList
    },

    lqSuccess (state, prizeInfo) {
        // 得测试一下
        let lqMsg = null
        state.msgAllData.messageList.forEach((msg) => {
            if (msg.pid === prizeInfo.pid) {
                lqMsg = msg
            }
        })

        Vue.set(lqMsg, 'showSucc', true)
        setTimeout(() => {
            state.msgAllData.messageList.some((msg, index) => {
                if (msg.pid === prizeInfo.pid) {
                    msg.valid = false
                    lqMsg = msg
                    Vue.set(lqMsg, 'showSucc', false)
                    return true
                }
            })
        }, 800)
    },
    /* 赛事记录 */
    setGoldList (state, goldList) {
        state.guessAllData.goldList = goldList
    },
    /* 充值记录 */
    setChargeList (state, chargeList) {
        state.chargeNewData.chargeList = chargeList
    },
    /*  我的充值icon列表 */
    setFootballPropsList (state, footballPropsList) {
        state.chargeNewData.footballPropsList = footballPropsList
    },

    setfootballCaseData (state, data) {
        state.eventCountAllData.footballCaseData = data
    },
    setfootballStatData (state, data) {
        state.eventCountAllData.footballStatData = data
    }

}
const actions = {

    /**
     *  换取实物
     * */
    async getGoodBingoNew ({state, commit, dispatch}, obj) {
        try {
            commit('setGoodBingoNew', null)
            let luckGoodBingo = await ajax.get(`/shops/goods/exchange?amount=${obj.amount}&ck=${getCk()}&goodsid=${obj.goodsid}&channel=${obj.channel}&platform=${platform}&goodstype=${obj.goodstype}&src=${src()}&company=${obj.company}`)
            commit('setGoodBingoNew', luckGoodBingo)
            commit('showPopGiftSu', true)
            dispatch('getUserInfo')
            // 更新oid
            if (luckGoodBingo.oid) {
                commit('setcurrOid', luckGoodBingo.oid)
            }
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    // new  抽取兑换劵
    async luckDrawGo ({commit, dispatch}, params) {
        try {
            const bingoData = await ajax.get(`/wheel/bingo?platform=${platform}&src=${src()}&wtype=60000&golds=60000&ck=${getCk()}`)
            console.log(bingoData)

            if (bingoData && bingoData.prize && bingoData.prize.idx) {
                dispatch('moveFn', {
                    endLocal: bingoData.prize.idx,
                    total: params.giftLen,
                    currLocal: params.currLocal,
                    initFunc: function () {
                        // 初始化 按钮什么的
                        commit('setdhjBtn', false)
                        //  手动减金币
                        if (state.userInfo && state.userInfo.gold_total) {
                            commit('setUserInfoIconData', parseInt(state.userInfo.gold_total) - 60000)
                        }
                    },
                    onComplete: function () {
                        commit('setdhjBtn', true)
                        // 弹窗奖品  把字段修改一下就行。
                        commit('setbingoPrize', {
                            isShow: true,
                            number: bingoData.prize.item,
                            type: bingoData.prize.type
                        })
                        dispatch('getUserInfo')
                    },
                    rollFunc: function (_index) {
                        commit('setPositionName', 'position0' + (_index))
                    }
                })
            } else {
                console.error('bingo error item or prize ')
            }
            // 开始move
        } catch (e) {
            if (~e.message.indexOf('未登录') || ~e.message.indexOf('其他设备登录')) {
                dispatch('clearLoginState', 0)
                dispatch('doAuth')
                return false
            }
            dispatch('showToast', e.message)
        }
    },
    /***
     *  抽奖 动画
     * @param config
     *     var defaultConfig = {
            endLocal: 0 , // 开始停留的位置
            total:4, // 奖品的个数
            onComplete : function () {
                console.log('end');
            } ,
            initFunc:function () {} // 初始化函数
        };
     */
    moveFn ({ commit, state, dispatch }, config = defaultConfig) {
        var _private = {
                /***
                 *  取旋转的随机数
                 */
                random (min, max) {
                    return Math.floor(min + Math.random() * (max - min))
                },
                aniFunction (t, b, c, d) {
                    // 加速 、 减速
                    return c * t / d + b
                }
            },
            fastTime = 50, slowTime = 400,
            stepCounts = parseInt(config.endLocal) + config.total * _private.random(2, 3),
            index = 0, slowT = 0,
            speedUp, uniform, slowDown

        if (config.currLocal) {
            // 算上初始的次数
            stepCounts += (parseInt(config.total) - parseInt(config.currLocal)) - 1
        }
        uniform = config.total * 2
        speedUp = Math.floor((stepCounts - uniform) / 3)
        uniform += speedUp
        slowDown = stepCounts

        if (config.initFunc) {
            config.initFunc()
        }

        var moveFunc = function () {
            var moveTime = null
            index++
            if (index > stepCounts) {
                setTimeout(() => {
                    config.onComplete()
                }, 10)
                return
            }
            var t = index, b = slowTime, c = fastTime - slowTime, d = speedUp
            if (index <= speedUp) {
                moveTime = _private.aniFunction(t, b, c, d)
            }
            if (index > speedUp) {
                moveTime = fastTime
            }
            if (index > uniform) {
                t = slowT++
                b = fastTime
                c = slowTime - fastTime
                d = slowDown - uniform
                moveTime = _private.aniFunction(t, b, c, d)
            }
            // 出赛果
            if (config.currLocal) {
                config.rollFunc((index + parseInt(config.currLocal)) % 8)
            } else {
                config.rollFunc(index % 8)
            }
            setTimeout(moveFunc, moveTime)
        }
        setTimeout(moveFunc, slowTime)
    },

    // ====================

    clearLoginState ({commit, dispatch}, data) {
        commit('ck', '')
        addCookie(src() + 'ck', '')
        localStorage.setItem(src() + 'ck', '')
    },

    /* 检查是否登录 */
    async checkLogin ({commit, dispatch}, params) {
        try {
            const hasCk = await getCk()
            if (hasCk && hasCk !== 'undefined' && hasCk !== '') {
                commit('setIsLogin', true)
                commit('ck', hasCk)
            } else {
                commit('setIsLogin', false)
            }
        } catch (e) {
            dispatch('showToast', '检查ck有误')
        }
    },

    // new  500 登陆
    /* 检查是否登录 */
    async checkLogin500 ({commit, dispatch}, params) {
        try {
            const waitCodePromise = () => {
                return new Promise((resolve, reject) => {
                    let url = `http://passport.500.com/auth/index.php?action=checkuserlogin&client_id=500guess&webtype=2129&isnew=1&callback=checkLogin`
                    $.ajax({
                        url: url,
                        type: 'get',
                        dataType: 'jsonp',
                        jsonp: 'jpcallback',
                        jsonpCallback: 'checkLogin',
                        success: function (data) {
                            resolve(data)
                        },
                        error: function (e) {
                            reject('0')
                            dispatch('showToast', e.message)
                        }
                    })
                })
            }
            const CodeData = await waitCodePromise()
            console.log(CodeData)
            if (CodeData && CodeData.code === 100 && CodeData.msg) {
                if (CodeData.msg.islogin === '1' && CodeData.msg.code !== '0') {
                    /* 已经登录 */
                    commit('setIsLogin500', true)
                    /* 是否直接 */
                    if (!(CodeData.msg.uuid && localStorage.getItem('userid') && getCk() && localStorage.getItem('userid') === CodeData.msg.uuid && getCk() !== 'undefined')) {
                        await dispatch('doLogin500', CodeData.msg.code)
                    }
                    console.log('==============')
                    console.log(CodeData.msg.uuid)
                    console.log(getCk())
                    console.log(localStorage.getItem('userid') === CodeData.msg.uuid)

                    commit('ck', getCk())
                } else {
                    commit('setIsLogin500', false)
                    // window.location.href = 'http://m.500.com/user/index.php?c=home&a=login&backurl=' + location.href.split(location.pathname)[0] + '/official?from=500touch'
                }
            } else {
                dispatch('showToast', '登录有误')
            }
        } catch (e) {
            dispatch('showToast', e.message + '/login/cpuser')
        }
    },
    async localCheckLogin500 ({commit, dispatch}, params) {
        try {
            const waitCodePromise = () => {
                return new Promise((resolve, reject) => {
                    let url = `http://passport.500boss.com/auth/index.php?action=checkuserlogin&client_id=500guess&webtype=2129&isnew=1&callback=checkLogin`
                    $.ajax({
                        url: url,
                        type: 'get',
                        dataType: 'jsonp',
                        jsonp: 'jpcallback',
                        jsonpCallback: 'checkLogin',
                        success: function (data) {
                            resolve(data)
                        },
                        error: function (e) {
                            reject('0')
                            dispatch('showToast', e.message)
                        }
                    })
                })
            }
            const CodeData = await waitCodePromise()
            if (CodeData && CodeData.code === 100 && CodeData.msg) {
                if (CodeData.msg.islogin === '1' && CodeData.msg.code !== '0') {
                    /* 已经登录 */
                    commit('setIsLogin500', true)
                    /* 是否直接给建成 */
                    await dispatch('doLogin500', CodeData.msg.code)
                } else {
                    commit('setIsLogin500', false)
                    window.location.href = 'http://wx.500boss.com/user/index.php?c=home&a=login&backurl=' + location.href.split(location.pathname)[0] + '/official?from=500touch'
                }
            } else {
                dispatch('showToast', '登录有误')
            }
        } catch (e) {
            dispatch('showToast', e.message + '/login/cpuser')
        }
    },
    async doLogin500 ({commit, dispatch}, params) {
        try {
            let doLoginData = null
            doLoginData = await ajax.get(`/login/cpuser?token=${params}&cptype=500&src=${src()}&platform=${platform}`)
            console.log(doLoginData)
            if (doLoginData.userid) {
                localStorage.setItem('userid', doLoginData.userid)
            }
            commit('ck', doLoginData.ck)
            return doLoginData.ck
        } catch (e) {
            dispatch('showToast', e.message + '/login/cpuser')
        }
    },

    // new  500 登陆
    async doAuth ({commit, dispatch}) {
        try {
            /* 处理登陆（调登陆 ） */
            if (src() === '500touch') {
                switch (src()) {
                case '500touch':
                    window.location.href = 'http://m.500.com/user/index.php?c=home&a=login&backurl=' + location.href.split(location.pathname)[0] + '/official?from=500touch'
                        ;break
                }
            } else {
                router.push('/login')
                dispatch('clearLoginState')
            }
        } catch (e) {
            dispatch('showToast', e.message + 'doAuth')
        }
    },
    async showToast ({commit}, msg) {
        let cb = null, duration = 2000
        if (typeof msg === 'object') {
            cb = msg.cb
            duration = msg.duration
            msg = msg.message
        }
        commit('toastMsg', msg)
        await wait(duration || 2000)
        commit('toastMsg')
        cb && cb()
    },
    async getUserInfo ({state, commit, dispatch}) {
        try {
            let userInfo = await ajax.get(`/user/info?ck=${getCk()}&src=${src()}`)
            commit('userInfo', userInfo)
        } catch (e) {
            if (e.code === '136' || e.code === '102') {
                dispatch('clearLoginState')
                //  再次调起登陆
                dispatch('doAuth')
                return false
            }
            dispatch('showToast', e.message + '/user/info')
        }
    },

    /*   我的消息   */
    async getMessageList ({commit, dispatch, state}, pageNum = 1) {
        if (state.msgAllData.isReadyGet && !state.msgAllData.isNoneMessList) {
            state.msgAllData.isReadyGet = false
            state.msgAllData.isAddMessList = true
            try {
                const {notifies_list} = await ajax.get(`/notify/pull?ck=${getCk()}&platform=${platform}&page=${pageNum}&src=${src()}`)
                state.msgAllData.isAddMessList = false
                state.msgAllData.isReadyGet = true
                notifies_list.forEach(item => {
                    item.valid = true
                })
                if (pageNum === 1) {
                    state.msgAllData.messageList = []
                }
                let messageList = [...state.msgAllData.messageList]
                if (notifies_list.length <= 0) {
                    state.msgAllData.isNoneMessList = true
                    return false
                }
                state.msgAllData.messPageNum++
                messageList = messageList.concat(notifies_list)
                commit('setMessageList', messageList)
            } catch (e) {
                dispatch('showToast', e.message)
            }
        }
    },
    async lqPrize ({commit, dispatch}, pid) {
        try {
            const prizeInfo = await ajax.get(`/activity/prize/dole?pid=${pid}&ck=${getCk()}&platform=${platform}&src=${src()}`)
            prizeInfo.prize.pid = pid
            commit('lqSuccess', prizeInfo.prize)
            dispatch('getUserInfo')
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    /* 赛事记录 */
    async getGoldList ({commit, dispatch}, matchid) {
        if (matchid === 'undefined' || matchid === undefined) {
            matchid = 0
        }
        try {
            const goldlist = await ajax.post(`/trade/gold/list?matchid=${matchid}&ck=${getCk()}&platform=${platform}&src=${src()}`)

            commit('setGoldList', goldlist)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    /*  充值 */
    async do500_qqsdPay ({commit, dispatch}, params) {
        try {
            // 1,2  2  表示成功的回调
            params = Object.assign({}, params, {
                ck: getCk(),
                platform: platform,
                src: src()
            })
            const weChatData = await ajax.get(`/shops/gold/buy?${convertToQueryString(params)}`)
            const newChatData = Object.assign({}, weChatData, {'type': '14'})
            delete newChatData.product_id
            delete newChatData.product_name
            delete newChatData.return_url

            // console.log({
            //     'pid': weChatData.product_id,
            //     'fee': weChatData.paymoney,
            //     'title': weChatData.product_name,
            //     'pay_type': '1', /* 1微信支付 2 支付宝支付 */
            //     'mix': newChatData
            // })
            if (window.qqsdApp && weChatData) {
                try {
                    // app 支付
                    qqsdApp.invoke('app_pay', {
                        'pid': weChatData.product_id,
                        'fee': weChatData.paymoney,
                        'title': weChatData.product_name,
                        'pay_type': '1', /* 1微信支付 2 支付宝支付 */
                        'mix': newChatData
                    })
                } catch (e) {
                    dispatch('showToast', '500qqsd支付出错')
                }
            } else {
                //  touch 支付
                // alert('走的H5 pay')
                dispatch('showToast', '支付失败请刷新再試一试')
             // location.replace(payUrl + '?' + convertToQueryString(params))
            }
        } catch (e) {
            if (e.code === '101') {
            } else {
                dispatch('showToast', e)
            }
        }
    },

    /* 微信充值 */
    async doWechatPay ({commit, dispatch}, params) {
        if (~location.href.indexOf('_@')) {
            location.href = location.href.slice(0, location.href.indexOf('_@'))
        }
        try {
            params.platform = platform
            params.src = src()
            const weChatData = await ajax.get(`/shops/gold/buy?${convertToQueryString(params)}`)
            await invokeWxzf(weChatData)
            dispatch('showToast', '支付成功')
            sessionStorage.removeItem('wx_code')
            window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx86d590e6cf755764&redirect_uri=' + location.href.split('?')[0].split('#')[0] + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')

            /* dispatch('showToast', {
             message: '支付成功',
             duration: 1000,
             cb: () => {
             sessionStorage.removeItem('wx_code')
             window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx86d590e6cf755764&redirect_uri=' + encodeURIComponent(location.href) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')
             }
             })
             */
        } catch (e) {
            if (e.code === '101') {
                dispatch('showToast', '支付未完成')
                sessionStorage.removeItem('wx_code')
                window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx86d590e6cf755764&redirect_uri=' + location.href.split('?')[0].split('#')[0] + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')
            } else {
                dispatch('showToast', e.message)
                sessionStorage.removeItem('wx_code')
                window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx86d590e6cf755764&redirect_uri=' + location.href.split('?')[0].split('#')[0] + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')
            }
        }
    },

    /*  充值列表 */
    async getChargeList ({commit, dispatch}) {
        try {
            const chargeList = await ajax.get(`/shops/golds/list?ck=${getCk()}&platform=${platform}&src=${src()}`)
            commit('setChargeList', chargeList)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    /*  我的充值icon列表 */
    async getFootballPropsList ({commit, dispatch}) {
        try {
            const footballPropsList = await ajax.get(`/personal/props/list?ck=${getCk()}&src=${src()}&platform=${platform}`)
            commit('setFootballPropsList', footballPropsList)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    // 赛事统计  统计数据
    async getFootballStat ({commit, dispatch}, matchid) {
        try {
            let footballStatData = await ajax.get(`/match/football/stat?src=${src()}&matchid=${matchid}&platform=${platform}`)
            footballStatData.stats && commit('setfootballStatData', footballStatData.stats)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    // 赛事统计
    async getFootballCase ({commit, dispatch}, matchid) {
        try {
            let footballCaseData = await ajax.get(`/match/football/case?src=${src()}&matchid=${matchid}&platform=${platform}`)
            footballCaseData.cases && commit('setfootballCaseData', footballCaseData.cases)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    async localLogin ({commit}, code) {
        let {ck} = await ajax.get(`/login/guest?deviceid=${code}`)
        localStorage.setItem('ck', ck)
        commit('ck', ck)
    },

    /* 新增 */
    async getHomeInfo ({commit, dispatch, state}) {
        try {
            const homeInfo = await ajax.get(`/home/info?location=shops&src=${src()}&platform=${platform}`)
            if (homeInfo.banner) {
                if (homeInfo.banner.length) {
                    commit('setBannerScrollData', homeInfo.banner)
                } else {
                    const bannerScrollData = []
                    bannerScrollData.push('恭喜小土豆**抽到<strong>iPhone7 (红)</strong>')
                    bannerScrollData.push('恭喜小土豆**抽到<strong>500元京东卡</strong>')
                    bannerScrollData.push('恭喜yan**抽到<strong>100元联通话费卡</strong>')
                    commit('setBannerScrollData', bannerScrollData)
                }
            }
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getGoodsList ({commit, dispatch}) {
        try {
            const goodsList = await ajax.get(`/shops/goods/lists?platform=${platform}&src=${src()}`)
            commit('setGoodsList', goodsList)
        } catch (e) {
            if (~e.message.indexOf('未登录') || ~e.message.indexOf('其他设备登录')) {
                dispatch('clearLoginState')
                dispatch('doAuth')
                return false
            }
            dispatch('showToast', e.message)
        }
    },
    async getWinGoodList ({commit, dispatch}) {
        try {
            const winGoodList = await ajax.get(`/shops/lottery/records?&ck=${getCk()}&page=1&limit=100&src=${src()}&platform=${platform}`)
            commit('setWinGoodList', winGoodList)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getAddressMess ({commit, dispatch, state}) {
        try {
            const addressMess = await ajax.get(`/shipping/address/get?platform=${platform}&ck=${getCk()}&src=${src()}`)
            if (!Object.keys(addressMess).length) {
                addressMess.consignee = ''
                addressMess.mobile = ''
                addressMess.street = ''
                addressMess.isEmptyAdd = true
            } else {
                addressMess.isEmptyAdd = false
            }
            addressMess.province = addressMess.province || ''
            addressMess.city = addressMess.city || ''
            addressMess.district = addressMess.district || ''

            addressMess.allAddress = '' + addressMess.province + addressMess.city + addressMess.district
            // state.AddressId = addressMess.aid  // TODO 这里要改掉
            commit('setAddressMess', addressMess)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async addAddress ({state, commit, dispatch}, oid) {
        let ck = getCk()
        let newOid = ''

        if (!state.shopAddData.addressMess.consignee) {
            state.shopAddData.addressMess.consignee = ''
        }
        if (!state.shopAddData.addressMess.province) {
            state.shopAddData.addressMess.province = ''
        }
        if (!state.shopAddData.addressMess.city) {
            state.shopAddData.addressMess.city = ''
        }
        if (!state.shopAddData.addressMess.district) {
            state.shopAddData.addressMess.district = ''
        }
        if (!state.shopAddData.addressMess.street) {
            state.shopAddData.addressMess.street = ''
        }
        // 订单id
        // 判断一下 oid
        if (oid) {
            newOid = oid
            state.shopAddData.confirmAddrBtn = true
        } else {
            newOid = ''
        }
        if (!state.shopAddData.addressMess.mobile) {
            state.shopAddData.addressMess.mobile = ''
        }
        try {
            const result = await ajax.get(`/shipping/address/add?platform=${platform}&ck=${ck}&consignee=${state.shopAddData.addressMess.consignee}&mobile=${state.shopAddData.addressMess.mobile}
&country=中国&city=${state.shopAddData.addressMess.city}&province=${state.shopAddData.addressMess.province}&district=${state.shopAddData.addressMess.district}&street=${state.shopAddData.addressMess.street}
&oid=${newOid}&src=${src()}`)
            // 如果是未确认的保存
            state.shopAddData.AddressId = result.aid
            commit('setIsSaveBtn', true)
            commit('setIsConfirmBtn', true)
            dispatch('showToast', result.msg)
            setTimeout(() => {
                window.history.back()
            }, 1000)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async modifyAddress ({state, commit, dispatch}, oid) {
        let ck = getCk()
        if (!state.shopAddData.addressMess.consignee) {
            state.shopAddData.addressMess.consignee = ''
        }
        if (!state.shopAddData.addressMess.province) {
            state.shopAddData.addressMess.province = ''
        }
        if (!state.shopAddData.addressMess.city) {
            state.shopAddData.addressMess.city = ''
        }
        if (!state.shopAddData.addressMess.district) {
            state.shopAddData.addressMess.district = ''
        }
        if (!state.shopAddData.addressMess.street) {
            state.shopAddData.addressMess.street = ''
        }
        if (!oid) {
            dispatch('showToast', '订单id 有误')
            return false
        }

        if (!state.shopAddData.addressMess.aid) {
            state.shopAddData.addressMess.aid = ''
        }

        if (!state.shopAddData.addressMess.mobile) {
            state.shopAddData.addressMess.mobile = ''
        }
        try {
            await ajax.get(`/shipping/address/modify?platform=${platform}&ck=${ck}&consignee=${state.shopAddData.addressMess.consignee}&mobile=${state.shopAddData.addressMess.mobile}
&country=中国&city=${state.shopAddData.addressMess.city}&province=${state.shopAddData.addressMess.province}&district=${state.shopAddData.addressMess.district}&street=${state.shopAddData.addressMess.street}
&oid=${oid}&aid=${state.shopAddData.addressMess.aid}&src=${src()}`)
            dispatch('showToast', '确认收货地址成功')
            commit('setIsConfirmBtn', true)
            setTimeout(() => {
                window.history.back()
            }, 1000)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    async getGotoLuckMess ({commit, dispatch}, item) {
        try {
            const {goods_detail, restcard} = await ajax.get(`/shops/goods/detail?ck=${getCk()}&goodsid=${item.goodsid}&platform=${platform}&src=${src()}&goodstype=${item.goodstype}&company=${item.company}`)
            commit('setGotoLuckMess', goods_detail)
            commit('setChooseIDCartNumber', restcard)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    async getLuckGoodBingo ({commit, dispatch}, obj) {
        try {
            let sendLuckStr = ''
            if (obj.company) {
                sendLuckStr = `/shops/goods/bingo?ck=${getCk()}&goodsid=${obj.currGoodsid}&consumgolds=${obj.currConsumgolds}&platform=${platform}&goodstype=${obj.goodstype}&src=${src()}&company=${obj.company}`
            } else {
                sendLuckStr = `/shops/goods/bingo?ck=${getCk()}&goodsid=${obj.currGoodsid}&consumgolds=${obj.currConsumgolds}&platform=${platform}&goodstype=${obj.goodstype}&src=${src()}`
            }
            const luckGoodBingo = await ajax.get(sendLuckStr)
            commit('setLuckGoodBingo', luckGoodBingo)
        } catch (e) {
            commit('setLuckGoodBingo', null)
            dispatch('showToast', e.message)
        }
    },

    async doCharge ({commit, dispatch, state}, params) {
        let ck = getCk()
        let urlStr = ''
        try {
            const baseUrl = location.origin + location.pathname + '?params=_@_' + ck
            // 1,2         // 1 取消支付  2 支付成功

            // console.log(baseUrl + '_@_2')
            // console.log(baseUrl + '_@_1')

            params = Object.assign({}, params, {
                return_url: baseUrl + '_@_2',
                show_url: baseUrl + '_@_1',
                ck: ck,
                platform: platform,
                src: src()
            })
            const weChatData = await ajax.get(`/shops/gold/buy?${convertToQueryString(params)}`)
            location.href = weChatData.req
        } catch (e) {
            if (e.code === '101') {
            } else {
                dispatch('showToast', e.message)
            }
        }
    },
    /* 物流 */
    async getLogisticMess ({commit, dispatch}, orderNum) {
        try {
            const logisticMess = await ajax.get(`/logistics/get?sid=${orderNum}&src=${src()}`)
            commit('setLogisticMess', logisticMess)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    initWebsocket ({commit, state, dispatch}) {
        return new Promise((resolve, reject) => {
            let sock = new WebSocket(`${baseURL}/wapcrazybet`)
            let interval = null
            let flag = 0
            let hasFinished = false
            sock.onmessage = function (e) {
                if (!~e.data.indexOf('you said')) {
                    let data = JSON.parse(e.data)
                    commit('updateSocketData', data)
                } else {
                    // alert('收到服务端心跳')
                }
            }
            sock.onopen = function () {
                if (state.socket.latestSub) {
                    sock.send(state.socket.latestSub)
                }
                interval = setInterval(() => {
                    sock.send('x')
                }, 10000)
                flag = 1
                if (hasFinished) return
                hasFinished = true
                resolve()
            }
            sock.onclose = function () {
                console.warn('websocket 重连')
                clearInterval(interval)
                setTimeout(() => {
                    commit('addConnectNum')
                    dispatch('initWebsocket')
                }, 5000)
            }
            sock.onerror = function (e) {
                console.error('sock error')
                e.code = '102'
                if (flag === 1) return
                if (hasFinished) return
                hasFinished = true
                reject(e)
            }
            setTimeout(() => {
                if (hasFinished) return
                hasFinished = true
                let error = new Error('超时')
                error.code = '103'
                reject(error)
            }, 1000)
            commit('initSocket', {sock, interval})
        })
    },

    subscribe ({commit, state}, {ptype, body}) {
        try {
            let latestSub = JSON.stringify({
                ptype,
                action: 'sub',
                body
            })
            state.socket.sock && state.socket.sock.send(latestSub)
            commit('setLatestSub', latestSub)
        } catch (e) {
            console.error(e.message)
        }
    },
    unsubscribe ({commit, state}, {ptype, body}) {
        try {
            state.socket.sock && state.socket.sock.send(JSON.stringify({
                ptype,
                action: 'unsub',
                body
            }))
        } catch (e) {
            console.error(e.message)
        }
    }
}
export default () => new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        main,
        home,
        feedback,
        regPerson
    }
})
