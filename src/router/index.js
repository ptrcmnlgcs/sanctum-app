// routes.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import HomePage from '../components/HomePage.vue'
import CreatePost from '../components/CreatePost.vue'
import ViewPost from '../components/ViewPost.vue'
import EditPost from '../components/EditPost.vue'

const routes = [
  { path: '/login', component: LoginPage, name: 'login' },
  { path: '/register', component: RegisterPage, name: 'register' },
  { path: '/create', component: CreatePost, name: 'create' },
  { path: '/view/:id', component: ViewPost, name: 'view' },
  { path: '/edit/:id', component: EditPost, name: 'edit' },
  {
    path: '/home', component: HomePage, name: 'home',
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      console.log('logout');
      localStorage.removeItem('token');
      next('/register');
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
