<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { Pokedex } from "pokeapi-js-wrapper";
import { RouterLink } from "vue-router";

const loading = ref(true);
const P = new Pokedex();
const interval = {
  offset: 0,
  limit: 1000,
};
const text = ref(null);
const pokemons = ref([]);
const urlIdLookup = ref({});
const imgData = ref([]);
const curPage = ref(1);
const pageSize = 20;

const filteredPokemon = computed(() => UpdatePokemon());
const UpdatePokemon = () => {
  if (text.value == "" || text.value == null) return pokemons.value;
  let texting = text.value.toLowerCase();
  curPage.value = 1;
  return pokemons.value.filter((pokemon) => pokemon.name.includes(texting));
};
const pokemonImgData = computed(() => {
  const imageData = {};
  imgData.value.forEach((item) => {
    imageData[item.name] = item.sprites.other.showdown.front_default;
  });
  return imageData;
});
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
  const promise = (step) => {
    return new Promise((resolve, reject) => {
      //取清單資料
      if (step === 1) {
        P.getPokemonsList(interval).then(function (res) {
          pokemons.value = res.results;
          urlIdLookup.value = res.results.reduce(
            (acc, cur, idx) => (acc = { ...acc, [cur.name]: idx + 1 }),
            {}
          );
          resolve(`step ${step} success`);
        });
      }
      //取得單個詳細資料
      if (step === 2) {
        const arr = pokemons.value.map(
          (pokemon) => urlIdLookup.value[pokemon.name]
        );
        P.getPokemonByName(arr).then((response) => {
          imgData.value = response;
          loading.value = false;
          console.log(`step ${step} success`);
        });
      }
    });
  };

  promise(1)
    .then((success) => {
      console.log(success);
      return promise(2);
    })
    .catch((fail) => {
      console.log(fail);
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
      <div class="grid grid-cols-4 grid-rows-5 gap-2 min-h-80">
        <div
          class="border border-gray-500 rounded hover:bg-green-800 hover:border-green-500 transition-all"
          v-for="pokemon of getPageData"
          :key="pokemon.idx"
        >
          <RouterLink
            class="flex flex-col h-full justify-center items-center p-3"
            :to="{
              name: 'Pokemon',
              params: { slug: `${urlIdLookup[pokemon.name]}` },
            }"
          >
            <div class="max-h-12 mx-auto mb-auto">
              <img
                class="object-contain max-h-12 mx-auto"
                :src="pokemonImgData[pokemon.name]"
                :alt="pokemon.name"
              />
            </div>
            <div class="text-center pt-2">{{ pokemon.name }}</div>
          </RouterLink>
        </div>
        <div v-if="getPageData.length == 0">
          <p>Please Search again</p>
        </div>
      </div>
    </div>

    <Transition name="loading">
      <div v-show="loading" class="loadingBox">
        <p>Loading</p>
        <Icon icon="tabler:loader" /></div
    ></Transition>

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