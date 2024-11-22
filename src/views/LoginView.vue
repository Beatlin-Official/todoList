<script setup>
import LoginBox from "@/components/LoginBox.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useLoadingStore } from "@/stores/loading";
const loadingStore = useLoadingStore();
const { loading } = storeToRefs(loadingStore);
loading.value = false;
</script>

<template>
  <main>
    <LoginBox />
  </main>
</template>