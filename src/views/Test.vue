<template>
  <div class="d-flex flex-column justify-content-center mt-5 ms-5">
    <div class="d-flex gap-2 mt-5 ms-5 mb-5">
      <button @click="sortLowest" class="btn btn-primary">Ada gore sirala</button>
      <button @click="sortHighest" class="btn btn-primary">yasa gore sirala</button>
    </div>
    <div v-for="(item, index) in data" :key="index" class="ms-5 d-flex">
      <span class="me-5"> {{ item.name }} </span>
      <span class="ms-5">{{ item.age }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      data: [
        { name: 'Ahmet', age: '12' },
        { name: 'Veli', age: '15' },
        { name: 'Ayse', age: '18' },
        { name: 'Firat', age: '25' },
        { name: 'Usame', age: '28' },
        { name: 'Furki', age: '22' },
        { name: 'Mujdat', age: '30' },
        { name: 'Akif', age: '22' },
        { name: 'Ali', age: '23' },
      ],
    });
    function sortLowest() {
      state.data.sort((a, b) => (a.age > b.age ? 1 : -1));
    }
    function sortHighest() {
      state.data.sort((a, b) => (a.age < b.age ? 1 : -1));
    }
    return {
      ...toRefs(state),
      sortLowest,
      sortHighest,
    };
  },
});
</script>
