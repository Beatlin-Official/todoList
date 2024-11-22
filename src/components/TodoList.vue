<script setup>
import { TransitionGroup } from "vue";
import BtnBox from "@/components/BtnBox.vue";
const props = defineProps(["todos"]);
const emit = defineEmits(["buttonStateChange"]);
const handleButtonState = (state, todo) => {
  emit("buttonStateChange", state, todo);
};
</script>

<template>
  <div class="list">
    <Transition-group name="slide" tag="div">
      <div
        v-for="todoItem of todos"
        :key="todoItem.uuid"
        class="maxsm:pl-0 hover:bg-neutral-800 flex items-center w-full p-2 min-h-14 border-b border-neutral-800"
      >
        <slot name="nameBox" v-bind="todoItem"></slot>
        <slot name="btnBox">
          <BtnBox :todo="todoItem" @buttonState="handleButtonState"></BtnBox>
        </slot>
      </div>
    </Transition-group>
  </div>
</template>