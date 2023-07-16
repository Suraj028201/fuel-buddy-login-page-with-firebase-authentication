<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from './store/auth';
import router from './router';

export default {
  name: "App",
  router,

  setup() {
    onMounted(async () => {
      const store = useStore();
      store.initialData();
    });
  }

};
</script>

<style>
/* Your styles here */
</style>
