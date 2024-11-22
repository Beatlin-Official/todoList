<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authenticate";
const authStore = useAuthStore();
const { isAuthenticated, username } = storeToRefs(authStore);
const { login, logout, welcome } = authStore;
</script>

<template>
  <div>
    <div class="topBox">
      <h1 class="text-3xl font-medium pb-2 mb-5 border-b border-gray-700">
        {{ welcome }}
      </h1>
    </div>
    <div v-if="isAuthenticated">
      <p>Username: {{ username }}</p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <button @click="login">Login</button>
    </div>
  </div>
</template>