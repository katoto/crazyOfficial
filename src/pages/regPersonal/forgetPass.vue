<template>
    <div  id="user" class="wrap respon2">
        <div class="topBar">
            <div class="icon_back" v-tap="{methods:headBack}"></div>
            <h1>{{ forgetTitle }}</h1>
        </div>
        <div class="findPsd-c" :class="{'hide': nextBox }">
            <p class="find-tips">通过验证您的手机号找回密码</p>
            <div>
                <div class="user-co user-phone">
                    <span class="user-icon phone-icon"></span>
                    <input type="tel" v-model="telNumber" @input="inpEvent" id="LoPhone"  @focus="checkTelNumberFocus" @blur="checkTel" name="phone" placeholder="手机号">
                    <span class="delete" v-if="telNumber && !telNumberBlur" v-tap="{ methods:delNumber ,params:'telNumber'}"></span>

                </div>
                <div class="user-co user-msg">
                    <span class="user-icon msg-icon"></span>
                    <input type="text"  v-model="telCode" @focus="checkTelCodeFocus" id="LoCode" @blur="checkCode" @input="inpEvent" name="telCode" placeholder="4位短信验证码">
                    <span class="delete" v-if="telCode && !telCodeBlur" v-tap="{ methods:delNumber ,params:'telCode'}"></span>

                </div>
                <!--user-msg01 or user-msg02-->
                <a href="javascript:;"
                   v-tap="{ methods:sendCodeFn }" class="user-co" :class="{'user-msg01':telNumber.length ===11 , 'user-msg02':telNumber.length !==11 || addUnable}"
                >
                    {{ countDownStr }}
                </a>
                <div class="overflow">
                    <span class="reg-warning" v-if="fPTips">
                        {{ fPTips }}
                    </span>
                </div>

                <button class="btn btn-next"
                        :class="{'btn-unable': !telNumber || !telCode }"
                        v-tap="{ methods:forgetNext }"
                >
                    下一步
                </button>
            </div>
            <p class="find-tips01">遇到问题？请联系</p>
            <a href="javascript:;" class="btn-online"
               v-tap="{methods:showkefu}"
            >在线客服</a>
        </div>
        <div class="setPsd-c" :class="{'hide': !nextBox }">
            <p class="set-tips">设置方便您记忆的新密码</p>
            <div>
                <div class="user-co user-pass">
                    <span class="user-icon pas-icon"></span>
                    <!--eye-iconOff or eye-iconOff-->
                    <span
                            v-tap="{ methods:showCodeFn}" :class="{ 'eye-iconOn':showCode ,'eye-iconOff':!showCode }"
                    ></span>
                    <input type="password" v-model="userPassWord" @focus="checkuserPassWordFocus" id="passDom" @blur="checkPassWord" @input="inpEvent" name="password" placeholder="密码">
                    <span class="delete" v-if="userPassWord && !userPassWordBlur" v-tap="{ methods:delNumber ,params:'userPassWord'}"></span>

                </div>
                <div class="overflow">
                    <span class="reg-warning" v-if="fPTips">
                        {{ fPTips }}
                    </span>
                </div>
                <button class="btn btn-set"
                        :class="{'btn-unable': !userPassWord }"
                        v-tap="{ methods:againConfirm}"
                >
                    确 定
                </button>
            </div>
        </div>
        <KefuAlert></KefuAlert>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/regPerson'
    import KefuAlert from '~components/kefu-alert'

    export default {
        data () {
            return {
                telNumber: '',
                telCode: '',
                userPassWord: '',
                showCode: false,

                nextBox: false,

                forgetTitle: '找回密码',
                countDownStr: '获取验证码',
                addUnable: false,

                telNumberBlur: true,
                telCodeBlur: true,
                userPassWordBlur: true
            }
        },
        methods: {
            checkuserPassWordFocus () {
                this.$store.commit(mTypes.setfPTips, '')
                this.userPassWordBlur = false
            },
            headBack () {
                window.history.back()
            },
            showkefu () {
                this.$store.commit('setkefuAlert', false)
            },
            checkCode (e) {
                this.telCodeBlur = true
//                this.$store.commit(mTypes.setIsSerError , false );
                if (e.target.value.length !== 4) {
                    this.$store.commit(mTypes.setfPTips, '请输入4位验证码')
                    return false
                } else {
                    this.$store.commit(mTypes.setfPTips, '')
                }
            },
            checkTelNumberFocus () {
                this.telNumberBlur = false
                this.$store.commit(mTypes.setfPTips, '')
            },
            checkTelCodeFocus () {
                this.telCodeBlur = false
            },
            againConfirm () {
                /* 确认  function */
                if (!this.userPassWord) {
                    return false
                }

                if (this.userPassWord === '') {
                    this.$store.commit(mTypes.setfPTips, '请输入重置密码')
                    return false
                } else {
                    let pass_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
                    if (!(pass_reg.test(this.userPassWord))) {
                        this.$store.commit(mTypes.setfPTips, '请设置6~12位数字、字母组合密码')
                        return false
                    }
                    /* 重置密码 */
                    this.$store.dispatch(aTypes.passWdReset, Object.assign({}, { password: this.userPassWord, mobile: this.telNumber }))
                }
            },

            /*  */
            forgetNext () {
                /* 下一步  function */
                let forgetData = null
                if (!this.telNumber || !this.telCode) {
                    return false
                }
                /* 提交 */
                document.getElementById('LoPhone').blur()
                document.getElementById('LoCode').blur()

                if (this.telNumber === '') {
                    this.$store.commit(mTypes.setfPTips, '请输入手机号')
                    return false
                } else if (this.telCode === '') {
                    this.$store.commit(mTypes.setfPTips, '请输入4位验证码')
                    return false
                }

                /* 提交数据 */
                forgetData = Object.assign({}, { mobile: this.telNumber, verifycode: this.telCode })
                this.$store.dispatch(aTypes.checkWdReset, forgetData)
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

                    await  this.$store.dispatch(aTypes.getTelCode, Object.assign({}, { mobile: this.telNumber, vtype: 'forgetPass' }));
                    if(this.isCodeTime){
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

                    }else{
                        clearInterval(times)
                    }
                } else {
                    this.$store.commit(mTypes.setfPTips, '请输入正确的手机号')
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

            inpEvent (e) {
                if (e.target.name === 'phone') {
                    if (e.target.value.length > 11) {
                        this.telNumber = e.target.value.slice(0, 11)
                    }
                }
                if (e.target.name === 'telCode') {
                    this.$store.commit(mTypes.setfPTips, '')
                    if (e.target.value.length > 4) {
                        this.telCode = e.target.value.slice(0, 4)
                    }
                }
                if (e.target.name === 'password') {
                    if (e.target.value.length > 25) {
                        this.userPassWord = e.target.value.slice(0, 25)
                    }
                }
            },
            checkTel (e) {
                let tel_reg = /^1[34578]\d{9}$/
                this.telNumberBlur = true
                if (!(tel_reg.test(e.target.value)) && e.target.value !== '') {
                    this.$store.commit(mTypes.setfPTips, '请输入正确的手机号')
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
            checkPassWord (e) {
                let pass_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
                this.userPassWordBlur = true
                if (!(pass_reg.test(e.target.value)) && pass_reg.test(e.target.value) !== '' && this.nextBox) {
                    this.$store.commit(mTypes.setfPTips, '请设置6~12位数字、字母组合密码')
                }
            }
        },
        computed: {
            resetSign () {
                return this.$store.state.regPerson.resetSign
            },
            fPTips () {
                return this.$store.state.regPerson.fPTips
            },
            isCodeTime () {
                return this.$store.state.regPerson.isCodeTime
            },
        },
        watch: {
            resetSign (sign) {
                if (sign) {
                    this.forgetTitle = '重置密码'
                    this.nextBox = true
                    return false
                }
                this.forgetTitle = '找回密码'
                this.nextBox = false
            }
        },
        mounted () {
            this.$store.commit('showHeightTips', true)
        },
        components: {
            KefuAlert
        }
    }
</script>
<style>
    .user-msg02{
        border-color: #32343e;
    }
</style>
