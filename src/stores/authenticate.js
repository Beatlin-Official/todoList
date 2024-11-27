import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth',()=>{
    const isAuthenticated = ref(false)
    const welcomeMessage = ref(null)
    const welcome = computed(() => {
        if(isAuthenticated.value){
            return welcomeMessage.value = `Welcome back ${username.value}`
        } 
        return welcomeMessage.value = 'Hi! New Pokémon Trainer'
    })
    const loggedIn = () => {
        isAuthenticated.value = true
    }
    const islogout = () => {
        isAuthenticated.value = false
    }

    return{
        isAuthenticated,
        loggedIn,
        islogout,
        welcome
    }
})