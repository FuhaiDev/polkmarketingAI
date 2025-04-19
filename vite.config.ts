import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import { nodePolyfills } from 'vite-plugin-node-polyfills';
//import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // nodePolyfills({
    //   include: ['buffer', 'process', 'util', 'stream']
    // })
  ],
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, './src'),
    //   'contracts': path.resolve(__dirname, './contracts')
    // }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});