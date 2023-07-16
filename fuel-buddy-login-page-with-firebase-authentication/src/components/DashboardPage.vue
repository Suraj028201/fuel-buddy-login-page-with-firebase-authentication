<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">

<section style="font-family: Montserrat" class=" bg-[#071e34] flex font-medium items-center justify-center h-screen">

    <section class="w-96 h-74 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
        <div class="flex items-center justify-between">
            <span class="text-gray-400 text-sm"></span>
            <span class="text-emerald-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </span>
        </div>

        <div class="mt-8 ">
            <h2 class="text-white font-bold text-2xl tracking-wide">Name: {{getData.user.displayName}}</h2>
        </div>
        <div class="mt-8 ">
          <h2 class="text-white font-bold text-2xl tracking-wide">Email: {{getData.user.email}}</h2>
        </div>
        <p class="text-emerald-400 font-semibold mt-2.5" >
            Active
        </p>
        <button v-on:click="logoutUser" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Logout
        </button>
    </section>
</section>
      
</template>
  
  <script>
  import { useStore } from '../store/auth';
  import { useRouter } from 'vue-router';

  export default {
    data(){
      return {
        router: null,
      }
    },
    created() {
    this.router = useRouter(); 
    },
    computed: {
    getData() {
      const store = useStore();
      return store.state;
      },
    },
    methods:{
      logoutUser(){
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        const store = useStore();
        store.logoutUser();
        const router = this.router;
        router.push('/');
      }
    }
  };
  </script>
  
  <style>
  </style>
  