<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Pokedex } from "pokeapi-js-wrapper";
const id = ref(1);
const route = useRoute();
watch(
  route,
  () => {
    id.value = route.params.page;
  },
  { immediate: true }
);
</script>
<template>
  {{ id }}
</template>