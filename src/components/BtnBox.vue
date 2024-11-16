<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps(["todo"]);
const emit = defineEmits(["buttonState"]);
const buttonClick = (state, todo) => {
  emit("buttonState", state, todo);
};
</script>

<template>
  <div class="min-w-30 flex justify-center" v-show="!todo.isDeleted">
    <button
      @click="buttonClick('edit', todo)"
      type="button"
      title="edit"
      class="maxsm:ml-1 ml-2 p-2 rounded cursor-pointer bg-gray-600 transition-all duration-600 hover:bg-gray-500"
    >
      <Icon icon="tabler:edit" />
    </button>
    <button
      v-show="!todo.completed"
      @click="buttonClick('completed', todo)"
      type="button"
      title="completed"
      class="maxsm:ml-1 ml-2 p-2 rounded cursor-pointer bg-teal-600 transition-all duration-600 hover:bg-teal-700"
    >
      <Icon icon="tabler:check" />
    </button>
    <button
      @click="buttonClick('delete', todo)"
      type="button"
      title="delete"
      class="maxsm:ml-1 ml-2 p-2 rounded cursor-pointer bg-red-500 transition-all duration-600 hover:bg-red-600"
    >
      <Icon icon="tabler:minus" />
    </button>
  </div>
</template>