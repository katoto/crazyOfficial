<template>
    <div id="user" class="wrap respon2">
        <div class="topBar">
            <div class="icon_back" v-tap="{methods:headBack}"></div>
            <h1>{{ Ptitle }}</h1>
        </div>
        <div class="user-c" v-if="userInfo && showCenter">
            <div class="user-d" v-tap="{methods:changeTab,params:'per_img'}">
                <span>头像</span>
                <img :src="userInfo.photo" alt="用户头像" class="user-img">
            </div>
            <div class="user-d" v-tap="{methods:changeTab,params:'per_name'}">
                <span>昵称</span>
                <div class="my-name">{{ userInfo.username }}</div>
            </div>
            <button class="btn btn-exit "
                v-tap="{methods: exit }"
            >
                退出账号
            </button>
        </div>
        <div class="chang-name" :class="{'hide':!showName}">
            <p class="chang-tips">用户昵称只可以修改一次</p>
            <div class="chang-box">
                <input @input="checkNickName" @focus="checkNickNameFocus" @blur="checkNickNameBlur" autofocus="autofocus" id="nickInp" name="nick" type="text" v-model="nickName">
                <span class="delete" v-if="nickName && !nickNameBlur"
                      v-tap="{methods:changeTab,params:'delNickName'}"
                ></span>
            </div>
            <div class="overflow">
                <span class="reg-warning" v-if="PCTips">
                    {{ PCTips }}
                </span>
            </div>
            <button class="btn btn-keep"
                    :class="{'btn-unable': !isClick }"
                    v-tap="{methods:reName}"
            >
                保 存
            </button>
        </div>
        <!--选择头像弹窗-->
        <div class="pop pop02 pop-userImg" :class="{'hide':!showImg }">
            <div class="pop_layer"
                 v-tap="{methods:changeTab,params:'per_center'}"
            ></div>
            <div class="pop-o">
                <span class="close" v-tap="{methods:changeTab,params:'per_center'}">
                    <span></span>
                </span>
                <div class="popTit">
                    <h2 class="title">选择头像</h2>
                </div>
                <div class="pop-userImg-c">
                    <div class="full-scroll" id="selImgDom"
                        v-tap="{ methods:clickImg }"
                    >
                        <ul>
                            <li class="">
                                <img src="http://img.choopaoo.com/esun/upload/d9/0a/d90aca8ab55f11e7b8b9.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/5d/bc/5dbcaf6eb56011e78861.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/75/7d/757d3efcb56011e7a3a0.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/86/fc/86fc42b8b56011e78f1e.png" alt="">
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/c1/9b/c19bcceab56011e7b829.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/d2/0b/d20bfb54b56011e7a4cc.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/e8/e0/e8e0d49eb56011e7bb60.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/11/ba/11bad34cb56111e7a441.png" alt="">
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/22/c0/22c08ddab56111e7bdd2.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/31/86/31865a84b56111e78ca3.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/a8/6b/a86b3c64b56111e7bc49.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/b9/8b/b98b083ab56111e7a008.png" alt="">
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/cd/03/cd036664b56111e7928e.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/dd/b4/ddb4b544b56111e7b71e.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/ef/46/ef46aecab56111e79bd6.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/ff/89/ff89709cb56111e7b643.png" alt="">
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/12/e0/12e049c2b56211e7beae.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/48/bf/48bf899ab56211e7a545.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/1f/f5/1ff52132b56211e79ea9.png" alt="">
                            </li>
                            <li>
                                <img src="http://img.choopaoo.com/esun/upload/34/9f/349f8ec4b56211e7ba28.png" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
                <button class="btn btn-save"
                        v-tap="{ methods:savaUserImg }"
                >
                    确 定
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {aTypes, mTypes} from '~store/regPerson'

    import {actionTypes, mutationTypes} from '~store/home'

    export default {
        data () {
            return {
                Ptitle: '个人中心',
                selTab: 'per_center',
                showCenter: true,
                showName: false,
                nickName: null,
                selUserImg: null,
                isClick: false,
                nickNameBlur: true
            }
        },
        methods: {
            checkNickNameBlur () {
                let regNickName = /[`~!@#$^&*()=|{}':;',\[\].<>\/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]/
                this.nickNameBlur = true
                if (regNickName.test(this.nickName)) {
                    this.$store.commit(mTypes.setPCTips, '不可使用特殊字符')
                } else if (this.nickName.length <= 2 && this.nickName.length >= 16) {
                    this.$store.commit(mTypes.setPCTips, '2-16个字符,支持中英文、数字')
                }
            },
            checkNickNameFocus () {
                this.nickNameBlur = false
                this.$store.commit(mTypes.setPCTips, '')
            },
            headBack () {
                if (this.Ptitle === '个人中心') {
                    window.history.back()
                } else {
                    this.changeTab({params: 'per_center'})
                }
            },
            clickImg (e) {
                let evtTarget = e.event.target
                if (evtTarget && evtTarget.nodeName === 'IMG') {
                    let lis = document.querySelectorAll('#selImgDom li')
                    for (let i = 0, len = lis.length; i < len; i++) {
                        lis[i].className = ''
                    }
                    evtTarget.parentNode.className = 'on'
                    this.selUserImg = evtTarget.getAttribute('src')
                }
            },
            savaUserImg () {
                if (!this.selUserImg) {
                    this.$store.dispatch('showToast', {
                        duration: 1000,
                        message: '请选择一个头像'
                    })
                    return false
                }
                this.$store.dispatch(aTypes.setUserImg, this.selUserImg)
            },
            reName (e) {
                //  修改昵称
                let regNickName = /[`~!@#$^&*()=|{}':;',\[\].<>\/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]/
                if (~e.event.target.className.indexOf('btn-unable')) {
                    return false
                }

                if (regNickName.test(this.nickName)) {
                    this.$store.commit(mTypes.setPCTips, '不可使用特殊字符')
                } else if (this.nickName.length >= 2 && this.nickName.length <= 16) {
                    this.$store.dispatch(aTypes.renameNickName, this.nickName.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ''))
                } else {
                    this.$store.commit(mTypes.setPCTips, '2-16个字符,支持中英文、数字')
                }
            },
            checkNickName (e) {
                if (e.target.name === 'nick') {
                    if (e.target.value.length > 16) {
                        this.nickName = e.target.value.slice(0, 16)
                    }
                    if (this.nickName.length >= 2 && this.nickName.length <= 16) {
                        this.isClick = true
                    } else {
                        this.isClick = false
                    }
                }
            },
            exit () {
                this.$store.commit('removeCk')
                setTimeout(() => {
                // 更新接口数据
//                    this.$store.dispatch('checkLogin');
//                    this.$store.dispatch(actionTypes.getFootballMatchList, 'newhot')
//                    this.$store.dispatch(actionTypes.getSignList)
//                    this.$store.dispatch(actionTypes.getActivityList)
                    this.$router.push(`/h5/home`)
                    window.location.reload()
                }, 10)
            },
            changeTab ({ params }) {
                switch (params) {
                case 'per_center':
                    this.Ptitle = '个人中心'
                    this.showCenter = true
                    this.showName = false
                    this.$store.commit(mTypes.setShowImg, false)

                        ;break
                case 'per_name':
                    this.Ptitle = '修改昵称'
                    if (this.userInfo) {
                        this.nickName = this.userInfo.username
                    }
                    document.getElementById('nickInp').focus()
                    this.showCenter = false
                    this.showName = true
                    this.$store.commit(mTypes.setShowImg, false)
                        ;break
                case 'per_img':
                    this.showCenter = false
                    this.showName = false
                    this.$store.commit(mTypes.setShowImg, true)
                        ;break
                case 'delNickName':
                    this.nickName = ''
                    ;break
                }
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            },
            showImg () {
                return this.$store.state.regPerson.showImg
            },
            PCTips () {
                return this.$store.state.regPerson.PCTips
            }
        },
        mounted () {
        },
        watch: {
            showImg (data) {
                if (data === false) {
                    this.Ptitle = '个人中心'
                    this.showCenter = true
                    this.showName = false
                    this.$store.commit(mTypes.setShowImg, false)
                }
            }
        }
    }
</script>
