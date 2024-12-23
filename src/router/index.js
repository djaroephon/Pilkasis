import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import VoteView from '../views/VoteView.vue';
import AddCandidate from '../views/AddCandidate.vue'
import Results from '../views/Results.vue'
import Register from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'login' },  // Redirect langsung ke login
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      props: route => ({ role: route.query.role }),  // Mengambil 'role' dari query parameter
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
    }, 
    {
      path: '/admin/candidates/add',
      name: 'add-candidate',
      component: AddCandidate
    },
    {
      path: '/admin/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin/results',
      name: 'results',
      component: Results
    },
    {
      path: '/vote',
      name: 'vote',
      component: VoteView,
    },
  ],
});

export default router;
