<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
const text = ref(null);
const pokemons = ref([]);
const urlIdLookup = ref({});
const curPage = ref(1);
const pageSize = 15;
const filteredPokemon = computed(() => UpdatePokemon());
const UpdatePokemon = () => {
  if (text.value == "" || text.value == null) return pokemons.value;
  curPage.value = 1;
  return pokemons.value.filter((pokemon) => pokemon.name.includes(text.value));
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
    <h1 class="subtitle">Handbook</h1>
    <div id="inputBox">
      <input
        type="text"
        placeholder="Search Pokemon's name"
        v-model="text"
        class="text-gray-500"
      />
    </div>

    <div id="cardsBox">
      <div id="cardList">
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

    <div id="pageBox" class="flex">
      <button @click="curPage = 1" v-if="curPage !== 1">
        <Icon icon="tabler:square-chevrons-left" />
      </button>
      <button @click="prevPage" v-if="curPage !== 1">
        <Icon icon="tabler:square-chevron-left" />
      </button>
      <div id="pageList">
        <button
          id="pageItem"
          v-for="page of pageNum"
          :key="page"
          @click="goToPage(page)"
          :class="{ current: page === curPage }"
          class="px-3"
        >
          {{ page }}
        </button>
      </div>
      <button
        @click="nextPage"
        v-if="curPage !== totalPages && totalPages !== 0"
      >
        <Icon icon="tabler:square-chevron-right" />
      </button>
      <button
        @click="curPage = totalPages"
        v-if="curPage !== totalPages && totalPages !== 0"
      >
        <Icon icon="tabler:square-chevrons-right" />
      </button>
    </div>
  </main>
</template>

<style>
button.current {
  background: var(--vt-c-text-dark-2);
}
</style>
