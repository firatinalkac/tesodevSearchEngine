import { shallowMount } from '@vue/test-utils';
import TesodevInput from '@/components/UI/TesodevInput.vue';

describe('TesodevInput.vue', () => {
  it('renders props.label when passed', () => {
    const label = 'new label';
    const wrapper = shallowMount(TesodevInput, {
      props: { label },
    });
    expect(wrapper.text()).toMatch(label);
  });
  it('renders props.placeholder when passed', () => {
    const placeholder = 'new placeholder';
    const wrapper = shallowMount(TesodevInput, {
      props: { placeholder },
    });
    expect(wrapper.text());
  });
  it('renders props.error when passed', () => {
    const error = 'new error';
    const wrapper = shallowMount(TesodevInput, {
      props: { error },
    });
    expect(wrapper.find('.error').exists()).toBeTruthy();
  });
  it('renders props.width when passed', () => {
    const wrapper = shallowMount(TesodevInput, {
      propsData: {
        width: '25rem',
      },
    });
    expect(wrapper.props().width).toBe('25rem');
  });
  it('renders props.modelValue when passed', () => {
    const modelValue = 'new modelValue';
    const wrapper = shallowMount(TesodevInput, {
      props: { modelValue },
    });
    expect(wrapper.text());
  });
});
