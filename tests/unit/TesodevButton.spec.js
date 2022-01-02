import { shallowMount } from '@vue/test-utils';
import TesodevButton from '@/components/UI/TesodevButton.vue';

describe('TesodevButton.vue', () => {
  it('when passed, it will include the btn class', () => {
    const wrapper = shallowMount(TesodevButton);
    expect(wrapper.classes()).toContain('btn');
  });

  it(`Button contains classes`, () => {
    const wrapper = shallowMount(TesodevButton, {
      propsData: {
        primary: true,
        secondary: true,
        danger: true,
        outlinePrimary: true,
        outlineDark: true,
        bold: true,
        textWhite: true,
        small: true,
        rounded: false,
      },
    });
    expect(wrapper.classes()).toContain(
      'button-pr' &&
        'button-sc' &&
        'btn-danger' &&
        'btn-outline-primary' &&
        'btn-outline-dark' &&
        'fw-bold' &&
        'text-white' &&
        'btn-sm' &&
        'rounded-8'
    );
  });
  it('renders props.text when passed', () => {
    const wrapper = shallowMount(TesodevButton, {
      propsData: {
        text: 'new text',
      },
    });
    expect(wrapper.text());
  });
});
