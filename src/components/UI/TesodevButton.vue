<template>
  <div v-bind="$attrs" class="btn btn-primary border-0" :class="classList">
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({});
    const classList = computed(() => {
      return {
        [`button-pr`]: props.primary,
        [`button-sc`]: props.secondary,
        [`rounded-8`]: !props.rounded,
      };
    });
    return {
      ...toRefs(state),
      classList,
    };
  },
});
</script>

<style>
.button-pr {
  background-color: #204080;
}
.button-sc {
  background-color: #4f75c2;
}
</style>
