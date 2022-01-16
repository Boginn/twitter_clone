import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // Navigation
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
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/Explore.vue'),
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/Explore.vue'),
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    component: () => import('../views/Explore.vue'),
  },
  {
    path: '/lists',
    name: 'Lists',
    component: () => import('../views/Explore.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Explore.vue'),
  },
  {
    path: '/more',
    name: 'More',
    component: () => import('../views/Explore.vue'),
  },

  // Other
  {
    path: '/tweet/:id',
    name: 'Tweet',
    component: () => import('../views/Tweet.vue'),
  },
  {
    path: '/:handle',
    name: '',
    component: () => import('../views/Subject.vue'),
  },
  {
    path: '/:handle/:following',
    name: '',
    component: () => import('../views/Follows.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
