import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let base: string;
  if (command === 'build') {
    base = '/backtesting-app';
  }
  if (command === 'serve') {
    base = '/';
  }
  const config = {
    plugins: [react()],
    base: base,
  };

  return config;
});
