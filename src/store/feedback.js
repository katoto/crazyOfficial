/**
 *  10-12
 */
import ajax from '~common/ajax'
import Vue from 'vue'
import {platform, src, getCk, convertArrToObj, convertToQueryString, mapMutations, mapActions} from '~common/util'
const state = {
    kefuAlert:true,
    feedbackList:null,
}
const mutationsInfo = mapMutations({
    setNationGetRed (state, data) {
        state.nationGetRed = data
    },
    setkefuAlert (state, data) {
        state.kefuAlert = data
    },
    setFeedbackList(state,data){
        state.feedbackList = data
    }

}, 'feedback')

/**
 * 赔率 数据处理
 * @param odds 接口回来的所有数据  ruleType 要查询的赔率数据 selection 用户的选择项
 * * @returns 赔率
 */
function _getPeilv (odds, ruleType, selection) {
    throw new Error('getPeiLv 回来的数据有问题，刷新试一下')
}

const actionsInfo = mapActions({

    async getRedTimeInfo ({commit, dispatch}) {
        try {
            // let InfoData = await ajax.get(`/activity/redpack/info?src=${src}&ck=${getCk()}&platform=${platform}`);
            let InfoData = await ajax.get(`http://crazybet.choopaoo.com:7899/activity/redpack/info?src=${src}&ck=${getCk()}&platform=${platform}`)
            console.log(InfoData)
            commit(mTypes.setNationGetRed, InfoData)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },

    async getFeedbackList ({commit, dispatch}) {
        try {
           let ck= 'OTk5OTM1MDQwY2UwZmY4MWIyYThlYzQ3Y2FjOGUzMzVlNjAzNjE4'
            // let InfoData = await ajax.get(`/activity/redpack/info?src=${src}&ck=${getCk()}&platform=${platform}`);
            let InfoData = await ajax.get(`http://192.168.50.12:9899/feedback/list?src=${src}&ck=${ck}&platform=${platform}`)
            console.log(InfoData)
            commit(mTypes.setFeedbackList, InfoData)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
}, 'main')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}
