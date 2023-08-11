import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import LogoutView from "@/views/LogoutView.vue";
import HydroView from "@/views/HydroView.vue";
import settingsView from "@/views/SettingsView.vue";
import PageNotFound from '@/views/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'loginView',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logoutView',
      component: LogoutView
    },
    {
      path: '/',
      name: 'hydroView',
      component: HydroView
    },
    {
      path: '/settings',
      name: 'settingsView',
      component: settingsView
    },
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound
    }
  ]
})

export default router
