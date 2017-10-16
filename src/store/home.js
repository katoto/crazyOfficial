
import ajax from '~common/ajax'
import {platform, src, getCk, namespace, cptype, convertArrToObj, convertToQueryString} from '~common/util'

const ns = namespace('home')

const state = {
    matchList_hot: null,  // 热门赛事
    matchList_play: null,  // 直播中
    matchList_noEnd: null,  // 全部赛事，未结束
    matchList_end: null,  // 结束列表
    crazymainScrollData: null,  // 滚动数据
    scrollNumber: '5',
    matchHotData: null,
    currentBetSelect: null,
    faqiState: 0, // 发起订单状态， 0代表没有发起， 1代表前端点击了， 服务端还没返回，2代表订单确认成功,
    rankList: null,  // 排行榜
    signList: null,  // 签到列表
    showRankbox: false,  //  显示，隐藏盈利榜
    showSignbox: false,   // 显示，隐藏 签到框
    showJinbi: { isShow: false, coinNumber: null, coinTitle: '' },  // 显示，金币 标题

    matchList_interval: null,  // 定时器用
    matchIDStr: '',    // 比赛id 字符串
    BackOddsChange: {},  // 赔率改变变化颜色
    runListNumber: 0,
    hidehotMatchID: 0, // 隐藏列表里的焦点赛事
    selectedNum: 0, // 选择金币

    homeActivitiesData: null, // 活动数据
    betListNumber: 0,
    activityListData: null  // 运营数据

}

export const actionTypes = {
    getActivityList: ns('getActivityList'),  // 新增活动运营弹窗
    clearActivityHot: ns('clearActivityHot'),  // 新增活动运营小红点

    getcrazyMainInfo: ns('getcrazyMainInfo'),
    getFootballMatchList: ns('getFootballMatchList'),
    getFootballMatchList_end: ns('getFootballMatchList_end'),
    faqiOrder_matchList: ns('faqiOrder_matchList'),
    getrankList: ns('getrankList'),
    getSignList: ns('getSignList'),
    marketSign: ns('marketSign'),

    setIntervalFn: ns('setIntervalFn'),
    clearIntervalFn: ns('clearIntervalFn'),
    sockDataFn: ns('sockDataFn'),
    showJinbiBox: ns('showJinbiBox')

}
export const mutationTypes = {
    homeInfo: ns('homeInfo'),

    activityData: ns('activityData'),
    matchList_hot: ns('matchList_hot'),
    matchList_play: ns('matchList_play'),
    matchHotData: ns('matchHotData'),
    matchList_noEnd: ns('matchList_noEnd'),
    matchList_end: ns('matchList_end'),
    currentBetSelect: ns('currentBetSelect'),
    rankList: ns('rankList'),
    signList: ns('signList'),
    showRankbox: ns('showRankbox'),
    showMessbox: ns('showMessbox'),
    showSignbox: ns('showSignbox'),
    showJinbi: ns('showJinbi'),

    faqiSucc: ns('faqiSucc'),
    changeState: ns('changeState'),
    setMatchList_interval: ns('setMatchList_interval'),
    setmatchIDStr: ns('setmatchIDStr'),
    runListNumber: ns('runListNumber'),
    betListNumber: ns('betListNumber'),
    hidehotMatchID: ns('hidehotMatchID'),
    setSelectedNum: ns('setSelectedNum')

}
const mutations = {

    // 设置金币
    [mutationTypes.setSelectedNum] (state, data) {
        state.selectedNum = data
    },
    // 设置hidehotMatchID
    [mutationTypes.hidehotMatchID] (state, data) {
        state.hidehotMatchID = data
    },
    // 设置matchIDStr
    [mutationTypes.setmatchIDStr] (state, data) {
        state.matchIDStr = data
    },
    //  设置定时器 值
    [mutationTypes.setMatchList_interval] (state, data) {
        state.matchList_interval = data
    },
    [mutationTypes.homeInfo] (state, data) {
        if (data.banner) {
            if (data.banner.length) {
                data.banner && data.banner.push('恭喜小土豆**抽到<strong>iPhone7 (红)</strong>')
                data.banner && data.banner.push('恭喜yan**抽到<strong>100元联通话费卡</strong>')
                state.crazymainScrollData = data.banner
            } else {
                state.crazymainScrollData = []
                state.crazymainScrollData.push('恭喜小土豆**抽到<strong>iPhone7 (红)</strong>')
                state.crazymainScrollData.push('恭喜yan**抽到<strong>100元联通话费卡</strong>')
                state.crazymainScrollData.push('恭喜小土豆**抽到<strong>500元京东卡</strong>')
            }
        }
        if (data.playnum) {
            state.scrollNumber = data.playnum
        }
        if (data.homeActivities) {
            state.homeActivitiesData = data.homeActivities
        }
    },
    [mutationTypes.matchList_hot] (state, data) {
        state.matchList_hot = data
    },
    [mutationTypes.matchList_play] (state, data) {
        state.matchList_play = data
    },
    [mutationTypes.matchHotData] (state, data) {
        state.matchHotData = data
    },
    [mutationTypes.matchList_noEnd] (state, data) {
        state.matchList_noEnd = data
    },
    [mutationTypes.matchList_end] (state, data) {
        state.matchList_end = data
    },
    [mutationTypes.currentBetSelect] (state, data) {
        state.currentBetSelect = data
    },
    [mutationTypes.rankList] (state, data) {
        state.rankList = data
    },
    [mutationTypes.signList] (state, data) {
        state.signList = data
    },
    [mutationTypes.showRankbox] (state, data) {
        state.showRankbox = data
    },
    [mutationTypes.showMessbox] (state, data) {
        state.showMessbox = data
    },
    [mutationTypes.showSignbox] (state, data) {
        state.showSignbox = data
    },
    [mutationTypes.showJinbi] (state, data) {
        state.showJinbi = data
    },

    [mutationTypes.changeState] (state, data) {
        state.faqiState = data
    },

    [mutationTypes.runListNumber] (state, data) {
        state.runListNumber = data
    },
    [mutationTypes.betListNumber] (state, data) {
        state.betListNumber = data
    },
    [mutationTypes.faqiSucc] (state, info) {
        if (info.status === '100') {
            state.faqiState = 2
            switch (info.choseList) {
            case 'hot':
                if (Array.isArray(state.matchList_hot)) {
                    state.matchList_hot.forEach((item) => {
                        if (item.MatchID === info.matchID) {
                            item.isPurchased = '1'  //  已投
                        }
                    })
                }
                ;break
            case 'run':
                if (Array.isArray(state.matchList_play)) {
                    state.matchList_play.forEach((item) => {
                        if (item.MatchID === info.matchID) {
                            item.isPurchased = '1'  //  已投
                        }
                    })
                }
                ;break
            case 'total':
                if (Array.isArray(state.matchList_noEnd)) {
                        //  两层循环
                    state.matchList_noEnd.forEach((items) => {
                        if (Array.isArray(items.list)) {
                            items.list.forEach((item) => {
                                if (item.MatchID === info.matchID) {
                                    item.isPurchased = '1'  //  已投
                                }
                            })
                        }
                    })
                };
                break
            }
        } else {
            state.faqiState = 0
            state.currentBetSelect = null
        }
    },
    [mutationTypes.activityData] (state, data) {
        state.activityListData = data
    }

}
const actions = {
    /**
     * 处理sock 回来的数据
     */
    [actionTypes.sockDataFn] ({commit, dispatch, state}, info) {
        if (info.mtype && info.mtype === '4') {
            let isClearBackOddsChange = false
            if (Object.keys(info.Markets).length <= 0) { return false }
            //  赔率变化 赔率变化
            switch (info.matchStyle) {
            case 'hot':
                var storeMatchListHot = state.matchList_hot
                if (storeMatchListHot && Array.isArray(storeMatchListHot)) {
                    storeMatchListHot.forEach((item) => {
                            // 缺一个matchOntime
                        if (item.MatchID === info.MatchID) {
                            if (info.Markets && item.odds.State !== info.Markets.State) {
                                item.odds.State = info.Markets.State
                            }
                            if (item.odds && item.odds.Selections[1] && info.Markets && item.odds.Selections[1].BackOdds !== info.Markets.Selections[0]) {
                                item.odds.Selections[1].BackOdds = info.Markets.Selections[0]
                                state.BackOddsChange[info.MatchID + '_1'] = true
                                isClearBackOddsChange = true
                            }
                            if (item.odds && item.odds.Selections[0] && info.Markets && item.odds.Selections[0].BackOdds !== info.Markets.Selections[1]) {
                                item.odds.Selections[0].BackOdds = info.Markets.Selections[1]
                                state.BackOddsChange[info.MatchID + '_0'] = true
                                isClearBackOddsChange = true
                            }
                            if (item.odds && item.odds.Selections[-1] && info.Markets && item.odds.Selections[-1].BackOdds !== info.Markets.Selections[2]) {
                                item.odds.Selections[-1].BackOdds = info.Markets.Selections[2]
                                state.BackOddsChange[info.MatchID + '_-1'] = true
                                isClearBackOddsChange = true
                            }
                        }
                    })
                }
                ;break
            case 'newhot':
                var storeMatchListHot = state.matchList_hot
                if (storeMatchListHot && Array.isArray(storeMatchListHot)) {
                    storeMatchListHot.forEach((item) => {
                        // 缺一个matchOntime
                        if (item.MatchID === info.MatchID) {
                            if (info.Markets && item.odds.State !== info.Markets.State) {
                                item.odds.State = info.Markets.State
                            }
                            if (item.odds && item.odds.Selections[1] && info.Markets && item.odds.Selections[1].BackOdds !== info.Markets.Selections[0]) {
                                item.odds.Selections[1].BackOdds = info.Markets.Selections[0]
                                state.BackOddsChange[info.MatchID + '_1'] = true
                                isClearBackOddsChange = true
                            }
                            if (item.odds && item.odds.Selections[0] && info.Markets && item.odds.Selections[0].BackOdds !== info.Markets.Selections[1]) {
                                item.odds.Selections[0].BackOdds = info.Markets.Selections[1]
                                state.BackOddsChange[info.MatchID + '_0'] = true
                                isClearBackOddsChange = true
                            }
                            if (item.odds && item.odds.Selections[-1] && info.Markets && item.odds.Selections[-1].BackOdds !== info.Markets.Selections[2]) {
                                item.odds.Selections[-1].BackOdds = info.Markets.Selections[2]
                                state.BackOddsChange[info.MatchID + '_-1'] = true
                                isClearBackOddsChange = true
                            }
                        }
                    })
                }
                ;break
            case 'run':
                let storeMatchListPlay = state.matchList_play
                if (storeMatchListPlay && Array.isArray(storeMatchListPlay)) {
                    storeMatchListPlay.forEach((item) => {
                            // 缺一个matchOntime  封盘的状态
                        if (item.MatchID === info.MatchID) {
                            if (info.Markets && item.odds.State !== info.Markets.State) {
                                item.odds.State = info.Markets.State
                            }
                            if (item.odds && item.odds.Selections[1] && info.Markets && item.odds.Selections[1].BackOdds !== info.Markets.Selections[0]) {
                                item.odds.Selections[1].BackOdds = info.Markets.Selections[0]
                                state.BackOddsChange[info.MatchID + '_1'] = true
                                isClearBackOddsChange = true
                            }
                            if (item.odds && item.odds.Selections[0] && info.Markets && item.odds.Selections[0].BackOdds !== info.Markets.Selections[1]) {
                                item.odds.Selections[0].BackOdds = info.Markets.Selections[1]
                                state.BackOddsChange[info.MatchID + '_0'] = true
                                isClearBackOddsChange = true
                            }
                            if (item.odds && item.odds.Selections[-1] && info.Markets && item.odds.Selections[-1].BackOdds !== info.Markets.Selections[2]) {
                                item.odds.Selections[-1].BackOdds = info.Markets.Selections[2]
                                state.BackOddsChange[info.MatchID + '_-1'] = true
                                isClearBackOddsChange = true
                            }
                        }
                    })
                }
                ;break
            case 'total':
                let storeMatchListnoEnd = state.matchList_noEnd
                if (storeMatchListnoEnd && Array.isArray(storeMatchListnoEnd)) {
                    storeMatchListnoEnd.forEach((items) => {
                            // 缺一个matchOntime  封盘的状态
                        if (items.list && Array.isArray(items.list)) {
                            items.list.forEach((item) => {
                                if (item.MatchID === info.MatchID) {
                                    if (info.Markets && item.odds.State !== info.Markets.State) {
                                        item.odds.State = info.Markets.State
                                    }
                                    if (item.odds && item.odds.Selections[1] && info.Markets && item.odds.Selections[1].BackOdds !== info.Markets.Selections[0]) {
                                        item.odds.Selections[1].BackOdds = info.Markets.Selections[0]
                                        state.BackOddsChange[info.MatchID + '_1'] = true
                                        isClearBackOddsChange = true
                                    }
                                    if (item.odds && item.odds.Selections[0] && info.Markets && item.odds.Selections[0].BackOdds !== info.Markets.Selections[1]) {
                                        item.odds.Selections[0].BackOdds = info.Markets.Selections[1]
                                        state.BackOddsChange[info.MatchID + '_0'] = true
                                        isClearBackOddsChange = true
                                    }
                                    if (item.odds && item.odds.Selections[-1] && info.Markets && item.odds.Selections[-1].BackOdds !== info.Markets.Selections[2]) {
                                        item.odds.Selections[-1].BackOdds = info.Markets.Selections[2]
                                        state.BackOddsChange[info.MatchID + '_-1'] = true
                                        isClearBackOddsChange = true
                                    }
                                }
                            })
                        }
                    })
                }
                ;break
            }
            if (isClearBackOddsChange) {
                setTimeout(() => {
                    state.BackOddsChange = {}
                }, 1000)
            }
        }
        if (info.mtype && info.mtype === '2') {
            //  事件变化  类型
            if (info.case && info.case.caseType) {
                switch (info.case.caseType) {
                case '101065':   // 确认的主队进球
                case '102089':   // 确认客队进球
                case '100010':   // 开始上半场(由主队开球，作为上半场计数开始)
                case '100012':   // 开始下半场(由主队开球，作为下半场计数开始)
                case '100014':   // 开始加时上半场(作为加时上半场计时)
                case '100016':   // 开始加时下半场(作为加时下半场计时)
                case '100018':   // 开始点球
                case '100001':   // 上半场结束
                case '100133':   // 中场休息
                case '100003':   // 下半场结束
                case '100149':   // 暂停
                case '100148':   // 重新开始
                case '100004':   // 开始加时赛上半场
                case '100005':   // 结束加时赛上半场
                case '100006':   // 开始加时赛下半场
                case '100007':   // 结束加时赛下半场
                case '100008':   // 点球开始
                case '100009':   // 点球结束
                case '100020':   // 游戏结束
                case '100782':   // 取消比赛
                    if (info.matchStyle) {
                        dispatch(actionTypes.getFootballMatchList, info.matchStyle); break
                    }
                }
            }
        }
    },

    /**
     * setInterval  做定时刷新用   函数如何调用 {  type time }
     */
    [actionTypes.setIntervalFn] ({commit, dispatch, state}, params) {
        let interval = state.matchList_interval
        if (interval) {
            clearInterval(interval)
            interval = null
        }
        switch (params.type) {
        case 'newhot':
            interval = setInterval(() => {
                dispatch(actionTypes.getFootballMatchList, 'newhot')
            }, params.time)
                ;break
        case 'hot':
            interval = setInterval(() => {
                dispatch(actionTypes.getFootballMatchList, 'hot')
            }, params.time)
            ;break
        case 'total':
            interval = setInterval(() => {
                dispatch(actionTypes.getFootballMatchList, 'total')
            }, params.time)
                ;break
        case 'end':
            interval = setInterval(() => {
                dispatch(actionTypes.getFootballMatchList_end, 'end')
            }, params.time)
                ;break
        }
        commit(mutationTypes.setMatchList_interval, interval)
    },

    /**
     * clearInterval  做定时刷新用   函数如何调用 {  type time }
     */
    [actionTypes.clearIntervalFn] ({commit, dispatch, state}, params) {
        let interval = state.matchList_interval
        if (interval) {
            clearInterval(interval)
            interval = null
        }
        commit(mutationTypes.setMatchList_interval, interval)
    },

    [actionTypes.showJinbiBox] ({commit, dispatch}, resp) {
        commit(mutationTypes.showJinbi, {isShow: true, coinNumber: resp.golds, coinTitle: resp.coinTitle})
        setTimeout(() => {
            commit(mutationTypes.showJinbi, {isShow: false, coinNumber: 0, coinTitle: '首次登录奖励'})
        }, 2000)
    },
    /*   签到行为  */
    async [actionTypes.marketSign] ({commit, dispatch, state}, idx = '1') {
        try {
            const resp = await ajax.get(`/activity/market/sign?cptype=${cptype}&ck=${getCk()}&platform=${platform}&src=${src}&idx=${idx}`)
            if (resp) {
                commit(mutationTypes.showSignbox, false)
                dispatch(actionTypes.showJinbiBox, resp)
                let changeIdx = +idx - 1
                let oldSignList = state.signList
                oldSignList[changeIdx].sign = '1'
                // 金币的变化
                dispatch('getUserInfo')
                // 金币的变化
                commit(mutationTypes.signList, oldSignList)
            }
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    /*   签到列表  */
    async [actionTypes.getSignList] ({commit, dispatch}) {
        try {
            const resp = await ajax.get(`/activity/sign/list?cptype=${cptype}&ck=${getCk()}&platform=${platform}&src=${src}`)
            if (resp) {
                commit(mutationTypes.signList, resp.signlist)
            }
        } catch (e) {
            if (~e.message.indexOf('未登录') || ~e.message.indexOf('其他设备登录')) {
                // dispatch('clearLoginState', 0)
                // dispatch('doAuth')
                // return false
            }
            dispatch('showToast', e.message)
        }
    },
    /*   排行榜  */
    async [actionTypes.getrankList] ({commit, dispatch}) {
        try {
            const resp = await ajax.get(`/home/ranklist?cptype=${cptype}&ck=${getCk()}&platform=${platform}&src=${src}`)
            if (resp) {
                commit(mutationTypes.rankList, resp)
            }
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

        /* 发起订单 */
    async [actionTypes.faqiOrder_matchList] ({commit, dispatch}, params) {
        try {
            let ck = getCk()
            // if (!ck || ck === '') {
            //     return dispatch('doAuth')
            // }
            params.ck = ck
            params.cptype = cptype
            params.platform = platform
            commit(mutationTypes.changeState, 1)
            /* 确定最新赔率 */
            let marketdata = await ajax.get(`/match/football/market?cptype=${cptype}&matchid=${params.matchid}&platform=${platform}&src=${src}`)

            for (let i = 0, len = marketdata.Markets.length; i < len; i++) {
                marketdata.Markets[i].Selections = convertArrToObj(marketdata.Markets[i].Selections, 'Selection')
            }
            marketdata.Markets = convertArrToObj(marketdata.Markets, 'RuleType')
            params.odds = getPeilv(marketdata.Markets, params.ruletype, params.selection)
            Object.assign(params, {src: src})
            let qs = '?' + convertToQueryString(params)
            qs = decodeURIComponent(qs)
            let orderObj = await ajax.get(`/trade/gold/order` + qs)

            if (orderObj && orderObj.orderid !== '0') {
                let choseList = ''   // 改变的是hot 还是直播中，还是未结束
                if (~location.href.indexOf('hot')) {
                    choseList = 'hot'
                } else if (~location.href.indexOf('play')) {
                    choseList = 'run'
                } else if (~location.href.indexOf('noEnd')) {
                    choseList = 'total'
                }
                dispatch('getUserInfo')
                commit(mutationTypes.faqiSucc, {
                    status: '100',
                    matchID: params.matchid,
                    choseList: choseList
                })
            } else {
                dispatch('showToast', '下单失败，请刷新再试一下~')
                commit(mutationTypes.faqiSucc, {
                    status: '101',
                    matchID: params.matchid
                })
            }
        } catch (e) {
            if (e.code) {
                commit(mutationTypes.faqiSucc, {
                    status: e.code,
                    matchID: params.matchid
                })
                dispatch('showToast', '下单失败，请刷新再试一下~')
            }
            commit(mutationTypes.faqiSucc, {
                status: '101',
                matchID: params.matchid
            })
            // dispatch('showToast', e.message)
            dispatch('showToast', '网络异常，请稍后再试')
        }
        /**
         * 赔率 数据处理
         * @param odds 接口回来的所有数据  ruleType 要查询的赔率数据 selection 用户的选择项
         * * @returns 赔率
         */
        function getPeilv (odds, ruleType, selection) {
            let codd = null
            switch (ruleType) {
            case '100':
                if (odds[ruleType].RuleType === ruleType) codd = odds[ruleType]
                break
            default :
                throw new Error('getPeilv error不对')
            }
            if (codd) {
                return codd.Selections[selection].BackOdds
            }
            throw new Error('getPeiLv 回来的数据有问题，刷新试一下')
        }
    },

    /* 比赛列表  含热门 直播 全部未结束  */
    async [actionTypes.getFootballMatchList] ({commit, dispatch, state}, listtype = 'newhot') {
        try {
            const resp = await ajax.get(`/match/football/list?cptype=${cptype}&ck=${getCk()}&platform=${platform}&src=${src}&listtype=${listtype}`)
            if (resp) {
                let MaxIndex = 0
                let MaxWeight = 0
                switch (listtype) {
                case 'hot':
                case 'newhot':
                case 'run':
                    if (resp.RunNum && resp.BetNum) {
                        commit(mutationTypes.runListNumber, resp.RunNum)
                        commit(mutationTypes.betListNumber, resp.BetNum)
                    }
                    if (resp.matches && resp.matches.length > 0) {
                            //  隐患 arr
                        if (Array.isArray(resp.matches)) {
                            resp.matches.forEach((item, index) => {
                                if (item.weight && parseInt(item.weight) > MaxWeight) {
                                    MaxWeight = parseInt(item.weight)
                                    MaxIndex = index
                                }
                                if (item.odds) {
                                    item.odds.Selections = convertArrToObj(item.odds.Selections, 'Selection')
                                }
                            })
                        } else {
                            console.log('no arr')
                        }
                        if (listtype === 'hot' || listtype === 'newhot') {
                            commit(mutationTypes.matchHotData, resp.matches[MaxIndex])
                            resp.matches[MaxIndex] && commit(mutationTypes.hidehotMatchID, resp.matches[MaxIndex]['MatchID'])
                            commit(mutationTypes.matchList_hot, resp.matches)
                        } else if (listtype === 'run') {
                            commit(mutationTypes.matchList_play, resp.matches)
                        }
                    }
                    ;break
                case 'total':
                    if (resp.matches && resp.matches.length > 0) {
                            //  隐患 arr  两层循环
                        if (Array.isArray(resp.matches)) {
                            resp.matches.forEach((items) => {
                                if (Array.isArray(items.list)) {
                                    items.list.forEach((it) => {
                                        if (Array.isArray(it.odds.Selections)) {
                                            it.odds.Selections = convertArrToObj(it.odds.Selections, 'Selection')
                                        }
                                    })
                                }
                            })
                        } else {
                            console.error('total Matchlist  notArr')
                        }
                        let sliceData2 = resp.matches.slice(0, 2)
                        if (state.matchList_noEnd) {
                            commit(mutationTypes.matchList_noEnd, resp.matches)
                        } else {
                            commit(mutationTypes.matchList_noEnd, sliceData2)
                            setTimeout(() => {
                                commit(mutationTypes.matchList_noEnd, resp.matches)
                            }, 1000)
                        }
                    }
                    ;break
                }
            }
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    /* 比赛列表 已结束 */
    async [actionTypes.getFootballMatchList_end] ({commit, dispatch, state}) {
        try {
            const resp = await ajax.get(`/match/football/finished?cptype=${cptype}&ck=${getCk()}&platform=${platform}&src=${src}`)
            if (resp) {
                let sliceData1 = resp.matches.slice(0, 4)
                if (state.matchList_end) {
                    commit(mutationTypes.matchList_end, resp.matches)
                } else {
                    commit(mutationTypes.matchList_end, sliceData1)
                    setTimeout(() => {
                        commit(mutationTypes.matchList_end, resp.matches)
                    }, 800)
                }
            }
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    async [actionTypes.getcrazyMainInfo] ({commit, dispatch}) {
        try {
            const homeInfo = await ajax.get(`/home/info?location=home&src=${src}&platform=${platform}`)
            commit(mutationTypes.homeInfo, homeInfo)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
/* 活动中心 */
    async [actionTypes.getActivityList] ({commit, dispatch}) {
        try {
            const activityData = await ajax.get(`/activity/list?ck=${getCk()}&src=${src}&platform=${platform}`)
            commit(mutationTypes.activityData, activityData)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    /* 活动中心 清除小红点 */
    async [actionTypes.clearActivityHot] ({commit, dispatch}, number) {
        try {
            const activityHotBack = await ajax.get(`/activity/single?ck=${getCk()}&number=${number}&src=${src}&platform=${platform}`)
            console.log(activityHotBack)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    }

}

export default {state, mutations, actions}
