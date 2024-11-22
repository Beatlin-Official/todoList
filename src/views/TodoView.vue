<script setup>
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLoadingStore } from "@/stores/loading.js";
import TodoInput from "@/components/TodoInput.vue";
import FilterBox from "@/components/FilterBox.vue";
import TodoList from "@/components/TodoList.vue";
import { uuid } from "vue-uuid";
const todoData = ref([]);
const todoName = ref(null);
const editingName = ref(null);
const editingId = ref(null);
const activity = ref(null);
const activityStyle = ref("");
const filter = ref(null);
const LoadingStore = useLoadingStore();
const { loading } = storeToRefs(LoadingStore);
onMounted(() => {
  loading.value = true;
  fetch("https://dummyjson.com/todos")
    .then((res) => res.json())
    .then((req) => {
      todoData.value = [...req.todos];
      addUuidTodo();
    });
});
const addHandler = () => {
  if (todoName.value == "" || todoName.value == null)
    return alert("Please key something pls pls pls");
  loading.value = true;
  fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: todoName.value,
      completed: false,
      userId: 18,
    }),
  })
    .then((res) => res.json())
    .then((req) => {
      addTodo(req);
    });
};
const deleteHandler = (todo) => {
  loading.value = true;
  fetch(`https://dummyjson.com/todos/${todo.id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((req) => {
      deleteTodo(req);
    });
};
const addUuidTodo = () => {
  todoData.value = todoData.value.map((todo) => ({
    ...todo,
    uuid: uuid.v4(),
  }));
  loading.value = false;
};
const addTodo = (item) => {
  todoData.value.unshift({ ...item, uuid: uuid.v4() });
  todoName.value = null;
  loading.value = false;
};
const deleteTodo = (todo) => {
  const index = todoData.value.findIndex((item) => item.id == todo.id);
  todo = { ...todo, uuid: uuid.v4() }; //因為串api導致uuid被洗掉，才這裡須重加
  todoData.value.splice(index, 1, todo);
  loading.value = false;
};
const finishedHandler = (todo) => {
  todo.completed = true;
  loading.value = false;
};
const editTodoHandler = (todo) => {
  editingId.value = todo.id;
  editingName.value = todo.todo;
};
const typingHandler = (e, todo) => {
  if (e !== "blur") return;
  todoData.value = todoData.value.map((item) =>
    item.id === todo.id ? { ...item, todo: editingName.value.trim() } : item
  );
  editingId.value = null;
  editingName.value = null;
};
//管理todoitem 按鈕事件
const clickBtnHandler = (state, todo) => {
  if (state == "completed") finishedHandler(todo);
  if (state == "delete") deleteHandler(todo);
  if (state == "edit") editTodoHandler(todo);
};

const filterHandler = (state) => {
  if (state == "Completed" && filter.value !== "Completed") {
    filter.value = activity.value = state;
    activityStyle.value = "bg-teal-600";
    return;
  }
  if (state == "isDeleted" && filter.value !== "isDeleted") {
    filter.value = activity.value = state;
    activityStyle.value = "bg-red-500";
    return;
  }
  activity.value = "";
  filter.value = null;
};

const filteredTodos = computed(() => {
  if (filter.value === "Completed") {
    return todoData.value.filter(
      (todo) => todo.completed === true && todo.isDeleted !== true
    );
  }

  if (filter.value === "isDeleted") {
    return todoData.value.filter((todo) => todo.isDeleted === true);
  }

  return todoData.value.filter(
    (todo) => todo.isDeleted !== true && todo.completed !== true
  );
});
</script>


<template>
  <main>
    <div class="todoBox">
      <div class="topBox">
        <h1 class="text-3xl font-medium pb-2 mb-5 border-b border-gray-700">
          TodoList<span
            class="text-sm px-1 ml-1 rounded"
            :class="activityStyle"
            v-if="activity"
            >{{ activity }}</span
          >
        </h1>
        <div class="maxxsm:flex-col maxxsm:mb-2 flex items-center mb-5">
          <TodoInput
            class="maxxsm:w-full maxsm:mr-0 maxxsm:mb-2 mr-auto flex items-center"
            :name="todoName"
            @update:name="($event) => (todoName = $event)"
            @addHandler.enter="addHandler"
          ></TodoInput>
          <FilterBox
            class="flex maxsm:ml-auto"
            @filterHandler="filterHandler"
            :activity="activity"
          ></FilterBox>
        </div>
      </div>

      <div class="relative h-96 overflow-y-auto">
        <TodoList :todos="filteredTodos" @buttonStateChange="clickBtnHandler">
          <template #nameBox="{ todo, id, isDeleted, completed }">
            <div
              class="maxsm:grow maxsm:mr-0 max-w-7xl pr-5 mr-auto overflow-hidden whitespace-nowrap text-ellipsis font-light"
            >
              <input
                v-model="editingName"
                v-if="id === editingId"
                @keyup.enter="$event.target.blur()"
                @blur="typingHandler($event.type, { todo, id, uuid })"
                type="text"
                class="maxsm:w-full w-96 mr-2 px-2 py-1 border-0 border-gray-100 rounded text-white bg-stone-700 focus:border-none active:border-white"
              />
              <span v-else class="name">{{ todo }}</span>
            </div>
          </template>
          <!-- btnbox -->
          <div class="date"></div>
        </TodoList>
      </div>
    </div>
  </main>
</template>

<style>
.slide-move,
.slide-leave-active,
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-leave-active {
  position: absolute;
}
</style>