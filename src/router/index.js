import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import GameScreen from '../components/GameScreen.vue'
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Index',
      component: Index
    },

    {
      path: '/play',
      name: 'GameScreen',
      component: GameScreen,
      props: true,
      beforeEnter: (to, from, next) => {
        if(to.params.name) next()
        else next({ name: 'Index' })
      }
    },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
