import Vue from 'vue'
import Router from 'vue-router'
import VueLazyLoad from 'vue-lazyload'

Vue.use(Router)
Vue.use(VueLazyLoad,{
  loading:require('common/image/default.png')
})

const Recommand = (resolve) => {
  import('components/recommand/recommand.vue').then((recommend) => {
    resolve(recommend)
  })
}


const Singer = (resolve) =>{
  import('components/singer/singer.vue').then((singer)=>{
    resolve(singer)
  })
}

const Rank = (resolve) => {
  import('components/rank/rank.vue').then((rank)=>{
    resolve(rank)
  })
}

const Search = (resolve) => {
  import('components/search/search.vue').then((search)=>{
    resolve(search)
  })
}

const SingerDetail = (resolve) =>{
  import('components/singer-detail/singer-detail').then((detail)=>{
    resolve(detail)
  })
}

const Disc = (resolve) =>{
  import('components/disc/disc').then((disc)=>{
    resolve(disc)
  })
}

const TopList = (resolve) =>{
  import('components/top-list/top-list').then((toplist)=>{
    resolve(toplist)
  })
}

const UserCenter = (resolve) =>{
  import('components/user-center/user-center').then((center)=>{
    resolve(center)
  })
}
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      component: Recommand,
      children:[
        {
          path:`:id`,
          component:Disc
        }
      ]
    },
    {
      path: '/singer',
      component:Singer,
      children:[
        {
          path:':id',
          component:SingerDetail
        }
      ]
    },
    {
      path:'/search',
      component:Search,
      children:[
        {
          path:':id',
          component:SingerDetail
        }
      ]
    },
    {
      path:'/rank',
      component:Rank,
      children:[
        {
          path:':id',
          component:TopList
        }
      ]
    },
    {
      path:'/user',
      component:UserCenter
    }
  ]
})
