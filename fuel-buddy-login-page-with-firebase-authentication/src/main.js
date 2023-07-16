import { createApp } from 'vue'
import './assets/style.css';
import App from './App.vue'
import router from './router/index';
import { createPinia } from 'pinia';


const app = createApp(App);

router.beforeEach((to, from, next) => {
  const storedEmail = localStorage.getItem('email');

  if (storedEmail && to.path === '/') {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});


const pinia = createPinia();
app.use(router);
app.use(pinia);

app.mount('#app');
