<template>
  <div>
    <slot name="tableHeader"></slot>
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
      <tr
        @mouseover="hoverElement = row.id"
        @mouseleave="hoverElement = null"
        class="tableRow border-bottom border-dark"
        v-for="(row, index) in data"
        :key="index"
      >
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
  },
  setup() {
    const state = reactive({
      hoverElement: null,
    });
    return {
      get,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
.tableRow {
  &:hover {
    background-color: #c4c4c4;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
