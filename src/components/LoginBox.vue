<script setup>
/*get env url */
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authenticate";
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
const { loggedIn, logout, welcome } = authStore;
const username = ref("ssss");
const password = ref("ssss");
const api = ref("http://localhost:3000/api/auth/");
const register = async () => {
  try {
    const res = await fetch(`${api.value}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username.value,
        password: password.value,
      }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("login error:", err);
  }
};
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
      <!-- <form @submit.prevent="login">
        <div>
          <label for="username">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
          />
        </div>
      </form>
      <button @click="submit">Login</button> -->
      <form @submit.prevent="register">
        <div>
          <label for="username">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
          />
        </div>
      </form>
      <button @click="register">Register</button>
    </div>
  </div>
</template>