/** @type { import('@storybook/vue3').Preview } */
import { createPinia } from 'pinia';
import { createApp } from 'vue';

const pinia = createPinia();
const app = createApp({});
app.use(pinia);

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
