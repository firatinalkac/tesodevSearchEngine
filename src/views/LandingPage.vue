<template>
  <div class="d-flex flex-column align-items-center justify-content-center lading-page">
    <div class="d-flex flex-column">
      <img :src="require('@/assets/images/icons/tesodev.png')" width="278" alt="tesodev" />
      <span class="d-flex justify-content-end ms-3 fw-bolder">Search web app</span>
    </div>
    <div class="d-flex gap-3 mt-5">
      <div class="position-relative">
        <TesodevInput v-model="search" width="40rem" placeholder="Search" />
        <div
          v-if="search"
          class="border position-absolute w-100 border-dark rounded-3 py-2 px-4 mt-2 d-flex flex-column justify-content-center"
        >
          <div class="pb-2" v-for="(item, index) in filteredData.slice(0, 3)" :key="index">
            <div class="border-bottom border-dark pt-3 d-flex justify-content-between pb-1">
              <div class="d-flex flex-column fw-bold">
                <span class="fs-18">{{ item.country }} - {{ item.city }}</span>
                <span class="fs-12 text-secondary subTitle">{{ item.company }} - {{ getYear(item.date) }}</span>
              </div>
              <div class="pe-5 fw-bold">Email: {{ item.email }}</div>
            </div>
          </div>
          <div v-if="filteredData.length < 1">
            <div class="alert alert-warning">No results found!</div>
          </div>
          <router-link
            v-else
            :to="{ name: 'ListPage', query: { filter: search ? search : null } }"
            role="button"
            class="fw-bolder text-center fs-12 text-decoration-none text-dark pt-4"
          >
            {{ filteredData.length > 3 ? 'Show more...' : 'Show Detail...' }}
          </router-link>
        </div>
      </div>
      <div>
        <TesodevButton textWhite rounded primary bold text="Search" class="px-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import filter from '../plugins/filter';
import { getYear } from '../plugins/date-utils';
import axios from 'axios';

export default defineComponent({
  setup() {
    const { onFilter } = filter();
    const state = reactive({
      search: null,
      router: useRouter(),
      route: useRoute(),
      data: [],
      dataLoading: false,
    });
    const filteredData = computed(function () {
      return onFilter(state.search, state.data);
    });

    async function getMockApi() {
      try {
        const response = await axios.get('https://61ce37467067f600179c5e0b.mockapi.io/user');
        state.data = response.data;
      } catch (error) {
        console.log(error);
      }
    }
    getMockApi();

    return {
      ...toRefs(state),
      filteredData,
      onFilter,
      getYear,
    };
  },
});
</script>

<style scoped lang="scss">
.lading-page {
  margin-top: 13rem;
}
</style>
