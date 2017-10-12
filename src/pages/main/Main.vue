<template>
    <div class="wrap wrap_bet respon2" v-if="fmdetail">
        <section class="header_bet clear">
            <div class="icon icon_back" v-tap="{methods:goMyPages,target:'backHistory'}"></div>
            <div class="header_c">
                <div class="team team_l">
                        <span class="team_logo">
                        <img v-if="fmdetail.HomeLogo"
                             :src="fmdetail.HomeLogo" @error="imgOnErrorLogo">
                        <img v-else
                             src="~static/images/placehoder.png"></span> {{fmdetail.HomeTeamName}}
                </div>
                <div class="team_info">
                    <span class="vs" v-if="fmdetail.MatchState==='0'||fmdetail.MatchState==='2'">VS</span>
                    <p v-else>
                        <em class="time">{{fmdetail.MatchStatus, MatchOnTime | mss}}</em>
                        <span class="score"><i>{{fmdetail.HomeTeamScore || '-'}}</i>:<i>{{fmdetail.AwayTeamScore || '-'}}</i></span>
                    </p>
                </div>
                <div class="team team_r">
                    {{fmdetail.AwayTeamName}}
                        <span class="team_logo">
                            <img v-if="fmdetail.AwayLogo"
                                 :src="fmdetail.AwayLogo" @error="imgOnErrorLogo">
                            <img v-else
                                 src="~static/images/placehoder.png"></span>
                </div>
            </div>
            <div class="icon icon_home" v-tap="{methods:goMyPages,target:'homeHot'}"></div>
        </section>
        <div class="respon2-itm">
            <div class="full-scroll">
                <section class="bet_live">
                    <match-live ref="live" :match-time="fmdetail.MatchTime" :match-state="fmdetail.MatchState"
                                :home-team="fmdetail.HomeTeamName"
                                :home-team-score="fmdetail.HomeTeamScore"
                                :away-team-score="fmdetail.AwayTeamScore"
                                :away-team="fmdetail.AwayTeamName"
                                :currentcase="fmdetail.currentcase"></match-live>

                </section>
                <section class="notice clear">
                    <banner-scroll v-if="bannerData && bannerData.length>0">
                        <div class="text-scroller">
                            <ul class="scroller-in">
                                <li v-for="ban in bannerData" v-html="ban"></li>
                            </ul>
                        </div>
                    </banner-scroll>
                    <div class="fr">
                        <span class="btn btn_tongji" v-tap="{methods:goMyPages,target:'eventCount'}"></span>
                        <span class="btn btn_record" v-tap="{methods:goMyPages,target:'betlist'}"><i
                                v-if="userinfo && userinfo.newprize && userinfo.newprize !='0'"></i></span>
                    </div>
                </section>
                <section class="betWrap">
                    <ul class="betNav">
                        <li :class="{cur: currTab==='all'}" v-tap="{methods: changeTab, tab: 'all'}"><span>全部</span>
                        </li>
                        <li :class="{cur: currTab==='sg'}" v-tap="{methods: changeTab, tab: 'sg'}"><span>赛果</span>
                        </li>
                        <li :class="{cur: currTab==='ds'}" v-tap="{methods: changeTab, tab: 'ds'}"><span>单双</span>
                        </li>
                        <li :class="{cur: currTab==='jq'}" v-tap="{methods: changeTab, tab: 'jq'}"><span>进球</span>
                        </li>
                        <li :class="{cur: currTab==='bf'}" v-tap="{methods: changeTab, tab: 'bf'}"><span>比分</span>
                        </li>
                    </ul>

                    <template v-if="fmdetail.MatchState==='2' || Object.keys(fmdetail.odds).length <= 1">
                        <div class="betEara">
                            <div class="empty-msg">
                                <strong v-if="Object.keys(fmdetail.odds).length <= 1 && fmdetail.MatchState!='2'">本场比赛竞猜暂未开放</strong>
                                <strong v-if="fmdetail.MatchState==='2'">本场竞猜已停止</strong>
                                <p class="color9" v-if="fmdetail.MatchState==='2'">如您已参与本场竞猜，所投注猜球币将全额返还</p>
                            </div>
                            <p class="empty-info">微信公众号搜索：疯狂猜球服务号</p>
                        </div>

                    </template>
                    <template v-else>
                        <div v-if="currTab==='all'" class="betEara ">
                            <!--猜赛果-->
                            <div class="betBox" v-tap="{methods:clickPanel}" v-if="fmdetail.odds[100]!==undefined"
                                 :class="{ 'betBox-end': fmdetail.odds[100].State!=='1'&&fmdetail.odds[100].State!=='3'}">
                                <div class="boxTit boxTit-saig clear">
                                    <h3>猜赛果</h3>
                                    <span>90分钟内哪个队伍获胜？</span>
                                </div>
                                <div class="boxInner">
                                    <div class="bet">
                                        <!--item-end  slt 选中  item-zj win  changeColor 闪烁stat  -->
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['1'].State==='0', 'slt':current===fmdetail.odds[100].Selections[1],'item-end':fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result!=='1','item-zj': fmdetail.odds[100].Selections['1'].golds&&fmdetail.odds[100].Selections['1'].prize_state==='1'&&fmdetail.odds[100].Selections['1'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[100].Selections['1'], ruleType: '100', rule: fmdetail.odds[100]}}"
                                        >
                                            <!--<span class="item-xx">{{fmdetail.HomeTeamName}}</span>-->
                                            <span class="item-xx">主胜</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['1001'],'item-gray':fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result==='1'}">{{ fmdetail.odds[100].Selections[1].BackOdds}}</span>
                                            <span class="item-zc">{{ fmdetail.odds[100].Selections[1].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['0'].State==='0','slt':current===fmdetail.odds[100].Selections[0],'item-end':fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result!=='0','item-zj': fmdetail.odds[100].Selections['0'].golds&&fmdetail.odds[100].Selections['0'].prize_state==='1'&&fmdetail.odds[100].Selections['0'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[100].Selections['0'], ruleType: '100', rule: fmdetail.odds[100]}}"
                                        >
                                            <span class="item-xx">平</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['1000'],'item-gray': fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result==='0'}">{{ fmdetail.odds[100].Selections[0].BackOdds}}</span>
                                            <span class="item-zc">{{ fmdetail.odds[100].Selections[0].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['0'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['-1'].State==='0','slt':current===fmdetail.odds[100].Selections[-1],'item-end':fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result!=='-1','item-zj':fmdetail.odds[100].Selections['-1'].golds&&fmdetail.odds[100].Selections['-1'].prize_state==='1'&&fmdetail.odds[100].Selections['-1'].bonus!=='0'}"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[100].Selections['-1'], ruleType: '100', rule: fmdetail.odds[100]}}"
                                        >
                                            <span class="item-xx">客胜</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['100-1'],'item-gray': fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result==='-1'}">{{ fmdetail.odds[100].Selections[-1].BackOdds}}</span>
                                            <span class="item-zc">{{ fmdetail.odds[100].Selections[-1].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['-1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="endTips"
                                             v-if="fmdetail.odds[100].State!=='1'&&fmdetail.odds[100].State!=='3'">
                                            封盘中...



                                        </div>
                                    </div>
                                    <div class="betShow"
                                         :class="{'hide':!fmdetail.odds[100].Selections['1'].golds &&
                                                 !fmdetail.odds[100].Selections['0'].golds &&
                                                 !fmdetail.odds[100].Selections['-1'].golds
                                        }"
                                    >
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[100].Selections['1'].golds&&fmdetail.odds[100].Selections['1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[100].Selections['1'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[100].Selections['1'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[100].Selections['1'].golds&&fmdetail.odds[100].Selections['1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[100].Selections['1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[100].Selections['1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[100].Selections['1'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[100].Selections['0'].golds&&fmdetail.odds[100].Selections['0'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[100].Selections['0'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[100].Selections['0'].bonus | format}}</p>
                                            </template>

                                            <template
                                                    v-if="fmdetail.odds[100].Selections['0'].golds&&fmdetail.odds[100].Selections['0'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[100].Selections['0'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[100].Selections['0'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[100].Selections['0'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[100].Selections['-1'].golds&&fmdetail.odds[100].Selections['-1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[100].Selections['-1'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[100].Selections['-1'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[100].Selections['-1'].golds&&fmdetail.odds[100].Selections['-1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[100].Selections['-1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[100].Selections['-1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[100].Selections['-1'].bonus | format}}</p>
                                            </template>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="betBox" v-tap="{methods:clickPanel}" v-if="fmdetail.odds[130]!==undefined"
                                 :class="{'betBox-end':fmdetail.odds[130].State!=='1'&&fmdetail.odds[130].State!=='3'}">
                                <div class="boxTit boxTit-dans clear">
                                    <h3>猜单双</h3>
                                    <span>90分钟内比赛总进球数单双？</span>
                                </div>
                                <div class="boxInner">
                                    <div class="bet">
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[130].State=='1'&&fmdetail.odds[130].Selections['1'].State==='0', 'slt': current===fmdetail.odds[130].Selections['1'], 'item-end': fmdetail.odds[130].State==='3'&&fmdetail.odds[130].result!=='1','item-zj': fmdetail.odds[130].Selections['1'].golds&&fmdetail.odds[130].Selections['1'].prize_state==='1'&&fmdetail.odds[130].Selections['1'].bonus!=='0'}"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[130].Selections['1'], ruleType: '130', rule: fmdetail.odds[130]}}"
                                        >
                                            <span class="item-xx">单</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['1301'],'item-gray': fmdetail.odds[130].State==='3'&&fmdetail.odds[130].result==='1'}">{{ fmdetail.odds[130].Selections[1].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[130].Selections[1].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[130].State=='1'&&fmdetail.odds[130].Selections['1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{'endItem':fmdetail.odds[130].State=='1'&&fmdetail.odds[130].Selections['-1'].State==='0','slt': current===fmdetail.odds[130].Selections['-1'], 'item-end': fmdetail.odds[130].State==='3'&&fmdetail.odds[130].result!=='-1','item-zj': fmdetail.odds[130].Selections['-1'].golds&&fmdetail.odds[130].Selections['-1'].prize_state==='1'&&fmdetail.odds[130].Selections['-1'].bonus!=='0'}"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[130].Selections['-1'], ruleType: '130', rule: fmdetail.odds[130]}}"
                                        >
                                            <span class="item-xx">双</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['130-1'],'item-gray': fmdetail.odds[130].State==='3'&&fmdetail.odds[130].result==='-1'}">{{ fmdetail.odds[130].Selections[-1].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[130].Selections[-1].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[130].State=='1'&&fmdetail.odds[130].Selections['-1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="endTips"
                                             v-if="fmdetail.odds[130].State!=='1'&&fmdetail.odds[130].State!=='3'">
                                            封盘中...



                                        </div>
                                    </div>
                                    <div class="betShow"
                                         :class="{'hide':!fmdetail.odds[130].Selections['1'].golds &&
                                                 !fmdetail.odds[130].Selections['-1'].golds
                                        }"
                                    >
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[130].Selections['1'].golds&&fmdetail.odds[130].Selections['1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[130].Selections['1'].golds}}</em>
                                                <p>
                                                    可中{{fmdetail.odds[130].Selections['1'].bonus}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[130].Selections['1'].golds&&fmdetail.odds[130].Selections['1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[130].Selections['1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[130].Selections['1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[130].Selections['1'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[130].Selections['-1'].golds&&fmdetail.odds[130].Selections['-1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[130].Selections['-1'].golds |
                                            format}}</em>
                                                <p>
                                                    可中{{fmdetail.odds[130].Selections['-1'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[130].Selections['-1'].golds&&fmdetail.odds[130].Selections['-1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[130].Selections['-1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[130].Selections['-1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[130].Selections['-1'].bonus | format}}</p>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 第几个进球 350-->
                            <div class="betBox betBox-djg" id="box-scroll" v-tap="{methods:clickPanel}"
                                 v-if="fmdetail.odds[350]!==undefined"
                            >
                                <div class="boxTit boxTit-jinq clear">
                                    <h3>猜第<label id="nextScore">0</label>个进球</h3>
                                </div>
                                <ul class="boxTab" v-if="this.showUINextBtn" style="z-index: 8">
                                    <li class="prev" :class="{ 'on':prevStyle}" v-tap="{methods:slidePre}"></li>
                                    <li class="next" :class="{ 'on':nextStyle}" v-tap="{methods:slideNext}"></li>
                                </ul>
                                <slider :pages="someList" :sliderinit="sliderinit" @slide='slide'>
                                    <template v-if="someList.length" v-tap="{methods:clickPanel}"
                                              v-for="item in someList">
                                        <div class="slider-item boxInner"
                                             :class="{'betBox-end':item.State!=='1'&&item.State!=='3'}">
                                            <div class="bet">
                                                <div class="item"
                                                     :class="{'endItem':item.State=='1'&&item.Selections['1'].State==='0','slt': current===item.Selections['1'], 'item-end': item.State==='3'&&item.result!=='1','item-zj': item.Selections['1'].golds&&item.Selections['1'].prize_state==='1'&&item.Selections['1'].bonus!=='0'}"
                                                     v-tap="{methods: selectItem, params: {item: item.Selections['1'], ruleType: '350', rule: item}}">
                                                    <span class="item-xx">主队</span>
                                                    <span class="item-pl"
                                                          :class="{'changeColor':stat['3501-'+item.nextscore],'item-gray': item.State==='3'&&item.result==='1'}">{{item.Selections[1].BackOdds}}</span>
                                                    <span class="item-zc">{{item.Selections[1].support}}支持</span>
                                                    <div class="endTips"
                                                         v-if="item.State=='1'&&item.Selections['1'].State==='0'">
                                                        封盘中...



                                                    </div>
                                                </div>
                                                <div class="item"
                                                     :class="{'endItem':item.State=='1'&&item.Selections['0'].State==='0','slt': current===item.Selections['0'], 'item-end': item.State==='3'&&item.result!=='0','item-zj': item.Selections['0'].golds&&item.Selections['0'].prize_state==='1'&&item.Selections['0'].bonus!=='0'}"
                                                     v-tap="{methods: selectItem, params: {item: item.Selections['0'], ruleType: '350', rule: item}}"
                                                >
                                                    <span class="item-xx">无</span>
                                                    <span class="item-pl"
                                                          :class="{'changeColor':stat['3500-'+item.nextscore],'item-gray': item.State==='3'&&item.result==='0'}">{{item.Selections[0].BackOdds}}</span>
                                                    <span class="item-zc">{{item.Selections[0].support}}支持</span>
                                                    <div class="endTips"
                                                         v-if="item.State=='1'&&item.Selections['0'].State==='0'">
                                                        封盘中...



                                                    </div>
                                                </div>
                                                <div class="item"
                                                     :class="{'endItem':item.State=='1'&&item.Selections['-1'].State==='0','slt': current===item.Selections['-1'], 'item-end': item.State==='3'&&item.result!=='-1','item-zj': item.Selections['-1'].golds&&item.Selections['-1'].prize_state==='1'&&item.Selections['-1'].bonus!=='0'}"
                                                     v-tap="{methods: selectItem, params: {item: item.Selections['-1'], ruleType: '350', rule: item}}"
                                                >
                                                    <span class="item-xx">客队</span>
                                                    <span class="item-pl"
                                                          :class="{'changeColor':stat['350-1-'+item.nextscore],'item-gray': item.State==='3'&&item.result==='-1'}">{{item.Selections[-1].BackOdds}}</span>
                                                    <span class="item-zc">{{item.Selections[-1].support}}支持</span>
                                                    <div class="endTips"
                                                         v-if="item.State=='1'&&item.Selections['-1'].State==='0'">
                                                        封盘中...



                                                    </div>
                                                </div>
                                                <div class="endTips" v-if="item.State!=='1'&&item.State!=='3'">
                                                    封盘中...


                                                </div>
                                            </div>
                                            <div class="betShow">

                                                <div class="item">
                                                    <template
                                                            v-if="item.Selections['1'].golds&&item.Selections['1'].prize_state==='-1'">
                                                        <i class="icon-jinbi"></i>
                                                        <em class="emColor">{{ item.Selections['1'].golds | format
                                                            }}</em>
                                                        <p>可中{{item.Selections['1'].bonus | format}}</p>
                                                    </template>
                                                    <template
                                                            v-if="item.Selections['1'].golds&&item.Selections['1'].prize_state==='1'">
                                                        <i class="icon-jinbi"></i><em
                                                            class="gray">{{item.Selections['1'].golds | format}}</em>
                                                        <p v-if="item.Selections['1'].bonus!=='0'" class="red">
                                                            中{{item.Selections['1'].bonus | format}}</p>
                                                    </template>
                                                </div>
                                                <div class="item">
                                                    <template
                                                            v-if="item.Selections['0'].golds&&item.Selections['0'].prize_state==='-1'">
                                                        <i class="icon-jinbi"></i>
                                                        <em class="emColor">{{ item.Selections['0'].golds | format
                                                            }}</em>
                                                        <p>可中{{item.Selections['0'].bonus | format}}</p>
                                                    </template>

                                                    <template
                                                            v-if="item.Selections['0'].golds&&item.Selections['0'].prize_state==='1'">
                                                        <i class="icon-jinbi"></i><em
                                                            class="gray">{{item.Selections['0'].golds | format}}</em>
                                                        <p v-if="item.Selections['0'].bonus!=='0'" class="red">
                                                            中{{item.Selections['0'].bonus | format}}</p>
                                                    </template>
                                                </div>
                                                <div class="item">
                                                    <template
                                                            v-if="item.Selections['-1'].golds&&item.Selections['-1'].prize_state==='-1'">
                                                        <i class="icon-jinbi"></i>
                                                        <em class="emColor">{{ item.Selections['-1'].golds | format
                                                            }}</em>
                                                        <p>可中{{item.Selections['-1'].bonus | format}}</p>
                                                    </template>
                                                    <template
                                                            v-if="item.Selections['-1'].golds&&item.Selections['-1'].prize_state==='1'">
                                                        <i class="icon-jinbi"></i><em
                                                            class="gray">{{item.Selections['-1'].golds | format}}</em>
                                                        <p v-if="item.Selections['-1'].bonus!=='0'" class="red">
                                                            中{{item.Selections['-1'].bonus | format}}</p>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </slider>
                            </div>
                            <!-- 总进球数 410 -->
                            <div class="betBox betBox-zjq" v-tap="{methods:clickPanel}" v-if="fmdetail.odds[410]!==undefined"
                                 :class="{ 'betBox-end': fmdetail.odds[410].State!=='1'&&fmdetail.odds[410].State!=='3'}"
                            >
                                <div class="boxTit boxTit-zongj clear">
                                    <h3>总进球数</h3>
                                    <span>90分钟内总进球数</span>
                                </div>
                                <div class="boxInner">
                                    <div class="bet">
                                        <div class="item"
                                             :class="{'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['1'].State==='0', 'slt':current===fmdetail.odds[410].Selections['1'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='1','item-zj': fmdetail.odds[410].Selections['1'].golds&&fmdetail.odds[410].Selections['1'].prize_state==='1'&&fmdetail.odds[410].Selections['1'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['1'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">0</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4101'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='1'}">{{ fmdetail.odds[410].Selections[1].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['1'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['2'].State==='0', 'slt':current===fmdetail.odds[410].Selections['2'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='2','item-zj': fmdetail.odds[410].Selections['2'].golds&&fmdetail.odds[410].Selections['2'].prize_state==='1'&&fmdetail.odds[410].Selections['2'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['2'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">1</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4102'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='2'}">{{ fmdetail.odds[410].Selections[2].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['2'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['2'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['3'].State==='0', 'slt':current===fmdetail.odds[410].Selections['3'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='3','item-zj': fmdetail.odds[410].Selections['3'].golds&&fmdetail.odds[410].Selections['3'].prize_state==='1'&&fmdetail.odds[410].Selections['3'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['3'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">2</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4103'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='3'}">{{ fmdetail.odds[410].Selections[3].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['3'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['3'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['4'].State==='0', 'slt':current===fmdetail.odds[410].Selections['4'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='4','item-zj': fmdetail.odds[410].Selections['4'].golds&&fmdetail.odds[410].Selections['4'].prize_state==='1'&&fmdetail.odds[410].Selections['4'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['4'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">3</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4104'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='4'}">{{ fmdetail.odds[410].Selections[4].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['4'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['4'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="endTips"
                                             v-if="fmdetail.odds[410].State!=='1'&&fmdetail.odds[410].State!=='3'">
                                            封盘中...



                                        </div>
                                    </div>
                                    <div class="betShow"
                                         :class="{'hide':!fmdetail.odds[410].Selections['1'].golds &&
                                                 !fmdetail.odds[410].Selections['2'].golds &&
                                                 !fmdetail.odds[410].Selections['3'].golds &&
                                                 !fmdetail.odds[410].Selections['4'].golds
                                        }"
                                    >
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['1'].golds&&fmdetail.odds[410].Selections['1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['1'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['1'].bonus | format}}</p>
                                            </template>

                                            <template
                                                    v-if="fmdetail.odds[410].Selections['1'].golds&&fmdetail.odds[410].Selections['1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['1'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['2'].golds&&fmdetail.odds[410].Selections['2'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['2'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['2'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['2'].golds&&fmdetail.odds[410].Selections['2'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['2'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['2'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['2'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['3'].golds&&fmdetail.odds[410].Selections['3'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['3'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['3'].bonus | format}}</p>
                                            </template>

                                            <template
                                                    v-if="fmdetail.odds[410].Selections['3'].golds&&fmdetail.odds[410].Selections['3'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['3'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['3'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['3'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['4'].golds&&fmdetail.odds[410].Selections['4'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['4'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['4'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['4'].golds&&fmdetail.odds[410].Selections['4'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['4'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['4'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['4'].bonus | format}}</p>
                                            </template>
                                        </div>
                                    </div>
                                    <!--<div class="endTips hide">封盘中...</div>-->
                                </div>
                                <div class="boxInner">
                                    <div class="bet">
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['5'].State==='0', 'slt':current===fmdetail.odds[410].Selections['5'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='5','item-zj': fmdetail.odds[410].Selections['5'].golds&&fmdetail.odds[410].Selections['5'].prize_state==='1'&&fmdetail.odds[410].Selections['5'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['5'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">4</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4105'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='5'}">{{ fmdetail.odds[410].Selections[5].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['5'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['5'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['6'].State==='0', 'slt':current===fmdetail.odds[410].Selections['6'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='6','item-zj': fmdetail.odds[410].Selections['6'].golds&&fmdetail.odds[410].Selections['6'].prize_state==='1'&&fmdetail.odds[410].Selections['6'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['6'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">5</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4106'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='6'}">{{ fmdetail.odds[410].Selections[6].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['6'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['6'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>

                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['7'].State==='0', 'slt':current===fmdetail.odds[410].Selections['7'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='7','item-zj': fmdetail.odds[410].Selections['7'].golds&&fmdetail.odds[410].Selections['7'].prize_state==='1'&&fmdetail.odds[410].Selections['7'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['7'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">6</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4107'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='7'}">{{ fmdetail.odds[410].Selections[7].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['7'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['7'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['-1'].State==='0', 'slt':current===fmdetail.odds[410].Selections['-1'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='-1','item-zj': fmdetail.odds[410].Selections['-1'].golds&&fmdetail.odds[410].Selections['-1'].prize_state==='1'&&fmdetail.odds[410].Selections['-1'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['-1'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">7+</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['410-1'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='-1'}">{{ fmdetail.odds[410].Selections[-1].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['-1'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['-1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="endTips"
                                             v-if="fmdetail.odds[410].State!=='1'&&fmdetail.odds[410].State!=='3'">
                                            封盘中...



                                        </div>
                                    </div>
                                    <div class="betShow"
                                         :class="{'hide':!fmdetail.odds[410].Selections['5'].golds &&
                                                 !fmdetail.odds[410].Selections['6'].golds &&
                                                 !fmdetail.odds[410].Selections['7'].golds &&
                                                 !fmdetail.odds[410].Selections['-1'].golds
                                        }"
                                    >
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['5'].golds&&fmdetail.odds[410].Selections['5'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['5'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['5'].bonus | format}}</p>
                                            </template>

                                            <template
                                                    v-if="fmdetail.odds[410].Selections['5'].golds&&fmdetail.odds[410].Selections['5'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['5'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['5'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['5'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['6'].golds&&fmdetail.odds[410].Selections['6'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['6'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['6'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['6'].golds&&fmdetail.odds[410].Selections['6'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['6'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['6'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['6'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['7'].golds&&fmdetail.odds[410].Selections['7'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['7'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['7'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['7'].golds&&fmdetail.odds[410].Selections['7'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['7'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['7'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['7'].bonus | format}}</p>
                                            </template>

                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['-1'].golds&&fmdetail.odds[410].Selections['-1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['-1'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['-1'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['-1'].golds&&fmdetail.odds[410].Selections['-1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['-1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['-1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['-1'].bonus | format}}</p>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="endTips hide">封盘中...</div>
                                </div>
                            </div>
                            <!-- 猜比分 140 -->
                            <div class="betBox betBox-bif" v-tap="{methods:clickPanel}"
                                 v-if="fmdetail.odds[140]!==undefined"
                                 :class="{'betBox-end': fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'}"
                            >
                                <div class="boxTit boxTit-bif clear">
                                    <h3>猜比分</h3>
                                    <span>90分钟内比分结果</span>
                                </div>

                                <ul class="tab-bif">
                                    <li class="" :class="{ 'cur':gussTab_home }"
                                        v-tap="{ methods:gussTabFn,params:{ tabStyle:'gussTab_home' } }">主胜



                                    </li>
                                    <li class="" :class="{ 'cur':gussTab_draw }"
                                        v-tap="{ methods:gussTabFn,params:{ tabStyle:'gussTab_draw' } }">平局



                                    </li>
                                    <li class="" :class="{ 'cur':gussTab_away }"
                                        v-tap="{ methods:gussTabFn,params:{ tabStyle:'gussTab_away' } }">客胜



                                    </li>
                                </ul>
                                <!-- 主胜 -->
                                <div class="boxWrap" v-if="gussTab_home">
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10002','item-zj': fmdetail.odds[140].Selections['10002'].golds&&fmdetail.odds[140].Selections['10002'].prize_state==='1'&&fmdetail.odds[140].Selections['10002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10002'}">{{ fmdetail.odds[140].Selections[10002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10002'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10003','item-zj': fmdetail.odds[140].Selections['10003'].golds&&fmdetail.odds[140].Selections['10003'].prize_state==='1'&&fmdetail.odds[140].Selections['10003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10003'}">{{ fmdetail.odds[140].Selections[10003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10003'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20003','item-zj': fmdetail.odds[140].Selections['20003'].golds&&fmdetail.odds[140].Selections['20003'].prize_state==='1'&&fmdetail.odds[140].Selections['20003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20003'}">{{ fmdetail.odds[140].Selections[20003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20003'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10004','item-zj': fmdetail.odds[140].Selections['10004'].golds&&fmdetail.odds[140].Selections['10004'].prize_state==='1'&&fmdetail.odds[140].Selections['10004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10004'}">{{ fmdetail.odds[140].Selections[10004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10004'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['10002'].golds &&
                                                     !fmdetail.odds[140].Selections['10003'].golds &&
                                                     !fmdetail.odds[140].Selections['20003'].golds &&
                                                     !fmdetail.odds[140].Selections['10004'].golds
                                            }"
                                        >

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10002'].golds&&fmdetail.odds[140].Selections['10002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10002'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10002'].bonus | format}}</p>
                                                </template>

                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10002'].golds&&fmdetail.odds[140].Selections['10002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10002'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10002'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10003'].golds&&fmdetail.odds[140].Selections['10003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10003'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10003'].golds&&fmdetail.odds[140].Selections['10003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10003'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10003'].bonus | format}}</p>
                                                </template>

                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20003'].golds&&fmdetail.odds[140].Selections['20003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20003'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20003'].golds&&fmdetail.odds[140].Selections['20003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20003'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20003'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10004'].golds&&fmdetail.odds[140].Selections['10004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10004'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10004'].golds&&fmdetail.odds[140].Selections['10004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10004'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10004'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20004','item-zj': fmdetail.odds[140].Selections['20004'].golds&&fmdetail.odds[140].Selections['20004'].prize_state==='1'&&fmdetail.odds[140].Selections['20004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20004'}">{{ fmdetail.odds[140].Selections[20004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20004'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30004','item-zj': fmdetail.odds[140].Selections['30004'].golds&&fmdetail.odds[140].Selections['30004'].prize_state==='1'&&fmdetail.odds[140].Selections['30004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30004'}">{{ fmdetail.odds[140].Selections[30004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30004'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10005','item-zj': fmdetail.odds[140].Selections['10005'].golds&&fmdetail.odds[140].Selections['10005'].prize_state==='1'&&fmdetail.odds[140].Selections['10005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10005'}">{{ fmdetail.odds[140].Selections[10005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10005'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20005','item-zj': fmdetail.odds[140].Selections['20005'].golds&&fmdetail.odds[140].Selections['20005'].prize_state==='1'&&fmdetail.odds[140].Selections['20005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20005'}">{{ fmdetail.odds[140].Selections[20005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20005'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['20004'].golds &&
                                                     !fmdetail.odds[140].Selections['30004'].golds &&
                                                     !fmdetail.odds[140].Selections['10005'].golds &&
                                                     !fmdetail.odds[140].Selections['20005'].golds
                                            }"
                                        >

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20004'].golds&&fmdetail.odds[140].Selections['20004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20004'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20004'].golds&&fmdetail.odds[140].Selections['20004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20004'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20004'].bonus | format}}</p>
                                                </template>

                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30004'].golds&&fmdetail.odds[140].Selections['30004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30004'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30004'].golds&&fmdetail.odds[140].Selections['30004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30004'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30004'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10005'].golds&&fmdetail.odds[140].Selections['10005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10005'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10005'].bonus | format}}</p>
                                                </template>

                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10005'].golds&&fmdetail.odds[140].Selections['10005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10005'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20005'].golds&&fmdetail.odds[140].Selections['20005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20005'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20005'].golds&&fmdetail.odds[140].Selections['20005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20005'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30005','item-zj': fmdetail.odds[140].Selections['30005'].golds&&fmdetail.odds[140].Selections['30005'].prize_state==='1'&&fmdetail.odds[140].Selections['30005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30005'}">{{ fmdetail.odds[140].Selections[30005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30005'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40005','item-zj': fmdetail.odds[140].Selections['40005'].golds&&fmdetail.odds[140].Selections['40005'].prize_state==='1'&&fmdetail.odds[140].Selections['40005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40005'}">{{ fmdetail.odds[140].Selections[40005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40005'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10006','item-zj': fmdetail.odds[140].Selections['10006'].golds&&fmdetail.odds[140].Selections['10006'].prize_state==='1'&&fmdetail.odds[140].Selections['10006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10006'}">{{ fmdetail.odds[140].Selections[10006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10006'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20006','item-zj': fmdetail.odds[140].Selections['20006'].golds&&fmdetail.odds[140].Selections['20006'].prize_state==='1'&&fmdetail.odds[140].Selections['20006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20006'}">{{ fmdetail.odds[140].Selections[20006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20006'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['30005'].golds &&
                                                     !fmdetail.odds[140].Selections['40005'].golds &&
                                                     !fmdetail.odds[140].Selections['10006'].golds &&
                                                     !fmdetail.odds[140].Selections['20006'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30005'].golds&&fmdetail.odds[140].Selections['30005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30005'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30005'].golds&&fmdetail.odds[140].Selections['30005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30005'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40005'].golds&&fmdetail.odds[140].Selections['40005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40005'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40005'].golds&&fmdetail.odds[140].Selections['40005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40005'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10006'].golds&&fmdetail.odds[140].Selections['10006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10006'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10006'].golds&&fmdetail.odds[140].Selections['10006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10006'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10006'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20006'].golds&&fmdetail.odds[140].Selections['20006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20006'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20006'].golds&&fmdetail.odds[140].Selections['20006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20006'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20006'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30006','item-zj': fmdetail.odds[140].Selections['30006'].golds&&fmdetail.odds[140].Selections['30006'].prize_state==='1'&&fmdetail.odds[140].Selections['30006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30006'}">{{ fmdetail.odds[140].Selections[30006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30006'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40006','item-zj': fmdetail.odds[140].Selections['40006'].golds&&fmdetail.odds[140].Selections['40006'].prize_state==='1'&&fmdetail.odds[140].Selections['40006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40006'}">{{ fmdetail.odds[140].Selections[40006].BackOdds}}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40006'].support}}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40006'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50006','item-zj': fmdetail.odds[140].Selections['50006'].golds&&fmdetail.odds[140].Selections['50006'].prize_state==='1'&&fmdetail.odds[140].Selections['50006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50006'}">{{ fmdetail.odds[140].Selections[50006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50006'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10007','item-zj': fmdetail.odds[140].Selections['10007'].golds&&fmdetail.odds[140].Selections['10007'].prize_state==='1'&&fmdetail.odds[140].Selections['10007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10007'}">{{ fmdetail.odds[140].Selections[10007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10007'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['30006'].golds &&
                                                     !fmdetail.odds[140].Selections['40006'].golds &&
                                                     !fmdetail.odds[140].Selections['50006'].golds &&
                                                     !fmdetail.odds[140].Selections['10007'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30006'].golds&&fmdetail.odds[140].Selections['30006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30006'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30006'].golds&&fmdetail.odds[140].Selections['30006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30006'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30006'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40006'].golds&&fmdetail.odds[140].Selections['40006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40006'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40006'].golds&&fmdetail.odds[140].Selections['40006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40006'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40006'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50006'].golds&&fmdetail.odds[140].Selections['50006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50006'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50006'].golds&&fmdetail.odds[140].Selections['50006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50006'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50006'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10007'].golds&&fmdetail.odds[140].Selections['10007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10007'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10007'].golds&&fmdetail.odds[140].Selections['10007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10007'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10007'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20007','item-zj': fmdetail.odds[140].Selections['20007'].golds&&fmdetail.odds[140].Selections['20007'].prize_state==='1'&&fmdetail.odds[140].Selections['20007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20007'}">{{ fmdetail.odds[140].Selections[20007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20007'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30007','item-zj': fmdetail.odds[140].Selections['40006'].golds&&fmdetail.odds[140].Selections['30007'].prize_state==='1'&&fmdetail.odds[140].Selections['30007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30007'}">{{ fmdetail.odds[140].Selections[30007].BackOdds}}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30007'].support}}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30007'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40007','item-zj': fmdetail.odds[140].Selections['40007'].golds&&fmdetail.odds[140].Selections['40007'].prize_state==='1'&&fmdetail.odds[140].Selections['40007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40007'}">{{ fmdetail.odds[140].Selections[40007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40007'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50007','item-zj': fmdetail.odds[140].Selections['50007'].golds&&fmdetail.odds[140].Selections['50007'].prize_state==='1'&&fmdetail.odds[140].Selections['50007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50007'}">{{ fmdetail.odds[140].Selections[50007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50007'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['20007'].golds &&
                                                     !fmdetail.odds[140].Selections['30007'].golds &&
                                                     !fmdetail.odds[140].Selections['40007'].golds &&
                                                     !fmdetail.odds[140].Selections['50007'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20007'].golds&&fmdetail.odds[140].Selections['20007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20007'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20007'].golds&&fmdetail.odds[140].Selections['20007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20007'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20007'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30007'].golds&&fmdetail.odds[140].Selections['30007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30007'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30007'].golds&&fmdetail.odds[140].Selections['30007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30007'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30007'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40007'].golds&&fmdetail.odds[140].Selections['40007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40007'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40007'].golds&&fmdetail.odds[140].Selections['40007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40007'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40007'].bonus | format}}</p>
                                                </template>
                                            </div>


                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50007'].golds&&fmdetail.odds[140].Selections['50007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50007'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50007'].golds&&fmdetail.odds[140].Selections['50007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50007'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50007'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60007','item-zj': fmdetail.odds[140].Selections['60007'].golds&&fmdetail.odds[140].Selections['60007'].prize_state==='1'&&fmdetail.odds[140].Selections['60007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60007'}">{{ fmdetail.odds[140].Selections[60007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60007'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['2'].State==='0', 'slt':current===fmdetail.odds[140].Selections['2'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='2','item-zj': fmdetail.odds[140].Selections['2'].golds&&fmdetail.odds[140].Selections['2'].prize_state==='1'&&fmdetail.odds[140].Selections['2'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['2'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">胜其它</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['1402'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='2'}">{{ fmdetail.odds[140].Selections[2].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['2'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['2'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['60007'].golds &&
                                                     !fmdetail.odds[140].Selections['2'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60007'].golds&&fmdetail.odds[140].Selections['60007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60007'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60007'].golds&&fmdetail.odds[140].Selections['60007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60007'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60007'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['2'].golds&&fmdetail.odds[140].Selections['2'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['2'].golds |
                                                    format}}</em>
                                                    <p>可中{{fmdetail.odds[140].Selections['2'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['2'].golds&&fmdetail.odds[140].Selections['2'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['2'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['2'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['2'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <!-- 平局 -->
                                <div class="boxWrap" v-if="gussTab_draw">
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10001','item-zj': fmdetail.odds[140].Selections['10001'].golds&&fmdetail.odds[140].Selections['10001'].prize_state==='1'&&fmdetail.odds[140].Selections['10001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10001'}">{{ fmdetail.odds[140].Selections[10001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10001'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20002','item-zj': fmdetail.odds[140].Selections['20002'].golds&&fmdetail.odds[140].Selections['20002'].prize_state==='1'&&fmdetail.odds[140].Selections['20002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20002'}">{{ fmdetail.odds[140].Selections[20002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20002'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30003','item-zj': fmdetail.odds[140].Selections['30003'].golds&&fmdetail.odds[140].Selections['30003'].prize_state==='1'&&fmdetail.odds[140].Selections['30003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30003'}">{{ fmdetail.odds[140].Selections[30003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30003'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40004','item-zj': fmdetail.odds[140].Selections['40004'].golds&&fmdetail.odds[140].Selections['40004'].prize_state==='1'&&fmdetail.odds[140].Selections['40004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40004'}">{{ fmdetail.odds[140].Selections[40004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40004'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['10001'].golds &&
                                                     !fmdetail.odds[140].Selections['20002'].golds &&
                                                     !fmdetail.odds[140].Selections['30003'].golds &&
                                                     !fmdetail.odds[140].Selections['40004'].golds
                                            }"
                                        >

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10001'].golds&&fmdetail.odds[140].Selections['10001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10001'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10001'].golds&&fmdetail.odds[140].Selections['10001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10001'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10001'].bonus | format}}</p>
                                                </template>

                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20002'].golds&&fmdetail.odds[140].Selections['20002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20002'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20002'].golds&&fmdetail.odds[140].Selections['20002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20002'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20002'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30003'].golds&&fmdetail.odds[140].Selections['30003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30003'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30003'].golds&&fmdetail.odds[140].Selections['30003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30003'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30003'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40004'].golds&&fmdetail.odds[140].Selections['40004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40004'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40004'].golds&&fmdetail.odds[140].Selections['40004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40004'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40004'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50005','item-zj': fmdetail.odds[140].Selections['50005'].golds&&fmdetail.odds[140].Selections['50005'].prize_state==='1'&&fmdetail.odds[140].Selections['50005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50005'}">{{ fmdetail.odds[140].Selections[50005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50005'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60006','item-zj': fmdetail.odds[140].Selections['60006'].golds&&fmdetail.odds[140].Selections['60006'].prize_state==='1'&&fmdetail.odds[140].Selections['60006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60006'}">{{ fmdetail.odds[140].Selections[60006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60006'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70007','item-zj': fmdetail.odds[140].Selections['70007'].golds&&fmdetail.odds[140].Selections['70007'].prize_state==='1'&&fmdetail.odds[140].Selections['70007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70007'}">{{ fmdetail.odds[140].Selections[70007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70007'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['3'].State==='0', 'slt':current===fmdetail.odds[140].Selections['3'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='3','item-zj': fmdetail.odds[140].Selections['3'].golds&&fmdetail.odds[140].Selections['3'].prize_state==='1'&&fmdetail.odds[140].Selections['3'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['3'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">平其他</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['1403'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='3'}">{{ fmdetail.odds[140].Selections[3].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['3'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['3'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['50005'].golds &&
                                                     !fmdetail.odds[140].Selections['60006'].golds &&
                                                     !fmdetail.odds[140].Selections['70007'].golds &&
                                                     !fmdetail.odds[140].Selections['3'].golds
                                            }"
                                        >

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50005'].golds&&fmdetail.odds[140].Selections['50005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50005'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50005'].golds&&fmdetail.odds[140].Selections['50005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50005'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50005'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60006'].golds&&fmdetail.odds[140].Selections['60006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60006'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60006'].golds&&fmdetail.odds[140].Selections['60006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60006'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60006'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70007'].golds&&fmdetail.odds[140].Selections['70007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70007'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70007'].golds&&fmdetail.odds[140].Selections['70007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70007'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70007'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['3'].golds&&fmdetail.odds[140].Selections['3'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['3'].golds |
                                                format}}</em>
                                                    <p>可中{{fmdetail.odds[140].Selections['3'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['3'].golds&&fmdetail.odds[140].Selections['3'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['3'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['3'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['3'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 客胜 -->
                                <div class="boxWrap" v-if="gussTab_away">
                                    <div class="boxInner">
                                        <div class="bet">

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20001','item-zj': fmdetail.odds[140].Selections['20001'].golds&&fmdetail.odds[140].Selections['20001'].prize_state==='1'&&fmdetail.odds[140].Selections['20001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20001'}">{{ fmdetail.odds[140].Selections[20001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20001'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30001','item-zj': fmdetail.odds[140].Selections['30001'].golds&&fmdetail.odds[140].Selections['30001'].prize_state==='1'&&fmdetail.odds[140].Selections['30001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30001'}">{{ fmdetail.odds[140].Selections[30001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30001'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30002','item-zj': fmdetail.odds[140].Selections['30002'].golds&&fmdetail.odds[140].Selections['30002'].prize_state==='1'&&fmdetail.odds[140].Selections['30002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30002'}">{{ fmdetail.odds[140].Selections[30002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30002'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40001','item-zj': fmdetail.odds[140].Selections['40001'].golds&&fmdetail.odds[140].Selections['40001'].prize_state==='1'&&fmdetail.odds[140].Selections['40001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40001'}">{{ fmdetail.odds[140].Selections[40001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40001'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['20001'].golds &&
                                                     !fmdetail.odds[140].Selections['30001'].golds &&
                                                     !fmdetail.odds[140].Selections['30002'].golds &&
                                                     !fmdetail.odds[140].Selections['40001'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20001'].golds&&fmdetail.odds[140].Selections['20001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20001'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20001'].golds&&fmdetail.odds[140].Selections['20001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20001'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20001'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30001'].golds&&fmdetail.odds[140].Selections['30001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30001'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30001'].golds&&fmdetail.odds[140].Selections['30001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30001'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30001'].bonus | format}}</p>
                                                </template>

                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30002'].golds&&fmdetail.odds[140].Selections['30002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30002'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30002'].golds&&fmdetail.odds[140].Selections['30002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30002'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30002'].bonus | format}}</p>
                                                </template>

                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40001'].golds&&fmdetail.odds[140].Selections['40001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40001'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40001'].golds&&fmdetail.odds[140].Selections['40001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40001'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40001'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40002','item-zj': fmdetail.odds[140].Selections['40002'].golds&&fmdetail.odds[140].Selections['40002'].prize_state==='1'&&fmdetail.odds[140].Selections['40002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40002'}">{{ fmdetail.odds[140].Selections[40002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40002'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40003','item-zj': fmdetail.odds[140].Selections['40003'].golds&&fmdetail.odds[140].Selections['40003'].prize_state==='1'&&fmdetail.odds[140].Selections['40003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40003'}">{{ fmdetail.odds[140].Selections[40003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40003'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50001','item-zj': fmdetail.odds[140].Selections['50001'].golds&&fmdetail.odds[140].Selections['50001'].prize_state==='1'&&fmdetail.odds[140].Selections['50001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50001'}">{{ fmdetail.odds[140].Selections[50001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50001'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50002','item-zj': fmdetail.odds[140].Selections['50002'].golds&&fmdetail.odds[140].Selections['50002'].prize_state==='1'&&fmdetail.odds[140].Selections['50002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50002'}">{{ fmdetail.odds[140].Selections[50002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50002'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['40002'].golds &&
                                                     !fmdetail.odds[140].Selections['40003'].golds &&
                                                     !fmdetail.odds[140].Selections['50001'].golds &&
                                                     !fmdetail.odds[140].Selections['50002'].golds
                                            }"
                                        >

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40002'].golds&&fmdetail.odds[140].Selections['40002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40002'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40002'].golds&&fmdetail.odds[140].Selections['40002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40002'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40002'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40003'].golds&&fmdetail.odds[140].Selections['40003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40003'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40003'].golds&&fmdetail.odds[140].Selections['40003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40003'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40003'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50001'].golds&&fmdetail.odds[140].Selections['50001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50001'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50001'].golds&&fmdetail.odds[140].Selections['50001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50001'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50001'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50002'].golds&&fmdetail.odds[140].Selections['50002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50002'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50002'].golds&&fmdetail.odds[140].Selections['50002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50002'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50002'].bonus | format}}</p>
                                                </template>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50003','item-zj': fmdetail.odds[140].Selections['50003'].golds&&fmdetail.odds[140].Selections['50003'].prize_state==='1'&&fmdetail.odds[140].Selections['50003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50003'}">{{ fmdetail.odds[140].Selections[50003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50003'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50004','item-zj': fmdetail.odds[140].Selections['50004'].golds&&fmdetail.odds[140].Selections['50004'].prize_state==='1'&&fmdetail.odds[140].Selections['50004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50004'}">{{ fmdetail.odds[140].Selections[50004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50004'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60001','item-zj': fmdetail.odds[140].Selections['60001'].golds&&fmdetail.odds[140].Selections['60001'].prize_state==='1'&&fmdetail.odds[140].Selections['60001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60001'}">{{ fmdetail.odds[140].Selections[60001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60001'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60002','item-zj': fmdetail.odds[140].Selections['60002'].golds&&fmdetail.odds[140].Selections['60002'].prize_state==='1'&&fmdetail.odds[140].Selections['60002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60002'}">{{ fmdetail.odds[140].Selections[60002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60002'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['50003'].golds &&
                                                     !fmdetail.odds[140].Selections['50004'].golds &&
                                                     !fmdetail.odds[140].Selections['60001'].golds &&
                                                     !fmdetail.odds[140].Selections['60002'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50003'].golds&&fmdetail.odds[140].Selections['50003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50003'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50003'].golds&&fmdetail.odds[140].Selections['50003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50003'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50003'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50004'].golds&&fmdetail.odds[140].Selections['50004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50004'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50004'].golds&&fmdetail.odds[140].Selections['50004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50004'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50004'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60001'].golds&&fmdetail.odds[140].Selections['60001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60001'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60001'].golds&&fmdetail.odds[140].Selections['60001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60001'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60001'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60002'].golds&&fmdetail.odds[140].Selections['60002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60002'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60002'].golds&&fmdetail.odds[140].Selections['60002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60002'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60002'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60003','item-zj': fmdetail.odds[140].Selections['60003'].golds&&fmdetail.odds[140].Selections['60003'].prize_state==='1'&&fmdetail.odds[140].Selections['60003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60003'}">{{ fmdetail.odds[140].Selections[60003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60003'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60004','item-zj': fmdetail.odds[140].Selections['60004'].golds&&fmdetail.odds[140].Selections['60004'].prize_state==='1'&&fmdetail.odds[140].Selections['60004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60004'}">{{ fmdetail.odds[140].Selections[60004].BackOdds}}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60004'].support}}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60004'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60005','item-zj': fmdetail.odds[140].Selections['60005'].golds&&fmdetail.odds[140].Selections['60005'].prize_state==='1'&&fmdetail.odds[140].Selections['60005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60005'}">{{ fmdetail.odds[140].Selections[60005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60005'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70001','item-zj': fmdetail.odds[140].Selections['70001'].golds&&fmdetail.odds[140].Selections['70001'].prize_state==='1'&&fmdetail.odds[140].Selections['70001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70001'}">{{ fmdetail.odds[140].Selections[70001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70001'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['60003'].golds &&
                                                     !fmdetail.odds[140].Selections['60004'].golds &&
                                                     !fmdetail.odds[140].Selections['60005'].golds &&
                                                     !fmdetail.odds[140].Selections['70001'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60003'].golds&&fmdetail.odds[140].Selections['60003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60003'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60003'].golds&&fmdetail.odds[140].Selections['60003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60003'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60003'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60004'].golds&&fmdetail.odds[140].Selections['60004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60004'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60004'].golds&&fmdetail.odds[140].Selections['60004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60004'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60004'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60005'].golds&&fmdetail.odds[140].Selections['60005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60005'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60005'].golds&&fmdetail.odds[140].Selections['60005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60005'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70001'].golds&&fmdetail.odds[140].Selections['70001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70001'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70001'].golds&&fmdetail.odds[140].Selections['70001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70001'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70001'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70002','item-zj': fmdetail.odds[140].Selections['70002'].golds&&fmdetail.odds[140].Selections['70002'].prize_state==='1'&&fmdetail.odds[140].Selections['70002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70002'}">{{ fmdetail.odds[140].Selections[70002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70002'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70003','item-zj': fmdetail.odds[140].Selections['70003'].golds&&fmdetail.odds[140].Selections['70003'].prize_state==='1'&&fmdetail.odds[140].Selections['70003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70003'}">{{ fmdetail.odds[140].Selections[70003].BackOdds}}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70003'].support}}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70003'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70004','item-zj': fmdetail.odds[140].Selections['70004'].golds&&fmdetail.odds[140].Selections['70004'].prize_state==='1'&&fmdetail.odds[140].Selections['70004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70004'}">{{ fmdetail.odds[140].Selections[70004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70004'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70005','item-zj': fmdetail.odds[140].Selections['70005'].golds&&fmdetail.odds[140].Selections['70005'].prize_state==='1'&&fmdetail.odds[140].Selections['70005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70005'}">{{ fmdetail.odds[140].Selections[70005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70005'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['70002'].golds &&
                                                     !fmdetail.odds[140].Selections['70003'].golds &&
                                                     !fmdetail.odds[140].Selections['70004'].golds &&
                                                     !fmdetail.odds[140].Selections['70005'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70002'].golds&&fmdetail.odds[140].Selections['70002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70002'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70002'].golds&&fmdetail.odds[140].Selections['70002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70002'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70002'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70003'].golds&&fmdetail.odds[140].Selections['70003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70003'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70003'].golds&&fmdetail.odds[140].Selections['70003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70003'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70003'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70004'].golds&&fmdetail.odds[140].Selections['70004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70004'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70004'].golds&&fmdetail.odds[140].Selections['70004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70004'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70004'].bonus | format}}</p>
                                                </template>
                                            </div>


                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70005'].golds&&fmdetail.odds[140].Selections['70005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70005'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70005'].golds&&fmdetail.odds[140].Selections['70005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70005'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70006','item-zj': fmdetail.odds[140].Selections['70006'].golds&&fmdetail.odds[140].Selections['70006'].prize_state==='1'&&fmdetail.odds[140].Selections['70006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70006'}">{{ fmdetail.odds[140].Selections[70006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70006'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['4'].State==='0', 'slt':current===fmdetail.odds[140].Selections['4'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='4','item-zj': fmdetail.odds[140].Selections['4'].golds&&fmdetail.odds[140].Selections['4'].prize_state==='1'&&fmdetail.odds[140].Selections['4'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['4'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">负其它</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['1404'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='4'}">{{ fmdetail.odds[140].Selections[4].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['4'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['4'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['70006'].golds &&
                                                     !fmdetail.odds[140].Selections['4'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70006'].golds&&fmdetail.odds[140].Selections['70006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70006'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70006'].golds&&fmdetail.odds[140].Selections['70006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70006'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70006'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['4'].golds&&fmdetail.odds[140].Selections['4'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['4'].golds |
                                                    format}}</em>
                                                    <p>可中{{fmdetail.odds[140].Selections['4'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['4'].golds&&fmdetail.odds[140].Selections['4'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['4'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['4'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['4'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="endTips hide">封盘中...</div>
                            </div>
                            <span class="icon icon_jiajiang" v-if="fmdetail.isAwards==='1'"  v-tap="{ methods:showAwardBoxFn}"
                            ></span>
                        </div>
                        <div v-if="currTab==='sg'" class="betEara">
                            <!--猜赛果-->
                            <div class="betBox" v-tap="{methods:clickPanel}" v-if="fmdetail.odds[100]!==undefined"
                                 :class="{ 'betBox-end': fmdetail.odds[100].State!=='1'&&fmdetail.odds[100].State!=='3'}">
                                <div class="boxTit boxTit-saig clear">
                                    <h3>猜赛果</h3>
                                    <span>90分钟内哪个队伍获胜？</span>
                                </div>
                                <div class="boxInner">
                                    <div class="bet">
                                        <!--item-end  slt 选中  item-zj win  changeColor 闪烁stat  -->
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['1'].State==='0', 'slt':current===fmdetail.odds[100].Selections[1],'item-end':fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result!=='1','item-zj': fmdetail.odds[100].Selections['1'].golds&&fmdetail.odds[100].Selections['1'].prize_state==='1'&&fmdetail.odds[100].Selections['1'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[100].Selections['1'], ruleType: '100', rule: fmdetail.odds[100]}}"
                                        >
                                            <!--<span class="item-xx">{{fmdetail.HomeTeamName}}</span>-->
                                            <span class="item-xx">主胜</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['1001'],'item-gray':fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result==='1'}">{{ fmdetail.odds[100].Selections[1].BackOdds}}</span>
                                            <span class="item-zc">{{ fmdetail.odds[100].Selections[1].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['0'].State==='0','slt':current===fmdetail.odds[100].Selections[0],'item-end':fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result!=='0','item-zj': fmdetail.odds[100].Selections['0'].golds&&fmdetail.odds[100].Selections['0'].prize_state==='1'&&fmdetail.odds[100].Selections['0'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[100].Selections['0'], ruleType: '100', rule: fmdetail.odds[100]}}"
                                        >
                                            <span class="item-xx">平</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['1000'],'item-gray': fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result==='0'}">{{ fmdetail.odds[100].Selections[0].BackOdds}}</span>
                                            <span class="item-zc">{{ fmdetail.odds[100].Selections[0].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['0'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['-1'].State==='0','slt':current===fmdetail.odds[100].Selections[-1],'item-end':fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result!=='-1','item-zj':fmdetail.odds[100].Selections['-1'].golds&&fmdetail.odds[100].Selections['-1'].prize_state==='1'&&fmdetail.odds[100].Selections['-1'].bonus!=='0'}"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[100].Selections['-1'], ruleType: '100', rule: fmdetail.odds[100]}}"
                                        >
                                            <span class="item-xx">客胜</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['100-1'],'item-gray': fmdetail.odds[100].State==='3'&&fmdetail.odds[100].result==='-1'}">{{ fmdetail.odds[100].Selections[-1].BackOdds}}</span>
                                            <span class="item-zc">{{ fmdetail.odds[100].Selections[-1].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[100].State=='1'&&fmdetail.odds[100].Selections['-1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="endTips"
                                             v-if="fmdetail.odds[100].State!=='1'&&fmdetail.odds[100].State!=='3'">
                                            封盘中...



                                        </div>
                                    </div>
                                    <div class="betShow"
                                         :class="{'hide':!fmdetail.odds[100].Selections['1'].golds &&
                                                 !fmdetail.odds[100].Selections['0'].golds &&
                                                 !fmdetail.odds[100].Selections['-1'].golds
                                        }"
                                    >
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[100].Selections['1'].golds&&fmdetail.odds[100].Selections['1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[100].Selections['1'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[100].Selections['1'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[100].Selections['1'].golds&&fmdetail.odds[100].Selections['1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[100].Selections['1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[100].Selections['1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[100].Selections['1'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[100].Selections['0'].golds&&fmdetail.odds[100].Selections['0'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[100].Selections['0'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[100].Selections['0'].bonus | format}}</p>
                                            </template>

                                            <template
                                                    v-if="fmdetail.odds[100].Selections['0'].golds&&fmdetail.odds[100].Selections['0'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[100].Selections['0'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[100].Selections['0'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[100].Selections['0'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[100].Selections['-1'].golds&&fmdetail.odds[100].Selections['-1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[100].Selections['-1'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[100].Selections['-1'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[100].Selections['-1'].golds&&fmdetail.odds[100].Selections['-1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[100].Selections['-1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[100].Selections['-1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[100].Selections['-1'].bonus | format}}</p>
                                            </template>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="currTab==='ds'" class="betEara">
                            <div class="betBox" v-tap="{methods:clickPanel}" v-if="fmdetail.odds[130]!==undefined"
                                 :class="{'betBox-end':fmdetail.odds[130].State!=='1'&&fmdetail.odds[130].State!=='3'}">
                                <div class="boxTit boxTit-dans clear">
                                    <h3>猜单双</h3>
                                    <span>90分钟内比赛总进球数单双？</span>
                                </div>
                                <div class="boxInner">
                                    <div class="bet">
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[130].State=='1'&&fmdetail.odds[130].Selections['1'].State==='0', 'slt': current===fmdetail.odds[130].Selections['1'], 'item-end': fmdetail.odds[130].State==='3'&&fmdetail.odds[130].result!=='1','item-zj': fmdetail.odds[130].Selections['1'].golds&&fmdetail.odds[130].Selections['1'].prize_state==='1'&&fmdetail.odds[130].Selections['1'].bonus!=='0'}"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[130].Selections['1'], ruleType: '130', rule: fmdetail.odds[130]}}"
                                        >
                                            <span class="item-xx">单</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['1301'],'item-gray': fmdetail.odds[130].State==='3'&&fmdetail.odds[130].result==='1'}">{{ fmdetail.odds[130].Selections[1].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[130].Selections[1].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[130].State=='1'&&fmdetail.odds[130].Selections['1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{'endItem':fmdetail.odds[130].State=='1'&&fmdetail.odds[130].Selections['-1'].State==='0','slt': current===fmdetail.odds[130].Selections['-1'], 'item-end': fmdetail.odds[130].State==='3'&&fmdetail.odds[130].result!=='-1','item-zj': fmdetail.odds[130].Selections['-1'].golds&&fmdetail.odds[130].Selections['-1'].prize_state==='1'&&fmdetail.odds[130].Selections['-1'].bonus!=='0'}"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[130].Selections['-1'], ruleType: '130', rule: fmdetail.odds[130]}}"
                                        >
                                            <span class="item-xx">双</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['130-1'],'item-gray': fmdetail.odds[130].State==='3'&&fmdetail.odds[130].result==='-1'}">{{ fmdetail.odds[130].Selections[-1].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[130].Selections[-1].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[130].State=='1'&&fmdetail.odds[130].Selections['-1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="endTips"
                                             v-if="fmdetail.odds[130].State!=='1'&&fmdetail.odds[130].State!=='3'">
                                            封盘中...



                                        </div>
                                    </div>
                                    <div class="betShow"
                                         :class="{'hide':!fmdetail.odds[130].Selections['1'].golds &&
                                                 !fmdetail.odds[130].Selections['-1'].golds
                                        }"
                                    >
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[130].Selections['1'].golds&&fmdetail.odds[130].Selections['1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[130].Selections['1'].golds}}</em>
                                                <p>
                                                    可中{{fmdetail.odds[130].Selections['1'].bonus}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[130].Selections['1'].golds&&fmdetail.odds[130].Selections['1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[130].Selections['1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[130].Selections['1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[130].Selections['1'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[130].Selections['-1'].golds&&fmdetail.odds[130].Selections['-1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[130].Selections['-1'].golds |
                                            format}}</em>
                                                <p>
                                                    可中{{fmdetail.odds[130].Selections['-1'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[130].Selections['-1'].golds&&fmdetail.odds[130].Selections['-1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[130].Selections['-1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[130].Selections['-1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[130].Selections['-1'].bonus | format}}</p>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="currTab==='jq'" class="betEara">
                            <div class="betBox" id="box-scroll" v-tap="{methods:clickPanel}"
                                 v-if="fmdetail.odds[350]!==undefined"
                            >
                                <div class="boxTit boxTit-jinq clear">
                                    <h3>猜第<label id="nextScore"></label>个进球</h3>
                                </div>
                                <ul class="boxTab" v-if="this.showUINextBtn" style="z-index: 100">
                                    <li class="prev" :class="{ 'on':prevStyle}" v-tap="{methods:slidePre}"></li>
                                    <li class="next" :class="{ 'on':nextStyle}" v-tap="{methods:slideNext}"></li>
                                </ul>
                                <slider :pages="someList" :sliderinit="sliderinit" @slide='slide'>
                                    <template v-if="someList.length" v-tap="{methods:clickPanel}"
                                              v-for="item in someList">
                                        <div class="slider-item boxInner"
                                             :class="{'betBox-end':item.State!=='1'&&item.State!=='3'}">
                                            <div class="bet">
                                                <div class="item"
                                                     :class="{'endItem':item.State=='1'&&item.Selections['1'].State==='0','slt': current===item.Selections['1'], 'item-end': item.State==='3'&&item.result!=='1','item-zj': item.Selections['1'].golds&&item.Selections['1'].prize_state==='1'&&item.Selections['1'].bonus!=='0'}"
                                                     v-tap="{methods: selectItem, params: {item: item.Selections['1'], ruleType: '350', rule: item}}">
                                                    <!--<span class="item-xx" >{{ sliderinit.HomeTeamName}}</span>-->
                                                    <span class="item-xx">主队</span>
                                                    <span class="item-pl"
                                                          :class="{'changeColor':stat['3501-'+item.nextscore],'item-gray': item.State==='3'&&item.result==='1'}">{{item.Selections[1].BackOdds}}</span>
                                                    <span class="item-zc">{{item.Selections[1].support}}支持</span>
                                                    <div class="endTips"
                                                         v-if="item.State=='1'&&item.Selections['1'].State==='0'">
                                                        封盘中...



                                                    </div>
                                                </div>
                                                <div class="item"
                                                     :class="{'endItem':item.State=='1'&&item.Selections['0'].State==='0','slt': current===item.Selections['0'], 'item-end': item.State==='3'&&item.result!=='0','item-zj': item.Selections['0'].golds&&item.Selections['0'].prize_state==='1'&&item.Selections['0'].bonus!=='0'}"
                                                     v-tap="{methods: selectItem, params: {item: item.Selections['0'], ruleType: '350', rule: item}}"
                                                >
                                                    <span class="item-xx">无</span>
                                                    <span class="item-pl"
                                                          :class="{'changeColor':stat['3500-'+item.nextscore],'item-gray': item.State==='3'&&item.result==='0'}">{{item.Selections[0].BackOdds}}</span>
                                                    <span class="item-zc">{{item.Selections[0].support}}支持</span>
                                                    <div class="endTips"
                                                         v-if="item.State=='1'&&item.Selections['0'].State==='0'">
                                                        封盘中...



                                                    </div>
                                                </div>
                                                <div class="item"
                                                     :class="{'endItem':item.State=='1'&&item.Selections['-1'].State==='0','slt': current===item.Selections['-1'], 'item-end': item.State==='3'&&item.result!=='-1','item-zj': item.Selections['-1'].golds&&item.Selections['-1'].prize_state==='1'&&item.Selections['-1'].bonus!=='0'}"
                                                     v-tap="{methods: selectItem, params: {item: item.Selections['-1'], ruleType: '350', rule: item}}"
                                                >
                                                    <span class="item-xx">客队</span>
                                                    <span class="item-pl"
                                                          :class="{'changeColor':stat['350-1-'+item.nextscore],'item-gray': item.State==='3'&&item.result==='-1'}">{{item.Selections[-1].BackOdds}}</span>
                                                    <span class="item-zc">{{item.Selections[-1].support}}支持</span>
                                                    <div class="endTips"
                                                         v-if="item.State=='1'&&item.Selections['-1'].State==='0'">
                                                        封盘中...



                                                    </div>
                                                </div>
                                                <div class="endTips" v-if="item.State!=='1'&&item.State!=='3'">
                                                    封盘中...


                                                </div>
                                            </div>
                                            <div class="betShow">
                                                <!--  :class="{'hide':!item.Selections['1'].golds &&-->
                                                <!--!item.Selections['0'].golds &&-->
                                                <!--!item.Selections['-1'].golds-->
                                                <!--}"  -->
                                                <div class="item">
                                                    <template
                                                            v-if="item.Selections['1'].golds&&item.Selections['1'].prize_state==='-1'">
                                                        <i class="icon-jinbi"></i>
                                                        <em class="emColor">{{ item.Selections['1'].golds | format
                                                            }}</em>
                                                        <p>可中{{item.Selections['1'].bonus | format}}</p>
                                                    </template>
                                                    <template
                                                            v-if="item.Selections['1'].golds&&item.Selections['1'].prize_state==='1'">
                                                        <i class="icon-jinbi"></i><em
                                                            class="gray">{{item.Selections['1'].golds | format}}</em>
                                                        <p v-if="item.Selections['1'].bonus!=='0'" class="red">
                                                            中{{item.Selections['1'].bonus | format}}</p>
                                                    </template>
                                                </div>
                                                <div class="item">
                                                    <template
                                                            v-if="item.Selections['0'].golds&&item.Selections['0'].prize_state==='-1'">
                                                        <i class="icon-jinbi"></i>
                                                        <em class="emColor">{{ item.Selections['0'].golds | format
                                                            }}</em>
                                                        <p>可中{{item.Selections['0'].bonus | format}}</p>
                                                    </template>

                                                    <template
                                                            v-if="item.Selections['0'].golds&&item.Selections['0'].prize_state==='1'">
                                                        <i class="icon-jinbi"></i><em
                                                            class="gray">{{item.Selections['0'].golds | format}}</em>
                                                        <p v-if="item.Selections['0'].bonus!=='0'" class="red">
                                                            中{{item.Selections['0'].bonus | format}}</p>
                                                    </template>
                                                </div>
                                                <div class="item">
                                                    <template
                                                            v-if="item.Selections['-1'].golds&&item.Selections['-1'].prize_state==='-1'">
                                                        <i class="icon-jinbi"></i>
                                                        <em class="emColor">{{ item.Selections['-1'].golds | format
                                                            }}</em>
                                                        <p>可中{{item.Selections['-1'].bonus | format}}</p>
                                                    </template>
                                                    <template
                                                            v-if="item.Selections['-1'].golds&&item.Selections['-1'].prize_state==='1'">
                                                        <i class="icon-jinbi"></i><em
                                                            class="gray">{{item.Selections['-1'].golds | format}}</em>
                                                        <p v-if="item.Selections['-1'].bonus!=='0'" class="red">
                                                            中{{item.Selections['-1'].bonus | format}}</p>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </slider>
                            </div>
                            <div class="betBox" v-tap="{methods:clickPanel}" v-if="fmdetail.odds[410]!==undefined"
                                 :class="{ 'betBox-end': fmdetail.odds[410].State!=='1'&&fmdetail.odds[410].State!=='3'}"
                            >
                                <div class="boxTit boxTit-zongj clear">
                                    <h3>总进球数</h3>
                                    <span>90分钟内总进球数</span>
                                </div>
                                <div class="boxInner">
                                    <div class="bet">
                                        <div class="item"
                                             :class="{'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['1'].State==='0', 'slt':current===fmdetail.odds[410].Selections['1'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='1','item-zj': fmdetail.odds[410].Selections['1'].golds&&fmdetail.odds[410].Selections['1'].prize_state==='1'&&fmdetail.odds[410].Selections['1'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['1'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">0</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4101'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='1'}">{{ fmdetail.odds[410].Selections[1].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['1'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['2'].State==='0', 'slt':current===fmdetail.odds[410].Selections['2'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='2','item-zj': fmdetail.odds[410].Selections['2'].golds&&fmdetail.odds[410].Selections['2'].prize_state==='1'&&fmdetail.odds[410].Selections['2'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['2'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">1</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4102'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='2'}">{{ fmdetail.odds[410].Selections[2].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['2'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['2'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['3'].State==='0', 'slt':current===fmdetail.odds[410].Selections['3'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='3','item-zj': fmdetail.odds[410].Selections['3'].golds&&fmdetail.odds[410].Selections['3'].prize_state==='1'&&fmdetail.odds[410].Selections['3'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['3'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">2</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4103'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='3'}">{{ fmdetail.odds[410].Selections[3].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['3'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['3'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['4'].State==='0', 'slt':current===fmdetail.odds[410].Selections['4'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='4','item-zj': fmdetail.odds[410].Selections['4'].golds&&fmdetail.odds[410].Selections['4'].prize_state==='1'&&fmdetail.odds[410].Selections['4'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['4'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">3</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4104'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='4'}">{{ fmdetail.odds[410].Selections[4].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['4'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['4'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="endTips"
                                             v-if="fmdetail.odds[410].State!=='1'&&fmdetail.odds[410].State!=='3'">
                                            封盘中...



                                        </div>
                                    </div>
                                    <div class="betShow"
                                         :class="{'hide':!fmdetail.odds[410].Selections['1'].golds &&
                                                 !fmdetail.odds[410].Selections['2'].golds &&
                                                 !fmdetail.odds[410].Selections['3'].golds &&
                                                 !fmdetail.odds[410].Selections['4'].golds
                                        }"
                                    >
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['1'].golds&&fmdetail.odds[410].Selections['1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['1'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['1'].bonus | format}}</p>
                                            </template>

                                            <template
                                                    v-if="fmdetail.odds[410].Selections['1'].golds&&fmdetail.odds[410].Selections['1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['1'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['2'].golds&&fmdetail.odds[410].Selections['2'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['2'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['2'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['2'].golds&&fmdetail.odds[410].Selections['2'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['2'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['2'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['2'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['3'].golds&&fmdetail.odds[410].Selections['3'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['3'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['3'].bonus | format}}</p>
                                            </template>

                                            <template
                                                    v-if="fmdetail.odds[410].Selections['3'].golds&&fmdetail.odds[410].Selections['3'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['3'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['3'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['3'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['4'].golds&&fmdetail.odds[410].Selections['4'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['4'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['4'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['4'].golds&&fmdetail.odds[410].Selections['4'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['4'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['4'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['4'].bonus | format}}</p>
                                            </template>
                                        </div>
                                    </div>
                                    <!--<div class="endTips hide">封盘中...</div>-->
                                </div>
                                <div class="boxInner">
                                    <div class="bet">
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['5'].State==='0', 'slt':current===fmdetail.odds[410].Selections['5'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='5','item-zj': fmdetail.odds[410].Selections['5'].golds&&fmdetail.odds[410].Selections['5'].prize_state==='1'&&fmdetail.odds[410].Selections['5'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['5'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">4</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4105'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='5'}">{{ fmdetail.odds[410].Selections[5].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['5'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['5'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['6'].State==='0', 'slt':current===fmdetail.odds[410].Selections['6'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='6','item-zj': fmdetail.odds[410].Selections['6'].golds&&fmdetail.odds[410].Selections['6'].prize_state==='1'&&fmdetail.odds[410].Selections['6'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['6'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">5</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4106'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='6'}">{{ fmdetail.odds[410].Selections[6].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['6'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['6'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>

                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['7'].State==='0', 'slt':current===fmdetail.odds[410].Selections['7'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='7','item-zj': fmdetail.odds[410].Selections['7'].golds&&fmdetail.odds[410].Selections['7'].prize_state==='1'&&fmdetail.odds[410].Selections['7'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['7'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">6</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['4107'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='7'}">{{ fmdetail.odds[410].Selections[7].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['7'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['7'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="item"
                                             :class="{ 'endItem':fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['-1'].State==='0', 'slt':current===fmdetail.odds[410].Selections['-1'],'item-end':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result!=='-1','item-zj': fmdetail.odds[410].Selections['-1'].golds&&fmdetail.odds[410].Selections['-1'].prize_state==='1'&&fmdetail.odds[410].Selections['-1'].bonus!=='0' }"
                                             v-tap="{methods: selectItem, params: {item: fmdetail.odds[410].Selections['-1'], ruleType: '410', rule: fmdetail.odds[410]}}"
                                        >
                                            <span class="item-xx">7+</span>
                                            <span class="item-pl"
                                                  :class="{'changeColor':stat['410-1'],'item-gray':fmdetail.odds[410].State==='3'&&fmdetail.odds[410].result==='-1'}">{{ fmdetail.odds[410].Selections[-1].BackOdds
                                                }}</span>
                                            <span class="item-zc">{{ fmdetail.odds[410].Selections['-1'].support
                                                }}支持</span>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[410].State=='1'&&fmdetail.odds[410].Selections['-1'].State==='0'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="endTips"
                                             v-if="fmdetail.odds[410].State!=='1'&&fmdetail.odds[410].State!=='3'">
                                            封盘中...



                                        </div>
                                    </div>
                                    <div class="betShow"
                                         :class="{'hide':!fmdetail.odds[410].Selections['5'].golds &&
                                                 !fmdetail.odds[410].Selections['6'].golds &&
                                                 !fmdetail.odds[410].Selections['7'].golds &&
                                                 !fmdetail.odds[410].Selections['-1'].golds
                                        }"
                                    >
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['5'].golds&&fmdetail.odds[410].Selections['5'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['5'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['5'].bonus | format}}</p>
                                            </template>

                                            <template
                                                    v-if="fmdetail.odds[410].Selections['5'].golds&&fmdetail.odds[410].Selections['5'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['5'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['5'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['5'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['6'].golds&&fmdetail.odds[410].Selections['6'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['6'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['6'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['6'].golds&&fmdetail.odds[410].Selections['6'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['6'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['6'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['6'].bonus | format}}</p>
                                            </template>
                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['7'].golds&&fmdetail.odds[410].Selections['7'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['7'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['7'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['7'].golds&&fmdetail.odds[410].Selections['7'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['7'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['7'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['7'].bonus | format}}</p>
                                            </template>

                                        </div>
                                        <div class="item">
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['-1'].golds&&fmdetail.odds[410].Selections['-1'].prize_state==='-1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="emColor">{{fmdetail.odds[410].Selections['-1'].golds |
                                            format}}</em>
                                                <p>可中{{fmdetail.odds[410].Selections['-1'].bonus | format}}</p>
                                            </template>
                                            <template
                                                    v-if="fmdetail.odds[410].Selections['-1'].golds&&fmdetail.odds[410].Selections['-1'].prize_state==='1'">
                                                <i class="icon-jinbi"></i><em
                                                    class="gray">{{fmdetail.odds[410].Selections['-1'].golds | format}}</em>
                                                <p v-if="fmdetail.odds[410].Selections['-1'].bonus!=='0'"
                                                   class="red">
                                                    中{{fmdetail.odds[410].Selections['-1'].bonus | format}}</p>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="endTips hide">封盘中...</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="currTab==='bf'" class="betEara">
                            <div class="betBox betBox-bif" v-tap="{methods:clickPanel}"
                                 v-if="fmdetail.odds[140]!==undefined"
                                 :class="{'betBox-end': fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'}"
                            >
                                <div class="boxTit boxTit-bif clear">
                                    <h3>猜比分</h3>
                                    <span>90分钟内比分结果</span>
                                </div>

                                <ul class="tab-bif">
                                    <li class="" :class="{ 'cur':gussTab_home }"
                                        v-tap="{ methods:gussTabFn,params:{ tabStyle:'gussTab_home' } }">主胜



                                    </li>
                                    <li class="" :class="{ 'cur':gussTab_draw }"
                                        v-tap="{ methods:gussTabFn,params:{ tabStyle:'gussTab_draw' } }">平局



                                    </li>
                                    <li class="" :class="{ 'cur':gussTab_away }"
                                        v-tap="{ methods:gussTabFn,params:{ tabStyle:'gussTab_away' } }">客胜



                                    </li>
                                </ul>
                                <!-- 主胜 -->
                                <div class="boxWrap" v-if="gussTab_home">
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10002','item-zj': fmdetail.odds[140].Selections['10002'].golds&&fmdetail.odds[140].Selections['10002'].prize_state==='1'&&fmdetail.odds[140].Selections['10002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10002'}">{{ fmdetail.odds[140].Selections[10002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10002'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10003','item-zj': fmdetail.odds[140].Selections['10003'].golds&&fmdetail.odds[140].Selections['10003'].prize_state==='1'&&fmdetail.odds[140].Selections['10003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10003'}">{{ fmdetail.odds[140].Selections[10003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10003'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20003','item-zj': fmdetail.odds[140].Selections['20003'].golds&&fmdetail.odds[140].Selections['20003'].prize_state==='1'&&fmdetail.odds[140].Selections['20003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20003'}">{{ fmdetail.odds[140].Selections[20003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20003'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10004','item-zj': fmdetail.odds[140].Selections['10004'].golds&&fmdetail.odds[140].Selections['10004'].prize_state==='1'&&fmdetail.odds[140].Selections['10004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10004'}">{{ fmdetail.odds[140].Selections[10004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10004'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['10002'].golds &&
                                                     !fmdetail.odds[140].Selections['10003'].golds &&
                                                     !fmdetail.odds[140].Selections['20003'].golds &&
                                                     !fmdetail.odds[140].Selections['10004'].golds
                                            }"
                                        >

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10002'].golds&&fmdetail.odds[140].Selections['10002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10002'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10002'].bonus | format}}</p>
                                                </template>

                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10002'].golds&&fmdetail.odds[140].Selections['10002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10002'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10002'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10003'].golds&&fmdetail.odds[140].Selections['10003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10003'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10003'].golds&&fmdetail.odds[140].Selections['10003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10003'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10003'].bonus | format}}</p>
                                                </template>

                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20003'].golds&&fmdetail.odds[140].Selections['20003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20003'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20003'].golds&&fmdetail.odds[140].Selections['20003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20003'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20003'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10004'].golds&&fmdetail.odds[140].Selections['10004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10004'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10004'].golds&&fmdetail.odds[140].Selections['10004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10004'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10004'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20004','item-zj': fmdetail.odds[140].Selections['20004'].golds&&fmdetail.odds[140].Selections['20004'].prize_state==='1'&&fmdetail.odds[140].Selections['20004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20004'}">{{ fmdetail.odds[140].Selections[20004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20004'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30004','item-zj': fmdetail.odds[140].Selections['30004'].golds&&fmdetail.odds[140].Selections['30004'].prize_state==='1'&&fmdetail.odds[140].Selections['30004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30004'}">{{ fmdetail.odds[140].Selections[30004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30004'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10005','item-zj': fmdetail.odds[140].Selections['10005'].golds&&fmdetail.odds[140].Selections['10005'].prize_state==='1'&&fmdetail.odds[140].Selections['10005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10005'}">{{ fmdetail.odds[140].Selections[10005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10005'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20005','item-zj': fmdetail.odds[140].Selections['20005'].golds&&fmdetail.odds[140].Selections['20005'].prize_state==='1'&&fmdetail.odds[140].Selections['20005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20005'}">{{ fmdetail.odds[140].Selections[20005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20005'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['20004'].golds &&
                                                     !fmdetail.odds[140].Selections['30004'].golds &&
                                                     !fmdetail.odds[140].Selections['10005'].golds &&
                                                     !fmdetail.odds[140].Selections['20005'].golds
                                            }"
                                        >

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20004'].golds&&fmdetail.odds[140].Selections['20004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20004'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20004'].golds&&fmdetail.odds[140].Selections['20004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20004'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20004'].bonus | format}}</p>
                                                </template>

                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30004'].golds&&fmdetail.odds[140].Selections['30004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30004'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30004'].golds&&fmdetail.odds[140].Selections['30004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30004'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30004'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10005'].golds&&fmdetail.odds[140].Selections['10005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10005'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10005'].bonus | format}}</p>
                                                </template>

                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10005'].golds&&fmdetail.odds[140].Selections['10005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10005'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20005'].golds&&fmdetail.odds[140].Selections['20005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20005'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20005'].golds&&fmdetail.odds[140].Selections['20005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20005'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30005','item-zj': fmdetail.odds[140].Selections['30005'].golds&&fmdetail.odds[140].Selections['30005'].prize_state==='1'&&fmdetail.odds[140].Selections['30005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30005'}">{{ fmdetail.odds[140].Selections[30005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30005'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40005','item-zj': fmdetail.odds[140].Selections['40005'].golds&&fmdetail.odds[140].Selections['40005'].prize_state==='1'&&fmdetail.odds[140].Selections['40005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40005'}">{{ fmdetail.odds[140].Selections[40005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40005'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10006','item-zj': fmdetail.odds[140].Selections['10006'].golds&&fmdetail.odds[140].Selections['10006'].prize_state==='1'&&fmdetail.odds[140].Selections['10006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10006'}">{{ fmdetail.odds[140].Selections[10006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10006'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20006','item-zj': fmdetail.odds[140].Selections['20006'].golds&&fmdetail.odds[140].Selections['20006'].prize_state==='1'&&fmdetail.odds[140].Selections['20006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20006'}">{{ fmdetail.odds[140].Selections[20006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20006'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['30005'].golds &&
                                                     !fmdetail.odds[140].Selections['40005'].golds &&
                                                     !fmdetail.odds[140].Selections['10006'].golds &&
                                                     !fmdetail.odds[140].Selections['20006'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30005'].golds&&fmdetail.odds[140].Selections['30005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30005'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30005'].golds&&fmdetail.odds[140].Selections['30005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30005'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40005'].golds&&fmdetail.odds[140].Selections['40005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40005'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40005'].golds&&fmdetail.odds[140].Selections['40005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40005'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10006'].golds&&fmdetail.odds[140].Selections['10006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10006'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10006'].golds&&fmdetail.odds[140].Selections['10006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10006'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10006'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20006'].golds&&fmdetail.odds[140].Selections['20006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20006'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20006'].golds&&fmdetail.odds[140].Selections['20006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20006'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20006'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30006','item-zj': fmdetail.odds[140].Selections['30006'].golds&&fmdetail.odds[140].Selections['30006'].prize_state==='1'&&fmdetail.odds[140].Selections['30006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30006'}">{{ fmdetail.odds[140].Selections[30006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30006'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40006','item-zj': fmdetail.odds[140].Selections['40006'].golds&&fmdetail.odds[140].Selections['40006'].prize_state==='1'&&fmdetail.odds[140].Selections['40006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40006'}">{{ fmdetail.odds[140].Selections[40006].BackOdds}}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40006'].support}}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40006'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50006','item-zj': fmdetail.odds[140].Selections['50006'].golds&&fmdetail.odds[140].Selections['50006'].prize_state==='1'&&fmdetail.odds[140].Selections['50006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50006'}">{{ fmdetail.odds[140].Selections[50006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50006'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10007','item-zj': fmdetail.odds[140].Selections['10007'].golds&&fmdetail.odds[140].Selections['10007'].prize_state==='1'&&fmdetail.odds[140].Selections['10007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10007'}">{{ fmdetail.odds[140].Selections[10007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10007'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['30006'].golds &&
                                                     !fmdetail.odds[140].Selections['40006'].golds &&
                                                     !fmdetail.odds[140].Selections['50006'].golds &&
                                                     !fmdetail.odds[140].Selections['10007'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30006'].golds&&fmdetail.odds[140].Selections['30006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30006'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30006'].golds&&fmdetail.odds[140].Selections['30006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30006'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30006'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40006'].golds&&fmdetail.odds[140].Selections['40006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40006'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40006'].golds&&fmdetail.odds[140].Selections['40006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40006'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40006'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50006'].golds&&fmdetail.odds[140].Selections['50006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50006'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50006'].golds&&fmdetail.odds[140].Selections['50006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50006'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50006'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10007'].golds&&fmdetail.odds[140].Selections['10007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10007'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10007'].golds&&fmdetail.odds[140].Selections['10007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10007'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10007'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20007','item-zj': fmdetail.odds[140].Selections['20007'].golds&&fmdetail.odds[140].Selections['20007'].prize_state==='1'&&fmdetail.odds[140].Selections['20007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20007'}">{{ fmdetail.odds[140].Selections[20007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20007'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30007','item-zj': fmdetail.odds[140].Selections['40006'].golds&&fmdetail.odds[140].Selections['30007'].prize_state==='1'&&fmdetail.odds[140].Selections['30007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30007'}">{{ fmdetail.odds[140].Selections[30007].BackOdds}}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30007'].support}}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30007'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40007','item-zj': fmdetail.odds[140].Selections['40007'].golds&&fmdetail.odds[140].Selections['40007'].prize_state==='1'&&fmdetail.odds[140].Selections['40007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40007'}">{{ fmdetail.odds[140].Selections[40007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40007'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50007','item-zj': fmdetail.odds[140].Selections['50007'].golds&&fmdetail.odds[140].Selections['50007'].prize_state==='1'&&fmdetail.odds[140].Selections['50007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50007'}">{{ fmdetail.odds[140].Selections[50007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50007'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['20007'].golds &&
                                                     !fmdetail.odds[140].Selections['30007'].golds &&
                                                     !fmdetail.odds[140].Selections['40007'].golds &&
                                                     !fmdetail.odds[140].Selections['50007'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20007'].golds&&fmdetail.odds[140].Selections['20007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20007'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20007'].golds&&fmdetail.odds[140].Selections['20007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20007'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20007'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30007'].golds&&fmdetail.odds[140].Selections['30007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30007'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30007'].golds&&fmdetail.odds[140].Selections['30007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30007'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30007'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40007'].golds&&fmdetail.odds[140].Selections['40007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40007'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40007'].golds&&fmdetail.odds[140].Selections['40007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40007'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40007'].bonus | format}}</p>
                                                </template>
                                            </div>


                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50007'].golds&&fmdetail.odds[140].Selections['50007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50007'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50007'].golds&&fmdetail.odds[140].Selections['50007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50007'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50007'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60007','item-zj': fmdetail.odds[140].Selections['60007'].golds&&fmdetail.odds[140].Selections['60007'].prize_state==='1'&&fmdetail.odds[140].Selections['60007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60007'}">{{ fmdetail.odds[140].Selections[60007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60007'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['2'].State==='0', 'slt':current===fmdetail.odds[140].Selections['2'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='2','item-zj': fmdetail.odds[140].Selections['2'].golds&&fmdetail.odds[140].Selections['2'].prize_state==='1'&&fmdetail.odds[140].Selections['2'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['2'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">胜其它</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['1402'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='2'}">{{ fmdetail.odds[140].Selections[2].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['2'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['2'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['60007'].golds &&
                                                     !fmdetail.odds[140].Selections['2'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60007'].golds&&fmdetail.odds[140].Selections['60007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60007'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60007'].golds&&fmdetail.odds[140].Selections['60007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60007'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60007'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['2'].golds&&fmdetail.odds[140].Selections['2'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['2'].golds |
                                                    format}}</em>
                                                    <p>可中{{fmdetail.odds[140].Selections['2'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['2'].golds&&fmdetail.odds[140].Selections['2'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['2'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['2'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['2'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 平局 -->
                                <div class="boxWrap" v-if="gussTab_draw">
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['10001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='10001','item-zj': fmdetail.odds[140].Selections['10001'].golds&&fmdetail.odds[140].Selections['10001'].prize_state==='1'&&fmdetail.odds[140].Selections['10001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['10001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:0</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14010001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='10001'}">{{ fmdetail.odds[140].Selections[10001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['10001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['10001'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20002','item-zj': fmdetail.odds[140].Selections['20002'].golds&&fmdetail.odds[140].Selections['20002'].prize_state==='1'&&fmdetail.odds[140].Selections['20002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20002'}">{{ fmdetail.odds[140].Selections[20002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20002'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30003','item-zj': fmdetail.odds[140].Selections['30003'].golds&&fmdetail.odds[140].Selections['30003'].prize_state==='1'&&fmdetail.odds[140].Selections['30003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30003'}">{{ fmdetail.odds[140].Selections[30003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30003'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40004','item-zj': fmdetail.odds[140].Selections['40004'].golds&&fmdetail.odds[140].Selections['40004'].prize_state==='1'&&fmdetail.odds[140].Selections['40004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40004'}">{{ fmdetail.odds[140].Selections[40004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40004'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['10001'].golds &&
                                                     !fmdetail.odds[140].Selections['20002'].golds &&
                                                     !fmdetail.odds[140].Selections['30003'].golds &&
                                                     !fmdetail.odds[140].Selections['40004'].golds
                                            }"
                                        >

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10001'].golds&&fmdetail.odds[140].Selections['10001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['10001'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['10001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['10001'].golds&&fmdetail.odds[140].Selections['10001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['10001'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['10001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['10001'].bonus | format}}</p>
                                                </template>

                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20002'].golds&&fmdetail.odds[140].Selections['20002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20002'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20002'].golds&&fmdetail.odds[140].Selections['20002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20002'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20002'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30003'].golds&&fmdetail.odds[140].Selections['30003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30003'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30003'].golds&&fmdetail.odds[140].Selections['30003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30003'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30003'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40004'].golds&&fmdetail.odds[140].Selections['40004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40004'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40004'].golds&&fmdetail.odds[140].Selections['40004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40004'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40004'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50005','item-zj': fmdetail.odds[140].Selections['50005'].golds&&fmdetail.odds[140].Selections['50005'].prize_state==='1'&&fmdetail.odds[140].Selections['50005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50005'}">{{ fmdetail.odds[140].Selections[50005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50005'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60006','item-zj': fmdetail.odds[140].Selections['60006'].golds&&fmdetail.odds[140].Selections['60006'].prize_state==='1'&&fmdetail.odds[140].Selections['60006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60006'}">{{ fmdetail.odds[140].Selections[60006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60006'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70007'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70007'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70007','item-zj': fmdetail.odds[140].Selections['70007'].golds&&fmdetail.odds[140].Selections['70007'].prize_state==='1'&&fmdetail.odds[140].Selections['70007'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70007'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">6:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070007'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70007'}">{{ fmdetail.odds[140].Selections[70007].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70007'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70007'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['3'].State==='0', 'slt':current===fmdetail.odds[140].Selections['3'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='3','item-zj': fmdetail.odds[140].Selections['3'].golds&&fmdetail.odds[140].Selections['3'].prize_state==='1'&&fmdetail.odds[140].Selections['3'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['3'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">平其他</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['1403'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='3'}">{{ fmdetail.odds[140].Selections[3].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['3'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['3'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['50005'].golds &&
                                                     !fmdetail.odds[140].Selections['60006'].golds &&
                                                     !fmdetail.odds[140].Selections['70007'].golds &&
                                                     !fmdetail.odds[140].Selections['3'].golds
                                            }"
                                        >

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50005'].golds&&fmdetail.odds[140].Selections['50005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50005'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50005'].golds&&fmdetail.odds[140].Selections['50005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50005'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50005'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60006'].golds&&fmdetail.odds[140].Selections['60006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60006'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60006'].golds&&fmdetail.odds[140].Selections['60006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60006'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60006'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70007'].golds&&fmdetail.odds[140].Selections['70007'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70007'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70007'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70007'].golds&&fmdetail.odds[140].Selections['70007'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70007'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70007'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70007'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['3'].golds&&fmdetail.odds[140].Selections['3'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['3'].golds |
                                                format}}</em>
                                                    <p>可中{{fmdetail.odds[140].Selections['3'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['3'].golds&&fmdetail.odds[140].Selections['3'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['3'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['3'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['3'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 客胜 -->
                                <div class="boxWrap" v-if="gussTab_away">
                                    <div class="boxInner">
                                        <div class="bet">

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['20001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='20001','item-zj': fmdetail.odds[140].Selections['20001'].golds&&fmdetail.odds[140].Selections['20001'].prize_state==='1'&&fmdetail.odds[140].Selections['20001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['20001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:1</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14020001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='20001'}">{{ fmdetail.odds[140].Selections[20001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['20001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['20001'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30001','item-zj': fmdetail.odds[140].Selections['30001'].golds&&fmdetail.odds[140].Selections['30001'].prize_state==='1'&&fmdetail.odds[140].Selections['30001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30001'}">{{ fmdetail.odds[140].Selections[30001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30001'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['30002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='30002','item-zj': fmdetail.odds[140].Selections['30002'].golds&&fmdetail.odds[140].Selections['30002'].prize_state==='1'&&fmdetail.odds[140].Selections['30002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['30002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:2</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14030002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='30002'}">{{ fmdetail.odds[140].Selections[30002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['30002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['30002'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40001','item-zj': fmdetail.odds[140].Selections['40001'].golds&&fmdetail.odds[140].Selections['40001'].prize_state==='1'&&fmdetail.odds[140].Selections['40001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40001'}">{{ fmdetail.odds[140].Selections[40001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40001'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['20001'].golds &&
                                                     !fmdetail.odds[140].Selections['30001'].golds &&
                                                     !fmdetail.odds[140].Selections['30002'].golds &&
                                                     !fmdetail.odds[140].Selections['40001'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20001'].golds&&fmdetail.odds[140].Selections['20001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['20001'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['20001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['20001'].golds&&fmdetail.odds[140].Selections['20001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['20001'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['20001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['20001'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30001'].golds&&fmdetail.odds[140].Selections['30001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30001'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30001'].golds&&fmdetail.odds[140].Selections['30001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30001'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30001'].bonus | format}}</p>
                                                </template>

                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30002'].golds&&fmdetail.odds[140].Selections['30002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['30002'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['30002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['30002'].golds&&fmdetail.odds[140].Selections['30002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['30002'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['30002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['30002'].bonus | format}}</p>
                                                </template>

                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40001'].golds&&fmdetail.odds[140].Selections['40001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40001'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40001'].golds&&fmdetail.odds[140].Selections['40001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40001'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40001'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40002','item-zj': fmdetail.odds[140].Selections['40002'].golds&&fmdetail.odds[140].Selections['40002'].prize_state==='1'&&fmdetail.odds[140].Selections['40002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40002'}">{{ fmdetail.odds[140].Selections[40002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40002'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['40003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='40003','item-zj': fmdetail.odds[140].Selections['40003'].golds&&fmdetail.odds[140].Selections['40003'].prize_state==='1'&&fmdetail.odds[140].Selections['40003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['40003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:3</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14040003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='40003'}">{{ fmdetail.odds[140].Selections[40003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['40003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['40003'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50001','item-zj': fmdetail.odds[140].Selections['50001'].golds&&fmdetail.odds[140].Selections['50001'].prize_state==='1'&&fmdetail.odds[140].Selections['50001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50001'}">{{ fmdetail.odds[140].Selections[50001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50001'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>

                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50002','item-zj': fmdetail.odds[140].Selections['50002'].golds&&fmdetail.odds[140].Selections['50002'].prize_state==='1'&&fmdetail.odds[140].Selections['50002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50002'}">{{ fmdetail.odds[140].Selections[50002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50002'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...



                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['40002'].golds &&
                                                     !fmdetail.odds[140].Selections['40003'].golds &&
                                                     !fmdetail.odds[140].Selections['50001'].golds &&
                                                     !fmdetail.odds[140].Selections['50002'].golds
                                            }"
                                        >

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40002'].golds&&fmdetail.odds[140].Selections['40002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40002'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40002'].golds&&fmdetail.odds[140].Selections['40002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40002'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40002'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40003'].golds&&fmdetail.odds[140].Selections['40003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['40003'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['40003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['40003'].golds&&fmdetail.odds[140].Selections['40003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['40003'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['40003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['40003'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50001'].golds&&fmdetail.odds[140].Selections['50001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50001'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50001'].golds&&fmdetail.odds[140].Selections['50001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50001'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50001'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50002'].golds&&fmdetail.odds[140].Selections['50002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50002'].golds |
                                                format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50002'].golds&&fmdetail.odds[140].Selections['50002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50002'].golds |
                                                format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50002'].bonus | format}}</p>
                                                </template>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50003','item-zj': fmdetail.odds[140].Selections['50003'].golds&&fmdetail.odds[140].Selections['50003'].prize_state==='1'&&fmdetail.odds[140].Selections['50003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50003'}">{{ fmdetail.odds[140].Selections[50003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50003'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['50004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='50004','item-zj': fmdetail.odds[140].Selections['50004'].golds&&fmdetail.odds[140].Selections['50004'].prize_state==='1'&&fmdetail.odds[140].Selections['50004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['50004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:4</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14050004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='50004'}">{{ fmdetail.odds[140].Selections[50004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['50004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['50004'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60001','item-zj': fmdetail.odds[140].Selections['60001'].golds&&fmdetail.odds[140].Selections['60001'].prize_state==='1'&&fmdetail.odds[140].Selections['60001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60001'}">{{ fmdetail.odds[140].Selections[60001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60001'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60002','item-zj': fmdetail.odds[140].Selections['60002'].golds&&fmdetail.odds[140].Selections['60002'].prize_state==='1'&&fmdetail.odds[140].Selections['60002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60002'}">{{ fmdetail.odds[140].Selections[60002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60002'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['50003'].golds &&
                                                     !fmdetail.odds[140].Selections['50004'].golds &&
                                                     !fmdetail.odds[140].Selections['60001'].golds &&
                                                     !fmdetail.odds[140].Selections['60002'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50003'].golds&&fmdetail.odds[140].Selections['50003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50003'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50003'].golds&&fmdetail.odds[140].Selections['50003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50003'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50003'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50004'].golds&&fmdetail.odds[140].Selections['50004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['50004'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['50004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['50004'].golds&&fmdetail.odds[140].Selections['50004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['50004'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['50004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['50004'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60001'].golds&&fmdetail.odds[140].Selections['60001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60001'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60001'].golds&&fmdetail.odds[140].Selections['60001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60001'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60001'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60002'].golds&&fmdetail.odds[140].Selections['60002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60002'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60002'].golds&&fmdetail.odds[140].Selections['60002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60002'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60002'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60003','item-zj': fmdetail.odds[140].Selections['60003'].golds&&fmdetail.odds[140].Selections['60003'].prize_state==='1'&&fmdetail.odds[140].Selections['60003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60003'}">{{ fmdetail.odds[140].Selections[60003].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60003'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60003'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60004','item-zj': fmdetail.odds[140].Selections['60004'].golds&&fmdetail.odds[140].Selections['60004'].prize_state==='1'&&fmdetail.odds[140].Selections['60004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60004'}">{{ fmdetail.odds[140].Selections[60004].BackOdds}}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60004'].support}}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60004'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['60005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='60005','item-zj': fmdetail.odds[140].Selections['60005'].golds&&fmdetail.odds[140].Selections['60005'].prize_state==='1'&&fmdetail.odds[140].Selections['60005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['60005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:5</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14060005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='60005'}">{{ fmdetail.odds[140].Selections[60005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['60005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['60005'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70001'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70001'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70001','item-zj': fmdetail.odds[140].Selections['70001'].golds&&fmdetail.odds[140].Selections['70001'].prize_state==='1'&&fmdetail.odds[140].Selections['70001'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70001'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">0:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070001'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70001'}">{{ fmdetail.odds[140].Selections[70001].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70001'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70001'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['60003'].golds &&
                                                     !fmdetail.odds[140].Selections['60004'].golds &&
                                                     !fmdetail.odds[140].Selections['60005'].golds &&
                                                     !fmdetail.odds[140].Selections['70001'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60003'].golds&&fmdetail.odds[140].Selections['60003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60003'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60003'].golds&&fmdetail.odds[140].Selections['60003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60003'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60003'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60004'].golds&&fmdetail.odds[140].Selections['60004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60004'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60004'].golds&&fmdetail.odds[140].Selections['60004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60004'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60004'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60005'].golds&&fmdetail.odds[140].Selections['60005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['60005'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['60005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['60005'].golds&&fmdetail.odds[140].Selections['60005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['60005'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['60005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['60005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70001'].golds&&fmdetail.odds[140].Selections['70001'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70001'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70001'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70001'].golds&&fmdetail.odds[140].Selections['70001'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70001'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70001'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70001'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70002'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70002'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70002','item-zj': fmdetail.odds[140].Selections['70002'].golds&&fmdetail.odds[140].Selections['70002'].prize_state==='1'&&fmdetail.odds[140].Selections['70002'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70002'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">1:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070002'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70002'}">{{ fmdetail.odds[140].Selections[70002].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70002'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70002'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70003'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70003'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70003','item-zj': fmdetail.odds[140].Selections['70003'].golds&&fmdetail.odds[140].Selections['70003'].prize_state==='1'&&fmdetail.odds[140].Selections['70003'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70003'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">2:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070003'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70003'}">{{ fmdetail.odds[140].Selections[70003].BackOdds}}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70003'].support}}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70003'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70004'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70004'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70004','item-zj': fmdetail.odds[140].Selections['70004'].golds&&fmdetail.odds[140].Selections['70004'].prize_state==='1'&&fmdetail.odds[140].Selections['70004'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70004'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">3:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070004'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70004'}">{{ fmdetail.odds[140].Selections[70004].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70004'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70004'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70005'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70005'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70005','item-zj': fmdetail.odds[140].Selections['70005'].golds&&fmdetail.odds[140].Selections['70005'].prize_state==='1'&&fmdetail.odds[140].Selections['70005'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70005'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">4:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070005'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70005'}">{{ fmdetail.odds[140].Selections[70005].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70005'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70005'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['70002'].golds &&
                                                     !fmdetail.odds[140].Selections['70003'].golds &&
                                                     !fmdetail.odds[140].Selections['70004'].golds &&
                                                     !fmdetail.odds[140].Selections['70005'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70002'].golds&&fmdetail.odds[140].Selections['70002'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70002'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70002'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70002'].golds&&fmdetail.odds[140].Selections['70002'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70002'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70002'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70002'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70003'].golds&&fmdetail.odds[140].Selections['70003'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70003'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70003'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70003'].golds&&fmdetail.odds[140].Selections['70003'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70003'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70003'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70003'].bonus | format}}</p>
                                                </template>
                                            </div>
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70004'].golds&&fmdetail.odds[140].Selections['70004'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70004'].golds | format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70004'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70004'].golds&&fmdetail.odds[140].Selections['70004'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70004'].golds | format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70004'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70004'].bonus | format}}</p>
                                                </template>
                                            </div>


                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70005'].golds&&fmdetail.odds[140].Selections['70005'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70005'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70005'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70005'].golds&&fmdetail.odds[140].Selections['70005'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70005'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70005'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70005'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="boxInner">
                                        <div class="bet">
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70006'].State==='0', 'slt':current===fmdetail.odds[140].Selections['70006'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='70006','item-zj': fmdetail.odds[140].Selections['70006'].golds&&fmdetail.odds[140].Selections['70006'].prize_state==='1'&&fmdetail.odds[140].Selections['70006'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['70006'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">5:6</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['14070006'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='70006'}">{{ fmdetail.odds[140].Selections[70006].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['70006'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['70006'].State==='0'">
                                                    封盘中...



                                                </div>
                                            </div>
                                            <div class="item"
                                                 :class="{'endItem':fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['4'].State==='0', 'slt':current===fmdetail.odds[140].Selections['4'],'item-end':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result!=='4','item-zj': fmdetail.odds[140].Selections['4'].golds&&fmdetail.odds[140].Selections['4'].prize_state==='1'&&fmdetail.odds[140].Selections['4'].bonus!=='0' }"
                                                 v-tap="{methods: selectItem, params: {item: fmdetail.odds[140].Selections['4'], ruleType: '140', rule: fmdetail.odds[140]}}"
                                            >
                                                <span class="item-xx">负其它</span>
                                                <span class="item-pl"
                                                      :class="{'changeColor':stat['1404'],'item-gray':fmdetail.odds[140].State==='3'&&fmdetail.odds[140].result==='4'}">{{ fmdetail.odds[140].Selections[4].BackOdds
                                                    }}</span>
                                                <span class="item-zc">{{ fmdetail.odds[140].Selections['4'].support
                                                    }}支持</span>
                                                <div class="endTips"
                                                     v-if="fmdetail.odds[140].State=='1'&&fmdetail.odds[140].Selections['4'].State==='0'">
                                                    封盘中...
                                                </div>
                                            </div>
                                            <div class="endTips"
                                                 v-if="fmdetail.odds[140].State!=='1'&&fmdetail.odds[140].State!=='3'">
                                                封盘中...
                                            </div>
                                        </div>
                                        <div class="betShow"
                                             :class="{'hide':!fmdetail.odds[140].Selections['70006'].golds &&
                                                     !fmdetail.odds[140].Selections['4'].golds
                                            }"
                                        >
                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70006'].golds&&fmdetail.odds[140].Selections['70006'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['70006'].golds |
                                                    format}}</em>
                                                    <p>
                                                        可中{{fmdetail.odds[140].Selections['70006'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['70006'].golds&&fmdetail.odds[140].Selections['70006'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['70006'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['70006'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['70006'].bonus | format}}</p>
                                                </template>
                                            </div>

                                            <div class="item">
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['4'].golds&&fmdetail.odds[140].Selections['4'].prize_state==='-1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="emColor">{{fmdetail.odds[140].Selections['4'].golds |
                                                    format}}</em>
                                                    <p>可中{{fmdetail.odds[140].Selections['4'].bonus | format}}</p>
                                                </template>
                                                <template
                                                        v-if="fmdetail.odds[140].Selections['4'].golds&&fmdetail.odds[140].Selections['4'].prize_state==='1'">
                                                    <i class="icon-jinbi"></i><em
                                                        class="gray">{{fmdetail.odds[140].Selections['4'].golds |
                                                    format}}</em>
                                                    <p v-if="fmdetail.odds[140].Selections['4'].bonus!=='0'"
                                                       class="red">
                                                        中{{fmdetail.odds[140].Selections['4'].bonus | format}}</p>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="endTips hide">封盘中...</div>
                            </div>
                        </div>
                    </template>


                </section>
            </div>
        </div>

        <!-- home icon -->
        <!--<div class="back_home" v-tap="{methods:goMyPages,target:'homeHot'}" ></div>-->

        <!--  底部选项 -->
        <div class="betBar" :class="{betBar_show:current}">
            <div class="betInfo">
                <div class="bet-info">
                    <span class="yue" v-if="hasLogin">余额 {{ allMoney | format }}</span>
                    <span class="yue" v-else>未登录</span>
                    <span class="betMsg hide">请选择投注金额</span>
                    <span class="betMoney">
                                <i class="icon-jinbi"></i>
                                    <span v-html="tips"></span>
                                <i class="icon-clearup" v-if="selectedNum>0" v-tap="{methods:clean}"></i>
                            </span>
                    <span class="tips-money" :class="{'hide':!inFlash}">{{ flashMsg }}</span>
                </div>
                <span class="btn-bar-hide" v-tap="{methods:clickPanel}"></span>
            </div>
            <div class="moneyWrap clear">
                <ul class="money">
                    <li class="item01" v-tap="{methods:selectMoney,addMoney:100}"><span>&nbsp;</span></li>
                    <li class="item02" v-tap="{methods:selectMoney,addMoney:500}"><span>&nbsp;</span></li>
                    <li class="item03" v-tap="{methods:selectMoney,addMoney:5000}"><span>&nbsp;</span></li>
                    <li class="item04" v-tap="{methods:selectMoney,addMoney:-1}"><span>&nbsp;</span>
                        <em class="max" v-if="current"><i>{{watchCurrent | format }}</i></em>
                    </li>
                </ul>
                <div class="btnSubmit">
                    <div class="text" v-show="faqiState===0" v-tap="{methods:faqi}">确&nbsp;&nbsp;认</div>
                    <div class="loader" v-show="faqiState===1">Loading...</div>
                    <div class="submitOK" v-show="faqiState===2">
                    </div>
                </div>
            </div>
        </div>

        <!-- 猜球记录 弹窗  -->
        <BetListAlert v-if="showBetListbox"></BetListAlert>



        <!-- 嘉奖 弹窗  -->
        <AwardAlert v-show="showAwardbox"></AwardAlert>

        <!-- 賽事統計 弹窗  -->
        <EventCountAlert v-if="showEventCountbox" :match-state="fmdetail.MatchState"></EventCountAlert>

        <!-- 红包入口 -->
        <!-- 五大联赛入口 -->
        <!--<div v-if="gz_icon && 0">-->
            <!--<a href="javascript:;" class="enter":class="{'gray':nationGetRed !='抢红包','anima':nationGetRed ==='抢红包'}" id="enter">-->
                <!--<img src="~static/images/foot-enter.png" alt="足球入口" v-tap="{ methods:jumpToRed}">-->
                <!--<span v-if="showSelTime">{{ SelTimeNow}}</span>-->
                <!--<span v-else>{{ nationGetRed }}</span>-->
            <!--</a>-->
        <!--</div>-->

    </div>
</template>
<script>
    import $ from 'bc-zepto.full'
    import Slider from '~components/slider.vue'
    import BannerScroll from '~components/banner-scroll.vue'
    import MatchLive from '~components/match-live.vue'
    import BetListAlert from '~components/betList-alert.vue'
    import EventCountAlert from '~components/eventCount-alert.vue'
    import AwardAlert from '~components/award-alert.vue'
    import {aTypes, mTypes} from '~store/main'
    import {stopHtml} from '~common/util'

//
    export default {
        data () {
            return {
                gz_icon: false,
                showSelTime: false,
                SelTimeNow: 0,
                mtSeconds: 0,
                cState: {},
                currTab: 'all',
                current: null,
                prevStyle: true,
                nextStyle: true,
                currentRuleType: null,
                selectedNum: 0,  // 默认选择100币
                inFlash: false, // 右下角闪动提示
                flashMsg: '', // 右下角闪动提示
                allPage: 0,  // 按钮状态
                gussTab_home: true,  //  猜比分 主胜
                gussTab_draw: false, //  猜比分 平
                gussTab_away: false,  //  猜比分 客胜
                someList: [],  // 滑动的数据 c350
                sliderinit: {  // 滑动初始化
                    currentPage: 0,
                    start: {},
                    end: {},
                    tracking: true,
                    thresholdDistance: 30, //
                    thresholdTime: 1000, //
                    loop: false, // 循环滚动
                    infinite: 1, // 无限滚动前后遍历数
                    slidesToScroll: 1// 每次滑动项数
                },
                currentSelection: null,
                MatchResult_140: null,
                currSelectItemStr: null,
                showUINextBtn: true,
                showNextScore: [],
                that_new_Children: null, // 保存子组件实例
                matchid: 0,
                nationRedTime: null
            }
        },
        watch: {
            '$store.state.main.nationGetRed': function (nationGetRed) {
                clearInterval(this.nationRedTime)
                if (nationGetRed && nationGetRed !== '活动已结束') {
                    this.nationRedTime = setInterval(() => {
                        this.$store.dispatch(aTypes.getRedTimeInfo)
                    }, 60000)
                } else {
                    this.nationRedTime = null
                }
            },
            '$store.state.main.needReFetch': function (needReFetch) {
//                考虑到封盘的情况
                needReFetch && this.$store.dispatch(aTypes.getFootballMatchDetail, this.$route.params.matchid)
                needReFetch && this.$store.commit(mTypes.resetState, 'reFetch')
                this.current = null
                this.currentRuleType = null
            },
            '$store.state.main.stateChange': function (stateChange) {
                if (!Object.keys(stateChange).length) return
//                赔率改变
                setTimeout(() => {
                    this.$store.commit(mTypes.resetState, 'peilv')
                }, 5000)
            },
            '$store.state.main.faqiState': function (state) {
//                || state === 0  这个去了，看后续是否有影响
                if (state === 2 ) {
//                  刷新投注之后的状态
                    setTimeout(() => {
                        this.selectedNum = 0
                        this.current = null
                        this.currSelectItemStr = null
                        this.$store.commit(mTypes.resetState, 'faqi')
                    }, 2000)
                }
            },
            fmdetail (fmdetail) {
                if (fmdetail) {
                    if (Object.keys(fmdetail.odds).length) {
                        this.someList = fmdetail.odds[350]
                    }
                    setTimeout(() => {
                        if (fmdetail && fmdetail.odds && fmdetail.odds[140] && fmdetail.odds[140]) {
                            this.MatchResult_140 = fmdetail.odds[140].result
                        }
                        if (this.allEnd) {
                            //          用于猜比分选中对应的选项
                            // eslint-disable-next-line
                            let tabSel_140 = ''
                            switch (this.MatchResult_140) {
                            case '10002':
                            case '10003':
                            case '20003':
                            case '10004':
                            case '20004':
                            case '30004':
                            case '10005':
                            case '20005':
                            case '30005':
                            case '40005':
                            case '2':

                                    // eslint-disable-next-line
                                    tabSel_140 = 'gussTab_home'
                                break   //  以上胜

                            case '10001':
                            case '20002':
                            case '30003':
                            case '40004':
                            case '50005':
                            case '60006':
                            case '70007':
                            case '3':
                                    // eslint-disable-next-line
                                    tabSel_140 = 'gussTab_draw'
                                break  //  以上平

                            case '20001':
                            case '30001':
                            case '30002':
                            case '40001':
                            case '40002':
                            case '40003':
                            case '50001':
                            case '50002':
                            case '50003':
                            case '50004':
                            case '4':
                                    // eslint-disable-next-line
                                    tabSel_140 = 'gussTab_away'
                                break  //  以上负
                            default:
                                    // eslint-disable-next-line
                                    tabSel_140 = 'gussTab_home'
                            }
                            // eslint-disable-next-line
                            let tabSel_obj = {
                                params: {tabStyle: tabSel_140}
                            }
                            this.gussTabFn(tabSel_obj)
                        }
                    }, 10)
                }
                if (fmdetail && fmdetail.award_url) {
//                    this.$store.commit('setAwardImg', fmdetail.award_url)
                    this.$store.commit('setAwardImg', 'https://crazybet.choopaoo.com/img/esun/upload/d5/d7/d5d7597ca4f311e78ca3.jpg');
                    this.$store.commit('showAwardbox', true);
                }
            },
            someList () {
                //                跳转到最后一个
                this.allPage = this.someList.length - 1
                if (this.allPage) {
                    setTimeout(() => {
                        this.turnTo(this.allPage)
                        setTimeout(() => {
                            if (Array.isArray(this.that_new_Children)) {
                                this.that_new_Children.forEach((itemChild) => {
                                    if (itemChild.$el.className === 'slider-container') {
                                        itemChild.$emit('slideNext')
                                    }
                                })
                            }
                        }, 10)
                    }, 200)
                } else {
//                    一个球的情况
                    setTimeout(() => {
                        if (Array.isArray(this.that_new_Children)) {
                            this.that_new_Children.forEach((itemChild) => {
                                if (itemChild.$el.className === 'slider-container') {
                                    itemChild.$emit('slideNext')
                                }
                            })
                        }
                    }, 200)
                }
                if (Array.isArray(this.someList)) {
                    this.showNextScore = []
                    for (let i = 0; i < this.someList.length; i++) {
                        this.showNextScore.push(this.someList[i].nextscore)
                    }
                }
            },
            socketData (data) {
                if (data.mtype === '4' && data.Markets && data.Markets.length) {
                    this.$store.dispatch(aTypes.updateMarkets, data.Markets)
                } else if (data.mtype === '2' && data.MatchID === this.$route.params.matchid) {
                    this.cState = data
                    this.fmdetail.MatchOnTime = data.MatchOnTime
                }
            },
            caseType (caseType) {
                let needRefresh = {
                    100008: true,
                    100009: true,
                    100148: true,
                    100020: true,
                    100012: true,
                    100010: true,
                    100014: true,
                    100016: true,
                    100004: true,
                    100005: true,
                    100006: true,
                    100007: true,
                    100001: true,
                    100003: true
                }
                if (needRefresh[caseType]) {
                    this.$store.dispatch(aTypes.getFootballMatchDetail, this.$route.params.matchid)
                }
                this.$refs.live.$emit('eventChange', caseType)
            },
            '$store.state.socket.reconnect' () { // websocket 重新建立连接的时候刷新接口
                this.$store.dispatch(aTypes.getFootballMatchDetail, this.$route.params.matchid)
            }
        },
        components: {
            BannerScroll,
            Slider,
            MatchLive,
            BetListAlert,
            EventCountAlert,
            AwardAlert
        },
        filters: {
            format: (num) => {
//                金币格式处理
                num = Number(num)
                if (num < 10000) {
                    return num
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 10) / 10 + '万'
                } else {
                    return Math.round(num / 100000000 * 10) / 10 + '亿'
                }
            },
            mss: (status, MatchOnTime) => {
                if (!status || !MatchOnTime) return
                const minutes = MatchOnTime.split(':')[0] - 0
                if (status === '2' && minutes >= 45) {
                    return '上半场 45+\''
                } else if (status === '8' && minutes >= 90) {
                    return '下半场 90+\''
                } else if (status === '64' && minutes >= 115) {
                    return '加时上半场 115+\''
                } else if (status === '256' && minutes >= 120) {
                    return '加时下半场 120+\''
                } else {
                    switch (status) {
                    case '0':
                        return '无状态'
                    case '1':
                        return '未开始'
                    case '2':
                        return `上半场 ${MatchOnTime.split(':')[0] - 0 + 1}'`
                    case '4':
                        return '中场休息'
                    case '8':
                        return `下半场 ${MatchOnTime.split(':')[0] - 0 + 1}'`
                    case '16':
                        return '完场'
                    case '32':
                        return '完结'
                    case '64':
                        return `加时上半场 ${MatchOnTime.split(':')[0] - 0 + 1}'`
                    case '128':
                        return '加时休息'
                    case '256':
                        return `加时下半场 ${MatchOnTime.split(':')[0] - 0 + 1}'`
                    case '512':
                        return '加时完场'
                    case '1024':
                        return '点球'
                    }
                }
            }
        },
        methods: {
            jumpToRed () {
                var ck = ''
                if (this.ck) {
                    ck = this.ck.replace(/=/g, '$')
                    window.location.href = 'http://crazybet.choopaoo.com/redPacket/nationFootballRed.html?from=500qqsd&ck=' + ck
                } else {
                    this.$store.dispatch('doAuth');
                    return false;
                }
            },
            showAwardBoxFn () {
                this.$store.commit('showAwardbox', true)
            },
            goMyPages ({target}) {
                target = target || 'betlist'
                switch (target) {
                case 'betlist':
                    if (!this.hasLogin) {
                        this.$store.dispatch('doAuth');
                        return false;
                    } else {
                        this.$store.dispatch('getGoldList', this.matchid)
                        setTimeout(() => {
                            this.$store.commit('showBetListbox', true)
                        }, 10);
                        this.$store.dispatch('getUserInfo')
                    }
                    _hmt.push(['_trackEvent', '500fkcqH5_投注页猜球记录点击', 'click', '500fkcqH5_投注页猜球记录'])
                    break;
                case 'homeHot':
                    this.$store.state.home.currentBetSelect = null;
                    _hmt.push(['_trackEvent', '500fkcqH5_投注页home点击', 'click', '500fkcqH5_投注页home'])
                    $('body').scrollTop(0);
                    this.$router.push(`/h5/home/hot`);
                    break;
                case 'backHistory':
                    this.$store.state.home.currentBetSelect = null;
                    if (window.location && window.location.hash && window.location.hash.indexOf('from=banner') > -1) {
                        window.history.back()
                    } else {
                        window.history.back()
                    }
                    break
                case 'eventCount':
                    stopHtml();
                    this.$store.dispatch('getFootballStat', this.matchid);
                    this.$store.dispatch('getFootballCase', this.matchid);
                    setTimeout(() => {
                        this.$store.commit('showEventCountbox', true)
                    }, 10);
                    _hmt.push(['_trackEvent', '500fkcqH5_投注页事件统计点击', 'click', '500fkcqH5_投注页事件统计']);
                    break
                }
            },
            changeTab ({tab}) {
                this.currTab = tab
                this.current = null
                this.currentRuleType = null
                this.currSelectItemStr = null
                _hmt.push(['_trackEvent', '500fkcqH5_投注页选项点击', 'click', '500fkcqH5_投注页选项拼音' + tab])
            },
            format2 (num) {
//                金币格式处理
                num = Number(num)
                if (num < 10000) {
                    return Math.round(num)
                } else if (num < 100000000) {
                    return Math.round(num / 10000 * 100) / 100 + '万'
                } else {
                    return Math.round(num / 100000000 * 100) / 100 + '亿'
                }
            },
            gussTabFn (tabStyle) {
                //  猜比分的 tab
                this.gussTab_home = false
                this.gussTab_draw = false
                this.gussTab_away = false
                if (tabStyle.params.tabStyle) {
                    this[tabStyle.params.tabStyle] = true
                }
                this.current = null
                this.currentRuleType = null
                this.currSelectItemStr = null
            },
            slideNext () {
                if (this.nextStyle) {
                    if (Array.isArray(this.that_new_Children)) {
                        this.that_new_Children.forEach((itemChild) => {
                            if (itemChild.$el.className === 'slider-container') {
                                itemChild.$emit('slideNext')
                            }
                        })
                    }
                }
            },
            slidePre () {
                if (this.prevStyle) {
                    if (Array.isArray(this.that_new_Children)) {
                        this.that_new_Children.forEach((itemChild) => {
                            if (itemChild.$el.className === 'slider-container') {
                                itemChild.$emit('slidePre')
                            }
                        })
                    }
                }
            },
            turnTo (num) {
                if (Array.isArray(this.that_new_Children)) {
                    this.that_new_Children.forEach((itemChild) => {
                        if (itemChild.$el.className === 'slider-container') {
                            itemChild.$emit('slideTo', num)
                        }
                    })
                }
            },
            slide (pagenum, allPage = 1) {
                document.getElementById('nextScore').innerHTML = this.showNextScore[pagenum]
                // 监听事件变化
                this.allPage = allPage - 1
                this.prevStyle = true
                this.nextStyle = true
                this.showUINextBtn = true
                if (pagenum <= 0) {
                    this.prevStyle = false
                    this.nextStyle = true
                }
                if (pagenum >= allPage - 1) {
                    this.nextStyle = false
                    this.prevStyle = true
                }
                if (this.someList.length === 1) {
                    this.showUINextBtn = false
                    this.prevStyle = false
                    this.nextStyle = false
                }
            },
            flashTips () {
                this.inFlash = true
                setTimeout(() => {
                    this.inFlash = false
                }, 2000)
            },
            selectItem (args) {
                if (this.faqiState !== 0 || args.params.item.State !== '1' || args.params.rule.State !== '1') {
                    return
                }
                let newCurrSelectItemStr = ''
                args.event.isItem = true

                this.currentRuleType = args.params.ruleType
                this.current = args.params.item
                this.currentSelection = args.params.item.Selection
                newCurrSelectItemStr = this.currentRuleType + this.currentSelection
                if (this.currSelectItemStr === newCurrSelectItemStr) {
                    this.current = null
                    this.currSelectItemStr = null
                    this.selectedNum = 0
                    return false
                } else {
                    this.currSelectItemStr = newCurrSelectItemStr
                }
            },
            selectMoney ({addMoney}) {
                if (this.faqiState !== 0) {
                    return
                }
                if (addMoney !== -1) {
                    if (this.current && (+this.current.MaxStakeLimit === +this.watchCurrent)) {
                        if (addMoney + this.selectedNum >= (this.watchCurrent - 0)) {
                            parseInt(this.watchCurrent) === 0 ? this.selectedNum = 0 : this.selectedNum = (this.watchCurrent - 0)
                            this.flashMsg = '已达最大投注额'
                            this.flashTips()
                        } else {
                            this.selectedNum = this.selectedNum + addMoney
                        }
                    } else if (+this.current.MaxStakeLimit !== +this.watchCurrent) {
                        if (addMoney + this.selectedNum >= (this.watchCurrent - 0)) {
                            parseInt(this.watchCurrent) === 0 ? this.selectedNum = 0 : this.selectedNum = (this.watchCurrent - 0)
                            this.flashMsg = '您的可用余额不足'
                            this.flashTips()
                            setTimeout(() => {
                                this.$store.dispatch('showToast', {
                                    message: '您的可用余额不足'
                                })
                            }, 300)
                            stopHtml()
                            _hmt.push(['_trackEvent', '500fkcqH5_充值点击', 'click', '500fkcqH5_充值'])
                        } else {
                            this.selectedNum = this.selectedNum + addMoney
                        }
                    }
                } else {
                    parseInt(this.watchCurrent) === 0 ? this.selectedNum = 0 : this.selectedNum = (this.watchCurrent - 0)
                }
            },
            faqi () {
                if (!this.hasLogin) {
                    this.$store.dispatch('doAuth');
                    return false
                }
                if (!this.selectedNum) {
                    this.$store.dispatch('showToast', '投注金币数不能为空！')
                    return
                }
                if (parseInt(this.selectedNum) > parseInt(this.allMoney)) {
                    this.flashMsg = '余额不足'
                    this.flashTips()
                    this.$store.dispatch('showToast', {
                        message: '余额不足',
                        cb: () => {
                            stopHtml()
                            console.log('show charge')
//                            setTimeout(() => {
//                                this.$store.commit('showChargebox', true)
//                            }, 10)
                            _hmt.push(['_trackEvent', '500fkcqH5_充值点击', 'click', '500fkcqH5_充值'])

//                            this.$router.push(`/my/charge`)
                        }
                    })
                    return
                }
                let params = {}
                let currentRule = null
                for (let key in this.fmdetail.odds) {
                    if (Array.isArray(this.fmdetail.odds[key]) || Object.prototype.toString.call(this.fmdetail.odds[key]) === '[object Array]') {
                        this.fmdetail.odds[key].forEach(odd => {
                            if (odd && odd.RuleType === this.currentRuleType) {
                                currentRule = odd
                                return true
                            }
                        })
                    } else if (key === '350') {
                        for (let key2 in this.fmdetail.odds[key]) {
                            if (this.fmdetail.odds[key][key2].RuleType === this.currentRuleType) {
                                currentRule = this.fmdetail.odds[key][key2]
                            }
                        }
                    } else {
                        if (this.fmdetail.odds[key].RuleType === this.currentRuleType) {
                            currentRule = this.fmdetail.odds[key]
                            break
                        }
                    }
                }
                if (!currentRule) return

                params.matchid = this.$route.params.matchid
                params.matchid_me = this.fmdetail.matchid
                params.golds = parseInt(this.selectedNum)
                params.period = this.current.Issue
                params.verify = currentRule.VerifyResult
                params.ruletype = this.currentRuleType
                params.selection = this.current.Selection
                params.odds = this.current.BackOdds
                params.v1 = this.current.V1
                params.v2 = this.current.V2
                params.v3 = this.current.V3
//                console.log('点击确认参数');

                this.$store.dispatch(aTypes.faqiOrder, params)
            },
            clean () {
                //  清楚选中的金币
                if (this.faqiState !== 0) return
                this.flashMsg = ''
                this.selectedNum = 0
            },
            clickPanel (args) {
                if (!args.event.isItem) {
                    this.current = null
                    this.currentRuleType = null
                    this.currSelectItemStr = null
                    this.selectedNum = 0
                }
            },
            imgOnErrorLogo (that) {
                that.target.setAttribute('src', 'http://odds.500.com/static/soccerdata/images/TeamPic/teamsignnew_1213.png')
            },
            matchTimeFormat (time, format = 'MM-dd HH:mm') {
                let t = new Date(+time * 1000)
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear())
                    case 'MM':
                        return tf(t.getMonth() + 1)
                    case 'mm':
                        return tf(t.getMinutes())
                    case 'dd':
                        return tf(t.getDate())
                    case 'HH':
                        return tf(t.getHours())
                    case 'ss':
                        return tf(t.getSeconds())
                    }
                })
            }
        },
        computed: {
            ck () {
                return this.$store.state.ck
            },
            nationGetRed () {
                let times = null
                let tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                }
                if (this.$store.state.main.nationGetRed) {
                    if (this.$store.state.main.nationGetRed.next_time === '-2') {
                        return '活动已结束'
                    }

                    if (this.$store.state.main.nationGetRed.next_time === '-1') {
                        if (this.$store.state.main.nationGetRed.begintime) {
                            return this.matchTimeFormat(this.$store.state.main.nationGetRed.begintime, 'HH:mm')
                        }
                    }
                    if (parseInt(this.$store.state.main.nationGetRed.next_time) > 0 && this.$store.state.main.nationGetRed.run_flag === '1') {
                        let codeTime = parseInt(this.$store.state.main.nationGetRed.next_time)
                        this.showSelTime = true
                        times = setInterval(() => {
                            codeTime = codeTime - 1
                            if (codeTime === 0) {
                                this.SelTimeNow = '抢红包'
                                clearInterval(times)
                            } else {
                                if (codeTime % 60 >= 0) {
                                    this.SelTimeNow = tf(parseInt(codeTime / 60)) + ':' + tf(codeTime - ((parseInt(codeTime / 60)) * 60))
                                } else {
                                    this.SelTimeNow = '00 :' + codeTime
                                }
                            }
                        }, 1000)
                    }

                    if (parseInt(this.$store.state.main.nationGetRed.next_time) >= 0) {
                        return '抢红包'
                    }
                }
                return ''
            },
            showAwardbox () {
                return this.$store.state.awardAllData.showAwardbox
            },
            showBetListbox () {
                return this.$store.state.guessAllData.showBetListbox
            },
            showEventCountbox () {
                return this.$store.state.eventCountAllData.showEventCountbox
            },
            MatchOnTime () {
                return this.fmdetail && this.fmdetail.MatchOnTime
            },
            hasLogin () {
                return !!this.$store.state.ck
            },
            allEnd () {
                let result = true   //  判比赛是否结束
                if (this.$store.state.main.fmdetail) {
                    for (let key in this.$store.state.main.fmdetail.odds) {
                        if (Array.isArray(this.$store.state.main.fmdetail.odds[key]) || Object.prototype.toString.call(this.$store.state.main.fmdetail.odds[key]) === '[object Array]') {
                            this.$store.state.main.fmdetail.odds[key].forEach(odd => {
                                if (odd.State === '1') {
                                    result = false
                                    return true
                                }
                            })
                        } else {
                            if (this.$store.state.main.fmdetail.odds[key].State === '1') {
                                result = false
                                break
                            }
                        }
                    }
                }
                return result
            },
            allMoney () {
//                用户所有金币
                return this.userinfo && this.userinfo.gold_total
            },
            fmdetail () {
                return this.$store.state.main.fmdetail
            },
            stat () {
//                赔率的状态变化  更新赔率用的
                return this.$store.state.main.stateChange
            },
            faqiState () {
//                订单状态
                return this.$store.state.main.faqiState
            },
            cp_login_state () {
                return this.$store.state.cp_login_state
            },
            bannerData () {
                return this.$store.state.main.bannerData
            },
            playnum () {
                return this.$store.state.main.playnum
            },
            userinfo () {
                return this.$store.state.userInfo
            },
            tips () {
                if (!this.current) return
                let money = this.selectedNum
                if (money > (+this.watchCurrent)) {
                    money = this.watchCurrent
                }
                let backOddMoney = this.format2(this.current.BackOdds * money)
                if (money === 0) {
                    return '请选择投注金额'
                } else {
                    return `<em class="emColor">${this.format2(money)}</em>&nbsp;&nbsp;可中${backOddMoney}&nbsp;&nbsp;`
                }
            },
            watchCurrent () {
                if (this.hasLogin && this.current) {
                    return (this.current.MaxStakeLimit - 0) < (this.allMoney - 0) ? this.current.MaxStakeLimit : this.allMoney
                }
                return this.current && this.current.MaxStakeLimit
            },
            socketData () {
                return this.$store.state.socket.data
            },
            caseType () {
                return this.cState && this.cState.case && this.cState.case.caseType
            }

        },
        mounted () {
            $('body').scrollTop(0);
            setTimeout(() => {
                this.that_new_Children = this.$children
            }, 100);
            let routeMatchid = this.$route.params.matchid

            this.matchid = routeMatchid
            this.$store.commit(mTypes.setCurrentMatchID_my, routeMatchid)
            this.$store.dispatch(aTypes.getHomeInfo, routeMatchid)
            this.$store.dispatch(aTypes.getFootballMatchDetail, routeMatchid)
            this.$store.dispatch('subscribe', {
                ptype: 'detail',
                body: routeMatchid
            })
        },
        beforeRouteLeave (to, from, next) {
            this.$store.dispatch('unsubscribe', {
                ptype: 'detail',
                body: this.matchid
            })
            this.$store.commit(mTypes.setFmdetail, null)
            next()
        }
    }
</script>

