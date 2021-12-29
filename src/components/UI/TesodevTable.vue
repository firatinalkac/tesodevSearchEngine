<template>
  <div class="d-flex justify-content-end">
    <div class="dropdown">
      <span
        class="dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img :src="require('@/assets/images/icons/order-icon.svg')" alt="order" />
      </span>
      <ul class="dropdown-menu p-2 border-dark rounded-3" aria-labelledby="dropdownMenuButton1">
        <li v-for="(item, index) in orderItems" :key="index">
          <span role="button" class="dropdown-item"> {{ item.text }} </span>
        </li>
      </ul>
    </div>
  </div>
  <table v-bind="$attrs" class="table">
    <thead>
      <tr>
        <th
          class="border-0 p-0"
          v-for="(col, index) in header"
          :key="index"
          :class="{ 'text-center': col.center }"
          :style="{
            width: col.width + 'px',
            minWidth: (col.minWidth || 100) + 'px',
          }"
        >
          <slot :name="`${col.value}_header`" :col="col"> {{ col.text }} </slot>
        </th>
      </tr>
    </thead>
    <tbody class="border-0">
      <tr class="tableRow border-bottom border-dark" v-for="(row, index) in data" :key="index">
        <td v-for="(col, index) in header" :key="index" class="border-0 pt-5">
          <slot :name="col.value" v-bind:prop="row[col.value]" :row="row" :col="col">
            <div
              :title="row[col.value] || get(row, col.value)"
              v-html="row[col.value] || get(row, col.value)"
              v-if="row[col.value] || get(row, col.value)"
            />
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import get from 'lodash/get';

export default defineComponent({
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    header: {
      type: Array,
      default: () => [],
    },
    orderItems: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const state = reactive({});
    return {
      get,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.tableRow {
  &:hover {
    background-color: #c4c4c4;
    border-radius: 4px;
    cursor: pointer;
  }
}
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
