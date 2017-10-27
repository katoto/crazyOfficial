/**
 * Created by xiezg on 2017/10/19.
 */

import ajax from '~common/ajax'
import {platform, convertToQueryString, src, getCk, mapMutations, mapActions} from '~common/util'
import router from '../router'
const state = {
    IsShowImgCode: null,
    nameResultCode: null,
    loginData: null,
    regisData: null,
    resetSign: null,
    showImg: false,

    PCTips: null,

    LoTips: null,
    isSerError: false,

    rGTips: null,

    isSendTelLogin: false,
    autoTelNumber: null,

    autoLoginNumber: null,
    autoLoginPassword: null,

    fPTips: null,

    isCodeTime: false

}
const mutationsInfo = mapMutations({
    isCodeTime (state, data) {
        state.isCodeTime = data
    },
    autoLoginNumber (state, data) {
        state.autoLoginNumber = data
    },

    autoLoginPassword (state, data) {
        state.autoLoginPassword = data
    },

    autoTelNumber (state, data) {
        state.autoTelNumber = data
    },
    isSendTelLogin (state, data) {
        state.isSendTelLogin = data
    },
    setrGTips (state, data) {
        state.rGTips = data
    },
    setIsSerError (state, data) {
        state.isSerError = data
    },
    setLoTips (state, data) {
        state.LoTips = data
    },
    setPCTips (state, data) {
        state.PCTips = data
    },
    setfPTips (state, data) {
        state.fPTips = data
    },

    setShowImg (state, data) {
        state.showImg = data
    },
    setIsShowImgCode (state, data) {
        state.IsShowImgCode = data
    },
    setNameResultCode (state, data) {
        state.nameResultCode = data
    },

    setLoginData (state, data) {
        state.loginData = data
    },
    setRegis (state, data) {
        state.regisData = data
    },
    setcheckWdReset (state, data) {
        state.resetSign = data
    }
}, 'regPerson')

const actionsInfo = mapActions({
    async setUserImg ({commit, state, dispatch}, img) {
        /* 重置密码 */
        try {
            let nameResult = null
            nameResult = await ajax.get(`/user/modfiy/photo?photo=${img}&ck=${getCk()}`)
            dispatch('getUserInfo')
            dispatch('showToast', {
                message: '选择成功',
                cb: () => {
                    commit(mTypes.setShowImg, false)
                }
            })
        } catch (e) {
            if (e.code) {

            } else {
                dispatch('showToast', e.message)
            }
        }
    },
    async renameNickName ({commit, state, dispatch}, nickName) {
        /* 重置密码 */
        try {
            let nameResult = null
            nameResult = await ajax.get(`/user/modfiy/username?username=${nickName}&ck=${getCk()}`)
            dispatch('getUserInfo')
            dispatch('showToast', {
                message: '修改成功',
                cb: () => {
                    if (nameResult !== '') {
                        commit(mTypes.setNameResultCode, nameResult)
                    }
                }
            })
        } catch (e) {
            if (e.status) {
                dispatch('showToast', e.message)
            } else {
                dispatch('showToast', e.message)
            }
        }
    },
    async passWdReset ({commit, state, dispatch}, params) {
        /* 重置密码 */
        try {
            let resetData = null
            resetData = await ajax.get(`/user/modfiy/password?mobile=${params.mobile}&sign=${state.resetSign}&password=${params.password}`)
            commit('removeCk')
            dispatch('showToast', {
                message: '密码设置成功',
                cb: () => {
                    commit(mTypes.autoLoginNumber, params.mobile)
                    commit(mTypes.autoLoginPassword, params.password)
                    router.push('/login')
                }
            })
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async checkWdReset ({commit, dispatch}, params) {
        /*  重置密码验证手机code  */
        try {
            let checkData = null
            checkData = await ajax.get(`/user/modfiy/password/verifycode?mobile=${params.mobile}&verifycode=${params.verifycode}&platform=${platform}`)
            commit(mTypes.setcheckWdReset, checkData.sign)
        } catch (e) {
            if (e.code) {
                switch (e.code) {
                case '20101':
                case '20102':
                case '20103':
                case '20104':
                case '20105':
                case '20106':
                case '20107':
                case '20108':
                    commit(mTypes.setIsSerError, true)
                    commit(mTypes.setfPTips, e.message)
                    ; break
                }
            } else {
                dispatch('showToast', e.message)
            }
        }
    },
    async getTelCode ({state, commit, dispatch}, data) {
        // 获tel
        // /login/mobile/sms?mobile=13319403333
        try {
            let codeData
            if (typeof data === 'object' && data.vtype && typeof data.vtype === 'string') {
                codeData = await ajax.get(`/login/mobile/sms?mobile=${data.mobile}&vtype=${data.vtype}`)
            } else {
                codeData = await ajax.get(`/login/mobile/sms?mobile=${data}`)
            }
            commit(mTypes.isCodeTime, true)
        } catch (e) {
            if (e.code === '242') {
                dispatch('showToast', '验证码发送次数已达5次，请明天再试')
                return false
            }
            commit(mTypes.isCodeTime, false)
            dispatch('showToast', e.message)
            if (e.message === '手机号已经注册') {
                commit(mTypes.isSendTelLogin, true)
            }
        }
    },
    async getIsShowImgCode ({state, commit, dispatch}, deviceId) {
        // 获tel
        // /login/mobile/sms?mobile=13319403333
        try {
            let IsShowImgCode = await ajax.get(`/login/verifycode/code?deviceid=${deviceId}`)
            if (IsShowImgCode !== '') {
                commit(mTypes.setIsShowImgCode, IsShowImgCode)
            }
        } catch (e) {
            dispatch('showToast', e.message)
        }
    },
    async setRegis ({state, commit, dispatch}, data) {
        /* 注册 */
        let sendData = Object.assign(data, {
            platform: platform,
            src: src(),
            channel: src()
        })
        // 是否需要
        try {
            let regisData = await ajax.post(`/login/mobile`, sendData)
            if (regisData !== '') {
                commit(mTypes.setRegis, regisData)
            }
        } catch (e) {
            if (e.code) {
                switch (e.code) {
                case '20101':
                case '20102':
                case '20103':
                case '20104':
                case '20105':
                case '20106':
                case '20107':
                case '20108':
                    commit(mTypes.setIsSerError, true)
                    commit(mTypes.setrGTips, e.message)
                        ; break
                }
            } else {
                dispatch('showToast', e.message)
            }
        }
    },
    async doLogin ({state, commit, dispatch}, data) {
        /* 注册 */
        let sendData = Object.assign(data, {
            platform: platform,
            src: src(),
            channel: src()
        })
        // 是否需要
        try {
            let loginData = await ajax.post(`/login/mobile`, sendData)
            if (loginData !== '' && loginData.ck) {
                commit(mTypes.setLoginData, loginData)
            } else {
                commit(mTypes.setIsSerError, true)
                commit(mTypes.setLoTips, '账号或者密码错误，请重新输入')
                dispatch(aTypes.getIsShowImgCode, localStorage.getItem('deviceTime'))
            }
        } catch (e) {
            if (e.code) {
                dispatch(aTypes.getIsShowImgCode, localStorage.getItem('deviceTime'))
                switch (e.code) {
                case '20101':
                case '20102':
                case '20103':
                case '20104':
                case '20105':
                case '20106':
                case '20107':
                case '20108':
                    commit(mTypes.setIsSerError, true)
                    commit(mTypes.setLoTips, e.message)
                    ; break
                }
            } else {
                dispatch('showToast', e.message)
            }
        }
    }

}, 'regPerson')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}
