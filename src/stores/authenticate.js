import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth',()=>{
    const isAuthenticated = ref(false)
    const username = ref(null)
    const welcomeMessage = ref(null)
    const welcome = computed(() => {
        if(isAuthenticated.value){
            return welcomeMessage.value = `Welcome back ${username.value}`
        } 
        return welcomeMessage.value = 'Hi New Pokémon Trainer'
    })
    const login = () => {
        isAuthenticated.value = true
    }
    const logout = () => {
        isAuthenticated.value = false
    }

    return{
        isAuthenticated,
        login,
        logout,
        welcome
    }
})