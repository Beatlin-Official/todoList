<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authenticate";
import { useLoadingStore } from "@/stores/loading";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const { isAuthenticated } = storeToRefs(authStore);
const { loggedIn } = authStore;
const { loading } = storeToRefs(loadingStore);
const email = ref("");
const password = ref("");
const username = ref("");
const register = ref(false);
const noticeBox = ref({
  text: null,
  show: false,
  state: null,
});
const api = import.meta.env.VITE_TODOAPI_AUTH_URI;
const submitHandler = async (e) => {
  let msg = "Login success!";
  let state = e.target.name;
  let userData = {
    email: email.value,
    password: password.value,
  };
  if (register.value) {
    userData.name = username.value;
    msg = "Register success!";
  }
  try {
    const res = await fetch(`${api}/${state}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorBody = await res.text();
      const errMessage = JSON.parse(errorBody);
      throw new Error(errMessage.error);
    }
    const data = await res.json();
    console.log(data);
    localStorage.setItem("login", data.token);
    localStorage.setItem("name", data.user.name);
    noticeHandler(msg, "success");
  } catch (error) {
    msg = error.message;
    noticeHandler(msg, "error");
  }
};
const noticeHandler = (text, state) => {
  noticeBox.value.state = state;
  noticeBox.value.text = text;
  noticeBox.value.show = true;
  setTimeout(() => {
    noticeBox.value.show = false;
    loading.value = true;
  }, 2000);
  if (state === "success") {
    setTimeout(() => {
      isAuthenticated.value = true;
      loggedIn();
      router.push({ name: "Dashboard" });
    }, 2800);
  }
};

const welcome = computed(() => {
  return register.value ? "Hi! New Pokémon Trainer" : "Welcome back";
});
</script>

<template>
  <Transition name="notice">
    <div
      class="notice absolute top-5 right-5 p-4 flex justify-center items-center rounded"
      v-if="noticeBox.show"
      :class="noticeBox.state === 'error' ? 'bg-red-500' : 'bg-teal-600'"
    >
      <Icon icon="tabler:alert-circle" />
      <span class="pl-1">{{ noticeBox.text }}</span>
    </div>
  </Transition>
  <div>
    <div class="centerBox flex justify-center maxsm:flex-row maxsm:flex-wrap">
      <div
        class="imgBox w-2/4 rounded overflow-hidden bg-green-800 maxsm:w-full maxsm:h-24 max2sm:h-16"
      >
        <img
          class="object-cover w-full h-full opacity-80 maxsm:object-top"
          src="https://i.pinimg.com/originals/e8/92/76/e89276ee1ccd0dcb1db0af409bb08706.gif"
        />
      </div>
      <div class="formBox w-2/4 pl-5 maxsm:w-full maxsm:pl-0 maxsm:pt-3">
        <div class="topBox">
          <h1 class="text-3xl font-medium pb-2 mb-5 border-b border-gray-700">
            {{ welcome }}
          </h1>
        </div>
        <div>
          <form
            v-if="!register"
            @submit.prevent="submitHandler"
            name="login"
            autocomplete="on"
          >
            <div class="pb-4">
              <label for="email">Email</label>
              <input
                v-model="email"
                type="text"
                id="email"
                class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
                required
              />
            </div>
            <div class="pb-4">
              <label for="password">Password</label>
              <input
                v-model="password"
                type="password"
                id="password"
                class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
                autocomplete="current-password"
                required
              />
            </div>
            <button
              class="maxsm:mx-0 flex justify-center items-center p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 hover:border-green-700 hover:bg-green-700"
              name="login"
              @click="submit"
            >
              Login
            </button>
          </form>
          <form
            v-else
            @submit.prevent="submitHandler"
            name="register"
            autocomplete="on"
          >
            <div class="pb-4">
              <label for="username">Name</label>
              <input
                v-model="username"
                type="text"
                id="username"
                class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
                required
              />
            </div>
            <div class="pb-4">
              <label for="email">Email</label>
              <input
                v-model="email"
                type="text"
                id="email"
                class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
                required
              />
            </div>
            <div class="pb-4">
              <label for="password">Password</label>
              <input
                v-model="password"
                type="password"
                id="password"
                class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
                autocomplete="current-password"
                required
              />
            </div>

            <button
              class="maxsm:mx-0 flex justify-center items-center p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 hover:border-green-700 hover:bg-green-700"
              name="register"
              @click="submit"
            >
              <span>Register</span>
            </button>
          </form>
          <div class="pt-5 text-sm">
            <button
              v-if="register"
              class="text-green-600 hover:underline"
              @click="register = false"
            >
              Already a Trainer?
            </button>
            <button
              v-else
              class="text-green-600 hover:underline mt-20"
              @click="register = true"
            >
              Not yet a Trainer? Please register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notice-enter-active,
.notice-leave-active {
  transition: all 0.3s ease;
}
.notice-enter-from {
  opacity: 0;
  top: -10px;
}
.notice-leave-to {
  opacity: 0;
  top: 0;
}
</style>