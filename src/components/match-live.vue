<template>
    <div class="svg-box">
        <!--<span class="ml1-ScoreHeader_Clock">40:50</span>-->
        <div class="ml1-MatchLiveSoccerModule_Constrainer ml1-SwipeContainer_Child ml1-SwipeContainer_ViewIndex-0 ">
            <div class="ml1-MatchLiveSoccerModule_MatchLiveWrapper ">
                <div class="ml1-MatchLiveSoccerModule_PitchContainer ">
                    <img src="~static/images/bg.png" class="imgbg"/>
                    <!--<a href="" class="yindao-dl">本数据由“球球是道”App独家提供</a>-->
                    <div class="svg-bg svg-bg1 hide"></div>
                    <div class="svg-bg  svg-bg2 hide"></div>
                    <div class="svg-bg svg-bg3 hide"></div>
                    <div class="svg-bg svg-bg4 hide"></div>
                    <div class="svg-bg  svg-bg5 hide"></div>
                    <div class="svg-bg svg-bg6 hide"></div>
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 400 180" height="1"
                         width="1" xmlns="http://www.w3.org/2000/svg" class="ml1-SoccerPitch_SVG"
                         id="ml1-SoccerPitch_SVG"></svg>
                    <div class="ml-MatchLiveSoccerModule_AnimWrapper ">


                        <div class="ml1-animatedTextBar hide">
                            <div class="ml1-Anims_H1TextWrapper"><span
                                    class="ml1-Anims_H1Text1">{{homeTeam}}</span><span
                                    class="ml1-Anims_H1Text2">{{meta[caseType]}}</span></div>
                            <div class="ml1-Anims_H2TextWrapper"><span
                                    class="ml1-Anims_H2Text1">{{awayTeam}}</span><span
                                    class="ml1-Anims_H2Text2">{{meta[caseType]}}</span></div>

                            <div class="ml1-Anims_Line"></div>
                        </div>


                        <div class="ml1-Anims_H3TextWrapper evenList hide"><span>{{meta[caseType]}}</span></div>
                        <!--换人-->
                        <div class="ml1-subOnOff  evenList hide">
                            <div class="subOnOff"></div>
                        </div>
                        <!--进球后比分变化动画-->
                        <div class="change-score">
                            <em class="em1" style="background:#00FF33;"></em>
                            <em class="em2" style="background:#CC0000;"></em>
                            <span class="s1 on">1</span>
                            <span class="s2 on">2</span>

                            <span class="s3">3</span>
                            <span class="s4">2</span>
                        </div>

                        <!--未开始-->
                        <div class="ml1-Intro_TopRow-box evenList" v-if="matchState === '0'">
                            <P class="game-time">比赛时间：{{matchTime}}</P>
                        </div>

                        <!--任意球-->
                        <div class="on Anims_ArrowStraight hide evenList">
                            <div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_ArrowStraight">
                                <div class="arrow velocity-animating"></div>
                                <div class="ml1-Anims_Target ">
                                    <div class="outer velocity-animating"></div>
                                    <div class="inner velocity-animating"></div>
                                    <div class="point velocity-animating"></div>
                                </div>
                            </div>
                        </div>

                        <!--角球-->
                        <div class="on Anims_ArrowCurved hide evenList">
                            <div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_ArrowCurved">
                                <div class="arrow velocity-animating"></div>
                                <div class="ml1-Anims_Target ">
                                    <div class="outer"></div>
                                    <div class="inner"></div>
                                    <div class="point velocity-animating"></div>
                                </div>
                            </div>
                        </div>

                        <!--射偏-->
                        <div class="Anims_ShotOffTarget hide evenList">
                            <div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_Goal2"></div>
                            <div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_ShotOffTarget"></div>
                        </div>

                        <!--进球-->
                        <div class="Anims_Goal evenList hide">
                            <div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_Goal"></div>
                            <div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_GoalBall"></div>
                        </div>

                        <!--黄牌-->
                        <div class="Anims_YellowCard evenList hide">
                            <div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_YellowCard"></div>
                        </div>

                        <!--越位-->
                        <div class="Anims_Offside evenList hide">
                            <div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_OffsideLine"></div>
                            <div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_Offside"></div>
                        </div>

                        <!--界外球-->
                        <div class="on Anims_ArrowShort hide evenList">
                            <div class="ml1-Anims_Asset ml1-Anims_Icon ml1-Anims_ArrowShort">
                                <div class="arrow velocity-animating"></div>
                                <div class="ml1-Anims_Target ">
                                    <div class="outer"></div>
                                    <div class="inner"></div>
                                    <div class="point velocity-animating"></div>
                                </div>
                            </div>
                        </div>

                        <!--进球、-->

                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'bc-zepto.full'
    const AS = ['FK1', 'FK2', 'FK3L', 'FK3R', 'FK4', 'FK5', '7', 'FK1', 'FK2', 'FK3L', 'FK3R', 'FK4', 'FK5', '7']
    export default{
        props: ['homeTeamScore', 'awayTeamScore', 'homeTeam', 'awayTeam', 'matchTime', 'matchState', 'currentcase'],
        data () {
            return {
                caseType: 0,
                meta: {
                    101025: '主队角球',
                    102049: '客队角球',
                    101029: '主队进球',
                    101065: '确认主队进球',
                    102053: '客队进球',
                    102089: '确认客队进球',
                    102048: '客队进攻',
                    101024: '主队进攻',
                    102050: '客队危险进攻',
                    101026: '主队危险进攻',
                    101051: '主队控球',
                    102075: '客队控球',
                    101034: '主队黄牌',
                    102058: '客队黄牌',
                    101040: '主队射偏',
                    102064: '客队射偏',
                    101043: '主队越位',
                    102067: '客队越位',
                    101053: '主队球门球',
                    102077: '客队球门球',
                    101054: '主队界外球',
                    102078: '客队界外球',
                    100018: '开始点球',
                    100782: '取消比赛',
                    100277: '暂停', // todo
                    100149: '暂停', // todo
                    100276: '开始', // todo
                    100008: '点球开始',
                    100009: '点球结束',
                    100148: '重新开始',
                    100020: '下半场结束',
                    100012: '开始下半场',
                    100010: '开始上半场',
                    100014: '开始加时上半场',
                    100016: '开始加时下半场',
                    100004: '开始加时赛上半场',
                    100005: '结束加时赛上半场',
                    100006: '开始加时赛下半场',
                    100007: '结束加时赛下半场',
                    100001: '上半场结束',
                    100003: '下半场结束',
                    102074: '取消客队角球',
                    101030: '取消主队进球',
                    101050: '取消主队角球',
                    102054: '取消客队进球',
                    101045: '主队红黄牌',
                    101046: '取消主队红黄牌',
                    101032: '主队红牌',
                    101047: '取消主队红牌',
                    101048: '取消主队黄牌',
                    102069: '客队红黄牌',
                    102070: '取消客队红黄牌',
                    102056: '客队红牌',
                    102071: '取消客队红牌',
                    102072: '取消客队黄牌',
                    101028: '主队任意球',
                    102052: '客队任意球',
                    101031: '主队点球',
                    102055: '客队点球',
                    101044: '主队开球',
                    102068: '客队开球',
                    101027: '主队危险任意球',
                    102051: '客队危险任意球',
                    102063: '客队射正',
                    101039: '主队射正',
                    101055: '主队换人',
                    102079: '客队换人'
                }
            }
        },
        methods: {},
        mounted () {
            let aCard = 1,
                aGoal = 1,
                aOffside = 1,
                aShotOffTarget = 1,
                agoalKick = 1,
                aArrowStraight = 0,
                aArrowShort = 1,
                aSubOnOff = 1,
                aArrowCurved = 1,
                isHomeAway = 2 // 2 == 客队
            this.executeEvent = (caseType) => {
                let i = 100
                switch (caseType) {
                case '101025': // 主队角球
                    i = 6
                    aArrowCurved = 1 // 或者2
                    break
                case '102049': // 客队角球
                    i = 6
                    aArrowCurved = 3 // 或者2
                    break
                case '101029': // 主队进球
                    i = 12
                    aGoal = 2
                    break
                case '102053': // 客队进球
                    i = 12
                    aGoal = 1
                    break
                case '101039': // 主队射正
                    i = 9
                    aShotOffTarget = 4
                    break
                case '102063': // 客队射正
                    i = 9
                    aShotOffTarget = 2
                    break
                case '102048': // 客队进攻
                    i = 1
                    break
                case '101024': // 主队进攻
                    i = 4
                    break

                case '102050': // 客队危险进攻
                    i = 2
                    break
                case '101026': // 主队危险进攻
                    i = 5
                    break

                case '101051': // 主队控球
                    i = 3
                    break
                case '102075': // 客队控球
                    i = 0
                    break
                case '101034': // 主队黄牌
                    i = 11
                    aCard = 1
                    break
                case '102058': // 客队黄牌
                    i = 11
                    aCard = 3
                    break

                case '101032': // 主队红牌
                    i = 11
                    aCard = 2
                    break
                case '102056': // 客队红牌
                    i = 11
                    aCard = 4
                    break
                case '101040': // 主队射偏 todo
                    i = 9
                    aShotOffTarget = 3
                    break
                case '102064': // 客队射偏 todo
                    i = 9
                    aShotOffTarget = 1
                    break
                case '101055': // 主队换人 todo
                    i = 16
                    aSubOnOff = 2
                    break
                case '102079': // 客队换人 todo
                    i = 16
                    aSubOnOff = 1
                    break
                case '101043': // 主队越位
                    i = 10
                    aOffside = 2
                    break
                case '102067': // 客队越位
                    i = 10
                    aOffside = 1
                    break
                case '101053': // 主队球门球
                    i = 15
                    agoalKick = 2
                    break
                case '102077': // 客队球门球
                    i = 15
                    agoalKick = 1
                    break
                case '101054': // 主队界外球
                    i = 7
                    aArrowShort = 2
                    break
                case '102078': // 客队界外球
                    i = 7
                    aArrowShort = 1
                    break
                case '101028': // '主队任意球'
                    i = 8
                    aArrowStraight = parseInt(Math.random() * (6 - 0) + 0, 10)
                    break
                case '102052': // '客队任意球'
                    i = 8
                    aArrowStraight = parseInt(Math.random() * (13 - 7) + 7, 10)
                    break

                case '101027': // '主队危险任意球'
                    i = 8
                    aArrowStraight = 0
                    break
                case '102051': // '客队危险任意球'
                    i = 8
                    aArrowStraight = 7
                    break
                case '101031': // '主队点球'
                    i = 8
                    aArrowStraight = 6
                    break
                case '102055': // '客队点球'
                    i = 8
                    aArrowStraight = 13
                    break
                case '100018':
                case '100782':
                case '100277':
                case '100149':
                case '100276':
                case '100008':
                case '100009':
                case '100148':
                case '100020':
                case '100012':
                case '100010':
                case '100014':
                case '100016':
                case '100004':
                case '100005':
                case '100006':
                case '100007':
                case '100001':
                case '100003':
                case '101050':
                case '101030':
                case '102074':
                case '102054':
                case '101045':
                case '101047':
                case '101048':
                case '102069':
                case '102070':
                case '102071':
                case '102072':
                case '101044':
                case '102068':
                    i = 14
                    break
                default:
                    return
                }
                this.caseType = caseType
                isHomeAway = 2
                if ($.inArray(aCard, [1, 2]) !== -1 && i === 11) {
                    isHomeAway = 1
                }
                if (aGoal === 2 && i === 12) {
                    isHomeAway = 1
                }

                if (aOffside === 2 && i === 10) {
                    isHomeAway = 1
                }

                if ($.inArray(aShotOffTarget, [3, 4, 6]) !== -1 && i === 9) {
                    isHomeAway = 1
                }
                if (agoalKick === 2 && i === 15) {
                    isHomeAway = 1
                }
                if ($.inArray(aArrowStraight, [8, 9, 10, 11, 12, 13, 14]) !== -1 && i === 8) {
                    isHomeAway = 1
                }
                if (aArrowShort === 2 && i === 7) {
                    isHomeAway = 1
                }
                if (aSubOnOff === 2 && i === 16) {
                    isHomeAway = 1
                }
                if ($.inArray(aArrowCurved, [1, 2]) !== -1 && i === 6) {
                    isHomeAway = 1
                }
                if (i === 3 || i === 4 || i === 5) {
                    isHomeAway = 1
                }

                if (isHomeAway === 1) {
                    // 主队
                    $('.ml1-Anims_H1TextWrapper .ml1-Anims_H1Text1').text(this.homeTeam)
                    $('.ml1-animatedTextBar').addClass('home').removeClass('away')
//                    $('.ml1-Anims_H1Text2').text(this.meta[caseType])
                } else {
                    $('.ml1-animatedTextBar').addClass('away').removeClass('home')
                    $('.ml1-Anims_H1TextWrapper .ml1-Anims_H1Text1').text(this.awayTeam)
//                    $('.ml1-Anims_H2Text2').text(this.meta[caseType])
                }
                if (i === 0) { // 客队控球
                    rightA()
                } else if (i === 1) { // 客队进攻
                    rightB()
                } else if (i === 2) { // 客队危险进攻
                    rightC()
                } else if (i === 3) { // 主队控球
                    leftA()
                } else if (i === 4) { // 主队进攻
                    leftB()
                } else if (i === 5) { // 主队危险控球
                    leftC()
                } else if (i === 6) { // 角球
                    Anims_ArrowCurved(aArrowCurved)
                    aArrowCurved++
                    if (aArrowCurved >= 5) {
                        aArrowCurved = 1
                    }
                } else if (i === 7) { // 界外球
                    Anims_ArrowShort(aArrowShort)
                    aArrowShort++
                    if (aArrowShort >= 3) {
                        aArrowShort = 1
                    }
                } else if (i === 8) { // 任意球
                    if (aArrowStraight < 7) {
                        hAnims_ArrowStraight(AS[aArrowStraight])
                    } else {
                        aAnims_ArrowStraight(AS[aArrowStraight])
                    }
                    console.log(aArrowStraight)
                    aArrowStraight++
                    if (aArrowStraight > 14) {
                        aArrowStraight = 0
                    }
                } else if (i === 9) { // 射偏
                    Anims_ShotOffTarget(aShotOffTarget)
                    aShotOffTarget++
                    if (aShotOffTarget >= 7) {
                        aShotOffTarget = 1
                    }
                } else if (i === 10) { // 越位
                    Anims_Offside(aOffside)
                    aOffside++
                    if (aOffside >= 3) {
                        aOffside = 1
                    }
                } else if (i === 11) { // 黄牌
                    Anims_YellowCard(aCard)
                    aCard++
                    if (aCard >= 5) {
                        aCard = 1
                    }
                } else if (i === 12) { // 进球
                    Anims_Goal(aGoal)
                    aGoal++
                    if (aGoal >= 3) {
                        aGoal = 1
                    }
                } else if (i === 13) { // 未开始
                    Intro_TopRow()
                } else if (i === 14) { // 通用
                    Anims_H2TextWrapper()
                } else if (i === 15) { // 球门球
                    Anims_goalKick(agoalKick)
                    agoalKick++
                    if (agoalKick >= 3) {
                        agoalKick = 1
                    }
                } else if (i === 16) { // 换人
                    Anims_subOnOff(aSubOnOff)
                    aSubOnOff++
                    if (aSubOnOff >= 3) {
                        aSubOnOff = 1
                    }
                }
            }
            this.$on('eventChange', this.executeEvent)

            if (this.currentcase && this.currentcase.case) {
                this.executeEvent(this.currentcase.case.caseType)
            } else {
                if (this.matchState === '0') {
                    Intro_TopRow()
                } else if (this.matchState !== '3') {
                    const tips = ({
                        '0': '未开始',
                        '1': '完场',
                        '2': '取消',
                        '3': '进行中的',
                        '4': '暂停',
                        '5': '取缔'
                    })[this.matchState]
                    $('.ml1-Anims_H3TextWrapper span').text(tips)
                    Anims_H2TextWrapper()
                }
            }

// 文字块定位
            let textAlign = null

            function showWrapper (a, b, h) {
                if (textAlign == null) {
                    textAlign = h
                }
                var e = 0, f = 0
                if (h === 'right') {
                    f = b + 1.83
                    e = a
                    $('.ml1-Anims_H2TextWrapper').animate({
                        opacity: 0,
                        top: '+=.2rem'
                    }, 100)
                    if (textAlign !== h) {
                        $('.ml1-Anims_H1TextWrapper').animate({
                            top: a + 'rem',
                            left: b + 'rem'
                        }, 3)
                        $('.ml1-Anims_H1TextWrapper').animate({
                            opacity: 1
                        }, 300)
                    } else {
                        $('.ml1-Anims_H1TextWrapper').animate({
                            opacity: 1,
                            top: a + 'rem',
                            left: b + 'rem'
                        }, 300)
                    }
                } else {
                    f = b - 0.07
                    e = a
                    $('.ml1-Anims_H1TextWrapper').animate({
                        opacity: 0,
                        top: '+=.2rem'
                    }, 100)
                    if (textAlign !== h) {
                        $('.ml1-Anims_H2TextWrapper').animate({
                            top: a + 'rem',
                            left: b + 'rem'
                        }, 3)
                        $('.ml1-Anims_H2TextWrapper').animate({
                            opacity: 1
                        }, 300)
                    } else {
                        $('.ml1-Anims_H2TextWrapper').animate({
                            opacity: 1,
                            top: a + 'rem',
                            left: b + 'rem'
                        }, 300)
                    }
                }
                $('.ml1-Anims_Line').animate({
                    top: e + 'rem',
                    left: f + 'rem'
                }, 300)

                textAlign = h
            }

// 隐藏其他动画内容
            function hideOther (o) {
                $('.change-score').removeClass('on')
                $('.evenList').addClass('hide')
                $('.svg-bg').addClass('hide')
                if ($('.ml1-animatedTextBar').hasClass('away')) {
                    $('.ml1-Anims_Line').height($('.ml1-Anims_H2TextWrapper').height())
                } else {
                    $('.ml1-Anims_Line').height($('.ml1-Anims_H1TextWrapper').height())
                }
                if (o === 1) {
                    $('.ml1-animatedTextBar').addClass('hide')
                } else {
                    $('.ml1-animatedTextBar').removeClass('hide')
                }
            }

// 本透明蒙版
            function shangeSvgBg (o) {
                $('.svg-bg').addClass('hide')
                $(o).removeClass('hide')
            }

            function rightA () {
                hideOther()
                shangeSvgBg('.svg-bg1')
                showWrapper(0.45, 1.9, 'left')
            };

            function rightB () {
                hideOther()
                shangeSvgBg('.svg-bg2')
                showWrapper(0.45, 1.4, 'left')
            };

            function rightC () {
                hideOther()
                shangeSvgBg('.svg-bg3')
                showWrapper(0.45, 0.9, 'left')
            };

            function leftA () {
                hideOther()
                shangeSvgBg('.svg-bg4')
                showWrapper(0.45, -0.52, 'right')
            };

            function leftB () {
                hideOther()
                shangeSvgBg('.svg-bg5')
                showWrapper(0.45, -0.02, 'right')
            }

            function leftC () {
                hideOther()
                shangeSvgBg('.svg-bg6')
                showWrapper(0.45, 0.48, 'right')
            }

            // eslint-disable-next-line
            function Anims_ArrowCurved(code) {
                if (navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('MSIE 9.0') > 0) {
                    // 角球
                    if (code === 1) {
                        showWrapper(0.7, 0.76, 'right')
                        $('.ml1-Anims_ArrowCurved').css({'left': '2.7rem', 'top': '.95rem'})
                        $('.ml1-Anims_ArrowCurved').attr({'id': 'rb'})
                    } else if (code === 2) {
                        showWrapper(0.2, 0.76, 'right')
                        $('.ml1-Anims_ArrowCurved').css({'left': '2.7rem', 'top': '.24rem'})
                        $('.ml1-Anims_ArrowCurved').attr({'id': 'rt'})
                    } else if (code === 3) {
                        showWrapper(0.2, 0.76, 'left')
                        $('.ml1-Anims_ArrowCurved').css({'left': '0rem', 'top': '0.244rem'})
                        $('.ml1-Anims_ArrowCurved').attr({'id': 'lt'})
                    } else if (code === 4) {
                        showWrapper(0.7, 0.76, 'left')
                        $('.ml1-Anims_ArrowCurved').css({'left': '.08rem', 'top': '.95rem'})
                        $('.ml1-Anims_ArrowCurved').attr({'id': 'lb'})
                    }
                } else {
                    if (code === 1) {
                        showWrapper(0.7, 0.76, 'right')
                        $('.ml1-Anims_ArrowCurved').css({
                            'left': '3.12rem',
                            'top': '.95rem',
                            'transform': 'scaleX(1) rotateZ(-65deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(-65deg)'
                        })
                    } else if (code === 2) {
                        showWrapper(0.2, 0.76, 'right')
                        $('.ml1-Anims_ArrowCurved').css({
                            'left': '3.12rem',
                            'top': '-.14rem',
                            'transform': 'scaleX(-1) rotateZ(115deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(115deg)'
                        })
                    } else if (code === 3) {
                        showWrapper(0.2, 0.76, 'left')
                        $('.ml1-Anims_ArrowCurved').css({
                            'left': '.09rem',
                            'top': '-.14rem',
                            'transform': 'scaleX(1) rotateZ(116deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(116deg)'
                        })
                    } else if (code === 4) {
                        showWrapper(0.7, 0.76, 'left')
                        $('.ml1-Anims_ArrowCurved').css({
                            'left': '.08rem',
                            'top': '.95rem',
                            'transform': 'scaleX(-1) rotateZ(-65deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(-65deg)'
                        })
                    }
                }
                hideOther()
                $('.Anims_ArrowCurved').removeClass('hide')
            }

// 换人
            // eslint-disable-next-line
            function Anims_subOnOff(code) {
                if (code === 1) {
                    showWrapper(0.45, 1.44, 'left')
                    $('.subOnOff').css({
                        'left': '1rem',
                        'top': '.5rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1'
                    })
                } else if (code === 2) {
                    showWrapper(0.45, -0.03, 'right')
                    $('.subOnOff').css({
                        'left': '1.9rem',
                        'top': '.5rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)'
                    })
                }
                hideOther()
                $('.ml1-subOnOff').removeClass('hide')
            }

            // 界外球
            //eslint-disable-next-line
            function Anims_ArrowShort(code) {
                if (navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('MSIE 9.0') > 0) {
                    if (code === 1) {
                        showWrapper(0.22, 1.1, 'left')
                        $('.ml1-Anims_ArrowShort').css({
                            'left': '.79rem',
                            'top': '-.02rem',
                            'transform': 'scaleX(1)',
                            '-webkit-transform': 'scaleX(1)'
                        })
                        $('.ml1-Anims_ArrowShort').removeClass('penalty').attr('id', 'ttr')
                    } else if (code === 2) {
                        showWrapper(0.22, 0.1, 'right')
                        $('.ml1-Anims_ArrowShort').css({
                            'left': '2.2rem',
                            'top': '-.02rem',
                            'transform': 'scaleX(1)',
                            '-webkit-transform': 'scaleX(1)'
                        })
                        $('.ml1-Anims_ArrowShort').removeClass('penalty').attr('id', 'ttl')
                    }
                } else {
                    if (code === 1) {
                        showWrapper(0.22, 1.1, 'left')
                        $('.ml1-Anims_ArrowShort').css({
                            'left': '.79rem',
                            'top': '-.02rem',
                            'transform': 'scaleX(-1) rotateZ(60deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(60deg)'
                        })
                    } else if (code === 2) {
                        showWrapper(0.22, 0.1, 'right')
                        $('.ml1-Anims_ArrowShort').css({
                            'left': '2.2rem',
                            'top': '-.02rem',
                            'transform': 'scaleX(1) rotateZ(60deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(60deg)'
                        })
                    }
                }

                hideOther()
                $('.Anims_ArrowShort').removeClass('hide')
            }

// 任意球
            // eslint-disable-next-line
            function aAnims_ArrowStraight(code) {
                if (navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('MSIE 9.0') > 0) {
                    if (code === 'FK1') { // 客队fk1
                        hideOther()
                        $('.Anims_ArrowShort').removeClass('hide')
                        showWrapper(0.68, 0.68, 'left')

                        $('.ml1-Anims_ArrowShort').removeAttr('id').addClass('penalty').css({
                            'left': '.4rem',
                            'top': '.79rem',
                            'transform': 'scaleX(-1)',
                            '-webkit-transform': 'scaleX(-1)'
                        })
                    } else if (code === 'FK2') { // 客队fk2
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.6, 1.2, 'left')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '.9rem',
                            'top': '.7rem',
                            'transform': 'scaleX(-1)',
                            '-webkit-transform': 'scaleX(-1)'
                        })
                    } else if (code === 'FK3L') { // 客队fk3L
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.7, 1.2, 'left')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '.9rem',
                            'top': '1rem',
                            'transform': 'scaleX(-1)',
                            '-webkit-transform': 'scaleX(-1)'
                        })
                    } else if (code === 'FK3R') { // 客队fk3R
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.2, 1.2, 'left')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '.9rem',
                            'top': '.08rem',
                            'transform': 'scaleX(-1)',
                            '-webkit-transform': 'scaleX(-1)'
                        })
                    } else if (code === 'FK4') { // 客队fk4
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.68, 1.6, 'left')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '1.4rem',
                            'top': '.8rem',
                            'transform': 'scaleX(-1)',
                            '-webkit-transform': 'scaleX(-1)'
                        })
                    } else if (code === 'FK5') { // 客队fk5
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.68, 2, 'left')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '1.8rem',
                            'top': '.8rem',
                            'transform': 'scaleX(-1)',
                            '-webkit-transform': 'scaleX(-1)'
                        })
                    } else if (code === '7') { // 客队点球
                        hideOther()
                        $('.Anims_ArrowShort').removeClass('hide')
                        showWrapper(0.5, 0.68, 'left')
                        $('.ml1-Anims_ArrowShort').removeAttr('id').addClass('penalty').css({
                            'left': '.34rem',
                            'top': '.56rem',
                            'transform': 'scaleX(-1)',
                            '-webkit-transform': 'scaleX(-1)'
                        })
                    }
                } else {
                    if (code === 'FK1') { // 客队fk1
                        hideOther()
                        $('.Anims_ArrowShort').removeClass('hide')
                        showWrapper(0.68, 0.68, 'left')
                        $('.ml1-Anims_ArrowShort').removeAttr('id').addClass('penalty').css({
                            'left': '.4rem',
                            'top': '.79rem',
                            'transform': 'scaleX(-1) rotateZ(-28deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(-28deg)'
                        })
                    } else if (code === 'FK2') { // 客队fk2
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.6, 1.2, 'left')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '.9rem',
                            'top': '.7rem',
                            'transform': 'scaleX(-1) rotateZ(-12deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(-12deg)'
                        })
                    } else if (code === 'FK3L') { // 客队fk3L
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.7, 1.2, 'left')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '.9rem',
                            'top': '1rem',
                            'transform': 'scaleX(-1) rotateZ(-30deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(-30deg)'
                        })
                    } else if (code === 'FK3R') { // 客队fk3R
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.2, 1.2, 'left')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '.9rem',
                            'top': '.08rem',
                            'transform': 'scaleX(-1) rotateZ(30deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(30deg)'
                        })
                    } else if (code === 'FK4') { // 客队fk4
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.68, 1.6, 'left')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '1.4rem',
                            'top': '.8rem',
                            'transform': 'scaleX(-1) rotateZ(-12deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(-12deg)'
                        })
                    } else if (code === 'FK5') { // 客队fk5
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.68, 2, 'left')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '1.8rem',
                            'top': '.8rem',
                            'transform': 'scaleX(-1) rotateZ(-8deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(-8deg)'
                        })
                    } else if (code === '7') { // 客队点球
                        hideOther()
                        $('.Anims_ArrowShort').removeClass('hide')
                        showWrapper(0.5, 0.68, 'left')
                        $('.ml1-Anims_ArrowShort').removeAttr('id').addClass('penalty').css({
                            'left': '.34rem',
                            'top': '.56rem',
                            'transform': 'scaleX(-1) rotateZ(0deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(0deg)'
                        })
                    }
                }
                return false
            }

// 任意球
            // eslint-disable-next-line
            function hAnims_ArrowStraight(code) {
                if (navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('MSIE 9.0') > 0) {
                    if (code === 'FK1') { // 主队fk1
                        hideOther()
                        $('.Anims_ArrowShort').removeClass('hide')
                        showWrapper(0.63, 0.7, 'right')
                        $('.ml1-Anims_ArrowShort').removeAttr('id').addClass('penalty').css({
                            'left': '2.8rem',
                            'top': '.79rem',
                            'transform': 'scaleX(1)',
                            '-webkit-transform': 'scaleX(1)'
                        })
                    } else if (code === 'FK2') { // 主队fk2
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.64, 0.4, 'right')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '2.4rem',
                            'top': '.7rem',
                            'transform': 'scaleX(1)',
                            '-webkit-transform': 'scaleX(1) '
                        })
                    } else if (code === 'FK3L') { // 主队fk3L
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.7, 0.2, 'right')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '2.4rem',
                            'top': '1rem',
                            'transform': 'scaleX(1)',
                            '-webkit-transform': 'scaleX(1) '
                        })
                    } else if (code === 'FK3R') { // 主队fk3R
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.2, 0.3, 'right')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '2.4rem',
                            'top': '.08rem',
                            'transform': 'scaleX(1)',
                            '-webkit-transform': 'scaleX(1) '
                        })
                    } else if (code === 'FK4') { // 主队fk4
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.68, -0.1, 'right')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '2rem',
                            'top': '.8rem',
                            'transform': 'scaleX(1)',
                            '-webkit-transform': 'scaleX(1) '
                        })
                    } else if (code === 'FK5') { // 主队fk5
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.64, -0.6, 'right')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '1.4rem',
                            'top': '.8rem',
                            'transform': 'scaleX(1)',
                            '-webkit-transform': 'scaleX(1)'
                        })
                    } else if (code === '7') { // 主队点球
                        hideOther()
                        $('.Anims_ArrowShort').removeClass('hide')
                        showWrapper(0.5, 0.78, 'right')
                        $('.ml1-Anims_ArrowShort').removeAttr('id').addClass('penalty').css({
                            'left': '2.86rem',
                            'top': '.56rem',
                            'transform': 'scaleX(1)',
                            '-webkit-transform': 'scaleX(1)'
                        })
                    }
                } else {
                    if (code === 'FK1') { // 主队fk1
                        hideOther()
                        $('.Anims_ArrowShort').removeClass('hide')
                        showWrapper(0.63, 0.7, 'right')
                        $('.ml1-Anims_ArrowShort').removeAttr('id').addClass('penalty').css({
                            'left': '2.8rem',
                            'top': '.79rem',
                            'transform': 'scaleX(1) rotateZ(-28deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(-28deg)'
                        })
                    } else if (code === 'FK2') { // 主队fk2
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.64, 0.4, 'right')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '2.4rem',
                            'top': '.7rem',
                            'transform': 'scaleX(1) rotateZ(-12deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(-12deg)'
                        })
                    } else if (code === 'FK3L') { // 主队fk3L
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.7, 0.2, 'right')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '2.4rem',
                            'top': '1rem',
                            'transform': 'scaleX(1) rotateZ(-49deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(-49deg)'
                        })
                    } else if (code === 'FK3R') { // 主队fk3R
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.2, 0.3, 'right')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '2.4rem',
                            'top': '.08rem',
                            'transform': 'scaleX(1) rotateZ(39deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(39deg)'
                        })
                    } else if (code === 'FK4') { // 主队fk4
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.68, -0.1, 'right')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '2rem',
                            'top': '.8rem',
                            'transform': 'scaleX(1) rotateZ(-12deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(-12deg)'
                        })
                    } else if (code === 'FK5') { // 主队fk5
                        hideOther()
                        $('.Anims_ArrowStraight').removeClass('hide')
                        showWrapper(0.64, -0.6, 'right')
                        $('.ml1-Anims_ArrowStraight').removeClass('penalty').css({
                            'left': '1.4rem',
                            'top': '.8rem',
                            'transform': 'scaleX(1) rotateZ(-8deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(-8deg)'
                        })
                    } else if (code === '7') { // 主队点球
                        hideOther()
                        $('.Anims_ArrowShort').removeClass('hide')
                        showWrapper(0.5, 0.78, 'right')
                        $('.ml1-Anims_ArrowShort').removeAttr('id').addClass('penalty').css({
                            'left': '2.86rem',
                            'top': '.56rem',
                            'transform': 'scaleX(1) rotateZ(0deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(0deg)'
                        })
                    }
                }
                return false
            }

// 球门球
            // eslint-disable-next-line
            function Anims_goalKick(code) {
                if (navigator.userAgent.indexOf('MSIE') > 0 && navigator.userAgent.indexOf('MSIE 9.0') > 0) {
                    if (code === 1) {
                        $('.Anims_ArrowCurved').removeClass('hide')
                        showWrapper(0.74, 1.8, 'left')
                        $('.ml1-Anims_ArrowCurved').css({'left': '2.35rem', 'top': '.39rem'})
                        $('.ml1-Anims_ArrowCurved').attr({'id': 'rgoal'})
                    } else if (code === 2) {
                        $('.Anims_ArrowCurved').removeClass('hide')
                        showWrapper(0.74, -0.43, 'right')
                        $('.ml1-Anims_ArrowCurved').css({'left': '.35rem', 'top': '.39rem'})
                        $('.ml1-Anims_ArrowCurved').attr({'id': 'lgoal'})
                    }
                } else {
                    if (code === 1) {
                        $('.Anims_ArrowCurved').removeClass('hide')
                        showWrapper(0.74, 1.8, 'left')
                        $('.ml1-Anims_ArrowCurved').css({
                            'left': '2.85rem',
                            'top': '.39rem',
                            'transform': 'scaleX(-1) rotateZ(22deg)',
                            '-webkit-transform': 'scaleX(-1) rotateZ(22deg)'
                        })
                    } else if (code === 2) {
                        $('.Anims_ArrowCurved').removeClass('hide')
                        showWrapper(0.74, -0.43, 'right')
                        $('.ml1-Anims_ArrowCurved').css({
                            'left': '.35rem',
                            'top': '.39rem',
                            'transform': 'scaleX(1) rotateZ(22deg)',
                            '-webkit-transform': 'scaleX(1) rotateZ(22deg)'
                        })
                    }
                }

                hideOther()
                $('.Anims_ArrowCurved').removeClass('hide')
            }

// 射偏球门
            // eslint-disable-next-line
            function Anims_ShotOffTarget(code) {
                if (code === 1) {
                    showWrapper(0.5, 0.9, 'left')
                    $('.ml1-Anims_Goal2').css({
                        'left': '.7rem',
                        'top': '.5rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                    $('.ml1-Anims_ShotOffTarget').css({
                        'left': '.46rem',
                        'top': '.44rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                } else if (code === 2) {
                    showWrapper(0.5, 0.9, 'left')
                    $('.ml1-Anims_Goal2').css({
                        'left': '.7rem',
                        'top': '.5rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                    $('.ml1-Anims_ShotOffTarget').css({
                        'left': '.66rem',
                        'top': '.59rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                } else if (code === 3) {
                    showWrapper(0.5, 0.32, 'right')
                    $('.ml1-Anims_Goal2').css({
                        'left': '2.5rem',
                        'top': '.5rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)'
                    })
                    $('.ml1-Anims_ShotOffTarget').css({
                        'left': '2.37rem',
                        'top': '.44rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)'
                    })
                } else if (code === 4) {
                    showWrapper(0.5, 0.32, 'right')
                    $('.ml1-Anims_Goal2').css({
                        'left': '2.5rem',
                        'top': '.5rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)'
                    })
                    $('.ml1-Anims_ShotOffTarget').css({
                        'left': '2.55rem',
                        'top': '.54rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)'
                    })
                } else if (code === 5) {
                    showWrapper(0.5, 0.9, 'left')
                    $('.ml1-Anims_Goal2').css({
                        'left': '.7rem',
                        'top': '.5rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                    $('.ml1-Anims_ShotOffTarget').css({
                        'left': '.3rem',
                        'top': '.59rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                } else if (code === 6) {
                    showWrapper(0.5, 0.32, 'right')
                    $('.ml1-Anims_Goal2').css({
                        'left': '2.5rem',
                        'top': '.5rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)'
                    })
                    $('.ml1-Anims_ShotOffTarget').css({
                        'left': '2.9rem',
                        'top': '.6rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)'
                    })
                }
                hideOther()
                $('.Anims_ShotOffTarget').removeClass('hide')
            }

// 越位
            // eslint-disable-next-line
            function Anims_Offside(code) {
                if (code === 1) {
                    showWrapper(0.48, 0.9, 'left')
                    $('.ml1-Anims_OffsideLine').css({'left': '.47rem'})
                    $('.ml1-Anims_Offside').css({
                        'left': '.75rem',
                        'top': '.47rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                } else if (code === 2) {
                    showWrapper(0.48, 0.47, 'right')
                    $('.ml1-Anims_OffsideLine').css({'left': '2.72rem'})
                    $('.ml1-Anims_Offside').css({
                        'left': '2.44rem',
                        'top': '.47rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)'
                    })
                }
                hideOther()
                $('.Anims_Offside').removeClass('hide')
            }

// 进球
            // eslint-disable-next-line
            function Anims_Goal(code) {
                $('.change-score').removeClass('on')
                if (code === 1) {
                    showWrapper(0.5, 0.9, 'left')
                    $('.ml1-Anims_Goal').css({
                        'left': '.7rem',
                        'top': '.48rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                    $('.ml1-Anims_GoalBall').css({
                        'left': '.76rem',
                        'top': '.48rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                } else if (code === 2) {
                    showWrapper(0.5, 0.52, 'right')
                    $('.ml1-Anims_Goal').css({
                        'left': '2.5rem',
                        'top': '.48rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)'
                    })
                    $('.ml1-Anims_GoalBall').css({
                        'left': '2.46rem',
                        'top': '.48rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1)'
                    })
                }
                /* setTimeout(function () {
                 hideOther(1)
                 $('.change-score').addClass('on')
                 }, 1200)
                 */
                hideOther()
                $('.Anims_Goal').removeClass('hide')
            }

            // 确认进球
            // eslint-disable-next-line
            function comfirmGoal(isHome) {
                setTimeout(() => {
                    hideOther(1)
                    $('.change-score').addClass('on')
                }, 1200)
            }

// 黄牌
            // eslint-disable-next-line
            function Anims_YellowCard(code) {
                if (code === 1) {
                    showWrapper(0.46, -0.24, 'right')
                    $('.ml1-Anims_YellowCard').removeClass('ml1-Anims_RedCard').css({
                        'left': '1.68rem',
                        'top': '.43rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1))'
                    })
                } else if (code === 2) {
                    showWrapper(0.46, -0.24, 'right')
                    $('.ml1-Anims_YellowCard').addClass('ml1-Anims_RedCard').css({
                        'left': '1.68rem',
                        'top': '.43rem',
                        'transform': 'scaleX(1)',
                        '-webkit-transform': 'scaleX(1))'
                    })
                } else if (code === 3) {
                    showWrapper(0.46, 1.65, 'left')
                    $('.ml1-Anims_YellowCard').removeClass('ml1-Anims_RedCard').css({
                        'left': '1.35rem',
                        'top': '.43rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                } else if (code === 4) {
                    showWrapper(0.46, 1.65, 'left')
                    $('.ml1-Anims_YellowCard').addClass('ml1-Anims_RedCard').css({
                        'left': '1.35rem',
                        'top': '.43rem',
                        'transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)'
                    })
                }
                hideOther()
                $('.Anims_YellowCard').removeClass('hide')
            }

            /* 未开始 */
            // eslint-disable-next-line
            function Intro_TopRow() {
                hideOther(1)
                $('.ml1-Intro_TopRow-box').removeClass('hide')
            }

            /* 居中大文字提示 */
            // eslint-disable-next-line
            function Anims_H2TextWrapper() {
                hideOther(1)
                $('.ml1-Anims_H3TextWrapper').removeClass('hide')
            }
        }
    }
</script>
