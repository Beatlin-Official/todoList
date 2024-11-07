<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const props = defineProps(["activity"]);
const curr = ref("curr");
const showFilter = ref(false);
const emit = defineEmits(["filterHandler"]);
</script>

<template>
  <div class="filterBox">
    <button
      class="mx-1 p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700"
      @click="showFilter = !showFilter"
    >
      <Icon icon="tabler:filter" />
    </button>
    <div class="tabBox" v-show="showFilter">
      <button
        type="button"
        class="mx-1 p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700"
        :class="{ 'bg-gray-700': activity === 'Completed' }"
        title="completed"
        @click="$emit('filterHandler', 'Completed')"
      >
        <Icon icon="tabler:checkbox" />
      </button>
      <button
        type="button"
        class="mx-1 p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700"
        title="isDeleted"
        :class="{ 'bg-gray-700': activity === 'isDeleted' }"
        @click="$emit('filterHandler', 'isDeleted')"
      >
        <Icon icon="tabler:trash" />
      </button>
    </div>
  </div>
</template>