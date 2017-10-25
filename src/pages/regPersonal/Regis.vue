<template>
    <div id="user" class="wrap respon2">
        <div class="header ">
            <div class="top">
                <div class="icon_back"
                     v-tap="{methods:goPageFn,target:'backHistory' }"
                ></div>
                <a href="javascript:;" class="to-login"
                   v-tap="{methods:goPageFn,target:'login' }"
                >登录</a>
                <!--登录主页时这个a隐藏-->
            </div>
            <div class="logo"></div>
            <p class="">畅玩猜球 新用户立领888币</p>
            <!--登录主页隐藏这个p，注册才显示-->
        </div>
        <div class="reg-c">
            <div >
                <div class="user-co user-phone">
                    <span class="user-icon phone-icon"></span>
                    <input type="tel" v-model="telNumber" @focus="checkTelNumberFocus" id="LoPhone" @input="inpEvent" @blur="checkTel" name="phone" placeholder="手机号">
                    <span class="delete" v-if="telNumber && !telNumberBlur" v-tap="{ methods:delNumber ,params:'telNumber'}"></span>

                </div>
                <div class="user-co user-pass">
                    <span class="user-icon pas-icon"></span>
                    <span
                          v-tap="{ methods:showCodeFn}" :class="{ 'eye-iconOn':showCode ,'eye-iconOff':!showCode }"
                    ></span>
                    <input type="password" v-model="userPassWord" @focus="checkuserPassWordFocus" id="passDom" @blur="checkPassWord" @input="inpEvent" name="password" placeholder="密码">
                    <span class="delete" v-if="userPassWord && !userPassWordBlur" v-tap="{ methods:delNumber ,params:'userPassWord'}"></span>

                </div>
                <div class="user-co user-msg">
                    <span class="user-icon msg-icon"></span>
                    <input type="text" @input="inpEvent" @focus="checkTelCodeFocus" @blur="checkCode" id="LoCode" v-model="telCode" name="check" placeholder="4位短信验证码">
                    <span class="delete" v-if="telCode && !telCodeBlur" v-tap="{ methods:delNumber ,params:'telCode'}"></span>

                </div>
                <!--1 or user-msg02-->
                <a href="javascript:;"
                   v-tap="{ methods:sendCodeFn }" class="user-co" :class="{'user-msg01':telNumber.length === 11 , 'user-msg02': telNumber.length !== 11 || addUnable }"
                >
                    {{ countDownStr }}
                </a>

                <div class="overflow">
                    <span class="reg-warning" v-if="rGTips">
                        {{ rGTips }}
                    </span>
                    <span class="reg-prompt" v-if="showWarn && !rGTips">
                        密码过于简单，建议使用数字加字符
                    </span>
                </div>

                <button class="btn btn-reg" v-tap="{ methods:sendSubmit}" :class="{'btn-unable':!telCode || !telNumber || !userPassWord }">
                    立即注册
                </button>
                <!--btn-unable 不可点击-->
            </div>
            <p class="reg-tips">创建帐号即代表你同意 <a href="javascript:;"
                  v-tap="{methods:goPageFn,target:'regProtocol' }"
            >用户协议</a> </p>
        </div>
    </div>
</template>

<script>

    import {aTypes, mTypes} from '~store/regPerson'
    export default {
        data () {
            return {
                telNumber: '',
                telCode: '',
                userPassWord: '',
                userName: '',
                showCode: false,
                codeType: 'password',
                countDownStr: '获取验证码',
                addUnable: false,

                telNumberBlur: true,
                userPassWordBlur: true,

                telCodeBlur: true,
                showWarn: false
            }
        },
        methods: {
            checkTelNumberFocus () {
                this.telNumberBlur = false
                this.$store.commit(mTypes.setrGTips, '')
            },
            checkuserPassWordFocus () {
                document.getElementById('passDom').setAttribute('placeholder', '6-16位数字或字符')
                if (this.isSerError) {
                    this.$store.commit(mTypes.setrGTips, '')
                }
                this.userPassWordBlur = false
                this.showWarn = false
            },
            checkCode (e) {
                this.telCodeBlur = true
                this.$store.commit(mTypes.setIsSerError, false)

                if (e.target.value.length !== 4) {
                    this.$store.commit(mTypes.setrGTips, '请输入4位验证码')
                    return false
                } else {
                    this.$store.commit(mTypes.setrGTips, '')
                }
            },
            checkTelCodeFocus () {
                this.telCodeBlur = false
//                this.$store.commit(mTypes.setrGTips , '');
            },
            sendSubmit () {
                let sendData = null
                if (!this.telCode || !this.telNumber || !this.userPassWord) {
                    return false
                }
            /* 提交 */
                if (this.telNumber === '') {
                    this.$store.commit(mTypes.setIsSerError, false)
                    this.$store.commit(mTypes.setrGTips, '请输入手机号')

                    return false
                } else if (this.telCode === '') {
                    this.$store.commit(mTypes.setIsSerError, false)
                    this.$store.commit(mTypes.setrGTips, '请输入4位验证码')

                    return false
                } else if (this.userPassWord === '') {
                    this.$store.commit(mTypes.setIsSerError, false)
                    this.$store.commit(mTypes.setrGTips, '请设置6~12位数字、字母组合密码')
                    return false
                }
                document.getElementById('LoPhone').blur()
                document.getElementById('passDom').blur()
                document.getElementById('LoCode').blur()

        /* 提交数据  divicedid */
                sendData = Object.assign({}, {
                    logintype: 'reg',
                    mobile: this.telNumber,
                    verifycode: this.telCode,
                    password: this.userPassWord
                })
                this.$store.dispatch(aTypes.setRegis, sendData)
        /* function  */
            },
            goPageFn ({ target }) {
                target = target || 'backHistory'
                switch (target) {
                case 'login':
                    _hmt.push(['_trackEvent', '合伙人注册页登陆点击', 'click', '合伙人注册页登陆'])
                    if (this.isSendTelLogin) {
                        this.$store.commit(mTypes.autoTelNumber, this.telNumber)
                    } else {
                        this.$store.commit(mTypes.autoTelNumber, null)
                    }
                    this.$store.commit(mTypes.isSendTelLogin, false)
                    this.$router.push(`/login`)
                    break
                case 'regProtocol':
                    this.$router.push(`/regProtocol`)
                    break
                case 'backHistory':
                    window.history.back()
                    break
                }
            },
            async sendCodeFn () {
                if (this.telNumber === '') { return false }
                let tel_reg = /^1[34578]\d{9}$/
                if (tel_reg.test(this.telNumber)) {
                    let codeTime = 60
                    let times = null
                    if (this.countDownStr !== '获取验证码') {
                        return false
                    }
                    await this.$store.dispatch(aTypes.getTelCode, this.telNumber)
                    if (this.isCodeTime) {
                        this.countDownStr = '重发（' + codeTime + 's）'
                        this.addUnable = true
                        times = setInterval(() => {
                            codeTime = codeTime - 1
                            if (codeTime === 0) {
                                this.countDownStr = '获取验证码'
                                this.addUnable = false
                                codeTime = 60
                                clearInterval(times)
                            } else {
                                this.countDownStr = '重发（' + codeTime + 's）'
                                this.addUnable = true
                            }
                        }, 1000)
                    } else {
                        clearInterval(times)
                    }
                } else {
                    this.$store.commit(mTypes.setIsSerError, false)
                    this.$store.commit(mTypes.setrGTips, '请输入正确的手机号')
                }
            },
            delNumber ({ params }) {
                switch (params) {
                case 'telNumber':
                    this.telNumber = ''
                    break
                case 'userPassWord':
                    this.userPassWord = ''
                    break
                case 'telCode':
                    this.telCode = ''
                    break
                }
            },
            checkPassWord (e) {
                let pass_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
                let isAllNumber = /^[0-9]*$/
                let isAllStr = /^[A-Za-z]*$/
                document.getElementById('passDom').setAttribute('placeholder', '密码')
                this.userPassWordBlur = true
                if (isAllNumber.test(e.target.value) && e.target.value !== '' ) {
                    console.log('密码过于简单，建议使用数字加字符')
                    this.showWarn = true
                    return false
                }
                if (isAllStr.test(e.target.value) && e.target.value !== '') {
                    console.log('密码过于简单，建议使用数字加字符')
                    this.showWarn = true
                    return false
                }
                if (!(pass_reg.test(e.target.value)) && e.target.value !== '') {
                    this.$store.commit(mTypes.setIsSerError, true)
                    this.$store.commit(mTypes.setrGTips, '请设置6~12位数字、字母组合密码')
                }
            },
            checkTel (e) {
                let tel_reg = /^1[34578]\d{9}$/
                this.telNumberBlur = true
                if (!(tel_reg.test(e.target.value)) && e.target.value !== '') {
                    this.$store.commit(mTypes.setIsSerError, false)
                    this.$store.commit(mTypes.setrGTips, '请输入正确的手机号')
                }
            },
            showCodeFn () {
                if (this.showCode) {
                    document.getElementById('passDom').setAttribute('type', 'password')
                } else {
                    document.getElementById('passDom').setAttribute('type', 'text')
                }
                this.showCode = !(this.showCode)
            },
            inpEvent (e) {
                if (e.target.name === 'phone') {
                    if (e.target.value.length > 11) {
                        this.telNumber = e.target.value.slice(0, 11)
                    }
                }
                if (e.target.name === 'check') {
                    this.$store.commit(mTypes.setrGTips, '')
                    if (e.target.value.length > 4) {
                        this.telCode = e.target.value.slice(0, 4)
                    }
                }
                if (e.target.name === 'password') {
                    if (e.target.value.length > 25) {
                        this.userPassWord = e.target.value.slice(0, 25)
                    }
                }
            }

        },
        computed: {
            isCodeTime () {
                return this.$store.state.regPerson.isCodeTime
            },
            regisData () {
                return this.$store.state.regPerson.regisData
            },
            rGTips () {
                return this.$store.state.regPerson.rGTips
            },
            isSerError () {
                return this.$store.state.regPerson.isSerError
            },
            isSendTelLogin () {
                return this.$store.state.regPerson.isSendTelLogin
            },
            autoTelNumber () {
                return this.$store.state.regPerson.autoTelNumber
            },
            autoGoRegisterTel () {
                return this.$store.state.regPerson.autoGoRegisterTel
            },
            autoGoRegisterPass () {
                return this.$store.state.regPerson.autoGoRegisterPass
            }
        },
        mounted () {
            this.$store.commit(mTypes.isSendTelLogin, false)
        },
        watch: {
            regisData (regisData) {
                console.log('watch', regisData)
                if (regisData.ck) {
                    /* 可以到后台 */
                    let _this = this;
                    this.$store.commit('ck', regisData.ck)
                    this.$store.dispatch('showToast', {
                        duration: 1000,
                        message: '注册成功',
                        cb: () => {
                            /* 来源 ！！！！！！！ */
                            _this.$router.push(`/h5/home/`);
                        }
                    })
                    setTimeout(() => {
                        _this.$store.dispatch('getUserInfo');
                        _this.$store.dispatch('checkLogin')
                    }, 10)
                } else {
                    this.$router.push(`/register`)
                }
            }
        }
    }
</script>
<style>
    .user-msg02{
        border-color: #32343e;
    }
</style>
