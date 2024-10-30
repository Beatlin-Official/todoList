<script setup>
import { ref, onMounted, computed, TransitionGroup } from "vue";
import { Icon } from "@iconify/vue";
import { uuid } from "vue-uuid";
const todoData = ref([]);
const todoName = ref(null);
const editingName = ref(null);
const editingId = ref(null);
const activity = ref(null);

const showFilter = ref(false);
const deleted = ref(false);
const completed = ref(false);
const loading = ref(true);

onMounted(() => {
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
  todo.todo = editingName.value.trim();
  editingId.value = null;
  editingName.value = null;
};

const filterHandler = (state) => {
  if (state === "Completed") {
    completed.value = !completed.value;
    deleted.value = false;
    return;
  }
  if (state === "isDeleted") {
    deleted.value = !deleted.value;
    completed.value = false;
    return;
  }
};

const filterTodo = computed(() => {
  editingId.value = null;
  if (completed.value == true && deleted.value !== true) {
    return todoData.value.filter((todo) => {
      return todo.completed == true && todo.isDeleted != true;
    });
  }
  if (deleted.value == true && completed.value !== true) {
    return todoData.value.filter((todo) => {
      return todo.isDeleted == true;
    });
  }
  return todoData.value.filter((todo) => {
    return todo.isDeleted != true && todo.completed == false;
  });
});
const activityPage = computed(() => {
  if (deleted.value == true) return (activity.value = " / Trash");
  if (completed.value == true) return (activity.value = " / Completed");
  if (activity.value == null) return "";
});
</script>

<template>
  <div class="todoBox">
    <div class="topBox">
      <h1 class="subtitle">TodoList{{ activityPage }}</h1>
      <div class="toolBox">
        <div class="inputBox">
          <input
            v-model.trim="todoName"
            type="text"
            placeholder="type your todo"
            @keyup.enter="addHandler"
          />
          <button type="button" class="add" @click="addHandler">
            <Icon icon="tabler:copy-plus-filled" />
          </button>
        </div>
        <div class="filterBox">
          <button @click="showFilter = !showFilter">
            <Icon icon="tabler:filter" />
          </button>
          <div class="tabBox" v-show="showFilter">
            <button
              type="button"
              class="filterCompleted"
              @click="filterHandler('Completed')"
            >
              <Icon icon="tabler:checkbox" />
            </button>
            <button
              type="button"
              class="filtertrash"
              @click="filterHandler('isDeleted')"
            >
              <Icon icon="tabler:trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="listBox">
      <Transition name="loading">
        <div v-show="loading" class="loadingBox">
          <p>Loading</p>
          <Icon icon="tabler:loader" /></div
      ></Transition>
      <div class="list">
        <Transition-group name="slide" tag="div">
          <div class="item" v-for="todo of filterTodo" :key="todo.uuid">
            <div class="nameBox">
              <input
                v-model="editingName"
                v-if="todo.id === editingId"
                @keyup.enter="$event.target.blur()"
                @blur="typingHandler($event.type, todo)"
                type="text"
              />
              <span v-else class="name">{{ todo.todo }}</span>
            </div>
            <div class="btnBox" v-show="!todo.isDeleted">
              <button @click="editTodoHandler(todo)" type="button" class="edit">
                <Icon icon="tabler:edit" />
              </button>
              <button
                v-show="!todo.completed"
                @click="finishedHandler(todo)"
                type="button"
                class="completed"
              >
                <Icon icon="tabler:check" />
              </button>
              <button @click="deleteHandler(todo)" type="button" class="delete">
                <Icon icon="tabler:minus" />
              </button>
            </div>
            <div class="date"></div>
          </div>
        </Transition-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  font-size: 25px;
  font-weight: 500;
}
.toolBox {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.inputBox {
  margin-right: auto;
}
input[type="text"] {
  border: none;
  outline: none;
  height: 30px;
}
.filterBox {
  display: flex;
}
.listBox {
  position: relative;
  overflow-y: auto;
  height: 70vh;
  padding: 0 10px;
}
.loadingBox {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

.item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 0;
  min-height: 45px;
}
.nameBox {
  max-width: 80%;
  padding-right: 20px;
  margin-right: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 300;
}
button {
  border: none;
  outline: none;
  margin: 0 2px;
  padding: 8px;
  border-radius: 5px;
  background: #ffffff;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
button:hover {
  background: var(--vt-c-text-dark-2);
}
</style>