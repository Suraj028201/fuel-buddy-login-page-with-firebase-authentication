import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import DashboardPage from '../components/DashboardPage.vue'
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const storedEmail = localStorage.getItem('email');

  if (requiresAuth) {
    try {
      const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user); // User is authenticated, resolve with the user
          } else {
            reject(new Error('User not authenticated')); // User is not authenticated, reject with an error
          }
        });
      });

      if (user) {
        next();
      }
    } catch (error) {
      console.log('User not authenticated:', error);
      next({ name: 'Login' }); // User is not authenticated, redirect to the login page
    }
  } else {
    next(); // No authentication required, allow navigation
  }
});


export default router;
