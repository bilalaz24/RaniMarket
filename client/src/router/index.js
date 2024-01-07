import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Shop from '../views/Shop.vue'
import Search from '../views/Search.vue'
import Buy from '../views/Buy.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../views/Profile.vue'
import ViewProduct from '../views/ViewProduct.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { hideCart: true }
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/checkout',
    name: 'Buy',
    component: Buy,
    meta: { hideNavbar: true, requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { hideNavbar: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { hideNavbar: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { hideProfileMenu: true, requiresAuth: true }
  },
  {
    path: '/view-product/:id',
    name: 'ViewProduct',
    component: ViewProduct,
    props: true,
    meta: { hideProfileMenu: true, requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('user-token');

  if (requiresAuth && !isAuthenticated) {
    next('/signin');
  } else {
    next();
  }
});

export default router
