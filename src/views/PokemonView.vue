<script setup>
import { ref } from "vue";
const data = ref([]);
</script>

<template>
  <h1 class="subtitle">pokemon</h1>
  <h3>{{ $route.params.slug }}</h3>
</template>
  
  <style>
</style>