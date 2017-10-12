/**
 *  10-12
 */
import ajax from '~common/ajax'
import Vue from 'vue'
import {platform, src, getCk, convertArrToObj, convertToQueryString, mapMutations, mapActions} from '~common/util'
const state = {
    fmdetail: null, // 投注页所有数据


}
const mutationsInfo = mapMutations({
    setNationGetRed (state, data) {
        state.nationGetRed = data
    },

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

}, 'main')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}
