import ViteComponents from 'vite-plugin-components';

export default {
  plugins: [
    ViteComponents({
      dirs: ['src/components/icons', 'src/components/base'],
    }),
  ],
};
