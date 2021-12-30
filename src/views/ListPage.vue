<template>
  <div class="d-flex flex-column align-items-center justify-content-center p-3">
    <div class="header d-flex align-items-center flex-wrap gap-3 mb-5">
      <span role="button" @click="router.push({ name: 'LandingPage' })">
        <img :src="require('@/assets/images/icons/tesodev.png')" width="150" alt="tesodev" />
      </span>
      <TesodevInput v-model="listSearch" width="28rem" placeholder="Search" />
      <TesodevButton @click="router.replace({ query: { filter: listSearch } })" rounded secondary class="px-4"
        >Search</TesodevButton
      >
      <button @click="resetSearch" class="btn btn-danger">Temizle</button>
    </div>
    <div class="mt-5">
      <tesodev-table :header="header" :data="filteredData" :orderItems="orderList"> </tesodev-table>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import filter from '../plugins/filter';

export default defineComponent({
  setup() {
    const { onFilter } = filter();
    const state = reactive({
      header: [{ value: 'name' }, { value: 'age' }],
      orderList: [
        { text: 'Name ascending', value: 'name' },
        { text: 'Name descending', value: 'name' },
        { text: 'Year ascending', value: 'year' },
        { text: 'Year descending', value: 'year' },
      ],
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
      route: useRoute(),
      router: useRouter(),
      listSearch: useRoute().query.filter,
    });
    function resetSearch() {
      if (state.route.query.filter) {
        state.router.replace({ name: 'ListPage' });
      } else {
        state.listSearch = null;
      }
    }
    watch(state.route, () => {
      if (state.route.query.filter) {
        state.listSearch = state.route.query.filter;
      } else {
        state.listSearch = null;
      }
    });
    const filteredData = computed(function () {
      return onFilter(state.route.query.filter, state.data);
    });
    return {
      ...toRefs(state),
      filteredData,
      resetSearch,
    };
  },
});
</script>

<style scoped></style>
