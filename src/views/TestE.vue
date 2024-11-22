<script setup>
import { RouterLink } from "vue-router";
import { ref, reactive, toRefs, watch } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { storeToRefs } from "pinia";
const store = useLoadingStore();
const { loading } = storeToRefs(store);
loading.value = false;
//ref
const name1 = ref("beamRef");
//reative
const name2 = reactive({ name: "beamReative", old: 28 });
const { name } = toRefs(name2);
console.log(name.value);
//第二題 opt -> com
const count = ref(0);
const increment = () => {
  console.log(count);
  return count.value++;
};
watch(count, () => {
  console.log("Mounted! Current count:", count.value);
});
</script>
<template>
  <main>
    <div class="p-2 border bb-white">
      <h2 class="text-lg">
        請解釋 Vue 3 的響應式系統是如何運作的，描述 reactive 和 ref
        的核心機制。然後，寫出一段代碼，展示如何追蹤對象的變化，以及如何在數據改變時觸發響應。
      </h2>
      <p>
        我的回答:<br />
        使用jsx的方式來控制dom，並使用到ref
        reative語法糖去處理到資料的雙向綁定。 <br />
        核心邏輯是:<br />
        使用reative,ref包裹成的數據變成響應式對象，當響應式數據被修改時，會追蹤依賴並觸發重新渲染。
      </p>
      <br />
      <h3 class="text-lg">
        附加問題01： reactive 和 ref 的區別是什麼？ <br />
      </h3>
      <p>
        我的回答: <br />
        前者會回傳一個target,後者會回傳一個物件，裡面會有value的屬性，需要在後者加上.value提取出。<br />
        仔細的回答:<br />
        差別在前者主要用於對象(當然ref也可以做到)，返回的對象是proxy包裝，不需要.value訪問數據，後者返回的是一個帶有value的屬性對象，數據存放在value裡
      </p>
      <br />
      <h3 class="text-lg">
        附加問題02：如果你需要追蹤一個對象的變化，但只需要響應某些特定屬性，你會怎麼做？
      </h3>
      <p>
        我的回答:<br />
        可以使用ref做對象追蹤，匹如name1值為ref("beamRef")，我只要透過name1.value=newbeam
        就可以得出新屬性<br />
        仔細的回答:<br />
        <br />
      </p>
    </div>
    <div class="p-2 border bb-white">
      <h2 class="text-lg">Composition API 與 Options API 的差異</h2>
      <p>
        我的回答:<br />
        compositon
        是將所有函式打包成一個個模組，要使用到在引入，而options則是物件函式的方式，像抽屜一樣擺列好工具並且使用，不過差別在於compositon有更接近寫程式碼習慣，因為就是處理同個功能的可以放在一起，不需要像是散落在每個抽屜裡。<br />
        ai的回饋:Options API： <br />
        像一個整理好的工具箱，所有的功能按類別（data、methods
        等）存放在不同的抽屜裡，每個功能井然有序，但需要切換抽屜找到相關邏輯。
        Composition API： <br />
        像在編寫模組化程式碼，相關的功能可以組合在一起，減少邏輯分散的問題，更接近我們寫函數的直覺習慣。<br />
        <br />
        <button class="border p-2" @click="increment()">{{ count }}</button>
      </p>
    </div>

    <div class="p-2 border bb-white">
      <h2 class="text-lg">
        在 Vue
        3中，如何設置動態路由？請寫出一段代碼展示如何定義動態路由，以及在路由進入前進行權限檢查（如是否已登入）。
      </h2>
      <p>
        我的回答:<br />
        <br />
        ai的回饋:Options API：<br />
        <br />
        <RouterLink :to="{ name: 'Dashboard' }">Dashboard</RouterLink>
      </p>
    </div>
  </main>
</template>