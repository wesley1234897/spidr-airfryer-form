import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace with your actual repo name:
export default defineConfig({
  base: '/spidr-airfryer-form/',
  plugins: [react()],
});
