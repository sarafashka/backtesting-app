import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/backtesting-app/',
  };

  // const config = {
  //   plugins: [react()],
  //   base: '/',
  // };

  // if (command !== 'serve') {
  //   config.base = '/backtesting-app/';
  // }

  return config;
});
