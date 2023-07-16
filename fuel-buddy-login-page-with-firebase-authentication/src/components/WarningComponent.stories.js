import { h } from 'vue';
import WarningComponent from './WarningComponent.vue';


export default {
    title: 'Warning Component',
    component: WarningComponent,
  };
  
  const Template = (args) => ({
    components: { WarningComponent },
    setup() {
      return { args };
    },
    render: () => h(WarningComponent, args),
  });
  
  export const Default = Template.bind({});
  Default.args = {
    warningMsg: 'Warning message',
    showWarning: true,
  };
  