import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Game from '@/components/Game'
import CreateQuestion from '@/components/CreateQuestion'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/newtopic',
      name: 'NewQuestion',
      component: CreateQuestion
    }
  ]
})
