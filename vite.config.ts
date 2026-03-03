import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@admin': path.resolve(__dirname, './src/admin'),
      '@super-admin': path.resolve(__dirname, './src/super-admin'),
      '@user': path.resolve(__dirname, './src/user'),
      '@landing': path.resolve(__dirname, './src/landing'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@common': path.resolve(__dirname, './src/components/common'),
      '@UI': path.resolve(__dirname, './src/components/UI'),
      '@atoms': path.resolve(__dirname, './src/atoms'),
      '@forms': path.resolve(__dirname, './src/forms')
    }
  },
  plugins: [react()],
  publicDir: 'public',
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mantine/core',
      '@mantine/hooks',
      '@tabler/icons-react',
      'axios',
      'zod',
      'recoil',
      'react-hook-form'
    ]
  },
  server: {
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        'dist',
        'build',
        '**/.husky/**',
        '**/.vscode/**'
      ]
    },
    hmr: {
      overlay: false
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
