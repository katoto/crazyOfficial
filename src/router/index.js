/**
 * Created by xiezg on 2017/3/10.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// home
const homeContent = () => import('~pages/home/homeContent' /* webpackChunkName: "chunks/home_content" */)
const crazymain = () => import('~pages/home/crazymain' /* webpackChunkName: "chunks/home_crazymain" */)
const MatchList = () => import('~pages/home/MatchList' /* webpackChunkName: "chunks/home_matchlist" */)

const matchListNoEnd = () => import('~pages/home/matchList_noEnd' /* webpackChunkName: "chunks/home_matchilist_noend" */)
const matchListEnd = () => import('~pages/home/matchList_end' /* webpackChunkName: "chunks/home_matchlist_end" */)

// main
const Main = () => import('~pages/main/Main' /* webpackChunkName: "chunks/main" */)

/* 活动相关的页面 */
const FootballAct = () => import('~pages/actPage/footballAct' /* webpackChunkName: "chunks/actPage" */)

/* 新充值 */
const ChargeNew = () => import('~pages/chargeNew' /* webpackChunkName: "chunks/chargeNew" */)

/* 抽奖说明 跳页 */
const LotteryNotes = () => import('~pages/lotteryNotes' /* webpackChunkName: "chunks/lotteryNotes" */)
/* 确认地址 跳页 */
const ShopAdd = () => import('~pages/shopAdd' /* webpackChunkName: "chunks/shopAdd" */)

/* 抽奖新页 */
const luckdrawNew = () => import('~pages/luckdrawNew' /* webpackChunkName: "chunks/luckdrawNew" */)

/* 用户反馈 */
const fb_upload = () => import('~pages/feedback/fb_upload.vue' /* webpackChunkName: "chunks/fb_up" */)
const fb_list = () => import('~pages/feedback/fb_list.vue' /* webpackChunkName: "chunks/fb_list" */)
const fb_listMore = () => import('~pages/feedback/fb_listMore.vue' /* webpackChunkName: "chunks/fb_listMore" */)

/* 登陆 注册 忘记密码 个人中心 */
const Login = () => import('~pages/regPersonal/Login.vue' /* webpackChunkName: "chunks/Login" */)
const Regis = () => import('~pages/regPersonal/Regis.vue' /* webpackChunkName: "chunks/Regis" */)
const ForgetPass = () => import('~pages/regPersonal/forgetPass.vue' /* webpackChunkName: "chunks/forgetPass" */)
const RegProtocol = () => import('~pages/regPersonal/RegProtocol.vue' /* webpackChunkName: "chunks/RegProtocol" */)

const personCT = () => import('~pages/regPersonal/personCenter.vue' /* webpackChunkName: "chunks/personCT" */)

// mode 代表浏览器环境   路由是按顺序匹配的
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/h5',
            component: homeContent,
            requiresAuth: true,
            children: [
                {
                    path: 'home/:from?',
                    component: crazymain
                },
                {
                    path: 'matchList',
                    component: MatchList,
                    meta: { requireAuth: true },
                    children: [
                        {
                            path: 'end/:others?',
                            component: matchListEnd
                        },
                        {
                            path: 'noEnd/:others?',
                            component: matchListNoEnd
                        }
                    ]
                },
                {
                    path: '*',
                    redirect: '/h5/home'
                }
            ]
        },
        {
            path: '/personCenter',
            component: personCT
        },
        {
            path: '/register',
            component: Regis
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/forgetPass',
            component: ForgetPass
        },
        {
            path: '/regProtocol',
            component: RegProtocol
        },
        {
            path: '/main/:matchid',
            component: Main
        },
        {
            path: '/lotteryNotes',
            component: LotteryNotes
        },
        {
            path: '/chargeNew/:others?',
            component: ChargeNew
        },
        {
            path: '/luckdraw',
            component: luckdrawNew
        },
        {
            path: '/shopAdd/:orderId?',
            component: ShopAdd
        },
        {
            path: '/fb_upload',
            component: fb_upload
        },
        {
            path: '/fb_list',
            component: fb_list
        },
        {
            path: '/fb_listMore/:fbId?',
            component: fb_listMore
        },
        {
            path: '*',
            redirect: '/h5/home'
        }
    ]
})

if (location.search) {
    let queryObj = {}
    location.search.replace('?', '').split('&').forEach(item => {
        if (~item.indexOf('=')) {
            item = item.split('=')
            queryObj[item[0]] = item[1]
        }
    })
    console.log(queryObj)
    /* 支付宝回调 */
    if (queryObj.params) {
        const args = queryObj.params.split('_@_')
        const ck = args[1]
        const type = args[2]
        history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/chargeNew/${type}_@_ck_@_${ck}`)
    }
    /* 统计from */
    if (queryObj.from) {
        localStorage.setItem('src', queryObj.from)
        console.log(queryObj.from)
        document.cookie = 'src' + '=' + 'queryObj.from'
        history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/h5/home`)
    }
    /* 微信取code */
    if (queryObj.code && queryObj.state === 'STATE') {
        history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/chargeNew/_@${queryObj.code}`)
    }

    if (queryObj.jumpToMsg && queryObj.jumpToMsg === 'true') {
        history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/h5/home/hot/showMsg`)
    }

    if (queryObj.jumpToRank && queryObj.jumpToRank === 'true') {
        history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/h5/home/hot/@@_@rank`)
    }
    if (queryObj.jumpToPay && queryObj.jumpToPay === 'true') {
        history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/chargeNew/`)
    }

}

// 注意暴露出来
export default router
