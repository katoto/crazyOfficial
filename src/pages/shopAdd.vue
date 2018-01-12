<template>
    <!-- 收货地址 -->
    <section class="address respon2">
        <PublicHead person-title="收货地址"></PublicHead>
        <div class="respon2-itm" v-if="addressMess">
            <div class="full-scroll">
                <!-- 中间部分开始 -->
                <div class="address_item">
                    <div class="address_item_title">收件人：</div>
                    <input class="address_item_input" type="text" id="input_consig" placeholder="请填写您的姓名"
                           v-model="addressMess.consignee" @input="confireAdd">
                </div>
                <div class="address_item">
                    <div class="address_item_title">手机号：</div>
                    <input class="address_item_input" type="tel" id="input_tel" placeholder="请填写手机号码"
                           v-model.trim="addressMess.mobile" @input="confireTel">
                </div>
                <div class="address_item" v-tap="{methods:showSelAddress}">
                    <div class="address_item_title">收件地址：</div>
                    <input class="address_item_input" readonly="true" :value="addressMess.allAddress"
                           type="text" id="address_input" placeholder="请选择地区">
                    <span class="address_item_select_btn"></span>
                </div>
                <div class="address_textarea_container">
                    <textarea class="address_textarea" id="input_textarea" placeholder="请填写详细地址（街道、门牌）"
                          v-model="addressMess.street"></textarea>
                </div>
                <div class="addresss_text">为保证奖品正常派发，请按正确格式填写您的收件地址</div>
                <a class="address_save_btn" v-tap="{methods:saveAddrMess}" v-if="!currOrderId && !isSaveBtn">保存</a>
                <a class="address_save_btn" v-tap="{methods:saveAddrMess}" style="background-color: #666" v-if="!currOrderId && isSaveBtn">已保存</a>
                <a class="address_save_btn" v-tap="{methods:saveAddrMess}" v-if="(currOrderId && !isConfirmBtn) ">确认地址</a>
                <a class="address_save_btn" v-tap="{methods:saveAddrMess}" style="background-color: #666" v-if="(currOrderId && isConfirmBtn)">已确认</a>
                <!-- 中间部分结束 -->
                <p class="address_tips">确认后不可修改</p>
            </div>
        </div>
        <!-- 底部选择地区开始 -->
        <div class="addresss_select_container" :class="{'address_show':isShowSelAddress}">
            <div class="addresss_select_top">
                <p class="draw_back_btn">选择省</p>
            </div>

            <div class="address_select_box" v-if="ChineseDistricts">
                <ul class="addresss_select_item_wrapper" id="address_prov"
                    v-tap="{methods:show_prov,item:'target'}">
                    <li class="addresss_select_item" :class="{'hide':hideOtherProv}"
                        v-for="(province,key) in ChineseDistricts.city[86]" :data-provCode=" key ">{{ province
                        }}
                    </li>
                </ul>
                <ul class="addresss_select_item_wrapper address_city" :class="{'transform':!showCityTran}"
                    id="address_city" v-tap="{methods:show_city,item:'target'}">
                    <li class="addresss_select_item" :class="{'hide':hideOtherCity}"
                        v-for="(city,key) in ChineseDistricts.city[this.selProvTranCode]"
                        :data-cityCode=" key ">{{ city }}
                    </li>
                </ul>
                <ul class="addresss_select_item_wrapper address_area" :class="{'transform':!showAreaTran}"
                    id="address_area" v-tap="{methods:show_area,item:'target'}">
                    <li class="addresss_select_item" :class="{'hide':hideOtherArea}"
                        v-for="(country,key) in ChineseDistricts.city[this.selCityTranCode]"
                        :data-areaCode=" key ">{{ country }}
                    </li>
                </ul>
            </div>
        </div>
        <!-- 底部选择地区结束 -->
    </section>
</template>

<script>
    import ChineseDistricts from '~common/city-picker.data'
    import PublicHead from '~components/publicHead'
export default {
        data () {
            return {
                currOrderId: null,

                ChineseDistricts: ChineseDistricts,
                province: '110000',
                city: '110100',
                country: '110101',

                isShowSelAddress: false,  // 显示地址选择
                showCityTran: false,
                showAreaTran: false,

                selProvTran: null,
                selCityTran: null,
                selAreaTran: null,
                hideOtherCity: false,
                hideOtherArea: false,
                hideOtherProv: false,
                selProvTranCode: null,
                selCityTranCode: null,
                selAreaTranCode: null,
                selProvReady: false,
                selCityReady: false,
                selAreaReady: false
            }
        },
        components: {
            PublicHead
        },
        methods: {
            saveAddrMess () {
                if (this.hasUserInfo) {
                    let reg = /^1[0-9]{10}$/
                    if (this.addressMess.mobile && reg.test(this.addressMess.mobile)) {
                        if ((!this.currOrderId && this.isSaveBtn) || (this.currOrderId && this.isConfirmBtn)) {
                            return false
                        } else {
                            if (this.currOrderId && this.addressMess.aid && parseInt(this.addressMess.aid) > 0) {
                                //  修改地址
                                this.$store.dispatch('modifyAddress', this.currOrderId)
                            } else {
                                //  新增地址
                                this.$store.dispatch('addAddress', this.currOrderId)
                            }
                        }
                    } else {
                        this.$store.dispatch('showToast', '手机号码有误,请重新输入！')
                    }
                } else {
                    this.$store.dispatch('doAuth')
                }
            },
            showSelAddress (obj) {
                document.getElementById('input_consig').blur()
                document.getElementById('input_tel').blur()
                document.getElementById('input_textarea').blur()

//                显示地址选择
                this.isShowSelAddress = true
//                回到列表初始状态
                this.selProvReady = false
                this.selCityReady = false
                this.selAreaReady = false

                this.showAreaTran = false
                this.showCityTran = false
                this.hideOtherProv = false
            },
            show_prov (obj) {
                this.selCityReady = false
                this.selAreaReady = false
                this.showAreaTran = false
                if (!this.selProvReady) {
                    this.showCityTran = true   // 显示下一级
                    this.hideOtherProv = true
                    this.selProvTranCode = obj.event.target.getAttribute('data-provCode')
                    this.selProvTran = obj.event.target.innerText
                    this.$store.commit('setAddressPro', obj.event.target.innerText)
                    this.selProvReady = true
                    setTimeout(() => {
                        obj.event.target.className = 'addresss_select_item'
                    }, 0)
                    this.hideOtherCity = false
                    this.hideOtherArea = false
                } else {
                    this.showCityTran = false
                    this.hideOtherProv = false
                    this.selProvReady = false
                }
            },
            show_city (obj) {
                this.hideOtherArea = false
                if (obj.event.target.getAttribute('data-cityCode') === null) {
//                    处理只有一个市区的bug
                    return false
                }

                if (!this.selCityReady) {
                    this.showAreaTran = true
                    this.hideOtherCity = true
                    this.selCityTranCode = obj.event.target.getAttribute('data-cityCode')
                    this.selCityTran = obj.event.target.innerText
                    this.$store.commit('setAddressCity', obj.event.target.innerText)
                    this.selCityReady = true
                    setTimeout(() => {
                        obj.event.target.className = 'addresss_select_item'
                    })
                } else {
                    this.selCityReady = false
                    this.selAreaReady = false
                    this.showAreaTran = false
                    this.hideOtherCity = false
                }
            },
            show_area (obj) {
                if (!this.selAreaReady) {
                    this.hideOtherArea = true
                    this.selAreaTranCode = obj.event.target.getAttribute('data-areaCode')
                    this.selAreaTran = obj.event.target.innerText
                    this.$store.commit('setAddressDistrict', obj.event.target.innerText)
                    this.$store.commit('setAddressAllAddress', this.selProvTran + this.selCityTran + this.selAreaTran || '')
                    this.isShowSelAddress = false  // 地址选择
                    setTimeout(() => {
                        obj.event.target.className = 'addresss_select_item'
                    })
                    this.selAreaReady = true
                } else {
                    this.hideOtherArea = false
                    this.selAreaReady = false
                }
            },

            confireTel (val) {
                let regTel = /^1[0-9]{10}$/
                let thisValue = this.addressMess.mobile
                if (thisValue.length === 11) {
                    if (!regTel.test(thisValue)) {
                        setTimeout(() => {
                            this.$store.dispatch('showToast', '手机号码有误,请重新输入！')
                        }, 100)
                    }
                }
                if (thisValue.length > 11) {
                    this.$store.commit('setAddressMobile', thisValue.slice(0, 11))
                }
            },
            confireAdd () {
                let thisValue = this.addressMess.consignee
                if (thisValue.length > 10) {
                    this.$store.commit('setAddressAdd', thisValue.slice(0, 10))
                }
            }
        },
        computed: {
            addressMess () {
                return this.$store.state.shopAddData.addressMess
            },
            isConfirmBtn () {
                return this.$store.state.shopAddData.isConfirmBtn
            },
            isSaveBtn () {
                return this.$store.state.shopAddData.isSaveBtn
            },
            hasUserInfo () {
                return !!this.$store.state.ck
            }
        },
        mounted () {
            if (this.$route.params.orderId) {
                this.currOrderId = this.$route.params.orderId;
                this.$store.commit('setIsConfirmBtn', false)
            }
            if (this.hasUserInfo) {
                this.$store.dispatch('getAddressMess')
            }
        }
    }
</script>
