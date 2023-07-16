import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../firebase/firebase";
import { reactive } from 'vue';

export const useStore = defineStore('authStore', () => {

    const state = reactive({
        email: '',
        user: null,
    });

    const initialData = () => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                state.user = user;
            } else {
                state.user = null;
            }
        })
    }

    const registerUser = (email, password, name) => {
        console.log('Name: ', name);
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password).then((userRegistration) => {
                const user = userRegistration.user;
                updateProfile(user, {
                    displayName: name
                })
                user.displayName = name;
                state.user = user;
                localStorage.setItem('email', state.user.email);
                localStorage.setItem('name', state.user.displayName);
                resolve(user);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    const loginUser = (email, password) => {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password).then((userCredentials)=>{
                const user = userCredentials.user;
                console.log(user);
                state.user = user;
                localStorage.setItem('email', state.user.email);
                localStorage.setItem('name', state.user.displayName);
                resolve(user);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    const logoutUser = () => {
        signOut(auth).then(() => {
            console.log('User Logged Out');
            state.user = null;
        }).catch((error) => {
            console.log('Error in logging out: ', error);
        })
    }

    return {
        state,
        initialData,
        loginUser,
        registerUser,
        logoutUser,
    }
})