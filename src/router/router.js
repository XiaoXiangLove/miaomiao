import Vue from 'vue'
import Router from 'vue-router'

import MovieRouter from '@/router/movie/index.js'
import CinemaRouter from '@/router/cinema/index.js'
import MineRouter from '@/router/mine/index.js'
import AdminRouter from '@/router/admin/index.js'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    MovieRouter,
    CinemaRouter,
    MineRouter,
    AdminRouter,
    {
      path:"/*",
      redirect:"/movie"
    }
  ]
})
