<template>
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{msg}} your account</h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form @submit.prevent="login" class="space-y-6">
      <div v-if="buttonContent === 'Signup'">
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Enter Name</label>
        <div class="mt-2">
          <input v-model="name" placeholder="Eneter Your Name" id="name" name="name" type="name" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input v-model="email" placeholder="Eneter Your Email ID" id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input v-model="password" placeholder="Password(at least 6 characters)" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
      <div>
        <button class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{buttonContent}}</button>
      </div>
      <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <button v-on:click="registerPage" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">{{ anchorTag }} Here</button>
      </p>
      <WarningComponent :warningMsg="warningMsg" :showWarning="showWarning" />
    </form>
  </div>
</div>
</template>
  
<script>
import { useStore } from '../store/auth';
import { useRouter } from 'vue-router';
import WarningComponent from './WarningComponent.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      msg: 'Sign In to',
      buttonContent: 'Login',
      anchorTag: 'Signup',
      router: null,
      showWarning: false,
      warningMsg: '',
    };
  },
  components: {
    WarningComponent
  },
  created() {
  this.router = useRouter(); 
  },
  methods: {
   login() {
      this.showWarning = false;
      const { email, password, name } = this;
      const store = useStore();
      if(this.buttonContent === 'Login'){
        store.loginUser(email, password).then((user) => {
          const router = this.router;
          router.push('/dashboard');
        }).catch((error) => {
          this.showWarning = true;
          if(error == 'FirebaseError: Firebase: Error (auth/user-not-found).'){
            this.warningMsg = 'Please regiser first';
          } else if(error == 'FirebaseError: Firebase: Error (auth/wrong-password).'){
            this.warningMsg = 'Please enter correct password';
          }
        })
      } else {
        store.registerUser(email, password, name).then((user) => {
          const router = this.router;
          router.push('/dashboard');
        }).catch((error) => {
          this.showWarning = true;
          if(error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).'){
            this.warningMsg = 'already registered, please login';
          }
        })
      }
    },

    registerPage(){
      this.showWarning = false;
      if(this.buttonContent === 'Login'){
      this.msg = 'Register';
      this.buttonContent = 'Signup';
      this.anchorTag = 'Login';
      } else {
      this.msg = 'Sign In to';
      this.buttonContent = 'Login';
      this.anchorTag = 'Signup';
      }
    },
  },
};
</script>

<style>
</style>
  