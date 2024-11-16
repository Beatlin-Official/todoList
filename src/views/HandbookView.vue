<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { Pokedex } from "pokeapi-js-wrapper";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useLoadingStore } from "@/stores/loading";
const loadingStore = useLoadingStore();
const { loading } = storeToRefs(loadingStore);
const P = new Pokedex();
const interval = {
  offset: 0,
  limit: 100,
};

const totalPokemons = ref(900);
const text = ref(null);
const pokemons = ref([]);
const curPage = ref(1);
const pageSize = 20;

const filteredPokemon = computed(() => UpdatePokemon());
const UpdatePokemon = () => {
  if (text.value == "" || text.value == null) return pokemons.value;
  let texting = text.value.toLowerCase();
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
onMounted(async () => {
  loading.value = true;
  async function getData() {
    if (pokemons.value.length >= totalPokemons.value) return false;
    const arr = Array.from({ length: 100 }, (_, i) => i + 1 + interval.offset);
    const res = await P.getPokemonByName(arr);
    return res;
  }
  async function pushData(res) {
    pokemons.value.push(...res);
    loading.value = false;
    return pokemons.value.length < totalPokemons.value;
  }
  async function updateInterval() {
    interval.offset += interval.limit;
  }
  try {
    let shouldContinue = true;
    while (shouldContinue) {
      const res = await getData();
      if (shouldContinue) {
        await pushData(res);
        await updateInterval();
      }
      if (!shouldContinue) {
        console.log("data all done");
        break;
      }
    }
  } catch (error) {
    console.log("error:", error);
  }
});
</script>

<template>
  <main>
    <h1 class="text-3xl font-medium pb-2 mb-5 border-b border-gray-700">
      Handbook
    </h1>
    <div class="maxxsm:w-full maxxsm:mr-0 mr-auto flex items-center mb-5">
      <input
        type="text"
        placeholder="Search Pokemon"
        v-model="text"
        class="maxxsm:w-full maxxsm:mr-0 block mr-2 px-2 py-1 rounded text-gray-900"
      />
    </div>
    <div>
      <div
        class="maxsm:gap-1 maxxsm:grid-cols-2 grid grid-cols-4 grid-rows-5 gap-2 min-h-80"
      >
        <div
          class="border border-gray-500 rounded hover:bg-green-800 hover:border-green-500 transition-all"
          v-for="pokemon of getPageData"
          :key="pokemon.id"
        >
          <RouterLink
            class="maxsm:px-1 flex flex-col h-full justify-center items-center p-3"
            :to="{
              name: 'Pokemon',
              params: { slug: `${pokemon.id}` },
            }"
          >
            <div class="max-h-12 mx-auto mb-auto">
              <img
                class="object-contain max-h-12 mx-auto"
                :src="pokemon.sprites.other.showdown.front_default"
                :alt="pokemon.name"
              />

              <div class="animate-pulse" v-if="!pokemon">
                <div class="rounded-full bg-slate-700 h-10 w-10"></div>
              </div>
            </div>
            <div class="maxsm:text-xs text-center pt-2">{{ pokemon.name }}</div>
          </RouterLink>
        </div>
        <div v-if="getPageData.length == 0">
          <p>No data</p>
        </div>
      </div>
    </div>
    <div
      id="pageBox"
      class="flex mx-auto mt-10 w-full justify-center items-center"
    >
      <div class="max-w-24 w-full flex justify-center">
        <button
          @click="curPage = 1"
          v-show="curPage !== 1"
          class="mx-1 p-2 rounded cursor-pointer border border-gray-600 opacity-45 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700 hover:opacity-100"
        >
          <Icon icon="tabler:square-chevrons-left" />
        </button>
        <button
          @click="prevPage"
          v-show="curPage !== 1"
          class="mx-1 p-2 rounded cursor-pointer border border-gray-600 opacity-45 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700 hover:opacity-100"
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
          class="mx-1 p-2 rounded cursor-pointer border border-gray-600 opacity-45 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700 hover:opacity-100"
        >
          <Icon icon="tabler:square-chevron-right" />
        </button>
        <button
          @click="curPage = totalPages"
          v-show="curPage !== totalPages && totalPages !== 0"
          class="mx-1 p-2 rounded cursor-pointer border border-gray-600 transition-all duration-600 hover:bg-gray-700 opacity-45 hover:border-gray-700 hover:opacity-100"
        >
          <Icon icon="tabler:square-chevrons-right" />
        </button>
      </div>
    </div>
  </main>
</template>