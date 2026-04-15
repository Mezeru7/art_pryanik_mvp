import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    host: true,
  },

  build: {
    // Предупреждение при чанках > 500 КБ
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Разбиваем vendor-зависимости в отдельные чанки
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'helmet-vendor': ['react-helmet-async'],
        },
      },
    },
  },
});
