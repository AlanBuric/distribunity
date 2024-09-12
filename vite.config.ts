import { fileURLToPath, URL } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    transformer: 'postcss',
  },
});
