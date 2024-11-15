<script setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { Pokedex } from "pokeapi-js-wrapper";

const loading = ref(true);
const route = useRoute();
const id = ref(0);
const pokemon = ref({});
const prevPokemon = ref({});
const nextPokemon = ref({});
const P = new Pokedex();
const height = computed(() => {
  const mile = pokemon.value.height / 10;
  const final = `${mile} m`;
  return final;
});
const weight = computed(() => {
  const kilogram = pokemon.value.weight / 10;
  const pound = Math.round((kilogram * 2.2046226218 * 100) / 100);
  const final = `${kilogram} kg (${pound} lbs)`;
  return final;
});
const upperName = (name) => {
  const upperFirstName = name[0].toUpperCase() + name.slice(1, name.length);
  return upperFirstName;
};
const customColor = (type) => {
  return `bg-${type}`;
};
const UpdateData = async () => {
  async function getId() {
    id.value = route.params.slug;
    loading.value = true;
    return id.value;
  }
  async function getData(pokemonId) {
    try {
      const prev = Number(pokemonId) - 1;
      const next = Number(pokemonId) + 1;
      const res = await P.getPokemonByName([prev, pokemonId, next]);
      prevPokemon.value = { ...res[0] };
      pokemon.value = { ...res[1] };
      nextPokemon.value = { ...res[2] };
    } catch (error) {
      throw error;
    }
  }
  try {
    const pokemonId = await getId();
    await getData(pokemonId);
    loading.value = false;
  } catch (error) {
    console.log("get data error", error);
  }
};

onBeforeMount(() => {
  UpdateData();
});

watch(
  route,
  () => {
    UpdateData();
  },
  { immediate: true }
);
</script>

<template v-if="pokemon">
  <main>
    <div>
      <div class="text-center mb-5 border-b border-gray-700">
        <p class="italic text-stone-600">#{{ pokemon.id }}</p>
        <h1
        class="pb-4 text-3xl font-medium "
        >
        {{ upperName( pokemon.name ) }}
      </h1>
      </div>
      <div class="flex justify-center mb-5">
        <div class="max-w-48 max-h-48">
          <img
            class="object-contain h-full"
            :src="pokemon.sprites.other.showdown.front_default"
            :alt="pokemon.name"
            v-if="pokemon.sprites"
          />
        </div>

        <div class="max-w-48 max-h-48">
          <img
            class="object-contain h-full"
            :src="pokemon.sprites.other.showdown.back_default"
            :alt="pokemon.name"
            v-if="pokemon.sprites"
          />
          <div v-else class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-700 h-10 w-10"></div>
          </div>
        </div>
      </div>
      <div class="w-full">
          <table class="mx-auto table-auto border-separate border-spacing-2 border border-gray-500 rounded-lg">
            <tbody class="">
              <tr>
                <tr v-if="height">
                  <th class="p-3 bg-gray-500 rounded-l-md">Height</th>
                  <td class="border border-gray-600 p-3 rounded-r-md">{{ height }}</td>
                </tr>
                <tr v-if="weight">
                  <th class="p-3 bg-gray-500 rounded-l-md">Weight</th>
                  <td class="border border-gray-600 p-3 rounded-r-md">{{ weight }}</td>
                </tr>
                <tr v-if="pokemon.types">
                  <th class="p-3 bg-gray-500 rounded-l-md">Types</th>
                  <td class="border border-gray-600 p-3 rounded-r-md"><p v-for="type of pokemon.types" :class="customColor(type.type.name)" class="w-fit p-1 rounded-sm text-white mb-1">{{ type.type.name }}</p></td>
                </tr>
                <tr v-if="pokemon.abilities">
                  <th class="p-3 bg-gray-500 rounded-l-md">Ability</th>
                  <td class="border border-gray-600 p-3 rounded-r-md"><p v-for="ability of pokemon.abilities">
                    {{ ability.ability.name }}
                  </p>
                  </td>
                </tr>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
    <div
      id="pageBox"
      class="flex mx-auto mt-10 w-full justify-center items-center"
    >
      <div class="max-w-40 w-full mr-2" v-if="prevPokemon && prevPokemon.id">
        <RouterLink :to="{ name:'Pokemon',params:{slug:`${Number(id)-1}`} }">
        <button
          class="w-full flex justify-between items-center  mx-1 p-2 rounded cursor-pointer border border-gray-600 opacity-45 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700 hover:opacity-100"
        >
          <Icon icon="tabler:square-chevron-left" />
          <p class="ml-2">{{ prevPokemon.name }}</p>
        </button>
      </RouterLink>
      </div>
      <div class="max-w-40 w-full " v-if="nextPokemon && nextPokemon.id">
        <RouterLink :to="{ name:'Pokemon',params:{slug:`${Number(id)+1}`} }">
        <button
          class="w-full flex justify-between items-center mx-1 p-2 rounded cursor-pointer border border-gray-600 opacity-45 transition-all duration-600 hover:bg-gray-700 hover:border-gray-700 hover:opacity-100"
        >
        <p class="mr-2">{{ nextPokemon.name }}</p>
          <Icon icon="tabler:square-chevron-right" />
        </button>
      </RouterLink>
      </div>
    </div>
  </main>
</template>

