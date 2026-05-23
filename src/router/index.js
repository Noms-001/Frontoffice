import { createRouter, createWebHistory } from 'vue-router'

import SearchPage from '../views/SearchPage.vue'
import FicheDemande from '../views/FicheDemande.vue'
import ListeDemandes from '../views/ListeDemandes.vue'

const routes = [
  {
    path: '/',
    name: 'search',
    component: SearchPage
  },
  {
    path: '/demande/:numeroDemande',
    name: 'ficheDemande',
    component: FicheDemande
  },
  {
    path: '/passeport/:numeroPasseport',
    name: 'listeDemandes',
    component: ListeDemandes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router