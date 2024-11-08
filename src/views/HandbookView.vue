<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
const text = ref(null);
const pokemons = ref([]);
const urlIdLookup = ref({});
const imgData = ref([]);
const curPage = ref(1);
const pageSize = 15;
const filteredPokemon = computed(() => UpdatePokemon());
const UpdatePokemon = () => {
  if (text.value == "" || text.value == null) return pokemons.value;
  let texting = text.value.toLowerCase();
  curPage.value = 1;
  return pokemons.value.filter((pokemon) => pokemon.name.includes(texting));
};
const getPageData = computed(() => {
  const startIdx = (curPage.value - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  return filteredPokemon.value.slice(startIdx, endIdx);
});
const totalPages = computed(() => {
  return Math.ceil(filteredPokemon.value.length / pageSize);
});
const pageNum = computed(() => {
  const pages = [];
  const start = Math.max(1, curPage.value - 2);
  const end = Math.min(totalPages.value, curPage.value + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
const goToPage = (page) => {
  curPage.value = page;
};
const prevPage = () => {
  if (curPage.value > 1) curPage.value--;
};
const nextPage = () => {
  if (curPage.value < totalPages.value) curPage.value++;
};

onMounted(() => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0")
    .then((res) => res.json())
    .then((data) => {
      pokemons.value = data.results;
      urlIdLookup.value = data.results.reduce(
        (acc, cur, idx) => (acc = { ...acc, [cur.name]: idx + 1 }),
        {}
      );
    });
});
</script>

<template>
  <main>
    <h1 class="text-3xl font-medium pb-2 mb-5 border-b border-gray-700">
      Handbook
    </h1>
    <div class="mr-auto flex items-center mb-5">
      <input
        type="text"
        placeholder="Search Pokemon"
        v-model="text"
        class="block mr-2 px-2 py-1 rounded text-gray-900"
      />
    </div>

    <div>
      <div id="cardList" class="grid grid-cols-4">
        <div id="cardItem" v-for="pokemon of getPageData" :key="pokemon.idx">
          <RouterLink :to="`/handbook/${urlIdLookup[pokemon.name]}`">
            {{ pokemon.name }}
          </RouterLink>
        </div>
        <div v-if="getPageData.length == 0">
          <p>Please Search again</p>
        </div>
      </div>
    </div>

    <div id="pageBox" class="flex mx-auto w-full justify-center items-center">
      <div class="max-w-24 w-full flex justify-center">
        <button
          @click="curPage = 1"
          v-show="curPage !== 1"
          class="mx-1 p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700"
        >
          <Icon icon="tabler:square-chevrons-left" />
        </button>
        <button
          @click="prevPage"
          v-show="curPage !== 1"
          class="mx-1 p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700"
        >
          <Icon icon="tabler:square-chevron-left" />
        </button>
      </div>
      <div id="pageList" class="min-w-56 flex justify-center">
        <button
          id="pageItem"
          v-for="page of pageNum"
          :key="page"
          @click="goToPage(page)"
          :class="{ 'bg-gray-700': page === curPage }"
          class="min-w-8 mx-1 p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700 text-xs font-extralight"
        >
          {{ page }}
        </button>
      </div>
      <div class="max-w-24 w-full flex justify-center">
        <button
          @click="nextPage"
          v-show="curPage !== totalPages && totalPages !== 0"
          class="mx-1 p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700"
        >
          <Icon icon="tabler:square-chevron-right" />
        </button>
        <button
          @click="curPage = totalPages"
          v-show="curPage !== totalPages && totalPages !== 0"
          class="mx-1 p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700"
        >
          <Icon icon="tabler:square-chevrons-right" />
        </button>
      </div>
    </div>
  </main>
</template>