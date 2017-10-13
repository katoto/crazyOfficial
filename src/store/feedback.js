/**
 *  10-12
 */
import ajax from '~common/ajax'
import Vue from 'vue'
import {platform, src, getCk, convertArrToObj, convertToQueryString, mapMutations, mapActions} from '~common/util'
const state = {
    kefuAlert:true,
    feedbackList:null,
    fbMore:null,
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
    },
    setFbMore( state ,data ){
        state.fbMore = data
    }
}, 'feedback')

/**
 * 赔率 数据处理
 * @param odds 接口回来的所有数据  ruleType 要查询的赔率数据 selection 用户的选择项
 * * @returns 赔率
 */
function _getPeilv ( ) {
}

const actionsInfo = mapActions({

    async getFeedbackList ({commit, dispatch}) {
        try {
            // let InfoData = await ajax.get(`/activity/redpack/info?src=${src}&ck=${getCk()}&platform=${platform}`);
            let InfoData = await ajax.get(`/feedback/list?src=${src}&ck=${getCk()}&platform=${platform}`)
            console.log(InfoData)
            commit(mTypes.setFeedbackList, InfoData)
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async getfbListMore ({commit, dispatch},fbId) {
        try {
            // let InfoData = await ajax.get(`/activity/redpack/info?src=${src}&ck=${getCk()}&platform=${platform}`);
            let InfoData = await ajax.get(`/feedback/view?fb_id=${fbId}&src=${src}&ck=${getCk()}&platform=${platform}`)
            console.log(InfoData)
            commit(mTypes.setFbMore, InfoData)
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
