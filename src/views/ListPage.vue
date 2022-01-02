<template>
  <div class="d-flex flex-column align-items-center justify-content-center p-3">
    <div class="header d-flex align-items-center flex-wrap gap-3 mb-5">
      <span role="button" @click="router.push({ name: 'LandingPage' })">
        <img :src="require('@/assets/images/icons/tesodev.png')" width="150" alt="tesodev" />
      </span>
      <TesodevInput v-model="listSearch" width="28rem" placeholder="Search" />

      <TesodevButton
        @click="router.replace({ query: { filter: listSearch } })"
        textWhite
        secondary
        class="px-4"
        text="Search"
        bold
      />

      <TesodevButton @click="resetSearch" danger bold text="Temizle" />
    </div>
    <div class="mt-5">
      <!-- Table Start -->
      <tesodev-table v-if="!dataLoading" ref="table" :header="header" :data="computedTableData">
        <template #tableHeader>
          <div class="dropdown d-flex justify-content-end">
            <span
              class="dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img :src="require('@/assets/images/icons/order-icon.svg')" alt="order" />
              <span class="fw-bold">Order By</span>
            </span>
            <ul class="dropdown-menu p-2 border-dark rounded-3" aria-labelledby="dropdownMenuButton1">
              <li
                v-for="(item, index) in orderList"
                :key="index"
                @click="item.value === 'year' ? sortDate(item.orderBy) : sortName(item.orderBy)"
              >
                <span role="button" class="dropdown-item">
                  {{ item.text }}
                </span>
              </li>
            </ul>
          </div>
        </template>
        <template #country="{ row }">
          <div class="d-flex flex-column fw-bold">
            <span>{{ row.country }} - {{ row.city }}</span>
            <span
              class="fs-12"
              :class="[
                { 'text-white': table.hoverElement === row.id },
                { 'text-secondary': table.hoverElement !== row.id },
              ]"
              >{{ row.company }} - {{ getYear(row.date) }}</span
            >
          </div>
        </template>
        <template #email="{ row }">
          <div class="pe-5 fw-bold">Email: {{ row.email }}</div>
        </template>
      </tesodev-table>
      <div class="d-flex justify-content-center alert alert-danger" v-if="filteredData.length === 0 && !dataLoading">
        No results found!
      </div>
      <div v-if="dataLoading" class="text-center">
        <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <!-- Table Finish -->

      <!-- Pagination Start -->
      <div class="d-flex justify-content-center align-items-center mt-5">
        <Pagination
          ref="pagination"
          :totalRecords="filteredData.length"
          :perPageOptions="[5, 10, 15]"
          v-model="pagination"
        />
      </div>
      <!-- Pagination Finish -->
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import filter from '../plugins/filter';
import axios from 'axios';
import { getYear } from '../plugins/date-utils';
import Pagination from '../components/UI/Pagination';

export default defineComponent({
  components: { Pagination },
  setup() {
    const { onFilter } = filter();
    const state = reactive({
      pagination: '',
      table: '',
      dataLoading: false,
      header: [
        { value: 'country', width: 500 },
        { value: 'email', width: 500 },
      ],
      orderList: [
        { text: 'Name ascending', value: 'name', orderBy: 'asc' },
        { text: 'Name descending', value: 'name', orderBy: 'des' },
        { text: 'Year ascending', value: 'year', orderBy: 'asc' },
        { text: 'Year descending', value: 'year', orderBy: 'des' },
      ],
      data: [],
      route: useRoute(),
      router: useRouter(),
      listSearch: useRoute().query.filter,
    });

    async function getMockApi() {
      state.dataLoading = true;
      try {
        const response = await axios.get('https://61ce37467067f600179c5e0b.mockapi.io/user');
        state.data = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        state.dataLoading = false;
      }
    }
    getMockApi();

    const filteredData = computed(() => {
      return onFilter(state.route.query.filter, state.data);
    });

    const computedTableData = computed(() => {
      const data = filteredData.value;
      const firstIndex = (state.pagination.page - 1) * state.pagination.perPage;
      const lastPage = state.pagination.page * state.pagination.perPage;
      return data.slice(firstIndex, lastPage);
    });

    function resetSearch() {
      if (state.route.query.filter) {
        state.router.replace({ name: 'ListPage' });
      } else {
        state.listSearch = null;
      }
    }

    function sortName(orderBy) {
      if (orderBy === 'asc') {
        state.data.sort((a, b) => (a.country > b.country ? 1 : -1));
      } else {
        state.data.sort((a, b) => (a.country < b.country ? 1 : -1));
      }
      state.pagination.page = 1;
    }

    function sortDate(orderBy) {
      if (orderBy === 'asc') {
        state.data.sort((a, b) => (a.date > b.date ? 1 : -1));
      } else {
        state.data.sort((a, b) => (a.date < b.date ? 1 : -1));
      }
      state.pagination.page = 1;
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
      filteredData,
      computedTableData,
      resetSearch,
      sortDate,
      sortName,
      getYear,
    };
  },
});
</script>

<style scoped lang="scss">
.dropdown-toggle::after {
  display: none;
}
.dropdown-item {
  color: #000000;
  font-weight: 700;
  &:hover {
    background-color: #c4c4c4;
    color: #ffffff;
    border-radius: 4px;
  }
}
</style>
