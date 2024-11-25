<script setup>
import { RouterView, useRoute } from "vue-router";
import { useLoadingStore } from "@/stores/loading";
import { storeToRefs } from "pinia";
const store = useLoadingStore();
const { loading } = storeToRefs(store);
const route = useRoute();
loading.value = false;
</script>
<template>
  <main>
    hello developer

    <RouterView
      class="transition-all duration-200 border border-gray-700 p-5 rounded-lg maxsm:px-4 maxxsm:p-3"
    />
  </main>
</template>