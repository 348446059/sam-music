<template>
<scroll class="listview"
        :data="data"
        ref="listview"
        :probe-type="probeType"
        :listenScroll="listenScroll"
        @scroll="scroll">
  <ul>
    <li v-for="group in data" class="list-group" ref="listGroup">
      <h2 class="list-group-title">{{group.title}}</h2>
      <ul>
        <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
          <img class="avatar" v-lazy="item.avatar"/>
          <span class="name">{{item.name}}</span>
        </li>
      </ul>
    </li>
  </ul>
  <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
    <ul>
      <li  v-for="(item,index) in shortcutList"
          class="item"
          :data-index="index"
          :class="{'current':currentIndex === index}">{{item}}</li>
    </ul>
  </div>
  <div class="list-fixed" v-show="fixdTitle" ref="fixed">
    <h1 class="fixed-title">{{fixdTitle}}</h1>
  </div>
  <div class="loading-wrapper" v-show="!data">
    <loading></loading>
  </div>
</scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getData} from 'common/js/dom'
  const ANCHOR_HEIGHT = 18
   export default {
     props:{
          data:{
              type:Array,
              default:null
          }

      },
     data(){
       return {
         scrollY: -1,
         currentIndex: 0,
         diff: -1
       }
     },
     created(){
       this.probeType = 3
       this.touch = {}
       this.listenScroll = true
       this.listHeight = []
     },
     components:{
       Scroll,
       Loading
     },
     methods:{
         refresh(){
        this.$refs.listview.refresh()
         },
       onShortcutTouchStart(e){
            this.currentIndex +=2
           let anchorIndex = getData(e.target,'index');
           let firstTouch = e.touches[0]
           this.touch.y1 = firstTouch.pageY
           this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
       },
       onShortcutTouchMove(e){
        let firstTouch = e.touches[0]
         this.touch.y2 = firstTouch.pageY
         let  delta = (this.touch.y2 - this.touch.y1)/ANCHOR_HEIGHT | 0 //向下取整
         let anchorIndex = parseInt(this.touch.anchorIndex) + delta
         this._scrollTo(anchorIndex)
       },
       scroll(pos){
        this.scrollY = pos.y
       },
       _scrollTo(index){
           if (!index && index !== 0){
               return
           }
           if (index < 0){
               index = 0
           }else if (index > this.listHeight.length - 2){
               index = this.listHeight.length - 2
           }
           this.scrollY = -this.listHeight[index]

         this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
       },
       _calculateHeight(){
        this.listHeight = []
         const list = this.$refs.listGroup

        let height = 0
         this.listHeight.push(height)
         for (let i=0;i<list.length;i++){
            let item = list[i]
           height += item.clientWidth
           this.listHeight.push(height)
         }
       },
       selectItem(item){
           console.log(item)
           this.$emit('select',item);
       }

     },
     computed:{
         shortcutList(){
             return this.data.map((group)=>{
                 return group.title.substr(0,1)
             })
         },
       fixdTitle(){
             if (this.scrollY > 0){
                 return null
             }
            return this.data[this.currentIndex]?this.data[this.currentIndex].title:"热门"
       }
     },
     watch:{
       data(){
         setTimeout(()=> {
           this._calculateHeight()
         },20)
       },
       scrollY(newY){
           const listHeight = this.listHeight
         //当滚动到顶部 newY > 0
         if (newY >0){
               this.currentIndex = 0
           return
         }
         //中间部分滚动
           for (let i=0;i<listHeight.length - 1;i++){
             let h1 = listHeight[i]
             let h2 = listHeight[i+1]
             if  (-newY >= h1 && -newY < h2){
               this.currentIndex = i
               this.diff = h2 + newY
               return
             }
           }
           //当滚动到最底部，且-newY大于一个元素的上限

           this.currentIndex = listHeight.length - 2
         },
       diff(newVal){
        let fixedTop = (newVal > 0 && newVal < 30) ? newVal - 30 : 0
         if (this.fixedTop === fixedTop){
            return
         }
         this.fixedTop = fixedTop
         this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
       }
     }
   }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
  .listview
    position relative
    width 100%
    height 100%
    overflow hidden
    background $color-background
    .list-group
      padding-bottom 30px
      .list-group-title
         height 30px
         line-height 30px
         padding-left 20px
         font-size $font-size-small
         background $color-highlight-background
         color $color-text-l
      .list-group-item
         display flex
         align-items center
         padding 20px 0 0 30px
         .avatar
            width 50px
            height 50px
            border-radius 50%
         .name
            margin-left 20px
            color $color-text-l
            font-size $font-size-medium
    .list-shortcut
      position absolute
      z-index 30
      right 0
      top 50%
      transform translateY(-50%)
      width 20px
      padding 20px 0
      border-radius 10px
      text-align center
      background-color $color-background-d
      font-family Helvetica
      .item
        padding 3px
        line-height 1
        color $color-text-l
        font-size $font-size-small
        &.current
          color $color-theme

    .list-fixed
      position absolute
      top 0
      left 0
      width 100%
      .fixed-title
       height 30px
       line-height 30px
       padding-left 20px
       font-size $font-size-small
       color $color-text-l
       background $color-highlight-background

    .loading-wrapper
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
