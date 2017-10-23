<template>
    <div id="user" class="wrap respon2">
        <div class="header">
            <div class="top">
                <div class="icon_back"
                    v-tap="{methods:goPageFn,target:'backHistory' }" ></div>
            </div>
            <div class="logo"></div>
        </div>
        <div class="login-c ">
            <div>
                <div class="user-co user-phone">
                    <span class="user-icon phone-icon"></span>
                    <input type="tel" v-model="telNumber" @focus="checkTelNumberFocus" @input="inpEvent" @blur="checkTel" id="LoPhone" name="phone" placeholder="手机号">
                    <span class="delete" v-if="telNumber && !telNumberBlur" v-tap="{ methods:delNumber ,params:'telNumber'}"></span>
                </div>
                <div class="user-co user-pass">
                    <span class="user-icon pas-icon"></span>
                    <span
                            v-tap="{ methods:showCodeFn}" :class="{ 'eye-iconOn':showCode ,'eye-iconOff':!showCode }"
                    ></span>
                    <input type="password" v-model="userPassWord" @focus="checkuserPassWordFocus" @blur="checkPw" id="passDom" @input="inpEvent" name="password" placeholder="密码">
                    <span class="delete" style="right: .341333rem!important;" v-if="userPassWord && !userPassWordBlur" v-tap="{ methods:delNumber ,params:'userPassWord'}"></span>
                </div>
                <div class="user-co user-veri" v-if="isShowImgCode && isShowImgCode.iscode==='1'">
                    <div class="user-co user-msg">
                        <span class="user-icon msg-icon"></span>

                        <input v-model="telCode" type="text" @focus="checktelCodeFocus" @blur="checkCode" @input="inpEvent" id="LoCode" name="telCode" placeholder="输入右侧验证码">
                        <span class="delete" v-if="telCode"  v-tap="{ methods:delNumber ,params:'telCode'}"></span>
                    </div>
                    <div class="user-code">
                        <div class="re-fresh"
                            v-tap="{ methods : freshImgCode }"
                        ></div>
                        <img :src="isShowImgCode.vcode_img_url" alt="验证码"
                             v-tap="{ methods : freshImgCode }"
                        >
                    </div>
                </div>
                <div class="overflow">
                    <span class="reg-warning" v-if="LoTips">
                        {{ LoTips }}
                    </span>
                    <a href="javascript:;" class="to-foeget" v-tap="{methods:goPageFn,target:'forgetPass' }">
                        忘记密码？
                    </a>
                </div>
                <button class="btn btn-login"
                    :class="{'btn-unable': !telNumber || !userPassWord || LoTips}"
                    v-tap="{ methods:LoginFn}"
                >{{ loginBtnStr }}</button>

            </div>
            <p class="login-tips">新用户立领888币，<a href="javascript:;" v-tap="{methods:goPageFn,target:'register' }">一键注册</a></p>
            <a href="javascript:;" class="btn-down"
               v-tap="{methods:goPageFn,target:'downLoad' }"
            >
                下载官方APP
            </a>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/regPerson'
    import {starHtml, stopHtml, platform} from '~common/util'
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
                loginBtnStr:'登  录',
                addUnable: false,
                deviceId:null,

                telNumberBlur:true,
                userPassWordBlur:true,
                telCodeBlur:true,
            }
        },
        watch: {
            loginData (loginData) {
                console.log(loginData);
                if (loginData) {
                    if (loginData.ck) {
                        /* 可以到后台 */
                        let _this = this;
                        this.$store.commit('ck', loginData.ck);
                        /* 来源 ！！！！！！！ */
                        this.$store.dispatch('showToast',{
                            message:'登录成功',
                            cb(){
                                _this.$store.dispatch('getUserInfo');
                                _this.$router.push(`/h5/home`);
                                _this.$store.dispatch('checkLogin');
                            }
                        });
                    } else {
                        /* 审核页面 */
                        this.$router.push(`/register`)
                    }
                }
            }
        },
        computed: {
            isShowImgCode () {
                return this.$store.state.regPerson.IsShowImgCode
            },
            loginData(){
                return this.$store.state.regPerson.loginData
            },
            LoTips () {
                return this.$store.state.regPerson.LoTips
            },
            isSerError () {
                return this.$store.state.regPerson.isSerError
            },
            autoTelNumber(){
                return this.$store.state.regPerson.autoTelNumber
            },
            autoLoginNumber(){
                return this.$store.state.regPerson.autoLoginNumber
            },
            autoLoginPassword(){
                return this.$store.state.regPerson.autoLoginPassword
            }
        },
        methods: {
            showCodeFn () {
                if (this.showCode) {
                    document.getElementById('passDom').setAttribute('type', 'password')
                } else {
                    document.getElementById('passDom').setAttribute('type', 'text')
                }
                this.showCode = !(this.showCode)
            },
            checktelCodeFocus(){
                if( this.isSerError ){
                    this.$store.commit(mTypes.setLoTips , '');
                }
                this.telCodeBlur = false;
            },
            checkuserPassWordFocus(){
                if( this.isSerError ){
                    this.$store.commit(mTypes.setLoTips , '');
                }
                this.userPassWordBlur = false;
            },
            checkTelNumberFocus(){
                this.$store.commit(mTypes.setLoTips , '');
                this.telNumberBlur = false;
            },
            checkCode( e ){
                this.telCodeBlur = true;
                this.$store.commit(mTypes.setIsSerError , false );

                if(e.target.value.length !== 4 ){
                    this.$store.commit(mTypes.setLoTips , '请输入4位验证码');
                    return false
                }else{
                    this.$store.commit(mTypes.setLoTips , '');
                }
            },
            checkPw(){
                this.userPassWordBlur = true;
            },
            checkTel (e) {
                let tel_reg = /^1[34578]\d{9}$/;
                this.telNumberBlur = true;
                if (! ( tel_reg.test(e.target.value)) && e.target.value !=='') {
                    this.$store.commit(mTypes.setIsSerError , false );
                    this.$store.commit(mTypes.setLoTips , '请输入手机号');
                }
            },

            goPageFn ({ target }) {
                target = target || 'backHistory';
                switch (target) {
                    case 'forgetPass':
                        this.$router.push(`/forgetPass`);
                        _hmt.push(['_trackEvent', '合伙人注册页合作协议点击', 'click', '合伙人注册页合作协议']);
                        break;
                    case 'register':
                        _hmt.push(['_trackEvent', '合伙人注册页登陆点击', 'click', '合伙人注册页登陆']);
                        this.$router.push(`/register/`);
                        break;
                    case 'downLoad':

                        if (platform === 'android') {
                            window.location.href = 'http://download.choopaoo.com/download/cbet_for_Android_500cpH5.apk'
                        } else {
                            window.location.href = 'https://at.umeng.com/uKrSPn?cid=481'
                        }
                        break;
                    case 'backHistory':
                        window.history.back();
                        break
                }
            },

            freshImgCode(){
                this.$store.dispatch(aTypes.getIsShowImgCode, localStorage.getItem('deviceTime'))
            },

            LoginFn () {
                let loginData = null;
            /* 提交 */
                if (this.telNumber === '') {
                    this.$store.commit(mTypes.setIsSerError , false );
                    this.$store.commit(mTypes.setLoTips , '请输入正确的手机号');
                    return false
                } else if (this.userPassWord === '') {
                    this.$store.commit(mTypes.setIsSerError , false );
                    this.$store.commit(mTypes.setLoTips , '请输入密码');
                    return false
                }
                if( this.LoTips !=='' ){
                    return false;
                }
                let tel_reg = /^1[34578]\d{9}$/;
                if (! ( this.telNumber ) &&this.telNumber !=='') {
                    this.$store.commit(mTypes.setIsSerError , false );
                    this.$store.commit(mTypes.setLoTips , '请输入正确的手机号');
                }

                document.getElementById('LoPhone').blur();
                document.getElementById('passDom').blur();

                if(document.getElementById('LoCode')){
                    document.getElementById('LoCode').blur();
                }

                /* 提交数据  验证码的  */
                loginData = Object.assign({}, {
                    logintype : 'login',
                    mobile: this.telNumber,
                    password: this.userPassWord,
                    verifycode:this.telCode,
                    deviceid:this.deviceId,
                });
                this.$store.dispatch(aTypes.doLogin, loginData)
            },

            inpEvent (e) {
                if (e.target.name === 'phone') {
                    if (e.target.value.length > 11) {
                        this.telNumber = e.target.value.slice(0, 11)
                    }
                }
                if (e.target.name === 'telCode') {
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
            delNumber({ params }){
                switch (params) {
                    case 'telNumber':
                        this.telNumber = '';
                        break;
                    case 'userPassWord':
                        this.userPassWord = '';
                        break;
                    case 'telCode':
                        this.telCode = '';
                        break;
                }
            },
        },
        async mounted () {
            let deviceId = localStorage.getItem('deviceTime');
            if(! (deviceId) || deviceId === 'undefined'){
                let newId = new Date().getTime();
                deviceId = newId;
                localStorage.setItem('deviceTime',newId);
            }
            this.deviceId = deviceId;
            await this.$store.dispatch(aTypes.getIsShowImgCode, deviceId );
            this.$store.commit('showHeightTips' , true );
            if( this.autoTelNumber ){
                this.telNumber = this.autoTelNumber;
                this.$store.commit(mTypes.autoTelNumber,null);
            }
            if( this.autoLoginNumber ){
                this.telNumber = this.autoLoginNumber;
                this.$store.commit(mTypes.autoLoginNumber,null);
            }
            if( this.autoLoginPassword ){
                this.userPassWord = this.autoLoginPassword;
                this.$store.commit(mTypes.autoLoginPassword,null);
            }
        },
    }
</script>
