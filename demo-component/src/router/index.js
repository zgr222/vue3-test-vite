import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes'

// https://next.router.vuejs.org/guide/migration/  从vue2迁移
export default createRouter({
  history: createWebHistory(),
  routes
})