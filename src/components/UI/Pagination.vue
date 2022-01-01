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
  <!--  <div v-if="pages > 6" class="d-flex gap-3">
    <span v-for="i in 3" :key="i"> {{ i }} </span>
    <span>...</span>
    <div v-if="pages >= 9" class="d-flex flex-row-reverse gap-3">
      <span v-for="(i, index) in 3" :key="i"> {{ pages - index }} </span>
    </div>
    <div v-if="pages < 9" class="d-flex flex-row-reverse gap-3">
      <span v-for="(i, index) in pages - 6" :key="i"> {{ pages - index }} </span>
    </div>
  </div>-->
  <!--  <div class="d-flex gap-3">
    <span v-if="page >= 3"> <span v-if="page - 2 !== 1">...</span> {{ page - 2 }}</span>
    <span v-if="page >= 2">{{ page - 1 }}</span>
    <span class="text-danger">{{ page }}</span>
    <span v-if="page + 1 <= pages">{{ page + 1 }}</span>
    <span v-if="page + 2 <= pages">{{ page + 2 }} <span v-if="page + 2 !== pages">...</span> </span>
  </div>-->
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
