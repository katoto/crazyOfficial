/**
 * Created by xiezg on 2017/3/10.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '~common/ajax'
import {addCookie, removeCookie, platform, src, wait, convertToQueryString, getCk} from '~common/util'
import main from './main'
import home from './home'
import feedback from './feedback'
import regPerson from './regPerson'
import router from '../router'
import $ from 'bc-zepto.full'

Vue.use(Vuex)

let baseURL = 'ws://192.168.41.76:6999'
if (process.env.NODE_ENV === 'production') {
    baseURL = 'wss://crazybet.choopaoo.com/wss'
} else if (process.env.NODE_ENV === 'preRelease') {
    baseURL = 'ws://192.168.41.76:6999'
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
    isHideHomeHead: false, // 隐藏头部
    activeBox: {
        showActBox: false // 弹窗
    },
    showHeightTips: false,

    kefuAlert: true

}
const mutations = {
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
        addCookie('ck', ck)
        localStorage.setItem('ck', ck)
    },
    removeCk (state) {
        state.ck = ''
        addCookie('ck', '')
        localStorage.setItem('ck', '')
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
    clearLoginState ({commit, dispatch}, data) {
        commit('ck', '')
        addCookie('ck', '')
        localStorage.setItem('ck', '')
    },

    /* 检查是否登录 */
    async checkLogin ({commit, dispatch}, params) {
        try {
            const hasCk = await getCk()
            if (hasCk && hasCk !== 'undefined' && hasCk !== '') {
                commit('setIsLogin', true)
            } else {
                commit('setIsLogin', false)
            }
        } catch (e) {
            dispatch('showToast', '检查ck有误')
        }
    },

    async doAuth ({commit, dispatch}) {
        try {
            /* 处理登陆（调登陆 ） */
            router.push('/login')
            dispatch('clearLoginState')
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
        console.log('message')
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
                src: src
            })
            const weChatData = await ajax.get(`/shops/gold/buy?${convertToQueryString(params)}`)
            const newChatData = Object.assign({}, weChatData, {'type': '14'})
            delete newChatData.product_id
            delete newChatData.product_name
            delete newChatData.return_url

            console.log({
                'pid': weChatData.product_id,
                'fee': weChatData.paymoney,
                'title': weChatData.product_name,
                'pay_type': '1', /* 1微信支付 2 支付宝支付 */
                'mix': newChatData
            })
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
            params.src = src
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

            dispatch('showToast', result.msg)
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

            console.log(baseUrl + '_@_2')
            console.log(baseUrl + '_@_1')

            params = Object.assign({}, params, {
                return_url: baseUrl + '_@_2',
                show_url: baseUrl + '_@_1',
                ck: ck,
                platform: platform,
                src: src
            })
            console.log(params)
            const weChatData = await ajax.get(`/shops/gold/buy?${convertToQueryString(params)}`)
            console.log(weChatData)
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
