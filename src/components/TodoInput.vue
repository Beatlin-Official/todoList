<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({ name: { required: true } });
const emit = defineEmits(["update:name", "addHandler"]);
</script>

<template>
  <div class="inputBox">
    <input
      type="text"
      placeholder="Add your todo"
      :value="props.name"
      @input="emit('update:name', $event.target.value)"
      @keyup.enter="emit('addHandler')"
      class="block mr-2 px-2 py-1 rounded text-gray-900"
    />
    <button
      type="button"
      @click="emit('addHandler')"
      title="add"
      class="mx-1 p-2 rounded cursor-pointer border border-green-600 transition-all duration-600 hover:bg-green-900 hover:border-green-900"
    >
      <Icon icon="tabler:arrow-back" />
    </button>
  </div>
</template>