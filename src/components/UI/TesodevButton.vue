<template>
  <button v-bind="$attrs" class="btn" :class="classList">
    <slot />
    {{ text }}
  </button>
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
    danger: {
      type: Boolean,
      default: false,
    },
    outlinePrimary: {
      type: Boolean,
      default: false,
    },
    outlineDark: {
      type: Boolean,
      default: false,
    },
    textWhite: {
      type: Boolean,
      default: false,
    },
    bold: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const state = reactive({});
    const classList = computed(() => {
      return {
        [`button-pr`]: props.primary,
        [`button-sc`]: props.secondary,
        [`btn-danger`]: props.danger,
        [`btn-outline-primary`]: props.outlinePrimary,
        [`btn-outline-dark`]: props.outlineDark,
        [`fw-bold`]: props.bold,
        [`text-white`]: props.textWhite,
        [`btn-sm`]: props.small,
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
