<template>
    <div class="listBox">
        <template  v-if="matchlist_hot && parseInt(matchlist_hot.length)>1" v-for="item in matchlist_hot">
            <matchListTemplate :matchStyle="'hot'" :matchData="item">
            </matchListTemplate>
        </template>
        <template v-if="!matchlist_hot || (matchlist_hot && matchlist_hot.length<=1) ">
            <div class="emptyBox respon2">
                <div class="empty respon2-itm" >
                    <div class="emptyIn">
                        <span class="icon icon_empty"></span>
                        <p>暂无热门赛事</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import MatchListTemplate from '~components/matchlist-template.vue'
    export default {
        data () {
            return {
                title: ''
            }
        },
        components: {
            MatchListTemplate
        },
        computed: {
            matchlist_hot () {
                return this.$store.state.home.matchList_hot
            }
        },
        mounted () {
            this.$store.commit('setIsHideHomeHead', false)
        }
    }
</script>
