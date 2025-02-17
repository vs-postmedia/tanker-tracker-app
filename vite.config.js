import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tanker-tracker/',
  plugins: [svelte()],
  resolve: {
    alias: {
      "$components": path.resolve('./src/components'),
      "$data": path.resolve("./src/data"),
	    "$css": path.resolve("./src/css"),
	    "$fonts": path.resolve("./static/fonts"),
      "$images": path.resolve("./src/images")
    }
  }
});
