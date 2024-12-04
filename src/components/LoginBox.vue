<script setup>
import { ref, computed, watch } from "vue";
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
const validateData = ref([
  {
    name: "minLen",
    value: 8,
    notice: "At least 8 characters",
    validate: false,
  },
  {
    name: "hasNumber",
    value: /\d/,
    notice: "At least one number",
    validate: false,
  },
  {
    name: "hasUpperCase",
    value: /[A-Z]/,
    notice: "Uppercase letter",
    validate: false,
  },
  {
    name: "hasLowerCase",
    value: /[a-z]/,
    notice: "Lowercase letter",
    validate: false,
  },
  {
    name: "hasSpecialChar",
    value: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    notice: "Special character",
    validate: false,
  },
]);
const showPassword = ref(false);
const passwordBar = ref(0);
const api = import.meta.env.VITE_TODOAPI_AUTH_URI;
const welcome = computed(() => {
  return register.value ? "Hi! New Pokémon Trainer" : "Welcome back";
});
const submitHandler = async (e) => {
  const check = register.value === "true" ? validateInput() : true;
  if (!check) return;
  let { state, msg, userData } = submit();
  const data = await fetchApi();
  if (!data) return;
  if (state === "login") loginHandler(data);
  if (state === "register") registerHandler(data);
  username.value = "";
  email.value = "";
  password.value = "";

  function validateInput() {
    if (!email.value || !password.value) {
      noticeHandler("Please enter your email and password", "error");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.value)) {
      noticeHandler("Please enter a valid email", "error");
      return false;
    }
    if (password.value && passwordBar.value < 100) {
      noticeHandler("Your password is not strong enough", "error");
      return false;
    }
    if (register.value && !username.value) {
      noticeHandler("Please enter your name", "error");
      return false;
    }
    return true;
  }
  function submit() {
    let state = e.target.name;
    let msg = "";
    let userData = {
      email: email.value,
      password: password.value,
    };
    if (state === "register") {
      msg = "Register success!";
      userData.name = username.value;
    }
    if (state === "login") {
      msg = "Login success!";
    }
    return { state, msg, userData };
  }
  function loginHandler(data) {
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("login", data.token);
    noticeHandler(msg, "success");
    loading.value = true;
    setTimeout(() => {
      isAuthenticated.value = true;
      loggedIn();
      router.push({ name: "Dashboard" });
    }, 2800);
  }
  function registerHandler(data) {
    noticeHandler(msg, "success");
    loading.value = true;
    setTimeout(() => {
      register.value = false;
      loading.value = false;
      msg = "Please login now";
      noticeHandler(msg, "success");
    }, 2800);
  }
  async function fetchApi() {
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
      const data = res.json();
      return data;
    } catch (error) {
      msg = error.message;
      noticeHandler(msg, "error");
      return false;
    }
  }
};
const noticeHandler = (text, state) => {
  noticeBox.value.state = state;
  noticeBox.value.text = text;
  noticeBox.value.show = true;
  setTimeout(() => {
    noticeBox.value.show = false;
  }, 2000);
};
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const checkPassword = () => {
  password.value = password.value.replace(/\s+/g, "");
  vaildatePassword(password.value);
  return false;
};
const vaildatePassword = (password) => {
  passwordBar.value = 0;
  validateData.value.forEach((item) => {
    item.validate = false;
    if (item.name !== "minLen" && item.value.test(password)) {
      passwordBar.value += 20;
      item.validate = true;
    }
    if (item.name === "minLen" && password.length >= item.value) {
      passwordBar.value += 20;
      item.validate = true;
    }
  });
};
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
              <div class="flex">
                <input
                  v-model="email"
                  type="text"
                  id="email"
                  class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
                  required
                />
              </div>
            </div>
            <div class="pb-4">
              <label for="password">Password</label>
              <div class="flex items-center">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
                  autocomplete="current-password"
                  required
                />
                <button
                  @click.prevent="togglePassword"
                  class="p-1 hover:bg-green-600 hover:rounded hover:rounded-full transition-all duration-600"
                >
                  <Icon class="w-4 h-4" icon="tabler:eye" />
                </button>
              </div>
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
              <div class="flex">
                <input
                  v-model="username"
                  type="text"
                  id="username"
                  class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
                  required
                />
              </div>
            </div>
            <div class="pb-4">
              <label for="email">Email</label>
              <div class="flex">
                <input
                  v-model="email"
                  type="text"
                  id="email"
                  class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
                  required
                />
              </div>
            </div>
            <div class="pb-4">
              <label for="password">Password</label>
              <div class="flex flex-wrap items-center">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  @keyup="checkPassword"
                  id="password"
                  class="maxsm:mr-1 maxxsm:grow block mr-2 px-2 py-1 rounded text-gray-900"
                  autocomplete="current-password"
                  required
                />
                <button
                  @click.prevent="togglePassword"
                  class="p-1 hover:bg-green-600 hover:rounded hover:rounded-full transition-all duration-600"
                >
                  <Icon class="w-4 h-4" icon="tabler:eye" />
                </button>
                <div
                  class="w-full mt-4 py-4 px-2 border border-gray-700 rounded"
                >
                  <div class="flex w-48 h-0.5 rounded bg-gray-600">
                    <span
                      class="progress flex h-full rounded bg-green-600 transition-all duration-600"
                      :style="{ width: passwordBar + '%' }"
                    ></span>
                  </div>
                  <ul class="text-gray-500 text-xs mt-2 leading-relaxed">
                    <li
                      class="flex items-center opacity-50 transition-all duration-800"
                      :class="{ 'opacity-70 text-white': item.validate }"
                      v-for="item of validateData"
                      :key="item.name"
                    >
                      <span class="mr-1">
                        <Icon icon="tabler:circle-check-filled" /> </span
                      >{{ item.notice }}
                    </li>
                  </ul>
                </div>
              </div>
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
              class="text-green-600 hover:underline mt-44"
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