<template>
    <div class="header_pop">
        <span class="btn btn-back"  v-tap="{methods:goback}"></span>
        <h1>{{ this.personTitle }}</h1>
    </div>
</template>

<script>
    export default {
        props: ['personTitle'],
        data () {
            return {
                title: ''
            }
        },
        methods: {
            goback () {
                if (this.personTitle === '商城') {
                    this.$router.push('/h5/home')
                } else {
                    window.history.back()
                }
            }
        }
    }
</script>
