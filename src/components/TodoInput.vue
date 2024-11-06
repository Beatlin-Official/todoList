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
    />
    <button type="button" class="add" @click="emit('addHandler')" title="add">
      <Icon icon="tabler:copy-plus-filled" />
    </button>
  </div>
</template>