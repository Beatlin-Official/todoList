<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/authenticate";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";
import Loading from "@/components/Loading.vue";
const authStore = useAuthStore();
const { isAuthenticated, storageName } = storeToRefs(authStore);
</script>

<template>
  <div class="w-full max-w-4xl mx-auto px-6 font-normal maxxsm:px-3">
    <header class="leading-6 w-full">
      <div class="wrapper px-1">
        <nav class="w-full flex justify-center mt-5 mb-6 text-center text-s">
          <RouterLink
            activeClass="text-green-600 hover:underline ease-in-out"
            class="px-5 py-3 mr-2 hover:text-white hover:underline hover:bg-gray-800 rounded transition-all duration-200"
            :to="{ name: 'Todo' }"
            >Todo</RouterLink
          >
          <RouterLink
            activeClass="text-green-600 hover:underline ease-in-out"
            class="px-5 py-3 hover:text-white hover:underline hover:bg-gray-800 rounded transition-all duration-200"
            :to="{ name: 'Handbook' }"
            >Handbook</RouterLink
          >
          <div class="loginBox flex">
            <RouterLink
              activeClass="text-green-600 hover:underline ease-in-out"
              class="px-5 py-3 hover:text-white hover:underline hover:bg-gray-800 rounded transition-all duration-200"
              :to="{ name: 'Dashboard' }"
              v-if="isAuthenticated"
            >
              <button class="flex jstify-center items-center" title="login">
                <Icon icon="tabler:user" /><span class="ml-1">
                  {{ storageName }}
                </span>
              </button>
            </RouterLink>

            <RouterLink
              activeClass="text-green-600 hover:underline ease-in-out"
              class="px-5 py-3 hover:text-white hover:underline hover:bg-gray-800 rounded transition-all duration-200"
              :to="{ name: 'Login' }"
              v-else
            >
              <button class="flex jstify-center items-center" title="login">
                <Icon icon="tabler:pokeball" /><span class="ml-1">Login</span>
              </button>
            </RouterLink>
          </div>
        </nav>
      </div>
    </header>
    <RouterView
      class="transition-all duration-200 border border-gray-700 p-5 rounded-lg maxsm:px-4 maxxsm:p-3"
    />
  </div>
  <Loading></Loading>
</template>