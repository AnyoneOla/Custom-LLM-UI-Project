// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:11434',
        changeOrigin: true,
        secure: false,
        // Optionally, set the following if you need to handle cookies or CORS issues
        // cookieDomainRewrite: '',
        // headers: {
        //   'Access-Control-Allow-Origin': '*',
        // },
      },
    },
  },
});
