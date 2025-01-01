import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // Default build output for Vite
  },
/*    server: {
    https: {
      key: fs.readFileSync('./localhost.key.pem'),
      cert: fs.readFileSync('./localhost.cert.pem'),
    },
  },  */
});
