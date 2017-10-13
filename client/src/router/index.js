import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import CreatePoll from '@/components/CreatePoll'
import ListPolls from '@/components/ListPolls'
import ViewPoll from '@/components/ViewPoll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/polls',
      component: ListPolls
    },
    {
      path: '/poll/create',
      component: CreatePoll
    },
    {
      path: '/poll/:pollId',
      component: ViewPoll
    },
    {
      path: '/poll/edit/:pollId',
      component: CreatePoll
    },
    {
      path: '/logout',
      component: ListPolls
    }
  ]
})
