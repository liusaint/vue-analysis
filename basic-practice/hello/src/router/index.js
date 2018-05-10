import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SlotScope from '@/components/SlotScope'
import RenderWrap from '@/components/RenderWrap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/slot',
      name: 'slot',
      component: SlotScope
    },
    {
      path: '/render',
      name: 'render',
      component: RenderWrap
    }
  ]
})
