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
      <tesodev-table :header="header" :data="data" :orderItems="orderList"> </tesodev-table>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const state = reactive({
      header: [
        { value: 'name' },
        { value: 'last_name' },
        { value: 'year' },
        { value: 'action', minWidth: 200, center: true },
      ],
      orderList: [
        { text: 'Name ascending', value: 'name' },
        { text: 'Name descending', value: 'name' },
        { text: 'Year ascending', value: 'year' },
        { text: 'Year descending', value: 'year' },
      ],
      data: [
        { name: 'Ali', last_name: 'Cebeci', year: '2012' },
        { name: 'Veli', last_name: 'Cebeci', year: '1998' },
        { name: 'Davut', last_name: 'Cebeci', year: '2020' },
        { name: 'Ahmet', last_name: 'Cebeci', year: '2150' },
        { name: 'Celal', last_name: 'Cebeci', year: '2896' },
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
    return {
      ...toRefs(state),
      resetSearch,
    };
  },
});
</script>

<style scoped></style>
