<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="w-full max-w-4xl mx-auto font-normal">
    <header class="leading-6 w-full">
      <div class="wrapper">
        <nav class="w-full mt-5 mb-6 text-center text-s">
          <RouterLink
            activeClass="text-green-600 hover:underline ease-in-out"
            class="px-5 py-3 mr-2 hover:text-white hover:underline hover:bg-gray-800 rounded transition-all duration-200"
            to="/"
            >Todo</RouterLink
          >
          <RouterLink
            activeClass="text-green-600 hover:underline ease-in-out"
            class="px-5 py-3 hover:text-white hover:underline hover:bg-gray-800 rounded transition-all duration-200"
            to="/handbook"
            >Handbook</RouterLink
          >
        </nav>
      </div>
    </header>
    <RouterView
      class="transition-all duration-200 border border-gray-700 p-5 rounded-lg"
    />
  </div>
</template>