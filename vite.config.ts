import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Em produção no GitHub Pages o workflow define VITE_BASE_PATH (ex.: /fantaze/).
  base: process.env.VITE_BASE_PATH ?? '/',
});
