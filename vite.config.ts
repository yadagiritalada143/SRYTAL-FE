import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        'dist',
        'build',
        '**/.husky/**',
        '**/.vscode/**',
      ],
    },
    hmr: {
      overlay: false,
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
