import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('../views/Explore.vue'),
  },
  {
    path: '/tweet/:id',
    name: 'Tweet',
    component: () => import('../views/Tweet.vue'),
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
