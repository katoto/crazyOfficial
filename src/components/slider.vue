  <template>
    <div class='slider-container' :class = 'basicdata.containerClass'>
        <!--@touchmove="swipeMove"-->
        <!--@touchstart="swipeStart"-->
        <!--@touchend="swipeEnd"-->
      <div class="slider-wrapper"
      :style="styleobj"

          @mousedown="swipeStart"
          @mouseup="swipeEnd"
          @mousemove="swipeMove"
          @webkitTransitionEnd = "onTransitionEnd"
          @transitionend = "onTransitionEnd"
      >
      <!-- 正常滚动 -->
       <template  v-if="!sliderinit.loop">
           <slot>
           </slot>
       </template>
      </div>
    </div>
  </template>
<script>
import detectPrefixes from '../common/detect-prefixes.js'
// current要处理
export default {
    props: ['sliderinit', 'pages'],
    data () {
        return {
            current: undefined,
            basicdata: {
                poswidth: '0',
                posheight: '0',
                start: {},
                end: {},
                tracking: false,
                animation: false,
                isMove: false,
                containerClass: {
                    'swiper-container-vertical': false
                },
                setIntervalid: '',
                prefixes: detectPrefixes(),
                transitionEnding: false
            }
        }
    },
    computed: {
            // 动画执行obj
        styleobj: function () {
            let style = {}
            style['transform'] = 'translate3D(' + this.basicdata.poswidth + ',' + this.basicdata.posheight + ',0)'
            style[this.basicdata.prefixes.transition + 'TimingFunction'] = 'ease'
            style[this.basicdata.prefixes.transition + 'Duration'] = (this.basicdata.animation ? this.sliderinit.slideSpeed || 300 : 0) + 'ms'
            return style
        },
          // pagenum滑动数
        pagenums: function () {
            return this.pages.length
        },
        // 组件的核心，计算当前父级需要进行的偏移,每次要遍历节点
        currentWidth: {
            get: function () {
                let $slider
                let lastPage = this.sliderinit.currentPage
                if (this.sliderinit.loop) {
                    if (this.sliderinit.infinite) {
                        lastPage = this.sliderinit.currentPage + (this.sliderinit.infinite <= this.pages.length ? this.sliderinit.infinite : this.pages.length)
                    } else {
                        lastPage = this.sliderinit.currentPage + 1
                    }
                }
            // 获取slideritem子集
                for (let item in this.$el.children) {
                    if (/slider-wrapper/ig.test(this.$el.children[item].className)) {
                        $slider = this.$el.children[item]
                    }
                }
             // 遍历子集
                let $sliderChildren = $slider.children
                let offsetLeft = 0
                if ($sliderChildren[lastPage]) {
                    offsetLeft = $sliderChildren[lastPage].offsetLeft
                    if (this.sliderinit.loop) {
                        offsetLeft = $sliderChildren[lastPage].offsetLeft
                    }
                }
                return offsetLeft
            },
            set: function (value) {
                return value
            }
        },
        currentHeight: function () {
            let posheight = 0
            let $slider
            let lastPage = this.sliderinit.currentPage - 1
            if (this.sliderinit.loop) {
                if (this.sliderinit.infinite) {
                    lastPage = this.sliderinit.currentPage + (this.sliderinit.infinite <= this.pages.length ? this.sliderinit.infinite : this.pages.length) - 1
                } else {
                    lastPage = this.sliderinit.currentPage + 1
                }
            }
          // 获取slideritem子集
            for (let item in this.$el.children) {
                if (/slider-wrapper/ig.test(this.$el.children[item].className)) {
                    $slider = this.$el.children[item]
                }
            }
           // 遍历子集
            let $sliderChildren = $slider.children
            for (let item in $sliderChildren) {
                if (item <= lastPage) {
              // 找到实际宽度clientWidth+外边距
                    posheight += $sliderChildren[item].offsetHeight
                    posheight += parseInt($sliderChildren[item].style.marginTop || 0)
                    posheight += parseInt($sliderChildren[item].style.marginBottom || 0)
                }
            }
            return posheight
        }
    },
    mounted () {
        let that = this
      // 起始跳到指定页 无样式
        that.slide(this.sliderinit.currentPage, 'animationnone')
        // 定制事件
        that.$on('slideTo', (num) => {
            this.slide(num)
        })
        that.$on('slideNext', () => {
            this.next()
        })
        that.$on('slidePre', () => {
            this.pre()
        })

      // 自动轮播 支持无缝滚动
        that.clock().begin(that)
    },
    filters: {
        format: (num) => {
            num = Number(num)
            if (num < 10000) {
                return num
            } else if (num < 100000000) {
                return Math.round(num / 10000 * 100) / 100 + '万'
            } else {
                return Math.round(num / 100000000 * 100) / 100 + '亿'
            }
        }
    },
    methods: {
        selectMoney (params) {
            if (this.sliderinit.allEnd) {
//            结束的情况下不给点击
                return
            }
            console.log(params.addMoney + '12321321')
        },
        swipeStart (e) {
            this.isMove = false
            let that = this
            if (this.basicdata.transitionEnding) {
                return
            }
            this.basicdata.animation = false
    // 暂停自动滚动
            if (this.sliderinit.autoplay) {
                let that = this
                this.clock().stop(that)
            }
    // 阻止页面滚动
            document.addEventListener('touchmove', that.preventDefault(e))
            if (e.type === 'touchstart') {
                if (e.touches.length > 1) {
                    this.basicdata.tracking = false
                } else {
                    this.basicdata.tracking = true
                    this.basicdata.start.t = new Date().getTime()
                    this.basicdata.start.x = e.targetTouches[0].clientX
                    this.basicdata.start.y = e.targetTouches[0].clientY
                    this.basicdata.end.x = e.targetTouches[0].clientX
                    this.basicdata.end.y = e.targetTouches[0].clientY
                }
            } else {
                this.basicdata.tracking = true
                this.basicdata.start.t = new Date().getTime()
                this.basicdata.start.x = e.clientX
                this.basicdata.start.y = e.clientY
                this.basicdata.end.x = e.clientX
                this.basicdata.end.y = e.clientY
            }
        },
        swipeMove (e) {
            if (this.basicdata.tracking) {
                if (e.type === 'touchmove') {
                    this.isMove = true
                    e.preventDefault()
                    this.basicdata.end.x = e.targetTouches[0].clientX
                    this.basicdata.end.y = e.targetTouches[0].clientY
                } else {
                    e.preventDefault()
                    this.basicdata.end.x = e.clientX
                    this.basicdata.end.y = e.clientY
                }
                if (this.sliderinit.direction === 'vertical') {
                    this.basicdata.posheight = -(this.currentHeight) + this.basicdata.end.y - this.basicdata.start.y + 'px'
                    return
                }
                this.basicdata.poswidth = -(this.currentWidth) + this.basicdata.end.x - this.basicdata.start.x + 'px'
            }
        },
        swipeEnd (e) {
            this.basicdata.tracking = false
            let now = new Date().getTime()
            let deltaTime = now - this.basicdata.start.t
            let deltaX = this.basicdata.end.x - this.basicdata.start.x
            let deltaY = this.basicdata.end.y - this.basicdata.start.y
    //            认为是点击事件  isMOve 要改成距离才行
            if (Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15 && parseInt(deltaTime) < 150) {
                let paramsStr = '',
                    params = null,
                    targetEle = e.target
                if (!targetEle.getAttribute('data-click_fn')) {
                    while (targetEle.parentNode) {
                        if (targetEle.parentNode.getAttribute) {  // 根元素无getAttribute
                            if (!targetEle.parentNode.getAttribute('data-click_fn')) { targetEle = targetEle.parentNode; continue }
                            paramsStr = targetEle.parentNode.getAttribute('data-click_fn')
                            break
                        }
                        break
                    }
                } else {
                    paramsStr = e.target.getAttribute('data-click_fn')
                }
                if (paramsStr) {
    //              传入非格式化的json 处理单引号
                    if (paramsStr.indexOf('\'')) {
                        paramsStr = paramsStr.replace(/'/g, '"')
                    }
                    params = JSON.parse(paramsStr)
                    if (params.methods) {
    //                  将对象传入
                        this[params.methods](params)
                    } else {
                        console.log('data-click_fn 要传methods')
                    }
                } else {
                    console.log('data-click_fn 没找到')
                }
            }
    //          复位
            this.isMove = false
        // 自动滚动重启
            if (this.sliderinit.autoplay) {
                let that = this
                setTimeout(function () {
                    that.clock().begin(that)
                }, this.sliderinit.autoplay)
            }
        // 解除阻止
            document.removeEventListener('touchmove', this.preventDefault(e))
            if (deltaTime > this.sliderinit.thresholdTime) {
                this.slide(this.sliderinit.currentPage)
            } else if (this.sliderinit.direction !== 'vertical') {
                if ((deltaX > this.sliderinit.thresholdDistance) && (Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
                    this.pre()
                } else if ((-deltaX > this.sliderinit.thresholdDistance) && (Math.abs(deltaY) < this.sliderinit.thresholdDistance)) {
                    this.next()
                } else {
                    this.slide(this.sliderinit.currentPage)
                }
            // 垂直判定
            } else {
                if ((deltaY > this.sliderinit.thresholdDistance) && (Math.abs(deltaX) < this.sliderinit.thresholdDistance)) {
                // swipe right
                    this.pre()
                } else if ((-deltaY > this.sliderinit.thresholdDistance) && (Math.abs(deltaX) < this.sliderinit.thresholdDistance)) {
                // swipe left
                    this.next()
                } else {
                    this.slide(this.sliderinit.currentPage)
                }
            }
        },
        pre () {
            if (this.sliderinit.currentPage >= 1) {
                this.sliderinit.currentPage -= this.sliderinit.slidesToScroll || 1
                this.slide()
            } else if (this.sliderinit.loop && this.sliderinit.currentPage === 0) {
                this.sliderinit.currentPage -= this.sliderinit.slidesToScroll || 1
                this.basicdata.transitionEnding = true
                this.slide()
            } else {
                this.slide()
            }
        },
        next () {
            if (this.sliderinit.currentPage < this.pagenums - 1) {
                this.sliderinit.currentPage += this.sliderinit.slidesToScroll || 1
                this.slide()
            } else if (this.sliderinit.loop && this.sliderinit.currentPage === this.pagenums - 1) {
                this.sliderinit.currentPage += this.sliderinit.slidesToScroll || 1
                this.basicdata.transitionEnding = true
                this.slide()
            } else {
                this.slide()
            }
        },
        slide (pagenum, type) {
            let that = this
      // 执行动画
            that.basicdata.animation = true
      // 无样式滚动
            if (type === 'animationnone') {
                that.basicdata.animation = false
            }
            if (pagenum || pagenum === 0) {
                that.sliderinit.currentPage = pagenum
            }
      // 增加垂直滚动判定
            if (that.sliderinit.direction === 'vertical') {
                that.basicdata.posheight = -that.currentHeight + 'px'
            } else {
                that.basicdata.poswidth = -that.currentWidth + 'px'
            }
      // 广播事件
            if (that.sliderinit.currentPage < 0 || that.sliderinit.currentPage >= that.pagenums) {
                return
            }
            that.$emit('slide', that.sliderinit.currentPage, that.pagenums)
        },
        clock: function () {
      // 暂时这么写，写了自调用，但是vue不支持，欢迎小伙伴提供新的思路
            return {
                begin: function (that) {
                    if (that.sliderinit.autoplay) {
                        if (that.basicdata.setIntervalid) {
                            return
                        }
                        that.basicdata.setIntervalid = setInterval(function () {
                            that.next()
                            if (that.sliderinit.currentPage === that.pagenums - 1 && !that.sliderinit.loop) {
                                clearInterval(that.basicdata.setIntervalid)
                                that.basicdata.setIntervalid = 0
                            }
                        }, that.sliderinit.autoplay)
                    }
                },
                stop: function (that) {
                    clearInterval(that.basicdata.setIntervalid)
                    that.basicdata.setIntervalid = 0
                }
            }
        },
    // 阻止页面滚动
        preventDefault (e) {
            e.preventDefault()
        },
    // 无限循环中transitionEnd
        onTransitionEnd () {
            if (this.sliderinit.loop) {
                this.basicdata.transitionEnding = false
                if (this.sliderinit.currentPage < 0) {
                    this.slide(this.pagenums + this.sliderinit.currentPage, 'animationnone')
                } else if (this.sliderinit.currentPage >= this.pagenums) {
                    this.slide(0 + this.sliderinit.currentPage - this.pagenums, 'animationnone')
                }
            }
        }
    }
}
</script>
<style>
  .slider-container {
      overflow: hidden;
      position: relative;
      white-space: nowrap;
      z-index: 1;
  }
  .slider-wrapper {
      box-sizing: content-box;
      display: flex;
      height: 100%;
      position: relative;
      transition-property: transform;
      width: 100%;
      z-index: 1;
  }
  .slider-item {
      flex-shrink: 0;
      height: 100%;
      position: relative;
      width: 100%;
  }
</style>
