<template>
  <div :class="errorClass">
    <label v-if="label" class="form-label fw-bolder" :class="{ 'text-danger': error }"> {{ label }} </label>
    <input
      type="email"
      class="form-control rounded-8"
      :class="{ 'border-danger': error }"
      :placeholder="placeholder"
      :style="{ width: `${width}` }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <small v-if="error" class="error-text"> {{ error }} </small>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, computed } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: '25rem',
    },
    modelValue: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const state = reactive({});
    const errorClass = computed(() => {
      let className = null;
      if (props.error) {
        className = 'error';
      }
      return className;
    });
    return {
      ...toRefs(state),
      errorClass,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-control::placeholder {
  color: rgba(100, 100, 100, 0.5);
  font-weight: 500;
}
.error {
  .error-text {
    color: rgba(255, 0, 0, 0.5);
    font-weight: 500;
  }
  .form-control::placeholder {
    color: rgba(255, 0, 0, 0.5);
    font-weight: 500;
  }
}
</style>
