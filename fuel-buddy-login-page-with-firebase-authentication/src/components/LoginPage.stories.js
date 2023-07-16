import { h } from 'vue';
import LoginPage from './LoginPage.vue';


export default {
  title: 'Login Page',
  component: LoginPage,
};

const Template = (args) => ({
  components: { LoginPage },
  setup() {
    return { args };
  },
  render: () => h(LoginPage, args),
});

export const Default = Template.bind({});
Default.args = {
  email: '',
  password: '',
  name: '',
  msg: 'Sign In to',
  buttonContent: 'Login',
  anchorTag: 'Signup',
  showWarning: false,
  warningMsg: '',
};

