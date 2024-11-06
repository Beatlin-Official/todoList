<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const showFilter = ref(false);
const emit = defineEmits(["filterHandler"]);
</script>

<template>
  <div class="filterBox">
    <button @click="showFilter = !showFilter">
      <Icon icon="tabler:filter" />
    </button>
    <div class="tabBox" v-show="showFilter">
      <button
        type="button"
        class="filterCompleted"
        title="completed"
        @click="$emit('filterHandler', 'Completed')"
      >
        <Icon icon="tabler:checkbox" />
      </button>
      <button
        type="button"
        class="filtertrash"
        title="isDeleted"
        @click="$emit('filterHandler', 'isDeleted')"
      >
        <Icon icon="tabler:trash" />
      </button>
    </div>
  </div>
</template>