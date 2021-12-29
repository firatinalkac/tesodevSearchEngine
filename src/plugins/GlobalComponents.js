import TesodevInput from '@/components/UI/TesodevInput.vue';
import TesodevButton from '@/components/UI/TesodevButton.vue';
import TesodevTable from '@/components/UI/TesodevTable.vue';

export function registerComponents(app) {
  app.component('TesodevInput', TesodevInput);
  app.component('TesodevButton', TesodevButton);
  app.component('TesodevTable', TesodevTable);
}
