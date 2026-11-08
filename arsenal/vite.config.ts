import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Arsenal is published inside the Project-X repository site.
  base: '/Project-X/arsenal/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
