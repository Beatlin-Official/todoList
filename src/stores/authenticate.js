import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth',()=>{
    const isAuthenticated = ref(false)
    const storageName = ref(null)
    const router = useRouter();
    const checkToken = () => {
        const token = localStorage.getItem('login')
        if(token){
            isAuthenticated.value = true
        }
    }
    const loggedIn = () => {
        isAuthenticated.value = true
        storageName.value = localStorage.getItem('name')
    }
    const islogout = () => {
        isAuthenticated.value = false;
        localStorage.removeItem("login");
        localStorage.removeItem("name");
        router.push({ name: "Login" });
    }

    return{
        isAuthenticated,
        loggedIn,
        islogout,
        storageName
    }
})