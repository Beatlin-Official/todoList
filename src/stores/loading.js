import { defineStore } from "pinia";
import{ ref } from 'vue';
export const useLoadingStore = defineStore('loading',()=>{
    const loading = ref(true)
    return{
        loading
    }
})