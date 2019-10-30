import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Header from '@/components/Header'
import SearchHeader from '@/components/SearchHeader'
import MultipleSiteCollHeader from '@/components/MultipleSiteCollHeader'
import GtasksMain from '@/components/GtasksMain'
import SearchResult from '@/components/SearchResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: Login,
      component: Login
    },
    {
      path: '/home',
      component: home,
      children: [
                  {
                    path: 'main/:cookie',
                    component: Main
                  },
                  {
                      path: 'head/:index/:taskName/:cookie',
                      component: Header,
                      children: [{
                                    path: 'GtasksMain',
                                    name: 'GtasksMain',
                                    component: GtasksMain
                                  }
                                 ],
                    props: true
                  },
                  {
                    path: 'search',
                    component: SearchHeader
                    // children :[
                    //   {
                    //     path: 'SearchResult',
                    //     component: SearchResult
                    //   }
                    // ]
                  },
                  {
                    path: 'multiple',
                    component: MultipleSiteCollHeader,
                  }
                 ]
    },
    {
      path: '/SearchResult',
      component: SearchResult
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/Login' }
    }
  ]
})
