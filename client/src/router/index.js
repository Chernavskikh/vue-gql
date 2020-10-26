import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

import AddPost from '@/components/Posts/AddPost';
import Posts from '@/components/Posts/Posts';

import Profile from '@/components/Auth/Profile';
import SignIn from '@/components/Auth/SignIn';
import SignUp from '@/components/Auth/SignUp';

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/add',
      name: 'AddPost',
      component: AddPost
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
