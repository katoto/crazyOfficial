/**
 * Created by lichun on 2017/5/10.
 */
import ajax from '~common/ajax'
import Vue from 'vue'
import {platform, src, getCk, convertArrToObj, convertToQueryString, mapMutations, mapActions} from '~common/util'
const state = {
    fmdetail: null, // 投注页所有数据
    faqiState: 0, // 发起订单状态， 0代表没有发起， 1代表前端点击了， 服务端还没返回，2代表订单确认成功,
    stateChange: {}, // 赔率的状态变化
    needReFetch: false,  // 是一个标识字段， 标识是否需要再次获取 fmdetail数据
    bannerData: [],  // 头部滚动消息
    playnum: 0, //  玩家字段
    currentMatchID_my: 0, // 传到赛事记录

    nationGetRed: null // 国足活动

}

const mutationsInfo = mapMutations({
    setNationGetRed (state, data) {
        state.nationGetRed = data
    },

    setCurrentMatchID_my (state, data) {
        state.currentMatchID_my = data
    },

    setBannerData (state, bannerData) {
        state.bannerData = bannerData
    },
    setFmdetail (state, fmdetail) {
        state.fmdetail = fmdetail
    },
    updateOdds (state, newOdds) {
        let stateChange = {}
        let needReFetch = false

        if (state.fmdetail && newOdds[100] && state.fmdetail.odds[100] && state.fmdetail.odds[100].State !== newOdds[100].State) {
            if (newOdds[100] && newOdds[100].State === '3') {
                window.location.reload()
                return false
            }
        }
        for (let newOdd in newOdds) {
            switch (newOdd) {
            case '100':
                if (state.fmdetail.odds[100].State !== newOdds[100].State) {
                    state.fmdetail.odds[100].State = newOdds[100].State
                    needReFetch = true
                }
                state.fmdetail.odds[100].VerifyResult = newOdds[100].VerifyResult
                if (state.fmdetail.odds[100].Selections[1].BackOdds && newOdds[100].Selections[1].BackOdds !== state.fmdetail.odds[100].Selections[1].BackOdds) {
                    stateChange['1001'] = true
                    state.fmdetail.odds[100].Selections[1].BackOdds = newOdds[100].Selections[1].BackOdds
                }
                if (state.fmdetail.odds[100].Selections[1].State !== newOdds[100].Selections[1].State) {
                    state.fmdetail.odds[100].Selections[1].State = newOdds[100].Selections[1].State
                    needReFetch = true
                }
                if (newOdds[100].Selections[0].BackOdds && newOdds[100].Selections[0].BackOdds !== state.fmdetail.odds[100].Selections[0].BackOdds) {
                    stateChange['1000'] = true
                    state.fmdetail.odds[100].Selections[0].BackOdds = newOdds[100].Selections[0].BackOdds
                }
                if (state.fmdetail.odds[100].Selections[0].State !== newOdds[100].Selections[0].State) {
                    state.fmdetail.odds[100].Selections[0].State = newOdds[100].Selections[0].State
                    needReFetch = true
                }
                if (state.fmdetail.odds[100].Selections[-1].BackOdds && state.fmdetail.odds[100].Selections[-1].BackOdds !== newOdds[100].Selections[-1].BackOdds) {
                    stateChange['100-1'] = true
                    state.fmdetail.odds[100].Selections[-1].BackOdds = newOdds[100].Selections[-1].BackOdds
                }
                if (state.fmdetail.odds[100].Selections[-1].State !== newOdds[100].Selections[-1].State) {
                    state.fmdetail.odds[100].Selections[-1].State = newOdds[100].Selections[-1].State
                    needReFetch = true
                };
                break
            case '130':
                state.fmdetail.odds[130].VerifyResult = newOdds[130].VerifyResult

                if (state.fmdetail.odds[130].State !== newOdds[130].State) {
                    state.fmdetail.odds[130].State = newOdds[130].State
                    needReFetch = true
                }
                if (newOdds[130].Selections[1].BackOdds && state.fmdetail.odds[130].Selections[1].BackOdds !== newOdds[130].Selections[1].BackOdds) {
                    stateChange['1301'] = true
                    state.fmdetail.odds[130].Selections[1].BackOdds = newOdds[130].Selections[1].BackOdds
                }
                if (state.fmdetail.odds[130].Selections[1].State !== newOdds[130].Selections[1].State) {
                    state.fmdetail.odds[130].Selections[1].State = newOdds[130].Selections[1].State
                    needReFetch = true
                }
                if (newOdds[130].Selections[-1].BackOdds && state.fmdetail.odds[130].Selections[-1].BackOdds !== newOdds[130].Selections[-1].BackOdds) {
                    stateChange['130-1'] = true
                    state.fmdetail.odds[130].Selections[-1].BackOdds = newOdds[130].Selections[-1].BackOdds
                }
                if (state.fmdetail.odds[130].Selections[-1].State !== newOdds[130].Selections[-1].State) {
                    state.fmdetail.odds[130].Selections[-1].State = newOdds[130].Selections[-1].State
                    needReFetch = true
                };
                break
            case '350':
                if (Array.isArray(newOdds[350])) {
                    newOdds[350] = convertArrToObj(newOdds[350], 'nextscore')
                }
                    // obj
                if (!Array.isArray(state.fmdetail.odds[350])) {
                    let arr = []
                    for (let key in state.fmdetail.odds[350]) {
                        arr.push(state.fmdetail.odds[350][key])
                    }
                    state.fmdetail.odds[350] = arr
                }
                state.fmdetail.odds[350] = convertArrToObj(state.fmdetail.odds[350], 'nextscore')

                if (state.fmdetail.odds[350] && newOdds[350] && state.fmdetail.odds[350].length !== newOdds[350].length) {
                    needReFetch = true
                }
                for (let nextscore in state.fmdetail.odds[350]) {
                    if (newOdds[350][nextscore]) {
                        if (newOdds[350][nextscore].State !== state.fmdetail.odds[350][nextscore].State) {
                            state.fmdetail.odds[350][nextscore].State = newOdds[350][nextscore].State
                            needReFetch = true
                        }
                        state.fmdetail.odds[350][nextscore].VerifyResult = newOdds[350][nextscore].VerifyResult
                        if (newOdds[350][nextscore].Selections[1].BackOdds && state.fmdetail.odds[350][nextscore].Selections[1].BackOdds !== newOdds[350][nextscore].Selections[1].BackOdds) {
                            stateChange[`3501-${nextscore}`] = true
                            state.fmdetail.odds[350][nextscore].Selections[1].BackOdds = newOdds[350][nextscore].Selections[1].BackOdds
                        }
                        if (state.fmdetail.odds[350][nextscore].Selections[1].State !== newOdds[350][nextscore].Selections[1].State) {
                            state.fmdetail.odds[350][nextscore].Selections[1].State = newOdds[350][nextscore].Selections[1].State
                            needReFetch = true
                        }
                        if (newOdds[350][nextscore].Selections[0].BackOdds && state.fmdetail.odds[350][nextscore].Selections[0].BackOdds !== newOdds[350][nextscore].Selections[0].BackOdds) {
                            stateChange[`3500-${nextscore}`] = true
                            state.fmdetail.odds[350][nextscore].Selections[0].BackOdds = newOdds[350][nextscore].Selections[0].BackOdds
                        }
                        if (newOdds[350][nextscore].Selections[0].State !== newOdds[350][nextscore].Selections[0].State) {
                            state.fmdetail.odds[350][nextscore].Selections[0].State = newOdds[350][nextscore].Selections[0].State
                            needReFetch = true
                        }
                        if (newOdds[350][nextscore].Selections[-1].BackOdds && state.fmdetail.odds[350][nextscore].Selections[-1].BackOdds !== newOdds[350][nextscore].Selections[-1].BackOdds) {
                            stateChange[`350-1-${nextscore}`] = true
                            state.fmdetail.odds[350][nextscore].Selections[-1].BackOdds = newOdds[350][nextscore].Selections[-1].BackOdds
                        }
                        if (state.fmdetail.odds[350][nextscore].Selections[-1].State !== newOdds[350][nextscore].Selections[-1].State) {
                            state.fmdetail.odds[350][nextscore].Selections[-1].State = newOdds[350][nextscore].Selections[-1].State
                            needReFetch = true
                        }
                    } else {
                        console.log('无350赔率变化')
                    }
                };
                break
            case '410':
                if (state.fmdetail.odds[410].State !== newOdds[410].State) {
                    state.fmdetail.odds[410].State = newOdds[410].State
                    needReFetch = true
                }
                    //  8个情况 一一比较
                state.fmdetail.odds[410].VerifyResult = newOdds[410].VerifyResult
                for (let i = 1, len = 7; i <= len; i++) {
                    if (state.fmdetail.odds[410].Selections[i] && state.fmdetail.odds[410].Selections[i].BackOdds && newOdds[410].Selections[i].BackOdds !== state.fmdetail.odds[410].Selections[i].BackOdds) {
                        stateChange['410' + i] = true
                        state.fmdetail.odds[410].Selections[i].BackOdds = newOdds[410].Selections[i].BackOdds
                    }
                    if (state.fmdetail.odds[410].Selections[i] && state.fmdetail.odds[410].Selections[i].State !== newOdds[410].Selections[i].State) {
                        state.fmdetail.odds[410].Selections[i].State = newOdds[410].Selections[i].State
                        needReFetch = true
                    }
                }
                    // 7+ 情况
                if (newOdds[410].Selections[-1].BackOdds && state.fmdetail.odds[410].Selections[-1].BackOdds !== newOdds[410].Selections[-1].BackOdds) {
                    stateChange['410-1'] = true
                    state.fmdetail.odds[410].Selections[-1].BackOdds = newOdds[410].Selections[-1].BackOdds
                }
                if (state.fmdetail.odds[410].Selections[-1].State !== newOdds[410].Selections[-1].State) {
                    state.fmdetail.odds[410].Selections[-1].State = newOdds[410].Selections[-1].State
                    needReFetch = true
                };
                break
            case '140':
                if (state.fmdetail.odds[140].State !== newOdds[140].State) {
                    state.fmdetail.odds[140].State = newOdds[140].State
                    needReFetch = true
                }
                state.fmdetail.odds[140].VerifyResult = newOdds[140].VerifyResult
                for (let key in newOdds[140].Selections) {
                    if (newOdds[140].Selections[key] && newOdds[140].Selections[key].BackOdds && state.fmdetail.odds[140].Selections[key].BackOdds !== newOdds[140].Selections[key].BackOdds) {
                        stateChange['140' + key] = true
                        state.fmdetail.odds[140].Selections[key].BackOdds = newOdds[140].Selections[key].BackOdds
                    }
                    if (state.fmdetail.odds[140].Selections[key] && state.fmdetail.odds[140].Selections[key].State !== newOdds[140].Selections[key].State) {
                        state.fmdetail.odds[140].Selections[key].State = newOdds[140].Selections[key].State
                        needReFetch = true
                    }
                };
                break
            default:
                console.log('没匹配到对应的类型')
                break
            }
        }
        state.needReFetch = needReFetch
        state.stateChange = stateChange
    },
    beginFaqi (state) {
        state.faqiState = 1
    },
    faqiSuccess (state, info) {
        if (info.status === '100') {
            let codd
            switch (info.ruleType) {
            case '100':
            case '410':
            case '140':
            case '130':
                if (state.fmdetail.odds[info.ruleType].RuleType === info.ruleType) codd = state.fmdetail.odds[info.ruleType]
                break
            case '350':
                if (!Array.isArray(state.fmdetail.odds[info.ruleType])) {
                    let arr = []
                    for (let key in state.fmdetail.odds[info.ruleType]) {
                        arr.push(state.fmdetail.odds[info.ruleType][key])
                    }
                    state.fmdetail.odds[info.ruleType] = arr
                }
                state.fmdetail.odds[info.ruleType].forEach(odd => {
                    if (odd.RuleType === info.ruleType) {
                        codd = odd
                    }
                })
                break
            default :
                throw new Error('ruleType Faqisuccess 不对')
            }
            let selection = codd.Selections[info.selection]

            if (!selection.prize_state) {
                Vue.set(selection, 'prize_state', '-1')
            }
            if (!selection.golds) {
                Vue.set(selection, 'golds', info.golds + '')
                selection.bonus || Vue.set(selection, 'bonus', parseInt(Number(info.golds) * Number(info.odds)) + '')
            } else {
                selection.golds = parseInt(selection.golds) + Number(info.golds) + ''
                selection.bonus = parseInt(Number(selection.bonus) + Number(info.golds) * Number(info.odds)) + ''
            }
            state.faqiState = 2
        } else {
            state.faqiState = 0
        }
    },
    resetState (state, type) {
        if (type === 'peilv') {
            state.stateChange = {}
        } else if (type === 'faqi') {
            state.faqiState = 0
        } else if (type === 'reFetch') {
            state.needReFetch = false
        }
    }
}, 'main')

/**
 * 赔率 数据处理
 * @param odds 接口回来的所有数据  ruleType 要查询的赔率数据 selection 用户的选择项
 * * @returns 赔率
 */
function _getPeilv (odds, ruleType, selection) {
    let codd = null
    switch (ruleType) {
    case '100':
    case '410':
    case '140':
    case '130':
        if (odds[ruleType].RuleType === ruleType) codd = odds[ruleType]
        break
    case '350':
            // console.log(odds[ruleType])
        if (!Array.isArray(odds[ruleType])) {
            let arr = []
            for (let key in odds[ruleType]) {
                arr.push(odds[ruleType][key])
            }
            odds[ruleType] = arr
        }
        odds[ruleType].forEach(odd => {
            if (odd.RuleType === ruleType) {
                codd = odd
            }
        })
        break
    default :
        throw new Error('ruleType 不对')
    }
    if (codd) {
        return codd.Selections[selection].BackOdds
    }
    throw new Error('getPeiLv 回来的数据有问题，刷新试一下')
}

const actionsInfo = mapActions({

    async getRedTimeInfo ({commit, dispatch}) {
        try {
            // let InfoData = await ajax.get(`/activity/redpack/info?src=${src()}&ck=${getCk()}&platform=${platform}`);
            let InfoData = await ajax.get(`http://crazybet.choopaoo.com:7899/activity/redpack/info?src=${src()}&ck=${getCk()}&platform=${platform}`)
            console.log(InfoData)
            commit(mTypes.setNationGetRed, InfoData)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    async getHomeInfo ({commit, dispatch}, matchid) {
        try {
            const defaultBanner = ['恭喜小土豆**抽到<strong>iPhone7 (红)</strong>', '恭喜yan**抽到<strong>100元联通话费卡</strong>', '恭喜小土豆**抽到<strong>500元京东卡</strong>']
            let {banner} = await ajax.get(`/home/info?location=home&src=${src()}&matchid=${matchid}&platform=${platform}`)
            if (banner) {
                banner = banner.concat(defaultBanner)
            } else {
                banner = defaultBanner
            }
            commit(mTypes.setBannerData, banner)
        } catch (e) {
            dispatch('showToast', '取home/info接口错误')
        }
    },
    async getFootballMatchDetail ({commit, dispatch}, matchid) {
        try {
            let fmdetail = await ajax.get(`/match/football/detail?matchid=${matchid}&ck=${getCk()}&platform=${platform}&src=${src()}`)
            if (fmdetail.odds) {
                let ruleType350 = []
                //
                for (let i = 0, len = fmdetail.odds.length; i < len; i++) {
                    fmdetail.odds[i].Selections = convertArrToObj(fmdetail.odds[i].Selections, 'Selection')
                    if (fmdetail.odds[i].RuleType && fmdetail.odds[i].RuleType === '350') {
                        ruleType350.push(fmdetail.odds[i])
                    }
                }
                fmdetail.odds = convertArrToObj(fmdetail.odds, 'RuleType')
                fmdetail.odds[350] = []
                if (ruleType350.length !== 0) {
                    fmdetail.odds[350] = ruleType350
                }
                commit(mTypes.setFmdetail, fmdetail)
                return fmdetail
            }
        } catch (e) {
            dispatch('showToast', '取home/info接口错误')
        }
    },
    updateMarkets ({commit}, odds) {
        let ruleType350 = []
        for (let i = 0, len = odds.length; i < len; i++) {
            odds[i].Selections = convertArrToObj(odds[i].Selections, 'Selection')
            if (odds[i].RuleType && odds[i].RuleType === '350') {
                ruleType350.push(odds[i])
                continue
            }
        }
        odds = convertArrToObj(odds, 'RuleType')
        if (ruleType350.length !== 0) {
            odds[350] = ruleType350
        }
        commit(mTypes.updateOdds, odds)   // 更新赔率
    },
    fetchMatchInfoByHttp ({commit, dispatch}, matchid) {
        return ajax.get(`/match/football/market?cptype=&matchid=${matchid}&platform=${platform}&src=${src()}`).then((data) => {
            // dispatch(aTypes.updateMarkets, data.Markets)
            let ruleType350 = []
            for (let i = 0, len = data.Markets.length; i < len; i++) {
                data.Markets[i].Selections = convertArrToObj(data.Markets[i].Selections, 'Selection')
                if (data.Markets[i].RuleType && data.Markets[i].RuleType === '350') {
                    ruleType350.push(data.Markets[i])
                    continue
                }
            }
            data.Markets = convertArrToObj(data.Markets, 'RuleType')
            data.Markets[350] = []
            if (ruleType350.length !== 0) {
                data.Markets[350] = ruleType350
            }
            return data.Markets
        }
        )
    },
    faqi (context, params) {
        Object.assign(params, {src: src()})
        let urlStr = convertToQueryString(params)
        urlStr = '?' + urlStr
        return ajax.get(`/trade/gold/order` + urlStr).then(data => data.orderid)
    },

    async faqiOrder ({commit, dispatch}, params) {
        params.ck = getCk()
        params.cptype = ''
        params.platform = platform
        commit(mTypes.beginFaqi)
        try {
            let odds = await dispatch(aTypes.fetchMatchInfoByHttp, params.matchid_me)
            params.odds = _getPeilv(odds, params.ruletype, params.selection)
            await dispatch(aTypes.faqi, params)
            commit(mTypes.faqiSuccess, {
                status: '100',
                odds: params.odds,
                golds: params.golds,
                ruleType: params.ruletype,
                selection: params.selection
            })
            dispatch('getUserInfo')
        } catch (e) {
            switch (e.code) {
            case '104': // 充值
                dispatch('showToast', e.message)
                break
            case '102':
            case '136':
                break // 登录异常
            case '105':
                dispatch('showToast', '下单失败，请稍后再试')
                break
            default:
                // dispatch('showToast', e.message)
                dispatch('showToast', '网络错误，请稍后再试')
            }
            commit(mTypes.faqiSuccess, {
                status: '102'
            })
        }
    }
}, 'main')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}
