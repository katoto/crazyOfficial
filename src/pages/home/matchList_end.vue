<template>
    <div class="listBox" v-if="matchList_end">
        <template v-for="item in matchList_end" class="item" >
            <matchListTemplate  :matchData="item">
            </matchListTemplate>
        </template>
    </div>
    <div v-else class="loading">
        <img src="~static/images/loading.gif">
    </div>
</template>

<script>
import MatchListTemplate from '~components/matchlist-template.vue'
import {actionTypes} from '~store/home'
export default {
    data () {
        return {
            time: ''
        }
    },
    components: {
        MatchListTemplate
    },
    watch: {
        'hasLogin': () => {
            setTimeout(() => {
                this.$store.dispatch(actionTypes.getFootballMatchList_end)
            }, 20)
        }
    },
    computed: {
        matchList_end () {
            return this.$store.state.home.matchList_end
        },
        hasLogin () {
            return !!this.$store.state.ck
        }
    },
    mounted () {
//            end 换成
        this.$store.dispatch(actionTypes.getFootballMatchList_end);
        this.$store.dispatch(actionTypes.setIntervalFn, { type: 'end', time: 30000 })
    },
    beforeDestroy () {
        this.$store.dispatch(actionTypes.clearIntervalFn)
    }
}
</script>
