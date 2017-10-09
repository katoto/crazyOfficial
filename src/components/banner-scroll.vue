<template>
    <div>
        <template>
            <slot>
            </slot>
        </template>
    </div>
</template>

<script>
    export default {
        methods: {
            hitListBroadcast () {
                let BroadcastSlide, slideBoxs, clonedNode, slideHeight, hitListIndex
                if (this.$el && this.$el.children[0] && this.$el.children[0].children[0] && this.$el.children[0].children[0].children) {
                    BroadcastSlide = this.$el.children[0].children[0]
                    slideBoxs = this.$el.children[0].children[0].children
                    slideHeight = this.$el.children[0].offsetHeight  //   4px 的border
                    hitListIndex = 0
                    clonedNode = slideBoxs[0].cloneNode(true)
                    BroadcastSlide.appendChild(clonedNode)
                    setInterval(function () {
                        hitListIndex++
                        if (hitListIndex > slideBoxs.length - 1) {
                            hitListIndex = 0
                            BroadcastSlide.style.transition = 'all 0s'
                            BroadcastSlide.style.webkitTransition = 'all 0s'
                            BroadcastSlide.style.transform = 'translateY(0px)'
                        } else {
                            BroadcastSlide.style.transition = 'all 1.2s'
                            BroadcastSlide.style.webkitTransition = 'all 1.2s'
                        }
                        BroadcastSlide.style.transform = 'translateY(-' + hitListIndex * slideHeight + 'px)'
                        BroadcastSlide.style.webkitTransform = 'translateY(-' + hitListIndex * slideHeight + 'px)'
                    }, 2500)
                } else {
                    return false
                }
            }
        },
        mounted () {
            setTimeout(() => {
                this.hitListBroadcast()
            }, 500)
        }
    }
</script>
