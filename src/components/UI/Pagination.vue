<template>
  <section class="d-flex gap-2 align-items-center">
    <TesodevButton
      :disabled="page === 1"
      @click="(goPage = false), changePage(-1)"
      small
      outlineDark
      bold
      text="Previous"
    />
    <div class="d-flex gap-2">
      <TesodevButton
        v-for="i in pages"
        :class="{ 'bg-dark-blue text-white': i === page }"
        :key="i"
        class="page-button"
        small
        :text="i"
        @click="(goPage = true), changePage(i)"
      />
    </div>
    <TesodevButton
      :disabled="page === pages"
      @click="(goPage = false), changePage(1)"
      small
      outlineDark
      bold
      text="Next"
    />
  </section>
  <div class="ms-5">
    <select @change="page = 1" v-model="perPage" class="form-select shadow-none" aria-label="Default select example">
      <option v-for="(perPage, index) in perPageOptions" :key="index" :value="perPage" selected>
        {{ perPage }}
      </option>
    </select>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, computed } from 'vue';

export default defineComponent({
  props: ['totalRecords', 'perPageOptions'],
  setup(props, { emit }) {
    const state = reactive({
      page: 1,
      perPage: props.perPageOptions[0],
      goPage: false,
      otherPages: false,
    });

    const pages = computed(() => {
      const reminder = props.totalRecords % state.perPage;

      if (reminder > 0) {
        return Math.floor(props.totalRecords / state.perPage) + 1;
      } else {
        return props.totalRecords / state.perPage;
      }
    });

    function changePage(val) {
      state.goPage ? (state.page = val) : (state.page += val);
      emit('update:modelValue', { page: state.page });
    }

    return {
      ...toRefs(state),
      pages,
      changePage,
    };
  },
});
</script>

<style scoped lang="scss">
.page-button {
  border: 1px solid $primary;
  /*height: 31px;
  width: 31px;*/
  font-weight: 700;

  &:hover {
    color: white;
    background-color: $dark-blue;
    border: 1px solid $dark-blue;
  }
}
</style>
