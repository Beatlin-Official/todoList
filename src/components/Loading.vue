<script setup>
import { ref } from "vue";
const props = defineProps["loading"];
</script>
<template>
  <Transition name="loading">
    <div v-show="loading" class="loadingBox">
      <p>Loading</p>
      <img src="@/assets/loading.gif" alt="loading" />
    </div>
  </Transition>
</template>

<style>
.loadingBox {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--vt-c-white);
}

.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.5s;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

.loading-enter-to,
.loading-leave-from {
  opacity: 1;
}
</style>