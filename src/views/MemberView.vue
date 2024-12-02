<script setup>
import { RouterView, useRouter } from "vue-router";
import { useLoadingStore } from "@/stores/loading";
import { useAuthStore } from "@/stores/authenticate";
import { storeToRefs } from "pinia";
const router = useRouter();
const authStore = useAuthStore();
const store = useLoadingStore();
const { isAuthenticated, storageName } = storeToRefs(authStore);
const { islogout } = authStore;
const { loading } = storeToRefs(store);
loading.value = false;
const submit = () => {
  islogout();
  isAuthenticated.value = false;
  loading.value = true;
};
</script>
<template>
  <main>
    Hello {{ storageName }}

    <RouterView
      class="transition-all duration-200 border border-gray-700 p-5 rounded-lg maxsm:px-4 maxxsm:p-3"
    />

    <button
      class="maxsm:mx-0 flex justify-center items-center p-2 mt-4 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:border-red-600 hover:bg-red-600"
      name="register"
      @click="submit"
    >
      <span>Logout</span>
    </button>
  </main>
</template>