<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps(["todo"]);
const emit = defineEmits(["buttonState"]);
const buttonClick = (state, todo) => {
  emit("buttonState", state, todo);
};
</script>

<template>
  <div class="btnBox" v-show="!todo.isDeleted">
    <button
      @click="buttonClick('edit', todo)"
      type="button"
      class="edit"
      title="edit"
    >
      <Icon icon="tabler:edit" />
    </button>
    <button
      v-show="!todo.completed"
      @click="buttonClick('completed', todo)"
      type="button"
      class="completed"
      title="completed"
    >
      <Icon icon="tabler:check" />
    </button>
    <button
      @click="buttonClick('delete', todo)"
      type="button"
      class="delete"
      title="delete"
    >
      <Icon icon="tabler:minus" />
    </button>
  </div>
</template>