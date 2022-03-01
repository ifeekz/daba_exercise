import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/Auth/SignUp'
import LogIn from '@/components/Auth/LogIn'
import Profile from '@/components/User/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LogIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/user/:id',
      name: 'UserDetails',
      component: Profile,
      props: true
    }
  ]
})
