import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Popper'],
  },

  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // rollupOptions: {
    //   input: "index.html",
    // },
    terserOptions: {
      compress: {
        drop_console: true, // Retire tous les console.* du build prod
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 5173,
  },
});
