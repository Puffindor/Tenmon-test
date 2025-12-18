import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [{ path: '/', component: HomeView }];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
