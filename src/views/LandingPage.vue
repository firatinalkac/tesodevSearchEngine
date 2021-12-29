<template>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <div class="d-flex flex-column">
      <img :src="require('@/assets/images/icons/tesodev.png')" width="278" alt="tesodev" />
      <span class="d-flex justify-content-end ms-3 fw-bolder">Search web app</span>
    </div>
    <div class="d-flex gap-3 mt-5">
      <div>
        <TesodevInput @change="onFilter" @keyup="onFilter" v-model="search" width="40rem" placeholder="Search" />
        <div
          v-if="search"
          class="border border-dark rounded-3 py-2 px-4 mt-2 d-flex flex-column justify-content-center"
        >
          <div v-for="(item, index) in filterData.slice(0, 3)" :key="index">{{ item.name }}</div>
          <div v-if="filterData.length < 1">
            <div class="alert alert-warning">Sonuç Bulunamadı.</div>
          </div>
          <router-link
            v-else
            :to="{ name: 'ListPage', query: { filter: search ? search : null } }"
            role="button"
            class="fw-bolder text-center fs-12 text-decoration-none text-dark"
          >
            {{ filterData.length > 3 ? 'Show more...' : 'Show Detail' }}
          </router-link>
        </div>
      </div>
      <div>
        <TesodevButton rounded primary class="px-4">Search</TesodevButton>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const state = reactive({
      search: null,
      router: useRouter(),
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
      filterData: null,
    });
    function onFilter() {
      if (state.search && state.search.length > 0) {
        state.filterData = state.data.filter((item) => {
          const val = state.search.toLowerCase();
          const title = item.name && item.name.toLowerCase();
          if (val && title.indexOf(val) !== -1) {
            return true;
          } else {
            return false;
          }
        });
      }
    }
    return {
      ...toRefs(state),
      onFilter,
    };
  },
});
</script>

<style scoped lang="scss"></style>
