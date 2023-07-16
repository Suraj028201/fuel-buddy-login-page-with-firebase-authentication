import { h } from 'vue';
import DashboardPage from './DashboardPage.vue';


export default {
  title: 'Dashboard Page',
  component: DashboardPage,
};

const Template = (args) => ({
  components: { DashboardPage },
  setup() {
    return { args };
  },
  render: () => h(DashboardPage, args),
});

export const Default = Template.bind({});
Default.args = {
  // Define any props or data required by the DashboardPage component
};

